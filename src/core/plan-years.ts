/**
 * Plan-year parameters with full provenance.
 *
 * This file is the single place a legislative or regulatory change lands.
 * The engine in ptc.ts / cliff.ts contains no year-specific constants.
 *
 * STATE OF THE LAW AS OF 2026-07-27
 * ---------------------------------
 * The ARPA §9661/§9663 enhanced premium tax credits, extended by IRA §12001,
 * LAPSED on 2025-12-31. Congress did not extend them:
 *   - 2025-12-11  S.3385 and S.3386 both failed to reach 60 votes in the Senate.
 *   - 2026-01-08  House passed a 3-year extension 230-196; stalled in Senate.
 *   - early 2026  Bipartisan Senate compromise collapsed over the Hyde Amendment.
 *   - 2026-07-21  IRS issued Rev. Proc. 2026-26 publishing an INDEXED §36B
 *                 applicable percentage table for 2027 topping out at 400% FPL.
 *                 Treasury does not index a table that statute has displaced;
 *                 this is the dispositive administrative signal.
 *
 * Therefore `enhancedCreditsActive: false` and the 400% cliff is live for both
 * PY2026 and PY2027.
 */

import type {
  ApplicablePercentageTable,
  PlanYear,
  PlanYearParameters,
  PovertyGuidelines,
} from "./types";

const CHECKED = "2026-07-27";

// ---------------------------------------------------------------------------
// HHS poverty guidelines
// ---------------------------------------------------------------------------

/**
 * 2025 HHS poverty guidelines. Govern plan year 2026 per 26 CFR 1.36B-1(h)
 * (the guidelines in effect on the first day of the PY2026 open enrollment
 * period, 2025-11-01).
 */
const FPL_2025: PovertyGuidelines = {
  guidelineYear: 2025,
  base: {
    contiguous: 1_565_000, // $15,650
    alaska: 1_955_000, // $19,550
    hawaii: 1_799_000, // $17,990
  },
  increment: {
    contiguous: 550_000, // $5,500
    alaska: 687_000, // $6,870
    hawaii: 632_000, // $6,320
  },
  provenance: {
    source: "HHS Poverty Guidelines (2025)",
    url: "https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines",
    published: "2025-01-17",
    checked: CHECKED,
    status: "secondary-concordant",
    note:
      "Contiguous base $15,650 corroborated by the widely reported 400% PY2026 " +
      "cliff of $62,600 for a single filer (4 x 15,650). Alaska and Hawaii " +
      "figures are carried from prior-year reporting and are NOT independently " +
      "verified for 2025; see requireVerifiedRegion().",
  },
};

/**
 * 2026 HHS poverty guidelines. Govern plan year 2027 (OE opens 2026-11-01).
 *
 * WARNING: only the contiguous base and the 4-person amount are sourced. The
 * per-person increment is DERIVED arithmetic: (33,000 - 15,960) / 3 = 5,680.
 * Alaska and Hawaii are unverified placeholders and are gated at runtime.
 */
const FPL_2026: PovertyGuidelines = {
  guidelineYear: 2026,
  base: {
    contiguous: 1_596_000, // $15,960
    alaska: 0,
    hawaii: 0,
  },
  increment: {
    contiguous: 568_000, // $5,680 (derived)
    alaska: 0,
    hawaii: 0,
  },
  provenance: {
    source: "HHS Poverty Guidelines (2026), 91 FR / FR Doc. 2026-00755",
    url: "https://www.federalregister.gov/documents/2026/01/15/2026-00755/annual-update-of-the-hhs-poverty-guidelines",
    published: "2026-01-15",
    checked: CHECKED,
    status: "derived",
    note:
      "Published 2026-01-15, effective 2026-01-13. Contiguous 1-person $15,960 " +
      "and 4-person $33,000 are sourced; the $5,680 increment is derived as " +
      "(33000-15960)/3 and MUST be confirmed against the ASPE table before " +
      "production use. Alaska and Hawaii are zeroed placeholders and are " +
      "rejected at runtime rather than silently returning a wrong credit.",
  },
};

