'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Activity,
  Terminal,
  DollarSign,
  Zap,
  ArrowRight,
  Layers,
} from 'lucide-react'
import clsx from 'clsx'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GatewayServiceCard {
  id: string
  name: string
  description: string | null
  category: string | null
  status: string
  cost_per_call: number
  cost_model: string
  our_margin: number
  actions: { name: string }[]
  rate_limit_per_min: number
  uptime_pct: number | null
}

interface GatewayFilterProps {
  services: GatewayServiceCard[]
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const categories = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI' },
  { key: 'video', label: 'Video' },
  { key: 'voice', label: 'Voice' },
  { key: 'media', label: 'Media' },
  { key: 'database', label: 'Database' },
  { key: 'payments', label: 'Payments' },
  { key: 'communication', label: 'Communication' },
  { key: 'analytics', label: 'Analytics' },
]

const categoryColors: Record<string, string> = {
  ai: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  video: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  voice: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  media: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  database: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  payments: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  communication: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  analytics: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
}

const statusConfig: Record<string, { label: string; dot: string }> = {
  active: { label: 'Live', dot: 'bg-emerald-500' },
  maintenance: { label: 'Maintenance', dot: 'bg-amber-500' },
  inactive: { label: 'Offline', dot: 'bg-red-500' },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCost(n: number): string {
  if (n === 0) return 'Free'
  if (n < 0.01) return `$${n.toFixed(4)}`
  if (n < 1) return `$${n.toFixed(3)}`
  return `$${n.toFixed(2)}`
}

function getCostRange(service: GatewayServiceCard): string {
  const base = service.cost_per_call
  const withMargin = base + base * service.our_margin
  if (base === 0) return 'Free'
  return `${formatCost(base)} - ${formatCost(withMargin)}`
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function GatewayFilter({ services }: GatewayFilterProps) {
  const [active, setActive] = useState('all')

  // Count per category (only show pills that have services)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: services.length }
    for (const s of services) {
      const cat = s.category?.toLowerCase() || 'other'
      counts[cat] = (counts[cat] || 0) + 1
    }
    return counts
  }, [services])

  const visibleCategories = categories.filter(
    (c) => c.key === 'all' || (categoryCounts[c.key] && categoryCounts[c.key] > 0)
  )

  const filtered = useMemo(() => {
    if (active === 'all') return services
    return services.filter(
      (s) => (s.category?.toLowerCase() || '') === active
    )
  }, [services, active])

  return (
    <>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {visibleCategories.map((cat) => {
          const isActive = active === cat.key
          const count = categoryCounts[cat.key] || 0
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActive(cat.key)}
              className={clsx(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800/80 hover:border-zinc-700 hover:text-zinc-200'
              )}
            >
              {cat.label}
              <span
                className={clsx(
                  'inline-flex items-center justify-center h-5 min-w-[20px] rounded-full text-[11px] font-bold tabular-nums px-1.5',
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-zinc-800 text-zinc-500'
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Service grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-12 text-center">
          <Layers className="h-10 w-10 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-zinc-400 mb-2">
            No services found
          </h3>
          <p className="text-sm text-zinc-600">
            No gateway services match this category yet. Check back soon or connect your own.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((service) => {
            const status = statusConfig[service.status] || statusConfig.inactive
            const catColor =
              categoryColors[service.category?.toLowerCase() || ''] ||
              'text-zinc-400 bg-zinc-500/10 border-zinc-500/20'
            const actionCount = service.actions?.length || 0

            return (
              <Link
                key={service.id}
                href={`/gateway/${service.id}`}
                className="group relative rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all"
              >
                {/* Status dot */}
                <div className="absolute top-5 right-5">
                  <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <span
                      className={clsx(
                        'h-2 w-2 rounded-full',
                        status.dot,
                        service.status === 'active' && 'animate-subtle-pulse'
                      )}
                    />
                    {status.label}
                  </span>
                </div>

                {/* Category badge */}
                {service.category && (
                  <span
                    className={clsx(
                      'inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border mb-4',
                      catColor
                    )}
                  >
                    {service.category}
                  </span>
                )}

                {/* Name */}
                <h3 className="text-lg font-bold tracking-tight mb-2 group-hover:text-emerald-400 transition-colors pr-16">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-500 leading-relaxed mb-5 line-clamp-2">
                  {service.description || 'No description available.'}
                </p>

                {/* Meta row */}
                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                  {/* Action count badge */}
                  <span className="inline-flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5" />
                    <span className="font-mono font-semibold text-zinc-300">
                      {actionCount}
                    </span>
                    action{actionCount !== 1 ? 's' : ''}
                  </span>

                  {/* Rate limit */}
                  <span className="inline-flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5" />
                    <span className="font-mono">{service.rate_limit_per_min}</span>
                    /min
                  </span>

                  {/* Uptime */}
                  {service.uptime_pct !== null && service.uptime_pct !== undefined && (
                    <span className="inline-flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5" />
                      <span className="font-mono text-emerald-400">
                        {service.uptime_pct.toFixed(0)}%
                      </span>
                    </span>
                  )}
                </div>

                {/* Cost + CTA row */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60">
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <DollarSign className="h-3.5 w-3.5 text-zinc-600" />
                    <span className="font-mono font-semibold text-zinc-300">
                      {getCostRange(service)}
                    </span>
                    <span className="text-zinc-600 text-xs">/call</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs text-zinc-600 group-hover:text-emerald-400 transition-colors">
                    Details
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
