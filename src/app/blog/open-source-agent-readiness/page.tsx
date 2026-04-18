import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Braces,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  FileText,
  GitBranch,
  Globe,
  HelpCircle,
  Network,
  Server,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Open Source and Agent Readiness: Why GitHub Stars Don\'t Predict Agent Readiness Scores | AgentHermes',
  description:
    'Open source projects have public code but not necessarily agent-ready APIs. GitHub stars measure popularity, not agent accessibility. The distinction: open source means visible code, agent ready means usable by agents.',
  keywords: [
    'open source agent readiness GitHub',
    'GitHub agent readiness',
    'open source API',
    'agent ready open source',
    'GitHub stars vs agent readiness',
    'OSS agent economy',
    'open source MCP server',
    'developer tools agent readiness',
  ],
  openGraph: {
    title: 'Open Source and Agent Readiness: Why GitHub Stars Don\'t Predict Agent Readiness Scores',
    description:
      'Public code does not equal agent-ready APIs. GitHub stars measure popularity, not agent accessibility. Open source means visible code. Agent ready means usable by agents.',
    url: 'https://agenthermes.ai/blog/open-source-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Open Source and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Source and Agent Readiness: GitHub Stars Don\'t Predict Agent Readiness',
    description:
      'Open source means visible code. Agent ready means usable by agents. These are not the same thing.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/open-source-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ossProjects = [
  { project: 'Linux Kernel', stars: '185K', score: 8, tier: 'Dark', reason: 'No API, no hosted service, documentation is man pages' },
  { project: 'React', stars: '230K', score: 12, tier: 'Dark', reason: 'Library, not a service. Docs are great but no API endpoint to call' },
  { project: 'PostgreSQL', stars: '16K', score: 15, tier: 'Dark', reason: 'Database, not an API. Must self-host. No agent discovery layer' },
  { project: 'VS Code', stars: '165K', score: 18, tier: 'Dark', reason: 'Desktop app. Extension marketplace has some API but not agent-facing' },
  { project: 'Supabase', stars: '75K', score: 69, tier: 'Silver', reason: 'Hosted API, REST + GraphQL, docs, auth, MCP server, agent-card.json' },
  { project: 'Vercel', stars: '13K (Next.js)', score: 69, tier: 'Silver', reason: 'Hosted platform, REST API, OAuth, CLI, structured docs' },
]

const agentReadyOSSCapabilities = [
  {
    name: 'Hosted API Endpoint',
    description: 'A live, callable endpoint that agents can hit without cloning a repo or starting a server. Most OSS projects are libraries or frameworks — you download and run them locally. Agent-ready means there is a hosted URL that accepts requests and returns structured responses.',
    hasIt: 'Supabase, Vercel, GitHub',
    lacksIt: 'Linux, React, PostgreSQL, Django',
    icon: Server,
  },
  {
    name: 'Structured API Documentation',
    description: 'Beyond README files and tutorials — machine-readable API specs like OpenAPI, structured endpoint listings, typed request/response schemas. READMEs teach humans. API specs teach agents.',
    hasIt: 'GitHub, Stripe, Supabase',
    lacksIt: 'Most OSS: docs are tutorials, not API specs',
    icon: FileText,
  },
  {
    name: 'Auth System',
    description: 'API keys, OAuth, or tokens that let agents authenticate programmatically. Open source projects that you self-host have whatever auth you configure. Agent-ready services have a standard auth flow that agents can complete without human intervention.',
    hasIt: 'GitHub OAuth, Supabase API keys, Vercel tokens',
    lacksIt: 'Self-hosted OSS: auth is your problem',
    icon: Shield,
  },
  {
    name: 'Pricing or Sponsorship API',
    description: 'An endpoint that returns pricing tiers, sponsorship options, or support plans as structured data. Open source is free to use, but agent-ready means the business model is machine-readable — whether that is a hosted tier, enterprise support, or GitHub Sponsors.',
    hasIt: 'GitHub Sponsors API, Vercel pricing page (semi-structured)',
    lacksIt: 'Most OSS: "it is free" with no structured pricing data',
    icon: DollarSign,
  },
  {
    name: 'Release and Changelog Endpoint',
    description: 'Structured release notes, version history, and migration guides that agents can query. GitHub has releases API, but most projects dump changelogs as markdown files in the repo root.',
    hasIt: 'GitHub Releases API, npm registry',
    lacksIt: 'Most OSS: CHANGELOG.md in repo root',
    icon: GitBranch,
  },
]

