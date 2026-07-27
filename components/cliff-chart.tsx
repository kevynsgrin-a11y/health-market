"use client"

import {
  Area,
  ComposedChart,
  Line,
  ReferenceArea,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { CurvePoint } from "@/lib/estimate"
import { formatCentsWhole, formatDollars } from "@/lib/format"

interface CliffChartProps {
  curve: CurvePoint[]
  cliffIncome: number | null
  /** The household's current annual income, in dollars. */
  currentIncome: number
  /** Current annual subsidy, in cents (for the marker). */
  currentAnnualPtc: number
  className?: string
}

interface Datum {
  income: number
  subsidy: number
  net: number
}

/**
 * The signature visualization: the subsidy plateau and its sheer drop at 400%
 * of the federal poverty line. Subsidy (teal area) sits on a plateau, then
 * falls off a cliff to zero. Net premium (the line) spikes by the same amount
 * at the same income. The reserved signal colours mark the terrain: safe up to
 * the approach, amber approaching, clay past the edge.
 */
export function CliffChart({
  curve,
  cliffIncome,
  currentIncome,
  currentAnnualPtc,
  className,
}: CliffChartProps) {
  const data: Datum[] = curve.map((p) => ({
    income: Math.round(p.annualIncome / 100),
    subsidy: Math.round(p.annualPtc / 100),
    net: Math.round(p.annualNetPremium / 100),
  }))

  const cliffDollars = cliffIncome != null ? Math.round(cliffIncome / 100) : null
  const maxIncome = data.length ? data[data.length - 1].income : 0
  const approachStart = cliffDollars != null ? cliffDollars - 8000 : null

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
          <defs>
            <linearGradient id="subsidyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          {/* Terrain shading — approach and over-the-edge zones. */}
          {approachStart != null && cliffDollars != null && (
            <ReferenceArea
              x1={approachStart}
              x2={cliffDollars}
              fill="var(--color-approaching)"
              fillOpacity={0.06}
              stroke="none"
            />
          )}
          {cliffDollars != null && (
            <ReferenceArea
              x1={cliffDollars}
              x2={maxIncome}
              fill="var(--color-over)"
              fillOpacity={0.06}
              stroke="none"
            />
          )}

          <XAxis
            dataKey="income"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(v) => formatDollars(v as number).replace(",000", "k")}
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            tickLine={false}
            axisLine={{ stroke: "var(--color-border)" }}
            minTickGap={40}
          />
          <YAxis
            tickFormatter={(v) => formatDollars(v as number).replace(",000", "k")}
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            width={48}
          />

          <Tooltip
            cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }}
            content={<CliffTooltip />}
          />

          <Area
            type="stepAfter"
            dataKey="subsidy"
            stroke="var(--color-accent)"
            strokeWidth={2}
            fill="url(#subsidyFill)"
            isAnimationActive={false}
            dot={false}
            name="Annual subsidy"
          />
          <Line
            type="stepAfter"
            dataKey="net"
            stroke="var(--color-over)"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            dot={false}
            isAnimationActive={false}
            name="Your net premium"
          />

          {cliffDollars != null && (
            <ReferenceLine
              x={cliffDollars}
              stroke="var(--color-over)"
              strokeWidth={1.5}
              label={{
                value: `Cliff · ${formatDollars(cliffDollars)}`,
                position: "top",
                fill: "var(--color-over)",
                fontSize: 11,
                fontWeight: 600,
              }}
            />
          )}

          <ReferenceDot
            x={currentIncome}
            y={Math.round(currentAnnualPtc / 100)}
            r={5}
            fill="var(--color-accent)"
            stroke="var(--color-background)"
            strokeWidth={2}
            label={{
              value: "You",
              position: "left",
              fill: "var(--color-foreground)",
              fontSize: 11,
              fontWeight: 600,
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

interface TooltipPayloadItem {
  payload: Datum
}

function CliffTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: TooltipPayloadItem[]
}) {
  if (!active || !payload || payload.length === 0) return null
  const d = payload[0].payload
  return (
    <div className="rounded-md border border-border bg-card px-3 py-2 text-card-foreground shadow-lg">
      <div className="text-xs text-muted-foreground">Income (MAGI)</div>
      <div className="tabular text-sm font-semibold">{formatDollars(d.income)}</div>
      <div className="mt-2 flex items-center justify-between gap-4 text-xs">
        <span className="text-muted-foreground">Subsidy</span>
        <span className="tabular font-medium text-accent">{formatCentsWhole(d.subsidy * 100)}/yr</span>
      </div>
      <div className="flex items-center justify-between gap-4 text-xs">
        <span className="text-muted-foreground">You pay</span>
        <span className="tabular font-medium">{formatCentsWhole(d.net * 100)}/yr</span>
      </div>
    </div>
  )
}
