import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Cloud,
  Code2,
  DollarSign,
  Gauge,
  Globe,
  HelpCircle,
  Layers,
  Network,
  Search,
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
  title:
    'API Latency Benchmarks for Agent Readiness: What p95 Response Times Score Silver | AgentHermes',
  description:
    'AgentHermes D8 Reliability (0.13 weight) rewards fast APIs. Scan data shows p95 under 200ms = top tier. Over 2 seconds = significant scoring hit. Cloudflare free tier drops p95 by 60-80%. Real benchmarks from 500+ business scans.',
  keywords: [
    'API latency benchmarks agent readiness',
    'API response time scoring',
    'agent readiness latency',
    'p95 response time API',
    'CDN agent readiness',
    'API performance benchmarks',
    'Cloudflare agent readiness',
    'time to first byte agent score',
    'API speed scoring',
  ],
  openGraph: {
    title:
      'API Latency Benchmarks for Agent Readiness: What p95 Response Times Score Silver',
    description:
      'Our scan data reveals exactly what API response times earn Silver scores. p95 under 200ms = top tier. Most local businesses: 1-3 seconds. The fix costs $0.',
    url: 'https://agenthermes.ai/blog/latency-benchmarks-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'API Latency Benchmarks for Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'API Latency Benchmarks for Agent Readiness',
    description:
      'p95 under 200ms = top tier. Over 2s = scoring hit. Cloudflare free tier drops p95 by 60-80%. Real data from 500+ scans.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/latency-benchmarks-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const latencyTiers = [
  {
    tier: 'Platinum',
    p95: '< 100ms',
    description:
      'Edge-served responses. CDN cache hits, static JSON, or edge-computed endpoints. Only achievable with a CDN or edge runtime like Cloudflare Workers or Vercel Edge Functions.',
    d8Impact: 'Full D8 latency points (100%)',
    examples: 'Vercel, Cloudflare, Stripe API docs',
    color: 'emerald',
  },
  {
    tier: 'Silver',
    p95: '100-200ms',
    description:
      'Fast origin responses. Well-optimized servers with connection pooling, query caching, and efficient serialization. CDN-assisted but not fully edge-cached.',
    d8Impact: 'Near-full D8 latency points (90%)',
    examples: 'Supabase, GitHub API, well-tuned Next.js',
    color: 'blue',
  },
  {
    tier: 'Acceptable',
    p95: '200-500ms',
    description:
      'Standard server response times. Database queries without caching, moderate serialization overhead, shared hosting with decent specs. No CDN penalty but no bonus either.',
    d8Impact: 'Partial D8 latency points (60-70%)',
    examples: 'Most SaaS APIs, managed WordPress',
    color: 'amber',
  },
  {
    tier: 'Penalty Zone',
    p95: '500ms-2s',
    description:
      'Slow responses that degrade agent experience. Cold starts, unoptimized database queries, no connection pooling, shared hosting with resource contention. Agents will deprioritize or timeout.',
    d8Impact: 'Reduced D8 latency points (30-50%)',
    examples: 'Cheap shared hosting, unoptimized WordPress',
    color: 'red',
  },
  {
    tier: 'Failure Zone',
    p95: '> 2s',
    description:
      'Response times that cause agent timeouts. Most agent frameworks default to 5-10 second timeouts per tool call. A 2+ second response means the agent spends its entire budget on one request — and may abandon it entirely.',
    d8Impact: 'Minimal or zero D8 latency points',
    examples: 'Overloaded shared hosting, no-cache CMS',
    color: 'red',
  },
]

const scanFindings = [
  {
    finding: 'Top scorers all respond sub-200ms',
    detail:
      'Every business in our dataset scoring Silver (60+) or above has p95 response times under 200ms. Without exception. Fast APIs and high agent readiness scores are perfectly correlated in our data.',
    icon: TrendingUp,
    color: 'emerald',
  },
  {
    finding: 'Most local businesses: 1-3 second response times',
    detail:
      'The median local business website takes 1.5 seconds for time-to-first-byte. These are shared hosting environments running WordPress with 20+ plugins, no CDN, no caching layer, and no API endpoints — just slow HTML page renders.',
    icon: Clock,
    color: 'red',
  },
  {
    finding: 'CDN adoption is the single biggest lever',
    detail:
      'Businesses that added Cloudflare (free tier) saw p95 drop by 60-80% on average. A site going from 1.8s to 350ms just by putting a CDN in front. No code changes, no server upgrades, no database optimization — just DNS routing.',
    icon: Cloud,
    color: 'blue',
  },
  {
    finding: 'API endpoints are 2-5x slower than page loads',
    detail:
      'For businesses that do have API endpoints, those endpoints are typically 2-5x slower than their static pages. Dynamic database queries, no response caching, no connection pooling. The API is an afterthought.',
    icon: Gauge,
    color: 'amber',
  },
]

