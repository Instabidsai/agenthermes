import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  AlertTriangle,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  HelpCircle,
  Lock,
  MapPin,
  Search,
  Server,
  Shield,
  ShoppingCart,
  Sparkles,
  Target,
  Ticket,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Event Ticketing Agent Readiness: Why Ticketmaster and Eventbrite Lock Out AI Booking Agents | AgentHermes',
  description:
    'Event ticketing platforms have wildly different agent readiness. Eventbrite has a public API (~50). Ticketmaster uses dynamic pricing and CAPTCHA walls. Individual venues score near zero. Analysis of the $94B live events market.',
  keywords: [
    'event ticketing agent readiness',
    'Ticketmaster API',
    'Eventbrite API agent',
    'AI booking agent events',
    'event ticketing MCP server',
    'AI concierge events',
    'agent economy ticketing',
    'live events AI agent',
    'SeatGeek API',
  ],
  openGraph: {
    title:
      'Event Ticketing Agent Readiness: Why Ticketmaster and Eventbrite Lock Out AI Booking Agents',
    description:
      'The $94B live events market is mostly locked out of the agent economy. Eventbrite scores ~50, Ticketmaster hides behind CAPTCHAs, and individual venues score near zero.',
    url: 'https://agenthermes.ai/blog/event-ticketing-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Event Ticketing Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Event Ticketing Agent Readiness: Why AI Booking Agents Cannot Buy Tickets',
    description:
      'Eventbrite ~50. Ticketmaster: locked. Individual venues: zero. The $94B live events market vs the agent economy.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/event-ticketing-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const platformScores = [
  {
    name: 'Eventbrite',
    score: '~50',
    tier: 'Bronze',
    tierColor: 'amber',
    strengths: 'Public REST API, event search, OAuth, JSON responses, developer docs',
    weaknesses: 'No MCP server, no agent-card.json, limited purchase flow via API',
  },
  {
    name: 'Ticketmaster',
    score: '~28',
    tier: 'Not Scored',
    tierColor: 'red',
    strengths: 'Discovery API for event search, some venue data',
    weaknesses: 'Locked purchase flow, dynamic pricing, CAPTCHA walls, no sandbox for buying',
  },
  {
    name: 'SeatGeek',
    score: '~38',
    tier: 'Not Scored',
    tierColor: 'red',
    strengths: 'Platform API, event and venue data, performer endpoints',
    weaknesses: 'Reseller-focused, purchase requires partner integration, no public buy endpoint',
  },
  {
    name: 'StubHub',
    score: '~32',
    tier: 'Not Scored',
    tierColor: 'red',
    strengths: 'Listing data available, some structured event info',
    weaknesses: 'API deprecated or heavily restricted, no agent-facing purchase flow',
  },
  {
    name: 'Individual Venues',
    score: '~5',
    tier: 'ARL-0 Dark',
    tierColor: 'red',
    strengths: 'None — most have a basic website with event listings',
    weaknesses: 'No API, no structured data, phone/walk-up only, PDF flyers, no online booking',
  },
]

