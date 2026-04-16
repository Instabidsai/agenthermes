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
  FileCode,
  FileJson,
  FileText,
  HelpCircle,
  Layers,
  Lightbulb,
  Network,
  Search,
  Server,
  Settings,
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
  title: 'OpenAPI Specs Are the Single Biggest Factor in Agent Readiness (D2 = 15%) | AgentHermes',
  description:
    'D2 API Quality is weighted 0.15 — the highest of any Agent Readiness dimension. Companies with published OpenAPI specs consistently score 60+. Companies without hit a ceiling around 45. Here is why OpenAPI is the single biggest factor and how to add one.',
  keywords: [
    'openapi specification agent readiness',
    'swagger spec for agents',
    'openapi.json',
    'api documentation for AI agents',
    'openapi generator',
    'how to publish openapi',
    'D2 API quality',
    'agent-readable API',
  ],
  openGraph: {
    title: 'OpenAPI Specs Are the Single Biggest Factor in Agent Readiness',
    description:
      'D2 API Quality is weighted 0.15 — higher than security or reliability. OpenAPI-published = Silver. No OpenAPI = Bronze ceiling at 45.',
    url: 'https://agenthermes.ai/blog/openapi-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OpenAPI Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenAPI Specs = Biggest Agent Readiness Factor',
    description:
      'D2 is weighted 0.15 — highest dimension. Publish an OpenAPI spec or hit a ceiling at 45.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/openapi-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionWeights = [
  { dim: 'D2 API Quality', weight: 0.15, rank: 1, note: 'Highest. OpenAPI is the primary signal.' },
  { dim: 'D8 Reliability', weight: 0.13, rank: 2, note: 'Uptime, status page, error handling.' },
  { dim: 'D1 Discovery', weight: 0.12, rank: 3, note: 'llms.txt, agent-card.json, sitemap.' },
  { dim: 'D7 Security', weight: 0.12, rank: 3, note: 'TLS, OAuth, proper auth errors.' },
  { dim: 'D6 Data', weight: 0.10, rank: 5, note: 'Structured data, schema.org, JSON-LD.' },
  { dim: 'D9 Agent Experience', weight: 0.10, rank: 5, note: 'Rate limits, error codes, changelog.' },
  { dim: 'D3 Onboarding', weight: 0.08, rank: 7, note: 'Self-serve signup, API keys.' },
  { dim: 'D5 Payment', weight: 0.08, rank: 7, note: 'Stripe, x402, structured checkout.' },
  { dim: 'D4 Pricing', weight: 0.05, rank: 9, note: 'Lowest weight but highest failure rate.' },
]

const openApiUnlocks = [
  {
    title: 'Discovery',
    detail: 'Agents find your spec at /openapi.json and know exactly what operations you support. No scraping, no guessing, no training data required.',
    icon: Search,
    color: 'emerald',
  },
  {
    title: 'Automatic client generation',
    detail: 'Any agent framework can generate a typed client from your spec in seconds. openapi-generator, swagger-codegen, Kiota — all work instantly.',
    icon: Code2,
    color: 'blue',
  },
  {
    title: 'Schema validation',
    detail: 'Agents validate requests against your schema before sending. Fewer failed calls. Better error signals. Faster iteration loops.',
    icon: Shield,
    color: 'purple',
  },
  {
    title: 'Semantic understanding',
    detail: 'Descriptions on operations, parameters, and responses let agents reason about what each endpoint does — not just how to call it.',
    icon: Lightbulb,
    color: 'emerald',
  },
  {
    title: 'Versioning and changelogs',
    detail: 'OpenAPI specs are diffable. Agents can detect breaking changes programmatically. You ship better, they upgrade automatically.',
    icon: TrendingUp,
    color: 'blue',
  },
]

const theCeiling = [
  { label: 'Published OpenAPI spec', typicalScore: '60 to 75+', color: 'emerald' },
  { label: 'API docs but no spec', typicalScore: '48 to 55', color: 'amber' },
  { label: 'No public API at all', typicalScore: '25 to 45', color: 'red' },
]