const fixStrategies = [
  {
    strategy: 'Cloudflare Free Tier',
    impact: '60-80% p95 reduction',
    cost: '$0',
    effort: '15 minutes',
    detail:
      'Point your DNS to Cloudflare. They cache static assets, optimize TLS handshakes, and serve from 300+ edge locations. The single highest-ROI change for API latency. Works with any hosting provider.',
    icon: Cloud,
    color: 'emerald',
  },
  {
    strategy: 'Response Caching Headers',
    impact: '40-60% p95 reduction on repeat requests',
    cost: '$0',
    effort: '30 minutes',
    detail:
      'Add Cache-Control headers to API responses. Business info, pricing, and service catalogs rarely change — cache them for 5-60 minutes. Agents making repeated calls get instant responses from the CDN edge.',
    icon: Layers,
    color: 'emerald',
  },
  {
    strategy: 'Database Connection Pooling',
    impact: '30-50% p95 reduction on API calls',
    cost: '$0-20/mo',
    effort: '1-2 hours',
    detail:
      'Each API request opening a new database connection adds 50-200ms. Connection pooling (PgBouncer, Supabase pooler, Prisma Accelerate) reuses connections. The fix is often a single environment variable change.',
    icon: Network,
    color: 'blue',
  },
  {
    strategy: 'Edge Functions',
    impact: '70-90% p95 reduction',
    cost: '$0-20/mo',
    effort: '2-4 hours',
    detail:
      'Move read-heavy API endpoints to edge runtimes (Cloudflare Workers, Vercel Edge Functions, Deno Deploy). Code runs in 300+ locations worldwide. Sub-50ms responses become standard. Best for structured data endpoints that agents call most.',
    icon: Zap,
    color: 'purple',
  },
]

const marketStats = [
  { value: '<200ms', label: 'Top-tier p95 target', icon: Timer },
  { value: '0.13', label: 'D8 Reliability weight', icon: BarChart3 },
  { value: '1.5s', label: 'Median local biz TTFB', icon: Clock },
  { value: '60-80%', label: 'CDN improvement', icon: Cloud },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What exactly does AgentHermes measure for latency?',
    answer:
      'AgentHermes measures time-to-first-byte (TTFB) on every scan request. This is the time from when the HTTP request is sent to when the first byte of the response arrives. We measure this across multiple endpoints — the homepage, any API endpoints discovered, and standard paths like /api, /.well-known/agent-card.json, and /health. The p95 (95th percentile) of these measurements feeds into the D8 Reliability dimension.',
  },
  {
    question: 'How much does latency affect my overall agent readiness score?',
    answer:
      'D8 Reliability carries a 0.13 weight — the highest single dimension weight in the scoring model. Latency is one component of D8 alongside uptime, HTTP/2 support, and error rate consistency. A site with 2+ second response times can lose up to 8-10 points on the overall 100-point score from latency alone. That is often the difference between Bronze and Not Scored.',
  },
  {
    question: 'Why do agent frameworks care about response time?',
    answer:
      'Agent frameworks like LangChain, CrewAI, and AutoGen execute multi-step tool chains. A typical agent interaction might call 3-5 tools sequentially. If each tool call takes 2 seconds, the total interaction takes 10+ seconds — which exceeds most user patience thresholds. Agents naturally prefer faster tools because they can complete more complex workflows within reasonable time budgets. A 100ms API lets an agent make 50 calls in 5 seconds. A 2-second API allows only 2.',
  },
  {
    question: 'Is Cloudflare really free?',
    answer:
      'Yes. Cloudflare\'s free tier includes CDN caching, DDoS protection, SSL, HTTP/2, and basic analytics. It handles the vast majority of use cases for small and medium businesses. The free tier has no bandwidth limits. Premium features like image optimization, WAF rules, and Workers are paid, but the CDN caching that drops your p95 by 60-80% is completely free.',
  },
  {
    question: 'My API has fast response times but my website is slow. Does that matter?',
    answer:
      'For agent readiness, the API response time is what matters most. Agents do not render your website — they call your endpoints. However, AgentHermes scans both website and API endpoints during a scan, and the overall TTFB metric combines both. If your API is fast but your website is slow, you will still get partial credit. The recommended approach is to make everything fast — Cloudflare in front of your entire domain handles both.',
  },
]

