import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Scale,
  ArrowRight,
  Trophy,
  Minus,
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
  Zap,
  Globe,
  Code2,
  Lock,
  Server,
  Bot,
} from 'lucide-react'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'

// ---------------------------------------------------------------------------
// Metadata + OG
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Stripe vs OpenAI: Agent Readiness Comparison | AgentHermes',
  description:
    'Head-to-head comparison of Stripe and OpenAI on AI agent readiness. See scores across 9 dimensions, 6-step agent journey, ARL levels, and which platform is more ready for the agent economy.',
  openGraph: {
    title: 'Stripe vs OpenAI: Agent Readiness Comparison',
    description:
      'Which platform is more agent-ready? Compare Stripe and OpenAI across 9 dimensions of agent readiness — from discoverability to payment to security.',
    url: 'https://agenthermes.ai/compare/stripe-vs-openai',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stripe vs OpenAI Agent Readiness Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stripe vs OpenAI: Agent Readiness Comparison',
    description:
      'Which platform is more agent-ready? Compare Stripe and OpenAI across 9 dimensions.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://agenthermes.ai/compare/stripe-vs-openai',
  },
}

// ---------------------------------------------------------------------------
// Score Data (from calibrated scans + rescan 2026-03-30)
// ---------------------------------------------------------------------------

const STRIPE = {
  name: 'Stripe',
  domain: 'stripe.com',
  score: 55,
  tier: 'bronze' as const,
  arl: 1,
  arlName: 'Discoverable',
  dimensions: [
    { key: 'D1', label: 'Discoverability', score: 46, max: 100 },
    { key: 'D2', label: 'API Quality', score: 35, max: 100 },
    { key: 'D3', label: 'Onboarding', score: 35, max: 100 },
    { key: 'D4', label: 'Pricing Transparency', score: 15, max: 100 },
    { key: 'D5', label: 'Payment', score: 55, max: 100 },
    { key: 'D6', label: 'Data Quality', score: 0, max: 100 },
    { key: 'D7', label: 'Security', score: 80, max: 100 },
    { key: 'D8', label: 'Reliability', score: 70, max: 100 },
    { key: 'D9', label: 'Agent Experience', score: 45, max: 100 },
  ],
  journey: [
    { step: 'FIND', score: 46, status: 'partial' as const },
    { step: 'UNDERSTAND', score: 23, status: 'not-ready' as const },
    { step: 'SIGN UP', score: 35, status: 'not-ready' as const },
    { step: 'CONNECT', score: 58, status: 'partial' as const },
    { step: 'USE', score: 70, status: 'ready' as const },
    { step: 'PAY', score: 35, status: 'not-ready' as const },
  ],
}

