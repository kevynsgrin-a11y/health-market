/**
 * Derivation of the second-lowest-cost silver plan (SLCSP) — the benchmark.
 *
 * This is the number the entire premium tax credit hangs off, and it is the
 * one thing a language model cannot fabricate for a user: it depends on which
 * silver plans an issuer actually filed in that person's rating area, at their
 * exact ages, this plan year.
 *
 * This module is deliberately PURE. It takes normalised plan rates and a
 * household, and returns a benchmark. Fetching and parsing CMS public use
 * files happens in the adapters (see sources.ts / run.ts), so the logic that
 * is easy to get wrong is fully unit-testable without network access.
 *
 * @see https://www.cms.gov/marketplace/resources/data/public-use-files
 */

import { selectRatedMembers } from "../core/rating.js";
import type { Cents, HouseholdMember } from "../core/types.js";

export type MetalLevel =
  | "Bronze"
  | "Expanded Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Catastrophic";

/**
 * A plan's individual rates by age, normalised from the CMS Rate PUF.
 *
 * The Rate PUF expresses age as "0-14", "15".."64", "64 and over". We key the
 * lower bucket at 14 and the upper at 64 and clamp on lookup.
 */
export interface NormalisedPlanRate {
  readonly planId: string;
  readonly metalLevel: MetalLevel;
  readonly ratingAreaId: string;
  readonly stateCode: string;
  /** Non-tobacco individual rate in cents, keyed by age. */
  readonly rateByAge: ReadonlyMap<number, Cents>;
  /** True for on-exchange, individual-market, standard (non-CSR) variants. */
  readonly onExchange: boolean;
}

export const AGE_BUCKET_MIN = 14;
export const AGE_BUCKET_MAX = 64;

export class MissingRateError extends Error {
  constructor(readonly planId: string, readonly age: number) {
    super(`Plan ${planId} has no filed rate for age ${age}.`);
    this.name = "MissingRateError";
  }
}

/** Look up a member's rate, clamping to the Rate PUF's terminal age buckets. */
export function rateForAge(plan: NormalisedPlanRate, age: number): Cents {
  const key = age <= AGE_BUCKET_MIN ? AGE_BUCKET_MIN : age >= AGE_BUCKET_MAX ? AGE_BUCKET_MAX : age;
  const rate = plan.rateByAge.get(key);
  if (rate === undefined) throw new MissingRateError(plan.planId, age);
  return rate;
}

/**
 * Total monthly premium for a household on one plan.
 *
 * Applies the 45 CFR 147.102(c)(1) three-oldest-children rule: a fourth child
 * under 21 adds nothing to the premium.
 */
export function householdPremium(
  plan: NormalisedPlanRate,
  members: readonly HouseholdMember[],
): Cents {
  const { rated } = selectRatedMembers(members);
  return rated.reduce((total, m) => total + rateForAge(plan, m.age), 0);
}

export interface RankedPlan {
  readonly planId: string;
  readonly metalLevel: MetalLevel;
  readonly monthlyPremium: Cents;
}

export interface SlcspDerivation {
  /** Monthly second-lowest-cost silver premium for this household. */
  readonly monthlySlcsp: Cents | null;
  readonly slcspPlanId: string | null;
  /** Monthly lowest-cost bronze premium (includes Expanded Bronze). */
  readonly monthlyLcbp: Cents | null;
  readonly lcbpPlanId: string | null;
  readonly silverPlanCount: number;
  readonly rankedSilver: readonly RankedPlan[];
}

function comparePlans(a: RankedPlan, b: RankedPlan): number {
  // Price first; plan id breaks ties so output is deterministic across runs.
  if (a.monthlyPremium !== b.monthlyPremium) return a.monthlyPremium - b.monthlyPremium;
  return a.planId.localeCompare(b.planId);
}

/**
 * Derive the benchmark from the set of plans available in a location.
 *
 * Conventions that matter:
 *   - Only on-exchange individual-market plans count.
 *   - Catastrophic plans are never the benchmark.
 *   - When exactly one silver plan is offered, that plan IS the benchmark.
 *     (There is no "second lowest" to take, and the statute's reference to the
 *     second-lowest-cost silver plan resolves to the only silver plan.)
 *   - When no silver plan is offered, there is no benchmark and no credit can
 *     be computed — we return null rather than substituting another metal.
 */
export function deriveSlcsp(
  plans: readonly NormalisedPlanRate[],
  members: readonly HouseholdMember[],
): SlcspDerivation {
  const onExchange = plans.filter((p) => p.onExchange);

  const priced = (level: (m: MetalLevel) => boolean): RankedPlan[] =>
    onExchange
      .filter((p) => level(p.metalLevel))
      .map((p) => ({
        planId: p.planId,
        metalLevel: p.metalLevel,
        monthlyPremium: householdPremium(p, members),
      }))
      .sort(comparePlans);

  const silver = priced((m) => m === "Silver");
  const bronze = priced((m) => m === "Bronze" || m === "Expanded Bronze");

  const benchmark = silver.length === 0 ? null : (silver[1] ?? silver[0]!);
  const lowestBronze = bronze[0] ?? null;

  return {
    monthlySlcsp: benchmark?.monthlyPremium ?? null,
    slcspPlanId: benchmark?.planId ?? null,
    monthlyLcbp: lowestBronze?.monthlyPremium ?? null,
    lcbpPlanId: lowestBronze?.planId ?? null,
    silverPlanCount: silver.length,
    rankedSilver: silver,
  };
}
