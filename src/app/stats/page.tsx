import { getServiceClient } from '@/lib/supabase'
import {
  BarChart3,
  Building2,
  ScanLine,
  TrendingUp,
  Zap,
  Network,
  Clock,
  Activity,
} from 'lucide-react'

export const revalidate = 60

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

interface PlatformStats {
  totalBusinesses: number
  totalScans: number
  avgScore: number
  tierDistribution: { tier: string; count: number; pct: number }[]
  topVerticals: { vertical: string; count: number; avgScore: number }[]
  gatewayCalls: number
  gatewayServicesConnected: number
  analyticsEvents: number
  lastScanAt: string | null
}

const TIER_ORDER = ['platinum', 'gold', 'silver', 'bronze', 'unaudited'] as const
const TIER_LABELS: Record<string, string> = {
  platinum: 'Platinum',
  gold: 'Gold',
  silver: 'Silver',
  bronze: 'Bronze',
  unaudited: 'Not Scored',
}
const TIER_COLORS: Record<string, string> = {
  platinum: 'bg-violet-500',
  gold: 'bg-yellow-500',
  silver: 'bg-zinc-400',
  bronze: 'bg-amber-700',
  unaudited: 'bg-zinc-700',
}
const TIER_TEXT_COLORS: Record<string, string> = {
  platinum: 'text-violet-400',
  gold: 'text-yellow-400',
  silver: 'text-zinc-300',
  bronze: 'text-amber-600',
  unaudited: 'text-zinc-500',
}

async function fetchStats(): Promise<PlatformStats> {
  const db = getServiceClient()

  // --- 1. Total businesses ---
  const { count: totalBusinesses } = await db
    .from('businesses')
    .select('id', { count: 'exact', head: true })

  // --- 2. Total scans (audit_results rows / 5 per scan = one scan set) ---
  const { count: totalAuditRows } = await db
    .from('audit_results')
    .select('id', { count: 'exact', head: true })
  // Each scan produces 5 audit_results rows (one per category)
  const totalScans = Math.ceil((totalAuditRows ?? 0) / 5)

  // --- 3. Average score + tier distribution ---
  const { data: businessesRaw } = await db
    .from('businesses')
    .select('audit_score, audit_tier, vertical')

  const businesses = (businessesRaw || []) as Array<Record<string, unknown>>

  const scoredBiz = businesses.filter(
    (b) => typeof b.audit_score === 'number' && (b.audit_score as number) > 0
  )
  const avgScore =
    scoredBiz.length > 0
      ? Math.round(
          (scoredBiz.reduce((s, b) => s + (b.audit_score as number), 0) /
            scoredBiz.length) *
            10
        ) / 10
      : 0

  // Tier counts
  const tierCounts: Record<string, number> = {}
  for (const b of businesses) {
    const tier = (b.audit_tier as string) || 'unaudited'
    tierCounts[tier] = (tierCounts[tier] || 0) + 1
  }
  const total = businesses.length || 1
  const tierDistribution = TIER_ORDER.map((tier) => ({
    tier,
    count: tierCounts[tier] || 0,
    pct: Math.round(((tierCounts[tier] || 0) / total) * 1000) / 10,
  }))

  // --- 4. Top verticals ---
  const verticalMap: Record<string, { count: number; totalScore: number }> = {}
  for (const b of businesses) {
    const v = (b.vertical as string) || 'Uncategorized'
    if (!verticalMap[v]) verticalMap[v] = { count: 0, totalScore: 0 }
    verticalMap[v].count++
    verticalMap[v].totalScore += (b.audit_score as number) || 0
  }
  const topVerticals = Object.entries(verticalMap)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 10)
    .map(([vertical, data]) => ({
      vertical,
      count: data.count,
      avgScore: data.count > 0 ? Math.round((data.totalScore / data.count) * 10) / 10 : 0,
    }))

  // --- 5. Gateway stats ---
  const { count: gatewayCalls } = await db
    .from('gateway_usage')
    .select('id', { count: 'exact', head: true })

  const { count: gatewayServicesConnected } = await db
    .from('gateway_services')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'active')

  // --- 6. Analytics events (MCP connections / overall platform activity) ---
  const { count: analyticsEvents } = await db
    .from('analytics_events')
    .select('id', { count: 'exact', head: true })

  // --- 7. Last scan timestamp ---
  const { data: lastScanRaw } = await db
    .from('audit_results')
    .select('audited_at')
    .order('audited_at', { ascending: false })
    .limit(1)
    .single()

  const lastScanAt = ((lastScanRaw as unknown) as Record<string, unknown> | null)?.audited_at as string | null

  return {
    totalBusinesses: totalBusinesses ?? 0,
    totalScans,
    avgScore,
    tierDistribution,
    topVerticals,
    gatewayCalls: gatewayCalls ?? 0,
    gatewayServicesConnected: gatewayServicesConnected ?? 0,
    analyticsEvents: analyticsEvents ?? 0,
    lastScanAt: lastScanAt ?? null,
  }
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function BigStat({
  label,
  value,
  icon: Icon,
  color,
  subtext,
}: {
  label: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  color: string
  subtext?: string
}) {
  return (
    <div className="p-5 sm:p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors">
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>
        <span className="text-[10px] sm:text-xs text-zinc-500 font-medium uppercase tracking-wider leading-tight">
          {label}
        </span>
      </div>
      <div className="text-3xl sm:text-4xl font-bold tracking-tight tabular-nums text-zinc-100">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      {subtext && (
        <p className="text-[11px] text-zinc-600 mt-1.5">{subtext}</p>
      )}
    </div>
  )
}

