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
  FileCode,
  Globe,
  HelpCircle,
  Key,
  Layers,
  Network,
  Search,
  Server,
  Settings,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Webhook,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "The CTO's Guide to Agent Readiness: Technical Decisions That Impact Your Score | AgentHermes",
  description:
    '10 architectural decisions that directly impact your Agent Readiness Score. API-first vs website-first, OpenAPI vs ad-hoc docs, Bearer auth vs session cookies, and 7 more. A CTO who reads this can estimate their score before scanning.',
  keywords: [
    'CTO guide agent readiness technical',
    'agent readiness architecture',
    'API-first agent readiness',
    'CTO AI agents',
    'agent readiness technical decisions',
    'engineering agent readiness',
    'API architecture AI agents',
    'agent readiness scoring guide',
  ],
  openGraph: {
    title: "The CTO's Guide to Agent Readiness: Technical Decisions That Impact Your Score",
    description:
      '10 architecture decisions that map directly to your Agent Readiness Score. Each one impacts a specific dimension with specific point values. Estimate your score before scanning.',
    url: 'https://agenthermes.ai/blog/cto-guide-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "The CTO's Guide to Agent Readiness",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The CTO's Guide to Agent Readiness: Technical Decisions That Impact Your Score",
    description:
      '10 architecture decisions, each mapped to a dimension and point value. Estimate your Agent Readiness Score before scanning.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/cto-guide-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const decisions = [
  {
    number: 1,
    title: 'API-First vs Website-First Architecture',
    wrong: 'Website-first: build HTML pages, add API later (or never)',
    right: 'API-first: build the API, then build the website on top of it',
    dimension: 'D2 API Quality',
    weight: '15%',
    impact: '+15-25 pts',
    explanation: 'API-first businesses score 45+ on D2 alone. Website-first businesses score 0-5. This is the single biggest architectural decision for agent readiness because D2 carries the highest weight of any dimension.',
    icon: Code2,
    color: 'emerald',
  },
  {
    number: 2,
    title: 'OpenAPI Spec vs Ad-Hoc Documentation',
    wrong: 'Ad-hoc docs: Markdown pages, Notion wiki, or PDF guides',
    right: 'OpenAPI 3.0+ spec: machine-readable, auto-discoverable, generates client SDKs',
    dimension: 'D1 Discoverability + D2 API Quality',
    weight: '27%',
    impact: '+10-18 pts',
    explanation: 'An OpenAPI spec at /openapi.json or /swagger.json is the single most impactful file you can publish. Agents parse it instantly to understand every endpoint, parameter, and response shape. Ad-hoc docs require LLMs to interpret natural language — slower, less reliable, and prone to hallucinated endpoints.',
    icon: FileCode,
    color: 'blue',
  },
  {
    number: 3,
    title: 'Bearer Token Auth vs Session Cookies',
    wrong: 'Session cookies: set-cookie header, CSRF tokens, browser-dependent state',
    right: 'Bearer tokens: Authorization: Bearer <token> header, stateless, machine-friendly',
    dimension: 'D7 Security',
    weight: '12%',
    impact: '+8-12 pts',
    explanation: 'AI agents do not have browsers. They cannot store cookies, handle CSRF tokens, or maintain session state. Bearer token authentication is the only auth pattern that works reliably for agent-to-API communication. OAuth 2.0 client_credentials flow is the gold standard.',
    icon: Key,
    color: 'amber',
  },
  {
    number: 4,
    title: 'Structured JSON Errors vs HTML Error Pages',
    wrong: 'HTML 500 page: pretty for humans, meaningless to agents',
    right: 'JSON errors: { "error": "message", "code": "INVALID_PARAM", "request_id": "abc" }',
    dimension: 'D6 Data Quality + D9 Agent Experience',
    weight: '20%',
    impact: '+6-10 pts',
    explanation: 'When an agent hits an error, it needs three things: what went wrong (error), a machine-parseable code (code), and a way to reference the failure (request_id). HTML error pages provide none of these. Agents that receive HTML errors cannot self-correct — they either retry blindly or give up.',
    icon: Target,
    color: 'red',
  },
  {
    number: 5,
    title: 'Cursor Pagination vs Offset Pagination',
    wrong: 'Offset: ?page=2&limit=20 — breaks when data changes between pages',
    right: 'Cursor: ?after=abc123&limit=20 — stable, no skipped or duplicated records',
    dimension: 'D9 Agent Experience',
    weight: '10%',
    impact: '+2-4 pts',
    explanation: 'Agents iterate through datasets automatically, often processing thousands of records. Offset pagination causes duplicate or skipped items when records are inserted or deleted during iteration. Cursor-based pagination is deterministic regardless of data changes. Agents trust cursor pagination; they work around offset pagination.',
    icon: Layers,
    color: 'purple',
  },
  {
    number: 6,
    title: 'Webhook Events vs Polling',
    wrong: 'Polling: agents must call GET /resource every N seconds to check for changes',
    right: 'Webhooks: POST to agent endpoint when state changes, with HMAC signing and retry',
    dimension: 'D9 Agent Experience',
    weight: '10%',
    impact: '+3-5 pts',
    explanation: 'Polling burns agent compute budget and misses events between intervals. Webhooks push state changes in real time. AgentHermes checks for webhook documentation, event catalog, HMAC signature verification, and retry logic. The top scorers (Stripe, GitHub, Slack) all publish comprehensive webhook systems.',
    icon: Webhook,
    color: 'emerald',
  },
  {
    number: 7,
    title: 'Sandbox Mode vs Production-Only',
    wrong: 'Production-only: agents must use real data and real money to test integrations',
    right: 'Sandbox mode: test credentials, fake data, same API surface, no real consequences',
    dimension: 'D3 Onboarding',
    weight: '8%',
    impact: '+4-7 pts',
    explanation: 'Agents will not risk real transactions while learning your API. Stripe test mode (sk_test_*) is the gold standard: identical API behavior with fake money. Without a sandbox, the agent integration cost is too high — one wrong API call with real data is unrecoverable.',
    icon: Shield,
    color: 'blue',
  },
  {
    number: 8,
    title: 'Public Status Page vs No Monitoring',
    wrong: 'No public monitoring: agents discover outages by hitting errors',
    right: 'Status page: status.domain.com or /status with uptime history and incident log',
    dimension: 'D8 Reliability',
    weight: '13%',
    impact: '+4-8 pts',
    explanation: 'Before delegating work to your API, agents check if you are operational. A status page at a well-known URL (status.domain.com, /health, /status) lets agents make this check instantly. Without one, agents must infer reliability from error rates — and they learn quickly which APIs to avoid.',
    icon: BarChart3,
    color: 'amber',
  },
  {
    number: 9,
    title: 'Versioned APIs vs Breaking Changes',
    wrong: 'Unversioned: endpoints change behavior without notice, breaking agent integrations',
    right: 'Versioned: /v1/ prefix, Accept-Version header, 2-year backward compatibility',
    dimension: 'D8 Reliability + D9 Agent Experience',
    weight: '23%',
    impact: '+3-6 pts',
    explanation: 'Agents hardcode API interaction patterns. A breaking change that renames a field or restructures a response causes agent failures that are never manually fixed — the agent just stops using your API. Stripe maintains backward compatibility for years. Unversioned APIs permanently lose agent traffic after the first breaking change.',
    icon: TrendingUp,
    color: 'purple',
  },
  {
    number: 10,
    title: 'MCP Server + Agent Card vs Nothing',
    wrong: 'No agent-native infrastructure: rely entirely on OpenAPI discovery',
    right: 'MCP server with tools + agent-card.json at /.well-known/ for A2A discovery',
    dimension: 'Agent-Native Bonus',
    weight: '7%',
    impact: '+5-8 pts',
    explanation: 'The agent-native bonus is the newest scoring dimension. It rewards businesses that go beyond APIs to provide MCP servers (tool-calling protocol for agents), agent-card.json (A2A discovery), and llms.txt (LLM-readable business summary). Only 2 of 500 businesses scanned have any of these. Shipping all three is 30 minutes of work for +5-8 points.',
    icon: Bot,
    color: 'emerald',
  },
]

