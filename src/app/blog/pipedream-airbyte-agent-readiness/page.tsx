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
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  Network,
  Search,
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
  title:
    'Why Pipedream and Airbyte Score 63: The Data Pipeline Platform Pattern | AgentHermes',
  description:
    'Dual case study: Pipedream and Airbyte both score 63 (Silver) on Agent Readiness. Both connect APIs to APIs. Both lack agent-card.json and MCP. The irony: they help others become connected but are not agent-discoverable themselves.',
  keywords: [
    'Pipedream Airbyte agent readiness data pipeline',
    'Pipedream agent readiness score',
    'Airbyte agent readiness',
    'data pipeline agent readiness',
    'integration platform agent score',
    'Pipedream MCP server',
    'Airbyte API agent',
    'data pipeline platform pattern',
    'Silver tier agent readiness',
    'iPaaS agent readiness',
  ],
  openGraph: {
    title:
      'Why Pipedream and Airbyte Score 63: The Data Pipeline Platform Pattern',
    description:
      'Dual case study: two data pipeline platforms, identical Silver scores. The pattern behind why API-first platforms plateau at Silver without agent infrastructure.',
    url: 'https://agenthermes.ai/blog/pipedream-airbyte-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pipedream and Airbyte Agent Readiness Score 63',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Why Pipedream and Airbyte Score 63: The Data Pipeline Platform Pattern',
    description:
      'Pipedream 63, Airbyte 63. Same Silver score. Same gaps. The data pipeline platform pattern explained.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/pipedream-airbyte-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionScores = [
  { dimension: 'D1 Discovery', pipedream: 7, airbyte: 8, max: 12, notes: 'Both have docs sites and developer portals. Neither has agent-card.json or llms.txt.' },
  { dimension: 'D2 API Quality', pipedream: 13, airbyte: 12, max: 15, notes: 'Strong REST APIs, good documentation. Pipedream edges on developer experience.' },
  { dimension: 'D3 Onboarding', pipedream: 6, airbyte: 5, max: 8, notes: 'Self-service signup. Pipedream has instant API key. Airbyte requires deployment for OSS.' },
  { dimension: 'D4 Pricing', pipedream: 3, airbyte: 3, max: 5, notes: 'Both have transparent pricing pages. Neither has structured pricing endpoints.' },
  { dimension: 'D5 Payment', pipedream: 4, airbyte: 4, max: 8, notes: 'Stripe integration for payment. No programmatic subscription management.' },
  { dimension: 'D6 Data Quality', pipedream: 8, airbyte: 9, max: 10, notes: 'Strong JSON responses. Airbyte edges on schema definitions (connector catalog).' },
  { dimension: 'D7 Security', pipedream: 10, airbyte: 10, max: 12, notes: 'Both solid. TLS, API keys, OAuth. Standard security infrastructure.' },
  { dimension: 'D8 Reliability', pipedream: 10, airbyte: 10, max: 13, notes: 'High uptime, good response times. Enterprise-grade infrastructure.' },
  { dimension: 'D9 Agent Experience', pipedream: 2, airbyte: 2, max: 10, notes: 'This is the gap. No MCP, no agent card, no agent-native discovery.' },
]

const sharedStrengths = [
  {
    strength: 'REST APIs with comprehensive documentation',
    detail: 'Both platforms have well-documented REST APIs covering their core functionality. Pipedream exposes workflow management, source configuration, and event handling. Airbyte exposes connector catalog, connection management, and sync operations.',
    icon: Code2,
    color: 'emerald',
  },
  {
    strength: 'Self-service developer onboarding',
    detail: 'Sign up, get an API key, start making calls. No sales team required. This is the D3 Onboarding pattern that separates developer tools from enterprise-gated platforms.',
    icon: Zap,
    color: 'emerald',
  },
  {
    strength: 'Hundreds of pre-built integrations',
    detail: 'Pipedream connects 2,400+ APIs. Airbyte has 500+ connectors. Their entire value proposition is connecting systems. This makes their agent readiness gap especially ironic.',
    icon: Network,
    color: 'emerald',
  },
  {
    strength: 'Transparent pricing tiers',
    detail: 'Both publish pricing openly. Free tiers, pro tiers, enterprise tiers. No "contact sales for pricing" on the standard plans.',
    icon: BarChart3,
    color: 'emerald',
  },
]

