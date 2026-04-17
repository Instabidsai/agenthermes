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
  Dumbbell,
  Globe,
  Heart,
  HelpCircle,
  MapPin,
  Server,
  Sparkles,
  Timer,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Fitness and Wellness Agent Readiness: Why Gyms, Spas, and Studios Are Invisible to AI | AgentHermes',
  description:
    'Fitness and wellness businesses average under 25 on the Agent Readiness Score. Class schedules in PDFs, phone-only booking, no public APIs. Learn what agent-ready fitness looks like and why the first gym with an MCP server wins.',
  keywords: [
    'fitness wellness agent readiness',
    'gym AI agent',
    'fitness studio MCP server',
    'wellness business AI',
    'class schedule API',
    'gym booking API',
    'agent readiness fitness',
    'spa agent readiness',
  ],
  openGraph: {
    title: 'Fitness and Wellness Agent Readiness: Gyms, Spas, and Studios Are Invisible to AI',
    description:
      'Class schedules in PDFs. Booking by phone only. Pricing gated behind membership tiers. The fitness industry is invisible to AI agents. Here is the fix.',
    url: 'https://agenthermes.ai/blog/fitness-wellness-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fitness and Wellness Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fitness and Wellness Agent Readiness: Invisible to AI Agents',
    description:
      'Gyms, spas, and studios average under 25/100 on agent readiness. Class schedules in PDFs, no APIs, phone-only booking. The first mover wins everything.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/fitness-wellness-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const subVerticals = [
  {
    name: 'CrossFit / Boutique Studios',
    score: '14-22',
    pain: 'WOD posted on Instagram. Class signup via Wodify/Zen Planner with no public API. Drop-in pricing requires a phone call.',
    icon: Dumbbell,
    color: 'red',
  },
  {
    name: 'Yoga / Pilates Studios',
    score: '12-18',
    pain: 'Schedule as a Mindbody widget. No standalone API. Pricing tiers require in-person visit or call. Retreats and workshops listed on a blog post.',
    icon: Heart,
    color: 'purple',
  },
  {
    name: 'Gyms (National Chains)',
    score: '20-30',
    pain: 'Planet Fitness, LA Fitness have websites with location finders. But membership pricing is gated behind a form. No class schedule API. No equipment availability.',
    icon: TrendingUp,
    color: 'amber',
  },
  {
    name: 'Day Spas / Massage',
    score: '10-16',
    pain: 'Menu of services as a PDF or image. Booking via phone, Vagaro, or Booksy. Therapist availability invisible. Gift cards require manual purchase.',
    icon: Sparkles,
    color: 'blue',
  },
  {
    name: 'Personal Trainers',
    score: '5-12',
    pain: 'Instagram bio link to a Calendly. No service descriptions, no pricing, no availability API. Qualifications described in an About page paragraph.',
    icon: Timer,
    color: 'cyan',
  },
]

const agentReadyCapabilities = [
  {
    step: '1',
    title: 'Structured class schedule API',
    detail: 'Real-time schedule endpoint returning class name, instructor, time, capacity, spots remaining, difficulty level, and location — all as structured JSON. Not an embedded Mindbody widget. Not a screenshot of a whiteboard.',
    icon: Calendar,
  },
  {
    step: '2',
    title: 'Real-time availability endpoint',
    detail: 'GET /availability?date=2026-04-16&class=yoga-flow returns spots remaining, waitlist count, and instructor. Agents can check availability across studios instantly instead of calling each one.',
    icon: Clock,
  },
  {
    step: '3',
    title: 'Membership pricing in JSON',
    detail: 'Structured pricing tiers: drop-in rate, monthly unlimited, class packs, annual plans. Each with price, included classes, guest passes, and cancellation terms. No "contact us for pricing." Agents cannot call you.',
    icon: DollarSign,
  },
  {
    step: '4',
    title: 'Automated booking and cancellation API',
    detail: 'POST /bookings creates a reservation. DELETE /bookings/{id} cancels it. Supports waitlist join. Returns confirmation ID, cancellation deadline, and late-cancel fee. The agent handles the entire flow.',
    icon: CheckCircle2,
  },
  {
    step: '5',
    title: 'MCP server with fitness-specific tools',
    detail: 'An MCP server exposing get_schedule(), check_availability(), get_pricing(), book_class(), and cancel_booking() tools. This makes the studio discoverable by any AI assistant — Claude, ChatGPT, or custom agents.',
    icon: Server,
  },
]