// ---------------------------------------------------------------------------
// Applicable percentage tables (§36B(b)(3)(A)(i))
// ---------------------------------------------------------------------------

/**
 * Plan year 2026 — Rev. Proc. 2025-25 (issued 2025-07-18).
 * Required contribution percentage: 9.96%.
 */
const APT_2026: ApplicablePercentageTable = {
  planYear: 2026,
  brackets: [
    { fromFplPercent: 0, toFplPercent: 133, initial: 210, final: 210 },
    { fromFplPercent: 133, toFplPercent: 150, initial: 314, final: 419 },
    { fromFplPercent: 150, toFplPercent: 200, initial: 419, final: 660 },
    { fromFplPercent: 200, toFplPercent: 250, initial: 660, final: 844 },
    { fromFplPercent: 250, toFplPercent: 300, initial: 844, final: 996 },
    { fromFplPercent: 300, toFplPercent: 401, initial: 996, final: 996 },
  ],
  provenance: {
    source: "IRS Rev. Proc. 2025-25",
    url: "https://www.irs.gov/pub/irs-drop/rp-25-25.pdf",
    published: "2025-07-18",
    checked: CHECKED,
    status: "secondary-single",
    note:
      "Endpoints 2.10% and 9.96% are corroborated by multiple secondary " +
      "sources. The intermediate bracket values (3.14/4.19/6.60/8.44) are " +
      "NOT individually confirmed; they satisfy the chaining invariant " +
      "(each bracket's final equals the next bracket's initial), which is a " +
      "necessary but not sufficient check. Verify against the primary PDF.",
  },
};

/**
 * Plan year 2027 — Rev. Proc. 2026-26 (issued 2026-07-21).
 * Required contribution percentage: 10.22%.
 *
 * This is the document that settles the central policy question: an indexed
 * table with no bracket above 400% FPL means the pre-ARPA schedule governs.
 */
const APT_2027: ApplicablePercentageTable = {
  planYear: 2027,
  brackets: [
    { fromFplPercent: 0, toFplPercent: 133, initial: 215, final: 215 },
    { fromFplPercent: 133, toFplPercent: 150, initial: 323, final: 430 },
    { fromFplPercent: 150, toFplPercent: 200, initial: 430, final: 678 },
    { fromFplPercent: 200, toFplPercent: 250, initial: 678, final: 866 },
    { fromFplPercent: 250, toFplPercent: 300, initial: 866, final: 1022 },
    { fromFplPercent: 300, toFplPercent: 401, initial: 1022, final: 1022 },
  ],
  provenance: {
    source: "IRS Rev. Proc. 2026-26",
    url: "https://www.irs.gov/pub/irs-drop/rp-26-26.pdf",
    published: "2026-07-21",
    checked: CHECKED,
    status: "secondary-concordant",
    note:
      "Two independent secondary sources (a search summary of the primary PDF " +
      "and Current Federal Tax Developments' technical writeup, 2026-07-21) " +
      "agree on all six brackets. The primary PDF was not readable from the " +
      "build environment. Range 2.15%-10.22% and the 10.22% required " +
      "contribution percentage are separately corroborated by Thomson Reuters.",
  },
};

// ---------------------------------------------------------------------------
// Plan years
// ---------------------------------------------------------------------------

const PY2026: PlanYearParameters = {
  planYear: 2026,
  enhancedCreditsActive: false,
  maxFplPercent: 400,
  minFplPercent: 100,
  povertyGuidelines: FPL_2025,
  applicablePercentageTable: APT_2026,
  requiredContributionPercentage: 996, // 9.96%
  oopMaxSelfOnly: 1_060_000, // $10,600
  oopMaxFamily: 2_120_000, // $21,200
  excessAptcRepaymentCapped: false, // OBBBA repealed §36B(f)(2) caps for TY2026+
  openEnrollment: {
    start: "2025-11-01",
    januaryFirstDeadline: "2025-12-15",
    end: "2026-01-15",
    endIsContested: false,
    note: "Completed. 23.1M plan selections, -5% year over year.",
  },
  provenance: {
    source: "Composite — see individual sub-objects",
    url: "https://www.cms.gov/marketplace/resources/data/public-use-files",
    published: "2025-07-18",
    checked: CHECKED,
    status: "secondary-concordant",
  },
};

