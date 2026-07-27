import Link from "next/link"
import { CliffMark } from "@/components/cliff-mark"
import { buttonVariants } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Cliff, home">
          <CliffMark className="h-6 w-9 text-foreground" />
          <span className="font-serif text-xl tracking-tight">Cliff</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link href="/#the-cliff" className="transition-colors hover:text-foreground">
            The cliff
          </Link>
          <Link href="/#demo" className="transition-colors hover:text-foreground">
            Live example
          </Link>
          <Link href="/methodology" className="transition-colors hover:text-foreground">
            Methodology
          </Link>
        </nav>

        <Link href="/plan" className={buttonVariants({ variant: "primary", size: "sm" })}>
          Find my cliff
        </Link>
      </div>
    </header>
  )
}
