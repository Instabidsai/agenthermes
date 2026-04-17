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
  Cloud,
  Code2,
  Gauge,
  Globe,
  HelpCircle,
  Layers,
  Network,
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
  title: 'CDN and Caching for Agent Readiness: Why Response Time Matters for D8 Reliability | AgentHermes',
  description:
    'D8 Reliability (0.13 weight) checks response times. CDN-backed APIs respond in under 100ms. Origin-only APIs hit 500ms+. Fix: Cloudflare free tier plus proper cache headers equals instant D8 improvement.',
  keywords: [
    'CDN caching agent readiness',
    'response time agent readiness',
    'D8 reliability',
    'CDN for API',
    'Cloudflare agent readiness',
    'API response time',
    'edge CDN API',
    'cache headers agent readiness',
    'HTTP/2 agent readiness',
  ],
  openGraph: {
    title: 'CDN and Caching for Agent Readiness: Why Response Time Matters for D8 Reliability',
    description:
      'CDN-backed APIs respond in under 100ms. Origin-only APIs hit 500ms+. AgentHermes detects CDN headers. Here is how caching impacts 13% of your score.',
    url: 'https://agenthermes.ai/blog/caching-cdn-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CDN and Caching for Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CDN and Caching for Agent Readiness: Why Response Time Matters',
    description:
      'D8 Reliability is 13% of the Agent Readiness Score. CDN-backed APIs dominate. Here is why.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/caching-cdn-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const cdnHeaders = [
  { header: 'CF-Cache-Status', provider: 'Cloudflare', description: 'HIT, MISS, DYNAMIC, BYPASS. AgentHermes detects this to confirm edge caching is active.', impact: '+2-3 pts D8' },
  { header: 'X-Cache', provider: 'AWS CloudFront / Fastly', description: 'Hit from cloudfront or HIT. Standard header across multiple CDN providers.', impact: '+2-3 pts D8' },
  { header: 'Age', provider: 'Any CDN', description: 'Seconds since the response was cached. Presence confirms caching is working. Age: 0 means fresh from origin.', impact: '+1 pt D8' },
  { header: 'X-Vercel-Cache', provider: 'Vercel', description: 'HIT, STALE, MISS. Vercel edge network cache status. Vercel scores 70 partly because of this.', impact: '+2-3 pts D8' },
  { header: 'Cache-Control', provider: 'Origin server', description: 'max-age, s-maxage, stale-while-revalidate. Tells CDNs and agents how long to cache responses.', impact: '+1-2 pts D8' },
  { header: 'Via', provider: 'Any proxy/CDN', description: 'Indicates the request passed through a proxy or CDN. 1.1 varnish or 1.1 cloudfront.', impact: '+1 pt D8' },
]

const responseTimeTiers = [
  { range: '<50ms', label: 'Edge-cached', score: 'Full D8 credit', examples: 'Vercel, Cloudflare Workers, cached API responses', color: 'emerald' },
  { range: '50-100ms', label: 'CDN-backed', score: 'Near-full D8 credit', examples: 'Supabase, Stripe, AWS API Gateway + CloudFront', color: 'emerald' },
  { range: '100-300ms', label: 'Fast origin', score: 'Partial D8 credit', examples: 'Well-configured VPS, Render, Railway', color: 'blue' },
  { range: '300-500ms', label: 'Slow origin', score: 'Minimal D8 credit', examples: 'Shared hosting, unoptimized WordPress', color: 'amber' },
  { range: '500ms-2s', label: 'Unreliable', score: 'Near-zero D8 credit', examples: 'Cold-start serverless, overloaded origin', color: 'red' },
  { range: '>2s', label: 'Timeout risk', score: 'Zero D8 credit', examples: 'Agents may abandon the request entirely', color: 'red' },
]

