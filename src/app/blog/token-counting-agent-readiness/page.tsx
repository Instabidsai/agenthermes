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
  DollarSign,
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
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Token Counting and Agent Readiness: Why Response Size Matters for AI Agent Costs | AgentHermes',
  description:
    'AI agents pay per token. Bloated API responses cost agents more to process. Agent-ready APIs return minimal JSON — no HTML wrappers, no marketing copy in errors. The leaner your API, the more agent traffic you get.',
  keywords: [
    'token counting response size agent readiness',
    'API token cost',
    'agent API optimization',
    'token efficiency API',
    'AI agent API costs',
    'response size optimization',
    'agent readiness tokens',
    'API response bloat',
    'minimal JSON API',
  ],
  openGraph: {
    title:
      'Token Counting and Agent Readiness: Why Response Size Matters for AI Agent Costs',
    description:
      'Agents pay per token. Bloated APIs are expensive agents to call. Lean APIs get more agent traffic. Here is how response size affects your Agent Readiness Score.',
    url: 'https://agenthermes.ai/blog/token-counting-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Token Counting and Agent Readiness: Why Response Size Matters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Token Counting and Agent Readiness: Why Response Size Matters',
    description:
      'Agents pay per token. A 200-token Stripe response vs a 2000-token legacy XML response = 10x cost difference. Lean APIs win the agent economy.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/token-counting-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const tokenComparisons = [
  {
    provider: 'Stripe (create charge)',
    format: 'Minimal JSON',
    tokens: '~200',
    cost: '$0.0006',
    color: 'emerald',
  },
  {
    provider: 'Modern REST API (typical)',
    format: 'Clean JSON',
    tokens: '~400',
    cost: '$0.0012',
    color: 'emerald',
  },
  {
    provider: 'Legacy API with envelope',
    format: 'Wrapped JSON',
    tokens: '~800',
    cost: '$0.0024',
    color: 'amber',
  },
  {
    provider: 'SOAP/XML service',
    format: 'XML with namespaces',
    tokens: '~1500',
    cost: '$0.0045',
    color: 'red',
  },
  {
    provider: 'HTML error page',
    format: 'Full HTML document',
    tokens: '~2000+',
    cost: '$0.006+',
    color: 'red',
  },
]

const bloatPatterns = [
  {
    pattern: 'HTML error pages',
    description:
      'When an API returns a 500 error as a full HTML page with navigation, footer, and CSS, the agent consumes 2000+ tokens to learn "something went wrong." A structured JSON error uses 30 tokens.',
    fix: 'Return { "error": "message", "code": "ERROR_CODE", "request_id": "abc123" }',
    savings: '98% token reduction on errors',
  },
  {
    pattern: 'Marketing copy in responses',
    description:
      'Some APIs include promotional text, upsell messages, or legal disclaimers in every response body. Agents cannot use this information. It is pure token waste.',
    fix: 'Strip non-functional text from API responses. Marketing belongs on the website, not in the JSON.',
    savings: '20-40% token reduction per response',
  },
  {
    pattern: 'Deeply nested envelopes',
    description:
      'Wrapping data in { "status": "ok", "data": { "response": { "results": { "items": [...] } } } } adds 50+ tokens of structure per response with zero information value.',
    fix: 'Return data at the top level. { "items": [...], "total": 42 }',
    savings: '10-15% token reduction',
  },
  {
    pattern: 'Unnecessary fields by default',
    description:
      'Returning 30 fields when the agent needs 5. User avatar URLs, internal timestamps, deprecated fields, and metadata the agent will never use.',
    fix: 'Support field selection: ?fields=id,name,price,available. Or use sparse fieldsets (JSON:API style).',
    savings: '50-80% token reduction with field selection',
  },
  {
    pattern: 'Verbose datetime formats',
    description:
      'Returning "Wednesday, April 15th, 2026 at 3:00 PM Eastern Standard Time" instead of "2026-04-15T15:00:00-05:00". The human-readable version is 5x the tokens.',
    fix: 'ISO 8601 always. Let the consuming application format for display.',
    savings: '3-5x reduction on datetime fields',
  },
]

