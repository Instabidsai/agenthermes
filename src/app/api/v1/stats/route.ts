import { NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

/**
 * GET /api/v1/stats — Public aggregate stats for AI search citation
 *
 * No auth required. Cached for 5 minutes.
 * Returns total businesses scored, average score, ARL distribution,
 * top scorer, verticals covered, and last updated timestamp.
 */
export async function GET() {
  try {
    const db = getServiceClient()

    // Fetch all scored businesses in one query
    const { data: businesses } = await db
      .from('businesses')
      .select('name, domain, slug, audit_score, audit_tier, vertical, updated_at')
      .not('audit_score', 'is', null)
      .order('audit_score', { ascending: false })

    const allBiz = (businesses as Record<string, any>[] | null) || []
    const total = allBiz.length

    if (total === 0) {
      return NextResponse.json(
        {
          total_businesses_scored: 0,
          average_score: 0,
          average_arl: 0,
          businesses_at_arl_0: 0,
          businesses_at_arl_3_plus: 0,
          top_scorer: null,
          verticals_covered: 0,
          last_updated: new Date().toISOString(),
        },
        {
          headers: {
            'Cache-Control': 'public, max-age=300, s-maxage=300',
            'Content-Type': 'application/json',
          },
        }
      )
    }

    // Calculate average score
    const scores = allBiz.map((b) => b.audit_score as number)
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / total)

    // ARL (Agent Readiness Level) mapping from score
    // ARL 0: score 0-9, ARL 1: 10-29, ARL 2: 30-49, ARL 3: 50-69, ARL 4: 70-89, ARL 5: 90-100
    function scoreToArl(score: number): number {
      if (score >= 90) return 5
      if (score >= 70) return 4
      if (score >= 50) return 3
      if (score >= 30) return 2
      if (score >= 10) return 1
      return 0
    }

    const arls = allBiz.map((b) => scoreToArl(b.audit_score as number))
    const avgArl = Math.round((arls.reduce((a, b) => a + b, 0) / total) * 10) / 10

    const arlZeroCount = arls.filter((a) => a === 0).length
    const arl3PlusCount = arls.filter((a) => a >= 3).length

    // Top scorer
    const top = allBiz[0]
    const topScorer = {
      name: top.name,
      score: top.audit_score,
      tier: top.audit_tier,
      arl: scoreToArl(top.audit_score as number),
    }

    // Verticals covered (unique non-null verticals)
    const verticalSet = new Set(
      allBiz
        .map((b) => b.vertical as string | null)
        .filter((v): v is string => !!v)
    )
    const verticalsCovered = verticalSet.size

    // Last updated: most recent updated_at across all businesses
    const lastUpdated = allBiz.reduce((latest, b) => {
      const ts = b.updated_at as string
      return ts > latest ? ts : latest
    }, allBiz[0].updated_at as string)

    const stats = {
      total_businesses_scored: total,
      average_score: avgScore,
      average_arl: avgArl,
      businesses_at_arl_0: arlZeroCount,
      businesses_at_arl_3_plus: arl3PlusCount,
      top_scorer: topScorer,
      verticals_covered: verticalsCovered,
      last_updated: lastUpdated,
    }

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    console.error('[stats] Error:', err instanceof Error ? err.message : err)
    return NextResponse.json(
      { error: 'Failed to compute stats', code: 'STATS_ERROR' },
      { status: 500 }
    )
  }
}
