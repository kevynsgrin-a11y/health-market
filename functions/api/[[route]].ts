/**
 * Cloudflare Pages Function — the production API surface.
 *
 * Shards are static assets in the same deployment, read through the ASSETS
 * binding, so a request never leaves Cloudflare's edge and never touches CMS.
 *
 * Nothing is persisted: no KV write, no D1 row, no log of user input. The
 * estimate is computed and returned. The same engine also runs client-side, so
 * a user who blocks this endpoint still gets an answer.
 */

import { handleRequest } from "../../src/api/handler.js";
import { AssetShardLoader } from "../../src/data/file-loader.js";
import { StaticBenchmarkProvider } from "../../src/data/shard.js";

interface Env {
  readonly ASSETS: { fetch(request: Request): Promise<Response> };
}

interface EventContext {
  readonly request: Request;
  readonly env: Env;
}

export const onRequest = async (context: EventContext): Promise<Response> => {
  const provider = new StaticBenchmarkProvider(new AssetShardLoader(context.env.ASSETS));
  return handleRequest(context.request, provider);
};
