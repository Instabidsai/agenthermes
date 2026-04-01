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
  Heart,
  ShieldCheck,
  ShieldX,
  Stethoscope,
  Video,
  Building,
  ClipboardCheck,
} from 'lucide-react'

export const revalidate = 3600

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Domains that identify healthcare businesses */
const HEALTHCARE_DOMAINS = [
  'teladoc.com',
  'betterhelp.com',
  'zocdoc.com',
  'healthgrades.com',
  'goodrx.com',
  'hims.com',
  'ro.co',
  'mdlive.com',
  'amwell.com',
  'doctorondemand.com',
  'sesamecare.com',
  'nurx.com',
  'cerebral.com',
  'talkiatry.com',
  'onemedical.com',
  'carbon.health',
  'athenahealth.com',
  'practicefusion.com',
  'kareo.com',
  'webmd.com',
  'mayo.edu',
  'clevelandclinic.org',
  'kaiserpermanente.org',
  'unitedhealth.com',
  'cigna.com',
  'aetna.com',
  'anthem.com',
  'humana.com',
]

const HEALTHCARE_VERTICALS = ['healthcare', 'health', 'medical', 'telehealth', 'pharma']

/** Telehealth / digital-first providers */
const TELEHEALTH_DOMAINS = [
  'teladoc.com',
  'betterhelp.com',
  'mdlive.com',
  'amwell.com',
  'doctorondemand.com',
  'hims.com',
  'ro.co',
  'sesamecare.com',
  'nurx.com',
  'cerebral.com',
  'talkiatry.com',
  'carbon.health',
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

interface HealthcareBusiness {
  name: string
  slug: string | null
  domain: string | null
  score: number
  tier: string
  vertical: string | null
  isTelehealth: boolean
}

interface DimensionAvg {
  dimension: string
  label: string
  avg: number
}

interface ReportData {
  businesses: HealthcareBusiness[]
  totalCount: number
  avgScore: number
  medianScore: number
  bestBiz: HealthcareBusiness | null
  worstBiz: HealthcareBusiness | null
  tierCounts: Record<string, number>
  dimensions: DimensionAvg[]
  globalAvg: number
  telehealthAvg: number
  traditionalAvg: number
  telehealthCount: number
  traditionalCount: number
  arl0Count: number
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function fetchHealthcareReport(): Promise<ReportData> {
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

  // Filter healthcare businesses
  const hcSet = new Set<string>()
  const hcBiz: HealthcareBusiness[] = []

  for (const biz of allBiz) {
    const domain = (biz.domain as string) || ''
    const vertical = ((biz.vertical as string) || '').toLowerCase()
    const id = biz.id as string

    const isHealthcare =
      HEALTHCARE_VERTICALS.some((v) => vertical.includes(v)) ||
      HEALTHCARE_DOMAINS.some((d) => domain.includes(d))

    if (isHealthcare && !hcSet.has(id)) {
      hcSet.add(id)
      hcBiz.push({
        name: biz.name as string,
        slug: (biz.slug as string) ?? null,
        domain: (biz.domain as string) ?? null,
        score: (biz.audit_score as number) ?? 0,
        tier: (biz.audit_tier as string) ?? 'unaudited',
        vertical: (biz.vertical as string) ?? null,
        isTelehealth: TELEHEALTH_DOMAINS.some((d) => domain.includes(d)),
      })
    }
  }

  hcBiz.sort((a, b) => b.score - a.score)

  const totalCount = hcBiz.length
  const scores = hcBiz.map((b) => b.score)
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

  const bestBiz = hcBiz[0] ?? null
  const worstBiz = hcBiz.length > 1 ? hcBiz[hcBiz.length - 1] : null

  // ARL-0 count (score < 40 or unaudited)
  const arl0Count = hcBiz.filter(
    (b) => b.score < 40 || b.tier === 'unaudited'
  ).length

  // Tier counts
  const tierCounts: Record<string, number> = {
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    unaudited: 0,
  }
  for (const biz of hcBiz) {
    const tier = biz.tier || 'unaudited'
    tierCounts[tier] = (tierCounts[tier] ?? 0) + 1
  }

  // Telehealth vs traditional
  const telehealthBiz = hcBiz.filter((b) => b.isTelehealth)
  const traditionalBiz = hcBiz.filter((b) => !b.isTelehealth)

  const telehealthAvg =
    telehealthBiz.length > 0
      ? Math.round(
          telehealthBiz.reduce((a, b) => a + b.score, 0) / telehealthBiz.length
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
  const hcDomains = hcBiz
    .map((b) => b.domain)
    .filter((d): d is string => d !== null)

  const dimensions: DimensionAvg[] = []

  if (hcDomains.length > 0) {
    const { data: scanRaw } = await db
      .from('scan_results')
      .select('domain, dimensions')
      .in('domain', hcDomains)

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
    businesses: hcBiz,
    totalCount,
    avgScore,
    medianScore,
    bestBiz,
    worstBiz,
    tierCounts,
    dimensions,
    globalAvg,
    telehealthAvg,
    traditionalAvg,
    telehealthCount: telehealthBiz.length,
    traditionalCount: traditionalBiz.length,
    arl0Count,
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

export default async function HealthcareReadinessPage() {
  let data: ReportData

  try {
    data = await fetchHealthcareReport()
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
      telehealthAvg: 0,
      traditionalAvg: 0,
      telehealthCount: 0,
      traditionalCount: 0,
      arl0Count: 0,
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
    telehealthAvg,
    traditionalAvg,
    telehealthCount,
    traditionalCount,
    arl0Count,
  } = data

  const top10 = businesses.slice(0, 10)
  const scoreDelta = avgScore - globalAvg
  const teleGap = telehealthAvg - traditionalAvg
  const arl0Pct =
    totalCount > 0 ? Math.round((arl0Count / totalCount) * 100) : 0

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
              Healthcare{' '}
              <span className="text-emerald-500">Agent Readiness</span>
              <br />
              <span className="text-zinc-400 text-2xl sm:text-3xl lg:text-4xl">
                Q1 2026
              </span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-4">
              {totalCount > 0 ? (
                <>
                  Healthcare providers average{' '}
                  <span className="text-zinc-200 font-semibold">
                    {avgScore}/100
                  </span>
                  {' -- '}
                  {arl0Pct > 50
                    ? `${arl0Pct}% are invisible to AI agents. Insurance verification remains the #1 friction point.`
                    : 'telehealth is leading the way, but insurance verification blocks most agent workflows.'}
                </>
              ) : (
                'Industry data will populate as healthcare businesses are scanned.'
              )}
            </p>

            <p className="text-sm text-zinc-600 max-w-xl mx-auto">
              Based on {totalCount} healthcare businesses scanned across{' '}
              {dimensions.length} dimensions of agent readiness.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Healthcare Average"
              value={`${avgScore}/100`}
              icon={<Heart className="h-5 w-5 text-rose-500" />}
              subtext={`Global avg: ${globalAvg} | Median: ${medianScore}`}
            />
            <StatCard
              label="At ARL-0"
              value={`${arl0Pct}%`}
              icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
              subtext={`${arl0Count} of ${totalCount} providers`}
            />
            <StatCard
              label="Top Provider"
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

      {/* HIPAA Considerations */}
      <section className="py-10 sm:py-14 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="HIPAA & Agent Commerce"
            subtitle="What AI agents CAN and CANNOT do in healthcare"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-100">
                  Agents CAN
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Check provider availability and appointment slots',
                  'Compare pricing for self-pay services',
                  'Verify insurance network participation',
                  'Find in-network specialists by location',
                  'Read public provider ratings and reviews',
                  'Submit appointment requests (non-PHI)',
                  'Compare telehealth vs in-person options',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-zinc-400"
                  >
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                  <ShieldX className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-100">
                  Agents CANNOT (without BAA)
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Access patient medical records or PHI',
                  'Submit insurance claims on behalf of patients',
                  'Receive or store diagnosis information',
                  'Manage prescription refills with patient data',
                  'Access lab results or imaging reports',
                  'Handle billing with patient identifiers',
                  'Coordinate care across providers with PHI',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-zinc-400"
                  >
                    <span className="text-red-500 mt-0.5 flex-shrink-0">
                      -
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-zinc-300 leading-relaxed">
                <span className="font-semibold text-zinc-100">
                  The HIPAA paradox:
                </span>{' '}
                HIPAA compliance is often cited as the reason healthcare
                companies do not offer APIs -- but HIPAA does not prohibit agent
                access. It requires a Business Associate Agreement (BAA) and
                proper safeguards. The real blocker is that most healthcare
                companies never built programmatic interfaces in the first place.
                Agent-ready healthcare means offering non-PHI services (booking,
                pricing, availability) through structured APIs while maintaining
                HIPAA compliance for protected data.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Verification Friction */}
      <section className="py-10 sm:py-14 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Insurance Verification: The #1 Friction Point"
            subtitle="The single biggest barrier to agent-driven healthcare commerce"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: <ClipboardCheck className="h-5 w-5 text-amber-400" />,
                title: 'No Programmatic Eligibility',
                desc: 'Most providers require phone calls or portal logins to verify insurance eligibility. No API exists for agents to check coverage, copays, or deductibles in real-time.',
              },
              {
                icon: <Building className="h-5 w-5 text-blue-400" />,
                title: 'Network Data is Stale',
                desc: 'Insurance network directories are notoriously inaccurate. 30-50% of listed providers are not accepting new patients, wrong specialty, or out-of-network. Agents inherit this data quality problem.',
              },
              {
                icon: <Heart className="h-5 w-5 text-rose-400" />,
                title: 'Prior Auth Requires Humans',
                desc: 'Prior authorization -- required for many procedures and medications -- is a manual, phone-and-fax process. Until insurers offer programmatic prior auth, agents cannot complete the booking loop.',
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

      {/* Telehealth vs Traditional */}
      {(telehealthAvg > 0 || traditionalAvg > 0) && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Telehealth vs Traditional Providers"
              subtitle="Digital-first healthcare vs legacy provider systems"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Video className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      Telehealth Providers
                    </h3>
                    <p className="text-[10px] text-zinc-600">
                      Teladoc, BetterHelp, Hims, Ro, etc. ({telehealthCount}{' '}
                      scanned)
                    </p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">
                  {telehealthAvg}/100
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scoreBarColor(telehealthAvg)}`}
                    style={{ width: `${telehealthAvg}%` }}
                  />
                </div>
              </div>

              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <Stethoscope className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      Traditional Providers
                    </h3>
                    <p className="text-[10px] text-zinc-600">
                      Hospital systems, clinics, insurers ({traditionalCount}{' '}
                      scanned)
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

            {teleGap !== 0 && (
              <div className="mt-6 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-zinc-300 leading-relaxed">
                    <span className="font-semibold text-zinc-100">
                      {Math.abs(teleGap)}-point gap:
                    </span>{' '}
                    {teleGap > 0
                      ? `Telehealth providers lead traditional healthcare by ${teleGap} points. Digital-first companies like Hims and Ro built APIs and online booking from day one. Traditional health systems built for phone calls, fax machines, and in-person visits -- agent readiness was never in the blueprint.`
                      : `Traditional providers are surprisingly ${Math.abs(teleGap)} points ahead. Their investment in patient portals and health information exchanges is translating to better agent accessibility than expected.`}
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
              subtitle="How healthcare providers distribute across Agent Readiness Levels"
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
              subtitle="Where healthcare scores highest and lowest"
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
                    Healthcare&apos;s agent blindspot:
                  </span>{' '}
                  Healthcare built for phone calls and waiting rooms, not for
                  AI agents. Most providers lack structured pricing APIs,
                  programmatic appointment booking, and machine-readable service
                  catalogs. An agent trying to book a doctor&apos;s appointment
                  hits the same friction as calling the front desk -- except it
                  cannot wait on hold or navigate a phone tree.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top Healthcare Leaderboard */}
      {top10.length > 0 && (
        <section className="py-10 sm:py-14 border-t border-zinc-800/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <SectionHeading
                title="Top Healthcare Leaderboard"
                subtitle="Highest-scoring healthcare businesses for agent readiness"
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
                        {biz.isTelehealth && (
                          <span className="text-[9px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            Telehealth
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
            Is Your Practice{' '}
            <span className="text-emerald-500">Agent-Ready</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-6 max-w-lg mx-auto">
            Free scan. 60 seconds. See how your practice compares to the
            healthcare benchmarks above.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              Scan Your Practice
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
