import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileCode,
  Globe,
  HelpCircle,
  Lock,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Scoring Caps at 39: The HTTPS and Endpoint Requirements That Kill Agent Readiness | AgentHermes',
  description:
    'Two hard caps in the Agent Readiness scoring model. No TLS means max 39 no matter what else you do. No callable endpoints means max 29. Here is why, how many businesses hit these caps, and how to fix both.',
  keywords: [
    'agent readiness score caps',
    'HTTPS requirement agent readiness',
    'API endpoint requirement',
    'TLS agent readiness',
    'agent readiness scoring',
    'how agent readiness is scored',
    'agent readiness methodology',
    'AgentHermes scoring caps',
  ],
  openGraph: {
    title: 'Why Scoring Caps at 39: The HTTPS and Endpoint Requirements That Kill Agent Readiness',
    description:
      'Two hard caps: no TLS = max 39, no callable endpoints = max 29. Here is why, and how to remove both.',
    url: 'https://agenthermes.ai/blog/scoring-caps-explained',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agent Readiness Scoring Caps Explained',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Scoring Caps at 39: The HTTPS and Endpoint Requirements',
    description:
      'No TLS caps your Agent Readiness Score at 39. No callable endpoints caps it at 29. Here is how to remove both caps.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/scoring-caps-explained',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const capPatterns = [
  {
    name: 'Marketing-only site',
    description: 'A modern marketing website with beautiful copy, schema.org markup, and solid SEO — but no API, no MCP server, no callable endpoints. The business exists only as readable HTML.',
    cap: 29,
    capReason: 'No callable endpoints',
    icon: Globe,
    color: 'amber',
  },
  {
    name: 'HTTP-only legacy business',
    description: 'An older business still serving its primary domain over plain HTTP. Redirects to HTTPS may exist on some subpages but the main entry is unencrypted. AI agents refuse to connect.',
    cap: 39,
    capReason: 'No TLS (HTTPS)',
    icon: Lock,
    color: 'red',
  },
  {
    name: 'Mixed-content site',
    description: 'HTTPS on the main site but the API endpoint or webhook URL is HTTP. Even one insecure URL in the agent-facing surface triggers the cap because agents refuse the insecure connection.',
    cap: 39,
    capReason: 'TLS failure on agent-facing endpoint',
    icon: Shield,
    color: 'red',
  },
  {
    name: 'Phone-and-email only',
    description: 'A professional services business whose only interaction surface is a phone number and a contact form that emails a mailbox. No endpoint an agent can call, no structured response it can parse.',
    cap: 29,
    capReason: 'No callable endpoints',
    icon: XCircle,
    color: 'amber',
  },
  {
    name: 'PDF-based menu or catalog',
    description: 'A business whose product or service catalog is a PDF download or an image. The information exists but cannot be programmatically queried. The agent has no way to get a structured answer.',
    cap: 29,
    capReason: 'No callable endpoints',
    icon: FileCode,
    color: 'amber',
  },
]

const fixSteps = [
  {
    cap: 'No TLS (cap: 39)',
    steps: [
      'Enable free HTTPS via Cloudflare — point nameservers, enable full SSL, done in under 30 minutes',
      'Or use Let\'s Encrypt via certbot for a one-line cert on your own server',
      'Force HTTP to HTTPS with a 301 redirect so agents always land on the secure URL',
      'Add HSTS header (Strict-Transport-Security: max-age=31536000) to signal permanent HTTPS commitment',
      'Verify with SSL Labs (ssllabs.com/ssltest) — aim for A or A+ grade',
    ],
  },
  {
    cap: 'No callable endpoints (cap: 29)',
    steps: [
      'Expose at least one JSON endpoint — even a simple /api/hours or /api/services is enough to clear the cap',
      'Return structured JSON (Content-Type: application/json) with predictable field names',
      'Document the endpoint in an OpenAPI spec at /openapi.json or /.well-known/openapi.json',
      'Add the endpoint to your agent-card.json or publish an llms.txt that references it',
      'Require auth if the data is sensitive — a 401 response with a JSON error body scores 87% of a 200 response',
    ],
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does AgentHermes cap scores at 39 without TLS?',
    answer:
      'AI agents refuse to connect to unencrypted endpoints as a security default. Modern browsers have warned about HTTP for years, and AI agent runtimes (Claude, ChatGPT, and others) follow the same policy — they will not send user data or credentials over an unencrypted channel. A business on HTTP is not just insecure, it is unreachable. The 39 cap encodes that reality. No matter how strong the other 8 dimensions are, if an agent cannot connect, the business is not agent-ready.',
  },
  {
    question: 'Why does AgentHermes cap scores at 29 without callable endpoints?',
    answer:
      'Agent Readiness measures whether an AI agent can use your business programmatically. If there is no callable endpoint — no JSON API, no MCP server, no webhook receiver — then there is nothing for the agent to call. The agent can read your HTML page and tell the user what you offer, but it cannot book, quote, order, or transact. That is a fundamentally different category of business from one that exposes even a single endpoint. The 29 cap encodes that gap. Below 29 is ARL-0 (Dark) territory.',
  },
  {
    question: 'How do I know if I am hitting a scoring cap?',
    answer:
      'Run a free scan at agenthermes.ai/audit. If your total score is exactly 39 or 29, or clusters within 1-2 points of those numbers, you are cap-limited. The dimension breakdown will also show D7 Security heavily penalized (TLS cap) or D2 API Quality at near-zero (endpoints cap). The scanner also returns an explicit cap flag when it detects either condition. The fix is always the same: remove the cap-driver before improving any other dimension.',
  },
  {
    question: 'Can I get above 39 with a partial HTTPS setup?',
    answer:
      'No. The cap triggers on TLS failure at any agent-facing entry point. If your main site is HTTPS but your API is HTTP, the agent-facing endpoint fails the check and the cap still applies. Similarly, self-signed certificates, expired certificates, and certificates that fail chain validation all trigger the cap. The check is binary: either the agent can complete a valid TLS handshake on every endpoint it needs to touch, or it cannot. Partial setups fail.',
  },
  {
    question: 'What is the cheapest way to remove both caps?',
    answer:
      'Cloudflare gives you free HTTPS with a 10-minute setup — point your nameservers, enable full SSL, and the 39 cap is gone. For the 29 cap, the cheapest path is a single serverless function (Vercel, Cloudflare Workers, AWS Lambda) returning JSON for one query. A plumber could ship /api/service-areas returning the ZIP codes they serve. A restaurant could ship /api/hours. That one endpoint, behind HTTPS, clears both caps and takes a single afternoon. Total cost: $0 if you stay in free tiers.',
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

export default function ScoringCapsExplainedPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Scoring Caps at 39: The HTTPS and Endpoint Requirements That Kill Agent Readiness',
    description:
      'Two hard caps in the Agent Readiness scoring model. No TLS = max 39. No callable endpoints = max 29. A complete explanation of why, and how to remove both caps.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/scoring-caps-explained',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Methodology',
    wordCount: 1750,
    keywords:
      'agent readiness score caps, HTTPS requirement agent readiness, API endpoint requirement, TLS agent readiness, AgentHermes scoring',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Scoring Caps Explained',
          item: 'https://agenthermes.ai/blog/scoring-caps-explained',
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
      title="Why Scoring Caps at 39: The HTTPS and Endpoint Requirements That Kill Agent Readiness"
      shareUrl="https://agenthermes.ai/blog/scoring-caps-explained"
      currentHref="/blog/scoring-caps-explained"
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
            <span className="text-zinc-400">Scoring Caps Explained</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Lock className="h-3.5 w-3.5" />
              Methodology
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Scoring Transparency
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Scoring Caps at 39:{' '}
            <span className="text-emerald-400">The HTTPS and Endpoint Requirements That Kill Agent Readiness</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The Agent Readiness scoring model has two <strong className="text-zinc-100">hard caps</strong>
            that override everything else. No TLS means the score cannot exceed 39. No callable endpoints
            means the score cannot exceed 29. Both caps exist because AI agents enforce them at runtime,
            not because the scoring model is punitive. Here is how the caps work, how many businesses hit
            them, and the cheapest way to remove both.
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
                  11 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT ARE THE CAPS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            The Two Hard Caps
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The Agent Readiness Score is a weighted combination of 9 dimensions on a 0-100 scale. Most
              dimensions move the score in small increments. But two checks are binary gates — they do not
              just reduce the score, they <strong className="text-zinc-100">cap it</strong>. No matter how
              well a business scores on everything else, if either cap triggers, the total cannot climb past
              the cap value.
            </p>
            <p>
              This is intentional. Agent Readiness is not a beauty contest across 9 factors. It is a
              measurement of whether an AI agent can successfully use the business. Two failure modes break
              that entirely: (1) the agent cannot connect because the transport is insecure, and (2) the
              agent cannot do anything because there is no endpoint to call. Either failure makes the other
              7 dimensions irrelevant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                  <Lock className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-400">39</div>
                  <div className="text-xs text-zinc-500">maximum without TLS</div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">No TLS Cap</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                If any agent-facing endpoint is served over HTTP (or has a broken TLS setup), the total
                score is capped at 39. Stays in the &ldquo;Not Scored&rdquo; tier regardless of other signals.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <Server className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-400">29</div>
                  <div className="text-xs text-zinc-500">maximum without endpoints</div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-2">No Endpoints Cap</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                If the business has no callable JSON endpoint anywhere — no API, no MCP server, no webhook
                receiver — the total score is capped at 29. Stays in ARL-0 (Dark) territory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY THESE CAPS EXIST ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Why These Caps Exist
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Both caps are downstream of how AI agents actually behave, not of scoring philosophy. When
              Claude, ChatGPT, or any modern agent runtime encounters an endpoint, it runs two checks before
              anything else: is the transport secure, and is there a callable surface. Fail either, and the
              agent abandons the interaction — no retry, no fallback, just a different business.
            </p>
            <p>
              <strong className="text-zinc-100">The TLS check</strong> is a security default. Agents handle
              user data, credentials, and payment tokens. They cannot responsibly send that over HTTP. The
              runtime blocks the connection at the HTTP client layer. This is the same policy browsers have
              enforced for years with mixed-content warnings, HSTS, and marking HTTP as &ldquo;Not
              Secure&rdquo; in the address bar. AI agents inherited the policy and made it stricter.
            </p>
            <p>
              <strong className="text-zinc-100">The endpoints check</strong> is a capability default.
              Agent Readiness asks &ldquo;can the agent use this business?&rdquo; and the minimum required
              affordance is one callable endpoint. A static website is readable by an agent but not usable.
              The agent can tell a user &ldquo;here is what this business offers,&rdquo; but it cannot book,
              quote, order, or transact. That is not agent readiness — that is just a website that happens
              to be crawlable. The 29 cap keeps those two categories distinct.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-blue-400">Related dimensions that still cost you:</strong> Below the
              caps, the normal scoring model still applies. D7 Security (weight 0.12) and D2 API Quality
              (weight 0.15) both penalize heavily when TLS and endpoints are missing — so a business hitting
              a cap usually scores far below the cap value too, because those two dimensions alone represent
              over a quarter of the total score.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHO HITS THE CAPS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Who Hits These Caps
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Of the 500 businesses AgentHermes has scanned, 199 score below Bronze (under 40). Many of those
            199 are capped at 29 or 39. Here are the five patterns we see repeatedly in cap-driven scores.
          </p>

          <div className="space-y-4 mb-8">
            {capPatterns.map((pattern) => {
              const colors = getColorClasses(pattern.color)
              return (
                <div
                  key={pattern.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <pattern.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-zinc-100">{pattern.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-bold ${colors.text}`}>Cap: {pattern.cap}</span>
                        <span className="text-xs text-zinc-500">— {pattern.capReason}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{pattern.description}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern across all five: these are businesses that have not yet built anything for the
              agent channel. They may have a great website, a strong SEO program, and real human customers.
              The agent channel requires a different kind of infrastructure — secure transport and executable
              interfaces — and both caps are designed to make that requirement visible in the score.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO FIX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            How to Remove Each Cap
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Both caps are cheap to remove — free in most cases, and a single afternoon of engineering time.
            Fix these before investing in any other dimension, because every other improvement is worthless
            while a cap is active.
          </p>

          <div className="space-y-6 mb-8">
            {fixSteps.map((fix) => (
              <div
                key={fix.cap}
                className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20"
              >
                <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  {fix.cap}
                </h3>
                <ul className="space-y-3">
                  {fix.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mt-0.5">
                        {i + 1}
                      </div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Order matters. Fix TLS first if you have the 39 cap — it is the smaller effort and blocks
              every other improvement from being counted. Once TLS is live, expose one callable endpoint
              to clear the 29 cap. Together these two fixes typically move a business from below 40 to
              somewhere in the 50s, because the scanner can now credit D7 Security, D2 API Quality, and
              D8 Reliability at their true values instead of zero.
            </p>
            <p>
              After both caps are removed, the{' '}
              <Link href="/blog/improve-agent-readiness-score" className="text-emerald-400 hover:text-emerald-300 underline">
                10-step improvement playbook
              </Link>{' '}
              tells you what to fix next — usually an OpenAPI spec, an agent-card.json, and an llms.txt at
              root. Those three files alone move most businesses from Bronze into Silver.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AUTH-AWARE BONUS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-500" />
            The Auth-Aware Scoring Rule
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              One scoring detail worth knowing when you remove the 29 cap: your endpoint does not need to
              be public. AgentHermes is auth-aware — a protected endpoint that returns a structured 401
              with a JSON error body scores{' '}
              <strong className="text-zinc-100">87% of what a public 200 response scores</strong>. The
              scoring model rewards protected-but-structured APIs almost as highly as public ones.
            </p>
            <p>
              This matters for businesses worried that exposing an endpoint means leaking data. You can
              expose /api/quote behind Bearer token auth, return a structured 401 error when the token is
              missing, and get 87% of the D2 credit. The agent knows the endpoint exists, knows how to
              authenticate, and can negotiate credentials through your onboarding flow — all without you
              giving away anything.
            </p>
            <p>
              What the model penalizes is <em>unstructured</em> failure. A 404, a blank response, a
              proprietary HTML error page, or a timeout all score near zero. The signal agents need is not
              &ldquo;public access,&rdquo; it is &ldquo;predictable response shape.&rdquo; That is the gap
              between no endpoints (cap 29) and protected endpoints with structured auth (87% of full
              credit).
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
                title: 'How to Improve Your Agent Readiness Score: A Step-by-Step Guide',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
                tagColor: 'green',
              },
              {
                title: 'What Is Agent Readiness? The Complete Guide',
                href: '/blog/what-is-agent-readiness',
                tag: 'Complete Guide',
                tagColor: 'emerald',
              },
              {
                title: 'ARL Levels Explained: From Dark to Interoperable',
                href: '/blog/arl-levels-explained',
                tag: 'Framework',
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
            Find out if you are cap-limited
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free scan in 60 seconds. If your score is exactly 39 or 29, you are hitting a cap — and
            the fix is cheaper than you think.
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
