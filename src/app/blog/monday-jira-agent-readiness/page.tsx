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
  FileJson,
  Globe,
  HelpCircle,
  Kanban,
  Layers,
  Lock,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Monday and Jira Both Score 65-66: The Project Management Platform Pattern | AgentHermes',
  description:
    'Monday scored 65, Jira scored 66 — both Silver. Project management platforms built for team productivity have strong APIs but human-centric UX assumptions hold them back from Gold. The pattern explained.',
  keywords: [
    'Monday Jira agent readiness project management',
    'Monday agent readiness score',
    'Jira agent readiness score',
    'project management AI agents',
    'Monday API agent',
    'Jira MCP server',
    'project management platform pattern',
    'Monday vs Jira agent readiness',
    'AI agent project management',
  ],
  openGraph: {
    title: 'Why Monday and Jira Both Score 65-66: The Project Management Platform Pattern',
    description:
      'Monday 65, Jira 66 — Silver. Strong APIs, OAuth, webhooks, marketplace. Weak: enterprise pricing gated, no agent-card.json, complex permissions. The pattern that holds PM tools at Silver.',
    url: 'https://agenthermes.ai/blog/monday-jira-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Monday and Jira Agent Readiness Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monday 65, Jira 66: The PM Platform Pattern',
    description:
      'Both Silver. Strong APIs but human-centric UX assumptions hold them back from Gold. The project management platform pattern explained.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/monday-jira-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionScores = [
  { dimension: 'D1 Discovery', monday: 72, jira: 75, notes: 'Both have strong SEO, developer docs, and API documentation portals. Jira edges ahead with Atlassian Developer platform.' },
  { dimension: 'D2 API Quality', monday: 78, jira: 82, notes: 'Monday: GraphQL API, well-documented. Jira: REST API v3, comprehensive. Both support pagination, filtering, structured errors.' },
  { dimension: 'D3 Onboarding', monday: 70, jira: 68, notes: 'Monday: free tier, API key in account settings. Jira: free Cloud tier, OAuth 2.0 app setup. Monday is slightly smoother.' },
  { dimension: 'D4 Pricing', monday: 45, jira: 42, notes: 'Both gate enterprise features behind "Contact Sales." API rate limits differ by plan but exact limits are not always clear.' },
  { dimension: 'D5 Payment', monday: 40, jira: 38, notes: 'Self-serve checkout exists but no payment API. Enterprise deals require human negotiation. No structured quote endpoint.' },
  { dimension: 'D6 Data Quality', monday: 75, jira: 78, notes: 'Both return well-typed JSON. Jira has richer metadata (custom fields, workflow states). Monday has cleaner GraphQL schema.' },
  { dimension: 'D7 Security', monday: 80, jira: 82, notes: 'OAuth 2.0, scoped permissions, rate limiting. Both have SOC 2 compliance. Jira has Atlassian Guard for enterprise.' },
  { dimension: 'D8 Reliability', monday: 72, jira: 75, notes: 'Both have status pages. Jira has public SLA commitments. Monday has published uptime targets but less formal SLAs.' },
  { dimension: 'D9 Agent Experience', monday: 18, jira: 15, notes: 'Neither has agent-card.json, MCP server, or A2A protocol. Monday has a Marketplace with automations. Jira has Forge apps.' },
]

