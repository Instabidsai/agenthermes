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
  Globe,
  HelpCircle,
  Layers,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Zap,
  AlertTriangle,
  FileCode,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'The Definitive Guide to Structured Error Responses for AI Agents | AgentHermes',
  description:
    'The canonical error shape for AI agent APIs: {error, code, message, request_id, retry_after, details[]}. 5 HTTP status codes with perfect JSON examples, framework-specific middleware for Express, Next.js, Django, and Rails. The 10-line middleware that fixes everything.',
  keywords: [
    'structured error responses AI agents guide',
    'API error format agents',
    'JSON error response best practices',
    'AI agent error handling',
    'API error middleware',
    'structured errors REST API',
    'agent experience error responses',
    'error handling agent readiness',
  ],
  openGraph: {
    title: 'The Definitive Guide to Structured Error Responses for AI Agents',
    description:
      'The canonical error shape, 5 HTTP status codes with JSON examples, and framework middleware for Express, Next.js, Django, and Rails. The pillar page for agent error handling.',
    url: 'https://agenthermes.ai/blog/structured-errors-guide',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Definitive Guide to Structured Error Responses for AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Definitive Guide to Structured Error Responses for AI Agents',
    description:
      'The canonical error shape for agent APIs. 5 HTTP status codes, 4 framework implementations, one 10-line middleware.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/structured-errors-guide',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const statusCodes = [
  {
    code: 400,
    name: 'Bad Request',
    when: 'The agent sent invalid parameters',
    color: 'amber',
    json: `{
  "error": true,
  "code": "INVALID_PARAMETER",
  "message": "Field 'email' must be a valid email address.",
  "request_id": "req_abc123def456",
  "details": [
    {
      "field": "email",
      "value": "not-an-email",
      "constraint": "Must match pattern: *@*.*"
    }
  ]
}`,
  },
  {
    code: 401,
    name: 'Unauthorized',
    when: 'Missing or invalid API key / token',
    color: 'red',
    json: `{
  "error": true,
  "code": "AUTH_REQUIRED",
  "message": "Bearer token is missing or expired.",
  "request_id": "req_xyz789ghi012",
  "details": [
    {
      "header": "Authorization",
      "expected": "Bearer <token>",
      "docs": "https://docs.example.com/auth"
    }
  ]
}`,
  },
  {
    code: 403,
    name: 'Forbidden',
    when: 'Valid auth but insufficient permissions',
    color: 'red',
    json: `{
  "error": true,
  "code": "INSUFFICIENT_SCOPE",
  "message": "Token lacks 'orders:write' scope.",
  "request_id": "req_pqr345stu678",
  "details": [
    {
      "required_scope": "orders:write",
      "current_scopes": ["orders:read", "products:read"],
      "upgrade_url": "https://dashboard.example.com/api-keys"
    }
  ]
}`,
  },
  {
    code: 404,
    name: 'Not Found',
    when: 'Resource does not exist',
    color: 'blue',
    json: `{
  "error": true,
  "code": "NOT_FOUND",
  "message": "Product with ID 'prod_999' does not exist.",
  "request_id": "req_mno901vwx234",
  "details": [
    {
      "resource_type": "product",
      "resource_id": "prod_999",
      "suggestion": "Use GET /products to list available products."
    }
  ]
}`,
  },
  {
    code: 429,
    name: 'Too Many Requests',
    when: 'Rate limit exceeded',
    color: 'purple',
    json: `{
  "error": true,
  "code": "RATE_LIMITED",
  "message": "Rate limit exceeded. 100 requests per minute allowed.",
  "request_id": "req_jkl567yza890",
  "retry_after": 32,
  "details": [
    {
      "limit": 100,
      "window": "60s",
      "remaining": 0,
      "reset_at": "2026-04-15T14:30:32Z"
    }
  ]
}`,
  },
]

const frameworkSnippets = [
  {
    name: 'Express.js',
    language: 'javascript',
    code: `// middleware/agentErrors.js
function agentErrorHandler(err, req, res, next) {
  const requestId = req.headers['x-request-id'] || crypto.randomUUID()
  const status = err.status || 500
  res.status(status).json({
    error: true,
    code: err.code || 'INTERNAL_ERROR',
    message: err.expose ? err.message : 'An internal error occurred.',
    request_id: requestId,
    ...(err.retryAfter && { retry_after: err.retryAfter }),
    ...(err.details && { details: err.details }),
  })
}
// app.use(agentErrorHandler) — after all routes`,
  },
  {
    name: 'Next.js API Route',
    language: 'typescript',
    code: `// lib/apiError.ts
export function apiError(
  status: number, code: string, message: string,
  details?: Record<string, unknown>[]
) {
  const requestId = crypto.randomUUID()
  return Response.json(
    { error: true, code, message, request_id: requestId,
      ...(details && { details }) },
    { status, headers: { 'X-Request-ID': requestId } }
  )
}
// Usage: return apiError(400, 'INVALID_PARAM', 'Email required')`,
  },
  {
    name: 'Django REST Framework',
    language: 'python',
    code: `# middleware/agent_errors.py
import uuid
from rest_framework.views import exception_handler

def agent_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        request_id = str(uuid.uuid4())
        response.data = {
            "error": True,
            "code": getattr(exc, "default_code", "ERROR"),
            "message": response.data.get("detail", str(exc)),
            "request_id": request_id,
        }
        response["X-Request-ID"] = request_id
    return response`,
  },
  {
    name: 'Rails API',
    language: 'ruby',
    code: `# app/controllers/concerns/agent_errors.rb
module AgentErrors
  extend ActiveSupport::Concern
  included do
    rescue_from StandardError do |e|
      request_id = request.request_id
      status = e.respond_to?(:status) ? e.status : 500
      render json: {
        error: true,
        code: e.class.name.demodulize.underscore.upcase,
        message: Rails.env.production? ? "Internal error" : e.message,
        request_id: request_id
      }, status: status
    end
  end
end`,
  },
]

const antiPatterns = [
  { bad: 'HTML error pages for API routes', why: 'Agents parse JSON, not HTML. A 500 that returns an HTML stack trace is unrecoverable.' },
  { bad: 'Generic "Something went wrong"', why: 'Agent cannot distinguish auth failure from validation error from server crash. It retries blindly.' },
  { bad: 'Missing request_id', why: 'When an agent reports a problem, there is no way to correlate it with your server logs.' },
  { bad: 'No retry_after on 429', why: 'Agent guesses wait time. Guesses wrong. Hammers your server or gives up too early.' },
  { bad: 'Error details in message string', why: '"email is invalid and name must be 3 chars" — agent must parse natural language instead of iterating a typed array.' },
  { bad: 'Returning 200 with error body', why: 'Agent sees success status code and tries to use the "data." Fails downstream with confusing cascading errors.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do AI agents need structured errors more than human developers?',
    answer:
      'Human developers read error messages and make judgment calls. They see "invalid email" and know to fix the email field. AI agents parse JSON programmatically. They need a typed code field to branch logic, a details array to iterate specific failures, and a retry_after field to know when to try again. Without structure, agents either retry blindly or give up entirely — both waste resources.',
  },
  {
    question: 'What is the minimum viable error response for agent compatibility?',
    answer:
      'Three fields: error (boolean true), code (machine-readable string like INVALID_PARAMETER), and message (human-readable explanation). This takes 5 minutes to implement and immediately improves D6 Data Quality and D9 Agent Experience scores. Adding request_id and details is the next step, and retry_after is essential for any rate-limited endpoint.',
  },
  {
    question: 'How does AgentHermes detect error quality?',
    answer:
      'During a scan, AgentHermes sends intentionally malformed requests (missing auth, invalid parameters, non-existent resources) and analyzes the responses. It checks: Is the response JSON? Does it have a consistent shape? Is the HTTP status code correct (not 200-with-error-body)? Is there a request_id? Is retry_after present on 429s? Each check contributes to D6 Data Quality (0.10 weight) and D9 Agent Experience (0.10 weight).',
  },
  {
    question: 'Should error responses include stack traces?',
    answer:
      'Never in production. Stack traces leak internal architecture (file paths, library versions, database schemas) which is a security risk (D7 Security). In development/sandbox, include them in a separate debug field that is stripped in production. The message field should always contain a safe, actionable description.',
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

export default function StructuredErrorsGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Definitive Guide to Structured Error Responses for AI Agents',
    description:
      'The canonical error shape for AI agent APIs, 5 HTTP status codes with perfect JSON examples, and framework-specific middleware for Express, Next.js, Django, and Rails.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/structured-errors-guide',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Guide',
    wordCount: 1900,
    keywords:
      'structured error responses AI agents, API error format, JSON error response, agent experience, error handling agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Structured Error Responses Guide',
          item: 'https://agenthermes.ai/blog/structured-errors-guide',
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
      title="The Definitive Guide to Structured Error Responses for AI Agents"
      shareUrl="https://agenthermes.ai/blog/structured-errors-guide"
      currentHref="/blog/structured-errors-guide"
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
            <span className="text-zinc-400">Structured Error Responses Guide</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Terminal className="h-3.5 w-3.5" />
              Technical Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Pillar Page
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            The Definitive Guide to Structured Error Responses{' '}
            <span className="text-emerald-400">for AI Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Structured error responses are the single fastest way to improve your Agent Readiness Score. The canonical shape is six fields: <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-base">error</code>, <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-base">code</code>, <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-base">message</code>, <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-base">request_id</code>, <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-base">retry_after</code>, and <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-base">details[]</code>. This guide shows you the exact shape, five HTTP status codes with production-ready JSON, and copy-paste middleware for four frameworks.
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
                  15 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY ERRORS MATTER ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Why Error Quality Determines Agent Success or Failure
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When a human developer gets a 400 error, they read the message, check the docs, and fix their request. When an AI agent gets a 400 error, it needs machine-readable structure to decide what to do next. Is this a validation error it can fix by adjusting parameters? An auth error that requires a different token? A rate limit that requires waiting? Without structured fields, the agent is guessing.
            </p>
            <p>
              Error quality impacts two dimensions of the Agent Readiness Score directly:{' '}
              <Link href="/blog/data-quality-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                D6 Data Quality
              </Link>{' '}
              (0.10 weight) and{' '}
              <Link href="/blog/agent-experience-dimension" className="text-emerald-400 hover:text-emerald-300 underline">
                D9 Agent Experience
              </Link>{' '}
              (0.10 weight). Together that is 20% of your total score. Fixing error responses is the highest-ROI change most APIs can make — and it takes less than an hour.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '20%', label: 'of score affected by error quality', icon: BarChart3 },
              { value: '73%', label: 'of APIs return HTML on errors', icon: Code2 },
              { value: '6', label: 'fields in canonical error shape', icon: Layers },
              { value: '<1hr', label: 'to implement in any framework', icon: Zap },
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

      {/* ===== THE CANONICAL SHAPE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <FileCode className="h-5 w-5 text-emerald-500" />
            The Canonical Error Shape
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every error response from your API should match this shape. Six fields, all typed, all predictable. Agents parse this shape once and handle every error your API can produce.
          </p>

          <div className="rounded-xl border border-emerald-500/20 overflow-hidden mb-6">
            <div className="bg-zinc-800/50 px-4 py-2 text-xs font-mono text-emerald-400 border-b border-zinc-700/50">
              Canonical Error Response Shape
            </div>
            <pre className="p-4 text-sm text-zinc-300 leading-relaxed overflow-x-auto bg-zinc-900/80">
              <code>{`{
  "error": true,                    // Always true on errors. Agents check this first.
  "code": "MACHINE_READABLE_CODE",  // Constant string. Never changes for same error type.
  "message": "Human-readable text.", // Safe for logs. No internal details.
  "request_id": "req_abc123",       // Unique per request. Links to your server logs.
  "retry_after": 30,                // Seconds. Only on 429. Agents use this to wait.
  "details": [                      // Array of objects. Varies by error type.
    {
      "field": "email",
      "constraint": "Must be valid email"
    }
  ]
}`}</code>
            </pre>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { field: 'error', type: 'boolean', required: true, purpose: 'Always true. Lets agents distinguish error responses from successful ones without parsing status codes (which some HTTP libraries swallow).' },
              { field: 'code', type: 'string', required: true, purpose: 'Machine-readable constant like INVALID_PARAMETER, AUTH_REQUIRED, RATE_LIMITED. Agent switches on this value. Never changes for the same error type.' },
              { field: 'message', type: 'string', required: true, purpose: 'Human-readable explanation safe for logging. Never contains stack traces, file paths, or internal system details.' },
              { field: 'request_id', type: 'string', required: true, purpose: 'Unique per request (UUID or prefixed ID). Lets agents and support teams correlate errors with server-side logs.' },
              { field: 'retry_after', type: 'number', required: false, purpose: 'Seconds until the agent should retry. Required on 429 responses. Optional on 503 (maintenance). Agents use this instead of guessing.' },
              { field: 'details', type: 'array', required: false, purpose: 'Array of objects with error-specific context. Validation errors list fields and constraints. Auth errors list required scopes. Agents iterate this programmatically.' },
            ].map((item) => (
              <div
                key={item.field}
                className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="shrink-0">
                  <code className="text-emerald-400 text-sm font-bold">{item.field}</code>
                  <div className="text-xs text-zinc-600 mt-0.5">{item.type}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {item.required ? (
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">required</span>
                    ) : (
                      <span className="text-xs font-medium text-zinc-500 bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded">optional</span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.purpose}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5 STATUS CODES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            Five HTTP Status Codes with Production-Ready JSON
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These five status codes cover 95% of agent-facing errors. Each example shows the exact JSON your API should return. Copy these into your error handler and customize the messages.
          </p>

          <div className="space-y-6 mb-8">
            {statusCodes.map((sc) => {
              const colors = getColorClasses(sc.color)
              return (
                <div
                  key={sc.code}
                  className="rounded-xl border border-zinc-800/80 overflow-hidden"
                >
                  <div className="flex items-center justify-between bg-zinc-800/50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-bold ${colors.text}`}>{sc.code}</span>
                      <span className="text-sm font-medium text-zinc-300">{sc.name}</span>
                    </div>
                    <span className="text-xs text-zinc-500">{sc.when}</span>
                  </div>
                  <pre className="p-4 text-xs text-zinc-300 leading-relaxed overflow-x-auto bg-zinc-900/80">
                    <code>{sc.json}</code>
                  </pre>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== ANTI-PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Six Anti-Patterns That Kill Agent Experience
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We see these in 73% of the 500+ APIs we have scanned. Each one causes agents to retry incorrectly, waste tokens, or abandon the interaction entirely.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-[1fr_2fr] bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Anti-Pattern</div>
              <div>Why It Breaks Agents</div>
            </div>
            {antiPatterns.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_2fr] p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-red-400">{row.bad}</div>
                <div className="text-zinc-400">{row.why}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FRAMEWORK IMPLEMENTATIONS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            Framework-Specific Middleware
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Copy-paste implementations for the four most common API frameworks. Each one produces the canonical error shape described above. Total implementation time: 10-15 minutes including testing.
          </p>

          <div className="space-y-6 mb-8">
            {frameworkSnippets.map((fw) => (
              <div
                key={fw.name}
                className="rounded-xl border border-zinc-800/80 overflow-hidden"
              >
                <div className="flex items-center justify-between bg-zinc-800/50 px-4 py-3">
                  <span className="text-sm font-bold text-zinc-200">{fw.name}</span>
                  <span className="text-xs text-zinc-500">{fw.language}</span>
                </div>
                <pre className="p-4 text-xs text-zinc-300 leading-relaxed overflow-x-auto bg-zinc-900/80">
                  <code>{fw.code}</code>
                </pre>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The 10-line version:</strong> If you can only do one thing, add an error handler that catches all exceptions, wraps them in the canonical shape, and returns JSON with the correct HTTP status code. The Express middleware above is literally 10 lines. That alone will improve your D6 and D9 scores measurably on the next{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                AgentHermes scan
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW THIS CONNECTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            How Error Quality Connects to the 9 Dimensions
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Error handling is not an isolated concern — it touches half the scoring dimensions. Here is how structured errors ripple through your Agent Readiness Score:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { dimension: 'D2 API Quality (0.15)', impact: 'Correct HTTP status codes and JSON content type. Auth-protected endpoints that return 401+JSON score 87% of a 200.', color: 'emerald' },
              { dimension: 'D6 Data Quality (0.10)', impact: 'Typed fields, consistent shape, machine-parseable details array. Agents can programmatically handle every error.', color: 'blue' },
              { dimension: 'D7 Security (0.12)', impact: 'No stack traces, no internal paths, no database errors in production responses. Safe message field.', color: 'amber' },
              { dimension: 'D8 Reliability (0.13)', impact: 'Proper 429 with retry_after headers. Status page links in 503 responses. Request IDs for incident correlation.', color: 'purple' },
              { dimension: 'D9 Agent Experience (0.10)', impact: 'The overall "can an agent use this API without human help?" dimension. Structured errors are the foundation.', color: 'cyan' },
              { dimension: 'Combined Impact', impact: 'Error quality touches 0.60 of your total score weight. No other single change affects this many dimensions.', color: 'emerald' },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.dimension}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className={`font-bold text-sm mb-2 ${colors.text}`}>{item.dimension}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.impact}</p>
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
                title: 'Error Handling and Agent Readiness',
                href: '/blog/error-handling-agent-readiness',
                tag: 'Deep Dive',
                tagColor: 'purple',
              },
              {
                title: 'Data Quality and Agent Readiness',
                href: '/blog/data-quality-agent-readiness',
                tag: 'Deep Dive',
                tagColor: 'purple',
              },
              {
                title: 'Agent Experience Dimension Explained',
                href: '/blog/agent-experience-dimension',
                tag: 'Framework',
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
            See how your error responses score
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            AgentHermes scans your API error responses across all 9 dimensions. Run a free scan to see where your errors help — and where they hurt.
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
