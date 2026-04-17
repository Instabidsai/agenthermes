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
  FileWarning,
  Globe,
  HelpCircle,
  Layers,
  RefreshCcw,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  X,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'The Complete HTTP Error Code Reference for Agent Readiness | AgentHermes',
  description:
    'Every HTTP status code an AI agent encounters, what it means for agent readiness, and what the agent-ready response should look like. The definitive reference for developers building agent-friendly APIs.',
  keywords: [
    'HTTP error codes agent readiness reference',
    'HTTP status codes AI agent',
    'agent-ready error responses',
    'structured error handling API',
    'JSON error responses agents',
    'API error codes reference',
    'agent-friendly HTTP errors',
    'structured errors guide',
    '4xx 5xx agent readiness',
    'HTTP error code best practices',
  ],
  openGraph: {
    title: 'The Complete HTTP Error Code Reference for Agent Readiness',
    description:
      'Every HTTP status code, what it means for agents, and what the agent-ready JSON response should look like. The definitive developer reference.',
    url: 'https://agenthermes.ai/blog/error-codes-reference',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HTTP Error Code Reference for Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTTP Error Code Reference for Agent Readiness',
    description:
      'The complete reference: every HTTP status code, agent-ready JSON response format, and scoring impact.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/error-codes-reference',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface ErrorCode {
  code: number
  name: string
  meaning: string
  agentImpact: string
  agentReadyResponse: string
  dimension: string
  severity: 'critical' | 'high' | 'medium' | 'low'
}

const successCodes: ErrorCode[] = [
  {
    code: 200,
    name: 'OK',
    meaning: 'Request succeeded with response body',
    agentImpact: 'Agent receives data and proceeds. The baseline for all agent interactions.',
    agentReadyResponse: '{ "data": { ... }, "meta": { "request_id": "req_abc123", "timestamp": "2026-04-15T10:00:00Z" } }',
    dimension: 'D2 API Quality',
    severity: 'low',
  },
  {
    code: 201,
    name: 'Created',
    meaning: 'Resource created successfully',
    agentImpact: 'Agent confirms creation and stores the returned resource ID for future operations.',
    agentReadyResponse: '{ "data": { "id": "res_xyz789", "created_at": "..." }, "meta": { "request_id": "req_abc123" } }',
    dimension: 'D2 API Quality',
    severity: 'low',
  },
  {
    code: 204,
    name: 'No Content',
    meaning: 'Action succeeded, no response body',
    agentImpact: 'Agent confirms success by status code alone. Used for DELETEs and updates where no data needs to return.',
    agentReadyResponse: '(empty body — agent reads status code)',
    dimension: 'D2 API Quality',
    severity: 'low',
  },
]

const redirectCodes: ErrorCode[] = [
  {
    code: 301,
    name: 'Moved Permanently',
    meaning: 'Resource URL has changed permanently',
    agentImpact: 'Agent must follow Location header and update its stored URL. Failure to follow = broken integration.',
    agentReadyResponse: 'Location: https://api.example.com/v2/resource\n{ "error": "moved_permanently", "new_url": "https://api.example.com/v2/resource" }',
    dimension: 'D8 Reliability',
    severity: 'medium',
  },
  {
    code: 302,
    name: 'Found (Temporary Redirect)',
    meaning: 'Resource temporarily at different URL',
    agentImpact: 'Agent follows redirect but keeps original URL. Common in OAuth flows. Agents need to handle redirect chains.',
    agentReadyResponse: 'Location: https://auth.example.com/callback\n(Agent follows automatically)',
    dimension: 'D8 Reliability',
    severity: 'medium',
  },
  {
    code: 304,
    name: 'Not Modified',
    meaning: 'Cached version is still valid',
    agentImpact: 'Agent uses cached data. Saves bandwidth and latency. Agents that send If-None-Match headers get faster responses.',
    agentReadyResponse: '(empty body — agent uses cached version)',
    dimension: 'D8 Reliability',
    severity: 'low',
  },
  {
    code: 307,
    name: 'Temporary Redirect',
    meaning: 'Same as 302 but preserves HTTP method',
    agentImpact: 'Agent re-sends the same request (including POST body) to the new Location. Critical for payment flows where method matters.',
    agentReadyResponse: 'Location: https://api.example.com/v2/payments\n(Agent re-sends with same method and body)',
    dimension: 'D8 Reliability',
    severity: 'medium',
  },
]

const clientErrorCodes: ErrorCode[] = [
  {
    code: 400,
    name: 'Bad Request',
    meaning: 'Request is malformed or missing required fields',
    agentImpact: 'Agent needs specific field-level errors to self-correct. HTML error pages or generic "bad request" kill agent workflows.',
    agentReadyResponse: '{ "error": "validation_error", "code": "INVALID_INPUT", "message": "2 validation errors", "details": [{ "field": "email", "issue": "invalid format" }, { "field": "amount", "issue": "must be positive" }], "request_id": "req_abc123" }',
    dimension: 'D9 Agent Experience',
    severity: 'critical',
  },
  {
    code: 401,
    name: 'Unauthorized',
    meaning: 'Authentication missing or invalid',
    agentImpact: 'Agent knows it needs to authenticate. Agent-ready response tells the agent HOW to authenticate (Bearer token, API key, OAuth flow URL).',
    agentReadyResponse: '{ "error": "unauthorized", "code": "AUTH_REQUIRED", "message": "Valid API key required", "auth_methods": ["bearer_token", "api_key"], "docs_url": "https://docs.example.com/auth", "request_id": "req_abc123" }',
    dimension: 'D7 Security',
    severity: 'critical',
  },
  {
    code: 403,
    name: 'Forbidden',
    meaning: 'Authenticated but not authorized for this resource',
    agentImpact: 'Agent is logged in but lacks permission. Must tell agent which permission is missing and how to request it.',
    agentReadyResponse: '{ "error": "forbidden", "code": "INSUFFICIENT_PERMISSIONS", "message": "Requires write:orders scope", "required_scope": "write:orders", "current_scopes": ["read:orders"], "upgrade_url": "https://app.example.com/settings/api", "request_id": "req_abc123" }',
    dimension: 'D7 Security',
    severity: 'high',
  },
  {
    code: 404,
    name: 'Not Found',
    meaning: 'Resource does not exist',
    agentImpact: 'Agent needs to know if the resource never existed vs was deleted. Suggest alternative endpoints or search functionality.',
    agentReadyResponse: '{ "error": "not_found", "code": "RESOURCE_NOT_FOUND", "message": "Order ord_123 not found", "resource_type": "order", "suggestion": "Use GET /orders to list available orders", "request_id": "req_abc123" }',
    dimension: 'D9 Agent Experience',
    severity: 'high',
  },
  {
    code: 405,
    name: 'Method Not Allowed',
    meaning: 'HTTP method not supported on this endpoint',
    agentImpact: 'Agent used wrong verb. Response must include Allow header listing valid methods.',
    agentReadyResponse: 'Allow: GET, POST\n{ "error": "method_not_allowed", "code": "INVALID_METHOD", "message": "PATCH not supported. Use PUT for full updates.", "allowed_methods": ["GET", "POST", "PUT"], "request_id": "req_abc123" }',
    dimension: 'D2 API Quality',
    severity: 'medium',
  },
  {
    code: 409,
    name: 'Conflict',
    meaning: 'Request conflicts with current resource state',
    agentImpact: 'Agent tried to create a duplicate or update stale data. Must include the conflicting field and current state.',
    agentReadyResponse: '{ "error": "conflict", "code": "DUPLICATE_RESOURCE", "message": "Email already registered", "conflicting_field": "email", "existing_resource_id": "usr_456", "request_id": "req_abc123" }',
    dimension: 'D9 Agent Experience',
    severity: 'high',
  },
  {
    code: 422,
    name: 'Unprocessable Entity',
    meaning: 'Request is valid JSON but semantically wrong',
    agentImpact: 'Agent sent valid syntax but business logic rejected it. Needs specific business rule explanation.',
    agentReadyResponse: '{ "error": "unprocessable", "code": "BUSINESS_RULE_VIOLATION", "message": "Cannot schedule appointment in the past", "rule": "appointment_date must be > now()", "earliest_valid": "2026-04-16T09:00:00Z", "request_id": "req_abc123" }',
    dimension: 'D9 Agent Experience',
    severity: 'high',
  },
  {
    code: 429,
    name: 'Too Many Requests',
    meaning: 'Rate limit exceeded',
    agentImpact: 'Agent must wait and retry. Without Retry-After header, agent guesses and hammers your API. With it, agent waits precisely.',
    agentReadyResponse: 'Retry-After: 30\nX-RateLimit-Limit: 100\nX-RateLimit-Remaining: 0\nX-RateLimit-Reset: 1713200000\n{ "error": "rate_limited", "code": "RATE_LIMIT_EXCEEDED", "message": "100 requests per minute exceeded", "retry_after_seconds": 30, "request_id": "req_abc123" }',
    dimension: 'D8 Reliability',
    severity: 'critical',
  },
]

const serverErrorCodes: ErrorCode[] = [
  {
    code: 500,
    name: 'Internal Server Error',
    meaning: 'Unhandled server error',
    agentImpact: 'Agent cannot proceed. Must include request_id for debugging and suggest retry. Never expose stack traces.',
    agentReadyResponse: '{ "error": "internal_error", "code": "SERVER_ERROR", "message": "An unexpected error occurred", "request_id": "req_abc123", "retry": true, "retry_after_seconds": 5, "status_url": "https://status.example.com" }',
    dimension: 'D8 Reliability',
    severity: 'critical',
  },
  {
    code: 502,
    name: 'Bad Gateway',
    meaning: 'Upstream service returned invalid response',
    agentImpact: 'Agent should retry after delay. Often transient. Include which upstream is down if possible.',
    agentReadyResponse: '{ "error": "bad_gateway", "code": "UPSTREAM_ERROR", "message": "Payment processor temporarily unavailable", "retry": true, "retry_after_seconds": 10, "status_url": "https://status.example.com", "request_id": "req_abc123" }',
    dimension: 'D8 Reliability',
    severity: 'high',
  },
  {
    code: 503,
    name: 'Service Unavailable',
    meaning: 'Server is down for maintenance or overloaded',
    agentImpact: 'Agent waits for Retry-After and tries again. Without structured response, agent abandons the workflow.',
    agentReadyResponse: 'Retry-After: 300\n{ "error": "service_unavailable", "code": "MAINTENANCE", "message": "Scheduled maintenance until 2026-04-15T12:00:00Z", "retry": true, "retry_after_seconds": 300, "maintenance_end": "2026-04-15T12:00:00Z", "request_id": "req_abc123" }',
    dimension: 'D8 Reliability',
    severity: 'critical',
  },
  {
    code: 504,
    name: 'Gateway Timeout',
    meaning: 'Upstream service did not respond in time',
    agentImpact: 'Agent should retry with exponential backoff. Include whether the original request may have partially completed.',
    agentReadyResponse: '{ "error": "gateway_timeout", "code": "UPSTREAM_TIMEOUT", "message": "Request timed out after 30s", "retry": true, "retry_after_seconds": 15, "idempotent": true, "request_id": "req_abc123" }',
    dimension: 'D8 Reliability',
    severity: 'high',
  },
]

function getSeverityClasses(severity: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    critical: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    high: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    medium: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    low: { text: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20' },
  }
  return map[severity] || map.low
}

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
// Error Code Card Component
// ---------------------------------------------------------------------------

function ErrorCodeCard({ code }: { code: ErrorCode }) {
  const severity = getSeverityClasses(code.severity)
  return (
    <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-zinc-100 font-mono">{code.code}</span>
          <span className="text-lg font-semibold text-zinc-300">{code.name}</span>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${severity.bg} border ${severity.border} ${severity.text} text-xs font-semibold`}>
          {code.severity}
        </span>
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed mb-3">{code.meaning}</p>
      <div className="mb-3">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Agent Impact</span>
        <p className="text-sm text-zinc-300 leading-relaxed mt-1">{code.agentImpact}</p>
      </div>
      <div className="mb-2">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Agent-Ready Response</span>
        <pre className="mt-1 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-xs text-emerald-400 overflow-x-auto whitespace-pre-wrap break-all font-mono">
          {code.agentReadyResponse}
        </pre>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs text-zinc-600">Dimension:</span>
        <span className="text-xs text-zinc-400 font-medium">{code.dimension}</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ErrorCodesReferencePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Complete HTTP Error Code Reference for Agent Readiness',
    description:
      'Every HTTP status code an AI agent encounters, what it means for agent readiness, and what the agent-ready response should look like. The definitive developer reference.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/error-codes-reference',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Developer Reference',
    wordCount: 1900,
    keywords:
      'HTTP error codes agent readiness, structured error responses, API error handling agents, JSON error format',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'HTTP Error Codes Reference',
          item: 'https://agenthermes.ai/blog/error-codes-reference',
        },
      ],
    },
  }

  return (
    <BlogArticleWrapper
      title="The Complete HTTP Error Code Reference for Agent Readiness"
      shareUrl="https://agenthermes.ai/blog/error-codes-reference"
      currentHref="/blog/error-codes-reference"
    >
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
            <span className="text-zinc-400">HTTP Error Codes Reference</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <FileWarning className="h-3.5 w-3.5" />
              Developer Reference
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Bookmark This
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            The Complete HTTP Error Code Reference for{' '}
            <span className="text-emerald-400">Agent Readiness</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            When an AI agent hits your API, the error response determines whether it self-corrects or
            abandons the workflow entirely. An HTML 500 page tells the agent nothing. A structured JSON
            error with field-level details, retry guidance, and documentation links lets the agent fix
            itself and continue. This is the definitive reference for every HTTP status code an agent
            encounters — and what your response should look like.
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

      {/* ===== WHY ERROR HANDLING MATTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Why Error Handling Is the Highest-Leverage Agent Readiness Fix
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes scans show that <strong className="text-zinc-100">73% of businesses</strong>{' '}
              return HTML error pages or generic strings when API calls fail. An agent cannot parse
              &ldquo;Something went wrong.&rdquo; It cannot retry intelligently without a Retry-After
              header. It cannot self-correct a validation error without field-level details.
            </p>
            <p>
              Structured{' '}
              <Link href="/blog/error-handling-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                error handling
              </Link>{' '}
              impacts three scoring dimensions simultaneously: D2 API Quality (error format), D8
              Reliability (retry guidance), and D9 Agent Experience (self-correction ability). Fixing
              error responses alone can lift a score by <strong className="text-zinc-100">8 to 15
              points</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '73%', label: 'return HTML errors', icon: AlertTriangle },
              { value: '+12', label: 'avg score lift from fixes', icon: BarChart3 },
              { value: '3', label: 'dimensions impacted', icon: Layers },
              { value: '87%', label: '401+JSON credit vs 200', icon: Shield },
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

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Key insight from AgentHermes scoring:</strong>{' '}
              A 401 Unauthorized response with a structured JSON body scores{' '}
              <strong className="text-zinc-100">87% of the value of a successful 200 response</strong>{' '}
              for the{' '}
              <Link href="/blog/structured-errors-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                D7 Security dimension
              </Link>. The agent knows the endpoint exists, authentication is required, and
              the response format is machine-readable. That is enormously more useful than no API at all.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE UNIVERSAL FORMAT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-500" />
            The Agent-Ready Error Format
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Every error response your API returns should follow this structure. AgentHermes checks
              for these fields during scans and awards points for each one present.
            </p>
          </div>

          <pre className="p-5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-sm text-emerald-400 overflow-x-auto whitespace-pre-wrap break-all font-mono mb-6">
{`{
  "error": "short_error_type",
  "code": "MACHINE_READABLE_CODE",
  "message": "Human-readable explanation",
  "details": [
    { "field": "email", "issue": "invalid format", "expected": "valid email" }
  ],
  "retry": true,
  "retry_after_seconds": 30,
  "docs_url": "https://docs.example.com/errors/MACHINE_READABLE_CODE",
  "request_id": "req_abc123"
}`}
          </pre>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              { field: 'error', description: 'Snake_case error type. Agent uses this for programmatic branching.', required: true },
              { field: 'code', description: 'Uppercase machine code. Stable across versions — agents map these to handlers.', required: true },
              { field: 'message', description: 'Human-readable string. Agent may log or display this.', required: true },
              { field: 'details', description: 'Array of field-level errors. Agent uses these to fix and retry the request.', required: false },
              { field: 'retry', description: 'Boolean. Agent decides whether to retry or abandon immediately.', required: false },
              { field: 'retry_after_seconds', description: 'Integer. Agent waits exactly this long before retrying. No guessing.', required: false },
              { field: 'docs_url', description: 'URL to error documentation. Agent or developer can look up resolution steps.', required: false },
              { field: 'request_id', description: 'Unique ID for this request. Essential for debugging agent-reported issues.', required: true },
            ].map((item) => (
              <div key={item.field} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-emerald-400 text-sm font-mono">{item.field}</code>
                  {item.required ? (
                    <span className="text-xs text-red-400 font-semibold">required</span>
                  ) : (
                    <span className="text-xs text-zinc-600 font-semibold">recommended</span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2xx SUCCESS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            2xx Success Codes
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Success codes are the baseline. Even here, agent-ready responses include metadata that
            helps agents track and correlate operations.
          </p>
          <div className="space-y-4">
            {successCodes.map((code) => (
              <ErrorCodeCard key={code.code} code={code} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3xx REDIRECTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <RefreshCcw className="h-5 w-5 text-blue-500" />
            3xx Redirect Codes
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Redirects are where many agent integrations silently break. Most HTTP clients follow
            redirects automatically, but agents need to understand <em>why</em> a redirect happened
            to update their mental model of your API.
          </p>
          <div className="space-y-4">
            {redirectCodes.map((code) => (
              <ErrorCodeCard key={code.code} code={code} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4xx CLIENT ERRORS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            4xx Client Error Codes
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Client errors are where agent readiness is won or lost. Every 4xx response is a chance to
            teach the agent what went wrong and how to fix it. The{' '}
            <Link href="/blog/agent-experience-dimension" className="text-emerald-400 hover:text-emerald-300 underline">
              D9 Agent Experience dimension
            </Link>{' '}
            weighs these heavily.
          </p>
          <div className="space-y-4">
            {clientErrorCodes.map((code) => (
              <ErrorCodeCard key={code.code} code={code} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5xx SERVER ERRORS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-red-500" />
            5xx Server Error Codes
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Server errors test your API&apos;s resilience story. The critical fields are{' '}
            <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">retry</code>,{' '}
            <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">retry_after_seconds</code>,
            and{' '}
            <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">status_url</code>.
            Without these, an agent facing a 500 has no recovery path.
          </p>
          <div className="space-y-4">
            {serverErrorCodes.map((code) => (
              <ErrorCodeCard key={code.code} code={code} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CHECKLIST ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            Implementation Checklist
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Follow this checklist to make your error responses agent-ready. Each item directly
            impacts your AgentHermes score.
          </p>

          <div className="space-y-3 mb-8">
            {[
              { check: 'All error responses return Content-Type: application/json', impact: '+3 to D2' },
              { check: 'Every error includes error, code, message, and request_id fields', impact: '+4 to D9' },
              { check: '400 responses include field-level details array', impact: '+3 to D9' },
              { check: '401 responses include auth_methods and docs_url', impact: '+2 to D7' },
              { check: '429 responses include Retry-After header and retry_after_seconds', impact: '+3 to D8' },
              { check: '5xx responses include retry boolean and status_url', impact: '+3 to D8' },
              { check: 'No HTML error pages returned from API endpoints', impact: 'Prevents -5 D2 penalty' },
              { check: 'No stack traces or internal details in production errors', impact: 'Prevents -3 D7 penalty' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-zinc-300">{item.check}</p>
                  <span className="text-xs text-emerald-400 font-medium">{item.impact}</span>
                </div>
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
                title: 'Error Handling and Agent Readiness: Why Your 500 Pages Kill Agent Workflows',
                href: '/blog/error-handling-agent-readiness',
                tag: 'Deep Dive',
                tagColor: 'purple',
              },
              {
                title: 'The Complete Guide to Structured Error Responses',
                href: '/blog/structured-errors-guide',
                tag: 'Developer Guide',
                tagColor: 'blue',
              },
              {
                title: 'Agent Experience Dimension: What D9 Measures and Why It Matters',
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
            How do your error responses score?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            AgentHermes scans your API endpoints and checks every error response format. Get your
            Agent Readiness Score in 60 seconds and see exactly which error responses need fixing.
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
