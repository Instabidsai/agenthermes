'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Shield } from 'lucide-react'
import clsx from 'clsx'

interface DimensionData {
  dimension: string
  label: string
  score: number
  weight: number
}

function DimensionBar({
  label,
  score,
  dimension,
}: {
  label: string
  score: number
  dimension: string
}) {
  const pct = Math.min(Math.max(score, 0), 100)
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-600 w-5">
            {dimension}
          </span>
          <span className="text-sm text-zinc-300 font-medium">{label}</span>
        </div>
        <span
          className={clsx(
            'text-sm font-bold tabular-nums',
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

export default function TechnicalDetailsSection({
  dimensions,
}: {
  dimensions: DimensionData[]
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="mb-10">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between gap-2 mb-4 group"
      >
        <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-400 group-hover:text-zinc-200 transition-colors">
          <Shield className="h-4 w-4 text-zinc-500" />
          Technical Details — 9 Dimensions
        </h2>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
        ) : (
          <ChevronDown className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
        )}
      </button>

      {expanded && (
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6 space-y-4">
          {dimensions.map((d) => (
            <DimensionBar
              key={d.dimension}
              dimension={d.dimension}
              label={d.label}
              score={d.score}
            />
          ))}
        </div>
      )}
    </section>
  )
}
