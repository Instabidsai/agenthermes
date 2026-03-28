import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getServiceClient } from '@/lib/supabase'
import type { Business, Service, AuditResult } from '@/types/database'
import { clsx } from 'clsx'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'
import { RequestScanButton } from '@/components/RequestScanButton'
import {
  Globe,
  Zap,
  Network,
  TrendingUp,
  Shield,
  ExternalLink,
  Search,
  Wrench,
  BarChart3,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RotateCw,
} from 'lucide-react'
import { CountUp } from '@/components/CountUp'

export const revalidate = 60

interface BusinessWithRelations extends Business {
  services: Service[]
  audit_results: AuditResult[]
}

interface ScanHistoryEntry {
  date: string
  score: number
  tier: 'unaudited' | 'bronze' | 'silver' | 'gold' | 'platinum'
  delta: number | null
}

function tierFromScore(score: number): 'platinum' | 'gold' | 'silver' | 'bronze' | 'unaudited' {
  if (score >= 90) return 'platinum'
  if (score >= 75) return 'gold'
  if (score >= 60) return 'silver'
  if (score >= 40) return 'bronze'
  return 'unaudited'
}

async function getBusiness(slug: string): Promise<{
  business: BusinessWithRelations
  connectionsCount: number
  transactionVolume: number
  transactionCount: number
  scanHistory: ScanHistoryEntry[]
} | null> {
  const supabase = getServiceClient()

  const { data: businessRaw, error } = await supabase
    .from('businesses')
    .select('*, services(*), audit_results(*)')
    .eq('slug', slug)
    .single()
  const business = businessRaw as any

  if (error || !business) return null

  // Parallelize independent queries after initial business fetch
  const [connectionsRes, walletRes, allAuditsRes] = await Promise.all([
    supabase
      .from('connections')
      .select('*', { count: 'exact', head: true })
      .or(`business_a_id.eq.${business.id},business_b_id.eq.${business.id}`),
    supabase
      .from('agent_wallets')
      .select('id')
      .eq('business_id', business.id),
    supabase
      .from('audit_results')
      .select('score, max_score, audited_at')
      .eq('business_id', business.id)
      .order('audited_at', { ascending: false }),
  ])

  const connectionsCount = connectionsRes.count ?? 0
  const walletData = (walletRes.data || []) as any[]

  let transactionVolume = 0
  let transactionCount = 0

  if (walletData.length > 0) {
    const walletIds = walletData.map((w: any) => w.id)
    const { data: txnsRaw } = await supabase
      .from('transactions')
      .select('amount')
      .in('seller_wallet_id', walletIds)
      .eq('status', 'completed')
    const txns = (txnsRaw || []) as any[]

    if (txns.length > 0) {
      transactionCount = txns.length
      transactionVolume = txns.reduce((sum: number, t: any) => sum + (t.amount || 0), 0)
    }
  }

  // Build scan history from all audit results grouped by audited_at
  const allAudits = (allAuditsRes.data || []) as { score: number; max_score: number; audited_at: string }[]
  const dateMap = new Map<string, { totalScore: number; totalMax: number }>()
  for (const audit of allAudits) {
    const dateKey = audit.audited_at
    const existing = dateMap.get(dateKey)
    if (existing) {
      existing.totalScore += audit.score
      existing.totalMax += audit.max_score
    } else {
      dateMap.set(dateKey, { totalScore: audit.score, totalMax: audit.max_score })
    }
  }

  // Convert to sorted array (newest first), limit to 10
  const sortedDates = Array.from(dateMap.entries())
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
    .slice(0, 10)

  // Build history entries with deltas (compare each to the one after it in time, i.e. the previous scan)
  const scanHistory: ScanHistoryEntry[] = sortedDates.map(([date, { totalScore }], idx) => {
    const olderEntry = idx < sortedDates.length - 1 ? sortedDates[idx + 1] : null
    const delta = olderEntry ? totalScore - olderEntry[1].totalScore : null
    return {
      date,
      score: totalScore,
      tier: tierFromScore(totalScore),
      delta,
    }
  })

  return {
    business: business as BusinessWithRelations,
    connectionsCount,
    transactionVolume,
    transactionCount,
    scanHistory,
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = getServiceClient()
  const { data: nameData } = await supabase
    .from('businesses')
    .select('name')
    .eq('slug', slug)
    .single()
  const nameRow = nameData as any

  return {
    title: nameRow ? `${nameRow.name} | AgentHermes` : 'Business | AgentHermes',
  }
}

function StatCard({
  value,
  label,
  icon: Icon,
  accent,
}: {
  value: React.ReactNode
  label: string
  icon: typeof Shield
  accent?: boolean
}) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5">
      <Icon className="h-4 w-4 text-zinc-600 mb-2" />
      <p
        className={clsx(
          'text-2xl font-bold tabular-nums',
          accent ? 'text-emerald-400' : 'text-zinc-100'
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-zinc-500">{label}</p>
    </div>
  )
}

export default async function BusinessProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await getBusiness(slug)

  if (!result) {
    notFound()
  }

  const { business, connectionsCount, transactionVolume, transactionCount, scanHistory } = result
  const activeServices = business.services.filter((s) => s.status === 'active')

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": business.name,
    "url": business.domain ? `https://${business.domain}` : `https://agenthermes.ai/business/${slug}`,
    ...(business.description ? { "description": business.description } : {}),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": business.audit_score,
      "bestRating": 100,
      "worstRating": 0,
      "ratingCount": business.audit_results?.length || 1,
    },
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {business.name}
            </h1>
            <TierBadge tier={business.audit_tier} size="md" />
          </div>
          {business.domain && (
            <div className="flex items-center gap-3">
              <a
                href={`https://${business.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <Globe className="h-3.5 w-3.5" />
                {business.domain}
                <ExternalLink className="h-3 w-3" />
              </a>
              <RequestScanButton domain={business.domain} />
            </div>
          )}
          {business.description && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
              {business.description}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {business.vertical && (
              <span className="rounded-md bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-400 font-medium">
                {business.vertical}
              </span>
            )}
            {business.capabilities && business.capabilities.length > 0 &&
              business.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="rounded-md border border-zinc-800 bg-zinc-800/40 px-2.5 py-1 text-xs text-zinc-400"
                >
                  {cap}
                </span>
              ))}
          </div>
        </div>
        <div className="flex-shrink-0">
          <ScoreGauge score={business.audit_score} size="lg" />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          value={<CountUp target={business.audit_score} />}
          label="Agent Readiness Score"
          icon={Shield}
          accent
        />
        <StatCard
          value={business.trust_score}
          label="Trust Score (verification + history)"
          icon={Shield}
        />
        <StatCard
          value={`$${transactionVolume.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          label={`${transactionCount} transactions`}
          icon={TrendingUp}
          accent
        />
        <StatCard
          value={connectionsCount}
          label="Connections"
          icon={Network}
        />
      </div>

      {/* Score History */}
      {scanHistory.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-zinc-400" />
              Score History
            </h2>
            {business.domain && (
              <Link
                href={`/audit?domain=${business.domain}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-colors"
              >
                <RotateCw className="h-3 w-3" />
                Re-scan
              </Link>
            )}
          </div>

          {scanHistory.length === 1 ? (
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5">
              <p className="text-sm text-zinc-400">
                First scanned:{' '}
                <span className="text-zinc-200 font-medium">
                  {new Date(scanHistory[0].date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="ml-3">
                  <TierBadge tier={scanHistory[0].tier} size="sm" />
                </span>
              </p>
            </div>
          ) : (
            <div className="relative pl-6">
              {/* Vertical connecting line */}
              <div className="absolute left-[9px] top-2 bottom-2 w-px bg-zinc-800" />

              <div className="space-y-0">
                {scanHistory.map((entry, idx) => (
                  <div key={entry.date} className="relative flex items-start gap-4 pb-5 last:pb-0">
                    {/* Timeline dot */}
                    <div
                      className={clsx(
                        'absolute -left-6 top-1.5 h-[11px] w-[11px] rounded-full border-2',
                        idx === 0
                          ? 'bg-emerald-500 border-emerald-400'
                          : 'bg-zinc-800 border-zinc-600'
                      )}
                    />

                    {/* Date */}
                    <div className="min-w-[110px] pt-0.5">
                      <p className={clsx(
                        'text-xs tabular-nums',
                        idx === 0 ? 'text-zinc-300 font-medium' : 'text-zinc-500'
                      )}>
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>

                    {/* Score + tier + delta */}
                    <div className="flex items-center gap-3">
                      <span className={clsx(
                        'text-sm font-bold tabular-nums',
                        idx === 0 ? 'text-zinc-100' : 'text-zinc-400'
                      )}>
                        {entry.score}
                      </span>
                      <TierBadge tier={entry.tier} size="sm" />
                      {entry.delta !== null && entry.delta !== 0 && (
                        <span className={clsx(
                          'inline-flex items-center gap-0.5 text-xs font-medium tabular-nums',
                          entry.delta > 0 ? 'text-emerald-400' : 'text-red-400'
                        )}>
                          {entry.delta > 0 ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {entry.delta > 0 ? '+' : ''}{entry.delta}
                        </span>
                      )}
                      {entry.delta === 0 && (
                        <span className="inline-flex items-center gap-0.5 text-xs text-zinc-600">
                          <Minus className="h-3 w-3" />
                          0
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Services Table */}
      <Suspense fallback={
        <div className="mt-10">
          <div className="h-6 w-32 bg-zinc-800 rounded animate-pulse mb-4" />
          <div className="rounded-xl border border-zinc-800/80 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-4 border-b border-zinc-800/50 last:border-0">
                <div className="h-4 w-40 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                <div className="h-4 w-16 bg-zinc-800 rounded animate-pulse ml-auto" />
              </div>
            ))}
          </div>
        </div>
      }>
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">
          Services
          <span className="ml-2 text-sm font-normal text-zinc-500">
            ({activeServices.length})
          </span>
        </h2>
        {activeServices.length === 0 ? (
          <div className="py-10 text-center rounded-xl bg-zinc-900/30 border border-zinc-800/50">
            <p className="text-sm text-zinc-500">No services listed yet. Register and add your services to become discoverable by AI agents.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-800/80">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800/80 bg-zinc-900/50 text-[10px] uppercase tracking-wider text-zinc-500">
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Pricing</th>
                  <th className="px-4 py-3 font-medium text-right">Uptime</th>
                  <th className="px-4 py-3 font-medium text-right">Avg Response</th>
                  <th className="px-4 py-3 font-medium text-right">Usage (30d)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {activeServices.map((service) => (
                  <tr
                    key={service.id}
                    className="transition-colors hover:bg-zinc-800/20"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-zinc-200">
                          {service.name}
                        </p>
                        {service.description && (
                          <p className="mt-0.5 text-xs text-zinc-500 line-clamp-1">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-zinc-300 font-mono text-xs">
                        {service.pricing_model === 'per_call'
                          ? `$${service.price_per_call.toFixed(4)}/call`
                          : service.pricing_model === 'monthly'
                            ? `$${service.price_per_call.toFixed(2)}/mo`
                            : service.pricing_model}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={clsx(
                          'font-mono text-xs',
                          service.uptime_pct >= 99.5
                            ? 'text-emerald-400'
                            : service.uptime_pct >= 95
                              ? 'text-amber-400'
                              : 'text-red-400'
                        )}
                      >
                        {service.uptime_pct.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-zinc-300">
                      {service.avg_response_ms}ms
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-zinc-400">
                      {service.calls_last_30d.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </Suspense>

      {/* Audit Results */}
      {business.audit_results && business.audit_results.length > 0 && (
        <Suspense fallback={
          <div className="mt-10">
            <div className="h-6 w-40 bg-zinc-800 rounded animate-pulse mb-4" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5">
                  <div className="h-3 w-24 bg-zinc-800 rounded animate-pulse mb-3" />
                  <div className="h-6 w-16 bg-zinc-800 rounded animate-pulse mb-3" />
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        }>
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Score Breakdown</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {business.audit_results.map((audit) => {
              const pct = audit.max_score > 0 ? audit.score / audit.max_score : 0
              return (
                <div
                  key={audit.id}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5"
                >
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                    {audit.category.replace(/_/g, ' ')}
                  </p>
                  <p className="mt-1.5 text-lg font-bold tabular-nums">
                    {audit.score}
                    <span className="text-sm font-normal text-zinc-500">
                      {' '}/{' '}{audit.max_score}
                    </span>
                  </p>
                  <div className="mt-2.5 h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={clsx(
                        'h-full rounded-full transition-all',
                        pct >= 0.8
                          ? 'bg-emerald-500'
                          : pct >= 0.5
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                      )}
                      style={{ width: `${pct * 100}%` }}
                    />
                  </div>
                  {audit.recommendations && audit.recommendations.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {audit.recommendations.slice(0, 2).map((rec, i) => (
                        <li key={i} className="text-xs text-zinc-500 leading-relaxed">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        </Suspense>
      )}

      {/* MCP Endpoints */}
      {business.mcp_endpoints && business.mcp_endpoints.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-500" />
              MCP Endpoints
            </span>
          </h2>
          <div className="space-y-2">
            {business.mcp_endpoints.map((ep, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-zinc-800/80 bg-zinc-900/50 px-4 py-3"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-subtle-pulse" />
                <code className="text-sm text-zinc-300 font-mono">{ep}</code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTAs */}
      <div className="mt-14 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            Scan your own business
          </Link>
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors"
          >
            <Search className="h-4 w-4" />
            Browse more businesses
          </Link>
          {business.domain && (
            <Link
              href={`/remediate?domain=${business.domain}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors"
            >
              <Wrench className="h-4 w-4" />
              Improve this score
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
