import Link from 'next/link'
import { getServiceClient } from '@/lib/supabase'
import {
  BarChart3,
  TrendingDown,
  Trophy,
  AlertTriangle,
  Search,
  BookOpen,
  UserPlus,
  Plug,
  Activity,
  CreditCard,
  ArrowRight,
  FileText,
  Globe,
  CheckCircle2,
  XCircle,
  Layers,
  Crown,
} from 'lucide-react'

export const revalidate = 3600

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface JourneyStepData {
  name: string
  question: string
  dimensionKeys: string[]
  passRate: number
  avgScore: number
}

interface IndustryRow {
  vertical: string
  count: number
  avgScore: number
}

interface ProtocolStats {
  agentCards: number
  llmsTxt: number
  mcp: number
  a2a: number
  openapi: number
  total: number
}

interface TopBusiness {
  rank: number
  name: string
  slug: string | null
  domain: string | null
  score: number
  tier: string
  vertical: string | null
}

interface ReportData {
  totalScanned: number
  avgScore: number
  pctBelow40: number
  topCompany: { name: string; score: number; slug: string | null } | null
  mostCommonFailure: string
  industries: IndustryRow[]
  journeySteps: JourneyStepData[]
  protocols: ProtocolStats
  top10: TopBusiness[]
}

// ---------------------------------------------------------------------------
// Journey step definitions — maps 9 dimensions to 6 journey steps
// ---------------------------------------------------------------------------

