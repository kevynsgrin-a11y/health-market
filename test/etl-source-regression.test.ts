import { zipSync, strToU8 } from "fflate";
import { afterEach, describe, expect, it, vi } from "vitest";

import { parseCsvTable } from "../src/etl/csv.js";
import {
  assertSupportedPlanYear,
  DATASETS,
  fetchText,
  SourceHttpError,
  SUPPORTED_PLAN_YEAR,
} from "../src/etl/sources.js";
import { buildZipToCounties } from "../src/etl/zip-crosswalk.js";

afterEach(() => vi.unstubAllGlobals());

describe("CMS source replacements", () => {
  it("uses the catalog paths for the retired QHP and ZIP/county resources", () => {
    expect(DATASETS.qhpLandscapeIndividualMedical.downloadUrl).toBe(
      "https://data.healthcare.gov/datafile/py2026/individual_market_medical.zip",
    );
    expect(DATASETS.slcspCountyZip.downloadUrl).toBe(
      "https://data.healthcare.gov/datafile/slcsp-county-zip-reference-data.yaaf-rjhy.csv",
    );
    expect(DATASETS.ratePuf.downloadUrl).toContain("/marketplace-puf/2026/rate-puf.zip");
    expect(Object.values(DATASETS).every(({ downloadUrl }) => !downloadUrl.includes("/resource/")))
      .toBe(true);
  });

  it("refuses plan years that do not match the configured PY2026 sources", () => {
    expect(SUPPORTED_PLAN_YEAR).toBe(2026);
    expect(() => assertSupportedPlanYear(2026)).not.toThrow();
    expect(() => assertSupportedPlanYear(2027)).toThrow(/No ETL sources are configured/);
  });

  it("does not retry a retired source URL after an HTTP 404", async () => {
    const fetch = vi.fn().mockResolvedValue(new Response("Not Found", {
      status: 404,
      statusText: "Not Found",
    }));
    vi.stubGlobal("fetch", fetch);

    await expect(fetchText("https://data.healthcare.gov/retired.csv", { retries: 4 }))
      .rejects.toMatchObject({
        name: "SourceHttpError",
        status: 404,
        sourceUrl: "https://data.healthcare.gov/retired.csv",
      } satisfies Partial<SourceHttpError>);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("extracts a QHP XLSX inside the CMS ZIP into rows with the current plan ID header", async () => {
    const sharedStrings = [
      "FIPS County Code",
      "Plan ID (Standard Component)",
      "County Name",
      "01001",
      "ALPLAN0001",
      "Autauga",
    ].map((value) => `<si><t>${value}</t></si>`).join("");
    const worksheet = [
      '<row r="1"><c r="A1" t="s"><v>0</v></c><c r="B1" t="s"><v>1</v></c><c r="C1" t="s"><v>2</v></c></row>',
      '<row r="2"><c r="A2" t="s"><v>3</v></c><c r="B2" t="s"><v>4</v></c><c r="C2" t="s"><v>5</v></c></row>',
    ].join("");
    const xlsx = zipSync({
      "xl/sharedStrings.xml": strToU8(`<sst>${sharedStrings}</sst>`),
      "xl/worksheets/sheet1.xml": strToU8(`<worksheet><sheetData>${worksheet}</sheetData></worksheet>`),
    });
    const archive = zipSync({
      "individual_market_medical.xlsx": xlsx,
      "readme.txt": strToU8("CMS QHP landscape workbook"),
    });
    const fetch = vi.fn().mockResolvedValue(new Response(archive));
    vi.stubGlobal("fetch", fetch);

    const csv = await fetchText(DATASETS.qhpLandscapeIndividualMedical.downloadUrl, { retries: 0 });
    const table = parseCsvTable(csv, ["FIPS County Code", "Plan ID (Standard Component)"]);

    expect(table.rows).toEqual([{
      "FIPS County Code": "01001",
      "Plan ID (Standard Component)": "ALPLAN0001",
      "County Name": "Autauga",
    }]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("skips CMS preamble lines while finding the landscape table header", () => {
    const table = parseCsvTable(
      "2026 QHP Landscape,Report\n2 records returned\n" +
        "FIPS County Code,Plan ID (Standard Component),County Name\n" +
        "01001,ALPLAN0001,Autauga\n",
      ["FIPS County Code", "Plan ID (Standard Component)"],
    );

    expect(table.rows[0]).toEqual({
      "FIPS County Code": "01001",
      "Plan ID (Standard Component)": "ALPLAN0001",
      "County Name": "Autauga",
    });
  });
});

describe("CMS ZIP/county crosswalk columns", () => {
  it("normalizes the current Zip Code and FIPS columns and pads numeric FIPS", () => {
    expect(buildZipToCounties([
      { "Zip Code": "36003", FIPS: "1001" },
      { "Zip Code": "36003", FIPS: "01001" },
      { "Zip Code": "03603", FIPS: "1003" },
      { "Zip Code": "bad", FIPS: "1001" },
    ])).toEqual({
      "03603": ["01003"],
      "36003": ["01001"],
    });
  });
});
