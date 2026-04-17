import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  HelpCircle,
  Layers,
  List,
  RefreshCw,
  Server,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Pagination for AI Agents: Why Cursor-Based Beats Offset-Based Every Time | AgentHermes',
  description:
    'Cursor-based pagination is the only agent-safe pattern. Offset-based breaks when data shifts between pages. AgentHermes D9 checks for cursor support. Real data from 500 business scans.',
  keywords: [
    'pagination AI agents cursor',
    'cursor-based pagination',
    'offset pagination problems',
    'API pagination agents',
    'agent readiness pagination',
    'cursor pagination vs offset',
    'AI agent API design',
    'agent experience pagination',
  ],
  openGraph: {
    title: 'Pagination for AI Agents: Why Cursor-Based Beats Offset-Based Every Time',
    description:
      'Cursor-based pagination is the only agent-safe pattern. Offset-based breaks silently. Data from 500 scans shows 88% of APIs fail pagination checks.',
    url: 'https://agenthermes.ai/blog/pagination-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pagination for AI Agents: Why Cursor-Based Beats Offset-Based Every Time',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pagination for AI Agents: Why Cursor-Based Beats Offset-Based Every Time',
    description:
      'Agents iterate through datasets automatically. Offset pagination breaks silently. Cursor-based is the only agent-safe pattern.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/pagination-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const paginationPatterns = [
  {
    name: 'Offset-Based',
    description: 'The classic page=2&limit=20 pattern. The server skips rows to find the starting point. Works when data is static, breaks when data changes between requests.',
    agentSafe: false,
    example: 'GET /products?page=3&limit=20 → skips 40, returns 41-60',
    problem: 'If a new product is inserted while the agent pages through, it either sees duplicates or misses items entirely. The agent has no way to detect this.',
    color: 'red',
  },
  {
    name: 'Cursor-Based',
    description: 'Each response includes a cursor token pointing to the last item. The next request uses after=cursor to get the next batch. Position is anchored to a specific record, not an offset.',
    agentSafe: true,
    example: 'GET /products?limit=20&after=prod_abc123 → returns 20 items after that ID',
    problem: 'None for agents. Stable across inserts, deletes, and concurrent modifications. The agent always gets a consistent, complete view of the data.',
    color: 'emerald',
  },
  {
    name: 'Keyset-Based',
    description: 'A variant of cursor pagination using a natural sort key (timestamp, ID) instead of an opaque token. Requires a stable, unique sort column. Fastest at scale because the database uses an index seek instead of a skip.',
    agentSafe: true,
    example: 'GET /orders?created_after=2026-04-15T00:00:00Z&limit=50',
    problem: 'Minor: requires the sort key to be exposed in the API. Some APIs hide internal IDs. But for agents, this transparency is a feature, not a bug.',
    color: 'emerald',
  },
]

const comparisonRows = [
  { aspect: 'Data stability', offset: 'Breaks on insert/delete', cursor: 'Stable across mutations' },
  { aspect: 'Performance at scale', offset: 'O(n) skip — slower each page', cursor: 'O(1) index seek — constant time' },
  { aspect: 'Agent autonomy', offset: 'Agent must guess total pages', cursor: 'Agent follows has_more flag' },
  { aspect: 'Duplicate risk', offset: 'High — items shift between pages', cursor: 'Zero — position is anchored' },
  { aspect: 'Concurrency safety', offset: 'Unsafe with concurrent writes', cursor: 'Safe — cursor is immutable' },
  { aspect: 'Resumability', offset: 'Cannot resume after disconnect', cursor: 'Resume from last cursor' },
]

