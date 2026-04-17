import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  BookText,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileCode,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Search,
  Server,
  Sparkles,
  TrendingUp,
  XCircle,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'API Documentation and Agent Readiness: Why Mintlify Scores 66 and ReadMe Doesn\'t | AgentHermes',
  description:
    'Documentation tools have varying agent readiness. Mintlify scores 66 Silver because it is built for developer consumption. But most businesses have terrible API docs. Learn what agents need from documentation and how it impacts your score.',
  keywords: [
    'API documentation agent readiness',
    'Mintlify agent readiness',
    'API docs for AI agents',
    'OpenAPI documentation',
    'developer documentation agent',
    'API documentation best practices',
    'agent readiness documentation',
    'Swagger agent readiness',
    'documentation MCP server',
    'API docs score',
  ],
  openGraph: {
    title: 'API Documentation and Agent Readiness: Why Mintlify Scores 66 and ReadMe Doesn\'t',
    description:
      'Documentation quality directly impacts agent readiness. Mintlify 66 Silver. Most businesses: outdated Swagger, broken examples, no error codes. Here is what agents need from your docs.',
    url: 'https://agenthermes.ai/blog/documentation-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'API Documentation and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Documentation and Agent Readiness: Why Mintlify Scores 66 and ReadMe Doesn\'t',
    description:
      'Documentation tools have varying agent readiness. Mintlify scores 66. Most businesses have terrible API docs. What agents actually need from documentation.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/documentation-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const docPlatformScores = [
  { name: 'Mintlify', score: 66, tier: 'Silver', strengths: 'OpenAPI rendering, structured nav, LLM-friendly', color: 'emerald' },
  { name: 'GitBook', score: 58, tier: 'Bronze', strengths: 'API blocks, versioned docs, search API', color: 'amber' },
  { name: 'Docusaurus', score: 52, tier: 'Bronze', strengths: 'Open source, plugin ecosystem, SSG', color: 'amber' },
  { name: 'ReadMe', score: 47, tier: 'Bronze', strengths: 'Try-it console, but heavy JS rendering', color: 'amber' },
  { name: 'Notion (as docs)', score: 22, tier: 'Not Scored', strengths: 'Human-friendly but agent-hostile', color: 'red' },
  { name: 'Google Docs / PDF', score: 8, tier: 'Not Scored', strengths: 'No structure, no API, not crawlable', color: 'red' },
]

const whatAgentsNeed = [
  {
    need: 'Current OpenAPI spec',
    why: 'Agents auto-generate client libraries from OpenAPI. Outdated specs mean broken calls.',
    dimension: 'D2 API Quality (0.15)',
    icon: FileCode,
    color: 'emerald',
  },
  {
    need: 'Example requests and responses',
    why: 'Agents learn by example. A request/response pair teaches more than paragraphs of description.',
    dimension: 'D6 Data Quality (0.10)',
    icon: Code2,
    color: 'blue',
  },
  {
    need: 'Error code reference',
    why: 'Agents need to know what 422 with code "invalid_amount" means and how to fix it. Error tables are critical.',
    dimension: 'D6 Data Quality (0.10)',
    icon: XCircle,
    color: 'red',
  },
  {
    need: 'Authentication guide',
    why: 'How to get a token, what scopes exist, where to pass the Bearer header. Agents cannot guess auth flows.',
    dimension: 'D7 Security (0.12)',
    icon: Server,
    color: 'purple',
  },
  {
    need: 'Changelog with dates',
    why: 'Agents need to know if the API changed since they last cached the schema. Breaking changes without changelogs cause silent failures.',
    dimension: 'D8 Reliability (0.13)',
    icon: FileText,
    color: 'amber',
  },
]