const agentReadyFeatures = [
  {
    feature: 'Structured Event Catalog API',
    description:
      'A searchable endpoint returning events with date, time, venue, genre, price range, and availability status in JSON. AI concierge agents need this to recommend events matching user preferences.',
    impact: 'D2 API Quality + D6 Data Quality',
    icon: Search,
    color: 'emerald',
  },
  {
    feature: 'Real-Time Availability Endpoint',
    description:
      'check_availability({ event_id, quantity }) returning exact seat counts, section availability, and price tiers. Without this, agents cannot tell users if tickets are actually available before starting a purchase.',
    impact: 'D2 API Quality + D8 Reliability',
    icon: Zap,
    color: 'blue',
  },
  {
    feature: 'Automated Ticket Purchase API',
    description:
      'A transactional endpoint that accepts event_id, seat selection, quantity, and payment token. Returns a confirmed booking with order ID and e-ticket delivery. This is the critical missing piece for most platforms.',
    impact: 'D5 Payment + D9 Agent Experience',
    icon: ShoppingCart,
    color: 'purple',
  },
  {
    feature: 'Seat Selection Endpoint',
    description:
      'get_seating({ event_id, section? }) returning a structured seat map with available seats, price per seat, and view quality indicators. Lets agents optimize for user preferences like aisle seats or front row.',
    impact: 'D6 Data Quality + D9 Agent Experience',
    icon: MapPin,
    color: 'cyan',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Can AI agents buy concert tickets today?',
    answer:
      'Mostly no. While some platforms like Eventbrite expose APIs that let agents search for events, the actual purchase flow is locked behind CAPTCHAs, dynamic pricing, and human-only checkout processes on almost every major ticketing platform. Agents can find events but cannot complete the transaction.',
  },
  {
    question: 'Why does Ticketmaster block automated purchases?',
    answer:
      'Ticketmaster uses dynamic pricing, CAPTCHA challenges, queue systems, and bot detection specifically to prevent automated ticket buying. This was designed to combat scalper bots, but it also blocks legitimate AI booking agents acting on behalf of users. The anti-bot infrastructure makes no distinction between scalpers and AI concierges.',
  },
  {
    question: 'What is an AI event concierge agent?',
    answer:
      'An AI event concierge is an agent that manages entertainment for a user. It knows your music preferences, checks for upcoming shows in your area, compares prices across platforms, and books tickets when it finds a match. Think of it as a personal assistant that never misses a concert announcement. These agents need structured APIs to function.',
  },
  {
    question: 'How would an MCP server help a local venue?',
    answer:
      'An MCP server for a local venue would expose tools like get_upcoming_events(), check_availability(), and purchase_tickets(). AI agents could then discover the venue, check what is playing, see if seats are available, and book directly. Without an MCP server, the venue is invisible to every AI assistant in the world.',
  },
  {
    question: 'Will ticketing platforms ever become agent-ready?',
    answer:
      'Market pressure will force it. As AI agents become the primary way people discover and book entertainment, platforms that lock agents out will lose market share to those that let agents in. The question is whether incumbents adapt or whether new agent-native ticketing platforms emerge to capture the demand.',
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

export default function EventTicketingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Event Ticketing Agent Readiness: Why Ticketmaster and Eventbrite Lock Out AI Booking Agents',
    description:
      'The $94B live events market has wildly different agent readiness levels. Eventbrite scores ~50 with a public API. Ticketmaster hides behind CAPTCHAs and dynamic pricing. Individual venues score near zero.',
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
    mainEntityOfPage:
      'https://agenthermes.ai/blog/event-ticketing-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'event ticketing agent readiness, Ticketmaster API, Eventbrite API, AI booking agent, event concierge agent, MCP server ticketing',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://agenthermes.ai',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://agenthermes.ai/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Event Ticketing Agent Readiness',
          item: 'https://agenthermes.ai/blog/event-ticketing-agent-readiness',
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
      title="Event Ticketing Agent Readiness: Why Ticketmaster and Eventbrite Lock Out AI Booking Agents"
      shareUrl="https://agenthermes.ai/blog/event-ticketing-agent-readiness"
      currentHref="/blog/event-ticketing-agent-readiness"
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
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-zinc-300 transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-zinc-400">
                Event Ticketing Agent Readiness
              </span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <Ticket className="h-3.5 w-3.5" />
                Vertical Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                Live Events
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Event Ticketing Agent Readiness:{' '}
              <span className="text-emerald-400">
                Why Ticketmaster and Eventbrite Lock Out AI Booking Agents
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              The global live events market is worth{' '}
              <strong className="text-zinc-100">$94 billion</strong>. AI
              concierge agents want to search events, compare prices, and book
              tickets on behalf of users. But most ticketing platforms either
              lock their APIs, hide behind CAPTCHA walls, or have no API at all.
              The result: an entire industry that AI agents cannot transact with.
            </p>

            {/* Author byline */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
              <div className="author-avatar">AH</div>
              <div>
                <div className="text-sm font-semibold text-zinc-200">
                  AgentHermes Research
                </div>
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

        {/* ===== THE PROBLEM ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-500" />
              The Ticketing Agent Readiness Problem
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Imagine asking your AI assistant: &ldquo;Find me two tickets to
                a jazz show this Saturday within 30 miles, under $80 each, aisle
                seats preferred.&rdquo; The agent understands the request
                perfectly. It knows your location, your music preferences, your
                budget. But it cannot complete the task because{' '}
                <strong className="text-zinc-100">
                  no ticketing platform gives it the structured access it needs
                </strong>
                .
              </p>
              <p>
                Event ticketing is one of the most fragmented verticals in the
                agent economy. The major platforms (Ticketmaster, Eventbrite,
                SeatGeek, StubHub) each take a different approach to API access,
                and individual venues and promoters typically have no digital
                infrastructure at all. The result is a{' '}
                <strong className="text-zinc-100">
                  massive gap between what AI agents could do and what ticketing
                  infrastructure lets them do
                </strong>
                .
              </p>
              <p>
                We scanned the major ticketing platforms and representative
                venues across the US. The scores tell the story: platforms range
                from Bronze to Not Scored, and individual venues score near
                zero.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '$94B', label: 'Global live events market', icon: DollarSign },
                { value: '~50', label: 'Eventbrite (highest score)', icon: TrendingUp },
                { value: '~5', label: 'Individual venues (avg)', icon: MapPin },
                { value: '0', label: 'Platforms with MCP servers', icon: Server },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PLATFORM SCORECARD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              Platform-by-Platform Scorecard
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Each platform takes a fundamentally different approach to API
              access. The gap between the most open (Eventbrite) and the most
              closed (individual venues) is enormous.
            </p>

            <div className="space-y-4 mb-8">
              {platformScores.map((platform) => {
                const colors = getColorClasses(platform.tierColor)
                return (
                  <div
                    key={platform.name}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-zinc-100">
                        {platform.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-zinc-100">
                          {platform.score}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-semibold`}
                        >
                          {platform.tier}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1 font-medium">
                          Strengths
                        </p>
                        <p className="text-sm text-emerald-400">
                          {platform.strengths}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1 font-medium">
                          Weaknesses
                        </p>
                        <p className="text-sm text-red-400">
                          {platform.weaknesses}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== WHY TICKETMASTER IS LOCKED ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-500" />
              Why Ticketmaster Is the Hardest Platform for AI Agents
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Ticketmaster controls approximately 80% of major venue ticketing
                in the US. It has a Discovery API that lets developers search
                events, venues, and attractions. But the{' '}
                <strong className="text-zinc-100">
                  actual ticket purchase flow is completely locked
                </strong>
                .
              </p>
              <p>
                The anti-bot infrastructure Ticketmaster built to combat
                scalpers is now the same infrastructure that blocks legitimate AI
                agents. Dynamic pricing changes ticket costs in real-time based
                on demand. CAPTCHA challenges require human visual verification.
                Queue systems force sequential waiting that agents cannot
                bypass. Verified Fan programs require pre-registration tied to
                individual human identities.
              </p>
              <p>
                From an agent readiness perspective, Ticketmaster is a
                read-only platform. Agents can discover events (D2 partial
                credit) but cannot transact (D5 zero, D9 zero). This is the
                defining pattern of event ticketing:{' '}
                <strong className="text-zinc-100">
                  discovery is partially open, transactions are completely
                  closed
                </strong>
                .
              </p>
            </div>

            <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20 mb-8">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-red-400">
                  The scalper problem creates the agent problem:
                </strong>{' '}
                Every anti-bot measure designed to stop scalpers also stops AI
                booking agents. The industry needs a new approach: verified
                agent identity (like{' '}
                <Link
                  href="/blog/agent-card-json-guide"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  agent-card.json
                </Link>
                ) that lets platforms distinguish between scalper bots and
                legitimate AI concierges acting on behalf of authenticated
                users.
              </p>
            </div>
          </div>
        </section>

        {/* ===== EVENTBRITE: THE EXCEPTION ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Eventbrite: The Closest to Agent-Ready
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Eventbrite stands out as the most agent-accessible ticketing
                platform. It offers a public REST API with OAuth authentication,
                event search endpoints that return structured JSON, and
                developer documentation that is actually maintained. An AI agent
                can search for events by category, location, date, and price
                range and receive clean, parseable responses.
              </p>
              <p>
                Where Eventbrite falls short is the purchase flow. While the
                API supports event creation and management (useful for
                organizers), the consumer ticket purchase still routes through
                the web checkout. There is no{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                  purchase_ticket()
                </code>{' '}
                endpoint that accepts a payment token and returns a confirmed
                booking. Eventbrite also lacks an MCP server, agent-card.json,
                and llms.txt, which keeps it in Bronze territory rather than
                Silver.
              </p>
              <p>
                Still, Eventbrite is the model for what other ticketing
                platforms could become. If it added an MCP server with purchase
                tools, it would jump to Silver overnight and capture every
                AI-driven event booking in its category.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT AGENT-READY TICKETING LOOKS LIKE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-500" />
              What Agent-Ready Event Ticketing Looks Like
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              An AI event concierge agent needs four capabilities from a
              ticketing platform. Without all four, the agent experience is
              broken.
            </p>

            <div className="space-y-4 mb-8">
              {agentReadyFeatures.map((item) => {
                const colors = getColorClasses(item.color)
                return (
                  <div
                    key={item.feature}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <item.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-100">
                          {item.feature}
                        </h3>
                        <span className="text-xs text-zinc-500">
                          Impacts: {item.impact}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== RESELLER VS PRIMARY MARKET ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Primary vs Reseller Markets: A Split Agent Economy
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The ticketing industry has two distinct layers with very
                different agent readiness profiles. The{' '}
                <strong className="text-zinc-100">primary market</strong>{' '}
                (Ticketmaster, Eventbrite, AXS) sells tickets directly from
                venues and promoters. The{' '}
                <strong className="text-zinc-100">reseller market</strong>{' '}
                (StubHub, SeatGeek, Vivid Seats) facilitates secondary sales
                between fans.
              </p>
              <p>
                Reseller platforms are somewhat more agent-friendly because
                their business model depends on facilitating transactions rather
                than controlling access. SeatGeek has a Partner API that
                supports listing search and some purchase flows for approved
                integrators. StubHub historically had a robust API before
                restricting it.
              </p>
              <p>
                But even reseller APIs are restricted to approved partners, not
                open to any AI agent. The{' '}
                <Link
                  href="/blog/media-entertainment-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  broader pattern in media and entertainment
                </Link>{' '}
                holds true: platforms that make money from transactions are more
                likely to open APIs than platforms that make money from
                controlling access.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">
                  Primary Market (Ticketmaster, AXS)
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Controls venue exclusivity. Business model is monopoly access
                  + fees. No incentive to open APIs because controlling the
                  funnel IS the product. Agent readiness: search-only, no
                  purchase.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">
                  Reseller Market (SeatGeek, StubHub)
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Revenue scales with transaction volume. More incentive to let
                  agents drive purchases. Partner APIs exist but gated. Closest
                  to agent-transactable in ticketing today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== INDIVIDUAL VENUES ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              Individual Venues and Promoters: Score Near Zero
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Below the platform layer sits a vast ecosystem of individual
                venues, independent promoters, comedy clubs, theater companies,
                and festival organizers. These businesses have{' '}
                <strong className="text-zinc-100">
                  zero agent infrastructure
                </strong>
                . Their event listings are on Facebook, their ticket sales are
                through embedded widgets from platforms, and their schedules are
                published as PDF flyers or Instagram posts.
              </p>
              <p>
                An AI agent trying to find &ldquo;comedy shows this weekend in
                Austin&rdquo; cannot discover these venues because there is no
                structured data to query. No API, no Schema.org Event markup, no
                JSON-LD, no calendar feed. The venue exists in the physical
                world and on social media, but it is{' '}
                <strong className="text-zinc-100">
                  completely dark to the agent economy
                </strong>
                .
              </p>
              <p>
                This mirrors the pattern we see in{' '}
                <Link
                  href="/blog/travel-hospitality-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  travel and hospitality
                </Link>
                : the big platforms have APIs, but the individual businesses
                that actually deliver the experience have nothing. AgentHermes
                exists to close this gap by auto-generating MCP servers for
                these businesses.
              </p>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section
          id="faq"
          className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50"
        >
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
                  <h3 className="text-base font-bold text-zinc-100 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== RELATED ARTICLES ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Continue Reading
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title:
                    'Media and Entertainment Agent Readiness',
                  href: '/blog/media-entertainment-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Travel and Hospitality Agent Readiness',
                  href: '/blog/travel-hospitality-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
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
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mb-3`}
                    >
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
              Is your event platform agent-ready?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Scan your ticketing platform or venue website in 60 seconds. See
              your Agent Readiness Score across all 9 dimensions and find out
              what AI booking agents see when they look at your business.
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
                Connect My Venue
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </BlogArticleWrapper>
  )
}
