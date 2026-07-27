/**
 * Public surface of the subsidy engine.
 *
 * Everything exported here is isomorphic and dependency-free, so the same code
 * runs in a Cloudflare Worker, in Node, and in the browser. Running it in the
 * browser is the point: the estimate can be computed entirely client-side,
 * which is what lets the product promise that no income figure ever leaves the
 * user's device.
 */

export * from "./core/types.js";
export * from "./core/plan-years.js";
export * from "./core/fpl.js";
export * from "./core/applicable-percentage.js";
export * from "./core/ptc.js";
export * from "./core/cliff.js";
export * from "./core/affordability.js";
export * from "./core/csr.js";
export * from "./core/rating.js";
export * from "./core/benchmark.js";

export * from "./data/exchanges.js";
export {
  type AgeRateTable,
  type BenchmarkShard,
  type CountyBenchmark,
  type ShardLoader,
  MemoryShardLoader,
  regionForState,
  ShardIntegrityError,
  StaticBenchmarkProvider,
  validateShard,
} from "./data/shard.js";

export {
  DISCLAIMER,
  estimate,
  handleRequest,
  RequestValidationError,
  validate,
  type EstimateRequest,
  type EstimateResponse,
} from "./api/handler.js";
