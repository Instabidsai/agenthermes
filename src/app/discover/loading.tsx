export default function DiscoverLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-pulse">
      {/* Header skeleton */}
      <div className="mb-10">
        <div className="h-8 w-64 bg-zinc-800 rounded-lg mb-2" />
        <div className="h-4 w-96 bg-zinc-800/60 rounded" />
      </div>

      {/* Search bar skeleton */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 h-12 bg-zinc-900/80 border border-zinc-800 rounded-lg" />
          <div className="h-12 w-28 bg-zinc-900/80 border border-zinc-800 rounded-lg" />
        </div>
        <div className="h-4 w-32 bg-zinc-800/40 rounded" />
      </div>

      {/* Card grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
          >
            {/* Title + score row */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0 flex-1">
                <div className="h-5 w-36 bg-zinc-800 rounded mb-2" />
                <div className="h-3 w-28 bg-zinc-800/50 rounded" />
              </div>
              <div className="h-16 w-16 rounded-full bg-zinc-800/60 flex-shrink-0" />
            </div>
            {/* Tier + vertical badges */}
            <div className="flex items-center gap-2 mb-3">
              <div className="h-5 w-14 bg-zinc-800/60 rounded" />
              <div className="h-5 w-16 bg-zinc-800/40 rounded" />
            </div>
            {/* Capability tags */}
            <div className="flex gap-1.5">
              <div className="h-5 w-20 bg-zinc-800/40 rounded" />
              <div className="h-5 w-24 bg-zinc-800/40 rounded" />
              <div className="h-5 w-16 bg-zinc-800/40 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