const scoreEstimate = [
  { range: '0-19', label: 'ARL-0 Dark', description: 'Website-only, no API, session cookies, HTML errors. Completely invisible to agents.', color: 'red' },
  { range: '20-39', label: 'ARL-1 Visible', description: 'Has an API but no spec. Basic auth. No sandbox, no status page, no versioning. Agents can find you but struggle to use you.', color: 'amber' },
  { range: '40-59', label: 'Bronze', description: 'OpenAPI spec published. Bearer auth. Some structured errors. Missing webhooks, sandbox, and agent-native files.', color: 'amber' },
  { range: '60-74', label: 'Silver', description: 'Full OpenAPI + Bearer + structured errors + status page + versioned API + webhooks. Missing MCP server and agent-card.json.', color: 'blue' },
  { range: '75-89', label: 'Gold', description: 'All 10 decisions made correctly. MCP server + agent-card + llms.txt + sandbox + cursor pagination + HMAC webhooks.', color: 'emerald' },
  { range: '90-100', label: 'Platinum', description: 'Gold + x402 micropayments + sub-100ms p95 latency + automated onboarding + multi-protocol support. Nobody has achieved this yet.', color: 'purple' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How long does it take to implement all 10 decisions?',
    answer:
      'It depends on your starting point. If you already have an API, adding an OpenAPI spec (Decision 2), structured errors (Decision 4), and agent-card.json (Decision 10) takes a single sprint — maybe 2-3 days of engineering time. If you are website-only (Decision 1), the API-first migration is the foundation and takes 2-6 months depending on complexity. The good news: each decision is independent. You can ship them in any order and see incremental score improvements after each one.',
  },
  {
    question: 'Which decision should I prioritize first?',
    answer:
      'If you have no API: Decision 1 (API-first) is the prerequisite for everything else. If you have an API but no spec: Decision 2 (OpenAPI) is the highest-leverage single file you can ship. If you already have an OpenAPI spec: Decision 10 (MCP + agent-card) is the fastest path to the agent-native bonus that separates Silver from Gold.',
  },
  {
    question: 'How accurate is the score estimate in this article?',
    answer:
      'The estimates are based on scoring 500 businesses and identifying the patterns that separate each tier. Your actual score also depends on factors like response latency, documentation quality, and pricing transparency that are not covered by these 10 decisions. However, these 10 decisions account for roughly 70-80% of the variance between high and low scorers. Run a free scan at /audit to see your exact score.',
  },
  {
    question: 'Do I need to be API-first to score well?',
    answer:
      'Technically no, but practically yes. The highest-scoring non-API-first business in our 500-business scan scored 38 — below Bronze. API-first architecture is not just one decision; it is the foundation that makes every other decision possible. Without callable endpoints, there is nothing for agents to discover, authenticate against, or use. The score caps at 29 without callable endpoints.',
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

export default function CtoGuideAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "The CTO's Guide to Agent Readiness: Technical Decisions That Impact Your Score",
    description:
      '10 architectural decisions that directly impact your Agent Readiness Score. Each maps to a specific dimension and point value. A CTO who reads this can estimate their score before scanning.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/cto-guide-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Guide',
    wordCount: 2000,
    keywords:
      'CTO guide agent readiness, API architecture AI agents, agent readiness technical decisions, engineering agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: "The CTO's Guide to Agent Readiness",
          item: 'https://agenthermes.ai/blog/cto-guide-agent-readiness',
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
      title="The CTO's Guide to Agent Readiness: Technical Decisions That Impact Your Score"
      shareUrl="https://agenthermes.ai/blog/cto-guide-agent-readiness"
      currentHref="/blog/cto-guide-agent-readiness"
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
            <span className="text-zinc-400">CTO Guide to Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Settings className="h-3.5 w-3.5" />
              Technical Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Executive
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            The CTO&apos;s Guide to Agent Readiness:{' '}
            <span className="text-emerald-400">Technical Decisions That Impact Your Score</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Your Agent Readiness Score is not random. It is the direct result of{' '}
            <strong className="text-zinc-100">10 architectural decisions</strong> your engineering
            team made (or did not make). Each one maps to a specific dimension with a specific point
            impact. A CTO who reads this article can estimate their score before running a single scan.
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

      {/* ===== INTRO ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Why Architecture Determines Agent Readiness
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              After scanning 500 businesses, one pattern is clear: <strong className="text-zinc-100">
              agent readiness is an architecture outcome, not a marketing choice</strong>. The
              businesses that score Silver and Gold did not set out to be &ldquo;agent-ready.&rdquo;
              They made sound API architecture decisions that happen to be exactly what AI agents need.
            </p>
            <p>
              Stripe scores 68. Resend scores 75. Vercel scores 70. None of them has an
              &ldquo;agent readiness team.&rdquo; They have engineering teams that chose API-first
              architecture, published OpenAPI specs, used Bearer auth, returned structured errors,
              and built status pages. These are CTO decisions.
            </p>
            <p>
              Conversely, businesses that score under 20 made the opposite choices: website-first
              architecture, session cookies, HTML error pages, no API documentation. These are also
              CTO decisions — or decisions made by not having a CTO at all.
            </p>
            <p>
              Here are the 10 decisions, each mapped to the dimension it impacts and the approximate
              points it contributes. Read through them, tally your answers, and you will have a
              reasonable estimate of your score before{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                running a scan
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE 10 DECISIONS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The 10 Decisions
          </h2>

          <div className="space-y-6">
            {decisions.map((decision) => {
              const colors = getColorClasses(decision.color)
              return (
                <div
                  key={decision.number}
                  className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <decision.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold text-zinc-100">
                          #{decision.number}: {decision.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="text-blue-400 font-medium">{decision.dimension}</span>
                        <span className="text-zinc-600">|</span>
                        <span className="text-zinc-500">Weight: {decision.weight}</span>
                        <span className="text-zinc-600">|</span>
                        <span className="text-emerald-400 font-medium">Impact: {decision.impact}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                      <div className="text-xs font-bold text-red-400 mb-1">Wrong choice</div>
                      <p className="text-xs text-zinc-500 leading-relaxed">{decision.wrong}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <div className="text-xs font-bold text-emerald-400 mb-1">Right choice</div>
                      <p className="text-xs text-zinc-500 leading-relaxed">{decision.right}</p>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed">{decision.explanation}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== ESTIMATE YOUR SCORE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Estimate Your Score
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Count how many of the 10 decisions you have made correctly. Here is where you likely
              land:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {scoreEstimate.map((tier) => {
              const colors = getColorClasses(tier.color)
              return (
                <div
                  key={tier.range}
                  className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className={`flex h-12 w-16 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                    <span className={`text-sm font-bold ${colors.text}`}>{tier.range}</span>
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${colors.text} mb-1`}>{tier.label}</div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{tier.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The math:</strong> If you made 0-2 correct
              decisions, expect 0-25. Three to five correct decisions typically produce 30-50.
              Six to eight put you in 50-70. All 10 correct decisions push toward 75+. The exact
              score depends on implementation quality (not just presence), but the decisions
              themselves account for 70-80% of the variance across 500 scans.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT TOP SCORERS DO ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            What the Top Scorers All Have in Common
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Every business scoring Silver or above in our 500-business scan shares the same
              foundation: <strong className="text-zinc-100">API-first architecture with published
              OpenAPI spec, Bearer token auth, structured JSON errors, a status page, and versioned
              endpoints</strong>. That is decisions 1, 2, 3, 4, 8, and 9 — accounting for 70% of
              the scoring weight.
            </p>
            <p>
              The top scorer (Resend, 75 Gold) has all 10. The next tier (Vercel 70, Supabase 69,
              Stripe 68) has 8-9 of 10. The difference between Silver and Gold is always the
              agent-native files: MCP server, agent-card.json, and llms.txt. These take an
              afternoon to ship and represent{' '}
              <Link href="/blog/improve-agent-readiness-score" className="text-emerald-400 hover:text-emerald-300 underline">
                the easiest path from Silver to Gold
              </Link>.
            </p>
            <p>
              Meanwhile, the{' '}
              <Link href="/blog/enterprise-vs-startup-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Fortune 500 averages 37
              </Link> — below Bronze. Not because they lack engineering resources, but because their
              architecture was built for human-first web experiences. The decision to be website-first
              (Decision 1 wrong) caps everything else.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { company: 'Resend', score: '75', tier: 'Gold', decisions: '10/10' },
              { company: 'Vercel', score: '70', tier: 'Silver', decisions: '9/10' },
              { company: 'Stripe', score: '68', tier: 'Silver', decisions: '9/10' },
              { company: 'Fortune 500 avg', score: '37', tier: 'Below Bronze', decisions: '3-4/10' },
            ].map((item) => (
              <div
                key={item.company}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <div className="text-2xl font-bold text-zinc-100">{item.score}</div>
                <div className="text-sm font-medium text-emerald-400">{item.tier}</div>
                <div className="text-xs text-zinc-500 mt-1">{item.company}</div>
                <div className="text-xs text-zinc-600 mt-0.5">{item.decisions} decisions</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE PRIORITY ORDER ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            The Priority Order: What to Ship First
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              If you are starting from zero, the implementation order matters. Here is the sequence
              that produces the fastest score improvement based on weight-per-effort:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { priority: 'P0', title: 'API-first architecture (Decision 1)', effort: '2-6 months', impact: 'Foundation — nothing else works without this', icon: Code2 },
              { priority: 'P1', title: 'OpenAPI spec (Decision 2)', effort: '1-3 days', impact: '+10-18 pts across D1 and D2', icon: FileCode },
              { priority: 'P1', title: 'Bearer token auth (Decision 3)', effort: '1-2 days', impact: '+8-12 pts on D7', icon: Key },
              { priority: 'P2', title: 'Structured JSON errors (Decision 4)', effort: '2-4 hours', impact: '+6-10 pts across D6 and D9', icon: Target },
              { priority: 'P2', title: 'Status page (Decision 8)', effort: '1-2 hours', impact: '+4-8 pts on D8', icon: BarChart3 },
              { priority: 'P3', title: 'Agent-native files (Decision 10)', effort: '2-4 hours', impact: '+5-8 pts agent bonus', icon: Bot },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                  {item.priority}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="h-4 w-4 text-emerald-400" />
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-zinc-500">Effort: {item.effort}</span>
                    <span className="text-emerald-400">{item.impact}</span>
                  </div>
                </div>
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
                title: 'The Agent Readiness Checklist: 30 Signals Every Business Should Have',
                href: '/blog/checklist-agent-ready-business',
                tag: 'Checklist',
                tagColor: 'emerald',
              },
              {
                title: 'How to Improve Your Agent Readiness Score: Step by Step',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
                tagColor: 'emerald',
              },
              {
                title: 'Why Fortune 500 Companies Score Lower Than Startups',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Research',
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
            See your actual score
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            You have estimated it. Now verify it. Run a free Agent Readiness Scan and see exactly
            how your architecture maps to all 9 dimensions. 60 seconds. No signup.
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
