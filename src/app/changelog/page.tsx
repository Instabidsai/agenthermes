import { promises as fs } from 'fs'
import path from 'path'
import {
  GitCommitHorizontal,
  Route,
  ShieldCheck,
  AlertTriangle,
  Bug,
  Sparkles,
  Wrench,
  CheckCircle2,
  Clock,
  ChevronRight,
} from 'lucide-react'

export const revalidate = 3600

/* ---------- types ---------- */

interface ChangeEntry {
  text: string
  severity: 'critical' | 'high' | 'feature' | 'improve' | 'fix' | 'note' | 'verified'
}

interface AuditCycle {
  id: number
  title: string
  date: string
  status?: string
  summary: string[]
  changes: ChangeEntry[]
  buildStatus?: string
}

/* ---------- parser ---------- */

function classifyLine(line: string): ChangeEntry['severity'] {
  const upper = line.toUpperCase()
  if (upper.includes('CRITICAL')) return 'critical'
  if (upper.includes('HIGH')) return 'high'
  if (upper.includes('IMPROVE')) return 'improve'
  if (upper.includes('VERIFIED') || upper.includes('CONVERGED') || upper.includes('CLEAN')) return 'verified'
  if (upper.includes('FIX') || upper.includes('FIXED') || upper.includes('SWITCHED') || upper.includes('ADDED')) return 'fix'
  if (upper.includes('NOTED') || upper.includes('DEFERRED') || upper.includes('MEDIUM') || upper.includes('LOW')) return 'note'
  return 'feature'
}

