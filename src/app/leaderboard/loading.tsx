export default function LeaderboardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-pulse">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-zinc-800/60" />
          <div className="h-8 w-44 bg-zinc-800 rounded-lg" />
        </div>
        <div className="h-4 w-80 bg-zinc-800/50 rounded ml-[52px]" />
      </div>

      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div>
          <div className="h-3 w-28 bg-zinc-800/40 rounded mb-1.5" />
          <div className="h-10 w-[180px] bg-zinc-900/80 border border-zinc-800 rounded-md" />
        </div>
        <div className="ml-auto">
          <div className="h-3 w-28 bg-zinc-800/40 rounded" />
        </div>
      </div>

      {/* Table header */}
      <div className="hidden sm:grid grid-cols-[3rem_1fr_5rem_6rem_8rem] gap-4 px-4 py-2.5 border-b border-zinc-800/50 mb-1">
        <div className="h-3 w-8 bg-zinc-800/40 rounded" />
        <div className="h-3 w-16 bg-zinc-800/40 rounded" />
        <div className="h-3 w-10 bg-zinc-800/40 rounded mx-auto" />
        <div className="h-3 w-8 bg-zinc-800/40 rounded mx-auto" />
        <div className="h-3 w-20 bg-zinc-800/40 rounded ml-auto" />
      </div>

      {/* Rank rows */}
      <div className="space-y-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-3.5 rounded-xl border bg-zinc-900/30 border-zinc-800/50"
          >
            {/* Rank circle */}
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-zinc-800/60" />
            </div>

            {/* Business info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="h-4 w-40 bg-zinc-800 rounded" />
                {i < 3 && (
                  <div className="h-4 w-10 bg-emerald-500/10 rounded" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-28 bg-zinc-800/50 rounded" />
                <div className="hidden sm:block h-3 w-16 bg-zinc-800/40 rounded" />
              </div>
            </div>

            {/* Score gauge */}
            <div className="h-12 w-12 rounded-full bg-zinc-800/60 flex-shrink-0" />

            {/* Tier badge */}
            <div className="hidden sm:block h-5 w-14 bg-zinc-800/50 rounded flex-shrink-0" />

            {/* Capability tags */}
            <div className="hidden sm:flex flex-shrink-0 gap-1 max-w-[8rem]">
              <div className="h-5 w-16 bg-zinc-800/40 rounded" />
              <div className="h-5 w-14 bg-zinc-800/30 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* CTA card */}
      <div className="mt-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
        <div className="h-5 w-28 bg-zinc-800 rounded mx-auto mb-2" />
        <div className="h-4 w-72 bg-zinc-800/50 rounded mx-auto mb-4" />
        <div className="h-11 w-64 bg-zinc-800/60 rounded-lg mx-auto" />
      </div>
    </div>
  )
}
