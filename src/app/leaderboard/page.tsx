'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Trophy,
  Globe,
  Zap,
  ChevronDown,
  Crown,
  Medal,
  Search,
  AlertCircle,
  RotateCcw,
} from 'lucide-react'
import clsx from 'clsx'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'

interface LeaderboardEntry {
  rank: number
  id: string
  name: string
  slug: string
  domain: string | null
  score: number
  tier: 'unaudited' | 'bronze' | 'silver' | 'gold' | 'platinum'
  trust_score: number
  vertical: string | null
  capabilities: string[]
  has_mcp: boolean
  profile_url: string
}

const LIMIT = 50

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/15 border border-yellow-500/30">
        <Crown className="h-4 w-4 text-yellow-500" />
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-400/10 border border-zinc-400/30">
        <Medal className="h-4 w-4 text-zinc-300" />
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-700/15 border border-amber-700/30">
        <Medal className="h-4 w-4 text-amber-600" />
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center w-8 h-8">
      <span className="text-sm font-mono font-medium text-zinc-500">
        {rank}
      </span>
    </div>
  )
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [error, setError] = useState('')
  const [vertical, setVertical] = useState('')
  const [verticals, setVerticals] = useState<string[]>([])

  useEffect(() => {
    document.title = 'Leaderboard | AgentHermes'
  }, [])

  const fetchLeaderboard = useCallback(
    async (append = false) => {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }
      setError('')

      try {
        const currentOffset = append ? offset : 0
        const params = new URLSearchParams()
        if (vertical) params.set('vertical', vertical)
        params.set('limit', String(LIMIT))
        params.set('offset', String(currentOffset))

        const res = await fetch(`/api/v1/leaderboard?${params.toString()}`)
        const data = await res.json()

        if (!res.ok) {
          setError(data.error || 'Failed to fetch leaderboard.')
          return
        }

        if (data.leaderboard) {
          if (append) {
            setEntries((prev) => [...prev, ...data.leaderboard])
          } else {
            setEntries(data.leaderboard)
          }
          setTotal(data.pagination?.total ?? data.leaderboard.length)
        }

        if (data.filters?.verticals) {
          setVerticals(data.filters.verticals)
        }
      } catch {
        setError('Network error. Could not reach the server.')
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [vertical]
  )

  // Reset and fetch on filter change
  useEffect(() => {
    setOffset(0)
    fetchLeaderboard(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vertical])

  const handleLoadMore = () => {
    const newOffset = offset + LIMIT
    setOffset(newOffset)
    const doFetch = async () => {
      setLoadingMore(true)
      setError('')
      try {
        const params = new URLSearchParams()
        if (vertical) params.set('vertical', vertical)
        params.set('limit', String(LIMIT))
        params.set('offset', String(newOffset))

        const res = await fetch(`/api/v1/leaderboard?${params.toString()}`)
        const data = await res.json()

        if (!res.ok) {
          setError(data.error || 'Failed to load more.')
          return
        }

        if (data.leaderboard) {
          setEntries((prev) => [...prev, ...data.leaderboard])
          setTotal(data.pagination?.total ?? total)
        }
      } catch {
        setError('Network error.')
      } finally {
        setLoadingMore(false)
      }
    }
    doFetch()
  }

  const hasMore = entries.length < total

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Trophy className="h-5 w-5 text-emerald-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Leaderboard
          </h1>
        </div>
        <p className="text-sm text-zinc-500 ml-[52px]">
          Top agent-ready businesses ranked by Agent Readiness Score.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div>
          <label className="block text-[10px] font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">
            Industry / Vertical
          </label>
          <select
            value={vertical}
            onChange={(e) => setVertical(e.target.value)}
            className="px-3 py-2 rounded-md bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/50 min-w-[180px]"
          >
            <option value="">All Industries</option>
            {verticals.map((v) => (
              <option key={v} value={v}>
                {v.charAt(0).toUpperCase() + v.slice(1).replace(/-/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end ml-auto">
          <span className="text-xs text-zinc-500">
            {loading
              ? 'Loading...'
              : `${total} business${total !== 1 ? 'es' : ''} ranked`}
          </span>
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
              fetchLeaderboard(false)
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Retry
          </button>
        </div>
      )}

      {/* Leaderboard Table */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 animate-pulse"
            >
              <div className="h-8 w-8 rounded-full bg-zinc-800/60" />
              <div className="flex-1 min-w-0">
                <div className="h-4 w-40 bg-zinc-800 rounded mb-1.5" />
                <div className="h-3 w-28 bg-zinc-800/50 rounded" />
              </div>
              <div className="h-12 w-12 rounded-full bg-zinc-800/60 flex-shrink-0" />
            </div>
          ))}
        </div>
      ) : entries.length === 0 && !error ? (
        <div className="text-center py-20 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
          <Search className="h-10 w-10 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 font-medium mb-1">
            No ranked businesses found.
          </p>
          <p className="text-sm text-zinc-600">
            Businesses need at least one audit to appear on the leaderboard.
          </p>
        </div>
      ) : (
        <>
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[3rem_1fr_5rem_6rem_8rem] gap-4 px-4 py-2.5 text-[10px] font-medium text-zinc-500 uppercase tracking-wider border-b border-zinc-800/50 mb-1">
            <span>Rank</span>
            <span>Business</span>
            <span className="text-center">Score</span>
            <span className="text-center">Tier</span>
            <span className="text-right">Capabilities</span>
          </div>

          <div className="space-y-1">
            {entries.map((entry) => (
              <Link
                key={entry.id}
                href={`/business/${entry.slug}`}
                className={clsx(
                  'flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-colors group',
                  entry.rank <= 3
                    ? 'bg-zinc-900/70 border-zinc-700/60 hover:border-zinc-600/80'
                    : 'bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700/60'
                )}
              >
                {/* Rank */}
                <div className="flex-shrink-0">
                  <RankIcon rank={entry.rank} />
                </div>

                {/* Business Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-zinc-100 truncate group-hover:text-white transition-colors text-sm sm:text-base">
                      {entry.name}
                    </h3>
                    {entry.has_mcp && (
                      <span className="hidden sm:flex items-center gap-1 text-[10px] font-medium text-emerald-500/70 bg-emerald-500/5 px-1.5 py-0.5 rounded flex-shrink-0">
                        <Zap className="h-2.5 w-2.5" />
                        MCP
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {entry.domain && (
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3 text-zinc-600" />
                        <span className="text-xs text-zinc-500 truncate">
                          {entry.domain}
                        </span>
                      </div>
                    )}
                    {entry.vertical && (
                      <span className="hidden sm:inline text-[10px] font-medium text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded">
                        {entry.vertical}
                      </span>
                    )}
                  </div>
                </div>

                {/* Score Gauge */}
                <div className="flex-shrink-0">
                  <ScoreGauge score={entry.score} size="sm" showLabel={false} />
                </div>

                {/* Tier */}
                <div className="hidden sm:flex flex-shrink-0 justify-center">
                  <TierBadge tier={entry.tier} size="sm" />
                </div>

                {/* Capabilities */}
                <div className="hidden sm:flex flex-shrink-0 flex-wrap justify-end gap-1 max-w-[8rem]">
                  {entry.capabilities.slice(0, 2).map((cap) => (
                    <span
                      key={cap}
                      className="text-[10px] text-zinc-500 bg-zinc-800/60 px-2 py-0.5 rounded truncate max-w-[6rem]"
                    >
                      {cap}
                    </span>
                  ))}
                  {entry.capabilities.length > 2 && (
                    <span className="text-[10px] text-zinc-600 px-1">
                      +{entry.capabilities.length - 2}
                    </span>
                  )}
                </div>
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
                    Load More ({total - entries.length} remaining)
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
