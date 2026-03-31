import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { logError } from '@/lib/error-logger'

/**
 * GET /api/v1/registry — Search the Agent Card Registry
 *
 * Query params:
 *   ?q=          — search name, domain, description
 *   ?vertical=   — filter by vertical
 *   ?protocol=   — mcp | a2a | rest
 *   ?tier=       — gold | silver | bronze | platinum
 *   ?limit=      — results per page (1-100, default 20)
 *   ?offset=     — pagination offset (default 0)
 *
 * Returns businesses that have agent cards with protocol info.
 */
export async function GET(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || ''

  try {
    const { searchParams } = request.nextUrl
    const q = searchParams.get('q')
    const vertical = searchParams.get('vertical')
    const protocol = searchParams.get('protocol')
    const tier = searchParams.get('tier')
    const rawLimit = parseInt(searchParams.get('limit') || '20', 10)
    const limit = Math.min(Math.max(Number.isNaN(rawLimit) ? 20 : rawLimit, 1), 100)
    const rawOffset = parseInt(searchParams.get('offset') || '0', 10)
    const offset = Math.max(Number.isNaN(rawOffset) ? 0 : rawOffset, 0)

    const supabase = getServiceClient()

    let query = supabase
      .from('businesses')
      .select(
        'id, name, slug, domain, description, logo_url, audit_score, audit_tier, vertical, capabilities, mcp_endpoints, a2a_agent_card, pricing_visible, agent_onboarding, created_at, updated_at, services(id, name, description, mcp_endpoint, status)',
        { count: 'exact' }
      )
      // Only include businesses that have been scored (not unaudited with 0)
      .gt('audit_score', 0)

    // Text search
    if (q) {
      const safeQ = `%${q.replace(/[^a-zA-Z0-9\s.-]/g, '')}%`
      query = query.or(
        `name.ilike.${safeQ},description.ilike.${safeQ},domain.ilike.${safeQ}`
      )
    }

    // Vertical filter
    if (vertical) {
      query = query.eq('vertical', vertical)
    }

    // Tier filter
    if (tier) {
      const tierMap: Record<string, string> = {
        platinum: 'platinum',
        gold: 'gold',
        silver: 'silver',
        bronze: 'bronze',
      }
      if (tierMap[tier]) {
        query = query.eq('audit_tier', tierMap[tier])
      }
    }

    // Protocol filter — post-filter since protocols are derived from data
    // (MCP from mcp_endpoints, A2A from a2a_agent_card, REST from audit_score > 0)
    // For MCP and A2A we can filter at the DB level
    if (protocol === 'mcp') {
      query = query.not('mcp_endpoints', 'eq', '{}')
    } else if (protocol === 'a2a') {
      query = query.not('a2a_agent_card', 'is', null)
    }
    // REST = any business with endpoints, which is all scored businesses

    // Sort by score descending
    query = query.order('audit_score', { ascending: false })

    // Pagination
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('[registry] Query error:', error.message, error.code)
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

    // Enrich results with protocol detection and tool counts
    const results = (data || []).map((biz: Record<string, any>) => {
      const protocols: string[] = []
      const mcpEndpoints = biz.mcp_endpoints as string[] | null
      const a2aCard = biz.a2a_agent_card as Record<string, unknown> | null
      const services = biz.services as { id: string; name: string; mcp_endpoint: string | null; status: string }[] | null

      // Detect supported protocols
      if (mcpEndpoints && mcpEndpoints.length > 0) {
        protocols.push('mcp')
      }
      if (a2aCard && Object.keys(a2aCard).length > 0) {
        protocols.push('a2a')
      }
      // Any scored business has REST endpoints
      protocols.push('rest')

      // Count tools/skills
      const activeServices = services?.filter((s) => s.status === 'active') || []
      const mcpToolCount = mcpEndpoints?.length || 0
      const a2aSkillCount = a2aCard
        ? ((a2aCard as any).skills?.length || (a2aCard as any).capabilities?.length || 0)
        : 0
      const totalToolCount = Math.max(activeServices.length, mcpToolCount + a2aSkillCount)

      return {
        id: biz.id,
        name: biz.name,
        slug: biz.slug,
        domain: biz.domain,
        description: biz.description,
        logo_url: biz.logo_url,
        score: biz.audit_score,
        tier: biz.audit_tier,
        vertical: biz.vertical,
        capabilities: biz.capabilities || [],
        protocols,
        tool_count: totalToolCount,
        mcp_tools: mcpToolCount,
        a2a_skills: a2aSkillCount,
        services_count: activeServices.length,
        profile_url: `https://agenthermes.ai/business/${biz.slug}`,
        connect_url: `https://agenthermes.ai/connect?business=${biz.slug}`,
      }
    })

    return NextResponse.json(
      {
        registry: results,
        pagination: {
          total: count ?? 0,
          limit,
          offset,
          has_more: (count ?? 0) > offset + limit,
        },
        filters: {
          q: q || null,
          vertical: vertical || null,
          protocol: protocol || null,
          tier: tier || null,
        },
      },
      {
        headers: { 'Cache-Control': 'public, max-age=60, s-maxage=120' },
      }
    )
  } catch (err) {
    console.error('[registry] Unexpected error:', err instanceof Error ? err.message : err)
    logError('/api/v1/registry', 'GET', err instanceof Error ? err : new Error(String(err)), requestId)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR', request_id: requestId },
      { status: 500 }
    )
  }
}
