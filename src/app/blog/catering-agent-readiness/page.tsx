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
  HelpCircle,
  Layers,
  Network,
  Search,
  Server,
  Shield,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  Users,
  UtensilsCrossed,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Catering Agent Readiness: Why Event Caterers Cannot Receive Orders From AI Event Planning Agents | AgentHermes',
  description:
    'The $65B US catering market runs on phone calls and PDF menus. AI event planning agents cannot send orders to caterers because nothing is structured. Here is what agent-ready catering looks like.',
  keywords: [
    'catering event agent readiness',
    'catering AI agent',
    'event catering automation',
    'agent readiness catering',
    'AI event planning catering',
    'catering API',
    'catering MCP server',
    'event caterer automation',
    'agent economy catering',
  ],
  openGraph: {
    title:
      'Catering Agent Readiness: Why Event Caterers Cannot Receive Orders From AI Event Planning Agents',
    description:
      'The $65B US catering market runs on phone calls and PDF menus. AI event planning agents need structured data to send orders — and zero caterers provide it.',
    url: 'https://agenthermes.ai/blog/catering-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Catering Agent Readiness: Why Event Caterers Cannot Receive Orders From AI Event Planning Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Catering Agent Readiness: Why Event Caterers Cannot Receive Orders From AI',
    description:
      '$65B market. Zero structured data. AI event planning agents cannot order catering because everything runs on phone calls and PDFs.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/catering-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const cateringGaps = [
  {
    area: 'Menu Discovery',
    current: 'PDF menus on website, sometimes just photos of printed menus',
    agentReady:
      'Structured menu API with item names, descriptions, ingredients, allergen tags, dietary labels, and per-item pricing',
    icon: UtensilsCrossed,
    color: 'red',
  },
  {
    area: 'Pricing',
    current:
      '"Starting at $25/person" with actual price depending on menu selection, headcount, service style, and season',
    agentReady:
      'Price calculator endpoint: input headcount + menu selections + service type, output total with line items',
    icon: DollarSign,
    color: 'red',
  },
  {
    area: 'Dietary Requirements',
    current:
      'Call to discuss allergies and dietary needs. Staff writes notes on paper or in email thread',
    agentReady:
      'Menu filtering API: query by dietary restriction (vegan, gluten-free, kosher, halal, nut-free) returns matching items',
    icon: Shield,
    color: 'red',
  },
  {
    area: 'Availability',
    current:
      'Phone call or email to check if date is open. Response time: hours to days',
    agentReady:
      'Availability checker: input date + estimated headcount, output confirmed/waitlisted/unavailable in milliseconds',
    icon: Calendar,
    color: 'red',
  },
  {
    area: 'Order Submission',
    current:
      'Email chain with menu selections, headcount, event details, back-and-forth on substitutions',
    agentReady:
      'Order submission endpoint: structured JSON with event details, menu selections, headcount, dietary notes, contact info',
    icon: ShoppingCart,
    color: 'red',
  },
  {
    area: 'Delivery Logistics',
    current:
      'Phone call to confirm delivery address, setup time, equipment needs, parking instructions',
    agentReady:
      'Delivery scheduling API: address validation, setup time estimation, equipment checklist, parking requirements field',
    icon: Truck,
    color: 'red',
  },
]

