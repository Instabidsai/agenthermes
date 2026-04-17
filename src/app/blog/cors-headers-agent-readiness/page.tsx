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
  Globe2,
  HelpCircle,
  Layers,
  Lock,
  Network,
  Server,
  Shield,
  Sparkles,
  Target,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'CORS and Agent Readiness: Why Cross-Origin Headers Determine If AI Agents Can Use Your API | AgentHermes',
  description:
    'CORS blocks AI agents by default. Most browser-built APIs return Access-Control-Allow-Origin for specific domains, preventing agents from calling your endpoints. Learn how to configure CORS for agent readiness.',
  keywords: [
    'CORS headers AI agents',
    'CORS agent readiness',
    'cross-origin AI agents',
    'API CORS configuration',
    'Access-Control-Allow-Origin agents',
    'CORS preflight AI',
    'agent-ready CORS',
    'API headers AI agents',
  ],
  openGraph: {
    title: 'CORS and Agent Readiness: Why Cross-Origin Headers Determine If AI Agents Can Use Your API',
    description:
      'CORS blocks AI agents by default. Learn why cross-origin headers are a hidden barrier to agent readiness and how top scorers like Stripe and Resend handle it correctly.',
    url: 'https://agenthermes.ai/blog/cors-headers-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CORS and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CORS and Agent Readiness: Why Cross-Origin Headers Determine If AI Agents Can Use Your API',
    description:
      'CORS blocks AI agents by default. Most APIs return Access-Control-Allow-Origin for specific domains only. Here is how to fix it.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/cors-headers-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const corsProblems = [
  {
    problem: 'Origin-locked CORS',
    description: 'Access-Control-Allow-Origin set to a single domain like https://app.example.com. Any request from a different origin — including an AI agent running on a cloud server — gets blocked with a CORS error before the request body is even read.',
    impact: 'Agent cannot call any endpoint',
    severity: 'critical',
    icon: XCircle,
  },
  {
    problem: 'Missing Authorization in allowed headers',
    description: 'Access-Control-Allow-Headers does not include Authorization. The browser (or agent HTTP client respecting CORS) strips the Bearer token from the request. The API receives an unauthenticated call and returns 401.',
    impact: 'Agent authenticates but token is stripped',
    severity: 'critical',
    icon: Lock,
  },
  {
    problem: 'Broken OPTIONS preflight',
    description: 'The server does not respond to OPTIONS requests, or responds with a 405 Method Not Allowed. Preflight fails, the actual request never fires. This is invisible in curl testing because curl skips preflight.',
    impact: 'Agent blocked before request sends',
    severity: 'high',
    icon: AlertTriangle,
  },
  {
    problem: 'Rate-limit headers not exposed',
    description: 'Access-Control-Expose-Headers does not include X-RateLimit-Remaining, X-RateLimit-Limit, or Retry-After. The agent cannot read these headers even when they exist in the response, so it cannot self-throttle.',
    impact: 'Agent hits rate limits blindly',
    severity: 'medium',
    icon: BarChart3,
  },
]

const comparisonRows = [
  { header: 'Access-Control-Allow-Origin', bad: 'https://app.example.com', good: '* or dynamic per-request origin validation' },
  { header: 'Access-Control-Allow-Headers', bad: 'Content-Type only', good: 'Content-Type, Authorization, X-Request-ID' },
  { header: 'Access-Control-Allow-Methods', bad: 'GET, POST only', good: 'GET, POST, PUT, PATCH, DELETE, OPTIONS' },
  { header: 'Access-Control-Expose-Headers', bad: 'Not set', good: 'X-RateLimit-Remaining, X-RateLimit-Limit, X-Request-ID, Retry-After' },
  { header: 'Access-Control-Max-Age', bad: 'Not set (preflight every request)', good: '86400 (cache preflight for 24 hours)' },
  { header: 'OPTIONS response', bad: '405 Method Not Allowed', good: '204 No Content with full CORS headers' },
]

