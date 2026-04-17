import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Cloud,
  CloudCog,
  Code2,
  DollarSign,
  Gauge,
  Globe,
  HelpCircle,
  Layers,
  Lock,
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
  title: 'Serverless and Edge Functions: Why Vercel, Cloudflare Workers, and AWS Lambda Are Agent-Ready by Design | AgentHermes',
  description:
    'Serverless platforms score higher on agent readiness because they deliver sub-100ms latency, automatic HTTPS, built-in CDN, and structured error responses by default. Your infrastructure choice IS your agent readiness choice.',
  keywords: [
    'serverless edge functions agent readiness',
    'Vercel Edge Functions agent readiness',
    'Cloudflare Workers agent readiness',
    'AWS Lambda agent readiness',
    'serverless MCP server',
    'edge computing agent economy',
    'serverless API agent',
    'agent readiness infrastructure',
    'edge functions latency',
  ],
  openGraph: {
    title: 'Serverless and Edge Functions: Why Vercel, Cloudflare Workers, and AWS Lambda Are Agent-Ready by Design',
    description:
      'Serverless platforms naturally score higher on agent readiness: sub-100ms cold starts, automatic HTTPS, built-in CDN, global distribution. The infrastructure choice IS the agent readiness choice.',
    url: 'https://agenthermes.ai/blog/serverless-edge-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Serverless and Edge Functions: Agent-Ready by Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serverless and Edge Functions: Agent-Ready Infrastructure by Design',
    description:
      'Vercel Edge Functions, Cloudflare Workers, and AWS Lambda score higher on agent readiness by default. Here is why infrastructure choice matters.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/serverless-edge-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const platformComparison = [
  {
    name: 'Vercel Edge Functions',
    coldStart: '<50ms',
    tls: 'Automatic (Let\'s Encrypt)',
    cdn: 'Global (Vercel Edge Network)',
    structuredErrors: 'Next.js error handling + JSON responses',
    agentScore: '65-72',
    icon: Zap,
    color: 'emerald',
  },
  {
    name: 'Cloudflare Workers',
    coldStart: '0ms (V8 isolates)',
    tls: 'Automatic (Cloudflare SSL)',
    cdn: 'Global (300+ PoPs)',
    structuredErrors: 'Custom error responses, Workers KV for config',
    agentScore: '62-70',
    icon: Cloud,
    color: 'blue',
  },
  {
    name: 'AWS Lambda@Edge',
    coldStart: '100-500ms (runtime dependent)',
    tls: 'Automatic (ACM)',
    cdn: 'CloudFront (450+ PoPs)',
    structuredErrors: 'API Gateway structured responses',
    agentScore: '58-68',
    icon: Server,
    color: 'amber',
  },
  {
    name: 'Traditional Shared Hosting',
    coldStart: 'N/A (always-on but slow)',
    tls: 'Manual (often expired or missing)',
    cdn: 'None (single origin)',
    structuredErrors: 'HTML error pages, no JSON',
    agentScore: '8-15',
    icon: Globe,
    color: 'red',
  },
]

const dimensionMapping = [
  { dimension: 'D7 Security (TLS)', weight: '12%', serverless: 'Automatic HTTPS on every deployment, zero config. No expired certs, no mixed content.', traditional: 'Manual cert installation. 23% of shared hosting sites have TLS issues (expired, misconfigured, or missing).' },
  { dimension: 'D8 Reliability/Latency', weight: '13%', serverless: 'Sub-100ms cold starts, automatic scaling, built-in health checks. 99.99% uptime SLAs on major platforms.', traditional: 'Single server, no auto-scaling. TTFB of 800ms-2s common. No /health endpoint, no status page.' },
  { dimension: 'D1 Discovery (CDN)', weight: '12%', serverless: 'Built-in CDN with global distribution. Cache headers set automatically. Edge caching reduces latency for agent requests worldwide.', traditional: 'No CDN. All requests hit the origin server. Agents in different regions experience inconsistent latency.' },
  { dimension: 'D2 API Quality', weight: '15%', serverless: 'Framework defaults to JSON responses. TypeScript type safety. OpenAPI generation via route introspection.', traditional: 'PHP defaults to HTML. JSON requires explicit Content-Type headers. API structure varies wildly.' },
  { dimension: 'D6 Data Quality', weight: '10%', serverless: 'Structured response formats enforced by typed route handlers. Consistent schemas across endpoints.', traditional: 'Mixed HTML/JSON responses. Inconsistent schemas. Often returns HTML error pages for API calls.' },
  { dimension: 'D9 Agent Experience', weight: '10%', serverless: 'Structured error responses (JSON), rate limit headers via middleware, request IDs auto-generated.', traditional: 'HTML 500 pages. No rate limit headers. No request tracing.' },
]

