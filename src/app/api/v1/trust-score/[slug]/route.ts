import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { getBusinessBySlug } from '@/lib/business'
import { computeTrustScore } from '@/lib/trust-score'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!/^[a-z0-9-]{1,100}$/.test(slug)) {
      return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 })
    }

    const { business, error: bizError } = await getBusinessBySlug(slug)

    if (bizError) {
      console.error('[trust-score] Business lookup error:', bizError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    // Compute the trust score
    const result = await computeTrustScore(business.id)

    // Update the businesses.trust_score column
    const supabase = getServiceClient()
    const { error: updateError } = await (supabase
      .from('businesses') as any)
      .update({ trust_score: result.trust_score, updated_at: new Date().toISOString() })
      .eq('id', business.id)

    if (updateError) {
      console.error('[trust-score] Update error:', updateError.message)
      // Non-fatal — still return the computed score
    }

    return NextResponse.json({
      business_id: business.id,
      slug: business.slug,
      name: business.name,
      trust_score: result.trust_score,
      breakdown: result.breakdown,
      computed_at: result.computed_at,
    })
  } catch (err) {
    console.error('[trust-score] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
