import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileJson,
  HelpCircle,
  Layers,
  Lock,
  RefreshCw,
  Server,
  Shield,
  ShieldX,
  Sparkles,
  Target,
  Timer,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Error Handling for AI Agents: Why Your 500 Page Matters More Than Your Homepage | AgentHermes',
  description:
    'When AI agents hit errors, they need structured JSON guidance, not pretty HTML 500 pages. Error handling impacts 20% of the Agent Readiness Score through D6 Data Quality and D9 Agent Experience. The 5 error patterns every agent-ready API needs.',
  keywords: [
    'error handling AI agents',
    'API error handling agents',
    'structured error responses',
    'agent readiness error handling',
    'JSON error responses',
    'API 500 error agents',
    '429 rate limit agents',
    'error codes AI',
    'agent experience errors',
  ],
  openGraph: {
    title: 'Error Handling for AI Agents: Why Your 500 Page Matters More Than Your Homepage',
    description:
      'Agents need structured error JSON, not pretty HTML 500 pages. Error handling impacts 20% of the Agent Readiness Score. The 5 patterns every agent-ready API needs.',
    url: 'https://agenthermes.ai/blog/error-handling-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Error Handling for AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Error Handling for AI Agents: Why Your 500 Page Matters More Than Your Homepage',
    description:
      'Your 500 page is more important than your homepage for AI agents. Structured error responses = 20% of the Agent Readiness Score.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/error-handling-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const errorPatterns = [
  {
    code: '400',
    name: 'Bad Request',
    description: 'The agent sent invalid parameters. The response must tell the agent exactly which field failed and what is expected.',
    good: '{"error":"Validation failed","code":"INVALID_PARAMS","details":[{"field":"email","message":"Must be a valid email address","received":"not-an-email"}],"request_id":"req_abc123"}',
    bad: '<html><body><h1>400 Bad Request</h1></body></html>',
    agentAction: 'Agent reads the details array, fixes the specific field, and retries immediately.',
    icon: XCircle,
    color: 'amber',
  },
  {
    code: '401',
    name: 'Unauthorized',
    description: 'The agent\'s credentials are missing, expired, or invalid. The response must indicate which auth method is expected and how to refresh.',
    good: '{"error":"Token expired","code":"AUTH_EXPIRED","auth_type":"Bearer","refresh_url":"/oauth/token","request_id":"req_def456"}',
    bad: 'Redirects to /login HTML page',
    agentAction: 'Agent calls refresh_url with its refresh token, gets a new access token, and retries the original request.',
    icon: Lock,
    color: 'red',
  },
  {
    code: '403',
    name: 'Forbidden',
    description: 'The agent is authenticated but lacks permission. The response must say which permission is required and how to request it.',
    good: '{"error":"Insufficient scope","code":"FORBIDDEN","required_scope":"write:deployments","current_scopes":["read:deployments"],"request_id":"req_ghi789"}',
    bad: '<html><body><h1>Access Denied</h1><p>You do not have permission.</p></body></html>',
    agentAction: 'Agent compares current_scopes to required_scope, requests elevated permissions or reports the gap to the user.',
    icon: ShieldX,
    color: 'red',
  },
  {
    code: '404',
    name: 'Not Found',
    description: 'The requested resource does not exist. The response should confirm the resource type and suggest alternatives.',
    good: '{"error":"Product not found","code":"NOT_FOUND","resource_type":"product","resource_id":"prod_xyz","suggestion":"Use GET /products to list available products","request_id":"req_jkl012"}',
    bad: '<html><body><h1>404</h1><p>Page not found</p><a href="/">Go home</a></body></html>',
    agentAction: 'Agent reads the suggestion field, calls the alternative endpoint, and discovers the correct resource ID.',
    icon: Target,
    color: 'amber',
  },
  {
    code: '429',
    name: 'Too Many Requests',
    description: 'The agent exceeded rate limits. The response must include retry timing so the agent can schedule the next attempt precisely.',
    good: '{"error":"Rate limit exceeded","code":"RATE_LIMITED","retry_after":5,"limit":100,"remaining":0,"reset":"2026-04-16T10:05:00Z","request_id":"req_mno345"}',
    bad: '<html><body><h1>Too Many Requests</h1><p>Please try again later.</p></body></html>',
    agentAction: 'Agent reads retry_after, waits exactly 5 seconds, then retries. No guessing, no exponential backoff needed.',
    icon: Timer,
    color: 'purple',
  },
]

