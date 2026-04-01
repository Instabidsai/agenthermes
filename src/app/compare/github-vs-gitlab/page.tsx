import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Scale,
  ArrowRight,
  Trophy,
  Search,
  BookOpen,
  UserPlus,
  Plug,
  Activity,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Shield,
  Globe,
  Code2,
  Lock,
  Server,
  Bot,
  GitBranch,
  Terminal,
  Workflow,
  Cpu,
  Layers,
  Wrench,
} from 'lucide-react'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'

// ---------------------------------------------------------------------------
// Metadata + OG
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'GitHub vs GitLab: Agent Readiness Comparison | AgentHermes',
  description:
    'Head-to-head comparison of GitHub and GitLab on AI agent readiness. See which developer platform is more ready for agent-operated development across 9 dimensions, 6-step agent journey, and ARL levels.',
  openGraph: {
    title: 'GitHub vs GitLab: Agent Readiness Comparison',
    description:
      'Which developer platform is more agent-ready? Compare GitHub and GitLab across 9 dimensions of agent readiness — from discoverability to CI/CD to MCP support.',
    url: 'https://agenthermes.ai/compare/github-vs-gitlab',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GitHub vs GitLab Agent Readiness Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub vs GitLab: Agent Readiness Comparison',
    description:
      'Which developer platform is more agent-ready? Compare GitHub and GitLab across 9 dimensions.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://agenthermes.ai/compare/github-vs-gitlab',
  },
}

// ---------------------------------------------------------------------------
// Score Data
// ---------------------------------------------------------------------------

const GITHUB = {
  name: 'GitHub',
  domain: 'github.com',
  score: 62,
  tier: 'silver' as const,
  arl: 2,
  arlName: 'Connectable',
  dimensions: [
    { key: 'D1', label: 'Discoverability', score: 58, max: 100 },
    { key: 'D2', label: 'API Quality', score: 72, max: 100 },
    { key: 'D3', label: 'Onboarding', score: 65, max: 100 },
    { key: 'D4', label: 'Pricing Transparency', score: 40, max: 100 },
    { key: 'D5', label: 'Payment', score: 45, max: 100 },
    { key: 'D6', label: 'Data Quality', score: 55, max: 100 },
    { key: 'D7', label: 'Security', score: 82, max: 100 },
    { key: 'D8', label: 'Reliability', score: 78, max: 100 },
    { key: 'D9', label: 'Agent Experience', score: 70, max: 100 },
  ],
  journey: [
    { step: 'FIND', score: 58, status: 'partial' as const },
    { step: 'UNDERSTAND', score: 72, status: 'ready' as const },
    { step: 'SIGN UP', score: 65, status: 'partial' as const },
    { step: 'CONNECT', score: 78, status: 'ready' as const },
    { step: 'USE', score: 82, status: 'ready' as const },
    { step: 'PAY', score: 40, status: 'not-ready' as const },
  ],
}

