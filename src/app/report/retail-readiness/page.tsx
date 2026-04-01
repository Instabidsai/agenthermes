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
  ShoppingCart,
  Store,
  CreditCard,
  Package,
} from 'lucide-react'

export const revalidate = 3600

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Domains/name fragments that identify retail/e-commerce businesses */
const RETAIL_DOMAINS = [
  'walmart.com',
  'target.com',
  'amazon.com',
  'nike.com',
  'adidas.com',
  'shopify.com',
  'etsy.com',
  'ebay.com',
  'bestbuy.com',
  'costco.com',
  'homedepot.com',
  'lowes.com',
  'macys.com',
  'nordstrom.com',
  'sephora.com',
  'ulta.com',
  'wayfair.com',
  'chewy.com',
  'zappos.com',
  'wish.com',
  'shein.com',
  'aliexpress.com',
  'overstock.com',
  'kohls.com',
  'jcpenney.com',
  'gap.com',
  'hm.com',
  'zara.com',
  'uniqlo.com',
  'ikea.com',
  'kroger.com',
  'wholefoodsmarket.com',
  'instacart.com',
  'doordash.com',
  'ubereats.com',
  'grubhub.com',
  'bigcommerce.com',
  'squarespace.com',
  'wix.com',
  'woocommerce.com',
  'magento.com',
]