const agentReadyTools = [
  {
    name: 'get_menu',
    description:
      'Returns full menu catalog with items, descriptions, allergens, dietary tags, and per-item pricing. Filterable by dietary restriction, course, or cuisine type.',
    example:
      'get_menu({ dietary: "gluten-free", course: "entree" }) returns 12 matching entrees with prices',
  },
  {
    name: 'calculate_price',
    description:
      'Calculates total cost based on headcount, menu selections, service style (buffet/plated/stations), and any add-ons like equipment rental or staffing.',
    example:
      'calculate_price({ headcount: 150, items: ["herb-chicken", "caesar-salad"], service: "buffet" }) returns $4,125',
  },
  {
    name: 'check_availability',
    description:
      'Checks if a specific date and headcount are available. Returns confirmed, waitlisted, or unavailable with next available dates.',
    example:
      'check_availability({ date: "2026-06-15", headcount: 200 }) returns { status: "available", deposit_required: 500 }',
  },
  {
    name: 'submit_order',
    description:
      'Submits a complete catering order with event details, menu selections, dietary requirements, delivery address, and contact information.',
    example:
      'submit_order({ event_date: "2026-06-15", headcount: 200, items: [...], address: "..." }) returns order_id and deposit_link',
  },
  {
    name: 'schedule_delivery',
    description:
      'Schedules delivery logistics including arrival time, setup duration, equipment needs, parking instructions, and breakdown time.',
    example:
      'schedule_delivery({ order_id: "ORD-123", setup_time: "10:00", event_start: "12:00" }) returns delivery_confirmation',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question:
      'Why would an AI agent need to order catering?',
    answer:
      'AI event planning agents are already managing venue bookings, entertainment, and invitations. Catering is the largest single expense for most events — typically 40-60% of the total budget. When an agent plans a corporate retreat, wedding reception, or fundraiser, it needs to select menus, get pricing by headcount, accommodate dietary restrictions, and submit the order. Today, the agent hits a wall at catering because nothing is structured.',
  },
  {
    question:
      'What score do most caterers get on the Agent Readiness Score?',
    answer:
      'Most catering businesses score between 3 and 12 out of 100. They typically have a website (partial D1 Discovery credit) but no API, no structured pricing, no machine-readable menus, and no way for an agent to check availability or submit an order. The industry average is well below the 43/100 cross-industry average from our 500-business scan.',
  },
  {
    question:
      'Do caterers need to build their own API?',
    answer:
      'No. Platforms like AgentHermes auto-generate MCP servers for catering businesses. You provide your menu data, pricing rules, and availability calendar — the platform creates structured endpoints that any AI agent can discover and use. No coding required.',
  },
  {
    question:
      'How does dietary filtering work for agents?',
    answer:
      'An agent-ready menu API tags every item with dietary attributes: vegan, vegetarian, gluten-free, dairy-free, nut-free, kosher, halal, and common allergens. When a user tells their AI assistant "I need catering for 80 people, 20 are vegan and 5 have nut allergies," the agent queries the menu API with those filters and builds a compatible order automatically.',
  },
  {
    question:
      'What is the business case for becoming agent-ready?',
    answer:
      'The catering industry is highly competitive with thin margins. Agent-ready caterers will capture orders that agents cannot place with competitors — especially corporate events where executive assistants increasingly delegate to AI. Early movers in each metro area will own the agent channel before competitors understand it exists.',
  },
]

