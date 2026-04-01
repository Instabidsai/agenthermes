'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, Shield } from 'lucide-react'
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
  index,
  animate,
}: {
  label: string
  score: number
  dimension: string
  index: number
  animate: boolean
}) {
  const pct = Math.min(Math.max(score, 0), 100)
  return (
    <div
      className={clsx(
        'group transition-all duration-500',
        animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2',
      )}
      style={{ transitionDelay: animate ? `${index * 60}ms` : '0ms' }}
    >
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
          {score}/100
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-zinc-800 overflow-hidden">
        <div
          className={clsx(
            'h-full rounded-full transition-all ease-out',
            pct >= 75
              ? 'bg-emerald-500'
              : pct >= 50
                ? 'bg-yellow-500'
                : pct >= 25
                  ? 'bg-amber-500'
                  : 'bg-red-500'
          )}
          style={{
            width: animate ? `${pct}%` : '0%',
            transitionDuration: '900ms',
            transitionDelay: animate ? `${index * 60 + 100}ms` : '0ms',
          }}
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
  const [animateBars, setAnimateBars] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  // Measure content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [dimensions, expanded])

  // Trigger bar animations after expand
  useEffect(() => {
    if (expanded) {
      const timer = setTimeout(() => setAnimateBars(true), 50)
      return () => clearTimeout(timer)
    } else {
      setAnimateBars(false)
    }
  }, [expanded])

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
        <ChevronDown
          className={clsx(
            'h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-all duration-300',
            expanded && 'rotate-180',
          )}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: expanded ? `${contentHeight + 48}px` : '0px', opacity: expanded ? 1 : 0 }}
      >
        <div
          ref={contentRef}
          className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6 space-y-4"
        >
          {dimensions.map((d, i) => (
            <DimensionBar
              key={d.dimension}
              dimension={d.dimension}
              label={d.label}
              score={d.score}
              index={i}
              animate={animateBars}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
