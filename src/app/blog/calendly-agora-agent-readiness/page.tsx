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
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  MessageSquare,
  Network,
  Phone,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Video,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Calendly and Agora Score 64-72: The Scheduling and Communication Platform Pattern | AgentHermes',
  description:
    'Dual case study: Calendly scores 64 Silver, Agora scores 72 Silver. Single-purpose APIs that do one thing well score higher than do-everything platforms. What both need for Gold: agent-card.json, llms.txt, MCP tools.',
  keywords: [
    'Calendly Agora agent readiness score',
    'Calendly API agent',
    'Agora real-time API',
    'scheduling platform agent readiness',
    'communication API agent readiness',
    'Calendly MCP server',
    'Agora agent readiness',
    'single purpose API pattern',
    'Silver agent readiness',
  ],
  openGraph: {
    title: 'Why Calendly and Agora Score 64-72: The Scheduling and Communication Platform Pattern',
    description:
      'Calendly 64 Silver, Agora 72 Silver. Single-purpose APIs that do one thing well score higher than do-everything platforms. The pattern behind Silver scores.',
    url: 'https://agenthermes.ai/blog/calendly-agora-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why Calendly and Agora Score 64-72 on Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Calendly and Agora Score 64-72: The Scheduling and Communication Platform Pattern',
    description:
      'Single-purpose APIs score higher than do-everything platforms. Calendly and Agora prove the pattern.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/calendly-agora-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const calendlyBreakdown = [
  { dimension: 'D1 Discovery', score: 7, max: 12, note: 'Good SEO, docs indexed. No agent-card.json or llms.txt.' },
  { dimension: 'D2 API Quality', score: 12, max: 15, note: 'REST API with OAuth, webhooks, typed responses. Well-documented.' },
  { dimension: 'D3 Onboarding', score: 6, max: 8, note: 'Self-service for basic tier. API key in minutes.' },
  { dimension: 'D4 Pricing', score: 2, max: 5, note: 'Enterprise pricing gated. Free tier exists but API limited.' },
  { dimension: 'D5 Payment', score: 3, max: 8, note: 'Stripe integration for paid events. No agent-initiated payments.' },
  { dimension: 'D6 Data Quality', score: 8, max: 10, note: 'Strong JSON structure. Calendar data well-typed.' },
  { dimension: 'D7 Security', score: 10, max: 12, note: 'OAuth 2.0, webhook signing, TLS everywhere.' },
  { dimension: 'D8 Reliability', score: 10, max: 13, note: 'CDN-backed, good uptime, proper caching headers.' },
  { dimension: 'D9 Agent Exp', score: 6, max: 10, note: 'No agent-card.json, no MCP server, no llms.txt. Pure REST.' },
]

const agoraBreakdown = [
  { dimension: 'D1 Discovery', score: 8, max: 12, note: 'Excellent docs. Developer hub well-indexed. No agent-card.json.' },
  { dimension: 'D2 API Quality', score: 13, max: 15, note: 'REST + WebSocket + SDK. Real-time channels, recording, moderation.' },
  { dimension: 'D3 Onboarding', score: 7, max: 8, note: 'Self-service signup. Free 10K minutes/month. API key instant.' },
  { dimension: 'D4 Pricing', score: 4, max: 5, note: 'Transparent usage-based pricing. Clear tiers published.' },
  { dimension: 'D5 Payment', score: 4, max: 8, note: 'Usage-based billing. No agent-initiated payment API.' },
  { dimension: 'D6 Data Quality', score: 9, max: 10, note: 'Real-time data well-structured. Event schemas documented.' },
  { dimension: 'D7 Security', score: 11, max: 12, note: 'Token auth, encryption, HIPAA-eligible. Strong security posture.' },
  { dimension: 'D8 Reliability', score: 11, max: 13, note: 'Global edge network. 99.99% SLA. Real-time performance.' },
  { dimension: 'D9 Agent Exp', score: 5, max: 10, note: 'No agent-card.json, no MCP server. SDK-first, not agent-first.' },
]

