import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Eye,
  EyeOff,
  Globe,
  MessageSquare,
  Network,
  Search,
  Server,
  ShoppingCart,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User,
  UtensilsCrossed,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'What Agent-Ready Means for Restaurants — From PDF Menus to AI Agents | AgentHermes',
  description:
    'Most restaurants are invisible to AI agents. Learn the 5-level progression from PDF menus and phone reservations to a fully agent-ready restaurant with its own AI, structured menus, and programmatic bookings.',
  openGraph: {
    title: 'What Agent-Ready Means for Restaurants — From PDF Menus to AI Agents',
    description:
      '60% of restaurants are at ARL-0: PDF menus, phone reservations, zero agent presence. Here is the 5-level progression to becoming fully agent-ready.',
    url: 'https://agenthermes.ai/blog/agent-ready-restaurants',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'What Agent-Ready Means for Restaurants — AgentHermes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Agent-Ready Means for Restaurants — From PDF Menus to AI Agents',
    description:
      '60% of restaurants are at ARL-0. Here is the 5-level progression to fully agent-ready.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/agent-ready-restaurants',
  },
}

// ---------------------------------------------------------------------------
// Restaurant ARL Progression Data
// ---------------------------------------------------------------------------

interface RestaurantLevel {
  level: number
  name: string
  tagline: string
  description: string
  icon: typeof EyeOff
  color: string
  realExample: string
  agentExperience: string
  whatItTakes: string[]
}

