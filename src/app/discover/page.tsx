'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, SlidersHorizontal, X, Globe, Zap, AlertCircle, RotateCcw, ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'

interface DiscoverBusiness {
  id: string
  name: string
  slug: string
  domain: string | null
  description: string | null
  audit_score: number
  audit_tier: 'unaudited' | 'bronze' | 'silver' | 'gold' | 'platinum'
  capabilities: string[]
  vertical: string | null
  mcp_endpoints?: string[]
  trust_score?: number
  services?: { id: string; name: string }[]
  similarity?: number | null
}

/**
 * Detect whether a query looks like natural language (semantic search candidate).
 * Heuristic: 3+ words suggests a natural language query.
 */
function isNaturalLanguageQuery(q: string): boolean {
  const words = q.trim().split(/\s+/).filter(Boolean)
  return words.length >= 3
}

const verticals = [
  'All Verticals',
  'legal',
  'finance',
  'healthcare',
  'marketing',
  'engineering',
  'data',
  'logistics',
  'real-estate',
  'other',
]

const tierOptions = ['Any Tier', 'bronze', 'silver', 'gold', 'platinum']

const LIMIT = 20

function DiscoverPageContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [vertical, setVertical] = useState('')
  const [tier, setTier] = useState('')
  const [minScore, setMinScore] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [businesses, setBusinesses] = useState<DiscoverBusiness[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [error, setError] = useState('')
  const [searchType, setSearchType] = useState<'regular' | 'semantic' | 'fulltext_ranked' | 'fallback_ilike'>('regular')
  const [semanticMode, setSemanticMode] = useState(false)

  // Read vertical from query params
  useEffect(() => {
    const verticalParam = searchParams.get('vertical')
    if (verticalParam) {
      setVertical(verticalParam)
      setShowFilters(true)
    }
  }, [searchParams])

  const fetchBusinesses = useCallback(async (append = false) => {
    if (append) {
      setLoadingMore(true)
    } else {
      setLoading(true)
    }
    setError('')

    try {
      const currentOffset = append ? offset : 0
      const useSemantic = query && (semanticMode || isNaturalLanguageQuery(query)) && !vertical && !tier && minScore === 0

      if (useSemantic && !append) {
        // Use semantic search endpoint for natural language queries
        const params = new URLSearchParams()
        params.set('q', query)
        params.set('limit', String(LIMIT))

        const res = await fetch(`/api/v1/discover/semantic?${params.toString()}`)
        const data = await res.json()

        if (!res.ok) {
          setError(data.error || 'Failed to fetch businesses. Please try again.')
          return
        }

        if (data.businesses) {
          setBusinesses(data.businesses)
          setTotal(data.result_count ?? data.businesses.length)
          setSearchType(data.search_type === 'semantic' ? 'semantic' : data.search_type === 'fulltext_ranked' ? 'fulltext_ranked' : 'fallback_ilike')
        }
        return
      }

      // Regular discover endpoint
      setSearchType('regular')
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (vertical) params.set('vertical', vertical)
      if (tier) params.set('tier', tier)
      if (minScore > 0) params.set('min_score', String(minScore))
      params.set('limit', String(LIMIT))
      params.set('offset', String(currentOffset))

      const res = await fetch(`/api/v1/discover?${params.toString()}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to fetch businesses. Please try again.')
        return
      }

      if (data.businesses) {
        if (append) {
          setBusinesses((prev) => [...prev, ...data.businesses])
        } else {
          setBusinesses(data.businesses)
        }
        setTotal(data.pagination?.total ?? data.businesses.length)
      }
    } catch {
      setError('Network error. Could not reach the server.')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [query, vertical, tier, minScore, offset, semanticMode])

  // Reset offset and fetch on filter changes
  useEffect(() => {
    setOffset(0)
    const timeout = setTimeout(() => fetchBusinesses(false), 300)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, vertical, tier, minScore, semanticMode])

  const handleLoadMore = () => {
    const newOffset = offset + LIMIT
    setOffset(newOffset)
    // We need to fetch with the new offset directly
    const doFetch = async () => {
      setLoadingMore(true)
      setError('')
      try {
        const params = new URLSearchParams()
        if (query) params.set('q', query)
        if (vertical) params.set('vertical', vertical)
        if (tier) params.set('tier', tier)
        if (minScore > 0) params.set('min_score', String(minScore))
        params.set('limit', String(LIMIT))
        params.set('offset', String(newOffset))

        const res = await fetch(`/api/v1/discover?${params.toString()}`)
        const data = await res.json()

        if (!res.ok) {
          setError(data.error || 'Failed to load more businesses.')
          return
        }

        if (data.businesses) {
          setBusinesses((prev) => [...prev, ...data.businesses])
          setTotal(data.pagination?.total ?? total)
        }
      } catch {
        setError('Network error. Could not reach the server.')
      } finally {
        setLoadingMore(false)
      }
    }
    doFetch()
  }

  const hasMore = businesses.length < total

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://agenthermes.ai' },
        { name: 'Discover', url: 'https://agenthermes.ai/discover' },
      ]} />
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Discover the Network
        </h1>
        <p className="text-sm text-zinc-500">
          Browse businesses scored on AgentHermes. Filter by industry, readiness tier, or specific capabilities.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 space-y-4">
        <div className="space-y-3 sm:space-y-0">
          <div className="flex gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search businesses, capabilities, domains..."
                aria-label="Search businesses"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-zinc-500 hover:text-zinc-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Semantic Search Toggle */}
            <button
              type="button"
              onClick={() => setSemanticMode(!semanticMode)}
              className={clsx(
                'flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors',
                semanticMode
                  ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/5'
                  : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
              )}
              title="Toggle semantic search mode for natural language queries"
            >
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Smart Search</span>
            </button>

            {/* Filter Toggle */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={clsx(
                'flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors',
                showFilters
                  ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/5'
                  : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Filter Row */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
            {/* Vertical */}
            <div>
              <label className="block text-[10px] font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">
                Vertical
              </label>
              <select
                value={vertical}
                onChange={(e) => setVertical(e.target.value)}
                className="px-3 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/50"
              >
                {verticals.map((v) => (
                  <option key={v} value={v === 'All Verticals' ? '' : v}>
                    {v === 'All Verticals'
                      ? v
                      : v.charAt(0).toUpperCase() + v.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Tier */}
            <div>
              <label className="block text-[10px] font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">
                Tier
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="px-3 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/50"
              >
                {tierOptions.map((t) => (
                  <option key={t} value={t === 'Any Tier' ? '' : t}>
                    {t === 'Any Tier'
                      ? t
                      : t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Score */}
            <div>
              <label className="block text-[10px] font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">
                Min Score: {minScore}
              </label>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-40 accent-emerald-500"
              />
            </div>

            {/* Clear */}
            {(vertical || tier || minScore > 0) && (
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => {
                    setVertical('')
                    setTier('')
                    setMinScore(0)
                  }}
                  className="px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Result count + search mode indicator */}
        <div className="flex items-center gap-2 text-xs text-zinc-500" aria-live="polite">
          <span>
            {loading ? 'Searching...' : `${total} business${total !== 1 ? 'es' : ''} found`}
          </span>
          {!loading && searchType === 'semantic' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-medium">
              <Zap className="h-2.5 w-2.5" />
              Semantic Search
            </span>
          )}
          {!loading && searchType === 'fulltext_ranked' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-medium">
              <Zap className="h-2.5 w-2.5" />
              Full-Text Ranked
            </span>
          )}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="flex-1 text-sm text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => {
              setError('')
              fetchBusinesses(false)
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Retry
          </button>
        </div>
      )}

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 animate-pulse"
            >
              {/* Title + score row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0 flex-1">
                  <div className="h-5 w-36 bg-zinc-800 rounded mb-2" />
                  <div className="h-3 w-28 bg-zinc-800/50 rounded" />
                </div>
                <div className="h-16 w-16 rounded-full bg-zinc-800/60 flex-shrink-0" />
              </div>
              {/* Tier + vertical badges */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-5 w-14 bg-zinc-800/60 rounded" />
                <div className="h-5 w-16 bg-zinc-800/40 rounded" />
              </div>
              {/* Capability tags */}
              <div className="flex gap-1.5">
                <div className="h-5 w-20 bg-zinc-800/40 rounded" />
                <div className="h-5 w-24 bg-zinc-800/40 rounded" />
                <div className="h-5 w-16 bg-zinc-800/40 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : businesses.length === 0 && !error ? (
        <div className="text-center py-20 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
          <Search className="h-10 w-10 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 font-medium mb-1">
            No businesses match your search yet.
          </p>
          <p className="text-sm text-zinc-600 mb-4">
            The AgentHermes network is growing {'\u2014'} try broader filters, or register your own business to be among the first in your vertical.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
          >
            Register your business
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.map((biz) => (
              <Link
                key={biz.id}
                href={`/business/${biz.slug}`}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors group"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-zinc-100 truncate group-hover:text-white transition-colors">
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
                  <ScoreGauge score={biz.audit_score} size="sm" showLabel={false} />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <TierBadge tier={biz.audit_tier} size="sm" />
                  {biz.vertical && (
                    <span className="text-[10px] font-medium text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded">
                      {biz.vertical}
                    </span>
                  )}
                  {biz.mcp_endpoints && biz.mcp_endpoints.length > 0 && (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-500/70 bg-emerald-500/5 px-2 py-0.5 rounded">
                      <Zap className="h-2.5 w-2.5" />
                      MCP
                    </span>
                  )}
                  {biz.similarity != null && (
                    <span className="text-[10px] font-medium text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {(biz.similarity * 100).toFixed(0)}% match
                    </span>
                  )}
                </div>

                {biz.capabilities && biz.capabilities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {biz.capabilities.slice(0, 3).map((cap) => (
                      <span
                        key={cap}
                        className="text-[10px] text-zinc-500 bg-zinc-800/60 px-2 py-0.5 rounded"
                      >
                        {cap}
                      </span>
                    ))}
                    {biz.capabilities.length > 3 && (
                      <span className="text-[10px] text-zinc-600 px-1">
                        +{biz.capabilities.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  )
}

export default function DiscoverPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <div className="h-8 w-8 border-2 border-zinc-500 border-t-zinc-200 rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <DiscoverPageContent />
    </Suspense>
  )
}
