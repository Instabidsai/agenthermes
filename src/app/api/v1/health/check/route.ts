import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { requireAuth, rateLimit } from '@/lib/auth'

export const runtime = 'nodejs'
export const maxDuration = 30

/**
 * POST /api/v1/health/check
 * Trigger a health check on a service's MCP endpoint.
 *
 * Body: { service_id } or { url } (direct URL check)
 * - service_id: UUID of a registered service — fetches endpoint_url from DB
 * - url: Direct URL to check (no DB lookup needed)
 *
 * Makes HTTP HEAD (fallback GET) to the endpoint, records response time + status.
 * Saves to health_checks table and updates service avg_response_ms / uptime_pct.
 */
export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  const rateLimitError = rateLimit(request, 10, 60_000)
  if (rateLimitError) return rateLimitError

  try {
    const body = await request.json().catch(() => null)

    if (!body || (!body.service_id && !body.url)) {
      return NextResponse.json(
        { error: 'Provide either service_id or url in the request body' },
        { status: 400 }
      )
    }

    const supabase = getServiceClient()
    let serviceId: string | null = body.service_id || null
    let checkUrl: string = body.url || ''

    // If service_id provided, look up the endpoint URL
    if (serviceId) {
      const { data: service, error: svcError } = await supabase
        .from('services')
        .select('id, endpoint_url, name')
        .eq('id', serviceId)
        .single()

      if (svcError || !service) {
        return NextResponse.json(
          { error: 'Service not found' },
          { status: 404 }
        )
      }

      const svc = service as Record<string, unknown>
      checkUrl = svc.endpoint_url as string

      if (!checkUrl) {
        return NextResponse.json(
          { error: 'Service has no endpoint_url configured' },
          { status: 400 }
        )
      }
    }

    // Validate URL
    try {
      const parsed = new URL(checkUrl)
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return NextResponse.json(
          { error: 'URL must use http or https protocol' },
          { status: 400 }
        )
      }
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    // Perform the health check
    const startTime = Date.now()
    let statusCode = 0
    let status: 'healthy' | 'degraded' | 'down' = 'down'

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15_000) // 15s timeout

      // Try HEAD first (lighter), fall back to GET
      let response: Response
      try {
        response = await fetch(checkUrl, {
          method: 'HEAD',
          signal: controller.signal,
          redirect: 'follow',
        })
      } catch {
        // HEAD might not be supported, try GET
        response = await fetch(checkUrl, {
          method: 'GET',
          signal: controller.signal,
          redirect: 'follow',
        })
      }

      clearTimeout(timeout)

      const responseMs = Date.now() - startTime
      statusCode = response.status

      // Determine status based on response code and latency
      if (statusCode >= 200 && statusCode < 400) {
        status = responseMs > 5000 ? 'degraded' : 'healthy'
      } else if (statusCode >= 400 && statusCode < 500) {
        status = 'degraded'
      } else {
        status = 'down'
      }

      const checkResult = {
        service_id: serviceId,
        status,
        response_ms: responseMs,
        status_code: statusCode,
      }

      // Save to health_checks table
      if (serviceId) {
        await supabase.from('health_checks').insert({
          service_id: serviceId,
          status,
          response_ms: responseMs,
          status_code: statusCode,
        } as any)

        // Update service rolling stats based on recent checks
        await updateServiceStats(supabase, serviceId)
      }

      return NextResponse.json({
        check: checkResult,
        url: checkUrl,
        checked_at: new Date().toISOString(),
      })
    } catch (fetchErr) {
      const responseMs = Date.now() - startTime

      const checkResult = {
        service_id: serviceId,
        status: 'down' as const,
        response_ms: responseMs,
        status_code: 0,
        error: fetchErr instanceof Error ? fetchErr.message : 'Connection failed',
      }

      // Save failed check to DB
      if (serviceId) {
        await supabase.from('health_checks').insert({
          service_id: serviceId,
          status: 'down',
          response_ms: responseMs,
          status_code: 0,
        } as any)

        await updateServiceStats(supabase, serviceId)
      }

      return NextResponse.json({
        check: checkResult,
        url: checkUrl,
        checked_at: new Date().toISOString(),
      })
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    console.error('[health/check] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * Recalculate avg_response_ms and uptime_pct for a service based on recent health checks.
 * Uses the last 100 checks for the rolling window.
 */
async function updateServiceStats(
  supabase: ReturnType<typeof getServiceClient>,
  serviceId: string
): Promise<void> {
  try {
    const { data: checks, error } = await supabase
      .from('health_checks')
      .select('status, response_ms')
      .eq('service_id', serviceId)
      .order('checked_at', { ascending: false })
      .limit(100)

    if (error || !checks || checks.length === 0) return

    const typedChecks = checks as { status: string; response_ms: number | null }[]

    // Calculate average response time (exclude nulls/zeros)
    const validResponseTimes = typedChecks
      .map((c) => c.response_ms)
      .filter((ms): ms is number => ms !== null && ms > 0)

    const avgResponseMs =
      validResponseTimes.length > 0
        ? Math.round(
            validResponseTimes.reduce((sum, ms) => sum + ms, 0) / validResponseTimes.length
          )
        : null

    // Calculate uptime percentage
    const healthyCount = typedChecks.filter((c) => c.status === 'healthy' || c.status === 'degraded').length
    const uptimePct = Math.round((healthyCount / typedChecks.length) * 10000) / 100 // 2 decimal places

    await (supabase
      .from('services') as any)
      .update({
        avg_response_ms: avgResponseMs,
        uptime_pct: uptimePct,
      })
      .eq('id', serviceId)
  } catch (err) {
    console.error('[health/check] Failed to update service stats:', err instanceof Error ? err.message : err)
  }
}
