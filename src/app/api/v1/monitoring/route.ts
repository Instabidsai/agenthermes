import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, rateLimit } from '@/lib/auth'
import { runMonitoringCycle, getMonitoringEvents } from '@/lib/monitoring'

export const runtime = 'nodejs'
export const maxDuration = 300 // Allow up to 5 minutes for a monitoring cycle

/**
 * POST /api/v1/monitoring — Trigger a monitoring cycle
 *
 * Auth required. Rate limited to 1 per 5 minutes.
 * Re-scans businesses that haven't been checked in >24h.
 */
export async function POST(req: NextRequest) {
  const authError = requireAuth(req)
  if (authError) return authError

  const rateLimitError = rateLimit(req, 1, 300_000) // 1 per 5 minutes
  if (rateLimitError) return rateLimitError

  try {
    const result = await runMonitoringCycle()

    return NextResponse.json({
      status: 'completed',
      ...result,
    })
  } catch (err: unknown) {
    console.error(
      '[monitoring] Cycle error:',
      err instanceof Error ? err.message : err
    )
    return NextResponse.json(
      { error: 'Internal server error during monitoring cycle' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/v1/monitoring — Get monitoring events
 *
 * Query params: business_id, severity, event_type, limit, offset
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const businessId = searchParams.get('business_id') ?? undefined
    const severity = searchParams.get('severity') ?? undefined
    const eventType = searchParams.get('event_type') ?? undefined
    const rawLimit = parseInt(searchParams.get('limit') || '50', 10)
    const limit = Math.min(Math.max(Number.isNaN(rawLimit) ? 50 : rawLimit, 1), 100)
    const rawOffset = parseInt(searchParams.get('offset') || '0', 10)
    const offset = Math.max(Number.isNaN(rawOffset) ? 0 : rawOffset, 0)

    // Validate UUID format if business_id is provided
    if (
      businessId &&
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(businessId)
    ) {
      return NextResponse.json(
        { error: 'Invalid business_id format' },
        { status: 400 }
      )
    }

    const { events, total } = await getMonitoringEvents({
      businessId,
      severity,
      eventType,
      limit,
      offset,
    })

    return NextResponse.json({
      events,
      pagination: {
        total,
        limit,
        offset,
        has_more: offset + limit < total,
      },
    })
  } catch (err: unknown) {
    console.error(
      '[monitoring] GET error:',
      err instanceof Error ? err.message : err
    )
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
