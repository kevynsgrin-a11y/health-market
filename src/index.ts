/**
 * Public surface of the subsidy engine.
 *
 * Everything exported here is isomorphic and dependency-free, so the same code
 * runs in a Cloudflare Worker, in Node, and in the browser. Running it in the
 * browser is the point: the estimate can be computed entirely client-side,
 * which is what lets the product promise that no income figure ever leaves the
 * user's device.
 */

export * from "./core/types";
export * from "./core/plan-years";
export * from "./core/fpl";
export * from "./core/applicable-percentage";
export * from "./core/ptc";
export * from "./core/cliff";
export * from "./core/affordability";
export * from "./core/csr";
export * from "./core/rating";
export * from "./core/benchmark";

export * from "./data/exchanges";
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
} from "./data/shard";

export {
  DISCLAIMER,
  estimate,
  handleRequest,
  RequestValidationError,
  validate,
  type EstimateRequest,
  type EstimateResponse,
} from "./api/handler";
