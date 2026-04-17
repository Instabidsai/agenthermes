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
  DollarSign,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Make.com Scores 67 for Agent Readiness: The Automation Platform Pattern | AgentHermes',
  description:
    'Make.com (formerly Integromat) scored 67 Silver on the Agent Readiness Score. Case study of the automation platform pattern: built to connect APIs, naturally agent-friendly, but missing the last mile to Gold.',
  keywords: [
    'Make.com agent readiness score',
    'Make.com agent readiness',
    'automation platform agent readiness',
    'Integromat agent readiness',
    'Make.com API',
    'automation platform MCP',
    'Make.com vs Zapier',
    'agent economy automation',
  ],
  openGraph: {
    title: 'Why Make.com Scores 67 for Agent Readiness: The Automation Platform Pattern',
    description:
      'Make.com scored 67 Silver. The automation platform pattern: built to connect APIs = naturally agent-friendly. But missing agent-card and MCP blocks the path to Gold.',
    url: 'https://agenthermes.ai/blog/make-agent-readiness-breakdown',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why Make.com Scores 67 for Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Make.com Scores 67 for Agent Readiness',
    description:
      'Case study: automation platforms are naturally agent-friendly because they are built to connect APIs. But the last mile to Gold requires becoming the thing agents call, not just the thing humans configure.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/make-agent-readiness-breakdown',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionScores = [
  { dim: 'D1 Discovery', score: 72, weight: 0.12, detail: 'Excellent SEO, public docs site, Schema.org markup, robots.txt allows all crawlers. Strong sitemap coverage of API docs and templates.', color: 'emerald' },
  { dim: 'D2 API Quality', score: 82, weight: 0.15, detail: 'Full REST API with JSON responses, well-documented endpoints, consistent error handling, pagination, webhooks. Built by developers for developers.', color: 'emerald' },
  { dim: 'D3 Onboarding', score: 78, weight: 0.08, detail: 'Self-service signup, API key generation in minutes, free tier with real API access. No sales call required to start building.', color: 'emerald' },
  { dim: 'D4 Pricing', score: 45, weight: 0.05, detail: 'Public pricing page but enterprise tiers are gated. Custom pricing requires sales contact. Operations-based billing is complex for agents to calculate.', color: 'amber' },
  { dim: 'D5 Payment', score: 52, weight: 0.08, detail: 'Stripe-based billing, but no x402 or agent-native payment rails. Subscription management requires human dashboard interaction.', color: 'amber' },
  { dim: 'D6 Data Quality', score: 71, weight: 0.10, detail: 'JSON-LD on marketing pages, structured API documentation, well-typed request/response schemas. Template marketplace has structured metadata.', color: 'emerald' },
  { dim: 'D7 Security', score: 75, weight: 0.12, detail: 'OAuth 2.0, API key auth, TLS everywhere, rate limiting, security.txt. SOC 2 compliant. Standard security infrastructure.', color: 'emerald' },
  { dim: 'D8 Reliability', score: 69, weight: 0.13, detail: 'Status page at status.make.com, sub-200ms API responses, CDN-backed, changelog exists but is HTML-only. Good but not exceptional.', color: 'emerald' },
  { dim: 'D9 Agent Experience', score: 28, weight: 0.10, detail: 'No agent-card.json, no MCP server, no llms.txt, no AGENTS.md. The biggest gap. Make.com is built for humans to configure, not for agents to call directly.', color: 'red' },
]

const automationPlatformComparison = [
  { name: 'Make.com', score: 67, tier: 'Silver', strength: 'API depth, template marketplace, webhook engine', weakness: 'No MCP, no agent-card, enterprise pricing gated' },
  { name: 'Zapier', score: 62, tier: 'Silver', strength: 'Massive integration catalog, public API, NLA (Natural Language Actions)', weakness: 'NLA is close to agent-ready but not MCP-compatible' },
  { name: 'n8n', score: 58, tier: 'Bronze', strength: 'Open-source, self-hostable, AI agent nodes built in', weakness: 'Smaller ecosystem, less documented API surface' },
  { name: 'Pipedream', score: 55, tier: 'Bronze', strength: 'Developer-first, code-first workflows, npm integration', weakness: 'Niche audience, limited marketing presence' },
  { name: 'Tray.io', score: 48, tier: 'Bronze', strength: 'Enterprise connectors, complex workflow orchestration', weakness: 'Fully gated API, no self-service, sales-only pricing' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do automation platforms score higher than average?',
    answer:
      'Automation platforms are built to connect APIs — that is their core product. This means they already have REST APIs, webhooks, structured data schemas, developer documentation, and self-service onboarding. These are exactly the things the Agent Readiness Score measures. The average business scores 43/100. Automation platforms start at 55+ because their product inherently requires the infrastructure agents need.',
  },
  {
    question: 'What prevents Make.com from reaching Gold (75+)?',
    answer:
      'Two things: D9 Agent Experience (28/100) and D4 Pricing (45/100). Make.com has no agent-card.json, no MCP server, no llms.txt, and no AGENTS.md. It is built for humans to configure through a visual builder, not for agents to call directly. Enterprise pricing that requires sales contact also hurts. Adding an MCP server that exposes scenario creation and execution as tools would push Make.com into Gold.',
  },
  {
    question: 'Is Make.com competing with AI agents or complementary to them?',
    answer:
      'Both. Today, Make.com is a tool humans use to build automations. In the agent economy, Make.com could become infrastructure that agents use to execute complex multi-step workflows. An agent that needs to sync data between 5 systems could call Make.com\'s API to trigger a pre-built scenario rather than building the integration itself. The question is whether Make.com positions itself as the thing agents call or gets replaced by agents that build integrations directly.',
  },
  {
    question: 'How does Zapier\'s NLA compare to MCP?',
    answer:
      'Zapier\'s Natural Language Actions (NLA) lets AI models trigger Zaps using natural language. It is the closest any automation platform has come to being directly agent-callable. However, NLA is proprietary to Zapier and not based on an open standard like MCP. Agents that support MCP cannot automatically use NLA and vice versa. The platform that adopts MCP first gets access to every MCP-compatible agent on the market.',
  },
  {
    question: 'What would a Gold-tier automation platform look like?',
    answer:
      'A Gold-tier automation platform would have: (1) an MCP server that exposes scenario creation, execution, and monitoring as tools, (2) an agent-card.json declaring its capabilities, (3) transparent per-operation pricing that agents can calculate, (4) a structured JSON changelog, and (5) llms.txt explaining how to use the platform programmatically. The platform would be usable end-to-end by an agent without any human touching the visual builder.',
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

export default function MakeAgentReadinessBreakdownPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Make.com Scores 67 for Agent Readiness: The Automation Platform Pattern',
    description:
      'Make.com (formerly Integromat) scored 67 Silver on the Agent Readiness Score. A deep breakdown of every dimension, plus what the automation platform pattern means for the agent economy.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/make-agent-readiness-breakdown',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1800,
    keywords:
      'Make.com agent readiness, automation platform agent readiness, Integromat agent score, Make.com API, MCP automation',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Make.com Agent Readiness Breakdown',
          item: 'https://agenthermes.ai/blog/make-agent-readiness-breakdown',
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
      title="Why Make.com Scores 67 for Agent Readiness: The Automation Platform Pattern"
      shareUrl="https://agenthermes.ai/blog/make-agent-readiness-breakdown"
      currentHref="/blog/make-agent-readiness-breakdown"
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
            <span className="text-zinc-400">Make.com Agent Readiness Breakdown</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Workflow className="h-3.5 w-3.5" />
              Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Score: 67 Silver
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Make.com Scores 67 for Agent Readiness:{' '}
            <span className="text-emerald-400">The Automation Platform Pattern</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Make.com (formerly Integromat) scored <strong className="text-zinc-100">67 Silver</strong> on
            the Agent Readiness Score. That is higher than 87% of the 500+ businesses we have scanned. The
            reason is structural: automation platforms are built to connect APIs, which makes them naturally
            agent-friendly. But &ldquo;naturally agent-friendly&rdquo; is not the same as agent-ready.
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

      {/* ===== SCORE BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The 9-Dimension Breakdown: Where Make.com Wins and Loses
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Make.com&apos;s score tells a clear story: strong technical infrastructure (D2 API at 82, D7
              Security at 75, D3 Onboarding at 78) dragged down by a near-zero D9 Agent Experience (28).
              This is the automation platform pattern — companies that build excellent APIs for human
              developers but have not yet adapted those APIs for autonomous agent consumption.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {dimensionScores.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.dim}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-zinc-100">{item.dim} <span className="text-zinc-500 font-normal">({item.weight})</span></h3>
                    <span className={`text-sm font-mono font-bold ${colors.text}`}>{item.score}/100</span>
                  </div>
                  {/* Score bar */}
                  <div className="h-1.5 rounded-full bg-zinc-800 mb-3">
                    <div
                      className={`h-1.5 rounded-full ${item.score >= 70 ? 'bg-emerald-500' : item.score >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '67', label: 'overall score', icon: BarChart3 },
              { value: 'Silver', label: 'tier', icon: TrendingUp },
              { value: '82', label: 'D2 API Quality', icon: Code2 },
              { value: '28', label: 'D9 Agent Experience', icon: Bot },
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

      {/* ===== THE AUTOMATION PLATFORM PATTERN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            The Automation Platform Pattern: Why API-First = Agent-Friendly
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Automation platforms like Make.com, Zapier, and n8n exist to connect APIs together. Their
              entire product is built around consuming and exposing structured data over HTTP. This gives
              them a natural advantage on the Agent Readiness Score because the infrastructure agents need
              — REST APIs, webhooks, structured data, developer documentation — is the same infrastructure
              these platforms need to function.
            </p>
            <p>
              Compare this to a local cleaning company (score ~9) or a dental practice (score ~11). Those
              businesses have to build API infrastructure from scratch. Make.com already has it. The question
              for automation platforms is not &ldquo;can agents use your API&rdquo; — it is &ldquo;can agents
              use your API <em>without a human configuring things first</em>.&rdquo;
            </p>
            <p>
              That distinction — human-configured vs. agent-autonomous — is the gap between Silver and Gold.
              Similar to what we documented with{' '}
              <Link href="/blog/developer-tools-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                developer tools
              </Link>, the technical foundation is excellent but the agent-specific layer is missing.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20 mb-8">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-blue-400">The existential question for automation platforms:</strong> In a world where
              AI agents can build integrations directly (calling APIs, setting up webhooks, handling auth flows),
              do automation platforms become more important or less important? The platforms that position themselves
              as <em>infrastructure agents use</em> — not just tools humans use — survive. The ones that stay
              human-only get disintermediated by agents that build integrations natively.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PLATFORM COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Automation Platform Scorecard
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Make.com is not the only automation platform we scanned. Here is how the category compares.
              The pattern holds across all of them: strong APIs, weak agent experience. Similar to the
              pattern in our{' '}
              <Link href="/blog/slack-agent-readiness-breakdown" className="text-emerald-400 hover:text-emerald-300 underline">
                Slack breakdown
              </Link>, these are mature platforms with excellent developer ecosystems that have not yet
              built the agent-native layer.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-xs font-bold text-zinc-300">
              <div>Platform</div>
              <div>Score</div>
              <div>Tier</div>
              <div>Strength</div>
              <div>Weakness</div>
            </div>
            {automationPlatformComparison.map((row, i) => (
              <div
                key={row.name}
                className={`grid grid-cols-5 p-4 text-xs ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.name}</div>
                <div className={`font-mono font-bold ${row.score >= 60 ? 'text-emerald-400' : row.score >= 40 ? 'text-amber-400' : 'text-red-400'}`}>{row.score}</div>
                <div className="text-zinc-400">{row.tier}</div>
                <div className="text-zinc-500">{row.strength}</div>
                <div className="text-zinc-500">{row.weakness}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Zapier&apos;s Natural Language Actions (NLA) is the closest any automation platform has come
              to being directly agent-callable. NLA lets AI models trigger Zaps using natural language
              descriptions — essentially an MCP-like interface before MCP existed. But NLA is proprietary.
              The first automation platform to ship a native MCP server gets access to the entire open
              agent ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT PUSHES TO GOLD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Pushes Automation Platforms Toward Gold
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Make.com is 8 points from Gold. Here are the specific changes that would close the gap —
              and transform automation platforms from tools humans configure into infrastructure agents use.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                title: 'Ship an MCP server',
                detail: 'Expose scenario creation, execution, monitoring, and template browsing as MCP tools. An agent should be able to: list available templates, create a scenario from a template, execute a scenario, and check execution status — all through MCP.',
                impact: '+15 D9',
                icon: Server,
                color: 'emerald',
              },
              {
                title: 'Publish agent-card.json',
                detail: 'Declare capabilities, supported auth methods, rate limits, and pricing in a machine-readable agent card at /.well-known/agent-card.json. This is the discovery mechanism agents use to find services they can interact with.',
                impact: '+8 D9',
                icon: Globe,
                color: 'emerald',
              },
              {
                title: 'Transparent per-operation pricing API',
                detail: 'Replace "contact sales for enterprise" with a structured pricing endpoint. Agents need to calculate cost before executing. get_pricing({ operations: 10000, integrations: 50 }) should return a number, not a sales form.',
                impact: '+20 D4',
                icon: DollarSign,
                color: 'amber',
              },
              {
                title: 'Add llms.txt and AGENTS.md',
                detail: 'These files tell AI models how to use the platform programmatically. llms.txt is a plain-text summary of API capabilities. AGENTS.md describes the optimal agent workflow for interacting with the platform.',
                impact: '+5 D9',
                icon: Bot,
                color: 'blue',
              },
              {
                title: 'Structured JSON changelog',
                detail: 'Move from HTML-only changelog to a JSON API endpoint with version numbers, breaking change flags, and affected endpoints. Agents need this for reliability.',
                impact: '+5 D8',
                icon: Layers,
                color: 'purple',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-zinc-100">{item.title}</h3>
                    </div>
                    <span className={`text-xs font-mono font-bold ${colors.text}`}>{item.impact}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The strategic pivot:</strong> Automation platforms have a choice.
              Stay as visual builders for humans and compete with AI agents that can build integrations directly.
              Or become the execution layer that agents call when they need complex multi-step workflows. The
              first platform to make this pivot — to become the thing agents call, not just the thing humans
              configure — captures the agent-driven automation market. That market is larger than the human-driven
              one because agents can create and execute thousands of workflows per minute.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT THIS MEANS FOR YOUR BUSINESS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-amber-500" />
            What This Means If You Use Make.com
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              If your business relies on Make.com for automation, your agent readiness is partially
              dependent on Make.com&apos;s agent readiness. When agents can call Make.com directly, they
              can trigger your workflows without human intervention. Until then, Make.com is a tool in
              your stack — not an agent-accessible interface.
            </p>
            <p>
              The practical implication: do not wait for Make.com to become agent-ready. Build your own
              agent infrastructure (MCP server, agent-card, structured pricing) that agents can access
              directly. Use Make.com as a backend orchestration layer while exposing your own agent-facing
              endpoints. When Make.com eventually ships MCP support, you can integrate it into your agent
              infrastructure — but you should not depend on it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'If you build on Make.com',
                detail: 'Your automations work but are not agent-accessible. Agents cannot trigger your Make.com scenarios directly. Build agent-facing endpoints that call Make.com internally.',
              },
              {
                title: 'If you compete with Make.com',
                detail: 'The first automation platform with native MCP captures the agent-driven automation market. n8n\'s open-source model and built-in AI agent nodes position it well for this.',
              },
              {
                title: 'If you evaluate automation platforms',
                detail: 'Score them on agent readiness, not just feature count. The platform that becomes agent-callable first delivers more long-term value than the one with the most integrations today.',
              },
              {
                title: 'If you are Make.com',
                detail: 'Ship MCP. You are 8 points from Gold and one protocol implementation from capturing the entire agent-driven automation market. Your API infrastructure is already there. The missing piece is the agent-native layer.',
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
                title: 'Developer Tools Agent Readiness: Why Dev Platforms Score Highest',
                href: '/blog/developer-tools-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Slack Agent Readiness Breakdown: Score 68 Silver',
                href: '/blog/slack-agent-readiness-breakdown',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'Check Your Agent Readiness Score',
                href: '/audit',
                tag: 'Free Tool',
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
            How does your platform score?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run your domain through the AgentHermes scanner. See your score across all 9 dimensions
            and find out exactly where you stand in the agent economy.
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
