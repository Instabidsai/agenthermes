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
  FileCode2,
  FileSpreadsheet,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Network,
  Search,
  Server,
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
  title: 'API Documentation Standards for Agent Readiness: OpenAPI vs AsyncAPI vs Smithy vs RAML | AgentHermes',
  description:
    'Head-to-head comparison of 4 API description standards through the agent readiness lens. OpenAPI, AsyncAPI, Smithy, and RAML evaluated on discoverability, tooling, and agent compatibility. Data from scanning 500+ businesses.',
  keywords: [
    'API documentation standards comparison agents',
    'OpenAPI vs AsyncAPI',
    'Smithy vs RAML',
    'API documentation agent readiness',
    'OpenAPI agent discovery',
    'AsyncAPI webhooks agents',
    'API spec comparison',
    'MCP API documentation',
    'agent API compatibility',
  ],
  openGraph: {
    title: 'API Documentation Standards for Agent Readiness: OpenAPI vs AsyncAPI vs Smithy vs RAML',
    description:
      'Four API standards, one question: which one makes your API most discoverable and usable by AI agents? Data from 500+ scans.',
    url: 'https://agenthermes.ai/blog/api-documentation-standards',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'API Documentation Standards for Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Documentation Standards for Agent Readiness: OpenAPI vs AsyncAPI vs Smithy vs RAML',
    description:
      'OpenAPI vs AsyncAPI vs Smithy vs RAML for agent readiness. Which spec helps AI agents discover and use your API?',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/api-documentation-standards',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const standards = [
  {
    name: 'OpenAPI (Swagger)',
    version: '3.1',
    creator: 'OpenAPI Initiative (Linux Foundation)',
    format: 'YAML/JSON',
    focus: 'RESTful HTTP APIs',
    adoption: 'Dominant — used by Stripe, Twilio, GitHub, and most public APIs',
    agentD1: 95,
    agentD2: 90,
    agentD9: 88,
    overall: 91,
    verdict: 'Best for Day 1 agent readiness. Most AI frameworks auto-ingest OpenAPI specs.',
    color: 'emerald',
  },
  {
    name: 'AsyncAPI',
    version: '3.0',
    creator: 'AsyncAPI Initiative',
    format: 'YAML/JSON',
    focus: 'Event-driven, WebSocket, Kafka, MQTT APIs',
    adoption: 'Growing — strong in fintech streaming, IoT, and real-time services',
    agentD1: 45,
    agentD2: 75,
    agentD9: 60,
    overall: 58,
    verdict: 'Essential for webhook-heavy services. Complements OpenAPI, does not replace it.',
    color: 'blue',
  },
  {
    name: 'Smithy',
    version: '2.0',
    creator: 'Amazon Web Services',
    format: 'Custom IDL (.smithy)',
    focus: 'Protocol-agnostic API modeling',
    adoption: 'Niche — primarily AWS services and Amazon internal tooling',
    agentD1: 25,
    agentD2: 70,
    agentD9: 35,
    overall: 38,
    verdict: 'Powerful modeling language but minimal agent ecosystem support today.',
    color: 'amber',
  },
  {
    name: 'RAML',
    version: '1.0',
    creator: 'MuleSoft (Salesforce)',
    format: 'YAML',
    focus: 'RESTful API design and documentation',
    adoption: 'Declining — concentrated in MuleSoft/Salesforce ecosystem',
    agentD1: 20,
    agentD2: 55,
    agentD9: 30,
    overall: 32,
    verdict: 'Legacy standard. Convert to OpenAPI for agent readiness.',
    color: 'red',
  },
]

