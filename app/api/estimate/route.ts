/**
 * The estimate endpoint — binds the real subsidy engine to Next.js.
 *
 * PRIVACY: nothing is persisted. No logging of inputs, no cookies, no
 * analytics. The same engine also runs on the server for RSC pages, so this
 * endpoint is an optimisation, not a requirement.
 */

import { handleRequest } from "@/src/api/handler"
import { getProvider } from "@/lib/server-estimate"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: Request): Promise<Response> {
  return handleRequest(request, getProvider())
}

export async function POST(request: Request): Promise<Response> {
  return handleRequest(request, getProvider())
}
