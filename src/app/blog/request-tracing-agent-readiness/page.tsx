import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Bug,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  Globe,
  HelpCircle,
  Layers,
  Lightbulb,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Request Tracing and Agent Readiness: Why X-Request-ID Is the Header That Builds Agent Trust | AgentHermes',
  description:
    'X-Request-ID enables debugging across agent-API interactions. When an agent gets a 500, it needs a request ID to report the issue. Without it: "something broke." With it: "request abc123 failed." 1 line of middleware. Immediate D9 score improvement.',
  keywords: [
    'request tracing X-Request-ID agent readiness',
    'X-Request-ID header',
    'agent API debugging',
    'request tracing API',
    'agent experience header',
    'API request ID',
    'agent trust scoring',
    'D9 agent experience',
    'structured error response',
  ],
  openGraph: {
    title:
      'Request Tracing and Agent Readiness: Why X-Request-ID Is the Header That Builds Agent Trust',
    description:
      'X-Request-ID is the single most impactful header for agent trust. 1 line of middleware. Immediate score improvement.',
    url: 'https://agenthermes.ai/blog/request-tracing-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Request Tracing and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Request Tracing and Agent Readiness: Why X-Request-ID Builds Agent Trust',
    description:
      'When an agent gets a 500, it needs a request ID to report the issue. 1 line of middleware changes everything.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/request-tracing-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const comparisonRows = [
  {
    scenario: 'Agent gets HTTP 500',
    without: '"The API returned an error." (useless to the provider)',
    with: '"Request req_abc123 failed with 500 at 14:32:07 UTC." (actionable)',
  },
  {
    scenario: 'Agent retries a failed call',
    without: 'Provider sees duplicate requests with no correlation',
    with: 'Provider sees retry chain: req_abc123 -> req_abc124, same operation',
  },
  {
    scenario: 'Agent reports a bug',
    without: '"Your API is broken" — no way to find the specific failure in logs',
    with: '"Request req_abc123 returned invalid data" — provider finds it in seconds',
  },
  {
    scenario: 'Rate limit hit',
    without: 'Agent knows it was throttled but cannot reference which request',
    with: 'Agent includes request ID in backoff logic, resumes exactly where it stopped',
  },
  {
    scenario: 'Billing dispute',
    without: '"I was charged for a failed request" — no proof',
    with: '"Request req_abc123 returned 500 but was billed" — provider can verify',
  },
]

