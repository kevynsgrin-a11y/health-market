import * as React from "react"
import { cn } from "@/lib/utils"

interface FieldProps {
  label: string
  htmlFor: string
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
}

export function Field({ label, htmlFor, hint, error, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-over">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "tabular h-11 rounded-md border border-input bg-card px-3 text-sm text-foreground",
        "placeholder:text-muted-foreground/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
        "transition-colors duration-200",
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = "Input"

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "tabular h-11 rounded-md border border-input bg-card px-3 text-sm text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "transition-colors duration-200",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
)
Select.displayName = "Select"
