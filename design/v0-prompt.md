# Verbatim v0 prompt

Paste everything between the rules below into v0. It is written to bind against the
real API contract in `src/api/handler.ts`, so the generated UI wires up to the live
backend without rework.

---

Build a production-grade marketing + application site for **Cliff** — a precision financial tool that tells self-employed and early-retired Americans the exact income at which their ACA health-insurance subsidy disappears, and what crossing that line costs them.

Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion for choreography, Recharts for data visualisation. Mobile-first. Ship real components, not placeholders.

## The product in one sentence

Since the enhanced premium tax credits lapsed on December 31, 2025, earning **one dollar** over 400% of the federal poverty line destroys a household's **entire** health-insurance subsidy — often $15,000–$25,000 a year for a couple in their sixties. Cliff finds that exact dollar figure for you, shows you how much headroom you have left, and shows the levers that move you back under it.

## Who this is for

Not "people shopping for insurance." This is a **planning instrument** for people who control their own taxable income: early retirees, consultants, freelancers, small-business owners, people managing Roth conversions and capital gains. They are 45–64, financially literate, sceptical, and reading on a phone at 11pm in December. They have money. They do not want to be sold to. They want a number they can trust and the arithmetic behind it.

Design for that person. Every visual decision should read as *precision instrument*, never as *insurance lead-capture funnel*.

## Art direction

**The reference set:** Stripe's documentation, Mercury, Ramp, Wealthfront's research pages, *The Economist*'s data journalism, Linear's marketing site. Restrained, confident, expensive. Generous whitespace. Nothing bounces or sparkles.

**Explicitly forbidden**, because these are the visual clichés of this category and they destroy trust with this audience:
- Stock photography of smiling families holding clipboards, doctors with stethoscopes, or "happy seniors on a beach"
- Blue-and-white government-adjacent design, eagles, seals, shields, flags, `.gov`-style headers — this is also a **legal** requirement, see Compliance
- Gradient blobs, glassmorphism, floating 3D shapes, neon
- Countdown timers, "Get your free quote!" urgency, chat-bubble popups
- Any implication of official status

**Palette.** A near-black ink base (`#0B0D0F`) with warm off-white paper (`#FAF9F7`). One confident accent — deep teal `#0E7C7B` — used sparingly for interactive affordance. Signal colours reserved *exclusively* for the cliff mechanic: amber `#B45309` for approaching the edge, clay `#9A3412` for over it, slate `#334155` for safe. Never use colour as the only carrier of meaning: pair every signal with an icon, a label, and a position change. Full light and dark themes, both first-class — dark is the default for the app view, light for editorial pages.

**Typography.** A high-contrast serif for editorial voice — Instrument Serif or Newsreader — at display sizes only. A neo-grotesque for UI: Inter Tight or Geist. **All numerals must be tabular-lining** (`font-variant-numeric: tabular-nums`); figures that shift width as they animate look amateur in a financial tool and this is the single fastest tell. Set a strict type scale (1.250 minor third). Body copy at 17–18px with 1.6 line-height. Headline tracking tightened to about `-0.02em`.

**Motion.** Everything eases on `cubic-bezier(0.32, 0.72, 0, 1)`. Nothing longer than 400ms except the cliff chart's build-in, which gets 900ms because it is the argument. Respect `prefers-reduced-motion` completely — under it, the chart renders in final state with no transition.

## Imagery — high resolution, specific, licensed

Source every photograph from **Unsplash** at 2400px+ and serve through `next/image` with `sizes` set, AVIF/WebP, and a blurred `placeholder`. Provide visible photographer attribution in the footer. Never use an image whose licence you cannot name.

Three and only three photographic registers, used sparingly:

1. **Landscape as metaphor — the hero.** A single wide, quiet, high-resolution photograph of a real coastal or canyon escarpment: a plateau meeting a sheer vertical drop, shot in flat overcast or blue-hour light, desaturated, no people. Search: *"sea cliff overcast"*, *"basalt escarpment aerial"*, *"canyon rim fog"*. The horizon line should sit where the page's typographic baseline grid wants it. Overlay a duotone of ink→teal at ~85% opacity so text sits at AAA contrast. This image carries the entire concept — it must be genuinely beautiful, not decorative.

2. **Documentary portraits of the actual audience.** Real-looking people 45–65 in their own working environments: a woodworker's bench, a home office with two monitors and a cold coffee, a small ceramics studio, someone doing paperwork at a kitchen table. Available light, unforced, mid-task, often not looking at the camera. Search: *"self employed workshop natural light"*, *"woman fifties home office candid"*, *"small business owner workbench"*. Two or three total, at most.

