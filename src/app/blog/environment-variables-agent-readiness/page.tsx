import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Eye,
  FileJson,
  Globe,
  HelpCircle,
  KeyRound,
  Lock,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Environment Variables and Agent Readiness: Why Your API Keys Shouldn\'t Be in Your Agent Card | AgentHermes',
  description:
    'Security best practices for agent-card.json and MCP servers. Where API keys should live (environment variables, vault services, OAuth flows) and what goes in your agent card. AgentHermes D7 Security checks for exposed secrets.',
  keywords: [
    'environment variables API keys agent readiness security',
    'agent-card.json security',
    'API key security best practices',
    'MCP server secrets',
    'agent readiness security',
    'OAuth client credentials agent',
    'secrets management AI agents',
    'agent card security',
    'D7 security score',
  ],
  openGraph: {
    title:
      'Environment Variables and Agent Readiness: Why Your API Keys Shouldn\'t Be in Your Agent Card',
    description:
      'Your agent-card.json declares capabilities but should NEVER contain secrets. Learn where API keys belong and what AgentHermes D7 Security checks for.',
    url: 'https://agenthermes.ai/blog/environment-variables-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Environment Variables and Agent Readiness Security',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Environment Variables and Agent Readiness: API Key Security for Agent Cards',
    description:
      'Agent-card.json declares capabilities, not credentials. Where API keys should live and what AgentHermes checks for in D7 Security.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/environment-variables-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const secretsWhereTo = [
  {
    method: 'Environment Variables',
    description: 'The baseline. Store API keys, database URLs, and tokens in server-side environment variables. Never committed to git, never sent to the client, rotatable without code changes.',
    example: 'process.env.STRIPE_SECRET_KEY or os.environ["OPENAI_API_KEY"]',
    bestFor: 'Single-server deployments, Vercel/Netlify projects, Docker containers',
    icon: Server,
    color: 'emerald',
  },
  {
    method: 'Vault Services',
    description: 'Centralized secret management with access control, audit logging, automatic rotation, and encryption at rest. AWS Secrets Manager, HashiCorp Vault, Doppler, 1Password Secrets Automation.',
    example: 'await vault.getSecret("mcp-server/stripe-key") with IAM role-based access',
    bestFor: 'Multi-service architectures, teams, compliance requirements (SOC2, HIPAA)',
    icon: Lock,
    color: 'purple',
  },
  {
    method: 'OAuth Client Credentials Flow',
    description: 'The agent authenticates with a client ID and secret to get a short-lived access token. The token is used for API calls. No long-lived keys in transit. Token expires automatically.',
    example: 'POST /oauth/token { grant_type: "client_credentials", client_id, client_secret } → { access_token, expires_in: 3600 }',
    bestFor: 'Agent-to-agent communication, MCP servers calling third-party APIs, production agent networks',
    icon: KeyRound,
    color: 'blue',
  },
]

const agentCardDoDont: { do: string; dont: string }[] = [
  {
    do: 'Endpoint URLs (https://api.yourbusiness.com/v1)',
    dont: 'API keys (sk_live_abc123...)',
  },
  {
    do: 'Supported HTTP methods (GET, POST)',
    dont: 'Database connection strings',
  },
  {
    do: 'Authentication TYPE (OAuth2, API Key header)',
    dont: 'Actual OAuth client secrets',
  },
  {
    do: 'Rate limit info (100 req/min)',
    dont: 'Internal service account tokens',
  },
  {
    do: 'Input/output schemas (JSON Schema)',
    dont: 'Webhook signing secrets',
  },
  {
    do: 'Capability descriptions (natural language)',
    dont: 'Admin passwords or master keys',
  },
]

