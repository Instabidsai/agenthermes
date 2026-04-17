import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileCheck,
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  Network,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Signal,
  Sparkles,
  Timer,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'SLAs and Uptime Guarantees: Why 99.9% Isn\'t Enough for Agent Readiness | AgentHermes',
  description:
    'D8 Reliability (0.13 weight) rewards documented SLAs. But agents need more than "99.9% uptime" on a marketing page. Machine-readable SLA documents, real-time uptime endpoints, incident history APIs, and programmatic compensation terms.',
  keywords: [
    'SLA uptime guarantee agent readiness',
    'agent readiness SLA',
    'machine-readable SLA',
    'uptime API agent',
    'SLA documentation agent',
    'reliability agent readiness score',
    'status page agent readiness',
    'incident history API',
    'agent economy reliability',
  ],
  openGraph: {
    title:
      'SLAs and Uptime Guarantees: Why 99.9% Isn\'t Enough for Agent Readiness',
    description:
      'D8 Reliability rewards documented SLAs. But agents need machine-readable SLA documents, real-time uptime endpoints, and incident history APIs — not marketing claims.',
    url: 'https://agenthermes.ai/blog/sla-uptime-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SLAs and Uptime Guarantees for Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'SLAs and Uptime Guarantees: Why 99.9% Isn\'t Enough for Agent Readiness',
    description:
      'Agents need machine-readable SLAs, real-time uptime endpoints, and incident APIs. Marketing claims score zero.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/sla-uptime-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const slaLevels = [
  {
    level: 'Level 0: No SLA',
    description:
      'No uptime commitment anywhere. No status page. The business might be up, might be down — the agent has no way to know until a request fails. This is where 80% of businesses sit.',
    score: '0/100 on D8',
    icon: AlertTriangle,
    color: 'red',
  },
  {
    level: 'Level 1: Marketing SLA',
    description:
      '"99.9% uptime guaranteed" on the pricing page. No machine-readable format. No historical data. No incident log. The agent reads this as prose and cannot verify or act on it. Better than nothing, but barely.',
    score: '15/100 on D8',
    icon: FileCheck,
    color: 'amber',
  },
  {
    level: 'Level 2: Status Page',
    description:
      'A status page (StatusPage.io, Instatus, custom) showing current system status. Maybe an RSS feed. The agent can poll the page, but the format varies wildly. Partial credit for trying.',
    score: '35/100 on D8',
    icon: Activity,
    color: 'amber',
  },
  {
    level: 'Level 3: Structured SLA',
    description:
      'Machine-readable SLA document (JSON or YAML). Real-time uptime percentage endpoint. Incident history API with timestamps, severity, and resolution. Planned maintenance calendar. Compensation terms for downtime. This is agent-ready reliability.',
    score: '85/100 on D8',
    icon: ShieldCheck,
    color: 'emerald',
  },
]

const agentReadySlaComponents = [
  {
    component: 'Machine-Readable SLA Document',
    description:
      'A JSON or YAML file at a well-known path (e.g., /.well-known/sla.json) that declares uptime commitment, response time guarantees, support hours, escalation procedures, and compensation terms. Agents parse this before deciding to depend on a service.',
    example: '{ "uptime_sla": "99.95%", "response_time_p99_ms": 200, "support_hours": "24/7", "compensation": { "below_99_9": "10% credit", "below_99_5": "25% credit" } }',
    icon: FileJson,
    color: 'emerald',
  },
  {
    component: 'Real-Time Uptime Endpoint',
    description:
      'An API endpoint that returns current uptime percentage over 30/90/365 day windows. Not a status page that says "Operational" — an endpoint that returns { "uptime_30d": 99.97, "uptime_90d": 99.94 }. Agents use this to make real-time routing decisions.',
    example: 'GET /api/status/uptime → { "uptime_30d": 99.97, "uptime_90d": 99.94, "last_incident": "2026-04-01T..." }',
    icon: Signal,
    color: 'emerald',
  },
  {
    component: 'Incident History API',
    description:
      'A structured log of past incidents with timestamps, severity levels, affected services, root causes, and resolution times. Agents analyze this to assess reliability trends — is the service getting more reliable or less? Are incidents clustered around certain times?',
    example: 'GET /api/status/incidents → [{ "id": "INC-042", "severity": "major", "started": "...", "resolved": "...", "services": ["api", "webhooks"] }]',
    icon: Timer,
    color: 'emerald',
  },
  {
    component: 'Planned Maintenance Calendar',
    description:
      'An endpoint or calendar feed (iCal/JSON) listing scheduled maintenance windows. Agents use this to avoid routing traffic during maintenance, schedule jobs around downtime, and set user expectations proactively.',
    example: 'GET /api/status/maintenance → [{ "window": "2026-04-20T02:00Z/2026-04-20T04:00Z", "services": ["api"], "impact": "partial" }]',
    icon: Calendar,
    color: 'emerald',
  },
  {
    component: 'Compensation Terms API',
    description:
      'Machine-readable compensation rules: what happens when the SLA is violated? Agents need to know if they can claim credits automatically, what the threshold is, and how to initiate a claim. This moves SLA enforcement from legal documents to programmatic verification.',
    example: 'GET /api/sla/compensation → { "eligible": true, "current_uptime": 99.89, "sla_target": 99.95, "credit_percentage": 10 }',
    icon: Shield,
    color: 'emerald',
  },
]

