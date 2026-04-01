import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getServiceClient } from '@/lib/supabase'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'
import AgentJourneyScore from '@/components/AgentJourneyScore'
import type { ARLData } from '@/components/AgentJourneyScore'
import TechnicalDetailsSection from '@/components/TechnicalDetailsSection'
import {
  ExternalLink,
  Copy,
  Wrench,
  BarChart3,
  Search,
  Clock,
  UserCheck,
  Shield,
} from 'lucide-react'
import { clsx } from 'clsx'

export const revalidate = 300 // ISR: 5 minutes

// -- Types -------------------------------------------------------------------

interface ScoreData {
  domain: string
  businessName: string | null
  score: number | null
  tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'unaudited'
  lastAudited: string | null
  categories: {
    category: string
    label: string
    score: number
    maxScore: number
  }[]
  dimensions: {
    dimension: string
    label: string
    score: number
    weight: number
  }[]
  arl: ARLData | null
  vertical: string | null
}

// -- Tier helpers ------------------------------------------------------------

const TIER_LABELS: Record<string, string> = {
  platinum: 'Agent-Native Leader',
  gold: 'Agent-Ready',
  silver: 'Agent-Usable with Friction',
  bronze: 'Minimal Agent Support',
  unaudited: 'Not Yet Scored',
}

const TIER_DESCRIPTIONS: Record<string, string> = {
  platinum:
    'This business is fully optimized for AI agent commerce with machine-readable profiles, live endpoints, and structured pricing.',
  gold: 'This business is agent-ready with strong API quality, security, and documentation, with minor gaps remaining.',
  silver:
    'AI agents can interact with this business but may encounter friction in onboarding or payments.',
  bronze:
    'This business has minimal agent support. Significant improvements needed for AI agent compatibility.',
  unaudited:
    'This business has not yet been scored. Request a scan to see how agent-ready it is.',
}

const DIMENSION_LABELS: Record<string, string> = {
  D1: 'Discoverability',
  D2: 'API Quality',
  D3: 'Onboarding',
  D4: 'Pricing Transparency',
  D5: 'Payment',
  D6: 'Data Quality',
  D7: 'Security',
  D8: 'Reliability',
  D9: 'Agent Experience',
}

const CATEGORY_LABELS: Record<string, string> = {
  machine_readable_profile: 'Machine-Readable Profile',
  mcp_api_endpoints: 'MCP / API Endpoints',
  agent_native_onboarding: 'Agent-Native Onboarding',
  structured_pricing: 'Structured Pricing',
  agent_payment_acceptance: 'Agent Payment Acceptance',
}

// -- Data fetching -----------------------------------------------------------