const antiPatterns = [
  {
    pattern: 'PDF-only documentation',
    score_impact: '-15 to -25 points',
    why: 'Agents cannot parse PDF layouts. Every endpoint description, parameter, and example is invisible.',
  },
  {
    pattern: 'Swagger UI with no OpenAPI file link',
    score_impact: '-8 to -12 points',
    why: 'Swagger UI renders the spec visually but many deployments do not expose the raw JSON/YAML. Agents need the file, not the UI.',
  },
  {
    pattern: 'Outdated examples with deprecated endpoints',
    score_impact: '-5 to -10 points',
    why: 'Agents follow examples literally. If the example calls /v1/users but the API is now /v2/users, the agent gets a 404 and moves on to a competitor.',
  },
  {
    pattern: '"Contact us for API docs"',
    score_impact: 'Caps at 29',
    why: 'If documentation requires a sales call, agents cannot discover any endpoints. D2 and D3 both score zero. The hard cap at 29 applies.',
  },
  {
    pattern: 'JavaScript-rendered docs with no SSR',
    score_impact: '-5 to -8 points',
    why: 'Client-rendered documentation pages return empty HTML to crawlers and agents. If the content only appears after JavaScript execution, agents see a blank page.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Does documentation quality really affect my Agent Readiness Score?',
    answer:
      'Yes. Documentation directly impacts D2 API Quality (0.15 weight) and D6 Data Quality (0.10 weight), which together account for 25% of your score. A published OpenAPI spec with examples and error codes can add 10-15 points. Missing documentation caps multiple dimensions.',
  },
  {
    question: 'Why does Mintlify score higher than ReadMe?',
    answer:
      'Mintlify generates static HTML with structured content that agents can crawl directly. It renders OpenAPI specs inline with clear endpoint grouping and example blocks. ReadMe relies more heavily on client-side JavaScript rendering, which means some content is invisible to agents that do not execute JS. Mintlify also ships with better default SEO and schema markup.',
  },
  {
    question: 'Is Swagger UI enough for agent readiness?',
    answer:
      'Swagger UI is a good start but not sufficient. The key is whether you also expose the raw OpenAPI spec file at a predictable URL like /openapi.json or /api-docs. Many Swagger UI deployments render the spec visually but do not link to the downloadable file. Agents need the raw spec, not the rendered UI.',
  },
  {
    question: 'What if my documentation is in Notion?',
    answer:
      'Notion-hosted documentation scores very low for agent readiness. Notion pages are rendered client-side, require authentication for private pages, have no OpenAPI spec, and lack structured API metadata. If your docs are in Notion, the fastest fix is to export them to a static documentation platform like Mintlify or Docusaurus and add an OpenAPI spec.',
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

export default function DocumentationAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'API Documentation and Agent Readiness: Why Mintlify Scores 66 and ReadMe Doesn\'t',
    description:
      'Documentation tools have varying agent readiness. Mintlify scores 66 Silver. Most businesses have terrible API docs. What agents need from documentation and how it impacts score.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/documentation-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'API documentation agent readiness, Mintlify, OpenAPI documentation, developer documentation agent, API docs score',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Documentation Agent Readiness',
          item: 'https://agenthermes.ai/blog/documentation-agent-readiness',
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
      title="API Documentation and Agent Readiness: Why Mintlify Scores 66 and ReadMe Doesn't"
      shareUrl="https://agenthermes.ai/blog/documentation-agent-readiness"
      currentHref="/blog/documentation-agent-readiness"
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
            <span className="text-zinc-400">Documentation Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <BookText className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Documentation
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            API Documentation and Agent Readiness:{' '}
            <span className="text-emerald-400">Why Mintlify Scores 66 and ReadMe Doesn&apos;t</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Documentation is the bridge between an API and an AI agent. When documentation is
            structured, current, and machine-readable, agents can self-teach your API in seconds.
            When it is a stale PDF or a JavaScript-rendered page that returns blank HTML,{' '}
            <strong className="text-zinc-100">agents see nothing</strong>. Documentation tools
            themselves have wildly different agent readiness — and the platform you choose directly
            impacts your score.
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

      {/* ===== THE DOCUMENTATION DIVIDE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            The Documentation Divide: Platform Scores
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Documentation platforms are an interesting test case for agent readiness because they are
              built to make technical information accessible. You would expect them to score well. Some
              do. Most do not. The gap between the best and worst documentation tools is 58 points — nearly
              the same range as the entire 500-business scan.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Platform</div>
              <div className="text-center">Score</div>
              <div className="text-center">Tier</div>
              <div>Key Strengths</div>
            </div>
            {docPlatformScores.map((row, i) => {
              const colors = getColorClasses(row.color)
              return (
                <div
                  key={row.name}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.name}</div>
                  <div className={`text-center font-bold ${colors.text}`}>{row.score}</div>
                  <div className="text-center text-zinc-400">{row.tier}</div>
                  <div className="text-zinc-500">{row.strengths}</div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Mintlify leads at 66 Silver because it was designed with machine-readability as a
              first-class concern. It generates static HTML, renders OpenAPI specs inline with
              structured navigation, exposes endpoint metadata in crawlable format, and ships with
              SEO and schema markup out of the box. When an agent crawls a Mintlify-powered docs
              site, it finds everything it needs without executing JavaScript.
            </p>
            <p>
              The drop-off from there is steep. GitBook and Docusaurus are solid Bronze performers
              because they also generate static content but lack Mintlify&apos;s OpenAPI-first
              approach. ReadMe falls behind because it renders content client-side — agents that do
              not execute JavaScript see empty pages. And Notion, increasingly used as a documentation
              platform, is essentially invisible to agents.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENTS NEED ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-emerald-500" />
            Five Things Agents Need From Your Documentation
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Agents read documentation differently than developers. They do not browse — they extract.
            They need five specific types of information, each mapping to a scoring dimension.
          </p>

          <div className="space-y-4 mb-8">
            {whatAgentsNeed.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.need}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{item.need}</h3>
                      <span className={`text-xs ${colors.text}`}>{item.dimension}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.why}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Together, these five documentation elements directly impact D2 API Quality (0.15),
              D6 Data Quality (0.10), D7 Security (0.12), and D8 Reliability (0.13) — a combined
              50% of the Agent Readiness Score. Documentation is not a nice-to-have. It is{' '}
              <strong className="text-zinc-100">half your score</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE BUSINESS DOCS PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-amber-500" />
            The Business Documentation Problem
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Documentation platforms scoring 50-66 is encouraging. But those platforms are the
              exception. When we look at how actual businesses document their APIs, the picture
              collapses. Of 500 businesses scanned by AgentHermes:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '72%', label: 'No OpenAPI spec at all', icon: XCircle },
              { value: '45%', label: 'No public API docs', icon: FileText },
              { value: '31%', label: 'Stale docs (6mo+ outdated)', icon: Clock },
              { value: '18%', label: 'PDF-only documentation', icon: BookText },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className="h-5 w-5 text-red-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The issue is not that businesses lack APIs — many have internal APIs powering their
              mobile apps and web frontends. The issue is that those APIs are undocumented,
              undiscoverable, and assume a human will figure out the integration through trial and
              error. Agents do not figure things out through trial and error. They read structured
              documentation or they move on.
            </p>
            <p>
              AgentHermes checks documentation quality through two dimensions: D2 API Quality (0.15
              weight) evaluates whether an{' '}
              <Link href="/blog/openapi-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                OpenAPI spec
              </Link>{' '}
              exists and whether it is current, and D6 Data Quality (0.10 weight) checks for structured
              error responses, example payloads, and consistent data formats. A business can have a
              working API but still score poorly if agents cannot understand how to use it.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ANTI-PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Five Documentation Anti-Patterns That Kill Agent Readiness
          </h2>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Anti-Pattern</div>
              <div className="text-center">Score Impact</div>
              <div>Why It Hurts</div>
            </div>
            {antiPatterns.map((row, i) => (
              <div
                key={row.pattern}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.pattern}</div>
                <div className="text-center text-red-400 font-bold">{row.score_impact}</div>
                <div className="text-zinc-500">{row.why}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE FIX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Documentation Fix: From Zero to Agent-Readable in a Day
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Fixing documentation for agent readiness follows a specific order. Each step unlocks
              a scoring improvement, and the first three can be done in a single afternoon.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Publish an OpenAPI spec at a predictable URL',
                detail: 'Serve your spec at /openapi.json or /api-docs. This single file unlocks D2 API Quality. Tools like swagger-jsdoc or @asteasolutions/zod-to-openapi auto-generate specs from existing code. Cost: 2-4 hours. Score impact: +8 to +12 points.',
                icon: FileCode,
              },
              {
                step: '2',
                title: 'Add example requests and responses to every endpoint',
                detail: 'OpenAPI supports the "example" field on every parameter, request body, and response. Fill them in with realistic data. Agents use these to construct their first API call. Cost: 1-2 hours. Score impact: +3 to +5 points.',
                icon: Code2,
              },
              {
                step: '3',
                title: 'Document error codes in a structured table',
                detail: 'List every error code your API returns with its HTTP status, machine-readable code, human description, and suggested fix. Publish this as both a docs page and a JSON endpoint at /api/errors. Cost: 1 hour. Score impact: +2 to +4 points.',
                icon: Layers,
              },
              {
                step: '4',
                title: 'Ship an llms.txt file',
                detail: 'A simple markdown file at /llms.txt that describes your API, links to the OpenAPI spec, and provides a quick-start guide. Takes 15 minutes and directly boosts D1 Discovery. Cost: 15 minutes. Score impact: +2 to +3 points.',
                icon: FileText,
              },
              {
                step: '5',
                title: 'Generate an SDK from your spec',
                detail: 'Use openapi-generator or Speakeasy to produce typed client SDKs. Publish to npm/PyPI. Agents that find a ready-made SDK skip the API-learning step entirely. Cost: 1 hour. Score impact: +2 to +3 points.',
                icon: TrendingUp,
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
              <strong className="text-emerald-400">Total impact:</strong> Steps 1-5 can lift a
              business from zero documentation score to +17 to +27 points across D2, D6, D7, and
              D8. For a business currently at 30 (Not Scored), this alone pushes into Bronze. For
              one at 45 (Bronze), it can push into Silver. Documentation is the single highest-ROI
              fix for agent readiness because it impacts the most dimensions per hour of work. See
              also:{' '}
              <Link href="/blog/sdk-generation-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                auto-generated SDKs
              </Link>{' '}
              for the full D2 playbook.
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
                title: 'OpenAPI Specs Are the Single Biggest Factor in Agent Readiness',
                href: '/blog/openapi-agent-readiness',
                tag: 'Standards Deep Dive',
                tagColor: 'emerald',
              },
              {
                title: 'Auto-Generated SDKs: How OpenAPI Specs Let AI Agents Write Their Own Client Libraries',
                href: '/blog/sdk-generation-agent-readiness',
                tag: 'Technical Deep Dive',
                tagColor: 'purple',
              },
              {
                title: 'What Is Agent Readiness? The Complete Guide',
                href: '/blog/what-is-agent-readiness',
                tag: 'Complete Guide',
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
            How does your documentation score?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan and see exactly how your API documentation impacts
            your score across D2 API Quality and D6 Data Quality.
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
