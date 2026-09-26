import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

// GA4 has to execute under the CSP that public/_headers serves. An inline
// gtag('config') bootstrap is refused (script-src has no 'unsafe-inline'), and
// GA4 then records nothing without any visible error, so pin the wiring here.
const ID = "G-J0DNS1H8NK";
const read = (p: string): string => readFileSync(new URL(`../public/${p}`, import.meta.url), "utf8");
const html = read("index.html");
const cspLine = read("_headers")
  .split("\n")
  .find((l) => /^\s*Content-Security-Policy:/.test(l));
const csp = (cspLine ?? "").replace(/^\s*Content-Security-Policy:\s*/, "");
const directive = (name: string): string[] =>
  (csp.split(";").map((d) => d.trim().split(/\s+/)).find((d) => d[0] === name) ?? []).slice(1);

describe("GA4 under the served CSP", () => {
  it("loads gtag.js exactly once, with the per-site ID", () => {
    expect(html.match(/googletagmanager\.com\/gtag\/js\?id=[^"]+/g)).toEqual([
      `googletagmanager.com/gtag/js?id=${ID}`,
    ]);
  });

  it("bootstraps from the same-origin file, not an inline script", () => {
    expect(html).toContain('<script src="/ga4.js"></script>');
    expect(html).not.toMatch(/gtag\(/);
    expect(read("ga4.js")).toContain(`gtag("config", "${ID}")`);
  });

  it("admits GA4 and the Cloudflare beacon in script-src and connect-src, and nothing blanket", () => {
    const script = directive("script-src");
    expect(script).toEqual(
      expect.arrayContaining(["'self'", "https://www.googletagmanager.com", "https://static.cloudflareinsights.com"]),
    );
    expect(script).not.toContain("'unsafe-inline'");
    expect(script).not.toContain("'unsafe-eval'");
    expect(directive("connect-src")).toEqual(
      expect.arrayContaining([
        "'self'",
        "https://*.google-analytics.com",
        "https://*.analytics.google.com",
        "https://*.googletagmanager.com",
        "https://cloudflareinsights.com",
      ]),
    );
    for (const d of ["script-src", "connect-src"]) {
      expect(directive(d).some((s) => s === "*" || s === "https:")).toBe(false);
    }
  });
});
