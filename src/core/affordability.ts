/**
 * Employer-coverage affordability under §36B(c)(2)(C).
 *
 * An offer of employer coverage that is both AFFORDABLE and provides MINIMUM
 * VALUE disqualifies the entire tax household from the premium tax credit —
 * even if nobody enrolls in it. Coverage is affordable when the employee's
 * required contribution for the lowest-cost self-only option does not exceed
 * the required contribution percentage of household income.
 *
 * That percentage is indexed annually: 9.96% for 2026, 10.22% for 2027.
 *
 * This matters for the cliff planner because it is a second, independent way
 * to lose the credit entirely — and unlike the cliff it can be triggered by a
 * change at work rather than a change in income.
 */

import { applyRate } from "./applicable-percentage";
import type { AffordabilityResult, Cents, PlanYearParameters } from "./types";

export interface AffordabilityInput {
  /** Household income (MAGI) for the coverage year. */
  readonly annualIncome: Cents;
  /** Employee's annual contribution for the LOWEST-COST SELF-ONLY option. */
  readonly employeeAnnualContribution: Cents;
  /**
   * Whether the employer plan provides minimum value (at least 60% actuarial
   * value). Affordability alone does not bar the credit — both tests must fail.
   */
  readonly providesMinimumValue: boolean;
}

export function assessAffordability(
  params: PlanYearParameters,
  input: AffordabilityInput,
): AffordabilityResult {
  const threshold = applyRate(input.annualIncome, params.requiredContributionPercentage);
  const isAffordable = input.employeeAnnualContribution <= threshold;

  return {
    planYear: params.planYear,
    thresholdPercentage: params.requiredContributionPercentage,
    affordabilityThreshold: threshold,
    employeeAnnualContribution: input.employeeAnnualContribution,
    isAffordable,
    barsFromPtc: isAffordable && input.providesMinimumValue,
  };
}
