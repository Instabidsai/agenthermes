'use client'

import { useEffect, useState } from 'react'
import {
  Eye,
  Search,
  Zap,
  Shield,
  FileText,
  Loader2,
  AlertCircle,
  Bot,
  TrendingUp,
  Calendar,
} from 'lucide-react'

interface AnalyticsData {
  business_id: string
  period: string
  group_by: string
  total_views: number
  total_searches: number
  total_transactions: number
  total_score_checks: number
  total_manifest_views: number
  views_by_day: { date: string; count: number }[]
  top_search_queries: { query: string; count: number }[]
  top_agents: { agent_id: string; count: number }[]
}

interface BusinessOption {
  id: string
  name: string
  slug: string
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  color: string
}) {
  return (
    <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
      <div className="flex items-center gap-2 mb-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="text-3xl font-bold tracking-tight tabular-nums">
        {value.toLocaleString()}
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const [businesses, setBusinesses] = useState<BusinessOption[]>([])
  const [selectedBusiness, setSelectedBusiness] = useState<string>('')
  const [period, setPeriod] = useState<string>('30d')
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingBiz, setLoadingBiz] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load businesses list
  useEffect(() => {
    async function loadBusinesses() {
      setLoadingBiz(true)
      try {
        const res = await fetch('/api/v1/discover?limit=100&sort=name')
        if (!res.ok) throw new Error('Failed to load businesses')
        const json = await res.json()
        const bizList = (json.businesses || []).map((b: any) => ({
          id: b.id,
          name: b.name,
          slug: b.slug,
        }))
        setBusinesses(bizList)
        if (bizList.length > 0) {
          setSelectedBusiness(bizList[0].id)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load businesses')
      } finally {
        setLoadingBiz(false)
      }
    }
    loadBusinesses()
  }, [])

  // Load analytics when business or period changes
  useEffect(() => {
    if (!selectedBusiness) return

    async function loadAnalytics() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `/api/v1/analytics?business_id=${selectedBusiness}&period=${period}&group_by=day`
        )
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: 'Failed to load analytics' }))
          throw new Error(err.error || 'Failed to load analytics')
        }
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics')
      } finally {
        setLoading(false)
      }
    }
    loadAnalytics()
  }, [selectedBusiness, period])

  if (loadingBiz) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
          <span className="ml-3 text-zinc-400">Loading businesses...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Agent Analytics
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            See how AI agents discover and interact with your business.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Business selector */}
          <select
            value={selectedBusiness}
            onChange={(e) => setSelectedBusiness(e.target.value)}
            className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-600"
          >
            {businesses.map((biz) => (
              <option key={biz.id} value={biz.id}>
                {biz.name}
              </option>
            ))}
          </select>

          {/* Period selector */}
          <div className="flex rounded-lg border border-zinc-700 overflow-hidden">
            {['7d', '30d', '90d'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-2 text-xs font-medium transition-colors ${
                  period === p
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-950/30 border border-red-800/40 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-400">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
          <span className="ml-3 text-zinc-400">Loading analytics...</span>
        </div>
      ) : data ? (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard
              label="Profile Views"
              value={data.total_views}
              icon={Eye}
              color="bg-zinc-800 text-zinc-300"
            />
            <StatCard
              label="Search Impressions"
              value={data.total_searches}
              icon={Search}
              color="bg-zinc-800 text-zinc-300"
            />
            <StatCard
              label="Service Calls"
              value={data.total_transactions}
              icon={Zap}
              color="bg-emerald-500/10 text-emerald-400"
            />
            <StatCard
              label="Score Checks"
              value={data.total_score_checks}
              icon={Shield}
              color="bg-zinc-800 text-zinc-300"
            />
            <StatCard
              label="Manifest Views"
              value={data.total_manifest_views}
              icon={FileText}
              color="bg-zinc-800 text-zinc-300"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity Timeline */}
            <div className="lg:col-span-2 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-zinc-500" />
                <h3 className="text-sm font-semibold text-zinc-400">
                  Activity Over Time
                </h3>
              </div>
              {data.views_by_day.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left py-2 px-3 text-xs text-zinc-500 font-medium">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Date
                          </div>
                        </th>
                        <th className="text-right py-2 px-3 text-xs text-zinc-500 font-medium">
                          Events
                        </th>
                        <th className="text-left py-2 px-3 text-xs text-zinc-500 font-medium">
                          Bar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.views_by_day.map((day) => {
                        const maxCount = Math.max(
                          ...data.views_by_day.map((d) => d.count)
                        )
                        const pct = maxCount > 0 ? (day.count / maxCount) * 100 : 0
                        return (
                          <tr
                            key={day.date}
                            className="border-b border-zinc-800/50 hover:bg-zinc-800/30"
                          >
                            <td className="py-2 px-3 text-zinc-300 font-mono text-xs">
                              {day.date}
                            </td>
                            <td className="py-2 px-3 text-right text-zinc-200 tabular-nums font-medium">
                              {day.count}
                            </td>
                            <td className="py-2 px-3">
                              <div className="w-full bg-zinc-800 rounded-full h-2">
                                <div
                                  className="bg-emerald-500 h-2 rounded-full transition-all"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-zinc-600 text-center py-8">
                  No activity data for this period.
                </p>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Search Queries */}
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="h-4 w-4 text-zinc-500" />
                  <h3 className="text-sm font-semibold text-zinc-400">
                    Top Search Queries
                  </h3>
                </div>
                {data.top_search_queries.length > 0 ? (
                  <div className="space-y-2">
                    {data.top_search_queries.map((q, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-1.5"
                      >
                        <span className="text-xs text-zinc-300 truncate mr-2">
                          {q.query}
                        </span>
                        <span className="text-xs text-zinc-500 tabular-nums flex-shrink-0">
                          {q.count}x
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-600 text-center py-4">
                    No search queries yet.
                  </p>
                )}
              </div>

              {/* Which Agents Are Finding You */}
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="h-4 w-4 text-zinc-500" />
                  <h3 className="text-sm font-semibold text-zinc-400">
                    Which Agents Are Finding You
                  </h3>
                </div>
                {data.top_agents.length > 0 ? (
                  <div className="space-y-2">
                    {data.top_agents.map((agent, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-1.5"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 flex-shrink-0">
                            <Bot className="h-3 w-3" />
                          </div>
                          <span className="text-xs text-zinc-300 truncate">
                            {agent.agent_id}
                          </span>
                        </div>
                        <span className="text-xs text-zinc-500 tabular-nums flex-shrink-0 ml-2">
                          {agent.count} visits
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-600 text-center py-4">
                    No agents identified yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-24">
          <Search className="h-10 w-10 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500">
            Select a business to view analytics.
          </p>
        </div>
      )}
    </div>
  )
}
