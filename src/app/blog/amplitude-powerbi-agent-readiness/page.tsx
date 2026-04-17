import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AreaChart,
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
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Amplitude and Power BI Both Score 66: The Analytics Platform Pattern | AgentHermes',
  description:
    'Amplitude 66, Power BI 66 — identical Silver scores but completely different products. Both are data-rich but agent-poor. Here is the analytics platform pattern and what it means for agent readiness.',
  keywords: [
    'Amplitude Power BI agent readiness analytics',
    'Amplitude agent readiness',
    'Power BI agent readiness',
    'analytics platform agent readiness',
    'Amplitude API agent',
    'Power BI API agent',
    'analytics agent readiness pattern',
    'business intelligence AI agent',
  ],
  openGraph: {
    title: 'Why Amplitude and Power BI Both Score 66: The Analytics Platform Pattern',
    description:
      'Two analytics platforms, identical 66 Silver scores, completely different products. The analytics platform pattern: data-rich but agent-poor.',
    url: 'https://agenthermes.ai/blog/amplitude-powerbi-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Amplitude and Power BI Agent Readiness Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Amplitude and Power BI Both Score 66',
    description:
      'The analytics platform pattern: strong APIs, enterprise security, but gated pricing and zero agent-native infrastructure.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/amplitude-powerbi-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionScores = [
  { dim: 'D1 Discoverability', amplitude: 55, powerbi: 58, note: 'Both have API docs. Neither has agent-card.json or llms.txt.' },
  { dim: 'D2 API Quality', amplitude: 82, powerbi: 85, note: 'Strong REST APIs. Power BI edges ahead with comprehensive endpoint coverage.' },
  { dim: 'D3 Onboarding', amplitude: 70, powerbi: 65, note: 'Amplitude: free tier, API key in minutes. Power BI: Microsoft account required, Azure AD setup.' },
  { dim: 'D4 Pricing', amplitude: 35, powerbi: 30, note: 'Both: enterprise pricing gated behind sales calls. Neither publishes structured pricing data.' },
  { dim: 'D5 Payment', amplitude: 25, powerbi: 22, note: 'Enterprise contracts, not self-serve payment. Agents cannot provision or upgrade.' },
  { dim: 'D6 Data Quality', amplitude: 80, powerbi: 78, note: 'Both return well-structured JSON with consistent schemas. Core strength.' },
  { dim: 'D7 Security', amplitude: 85, powerbi: 90, note: 'OAuth 2.0, API keys, HTTPS. Power BI: Azure AD + RBAC. Enterprise-grade.' },
  { dim: 'D8 Reliability', amplitude: 78, powerbi: 82, note: 'Both highly available. Power BI: Microsoft Azure SLA backing. Status pages exist.' },
  { dim: 'D9 Agent Experience', amplitude: 18, powerbi: 15, note: 'Zero MCP, zero agent-card, zero llms.txt. No agent-native infrastructure at all.' },
]

const amplitudeStrengths = [
  {
    name: 'Cohort API',
    description: 'Query and manage user cohorts programmatically. Agents can segment users by behavior, pull cohort membership, and trigger actions based on cohort changes.',
    icon: Users,
    color: 'purple',
  },
  {
    name: 'Event Tracking API',
    description: 'Send events to Amplitude from any source. HTTP API accepts batch events with properties, user IDs, and device info. Well-documented with OpenAPI-style reference.',
    icon: Zap,
    color: 'blue',
  },
  {
    name: 'Dashboard API',
    description: 'Query charts and dashboards for data. Export results as JSON with full metadata. An agent can pull product analytics without navigating the UI.',
    icon: BarChart3,
    color: 'emerald',
  },
  {
    name: 'Taxonomy API',
    description: 'Manage event types, properties, and categories. Structured metadata about what you track and how. This is the kind of self-describing API that agents love.',
    icon: Layers,
    color: 'cyan',
  },
]

