/**
 * Local development server.
 *
 *   npm run dev                 # serves built shards from public/data
 *   npm run dev -- --synthetic  # serves the synthetic fixture instead
 *
 * The synthetic mode prints a loud banner, and the "SYNTHETIC" marker flows
 * through every API response's provenance block, so there is no quiet way to
 * mistake fixture output for real premiums.
 */

import { readFile } from "node:fs/promises";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { extname, join, normalize } from "node:path";

import { handleRequest } from "./api/handler";
import type { BenchmarkProvider } from "./core/benchmark";
import { FileShardLoader } from "./data/file-loader";
import { MemoryShardLoader, StaticBenchmarkProvider } from "./data/shard";
import { syntheticShard } from "./fixtures/synthetic-shard";

const PORT = Number(process.env["PORT"] ?? 8788);
const useSynthetic = process.argv.includes("--synthetic");

function buildProvider(): BenchmarkProvider {
  if (useSynthetic) {
    const loader = new MemoryShardLoader();
    for (const prefix of ["770", "775", "902"]) loader.add(prefix, syntheticShard(2026));
    return new StaticBenchmarkProvider(loader);
  }
  return new StaticBenchmarkProvider(new FileShardLoader("public/data"));
}

const provider = buildProvider();

async function toWhatwgRequest(req: IncomingMessage): Promise<Request> {
  const url = `http://${req.headers.host ?? "localhost"}${req.url ?? "/"}`;
  const method = req.method ?? "GET";
  if (method === "GET" || method === "HEAD") return new Request(url, { method });

  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  return new Request(url, { method, body: Buffer.concat(chunks) });
}

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

/**
 * Serve ./public, approximating what Cloudflare Pages does for static assets.
 * Paths are normalised and confined to the public directory so a `..` in the
 * request cannot escape it.
 */
async function serveStatic(pathname: string): Promise<Response | null> {
  const rel = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const candidate = rel === "/" || rel === "\\" ? "index.html" : rel.replace(/^[/\\]+/, "");
  const full = join("public", candidate);
  if (!normalize(full).startsWith("public")) return null;

  try {
    const body = await readFile(full);
    return new Response(body, {
      status: 200,
      headers: { "content-type": MIME[extname(full)] ?? "application/octet-stream" },
    });
  } catch {
    return null;
  }
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  void (async () => {
    try {
      const request = await toWhatwgRequest(req);
      const { pathname } = new URL(request.url);

      if (!pathname.startsWith("/api/")) {
        const asset = (await serveStatic(pathname)) ?? (await serveStatic("/index.html"));
        if (asset) {
          res.writeHead(asset.status, Object.fromEntries(asset.headers));
          res.end(Buffer.from(await asset.arrayBuffer()));
          return;
        }
      }

      const response = await handleRequest(request, provider);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
    } catch (error) {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: false, error: String(error) }));
    }
  })();
});

server.listen(PORT, () => {
  if (useSynthetic) {
    console.log("=".repeat(72));
    console.log("  SYNTHETIC DATA MODE — every premium below is INVENTED.");
    console.log("  Run `npm run etl` from a networked environment for real data.");
    console.log("=".repeat(72));
  }
  console.log(`listening on http://localhost:${PORT}`);
  console.log(`  GET  /api/health`);
  console.log(`  GET  /api/estimate?planYear=2026&zip=77002&householdSize=2&income=80000&ages=60,58`);
  console.log(`  POST /api/estimate`);
});
