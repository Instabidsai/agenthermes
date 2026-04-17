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
  Grape,
  HelpCircle,
  Layers,
  MapPin,
  Network,
  Package,
  Phone,
  Search,
  Server,
  Shield,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  Timer,
  TrendingUp,
  Wine,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Food and Beverage Agent Readiness: Why Breweries, Wineries, and Coffee Roasters Score Under 10 | AgentHermes',
  description:
    'Craft beverage producers post catalogs on Instagram and take tasting room reservations by phone. No structured product APIs, no inventory data, no subscription management endpoints. Here is what agent-ready looks like for breweries, wineries, distilleries, and coffee roasters.',
  keywords: [
    'food beverage brewery winery agent readiness',
    'craft brewery AI agent',
    'winery MCP server',
    'coffee roaster agent readiness',
    'distillery API',
    'craft beverage agent economy',
    'brewery agent readiness score',
    'winery tasting reservation API',
    'food and beverage digital infrastructure',
  ],
  openGraph: {
    title: 'Food and Beverage Agent Readiness: Why Breweries, Wineries, and Coffee Roasters Score Under 10',
    description:
      'Craft beverage industry product catalogs live on Instagram. Tasting rooms book by phone. Zero structured APIs. AI sommelier agents need data. First movers win.',
    url: 'https://agenthermes.ai/blog/food-beverage-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Food and Beverage Agent Readiness: Why Breweries, Wineries, and Coffee Roasters Score Under 10',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Food and Beverage Agent Readiness: Why Breweries, Wineries, and Coffee Roasters Score Under 10',
    description:
      'Craft beverage industry is invisible to AI agents. Breweries, wineries, distilleries, coffee roasters all score under 10. First mover captures AI sommelier referrals.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/food-beverage-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const beverageEndpoints = [
  {
    name: 'Product Catalog with Tasting Notes JSON',
    description: 'Structured endpoint returning every product with name, type, ABV/roast level, flavor profile, tasting notes, food pairings, and availability status. Replaces Instagram posts and PDF menus as the source of truth.',
    example: 'get_products() returns [{ name: "Hazy IPA", type: "beer", abv: 6.8, ibu: 45, tasting_notes: "tropical, citrus, soft mouthfeel", food_pairing: ["tacos", "grilled shrimp"], available: true }]',
    icon: Wine,
    color: 'purple',
  },
  {
    name: 'Availability by Location',
    description: 'Endpoint showing which products are available at which locations — taproom, retail partners, online store. Includes real-time inventory levels so agents know what is actually in stock, not just listed.',
    example: 'check_availability({ product: "hazy-ipa", zip: "97201" }) returns [{ location: "Taproom", in_stock: true, quantity: "48 pints" }, { location: "Whole Foods Pearl", in_stock: true }]',
    icon: MapPin,
    color: 'blue',
  },
  {
    name: 'Tasting Reservation API',
    description: 'Book tasting room visits, private tours, and group events programmatically. Returns available time slots, party size limits, pricing tiers (standard vs premium flight), and confirmation details.',
    example: 'book_tasting({ date: "2026-04-20", party_size: 4, type: "premium_flight" }) returns { confirmation: "TST-2847", time: "2pm", flight: "6 pours", price_per_person: 25 }',
    icon: Calendar,
    color: 'emerald',
  },
  {
    name: 'Subscription and Club Management',
    description: 'Endpoint for joining, modifying, or pausing wine clubs, beer subscriptions, and coffee roast-of-the-month plans. Returns plan options, pricing, shipping schedule, and member benefits.',
    example: 'get_plans() returns [{ name: "Quarterly Wine Club", price: 89, frequency: "quarterly", bottles: 3, includes: ["free tastings", "15% retail discount"] }]',
    icon: Package,
    color: 'amber',
  },
  {
    name: 'Wholesale Ordering API',
    description: 'B2B endpoint for restaurants, bars, and retailers to check wholesale pricing, place orders, and track deliveries. This is where most craft beverage revenue actually flows — and it is entirely manual today.',
    example: 'get_wholesale_pricing({ product: "hazy-ipa", quantity: "5 kegs" }) returns { unit_price: 145, total: 725, delivery_window: "3-5 business days", minimum_order: 2 }',
    icon: Store,
    color: 'cyan',
  },
]

