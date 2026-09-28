// One-off: fetch + convert all four ETL sources to downloads/*.csv so the
// ETL can iterate offline (--from-dir) while fixing the landscape preamble.
// Run with NODE_OPTIONS=--max-old-space-size=8192.
import { mkdir, writeFile } from "node:fs/promises";
import { DATASETS, fetchText, type DatasetKey } from "../src/etl/sources.js";

const keys: DatasetKey[] = ["planAttributesPuf", "ratePuf", "qhpLandscapeIndividualMedical", "slcspCountyZip"];
await mkdir("downloads", { recursive: true });
for (const key of keys) {
  const ds = DATASETS[key];
  process.stdout.write(`converting ${key} ... `);
  const text = await fetchText(ds.downloadUrl);
  await writeFile(`downloads/${ds.id}.csv`, text, "utf8");
  console.log(`${(text.length / 1e6).toFixed(1)}MB`);
}