const comparisonRows = [
  { aspect: 'TLS Setup', serverless: 'Zero config — automatic on deploy', traditional: 'Manual — install cert, configure server, renew quarterly' },
  { aspect: 'Cold Start', serverless: '0-100ms (edge functions)', traditional: 'N/A but TTFB 800ms-2000ms' },
  { aspect: 'Global Distribution', serverless: 'Automatic — deployed to 100+ edge locations', traditional: 'Single server in one data center' },
  { aspect: 'Error Responses', serverless: 'JSON by default with status codes', traditional: 'HTML error pages (Apache/Nginx defaults)' },
  { aspect: 'Auto-scaling', serverless: 'Automatic — handles 0 to 10K requests seamlessly', traditional: 'Manual — server crashes under load' },
  { aspect: 'Health Endpoint', serverless: 'Easy to add as a single route', traditional: 'Requires custom config and monitoring setup' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do serverless platforms score higher on agent readiness?',
    answer:
      'Agent readiness scoring weights security (TLS), reliability (latency, uptime), and structured responses heavily — these three dimensions account for 35% of the total score. Serverless platforms provide all three by default: automatic HTTPS, sub-100ms response times with global CDN, and framework defaults that return JSON instead of HTML. A fresh Vercel deployment with zero custom configuration already passes three major scoring dimensions that traditional hosting fails.',
  },
  {
    question: 'Does serverless automatically make my API agent-ready?',
    answer:
      'No. Serverless gives you a strong foundation — typically scoring 30-40 points out of 100 on infrastructure alone. But agent readiness also requires API documentation (OpenAPI spec), discovery files (agent-card.json, llms.txt), structured data formats, authentication mechanisms, and agent-specific features. Serverless handles the infrastructure floor; you still need to build the agent-facing layer on top. The difference is that you start at 30-40 instead of 8-15.',
  },
  {
    question: 'Which serverless platform is best for agent readiness?',
    answer:
      'Vercel Edge Functions score slightly highest because of their tight integration with Next.js, which provides structured routing, middleware for rate limiting and auth, and JSON API responses by default. Cloudflare Workers are a close second with the lowest cold starts (0ms via V8 isolates) and the largest edge network. AWS Lambda@Edge is the most configurable but requires more setup for agent-ready defaults. All three are dramatically better than traditional hosting.',
  },
  {
    question: 'What about traditional cloud hosting like EC2 or DigitalOcean?',
    answer:
      'Traditional cloud VMs (EC2, DigitalOcean droplets, Linode) sit between serverless and shared hosting. They can be configured for agent readiness, but nothing comes by default — you need to set up TLS (Certbot), CDN (Cloudflare), health checks, structured errors, and auto-scaling manually. With proper configuration, a VPS can score as high as serverless. The risk is that most deployments skip these steps, leaving the default score in the 15-25 range.',
  },
  {
    question: 'Can I host an MCP server on serverless?',
    answer:
      'Yes, and it is ideal. MCP servers using SSE (Server-Sent Events) transport work well on serverless platforms that support streaming responses — Vercel Edge Functions, Cloudflare Workers, and AWS Lambda with response streaming all support this. The stateless nature of MCP tool calls maps perfectly to serverless invocations. AgentHermes hosts MCP servers on edge infrastructure for exactly this reason.',
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

export default function ServerlessEdgeAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Serverless and Edge Functions: Why Vercel, Cloudflare Workers, and AWS Lambda Are Agent-Ready by Design',
    description:
      'Serverless platforms score higher on agent readiness because they deliver sub-100ms latency, automatic HTTPS, built-in CDN, and structured error responses by default.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/serverless-edge-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'serverless edge functions agent readiness, Vercel Edge Functions, Cloudflare Workers, AWS Lambda, agent readiness infrastructure',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Serverless Edge Agent Readiness',
          item: 'https://agenthermes.ai/blog/serverless-edge-agent-readiness',
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
      title="Serverless and Edge Functions: Why Vercel, Cloudflare Workers, and AWS Lambda Are Agent-Ready by Design"
      shareUrl="https://agenthermes.ai/blog/serverless-edge-agent-readiness"
      currentHref="/blog/serverless-edge-agent-readiness"
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
            <span className="text-zinc-400">Serverless Edge Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <CloudCog className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Infrastructure
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Serverless and Edge Functions:{' '}
            <span className="text-emerald-400">Agent-Ready by Design</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Not all hosting is created equal in the agent economy. Serverless platforms like{' '}
            <strong className="text-zinc-100">Vercel Edge Functions</strong>,{' '}
            <strong className="text-zinc-100">Cloudflare Workers</strong>, and{' '}
            <strong className="text-zinc-100">AWS Lambda@Edge</strong>{' '}
            score dramatically higher on agent readiness because they deliver sub-100ms latency, automatic HTTPS,
            built-in CDN, and structured error responses <em>by default</em>. The infrastructure choice IS
            the agent readiness choice. Traditional shared hosting is a score penalty.
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

      {/* ===== THE THESIS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-500" />
            Infrastructure Is the Foundation of Agent Readiness
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When we scan businesses for agent readiness, the scoring formula weights three infrastructure
              dimensions at a combined <strong className="text-zinc-100">35% of the total score</strong>:
              D7 Security (TLS, 12%), D8 Reliability and Latency (13%), and D1 Discovery including CDN
              detection (12%). These are not application-level features — they are infrastructure decisions.
            </p>
            <p>
              Serverless and edge platforms provide all three by default. A fresh deployment on Vercel with
              zero custom configuration already has automatic HTTPS, global CDN distribution, and sub-100ms
              response times. That is roughly 30-40 points earned before writing a single line of API code.
            </p>
            <p>
              Compare this to a traditional shared hosting provider. A typical GoDaddy or Bluehost deployment
              starts with manual TLS (often expired), no CDN, TTFB of 800ms-2000ms, and HTML error pages
              instead of structured JSON. That is 8-15 points on infrastructure alone — and the application
              code has to fight uphill from there.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '35%', label: 'of score is infrastructure', icon: Server },
              { value: '<50ms', label: 'edge function cold start', icon: Zap },
              { value: '30-40', label: 'points from defaults alone', icon: BarChart3 },
              { value: '8-15', label: 'shared hosting baseline', icon: Globe },
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

      {/* ===== PLATFORM COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Platform Comparison: Serverless vs Traditional Hosting
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We tested agent readiness defaults across four infrastructure categories. The gap between
            serverless and traditional hosting is not marginal — it is a 4-5x difference in baseline score.
          </p>

          <div className="space-y-4 mb-8">
            {platformComparison.map((platform) => {
              const colors = getColorClasses(platform.color)
              return (
                <div
                  key={platform.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <platform.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{platform.name}</h3>
                      <p className="text-xs text-zinc-500">Estimated agent readiness range: <span className={colors.text}>{platform.agentScore}/100</span></p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    <div className="p-2 rounded-lg bg-zinc-800/50">
                      <p className="text-xs text-zinc-500 mb-1">Cold Start</p>
                      <p className="text-sm text-zinc-300 font-medium">{platform.coldStart}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-800/50">
                      <p className="text-xs text-zinc-500 mb-1">TLS</p>
                      <p className="text-sm text-zinc-300 font-medium">{platform.tls}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-800/50">
                      <p className="text-xs text-zinc-500 mb-1">CDN</p>
                      <p className="text-sm text-zinc-300 font-medium">{platform.cdn}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-800/50">
                      <p className="text-xs text-zinc-500 mb-1">Error Format</p>
                      <p className="text-sm text-zinc-300 font-medium">{platform.structuredErrors}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== DIMENSION MAPPING ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-amber-500" />
            How Serverless Maps to Agent Readiness Dimensions
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Six of the nine agent readiness dimensions are directly affected by infrastructure choice.
            Here is how serverless platforms score on each compared to traditional hosting.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension (Weight)</div>
              <div className="col-span-1">Serverless/Edge</div>
              <div className="col-span-2">Traditional Hosting</div>
            </div>
            {dimensionMapping.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">
                  {row.dimension}
                  <span className="block text-xs text-zinc-500 mt-0.5">{row.weight}</span>
                </div>
                <div className="text-emerald-400 col-span-1">{row.serverless}</div>
                <div className="text-zinc-500 col-span-2">{row.traditional}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SIDE BY SIDE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Serverless vs Traditional: Side by Side
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The practical differences between serverless and traditional hosting from an agent&rsquo;s perspective.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Capability</div>
              <div>Serverless/Edge</div>
              <div>Traditional Hosting</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-emerald-400">{row.serverless}</div>
                <div className="text-zinc-500">{row.traditional}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern is clear: serverless platforms provide agent-friendly defaults that traditional
              hosting requires manual configuration to achieve. This is not about capability — a well-configured
              VPS can match serverless scores. The difference is that{' '}
              <strong className="text-zinc-100">defaults matter enormously</strong> when most deployments
              never customize them.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE SCORE PENALTY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Shared Hosting Score Penalty
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Our scoring system applies caps that make it nearly impossible for certain infrastructure
              to reach higher tiers. The most impactful:{' '}
              <strong className="text-zinc-100">no TLS caps your score at 39</strong>. This means any
              site on HTTP (not HTTPS) cannot reach Bronze tier regardless of how good its API is.
            </p>
            <p>
              Shared hosting creates multiple scoring penalties. Missing or expired TLS certificates trigger
              the 39-point cap. High latency (TTFB over 2 seconds) reduces D8 Reliability scores to near
              zero. HTML error pages instead of structured JSON eliminate D9 Agent Experience points. No CDN
              headers mean D1 Discovery misses caching and distribution sub-scores.
            </p>
            <p>
              The cumulative effect: a business on shared hosting with a perfect API implementation would still
              score 15-25 points lower than the same API on Vercel or Cloudflare. Infrastructure is not a
              tiebreaker — it is a{' '}
              <Link href="/blog/scoring-caps-explained" className="text-emerald-400 hover:text-emerald-300 underline">scoring floor and ceiling</Link>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'MCP on the edge',
                detail: 'MCP servers with SSE transport run perfectly on serverless. Stateless tool calls map to individual function invocations. AgentHermes hosts all MCP servers on edge infrastructure for exactly this reason.',
                icon: Signal,
              },
              {
                title: 'Migration is straightforward',
                detail: 'Moving from shared hosting to Vercel or Cloudflare Pages takes hours, not weeks. Most frameworks (Next.js, Nuxt, SvelteKit) deploy to serverless with zero config changes. The score jump is immediate.',
                icon: TrendingUp,
              },
              {
                title: 'Cost is comparable or lower',
                detail: 'Vercel free tier handles 100K function invocations/month. Cloudflare Workers free tier handles 100K requests/day. For most small businesses, serverless is cheaper than shared hosting while scoring 4-5x higher.',
                icon: DollarSign,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <item.icon className="h-5 w-5 text-emerald-400 mb-3" />
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
                title: 'Caching and CDN Agent Readiness',
                href: '/blog/caching-cdn-agent-readiness',
                tag: 'Technical Deep Dive',
                tagColor: 'purple',
              },
              {
                title: 'Latency Benchmarks: How Speed Affects Agent Readiness',
                href: '/blog/latency-benchmarks-agent-readiness',
                tag: 'Research',
                tagColor: 'blue',
              },
              {
                title: 'HTTP/2 and HTTP/3: Impact on Agent Readiness',
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
            How does your infrastructure score?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score in 60 seconds. See how your hosting choice
            impacts your score across all 9 dimensions — and what it takes to move up a tier.
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