3. **Abstract texture for section breaks.** Macro topographic contour, layered sedimentary rock, long-exposure water over a ledge — reinforcing "edge" and "layers" without literalism. Heavily desaturated, used as a thin full-bleed band between sections, never behind body text.

**Custom graphics** — draw these as inline SVG, do not use icon-font clipart:
- A cliff-profile motif: a flat plateau, a sheer drop, a shallow runout. This is the logo mark, the favicon, the section dividers, and the empty states. One idea, repeated at many scales, is what makes a site look designed rather than assembled.
- A thin topographic-contour line pattern as a background texture at 3–4% opacity.
- A custom icon set on a 24px grid, 1.5px strokes, rounded caps — one visual family, no mixing.

## The signature component: the Cliff Chart

This is the product. Give it your best work.

A responsive Recharts area chart, **annual income on X, annual premium tax credit on Y**, with:

- A **true vertical discontinuity** at 400% FPL. The API deliberately returns curve points at exactly `cliffIncome` and `cliffIncome + 1` cent so this renders as a genuine cliff face, not a smoothed ramp. Do not let the chart library interpolate across it — the whole point is the vertical line.
- The user's current position as a filled marker on the curve, with a leader line to a floating label.
- The gap between current income and the cliff shaded as **"your headroom"**, labelled in dollars.
- The drop annotated with the cost of crossing, as a dimensioned vertical measure — like an architectural drawing — with the dollar figure set in the serif face.
- On the **safe** side of the cliff, the area fills slate; **approaching** (within 10%), amber; the region past the cliff is flat zero and rendered in hatched clay to read as forbidden.
- Animated build-in: axes, then the curve sweeping left to right, then the cliff face dropping, then the annotations fading up. 900ms total, staged.
- Fully responsive: at mobile widths, rotate the annotation stack below the chart rather than shrinking type. Never let a label overlap the curve.
- Accessible: an adjacent visually-hidden `<table>` carrying the same series, `role="img"` with a descriptive `aria-label` that states the cliff income and the cost of crossing in words.

**Critically:** some households have no cliff — their credit phases out naturally *before* 400% FPL. When `cliff.cliffIsLive === false`, the chart must render a smooth taper to zero with an entirely different, calmer annotation: *"Your credit tapers to zero on its own at $X. There's no cliff for you to fall off."* This is a first-class state and it must feel like good news, not an error.

## Page structure

**`/` — the landing page.**
1. **Hero.** The escarpment photograph, full-bleed, minimum 85vh. Headline in the display serif: *"Find the dollar that costs you $17,000."* Subhead, one sentence, plain. A single primary action — a ZIP input inline in the hero, autofocused on desktop, with a large touch target on mobile. No navigation clutter above it.
2. **The stakes.** Three-column editorial block, no cards, no borders — just type and generous rhythm: the enhanced credits lapsed 12/31/2025; the 400% cliff is back; repayment caps are repealed so a wrong estimate now has no ceiling. Real figures, each with a footnoted source link.
3. **Live demo.** A pre-filled Cliff Chart for a 60/58 couple at $80,000, animating on scroll into view, with a caption naming the real result: *$4,600 of headroom; crossing costs $17,501.88 a year.*
4. **How it works.** Three steps, illustrated with the custom cliff motif at three scales. No screenshots.
5. **Why trust this.** The differentiator, stated plainly: every result shows its own arithmetic, cites the governing regulation, and names the source file and its publication date. Show a real fragment of the derivation as evidence.
6. **Footer.** Sources, methodology link, photographer credits, and the compliance disclaimer in full.

**`/plan` — the tool.** A calm, focused, single-column form: ZIP, household size, ages (an elegant repeatable age input, not a dropdown per person), expected annual income (a slider **and** a text field, bidirectionally bound, with tabular figures). Results stream in below without a page transition. The chart is the first thing rendered; numbers follow; the derivation is last, in a collapsed-by-default `<details>` styled as a document rather than an accordion widget.

**`/methodology`** — a genuinely well-typeset long-form document. Two-column at desktop with a sticky table of contents. This page is a trust asset; set it like a journal article.

## API contract — bind to this exactly

`GET /api/estimate?planYear=2026&zip=77002&householdSize=2&income=80000&ages=60,58&includeCurve=true`
or `POST /api/estimate` with the same fields as JSON.

