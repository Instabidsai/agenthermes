import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  Bot,
  CheckCircle,
  Code2,
  Globe,
  MessageSquare,
  Server,
  ShieldCheck,
  Sparkles,
  XCircle,
  Zap,
} from 'lucide-react'
import {
  getVerticalBySlug,
  getAllVerticalSlugs,
  type VerticalData,
  type VerticalTool,
} from '@/lib/verticals/landing-data'

// ---------------------------------------------------------------------------
// Static params — pre-render all 15 verticals at build time
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllVerticalSlugs().map((slug) => ({ vertical: slug }))
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------

type PageProps = { params: Promise<{ vertical: string }> }

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { vertical: slug } = await props.params
  const data = getVerticalBySlug(slug)
  if (!data) return { title: 'Not Found' }

  return {
    title: `${data.name} Agent Readiness | AgentHermes`,
    description: data.metaDescription,
    openGraph: {
      title: `${data.headline} | AgentHermes`,
      description: data.metaDescription,
      url: `https://agenthermes.ai/for/${data.slug}`,
      siteName: 'AgentHermes',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.headline} | AgentHermes`,
      description: data.metaDescription,
    },
    alternates: {
      canonical: `https://agenthermes.ai/for/${data.slug}`,
    },
  }
}

// ---------------------------------------------------------------------------
// Tool card component
// ---------------------------------------------------------------------------

