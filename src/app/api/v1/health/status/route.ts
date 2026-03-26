import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

/**
 * GET /api/v1/health/status
 * Get health status for a business's services.
 *
 * Query params:
 *   business_id — UUID of the business
 *   slug        — Business slug (alternative to business_id)
 *
 * Returns all services with their latest health check, avg response time, and uptime %.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const businessId = searchParams.get('business_id')
    const slug = searchParams.get('slug')

    if (!businessId && !slug) {
      return NextResponse.json(
        { error: 'Provide either business_id or slug query parameter' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()

    // Resolve business ID from slug if needed
    let resolvedBusinessId = businessId

    if (!resolvedBusinessId && slug) {
      const { data: business, error: bizError } = await supabase
        .from('businesses')
        .select('id')
        .eq('slug', slug)
        .single()

      if (bizError || !business) {
        return NextResponse.json(
          { error: 'Business not found' },
          { status: 404 }
        )
      }

      resolvedBusinessId = (business as Record<string, unknown>).id as string
    }

    // Fetch all services for this business
    const { data: services, error: svcError } = await supabase
      .from('services')
      .select('id, name, description, mcp_endpoint, status, avg_response_ms, uptime_pct, pricing_model, price_per_call, auth_type, calls_last_30d')
      .eq('business_id', resolvedBusinessId!)
      .order('name', { ascending: true })

    if (svcError) {
      console.error('[health/status] Services query error:', svcError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    if (!services || services.length === 0) {
      return NextResponse.json({
        business_id: resolvedBusinessId,
        services: [],
        summary: {
          total_services: 0,
          healthy: 0,
          degraded: 0,
          down: 0,
          unknown: 0,
        },
      })
    }

    // Fetch latest health check for each service
    const serviceIds = (services as Record<string, unknown>[]).map((s) => s.id as string)

    // Get the most recent health check for each service
    // Supabase doesn't support DISTINCT ON, so fetch recent checks and dedupe in code
    const { data: recentChecks, error: checksError } = await supabase
      .from('health_checks')
      .select('service_id, status, response_ms, status_code, checked_at')
      .in('service_id', serviceIds)
      .order('checked_at', { ascending: false })
      .limit(serviceIds.length * 5) // grab a few extra to ensure coverage

    if (checksError) {
      console.error('[health/status] Health checks query error:', checksError.message)
    }

    // Build a map of service_id -> latest check
    const latestCheckMap = new Map<string, Record<string, unknown>>()
    if (recentChecks) {
      for (const check of recentChecks as Record<string, unknown>[]) {
        const sid = check.service_id as string
        if (!latestCheckMap.has(sid)) {
          latestCheckMap.set(sid, check)
        }
      }
    }

    // Combine services with their latest health check
    const enrichedServices = (services as Record<string, unknown>[]).map((svc) => {
      const latestCheck = latestCheckMap.get(svc.id as string) || null

      return {
        ...svc,
        latest_health_check: latestCheck
          ? {
              status: latestCheck.status,
              response_ms: latestCheck.response_ms,
              status_code: latestCheck.status_code,
              checked_at: latestCheck.checked_at,
            }
          : null,
      }
    })

    // Calculate summary
    const summary = {
      total_services: enrichedServices.length,
      healthy: 0,
      degraded: 0,
      down: 0,
      unknown: 0,
    }

    for (const svc of enrichedServices) {
      const checkStatus = svc.latest_health_check?.status
      if (checkStatus === 'healthy') summary.healthy++
      else if (checkStatus === 'degraded') summary.degraded++
      else if (checkStatus === 'down') summary.down++
      else summary.unknown++
    }

    return NextResponse.json({
      business_id: resolvedBusinessId,
      services: enrichedServices,
      summary,
    })
  } catch (err) {
    console.error('[health/status] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