const GITLAB = {
  name: 'GitLab',
  domain: 'gitlab.com',
  score: 54,
  tier: 'bronze' as const,
  arl: 1,
  arlName: 'Discoverable',
  dimensions: [
    { key: 'D1', label: 'Discoverability', score: 42, max: 100 },
    { key: 'D2', label: 'API Quality', score: 68, max: 100 },
    { key: 'D3', label: 'Onboarding', score: 55, max: 100 },
    { key: 'D4', label: 'Pricing Transparency', score: 52, max: 100 },
    { key: 'D5', label: 'Payment', score: 35, max: 100 },
    { key: 'D6', label: 'Data Quality', score: 48, max: 100 },
    { key: 'D7', label: 'Security', score: 75, max: 100 },
    { key: 'D8', label: 'Reliability', score: 72, max: 100 },
    { key: 'D9', label: 'Agent Experience', score: 38, max: 100 },
  ],
  journey: [
    { step: 'FIND', score: 42, status: 'partial' as const },
    { step: 'UNDERSTAND', score: 48, status: 'partial' as const },
    { step: 'SIGN UP', score: 55, status: 'partial' as const },
    { step: 'CONNECT', score: 68, status: 'partial' as const },
    { step: 'USE', score: 72, status: 'ready' as const },
    { step: 'PAY', score: 35, status: 'not-ready' as const },
  ],
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function barColor(score: number): string {
  if (score >= 75) return 'bg-emerald-500'
  if (score >= 50) return 'bg-yellow-500'
  if (score >= 25) return 'bg-amber-500'
  return 'bg-red-500'
}

function statusIcon(status: 'ready' | 'partial' | 'not-ready') {
  if (status === 'ready') return <CheckCircle2 className="h-4 w-4 text-emerald-400" />
  if (status === 'partial') return <AlertCircle className="h-4 w-4 text-amber-400" />
  return <XCircle className="h-4 w-4 text-red-400" />
}

function statusColor(status: 'ready' | 'partial' | 'not-ready') {
  if (status === 'ready') return 'text-emerald-400'
  if (status === 'partial') return 'text-amber-400'
  return 'text-red-400'
}

// ---------------------------------------------------------------------------
// Structured Data
// ---------------------------------------------------------------------------

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'GitHub vs GitLab: Agent Readiness Comparison for Developer Platforms',
  description:
    'A detailed comparison of GitHub and GitLab on AI agent readiness across 9 dimensions, 6-step agent journey, and Agent Readiness Levels. Which developer platform is better for agent-operated development?',
  url: 'https://agenthermes.ai/compare/github-vs-gitlab',
  datePublished: '2026-03-30',
  dateModified: '2026-03-30',
  author: {
    '@type': 'Organization',
    name: 'AgentHermes',
    url: 'https://agenthermes.ai',
  },
  publisher: {
    '@type': 'Organization',
    name: 'AgentHermes',
    url: 'https://agenthermes.ai',
  },
  about: [
    {
      '@type': 'SoftwareApplication',
      name: 'GitHub',
      url: 'https://github.com',
      applicationCategory: 'DeveloperApplication',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'GitLab',
      url: 'https://gitlab.com',
      applicationCategory: 'DeveloperApplication',
    },
  ],
  mainEntity: {
    '@type': 'Table',
    about: 'Agent Readiness Score Comparison: GitHub vs GitLab',
  },
}

// ---------------------------------------------------------------------------
// Feature Comparison Data
// ---------------------------------------------------------------------------

