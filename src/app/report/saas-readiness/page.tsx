import Link from 'next/link'
import { getServiceClient } from '@/lib/supabase'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Trophy,
  AlertTriangle,
  ArrowRight,
  FileText,
  Globe,
  Code2,
  Layers,
  Shield,
  Zap,
} from 'lucide-react'

export const revalidate = 3600

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Domains/name fragments that identify SaaS/tech businesses */
const SAAS_DOMAINS = [
  'stripe.com',
  'github.com',
  'openai.com',
  'vercel.com',
  'supabase.com',
  'twilio.com',
  'sendgrid.com',
  'slack.com',
  'notion.so',
  'linear.app',
  'figma.com',
  'netlify.com',
  'cloudflare.com',
  'datadog.com',
  'mongodb.com',
  'postman.com',
  'algolia.com',
  'auth0.com',
  'sentry.io',
  'hashicorp.com',
  'gitlab.com',
  'bitbucket.org',
  'digitalocean.com',
  'heroku.com',
  'fly.io',
  'render.com',
  'railway.app',
  'planetscale.com',
  'neon.tech',
  'clerk.com',
  'resend.com',
  'livekit.io',
  'deepgram.com',
  'anthropic.com',
  'cohere.com',
  'replicate.com',
  'huggingface.co',
  'mistral.ai',
  'groq.com',
  'together.ai',
  'zapier.com',
  'airtable.com',
  'hubspot.com',
  'intercom.com',
  'segment.com',
  'amplitude.com',
  'mixpanel.com',
  'launchdarkly.com',
  'contentful.com',
  'sanity.io',
  'prisma.io',
  'upstash.com',
]

const SAAS_VERTICALS = ['saas', 'software', 'api', 'devtools', 'developer-tools']

