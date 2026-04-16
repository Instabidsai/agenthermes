import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  Server,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Data Quality and Agent Readiness: Why Structured Responses Win (D6 = 10%) | AgentHermes',
  description:
    'D6 Data Quality carries 10% of your Agent Readiness Score. Most businesses return HTML errors to agents. Learn why structured JSON responses, consistent envelopes, and JSON-LD schema markup separate Silver-tier companies from the invisible majority.',
  keywords: [
    'data quality agent readiness',
    'structured data AI agents',
    'JSON-LD agent readiness',
    'API response format agents',
    'data quality scoring',
    'agent readiness D6',
    'structured error responses',
    'JSON envelope pattern',
    'agent economy data',
  ],
  openGraph: {
    title: 'Data Quality and Agent Readiness: Why Structured Responses Win (D6 = 10%)',
    description:
      'D6 Data Quality carries 10% of your Agent Readiness Score. Learn why structured JSON responses separate Silver-tier companies from the invisible majority.',
    url: 'https://agenthermes.ai/blog/data-quality-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Data Quality and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Quality and Agent Readiness: Why Structured Responses Win (D6 = 10%)',
    description:
      'Most businesses return HTML errors to AI agents. Structured JSON envelopes are the difference between Silver and invisible.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/data-quality-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const responseFormats = [
  {
    name: 'HTML Error Page',
    description: 'Returns a full HTML page with a styled 404 template. Agents cannot parse the error type, reason, or whether the resource exists elsewhere. This is the most common response from the 199 businesses scoring below Bronze.',
    example: '<html><body><h1>404 Not Found</h1><p>The page you are looking for...</p></body></html>',
    score: 'D6: 0-5 pts',
    icon: AlertTriangle,
    color: 'red',
  },
  {
    name: 'Unstructured JSON',
    description: 'Returns JSON but without consistent keys or error codes. Agents can detect it is JSON, but every endpoint uses different field names. One returns "msg", another "message", a third "error_description". Agents need consistency across all endpoints.',
    example: '{"msg":"not found"}',
    score: 'D6: 15-30 pts',
    icon: Code2,
    color: 'amber',
  },
  {
    name: 'Structured JSON Envelope',
    description: 'Returns consistent JSON with error codes, human-readable messages, and request tracing. Every endpoint follows the same envelope shape. Agents learn the pattern once and can handle any response from any endpoint predictably.',
    example: '{"error":"Not found","code":"NOT_FOUND","request_id":"req_abc123"}',
    score: 'D6: 70-100 pts',
    icon: CheckCircle2,
    color: 'emerald',
  },
]