const OPENAI = {
  name: 'OpenAI',
  domain: 'openai.com',
  score: 50,
  tier: 'bronze' as const,
  arl: 0,
  arlName: 'Dark',
  dimensions: [
    { key: 'D1', label: 'Discoverability', score: 10, max: 100 },
    { key: 'D2', label: 'API Quality', score: 43, max: 100 },
    { key: 'D3', label: 'Onboarding', score: 95, max: 100 },
    { key: 'D4', label: 'Pricing Transparency', score: 0, max: 100 },
    { key: 'D5', label: 'Payment', score: 75, max: 100 },
    { key: 'D6', label: 'Data Quality', score: 0, max: 100 },
    { key: 'D7', label: 'Security', score: 65, max: 100 },
    { key: 'D8', label: 'Reliability', score: 75, max: 100 },
    { key: 'D9', label: 'Agent Experience', score: 0, max: 100 },
  ],
  journey: [
    { step: 'FIND', score: 10, status: 'not-ready' as const },
    { step: 'UNDERSTAND', score: 0, status: 'not-ready' as const },
    { step: 'SIGN UP', score: 95, status: 'ready' as const },
    { step: 'CONNECT', score: 54, status: 'partial' as const },
    { step: 'USE', score: 75, status: 'ready' as const },
    { step: 'PAY', score: 38, status: 'not-ready' as const },
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

function statusLabel(status: 'ready' | 'partial' | 'not-ready') {
  if (status === 'ready') return 'Ready'
  if (status === 'partial') return 'Partial'
  return 'Not Ready'
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
  headline: 'Stripe vs OpenAI: Agent Readiness Comparison',
  description:
    'A detailed comparison of Stripe and OpenAI on AI agent readiness across 9 dimensions, 6-step agent journey, and Agent Readiness Levels.',
  url: 'https://agenthermes.ai/compare/stripe-vs-openai',
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
      name: 'Stripe',
      url: 'https://stripe.com',
      applicationCategory: 'FinanceApplication',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'OpenAI',
      url: 'https://openai.com',
      applicationCategory: 'DeveloperApplication',
    },
  ],
  mainEntity: {
    '@type': 'Table',
    about: 'Agent Readiness Score Comparison',
  },
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function StripeVsOpenAIPage() {
  const stripeWins = STRIPE.dimensions.filter(
    (d, i) => d.score > OPENAI.dimensions[i].score
  ).length
  const openaiWins = STRIPE.dimensions.filter(
    (d, i) => d.score < OPENAI.dimensions[i].score
  ).length
  const ties = 9 - stripeWins - openaiWins

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* ----------------------------------------------------------------- */}
        {/* Hero Section                                                      */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <Scale className="h-3.5 w-3.5" />
            Agent Readiness Comparison
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="text-blue-400">Stripe</span>
            <span className="text-zinc-500 mx-3">vs</span>
            <span className="text-violet-400">OpenAI</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-2">
            Agent Readiness Comparison
          </p>
          <p className="text-sm text-zinc-500 max-w-3xl mx-auto">
            Two titans of developer infrastructure. Stripe powers payments for millions of businesses.
            OpenAI powers AI for millions of developers. But which platform is more ready for
            autonomous AI agents to discover, connect to, and transact through? We scanned both
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
              <span className="text-blue-400">Stripe</span>
              {' '}with a score of{' '}
              <span className="text-white font-bold">{STRIPE.score}</span>
              {' '}vs{' '}
              <span className="text-zinc-400">{OPENAI.score}</span>
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Stripe wins {stripeWins} of 9 dimensions, OpenAI wins {openaiWins}, {ties} tied
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Side-by-Side Score Cards                                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Stripe */}
          <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-zinc-900/50 border border-blue-500/20 shadow-lg shadow-blue-500/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Payment Platform
              </span>
            </div>
            <p className="text-xl font-bold text-zinc-100">{STRIPE.name}</p>
            <p className="text-xs text-zinc-500">{STRIPE.domain}</p>
            <ScoreGauge score={STRIPE.score} size="lg" />
            <TierBadge tier={STRIPE.tier} size="md" />
            <div className="flex items-center gap-2 mt-1">
              <Shield className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-bold text-blue-400">ARL-{STRIPE.arl}: {STRIPE.arlName}</span>
            </div>
            <Trophy className="h-4 w-4 text-emerald-400 mt-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              Winner
            </span>
          </div>

          {/* OpenAI */}
          <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-zinc-900/50 border border-violet-500/20 shadow-lg shadow-violet-500/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                AI Platform
              </span>
            </div>
            <p className="text-xl font-bold text-zinc-100">{OPENAI.name}</p>
            <p className="text-xs text-zinc-500">{OPENAI.domain}</p>
            <ScoreGauge score={OPENAI.score} size="lg" />
            <TierBadge tier={OPENAI.tier} size="md" />
            <div className="flex items-center gap-2 mt-1">
              <Shield className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-xs font-bold text-zinc-400">ARL-{OPENAI.arl}: {OPENAI.arlName}</span>
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
            Can an AI agent complete the full customer journey on each platform?
            Each step maps to specific dimensions of agent readiness.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STRIPE.journey.map((step, i) => {
              const openaiStep = OPENAI.journey[i]
              const icons = [Search, BookOpen, UserPlus, Plug, Activity, CreditCard]
              const Icon = icons[i]
              const stripeWinsStep = step.score > openaiStep.score
              const openaiWinsStep = openaiStep.score > step.score

              return (
                <div key={step.step} className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-mono text-zinc-500">STEP {i + 1}</span>
                    <span className="text-sm font-bold text-zinc-200">{step.step}</span>
                  </div>

                  {/* Stripe row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-xs text-zinc-400">Stripe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusIcon(step.status)}
                      <span className={`text-xs font-semibold ${statusColor(step.status)}`}>
                        {step.score}
                      </span>
                      {stripeWinsStep && (
                        <Trophy className="h-3 w-3 text-emerald-400" />
                      )}
                    </div>
                  </div>

                  {/* OpenAI row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-violet-500" />
                      <span className="text-xs text-zinc-400">OpenAI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusIcon(openaiStep.status)}
                      <span className={`text-xs font-semibold ${statusColor(openaiStep.status)}`}>
                        {openaiStep.score}
                      </span>
                      {openaiWinsStep && (
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
                Stripe: {STRIPE.journey.filter(s => s.status === 'ready').length} of 6 ready
              </span>
              <span>
                OpenAI: {OPENAI.journey.filter(s => s.status === 'ready').length} of 6 ready
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
            {STRIPE.dimensions.map((dim, i) => {
              const openaiDim = OPENAI.dimensions[i]
              const stripeWinsDim = dim.score > openaiDim.score
              const openaiWinsDim = openaiDim.score > dim.score
              const tied = dim.score === openaiDim.score

              return (
                <div key={dim.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-medium text-zinc-600">{dim.key}</span>
                      <span className="text-sm font-medium text-zinc-300">{dim.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {stripeWinsDim && (
                        <span className="text-[10px] font-bold text-blue-400">Stripe wins</span>
                      )}
                      {openaiWinsDim && (
                        <span className="text-[10px] font-bold text-violet-400">OpenAI wins</span>
                      )}
                      {tied && (
                        <span className="text-[10px] font-bold text-zinc-500">Tie</span>
                      )}
                    </div>
                  </div>

                  {/* Stripe bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                      <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bar-animate ${barColor(dim.score)}`}
                          style={{ width: `${dim.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-medium text-zinc-400 w-8 text-right tabular-nums">
                        {dim.score}
                      </span>
                      {stripeWinsDim && (
                        <Trophy className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                      )}
                    </div>

                    {/* OpenAI bar */}
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
                      <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bar-animate ${barColor(openaiDim.score)}`}
                          style={{ width: `${openaiDim.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-medium text-zinc-400 w-8 text-right tabular-nums">
                        {openaiDim.score}
                      </span>
                      {openaiWinsDim && (
                        <Trophy className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                      )}
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
                  <span className="text-xs text-zinc-500">stripe.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                  <span className="text-xs text-zinc-500">openai.com</span>
                </div>
              </div>
              <div className="text-xs text-zinc-600">
                {stripeWins} Stripe wins &middot; {openaiWins} OpenAI wins &middot; {ties} tied
              </div>
            </div>
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
            {/* Stripe Analysis */}
            <div className="p-5 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-blue-400" />
                <h3 className="text-sm font-bold text-blue-400">Stripe&apos;s Strengths</h3>
              </div>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <Lock className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Best-in-class security (80/100).</strong>{' '}
                    HSTS headers, proper TLS configuration, API key authentication, and webhook
                    signature verification. Stripe is the security benchmark.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Much better discoverability (46 vs 10).</strong>{' '}
                    Stripe publishes llms.txt, has comprehensive developer documentation,
                    and provides machine-readable API descriptions. Agents can actually find Stripe.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Code2 className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Agent experience edge (45 vs 0).</strong>{' '}
                    SDKs in 7+ languages, structured error responses, request tracing via
                    idempotency keys. OpenAI scores zero on agent experience.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Server className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Reliable infrastructure.</strong>{' '}
                    Published SLA, status page, health endpoints, and 184ms average response
                    times make Stripe dependable for agent workflows.
                  </span>
                </li>
              </ul>
            </div>

            {/* OpenAI Analysis */}
            <div className="p-5 rounded-lg bg-violet-500/5 border border-violet-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="h-5 w-5 text-violet-400" />
                <h3 className="text-sm font-bold text-violet-400">OpenAI&apos;s Strengths</h3>
              </div>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <UserPlus className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Exceptional onboarding (95/100).</strong>{' '}
                    Self-serve API key provisioning, immediate sandbox access, and programmatic
                    account creation. The easiest platform for an agent to start using.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CreditCard className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Strong payment integration (75 vs 55).</strong>{' '}
                    Ironic that the AI company outscores the payment company, but OpenAI has
                    billing endpoints, usage-based billing APIs, and subscription management.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Higher API quality (43 vs 35).</strong>{' '}
                    OpenAI&apos;s API endpoints are well-structured with JSON responses, proper
                    HTTP status codes, and clear endpoint patterns.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Slightly better reliability (75 vs 70).</strong>{' '}
                    Good uptime, consistent response formats, and a status page. However, rate
                    limiting under heavy load remains a concern.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Differences */}
          <div className="p-5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
            <h3 className="text-sm font-bold text-zinc-200 mb-4">Key Differences</h3>
            <div className="space-y-4 text-sm text-zinc-400">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">Different agent-ready requirements.</strong>{' '}
                  Stripe is a payment platform -- agent readiness means agents can initiate charges,
                  manage subscriptions, and handle refunds. OpenAI is an AI platform -- agent readiness
                  means agents can provision API keys, manage model access, and handle billing. They
                  serve fundamentally different roles in the agent economy stack.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">Stripe is harder to probe externally.</strong>{' '}
                  Stripe&apos;s strong authentication means our scanner can&apos;t exercise the actual API,
                  which suppresses D2 (API Quality) and D6 (Data Quality) scores. Stripe likely
                  deserves higher scores on those dimensions -- its 300+ documented API endpoints
                  and comprehensive OpenAPI spec are world-class, but invisible to external scanning.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">OpenAI is invisible to agents despite being an AI company.</strong>{' '}
                  No llms.txt, no agent-card.json, no Schema.org structured data. A D1 score of 10
                  means agents basically cannot find OpenAI through standard discovery protocols.
                  This is a surprising gap for the company building the agents themselves.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-violet-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">Both score zero on Data Quality.</strong>{' '}
                  Neither platform exposes structured product or service data in machine-readable
                  formats that agents can consume without authentication. This is the universal
                  weak spot across the entire tech industry.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                <p>
                  <strong className="text-zinc-200">Neither is truly agent-native.</strong>{' '}
                  Both are Bronze tier. Neither publishes MCP tools, A2A agent cards, or agent
                  commerce protocols. In a world where agents need to autonomously discover,
                  negotiate with, and transact through services, both Stripe and OpenAI have
                  significant work ahead.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Verdict Section                                                   */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 via-zinc-900/50 to-violet-500/10 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4 text-center">The Verdict</h2>
          <p className="text-sm text-zinc-400 text-center max-w-3xl mx-auto mb-6">
            Stripe edges out OpenAI with a score of {STRIPE.score} vs {OPENAI.score}, primarily
            thanks to superior discoverability, security, and agent experience. Stripe publishes
            llms.txt and provides the structured documentation that agents need to understand
            what it offers. However, OpenAI dominates onboarding -- it is by far the easiest
            platform for an agent to create an account and start making API calls.
          </p>
          <p className="text-sm text-zinc-400 text-center max-w-3xl mx-auto mb-6">
            The irony is thick: the payment company (Stripe) loses on payment readiness to the
            AI company (OpenAI). And the AI company that builds the agents cannot be found by
            those very agents. Both are Bronze tier -- solid foundations, but far from the
            autonomous agent interoperability that defines Gold and Platinum.
          </p>
          <p className="text-sm text-zinc-500 text-center max-w-3xl mx-auto">
            In the agent economy, both will be critical infrastructure. Stripe will handle
            agent-to-agent payments. OpenAI will power the agents themselves. The question is
            not which is better, but when both will reach the Gold tier that autonomous agents
            require.
          </p>
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
            See how your platform compares to Stripe and OpenAI across all 9 dimensions.
            Free scan in 60 seconds.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all duration-300 cta-button-glow"
            >
              Scan Your Site
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold transition-all duration-200 border border-zinc-700 shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10"
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
