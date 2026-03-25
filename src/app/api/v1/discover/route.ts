import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
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
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    const supabase = getServiceClient()

    let query = supabase
      .from('businesses')
      .select('*, services(*), audit_results(*)', { count: 'exact' })

    // Text search on name, description, domain
    if (q) {
      query = query.or(
        `name.ilike.%${q}%,description.ilike.%${q}%,domain.ilike.%${q}%`
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
      query = query.eq('audit_tier', tier)
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
      return NextResponse.json({ error: error.message }, { status: 500 })
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

    return NextResponse.json({
      businesses: results,
      pagination: {
        total: count ?? 0,
        limit,
        offset,
        has_more: (count ?? 0) > offset + limit,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
