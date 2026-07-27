import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { Stakes } from "@/components/landing/stakes"
import { LiveDemo } from "@/components/landing/live-demo"
import { Trust } from "@/components/landing/trust"
import { CliffDivider } from "@/components/cliff-mark"
import { buttonVariants } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Stakes />
        <div id="demo" className="scroll-mt-16">
          <LiveDemo />
        </div>
        <Trust />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}

function FinalCta() {
  return (
    <section className="border-t border-border bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <CliffDivider className="mb-12 h-6 w-full text-ink-foreground/25" />
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-balance font-serif text-3xl leading-tight md:text-5xl">
            Find the edge before you walk over it.
          </h2>
          <Link href="/plan" className={buttonVariants({ variant: "onDark", size: "lg" })}>
            Find my cliff
          </Link>
        </div>
      </div>
    </section>
  )
}
