'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Scale,
  ArrowRight,
  AlertCircle,
  Trophy,
  Minus,
  ExternalLink,
  Loader2,
} from 'lucide-react'
import clsx from 'clsx'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CategoryScore {
  score: number
  max: number
  status: string
}

interface ScoreResponse {
  domain: string
  score: number | null
  tier: 'unaudited' | 'bronze' | 'silver' | 'gold' | 'platinum'
  tier_label: string
  last_audited: string | null
  categories?: Record<string, CategoryScore>
  profile_url?: string
  badge_url?: string
  message?: string
}

// The 9 dimensions in canonical order
const DIMENSIONS = [
  { key: 'Discoverability', label: 'Discoverability', short: 'D1' },
  { key: 'API Quality', label: 'API Quality', short: 'D2' },
  { key: 'Onboarding', label: 'Onboarding', short: 'D3' },
  { key: 'Pricing', label: 'Pricing Transparency', short: 'D4' },
  { key: 'Payment', label: 'Payment', short: 'D5' },
  { key: 'Data Quality', label: 'Data Quality', short: 'D6' },
  { key: 'Security', label: 'Security', short: 'D7' },
  { key: 'Reliability', label: 'Reliability', short: 'D8' },
  { key: 'Agent Experience', label: 'Agent Experience', short: 'D9' },
] as const

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeDomain(input: string): string {
  let d = input.trim().toLowerCase()
  d = d.replace(/^https?:\/\//, '')
  d = d.replace(/^www\./, '')
  d = d.replace(/\/.*$/, '')
  return d
}

function dimScore(data: ScoreResponse | null, key: string): number | null {
  if (!data || !data.categories) return null
  const cat = data.categories[key]
  if (!cat) return null
  // Normalize to 0-100 percentage
  return cat.max > 0 ? Math.round((cat.score / cat.max) * 100) : 0
}

function scoreBarColor(score: number): string {
  if (score >= 75) return 'bg-emerald-500'
  if (score >= 50) return 'bg-yellow-500'
  if (score >= 25) return 'bg-amber-500'
  return 'bg-red-500'
}

type Winner = 'a' | 'b' | 'tie' | null

function dimWinner(
  a: ScoreResponse | null,
  b: ScoreResponse | null,
  key: string
): Winner {
  const sa = dimScore(a, key)
  const sb = dimScore(b, key)
  if (sa === null || sb === null) return null
  if (sa > sb) return 'a'
  if (sb > sa) return 'b'
  return 'tie'
}

function overallWinner(
  a: ScoreResponse | null,
  b: ScoreResponse | null
): Winner {
  if (!a?.score && !b?.score) return null
  if (a?.score == null && b?.score != null) return 'b'
  if (b?.score == null && a?.score != null) return 'a'
  if (a!.score! > b!.score!) return 'a'
  if (b!.score! > a!.score!) return 'b'
  return 'tie'
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function WinnerBadge({ winner, side }: { winner: Winner; side: 'a' | 'b' }) {
  if (!winner || winner === 'tie') return null
  if (winner !== side) return null
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
      <Trophy className="h-3 w-3" />
      Winner
    </span>
  )
}

function TieBadge({ winner }: { winner: Winner }) {
  if (winner !== 'tie') return null
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full">
      <Minus className="h-3 w-3" />
      Tie
    </span>
  )
}

