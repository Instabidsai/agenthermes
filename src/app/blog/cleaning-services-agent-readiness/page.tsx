import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  HelpCircle,
  Home,
  Layers,
  Phone,
  Search,
  Server,
  Shield,
  Sparkles,
  SprayCan,
  Store,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Cleaning Services Agent Readiness: Why Maids, Janitors, and Cleaners Can\'t Be Found by AI | AgentHermes',
  description:
    'The $90B US cleaning industry is invisible to AI agents. No public APIs, no structured pricing, phone-only booking. Learn what agent-ready cleaning looks like and who will win the AI home assistant market.',
  keywords: [
    'cleaning services agent readiness',
    'cleaning company AI',
    'maid service MCP server',
    'janitorial agent readiness',
    'cleaning business API',
    'AI booking cleaning',
    'agent economy cleaning',
    'residential cleaning AI',
    'commercial cleaning agent',
  ],
  openGraph: {
    title: 'Cleaning Services Agent Readiness: Why Maids, Janitors, and Cleaners Can\'t Be Found by AI',
    description:
      'The $90B US cleaning industry has zero agent infrastructure. No APIs, no structured pricing, phone-only booking. Here is what agent-ready cleaning looks like.',
    url: 'https://agenthermes.ai/blog/cleaning-services-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cleaning Services Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleaning Services Agent Readiness: Why Cleaners Can\'t Be Found by AI',
    description:
      '$90B industry, zero agent infrastructure. The first cleaning company with an MCP server gets booked by every AI home assistant.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/cleaning-services-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const industryStats = [
  { value: '$90B', label: 'US cleaning industry', icon: DollarSign },
  { value: '1.2M+', label: 'cleaning businesses', icon: Store },
  { value: '~9', label: 'avg agent readiness score', icon: BarChart3 },
  { value: '0', label: 'with MCP servers', icon: Server },
]

const platformScores = [
  { name: 'Thumbtack', score: 38, tier: 'Not Scored', detail: 'Marketplace API but no individual cleaner exposure', color: 'red' },
  { name: 'Yelp', score: 34, tier: 'Not Scored', detail: 'Review data accessible, no booking or availability API', color: 'red' },
  { name: 'Handy', score: 31, tier: 'Not Scored', detail: 'Booking flow exists but fully gated, no public API', color: 'red' },
  { name: 'TaskRabbit', score: 42, tier: 'Bronze', detail: 'REST API exists, OAuth flow, but limited task types', color: 'amber' },
  { name: 'Molly Maid (franchise)', score: 12, tier: 'Not Scored', detail: 'Brochure website, phone-only booking, PDF pricing', color: 'red' },
  { name: 'Independent cleaners', score: 9, tier: 'Not Scored', detail: 'Facebook page or no web presence, zero structured data', color: 'red' },
]

