import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, rateLimit, getRateLimitHeaders } from '@/lib/auth'
import { callService } from '@/lib/gateway/proxy'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * POST /api/v1/gateway/call
 *
 * REST equivalent of the MCP `call_service` tool.
 * Proxies an API call through the AgentHermes gateway, handles auth
 * injection, billing, and usage logging.
 *
 * Body:
 *   service_id  — UUID of the gateway service
 *   action      — action name to invoke (e.g. "chat_completion")
 *   params      — parameters forwarded to the upstream API
 *   wallet_id   — UUID of the wallet to charge
 *
 * Returns the proxied response + billing metadata.
 * Requires Bearer token. Rate limited (30 req/min).
 */
export async function POST(request: NextRequest) {
  // --- Auth ---
  const authError = requireAuth(request)
  if (authError) return authError

  // --- Rate limit ---
  const rateLimitError = rateLimit(request, 30, 60_000)
  if (rateLimitError) return rateLimitError

  try {
    const body = await request.json()
    const { service_id, action, params, wallet_id } = body

    // --- Validation ---
    if (!service_id || typeof service_id !== 'string') {
      return NextResponse.json(
        { error: 'service_id is required' },
        { status: 400 }
      )
    }
    if (!UUID_RE.test(service_id)) {
      return NextResponse.json(
        { error: 'service_id must be a valid UUID' },
        { status: 400 }
      )
    }

    if (!action || typeof action !== 'string') {
      return NextResponse.json(
        { error: 'action is required' },
        { status: 400 }
      )
    }

    if (!wallet_id || typeof wallet_id !== 'string') {
      return NextResponse.json(
        { error: 'wallet_id is required' },
        { status: 400 }
      )
    }
    if (!UUID_RE.test(wallet_id)) {
      return NextResponse.json(
        { error: 'wallet_id must be a valid UUID' },
        { status: 400 }
      )
    }

    if (params !== undefined && (typeof params !== 'object' || Array.isArray(params))) {
      return NextResponse.json(
        { error: 'params must be a JSON object' },
        { status: 400 }
      )
    }

    // --- Execute via gateway proxy ---
    const result = await callService({
      service_id,
      action,
      params: params || undefined,
      wallet_id,
    })

    const rlHeaders = getRateLimitHeaders(request, 30, 60_000)

    return NextResponse.json(
      {
        success: result.success,
        data: result.data,
        billing: {
          cost: result.cost,
          margin: result.margin,
          total_charged: result.cost + result.margin,
        },
        meta: {
          service_name: result.service_name,
          action_name: result.action_name,
          status_code: result.status_code,
          response_ms: result.response_ms,
        },
      },
      {
        status: result.success ? 200 : 502,
        headers: rlHeaders,
      }
    )
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const message = err instanceof Error ? err.message : 'Unknown error'

    // Map known error patterns to appropriate status codes
    if (message.includes('not found')) {
      return NextResponse.json({ error: message }, { status: 404 })
    }
    if (message.includes('Insufficient balance')) {
      return NextResponse.json({ error: message }, { status: 402 })
    }
    if (message.includes('not active')) {
      return NextResponse.json({ error: message }, { status: 403 })
    }

    console.error('[gateway/call] Error:', message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