function ToolCard({ tool, index }: { tool: VerticalTool; index: number }) {
  return (
    <div className="relative p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/30 transition-colors group">
      {/* Number badge */}
      <div className="absolute -top-3 -left-2 h-6 w-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
        <span className="text-[10px] font-mono font-bold text-emerald-400">
          {index + 1}
        </span>
      </div>

      {/* Tool name */}
      <div className="flex items-center gap-2 mb-3">
        <Code2 className="h-4 w-4 text-emerald-500/70" />
        <h3 className="text-sm font-mono font-bold text-emerald-400">
          {tool.name}()
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-400 leading-relaxed mb-4">
        {tool.description}
      </p>

      {/* Schema preview */}
      <div className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800/50 font-mono text-xs">
        <div className="text-zinc-500 mb-1">// Parameters</div>
        {tool.params.map((param) => (
          <div key={param} className="text-zinc-400">
            <span className="text-emerald-400/70">
              {param.split(':')[0]}
            </span>
            <span className="text-zinc-600">:</span>
            <span className="text-blue-400/70">
              {param.split(':').slice(1).join(':')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Before / After comparison
// ---------------------------------------------------------------------------

function BeforeAfter({ vertical }: { vertical: VerticalData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Before */}
      <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
        <div className="flex items-center gap-2 mb-4">
          <XCircle className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-bold text-red-400">Today</h3>
        </div>
        <div className="space-y-3">
          {vertical.painPoints.map((point) => (
            <div key={point} className="flex items-start gap-3">
              <XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-zinc-400">{point}</p>
            </div>
          ))}
          <div className="flex items-start gap-3">
            <XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-zinc-400">
              Average score: <strong className="text-red-400">{vertical.stats.avgScore}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* After */}
      <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="h-5 w-5 text-emerald-500" />
          <h3 className="text-lg font-bold text-emerald-400">
            After AgentHermes
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-zinc-400">
              AI agents discover and recommend your business
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-zinc-400">
              Customers book through any AI assistant
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-zinc-400">
              Machine-readable tools expose your full service catalog
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-zinc-400">
              First-mover advantage in the agent economy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function VerticalLandingPage(props: PageProps) {
  const { vertical: slug } = await props.params
  const vertical = getVerticalBySlug(slug)

  if (!vertical) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${vertical.headline} | AgentHermes`,
    url: `https://agenthermes.ai/for/${vertical.slug}`,
    description: vertical.metaDescription,
    isPartOf: {
      '@type': 'WebSite',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: vertical.name, item: `https://agenthermes.ai/for/${vertical.slug}` },
      ],
    },
  }

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 mb-8">
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-zinc-400">For {vertical.name}</span>
            </div>

            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-subtle-pulse" />
              {vertical.stats.businesses} {vertical.name.toLowerCase()} businesses
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              Make Your{' '}
              <span className="text-emerald-500">{vertical.name}</span>{' '}
              Agent-Ready
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-2xl mx-auto mb-10">
              AI agents are learning to find, book, and pay for{' '}
              {vertical.name.toLowerCase()} services autonomously. Most{' '}
              {vertical.name.toLowerCase()} businesses are invisible to them.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Globe className="h-4 w-4 text-zinc-600" />
                <span>
                  <strong className="text-zinc-400">{vertical.stats.businesses}</strong>{' '}
                  businesses
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Zap className="h-4 w-4 text-red-500/60" />
                <span>
                  Avg score:{' '}
                  <strong className="text-red-400">
                    {vertical.stats.avgScore}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <ShieldCheck className="h-4 w-4 text-emerald-500/60" />
                <span>
                  Top:{' '}
                  <strong className="text-zinc-400">
                    {vertical.stats.topScore}
                  </strong>
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/connect?vertical=${vertical.slug}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
              >
                Check Your Score
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AGENT SCENARIO ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              The Agent Use Case
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Imagine a customer asks their AI assistant this question:
            </p>
          </div>

          {/* Agent conversation mockup */}
          <div className="mx-auto max-w-2xl p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            {/* User message */}
            <div className="flex items-start gap-3 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/30 flex-shrink-0">
                <MessageSquare className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <div className="text-xs font-medium text-zinc-500 mb-1">
                  Customer
                </div>
                <p className="text-sm text-zinc-200 leading-relaxed">
                  &ldquo;{vertical.agentQuery}&rdquo;
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-800/50 my-4" />

            {/* Agent response */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 flex-shrink-0">
                <Bot className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs font-medium text-zinc-500 mb-1">
                  AI Agent
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Searching for agent-ready {vertical.name.toLowerCase()}{' '}
                  businesses... Found{' '}
                  <span className="text-emerald-400 font-medium">
                    your business
                  </span>{' '}
                  via MCP endpoint. Calling{' '}
                  <span className="font-mono text-emerald-400/80 text-xs">
                    {vertical.tools[0].name}()
                  </span>{' '}
                  now...
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-zinc-500 text-sm mt-6">
            Right now, this fails for{' '}
            <strong className="text-zinc-400">most {vertical.name.toLowerCase()}</strong>{' '}
            businesses. We fix that.
          </p>
        </div>
      </section>

      {/* ===== MCP TOOLS ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              5 MCP Tools Agents Could Call
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              These are the tools an AI agent needs to interact with your{' '}
              {vertical.name.toLowerCase()} business. We generate and host them
              for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {vertical.tools.map((tool, i) => (
              <ToolCard key={tool.name} tool={tool} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/60 border border-zinc-800/60 text-zinc-500 text-sm">
              <Server className="h-4 w-4" />
              Hosted on AgentHermes MCP infrastructure — zero setup
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT YOU GET FREE ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              What You Get{' '}
              <span className="text-emerald-500">(Free)</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Everything you need to go from invisible to agent-ready. No code
              required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vertical.freeOffer.map((item, i) => {
              const icons = [ShieldCheck, Server, Sparkles]
              const Icon = icons[i] || Sparkles
              return (
                <div
                  key={item}
                  className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 mx-auto mb-4">
                    <Icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">{item}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== BEFORE / AFTER ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Before &amp; After
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              The difference between being invisible and being the first
              recommendation.
            </p>
          </div>

          <BeforeAfter vertical={vertical} />
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Be the first agent-ready{' '}
            <span className="text-emerald-500">
              {vertical.name.toLowerCase()}
            </span>{' '}
            in your market
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            While {vertical.stats.businesses} {vertical.name.toLowerCase()}{' '}
            businesses average {vertical.stats.avgScore}, you can be at 75+ in
            minutes. Free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/connect?vertical=${vertical.slug}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
            >
              Check Your Score First
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
