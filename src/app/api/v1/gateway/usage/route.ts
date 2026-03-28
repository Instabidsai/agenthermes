import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * GET /api/v1/gateway/usage
 *
 * Get usage history for a wallet.
 * Query params:
 *   wallet_id   — required, UUID of the wallet
 *   service_id  — optional, filter to a specific service
 *   limit       — results per page (max 100, default 20)
 *   offset      — pagination offset (default 0)
 *
 * Returns paginated usage records with totals.
 * Requires Bearer token.
 */
export async function GET(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { searchParams } = request.nextUrl

    // --- Parse & validate params ---
    const walletId = searchParams.get('wallet_id')
    if (!walletId) {
      return NextResponse.json(
        { error: 'wallet_id query parameter is required' },
        { status: 400 }
      )
    }
    if (!UUID_RE.test(walletId)) {
      return NextResponse.json(
        { error: 'wallet_id must be a valid UUID' },
        { status: 400 }
      )
    }

    const serviceId = searchParams.get('service_id') || null
    if (serviceId && !UUID_RE.test(serviceId)) {
      return NextResponse.json(
        { error: 'service_id must be a valid UUID' },
        { status: 400 }
      )
    }

    const rawLimit = parseInt(searchParams.get('limit') || '20', 10)
    const limit = Math.min(Math.max(Number.isNaN(rawLimit) ? 20 : rawLimit, 1), 100)
    const rawOffset = parseInt(searchParams.get('offset') || '0', 10)
    const offset = Math.max(Number.isNaN(rawOffset) ? 0 : rawOffset, 0)

    const supabase = getServiceClient()

    // --- Fetch usage records ---
    let query = supabase
      .from('gateway_usage')
      .select('*', { count: 'exact' })
      .eq('agent_wallet_id', walletId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (serviceId) {
      query = query.eq('service_id', serviceId)
    }

    const { data: usageRaw, error, count } = await query

    if (error) {
      console.error('[gateway/usage] Query error:', error.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    const usage = (usageRaw || []) as Array<Record<string, unknown>>

    // --- Compute totals for the returned page ---
    let totalCost = 0
    let totalMargin = 0
    let successCount = 0
    let failCount = 0
    for (const record of usage) {
      totalCost += (record.cost as number) || 0
      totalMargin += (record.margin as number) || 0
      if (record.success) successCount++
      else failCount++
    }

    return NextResponse.json({
      usage: usage.map((u) => ({
        id: u.id,
        service_id: u.service_id,
        action_name: u.action_name,
        cost: u.cost,
        margin: u.margin,
        response_ms: u.response_ms,
        status_code: u.status_code,
        success: u.success,
        created_at: u.created_at,
      })),
      summary: {
        total_cost: Math.round(totalCost * 10000) / 10000,
        total_margin: Math.round(totalMargin * 10000) / 10000,
        success_count: successCount,
        fail_count: failCount,
      },
      pagination: {
        total: count ?? 0,
        limit,
        offset,
        has_more: (count ?? 0) > offset + limit,
      },
    })
  } catch (err) {
    console.error('[gateway/usage] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