function TierBar({
  tier,
  count,
  pct,
  maxPct,
}: {
  tier: string
  count: number
  pct: number
  maxPct: number
}) {
  const barWidth = maxPct > 0 ? (pct / maxPct) * 100 : 0
  return (
    <div className="flex items-center gap-3 py-2">
      <span
        className={`w-24 sm:w-28 text-sm font-medium ${TIER_TEXT_COLORS[tier] || 'text-zinc-400'}`}
      >
        {TIER_LABELS[tier] || tier}
      </span>
      <div className="flex-1 h-5 bg-zinc-800/60 rounded-md overflow-hidden relative">
        <div
          className={`h-full rounded-md transition-all ${TIER_COLORS[tier] || 'bg-zinc-600'}`}
          style={{ width: `${Math.max(barWidth, count > 0 ? 2 : 0)}%` }}
        />
      </div>
      <div className="flex items-center gap-2 min-w-[5rem] justify-end">
        <span className="text-sm font-semibold tabular-nums text-zinc-200">
          {count}
        </span>
        <span className="text-xs text-zinc-600 tabular-nums w-12 text-right">
          {pct}%
        </span>
      </div>
    </div>
  )
}

function formatTimestamp(iso: string | null): string {
  if (!iso) return 'Never'
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHr = Math.floor(diffMs / 3600000)
  const diffDay = Math.floor(diffMs / 86400000)

  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  if (diffDay < 7) return `${diffDay}d ago`

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function StatsPage() {
  const stats = await fetchStats()
  const maxTierPct = Math.max(...stats.tierDistribution.map((t) => t.pct), 1)

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Platform Stats
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 sm:ml-[52px]">
          <p className="text-sm text-zinc-500">
            Real numbers from the AgentHermes network. No vanity metrics.
          </p>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/8 border border-emerald-500/15 w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-subtle-pulse" />
            <span className="text-[10px] font-medium text-emerald-400/80 tracking-wide">
              UPDATED EVERY 60s
            </span>
          </div>
        </div>
      </div>

      {/* Big Number Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
        <BigStat
          label="Businesses Scored"
          value={stats.totalBusinesses}
          icon={Building2}
          color="bg-emerald-500/10 text-emerald-400"
          subtext="Registered in the network"
        />
        <BigStat
          label="Scans Run"
          value={stats.totalScans}
          icon={ScanLine}
          color="bg-blue-500/10 text-blue-400"
          subtext="9-dimension readiness scans"
        />
        <BigStat
          label="Avg Score"
          value={stats.avgScore}
          icon={TrendingUp}
          color="bg-amber-500/10 text-amber-400"
          subtext="Across all scored businesses"
        />
        <BigStat
          label="Last Scan"
          value={formatTimestamp(stats.lastScanAt)}
          icon={Clock}
          color="bg-zinc-700/60 text-zinc-300"
          subtext={
            stats.lastScanAt
              ? new Date(stats.lastScanAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : undefined
          }
        />
      </div>

      {/* Gateway + MCP row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
        <BigStat
          label="Gateway Calls"
          value={stats.gatewayCalls}
          icon={Zap}
          color="bg-violet-500/10 text-violet-400"
          subtext="Total API proxy calls"
        />
        <BigStat
          label="Services Connected"
          value={stats.gatewayServicesConnected}
          icon={Network}
          color="bg-violet-500/10 text-violet-400"
          subtext="Active gateway services"
        />
        <BigStat
          label="Analytics Events"
          value={stats.analyticsEvents}
          icon={Activity}
          color="bg-cyan-500/10 text-cyan-400"
          subtext="Profile views, searches, MCP hits"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
        {/* Tier Distribution — takes 3 cols */}
        <div className="lg:col-span-3 p-5 sm:p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="h-4 w-4 text-zinc-500" />
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              Score Distribution by Tier
            </h2>
          </div>

          <div className="space-y-1">
            {stats.tierDistribution.map((t) => (
              <TierBar
                key={t.tier}
                tier={t.tier}
                count={t.count}
                pct={t.pct}
                maxPct={maxTierPct}
              />
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-600">
            <span>
              Tiers: Platinum 90+ | Gold 75+ | Silver 60+ | Bronze 40+ | Not Scored &lt;40
            </span>
            <span className="tabular-nums">{stats.totalBusinesses} total</span>
          </div>
        </div>

        {/* Vertical Breakdown — takes 2 cols */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="h-4 w-4 text-zinc-500" />
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              Most Active Verticals
            </h2>
          </div>

          {stats.topVerticals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-2 pr-3 text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
                      Vertical
                    </th>
                    <th className="text-right py-2 px-3 text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
                      Count
                    </th>
                    <th className="text-right py-2 pl-3 text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
                      Avg Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topVerticals.map((v, i) => (
                    <tr
                      key={v.vertical}
                      className="border-b border-zinc-800/40 hover:bg-zinc-800/20 transition-colors"
                    >
                      <td className="py-2.5 pr-3 text-zinc-300 text-xs">
                        <span className="inline-flex items-center gap-2">
                          <span className="text-zinc-600 font-mono text-[10px] w-4 text-right">
                            {i + 1}
                          </span>
                          {v.vertical.charAt(0).toUpperCase() +
                            v.vertical.slice(1).replace(/-/g, ' ')}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-zinc-200 tabular-nums font-medium text-xs">
                        {v.count}
                      </td>
                      <td className="py-2.5 pl-3 text-right tabular-nums text-xs">
                        <span
                          className={
                            v.avgScore >= 75
                              ? 'text-emerald-400'
                              : v.avgScore >= 60
                                ? 'text-yellow-400'
                                : v.avgScore >= 40
                                  ? 'text-amber-500'
                                  : 'text-zinc-500'
                          }
                        >
                          {v.avgScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-zinc-600 text-center py-8">
              No verticals tracked yet.
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
        <p>
          All data sourced from the AgentHermes production database. This page uses ISR and
          revalidates every 60 seconds.
        </p>
        <a
          href="/audit"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
        >
          <ScanLine className="h-3.5 w-3.5" />
          Get Your Score
        </a>
      </div>
    </div>
  )
}
