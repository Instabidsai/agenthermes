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
  Globe,
  HelpCircle,
  Layers,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Wifi,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'HTTP/2 and HTTP/3: Why Protocol Version Matters for Agent Readiness Scoring | AgentHermes',
  description:
    'AgentHermes D8 Reliability detects HTTP/2 and HTTP/3 support. Multiplexing, header compression, and 0-RTT connections make agent interactions faster. Most CDNs already support it — you just need to verify.',
  keywords: [
    'HTTP/2 HTTP/3 agent readiness',
    'HTTP/2 multiplexing agents',
    'HTTP/3 QUIC agent',
    'protocol version agent readiness',
    'CDN agent readiness',
    'D8 reliability scoring',
    'agent API performance',
    'QUIC protocol agents',
    'server push AI agents',
  ],
  openGraph: {
    title: 'HTTP/2 and HTTP/3: Why Protocol Version Matters for Agent Readiness Scoring',
    description:
      'HTTP/2 multiplexing and HTTP/3 QUIC directly impact D8 Reliability scoring. Most CDNs already support both protocols — verify your headers to claim the points.',
    url: 'https://agenthermes.ai/blog/http2-http3-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HTTP/2 and HTTP/3: Why Protocol Version Matters for Agent Readiness Scoring',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTTP/2 and HTTP/3: Why Protocol Version Matters for Agent Readiness Scoring',
    description:
      'HTTP/2 and HTTP/3 support impacts your D8 Reliability score. The fix is usually free — your CDN already supports it.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/http2-http3-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const protocolComparison = [
  { aspect: 'Connection model', http1: 'One request per TCP connection (or keep-alive queuing)', http2: 'Multiplexed streams over single TCP connection', http3: 'Multiplexed streams over QUIC (UDP-based)' },
  { aspect: 'Header handling', http1: 'Full headers sent with every request (2-4KB each)', http2: 'HPACK compression — headers deduplicated across requests', http3: 'QPACK compression — independent of packet order' },
  { aspect: 'Head-of-line blocking', http1: 'Yes — one slow response blocks all subsequent requests', http2: 'Solved at HTTP layer, still present at TCP layer', http3: 'Fully solved — QUIC streams are independent' },
  { aspect: 'Connection setup', http1: '1-3 round trips (TCP + TLS handshake)', http2: '1-2 round trips (TCP + TLS, often combined)', http3: '0-1 round trips (QUIC 0-RTT for returning clients)' },
  { aspect: 'Connection migration', http1: 'None — new IP means new connection', http2: 'None — tied to TCP 4-tuple', http3: 'Yes — connections survive network switches via connection IDs' },
  { aspect: 'Agent benefit', http1: 'Serial requests, high latency per call', http2: 'Parallel API calls on one connection, lower overhead', http3: 'Fastest possible agent interactions, resilient to network changes' },
]

const cdnProtocolSupport = [
  { cdn: 'Cloudflare', http2: true, http3: true, auto: true, note: 'Enabled by default on all plans including free tier' },
  { cdn: 'Vercel (via Cloudflare)', http2: true, http3: true, auto: true, note: 'All Vercel deployments get HTTP/2 and HTTP/3 automatically' },
  { cdn: 'AWS CloudFront', http2: true, http3: true, auto: false, note: 'HTTP/3 requires explicit enable in distribution settings' },
  { cdn: 'Fastly', http2: true, http3: true, auto: false, note: 'HTTP/3 available on all plans, requires configuration' },
  { cdn: 'Google Cloud CDN', http2: true, http3: true, auto: true, note: 'Enabled by default on all load balancers' },
  { cdn: 'Akamai', http2: true, http3: true, auto: false, note: 'Available on Ion and Dynamic Site Accelerator products' },
  { cdn: 'Netlify', http2: true, http3: false, auto: true, note: 'HTTP/2 by default, HTTP/3 not yet available' },
  { cdn: 'No CDN (origin only)', http2: false, http3: false, auto: false, note: 'Nginx/Apache defaults to HTTP/1.1 unless explicitly configured' },
]

