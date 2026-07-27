# ACA Marketplace Open-Enrollment Subsidy & Plan Estimator — GO / NO-GO Assessment

**Prepared:** July 27, 2026
**Analyst note on date:** the brief states "Today is July 12, 2026." The session clock reads **July 27, 2026**, and I have used that. This is material, not pedantic: **IRS Rev. Proc. 2026-26 — the document that settles the 2027 subsidy schedule — was issued July 21, 2026**, i.e. inside the gap. Had I answered as of July 12 the central question would still have been open.

**Research-method limitation (read this before trusting any citation below).** This session's egress policy blocked all direct document retrieval — `curl` and the page-fetch tool both returned `403 CONNECT`/`403 Forbidden` for `irs.gov`, `cms.gov`, `congress.gov`, `kff.org`, `federalregister.gov`, `aspe.hhs.gov` and every other host tried. Verified via the proxy status endpoint: `{"kind":"connect_rejected","detail":"gateway answered 403 to CONNECT (policy denial …)"}`. **Web search was the only working channel.** Every fact below therefore rests on search-result snippets and summaries rather than on the primary PDF as read by me. I have labeled confidence per claim. Before writing a line of production code, re-verify every number in **GOLDEN FACTS** against the primary URL given.

---

## 1. THE CENTRAL POLICY QUESTION — answered definitively

**The enhanced premium tax credits (ARPA §9661/§9663, extended by IRA §12001) lapsed on December 31, 2025. Congress did not extend them. They are not in effect for plan year 2026, and they are not in effect for plan year 2027.** The pre-ARPA §36B schedule — including the 400% FPL subsidy cliff — governs the Open Enrollment period beginning November 1, 2026.

The chain of evidence:

