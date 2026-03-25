'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'

function getScoreColor(score: number): string {
  if (score >= 80) return '#10b981' // emerald-500
  if (score >= 60) return '#eab308' // yellow-500
  if (score >= 40) return '#f59e0b' // amber-500
  if (score > 0) return '#ef4444' // red-500
  return '#71717a' // zinc-500 — grey for unrated
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  if (score > 0) return 'Needs Work'
  return 'Unrated'
}

export default function ScoreGauge({
  score,
  size = 'md',
  showLabel = true,
}: {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}) {
  const circleRef = useRef<SVGCircleElement>(null)
  const color = getScoreColor(score)
  const label = getScoreLabel(score)

  const dimensions = {
    sm: { width: 64, stroke: 4, fontSize: 'text-sm', labelSize: 'text-[9px]' },
    md: { width: 96, stroke: 5, fontSize: 'text-xl', labelSize: 'text-[10px]' },
    lg: { width: 128, stroke: 6, fontSize: 'text-3xl', labelSize: 'text-xs' },
  }

  const { width, stroke, fontSize, labelSize } = dimensions[size]
  const radius = (width - stroke * 2) / 2
  const circumference = 2 * Math.PI * radius
  const progress = score / 100
  const offset = circumference * (1 - progress)

  useEffect(() => {
    const circle = circleRef.current
    if (!circle) return
    // Start fully hidden, then animate to target offset
    circle.style.strokeDashoffset = String(circumference)
    // Force a reflow so the browser registers the initial value
    circle.getBoundingClientRect()
    circle.style.strokeDashoffset = String(offset)
  }, [circumference, offset])

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg
        width={width}
        height={width}
        viewBox={`0 0 ${width} ${width}`}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke="#27272a"
          strokeWidth={stroke}
        />
        {/* Score arc */}
        <circle
          ref={circleRef}
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            transition: 'stroke-dashoffset 1s ease-out',
          }}
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={clsx('font-semibold tabular-nums', fontSize)} style={{ color }}>
          {score}
        </span>
        {showLabel && (
          <span className={clsx('text-zinc-500 font-medium', labelSize)}>
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
