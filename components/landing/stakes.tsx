import Image from "next/image"
import { Eyebrow } from "@/components/ui/figure"

const AUDIENCE = [
  {
    title: "The self-employed",
    body: "A good invoice in December can push your year over the line. The subsidy is reconciled on your tax return — so the surprise arrives in April, not at the pharmacy.",
    photo: "/photos/persona-freelance.png",
    alt: "A self-employed person reviewing an invoice at a sunlit desk beside a laptop.",
  },
  {
    title: "Early retirees",
    body: "Living on brokerage withdrawals before Medicare at 65? A single Roth conversion or capital gain can cost more in lost credits than the conversion itself.",
    photo: "/photos/persona-retiree.png",
    alt: "A couple in their early sixties walking a coastal bluff path at golden hour.",
  },
  {
    title: "Anyone near 400%",
    body: "The subsidy formula caps your premium at a share of income — right up until it doesn't. At the edge, one dollar of income can erase thousands of dollars of help.",
    photo: "/photos/persona-owner.png",
    alt: "A small-business owner shaping clay on a pottery wheel in a warm workshop.",
  },
]

export function Stakes() {
  return (
    <section id="the-cliff" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <Eyebrow>What the cliff is</Eyebrow>
            <h2 className="mt-6 font-serif text-3xl leading-tight md:text-4xl">
              Most subsidies fade. This one falls.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Below the threshold, the Affordable Care Act caps what you pay for a benchmark plan
                at a percentage of your income. Earn a little more and that percentage rises
                gently — a normal phase-out.
              </p>
              <p>
                But at <span className="font-medium text-foreground">400% of the federal poverty line</span>,
                the enhanced credits that smoothed the top of that curve are scheduled to expire. The
                cap is removed entirely. Your premium jumps from a fixed share of income to the full
                sticker price of the plan, in a single dollar.
              </p>
              <p className="text-foreground">
                That discontinuity is the cliff. It is not a metaphor — it is a step function in the
                tax code.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-border bg-border">
            {AUDIENCE.map((a) => (
              <div key={a.title} className="flex items-stretch gap-4 bg-card p-4 sm:gap-5 sm:p-5">
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-md bg-muted sm:w-32">
                  <Image
                    src={a.photo || "/placeholder.svg"}
                    alt={a.alt}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center py-1">
                  <h3 className="font-serif text-xl">{a.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
