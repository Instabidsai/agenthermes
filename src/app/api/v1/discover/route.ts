import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { trackEvent } from '@/lib/analytics'
import { logError } from '@/lib/error-logger'

export async function GET(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || ''
  try {
    const { searchParams } = request.nextUrl
    const q = searchParams.get('q')
    const vertical = searchParams.get('vertical')
    const capability = searchParams.get('capability')
    const min_score = searchParams.get('min_score')
    const tier = searchParams.get('tier')
    const mcp_compatible = searchParams.get('mcp_compatible')
    const max_price = searchParams.get('max_price')
    const sort = searchParams.get('sort') || 'audit_score'
    const rawLimit = parseInt(searchParams.get('limit') || '20', 10)
    const limit = Math.min(Math.max(Number.isNaN(rawLimit) ? 20 : rawLimit, 1), 100)
    const rawOffset = parseInt(searchParams.get('offset') || '0', 10)
    const offset = Math.max(Number.isNaN(rawOffset) ? 0 : rawOffset, 0)

    const supabase = getServiceClient()

    let query = supabase
      .from('businesses')
      .select('id, name, slug, domain, description, logo_url, audit_score, audit_tier, trust_score, vertical, capabilities, mcp_endpoints, pricing_visible, agent_onboarding, created_at, updated_at, services(*), audit_results(*)', { count: 'exact' })

    // Text search on name, description, domain (sanitized against PostgREST injection)
    if (q) {
      const safeQ = `%${q.replace(/[^a-zA-Z0-9\s-]/g, '')}%`
      query = query.or(
        `name.ilike.${safeQ},description.ilike.${safeQ},domain.ilike.${safeQ}`
      )
    }

    if (vertical) {
      query = query.eq('vertical', vertical)
    }

    if (capability) {
      query = query.contains('capabilities', [capability])
    }

    if (min_score) {
      query = query.gte('audit_score', parseFloat(min_score))
    }

    if (tier) {
      const tierMinScores: Record<string, number> = { bronze: 40, silver: 60, gold: 75, platinum: 90 }
      if (tierMinScores[tier]) {
        query = query.gte('audit_score', tierMinScores[tier])
      }
    }

    if (mcp_compatible === 'true') {
      // Business has at least one MCP endpoint
      query = query.not('mcp_endpoints', 'eq', '{}')
    }

    // Sort
    const validSorts = ['audit_score', 'trust_score', 'name'] as const
    const sortField = validSorts.includes(sort as typeof validSorts[number])
      ? sort
      : 'audit_score'
    const ascending = sortField === 'name'
    query = query.order(sortField, { ascending })

    // Pagination
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('[discover] Query error:', error.message, error.code)
      // PostgREST range/filter errors are client mistakes, not server errors
      const status = error.code === 'PGRST103' || error.message?.includes('range') ? 400 : 500
      return NextResponse.json(
        {
          error: status === 400 ? 'Invalid query parameters' : 'Internal server error',
          code: status === 400 ? 'INVALID_QUERY' : 'INTERNAL_ERROR',
          request_id: requestId,
        },
        { status }
      )
    }

    // Post-filter: max_price (filter businesses that have at least one service under max_price)
    let results = data || []
    if (max_price) {
      const maxPriceNum = parseFloat(max_price)
      results = results.filter((biz: Record<string, unknown>) => {
        const services = biz.services as { price_per_call: number }[] | undefined
        if (!services || services.length === 0) return true
        return services.some((s) => s.price_per_call <= maxPriceNum)
      })
    }

    // Track search impressions for each result (fire-and-forget)
    const agentId = request.headers.get('x-agent-id') || undefined
    for (const biz of results) {
      const b = biz as Record<string, any>
      if (b.id) {
        trackEvent(b.id, 'search_impression', {
          agent_id: agentId,
          query_text: q || undefined,
          source: 'discover',
        })
      }
    }

    return NextResponse.json({
      businesses: results,
      pagination: {
        total: count ?? 0,
        limit,
        offset,
        has_more: (count ?? 0) > offset + limit,
      },
    }, {
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=120' },
    })
  } catch (err) {
    console.error('[discover] Unexpected error:', err instanceof Error ? err.message : err)

    // Log to error_log table (fire-and-forget)
    logError('/api/v1/discover', 'GET', err instanceof Error ? err : new Error(String(err)), request.headers.get('x-request-id') || undefined)

    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR', request_id: requestId },
      { status: 500 }
    )
  }
}
