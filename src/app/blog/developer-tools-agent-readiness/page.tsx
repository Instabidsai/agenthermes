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
  Code,
  Code2,
  FileJson,
  FileText,
  HelpCircle,
  Layers,
  Lightbulb,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Wrench,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Developer Tools Dominate Agent Readiness (And What Everyone Else Can Learn) | AgentHermes',
  description:
    'After scanning 500 businesses, 22 of the top 30 Silver-tier companies are developer tools. Vercel 70, Supabase 69, Stripe 68, GitHub 67. Here is the pattern that made them agent-ready and what every non-dev business can borrow.',
  keywords: [
    'developer tools agent readiness',
    'why dev tools score high',
    'API quality agent readiness',
    'Vercel agent ready',
    'Supabase agent ready',
    'GitHub agent readiness',
    'OpenAPI agent',
    'API-first business',
    'document-first APIs',
  ],
  openGraph: {
    title: 'Why Developer Tools Dominate Agent Readiness (And What Everyone Else Can Learn)',
    description:
      '22 of the top 30 Silver-tier agent-ready companies are dev tools. Vercel, Supabase, Stripe, GitHub. One pattern explains all of them.',
    url: 'https://agenthermes.ai/blog/developer-tools-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why Developer Tools Dominate Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Developer Tools Dominate Agent Readiness',
    description:
      '22 of top 30 Silver-tier are dev tools. Vercel 70, Supabase 69, Stripe 68, GitHub 67. Here is the pattern.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/developer-tools-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const topDevTools = [
  { name: 'Vercel', score: 70, category: 'Hosting / Infra' },
  { name: 'Supabase', score: 69, category: 'Database / Auth' },
  { name: 'Stripe', score: 68, category: 'Payments API' },
  { name: 'Slack', score: 68, category: 'Communication API' },
  { name: 'GitHub', score: 67, category: 'Code / VCS' },
  { name: 'Make', score: 67, category: 'Automation' },
  { name: 'Opsgenie', score: 67, category: 'Incident' },
  { name: 'Drata', score: 66, category: 'Compliance' },
  { name: 'Mintlify', score: 66, category: 'Docs' },
  { name: 'Amplitude', score: 66, category: 'Analytics' },
  { name: 'Jira', score: 66, category: 'Project Mgmt' },
  { name: 'Secureframe', score: 65, category: 'Compliance' },
  { name: 'Grafana', score: 65, category: 'Observability' },
  { name: 'MongoDB', score: 65, category: 'Database' },
  { name: 'Monday', score: 65, category: 'Project Mgmt' },
  { name: 'Calendly', score: 64, category: 'Scheduling API' },
  { name: 'Growthbook', score: 64, category: 'Feature Flags' },
  { name: 'Airbyte', score: 63, category: 'Data Pipeline' },
  { name: 'Pipedream', score: 63, category: 'Automation' },
]

const thePattern = [
  {
    trait: 'The API is the product',
    dev: 'Stripe sells an API. Vercel sells a deploy API. Supabase sells a Postgres + auth API.',
    nonDev: 'A restaurant sells food. The API (if it exists) is a bolt-on to manage orders.',
    icon: Target,
    color: 'emerald',
  },
  {
    trait: 'Docs written by engineers for engineers',
    dev: 'OpenAPI specs, code samples, copy-paste curl commands. Docs are a product surface area.',
    nonDev: 'A PDF service menu and a contact form. Docs are marketing copy, not integration specs.',
    icon: FileText,
    color: 'blue',
  },
  {
    trait: 'Every error returns structured JSON',
    dev: 'GitHub returns { error, code, documentation_url }. Stripe returns typed error objects. Agents can handle failures.',
    nonDev: 'A 500 HTML error page with no machine-readable signal. Agents guess what happened.',
    icon: Shield,
    color: 'purple',
  },
  {
    trait: 'Status pages and changelogs live at predictable URLs',
    dev: '/status, /changelog, /api/status. Agents poll them. Reliability D8 is testable.',
    nonDev: 'Status info lives in a Twitter thread. Changelog lives in an internal PDF.',
    icon: TrendingUp,
    color: 'emerald',
  },
  {
    trait: 'OAuth, API keys, webhooks — all standardized',
    dev: 'OAuth 2.0 with scopes. Rotatable keys. Signed webhooks with HMAC. Onboard (D3) and Security (D7) are near-automatic.',
    nonDev: 'A login with password. Sometimes an API key mailed to you. No OAuth.',
    icon: Network,
    color: 'blue',
  },
]

