export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <div className="h-8 w-48 bg-zinc-800 rounded-lg mb-2" />
          <div className="h-4 w-72 bg-zinc-800/50 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-28 bg-zinc-900/80 border border-zinc-800 rounded-lg" />
          <div className="h-10 w-44 bg-zinc-800/60 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business card skeletons — main column */}
        <div className="lg:col-span-2 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-5 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
            >
              {/* Score gauge placeholder */}
              <div className="h-14 w-14 rounded-full bg-zinc-800/60 flex-shrink-0" />

              {/* Business info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="h-5 w-40 bg-zinc-800 rounded" />
                  <div className="h-5 w-14 bg-zinc-800/50 rounded" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-3 w-28 bg-zinc-800/50 rounded" />
                  <div className="h-3 w-20 bg-zinc-800/40 rounded" />
                </div>
              </div>

              {/* Arrow icon placeholder */}
              <div className="h-4 w-4 bg-zinc-800/40 rounded flex-shrink-0" />
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Wallet card */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-4 w-4 bg-zinc-800/60 rounded" />
              <div className="h-4 w-24 bg-zinc-800/60 rounded" />
            </div>
            <div className="h-9 w-28 bg-zinc-800 rounded mb-2" />
            <div className="h-3 w-20 bg-zinc-800/50 rounded" />
          </div>

          {/* Recent transactions */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="h-4 w-36 bg-zinc-800/60 rounded mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-zinc-800/60 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="h-3 w-32 bg-zinc-800/50 rounded mb-1" />
                    <div className="h-2 w-16 bg-zinc-800/30 rounded" />
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="h-3 w-14 bg-zinc-800/50 rounded mb-1" />
                    <div className="h-2 w-10 bg-zinc-800/30 rounded ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions card */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="h-4 w-28 bg-zinc-800/60 rounded mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-full bg-zinc-800/40 border border-zinc-800/60 rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