const DIMENSION_LABELS: Record<string, string> = {
  D1: 'Discoverability',
  D2: 'API Quality',
  D3: 'Onboarding',
  D4: 'Pricing Transparency',
  D5: 'Payment Acceptance',
  D6: 'Data Quality',
  D7: 'Security',
  D8: 'Reliability',
  D9: 'Agent Experience',
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SaaSBusiness {
  name: string
  slug: string | null
  domain: string | null
  score: number
  tier: string
  vertical: string | null
}

interface DimensionAvg {
  dimension: string
  label: string
  avg: number
}

interface ReportData {
  businesses: SaaSBusiness[]
  totalCount: number
  avgScore: number
  medianScore: number
  bestBiz: SaaSBusiness | null
  worstBiz: SaaSBusiness | null
  tierCounts: Record<string, number>
  dimensions: DimensionAvg[]
  globalAvg: number
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function fetchSaaSReport(): Promise<ReportData> {
  const db = getServiceClient()

  // Fetch all businesses
  const { data: allBizRaw } = await db
    .from('businesses')
    .select('id, name, slug, domain, audit_score, audit_tier, vertical')
    .order('audit_score', { ascending: false })

  const allBiz = (allBizRaw || []) as Record<string, any>[]

  // Compute global average for comparison
  const allScores = allBiz
    .map((b) => (b.audit_score as number) ?? 0)
    .filter((s) => s > 0)
  const globalAvg =
    allScores.length > 0
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : 0

  // Filter to SaaS businesses: match by vertical OR domain
  const saasSet = new Set<string>()
  const saasBiz: SaaSBusiness[] = []

  for (const biz of allBiz) {
    const domain = (biz.domain as string) || ''
    const vertical = ((biz.vertical as string) || '').toLowerCase()
    const id = biz.id as string

    const isSaaS =
      SAAS_VERTICALS.includes(vertical) ||
      SAAS_DOMAINS.some((d) => domain.includes(d))

    if (isSaaS && !saasSet.has(id)) {
      saasSet.add(id)
      saasBiz.push({
        name: biz.name as string,
        slug: (biz.slug as string) ?? null,
        domain: (biz.domain as string) ?? null,
        score: (biz.audit_score as number) ?? 0,
        tier: (biz.audit_tier as string) ?? 'unaudited',
        vertical: (biz.vertical as string) ?? null,
      })
    }
  }

  // Sort by score descending
  saasBiz.sort((a, b) => b.score - a.score)

  const totalCount = saasBiz.length
  const scores = saasBiz.map((b) => b.score)
  const avgScore =
    totalCount > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / totalCount)
      : 0

  const sorted = [...scores].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  const medianScore =
    sorted.length === 0
      ? 0
      : sorted.length % 2 !== 0
        ? sorted[mid]
        : Math.round((sorted[mid - 1] + sorted[mid]) / 2)

  const bestBiz = saasBiz[0] ?? null
  const worstBiz = saasBiz.length > 1 ? saasBiz[saasBiz.length - 1] : null

  // Tier counts
  const tierCounts: Record<string, number> = {
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    unaudited: 0,
  }
  for (const biz of saasBiz) {
    const tier = biz.tier || 'unaudited'
    tierCounts[tier] = (tierCounts[tier] ?? 0) + 1
  }

  // Dimension averages from scan_results for SaaS domains
  const saasDomains = saasBiz
    .map((b) => b.domain)
    .filter((d): d is string => d !== null)

  const dimensions: DimensionAvg[] = []

  if (saasDomains.length > 0) {
    const { data: scanRaw } = await db
      .from('scan_results')
      .select('domain, dimensions')
      .in('domain', saasDomains)

    const scans = (scanRaw || []) as Record<string, any>[]
    const dimAccum: Record<string, { total: number; count: number }> = {}

    for (const scan of scans) {
      const dims = scan.dimensions as
        | { dimension: string; score: number }[]
        | null
      if (!Array.isArray(dims)) continue
      for (const d of dims) {
        if (!dimAccum[d.dimension]) dimAccum[d.dimension] = { total: 0, count: 0 }
        dimAccum[d.dimension].total += d.score
        dimAccum[d.dimension].count++
      }
    }

    for (const [key, val] of Object.entries(dimAccum)) {
      dimensions.push({
        dimension: key,
        label: DIMENSION_LABELS[key] || key,
        avg: val.count > 0 ? Math.round(val.total / val.count) : 0,
      })
    }

    dimensions.sort((a, b) => b.avg - a.avg)
  }

  return {
    businesses: saasBiz,
    totalCount,
    avgScore,
    medianScore,
    bestBiz,
    worstBiz,
    tierCounts,
    dimensions,
    globalAvg,
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
// Page
// ---------------------------------------------------------------------------

export default async function SaaSReadinessPage() {
  let data: ReportData

  try {
    data = await fetchSaaSReport()
  } catch {
    data = {
      businesses: [],
      totalCount: 0,
      avgScore: 0,
      medianScore: 0,
      bestBiz: null,
      worstBiz: null,
      tierCounts: { platinum: 0, gold: 0, silver: 0, bronze: 0, unaudited: 0 },
      dimensions: [],
      globalAvg: 0,
    }
  }

  const {
    businesses,
    totalCount,
    avgScore,
    medianScore,
    bestBiz,
    worstBiz,
    tierCounts,
    dimensions,
    globalAvg,
  } = data

  const top10 = businesses.slice(0, 10)
  const scoreDelta = avgScore - globalAvg
  const bestDim = dimensions[0]
  const worstDim = dimensions.length > 0 ? dimensions[dimensions.length - 1] : null

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
              Q1 2026 Industry Report
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
              SaaS{' '}
              <span className="text-emerald-500">Agent Readiness</span>
              <br />
              <span className="text-zinc-400 text-2xl sm:text-3xl lg:text-4xl">
                Q1 2026
              </span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-4">
              {totalCount > 0 ? (
                <>
                  SaaS platforms average{' '}
                  <span className="text-zinc-200 font-semibold">
                    {avgScore}/100
                  </span>
                  {' -- '}
                  {scoreDelta > 0
                    ? `${scoreDelta} points above the global average but still below Silver tier.`
                    : scoreDelta === 0
                      ? 'matching the global average. API-first companies should lead, not follow.'
                      : `surprisingly ${Math.abs(scoreDelta)} points below the global average.`}
                </>
              ) : (
                'Industry data will populate as SaaS businesses are scanned.'
              )}
            </p>

            <p className="text-sm text-zinc-600 max-w-xl mx-auto">
              Based on {totalCount} SaaS and developer tool platforms scanned
              across {dimensions.length} dimensions of agent readiness.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="SaaS Average"
              value={`${avgScore}/100`}
              icon={<BarChart3 className="h-5 w-5 text-emerald-500" />}
              subtext={`Global avg: ${globalAvg} | Median: ${medianScore}`}
            />
            <StatCard
              label="SaaS Scanned"
              value={String(totalCount)}
              icon={<Code2 className="h-5 w-5 text-blue-500" />}
              subtext="Tech & developer platforms"
            />
            <StatCard
              label="Top SaaS"
              value={bestBiz ? String(bestBiz.score) : '--'}
              icon={<Trophy className="h-5 w-5 text-yellow-500" />}
              subtext={bestBiz?.name ?? 'N/A'}
            />
            <StatCard
              label="vs Global"
              value={
                scoreDelta > 0
                  ? `+${scoreDelta}`
                  : scoreDelta === 0
                    ? '0'
                    : String(scoreDelta)
              }
              icon={
                scoreDelta >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )
              }
              subtext="Points vs all industries"
            />
          </div>
        </div>
      </section>

      {/* ARL Distribution */}
      {totalCount > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="ARL Distribution"
              subtitle="How SaaS platforms distribute across Agent Readiness Levels"
            />

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
              {(['platinum', 'gold', 'silver', 'bronze', 'unaudited'] as const).map(
                (tier) => {
                  const count = tierCounts[tier] ?? 0
                  const pct =
                    totalCount > 0 ? Math.round((count / totalCount) * 100) : 0
                  return (
                    <div
                      key={tier}
                      className={`p-4 rounded-xl border ${tierBg(tier)} text-center`}
                    >
                      <div className={`text-2xl font-bold ${tierColor(tier)}`}>
                        {count}
                      </div>
                      <div className="text-xs text-zinc-400 capitalize mt-1">
                        {tier === 'unaudited' ? 'Not Scored' : tier}
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
                    const count = tierCounts[tier] ?? 0
                    const pct =
                      totalCount > 0 ? (count / totalCount) * 100 : 0
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
      )}

      {/* Dimension Breakdown */}
      {dimensions.length > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Dimension Breakdown"
              subtitle={
                bestDim && worstDim
                  ? `SaaS excels at ${bestDim.label} (${bestDim.avg}/100) but struggles with ${worstDim.label} (${worstDim.avg}/100)`
                  : 'Score breakdown by dimension'
              }
            />

            <div className="space-y-4 mt-8">
              {dimensions.map((dim) => {
                const pct = dim.avg
                return (
                  <div key={dim.dimension}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-zinc-200">
                        {dim.label}
                      </span>
                      <span className="text-sm font-mono text-zinc-400">
                        {dim.avg}/100
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

            {/* Insight callout */}
            <div className="mt-8 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-zinc-300 leading-relaxed">
                  <span className="font-semibold text-zinc-100">
                    The SaaS paradox:
                  </span>{' '}
                  SaaS companies build APIs for a living, yet most lack
                  agent-native protocols like MCP servers, agent cards, or
                  llms.txt. Strong API quality does not automatically translate
                  to agent readiness -- agents need structured discovery,
                  programmatic onboarding, and machine-readable pricing that
                  traditional REST APIs alone do not provide.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Common Gaps */}
      <section className="py-10 sm:py-14 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Common Gaps in SaaS"
            subtitle="Where API-first companies still fall short for agents"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: <Layers className="h-5 w-5 text-purple-400" />,
                title: 'Agent-Native Protocols',
                desc: 'Most SaaS platforms have REST APIs but lack MCP servers, agent cards, or llms.txt -- the protocols agents actually use to discover and interact with services.',
              },
              {
                icon: <Shield className="h-5 w-5 text-blue-400" />,
                title: 'Programmatic Onboarding',
                desc: 'OAuth flows and dashboard-based API key generation block agents. Few platforms offer fully programmatic account creation and credential provisioning.',
              },
              {
                icon: <Zap className="h-5 w-5 text-amber-400" />,
                title: 'Machine-Readable Pricing',
                desc: 'Pricing pages are designed for humans. Agents need structured, queryable pricing data to compare services and make purchasing decisions autonomously.',
              },
            ].map((gap) => (
              <div
                key={gap.title}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/60 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50 mb-4">
                  {gap.icon}
                </div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-2">
                  {gap.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {gap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top 10 SaaS Leaderboard */}
      {top10.length > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <SectionHeading
                title="Top 10 SaaS Leaderboard"
                subtitle="Highest-scoring SaaS platforms for agent readiness"
              />
              <Link
                href="/leaderboard"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                Full leaderboard
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {top10.map((biz, i) => {
                const rank = i + 1
                const inner = (
                  <>
                    <div className="flex-shrink-0 w-8 text-center">
                      {rank <= 3 ? (
                        <span className="text-lg font-bold text-emerald-500">
                          #{rank}
                        </span>
                      ) : (
                        <span className="text-sm font-mono text-zinc-500">
                          #{rank}
                        </span>
                      )}
                    </div>

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
                      </div>
                    </div>

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
                        {biz.tier === 'unaudited' ? 'Not Scored' : biz.tier}
                      </span>
                    </div>
                  </>
                )

                return biz.slug ? (
                  <Link
                    key={rank}
                    href={`/business/${biz.slug}`}
                    className="flex items-center gap-4 px-5 py-3.5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/60 transition-colors"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={rank}
                    className="flex items-center gap-4 px-5 py-3.5 rounded-xl bg-zinc-900/30 border border-zinc-800/50"
                  >
                    {inner}
                  </div>
                )
              })}
            </div>

            <div className="sm:hidden mt-4 text-center">
              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                Full leaderboard
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Is Your SaaS{' '}
            <span className="text-emerald-500">Agent-Ready</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-6 max-w-lg mx-auto">
            Free scan. 60 seconds. See exactly where your platform stands
            against these SaaS benchmarks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              Get Your Score Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/report/state-of-readiness"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors border border-zinc-700"
            >
              Full State of Readiness
              <BarChart3 className="h-4 w-4" />
            </Link>
          </div>
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
