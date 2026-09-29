import type { CsvRow } from "./build";

const ZIP_COLUMNS = ["zipcode", "ZIP Code", "Zip Code", "zip_code", "zip"] as const;
const FIPS_COLUMNS = ["countycode", "FIPS", "fips", "county_code", "county"] as const;

function firstValue(row: CsvRow, columns: readonly string[]): string {
  for (const column of columns) {
    const value = row[column]?.trim();
    if (value) return value;
  }
  return "";
}

/** Normalize CMS's ZIP/FIPS fields, including the current title-case headers. */
export function buildZipToCounties(rows: readonly CsvRow[]): Record<string, string[]> {
  const byZip = new Map<string, Set<string>>();

  for (const row of rows) {
    const zip = firstValue(row, ZIP_COLUMNS).padStart(5, "0");
    const fips = firstValue(row, FIPS_COLUMNS).padStart(5, "0");
    if (!/^\d{5}$/.test(zip) || !/^\d{5}$/.test(fips)) continue;

    const counties = byZip.get(zip) ?? new Set<string>();
    counties.add(fips);
    byZip.set(zip, counties);
  }

  return Object.fromEntries(
    [...byZip.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([zip, counties]) => [zip, [...counties].sort()]),
  );
}