const agentReadyTools = [
  {
    name: 'get_pricing',
    description: 'Returns structured pricing by room count, square footage, cleaning type (standard, deep, move-in/move-out), and add-ons (oven, fridge, windows).',
    example: 'get_pricing({ sqft: 1800, type: "deep", addons: ["oven", "windows"] }) → { base: 220, addons: 45, total: 265, currency: "USD" }',
    icon: DollarSign,
    color: 'emerald',
  },
  {
    name: 'check_availability',
    description: 'Returns open time slots for a given date range, team size, and service area. Agents can check multiple dates in one call.',
    example: 'check_availability({ zip: "78701", date: "2026-04-20", type: "standard" }) → { slots: ["9:00", "11:00", "14:00"], team_size: 2 }',
    icon: Calendar,
    color: 'blue',
  },
  {
    name: 'book_cleaning',
    description: 'Creates a confirmed booking with date, time, address, cleaning type, and payment token. Returns confirmation ID and team assignment.',
    example: 'book_cleaning({ slot: "2026-04-20T09:00", address: "123 Main St", type: "deep", payment_token: "tok_xxx" }) → { confirmation: "CLN-4821" }',
    icon: CheckCircle2,
    color: 'purple',
  },
  {
    name: 'manage_recurring',
    description: 'Creates, modifies, or cancels recurring cleaning schedules. Supports weekly, biweekly, and monthly frequencies with skip and reschedule options.',
    example: 'manage_recurring({ action: "create", frequency: "biweekly", day: "thursday", time: "10:00" }) → { schedule_id: "REC-091", next: "2026-04-24" }',
    icon: TrendingUp,
    color: 'cyan',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do cleaning companies score so low on agent readiness?',
    answer:
      'Cleaning companies rely almost entirely on phone calls, text messages, and marketplace platforms like Thumbtack or Yelp for lead generation. They have no public APIs, no structured pricing data, and no machine-readable service catalogs. The average independent cleaner has a Facebook page or a basic Wix site with a phone number. There is nothing for an AI agent to connect to.',
  },
  {
    question: 'What is the business case for a cleaning company to become agent-ready?',
    answer:
      'AI home assistants are becoming the primary way consumers manage household services. When someone tells Claude or ChatGPT to book a house cleaning, the agent will choose the cleaning company it can actually book — not the one with a nice website. The first cleaning company in each zip code with an MCP server captures 100% of agent-driven bookings for that area. At zero customer acquisition cost.',
  },
  {
    question: 'How does pricing work for cleaning services in an agent context?',
    answer:
      'Most cleaning companies price by square footage, number of rooms, cleaning type (standard, deep, move-in/move-out), and add-ons. This is actually ideal for structured APIs because the pricing is formulaic. A get_pricing() endpoint that accepts square footage and options and returns a total is straightforward to build. The problem is no one has built it yet — pricing lives in the owner\'s head or on a PDF.',
  },
  {
    question: 'Do cleaning marketplaces like Thumbtack help with agent readiness?',
    answer:
      'Partially. Thumbtack, Handy, and TaskRabbit have some API infrastructure, but they own the customer relationship. A cleaning company listed on Thumbtack is discoverable by agents through Thumbtack — not on their own. This is the same disintermediation problem restaurants face with DoorDash. Building your own agent infrastructure means agents book you directly, bypassing marketplace fees of 15-30%.',
  },
  {
    question: 'What about commercial cleaning companies?',
    answer:
      'Commercial cleaning (office buildings, retail spaces, industrial facilities) is a $70B+ segment with even less agent infrastructure than residential. Contracts are negotiated via in-person sales, proposals are PDF documents, and pricing is entirely custom. Agent-ready commercial cleaning needs: facility assessment intake API, proposal generation endpoint, recurring contract management, and inspection report access.',
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

export default function CleaningServicesAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Cleaning Services Agent Readiness: Why Maids, Janitors, and Cleaners Can\'t Be Found by AI',
    description:
      'The $90B US cleaning industry is invisible to AI agents. No public APIs, no structured pricing, phone-only booking. A complete analysis of what agent-ready cleaning looks like.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/cleaning-services-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'cleaning services agent readiness, cleaning company AI, maid service MCP, janitorial agent readiness, AI booking cleaning',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Cleaning Services Agent Readiness',
          item: 'https://agenthermes.ai/blog/cleaning-services-agent-readiness',
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
      title="Cleaning Services Agent Readiness: Why Maids, Janitors, and Cleaners Can't Be Found by AI"
      shareUrl="https://agenthermes.ai/blog/cleaning-services-agent-readiness"
      currentHref="/blog/cleaning-services-agent-readiness"
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
            <span className="text-zinc-400">Cleaning Services Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <SprayCan className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              $90B Industry
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Cleaning Services Agent Readiness:{' '}
            <span className="text-emerald-400">Why Maids, Janitors, and Cleaners Can&apos;t Be Found by AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The US cleaning industry generates <strong className="text-zinc-100">$90 billion per year</strong> across
            residential and commercial segments. Over 1.2 million cleaning businesses operate nationwide. Not a single
            one has an MCP server. When an AI assistant is asked to book a house cleaning, it has nothing to connect to.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            The $90 Billion Industry That Runs on Phone Calls
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Cleaning services are one of the most frequently booked household services in America. Residential
              cleaning alone accounts for over $20 billion annually, with commercial cleaning making up the rest
              of the $90 billion market. Yet the booking experience has barely changed in 30 years.
            </p>
            <p>
              Want to book a house cleaning? Here is what happens today: you search Google or Yelp, find a
              company with good reviews, call their phone number, wait for someone to answer (or leave a
              voicemail), describe your home, negotiate a price, and eventually schedule a date. If you use
              Thumbtack, you submit a request and wait for multiple cleaners to bid — a process that takes
              hours or days.
            </p>
            <p>
              Now imagine asking an AI assistant: &ldquo;Book me a deep cleaning for this Saturday morning,
              3-bedroom house, 1800 square feet.&rdquo; The agent searches for cleaning companies in your zip
              code. It finds nothing. No availability API. No pricing endpoint. No booking interface. The agent
              tells you to call someone manually. The{' '}
              <Link href="/blog/local-business-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                same pattern we see across all local businesses
              </Link>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {industryStats.map((stat) => (
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

      {/* ===== WHY CLEANERS SCORE SO LOW ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Why Cleaning Companies Score Under 15
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes scans show that independent cleaning companies average a score of <strong className="text-zinc-100">9 out of 100</strong> on
              the Agent Readiness Score. That is ARL-0: Dark — completely invisible to the agent economy. Even cleaning
              franchises with corporate websites rarely break 15. Here is why each dimension fails.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { dim: 'D1 Discovery (0.12)', score: '2-5', detail: 'Most cleaners have no website or a basic template site. No robots.txt, no sitemap, no structured data. Facebook pages are not crawlable by agent protocols.', color: 'red' },
              { dim: 'D2 API Quality (0.15)', score: '0', detail: 'Zero public APIs across the entire industry. No REST endpoints, no JSON responses, no structured data of any kind. This is the highest-weighted dimension and every cleaner scores zero.', color: 'red' },
              { dim: 'D3 Onboarding (0.08)', score: '0-2', detail: 'No self-service signup. No API keys. No developer docs. There is nothing to onboard to.', color: 'red' },
              { dim: 'D4 Pricing (0.05)', score: '1-5', detail: 'Some companies show price ranges on their website ("starting at $120"). None publish structured pricing data. Most say "call for a quote" — the worst possible answer for an AI agent.', color: 'red' },
              { dim: 'D6 Data Quality (0.10)', score: '2-8', detail: 'Some franchise sites have Schema.org LocalBusiness markup. Independent cleaners have none. No JSON-LD, no structured service catalogs.', color: 'amber' },
              { dim: 'D9 Agent Experience (0.10)', score: '0', detail: 'No agent-card.json, no llms.txt, no MCP server, no AGENTS.md. The agent experience dimension is a flat zero across the board.', color: 'red' },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.dim}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-zinc-100">{item.dim}</h3>
                    <span className={`text-sm font-mono font-bold ${colors.text}`}>{item.score}/100</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Platform Trap: Thumbtack and Yelp Own Your Customers
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Cleaning companies that appear on Thumbtack, Yelp, or Handy are technically discoverable by
              agents — through those platforms. But this is the same trap restaurants face with DoorDash.
              The platform owns the customer relationship, takes 15-30% in fees, and the cleaning company
              has no direct agent infrastructure of its own. Similar to what we documented in{' '}
              <Link href="/blog/beauty-salon-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                beauty salons
              </Link>, the middleman is more agent-ready than the actual business.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Platform / Business</div>
              <div>Score</div>
              <div>Tier</div>
              <div>Notes</div>
            </div>
            {platformScores.map((row, i) => {
              const colors = getColorClasses(row.color)
              return (
                <div
                  key={row.name}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.name}</div>
                  <div className={`font-mono font-bold ${colors.text}`}>{row.score}</div>
                  <div className="text-zinc-500">{row.tier}</div>
                  <div className="text-zinc-500">{row.detail}</div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The disintermediation opportunity:</strong> A cleaning company with
              its own MCP server bypasses Thumbtack entirely. When an AI agent books a cleaning, it connects directly
              to the company — zero platform fees, zero bidding wars, zero competition on the same listing page.
              The cleaning company with the best agent infrastructure in each zip code wins all agent-driven bookings.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY CLEANING LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Cleaning Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An agent-ready cleaning company exposes four MCP tools that let any AI assistant find, price,
            book, and manage cleaning services without a phone call.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyTools.map((tool) => {
              const colors = getColorClasses(tool.color)
              return (
                <div
                  key={tool.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <tool.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">
                      <code className={`${colors.text} text-base`}>{tool.name}()</code>
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{tool.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{tool.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The cleaning industry is actually well-suited for agent automation. Pricing is formulaic — based
              on square footage, room count, and cleaning type. Availability is time-slot based. Recurring
              schedules are predictable. Unlike industries with complex consultative sales processes, a cleaning
              booking can be fully automated from quote to confirmation.
            </p>
            <p>
              The first cleaning company to deploy these four tools via an MCP server will be bookable by
              every AI home assistant on the market — Claude, ChatGPT, Google Assistant, Alexa. At zero
              customer acquisition cost, compared to the $15-50 per lead that Thumbtack charges today.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AI HOME ASSISTANT PLAY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Home className="h-5 w-5 text-blue-500" />
            The AI Home Assistant Play
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AI home assistants are converging on a single use case: managing your household. Booking
              cleaners, scheduling HVAC maintenance, arranging pest control, hiring movers. Every one of
              these services currently requires a phone call. The AI assistant that can book all of them
              through structured APIs wins the household management market.
            </p>
            <p>
              Apple, Google, Amazon, and OpenAI are all building toward this. When Siri can book a deep
              cleaning for Saturday morning by calling an MCP server, the cleaning companies connected to
              that infrastructure capture every booking. The ones still operating through phone calls and
              Thumbtack bids lose an entire customer acquisition channel.
            </p>
            <p>
              This is not speculative. MCP adoption is accelerating across every category. Developer tools
              went from zero to 10,000+ MCP servers in under two years. Consumer services are next. The
              cleaning company that moves first in each market does not just gain an advantage — it becomes
              the <strong className="text-zinc-100">default option</strong> for every AI-driven booking in
              that geography.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Residential cleaning',
                detail: 'House cleaning, apartment turnover, move-in/move-out deep cleans. Agents need room-count pricing, availability by zip, and same-day booking capability.',
              },
              {
                title: 'Commercial cleaning',
                detail: 'Office buildings, retail spaces, medical facilities. Agents need facility assessment intake, custom proposal generation, and recurring contract management.',
              },
              {
                title: 'Specialty cleaning',
                detail: 'Carpet cleaning, window washing, pressure washing, post-construction cleanup. Agents need service-specific pricing calculators and equipment availability checks.',
              },
              {
                title: 'Recurring maintenance',
                detail: 'Weekly, biweekly, monthly schedules. Agents need schedule management APIs for creating, modifying, skipping, and canceling recurring appointments.',
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
                title: 'Local Business Agent Readiness: Why Your Neighborhood Is Dark to AI',
                href: '/blog/local-business-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Beauty Salon Agent Readiness: Why Booking Apps Own Your Business',
                href: '/blog/beauty-salon-agent-readiness',
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
            Run your cleaning company through the scanner
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your Agent Readiness Score across all 9 dimensions. Find out exactly what is missing
            and how to become the first agent-ready cleaning company in your area.
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