const singlePurposePattern = [
  {
    trait: 'One Core Function',
    description: 'Calendly schedules meetings. Agora provides real-time communication. Neither tries to be a CRM, project management tool, or marketing platform. Clear boundaries make API design simpler and agent interaction more predictable.',
    icon: Target,
    color: 'emerald',
  },
  {
    trait: 'Developer-First Documentation',
    description: 'Both invest heavily in developer documentation. API references, quickstart guides, SDK examples. Developers building agents can read these docs and integrate in hours, not weeks.',
    icon: Code2,
    color: 'blue',
  },
  {
    trait: 'Self-Service Signup',
    description: 'No sales calls required for basic access. Sign up, get an API key, start building. This is critical for agent frameworks that need to programmatically connect to services.',
    icon: Zap,
    color: 'amber',
  },
  {
    trait: 'Usage-Based Pricing',
    description: 'Pay for what you use. No $50K enterprise contracts for basic API access. Agents can start with small usage and scale. Agora is particularly strong here with 10K free minutes monthly.',
    icon: DollarSign,
    color: 'purple',
  },
]

const goldRequirements = [
  {
    name: 'agent-card.json',
    impact: '+5-8 points',
    description: 'Machine-readable capability declaration at /.well-known/agent-card.json. Tells AI agents what your API can do before they try calling it. Calendly would declare scheduling capabilities. Agora would declare real-time communication capabilities.',
    icon: FileJson,
  },
  {
    name: 'llms.txt',
    impact: '+3-5 points',
    description: 'Natural language description of your API for LLMs. Helps AI models understand your service without parsing API documentation. "Calendly is a scheduling API that creates, reads, and manages calendar events and availability."',
    icon: Bot,
  },
  {
    name: 'MCP Server',
    impact: '+8-12 points',
    description: 'Model Context Protocol server with tools wrapping core API functions. Calendly MCP: check_availability(), book_meeting(), list_event_types(). Agora MCP: create_channel(), get_recording(), list_active_sessions().',
    icon: Server,
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does Agora score higher than Calendly?',
    answer:
      'Agora scores 72 vs Calendly 64 primarily due to stronger D2 API Quality (real-time WebSocket + REST), better D4 Pricing Transparency (usage-based with clear published rates), and higher D7 Security (HIPAA-eligible, token-based auth). Agora is more developer-first in its DNA — the product IS the API. Calendly is a scheduling product that has an API, which is a subtle but important distinction.',
  },
  {
    question: 'What does Silver mean for these platforms?',
    answer:
      'Silver (60-74) means agent frameworks can reliably interact with the service. Agents can schedule meetings through Calendly and create communication channels through Agora. But without agent-native discovery (agent-card.json, MCP server), frameworks need custom integration code. Silver is "usable with effort." Gold is "plug and play."',
  },
  {
    question: 'Could Calendly or Agora reach Gold quickly?',
    answer:
      'Yes. Both have strong foundations. Calendly needs: agent-card.json declaring scheduling capabilities, llms.txt, an MCP server with 5-6 scheduling tools, and transparent API pricing. That is 2-4 weeks of engineering work to go from 64 to 75+. Agora needs similar agent-native files and an MCP server with real-time communication tools.',
  },
  {
    question: 'Why do single-purpose APIs score higher than platforms?',
    answer:
      'Single-purpose APIs have smaller, cleaner API surfaces. Fewer endpoints, clearer documentation, simpler auth flows. An agent interacting with Calendly needs to understand scheduling. An agent interacting with a platform like HubSpot needs to understand CRM, marketing, sales, content, and service — a much harder problem. Complexity reduces agent readiness.',
  },
  {
    question: 'How does Agora compare to Resend, the only Gold scorer?',
    answer:
      'Resend scores 78 Gold — 6 points above Agora. The gap is entirely in D9 Agent Experience. Resend has better developer documentation structure and simpler API surface (email is more straightforward than real-time communication). Both share the single-purpose pattern. If Agora added agent-card.json and an MCP server, it would likely match or exceed Resend.',
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

export default function CalendlyAgoraAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Calendly and Agora Score 64-72: The Scheduling and Communication Platform Pattern',
    description:
      'Dual case study. Calendly 64 Silver, Agora 72 Silver. Single-purpose APIs that do one thing well score higher than do-everything platforms.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/calendly-agora-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1800,
    keywords:
      'Calendly Agora agent readiness score, scheduling API agent, communication platform agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Calendly and Agora Agent Readiness',
          item: 'https://agenthermes.ai/blog/calendly-agora-agent-readiness',
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
      title="Why Calendly and Agora Score 64-72: The Scheduling and Communication Platform Pattern"
      shareUrl="https://agenthermes.ai/blog/calendly-agora-agent-readiness"
      currentHref="/blog/calendly-agora-agent-readiness"
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
            <span className="text-zinc-400">Calendly and Agora Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <BarChart3 className="h-3.5 w-3.5" />
              Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Silver Tier
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Calendly and Agora Score 64-72:{' '}
            <span className="text-emerald-400">The Scheduling and Communication Platform Pattern</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Calendly scores <strong className="text-zinc-100">64 Silver</strong>. Agora scores{' '}
            <strong className="text-zinc-100">72 Silver</strong>. Both are single-purpose APIs that do one
            thing exceptionally well — scheduling and real-time communication respectively. This dual case
            study reveals the pattern:{' '}
            <strong className="text-zinc-100">
              focused APIs consistently outscore do-everything platforms
            </strong>. And both are tantalizingly close to Gold with the same three missing pieces.
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

      {/* ===== THE TWO SCORES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            Two Silver Scores, One Pattern
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Calendly and Agora come from different worlds — scheduling and real-time communication — but
              their agent readiness profiles tell the same story. Both have strong APIs, solid documentation,
              developer-friendly onboarding, and robust security. Both fall short of Gold for the same
              reason: no agent-native discovery infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '64', label: 'Calendly (Silver)', icon: Calendar },
              { value: '72', label: 'Agora (Silver)', icon: Video },
              { value: '78', label: 'Resend (Gold, #1)', icon: TrendingUp },
              { value: '43', label: 'avg across 500', icon: BarChart3 },
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

      {/* ===== CALENDLY DEEP DIVE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Calendly: 64 Silver — The Scheduling API
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Calendly is the default scheduling tool for millions of professionals. Its API lets you
              programmatically manage event types, check availability, create and cancel bookings, and
              receive webhook notifications. For AI agents that need to schedule meetings on behalf of
              users, Calendly is one of the most natural integration targets.
            </p>
            <p>
              Its 64 Silver score reflects a strong API foundation with one critical gap: Calendly was
              built for humans who schedule through a browser widget. The API is an afterthought, not the
              primary interface. Enterprise pricing gates limit agent access to the full feature set.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div>Score</div>
              <div>Max</div>
              <div>Note</div>
            </div>
            {calendlyBreakdown.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className={row.score >= row.max * 0.8 ? 'text-emerald-400' : row.score >= row.max * 0.5 ? 'text-amber-400' : 'text-red-400'}>
                  {row.score}
                </div>
                <div className="text-zinc-500">{row.max}</div>
                <div className="text-zinc-500">{row.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AGORA DEEP DIVE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Video className="h-5 w-5 text-purple-500" />
            Agora: 72 Silver — The Real-Time Communication API
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Agora provides real-time voice, video, and messaging infrastructure used by over 500 million
              monthly active users across apps like Clubhouse and Bunch. Unlike Calendly, Agora&apos;s
              product IS the API — developers build on top of it, not alongside it. This developer-first
              DNA shows in the score.
            </p>
            <p>
              At 72, Agora is the second-highest Silver scorer in our dataset (behind{' '}
              <Link href="/blog/resend-only-gold" className="text-emerald-400 hover:text-emerald-300 underline">
                Resend at 78 Gold
              </Link>). Its strengths are in API quality, security, and reliability — the foundation
              dimensions. The gap to Gold is entirely in agent-native tooling.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div>Score</div>
              <div>Max</div>
              <div>Note</div>
            </div>
            {agoraBreakdown.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className={row.score >= row.max * 0.8 ? 'text-emerald-400' : row.score >= row.max * 0.5 ? 'text-amber-400' : 'text-red-400'}>
                  {row.score}
                </div>
                <div className="text-zinc-500">{row.max}</div>
                <div className="text-zinc-500">{row.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE SINGLE-PURPOSE PATTERN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            The Single-Purpose API Pattern
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Across 500 business scans, a clear pattern emerges: single-purpose APIs that do one thing
              well consistently outscore platforms that try to do everything. Calendly does scheduling.
              Agora does real-time communication. Resend does email.{' '}
              <Link href="/blog/vercel-supabase-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Vercel does deployments
              </Link>. All Silver or Gold.
            </p>
            <p>
              Compare that to all-in-one platforms like HubSpot, Salesforce, or Monday.com that bundle
              CRM, marketing, sales, support, and project management. Their average scores are lower
              despite larger engineering teams. Why?
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {singlePurposePattern.map((trait) => {
              const colors = getColorClasses(trait.color)
              return (
                <div
                  key={trait.trait}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <trait.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{trait.trait}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{trait.description}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The lesson for businesses:</strong> If you cannot make
              your entire platform agent-ready at once, start with your single best API — the one that does
              one thing extremely well. Make that one endpoint discoverable, documented, and agent-accessible.
              Then expand. Single-purpose wins the initial race.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PATH TO GOLD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            What Both Need for Gold: Three Missing Pieces
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Calendly and Agora have the API foundation. Both are missing the same three agent-native
            components. Adding these would push Calendly from 64 to 75+ and Agora from 72 to 80+.
          </p>

          <div className="space-y-4 mb-8">
            {goldRequirements.map((req) => (
              <div
                key={req.name}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <req.icon className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-zinc-100 text-sm">{req.name}</h3>
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {req.impact}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{req.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The math is straightforward. Agent-card.json, llms.txt, and an MCP server combined add
              16-25 points to the Agent Readiness Score. For Calendly, that means going from 64 to 80-89
              (Gold). For Agora, that means going from 72 to 88-97 (Gold to Platinum). The foundation is
              already built — the missing pieces are agent-native wrappers around existing capabilities.
            </p>
            <p>
              Compare this to{' '}
              <Link href="/blog/developer-tools-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                other developer tools
              </Link>{' '}
              that need fundamental API work first. Calendly and Agora are in the enviable position of
              needing only agent discovery infrastructure, not API redesign.
            </p>
          </div>
        </div>
      </section>

      {/* ===== COMPETITIVE CONTEXT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Competitive Context: Who Gets to Gold First?
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              In scheduling, Calendly competes with Cal.com (open source, API-first), SavvyCal, and
              Doodle. Cal.com is the most likely to reach Gold first because its open-source, API-first
              architecture makes adding agent-native tooling natural. Calendly has the market share but
              Cal.com has the architecture advantage.
            </p>
            <p>
              In real-time communication, Agora competes with Twilio, Vonage, and Daily.co. Agora&apos;s 72
              is already the highest in the category. Twilio has broader APIs but more complexity.
              Daily.co is simpler but less featured. The first to ship an MCP server wins the agent
              communication market.
            </p>
            <p>
              The strategic implication: whichever scheduling platform reaches Gold first becomes the
              default way AI agents schedule meetings. Whichever communication platform reaches Gold first
              becomes the default way AI agents establish real-time channels. In the agent economy,
              being second to Gold is the same as being invisible.
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
                title: 'Why Resend Is the Only Business to Score Gold',
                href: '/blog/resend-only-gold',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'Vercel and Supabase Agent Readiness Breakdown',
                href: '/blog/vercel-supabase-agent-readiness',
                tag: 'Case Study',
                tagColor: 'blue',
              },
              {
                title: 'Developer Tools Agent Readiness: The Category Analysis',
                href: '/blog/developer-tools-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
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
            Where does your platform score?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your Agent Readiness Score across all 9 dimensions. Compare against Calendly, Agora,
            and 500 other businesses. Free scan, 60 seconds.
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
              Get My MCP Server
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
