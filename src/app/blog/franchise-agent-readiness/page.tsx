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
  Network,
  Phone,
  Search,
  Server,
  Shield,
  Sparkles,
  Store,
  Target,
  Timer,
  TrendingUp,
  Users,
  UtensilsCrossed,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Franchise Agent Readiness: Why McDonald\'s Has an App But Individual Franchisees Score Zero | AgentHermes',
  description:
    'The franchise paradox: corporate has sophisticated tech (McDonald\'s app, Subway ordering API) but individual franchisees have zero independent agent infrastructure. The franchisor controls the tech stack. Here is what agent-ready franchises look like and the platform opportunity.',
  keywords: [
    'franchise agent readiness',
    'franchise AI agent',
    'franchise MCP server',
    'franchise API',
    'McDonald\'s agent readiness',
    'franchise agent economy',
    'franchise tech stack',
    'restaurant franchise agent readiness',
    'franchise platform agent readiness',
  ],
  openGraph: {
    title: 'Franchise Agent Readiness: Why McDonald\'s Has an App But Individual Franchisees Score Zero',
    description:
      'The franchise paradox: corporate tech exists but individual franchisees have zero agent infrastructure. The franchisor controls the stack. First franchise platform to add agent APIs lifts all locations.',
    url: 'https://agenthermes.ai/blog/franchise-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Franchise Agent Readiness: Why McDonald\'s Has an App But Franchisees Score Zero',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Franchise Agent Readiness: Why McDonald\'s Has an App But Franchisees Score Zero',
    description:
      'The franchise paradox: corporate has the tech, but 780K individual franchise locations are invisible to AI agents. The platform play changes everything.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/franchise-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const franchiseEndpoints = [
  {
    name: 'Location-Specific Inventory API',
    description: 'Real-time endpoint returning what is actually available at a specific franchise location right now. Not the corporate menu — the actual items in stock, seasonal offerings, and local specials. Critical for food franchises where availability varies by location, time of day, and supply chain.',
    example: 'get_inventory({ location_id: "MCD-78701-005", category: "breakfast" }) returns [{ item: "Egg McMuffin", available: true, price: 4.99 }, { item: "McGriddle", available: false, reason: "after_10:30am" }]',
    icon: Store,
    color: 'emerald',
  },
  {
    name: 'Wait Time Estimator',
    description: 'Endpoint returning current estimated wait time based on real-time order volume. Enables agents to compare franchise locations and route customers to the fastest option. Replaces the "drive by and check the line" guessing game.',
    example: 'get_wait_time({ location_id: "MCD-78701-005", order_type: "drive_thru" }) returns { estimated_minutes: 7, confidence: 0.85, queue_length: 12 }',
    icon: Timer,
    color: 'blue',
  },
  {
    name: 'Local Menu Variations Endpoint',
    description: 'Returns the delta between the corporate standard menu and what this specific location offers — regional items, franchise-owner specials, test market products, and locally sourced options. No two franchise locations are identical.',
    example: 'get_local_menu({ location_id: "SUB-Austin-012" }) returns { additions: [{ item: "BBQ Brisket Sub", local_only: true, price: 12.99 }], removals: ["Lobster Roll"] }',
    icon: UtensilsCrossed,
    color: 'amber',
  },
  {
    name: 'Service Appointment Booking',
    description: 'For service franchises (Great Clips, Meineke, ServiceMaster), an endpoint to book appointments at a specific location with technician or stylist availability. Replaces the walk-in-only model that loses customers to competitors with online booking.',
    example: 'book_appointment({ location_id: "GC-78704-002", service: "mens_haircut", preferred_time: "2026-04-20T14:00" }) returns { confirmation: "APT-8821", stylist: "Maria", estimated_duration: 20 }',
    icon: Calendar,
    color: 'purple',
  },
  {
    name: 'Staff and Capacity Availability',
    description: 'Returns current staffing level, capacity, and service readiness for the location. For service franchises, this means which specialists are on-site. For food franchises, it means kitchen capacity and drive-thru lane status.',
    example: 'get_capacity({ location_id: "MNK-78701-001" }) returns { open: true, mechanics_available: 3, bays_open: 2, next_available_slot: "2026-04-18T10:00", services_available: ["oil_change", "brake_service", "tire_rotation"] }',
    icon: Users,
    color: 'cyan',
  },
]

