import { NextRequest, NextResponse } from 'next/server'
import { getMonitoringEvents } from '@/lib/monitoring'

/**
 * GET /api/v1/monitoring/events — List monitoring events with filters
 *
 * Query params:
 *   business_id — Filter by business UUID
 *   severity    — Filter by severity (info, warning, error)
 *   event_type  — Filter by event type (score_change, tier_change, certification_risk, scan_failure)
 *   limit       — Max results (default 50, max 100)
 *   offset      — Pagination offset (default 0)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const businessId = searchParams.get('business_id') ?? undefined
    const severity = searchParams.get('severity') ?? undefined
    const eventType = searchParams.get('event_type') ?? undefined
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    // Validate UUID format if provided
    if (
      businessId &&
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(businessId)
    ) {
      return NextResponse.json(
        { error: 'Invalid business_id format' },
        { status: 400 }
      )
    }

    // Validate severity
    const validSeverities = ['info', 'warning', 'error']
    if (severity && !validSeverities.includes(severity)) {
      return NextResponse.json(
        { error: `Invalid severity. Must be one of: ${validSeverities.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate event_type
    const validEventTypes = [
      'score_change',
      'tier_change',
      'certification_risk',
      'scan_failure',
    ]
    if (eventType && !validEventTypes.includes(eventType)) {
      return NextResponse.json(
        {
          error: `Invalid event_type. Must be one of: ${validEventTypes.join(', ')}`,
        },
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
      filters: {
        business_id: businessId ?? null,
        severity: severity ?? null,
        event_type: eventType ?? null,
      },
      pagination: {
        total,
        limit,
        offset,
        has_more: offset + limit < total,
      },
    })
  } catch (err: unknown) {
    console.error(
      '[monitoring/events] GET error:',
      err instanceof Error ? err.message : err
    )
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