const sharedGaps = [
  {
    gap: 'No agent-card.json',
    detail: 'Neither platform has a /.well-known/agent-card.json file. Agents cannot discover their capabilities through standard agent protocols. The only discovery path is web search and documentation crawling.',
    icon: FileJson,
    color: 'red',
  },
  {
    gap: 'No MCP server',
    detail: 'No Model Context Protocol server. An agent cannot programmatically discover Pipedream workflows or Airbyte connectors through MCP. Both platforms help other businesses connect APIs but have not connected themselves to the agent ecosystem.',
    icon: Server,
    color: 'red',
  },
  {
    gap: 'No llms.txt',
    detail: 'Neither provides an llms.txt file for AI model consumption. Their documentation is extensive but formatted for human developers, not AI agents.',
    icon: Search,
    color: 'amber',
  },
  {
    gap: 'Enterprise pricing opacity',
    detail: 'While standard pricing is transparent, enterprise tiers require "contact sales." An agent managing procurement for a large organization cannot get pricing programmatically beyond the published tiers.',
    icon: Shield,
    color: 'amber',
  },
]

const faqs = [
  {
    question: 'Why do Pipedream and Airbyte score identically?',
    answer:
      'They operate in the same category (data pipeline/integration platforms) with the same business model pattern: REST API, self-service onboarding, transparent pricing, no agent-native infrastructure. The score convergence is not coincidence — it reflects a platform archetype. API-first developer tools with no agent layer consistently land at 60-65.',
  },
  {
    question: 'What would it take for them to reach Gold (75+)?',
    answer:
      'Three additions would push both into Gold: (1) agent-card.json at /.well-known/ describing their capabilities in agent-readable format, (2) an MCP server exposing their core tools (search connectors, list connections, trigger syncs), and (3) an llms.txt file with structured platform documentation. These additions would boost D1 Discovery and D9 Agent Experience from their current levels to near-maximum.',
  },
  {
    question: 'Is the data pipeline platform pattern common?',
    answer:
      'Yes. We see the same pattern across iPaaS (integration-platform-as-a-service) companies: Zapier, Make, Workato, and Tray.io all have strong APIs and developer onboarding but minimal agent infrastructure. The pattern extends beyond iPaaS to any developer tool that is API-first but has not yet added agent-native discovery.',
  },
  {
    question: 'Which one should become agent-ready first?',
    answer:
      'Both should, but Pipedream has a structural advantage: its workflow engine is already essentially an MCP server waiting to happen. Pipedream workflows accept HTTP triggers, return structured responses, and can be composed. Wrapping existing workflows as MCP tools would be a natural extension of their architecture.',
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

export default function PipedreamAirbyteAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Why Pipedream and Airbyte Score 63: The Data Pipeline Platform Pattern',
    description:
      'Dual case study: Pipedream and Airbyte both score 63 (Silver) on Agent Readiness. They connect APIs to APIs but are not agent-discoverable themselves. The irony of the data pipeline platform pattern.',
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
      'https://agenthermes.ai/blog/pipedream-airbyte-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1800,
    keywords:
      'Pipedream Airbyte agent readiness data pipeline, integration platform agent score, Silver tier agent readiness',
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
      title="Why Pipedream and Airbyte Score 63: The Data Pipeline Platform Pattern"
      shareUrl="https://agenthermes.ai/blog/pipedream-airbyte-agent-readiness"
      currentHref="/blog/pipedream-airbyte-agent-readiness"
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
              <span className="text-zinc-400">Pipedream and Airbyte Agent Readiness</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                <Layers className="h-3.5 w-3.5" />
                Case Study
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                Silver Tier (63/100)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Why Pipedream and Airbyte Score 63:{' '}
              <span className="text-emerald-400">
                The Data Pipeline Platform Pattern
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Two data pipeline platforms. Identical <strong className="text-zinc-100">Silver scores of 63/100</strong>.
              Both exist to connect APIs to other APIs. Both have REST APIs, self-service onboarding,
              and hundreds of integrations. Neither has an agent-card.json, MCP server, or llms.txt.
              The irony: they help <em>other</em> businesses become more connected but have not made
              themselves agent-discoverable.
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

        {/* ===== THE IDENTICAL SCORE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              Two Platforms, One Score: The Dimension Breakdown
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                When two platforms from the same category produce identical Agent Readiness Scores,
                it reveals a pattern. Pipedream and Airbyte are not similar by accident. They share
                the same architectural DNA: API-first platforms built for developers, with strong
                technical foundations but zero investment in agent-native infrastructure.
              </p>
              <p>
                Here is the full dimension-by-dimension breakdown showing where the points come
                from and where they do not.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Dimension</div>
                <div className="text-center">Pipedream</div>
                <div className="text-center">Airbyte</div>
                <div className="text-center">Max</div>
                <div>Notes</div>
              </div>
              {dimensionScores.map((row, i) => (
                <div
                  key={row.dimension}
                  className={`grid grid-cols-5 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.dimension}</div>
                  <div className="text-center text-emerald-400">{row.pipedream}</div>
                  <div className="text-center text-blue-400">{row.airbyte}</div>
                  <div className="text-center text-zinc-500">{row.max}</div>
                  <div className="text-zinc-500 text-xs">{row.notes}</div>
                </div>
              ))}
              <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-sm font-bold">
                <div className="text-zinc-100">Total</div>
                <div className="text-center text-emerald-400">63</div>
                <div className="text-center text-blue-400">63</div>
                <div className="text-center text-zinc-400">93</div>
                <div className="text-amber-400 text-xs">Silver tier (60-74)</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '63', label: 'Pipedream score', icon: TrendingUp },
                { value: '63', label: 'Airbyte score', icon: TrendingUp },
                { value: '2/10', label: 'D9 Agent Exp (both)', icon: XCircle },
                { value: '30', label: 'Points left on table', icon: Target },
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

        {/* ===== WHAT THEY DO RIGHT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              What They Do Right: The 63-Point Foundation
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              A Silver score of 63 is above average. Most businesses we scan score under 40. Here
              is what earns data pipeline platforms their points.
            </p>

            <div className="space-y-4 mb-8">
              {sharedStrengths.map((item) => {
                const colors = getColorClasses(item.color)
                return (
                  <div
                    key={item.strength}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                        <item.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">{item.strength}</h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                This is the core of the data pipeline pattern: platforms that are{' '}
                <strong className="text-zinc-100">API-first by nature</strong> score well on
                dimensions D2 through D8 because their entire product is an API. The quality is
                there. The documentation is there. The developer experience is there. What is
                missing is the agent layer on top.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT THEY MISS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              What They Miss: The 30-Point Gap
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              The gap between Silver (63) and Platinum (90+) is almost entirely in D1 Discovery
              and D9 Agent Experience. Four additions would close it.
            </p>

            <div className="space-y-4 mb-8">
              {sharedGaps.map((item) => {
                const colors = getColorClasses(item.color)
                return (
                  <div
                    key={item.gap}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                        <item.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">{item.gap}</h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                This pattern is consistent with what we found in the{' '}
                <Link
                  href="/blog/make-agent-readiness-breakdown"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  Make agent readiness breakdown
                </Link>
                . Automation and integration platforms all hit the same ceiling: they are
                great APIs that agents cannot discover through standard agent protocols.
                The technical work to close this gap is minimal — a JSON file, an MCP
                endpoint, and a text file — but it requires awareness that the gap exists.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE IRONY ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-purple-500" />
              The Irony: API Connectors That Are Not Agent-Connected
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Pipedream&apos;s tagline is &ldquo;Connect APIs, remarkably fast.&rdquo; Airbyte&apos;s
                is &ldquo;The data integration platform for modern data teams.&rdquo; Their entire
                value proposition is making systems talk to each other. They have solved the
                connection problem for thousands of APIs.
              </p>
              <p>
                But neither has connected itself to the agent ecosystem. An AI agent tasked with
                &ldquo;set up a data pipeline from Salesforce to my data warehouse&rdquo; cannot
                discover Pipedream or Airbyte through standard agent protocols. The agent would
                need to search the web, read documentation, and attempt to navigate signup flows
                designed for humans.
              </p>
              <p>
                This is the deepest irony in the agent readiness landscape:{' '}
                <strong className="text-zinc-100">the platforms that help others become connected
                have not connected themselves</strong>. It is as if a plumber&apos;s house had
                no running water.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-purple-400">The opportunity:</strong> The first data
                pipeline platform to ship an MCP server with tools like{' '}
                <code className="text-purple-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  search_connectors()
                </code>,{' '}
                <code className="text-purple-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  create_pipeline()
                </code>, and{' '}
                <code className="text-purple-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  trigger_sync()
                </code>{' '}
                will become the default recommendation for every AI coding agent and DevOps
                assistant. Agent-native discovery creates a compounding acquisition channel
                that no amount of SEO can replicate.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE PATH TO GOLD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              The Path to Gold: What 63 to 78 Looks Like
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Both platforms could reach Gold tier (75+) with three additions. The technical
              work is measured in hours, not weeks.
            </p>

            <div className="space-y-3 mb-8">
              {[
                {
                  step: '1',
                  title: 'Ship agent-card.json',
                  detail: 'Create /.well-known/agent-card.json describing platform capabilities, supported skills (data pipeline creation, connector catalog, sync management), and authentication methods. This is a static JSON file. D1 Discovery jumps from 7-8 to 11-12.',
                  icon: FileJson,
                },
                {
                  step: '2',
                  title: 'Deploy an MCP server',
                  detail: 'Wrap existing REST API endpoints as MCP tools. For Pipedream: search_workflows, create_workflow, list_sources. For Airbyte: search_connectors, create_connection, trigger_sync. The API already exists; the MCP layer is a translation. D9 Agent Experience jumps from 2 to 7-8.',
                  icon: Server,
                },
                {
                  step: '3',
                  title: 'Create llms.txt',
                  detail: 'Generate a structured text file at /llms.txt summarizing platform capabilities, key concepts, and common use cases in a format optimized for AI model consumption. D1 Discovery adds another 1-2 points.',
                  icon: Globe,
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

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The combined effect of these three additions would push both platforms from
                Silver 63 to Gold 78-80. The{' '}
                <Link
                  href="/blog/developer-tools-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  developer tools agent readiness
                </Link>{' '}
                analysis shows that the top-scoring developer platforms (Supabase, Vercel,
                Stripe) all have strong agent-native infrastructure. The path from Silver to
                Gold in this category is not about building better APIs. The APIs are already
                good. It is about making them discoverable to agents.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE BROADER PATTERN ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              The Broader Pattern: Why iPaaS Platforms Plateau at Silver
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Pipedream and Airbyte are not outliers. The entire iPaaS (integration-platform-as-a-service)
                category shares this pattern. Zapier, Make, Workato, Tray.io, n8n — all score
                in the 55-65 range. All have strong APIs. All lack agent-native infrastructure.
              </p>
              <p>
                The pattern exists because these platforms were built in the pre-agent era. They
                optimize for developer experience (human developers reading docs and writing code)
                rather than agent experience (AI agents discovering and calling tools). The shift
                from developer-first to agent-first does not require rebuilding the platform. It
                requires adding a thin discovery and interaction layer on top.
              </p>
              <p>
                The competitive dynamics are clear: the first iPaaS platform to become fully
                agent-ready will be the default recommendation when any AI agent is asked to
                help with data integration, workflow automation, or API connection. Every AI
                coding assistant, every DevOps agent, every enterprise automation agent will
                prefer the platform that it can interact with natively over the ones where
                it has to guide a human through a web interface.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">The market question:</strong> Will Pipedream,
                Airbyte, or one of their competitors be the first to ship an MCP server? Pipedream
                has a structural advantage (workflows are already tool-shaped). Airbyte has a
                distribution advantage (open source, self-hosted). Either way, the first mover
                captures an entirely new acquisition channel: agent-driven platform recommendations.
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
                  title: 'Make Agent Readiness Breakdown',
                  href: '/blog/make-agent-readiness-breakdown',
                  tag: 'Case Study',
                  tagColor: 'blue',
                },
                {
                  title: 'Developer Tools Agent Readiness',
                  href: '/blog/developer-tools-agent-readiness',
                  tag: 'Category Analysis',
                  tagColor: 'cyan',
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
              See where your platform scores
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run a free Agent Readiness Scan to get your score across all 9 dimensions.
              Find out if you are hitting the same Silver ceiling as Pipedream and Airbyte.
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
