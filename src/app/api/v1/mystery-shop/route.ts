import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, rateLimit } from '@/lib/auth'
import { runMysteryShop, getMysteryShopHistory } from '@/lib/mystery-shopper'
import { getServiceClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * POST /api/v1/mystery-shop — Trigger a mystery shop for a business
 *
 * Body: { "business_id": "uuid" } or { "slug": "my-business" }
 *
 * Auth required.
 */
export async function POST(req: NextRequest) {
  const authError = requireAuth(req)
  if (authError) return authError

  const rateLimitError = rateLimit(req, 3, 60_000)
  if (rateLimitError) return rateLimitError

  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json(
        { error: 'Request body required. Provide business_id or slug.' },
        { status: 400 }
      )
    }

    let businessId: string | null = body.business_id ?? null

    // Resolve slug to business_id if needed
    if (!businessId && body.slug) {
      const supabase = getServiceClient()
      const { data, error } = await supabase
        .from('businesses')
        .select('id')
        .eq('slug', body.slug)
        .single()

      if (error || !data) {
        return NextResponse.json(
          { error: `Business not found with slug: ${body.slug}` },
          { status: 404 }
        )
      }
      businessId = (data as any).id
    }

    if (!businessId) {
      return NextResponse.json(
        { error: 'Provide either business_id or slug.' },
        { status: 400 }
      )
    }

    // Validate UUID format
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(businessId)) {
      return NextResponse.json(
        { error: 'Invalid business_id format' },
        { status: 400 }
      )
    }

    const result = await runMysteryShop(businessId)

    return NextResponse.json(result)
  } catch (err: unknown) {
    console.error(
      '[mystery-shop] Error:',
      err instanceof Error ? err.message : err
    )
    if (err instanceof Error && err.message.includes('not found')) {
      return NextResponse.json({ error: err.message }, { status: 404 })
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/v1/mystery-shop — Get mystery shop history for a business
 *
 * Query params: business_id or slug, limit, offset
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    let businessId = searchParams.get('business_id')
    const slug = searchParams.get('slug')
    const rawLimit = parseInt(searchParams.get('limit') || '50', 10)
    const limit = Math.min(Math.max(Number.isNaN(rawLimit) ? 50 : rawLimit, 1), 100)
    const rawOffset = parseInt(searchParams.get('offset') || '0', 10)
    const offset = Math.max(Number.isNaN(rawOffset) ? 0 : rawOffset, 0)

    // Resolve slug to business_id
    if (!businessId && slug) {
      const supabase = getServiceClient()
      const { data, error } = await supabase
        .from('businesses')
        .select('id')
        .eq('slug', slug)
        .single()

      if (error || !data) {
        return NextResponse.json(
          { error: `Business not found with slug: ${slug}` },
          { status: 404 }
        )
      }
      businessId = (data as any).id
    }

    if (!businessId) {
      return NextResponse.json(
        { error: 'Provide business_id or slug query parameter.' },
        { status: 400 }
      )
    }

    // Validate UUID format
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(businessId)) {
      return NextResponse.json(
        { error: 'Invalid business_id format' },
        { status: 400 }
      )
    }

    const { results, total } = await getMysteryShopHistory(businessId, limit, offset)

    return NextResponse.json({
      business_id: businessId,
      results,
      pagination: {
        total,
        limit,
        offset,
        has_more: offset + limit < total,
      },
    })
  } catch (err: unknown) {
    console.error(
      '[mystery-shop] GET error:',
      err instanceof Error ? err.message : err
    )
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
