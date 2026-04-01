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
  Building2,
  Brain,
  Lock,
  Cpu,
} from 'lucide-react'

export const revalidate = 3600

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Domains/name fragments that identify enterprise/Big Tech businesses */
const ENTERPRISE_DOMAINS = [
  'microsoft.com',
  'google.com',
  'apple.com',
  'amazon.com',
  'meta.com',
  'facebook.com',
  'oracle.com',
  'ibm.com',
  'salesforce.com',
  'adobe.com',
  'sap.com',
  'cisco.com',
  'intel.com',
  'nvidia.com',
  'dell.com',
  'hp.com',
  'vmware.com',
  'servicenow.com',
  'workday.com',
  'snowflake.com',
  'palantir.com',
  'databricks.com',
  'elastic.co',
  'confluent.io',
  'crowdstrike.com',
  'paloaltonetworks.com',
  'fortinet.com',
  'zscaler.com',
  'okta.com',
  'splunk.com',
  'atlassian.com',
  'twilio.com',
  'zoom.us',
  'slack.com',
  'dropbox.com',
  'box.com',
  'zendesk.com',
  'hubspot.com',
  'openai.com',
  'anthropic.com',
  'cohere.com',
  'stability.ai',
  'databricks.com',
]

const ENTERPRISE_VERTICALS = ['enterprise', 'big-tech', 'technology']

/** Companies that are actively building AI products */
const AI_BUILDERS = [
  'openai.com',
  'anthropic.com',
  'google.com',
  'microsoft.com',
  'meta.com',
  'nvidia.com',
  'cohere.com',
  'stability.ai',
  'databricks.com',
  'palantir.com',
  'ibm.com',
  'salesforce.com',
  'adobe.com',
  'amazon.com',
  'apple.com',
]

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

interface EnterpriseBusiness {
  name: string
  slug: string | null
  domain: string | null
  score: number
  tier: string
  vertical: string | null
  isAIBuilder: boolean
}

interface DimensionAvg {
  dimension: string
  label: string
  avg: number
}