async function getScoreData(domain: string): Promise<ScoreData | null> {
  const supabase = getServiceClient()

  // Look up business by domain
  const { data: businessRaw, error: bizError } = await supabase
    .from('businesses')
    .select('id, name, slug, domain, audit_score, audit_tier, updated_at')
    .eq('domain', domain)
    .single()

  if (bizError && bizError.code !== 'PGRST116') {
    console.error('[score/page] Query error:', bizError.message)
    return null
  }

  if (!businessRaw) {
    // Return an unaudited shell so the page still renders
    return {
      domain,
      businessName: null,
      score: null,
      tier: 'unaudited',
      lastAudited: null,
      categories: [],
      dimensions: [],
      arl: null,
      vertical: null,
    }
  }

  const business = businessRaw as Record<string, any>

  // Fetch audit_results (5-category system)
  const { data: auditResultsRaw } = await supabase
    .from('audit_results')
    .select('category, score, max_score, audited_at')
    .eq('business_id', business.id)
    .order('audited_at', { ascending: false })

  const auditResults = (auditResultsRaw || []) as {
    category: string
    score: number
    max_score: number
    audited_at: string
  }[]

  // Deduplicate to latest per category
  const categoryMap = new Map<string, (typeof auditResults)[0]>()
  for (const result of auditResults) {
    const existing = categoryMap.get(result.category)
    if (!existing || result.audited_at > existing.audited_at) {
      categoryMap.set(result.category, result)
    }
  }

  const categories = Array.from(categoryMap.entries()).map(([cat, r]) => ({
    category: cat,
    label: CATEGORY_LABELS[cat] || cat.replace(/_/g, ' '),
    score: r.score,
    maxScore: r.max_score,
  }))

  // Fetch scan_results for the 9-dimension breakdown and ARL
  const { data: scanResultsRaw } = await supabase
    .from('scan_results')
    .select('dimensions, scanned_at, arl')
    .eq('domain', domain)
    .order('scanned_at', { ascending: false })
    .limit(1)
    .single()

  let dimensions: ScoreData['dimensions'] = []
  let arl: ARLData | null = null

  if (scanResultsRaw) {
    const scanResult = scanResultsRaw as Record<string, any>
    const rawDims = scanResult.dimensions as
      | { dimension: string; label: string; score: number; weight: number }[]
      | null

    if (Array.isArray(rawDims)) {
      dimensions = rawDims.map((d) => ({
        dimension: d.dimension,
        label: d.label || DIMENSION_LABELS[d.dimension] || d.dimension,
        score: d.score,
        weight: d.weight,
      }))
    }

    // ARL from persisted scan result
    if (scanResult.arl && typeof scanResult.arl === 'object') {
      arl = scanResult.arl as ARLData
    }

    // If no persisted ARL but we have dimensions, compute it on the fly
    if (!arl && dimensions.length > 0) {
      const { computeARL } = await import('@/lib/scanner/arl')
      arl = computeARL(
        dimensions.map(d => ({
          dimension: d.dimension,
          label: d.label,
          score: d.score,
          weight: d.weight,
          checks: [],
          recommendations: [],
        })),
        (business as Record<string, any>).vertical ?? undefined,
      )
    }
  }

  // Last audited timestamp
  const lastAudited =
    auditResults.length > 0
      ? auditResults.reduce(
          (latest, r) =>
            !latest || r.audited_at > latest ? r.audited_at : latest,
          '' as string
        )
      : null

  return {
    domain,
    businessName: business.name || null,
    score: business.audit_score ?? null,
    tier: business.audit_tier || 'unaudited',
    lastAudited,
    categories,
    dimensions,
    arl,
    vertical: (business as Record<string, any>).vertical ?? null,
  }
}

// -- Metadata ----------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>
}): Promise<Metadata> {
  const { domain } = await params
  const decodedDomain = decodeURIComponent(domain).toLowerCase().trim()
  const data = await getScoreData(decodedDomain)

  const displayName = data?.businessName || decodedDomain
  const scoreText =
    data?.score !== null && data?.score !== undefined
      ? `Score: ${data.score}/100`
      : 'Not Yet Scored'

  return {
    title: `${displayName} Agent Readiness Score | AgentHermes`,
    description: `${displayName} has an Agent Readiness Score of ${scoreText}. See the full breakdown across 9 dimensions of AI agent compatibility.`,
    openGraph: {
      title: `${displayName} — ${scoreText} | AgentHermes`,
      description: `See how agent-ready ${displayName} is. Full breakdown across API quality, security, reliability, and more.`,
      url: `https://agenthermes.ai/score/${encodeURIComponent(decodedDomain)}`,
      siteName: 'AgentHermes',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayName} — ${scoreText} | AgentHermes`,
      description: `Agent Readiness Score for ${displayName}. Full 9-dimension breakdown.`,
    },
    alternates: {
      canonical: `https://agenthermes.ai/score/${encodeURIComponent(decodedDomain)}`,
    },
  }
}

// -- Static generation -------------------------------------------------------

export async function generateStaticParams(): Promise<{ domain: string }[]> {
  try {
    const supabase = getServiceClient()
    const { data } = await supabase
      .from('businesses')
      .select('domain')
      .not('domain', 'is', null)
      .not('audit_score', 'is', null)
      .order('audit_score', { ascending: false })
      .limit(500)

    return ((data || []) as { domain: string }[])
      .filter((b) => b.domain)
      .map((b) => ({ domain: b.domain }))
  } catch {
    return []
  }
}

