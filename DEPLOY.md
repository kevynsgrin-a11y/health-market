# Deploying subsidydropoff.com

## Status

Run 36438384365 on 2026-09-28 failed on `main` for two separate reasons: the ETL
checked retired Socrata routes and received HTTP 404, then Wrangler received Cloudflare
authentication error 10000. The CMS source repair and PY2026 shards had already landed
on the default branch in PR #12, but `main` was created from an earlier commit and did
not include them. This change ports that existing repair to `main` and updates the
workflow. It cannot verify or change the Cloudflare secrets; deployment remains
owner-gated until the token and account ID are checked.

## One-time setup

### 1. Create the Cloudflare API token

Cloudflare dashboard → **My Profile → API Tokens → Create Token → Custom token**.

| Setting | Value |
|---|---|
| Permissions | `Account` → `Cloudflare Pages` → **Write** (shown as **Edit** in some dashboard views) |
| Account Resources | Include → the account that owns `subsidy-dropoff` |

Copy the token. It is shown once.

### 2. Add repository secrets

GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | the token from step 1 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → right sidebar |

### 3. Trigger the first deploy

Push to a release branch, or run the workflow manually:

```
GitHub → Actions → "Deploy to Cloudflare Pages" → Run workflow
```

The workflow creates the Pages project (`subsidy-dropoff`) on first run. It will
typecheck, run the test suite, pull the CMS public use files, derive benchmark shards,
refuse to proceed if synthetic fixture data is present, and deploy.

### Existing code 10000 failure

The September 28 run reached the Pages deploy step and received Cloudflare error
10000. Check that `CLOUDFLARE_API_TOKEN` is active and has Pages write access on the
account identified by `CLOUDFLARE_ACCOUNT_ID`, and that this is the account containing
the `subsidy-dropoff` Pages project. Update those repository secrets through GitHub
Settings if needed; no token value belongs in an issue, pull request, or source file.

### 4. Attach the domain

Cloudflare dashboard → **Workers & Pages → subsidy-dropoff → Custom domains →
Set up a custom domain**. Add both:

- `subsidydropoff.com`
- `www.subsidydropoff.com`

DNS is created automatically because the zone is already in the same Cloudflare
account. `public/_redirects` collapses `www` onto the apex with a 301, so search
engines see one canonical origin.

## Why the ETL runs in CI rather than being committed

GitHub runners have the outbound access to CMS that the authoring environment lacked.
Running the ETL in the pipeline means:

- Premium data is rebuilt from the published files on every deploy, so it cannot
  silently drift from source.
- The weekly `schedule` trigger picks up CMS's in-year revisions without anyone
  remembering to do it.
- The ETL and workflow currently accept plan year 2026 only. When CMS publishes
  PY2027, verify its catalog downloads and schemas, then update `src/etl/sources.ts`,
  the ETL supported year, and the workflow's plan-year choice together before building it.

If the ETL fails — for example, during a CMS outage — the deploy still proceeds and the
API returns a typed `dataset-not-loaded` rather than inventing a premium. The repository
includes the PY2026 shards as a fallback. CI reports zero shards when the selected
plan-year directory has no shard files, even if its `index.json` exists. A failed CMS
refresh creates an issue even when the checked-in shards let the deploy proceed; review
the Actions summary and issue after each run.

The SLCSP ZIP/county file is still published through the official CMS catalog, but its
catalog record dates to 2014. This ETL uses only its ZIP and FIPS mapping columns; it
does not use its historic premium values. Check the catalog record for a newer mapping
before changing this source.

## Manual deploy

```bash
npx wrangler login
npm ci && npm test
npm run etl -- --plan-year=2026 --out=public/data
npx wrangler pages deploy public --project-name=subsidy-dropoff
```

## Verifying a deploy

```bash
curl -s https://subsidydropoff.com/api/health

curl -s "https://subsidydropoff.com/api/estimate?planYear=2026&zip=77002&householdSize=2&income=80000&ages=60,58"
```

`/api/health` should return `{"ok":true,...}`. The estimate should return
`"ok": true` with a real `benchmark.monthlySlcsp`. If it returns
`"reason": "dataset-not-loaded"`, the ETL step did not produce shards — check that
job's log.

Then confirm the security headers landed:

```bash
curl -sI https://subsidydropoff.com | grep -iE 'content-security-policy|strict-transport'
```

## Before you call it launched

- [ ] Re-verify the Rev. Proc. 2026-26 bracket values against the primary IRS PDF
      (currently `secondary-concordant` — see the verification table in `README.md`)
- [ ] Populate the Alaska and Hawaii poverty guidelines; the engine refuses those
      regions until you do
- [ ] Spot-check ten PUF-derived benchmarks against HealthCare.gov window shopping,
      target ±$2/month
- [ ] Confirm the disclaimer renders above the fold on mobile
- [ ] Re-check the plan year 2027 open-enrollment end date — vacated 2026-06-12 in
      *City of Columbus v. Kennedy*, currently on appeal to the Fourth Circuit