const industrySegments = [
  { segment: 'Craft Breweries', count: '9,700+', avgScore: '7', topPlatform: 'Untappd (listing only)', revenue: '$28.4B' },
  { segment: 'Wineries', count: '11,500+', avgScore: '9', topPlatform: 'Wine.com (marketplace)', revenue: '$79.5B' },
  { segment: 'Distilleries', count: '2,700+', avgScore: '5', topPlatform: 'None', revenue: '$35.8B' },
  { segment: 'Coffee Roasters', count: '3,800+', avgScore: '8', topPlatform: 'Trade Coffee (marketplace)', revenue: '$48B (specialty)' },
]

const comparisonRows = [
  { aspect: 'Product discovery', current: 'Scroll Instagram, check Untappd, browse website', agentReady: 'Agent queries structured catalog by flavor profile, style, ABV range, food pairing' },
  { aspect: 'Tasting room booking', current: 'Call or walk in, hope there is availability', agentReady: 'book_tasting() checks real-time availability, books preferred time, confirms party size' },
  { aspect: 'Finding nearby', current: 'Google Maps search, check each website for hours', agentReady: 'Agent queries multiple producers by location, filters by open now, shows what is on tap' },
  { aspect: 'Club membership', current: 'Fill out paper form or website signup, call to modify', agentReady: 'get_plans() compares options, join_club() enrolls, manage_subscription() modifies' },
  { aspect: 'Wholesale ordering', current: 'Email rep, wait for quote, phone to finalize', agentReady: 'get_wholesale_pricing() returns instant quote, create_wholesale_order() places order' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do craft beverage producers score so low on agent readiness?',
    answer:
      'Three structural reasons. First, product catalogs live on Instagram and social media rather than structured databases — an Instagram post of a new beer release has zero machine-readable data. Second, the industry relies on in-person experience (taproom visits, tastings) that has never been digitized into bookable APIs. Third, the technology platforms that breweries and wineries use (Square POS, Toast, Arryved) are point-of-sale systems with no public API for product discovery or booking.',
  },
  {
    question: 'What AI agents would interact with a brewery or winery MCP server?',
    answer:
      'AI sommelier and food discovery agents are the primary use case. When someone tells their AI assistant "find me a brewery near downtown Portland with a good hazy IPA that I can visit Saturday afternoon," the agent needs structured product data, location availability, tasting room hours, and booking capability. Travel planning agents, event coordinators, and restaurant procurement agents are secondary users — all need structured beverage data that does not exist today.',
  },
  {
    question: 'How does this differ from restaurant agent readiness?',
    answer:
      'Restaurants need table reservation and menu APIs — their product is consumed on-site. Craft beverage producers have a more complex model: on-site tasting rooms, retail distribution, wholesale B2B, subscription clubs, and e-commerce shipping. A brewery needs five different channels digitized, not just one. Our restaurant agent readiness analysis covers the dining-specific patterns.',
  },
  {
    question: 'What about existing platforms like Untappd, Vivino, and Trade Coffee?',
    answer:
      'These are discovery marketplaces, not agent infrastructure. Untappd lets humans rate beers but offers no booking or purchasing API. Vivino shows wine ratings but cannot reserve a tasting or manage a wine club membership. Trade Coffee sells subscriptions but only for their partner roasters through their own checkout. None expose MCP-compatible endpoints. The platform that adds agent-facing APIs first — or the producers who build their own — capture the emerging channel.',
  },
  {
    question: 'Is wholesale ordering really a good fit for AI agents?',
    answer:
      'Wholesale is the highest-value opportunity. A bar manager who uses an AI procurement agent to restock inventory needs real-time pricing, availability, delivery windows, and ordering capability. Today this requires phone calls and emails to multiple distributors and producers. A single brewery with a wholesale API becomes the default supplier for every AI-powered bar and restaurant in its distribution area. The B2B channel is larger than direct-to-consumer for most craft producers.',
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

export default function FoodBeverageAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Food and Beverage Agent Readiness: Why Breweries, Wineries, and Coffee Roasters Score Under 10',
    description:
      'Craft beverage industry product catalogs live on Instagram. Tasting rooms book by phone. Zero structured APIs for the $190B craft beverage market. Here is what agent-ready looks like.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/food-beverage-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1850,
    keywords:
      'food beverage brewery winery agent readiness, craft beverage API, brewery MCP server, winery agent economy, coffee roaster agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Food & Beverage Agent Readiness',
          item: 'https://agenthermes.ai/blog/food-beverage-agent-readiness',
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
      title="Food and Beverage Agent Readiness: Why Breweries, Wineries, and Coffee Roasters Score Under 10"
      shareUrl="https://agenthermes.ai/blog/food-beverage-agent-readiness"
      currentHref="/blog/food-beverage-agent-readiness"
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
            <span className="text-zinc-400">Food &amp; Beverage Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Wine className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Craft Beverage
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Food and Beverage Agent Readiness:{' '}
            <span className="text-emerald-400">Why Breweries, Wineries, and Coffee Roasters Score Under 10</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The craft beverage industry — breweries, wineries, distilleries, and specialty coffee roasters —
            represents over <strong className="text-zinc-100">$190 billion in annual US revenue</strong>.
            Product catalogs live on Instagram. Tasting room reservations happen by phone. Inventory data
            is locked in POS systems. When an AI sommelier agent or food discovery agent tries to recommend
            a local craft producer, it finds{' '}
            <strong className="text-zinc-100">zero structured data to work with</strong>.
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

      {/* ===== THE INDUSTRY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            A $190 Billion Industry with Zero Agent Infrastructure
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The United States has over 27,000 craft beverage producers: 9,700 breweries, 11,500 wineries,
              2,700 distilleries, and 3,800 specialty coffee roasters. Together they generate roughly $190
              billion in annual revenue. Yet their digital infrastructure looks like it was built in 2010.
            </p>
            <p>
              A typical craft brewery announces new releases on Instagram, lists a taproom menu as a PDF
              on its website, takes tasting room reservations by phone or walk-in, manages wholesale orders
              through email chains with distributors, and runs its subscription club through a Shopify plugin
              or MailChimp. None of this is accessible to an AI agent.
            </p>
            <p>
              The problem is not technology adoption — these businesses use modern POS systems, e-commerce
              platforms, and social media. The problem is that{' '}
              <strong className="text-zinc-100">none of their data is exposed as structured, queryable APIs</strong>.
              It is all locked behind human-facing interfaces that agents cannot navigate.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Segment</div>
              <div>US Count</div>
              <div>Avg Score</div>
              <div>Top Platform</div>
              <div>US Revenue</div>
            </div>
            {industrySegments.map((row, i) => (
              <div
                key={row.segment}
                className={`grid grid-cols-5 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.segment}</div>
                <div className="text-zinc-400">{row.count}</div>
                <div className="text-red-400 font-mono">{row.avgScore}/100</div>
                <div className="text-zinc-500">{row.topPlatform}</div>
                <div className="text-zinc-400">{row.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY AGENTS CAN'T HELP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            The AI Sommelier Problem
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AI food and beverage agents are inevitable. Imagine telling your assistant: &ldquo;I like
              citrusy IPAs around 6-7% ABV. Find me a brewery within 30 minutes that has something like that
              on tap this weekend, and book a tasting for four people Saturday afternoon.&rdquo;
            </p>
            <p>
              Today, that request is impossible for any AI agent to fulfill. Here is why it fails at
              every step:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: 'Find matching products',
                need: 'Query breweries by beer style, ABV range, and flavor profile',
                reality: 'Beer data is on Instagram captions and Untappd check-ins. No structured query API exists.',
              },
              {
                step: 'Check what is on tap',
                need: 'See real-time taproom availability for matching beers',
                reality: 'Taproom menus are PDFs, chalkboard photos, or "see our taproom menu" dead links. No inventory API.',
              },
              {
                step: 'Verify location and hours',
                need: 'Confirm the brewery is within 30 minutes and open Saturday',
                reality: 'Google Business Profile has hours, but no API to confirm special event closures or holiday hours.',
              },
              {
                step: 'Book a tasting',
                need: 'Reserve a table or tasting flight for 4 people at 2pm Saturday',
                reality: 'Most taprooms are walk-in only. Those that take reservations use phone, email, or OpenTable (no agent API).',
              },
              {
                step: 'Remember preferences',
                need: 'Track which beers the user enjoyed for future recommendations',
                reality: 'No structured product data means nothing to store. The agent cannot build a taste profile.',
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.step}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">
                    <span className="text-blue-400 font-medium">Need:</span> {item.need}
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    <span className="text-red-400 font-medium">Reality:</span> {item.reality}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-red-400">The result:</strong> The agent falls back to
              &ldquo;Here are some breweries near you based on Google reviews.&rdquo; It cannot match
              by flavor profile, confirm what is on tap, or book anything. The user gets the same value
              as a Google search. The craft producer misses an agent-driven customer entirely.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Craft Beverage Looks Like: 5 Endpoints
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              An agent-ready craft beverage producer exposes five endpoints through an{' '}
              <Link href="/blog/what-is-mcp-server" className="text-emerald-400 hover:text-emerald-300 underline">MCP server</Link>.
              These cover both the consumer journey (discovery, tasting, membership) and the B2B channel
              (wholesale ordering) — the two revenue streams that matter most.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {beverageEndpoints.map((endpoint) => {
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

      {/* ===== CURRENT VS AGENT-READY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Today vs Agent-Ready: The Customer Journey
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every interaction between a customer and a craft beverage producer can be agent-mediated —
            from discovering a new beer to reordering wholesale kegs.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Task</div>
              <div>Today</div>
              <div>Agent-Ready</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.current}</div>
                <div className="text-emerald-400">{row.agentReady}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE OPPORTUNITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Three Agent Economy Opportunities for Craft Beverage
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The craft beverage industry has a unique agent economy advantage: the product is experience-based,
              geographically concentrated, and deeply personal. AI agents that can match taste preferences to
              local producers create massive value. Here are the three biggest opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'AI sommelier and taste agents',
                detail: 'Agents that learn individual taste preferences and match them to local producers. A user who likes "oaky Chardonnays under $25" gets matched to nearby wineries with exactly that. Structured tasting notes JSON is the prerequisite. Without it, the agent has nothing to match against.',
                icon: Wine,
              },
              {
                title: 'Tourism and experience agents',
                detail: 'Travel agents planning wine country weekends, brewery crawls, or coffee tours need tasting reservation APIs and availability data for multiple producers. The first region where 10+ producers are agent-ready becomes the default AI-recommended destination for craft beverage tourism.',
                icon: Globe,
              },
              {
                title: 'B2B procurement agents',
                detail: 'Restaurant and bar managers using AI procurement agents to manage inventory. An agent that can check wholesale pricing, compare delivery windows, and place restock orders across 5 distributors simultaneously saves hours per week. The wholesale API is the highest-revenue endpoint for most craft producers.',
                icon: Store,
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

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The platform play:</strong> Individual producers
              will not build MCP servers themselves — just like individual restaurants did not build their
              own websites in 2005. The opportunity is a platform that connects to existing POS systems
              (Square, Toast, Arryved) and e-commerce platforms (Shopify, WooCommerce, Commerce7) and
              presents their data as agent-ready endpoints. AgentHermes does exactly this through{' '}
              <Link href="/blog/ecommerce-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                e-commerce adapters
              </Link>{' '}
              and vertical-specific MCP templates.
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
                title: 'Restaurant Agent Readiness: Reservations, Menus, and Ordering',
                href: '/blog/agent-ready-restaurants',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'E-Commerce Agent Readiness: Shopify, WooCommerce, and Square',
                href: '/blog/ecommerce-agent-readiness',
                tag: 'Platform Analysis',
                tagColor: 'blue',
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
            Is your brewery, winery, or roastery invisible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score in 60 seconds. See where you stand and what it takes
            to become the first agent-ready producer in your category and region.
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
