import * as React from "react"
import { cn } from "@/lib/utils"

type Tone = "default" | "accent" | "safe" | "approaching" | "over"

const toneClass: Record<Tone, string> = {
  default: "text-foreground",
  accent: "text-accent",
  safe: "text-safe",
  approaching: "text-approaching",
  over: "text-over",
}

interface FigureProps {
  label: string
  value: string
  sub?: string
  tone?: Tone
  className?: string
}

/** A single large tabular number with an eyebrow label. The core stat block. */
export function Figure({ label, value, sub, tone = "default", className }: FigureProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className={cn("tabular font-serif text-4xl leading-none md:text-5xl", toneClass[tone])}>
        {value}
      </span>
      {sub ? <span className="text-sm text-muted-foreground">{sub}</span> : null}
    </div>
  )
}

interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

/** Small monospace section marker used across the site. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground",
        className,
      )}
    >
      <span className="h-px w-6 bg-border" aria-hidden />
      {children}
    </span>
  )
}