// -- Component helpers -------------------------------------------------------

function CategoryBar({
  label,
  score,
  maxScore,
}: {
  label: string
  score: number
  maxScore: number
}) {
  const pct = maxScore > 0 ? Math.min((score / maxScore) * 100, 100) : 0
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-zinc-300 font-medium">{label}</span>
        <span className="text-sm tabular-nums">
          <span
            className={clsx(
              'font-bold',
              pct >= 75
                ? 'text-emerald-400'
                : pct >= 50
                  ? 'text-yellow-400'
                  : pct >= 25
                    ? 'text-amber-400'
                    : 'text-red-400'
            )}
          >
            {score}
          </span>
          <span className="text-zinc-600"> / {maxScore}</span>
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-700',
            pct >= 75
              ? 'bg-emerald-500'
              : pct >= 50
                ? 'bg-yellow-500'
                : pct >= 25
                  ? 'bg-amber-500'
                  : 'bg-red-500'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function EmbedBadgeSection({ domain }: { domain: string }) {
  const badgeUrl = `https://agenthermes.ai/api/badge/${encodeURIComponent(domain)}`
  const scorePageUrl = `https://agenthermes.ai/score/${encodeURIComponent(domain)}`
  const embedCode = `<a href="${scorePageUrl}" target="_blank" rel="noopener noreferrer"><img src="${badgeUrl}" alt="Agent Readiness Score" height="28" /></a>`
  const iframeCode = `<iframe src="https://agenthermes.ai/api/badge/${encodeURIComponent(domain)}/embed" width="200" height="50" frameborder="0" scrolling="no"></iframe>`

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6">
      <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <Copy className="h-4 w-4 text-zinc-400" />
        Embeddable Badge
      </h2>
      <p className="text-sm text-zinc-500 mb-5">
        Add this badge to your website to show your Agent Readiness Score.
      </p>

      {/* Live badge preview — polished card */}
      <div className="mb-6">
        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Live Preview</p>
        <div className="flex flex-col gap-3">
          {/* Light background preview */}
          <div className="flex items-center justify-center rounded-xl bg-white p-6 border border-zinc-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={badgeUrl}
              alt={`Agent Readiness badge for ${domain}`}
              height={28}
              loading="lazy"
            />
          </div>
          {/* Dark background preview */}
          <div className="flex items-center justify-center rounded-xl bg-zinc-950 p-6 border border-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={badgeUrl}
              alt={`Agent Readiness badge for ${domain}`}
              height={28}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* HTML embed */}
      <div className="mb-4">
        <p className="text-xs text-zinc-500 mb-1.5 font-medium">HTML Embed</p>
        <div className="relative group">
          <pre className="rounded-lg bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-400 font-mono overflow-x-auto whitespace-pre-wrap break-all">
            {embedCode}
          </pre>
        </div>
      </div>

      {/* iframe embed */}
      <div>
        <p className="text-xs text-zinc-500 mb-1.5 font-medium">iframe Embed</p>
        <div className="relative group">
          <pre className="rounded-lg bg-zinc-950 border border-zinc-800 p-3 text-xs text-zinc-400 font-mono overflow-x-auto whitespace-pre-wrap break-all">
            {iframeCode}
          </pre>
        </div>
      </div>
    </div>
  )
}

// -- Page component ----------------------------------------------------------