const powerbiStrengths = [
  {
    name: 'Datasets API',
    description: 'Create, manage, and refresh datasets. Push data directly or trigger scheduled refreshes. Agents can ensure dashboards always show current data.',
    icon: Server,
    color: 'blue',
  },
  {
    name: 'Reports & Dashboards API',
    description: 'List, clone, and manage reports. Generate embed tokens for sharing. An agent managing internal analytics can programmatically distribute insights.',
    icon: AreaChart,
    color: 'emerald',
  },
  {
    name: 'Admin API',
    description: 'Manage workspaces, users, and permissions. Full lifecycle management of the Power BI environment — an agent can provision access as part of onboarding workflows.',
    icon: Shield,
    color: 'purple',
  },
  {
    name: 'Embed API',
    description: 'Generate embed tokens and URLs for reports and dashboards. Agents building internal tools can programmatically embed analytics into any surface.',
    icon: Code2,
    color: 'cyan',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do two completely different products score the same?',
    answer:
      'The analytics platform pattern creates structural similarity. Both products have strong APIs (they are data companies), enterprise security (they serve regulated industries), reliable infrastructure (uptime is table stakes for analytics), and enterprise pricing models (sales calls, not self-serve). These structural factors dominate the score. The specific features — product analytics vs business intelligence — matter less than the platform architecture for agent readiness.',
  },
  {
    question: 'What would push Amplitude or Power BI to Gold (75+)?',
    answer:
      'Three changes would close the 9-point gap: (1) Publish agent-card.json and llms.txt for D1 and D9 — worth 8-10 points. (2) Expose structured pricing data via API for D4 — worth 5-8 points. (3) Build an MCP server exposing analytics as tools — worth 10-15 points. Any two of these would push either platform above 75. The technology exists; the agent-native infrastructure layer is missing.',
  },
  {
    question: 'Can AI agents use Amplitude or Power BI APIs today?',
    answer:
      'Yes, with manual integration. An agent developer can read the documentation, get an API key, and write code to query Amplitude cohorts or Power BI datasets. But no agent can auto-discover these services. There is no agent-card.json to tell agents what tools exist, no MCP server to provide structured tool definitions, and no llms.txt to describe capabilities. The APIs work great — agents just cannot find them without help.',
  },
  {
    question: 'Is the analytics platform pattern common across other tools?',
    answer:
      'Very common. We see the same pattern in CRM platforms, project management tools, and developer tools — strong APIs, enterprise security, but gated pricing and zero agent-native infrastructure. The 60-68 Silver range is crowded with enterprise SaaS that has excellent API quality but has not invested in agent discoverability. It is the most common bottleneck in the agent readiness landscape.',
  },
  {
    question: 'Which analytics platform is most agent-ready overall?',
    answer:
      'Among analytics platforms we have scanned, Mixpanel and PostHog score slightly higher than Amplitude and Power BI because they have more transparent pricing (freemium self-serve) and simpler onboarding (no Azure AD). But none have MCP servers or agent-card.json files. The analytics category as a whole is Silver-tier: good enough APIs to work with, but not designed for agent consumption.',
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

export default function AmplitudePowerBIAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Amplitude and Power BI Both Score 66: The Analytics Platform Pattern',
    description:
      'Amplitude 66, Power BI 66 — identical Silver scores, different products. The analytics platform pattern: data-rich APIs but zero agent-native infrastructure.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/amplitude-powerbi-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1900,
    keywords:
      'Amplitude Power BI agent readiness, analytics platform agent readiness, business intelligence AI agent',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Amplitude & Power BI Agent Readiness',
          item: 'https://agenthermes.ai/blog/amplitude-powerbi-agent-readiness',
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
      title="Why Amplitude and Power BI Both Score 66: The Analytics Platform Pattern"
      shareUrl="https://agenthermes.ai/blog/amplitude-powerbi-agent-readiness"
      currentHref="/blog/amplitude-powerbi-agent-readiness"
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
            <span className="text-zinc-400">Amplitude & Power BI Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <AreaChart className="h-3.5 w-3.5" />
              Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Dual Breakdown
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Amplitude and Power BI Both Score 66:{' '}
            <span className="text-emerald-400">The Analytics Platform Pattern</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Amplitude is a product analytics platform. Power BI is a business intelligence tool. They serve
            different users, solve different problems, and compete in different markets. Yet both score{' '}
            <strong className="text-zinc-100">exactly 66 on the Agent Readiness Score</strong> — identical
            Silver tier. This is not a coincidence. It is a pattern.
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

      {/* ===== THE PATTERN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            The Analytics Platform Pattern: Data-Rich, Agent-Poor
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Analytics platforms are data companies. Their entire product is structured data — events,
              metrics, cohorts, dashboards, reports. They have comprehensive APIs because their enterprise
              customers demand programmatic access. They have strong security because they handle sensitive
              business data. They have reliable infrastructure because downtime means blind spots in
              decision-making.
            </p>
            <p>
              All of these qualities score well on agent readiness. D2 API Quality, D6 Data Quality, D7
              Security, and D8 Reliability — the dimensions that measure &ldquo;can an agent use this
              service effectively&rdquo; — are consistently high. Analytics platforms are built for machine
              consumption. The data is structured. The APIs are documented. The types are strict.
            </p>
            <p>
              But agent readiness is not just &ldquo;can an agent use this.&rdquo; It is also &ldquo;can an
              agent find this, afford this, and integrate natively.&rdquo; On D1 Discoverability, D4 Pricing,
              D5 Payment, and D9 Agent Experience, analytics platforms consistently fail. No
              agent-card.json. No MCP server. No structured pricing API. No self-serve provisioning for
              agents. The data is rich. The agent infrastructure is nonexistent.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '66', label: 'Amplitude score', icon: AreaChart },
              { value: '66', label: 'Power BI score', icon: BarChart3 },
              { value: 'Silver', label: 'identical tier', icon: Target },
              { value: '9 pts', label: 'from Gold', icon: TrendingUp },
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

      {/* ===== DIMENSION COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Dimension-by-Dimension Comparison
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Identical overall scores hide meaningful differences on individual dimensions. Amplitude
            edges ahead on onboarding (free tier). Power BI edges ahead on security (Azure AD). Both
            collapse on pricing transparency and agent-native infrastructure.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div>Amplitude</div>
              <div>Power BI</div>
              <div>Notes</div>
            </div>
            {dimensionScores.map((row, i) => (
              <div
                key={row.dim}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dim}</div>
                <div className="text-zinc-300 font-mono">{row.amplitude}</div>
                <div className="text-zinc-300 font-mono">{row.powerbi}</div>
                <div className="text-zinc-500 text-xs">{row.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AMPLITUDE DEEP DIVE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-500" />
            Amplitude: Product Analytics with Agent Potential
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Amplitude is a product analytics platform used by teams to understand user behavior — funnels,
              retention, cohorts, and feature adoption. Its API is well-structured, with endpoints for event
              tracking, cohort management, dashboard queries, and taxonomy. For an agent managing a product
              team&rsquo;s analytics workflow, Amplitude is almost there.
            </p>
            <p>
              The free tier is a strength. An agent can get an API key without enterprise procurement.
              The Cohort API is particularly agent-friendly — agents can segment users by behavior and
              trigger downstream actions. And the Taxonomy API is self-describing, which helps agents
              understand what data is available without documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {amplitudeStrengths.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-base font-bold text-zinc-100">{item.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== POWER BI DEEP DIVE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <AreaChart className="h-5 w-5 text-blue-500" />
            Power BI: Enterprise Visualization with Microsoft Backing
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Power BI is Microsoft&rsquo;s business intelligence platform — dashboards, reports, datasets,
              and data connectors. Its API is comprehensive, with full CRUD operations on datasets, reports,
              dashboards, and workspaces. The Azure AD integration gives it the strongest security posture
              of any analytics platform we have scored.
            </p>
            <p>
              For agents, Power BI&rsquo;s strength is lifecycle management. An agent can create datasets,
              push data, trigger refreshes, generate embed tokens, and manage workspace permissions — all
              through well-documented REST endpoints. An AI operations agent managing a company&rsquo;s
              analytics stack could fully automate Power BI administration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {powerbiStrengths.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-base font-bold text-zinc-100">{item.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHERE BOTH FAIL ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-red-500" />
            Where Both Platforms Fail: The Silver Ceiling
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The gap between Silver (66) and Gold (75) is not about API quality — both platforms have
              excellent APIs. The gap is about agent-native infrastructure: the discovery, pricing, and
              integration layers that let agents interact with services autonomously.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'D4 Pricing: Enterprise-Gated',
                detail: 'Neither platform publishes structured pricing an agent can query. Amplitude has a free tier but scaling pricing requires "contact sales." Power BI has per-user pricing on the website but no API to check or provision plans programmatically. An agent managing software budgets cannot compare these platforms without a human making phone calls.',
                color: 'amber',
              },
              {
                title: 'D9 Agent Experience: Zero Infrastructure',
                detail: 'No agent-card.json. No MCP server. No llms.txt. No AGENTS.md. Neither platform has invested in any agent-native discovery mechanism. An agent scanning amplitude.com or powerbi.microsoft.com finds good API documentation — but documentation is for humans, not agents. The structured equivalent (MCP tools) does not exist.',
                color: 'red',
              },
              {
                title: 'D1 Discoverability: Docs Without Discovery',
                detail: 'Both platforms have API documentation. But agent discoverability requires specific files at specific paths: /.well-known/agent-card.json, /llms.txt, /openapi.json. API docs help developers. Discovery files help agents. Analytics platforms have the first but not the second.',
                color: 'purple',
              },
              {
                title: 'D5 Payment: No Self-Serve for Agents',
                detail: 'An agent cannot provision a Power BI Pro license or upgrade an Amplitude plan. Payment requires human intervention through enterprise sales processes. Until agents can programmatically purchase and manage subscriptions, the full autonomous workflow is blocked.',
                color: 'blue',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className={`p-5 rounded-xl ${colors.bg} border ${colors.border}`}
                >
                  <h3 className={`text-base font-bold ${colors.text} mb-2`}>{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE BROADER PATTERN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-500" />
            The Broader Pattern: Silver Ceiling Across Enterprise SaaS
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Amplitude and Power BI are not alone. Across our scans, we see the same pattern in{' '}
              <Link href="/blog/developer-tools-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                developer tools
              </Link>,{' '}
              <Link href="/blog/crm-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                CRM platforms
              </Link>, and project management tools. Enterprise SaaS products cluster in the 60-68 range
              because they share the same structural characteristics: strong APIs built for developer
              integrations, enterprise security requirements, reliable infrastructure — but no investment in
              agent-native discovery and interaction.
            </p>
            <p>
              The Silver ceiling exists because these companies built their APIs for a pre-agent world. They
              invested in developer portals, SDKs, and documentation — infrastructure designed for human
              developers to read and implement. The agent economy needs a different infrastructure layer:
              machine-readable discovery files, MCP servers with tool definitions, and self-serve provisioning
              that agents can navigate without human intervention.
            </p>
            <p>
              The companies that break through the Silver ceiling first will have a meaningful advantage. An
              analytics platform with an MCP server that lets agents query dashboards, create cohorts, and
              pull reports through structured tools would immediately become the default choice for any AI
              agent workflow that includes analytics. The API quality is already there. Only the discovery
              wrapper is missing.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The 9-point opportunity:</strong> Both Amplitude and
              Power BI are 9 points from Gold. Publishing an agent-card.json (3-5 points), adding an MCP
              server (5-8 points), and exposing structured pricing (3-5 points) would push either platform
              into the top tier. These are weekend projects for their engineering teams — not multi-quarter
              initiatives.
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
                title: 'Developer Tools Agent Readiness: Who Leads the Pack',
                href: '/blog/developer-tools-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'CRM Agent Readiness: Salesforce, HubSpot, and the Integration Gap',
                href: '/blog/crm-agent-readiness',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
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
            Score your platform in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See where your analytics platform, SaaS tool, or business scores across all 9 agent
            readiness dimensions. Find the gaps holding you back from Gold.
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