const featureComparison = [
  {
    feature: 'Official MCP Server',
    github: true,
    gitlab: false,
    note: 'GitHub has an official MCP server for Copilot integration',
  },
  {
    feature: 'AI Code Assistant',
    github: true,
    gitlab: true,
    note: 'GitHub Copilot vs GitLab Duo',
  },
  {
    feature: 'Built-in CI/CD',
    github: true,
    gitlab: true,
    note: 'GitHub Actions vs GitLab CI/CD (GitLab had it first)',
  },
  {
    feature: 'REST API',
    github: true,
    gitlab: true,
    note: 'Both have comprehensive REST APIs',
  },
  {
    feature: 'GraphQL API',
    github: true,
    gitlab: true,
    note: 'GitHub GraphQL is more mature',
  },
  {
    feature: 'Agent-Triggered Workflows',
    github: true,
    gitlab: false,
    note: 'GitHub Actions can be triggered via API by agents',
  },
  {
    feature: 'Built-in Container Registry',
    github: true,
    gitlab: true,
    note: 'Both offer container registries',
  },
  {
    feature: 'Built-in Security Scanning',
    github: true,
    gitlab: true,
    note: 'GitLab SAST/DAST is more comprehensive out of the box',
  },
  {
    feature: 'Built-in Package Registry',
    github: true,
    gitlab: true,
    note: 'Both support npm, Maven, NuGet, etc.',
  },
  {
    feature: 'llms.txt Published',
    github: false,
    gitlab: false,
    note: 'Neither publishes llms.txt for agent discovery',
  },
  {
    feature: 'Agent Card (A2A)',
    github: false,
    gitlab: false,
    note: 'Neither publishes an A2A agent card',
  },
  {
    feature: 'Self-Hosted Option',
    github: true,
    gitlab: true,
    note: 'GitHub Enterprise Server vs GitLab self-managed',
  },
]

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function GitHubVsGitLabPage() {
  const githubWins = GITHUB.dimensions.filter(
    (d, i) => d.score > GITLAB.dimensions[i].score
  ).length
  const gitlabWins = GITHUB.dimensions.filter(
    (d, i) => d.score < GITLAB.dimensions[i].score
  ).length
  const ties = 9 - githubWins - gitlabWins

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* ----------------------------------------------------------------- */}
        {/* Breadcrumb                                                       */}
        {/* ----------------------------------------------------------------- */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-zinc-300 transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-zinc-400">GitHub vs GitLab</span>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Hero Section                                                      */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <Scale className="h-3.5 w-3.5" />
            Agent Readiness Comparison
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="text-blue-400">GitHub</span>
            <span className="text-zinc-500 mx-3">vs</span>
            <span className="text-orange-400">GitLab</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-2">
            Developer Platform Agent Readiness Comparison
          </p>
          <p className="text-sm text-zinc-500 max-w-3xl mx-auto">
            Both GitHub and GitLab host code, run CI/CD, and power DevOps workflows for millions
            of developers. But as AI agents take over more development tasks — writing code,
            creating pull requests, deploying services — which platform is more ready for
            agent-operated development? We scanned both using our{' '}
            <Link href="/what-is-agent-ready" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">
              9-dimension Agent Readiness framework
            </Link>{' '}
            to find out.
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Overall Winner Banner                                             */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-5 rounded-xl bg-blue-500/5 border border-blue-500/20 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold text-zinc-300">
              Overall Winner:{' '}
              <span className="text-blue-400">GitHub</span>
              {' '}with a score of{' '}
              <span className="text-white font-bold">{GITHUB.score}</span>
              {' '}vs{' '}
              <span className="text-zinc-400">{GITLAB.score}</span>
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            GitHub wins {githubWins} of 9 dimensions, GitLab wins {gitlabWins}, {ties} tied
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Side-by-Side Score Cards                                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* GitHub */}
          <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Developer Platform
              </span>
            </div>
            <p className="text-xl font-bold text-zinc-100">{GITHUB.name}</p>
            <p className="text-xs text-zinc-500">{GITHUB.domain}</p>
            <ScoreGauge score={GITHUB.score} size="lg" />
            <TierBadge tier={GITHUB.tier} size="md" />
            <div className="flex items-center gap-2 mt-1">
              <Shield className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-bold text-blue-400">ARL-{GITHUB.arl}: {GITHUB.arlName}</span>
            </div>
            <Trophy className="h-4 w-4 text-emerald-400 mt-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Winner
            </span>
          </div>

          {/* GitLab */}
          <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                DevOps Platform
              </span>
            </div>
            <p className="text-xl font-bold text-zinc-100">{GITLAB.name}</p>
            <p className="text-xs text-zinc-500">{GITLAB.domain}</p>
            <ScoreGauge score={GITLAB.score} size="lg" />
            <TierBadge tier={GITLAB.tier} size="md" />
            <div className="flex items-center gap-2 mt-1">
              <Shield className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-xs font-bold text-zinc-400">ARL-{GITLAB.arl}: {GITLAB.arlName}</span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* 6-Step Agent Journey Comparison                                   */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-2">
            6-Step Agent Journey Comparison
          </h2>
          <p className="text-sm text-zinc-500 mb-6">
            Can an AI agent complete the full developer workflow on each platform?
            From discovering the platform to deploying code and paying for usage,
            each step maps to specific dimensions of{' '}
            <Link href="/what-is-agent-ready" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">
              agent readiness
            </Link>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GITHUB.journey.map((step, i) => {
              const gitlabStep = GITLAB.journey[i]
              const icons = [Search, BookOpen, UserPlus, Plug, Activity, CreditCard]
              const Icon = icons[i]
              const githubWinsStep = step.score > gitlabStep.score
              const gitlabWinsStep = gitlabStep.score > step.score

              return (
                <div key={step.step} className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-mono text-zinc-500">STEP {i + 1}</span>
                    <span className="text-sm font-bold text-zinc-200">{step.step}</span>
                  </div>

                  {/* GitHub row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-xs text-zinc-400">GitHub</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusIcon(step.status)}
                      <span className={`text-xs font-semibold ${statusColor(step.status)}`}>
                        {step.score}
                      </span>
                      {githubWinsStep && (
                        <Trophy className="h-3 w-3 text-emerald-400" />
                      )}
                    </div>
                  </div>

                  {/* GitLab row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-xs text-zinc-400">GitLab</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusIcon(gitlabStep.status)}
                      <span className={`text-xs font-semibold ${statusColor(gitlabStep.status)}`}>
                        {gitlabStep.score}
                      </span>
                      {gitlabWinsStep && (
                        <Trophy className="h-3 w-3 text-emerald-400" />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-800/80">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>
                GitHub: {GITHUB.journey.filter(s => s.status === 'ready').length} of 6 ready
              </span>
              <span>
                GitLab: {GITLAB.journey.filter(s => s.status === 'ready').length} of 6 ready
              </span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Dimension-by-Dimension Breakdown                                  */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-6">
            Dimension-by-Dimension Breakdown
          </h2>

          <div className="space-y-5">
            {GITHUB.dimensions.map((dim, i) => {
              const gitlabDim = GITLAB.dimensions[i]
              const githubWinsDim = dim.score > gitlabDim.score
              const gitlabWinsDim = gitlabDim.score > dim.score
              const tied = dim.score === gitlabDim.score

              return (
                <div key={dim.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-medium text-zinc-600">{dim.key}</span>
                      <span className="text-sm font-medium text-zinc-300">{dim.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {githubWinsDim && (
                        <span className="text-[10px] font-bold text-blue-400">GitHub wins</span>
                      )}
                      {gitlabWinsDim && (
                        <span className="text-[10px] font-bold text-orange-400">GitLab wins</span>
                      )}
                      {tied && (
                        <span className="text-[10px] font-bold text-zinc-500">Tie</span>
                      )}
                    </div>
                  </div>

                  {/* GitHub bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                      <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColor(dim.score)}`}
                          style={{ width: `${dim.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-medium text-zinc-400 w-8 text-right tabular-nums">
                        {dim.score}
                      </span>
                    </div>

                    {/* GitLab bar */}
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                      <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColor(gitlabDim.score)}`}
                          style={{ width: `${gitlabDim.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-medium text-zinc-400 w-8 text-right tabular-nums">
                        {gitlabDim.score}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-xs text-zinc-500">github.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span className="text-xs text-zinc-500">gitlab.com</span>
                </div>
              </div>
              <div className="text-xs text-zinc-600">
                {githubWins} GitHub wins &middot; {gitlabWins} GitLab wins &middot; {ties} tied
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Feature Comparison Table                                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-2">
            Agent-Readiness Feature Comparison
          </h2>
          <p className="text-sm text-zinc-500 mb-6">
            Beyond scores, which platform has the specific features that agents need
            to operate autonomously?
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 pr-4 text-zinc-400 font-medium">Feature</th>
                  <th className="text-center py-3 px-4 text-blue-400 font-medium">GitHub</th>
                  <th className="text-center py-3 px-4 text-orange-400 font-medium">GitLab</th>
                  <th className="text-left py-3 pl-4 text-zinc-500 font-medium hidden sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row) => (
                  <tr key={row.feature} className="border-b border-zinc-800/50">
                    <td className="py-3 pr-4 text-zinc-300">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {row.github ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.gitlab ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 pl-4 text-zinc-500 text-xs hidden sm:table-cell">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Analysis: Who's More Agent-Ready and Why                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-6">
            Who&apos;s More Agent-Ready and Why
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* GitHub Analysis */}
            <div className="p-5 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-4">
                <GitBranch className="h-5 w-5 text-blue-400" />
                <h3 className="text-sm font-bold text-blue-400">GitHub&apos;s Strengths</h3>
              </div>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <Bot className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Official MCP server (70/100 Agent Experience).</strong>{' '}
                    GitHub is one of the few platforms with an official Model Context Protocol
                    server. Agents using Copilot or any MCP-compatible client can interact
                    with repos, issues, PRs, and Actions natively. This is a massive lead.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Superior security posture (82/100).</strong>{' '}
                    Fine-grained personal access tokens, GitHub Apps with scoped permissions,
                    Dependabot, code scanning (CodeQL), secret scanning, and branch protection
                    rules. Agents can operate within strict permission boundaries.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Code2 className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Copilot + Actions ecosystem.</strong>{' '}
                    GitHub Copilot provides native AI code generation. GitHub Actions provides
                    event-driven automation that agents can trigger via API. The combination
                    creates a complete agent-operated development loop.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Better discoverability (58 vs 42).</strong>{' '}
                    GitHub&apos;s REST and GraphQL APIs are thoroughly documented, and the
                    platform has become the de facto standard for code hosting, making it
                    the first place agents look for developer infrastructure.
                  </span>
                </li>
              </ul>
            </div>

            {/* GitLab Analysis */}
            <div className="p-5 rounded-lg bg-orange-500/5 border border-orange-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-5 w-5 text-orange-400" />
                <h3 className="text-sm font-bold text-orange-400">GitLab&apos;s Strengths</h3>
              </div>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <Workflow className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">More built-in DevOps features.</strong>{' '}
                    GitLab ships CI/CD, container registry, package registry, SAST, DAST,
                    dependency scanning, license compliance, and infrastructure-as-code all
                    in one platform. Fewer external integrations needed means fewer agent
                    connection points.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Terminal className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Better pricing transparency (52 vs 40).</strong>{' '}
                    GitLab&apos;s tiered pricing (Free, Premium, Ultimate) is more clearly
                    defined with machine-readable feature comparisons. An agent can better
                    determine which plan to recommend or provision.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Server className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Self-hosted with full API.</strong>{' '}
                    GitLab self-managed gives teams complete control. Agents can operate
                    against private instances with custom configurations, which matters for
                    enterprise deployments where data sovereignty is critical.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Cpu className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">GitLab Duo AI integration.</strong>{' '}
                    GitLab&apos;s AI features (code suggestions, vulnerability explanations,
                    merge request summaries) are integrated across the entire DevOps lifecycle,
                    not just in the code editor.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Differences */}
          <div className="p-5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
            <h3 className="text-sm font-bold text-zinc-200 mb-4">Key Differences for Agent-Operated Development</h3>
            <div className="space-y-4 text-sm text-zinc-400">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">The MCP gap is decisive.</strong>{' '}
                  GitHub&apos;s official MCP server means agents can create repos, file issues,
                  open pull requests, trigger workflows, and review code through the{' '}
                  <Link href="/glossary" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">
                    Model Context Protocol
                  </Link>{' '}
                  standard. GitLab has no MCP server. In the agent economy, this
                  is like having a phone number vs not having one -- agents simply cannot
                  reach GitLab through their native communication protocol.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">GitLab is more complete, GitHub is more connectable.</strong>{' '}
                  GitLab&apos;s all-in-one approach means less context-switching for agents --
                  everything from code to deployment is in one API. But GitHub&apos;s ecosystem
                  of Actions, Marketplace, and MCP makes it easier for agents to actually
                  connect and orchestrate complex workflows across tools.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">Agent Experience gap: 70 vs 38.</strong>{' '}
                  This 32-point difference in D9 (Agent Experience) captures the fundamental
                  distinction. GitHub has invested heavily in making its platform natively
                  operable by AI agents -- from Copilot to the MCP server to structured
                  webhook payloads. GitLab has the features but lacks the agent-native
                  interface layer.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">Neither publishes agent discovery files.</strong>{' '}
                  No llms.txt, no A2A agent cards, no agent-card.json. Both platforms
                  remain invisible to standard agent discovery protocols. For platforms
                  that host the very code that builds agents, this is a notable oversight.
                  Read more about this gap in our{' '}
                  <Link href="/blog/mcp-gap" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">
                    MCP Gap analysis
                  </Link>.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">Payment is the shared weak point.</strong>{' '}
                  GitHub scores 45 and GitLab scores 35 on D5 (Payment). Neither offers
                  truly agent-friendly billing APIs where an agent could autonomously
                  upgrade a plan, add seats, or manage payment methods through a structured
                  programmatic interface.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Verdict Section                                                   */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 via-zinc-900/50 to-orange-500/10 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4 text-center">The Verdict</h2>
          <p className="text-sm text-zinc-400 text-center max-w-3xl mx-auto mb-6">
            GitHub wins with a score of {GITHUB.score} vs {GITLAB.score}, reaching Silver tier
            (ARL-2: Connectable) where GitLab remains Bronze (ARL-1: Discoverable). The
            decisive factor is GitHub&apos;s MCP server and Copilot ecosystem, which give it
            the only native agent interface among major developer platforms. GitHub is not
            just a code host -- it is becoming the first platform where agents can autonomously
            write, review, test, and deploy code.
          </p>
          <p className="text-sm text-zinc-400 text-center max-w-3xl mx-auto mb-6">
            GitLab&apos;s strength is its completeness. If an agent can connect to GitLab&apos;s
            API, it has access to the entire DevOps pipeline without needing external
            integrations. But without an MCP server or agent-native discovery layer, GitLab
            requires agents to be pre-programmed with GitLab-specific API knowledge rather
            than discovering capabilities dynamically.
          </p>
          <p className="text-sm text-zinc-500 text-center max-w-3xl mx-auto">
            For agent-operated development in 2026, GitHub is the clear choice. But
            GitLab&apos;s comprehensive platform could leapfrog GitHub if it ships an MCP
            server and agent discovery protocols -- it has more built-in capabilities waiting
            to be exposed. Check the{' '}
            <Link href="/leaderboard" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">
              full leaderboard
            </Link>{' '}
            to see how both compare to other platforms.
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Related Comparisons                                               */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">Related Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/compare/supabase-vs-firebase"
              className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/30 transition-colors"
            >
              <h3 className="text-sm font-bold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors">
                Supabase vs Firebase
              </h3>
              <p className="text-xs text-zinc-500">Which database platform is more agent-operable?</p>
            </Link>
            <Link
              href="/compare/stripe-vs-openai"
              className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/30 transition-colors"
            >
              <h3 className="text-sm font-bold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors">
                Stripe vs OpenAI
              </h3>
              <p className="text-xs text-zinc-500">Payment platform vs AI platform -- who is more agent-ready?</p>
            </Link>
            <Link
              href="/compare/slack-vs-discord"
              className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/30 transition-colors"
            >
              <h3 className="text-sm font-bold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors">
                Slack vs Discord
              </h3>
              <p className="text-xs text-zinc-500">Enterprise vs community bot ecosystem agent readiness.</p>
            </Link>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* CTA                                                               */}
        {/* ----------------------------------------------------------------- */}
        <div className="text-center py-12 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
          <Scale className="h-10 w-10 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-zinc-100 mb-2">
            Check Your Own Agent Readiness Score
          </h2>
          <p className="text-sm text-zinc-500 mb-6 max-w-md mx-auto">
            See how your platform compares to GitHub and GitLab across all 9 dimensions.
            Free scan in 60 seconds.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
            >
              Scan Your Site
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold transition-colors border border-zinc-700"
            >
              Compare Two Businesses
              <Scale className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