interface ReportData {
  businesses: EnterpriseBusiness[]
  totalCount: number
  avgScore: number
  medianScore: number
  bestBiz: EnterpriseBusiness | null
  worstBiz: EnterpriseBusiness | null
  tierCounts: Record<string, number>
  dimensions: DimensionAvg[]
  globalAvg: number
  aiBuilderAvg: number
  nonAIBuilderAvg: number
  aiBuilderCount: number
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function fetchEnterpriseReport(): Promise<ReportData> {
  const db = getServiceClient()

  const { data: allBizRaw } = await db
    .from('businesses')
    .select('id, name, slug, domain, audit_score, audit_tier, vertical')
    .order('audit_score', { ascending: false })

  const allBiz = (allBizRaw || []) as Record<string, any>[]

  // Global avg
  const allScores = allBiz
    .map((b) => (b.audit_score as number) ?? 0)
    .filter((s) => s > 0)
  const globalAvg =
    allScores.length > 0
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : 0

  // Filter enterprise businesses
  const entSet = new Set<string>()
  const entBiz: EnterpriseBusiness[] = []

  for (const biz of allBiz) {
    const domain = (biz.domain as string) || ''
    const vertical = ((biz.vertical as string) || '').toLowerCase()
    const id = biz.id as string

    const isEnterprise =
      ENTERPRISE_VERTICALS.includes(vertical) ||
      ENTERPRISE_DOMAINS.some((d) => domain.includes(d))

    if (isEnterprise && !entSet.has(id)) {
      entSet.add(id)
      entBiz.push({
        name: biz.name as string,
        slug: (biz.slug as string) ?? null,
        domain: (biz.domain as string) ?? null,
        score: (biz.audit_score as number) ?? 0,
        tier: (biz.audit_tier as string) ?? 'unaudited',
        vertical: (biz.vertical as string) ?? null,
        isAIBuilder: AI_BUILDERS.some((d) => domain.includes(d)),
      })
    }
  }

  entBiz.sort((a, b) => b.score - a.score)

  const totalCount = entBiz.length
  const scores = entBiz.map((b) => b.score)
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

  const bestBiz = entBiz[0] ?? null
  const worstBiz = entBiz.length > 1 ? entBiz[entBiz.length - 1] : null

  // Tier counts
  const tierCounts: Record<string, number> = {
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    unaudited: 0,
  }
  for (const biz of entBiz) {
    const tier = biz.tier || 'unaudited'
    tierCounts[tier] = (tierCounts[tier] ?? 0) + 1
  }

  // AI Builder paradox stats
  const aiBuilders = entBiz.filter((b) => b.isAIBuilder)
  const nonAIBuilders = entBiz.filter((b) => !b.isAIBuilder)

  const aiBuilderAvg =
    aiBuilders.length > 0
      ? Math.round(
          aiBuilders.reduce((a, b) => a + b.score, 0) / aiBuilders.length
        )
      : 0

  const nonAIBuilderAvg =
    nonAIBuilders.length > 0
      ? Math.round(
          nonAIBuilders.reduce((a, b) => a + b.score, 0) /
            nonAIBuilders.length
        )
      : 0

  // Dimension averages
  const entDomains = entBiz
    .map((b) => b.domain)
    .filter((d): d is string => d !== null)

  const dimensions: DimensionAvg[] = []

  if (entDomains.length > 0) {
    const { data: scanRaw } = await db
      .from('scan_results')
      .select('domain, dimensions')
      .in('domain', entDomains)

    const scans = (scanRaw || []) as Record<string, any>[]
    const dimAccum: Record<string, { total: number; count: number }> = {}

    for (const scan of scans) {
      const dims = scan.dimensions as
        | { dimension: string; score: number }[]
        | null
      if (!Array.isArray(dims)) continue
      for (const d of dims) {
        if (!dimAccum[d.dimension])
          dimAccum[d.dimension] = { total: 0, count: 0 }
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
    businesses: entBiz,
    totalCount,
    avgScore,
    medianScore,
    bestBiz,
    worstBiz,
    tierCounts,
    dimensions,
    globalAvg,
    aiBuilderAvg,
    nonAIBuilderAvg,
    aiBuilderCount: aiBuilders.length,
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

export default async function EnterpriseReadinessPage() {
  let data: ReportData

  try {
    data = await fetchEnterpriseReport()
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
      aiBuilderAvg: 0,
      nonAIBuilderAvg: 0,
      aiBuilderCount: 0,
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
    aiBuilderAvg,
    nonAIBuilderAvg,
    aiBuilderCount,
  } = data

  const top10 = businesses.slice(0, 10)
  const scoreDelta = avgScore - globalAvg
  const aiGap = aiBuilderAvg - nonAIBuilderAvg
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
              Enterprise{' '}
              <span className="text-emerald-500">Agent Readiness</span>
              <br />
              <span className="text-zinc-400 text-2xl sm:text-3xl lg:text-4xl">
                Q1 2026
              </span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-4">
              {totalCount > 0 ? (
                <>
                  Even Big Tech averages{' '}
                  <span className="text-zinc-200 font-semibold">
                    {avgScore}/100
                  </span>
                  .{' '}
                  {avgScore < 60
                    ? 'The companies building AI are not agent-ready themselves.'
                    : avgScore < 75
                      ? 'Better than most verticals, but still below Gold tier.'
                      : 'Leading the way, but room for improvement remains.'}
                </>
              ) : (
                'Industry data will populate as enterprise businesses are scanned.'
              )}
            </p>

            <p className="text-sm text-zinc-600 max-w-xl mx-auto">
              Based on {totalCount} enterprise and Big Tech companies scanned
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
              label="Enterprise Average"
              value={`${avgScore}/100`}
              icon={<Building2 className="h-5 w-5 text-emerald-500" />}
              subtext={`Global avg: ${globalAvg} | Median: ${medianScore}`}
            />
            <StatCard
              label="Companies Scanned"
              value={String(totalCount)}
              icon={<Cpu className="h-5 w-5 text-blue-500" />}
              subtext={`${aiBuilderCount} are AI builders`}
            />
            <StatCard
              label="Top Enterprise"
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

      {/* The AI Paradox */}
      {(aiBuilderAvg > 0 || nonAIBuilderAvg > 0) && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="The AI Paradox"
              subtitle="Companies building AI vs companies that are not"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Brain className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      AI Builders
                    </h3>
                    <p className="text-[10px] text-zinc-600">
                      OpenAI, Google, Microsoft, Anthropic, Meta, etc.
                    </p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  {aiBuilderAvg}/100
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scoreBarColor(aiBuilderAvg)}`}
                    style={{ width: `${aiBuilderAvg}%` }}
                  />
                </div>
                <p className="text-[10px] text-zinc-600 mt-2">
                  {aiBuilderCount} companies actively building AI
                </p>
              </div>

              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-500/10 border border-zinc-500/20">
                    <Building2 className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      Non-AI Enterprise
                    </h3>
                    <p className="text-[10px] text-zinc-600">
                      Oracle, SAP, Cisco, Dell, ServiceNow, etc.
                    </p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-zinc-400 mb-2">
                  {nonAIBuilderAvg}/100
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scoreBarColor(nonAIBuilderAvg)}`}
                    style={{ width: `${nonAIBuilderAvg}%` }}
                  />
                </div>
                <p className="text-[10px] text-zinc-600 mt-2">
                  Traditional enterprise software
                </p>
              </div>
            </div>

            <div className="mt-6 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-zinc-300 leading-relaxed">
                  <span className="font-semibold text-zinc-100">
                    The paradox:
                  </span>{' '}
                  {aiGap > 0
                    ? `Companies building AI score ${aiGap} points higher than non-AI enterprise -- but even they average only ${aiBuilderAvg}/100. The companies creating the agent economy are not fully ready for it themselves. They build great APIs and models but often lack the agent-native protocols (MCP, agent cards, llms.txt) that make them truly machine-accessible.`
                    : aiGap === 0
                      ? `AI builders and non-AI enterprise are tied at ${aiBuilderAvg}/100. Building AI does not automatically translate to being agent-ready. Both groups need the same agent-native infrastructure: structured discovery, programmatic onboarding, and machine-readable service descriptions.`
                      : `Surprisingly, non-AI enterprise scores ${Math.abs(aiGap)} points higher than AI builders. Building AI models and building agent-accessible services require fundamentally different infrastructure. Even OpenAI and Google need to improve their own agent-readiness.`}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ARL Distribution */}
      {totalCount > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="ARL Distribution"
              subtitle="How enterprise companies distribute across Agent Readiness Levels"
            />

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
              {(
                ['platinum', 'gold', 'silver', 'bronze', 'unaudited'] as const
              ).map((tier) => {
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
              })}
            </div>

            <div className="mt-6">
              <div className="h-3 rounded-full overflow-hidden flex bg-zinc-900">
                {(
                  ['platinum', 'gold', 'silver', 'bronze', 'unaudited'] as const
                ).map((tier) => {
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
                })}
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
                  ? `Enterprise leads in ${bestDim.label} (${bestDim.avg}/100), weakest in ${worstDim.label} (${worstDim.avg}/100)`
                  : 'Score breakdown across 9 dimensions'
              }
            />

            <div className="space-y-4 mt-8">
              {dimensions.map((dim) => (
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
                      className={`h-full rounded-full ${scoreBarColor(dim.avg)} transition-all`}
                      style={{ width: `${dim.avg}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enterprise Blindspots */}
      <section className="py-10 sm:py-14 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Enterprise Blindspots"
            subtitle="Why the biggest companies struggle with agent readiness"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: <Brain className="h-5 w-5 text-purple-400" />,
                title: 'Building AI != Being Agent-Ready',
                desc: 'Enterprise companies invest billions in AI models and infrastructure but neglect the agent-facing layer. Having a great API is not enough -- agents need MCP servers, agent cards, and machine-readable service catalogs to discover and interact.',
              },
              {
                icon: <Lock className="h-5 w-5 text-red-400" />,
                title: 'Enterprise Auth Blocks Agents',
                desc: 'SSO, SAML, and enterprise auth flows are designed for human employees with browsers. Agents need programmatic credential provisioning, OAuth client credentials flow, and API key management -- most enterprise platforms only offer dashboard-based setup.',
              },
              {
                icon: <Cpu className="h-5 w-5 text-blue-400" />,
                title: 'Legacy Architecture',
                desc: 'Decades of enterprise software built for human workflows. SOAP APIs, PDF documentation, phone-based support -- none of these are agent-readable. The transition to agent-native infrastructure requires rethinking the entire surface area.',
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

      {/* Top 10 Enterprise Leaderboard */}
      {top10.length > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <SectionHeading
                title="Top 10 Enterprise Leaderboard"
                subtitle="Highest-scoring enterprise companies for agent readiness"
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
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-zinc-100 truncate">
                          {biz.name}
                        </h3>
                        {biz.isAIBuilder && (
                          <span className="text-[9px] font-medium text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                            AI Builder
                          </span>
                        )}
                      </div>
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
            Is Your Enterprise{' '}
            <span className="text-emerald-500">Agent-Ready</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-6 max-w-lg mx-auto">
            Free scan. 60 seconds. See how your company compares to the
            enterprise benchmarks above.
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
