'use client'

import clsx from 'clsx'
import {
  Search,
  BookOpen,
  UserPlus,
  Plug,
  Activity,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react'

// -- Types -------------------------------------------------------------------

export interface DimensionScore {
  dimension: string // e.g. "D1", "D2", ...
  score: number
}

interface JourneyStep {
  step: number
  name: string
  question: string
  dimensionKeys: string[]
  icon: typeof Search
  score: number
  status: 'ready' | 'partial' | 'not-ready'
}

// -- Mapping 9 dimensions → 6 journey steps ----------------------------------

const JOURNEY_DEFINITION: {
  step: number
  name: string
  question: string
  dimensionKeys: string[]
  icon: typeof Search
}[] = [
  {
    step: 1,
    name: 'FIND',
    question: 'Can an agent discover this business?',
    dimensionKeys: ['D1'],
    icon: Search,
  },
  {
    step: 2,
    name: 'UNDERSTAND',
    question: 'Can an agent understand what it offers?',
    dimensionKeys: ['D6', 'D9'],
    icon: BookOpen,
  },
  {
    step: 3,
    name: 'SIGN UP',
    question: 'Can an agent create an account?',
    dimensionKeys: ['D3'],
    icon: UserPlus,
  },
  {
    step: 4,
    name: 'CONNECT',
    question: 'Can an agent authenticate and call the API?',
    dimensionKeys: ['D2', 'D7'],
    icon: Plug,
  },
  {
    step: 5,
    name: 'USE',
    question: 'Can an agent get reliable responses?',
    dimensionKeys: ['D8'],
    icon: Activity,
  },
  {
    step: 6,
    name: 'PAY',
    question: 'Can an agent pay programmatically?',
    dimensionKeys: ['D4', 'D5'],
    icon: CreditCard,
  },
]

function getStatus(score: number): 'ready' | 'partial' | 'not-ready' {
  if (score >= 60) return 'ready'
  if (score >= 40) return 'partial'
  return 'not-ready'
}

function computeJourneySteps(dimensions: DimensionScore[]): JourneyStep[] {
  const dimMap = new Map<string, number>()
  for (const d of dimensions) {
    dimMap.set(d.dimension, d.score)
  }

  return JOURNEY_DEFINITION.map((def) => {
    const scores = def.dimensionKeys
      .map((k) => dimMap.get(k))
      .filter((v): v is number => v !== undefined)

    const score =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0

    return {
      ...def,
      score,
      status: getStatus(score),
    }
  })
}

// -- Status config -----------------------------------------------------------

const STATUS_CONFIG = {
  ready: {
    label: 'Ready',
    icon: CheckCircle2,
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    barColor: 'bg-emerald-500',
    dotColor: 'bg-emerald-500',
    connectorColor: 'bg-emerald-500/40',
  },
  partial: {
    label: 'Partial',
    icon: AlertCircle,
    textColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    barColor: 'bg-amber-500',
    dotColor: 'bg-amber-500',
    connectorColor: 'bg-amber-500/40',
  },
  'not-ready': {
    label: 'Not Ready',
    icon: XCircle,
    textColor: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    barColor: 'bg-red-500',
    dotColor: 'bg-red-500',
    connectorColor: 'bg-red-500/20',
  },
} as const

// -- Component ---------------------------------------------------------------

export default function AgentJourneyScore({
  dimensions,
}: {
  dimensions: DimensionScore[]
}) {
  const steps = computeJourneySteps(dimensions)
  const readyCount = steps.filter((s) => s.status === 'ready').length

  return (
    <div className="space-y-6">
      {/* Summary line */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
          <Activity className="h-4 w-4 text-emerald-500" />
          Agent Journey
        </h2>
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'text-sm font-bold tabular-nums',
              readyCount >= 5
                ? 'text-emerald-400'
                : readyCount >= 3
                  ? 'text-amber-400'
                  : 'text-red-400'
            )}
          >
            {readyCount} of {steps.length} steps ready
          </span>
        </div>
      </div>

      {/* Horizontal pipeline — desktop */}
      <div className="hidden sm:block">
        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-zinc-800 z-0" />
          <div className="grid grid-cols-6 gap-2 relative z-10">
            {steps.map((step, i) => {
              const cfg = STATUS_CONFIG[step.status]
              const StepIcon = step.icon
              const StatusIcon = cfg.icon

              return (
                <div key={step.step} className="flex flex-col items-center">
                  {/* Circle with icon */}
                  <div
                    className={clsx(
                      'relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all',
                      cfg.bgColor,
                      cfg.borderColor
                    )}
                  >
                    <StepIcon className={clsx('h-5 w-5', cfg.textColor)} />
                    {/* Status badge */}
                    <div
                      className={clsx(
                        'absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-950 border',
                        cfg.borderColor
                      )}
                    >
                      <StatusIcon className={clsx('h-3 w-3', cfg.textColor)} />
                    </div>
                  </div>

                  {/* Step number + name */}
                  <div className="mt-3 text-center">
                    <div className="text-[10px] font-mono text-zinc-600 mb-0.5">
                      STEP {step.step}
                    </div>
                    <div
                      className={clsx(
                        'text-xs font-bold tracking-wide',
                        cfg.textColor
                      )}
                    >
                      {step.name}
                    </div>
                  </div>

                  {/* Score */}
                  <div
                    className={clsx(
                      'mt-2 text-lg font-black tabular-nums',
                      cfg.textColor
                    )}
                  >
                    {step.score}
                  </div>

                  {/* Status label */}
                  <div
                    className={clsx(
                      'mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold',
                      cfg.bgColor,
                      cfg.textColor
                    )}
                  >
                    {cfg.label}
                  </div>

                  {/* Question tooltip — small text */}
                  <p className="mt-2 text-[10px] text-zinc-600 text-center leading-tight max-w-[110px]">
                    {step.question}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Vertical list — mobile */}
      <div className="sm:hidden space-y-3">
        {steps.map((step, i) => {
          const cfg = STATUS_CONFIG[step.status]
          const StepIcon = step.icon
          const StatusIcon = cfg.icon

          return (
            <div
              key={step.step}
              className={clsx(
                'flex items-center gap-4 p-4 rounded-xl border',
                cfg.bgColor,
                cfg.borderColor
              )}
            >
              {/* Icon */}
              <div
                className={clsx(
                  'flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0',
                  step.status === 'ready'
                    ? 'bg-emerald-500/20'
                    : step.status === 'partial'
                      ? 'bg-amber-500/20'
                      : 'bg-red-500/20'
                )}
              >
                <StepIcon className={clsx('h-5 w-5', cfg.textColor)} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-mono text-zinc-600">
                    STEP {step.step}
                  </span>
                  <span
                    className={clsx(
                      'text-sm font-bold tracking-wide',
                      cfg.textColor
                    )}
                  >
                    {step.name}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-tight">
                  {step.question}
                </p>
              </div>

              {/* Score + status */}
              <div className="flex flex-col items-end flex-shrink-0">
                <span
                  className={clsx(
                    'text-xl font-black tabular-nums',
                    cfg.textColor
                  )}
                >
                  {step.score}
                </span>
                <div className="flex items-center gap-1">
                  <StatusIcon className={clsx('h-3 w-3', cfg.textColor)} />
                  <span
                    className={clsx('text-[10px] font-semibold', cfg.textColor)}
                  >
                    {cfg.label}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