const scoreImpact = [
  {
    dimension: 'D6 Data Quality (10%)',
    description: 'Structured error responses directly contribute to D6. Consistent JSON envelopes with typed error codes, machine-readable details, and request IDs demonstrate data quality even in failure states.',
    points: 'Up to 3 points from error handling alone',
  },
  {
    dimension: 'D9 Agent Experience (10%)',
    description: 'Request IDs for debugging, actionable error messages, retry_after headers, and structured details arrays are all D9 signals. The difference between "Something went wrong" and a structured error object is the difference between an agent that crashes and one that self-heals.',
    points: 'Up to 4 points from error handling alone',
  },
  {
    dimension: 'D8 Reliability (13%)',
    description: 'How gracefully you fail is a reliability signal. Structured 500 errors with request IDs and incident references demonstrate operational maturity. A raw HTML stack trace demonstrates the opposite.',
    points: 'Up to 2 points from error handling patterns',
  },
]

const realWorldExamples = [
  { company: 'Stripe', score: 68, errorQuality: 'Perfect JSON on every error code. Type, code, message, param, doc_url. The gold standard.', tier: 'Silver' },
  { company: 'GitHub', score: 67, errorQuality: 'Structured JSON with message, documentation_url, and status. Missing detailed field-level validation.', tier: 'Silver' },
  { company: 'Vercel', score: 70, errorQuality: 'JSON errors with error.code, error.message, and request ID. Clean and consistent.', tier: 'Silver' },
  { company: 'Cash App', score: 12, errorQuality: 'HTML error pages on every failure. No API, no structured responses, no recovery path.', tier: 'Not Scored' },
  { company: 'Local business (avg)', score: 14, errorQuality: 'Custom 404 page with "Go back to homepage" link. No API endpoints exist to error on.', tier: 'Not Scored' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does error handling matter so much for agent readiness?',
    answer:
      'Agents encounter errors constantly — invalid parameters, expired tokens, rate limits, server issues. A human sees an error page and adapts. An agent needs structured guidance to self-correct. If your errors return HTML, the agent crashes or makes random retry decisions. Structured errors enable self-healing: the agent reads the error code, understands what went wrong, and takes the correct next action. This is worth 20% of the total score across D6 and D9.',
  },
  {
    question: 'What is the minimum viable error response for agents?',
    answer:
      'At minimum, every error response should be a JSON object with three fields: error (human-readable message), code (machine-readable error type), and request_id (for debugging). This takes 10 lines of middleware to implement and immediately lifts D6 and D9 scores. Adding details (array of field-level errors) and retry_after (for 429s) pushes it to excellent.',
  },
  {
    question: 'Should I return JSON errors for browser requests too?',
    answer:
      'Yes — or use content negotiation. If the Accept header includes application/json, return JSON. If it includes text/html, return your pretty error page. Most API frameworks support this natively. The key insight is that your API endpoints should always return JSON errors, even if your server-rendered pages return HTML errors. Agents hit API endpoints, not page routes.',
  },
  {
    question: 'How does AgentHermes test error handling?',
    answer:
      'The scanner sends intentionally malformed requests and checks the response format. It sends requests with missing auth headers to test 401 handling. It sends invalid parameters to test 400 handling. It sends requests to nonexistent paths to test 404 handling. In each case, it checks whether the response is structured JSON with error codes, or unstructured HTML. The format of the error response — not just the status code — determines the score impact.',
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

export default function ErrorHandlingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Error Handling for AI Agents: Why Your 500 Page Matters More Than Your Homepage',
    description:
      'When AI agents hit errors, they need structured JSON guidance, not pretty HTML 500 pages. Error handling directly impacts 20% of the Agent Readiness Score. The 5 error patterns every agent-ready API needs.',
    datePublished: '2026-04-16',
    dateModified: '2026-04-16',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/error-handling-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1850,
    keywords:
      'error handling AI agents, structured error responses, API error codes, agent readiness error handling',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Error Handling for AI Agents',
          item: 'https://agenthermes.ai/blog/error-handling-agent-readiness',
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
      title="Error Handling for AI Agents: Why Your 500 Page Matters More Than Your Homepage"
      shareUrl="https://agenthermes.ai/blog/error-handling-agent-readiness"
      currentHref="/blog/error-handling-agent-readiness"
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
            <span className="text-zinc-400">Error Handling for AI Agents</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <AlertTriangle className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              20% Score Impact
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Error Handling for AI Agents:{' '}
            <span className="text-emerald-400">Why Your 500 Page Matters More Than Your Homepage</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            When an AI agent hits an error on your API, it needs structured guidance — not a
            pretty HTML page with a sad robot illustration. The difference between{' '}
            <code className="text-red-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
              {'<!DOCTYPE html><title>Something went wrong</title>'}
            </code>{' '}
            and{' '}
            <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
              {'{"error":"Internal Error","code":"INTERNAL","request_id":"abc123","retry_after":5}'}
            </code>{' '}
            is <strong className="text-zinc-100">20% of the Agent Readiness Score</strong>.
          </p>

          {/* Author byline */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
            <div className="author-avatar">AH</div>
            <div>
              <div className="text-sm font-semibold text-zinc-200">AgentHermes Research</div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  April 16, 2026
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Agents Cannot Read Your Error Page
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When a human hits a 500 error, they see a branded page, maybe read a message, and
              either refresh or come back later. The experience is frustrating but manageable. When
              an AI agent hits a 500 error, it receives an HTML document where it expected JSON. It
              cannot parse it reliably. It does not know whether to retry, wait, change parameters,
              or give up. It crashes — or worse, it retries in an infinite loop, burning API quota
              and degrading your service.
            </p>
            <p>
              This is not an edge case. Agents encounter errors on{' '}
              <strong className="text-zinc-100">every integration</strong>. Authentication expires.
              Rate limits trigger. Parameters validate incorrectly. Endpoints go down. The question
              is not whether agents will hit your errors — it is whether your errors will help them
              recover or leave them stranded.
            </p>
            <p>
              Error handling directly impacts two dimensions that together carry{' '}
              <strong className="text-zinc-100">20% of the Agent Readiness Score</strong>: D6 Data
              Quality (10%) and D9 Agent Experience (10%). A third dimension, D8 Reliability (13%),
              rewards graceful degradation patterns. That means up to{' '}
              <strong className="text-zinc-100">33% of your score</strong> is influenced by how
              you fail, not just how you succeed.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '20%', label: 'Direct score impact', icon: BarChart3, color: 'text-emerald-400' },
              { value: '33%', label: 'Total influenced', icon: Target, color: 'text-amber-400' },
              { value: '5', label: 'Error codes that matter', icon: AlertTriangle, color: 'text-red-400' },
              { value: '10 LOC', label: 'Middleware to fix it', icon: Code2, color: 'text-purple-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE 5 ERROR PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-500" />
            The 5 Error Patterns Every Agent-Ready API Needs
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Every agent-facing API must handle five error codes with structured JSON responses. Not
              HTML. Not plain text. Not a redirect. Structured JSON with machine-readable fields that
              tell the agent exactly what went wrong and exactly what to do next.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {errorPatterns.map((pattern) => {
              const colors = getColorClasses(pattern.color)
              return (
                <div
                  key={pattern.code}
                  className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                        <pattern.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-100">
                          {pattern.code} {pattern.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">{pattern.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                        <p className="text-xs text-emerald-400 font-semibold mb-2 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Agent-ready response
                        </p>
                        <code className="text-xs text-zinc-400 break-all leading-relaxed block">
                          {pattern.good}
                        </code>
                      </div>
                      <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                        <p className="text-xs text-red-400 font-semibold mb-2 flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> What agents actually get
                        </p>
                        <code className="text-xs text-zinc-500 break-all leading-relaxed block">
                          {pattern.bad}
                        </code>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-400">
                        <span className="text-zinc-300 font-medium flex items-center gap-1 mb-1">
                          <RefreshCw className="h-3 w-3 text-blue-400" /> Agent recovery action:
                        </span>
                        {pattern.agentAction}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== SCORE IMPACT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Exact Score Impact: D6 + D9 + D8 = Up to 33%
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Error handling is not a single-dimension feature. It ripples across three dimensions
              of the Agent Readiness Score. Understanding where the points come from makes the
              ROI obvious — and as detailed in our{' '}
              <Link href="/blog/data-quality-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                D6 Data Quality analysis
              </Link>{' '}
              and{' '}
              <Link href="/blog/agent-experience-dimension" className="text-emerald-400 hover:text-emerald-300 underline">
                D9 Agent Experience deep dive
              </Link>, these dimensions are often the easiest to improve.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {scoreImpact.map((item) => (
              <div
                key={item.dimension}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-zinc-100">{item.dimension}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    {item.points}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REAL EXAMPLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Real-World Error Handling: From Stripe to Cash App
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The correlation between error handling quality and overall agent readiness score is
            nearly linear. Companies that return structured errors score Silver. Companies that
            return HTML errors score under 20.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Company</div>
              <div className="text-center">Score</div>
              <div className="text-center">Tier</div>
              <div>Error Quality</div>
            </div>
            {realWorldExamples.map((row, i) => {
              const scoreColor = row.score >= 60 ? 'text-emerald-400' : row.score >= 40 ? 'text-amber-400' : 'text-red-400'
              return (
                <div
                  key={row.company}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.company}</div>
                  <div className={`text-center font-mono font-bold ${scoreColor}`}>{row.score}</div>
                  <div className="text-center text-xs text-zinc-500">{row.tier}</div>
                  <div className="text-zinc-500 text-xs">{row.errorQuality}</div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The pattern is clear:</strong> Stripe returns
              perfect error JSON on every response and scores 68. Cash App returns HTML on every
              failure and scores 12. The difference is not API surface area or feature count — it
              is whether the failure path is as structured as the success path. For a deeper look
              at what makes Stripe&apos;s errors exemplary, see our{' '}
              <Link href="/blog/rate-limiting-for-agents" className="text-emerald-400 hover:text-emerald-300 underline">
                rate limiting analysis
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE MIDDLEWARE FIX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-500" />
            The 10-Line Middleware Fix
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The fix is not a rewrite. It is a single middleware function that wraps your existing
              error handling. Every request gets a request ID. Every error response gets a JSON
              envelope. Every 429 gets a retry_after header. Every 401 gets an auth_type indicator.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 mb-8">
            <p className="text-xs text-zinc-500 mb-3 font-medium">Error response envelope standard:</p>
            <pre className="text-sm text-emerald-400 overflow-x-auto leading-relaxed">
{`{
  "error": "Human-readable error message",
  "code": "MACHINE_READABLE_CODE",
  "request_id": "req_unique_identifier",
  "details": [
    {
      "field": "specific_field",
      "message": "What is wrong",
      "received": "What was sent"
    }
  ],
  "retry_after": 5,
  "doc_url": "https://docs.example.com/errors/CODE"
}`}
            </pre>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Every response gets a request ID',
                detail: 'Generate a UUID for every request. Include it in the X-Request-ID response header AND in the error JSON body. Agents use this for debugging, logging, and support escalation.',
              },
              {
                title: 'Every error is JSON, never HTML',
                detail: 'Catch all errors at the middleware level. If the Accept header indicates JSON or the request is to an API path, always return JSON. Never let framework-default HTML error pages reach API consumers.',
              },
              {
                title: 'Every 429 includes retry timing',
                detail: 'The Retry-After header is a standard HTTP header. Include it on every 429 response, plus retry_after in the JSON body. Agents use the more specific value — JSON body if available, header as fallback.',
              },
              {
                title: 'Every 401 includes auth guidance',
                detail: 'Include auth_type (Bearer, API Key, OAuth) and refresh_url (if applicable) in 401 responses. This lets agents self-heal expired credentials without human intervention.',
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
              This pattern is framework-agnostic. Express, Next.js, FastAPI, Rails, Django — every
              framework supports error middleware. The implementation takes 30 minutes. The score
              impact is 5-9 points across three dimensions. That is the highest ROI change in the
              entire Agent Readiness framework — more than adding an OpenAPI spec, more than
              publishing agent-card.json, more than building an MCP server.
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
                title: 'Data Quality: Why Structured Responses Win (D6 = 10%)',
                href: '/blog/data-quality-agent-readiness',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'Agent Experience (D9): The Dimension That Measures Usability',
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
            Test your error handling now
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Our scanner sends intentionally malformed requests to test your error responses.
            See exactly how your API handles 400, 401, 403, 404, and 429 — and how it impacts
            your Agent Readiness Score.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Scan My Error Handling
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