const d6Checks = [
  { check: 'JSON-LD schema markup on pages', weight: 'High', impact: 'Agents extract structured business data from markup — Organization, Product, Offer, Service.' },
  { check: 'Consistent error response format', weight: 'High', impact: 'All API endpoints return the same JSON shape for errors. Agents handle failures without guessing.' },
  { check: 'Typed response schemas', weight: 'Medium', impact: 'OpenAPI response schemas or JSON Schema definitions that tell agents what fields to expect.' },
  { check: 'Request ID in responses', weight: 'Medium', impact: 'Traceability for debugging. Agents can report "request req_abc123 failed" instead of "something broke."' },
  { check: 'Content-Type headers', weight: 'High', impact: 'Correct application/json headers. Some businesses serve JSON with text/html headers — agents misparse it.' },
  { check: 'Pagination metadata', weight: 'Low', impact: 'Total count, next page cursor, has_more flag. Without these, agents cannot enumerate collections reliably.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is D6 Data Quality in the Agent Readiness Score?',
    answer:
      'D6 Data Quality is one of 9 dimensions in the Agent Readiness Score, carrying a weight of 0.10 (10%). It measures whether your business returns structured, consistent, machine-readable data that AI agents can reliably parse and act on. This includes JSON-LD schema markup, consistent API response envelopes, proper Content-Type headers, and typed error responses.',
  },
  {
    question: 'Why do HTML error pages hurt my score?',
    answer:
      'When an AI agent sends a request and receives an HTML error page, it cannot programmatically determine what went wrong. Was the resource not found? Did the request fail authentication? Is the service down? An HTML page designed for human eyes is opaque to agents. A structured JSON error with a code field like NOT_FOUND or UNAUTHORIZED lets the agent handle the failure and try a different approach automatically.',
  },
  {
    question: 'What is a JSON envelope pattern?',
    answer:
      'A JSON envelope is a consistent response wrapper used across all API endpoints. Every successful response uses the same top-level shape (e.g., { "data": ..., "meta": ... }) and every error uses the same error shape (e.g., { "error": "message", "code": "ERROR_CODE", "request_id": "..." }). Agents learn the envelope once and can parse any response from any endpoint without per-endpoint logic.',
  },
  {
    question: 'How does JSON-LD schema markup help AI agents?',
    answer:
      'JSON-LD (JavaScript Object Notation for Linked Data) embeds structured data into HTML pages using schema.org vocabulary. When an agent visits your website, it can extract Organization info, Product details, pricing via Offer markup, business hours, and service descriptions — all in a machine-readable format. This is the same markup that powers Google rich results, but AI agents use it for deeper understanding than search engines do.',
  },
  {
    question: 'What is the fastest way to improve my D6 score?',
    answer:
      'Three changes with the highest impact: (1) Add JSON-LD Organization and Product/Service schema markup to your homepage — this takes 30 minutes with a template. (2) Ensure all API endpoints return JSON with consistent error codes instead of HTML error pages. (3) Set correct Content-Type: application/json headers on all API responses. These three changes can move D6 from 10 to 60+ in an afternoon.',
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

export default function DataQualityAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Data Quality and Agent Readiness: Why Structured Responses Win (D6 = 10%)',
    description:
      'D6 Data Quality carries 10% of your Agent Readiness Score. Most businesses return HTML errors to agents. Learn why structured JSON responses, consistent envelopes, and JSON-LD schema markup separate Silver-tier companies from the invisible majority.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/data-quality-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Dimensions Deep Dive',
    wordCount: 1800,
    keywords:
      'data quality agent readiness, structured data AI agents, JSON-LD agent readiness, API response format, D6 data quality',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Data Quality and Agent Readiness',
          item: 'https://agenthermes.ai/blog/data-quality-agent-readiness',
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
      title="Data Quality and Agent Readiness: Why Structured Responses Win (D6 = 10%)"
      shareUrl="https://agenthermes.ai/blog/data-quality-agent-readiness"
      currentHref="/blog/data-quality-agent-readiness"
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
            <span className="text-zinc-400">Data Quality and Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Database className="h-3.5 w-3.5" />
              Dimensions Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              D6 = 10% Weight
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Data Quality and Agent Readiness:{' '}
            <span className="text-emerald-400">Why Structured Responses Win</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            When an AI agent calls your API and gets back an HTML error page, the interaction is over.
            The agent cannot parse it, cannot retry intelligently, and cannot tell its user what went wrong.
            <strong className="text-zinc-100"> D6 Data Quality</strong> measures whether your business
            speaks the language agents understand — structured, typed, consistent JSON.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            The Problem: Agents Cannot Read Your Error Pages
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Humans see a 404 page and understand what happened. The page has a friendly message,
              maybe a search bar, maybe a link back to the homepage. AI agents see the same page and
              get a wall of HTML tags, CSS classes, and JavaScript. They cannot extract the one piece
              of information they need: <strong className="text-zinc-100">what went wrong and what
              to do next</strong>.
            </p>
            <p>
              After scanning 500 businesses, we found that the majority return HTML error responses
              on their API-like endpoints. Of the 199 businesses scoring below Bronze (under 40), over
              80% serve HTML on error paths. Among the 52 Silver-tier businesses (60-74), every single
              one returns structured JSON errors with consistent codes.
            </p>
            <p>
              The pattern is unmistakable: <strong className="text-zinc-100">data quality is a
              reliable predictor of overall agent readiness</strong>. If a business returns structured
              data, it almost certainly has the other fundamentals right too — because structured
              responses require the same engineering discipline as good APIs, proper auth, and
              reliable infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '10%', label: 'D6 weight in score', icon: BarChart3 },
              { value: '80%+', label: 'below-Bronze serve HTML errors', icon: AlertTriangle },
              { value: '100%', label: 'Silver-tier use JSON envelopes', icon: CheckCircle2 },
              { value: '0/500', label: 'have agent-optimized schemas', icon: Database },
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

      {/* ===== THE THREE RESPONSE TIERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Three Tiers of Response Quality
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Not all data quality failures are equal. We see three distinct tiers when agents interact
              with business endpoints. Each tier produces dramatically different agent behavior — from
              complete failure to seamless automation.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {responseFormats.map((format) => {
              const colors = getColorClasses(format.color)
              return (
                <div
                  key={format.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <format.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{format.name}</h3>
                      <span className={`text-xs font-medium ${colors.text}`}>{format.score}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{format.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Response:</span>{' '}
                      <code className={`${colors.text} text-xs break-all`}>{format.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The structured JSON envelope is the gold standard. When an agent receives{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                {`{"error":"Not found","code":"NOT_FOUND","request_id":"req_abc123"}`}
              </code>{' '}
              it knows exactly what happened, can log the request ID for debugging, and can branch
              its logic based on the error code. A <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">NOT_FOUND</code> might
              trigger a search fallback. An <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">UNAUTHORIZED</code> triggers
              a re-authentication flow. An HTML page triggers nothing but confusion.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT D6 MEASURES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            What D6 Data Quality Actually Measures
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The AgentHermes scanner checks six aspects of data quality. Each contributes to the
            D6 sub-score, which carries a 0.10 weight in the overall Agent Readiness Score.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Check</div>
              <div>Weight</div>
              <div>Why It Matters</div>
            </div>
            {d6Checks.map((row, i) => (
              <div
                key={row.check}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.check}</div>
                <div className={row.weight === 'High' ? 'text-emerald-400' : row.weight === 'Medium' ? 'text-amber-400' : 'text-zinc-500'}>{row.weight}</div>
                <div className="text-zinc-500">{row.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== JSON-LD AND SCHEMA.ORG ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <FileJson className="h-5 w-5 text-emerald-500" />
            JSON-LD: The Bridge Between SEO and Agent Readiness
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              JSON-LD schema markup is the highest-leverage D6 improvement most businesses can make.
              It is the same structured data that powers Google rich results, but AI agents extract
              far more from it than search engines do. When an agent visits your homepage and finds
              Organization markup, it immediately knows your business name, address, hours, contact
              info, and social profiles — without scraping a single HTML element.
            </p>
            <p>
              The{' '}
              <Link href="/blog/openapi-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                OpenAPI specification
              </Link>{' '}
              tells agents what your API can do. JSON-LD tells agents what your business is. Together,
              they give an agent the complete picture: identity plus capability.
            </p>
            <p>
              Of the 500 businesses we scanned, fewer than 15% have any JSON-LD markup at all. Among
              those that do, the most common types are Organization and LocalBusiness. Product and
              Offer markup — the types that actually let agents read pricing and availability — appear
              on fewer than 5% of all businesses scanned.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mb-8">
            <p className="text-sm font-bold text-emerald-400 mb-2">The Agent-Readable Minimum</p>
            <p className="text-sm text-zinc-300 leading-relaxed">
              At minimum, every business should have JSON-LD Organization markup on the homepage with
              name, url, logo, contactPoint, and sameAs (social links). Service businesses should add
              Service markup with serviceType, provider, and areaServed. E-commerce should add Product
              and Offer with price, priceCurrency, and availability. This is the structured data floor
              that separates &ldquo;agent-visible&rdquo; from &ldquo;agent-invisible.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE ENVELOPE PATTERN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-blue-500" />
            The Envelope Pattern: One Shape for Every Response
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The top scorers in our dataset all follow what we call the <strong className="text-zinc-100">envelope
              pattern</strong>. Every successful response wraps data in a consistent outer shape.
              Every error uses the same error shape. The agent learns the pattern once and can parse
              any endpoint without custom logic.
            </p>
            <p>
              Here is what the pattern looks like in practice. Resend (the only Gold-tier business at
              75) uses it. Stripe (Silver, 68) uses it. Vercel (Silver, 70) uses it. Every company in
              our top 30 uses some variation of it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-emerald-500/20">
              <h3 className="text-sm font-bold text-emerald-400 mb-3">Success Envelope</h3>
              <pre className="text-xs text-zinc-400 leading-relaxed overflow-x-auto">
{`{
  "data": { ... },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2026-04-15T...",
    "pagination": {
      "total": 142,
      "has_more": true,
      "cursor": "cur_xyz"
    }
  }
}`}
              </pre>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-red-500/20">
              <h3 className="text-sm font-bold text-red-400 mb-3">Error Envelope</h3>
              <pre className="text-xs text-zinc-400 leading-relaxed overflow-x-auto">
{`{
  "error": "Resource not found",
  "code": "NOT_FOUND",
  "request_id": "req_abc123",
  "details": {
    "resource": "product",
    "id": "prod_missing"
  }
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The key principle is <strong className="text-zinc-100">one envelope, every endpoint</strong>.
              When an agent interacts with 20 different endpoints on your API, it should never need to
              guess the response shape. The same top-level keys appear everywhere. The same error code
              vocabulary is shared across all endpoints. The <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">request_id</code> field
              appears in every response so the agent can reference specific interactions when reporting
              issues or debugging failures.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO IMPROVE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            How to Improve Your D6 Score
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Four changes ordered by impact. The first two can be done in an afternoon.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Add JSON-LD Organization markup to your homepage',
                detail: 'Include name, url, logo, contactPoint, address, and sameAs. This is a single <script type="application/ld+json"> tag. Copy a template, fill in your details, paste it into your page head. 30 minutes, biggest single D6 improvement.',
                icon: Globe,
              },
              {
                step: '2',
                title: 'Replace HTML error pages with JSON on API routes',
                detail: 'Every route that an agent might call should return JSON errors with a code field. Most frameworks have error middleware that catches unhandled errors and formats them. Express: app.use(errorHandler). Next.js: middleware.ts. Django: custom exception handler.',
                icon: Code2,
              },
              {
                step: '3',
                title: 'Standardize your response envelope',
                detail: 'Pick one shape for success (data + meta) and one for errors (error + code + request_id). Document it in your OpenAPI spec. Enforce it with middleware so no endpoint can return a raw, unwrapped response.',
                icon: Layers,
              },
              {
                step: '4',
                title: 'Add Product and Offer markup for pricing',
                detail: 'If you sell products or services, Product + Offer schema markup lets agents read your pricing without hitting an API. Include name, description, price, priceCurrency, and availability. This lifts both D6 Data Quality and D4 Pricing.',
                icon: TrendingUp,
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
        </div>
      </section>

      {/* ===== REAL EXAMPLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-500" />
            Data Quality in Practice: Gold vs Below-Bronze
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Resend (Gold, 75)',
                detail: 'Every API endpoint returns JSON with consistent error codes. Error responses include a machine-readable code, human message, and request ID. JSON-LD Organization markup on the marketing site. Full OpenAPI spec with typed response schemas for every endpoint.',
              },
              {
                title: 'Stripe (Silver, 68)',
                detail: 'Industry-standard error envelope with type, code, message, and param fields. Every error is documented in the API reference with the exact JSON shape. Consistent pagination with has_more and cursor. Content-Type headers always correct.',
              },
              {
                title: 'Typical Local Business (12-25)',
                detail: 'No JSON-LD markup. Contact page is a form, not structured data. 404 page returns the full website HTML template. No API endpoints at all. Business hours embedded in a footer div, not machine-readable. Agents extract nothing.',
              },
              {
                title: 'Typical SaaS (35-50)',
                detail: 'Has an API but error responses mix formats. Some endpoints return JSON errors, others return HTML. No consistent error codes — "invalid" on one endpoint, "bad_request" on another. No request IDs. Partial JSON-LD (Organization only, no Product).',
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
              The gap between Gold/Silver and below-Bronze is not about having advanced AI features.
              It is about engineering fundamentals. Consistent response formats, proper headers,
              machine-readable markup. These are the same things that make APIs pleasant for human
              developers — agents just require them to function at all. A human developer can read
              an HTML error page and figure it out. An agent cannot.
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
                title: 'OpenAPI Specs Are the Single Biggest Factor in Agent Readiness',
                href: '/blog/openapi-agent-readiness',
                tag: 'Standards Deep Dive',
                tagColor: 'emerald',
              },
              {
                title: 'Schema.org Markup for Agent Readiness',
                href: '/blog/schema-markup-agent-readiness',
                tag: 'Standards Guide',
                tagColor: 'emerald',
              },
              {
                title: 'How to Improve Your Agent Readiness Score',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
                tagColor: 'green',
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
            See your D6 Data Quality score
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness audit to see how your data quality stacks up across
            all 9 dimensions. Find out if agents can read your responses — or if they are
            hitting a wall of HTML.
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
              href="/methodology"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              See Full Methodology
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