const howToShip = [
  {
    step: '1',
    title: 'Pick a source of truth',
    detail: 'Either (a) hand-write openapi.yaml in your repo, (b) generate from code annotations (FastAPI, NestJS, Spring generate specs automatically), or (c) use a tool like Stoplight or Postman to author visually. Option (b) is the cheapest over time.',
    icon: Settings,
  },
  {
    step: '2',
    title: 'Host it at /openapi.json',
    detail: 'The conventional path. Serve it with CORS enabled so browsers and agents can fetch it. Add /swagger.json as a redirect — some tools still look there first.',
    icon: Server,
  },
  {
    step: '3',
    title: 'Validate with swagger-cli',
    detail: 'Run `swagger-cli validate openapi.json` in CI. Catches missing descriptions, broken $refs, and schema errors before they ship. A 20-line GitHub Action is enough.',
    icon: CheckCircle2,
  },
  {
    step: '4',
    title: 'Link from agent-card.json',
    detail: 'Your agent-card.json should reference the spec URL under the capabilities block. This is the primary discovery path for agents. Without this link, agents that find your card still cannot call your API.',
    icon: FileJson,
  },
  {
    step: '5',
    title: 'Reference in llms.txt',
    detail: 'Add a line to your /llms.txt: "OpenAPI spec: https://example.com/openapi.json". Large language models crawling llms.txt will index and remember your endpoints.',
    icon: FileText,
  },
  {
    step: '6',
    title: 'Publish a human version at /docs',
    detail: 'Redoc, Scalar, or Swagger UI render an interactive docs page from your spec. Same source of truth, no maintenance overhead. Humans and agents stay in sync.',
    icon: Sparkles,
  },
]

