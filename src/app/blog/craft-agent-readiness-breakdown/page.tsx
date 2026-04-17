import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Network,
  Pen,
  Server,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Why Craft.do Scores 68: The Note-Taking App That Outscores Most Enterprise SaaS | AgentHermes',
  description:
    'Case study: Craft.do scored 68 Silver on the Agent Readiness Score, tied with Stripe and Slack. How a note-taking app outscores most enterprise SaaS, and what keeps it from Gold.',
  keywords: [
    'Craft.do agent readiness score',
    'Craft agent readiness',
    'Craft.do API',
    'Craft.do MCP',
    'note taking app agent readiness',
    'Craft.do review',
    'agent readiness case study',
    'Silver tier agent readiness',
  ],
  openGraph: {
    title:
      'Why Craft.do Scores 68: The Note-Taking App That Outscores Most Enterprise SaaS',
    description:
      'Craft.do scored 68 Silver, tied with Stripe and Slack. A note-taking app with a well-designed API consistently outscores enterprise platforms with 10x the engineering team.',
    url: 'https://agenthermes.ai/blog/craft-agent-readiness-breakdown',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why Craft.do Scores 68 Silver',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Why Craft.do Scores 68 Silver — Tied with Stripe and Slack',
    description:
      'A note-taking app scores higher than most enterprise SaaS. The pattern: single-purpose apps with clean APIs consistently reach Silver. What keeps them from Gold.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/craft-agent-readiness-breakdown',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionScores = [
  {
    dimension: 'D1 Discovery',
    score: 62,
    maxScore: 100,
    detail:
      'Craft has a public developer documentation site, OpenAPI-style endpoint references, and is listed on integration directories. Missing: agent-card.json, llms.txt. Agents can find the API through standard web search but cannot auto-discover capabilities through agent-native protocols.',
    icon: Globe,
    color: 'blue',
  },
  {
    dimension: 'D2 API Quality',
    score: 78,
    maxScore: 100,
    detail:
      'Clean REST API with structured JSON responses. Document, block, and folder operations are well-typed with consistent naming. Error responses include error codes and messages. Versioned endpoints. This is Craft\'s strongest dimension — the API feels like it was designed for programmatic use, not bolted on.',
    icon: Code2,
    color: 'emerald',
  },
  {
    dimension: 'D3 Onboarding',
    score: 72,
    maxScore: 100,
    detail:
      'Self-service API key generation from the developer portal. Documentation includes quickstart guides and code examples. OAuth2 for user-context operations. Clear scoping of permissions per token.',
    icon: Sparkles,
    color: 'emerald',
  },
  {
    dimension: 'D4 Pricing Transparency',
    score: 55,
    maxScore: 100,
    detail:
      'Craft has clear consumer pricing for personal/business plans. API access is included with paid plans but the exact rate limits and API-specific pricing are not published in machine-readable format. Agents cannot programmatically determine if a given operation will be free or paid.',
    icon: DollarSign,
    color: 'amber',
  },
  {
    dimension: 'D5 Payment',
    score: 48,
    maxScore: 100,
    detail:
      'Standard web-based payment flow. No API for subscription management, usage-based billing, or programmatic upgrades. An agent managing a user\'s SaaS subscriptions cannot interact with Craft\'s billing system.',
    icon: Lock,
    color: 'amber',
  },
  {
    dimension: 'D6 Data Quality',
    score: 74,
    maxScore: 100,
    detail:
      'Documents and blocks return well-structured JSON with rich metadata — creation dates, modification times, content types, nested structures. Markdown content is cleanly formatted. Search results include relevance signals.',
    icon: Layers,
    color: 'emerald',
  },
  {
    dimension: 'D7 Security',
    score: 75,
    maxScore: 100,
    detail:
      'HTTPS enforced. OAuth2 with scoped tokens. Rate limiting with clear headers. No exposed internal errors. Security headers present. Above average for a SaaS application of this size.',
    icon: Shield,
    color: 'emerald',
  },
  {
    dimension: 'D8 Reliability',
    score: 71,
    maxScore: 100,
    detail:
      'Fast response times (sub-200ms for most operations). Consistent uptime based on historical checks. Proper HTTP status codes. Error responses are structured and actionable. No public status page dedicated to API uptime, which would push this higher.',
    icon: CheckCircle2,
    color: 'blue',
  },
  {
    dimension: 'D9 Agent Experience',
    score: 58,
    maxScore: 100,
    detail:
      'The API works well for programmatic document management. However, there is no MCP server, no agent-card.json, no llms.txt, and no agent-specific tooling. An agent must discover and integrate manually rather than through standard protocols.',
    icon: Bot,
    color: 'amber',
  },
]

const silverPattern = [
  {
    trait: 'Single-purpose with a clean domain model',
    detail:
      'Craft does one thing well: structured documents with blocks. The API reflects this clarity — documents, blocks, folders. No ambiguity, no feature sprawl. Single-purpose apps map naturally to clean APIs because the domain model is simple.',
    example: 'Stripe (payments), Resend (email), Supabase (database)',
  },
  {
    trait: 'API designed for developers, not bolted on',
    detail:
      'Craft\'s API uses consistent naming, typed responses, and proper REST conventions. It feels like the API was a first-class product, not an afterthought. Companies that build their API alongside their product consistently score higher.',
    example: 'Vercel (deployments), Cloudflare (DNS/CDN), Linear (issues)',
  },
  {
    trait: 'Self-service onboarding with clear documentation',
    detail:
      'API key generation, quickstart guides, code examples, and a developer portal that does not require contacting sales. This pattern lifts D3 Onboarding scores significantly and is common among developer-focused products.',
    example: 'Postmark (email), Algolia (search), Neon (database)',
  },
]

const missingForGold = [
  {
    file: 'agent-card.json',
    impact: 'D1 Discovery +8-12 points',
    detail:
      'A JSON file at /.well-known/agent-card.json that describes the API\'s capabilities, authentication methods, and available tools in a format agents can read automatically. Without it, agents must be explicitly configured to use Craft — they cannot discover it on their own.',
  },
  {
    file: 'llms.txt',
    impact: 'D1 Discovery +5-8 points',
    detail:
      'A text file at /llms.txt that tells AI models what the service does, how to authenticate, and what endpoints are available. Functions like robots.txt but for AI agents instead of search crawlers. Takes 10 minutes to create.',
  },
  {
    file: 'MCP Server',
    impact: 'D9 Agent Experience +10-15 points',
    detail:
      'An MCP (Model Context Protocol) server that wraps Craft\'s API in agent-callable tools. Tools like create_document, search_documents, update_block, list_folders. This is what transforms a good API into an agent-native service.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does a note-taking app score as high as Stripe?',
    answer:
      'Because agent readiness measures API quality and accessibility, not company size or revenue. Craft has a well-designed REST API with structured responses, self-service onboarding, proper authentication, and good documentation. These are the same qualities that make Stripe agent-ready. The score measures how easily an AI agent can discover, connect to, and use your service — and Craft\'s clean API design puts it on par with much larger platforms.',
  },
  {
    question: 'How could Craft.do reach Gold tier?',
    answer:
      'By adding three files. An agent-card.json at /.well-known/agent-card.json describes capabilities for agent discovery. An llms.txt file tells AI models how to interact with the service. An MCP server wraps the API in agent-callable tools. These three additions would lift Craft from 68 Silver to approximately 78-83, firmly in Gold territory. The API quality is already there — the gap is purely in agent-native discovery and tooling.',
  },
  {
    question: 'Is 68 Silver good?',
    answer:
      'Extremely. The average Agent Readiness Score across 500+ businesses we have scanned is 43. Only 8% of scanned businesses score Silver or above. Craft at 68 outperforms 92% of all businesses and ties with Stripe (68) and Slack (68), both companies with massive engineering teams. Silver means agents can effectively use your API with some manual configuration — it is just not auto-discoverable yet.',
  },
  {
    question: 'What makes single-purpose apps score higher?',
    answer:
      'Single-purpose apps have simpler domain models, which naturally produce cleaner APIs. A note-taking app has documents, blocks, and folders. A payment processor has charges, customers, and subscriptions. When the domain is narrow, the API surface is consistent and predictable. Enterprise platforms that do 50 things often have inconsistent APIs, legacy endpoints, and documentation gaps across their sprawling surface area.',
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

export default function CraftAgentReadinessBreakdownPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Why Craft.do Scores 68: The Note-Taking App That Outscores Most Enterprise SaaS',
    description:
      'Case study: Craft.do scored 68 Silver on the Agent Readiness Score, tied with Stripe and Slack. Analysis of why single-purpose apps with clean APIs consistently reach Silver tier.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/craft-agent-readiness-breakdown',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1800,
    keywords:
      'Craft.do agent readiness score, Silver tier, note-taking API, agent readiness case study',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Craft.do Agent Readiness Breakdown',
          item: 'https://agenthermes.ai/blog/craft-agent-readiness-breakdown',
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
      title="Why Craft.do Scores 68: The Note-Taking App That Outscores Most Enterprise SaaS"
      shareUrl="https://agenthermes.ai/blog/craft-agent-readiness-breakdown"
      currentHref="/blog/craft-agent-readiness-breakdown"
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
              <span className="text-zinc-400">Craft.do Agent Readiness Breakdown</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                <Pen className="h-3.5 w-3.5" />
                Case Study
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 text-xs font-medium">
                Silver Tier (68)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Why Craft.do Scores 68:{' '}
              <span className="text-emerald-400">
                The Note-Taking App That Outscores Most Enterprise SaaS
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Craft.do is a document and note-taking app. It scored{' '}
              <strong className="text-zinc-100">68 Silver</strong> on the Agent Readiness Score —
              tied with Stripe and Slack. That is not a typo. A focused note-taking app with a
              clean API outscores most enterprise SaaS platforms with 100x the engineering headcount.
              Here is why, and what pattern it reveals about agent readiness.
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

        {/* ===== THE SCORECARD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              The Full Scorecard: 68 Silver
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Craft.do scored 68 out of 100, placing it in the Silver tier (60-74). Here is the
                dimension-by-dimension breakdown showing where it excels and where the gaps are.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '68', label: 'Overall Score', icon: Award },
                { value: 'Silver', label: 'Tier', icon: Target },
                { value: 'Top 8%', label: 'Percentile', icon: TrendingUp },
                { value: '3 files', label: 'From Gold', icon: Zap },
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

            <div className="space-y-3">
              {dimensionScores.map((dim) => {
                const colors = getColorClasses(dim.color)
                const pct = Math.round((dim.score / dim.maxScore) * 100)
                return (
                  <div
                    key={dim.dimension}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <dim.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-zinc-100">{dim.dimension}</h3>
                          <span className={`text-sm font-bold ${colors.text}`}>{dim.score}/100</span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full rounded-full bg-zinc-800">
                          <div
                            className={`h-1.5 rounded-full ${dim.color === 'emerald' ? 'bg-emerald-500' : dim.color === 'blue' ? 'bg-blue-500' : 'bg-amber-500'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{dim.detail}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== THE PATTERN ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              The Pattern: Why Single-Purpose Apps Consistently Score Silver
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Craft is not an anomaly. Across our scans of 500+ businesses, single-purpose apps
                with well-designed APIs consistently cluster in the Silver tier. The pattern is
                remarkably consistent and reveals something important about what makes an API
                agent-ready.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {silverPattern.map((trait) => (
                <div
                  key={trait.trait}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className="text-sm font-bold text-zinc-100 mb-2">{trait.trait}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{trait.detail}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Also seen in: </span>
                      <span className="text-emerald-400">{trait.example}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The inverse pattern is equally telling. Enterprise platforms that try to do
                everything — CRM + marketing + analytics + support — often have inconsistent APIs
                across modules, legacy endpoints that break conventions, and onboarding flows that
                require sales calls. A 500-person engineering team building 50 products scores lower
                than a 20-person team building one product with a clean API.
              </p>
              <p>
                This is directly relevant to the{' '}
                <Link
                  href="/blog/developer-tools-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  developer tools vertical
                </Link>
                , where focused products like{' '}
                <Link
                  href="/blog/resend-only-gold"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  Resend (the only Gold-tier business)
                </Link>{' '}
                demonstrate that API quality beats feature count every time.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT KEEPS IT FROM GOLD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              Three Files Standing Between Silver and Gold
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Every Silver-tier business we have scanned shares the same gap: the three
                agent-native files that separate a good API from an agent-ready one. Craft is no
                exception. Its API quality is Gold-level. Its agent discoverability is not.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {missingForGold.map((item) => (
                <div
                  key={item.file}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <FileText className="h-5 w-5 text-amber-400" />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">{item.file}</h3>
                    </div>
                    <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      {item.impact}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">The Gold gap is always the same three files:</strong>{' '}
                Across Stripe (68), Slack (68), Craft (68), Vercel (69), and Supabase (69), every
                Silver-tier business is missing agent-card.json, llms.txt, and/or an MCP server.
                The underlying API quality is already Gold-level. The agent-native discovery layer is
                what is missing. This is why we built the{' '}
                <Link
                  href="/blog/saas-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  SaaS Agent Readiness guide
                </Link>{' '}
                — to help companies close this exact gap.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT AN AGENT DOES WITH CRAFT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-500" />
              What an Agent Does with Craft Today vs with an MCP Server
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Imagine an AI assistant managing a knowledge worker&apos;s documents. The user says:
                &ldquo;Summarize everything I wrote about project X this week and create a status
                update.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <h3 className="font-bold text-amber-400 mb-3 text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Today (Silver, no MCP)
                </h3>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">1.</span>
                    <span>Agent knows Craft has an API from its training data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">2.</span>
                    <span>User must provide API credentials and configure the connection manually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">3.</span>
                    <span>Agent must be programmed with Craft-specific endpoint knowledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">4.</span>
                    <span>Works, but requires upfront setup per user</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <h3 className="font-bold text-emerald-400 mb-3 text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  With MCP Server (Gold)
                </h3>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">1.</span>
                    <span>Agent discovers Craft via agent-card.json automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">2.</span>
                    <span>Connects to MCP server and reads available tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">3.</span>
                    <span>Calls search_documents, reads content, creates status update</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">4.</span>
                    <span>Zero configuration needed — works out of the box for every user</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The difference is not in capability — Craft&apos;s API can do everything an MCP
                server would expose. The difference is in{' '}
                <strong className="text-zinc-100">discoverability and zero-configuration access</strong>.
                An MCP server turns Craft from &ldquo;an API that agents can use if configured&rdquo;
                to &ldquo;a service that agents discover and use automatically.&rdquo; That is the
                Silver-to-Gold leap.
              </p>
            </div>
          </div>
        </section>

        {/* ===== LESSONS FOR OTHER SAAS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              Lessons for Every SaaS Company
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Craft&apos;s score reveals actionable lessons for any SaaS company evaluating their
                agent readiness.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                {
                  lesson: 'API quality matters more than API size',
                  detail:
                    'Craft has a relatively small API surface — documents, blocks, folders, search. But every endpoint is well-designed, consistently named, and properly typed. A 20-endpoint API that scores 78 on D2 API Quality beats a 200-endpoint API that scores 45 because of inconsistencies and legacy baggage.',
                },
                {
                  lesson: 'Self-service onboarding is a prerequisite',
                  detail:
                    'Any API that requires contacting sales, scheduling a demo, or waiting for approval to get API keys loses D3 Onboarding points. Craft lets developers generate keys from the dashboard. This is table stakes for Silver tier.',
                },
                {
                  lesson: 'The same three files block everyone from Gold',
                  detail:
                    'If your API is already good, you are likely stuck at Silver for the same reason as Craft, Stripe, and Slack: missing agent-card.json, llms.txt, and an MCP server. These are the cheapest, highest-ROI improvements available.',
                },
                {
                  lesson: 'Focus beats feature sprawl',
                  detail:
                    'Craft does one thing and does it well. Its API reflects that clarity. If your product does 10 things, your API probably has inconsistencies across modules. Consider scoring each module separately and fixing the worst ones first.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.lesson}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
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
                  title: 'Developer Tools Agent Readiness',
                  href: '/blog/developer-tools-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title: 'Why Resend Is the Only Gold-Tier Business',
                  href: '/blog/resend-only-gold',
                  tag: 'Case Study',
                  tagColor: 'blue',
                },
                {
                  title: 'SaaS Agent Readiness: The Complete Guide',
                  href: '/blog/saas-agent-readiness',
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
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mb-3`}
                    >
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
              Where does your SaaS product score?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Get your free Agent Readiness Score in 60 seconds. See your dimension-by-dimension
              breakdown and learn exactly which files to add to reach the next tier.
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
