import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

/**
 * GET /api/v1/discover/services
 *
 * Search across ALL services (not just per-business).
 * Returns services with their parent business info.
 *
 * Query params:
 *   q            — text search on service name/description
 *   vertical     — filter by parent business vertical
 *   max_price    — max price_per_call
 *   pricing_model — per_call | monthly | per_unit | custom
 *   auth_type    — api_key | oauth | jwt | none
 *   min_uptime   — minimum uptime_pct (0-100)
 *   limit        — results per page (max 100, default 20)
 *   offset       — pagination offset
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const q = searchParams.get('q')
    const vertical = searchParams.get('vertical')
    const max_price = searchParams.get('max_price')
    const pricing_model = searchParams.get('pricing_model')
    const auth_type = searchParams.get('auth_type')
    const min_uptime = searchParams.get('min_uptime')
    const rawLimit = parseInt(searchParams.get('limit') || '20', 10)
    const limit = Math.min(Math.max(Number.isNaN(rawLimit) ? 20 : rawLimit, 1), 100)
    const rawOffset = parseInt(searchParams.get('offset') || '0', 10)
    const offset = Math.max(Number.isNaN(rawOffset) ? 0 : rawOffset, 0)

    const supabase = getServiceClient()

    // Query services with parent business info
    let query = supabase
      .from('services')
      .select('*, businesses!inner(id, name, slug, audit_score, audit_tier, vertical)', { count: 'exact' })
      .eq('status', 'active')

    // Text search on service name/description
    if (q) {
      const safeQ = `%${q.replace(/[^a-zA-Z0-9\s-]/g, '')}%`
      query = query.or(`name.ilike.${safeQ},description.ilike.${safeQ}`)
    }

    // Filter by parent business vertical
    if (vertical) {
      query = query.eq('businesses.vertical', vertical)
    }

    // Max price filter
    if (max_price) {
      const maxPriceNum = parseFloat(max_price)
      if (!isNaN(maxPriceNum)) {
        query = query.lte('price_per_call', maxPriceNum)
      }
    }

    // Pricing model filter
    if (pricing_model) {
      const validModels = ['per_call', 'monthly', 'per_unit', 'custom']
      if (validModels.includes(pricing_model)) {
        query = query.eq('pricing_model', pricing_model)
      }
    }

    // Auth type filter
    if (auth_type) {
      const validAuthTypes = ['api_key', 'oauth', 'jwt', 'none']
      if (validAuthTypes.includes(auth_type)) {
        query = query.eq('auth_type', auth_type)
      }
    }

    // Min uptime filter
    if (min_uptime) {
      const minUptimeNum = parseFloat(min_uptime)
      if (!isNaN(minUptimeNum)) {
        query = query.gte('uptime_pct', minUptimeNum)
      }
    }

    // Pagination
    query = query.order('calls_last_30d', { ascending: false })
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('[discover/services] Query error:', error.message, error.code)
      const status = error.code === 'PGRST103' || error.message?.includes('range') ? 400 : 500
      return NextResponse.json(
        { error: status === 400 ? 'Invalid query parameters' : 'Internal server error' },
        { status }
      )
    }

    // Reshape results to include parent business info at top level
    const services = (data || []).map((svc: any) => {
      const { businesses, ...service } = svc
      return {
        ...service,
        business: {
          name: businesses.name,
          slug: businesses.slug,
          audit_score: businesses.audit_score,
          tier: businesses.audit_tier,
        },
      }
    })

    return NextResponse.json({
      services,
      pagination: {
        total: count ?? 0,
        limit,
        offset,
        has_more: (count ?? 0) > offset + limit,
      },
    })
  } catch (err) {
    console.error('[discover/services] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
