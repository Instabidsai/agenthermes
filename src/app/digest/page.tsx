import Link from 'next/link'
import { getServiceClient } from '@/lib/supabase'
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Search,
  Building2,
  ArrowRight,
  Activity,
  Network,
  Layers,
  Shield,
} from 'lucide-react'
import clsx from 'clsx'

export const revalidate = 300 // 5 minutes

// ---------------------------------------------------------------------------
// Data fetching (same logic as the API route, server-side)
// ---------------------------------------------------------------------------

interface DigestData {
  weekStart: string
  weekEnd: string
  generatedAt: string
  headline: {
    newScans: number
    growthPct: number
    avgNewScore: number
    totalEvents: number
    scoreChanges: number
  }
  networkStats: {
    totalBusinesses: number
    totalAudits: number
    totalConnections: number
    totalVolume: number
    tierDistribution: Record<string, number>
  }
  newBusinesses: {
    name: string
    slug: string
    domain: string | null
    score: number
    tier: string
    vertical: string | null
    scanned_at: string
  }[]
  topMoversUp: {
    name: string
    slug: string
    domain: string | null
    previous_score: number
    current_score: number
    change: number
    tier: string
    vertical: string | null
  }[]
  topMoversDown: {
    name: string
    slug: string
    domain: string | null
    previous_score: number
    current_score: number
    change: number
    tier: string
    vertical: string | null
  }[]
  topSearchQueries: { query: string; count: number }[]
  eventBreakdown: Record<string, number>
  industryBreakdown: {
    vertical: string
    count: number
    avg_score: number
    tiers: Record<string, number>
  }[]
}

