export default function DevelopersLoading() {
  return (
    <div className="relative animate-pulse">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="text-center">
            <div className="inline-flex h-7 w-48 rounded-full bg-zinc-800 mb-8" />
            <div className="h-12 w-96 max-w-full mx-auto rounded-lg bg-zinc-800 mb-5" />
            <div className="h-5 w-80 max-w-full mx-auto rounded bg-zinc-800/60 mb-3" />
            <div className="h-5 w-64 max-w-full mx-auto rounded bg-zinc-800/40 mb-10" />

            {/* TOC pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['Quick Start', 'MCP Integration', 'API Reference', 'Authentication', 'SDKs', 'Discovery Files', 'Rate Limits'].map((label) => (
                <div
                  key={label}
                  className="h-9 rounded-lg bg-zinc-900/60 border border-zinc-800/80"
                  style={{ width: `${label.length * 9 + 28}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-24 space-y-20">
        {/* Quick Start section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-6 rounded bg-zinc-800/60" />
            <div className="h-8 w-36 bg-zinc-800 rounded" />
          </div>
          <div className="h-4 w-80 bg-zinc-800/50 rounded mb-8" />

          {/* Code blocks */}
          <div className="grid gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-800/80 bg-zinc-950 overflow-hidden"
              >
                {/* Code block header */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/50">
                  <div className="h-3 w-12 bg-emerald-500/20 rounded" />
                  <div className="h-3 w-40 bg-zinc-800/40 rounded" />
                </div>
                {/* Code lines */}
                <div className="p-4 space-y-2">
                  <div className="h-4 w-full bg-zinc-800/30 rounded" />
                  <div className="h-4 w-5/6 bg-zinc-800/25 rounded" />
                  <div className="h-4 w-3/4 bg-zinc-800/20 rounded" />
                  {i > 0 && (
                    <>
                      <div className="h-4 w-0 rounded" />
                      <div className="h-4 w-4/5 bg-zinc-800/25 rounded" />
                      <div className="h-4 w-2/3 bg-zinc-800/20 rounded" />
                      <div className="h-4 w-full bg-zinc-800/25 rounded" />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MCP Integration section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-6 rounded bg-zinc-800/60" />
            <div className="h-8 w-44 bg-zinc-800 rounded" />
          </div>
          <div className="h-4 w-96 bg-zinc-800/50 rounded mb-8" />

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/50">
              <div className="h-3 w-10 bg-emerald-500/20 rounded" />
              <div className="h-3 w-32 bg-zinc-800/40 rounded" />
            </div>
            <div className="p-4 space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-zinc-800/25 rounded"
                  style={{ width: `${60 + Math.sin(i) * 20}%` }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* API Reference section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-6 rounded bg-zinc-800/60" />
            <div className="h-8 w-40 bg-zinc-800 rounded" />
          </div>
          <div className="h-4 w-72 bg-zinc-800/50 rounded mb-8" />

          {/* API category cards */}
          <div className="grid gap-5">
            {Array.from({ length: 3 }).map((_, ci) => (
              <div
                key={ci}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 overflow-hidden"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800/80 bg-zinc-900/50">
                  <div className="h-8 w-8 rounded-lg bg-zinc-800/80" />
                  <div className="h-4 w-32 bg-zinc-800 rounded" />
                </div>
                {/* Endpoint rows */}
                <div className="px-5 py-2">
                  {Array.from({ length: 3 }).map((_, ri) => (
                    <div
                      key={ri}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 border-b border-zinc-800/40 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-10 rounded bg-emerald-500/10" />
                        <div className="h-4 w-48 bg-zinc-800/40 rounded" />
                      </div>
                      <div className="h-3 w-36 bg-zinc-800/30 rounded sm:ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Authentication section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-6 rounded bg-zinc-800/60" />
            <div className="h-8 w-44 bg-zinc-800 rounded" />
          </div>
          <div className="h-4 w-64 bg-zinc-800/50 rounded mb-4" />
          <div className="h-4 w-80 bg-zinc-800/40 rounded mb-8" />

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/50">
              <div className="h-3 w-10 bg-emerald-500/20 rounded" />
              <div className="h-3 w-24 bg-zinc-800/40 rounded" />
            </div>
            <div className="p-4 space-y-2">
              <div className="h-4 w-4/5 bg-zinc-800/25 rounded" />
              <div className="h-4 w-3/5 bg-zinc-800/20 rounded" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