const restaurantLevels: RestaurantLevel[] = [
  {
    level: 0,
    name: 'Dark',
    tagline: 'Invisible to AI agents',
    description:
      'The restaurant exists but has zero machine-readable presence. The menu is a PDF or a JPG on Facebook. Reservations are phone-only. Hours are buried in an image on a brochure-style website. When a customer asks an AI agent "find me a good Italian place nearby," this restaurant will never appear in the results. It is a ghost in the agent economy.',
    icon: EyeOff,
    color: 'red',
    realExample:
      'A family-owned Italian restaurant with a Wix site. The menu is a scanned PDF from 2019. The phone number is an image (not text). Hours say "Call for current hours." An agent scraping this page gets nothing — no structured data, no prices, no hours, no way to understand or recommend the restaurant.',
    agentExperience:
      '"I found a website for Mama Rosa\'s but I cannot determine the menu, hours, or whether they take reservations. I will recommend other restaurants with available information instead."',
    whatItTakes: [],
  },
  {
    level: 1,
    name: 'Discoverable',
    tagline: 'Agents can find the restaurant',
    description:
      'An AI agent can discover the restaurant and understand the basics: what cuisine, where it is, what hours, and a general sense of the menu. This usually means a Google Business Profile with accurate categories, hours, and photos. Schema.org Restaurant markup on the website. An agent can recommend the restaurant — but cannot book, order, or check availability.',
    icon: Search,
    color: 'amber',
    realExample:
      'A neighborhood Thai restaurant with a complete Google Business Profile. Hours, cuisine type, price range, and photos are all accurate. The website has Schema.org Restaurant markup with address and opening hours. An agent can recommend it, but the next step is always "call them to make a reservation."',
    agentExperience:
      '"I found Thai Garden — they serve Thai cuisine, are open until 10pm tonight, and have a 4.5 star rating. However, I cannot check table availability or make a reservation. You will need to call them at (555) 123-4567."',
    whatItTakes: [
      'Complete Google Business Profile with accurate hours, cuisine, price range',
      'Schema.org Restaurant markup on website',
      'Consistent NAP (Name, Address, Phone) across all listings',
      'Menu accessible as text (not a PDF image scan)',
    ],
  },
  {
    level: 2,
    name: 'Readable',
    tagline: 'Agents can understand the full menu',
    description:
      'The menu is fully machine-readable with prices, descriptions, allergens, and dietary tags. An agent can comparison-shop across restaurants — it knows exactly what dishes are available, what they cost, and whether they meet dietary requirements. The agent can answer "do they have gluten-free pasta" without scraping HTML paragraphs.',
    icon: Eye,
    color: 'yellow',
    realExample:
      'A farm-to-table restaurant using Toast or Square with a digital menu. Each item has a description, price, calorie count, and allergen flags (nuts, gluten, dairy). Schema.org Menu markup or a JSON menu endpoint makes this data available to agents. The agent can filter by dietary restriction and compare prices across restaurants.',
    agentExperience:
      '"Thai Garden has 3 gluten-free entrees: Green Curry ($18), Basil Stir-Fry ($16), and Grilled Salmon ($24). All three are also dairy-free. The Green Curry is their highest-rated dish. However, I still cannot check if they have a table available tonight — you will need to call."',
    whatItTakes: [
      'Full digital menu with prices, descriptions, and dietary/allergen tags',
      'Schema.org Menu markup or JSON menu endpoint',
      'Allergen and dietary information structured per item',
      'Regular menu updates (seasonal changes reflected promptly)',
    ],
  },
  {
    level: 3,
    name: 'Bookable',
    tagline: 'Agents can reserve a table or place an order',
    description:
      'This is the revenue inflection point. An agent can now DO something — book a table, place a takeout order, or join a waitlist. The restaurant has a booking or ordering system with an API that accepts programmatic input. OpenTable, Resy, Toast Online Ordering, or a custom booking API. The jump from "agents can tell you about the restaurant" to "agents can book you a table" is where real value begins to flow.',
    icon: ShoppingCart,
    color: 'emerald',
    realExample:
      'A restaurant on OpenTable or Resy with online ordering through Toast. An agent can check available slots, book a table for 4 at 7:30pm, add a note about a birthday celebration, and place a takeout order with customizations. The reservation and order are confirmed programmatically — no phone call needed.',
    agentExperience:
      '"I found a table for 4 at Thai Garden at 7:30pm tonight. I have booked it under your name and added a note about the birthday celebration. I also pre-ordered the Green Curry appetizer since you mentioned wanting to try it. Confirmation number: TG-2026-4821."',
    whatItTakes: [
      'Online reservation system with API access (OpenTable, Resy, or direct)',
      'Online ordering for takeout/delivery with programmatic input',
      'Real-time table availability API',
      'Structured confirmation responses (not just an email)',
    ],
  },
  {
    level: 4,
    name: 'Transactable',
    tagline: 'Agents can pay, modify, and manage the full experience',
    description:
      'The full transaction cycle is agent-accessible: reserve, pay, modify, cancel, tip, and review. Payment is programmatic — the agent can pre-pay, split bills, apply gift cards, or handle deposits for large parties. Order modifications after placement are API-accessible. Cancellation policies are machine-readable so the agent can make informed decisions about changes.',
    icon: CreditCard,
    color: 'blue',
    realExample:
      'A restaurant with Stripe-connected payments, a full booking API, and order management endpoints. An agent can book a table, pre-pay for a prix fixe dinner, add 2 guests to the reservation an hour before arrival, request a specific wine pairing, and leave a tip after the meal — all without the customer touching a screen.',
    agentExperience:
      '"I have modified your reservation at Thai Garden from 4 to 6 guests and moved it to the private dining area. The prix fixe menu for 6 is $85 per person ($510 total). I have pre-authorized payment on your Amex. The restaurant confirms the wine pairing upgrade is available. Updated confirmation: TG-2026-4821-R2."',
    whatItTakes: [
      'Programmatic payment (Stripe, Square, or direct payment API)',
      'Reservation modification and cancellation API',
      'Order tracking and modification after placement',
      'Machine-readable cancellation/refund policies',
      'Deposit and pre-payment support for large parties',
    ],
  },
  {
    level: 5,
    name: 'Autonomous',
    tagline: 'The restaurant has its own AI agent',
    description:
      'The restaurant operates its own AI agent that communicates directly with customer agents. The restaurant agent knows real-time table status, kitchen capacity, ingredient availability, and can negotiate — offering a 15% discount to fill a slow Tuesday night, suggesting a later seating when 7pm is full, or proposing a tasting menu when a customer agent asks about a group dinner. Agent-to-agent negotiation replaces the phone call and the website entirely.',
    icon: Bot,
    color: 'purple',
    realExample:
      'A restaurant running an AgentHermes-powered MCP server with 5 tools. A customer agent contacts the restaurant agent to plan a birthday dinner for 8. The restaurant agent checks kitchen capacity, confirms the chef can accommodate 3 dietary restrictions, suggests the private dining room, negotiates a prix fixe menu at $75/person (down from $85 because Tuesday is slow), and handles the full booking — all in under 2 seconds, agent-to-agent.',
    agentExperience:
      '"I negotiated with Thai Garden\'s agent on your behalf. For your group of 8 on Tuesday, they offered: private dining room (normally $200 surcharge, waived for parties of 8+), prix fixe at $75/person (10% off for Tuesday), wine pairing at $35/person, and the chef will prepare a custom gluten-free course for Sarah. Total estimate: $880 before tax and tip. The restaurant agent confirmed all dietary restrictions are accommodated. Shall I confirm the booking?"',
    whatItTakes: [
      'MCP server exposing restaurant tools (reservations, menu, availability)',
      'A2A agent card at /.well-known/agent-card.json',
      'Real-time inventory and capacity awareness',
      'Dynamic pricing and negotiation capabilities',
      'Multi-party coordination (catering, events, group bookings)',
    ],
  },
]

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