const implementationExamples = [
  {
    language: 'Express.js',
    code: `app.use((req, res, next) => {
  const id = req.headers['x-request-id']
    || crypto.randomUUID();
  res.setHeader('X-Request-ID', id);
  next();
});`,
    color: 'emerald',
  },
  {
    language: 'Next.js Middleware',
    code: `export function middleware(req) {
  const id = req.headers.get('x-request-id')
    || crypto.randomUUID();
  const res = NextResponse.next();
  res.headers.set('X-Request-ID', id);
  return res;
}`,
    color: 'blue',
  },
  {
    language: 'Python FastAPI',
    code: `@app.middleware("http")
async def add_request_id(request, call_next):
    rid = request.headers.get(
      "x-request-id", str(uuid4()))
    response = await call_next(request)
    response.headers["X-Request-ID"] = rid
    return response`,
    color: 'purple',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is X-Request-ID?',
    answer:
      'X-Request-ID is an HTTP header that assigns a unique identifier to every API request. When included in both the request and response, it creates a traceable link between a specific API call and its outcome. The client (or agent) can reference this ID when reporting issues, and the server can use it to locate the exact log entry for that request. It is not part of any HTTP specification — it is a convention that has become a de facto standard among well-designed APIs.',
  },
  {
    question: 'Does AgentHermes check for X-Request-ID?',
    answer:
      'Yes. The AgentHermes scanner checks for X-Request-ID in response headers as part of Dimension 9: Agent Experience (weight: 0.10). APIs that return X-Request-ID on every response receive a score boost in D9. This is one of the easiest score improvements available — a single line of middleware can add it to every response.',
  },
  {
    question: 'Should I generate the ID or let the client send it?',
    answer:
      'Best practice is to accept a client-provided X-Request-ID if present and generate one if not. This is the pattern Stripe uses: if the agent sends its own request ID, Stripe echoes it back; if not, Stripe generates one. This gives agents the ability to correlate requests on their side while ensuring every request has an ID regardless.',
  },
  {
    question: 'Is X-Request-ID the same as a correlation ID?',
    answer:
      'They serve similar purposes but at different scopes. X-Request-ID identifies a single HTTP request-response pair. A correlation ID (sometimes X-Correlation-ID) tracks a logical operation across multiple services or requests. For agent readiness, X-Request-ID is the minimum requirement. If your architecture involves multiple microservices, adding X-Correlation-ID for cross-service tracing is a valuable addition.',
  },
  {
    question: 'Which major APIs include X-Request-ID?',
    answer:
      'Stripe includes it on every response (as Request-Id). Twilio returns it on every API call. GitHub includes it as X-GitHub-Request-Id. Shopify returns X-Request-Id on all admin API calls. AWS returns x-amzn-RequestId on every response. These are among the highest-scoring APIs in our scans — not coincidentally.',
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

export default function RequestTracingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Request Tracing and Agent Readiness: Why X-Request-ID Is the Header That Builds Agent Trust',
    description:
      'X-Request-ID enables debugging across agent-API interactions. When an agent gets a 500, it needs a request ID to report the issue. 1 line of middleware. Immediate D9 score improvement.',
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
      'https://agenthermes.ai/blog/request-tracing-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'request tracing X-Request-ID agent readiness, agent API debugging, D9 agent experience, structured error response',
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
          name: 'Request Tracing and Agent Readiness',
          item: 'https://agenthermes.ai/blog/request-tracing-agent-readiness',
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
      title="Request Tracing and Agent Readiness: Why X-Request-ID Is the Header That Builds Agent Trust"
      shareUrl="https://agenthermes.ai/blog/request-tracing-agent-readiness"
      currentHref="/blog/request-tracing-agent-readiness"
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
                Request Tracing &amp; Agent Readiness
              </span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                <Terminal className="h-3.5 w-3.5" />
                Technical Deep Dive
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                Quick Win
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Request Tracing and Agent Readiness:{' '}
              <span className="text-emerald-400">
                Why X-Request-ID Is the Header That Builds Agent Trust
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              An AI agent calls your API and gets a 500 error. Without{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-base">
                X-Request-ID
              </code>
              , the agent can only report &ldquo;something broke.&rdquo; With
              it, the agent reports &ldquo;request{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-base">
                req_abc123
              </code>{' '}
              failed.&rdquo; One is noise. The other is actionable
              intelligence. The difference is one line of middleware.
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
                    10 min read
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
              <Bug className="h-5 w-5 text-red-500" />
              The Debugging Problem Agents Cannot Solve
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                When a human developer hits an API error, they open the browser
                dev tools, inspect the network tab, check the response body,
                look at the status code, and maybe search the documentation.
                They have context. They can reason about what went wrong.
              </p>
              <p>
                An AI agent has none of that context. It sends a request. It
                gets a response. If the response is an error, the agent needs
                to decide: retry, report, or abandon. To make that decision
                intelligently — and to give the API provider actionable
                feedback — the agent needs one thing: a unique identifier that
                ties this specific request to this specific failure in the
                provider&apos;s logs.
              </p>
              <p>
                That identifier is{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  X-Request-ID
                </code>
                . It is the single most impactful header for agent-API trust,
                and most APIs do not include it.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                {
                  value: 'D9',
                  label: 'Agent Experience dimension',
                  icon: BarChart3,
                },
                {
                  value: '0.10',
                  label: 'scoring weight',
                  icon: Target,
                },
                {
                  value: '1',
                  label: 'line of middleware',
                  icon: Code2,
                },
                {
                  value: '87%',
                  label: 'of scanned APIs lack it',
                  icon: Shield,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WITH VS WITHOUT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-amber-500" />
              With vs Without X-Request-ID: Five Scenarios
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Every scenario where an agent needs to communicate about a
              specific API interaction becomes dramatically more useful with
              request tracing.
            </p>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Scenario</div>
                <div>Without X-Request-ID</div>
                <div>With X-Request-ID</div>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={row.scenario}
                  className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">
                    {row.scenario}
                  </div>
                  <div className="text-red-400">{row.without}</div>
                  <div className="text-emerald-400">{row.with}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The pattern is consistent: without request IDs, agent
                communication about failures is vague and unactionable. With
                request IDs, every interaction becomes traceable, debuggable,
                and resolvable. This is not a theoretical benefit — it is the
                difference between an agent that can self-heal and one that
                gives up.
              </p>
            </div>
          </div>
        </section>

        {/* ===== HOW AGENTHERMES SCORES IT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              How AgentHermes Scores Request Tracing
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The AgentHermes scanner evaluates X-Request-ID as part of{' '}
                <Link
                  href="/blog/agent-experience-dimension"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  Dimension 9: Agent Experience
                </Link>{' '}
                (weight: 0.10 of total score). The check is straightforward:
                does the API return an X-Request-ID (or equivalent like
                Request-Id, X-Amzn-RequestId) in its response headers?
              </p>
              <p>
                This single header contributes to D9 alongside other
                agent-experience signals like{' '}
                <Link
                  href="/blog/structured-errors-guide"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  structured error responses
                </Link>
                , consistent content types, and agent-native discovery files.
                But X-Request-ID is unique in that it has the highest
                effort-to-impact ratio of any D9 improvement: one line of
                middleware, measurable score increase, and immediate practical
                benefit for every agent that interacts with your API.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mb-8">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">
                  The Stripe standard:
                </strong>{' '}
                Stripe includes a{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">
                  Request-Id
                </code>{' '}
                header on every single API response. When an agent encounters a
                Stripe error, it can include the request ID in its retry logic,
                error reporting, or escalation to a human. This is one reason
                Stripe consistently scores in the top tier of our scans. Every
                API should follow this pattern.
              </p>
            </div>
          </div>
        </section>

        {/* ===== IMPLEMENTATION ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-emerald-500" />
              Implementation: One Line of Middleware
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Adding X-Request-ID to every response is trivial in every major
              framework. The pattern is always the same: check if the client
              sent one, generate one if not, attach it to the response.
            </p>

            <div className="space-y-4 mb-8">
              {implementationExamples.map((ex) => {
                const colors = getColorClasses(ex.color)
                return (
                  <div
                    key={ex.language}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <Terminal className={`h-4 w-4 ${colors.text}`} />
                      </div>
                      <h3 className="text-base font-bold text-zinc-100">
                        {ex.language}
                      </h3>
                    </div>
                    <pre className="p-4 rounded-lg bg-zinc-800/80 border border-zinc-700/50 overflow-x-auto">
                      <code className="text-sm text-zinc-300 leading-relaxed">
                        {ex.code}
                      </code>
                    </pre>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The implementation cost is near zero. The benefit is immediate
                and compounding: every agent that interacts with your API
                gains the ability to provide actionable error reports, trace
                request chains, and build trust in your reliability.
              </p>
            </div>
          </div>
        </section>

        {/* ===== BEYOND X-REQUEST-ID ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              Beyond X-Request-ID: The Full Error Contract
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                X-Request-ID is the foundation, but the full agent-friendly
                error contract includes three more elements that work together
                to make every failure recoverable.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: 'Structured error body',
                  detail:
                    'JSON with error code, message, and request_id. Agents parse this programmatically. HTML error pages are useless to agents. See our structured errors guide for the full pattern.',
                },
                {
                  title: 'Consistent status codes',
                  detail:
                    'Use HTTP status codes correctly: 400 for client errors, 401 for auth, 429 for rate limits, 500 for server errors. Agents use status codes to decide retry vs abandon vs re-authenticate.',
                },
                {
                  title: 'Rate limit headers',
                  detail:
                    'X-RateLimit-Remaining and Retry-After tell agents exactly when they can retry. Without these, agents either hammer your API or wait too long. Both waste resources.',
                },
                {
                  title: 'Idempotency keys',
                  detail:
                    'For mutation endpoints, accept an Idempotency-Key header so agents can safely retry failed writes without creating duplicates. Stripe pioneered this pattern.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className="font-bold text-zinc-100 mb-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                Together, these four elements form the error contract that
                separates APIs agents trust from APIs agents avoid. Our{' '}
                <Link
                  href="/blog/error-handling-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  error handling analysis
                </Link>{' '}
                goes deeper into how error design affects agent behavior. But
                X-Request-ID is where it starts — the minimum viable
                traceability that makes everything else possible.
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
                  title: 'D9 Agent Experience Dimension Explained',
                  href: '/blog/agent-experience-dimension',
                  tag: 'Scoring Framework',
                  tagColor: 'purple',
                },
                {
                  title:
                    'Structured Errors: The Guide to Agent-Friendly Error Responses',
                  href: '/blog/structured-errors-guide',
                  tag: 'Technical Guide',
                  tagColor: 'cyan',
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
              Does your API include X-Request-ID?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run a free Agent Readiness Scan to check your D9 Agent
              Experience score. We check for X-Request-ID, structured errors,
              and 25+ other signals that agents use to decide whether to trust
              your API.
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