const misconceptions = [
  {
    myth: '"Open source is inherently more agent-friendly because the code is public"',
    reality: 'Agents do not read source code to use a service. They call APIs. Public code is irrelevant if there is no hosted endpoint, no structured docs, and no auth system. A closed-source SaaS with a good API scores higher than an open-source project with no API.',
  },
  {
    myth: '"More GitHub stars means more agent-ready"',
    reality: 'GitHub stars measure human developer interest, not agent accessibility. Linux has 185K stars and scores 8. Supabase has 75K stars and scores 69. Stars correlate with popularity, not with structured API availability.',
  },
  {
    myth: '"If the docs are good, agents can use it"',
    reality: 'Good documentation helps humans learn. Agent readiness requires machine-readable interfaces — API endpoints, JSON schemas, OpenAPI specs, MCP tools. A beautifully written tutorial is invisible to an agent looking for a callable endpoint.',
  },
  {
    myth: '"Open source projects don\'t need agent readiness because they\'re free"',
    reality: 'Free does not mean accessible. An agent cannot "use React" the way a developer does — by installing it and writing code. An agent needs to call an endpoint and get a response. The projects that have converted their open-source core into hosted services (Supabase, Vercel, GitLab) are the ones that score.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Can an open source project with no hosted service become agent-ready?',
    answer:
      'Only if someone hosts it as a service. PostgreSQL the database scores near zero. Supabase (hosted PostgreSQL + REST API + auth) scores 69. The open-source code is the foundation, but agent readiness requires a live, callable service layer on top. Projects can achieve this through official hosted offerings, community-run instances, or platforms like AgentHermes that host MCP servers on top of existing tools.',
  },
  {
    question: 'Why does GitHub itself score high but most GitHub-hosted projects score low?',
    answer:
      'GitHub is a hosted platform with a comprehensive REST and GraphQL API, OAuth, webhooks, and structured data endpoints. It is a service. The projects hosted on GitHub are source code repositories — they are not services. GitHub made itself agent-ready. The projects on GitHub mostly have not. The distinction is platform vs code.',
  },
  {
    question: 'Should open source projects care about agent readiness?',
    answer:
      'If they want to be used by AI agents, yes. The projects that have hosted services (Supabase, Vercel, GitLab) are already seeing agent-driven usage. AI coding assistants query GitHub APIs, deployment agents use Vercel APIs, database agents use Supabase APIs. Projects without hosted services are used only by human developers who manually install them. As AI agents become primary consumers of developer tools, the projects without API surfaces will lose adoption to those that have them.',
  },
  {
    question: 'What is the fastest way for an OSS project to become agent-ready?',
    answer:
      'Three things: (1) Host a public API endpoint — even a simple REST wrapper around your core functionality. (2) Publish structured API documentation — OpenAPI spec, not just a README. (3) Create agent discovery files — agent-card.json and llms.txt at minimum. An MCP server for your project\'s core operations is the gold standard. These three steps can take a project from score 8 to score 40+ in a week.',
  },
  {
    question: 'Does having an npm or PyPI package count as agent-ready?',
    answer:
      'Package registries provide structured metadata — version, dependencies, downloads, description. This is better than nothing. npm and PyPI APIs return structured JSON, so an agent can discover and evaluate packages. But installing a package is a human developer action. Agent readiness means the functionality is callable via API without installation. A package on npm scores roughly 10 to 15 for its registry metadata. A hosted service with the same functionality scores 40 to 70.',
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

export default function OpenSourceAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Open Source and Agent Readiness: Why GitHub Stars Don\'t Predict Agent Readiness Scores',
    description:
      'Open source projects have public code but not necessarily agent-ready APIs. GitHub stars measure popularity, not agent accessibility.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/open-source-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'open source agent readiness, GitHub stars agent readiness, OSS API, developer tools agent economy',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Open Source Agent Readiness',
          item: 'https://agenthermes.ai/blog/open-source-agent-readiness',
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
      title="Open Source and Agent Readiness: Why GitHub Stars Don't Predict Agent Readiness Scores"
      shareUrl="https://agenthermes.ai/blog/open-source-agent-readiness"
      currentHref="/blog/open-source-agent-readiness"
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
            <span className="text-zinc-400">Open Source Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              <Braces className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Open Source
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Open Source and Agent Readiness:{' '}
            <span className="text-emerald-400">Why GitHub Stars Don&apos;t Predict Agent Readiness Scores</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Open source projects have public code. That does not make them agent-ready.{' '}
            <strong className="text-zinc-100">Visible code is not the same as usable by agents.</strong>{' '}
            A project with 200K GitHub stars and no hosted API scores lower than a closed-source SaaS
            with a documented REST endpoint. The distinction matters: agents call APIs, they do not
            clone repositories.
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
                  12 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE CORE DISTINCTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            Open Source Does Not Equal Agent Ready
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The open source movement is built on a principle:{' '}
              <strong className="text-zinc-100">code should be visible, modifiable, and shareable</strong>.
              This is a powerful idea for human developers. You can read the source, understand how it
              works, fork it, improve it, and contribute back. Open source has produced the operating
              systems, databases, frameworks, and tools that run the modern internet.
            </p>
            <p>
              But AI agents are not human developers. An agent does not read source code to understand
              how a service works. An agent discovers an API endpoint, reads its schema, authenticates,
              and makes requests. The entire interaction is:{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                discover → authenticate → call → parse response
              </code>. None of those steps require or benefit from public source code.
            </p>
            <p>
              This creates a counterintuitive reality: <strong className="text-zinc-100">the most
              popular open source projects in the world score near zero on agent readiness</strong>,
              while hosted services built on top of them score in the 60s and 70s. Linux powers half
              the internet and scores 8. Supabase (hosted PostgreSQL) scores 69.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '185K', label: 'Linux stars (score: 8)', icon: Star },
              { value: '230K', label: 'React stars (score: 12)', icon: Star },
              { value: '75K', label: 'Supabase stars (score: 69)', icon: Star },
              { value: '0', label: 'Correlation', icon: BarChart3 },
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

      {/* ===== PROJECT SCORE TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Open Source Projects: Stars vs Agent Readiness
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We scored popular open source projects on their agent readiness. The pattern is clear:
            projects with hosted services score. Projects that are code-only do not.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Project</div>
              <div className="text-center">Stars</div>
              <div className="text-center">Score</div>
              <div className="text-center">Tier</div>
              <div>Why</div>
            </div>
            {ossProjects.map((row, i) => (
              <div
                key={row.project}
                className={`grid grid-cols-5 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.project}</div>
                <div className="text-center text-zinc-400">{row.stars}</div>
                <div className={`text-center font-bold ${row.score >= 40 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {row.score}
                </div>
                <div className={`text-center ${row.score >= 60 ? 'text-emerald-400' : row.score >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
                  {row.tier}
                </div>
                <div className="text-zinc-500 text-xs">{row.reason}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-cyan-400">The hosted service gap:</strong> The four lowest-scoring
              projects (Linux, React, PostgreSQL, VS Code) are all{' '}
              <strong className="text-zinc-100">code you download and run locally</strong>. The two
              highest-scoring (Supabase, Vercel) are{' '}
              <strong className="text-zinc-100">hosted platforms with APIs</strong>. Open source is the
              foundation, but the API layer is what makes it agent-ready.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT MAKES OSS AGENT-READY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-500" />
            Five Capabilities That Make Open Source Agent-Ready
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An agent interacting with an OSS project needs these five things. Most projects have
            zero of them.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyOSSCapabilities.map((cap) => (
              <div
                key={cap.name}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <cap.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">{cap.name}</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{cap.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-xs text-emerald-400 font-medium mb-1">Has It</p>
                    <p className="text-xs text-zinc-300">{cap.hasIt}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                    <p className="text-xs text-red-400 font-medium mb-1">Lacks It</p>
                    <p className="text-xs text-zinc-500">{cap.lacksIt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISCONCEPTIONS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Four Misconceptions About Open Source and Agent Readiness
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The open source community has strong intuitions about accessibility and openness. Some of
            those intuitions do not map to agent readiness.
          </p>

          <div className="space-y-4 mb-8">
            {misconceptions.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="text-base font-bold text-red-400 mb-2">{item.myth}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.reality}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The overarching misconception is that openness equals accessibility. In the human
              developer world, this is true — public code is accessible code. In the agent world,
              accessibility means something different:{' '}
              <strong className="text-zinc-100">a live endpoint that accepts structured requests and
              returns structured responses</strong>. Public source code is irrelevant to that equation.
            </p>
            <p>
              As our{' '}
              <Link href="/blog/github-agent-readiness-breakdown" className="text-emerald-400 hover:text-emerald-300 underline">
                GitHub agent readiness breakdown
              </Link>{' '}
              shows, GitHub itself scores high because it is a platform with APIs — not because its
              code is open source. The lesson: being a service matters more than being open.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE PATH FORWARD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            How OSS Projects Can Become Agent-Ready
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The good news: open source projects have a natural advantage. Their code is already
              public, their communities are engaged, and many already have contributor documentation.
              Converting that into agent readiness requires adding a service layer.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Host a public API endpoint',
                detail: 'Wrap your core functionality in a REST or GraphQL API and host it. Even a simple read-only API that returns project metadata, releases, and contributor stats is a starting point. Cloud functions make this cheap — a single endpoint on Vercel or AWS Lambda costs pennies per month.',
                icon: Server,
              },
              {
                step: '2',
                title: 'Publish an OpenAPI spec',
                detail: 'Convert your API documentation from markdown to OpenAPI 3.0+. This is the machine-readable format that agents use to discover and understand your endpoints. Tools like Swagger auto-generate specs from your code.',
                icon: FileText,
              },
              {
                step: '3',
                title: 'Create an MCP server',
                detail: 'Build an MCP server that wraps your API in agent-native tools. A project management OSS could expose create_issue(), list_releases(), and search_docs() as MCP tools. This is the highest-value step — it makes your project directly usable by AI agents.',
                icon: Network,
              },
              {
                step: '4',
                title: 'Add agent discovery files',
                detail: 'Publish agent-card.json and llms.txt at your hosted domain root. These files tell agents what your project does, what tools it offers, and how to connect. Think of them as robots.txt for AI agents.',
                icon: Globe,
              },
              {
                step: '5',
                title: 'Register in agent directories',
                detail: 'List your project in agent registries like the AgentHermes registry. This is the agent economy equivalent of submitting your site to Google — it makes you discoverable by agents that are searching for capabilities in your category.',
                icon: Users,
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

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The developer tools advantage:</strong> OSS projects
              in the{' '}
              <Link href="/blog/developer-tools-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                developer tools category
              </Link>{' '}
              have the highest potential for agent readiness because their users are already
              programmatic. A database tool, a CI/CD system, or a monitoring platform — these are
              tools that developers interact with through APIs anyway. Adding an agent layer is a
              natural extension, not a fundamental change.
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
                title: 'GitHub Agent Readiness Breakdown',
                href: '/blog/github-agent-readiness-breakdown',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'Developer Tools Agent Readiness',
                href: '/blog/developer-tools-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
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
            Is your project visible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            GitHub stars tell you how many humans know about your project. Agent Readiness Score
            tells you how many AI agents can use it. Find out the difference.
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