const dimensionComparison = [
  {
    dimension: 'D1 Discovery',
    description: 'Can agents automatically find and parse the spec?',
    openapi: 'Auto-discovered at /openapi.json or /swagger.json. Most agent frameworks support it natively.',
    asyncapi: 'No standard discovery path. Agents must be told where to find it.',
    smithy: 'Requires build step to generate. Not discoverable at a URL.',
    raml: 'Usually at /api.raml but almost no agent framework parses RAML directly.',
  },
  {
    dimension: 'D2 API Quality',
    description: 'Does the spec fully describe request/response schemas?',
    openapi: 'Full JSON Schema support, examples, required fields, enum values. Gold standard.',
    asyncapi: 'Same JSON Schema support for message payloads. Strong for event contracts.',
    smithy: 'Strong type system with traits, validators, and constraints. Excellent modeling.',
    raml: 'Type system with inheritance. Decent but less tooling support for validation.',
  },
  {
    dimension: 'D9 Agent Experience',
    description: 'Can an agent generate working code from the spec alone?',
    openapi: '50+ code generators. ChatGPT, Claude, and Cursor all generate from OpenAPI natively.',
    asyncapi: 'Code generators exist but are less mature. Few AI tools auto-ingest AsyncAPI.',
    smithy: 'AWS SDK generators work. Outside AWS ecosystem, almost no agent tooling.',
    raml: 'MuleSoft tooling only. No major AI agent framework supports RAML directly.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Should I use OpenAPI even if I have WebSocket endpoints?',
    answer:
      'Yes — use OpenAPI for your REST endpoints and AsyncAPI for your WebSocket/event endpoints. They are complementary, not competing. An agent-ready service with both gets higher D1 and D2 scores because agents can discover REST tools via OpenAPI and subscribe to real-time events via AsyncAPI. Publish both specs at well-known URLs.',
  },
  {
    question: 'We use Smithy internally at AWS. Does that hurt our agent readiness?',
    answer:
      'Smithy is an excellent API modeling language — the issue is agent discoverability. Most AI agent frameworks cannot parse .smithy files directly. The fix is simple: use Smithy internally for modeling and governance, but publish an OpenAPI spec alongside it for agent consumption. Smithy has built-in OpenAPI conversion. Run it as part of your CI pipeline.',
  },
  {
    question: 'Is RAML dead?',
    answer:
      'Not dead, but no longer evolving. MuleSoft still supports it, and existing RAML specs work fine within the Salesforce ecosystem. But for agent readiness, RAML is a liability — zero major AI frameworks auto-discover or parse RAML. If you have RAML specs today, convert them to OpenAPI 3.1. Tools like oas-raml-converter handle this automatically.',
  },
  {
    question: 'How does AgentHermes detect API documentation standards?',
    answer:
      'The AgentHermes scanner checks well-known paths (/openapi.json, /swagger.json, /api-docs, /asyncapi.json) and probes response headers for content-type hints. It also follows links from llms.txt, agent-card.json, and HTML meta tags. OpenAPI detection contributes directly to D1 Discovery and D2 API Quality scores. AsyncAPI detection is a D2 bonus.',
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

export default function ApiDocumentationStandardsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'API Documentation Standards for Agent Readiness: OpenAPI vs AsyncAPI vs Smithy vs RAML',
    description:
      'Head-to-head comparison of four API description standards through the agent readiness lens. Which spec makes your API most discoverable and usable by AI agents?',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/api-documentation-standards',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1850,
    keywords:
      'API documentation standards comparison, OpenAPI agent readiness, AsyncAPI vs OpenAPI, Smithy RAML agent, API spec comparison',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'API Documentation Standards',
          item: 'https://agenthermes.ai/blog/api-documentation-standards',
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
      title="API Documentation Standards for Agent Readiness: OpenAPI vs AsyncAPI vs Smithy vs RAML"
      shareUrl="https://agenthermes.ai/blog/api-documentation-standards"
      currentHref="/blog/api-documentation-standards"
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
            <span className="text-zinc-400">API Documentation Standards</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              <FileSpreadsheet className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Head-to-Head Comparison
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            API Documentation Standards for Agent Readiness:{' '}
            <span className="text-emerald-400">OpenAPI vs AsyncAPI vs Smithy vs RAML</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Your API documentation format directly determines whether AI agents can discover, understand,
            and use your service. We evaluated four API description standards through the lens of agent
            readiness — scoring each on <strong className="text-zinc-100">D1 Discovery</strong>,{' '}
            <strong className="text-zinc-100">D2 API Quality</strong>, and{' '}
            <strong className="text-zinc-100">D9 Agent Experience</strong>. The results are not even close.
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

      {/* ===== WHY IT MATTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Why Your API Spec Format Matters for Agent Readiness
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When an AI agent encounters your service for the first time, it needs to answer three
              questions in seconds: What can this API do? What parameters does each endpoint need?
              What will it return? The answers to these questions come from your API documentation spec —
              and the format of that spec determines whether the agent can parse it at all.
            </p>
            <p>
              From our{' '}
              <Link href="/blog/openapi-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                analysis of OpenAPI adoption
              </Link>{' '}
              across 500+ businesses, we know that the presence of a machine-readable API spec is one of
              the strongest predictors of a high Agent Readiness Score. Businesses with a published OpenAPI
              spec average 52 on ARS. Businesses without any spec average 23. But not all specs are created equal.
            </p>
            <p>
              Four standards dominate the API documentation landscape: <strong className="text-zinc-100">OpenAPI</strong> (formerly Swagger),{' '}
              <strong className="text-zinc-100">AsyncAPI</strong>,{' '}
              <strong className="text-zinc-100">Smithy</strong>, and{' '}
              <strong className="text-zinc-100">RAML</strong>. Each was designed for different use cases,
              and each has radically different implications for how AI agents interact with your service.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORECARD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            Agent Readiness Scorecard: Four Standards Compared
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Each standard scored on three agent-critical dimensions: D1 Discovery (can agents find it?),
            D2 API Quality (can agents understand it?), and D9 Agent Experience (can agents use it to
            generate working code?).
          </p>

          <div className="space-y-4 mb-8">
            {standards.map((std) => {
              const colors = getColorClasses(std.color)
              return (
                <div
                  key={std.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{std.name}</h3>
                      <p className="text-xs text-zinc-500">v{std.version} | {std.creator} | {std.format}</p>
                    </div>
                    <div className={`text-2xl font-bold ${colors.text}`}>{std.overall}</div>
                  </div>

                  <p className="text-sm text-zinc-500 mb-3">
                    <strong className="text-zinc-400">Focus:</strong> {std.focus}
                  </p>
                  <p className="text-sm text-zinc-500 mb-3">
                    <strong className="text-zinc-400">Adoption:</strong> {std.adoption}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {[
                      { label: 'D1 Discovery', score: std.agentD1 },
                      { label: 'D2 API Quality', score: std.agentD2 },
                      { label: 'D9 Agent Exp', score: std.agentD9 },
                    ].map((dim) => (
                      <div key={dim.label} className="p-2 rounded-lg bg-zinc-800/50 text-center">
                        <div className="text-xs text-zinc-500 mb-1">{dim.label}</div>
                        <div className={`text-sm font-bold ${
                          dim.score >= 80 ? 'text-emerald-400' :
                          dim.score >= 50 ? 'text-amber-400' : 'text-red-400'
                        }`}>{dim.score}/100</div>
                      </div>
                    ))}
                  </div>

                  <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                    <p className={`text-xs ${colors.text}`}>
                      <strong>Verdict:</strong> {std.verdict}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== DIMENSION DEEP DIVE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Dimension-by-Dimension Breakdown
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            How each standard performs on the three dimensions that matter most for agent interaction.
          </p>

          <div className="space-y-6 mb-8">
            {dimensionComparison.map((dim) => (
              <div key={dim.dimension} className="rounded-xl border border-zinc-800/80 overflow-hidden">
                <div className="bg-zinc-800/50 p-4">
                  <h3 className="text-base font-bold text-zinc-100">{dim.dimension}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{dim.description}</p>
                </div>
                <div className="divide-y divide-zinc-800/50">
                  {[
                    { name: 'OpenAPI', text: dim.openapi, color: 'emerald' },
                    { name: 'AsyncAPI', text: dim.asyncapi, color: 'blue' },
                    { name: 'Smithy', text: dim.smithy, color: 'amber' },
                    { name: 'RAML', text: dim.raml, color: 'red' },
                  ].map((item) => {
                    const colors = getColorClasses(item.color)
                    return (
                      <div key={item.name} className="p-4 flex gap-3">
                        <span className={`shrink-0 text-xs font-bold ${colors.text} w-16`}>{item.name}</span>
                        <span className="text-sm text-zinc-400">{item.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE RECOMMENDATION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            The Recommendation: OpenAPI First, AsyncAPI Second
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              For agent readiness, the recommendation is clear:{' '}
              <strong className="text-zinc-100">publish an OpenAPI 3.1 spec</strong> for your REST API.
              If you also have event-driven endpoints (WebSockets, webhooks, message queues), add an
              AsyncAPI spec alongside it. This combination covers the vast majority of agent interaction patterns.
            </p>
            <p>
              Smithy and RAML have legitimate use cases — Smithy for internal API governance at scale,
              RAML within the MuleSoft ecosystem — but neither helps agents discover or use your service.
              If you are currently using either, maintain it internally but generate an OpenAPI spec as
              your public, agent-facing documentation. Both Smithy and RAML have conversion tools that
              automate this.
            </p>
            <p>
              The agent readiness impact is immediate. When AgentHermes scans a business and finds an
              OpenAPI spec at a well-known URL, D1 Discovery jumps by 15 to 25 points. D2 API Quality
              increases based on the completeness of the spec — schemas, examples, descriptions, and
              error codes all contribute. The{' '}
              <Link href="/blog/documentation-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                documentation dimension
              </Link>{' '}
              alone can move a business from Bronze to Silver tier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="text-sm font-bold text-emerald-400 mb-2">Do This</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  Publish OpenAPI 3.1 at /openapi.json
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  Add AsyncAPI for webhook/WebSocket endpoints
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  Include examples for every endpoint
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  Link spec from agent-card.json and llms.txt
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
              <h3 className="text-sm font-bold text-red-400 mb-2">Avoid This</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  Publishing only RAML or Smithy without OpenAPI
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  Using Swagger 2.0 (upgrade to OpenAPI 3.1)
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  Generating specs without descriptions or examples
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  Hiding your spec behind authentication
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW AGENTHERMES DETECTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-purple-500" />
            How AgentHermes Detects and Scores API Documentation
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The AgentHermes scanner probes 12 well-known paths during every scan, including{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/openapi.json</code>,{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/swagger.json</code>,{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/api-docs</code>, and{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/asyncapi.json</code>.
              The scanner validates the spec structure, counts documented endpoints, checks for schema
              completeness, and factors everything into D1 and D2 scores.
            </p>
            <p>
              Across 500+ scans, here is what we found: 34% of businesses with public APIs publish an
              OpenAPI spec. 3% publish AsyncAPI. Zero publish Smithy or RAML at a discoverable URL.
              The{' '}
              <Link href="/blog/graphql-vs-rest-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                GraphQL vs REST comparison
              </Link>{' '}
              shows a similar pattern — introspection-enabled GraphQL endpoints score well on D2 but
              lag on D1 because agents default to REST discovery patterns.
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
                title: 'OpenAPI and Agent Readiness',
                href: '/blog/openapi-agent-readiness',
                tag: 'Technical',
                tagColor: 'cyan',
              },
              {
                title: 'Documentation and Agent Readiness',
                href: '/blog/documentation-agent-readiness',
                tag: 'Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'GraphQL vs REST for Agent Readiness',
                href: '/blog/graphql-vs-rest-agent-readiness',
                tag: 'Comparison',
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
            Is your API documentation agent-ready?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan. AgentHermes detects your API spec format, evaluates
            completeness, and scores you across all 9 dimensions. See exactly what agents see when
            they find your service.
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
