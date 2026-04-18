import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  DollarSign,
  Globe,
  HardDrive,
  HelpCircle,
  Layers,
  RefreshCw,
  Search,
  Server,
  Shield,
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
  title: 'Caching Strategies for Agent-Ready APIs: When to Cache, What to Invalidate | AgentHermes',
  description:
    'Agent-specific caching considerations for APIs. Agents call the same endpoints repeatedly. Proper Cache-Control headers, ETags, CDN caching for static data, and no-cache for real-time data reduce agent costs and your server load. AgentHermes D8 Reliability rewards proper cache headers.',
  keywords: [
    'caching strategies agent ready APIs',
    'API caching for AI agents',
    'Cache-Control headers agent',
    'ETag agent API',
    'CDN caching agent readiness',
    'API reliability caching',
    'agent API performance',
    'stale-while-revalidate agents',
    'conditional requests AI',
  ],
  openGraph: {
    title: 'Caching Strategies for Agent-Ready APIs: When to Cache, What to Invalidate',
    description:
      'Agents call the same endpoints repeatedly. Proper caching reduces their costs and your server load. Cache-Control, ETags, CDN caching, and real-time invalidation strategies for agent-ready APIs.',
    url: 'https://agenthermes.ai/blog/caching-strategies-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Caching Strategies for Agent-Ready APIs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caching Strategies for Agent-Ready APIs',
    description:
      'Agents call the same endpoints repeatedly. Proper caching saves them tokens and saves you server costs. Here is the complete strategy.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/caching-strategies-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const cachingStrategies = [
  {
    header: 'Cache-Control: max-age',
    use: 'Static data that changes infrequently — business info, service menus, team pages, FAQs.',
    example: 'Cache-Control: public, max-age=3600, s-maxage=86400',
    explanation: 'Agent caches for 1 hour. CDN caches for 24 hours. Agent never calls your server for the same business info twice in an hour.',
    saves: 'Up to 95% of redundant calls for catalog data',
    icon: HardDrive,
    color: 'emerald',
  },
  {
    header: 'ETag + If-None-Match',
    use: 'Data that changes sometimes — pricing, product details, menus. Agent checks if data changed before re-downloading.',
    example: 'ETag: "abc123" → Agent sends If-None-Match: "abc123" → 304 Not Modified (zero body transfer)',
    explanation: 'Agent sends the ETag it received last time. If your data has not changed, you return 304 with no body. The agent keeps its cached copy and saves tokens on parsing.',
    saves: 'Token cost: 304 response = ~10 tokens vs full response = 500+ tokens',
    icon: RefreshCw,
    color: 'blue',
  },
  {
    header: 'stale-while-revalidate',
    use: 'Data that should be fresh but where a brief stale window is acceptable — availability slots, inventory counts.',
    example: 'Cache-Control: public, max-age=60, stale-while-revalidate=300',
    explanation: 'Agent gets cached data immediately (fast response) while the CDN revalidates in the background. The agent sees data at most 5 minutes old but never waits for the revalidation.',
    saves: 'Latency: agent gets instant response instead of waiting for your origin server',
    icon: Timer,
    color: 'purple',
  },
  {
    header: 'Cache-Control: no-cache / no-store',
    use: 'Real-time data where staleness is unacceptable — live availability, current inventory, active orders, payment status.',
    example: 'Cache-Control: no-store, must-revalidate',
    explanation: 'Never cache this. Every request hits your origin server. Use this for endpoints where showing stale data causes real harm — double-booking an appointment or selling out-of-stock items.',
    saves: 'Nothing (that is the point) — freshness matters more than performance here',
    icon: Zap,
    color: 'amber',
  },
]

const cachingMatrix = [
  { endpoint: 'get_business_info', cacheStrategy: 'max-age: 3600', reason: 'Address, phone, and hours change rarely', freshness: 'Hourly' },
  { endpoint: 'get_services / get_products', cacheStrategy: 'max-age: 1800 + ETag', reason: 'Catalog changes weekly at most', freshness: '30 min' },
  { endpoint: 'get_pricing', cacheStrategy: 'max-age: 300 + ETag', reason: 'Prices change but not per-minute', freshness: '5 min' },
  { endpoint: 'check_availability', cacheStrategy: 'no-store', reason: 'Slots book in real-time, staleness = double booking', freshness: 'Real-time' },
  { endpoint: 'get_inventory', cacheStrategy: 'stale-while-revalidate: 60', reason: 'Brief staleness acceptable, speed matters', freshness: '~1 min' },
  { endpoint: 'book_appointment', cacheStrategy: 'no-store', reason: 'Write operation, never cache', freshness: 'Real-time' },
  { endpoint: 'get_reviews', cacheStrategy: 'max-age: 3600', reason: 'Reviews do not change frequently', freshness: 'Hourly' },
  { endpoint: 'get_aftercare', cacheStrategy: 'max-age: 86400', reason: 'Static content, rarely updated', freshness: 'Daily' },
]