const dimensionImpact = [
  {
    dimension: 'D6 Data Quality',
    weight: '10%',
    impact:
      'Concise, well-structured responses score higher. Redundant fields, inconsistent types, and bloated payloads lower D6.',
    icon: Layers,
    color: 'blue',
  },
  {
    dimension: 'D9 Agent Experience',
    weight: '10%',
    impact:
      'Agent-friendly response formats — minimal JSON, consistent schemas, proper error codes — directly reward lean APIs.',
    icon: Bot,
    color: 'purple',
  },
  {
    dimension: 'D8 Reliability',
    weight: '13%',
    impact:
      'Smaller responses transfer faster, timeout less, and are less likely to be truncated. Reliability improves mechanically.',
    icon: Shield,
    color: 'emerald',
  },
  {
    dimension: 'D2 API Quality',
    weight: '15%',
    impact:
      'Clean API design naturally produces smaller responses. REST best practices and proper HTTP status codes reduce token waste.',
    icon: Code2,
    color: 'cyan',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How much does a token cost for AI agents?',
    answer:
      'Token pricing varies by model. GPT-4o charges about $2.50 per million input tokens, Claude 3.5 Sonnet charges about $3 per million input tokens. These costs add up: an agent making 1,000 API calls per day at 2,000 tokens per response spends $5-6/day on input tokens alone. Reducing response size to 200 tokens drops that to $0.50-0.60/day — a 10x savings that makes your API dramatically more attractive to agent developers.',
  },
  {
    question: 'Does response size actually affect agent readiness scores?',
    answer:
      'Yes. The AgentHermes scoring framework rewards concise, well-structured data through D6 Data Quality and D9 Agent Experience. APIs that return minimal JSON with consistent schemas score higher than APIs that return bloated responses with unnecessary fields. The effect is indirect but measurable — lean APIs typically score 5-10 points higher across these dimensions.',
  },
  {
    question: 'Should I remove fields from my existing API?',
    answer:
      'Do not remove fields — that breaks existing integrations. Instead, support field selection: let callers specify which fields they want via a query parameter like ?fields=id,name,price. This gives agents the option to request minimal responses while keeping backward compatibility for existing consumers.',
  },
  {
    question: 'What about pagination? Does that affect token costs?',
    answer:
      'Pagination is critical. An API that returns 1,000 results in one response when the agent only needs the first 10 wastes 99% of tokens. Implement cursor-based pagination with a configurable page size. Default to small pages (10-25 items) and let callers increase if needed. This is both a token optimization and a reliability improvement.',
  },
  {
    question: 'How do I measure my API response token count?',
    answer:
      'Use a tokenizer library (tiktoken for OpenAI models, or a general BPE tokenizer). Measure your typical endpoint responses. Stripe responses average about 200 tokens. If your equivalent endpoint returns 800+, you have bloat. AgentHermes scans measure response structure and flag common bloat patterns automatically.',
  },
]

