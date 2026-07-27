import { describe, expect, it } from "vitest";

import {
  deriveSlcsp,
  householdPremium,
  MissingRateError,
  rateForAge,
  type MetalLevel,
  type NormalisedPlanRate,
} from "../src/etl/slcsp.js";
import type { HouseholdMember } from "../src/core/types.js";

const USD = (d: number): number => Math.round(d * 100);

/** Build a plan whose rate rises $10/mo per year of age from a base at 21. */
function plan(
  planId: string,
  metalLevel: MetalLevel,
  baseAt21: number,
  opts: { onExchange?: boolean } = {},
): NormalisedPlanRate {
  const rateByAge = new Map<number, number>();
  for (let age = 14; age <= 64; age += 1) {
    rateByAge.set(age, USD(baseAt21 + (age - 21) * 10));
  }
  return {
    planId,
    metalLevel,
    ratingAreaId: "Rating Area 1",
    stateCode: "TX",
    rateByAge,
    onExchange: opts.onExchange ?? true,
  };
}

const adult = (age: number): HouseholdMember => ({ age, seeksCoverage: true });

describe("rateForAge", () => {
  const p = plan("P1", "Silver", 300);

  it("clamps ages 14 and below to the 0-14 bucket", () => {
    expect(rateForAge(p, 0)).toBe(rateForAge(p, 14));
    expect(rateForAge(p, 9)).toBe(rateForAge(p, 14));
  });

  it("clamps ages 64 and above to the 64+ bucket", () => {
    expect(rateForAge(p, 70)).toBe(rateForAge(p, 64));
    expect(rateForAge(p, 99)).toBe(rateForAge(p, 64));
  });

  it("throws when an issuer filed no rate for an age", () => {
    const sparse: NormalisedPlanRate = { ...p, rateByAge: new Map([[21, USD(300)]]) };
    expect(() => rateForAge(sparse, 40)).toThrow(MissingRateError);
  });
});

describe("householdPremium", () => {
  it("sums the rated members", () => {
    const p = plan("P1", "Silver", 300);
    // Ages 40 and 38 -> (300+190) + (300+170) = 490 + 470 = 960
    expect(householdPremium(p, [adult(40), adult(38)])).toBe(USD(960));
  });

  it("applies the three-oldest-children cap", () => {
    const p = plan("P1", "Silver", 300);
    const withThreeKids = [adult(40), adult(19), adult(16), adult(12)];
    const withFourKids = [...withThreeKids, adult(8)];
    // The fourth child under 21 must add nothing.
    expect(householdPremium(p, withFourKids)).toBe(householdPremium(p, withThreeKids));
  });

  it("ignores members not seeking coverage", () => {
    const p = plan("P1", "Silver", 300);
    const premium = householdPremium(p, [
      adult(40),
      { age: 38, seeksCoverage: false },
    ]);
    expect(premium).toBe(rateForAge(p, 40));
  });
});

describe("deriveSlcsp", () => {
  const members = [adult(40)];

  it("picks the SECOND lowest silver plan, not the lowest", () => {
    const result = deriveSlcsp(
      [
        plan("SILVER-C", "Silver", 500),
        plan("SILVER-A", "Silver", 300),
        plan("SILVER-B", "Silver", 400),
      ],
      members,
    );
    expect(result.slcspPlanId).toBe("SILVER-B");
    expect(result.monthlySlcsp).toBe(USD(400 + 190));
    expect(result.silverPlanCount).toBe(3);
  });

  it("falls back to the only silver plan when just one is offered", () => {
    const result = deriveSlcsp([plan("ONLY-SILVER", "Silver", 350)], members);
    expect(result.slcspPlanId).toBe("ONLY-SILVER");
    expect(result.monthlySlcsp).toBe(USD(350 + 190));
  });

  it("returns null — never a substitute metal — when no silver plan exists", () => {
    const result = deriveSlcsp(
      [plan("B1", "Bronze", 200), plan("G1", "Gold", 600)],
      members,
    );
    expect(result.monthlySlcsp).toBeNull();
    expect(result.slcspPlanId).toBeNull();
    expect(result.silverPlanCount).toBe(0);
  });

  it("excludes off-exchange plans from the benchmark", () => {
    const result = deriveSlcsp(
      [
        plan("OFF-CHEAP", "Silver", 100, { onExchange: false }),
        plan("ON-A", "Silver", 300),
        plan("ON-B", "Silver", 400),
      ],
      members,
    );
    // If the off-exchange plan leaked in, SLCSP would be ON-A at $300 base.
    expect(result.slcspPlanId).toBe("ON-B");
  });

  it("never selects a catastrophic plan as the benchmark", () => {
    const result = deriveSlcsp(
      [
        plan("CAT-1", "Catastrophic", 100),
        plan("CAT-2", "Catastrophic", 120),
        plan("S1", "Silver", 400),
      ],
      members,
    );
    expect(result.slcspPlanId).toBe("S1");
  });

  it("treats Expanded Bronze as bronze for the lowest-cost bronze plan", () => {
    const result = deriveSlcsp(
      [
        plan("EB", "Expanded Bronze", 180),
        plan("B", "Bronze", 220),
        plan("S1", "Silver", 400),
        plan("S2", "Silver", 420),
      ],
      members,
    );
    expect(result.lcbpPlanId).toBe("EB");
    expect(result.monthlyLcbp).toBe(USD(180 + 190));
  });

  it("breaks price ties deterministically by plan id", () => {
    const a = deriveSlcsp(
      [plan("ZZZ", "Silver", 300), plan("AAA", "Silver", 300), plan("MMM", "Silver", 300)],
      members,
    );
    const b = deriveSlcsp(
      [plan("MMM", "Silver", 300), plan("ZZZ", "Silver", 300), plan("AAA", "Silver", 300)],
      members,
    );
    expect(a.slcspPlanId).toBe(b.slcspPlanId);
    expect(a.slcspPlanId).toBe("MMM"); // AAA is lowest; MMM is second
  });

  it("prices the benchmark for the whole household, not one person", () => {
    const family = [adult(45), adult(43), adult(15), adult(12)];
    const result = deriveSlcsp(
      [plan("S1", "Silver", 300), plan("S2", "Silver", 320)],
      family,
    );
    const p = plan("S2", "Silver", 320);
    expect(result.monthlySlcsp).toBe(householdPremium(p, family));
    expect(result.monthlySlcsp).toBeGreaterThan(rateForAge(p, 45));
  });

  it("returns an empty ranking when there are no plans at all", () => {
    const result = deriveSlcsp([], members);
    expect(result.monthlySlcsp).toBeNull();
    expect(result.rankedSilver).toEqual([]);
  });
});
