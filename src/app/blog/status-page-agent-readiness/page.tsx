import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  Activity,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Server,
  Shield,
  Signal,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Your Status Page Is an Agent Readiness Signal: Why status.yoursite.com Adds Points | AgentHermes',
  description:
    'D8 Reliability (0.13 weight) directly rewards status pages. AgentHermes checks /status, status.domain.com, /health, incident history, and SLA documentation. Here is why agents check your status before delegating work.',
  keywords: [
    'status page agent readiness signal',
    'status page AI agents',
    'health endpoint agent readiness',
    'D8 reliability score',
    'agent readiness status page',
    'SLA documentation agents',
    'uptime monitoring agents',
    'API status endpoint',
    'status page setup guide',
  ],
  openGraph: {
    title: 'Your Status Page Is an Agent Readiness Signal: Why status.yoursite.com Adds Points',
    description:
      'D8 Reliability (0.13) rewards status pages. Agents check if you are operational before delegating work. No status page = no confidence. Takes 15 minutes to add.',
    url: 'https://agenthermes.ai/blog/status-page-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Your Status Page Is an Agent Readiness Signal: Why status.yoursite.com Adds Points',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Status Page Is an Agent Readiness Signal',
    description:
      'D8 Reliability (13% of score) rewards status pages. Agents check your status before delegating work. 15-minute setup, 13% impact.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/status-page-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const statusChecks = [
  {
    signal: '/health endpoint',
    description: 'A JSON endpoint returning 200 when operational and 503 when degraded. The simplest machine-readable status check. Agents call this before every delegation.',
    weight: 'High',
    example: 'GET /health → { "status": "ok", "uptime": "99.98%", "latency_ms": 42 }',
    color: 'emerald',
    icon: Activity,
  },
  {
    signal: 'status.domain.com',
    description: 'A dedicated status page (Statuspage, Instatus, Betterstack, or self-hosted) showing component-level health, incident history, and scheduled maintenance.',
    weight: 'High',
    example: 'status.stripe.com shows API, Dashboard, and Webhook health independently.',
    color: 'blue',
    icon: Globe,
  },
  {
    signal: '/status page',
    description: 'An alternative to the subdomain approach. A /status path on the main domain serving the same information. AgentHermes checks both locations.',
    weight: 'Medium',
    example: 'yoursite.com/status → component statuses, recent incidents, uptime percentage.',
    color: 'blue',
    icon: Signal,
  },
  {
    signal: 'Incident history',
    description: 'Past incidents with timestamps, root cause, impact, and resolution time. Agents use historical reliability data to assess risk before delegating critical tasks.',
    weight: 'Medium',
    example: 'Last 90 days: 2 incidents, avg resolution 14 minutes, 99.97% uptime.',
    color: 'purple',
    icon: Timer,
  },
  {
    signal: 'SLA documentation',
    description: 'Published Service Level Agreement with uptime guarantees, response time commitments, and compensation terms. The contractual layer that agents use for critical delegations.',
    weight: 'Low',
    example: '99.99% uptime SLA, <200ms p95 response time, credits for breaches.',
    color: 'purple',
    icon: FileText,
  },
]

const tierApproach = [
  {
    tier: 'Tier 1: /health (Machine-Readable)',
    time: '15 minutes',
    description: 'A single JSON endpoint that returns 200/503 with basic metrics. This is what agents actually call before delegating. It is the minimum viable status signal.',
    code: '{ "status": "ok", "version": "2.1.0", "uptime": "99.98%", "checks": { "database": "ok", "cache": "ok", "queue": "ok" } }',
    impact: 'Adds 3-5 points to D8. Moves businesses from "unknown reliability" to "programmatically verifiable."',
    color: 'emerald',
  },
  {
    tier: 'Tier 2: Status Page (Human + Machine)',
    time: '30 minutes',
    description: 'A dedicated page showing component-level health, incident history, and scheduled maintenance. Use Statuspage, Instatus, Betterstack, or a simple static page.',
    code: 'Components: API (Operational), Dashboard (Operational), Webhooks (Degraded). Incidents: 2 in last 90 days.',
    impact: 'Adds 5-8 points to D8. Provides the context agents need for risk assessment: not just "up now" but "how reliable historically."',
    color: 'blue',
  },
  {
    tier: 'Tier 3: SLA Doc (Contractual)',
    time: '1-2 hours',
    description: 'Published SLA with uptime guarantees, response time commitments, support tiers, and compensation policy. This is the trust layer for critical agent delegations.',
    code: 'Uptime: 99.99%. Response: <200ms p95. Support: 15min response (critical). Credits: 10x for breach.',
    impact: 'Adds 2-3 points to D8. Unlocks trust for high-value delegations where agents need contractual guarantees.',
    color: 'purple',
  },
]

