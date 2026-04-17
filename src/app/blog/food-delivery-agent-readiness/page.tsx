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
  Network,
  Percent,
  Search,
  Server,
  Shield,
  ShoppingCart,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Truck,
  UtensilsCrossed,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Food Delivery Agent Readiness: Why DoorDash and UberEats Have APIs But Restaurants Don\'t | AgentHermes',
  description:
    'Food delivery platforms have merchant APIs but individual restaurants have zero. The middleman is agent-ready, the actual business is not. Agent-ready restaurants with MCP servers bypass 30% platform commissions.',
  keywords: [
    'food delivery agent readiness',
    'DoorDash API',
    'UberEats API',
    'restaurant MCP server',
    'agent ready restaurant',
    'food delivery AI agents',
    'restaurant ordering API',
    'DoorDash commission',
    'direct ordering AI agent',
  ],
  openGraph: {
    title: 'Food Delivery Agent Readiness: Why DoorDash Has APIs But Restaurants Don\'t',
    description:
      'The middleman is agent-ready. The actual restaurant is not. How MCP servers let restaurants bypass 30% delivery platform fees with direct agent ordering.',
    url: 'https://agenthermes.ai/blog/food-delivery-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Food Delivery Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Food Delivery Agent Readiness: DoorDash Has APIs, Restaurants Don\'t',
    description:
      'The middleman is agent-ready. The restaurant is not. MCP servers are the disintermediation play.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/food-delivery-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const platformComparison = [
  { platform: 'DoorDash', merchantApi: true, publicApi: true, commission: '15-30%', agentScore: '~52', notes: 'Drive API, Storefront API, webhook events' },
  { platform: 'UberEats', merchantApi: true, publicApi: true, commission: '15-30%', agentScore: '~48', notes: 'Orders API, menu sync, delivery status' },
  { platform: 'Grubhub', merchantApi: true, publicApi: false, commission: '15-30%', agentScore: '~35', notes: 'Merchant portal only, limited API access' },
  { platform: 'Avg Restaurant', merchantApi: false, publicApi: false, commission: '0%', agentScore: '~8', notes: 'Phone, walk-in, maybe a website with PDF menu' },
]

const mcpTools = [
  { name: 'get_menu()', description: 'Full menu with prices, descriptions, dietary tags, photos, and availability. Structured JSON, not a PDF.', color: 'emerald' },
  { name: 'check_availability()', description: 'Real-time table availability, delivery radius, estimated wait times. No more calling to ask.', color: 'blue' },
  { name: 'create_order()', description: 'Place a pickup or delivery order with itemized items, modifications, and payment token. End-to-end.', color: 'purple' },
  { name: 'get_delivery_estimate()', description: 'Delivery time and fee based on address. The restaurant controls the price, not a platform.', color: 'amber' },
  { name: 'get_specials()', description: 'Daily specials, happy hour deals, catering packages. Agents find them instantly.', color: 'cyan' },
]

