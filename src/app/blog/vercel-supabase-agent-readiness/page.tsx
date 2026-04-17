import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Cloud,
  Code2,
  Database,
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Network,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Vercel and Supabase Both Score 69-70: The Infrastructure Platform Pattern | AgentHermes',
  description:
    'Vercel scores 70 Silver, Supabase scores 69 Silver. Nearly identical but different strengths. What the infrastructure platform pattern reveals about agent readiness, and what 3 files would push both to Gold.',
  keywords: [
    'Vercel Supabase agent readiness',
    'Vercel agent readiness score',
    'Supabase agent readiness score',
    'infrastructure platform agent readiness',
    'developer tools agent score',
    'Vercel 70 Silver',
    'Supabase 69 Silver',
    'agent readiness infrastructure',
  ],
  openGraph: {
    title: 'Why Vercel and Supabase Both Score 69-70: The Infrastructure Platform Pattern',
    description:
      'Vercel 70, Supabase 69. Nearly identical scores, completely different architectures. The infrastructure platform pattern that defines Silver tier — and the 3 files that would push both to Gold.',
    url: 'https://agenthermes.ai/blog/vercel-supabase-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why Vercel and Supabase Both Score 69-70',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Vercel and Supabase Both Score 69-70: The Infrastructure Platform Pattern',
    description:
      'Vercel 70, Supabase 69. Same tier, different strengths. The 3 files that would push both to Gold.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/vercel-supabase-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionComparison = [
  { dimension: 'D1 Discoverability (12%)', vercel: 8.5, supabase: 8.0, vercelNote: 'Extensive docs site, sitemap, OG tags', supabaseNote: 'Docs + community guides, strong SEO' },
  { dimension: 'D2 API Quality (15%)', vercel: 11.0, supabase: 12.5, vercelNote: 'REST API, well-documented CLI', supabaseNote: 'REST + GraphQL + Realtime, OpenAPI spec' },
  { dimension: 'D3 Onboarding (8%)', vercel: 5.5, supabase: 6.0, vercelNote: 'GitHub OAuth, instant deploy', supabaseNote: 'Self-service keys, instant project creation' },
  { dimension: 'D4 Pricing (5%)', vercel: 3.5, supabase: 4.0, vercelNote: 'Public tiers, usage-based', supabaseNote: 'Transparent per-project pricing, free tier' },
  { dimension: 'D5 Payment (8%)', vercel: 5.0, supabase: 4.5, vercelNote: 'Self-service billing API', supabaseNote: 'Dashboard billing, less API exposure' },
  { dimension: 'D6 Data Quality (10%)', vercel: 7.5, supabase: 7.5, vercelNote: 'Structured JSON, typed errors', supabaseNote: 'PostgREST structured responses' },
  { dimension: 'D7 Security (12%)', vercel: 9.0, supabase: 8.5, vercelNote: 'OAuth, team tokens, RBAC', supabaseNote: 'API keys + JWT, RLS policies' },
  { dimension: 'D8 Reliability (13%)', vercel: 10.5, supabase: 9.5, vercelNote: 'status.vercel.com, incident history', supabaseNote: 'status.supabase.com, uptime monitoring' },
  { dimension: 'D9 Agent Experience (10%)', vercel: 6.5, supabase: 6.0, vercelNote: 'Structured errors, request IDs', supabaseNote: 'Consistent error format, headers' },
  { dimension: 'Agent-Native Bonus (7%)', vercel: 3.0, supabase: 2.5, vercelNote: 'No agent-card.json, no llms.txt', supabaseNote: 'No agent-card.json, no MCP server' },
]

