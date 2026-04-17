import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Gauge,
  HelpCircle,
  Layers,
  Repeat,
  Server,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Idempotency Keys: Why AI Agents Need Safe Retries | AgentHermes',
  description:
    'AI agents retry on failure. Without idempotency keys, retries cause duplicate charges, duplicate orders, and corrupted state. Learn what idempotency means for agent readiness, the 3 patterns every API should implement, and what AgentHermes checks in D9.',
  keywords: [
    'idempotency keys AI agents',
    'idempotent API',
    'agent retry safety',
    'duplicate request prevention',
    'Idempotency-Key header',
    'agent readiness idempotency',
    'API idempotency best practices',
    'safe retries AI',
  ],
  openGraph: {
    title: 'Idempotency Keys: Why AI Agents Need Safe Retries',
    description:
      'Agents retry on failure. Without idempotency, retries cause duplicate charges and orders. The 3 patterns every agent-ready API needs.',
    url: 'https://agenthermes.ai/blog/idempotency-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Idempotency Keys: Why AI Agents Need Safe Retries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Idempotency Keys: Why AI Agents Need Safe Retries',
    description:
      'Agents retry on failure. Without idempotency keys, every retry is a duplicate charge. Here is what your API needs.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/idempotency-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const idempotencyPatterns = [
  {
    name: 'Key-Based (Stripe Pattern)',
    description:
      'The client sends an Idempotency-Key header with every mutating request. The server stores the response mapped to that key. If the same key arrives again, the server returns the stored response without re-executing. Stripe pioneered this and it is the gold standard.',
    example: 'POST /v1/charges with Idempotency-Key: abc-123 returns the same charge object on every retry',
    icon: Shield,
    color: 'emerald',
  },
  {
    name: 'Natural Idempotency (GET, DELETE, PUT)',
    description:
      'Some HTTP methods are idempotent by definition. GET never changes state. DELETE of the same resource returns 204 or 404. PUT replaces the full resource, so calling it twice produces the same result. Agents can safely retry these without special headers.',
    example: 'DELETE /v1/customers/cus_123 returns 200 the first time, 404 on retries — both safe',
    icon: Layers,
    color: 'blue',
  },
  {
    name: 'Conditional (ETag / If-Match)',
    description:
      'The server returns an ETag with each response. The client sends If-Match with the ETag on updates. If the resource changed between retries, the server returns 412 Precondition Failed instead of applying a stale update. This prevents lost-update bugs in concurrent agent scenarios.',
    example: 'PUT /v1/orders/ord_456 with If-Match: "v3" fails with 412 if order was already modified',
    icon: Gauge,
    color: 'purple',
  },
]

const failureModes = [
  {
    scenario: 'Agent creates a payment',
    without: 'Network timeout on response. Agent retries. Customer charged twice.',
    with: 'Same Idempotency-Key on retry. Server returns original charge. Customer charged once.',
  },
  {
    scenario: 'Agent books an appointment',
    without: 'Server returns 500 mid-transaction. Agent retries. Two appointments booked for same slot.',
    with: 'Duplicate detection returns 409 Conflict with original booking ID. One appointment.',
  },
  {
    scenario: 'Agent submits an order',
    without: 'Load balancer drops connection. Agent retries. Two identical orders in the system.',
    with: 'Idempotency key matches. Server returns original order. Inventory correct.',
  },
  {
    scenario: 'Agent updates inventory count',
    without: 'Concurrent update from another agent. Both decrements applied. Stock goes negative.',
    with: 'If-Match ETag check. Second update returns 412. Agent re-reads, re-calculates, retries safely.',
  },
]