const topScorers = [
  { name: 'Resend', score: 75, cdn: 'Cloudflare', responseTime: '~35ms', tier: 'Gold' },
  { name: 'Vercel', score: 70, cdn: 'Vercel Edge Network', responseTime: '~22ms', tier: 'Silver' },
  { name: 'Supabase', score: 69, cdn: 'Cloudflare + AWS', responseTime: '~45ms', tier: 'Silver' },
  { name: 'Stripe', score: 68, cdn: 'Cloudflare', responseTime: '~60ms', tier: 'Silver' },
  { name: 'Avg local business', score: 8, cdn: 'None', responseTime: '~800ms', tier: 'Not Scored' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Do AI agents actually check response times?',
    answer:
      'Yes. AI agents operate under time and cost budgets. A slow API burns tokens while the agent waits, increases the chance of timeout errors, and degrades the user experience. Agents learn to prefer faster, more reliable endpoints. AgentHermes measures response time as part of D8 Reliability, which carries a 0.13 weight — the second-highest dimension after D2 API Quality.',
  },
  {
    question: 'Is Cloudflare free tier enough for agent readiness?',
    answer:
      'For most businesses, yes. Cloudflare free tier gives you a global CDN, automatic HTTPS, HTTP/2, DDoS protection, and cache headers — all of which improve D8 Reliability. The free tier handles millions of requests per month. Upgrade to Pro ($20/month) only if you need advanced caching rules, image optimization, or WAF rules.',
  },
  {
    question: 'Does HTTP/2 matter for agent readiness?',
    answer:
      'HTTP/2 enables multiplexed requests, header compression, and server push. Agents making multiple API calls benefit from multiplexing — they can send parallel requests over a single connection instead of opening multiple TCP connections. AgentHermes detects HTTP/2 support and it contributes to D8 scoring. Every major CDN enables HTTP/2 by default.',
  },
  {
    question: 'What about API responses that cannot be cached?',
    answer:
      'Dynamic API responses (user-specific data, real-time availability) should not be cached at the CDN layer. But the CDN still helps: TLS termination at the edge, HTTP/2, connection pooling to origin, and DDoS protection all reduce response time even for uncacheable responses. Set Cache-Control: no-store for truly dynamic responses and let the CDN optimize the transport layer.',
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

export default function CachingCdnAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'CDN and Caching for Agent Readiness: Why Response Time Matters for D8 Reliability',
    description:
      'D8 Reliability checks response times. CDN-backed APIs respond in under 100ms. Origin-only APIs hit 500ms+. How caching and CDN infrastructure impacts 13% of the Agent Readiness Score.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/caching-cdn-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'CDN caching agent readiness, response time, D8 reliability, Cloudflare, edge CDN, API performance',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'CDN and Caching for Agent Readiness',
          item: 'https://agenthermes.ai/blog/caching-cdn-agent-readiness',
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
      title="CDN and Caching for Agent Readiness: Why Response Time Matters for D8 Reliability"
      shareUrl="https://agenthermes.ai/blog/caching-cdn-agent-readiness"
      currentHref="/blog/caching-cdn-agent-readiness"
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
            <span className="text-zinc-400">CDN and Caching</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Cloud className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              D8 Reliability
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            CDN and Caching for Agent Readiness:{' '}
            <span className="text-emerald-400">Why Response Time Matters for D8 Reliability</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            D8 Reliability carries a <strong className="text-zinc-100">0.13 weight</strong> in the Agent
            Readiness Score — the second-highest dimension. CDN-backed APIs respond in under 100ms. Origin-only
            APIs hit 500ms or more. AgentHermes detects CDN headers, HTTP/2 support, and response time.
            The fix takes 15 minutes and costs nothing.
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

      {/* ===== WHY AGENTS CARE ABOUT SPEED ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Why AI Agents Care About Response Time
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Humans tolerate 2-3 second page loads because they are looking at a screen and waiting. AI
              agents do not wait patiently. Every millisecond an agent waits for your API response is a
              millisecond it burns on compute. Agents operate under time budgets and cost budgets. A slow
              API is an expensive API — not because of pricing, but because of wasted inference time.
            </p>
            <p>
              More critically, agents learn. If your API consistently responds in 800ms while a competitor
              responds in 60ms, the agent will prefer the faster endpoint for future requests. This is not
              theoretical — it is how LLM-based agents optimize their tool selection. Slow responses train
              agents to avoid you.
            </p>
            <p>
              AgentHermes measures response time as part of D8 Reliability. The <strong className="text-zinc-100">
              0.13 weight</strong> makes D8 the second most impactful dimension after D2 API Quality (0.15).
              Response time is not the only D8 signal — uptime, status pages, and error rates also
              contribute — but it is the most immediate and the easiest to fix.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '0.13', label: 'D8 weight', icon: BarChart3 },
              { value: '<100ms', label: 'CDN-backed response', icon: Zap },
              { value: '500ms+', label: 'origin-only response', icon: Timer },
              { value: '$0', label: 'Cloudflare free tier', icon: Cloud },
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

      {/* ===== RESPONSE TIME TIERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Gauge className="h-5 w-5 text-blue-500" />
            Response Time Tiers and D8 Impact
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            AgentHermes categorizes response times into tiers. Edge-cached responses get full D8 credit.
            Responses over 2 seconds get zero credit and risk agent abandonment.
          </p>

          <div className="space-y-3 mb-8">
            {responseTimeTiers.map((tier) => {
              const colors = getColorClasses(tier.color)
              return (
                <div
                  key={tier.range}
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                    <span className={`text-xs font-bold ${colors.text}`}>{tier.range}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-zinc-100 text-sm">{tier.label}</h3>
                      <span className={`text-xs ${colors.text}`}>{tier.score}</span>
                    </div>
                    <p className="text-xs text-zinc-500">{tier.examples}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CDN HEADERS AGENTHERMES DETECTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            CDN Headers AgentHermes Detects
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            AgentHermes scans response headers to detect CDN infrastructure. The presence of these headers
            confirms that responses are being served from edge locations, not a single origin server.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-xs font-bold text-zinc-300">
              <div>Header</div>
              <div>Provider</div>
              <div>What It Means</div>
              <div>D8 Impact</div>
            </div>
            {cdnHeaders.map((row, i) => (
              <div
                key={row.header}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-mono text-emerald-400 text-xs">{row.header}</div>
                <div className="text-zinc-300 text-xs">{row.provider}</div>
                <div className="text-zinc-500 text-xs">{row.description}</div>
                <div className="text-blue-400 text-xs font-medium">{row.impact}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Key insight:</strong> You do not need all of these headers.
              Any one CDN header confirming edge caching is enough to boost D8. Cloudflare free tier
              automatically adds CF-Cache-Status, which AgentHermes detects. That single header proves your
              responses are edge-cached.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TOP SCORERS ALL USE CDNs ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-amber-500" />
            Every Top Scorer Uses Edge CDNs
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The correlation between CDN usage and high Agent Readiness Scores is near-perfect.
            Every business scoring Silver or above uses edge infrastructure.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-xs font-bold text-zinc-300">
              <div>Business</div>
              <div>Score</div>
              <div>CDN</div>
              <div>Response Time</div>
              <div>Tier</div>
            </div>
            {topScorers.map((row, i) => (
              <div
                key={row.name}
                className={`grid grid-cols-5 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.name}</div>
                <div className="text-emerald-400 font-bold">{row.score}</div>
                <div className="text-zinc-300 text-xs">{row.cdn}</div>
                <div className="text-zinc-300 text-xs">{row.responseTime}</div>
                <div className={`text-xs font-medium ${row.tier === 'Gold' ? 'text-amber-400' : row.tier === 'Silver' ? 'text-zinc-300' : 'text-red-400'}`}>
                  {row.tier}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The average local business responds in ~800ms from a single origin server — often shared
              hosting with no CDN, no HTTP/2, and no cache headers. That is 10-20x slower than the
              businesses scoring Silver and above. The gap is entirely fixable with free infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE 15-MINUTE FIX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The 15-Minute Fix: Cloudflare Free Tier
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The single highest-impact, lowest-effort change for D8 Reliability. Here is the exact
            sequence.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Sign up for Cloudflare (free)',
                detail: 'Create a free account at cloudflare.com. Add your domain. Cloudflare scans your DNS records automatically.',
                icon: Globe,
              },
              {
                step: '2',
                title: 'Update nameservers',
                detail: 'Point your domain nameservers to Cloudflare. This is the only step that requires DNS access. Takes 5 minutes to propagate.',
                icon: Server,
              },
              {
                step: '3',
                title: 'Enable proxying (orange cloud)',
                detail: 'Toggle the proxy icon to orange for your API and website records. This routes traffic through Cloudflare edge, enabling CDN, HTTPS, HTTP/2, and DDoS protection.',
                icon: Shield,
              },
              {
                step: '4',
                title: 'Set cache rules',
                detail: 'For static assets and public API responses: Cache-Control: public, max-age=3600, s-maxage=86400. For dynamic responses: Cache-Control: no-store. Cloudflare respects these headers.',
                icon: Layers,
              },
              {
                step: '5',
                title: 'Verify with AgentHermes',
                detail: 'Run a scan at /audit. Check that CF-Cache-Status appears in the response headers. Your D8 score should increase 3-5 points immediately.',
                icon: CheckCircle2,
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
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              After this setup, your responses travel from the nearest Cloudflare edge location — one of
              330+ data centers worldwide — instead of from a single origin server. Response times drop
              from 500ms+ to under 100ms for cached responses, and 150-200ms for dynamic responses
              that still benefit from edge TLS termination and connection pooling.
            </p>
          </div>
        </div>
      </section>

      {/* ===== BEYOND BASIC CDN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Network className="h-5 w-5 text-purple-500" />
            Beyond Basic CDN: What Separates Silver from Gold
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'HTTP/2 and HTTP/3',
                detail: 'Multiplexed requests, header compression, and 0-RTT connection resumption. Agents making parallel API calls see 30-50% faster total completion time. Cloudflare enables HTTP/2 by default and HTTP/3 with one toggle.',
              },
              {
                title: 'stale-while-revalidate',
                detail: 'The best cache-control directive for APIs. Serve stale cached content instantly while fetching a fresh copy in the background. Agents always get a fast response, and the data is never more than one request behind.',
              },
              {
                title: 'Edge compute (Workers)',
                detail: 'Run API logic at the edge, not at origin. Cloudflare Workers, Vercel Edge Functions, and Deno Deploy execute code in 300+ locations. Sub-50ms response times for dynamic content. This is why Vercel scores 70.',
              },
              {
                title: 'Health endpoints',
                detail: 'A /health or /status endpoint that returns 200 with uptime data. CDNs can monitor this and route around failures. AgentHermes checks for health endpoints as part of D8. Combined with CDN caching, this maximizes reliability.',
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

          <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-purple-400">The compounding effect:</strong> CDN alone improves D8.
              But CDN plus HTTP/2 plus edge compute plus health endpoints plus a status page pushes D8
              close to maximum. Vercel and Supabase score 69-70 because they stack all five. Most
              businesses have zero of them.
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
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'Status Pages Are an Agent Readiness Signal',
                href: '/blog/status-page-agent-readiness',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'Check Your Agent Readiness Score',
                href: '/audit',
                tag: 'Free Tool',
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
            How fast is your API to agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your D8 Reliability score and response time in 60 seconds. If you are over 300ms,
            the Cloudflare free tier fix takes 15 minutes.
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