async function getDigestData(): Promise<DigestData> {
  const db = getServiceClient()
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
  const sinceISO = weekAgo.toISOString()
  const twoWeeksAgoISO = twoWeeksAgo.toISOString()

  // New businesses
  const { data: newBizRaw } = await db
    .from('businesses')
    .select('id, name, slug, domain, audit_score, audit_tier, vertical, created_at')
    .gte('created_at', sinceISO)
    .order('audit_score', { ascending: false })

  const newBusinesses = ((newBizRaw || []) as Record<string, any>[]).map((b) => ({
    name: b.name as string,
    slug: b.slug as string,
    domain: b.domain as string | null,
    score: b.audit_score as number,
    tier: b.audit_tier as string,
    vertical: b.vertical as string | null,
    scanned_at: b.created_at as string,
  }))

  // Score changes — re-scanned businesses
  const { data: updatedBizRaw } = await db
    .from('businesses')
    .select('id, name, slug, domain, audit_score, audit_tier, vertical, updated_at, created_at')
    .gte('updated_at', sinceISO)
    .lt('created_at', sinceISO)
    .order('audit_score', { ascending: false })

  const updatedBusinesses = (updatedBizRaw || []) as Record<string, any>[]

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
    const { data: currentAuditsRaw } = await db
      .from('audit_results')
      .select('score, audited_at')
      .eq('business_id', biz.id)
      .gte('audited_at', sinceISO)
      .order('audited_at', { ascending: false })
      .limit(5)

    if (!currentAuditsRaw || currentAuditsRaw.length === 0) continue

    const currentScore = biz.audit_score as number

    const { data: prevAuditsRaw } = await db
      .from('audit_results')
      .select('score')
      .eq('business_id', biz.id)
      .lt('audited_at', sinceISO)
      .limit(5)

    const prevAudits = (prevAuditsRaw || []) as Record<string, any>[]
    if (prevAudits.length === 0) continue

    const previousScore = prevAudits.reduce(
      (sum: number, a: Record<string, any>) => sum + ((a.score as number) || 0),
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

  scoreChanges.sort((a, b) => Math.abs(b.change) - Math.abs(a.change))

  // Network stats
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

  // WoW growth
  const { count: prevWeekNewBiz } = await db
    .from('businesses')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', twoWeeksAgoISO)
    .lt('created_at', sinceISO)

  const prevWeekCount = prevWeekNewBiz ?? 0
  const growthPct =
    prevWeekCount > 0
      ? Math.round(((newBusinesses.length - prevWeekCount) / prevWeekCount) * 100)
      : newBusinesses.length > 0
        ? 100
        : 0

  // Analytics
  const { data: eventsRaw } = await db
    .from('analytics_events')
    .select('event_type, query_text')
    .gte('created_at', sinceISO)

  const events = (eventsRaw || []) as Record<string, any>[]

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
    .slice(0, 10)
    .map(([query, count]) => ({ query, count }))

  // Industry breakdown
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

  const avgNewScore =
    newBusinesses.length > 0
      ? Math.round(
          newBusinesses.reduce((s, b) => s + b.score, 0) / newBusinesses.length
        )
      : 0

  return {
    weekStart: weekAgo.toISOString().split('T')[0],
    weekEnd: now.toISOString().split('T')[0],
    generatedAt: now.toISOString(),
    headline: {
      newScans: newBusinesses.length,
      growthPct,
      avgNewScore,
      totalEvents: events.length,
      scoreChanges: scoreChanges.length,
    },
    networkStats: {
      totalBusinesses: totalBusinesses ?? 0,
      totalAudits: totalAudits ?? 0,
      totalConnections: totalConnections ?? 0,
      totalVolume: Math.round(totalVolume * 100) / 100,
      tierDistribution,
    },
    newBusinesses: newBusinesses.slice(0, 25),
    topMoversUp: scoreChanges.filter((s) => s.change > 0).slice(0, 10),
    topMoversDown: scoreChanges.filter((s) => s.change < 0).slice(0, 10),
    topSearchQueries,
    eventBreakdown: eventCounts,
    industryBreakdown,
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const tierColors: Record<string, { bg: string; text: string; border: string }> = {
  platinum: { bg: 'bg-emerald-950/40', text: 'text-emerald-400', border: 'border-emerald-700/40' },
  gold: { bg: 'bg-yellow-950/40', text: 'text-yellow-500', border: 'border-yellow-700/40' },
  silver: { bg: 'bg-zinc-800/40', text: 'text-zinc-300', border: 'border-zinc-500/40' },
  bronze: { bg: 'bg-amber-950/40', text: 'text-amber-500', border: 'border-amber-800/40' },
  unaudited: { bg: 'bg-zinc-900/40', text: 'text-zinc-500', border: 'border-zinc-800/40' },
}

function TierPill({ tier }: { tier: string }) {
  const label =
    tier === 'unaudited'
      ? 'Not Scored'
      : tier.charAt(0).toUpperCase() + tier.slice(1)
  const c = tierColors[tier] || tierColors.unaudited
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 text-[11px] font-medium border rounded-full tracking-wide uppercase',
        c.bg,
        c.text,
        c.border
      )}
    >
      {label}
    </span>
  )
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string
  value: string | number
  sub?: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-5">
      <div className="absolute -right-3 -top-3 opacity-[0.04]">
        <Icon className="h-20 w-20" />
      </div>
      <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500 mb-1">
        {label}
      </p>
      <p className="text-2xl font-semibold text-zinc-100 font-mono tabular-nums">
        {value}
      </p>
      {sub && (
        <p className="text-xs text-zinc-500 mt-1">{sub}</p>
      )}
    </div>
  )
}

