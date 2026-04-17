import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileType,
  Globe,
  HelpCircle,
  Layers,
  Server,
  Settings,
  Shield,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Content Negotiation: Why Accept Headers Determine If AI Agents Get JSON or HTML | AgentHermes',
  description:
    'Most websites ignore the Accept header and always return HTML, even when AI agents request JSON. Content negotiation is a 5-minute middleware fix that directly impacts your D6 Data Quality score.',
  keywords: [
    'content negotiation agent readiness',
    'Accept header AI agents',
    'content negotiation Accept header agents',
    'application/json Accept header',
    'content negotiation middleware',
    'agent readiness data quality',
    'HTTP content negotiation',
    'JSON vs HTML AI agents',
    'structured data agents',
    'agent economy content type',
  ],
  openGraph: {
    title: 'Content Negotiation: Why Accept Headers Determine If AI Agents Get JSON or HTML',
    description:
      'AI agents send Accept: application/json. Most websites ignore it and return HTML. This 5-minute middleware fix impacts your D6 Data Quality score.',
    url: 'https://agenthermes.ai/blog/content-negotiation-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Content Negotiation for AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Content Negotiation for AI Agents',
    description:
      'Accept: application/json is how agents ask for structured data. Most sites ignore it. A 5-minute fix that boosts your agent readiness score.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/content-negotiation-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const acceptHeaderExamples = [
  {
    label: 'AI agent requesting structured data',
    header: 'Accept: application/json',
    expected: '{ "name": "Acme Co", "hours": "9-5", "services": [...] }',
    color: 'emerald',
  },
  {
    label: 'Browser requesting a web page',
    header: 'Accept: text/html,application/xhtml+xml',
    expected: '<!DOCTYPE html><html>...rendered page...</html>',
    color: 'blue',
  },
  {
    label: 'Agent accepting multiple formats',
    header: 'Accept: application/json, text/html;q=0.9',
    expected: 'Server should return JSON (higher priority), falling back to HTML',
    color: 'purple',
  },
]

const comparisonRows = [
  { behavior: 'Respects Accept header', good: 'Returns JSON for application/json, HTML for text/html', bad: 'Always returns HTML regardless of Accept header' },
  { behavior: 'Content-Type response header', good: 'Content-Type: application/json for JSON responses', bad: 'Content-Type: text/html even for API-like URLs' },
  { behavior: 'Structured error responses', good: '{ "error": "not_found", "message": "..." } with 404', bad: 'Pretty HTML 404 page with no machine-readable data' },
  { behavior: '406 Not Acceptable', good: 'Returns 406 when requested format is not available', bad: 'Silently returns HTML for any Accept value' },
  { behavior: 'Vary header', good: 'Vary: Accept in response (enables correct caching)', bad: 'No Vary header, CDN caches wrong format for agents' },
]

