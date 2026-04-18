import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Gauge,
  Globe,
  HelpCircle,
  Layers,
  Server,
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
    'Response Compression and Agent Readiness: Why gzip and Brotli Save Agents Money | AgentHermes',
  description:
    'Agents pay per token. Compressed responses transfer faster and cost less. gzip is universally supported. Brotli is 15-20% smaller. Here is how response compression directly improves your Agent Readiness Score.',
  keywords: [
    'response compression gzip brotli agent readiness',
    'gzip agent readiness',
    'brotli agent API',
    'API compression agent',
    'TTFB agent readiness',
    'response size AI agent',
    'D8 reliability agent score',
    'Content-Encoding agent',
    'API performance agent',
    'compressed API responses',
  ],
  openGraph: {
    title:
      'Response Compression and Agent Readiness: Why gzip and Brotli Save Agents Money',
    description:
      'Agents pay per token. Compressed responses transfer faster and cost less. gzip and Brotli directly improve your D8 Reliability score.',
    url: 'https://agenthermes.ai/blog/compression-encoding-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Response Compression and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Response Compression and Agent Readiness: Why gzip and Brotli Save Agents Money',
    description:
      'Compressed API responses transfer faster and cost agents less. The cheapest D8 improvement: enable compression.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/compression-encoding-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const compressionComparison = [
  {
    method: 'None (identity)',
    ratio: '1x',
    support: '100%',
    cpuCost: 'None',
    bestFor: 'Tiny responses under 100 bytes',
    color: 'red',
  },
  {
    method: 'gzip',
    ratio: '3-5x',
    support: '99%+',
    cpuCost: 'Low',
    bestFor: 'Universal default — works everywhere',
    color: 'emerald',
  },
  {
    method: 'Brotli (br)',
    ratio: '4-6x',
    support: '95%+',
    cpuCost: 'Medium',
    bestFor: 'Modern APIs — 15-20% smaller than gzip',
    color: 'blue',
  },
  {
    method: 'Zstandard (zstd)',
    ratio: '4-7x',
    support: '~30%',
    cpuCost: 'Low',
    bestFor: 'Emerging standard — not widely supported yet',
    color: 'purple',
  },
]

const d8ImpactAreas = [
  {
    metric: 'TTFB (Time to First Byte)',
    impact: 'Compression reduces response size by 60-80%, proportionally reducing transfer time. A 10KB JSON response becomes 2-3KB. On high-latency connections, this is the difference between 200ms and 50ms.',
    scoreEffect: 'Direct D8 Reliability improvement',
    icon: Timer,
  },
  {
    metric: 'Token cost for agents',
    impact: 'While compression does not reduce token count (agents decompress before processing), faster responses mean lower timeout rates and fewer retries. Failed requests are the most expensive — they cost tokens AND time with zero value.',
    scoreEffect: 'Indirect cost reduction',
    icon: DollarSign,
  },
  {
    metric: 'Throughput under load',
    impact: 'Compressed responses consume less bandwidth. An API serving 1000 agent requests per second at 10KB each uses 10 MB/s uncompressed or 2-3 MB/s compressed. This directly affects availability under load.',
    scoreEffect: 'D8 uptime under agent traffic',
    icon: TrendingUp,
  },
]

const implementationExamples = [
  {
    platform: 'Nginx',
    config: 'gzip on;\ngzip_types application/json;\ngzip_min_length 256;',
    lines: 3,
  },
  {
    platform: 'Cloudflare',
    config: 'Enabled by default (gzip + Brotli)\nNo configuration needed',
    lines: 0,
  },
  {
    platform: 'Express.js',
    config: "const compression = require('compression');\napp.use(compression());",
    lines: 2,
  },
  {
    platform: 'Next.js',
    config: '// next.config.js\nmodule.exports = { compress: true }',
    lines: 1,
  },
  {
    platform: 'Vercel / Netlify',
    config: 'Enabled by default\nBoth gzip and Brotli automatic',
    lines: 0,
  },
]

