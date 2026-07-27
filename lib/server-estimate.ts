/**
 * Server-side binding of the subsidy engine.
 *
 * One provider instance is shared by the JSON API route and by React Server
 * Components (the landing page's live example calls `runEstimate` directly, no
 * HTTP round-trip). Nothing here persists anything — the same posture as the
 * API route.
 *
 * DATA: this deployment serves the SYNTHETIC benchmark fixture. Its provenance
 * string literally contains "SYNTHETIC" so a figure can never be mistaken for a
 * real CMS premium. Real premiums come from `npm run etl`.
 */

import "server-only"
import { estimate, type EstimateRequest } from "@/src/api/handler"
import { MemoryShardLoader, StaticBenchmarkProvider } from "@/src/data/shard"
import { syntheticShard } from "@/src/fixtures/synthetic-shard"
import type { BenchmarkProvider } from "@/src/core/benchmark"
import type { EstimateResponse } from "@/lib/estimate"

let cachedProvider: BenchmarkProvider | null = null

export function getProvider(): BenchmarkProvider {
  if (cachedProvider) return cachedProvider
  const loader = new MemoryShardLoader()
  // Prefixes matching the synthetic fixture's ZIPs (77002, 77532, 90210).
  for (const prefix of ["770", "775", "902"]) {
    loader.add(prefix, syntheticShard(2026))
  }
  cachedProvider = new StaticBenchmarkProvider(loader)
  return cachedProvider
}

/** Run the engine directly on the server. Returns the same JSON the API emits. */
export async function runEstimate(request: EstimateRequest): Promise<EstimateResponse> {
  const response = await estimate(request, getProvider())
  return response as unknown as EstimateResponse
}