const d9Checks = [
  {
    signal: 'Idempotency-Key header support',
    weight: '0.10 in D9',
    what: 'Does the API accept and honor an Idempotency-Key header on POST/PATCH requests? AgentHermes sends a test request with the header and checks if the response includes idempotency metadata.',
  },
  {
    signal: 'Duplicate request detection',
    weight: '0.10 in D9',
    what: 'Does the API detect and reject duplicate submissions? AgentHermes looks for 409 Conflict responses, duplicate-detection error codes, or idempotency-key-already-used error messages in the API documentation.',
  },
  {
    signal: '409 Conflict for duplicates',
    weight: 'Impacts D8 Reliability',
    what: 'When a duplicate mutating request arrives, does the server return 409 with a structured JSON body pointing to the original resource? Or does it silently create a duplicate? The former is agent-safe. The latter is dangerous.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is an idempotency key?',
    answer:
      'An idempotency key is a unique string that a client attaches to a request. The server uses this key to recognize retries of the same operation. If it sees the same key twice, it returns the original response instead of executing the operation again. This prevents duplicate side effects like double charges or duplicate orders.',
  },
  {
    question: 'Why do AI agents need idempotency more than human users?',
    answer:
      'Human users see a loading spinner and wait. If something fails, they check their email or account page before retrying. AI agents have no visual feedback — they see a timeout or error code and immediately retry, often within milliseconds. Without idempotency, that automatic retry creates a duplicate transaction every time a network hiccup occurs.',
  },
  {
    question: 'Does idempotency affect my Agent Readiness Score?',
    answer:
      'Yes. Idempotency support is checked in D9 Agent Experience (10% weight) and also impacts D8 Reliability (13% weight). Together, these two dimensions account for 23% of your total score. Businesses with idempotent APIs consistently score 5 to 8 points higher in these dimensions.',
  },
  {
    question: 'How do I add idempotency to an existing API?',
    answer:
      'The simplest approach is middleware that intercepts POST and PATCH requests, reads the Idempotency-Key header, checks a key-value store (Redis works well) for a stored response, and returns it if found. If not found, it processes the request normally and stores the response mapped to the key with a 24-hour TTL. Stripe open-sourced their approach and it takes about 50 lines of middleware code.',
  },
  {
    question: 'What if my API does not support custom headers?',
    answer:
      'If you cannot add header support, use natural idempotency patterns. Design your endpoints so that PUT replaces the full resource (making retries safe), DELETE is always safe to retry, and POST endpoints accept a client-generated unique ID in the request body that the server uses for deduplication. This is less elegant than the Idempotency-Key header but achieves the same safety guarantee.',
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

export default function IdempotencyAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Idempotency Keys: Why AI Agents Need Safe Retries (And Your API Probably Does Not Support Them)',
    description:
      'AI agents retry on failure. Without idempotency keys, retries cause duplicate charges, duplicate orders, and corrupted state. The 3 patterns every agent-ready API needs.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/idempotency-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1800,
    keywords: 'idempotency keys AI agents, idempotent API, agent retry safety, duplicate request prevention',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Idempotency Keys for AI Agents',
          item: 'https://agenthermes.ai/blog/idempotency-agent-readiness',
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
      title="Idempotency Keys: Why AI Agents Need Safe Retries"
      shareUrl="https://agenthermes.ai/blog/idempotency-agent-readiness"
      currentHref="/blog/idempotency-agent-readiness"
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
            <span className="text-zinc-400">Idempotency Keys for AI Agents</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Repeat className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              D9 Agent Experience
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Idempotency Keys: Why AI Agents Need{' '}
            <span className="text-emerald-400">Safe Retries</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            AI agents retry on failure. That is not a bug — it is how autonomous systems handle unreliable
            networks. The problem is your API. Without <strong className="text-zinc-100">idempotency keys</strong>,
            every retry is a duplicate charge, a duplicate order, or a corrupted record. Stripe solved this
            with one header. Most APIs have not.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            The Retry Problem: Why Agents Are Different from Humans
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When a human submits a payment form and the page hangs, they wait. They check their email
              for a confirmation. They look at their bank account. They call support before trying again.
              Humans have judgment, patience, and multiple feedback channels.
            </p>
            <p>
              AI agents have none of that. An agent sends a POST request, gets a timeout or a 500
              error, and retries immediately. Most agent frameworks retry automatically — 3 times with
              exponential backoff is the default in LangChain, CrewAI, and the Anthropic SDK. That means
              a single network hiccup during a payment request can generate <strong className="text-zinc-100">four
              identical charge attempts</strong> before the agent even reports a problem.
            </p>
            <p>
              Of 500 businesses AgentHermes has scanned, fewer than 8% support any form of idempotency
              on their mutating endpoints. The other 92% will silently process every retry as a new
              transaction. In a world where agents handle purchases, bookings, and data mutations
              autonomously, this is not a minor oversight — it is a data integrity crisis waiting to happen.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '92%', label: 'APIs lack idempotency', icon: AlertTriangle },
              { value: '3x', label: 'default agent retries', icon: Repeat },
              { value: '23%', label: 'of score affected (D8+D9)', icon: Sparkles },
              { value: '$0', label: 'cost to add the header', icon: DollarSign },
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

      {/* ===== THE THREE PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-500" />
            The 3 Idempotency Patterns Every Agent-Ready API Needs
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Not every endpoint needs the same treatment. There are three distinct patterns that
              together cover every type of API interaction an agent will make. The best APIs implement
              all three. Most implement zero.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {idempotencyPatterns.map((pattern) => {
              const colors = getColorClasses(pattern.color)
              return (
                <div
                  key={pattern.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <pattern.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{pattern.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{pattern.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{pattern.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Stripe&rsquo;s implementation is the reference standard. Every POST endpoint accepts an{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                Idempotency-Key
              </code>{' '}
              header. Keys are stored for 24 hours. If the same key arrives while the original request is
              still processing, Stripe returns a 409 instead of executing a second time. The response
              includes the original request ID so the agent can correlate. This is why Stripe scores 68
              on agent readiness — details like this compound across all 9 dimensions.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAILURE MODE TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            What Goes Wrong Without Idempotency
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every failure mode below has happened in production. Agents do not hesitate to retry.
            The question is whether your API handles it safely.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Scenario</div>
              <div className="text-red-400">Without Idempotency</div>
              <div className="text-emerald-400">With Idempotency</div>
            </div>
            {failureModes.map((row, i) => (
              <div
                key={row.scenario}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.scenario}</div>
                <div className="text-zinc-500">{row.without}</div>
                <div className="text-emerald-400">{row.with}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENTHERMES CHECKS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-emerald-500" />
            What AgentHermes Checks in D9
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Idempotency contributes to{' '}
              <Link href="/blog/agent-experience-dimension" className="text-emerald-400 hover:text-emerald-300 underline">
                D9 Agent Experience
              </Link>{' '}
              (10% weight) and also impacts{' '}
              <Link href="/blog/reliability-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                D8 Reliability
              </Link>{' '}
              (13% weight). Here are the specific signals the scanner evaluates.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {d9Checks.map((check) => (
              <div
                key={check.signal}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-zinc-100 text-sm">{check.signal}</h3>
                    <span className="text-xs text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded">{check.weight}</span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{check.what}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The compounding effect:</strong> Idempotency does not
              live in a single dimension. An API with proper idempotency keys also tends to have better{' '}
              <Link href="/blog/error-handling-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                error handling
              </Link>{' '}
              (409 Conflict instead of silent duplicates), better{' '}
              <Link href="/blog/rate-limiting-for-agents" className="text-emerald-400 hover:text-emerald-300 underline">
                rate limiting
              </Link>{' '}
              (retries do not burn quota), and better reliability metrics (fewer false errors). A single
              infrastructure decision lifts 3 to 4 dimensions simultaneously.
            </p>
          </div>
        </div>
      </section>

      {/* ===== IMPLEMENTATION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-blue-500" />
            How to Implement Idempotency in 50 Lines
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The implementation is simpler than most developers expect. You need three things: a
              key-value store (Redis, DynamoDB, or even an in-memory Map for prototyping), middleware
              that intercepts mutating requests, and a TTL policy so keys do not accumulate forever.
            </p>
            <p>
              The middleware reads the <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">Idempotency-Key</code> header
              from incoming POST and PATCH requests. If the key exists in the store, it returns the
              cached response with a 200 status and an{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">Idempotent-Replayed: true</code>{' '}
              header so the agent knows this is a replay. If the key does not exist, it processes the
              request, stores the response mapped to the key with a 24-hour TTL, and returns normally.
            </p>
            <p>
              For in-flight deduplication — when the original request is still processing — the
              middleware should return a <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">409 Conflict</code> with
              a JSON body containing <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">{`{"error": "request_in_progress", "retry_after": 2}`}</code>.
              This tells the agent to wait 2 seconds before trying again — much better than creating a
              duplicate transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Store options',
                detail: 'Redis (best for production, supports TTL natively), DynamoDB (serverless, pay-per-read), PostgreSQL (already in your stack), in-memory Map (prototyping only — lost on restart).',
              },
              {
                title: 'TTL policy',
                detail: 'Stripe uses 24 hours. This is the standard. Long enough for any reasonable retry window, short enough to not accumulate stale keys. Shorter TTLs (1 hour) work for high-volume APIs.',
              },
              {
                title: 'Key format',
                detail: 'UUID v4 is the standard. Agents generate a new UUID per logical operation and reuse it across retries. Some APIs accept arbitrary strings — UUIDs are safer because they avoid collisions.',
              },
              {
                title: 'Response headers',
                detail: 'Return Idempotent-Replayed: true on cached responses. Return the original X-Request-ID. Include the original creation timestamp. These help agents distinguish first-run from replay.',
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
                title: 'Agent Experience (D9): The Dimension That Measures Agent Usability',
                href: '/blog/agent-experience-dimension',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'Rate Limiting for AI Agents: Why X-RateLimit-Remaining Matters',
                href: '/blog/rate-limiting-for-agents',
                tag: 'Technical Deep Dive',
                tagColor: 'purple',
              },
              {
                title: 'Error Handling for AI Agents: Why Your 500 Page Matters',
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
            Does your API handle retries safely?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see your D9 Agent Experience score, including
            idempotency support, error handling, and rate limiting.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Check My Score
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