function NotScannedCard({ domain }: { domain: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 text-center">
      <AlertCircle className="h-8 w-8 text-zinc-600 mb-3" />
      <p className="text-zinc-400 font-medium mb-1">
        {domain} has not been scanned yet
      </p>
      <p className="text-sm text-zinc-600 mb-4">
        This business needs to be audited before it can be compared.
      </p>
      <Link
        href={`/audit?domain=${encodeURIComponent(domain)}`}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
      >
        Scan Now
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

function BusinessScoreCard({
  data,
  label,
  side,
  winner,
}: {
  data: ScoreResponse
  label: string
  side: 'a' | 'b'
  winner: Winner
}) {
  const color = side === 'a' ? 'blue' : 'violet'
  const dotColor = side === 'a' ? 'bg-blue-500' : 'bg-violet-500'

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
      {/* Label */}
      <div className="flex items-center gap-2">
        <span className={clsx('w-2.5 h-2.5 rounded-full', dotColor)} />
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
          {label}
        </span>
      </div>

      {/* Domain */}
      <p className="text-lg font-semibold text-zinc-100 truncate max-w-full">
        {data.domain}
      </p>

      {/* Score Gauge */}
      <ScoreGauge score={data.score ?? 0} size="lg" />

      {/* Tier Badge */}
      <TierBadge tier={data.tier} size="md" />

      {/* Winner indicator */}
      <WinnerBadge winner={winner} side={side} />
      {side === 'a' && <TieBadge winner={winner} />}

      {/* Profile link */}
      {data.profile_url && (
        <Link
          href={data.profile_url.replace('https://agenthermes.ai', '')}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          View Profile
          <ExternalLink className="h-3 w-3" />
        </Link>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function ComparePage() {
  const [domainA, setDomainA] = useState('')
  const [domainB, setDomainB] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dataA, setDataA] = useState<ScoreResponse | null>(null)
  const [dataB, setDataB] = useState<ScoreResponse | null>(null)
  const [compared, setCompared] = useState(false)

  const handleCompare = async () => {
    const da = normalizeDomain(domainA)
    const db = normalizeDomain(domainB)

    if (!da || !db) {
      setError('Please enter two valid domains to compare.')
      return
    }

    if (da === db) {
      setError('Please enter two different domains.')
      return
    }

    setError('')
    setLoading(true)
    setDataA(null)
    setDataB(null)
    setCompared(false)

    try {
      const [resA, resB] = await Promise.all([
        fetch(`/api/v1/score/${encodeURIComponent(da)}`),
        fetch(`/api/v1/score/${encodeURIComponent(db)}`),
      ])

      const [jsonA, jsonB] = await Promise.all([resA.json(), resB.json()])

      if (!resA.ok && resA.status !== 200) {
        setError(
          jsonA.error || `Failed to fetch score for ${da}.`
        )
        return
      }
      if (!resB.ok && resB.status !== 200) {
        setError(
          jsonB.error || `Failed to fetch score for ${db}.`
        )
        return
      }

      setDataA(jsonA as ScoreResponse)
      setDataB(jsonB as ScoreResponse)
      setCompared(true)
    } catch {
      setError('Network error. Could not reach the server.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleCompare()
    }
  }

  const winner = overallWinner(dataA, dataB)
  const aNotScanned = dataA && dataA.score === null
  const bNotScanned = dataB && dataB.score === null

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Scale className="h-5 w-5 text-emerald-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Compare Scores
          </h1>
        </div>
        <p className="text-sm text-zinc-500 sm:ml-[52px]">
          Put two businesses head-to-head across all 9 dimensions of agent
          readiness.
        </p>
      </div>

      {/* Input Form */}
      <div className="mb-8 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          {/* Business A */}
          <div>
            <label className="block text-[10px] font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">
              Business A
            </label>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
              <input
                type="text"
                value={domainA}
                onChange={(e) => setDomainA(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. stripe.com"
                className="flex-1 px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
          </div>

          {/* VS divider */}
          <div className="hidden sm:flex items-center justify-center">
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
              vs
            </span>
          </div>

          {/* Business B */}
          <div>
            <label className="block text-[10px] font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">
              Business B
            </label>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 flex-shrink-0" />
              <input
                type="text"
                value={domainB}
                onChange={(e) => setDomainB(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. shopify.com"
                className="flex-1 px-3 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Compare Button */}
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={handleCompare}
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Comparing...
              </>
            ) : (
              <>
                <Scale className="h-4 w-4" />
                Compare
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="flex-1 text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Results */}
      {compared && dataA && dataB && (
        <div className="space-y-8">
          {/* Overall Winner Banner */}
          {winner && !aNotScanned && !bNotScanned && (
            <div
              className={clsx(
                'flex items-center justify-center gap-3 p-4 rounded-xl border',
                winner === 'a' &&
                  'bg-blue-500/5 border-blue-500/20',
                winner === 'b' &&
                  'bg-violet-500/5 border-violet-500/20',
                winner === 'tie' &&
                  'bg-zinc-800/50 border-zinc-700/50'
              )}
            >
              {winner === 'tie' ? (
                <p className="text-sm font-semibold text-zinc-300">
                  It&apos;s a tie! Both businesses scored{' '}
                  <span className="text-white">{dataA.score}</span>.
                </p>
              ) : (
                <p className="text-sm font-semibold text-zinc-300">
                  <Trophy className="inline h-4 w-4 text-emerald-400 mr-1" />
                  Overall winner:{' '}
                  <span className="text-white">
                    {winner === 'a' ? dataA.domain : dataB.domain}
                  </span>{' '}
                  with a score of{' '}
                  <span className="text-white">
                    {winner === 'a' ? dataA.score : dataB.score}
                  </span>{' '}
                  vs{' '}
                  <span className="text-zinc-400">
                    {winner === 'a' ? dataB.score : dataA.score}
                  </span>
                </p>
              )}
            </div>
          )}

          {/* Side-by-side Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aNotScanned ? (
              <NotScannedCard domain={dataA.domain} />
            ) : (
              <BusinessScoreCard
                data={dataA}
                label="Business A"
                side="a"
                winner={winner}
              />
            )}
            {bNotScanned ? (
              <NotScannedCard domain={dataB.domain} />
            ) : (
              <BusinessScoreCard
                data={dataB}
                label="Business B"
                side="b"
                winner={winner}
              />
            )}
          </div>

          {/* Dimension Comparison */}
          {!aNotScanned && !bNotScanned && (
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <h2 className="text-lg font-semibold text-zinc-100 mb-6">
                Dimension Breakdown
              </h2>
              <div className="space-y-5">
                {DIMENSIONS.map((dim) => {
                  const sa = dimScore(dataA, dim.key)
                  const sb = dimScore(dataB, dim.key)
                  const w = dimWinner(dataA, dataB, dim.key)

                  return (
                    <div key={dim.key}>
                      {/* Dimension header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-medium text-zinc-600">
                            {dim.short}
                          </span>
                          <span className="text-sm font-medium text-zinc-300">
                            {dim.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {w === 'a' && (
                            <span className="text-[10px] font-bold text-blue-400">
                              A wins
                            </span>
                          )}
                          {w === 'b' && (
                            <span className="text-[10px] font-bold text-violet-400">
                              B wins
                            </span>
                          )}
                          {w === 'tie' && (
                            <span className="text-[10px] font-bold text-zinc-500">
                              Tie
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bars */}
                      <div className="space-y-1.5">
                        {/* Business A bar */}
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                          <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className={clsx(
                                'h-full rounded-full transition-all duration-700',
                                sa !== null
                                  ? scoreBarColor(sa)
                                  : 'bg-zinc-700'
                              )}
                              style={{ width: `${sa ?? 0}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-medium text-zinc-400 w-8 text-right tabular-nums">
                            {sa !== null ? sa : '-'}
                          </span>
                        </div>

                        {/* Business B bar */}
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
                          <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className={clsx(
                                'h-full rounded-full transition-all duration-700',
                                sb !== null
                                  ? scoreBarColor(sb)
                                  : 'bg-zinc-700'
                              )}
                              style={{ width: `${sb ?? 0}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-medium text-zinc-400 w-8 text-right tabular-nums">
                            {sb !== null ? sb : '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Summary row */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span className="text-xs text-zinc-500">
                        {dataA.domain}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                      <span className="text-xs text-zinc-500">
                        {dataB.domain}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-600">
                    {DIMENSIONS.filter(
                      (d) => dimWinner(dataA, dataB, d.key) === 'a'
                    ).length}{' '}
                    A wins &middot;{' '}
                    {DIMENSIONS.filter(
                      (d) => dimWinner(dataA, dataB, d.key) === 'b'
                    ).length}{' '}
                    B wins &middot;{' '}
                    {DIMENSIONS.filter(
                      (d) => dimWinner(dataA, dataB, d.key) === 'tie'
                    ).length}{' '}
                    tied
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Featured Comparisons */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-zinc-100 mb-4">
          Featured Comparisons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: 'Stripe vs OpenAI',
              href: '/compare/stripe-vs-openai',
              desc: 'Payment platform vs AI platform — who is more agent-ready?',
              scoreA: 55,
              scoreB: 50,
              labelA: 'Stripe',
              labelB: 'OpenAI',
              colorA: 'text-blue-400',
              colorB: 'text-violet-400',
            },
            {
              title: 'Shopify vs WooCommerce',
              href: '/compare/shopify-vs-woocommerce',
              desc: 'Hosted vs self-hosted e-commerce for agent readiness.',
              scoreA: 50,
              scoreB: 38,
              labelA: 'Shopify',
              labelB: 'WooCommerce',
              colorA: 'text-green-400',
              colorB: 'text-purple-400',
            },
            {
              title: 'Slack vs Discord',
              href: '/compare/slack-vs-discord',
              desc: 'Enterprise vs community — which bot ecosystem is agent-native?',
              scoreA: 64,
              scoreB: 52,
              labelA: 'Slack',
              labelB: 'Discord',
              colorA: 'text-pink-400',
              colorB: 'text-indigo-400',
            },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/30 transition-colors"
            >
              <h3 className="text-sm font-bold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors">
                {c.title}
              </h3>
              <p className="text-xs text-zinc-500 mb-3">{c.desc}</p>
              <div className="flex items-center justify-between text-xs">
                <span className={c.colorA}>
                  {c.labelA}: <span className="font-bold">{c.scoreA}</span>
                </span>
                <span className="text-zinc-600">vs</span>
                <span className={c.colorB}>
                  {c.labelB}: <span className="font-bold">{c.scoreB}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Empty state — before any comparison */}
      {!compared && !loading && (
        <div className="text-center py-16 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
          <Scale className="h-10 w-10 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 font-medium mb-1">
            Enter two domains above to start comparing
          </p>
          <p className="text-sm text-zinc-600">
            See which business is more ready for AI agent commerce.
          </p>
        </div>
      )}
    </div>
  )
}