const d7Checks = [
  { check: 'API keys in public files', impact: '-15 points', severity: 'Critical', description: 'Scans agent-card.json, llms.txt, AGENTS.md, and HTML source for patterns matching API key formats (sk_, pk_, key_, bearer tokens).' },
  { check: 'Secrets in JavaScript bundles', impact: '-12 points', severity: 'Critical', description: 'Checks client-side JS for hardcoded tokens, connection strings, and credentials that should be server-side only.' },
  { check: 'Missing TLS (HTTP-only)', impact: '-10 points', severity: 'High', description: 'All agent communication must be encrypted. HTTP-only endpoints cap the total score at 39/100.' },
  { check: 'No security.txt', impact: '-3 points', severity: 'Medium', description: 'The /.well-known/security.txt file tells agents and researchers how to report vulnerabilities.' },
  { check: 'Exposed error details', impact: '-5 points', severity: 'High', description: 'Stack traces, internal paths, or database error messages in API responses leak infrastructure details.' },
  { check: 'No CORS headers', impact: '-2 points', severity: 'Low', description: 'Missing or overly permissive CORS headers affect how agents from different origins interact with your API.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What exactly goes in agent-card.json?',
    answer:
      'Your agent-card.json should contain: your business name, description, endpoint URLs, supported tools/methods, authentication type (not credentials), input/output schemas, rate limits, and capability descriptions. It tells agents WHAT you can do and HOW to authenticate — but never includes the actual secrets needed to authenticate.',
  },
  {
    question: 'How does AgentHermes detect exposed secrets?',
    answer:
      'The D7 Security dimension (weighted 0.12) scans all publicly accessible files for patterns that match known API key formats. This includes prefix patterns (sk_live_, pk_test_, AKIA for AWS), Base64-encoded strings that decode to credential formats, bearer tokens in HTML meta tags, and connection strings in JavaScript bundles. Finding any exposed secret triggers a critical penalty of -12 to -15 points.',
  },
  {
    question: 'I use environment variables — is that enough for agent readiness?',
    answer:
      'Environment variables are the minimum viable approach and work well for single-service deployments. For higher agent readiness scores, consider adding: secret rotation (change keys without downtime), OAuth client credentials flow (agents get short-lived tokens instead of long-lived keys), and a security.txt file. These improvements can lift D7 Security from 6/12 to 10/12.',
  },
  {
    question: 'What is OAuth client credentials flow and why does it matter for agents?',
    answer:
      'OAuth client credentials flow is how server-to-server authentication works without user involvement. An AI agent presents its client_id and client_secret to your /oauth/token endpoint and receives a short-lived access token (typically 1 hour). The agent uses this token for API calls. When it expires, the agent requests a new one. This is safer than static API keys because tokens auto-expire, can be revoked instantly, and create an audit trail.',
  },
  {
    question: 'Do agent-ready businesses really get penalized for exposed secrets?',
    answer:
      'Yes. AgentHermes scans find API keys in public files in approximately 8% of businesses scanned. Each instance triggers a -12 to -15 point penalty on D7 Security, which is weighted at 0.12 of the total score. A business that would otherwise score 55 (Silver) can drop to 40 (Bronze) from a single exposed secret. More importantly, exposed secrets are a real security vulnerability — not just a scoring issue.',
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

export default function EnvironmentVariablesAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Environment Variables and Agent Readiness: Why Your API Keys Shouldn\'t Be in Your Agent Card',
    description:
      'Security best practices for agent-card.json and MCP servers. Where API keys should live and what AgentHermes D7 Security checks for exposed secrets.',
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
      'https://agenthermes.ai/blog/environment-variables-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Security',
    wordCount: 1900,
    keywords:
      'environment variables API keys agent readiness security, agent-card.json security, secrets management, OAuth client credentials, D7 security score',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Environment Variables and Agent Readiness',
          item: 'https://agenthermes.ai/blog/environment-variables-agent-readiness',
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
      title="Environment Variables and Agent Readiness: Why Your API Keys Shouldn't Be in Your Agent Card"
      shareUrl="https://agenthermes.ai/blog/environment-variables-agent-readiness"
      currentHref="/blog/environment-variables-agent-readiness"
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
            <span className="text-zinc-400">Environment Variables and Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              <Shield className="h-3.5 w-3.5" />
              Security
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Best Practice
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Environment Variables and Agent Readiness:{' '}
            <span className="text-emerald-400">Why Your API Keys Shouldn&apos;t Be in Your Agent Card</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Your{' '}
            <Link href="/blog/agent-card-json-guide" className="text-emerald-400 hover:text-emerald-300 underline">
              agent-card.json
            </Link>{' '}
            tells AI agents what your business can do. It should{' '}
            <strong className="text-zinc-100">never</strong> tell them your secrets. Yet 8% of
            businesses we scan have API keys, tokens, or credentials in publicly accessible files.
            That is a critical security failure — and a direct hit to your Agent Readiness Score.
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
                  12 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE RULE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            The Rule: Capabilities Are Public, Credentials Are Private
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Agent readiness requires two things to be true simultaneously. First, your business
              must be discoverable — agents need to find your capabilities, endpoints, and schemas
              in publicly accessible files like agent-card.json, llms.txt, and OpenAPI specs. Second,
              your secrets must be invisible — API keys, database credentials, webhook signing
              secrets, and tokens must never appear in any file an agent or crawler can access.
            </p>
            <p>
              This sounds obvious, but the agent economy introduces a new category of public
              files that did not exist before. Businesses now create agent-card.json, AGENTS.md,
              llms.txt, and MCP server manifests. Each one is a new surface where secrets can
              accidentally leak. Developers who would never put an API key in their HTML sometimes
              put one in their agent-card.json because they confuse &ldquo;the agent needs to
              authenticate&rdquo; with &ldquo;the agent card needs to contain the key.&rdquo;
            </p>
            <p>
              <strong className="text-zinc-100">The agent card declares HOW to authenticate
              (OAuth2, API key in header, bearer token). The actual credentials live in environment
              variables on the server, never in the card.</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '8%', label: 'of scanned businesses expose secrets', icon: AlertTriangle },
              { value: '-15', label: 'point penalty per exposed key', icon: KeyRound },
              { value: '0.12', label: 'D7 Security weight', icon: Shield },
              { value: '39', label: 'max score without TLS', icon: Lock },
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

      {/* ===== DO VS DON'T ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <FileJson className="h-5 w-5 text-blue-500" />
            What Goes in agent-card.json vs What Stays on the Server
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The line is clear: structure and schemas go in the card, secrets stay on the server.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-2 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                PUT in agent-card.json
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                NEVER put in agent-card.json
              </div>
            </div>
            {agentCardDoDont.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="text-emerald-400">{row.do}</div>
                <div className="text-red-400">{row.dont}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              A well-structured agent-card.json gives an AI agent everything it needs to
              understand your capabilities and initiate authentication — without exposing any
              secret material. The agent reads that your API requires an{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                Authorization: Bearer
              </code>{' '}
              header and that it can obtain a token via OAuth2 at{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                /oauth/token
              </code>. The agent&apos;s own credentials are configured in its runtime environment,
              not pulled from your public files.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHERE SECRETS BELONG ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-purple-500" />
            Where Secrets Belong: Three Approaches by Maturity Level
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            From basic environment variables to full vault infrastructure, each approach
            increases security and contributes to your D7 Security score.
          </p>

          <div className="space-y-4 mb-8">
            {secretsWhereTo.map((method) => {
              const colors = getColorClasses(method.color)
              return (
                <div
                  key={method.method}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <method.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{method.method}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{method.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 mb-3">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{method.example}</code>
                    </p>
                  </div>
                  <p className="text-xs text-zinc-500">
                    <span className="text-zinc-400 font-medium">Best for:</span> {method.bestFor}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Most businesses starting their agent readiness journey should begin with environment
              variables — they are supported by every hosting platform (Vercel, Netlify, AWS,
              Railway, Fly.io) and require zero additional infrastructure. As you scale to multiple
              services or need compliance certification, graduate to a vault service. For{' '}
              <Link href="/blog/oauth-for-agents-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                production agent networks
              </Link>, OAuth client credentials flow is the gold standard.
            </p>
          </div>
        </div>
      </section>

      {/* ===== D7 SECURITY CHECKS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-amber-500" />
            What AgentHermes D7 Security Checks For
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The D7 Security dimension (0.12 weight) evaluates six security factors. Exposed
            secrets are the most damaging, but other checks also affect your score.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Check</div>
              <div>Impact</div>
              <div>Severity</div>
              <div>Details</div>
            </div>
            {d7Checks.map((check, i) => (
              <div
                key={check.check}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{check.check}</div>
                <div className="text-red-400 font-bold">{check.impact}</div>
                <div className={
                  check.severity === 'Critical'
                    ? 'text-red-400'
                    : check.severity === 'High'
                      ? 'text-amber-400'
                      : 'text-zinc-400'
                }>
                  {check.severity}
                </div>
                <div className="text-zinc-500">{check.description}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-8">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">Real example from our scans:</strong> A SaaS
              company scored 52/100 on their first scan — solid Bronze, close to Silver. But
              their agent-card.json contained a live Stripe publishable key and their AGENTS.md
              had a hardcoded webhook URL with the signing secret in a query parameter. After
              the -15 and -12 penalties on D7, their score dropped to 31/100. Removing the
              secrets and re-scanning lifted them back to 52 — a 21-point swing from two lines
              of configuration.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE CORRECT PATTERN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            The Correct Pattern: Declare, Don&apos;t Expose
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The correct pattern separates discovery from authentication. Your public files
              (agent-card.json, llms.txt, OpenAPI spec) declare what you offer and how agents
              should authenticate. Your server-side configuration (environment variables, vault,
              OAuth) handles the actual credentials.
            </p>
            <p>
              Here is what a secure{' '}
              <Link href="/blog/agent-card-json-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                agent-card.json
              </Link>{' '}
              authentication section looks like:
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 mb-8">
            <div className="text-xs text-zinc-500 mb-2 font-medium">agent-card.json (public — safe)</div>
            <pre className="text-sm text-emerald-400 leading-relaxed overflow-x-auto">
{`{
  "authentication": {
    "type": "oauth2",
    "flows": {
      "clientCredentials": {
        "tokenUrl": "https://api.yourbusiness.com/oauth/token",
        "scopes": {
          "read:products": "Read product catalog",
          "write:orders": "Create and manage orders"
        }
      }
    }
  }
}`}
            </pre>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 mb-8">
            <div className="text-xs text-zinc-500 mb-2 font-medium">Server environment (private — never public)</div>
            <pre className="text-sm text-red-400 leading-relaxed overflow-x-auto">
{`# .env (never committed, never in agent-card.json)
OAUTH_CLIENT_SECRET=sk_live_abc123xyz789
STRIPE_SECRET_KEY=sk_live_...
DATABASE_URL=postgresql://user:pass@host:5432/db
WEBHOOK_SIGNING_SECRET=whsec_...`}
            </pre>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The agent reads the public card, learns it needs to use OAuth2 client credentials,
              and requests a token from the declared token URL using its own configured credentials.
              At no point does the agent need secrets from your public files. The authentication
              handshake happens server-to-server using credentials both parties already have in
              their own environments.
            </p>
            <p>
              For more on implementing{' '}
              <Link href="/blog/security-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                security best practices for agent readiness
              </Link>, including CORS, rate limiting, and input validation, see our full security guide.
            </p>
          </div>
        </div>
      </section>

      {/* ===== COMMON MISTAKES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-red-500" />
            Five Common Mistakes That Leak Secrets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Hardcoded keys in agent-card.json',
                detail: 'Developers add an "apiKey" field to their agent card thinking the agent needs it to connect. The agent does not. The agent\'s operator configures credentials in the agent\'s own environment.',
              },
              {
                title: 'Secrets in AGENTS.md examples',
                detail: 'Documentation files include curl examples with real API keys instead of placeholder values. Agents and crawlers index these files. Use "YOUR_API_KEY" as the placeholder.',
              },
              {
                title: 'Client-side JavaScript bundles',
                detail: 'API keys set in Next.js without the NEXT_PUBLIC_ prefix are server-only. But keys WITH the prefix are in the client bundle. Stripe publishable keys are fine; secret keys in client bundles are a critical leak.',
              },
              {
                title: 'Git history exposure',
                detail: 'A key was in the code, got removed, but still exists in git history. If the repo is public, the key is public. Rotate any key that ever touched a git commit, even if you removed it.',
              },
              {
                title: 'Webhook URLs with embedded secrets',
                detail: 'Webhook URLs like /webhook?secret=abc123 expose the signing secret in server logs, analytics tools, and any file that references the URL. Use header-based authentication for webhooks.',
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
                title: 'Security and Agent Readiness: The Complete Guide',
                href: '/blog/security-agent-readiness',
                tag: 'Security',
                tagColor: 'red',
              },
              {
                title: 'OAuth for Agents: Authentication Guide',
                href: '/blog/oauth-for-agents-guide',
                tag: 'Developer Guide',
                tagColor: 'purple',
              },
              {
                title: 'agent-card.json: The Complete Guide',
                href: '/blog/agent-card-json-guide',
                tag: 'Standard',
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
            Are your secrets exposed?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan. The D7 Security dimension checks for exposed
            API keys, missing TLS, and other vulnerabilities — in 60 seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Check My Security Score
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