const PY2027: PlanYearParameters = {
  planYear: 2027,
  enhancedCreditsActive: false,
  maxFplPercent: 400,
  minFplPercent: 100,
  povertyGuidelines: FPL_2026,
  applicablePercentageTable: APT_2027,
  requiredContributionPercentage: 1022, // 10.22%
  oopMaxSelfOnly: 1_200_000, // $12,000
  oopMaxFamily: 2_400_000, // $24,000
  excessAptcRepaymentCapped: false,
  openEnrollment: {
    start: "2026-11-01",
    januaryFirstDeadline: "2026-12-15",
    end: null,
    endIsContested: true,
    note:
      "CONTESTED. The 2025 Marketplace Integrity rule shortened the federal " +
      "window to 2026-12-15. On 2026-06-12 the District of Maryland vacated " +
      "that provision in City of Columbus v. Kennedy, No. 1:25-cv-2114; an " +
      "appeal to the Fourth Circuit is pending. If the vacatur stands the " +
      "window likely runs to 2027-01-15. Do not hardcode an end date in UI copy.",
  },
  provenance: {
    source: "Composite — see individual sub-objects",
    url: "https://www.irs.gov/pub/irs-drop/rp-26-26.pdf",
    published: "2026-07-21",
    checked: CHECKED,
    status: "secondary-concordant",
  },
};

const PLAN_YEARS: ReadonlyMap<PlanYear, PlanYearParameters> = new Map([
  [2026, PY2026],
  [2027, PY2027],
]);

/** Plan year currently open for enrollment planning as of the build date. */
export const CURRENT_PLAN_YEAR: PlanYear = 2026;

/** Plan year whose open enrollment is next to begin. */
export const UPCOMING_PLAN_YEAR: PlanYear = 2027;

export const SUPPORTED_PLAN_YEARS: readonly PlanYear[] = [2026, 2027];

export class UnsupportedPlanYearError extends Error {
  constructor(readonly planYear: PlanYear) {
    super(
      `Plan year ${planYear} is not configured. Supported: ${SUPPORTED_PLAN_YEARS.join(", ")}.`,
    );
    this.name = "UnsupportedPlanYearError";
  }
}

export class UnverifiedDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnverifiedDataError";
  }
}

export function getPlanYear(planYear: PlanYear): PlanYearParameters {
  const params = PLAN_YEARS.get(planYear);
  if (!params) throw new UnsupportedPlanYearError(planYear);
  return params;
}

/**
 * Reject regions whose poverty guidelines are unverified placeholders.
 *
 * Returning a confidently wrong subsidy for an Alaskan household is strictly
 * worse than returning an error. This is deliberate: the engine fails loudly
 * rather than fabricating.
 */
export function requireVerifiedRegion(
  params: PlanYearParameters,
  region: "contiguous" | "alaska" | "hawaii",
): void {
  const base = params.povertyGuidelines.base[region];
  const increment = params.povertyGuidelines.increment[region];
  if (base <= 0 || increment <= 0) {
    throw new UnverifiedDataError(
      `Poverty guidelines for region "${region}" are not populated for plan year ` +
        `${params.planYear} (guideline year ${params.povertyGuidelines.guidelineYear}). ` +
        `Load the verified HHS table before computing for this region. ` +
        `Source: ${params.povertyGuidelines.provenance.url}`,
    );
  }
}

export { PY2026, PY2027, FPL_2025, FPL_2026, APT_2026, APT_2027 };