const franchiseParadox = [
  { entity: 'McDonald\'s Corporate', techLevel: 'Mobile app, ordering API, loyalty program, dynamic pricing engine', agentScore: '~38', reason: 'API exists internally but is not public. App is consumer-facing, not agent-facing.' },
  { entity: 'McDonald\'s Franchisee', techLevel: 'POS system (corporate-mandated), no independent digital presence', agentScore: '~3', reason: 'Zero independent API surface. Everything runs through corporate systems the franchisee does not control.' },
  { entity: 'Subway Corporate', techLevel: 'Online ordering API, location finder, menu API', agentScore: '~32', reason: 'Some public endpoints exist via mobile app API. No MCP, no agent-card.' },
  { entity: 'Subway Franchisee', techLevel: 'POS system, no independent digital presence', agentScore: '~2', reason: 'Franchisee has zero tech autonomy. Cannot expose local data without corporate approval.' },
  { entity: 'Great Clips Corporate', techLevel: 'Online check-in, wait time display, stylist booking', agentScore: '~25', reason: 'Consumer-facing check-in system exists but no public API for agents.' },
  { entity: 'Great Clips Franchisee', techLevel: 'Corporate check-in system, walk-in only fallback', agentScore: '~5', reason: 'Individual locations inherit some tech from corporate but cannot extend it.' },
]

