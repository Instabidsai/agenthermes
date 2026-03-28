import { NextResponse } from 'next/server'
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

/**
 * GET /api/v1/digest — Weekly Agent Readiness Digest
 *
 * Generates a comprehensive weekly summary from real Supabase data:
 * - New businesses scanned this week
 * - Score changes (up and down movers)
 * - Network stats (totals, tier distribution)
 * - Top search queries from analytics_events
 * - Industry breakdown by vertical
 *
 * Returns JSON suitable for email formatting or the /digest page.
 */
export async function GET() {
  try {
    const db = getServiceClient()

    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
    const sinceISO = weekAgo.toISOString()
    const twoWeeksAgoISO = twoWeeksAgo.toISOString()

    // -----------------------------------------------------------------------
    // 1. New businesses scanned this week
    // -----------------------------------------------------------------------
    const { data: newBizRaw, error: newBizError } = await db
      .from('businesses')
      .select('id, name, slug, domain, audit_score, audit_tier, vertical, created_at')
      .gte('created_at', sinceISO)
      .order('audit_score', { ascending: false })

    if (newBizError) {
      console.error('[digest] New businesses query error:', newBizError.message)
    }

    const newBusinesses = ((newBizRaw || []) as Record<string, any>[]).map((b) => ({
      name: b.name,
      slug: b.slug,
      domain: b.domain,
      score: b.audit_score,
      tier: b.audit_tier,
      vertical: b.vertical,
      scanned_at: b.created_at,
    }))

    // -----------------------------------------------------------------------
    // 2. Score changes — businesses updated this week with score differences
    //    We compare current audit_results to detect movers by looking at
    //    businesses updated in the last 7 days vs their previous state.
    // -----------------------------------------------------------------------
    const { data: updatedBizRaw } = await db
      .from('businesses')
      .select('id, name, slug, domain, audit_score, audit_tier, vertical, updated_at, created_at')
      .gte('updated_at', sinceISO)
      .lt('created_at', sinceISO) // Exclude brand new — only re-scans
      .order('audit_score', { ascending: false })

    const updatedBusinesses = (updatedBizRaw || []) as Record<string, any>[]

    // For score changes, look at audit_results history.
    // We get the latest audit results for updated businesses and compare
    // to any previous results (audited_at before this week).
    const scoreChanges: {
      name: string
      slug: string
      domain: string | null
      previous_score: number
      current_score: number
      change: number
      tier: string
      vertical: string | null
    }[] = []

    for (const biz of updatedBusinesses) {
      // Get the most recent audit_results for this business
      const { data: currentAuditsRaw } = await db
        .from('audit_results')
        .select('score, max_score, audited_at')
        .eq('business_id', biz.id)
        .gte('audited_at', sinceISO)
        .order('audited_at', { ascending: false })
        .limit(5)

      const currentAudits = (currentAuditsRaw || []) as Record<string, any>[]
      if (currentAudits.length === 0) continue

      // The current total is business.audit_score (already set by scanner)
      const currentScore = biz.audit_score as number

      // Look for older audit results (before this week) for comparison
      const { data: prevAuditsRaw } = await db
        .from('audit_results')
        .select('score')
        .eq('business_id', biz.id)
        .lt('audited_at', sinceISO)
        .limit(5)

      const prevAudits = (prevAuditsRaw || []) as Record<string, any>[]
      if (prevAudits.length === 0) continue

      // Sum previous audit scores (5 categories x max 20 = 100)
      const previousScore = prevAudits.reduce(
        (sum: number, a: Record<string, any>) => sum + (a.score as number || 0),
        0
      )

      const change = currentScore - previousScore
      if (change !== 0) {
        scoreChanges.push({
          name: biz.name,
          slug: biz.slug,
          domain: biz.domain,
          previous_score: previousScore,
          current_score: currentScore,
          change,
          tier: biz.audit_tier,
          vertical: biz.vertical,
        })
      }
    }

    // Sort by absolute change magnitude
    scoreChanges.sort((a, b) => Math.abs(b.change) - Math.abs(a.change))

    const topMoversUp = scoreChanges.filter((s) => s.change > 0).slice(0, 10)
    const topMoversDown = scoreChanges.filter((s) => s.change < 0).slice(0, 10)

    // -----------------------------------------------------------------------
    // 3. Network stats — overall totals and tier distribution
    // -----------------------------------------------------------------------
    const [
      { count: totalBusinesses },
      { count: totalAudits },
      { data: tierDistRaw },
      { count: totalConnections },
      { data: txDataRaw },
    ] = await Promise.all([
      db.from('businesses').select('*', { count: 'exact', head: true }),
      db.from('audit_results').select('*', { count: 'exact', head: true }),
      db.from('businesses').select('audit_tier'),
      db.from('connections').select('*', { count: 'exact', head: true }),
      db.from('transactions').select('amount').eq('status', 'completed'),
    ])

    const tierDistribution: Record<string, number> = {}
    for (const row of ((tierDistRaw || []) as Record<string, any>[])) {
      const tier = (row.audit_tier as string) || 'unaudited'
      tierDistribution[tier] = (tierDistribution[tier] || 0) + 1
    }

    const totalVolume = ((txDataRaw || []) as Record<string, any>[]).reduce(
      (sum: number, row: Record<string, any>) => sum + ((row.amount as number) || 0),
      0
    )

    // Week-over-week new business growth
    const { count: prevWeekNewBiz } = await db
      .from('businesses')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', twoWeeksAgoISO)
      .lt('created_at', sinceISO)

    const thisWeekNewBiz = newBusinesses.length
    const prevWeekCount = prevWeekNewBiz ?? 0
    const growthPct =
      prevWeekCount > 0
        ? Math.round(((thisWeekNewBiz - prevWeekCount) / prevWeekCount) * 100)
        : thisWeekNewBiz > 0
          ? 100
          : 0

    // -----------------------------------------------------------------------
    // 4. Top search queries from analytics_events
    // -----------------------------------------------------------------------
    const { data: eventsRaw } = await db
      .from('analytics_events')
      .select('event_type, query_text, metadata')
      .gte('created_at', sinceISO)

    const events = (eventsRaw || []) as Record<string, any>[]

    // Count by event type
    const eventCounts: Record<string, number> = {}
    const queryCounts: Record<string, number> = {}

    for (const event of events) {
      const eventType = event.event_type as string
      eventCounts[eventType] = (eventCounts[eventType] || 0) + 1

      if (event.query_text) {
        const q = (event.query_text as string).toLowerCase().trim()
        if (q.length > 0) {
          queryCounts[q] = (queryCounts[q] || 0) + 1
        }
      }
    }

    const topSearchQueries = Object.entries(queryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15)
      .map(([query, count]) => ({ query, count }))

    // -----------------------------------------------------------------------
    // 5. Industry breakdown — businesses by vertical
    // -----------------------------------------------------------------------
    const { data: verticalDataRaw } = await db
      .from('businesses')
      .select('vertical, audit_score, audit_tier')
      .gt('audit_score', 0)

    const verticalStats: Record<
      string,
      { count: number; total_score: number; tiers: Record<string, number> }
    > = {}

    for (const row of ((verticalDataRaw || []) as Record<string, any>[])) {
      const v = (row.vertical as string) || 'Uncategorized'
      if (!verticalStats[v]) {
        verticalStats[v] = { count: 0, total_score: 0, tiers: {} }
      }
      verticalStats[v].count++
      verticalStats[v].total_score += (row.audit_score as number) || 0
      const tier = (row.audit_tier as string) || 'unaudited'
      verticalStats[v].tiers[tier] = (verticalStats[v].tiers[tier] || 0) + 1
    }

    const industryBreakdown = Object.entries(verticalStats)
      .map(([vertical, stats]) => ({
        vertical,
        count: stats.count,
        avg_score: stats.count > 0 ? Math.round(stats.total_score / stats.count) : 0,
        tiers: stats.tiers,
      }))
      .sort((a, b) => b.count - a.count)

    // -----------------------------------------------------------------------
    // 6. Compose the digest
    // -----------------------------------------------------------------------
    const weekStart = weekAgo.toISOString().split('T')[0]
    const weekEnd = now.toISOString().split('T')[0]

    const avgNewScore =
      newBusinesses.length > 0
        ? Math.round(
            newBusinesses.reduce((s, b) => s + b.score, 0) / newBusinesses.length
          )
        : 0

    const digest = {
      title: 'Weekly Agent Readiness Digest',
      subtitle: `${weekStart} to ${weekEnd}`,
      generated_at: now.toISOString(),
      period: {
        start: weekAgo.toISOString(),
        end: now.toISOString(),
        days: 7,
      },

      headline: {
        new_scans: thisWeekNewBiz,
        new_scans_growth_pct: growthPct,
        avg_new_score: avgNewScore,
        total_events: events.length,
        score_changes: scoreChanges.length,
      },

      network_stats: {
        total_businesses: totalBusinesses ?? 0,
        total_audits: totalAudits ?? 0,
        total_connections: totalConnections ?? 0,
        total_transaction_volume: Math.round(totalVolume * 100) / 100,
        tier_distribution: tierDistribution,
      },

      new_businesses: newBusinesses.slice(0, 25),

      score_changes: {
        total: scoreChanges.length,
        top_movers_up: topMoversUp,
        top_movers_down: topMoversDown,
      },

      analytics: {
        total_events: events.length,
        event_breakdown: eventCounts,
        top_search_queries: topSearchQueries,
      },

      industry_breakdown: industryBreakdown,

      cta: {
        text: 'Scan your business for free',
        url: 'https://agenthermes.ai',
        api: 'https://agenthermes.ai/api/v1/scan',
      },
    }

    return NextResponse.json(digest, {
      status: 200,
      headers: {
        ...corsHeaders(),
        'Cache-Control': 'public, max-age=300, s-maxage=600',
      },
    })
  } catch (err) {
    console.error(
      '[digest] Unexpected error:',
      err instanceof Error ? err.message : err
    )
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders() }
    )
  }
}