function parseChangelog(raw: string): AuditCycle[] {
  const cycles: AuditCycle[] = []
  const sections = raw.split(/^## /m).filter(Boolean)

  for (const section of sections) {
    const lines = section.split('\n')
    const headerLine = lines[0]?.trim() || ''

    // Match "Audit Cycle N — DATE"
    const cycleMatch = headerLine.match(/Audit Cycle (\d+)\s*[—-]\s*(.+)/i)
    if (!cycleMatch) continue

    const id = parseInt(cycleMatch[1], 10)
    const date = cycleMatch[2].trim()

    const summary: string[] = []
    const changes: ChangeEntry[] = []
    let status: string | undefined
    let buildStatus: string | undefined
    let inTable = false

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) { inTable = false; continue }

      // Status line
      if (line.startsWith('### Status:')) {
        status = line.replace('### Status:', '').trim()
        continue
      }

      // Build status
      if (line.toLowerCase().includes('build passes') || line.toLowerCase().includes('build status')) {
        buildStatus = line.replace(/^[-*#]+\s*/, '').replace(/\*\*/g, '').trim()
        continue
      }

      // Skip markdown table headers/separators
      if (line.startsWith('|') || line.startsWith('---')) {
        inTable = true
        continue
      }

      // Skip section headers that are just labels
      if (line.startsWith('### ')) {
        const headerText = line.replace(/^###\s*/, '')
        if (!headerText.startsWith('Status') && !headerText.toLowerCase().includes('build')) {
          summary.push(headerText)
        }
        continue
      }

      // Bullet points = changes
      if (line.startsWith('- ') || line.startsWith('* ') || /^\d+\.\s/.test(line)) {
        const text = line
          .replace(/^[-*]\s+/, '')
          .replace(/^\d+\.\s+/, '')
          .replace(/\*\*/g, '')
        changes.push({ text, severity: classifyLine(text) })
      }
    }

    cycles.push({ id, title: `Audit Cycle ${id}`, date, status, summary, changes, buildStatus })
  }

  // Most recent first
  cycles.sort((a, b) => b.id - a.id)
  return cycles
}

/* ---------- badge helpers ---------- */

const severityConfig = {
  critical: {
    label: 'Critical',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    dot: 'bg-red-500',
    icon: Bug,
  },
  high: {
    label: 'High',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    dot: 'bg-orange-500',
    icon: AlertTriangle,
  },
  feature: {
    label: 'Feature',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    dot: 'bg-emerald-500',
    icon: Sparkles,
  },
  improve: {
    label: 'Improvement',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    dot: 'bg-amber-500',
    icon: Wrench,
  },
  fix: {
    label: 'Fix',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    dot: 'bg-blue-500',
    icon: CheckCircle2,
  },
  note: {
    label: 'Note',
    bg: 'bg-zinc-500/10',
    border: 'border-zinc-500/30',
    text: 'text-zinc-400',
    dot: 'bg-zinc-500',
    icon: Clock,
  },
  verified: {
    label: 'Verified',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    dot: 'bg-emerald-500',
    icon: ShieldCheck,
  },
}

function SeverityBadge({ severity }: { severity: ChangeEntry['severity'] }) {
  const config = severityConfig[severity]
  const Icon = config.icon
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${config.bg} ${config.border} ${config.text} border`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}

/* ---------- stats ---------- */

async function getGitCommitCount(): Promise<number> {
  try {
    const { execSync } = await import('child_process')
    const count = execSync('git rev-list --count HEAD', {
      cwd: path.resolve(process.cwd()),
      encoding: 'utf-8',
      timeout: 5000,
    }).trim()
    return parseInt(count, 10) || 0
  } catch {
    return 0
  }
}

async function getRouteCount(): Promise<number> {
  try {
    const appDir = path.join(process.cwd(), 'src', 'app')
    const entries = await fs.readdir(appDir, { withFileTypes: true })
    let count = 0
    for (const entry of entries) {
      if (entry.isDirectory()) count++
    }
    // Add 1 for the root page
    return count + 1
  } catch {
    return 0
  }
}

/* ---------- cycle summary stats ---------- */

function getCycleSeverityCounts(changes: ChangeEntry[]) {
  const counts = { critical: 0, high: 0, fix: 0, improve: 0, feature: 0, note: 0, verified: 0 }
  for (const c of changes) {
    counts[c.severity]++
  }
  return counts
}

/* ---------- component ---------- */

export default async function ChangelogPage() {
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md')
  let raw = ''
  try {
    raw = await fs.readFile(changelogPath, 'utf-8')
  } catch {
    raw = ''
  }

  const cycles = parseChangelog(raw)
  const [commitCount, routeCount] = await Promise.all([getGitCommitCount(), getRouteCount()])

  // Aggregate stats
  const totalCritical = cycles.reduce((s, c) => s + c.changes.filter((ch) => ch.severity === 'critical').length, 0)
  const totalFixes = cycles.reduce((s, c) => s + c.changes.filter((ch) => ch.severity === 'fix').length, 0)
  const totalImprovements = cycles.reduce(
    (s, c) => s + c.changes.filter((ch) => ch.severity === 'improve' || ch.severity === 'feature').length,
    0
  )
  const cleanCycles = cycles.filter(
    (c) => c.changes.filter((ch) => ch.severity === 'critical' || ch.severity === 'high').length === 0
  ).length

  return (
    <div className="relative min-h-screen">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-subtle-pulse" />
            Transparent by default
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Changelog
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Every audit cycle, fix, and improvement documented. No black boxes.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-16">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <GitCommitHorizontal className="h-4 w-4 text-zinc-500 flex-shrink-0" />
            <div>
              <div className="text-xl font-bold font-mono tabular-nums">{commitCount}</div>
              <div className="text-xs text-zinc-500 font-medium">Git Commits</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <Route className="h-4 w-4 text-zinc-500 flex-shrink-0" />
            <div>
              <div className="text-xl font-bold font-mono tabular-nums">{routeCount}</div>
              <div className="text-xs text-zinc-500 font-medium">Routes</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <ShieldCheck className="h-4 w-4 text-emerald-500/60 flex-shrink-0" />
            <div>
              <div className="text-xl font-bold font-mono tabular-nums text-emerald-400">{cleanCycles}/{cycles.length}</div>
              <div className="text-xs text-zinc-500 font-medium">Clean Cycles</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <Bug className="h-4 w-4 text-red-500/60 flex-shrink-0" />
            <div>
              <div className="text-xl font-bold font-mono tabular-nums">
                {totalCritical}<span className="text-zinc-600 text-sm ml-1">crit</span>{' '}
                <span className="text-zinc-700 mx-0.5">/</span>
                {totalFixes}<span className="text-zinc-600 text-sm ml-1">fix</span>{' '}
                <span className="text-zinc-700 mx-0.5">/</span>
                {totalImprovements}<span className="text-zinc-600 text-sm ml-1">imp</span>
              </div>
              <div className="text-xs text-zinc-500 font-medium">Lifetime Changes</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-zinc-700/40 to-transparent" />

          <div className="space-y-8">
            {cycles.map((cycle, index) => {
              const counts = getCycleSeverityCounts(cycle.changes)
              const isClean = counts.critical === 0 && counts.high === 0
              const isConverged = cycle.status?.toLowerCase().includes('converged')

              return (
                <div key={cycle.id} className="relative pl-16">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 top-6 h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      isConverged
                        ? 'bg-emerald-500/20 border-emerald-500'
                        : isClean
                          ? 'bg-emerald-500/10 border-emerald-500/50'
                          : counts.critical > 0
                            ? 'bg-red-500/20 border-red-500'
                            : 'bg-amber-500/20 border-amber-500'
                    }`}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        isConverged
                          ? 'bg-emerald-500'
                          : isClean
                            ? 'bg-emerald-500/60'
                            : counts.critical > 0
                              ? 'bg-red-500'
                              : 'bg-amber-500'
                      }`}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`rounded-xl border p-6 transition-colors ${
                      isConverged
                        ? 'bg-emerald-500/[0.03] border-emerald-500/20 hover:border-emerald-500/30'
                        : 'bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700/80'
                    }`}
                  >
                    {/* Card header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h2 className="text-lg font-bold tracking-tight">{cycle.title}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <time className="text-xs font-mono text-zinc-500">
                            {formatDate(cycle.date)}
                          </time>
                          {cycle.status && (
                            <>
                              <ChevronRight className="h-3 w-3 text-zinc-700" />
                              <span
                                className={`text-xs font-semibold ${
                                  isConverged ? 'text-emerald-400' : 'text-zinc-400'
                                }`}
                              >
                                {cycle.status}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Severity summary pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {counts.critical > 0 && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 border border-red-500/30 text-red-400">
                            {counts.critical} critical
                          </span>
                        )}
                        {counts.high > 0 && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/10 border border-orange-500/30 text-orange-400">
                            {counts.high} high
                          </span>
                        )}
                        {isClean && cycle.changes.length > 0 && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" />
                            clean
                          </span>
                        )}
                        {isClean && cycle.changes.length === 0 && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                            <ShieldCheck className="h-3 w-3" />
                            stable
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Summary lines */}
                    {cycle.summary.length > 0 && (
                      <div className="mb-4">
                        {cycle.summary.map((s, i) => (
                          <p key={i} className="text-sm text-zinc-400 leading-relaxed">
                            {s}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Changes list */}
                    {cycle.changes.length > 0 && (
                      <div className="space-y-2">
                        {cycle.changes.map((change, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-zinc-800/30 transition-colors group"
                          >
                            <div className="mt-0.5 flex-shrink-0">
                              <SeverityBadge severity={change.severity} />
                            </div>
                            <p className="text-sm text-zinc-300 leading-relaxed">
                              {change.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Build status footer */}
                    {cycle.buildStatus && (
                      <div className="mt-4 pt-3 border-t border-zinc-800/60">
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500/60" />
                          {cycle.buildStatus}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-xs text-zinc-600">
            This changelog is auto-generated from{' '}
            <code className="px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 font-mono text-[11px]">
              CHANGELOG.md
            </code>{' '}
            at build time.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------- date formatter ---------- */

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    })
  } catch {
    return dateStr
  }
}