| Date | Event | Source |
|---|---|---|
| Nov 2025 | The 43-day shutdown ends with a continuing resolution promising a Senate vote on the ePTCs | [ASTHO legislative timeline](https://www.astho.org/communications/blog/2026/aca-enhanced-premium-tax-credits-legislative-developments-2025-2026/) |
| Dec 11, 2025 | Senate votes on **S.3385** (Lower Health Care Costs Act, 3-year ePTC extension) and **S.3386** (Health Care Freedom for Patients Act, HSA-style alternative). **Neither reached 60 votes.** | [WTW](https://www.wtwco.com/en-us/insights/2025/12/congress-delays-action-on-aca-enhanced-premium-tax-credits); [ASTHO](https://www.astho.org/communications/blog/2026/aca-enhanced-premium-tax-credits-legislative-developments-2025-2026/) |
| Dec 31, 2025 | **ePTCs expire.** Congress recessed without acting. | [PBS NewsHour](https://www.pbs.org/newshour/health/health-subsidies-expire-launching-millions-of-americans-into-2026-with-steep-insurance-hikes); [The Hill](https://thehill.com/policy/healthcare/5668719-aca-obamacare-subsidies-expire/) |
| Jan 8, 2026 | House passes a 3-year extension **230–196**, 17 Republicans crossing over. Universally reported as dead on arrival in the Senate; treated as a legislative vehicle for a hoped-for compromise. | [CNBC](https://www.cnbc.com/2026/01/08/obamacare-subsidies-extension-congress.html); [STAT](https://www.statnews.com/2026/01/08/aca-subsidy-vote-house-extends-health-insurance-premiums-aid/); [Ballotpedia](https://news.ballotpedia.org/2026/01/12/house-passes-three-year-extension-of-expanded-aca-subsidies/) |
| Early 2026 | Bipartisan Senate compromise ("CARE Act"; separately a Moreno–Collins proposal) — 2-year revival with income caps and minimum premium payments — **collapses**. Reporting attributes the breakdown to the Hyde Amendment / abortion-funding dispute. Moreno: the plan is "effectively over." | [NBC News](https://www.nbcnews.com/politics/congress/senate-aca-funding-talks-fizzle-higher-premiums-take-effect-millions-rcna254227); [The Hill](https://thehill.com/policy/healthcare/5723559-moreno-collins-proposal-fizzles/) |
| **Jul 21, 2026** | **IRS issues Rev. Proc. 2026-26**, publishing the indexed §36B(b)(3)(A)(i) Applicable Percentage Table for taxable years beginning in 2027, running **2.15% → 10.22%**, with no bracket above 400% FPL. | [Rev. Proc. 2026-26 (PDF)](https://www.irs.gov/pub/irs-drop/rp-26-26.pdf); [Current Federal Tax Developments, Jul 21, 2026](https://www.currentfederaltaxdevelopments.com/blog/2026/7/21/revenue-procedure-2026-26-technical-overview-of-2027-indexing-adjustments-for-premium-tax-credits-and-affordability-standards); [Thomson Reuters](https://tax.thomsonreuters.com/news/irs-announces-indexing-adjustments-for-2027-aca-affordability-and-premium-tax-credit-determinations/) |

**Why Rev. Proc. 2026-26 is dispositive, not merely suggestive.** During 2021–2025 the enhanced credits *overrode* the §36B(b)(3)(A)(i) table; Treasury's annual revenue procedures for those years said so explicitly and suspended the indexing. Rev. Proc. 2026-26 does the opposite — it *publishes an indexed table topping out at 400% FPL*. Treasury does not index a table that statute has displaced. The IRS publishing a 2027 table with a 400% ceiling on July 21, 2026 is the executive branch's operational statement that the enhanced credits are gone for 2027.

**Confidence: high on the outcome; medium on the precise bracket values** (I could not open the IRS PDF; the bracket table below came from a search summary of it and one law-firm technical writeup, which agree).

**Standing caveat.** H.R. 5145 (Bipartisan Premium Tax Credit Extension Act, Kiggans) and the House-passed 3-year bill remain technically alive in the 119th Congress, and a retroactive extension is not physically impossible before Nov 1. It is, on the reporting as of late July 2026, unlikely — the blocking issue is Hyde, which is not a number anyone can split. **Treat any revival as a product event to be ready for, not a base case.** See KILL/PIVOT criteria.

### The 2027 subsidy schedule (Rev. Proc. 2026-26)

| Household income as % of FPL | Initial % | Final % |
|---|---|---|
| Less than 133% | 2.15% | 2.15% |
| At least 133% but less than 150% | 3.23% | 4.30% |
| At least 150% but less than 200% | 4.30% | 6.78% |
| At least 200% but less than 250% | 6.78% | 8.66% |
| At least 250% but less than 300% | 8.66% | 10.22% |
| At least 300% but not more than 400% | 10.22% | 10.22% |
| **Over 400%** | **ineligible — $0** | **—** |

Required Contribution Percentage (employer-coverage affordability, §36B(c)(2)(C)(i)(II)): **10.22% for plan years beginning in 2027**, up from 9.96% for 2026 ([Rev. Proc. 2025-25](https://www.irs.gov/pub/irs-drop/rp-25-25.pdf)).

Governing formula, unchanged: `PTC = max(0, SLCSP_premium − (household_income × applicable_percentage))`, with the applicable percentage interpolated **linearly** within the bracket per [26 CFR 1.36B-3(g)](https://www.ecfr.gov/current/title-26/chapter-I/subchapter-A/part-1/subject-group-ECFR9c9b6de5da0161e/section-1.36B-3), and the credit capped at the actual premium of the plan chosen.

### Second-order rule changes that also bite in 2027

- **Excess-APTC repayment caps are repealed.** OBBBA (H.R. 1, signed July 4, 2025) eliminated the §36B(f)(2) repayment limitation for tax years beginning after Dec 31, 2025. Underestimate your income and you now repay **100% of the excess**, uncapped, on Form 8962. First bites on the 2026 return filed in early 2027. ([Tax Notes on the IRS FAQ revision](https://www.taxnotes.com/research/federal/irs-guidance/fact-sheets/fact-sheet-revises-faqs-premium-tax-credit-after-obbba-enactment/7tf60); [Western CPE](https://www.westerncpe.com/taxbyte/irs-premium-tax-credit-faq-update-what-to-know-for-2026/))
- **Immigrant eligibility narrows Jan 1, 2027.** OBBBA §71301 replaces "lawfully present" with a narrow list (LPRs, Cuban/Haitian entrants, COFA residents). §71302 ends PTC eligibility for lawfully present immigrants under 100% FPL who are Medicaid-ineligible due to status, effective for tax years after Dec 31, 2025. ([King & Spalding](https://www.kslaw.com/news-and-insights/the-one-big-beautiful-bill-act-explained-a-detailed-review-of-key-changes-for-the-healthcare-industry); [CAP effective-date timeline](https://www.americanprogress.org/article/when-do-the-one-big-beautiful-bill-acts-health-care-provisions-go-into-effect/))
- **2027 cost-sharing limits:** $12,000 self-only / $24,000 other-than-self-only, +13.2% over 2026's $10,600 / $21,200. Premium adjustment percentage for 2027: 1.8916224814. Released Jan 29, 2026. ([Milliman](https://www.milliman.com/en/insight/2027-aca-oop-max-limits-released-group-health); [CMS 2027 PAPI guidance PDF](https://www.cms.gov/files/document/2027-papi-parameters-guidance-2026-01-29.pdf))
- **2027 NBPP final rule** released May 15, 2026, published May 20, effective July 20, 2026. Risk-adjustment user fee cut to $0.18 PMPM. ([CMS fact sheet](https://www.cms.gov/newsroom/fact-sheets/hhs-notice-benefit-payment-parameters-2027-final-rule); [Federal Register](https://www.federalregister.gov/documents/2026/02/11/2026-02769/patient-protection-and-affordable-care-act-hhs-notice-of-benefit-and-payment-parameters-for-2027-and); [Groom](https://www.groom.com/resources/cms-issues-2027-hhs-notice-of-benefit-and-payment-parameters-final-rule/))

### The unresolved date question — and it matters more than it looks

The 2025 Marketplace Integrity and Affordability final rule ([90 FR 27074](https://www.federalregister.gov/documents/2025/06/25/2025-11606/patient-protection-and-affordable-care-act-marketplace-integrity-and-affordability)) shortened the federal Open Enrollment window to **Nov 1 – Dec 15 beginning with PY2027**. On **June 12, 2026**, Judge Brendan Hurson (D. Md.) in *City of Columbus v. Kennedy*, No. 1:25-cv-2114, **vacated** a set of that rule's provisions — reportedly including the OE shortening, the $5 auto-reenrollment premium, the past-due-premium rule, SEP pre-enrollment verification, the income-inconsistency window change, and the widened AV de minimis ranges. HHS reportedly declined to re-finalize those provisions in the 2027 NBPP. An appeal to the Fourth Circuit is in play. ([Order PDF, Democracy Forward](https://democracyforward.org/wp-content/uploads/2026/06/City-of-Columbus-et-al.-v.-Robert-F.-Kennedy-Jr-MSJ-Order.pdf); [SHVS analysis](https://shvs.org/ruling-in-challenge-to-marketplace-rule-initial-analysis-and-implications-for-states/); [Georgetown litigation tracker](https://litigationtracker.law.georgetown.edu/litigation/city-of-columbus-et-al-v-kennedy-et-al/); [CMS impacts memo PDF](https://www.cms.gov/files/document/columbus-kennedy-impacts.pdf))

Sources genuinely conflict on the operative 2027 end date — some post-ruling write-ups still say Nov 1 – Dec 15, others say the January 15 deadline survives. **This is unresolved as of July 27, 2026 and I will not pretend otherwise.** Build for both: a config-driven deadline per state, and copy that never hardcodes "January 15."

Commercially, the difference is the whole ballgame: **Nov 1 – Jan 15 is a 10.5-week revenue season; Nov 1 – Dec 15 is 6.5 weeks.** A 38% cut to the only window in which this site earns.

---

## 2. DEMAND & SEASONALITY

**The shape is brutally spiky and I could not measure it precisely.** Google Trends is not reachable from this environment and no credible published index of search volume for these exact terms surfaced. What is verifiable is the *enrollment* seasonality, which is the demand's shadow:

- CMS publishes weekly enrollment snapshots showing a hard spike into the Dec 15 deadline. Week-7 (Dec 9–15) volumes historically: **4.14M (2018 PY), 4.32M (2019 PY), 4.42M (2020 PY)**; week 6 of PY2022 OE (Dec 5–15, 2021) ≈ **5.8M**. ([CMS weekly snapshots](https://www.cms.gov/newsroom/fact-sheets/marketplace-weekly-enrollment-snapshot-week-6))
- The single largest day on record: **Dec 15, 2023 — 745,000+ plan selections on HealthCare.gov alone.** ([CMS](https://cms.gov/newsroom/press-releases/healthcaregov-enrollment-exceeds-15-million-surpassing-previous-years-milestones))
- Similarweb reports HealthCare.gov traffic **−39.79% month-over-month as of May 2026**, with global rank sliding from 4,869 → 8,590 over three months. Off-season demand collapses. ([Similarweb](https://www.similarweb.com/website/healthcare.gov/)) *(Third-party panel estimate — directional only.)*

**Market size, PY2026 (the shock year):** 23.1M plan selections, **−5% / −1.2M** vs. 2025 (15.8M HealthCare.gov, 7.4M SBE). New consumers **−13%** to 3.6M; auto-reenrollees **−19%** to 8.8M; *active* re-enrollees **+15%** to 10.7M. ([CMS national snapshot](https://www.cms.gov/newsroom/fact-sheets/marketplace-2026-open-enrollment-period-report-national-snapshot); [ACASignups](https://acasignups.net/26/01/29/breaking-cms-posts-semifinal-2026-open-enrollment-report-230m-qhps-down-only-13m); [Fierce Healthcare](https://www.fiercehealthcare.com/payers/cms-years-open-enrollment-brought-fewer-signups-higher-premiums-fewer-silver-sign-ups))

**Read that +15% active re-enrollment number carefully — it is the single most important demand signal in this report.** Auto-reenrollees don't shop and don't search. Active re-enrollees do. The subsidy lapse converted ~1.4M passive renewers into *active shoppers who had to look up a number*. That is precisely this tool's addressable audience, and it grew while the overall market shrank.

**Price pressure sustains into 2027:**
- 2026 benchmark silver rose ~26% nationally (**30% on HealthCare.gov**, 17% on SBEs). ([KFF](https://www.kff.org/quick-insights/aca-insurers-are-raising-premiums-by-an-estimated-26-but-most-enrollees-could-see-sharper-increases-in-what-they-pay/))
- Average subsidized enrollee out-of-pocket premium **+114%, $888 → $1,904/yr**. ([KFF](https://www.kff.org/affordable-care-act/aca-marketplace-premium-payments-would-more-than-double-on-average-next-year-if-enhanced-premium-tax-credits-expire/))
- **2027 preliminary filings: 14% median increase**, 77 insurers across 16 states + DC, most requesting 10–20%, 20 insurers above 20%, full range 1–52%. Rate filings were due July 15, 2026; finalization late summer. ([KFF](https://www.kff.org/affordable-care-act/in-preliminary-rate-filings-aca-marketplace-insurers-largely-propose-double-digit-premium-increase-for-2027-following-a-steep-climb-this-year/); [Peterson-KFF](https://www.healthsystemtracker.org/brief/how-much-and-why-aca-marketplace-premiums-are-going-up-in-2027/))
- Coverage-loss projections: CBO **+3.8M uninsured/yr avg 2026–2034**; Urban Institute **7.3M lose ACA coverage in 2026, 4.8M become uninsured**. ([Urban](https://www.urban.org/research/publication/48-million-people-will-lose-coverage-2026-if-enhanced-premium-tax-credits); [CBPP](https://www.cbpp.org/research/health/health-insurance-premium-spikes-imminent-as-tax-credit-enhancements-set-to-expire))

**The honest read on the 2026–27 demand effect.** The subsidy cut is a demand *tailwind for shopping intent* and a *headwind for market size*. But the newsjack half-life has passed: the "my premium doubled" story broke Oct 2025–Jan 2026. By November 2026, year two of the cliff is the status quo. Meanwhile the addressable market is shrinking (23.1M → likely lower for 2027) and the people leaving are disproportionately the subsidy-sensitive low-income users who generate the least ad value. **Plan for demand that is high-intent, moderately-sized, and compressed into 6.5–10.5 weeks.**

---

## 3. WEDGES — rated

### (a) "KFF is static and un-optimized; a faster, mobile-first, ZIP-first tool wins the SERP" — **5/10. Half right, and the wrong half is load-bearing.**

The product critique is correct and verifiable. KFF's Marketplace Calculator returns the **benchmark silver premium only — not actual purchasable plans** ([KFF](https://www.kff.org/interactive/subsidy-calculator/)), and its refresh is slow: the 2026-data update landed **March 16, 2026**, months into the plan year it describes. It is desktop-shaped, ad-free, and built for policy analysts.

The SERP conclusion does not follow. The head terms are not guarded by one beatable incumbent — they are **saturated by a dozen well-resourced sites**: healthinsurance.org, ValuePenguin (LendingTree), HealthCareInsider (Healthcare.com), NerdWallet, obamacarefacts.com, plus pure-play clones **that already exist and already rank** — `acasubsidycalculator.com`, `sensiblecalc.com`, `foundthetool.com`, `myhealthinsurance.com`, `sum.money`. A crowded SERP of commercial sites is a *harder* target than a single authoritative nonprofit, because there is no single quality gap to exploit and the incumbents have link equity, domain age, and staff. Speed and mobile-first are table stakes, not a wedge.

### (b) "If subsidies were cut, a 'how much more will I pay in 2027' shock calculator is a massive newsjack" — **2/10. The wedge is closed.**

Two independent reasons.

**KFF already shipped it.** [Calculator: ACA Enhanced Premium Tax Credit](https://www.kff.org/interactive/calculator-aca-enhanced-premium-tax-credit/) — "How Much More Would People Pay in Premiums if the ACA's Enhanced Premium Tax Credits Expire?" — **updated October 29, 2025**, before OE opened, with 2026 premiums, the IRS 2026 contribution caps, and the new poverty guidelines. It does exactly the thing, from the domain journalists cite by reflex. KFF also published the [state-level burden map](https://www.kff.org/affordable-care-act/mapping-the-uneven-burden-of-rising-aca-marketplace-premium-payments-due-to-enhanced-tax-credit-expiration/).

**And the news already happened.** A newsjack is a bet on a *transition*. The transition was Dec 31, 2025. By OE 2027 the counterfactual is 21 months stale — you'd be asking users to compare against a subsidy regime that ended two plan years ago. Nobody searches "how much more than 2025."

*The one live variant:* if Congress passes a retroactive or forward extension between now and January, a **"what does the new law change for me"** calculator is a real, sharp newsjack — with hours, not weeks, of lead time. That is a contingency plan, not a strategy.

### (c) "A state-picker that routes to the right exchange fills a gap" — **4/10 as stated; 7/10 in its sharpened form.**

As stated it's a lookup — "which exchange does Pennsylvania use?" is exactly the prose question AI Overviews answers perfectly and monetizes at near-zero. The routing gap is real (**21 State-Based Exchanges + 2 SBE-FPs for PY2026; Oregon becomes an SBM for PY2027**; [CMS marketplace-type map](https://www.cms.gov/marketplace/in-person-assisters/training-webinars/training/marketplaces-map)), and it *is* the reason cross-state tools break — but a router alone earns nothing.

It becomes valuable when the router carries **state-specific math**: several SBM states layer their own premium assistance on top of federal PTC (CA, NJ, NY, MA, VT, WA, CO, NM, among others). "Federal PTC = $0 because you're at 410% FPL, **but California's state subsidy still gives you $X**" is a genuinely hard, genuinely uncomputable-from-prose answer that no national tool gets right and that AI cannot fabricate. **Note the cost:** each state program is a separate rule set, separate data source, separate ToS, refreshed on its own calendar. That is the single largest maintenance line item in this project.

### (d) The wedge that is not in the brief — and the one I would actually build: **the 400% Cliff Planner. 8/10.**

The cliff is back and it is now the most financially violent feature of the ACA. Cross 400% FPL by **$1** and you lose **every dollar** of subsidy. Reported example: a 60-year-old couple at ~$85,000 (≈402% FPL) paid roughly $7,225 in 2025 under the enhanced credit; in 2026 with no subsidy, benchmark exposure exceeds **$22,000** ([healthinsurance.org](https://www.healthinsurance.org/blog/marketplace-enrollees-face-return-of-the-subsidy-cliff/); [CNBC](https://www.cnbc.com/2026/01/06/aca-subsidy-cliff-tax-bills.html)). Layer on **uncapped APTC clawback** from the 2026 tax year forward and the downside of a wrong income estimate is now unbounded.

The product: enter ZIP, ages, household size → get **the exact dollar income at which your cliff sits**, the dollar cost of crossing it, and the MAGI levers that move you back under (HSA, traditional/SEP IRA, solo 401(k), business expense timing).

Why it beats (a), (b) and (c):
- **It breaks the seasonality trap.** Income management is a Q4-and-tax-season activity, not a Nov 1 activity. Two demand peaks, not one — and the second (Jan–Apr, Form 8962 season) overlaps the highest-RPM period of the ad year.
- **The audience is the high-value one.** Early retirees / FIRE, self-employed, consultants, small-business owners — the people *at* 350–450% FPL. They are exactly the enrollees the subsidy cut hit hardest, they have money, and they search year-round.
- **AI genuinely cannot do it.** Not because the arithmetic is hard, but because the answer requires *your ZIP's actual SLCSP for your exact household composition*. A chatbot will confidently invent that number. You will have it from the PUFs.
- **Nobody owns it.** KFF won't build tax-planning tools. The lead-gen sites want your phone number, not your IRA contribution schedule.

---

## 4. MONETIZATION — with the uncomfortable parts

**Display is the only clean path, and the numbers are thinner than the RPM tables suggest.**

*Ad networks (verified):*
- **Mediavine** dropped its flat traffic floor; the main network now requires **$5,000/yr in ad revenue**. Its **Journey** on-ramp accepts sites at **1,000 sessions/month** as of **Jan 15, 2026**, at a **70% revenue share** with the Grow plugin required. ([Journey](https://www.productiveblogging.com/everything-you-need-to-know-about-journey-by-mediavine/); [requirements](https://www.jupiter.co/blog/mediavine-requirements-2026-how-to-qualify))
- **Raptive** — sources conflict between **25,000 and 100,000 pageviews/month**. Verify directly. ([This Week in Blogging](https://thisweekinblogging.com/mediavine-raptive-requirements/))

*RPM — treat every number here as unverified.* The only figures I could surface for insurance/health display RPM ($25–$80 depending on source) come from **affiliate-marketing SEO blogs with an incentive to inflate them** ([adstimate](https://adstimate.com/blog/highest-paying-adsense-niches.html), [Alejandro Rioja](https://alejandrorioja.com/high-cpc-adsense-keywords/)). No network or primary source published vertical RPM. **Do not build a revenue model on these.** Model at $12–$20 session RPM and treat anything above as upside.

The seasonality math is the part to sit with: even at a generous **$25 session RPM**, 100k sessions concentrated in a 6.5–10.5-week window is **$2,500** — for the whole year. Clearing Mediavine's $5,000 main-network floor on OE traffic alone requires roughly 200k seasonal sessions. **This is the strongest argument for wedge (d):** without year-round demand, the site spends ten months as a cost center.

**Affiliate and lead-gen: harder than it looks, and Google is the reason.**

- Generic affiliate networks (CJ, Impact, FlexOffers, ShareASale) list insurance offers at **$15–$50 CPL / $100–$500+ CPS**, and most claim no license is needed to *hold* the affiliate link ([UpPromote](https://uppromote.com/affiliate-programs/insurance/); [Profitise](https://profitise.com/pay-per-lead-affiliate-programs-health-insurance/)). Those figures come from affiliate-industry marketing pages — same skepticism applies.
- **The binding constraint is Google, not the network.** Google restricts US health-insurance advertising to **government exchanges, first-party providers, and licensed insurance producers**, requires **G2RS certification**, and requires an **additional certificate to bid on ACA keywords**. Explicitly: *"Lead generation agencies and affiliate advertisers now need to obtain a state insurance license in order to continue advertising."* ([Google Ads health insurance policy](https://support.google.com/adspolicy/answer/15597838?hl=en); [Word & Brown](https://www.wordandbrown.com/NewsPost/google-health-insurance-ad-policy)) This kills paid acquisition for an unlicensed affiliate outright and signals where policy is heading for organic monetization too.
- **Licensure law.** Under the NAIC [Producer Licensing Model Act](https://content.naic.org/sites/default/files/model-law-218.pdf), all states bar unlicensed persons from **selling, soliciting, or negotiating** insurance. Passive editorial referral generally sits outside that — but the line is state-specific and moving: North Carolina extended its **$50 referral-fee cap** to referrals from unlicensed individuals to producers, effective Oct 1, 2025 ([UNC SOG bill summary](https://lrs.sog.unc.edu/bill-summaries-lookup/H/737/2025-2026%20Session/H737)).
- **HealthSherpa** pays affiliate commissions and enrollment bonuses on referred enrollments ([HealthSherpa](https://faq.healthsherpa.com/en/articles/4586303-enrollee-assistance-program)) — the most plausible single partner, and worth a direct conversation about whether an unlicensed content publisher qualifies.

**Recommended stance: display-only for v1, with affiliate as a deliberate, separately-counseled phase 2.** The revenue delta does not justify taking on 51 jurisdictions of producer-licensing exposure in year one.

**Publisher-side ad policy is fine.** Google's publisher rules restrict *advertisers*, not health-insurance *content*. Publishers may monetize content within Google Publisher Restrictions without a violation; the cost is thinner advertiser demand, not enforcement ([Google Publisher Restrictions](https://support.google.com/adsense/answer/10437795?hl=en)).

---

## 5. COMPLIANCE — what an ad-only estimator may and may not do

**The controlling text is [45 CFR 155.220](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-B/part-155/subpart-C/section-155.220).** It binds *web-brokers* — entities that display QHPs and assist with enrollment. A pure estimator that computes a number and links out to HealthCare.gov is **not** a web-broker and is not subject to §155.220's disclaimer mandate.

But §155.220(c)(3) also forbids marketing conduct that **"could mislead a consumer into believing they are visiting HealthCare.gov"** — and that standard reaches anyone, licensed or not. Displaying real QHP premiums under a government-adjacent domain name and design is precisely the fact pattern it targets.

**Adopt the web-broker disclaimer voluntarily.** It costs nothing, and it is the cheapest possible defense. Adapt the CMS-mandated General non-FFM Disclaimer ([CMS guidance PDF](https://www.cms.gov/cciio/Programs-and-Initiatives/Health-Insurance-Marketplaces/Downloads/Guidance-web-brokers-displaying-disclaimers.pdf)):

> **Attention:** This website is operated by [Company] and is **not** the Health Insurance Marketplace website. This site provides estimates only and may not display all data on Qualified Health Plans offered in your state. To see all available Qualified Health Plan options and to enroll, go to the Health Insurance Marketplace at **HealthCare.gov**.

Place it on the landing page and on every results page, above the fold on mobile.

**Hard rules for the build:**
1. **No `.gov`-imitative domain, seal, logo, or color scheme.** Do not use "HealthCare.gov," "Marketplace," "Obamacare," or "ACA" in a way that implies official status. Federal agency names and seals carry independent statutory protection.
2. **Never state an eligibility determination.** "Estimated" and "may qualify," never "you qualify." Only the Exchange determines eligibility.
3. **Collect no PII.** Compute client-side; store nothing. This sidesteps §155.260 privacy standards entirely, moots the state data-broker question, and removes the strongest argument that you are soliciting insurance.
4. **No compensation contingent on a sale** while unlicensed. That contingency is the tripwire in most state producer statutes.
5. **Show your work.** Display the FPL%, applicable percentage, SLCSP used, and the source-file version and date on every result. This is both the compliance defense and — see below — the differentiation.
6. **Date-stamp everything.** "Premiums as of [date], source: CMS QHP Landscape PY2027, published [date]."

Also note the state layer: most states have adopted the NAIC **Advertisements of Accident and Sickness Insurance Model Regulation** (e.g. [Wyoming's version](https://www.law.cornell.edu/regulations/wyoming/044-21-Wyo-Code-R-SS-21-6)). It governs advertisements *by insurers and producers*. Editorial content by an unlicensed publisher generally falls outside it — until you accept per-enrollment compensation, at which point the argument gets much worse. Another reason to stay display-only.

---

## DATA SNAPSHOT

### Governing formula and rules

| Rule | Citation | Effect |
|---|---|---|
| PTC formula | [26 U.S.C. §36B](https://www.congress.gov/crs-product/R44425) | `PTC = max(0, SLCSP − (MAGI × applicable %))`, capped at premium of plan chosen |
| Linear interpolation within bracket | [26 CFR 1.36B-3(g)](https://www.ecfr.gov/current/title-26/chapter-I/subchapter-A/part-1/subject-group-ECFR9c9b6de5da0161e/section-1.36B-3) | Applicable % slides linearly across each FPL band |
| Which FPL year applies | [26 CFR 1.36B-1(h)](https://www.ecfr.gov/current/title-26/chapter-I/subchapter-A/part-1/section-1.36B-1) | FPL in effect on the **first day of the OE period** → **2026 guidelines govern PY2027** |
| 2027 applicable % table + 10.22% required contribution | [Rev. Proc. 2026-26](https://www.irs.gov/pub/irs-drop/rp-26-26.pdf), issued **Jul 21, 2026** | 2.15% → 10.22%; **400% cliff** |
| 2026 applicable % table + 9.96% | [Rev. Proc. 2025-25](https://www.irs.gov/pub/irs-drop/rp-25-25.pdf), Jul 18, 2025 | prior-year comparison |
| Repayment caps repealed | OBBBA / H.R. 1 §71305, signed **Jul 4, 2025** | uncapped excess-APTC clawback, TY2026+ |
| Immigrant eligibility narrowed | OBBBA §71301–71303 | effective **Jan 1, 2027** |
| Age 3:1 / tobacco 1.5:1 / geographic rating | [45 CFR Part 147](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-B/part-147); [CMS Market Rating Reforms](https://www.cms.gov/marketplace/private-health-insurance/market-rating-reforms) | premium construction |
| Federal default standard age curve | [CMS Final Guidance, Dec 16, 2016, Appendix I](https://www.hhs.gov/guidance/sites/default/files/hhs-guidance-documents/CMS/Final-Guidance-Regarding-Age-Curves-and-State-Reporting-12-16-16.pdf) | 0.765 (<15) → 1.000 (21) → 1.278 (40) → 1.786 (50) → 2.230 (55) → 3.000 (64) |
| CSR silver variants | [Beyond the Basics](https://www.healthreformbeyondthebasics.org/cost-sharing-charges-in-marketplace-health-insurance-plans-part-2/) | 94% AV ≤150% FPL; 87% AV 151–200%; 73% AV 201–250% |
| Web-broker conduct + disclaimers | [45 CFR 155.220](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-B/part-155/subpart-C/section-155.220); [CMS disclaimer guidance](https://www.cms.gov/cciio/Programs-and-Initiatives/Health-Insurance-Marketplaces/Downloads/Guidance-web-brokers-displaying-disclaimers.pdf) | disclaimer text; anti-confusion standard |

### Data sources, format, cadence, licensing

| # | Source | URL | Format | Cadence | Licensing |
|---|---|---|---|---|---|
| 1 | IRS Rev. Proc. (applicable % table) | irs.gov/pub/irs-drop/rp-26-26.pdf | PDF | Annual, ~mid-late July | **Open** (US Gov work, 17 U.S.C. §105) |
| 2 | HHS Poverty Guidelines | [aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines](https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines) · [FR 2026-00755](https://www.federalregister.gov/documents/2026/01/15/2026-00755/annual-update-of-the-hhs-poverty-guidelines) | HTML/PDF | Annual, ~mid-Jan | **Open** |
| 3 | **QHP Landscape Files** (plan + premium by county) | [data.healthcare.gov/qhp-landscape-files](https://data.healthcare.gov/qhp-landscape-files) · [PY2026 Individual Medical](https://data.healthcare.gov/dataset/6fe7fb77-7291-4104-952f-7c7e2c5d0c45) | CSV + Socrata API | Annual at OE; revised in-year | **Open** (federal open-data / CC0-equivalent) |
| 4 | **Exchange PUFs** — Rate, Benefits & Cost Sharing, Plan Attributes, Service Area, Business Rules, Network, Crosswalk | [cms.gov/marketplace/resources/data/public-use-files](https://www.cms.gov/marketplace/resources/data/public-use-files) · [Rate data dictionary PY26](https://www.cms.gov/files/document/rate-datadictionary-py26.pdf) | CSV + PDF dictionaries | Annual; PY2026 latest as of Jul 2026 (BenCS-PUF updated **Apr 28, 2026**); **PY2027 not yet published** | **Open** |
| 5 | **SLCSP County-ZIP Reference Data** | [data.healthcare.gov/dataset/yaaf-rjhy](https://data.healthcare.gov/dataset/yaaf-rjhy) | CSV | Annual (tax-tool cycle) | **Open** |
| 6 | **CMS Marketplace API** (live plans/premiums) | [developer.cms.gov/marketplace-api](https://developer.cms.gov/marketplace-api) · [key request](https://developer.cms.gov/marketplace-api/key-request.html) | JSON REST | **Live** | ⚠️ **Permitted-with-conditions → Restricted for bulk.** Key required; **keys expire every 60 days** (auto-emailed); rate-limited; CMS states it is *"not designed to be scraped or for the whole data set to be extracted."* Use for live lookups; use PUFs for bulk. |
| 7 | State-Based Exchange PUFs | [cms.gov/marketplace/resources/data/state-based-public-use-files](https://www.cms.gov/marketplace/resources/data/state-based-public-use-files) | CSV | Annual, later + less complete than FFM | **Open**, but coverage gaps |
| 8 | Geographic rating areas (per state) | [cms.gov/marketplace/private-health-insurance/market-rating-reforms](https://www.cms.gov/marketplace/private-health-insurance/market-rating-reforms) | HTML/XLSX | Rarely changes | **Open** |
| 9 | Marketplace-type map (FFM / SBM-FP / SBM) | [CMS marketplaces map](https://www.cms.gov/marketplace/in-person-assisters/training-webinars/training/marketplaces-map) | HTML | Annual | **Open** |
| 10 | 2027 cost-sharing / PAPI parameters | [CMS 2027 PAPI guidance](https://www.cms.gov/files/document/2027-papi-parameters-guidance-2026-01-29.pdf) | PDF | Annual (Jan) | **Open** |
| 11 | Individual SBM sites (Covered CA, Pennie, MNsure, NYSOH…) | per-state | HTML/varies | varies | ⚠️ **Restricted / varies — assume scraping is Prohibited absent an explicit license.** Each state's ToS must be read individually. |
| 12 | KFF calculators & analyses | [kff.org](https://www.kff.org/interactive/subsidy-calculator/) | HTML | irregular | ⚠️ **Restricted** — cite and link; do **not** reuse their derived benchmark dataset |

**Data-spine verdict:** the federal spine is **genuinely open and sufficient** — public-domain CSVs at county granularity covering plans, rates, service areas, and SLCSP, plus a live API for spot-checks. That is the single best fact about this concept. The gap is the ~32% of enrollment in SBE states (7.4M of 23.1M), where the federal PUFs are thinner and state ToS is the binding constraint.

### Key dates, 2026–27

| Date | Event | Status |
|---|---|---|
| Jul 15, 2026 | 2027 insurer rate filing deadline | passed |
| Jul 20, 2026 | 2027 NBPP final rule effective | passed |
| **Jul 21, 2026** | **Rev. Proc. 2026-26 — 2027 applicable % table** | **passed** |
| Late summer 2026 | 2027 rates finalized by state regulators | pending |
| ~Oct 2026 | **PY2027 QHP Landscape + Exchange PUFs publish; HealthCare.gov window-shopping opens** — *the build deadline* | pending |
| Oct 15, 2026 | Idaho OE begins (earliest state) | pending |
| **Nov 1, 2026** | **OE 2027 opens** — all other states | confirmed |
| **Dec 15, 2026** | Deadline for Jan 1, 2027 coverage — the volume spike | confirmed |
| **Jan 15, 2027** | OE ends **if** the *Columbus* vacatur stands; Dec 15 if reversed on appeal | ⚠️ **CONTESTED** |
| Jan 1, 2027 | OBBBA immigrant-eligibility narrowing takes effect | confirmed |
| ~Jan 2027 | 2027 HHS poverty guidelines publish (govern PY2028) | annual |
| Jan–Apr 2027 | **First Form 8962 season with uncapped APTC clawback** (TY2026) | confirmed |

---

## GOLDEN FACTS

Unit-test fixtures. **FPL basis for PY2027 = 2026 HHS poverty guidelines** (per 26 CFR 1.36B-1(h)). All figures 48 contiguous states + DC. **Re-verify #1–#3 against primary PDFs before coding** — see the method limitation at the top.

| # | Fact / worked example | Value | Source |
|---|---|---|---|
| 1 | 2026 FPL, 1-person household (PY2027 basis) | **$15,960** | [FR 2026-00755, pub. Jan 15, 2026, eff. Jan 13, 2026](https://www.federalregister.gov/documents/2026/01/15/2026-00755/annual-update-of-the-hhs-poverty-guidelines) |
| 2 | 2026 FPL, 4-person household | **$33,000** | ibid. |
| 3 | **Derived** per-person increment; 2-person and 3-person FPL | increment **$5,680** → 2p **$21,640**, 3p **$27,320** | Arithmetic from #1/#2 ((33,000−15,960)/3). **⚠️ Derived, not directly verified — confirm against the ASPE table.** |
| 4 | 2027 applicable percentage, <133% FPL | **2.15%** flat | [Rev. Proc. 2026-26](https://www.irs.gov/pub/irs-drop/rp-26-26.pdf) |
| 5 | 2027 applicable percentage, 300–400% FPL | **10.22%** flat | ibid. |
| 6 | 2027 employer-coverage affordability threshold | **10.22%** (2026: 9.96%) | ibid.; [Rev. Proc. 2025-25](https://www.irs.gov/pub/irs-drop/rp-25-25.pdf) |
| 7 | **Cliff test — single filer.** 400% FPL = 4 × $15,960 | **$63,840.** At $63,840: applicable % = 10.22% → required contribution **$6,524.45/yr = $543.70/mo**. At **$63,841: PTC = $0**, full benchmark premium owed | Computed from #1, #5 |
| 8 | **Cliff test — family of 4.** 400% FPL = 4 × $33,000 | **$132,000.** At $132,001: **PTC = $0** | Computed from #2, #5 |
| 9 | **Interpolation test.** Single, income $40,000 → 250.63% FPL, band 250–300% | applicable % = 8.66 + 1.56 × (0.6266/50) = **8.6796%** → **$3,471.83/yr = $289.32/mo**. With SLCSP $700/mo → **PTC = $410.68/mo** | 26 CFR 1.36B-3(g) + Rev. Proc. 2026-26 |
| 10 | **Band-boundary continuity test.** Single at exactly $23,940 (150.00% FPL) | Enters 150–200% band at initial **4.30%** → **$1,029.42/yr = $85.79/mo**. Must be continuous with the 133–150% band's final 4.30% | ibid. |
| 11 | **Low-income test.** Single, income $20,000 → 125.3% FPL (<133%) | 2.15% → **$430.00/yr = $35.83/mo** required contribution | ibid. |
| 12 | 2027 max annual limitation on cost sharing | **$12,000** self-only / **$24,000** other (2026: $10,600 / $21,200; +13.2%) | [Milliman](https://www.milliman.com/en/insight/2027-aca-oop-max-limits-released-group-health); [CMS PAPI guidance, Jan 29, 2026](https://www.cms.gov/files/document/2027-papi-parameters-guidance-2026-01-29.pdf) |
| 13 | 2027 premium adjustment percentage | **1.8916224814** | ibid. |
| 14 | Federal default age-curve factors (age → factor) | <15: **0.765**; 21: **1.000**; 40: **1.278**; 50: **1.786**; 55: **2.230**; 64: **3.000** | [CMS Age Curve Guidance, Appendix I](https://www.hhs.gov/guidance/sites/default/files/hhs-guidance-documents/CMS/Final-Guidance-Regarding-Age-Curves-and-State-Reporting-12-16-16.pdf) |
| 15 | CSR silver-variant AV thresholds | **94%** ≤150% FPL · **87%** 151–200% · **73%** 201–250% | [Beyond the Basics](https://www.healthreformbeyondthebasics.org/cost-sharing-charges-in-marketplace-health-insurance-plans-part-2/) |
| 16 | PY2026 total plan selections | **23.1M** (15.8M HealthCare.gov / 7.4M SBE), **−5% / −1.2M** YoY | [CMS national snapshot](https://www.cms.gov/newsroom/fact-sheets/marketplace-2026-open-enrollment-period-report-national-snapshot) |
| 17 | 2026 avg subsidized enrollee premium change | **$888 → $1,904/yr (+114%)** | [KFF](https://www.kff.org/affordable-care-act/aca-marketplace-premium-payments-would-more-than-double-on-average-next-year-if-enhanced-premium-tax-credits-expire/) |
| 18 | 2027 preliminary rate filings | **14% median** increase; 77 insurers, 16 states + DC; range **1%–52%** | [KFF](https://www.kff.org/affordable-care-act/in-preliminary-rate-filings-aca-marketplace-insurers-largely-propose-double-digit-premium-increase-for-2027-following-a-steep-climb-this-year/) |

---

## COMPETITOR TABLE

| # | Name | URL | What they do | Monetization | Data source | Biggest weakness |
|---|---|---|---|---|---|---|
| 1 | **KFF Marketplace Calculator** *(the incumbent)* | [kff.org/interactive/subsidy-calculator](https://www.kff.org/interactive/subsidy-calculator/) | Benchmark-silver premium + PTC estimate by ZIP/age/income/size | None — philanthropic, ad-free | CMS + state exchanges + KFF researchers | **Benchmark only — never shows a purchasable plan.** Slow refresh (2026 data landed Mar 16, 2026). Desktop-shaped, analyst-oriented |
| 2 | **KFF Enhanced-PTC Calculator** | [kff.org/interactive/calculator-aca-enhanced-premium-tax-credit](https://www.kff.org/interactive/calculator-aca-enhanced-premium-tax-credit/) | "How much more would you pay without ePTCs" — the shock tool | None | Same | **Already occupies wedge (b).** Now describes a 2025-vs-2026 counterfactual that is going stale |
| 3 | **HealthCare.gov "See plans & prices"** | [healthcare.gov/see-plans](https://www.healthcare.gov/see-plans/) | Official anonymous window-shopping: real plans, real APTC, no login | Government, free | Authoritative live FFM | Multi-step wizard, weak mobile; **FFM states only**; next-year data absent until ~late Oct; ranks for brand not long-tail |
| 4 | **HealthSherpa** | [healthsherpa.com](https://www.healthsherpa.com/) | Largest ACA EDE platform; 35,000+ agents | Carrier commissions; agent SaaS; **affiliate + enrollment bonuses** | FFM EDE feed | Agent-first funnel, not a top-of-SERP consumer calculator; wants the enrollment, not the answer |
| 5 | **eHealth** (NASDAQ: EHTH) | [ehealthinsurance.com](https://www.ehealthinsurance.com/) | Licensed national e-broker, 180+ carriers; $554M 2025 revenue | Carrier commissions | Carrier + FFM feeds | Aggressive lead capture and phone follow-up; hostile to "just show me the number" intent |
| 6 | **Stride Health** (Integrity) | [stridehealth.com](https://www.stridehealth.com/) | EDE + plan comparison for gig workers; 4.6M users, 140+ platform partners (Uber, DoorDash, Amazon Flex) | Commissions + B2B partnership fees | EDE | **B2B2C distribution — almost no organic SEO surface.** Reachable only through a partner app |
| 7 | **healthinsurance.org** | [healthinsurance.org/obamacare/subsidy-calculator](https://www.healthinsurance.org/obamacare/subsidy-calculator/) | Calculator + very deep state-by-state ACA content library | Display ads + broker lead referral | Public federal data, KFF-style method | **The most direct competitor: already doing exactly the proposed concept, with a decade of link equity** |
| 8 | **ValuePenguin** (LendingTree) | [valuepenguin.com/aca-subsidy-calculator](https://www.valuepenguin.com/aca-subsidy-calculator) | Calculator + explainer content | Lead generation / data monetization | Mixed public data | Lead-gen-first design; reported to trigger downstream call volume; data freshness lags |
| 9 | **NerdWallet** | [nerdwallet.com](https://www.nerdwallet.com/our-partners) | Personal-finance content, some health coverage | Affiliate + lead gen | Mixed | **Thin ACA tooling — no ZIP-level premium engine.** Broad brand, shallow vertical |
| 10 | **HealthCareInsider** (Healthcare.com) | [healthcareinsider.com/aca-subsidy-calculator](https://healthcareinsider.com/aca-subsidy-calculator) | Calculator + ACA guides | Lead gen into Healthcare.com's broker stack | Public data | Content is a funnel wrapper; low editorial trust signals |
| 11 | **ObamaCareFacts** | [obamacarefacts.com](https://obamacarefacts.com/insurance-exchange/calculating-tax-credits/) | Long-running calculator + eligibility charts | Display ads + affiliate | Public data | Dated design/UX; authority eroding, but still ranks on long-tail |
| 12 | **acasubsidycalculator.com** | [acasubsidycalculator.com](https://acasubsidycalculator.com/) | **Pure-play single-purpose ACA subsidy calculator + blog** | Presumed display ads | Public data | **Proof the exact proposed concept already exists as an indie site** — the niche is not empty |
| 13 | **GetInsured** | [getinsured.com](https://company.getinsured.com/state-based-marketplaces/state-based-marketplace-resources/) | SBM platform vendor (builds state exchanges) + broker ops | State government SaaS contracts + commissions | Its own SBM platforms | B2G, not consumer-facing; invisible in consumer SERPs |
| 14 | **Covered California Shop & Compare** | [apply.coveredca.com/lw-shopandcompare](https://apply.coveredca.com/lw-shopandcompare/) | State estimator: ZIP/income/size/age → plans + **federal *and* CA state subsidy** | State agency | CA plan data | **CA only** — but the state-subsidy math is the piece national tools get wrong |
| 15 | **MNsure Compare Tool** | [mnsure.org/shop-compare/compare](https://www.mnsure.org/shop-compare/compare/index.jsp) | Pre-application plan + cost estimator | State agency | MN data | MN only; minimal SEO investment |
| 16 | **Pennie** | [pennie.com](https://pennie.com/) | PA state exchange, own platform + call center | State agency | PA data | PA only |
| 17 | **TurboTax / H&R Block** | [intuit.com](https://ttlc.intuit.com/turbotax-support/en-us/help-article/medical-tax-credits-deductions/state-marketplace/L1a5QVS5X_US_en_US) | Form 8962 reconciliation | Software licenses | IRS forms + user 1095-A | **Backward-looking** — reconciles last year; no shopping-time estimate. Uncapped clawback makes this a growing but adjacent surface |

**What the table says.** There is no single beatable incumbent. There is a *thick* field: an unassailable nonprofit at the top of the head terms (rows 1–2), the government itself (row 3), three well-capitalized commercial platforms (4–6), four SEO-mature content sites already running this exact calculator (7, 8, 10, 11), an indie pure-play clone (12), and 21+ state exchanges owning their own geography (14–16). **Rows 7 and 12 are the ones to study hardest** — 7 because it is the concept, executed, with ten years of authority; 12 because it is the concept, executed, by someone with roughly the operator's resources.

---

## VERDICT

### **CONDITIONAL-GO** — and the condition is that you do not build the tool as described.

The brief's concept — "household size, income, ages, ZIP → estimated PTC and net premium, timed to Open Enrollment" — is **NO-GO as specified.** It is a commodity. It exists at healthinsurance.org, ValuePenguin, HealthCareInsider, ObamaCareFacts, and at least one indie pure-play at `acasubsidycalculator.com`. KFF owns the head terms with unbuyable authority. HealthCare.gov owns the transactional intent. You would be the seventh-best result for a query with a 6.5–10.5-week revenue season.

**GO on the underlying data spine, pointed at a different job.** Two verified facts make this worth doing at all: the federal data is genuinely open at county granularity (QHP Landscape + Rate PUF + SLCSP County-ZIP, all public domain), and the 400% cliff is back with **uncapped clawback** behind it — a combination that creates real, year-round, high-value analytical demand that nobody is serving.

### Biggest opportunity

**The 400% cliff is now the most financially violent feature of US individual health insurance, and no tool tells you where yours is.** Crossing it by $1 costs a 60-year-old couple ~$15,000. From the 2026 tax year forward, misjudging income means repaying **100%** of excess APTC with no cap. The audience — early retirees, self-employed, consultants, 350–450% FPL households — has money, searches in Q4 *and* in tax season, and is precisely the group the subsidy lapse hit hardest. **Serving them breaks the seasonality trap that otherwise makes this business unviable for a solo operator.**

Concretely: `ZIP + ages + household size → your exact cliff income, the dollar cost of crossing it, and the MAGI levers that move you back under it.` Adjacent, cheap, and defensible: a **"is my employer plan affordable"** checker (10.22% for 2027) and a **clawback exposure** estimator.

### Biggest risk

**The revenue window may be 6.5 weeks, not 10.5, and the decision is not yours.** The *Columbus v. Kennedy* vacatur (June 12, 2026) struck the rule shortening OE to Dec 15; the Fourth Circuit appeal could restore it. Post-ruling sources still disagree on the operative 2027 end date. Combined with a market that shrank 5% in 2026 and unverifiable display RPMs sourced only from affiliate blogs, **a season-only site plausibly earns four figures in year one and never clears Mediavine's $5,000 main-network threshold.**

Second risk, close behind: **the data has a hard annual bottleneck.** PY2027 PUFs won't publish until ~October 2026. You get roughly two to four weeks between data availability and Nov 1. Miss that window and you miss the year.

### Best differentiation wedge

**Radical calculation transparency on open federal data, aimed at the cliff.**

Every competitor shows a number. KFF shows a benchmark and hides the plans. The lead-gen sites show a number and want your phone. HealthCare.gov shows plans but buries them four steps deep and won't tell you *why*.

Show the whole derivation, always: your FPL%, the exact applicable percentage and how it was interpolated, the specific SLCSP used with its plan ID, the source file and its publication date, and **the income at which your subsidy goes to zero**. Cite `Rev. Proc. 2026-26` on the page.

This is defensible on all three axes the portfolio thesis requires: AI Overviews cannot fabricate *your ZIP's actual SLCSP for your exact household* (it will try, and it will be wrong); the value genuinely lives in the user's own inputs against fresh licensed data; and the transparency itself is the compliance posture — showing your work *is* the disclaimer.

### Kill criteria — check these in this order

**Pre-build gates (all must pass, resolve by ~Sept 15, 2026):**

1. **KILL** if the PY2027 QHP Landscape + Rate PUFs do not publish by **October 15, 2026** with county-level SLCSP-derivable data. *Status: likely to pass — PY2026 equivalents shipped and remain live. Verify against [cms.gov/marketplace/resources/data/public-use-files](https://www.cms.gov/marketplace/resources/data/public-use-files).*
2. **KILL** if you cannot independently reconstruct SLCSP by county for ≥45 FFM/SBM-FP states from public files and match HealthCare.gov's window-shopping output to **within ±$2/month on 20 random ZIP/age/household combinations.** *This is the real gate. Build it as a throwaway script in September before writing any front-end. If reconciliation fails, everything downstream is a liability.*
3. **KILL** if Rev. Proc. 2026-26's bracket values, as read directly from the IRS PDF, differ from GOLDEN FACTS #4–#6. *(I could not open the PDF — see method limitation. Verify first.)*

**Post-launch gates:**

4. **KILL** if OE 2027 sessions < **40,000** by Dec 20, 2026. Below that, the ad math cannot work at any plausible RPM.
5. **KILL** if off-season (Feb–Sep 2027) traffic is < **15%** of peak-month traffic. That is the test of whether the cliff-planner wedge actually broke the seasonality trap. If it didn't, this is a 6-week-a-year business — shut it or sell it.
6. **KILL** if any monetization path that clears $1,000/month requires a state producer license. *Status: currently passes — display-only needs no license. Re-check if you ever consider affiliate revenue, given Google's advertiser-licensing regime.*
7. **PIVOT, don't kill,** if Congress enacts a retroactive or forward ePTC extension. That inverts the product overnight: the cliff planner loses its subject, and a **"what the new law changes for you"** calculator becomes the highest-value page on the internet for about three weeks. Keep the subsidy engine parameterized by plan year and applicable-percentage table so a schedule swap is a config change, not a rewrite.

**On the brief's own proposed kill criteria, for the record:**
- *"Benchmark/rate data not publicly available at ZIP/rating-area granularity"* — **does not kill.** It is available, at county granularity, public domain. (ZIP→county is a solved but non-trivial join; split ZIPs spanning counties are a real edge case to handle explicitly.)
- *"Licensure required for any viable monetization"* — **does not kill.** Display advertising requires no license. It *does* kill the affiliate/lead-gen upside, which is where most of this vertical's money actually is.
- *"KFF's authority uncatchable on head terms"* — **true, and it kills the head-term strategy, but not the concept.** KFF is uncatchable on "aca subsidy calculator." KFF will never build a cliff planner, a clawback estimator, or a state-subsidy router. Concede the head terms deliberately and win a category KFF has no institutional reason to enter.

---

### Open items I could not resolve

1. **The operative OE 2027 end date** — Dec 15 vs. Jan 15 turns on the Fourth Circuit. Check the [Georgetown litigation tracker](https://litigationtracker.law.georgetown.edu/litigation/city-of-columbus-et-al-v-kennedy-et-al/) monthly.
2. **Rev. Proc. 2026-26 bracket values** — from search summaries, not the PDF. Verify.
3. **The 2026 FPL table beyond 1- and 4-person households** — GOLDEN FACT #3 is arithmetic, not a reading of the ASPE table.
4. **Real display RPM for this vertical** — no credible primary source exists publicly. The only route is a live AdSense test.
5. **Actual search volume and seasonality curve** — Google Trends was unreachable. Pull it manually before committing; the entire revenue model depends on the peak's height and width.
6. **Whether CMS's Marketplace API ToS permits a public consumer calculator** — the "not designed to be scraped" language is a design note, not a license grant. Email `data.support@cms.hhs.gov` and get it in writing before depending on the live API.
