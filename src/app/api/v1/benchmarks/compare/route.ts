import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { getBusinessBySlug } from '@/lib/business'

function tierFromScore(score: number): string {
  if (score >= 90) return 'platinum'
  if (score >= 75) return 'gold'
  if (score >= 60) return 'silver'
  if (score >= 40) return 'bronze'
  return 'unaudited'
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { error: 'slug query parameter is required' },
        { status: 400 }
      )
    }

    if (!/^[a-z0-9-]{1,100}$/.test(slug)) {
      return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 })
    }

    const { business, error: bizError } = await getBusinessBySlug(slug)

    if (bizError) {
      console.error('[benchmarks/compare] Business lookup error:', bizError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    const supabase = getServiceClient()
    const vertical = business.vertical

    // Fetch all businesses in the same vertical (or all if no vertical)
    let query = supabase
      .from('businesses')
      .select('id, audit_score')
      .order('audit_score', { ascending: false })

    if (vertical) {
      query = query.eq('vertical', vertical)
    }

    const { data: peersRaw, error: peersError } = await query

    if (peersError) {
      console.error('[benchmarks/compare] Peers query error:', peersError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    const peers = (peersRaw || []) as any[]
    const peerScores = peers.map((p: any) => p.audit_score ?? 0).sort((a: number, b: number) => a - b)
    const totalPeers = peerScores.length

    const bizScore = business.audit_score ?? 0

    // Calculate percentile rank
    const belowCount = peerScores.filter((s: number) => s < bizScore).length
    const percentileRank = totalPeers > 0 ? Math.round((belowCount / totalPeers) * 100) : 0

    // Average peer score
    const avgPeerScore = totalPeers > 0
      ? Math.round(peerScores.reduce((s: number, v: number) => s + v, 0) / totalPeers)
      : 0

    // Category comparison — get this business's audit results and peer averages
    const { data: bizAuditRaw } = await supabase
      .from('audit_results')
      .select('category, score, max_score')
      .eq('business_id', business.id)

    const bizAuditResults = (bizAuditRaw || []) as any[]

    // Get peer audit averages
    const peerIds = peers.map((p: any) => p.id)
    const { data: peerAuditRaw } = await supabase
      .from('audit_results')
      .select('business_id, category, score')
      .in('business_id', peerIds)

    const peerAuditResults = (peerAuditRaw || []) as any[]

    // Average peer scores by category
    const peerCatTotals: Record<string, { sum: number; count: number }> = {}
    const seenPeerCat = new Set<string>()
    for (const ar of peerAuditResults) {
      const key = `${ar.business_id}:${ar.category}`
      if (seenPeerCat.has(key)) continue
      seenPeerCat.add(key)
      if (!peerCatTotals[ar.category]) {
        peerCatTotals[ar.category] = { sum: 0, count: 0 }
      }
      peerCatTotals[ar.category].sum += ar.score
      peerCatTotals[ar.category].count++
    }

    // Build strengths/weaknesses
    const strengths: string[] = []
    const weaknesses: string[] = []

    for (const result of bizAuditResults) {
      const peerAvg = peerCatTotals[result.category]
        ? peerCatTotals[result.category].sum / peerCatTotals[result.category].count
        : 0

      const diff = result.score - peerAvg
      const label = result.category.replace(/_/g, ' ')

      if (diff >= 3) {
        strengths.push(`${label}: ${result.score}/${result.max_score} (${Math.round(diff)} pts above avg)`)
      } else if (diff <= -3) {
        weaknesses.push(`${label}: ${result.score}/${result.max_score} (${Math.round(Math.abs(diff))} pts below avg)`)
      }
    }

    // Category comparison details
    const categoryComparison: Record<string, { your_score: number; peer_avg: number; max: number }> = {}
    for (const result of bizAuditResults) {
      const peerAvg = peerCatTotals[result.category]
        ? Math.round((peerCatTotals[result.category].sum / peerCatTotals[result.category].count) * 10) / 10
        : 0
      categoryComparison[result.category] = {
        your_score: result.score,
        peer_avg: peerAvg,
        max: result.max_score,
      }
    }

    return NextResponse.json({
      business: {
        name: business.name,
        slug: business.slug,
        score: bizScore,
        tier: business.audit_tier || tierFromScore(bizScore),
      },
      vertical: vertical || 'global',
      comparison: {
        your_score: bizScore,
        avg_peer_score: avgPeerScore,
        percentile_rank: percentileRank,
        total_peers: totalPeers,
        score_vs_avg: bizScore - avgPeerScore,
      },
      category_comparison: categoryComparison,
      strengths,
      weaknesses,
    })
  } catch (err) {
    console.error('[benchmarks/compare] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
