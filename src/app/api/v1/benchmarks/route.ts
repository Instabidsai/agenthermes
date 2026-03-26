import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

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
    const vertical = searchParams.get('vertical')

    const supabase = getServiceClient()

    // Fetch businesses, optionally filtered by vertical
    let query = supabase
      .from('businesses')
      .select('id, name, slug, audit_score, audit_tier, vertical')
      .order('audit_score', { ascending: false })

    if (vertical) {
      query = query.eq('vertical', vertical)
    }

    const { data: bizRaw, error: bizError } = await query.limit(1000)

    if (bizError) {
      console.error('[benchmarks] Query error:', bizError.message)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    const businesses = (bizRaw || []) as any[]
    const totalBusinesses = businesses.length

    if (totalBusinesses === 0) {
      return NextResponse.json({
        vertical: vertical || 'global',
        total_businesses: 0,
        avg_score: 0,
        median_score: 0,
        top_quartile_score: 0,
        tier_distribution: { platinum: 0, gold: 0, silver: 0, bronze: 0, unaudited: 0 },
        top_businesses: [],
        category_averages: {},
      })
    }

    // Compute stats
    const scores = businesses.map((b: any) => b.audit_score ?? 0).sort((a: number, b: number) => a - b)
    const avgScore = Math.round(scores.reduce((s: number, v: number) => s + v, 0) / totalBusinesses)
    const medianScore = totalBusinesses % 2 === 1
      ? scores[Math.floor(totalBusinesses / 2)]
      : Math.round((scores[totalBusinesses / 2 - 1] + scores[totalBusinesses / 2]) / 2)
    const topQuartileIdx = Math.floor(totalBusinesses * 0.75)
    const topQuartileScore = scores[topQuartileIdx] ?? scores[scores.length - 1]

    // Tier distribution
    const tierDistribution: Record<string, number> = {
      platinum: 0, gold: 0, silver: 0, bronze: 0, unaudited: 0,
    }
    for (const biz of businesses) {
      const tier = biz.audit_tier || tierFromScore(biz.audit_score ?? 0)
      if (tier in tierDistribution) {
        tierDistribution[tier]++
      } else {
        tierDistribution.unaudited++
      }
    }

    // Top businesses (top 10)
    const topBusinesses = businesses.slice(0, 10).map((b: any) => ({
      name: b.name,
      slug: b.slug,
      score: b.audit_score ?? 0,
    }))

    // Category averages — fetch audit_results for these businesses
    const bizIds = businesses.map((b: any) => b.id)
    const { data: auditResultsRaw } = await supabase
      .from('audit_results')
      .select('business_id, category, score')
      .in('business_id', bizIds)

    const auditResults = (auditResultsRaw || []) as any[]

    // Deduplicate to latest per business+category (we just take any since we can't sort here)
    // Group by category
    const categoryTotals: Record<string, { sum: number; count: number }> = {}
    const seenBizCat = new Set<string>()
    for (const ar of auditResults) {
      const key = `${ar.business_id}:${ar.category}`
      if (seenBizCat.has(key)) continue
      seenBizCat.add(key)

      if (!categoryTotals[ar.category]) {
        categoryTotals[ar.category] = { sum: 0, count: 0 }
      }
      categoryTotals[ar.category].sum += ar.score
      categoryTotals[ar.category].count++
    }

    const categoryAverages: Record<string, number> = {}
    for (const [cat, data] of Object.entries(categoryTotals)) {
      categoryAverages[cat] = Math.round((data.sum / data.count) * 10) / 10
    }

    return NextResponse.json({
      vertical: vertical || 'global',
      total_businesses: totalBusinesses,
      avg_score: avgScore,
      median_score: medianScore,
      top_quartile_score: topQuartileScore,
      tier_distribution: tierDistribution,
      top_businesses: topBusinesses,
      category_averages: categoryAverages,
    })
  } catch (err) {
    console.error('[benchmarks] Unexpected error:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