const comparisonRows = [
  { aspect: 'Menu/Service catalog', corporate: 'Centralized menu API (internal)', franchisee: 'No independent catalog. Local variations not exposed.' },
  { aspect: 'Inventory/availability', corporate: 'Aggregate data across all locations', franchisee: 'Location-specific stock unknown to agents' },
  { aspect: 'Wait times', corporate: 'Some apps show estimated wait', franchisee: 'No real-time data exposed per location' },
  { aspect: 'Booking/ordering', corporate: 'Mobile app handles it for chain', franchisee: 'Phone or walk-in only for agent interactions' },
  { aspect: 'Pricing', corporate: 'Corporate sets base pricing', franchisee: 'Local pricing variations not queryable' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why can\'t individual franchisees become agent-ready on their own?',
    answer:
      'Franchise agreements typically restrict franchisees from building independent technology that interfaces with the brand. A McDonald\'s franchisee cannot build their own ordering API or expose location data through a public endpoint without corporate approval. The franchisor controls the tech stack, and most franchise agreements explicitly prohibit independent digital customer-facing systems. Agent readiness must come from the corporate level or from platform providers that franchisors approve.',
  },
  {
    question: 'What franchise tech providers could add agent readiness?',
    answer:
      'Toast, Square for Restaurants, Lightspeed, Clover, and Revel handle POS and ordering for tens of thousands of franchise locations. If Toast added an MCP server layer to its restaurant POS — exposing menu, availability, wait time, and ordering endpoints — it would instantly make every Toast-powered franchise location agent-accessible. The same applies to ServiceTitan for home service franchises and Mindbody for fitness and wellness franchises. The POS and management platform is the leverage point.',
  },
  {
    question: 'Are any franchise systems already agent-ready?',
    answer:
      'No franchise system scores above 40 on our agent readiness assessment. The closest are chains with public mobile app APIs (McDonald\'s, Starbucks, Domino\'s) where determined developers have reverse-engineered ordering endpoints. But these are not official, documented, or designed for agent consumption. Zero franchise systems have MCP servers, agent-card.json files, or official agent-facing APIs. The entire category is at ARL-0 or ARL-1.',
  },
  {
    question: 'How does the franchise model affect the speed of agent readiness adoption?',
    answer:
      'The franchise model is both a bottleneck and an accelerator. It is a bottleneck because individual franchisees cannot act independently — adoption requires corporate decision-making, which is slow. But it is an accelerator because once a franchisor decides to add agent infrastructure, it deploys to hundreds or thousands of locations overnight. If McDonald\'s adds an MCP server to its platform, 13,000 US locations become agent-ready in one deployment. The franchise model trades speed of decision for speed of rollout.',
  },
  {
    question: 'What about independent restaurants that compete with franchises?',
    answer:
      'This is where the opportunity is asymmetric. A single independent restaurant can become agent-ready in an afternoon using AgentHermes — no corporate approval needed. It immediately starts capturing agent-driven traffic that franchise competitors cannot, because those competitors are waiting for corporate to act. The franchise paradox creates a window where independent businesses can out-compete billion-dollar chains on agent accessibility simply because they can move faster.',
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

export default function FranchiseAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Franchise Agent Readiness: Why McDonald\'s Has an App But Individual Franchisees Score Zero',
    description:
      'The franchise paradox: corporate has sophisticated tech but individual franchisees have zero independent agent infrastructure. The platform play lifts all locations at once.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/franchise-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1900,
    keywords:
      'franchise agent readiness, franchise AI agent, franchise MCP server, McDonald\'s agent readiness, franchise platform agent economy',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Franchise Agent Readiness',
          item: 'https://agenthermes.ai/blog/franchise-agent-readiness',
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
      title="Franchise Agent Readiness: Why McDonald's Has an App But Individual Franchisees Score Zero"
      shareUrl="https://agenthermes.ai/blog/franchise-agent-readiness"
      currentHref="/blog/franchise-agent-readiness"
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
            <span className="text-zinc-400">Franchise Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Store className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              780K Locations
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Franchise Agent Readiness:{' '}
            <span className="text-emerald-400">Why McDonald&rsquo;s Has an App But Franchisees Score Zero</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            There are <strong className="text-zinc-100">780,000 franchise locations</strong> in the United States
            generating $827 billion in annual output. The franchise paradox: corporate has sophisticated tech —
            McDonald&rsquo;s mobile app, Subway&rsquo;s ordering API, Domino&rsquo;s Pizza Tracker — but individual
            franchisees have <strong className="text-zinc-100">zero independent agent infrastructure</strong>. The
            franchisor controls the tech stack. When an AI agent needs to interact with a specific franchise location,
            it has nothing to connect to.
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

      {/* ===== THE PARADOX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-red-500" />
            The Franchise Paradox: Corporate Tech, Franchisee Darkness
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              McDonald&rsquo;s has a $1 billion technology budget. The company spent years building a mobile ordering
              platform, dynamic pricing engine, drive-thru AI (via Dynamic Yield), and a loyalty program used by
              40 million people. Starbucks has an ordering API that processes millions of mobile orders daily.
              Domino&rsquo;s built a Pizza Tracker that is genuinely impressive technology.
            </p>
            <p>
              But ask an AI agent to check what is available at the McDonald&rsquo;s on 5th Street, whether the
              ice cream machine is working, or how long the drive-thru wait is right now — and the agent has
              nothing. These capabilities exist inside corporate systems but are not exposed through any
              public, agent-facing API. The mobile app is designed for human consumers, not AI agents.
            </p>
            <p>
              The individual franchisee — the person who actually owns and operates the location — has even
              less. They run on a corporate-mandated POS system they cannot modify, have no independent website
              beyond a Google Business Profile, and are contractually prohibited from building their own
              customer-facing technology. The franchisee is a{' '}
              <strong className="text-zinc-100">technology tenant, not a technology owner</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '780K', label: 'US franchise locations', icon: MapPin },
              { value: '$827B', label: 'annual franchise output', icon: DollarSign },
              { value: '0', label: 'franchisee MCP servers', icon: Server },
              { value: '~3', label: 'avg franchisee score', icon: BarChart3 },
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

      {/* ===== CORPORATE VS FRANCHISEE SCORES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Corporate vs Franchisee: The Score Gap
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We assessed both corporate parent companies and their individual franchise locations. The score
            gap between corporate and franchisee averages <strong className="text-zinc-100">25-35 points</strong> —
            and even the corporate scores are low by agent readiness standards.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Entity</div>
              <div>Tech Level</div>
              <div>Score</div>
              <div>Why</div>
            </div>
            {franchiseParadox.map((row, i) => (
              <div
                key={row.entity}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.entity}</div>
                <div className="text-zinc-400">{row.techLevel}</div>
                <div className={`font-mono ${parseInt(row.agentScore.replace('~', '')) > 20 ? 'text-amber-400' : 'text-red-400'}`}>{row.agentScore}</div>
                <div className="text-zinc-500">{row.reason}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The key insight:</strong> Even corporate franchise parents
              with billion-dollar tech budgets score below 40. Their technology is consumer-facing (apps, websites)
              not agent-facing (APIs, MCP servers, structured endpoints). The technology exists but is locked
              behind human-only interfaces. Franchisees inherit none of this — their score reflects having
              a Google Business Profile and HTTPS. Nothing more.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CORPORATE VS FRANCHISEE TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            What Corporate Has vs What Franchisees Can Expose
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The data that agents need exists inside corporate systems. But individual franchise locations
            cannot expose any of it independently.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Capability</div>
              <div>Corporate Level</div>
              <div>Franchisee Level</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-amber-400">{row.corporate}</div>
                <div className="text-red-400">{row.franchisee}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Franchises Need: 5 Location-Level Endpoints
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              An agent-ready franchise location exposes five endpoints through an{' '}
              <Link href="/blog/what-is-mcp-server" className="text-emerald-400 hover:text-emerald-300 underline">MCP server</Link>{' '}
              — each returning <em>location-specific</em> data, not corporate averages. This is what an AI agent
              needs to make useful, real-time decisions about a specific franchise location.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {franchiseEndpoints.map((endpoint) => {
              const colors = getColorClasses(endpoint.color)
              return (
                <div
                  key={endpoint.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <endpoint.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{endpoint.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{endpoint.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{endpoint.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE PLATFORM OPPORTUNITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Platform Play: Toast, Square, and the Franchise Tech Providers
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Individual franchisees cannot become agent-ready on their own. Corporate franchisors move slowly.
              The fastest path to franchise agent readiness runs through{' '}
              <strong className="text-zinc-100">the platform providers that already power franchise operations</strong>.
            </p>
            <p>
              Toast serves 120,000+ restaurant locations. Square for Restaurants handles ordering and POS for
              tens of thousands more. ServiceTitan manages scheduling and dispatch for 100,000+ home service
              locations. Mindbody handles booking for 60,000+ fitness and wellness locations. These platforms
              already have the data — menus, inventory, availability, booking, pricing.
            </p>
            <p>
              If Toast added an MCP server layer to its POS platform, every Toast-powered franchise location
              would become agent-ready overnight. The franchisee does not need to do anything. The platform
              handles the agent-facing API just like it handles payment processing — as infrastructure the
              location runs on top of. This is the same pattern that made Shopify an e-commerce platform:
              the merchant never touches the API, but it exists and powers integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'Independent restaurants can move first',
                detail: 'While franchisees wait for corporate or platform providers, independent restaurants can become agent-ready today. An independent Mexican restaurant with an MCP server captures agent traffic that the Chipotle next door cannot — because Chipotle is waiting for corporate to act.',
                icon: Store,
              },
              {
                title: 'Service franchises are the biggest gap',
                detail: 'Food franchises at least have mobile ordering apps. Service franchises (Great Clips, Meineke, ServiceMaster, H&R Block) have almost zero digital customer interaction. Walk-in or call. Agent-ready service franchises with booking APIs capture an entirely new channel.',
                icon: Phone,
              },
              {
                title: 'Multi-location comparison is the killer feature',
                detail: 'The unique value of agent readiness for franchises: comparing across locations in real time. "Which McDonald\'s near me has the shortest drive-thru wait?" requires location-level APIs that do not exist today. This question cannot be answered by corporate systems.',
                icon: MapPin,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <item.icon className="h-5 w-5 text-emerald-400 mb-3" />
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
                title: 'Food Delivery Agent Readiness: DoorDash, Uber Eats, and Beyond',
                href: '/blog/food-delivery-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Agent-Ready Restaurants: The Complete Guide',
                href: '/blog/agent-ready-restaurants',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Local Business Agent Readiness: The Small Business Gap',
                href: '/blog/local-business-agent-readiness',
                tag: 'Market Analysis',
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
            Is your franchise location invisible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score in 60 seconds. See how your location compares
            to corporate and to independent competitors who are already agent-ready.
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
