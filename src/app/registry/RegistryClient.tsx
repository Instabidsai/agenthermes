'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Search,
  X,
  Globe,
  Zap,
  AlertCircle,
  RotateCcw,
  ChevronDown,
  Plus,
  Server,
  Cpu,
  Plug,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import clsx from 'clsx'
import TierBadge from '@/components/TierBadge'

interface RegistryEntry {
  id: string
  name: string
  slug: string
  domain: string | null
  description: string | null
  score: number
  tier: 'unaudited' | 'bronze' | 'silver' | 'gold' | 'platinum'
  vertical: string | null
  capabilities: string[]
  protocols: string[]
  tool_count: number
  profile_url: string
}

const PROTOCOL_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'mcp', label: 'MCP' },
  { key: 'a2a', label: 'A2A' },
  { key: 'rest', label: 'REST' },
] as const

const LIMIT = 20

function ProtocolBadge({ protocol }: { protocol: string }) {
  const config: Record<string, { icon: typeof Zap; color: string; bg: string; label: string }> = {
    mcp: {
      icon: Server,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      label: 'MCP',
    },
    a2a: {
      icon: Cpu,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      label: 'A2A',
    },
    rest: {
      icon: Plug,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      label: 'REST',
    },
  }
  const c = config[protocol] || config.rest
  const Icon = c.icon

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-md border transition-all duration-200',
        c.color,
        c.bg
      )}
    >
      <Icon className="h-3 w-3" />
      {c.label}
    </span>
  )
}

function ScorePill({ score }: { score: number }) {
  let color = 'text-zinc-500'
  let bg = 'bg-zinc-500/10'
  if (score >= 90) { color = 'text-emerald-400'; bg = 'bg-emerald-500/10' }
  else if (score >= 75) { color = 'text-yellow-400'; bg = 'bg-yellow-500/10' }
  else if (score >= 60) { color = 'text-zinc-300'; bg = 'bg-zinc-500/10' }
  else if (score >= 40) { color = 'text-amber-400'; bg = 'bg-amber-500/10' }
  else if (score > 0) { color = 'text-red-400'; bg = 'bg-red-500/10' }

  return (
    <span className={clsx('inline-flex items-center justify-center h-9 w-9 rounded-lg text-sm font-bold tabular-nums', color, bg)}>
      {score}
    </span>
  )
}

function RegistrySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 animate-pulse"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="min-w-0 flex-1">
              <div className="h-5 w-36 bg-zinc-800 rounded mb-2" />
              <div className="h-3 w-28 bg-zinc-800/50 rounded" />
            </div>
            <div className="h-9 w-9 bg-zinc-800/60 rounded-lg" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-16 bg-zinc-800/60 rounded-md" />
            <div className="h-6 w-14 bg-zinc-800/40 rounded-md" />
            <div className="h-6 w-14 bg-zinc-800/40 rounded-md" />
          </div>
          <div className="h-4 w-24 bg-zinc-800/40 rounded" />
        </div>
      ))}
    </div>
  )
}

