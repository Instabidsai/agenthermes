import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Crown,
  DollarSign,
  FileJson,
  FileText,
  Gauge,
  HelpCircle,
  Layers,
  Server,
  Shield,
  Sparkles,
  Target,
  Timer,
  Trophy,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'From Silver to Gold: What the Final 15 Points of Agent Readiness Actually Require | AgentHermes',
  description:
    'Only 1 of 500 businesses scored Gold on the Agent Readiness Score. The jump from Silver (60-74) to Gold (75+) requires agent-native infrastructure that most businesses have never heard of. Here is what it takes.',
  keywords: [
    'silver to gold agent readiness',
    'agent readiness gold tier',
    'agent-card.json',
    'llms.txt',
    'MCP server setup',
    'agent readiness score improve',
    'Resend agent readiness',
    'agent native infrastructure',
  ],
  openGraph: {
    title: 'From Silver to Gold: What the Final 15 Points Actually Require',
    description:
      'Only 1 of 500 businesses scored Gold. Silver to Gold is the hardest jump. Agent-card.json, llms.txt, MCP server, x402 payments, sub-100ms latency. Here is the full breakdown.',
    url: 'https://agenthermes.ai/blog/silver-to-gold-guide',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'From Silver to Gold Agent Readiness Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Silver to Gold: What the Final 15 Points Actually Require',
    description:
      'Only 1 of 500 businesses scored Gold. The final 15 points require agent-native infrastructure most have never heard of.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/silver-to-gold-guide',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const goldRequirements = [
  {
    name: 'agent-card.json',
    pointsAdded: '~3 pts (D1 + D9)',
    difficulty: 'Low',
    description:
      'The A2A protocol discovery file published at /.well-known/agent-card.json. Declares your agent identity, capabilities, supported protocols, and MCP endpoint URL. Without it, agents have no standard way to discover what you offer. Resend has one. Vercel does not. That 3-point gap is measurable.',
    dimensions: 'D1 Discoverability (12%), D9 Agent Experience (10%)',
    icon: FileJson,
    color: 'emerald',
  },
  {
    name: 'llms.txt',
    pointsAdded: '~2 pts (D1 + D9)',
    difficulty: 'Low',
    description:
      'A markdown file at your domain root that describes your business, API, and capabilities in a format optimized for LLM consumption. Not a robots.txt replacement — a complement. LLMs read this to understand what you do before making API calls. Takes 15 minutes to write.',
    dimensions: 'D1 Discoverability (12%), D9 Agent Experience (10%)',
    icon: FileText,
    color: 'blue',
  },
  {
    name: 'MCP Server',
    pointsAdded: '~5 pts (D2 + D9)',
    difficulty: 'Medium',
    description:
      'A Model Context Protocol server that exposes your API as discoverable tools, resources, and prompts. The biggest single-item score boost available. Resend ships one. Of the other 499 businesses scanned, only 1 has one. An MCP server makes you callable by Claude, ChatGPT, and every other MCP-compatible agent.',
    dimensions: 'D2 API Quality (15%), D9 Agent Experience (10%)',
    icon: Server,
    color: 'purple',
  },
  {
    name: 'x402 Payment Support',
    pointsAdded: '~2 pts (D5)',
    difficulty: 'High',
    description:
      'The x402 micropayment protocol lets agents pay per API call without subscriptions or credit cards. HTTP 402 Payment Required was reserved for 30 years — x402 finally uses it. Sub-second settlement on USDC. No signup, no card, no human. This is the most forward-looking requirement and the hardest to implement today.',
    dimensions: 'D5 Payment Processing (8%)',
    icon: DollarSign,
    color: 'amber',
  },
  {
    name: 'Fully Structured Error Responses',
    pointsAdded: '~2 pts (D6 + D9)',
    difficulty: 'Low-Medium',
    description:
      'Every error response — 400, 401, 403, 404, 409, 422, 429, 500 — must return structured JSON with an error code, human-readable message, machine-readable type, and request ID. No HTML error pages. No stack traces. No generic "Internal Server Error" strings. Silver-tier companies get this 70% right. Gold requires 95%+.',
    dimensions: 'D6 Data Quality (10%), D9 Agent Experience (10%)',
    icon: Shield,
    color: 'red',
  },
  {
    name: 'Sub-100ms p95 Latency',
    pointsAdded: '~1 pt (D8)',
    difficulty: 'Medium-High',
    description:
      'Agents chain multiple API calls in sequence. If each call takes 500ms, a 5-step workflow takes 2.5 seconds. At sub-100ms p95, the same workflow completes in under 500ms. D8 Reliability measures response time consistency, and the fastest responders score highest. Resend averages 45ms. Most Silver-tier APIs average 200-400ms.',
    dimensions: 'D8 Reliability (13%)',
    icon: Gauge,
    color: 'cyan',
  },
]

const silverVsGold = [
  { dimension: 'D1 Discoverability', silver: 'DNS + robots.txt + sitemap + OG tags', gold: '+ agent-card.json + llms.txt + AGENTS.md' },
  { dimension: 'D2 API Quality', silver: 'OpenAPI spec + REST endpoints + Bearer auth', gold: '+ MCP server + A2A agent card + tool descriptions' },
  { dimension: 'D5 Payment', silver: 'Stripe integration + pricing page', gold: '+ x402 micropayments + per-call billing' },
  { dimension: 'D6 Data Quality', silver: 'JSON responses + Schema.org markup', gold: '+ 95%+ structured error coverage + JSON-LD everywhere' },
  { dimension: 'D8 Reliability', silver: 'Status page + 99.9% uptime + health endpoint', gold: '+ sub-100ms p95 + idempotency keys + circuit breakers' },
  { dimension: 'D9 Agent Experience', silver: 'Request IDs + rate-limit headers + pagination', gold: '+ full OpenAPI examples + response envelopes + idempotency' },
]

const resendVsVercel = [
  { signal: 'agent-card.json', resend: 'Yes', vercel: 'No', impact: '+3 pts' },
  { signal: 'llms.txt', resend: 'Yes', vercel: 'No', impact: '+2 pts' },
  { signal: 'MCP server', resend: 'Yes (official)', vercel: 'No (community only)', impact: '+5 pts' },
  { signal: 'x402 support', resend: 'No', vercel: 'No', impact: '0 pts' },
  { signal: 'Structured errors (coverage)', resend: '98%', vercel: '85%', impact: '+1 pt' },
  { signal: 'p95 latency', resend: '45ms', vercel: '120ms', impact: '+0.5 pts' },
  { signal: 'Total score', resend: '75 (Gold)', vercel: '70 (Silver)', impact: '5 pt gap' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why is the Silver to Gold jump the hardest?',
    answer:
      'Bronze to Silver (40 to 60) can be achieved with standard web best practices: HTTPS, OpenAPI spec, proper auth, a status page, and structured responses. These are things web developers already know how to build. Silver to Gold (60 to 75) requires agent-native infrastructure — agent-card.json, llms.txt, MCP servers, x402 payments — that did not exist two years ago and that most developers have never encountered. The knowledge gap is the barrier, not the engineering effort.',
  },
  {
    question: 'Can I reach Gold without x402 payment support?',
    answer:
      'Technically yes, but it is extremely difficult. x402 contributes about 2 points through D5. Without it, you need to score almost perfectly on every other dimension to reach 75. Resend barely made Gold at 75 without x402. If you implement everything else on the list and still fall short, x402 is likely the missing piece. That said, x402 adoption is very early — being among the first to support it is itself a competitive advantage.',
  },
  {
    question: 'How long does it take to go from Silver to Gold?',
    answer:
      'If you are already at 68-72 (high Silver), the agent-card.json and llms.txt can be created in an afternoon — that is 5 points. An MCP server takes 1-2 days with the AgentHermes tutorial or auto-generation. Structured error coverage auditing takes 1-2 days. Total: about a week of focused work to close the gap. The challenge is knowing what to build, not building it.',
  },
  {
    question: 'What companies are closest to Gold right now?',
    answer:
      'Based on our 500-business scan: Vercel (70), Supabase (69), Stripe (68), Slack (68), GitHub (67), and Robinhood (66) are all within striking distance. Each needs 5-9 points. For all of them, the path is the same: agent-card.json, llms.txt, and an official MCP server would close most of the gap. The irony is that several of these companies have community MCP servers — they just need to make them official and publish the discovery files.',
  },
  {
    question: 'Is Gold worth pursuing if only 1 company has achieved it?',
    answer:
      'Absolutely. The scarcity IS the value. Being one of the first Gold-tier businesses means agents preferentially route to you over the 499 Silver-and-below competitors. Agent trust is earned through capability signals, and Gold-tier signals (MCP server, agent card, structured everything) are the strongest capability signals that exist. The early mover advantage compounds — agents that successfully interact with your Gold-tier API will learn to prefer you.',
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

export default function SilverToGoldGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'From Silver to Gold: What the Final 15 Points of Agent Readiness Actually Require',
    description:
      'Only 1 of 500 businesses scored Gold on the Agent Readiness Score. The Silver to Gold jump requires agent-native infrastructure. Complete breakdown of the 6 requirements.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/silver-to-gold-guide',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'How-To Guide',
    wordCount: 1900,
    keywords: 'silver to gold agent readiness, agent-card.json, llms.txt, MCP server, agent native infrastructure',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'From Silver to Gold',
          item: 'https://agenthermes.ai/blog/silver-to-gold-guide',
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
      title="From Silver to Gold: What the Final 15 Points Require"
      shareUrl="https://agenthermes.ai/blog/silver-to-gold-guide"
      currentHref="/blog/silver-to-gold-guide"
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
            <span className="text-zinc-400">From Silver to Gold</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Trophy className="h-3.5 w-3.5" />
              How-To Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Companion to Bronze-to-Silver
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            From Silver to Gold:{' '}
            <span className="text-emerald-400">The Final 15 Points</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Of 500 businesses scanned, only <strong className="text-zinc-100">1 scored Gold</strong>.
            The jump from Silver (60-74) to Gold (75+) is the hardest in the entire Agent Readiness
            framework. Not because it requires massive engineering — but because it requires
            infrastructure that most businesses have never heard of. Here is exactly what the final
            15 points demand.
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

      {/* ===== THE CLIFF ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            The 60-to-75 Cliff: Why Silver Is a Ceiling, Not a Floor
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The{' '}
              <Link href="/blog/bronze-to-silver-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                Bronze to Silver guide
              </Link>{' '}
              covered the first 20-point jump: HTTPS, OpenAPI specs, proper auth, structured
              errors, status pages. Those are standard web engineering practices. A competent
              team can implement them in 2-4 weeks because they are well-documented, widely
              understood, and supported by every framework.
            </p>
            <p>
              Silver to Gold is fundamentally different. The remaining 15 points come from
              agent-native infrastructure — technology that did not exist before 2024 and that
              most engineering teams have never implemented. This is not a knowledge gap in web
              development. It is an awareness gap about the agent economy.
            </p>
            <p>
              That is why the distribution looks the way it does: 30+ businesses in Silver, exactly
              1 in Gold. The cliff is not technical difficulty — it is knowing what to build. Once
              you know, the actual implementation is surprisingly fast.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '1', label: 'Gold business (of 500)', icon: Crown },
              { value: '30+', label: 'Silver businesses', icon: Award },
              { value: '15', label: 'points to close the gap', icon: Target },
              { value: '~1 week', label: 'to implement all 6 items', icon: Timer },
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

      {/* ===== THE 6 REQUIREMENTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The 6 Requirements That Separate Gold from Silver
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Each item below adds a measurable number of points. Together, they account for
              the full 15-point gap between the top of Silver (Vercel at 70) and the bottom
              of Gold (Resend at 75). Ordered by impact, highest first.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {goldRequirements.map((req) => {
              const colors = getColorClasses(req.color)
              return (
                <div
                  key={req.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <req.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-zinc-100">{req.name}</h3>
                        <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">{req.pointsAdded}</span>
                        <span className="text-xs text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded">{req.difficulty}</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">{req.dimensions}</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{req.description}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The math:</strong> agent-card.json (~3) + llms.txt (~2) +
              MCP server (~5) + x402 (~2) + structured errors (~2) + latency (~1) = ~15 points. These
              numbers are approximate because scoring is weighted and nonlinear — but the order of magnitude
              is right. A Silver-tier company at 70 that implements all six crosses into Gold territory.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SILVER VS GOLD TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Dimension-by-Dimension: What Silver Has vs What Gold Needs
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Silver-tier companies already do most things well. Gold adds a specific set of
            agent-native capabilities on top of each dimension.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div className="text-zinc-400">Silver Has</div>
              <div className="text-emerald-400">Gold Adds</div>
            </div>
            {silverVsGold.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className="text-zinc-500">{row.silver}</div>
                <div className="text-emerald-400">{row.gold}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESEND VS VERCEL ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-amber-500" />
            Resend (75) vs Vercel (70): The 5-Point Case Study
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              <Link href="/blog/resend-only-gold" className="text-emerald-400 hover:text-emerald-300 underline">
                Resend is the only Gold-tier business
              </Link>{' '}
              in the 500-business scan. Vercel sits at 70 — high Silver. Both are developer tools.
              Both have excellent APIs, documentation, and infrastructure. The 5-point gap comes down
              to exactly the agent-native items listed above.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Signal</div>
              <div className="text-emerald-400">Resend (75)</div>
              <div className="text-blue-400">Vercel (70)</div>
              <div className="text-amber-400">Impact</div>
            </div>
            {resendVsVercel.map((row, i) => (
              <div
                key={row.signal}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'} ${row.signal === 'Total score' ? 'border-t border-zinc-700/50 font-bold' : ''}`}
              >
                <div className="font-medium text-zinc-200">{row.signal}</div>
                <div className="text-emerald-400">{row.resend}</div>
                <div className="text-blue-400">{row.vercel}</div>
                <div className="text-amber-400">{row.impact}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The lesson is stark: <Link href="/blog/vercel-supabase-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">Vercel</Link>{' '}
              could reach Gold with three files and one afternoon of work. agent-card.json (30 minutes),
              llms.txt (15 minutes), and an official MCP server (a few hours — they already have a
              community one). That is the gap. Not engineering capacity. Not budget. Just awareness of
              what agent-native infrastructure means.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE ROADMAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-emerald-500" />
            The 5-Day Roadmap to Gold
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            If you are already Silver (60+), here is the fastest path to Gold. Ordered by
            impact-per-hour, not by difficulty.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: 'Day 1',
                title: 'Publish agent-card.json and llms.txt',
                detail: 'Two static files. agent-card.json at /.well-known/agent-card.json declares your capabilities. llms.txt at your domain root describes your API for LLM consumption. Combined: ~5 points. Time: 2 hours.',
                icon: FileJson,
              },
              {
                step: 'Day 2-3',
                title: 'Ship an MCP server',
                detail: 'Use the @modelcontextprotocol/sdk to wrap your existing API endpoints as MCP tools. Or use AgentHermes auto-generation. Deploy to Vercel/Cloudflare Workers. Register in your agent-card.json. Combined: ~5 points. Time: 4-8 hours.',
                icon: Server,
              },
              {
                step: 'Day 4',
                title: 'Audit and fix error responses',
                detail: 'Test every error path (400, 401, 403, 404, 409, 422, 429, 500) and ensure each returns structured JSON with error code, message, type, and request_id. No HTML. No stack traces. Combined: ~2 points. Time: 3-4 hours.',
                icon: Code2,
              },
              {
                step: 'Day 5',
                title: 'Performance and latency optimization',
                detail: 'Profile your p95 latency. Add edge caching, connection pooling, and query optimization. Target sub-100ms for read endpoints, sub-200ms for writes. Check idempotency support on mutating endpoints. Combined: ~1-2 points. Time: 4-6 hours.',
                icon: Zap,
              },
              {
                step: 'Bonus',
                title: 'Implement x402 micropayments',
                detail: 'The most forward-looking item. x402 support is rare today — which means implementing it gets you points that almost nobody else has. Combined: ~2 points. Time: 1-2 days (more complex).',
                icon: DollarSign,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  {item.step.split(' ')[1] || 'B'}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="h-4 w-4 text-emerald-400" />
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                    <span className="text-xs text-zinc-600">{item.step}</span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY GOLD MATTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            Why Gold Matters: The Agent Trust Hierarchy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Agents prefer capability signals',
                detail: 'When multiple businesses can fulfill a request, agents choose the one with the strongest capability signals. agent-card.json, MCP tools, and structured everything are the strongest signals that exist. Gold businesses get preferred routing.',
              },
              {
                title: 'Trust compounds over time',
                detail: 'Agents that successfully complete workflows with your Gold-tier infrastructure build reinforcement patterns. They route future similar requests to you. This is the agent equivalent of brand loyalty — earned through reliability, not marketing.',
              },
              {
                title: 'Early Gold = market capture',
                detail: 'With only 1 of 500 at Gold today, being among the first 10 Gold-tier businesses in your vertical means agents have no choice but to prefer you. The window is open now. It will close as competitors catch up.',
              },
              {
                title: 'Gold unlocks A2A delegation',
                detail: 'The A2A protocol (agent-to-agent) requires agent-card.json for discovery. Only Gold-tier businesses have it. This means only Gold businesses can participate in multi-agent workflows where one agent delegates a task to your agent. Silver businesses are excluded from this entire interaction pattern.',
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
                title: 'From Bronze to Silver in 30 Days: The Agent Readiness Sprint',
                href: '/blog/bronze-to-silver-guide',
                tag: 'How-To Guide',
                tagColor: 'green',
              },
              {
                title: 'Resend Is the Only Gold — What 499 Businesses Can Learn',
                href: '/blog/resend-only-gold',
                tag: 'Case Study',
                tagColor: 'amber',
              },
              {
                title: 'Why Vercel and Supabase Both Score 69-70',
                href: '/blog/vercel-supabase-agent-readiness',
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
            How close are you to Gold?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see your current score, dimension breakdown,
            and exactly which of the 6 Gold requirements you are missing.
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
