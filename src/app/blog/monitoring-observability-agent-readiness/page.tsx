import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  DollarSign,
  Eye,
  Globe,
  HelpCircle,
  Layers,
  LineChart,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Monitoring and Observability for Agent Readiness: How to Know If AI Agents Are Using Your API | AgentHermes',
  description:
    'Once you are agent-ready, how do you know agents are calling your API? Agent traffic monitoring, User-Agent detection, request pattern analysis, billing attribution, and the tools to track it all. The complete guide to agent observability.',
  keywords: [
    'monitoring observability agent readiness',
    'AI agent traffic monitoring',
    'agent API analytics',
    'agent User-Agent detection',
    'AI agent billing attribution',
    'agent request patterns',
    'API observability agents',
    'DataDog agent monitoring',
    'agent traffic analytics',
  ],
  openGraph: {
    title: 'Monitoring and Observability for Agent Readiness: How to Know If AI Agents Are Using Your API',
    description:
      'Your API is agent-ready. But are agents actually using it? Agent traffic monitoring, pattern detection, and revenue attribution.',
    url: 'https://agenthermes.ai/blog/monitoring-observability-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Monitoring and Observability for Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monitoring and Observability for Agent Readiness',
    description:
      'Are AI agents actually using your API? Agent traffic monitoring, User-Agent detection, request pattern analysis, and revenue attribution.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/monitoring-observability-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const agentSignals = [
  {
    signal: 'User-Agent Header',
    description: 'AI agents identify themselves in HTTP headers. Claude uses "Claude-Agent", GPT uses "OpenAI-GPT", and framework agents use identifiers like "LangChain/1.0" or "CrewAI/0.5".',
    detection: 'Regex match on User-Agent for known agent identifiers. Maintain a growing allow-list.',
    reliability: 'High — but agents can spoof or omit it',
    color: 'emerald',
  },
  {
    signal: 'Request Pattern Analysis',
    description: 'Agents behave differently than humans. They paginate systematically (page 1, 2, 3, 4 in sequence), never skip pages, and consume entire result sets. Humans jump around randomly.',
    detection: 'Track sequential pagination, consistent intervals, and full-dataset consumption patterns.',
    reliability: 'High — behavioral patterns are hard to fake',
    color: 'blue',
  },
  {
    signal: 'Session Fingerprinting',
    description: 'Agent sessions lack cookies, have no referrer headers, use consistent IP ranges (cloud providers), and make requests at machine speed (sub-100ms between calls).',
    detection: 'Score sessions on: no cookies + no referrer + cloud IP + machine-speed intervals.',
    reliability: 'Medium — some legitimate API clients look similar',
    color: 'purple',
  },
  {
    signal: 'Tool Discovery Patterns',
    description: 'MCP-native agents hit your discovery endpoints first: /.well-known/agent-card.json, /llms.txt, /agents.md. Then they call list_tools() before any functional call.',
    detection: 'Track the discovery → list_tools → functional_call sequence. Only agents do this.',
    reliability: 'Very high — this sequence is agent-specific',
    color: 'cyan',
  },
  {
    signal: 'Content Negotiation',
    description: 'Agents request application/json exclusively. They never request text/html. If an endpoint receives Accept: application/json with no prior HTML page load, it is likely an agent.',
    detection: 'Filter requests where Accept header is JSON-only with no associated browser session.',
    reliability: 'Medium — some developer tools also do this',
    color: 'amber',
  },
]

const monitoringStack = [
  {
    tool: 'Custom Middleware',
    cost: 'Free',
    description: 'A 20-line Express/Next.js middleware that tags requests as agent vs human based on User-Agent, headers, and patterns. Writes tags to your existing logging pipeline.',
    bestFor: 'Small businesses with existing API infrastructure',
    icon: Code2,
    color: 'emerald',
  },
  {
    tool: 'DataDog APM',
    cost: '$23/host/month',
    description: 'Add custom tags for agent traffic. Create dashboards showing agent vs human request volume, latency percentiles, and error rates by agent type.',
    bestFor: 'Teams already using DataDog for infrastructure monitoring',
    icon: BarChart3,
    color: 'blue',
  },
  {
    tool: 'Grafana + Prometheus',
    cost: 'Free (self-hosted)',
    description: 'Custom metrics for agent_requests_total, agent_errors_total, and agent_revenue_attributed. Build dashboards that show agent traffic alongside human traffic.',
    bestFor: 'Teams that prefer open-source and self-hosted monitoring',
    icon: Activity,
    color: 'purple',
  },
  {
    tool: 'AgentHermes Analytics',
    cost: 'Included with platform',
    description: 'Built-in agent traffic analytics for businesses using AgentHermes hosted MCP. See which agents are calling your tools, request volumes, and conversion rates.',
    bestFor: 'Businesses using AgentHermes for their MCP server',
    icon: TrendingUp,
    color: 'cyan',
  },
]

