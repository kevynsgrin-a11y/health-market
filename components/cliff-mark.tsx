import { cn } from "@/lib/utils"

/**
 * The cliff-profile motif: a flat plateau, a sheer drop, a shallow runout.
 * One idea repeated at many scales — logo mark, favicon, section dividers,
 * empty states. Drawn as inline SVG, never clipart.
 */
export function CliffMark({
  className,
  strokeWidth = 1.5,
  "aria-hidden": ariaHidden = true,
  title,
}: {
  className?: string
  strokeWidth?: number
  "aria-hidden"?: boolean
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("text-foreground", className)}
      aria-hidden={ariaHidden}
      role={title ? "img" : undefined}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {/* plateau -> sheer drop -> shallow runout */}
      <path
        d="M3 16 H22 L22 40 H45"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* a walker's position marker on the plateau edge */}
      <circle cx="18" cy="16" r="2" fill="currentColor" />
    </svg>
  )
}

/**
 * A full-bleed thin section divider drawn as a repeated cliff silhouette.
 * Purely decorative.
 */
export function CliffDivider({ className }: { className?: string }) {
  return (
    <div className={cn("w-full overflow-hidden text-border", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        className="h-8 w-full"
        fill="none"
      >
        <path
          d="M0 20 H180 L180 40 H360 L360 14 H540 L540 40 H720 L720 22 H900 L900 40 H1080 L1080 16 H1200"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
