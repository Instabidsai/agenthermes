import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileCode,
  Globe,
  HelpCircle,
  Key,
  Lock,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Security and Agent Readiness: Why Bearer Tokens Beat API Keys (D7 = 12%) | AgentHermes',
  description:
    'D7 Security carries a 0.12 weight — tied for third-highest of the 9 dimensions. Agents need predictable auth they can handle programmatically. Here is what AgentHermes scans for, why Bearer beats API keys, and why 401+JSON scores 87% of 200.',
  keywords: [
    'API security agent readiness',
    'Bearer token vs API key',
    'OAuth 2.0 for AI agents',
    'agent readiness security',
    'D7 Security dimension',
    'agent auth patterns',
    'security.txt',
    'bug bounty agent readiness',
    'TLS 1.3 agents',
    'HSTS CSP agent readiness',
  ],
  openGraph: {
    title: 'Security and Agent Readiness: Why Bearer Tokens Beat API Keys (D7 = 12%)',
    description:
      'D7 Security is 12% of the Agent Readiness Score. Bearer tokens win. OAuth 2.0 is gold standard. Auth-aware scoring rewards 401+JSON at 87% of 200.',
    url: 'https://agenthermes.ai/blog/security-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Security and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security and Agent Readiness: Why Bearer Tokens Beat API Keys (D7 = 12%)',
    description:
      'Top scorers all use Bearer/OAuth. Why AgentHermes rewards auth-aware APIs and how to get D7 credit.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/security-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const authHierarchy = [
  {
    rank: 1,
    name: 'OAuth 2.0 Client Credentials',
    description: 'Agent-to-API authentication with scoped tokens, refresh rotation, and standardized discovery. The RFC 6749 client_credentials grant type is purpose-built for service-to-service auth.',
    example: 'Authorization: Bearer eyJhbGc...  (scoped, rotatable, revocable)',
    score: 'Full credit',
    icon: Award,
    color: 'emerald',
  },
  {
    rank: 2,
    name: 'Bearer Tokens',
    description: 'Static token passed in the Authorization header. Predictable placement, easy to handle, well-supported across every HTTP client. The industry-standard pattern agents are trained on.',
    example: 'Authorization: Bearer sk_live_abc123...',
    score: 'Near-full credit',
    icon: Key,
    color: 'blue',
  },
  {
    rank: 3,
    name: 'API Keys in Query String',
    description: 'Key as a URL parameter. Works but leaks into logs, referrer headers, browser history. Harder for agents to handle safely, penalized in D7.',
    example: 'GET /api/resource?api_key=abc123',
    score: 'Partial credit',
    icon: AlertTriangle,
    color: 'amber',
  },
  {
    rank: 4,
    name: 'Custom Auth Headers',
    description: 'Proprietary header like X-Your-Company-Auth. Agents can handle it but must read your docs to know the header name exists. Adds friction, reduces D9 Agent Experience.',
    example: 'X-Custom-Auth: your-token-format',
    score: 'Partial credit',
    icon: Code2,
    color: 'amber',
  },
  {
    rank: 5,
    name: 'Session Cookies for APIs',
    description: 'Cookie-based auth designed for browser sessions. Agents can persist cookies but it is not what they are optimized for — they prefer stateless token auth. Penalized in D7.',
    example: 'Cookie: session=abc; Set-Cookie: session=...',
    score: 'Low credit',
    icon: XCircle,
    color: 'red',
  },
  {
    rank: 6,
    name: 'Basic Auth in URLs',
    description: 'Username and password in the URL (user:pass@host). Deprecated by modern browsers, insecure, and heavily penalized. Do not ship this.',
    example: 'https://user:pass@api.example.com/resource',
    score: 'Near zero',
    icon: XCircle,
    color: 'red',
  },
]

