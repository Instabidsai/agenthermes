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

/** Background color for the platform logo circle */
const logoCircleColors: Record<string, string> = {
  ai: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  video: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  voice: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  media: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  database: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  payments: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  communication: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  analytics: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
}

const statusConfig: Record<string, { label: string; dot: string; text: string }> = {
  active: { label: 'Live', dot: 'bg-emerald-500', text: 'text-emerald-400' },
  maintenance: { label: 'Maintenance', dot: 'bg-amber-500', text: 'text-amber-400' },
  pending: { label: 'Pending', dot: 'bg-amber-500', text: 'text-amber-400' },
  inactive: { label: 'Offline', dot: 'bg-red-500', text: 'text-red-400' },
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

function getInitials(name: string): string {
  return name
    .split(/[\s-_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

// ---------------------------------------------------------------------------
// Skeleton card for loading states
// ---------------------------------------------------------------------------

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 animate-pulse">
      <div className="flex items-start gap-4 mb-4">
        <div className="h-11 w-11 rounded-full bg-zinc-800/80" />
        <div className="flex-1 min-w-0">
          <div className="h-5 w-32 bg-zinc-800 rounded mb-2" />
          <div className="h-3 w-20 bg-zinc-800/60 rounded" />
        </div>
        <div className="h-5 w-12 bg-zinc-800/60 rounded-full" />
      </div>
      <div className="h-4 w-full bg-zinc-800/40 rounded mb-2" />
      <div className="h-4 w-2/3 bg-zinc-800/30 rounded mb-5" />
      <div className="flex items-center gap-3 mb-4">
        <div className="h-4 w-16 bg-zinc-800/40 rounded" />
        <div className="h-4 w-14 bg-zinc-800/30 rounded" />
        <div className="h-4 w-12 bg-zinc-800/30 rounded" />
      </div>
      <div className="pt-4 border-t border-zinc-800/40">
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 bg-zinc-800/40 rounded" />
          <div className="h-4 w-14 bg-zinc-800/30 rounded" />
        </div>
      </div>
    </div>
  )
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
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
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
            const catKey = service.category?.toLowerCase() || ''
            const catColor =
              categoryColors[catKey] ||
              'text-zinc-400 bg-zinc-500/10 border-zinc-500/20'
            const logoColor =
              logoCircleColors[catKey] ||
              'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
            const actionCount = service.actions?.length || 0
            const initials = getInitials(service.name)

            return (
              <Link
                key={service.id}
                href={`/gateway/${service.id}`}
                className="group relative rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 hover:border-emerald-500/50 hover:bg-zinc-900/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-200"
              >
                {/* Top: Logo + name + status */}
                <div className="flex items-start gap-3.5 mb-4">
                  {/* Platform logo circle */}
                  <div
                    className={clsx(
                      'flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold flex-shrink-0',
                      logoColor
                    )}
                  >
                    {initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold tracking-tight truncate group-hover:text-emerald-400 transition-colors duration-200">
                      {service.name}
                    </h3>
                    {/* Category badge */}
                    {service.category && (
                      <span
                        className={clsx(
                          'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border mt-1',
                          catColor
                        )}
                      >
                        {service.category}
                      </span>
                    )}
                  </div>

                  {/* Status badge with pulse */}
                  <span className={clsx('flex items-center gap-1.5 text-[11px] flex-shrink-0', status.text)}>
                    <span className="relative flex h-2 w-2">
                      {service.status === 'active' && (
                        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping" />
                      )}
                      {(service.status === 'pending' || service.status === 'maintenance') && (
                        <span className="absolute inset-0 rounded-full bg-amber-500/40 animate-pulse" />
                      )}
                      <span className={clsx('relative inline-flex rounded-full h-2 w-2', status.dot)} />
                    </span>
                    {status.label}
                  </span>
                </div>

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

                  <span className="inline-flex items-center gap-1 text-xs text-zinc-600 group-hover:text-emerald-400 transition-colors duration-200">
                    Details
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200" />
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

export { SkeletonCard as GatewaySkeletonCard }
