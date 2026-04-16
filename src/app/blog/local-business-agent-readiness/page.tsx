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
  Layers,
  MapPin,
  Phone,
  Search,
  Server,
  Store,
  Target,
  TrendingUp,
  UtensilsCrossed,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Local Business Agent Readiness: The $6.2B Opportunity | AgentHermes',
  description:
    '33 million US small businesses. Zero have MCP servers. The agent economy is about to rewire local commerce and nobody is chasing it. Here is why local businesses score ARL-0 Dark, what agent-ready looks like, and how to claim your zip code.',
  keywords: [
    'local business agent readiness',
    'small business AI agents',
    'agent ready local business',
    'MCP for local business',
    'AI agent local commerce',
    'agent ready plumber',
    'agent ready dentist',
    'local business invisible to AI',
    'Schema.org LocalBusiness agents',
  ],
  openGraph: {
    title: 'Local Business Agent Readiness: The $6.2B Opportunity Nobody Is Chasing',
    description:
      '33M US small businesses. Zero MCP servers. The agent economy is about to rewire local commerce and the first mover in each zip code takes it.',
    url: 'https://agenthermes.ai/blog/local-business-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Local Business Agent Readiness: The $6.2B Opportunity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Local Business Agent Readiness: The $6.2B Opportunity',
    description:
      'Be the agent-ready plumber in your zip code. 33M businesses, zero MCP servers, first mover wins.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/local-business-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const failureModes = [
  {
    name: 'Facebook-only presence',
    description: 'The business lives inside a platform that blocks AI crawlers. No domain, no structured data, no way for an agent to learn hours or services.',
    score: 'ARL-0 Dark',
    icon: Globe,
    color: 'red',
  },
  {
    name: 'Phone-only booking',
    description: 'The only call-to-action is "call us." Agents cannot place voice calls on behalf of users without permissions, so they route the user to a competitor with an online form.',
    score: 'ARL-0 Dark',
    icon: Phone,
    color: 'red',
  },
  {
    name: 'No website at all',
    description: 'Google Business Profile plus Yelp plus Instagram is not a substitute for a canonical site. Without a root domain there is no place to host llms.txt, agent-card.json, or an MCP endpoint.',
    score: 'ARL-0 Dark',
    icon: Search,
    color: 'red',
  },
  {
    name: 'PDF menus and price lists',
    description: 'A PDF is opaque to agents. Prices inside a PDF cannot be parsed reliably, so the agent tells the user to "check the website" — which kills the booking.',
    score: 'ARL-1 Indexed (weak)',
    icon: Layers,
    color: 'amber',
  },
  {
    name: 'Booking locked behind a portal',
    description: 'Third-party booking sites that require login and do not expose an API cut the agent off at the knees. Calendly, Square Appointments, and Fresha are closed silos to most agents.',
    score: 'ARL-1 Indexed',
    icon: Building2,
    color: 'amber',
  },
]