const topScorers = [
  { name: 'Stripe', score: 68, corsStatus: 'Correct', detail: 'Dynamic origin validation, Authorization exposed, proper OPTIONS, rate-limit headers in Expose-Headers. Agents call Stripe APIs from any origin without CORS failures.' },
  { name: 'Resend', score: 75, corsStatus: 'Correct', detail: 'Wildcard CORS on public endpoints, Bearer token in allowed headers, X-RateLimit-* exposed. The only Gold-tier business — CORS is part of why.' },
  { name: 'Supabase', score: 69, corsStatus: 'Correct', detail: 'REST and Realtime endpoints allow cross-origin. apikey and Authorization both in Allow-Headers. PostgREST returns proper preflight responses.' },
  { name: 'GitHub', score: 67, corsStatus: 'Partial', detail: 'API endpoints return proper CORS for OAuth apps. Fine-grained PATs work cross-origin. GraphQL endpoint has stricter CORS — agents must use REST for reliability.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Do AI agents actually hit CORS errors?',
    answer:
      'Yes and no. Server-side agents making raw HTTP requests (like curl) bypass CORS entirely because CORS is enforced by browsers. But many AI agent frameworks run in browser-adjacent environments — Electron apps, browser extensions, WebAssembly runtimes, and JavaScript-based agent frameworks. These environments enforce CORS. Additionally, agent developers testing in browsers during development hit CORS immediately. A properly configured CORS policy costs nothing and removes a class of integration failures.',
  },
  {
    question: 'Should I just set Access-Control-Allow-Origin to * (wildcard)?',
    answer:
      'For public API endpoints that require authentication via Bearer tokens — yes, wildcard is fine. The security comes from the token, not the origin. The anti-pattern is wildcard CORS plus cookie-based auth, which enables CSRF attacks. If your API uses Authorization headers (which agent-ready APIs should), wildcard CORS is both safe and agent-friendly.',
  },
  {
    question: 'How does CORS affect my Agent Readiness Score?',
    answer:
      'CORS configuration impacts two dimensions: D7 Security (12% weight) and D9 Agent Experience (10% weight). A properly configured CORS policy that allows cross-origin requests with Authorization headers contributes to both. A misconfigured CORS policy that blocks legitimate agent requests lowers D9 because the API is unusable from standard agent environments.',
  },
  {
    question: 'What is the Access-Control-Expose-Headers header?',
    answer:
      'By default, browsers only expose a small set of "simple" response headers to JavaScript (and therefore to browser-based agents). Headers like X-RateLimit-Remaining, X-Request-ID, and Retry-After are hidden unless you explicitly list them in Access-Control-Expose-Headers. Without this, an agent calling your API from a browser environment cannot read rate-limit information — it flies blind and hits 429 errors it could have avoided.',
  },
]

