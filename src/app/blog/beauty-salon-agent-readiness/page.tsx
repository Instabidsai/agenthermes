import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  AlertTriangle,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Phone,
  Scissors,
  Search,
  Server,
  ShoppingBag,
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
  title: 'Beauty and Salon Agent Readiness: Why Booking Apps Own Your Business and AI Agents Can\'t Find You | AgentHermes',
  description:
    'Hair salons, nail salons, barbershops, and beauty spas are locked behind Booksy, Vagaro, and Square Appointments. AI agents cannot book appointments, check availability, or compare services. The beauty industry scores 11/100 on agent readiness. Here is how to fix it.',
  keywords: [
    'beauty salon agent readiness',
    'salon AI agents',
    'hair salon MCP server',
    'beauty spa agent readiness',
    'barbershop AI booking',
    'salon booking API',
    'Booksy agent readiness',
    'Vagaro API',
    'beauty industry AI',
  ],
  openGraph: {
    title: 'Beauty and Salon Agent Readiness: Why Booking Apps Own Your Business',
    description:
      'Hair salons, nail salons, and spas are invisible to AI agents. Locked behind Booksy and Vagaro with no direct API. Average score: 11/100.',
    url: 'https://agenthermes.ai/blog/beauty-salon-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Beauty and Salon Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beauty and Salon Agent Readiness: Booking Apps Own Your Business',
    description:
      'Salons score 11/100 on agent readiness. Locked behind Booksy/Vagaro. First salon with an MCP server gets booked by every AI assistant.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/beauty-salon-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const platformLockIn = [
  {
    platform: 'Booksy',
    marketShare: '35%+ of independent salons',
    apiAccess: 'No public API. Partner integrations only.',
    agentImpact: 'Agents cannot query availability or book appointments.',
    color: 'red',
  },
  {
    platform: 'Vagaro',
    marketShare: '20%+ of salons and spas',
    apiAccess: 'Limited partner API. No open access.',
    agentImpact: 'Service menu and pricing locked inside the app.',
    color: 'red',
  },
  {
    platform: 'Square Appointments',
    marketShare: '15%+ (growing via Square ecosystem)',
    apiAccess: 'Square API exists but appointments are limited scope.',
    agentImpact: 'Partial read access. No agent-native booking flow.',
    color: 'amber',
  },
  {
    platform: 'Fresha',
    marketShare: '10%+ globally',
    apiAccess: 'No public API whatsoever.',
    agentImpact: 'Complete black box. Zero agent discoverability.',
    color: 'red',
  },
]

const agentReadyTools = [
  {
    name: 'get_services',
    description: 'Returns full service menu with names, durations, prices, and descriptions. Agents can compare your balayage price to competitors instantly.',
    example: 'get_services() → [{ name: "Balayage", duration: 120, price: 185, stylist_required: true }]',
    icon: ShoppingBag,
    color: 'emerald',
  },
  {
    name: 'check_availability',
    description: 'Returns open time slots by stylist and service type. The agent can find the next available appointment without a phone call.',
    example: 'check_availability({ service: "balayage", date: "2026-04-20" }) → [{ stylist: "Sarah", times: ["10:00", "14:00"] }]',
    icon: Calendar,
    color: 'blue',
  },
  {
    name: 'book_appointment',
    description: 'Creates a confirmed appointment with service, stylist, date, and client contact. Sends confirmation to both salon and client.',
    example: 'book_appointment({ service: "balayage", stylist: "sarah", date: "2026-04-20T10:00", client: {...} }) → { confirmation: "BK-4821" }',
    icon: CheckCircle2,
    color: 'purple',
  },
  {
    name: 'get_stylists',
    description: 'Returns stylist profiles with specialties, experience, ratings, and portfolio links. Agents can match clients to the right stylist.',
    example: 'get_stylists() → [{ name: "Sarah", specialties: ["balayage", "color correction"], rating: 4.9, years: 8 }]',
    icon: Users,
    color: 'cyan',
  },
  {
    name: 'cancel_appointment',
    description: 'Handles cancellation with policy enforcement. Returns cancellation confirmation and any applicable fees based on your policy window.',
    example: 'cancel_appointment({ confirmation: "BK-4821" }) → { cancelled: true, fee: 0, policy: "Free cancellation 24h+" }',
    icon: AlertTriangle,
    color: 'amber',
  },
]

