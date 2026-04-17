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
  CreditCard,
  DollarSign,
  FileJson,
  FileText,
  Globe,
  HelpCircle,
  Key,
  Layers,
  MessageSquare,
  Server,
  Shield,
  Signal,
  Sparkles,
  Target,
  TrendingUp,
  User,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Slack Scores 68 for Agent Readiness (And What Keeps It From Gold) | AgentHermes',
  description:
    'A dimension-by-dimension breakdown of Slack\'s 68 Silver Agent Readiness Score. Excellent Web API and Events API, strong OAuth security, but no agent-card.json, no llms.txt, no MCP server, and enterprise pricing hidden behind "contact sales." Three files would push Slack to Gold.',
  keywords: [
    'Slack agent readiness score',
    'Slack agent readiness',
    'Slack API agent',
    'Slack MCP server',
    'Slack agent readiness breakdown',
    'agent readiness case study Slack',
    'Slack Web API agent',
    'Slack Events API',
    'Slack Silver score',
  ],
  openGraph: {
    title: 'Why Slack Scores 68 for Agent Readiness (And What Keeps It From Gold)',
    description:
      'Dimension-by-dimension breakdown of Slack\'s 68 Silver. Excellent API, strong security, but missing 3 files that would push it to Gold.',
    url: 'https://agenthermes.ai/blog/slack-agent-readiness-breakdown',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why Slack Scores 68 for Agent Readiness (And What Keeps It From Gold)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Slack Scores 68 for Agent Readiness (And What Keeps It From Gold)',
    description:
      'Slack scores 68 Silver. Excellent Web API, strong OAuth. Missing: agent-card.json, llms.txt, MCP server. 3 files from Gold.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/slack-agent-readiness-breakdown',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensions = [
  {
    id: 'D1',
    label: 'Discovery',
    score: 55,
    weight: 0.12,
    verdict: 'partial',
    icon: Globe,
    analysis:
      'Slack has rich developer documentation and a sitemap, but no agent-card.json, no llms.txt, and no AGENTS.md. Agents discover Slack through brand recognition and search results — not through structured agent discovery protocols. The documentation is comprehensive but designed for human developers, not AI agent consumption.',
  },
  {
    id: 'D2',
    label: 'API Quality',
    score: 85,
    weight: 0.15,
    verdict: 'strong',
    icon: Zap,
    analysis:
      'Slack\'s strongest dimension. The Web API has 200+ methods with consistent JSON responses and clear error codes. The Events API provides real-time webhooks. Block Kit offers structured UI primitives. Every response is typed, documented, and versioned. This is enterprise-grade API design that agents can reliably interact with.',
  },
  {
    id: 'D3',
    label: 'Onboarding',
    score: 62,
    weight: 0.08,
    verdict: 'partial',
    icon: User,
    analysis:
      'App creation through api.slack.com/apps is self-service for standard tiers. Agents can obtain OAuth tokens via the standard flow. But workspace installation requires a human admin to approve. Enterprise Grid onboarding requires a sales process. An agent can create a Slack app but cannot get it installed in most workspaces autonomously.',
  },
  {
    id: 'D4',
    label: 'Pricing Transparency',
    score: 38,
    weight: 0.05,
    verdict: 'weak',
    icon: DollarSign,
    analysis:
      'Free and Pro plans are transparent with published pricing. But Business+ and Enterprise Grid — where most API-heavy usage happens — require "contact sales" for pricing. An AI procurement agent comparing collaboration tools cannot get Slack Enterprise pricing programmatically. This opacity drops D4 significantly.',
  },
  {
    id: 'D5',
    label: 'Payment Processing',
    score: 32,
    weight: 0.08,
    verdict: 'weak',
    icon: CreditCard,
    analysis:
      'No self-service enterprise billing API. An AI purchasing agent cannot upgrade a workspace to Business+ or Enterprise Grid via API. Standard tier purchases work through the Slack admin UI, but there is no programmatic checkout endpoint. Payment is human-driven at every tier above Pro.',
  },
  {
    id: 'D6',
    label: 'Data Quality',
    score: 78,
    weight: 0.10,
    verdict: 'strong',
    icon: Layers,
    analysis:
      'Consistent JSON response envelopes with an ok field, typed error codes, and pagination tokens. Block Kit provides structured message formatting. Metadata fields on messages enable programmatic categorization. Schema.org markup on the marketing site is limited but the API documentation itself is structured and thorough.',
  },
  {
    id: 'D7',
    label: 'Security',
    score: 82,
    weight: 0.12,
    verdict: 'strong',
    icon: Shield,
    analysis:
      'Excellent. OAuth 2.0 with granular scopes (700+ permission scopes). Token rotation support. Request signing for Events API webhooks (HMAC-SHA256). Audit log API for Enterprise Grid. security.txt published. SOC 2 Type II compliant. The only D7 gap: no x402 micropayment support, which is emerging tech.',
  },
  {
    id: 'D8',
    label: 'Reliability',
    score: 80,
    weight: 0.13,
    verdict: 'strong',
    icon: Signal,
    analysis:
      'status.slack.com exists with real-time incident tracking and historical uptime data. The API returns proper rate-limit headers (X-RateLimit-*) with Retry-After guidance. Tier-based rate limiting is well-documented by method. Health check endpoints exist for workspace connectivity testing.',
  },
  {
    id: 'D9',
    label: 'Agent Experience',
    score: 48,
    weight: 0.10,
    verdict: 'weak',
    icon: Bot,
    analysis:
      'This is where Slack loses the most ground. No agent-card.json at /.well-known/agent-card.json. No llms.txt at /llms.txt. No MCP server despite being one of the most MCP-connected services (community-built MCP servers exist, but Slack does not ship one officially). No structured way for agents to discover what Slack can do — they have to read human documentation.',
  },
]

const silverComparison = [
  { company: 'Resend', score: 75, tier: 'Gold', d9: 72, hasAgentCard: true, hasMcp: true },
  { company: 'Vercel', score: 70, tier: 'Silver', d9: 52, hasAgentCard: false, hasMcp: false },
  { company: 'Supabase', score: 69, tier: 'Silver', d9: 50, hasAgentCard: false, hasMcp: false },
  { company: 'Slack', score: 68, tier: 'Silver', d9: 48, hasAgentCard: false, hasMcp: false },
  { company: 'Stripe', score: 68, tier: 'Silver', d9: 52, hasAgentCard: false, hasMcp: false },
  { company: 'GitHub', score: 67, tier: 'Silver', d9: 46, hasAgentCard: false, hasMcp: false },
]

const toGold = [
  {
    action: 'Publish agent-card.json',
    file: '/.well-known/agent-card.json',
    impact: '+3-4 points (D1 + D9)',
    effort: '30 minutes',
    description: 'Publish an A2A agent card declaring Slack\'s capabilities: messaging, channel management, user lookup, file sharing, workflow automation. This single file makes Slack discoverable by agent discovery protocols instead of requiring agents to know about Slack in advance.',
    icon: FileJson,
    color: 'emerald',
  },
  {
    action: 'Publish llms.txt',
    file: '/llms.txt',
    impact: '+2-3 points (D1 + D9)',
    effort: '15 minutes',
    description: 'A plain-text summary of Slack\'s API surface optimized for LLM consumption. Which methods exist, what scopes they need, what Block Kit can do, how Events API works. Currently agents parse HTML documentation — llms.txt gives them a pre-digested summary.',
    icon: FileText,
    color: 'blue',
  },
  {
    action: 'Ship an official MCP server',
    file: 'npm package + registry listing',
    impact: '+4-5 points (D9 + agent-native bonus)',
    effort: '1-2 weeks',
    description: 'Community-built Slack MCP servers already exist. Slack should ship an official one with tools like send_message, create_channel, search_messages, list_users, and upload_file. This unlocks the agent-native bonus and makes Slack a first-class citizen in the MCP ecosystem.',
    icon: Server,
    color: 'purple',
  },
  {
    action: 'Publish enterprise pricing via API',
    file: 'GET /api/pricing endpoint',
    impact: '+2-3 points (D4 + D5)',
    effort: 'Business decision',
    description: 'Replace "contact sales" with structured pricing for Business+ and Enterprise Grid. Even a price range or per-seat band would help. AI procurement agents evaluating collaboration tools skip Slack Enterprise because they cannot get pricing without a human sales call.',
    icon: DollarSign,
    color: 'amber',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does Slack score the same as Stripe (68) despite being very different products?',
    answer:
      'Both have excellent APIs (Slack D2: 85, Stripe D2: 82) and strong security (Slack D7: 82, Stripe D7: 78). Both lose points on agent-native features (no agent-card.json, no official MCP server). And both have pricing opacity — Stripe for enterprise Connect pricing, Slack for Business+ and Enterprise Grid. The Agent Readiness Score measures how easily an AI agent can discover, understand, and use a service. Both Slack and Stripe are built for developers but not yet optimized for autonomous agent interaction.',
  },
  {
    question: 'Slack has community-built MCP servers. Why does that not count?',
    answer:
      'Community MCP servers are not discoverable at Slack\'s domain. An agent checking slack.com for MCP capabilities finds nothing. The community server on GitHub requires manual discovery, manual installation, and manual configuration. For agent readiness, what matters is what an agent finds when it visits your domain and checks standard paths — /.well-known/agent-card.json, /llms.txt, and MCP endpoints linked from those files.',
  },
  {
    question: 'Could Slack realistically reach Gold (75+)?',
    answer:
      'Yes, with relatively modest effort. Slack starts at 68 — only 7 points from Gold. agent-card.json (+3-4 points) and llms.txt (+2-3 points) together could push it past 75 in an afternoon. An official MCP server (+4-5 points) would push it to 77-78, solidly Gold. The technical foundation is already there — Slack just needs to add the agent-native discovery layer on top.',
  },
  {
    question: 'How does Slack compare to Microsoft Teams for agent readiness?',
    answer:
      'Microsoft Teams has a larger API surface through Microsoft Graph but scores lower on agent readiness overall (estimated 58-62 Silver). Teams requires Azure AD authentication which is more complex for agents to negotiate. Teams has no agent-card.json, no llms.txt, and no official MCP server either. Slack\'s advantage is simpler OAuth scopes and more consistent API design — agents make fewer errors interacting with Slack\'s API than with Microsoft Graph.',
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

function getVerdictClasses(verdict: string) {
  if (verdict === 'strong') return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Strong' }
  if (verdict === 'partial') return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Partial' }
  return { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'Weak' }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SlackAgentReadinessBreakdownPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Slack Scores 68 for Agent Readiness (And What Keeps It From Gold)',
    description:
      'A dimension-by-dimension breakdown of Slack\'s 68 Silver Agent Readiness Score. Excellent API, strong security, but missing agent-native files.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/slack-agent-readiness-breakdown',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1900,
    keywords:
      'Slack agent readiness score, Slack API agent, Slack MCP server, Slack Silver, agent readiness case study',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Slack Agent Readiness Breakdown',
          item: 'https://agenthermes.ai/blog/slack-agent-readiness-breakdown',
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
      title="Why Slack Scores 68 for Agent Readiness (And What Keeps It From Gold)"
      shareUrl="https://agenthermes.ai/blog/slack-agent-readiness-breakdown"
      currentHref="/blog/slack-agent-readiness-breakdown"
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
            <span className="text-zinc-400">Slack Agent Readiness Breakdown</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <MessageSquare className="h-3.5 w-3.5" />
              Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Score: 68 Silver
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Slack Scores 68 for Agent Readiness{' '}
            <span className="text-emerald-400">(And What Keeps It From Gold)</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Slack has one of the best developer APIs in the world. 200+ Web API methods. A real-time
            Events API. Block Kit for structured UI. 700+ OAuth scopes. And yet it scores{' '}
            <strong className="text-zinc-100">68 out of 100</strong> — Silver tier, 7 points short
            of Gold. The reason is the same gap we see across every Silver-tier company: excellent
            infrastructure for human developers, but{' '}
            <strong className="text-zinc-100">no agent-native discovery layer</strong>. Three files
            and a business decision separate Slack from Gold.
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
                  14 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIMENSION BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            Dimension-by-Dimension Breakdown
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The Agent Readiness Score evaluates 9 dimensions, each weighted by importance to
              AI agents. Here is how Slack performs on every single one — what it gets right and
              where it falls short.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {dimensions.map((dim) => {
              const verdict = getVerdictClasses(dim.verdict)
              return (
                <div
                  key={dim.id}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${verdict.bg} border ${verdict.border}`}>
                      <dim.icon className={`h-5 w-5 ${verdict.text}`} />
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <h3 className="text-lg font-bold text-zinc-100">
                        {dim.id}: {dim.label}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${verdict.bg} border ${verdict.border} ${verdict.text}`}>
                        {verdict.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${verdict.text}`}>{dim.score}</div>
                      <div className="text-xs text-zinc-600">weight: {dim.weight}</div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{dim.analysis}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '68', label: 'overall score', icon: BarChart3 },
              { value: '85', label: 'D2 API Quality (best)', icon: Zap },
              { value: '32', label: 'D5 Payment (worst)', icon: CreditCard },
              { value: '7', label: 'points from Gold', icon: Target },
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

      {/* ===== COMPARISON TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Slack vs the Silver Tier
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Slack sits in the middle of the Silver tier pack. What separates the one Gold company
              (Resend) from the rest is not API quality — it is agent-native features. Resend has
              agent-card.json and an MCP server. Nobody else in the top 6 does.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Company</div>
              <div>Score</div>
              <div>D9 Agent Exp</div>
              <div>agent-card.json</div>
              <div>MCP Server</div>
            </div>
            {silverComparison.map((row, i) => (
              <div
                key={row.company}
                className={`grid grid-cols-5 p-4 text-sm ${row.company === 'Slack' ? 'bg-emerald-500/5 border-l-2 border-l-emerald-500' : i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.company}</div>
                <div className={row.tier === 'Gold' ? 'text-amber-400' : 'text-emerald-400'}>{row.score}</div>
                <div className="text-zinc-400">{row.d9}/100</div>
                <div className={row.hasAgentCard ? 'text-emerald-400' : 'text-red-400'}>
                  {row.hasAgentCard ? 'Yes' : 'No'}
                </div>
                <div className={row.hasMcp ? 'text-emerald-400' : 'text-red-400'}>
                  {row.hasMcp ? 'Yes' : 'No'}
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-blue-400">The pattern is clear:</strong> Every company in
              the Silver tier has strong API fundamentals. What separates Silver from Gold is not
              better code — it is agent-native discovery. Resend cleared the bar with agent-card.json
              and an MCP server. Everyone else — Vercel, Supabase, Slack, Stripe, GitHub — is
              waiting to take the same step.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT SLACK NEEDS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Four Changes That Push Slack to Gold
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Slack needs 7 more points to reach Gold (75). Here are four changes, ordered by
              impact-to-effort ratio. The first two are afternoon projects. The third takes a
              couple of weeks. The fourth is a business decision, not a technical one.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {toGold.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.action}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-zinc-100">{item.action}</h3>
                      <p className="text-xs text-zinc-500">
                        <code>{item.file}</code>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400">{item.impact}</div>
                      <div className="text-xs text-zinc-600">{item.effort}</div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The first two items alone (agent-card.json + llms.txt) would push Slack from 68
              to an estimated 73-75 — right at the Gold threshold. Add an official MCP server
              and Slack reaches 77-78, the second-highest score in our 500-business dataset.
              The technical foundation is already world-class. Slack just needs to make it
              agent-discoverable.
            </p>
            <p>
              This is the same pattern we documented in our{' '}
              <Link href="/blog/why-stripe-scores-68" className="text-emerald-400 hover:text-emerald-300 underline">
                Stripe breakdown
              </Link>{' '}
              and{' '}
              <Link href="/blog/github-agent-readiness-breakdown" className="text-emerald-400 hover:text-emerald-300 underline">
                GitHub breakdown
              </Link>
              . The best developer platforms in the world are all 7-12 points from Gold because
              none of them have added the agent-native layer yet. The first one to do it wins
              the{' '}
              <Link href="/blog/resend-only-gold" className="text-emerald-400 hover:text-emerald-300 underline">
                distinction that only Resend holds today
              </Link>.
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
                title: 'What Makes Stripe Score 68 Silver',
                href: '/blog/why-stripe-scores-68',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'Resend Is the Only Gold — What 499 Businesses Can Learn',
                href: '/blog/resend-only-gold',
                tag: 'Case Study',
                tagColor: 'amber',
              },
              {
                title: 'Why GitHub Scores 67 for Agent Readiness',
                href: '/blog/github-agent-readiness-breakdown',
                tag: 'Case Study',
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
            See how your company compares to Slack
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan and get your dimension-by-dimension breakdown.
            See your score, your tier, and exactly what to fix — in 60 seconds.
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
