import { NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export const runtime = 'nodejs'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface IndustryBreakdown {
  vertical: string
  count: number
  avg_score: number
}

interface TopBusiness {
  rank: number
  name: string
  domain: string | null
  score: number
  tier: string
  vertical: string | null
}

// ---------------------------------------------------------------------------
// Dimension name mapping (for backward-compat with old 5-category system)
// ---------------------------------------------------------------------------

const DIMENSION_LABELS: Record<string, string> = {
  machine_readable_profile: 'Machine-Readable Profile',
  mcp_api_endpoints: 'MCP & API Endpoints',
  agent_native_onboarding: 'Agent-Native Onboarding',
  structured_pricing: 'Structured Pricing',
  agent_payment_acceptance: 'Agent Payment Acceptance',
}

// ---------------------------------------------------------------------------
// GET /api/v1/report — State of Agent Readiness Report
// ---------------------------------------------------------------------------

/**
 * Generates a comprehensive "State of Agent Readiness" report from real
 * Supabase data. All stats are computed dynamically.
 */
export async function GET() {
  try {
    const db = getServiceClient()
    const now = new Date()
    const thirtyDaysAgo = new Date(
      now.getTime() - 30 * 24 * 60 * 60 * 1000
    ).toISOString()

    // -----------------------------------------------------------------------
    // 1. Fetch all businesses
    // -----------------------------------------------------------------------
    const { data: bizRaw, error: bizError } = await db
      .from('businesses')
      .select(
        'id, name, domain, audit_score, audit_tier, vertical, created_at, updated_at'
      )
      .order('audit_score', { ascending: false })

    if (bizError) {
      console.error('[report] Businesses fetch error:', bizError.message)
      return NextResponse.json(
        { error: 'Failed to fetch business data' },
        { status: 500 }
      )
    }

    const businesses = (bizRaw || []) as Record<string, any>[]

    if (businesses.length === 0) {
      return NextResponse.json({
        report_title: 'State of Agent Readiness -- Q1 2026',
        generated_at: now.toISOString(),
        summary: {
          total_businesses_scanned: 0,
          avg_score: 0,
          median_score: 0,
          businesses_by_tier: {
            platinum: 0,
            gold: 0,
            silver: 0,
            bronze: 0,
            unaudited: 0,
          },
          top_dimension: 'N/A',
          weakest_dimension: 'N/A',
        },
        dimension_averages: {},
        industry_breakdown: [],
        top_10_businesses: [],
        trends: {
          new_businesses_30d: 0,
          avg_score_change_30d: 0,
          certifications_issued: 0,
        },
        key_findings: ['No businesses have been scanned yet.'],
      })
    }

    // -----------------------------------------------------------------------
    // 2. Compute summary stats
    // -----------------------------------------------------------------------
    const scores = businesses.map((b) => (b.audit_score as number) ?? 0)
    const totalScanned = businesses.length
    const avgScore = Math.round(
      scores.reduce((a, b) => a + b, 0) / totalScanned
    )

    // Median
    const sorted = [...scores].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    const medianScore =
      sorted.length % 2 !== 0
        ? sorted[mid]
        : Math.round((sorted[mid - 1] + sorted[mid]) / 2)

    // Tier counts
    const tierCounts = {
      platinum: 0,
      gold: 0,
      silver: 0,
      bronze: 0,
      unaudited: 0,
    }
    for (const biz of businesses) {
      const tier = (biz.audit_tier as string) || 'unaudited'
      if (tier in tierCounts) {
        tierCounts[tier as keyof typeof tierCounts]++
      } else {
        tierCounts.unaudited++
      }
    }

    // -----------------------------------------------------------------------
    // 3. Fetch audit_results for dimension averages
    // -----------------------------------------------------------------------
    const { data: auditRaw, error: auditError } = await db
      .from('audit_results')
      .select('business_id, category, score, max_score')

    if (auditError) {
      console.error('[report] Audit results fetch error:', auditError.message)
    }

    const audits = (auditRaw || []) as Record<string, any>[]

    // Group by category, compute average score
    const categoryScores: Record<string, { total: number; count: number }> = {}
    for (const audit of audits) {
      const cat = audit.category as string
      if (!categoryScores[cat]) {
        categoryScores[cat] = { total: 0, count: 0 }
      }
      categoryScores[cat].total += (audit.score as number) ?? 0
      categoryScores[cat].count++
    }

    const dimensionAverages: Record<string, number> = {}
    for (const [cat, data] of Object.entries(categoryScores)) {
      dimensionAverages[cat] =
        data.count > 0
          ? parseFloat((data.total / data.count).toFixed(1))
          : 0
    }

    // Find strongest and weakest dimensions
    const dimEntries = Object.entries(dimensionAverages)
    let topDimension = 'N/A'
    let weakestDimension = 'N/A'

    if (dimEntries.length > 0) {
      const sortedDims = [...dimEntries].sort(([, a], [, b]) => b - a)
      topDimension =
        DIMENSION_LABELS[sortedDims[0][0]] || sortedDims[0][0]
      weakestDimension =
        DIMENSION_LABELS[sortedDims[sortedDims.length - 1][0]] ||
        sortedDims[sortedDims.length - 1][0]
    }

    // -----------------------------------------------------------------------
    // 4. Industry breakdown
    // -----------------------------------------------------------------------
    const verticalGroups: Record<
      string,
      { count: number; totalScore: number }
    > = {}
    for (const biz of businesses) {
      const v = (biz.vertical as string) || 'unknown'
      if (!verticalGroups[v]) {
        verticalGroups[v] = { count: 0, totalScore: 0 }
      }
      verticalGroups[v].count++
      verticalGroups[v].totalScore += (biz.audit_score as number) ?? 0
    }

    const industryBreakdown: IndustryBreakdown[] = Object.entries(
      verticalGroups
    )
      .map(([vertical, data]) => ({
        vertical,
        count: data.count,
        avg_score: Math.round(data.totalScore / data.count),
      }))
      .sort((a, b) => b.avg_score - a.avg_score)

    // -----------------------------------------------------------------------
    // 5. Top 10 businesses
    // -----------------------------------------------------------------------
    const top10: TopBusiness[] = businesses.slice(0, 10).map((biz, i) => ({
      rank: i + 1,
      name: biz.name as string,
      domain: (biz.domain as string) ?? null,
      score: (biz.audit_score as number) ?? 0,
      tier: (biz.audit_tier as string) ?? 'unaudited',
      vertical: (biz.vertical as string) ?? null,
    }))

    // -----------------------------------------------------------------------
    // 6. Trends (30-day)
    // -----------------------------------------------------------------------
    const newBusinesses30d = businesses.filter(
      (b) => b.created_at && b.created_at >= thirtyDaysAgo
    ).length

    // Certifications issued (gold + platinum)
    const certificationsIssued = tierCounts.gold + tierCounts.platinum

    // Average score change: compare current avg to what was stored ~30d ago
    // Since we don't have historical snapshots, we approximate from monitoring_events
    let avgScoreChange30d = 0
    const { data: scoreChanges } = await db
      .from('monitoring_events')
      .select('details')
      .eq('event_type', 'score_change')
      .gte('created_at', thirtyDaysAgo)

    if (scoreChanges && scoreChanges.length > 0) {
      const totalDelta = scoreChanges.reduce((sum, ev) => {
        const details = (ev as any).details as Record<string, unknown>
        return sum + ((details.score_delta as number) ?? 0)
      }, 0)
      avgScoreChange30d = parseFloat(
        (totalDelta / scoreChanges.length).toFixed(1)
      )
    }

    // -----------------------------------------------------------------------
    // 7. Generate key findings dynamically
    // -----------------------------------------------------------------------
    const keyFindings: string[] = []

    // Agent Card adoption
    const agentCardDimAvg = dimensionAverages['machine_readable_profile']
    if (agentCardDimAvg !== undefined) {
      const pctWithAgentCard =
        agentCardDimAvg > 0
          ? Math.round(
              (businesses.filter(
                (b) => b.audit_score > 0
              ).length /
                totalScanned) *
                (agentCardDimAvg / 20) *
                100
            )
          : 0
      if (pctWithAgentCard < 50) {
        keyFindings.push(
          `Only ${pctWithAgentCard}% of businesses have a strong machine-readable profile (agent card + llms.txt).`
        )
      }
    }

    // Onboarding weakness
    const onboardingAvg = dimensionAverages['agent_native_onboarding']
    if (onboardingAvg !== undefined && onboardingAvg < 10) {
      keyFindings.push(
        `Average onboarding score is ${onboardingAvg}/20 -- most businesses require human signup and lack programmatic API key generation.`
      )
    }

    // Security strength
    const paymentAvg = dimensionAverages['agent_payment_acceptance']
    if (paymentAvg !== undefined) {
      keyFindings.push(
        `Agent payment acceptance averages ${paymentAvg}/20 -- ${paymentAvg >= 10 ? 'decent but room for improvement' : 'most businesses lack programmatic payment flows'}.`
      )
    }

    // Tier distribution
    const pctBronzeOrBelow = Math.round(
      ((tierCounts.bronze + tierCounts.unaudited) / totalScanned) * 100
    )
    if (pctBronzeOrBelow > 50) {
      keyFindings.push(
        `${pctBronzeOrBelow}% of scanned businesses score Bronze or below, indicating the majority are not yet agent-ready.`
      )
    }

    // API/MCP
    const mcpAvg = dimensionAverages['mcp_api_endpoints']
    if (mcpAvg !== undefined && mcpAvg < 10) {
      keyFindings.push(
        `MCP & API endpoint scores average ${mcpAvg}/20 -- most businesses lack discoverable MCP servers or OpenAPI specs.`
      )
    }

    // Growth
    if (newBusinesses30d > 0) {
      keyFindings.push(
        `${newBusinesses30d} new businesses were scanned in the last 30 days.`
      )
    }

    // Fallback if no findings
    if (keyFindings.length === 0) {
      keyFindings.push(
        'Scan more businesses to generate statistically meaningful insights.'
      )
    }

    // -----------------------------------------------------------------------
    // 8. Build the report
    // -----------------------------------------------------------------------
    const quarter = `Q${Math.ceil((now.getMonth() + 1) / 3)}`
    const year = now.getFullYear()

    const report = {
      report_title: `State of Agent Readiness -- ${quarter} ${year}`,
      generated_at: now.toISOString(),
      summary: {
        total_businesses_scanned: totalScanned,
        avg_score: avgScore,
        median_score: medianScore,
        businesses_by_tier: tierCounts,
        top_dimension: topDimension,
        weakest_dimension: weakestDimension,
      },
      dimension_averages: dimensionAverages,
      industry_breakdown: industryBreakdown,
      top_10_businesses: top10,
      trends: {
        new_businesses_30d: newBusinesses30d,
        avg_score_change_30d: avgScoreChange30d,
        certifications_issued: certificationsIssued,
      },
      key_findings: keyFindings,
    }

    return NextResponse.json(report)
  } catch (err: unknown) {
    console.error(
      '[report] Error:',
      err instanceof Error ? err.message : err
    )
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
