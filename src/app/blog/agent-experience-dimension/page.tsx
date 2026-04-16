import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Fingerprint,
  Gauge,
  HelpCircle,
  KeyRound,
  Link2,
  ListOrdered,
  MessageCircle,
  RefreshCcw,
  Sparkles,
  Target,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Agent Experience (D9): The Dimension That Actually Measures Agent Usability (10% Weight) | AgentHermes',
  description:
    'D9 Agent Experience carries a 10% weight in the Agent Readiness Score. Request IDs, structured errors, rate-limit headers, idempotency keys, cursor pagination — the seven signals that separate agent-pleasant APIs from stack-trace landmines.',
  keywords: [
    'agent experience D9 readiness',
    'D9 agent readiness',
    'agent experience dimension',
    'agent-friendly API design',
    'rate-limit headers agent',
    'idempotency keys agents',
    'structured errors agents',
    'request ID logging',
    'agent usability',
  ],
  openGraph: {
    title: 'Agent Experience (D9): The Dimension That Actually Measures Agent Usability',
    description:
      'D9 = 10% of your score. Seven signals — request IDs, error envelopes, rate-limit headers, idempotency, cursor pagination — separate agent-pleasant APIs from landmines.',
    url: 'https://agenthermes.ai/blog/agent-experience-dimension',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agent Experience (D9) — 10% Weight',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Experience (D9): The Dimension That Actually Measures Agent Usability',
    description:
      'Request IDs, structured errors, rate-limit headers, idempotency keys, cursor pagination. D9 = 10% of the Agent Readiness Score.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/agent-experience-dimension',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const d9Signals = [
  {
    name: 'Request IDs in Responses',
    description: 'Every response carries a unique ID (header or body) the agent can log, include in bug reports, and correlate across retries. This is the single biggest quality-of-life upgrade for agents debugging prod issues.',
    example: 'X-Request-Id: req_01HX2Y7F9P3KQ8... also included in error body',
    icon: Fingerprint,
    color: 'emerald',
  },
  {
    name: 'Structured Error Codes',
    description: 'Errors return machine-readable codes (not just HTTP status) so agents can branch on specific failures. "AUTH_TOKEN_EXPIRED" is actionable. "Unauthorized" requires guessing.',
    example: '{ "error": { "code": "RATE_LIMITED", "message": "..." } }',
    icon: AlertCircle,
    color: 'red',
  },
  {
    name: 'Consistent Response Envelopes',
    description: 'Every response wraps data the same way — success and error. Agents write one parser instead of a special case per endpoint.',
    example: '{ "data": {...}, "meta": {...} } or { "error": {...} }',
    icon: Code2,
    color: 'blue',
  },
  {
    name: 'Rate-Limit Headers',
    description: 'X-RateLimit-Remaining, X-RateLimit-Reset, and Retry-After tell agents exactly how much budget they have and when it replenishes. Without these, agents hammer until they hit a 429 wall.',
    example: 'X-RateLimit-Remaining: 47, X-RateLimit-Reset: 1713200400, Retry-After: 30',
    icon: Gauge,
    color: 'amber',
  },
  {
    name: 'Cursor-Based Pagination',
    description: 'Opaque cursors survive sorting changes and concurrent writes. Offset pagination silently duplicates or skips rows when data mutates mid-scan — exactly when agents paginate over large sets.',
    example: 'GET /items?cursor=eyJpZCI6MTIzfQ — response has next_cursor',
    icon: ListOrdered,
    color: 'purple',
  },
  {
    name: 'Idempotency Key Support',
    description: 'Agents retry on network hiccups. Idempotency keys let the server deduplicate — critical for POST /charges, POST /orders, any action that costs money or creates state.',
    example: 'Idempotency-Key: a4f8... — second POST returns first result',
    icon: KeyRound,
    color: 'cyan',
  },
  {
    name: 'OpenAPI with Realistic Examples',
    description: 'Examples in the OpenAPI spec that an agent can copy, modify, and send. Missing or placeholder examples ("foo", "example@example.com") force the agent to guess at shapes.',
    example: 'examples: { "charge_card": { "value": { "amount": 2000, ... }}}',
    icon: Sparkles,
    color: 'emerald',
  },
]

const failureToReady = [
  {
    aspect: 'A 500 error',
    fail: '<html><body><h1>500 Internal Server Error</h1>...',
    ready: '{"error":{"code":"INTERNAL","message":"...","request_id":"req_abc"}}',
  },
  {
    aspect: 'A 401 from an expired token',
    fail: '<html>Please log in</html>',
    ready: '{"error":{"code":"AUTH_TOKEN_EXPIRED","retry_after":0,"request_id":"req_xyz"}}',
  },
  {
    aspect: 'Rate limit hit',
    fail: '429 Too Many Requests (no headers, no body)',
    ready: '429 + Retry-After: 30 + {"error":{"code":"RATE_LIMITED","retry_after":30}}',
  },
  {
    aspect: 'Pagination over 10k rows',
    fail: '?page=1&page=2... silent duplicates on writes',
    ready: '?cursor=... — stable, ordered, no duplicates',
  },
  {
    aspect: 'Network hiccup on POST /orders',
    fail: 'Order created twice because retry had no idempotency',
    ready: 'Idempotency-Key ensures second POST returns first result',
  },
  {
    aspect: 'Bug report from agent',
    fail: '"Something went wrong, unclear which request"',
    ready: '"request_id req_01HX... at 14:22:01 UTC returned INTERNAL"',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is the difference between D2 API Quality and D9 Agent Experience?',
    answer:
      'D2 measures whether your API exists and is documented — OpenAPI spec, REST/JSON, auth flow, endpoint coverage. D9 measures whether your API is pleasant to use programmatically — request IDs, structured errors, rate-limit headers, idempotency, pagination quality, realistic examples. D2 is "can an agent call you" (15% weight). D9 is "will the agent keep calling you after the first failure" (10% weight). Together they are 25% of the total score.',
  },
  {
    question: 'Why do stack traces hurt the D9 score so much?',
    answer:
      'Returning HTML stack traces to API callers fails three signals at once. It breaks the consistent envelope (agents have to detect HTML mid-parse), it leaks internal details (security red flag that some scanners also ding), and it provides no structured code the agent can branch on. A simple wrapper that catches unhandled errors and returns a JSON error envelope with a request ID moves D9 up by 2-3 points on its own. Most backend frameworks let you do this in under 10 lines.',
  },
  {
    question: 'Do I need all 7 signals to get full D9 credit?',
    answer:
      'No. D9 scores roughly 1.0-1.5 points per signal out of the 10 available, so hitting 5 of 7 lands around 7-8 out of 10. The highest-leverage combo is structured errors + request IDs + rate-limit headers — those three together cover about 60% of the D9 weight because they dominate the debugging and reliability experience. Idempotency keys and cursor pagination are the tie-breakers for top-quartile scores.',
  },
  {
    question: 'Does Stripe pass D9 fully?',
    answer:
      'Essentially yes — Stripe is a near-reference implementation for D9. They return request IDs on every response (both header and body), use structured error types ("api_error", "card_error"), publish rate-limit information, accept idempotency keys on every POST, and their OpenAPI has curl examples for every endpoint. Their D9 score is close to 10/10. The cap on their overall score (68) comes from D3 and D4, not D9.',
  },
  {
    question: 'Can I improve D9 without changing my existing APIs?',
    answer:
      'Partially. You can add request IDs, rate-limit headers, and wrap errors through middleware without touching route handlers — that alone typically gets you to ~6/10 on D9. Idempotency and cursor pagination usually require per-endpoint logic because they affect business semantics (what counts as a "duplicate", what field to order by). The fastest agent-experience win is middleware: one commit, 4-5 point D9 lift.',
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

export default function AgentExperienceDimensionPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Agent Experience (D9): The Dimension That Actually Measures Agent Usability (10% Weight)',
    description:
      'D9 Agent Experience = 10% of the Agent Readiness Score. The seven signals — request IDs, structured errors, response envelopes, rate-limit headers, cursor pagination, idempotency keys, OpenAPI examples — and the middleware fix that lifts D9 by 4-5 points in one commit.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/agent-experience-dimension',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Dimensions Deep Dive',
    wordCount: 1900,
    keywords:
      'agent experience D9 readiness, agent experience dimension, rate-limit headers agent, structured errors, idempotency keys',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Agent Experience Dimension',
          item: 'https://agenthermes.ai/blog/agent-experience-dimension',
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
      title="Agent Experience (D9): The Dimension That Actually Measures Agent Usability"
      shareUrl="https://agenthermes.ai/blog/agent-experience-dimension"
      currentHref="/blog/agent-experience-dimension"
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
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400">Agent Experience Dimension</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              Dimensions Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              D9 = 10% Weight
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Agent Experience (D9):{' '}
            <span className="text-emerald-400">The Dimension That Actually Measures Agent Usability</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            D1 asks &ldquo;can agents find you.&rdquo; D2 asks &ldquo;can they call you.&rdquo; D9 asks
            the question that actually determines whether they will keep calling you:{' '}
            <strong className="text-zinc-100">is your API pleasant for an agent to use?</strong> Seven
            signals separate the top-decile APIs from the ones that return HTML stack traces.
          </p>

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

      {/* ===== WHAT D9 MEASURES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            D9 Is the &ldquo;Would a Human Developer Hate This API&rdquo; Dimension
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Most of the Agent Readiness Score measures capability. D1 checks whether agents can
              discover you. D2 checks whether your API exists. D5 checks whether an agent can pay. D7
              checks whether auth works.
            </p>
            <p>
              D9 measures something different: <strong className="text-zinc-100">quality of the agent
              developer experience</strong>. It is the dimension that overlaps most with how a senior
              engineer would evaluate a third-party API before committing to it. Good D9 is invisible —
              the agent makes a call, gets exactly what it expects, and moves on. Bad D9 is where agents
              file 3-day bug reports because no one can tell which request failed.
            </p>
            <p>
              D9 carries a <strong className="text-zinc-100">0.10 weight</strong> in the v4 scoring
              model. It is tied for fourth-highest with D6 Data Quality. Paired with D2 API Quality
              (15%) it represents 25% of the total score — the developer-experience surface of the full
              rubric.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '10%', label: 'D9 weight in v4 scoring', icon: BarChart3 },
              { value: '7', label: 'signals checked', icon: CheckCircle2 },
              { value: '3-5', label: 'pt lift from middleware fix', icon: Zap },
              { value: '500', label: 'businesses in dataset', icon: MessageCircle },
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

      {/* ===== SEVEN SIGNALS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            The Seven Signals of Agent Experience
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These are the exact signals AgentHermes checks during a D9 evaluation. Each one is weighted
            roughly equally — 1.0 to 1.5 points out of 10 — with slight bias toward the trio that
            dominate debugging experience: request IDs, structured errors, and rate-limit headers.
          </p>

          <div className="space-y-4 mb-8">
            {d9Signals.map((signal) => {
              const colors = getColorClasses(signal.color)
              return (
                <div
                  key={signal.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <signal.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{signal.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{signal.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Signal:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{signal.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FAIL VS READY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            What Bottom-Quartile APIs Return vs Top-Quartile
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Six real-world scenarios, side-by-side. The left column is what agents encounter at the 199
            bottom-quartile sites in our dataset. The right column is the top-decile response — close to
            what Stripe, Resend, and Supabase actually ship.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Scenario</div>
              <div className="text-red-400">Bottom-Quartile</div>
              <div className="text-emerald-400">Top-Decile</div>
            </div>
            {failureToReady.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500 font-mono text-xs break-words">{row.fail}</div>
                <div className="text-emerald-400 font-mono text-xs break-words">{row.ready}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE STACK TRACE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            The Stack Trace Problem — Why Bottom Sites Return HTML on 500
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The most common D9 failure pattern across the 500 scans is identical: an endpoint that
              works on the happy path returns the framework&apos;s default HTML error page on failure.
              Flask, Django, Rails, ASP.NET — every framework ships a debug page that leaks internals
              and breaks every single D9 signal at once.
            </p>
            <p>
              For an agent, this is a dead end. The response content-type is text/html. The body
              contains a stack trace. There is no request ID to include in a retry or a support ticket.
              There is no structured error code to branch on. There is no indication of whether retrying
              will help or whether the error is permanent.
            </p>
            <p>
              Worse: the stack trace often leaks sensitive implementation details — database schemas,
              file paths, library versions — which independently hurts D7 Security. One unhandled
              exception hits two dimensions at once.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mb-8">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The 20-line fix:</strong> Wrap every API route with
              middleware that catches exceptions and returns a JSON envelope with a request ID. Every
              major framework supports this. Express: one{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">app.use</code>{' '}
              call. FastAPI: one{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">@app.exception_handler</code>.
              Next.js: one try-catch in the route handler plus a shared{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">errorResponse()</code>{' '}
              helper. This single commit typically moves D9 up by 2-3 points.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CANONICAL ERROR SHAPE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <RefreshCcw className="h-5 w-5 text-emerald-500" />
            The Canonical Error Shape
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              If you adopt one pattern from this article, adopt this one. It satisfies four D9 signals
              at once — structured errors, consistent envelope, request IDs, and rate-limit handling.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 mb-8 overflow-x-auto">
            <pre className="text-xs text-zinc-300 leading-relaxed font-mono">
{`{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Retry in 30 seconds.",
    "retry_after": 30,
    "request_id": "req_01HX2Y7F9P3KQ8VN0SGZWM4R1B",
    "doc_url": "https://example.com/docs/errors#rate_limited"
  }
}`}
            </pre>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Five fields. Each serves a specific agent need:{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">code</code>{' '}
              for branching,{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">message</code>{' '}
              for logging,{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">retry_after</code>{' '}
              for scheduling,{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">request_id</code>{' '}
              for support tickets, and{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">doc_url</code>{' '}
              for the agent to fetch remediation context. This is the same shape Stripe, GitHub, and
              Linear all converged on independently. There is no bonus for innovating here.
            </p>
            <p>
              Related reading:{' '}
              <Link href="/blog/data-quality-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Data Quality and Agent Readiness (D6)
              </Link>{' '}
              covers the structural side of responses — envelope shape, null handling, JSON-LD. D6 and
              D9 together account for 20% of the full score.
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

      {/* ===== RELATED ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Continue Reading</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Data Quality and Agent Readiness: Why Structured Responses Win (D6 = 10%)',
                href: '/blog/data-quality-agent-readiness',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'OpenAPI Specs Are the Single Biggest Factor in Agent Readiness (D2 = 15%)',
                href: '/blog/openapi-agent-readiness',
                tag: 'Standards Deep Dive',
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
            See your D9 breakdown in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            AgentHermes scans every endpoint for the seven D9 signals and returns a per-signal
            pass/fail with the exact remediation path.
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
              <Link2 className="h-4 w-4" />
              Connect My Business
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
