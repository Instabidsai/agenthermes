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
  DollarSign,
  Shield,
  CreditCard,
  Landmark,
  Wallet,
  Scale,
  UserCheck,
} from 'lucide-react'

export const revalidate = 3600

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Domains that identify fintech & insurance businesses */
const FINTECH_DOMAINS = [
  'stripe.com',
  'paypal.com',
  'venmo.com',
  'coinbase.com',
  'robinhood.com',
  'wise.com',
  'revolut.com',
  'cashapp.com',
  'square.com',
  'plaid.com',
  'brex.com',
  'mercury.com',
  'ramp.com',
  'affirm.com',
  'klarna.com',
  'afterpay.com',
  'sofi.com',
  'chime.com',
  'wealthfront.com',
  'betterment.com',
  'blockchain.com',
  'binance.com',
  'kraken.com',
  'gemini.com',
]

const INSURANCE_DOMAINS = [
  'lemonade.com',
  'geico.com',
  'progressive.com',
  'allstate.com',
  'usaa.com',
  'statefarm.com',
  'nationwide.com',
  'libertymutual.com',
  'farmers.com',
  'travelers.com',
  'metlife.com',
  'prudential.com',
  'root.com',
  'hippo.com',
  'next-insurance.com',
]

const FINTECH_VERTICALS = ['fintech', 'finance', 'banking', 'payments', 'crypto']
const INSURANCE_VERTICALS = ['insurance', 'insurtech']