const d7Signals = [
  { check: 'TLS 1.3 or higher', detail: 'Modern TLS version. TLS 1.2 acceptable, below that penalized. TLS 1.0/1.1 heavily penalized.', icon: Lock },
  { check: 'HSTS header', detail: 'Strict-Transport-Security with max-age >= 1 year. Signals permanent HTTPS commitment.', icon: Shield },
  { check: 'CSP header', detail: 'Content-Security-Policy present. Even a basic policy beats no CSP.', icon: ShieldCheck },
  { check: 'Bearer token auth', detail: 'Authorization: Bearer pattern used across the API. Predictable and agent-friendly.', icon: Key },
  { check: 'OAuth 2.0 support', detail: 'OAuth discovery at /.well-known/oauth-authorization-server or documented OAuth flows.', icon: Award },
  { check: 'security.txt', detail: 'RFC 9116 file at /.well-known/security.txt with contact and disclosure policy.', icon: FileCode },
  { check: 'Bug bounty program', detail: 'Listed on HackerOne, Bugcrowd, Intigriti, or self-hosted. Signals security maturity.', icon: Target },
  { check: 'Structured 401 errors', detail: '401 responses return JSON error bodies, not HTML. Scores 87% of 200 response value.', icon: Bot },
]

const topScorerPatterns = [
  {
    name: 'Stripe',
    score: 68,
    pattern: 'Bearer token auth everywhere (sk_live_ and sk_test_ prefixes). Published OAuth 2.0 Connect flow. TLS 1.3, full HSTS, strict CSP. security.txt published. Bug bounty on HackerOne. D7: near-maximum.',
  },
  {
    name: 'Resend',
    score: 75,
    pattern: 'Bearer token auth with re_ prefix. TLS 1.3, HSTS preload list, security.txt. Bug bounty program. Structured 401+JSON on every protected route. D7: full credit, the primary reason they became the only Gold.',
  },
  {
    name: 'Vercel',
    score: 70,
    pattern: 'Bearer token auth with scoped tokens via /account/tokens. TLS 1.3, HSTS, CSP. security.txt published. Bug bounty on HackerOne. JSON error responses on every 4xx. D7: near-maximum.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why is D7 Security weighted so high at 12%?',
    answer:
      'AI agents handle user data, credentials, and payment tokens. They cannot use a business that exposes them to security risk — or a business whose auth they cannot handle programmatically. D7 Security measures both: is the transport secure (TLS 1.3, HSTS, CSP) and is the auth pattern something agents are trained to work with (Bearer, OAuth). At 0.12 weight, D7 is tied with D1 Discovery for third-highest of the 9 dimensions, behind only D2 API Quality (0.15) and D8 Reliability (0.13). Security failures cascade — they affect discovery (Agents skip insecure sites), trust (agents will not persist tokens against untrusted endpoints), and reliability (agents give up on unpredictable auth).',
  },
  {
    question: 'Why do Bearer tokens score higher than API keys?',
    answer:
      'Bearer tokens follow RFC 6750 — a published standard that every HTTP client library handles natively. Agents are trained on the Bearer pattern and expect the Authorization header. API keys in query strings, by contrast, leak into server logs, referrer headers, and browser history. They are also less predictable — some APIs call them api_key, others apikey, others token. Bearer is one pattern, documented in one place, handled consistently. That predictability is what D7 rewards.',
  },
  {
    question: 'What does auth-aware scoring mean?',
    answer:
      'Auth-aware scoring means AgentHermes credits protected endpoints almost as highly as public ones. A 401 response with a structured JSON error body scores 87% of what a 200 response scores. This is intentional. A public API exposes data; a protected API exposes a contract. Both are usable by agents — the protected one just requires credential negotiation. The model rewards protected-but-structured over public-but-unstructured. A business exposing /api/quote behind Bearer auth with structured 401 errors is more agent-ready than a business exposing the same data publicly through unpredictable HTML scraping.',
  },
  {
    question: 'Does my business need a bug bounty to score well on D7?',
    answer:
      'No, but it helps. A bug bounty program signals security maturity and adds credit to D7. Listing on HackerOne, Bugcrowd, or Intigriti is the most visible option, but self-hosted policies counted at /.well-known/security.txt also score. The larger D7 signals are TLS 1.3, HSTS, CSP, Bearer or OAuth auth, and structured 401 errors — those four alone will get you most of the D7 credit. Bug bounty is a smaller increment that pushes Silver-tier businesses toward Gold.',
  },
  {
    question: 'What is security.txt and should I publish one?',
    answer:
      'security.txt is RFC 9116 — a plain-text file at /.well-known/security.txt that lists your security contact, disclosure policy, and optional bug bounty program URL. It takes 5 minutes to publish and scores a small bump on D7. More importantly, it is the standard way researchers and agents discover how to report security issues. Yes, publish one. Minimum fields: Contact (email or URL), Expires (ISO 8601 date). Recommended: Policy, Acknowledgments, Preferred-Languages. Sign it with PGP if you want to go further.',
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

export default function SecurityAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Security and Agent Readiness: Why Bearer Tokens Beat API Keys (D7 = 12%)',
    description:
      'D7 Security carries a 0.12 weight in the Agent Readiness Score — tied for third-highest. Agents need predictable auth they can handle programmatically. Here is the full deep dive on auth patterns, D7 signals, and why top scorers all use Bearer or OAuth.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/security-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Dimensions Deep Dive',
    wordCount: 1900,
    keywords:
      'API security agent readiness, Bearer token vs API key, OAuth 2.0 for AI agents, D7 Security dimension, agent auth patterns',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Security and Agent Readiness',
          item: 'https://agenthermes.ai/blog/security-agent-readiness',
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
      title="Security and Agent Readiness: Why Bearer Tokens Beat API Keys (D7 = 12%)"
      shareUrl="https://agenthermes.ai/blog/security-agent-readiness"
      currentHref="/blog/security-agent-readiness"
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
            <span className="text-zinc-400">Security and Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Shield className="h-3.5 w-3.5" />
              Dimensions Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              D7 = 12% weight
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Security and Agent Readiness:{' '}
            <span className="text-emerald-400">Why Bearer Tokens Beat API Keys (D7 = 12%)</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            <strong className="text-zinc-100">D7 Security</strong> carries a 0.12 weight in the Agent
            Readiness Score — tied for third-highest of the 9 dimensions. Agents need predictable auth
            patterns they can handle programmatically, and a predictable auth pattern is a security pattern.
            This is the deep dive: what AgentHermes scans for, why Bearer beats API keys, why OAuth 2.0 is
            the gold standard, and why a 401+JSON response scores 87% of a 200.
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

      {/* ===== WHY D7 MATTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            Why Security Is 12% of the Agent Readiness Score
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AI agents handle credentials, user data, and payment tokens on behalf of humans. They cannot
              responsibly interact with an endpoint that exposes them — or their user — to security risk.
              Every modern agent runtime enforces minimum security requirements at the HTTP client layer:
              TLS is required, insecure patterns are blocked, and unpredictable auth flows are abandoned.
            </p>
            <p>
              D7 Security measures all of this. At 0.12 weight, it is tied with D1 Discovery for
              third-highest of the 9 dimensions, behind only{' '}
              <Link href="/blog/openapi-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                D2 API Quality (0.15)
              </Link>{' '}
              and{' '}
              <Link href="/blog/reliability-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                D8 Reliability (0.13)
              </Link>. A business that fails D7 loses 12 points from the ceiling before any other check
              runs.
            </p>
            <p>
              The top scorers in our 500-business dataset all share the same security pattern: TLS 1.3,
              HSTS, CSP, Bearer token or OAuth auth, structured 401 errors, security.txt published, bug
              bounty listed. Resend (75), Vercel (70), Stripe (68) — every Silver-plus business checks
              nearly every box.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '0.12', label: 'D7 weight', icon: Shield },
              { value: '3rd', label: 'highest of 9 dims', icon: BarChart3 },
              { value: '87%', label: '401+JSON vs 200', icon: Lock },
              { value: '8', label: 'signals checked', icon: CheckCircle2 },
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

      {/* ===== AUTH HIERARCHY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Key className="h-5 w-5 text-blue-500" />
            The Auth Pattern Hierarchy
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            D7 rewards predictable, standardized auth patterns. Agents are trained on common patterns and
            handle them reliably. Proprietary or deprecated patterns force the agent to special-case your
            business, which costs you D7 credit and D9 Agent Experience credit simultaneously.
          </p>

          <div className="space-y-4 mb-8">
            {authHierarchy.map((auth) => {
              const colors = getColorClasses(auth.color)
              return (
                <div
                  key={auth.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <auth.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500 font-bold">#{auth.rank}</span>
                        <h3 className="text-lg font-bold text-zinc-100">{auth.name}</h3>
                      </div>
                      <span className={`text-xs font-bold ${colors.text}`}>{auth.score}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{auth.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <code className={`text-xs ${colors.text}`}>{auth.example}</code>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The ranking is not arbitrary — it reflects how agent runtimes actually behave. Claude,
              ChatGPT, and other agent platforms have native handlers for OAuth 2.0 and Bearer tokens
              built into their HTTP tooling. API keys in query strings require the agent to special-case
              URL construction. Custom headers require the agent to read your docs before every request.
              Session cookies require the agent to manage state across calls. Each step down the hierarchy
              adds friction the agent has to overcome, and that friction shows up as lost D7 credit.
            </p>
          </div>
        </div>
      </section>

      {/* ===== D7 SIGNALS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            Eight Signals AgentHermes Scans For
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            D7 is not a single check — it is the aggregate of eight individual signals. Each signal
            contributes a fraction of the D7 score. A business hitting all eight gets near-full D7 credit;
            a business hitting two or three gets the fraction those two or three represent.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {d7Signals.map((signal, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-2 mb-2">
                  <signal.icon className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-zinc-100">{signal.check}</h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{signal.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Four of the eight signals are free and take under an hour to implement: HSTS header, CSP
              header, security.txt at /.well-known/security.txt, and structured JSON error responses on
              4xx status codes. Those four alone cover roughly half of D7 credit. Adding Bearer auth if you
              do not have it, and upgrading to TLS 1.3 if you are on an older version, gets you most of the
              rest. Bug bounty is the final polish — meaningful for Silver-to-Gold progression, not
              required to leave Bronze.
            </p>
          </div>
        </div>
      </section>

      {/* ===== AUTH-AWARE SCORING ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Auth-Aware Rule: 401+JSON = 87% of 200
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              One of the most important nuances in the Agent Readiness scoring model: protected endpoints
              are not penalized for being protected. A 401 Unauthorized response with a structured JSON
              error body scores <strong className="text-zinc-100">87% of what a 200 OK response scores</strong>.
              This is by design.
            </p>
            <p>
              The signal an agent needs is not &ldquo;can I access this data without authentication.&rdquo;
              The signal is &ldquo;do I understand how to access this data.&rdquo; A structured 401 answers
              that question — it tells the agent the endpoint exists, the auth scheme expected, and the
              error format the endpoint uses. All the agent has to do is obtain credentials through your
              onboarding flow and retry.
            </p>
            <p>
              What the model actually penalizes is <strong className="text-zinc-100">unstructured failure</strong>.
              A 404, a blank response, an HTML error page, a timeout, or a 200 with an error message inside
              the body — these all score near zero. The agent cannot interpret them programmatically. The
              difference between 87% credit and near-zero credit is literally the difference between
              &ldquo;protected-but-structured&rdquo; and &ldquo;unstructured-failure.&rdquo;
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mb-4">
            <p className="text-sm text-zinc-300 leading-relaxed mb-3">
              <strong className="text-emerald-400">Good 401 response (scores 87% of 200):</strong>
            </p>
            <pre className="text-xs text-emerald-400 bg-zinc-900/50 p-3 rounded border border-zinc-800 overflow-x-auto"><code>{`HTTP/1.1 401 Unauthorized
Content-Type: application/json
WWW-Authenticate: Bearer realm="api"

{
  "error": "unauthorized",
  "message": "Missing or invalid Bearer token",
  "request_id": "req_abc123",
  "docs": "https://example.com/docs/auth"
}`}</code></pre>
          </div>

          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed mb-3">
              <strong className="text-red-400">Bad 401 response (scores near zero):</strong>
            </p>
            <pre className="text-xs text-red-400 bg-zinc-900/50 p-3 rounded border border-zinc-800 overflow-x-auto"><code>{`HTTP/1.1 401 Unauthorized
Content-Type: text/html

<html><body><h1>Unauthorized</h1>
<p>Please log in to continue.</p></body></html>`}</code></pre>
          </div>
        </div>
      </section>

      {/* ===== TOP SCORERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-500" />
            What the Top Scorers Do
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The three highest-scoring businesses in our 500-business dataset all use Bearer or OAuth 2.0
            auth. Their D7 implementations are remarkably similar — and easy to copy.
          </p>

          <div className="space-y-4 mb-8">
            {topScorerPatterns.map((biz) => (
              <div
                key={biz.name}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-emerald-400 font-bold text-sm">{biz.score}</span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">{biz.name}</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{biz.pattern}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              See{' '}
              <Link href="/blog/why-stripe-scores-68" className="text-emerald-400 hover:text-emerald-300 underline">
                the Stripe deep-dive
              </Link>{' '}
              for a dimension-by-dimension breakdown. The D7 section is nearly identical across all three:
              TLS 1.3, HSTS with preload, CSP, Bearer tokens with predictable prefixes (sk_, re_, pk_),
              structured JSON errors, security.txt, bug bounty. This is the Silver-plus security pattern,
              and it is portable to any business.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT NOT TO DO ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            What NOT to Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Basic auth in URLs',
                detail: 'Username and password embedded in the URL (user:pass@host). Deprecated by browsers, flagged by security tools, and near-zero D7 credit. Never ship this.',
              },
              {
                title: 'Session cookies for APIs',
                detail: 'Cookie-based auth is designed for browser sessions. Agents prefer stateless token auth. Use Bearer or OAuth for API endpoints, save cookies for browser-only flows.',
              },
              {
                title: 'Proprietary signed requests',
                detail: 'Custom request signing with your own hashing scheme. Even if cryptographically sound, agents cannot handle it without custom code. AWS SigV4 is the rare exception — it has enough adoption that agent runtimes special-case it.',
              },
              {
                title: 'HTML error pages on 4xx',
                detail: 'Returning an HTML error page for a 401, 403, or 404 on an API endpoint. The agent cannot parse HTML error formats. Always return JSON for API responses, even on errors.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-red-500/5 border border-red-500/20"
              >
                <h3 className="font-bold text-red-400 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
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
                title: 'What Makes Stripe Score 68 Silver',
                href: '/blog/why-stripe-scores-68',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'OpenAPI Specs Are the Single Biggest Factor in Agent Readiness (D2 = 15%)',
                href: '/blog/openapi-agent-readiness',
                tag: 'Standards Deep Dive',
                tagColor: 'emerald',
              },
              {
                title: 'Reliability and Agent Readiness: Why Status Pages Score 13% (D8)',
                href: '/blog/reliability-agent-readiness',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
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
            See how you score on D7 Security
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score in 60 seconds. Includes a full D7 breakdown across all
            eight security signals — TLS version, HSTS, CSP, auth pattern, security.txt, and more.
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
              href="/methodology"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              Read Methodology
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
