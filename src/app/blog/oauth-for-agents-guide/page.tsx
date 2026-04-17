import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Globe,
  HelpCircle,
  KeyRound,
  Lock,
  Network,
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
  title: 'OAuth 2.0 for AI Agents: The Client Credentials Flow Every API Needs | AgentHermes',
  description:
    'OAuth client_credentials grant is the gold standard for machine-to-machine auth. AI agents are machines. Most OAuth flows assume a human — here is the flow agents actually need, and why AgentHermes checks for it in D7 Security.',
  keywords: [
    'OAuth AI agents client credentials',
    'OAuth 2.0 for agents',
    'client credentials grant',
    'machine to machine auth',
    'AI agent authentication',
    'OAuth agent readiness',
    'bearer token AI agent',
    'API auth for agents',
    'agent economy OAuth',
  ],
  openGraph: {
    title: 'OAuth 2.0 for AI Agents: The Client Credentials Flow Every API Needs',
    description:
      'OAuth client_credentials grant is the gold standard for machine-to-machine auth. Here is the flow agents actually need.',
    url: 'https://agenthermes.ai/blog/oauth-for-agents-guide',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OAuth 2.0 for AI Agents: The Client Credentials Flow Every API Needs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OAuth 2.0 for AI Agents: The Client Credentials Flow Every API Needs',
    description:
      'OAuth client_credentials is the only auth flow agents can use without a browser. Here is how to implement it.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/oauth-for-agents-guide',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const oauthFlows = [
  {
    name: 'Authorization Code',
    description: 'User clicks login, gets redirected to a consent screen, approves access, gets a code, then exchanges it for a token. The standard web login.',
    agentFriendly: false,
    reason: 'Requires a browser, a user clicking buttons, and a redirect URI. Agents do not have browsers.',
    icon: Globe,
    color: 'red',
  },
  {
    name: 'Authorization Code + PKCE',
    description: 'Same as Authorization Code but with a proof key for code exchange. Designed for public clients like mobile apps where you cannot store a secret safely.',
    agentFriendly: false,
    reason: 'Still requires a browser and user interaction. The PKCE extension solves a different problem.',
    icon: Lock,
    color: 'red',
  },
  {
    name: 'Implicit (Deprecated)',
    description: 'Skips the code exchange and returns the token directly in the URL fragment. Deprecated in OAuth 2.1 for security reasons.',
    agentFriendly: false,
    reason: 'Deprecated, insecure, and still requires a browser redirect. Do not use.',
    icon: XCircle,
    color: 'red',
  },
  {
    name: 'Client Credentials',
    description: 'POST to /oauth/token with client_id + client_secret, get an access_token back. No browser. No redirect. No consent screen. Pure machine-to-machine.',
    agentFriendly: true,
    reason: 'This is the flow agents need. One HTTP request, one response, one token. Done.',
    icon: KeyRound,
    color: 'emerald',
  },
]

const topScorers = [
  { name: 'Stripe', score: 68, detail: 'Bearer + restricted keys + OAuth Connect with client_credentials', color: 'emerald' },
  { name: 'GitHub', score: 67, detail: 'OAuth apps + GitHub Apps (JWT) + fine-grained PATs', color: 'emerald' },
  { name: 'Slack', score: 68, detail: 'Bot tokens via OAuth 2.0 client_credentials flow', color: 'emerald' },
  { name: 'Resend', score: 75, detail: 'API keys (Bearer) + scoped permissions per key', color: 'emerald' },
]

const antiPatterns = [
  {
    pattern: 'Browser-only OAuth for API access',
    description: 'Requiring users to click through a consent screen to get an API token. If the only path to a token is a browser, agents cannot authenticate.',
    fix: 'Add a client_credentials grant alongside your authorization code flow. Both can coexist.',
  },
  {
    pattern: 'CAPTCHA before token issuance',
    description: 'Putting a CAPTCHA on the OAuth endpoint or API key creation page. Agents cannot solve CAPTCHAs.',
    fix: 'Rate-limit the token endpoint instead. Use IP-based throttling and monitor for abuse programmatically.',
  },
  {
    pattern: 'Session cookies instead of Bearer tokens',
    description: 'APIs that only accept session cookies set by a browser login flow. No Authorization header support at all.',
    fix: 'Accept Bearer tokens in the Authorization header. Session cookies are for browsers, not agents.',
  },
  {
    pattern: 'Manual API key approval',
    description: 'Requiring a human to review and approve API key requests. Creates hours or days of latency before an agent can connect.',
    fix: 'Offer instant self-service keys with rate limits. Review high-volume usage after the fact, not before.',
  },
  {
    pattern: 'Token rotation without programmatic refresh',
    description: 'Expiring tokens without providing a refresh_token or a re-issuance endpoint. The agent loses access and cannot recover.',
    fix: 'If tokens expire, always include a refresh_token or let client_credentials re-issue instantly.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is the client_credentials grant?',
    answer:
      'The client_credentials grant is an OAuth 2.0 flow designed for machine-to-machine communication. The client sends its client_id and client_secret to the authorization server and receives an access_token. No user interaction, no browser, no redirect. It is the only standard OAuth flow that works for AI agents out of the box.',
  },
  {
    question: 'Do agents need OAuth at all? Why not just API keys?',
    answer:
      'API keys work and are better than no auth. But OAuth client_credentials provides scoped access, token expiration, and rotation without changing the key itself. For agents managing multiple services, OAuth is more secure because a compromised token expires automatically. AgentHermes gives full D7 Security credit for either Bearer tokens or OAuth.',
  },
  {
    question: 'How does AgentHermes check for OAuth support?',
    answer:
      'AgentHermes checks D7 Security (0.12 weight) for multiple auth signals: Bearer token acceptance on API endpoints, 401 + structured JSON on unauthenticated requests, OAuth discovery endpoints (/.well-known/openid-configuration or /oauth/token), and self-service key creation. Client_credentials support is the strongest positive signal.',
  },
  {
    question: 'Can I support both browser OAuth and client_credentials?',
    answer:
      'Yes, and you should. Authorization Code flow serves your human users logging into your dashboard. Client Credentials flow serves AI agents and automation. Both use the same OAuth infrastructure and can share the same authorization server. The only difference is the grant_type parameter in the token request.',
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

export default function OAuthForAgentsGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'OAuth 2.0 for AI Agents: The Client Credentials Flow Every API Needs',
    description:
      'OAuth client_credentials grant is the gold standard for machine-to-machine auth. AI agents are machines. Here is the flow agents actually need and why AgentHermes checks for it.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/oauth-for-agents-guide',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1800,
    keywords:
      'OAuth AI agents client credentials, machine to machine auth, agent readiness, D7 Security',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'OAuth for Agents',
          item: 'https://agenthermes.ai/blog/oauth-for-agents-guide',
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
      title="OAuth 2.0 for AI Agents: The Client Credentials Flow Every API Needs"
      shareUrl="https://agenthermes.ai/blog/oauth-for-agents-guide"
      currentHref="/blog/oauth-for-agents-guide"
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
            <span className="text-zinc-400">OAuth for Agents</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <KeyRound className="h-3.5 w-3.5" />
              Security Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              D7 Security
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            OAuth 2.0 for AI Agents:{' '}
            <span className="text-emerald-400">The Client Credentials Flow Every API Needs</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Most OAuth flows assume a human is sitting at a browser, clicking &ldquo;Allow.&rdquo; AI agents
            are not humans. They cannot click consent screens, follow redirects, or solve CAPTCHAs. There is
            exactly one OAuth flow built for machines:{' '}
            <strong className="text-zinc-100">client_credentials</strong>. It is the gold standard for
            agent authentication, and most APIs do not support it.
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
            <Shield className="h-5 w-5 text-red-500" />
            The Authentication Problem Agents Face
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              OAuth 2.0 is the internet&rsquo;s authentication standard. Every major API uses it. But OAuth
              was designed in 2012 with one assumption: a human is in the loop. The most common flow —
              Authorization Code — works like this: redirect the user to a login page, they enter
              credentials, they click &ldquo;Allow,&rdquo; they get redirected back with a code, the
              code gets exchanged for a token.
            </p>
            <p>
              AI agents cannot do any of that. They do not have browsers. They do not have fingers to
              click buttons. They do not have eyes to read consent screens. When an agent encounters an
              OAuth flow that requires browser interaction, it hits a wall. The integration fails. The
              agent moves on to a competitor that offers programmatic authentication.
            </p>
            <p>
              This is not a theoretical problem. In our scan of 500 businesses, <strong className="text-zinc-100">
              73% of APIs that offer OAuth only support browser-based flows</strong>. That means nearly
              three out of four OAuth implementations are invisible to AI agents — even though the API
              behind them works perfectly.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '73%', label: 'OAuth APIs with browser-only flows', icon: Globe },
              { value: '0.12', label: 'D7 Security weight in ARS', icon: Shield },
              { value: '4', label: 'OAuth grant types defined', icon: KeyRound },
              { value: '1', label: 'that works for agents', icon: CheckCircle2 },
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

      {/* ===== THE FOUR FLOWS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            The Four OAuth Flows: Only One Works for Agents
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              OAuth 2.0 defines four grant types. Three require a browser. One does not. Here is the
              breakdown and why it matters for agent readiness.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {oauthFlows.map((flow) => {
              const colors = getColorClasses(flow.color)
              return (
                <div
                  key={flow.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <flow.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-zinc-100">{flow.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} border ${colors.border} ${colors.text}`}>
                        {flow.agentFriendly ? 'Agent-friendly' : 'Not for agents'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{flow.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className={`${colors.text} font-medium`}>Agent verdict:</span>{' '}
                      {flow.reason}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW CLIENT CREDENTIALS WORKS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            How Client Credentials Works: The 3-Step Agent Auth Flow
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The client_credentials flow is the simplest OAuth flow. No browser, no redirect, no human.
            Three steps, three HTTP interactions, done.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Agent sends credentials to the token endpoint',
                detail: 'POST /oauth/token with grant_type=client_credentials, client_id, and client_secret. Can be in the body or as Basic auth header. Content-Type: application/x-www-form-urlencoded.',
                code: 'POST /oauth/token\nclient_id=agent_abc123&client_secret=sk_live_xxx&grant_type=client_credentials',
              },
              {
                step: '2',
                title: 'Server returns an access token',
                detail: 'The authorization server validates the credentials and returns a JSON response with access_token, token_type, expires_in, and optionally a scope. No redirect, no code exchange.',
                code: '{ "access_token": "eyJhbGciOiJSUzI1...", "token_type": "Bearer", "expires_in": 3600 }',
              },
              {
                step: '3',
                title: 'Agent uses the token on every API call',
                detail: 'The agent includes the token in the Authorization header of every subsequent request. When it expires, the agent repeats step 1 to get a fresh token.',
                code: 'GET /v1/products\nAuthorization: Bearer eyJhbGciOiJSUzI1...',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-3">{item.detail}</p>
                    <div className="p-3 rounded-lg bg-zinc-800/80 border border-zinc-700/50 overflow-x-auto">
                      <pre className="text-xs text-emerald-400 font-mono whitespace-pre">{item.code}</pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              That is it. The entire authentication handshake is one POST request. Compare that to
              Authorization Code flow, which requires: a redirect URL, a browser session, user consent,
              a code exchange, and state parameter validation. Client credentials removes all five of
              those steps because there is no user — just two machines talking.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHO GETS IT RIGHT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            Who Gets It Right: Top Agent Readiness Scorers on D7 Security
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The highest-scoring businesses in our 500-business scan all support programmatic
            authentication that agents can use without a browser.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {topScorers.map((scorer) => (
              <div
                key={scorer.name}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-zinc-100">{scorer.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                    {scorer.score}/100
                  </span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{scorer.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Notice the pattern: every top scorer supports at least one form of non-interactive
              authentication. Stripe offers restricted API keys and OAuth Connect with client_credentials.
              GitHub supports GitHub Apps using JWT-based authentication. Slack provides bot tokens via
              OAuth client_credentials. Resend uses scoped API keys with Bearer headers. None of them
              require a browser to get started.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ANTI-PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-red-500" />
            Five Anti-Patterns That Block Agents From Authenticating
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These patterns are common across the 500 businesses we scanned. Every one of them prevents
            AI agents from connecting, even when the underlying API is excellent.
          </p>

          <div className="space-y-4 mb-8">
            {antiPatterns.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-red-400 mb-2 text-sm">{item.pattern}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-3">{item.description}</p>
                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <p className="text-xs text-zinc-400">
                    <span className="text-emerald-400 font-medium">Fix:</span>{' '}
                    {item.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENTHERMES CHECKS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            What AgentHermes Checks in D7 Security
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              D7 Security carries a 0.12 weight in the{' '}
              <Link href="/blog/security-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Agent Readiness Score
              </Link>
              . Here are the specific auth signals AgentHermes scans for, ranked by impact.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Signal</div>
              <div>What We Check</div>
              <div>Score Impact</div>
            </div>
            {[
              { signal: '401 + JSON body', check: 'Unauthenticated request returns 401 with structured error', impact: '87% of 200 score' },
              { signal: 'Bearer token support', check: 'API accepts Authorization: Bearer header', impact: 'High positive' },
              { signal: 'OAuth discovery', check: '/.well-known/openid-configuration or /oauth/token endpoint', impact: 'High positive' },
              { signal: 'Self-service keys', check: 'API keys available without human approval', impact: 'Medium positive' },
              { signal: 'Token expiration', check: 'Tokens expire and can be refreshed programmatically', impact: 'Medium positive' },
              { signal: 'Scope restriction', check: 'Tokens can be scoped to specific permissions', impact: 'Low positive' },
            ].map((row, i) => (
              <div
                key={row.signal}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.signal}</div>
                <div className="text-zinc-500">{row.check}</div>
                <div className="text-emerald-400">{row.impact}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Key finding:</strong> A 401 response with a structured
              JSON error body scores 87% as much as a successful 200 response. Why? Because it tells the
              agent exactly what went wrong and what authentication it needs. A 403 Forbidden HTML page
              tells the agent nothing. The structured 401 is the single most impactful D7 signal.
            </p>
          </div>
        </div>
      </section>

      {/* ===== IMPLEMENTATION GUIDE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The 30-Minute Implementation
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              If you already have an API, adding client_credentials support takes 30 minutes. If you are
              building an{' '}
              <Link href="/blog/build-mcp-server-tutorial" className="text-emerald-400 hover:text-emerald-300 underline">
                MCP server
              </Link>
              , add it at the same time. Here is the minimal checklist.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              'Create a POST /oauth/token endpoint that accepts grant_type=client_credentials',
              'Validate client_id + client_secret from the request body or Basic auth header',
              'Return { access_token, token_type: "Bearer", expires_in } as JSON',
              'Accept Authorization: Bearer {token} on all protected API endpoints',
              'Return 401 + JSON { error: "unauthorized", message: "..." } on invalid/missing tokens',
              'Add /.well-known/openid-configuration pointing to your token endpoint (optional but recommended)',
              'Document the flow in your OpenAPI spec under securitySchemes',
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              That is seven items. Most can reuse your existing auth infrastructure. If you already
              validate API keys, you already have step 5. If you already have an OAuth server for
              browser login, you only need to add the client_credentials grant type — the token
              validation middleware is the same.
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
                title: 'Security and Agent Readiness: Why Bearer Tokens Beat API Keys (D7 = 12%)',
                href: '/blog/security-agent-readiness',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'How to Build an MCP Server for Your Business: A 30-Minute Tutorial',
                href: '/blog/build-mcp-server-tutorial',
                tag: 'Tutorial',
                tagColor: 'emerald',
              },
              {
                title: 'The Agent Readiness Checklist: 30 Signals Every Business Should Have',
                href: '/blog/checklist-agent-ready-business',
                tag: 'Checklist',
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
            How does your API score on D7 Security?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan and see your D7 Security score. Find out if agents
            can authenticate with your API — or if they are hitting a wall.
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
