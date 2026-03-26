import Link from 'next/link'
import { getServiceClient } from '@/lib/supabase'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Building2,
  ArrowRight,
  AlertTriangle,
  Award,
  Target,
  Globe,
  Zap,
  FileText,
} from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'State of Agent Readiness Report | AgentHermes',
  description:
    'The definitive report on how ready businesses are for the AI agent economy. Real data, real scores, real insights.',
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

const DIMENSION_LABELS: Record<string, string> = {
  machine_readable_profile: 'Machine-Readable Profile',
  mcp_api_endpoints: 'MCP & API Endpoints',
  agent_native_onboarding: 'Agent-Native Onboarding',
  structured_pricing: 'Structured Pricing',
  agent_payment_acceptance: 'Agent Payment Acceptance',
}

interface ReportData {
  report_title: string
  generated_at: string
  summary: {
    total_businesses_scanned: number
    avg_score: number
    median_score: number
    businesses_by_tier: Record<string, number>
    top_dimension: string
    weakest_dimension: string
  }
  dimension_averages: Record<string, number>
  industry_breakdown: { vertical: string; count: number; avg_score: number }[]
  top_10_businesses: {
    rank: number
    name: string
    slug: string | null
    domain: string | null
    score: number
    tier: string
    vertical: string | null
  }[]
  trends: {
    new_businesses_30d: number
    avg_score_change_30d: number
    certifications_issued: number
  }
  key_findings: string[]
}

