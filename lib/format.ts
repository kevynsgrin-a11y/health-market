/**
 * Money formatting for the UI.
 *
 * All monetary values from the engine are integer CENTS. We never divide and
 * round in a template; we hand the exact value to Intl.NumberFormat and let it
 * place the decimal. This keeps the "$17,501.88" figures exact.
 */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const usdWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

/** Format integer cents as "$17,501.88". */
export function formatCents(cents: number): string {
  return usd.format(cents / 100)
}

/** Format integer cents as "$17,502" — no cents, for headlines. */
export function formatCentsWhole(cents: number): string {
  return usdWhole.format(Math.round(cents / 100))
}

/** Format a plain dollar number as "$80,000". */
export function formatDollars(dollars: number): string {
  return usdWhole.format(dollars)
}

/** applicablePercentage is integer hundredths of a percent: 996 -> "9.96%". */
export function formatCentiPercent(cp: number): string {
  return `${(cp / 100).toFixed(2)}%`
}

/** Whole percent of FPL, e.g. 378 -> "378%". */
export function formatFplPercent(pct: number): string {
  return `${pct}%`
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return dateFmt.format(d)
}
