import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  HelpCircle,
  MapPin,
  Phone,
  Search,
  Server,
  Shield,
  Sparkles,
  TrendingUp,
  Wrench,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Automotive Agent Readiness: Why Car Dealerships and Auto Services Score Under 15 | AgentHermes',
  description:
    'Automotive businesses average under 15 on the Agent Readiness Score. Inventory on third-party platforms, pricing hidden behind "call for quote," service booking phone-only. The first agent-ready dealer wins.',
  keywords: [
    'automotive dealership agent readiness',
    'car dealership AI agents',
    'auto service agent readiness',
    'automotive API',
    'agent readiness automotive',
    'car inventory AI',
    'dealership MCP server',
    'automotive digital transformation',
  ],
  openGraph: {
    title: 'Automotive Agent Readiness: Why Car Dealerships and Auto Services Score Under 15',
    description:
      'Automotive businesses average under 15 on the Agent Readiness Score. Inventory, pricing, and booking are all invisible to AI agents.',
    url: 'https://agenthermes.ai/blog/automotive-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Automotive Agent Readiness: Why Car Dealerships and Auto Services Score Under 15',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automotive Agent Readiness: Why Car Dealerships Score Under 15',
    description:
      'Car dealerships are marketing brochures, not agent-callable APIs. The $1.2T US auto market is invisible to AI agents.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/automotive-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const failurePatterns = [
  {
    name: 'Inventory on Third-Party Platforms',
    description: 'Vehicle inventory lives on AutoTrader, Cars.com, CarGurus, and dealer-specific DMS systems. The dealership website is a thin marketing wrapper that links out or iframes third-party listings.',
    impact: 'An AI agent looking for a 2024 Honda Civic under $28K cannot query the dealership directly. It has to scrape AutoTrader — which blocks bots — or tell the user to search manually.',
    icon: Globe,
    color: 'red',
  },
  {
    name: 'Pricing Hidden Behind "Call for Quote"',
    description: '72% of dealership websites do not show real transaction prices. They show MSRP, a "starting at" number, or literally "Call for Price." Incentives, rebates, and dealer markup are phone-only.',
    impact: 'Agent cannot compare prices across dealers. D4 Pricing scores 0. The entire agent journey breaks at step 1 — the agent cannot even tell the user what a car costs.',
    icon: DollarSign,
    color: 'red',
  },
  {
    name: 'Service Booking Is Phone-Only',
    description: 'Most independent auto shops and even franchise service centers require a phone call to schedule. Those with online booking use third-party widgets (Xtime, CDK) that render in iframes with no API.',
    impact: 'An agent asked to "book an oil change for Saturday morning" hits a dead end. It can only say "call this number." The shop loses the booking to the competitor with online scheduling.',
    icon: Phone,
    color: 'red',
  },
  {
    name: 'No Structured Vehicle Data',
    description: 'Vehicle specifications, features, and options are in marketing copy — not structured data. No JSON-LD Vehicle schema, no machine-readable VIN decoder endpoint, no /api/inventory.',
    impact: 'Agents cannot filter by feature (AWD, sunroof, under 30K miles). They cannot compare trim levels across brands. The data exists in the DMS but never reaches a public API.',
    icon: Code2,
    color: 'red',
  },
  {
    name: 'Websites Are Marketing Brochures',
    description: 'Dealership websites are built by a handful of vendors (Dealer.com, DealerOn, Dealer Inspire) optimized for Google Ads landing pages, not agent interaction. Hero images, CTA buttons, zero endpoints.',
    impact: 'The site scores well on traditional SEO. It scores 8-15 on agent readiness. Beautiful design, zero agent utility.',
    icon: Search,
    color: 'amber',
  },
]