const agentReadyChecklist = [
  { item: 'Canonical domain with TLS', detail: 'yourbusiness.com on HTTPS. No TLS caps your score at 39 — instant Bronze-or-below.' },
  { item: 'Structured hours and location', detail: 'Schema.org LocalBusiness JSON-LD in your homepage head. Agents parse it directly, no scraping.' },
  { item: 'agent-card.json at root', detail: 'A2A v0.3 descriptor declaring your skills — check_availability, get_quote, book_appointment.' },
  { item: 'llms.txt with the essentials', detail: 'Your overview, service list, booking URL, pricing page, and agent-card.json link in one fetch.' },
  { item: 'Public pricing or quote endpoint', detail: 'Either structured prices on a /pricing page or an API that returns a quote for a given job. No "call for a quote" dead ends.' },
  { item: 'Booking via API or MCP tool', detail: 'book_appointment(service, time, contact) returns a confirmation. This is what turns an agent conversation into a paying customer.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do local businesses score so low on Agent Readiness?',
    answer:
      'Most local businesses operate through closed platforms — Facebook pages, Yelp listings, third-party booking tools — with no canonical domain or machine-readable data. Our scans of 500 businesses show 199 below Bronze (score under 40), and the vast majority of those are local service businesses. Without a domain that serves llms.txt, agent-card.json, and structured Schema.org data, an agent has nothing to work with.',
  },
  {
    question: 'Do I need to rebuild my website to become agent-ready?',
    answer:
      'No. You can layer agent readiness on top of almost any existing site. Start with three files at the root of your current domain — llms.txt, agent-card.json, and a robots.txt that allows AI crawlers. Add Schema.org LocalBusiness JSON-LD to your homepage. Plug a booking API through a WooCommerce, Square, or Calendly integration. You can reach ARL-2 Indexable in a weekend without touching your design.',
  },
  {
    question: 'What is the first-mover advantage for local businesses?',
    answer:
      'When an AI agent is asked "find me a plumber in 78704," it will pick the handful of businesses it can actually interact with. Today that is zero to one in most zip codes. The first plumber, dentist, or salon in a zip code to publish an agent-ready site captures every agent-driven lead for that category until a second entrant catches up. That is a 6 to 18 month window where you own the channel.',
  },
  {
    question: 'How much does this cost for a single-location business?',
    answer:
      'The underlying infrastructure is free — llms.txt, agent-card.json, Schema.org markup, and a robots.txt update. AgentHermes auto-generates all four in the Connect wizard. The only costs that may apply are the optional managed MCP server for dynamic tools and whatever e-commerce or booking backend you use. A single-location business can become ARL-2 Indexable for under 100 dollars a month, fully hosted.',
  },
  {
    question: 'Which local verticals benefit first?',
    answer:
      'High-frequency, high-intent verticals win early. Restaurants (reservations), home services (plumbers, HVAC, electricians), medical and dental (appointments), salons and barbers (booking), auto repair (service scheduling), and fitness studios (class signup). Any vertical where a user tells an agent "book me one" benefits the moment a single competitor in their area becomes agent-ready.',
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

export default function LocalBusinessAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Local Business Agent Readiness: The $6.2B Opportunity Nobody Is Chasing',
    description:
      '33 million US small businesses have zero MCP servers. A deep dive on why local businesses score ARL-0 Dark, what agent-ready looks like, and how to be the first-mover in your zip code.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/local-business-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Market Analysis',
    wordCount: 1900,
    keywords:
      'local business agent readiness, small business AI, MCP for local business, agent ready local commerce',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Local Business Agent Readiness',
          item: 'https://agenthermes.ai/blog/local-business-agent-readiness',
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
      title="Local Business Agent Readiness: The $6.2B Opportunity Nobody Is Chasing"
      shareUrl="https://agenthermes.ai/blog/local-business-agent-readiness"
      currentHref="/blog/local-business-agent-readiness"
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
            <span className="text-zinc-400">Local Business Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <MapPin className="h-3.5 w-3.5" />
              Market Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              First-Mover Playbook
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Local Business Agent Readiness:{' '}
            <span className="text-emerald-400">The $6.2B Opportunity Nobody Is Chasing</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            There are 33 million small businesses in the United States. Zero of them have MCP
            servers. That gap is worth an estimated{' '}
            <strong className="text-zinc-100">$6.2 billion a year</strong> in infrastructure, and
            not a single local business in your city is racing to fill it. The first plumber,
            dentist, and salon in each zip code to go agent-ready claims every agent-driven lead
            for the next 12 to 18 months. This is the early-web moment for local commerce.
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

      {/* ===== THE GAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            33 Million Businesses, Zero MCP Servers
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The Small Business Administration puts the count of US small businesses at 33
              million. AgentHermes has scanned 500 across 27 verticals. The distribution is
              brutal: one Gold, 52 Silver, 249 Bronze, and{' '}
              <strong className="text-zinc-100">199 scored below Bronze</strong>. When we filter for
              local businesses specifically — restaurants, trades, clinics, salons, gyms — the
              below-Bronze share climbs to nearly 90%.
            </p>
            <p>
              Developer tools dominate the top of the leaderboard for one reason: they ship APIs,
              docs, and structured data as a core part of their product. Resend (75), Vercel (70),
              Stripe (68) are agent-ready because their customers are developers. Local businesses
              have no such pressure — until the pressure becomes agents making purchase decisions
              on behalf of their users.
            </p>
            <p>
              That pressure is here. Claude and ChatGPT both ship MCP connectors. Users already ask
              agents to book dinner, find an HVAC tech, or schedule a dentist. The agent does its
              best with web search, reads mangled HTML, and hands back a phone number the user
              will not call. The business that made itself callable — really callable, with a
              book_appointment tool — wins the lead.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '33M', label: 'US small businesses', icon: Store },
              { value: '0', label: 'with MCP servers', icon: Server },
              { value: '$6.2B', label: 'infrastructure gap', icon: DollarSign },
              { value: '90%', label: 'of local scans below Bronze', icon: BarChart3 },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className="h-5 w-5 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY LOCAL FAILS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-red-500" />
            Why Local Businesses Score ARL-0 Dark
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              ARL-0 Dark means completely invisible to AI agents. No discovery files, no
              structured data, no API surface area. Here are the five patterns we see again and
              again when scanning local businesses — any one of them caps the score in the bottom
              quartile.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {failureModes.map((mode) => {
              const colors = getColorClasses(mode.color)
              return (
                <div
                  key={mode.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <mode.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-zinc-100">{mode.name}</h3>
                      <span className={`text-xs font-medium ${colors.text}`}>Typical result: {mode.score}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{mode.description}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              These failure modes are not a judgment on the businesses. They made reasonable
              choices for the web of 2015. A Facebook page was free, phone booking worked, and
              PDFs were good enough for a print-era menu. The agent economy changes the math. A
              business that is not addressable by an agent is not findable by the agent&rsquo;s
              user either.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Looks Like for a Local Business
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            You do not need a venture-backed tech stack. Six ingredients separate ARL-0 Dark from
            ARL-3 Actionable. Each one can be shipped in a day. Together they are the checklist
            for the first-mover in your category.
          </p>

          <div className="space-y-3 mb-8">
            {agentReadyChecklist.map((entry, i) => (
              <div
                key={entry.item}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{entry.item}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{entry.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Real example:</strong> a restaurant with TLS, a
              Schema.org LocalBusiness block, an llms.txt that lists hours and menu URLs, an
              agent-card.json declaring check_availability and book_reservation, and a Square or
              OpenTable booking API connection. That stack pushes the business from ARL-0 Dark to
              ARL-3 Actionable. Cost: a Square account and a weekend.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FIRST MOVER ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            The First-Mover Window in Every Zip Code
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When an agent tries to book a service in a zip code and finds only one agent-ready
              business, it routes every relevant user to that business. This is not a preference
              weight — it is a hard routing decision. An agent cannot book with a Facebook page.
              It can book with a Square Appointments API. There is no tie to break.
            </p>
            <p>
              In the 500 businesses we have scanned, we have yet to find a local zip code with two
              agent-ready plumbers. Most have zero. The first to move captures the full share of
              agent-driven demand for the next 12 to 18 months before a second entrant catches up.
              The dynamics look a lot like Google in 2003 — early SEO investment compounded for a
              decade.
            </p>
            <p>
              For consultants, digital agencies, and local marketers this is the highest-leverage
              product of the next three years. An agency that helps 50 dentists in a region become
              agent-ready before any other agency figures out the playbook owns that category. The
              playbook is public, the tools are free, the customers have never heard of it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Restaurants',
                detail: 'First in your city to ship a menu tool plus reservation API captures every "find me a quiet table for two at 7" request.',
                icon: UtensilsCrossed,
              },
              {
                title: 'Home services',
                detail: 'Plumbers, HVAC, electricians, locksmiths. Emergencies are priced high and time-critical. The first agent-ready shop wins urgent jobs.',
                icon: Building2,
              },
              {
                title: 'Medical and dental',
                detail: 'High booking intent, cash-pay available, appointment APIs already common. Zocdoc-adjacent but cheaper and direct.',
                icon: CheckCircle2,
              },
              {
                title: 'Personal services',
                detail: 'Salons, barbers, spas, trainers. Recurring customers, known inventory of time slots, mature booking stacks. Low-hanging fruit.',
                icon: Store,
              },
            ].map((vertical) => (
              <div
                key={vertical.title}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-2 mb-2">
                  <vertical.icon className="h-4 w-4 text-emerald-400" />
                  <h3 className="font-bold text-zinc-100 text-sm">{vertical.title}</h3>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{vertical.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Start by running an{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                Agent Readiness scan
              </Link>{' '}
              on three competitors in your zip code. Most will score below 40. The gap you see in
              that report is the size of the opportunity you can close in a weekend with free
              tools and a Square or WooCommerce connector.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO START ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-500" />
            How to Become Agent-Ready Without Rebuilding Your Site
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              You do not need to rip out your WordPress site or migrate away from Wix. Agent
              readiness is a layer on top of whatever web presence you already have. Here is the
              minimum viable path.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Run a free AgentHermes scan',
                detail: 'Get your current score, identify every missing file, and see a list of competitors in your vertical sorted by score. Most local businesses learn they are ARL-0 Dark in 60 seconds.',
                icon: Search,
              },
              {
                step: '2',
                title: 'Add Schema.org LocalBusiness JSON-LD',
                detail: 'Paste a script tag into your homepage head with your name, hours, address, phone, and service catalog. Agents read this directly without scraping visible HTML.',
                icon: Globe,
              },
              {
                step: '3',
                title: 'Ship agent-card.json and llms.txt',
                detail: 'AgentHermes auto-generates both from your business profile. Upload to the root of your domain or use our /connect wizard to host them for you.',
                icon: Layers,
              },
              {
                step: '4',
                title: 'Connect a booking backend',
                detail: 'WooCommerce, Square Appointments, Calendly, or a vertical-specific tool. AgentHermes ships adapters that expose your calendar as an MCP tool so agents can actually book.',
                icon: Bot,
              },
              {
                step: '5',
                title: 'Publish to the registry',
                detail: 'Your agent card gets a listing in the public AgentHermes registry so any agent, not just ones routed through us, can discover your business.',
                icon: Server,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="h-4 w-4 text-blue-400" />
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              This path takes a weekend to execute manually, or about five minutes through our{' '}
              <Link href="/for" className="text-emerald-400 hover:text-emerald-300 underline">
                vertical builder
              </Link>
              . Either way, you exit ARL-0 Dark and enter the tier where agents can actually
              interact with your business. See the{' '}
              <Link href="/blog/mcp-gap" className="text-emerald-400 hover:text-emerald-300 underline">
                full $6.2B gap analysis
              </Link>{' '}
              and the{' '}
              <Link href="/blog/agent-ready-restaurants" className="text-emerald-400 hover:text-emerald-300 underline">
                restaurant-specific playbook
              </Link>{' '}
              for more depth.
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
                title: 'Zero MCP Servers for Local Businesses — The $6.2B Gap',
                href: '/blog/mcp-gap',
                tag: 'Market Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Agent-Ready Restaurants: The First Movable Local Vertical',
                href: '/blog/agent-ready-restaurants',
                tag: 'Vertical Playbook',
                tagColor: 'emerald',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Diagnostic',
                tagColor: 'red',
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
            Claim your zip code
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness scan, see your score plus your top three competitors, and
            generate every agent-ready file you need in the same session.
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
              href="/for"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              See Your Vertical
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
