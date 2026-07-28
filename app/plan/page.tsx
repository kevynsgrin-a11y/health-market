import type { Metadata } from "next"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PlanForm } from "@/components/plan/plan-form"
import { Eyebrow } from "@/components/ui/figure"

export const metadata: Metadata = {
  title: "Find your subsidy cliff",
  description:
    "Enter your household to find the exact income at which your ACA premium tax credit disappears, and what crossing that line costs. Estimates only.",
}

export default function PlanPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="mb-10 flex flex-col gap-3">
            <Eyebrow>The estimator</Eyebrow>
            <h1 className="max-w-2xl text-balance font-serif text-4xl leading-tight md:text-5xl">
              Find your cliff.
            </h1>
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Four facts about your household are enough. Every figure is computed live and shows
              its work, down to the statute.
            </p>
          </div>

          <Suspense fallback={<FormFallback />}>
            <PlanForm />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function FormFallback() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(320px,380px)_1fr]">
      <div className="h-[560px] animate-pulse rounded-lg border border-border bg-card" />
      <div className="h-[420px] animate-pulse rounded-lg border border-dashed border-border bg-card/50" />
    </div>
  )
}
