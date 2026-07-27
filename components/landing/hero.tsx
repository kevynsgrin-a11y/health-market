import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/figure"
import { CliffProfile } from "@/components/cliff-mark"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="topo-texture pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <Eyebrow>ACA premium subsidy · plan year 2026</Eyebrow>

        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
          There is an income at which your health insurance suddenly costs
          <span className="text-accent"> thousands more.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Earn one dollar over 400% of the federal poverty line and your entire premium tax credit
          can vanish at once. Cliff shows you exactly where that edge is for your household — and
          what it costs to step over it.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/plan" className={buttonVariants({ variant: "primary", size: "lg" })}>
            Find my cliff
          </Link>
          <Link href="#demo" className={buttonVariants({ variant: "outline", size: "lg" })}>
            See a worked example
          </Link>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          No account. No income figure leaves your device unless you ask for a server estimate.
        </p>

        <div className="pointer-events-none mt-16 md:absolute md:bottom-0 md:right-6 md:mt-0 md:w-[40%]">
          <CliffProfile className="h-40 w-full text-border md:h-56" />
        </div>
      </div>
    </section>
  )
}