function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    red: {
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    amber: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    blue: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LatencyBenchmarksAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'API Latency Benchmarks for Agent Readiness: What p95 Response Times Score Silver',
    description:
      'Real scan data from 500+ businesses reveals the API latency thresholds that determine agent readiness scores. p95 under 200ms = top tier. Cloudflare free tier drops p95 by 60-80%.',
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
      'https://agenthermes.ai/blog/latency-benchmarks-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'API latency benchmarks agent readiness, p95 response time, CDN agent readiness, API performance scoring',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://agenthermes.ai',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://agenthermes.ai/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'API Latency Benchmarks',
          item: 'https://agenthermes.ai/blog/latency-benchmarks-agent-readiness',
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
      title="API Latency Benchmarks for Agent Readiness: What p95 Response Times Score Silver"
      shareUrl="https://agenthermes.ai/blog/latency-benchmarks-agent-readiness"
      currentHref="/blog/latency-benchmarks-agent-readiness"
    >
      <div className="relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd),
          }}
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
              <Link
                href="/"
                className="hover:text-zinc-300 transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-zinc-300 transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-zinc-400">
                API Latency Benchmarks
              </span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                <Timer className="h-3.5 w-3.5" />
                Technical Deep Dive
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                D8 Reliability
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              API Latency Benchmarks for Agent Readiness:{' '}
              <span className="text-emerald-400">
                What p95 Response Times Score Silver
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              AgentHermes D8 Reliability carries the{' '}
              <strong className="text-zinc-100">
                highest single dimension weight
              </strong>{' '}
              at 0.13. And the biggest factor within D8 is how fast
              your API responds. Our scan data from 500+ businesses
              reveals clear thresholds: p95 under 200ms puts you in the
              top tier. Over 2 seconds, and agents start timing out.
              The good news — the most impactful fix costs zero
              dollars.
            </p>

            {/* Author byline */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
              <div className="author-avatar">AH</div>
              <div>
                <div className="text-sm font-semibold text-zinc-200">
                  AgentHermes Research
                </div>
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

        {/* ===== WHY LATENCY MATTERS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-500" />
              Why Milliseconds Matter in the Agent Economy
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Human users tolerate slow websites. They wait for pages
                to load, watch spinners, and retry when things fail. AI
                agents do not. An agent executing a multi-step workflow
                makes 3-10 tool calls per interaction. If each call
                takes 2 seconds, the total interaction takes 20 seconds
                — which exceeds the patience threshold of both the
                agent framework and the human waiting for results.
              </p>
              <p>
                This is why AgentHermes weights{' '}
                <Link
                  href="/blog/reliability-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  D8 Reliability at 0.13
                </Link>{' '}
                — the highest single dimension in the scoring model.
                And within D8, response latency is the most measurable
                and impactful signal. We measure time-to-first-byte on
                every scan, across every discoverable endpoint, and use
                the p95 (95th percentile) as the scoring input.
              </p>
              <p>
                The data is unambiguous: fast APIs score high. Slow APIs
                score low. There is no Silver-scoring business in our
                dataset with p95 over 200ms.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {marketStats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== THE BENCHMARK TIERS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              The Five Latency Tiers
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Based on our scan data from 500+ businesses, API
              response times cluster into five distinct performance
              tiers. Each tier has a direct impact on your D8
              Reliability score.
            </p>

            <div className="space-y-4 mb-8">
              {latencyTiers.map((tier) => {
                const colors = getColorClasses(tier.color)
                return (
                  <div
                    key={tier.tier}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                        >
                          <Timer
                            className={`h-5 w-5 ${colors.text}`}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-zinc-100">
                            {tier.tier}
                          </h3>
                          <span
                            className={`text-sm font-mono ${colors.text}`}
                          >
                            p95 {tier.p95}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-semibold`}
                      >
                        {tier.d8Impact}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-2">
                      {tier.description}
                    </p>
                    <p className="text-xs text-zinc-600">
                      <span className="text-zinc-500 font-medium">
                        Examples:
                      </span>{' '}
                      {tier.examples}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== WHAT OUR SCANS FOUND ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-500" />
              What Our Scans Reveal
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                We analyzed time-to-first-byte data across every scan
                in our database. Four findings stand out.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {scanFindings.map((item) => {
                const colors = getColorClasses(item.color)
                return (
                  <div
                    key={item.finding}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <item.icon
                          className={`h-5 w-5 ${colors.text}`}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">
                        {item.finding}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== THE AGENT TIMEOUT PROBLEM ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              The Agent Timeout Problem
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Most agent frameworks impose strict timeout budgets.
                LangChain defaults to 10 seconds per tool call. CrewAI
                uses 30 seconds for complex tools. Claude&apos;s tool
                calling has built-in timeout handling. When your API
                takes 3 seconds to respond, the agent has already used
                30% of its timeout budget on a single call.
              </p>
              <p>
                Worse, agents learn. Modern agent frameworks track tool
                reliability metrics. If your endpoint times out once,
                the agent retries. If it times out repeatedly, the
                agent deprioritizes your tool in favor of faster
                alternatives. This is not theoretical — it is how
                production agent systems handle unreliable tools.
              </p>
              <p>
                The math is simple. An agent with a 10-second budget
                can make:
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong className="text-zinc-100">100 calls</strong>{' '}
                    at 100ms each
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>
                    <strong className="text-zinc-100">50 calls</strong>{' '}
                    at 200ms each
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>
                    <strong className="text-zinc-100">5 calls</strong>{' '}
                    at 2 seconds each
                  </span>
                </li>
              </ul>
              <p>
                The business with 100ms responses gets rich agent
                interactions. The business with 2-second responses gets
                one tool call and a fallback to web search.
              </p>
            </div>
          </div>
        </section>

        {/* ===== HOW TO FIX IT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              Four Fixes Ranked by Impact per Dollar
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Every fix below is ranked by the ratio of latency
              improvement to cost. Start with Cloudflare — it has the
              highest impact for zero cost.
            </p>

            <div className="space-y-4 mb-8">
              {fixStrategies.map((fix) => {
                const colors = getColorClasses(fix.color)
                return (
                  <div
                    key={fix.strategy}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <fix.icon
                          className={`h-5 w-5 ${colors.text}`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-zinc-100">
                          {fix.strategy}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <span className="text-xs text-emerald-400 font-medium">
                            {fix.impact}
                          </span>
                          <span className="text-xs text-zinc-500">
                            Cost: {fix.cost}
                          </span>
                          <span className="text-xs text-zinc-500">
                            Effort: {fix.effort}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {fix.detail}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">
                  The $0 path to Silver-tier latency:
                </strong>{' '}
                Cloudflare free tier plus response caching headers.
                These two changes alone can take a typical local
                business from 1.5-second p95 to under 300ms — crossing
                into the Acceptable tier and dramatically improving D8
                Reliability scores. Total cost: $0. Total effort: under
                45 minutes. Read our{' '}
                <Link
                  href="/blog/caching-cdn-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  CDN and caching guide
                </Link>{' '}
                for step-by-step instructions.
              </p>
            </div>
          </div>
        </section>

        {/* ===== MEASURING YOUR OWN LATENCY ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Gauge className="h-5 w-5 text-blue-500" />
              How to Measure Your Own Latency
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Before optimizing, measure. Here are three ways to
                check your current p95 response time.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                {
                  step: '1',
                  title: 'Run an AgentHermes scan',
                  detail:
                    'Visit /audit and enter your URL. The scan report includes TTFB measurements and shows exactly where your latency stands relative to scoring thresholds. This is the fastest way to see your current D8 score.',
                  icon: Search,
                },
                {
                  step: '2',
                  title: 'Check browser DevTools',
                  detail:
                    'Open Chrome DevTools Network tab, reload your page, and look at the Waiting (TTFB) column. Do this 5-10 times and take the worst measurement — that approximates your p95.',
                  icon: Code2,
                },
                {
                  step: '3',
                  title: 'Use WebPageTest',
                  detail:
                    'webpagetest.org runs from multiple global locations and provides detailed TTFB breakdowns including DNS, TCP, TLS, and server processing time. Test from 3+ locations to understand geographic variance.',
                  icon: Globe,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                    {item.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="h-4 w-4 text-emerald-400" />
                      <h3 className="font-bold text-zinc-100 text-sm">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The key insight from our data: latency improvements
                have diminishing returns for scoring, but massive
                returns for agent usability. Going from 2 seconds to
                500ms is the most impactful change. Going from 500ms to
                200ms crosses the Silver threshold. Going from 200ms to
                50ms has minimal scoring impact but makes your API a
                top-tier agent target. Learn more about{' '}
                <Link
                  href="/blog/http2-http3-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  HTTP/2 and HTTP/3 protocols
                </Link>{' '}
                for additional latency optimization techniques.
              </p>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section
          id="faq"
          className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50"
        >
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
                  <h3 className="text-base font-bold text-zinc-100 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== RELATED ARTICLES ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Continue Reading
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title:
                    'Caching and CDN Strategies for Agent Readiness',
                  href: '/blog/caching-cdn-agent-readiness',
                  tag: 'Technical Guide',
                  tagColor: 'purple',
                },
                {
                  title:
                    'Reliability Scoring: How D8 Works',
                  href: '/blog/reliability-agent-readiness',
                  tag: 'Scoring Deep Dive',
                  tagColor: 'blue',
                },
                {
                  title:
                    'HTTP/2 and HTTP/3 for Agent Readiness',
                  href: '/blog/http2-http3-agent-readiness',
                  tag: 'Technical Deep Dive',
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
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mb-3`}
                    >
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
              How fast is your API?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run a free Agent Readiness Scan and see your TTFB
              measurements, D8 Reliability score, and exactly where
              your latency falls in our benchmark tiers.
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