const middlewareSteps = [
  {
    step: '1',
    title: 'Read the Accept header from the incoming request',
    detail: 'Check req.headers[\'accept\'] or req.headers.get(\'accept\') depending on your framework. Parse it to determine if the client prefers JSON over HTML.',
    code: 'const acceptsJson = req.headers.get(\'accept\')?.includes(\'application/json\')',
  },
  {
    step: '2',
    title: 'Route to the appropriate response format',
    detail: 'If the client accepts JSON, respond with structured data. If they accept HTML, respond with the rendered page. If neither matches, return 406 Not Acceptable.',
    code: 'if (acceptsJson) return Response.json(structuredData)\nreturn renderHtml(page)',
  },
  {
    step: '3',
    title: 'Set the correct Content-Type and Vary headers',
    detail: 'Always set Content-Type to match the actual response body. Add Vary: Accept so CDNs and proxies cache JSON and HTML responses separately.',
    code: 'headers.set(\'Content-Type\', \'application/json\')\nheaders.set(\'Vary\', \'Accept\')',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is content negotiation in HTTP?',
    answer:
      'Content negotiation is the mechanism defined in HTTP/1.1 (RFC 7231) where the client tells the server what response formats it can handle using the Accept header, and the server responds with the best available format. For example, a browser sends Accept: text/html and gets a web page. An AI agent sends Accept: application/json and gets structured data. The same URL can serve different representations of the same resource.',
  },
  {
    question: 'How does AgentHermes check for content negotiation?',
    answer:
      'AgentHermes sends requests with Accept: application/json to key URLs on your site and checks whether the response Content-Type is application/json. This is part of the D6 Data Quality dimension (0.10 weight). Sites that return JSON for JSON requests and HTML for HTML requests score higher than sites that always return HTML regardless of the Accept header.',
  },
  {
    question: 'Does every page need to support content negotiation?',
    answer:
      'No. Focus on pages that represent structured resources: your homepage (business info), services page, pricing page, product listings, and any API-like URLs. Blog posts and marketing pages can remain HTML-only. The key is that pages AI agents would query for actionable data should respond with JSON when asked.',
  },
  {
    question: 'What about GraphQL or dedicated API endpoints?',
    answer:
      'If you already have a dedicated API at /api/* that returns JSON, content negotiation on your main pages is a bonus rather than a requirement. But many businesses have no API at all — their website IS their only digital presence. For these businesses, content negotiation on existing pages is the fastest path to structured data without building a separate API.',
  },
  {
    question: 'Will content negotiation break my website for human visitors?',
    answer:
      'No. Browsers send Accept: text/html, so they will continue getting the HTML version exactly as before. Content negotiation only changes the response for clients that explicitly request a different format. Your website looks and works exactly the same for every human visitor.',
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

export default function ContentNegotiationAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Content Negotiation: Why Accept Headers Determine If AI Agents Get JSON or HTML',
    description:
      'Most websites ignore the Accept header and always return HTML. Content negotiation via Accept: application/json is how AI agents signal they want structured data. A 5-minute middleware fix.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/content-negotiation-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1800,
    keywords:
      'content negotiation Accept header agents, HTTP content negotiation, agent readiness data quality, JSON vs HTML agents',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Content Negotiation for AI Agents',
          item: 'https://agenthermes.ai/blog/content-negotiation-agent-readiness',
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
      title="Content Negotiation: Why Accept Headers Determine If AI Agents Get JSON or HTML"
      shareUrl="https://agenthermes.ai/blog/content-negotiation-agent-readiness"
      currentHref="/blog/content-negotiation-agent-readiness"
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
            <span className="text-zinc-400">Content Negotiation</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <FileType className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              5-Minute Fix
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Content Negotiation:{' '}
            <span className="text-emerald-400">Why Accept Headers Determine If AI Agents Get JSON or HTML</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            When an AI agent visits your website, it sends{' '}
            <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-base">
              Accept: application/json
            </code>
            . Most websites ignore this header entirely and return HTML anyway. The agent gets a sea of
            tags, scripts, and stylesheets instead of the structured data it needs. This is a{' '}
            <strong className="text-zinc-100">5-minute middleware fix</strong> that directly impacts your
            D6 Data Quality score.
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

      {/* ===== HOW THE ACCEPT HEADER WORKS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            How the Accept Header Works
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Every HTTP request includes headers that tell the server about the client. The{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">Accept</code>{' '}
              header is the client saying: <em className="text-zinc-200">&ldquo;here are the formats I
              can understand, in order of preference.&rdquo;</em>
            </p>
            <p>
              A web browser sends{' '}
              <code className="text-blue-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                Accept: text/html
              </code>{' '}
              because it renders HTML pages. An AI agent sends{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                Accept: application/json
              </code>{' '}
              because it processes structured data. The server is supposed to check this header and respond
              with the appropriate format. This mechanism is called{' '}
              <strong className="text-zinc-100">content negotiation</strong>, defined in RFC 7231.
            </p>
            <p>
              The problem is that most web servers and frameworks are configured to return HTML for every
              request, regardless of what the client asks for. They treat the Accept header as decoration.
              For human visitors, this is fine — browsers handle HTML. For AI agents, it is a dead end.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {acceptHeaderExamples.map((example) => {
              const colors = getColorClasses(example.color)
              return (
                <div
                  key={example.label}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <p className="text-sm font-medium text-zinc-400 mb-2">{example.label}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 mb-3">
                    <code className={`${colors.text} text-sm font-mono`}>{example.header}</code>
                  </div>
                  <p className="text-xs text-zinc-500">
                    <span className="text-zinc-400 font-medium">Expected response:</span>{' '}
                    <code className="text-zinc-400 text-xs">{example.expected}</code>
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY THIS MATTERS FOR SCORING ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-amber-500" />
            Impact on Your Agent Readiness Score
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes checks for content negotiation as part of{' '}
              <Link href="/blog/data-quality-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                D6 Data Quality
              </Link>{' '}
              (0.10 weight). When our scanner sends a request with{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                Accept: application/json
              </code>
              , it checks three things:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                check: 'Does the response Content-Type match the request?',
                detail: 'If you asked for JSON and got JSON, the server respects content negotiation. If you got HTML with Content-Type: text/html, the server ignores the Accept header.',
                icon: CheckCircle2,
                color: 'emerald',
              },
              {
                check: 'Is the JSON response actually structured?',
                detail: 'Returning Content-Type: application/json with an HTML body inside is worse than returning text/html. AgentHermes validates that the response body parses as valid JSON.',
                icon: Code2,
                color: 'blue',
              },
              {
                check: 'Does the response include a Vary: Accept header?',
                detail: 'The Vary header tells caches (CDNs, proxies) that the response varies based on the Accept header. Without it, a CDN might cache the HTML version and serve it to every agent that requests JSON.',
                icon: Shield,
                color: 'purple',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.check}
                  className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                    <item.icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.check}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">Combined impact:</strong> Content negotiation affects D6
              Data Quality (0.10) directly. It also contributes to{' '}
              <Link href="/blog/cors-headers-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                proper header behavior
              </Link>{' '}
              which overlaps with D9 Agent Experience (0.10). Together, these two dimensions account for 20%
              of your total Agent Readiness Score. A site that returns HTML for every request regardless of
              headers is signaling to agents: <em>&ldquo;I was not built with you in mind.&rdquo;</em>
            </p>
          </div>
        </div>
      </section>

      {/* ===== GOOD VS BAD PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5 text-emerald-500" />
            Good vs Bad Content Negotiation Patterns
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Here is what agent-ready content negotiation looks like compared to the anti-patterns
            AgentHermes flags during scans.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Behavior</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Agent-Ready</div>
              <div className="flex items-center gap-1.5"><XCircle className="h-3.5 w-3.5 text-red-400" /> Anti-Pattern</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.behavior}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.behavior}</div>
                <div className="text-emerald-400">{row.good}</div>
                <div className="text-red-400">{row.bad}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The most common anti-pattern is the simplest: ignoring the Accept header entirely. The web
              server returns the same HTML page no matter what format the client requests. This is the
              default behavior of most static site generators, WordPress installations, and even some
              modern frameworks when not explicitly configured for content negotiation.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE 5-MINUTE FIX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-500" />
            The 5-Minute Middleware Fix
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Adding content negotiation is a three-step middleware change. Here is how to implement it
            in any framework.
          </p>

          <div className="space-y-3 mb-8">
            {middlewareSteps.map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed mb-3">{item.detail}</p>
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <pre className="text-xs text-emerald-400 font-mono whitespace-pre-wrap">{item.code}</pre>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              For the JSON response, extract the structured data that already exists on your page:
              business name, hours, services, pricing, contact information. You do not need to build a
              full API — just return a JSON representation of the data that is already in your HTML.
            </p>
            <p>
              This approach pairs well with{' '}
              <Link href="/blog/error-handling-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                structured error handling
              </Link>
              . If an agent requests JSON from a URL that does not exist, return a JSON 404 response
              instead of an HTML error page. The combination of content negotiation and structured errors
              makes your entire site more agent-accessible.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Framework-specific notes:</strong> Next.js API routes
              return JSON by default — no middleware needed for /api/* paths. For page routes, use
              middleware.ts to check the Accept header. Express has the{' '}
              <code className="text-emerald-400 text-xs">res.format()</code> method built in. Django has
              content negotiation via DRF. Rails has{' '}
              <code className="text-emerald-400 text-xs">respond_to</code>. The mechanism exists in every
              major framework — it just needs to be turned on.
            </p>
          </div>
        </div>
      </section>

      {/* ===== REAL-WORLD EXAMPLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-amber-500" />
            What We See in 500+ Scans
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Across 500+ business scans, AgentHermes data shows a clear pattern: businesses that score
              above 60 (Silver tier) almost always handle the Accept header correctly on their API
              endpoints. Businesses below 40 (Bronze and below) almost never do. The correlation is not
              causation — better-engineered APIs tend to get content negotiation right alongside everything
              else — but it is a strong signal of overall API maturity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'API-first companies',
                detail: 'Stripe, Resend, Supabase — all return JSON for Accept: application/json. Their APIs are designed for machines first, humans second.',
                score: '60+ Silver',
                color: 'emerald',
              },
              {
                title: 'Hybrid companies',
                detail: 'Shopify returns JSON on /products.json but HTML on main pages. Partial content negotiation. Better than nothing but inconsistent.',
                score: '40-59 Bronze',
                color: 'amber',
              },
              {
                title: 'Website-only businesses',
                detail: 'Local businesses, restaurants, clinics — always return HTML. No Accept header handling whatsoever. Agents get raw markup.',
                score: '<40 Not Scored',
                color: 'red',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mb-3`}>
                    {item.score}
                  </span>
                  <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
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
                title: 'Data Quality and Agent Readiness: D6 Deep Dive',
                href: '/blog/data-quality-agent-readiness',
                tag: 'Dimensions',
                tagColor: 'blue',
              },
              {
                title: 'CORS Headers and Agent Readiness',
                href: '/blog/cors-headers-agent-readiness',
                tag: 'Technical Deep Dive',
                tagColor: 'purple',
              },
              {
                title: 'Error Handling for AI Agents',
                href: '/blog/error-handling-agent-readiness',
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
            Does your site handle the Accept header?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see how your site handles content negotiation
            and 40+ other agent-readiness signals across 9 dimensions.
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