const comparisonRows = [
  { aspect: 'Uptime Claim', human: '"99.9% uptime" on pricing page', agent: 'JSON SLA at /.well-known/sla.json with exact terms' },
  { aspect: 'Current Status', human: 'Green dot on status page', agent: 'GET /api/status → { "status": "operational", "uptime_30d": 99.97 }' },
  { aspect: 'Incident Info', human: 'Blog post about the outage', agent: 'GET /api/incidents → structured log with timestamps and severity' },
  { aspect: 'Maintenance', human: 'Email 24 hours before', agent: 'Calendar feed at /api/maintenance with machine-readable windows' },
  { aspect: 'Compensation', human: 'Email support, cite SLA, wait', agent: 'GET /api/sla/compensation → auto-calculated credit' },
  { aspect: 'Reliability Score', human: 'Trust based on reputation', agent: 'Computed from uptime data, incident frequency, MTTR' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does D8 Reliability have a 0.13 weight — higher than API quality?',
    answer:
      'Because an unreliable service is worse than no service. If an agent integrates with your API and it goes down, the agent fails in front of the user. Agents will preferentially route to services with proven reliability. A service with a 60-score API and 90-score reliability beats a service with a 90-score API and 30-score reliability every time.',
  },
  {
    question: 'Is a status page enough for agent readiness?',
    answer:
      'A status page gets you to about 35/100 on D8. It shows intent but lacks the structured data agents need. StatusPage.io does have a JSON API, which helps — but most status pages are HTML-only. The gap between "we have a status page" and "we have machine-readable reliability infrastructure" is the gap between 35 and 85 on D8.',
  },
  {
    question: 'What is the difference between claiming 99.9% and proving it?',
    answer:
      'Claiming it means putting text on a webpage. Proving it means exposing a real-time uptime endpoint that returns actual measured data over rolling windows. Any business can claim 99.9%. Only businesses with monitoring infrastructure can prove it. Agents only trust what they can verify programmatically.',
  },
  {
    question: 'Do agents actually check SLA data before making routing decisions?',
    answer:
      'Increasingly, yes. Multi-agent orchestrators like LangChain and CrewAI already support tool reliability scoring. When an agent has multiple tools that can accomplish the same task, it routes to the most reliable one. Exposing your reliability data makes you the preferred choice in these routing decisions.',
  },
  {
    question: 'How does AgentHermes check for SLA documentation?',
    answer:
      'The scanner looks for: status page presence (any format), JSON status endpoints, /.well-known/sla.json, incident history pages or APIs, response time headers (Server-Timing), and documented SLA terms on pricing or legal pages. Each element contributes to the D8 Reliability score. The more structured and machine-readable, the higher the score.',
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

export default function SlaUptimeAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'SLAs and Uptime Guarantees: Why 99.9% Isn\'t Enough for Agent Readiness',
    description:
      'D8 Reliability (0.13 weight) rewards documented SLAs. But agents need machine-readable SLA documents, real-time uptime endpoints, incident history APIs, and programmatic compensation terms — not marketing claims.',
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
    mainEntityOfPage:
      'https://agenthermes.ai/blog/sla-uptime-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Analysis',
    wordCount: 1850,
    keywords:
      'SLA uptime guarantee agent readiness, machine-readable SLA, reliability agent readiness, status page agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'SLAs and Uptime for Agent Readiness',
          item: 'https://agenthermes.ai/blog/sla-uptime-agent-readiness',
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
      title="SLAs and Uptime Guarantees: Why 99.9% Isn't Enough for Agent Readiness"
      shareUrl="https://agenthermes.ai/blog/sla-uptime-agent-readiness"
      currentHref="/blog/sla-uptime-agent-readiness"
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
            <span className="text-zinc-400">SLAs &amp; Uptime for Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <FileCheck className="h-3.5 w-3.5" />
              Technical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              D8 Reliability
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            SLAs and Uptime Guarantees:{' '}
            <span className="text-emerald-400">Why 99.9% Isn&apos;t Enough for Agent Readiness</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            D8 Reliability carries a <strong className="text-zinc-100">0.13 weight</strong> in
            the Agent Readiness Score — the second-highest dimension. But &ldquo;99.9% uptime&rdquo;
            on a pricing page scores almost nothing. Agents need machine-readable SLAs,
            real-time uptime data, and programmatic incident history. The difference between
            &ldquo;we are reliable&rdquo; and <strong className="text-zinc-100">proving it</strong>.
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
                  13 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-500" />
            The Reliability Paradox
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Almost every SaaS company claims high uptime. &ldquo;99.9% availability&rdquo; appears
              on pricing pages, in sales decks, and in enterprise contracts. For human buyers,
              this works — they read the number, check a few reviews, and make a trust decision
              based on brand reputation.
            </p>
            <p>
              AI agents do not trust brands. They trust data. When an agent evaluates whether
              to route traffic through your service, it looks for evidence — not claims. A
              &ldquo;99.9% uptime&rdquo; statement in prose is worth almost nothing because the
              agent cannot verify it, cannot monitor it, and cannot hold you accountable
              programmatically if it turns out to be false.
            </p>
            <p>
              This creates a paradox: <strong className="text-zinc-100">the most reliable
              services often score poorly on D8</strong> because they prove their reliability
              to humans (reputation, case studies, testimonials) rather than to machines
              (structured data, APIs, monitoring endpoints). A service with 99.99% actual
              uptime but no status API scores lower than a service with 99.5% uptime and a
              comprehensive reliability infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '0.13', label: 'D8 Reliability weight', icon: BarChart3 },
              { value: '80%', label: 'of businesses: no SLA', icon: AlertTriangle },
              { value: '15%', label: 'have any status page', icon: Activity },
              { value: '<3%', label: 'have structured SLA data', icon: FileJson },
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

      {/* ===== THE FOUR LEVELS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Four Levels of SLA Maturity for Agents
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Not all reliability infrastructure is created equal. Here is how AgentHermes
            evaluates SLA maturity, from invisible to fully agent-ready.
          </p>

          <div className="space-y-4 mb-8">
            {slaLevels.map((level) => {
              const colors = getColorClasses(level.color)
              return (
                <div
                  key={level.level}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <level.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{level.level}</h3>
                      <span className={`text-xs ${colors.text}`}>{level.score}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{level.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== AGENT-READY SLA COMPONENTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Five Components of an Agent-Ready SLA
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            A fully agent-ready reliability infrastructure includes five machine-readable
            components. Together, they let agents make informed routing decisions without
            trusting marketing claims.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadySlaComponents.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.component}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{item.component}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{item.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500 break-all">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className="text-emerald-400 text-xs">{item.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== HUMAN VS AGENT COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-amber-500" />
            Human Trust vs Agent Trust: Side-by-Side
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Humans and agents evaluate reliability through completely different lenses.
            Here is how the same reliability information is consumed by each.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div>Human Evaluation</div>
              <div>Agent Evaluation</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.human}</div>
                <div className="text-emerald-400">{row.agent}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern is clear: <strong className="text-zinc-100">agents need structured,
              verifiable data at every point where humans use judgment</strong>. A human reads
              a post-mortem blog post and decides if the company handled the outage well. An
              agent reads an incident history API and computes mean time to resolution. Both
              are evaluating reliability — but only the agent approach scales to thousands
              of decisions per second.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENTHERMES CHECKS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-500" />
            What AgentHermes Checks for D8 Reliability
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The AgentHermes scanner evaluates D8 Reliability by checking for evidence of
              reliability infrastructure — not by monitoring your uptime directly. Here is
              what contributes to your D8 score.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Status Page Presence',
                detail: 'Any status page at /status, status.yourdomain.com, or linked from your footer. HTML status pages score less than JSON/API status endpoints.',
                points: 'Up to 20 points',
              },
              {
                title: 'SLA Documentation',
                detail: 'Documented SLA terms anywhere on the site — pricing page, legal page, or dedicated SLA page. Machine-readable format (JSON) scores significantly higher than prose.',
                points: 'Up to 25 points',
              },
              {
                title: 'Incident History',
                detail: 'Historical incident data accessible via any format. API endpoint with structured data scores highest. A changelog or blog with outage reports scores partial credit.',
                points: 'Up to 20 points',
              },
              {
                title: 'Response Time Evidence',
                detail: 'Server-Timing headers, response time documentation, or performance monitoring integration. Shows you measure and care about latency, not just uptime.',
                points: 'Up to 15 points',
              },
              {
                title: 'Maintenance Communication',
                detail: 'Any evidence of planned maintenance communication — calendar, RSS, email list, or status page maintenance schedule. Proactive communication scores higher.',
                points: 'Up to 10 points',
              },
              {
                title: 'Monitoring Integration',
                detail: 'Evidence of third-party monitoring (Datadog, PagerDuty, Better Uptime badges). Shows professional infrastructure investment in reliability.',
                points: 'Up to 10 points',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                  <span className="text-xs text-emerald-400">{item.points}</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The scoring principle:</strong> AgentHermes
              checks for <em>SLA documentation</em>, not actual uptime. We are not a monitoring
              service — we evaluate whether your reliability infrastructure is agent-accessible.
              A business with 100% uptime but zero documentation scores lower than a business
              with 99.5% uptime and comprehensive reliability APIs. The documentation is what
              makes the reliability useful to agents.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHO DOES IT WELL ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Who Does Reliability Infrastructure Well?
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              In our 500-business scan, the highest D8 scores came from developer infrastructure
              companies. This makes sense — their customers are engineers who demand measurable
              reliability, not marketing promises.
            </p>
            <p>
              <strong className="text-zinc-100">Stripe</strong> scores well on D8: public status
              page with JSON API, documented SLA for enterprise, incident history, and
              Server-Timing headers on API responses. <strong className="text-zinc-100">Vercel</strong> has
              a real-time status page with component-level status and incident history.{' '}
              <strong className="text-zinc-100">Supabase</strong> publishes uptime data and has a
              status page with RSS feed.
            </p>
            <p>
              The gap is massive when you move outside developer tools. E-commerce platforms,
              local services, and most SaaS products have zero reliability infrastructure
              visible to agents. They might be perfectly reliable — but agents cannot tell.
              This is the difference between <strong className="text-zinc-100">being
              reliable</strong> and <strong className="text-zinc-100">being provably
              reliable</strong>.
            </p>
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
                title: 'Reliability and Agent Readiness: D8 Deep Dive',
                href: '/blog/reliability-agent-readiness',
                tag: 'Technical Guide',
                tagColor: 'purple',
              },
              {
                title: 'Status Pages and Agent Readiness',
                href: '/blog/status-page-agent-readiness',
                tag: 'Technical Analysis',
                tagColor: 'blue',
              },
              {
                title: 'Latency Benchmarks for Agent Readiness',
                href: '/blog/latency-benchmarks-agent-readiness',
                tag: 'Technical Guide',
                tagColor: 'purple',
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
            Is your reliability infrastructure agent-ready?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your D8 Reliability score and find out what agents can verify about your
            uptime. Free scan in 60 seconds.
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
              href="/connect"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              Connect My Business
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