const faqs = [
  {
    question: 'Does compression reduce token count for AI agents?',
    answer:
      'No. Compression happens at the transport layer (HTTP). The agent receives the decompressed response and processes the full text. However, compression reduces transfer time and timeout rates, which means fewer failed requests. Failed requests are the real cost killer — they consume tokens on the retry too.',
  },
  {
    question: 'Should I use gzip or Brotli?',
    answer:
      'Both. Serve Brotli to clients that send Accept-Encoding: br (most modern HTTP clients) and fall back to gzip for the rest. Most CDNs and web servers handle this automatically via content negotiation. Brotli compresses 15-20% smaller than gzip at comparable CPU cost.',
  },
  {
    question: 'Can compression break agent parsing?',
    answer:
      'No. HTTP compression is transparent to the application layer. Every HTTP client library (requests, axios, fetch, curl) handles Content-Encoding automatically. The agent never sees compressed bytes — it receives the fully decompressed JSON. The only edge case is a misconfigured server that double-compresses, which would return garbled data to all clients, not just agents.',
  },
  {
    question: 'How do I check if my API uses compression?',
    answer:
      'Send a request with Accept-Encoding: gzip, br header and check the response for a Content-Encoding header. If the response includes Content-Encoding: gzip or Content-Encoding: br, compression is active. If there is no Content-Encoding header, the response is uncompressed. You can also run an AgentHermes scan at /audit which checks this automatically.',
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

export default function CompressionEncodingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Response Compression and Agent Readiness: Why gzip and Brotli Save Agents Money',
    description:
      'Agents pay per token. Compressed API responses transfer faster and cost less. gzip and Brotli directly improve D8 Reliability scores. The cheapest agent readiness improvement you can make.',
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
      'https://agenthermes.ai/blog/compression-encoding-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1700,
    keywords:
      'response compression gzip brotli agent readiness, API compression, TTFB agent, D8 reliability',
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
      title="Response Compression and Agent Readiness: Why gzip and Brotli Save Agents Money"
      shareUrl="https://agenthermes.ai/blog/compression-encoding-agent-readiness"
      currentHref="/blog/compression-encoding-agent-readiness"
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
              <span className="text-zinc-400">Response Compression and Agent Readiness</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                <Gauge className="h-3.5 w-3.5" />
                Technical Deep Dive
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                D8 Reliability
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Response Compression and Agent Readiness:{' '}
              <span className="text-emerald-400">
                Why gzip and Brotli Save Agents Money
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Agents pay per token. Every byte of an API response costs money. Compressed responses
              transfer faster and reduce timeout-driven retries. gzip is universally supported.
              Brotli compresses <strong className="text-zinc-100">15-20% smaller</strong> than gzip.
              AgentHermes D8 Reliability rewards fast response times. This is the cheapest score
              improvement you can make: usually one line of configuration.
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
                    10 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHY COMPRESSION MATTERS FOR AGENTS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-amber-500" />
              Why Compression Matters More for Agents Than Humans
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                When a human visits a website, page load time matters for user experience. A 200ms
                delay is noticeable but tolerable. For AI agents, the economics are different. Agents
                make hundreds or thousands of API calls per task. Each call has a latency cost (wall
                clock time the agent waits) and a failure cost (if the response times out, the agent
                retries, burning tokens on both the failed and retried request).
              </p>
              <p>
                Response compression attacks both costs simultaneously. A 10KB JSON response
                compressed to 2KB with gzip transfers 5x faster over the same connection. That
                means fewer timeouts, fewer retries, and faster task completion. The agent does not
                care about compression — it sees the decompressed response. But the network layer
                benefits are significant.
              </p>
              <p>
                Our scans show that{' '}
                <strong className="text-zinc-100">most origin servers do not compress API responses</strong>,
                even though their CDN compresses HTML assets. This is the most common configuration
                gap we find in D8 Reliability scoring: a business that has CloudFlare in front
                compressing HTML pages but serving raw JSON from the API origin.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '60-80%', label: 'Size reduction (typical JSON)', icon: TrendingUp },
                { value: '5x', label: 'Faster transfer (gzip)', icon: Zap },
                { value: '1 line', label: 'Config to enable', icon: Code2 },
                { value: 'D8', label: 'Directly improved dimension', icon: BarChart3 },
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

        {/* ===== COMPRESSION METHODS COMPARED ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-500" />
              Compression Methods Compared: gzip vs Brotli vs Zstandard
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Three compression algorithms dominate HTTP. Here is how they compare for
              agent-facing API responses.
            </p>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Method</div>
                <div>Ratio</div>
                <div>Client Support</div>
                <div>CPU Cost</div>
                <div>Best For</div>
              </div>
              {compressionComparison.map((row, i) => {
                const colors = getColorClasses(row.color)
                return (
                  <div
                    key={row.method}
                    className={`grid grid-cols-5 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                  >
                    <div className={`font-medium ${colors.text}`}>{row.method}</div>
                    <div className="text-zinc-300">{row.ratio}</div>
                    <div className="text-zinc-400">{row.support}</div>
                    <div className="text-zinc-400">{row.cpuCost}</div>
                    <div className="text-zinc-500 text-xs">{row.bestFor}</div>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The practical recommendation is simple:{' '}
                <strong className="text-zinc-100">serve Brotli when the client supports it,
                fall back to gzip</strong>. Every modern HTTP client sends{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  Accept-Encoding: gzip, br
                </code>{' '}
                in request headers. Your server or CDN checks this header and responds with the
                best available encoding, indicated by the{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  Content-Encoding
                </code>{' '}
                response header.
              </p>
              <p>
                Brotli achieves 15-20% better compression than gzip on typical JSON payloads.
                For an API returning product catalogs, service listings, or configuration data,
                this translates to measurably faster transfers. The CPU overhead is slightly higher
                than gzip but negligible for responses under 100KB, which covers virtually all
                agent-facing API calls.
              </p>
            </div>
          </div>
        </section>

        {/* ===== D8 RELIABILITY IMPACT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              How Compression Improves Your D8 Reliability Score
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              AgentHermes D8 Reliability measures how consistently and quickly your API responds
              to agent requests. Compression affects three key metrics within D8.
            </p>

            <div className="space-y-4 mb-8">
              {d8ImpactAreas.map((area) => (
                <div
                  key={area.metric}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <area.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{area.metric}</h3>
                      <span className="text-xs text-emerald-400">{area.scoreEffect}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{area.impact}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The relationship between compression and{' '}
                <Link
                  href="/blog/caching-strategies-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  caching strategies
                </Link>{' '}
                is complementary. Caching reduces the number of requests that hit your origin.
                Compression reduces the cost of the requests that do hit it. Together, they
                form the two cheapest improvements for D8 Reliability.
              </p>
            </div>
          </div>
        </section>

        {/* ===== HOW TO ENABLE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              How to Enable Compression: Platform-by-Platform
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              The good news: enabling compression is trivial on every major platform. Most CDNs
              do it automatically. Origin servers usually need one configuration line.
            </p>

            <div className="space-y-3 mb-8">
              {implementationExamples.map((example) => (
                <div
                  key={example.platform}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-zinc-100">{example.platform}</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                      {example.lines === 0 ? 'Automatic' : `${example.lines} line${example.lines > 1 ? 's' : ''}`}
                    </span>
                  </div>
                  <pre className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 overflow-x-auto">
                    <code className="text-xs text-emerald-400 font-mono whitespace-pre">
                      {example.config}
                    </code>
                  </pre>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-amber-400">Common mistake:</strong> Your CDN (Cloudflare,
                Fastly, Vercel) compresses static assets automatically, but your API origin may
                not. If your API runs on a separate backend (Express, Django, Rails), you need
                to enable compression there too. Check by hitting your API directly (bypassing CDN)
                and looking for the Content-Encoding header.
              </p>
            </div>
          </div>
        </section>

        {/* ===== HOW TO VERIFY ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              How to Verify Compression Is Working
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The verification is straightforward. Send a request with the Accept-Encoding header
                and inspect the response headers.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 mb-8">
              <h3 className="font-bold text-zinc-100 mb-3">curl test command</h3>
              <pre className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 overflow-x-auto">
                <code className="text-xs text-emerald-400 font-mono whitespace-pre">
{`curl -s -o /dev/null -w "Size: %{size_download} bytes\\n" \\
  -H "Accept-Encoding: gzip, br" \\
  -D - https://your-api.com/endpoint | grep -i content-encoding

# Expected output:
# Content-Encoding: gzip
# — OR —
# Content-Encoding: br`}
                </code>
              </pre>
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                If you see no Content-Encoding header, your responses are uncompressed. This is
                the most common state for API origins. Run an{' '}
                <Link
                  href="/audit"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  AgentHermes scan
                </Link>{' '}
                to see the full D8 Reliability breakdown, which checks compression alongside
                response time,{' '}
                <Link
                  href="/blog/latency-benchmarks-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  latency benchmarks
                </Link>
                , and uptime indicators.
              </p>
              <p>
                For a deeper analysis of how response size affects agent costs, see our piece on{' '}
                <Link
                  href="/blog/token-counting-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  token counting and agent readiness
                </Link>
                . Compression and lean response design work together: compress first
                (free performance), then optimize payload structure (design effort).
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE CDN GAP ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              The CDN Gap: Compressed HTML, Raw JSON
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                A pattern we see repeatedly in scans: businesses use a CDN like Cloudflare
                or Fastly that automatically compresses HTML, CSS, and JavaScript assets. Their
                website loads fast. But their API endpoints, often hosted on a different origin
                or subdomain, serve uncompressed JSON.
              </p>
              <p>
                This happens because CDN compression typically targets{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  text/html
                </code>{' '}
                and static file types by default. API responses with{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  application/json
                </code>{' '}
                content type may not be compressed unless the CDN is configured to include them,
                or the origin itself handles compression.
              </p>
              <p>
                For businesses that care about agent readiness, the fix is to ensure{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  application/json
                </code>{' '}
                is included in the compression content types. On Nginx, add it to{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  gzip_types
                </code>
                . On Cloudflare, it is included by default (but verify). On custom CDN configurations,
                add it to the compression policy.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">Bottom line:</strong> Response compression is
                the highest-ROI D8 improvement available. It costs zero dollars, takes minutes to
                enable, and immediately reduces transfer times for every agent interaction with your
                API. If you do nothing else from this article, check your API for the Content-Encoding
                header. If it is missing, fix it today.
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
                  title: 'Caching Strategies and Agent Readiness',
                  href: '/blog/caching-strategies-agent-readiness',
                  tag: 'Technical Deep Dive',
                  tagColor: 'cyan',
                },
                {
                  title: 'Latency Benchmarks and Agent Readiness',
                  href: '/blog/latency-benchmarks-agent-readiness',
                  tag: 'Technical Deep Dive',
                  tagColor: 'cyan',
                },
                {
                  title: 'Token Counting: Why Response Size Matters',
                  href: '/blog/token-counting-agent-readiness',
                  tag: 'Technical Deep Dive',
                  tagColor: 'cyan',
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
              Check if your API responses are compressed
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run a free Agent Readiness Scan to see your D8 Reliability score, compression
              status, and every other dimension that matters for agent interactions.
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