const strengths = [
  {
    name: 'Mature REST and GraphQL APIs',
    description: 'Monday offers a GraphQL API with introspection, and Jira has a comprehensive REST v3 API. Both have been refined over years of developer use. Agents can create tasks, update statuses, query boards, and manage workflows programmatically.',
    icon: Code2,
    color: 'emerald',
  },
  {
    name: 'OAuth 2.0 with Scoped Permissions',
    description: 'Both platforms implement proper OAuth 2.0 flows with fine-grained permission scopes. An agent can request only the access it needs — read-only board access, or write access to specific projects. This is a D7 Security best practice.',
    icon: Shield,
    color: 'blue',
  },
  {
    name: 'Webhooks and Event Systems',
    description: 'Monday and Jira both support webhooks for real-time event notifications. When a task is moved, assigned, or completed, an agent receives the update instantly. This enables reactive agent workflows — "when a bug is marked critical, escalate immediately."',
    icon: Zap,
    color: 'amber',
  },
  {
    name: 'App Marketplaces',
    description: 'Monday has the Monday Marketplace, Jira has the Atlassian Marketplace. Both ecosystems have thousands of integrations, proving that external developers can build on these platforms. The infrastructure for agent-level integration exists.',
    icon: Layers,
    color: 'purple',
  },
]