Success (HTTP 200):
```json
{
  "ok": true,
  "planYear": 2026,
  "asOf": "2026-07-27T14:00:00.000Z",
  "result": {
    "location": { "zip": "77002", "countyFips": "48201", "ratingAreaId": "Rating Area 7", "region": "contiguous" },
    "benchmark": { "monthlySlcsp": 216067, "annualSlcsp": 2592804, "monthlyLcbp": 159000, "slcspPlanId": "..." },
    "ptc": {
      "eligible": true,
      "fpl": { "fplAmount": 2115000, "form8962Percent": 378, "exceedsFourTimesFpl": false },
      "applicablePercentage": 996,
      "monthlyRequiredContribution": 66400,
      "monthlyPtc": 149667,
      "workings": [{ "label": "...", "detail": "...", "citation": "26 CFR 1.36B-3(g)" }]
    },
    "cliff": {
      "cliffIncome": 8460000,
      "naturalPhaseOutIncome": null,
      "subsidyExitIncome": 8460000,
      "cliffIsLive": true,
      "cliffCost": 1750188,
      "headroom": 460000,
      "workings": [{ "label": "...", "detail": "..." }]
    },
    "csr": { "variant": "csr-94", "actuarialValue": 0.94, "reason": "..." },
    "curve": [{ "annualIncome": 0, "fplPercent": 0, "annualPtc": 0, "annualNetPremium": 0 }]
  },
  "provenance": {
    "applicablePercentageTable": { "source": "IRS Rev. Proc. 2026-26", "url": "...", "published": "2026-07-21", "status": "secondary-concordant" },
    "openEnrollment": { "start": "2026-11-01", "end": null, "endIsContested": true, "note": "..." }
  },
  "disclaimer": "..."
}
```

**All money is integer cents.** Format with `Intl.NumberFormat` — never divide and round in a template. `applicablePercentage` is integer hundredths of a percent: `996` is `9.96%`.

Unavailable (HTTP 422) returns `ok: false` and an `unavailable` object with a `reason`. **Each reason is a designed state, not an error toast:**

- `ambiguous-zip` — the ZIP spans several counties in possibly different rating areas. Render `candidateCounties` as a genuine choice: *"Which county?"* with the county names as large, tappable cards. Frame it as precision, not failure.
- `state-based-exchange` — this state runs its own marketplace. Render a warm handoff card using `exchangeName` and `exchangeUrl`. If the message mentions state premium assistance, say so prominently — it means the user may get *more* help than the federal number suggests.
- `plan-year-not-published` — CMS has not released that plan year's data. Explain the annual data calendar honestly and offer the current plan year.
- `dataset-not-loaded` / HTTP 503 `data_unverified` — a candid "we don't have verified data for this yet" state. Never fabricate a number to fill the gap.

HTTP 400 returns `problems: [{ field, message }]` — map each onto the corresponding input inline; never use a generic banner.

## Compliance — non-negotiable, these are legal constraints

1. Render the `disclaimer` string from the API response **verbatim** on the landing page footer and above the fold on every results view. Do not paraphrase it, do not put it in a modal, do not hide it behind a link.
2. The site must not resemble a government property. No seals, no eagles, no `.gov` styling, no use of "HealthCare.gov" or "Marketplace" in a way implying affiliation. 45 CFR 155.220(c)(3) bars conduct that could mislead a consumer into thinking they are on HealthCare.gov.
3. Never write "you qualify" or "you are eligible." Always "estimated," "you may qualify." Only the Exchange determines eligibility.
4. Collect **no** personal information. No email gate, no account, no phone field, no analytics that record inputs. The math runs client-side; the privacy promise is a product feature and it should be stated plainly on the page.
5. Every displayed figure carries its source and date. Surface `provenance.applicablePercentageTable.source` and `published` in the results footer. When `openEnrollment.endIsContested` is true, show the caveat — do not print a confident deadline the courts have not settled.

## Engineering quality bar

Semantic HTML. WCAG 2.2 AA minimum, AAA for body text contrast. Full keyboard operability with visible focus rings that match the design rather than the browser default. `prefers-reduced-motion` honoured throughout. Real loading skeletons matched to final content dimensions so nothing reflows. Error boundaries. Metadata and OG images per route. Lighthouse 95+ on performance and accessibility. No layout shift — reserve space for the chart before data arrives.

Make it look like it cost $200,000.

---

## Follow-up prompts for iteration

Once v0 returns the first pass, these tighten it:

1. *"Rebuild the Cliff Chart as a bespoke SVG component instead of Recharts. I need exact control over the vertical discontinuity, the dimensioned drop annotation, and the hatched forbidden region. Keep the accessible table."*
2. *"The landing page reads like a SaaS template. Make it editorial: wider measure on the display type, a real baseline grid, asymmetric two-column layouts, and drop every card border and box-shadow."*
3. *"Design the four `unavailable` states as first-class screens with their own illustrations built from the cliff motif. None of them should feel like an error."*
4. *"Add a 'levers' panel to the results: given the household's headroom, show how much an HSA, traditional IRA, SEP-IRA and solo 401(k) contribution each moves them, as an interactive stacked bar that updates the chart marker live."*
