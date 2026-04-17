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
  Code2,
  Compass,
  FileCode,
  GitBranch,
  GitMerge,
  Globe,
  HelpCircle,
  Layers,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Wand2,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'GraphQL vs REST for Agent Readiness: Which API Style Agents Prefer | AgentHermes',
  description:
    'AI agents interact differently with GraphQL and REST APIs. REST is easier to discover via OpenAPI specs. GraphQL is more powerful to query via introspection. GitHub offers both — here is how each scores and what to offer for maximum agent readiness.',
  keywords: [
    'GraphQL vs REST AI agents',
    'GraphQL agent readiness',
    'REST API agent readiness',
    'API style AI agents',
    'GraphQL introspection agents',
    'OpenAPI vs GraphQL',
    'agent API design',
    'GraphQL REST comparison',
  ],
  openGraph: {
    title: 'GraphQL vs REST for Agent Readiness: Which API Style Agents Prefer',
    description:
      'REST is easier to discover (D1). GraphQL is more powerful to use (D2). GitHub offers both. Here is how each API style scores on agent readiness and what to offer for maximum coverage.',
    url: 'https://agenthermes.ai/blog/graphql-vs-rest-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GraphQL vs REST for Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GraphQL vs REST for Agent Readiness: Which API Style Agents Prefer',
    description:
      'REST is simpler to discover. GraphQL is deeper to query. Here is what each contributes to your Agent Readiness Score and the best practice for both.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/graphql-vs-rest-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionComparison = [
  {
    dimension: 'D1 Discoverability (12%)',
    rest: 'OpenAPI spec at well-known URL. Agents find endpoints via /openapi.json or /swagger.json. Standard tooling parses it instantly.',
    graphql: 'Single /graphql endpoint. Discoverable, but agents need to know to send an introspection query to learn the schema.',
    winner: 'REST',
    winnerColor: 'blue',
  },
  {
    dimension: 'D2 API Quality (15%)',
    rest: 'One endpoint per resource. Predictable URL patterns (/users/123). GET/POST/PUT/DELETE semantics. Limited to predefined response shapes.',
    graphql: 'Flexible queries return exactly the fields needed. No over-fetching. Nested relationships in one request. Typed schema.',
    winner: 'GraphQL',
    winnerColor: 'purple',
  },
  {
    dimension: 'D3 Onboarding (8%)',
    rest: 'curl-friendly. An agent can test with a single HTTP request. No query language to learn. Widely understood by LLMs.',
    graphql: 'Requires constructing queries in GraphQL syntax. Agents must understand the query language. Mutations need specific input types.',
    winner: 'REST',
    winnerColor: 'blue',
  },
  {
    dimension: 'D6 Data Quality (10%)',
    rest: 'Fixed response shapes. Consistent structure across calls. Easy to validate against OpenAPI schemas.',
    graphql: 'Response shape matches query. Always typed. Introspection provides complete schema with descriptions for every field.',
    winner: 'GraphQL',
    winnerColor: 'purple',
  },
  {
    dimension: 'D7 Security (12%)',
    rest: 'Bearer token in header. Per-endpoint authorization is straightforward. Scoped API keys map to endpoint groups.',
    graphql: 'Same Bearer token, but authorization must be field-level. Complex nested queries can create authorization gaps.',
    winner: 'REST',
    winnerColor: 'blue',
  },
  {
    dimension: 'D9 Agent Experience (10%)',
    rest: 'Pagination, rate-limit headers, idempotency keys all have established patterns. Agents know what to expect.',
    graphql: 'Relay-style cursor pagination is excellent. Errors in the response body (not HTTP status). Custom extensions for rate limits.',
    winner: 'Tie',
    winnerColor: 'emerald',
  },
]

