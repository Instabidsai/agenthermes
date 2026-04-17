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
  DollarSign,
  Globe,
  HelpCircle,
  Layers,
  Network,
  Puzzle,
  Search,
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
  title: 'Microservices vs Monolith: Which Architecture Scores Higher for Agent Readiness | AgentHermes',
  description:
    'Architectural comparison through the agent readiness lens. Microservices: independent OpenAPI specs but complex discovery. Monolith: single API surface but simpler integration. Neither is inherently better. Data from 500 business scans.',
  keywords: [
    'microservices monolith agent readiness architecture',
    'microservices agent readiness',
    'monolith API agent score',
    'architecture agent economy',
    'API gateway agent readiness',
    'microservices vs monolith AI',
    'OpenAPI microservices',
    'agent readiness architecture',
    'monolith API design',
  ],
  openGraph: {
    title: 'Microservices vs Monolith: Which Architecture Scores Higher for Agent Readiness',
    description:
      'Architectural comparison through the agent readiness lens. Microservices have independent specs. Monoliths have simpler discovery. Data from 500 business scans reveals what actually matters.',
    url: 'https://agenthermes.ai/blog/microservices-monolith-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Microservices vs Monolith Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Microservices vs Monolith: Which Architecture Scores Higher for Agent Readiness',
    description:
      'Neither is inherently better for agents. It depends on API surface design. Here is what the scan data shows.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/microservices-monolith-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const comparisonRows = [
  { aspect: 'API Surface', monolith: 'Single OpenAPI spec, one base URL, all endpoints in one document', microservices: 'Multiple specs per service, different base URLs, requires service catalog or gateway', winner: 'Monolith' },
  { aspect: 'Discovery', monolith: 'One spec to find, one /docs page, one agent-card.json', microservices: 'Agent must discover which service handles which capability — gateway helps but adds a layer', winner: 'Monolith' },
  { aspect: 'Granularity', monolith: 'All capabilities bundled — agent gets everything or nothing', microservices: 'Each service exposes only its domain, cleaner capability boundaries', winner: 'Microservices' },
  { aspect: 'Scaling', monolith: 'Scale everything together, even if only one endpoint is hot', microservices: 'Scale individual services under agent load independently', winner: 'Microservices' },
  { aspect: 'Auth', monolith: 'One auth system, one token, one set of scopes', microservices: 'Potentially different auth per service, or unified via gateway', winner: 'Monolith' },
  { aspect: 'Versioning', monolith: 'One version for the whole API — breaking changes affect everything', microservices: 'Version individual services independently, less blast radius', winner: 'Microservices' },
  { aspect: 'Error Handling', monolith: 'Consistent error format across all endpoints guaranteed', microservices: 'Each service may return different error shapes without strict governance', winner: 'Monolith' },
  { aspect: 'MCP Generation', monolith: 'One OpenAPI spec converts to one MCP server with all tools', microservices: 'Need to aggregate multiple specs or create multiple MCP servers', winner: 'Monolith' },
]

const architectureScores = [
  { name: 'Monolith + OpenAPI spec', score: '55-70', tier: 'Silver-Gold', detail: 'Single spec = easy discovery, consistent errors, one auth flow. Stripe, Resend, Linear follow this pattern.', color: 'emerald' },
  { name: 'Microservices + API Gateway', score: '50-65', tier: 'Silver', detail: 'Gateway unifies discovery and auth. Individual services have clean boundaries. Twilio, AWS follow this pattern.', color: 'blue' },
  { name: 'Microservices without Gateway', score: '25-40', tier: 'Not Scored-Bronze', detail: 'Multiple endpoints, no unified spec, agents must discover each service independently. Common in enterprise.', color: 'amber' },
  { name: 'Monolith without OpenAPI', score: '15-30', tier: 'Not Scored', detail: 'Endpoints exist but no machine-readable spec. Agent must guess at capabilities. Common in legacy systems.', color: 'amber' },
  { name: 'Server-rendered monolith (no API)', score: '5-15', tier: 'Not Scored', detail: 'HTML-only output, no JSON endpoints. WordPress sites, Rails apps without API mode. Invisible to agents.', color: 'red' },
]