const comparisonRows = [
  { aspect: 'Find a class', today: 'Google the studio, scroll the schedule page, cross-reference with your calendar', agentReady: 'Agent calls get_schedule() across 10 studios, filters by time and type, returns best options' },
  { aspect: 'Check availability', today: 'Call the front desk or check the Mindbody app (if you have an account)', agentReady: 'Agent calls check_availability() and gets spots remaining in real time' },
  { aspect: 'Compare pricing', today: 'Visit 5 studio websites, none show pricing, call each one', agentReady: 'Agent queries get_pricing() across all studios, returns a comparison table in seconds' },
  { aspect: 'Book a spot', today: 'Create an account on Mindbody/Vagaro, enter payment, click through 4 screens', agentReady: 'Agent calls book_class() with your saved preferences and payment token' },
  { aspect: 'Cancel a booking', today: 'Log into the app, find the booking, confirm cancellation, hope you beat the deadline', agentReady: 'Agent calls cancel_booking() and confirms no late-cancel fee before executing' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does fitness score so low on agent readiness?',
    answer:
      'Three structural reasons. First, the industry relies on booking platforms (Mindbody, Zen Planner, Vagaro, Booksy) that do not expose public APIs — only embeddable widgets. Second, pricing is intentionally hidden to force in-person sales conversations. Third, class schedules change daily and are rarely published in structured formats. All three of these block the core signals AgentHermes checks across D1 Discoverability, D2 API Quality, and D4 Pricing.',
  },
  {
    question: 'What about Mindbody — does it not have an API?',
    answer:
      'Mindbody has a partner API, but it requires an enterprise partnership agreement, costs thousands per month, and is not publicly accessible. An AI agent cannot discover or connect to it without pre-approved credentials. For agent readiness, this is equivalent to not having an API — the agent cannot self-serve access. ClassPass has a similar restriction. The fix is a lightweight public API layer (or MCP server) in front of these systems.',
  },
  {
    question: 'Is there a first-mover advantage in fitness agent readiness?',
    answer:
      'Absolutely. When someone tells an AI assistant "find me a yoga class near me tomorrow morning," the agent queries every discoverable studio. Right now, it finds zero. The first studio in each metro area to publish an MCP server with schedule, availability, and booking tools will capture 100% of agent-driven bookings in that area. This advantage compounds — agents learn which businesses work and preferentially route future requests to them.',
  },
  {
    question: 'How does this relate to local business agent readiness?',
    answer:
      'Fitness is a subset of local business agent readiness, but with unique challenges. Unlike a restaurant (which mainly needs menu and reservation tools), a fitness business has rotating schedules, capacity-limited classes, membership tiers, waitlists, and cancellation policies. The MCP toolset is more complex, but the market opportunity is identical: the first mover in each zip code wins.',
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

export default function FitnessWellnessAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Fitness and Wellness Agent Readiness: Why Gyms, Spas, and Studios Are Invisible to AI',
    description:
      'Fitness and wellness businesses average under 25 on the Agent Readiness Score. Class schedules in PDFs, phone-only booking, no public APIs. The first gym with an MCP server wins.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/fitness-wellness-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords: 'fitness wellness agent readiness, gym AI agent, fitness studio MCP server, wellness business AI',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Fitness and Wellness Agent Readiness',
          item: 'https://agenthermes.ai/blog/fitness-wellness-agent-readiness',
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
      title="Fitness and Wellness Agent Readiness: Invisible to AI"
      shareUrl="https://agenthermes.ai/blog/fitness-wellness-agent-readiness"
      currentHref="/blog/fitness-wellness-agent-readiness"
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
            <span className="text-zinc-400">Fitness and Wellness Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Dumbbell className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Score: Under 25
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Fitness and Wellness Agent Readiness:{' '}
            <span className="text-emerald-400">Invisible to AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Class schedules trapped in PDFs. Booking by phone call only. Pricing hidden behind
            &ldquo;contact us&rdquo; walls. The $96 billion US fitness industry is almost entirely
            invisible to AI agents. The first gym with an <strong className="text-zinc-100">MCP
            server</strong> gets booked by every AI personal assistant in the market.
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

      {/* ===== THE LANDSCAPE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            The Fitness Agent Readiness Landscape
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The fitness and wellness industry generates $96 billion annually in the US alone.
              Over 200,000 gym locations, 40,000 yoga studios, and tens of thousands of spas,
              personal trainers, and wellness centers. When AI agents try to interact with any of
              them, they hit a wall. Not a technical wall — a structural one. The industry built
              its digital infrastructure for humans with smartphones, not for autonomous agents
              making API calls.
            </p>
            <p>
              AgentHermes scans across the fitness vertical show an average score below 25 — well
              below Bronze tier. The worst sub-vertical (personal trainers) averages under 12.
              Even national chains with significant technology budgets score between 20 and 30,
              held back by the same platform dependency that affects every business in this space.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '<25', label: 'avg fitness score', icon: BarChart3 },
              { value: '$96B', label: 'US fitness market', icon: DollarSign },
              { value: '200K+', label: 'gym locations', icon: MapPin },
              { value: '0', label: 'with MCP servers', icon: Server },
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

      {/* ===== SUB-VERTICAL BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-red-500" />
            Sub-Vertical Breakdown: Where Each Category Fails
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The fitness vertical is not monolithic. Each sub-category has different technology
            stacks and different failure patterns. But they all share one thing: zero public
            APIs that an agent can discover and use without pre-existing credentials.
          </p>

          <div className="space-y-4 mb-8">
            {subVerticals.map((vertical) => {
              const colors = getColorClasses(vertical.color)
              return (
                <div
                  key={vertical.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <vertical.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{vertical.name}</h3>
                      <span className={`text-xs ${colors.text}`}>Score range: {vertical.score}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{vertical.pain}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY FITNESS LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Fitness Actually Looks Like
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              An agent-ready fitness business exposes five core capabilities as structured APIs or
              MCP tools. These are the minimum for an AI personal assistant to discover the business,
              understand its offerings, and complete a booking without human intervention.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {agentReadyCapabilities.map((item) => (
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

      {/* ===== TODAY VS AGENT-READY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            Today vs Agent-Ready: The User Experience Gap
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The difference between how fitness works today and how it works when agent-ready
            is not incremental. It is the difference between 15 minutes of manual research and
            a 3-second automated booking.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Task</div>
              <div className="text-zinc-500">Today</div>
              <div className="text-emerald-400">Agent-Ready</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.today}</div>
                <div className="text-emerald-400">{row.agentReady}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FIRST MOVER ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            The First-Mover Advantage Is Absolute
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Unlike SEO, where the top 10 results share the traffic, agent interactions are
              winner-take-all. When an AI assistant searches for a yoga class, it needs one
              answer — the best available option it can actually book. If only one studio in
              a metro area has an MCP server, that studio gets 100% of agent-driven bookings
              for yoga in that area. Not 50%. Not a fair share. All of it.
            </p>
            <p>
              This is identical to the dynamic described in{' '}
              <Link href="/blog/local-business-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                local business agent readiness
              </Link>
              . The first plumber, the first dentist, the first pizza shop in each zip code to
              become agent-ready captures every agent-driven lead. Fitness is no different — except
              the prize is larger. A yoga studio filling 20 classes per day from agent bookings at
              $25 per drop-in is $182,500 in annual revenue from a channel that currently generates zero.
            </p>
            <p>
              The technology barrier is lower than fitness owners think. AgentHermes can auto-generate
              an MCP server with fitness-specific tools — schedule, availability, pricing, booking —
              in under 5 minutes. The first studios to move will have a 12-to-18-month head start
              before competitors even understand what happened.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The platform lock-in problem:</strong> Mindbody,
              Vagaro, and Zen Planner could solve this overnight by publishing MCP servers for their
              merchants. They have the data. They have the APIs (internally). But they are incentivized
              to keep users on their platforms, not to make businesses discoverable by external agents.
              This creates the opportunity for a neutral infrastructure layer — which is exactly what
              AgentHermes provides. Your MCP server works with any booking platform behind it.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HEALTHCARE CROSSOVER ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-purple-500" />
            The Wellness-Healthcare Continuum
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Fitness and wellness sit adjacent to{' '}
              <Link href="/blog/healthcare-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                healthcare
              </Link>
              , which averages 33/100 on agent readiness. The shared challenge is the same:
              appointment-based services with complex scheduling, capacity constraints, and
              provider-specific availability.
            </p>
            <p>
              But fitness has one massive advantage over healthcare: no HIPAA. A yoga studio can
              publish class schedules, instructor bios, pricing tiers, and booking availability
              without any regulatory burden. There is no PHI (protected health information) in
              &ldquo;Tuesday 9 AM Vinyasa with Sarah has 3 spots left.&rdquo; The regulatory
              excuse that healthcare uses does not apply here. The only thing preventing fitness
              businesses from being agent-ready is awareness and tooling — both of which are
              solvable today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Fitness advantage: No regulatory barriers',
                detail: 'Class schedules, instructor qualifications, pricing, and availability are all non-sensitive public information. Unlike healthcare (HIPAA) or finance (PCI), fitness businesses can publish everything an agent needs without legal review.',
              },
              {
                title: 'Fitness advantage: High booking volume',
                detail: 'A single studio runs 20-40 classes per week. Each class has 15-30 spots. That is hundreds of bookable slots per week per location — massive surface area for agent interactions and revenue.',
              },
              {
                title: 'Shared challenge: Platform dependency',
                detail: 'Both fitness and healthcare rely on third-party booking platforms (Mindbody, Epic) that do not expose public APIs. The fix is the same: a lightweight agent-facing API layer on top.',
              },
              {
                title: 'Shared challenge: Schedule complexity',
                detail: 'Rotating schedules, substitute instructors, seasonal changes, and special events make static schedule data useless. Agent-ready fitness needs real-time data, not a PDF from last month.',
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
                title: 'Local Business Agent Readiness: The $6.2B Opportunity',
                href: '/blog/local-business-agent-readiness',
                tag: 'Market Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Healthcare Agent Readiness: Why the Average Score Is 33',
                href: '/blog/healthcare-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'How to Improve Your Agent Readiness Score',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
                tagColor: 'green',
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
            Is your fitness business visible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see where you stand. Then connect your business
            to get an auto-generated MCP server with fitness-specific tools.
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