const d8ReliabilityImpact = [
  {
    signal: 'Cache-Control headers present',
    impact: 'D8 Reliability score +8-12 points',
    detail: 'AgentHermes scans for proper cache headers on API responses. Their presence indicates a mature, agent-considerate API.',
  },
  {
    signal: 'ETag support on GET endpoints',
    impact: 'D8 Reliability score +5-8 points',
    detail: 'Conditional request support tells AgentHermes the API is designed for efficient repeated access — exactly what agents do.',
  },
  {
    signal: 'Consistent cache behavior',
    impact: 'D9 Agent Experience score +3-5 points',
    detail: 'When cache headers are consistent across endpoints (not random or missing on some), it signals intentional API design.',
  },
  {
    signal: '304 Not Modified responses',
    impact: 'D8 Reliability score +3-5 points',
    detail: 'Actually returning 304 when data has not changed (not just sending ETags) proves the caching layer works end-to-end.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Do AI agents actually respect Cache-Control headers?',
    answer:
      'The leading AI agent frameworks (LangChain, AutoGPT, CrewAI) are increasingly implementing HTTP caching. Even when agents themselves do not cache, the CDN layer and any proxy between the agent and your API will. Proper cache headers benefit the entire stack, not just the agent client. Additionally, agent orchestration platforms cache tool responses to avoid redundant calls within a single task — your headers tell them how long that cache is valid.',
  },
  {
    question: 'Should I cache differently for agents versus human API clients?',
    answer:
      'No. Good caching strategy is good caching strategy regardless of the client. The difference is that agents are more aggressive callers — they may hit the same endpoint 10 times in a single task flow where a human would call it once. This makes proper caching more impactful for agent traffic but the headers and strategies are identical. Do not try to detect agent user-agents and serve different cache headers.',
  },
  {
    question: 'What about Vary headers for agent-specific caching?',
    answer:
      'Use Vary: Accept to cache different representations (JSON vs HTML) separately. Use Vary: Authorization when responses differ per API key. Do not use Vary: User-Agent — this destroys cache hit rates because every agent framework sends a different user-agent string. The goal is to maximize cache hits, and User-Agent variation works against that.',
  },
  {
    question: 'How does caching interact with rate limiting?',
    answer:
      'They are complementary. Caching reduces the number of requests that hit your rate limiter. An agent that gets a cached 304 response does not count against rate limits on most API gateways. This means proper caching effectively increases your rate limit capacity without changing the limit — agents can do more work with fewer real requests.',
  },
  {
    question: 'My data changes every few seconds. Can I still use caching?',
    answer:
      'Yes, with stale-while-revalidate. Even a 10-second max-age with a 60-second stale-while-revalidate window means agents get instant responses for the common case while your origin only gets hit once per 10 seconds per unique resource. For truly real-time data (live auction prices, active order tracking), use no-store and consider WebSocket or SSE instead of polling.',
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

export default function CachingStrategiesAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Caching Strategies for Agent-Ready APIs: When to Cache, What to Invalidate',
    description:
      'Agent-specific caching considerations. Cache-Control headers, ETags, CDN caching for static data, no-cache for real-time data. How proper caching reduces agent costs and improves your D8 Reliability score.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/caching-strategies-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'caching strategies agent ready APIs, API caching AI agents, Cache-Control headers, ETag agent, CDN caching agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Caching Strategies for Agent-Ready APIs',
          item: 'https://agenthermes.ai/blog/caching-strategies-agent-readiness',
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
      title="Caching Strategies for Agent-Ready APIs: When to Cache, What to Invalidate"
      shareUrl="https://agenthermes.ai/blog/caching-strategies-agent-readiness"
      currentHref="/blog/caching-strategies-agent-readiness"
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
            <span className="text-zinc-400">Caching Strategies for Agent-Ready APIs</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              <Database className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              D8 Reliability
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Caching Strategies for Agent-Ready APIs:{' '}
            <span className="text-emerald-400">When to Cache, What to Invalidate</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            AI agents are the most repetitive API clients you will ever have. A single agent completing a
            task might call your <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">get_services</code> endpoint
            10 times in one workflow — once for discovery, once for comparison, once for confirmation, and
            again every time it reconsiders. Without proper caching, each call hits your server and costs
            the agent tokens to parse the same response. With proper caching, most of those calls return
            instantly from cache with zero server load. This is not optimization — it is{' '}
            <strong className="text-zinc-100">architecture for the agent economy</strong>.
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
                  11 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY AGENTS NEED CACHING ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-500" />
            Why Agents Are Different: The Repetitive Caller Problem
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Human API clients are efficient. A mobile app fetches data once and renders it. A web dashboard
              loads on page visit and caches in the browser. Humans are lazy callers — they call your API
              only when they need to.
            </p>
            <p>
              Agents are the opposite. An agent planning a task calls your API to understand what is available.
              Then it calls again to verify before making a decision. Then it calls again to confirm before
              executing. Then it calls again to validate after executing. A single agent completing a single
              booking might call <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">get_services</code> four
              times and <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">check_availability</code> six times.
            </p>
            <p>
              Now multiply that by 100 agents serving 100 users in your area. Without caching, your server
              handles thousands of redundant requests for the same unchanged data. With proper caching, 90%+
              of those calls never reach your origin. The difference is the difference between a $50/month
              server and a $500/month server — for the same business.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '10x', label: 'more API calls per task vs human clients', icon: TrendingUp },
              { value: '90%+', label: 'of calls cacheable with proper headers', icon: HardDrive },
              { value: '304', label: 'Not Modified = agent saves tokens', icon: CheckCircle2 },
              { value: '+15', label: 'D8 Reliability score from caching', icon: Target },
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

      {/* ===== THE FOUR STRATEGIES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Four Caching Strategies Every Agent-Ready API Needs
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            There is no single caching strategy. Different endpoints need different approaches based on
            how often the data changes and how harmful staleness is. Here are the four strategies and
            when to use each one.
          </p>

          <div className="space-y-4 mb-8">
            {cachingStrategies.map((strategy) => {
              const colors = getColorClasses(strategy.color)
              return (
                <div
                  key={strategy.header}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <strategy.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{strategy.header}</h3>
                      <p className="text-xs text-zinc-500">{strategy.use}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 mb-3">
                    <code className={`${colors.text} text-xs`}>{strategy.example}</code>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">{strategy.explanation}</p>
                  <p className="text-xs text-zinc-500">
                    <span className={`font-medium ${colors.text}`}>Savings:</span> {strategy.saves}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== ENDPOINT CACHING MATRIX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-emerald-500" />
            Endpoint Caching Matrix: What to Cache on Every MCP Tool
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Here is a practical reference for common MCP tool endpoints. Copy this matrix and adapt it
            to your specific business. The principle: <strong className="text-zinc-300">cache what does not
            change per-minute, invalidate what does</strong>.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-[1fr_1fr_1.5fr_80px] bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Endpoint</div>
              <div>Strategy</div>
              <div>Reason</div>
              <div className="text-center">Freshness</div>
            </div>
            {cachingMatrix.map((row, i) => (
              <div
                key={row.endpoint}
                className={`grid grid-cols-[1fr_1fr_1.5fr_80px] p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-emerald-400 font-mono text-xs">{row.endpoint}</div>
                <div className="text-zinc-300 text-xs">{row.cacheStrategy}</div>
                <div className="text-zinc-500 text-xs">{row.reason}</div>
                <div className={`text-center text-xs font-medium ${row.freshness === 'Real-time' ? 'text-amber-400' : 'text-zinc-400'}`}>
                  {row.freshness}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern is clear: read-heavy endpoints with slowly changing data get aggressive caching.
              Write endpoints and real-time availability get no caching. Everything in between uses
              conditional requests or stale-while-revalidate. This is the same pattern that powers the{' '}
              <Link href="/blog/caching-cdn-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                CDN layer of agent-ready infrastructure
              </Link> — the logic is identical whether caching happens at the CDN edge or in the agent client.
            </p>
          </div>
        </div>
      </section>

      {/* ===== D8 RELIABILITY IMPACT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-500" />
            How Caching Impacts Your Agent Readiness Score
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            AgentHermes scans for caching infrastructure across two dimensions:{' '}
            <Link href="/blog/agent-experience-dimension" className="text-emerald-400 hover:text-emerald-300 underline">
              D8 Reliability
            </Link>{' '}
            (does the API perform consistently under agent load?) and D9 Agent Experience (is the API designed
            with agent callers in mind?). Proper cache headers are one of the strongest signals of both.
          </p>

          <div className="space-y-3 mb-8">
            {d8ReliabilityImpact.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-zinc-100 text-sm">{item.signal}</h3>
                  <span className="text-emerald-400 text-xs font-bold">{item.impact}</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Total impact:</strong> Proper caching can add 19-30 points
              to your Agent Readiness Score across D8 and D9. For a business scoring 40 (Bronze), adding
              cache headers alone could push them to 60+ (Silver). This is one of the highest-leverage
              improvements in the scoring framework — and one of the easiest to implement. Most API
              frameworks support cache headers with a single middleware addition.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE ANTI-PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-red-500" />
            Caching Anti-Patterns That Hurt Agent Readiness
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Bad caching is worse than no caching. Here are the patterns we see in scans that actively
              hurt agent readiness — and what to do instead.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Cache-Control: no-cache on everything',
                detail: 'Treating all endpoints as real-time when 80% of your data changes daily at most. This forces every agent call to your origin, multiplying server load by 10x unnecessarily.',
                fix: 'Audit each endpoint. Only truly real-time data needs no-cache.',
              },
              {
                title: 'Missing ETag on large responses',
                detail: 'Sending the full 50KB product catalog every time when nothing changed. The agent re-parses identical JSON, burning tokens and adding latency.',
                fix: 'Add ETag based on content hash. Return 304 when unchanged.',
              },
              {
                title: 'Inconsistent headers across endpoints',
                detail: 'Cache-Control on /products but not on /services. ETags on /info but not on /pricing. Inconsistency signals unintentional caching rather than designed caching.',
                fix: 'Add caching middleware at the framework level. Every GET endpoint gets a strategy.',
              },
              {
                title: 'Caching personalized responses',
                detail: 'Caching responses that include user-specific data (account details, order history) with public cache headers. This leaks data between agent sessions.',
                fix: 'Use Cache-Control: private for authenticated responses. Public only for public data.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-red-400 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-2">{item.detail}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  <span className="text-emerald-400 font-medium">Fix:</span> {item.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LATENCY AND COST ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            The Cost Math: What Proper Caching Saves
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Consider a local restaurant with an MCP server handling 1,000 agent interactions per day.
              Each interaction calls an average of 8 endpoints: business info, menu, hours, availability
              (x2), pricing, booking, and confirmation. That is 8,000 API calls per day.
            </p>
            <p>
              Without caching: all 8,000 calls hit your origin server. At 200ms per call, that is 26 minutes
              of compute time per day. Your server needs to handle 5-6 concurrent requests during peak hours.
            </p>
            <p>
              With proper caching: business info, menu, hours, and pricing are cached at the CDN. Only
              availability and booking hit your origin — about 2,500 calls per day, a <strong className="text-zinc-100">69%
              reduction</strong>. The cached calls respond in under 10ms from the CDN edge. Your server
              handles peak loads that are one-third the size.
            </p>
            <p>
              For the agent side, each cached response saves the agent from parsing the same JSON again.
              A 304 Not Modified response is roughly 10 tokens to process versus 500+ tokens for a full
              response. Across 5,500 cached calls per day, that is 2.7 million tokens saved — real money
              for agents using{' '}
              <Link href="/blog/latency-benchmarks-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                latency-sensitive workflows
              </Link>.
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
                title: 'Caching, CDN, and Agent Readiness Infrastructure',
                href: '/blog/caching-cdn-agent-readiness',
                tag: 'Technical Deep Dive',
                tagColor: 'cyan',
              },
              {
                title: 'Latency Benchmarks for Agent-Ready APIs',
                href: '/blog/latency-benchmarks-agent-readiness',
                tag: 'Technical Deep Dive',
                tagColor: 'cyan',
              },
              {
                title: 'Check Your Agent Readiness Score',
                href: '/audit',
                tag: 'Free Tool',
                tagColor: 'blue',
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
            Check your API caching score
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See how your API scores on D8 Reliability and D9 Agent Experience. AgentHermes scans for
            Cache-Control headers, ETag support, and response consistency — free.
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
              Connect My API
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
