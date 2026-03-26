export default function ReportLoading() {
  return (
    <div className="relative">
      {/* Hero skeleton */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="text-center">
            <div className="inline-flex h-7 w-40 rounded-full bg-zinc-800 animate-pulse mb-6" />
            <div className="h-12 w-96 max-w-full mx-auto rounded-lg bg-zinc-800 animate-pulse mb-4" />
            <div className="h-5 w-80 max-w-full mx-auto rounded bg-zinc-800/60 animate-pulse mb-10" />
          </div>
        </div>
      </section>

      {/* 4 stat cards */}
      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="h-9 w-9 rounded-lg bg-zinc-800 animate-pulse mb-3" />
                <div className="h-8 w-24 rounded bg-zinc-800 animate-pulse mb-2" />
                <div className="h-3 w-32 rounded bg-zinc-800/60 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier distribution skeleton */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-52 rounded bg-zinc-800 animate-pulse mb-2" />
          <div className="h-4 w-72 rounded bg-zinc-800/60 animate-pulse mb-8" />

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/30 text-center"
              >
                <div className="h-8 w-10 mx-auto rounded bg-zinc-800 animate-pulse mb-2" />
                <div className="h-3 w-16 mx-auto rounded bg-zinc-800/60 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Distribution bar */}
          <div className="mt-6 h-3 rounded-full bg-zinc-800 animate-pulse" />
        </div>
      </section>

      {/* Dimension bars skeleton */}
      <section className="py-10 sm:py-14 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 rounded bg-zinc-800 animate-pulse mb-2" />
          <div className="h-4 w-64 rounded bg-zinc-800/60 animate-pulse mb-8" />

          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="h-4 w-40 rounded bg-zinc-800/60 animate-pulse" />
                  <div className="h-4 w-10 rounded bg-zinc-800/60 animate-pulse" />
                </div>
                <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-zinc-700 animate-pulse"
                    style={{ width: `${70 - i * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table skeleton */}
      <section className="py-10 sm:py-14 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-64 rounded bg-zinc-800 animate-pulse mb-2" />
          <div className="h-4 w-56 rounded bg-zinc-800/60 animate-pulse mb-8" />

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden">
            <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-zinc-900/80 border-b border-zinc-800/50">
              <div className="h-3 w-20 rounded bg-zinc-700 animate-pulse" />
              <div className="h-3 w-12 rounded bg-zinc-700 animate-pulse mx-auto" />
              <div className="h-3 w-16 rounded bg-zinc-700 animate-pulse ml-auto" />
            </div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-3 gap-4 px-5 py-3 border-b border-zinc-800/30 last:border-b-0"
              >
                <div className="h-4 w-28 rounded bg-zinc-800/60 animate-pulse" />
                <div className="h-4 w-8 rounded bg-zinc-800/60 animate-pulse mx-auto" />
                <div className="flex items-center justify-end gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-zinc-800 animate-pulse" />
                  <div className="h-4 w-8 rounded bg-zinc-800/60 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
