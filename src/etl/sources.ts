/**
 * CMS data sources.
 *
 * LICENSING
 * ---------
 * All sources below are US Government works in the public domain (17 U.S.C.
 * §105) and are published as federal open data. They may be redistributed and
 * transformed without attribution, though we attribute anyway because the
 * provenance is the product.
 *
 * The one source with real conditions is the CMS Marketplace API, which
 * requires a rotating key and which CMS states is "not designed to be scraped
 * or for the whole data set to be extracted". We therefore use the PUFs for
 * bulk derivation and reserve the API for spot verification only.
 *
 * @see https://www.cms.gov/marketplace/resources/data/public-use-files
 * @see https://developer.cms.gov/marketplace-api
 */

export interface DatasetSource {
  readonly id: string;
  readonly description: string;
  /** Landing page a human should read before trusting the file. */
  readonly landingPage: string;
  /** Direct download. Socrata datasets accept `.csv` with `$limit`/`$offset`. */
  readonly downloadUrl: string;
  readonly licence: "public-domain";
  /**
   * Whether this URL has been confirmed to resolve from a networked
   * environment. Everything is false here because the build environment that
   * authored this file had all outbound HTTPS blocked by egress policy.
   */
  readonly urlVerified: boolean;
}

const SOCRATA_LIMIT = 500_000;

function socrata(host: string, fourByFour: string): string {
  return `https://${host}/resource/${fourByFour}.csv?$limit=${SOCRATA_LIMIT}`;
}

/**
 * Datasets required to derive the benchmark for federally-facilitated states.
 *
 * NOTE ON PLAN YEAR AVAILABILITY: as of 2026-07-27 the most recent published
 * plan year is 2026. PY2027 files publish around October 2026, after state
 * regulators finalise rates (insurer filings were due 2026-07-15). Requesting
 * PY2027 before then is expected to 404 — that is correct behaviour, not a bug.
 */
export const DATASETS = {
  qhpLandscapeIndividualMedical: {
    id: "qhp-landscape-individual-medical",
    description:
      "Certified individual-market medical QHPs by county, with premiums at " +
      "standard age points. Fastest path to a county-level sanity check.",
    landingPage: "https://data.healthcare.gov/qhp-landscape-files",
    downloadUrl: socrata("healthdata.gov", "5grd-8evx"),
    licence: "public-domain",
    urlVerified: false,
  },
  ratePuf: {
    id: "rate-puf",
    description:
      "Plan-level rates by age, tobacco status and rating area. The only " +
      "source with a rate for every single age, which is what an exact " +
      "household benchmark requires.",
    landingPage: "https://www.cms.gov/marketplace/resources/data/public-use-files",
    downloadUrl: "https://download.cms.gov/marketplace-puf/2026/rate-puf.zip",
    licence: "public-domain",
    urlVerified: false,
  },
  planAttributesPuf: {
    id: "plan-attributes-puf",
    description:
      "Metal level, market coverage, CSR variation type and service area for " +
      "each plan. Needed to filter to on-exchange individual silver plans.",
    landingPage: "https://www.cms.gov/marketplace/resources/data/public-use-files",
    downloadUrl: "https://download.cms.gov/marketplace-puf/2026/plan-attributes-puf.zip",
    licence: "public-domain",
    urlVerified: false,
  },
  serviceAreaPuf: {
    id: "service-area-puf",
    description: "Which counties and ZIPs each plan's service area covers.",
    landingPage: "https://www.cms.gov/marketplace/resources/data/public-use-files",
    downloadUrl: "https://download.cms.gov/marketplace-puf/2026/service-area-puf.zip",
    licence: "public-domain",
    urlVerified: false,
  },
  slcspCountyZip: {
    id: "slcsp-county-zip",
    description:
      "Official ZIP-to-county reference used by the HealthCare.gov tax tool. " +
      "Authoritative for resolving ZIPs that span multiple counties.",
    landingPage: "https://data.healthcare.gov/dataset/yaaf-rjhy",
    downloadUrl: socrata("data.healthcare.gov", "yaaf-rjhy"),
    licence: "public-domain",
    urlVerified: false,
  },
} as const satisfies Record<string, DatasetSource>;

export type DatasetKey = keyof typeof DATASETS;

/** Spot-verification endpoint. Requires a key that rotates every 60 days. */
export const MARKETPLACE_API = {
  base: "https://marketplace.api.healthcare.gov/api/v1",
  keyRequest: "https://developer.cms.gov/marketplace-api/key-request.html",
  spec: "https://developer.cms.gov/marketplace-api/api-spec",
  note:
    "Rate limited; keys expire every 60 days and are re-issued by email. CMS " +
    "states the API is not designed for bulk extraction — use it to verify a " +
    "sample of PUF-derived benchmarks, never to populate the dataset.",
} as const;

export class NetworkBlockedError extends Error {
  constructor(readonly sourceUrl: string, readonly underlying: unknown) {
    super(
      `Could not reach ${sourceUrl}.\n\n` +
        `If this is a sandboxed or policy-restricted environment, outbound HTTPS ` +
        `to CMS may be blocked. Verify with:\n` +
        `  curl -sS "$HTTPS_PROXY/__agentproxy/status"\n\n` +
        `Run the ETL from an environment with network access to *.cms.gov, ` +
        `*.healthcare.gov and healthdata.gov, then commit the generated shards.\n\n` +
        `Underlying error: ${underlying instanceof Error ? underlying.message : String(underlying)}`,
    );
    this.name = "NetworkBlockedError";
  }
}

export interface FetchOptions {
  readonly retries?: number;
  readonly timeoutMs?: number;
}

/** Fetch with bounded exponential backoff and an explicit, actionable failure. */
export async function fetchText(
  url: string,
  options: FetchOptions = {},
): Promise<string> {
  const retries = options.retries ?? 4;
  const timeoutMs = options.timeoutMs ?? 120_000;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { accept: "text/csv,application/json;q=0.9,*/*;q=0.8" },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 2 ** (attempt + 1) * 1000));
      }
    } finally {
      clearTimeout(timer);
    }
  }
  throw new NetworkBlockedError(url, lastError);
}