const RETAIL_VERTICALS = [
  'ecommerce',
  'e-commerce',
  'retail',
  'shop',
  'store',
  'marketplace',
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

interface RetailBusiness {
  name: string
  slug: string | null
  domain: string | null
  score: number
  tier: string
  vertical: string | null
  category: string | null
}

interface DimensionAvg {
  dimension: string
  label: string
  avg: number
}

interface PlatformStats {
  shopify: number
  woocommerce: number
  custom: number
  other: number
  total: number
}

interface ReportData {
  businesses: RetailBusiness[]
  totalCount: number
  avgScore: number
  medianScore: number
  bestBiz: RetailBusiness | null
  worstBiz: RetailBusiness | null
  tierCounts: Record<string, number>
  dimensions: DimensionAvg[]
  globalAvg: number
  platforms: PlatformStats
  onlineFirstAvg: number
  traditionalAvg: number
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

/** Online-first domains -- born digital, no legacy brick-and-mortar baggage */
const ONLINE_FIRST = [
  'shopify.com',
  'etsy.com',
  'ebay.com',
  'chewy.com',
  'wayfair.com',
  'wish.com',
  'shein.com',
  'aliexpress.com',
  'overstock.com',
  'instacart.com',
  'bigcommerce.com',
  'squarespace.com',
  'wix.com',
]

async function fetchRetailReport(): Promise<ReportData> {
  const db = getServiceClient()

  // Fetch all businesses
  const { data: allBizRaw } = await db
    .from('businesses')
    .select(
      'id, name, slug, domain, audit_score, audit_tier, vertical, category, capabilities'
    )
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

  // Filter retail businesses
  const retailSet = new Set<string>()
  const retailBiz: RetailBusiness[] = []

  for (const biz of allBiz) {
    const domain = (biz.domain as string) || ''
    const vertical = ((biz.vertical as string) || '').toLowerCase()
    const id = biz.id as string

    const isRetail =
      RETAIL_VERTICALS.includes(vertical) ||
      RETAIL_DOMAINS.some((d) => domain.includes(d))

    if (isRetail && !retailSet.has(id)) {
      retailSet.add(id)
      retailBiz.push({
        name: biz.name as string,
        slug: (biz.slug as string) ?? null,
        domain: (biz.domain as string) ?? null,
        score: (biz.audit_score as number) ?? 0,
        tier: (biz.audit_tier as string) ?? 'unaudited',
        vertical: (biz.vertical as string) ?? null,
        category: (biz.category as string) ?? null,
      })
    }
  }

  retailBiz.sort((a, b) => b.score - a.score)

  const totalCount = retailBiz.length
  const scores = retailBiz.map((b) => b.score)
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

  const bestBiz = retailBiz[0] ?? null
  const worstBiz =
    retailBiz.length > 1 ? retailBiz[retailBiz.length - 1] : null

  // Tier counts
  const tierCounts: Record<string, number> = {
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    unaudited: 0,
  }
  for (const biz of retailBiz) {
    const tier = biz.tier || 'unaudited'
    tierCounts[tier] = (tierCounts[tier] ?? 0) + 1
  }

  // Platform detection from capabilities or domain inference
  const platforms: PlatformStats = {
    shopify: 0,
    woocommerce: 0,
    custom: 0,
    other: 0,
    total: totalCount,
  }

  for (const biz of allBiz) {
    const domain = (biz.domain as string) || ''
    const caps = biz.capabilities as Record<string, any> | null
    const id = biz.id as string

    if (!retailSet.has(id)) continue

    const platformStr = (
      (caps?.platform as string) ||
      (caps?.ecommerce_platform as string) ||
      ''
    ).toLowerCase()

    if (
      platformStr.includes('shopify') ||
      domain.includes('shopify.com') ||
      domain.includes('.myshopify.com')
    ) {
      platforms.shopify++
    } else if (
      platformStr.includes('woocommerce') ||
      platformStr.includes('wordpress')
    ) {
      platforms.woocommerce++
    } else if (
      platformStr.includes('custom') ||
      platformStr === '' ||
      !platformStr
    ) {
      platforms.custom++
    } else {
      platforms.other++
    }
  }

  // Online-first vs Traditional gap
  const onlineFirstBiz = retailBiz.filter((b) =>
    ONLINE_FIRST.some((d) => b.domain?.includes(d))
  )
  const traditionalBiz = retailBiz.filter(
    (b) => !ONLINE_FIRST.some((d) => b.domain?.includes(d))
  )

  const onlineFirstAvg =
    onlineFirstBiz.length > 0
      ? Math.round(
          onlineFirstBiz.reduce((a, b) => a + b.score, 0) /
            onlineFirstBiz.length
        )
      : 0

  const traditionalAvg =
    traditionalBiz.length > 0
      ? Math.round(
          traditionalBiz.reduce((a, b) => a + b.score, 0) /
            traditionalBiz.length
        )
      : 0

  // Dimension averages
  const retailDomains = retailBiz
    .map((b) => b.domain)
    .filter((d): d is string => d !== null)

  const dimensions: DimensionAvg[] = []

  if (retailDomains.length > 0) {
    const { data: scanRaw } = await db
      .from('scan_results')
      .select('domain, dimensions')
      .in('domain', retailDomains)

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
    businesses: retailBiz,
    totalCount,
    avgScore,
    medianScore,
    bestBiz,
    worstBiz,
    tierCounts,
    dimensions,
    globalAvg,
    platforms,
    onlineFirstAvg,
    traditionalAvg,
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

export default async function RetailReadinessPage() {
  let data: ReportData

  try {
    data = await fetchRetailReport()
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
      platforms: { shopify: 0, woocommerce: 0, custom: 0, other: 0, total: 0 },
      onlineFirstAvg: 0,
      traditionalAvg: 0,
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
    platforms,
    onlineFirstAvg,
    traditionalAvg,
  } = data

  const top10 = businesses.slice(0, 10)
  const scoreDelta = avgScore - globalAvg
  const gapDelta = onlineFirstAvg - traditionalAvg

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
              Retail & E-Commerce{' '}
              <span className="text-emerald-500">Agent Readiness</span>
              <br />
              <span className="text-zinc-400 text-2xl sm:text-3xl lg:text-4xl">
                Q1 2026
              </span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-4">
              {totalCount > 0 ? (
                <>
                  Major retailers average{' '}
                  <span className="text-zinc-200 font-semibold">
                    {avgScore}/100
                  </span>
                  {' -- '}
                  {worstBiz
                    ? `${worstBiz.name} scores ${worstBiz.score}, invisible to AI agents.`
                    : 'most remain invisible to AI agents.'}
                </>
              ) : (
                'Industry data will populate as retail businesses are scanned.'
              )}
            </p>

            <p className="text-sm text-zinc-600 max-w-xl mx-auto">
              Based on {totalCount} retail and e-commerce businesses scanned
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
              label="Retail Average"
              value={`${avgScore}/100`}
              icon={<ShoppingCart className="h-5 w-5 text-emerald-500" />}
              subtext={`Global avg: ${globalAvg} | Median: ${medianScore}`}
            />
            <StatCard
              label="Retailers Scanned"
              value={String(totalCount)}
              icon={<Store className="h-5 w-5 text-blue-500" />}
              subtext="E-commerce & retail"
            />
            <StatCard
              label="Top Retailer"
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

      {/* Platform Detection */}
      {platforms.total > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Platform Detection"
              subtitle="What e-commerce platforms power these retailers"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                {
                  label: 'Shopify',
                  count: platforms.shopify,
                  color: 'text-green-400',
                  bgColor: 'bg-green-500/10 border-green-500/20',
                },
                {
                  label: 'WooCommerce',
                  count: platforms.woocommerce,
                  color: 'text-purple-400',
                  bgColor: 'bg-purple-500/10 border-purple-500/20',
                },
                {
                  label: 'Custom Built',
                  count: platforms.custom,
                  color: 'text-blue-400',
                  bgColor: 'bg-blue-500/10 border-blue-500/20',
                },
                {
                  label: 'Other',
                  count: platforms.other,
                  color: 'text-zinc-400',
                  bgColor: 'bg-zinc-500/10 border-zinc-500/20',
                },
              ].map((p) => {
                const pct =
                  platforms.total > 0
                    ? Math.round((p.count / platforms.total) * 100)
                    : 0
                return (
                  <div
                    key={p.label}
                    className={`p-5 rounded-xl border ${p.bgColor} text-center`}
                  >
                    <div className={`text-2xl font-bold ${p.color}`}>
                      {p.count}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">{p.label}</div>
                    <div className="text-[10px] text-zinc-600 mt-0.5">
                      {pct}% of scanned
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Online-First vs Traditional Gap */}
      {(onlineFirstAvg > 0 || traditionalAvg > 0) && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="The Digital Divide"
              subtitle="Online-first retailers vs traditional brick-and-mortar"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Globe className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      Online-First
                    </h3>
                    <p className="text-[10px] text-zinc-600">
                      Etsy, Shopify, Chewy, Wayfair, etc.
                    </p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">
                  {onlineFirstAvg}/100
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scoreBarColor(onlineFirstAvg)}`}
                    style={{ width: `${onlineFirstAvg}%` }}
                  />
                </div>
              </div>

              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <Store className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      Traditional Retail
                    </h3>
                    <p className="text-[10px] text-zinc-600">
                      Walmart, Target, Nike, Macy&apos;s, etc.
                    </p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-amber-400 mb-2">
                  {traditionalAvg}/100
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scoreBarColor(traditionalAvg)}`}
                    style={{ width: `${traditionalAvg}%` }}
                  />
                </div>
              </div>
            </div>

            {gapDelta !== 0 && (
              <div className="mt-6 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-zinc-300 leading-relaxed">
                    <span className="font-semibold text-zinc-100">
                      {Math.abs(gapDelta)}-point gap:
                    </span>{' '}
                    {gapDelta > 0
                      ? `Online-first retailers lead traditional retail by ${gapDelta} points. Digital natives build APIs and structured data from day one. Legacy retailers built websites for humans and are now scrambling to make them agent-readable.`
                      : `Traditional retailers are surprisingly ${Math.abs(gapDelta)} points ahead. Their investment in structured product data and API commerce is paying off for agent readiness.`}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ARL Distribution */}
      {totalCount > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="ARL Distribution"
              subtitle="How retailers distribute across Agent Readiness Levels"
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
              subtitle="Where retail scores highest and lowest across 9 dimensions"
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

            <div className="mt-8 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-zinc-300 leading-relaxed">
                  <span className="font-semibold text-zinc-100">
                    Retail&apos;s agent blindspot:
                  </span>{' '}
                  Retailers invest billions in human-facing e-commerce but
                  almost nothing in agent-facing commerce. Product catalogs
                  lack structured pricing for agent comparison. Payment flows
                  require human interaction. Most retailers have no machine-readable
                  service descriptions at all -- they are invisible to the next
                  generation of AI shopping agents.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top 10 Retail Leaderboard */}
      {top10.length > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <SectionHeading
                title="Top 10 Retail Leaderboard"
                subtitle="Highest-scoring retail and e-commerce businesses"
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
            Is Your Store{' '}
            <span className="text-emerald-500">Agent-Ready</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-6 max-w-lg mx-auto">
            Free scan. 60 seconds. See how your store compares to the retail
            benchmarks above.
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