function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    red: {
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    amber: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    blue: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TokenCountingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Token Counting and Agent Readiness: Why Response Size Matters for AI Agent Costs',
    description:
      'AI agents pay per token. Bloated API responses cost agents more to process. Agent-ready APIs return minimal JSON. The leaner your API, the more agent traffic you get.',
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
      'https://agenthermes.ai/blog/token-counting-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'token counting, API response size, agent readiness, AI agent costs, minimal JSON, API optimization',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://agenthermes.ai',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://agenthermes.ai/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Token Counting Agent Readiness',
          item: 'https://agenthermes.ai/blog/token-counting-agent-readiness',
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
      title="Token Counting and Agent Readiness: Why Response Size Matters for AI Agent Costs"
      shareUrl="https://agenthermes.ai/blog/token-counting-agent-readiness"
      currentHref="/blog/token-counting-agent-readiness"
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
              <Link
                href="/"
                className="hover:text-zinc-300 transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-zinc-300 transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-zinc-400">
                Token Counting Agent Readiness
              </span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                <Code2 className="h-3.5 w-3.5" />
                Technical Deep Dive
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                Cost Optimization
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Token Counting and Agent Readiness:{' '}
              <span className="text-emerald-400">
                Why Response Size Matters for AI Agent Costs
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Every AI agent pays for every token it processes. When an agent
              calls your API, the response goes through a language model that
              charges per token — input and output. A Stripe API response
              costs an agent about{' '}
              <strong className="text-zinc-100">$0.0006 to process</strong>. A
              legacy XML response costs{' '}
              <strong className="text-zinc-100">$0.006</strong> — ten times
              more for the same information. The leaner your API, the cheaper
              agents can use it. The cheaper you are to use, the more agent
              traffic you get.
            </p>

            {/* Author byline */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
              <div className="author-avatar">AH</div>
              <div>
                <div className="text-sm font-semibold text-zinc-200">
                  AgentHermes Research
                </div>
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

        {/* ===== THE ECONOMICS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-500" />
              The Token Economics of Agent API Calls
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                When a human visits an API documentation page, the page size
                does not matter — humans scan visually and ignore irrelevant
                content. When an AI agent processes an API response, every
                byte matters. The response is tokenized and fed through a
                language model. More tokens means higher cost, longer
                processing time, and increased chance of context window
                overflow.
              </p>
              <p>
                This creates a new competitive dimension for APIs. Two
                services that return identical information but different
                response sizes have dramatically different costs for agent
                consumers. An agent making 10,000 API calls per day will
                prefer the service that costs $6 over the one that costs $60
                — even if the underlying service is identical.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Provider / Type</div>
                <div>Format</div>
                <div>Tokens</div>
                <div>Cost per Call</div>
              </div>
              {tokenComparisons.map((row, i) => {
                const colors = getColorClasses(row.color)
                return (
                  <div
                    key={row.provider}
                    className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                  >
                    <div className="font-medium text-zinc-200">
                      {row.provider}
                    </div>
                    <div className="text-zinc-500">{row.format}</div>
                    <div className={colors.text}>{row.tokens}</div>
                    <div className={colors.text}>{row.cost}</div>
                  </div>
                )
              })}
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">
                  Cost estimates based on:
                </strong>{' '}
                Claude 3.5 Sonnet at $3/million input tokens. GPT-4o at
                $2.50/million. Actual costs vary by model and provider, but
                the ratio between lean and bloated responses remains constant:
                a 10x size difference is a 10x cost difference.
              </p>
            </div>
          </div>
        </section>

        {/* ===== FIVE BLOAT PATTERNS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              Five Response Bloat Patterns That Cost Agents Money
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              We analyzed API responses across 500+ businesses in the
              AgentHermes database. These five patterns account for 90% of
              unnecessary token consumption.
            </p>

            <div className="space-y-4 mb-8">
              {bloatPatterns.map((item, i) => (
                <div
                  key={item.pattern}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                      {i + 1}
                    </div>
                    <h3 className="font-bold text-zinc-100 text-sm">
                      {item.pattern}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3 pl-8">
                    {item.description}
                  </p>
                  <div className="ml-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <p className="text-xs text-emerald-400 font-medium mb-1">
                        Fix
                      </p>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {item.fix}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                      <p className="text-xs text-blue-400 font-medium mb-1">
                        Savings
                      </p>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {item.savings}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SCORING IMPACT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              How Token Efficiency Affects Your Agent Readiness Score
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The AgentHermes 9-dimension scoring framework does not have a
                dedicated &ldquo;token efficiency&rdquo; dimension — but
                response quality affects four dimensions that collectively
                account for 48% of the total score. APIs that return concise,
                well-structured responses score higher across the board.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {dimensionImpact.map((dim) => {
                const colors = getColorClasses(dim.color)
                return (
                  <div
                    key={dim.dimension}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <dim.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-100">
                          {dim.dimension}
                        </h3>
                        <p className="text-xs text-zinc-500">
                          Weight: {dim.weight}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {dim.impact}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                For deeper analysis of the{' '}
                <Link
                  href="/blog/data-quality-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  D6 Data Quality dimension
                </Link>{' '}
                and the{' '}
                <Link
                  href="/blog/agent-experience-dimension"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  D9 Agent Experience dimension
                </Link>
                , see our dedicated deep dives. Both dimensions reward the
                same outcome: structured, minimal, consistent responses that
                agents can process efficiently.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE STRIPE BENCHMARK ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              The Stripe Benchmark: What Lean Looks Like
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Stripe is the gold standard for token-efficient API responses.
                A typical Stripe charge response contains about 200 tokens of
                clean JSON: the charge ID, amount, currency, status, and
                payment method. No HTML. No marketing copy. No unnecessary
                nesting. Every field serves a purpose.
              </p>
              <p>
                Compare this to a legacy payment gateway that returns the same
                charge information wrapped in XML with namespaces,
                envelope elements, status messages, and verbose field names.
                The same information — &ldquo;charge succeeded, here is the
                ID&rdquo; — costs 8-10x more tokens to process.
              </p>
              <p>
                This is not theoretical. Stripe scores 68 on the AgentHermes
                scale, among the highest we have measured. Their API was not
                designed for AI agents — it was designed for developers. But
                the same qualities that make an API developer-friendly make it
                agent-friendly:{' '}
                <strong className="text-zinc-100">
                  clean structure, minimal responses, consistent schemas, and
                  proper error handling
                </strong>
                .
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <h3 className="font-bold text-emerald-400 mb-3 text-sm">
                  Stripe-style response (~200 tokens)
                </h3>
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">
{`{
  "id": "ch_1abc",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded",
  "payment_method": "pm_card"
}`}
                  </pre>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
                <h3 className="font-bold text-red-400 mb-3 text-sm">
                  Legacy-style response (~1500 tokens)
                </h3>
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">
{`<soap:Envelope xmlns:soap="...">
  <soap:Body>
    <ChargeResponse>
      <Status>
        <Code>200</Code>
        <Message>OK</Message>
        <Description>
          Transaction processed
          successfully...
        </Description>
      </Status>
      <!-- 40 more lines -->
    </ChargeResponse>
  </soap:Body>
</soap:Envelope>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTENT NEGOTIATION TIE-IN ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-500" />
              Content Negotiation: Let Agents Choose Their Format
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The most agent-friendly approach is{' '}
                <Link
                  href="/blog/content-negotiation-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  content negotiation
                </Link>
                . Let the caller specify what format they want via the{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  Accept
                </code>{' '}
                header. An agent sends{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  Accept: application/json
                </code>{' '}
                and gets minimal JSON. A browser sends{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  Accept: text/html
                </code>{' '}
                and gets a rendered page. Same endpoint, right format for each
                consumer.
              </p>
              <p>
                This also applies to error responses. When an agent receives a
                404, it should get{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  {`{ "error": "not_found", "message": "Resource does not exist" }`}
                </code>{' '}
                (about 15 tokens), not a full HTML 404 page with navigation,
                search box, and footer (2000+ tokens). The information content
                is identical. The token cost is 100x different.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-blue-400">
                  Implementation tip:
                </strong>{' '}
                Check the User-Agent and Accept headers on incoming requests.
                If the caller identifies as an AI agent or requests
                application/json, return minimal JSON. This costs nothing to
                implement and immediately makes your API cheaper for agents to
                use.
              </p>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section
          id="faq"
          className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50"
        >
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
                  <h3 className="text-base font-bold text-zinc-100 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== RELATED ARTICLES ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Continue Reading
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title:
                    'D6 Data Quality: The Dimension That Rewards Clean Data',
                  href: '/blog/data-quality-agent-readiness',
                  tag: 'Dimension Deep Dive',
                  tagColor: 'blue',
                },
                {
                  title:
                    'D9 Agent Experience: The Newest Dimension Explained',
                  href: '/blog/agent-experience-dimension',
                  tag: 'Dimension Deep Dive',
                  tagColor: 'purple',
                },
                {
                  title:
                    'Content Negotiation: Let Your API Speak Every Format',
                  href: '/blog/content-negotiation-agent-readiness',
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
              How lean are your API responses?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run a free Agent Readiness Scan to see how your API scores on
              data quality, response structure, and agent experience. Find out
              if your responses are costing agents unnecessary tokens.
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
