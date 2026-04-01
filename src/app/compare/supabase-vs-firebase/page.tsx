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
  Database,
  Zap,
  Layers,
  Terminal,
  Key,
  Eye,
} from 'lucide-react'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'

// ---------------------------------------------------------------------------
// Metadata + OG
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Supabase vs Firebase: Agent Readiness Comparison | AgentHermes',
  description:
    'Head-to-head comparison of Supabase and Firebase on AI agent readiness. Supabase scores 69 (Silver) — why it leads and what Firebase needs to catch up. 9 dimensions, 6-step agent journey, ARL levels.',
  openGraph: {
    title: 'Supabase vs Firebase: Agent Readiness Comparison',
    description:
      'Supabase scores 69 (Silver) vs Firebase 51 (Bronze). Compare both database platforms across 9 dimensions of agent readiness — from API quality to agent experience.',
    url: 'https://agenthermes.ai/compare/supabase-vs-firebase',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Supabase vs Firebase Agent Readiness Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Supabase vs Firebase: Agent Readiness Comparison',
    description:
      'Supabase 69 vs Firebase 51. Which database platform is more agent-operable?',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://agenthermes.ai/compare/supabase-vs-firebase',
  },
}

// ---------------------------------------------------------------------------
// Score Data
// ---------------------------------------------------------------------------

const SUPABASE = {
  name: 'Supabase',
  domain: 'supabase.com',
  score: 69,
  tier: 'silver' as const,
  arl: 3,
  arlName: 'Usable',
  dimensions: [
    { key: 'D1', label: 'Discoverability', score: 65, max: 100 },
    { key: 'D2', label: 'API Quality', score: 82, max: 100 },
    { key: 'D3', label: 'Onboarding', score: 78, max: 100 },
    { key: 'D4', label: 'Pricing Transparency', score: 55, max: 100 },
    { key: 'D5', label: 'Payment', score: 48, max: 100 },
    { key: 'D6', label: 'Data Quality', score: 60, max: 100 },
    { key: 'D7', label: 'Security', score: 85, max: 100 },
    { key: 'D8', label: 'Reliability', score: 80, max: 100 },
    { key: 'D9', label: 'Agent Experience', score: 72, max: 100 },
  ],
  journey: [
    { step: 'FIND', score: 65, status: 'partial' as const },
    { step: 'UNDERSTAND', score: 82, status: 'ready' as const },
    { step: 'SIGN UP', score: 78, status: 'ready' as const },
    { step: 'CONNECT', score: 85, status: 'ready' as const },
    { step: 'USE', score: 80, status: 'ready' as const },
    { step: 'PAY', score: 48, status: 'partial' as const },
  ],
}

const FIREBASE = {
  name: 'Firebase',
  domain: 'firebase.google.com',
  score: 51,
  tier: 'bronze' as const,
  arl: 1,
  arlName: 'Discoverable',
  dimensions: [
    { key: 'D1', label: 'Discoverability', score: 48, max: 100 },
    { key: 'D2', label: 'API Quality', score: 58, max: 100 },
    { key: 'D3', label: 'Onboarding', score: 52, max: 100 },
    { key: 'D4', label: 'Pricing Transparency', score: 45, max: 100 },
    { key: 'D5', label: 'Payment', score: 40, max: 100 },
    { key: 'D6', label: 'Data Quality', score: 42, max: 100 },
    { key: 'D7', label: 'Security', score: 72, max: 100 },
    { key: 'D8', label: 'Reliability', score: 68, max: 100 },
    { key: 'D9', label: 'Agent Experience', score: 35, max: 100 },
  ],
  journey: [
    { step: 'FIND', score: 48, status: 'partial' as const },
    { step: 'UNDERSTAND', score: 42, status: 'partial' as const },
    { step: 'SIGN UP', score: 52, status: 'partial' as const },
    { step: 'CONNECT', score: 58, status: 'partial' as const },
    { step: 'USE', score: 68, status: 'ready' as const },
    { step: 'PAY', score: 40, status: 'not-ready' as const },
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
  headline: 'Supabase vs Firebase: Agent Readiness Comparison for Database Platforms',
  description:
    'A detailed comparison of Supabase and Firebase on AI agent readiness. Supabase scores 69 (Silver tier) vs Firebase 51 (Bronze). Analysis across 9 dimensions, 6-step agent journey, and Agent Readiness Levels.',
  url: 'https://agenthermes.ai/compare/supabase-vs-firebase',
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
      name: 'Supabase',
      url: 'https://supabase.com',
      applicationCategory: 'DeveloperApplication',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Firebase',
      url: 'https://firebase.google.com',
      applicationCategory: 'DeveloperApplication',
    },
  ],
  mainEntity: {
    '@type': 'Table',
    about: 'Agent Readiness Score Comparison: Supabase vs Firebase',
  },
}

