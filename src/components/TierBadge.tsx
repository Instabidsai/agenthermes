import clsx from 'clsx'

const tierConfig = {
  unaudited: {
    label: 'Not Scored',
    bg: 'bg-zinc-800',
    text: 'text-zinc-400',
    border: 'border-zinc-700',
  },
  bronze: {
    label: 'Bronze',
    bg: 'bg-amber-950/50',
    text: 'text-amber-500',
    border: 'border-amber-800/50',
  },
  silver: {
    label: 'Silver',
    bg: 'bg-zinc-800/50',
    text: 'text-zinc-300',
    border: 'border-zinc-500/50',
  },
  gold: {
    label: 'Gold',
    bg: 'bg-yellow-950/50',
    text: 'text-yellow-500',
    border: 'border-yellow-700/50',
  },
  platinum: {
    label: 'Platinum',
    bg: 'bg-emerald-950/50',
    text: 'text-emerald-400',
    border: 'border-emerald-700/50',
  },
} as const

export default function TierBadge({
  tier,
  size = 'sm',
}: {
  tier: keyof typeof tierConfig
  size?: 'sm' | 'md' | 'lg'
}) {
  const config = tierConfig[tier] || tierConfig.unaudited

  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium border rounded-full',
        config.bg,
        config.text,
        config.border,
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-3 py-1 text-sm',
        size === 'lg' && 'px-4 py-1.5 text-base'
      )}
    >
      {config.label}
    </span>
  )
}