const commissionBreakdown = [
  { item: 'DoorDash commission per order', platform: '$6-9', direct: '$0' },
  { item: 'Monthly fees (tablet + marketing)', platform: '$100-500', direct: '$0-30 hosting' },
  { item: 'Menu control', platform: 'Platform-managed', direct: 'Restaurant-managed' },
  { item: 'Customer data ownership', platform: 'Platform owns it', direct: 'Restaurant owns it' },
  { item: 'Agent discoverability', platform: 'Via platform only', direct: 'Direct MCP connection' },
  { item: 'Pricing flexibility', platform: 'Platform markup 15-20%', direct: 'Restaurant sets price' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do delivery platforms have APIs but restaurants do not?',
    answer:
      'Delivery platforms are technology companies that happen to deliver food. They built APIs to onboard merchants, sync menus, and manage orders programmatically. Restaurants are food businesses that happen to need technology. Building an API was never on their roadmap, just like building a website was not in the 1990s. That gap is the opportunity.',
  },
  {
    question: 'Can a restaurant really bypass DoorDash with an MCP server?',
    answer:
      'For agent-driven orders, yes. When a user asks an AI assistant to order dinner, the agent looks for structured ordering endpoints. If the restaurant has an MCP server with create_order(), the agent calls it directly. No DoorDash, no commission, no markup. The restaurant keeps the full margin. This does not replace delivery logistics — it replaces the ordering middleman.',
  },
  {
    question: 'What about delivery logistics if the restaurant goes direct?',
    answer:
      'Restaurants can use delivery-as-a-service providers like DoorDash Drive, Uber Direct, or local couriers. These charge a flat fee per delivery ($5-8) instead of 30% of the order total. The restaurant handles ordering via MCP, and outsources delivery at a fraction of the platform commission.',
  },
  {
    question: 'How hard is it for a restaurant to get an MCP server?',
    answer:
      'With AgentHermes, it takes under 5 minutes. The restaurant connects through our wizard, selects the restaurant vertical, and we auto-generate an MCP server with menu, availability, ordering, and delivery tools pre-configured for the food service industry. No coding, no servers to manage.',
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

export default function FoodDeliveryAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Food Delivery Agent Readiness: Why DoorDash and UberEats Have APIs But Restaurants Don\'t',
    description:
      'Food delivery platforms have merchant APIs but individual restaurants have zero. The middleman is agent-ready, the actual business is not. How MCP servers bypass 30% delivery platform commissions.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/food-delivery-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'food delivery agent readiness, DoorDash API, UberEats API, restaurant MCP server, direct ordering AI agent',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Food Delivery Agent Readiness',
          item: 'https://agenthermes.ai/blog/food-delivery-agent-readiness',
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
      title="Food Delivery Agent Readiness: Why DoorDash and UberEats Have APIs But Restaurants Don't"
      shareUrl="https://agenthermes.ai/blog/food-delivery-agent-readiness"
      currentHref="/blog/food-delivery-agent-readiness"
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
            <span className="text-zinc-400">Food Delivery Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Disintermediation
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Food Delivery Agent Readiness:{' '}
            <span className="text-emerald-400">Why DoorDash Has APIs But Restaurants Don&apos;t</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            DoorDash, UberEats, and Grubhub have merchant APIs that let software manage menus, orders, and
            delivery. The restaurants on those platforms have <strong className="text-zinc-100">zero</strong>.
            The middleman is agent-ready. The actual business is not. This is the biggest disintermediation
            opportunity in the agent economy.
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

      {/* ===== THE MIDDLEMAN PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5 text-amber-500" />
            The Platform Has the API. The Restaurant Does Not.
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              There are over <strong className="text-zinc-100">1 million restaurants</strong> in the United
              States. Roughly 350,000 are listed on DoorDash. Another 900,000 are on UberEats. All three
              major delivery platforms offer merchant APIs: DoorDash has its Drive API and Storefront API,
              UberEats has its Orders API with menu sync and delivery webhooks, and Grubhub provides a
              merchant portal with limited programmatic access.
            </p>
            <p>
              But here is the critical asymmetry: <strong className="text-zinc-100">the platforms are
              agent-ready, the restaurants are not</strong>. When an AI agent needs to order dinner for a user,
              it has two options. It can call the DoorDash API and place an order through the platform, paying
              a 15-30% commission that the restaurant absorbs. Or it can try to interact with the restaurant
              directly, and find nothing — no API, no structured menu, no ordering endpoint. Just a phone number
              and maybe a PDF menu.
            </p>
            <p>
              The agent takes the path that works. Today, that path goes through the platform. Every time.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '1M+', label: 'US restaurants', icon: UtensilsCrossed },
              { value: '~350K', label: 'on DoorDash', icon: Truck },
              { value: '30%', label: 'avg platform commission', icon: DollarSign },
              { value: '~8', label: 'avg restaurant score', icon: BarChart3 },
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

      {/* ===== PLATFORM COMPARISON TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Platform vs Restaurant: Agent Readiness Comparison
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Delivery platforms invested in APIs because they are technology companies. Restaurants did not
            because they are food businesses. The result is a massive agent readiness gap between the
            middleman and the actual service provider.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-xs font-bold text-zinc-300">
              <div>Platform</div>
              <div>Merchant API</div>
              <div>Commission</div>
              <div>Est. Score</div>
              <div>Notes</div>
            </div>
            {platformComparison.map((row, i) => (
              <div
                key={row.platform}
                className={`grid grid-cols-5 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.platform}</div>
                <div className={row.merchantApi ? 'text-emerald-400' : 'text-red-400'}>
                  {row.merchantApi ? 'Yes' : 'None'}
                </div>
                <div className={row.commission === '0%' ? 'text-emerald-400' : 'text-amber-400'}>
                  {row.commission}
                </div>
                <div className="text-zinc-300">{row.agentScore}</div>
                <div className="text-zinc-500 text-xs">{row.notes}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The 50-point gap:</strong> DoorDash scores an estimated
              52 for agent readiness. The average restaurant on DoorDash scores 8. That is a 44-point gap
              between the platform and the business it represents. The platform captures all agent traffic
              and charges 30% for the privilege.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE COMMISSION TRAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-red-500" />
            The 30% Commission Trap
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Restaurant profit margins average 3-9%. Delivery platforms charge 15-30% per order. The math
              is brutal: a restaurant making 6% profit on a $30 order earns $1.80. DoorDash takes $6-9 from
              that same order. The platform makes 3-5x what the restaurant makes on every delivery order.
            </p>
            <p>
              Restaurants accepted this trade because they had no alternative. They could not build their
              own ordering technology, could not handle delivery logistics, and could not reach customers
              who had already shifted to app-based ordering. The platform owned the customer relationship
              and the technology layer.
            </p>
            <p>
              AI agents change this equation. An agent does not open the DoorDash app. It queries available
              ordering endpoints. If the restaurant has its own MCP server with a{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                create_order()
              </code>{' '}
              tool, the agent calls it directly. The platform is bypassed entirely for the ordering step.
              The restaurant keeps 100% of the order value and pays only for delivery logistics if needed.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Cost Item</div>
              <div>Via DoorDash</div>
              <div>Via MCP Server</div>
            </div>
            {commissionBreakdown.map((row, i) => (
              <div
                key={row.item}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200 text-xs">{row.item}</div>
                <div className="text-red-400 text-xs">{row.platform}</div>
                <div className="text-emerald-400 text-xs">{row.direct}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT AN AGENT-READY RESTAURANT LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-emerald-500" />
            What an Agent-Ready Restaurant Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An agent-ready restaurant exposes its own ordering capabilities through an MCP server.
            Five tools cover the entire customer interaction — from browsing the menu to placing an order.
          </p>

          <div className="space-y-4 mb-8">
            {mcpTools.map((tool) => {
              const colors = getColorClasses(tool.color)
              return (
                <div
                  key={tool.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <code className={`${colors.text} text-sm font-bold`}>{tool.name}</code>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{tool.description}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              With these five tools, an AI agent can handle the complete ordering flow. A user says
              &ldquo;order me a large pepperoni pizza from Mario&apos;s for pickup at 7pm&rdquo; and the
              agent calls <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">get_menu()</code>,
              finds the item, calls <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">check_availability()</code> to confirm
              the time slot, and places the order via <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">create_order()</code>.
              No app download. No platform commission. No phone call.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE DISINTERMEDIATION PLAY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            The Disintermediation Play: 30% to 0%
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              This is the same pattern that played out with hotels and OTAs. Booking.com and Expedia built
              agent-accessible booking systems and charged hotels 15-25% commission. Hotels that invested in
              direct booking technology clawed back margin over time. The hotel industry spent a decade and
              billions of dollars on &ldquo;book direct&rdquo; campaigns.
            </p>
            <p>
              Restaurants have the same opportunity right now, but at a fraction of the cost. An MCP server
              from AgentHermes takes 5 minutes to set up and costs less per month than a single DoorDash
              order&apos;s commission. Every agent-driven order that comes through the MCP server instead of
              DoorDash is pure margin recapture.
            </p>
            <p>
              The math on a $30 average order: DoorDash takes $6-9. Direct MCP ordering costs the
              restaurant under $0.10 in infrastructure. That is a <strong className="text-zinc-100">98%
              reduction in ordering costs</strong> for every order that shifts to the direct channel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'Phase 1: Coexist',
                detail: 'Keep DoorDash for human app users. Add MCP server for agent-driven orders. Two channels, additive revenue.',
                color: 'emerald',
              },
              {
                title: 'Phase 2: Shift',
                detail: 'As agent traffic grows, more orders bypass the platform. Restaurant captures growing share at 0% commission.',
                color: 'blue',
              },
              {
                title: 'Phase 3: Own',
                detail: 'Restaurant owns the ordering relationship. Platform becomes delivery-only service at flat fee, not percentage.',
                color: 'purple',
              },
            ].map((phase) => {
              const colors = getColorClasses(phase.color)
              return (
                <div
                  key={phase.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className={`font-bold ${colors.text} mb-2 text-sm`}>{phase.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{phase.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">First-mover advantage:</strong> The first restaurant in
              each neighborhood with an MCP server gets every agent-driven order for that cuisine category.
              AI agents prefer structured, direct endpoints over platform intermediaries. Being first is not
              just an advantage — it is a monopoly on agent traffic for your category and location.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY RESTAURANTS HAVE NOT DONE THIS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-500" />
            Why Restaurants Have Not Built This Themselves
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'No technical team',
                detail: 'Restaurants are food businesses. They have chefs, servers, and managers — not developers. Building an API is not a weekend project for a restaurant owner.',
              },
              {
                title: 'POS fragmentation',
                detail: 'Toast, Square, Clover, Aloha, Revel — the POS market is fragmented across dozens of systems. Each handles menus and orders differently. No universal standard.',
              },
              {
                title: 'Delivery dependency',
                detail: 'Platforms bundled ordering with delivery. Restaurants think leaving DoorDash means losing delivery capability. It does not — delivery-as-a-service exists separately.',
              },
              {
                title: 'Nobody told them',
                detail: 'Restaurants do not know what an MCP server is, just like they did not know what a website was in 1996. The awareness gap is the real blocker, not the technology.',
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Every one of these barriers is solvable with a platform approach. AgentHermes auto-generates
              MCP servers with restaurant-specific tools pre-configured. The restaurant owner fills in their
              menu data, business hours, and delivery area. The MCP server handles the rest. No coding, no
              servers, no POS integration required for the first version. Connect POS later for real-time
              menu sync — but start capturing agent orders now.
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
                title: 'What Agent-Ready Means for Restaurants',
                href: '/blog/agent-ready-restaurants',
                tag: 'Industry Analysis',
                tagColor: 'amber',
              },
              {
                title: 'E-Commerce Agent Readiness: Platform Showdown',
                href: '/blog/ecommerce-agent-readiness',
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
            Skip the 30% commission
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your restaurant&apos;s Agent Readiness Score, then get an MCP server that lets AI agents
            order directly. No platform fees, no app downloads, no phone calls.
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
              Connect My Restaurant
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