const JOURNEY_DEFS: {
  name: string
  question: string
  dimensionKeys: string[]
  icon: typeof Search
}[] = [
  {
    name: 'FIND',
    question: 'Can an agent discover the business?',
    dimensionKeys: ['D1'],
    icon: Search,
  },
  {
    name: 'UNDERSTAND',
    question: 'Can an agent know what it offers?',
    dimensionKeys: ['D6', 'D9'],
    icon: BookOpen,
  },
  {
    name: 'SIGN UP',
    question: 'Can an agent create an account?',
    dimensionKeys: ['D3'],
    icon: UserPlus,
  },
  {
    name: 'CONNECT',
    question: 'Can an agent authenticate and call the API?',
    dimensionKeys: ['D2', 'D7'],
    icon: Plug,
  },
  {
    name: 'USE',
    question: 'Can an agent get reliable responses?',
    dimensionKeys: ['D8'],
    icon: Activity,
  },
  {
    name: 'PAY',
    question: 'Can an agent pay programmatically?',
    dimensionKeys: ['D4', 'D5'],
    icon: CreditCard,
  },
]

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function fetchReportData(): Promise<ReportData> {
  const db = getServiceClient()

  // 1. All businesses
  const { data: bizRaw } = await db
    .from('businesses')
    .select(
      'id, name, slug, domain, audit_score, audit_tier, vertical, capabilities, a2a_agent_card, mcp_endpoints, created_at'
    )
    .order('audit_score', { ascending: false })

  const businesses = (bizRaw || []) as Record<string, any>[]
  const totalScanned = businesses.length

  if (totalScanned === 0) {
    return {
      totalScanned: 0,
      avgScore: 0,
      pctBelow40: 0,
      topCompany: null,
      mostCommonFailure: 'N/A',
      industries: [],
      journeySteps: JOURNEY_DEFS.map((d) => ({
        name: d.name,
        question: d.question,
        dimensionKeys: d.dimensionKeys,
        passRate: 0,
        avgScore: 0,
      })),
      protocols: {
        agentCards: 0,
        llmsTxt: 0,
        mcp: 0,
        a2a: 0,
        openapi: 0,
        total: 0,
      },
      top10: [],
    }
  }

  // Basic stats
  const scores = businesses.map((b) => (b.audit_score as number) ?? 0)
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalScanned)
  const below40 = scores.filter((s) => s < 40).length
  const pctBelow40 = Math.round((below40 / totalScanned) * 100)

  // Top company
  const top = businesses[0]
  const topCompany = top
    ? {
        name: top.name as string,
        score: (top.audit_score as number) ?? 0,
        slug: (top.slug as string) ?? null,
      }
    : null

  // 2. Scan results for 9-dimension data (journey step analysis)
  const { data: scanRaw } = await db
    .from('scan_results')
    .select('domain, dimensions')

  const scans = (scanRaw || []) as Record<string, any>[]

  // Build per-dimension score arrays across all scans
  const dimScores: Record<string, number[]> = {}
  for (const scan of scans) {
    const dims = scan.dimensions as
      | { dimension: string; score: number }[]
      | null
    if (!Array.isArray(dims)) continue
    for (const d of dims) {
      if (!dimScores[d.dimension]) dimScores[d.dimension] = []
      dimScores[d.dimension].push(d.score)
    }
  }

  // Compute per-dimension averages
  const dimAvg: Record<string, number> = {}
  for (const [key, vals] of Object.entries(dimScores)) {
    dimAvg[key] =
      vals.length > 0
        ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
        : 0
  }

  // Journey step pass rates: a business "passes" a step if its avg dimension
  // score for that step is >= 60
  const journeySteps: JourneyStepData[] = JOURNEY_DEFS.map((def) => {
    let passCount = 0
    let totalStepScore = 0
    let counted = 0

    for (const scan of scans) {
      const dims = scan.dimensions as
        | { dimension: string; score: number }[]
        | null
      if (!Array.isArray(dims)) continue

      const relevant = dims.filter((d) => def.dimensionKeys.includes(d.dimension))
      if (relevant.length === 0) continue

      const stepScore =
        relevant.reduce((sum, d) => sum + d.score, 0) / relevant.length
      totalStepScore += stepScore
      counted++
      if (stepScore >= 60) passCount++
    }

    return {
      name: def.name,
      question: def.question,
      dimensionKeys: def.dimensionKeys,
      passRate: counted > 0 ? Math.round((passCount / counted) * 100) : 0,
      avgScore: counted > 0 ? Math.round(totalStepScore / counted) : 0,
    }
  })

  // Most common failure step (lowest pass rate)
  const worstStep = [...journeySteps].sort((a, b) => a.passRate - b.passRate)[0]
  const mostCommonFailure = worstStep
    ? `Step ${JOURNEY_DEFS.findIndex((d) => d.name === worstStep.name) + 1}: ${worstStep.name} (${worstStep.passRate}% pass)`
    : 'N/A'

  // 3. Industry breakdown
  const verticalGroups: Record<string, { count: number; totalScore: number }> =
    {}
  for (const biz of businesses) {
    const v = (biz.vertical as string) || 'unknown'
    if (!verticalGroups[v]) verticalGroups[v] = { count: 0, totalScore: 0 }
    verticalGroups[v].count++
    verticalGroups[v].totalScore += (biz.audit_score as number) ?? 0
  }

  const industries = Object.entries(verticalGroups)
    .map(([vertical, d]) => ({
      vertical,
      count: d.count,
      avgScore: Math.round(d.totalScore / d.count),
    }))
    .sort((a, b) => b.avgScore - a.avgScore)

  // 4. Protocol adoption
  // Agent cards: businesses with non-null a2a_agent_card
  const agentCards = businesses.filter(
    (b) => b.a2a_agent_card && Object.keys(b.a2a_agent_card as object).length > 0
  ).length

  // MCP: businesses with non-empty mcp_endpoints array
  const mcp = businesses.filter(
    (b) => Array.isArray(b.mcp_endpoints) && (b.mcp_endpoints as string[]).length > 0
  ).length

  // llms.txt and OpenAPI: check from scan_results dimension checks
  let llmsTxtCount = 0
  let openapiCount = 0
  let a2aCount = agentCards // same as agent cards since that IS A2A

  for (const scan of scans) {
    const dims = scan.dimensions as
      | { dimension: string; score: number; checks?: { name: string; passed: boolean }[] }[]
      | null
    if (!Array.isArray(dims)) continue

    const d1 = dims.find((d) => d.dimension === 'D1')
    if (d1?.checks) {
      const llmsCheck = (d1.checks as { name: string; passed: boolean }[]).find(
        (c) => c.name === 'llms.txt'
      )
      if (llmsCheck?.passed) llmsTxtCount++
    }

    const d2 = dims.find((d) => d.dimension === 'D2')
    if (d2?.checks) {
      const openapiCheck = (d2.checks as { name: string; passed: boolean }[]).find(
        (c) => c.name === 'OpenAPI Spec' || c.name === 'OpenAPI/Swagger Spec'
      )
      if (openapiCheck?.passed) openapiCount++
    }
  }

  const protocols: ProtocolStats = {
    agentCards,
    llmsTxt: llmsTxtCount,
    mcp,
    a2a: a2aCount,
    openapi: openapiCount,
    total: totalScanned,
  }

  // 5. Top 10
  const top10: TopBusiness[] = businesses.slice(0, 10).map((biz, i) => ({
    rank: i + 1,
    name: biz.name as string,
    slug: (biz.slug as string) ?? null,
    domain: (biz.domain as string) ?? null,
    score: (biz.audit_score as number) ?? 0,
    tier: (biz.audit_tier as string) ?? 'unaudited',
    vertical: (biz.vertical as string) ?? null,
  }))

  return {
    totalScanned,
    avgScore,
    pctBelow40,
    topCompany,
    mostCommonFailure,
    industries,
    journeySteps,
    protocols,
    top10,
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

function scoreBarColor(score: number): string {
  if (score >= 90) return 'bg-emerald-500'
  if (score >= 75) return 'bg-yellow-500'
  if (score >= 60) return 'bg-zinc-400'
  if (score >= 40) return 'bg-amber-500'
  return 'bg-red-500'
}

function pctBarColor(pct: number): string {
  if (pct >= 60) return 'bg-emerald-500'
  if (pct >= 40) return 'bg-amber-500'
  return 'bg-red-500'
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function StateOfReadinessPage() {
  let data: ReportData

  try {
    data = await fetchReportData()
  } catch {
    data = {
      totalScanned: 0,
      avgScore: 0,
      pctBelow40: 0,
      topCompany: null,
      mostCommonFailure: 'N/A',
      industries: [],
      journeySteps: JOURNEY_DEFS.map((d) => ({
        name: d.name,
        question: d.question,
        dimensionKeys: d.dimensionKeys,
        passRate: 0,
        avgScore: 0,
      })),
      protocols: {
        agentCards: 0,
        llmsTxt: 0,
        mcp: 0,
        a2a: 0,
        openapi: 0,
        total: 0,
      },
      top10: [],
    }
  }

  const {
    totalScanned,
    avgScore,
    pctBelow40,
    topCompany,
    mostCommonFailure,
    industries,
    journeySteps,
    protocols,
    top10,
  } = data

  return (
    <div className="relative">
      {/* ================================================================== */}
      {/* 1. HERO                                                           */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
              <FileText className="h-3.5 w-3.5" />
              Q1 2026 Report
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
              State of{' '}
              <span className="text-emerald-500">Agent Readiness</span>
              <br />
              <span className="text-zinc-400 text-2xl sm:text-3xl lg:text-4xl">
                Q1 2026
              </span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-4">
              Based on{' '}
              <span className="text-zinc-200 font-semibold">
                {totalScanned}+ business scans
              </span>{' '}
              across the AgentHermes network.
            </p>
            <p className="text-sm text-zinc-600 max-w-xl mx-auto mb-8">
              How ready are businesses for the AI agent economy? We scanned every
              business in our network across 9 dimensions and 6 journey steps to
              find out.
            </p>

            {/* Share/Download CTA */}
            <div className="inline-flex items-center gap-3">
              <a
                href="https://twitter.com/intent/tweet?text=State%20of%20Agent%20Readiness%20Q1%202026%20%E2%80%94%20Most%20businesses%20score%20under%2040&url=https://agenthermes.ai/report/state-of-readiness"
                target="_blank"
                rel="noopener noreferrer"
                className="report-share-cta inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-emerald-400"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                Share Report
              </a>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://agenthermes.ai/report/state-of-readiness"
                target="_blank"
                rel="noopener noreferrer"
                className="report-share-cta inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-blue-400"
                style={{ borderColor: 'rgba(59, 130, 246, 0.2)', background: 'rgba(59, 130, 246, 0.06)' }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. KEY STATS                                                      */}
      {/* ================================================================== */}
      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Average Score"
              value={`${avgScore}/100`}
              icon={<BarChart3 className="h-5 w-5 text-emerald-500" />}
              subtext={
                avgScore < 40
                  ? 'Most businesses are agent-invisible'
                  : avgScore < 60
                    ? 'Room for significant improvement'
                    : 'Above the agent-ready threshold'
              }
            />
            <StatCard
              label="Agent-Invisible"
              value={`${pctBelow40}%`}
              icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
              subtext="Score below 40"
            />
            <StatCard
              label="Top Performer"
              value={topCompany ? String(topCompany.score) : '--'}
              icon={<Trophy className="h-5 w-5 text-yellow-500" />}
              subtext={topCompany?.name ?? 'N/A'}
            />
            <StatCard
              label="Biggest Blocker"
              value={
                journeySteps.length > 0
                  ? [...journeySteps].sort((a, b) => a.passRate - b.passRate)[0]
                      ?.name ?? '--'
                  : '--'
              }
              icon={<TrendingDown className="h-5 w-5 text-amber-500" />}
              subtext={mostCommonFailure}
            />
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. BY INDUSTRY                                                    */}
      {/* ================================================================== */}
      {industries.length > 0 && (
        <section className="py-10 sm:py-14"><hr className="section-divider mb-10" />
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="By Industry"
              subtitle="Average Agent Readiness Score per vertical"
            />

            <div className="mt-8 rounded-xl border border-zinc-800/80 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_4rem_8rem] gap-4 px-5 py-3 bg-zinc-900/80 text-[10px] font-medium text-zinc-500 uppercase tracking-wider border-b border-zinc-800/50">
                <span>Industry</span>
                <span className="text-center">Count</span>
                <span className="text-right">Avg Score</span>
              </div>

              {industries.map((row) => (
                <Link
                  key={row.vertical}
                  href={`/discover?vertical=${row.vertical}`}
                  className="grid grid-cols-[1fr_4rem_8rem] gap-4 px-5 py-3.5 border-b border-zinc-800/30 last:border-b-0 hover:bg-zinc-800/20 transition-colors"
                >
                  <span className="text-sm text-zinc-200 capitalize">
                    {row.vertical.replace(/-/g, ' ').replace(/_/g, ' ')}
                  </span>
                  <span className="text-sm text-zinc-400 text-center font-mono">
                    {row.count}
                  </span>
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full bar-animate ${scoreBarColor(row.avgScore)}`}
                        style={{ width: `${row.avgScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono text-zinc-300 w-8 text-right">
                      {row.avgScore}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 4. 6-STEP JOURNEY ANALYSIS                                        */}
      {/* ================================================================== */}
      <section className="py-10 sm:py-14 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="The 6-Step Agent Journey"
            subtitle="What % of businesses pass each step (score 60+ on that dimension)"
          />

          {/* Desktop: horizontal pipeline */}
          <div className="hidden sm:block mt-10">
            <div className="relative">
              {/* Connector line */}
              <div className="absolute top-8 left-[8%] right-[8%] h-0.5 bg-zinc-800 z-0" />
              <div className="grid grid-cols-6 gap-3 relative z-10">
                {journeySteps.map((step, i) => {
                  const def = JOURNEY_DEFS[i]
                  const Icon = def.icon
                  const passed = step.passRate >= 60
                  const partial = step.passRate >= 30

                  return (
                    <div key={step.name} className="flex flex-col items-center">
                      {/* Circle */}
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${
                          passed
                            ? 'bg-emerald-500/10 border-emerald-500/30'
                            : partial
                              ? 'bg-amber-500/10 border-amber-500/30'
                              : 'bg-red-500/10 border-red-500/30'
                        }`}
                      >
                        <Icon
                          className={`h-6 w-6 ${
                            passed
                              ? 'text-emerald-400'
                              : partial
                                ? 'text-amber-400'
                                : 'text-red-400'
                          }`}
                        />
                      </div>

                      {/* Step label */}
                      <div className="mt-3 text-center">
                        <div className="text-[10px] font-mono text-zinc-600 mb-0.5">
                          STEP {i + 1}
                        </div>
                        <div
                          className={`text-xs font-bold tracking-wide ${
                            passed
                              ? 'text-emerald-400'
                              : partial
                                ? 'text-amber-400'
                                : 'text-red-400'
                          }`}
                        >
                          {step.name}
                        </div>
                      </div>

                      {/* Pass rate */}
                      <div className="mt-3 w-full px-1">
                        <div className="text-center mb-1">
                          <span
                            className={`text-2xl font-black tabular-nums ${
                              passed
                                ? 'text-emerald-400'
                                : partial
                                  ? 'text-amber-400'
                                  : 'text-red-400'
                            }`}
                          >
                            {step.passRate}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${pctBarColor(step.passRate)}`}
                            style={{ width: `${step.passRate}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-zinc-600 text-center mt-1">
                          pass rate
                        </div>
                      </div>

                      {/* Question */}
                      <p className="mt-2 text-[10px] text-zinc-600 text-center leading-tight max-w-[130px]">
                        {step.question}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile: vertical cards */}
          <div className="sm:hidden space-y-3 mt-8">
            {journeySteps.map((step, i) => {
              const def = JOURNEY_DEFS[i]
              const Icon = def.icon
              const passed = step.passRate >= 60
              const partial = step.passRate >= 30

              return (
                <div
                  key={step.name}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${
                    passed
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : partial
                        ? 'bg-amber-500/5 border-amber-500/20'
                        : 'bg-red-500/5 border-red-500/20'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${
                      passed
                        ? 'bg-emerald-500/20'
                        : partial
                          ? 'bg-amber-500/20'
                          : 'bg-red-500/20'
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        passed
                          ? 'text-emerald-400'
                          : partial
                            ? 'text-amber-400'
                            : 'text-red-400'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono text-zinc-600">
                        STEP {i + 1}
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          passed
                            ? 'text-emerald-400'
                            : partial
                              ? 'text-amber-400'
                              : 'text-red-400'
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-tight">
                      {step.question}
                    </p>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span
                      className={`text-xl font-black tabular-nums ${
                        passed
                          ? 'text-emerald-400'
                          : partial
                            ? 'text-amber-400'
                            : 'text-red-400'
                      }`}
                    >
                      {step.passRate}%
                    </span>
                    <span className="text-[10px] text-zinc-600">pass</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Insight callout */}
          {journeySteps.length > 0 && (
            <div className="mt-8 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-zinc-300 leading-relaxed">
                  <span className="font-semibold text-zinc-100">Key insight:</span>{' '}
                  {(() => {
                    const sorted = [...journeySteps].sort(
                      (a, b) => a.passRate - b.passRate
                    )
                    const worst = sorted[0]
                    const best = sorted[sorted.length - 1]
                    return `"${worst.name}" is the biggest bottleneck at ${worst.passRate}% pass rate, while "${best.name}" leads at ${best.passRate}%. The agent journey breaks at the weakest link -- businesses must improve their worst step to unlock the full pipeline.`
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. PROTOCOL ADOPTION                                              */}
      {/* ================================================================== */}
      <section className="py-10 sm:py-14 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Protocol Adoption"
            subtitle="What % of scanned businesses have adopted agent-native protocols"
          />

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-8">
            {[
              {
                label: 'Agent Cards',
                count: protocols.agentCards,
                desc: 'JSON-based identity for agents',
              },
              {
                label: 'llms.txt',
                count: protocols.llmsTxt,
                desc: 'LLM-readable business description',
              },
              {
                label: 'MCP',
                count: protocols.mcp,
                desc: 'Model Context Protocol endpoints',
              },
              {
                label: 'A2A',
                count: protocols.a2a,
                desc: 'Agent-to-Agent protocol',
              },
              {
                label: 'OpenAPI',
                count: protocols.openapi,
                desc: 'Machine-readable API spec',
              },
            ].map((proto) => {
              const pct =
                protocols.total > 0
                  ? Math.round((proto.count / protocols.total) * 100)
                  : 0
              return (
                <div
                  key={proto.label}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/60 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-zinc-400">
                      {proto.label}
                    </span>
                    {pct > 0 ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-zinc-700" />
                    )}
                  </div>

                  <div className="text-3xl font-bold tracking-tight text-zinc-100 mb-1">
                    {pct}%
                  </div>

                  <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all ${pctBarColor(pct)}`}
                      style={{ width: `${Math.max(pct, 2)}%` }}
                    />
                  </div>

                  <div className="text-[10px] text-zinc-600">
                    {proto.count} of {protocols.total} businesses
                  </div>
                  <div className="text-[10px] text-zinc-700 mt-0.5">
                    {proto.desc}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-zinc-900/30 border border-zinc-800/50">
            <p className="text-xs text-zinc-500 leading-relaxed">
              Agent-native protocols are still in early adoption. These numbers reflect
              the current state of the ecosystem -- even single-digit adoption represents
              the bleeding edge. As the agent economy grows, these rates will be the
              leading indicator of market readiness.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. LEADERBOARD PREVIEW                                            */}
      {/* ================================================================== */}
      {top10.length > 0 && (
        <section className="py-10 sm:py-14"><hr className="section-divider mb-10" />
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <SectionHeading
                title="Leaderboard Preview"
                subtitle="Top 10 agent-ready businesses"
              />
              <Link
                href="/leaderboard"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                See full leaderboard
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {top10.map((biz) => {
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
                        {biz.tier === 'unaudited' ? 'Not Scored' : biz.tier}
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
                    className="flex items-center gap-4 px-5 py-3.5 rounded-xl bg-zinc-900/30 border border-zinc-800/50"
                  >
                    {inner}
                  </div>
                )
              })}
            </div>

            {/* Mobile "See full leaderboard" */}
            <div className="sm:hidden mt-4 text-center">
              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                See full leaderboard
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* 7. CTA                                                            */}
      {/* ================================================================== */}
      <section className="py-20 sm:py-28">
        <hr className="section-divider mb-16" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Check Your{' '}
            <span className="text-emerald-500">Agent Readiness</span> Score
          </h2>
          <p className="text-zinc-400 text-lg mb-6 max-w-lg mx-auto">
            Free. 60 seconds. See exactly where you stand compared to these
            benchmarks.
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
              href="/remediate"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors border border-zinc-700"
            >
              Get Agent-Ready
              <Layers className="h-4 w-4" />
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
    <div className="stat-card-enhanced p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50">
          {icon}
        </div>
      </div>
      <div className="text-3xl sm:text-4xl font-black tracking-tight tabular-nums">
        {value}
      </div>
      <div className="text-xs text-zinc-400 font-semibold mt-2 uppercase tracking-wider">{label}</div>
      {subtext && (
        <div className="text-[11px] text-zinc-500 mt-1 leading-snug">{subtext}</div>
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