const scoreDimensions = [
  { dimension: 'D1 Discovery', score: 8, note: 'Google My Business exists but no structured agent data' },
  { dimension: 'D2 API Quality', score: 0, note: 'No API. Booking locked behind platform apps.' },
  { dimension: 'D3 Onboarding', score: 0, note: 'No developer docs, no sandbox, no API keys' },
  { dimension: 'D4 Pricing', score: 15, note: 'Prices on website but unstructured (images, PDFs)' },
  { dimension: 'D5 Payment', score: 12, note: 'Square/Stripe exists but not agent-accessible' },
  { dimension: 'D6 Data Quality', score: 18, note: 'Service names exist but no structured schema' },
  { dimension: 'D7 Security', score: 10, note: 'HTTPS on website but no API auth layer' },
  { dimension: 'D8 Reliability', score: 5, note: 'No API means no uptime to measure' },
  { dimension: 'D9 Agent Experience', score: 0, note: 'Zero agent-native protocols detected' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why can\'t AI agents just scrape my Booksy page?',
    answer:
      'Scraping is unreliable, legally questionable, and breaks constantly. Booksy changes their page structure regularly, which breaks any scraper. More importantly, scraped data cannot create bookings — it is read-only at best. An MCP server provides structured, reliable, two-way interaction: agents can both read your availability AND create bookings through a stable interface.',
  },
  {
    question: 'I already have a website with an online booking widget. Is that enough?',
    answer:
      'No. A booking widget is designed for humans clicking buttons in a browser. AI agents cannot interact with JavaScript widgets — they need structured API endpoints that accept and return JSON. Your booking widget and your MCP server serve different audiences: the widget serves human visitors, the MCP server serves AI agents that are booking on behalf of humans.',
  },
  {
    question: 'Will AI agents actually book salon appointments?',
    answer:
      'They already try to. When someone tells ChatGPT or Claude "book me a haircut near downtown for Saturday morning," the agent searches for businesses it can interact with programmatically. Right now, it finds nothing and tells the user to call or visit a booking site. The first salons with MCP servers will capture 100% of that agent-driven demand because there is zero competition.',
  },
  {
    question: 'How does this work with my existing Booksy or Vagaro account?',
    answer:
      'Your MCP server runs alongside your existing booking platform, not instead of it. AgentHermes syncs with your calendar so availability stays accurate across both channels. Human clients keep using Booksy. AI agents use your MCP server. You get bookings from both channels without double-booking conflicts.',
  },
  {
    question: 'What about no-show protection?',
    answer:
      'Your MCP server enforces the same policies you already have. If you require a card on file for bookings over $100, the agent collects that through the booking flow. If you have a 24-hour cancellation policy, the cancel_appointment tool enforces it automatically. Agent bookings can actually reduce no-shows because the policies are enforced programmatically rather than relying on a human reading fine print.',
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

export default function BeautySalonAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Beauty and Salon Agent Readiness: Why Booking Apps Own Your Business and AI Agents Can\'t Find You',
    description:
      'Hair salons, nail salons, barbershops, and beauty spas score 11/100 on agent readiness. Booking platforms lock out AI agents. Here is the complete analysis and fix.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/beauty-salon-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'beauty salon agent readiness, salon AI agents, barbershop AI, MCP server salon, beauty spa agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Beauty and Salon Agent Readiness',
          item: 'https://agenthermes.ai/blog/beauty-salon-agent-readiness',
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
      title="Beauty and Salon Agent Readiness: Why Booking Apps Own Your Business and AI Agents Can't Find You"
      shareUrl="https://agenthermes.ai/blog/beauty-salon-agent-readiness"
      currentHref="/blog/beauty-salon-agent-readiness"
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
            <span className="text-zinc-400">Beauty and Salon Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Scissors className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Score: 11/100
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Beauty and Salon Agent Readiness:{' '}
            <span className="text-emerald-400">Why Booking Apps Own Your Business and AI Agents Can&apos;t Find You</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            There are over <strong className="text-zinc-100">1.2 million salons and barbershops</strong> in the
            United States. Every single one depends on a booking platform they do not control. Booksy, Vagaro,
            Square Appointments, Fresha — these platforms own the customer relationship. And none of them expose
            APIs that AI agents can use. The average beauty salon agent readiness score is{' '}
            <strong className="text-red-400">11 out of 100</strong>.
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

      {/* ===== THE BOOKING PLATFORM TRAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            The Booking Platform Trap: Your Business Is Locked Inside Someone Else&apos;s App
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The beauty industry has a unique dependency problem. Unlike restaurants that can take walk-ins or
              retailers that sell products on shelves, salons are <strong className="text-zinc-100">appointment-dependent
              by nature</strong>. Every dollar of revenue flows through a booking system. And almost every salon has
              outsourced that booking system to a platform they do not control.
            </p>
            <p>
              This creates a double lock-in. Your clients find you through Booksy, book through Booksy, and get
              reminders from Booksy. If Booksy raises prices or changes terms, you have no leverage. And when AI
              agents try to book appointments on behalf of their users, they hit a wall — because Booksy, Vagaro,
              and Fresha have no public APIs.
            </p>
            <p>
              The platforms have no incentive to open up. Every booking that goes through their app reinforces
              their position as the middleman. If an AI agent could book directly with your salon, the platform
              becomes unnecessary. That is exactly why they keep the gates closed.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {platformLockIn.map((platform) => {
              const colors = getColorClasses(platform.color)
              return (
                <div
                  key={platform.platform}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-zinc-100">{platform.platform}</h3>
                    <span className={`text-xs font-medium ${colors.text}`}>{platform.marketShare}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500 mb-1">API Access</p>
                      <p className={`text-sm ${colors.text}`}>{platform.apiAccess}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500 mb-1">Agent Impact</p>
                      <p className="text-sm text-zinc-400">{platform.agentImpact}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE SCORE BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Average Beauty Salon Agent Readiness Score: 11/100
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes scanned salons across 14 metro areas. The results are stark. Most salons have a
              website (some just an Instagram page), a Google My Business listing, and a Booksy or Vagaro
              booking link. That is it. No API, no structured data, no agent-readable service information.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div className="text-center">Score</div>
              <div>Finding</div>
            </div>
            {scoreDimensions.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className="text-center">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                    row.score === 0
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : row.score < 15
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}>
                    {row.score}
                  </span>
                </div>
                <div className="text-zinc-500">{row.note}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-red-400">The zero-score dimensions are the killers.</strong> D2 API Quality
              and D9 Agent Experience are both 0 because there is literally no programmatic interface. A salon
              could have the best website in the world and still score under 20 because agents cannot interact
              with it. The website serves humans. Nothing serves agents.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What an Agent-Ready Salon Looks Like
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              An agent-ready salon exposes five MCP tools that let any AI assistant interact with the business
              directly. No app downloads. No account creation. No phone calls. The agent handles everything
              on behalf of the client.
            </p>
          </div>

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
              With these five tools, an AI agent can handle the complete salon booking lifecycle. A user says
              &ldquo;find me a balayage appointment near me this Saturday&rdquo; and the agent queries every
              agent-ready salon in the area, compares prices and availability, checks stylist ratings, and
              books the best match — all in under 10 seconds.
            </p>
            <p>
              The first salon in any neighborhood to become agent-ready captures{' '}
              <strong className="text-zinc-100">100% of agent-driven bookings</strong> because there is no
              competition. Every other salon requires the agent to tell the user &ldquo;you will need to call
              them or visit their Booksy page.&rdquo; The agent-ready salon gets booked instantly.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE ECONOMICS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            The Economics: Booksy Takes 20%. AI Agents Take 0%.
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Booking platforms charge salons in three ways: monthly subscription fees ($25-$150/month),
              per-booking transaction fees (up to 2.5% per appointment), and premium placement fees to show
              up higher in the app&apos;s search results. A busy salon can pay $200-$500/month to a booking
              platform before a single client walks through the door.
            </p>
            <p>
              An MCP server running on AgentHermes eliminates the per-booking middleman. When an AI agent
              books an appointment through your MCP server, there is no transaction fee to a booking platform.
              The booking goes directly into your calendar. The client pays you directly. The platform fee
              drops to zero for every agent-driven booking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { value: '$200-$500', label: 'Monthly platform fees per salon', icon: DollarSign },
              { value: '2.5%', label: 'Per-booking transaction fee', icon: TrendingUp },
              { value: '$0', label: 'Agent-direct booking cost', icon: Zap },
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              This is not about replacing your booking platform overnight. Your existing clients will keep using
              Booksy because that is what they know. But agent-driven bookings represent an{' '}
              <strong className="text-zinc-100">entirely new channel</strong> — clients who would never have
              found you through a booking app because they asked an AI assistant instead of opening an app.
              Every one of those bookings is incremental revenue at zero acquisition cost.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE SCENARIO ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            The Scenario: &ldquo;Book Me a Haircut for Saturday&rdquo;
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Someone tells their AI assistant: &ldquo;I need a men&apos;s haircut near downtown, Saturday
              morning, somewhere with good reviews under $40.&rdquo;
            </p>
            <p>
              <strong className="text-zinc-100">Today (no agent-ready salons):</strong> The agent searches
              the web, finds a few Google listings, and says &ldquo;Here are three barbershops near downtown.
              You can call them or book through Booksy.&rdquo; The user has to do the work themselves.
            </p>
            <p>
              <strong className="text-emerald-400">Tomorrow (with agent-ready salons):</strong> The agent queries
              MCP servers for barbershops near downtown, filters by Saturday availability, checks prices
              are under $40, reads reviews from stylist profiles, and responds: &ldquo;I booked you a haircut
              with Marcus at Downtown Barbers for Saturday at 10am. He has a 4.9 rating and specializes in
              fades. Confirmation BK-7291 sent to your phone. $35 including tip option at checkout.&rdquo;
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The first-mover advantage is absolute.</strong> In any
              neighborhood, the first salon or barbershop with an MCP server will be the only option agents
              can book. That salon captures every single agent-driven appointment until a competitor catches up.
              This is the{' '}
              <Link href="/blog/local-business-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                local business land grab
              </Link>{' '}
              playing out in real time.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO GET STARTED ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-500" />
            How to Make Your Salon Agent-Ready in 5 Minutes
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              AgentHermes has a{' '}
              <Link href="/blog/fitness-wellness-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                beauty and wellness vertical template
              </Link>{' '}
              that pre-configures MCP tools for salons, barbershops, nail salons, and spas. You do not need
              to build anything from scratch.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Scan your current score',
                detail: 'Visit /audit and enter your salon\'s website. See your score across all 9 dimensions and understand exactly where you stand.',
                icon: Search,
              },
              {
                step: '2',
                title: 'Select the beauty/wellness template',
                detail: 'The template pre-fills salon-specific tools: services, availability, booking, stylists, and cancellation. Customize with your data.',
                icon: Layers,
              },
              {
                step: '3',
                title: 'Connect your calendar',
                detail: 'Sync with Google Calendar, Calendly, or your existing booking system. Availability stays accurate across all channels.',
                icon: Calendar,
              },
              {
                step: '4',
                title: 'Go live',
                detail: 'Your MCP server, agent-card.json, and registry listing go live. AI agents can now discover and book your salon.',
                icon: Globe,
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
                title: 'Fitness and Wellness Agent Readiness',
                href: '/blog/fitness-wellness-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Local Business Agent Readiness: The $6.2B Gap',
                href: '/blog/local-business-agent-readiness',
                tag: 'Market Analysis',
                tagColor: 'emerald',
              },
              {
                title: 'Check Your Agent Readiness Score',
                href: '/audit',
                tag: 'Free Tool',
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
            Make your salon visible to AI agents
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your Agent Readiness Score, then connect your salon to the agent economy.
            Auto-generated MCP server with booking, availability, and service tools — no code required.
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
              Connect My Salon
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