const toolChoices = [
  { tool: 'FastAPI (Python)', note: 'Generates OpenAPI 3.1 spec automatically from type hints. Best-in-class DX.' },
  { tool: 'NestJS (Node)', note: 'Built-in @nestjs/swagger module. Decorators become spec fields.' },
  { tool: 'Hono + Zod', note: 'Lightweight Node stack, Zod schemas compile to OpenAPI. Great for Edge runtimes.' },
  { tool: 'Spring Boot', note: 'springdoc-openapi generates spec from controllers. Zero config.' },
  { tool: 'swagger-cli', note: 'CLI for validating and bundling specs. Use in CI.' },
  { tool: '@apidevtools/json-schema-ref-parser', note: 'Resolves $ref pointers and bundles split specs.' },
  { tool: 'openapi-generator', note: 'Generates SDK clients in 40+ languages from a single spec.' },
  { tool: 'Redoc / Scalar', note: 'Renders gorgeous interactive docs from any OpenAPI file.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why is D2 API Quality weighted higher than security or reliability?',
    answer:
      'D2 API Quality is weighted 0.15 — higher than D7 Security (0.12), D8 Reliability (0.13), or any other dimension — because the API is the primary interface agents use to interact with a business. A reliable service with no API is useless to an agent. A secure service with no API is useless to an agent. Only an accessible, well-described API enables agent interaction at all. Security and reliability matter, but they are multipliers on top of API quality — not substitutes for it.',
  },
  {
    question: 'Will an OpenAPI spec alone push me to Silver?',
    answer:
      'Usually, yes. Publishing a valid OpenAPI spec moves D2 from near-zero to 8 or 9 out of 10, which alone adds 10-15 points to your total score. Combined with linking the spec from agent-card.json and llms.txt, you typically move from the 40s into the 55-65 range, clearing the Silver threshold. Companies that score above 70 usually also have OAuth, public status pages, and a changelog — but those build on top of the OpenAPI baseline.',
  },
  {
    question: 'OpenAPI 3.0 or 3.1?',
    answer:
      'Prefer 3.1 if your tooling supports it. OpenAPI 3.1 is aligned with JSON Schema 2020-12, which makes it easier for agents to validate and reason about responses. Most modern tooling (FastAPI, Stoplight, Redocly) supports 3.1. Older ecosystems still default to 3.0, and 3.0 is fine — it is 99% of the way there. Do not let the version question stop you from shipping.',
  },
  {
    question: 'How detailed does the spec need to be?',
    answer:
      'Detailed enough that an agent can call your API without reading human docs. That means: every operation has a descriptive summary and description, every parameter has a type and description, every response has a schema, and every error has an example. Skip optional fields at first. A barebones spec that describes 80% of your endpoints well beats a comprehensive spec that describes 100% of them shallowly.',
  },
  {
    question: 'Do I need to publish my internal APIs?',
    answer:
      'No. Only publish the endpoints you want agents to use. The OpenAPI spec acts as a contract — anything in it is a public commitment. Many companies publish a public/external spec separately from their internal one. You can use OpenAPI tags to separate sections, or maintain two files that share common components via $ref.',
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

export default function OpenApiAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'OpenAPI Specs Are the Single Biggest Factor in Agent Readiness (D2 = 15%)',
    description:
      'D2 API Quality is weighted 0.15 — the highest of any Agent Readiness dimension. Companies with published OpenAPI specs consistently score 60+. Companies without hit a ceiling around 45. Here is why OpenAPI is the single biggest factor and how to add one.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/openapi-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Standards Deep Dive',
    wordCount: 1950,
    keywords:
      'openapi specification, agent readiness, swagger, api documentation, D2 API quality, openapi.json',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'OpenAPI Agent Readiness',
          item: 'https://agenthermes.ai/blog/openapi-agent-readiness',
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
      title="OpenAPI Specs Are the Single Biggest Factor in Agent Readiness (D2 = 15%)"
      shareUrl="https://agenthermes.ai/blog/openapi-agent-readiness"
      currentHref="/blog/openapi-agent-readiness"
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
            <span className="text-zinc-400">OpenAPI Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <FileCode className="h-3.5 w-3.5" />
              Standards Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              D2 = 0.15 weight
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            OpenAPI Specs Are the Single Biggest Factor in{' '}
            <span className="text-emerald-400">Agent Readiness (D2 = 15%)</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Of the 9 dimensions in the Agent Readiness Score,{' '}
            <strong className="text-zinc-100">D2 API Quality is weighted highest at 0.15</strong>. That
            is more than security (0.12), more than reliability (0.13), more than any other factor.
            Companies with a published OpenAPI spec consistently score 60+. Companies without hit a
            ceiling around 45. One file fixes more than any other single change.
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

      {/* ===== THE WEIGHTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The Weights: D2 Beats Every Other Dimension
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The Agent Readiness Score is a weighted average across 9 dimensions. The weights are not
              arbitrary — they reflect how much each factor contributes to an agent&apos;s ability to
              actually transact with a business. Here is the full breakdown, ranked.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-12 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div className="col-span-4">Dimension</div>
              <div className="col-span-2">Weight</div>
              <div className="col-span-6">Why it matters</div>
            </div>
            {dimensionWeights.map((d, i) => (
              <div
                key={d.dim}
                className={`grid grid-cols-12 p-4 text-sm items-center ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'} ${d.rank === 1 ? 'border-l-2 border-emerald-500' : ''}`}
              >
                <div className={`col-span-4 font-medium ${d.rank === 1 ? 'text-emerald-400' : 'text-zinc-200'}`}>
                  {d.dim}
                  {d.rank === 1 && <span className="ml-2 text-xs text-emerald-500">← highest</span>}
                </div>
                <div className={`col-span-2 font-bold ${d.rank === 1 ? 'text-emerald-400' : 'text-zinc-300'}`}>
                  {d.weight.toFixed(2)}
                </div>
                <div className="col-span-6 text-zinc-500">{d.note}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The math:</strong> D2 at 0.15 means a perfect 10/10
              on API Quality alone contributes 15 points to your score. A zero there subtracts 15 from
              your ceiling. No other single dimension has that kind of leverage. And the single biggest
              signal the scanner uses to assess D2 is whether you have a published OpenAPI spec.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE CEILING ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Ceiling: What the Data Shows
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Across 500 business scans we see a clean pattern: businesses with a published OpenAPI spec
              land in a different score band entirely from businesses without one. The boundary is
              sharp — almost binary.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-2 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>API Documentation State</div>
              <div>Typical Score Range</div>
            </div>
            {theCeiling.map((row, i) => {
              const colors = getColorClasses(row.color)
              return (
                <div
                  key={row.label}
                  className={`grid grid-cols-2 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.label}</div>
                  <div className={`${colors.text} font-bold`}>{row.typicalScore}</div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Real examples: Resend publishes a clean OpenAPI 3.1 spec and scored 75 — the only Gold on
              the leaderboard. Stripe&apos;s OpenAPI spec is famous in the industry and they scored 68.
              GitHub publishes one (67). Vercel publishes one (70). Supabase publishes one (69). The
              top of the leaderboard is openapi.json all the way down.
            </p>
            <p>
              The ceiling for companies without a spec is not a hard wall — you can still score 50 or
              55 with excellent work on other dimensions — but going past 60 consistently requires
              clearing D2. And D2 at 8-plus requires a spec.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT OPENAPI UNLOCKS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What an OpenAPI Spec Unlocks for Agents
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An OpenAPI spec is not just documentation. It is a machine-readable contract that gives
            agents five superpowers they cannot get from any other source.
          </p>

          <div className="space-y-4 mb-8">
            {openApiUnlocks.map((item) => {
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

      {/* ===== MINIMAL EXAMPLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <FileJson className="h-5 w-5 text-blue-500" />
            The Smallest Useful OpenAPI Spec
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            You do not need to document every internal endpoint. This 30-line example is enough to
            move D2 from near-zero to 6/10 and push most businesses over the Silver threshold.
          </p>

          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 mb-8 overflow-x-auto">
            <pre className="text-xs text-zinc-300 leading-relaxed">
{`{
  "openapi": "3.1.0",
  "info": {
    "title": "Joes Pizza API",
    "version": "1.0.0",
    "description": "Public API for Joes Pizza menu and ordering"
  },
  "servers": [{ "url": "https://api.joespizza.com/v1" }],
  "paths": {
    "/menu": {
      "get": {
        "summary": "Get the full menu",
        "description": "Returns all available items with prices",
        "responses": {
          "200": {
            "description": "Menu items",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Menu" }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Menu": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id":    { "type": "string" },
                "name":  { "type": "string" },
                "price": { "type": "number" }
              }
            }
          }
        }
      }
    }
  }
}`}
            </pre>
          </div>

          <p className="text-zinc-300 leading-relaxed">
            That is it. Serve it at <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/openapi.json</code>,
            link to it from your{' '}
            <Link href="/blog/agent-card-json-guide" className="text-emerald-400 hover:text-emerald-300 underline">
              agent-card.json
            </Link>
            , and an agent can now discover that you have a menu endpoint, what it returns, and how to
            parse it — all without reading a single line of human documentation.
          </p>
        </div>
      </section>

      {/* ===== HOW TO SHIP ONE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-purple-500" />
            How to Ship an OpenAPI Spec (6 Steps, ~2 Hours)
          </h2>

          <div className="space-y-3 mb-8">
            {howToShip.map((item) => (
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
        </div>
      </section>

      {/* ===== TOOL CHOICES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-cyan-500" />
            Tools That Generate OpenAPI for You
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            You do not have to hand-write YAML. Most modern backend frameworks generate OpenAPI specs
            automatically from your code. Here are the best options by ecosystem.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div className="col-span-1">Tool</div>
              <div className="col-span-2">What it does</div>
            </div>
            {toolChoices.map((row, i) => (
              <div
                key={row.tool}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="col-span-1 font-medium text-zinc-200">{row.tool}</div>
                <div className="col-span-2 text-zinc-500">{row.note}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The cheapest long-term path is to pick a framework that generates the spec from your code
              (FastAPI, NestJS, Hono+Zod, Spring). That way the spec and the implementation can never
              drift. Every new endpoint you add automatically becomes part of the agent-facing contract.
            </p>
          </div>
        </div>
      </section>

      {/* ===== COMMON MISTAKES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Four Common Mistakes That Waste a Good Spec
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Hosting it behind auth',
                detail: 'A spec agents cannot fetch is useless. Serve it publicly. If the endpoints are authenticated, let the spec describe auth — but the spec file itself stays public.',
              },
              {
                title: 'No descriptions on operations',
                detail: 'summary and description fields are what let agents understand *what* an endpoint does, not just how to call it. Missing descriptions drop D2 from 9 to 5.',
              },
              {
                title: 'Stale specs that drift from reality',
                detail: 'If the spec says an endpoint returns { name, price } but actually returns { title, cost }, agents fail silently. Generate from code, not hand-written docs.',
              },
              {
                title: 'Missing error schemas',
                detail: 'Specs that only document 200 responses are half-specs. Agents need to know what 4xx and 5xx responses look like to handle failures. Always document the error shape.',
              },
            ].map((item) => (
              <div
                key={item.title}
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
                title: 'What Is agent-card.json? The Missing File on 500 Business Websites',
                href: '/blog/agent-card-json-guide',
                tag: 'Standards Deep Dive',
                tagColor: 'emerald',
              },
              {
                title: 'What Is an MCP Server and Why Your Business Needs One',
                href: '/blog/what-is-mcp-server',
                tag: 'MCP Explained',
                tagColor: 'blue',
              },
              {
                title: 'How to Improve Your Agent Readiness Score',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
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
            See your D2 score in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see your D2 API Quality score — and exactly what to add
            to move it. Most businesses move from Bronze to Silver by shipping a single openapi.json.
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
              Auto-Generate My Spec
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