const weaknesses = [
  {
    name: 'Enterprise Pricing Gated Behind "Contact Sales"',
    description: 'D4 Pricing drops significantly because premium tiers — where agent-relevant features often live — require contacting a sales team. No structured pricing API, no self-serve enterprise quote. An AI procurement agent cannot compare Monday Enterprise vs Jira Premium without human intervention.',
    icon: Lock,
    color: 'red',
  },
  {
    name: 'No agent-card.json or MCP Server',
    description: 'D9 Agent Experience scores 15-18 because neither platform has adopted agent-native protocols. No agent-card.json for discovery, no MCP server for tool exposure, no A2A protocol for agent-to-agent task delegation. The API exists but is not wrapped in agent-discoverable packaging.',
    icon: Bot,
    color: 'red',
  },
  {
    name: 'Complex Permission Models',
    description: 'Both platforms have sophisticated permission systems designed for human teams: workspace admins, board owners, viewers, members with custom roles. Agents struggle with these models because they were designed for human organizational hierarchies, not machine-to-machine access patterns.',
    icon: Users,
    color: 'amber',
  },
  {
    name: 'Human-Centric UX Assumptions',
    description: 'Features like drag-and-drop board organization, visual timeline views, and interactive Gantt charts are meaningless to agents. The platforms invest heavily in UI that agents cannot use, while the API — which agents can use — gets less attention. Board templates assume human setup workflows.',
    icon: Globe,
    color: 'amber',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do Monday and Jira score almost identically?',
    answer:
      'Because they occupy the same market position with similar architectural choices. Both have mature APIs (high D2), OAuth with scoped permissions (high D7), developer documentation (high D1), and status pages (decent D8). Both lack agent-native protocols (low D9) and gate enterprise pricing (low D4). The pattern is the product category, not the individual platform — project management tools built for team collaboration land in the same scoring band.',
  },
  {
    question: 'What would it take for Monday or Jira to reach Gold (75+)?',
    answer:
      'Three specific changes: (1) Publish an agent-card.json at /.well-known/agent-card.json describing available API capabilities — this alone adds 15-20 points to D9. (2) Create a structured pricing endpoint that returns plan details, limits, and per-seat costs in JSON — this lifts D4 by 15-20 points. (3) Build an MCP server exposing core tools like create_task, assign_member, update_status, and query_board — this pushes D9 to 60+. Total impact: 65-66 jumps to 78-82.',
  },
  {
    question: 'Can AI agents already use Monday and Jira?',
    answer:
      'Yes, through their APIs. Many AI coding assistants and workflow automation tools already integrate with Jira to create tickets and Monday to update boards. The issue is not capability — it is discoverability and standardization. An agent can use the Jira API if it is explicitly configured to do so. But an agent cannot discover Jira as a service, understand its capabilities, and start interacting without pre-configuration. That is what agent-card.json and MCP solve.',
  },
  {
    question: 'Is this pattern unique to project management tools?',
    answer:
      'No. We see the same Silver-ceiling pattern in CRM platforms, team communication tools, and developer infrastructure. Any SaaS product built for team productivity tends to land at 60-70: strong APIs because developers demanded them, weak agent-native infrastructure because the agent economy is new. The platforms that break through to Gold first will capture the AI-mediated procurement and workflow management market.',
  },
  {
    question: 'How does this compare to other platforms AgentHermes has scored?',
    answer:
      'Monday (65) and Jira (66) are in the same band as Slack (68), Make (62), and many developer tools. They are well above e-commerce platforms (avg 28) and local businesses (avg under 10). They are below the Gold leaders like Stripe (68), Vercel (69), and Supabase (69) — all of which have started adopting agent-native protocols. The gap to Gold is small but requires intentional agent-first investment.',
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

export default function MondayJiraAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Monday and Jira Both Score 65-66: The Project Management Platform Pattern',
    description:
      'Monday scored 65, Jira scored 66 — both Silver. Project management platforms have strong APIs but human-centric assumptions hold them back from Gold.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/monday-jira-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1850,
    keywords:
      'Monday Jira agent readiness project management, Monday API, Jira API, project management agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Monday and Jira Agent Readiness',
          item: 'https://agenthermes.ai/blog/monday-jira-agent-readiness',
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
      title="Why Monday and Jira Both Score 65-66: The Project Management Platform Pattern"
      shareUrl="https://agenthermes.ai/blog/monday-jira-agent-readiness"
      currentHref="/blog/monday-jira-agent-readiness"
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
            <span className="text-zinc-400">Monday and Jira Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Kanban className="h-3.5 w-3.5" />
              Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Dual Breakdown
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Monday and Jira Both Score 65-66:{' '}
            <span className="text-emerald-400">The Project Management Platform Pattern</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Monday scored <strong className="text-zinc-100">65</strong>. Jira scored{' '}
            <strong className="text-zinc-100">66</strong>. One point apart. This is not a coincidence — it
            is a <strong className="text-zinc-100">pattern</strong>. Project management platforms built for
            human team productivity share the same strengths and the same ceiling. They already have APIs
            because developers demanded them. But human-centric UX assumptions hold them back from Gold.
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

      {/* ===== THE SCORES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The Scores: A Dimension-by-Dimension Comparison
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              We scanned both Monday.com and Atlassian Jira Cloud through the{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                AgentHermes scanner
              </Link>. The results tell a story of two platforms that made nearly identical architectural
              decisions — and hit the same ceiling for nearly identical reasons.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '65', label: 'Monday.com score', icon: Kanban },
              { value: '66', label: 'Jira Cloud score', icon: Code2 },
              { value: 'Silver', label: 'both ARL-3', icon: Target },
              { value: '9 pts', label: 'gap to Gold', icon: TrendingUp },
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

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div className="text-center">Monday</div>
              <div className="text-center">Jira</div>
              <div>Key Difference</div>
            </div>
            {dimensionScores.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className="text-center">
                  <span className={`font-bold ${row.monday >= 70 ? 'text-emerald-400' : row.monday >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
                    {row.monday}
                  </span>
                </div>
                <div className="text-center">
                  <span className={`font-bold ${row.jira >= 70 ? 'text-emerald-400' : row.jira >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
                    {row.jira}
                  </span>
                </div>
                <div className="text-xs text-zinc-500 leading-relaxed">{row.notes}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY THEY SCORE WELL ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            What Pushes Them to Silver: Four Shared Strengths
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Monday and Jira both reach Silver because they were built for a developer-adjacent audience
            that demanded programmatic access. These four strengths are why PM platforms outperform most
            other SaaS categories.
          </p>

          <div className="space-y-4 mb-8">
            {strengths.map((strength) => {
              const colors = getColorClasses(strength.color)
              return (
                <div
                  key={strength.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <strength.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{strength.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{strength.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT HOLDS THEM BACK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            What Holds Them at Silver: Four Shared Weaknesses
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The gap from Silver (65) to Gold (75) is only 9-10 points. But these four issues are
            structural — they stem from building for human teams first and machines second.
          </p>

          <div className="space-y-4 mb-8">
            {weaknesses.map((weakness) => {
              const colors = getColorClasses(weakness.color)
              return (
                <div
                  key={weakness.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <weakness.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{weakness.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{weakness.description}</p>
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
            <Network className="h-5 w-5 text-purple-500" />
            The Project Management Platform Pattern
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When we zoom out across every project management platform we have scanned, a clear pattern
              emerges. Tools built for human collaboration score Silver because they already have APIs —
              but human-centric UX assumptions hold them back from Gold.
            </p>
            <p>
              This is the <strong className="text-zinc-100">PM Platform Pattern</strong>: strong D2 (API),
              strong D7 (Security), decent D1 (Discovery) and D8 (Reliability), but weak D4 (Pricing),
              weak D5 (Payment), and near-zero D9 (Agent Experience). The pattern puts every PM platform
              in a 60-70 band.
            </p>
            <p>
              Compare this to{' '}
              <Link href="/blog/crm-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                CRM platforms
              </Link>{' '}
              which show a similar pattern, or{' '}
              <Link href="/blog/developer-tools-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                developer tools
              </Link>{' '}
              which score slightly higher because their audience demands agent-native features. The
              category determines the ceiling. Breaking through requires intentional investment in
              agent infrastructure.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20 mb-8">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-purple-400">The opportunity:</strong> The first major PM platform
              to ship an agent-card.json and MCP server jumps from 65 to 78+ overnight. That is a move
              from Silver to Gold — a distinction that matters when AI procurement agents are comparing
              tools for enterprise clients. &ldquo;Which project management platform is most agent-ready?&rdquo;
              becomes a differentiator worth millions in enterprise deals.
            </p>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The use case is already real: AI coding agents that create Jira tickets when they find bugs.
              AI project managers that update Monday boards based on standup transcripts. AI procurement
              agents comparing{' '}
              <Link href="/blog/make-agent-readiness-breakdown" className="text-emerald-400 hover:text-emerald-300 underline">
                workflow automation tools
              </Link>{' '}
              for enterprise purchases. Every PM platform will serve agents. The question is which one
              makes it easy first.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PATH TO GOLD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Path to Gold: Three Changes, 10+ Points
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Both Monday and Jira are 9-10 points from Gold. These three changes would get them there.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Publish agent-card.json',
                detail: 'Add /.well-known/agent-card.json describing available API capabilities, supported authentication methods, and rate limits. This is a single static JSON file — no infrastructure changes needed. D9 jumps from 15-18 to 35-40.',
                icon: FileJson,
              },
              {
                step: '2',
                title: 'Build a lightweight MCP server',
                detail: 'Wrap the top 10 API operations as MCP tools: create_task, update_status, assign_member, query_board, create_project, add_comment, get_timeline, search_tasks, get_metrics, manage_labels. D9 jumps from 35-40 to 65-70.',
                icon: Server,
              },
              {
                step: '3',
                title: 'Expose structured pricing endpoint',
                detail: 'Return plan names, per-seat costs, feature lists, and rate limits in JSON. Even if enterprise pricing requires a call, the self-serve tiers should be machine-readable. D4 jumps from 42-45 to 65-70.',
                icon: Target,
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

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Net impact:</strong> Monday moves from 65 to ~78.
              Jira moves from 66 to ~80. Both cross the Gold threshold at 75. Total development effort:
              approximately 2-3 sprint cycles. The ROI is capturing agent-mediated enterprise procurement
              before competitors do.
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
                title: 'CRM Agent Readiness: Why Salesforce Leads and HubSpot Follows',
                href: '/blog/crm-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'How Make Scores 62: The Workflow Automation Breakdown',
                href: '/blog/make-agent-readiness-breakdown',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'Developer Tools Agent Readiness',
                href: '/blog/developer-tools-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
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
            Score your platform against Monday and Jira
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan and see how your SaaS product compares across all
            9 dimensions. Are you Silver, Gold, or still Dark?
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