const realWorldExamples = [
  {
    company: 'Stripe',
    score: 68,
    approach: 'Cursor-based with has_more + starting_after. Every list endpoint supports it. Auto-pagination in SDKs.',
    verdict: 'Gold standard',
    color: 'emerald',
  },
  {
    company: 'GitHub',
    score: 67,
    approach: 'Both offset (page=N) and cursor (after=Y2FwdG...) via GraphQL. REST uses Link headers with rel="next". Cursor wins on the GraphQL API.',
    verdict: 'Dual support — cursor recommended',
    color: 'blue',
  },
  {
    company: 'Shopify',
    score: 52,
    approach: 'GraphQL cursor-based by default. REST uses page_info cursor tokens since 2019, phasing out page-based. Good migration story.',
    verdict: 'Cursor by default',
    color: 'blue',
  },
  {
    company: 'Most APIs (88%)',
    score: 0,
    approach: 'No pagination at all. Return all results in one response (if under 100) or truncate silently. Agent gets partial data and does not know it.',
    verdict: 'Invisible data loss',
    color: 'red',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do agents paginate differently than humans?',
    answer:
      'Humans browse one page at a time and tolerate duplicates or missing items. Agents iterate through entire datasets programmatically to build complete context. A missed item or duplicate can cascade into wrong decisions — recommending an out-of-stock product, double-booking an appointment, or producing an incomplete report. Agents need pagination that guarantees completeness.',
  },
  {
    question: 'Can I support both offset and cursor pagination?',
    answer:
      'Yes, and you should during migration. Stripe and GitHub both offer dual support. The key is making cursor the default and documenting it as the recommended pattern. AgentHermes D9 checks specifically for cursor support — offset-only will not earn full D9 points even if it works.',
  },
  {
    question: 'What does AgentHermes check for pagination?',
    answer:
      'D9 Agent Experience includes pagination as a scored signal. We check for: cursor or after/before parameters in API responses, has_more or next_cursor fields in response bodies, Link headers with rel="next" for REST APIs, and consistent pagination across all list endpoints. Missing pagination on list endpoints that return more than 20 items is a D9 penalty.',
  },
  {
    question: 'How does pagination affect the Agent Readiness Score?',
    answer:
      'Pagination is part of D9 Agent Experience (10% weight) and D2 API Quality (15% weight). An API with proper cursor pagination earns points in both dimensions. An API with no pagination or offset-only pagination loses points in D9 specifically. The combined impact is typically 2-4 points on the overall score — enough to push a Bronze business into Silver.',
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

export default function PaginationAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Pagination for AI Agents: Why Cursor-Based Beats Offset-Based Every Time',
    description:
      'Cursor-based pagination is the only agent-safe pattern for AI agents iterating through large datasets. Data from 500 business scans shows 88% of APIs fail pagination checks.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/pagination-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1800,
    keywords:
      'pagination AI agents cursor, cursor-based pagination, offset pagination problems, agent readiness pagination',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Pagination for AI Agents',
          item: 'https://agenthermes.ai/blog/pagination-agent-readiness',
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
      title="Pagination for AI Agents: Why Cursor-Based Beats Offset-Based Every Time"
      shareUrl="https://agenthermes.ai/blog/pagination-agent-readiness"
      currentHref="/blog/pagination-agent-readiness"
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
            <span className="text-zinc-400">Pagination for AI Agents</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <List className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              D9 Agent Experience
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Pagination for AI Agents:{' '}
            <span className="text-emerald-400">Why Cursor-Based Beats Offset-Based Every Time</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            When an AI agent iterates through your product catalog, order history, or customer list,
            it needs <strong className="text-zinc-100">every record, in order, with zero duplicates</strong>.
            Offset-based pagination cannot guarantee that. Cursor-based pagination can. Of 500 businesses
            scanned by AgentHermes, 88% have no pagination support at all on their list endpoints.
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
            <Database className="h-5 w-5 text-red-500" />
            The Problem: Agents Cannot Browse — They Iterate
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A human browsing a product catalog clicks &ldquo;Next Page&rdquo; and scans visually. If an
              item appears twice or one is missing, they barely notice. An AI agent is different. When an
              agent pages through your inventory to find the cheapest widget, recommend a product, or
              reconcile an order list, it processes <strong className="text-zinc-100">every single record
              programmatically</strong>. A duplicate means the agent counts it twice. A missing item means
              the agent makes a recommendation without seeing the best option.
            </p>
            <p>
              This is not a theoretical concern. Any API that accepts writes while an agent reads will
              mutate data between pagination requests. A new product added to page 2 shifts everything
              after it — the agent sees item #40 twice on page 2 and page 3, and never sees item #41
              at all. The agent does not know this happened. There is no error. The data just silently
              corrupts.
            </p>
            <p>
              AgentHermes scans specifically for pagination patterns in{' '}
              <Link href="/blog/agent-experience-dimension" className="text-emerald-400 hover:text-emerald-300 underline">
                D9 Agent Experience
              </Link>{' '}
              because this is one of the most common silent failures in agent-API interactions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '88%', label: 'of APIs have no pagination', icon: Database },
              { value: '9%', label: 'use offset-only (unsafe)', icon: RefreshCw },
              { value: '3%', label: 'support cursor pagination', icon: CheckCircle2 },
              { value: '2-4pt', label: 'score impact of proper pagination', icon: TrendingUp },
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

      {/* ===== THREE PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            The Three Pagination Patterns Agents Encounter
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every paginated API falls into one of three patterns. Only two of them are safe for
            autonomous agents.
          </p>

          <div className="space-y-4 mb-8">
            {paginationPatterns.map((pattern) => {
              const colors = getColorClasses(pattern.color)
              return (
                <div
                  key={pattern.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      {pattern.agentSafe
                        ? <CheckCircle2 className={`h-5 w-5 ${colors.text}`} />
                        : <RefreshCw className={`h-5 w-5 ${colors.text}`} />
                      }
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{pattern.name}</h3>
                      <span className={`text-xs font-medium ${colors.text}`}>
                        {pattern.agentSafe ? 'Agent-safe' : 'Not agent-safe'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{pattern.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 mb-3">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{pattern.example}</code>
                    </p>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    <span className={`font-medium ${colors.text}`}>
                      {pattern.agentSafe ? 'Why it works:' : 'The failure mode:'}
                    </span>{' '}
                    {pattern.problem}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== HEAD-TO-HEAD COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Offset vs Cursor: Head-to-Head
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every dimension where agents care about data integrity, cursor-based pagination wins.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div className="text-red-400">Offset-Based</div>
              <div className="text-emerald-400">Cursor-Based</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.offset}</div>
                <div className="text-emerald-400">{row.cursor}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REAL-WORLD EXAMPLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-blue-500" />
            Real-World Examples: Who Gets It Right
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The top-scoring APIs in our 500-business scan all implement cursor-based pagination.
            The pattern is consistent — companies that build for developers build for agents.
          </p>

          <div className="space-y-4 mb-8">
            {realWorldExamples.map((example) => {
              const colors = getColorClasses(example.color)
              return (
                <div
                  key={example.company}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-zinc-100">{example.company}</h3>
                    {example.score > 0 && (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors.bg} border ${colors.border} ${colors.text}`}>
                        Score: {example.score}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">{example.approach}</p>
                  <p className={`text-xs font-medium ${colors.text}`}>{example.verdict}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern is clear: APIs built for programmatic consumption — Stripe, GitHub, Shopify —
              default to cursor-based pagination. APIs built for human dashboards — most SaaS admin panels,
              e-commerce backends, local business tools — either have no pagination or use offset-only.
              The former are agent-ready. The latter silently lose data when agents use them.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENTHERMES CHECKS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What AgentHermes Checks in D9
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Pagination is one of seven signals in{' '}
            <Link href="/blog/agent-experience-dimension" className="text-emerald-400 hover:text-emerald-300 underline">
              D9 Agent Experience
            </Link>{' '}
            (10% weight). Here is exactly what gets checked.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                check: 'Cursor parameters in API',
                detail: 'Response includes after, before, cursor, starting_after, or ending_before parameters.',
                icon: Code2,
              },
              {
                check: 'has_more or next indicator',
                detail: 'Response body includes has_more: true/false, next_cursor, or next_page_token so the agent knows when to stop.',
                icon: CheckCircle2,
              },
              {
                check: 'Consistent across endpoints',
                detail: 'All list endpoints use the same pagination pattern. Mixing offset on /products and cursor on /orders confuses agents.',
                icon: Layers,
              },
              {
                check: 'Link headers (REST)',
                detail: 'For REST APIs, Link: <url>; rel="next" headers provide the next page URL. Agents follow these without parsing response bodies.',
                icon: Server,
              },
            ].map((item) => (
              <div
                key={item.check}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <item.icon className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.check}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Pagination alone does not make or break a score. But combined with the other D9 signals —
              request IDs, structured errors, response envelopes, rate-limit headers, idempotency keys,
              and{' '}
              <Link href="/blog/openapi-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                OpenAPI examples
              </Link>{' '}
              — it separates APIs that agents can use reliably from APIs that produce silent data corruption.
            </p>
          </div>
        </div>
      </section>

      {/* ===== IMPLEMENTATION GUIDE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            The Minimum Viable Agent-Safe Pagination
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              You do not need to rewrite your API. The minimum cursor-based pagination adds three things
              to any list endpoint response.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 mb-8">
            <p className="text-xs text-zinc-500 mb-3 font-medium">Response envelope with cursor pagination:</p>
            <pre className="text-sm text-emerald-400 leading-relaxed overflow-x-auto">
{`{
  "data": [...],
  "has_more": true,
  "next_cursor": "prod_abc123",
  "total_count": 1847
}`}
            </pre>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              <strong className="text-zinc-100">data</strong> contains the current page of results.{' '}
              <strong className="text-zinc-100">has_more</strong> tells the agent whether to continue.{' '}
              <strong className="text-zinc-100">next_cursor</strong> is the opaque token for the next request.{' '}
              <strong className="text-zinc-100">total_count</strong> is optional but helpful — it lets the
              agent estimate progress and set expectations for the user.
            </p>
            <p>
              The agent&rsquo;s loop becomes trivial: fetch, process, check has_more, pass next_cursor,
              repeat. No page math. No offset arithmetic. No silent data loss. If the connection drops,
              the agent resumes from the last cursor. This is what agent-safe pagination looks like.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">Migration tip:</strong> If you currently use offset-based
              pagination, add cursor support alongside it. Accept both <code className="text-amber-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">page=2&limit=20</code>{' '}
              and <code className="text-amber-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">after=prod_abc123&limit=20</code>{' '}
              on the same endpoint. Document cursor as the recommended approach. Remove offset support
              in your next major version.
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
                title: 'Agent Experience (D9): The Dimension That Measures Agent Usability',
                href: '/blog/agent-experience-dimension',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'OpenAPI Specs Are the Biggest Factor in Agent Readiness',
                href: '/blog/openapi-agent-readiness',
                tag: 'Standards Deep Dive',
                tagColor: 'emerald',
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
            Does your API paginate safely for agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see your D9 Agent Experience score, including
            pagination support, across all 9 dimensions.
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
