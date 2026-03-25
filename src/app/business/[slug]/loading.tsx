export default function BusinessProfileLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-56 bg-zinc-800 rounded-lg" />
            <div className="h-6 w-16 bg-zinc-800 rounded-md" />
          </div>
          <div className="h-4 w-40 bg-zinc-800/60 rounded mb-3" />
          <div className="h-4 w-full max-w-md bg-zinc-800/40 rounded mb-2" />
          <div className="h-4 w-3/4 max-w-sm bg-zinc-800/40 rounded" />
          <div className="mt-3 flex gap-2">
            <div className="h-6 w-20 bg-zinc-800/60 rounded-md" />
            <div className="h-6 w-24 bg-zinc-800/40 rounded-md" />
            <div className="h-6 w-28 bg-zinc-800/40 rounded-md" />
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="h-32 w-32 rounded-full bg-zinc-800/60" />
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5">
            <div className="h-4 w-4 bg-zinc-800 rounded mb-3" />
            <div className="h-7 w-16 bg-zinc-800 rounded mb-2" />
            <div className="h-3 w-24 bg-zinc-800/60 rounded" />
          </div>
        ))}
      </div>

      {/* Services table skeleton */}
      <div className="mt-10">
        <div className="h-6 w-32 bg-zinc-800 rounded mb-4" />
        <div className="overflow-hidden rounded-xl border border-zinc-800/80">
          <div className="bg-zinc-900/50 px-4 py-3 flex gap-8">
            <div className="h-3 w-20 bg-zinc-800/60 rounded" />
            <div className="h-3 w-16 bg-zinc-800/60 rounded" />
            <div className="h-3 w-14 bg-zinc-800/60 rounded" />
            <div className="h-3 w-20 bg-zinc-800/60 rounded" />
            <div className="h-3 w-16 bg-zinc-800/60 rounded" />
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-4 py-4 border-t border-zinc-800/80 flex gap-8">
              <div className="flex-1">
                <div className="h-4 w-36 bg-zinc-800/50 rounded mb-1" />
                <div className="h-3 w-48 bg-zinc-800/30 rounded" />
              </div>
              <div className="h-4 w-20 bg-zinc-800/40 rounded" />
              <div className="h-4 w-14 bg-zinc-800/40 rounded" />
              <div className="h-4 w-12 bg-zinc-800/40 rounded" />
              <div className="h-4 w-16 bg-zinc-800/40 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