const gatewayBenefits = [
  {
    name: 'Unified OpenAPI Spec',
    description: 'An API gateway can aggregate specs from multiple microservices into a single OpenAPI document. Agents see one spec, one base URL, one set of capabilities — even if ten services power it behind the scenes.',
    icon: Layers,
    color: 'emerald',
  },
  {
    name: 'Single Auth Surface',
    description: 'Gateway handles authentication at the edge. Agents get one OAuth flow, one API key, one token — regardless of how many internal services that token authorizes. Eliminates the multi-auth problem entirely.',
    icon: Shield,
    color: 'blue',
  },
  {
    name: 'Consistent Error Format',
    description: 'Gateway normalizes error responses across services. Whether the user service returns 403 or the billing service returns 402, the agent sees a consistent error shape with typed error codes.',
    icon: CheckCircle2,
    color: 'purple',
  },
  {
    name: 'Rate Limiting and Quotas',
    description: 'Centralized rate limiting means agents get predictable X-RateLimit headers from one place. No guessing which service has which limits. Agents can plan request budgets against a single quota.',
    icon: Zap,
    color: 'cyan',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Does architecture really affect agent readiness scores?',
    answer:
      'Architecture itself does not score directly — agent readiness is measured by what is externally visible: API quality, discovery, documentation, error handling, security. But architecture determines how easy it is to achieve high scores on those dimensions. A monolith with a single OpenAPI spec can reach Silver-Gold tier with relatively little effort. Microservices without a gateway struggle to present a unified surface for agents.',
  },
  {
    question: 'Should I switch from microservices to monolith for better agent readiness?',
    answer:
      'No. Architecture decisions have far more implications than agent readiness. If you already have microservices, add an API gateway with an aggregated OpenAPI spec. This gives you the agent readiness benefits of a monolith (single discovery surface, unified auth, consistent errors) while keeping the operational benefits of microservices (independent scaling, deployment, versioning).',
  },
  {
    question: 'Which companies score highest with microservices architecture?',
    answer:
      'AWS, Twilio, and Cloudflare all use microservices internally but present unified API surfaces through gateways and comprehensive documentation. Their agent readiness scores are driven by excellent OpenAPI specs, consistent error formats, and thorough auth documentation — not by their internal architecture. The lesson: what the agent sees matters, not how you built it.',
  },
  {
    question: 'How do MCP servers work with microservices?',
    answer:
      'You have two approaches: one MCP server per microservice (agents discover multiple servers) or one MCP server backed by an API gateway (agents see one server with all tools). The second approach consistently scores higher because agents prefer a single discovery point. AgentHermes can auto-generate an MCP server from either an aggregated gateway spec or from individual service specs merged together.',
  },
  {
    question: 'What about serverless architectures?',
    answer:
      'Serverless (Lambda, Vercel Edge Functions, Cloudflare Workers) is architecturally similar to microservices from an agent readiness perspective. Each function is an independent endpoint. The same gateway pattern applies: use an API gateway to aggregate functions into a unified spec. Without a gateway, agents see scattered endpoints with no discovery mechanism. With a gateway, serverless can score as well as any monolith.',
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

export default function MicroservicesMonolithAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Microservices vs Monolith: Which Architecture Scores Higher for Agent Readiness',
    description:
      'Architectural comparison through the agent readiness lens. Microservices have independent specs. Monoliths have simpler discovery. Data from 500 business scans reveals what actually matters.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/microservices-monolith-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Architecture Analysis',
    wordCount: 1900,
    keywords:
      'microservices monolith agent readiness architecture, API gateway agent readiness, OpenAPI microservices, monolith API design',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Microservices vs Monolith Agent Readiness',
          item: 'https://agenthermes.ai/blog/microservices-monolith-agent-readiness',
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
      title="Microservices vs Monolith: Which Architecture Scores Higher for Agent Readiness"
      shareUrl="https://agenthermes.ai/blog/microservices-monolith-agent-readiness"
      currentHref="/blog/microservices-monolith-agent-readiness"
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
            <span className="text-zinc-400">Microservices vs Monolith Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Puzzle className="h-3.5 w-3.5" />
              Architecture Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              500 Businesses Scanned
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Microservices vs Monolith:{' '}
            <span className="text-emerald-400">Which Architecture Scores Higher for Agent Readiness</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The microservices vs monolith debate has raged for a decade. But there is a new dimension to
            consider: <strong className="text-zinc-100">which architecture makes your business more discoverable
            and usable by AI agents?</strong> We analyzed 500 business scans to find out. The answer is not
            what most engineering teams expect.
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

      {/* ===== THE QUESTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            What Agents Actually See
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When an AI agent evaluates your business for interaction, it does not care whether you run
              Kubernetes pods or a single Rails server. It cares about what is externally visible: Can I
              find an API spec? Can I authenticate? Can I call endpoints and get structured responses? Can
              I discover all available capabilities from a single entry point?
            </p>
            <p>
              This is the fundamental insight:{' '}
              <strong className="text-zinc-100">architecture is invisible to agents. API surface design is everything.</strong>{' '}
              A monolith with a comprehensive OpenAPI spec and consistent error handling will outscore a
              microservices platform with fragmented discovery every time. But a microservices architecture
              with a well-configured API gateway can match or exceed monolith scores.
            </p>
            <p>
              We analyzed agent readiness scores across 500 businesses and categorized them by visible
              architecture pattern. The correlation is clear: it is not about monolith vs microservices.
              It is about whether agents encounter a{' '}
              <Link href="/blog/api-first-vs-web-first" className="text-emerald-400 hover:text-emerald-300 underline">
                unified, well-documented API surface
              </Link>{' '}
              or a fragmented collection of endpoints.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '55-70', label: 'Monolith + OpenAPI', icon: Server },
              { value: '50-65', label: 'Microservices + Gateway', icon: Network },
              { value: '25-40', label: 'Microservices (no gateway)', icon: Layers },
              { value: '5-15', label: 'No API at all', icon: Globe },
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

      {/* ===== SIDE BY SIDE COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Dimension-by-Dimension Comparison
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            How monoliths and microservices compare across the dimensions that matter most to AI agents.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div>Monolith</div>
              <div>Microservices</div>
              <div>Edge</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-400">{row.monolith}</div>
                <div className="text-zinc-400">{row.microservices}</div>
                <div className={row.winner === 'Monolith' ? 'text-emerald-400 font-medium' : 'text-blue-400 font-medium'}>{row.winner}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The tally is 5-3 in favor of monolith architecture for raw agent readiness. But this is
              misleading. The three categories where microservices win — granularity, scaling, and
              versioning — are operational advantages that compound over time. And every monolith
              advantage can be replicated by microservices with a proper API gateway. The reverse is
              not true.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORE RANGES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Score Ranges by Architecture Pattern
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Based on scan data from 500 businesses, here is how each architecture pattern typically scores.
              The ranges reflect that architecture is only one factor — documentation quality, auth
              implementation, and error handling matter just as much.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {architectureScores.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-zinc-100">{item.name}</h3>
                    <span className={`text-sm font-mono font-bold ${colors.text}`}>{item.score}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text}`}>{item.tier}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE GATEWAY SOLUTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The API Gateway Equalizer
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An{' '}
            <Link href="/blog/api-gateway-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
              API gateway
            </Link>{' '}
            eliminates every agent readiness disadvantage of microservices. Here is how.
          </p>

          <div className="space-y-4 mb-8">
            {gatewayBenefits.map((benefit) => {
              const colors = getColorClasses(benefit.color)
              return (
                <div
                  key={benefit.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <benefit.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{benefit.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The bottom line:</strong> A microservices architecture with a
              well-configured API gateway scores identically to a monolith on agent readiness. The gateway is the
              translation layer that makes internal complexity invisible to agents. If you run microservices,
              invest in the gateway. It is the single highest-ROI improvement for agent readiness. As detailed in
              our{' '}
              <Link href="/blog/cto-guide-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                CTO guide to agent readiness
              </Link>, this is a week-long project that can jump your score 20+ points.
            </p>
          </div>
        </div>
      </section>

      {/* ===== REAL-WORLD EXAMPLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-500" />
            Real-World Architecture Patterns and Their Scores
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The highest-scoring businesses on the AgentHermes leaderboard are split between monolith and
              microservices architectures. What they share is not an architecture — it is a design philosophy:
              present a clean, unified API surface to the outside world regardless of internal complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Stripe (Score: 68) — Monolith-style API',
                detail: 'Stripe presents a single REST API at api.stripe.com with one OpenAPI spec, one auth mechanism, one error format. Internally it is distributed, but agents see a monolith. This is why it consistently scores in the Gold tier.',
              },
              {
                title: 'Twilio (Score: 62) — Microservices + gateway',
                detail: 'Twilio has separate services for SMS, Voice, Video, and dozens more. But the API surface is unified through excellent documentation, consistent auth, and predictable URL patterns across all services.',
              },
              {
                title: 'AWS (Score: 58) — Microservices, fragmented',
                detail: 'AWS has hundreds of services, each with its own API. Despite excellent docs per service, the lack of a unified entry point hurts discovery. An agent trying to use AWS must already know which service it needs.',
              },
              {
                title: 'Legacy enterprise (Score: 10-25) — Monolith, no spec',
                detail: 'Many large enterprises run monoliths that have endpoints but no OpenAPI spec, no consistent error handling, and SOAP instead of REST. Architecture alone does not help — the API surface must be designed for external consumption.',
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
                title: 'API-First vs Web-First: The Decision That Determines Your Score',
                href: '/blog/api-first-vs-web-first',
                tag: 'Architecture Analysis',
                tagColor: 'blue',
              },
              {
                title: 'API Gateway Agent Readiness: The Unified Entry Point',
                href: '/blog/api-gateway-agent-readiness',
                tag: 'Architecture Analysis',
                tagColor: 'blue',
              },
              {
                title: 'CTO Guide to Agent Readiness',
                href: '/blog/cto-guide-agent-readiness',
                tag: 'Leadership Guide',
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
            See how your architecture scores
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run your API through the AgentHermes scanner. See your score across all 9 dimensions
            and get specific recommendations for your architecture pattern.
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