export default async function ScorePage({
  params,
}: {
  params: Promise<{ domain: string }>
}) {
  const { domain } = await params
  const decodedDomain = decodeURIComponent(domain).toLowerCase().trim()

  // Basic domain validation
  if (
    !decodedDomain ||
    decodedDomain.length > 253 ||
    !/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/i.test(
      decodedDomain
    )
  ) {
    notFound()
  }

  const data = await getScoreData(decodedDomain)

  if (!data) {
    notFound()
  }

  const displayName = data.businessName || decodedDomain
  const score = data.score ?? 0
  const isUnaudited = data.tier === 'unaudited' || data.score === null

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: displayName,
    url: `https://${decodedDomain}`,
    ...(data.score !== null
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: data.score,
            bestRating: 100,
            worstRating: 0,
            ratingCount: Math.max(
              data.categories.length + data.dimensions.length,
              1
            ),
          },
        }
      : {}),
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
            { '@type': 'ListItem', position: 2, name: 'Score', item: `https://agenthermes.ai/score/${encodeURIComponent(domain)}` },
          ],
        }) }}
      />

      {/* ---- Hero: Score + Tier with radial gradient ---- */}
      <div className="relative flex flex-col items-center text-center mb-12 py-8 rounded-2xl overflow-hidden">
        {/* Radial gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isUnaudited
              ? 'radial-gradient(ellipse at center, rgba(113,113,122,0.08) 0%, transparent 70%)'
              : score >= 90
                ? 'radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 70%)'
                : score >= 75
                  ? 'radial-gradient(ellipse at center, rgba(234,179,8,0.10) 0%, transparent 70%)'
                  : score >= 60
                    ? 'radial-gradient(ellipse at center, rgba(161,161,170,0.08) 0%, transparent 70%)'
                    : score >= 40
                      ? 'radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%)'
                      : 'radial-gradient(ellipse at center, rgba(239,68,68,0.08) 0%, transparent 70%)',
          }}
        />

        {/* BIG centered score gauge */}
        <div className="relative mb-6">
          <ScoreGauge score={isUnaudited ? 0 : score} size="lg" />
        </div>

        {/* Large numeric score */}
        <div className={clsx(
          'relative text-6xl sm:text-7xl font-black tabular-nums tracking-tight mb-3',
          score >= 90 ? 'text-emerald-400' :
          score >= 75 ? 'text-yellow-500' :
          score >= 60 ? 'text-zinc-300' :
          score >= 40 ? 'text-amber-500' :
          isUnaudited ? 'text-zinc-600' : 'text-red-500',
        )}>
          {isUnaudited ? '--' : score}
          <span className="text-2xl text-zinc-600 font-semibold">/100</span>
        </div>

        <h1 className="relative text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          {displayName}
        </h1>

        {/* Tier badge with glow */}
        <div className="relative flex items-center gap-3 mb-4 flex-wrap justify-center">
          <TierBadge tier={data.tier} size="lg" />

          {/* ARL level visual meter */}
          {data.arl && (
            <div className={clsx(
              'inline-flex items-center gap-2.5 px-4 py-2 rounded-full border',
              data.arl.level >= 5 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' :
              data.arl.level >= 3 ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' :
              data.arl.level >= 1 ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' :
              'text-zinc-400 bg-zinc-500/10 border-zinc-500/30',
            )}>
              <Shield className="h-4 w-4" />
              <span className="text-sm font-bold">ARL-{data.arl.level}</span>
              {/* Mini progress meter */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 7 }, (_, i) => {
                  const arlColor = data.arl!.level >= 5 ? '#34d399' :
                    data.arl!.level >= 3 ? '#fbbf24' :
                    data.arl!.level >= 1 ? '#60a5fa' : '#71717a'
                  return (
                    <div
                      key={i}
                      className="h-2 w-2.5 rounded-sm"
                      style={i <= data.arl!.level
                        ? { backgroundColor: arlColor, opacity: 0.4 + (i / 6) * 0.6 }
                        : { backgroundColor: '#27272a' }
                      }
                    />
                  )
                })}
              </div>
              <span className="text-xs font-semibold">{data.arl.name}</span>
            </div>
          )}
        </div>

        <a
          href={`https://${decodedDomain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-3"
        >
          {decodedDomain}
          <ExternalLink className="h-3 w-3" />
        </a>

        <p className="relative max-w-lg text-sm text-zinc-500 leading-relaxed">
          {TIER_DESCRIPTIONS[data.tier] || TIER_DESCRIPTIONS.unaudited}
        </p>

        {data.arl?.verticalContext && (
          <p className="relative mt-2 max-w-lg text-sm text-zinc-400 leading-relaxed italic">
            {data.arl.verticalContext}
          </p>
        )}

        {data.lastAudited && (
          <p className="relative mt-3 flex items-center gap-1.5 text-xs text-zinc-600">
            <Clock className="h-3 w-3" />
            Last scanned{' '}
            {new Date(data.lastAudited).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>

      {/* ---- Agent Journey (6-step pipeline) ---- */}
      {data.dimensions.length > 0 && (
        <section className="mb-10">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6">
            <AgentJourneyScore
              dimensions={data.dimensions.map((d) => ({
                dimension: d.dimension,
                score: d.score,
              }))}
              arl={data.arl ?? undefined}
            />
          </div>
        </section>
      )}

      {/* ---- Technical Details (9-dimension breakdown, expandable) ---- */}
      {data.dimensions.length > 0 && (
        <TechnicalDetailsSection dimensions={data.dimensions} />
      )}

      {/* ---- 5-Category Audit Results (fallback / legacy) ---- */}
      {data.categories.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-zinc-400" />
            Audit Category Breakdown
          </h2>
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6 space-y-4">
            {data.categories.map((c) => (
              <CategoryBar
                key={c.category}
                label={c.label}
                score={c.score}
                maxScore={c.maxScore}
              />
            ))}
          </div>
        </section>
      )}

      {/* ---- No Data State ---- */}
      {isUnaudited && data.dimensions.length === 0 && data.categories.length === 0 && (
        <section className="mb-10">
          <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/30 p-10 text-center">
            <Search className="h-8 w-8 text-zinc-600 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-zinc-300 mb-2">
              No score data yet
            </h2>
            <p className="text-sm text-zinc-500 mb-5 max-w-md mx-auto">
              {decodedDomain} has not been scanned. Run a free Agent Readiness
              scan to see how AI agents can interact with this business.
            </p>
            <Link
              href={`/audit?domain=${encodeURIComponent(decodedDomain)}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              Scan {decodedDomain}
            </Link>
          </div>
        </section>
      )}

      {/* ---- Embeddable Badge ---- */}
      <section className="mb-10">
        <EmbedBadgeSection domain={decodedDomain} />
      </section>

      {/* ---- Claim CTA — Prominent card ---- */}
      <section className="mb-10">
        <div className="relative rounded-xl border-2 border-emerald-800/60 bg-gradient-to-br from-emerald-950/30 to-zinc-950 p-8 text-center overflow-hidden">
          {/* Subtle gradient glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{ background: 'radial-gradient(ellipse at top, rgba(16,185,129,0.15) 0%, transparent 60%)' }}
          />
          <div className="relative">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-emerald-600/20 border border-emerald-600/30 mb-4">
              <UserCheck className="h-7 w-7 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-zinc-100 mb-2">
              Is this your business?
            </h2>
            <p className="text-sm text-zinc-400 mb-6 max-w-md mx-auto leading-relaxed">
              Claim your profile to manage your score, access detailed
              recommendations, and show verified status to AI agents.
            </p>
            <Link
              href={`/register?domain=${encodeURIComponent(decodedDomain)}`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all hover:shadow-lg hover:shadow-emerald-600/20"
            >
              <UserCheck className="h-4 w-4" />
              Claim this profile
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Bottom CTAs ---- */}
      <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={`/audit?domain=${encodeURIComponent(decodedDomain)}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors min-h-[44px]"
          >
            <BarChart3 className="h-4 w-4" />
            {isUnaudited ? 'Scan this business' : 'Re-scan'}
          </Link>
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors min-h-[44px]"
          >
            <Search className="h-4 w-4" />
            Browse leaderboard
          </Link>
          {!isUnaudited && (
            <Link
              href={`/remediate?domain=${encodeURIComponent(decodedDomain)}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors min-h-[44px]"
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