const metricsToTrack = [
  { metric: 'Agent Request Volume', description: 'Total API calls from identified agents per hour/day/week', why: 'Baseline for agent adoption — is it growing?' },
  { metric: 'Agent vs Human Ratio', description: 'Percentage of total traffic from agents vs browsers', why: 'Track the shift from human to agent-driven interaction' },
  { metric: 'Agent Conversion Rate', description: 'Percentage of agent sessions that complete a transaction', why: 'Measures whether your API is actually usable by agents' },
  { metric: 'Revenue per Agent Session', description: 'Average revenue generated per agent interaction', why: 'Quantifies the ROI of being agent-ready' },
  { metric: 'Agent Error Rate', description: 'Percentage of agent requests that return 4xx/5xx errors', why: 'High error rates mean your API confuses agents' },
  { metric: 'Discovery-to-Action Time', description: 'Time from agent-card.json read to first functional API call', why: 'Measures how quickly agents understand your offerings' },
  { metric: 'Agent Type Distribution', description: 'Breakdown by Claude, GPT, LangChain, custom agents', why: 'Shows which platforms are driving your agent traffic' },
  { metric: 'Tool Popularity Ranking', description: 'Which MCP tools get called most frequently', why: 'Informs which capabilities to invest in improving' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How do I distinguish agent traffic from regular API traffic?',
    answer:
      'Use a layered approach: check User-Agent headers first (catches 60-70% of agent traffic), then analyze behavioral patterns (sequential pagination, machine-speed requests, JSON-only content negotiation), then check for MCP discovery sequences (agent-card.json reads followed by tool calls). The combination of these signals gives you 90%+ accuracy in identifying agent traffic.',
  },
  {
    question: 'Should I rate-limit AI agents differently than human users?',
    answer:
      'Yes, but carefully. Agents make more requests per session because they paginate through data systematically. A rate limit designed for human browsing (10 requests/minute) will block agents mid-workflow. Set agent-specific rate limits that are higher per-minute but lower per-day. The key metric is successful workflow completions, not raw request count.',
  },
  {
    question: 'How do I attribute revenue to agent-driven bookings vs human bookings?',
    answer:
      'Tag every booking with a source channel at creation time. Bookings created through your MCP server are agent-sourced. Bookings through your website are human-sourced. Bookings through your mobile app are app-sourced. This three-channel attribution model lets you calculate the exact revenue contribution of being agent-ready and justify further investment.',
  },
  {
    question: 'What if agents are calling my API but not converting?',
    answer:
      'Low conversion usually means one of three things: your responses are confusing (agents parse but cannot act on the data), your booking flow requires too many steps (agents give up), or your pricing is not transparent (agents cannot quote a price to the user). Check your agent error rate and study the request sequences that end without a transaction.',
  },
  {
    question: 'Do I need separate monitoring for MCP traffic vs REST API traffic?',
    answer:
      'Ideally yes. MCP traffic follows the discovery → tools → execution pattern and uses SSE transport. REST API traffic is individual endpoint calls. Monitoring them separately lets you see MCP-specific metrics (discovery success rate, tool listing response time, SSE connection duration) that are invisible if you only monitor HTTP endpoints.',
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

export default function MonitoringObservabilityAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Monitoring and Observability for Agent Readiness: How to Know If AI Agents Are Using Your API',
    description:
      'The complete guide to monitoring AI agent traffic on your API. User-Agent detection, behavioral pattern analysis, revenue attribution, and the observability stack for agent-ready businesses.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/monitoring-observability-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Guide',
    wordCount: 1900,
    keywords:
      'monitoring observability agent readiness, agent traffic monitoring, API analytics agents, agent User-Agent detection',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Monitoring and Observability for Agent Readiness',
          item: 'https://agenthermes.ai/blog/monitoring-observability-agent-readiness',
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
      title="Monitoring and Observability for Agent Readiness: How to Know If AI Agents Are Using Your API"
      shareUrl="https://agenthermes.ai/blog/monitoring-observability-agent-readiness"
      currentHref="/blog/monitoring-observability-agent-readiness"
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
            <span className="text-zinc-400">Monitoring and Observability</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Activity className="h-3.5 w-3.5" />
              Technical Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Post-Launch
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Monitoring and Observability for Agent Readiness:{' '}
            <span className="text-emerald-400">How to Know If AI Agents Are Using Your API</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            You built the MCP server. You published the agent-card.json. You scored Silver on AgentHermes.
            Now what? <strong className="text-zinc-100">How do you know if a single AI agent has ever called
            your API?</strong> Most businesses that become agent-ready have zero visibility into whether agents
            are actually using their infrastructure. This guide fixes that.
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
                  14 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE BLIND SPOT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-amber-500" />
            The Agent Traffic Blind Spot
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Traditional web analytics tools — Google Analytics, Mixpanel, Amplitude — are designed to track
              human behavior in browsers. They rely on JavaScript execution, cookies, and page views. AI agents
              do none of these things. An agent that calls your API 50 times per day will show up as{' '}
              <strong className="text-zinc-100">zero traffic in Google Analytics</strong>.
            </p>
            <p>
              This creates a dangerous perception gap. You invest in agent readiness, deploy your MCP server,
              and then look at your analytics dashboard to see if it is working. The dashboard shows nothing.
              You conclude agent traffic does not exist. In reality, you just cannot see it.
            </p>
            <p>
              Agent traffic lives in your server logs, not your analytics dashboards. It shows up as API
              calls, not page views. It has User-Agent strings like &ldquo;Claude-Agent/1.0&rdquo; instead
              of &ldquo;Mozilla/5.0&rdquo;. If you are not looking in the right place with the right filters,
              you are flying blind in the agent economy.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '0%', label: 'Agent traffic visible in GA4', icon: Eye },
              { value: '100%', label: 'Visible in server access logs', icon: Server },
              { value: '5+', label: 'Distinct agent identification signals', icon: Search },
              { value: '$0', label: 'Cost to add basic agent monitoring', icon: DollarSign },
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

      {/* ===== 5 SIGNALS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Five Signals That Identify Agent Traffic
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              No single signal reliably identifies all agent traffic. But combining multiple signals gives
              you high-confidence detection. Here are the five signals to layer together.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {agentSignals.map((signal) => {
              const colors = getColorClasses(signal.color)
              return (
                <div
                  key={signal.signal}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-zinc-100">{signal.signal}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors.bg} border ${colors.border} ${colors.text}`}>
                      {signal.reliability}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{signal.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Detection:</span>{' '}
                      <span className={`${colors.text} text-xs`}>{signal.detection}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE MIDDLEWARE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            The 20-Line Middleware That Makes Agent Traffic Visible
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The fastest way to start seeing agent traffic is a middleware function that tags every incoming
              request as &ldquo;agent&rdquo; or &ldquo;human.&rdquo; This tag propagates through your logging
              pipeline and immediately shows up in any dashboard or alerting system you already use.
            </p>
            <p>
              The middleware checks three things in order: the User-Agent string for known agent identifiers,
              the Accept header for JSON-only requests, and the request sequence for MCP discovery patterns.
              If any of these match, the request gets tagged as agent traffic with a confidence score.
            </p>
            <p>
              Once tagged, every metric you already track (response time, error rate, throughput) gains an
              agent dimension. You can filter your existing DataDog or Grafana dashboards by{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">source:agent</code>{' '}
              and see agent-specific performance instantly. No new monitoring infrastructure required — just
              one middleware function that adds a tag.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mb-8">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Key insight:</strong> Agent traffic monitoring does not require
              new tools. It requires a new <em>lens</em> on your existing tools. A single tag on each request
              transforms your entire observability stack into an agent-aware system.
            </p>
          </div>
        </div>
      </section>

      {/* ===== MONITORING STACK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-500" />
            The Agent Observability Stack
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Four options for monitoring agent traffic, from zero-cost custom middleware to full-platform
              solutions. Choose based on what you already have deployed.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {monitoringStack.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.tool}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{item.tool}</h3>
                      <span className={`text-xs font-medium ${colors.text}`}>{item.cost}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">{item.description}</p>
                  <p className="text-xs text-zinc-500">
                    <span className="text-zinc-400 font-medium">Best for:</span> {item.bestFor}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 8 METRICS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Eight Metrics Every Agent-Ready Business Should Track
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Once you can see agent traffic, these are the eight metrics that tell you whether your agent
              readiness investment is paying off.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Metric</div>
              <div>What It Measures</div>
              <div>Why It Matters</div>
            </div>
            {metricsToTrack.map((row, i) => (
              <div
                key={row.metric}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-emerald-400">{row.metric}</div>
                <div className="text-zinc-400">{row.description}</div>
                <div className="text-zinc-500">{row.why}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The most important metric is <strong className="text-zinc-100">Agent Conversion Rate</strong>.
              High traffic with low conversion means agents are finding you but cannot complete workflows.
              This is almost always a{' '}
              <Link href="/blog/status-page-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                reliability problem
              </Link>{' '}
              or a data quality issue — agents parse your responses but get confused by inconsistent schemas
              or missing fields.
            </p>
          </div>
        </div>
      </section>

      {/* ===== REVENUE ATTRIBUTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            Revenue Attribution: Proving Agent Readiness ROI
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The C-suite question is always the same: &ldquo;What is the ROI of being agent-ready?&rdquo;
              You answer this by attributing revenue to the agent channel, the same way you attribute revenue
              to organic search, paid ads, and direct traffic.
            </p>
            <p>
              Every booking, order, or lead that comes through your MCP server or agent-tagged API call is
              agent-sourced revenue. Compare this against the cost of your agent infrastructure (MCP server
              hosting, monitoring, and maintenance) and you have a clear ROI number.
            </p>
            <p>
              Early agent-ready businesses are seeing{' '}
              <Link href="/blog/agent-readiness-roi-calculator" className="text-emerald-400 hover:text-emerald-300 underline">
                3-5x ROI within the first quarter
              </Link>{' '}
              because the infrastructure cost is low and agent-driven bookings are incremental — they come from
              users who would have gone to a competitor or abandoned the task entirely. This is not replacing
              existing channels. It is adding a new one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { value: '3 channels', label: 'Human + App + Agent attribution', icon: Users },
              { value: '100%', label: 'Agent bookings are incremental revenue', icon: TrendingUp },
              { value: '3-5x', label: 'Typical first-quarter ROI', icon: DollarSign },
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

      {/* ===== ALERTING ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Alerting: Know When Agent Traffic Spikes or Drops
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Set up three alerts to catch problems before agents abandon your API.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                alert: 'Agent Error Rate > 5%',
                detail: 'Something changed in your API that is breaking agent workflows. Investigate immediately — agents will stop trying within hours.',
                icon: Shield,
                color: 'red' as const,
              },
              {
                alert: 'Agent Traffic Drops > 50% Day-over-Day',
                detail: 'A major agent platform may have changed their routing or your discovery endpoint may be down. Check your agent-card.json and MCP server health.',
                icon: TrendingUp,
                color: 'amber' as const,
              },
              {
                alert: 'New Agent Type Detected',
                detail: 'A new AI agent platform is calling your API. Log the User-Agent and monitor its behavior. This is a growth signal — a new channel is discovering you.',
                icon: Bot,
                color: 'emerald' as const,
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.alert}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                    <item.icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm mb-1 ${colors.text}`}>{item.alert}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              )
            })}
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
                title: 'Status Pages for Agent Readiness',
                href: '/blog/status-page-agent-readiness',
                tag: 'Technical Guide',
                tagColor: 'purple',
              },
              {
                title: 'CDN and Caching for Agent Readiness',
                href: '/blog/caching-cdn-agent-readiness',
                tag: 'Technical Guide',
                tagColor: 'blue',
              },
              {
                title: 'Agent Readiness ROI Calculator',
                href: '/blog/agent-readiness-roi-calculator',
                tag: 'Tool',
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
            See if agents can find your business
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score. Then set up monitoring to track
            every AI agent that discovers you.
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