function getSeverityClasses(severity: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    critical: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    high: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    medium: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  }
  return map[severity] || map.medium
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CorsHeadersAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'CORS and Agent Readiness: Why Cross-Origin Headers Determine If AI Agents Can Use Your API',
    description:
      'CORS blocks AI agents by default. Most browser-built APIs return Access-Control-Allow-Origin for specific domains, preventing agents running from different origins. A complete guide to agent-ready CORS configuration.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/cors-headers-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1800,
    keywords:
      'CORS headers AI agents, CORS agent readiness, cross-origin AI agents, API CORS configuration, agent-ready API headers',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'CORS and Agent Readiness',
          item: 'https://agenthermes.ai/blog/cors-headers-agent-readiness',
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
      title="CORS and Agent Readiness: Why Cross-Origin Headers Determine If AI Agents Can Use Your API"
      shareUrl="https://agenthermes.ai/blog/cors-headers-agent-readiness"
      currentHref="/blog/cors-headers-agent-readiness"
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
            <span className="text-zinc-400">CORS and Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Globe2 className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Hidden Blocker
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            CORS and Agent Readiness:{' '}
            <span className="text-emerald-400">Why Cross-Origin Headers Determine If AI Agents Can Use Your API</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Your API works perfectly in Postman. It passes every test in your CI pipeline. But when an AI
            agent tries to call it from a browser-based runtime, it silently fails. The culprit:{' '}
            <strong className="text-zinc-100">CORS headers</strong>. Cross-Origin Resource Sharing is the
            invisible gatekeeper that determines whether agents running outside your domain can interact
            with your endpoints.
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
            <Shield className="h-5 w-5 text-red-500" />
            CORS Blocks Agents by Default
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              CORS was designed to protect humans. When a browser loads a page from domain A and that page
              tries to call an API on domain B, the browser checks whether domain B explicitly allows
              cross-origin requests. If it does not, the browser blocks the request entirely. This prevents
              malicious websites from making unauthorized API calls using a visitor&apos;s cookies.
            </p>
            <p>
              The problem is that <strong className="text-zinc-100">AI agents are not malicious websites</strong>.
              They are legitimate programmatic clients that need to call your API from their own origin —
              which is, by definition, different from yours. An agent running inside a browser extension, an
              Electron app, a WebAssembly sandbox, or any JavaScript-based agent framework will hit CORS
              restrictions on every API that was not configured to allow cross-origin access.
            </p>
            <p>
              In our scan of 500 businesses, we found that{' '}
              <strong className="text-zinc-100">over 60% of APIs that return proper JSON responses still fail
              agent integration tests because of CORS misconfiguration</strong>. The API itself works — the
              headers around it do not.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '60%+', label: 'of APIs block agents via CORS', icon: XCircle },
              { value: '0', label: 'CORS errors visible in server logs', icon: AlertTriangle },
              { value: '22%', label: 'score weight affected (D7+D9)', icon: BarChart3 },
              { value: '5 min', label: 'to fix in middleware', icon: Zap },
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

      {/* ===== FOUR CORS PROBLEMS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            The Four CORS Problems That Block AI Agents
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Each of these misconfigurations silently prevents agents from using your API. None of them
            produce server-side errors — the failure happens entirely in the client.
          </p>

          <div className="space-y-4 mb-8">
            {corsProblems.map((problem) => {
              const colors = getSeverityClasses(problem.severity)
              return (
                <div
                  key={problem.problem}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <problem.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{problem.problem}</h3>
                      <span className={`text-xs font-medium ${colors.text}`}>{problem.severity.toUpperCase()} severity</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{problem.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Impact:</span>{' '}
                      <span className={colors.text}>{problem.impact}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== BAD VS GOOD COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Agent-Blocking vs Agent-Ready CORS Headers
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            A side-by-side comparison of CORS configurations that block agents versus configurations
            that allow them. Every header listed here is part of what AgentHermes checks during a scan.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Header</div>
              <div className="text-red-400">Blocks Agents</div>
              <div className="text-emerald-400">Agent-Ready</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.header}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200 text-xs sm:text-sm">
                  <code className="text-blue-400">{row.header}</code>
                </div>
                <div className="text-zinc-500 text-xs sm:text-sm">{row.bad}</div>
                <div className="text-emerald-400 text-xs sm:text-sm">{row.good}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-8">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The wildcard trap:</strong> Setting{' '}
              <code className="text-amber-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">Access-Control-Allow-Origin: *</code>{' '}
              but omitting Authorization from Allow-Headers is the most common anti-pattern. The agent can
              reach your server but cannot authenticate. The API returns 401 on every request. From the
              agent&apos;s perspective, your API requires credentials it cannot send.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE FIX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The 5-Minute Fix: Agent-Ready CORS Middleware
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The fix is a single middleware function that runs before every API response. It adds the
              correct CORS headers and handles OPTIONS preflight requests. Here is what it needs to do:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Set Access-Control-Allow-Origin dynamically',
                detail: 'Read the request Origin header. If it matches your allowlist (or you allow all origins for public APIs), echo it back. For APIs secured by Bearer tokens, wildcard (*) is safe because auth is in the header, not cookies.',
                icon: Globe2,
              },
              {
                step: '2',
                title: 'Include Authorization in Allow-Headers',
                detail: 'Add Content-Type, Authorization, X-Request-ID, and any custom headers your API uses to Access-Control-Allow-Headers. Without Authorization, agents cannot send Bearer tokens cross-origin.',
                icon: Lock,
              },
              {
                step: '3',
                title: 'Expose rate-limit and request-ID headers',
                detail: 'Add X-RateLimit-Remaining, X-RateLimit-Limit, X-Request-ID, and Retry-After to Access-Control-Expose-Headers. These are invisible to cross-origin clients unless explicitly exposed.',
                icon: BarChart3,
              },
              {
                step: '4',
                title: 'Handle OPTIONS preflight with 204',
                detail: 'Intercept OPTIONS requests and return 204 No Content with all CORS headers. Do not route OPTIONS through your auth middleware — preflight requests do not carry credentials.',
                icon: Network,
              },
              {
                step: '5',
                title: 'Cache preflight with Max-Age',
                detail: 'Set Access-Control-Max-Age to 86400 (24 hours). This tells clients to cache the preflight result, reducing latency for agents that make repeated calls to the same endpoint.',
                icon: Zap,
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
              This entire configuration fits in 15-20 lines of middleware code regardless of your
              framework. Express, Next.js, FastAPI, Rails — every framework has a standard way to set
              response headers. The time investment is minimal. The impact on agent accessibility is
              immediate.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TOP SCORERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            How Top Scorers Handle CORS
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The highest-scoring businesses in our 500-business scan all have proper CORS configuration.
            It is not a coincidence — agent-ready APIs are built to be called from anywhere.
          </p>

          <div className="space-y-4 mb-8">
            {topScorers.map((scorer) => (
              <div
                key={scorer.name}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-zinc-100">{scorer.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      {scorer.corsStatus}
                    </span>
                    <span className="text-sm font-bold text-zinc-400">Score: {scorer.score}</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{scorer.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECURITY CONSIDERATION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Security Is Not an Excuse to Block Agents
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The most common objection to relaxing CORS is security. Teams worry that allowing
              cross-origin requests opens them to attacks. This concern is valid for{' '}
              <strong className="text-zinc-100">cookie-based authentication</strong> — but irrelevant for{' '}
              <Link href="/blog/security-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                agent-ready APIs that use Bearer tokens
              </Link>.
            </p>
            <p>
              Here is why: CORS prevents the browser from sending cookies to a cross-origin server without
              consent. That matters because cookies are ambient credentials — they get attached automatically.
              Bearer tokens are explicit credentials — the client must deliberately include them. A malicious
              site cannot steal a Bearer token from another origin because it never had access to the token
              in the first place.
            </p>
            <p>
              Agent-ready APIs should use{' '}
              <Link href="/blog/rate-limiting-for-agents" className="text-emerald-400 hover:text-emerald-300 underline">
                proper rate limiting
              </Link>, Bearer token authentication, and request validation — not restrictive CORS — as their
              security layer. CORS is an access control mechanism for browsers, not an API security strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Cookie auth + permissive CORS = Dangerous',
                detail: 'If your API uses cookies for auth (session cookies, JWT in cookies), restrictive CORS is necessary to prevent CSRF. But cookie-based auth is not agent-ready anyway — agents cannot log in via a browser session.',
                icon: XCircle,
                color: 'red',
              },
              {
                title: 'Bearer auth + permissive CORS = Safe',
                detail: 'If your API uses Authorization: Bearer tokens, permissive CORS adds zero risk. The token is never automatically attached — the caller must explicitly include it. This is the agent-ready pattern.',
                icon: CheckCircle2,
                color: 'emerald',
              },
            ].map((item) => {
              const colorMap: Record<string, { text: string; bg: string; border: string }> = {
                red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
                emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
              }
              const c = colorMap[item.color] || colorMap.emerald
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className={`h-5 w-5 ${c.text}`} />
                    <h3 className={`font-bold text-sm ${c.text}`}>{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
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
                title: 'Security and Agent Readiness: Why Bearer Tokens Beat API Keys',
                href: '/blog/security-agent-readiness',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'Rate Limiting for AI Agents: Why X-RateLimit-Remaining Is the Most Important Header',
                href: '/blog/rate-limiting-for-agents',
                tag: 'Technical Deep Dive',
                tagColor: 'purple',
              },
              {
                title: 'Check Your Agent Readiness Score',
                href: '/audit',
                tag: 'Free Scan',
                tagColor: 'emerald',
              },
            ].map((article) => {
              const colorMap: Record<string, { text: string; bg: string; border: string }> = {
                blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
                emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
              }
              const colors = colorMap[article.tagColor] || colorMap.emerald
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
            Is your CORS configuration blocking agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to check your CORS headers, security configuration,
            and 27 other signals across all 9 dimensions.
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
