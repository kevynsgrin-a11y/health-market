import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/figure"
import { CliffProfile } from "@/components/cliff-mark"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="topo-texture pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 md:pb-20 md:pt-24">
        <Eyebrow>ACA premium subsidy · plan year 2026</Eyebrow>

        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
          There is an income at which your health insurance suddenly costs
          <span className="text-accent"> thousands more.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Earn one dollar over 400% of the federal poverty line and your entire premium tax credit
          can vanish at once. Subsidy Dropoff shows you exactly where that edge is for your
          household — and what it costs to step over it.
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
      </div>

      <figure className="relative mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted sm:aspect-[2/1] lg:aspect-[21/9]">
          <Image
            src="/photos/hero-cliff.png"
            alt="An aerial view of a flat clifftop plateau ending in a sheer drop to the ocean far below — the shape of the subsidy cliff."
            fill
            priority
            sizes="(max-width: 1152px) 100vw, 1104px"
            className="object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent"
            aria-hidden
          />
          <CliffProfile
            className="pointer-events-none absolute bottom-0 left-0 h-24 w-2/3 text-ink-foreground/40 md:h-32"
          />
        </div>
        <figcaption className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          The plateau, the drop, the runout — a subsidy cliff, drawn by erosion.
        </figcaption>
      </figure>
    </section>
  )
}