// ---------------------------------------------------------------------------
// Why Supabase Leads Data
// ---------------------------------------------------------------------------

const supabaseReasons = [
  {
    title: 'SQL-first is agent-first',
    description:
      'Supabase exposes PostgreSQL directly via PostgREST, meaning agents can construct SQL queries, create tables, define RLS policies, and manage data through a universal language every LLM already understands. Firebase uses proprietary NoSQL query syntax that agents must be specially trained on.',
    icon: Database,
  },
  {
    title: 'MCP integration exists',
    description:
      'Supabase has community-built MCP servers that let agents create projects, run queries, manage auth, and deploy edge functions through the Model Context Protocol. Firebase has no MCP server ecosystem. Agents can talk to Supabase natively.',
    icon: Bot,
  },
  {
    title: 'Comprehensive Management API',
    description:
      'The Supabase Management API lets agents programmatically create projects, manage database schemas, configure auth providers, deploy edge functions, and monitor usage. Firebase admin SDK requires Google Cloud IAM complexity that adds friction for autonomous agents.',
    icon: Terminal,
  },
  {
    title: 'Row Level Security is agent-compatible',
    description:
      'RLS policies are SQL — agents can read, write, and reason about security policies using the same language they use for queries. Firebase security rules use a custom DSL that is harder for agents to generate correctly and debug when failures occur.',
    icon: Lock,
  },
  {
    title: 'Open source transparency',
    description:
      'Supabase is fully open source. Agents can inspect the actual server code, understand edge cases, and predict behavior. Firebase is proprietary — agents must rely on documentation alone, which may be incomplete or outdated.',
    icon: Eye,
  },
  {
    title: 'Better developer documentation',
    description:
      'Supabase docs are structured for machine consumption with clear API references, code examples in multiple languages, and a logical hierarchy. This directly drives the D2 (API Quality) score of 82 vs Firebase\'s 58.',
    icon: BookOpen,
  },
]

// ---------------------------------------------------------------------------
// Feature Comparison
// ---------------------------------------------------------------------------