function SubmitForm() {
  const [url, setUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ status: string; message: string } | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setSubmitting(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/v1/registry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to submit. Please try again.')
        return
      }

      setResult({ status: data.status, message: data.message })
      setUrl('')
    } catch {
      setError('Network error. Could not reach the server.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/30 transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0">
          <Plus className="h-6 w-6 text-emerald-400" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-1">Submit Your Agent Card</h2>
          <p className="text-sm text-zinc-500 mb-4">
            Add your business to the registry. We will scan your domain, detect your agent card, MCP endpoints, and A2A capabilities.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="yourdomain.com"
                aria-label="Domain URL to submit"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={submitting || !url.trim()}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/10"
            >
              {submitting ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
              Submit
            </button>
          </form>

          {error && (
            <p className="mt-3 text-sm text-red-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </p>
          )}
          {result && (
            <p className="mt-3 text-sm text-emerald-400">{result.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function RegistryClient({
  initialBusinesses,
  initialTotal,
  verticals,
}: {
  initialBusinesses: RegistryEntry[]
  initialTotal: number
  verticals: string[]
}) {
  const [query, setQuery] = useState('')
  const [protocolFilter, setProtocolFilter] = useState('all')
  const [verticalFilter, setVerticalFilter] = useState('')
  const [tierFilter, setTierFilter] = useState('')
  const [businesses, setBusinesses] = useState<RegistryEntry[]>(initialBusinesses)
  const [total, setTotal] = useState(initialTotal)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')

  const fetchRegistry = useCallback(
    async (append = false) => {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }
      setError('')

      try {
        const currentOffset = append ? offset + LIMIT : 0
        const params = new URLSearchParams()
        if (query) params.set('q', query)
        if (protocolFilter !== 'all') params.set('protocol', protocolFilter)
        if (verticalFilter) params.set('vertical', verticalFilter)
        if (tierFilter) params.set('tier', tierFilter)
        params.set('limit', String(LIMIT))
        params.set('offset', String(currentOffset))

        const res = await fetch(`/api/v1/registry?${params.toString()}`)
        const data = await res.json()

        if (!res.ok) {
          setError(data.error || 'Failed to fetch registry.')
          return
        }

        const entries: RegistryEntry[] = (data.registry || []).map((r: any) => ({
          id: r.id,
          name: r.name,
          slug: r.slug,
          domain: r.domain,
          description: r.description,
          score: r.score,
          tier: r.tier,
          vertical: r.vertical,
          capabilities: r.capabilities || [],
          protocols: r.protocols || ['rest'],
          tool_count: r.tool_count || 0,
          profile_url: r.profile_url || `/business/${r.slug}`,
        }))

        if (append) {
          setBusinesses((prev) => [...prev, ...entries])
          setOffset(currentOffset)
        } else {
          setBusinesses(entries)
          setOffset(0)
        }
        setTotal(data.pagination?.total ?? entries.length)
      } catch {
        setError('Network error. Could not reach the server.')
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [query, protocolFilter, verticalFilter, tierFilter, offset]
  )

  // Debounced fetch on filter changes
  useEffect(() => {
    const hasFilters = query !== '' || protocolFilter !== 'all' || verticalFilter !== '' || tierFilter !== ''

    // Only fetch from API if filters are active; otherwise use SSR data
    if (!hasFilters) {
      setBusinesses(initialBusinesses)
      setTotal(initialTotal)
      setOffset(0)
      return
    }

    const timeout = setTimeout(() => fetchRegistry(false), 300)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, protocolFilter, verticalFilter, tierFilter])

  const hasMore = businesses.length < total

  return (
    <>
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors duration-200" />
          <input
            type="text"
            placeholder="Search businesses, protocols, domains..."
            aria-label="Search the registry"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:bg-zinc-900 transition-all duration-200"
          />
          {/* Search indicator */}
          {query && !loading && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/80 transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {loading && query && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 text-emerald-400 animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Filter pills */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {/* Protocol pills */}
        {PROTOCOL_FILTERS.map((p) => {
          const iconMap: Record<string, typeof Zap> = { mcp: Server, a2a: Cpu, rest: Plug }
          const Icon = iconMap[p.key]
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setProtocolFilter(p.key)}
              className={clsx(
                'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200',
                protocolFilter === p.key
                  ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10 shadow-sm shadow-emerald-500/10'
                  : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
              )}
            >
              {Icon && <Icon className="h-3 w-3" />}
              {p.label}
            </button>
          )
        })}

        {/* Divider */}
        <div className="w-px h-5 bg-zinc-800 mx-1" />

        {/* Vertical pills */}
        <button
          type="button"
          onClick={() => setVerticalFilter('')}
          className={clsx(
            'px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200',
            verticalFilter === ''
              ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
              : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
          )}
        >
          All Verticals
        </button>
        {verticals.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVerticalFilter(v)}
            className={clsx(
              'px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200',
              verticalFilter === v
                ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
                : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
            )}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}

        {/* Tier filter dropdown */}
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="px-3 py-1.5 rounded-full text-xs font-medium border border-zinc-800 bg-transparent text-zinc-400 hover:border-zinc-700 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 cursor-pointer transition-all duration-200"
        >
          <option value="">Any Tier</option>
          <option value="platinum">Platinum</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="bronze">Bronze</option>
        </select>
      </div>

      {/* Result count */}
      <div className="mb-4 flex items-center gap-2 text-xs text-zinc-500" aria-live="polite">
        {loading ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin text-emerald-400" />
            <span>Searching...</span>
          </>
        ) : (
          <span>{total} business{total !== 1 ? 'es' : ''} in the registry</span>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="flex-1 text-sm text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => {
              setError('')
              fetchRegistry(false)
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-all duration-200"
          >
            <RotateCcw className="h-3 w-3" />
            Retry
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading ? (
        <RegistrySkeleton />
      ) : businesses.length === 0 && !error ? (
        <div className="text-center py-20 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
          <Search className="h-10 w-10 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 font-medium mb-1">
            No businesses match your search.
          </p>
          <p className="text-sm text-zinc-600 mb-4">
            Try broader filters, or submit your own agent card below.
          </p>
        </div>
      ) : (
        <>
          {/* Results grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.map((biz) => (
              <Link
                key={biz.id}
                href={biz.profile_url}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-200 group flex flex-col"
              >
                {/* Top row: name + score */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-zinc-100 truncate group-hover:text-emerald-400 transition-colors duration-200">
                      {biz.name}
                    </h3>
                    {biz.domain && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <Globe className="h-3 w-3 text-zinc-600" />
                        <span className="text-xs text-zinc-500 truncate">
                          {biz.domain}
                        </span>
                      </div>
                    )}
                  </div>
                  <ScorePill score={biz.score} />
                </div>

                {/* Tier + protocol badges */}
                <div className="flex items-center flex-wrap gap-1.5 mb-3">
                  <TierBadge tier={biz.tier} size="sm" />
                  {biz.protocols.map((p) => (
                    <ProtocolBadge key={p} protocol={p} />
                  ))}
                </div>

                {/* Tool count + vertical */}
                <div className="mt-auto flex items-center justify-between text-xs text-zinc-500">
                  <span>
                    {biz.tool_count > 0
                      ? `${biz.tool_count} tool${biz.tool_count !== 1 ? 's' : ''}`
                      : 'No tools listed'}
                  </span>
                  {biz.vertical && (
                    <span className="bg-zinc-800/80 px-2 py-0.5 rounded text-[10px] font-medium">
                      {biz.vertical}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => fetchRegistry(true)}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-400 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <>
                    <div className="h-4 w-4 border-2 border-zinc-500 border-t-zinc-200 rounded-full animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Load More ({total - businesses.length} remaining)
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Submit CTA - sticky bottom bar on mobile, inline on desktop */}
      <div className="mt-16">
        <SubmitForm />
      </div>

      {/* Sticky mobile CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-3 bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-800/80">
        <Link
          href="#submit-agent-card"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('.mt-16')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20"
        >
          <Plus className="h-4 w-4" />
          Submit Your Agent Card
        </Link>
      </div>
    </>
  )
}