async function fetchReport(): Promise<ReportData> {
  const db = getServiceClient()
  const now = new Date()
  const thirtyDaysAgo = new Date(
    now.getTime() - 30 * 24 * 60 * 60 * 1000
  ).toISOString()

  // Fetch all businesses
  const { data: bizRaw } = await db
    .from('businesses')
    .select(
      'id, name, slug, domain, audit_score, audit_tier, vertical, created_at, updated_at'
    )
    .order('audit_score', { ascending: false })

  const businesses = (bizRaw || []) as Record<string, any>[]

  if (businesses.length === 0) {
    const quarter = `Q${Math.ceil((now.getMonth() + 1) / 3)}`
    return {
      report_title: `State of Agent Readiness -- ${quarter} ${now.getFullYear()}`,
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
      key_findings: ['No businesses have been scanned yet. Be the first.'],
    }
  }

  const scores = businesses.map((b) => (b.audit_score as number) ?? 0)
  const totalScanned = businesses.length
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalScanned)

  const sorted = [...scores].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  const medianScore =
    sorted.length % 2 !== 0
      ? sorted[mid]
      : Math.round((sorted[mid - 1] + sorted[mid]) / 2)

  const tierCounts: Record<string, number> = {
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    unaudited: 0,
  }
  for (const biz of businesses) {
    const tier = (biz.audit_tier as string) || 'unaudited'
    tierCounts[tier] = (tierCounts[tier] ?? 0) + 1
  }

  // Audit results for dimension averages
  const { data: auditRaw } = await db
    .from('audit_results')
    .select('category, score')

  const audits = (auditRaw || []) as Record<string, any>[]
  const catScores: Record<string, { total: number; count: number }> = {}
  for (const a of audits) {
    const cat = a.category as string
    if (!catScores[cat]) catScores[cat] = { total: 0, count: 0 }
    catScores[cat].total += (a.score as number) ?? 0
    catScores[cat].count++
  }

  const dimensionAverages: Record<string, number> = {}
  for (const [cat, d] of Object.entries(catScores)) {
    dimensionAverages[cat] = d.count > 0 ? parseFloat((d.total / d.count).toFixed(1)) : 0
  }

  const dimEntries = Object.entries(dimensionAverages)
  let topDimension = 'N/A'
  let weakestDimension = 'N/A'
  if (dimEntries.length > 0) {
    const sortedDims = [...dimEntries].sort(([, a], [, b]) => b - a)
    topDimension = DIMENSION_LABELS[sortedDims[0][0]] || sortedDims[0][0]
    weakestDimension =
      DIMENSION_LABELS[sortedDims[sortedDims.length - 1][0]] ||
      sortedDims[sortedDims.length - 1][0]
  }

  // Industry breakdown
  const verticalGroups: Record<string, { count: number; totalScore: number }> = {}
  for (const biz of businesses) {
    const v = (biz.vertical as string) || 'unknown'
    if (!verticalGroups[v]) verticalGroups[v] = { count: 0, totalScore: 0 }
    verticalGroups[v].count++
    verticalGroups[v].totalScore += (biz.audit_score as number) ?? 0
  }

  const industryBreakdown = Object.entries(verticalGroups)
    .map(([vertical, d]) => ({
      vertical,
      count: d.count,
      avg_score: Math.round(d.totalScore / d.count),
    }))
    .sort((a, b) => b.avg_score - a.avg_score)

  // Top 10
  const top10 = businesses.slice(0, 10).map((biz, i) => ({
    rank: i + 1,
    name: biz.name as string,
    slug: (biz.slug as string) ?? null,
    domain: (biz.domain as string) ?? null,
    score: (biz.audit_score as number) ?? 0,
    tier: (biz.audit_tier as string) ?? 'unaudited',
    vertical: (biz.vertical as string) ?? null,
  }))

  // Trends
  const newBusinesses30d = businesses.filter(
    (b) => b.created_at && b.created_at >= thirtyDaysAgo
  ).length

  const certificationsIssued = (tierCounts.gold ?? 0) + (tierCounts.platinum ?? 0)

  let avgScoreChange30d = 0
  const { data: scoreChanges } = await db
    .from('monitoring_events')
    .select('details')
    .eq('event_type', 'score_change')
    .gte('created_at', thirtyDaysAgo)

  if (scoreChanges && scoreChanges.length > 0) {
    const totalDelta = scoreChanges.reduce((sum, ev) => {
      const det = (ev as any).details as Record<string, unknown>
      return sum + ((det.score_delta as number) ?? 0)
    }, 0)
    avgScoreChange30d = parseFloat((totalDelta / scoreChanges.length).toFixed(1))
  }

  // Key findings
  const keyFindings: string[] = []

  const onboardingAvg = dimensionAverages['agent_native_onboarding']
  if (onboardingAvg !== undefined && onboardingAvg < 10) {
    keyFindings.push(
      `Average onboarding score is ${onboardingAvg}/20 -- most businesses require human signup and lack programmatic API key generation.`
    )
  }

  const paymentAvg = dimensionAverages['agent_payment_acceptance']
  if (paymentAvg !== undefined) {
    keyFindings.push(
      `Agent payment acceptance averages ${paymentAvg}/20 -- ${paymentAvg >= 10 ? 'decent but room for improvement' : 'most businesses lack programmatic payment flows'}.`
    )
  }

  const pctBronzeOrBelow = Math.round(
    ((tierCounts.bronze + tierCounts.unaudited) / totalScanned) * 100
  )
  if (pctBronzeOrBelow > 50) {
    keyFindings.push(
      `${pctBronzeOrBelow}% of scanned businesses score Bronze or below, indicating the majority are not yet agent-ready.`
    )
  }

  const mcpAvg = dimensionAverages['mcp_api_endpoints']
  if (mcpAvg !== undefined && mcpAvg < 10) {
    keyFindings.push(
      `MCP & API endpoint scores average ${mcpAvg}/20 -- most businesses lack discoverable MCP servers or OpenAPI specs.`
    )
  }

  if (newBusinesses30d > 0) {
    keyFindings.push(`${newBusinesses30d} new businesses were scanned in the last 30 days.`)
  }

  if (keyFindings.length === 0) {
    keyFindings.push('Scan more businesses to generate statistically meaningful insights.')
  }

  const quarter = `Q${Math.ceil((now.getMonth() + 1) / 3)}`

  return {
    report_title: `State of Agent Readiness -- ${quarter} ${now.getFullYear()}`,
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
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function tierColor(tier: string): string {
  switch (tier) {
    case 'platinum':
      return 'text-emerald-400'
    case 'gold':
      return 'text-yellow-500'
    case 'silver':
      return 'text-zinc-300'
    case 'bronze':
      return 'text-amber-500'
    default:
      return 'text-zinc-500'
  }
}

function tierBg(tier: string): string {
  switch (tier) {
    case 'platinum':
      return 'bg-emerald-500/10 border-emerald-500/20'
    case 'gold':
      return 'bg-yellow-500/10 border-yellow-500/20'
    case 'silver':
      return 'bg-zinc-400/10 border-zinc-400/20'
    case 'bronze':
      return 'bg-amber-500/10 border-amber-500/20'
    default:
      return 'bg-zinc-800 border-zinc-700'
  }
}

function scoreBarColor(score: number): string {
  if (score >= 90) return 'bg-emerald-500'
  if (score >= 75) return 'bg-yellow-500'
  if (score >= 60) return 'bg-zinc-400'
  if (score >= 40) return 'bg-amber-500'
  return 'bg-red-500'
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function ReportPage() {
  let report: ReportData

  try {
    report = await fetchReport()
  } catch {
    report = {
      report_title: 'State of Agent Readiness',
      generated_at: new Date().toISOString(),
      summary: {
        total_businesses_scanned: 0,
        avg_score: 0,
        median_score: 0,
        businesses_by_tier: { platinum: 0, gold: 0, silver: 0, bronze: 0, unaudited: 0 },
        top_dimension: 'N/A',
        weakest_dimension: 'N/A',
      },
      dimension_averages: {},
      industry_breakdown: [],
      top_10_businesses: [],
      trends: { new_businesses_30d: 0, avg_score_change_30d: 0, certifications_issued: 0 },
      key_findings: ['Unable to load report data. Please try again later.'],
    }
  }

  const { summary, dimension_averages, industry_breakdown, top_10_businesses, trends, key_findings } = report
  const generatedDate = new Date(report.generated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
              <FileText className="h-3.5 w-3.5" />
              Published {generatedDate}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
              State of{' '}
              <span className="text-emerald-500">Agent Readiness</span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10">
              A data-driven snapshot of how prepared businesses are for AI agent
              commerce. Based on {summary.total_businesses_scanned} real scans across
              the AgentHermes network.
            </p>
          </div>
        </div>
      </section>

      {/* Headline Stats */}
      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Businesses Scanned"
              value={String(summary.total_businesses_scanned)}
              icon={<Building2 className="h-5 w-5 text-emerald-500" />}
            />
            <StatCard
              label="Average Score"
              value={`${summary.avg_score}/100`}
              icon={<BarChart3 className="h-5 w-5 text-emerald-500" />}
              subtext={`Median: ${summary.median_score}`}
            />
            <StatCard
              label="Certifications Issued"
              value={String(trends.certifications_issued)}
              icon={<Award className="h-5 w-5 text-emerald-500" />}
              subtext="Gold + Platinum"
            />
            <StatCard
              label="New Scans (30d)"
              value={String(trends.new_businesses_30d)}
              icon={<TrendingUp className="h-5 w-5 text-emerald-500" />}
              subtext={
                trends.avg_score_change_30d !== 0
                  ? `Avg change: ${trends.avg_score_change_30d > 0 ? '+' : ''}${trends.avg_score_change_30d}`
                  : undefined
              }
            />
          </div>
        </div>
      </section>

      {/* Tier Distribution */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Tier Distribution"
            subtitle="How businesses are distributed across readiness tiers"
          />

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
            {(['platinum', 'gold', 'silver', 'bronze', 'unaudited'] as const).map(
              (tier) => {
                const count = summary.businesses_by_tier[tier] ?? 0
                const pct =
                  summary.total_businesses_scanned > 0
                    ? Math.round((count / summary.total_businesses_scanned) * 100)
                    : 0
                return (
                  <div
                    key={tier}
                    className={`p-4 rounded-xl border ${tierBg(tier)} text-center`}
                  >
                    <div className={`text-2xl font-bold ${tierColor(tier)}`}>
                      {count}
                    </div>
                    <div className="text-xs text-zinc-400 capitalize mt-1">
                      {tier}
                    </div>
                    <div className="text-[10px] text-zinc-600 mt-0.5">
                      {pct}%
                    </div>
                  </div>
                )
              }
            )}
          </div>

          {/* Visual bar */}
          <div className="mt-6">
            <div className="h-3 rounded-full overflow-hidden flex bg-zinc-900">
              {(['platinum', 'gold', 'silver', 'bronze', 'unaudited'] as const).map(
                (tier) => {
                  const count = summary.businesses_by_tier[tier] ?? 0
                  const pct =
                    summary.total_businesses_scanned > 0
                      ? (count / summary.total_businesses_scanned) * 100
                      : 0
                  if (pct === 0) return null
                  const colors: Record<string, string> = {
                    platinum: 'bg-emerald-500',
                    gold: 'bg-yellow-500',
                    silver: 'bg-zinc-400',
                    bronze: 'bg-amber-600',
                    unaudited: 'bg-zinc-700',
                  }
                  return (
                    <div
                      key={tier}
                      className={`${colors[tier]} transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  )
                }
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dimension Scores */}
      {Object.keys(dimension_averages).length > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Dimension Scores"
              subtitle={`Strongest: ${summary.top_dimension} | Weakest: ${summary.weakest_dimension}`}
            />

            <div className="space-y-4 mt-8">
              {Object.entries(dimension_averages)
                .sort(([, a], [, b]) => b - a)
                .map(([key, avg]) => {
                  const label = DIMENSION_LABELS[key] || key
                  const pct = Math.round((avg / 20) * 100)
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-zinc-200">
                          {label}
                        </span>
                        <span className="text-sm font-mono text-zinc-400">
                          {avg}/20
                        </span>
                      </div>
                      <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${scoreBarColor(pct)} transition-all`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </section>
      )}

      {/* Key Findings */}
      <section className="py-10 sm:py-14 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Key Findings"
            subtitle="Insights generated from real scan data"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {key_findings.map((finding, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {finding}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Breakdown */}
      {industry_breakdown.length > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Industry Breakdown"
              subtitle="Agent readiness by vertical"
            />

            <div className="mt-8 rounded-xl border border-zinc-800/80 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_5rem_6rem] gap-4 px-5 py-3 bg-zinc-900/80 text-[10px] font-medium text-zinc-500 uppercase tracking-wider border-b border-zinc-800/50">
                <span>Industry</span>
                <span className="text-center">Count</span>
                <span className="text-right">Avg Score</span>
              </div>

              {/* Rows */}
              {industry_breakdown.map((row) => (
                <Link
                  key={row.vertical}
                  href={`/discover?vertical=${row.vertical}`}
                  className="grid grid-cols-[1fr_5rem_6rem] gap-4 px-5 py-3 border-b border-zinc-800/30 last:border-b-0 hover:bg-zinc-800/20 transition-colors"
                >
                  <span className="text-sm text-zinc-200 capitalize">
                    {row.vertical.replace(/-/g, ' ')}
                  </span>
                  <span className="text-sm text-zinc-400 text-center font-mono">
                    {row.count}
                  </span>
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${scoreBarColor(row.avg_score)}`}
                        style={{ width: `${row.avg_score}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono text-zinc-300 w-8 text-right">
                      {row.avg_score}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top 10 */}
      {top_10_businesses.length > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Top 10 Agent-Ready Businesses"
              subtitle="Highest scoring businesses in the network"
            />

            <div className="space-y-2 mt-8">
              {top_10_businesses.map((biz) => {
                const inner = (
                  <>
                    {/* Rank */}
                    <div className="flex-shrink-0 w-8 text-center">
                      {biz.rank <= 3 ? (
                        <span className="text-lg font-bold text-emerald-500">
                          #{biz.rank}
                        </span>
                      ) : (
                        <span className="text-sm font-mono text-zinc-500">
                          #{biz.rank}
                        </span>
                      )}
                    </div>

                    {/* Business info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-zinc-100 truncate">
                        {biz.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        {biz.domain && (
                          <div className="flex items-center gap-1">
                            <Globe className="h-3 w-3 text-zinc-600" />
                            <span className="text-xs text-zinc-500 truncate">
                              {biz.domain}
                            </span>
                          </div>
                        )}
                        {biz.vertical && (
                          <span className="text-[10px] font-medium text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded">
                            {biz.vertical}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="w-20 h-2 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${scoreBarColor(biz.score)}`}
                          style={{ width: `${biz.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold font-mono text-zinc-200 w-8 text-right">
                        {biz.score}
                      </span>
                      <span
                        className={`text-xs font-medium capitalize ${tierColor(biz.tier)}`}
                      >
                        {biz.tier}
                      </span>
                    </div>
                  </>
                )

                return biz.slug ? (
                  <Link
                    key={biz.rank}
                    href={`/business/${biz.slug}`}
                    className="flex items-center gap-4 px-5 py-3.5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/60 transition-colors"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={biz.rank}
                    className="flex items-center gap-4 px-5 py-3.5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/60 transition-colors"
                  >
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Check Your{' '}
            <span className="text-emerald-500">Agent Readiness</span> Score
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            Free. 60 seconds. See exactly where you stand compared to
            these benchmarks.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
          >
            Get Your Score Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  icon,
  subtext,
}: {
  label: string
  value: string
  icon: React.ReactNode
  subtext?: string
}) {
  return (
    <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50">
          {icon}
        </div>
      </div>
      <div className="text-2xl sm:text-3xl font-bold tracking-tight">
        {value}
      </div>
      <div className="text-xs text-zinc-500 font-medium mt-1">{label}</div>
      {subtext && (
        <div className="text-[10px] text-zinc-600 mt-0.5">{subtext}</div>
      )}
    </div>
  )
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-zinc-500 mt-1">{subtitle}</p>
    </div>
  )
}