const featureComparison = [
  {
    feature: 'Database Type',
    supabase: 'PostgreSQL (relational)',
    firebase: 'Firestore (NoSQL document)',
  },
  {
    feature: 'Query Language',
    supabase: 'SQL (universal)',
    firebase: 'Proprietary SDK methods',
  },
  {
    feature: 'MCP Server Available',
    supabase: true,
    firebase: false,
  },
  {
    feature: 'REST API (auto-generated)',
    supabase: true,
    firebase: false,
  },
  {
    feature: 'GraphQL Support',
    supabase: true,
    firebase: false,
  },
  {
    feature: 'Management API',
    supabase: true,
    firebase: true,
  },
  {
    feature: 'Auth (built-in)',
    supabase: true,
    firebase: true,
  },
  {
    feature: 'Edge Functions / Cloud Functions',
    supabase: true,
    firebase: true,
  },
  {
    feature: 'Realtime Subscriptions',
    supabase: true,
    firebase: true,
  },
  {
    feature: 'Storage / File Hosting',
    supabase: true,
    firebase: true,
  },
  {
    feature: 'Open Source',
    supabase: true,
    firebase: false,
  },
  {
    feature: 'Self-Hosted Option',
    supabase: true,
    firebase: false,
  },
  {
    feature: 'Vectors / AI Embeddings',
    supabase: true,
    firebase: false,
  },
  {
    feature: 'llms.txt Published',
    supabase: false,
    firebase: false,
  },
  {
    feature: 'Agent Card (A2A)',
    supabase: false,
    firebase: false,
  },
]

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function SupabaseVsFirebasePage() {
  const supabaseWins = SUPABASE.dimensions.filter(
    (d, i) => d.score > FIREBASE.dimensions[i].score
  ).length
  const firebaseWins = SUPABASE.dimensions.filter(
    (d, i) => d.score < FIREBASE.dimensions[i].score
  ).length
  const ties = 9 - supabaseWins - firebaseWins

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
          <span className="text-zinc-400">Supabase vs Firebase</span>
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
            <span className="text-emerald-400">Supabase</span>
            <span className="text-zinc-500 mx-3">vs</span>
            <span className="text-amber-400">Firebase</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-2">
            Database Platform Agent Readiness Comparison
          </p>
          <p className="text-sm text-zinc-500 max-w-3xl mx-auto">
            Supabase is our highest-scoring platform at 69 (Silver tier). Firebase, backed by
            Google Cloud, is the most popular BaaS in the world. Both provide databases,
            authentication, storage, and serverless functions. But when AI agents need to
            autonomously create databases, write queries, manage schemas, and deploy
            backend infrastructure — which platform is more{' '}
            <Link href="/what-is-agent-ready" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">
              agent-ready
            </Link>?
            We scanned both to find out.
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Overall Winner Banner                                             */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold text-zinc-300">
              Overall Winner:{' '}
              <span className="text-emerald-400">Supabase</span>
              {' '}with a score of{' '}
              <span className="text-white font-bold">{SUPABASE.score}</span>
              {' '}vs{' '}
              <span className="text-zinc-400">{FIREBASE.score}</span>
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Supabase wins {supabaseWins} of 9 dimensions, Firebase wins {firebaseWins}, {ties} tied
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Side-by-Side Score Cards                                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Supabase */}
          <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Open Source BaaS
              </span>
            </div>
            <p className="text-xl font-bold text-zinc-100">{SUPABASE.name}</p>
            <p className="text-xs text-zinc-500">{SUPABASE.domain}</p>
            <ScoreGauge score={SUPABASE.score} size="lg" />
            <TierBadge tier={SUPABASE.tier} size="md" />
            <div className="flex items-center gap-2 mt-1">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">ARL-{SUPABASE.arl}: {SUPABASE.arlName}</span>
            </div>
            <Trophy className="h-4 w-4 text-emerald-400 mt-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Winner
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
              #1 Overall Score
            </span>
          </div>

          {/* Firebase */}
          <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Google Cloud BaaS
              </span>
            </div>
            <p className="text-xl font-bold text-zinc-100">{FIREBASE.name}</p>
            <p className="text-xs text-zinc-500">{FIREBASE.domain}</p>
            <ScoreGauge score={FIREBASE.score} size="lg" />
            <TierBadge tier={FIREBASE.tier} size="md" />
            <div className="flex items-center gap-2 mt-1">
              <Shield className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-xs font-bold text-zinc-400">ARL-{FIREBASE.arl}: {FIREBASE.arlName}</span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Why Supabase Is #1                                                */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
          <h2 className="text-lg font-semibold text-zinc-100 mb-2">
            Why Supabase Is Our #1 Scoring Platform
          </h2>
          <p className="text-sm text-zinc-500 mb-6">
            Out of 238+ businesses scanned, Supabase ties for the highest{' '}
            <Link href="/leaderboard" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">
              Agent Readiness Score
            </Link>{' '}
            at 69. Here is why it consistently outperforms every other platform
            we have tested.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {supabaseReasons.map((reason) => (
              <div
                key={reason.title}
                className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-2 mb-3">
                  <reason.icon className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-zinc-200">{reason.title}</h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
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
            Can an AI agent complete the full backend-as-a-service workflow on each platform?
            From discovering the platform to deploying a complete backend and managing billing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUPABASE.journey.map((step, i) => {
              const firebaseStep = FIREBASE.journey[i]
              const icons = [Search, BookOpen, UserPlus, Plug, Activity, CreditCard]
              const Icon = icons[i]
              const supabaseWinsStep = step.score > firebaseStep.score
              const firebaseWinsStep = firebaseStep.score > step.score

              return (
                <div key={step.step} className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-mono text-zinc-500">STEP {i + 1}</span>
                    <span className="text-sm font-bold text-zinc-200">{step.step}</span>
                  </div>

                  {/* Supabase row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs text-zinc-400">Supabase</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusIcon(step.status)}
                      <span className={`text-xs font-semibold ${statusColor(step.status)}`}>
                        {step.score}
                      </span>
                      {supabaseWinsStep && (
                        <Trophy className="h-3 w-3 text-emerald-400" />
                      )}
                    </div>
                  </div>

                  {/* Firebase row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-xs text-zinc-400">Firebase</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusIcon(firebaseStep.status)}
                      <span className={`text-xs font-semibold ${statusColor(firebaseStep.status)}`}>
                        {firebaseStep.score}
                      </span>
                      {firebaseWinsStep && (
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
                Supabase: {SUPABASE.journey.filter(s => s.status === 'ready').length} of 6 ready
              </span>
              <span>
                Firebase: {FIREBASE.journey.filter(s => s.status === 'ready').length} of 6 ready
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
            {SUPABASE.dimensions.map((dim, i) => {
              const firebaseDim = FIREBASE.dimensions[i]
              const supabaseWinsDim = dim.score > firebaseDim.score
              const firebaseWinsDim = firebaseDim.score > dim.score
              const tied = dim.score === firebaseDim.score

              return (
                <div key={dim.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-medium text-zinc-600">{dim.key}</span>
                      <span className="text-sm font-medium text-zinc-300">{dim.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {supabaseWinsDim && (
                        <span className="text-[10px] font-bold text-emerald-400">Supabase wins</span>
                      )}
                      {firebaseWinsDim && (
                        <span className="text-[10px] font-bold text-amber-400">Firebase wins</span>
                      )}
                      {tied && (
                        <span className="text-[10px] font-bold text-zinc-500">Tie</span>
                      )}
                    </div>
                  </div>

                  {/* Supabase bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
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

                    {/* Firebase bar */}
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                      <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColor(firebaseDim.score)}`}
                          style={{ width: `${firebaseDim.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-medium text-zinc-400 w-8 text-right tabular-nums">
                        {firebaseDim.score}
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
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-zinc-500">supabase.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-xs text-zinc-500">firebase.google.com</span>
                </div>
              </div>
              <div className="text-xs text-zinc-600">
                {supabaseWins} Supabase wins &middot; {firebaseWins} Firebase wins &middot; {ties} tied
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Feature Comparison Table                                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-2">
            Platform Feature Comparison
          </h2>
          <p className="text-sm text-zinc-500 mb-6">
            Both are backend-as-a-service platforms, but their architectures have very
            different implications for agent operability.
          </p>

          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 pr-4 text-zinc-400 font-medium whitespace-nowrap">Feature</th>
                  <th className="text-center py-3 px-2 sm:px-4 text-emerald-400 font-medium whitespace-nowrap">Supabase</th>
                  <th className="text-center py-3 px-2 sm:px-4 text-amber-400 font-medium whitespace-nowrap">Firebase</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row) => (
                  <tr key={row.feature} className="border-b border-zinc-800/50">
                    <td className="py-3 pr-4 text-zinc-300">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.supabase === 'boolean' ? (
                        row.supabase ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs text-zinc-300">{row.supabase}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.firebase === 'boolean' ? (
                        row.firebase ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs text-zinc-300">{row.firebase}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Analysis: Agent-Operability Deep Dive                             */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-6">
            Agent-Operability Deep Dive
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Supabase Analysis */}
            <div className="p-5 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Database className="h-5 w-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-emerald-400">Supabase&apos;s Agent Advantages</h3>
              </div>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <Code2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">API Quality dominance (82 vs 58).</strong>{' '}
                    PostgREST auto-generates a REST API from your database schema. Every table
                    instantly becomes a CRUD endpoint with filtering, pagination, and relations.
                    Agents do not need to learn a proprietary SDK -- they make HTTP requests.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Key className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Security leadership (85 vs 72).</strong>{' '}
                    Row Level Security policies in SQL are readable and writable by agents.
                    JWT-based auth with service role keys gives agents clear, auditable
                    access patterns. Supabase&apos;s security model is transparent.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Bot className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Native AI/embeddings support.</strong>{' '}
                    pgvector extension for vector storage and similarity search is built in.
                    Agents building RAG applications or semantic search can use Supabase as
                    both their relational database and vector store -- one platform, one API.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Edge Functions with Deno.</strong>{' '}
                    Serverless functions deployed via CLI or Management API. Agents can write
                    TypeScript functions, deploy them, and invoke them -- all through APIs.
                    The Deno runtime provides built-in TypeScript support and web-standard APIs.
                  </span>
                </li>
              </ul>
            </div>

            {/* Firebase Analysis */}
            <div className="p-5 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Server className="h-5 w-5 text-amber-400" />
                <h3 className="text-sm font-bold text-amber-400">Firebase&apos;s Strengths</h3>
              </div>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <Globe className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Google Cloud backing.</strong>{' '}
                    Firebase is part of the Google Cloud ecosystem. Agents that already
                    operate within Google Cloud (using Vertex AI, BigQuery, or Cloud Run)
                    can access Firebase services through unified IAM and billing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Realtime database (native).</strong>{' '}
                    Firebase Realtime Database was built for synchronization. The WebSocket-based
                    realtime syncing is mature and battle-tested at Google scale, making it
                    reliable for agent applications requiring live data updates.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Layers className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Massive ecosystem and community.</strong>{' '}
                    Firebase has more tutorials, examples, and community resources than Supabase.
                    LLMs have been trained on more Firebase content, which helps agents
                    generate correct Firebase code -- even if the APIs are proprietary.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Firebase App Check.</strong>{' '}
                    Protects backend resources from abuse with attestation-based security.
                    While Supabase relies on RLS, Firebase App Check adds a device-level
                    security layer that is harder to bypass.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Differences */}
          <div className="p-5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
            <h3 className="text-sm font-bold text-zinc-200 mb-4">Fundamental Architecture Differences</h3>
            <div className="space-y-4 text-sm text-zinc-400">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">SQL vs NoSQL is the core divide.</strong>{' '}
                  Supabase uses PostgreSQL -- every LLM can generate SQL. Firebase uses
                  Firestore with proprietary query methods. When an agent needs to create a
                  complex query with joins, aggregations, or subqueries, SQL is universally
                  understood while Firestore requires platform-specific knowledge. This single
                  architectural choice drives most of the scoring difference.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">Open source vs proprietary changes everything for agents.</strong>{' '}
                  Supabase agents can inspect source code to understand edge cases, predict
                  behavior, and debug issues. Firebase agents must rely on documentation,
                  which may not cover every scenario. When an agent encounters an unexpected
                  error, open source lets it understand why.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">Auto-generated REST API is the agent superpower.</strong>{' '}
                  Supabase&apos;s PostgREST layer means any table change instantly creates new
                  API endpoints. An agent that creates a table via SQL immediately has CRUD
                  endpoints available -- zero configuration. Firebase requires explicit
                  security rules and endpoint configuration for each collection.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-violet-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">Neither platform is fully agent-native yet.</strong>{' '}
                  Despite Supabase&apos;s lead, neither platform publishes llms.txt, agent cards,
                  or native{' '}
                  <Link href="/glossary" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">
                    MCP
                  </Link>{' '}
                  servers from their official teams. Supabase has community MCP
                  servers; Firebase has none. Both have room to grow toward Gold (75+) and
                  Platinum (90+) tiers. See the full{' '}
                  <Link href="/report/state-of-readiness" className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30">
                    State of Readiness Report
                  </Link>{' '}
                  for industry-wide trends.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Verdict Section                                                   */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 via-zinc-900/50 to-amber-500/10 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4 text-center">The Verdict</h2>
          <p className="text-sm text-zinc-400 text-center max-w-3xl mx-auto mb-6">
            Supabase wins decisively with {SUPABASE.score} vs {FIREBASE.score}, reaching Silver
            tier (ARL-3: Usable) while Firebase remains Bronze (ARL-1: Discoverable). Supabase
            wins every single dimension. The margin is not close -- 18 points is the largest
            gap of any comparison we have published.
          </p>
          <p className="text-sm text-zinc-400 text-center max-w-3xl mx-auto mb-6">
            The fundamental reason is architectural: SQL + auto-generated REST APIs + open source
            creates a platform that agents can learn, query, and operate through universal
            standards. Firebase&apos;s proprietary SDKs, custom query language, and closed-source
            codebase create friction at every step of the agent journey.
          </p>
          <p className="text-sm text-zinc-500 text-center max-w-3xl mx-auto">
            For agent-operated backend development in 2026, Supabase is the clear choice.
            Firebase remains a strong platform for human developers, especially those
            already in the Google Cloud ecosystem. But in a world where AI agents need
            to autonomously create, manage, and scale backend infrastructure, SQL and
            open standards win.
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Related Comparisons                                               */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">Related Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/compare/github-vs-gitlab"
              className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/30 transition-colors"
            >
              <h3 className="text-sm font-bold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors">
                GitHub vs GitLab
              </h3>
              <p className="text-xs text-zinc-500">Which developer platform is more agent-ready?</p>
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
              href="/compare/shopify-vs-woocommerce"
              className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/30 transition-colors"
            >
              <h3 className="text-sm font-bold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors">
                Shopify vs WooCommerce
              </h3>
              <p className="text-xs text-zinc-500">Hosted vs self-hosted e-commerce agent readiness.</p>
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
            See how your platform compares to Supabase and Firebase across all 9 dimensions.
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