const topScorers = [
  { name: 'Statuspage (Atlassian)', score: 70, status: '/health + status.statuspage.io + SLA', tier: 'Silver' },
  { name: 'Vercel', score: 70, status: '/health + status.vercel.com + SLA', tier: 'Silver' },
  { name: 'Supabase', score: 69, status: '/health + status.supabase.com + SLA', tier: 'Silver' },
  { name: 'Stripe', score: 68, status: '/health + status.stripe.com + SLA', tier: 'Silver' },
  { name: 'GitHub', score: 67, status: '/health + githubstatus.com + SLA', tier: 'Silver' },
  { name: 'Resend', score: 75, status: '/health + status.resend.com + SLA', tier: 'Gold' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How much does a status page actually impact my score?',
    answer:
      'D8 Reliability carries a 0.13 weight — the second-highest dimension after D2 API Quality (0.15). A complete status page setup (/health endpoint + status page + SLA) can add 8-13 points to D8. Since D8 is 13% of the total score, that translates to roughly 1-2 points on your overall Agent Readiness Score. It sounds small, but in a scoring system where the difference between Bronze and Silver is 20 points, every dimension matters.',
  },
  {
    question: 'Do I need a paid status page service?',
    answer:
      'No. A /health endpoint is free — it is a single JSON route in your application. A basic status page can be a static HTML page you update manually or a free-tier service like Instatus or Betterstack. The paid services (Statuspage by Atlassian, Betterstack Pro) add automated monitoring, subscriber notifications, and incident management workflows. Agents only need the machine-readable data, which the free tier provides.',
  },
  {
    question: 'What should my /health endpoint return?',
    answer:
      'At minimum: HTTP 200 with a JSON body containing a status field ("ok" or "degraded"). Better: include component checks (database, cache, queue, external dependencies), uptime percentage, current version, and response latency. Best: add a machine-readable schema (JSON Schema or OpenAPI response definition) so agents can programmatically parse every field. Return 503 when any critical component is down.',
  },
  {
    question: 'Why do agents care about status pages?',
    answer:
      'Agents delegate work to APIs. Before delegating a critical task (processing a payment, booking an appointment, sending a notification), a well-designed agent checks if the service is operational. A /health endpoint answers that question in milliseconds. Without one, the agent either skips the reliability check (risky) or tries a test request and interprets the result (slow and fragile). Status pages are the difference between a confident delegation and a guess.',
  },
]

