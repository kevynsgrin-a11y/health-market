/**
 * Premium rating rules: which household members are charged, and the federal
 * default standard age curve.
 *
 * THE THREE-CHILD RULE
 * --------------------
 * 45 CFR 147.102(c)(1): family premiums are the sum of individual member
 * premiums, but "in the case of family coverage ... the total premium ... may
 * only account for the three oldest covered children who are under age 21."
 *
 * A fourth child under 21 is covered at no additional premium. Calculators
 * that naively sum every member overcharge large families — often by hundreds
 * of dollars a month — and it is one of the most reliable ways to spot a tool
 * that was never checked against a real quote.
 *
 * @see https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-B/part-147
 */

import type { HouseholdMember } from "./types.js";

/** Children below this age are subject to the three-oldest-children cap. */
export const CHILD_RATING_AGE_CEILING = 21;

/** Maximum number of under-21 children included in a family premium. */
export const MAX_RATED_CHILDREN = 3;

export interface RatedMemberSelection {
  /** Members whose premium is included in the family total. */
  readonly rated: readonly HouseholdMember[];
  /** Under-21 children excluded by the three-child cap. */
  readonly excludedChildren: readonly HouseholdMember[];
}

/**
 * Select the members whose individual premiums sum to the family premium.
 *
 * Adults (21+) are always rated. Children under 21 are rated oldest-first, up
 * to three. Members not seeking coverage are never rated — they count toward
 * household size for FPL purposes only.
 */
export function selectRatedMembers(
  members: readonly HouseholdMember[],
): RatedMemberSelection {
  const seeking = members.filter((m) => m.seeksCoverage);

  const adults = seeking.filter((m) => m.age >= CHILD_RATING_AGE_CEILING);
  const children = seeking
    .filter((m) => m.age < CHILD_RATING_AGE_CEILING)
    // Oldest first. Stable for equal ages, which keeps output deterministic.
    .sort((a, b) => b.age - a.age);

  const ratedChildren = children.slice(0, MAX_RATED_CHILDREN);
  const excludedChildren = children.slice(MAX_RATED_CHILDREN);

  return {
    rated: [...adults, ...ratedChildren],
    excludedChildren,
  };
}

/**
 * Federal default standard age curve — VERIFIED POINTS ONLY.
 *
 * CMS publishes a factor for every age 0-64+. Only the points below were
 * verifiable from this build environment, so `ageFactor()` throws for any
 * other age rather than interpolating a plausible-looking guess.
 *
 * In production this table is not the pricing path: actual per-age premiums
 * come from the CMS Rate PUF, which states the dollar amount directly. The
 * curve exists as a cross-check and for jurisdictions that use it.
 *
 * @see https://www.hhs.gov/guidance/sites/default/files/hhs-guidance-documents/CMS/Final-Guidance-Regarding-Age-Curves-and-State-Reporting-12-16-16.pdf
 */
const VERIFIED_AGE_FACTORS: ReadonlyMap<number, number> = new Map([
  [14, 0.765], // and all ages below 14
  [21, 1.0],
  [40, 1.278],
  [50, 1.786],
  [55, 2.23],
  [64, 3.0], // and 64+
]);

export class UnverifiedAgeFactorError extends Error {
  constructor(readonly age: number) {
    super(
      `No verified federal age-curve factor for age ${age}. Verified ages: ` +
        `${[...VERIFIED_AGE_FACTORS.keys()].join(", ")} (plus <=14 and 64+). ` +
        `Load the full CMS age curve, or price from the Rate PUF instead.`,
    );
    this.name = "UnverifiedAgeFactorError";
  }
}

/** Age-curve factor for an age, or throw if that age is not verified. */
export function ageFactor(age: number): number {
  if (age < 0 || !Number.isInteger(age)) {
    throw new TypeError(`Age must be a non-negative integer; received ${age}.`);
  }
  if (age <= 14) return 0.765;
  if (age >= 64) return 3.0;
  const factor = VERIFIED_AGE_FACTORS.get(age);
  if (factor === undefined) throw new UnverifiedAgeFactorError(age);
  return factor;
}

/** Ages for which a verified factor exists. Useful for tests and diagnostics. */
export function verifiedAges(): readonly number[] {
  return [...VERIFIED_AGE_FACTORS.keys()].sort((a, b) => a - b);
}

/**
 * The ACA's 3:1 age band. An issuer may not charge a 64-year-old more than
 * three times what it charges a 21-year-old for the same plan.
 */
export const MAX_AGE_RATIO = 3.0;
