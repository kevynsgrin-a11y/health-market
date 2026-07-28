/**
 * Premium tax credit computation under IRC §36B.
 *
 *   PTC = max(0, benchmark premium - (household income x applicable percentage))
 *
 * capped at the premium of the plan actually enrolled in.
 *
 * The engine is pure and synchronous. All I/O (benchmark lookup) happens
 * upstream. Every result carries a step-by-step derivation so the UI can show
 * its work — which is both the product's differentiation and its compliance
 * posture.
 */

import { applicablePercentage, applyRate } from "./applicable-percentage";
import { computeFpl } from "./fpl";
import { selectRatedMembers } from "./rating";
import type {
  Cents,
  Household,
  IneligibilityReason,
  PlanYearParameters,
  PtcResult,
  WorkingStep,
} from "./types";

const CITE_36B = "IRC §36B(b)(2)";
const CITE_ROUNDING = "26 CFR 1.36B-3(g)";
const CITE_8962 = "IRS Form 8962, line 5";

export function centsToUsd(cents: Cents): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  return `${sign}$${Math.floor(abs / 100).toLocaleString("en-US")}.${String(abs % 100).padStart(2, "0")}`;
}

function formatCentiPercent(cp: number): string {
  return `${(cp / 100).toFixed(2)}%`;
}

/** Divide an annual amount into a monthly one, rounding to the nearest cent. */
export function monthlyFromAnnual(annual: Cents): Cents {
  return Math.round(annual / 12);
}

/**
 * Household income x applicable percentage, for a given income.
 *
 * Exported because the cliff solver needs to evaluate it at candidate incomes
 * without constructing a full result each time.
 */
export function requiredContributionAt(
  params: PlanYearParameters,
  annualIncome: Cents,
  size: number,
  region: Household["region"],
): { annual: Cents; centiPercent: number; fplPercent: number } | null {
  const fpl = computeFpl(params, annualIncome, size, region);

  if (params.maxFplPercent !== null && fpl.exceedsFourTimesFpl) return null;
  if (fpl.form8962Percent < params.minFplPercent) return null;

  const centiPercent = applicablePercentage(
    params.applicablePercentageTable,
    fpl.form8962Percent,
  );
  return {
    annual: applyRate(annualIncome, centiPercent),
    centiPercent,
    fplPercent: fpl.form8962Percent,
  };
}

export function computePtc(
  params: PlanYearParameters,
  household: Household,
  annualBenchmarkPremium: Cents,
): PtcResult {
  const workings: WorkingStep[] = [];

  const { rated, excludedChildren } = selectRatedMembers(household.members);

  const fpl = computeFpl(
    params,
    household.annualIncome,
    household.size,
    household.region,
  );

  workings.push({
    label: "Federal poverty line",
    detail:
      `Household of ${household.size} in the ${household.region} region: ` +
      `${centsToUsd(fpl.fplAmount)} (${fpl.guidelineYear} HHS guidelines, which ` +
      `govern plan year ${params.planYear}).`,
    citation: "26 CFR 1.36B-1(h)",
  });

  workings.push({
    label: "Income as a percent of FPL",
    detail:
      `${centsToUsd(household.annualIncome)} / ${centsToUsd(fpl.fplAmount)} = ` +
      `${(fpl.exactRatio * 100).toFixed(2)}%, entered on Form 8962 as ` +
      `${fpl.form8962Percent}${fpl.exceedsFourTimesFpl ? " (income exceeds 4x FPL)" : ""}.`,
    citation: CITE_8962,
  });

  if (excludedChildren.length > 0) {
    workings.push({
      label: "Family rating cap applied",
      detail:
        `${excludedChildren.length} child(ren) under 21 are covered at no ` +
        `additional premium — only the three oldest under-21 children are rated.`,
      citation: "45 CFR 147.102(c)(1)",
    });
  }

  const ineligible = (reason: IneligibilityReason, detail: string): PtcResult => {
    workings.push({ label: "Not eligible", detail, citation: CITE_36B });
    return {
      planYear: params.planYear,
      eligible: false,
      ineligibilityReason: reason,
      fpl,
      applicablePercentage: 0,
      annualRequiredContribution: 0,
      monthlyRequiredContribution: 0,
      annualBenchmarkPremium,
      monthlyBenchmarkPremium: monthlyFromAnnual(annualBenchmarkPremium),
      annualPtc: 0,
      monthlyPtc: 0,
      workings,
    };
  };

  if (rated.length === 0) {
    return ineligible(
      "no-members-seeking-coverage",
      "No household member is seeking Marketplace coverage.",
    );
  }

  if (annualBenchmarkPremium <= 0) {
    return ineligible(
      "benchmark-unavailable",
      "No second-lowest-cost silver plan premium was supplied for this location.",
    );
  }

  if (params.maxFplPercent !== null && fpl.exceedsFourTimesFpl) {
    return ineligible(
      "income-above-400-percent",
      `Household income exceeds 4x the federal poverty line ` +
        `(${centsToUsd(4 * fpl.fplAmount)}). The enhanced premium tax credits ` +
        `that removed this cap lapsed on 2025-12-31, so the subsidy cliff ` +
        `applies: the credit is $0, not a reduced amount.`,
    );
  }

  if (fpl.form8962Percent < params.minFplPercent) {
    return ineligible(
      "income-below-minimum",
      `Household income is below ${params.minFplPercent}% of the federal ` +
        `poverty line. Premium tax credits generally begin at ` +
        `${params.minFplPercent}% FPL; below that, eligibility usually runs ` +
        `through Medicaid instead — except in states that did not expand ` +
        `Medicaid, where this is the coverage gap.`,
    );
  }

  const centiPercent = applicablePercentage(
    params.applicablePercentageTable,
    fpl.form8962Percent,
  );

  workings.push({
    label: "Applicable percentage",
    detail:
      `At ${fpl.form8962Percent}% of FPL the ${params.planYear} table gives ` +
      `${formatCentiPercent(centiPercent)}, interpolated linearly within the ` +
      `bracket and rounded to the nearest one-hundredth of one percent.`,
    citation: `${params.applicablePercentageTable.provenance.source}; ${CITE_ROUNDING}`,
  });

  const annualRequiredContribution = applyRate(household.annualIncome, centiPercent);
  const monthlyRequiredContribution = monthlyFromAnnual(annualRequiredContribution);

  workings.push({
    label: "Your required contribution",
    detail:
      `${centsToUsd(household.annualIncome)} x ${formatCentiPercent(centiPercent)} = ` +
      `${centsToUsd(annualRequiredContribution)} per year ` +
      `(${centsToUsd(monthlyRequiredContribution)} per month).`,
    citation: CITE_36B,
  });

  const annualPtc = Math.max(0, annualBenchmarkPremium - annualRequiredContribution);
  const monthlyPtc = monthlyFromAnnual(annualPtc);

  workings.push({
    label: "Premium tax credit",
    detail:
      `Benchmark plan ${centsToUsd(annualBenchmarkPremium)} - your contribution ` +
      `${centsToUsd(annualRequiredContribution)} = ${centsToUsd(annualPtc)} per year ` +
      `(${centsToUsd(monthlyPtc)} per month).`,
    citation: CITE_36B,
  });

  return {
    planYear: params.planYear,
    eligible: annualPtc > 0,
    ineligibilityReason: null,
    fpl,
    applicablePercentage: centiPercent,
    annualRequiredContribution,
    monthlyRequiredContribution,
    annualBenchmarkPremium,
    monthlyBenchmarkPremium: monthlyFromAnnual(annualBenchmarkPremium),
    annualPtc,
    monthlyPtc,
    workings,
  };
}