const agentBenefits = [
  {
    protocol: 'HTTP/2 Multiplexing',
    description: 'An AI agent making 5 parallel API calls to your service — search, check availability, get pricing, fetch reviews, and verify credentials — can send all 5 requests over a single TCP connection. With HTTP/1.1, each request needs its own connection or waits in a queue.',
    impact: 'Reduces total latency for multi-call agent workflows by 40-60%.',
    icon: Layers,
    color: 'blue',
  },
  {
    protocol: 'HTTP/2 Header Compression',
    description: 'Agents send similar headers on every request — Authorization, Accept, User-Agent, Content-Type. HPACK compression deduplicates these across requests. A 3KB header repeated 10 times becomes 3KB once plus 200 bytes per repeat.',
    impact: 'Reduces bandwidth overhead by 80% for repeated agent requests.',
    icon: Zap,
    color: 'emerald',
  },
  {
    protocol: 'HTTP/3 0-RTT Connections',
    description: 'QUIC allows returning clients to send data immediately — zero round trips before the first request. An agent that calls your API every 5 minutes reconnects instantly instead of waiting for TCP + TLS handshakes.',
    impact: 'Eliminates 100-300ms connection setup time for returning agents.',
    icon: Timer,
    color: 'purple',
  },
  {
    protocol: 'HTTP/3 Connection Migration',
    description: 'QUIC connections survive network changes via connection IDs rather than IP 4-tuples. If an agent runs on infrastructure that migrates between IP addresses (common in cloud functions), the connection stays alive.',
    impact: 'Zero dropped connections during infrastructure scaling events.',
    icon: Network,
    color: 'amber',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Does AgentHermes actually check HTTP/2 and HTTP/3?',
    answer:
      'Yes. The D8 Reliability dimension (0.13 weight) detects the protocol version in response headers. HTTP/2 support adds points to D8. HTTP/3 (indicated by alt-svc headers advertising h3) adds additional points. Sites still on HTTP/1.1 score lower on D8 reliability because protocol version correlates with infrastructure maturity, CDN usage, and overall performance investment.',
  },
  {
    question: 'How do I check what protocol my site uses?',
    answer:
      'Three ways: (1) Open Chrome DevTools, go to Network tab, right-click column headers and enable "Protocol" column. Reload the page and check the protocol column for h2 or h3. (2) Run curl -I --http2 https://yoursite.com and check if the response says HTTP/2. (3) Use https://www.httpvshttps.com/ or similar tools that display negotiated protocol. For HTTP/3, look for alt-svc headers containing h3 in any response.',
  },
  {
    question: 'My site is behind Cloudflare. Am I already on HTTP/2?',
    answer:
      'Almost certainly yes. Cloudflare enables HTTP/2 by default on all plans, including the free tier. HTTP/3 is also enabled by default. If your DNS points to Cloudflare (orange cloud icon), your site serves HTTP/2 and HTTP/3 to any client that supports them. You can verify in the Cloudflare dashboard under Speed > Optimization > Protocol Optimization.',
  },
  {
    question: 'Does HTTP/3 require any code changes?',
    answer:
      'No. HTTP/3 is a transport-level change that is completely transparent to application code. Your API endpoints, response bodies, status codes, and headers all work identically across HTTP/1.1, HTTP/2, and HTTP/3. The protocol negotiation happens at the connection level, typically handled by your CDN or reverse proxy. Your application code never needs to know which protocol is being used.',
  },
  {
    question: 'How much does protocol version actually matter for the Agent Readiness Score?',
    answer:
      'Protocol version is one signal within D8 Reliability, which carries a 0.13 weight (13% of total score). It is not the largest factor in D8 — status pages, uptime, and response times matter more. But it is a free improvement for most sites because CDNs handle it automatically. Think of it as the easiest 1-2 points you can pick up in D8. Combined with a status page and fast response times, protocol support contributes to the overall reliability picture that separates Silver from Bronze.',
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

export default function Http2Http3AgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'HTTP/2 and HTTP/3: Why Protocol Version Matters for Agent Readiness Scoring',
    description:
      'AgentHermes D8 Reliability detects HTTP/2 and HTTP/3 support. Multiplexing, header compression, and 0-RTT connections make agent interactions faster and more reliable.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/http2-http3-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'HTTP/2 HTTP/3 agent readiness, QUIC protocol agents, multiplexing agent API, CDN agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'HTTP/2 and HTTP/3 Agent Readiness',
          item: 'https://agenthermes.ai/blog/http2-http3-agent-readiness',
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
      title="HTTP/2 and HTTP/3: Why Protocol Version Matters for Agent Readiness Scoring"
      shareUrl="https://agenthermes.ai/blog/http2-http3-agent-readiness"
      currentHref="/blog/http2-http3-agent-readiness"
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
            <span className="text-zinc-400">HTTP/2 and HTTP/3 Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Wifi className="h-3.5 w-3.5" />
              Protocol Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Technical Deep Dive
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            HTTP/2 and HTTP/3:{' '}
            <span className="text-emerald-400">Why Protocol Version Matters for Agent Readiness Scoring</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            AgentHermes <strong className="text-zinc-100">D8 Reliability (0.13 weight)</strong> detects
            HTTP/2 and HTTP/3 support. Multiplexing, header compression, and 0-RTT connections make agent
            interactions measurably faster. The good news: most CDNs auto-enable HTTP/2. The fix is usually
            free — you just need to verify it is actually working.
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

      {/* ===== WHY IT MATTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-500" />
            Why Protocol Version Matters for Agents
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Human users visit a website and load one page at a time. AI agents work differently. An agent
              interacting with your API might make 5-20 requests in rapid succession — searching your
              catalog, checking availability, getting pricing, verifying credentials, and initiating a
              transaction. Each request-response cycle matters.
            </p>
            <p>
              On HTTP/1.1, each request either gets its own TCP connection (expensive) or waits in a queue
              behind the previous request (slow). On HTTP/2, all those requests fly in parallel over a
              single connection. On HTTP/3, they fly even faster with zero connection setup time for
              returning agents.
            </p>
            <p>
              The protocol version your server negotiates directly affects how efficiently agents can
              interact with you. AgentHermes detects this in the{' '}
              <Link href="/blog/reliability-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                D8 Reliability dimension
              </Link>{' '}
              because protocol support correlates with infrastructure investment, CDN usage, and overall
              operational maturity — all things agents care about when deciding whether to trust an API
              with real transactions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '13%', label: 'D8 weight in total score', icon: BarChart3 },
              { value: '40-60%', label: 'Latency reduction with HTTP/2', icon: Zap },
              { value: '0-RTT', label: 'HTTP/3 connection setup', icon: Timer },
              { value: 'Free', label: 'CDN upgrade for most sites', icon: Sparkles },
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

      {/* ===== PROTOCOL COMPARISON TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            HTTP/1.1 vs HTTP/2 vs HTTP/3: Side by Side
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Each protocol generation solves a specific problem for agent interactions. HTTP/2 fixes the
            parallelism bottleneck. HTTP/3 fixes the reliability and connection speed bottleneck.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div>HTTP/1.1</div>
              <div>HTTP/2</div>
              <div>HTTP/3</div>
            </div>
            {protocolComparison.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-4 p-4 text-xs sm:text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.http1}</div>
                <div className="text-blue-400">{row.http2}</div>
                <div className="text-emerald-400">{row.http3}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AGENT BENEFITS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            Four Ways Modern Protocols Help Agents
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Agents are not browsers loading web pages. They are API clients making structured calls
              in rapid sequences. Each protocol improvement has a specific, measurable benefit for
              agent workflows.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {agentBenefits.map((benefit) => {
              const colors = getColorClasses(benefit.color)
              return (
                <div
                  key={benefit.protocol}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <benefit.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{benefit.protocol}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{benefit.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-emerald-400 font-medium">Impact:</span>{' '}
                      {benefit.impact}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CDN SUPPORT TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-emerald-500" />
            CDN Protocol Support: Who Gives You HTTP/2 and HTTP/3 for Free
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              The good news: if your site uses any major CDN, you probably already have HTTP/2 support.
              The bad news: if you are running on a bare origin server (Nginx, Apache, Express), you are
              almost certainly still on HTTP/1.1. Here is what each CDN provides:
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>CDN</div>
              <div className="text-center">HTTP/2</div>
              <div className="text-center">HTTP/3</div>
              <div className="text-center">Auto</div>
              <div className="hidden sm:block">Notes</div>
            </div>
            {cdnProtocolSupport.map((row, i) => (
              <div
                key={row.cdn}
                className={`grid grid-cols-5 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.cdn}</div>
                <div className="text-center">
                  {row.http2 ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                  ) : (
                    <span className="text-zinc-600">--</span>
                  )}
                </div>
                <div className="text-center">
                  {row.http3 ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                  ) : (
                    <span className="text-zinc-600">--</span>
                  )}
                </div>
                <div className="text-center">
                  {row.auto ? (
                    <span className="text-emerald-400 text-xs font-medium">Auto</span>
                  ) : (
                    <span className="text-amber-400 text-xs font-medium">Manual</span>
                  )}
                </div>
                <div className="hidden sm:block text-zinc-500 text-xs leading-relaxed">{row.note}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The takeaway:</strong> If you use Cloudflare, Vercel,
              or Google Cloud CDN, you already have HTTP/2 and HTTP/3 with zero configuration. If you use
              AWS CloudFront or Fastly, check your settings — HTTP/3 may need to be explicitly enabled.
              If you run a bare origin server, adding Cloudflare free tier takes 15 minutes and instantly
              gives you both protocols plus{' '}
              <Link href="/blog/caching-cdn-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                CDN caching benefits
              </Link>{' '}
              for D8 Reliability.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO VERIFY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-amber-500" />
            How to Verify Your Protocol Support
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Most businesses assume they are on HTTP/2 because their CDN supports it. But configuration
              issues, origin server settings, or proxy misconfigurations can silently downgrade connections
              to HTTP/1.1. Here are three ways to verify:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Chrome DevTools Protocol Column',
                detail: 'Open DevTools > Network tab. Right-click any column header and enable "Protocol." Reload the page. Look for "h2" (HTTP/2) or "h3" (HTTP/3) in the Protocol column. If you see "http/1.1," your site is not negotiating modern protocols.',
              },
              {
                step: '2',
                title: 'curl with --http2 flag',
                detail: 'Run: curl -I --http2 https://yoursite.com — if the response starts with "HTTP/2 200," you have HTTP/2 support. For HTTP/3, look for an "alt-svc" header in any response containing "h3" — this tells clients that HTTP/3 is available.',
              },
              {
                step: '3',
                title: 'AgentHermes scan',
                detail: 'Run a free scan at /audit. The D8 Reliability breakdown shows detected protocol version, CDN headers, response times, and status page presence. All factors that contribute to the 0.13 weighted D8 score.',
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
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMON PITFALLS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Common Pitfalls That Downgrade Your Protocol
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Origin server fallback',
                detail: 'Your CDN serves HTTP/2, but some requests bypass the CDN and hit your origin directly. If the origin runs Nginx without http2 enabled in the listen directive, those requests fall back to HTTP/1.1. Agents may hit both paths.',
              },
              {
                title: 'Load balancer downgrade',
                detail: 'Some load balancers terminate TLS and re-establish connections to backends on HTTP/1.1. The external client sees HTTP/2, but internal routing loses the benefits. Check the full connection chain.',
              },
              {
                title: 'API subdomain on different infra',
                detail: 'Your marketing site at www.example.com is on Cloudflare (HTTP/2), but your API at api.example.com runs on a separate server without CDN coverage. Agents interact with the API, not the marketing site.',
              },
              {
                title: 'Expired or misconfigured TLS',
                detail: 'HTTP/2 requires TLS in practice (all browsers and most clients enforce this). Expired certificates, self-signed certs, or TLS 1.0/1.1 configurations prevent HTTP/2 negotiation entirely.',
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The general principle: verify the protocol on the exact URL and port that agents will
              hit, not just your marketing homepage. If your API lives on a subdomain or different
              port, check that path specifically. CDN coverage that only applies to your website
              does not help agent interactions with your API.
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
                title: 'CDN and Caching for Agent Readiness: Why Response Time Matters',
                href: '/blog/caching-cdn-agent-readiness',
                tag: 'Technical Deep Dive',
                tagColor: 'purple',
              },
              {
                title: 'Reliability and Agent Readiness: Why Status Pages Score 13%',
                href: '/blog/reliability-agent-readiness',
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
            Is your API on HTTP/2?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness scan to see your protocol version, CDN detection, response
            times, and full D8 Reliability breakdown across all 9 dimensions.
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