function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function StatusPageAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Your Status Page Is an Agent Readiness Signal: Why status.yoursite.com Adds Points',
    description:
      'D8 Reliability (0.13 weight) directly rewards status pages. AgentHermes checks /health, status.domain.com, incident history, and SLA docs. A 15-minute setup that impacts 13% of your score.',
    datePublished: '2026-04-15',
    dateModified: '2026-04-15',
    author: {
      '@type': 'Organization',
      name: 'AgentHermes Research',
      url: 'https://agenthermes.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    mainEntityOfPage: 'https://agenthermes.ai/blog/status-page-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'status page, agent readiness, health endpoint, D8 reliability, uptime, SLA, AI agents',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Status Page Agent Readiness',
          item: 'https://agenthermes.ai/blog/status-page-agent-readiness',
        },
      ],
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <BlogArticleWrapper
      title="Your Status Page Is an Agent Readiness Signal: Why status.yoursite.com Adds Points"
      shareUrl="https://agenthermes.ai/blog/status-page-agent-readiness"
      currentHref="/blog/status-page-agent-readiness"
    >
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400">Status Pages</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Signal className="h-3.5 w-3.5" />
              Dimensions Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              D8 Reliability (0.13)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Your Status Page Is an{' '}
            <span className="text-emerald-400">Agent Readiness Signal</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Before an AI agent delegates work to your API, it asks one question:{' '}
            <strong className="text-zinc-100">are you up?</strong> D8 Reliability carries a 0.13
            weight — the second-highest dimension in the Agent Readiness Score. A /health endpoint
            takes 15 minutes to add and impacts 13% of your score.
          </p>

          {/* Author byline */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
            <div className="author-avatar">AH</div>
            <div>
              <div className="text-sm font-semibold text-zinc-200">AgentHermes Research</div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  April 15, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  12 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY AGENTS CHECK STATUS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-500" />
            Why Agents Check Your Status Before Delegating Work
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When a human user asks an AI agent to &ldquo;process this payment through Stripe&rdquo; or
              &ldquo;send this email via Resend,&rdquo; the agent has a choice. It can blindly call the API
              and hope it works. Or it can check the service&apos;s status first, confirm it is operational,
              and proceed with confidence.
            </p>
            <p>
              Well-designed agents always check. The cost of checking is one HTTP request — typically
              under 50ms. The cost of <em>not</em> checking is a failed delegation that the agent has to
              debug, retry, or escalate to the user. A /health endpoint that returns{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">200 OK</code>{' '}
              is the green light. A{' '}
              <code className="text-red-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">503 Service Unavailable</code>{' '}
              tells the agent to try another service or wait. No endpoint at all means the agent is
              flying blind.
            </p>
            <p>
              This is exactly what D8 Reliability measures. Not just whether your service is up right now,
              but whether you <strong className="text-zinc-100">communicate your operational status</strong> in
              a way that agents can consume programmatically. The distinction matters: a service with 99.99%
              uptime but no status page scores lower on D8 than a service with 99.9% uptime and a
              comprehensive status infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '0.13', label: 'D8 weight (2nd highest)', icon: BarChart3 },
              { value: '15m', label: 'To add /health', icon: Timer },
              { value: '6/6', label: 'Silver scorers have it', icon: CheckCircle2 },
              { value: '<50ms', label: 'Status check latency', icon: Zap },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT WE CHECK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            What AgentHermes Checks for D8 Reliability
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The D8 Reliability dimension scans for five signals, from the most machine-readable
            (a /health endpoint) to the most human-readable (SLA documentation). Each adds points.
          </p>

          <div className="space-y-4 mb-8">
            {statusChecks.map((check) => {
              const colors = getColorClasses(check.color)
              return (
                <div
                  key={check.signal}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <check.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{check.signal}</h3>
                      <span className={`text-xs font-medium ${colors.text}`}>Weight: {check.weight}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{check.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{check.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THREE-TIER APPROACH ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-500" />
            The Three-Tier Approach: From 15 Minutes to Full SLA
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            You do not need to implement everything at once. Each tier builds on the previous one
            and adds incremental score value.
          </p>

          <div className="space-y-4 mb-8">
            {tierApproach.map((tier) => {
              const colors = getColorClasses(tier.color)
              return (
                <div
                  key={tier.tier}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-zinc-100">{tier.tier}</h3>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium`}>
                      {tier.time}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{tier.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 mb-3">
                    <p className="text-xs font-mono text-zinc-500 leading-relaxed">{tier.code}</p>
                  </div>
                  <p className="text-xs text-zinc-500">
                    <span className={`${colors.text} font-medium`}>Score impact:</span>{' '}
                    {tier.impact}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Start with Tier 1.</strong> A single /health endpoint
              returning JSON takes 15 minutes. It is a route in your web framework that checks your
              database connection, returns 200 if healthy and 503 if not. That alone moves you from
              &ldquo;unknown reliability&rdquo; to &ldquo;programmatically verifiable&rdquo; — and adds 3-5
              points to D8.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHO DOES IT RIGHT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Who Does It Right: Every Silver Scorer Has a Status Page
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              This is not a coincidence. Every business that scores Silver (60+) on the Agent Readiness
              Score has all three tiers: a /health endpoint, a public status page, and published SLA
              documentation. It is table stakes for the top tier.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Company</div>
              <div>Score</div>
              <div>Tier</div>
              <div>Status Infrastructure</div>
            </div>
            {topScorers.map((row, i) => (
              <div
                key={row.name}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.name}</div>
                <div className="text-emerald-400">{row.score}</div>
                <div className="text-zinc-400">{row.tier}</div>
                <div className="text-zinc-500 text-xs">{row.status}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern is universal. Resend (75 Gold), Vercel (70 Silver), Supabase (69 Silver),
              Stripe (68 Silver), and GitHub (67 Silver) all have{' '}
              <strong className="text-zinc-100">all three tiers</strong>. They all have a /health endpoint
              that returns JSON, a dedicated status subdomain with component-level monitoring, and a
              published SLA. The businesses that score below 40 almost never have any of the three.
            </p>
            <p>
              This creates a clear roadmap. If you want to enter Silver territory, you need status
              infrastructure. It is not the only requirement — D2 API Quality matters more — but without
              D8 Reliability, you are leaving 13% of the possible score on the table.
            </p>
          </div>
        </div>
      </section>

      {/* ===== IMPLEMENTATION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            Implementation: Add a /health Endpoint in 15 Minutes
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Here is the minimum viable /health endpoint for common frameworks.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                title: 'Response format',
                detail: 'Return JSON with status ("ok" or "degraded"), uptime percentage, version string, and component checks (database, cache, external dependencies). HTTP 200 for healthy, 503 for degraded.',
              },
              {
                title: 'Component checks',
                detail: 'Each dependency gets its own status. If your database is down but your cache is up, return 503 with database: "down", cache: "ok". This lets agents make informed decisions about which operations are safe.',
              },
              {
                title: 'No authentication',
                detail: 'The /health endpoint must be publicly accessible. An agent checking your status before delegation should not need credentials. This is the one endpoint where no-auth is correct.',
              },
              {
                title: 'Low latency',
                detail: 'The health check should return in under 100ms. A slow health check defeats its purpose — agents need a fast yes/no before proceeding. Check connectivity, not query performance.',
              },
              {
                title: 'Cache headers',
                detail: 'Set Cache-Control: no-cache, no-store. Status must be real-time. A cached "ok" from 5 minutes ago is worse than no status at all if the service went down since.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              After the /health endpoint, add a status page. Free options: Instatus (free tier with 1
              status page), Betterstack (free monitoring + status page), or a simple static HTML page
              you update manually. Link it from your homepage footer and from your{' '}
              <Link href="/blog/reliability-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                agent-card.json
              </Link>.
              The status page URL is one of the fields AgentHermes checks during D8 scoring.
            </p>
          </div>
        </div>
      </section>

      {/* ===== NO STATUS PAGE IMPACT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            What Happens Without a Status Page
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Agents skip the reliability check',
                detail: 'Without a /health endpoint, agents delegate blindly. If your service is down, the agent discovers the failure only after the request fails — wasting time, budget, and user trust.',
              },
              {
                title: 'No incident context',
                detail: 'When an agent encounters an error, it cannot distinguish between "this service is having an outage" and "my request was malformed." Without a status page, every failure looks like the agent\'s fault.',
              },
              {
                title: 'D8 scores near zero',
                detail: 'Without any status infrastructure, D8 Reliability contributes almost nothing to your score. That is 13% of the total score effectively zeroed out — the equivalent of missing an entire dimension.',
              },
              {
                title: 'Agents prefer competitors',
                detail: 'Given two services with similar functionality, an agent will prefer the one it can verify is operational. A competitor with a /health endpoint gets chosen over you every time.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-emerald-500" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="text-base font-bold text-zinc-100 mb-3">{faq.question}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RELATED ARTICLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Continue Reading</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Reliability and Agent Readiness: Why Status Pages Score 13%',
                href: '/blog/reliability-agent-readiness',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'Why Vercel and Supabase Both Score 69-70',
                href: '/blog/vercel-supabase-agent-readiness',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'The Agent Readiness Checklist: 30 Signals',
                href: '/blog/checklist-agent-ready-business',
                tag: 'Checklist',
                tagColor: 'emerald',
              },
            ].map((article) => {
              const colors = getColorClasses(article.tagColor)
              return (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mb-3`}>
                    {article.tag}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors leading-snug">
                    {article.title}
                  </h3>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28">
        <hr className="section-divider mb-16" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Does your business have a status page?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see your D8 Reliability score and find out if
            agents can verify your operational status.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Check My Score
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog/reliability-agent-readiness"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              Read the D8 Deep Dive
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