function SectionHeader({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
        <Icon className="h-4 w-4 text-emerald-500" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-zinc-100">{title}</h2>
        {subtitle && (
          <p className="text-xs text-zinc-500">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

function formatEventName(name: string): string {
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function DigestPage() {
  const data = await getDigestData()

  const tierOrder = ['platinum', 'gold', 'silver', 'bronze', 'unaudited']
  const tierLabels: Record<string, string> = {
    platinum: 'Platinum',
    gold: 'Gold',
    silver: 'Silver',
    bronze: 'Bronze',
    unaudited: 'Not Scored',
  }

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* ----------------------------------------------------------------- */}
      {/* Header */}
      {/* ----------------------------------------------------------------- */}
      <header className="relative overflow-hidden border-b border-zinc-800/60">
        {/* Subtle gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-zinc-900/30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-subtle-pulse" />
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-500">
              Live Intelligence
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight mb-2">
            Weekly Agent Readiness Digest
          </h1>
          <p className="text-zinc-500 text-sm max-w-xl">
            Network-wide intelligence brief covering {data.weekStart} to{' '}
            {data.weekEnd}. Data sourced from the AgentHermes Verified Commerce
            Network.
          </p>

          <div className="flex items-center gap-4 mt-5 text-[11px] text-zinc-600 font-mono">
            <span>
              Generated{' '}
              {new Date(data.generatedAt).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'UTC',
              })}{' '}
              UTC
            </span>
            <span className="text-zinc-800">|</span>
            <Link
              href="/api/v1/digest"
              className="text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              JSON API
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* ----------------------------------------------------------------- */}
        {/* Headline Stats */}
        {/* ----------------------------------------------------------------- */}
        <section>
          <SectionHeader
            icon={BarChart3}
            title="Headline Numbers"
            subtitle="7-day summary"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <StatCard
              label="New Scans"
              value={data.headline.newScans}
              sub={
                data.headline.growthPct !== 0
                  ? `${data.headline.growthPct > 0 ? '+' : ''}${data.headline.growthPct}% WoW`
                  : 'vs. prior week'
              }
              icon={Building2}
            />
            <StatCard
              label="Avg New Score"
              value={data.headline.avgNewScore}
              sub="out of 100"
              icon={Shield}
            />
            <StatCard
              label="Score Changes"
              value={data.headline.scoreChanges}
              sub="re-scanned businesses"
              icon={Activity}
            />
            <StatCard
              label="API Events"
              value={data.headline.totalEvents.toLocaleString()}
              sub="this week"
              icon={Layers}
            />
            <StatCard
              label="Network Size"
              value={data.networkStats.totalBusinesses.toLocaleString()}
              sub={`${data.networkStats.totalConnections} connections`}
              icon={Network}
            />
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* Tier Distribution */}
        {/* ----------------------------------------------------------------- */}
        <section>
          <SectionHeader
            icon={Shield}
            title="Tier Distribution"
            subtitle="All scored businesses by readiness tier"
          />
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
            <div className="flex h-3 overflow-hidden">
              {tierOrder.map((tier) => {
                const count = data.networkStats.tierDistribution[tier] || 0
                const total = data.networkStats.totalBusinesses || 1
                const pct = (count / total) * 100
                if (pct === 0) return null

                const barColors: Record<string, string> = {
                  platinum: 'bg-emerald-500',
                  gold: 'bg-yellow-500',
                  silver: 'bg-zinc-400',
                  bronze: 'bg-amber-600',
                  unaudited: 'bg-zinc-700',
                }

                return (
                  <div
                    key={tier}
                    className={clsx('transition-all', barColors[tier])}
                    style={{ width: `${Math.max(pct, 2)}%` }}
                    title={`${tierLabels[tier]}: ${count} (${pct.toFixed(1)}%)`}
                  />
                )
              })}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-zinc-800/40">
              {tierOrder.map((tier) => {
                const count = data.networkStats.tierDistribution[tier] || 0
                return (
                  <div key={tier} className="px-4 py-3 text-center">
                    <TierPill tier={tier} />
                    <p className="text-lg font-semibold font-mono text-zinc-200 mt-1.5">
                      {count}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* New Scans This Week */}
        {/* ----------------------------------------------------------------- */}
        {data.newBusinesses.length > 0 && (
          <section>
            <SectionHeader
              icon={Building2}
              title="New Scans This Week"
              subtitle={`${data.newBusinesses.length} businesses scanned`}
            />
            <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-900/60 text-left">
                      <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                        Business
                      </th>
                      <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                        Domain
                      </th>
                      <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-zinc-500 text-right">
                        Score
                      </th>
                      <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                        Tier
                      </th>
                      <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-zinc-500 hidden sm:table-cell">
                        Vertical
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/40">
                    {data.newBusinesses.map((biz, i) => (
                      <tr
                        key={biz.slug + i}
                        className="hover:bg-zinc-800/20 transition-colors"
                      >
                        <td className="px-4 py-3 text-zinc-200 font-medium">
                          <Link
                            href={`/business/${biz.slug}`}
                            className="hover:text-emerald-400 transition-colors"
                          >
                            {biz.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-zinc-500 font-mono text-xs">
                          {biz.domain || '--'}
                        </td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-zinc-200">
                          {biz.score}
                        </td>
                        <td className="px-4 py-3">
                          <TierPill tier={biz.tier} />
                        </td>
                        <td className="px-4 py-3 text-zinc-500 text-xs hidden sm:table-cell">
                          {biz.vertical || '--'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Score Changes — Top Movers */}
        {/* ----------------------------------------------------------------- */}
        {(data.topMoversUp.length > 0 || data.topMoversDown.length > 0) && (
          <section>
            <SectionHeader
              icon={Activity}
              title="Biggest Score Changes"
              subtitle="Businesses re-scanned with notable movement"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Movers Up */}
              {data.topMoversUp.length > 0 && (
                <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
                  <div className="px-4 py-3 bg-emerald-950/20 border-b border-emerald-900/30 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Rising
                    </span>
                  </div>
                  <div className="divide-y divide-zinc-800/30">
                    {data.topMoversUp.map((m, i) => (
                      <div
                        key={m.slug + i}
                        className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800/20 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/business/${m.slug}`}
                            className="text-sm font-medium text-zinc-200 hover:text-emerald-400 transition-colors truncate block"
                          >
                            {m.name}
                          </Link>
                          <span className="text-[11px] text-zinc-600 font-mono">
                            {m.domain || m.slug}
                          </span>
                        </div>
                        <div className="text-right ml-3 shrink-0">
                          <span className="text-sm font-mono font-semibold text-emerald-400">
                            +{m.change}
                          </span>
                          <span className="text-[11px] text-zinc-600 block font-mono">
                            {m.previous_score} &rarr; {m.current_score}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Movers Down */}
              {data.topMoversDown.length > 0 && (
                <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
                  <div className="px-4 py-3 bg-red-950/20 border-b border-red-900/30 flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                      Declining
                    </span>
                  </div>
                  <div className="divide-y divide-zinc-800/30">
                    {data.topMoversDown.map((m, i) => (
                      <div
                        key={m.slug + i}
                        className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800/20 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/business/${m.slug}`}
                            className="text-sm font-medium text-zinc-200 hover:text-red-400 transition-colors truncate block"
                          >
                            {m.name}
                          </Link>
                          <span className="text-[11px] text-zinc-600 font-mono">
                            {m.domain || m.slug}
                          </span>
                        </div>
                        <div className="text-right ml-3 shrink-0">
                          <span className="text-sm font-mono font-semibold text-red-400">
                            {m.change}
                          </span>
                          <span className="text-[11px] text-zinc-600 block font-mono">
                            {m.previous_score} &rarr; {m.current_score}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Industry Breakdown */}
        {/* ----------------------------------------------------------------- */}
        {data.industryBreakdown.length > 0 && (
          <section>
            <SectionHeader
              icon={Layers}
              title="Industry Breakdown"
              subtitle="Agent readiness by vertical"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.industryBreakdown.map((ind) => (
                <div
                  key={ind.vertical}
                  className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 hover:border-zinc-700/60 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-zinc-200 truncate">
                      {ind.vertical}
                    </h3>
                    <span className="text-xs text-zinc-500 font-mono ml-2 shrink-0">
                      {ind.count} biz
                    </span>
                  </div>

                  {/* Score bar */}
                  <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden mb-2">
                    <div
                      className={clsx(
                        'absolute inset-y-0 left-0 rounded-full transition-all',
                        ind.avg_score >= 90
                          ? 'bg-emerald-500'
                          : ind.avg_score >= 75
                            ? 'bg-yellow-500'
                            : ind.avg_score >= 60
                              ? 'bg-zinc-400'
                              : ind.avg_score >= 40
                                ? 'bg-amber-600'
                                : 'bg-zinc-600'
                      )}
                      style={{ width: `${ind.avg_score}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    Avg score:{' '}
                    <span className="text-zinc-300 font-mono">{ind.avg_score}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Analytics — Search Queries & Event Breakdown */}
        {/* ----------------------------------------------------------------- */}
        <section>
          <SectionHeader
            icon={Search}
            title="Platform Analytics"
            subtitle="API activity and agent search behavior"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Top Search Queries */}
            {data.topSearchQueries.length > 0 && (
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800/40">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Top Search Queries
                  </h3>
                </div>
                <div className="divide-y divide-zinc-800/30">
                  {data.topSearchQueries.map((q, i) => {
                    const maxCount = data.topSearchQueries[0]?.count || 1
                    return (
                      <div key={q.query + i} className="px-4 py-2.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-zinc-300 truncate mr-3">
                            {q.query}
                          </span>
                          <span className="text-xs text-zinc-500 font-mono shrink-0">
                            {q.count}
                          </span>
                        </div>
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600/60 rounded-full"
                            style={{
                              width: `${(q.count / maxCount) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Event Breakdown */}
            {Object.keys(data.eventBreakdown).length > 0 && (
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800/40">
                  <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Event Breakdown
                  </h3>
                </div>
                <div className="divide-y divide-zinc-800/30">
                  {Object.entries(data.eventBreakdown)
                    .sort(([, a], [, b]) => b - a)
                    .map(([eventType, count]) => {
                      const maxCount = Math.max(
                        ...Object.values(data.eventBreakdown)
                      )
                      return (
                        <div key={eventType} className="px-4 py-2.5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-zinc-300">
                              {formatEventName(eventType)}
                            </span>
                            <span className="text-xs text-zinc-500 font-mono">
                              {count.toLocaleString()}
                            </span>
                          </div>
                          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-zinc-600/60 rounded-full"
                              style={{
                                width: `${(count / maxCount) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}

            {/* Empty state for analytics */}
            {data.topSearchQueries.length === 0 &&
              Object.keys(data.eventBreakdown).length === 0 && (
                <div className="lg:col-span-2 rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-8 text-center">
                  <Search className="h-8 w-8 text-zinc-700 mx-auto mb-3" />
                  <p className="text-sm text-zinc-500">
                    No analytics events recorded this week.
                  </p>
                </div>
              )}
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* CTA */}
        {/* ----------------------------------------------------------------- */}
        <section className="relative rounded-xl border border-emerald-900/40 bg-gradient-to-br from-emerald-950/30 via-zinc-900/50 to-zinc-900/50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-2">
              Is your business agent-ready?
            </h2>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
              Get your free Agent Readiness Score in 60 seconds. See how AI
              agents discover, evaluate, and transact with your business.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Scan Your Business
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* Footer note */}
        {/* ----------------------------------------------------------------- */}
        <div className="text-center pb-8">
          <p className="text-[11px] text-zinc-700 font-mono">
            AgentHermes Verified Commerce Network &mdash; Weekly Digest &mdash;{' '}
            <Link
              href="/api/v1/digest"
              className="text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Raw JSON
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