const githubComparison = [
  { feature: 'Endpoint discovery', rest: 'OpenAPI 3.0 spec published', graphql: 'Introspection query returns full schema', edge: 'REST (simpler)' },
  { feature: 'Query flexibility', rest: 'Fixed endpoints, query params for filtering', graphql: 'Request exactly the fields you need', edge: 'GraphQL' },
  { feature: 'Nested data', rest: 'Multiple requests (repo, then issues, then comments)', graphql: 'Single query: { repository { issues { comments } } }', edge: 'GraphQL' },
  { feature: 'Rate limiting', rest: 'X-RateLimit-* headers, 5,000/hr', graphql: 'Point-based cost system, 5,000 points/hr', edge: 'REST (simpler)' },
  { feature: 'Pagination', rest: 'Link header with next/prev URLs', graphql: 'Relay cursor-based with pageInfo', edge: 'GraphQL' },
  { feature: 'Error handling', rest: 'HTTP status codes + JSON body', graphql: 'Always 200, errors in response body', edge: 'REST (clearer)' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Should I pick GraphQL or REST for agent readiness?',
    answer:
      'If you can only offer one, choose REST with an OpenAPI spec. REST is easier for agents to discover, authenticate against, and use without specialized knowledge. The LLMs powering most AI agents have seen far more REST API documentation in training data than GraphQL schemas. However, if you already have GraphQL, do not remove it — add an OpenAPI spec for REST discovery and keep GraphQL for agents that can leverage its power.',
  },
  {
    question: 'Can AI agents actually write GraphQL queries?',
    answer:
      'Yes, modern LLMs (GPT-4, Claude, Gemini) can generate syntactically correct GraphQL queries when given a schema. The challenge is not generation — it is discovery. An agent needs to first find the GraphQL endpoint, then run an introspection query to get the schema, then understand the domain-specific types well enough to construct a useful query. REST with OpenAPI lets agents skip the first two steps entirely.',
  },
  {
    question: 'How does AgentHermes scan for GraphQL endpoints?',
    answer:
      'AgentHermes checks for /graphql, /api/graphql, and /gql endpoints. If found, it sends an introspection query to evaluate the schema completeness, type descriptions, and authentication requirements. The introspection results contribute to D2 API Quality and D6 Data Quality scores. Disabled introspection (common in production for security) actually reduces the agent readiness score because agents cannot self-discover the API surface.',
  },
  {
    question: 'What about tRPC, gRPC, or other API styles?',
    answer:
      'gRPC uses Protocol Buffers with strong typing, but requires HTTP/2 and binary encoding — most AI agents expect HTTP/1.1 and JSON. tRPC is TypeScript-specific and relies on build-time type sharing, which agents cannot leverage at runtime. For agent readiness specifically, REST with OpenAPI and GraphQL with introspection are the two styles that agents can discover and use without prior integration. Everything else requires custom adapters.',
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

export default function GraphqlVsRestAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'GraphQL vs REST for Agent Readiness: Which API Style Agents Prefer',
    description:
      'AI agents interact differently with GraphQL and REST APIs. REST is easier to discover. GraphQL is more powerful to query. Here is how each style impacts your Agent Readiness Score across 6 dimensions.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/graphql-vs-rest-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'GraphQL vs REST AI agents, API style agent readiness, GraphQL introspection, OpenAPI spec, agent API design',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'GraphQL vs REST for Agent Readiness',
          item: 'https://agenthermes.ai/blog/graphql-vs-rest-agent-readiness',
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
      title="GraphQL vs REST for Agent Readiness: Which API Style Agents Prefer"
      shareUrl="https://agenthermes.ai/blog/graphql-vs-rest-agent-readiness"
      currentHref="/blog/graphql-vs-rest-agent-readiness"
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
            <span className="text-zinc-400">GraphQL vs REST for Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <GitMerge className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              API Design
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            GraphQL vs REST for Agent Readiness:{' '}
            <span className="text-emerald-400">Which API Style Agents Prefer</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            REST and GraphQL solve the same problem differently — and AI agents interact with each
            in fundamentally different ways. <strong className="text-zinc-100">REST is easier to
            discover. GraphQL is more powerful to use.</strong> After scanning 500 businesses, here
            is how each style maps to the 9 dimensions of agent readiness, and what to offer if you
            want maximum coverage.
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

      {/* ===== THE CORE DISTINCTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            Why API Style Matters for Agents
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When a human developer integrates with an API, they read documentation once and write
              code that runs forever. When an AI agent interacts with an API, it{' '}
              <strong className="text-zinc-100">discovers, understands, and calls the API at
              runtime</strong> — every time. This makes the API style a first-class factor in
              agent readiness.
            </p>
            <p>
              REST APIs expose a collection of URL endpoints, each representing a resource. An agent
              discovers them via an OpenAPI spec (a single JSON or YAML file listing every endpoint,
              parameter, and response schema). The agent reads the spec, picks the right endpoint,
              and makes an HTTP call. The model is simple: one URL, one resource, one action.
            </p>
            <p>
              GraphQL APIs expose a single endpoint with a typed schema. An agent discovers the
              schema via an introspection query — essentially asking the API &ldquo;what can you
              do?&rdquo; The agent then constructs a query in GraphQL syntax, specifying exactly
              which fields it needs across potentially nested relationships. The model is flexible
              but requires the agent to understand a query language.
            </p>
            <p>
              Both work. Both have strengths. The question for agent readiness is:{' '}
              <strong className="text-zinc-100">which style maps better to each dimension
              of the scoring model?</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <div className="text-lg font-bold text-blue-400 mb-2">REST</div>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <span>Predictable URL-per-resource pattern</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <span>OpenAPI spec = instant discovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <span>HTTP verbs = clear intent (GET reads, POST creates)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <span>Status codes signal outcome directly</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
              <div className="text-lg font-bold text-purple-400 mb-2">GraphQL</div>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />
                  <span>Ask for exactly the fields you need</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />
                  <span>Nested relationships in one request</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />
                  <span>Introspection = self-documenting schema</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />
                  <span>Strongly typed everything</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIMENSION-BY-DIMENSION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Dimension-by-Dimension: REST vs GraphQL
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            How each API style maps to the 6 most relevant dimensions of the Agent Readiness Score.
          </p>

          <div className="space-y-4 mb-8">
            {dimensionComparison.map((item) => {
              const winnerColors = getColorClasses(item.winnerColor)
              return (
                <div
                  key={item.dimension}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-zinc-100">{item.dimension}</h3>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${winnerColors.bg} border ${winnerColors.border} ${winnerColors.text} text-xs font-semibold`}>
                      {item.winner}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                      <div className="text-xs font-bold text-blue-400 mb-1">REST</div>
                      <p className="text-xs text-zinc-500 leading-relaxed">{item.rest}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                      <div className="text-xs font-bold text-purple-400 mb-1">GraphQL</div>
                      <p className="text-xs text-zinc-500 leading-relaxed">{item.graphql}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The scorecard:</strong> REST wins on 3 dimensions
              (D1, D3, D7) weighted at 32% combined. GraphQL wins on 2 dimensions (D2, D6) weighted at
              25% combined. D9 is a tie. For pure agent readiness scoring, REST with OpenAPI has a
              slight edge — but GraphQL adds power for sophisticated agents.
            </p>
          </div>
        </div>
      </section>

      {/* ===== GITHUB CASE STUDY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-purple-500" />
            Case Study: GitHub Offers Both (Score: 67 Silver)
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              GitHub is one of the few companies offering both REST and GraphQL APIs at scale.
              Their <Link href="/blog/github-agent-readiness-breakdown" className="text-emerald-400 hover:text-emerald-300 underline">Agent Readiness Score of 67 (Silver)</Link> benefits
              from this dual approach. Here is how each API performs for agent use cases.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Feature</div>
              <div>REST API</div>
              <div>GraphQL API</div>
              <div>Edge</div>
            </div>
            {githubComparison.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.feature}</div>
                <div className="text-zinc-500 text-xs">{row.rest}</div>
                <div className="text-zinc-500 text-xs">{row.graphql}</div>
                <div className="text-emerald-400 text-xs font-medium">{row.edge}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The takeaway: GitHub&apos;s REST API is what most agents use for simple operations —
              list repos, read files, create issues. The GraphQL API is what sophisticated agents use
              when they need to traverse the object graph — &ldquo;get me the last 5 PRs for this
              repo with their review comments and CI check results&rdquo; in a single request.
            </p>
            <p>
              Offering both is the optimal strategy. The REST API with{' '}
              <Link href="/blog/openapi-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                OpenAPI spec
              </Link>{' '}
              handles discovery and simple operations. The GraphQL API handles complex, relationship-heavy
              queries that would require 5-10 REST calls.
            </p>
          </div>
        </div>
      </section>

      {/* ===== BEST PRACTICE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Best Practice: REST for Discovery, GraphQL for Power
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              If you are building from scratch and can only offer one, <strong className="text-zinc-100">
              choose REST with a published OpenAPI spec</strong>. The discovery advantage is too
              important — agents cannot use what they cannot find, and OpenAPI is the universal
              discovery mechanism for REST APIs.
            </p>
            <p>
              If you already have a GraphQL API, do not remove it. Instead, add these three things
              to maximize your score:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Keep introspection enabled (or provide a schema file)',
                detail: 'Disabling introspection in production is a common security recommendation, but it removes the primary discovery mechanism for agents. If you must disable it, publish the schema as a downloadable file at a well-known URL.',
                icon: Search,
              },
              {
                step: '2',
                title: 'Add descriptions to every type and field',
                detail: 'GraphQL introspection includes description fields on types, fields, and arguments. These descriptions are what agents read to understand what each field means. A schema without descriptions is like an API without documentation.',
                icon: FileCode,
              },
              {
                step: '3',
                title: 'Publish an OpenAPI spec for a REST wrapper (or core endpoints)',
                detail: 'Even if your primary API is GraphQL, expose the most common operations as REST endpoints with an OpenAPI spec. This gives agents the simple discovery path while keeping GraphQL available for advanced use.',
                icon: Layers,
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
              The ideal architecture for agent readiness is what GitHub, Shopify, and the top-scoring
              platforms do: <strong className="text-zinc-100">REST with OpenAPI for discovery
              and basic CRUD, GraphQL for flexible queries and complex data retrieval</strong>. This
              combination scores well on every dimension because it gives agents two paths — a simple
              one and a powerful one.
            </p>
          </div>
        </div>
      </section>

      {/* ===== MCP AND THE FUTURE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            MCP Supersedes Both (But Needs a Backend)
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              There is a third option emerging: <strong className="text-zinc-100">MCP servers</strong>.
              The Model Context Protocol does not care whether your backend is REST or GraphQL. An MCP
              server exposes <em>tools</em> that agents call by name, with typed inputs and outputs.
              The tool implementation can call REST, GraphQL, gRPC, or a database directly.
            </p>
            <p>
              For agent readiness scoring, an MCP server adds 5-8 points on top of whatever your
              underlying API style provides. The agent-native bonus (D10, 7% weight) specifically
              rewards MCP adoption. Combined with{' '}
              <Link href="/blog/sdk-generation-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                auto-generated SDKs
              </Link>{' '}
              from your OpenAPI spec, the triple stack of REST + GraphQL + MCP gives agents
              maximum flexibility.
            </p>
            <p>
              But MCP needs a backend. If you have neither REST nor GraphQL today, start with REST
              and OpenAPI — it is the fastest path to agent discovery. Then layer MCP on top for
              the agent-native bonus.
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
                title: 'Why GitHub Scores 67 for Agent Readiness',
                href: '/blog/github-agent-readiness-breakdown',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'Auto-Generated SDKs: How OpenAPI Specs Let Agents Write Their Own Libraries',
                href: '/blog/sdk-generation-agent-readiness',
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
            How does your API score?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Whether you use REST, GraphQL, or both — see exactly where your API stands across
            all 9 dimensions of agent readiness. Free scan, 60 seconds.
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
