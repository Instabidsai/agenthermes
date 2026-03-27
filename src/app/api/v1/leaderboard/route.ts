import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

function corsHeaders(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const vertical = searchParams.get('vertical')
    const rawLimit = parseInt(searchParams.get('limit') || '50', 10)
    const limit = Math.min(Math.max(Number.isNaN(rawLimit) ? 50 : rawLimit, 1), 100)
    const rawOffset = parseInt(searchParams.get('offset') || '0', 10)
    const offset = Math.max(Number.isNaN(rawOffset) ? 0 : rawOffset, 0)

    const supabase = getServiceClient()

    let query = supabase
      .from('businesses')
      .select(
        'id, name, slug, domain, description, audit_score, audit_tier, trust_score, vertical, capabilities, mcp_endpoints',
        { count: 'exact' }
      )
      .gt('audit_score', 0) // Only include scored businesses

    if (vertical) {
      query = query.eq('vertical', vertical)
    }

    query = query
      .order('audit_score', { ascending: false })
      .order('name', { ascending: true })
      .range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('[leaderboard] Query error:', error.message)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500, headers: corsHeaders() }
      )
    }

    const businesses = (data || []) as Record<string, any>[]

    // Build ranked entries with position
    const ranked = businesses.map((biz, index) => ({
      rank: offset + index + 1,
      id: biz.id,
      name: biz.name,
      slug: biz.slug,
      domain: biz.domain,
      score: biz.audit_score,
      tier: biz.audit_tier,
      trust_score: biz.trust_score,
      vertical: biz.vertical,
      capabilities: (biz.capabilities || []).slice(0, 5),
      has_mcp: Array.isArray(biz.mcp_endpoints) && biz.mcp_endpoints.length > 0,
      profile_url: `https://agenthermes.ai/business/${biz.slug}`,
    }))

    // Fetch distinct verticals for filter options
    const { data: verticalData } = await supabase
      .from('businesses')
      .select('vertical')
      .gt('audit_score', 0)
      .not('vertical', 'is', null)

    const verticals = [
      ...new Set(
        ((verticalData || []) as { vertical: string }[])
          .map((v) => v.vertical)
          .filter(Boolean)
      ),
    ].sort()

    return NextResponse.json(
      {
        leaderboard: ranked,
        pagination: {
          total: count ?? 0,
          limit,
          offset,
          has_more: (count ?? 0) > offset + limit,
        },
        filters: {
          verticals,
          current_vertical: vertical || null,
        },
      },
      {
        status: 200,
        headers: {
          ...corsHeaders(),
          'Cache-Control': 'public, max-age=60, s-maxage=120',
        },
      }
    )
  } catch (err) {
    console.error('[leaderboard] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders() }
    )
  }
}