function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    red: {
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    amber: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    blue: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CateringAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Catering Agent Readiness: Why Event Caterers Cannot Receive Orders From AI Event Planning Agents',
    description:
      'The $65B US catering market runs on phone calls and PDF menus. AI event planning agents need structured data to send catering orders, and zero caterers provide it.',
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
      'https://agenthermes.ai/blog/catering-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'catering event agent readiness, catering AI, event catering automation, agent-ready catering, AI event planning',
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
          name: 'Catering Agent Readiness',
          item: 'https://agenthermes.ai/blog/catering-agent-readiness',
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
      title="Catering Agent Readiness: Why Event Caterers Cannot Receive Orders From AI Event Planning Agents"
      shareUrl="https://agenthermes.ai/blog/catering-agent-readiness"
      currentHref="/blog/catering-agent-readiness"
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
              <Link
                href="/"
                className="hover:text-zinc-300 transition-colors"
              >
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
              <span className="text-zinc-400">Catering Agent Readiness</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <UtensilsCrossed className="h-3.5 w-3.5" />
                Vertical Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                $65B Market
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Catering Agent Readiness:{' '}
              <span className="text-emerald-400">
                Why Event Caterers Cannot Receive Orders From AI Event Planning
                Agents
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              The US catering market generates{' '}
              <strong className="text-zinc-100">$65 billion annually</strong>.
              Every dollar of it flows through phone calls, email chains, and
              PDF menus. AI event planning agents are already coordinating
              venues, entertainment, and guest lists — but when it comes time
              to order food, they hit a wall. Not a single catering business in
              America can receive a structured order from an AI agent.
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
                    12 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== THE EVENT PLANNING AGENT SCENARIO ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5 text-emerald-500" />
              The Event Planning Agent Scenario
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Imagine an executive assistant AI agent tasked with planning a
                200-person corporate retreat. The agent books a venue through a
                venue API. It reserves entertainment through a booking
                platform. It sends invitations through an email service. Then
                it needs to order catering for 200 people — 30 vegetarian, 15
                vegan, 8 with nut allergies, and 5 gluten-free — with a budget
                of $45 per person.
              </p>
              <p>
                The agent searches for caterers in the event area. It finds
                websites with beautiful food photography, testimonials, and a
                phone number. No menus with structured data. No pricing by
                headcount. No dietary filter. No availability check. No way to
                submit an order. The agent tells the human:{' '}
                <strong className="text-zinc-100">
                  &ldquo;I found 12 caterers in the area. You will need to call
                  each one to get pricing and availability.&rdquo;
                </strong>
              </p>
              <p>
                This is the catering industry&apos;s agent readiness problem.
                Every other part of the event planning workflow has been
                digitized. Catering remains analog — and it is the single
                largest line item on most event budgets.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '$65B', label: 'US catering market', icon: DollarSign },
                { value: '0', label: 'caterers agent-ready', icon: Server },
                { value: '40-60%', label: 'of event budgets', icon: Target },
                {
                  value: '<10',
                  label: 'avg readiness score',
                  icon: BarChart3,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SIX GAPS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              Six Gaps Between Catering and Agent Readiness
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              We scanned catering businesses across the US. Every single one
              fails on the same six dimensions. Here is what exists today
              versus what an agent-ready caterer would provide.
            </p>

            <div className="space-y-4 mb-8">
              {cateringGaps.map((gap) => {
                const colors = getColorClasses(gap.color)
                return (
                  <div
                    key={gap.area}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <gap.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">
                        {gap.area}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                        <p className="text-xs text-red-400 font-medium mb-1">
                          Today
                        </p>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {gap.current}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <p className="text-xs text-emerald-400 font-medium mb-1">
                          Agent-Ready
                        </p>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {gap.agentReady}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== WHAT AGENT-READY CATERING LOOKS LIKE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              What Agent-Ready Catering Looks Like
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                An agent-ready caterer exposes five MCP tools that let any AI
                agent discover their menu, calculate pricing, check
                availability, submit orders, and schedule delivery — all
                without a phone call. Here is the complete tool set.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {agentReadyTools.map((tool) => (
                <div
                  key={tool.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="h-4 w-4 text-emerald-400" />
                    <h3 className="font-bold text-zinc-100 text-sm font-mono">
                      {tool.name}()
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                    {tool.description}
                  </p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">
                        Example:
                      </span>{' '}
                      <code className="text-emerald-400 text-xs">
                        {tool.example}
                      </code>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                With these five tools, an AI event planning agent can handle
                the entire catering workflow for a 200-person event in under 30
                seconds. Compare that to the current process: 3-5 phone calls,
                2-4 email exchanges, and 1-2 weeks of back-and-forth per
                caterer. Multiply by 3-5 caterers for comparison quotes, and
                the human time investment is 10-20 hours.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE AGENT ECONOMY CONVERGENCE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-500" />
              The Agent Economy Convergence for Events
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Catering does not exist in isolation. AI event planning agents
                will manage catering alongside{' '}
                <Link
                  href="/blog/event-ticketing-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  event ticketing
                </Link>
                , venue booking, entertainment, decor, photography, and
                transportation. The caterer that is agent-ready becomes part of
                an automated event planning pipeline. The caterer that is not
                becomes the bottleneck that forces the entire workflow back to
                manual.
              </p>
              <p>
                This convergence creates a powerful network effect. When a
                venue has an agent-ready API and an entertainment company has
                an agent-ready API, the agent can plan 80% of an event
                automatically. But that remaining 20% — catering — breaks the
                entire automation chain. The agent cannot submit a final event
                plan without a confirmed catering order.
              </p>
              <p>
                For caterers, this means first-mover advantage is amplified.
                The first agent-ready caterer in each metro area does not just
                capture direct agent traffic — it becomes the default catering
                provider for every automated event planning workflow in that
                region. AI agents prefer reliability. Once an agent
                successfully places an order with a caterer, it will route
                future events there unless given a reason not to.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-blue-400">
                  The restaurant parallel:
                </strong>{' '}
                We documented a similar pattern in{' '}
                <Link
                  href="/blog/agent-ready-restaurants"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  agent-ready restaurants
                </Link>{' '}
                and{' '}
                <Link
                  href="/blog/food-delivery-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  food delivery agent readiness
                </Link>
                . Restaurants that adopted online ordering platforms early
                captured disproportionate delivery revenue. The same dynamic
                will play out with agent readiness — but faster, because AI
                agents operate at machine speed.
              </p>
            </div>
          </div>
        </section>

        {/* ===== SCORING BREAKDOWN ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              Why Caterers Score Under 10
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The AgentHermes 9-dimension scoring framework reveals exactly
                where catering businesses fail. Most caterers score 3-12 out
                of 100, well below the 43/100 cross-industry average. Here is
                the dimension-by-dimension breakdown.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Dimension</div>
                <div>Typical Score</div>
                <div>Why</div>
              </div>
              {[
                {
                  dim: 'D1 Discovery',
                  score: '2/15',
                  why: 'Website exists but no API docs, no agent-card, no llms.txt',
                },
                {
                  dim: 'D2 API Quality',
                  score: '0/15',
                  why: 'No API of any kind. Zero endpoints.',
                },
                {
                  dim: 'D3 Onboarding',
                  score: '1/10',
                  why: 'Contact form exists but no self-service, no API keys',
                },
                {
                  dim: 'D4 Pricing',
                  score: '1/10',
                  why: '"Starting at" pricing with no calculator or structured rates',
                },
                {
                  dim: 'D5 Payment',
                  score: '0/10',
                  why: 'Phone/email deposits. No programmatic payment.',
                },
                {
                  dim: 'D6 Data Quality',
                  score: '1/10',
                  why: 'Menu exists as PDF/images. No structured data.',
                },
                {
                  dim: 'D7 Security',
                  score: '2/15',
                  why: 'HTTPS on website. No API auth needed (no API exists).',
                },
                {
                  dim: 'D8 Reliability',
                  score: '1/10',
                  why: 'Website uptime. No API to measure reliability of.',
                },
                {
                  dim: 'D9 Agent Experience',
                  score: '0/10',
                  why: 'No agent-card.json, no MCP, no llms.txt. Completely dark.',
                },
              ].map((row, i) => (
                <div
                  key={row.dim}
                  className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.dim}</div>
                  <div className="text-red-400">{row.score}</div>
                  <div className="text-zinc-500">{row.why}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The total is typically 8 out of 100. That places catering
                businesses at{' '}
                <strong className="text-zinc-100">ARL-0: Dark</strong> — the
                lowest tier on the Agent Readiness Level scale. They are
                completely invisible to AI agents. An agent cannot discover
                them, understand their offerings, or transact with them in any
                way.
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
                    'Agent-Ready Restaurants: What Full-Stack Food Service Looks Like',
                  href: '/blog/agent-ready-restaurants',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Food Delivery Agent Readiness: The Platform Comparison',
                  href: '/blog/food-delivery-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Event Ticketing Agent Readiness: Why Ticket Platforms Lead',
                  href: '/blog/event-ticketing-agent-readiness',
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
              Is your catering business ready for AI agents?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run a free Agent Readiness Scan to see your score across all 9
              dimensions. Then connect your business to start receiving orders
              from AI event planning agents.
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