/** Payment-focused companies */
const PAYMENT_DOMAINS = [
  'stripe.com',
  'paypal.com',
  'venmo.com',
  'cashapp.com',
  'square.com',
  'wise.com',
  'revolut.com',
  'affirm.com',
  'klarna.com',
  'afterpay.com',
  'plaid.com',
  'brex.com',
  'mercury.com',
  'ramp.com',
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

interface FintechBusiness {
  name: string
  slug: string | null
  domain: string | null
  score: number
  tier: string
  vertical: string | null
  isPayment: boolean
  isInsurance: boolean
}

interface DimensionAvg {
  dimension: string
  label: string
  avg: number
}

interface SpreadExample {
  highName: string
  highScore: number
  highTier: string
  lowName: string
  lowScore: number
  lowTier: string
  gap: number
}

interface ReportData {
  businesses: FintechBusiness[]
  totalCount: number
  avgScore: number
  medianScore: number
  bestBiz: FintechBusiness | null
  worstBiz: FintechBusiness | null
  tierCounts: Record<string, number>
  dimensions: DimensionAvg[]
  globalAvg: number
  paymentAvg: number
  insuranceAvg: number
  paymentCount: number
  insuranceCount: number
  spread: SpreadExample | null
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function fetchFintechReport(): Promise<ReportData> {
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

  // Filter fintech + insurance businesses
  const ftSet = new Set<string>()
  const ftBiz: FintechBusiness[] = []

  for (const biz of allBiz) {
    const domain = (biz.domain as string) || ''
    const vertical = ((biz.vertical as string) || '').toLowerCase()
    const id = biz.id as string

    const isFintech =
      FINTECH_VERTICALS.some((v) => vertical.includes(v)) ||
      INSURANCE_VERTICALS.some((v) => vertical.includes(v)) ||
      FINTECH_DOMAINS.some((d) => domain.includes(d)) ||
      INSURANCE_DOMAINS.some((d) => domain.includes(d))

    if (isFintech && !ftSet.has(id)) {
      ftSet.add(id)
      ftBiz.push({
        name: biz.name as string,
        slug: (biz.slug as string) ?? null,
        domain: (biz.domain as string) ?? null,
        score: (biz.audit_score as number) ?? 0,
        tier: (biz.audit_tier as string) ?? 'unaudited',
        vertical: (biz.vertical as string) ?? null,
        isPayment: PAYMENT_DOMAINS.some((d) => domain.includes(d)),
        isInsurance: INSURANCE_DOMAINS.some((d) => domain.includes(d)) ||
          INSURANCE_VERTICALS.some((v) => vertical.includes(v)),
      })
    }
  }

  ftBiz.sort((a, b) => b.score - a.score)

  const totalCount = ftBiz.length
  const scores = ftBiz.map((b) => b.score)
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

  const bestBiz = ftBiz[0] ?? null
  const worstBiz = ftBiz.length > 1 ? ftBiz[ftBiz.length - 1] : null

  // Tier counts
  const tierCounts: Record<string, number> = {
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    unaudited: 0,
  }
  for (const biz of ftBiz) {
    const tier = biz.tier || 'unaudited'
    tierCounts[tier] = (tierCounts[tier] ?? 0) + 1
  }

  // Payment vs Insurance comparison
  const paymentBiz = ftBiz.filter((b) => b.isPayment)
  const insuranceBiz = ftBiz.filter((b) => b.isInsurance)

  const paymentAvg =
    paymentBiz.length > 0
      ? Math.round(
          paymentBiz.reduce((a, b) => a + b.score, 0) / paymentBiz.length
        )
      : 0

  const insuranceAvg =
    insuranceBiz.length > 0
      ? Math.round(
          insuranceBiz.reduce((a, b) => a + b.score, 0) / insuranceBiz.length
        )
      : 0

  // Find the biggest same-industry spread (insurance companies specifically)
  let spread: SpreadExample | null = null
  if (insuranceBiz.length >= 2) {
    const insHigh = insuranceBiz.reduce((a, b) =>
      a.score > b.score ? a : b
    )
    const insLow = insuranceBiz.reduce((a, b) =>
      a.score < b.score ? a : b
    )
    if (insHigh.score !== insLow.score) {
      spread = {
        highName: insHigh.name,
        highScore: insHigh.score,
        highTier: insHigh.tier,
        lowName: insLow.name,
        lowScore: insLow.score,
        lowTier: insLow.tier,
        gap: insHigh.score - insLow.score,
      }
    }
  }

  // Dimension averages
  const ftDomains = ftBiz
    .map((b) => b.domain)
    .filter((d): d is string => d !== null)

  const dimensions: DimensionAvg[] = []

  if (ftDomains.length > 0) {
    const { data: scanRaw } = await db
      .from('scan_results')
      .select('domain, dimensions')
      .in('domain', ftDomains)

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
    businesses: ftBiz,
    totalCount,
    avgScore,
    medianScore,
    bestBiz,
    worstBiz,
    tierCounts,
    dimensions,
    globalAvg,
    paymentAvg,
    insuranceAvg,
    paymentCount: paymentBiz.length,
    insuranceCount: insuranceBiz.length,
    spread,
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

export default async function FintechReadinessPage() {
  let data: ReportData

  try {
    data = await fetchFintechReport()
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
      paymentAvg: 0,
      insuranceAvg: 0,
      paymentCount: 0,
      insuranceCount: 0,
      spread: null,
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
    paymentAvg,
    insuranceAvg,
    paymentCount,
    insuranceCount,
    spread,
  } = data

  const top10 = businesses.slice(0, 10)
  const scoreDelta = avgScore - globalAvg
  const payInsGap = paymentAvg - insuranceAvg

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
              Fintech & Insurance{' '}
              <span className="text-emerald-500">Agent Readiness</span>
              <br />
              <span className="text-zinc-400 text-2xl sm:text-3xl lg:text-4xl">
                Q1 2026
              </span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-4">
              {totalCount > 0 ? (
                <>
                  Fintech and insurance average{' '}
                  <span className="text-zinc-200 font-semibold">
                    {avgScore}/100
                  </span>
                  {' -- '}
                  {spread
                    ? `${spread.highName} at ${spread.highScore} vs ${spread.lowName} at ${spread.lowScore} shows a ${spread.gap}-point gap in the same industry.`
                    : 'payment companies lead, but insurance lags behind.'}
                </>
              ) : (
                'Industry data will populate as fintech and insurance businesses are scanned.'
              )}
            </p>

            <p className="text-sm text-zinc-600 max-w-xl mx-auto">
              Based on {totalCount} fintech and insurance businesses scanned
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
              label="Fintech Average"
              value={`${avgScore}/100`}
              icon={<DollarSign className="h-5 w-5 text-emerald-500" />}
              subtext={`Global avg: ${globalAvg} | Median: ${medianScore}`}
            />
            <StatCard
              label="Companies Scanned"
              value={String(totalCount)}
              icon={<Landmark className="h-5 w-5 text-blue-500" />}
              subtext={`${paymentCount} payment, ${insuranceCount} insurance`}
            />
            <StatCard
              label="Top Fintech"
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

      {/* The Spread */}
      {spread && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="The Spread"
              subtitle={`${spread.gap}-point gap between insurers in the same industry`}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      {spread.highName}
                    </h3>
                    <p className="text-[10px] text-zinc-600 capitalize">
                      {spread.highTier === 'unaudited'
                        ? 'Not Scored'
                        : spread.highTier}{' '}
                      tier
                    </p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">
                  {spread.highScore}/100
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scoreBarColor(spread.highScore)}`}
                    style={{ width: `${spread.highScore}%` }}
                  />
                </div>
              </div>

              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                    <TrendingDown className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      {spread.lowName}
                    </h3>
                    <p className="text-[10px] text-zinc-600 capitalize">
                      {spread.lowTier === 'unaudited'
                        ? 'Not Scored'
                        : spread.lowTier}{' '}
                      tier
                    </p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-red-400 mb-2">
                  {spread.lowScore}/100
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scoreBarColor(spread.lowScore)}`}
                    style={{ width: `${spread.lowScore}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-zinc-300 leading-relaxed">
                  <span className="font-semibold text-zinc-100">
                    Same industry, {spread.gap}-point gap:
                  </span>{' '}
                  {spread.highName} and {spread.lowName} sell the same product
                  -- insurance -- but their agent readiness could not be more
                  different. {spread.highName} at {spread.highScore} has
                  invested in structured APIs, machine-readable quotes, and
                  programmatic policy management. {spread.lowName} at{' '}
                  {spread.lowScore} relies on phone calls, PDF documents, and
                  human agents. When AI agents start shopping for insurance on
                  behalf of consumers, {spread.lowName} will be invisible.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Payment vs Insurance Comparison */}
      {(paymentAvg > 0 || insuranceAvg > 0) && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Payment Companies vs Insurance"
              subtitle="API-native fintech vs legacy insurance infrastructure"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <CreditCard className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      Payment Companies
                    </h3>
                    <p className="text-[10px] text-zinc-600">
                      Stripe, PayPal, Square, Wise, etc. ({paymentCount} scanned)
                    </p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {paymentAvg}/100
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scoreBarColor(paymentAvg)}`}
                    style={{ width: `${paymentAvg}%` }}
                  />
                </div>
              </div>

              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <Shield className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      Insurance Companies
                    </h3>
                    <p className="text-[10px] text-zinc-600">
                      GEICO, Allstate, Progressive, etc. ({insuranceCount}{' '}
                      scanned)
                    </p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-amber-400 mb-2">
                  {insuranceAvg}/100
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scoreBarColor(insuranceAvg)}`}
                    style={{ width: `${insuranceAvg}%` }}
                  />
                </div>
              </div>
            </div>

            {payInsGap !== 0 && (
              <div className="mt-6 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-zinc-300 leading-relaxed">
                    <span className="font-semibold text-zinc-100">
                      {Math.abs(payInsGap)}-point gap:
                    </span>{' '}
                    {payInsGap > 0
                      ? `Payment companies lead insurance by ${payInsGap} points. Stripe, PayPal, and Square were born as API-first platforms -- agent readiness is in their DNA. Insurance companies were built on actuarial tables, phone-based sales, and paper policies. The agent economy will reward companies that already speak API.`
                      : `Insurance companies are surprisingly ${Math.abs(payInsGap)} points ahead of payment companies. Their investment in digital quotes and online policy management is paying off for agent readiness.`}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* KYC/AML Considerations */}
      <section className="py-10 sm:py-14 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="KYC/AML & Agent Commerce"
            subtitle="Regulatory friction that affects agent-driven financial transactions"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: <UserCheck className="h-5 w-5 text-blue-400" />,
                title: 'Identity Verification',
                desc: 'KYC (Know Your Customer) requires photo ID, selfie matching, and address verification -- all designed for human interaction. Agents cannot hold up a driver\'s license. Fintech needs agent-compatible identity delegation: "acting on behalf of verified user X."',
              },
              {
                icon: <Scale className="h-5 w-5 text-amber-400" />,
                title: 'Transaction Monitoring',
                desc: 'AML (Anti-Money Laundering) rules require monitoring transaction patterns for suspicious activity. When an agent makes hundreds of micro-transactions per day, existing AML models flag them as anomalous. Financial institutions need agent-aware AML rules.',
              },
              {
                icon: <Wallet className="h-5 w-5 text-emerald-400" />,
                title: 'Agent Wallets',
                desc: 'The emerging pattern: agents operating with pre-funded wallets, spending limits, and programmatic approval workflows. Stripe\'s agent mode and x402 micropayments are early examples. Insurance needs programmatic quote-to-bind for agent commerce to work.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/60 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARL Distribution */}
      {totalCount > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="ARL Distribution"
              subtitle="How fintech and insurance distribute across Agent Readiness Levels"
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
              title="9-Dimension Breakdown"
              subtitle="Where fintech and insurance score highest and lowest"
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
                    Fintech&apos;s agent advantage:
                  </span>{' '}
                  Payment companies like Stripe and PayPal built developer-first
                  APIs from the start -- they are naturally closer to agent-ready
                  than almost any other industry. The gap is in insurance:
                  getting a quote still requires filling out long forms, calling
                  an agent, or navigating a portal built for humans. The first
                  insurers to offer programmatic, agent-accessible
                  quote-to-bind will capture outsized market share in the agent
                  economy.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top Fintech Leaderboard */}
      {top10.length > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <SectionHeading
                title="Top Fintech Leaderboard"
                subtitle="Highest-scoring fintech and insurance companies"
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
                        {biz.isPayment && (
                          <span className="text-[9px] font-medium text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                            Payment
                          </span>
                        )}
                        {biz.isInsurance && (
                          <span className="text-[9px] font-medium text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                            Insurance
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
            Is Your Fintech{' '}
            <span className="text-emerald-500">Agent-Ready</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-6 max-w-lg mx-auto">
            Free scan. 60 seconds. See how your company compares to the fintech
            and insurance benchmarks above.
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
