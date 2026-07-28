import Link from "next/link"
import { CliffMark } from "@/components/cliff-mark"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <CliffMark className="h-5 w-8 shrink-0 text-foreground" />
              <span className="font-serif text-lg">Subsidy Dropoff</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A precise estimate of the income at which your ACA premium subsidy ends, and what
              crossing that line costs. Built on the federal poverty guidelines and the IRS
              applicable-percentage table.
            </p>
          </div>

          <nav className="flex gap-16 text-sm">
            <div className="flex flex-col gap-3">
              <span className="font-medium text-foreground">Product</span>
              <Link href="/plan" className="text-muted-foreground transition-colors hover:text-foreground">
                Find my cliff
              </Link>
              <Link href="/#demo" className="text-muted-foreground transition-colors hover:text-foreground">
                Live example
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-medium text-foreground">Reference</span>
              <Link href="/methodology" className="text-muted-foreground transition-colors hover:text-foreground">
                Methodology
              </Link>
              <a
                href="https://www.irs.gov/pub/irs-drop/rp-24-35.pdf"
                className="text-muted-foreground transition-colors hover:text-foreground"
                target="_blank"
                rel="noreferrer"
              >
                IRS Rev. Proc.
              </a>
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Not tax or legal advice.</span> Estimates
            are informational and depend on inputs you provide. Final eligibility and premium tax
            credits are determined by the Marketplace and the IRS when you file Form 8962. Figures
            reflect published federal data for the selected plan year.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Subsidy Dropoff. Federal poverty guidelines: U.S. Department of Health
            &amp; Human Services. Applicable-percentage table: Internal Revenue Service.
          </p>
        </div>
      </div>
    </footer>
  )
}