const agentReadyBlueprint = [
  {
    tool: 'search_inventory',
    description: 'Search vehicles by make, model, year, price range, mileage, features. Returns structured JSON with VIN, images, specifications, and real transaction price.',
    example: 'search_inventory({ make: "Honda", model: "Civic", max_price: 28000, max_mileage: 30000 })',
    priority: 'Critical',
  },
  {
    tool: 'get_vehicle_details',
    description: 'Full details for a specific VIN or stock number. Includes window sticker data, Carfax summary link, photos, and current incentives.',
    example: 'get_vehicle_details({ vin: "1HGBH41JXMN109186" })',
    priority: 'Critical',
  },
  {
    tool: 'get_pricing',
    description: 'Real transaction pricing including MSRP, dealer discount, manufacturer rebates, and out-the-door estimate with tax and fees for a given zip code.',
    example: 'get_pricing({ vin: "1HGBH41JXMN109186", zip: "33610" })',
    priority: 'Critical',
  },
  {
    tool: 'book_service',
    description: 'Schedule a service appointment. Accepts service type, preferred date/time, vehicle info. Returns confirmation with estimated duration and cost.',
    example: 'book_service({ service: "oil_change", date: "2026-04-20", time: "09:00", vehicle_year: 2022, vehicle_make: "Toyota" })',
    priority: 'High',
  },
  {
    tool: 'check_parts_availability',
    description: 'Check if a specific part is in stock or available for order. Returns price, availability, and estimated arrival for backordered items.',
    example: 'check_parts_availability({ part_number: "04152-YZZA1", vehicle_vin: "..." })',
    priority: 'Medium',
  },
  {
    tool: 'get_trade_in_estimate',
    description: 'Instant trade-in estimate based on VIN, mileage, and condition. Uses KBB or internal algorithm. Returns range and next steps.',
    example: 'get_trade_in_estimate({ vin: "...", mileage: 45000, condition: "good" })',
    priority: 'Medium',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do dealerships score so low compared to other industries?',
    answer:
      'Dealerships outsource their digital presence to platform vendors (Dealer.com, DealerOn) and their inventory to aggregators (AutoTrader, Cars.com). The dealership itself controls almost nothing technically. There is no API, no structured data, no machine-readable pricing. The website exists to generate phone calls and walk-ins — the opposite of what agents need.',
  },
  {
    question: 'What about Tesla and Carvana — are they different?',
    answer:
      'Tesla and Carvana are dramatically different. Both publish real-time inventory with structured pricing online. Carvana has a full purchase-through-delivery API. Tesla configures and prices vehicles entirely online. Neither has an MCP server yet, but their architecture would support one in days. Traditional dealerships would need months of infrastructure work.',
  },
  {
    question: 'Can a dealership become agent-ready without building a custom API?',
    answer:
      'Yes. AgentHermes can generate an MCP server for a dealership by connecting to the DMS feed that already sends inventory to AutoTrader. The same structured data that goes to third-party aggregators can power an agent-facing API. The data already exists — it just needs a different delivery channel.',
  },
  {
    question: 'What is the business case for a dealer to invest in agent readiness?',
    answer:
      'Agent referrals are commission-free. When AutoTrader sends a lead, the dealer pays $25-50 per click. When an AI agent sends a buyer directly, the cost is zero. The first dealer per metro area to become agent-discoverable captures every agent-driven inquiry with no acquisition cost — while competitors continue paying per-click to aggregators.',
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

export default function AutomotiveAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Automotive Agent Readiness: Why Car Dealerships and Auto Services Score Under 15',
    description:
      'The US automotive market is $1.2 trillion. Car dealerships and auto services average under 15 on the Agent Readiness Score. Inventory, pricing, and booking are invisible to AI agents.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/automotive-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1900,
    keywords:
      'automotive dealership agent readiness, car dealership AI agents, auto service agent readiness, automotive API',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Automotive Agent Readiness',
          item: 'https://agenthermes.ai/blog/automotive-agent-readiness',
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
      title="Automotive Agent Readiness: Why Car Dealerships and Auto Services Score Under 15"
      shareUrl="https://agenthermes.ai/blog/automotive-agent-readiness"
      currentHref="/blog/automotive-agent-readiness"
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
            <span className="text-zinc-400">Automotive Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Car className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Score: Under 15
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Automotive Agent Readiness:{' '}
            <span className="text-emerald-400">Why Car Dealerships Score Under 15</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The US automotive market is <strong className="text-zinc-100">$1.2 trillion per year</strong>.
            Car dealerships, auto service centers, and parts retailers are among the lowest-scoring
            businesses in the AgentHermes 500-business scan. The average automotive business scores under 15
            out of 100. Their websites are marketing brochures, not agent-callable APIs. The first
            dealership to change that wins every agent-driven buyer in their metro.
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

      {/* ===== THE REALITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Car className="h-5 w-5 text-red-500" />
            The Reality: A $1.2 Trillion Industry Invisible to AI
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Ask an AI agent to find you a 2024 Honda Civic with under 30,000 miles, priced under $28,000,
              within 25 miles of Tampa. The agent&rsquo;s experience: it can find the Honda website (marketing),
              it can find AutoTrader (scraping-blocked), and it can find local dealership websites that say
              &ldquo;Browse Our Inventory&rdquo; with zero queryable endpoints. The agent ends up telling you
              to visit a website or call a phone number. The entire value proposition of AI assistance
              evaporates.
            </p>
            <p>
              This is not a niche problem. Americans bought{' '}
              <strong className="text-zinc-100">15.5 million new vehicles</strong> and{' '}
              <strong className="text-zinc-100">40 million used vehicles</strong> in 2025. The automotive
              aftermarket — parts, service, repair — adds another $400 billion. Every single one of these
              transactions starts with research that an AI agent could do better and faster than a human
              browsing tabs. But the infrastructure does not exist.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$1.2T', label: 'US auto market annually', icon: DollarSign },
              { value: '<15', label: 'avg dealer readiness score', icon: Car },
              { value: '72%', label: 'hide real pricing', icon: Phone },
              { value: '0', label: 'dealerships with MCP servers', icon: Server },
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

      {/* ===== FIVE FAILURE PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Five Failure Patterns That Keep Automotive at the Bottom
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every automotive business we scanned hits the same walls. These are not technical
            limitations — they are architectural choices that predate the agent economy.
          </p>

          <div className="space-y-4 mb-8">
            {failurePatterns.map((pattern) => {
              const colors = getColorClasses(pattern.color)
              return (
                <div
                  key={pattern.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <pattern.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{pattern.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{pattern.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className={`${colors.text} font-medium`}>Agent impact:</span>{' '}
                      {pattern.impact}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE AGGREGATOR TRAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-amber-500" />
            The Aggregator Trap: AutoTrader Gets the Agent Traffic
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Here is the uncomfortable truth for dealerships: the agent economy will have automotive
              data. AutoTrader, Cars.com, and CarGurus already have structured vehicle inventory with
              real-time pricing. When these platforms build MCP servers — and they will — AI agents will
              route all automotive queries through them instead of through individual dealerships.
            </p>
            <p>
              This is the exact pattern that happened with hotels.{' '}
              <Link href="/blog/travel-hospitality-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Booking.com and Expedia captured the machine-readable layer
              </Link>{' '}
              while individual hotels stayed phone-and-email. Now hotels pay 15-25% commission on every
              booking that comes through an OTA. Dealerships are heading down the same path with
              automotive aggregators — except the commissions will be per-lead fees of $25-50.
            </p>
            <p>
              The alternative: build your own agent-accessible layer and own the relationship directly.
              The first dealership per metro area to do this captures every agent-driven inquiry at zero
              acquisition cost while competitors pay per click.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The math:</strong> A dealership spending $15,000/month on
              AutoTrader and Cars.com leads could redirect a fraction of that budget to an agent-accessible
              API. Every agent-driven lead through that API costs $0 in acquisition — compared to $25-50
              through the aggregator. At even 10% of leads shifting to agent-driven, the ROI is immediate.
            </p>
          </div>
        </div>
      </section>

      {/* ===== AGENT-READY BLUEPRINT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Agent-Ready Dealership: What It Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An agent-ready automotive business exposes six core tools through an MCP server. These are
            the endpoints an AI agent needs to fully serve a car buyer or service customer.
          </p>

          <div className="space-y-3 mb-8">
            {agentReadyBlueprint.map((tool) => (
              <div
                key={tool.tool}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-emerald-400" />
                    {tool.tool}
                  </h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    tool.priority === 'Critical'
                      ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                      : tool.priority === 'High'
                        ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                        : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                  }`}>
                    {tool.priority}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-2">{tool.description}</p>
                <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <code className="text-xs text-emerald-400 break-all">{tool.example}</code>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              With these six tools, an AI agent can serve an entire car-buying journey: search inventory
              by criteria, get details on a specific vehicle, see real pricing with incentives, estimate
              a trade-in, and schedule a test drive — all without a phone call. The service side is
              equally powerful: check parts availability, book maintenance, and get cost estimates
              programmatically.
            </p>
            <p>
              The data for all of these tools already exists in dealership DMS systems (CDK, Reynolds,
              DealerTrack). It is the same data that feeds AutoTrader listings. The missing piece is a
              public API layer — and that is exactly what an{' '}
              <Link href="/blog/local-business-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                AgentHermes MCP server
              </Link>{' '}
              provides.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHO MOVES FIRST ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Who Moves First Wins: The Tesla Effect
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Tesla proved that a direct-to-consumer, fully digital automotive experience works. No
              dealership middlemen. Real-time inventory. Configure and price online. Purchase through
              delivery via API. Tesla is not agent-ready yet — but its architecture is one MCP server
              away from being the first automotive brand an AI agent can fully transact with.
            </p>
            <p>
              Carvana is even closer. Their entire business model — search inventory, get pricing, apply
              for financing, schedule delivery — is already API-driven. A Carvana MCP server would make
              it the first used car platform where an AI agent can find, evaluate, and purchase a vehicle
              end-to-end without a human touching a form.
            </p>
            <p>
              Traditional dealerships face a choice: build the agent-accessible layer now, while the
              competition is zero, or wait until aggregators and digital-first competitors own the
              agent channel. The first dealership in each metro to go agent-ready gets a monopoly on
              agent-driven leads in that market — a monopoly that is free to acquire and compounds
              over time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'First-mover dealership',
                points: [
                  'Zero acquisition cost per agent lead',
                  'Monopoly on agent traffic in metro',
                  'Direct relationship — no aggregator fees',
                  'Data ownership on agent interactions',
                ],
                color: 'emerald',
              },
              {
                title: 'Wait-and-see dealership',
                points: [
                  '$25-50 per lead through aggregator MCP',
                  'Competing with every dealer in the feed',
                  'No control over presentation or pricing',
                  'Agent leads go to whoever pays most',
                ],
                color: 'red',
              },
            ].map((col) => {
              const colors = getColorClasses(col.color)
              return (
                <div
                  key={col.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className={`font-bold ${colors.text} mb-3`}>{col.title}</h3>
                  <ul className="space-y-2">
                    {col.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-zinc-400">
                        <CheckCircle2 className={`h-4 w-4 ${colors.text} shrink-0 mt-0.5`} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
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
                title: 'Local Business Agent Readiness: The $6.2B Opportunity',
                href: '/blog/local-business-agent-readiness',
                tag: 'Market Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Why 30% of Businesses Fail Over Pricing Transparency',
                href: '/blog/pricing-transparency-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
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
            How does your dealership score?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan on your dealership or auto service website.
            See exactly where you stand across all 9 dimensions — and what to fix first.
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
