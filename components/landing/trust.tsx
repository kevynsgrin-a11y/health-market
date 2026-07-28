import Link from "next/link"
import { Eyebrow } from "@/components/ui/figure"
import { buttonVariants } from "@/components/ui/button"
import { FileText, GitCommitVertical, ScaleIcon, ShieldCheck } from "lucide-react"

const PRINCIPLES = [
  {
    icon: ScaleIcon,
    title: "The statute, shown in full",
    body: "Every figure links back to the section of the Internal Revenue Code, the Form 8962 line, or the CMS file that produced it. The credit is federal law, not our opinion — so we show our work at each step.",
  },
  {
    icon: GitCommitVertical,
    title: "Integer cents, no float drift",
    body: "Money is computed in integer cents and rounded exactly where the IRS rounds. The applicable-percentage table is stored to the hundredth of a percent. No penny appears that the tax form would not.",
  },
  {
    icon: ShieldCheck,
    title: "Honest about what we are not",
    body: "This is not the Marketplace and not affiliated with the government. It produces estimates only. When a state runs its own exchange, we send you there rather than guess.",
  },
  {
    icon: FileText,
    title: "Provenance travels with the number",
    body: "Each estimate carries the source and publication date of the data behind it. If a benchmark is synthetic or a plan year is unpublished, the response says so in plain language.",
  },
] as const

export function Trust() {
  return (
    <section className="border-t border-border" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-col gap-3">
          <Eyebrow>Why you can trust the number</Eyebrow>
          <h2
            id="trust-heading"
            className="max-w-2xl text-balance font-serif text-3xl leading-tight md:text-4xl"
          >
            A subsidy estimate is only worth as much as the arithmetic behind it.
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="flex flex-col gap-3 bg-background p-6 md:p-8">
              <p.icon className="h-5 w-5 text-accent" strokeWidth={1.75} aria-hidden />
              <h3 className="font-medium text-foreground">{p.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/methodology" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Read the full methodology
          </Link>
        </div>
      </div>
    </section>
  )
}
