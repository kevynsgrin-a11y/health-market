/**
 * The estimate endpoint — binds the real subsidy engine to Next.js.
 *
 * PRIVACY: nothing is persisted. No logging of inputs, no cookies, no
 * analytics. The same engine also runs client-side, so this endpoint is an
 * optimisation, not a requirement.
 *
 * DATA: this deployment serves the SYNTHETIC benchmark fixture, whose
 * provenance string literally contains "SYNTHETIC" so it can never be mistaken
 * for real CMS premiums on the page. Real premiums come from `npm run etl`.
 */

import { handleRequest } from "@/src/api/handler"
import { MemoryShardLoader, StaticBenchmarkProvider } from "@/src/data/shard"
import { syntheticShard } from "@/src/fixtures/synthetic-shard"
import type { BenchmarkProvider } from "@/src/core/benchmark"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

let cachedProvider: BenchmarkProvider | null = null

function getProvider(): BenchmarkProvider {
  if (cachedProvider) return cachedProvider
  const loader = new MemoryShardLoader()
  // Prefixes matching the synthetic fixture's ZIPs (77002, 77532, 90210).
  for (const prefix of ["770", "775", "902"]) {
    loader.add(prefix, syntheticShard(2026))
  }
  cachedProvider = new StaticBenchmarkProvider(loader)
  return cachedProvider
}

export async function GET(request: Request): Promise<Response> {
  return handleRequest(request, getProvider())
}

export async function POST(request: Request): Promise<Response> {
  return handleRequest(request, getProvider())
}
