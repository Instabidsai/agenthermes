import Link from 'next/link'
import { Clock } from 'lucide-react'
import { getServiceClient } from '@/lib/supabase'
import TierBadge from '@/components/TierBadge'

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then
  const diffSec = Math.floor(diffMs / 1000)

  if (diffSec < 60) return 'just now'
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 30) return `${diffDay}d ago`
  const diffMonth = Math.floor(diffDay / 30)
  return `${diffMonth}mo ago`
}

export default async function RecentlyScanned() {
  let businesses: Record<string, any>[] = []

  try {
    const db = getServiceClient()
    const { data } = await db
      .from('businesses')
      .select('name, domain, slug, audit_score, audit_tier, updated_at')
      .order('updated_at', { ascending: false })
      .limit(5)

    businesses = (data as Record<string, any>[]) || []
  } catch {
    // Silently fail — the section just won't render
    return null
  }

  if (businesses.length === 0) return null

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-4 w-4 text-zinc-600" />
          <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
            Recently Scanned
          </h2>
          <div className="h-px flex-1 bg-zinc-800/50" />
        </div>

        <div className="space-y-2">
          {businesses.map((biz) => (
            <Link
              key={biz.slug}
              href={`/business/${biz.slug}`}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-900/50 transition-colors group"
            >
              {/* Domain */}
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors truncate block">
                  {biz.domain || biz.name}
                </span>
              </div>

              {/* Score */}
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-mono font-bold tabular-nums text-zinc-300">
                  {biz.audit_score != null ? biz.audit_score : '—'}
                </span>
                {biz.audit_score != null && (
                  <span className="text-xs text-zinc-600">/100</span>
                )}
              </div>

              {/* Tier badge */}
              <div className="flex-shrink-0">
                <TierBadge tier={biz.audit_tier || 'unaudited'} size="sm" />
              </div>

              {/* Time ago */}
              <span className="text-xs text-zinc-600 flex-shrink-0 w-16 text-right tabular-nums">
                {biz.updated_at ? timeAgo(biz.updated_at) : '—'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