const goldChecklist = [
  {
    file: 'agent-card.json',
    effort: '10 minutes',
    impact: '+2-3 points on D1 and Agent-Native Bonus',
    description: 'A JSON file at /.well-known/agent-card.json that declares capabilities, tools, and authentication methods. Agents use this as their entry point for discovery.',
  },
  {
    file: 'llms.txt',
    effort: '10 minutes',
    impact: '+1-2 points on D1 and D9',
    description: 'A markdown file at /llms.txt that gives LLMs a plain-language summary of what your platform does, its API surface, and how to get started. Faster than parsing docs.',
  },
  {
    file: 'MCP Server endpoint',
    effort: '30-60 minutes',
    impact: '+3-4 points on Agent-Native Bonus',
    description: 'An MCP server that exposes platform tools — deploy, query, create-project — as callable functions. Both platforms already have the APIs. The MCP server is the agent-native wrapper.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do Vercel and Supabase score almost identically?',
    answer:
      'Both are modern developer infrastructure platforms built API-first. They share the same architectural DNA: comprehensive REST APIs, self-service onboarding, transparent pricing, structured error responses, and public status pages. The Agent Readiness Score rewards these patterns heavily, which is why developer tools dominate the Silver tier.',
  },
  {
    question: 'What separates Silver from Gold?',
    answer:
      'Gold (75+) requires agent-native signals that Silver companies typically lack: an agent-card.json for A2A discovery, an llms.txt for LLM consumption, and ideally an MCP server for direct tool invocation. These are the explicit "I am ready for AI agents" declarations. Without them, platforms are agent-usable but not agent-native.',
  },
  {
    question: 'Does Supabase have an MCP server?',
    answer:
      'The Supabase community has built several unofficial MCP servers, and there are third-party integrations. However, Supabase does not ship an official MCP server endpoint from supabase.com itself. An official MCP server that wraps the Management API and client libraries would immediately push the score toward Gold.',
  },
  {
    question: 'How does Vercel compare to GitHub on agent readiness?',
    answer:
      'GitHub scores 67 Silver — slightly below Vercel at 70. GitHub has deeper API surface (REST + GraphQL + official MCP server via Copilot), but Vercel edges ahead on reliability signals (status page, structured deployment errors) and onboarding friction. Both miss the same Gold-tier files.',
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

export default function VercelSupabaseAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Vercel and Supabase Both Score 69-70: The Infrastructure Platform Pattern',
    description:
      'Vercel scores 70 Silver, Supabase scores 69 Silver. A dimension-by-dimension comparison revealing the infrastructure platform pattern and the 3 files that would push both to Gold.',
    datePublished: '2026-04-16',
    dateModified: '2026-04-16',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/vercel-supabase-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1800,
    keywords:
      'Vercel Supabase agent readiness, infrastructure platform pattern, Silver tier, agent-card.json, MCP server',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Vercel and Supabase Agent Readiness',
          item: 'https://agenthermes.ai/blog/vercel-supabase-agent-readiness',
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
      title="Why Vercel and Supabase Both Score 69-70: The Infrastructure Platform Pattern"
      shareUrl="https://agenthermes.ai/blog/vercel-supabase-agent-readiness"
      currentHref="/blog/vercel-supabase-agent-readiness"
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
            <span className="text-zinc-400">Vercel &amp; Supabase Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Server className="h-3.5 w-3.5" />
              Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Platform Comparison
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Vercel and Supabase Both Score 69-70:{' '}
            <span className="text-emerald-400">The Infrastructure Platform Pattern</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Vercel scores <strong className="text-zinc-100">70 Silver</strong>. Supabase scores{' '}
            <strong className="text-zinc-100">69 Silver</strong>. One point apart, nearly identical
            tier placement, but built on completely different architectures. Together they reveal
            the <strong className="text-zinc-100">infrastructure platform pattern</strong> — the
            set of signals that reliably produces Silver-tier agent readiness without any
            agent-specific effort.
          </p>

          {/* Author byline */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
            <div className="author-avatar">AH</div>
            <div>
              <div className="text-sm font-semibold text-zinc-200">AgentHermes Research</div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  April 16, 2026
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
            <Network className="h-5 w-5 text-emerald-500" />
            The Infrastructure Platform Pattern
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              After scanning 500 businesses, a clear pattern emerged. The companies that score highest
              on agent readiness are not the ones that intentionally built for AI agents. They are the
              ones that built for <strong className="text-zinc-100">developers</strong>. Developer
              infrastructure platforms share a DNA that maps almost perfectly onto what AI agents need:
              comprehensive APIs, self-service access, structured data, transparent pricing, and
              reliable uptime.
            </p>
            <p>
              Vercel and Supabase are the textbook case. Neither company has shipped agent-card.json.
              Neither publishes llms.txt. Neither offers an official MCP server from their primary domain.
              Yet both score in the top 5% of all businesses scanned — because{' '}
              <strong className="text-zinc-100">building for developers accidentally builds for agents</strong>.
            </p>
            <p>
              This is the infrastructure platform pattern: if your product is consumed via API, documented
              with structured specs, secured with token-based auth, and monitored with a public status
              page, you already have 70% of what agents need. The remaining 30% — the gap between
              Silver and Gold — is three files and 30 minutes of work.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '70', label: 'Vercel Score', icon: Cloud, color: 'text-blue-400' },
              { value: '69', label: 'Supabase Score', icon: Database, color: 'text-emerald-400' },
              { value: '5', label: 'Points to Gold', icon: Target, color: 'text-amber-400' },
              { value: '30m', label: 'To close the gap', icon: Zap, color: 'text-purple-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VERCEL STRENGTHS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Cloud className="h-5 w-5 text-blue-500" />
            Vercel at 70: What It Gets Right
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Vercel earns the slight edge because of three areas where deployment infrastructure
              naturally excels at agent readiness.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                title: 'Deployment API with structured lifecycle',
                detail: 'Every deployment exposes a machine-readable lifecycle: created, building, ready, error. An agent can trigger a deploy, poll for status, and read structured build output — all via REST. No scraping needed.',
                icon: Server,
                color: 'blue',
              },
              {
                title: 'CLI documentation as API documentation',
                detail: 'Vercel\'s CLI is exhaustively documented, and every CLI command maps to an API endpoint. Agents can read the CLI docs and derive the API surface. This dual documentation pattern inflates D2 API Quality scores.',
                icon: Code2,
                color: 'blue',
              },
              {
                title: 'Status page with incident history',
                detail: 'status.vercel.com provides structured uptime data, incident timelines, and component-level health. D8 Reliability carries 13% weight — the second-highest dimension. A well-maintained status page alone can be worth 2-3 points.',
                icon: BarChart3,
                color: 'blue',
              },
              {
                title: 'Structured error responses on every endpoint',
                detail: 'Vercel returns JSON error objects with error codes, messages, and request IDs on every failed request. This lifts both D6 Data Quality (10%) and D9 Agent Experience (10%) — 20% of the total score from error handling alone.',
                icon: Shield,
                color: 'blue',
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
                    <h3 className="text-lg font-bold text-zinc-100">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== SUPABASE STRENGTHS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-emerald-500" />
            Supabase at 69: What It Gets Right
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Supabase trails by a single point but wins on raw API depth. A database-as-a-service
              naturally exposes the most agent-friendly interface of any infrastructure type: structured
              queries that return structured data.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                title: 'Three API transports: REST, GraphQL, Realtime',
                detail: 'PostgREST auto-generates a REST API from your schema. GraphQL via pg_graphql adds query flexibility. Realtime subscriptions enable event-driven agent workflows. This triple surface area pushes D2 API Quality near the maximum.',
                icon: Layers,
                color: 'emerald',
              },
              {
                title: 'Self-service API keys with instant provisioning',
                detail: 'A new project gets an anon key and service role key immediately. No approval flow, no sales call, no waiting period. D3 Onboarding (8%) rewards this friction-free credential issuance directly.',
                icon: Lock,
                color: 'emerald',
              },
              {
                title: 'OpenAPI specification published',
                detail: 'The Management API ships with an OpenAPI spec. Agents can read the spec, understand every endpoint, and generate correct requests without documentation scraping. OpenAPI is the single biggest factor in D2 scores.',
                icon: FileJson,
                color: 'emerald',
              },
              {
                title: 'Transparent per-project pricing',
                detail: 'Every resource (database, storage, bandwidth, edge functions) has public per-unit pricing. A free tier exists with documented limits. D4 Pricing (5%) is the lowest-weighted dimension, but Supabase maximizes it by making every cost machine-readable.',
                icon: TrendingUp,
                color: 'emerald',
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
                    <h3 className="text-lg font-bold text-zinc-100">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== DIMENSION COMPARISON TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Dimension-by-Dimension Comparison
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Both platforms score within 1-2 points of each other on most dimensions. The divergence
            comes from their core architecture: Vercel excels at reliability and deployment lifecycle
            signals, Supabase excels at raw API depth and onboarding speed.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div className="text-center">Vercel</div>
              <div className="text-center">Supabase</div>
              <div className="text-center">Edge</div>
            </div>
            {dimensionComparison.map((row, i) => {
              const edge = row.vercel > row.supabase ? 'Vercel' : row.supabase > row.vercel ? 'Supabase' : 'Tied'
              const edgeColor = edge === 'Vercel' ? 'text-blue-400' : edge === 'Supabase' ? 'text-emerald-400' : 'text-zinc-500'
              return (
                <div
                  key={row.dimension}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200 text-xs sm:text-sm">{row.dimension}</div>
                  <div className="text-center text-blue-400 font-mono">{row.vercel.toFixed(1)}</div>
                  <div className="text-center text-emerald-400 font-mono">{row.supabase.toFixed(1)}</div>
                  <div className={`text-center text-xs font-medium ${edgeColor}`}>{edge}</div>
                </div>
              )
            })}
            <div className="grid grid-cols-4 p-4 text-sm bg-zinc-800/30 border-t border-zinc-700/50">
              <div className="font-bold text-zinc-100">Total</div>
              <div className="text-center text-blue-400 font-bold font-mono">70.0</div>
              <div className="text-center text-emerald-400 font-bold font-mono">69.0</div>
              <div className="text-center text-zinc-500 text-xs">+1 Vercel</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT BOTH MISS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            What Both Miss: The 3 Files to Gold
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Both platforms fall short of Gold (75+) for the same reason: they are agent-usable but not
              agent-native. An AI agent can interact with Vercel and Supabase APIs effectively, but
              neither platform explicitly declares itself as agent-ready. Three files would change that.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {goldChecklist.map((item) => (
              <div
                key={item.file}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    {item.file}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      {item.effort}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      {item.impact}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The math is simple:</strong> Vercel at 70 + agent-card.json
              (+2) + llms.txt (+1) + MCP server (+3) = 76 Gold. Supabase at 69 with the same additions = 75
              Gold. The only company that has done all three?{' '}
              <Link href="/blog/resend-only-gold" className="text-emerald-400 hover:text-emerald-300 underline">
                Resend, the only Gold at 75
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== LESSONS FOR OTHER PLATFORMS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Lessons for Every Infrastructure Platform
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The Vercel-Supabase comparison reveals a repeatable formula. Any infrastructure platform —
              Cloudflare, Neon, PlanetScale, Render, Railway, Fly.io — can apply the same pattern.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'API-first architecture is 60% of the score',
                detail: 'D2 API Quality (15%), D6 Data Quality (10%), D7 Security (12%), and D9 Agent Experience (10%) collectively reward structured, authenticated, well-documented APIs. If you already have these, you are already Silver-adjacent.',
              },
              {
                title: 'Status pages are undervalued assets',
                detail: 'D8 Reliability (13%) is the second-highest dimension. A public status page with historical uptime, component-level health, and incident timelines is worth more than most companies realize — not just for trust, but for agent decisioning.',
              },
              {
                title: 'Self-service onboarding is non-negotiable',
                detail: 'If an agent cannot get API credentials without a human in the loop, D3 Onboarding scores zero. OAuth app creation, API key generation, and instant project provisioning are baseline requirements.',
              },
              {
                title: 'Agent-native signals are the Gold unlock',
                detail: 'The gap between Silver and Gold is not about building new APIs. It is about declaring your existing APIs in agent-native formats: agent-card.json for discovery, llms.txt for comprehension, MCP for invocation.',
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The companies in our{' '}
              <Link href="/blog/developer-tools-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                developer tools analysis
              </Link>{' '}
              overwhelmingly follow this pattern. 22 of the top 30 Silver-tier companies are developer
              infrastructure. The pattern is not accidental — it is architectural. And as shown in our{' '}
              <Link href="/blog/github-agent-readiness-breakdown" className="text-emerald-400 hover:text-emerald-300 underline">
                GitHub breakdown
              </Link>, even the largest platforms in the world still miss the explicit agent-native signals
              that separate Silver from Gold.
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
                title: 'Resend Is the Only Gold — What 499 Businesses Can Learn',
                href: '/blog/resend-only-gold',
                tag: 'Case Study',
                tagColor: 'amber',
              },
              {
                title: 'Why Developer Tools Dominate Agent Readiness',
                href: '/blog/developer-tools-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
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
            See how your platform compares
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score across all 9 dimensions. See where you rank
            against Vercel, Supabase, and 500 other businesses.
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