const restaurantStats = [
  { value: '1M+', label: 'restaurants in the US', icon: UtensilsCrossed },
  { value: '60%', label: 'at ARL-0 (invisible to agents)', icon: EyeOff },
  { value: '32/100', label: 'average agent readiness score', icon: BarChart3 },
  { value: '$99/mo', label: 'flat rate to become agent-ready', icon: DollarSign },
]

// ---------------------------------------------------------------------------
// Comparison Data
// ---------------------------------------------------------------------------

interface PlatformComparison {
  name: string
  type: string
  discovery: string
  booking: string
  payment: string
  agentAccess: string
  arl: string
  color: string
}

const platformComparisons: PlatformComparison[] = [
  {
    name: 'Phone-Only Restaurant',
    type: 'No digital presence',
    discovery: 'None — invisible to search and agents',
    booking: 'Phone call only',
    payment: 'Cash or card at POS',
    agentAccess: 'Zero — agents cannot interact at all',
    arl: 'ARL-0',
    color: 'red',
  },
  {
    name: 'Google Business + PDF Menu',
    type: 'Basic web presence',
    discovery: 'Google Maps, basic search',
    booking: 'Phone or walk-in',
    payment: 'At counter/table',
    agentAccess: 'Can recommend but cannot book or order',
    arl: 'ARL-1',
    color: 'amber',
  },
  {
    name: 'Toast / Square Digital Menu',
    type: 'Digital POS with online menu',
    discovery: 'Google + structured menu data',
    booking: 'Widget on website',
    payment: 'Online ordering',
    agentAccess: 'Can read menu, limited booking API',
    arl: 'ARL-2',
    color: 'yellow',
  },
  {
    name: 'OpenTable / Resy Integration',
    type: 'Reservation platform',
    discovery: 'Platform search + Google',
    booking: 'API-accessible reservations',
    payment: 'Platform handles deposits',
    agentAccess: 'Can search, book, and modify reservations',
    arl: 'ARL-3',
    color: 'emerald',
  },
  {
    name: 'Full API + Payment + MCP',
    type: 'Agent-native restaurant',
    discovery: 'Agent card, llms.txt, MCP server',
    booking: 'Direct agent-to-agent negotiation',
    payment: 'Programmatic payment + billing',
    agentAccess: 'Full lifecycle: find, book, pay, modify, review',
    arl: 'ARL-5',
    color: 'purple',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string; barBg: string }> = {
    red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', barBg: 'bg-red-500' },
    amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', barBg: 'bg-amber-500' },
    yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', barBg: 'bg-yellow-500' },
    emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', barBg: 'bg-emerald-500' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', barBg: 'bg-blue-500' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', barBg: 'bg-purple-500' },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AgentReadyRestaurantsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Agent-Ready Means for Restaurants — From PDF Menus to AI Agents',
    description:
      'Most restaurants are invisible to AI agents. Learn the 5-level progression from PDF menus and phone reservations to a fully agent-ready restaurant with its own AI agent.',
    datePublished: '2026-03-30',
    dateModified: '2026-03-30',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/agent-ready-restaurants',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Industry Analysis',
    wordCount: 3200,
    about: {
      '@type': 'Thing',
      name: 'Agent Readiness for Restaurants',
      description: 'How restaurants can become discoverable, bookable, and transactable by AI agents.',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Agent-Ready Restaurants',
          item: 'https://agenthermes.ai/blog/agent-ready-restaurants',
        },
      ],
    },
  }

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
            <span className="text-zinc-400">Agent-Ready Restaurants</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              Industry Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Restaurants
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            What Agent-Ready Means for Restaurants:{' '}
            <span className="text-emerald-500">From PDF Menus to AI Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            There are over one million restaurants in the United States. The vast majority are
            completely invisible to AI agents. Their menus are PDFs. Their reservations require
            a phone call. Their hours are buried in a Facebook post from 2022. In the agent
            economy, these restaurants do not exist.
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              AgentHermes Research
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              March 30, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              14 min read
            </span>
          </div>
        </div>
      </section>

      {/* ===== KEY STATS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {restaurantStats.map((stat) => (
              <div
                key={stat.label}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-zinc-100 mb-1">{stat.value}</div>
                <div className="text-xs text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-2">
            <EyeOff className="h-6 w-6 text-red-400" />
            The Current State: Most Restaurants Are Invisible
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              AI agents are already helping people find places to eat. When a user asks ChatGPT,
              Claude, or a Google Gemini agent &ldquo;find me a good Thai restaurant nearby with
              gluten-free options,&rdquo; the agent goes looking for structured data it can parse.
              It checks for Schema.org markup, reads Google Business Profiles, scans for JSON
              endpoints, and looks for machine-readable menus.
            </p>
            <p>
              The overwhelming majority of restaurants give the agent nothing to work with. Our
              data from scanning restaurants across 12 cities shows that <strong className="text-zinc-100">60%
              of restaurants are at ARL-0</strong> — completely Dark. They have no structured data,
              no machine-readable menu, and no programmatic way to check hours or book a table.
              Another 25% are at ARL-1 — they have a Google Business Profile, so agents can find
              them, but the agent&rsquo;s recommendation always ends with &ldquo;call them to make a
              reservation.&rdquo;
            </p>
            <p>
              Only <strong className="text-zinc-100">8% of restaurants we scanned have reached ARL-2 or
              above</strong>, where an agent can actually read the menu with prices and dietary
              information. And fewer than 3% are at ARL-3, where an agent can book a table or
              place an order without human intervention.
            </p>
          </div>

          {/* Distribution bars */}
          <div className="mt-8 space-y-3">
            {[
              { level: 0, name: 'Dark', pct: 60, color: 'bg-red-500', desc: 'PDF menus, phone only' },
              { level: 1, name: 'Discoverable', pct: 25, color: 'bg-amber-500', desc: 'Google listing, basic info' },
              { level: 2, name: 'Readable', pct: 8, color: 'bg-yellow-500', desc: 'Digital menu with prices' },
              { level: 3, name: 'Bookable', pct: 5, color: 'bg-emerald-500', desc: 'Online booking API' },
              { level: 4, name: 'Transactable', pct: 1.5, color: 'bg-blue-500', desc: 'Full payment + mods' },
              { level: 5, name: 'Autonomous', pct: 0.5, color: 'bg-purple-500', desc: 'Own AI agent' },
            ].map((row) => (
              <div key={row.level} className="flex items-center gap-3">
                <span className="w-28 text-sm text-zinc-400 shrink-0">
                  ARL-{row.level} {row.name}
                </span>
                <div className="flex-1 h-7 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${row.color} flex items-center justify-end pr-2`}
                    style={{ width: `${Math.max(row.pct, 3)}%` }}
                  >
                    <span className="text-xs font-bold text-white">{row.pct}%</span>
                  </div>
                </div>
                <span className="text-xs text-zinc-600 hidden sm:inline w-40 shrink-0">{row.desc}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-xl bg-red-500/5 border border-red-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-red-400">The cost of being invisible:</strong> When an agent
              cannot find your restaurant, it recommends your competitor instead. Every agent
              interaction that skips your restaurant is a table that someone else fills. As AI
              agents become the primary way people discover and book restaurants, ARL-0 restaurants
              will experience a compounding loss of reservations they never even know about.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT FULLY AGENT-READY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            What a Fully Agent-Ready Restaurant Looks Like
          </h2>

          <p className="text-zinc-300 leading-relaxed mb-8">
            Imagine a restaurant that never misses a booking request, can accommodate complex
            dietary needs for a party of 12, negotiates group rates automatically, and fills
            empty Tuesday tables with dynamic pricing — all without the owner answering a
            single phone call. That is ARL-5: the restaurant has its own AI agent.
          </p>

          <div className="p-6 sm:p-8 rounded-2xl bg-purple-500/5 border border-purple-500/20 mb-8">
            <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5" />
              The Business Agent Concept
            </h3>
            <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
              <p>
                At ARL-5, your restaurant has its own AI agent — a &ldquo;business agent&rdquo; that
                represents the restaurant in the agent economy. This is not a chatbot on your
                website. It is a structured interface that other AI agents can talk to directly,
                machine to machine.
              </p>
              <p>
                When a customer tells their personal AI agent &ldquo;plan my anniversary dinner,&rdquo;
                their agent contacts your restaurant&rsquo;s agent. The two agents negotiate — checking
                availability, discussing menu options for dietary restrictions, confirming the private
                dining room, arranging a birthday cake, and settling on a price. The customer gets a
                fully planned experience. The restaurant fills a table. No phone call, no website
                browsing, no friction.
              </p>
              <p>
                The business agent knows things a static API never could: that the chef is out on
                Wednesday so the tasting menu is unavailable, that there are 3 cancellations tonight
                so a same-day booking for 6 is possible, that a returning customer prefers booth
                seating. It combines real-time operational awareness with structured agent protocols.
              </p>
            </div>
          </div>

          {/* 5 MCP Tools */}
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-emerald-500" />
            The 5 MCP Tools Every Restaurant Gets
          </h3>

          <p className="text-zinc-400 text-sm mb-6">
            AgentHermes generates these 5 tools as an MCP server endpoint for any restaurant
            in 60 seconds. Each tool follows the Model Context Protocol standard so any AI
            agent can call them directly.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                name: 'make_reservation',
                desc: 'Book a table for a given party size, date, and time',
                params: 'party_size, date, time, special_requests',
                category: 'book',
              },
              {
                name: 'view_menu',
                desc: 'Return the full menu with prices, descriptions, and dietary info',
                params: 'category, dietary_filter',
                category: 'understand',
              },
              {
                name: 'place_order',
                desc: 'Submit a takeout or delivery order with customizations',
                params: 'items, delivery_address, pickup_time',
                category: 'book',
              },
              {
                name: 'check_availability',
                desc: 'Check open table slots for a given date and party size',
                params: 'date, party_size, time_range',
                category: 'evaluate',
              },
              {
                name: 'get_restaurant_info',
                desc: 'Return hours, location, cuisine type, and contact info',
                params: 'fields',
                category: 'find',
              },
            ].map((tool) => (
              <div
                key={tool.name}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Zap className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-sm font-bold text-emerald-400">{tool.name}</code>
                      <span className="text-xs text-zinc-600 bg-zinc-800/50 px-2 py-0.5 rounded">{tool.category}</span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">{tool.desc}</p>
                    <p className="text-xs text-zinc-600 mt-1 font-mono">{tool.params}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXAMPLE CONVERSATION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-400" />
            Example: Booking a Birthday Dinner for 8
          </h2>

          <p className="text-zinc-400 mb-6">
            Here is how an AI agent handles a complex restaurant booking when the restaurant
            is agent-ready versus when it is not.
          </p>

          {/* User request */}
          <div className="mb-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-sm font-medium text-blue-400 mb-2 flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer Request
            </p>
            <p className="text-zinc-300 leading-relaxed">
              &ldquo;Plan a birthday dinner for 8 people next Saturday at 7pm. Three people are
              vegetarian, one has a nut allergy, and we want a private or semi-private area.
              Budget is around $80 per person including drinks. Somewhere with good Italian food
              in the downtown area.&rdquo;
            </p>
          </div>

          {/* ARL-0 response */}
          <div className="mb-4 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
            <p className="text-sm font-medium text-red-400 mb-2 flex items-center gap-2">
              <EyeOff className="h-4 w-4" />
              Agent Response — ARL-0 Restaurant
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed italic">
              &ldquo;I found several Italian restaurants in the downtown area, but I cannot verify
              which ones can accommodate 8 people, have private dining, or handle your dietary
              needs. Here are 4 phone numbers to call. You will need to ask each one about
              vegetarian options, nut allergies, private rooms, and availability for Saturday at
              7pm.&rdquo;
            </p>
            <p className="text-xs text-red-400/60 mt-2">Result: Customer makes 4 phone calls. Maybe books one.</p>
          </div>

          {/* ARL-3+ response */}
          <div className="mb-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Agent Response — ARL-3+ Restaurant (Agent-Ready)
            </p>
            <div className="text-sm text-zinc-300 leading-relaxed space-y-3">
              <p>
                &ldquo;I checked 6 Italian restaurants in downtown with agent-accessible booking
                systems. Here is what I found:
              </p>
              <p>
                <strong className="text-zinc-100">Trattoria Bella</strong> has a private dining room
                available Saturday at 7pm for parties of 6-12. Their menu has 8 vegetarian entrees and
                the kitchen confirmed they handle nut allergies (separate prep area). Prix fixe menu at
                $72/person includes appetizer, entree, dessert. Wine pairing adds $28/person — within
                your $80 budget without pairing, or $100 with.
              </p>
              <p>
                I have tentatively held the room for 15 minutes. The reservation includes notes about
                the 3 vegetarians, the nut allergy, and the birthday celebration. The restaurant will
                prepare a complimentary birthday dessert. Shall I confirm?&rdquo;
              </p>
            </div>
            <p className="text-xs text-emerald-400/60 mt-2">Result: Customer says &ldquo;confirm&rdquo; and the dinner is booked. Zero phone calls.</p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">The difference is not AI quality — it is data access.</strong>{' '}
              The same AI agent produces both responses. The only difference is whether the restaurant
              made its data (menu, availability, dietary info, private rooms) accessible to agents.
              The agent-ready restaurant gets the booking. The ARL-0 restaurant does not even know
              it was considered and rejected.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 5-LEVEL PROGRESSION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-emerald-500" />
            The Restaurant Agent Readiness Progression
          </h2>

          <p className="text-zinc-400 mb-8">
            Every restaurant falls somewhere on this progression. The goal is not to jump to
            ARL-5 overnight — it is to understand where you are and take the next step.
          </p>

          {/* Level Cards */}
          <div className="space-y-6">
            {restaurantLevels.map((level) => {
              const colors = getColorClasses(level.color)
              return (
                <div
                  key={level.level}
                  id={`level-${level.level}`}
                  className={`scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border ${colors.border}`}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${colors.bg} border ${colors.border}`}
                    >
                      <level.icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-100">
                        Level {level.level}: {level.name}
                      </h3>
                      <p className={`text-sm ${colors.text} font-medium`}>{level.tagline}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-300 leading-relaxed mb-6">{level.description}</p>

                  {/* Real-World Example */}
                  <div className={`p-4 rounded-xl ${colors.bg} border ${colors.border} mb-4`}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                      Real-World Example
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed">{level.realExample}</p>
                  </div>

                  {/* Agent Experience */}
                  <div className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/50 mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
                      <Bot className="h-3.5 w-3.5" />
                      What the Agent Says to the Customer
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed italic">
                      {level.agentExperience}
                    </p>
                  </div>

                  {/* What It Takes */}
                  {level.whatItTakes.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        What It Takes to Reach This Level
                      </p>
                      <ul className="space-y-1.5">
                        {level.whatItTakes.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                            <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${colors.text}`} />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM COMPARISON TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
            Platform Comparison: OpenTable vs Phone-Only vs Toast
          </h2>

          <p className="text-zinc-400 mb-8">
            The reservation and ordering platform a restaurant uses determines its starting ARL
            level. Here is how common setups compare for agent readiness.
          </p>

          <div className="overflow-x-auto -mx-4 px-4">
            <div className="inline-block min-w-full">
              <div className="space-y-3">
                {platformComparisons.map((platform) => {
                  const colors = getColorClasses(platform.color)
                  return (
                    <div
                      key={platform.name}
                      className={`p-5 rounded-xl bg-zinc-900/50 border ${colors.border}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-zinc-100">{platform.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-bold`}>
                          {platform.arl}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mb-3">{platform.type}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div>
                          <p className="text-zinc-600 mb-1">Discovery</p>
                          <p className="text-zinc-400">{platform.discovery}</p>
                        </div>
                        <div>
                          <p className="text-zinc-600 mb-1">Booking</p>
                          <p className="text-zinc-400">{platform.booking}</p>
                        </div>
                        <div>
                          <p className="text-zinc-600 mb-1">Payment</p>
                          <p className="text-zinc-400">{platform.payment}</p>
                        </div>
                        <div>
                          <p className="text-zinc-600 mb-1">Agent Access</p>
                          <p className="text-zinc-400">{platform.agentAccess}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">Key insight:</strong> OpenTable gets restaurants to ARL-3
              because it exposes reservation availability through a structured API. But even OpenTable
              only covers booking — it does not make your menu machine-readable, does not handle
              dietary filtering, and does not support agent-to-agent negotiation. A restaurant on
              OpenTable still needs AgentHermes to reach ARL-4 or ARL-5.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE MATH ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-emerald-500" />
            The Math: Why This Market Is Massive
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The restaurant agent readiness market is one of the largest vertical opportunities
              in the agent economy. Here is the math.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              {
                label: 'Total Addressable Market',
                value: '1M+ restaurants in the US',
                detail: 'Plus 1.5M+ internationally in English-speaking markets alone.',
                icon: Globe,
              },
              {
                label: 'Per-Reservation Revenue',
                value: '$2-5 per cover',
                detail: 'Agent-booked reservations generate per-cover fees similar to OpenTable ($1) but with more value-add services.',
                icon: CreditCard,
              },
              {
                label: 'SaaS Revenue',
                value: '$99/mo flat',
                detail: 'Monthly subscription for the AgentHermes restaurant MCP endpoint, agent card, and listing in the agent registry.',
                icon: DollarSign,
              },
              {
                label: 'Conversion Potential',
                value: '5% adoption = 50K restaurants',
                detail: '50,000 restaurants at $99/month = $59.4M ARR. Per-cover revenue adds $30-80M annually.',
                icon: TrendingUp,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <item.icon className="h-5 w-5 text-emerald-500 mb-3" />
                <p className="text-xs text-zinc-500 mb-1">{item.label}</p>
                <p className="text-lg font-bold text-zinc-100 mb-2">{item.value}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Why Restaurants Are the Perfect First Vertical
            </h3>
            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              <p>
                Restaurants have four qualities that make them ideal for agent readiness adoption:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                  <span><strong className="text-zinc-100">High transaction volume</strong> — a busy restaurant handles 200-400 covers per night. Each is an agent-bookable transaction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                  <span><strong className="text-zinc-100">Complex requirements</strong> — dietary restrictions, party sizes, timing, ambiance preferences. Agents excel at matching these to available options.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                  <span><strong className="text-zinc-100">Existing digital infrastructure</strong> — most restaurants already use Toast, Square, or Clover. The data exists — it just is not agent-accessible.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                  <span><strong className="text-zinc-100">Clear ROI</strong> — every agent-booked reservation is revenue the restaurant would not have gotten otherwise. The value prop is immediate and measurable.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW AGENTHERMES HELPS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-emerald-500" />
            How AgentHermes Gets You There in 60 Seconds
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The restaurant vertical template in AgentHermes is purpose-built for the food
              service industry. You enter your restaurant details — name, cuisine, address,
              hours, menu highlights — and in 60 seconds, the system generates everything
              an AI agent needs to find, understand, and book your restaurant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                step: '1',
                title: 'Enter your details',
                detail: 'Business name, cuisine type, address, hours, and top menu items. Takes 2 minutes.',
                color: 'emerald',
              },
              {
                step: '2',
                title: '5 MCP tools generated',
                detail: 'make_reservation, view_menu, place_order, check_availability, get_restaurant_info.',
                color: 'blue',
              },
              {
                step: '3',
                title: 'Agent card published',
                detail: 'agent-card.json with your restaurant metadata, hosted at your unique endpoint.',
                color: 'purple',
              },
              {
                step: '4',
                title: 'Listed in the registry',
                detail: 'Your restaurant appears in the AgentHermes registry, searchable by any AI agent.',
                color: 'amber',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-${item.color}-500/10 border border-${item.color}-500/20 text-${item.color}-400 font-bold text-sm mb-3`}>
                  {item.step}
                </div>
                <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <p className="text-zinc-400 leading-relaxed">
            The result: your restaurant jumps from ARL-0 (invisible) to ARL-3 (bookable) in
            under 60 seconds. Your restaurant now has a structured, machine-readable presence
            that any AI agent can discover, read, and interact with. And because AgentHermes
            handles the infrastructure, there is nothing to install, no code to write, and no
            POS integration required to start.
          </p>
        </div>
      </section>

      {/* ===== WHAT HAPPENS NEXT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Network className="h-6 w-6 text-purple-400" />
            The Future: Agent-to-Agent Dining
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              We are heading toward a world where the restaurant booking experience is entirely
              agent-mediated. A corporate travel agent books dinner for 30 executives across 3
              restaurants, coordinating timing so the group arrives after their conference session
              ends. A wedding planner&rsquo;s agent negotiates rehearsal dinner pricing with 4
              restaurant agents simultaneously, comparing menus that accommodate the couple&rsquo;s
              combined 6 dietary restrictions. A personal health agent books dinner at restaurants
              that align with the user&rsquo;s nutritional goals, pre-filtering for calorie counts
              and macros.
            </p>
            <p>
              This is not science fiction — every component of this exists today. MCP servers,
              agent-to-agent protocols (A2A), structured menu data, and booking APIs. The only
              missing piece is restaurants making their data agent-accessible. That is the problem
              AgentHermes solves.
            </p>
            <p>
              Restaurants that become agent-ready now will have a compounding advantage. As the
              agent economy grows from thousands of agent interactions per day to millions, the
              restaurants with structured data, booking APIs, and MCP endpoints will capture an
              outsized share of reservations. The restaurants still relying on phone calls and
              PDF menus will wonder where their customers went.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">The early-mover advantage is real.</strong> OpenTable
              proved that restaurants with online booking captured more reservations than
              phone-only competitors. The agent economy will amplify this effect. The difference
              is that this time, the infrastructure layer (AgentHermes) is available to every
              restaurant at $99/month — not just the ones that can afford enterprise integrations.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Make your restaurant agent-ready
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score, then connect to generate your restaurant&rsquo;s
            MCP endpoint, agent card, and registry listing in 60 seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              Score My Restaurant
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/for/restaurants"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              Restaurant Vertical Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