const borrowables = [
  {
    title: 'Publish an OpenAPI spec at /openapi.json',
    detail: 'Even if you have 3 endpoints. The spec makes them discoverable. D2 API Quality is the highest-weighted dimension at 0.15 — an OpenAPI spec moves it instantly.',
    effort: '2 hours',
  },
  {
    title: 'Turn every error into JSON',
    detail: 'Replace your 500 HTML page with { error, code, request_id }. Agents can now retry intelligently instead of giving up. This alone moves D8 Reliability from failing to passing.',
    effort: '1 hour',
  },
  {
    title: 'Add a /status page',
    detail: 'Even a static HTML page that says "All Systems Operational" is better than nothing. Better: a JSON endpoint at /api/status that returns { ok: true, version, uptime }.',
    effort: '30 minutes',
  },
  {
    title: 'Publish a changelog',
    detail: 'A markdown file at /changelog or /changelog.json. Agents scan it to know what changed. D9 Agent Experience directly tests for this.',
    effort: '15 minutes',
  },
  {
    title: 'Ship an agent-card.json',
    detail: 'The A2A discovery standard. 3kb of JSON at /.well-known/agent-card.json tells agents what you do and how to call you. Zero non-dev businesses have one.',
    effort: '10 minutes',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do developer tools score higher than consumer businesses on agent readiness?',
    answer:
      'Developer tools score higher because their primary product IS their API. Stripe, Vercel, Supabase, and GitHub built their businesses around structured, well-documented, machine-readable interfaces because their customers are developers who demand those things. When AI agents show up as a new "customer," the infrastructure is already in place. Consumer businesses built for human clicks on websites — which is exactly what agents cannot use efficiently.',
  },
  {
    question: 'What is the single biggest thing a non-developer business can do to score like a dev tool?',
    answer:
      'Publish an OpenAPI specification at /openapi.json and link to it from your agent-card.json. D2 API Quality is weighted 0.15 — higher than any other dimension. Companies with a published OpenAPI spec consistently score above 60. Companies without hit a ceiling around 45 no matter what else they do. You do not need hundreds of endpoints — you need the ones you have to be discoverable and typed.',
  },
  {
    question: 'Do I need to become a developer tool to score well?',
    answer:
      'No. You need to adopt developer-tool patterns for the parts of your business that agents will touch. A restaurant does not need to become Stripe — but its menu, hours, reservation system, and order flow should follow the same API-first patterns that Stripe uses for payments. The pattern is portable; you only apply it to the agent-facing surface.',
  },
  {
    question: 'Why does Cash App score 12 when Stripe scores 68 — they are both fintech?',
    answer:
      'Because Stripe built for developers and Cash App built for consumers. Stripe has a public API, OpenAPI spec, SDK in every language, webhook system, and OAuth. Cash App has a mobile app with no public developer API — agents cannot transact with it. Same industry, opposite agent-readiness. For more detail see our fintech breakdown.',
  },
  {
    question: 'Is this a temporary gap or a permanent advantage for dev tools?',
    answer:
      'Temporary. The patterns are portable and the tooling to adopt them (OpenAPI generators, JSON error middleware, OAuth libraries) is free and widely available. The first non-dev businesses to borrow these patterns will capture the agent-economy opportunity in their verticals. In 3 years the gap between Silver and Bronze will close as the playbook spreads.',
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

export default function DeveloperToolsAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Developer Tools Dominate Agent Readiness (And What Everyone Else Can Learn)',
    description:
      'After scanning 500 businesses, 22 of the top 30 Silver-tier companies are developer tools. Vercel 70, Supabase 69, Stripe 68, GitHub 67. Here is the pattern that made them agent-ready and what non-dev businesses can borrow.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/developer-tools-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Research',
    wordCount: 1850,
    keywords:
      'developer tools agent readiness, API-first business, OpenAPI, Vercel, Supabase, Stripe, GitHub',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Developer Tools Agent Readiness',
          item: 'https://agenthermes.ai/blog/developer-tools-agent-readiness',
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
      title="Why Developer Tools Dominate Agent Readiness (And What Everyone Else Can Learn)"
      shareUrl="https://agenthermes.ai/blog/developer-tools-agent-readiness"
      currentHref="/blog/developer-tools-agent-readiness"
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
            <span className="text-zinc-400">Developer Tools Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Code className="h-3.5 w-3.5" />
              Research
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              500 Businesses Scanned
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Developer Tools Dominate Agent Readiness{' '}
            <span className="text-emerald-400">(And What Everyone Else Can Learn)</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Of the top 30 Silver-tier businesses on the Agent Readiness leaderboard,{' '}
            <strong className="text-zinc-100">22 are developer tools or infrastructure</strong>. Vercel 70.
            Supabase 69. Stripe 68. GitHub 67. There is a single pattern underneath all of them — and it is
            fully portable to any business that wants to stop being invisible to agents.
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

      {/* ===== THE DATA ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The Data: Developer Tools Own the Top of the Leaderboard
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Developer tools dominate agent readiness because their APIs are their product. We scanned 500
              businesses across consumer, SMB, enterprise, and infrastructure categories. The distribution
              of scores looks like this: 1 Gold, 52 Silver, 249 Bronze, and 199 businesses below the Bronze
              threshold. When you look at the 52 Silver-tier companies, a single category dominates.
            </p>
            <p>
              Twenty-two of the top thirty Silver-tier businesses are developer tools, developer
              infrastructure, or APIs sold to developers. The average score for this group is 66. The
              average across all 500 businesses we scanned is 43. That is a 23-point gap driven by one
              thing: <strong className="text-zinc-100">these companies were built from day one to be
              called by machines, not clicked by humans</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '22 / 30', label: 'top Silver are dev tools', icon: Code },
              { value: '66', label: 'avg dev tool score', icon: TrendingUp },
              { value: '43', label: 'avg all businesses', icon: BarChart3 },
              { value: '23 pts', label: 'the gap', icon: Target },
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
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Company</div>
              <div>Score</div>
              <div>Category</div>
            </div>
            {topDevTools.map((tool, i) => (
              <div
                key={tool.name}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{tool.name}</div>
                <div className="text-emerald-400 font-bold">{tool.score}</div>
                <div className="text-zinc-500">{tool.category}</div>
              </div>
            ))}
          </div>

          <p className="text-zinc-300 leading-relaxed">
            Every one of these companies treats its API as a first-class product surface. They publish
            OpenAPI specs. They return structured JSON errors. They maintain public status pages and
            changelogs. They support OAuth and signed webhooks. None of this was built for AI agents — it
            was built for developers. But agents and developers need the same things, so the infrastructure
            transfers for free.
          </p>
        </div>
      </section>

      {/* ===== THE PATTERN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            The Pattern: Five Traits That Make a Business Agent-Ready
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Underneath every high-scoring developer tool are the same five traits. None of them are
            exclusive to dev tools. All five are borrowable by any business willing to treat its API as
            a product, not an afterthought.
          </p>

          <div className="space-y-4 mb-8">
            {thePattern.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.trait}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{item.trait}</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                      <div className="text-xs font-semibold text-emerald-400 mb-1">Dev tool</div>
                      <div className="text-zinc-300 leading-relaxed">{item.dev}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                      <div className="text-xs font-semibold text-red-400 mb-1">Non-dev business</div>
                      <div className="text-zinc-400 leading-relaxed">{item.nonDev}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY DEV TOOLS WIN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Why Dev Tools Built This Infrastructure Accidentally
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Nobody at Stripe in 2011 was thinking about AI agents. Nobody at GitHub in 2008 was preparing
              for Claude or ChatGPT. The agent-readiness their products exhibit today is a{' '}
              <strong className="text-zinc-100">second-order effect of building for developers</strong>.
            </p>
            <p>
              When your customer is a developer, they will not tolerate ambiguity. They demand an OpenAPI
              spec because their IDE autocompletes from it. They demand JSON errors because their retry
              logic depends on them. They demand webhooks because polling is wasteful. They demand OAuth
              because password auth does not scale. Every one of these demands, met in service of human
              developers, happens to be exactly what AI agents also require.
            </p>
            <p>
              Consumer businesses built for the opposite constraint. A restaurant does not need an OpenAPI
              spec because diners do not have IDEs. A dentist does not need webhooks because patients do
              not poll. A salon does not need OAuth because customers just log in. The incentives never
              pulled toward structured, machine-readable interfaces — so they never got built.
            </p>
            <p>
              This creates an accidental 23-point lead for any business category that built for developers.
              And it creates a deterministic playbook for any business that wants to close the gap.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT EVERYONE ELSE CAN BORROW ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-blue-500" />
            What Non-Dev Businesses Can Borrow (Ranked by ROI)
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            You do not need to become Stripe. You need to adopt the five specific patterns that drove
            Stripe&apos;s agent-readiness score. Ordered from cheapest to most expensive, here is the
            full list.
          </p>

          <div className="space-y-3 mb-8">
            {borrowables.map((item, i) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                    <span className="text-xs text-emerald-400 font-semibold whitespace-nowrap">
                      {item.effort}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The 4-hour playbook:</strong> An agent-card.json (10
              min), a /status page (30 min), a /changelog (15 min), JSON errors (1 hour), and a basic
              OpenAPI spec (2 hours). Most businesses move from Bronze to Silver inside a single
              afternoon — and the changes never need to be undone because they are standards-compliant
              from day one.
            </p>
          </div>
        </div>
      </section>

      {/* ===== REFERENCE CASES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-purple-500" />
            Three Reference Cases: Resend, Stripe, GitHub
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              We wrote deep breakdowns of three dev-tool reference cases. Each one illustrates a different
              aspect of the pattern.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/blog/resend-only-gold"
              className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  GOLD 75
                </span>
              </div>
              <h3 className="text-base font-bold text-zinc-100 mb-2 group-hover:text-emerald-400 transition-colors">
                Resend
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                The only Gold-tier business out of 500. Email API. Publishes OpenAPI. Every dimension above
                70. The gold standard for what agent-ready looks like.
              </p>
            </Link>
            <Link
              href="/blog/why-stripe-scores-68"
              className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-blue-500/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
                  SILVER 68
                </span>
              </div>
              <h3 className="text-base font-bold text-zinc-100 mb-2 group-hover:text-blue-400 transition-colors">
                Stripe
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Payments API. Famous for its OpenAPI spec. Regulatory compliance + agent readiness in the
                same stack. Proof that compliant and agent-ready are not opposites.
              </p>
            </Link>
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
                  SILVER 67
                </span>
              </div>
              <h3 className="text-base font-bold text-zinc-100 mb-2">GitHub</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Code API. Every error returns documentation_url. Rate limits exposed in headers. The
                agent-experience template other APIs should copy.
              </p>
            </div>
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
                title: 'What Makes Stripe Score 68 Silver',
                href: '/blog/why-stripe-scores-68',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'The Agent Readiness Leaderboard',
                href: '/blog/agent-readiness-leaderboard',
                tag: 'Data Analysis',
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
            See where your business ranks
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see your score across all 9 dimensions. Most businesses
            move from Bronze to Silver in an afternoon by adopting the patterns above.
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
              href="/leaderboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              See the Leaderboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
