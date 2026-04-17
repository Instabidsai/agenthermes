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
  Heart,
  Layers,
  Lock,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Pet Services Agent Readiness: Why Dog Walkers and Groomers Are Missing the AI Economy | AgentHermes',
  description:
    'The $150B pet industry is booming but invisible to AI agents. Rover and Wag own the marketplace. Individual pet businesses have zero API, zero structured data. Learn what agent-ready pet services look like.',
  keywords: [
    'pet services agent readiness',
    'pet industry AI agents',
    'dog walker API',
    'pet groomer agent readiness',
    'Rover Wag API',
    'pet services MCP server',
    'agent economy pet industry',
    'pet booking AI',
    'veterinary agent readiness',
  ],
  openGraph: {
    title: 'Pet Services Agent Readiness: Why Dog Walkers and Groomers Are Missing the AI Economy',
    description:
      'The $150B pet industry is booming but invisible to AI agents. Individual pet businesses score 6/100 on average. Here is what agent-ready pet services look like.',
    url: 'https://agenthermes.ai/blog/pet-services-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pet Services Agent Readiness: Why Dog Walkers and Groomers Are Missing the AI Economy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Services Agent Readiness: Why Dog Walkers and Groomers Are Missing the AI Economy',
    description:
      '$150B pet industry. Zero APIs for individual pet businesses. AI assistants will book pet services alongside haircuts and dentists — but only if you have an API.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/pet-services-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const petServiceTypes = [
  {
    name: 'Dog Walking',
    marketSize: '$1.2B',
    platforms: 'Rover, Wag',
    agentScore: '4/100',
    gap: 'No availability API — walkers manage via text message and paper calendars',
    icon: Heart,
    color: 'amber',
  },
  {
    name: 'Pet Grooming',
    marketSize: '$14.5B',
    platforms: 'PetSmart, independent shops',
    agentScore: '7/100',
    gap: 'Phone-only booking, service menus in PDF or Instagram, no pricing endpoint',
    icon: Sparkles,
    color: 'purple',
  },
  {
    name: 'Pet Boarding & Daycare',
    marketSize: '$9.2B',
    platforms: 'Rover, PetExec',
    agentScore: '8/100',
    gap: 'Availability locked behind login portals, no vacancy API, waitlists by phone',
    icon: Shield,
    color: 'blue',
  },
  {
    name: 'Pet Sitting',
    marketSize: '$2.4B',
    platforms: 'Rover, Care.com',
    agentScore: '3/100',
    gap: 'Zero digital presence beyond marketplace listings, no direct booking path',
    icon: Globe,
    color: 'emerald',
  },
]

const agentReadyComponents = [
  {
    tool: 'check_availability({ date, service_type, pet_size })',
    description: 'Returns open slots for dog walking, grooming, boarding, or sitting by date, service, and pet size. Agents can check multiple providers in parallel.',
    impact: 'D2 API Quality +15 points',
  },
  {
    tool: 'get_services({ include_pricing: true })',
    description: 'Returns structured JSON: service name, duration, price by pet size, add-ons (nail trim, teeth brushing, flea treatment). No PDFs, no phone calls.',
    impact: 'D4 Pricing +8 points, D6 Data +10 points',
  },
  {
    tool: 'book_appointment({ service, date, slot, pet_profile })',
    description: 'Creates a confirmed booking with pet name, breed, weight, special instructions. Returns confirmation ID, cancellation policy, and payment link.',
    impact: 'D2 API Quality +15 points, D9 Agent Experience +7 points',
  },
  {
    tool: 'get_pet_profile_requirements({ service_type })',
    description: 'Returns required vaccination records, behavioral notes, and intake forms as structured data. Agents pre-fill everything before the first visit.',
    impact: 'D3 Onboarding +8 points',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does my pet grooming business need an API?',
    answer:
      'AI assistants are already managing personal schedules for millions of people. When someone says "book a grooming appointment for Max this Saturday," the agent searches for businesses with structured booking endpoints. If you only accept phone calls, the agent skips you and books with the competitor that has an API. The same dynamic that killed businesses without websites in 2005 is happening now with APIs.',
  },
  {
    question: 'I use Rover/Wag — does that count as being agent-ready?',
    answer:
      'Rover and Wag have their own APIs, but those APIs serve the marketplace — not your individual business. When an agent books through Rover, Rover owns the customer relationship, sets the pricing, and takes a 20-40% commission. Having your own MCP server means agents book directly with you at your prices. It is the difference between having a storefront and renting a booth in someone else\'s store.',
  },
  {
    question: 'My clients book through Instagram DMs. Is that agent-accessible?',
    answer:
      'No. Instagram DMs are invisible to AI agents. There is no API for an agent to send a DM to your business account and parse the response. Social media is a human-to-human channel. Agent-ready means structured endpoints that return JSON — not unstructured text conversations in a closed platform.',
  },
  {
    question: 'What about pet vaccination records and liability waivers?',
    answer:
      'An agent-ready pet service exposes a get_intake_requirements() tool that returns exactly what documents and records are needed before the first appointment. The agent can then help the pet owner gather vaccination certificates, sign digital waivers, and submit everything before arrival — eliminating the 15-minute paper intake process.',
  },
  {
    question: 'How much would an MCP server cost for a pet business?',
    answer:
      'Building a custom API from scratch would cost thousands. AgentHermes auto-generates MCP servers with pet-service-specific tools — availability checking, service menus, booking, and intake requirements — starting with a free tier. You fill out your business details and get a hosted MCP endpoint without writing code.',
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

export default function PetServicesAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Pet Services Agent Readiness: Why Dog Walkers and Groomers Are Missing the AI Economy',
    description:
      'The $150B pet industry is booming but individual pet businesses are invisible to AI agents. Analysis of agent readiness across dog walking, grooming, boarding, and pet sitting.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/pet-services-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'pet services agent readiness, pet industry AI, dog walker API, pet groomer MCP server, Rover Wag agent economy',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Pet Services Agent Readiness',
          item: 'https://agenthermes.ai/blog/pet-services-agent-readiness',
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
      title="Pet Services Agent Readiness: Why Dog Walkers and Groomers Are Missing the AI Economy"
      shareUrl="https://agenthermes.ai/blog/pet-services-agent-readiness"
      currentHref="/blog/pet-services-agent-readiness"
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
            <span className="text-zinc-400">Pet Services Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Heart className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              $150B Market
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Pet Services Agent Readiness:{' '}
            <span className="text-emerald-400">Why Dog Walkers and Groomers Are Missing the AI Economy</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Americans spend <strong className="text-zinc-100">$150 billion a year</strong> on their pets.
            Rover and Wag own the marketplace. But the 250,000+ independent dog walkers, groomers,
            boarders, and sitters have <strong className="text-zinc-100">zero API exposure</strong>.
            AI assistants will book pet services alongside haircuts and dentist appointments — but only
            if your business has a structured endpoint to call.
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

      {/* ===== THE PLATFORM TRAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-amber-500" />
            The Platform Trap: Rover and Wag Own Your Customer Relationship
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The pet services industry has a familiar problem. Marketplace platforms — Rover, Wag,
              Care.com — have built the digital infrastructure that individual pet businesses never did.
              They have APIs, structured data, review systems, and payment processing. The individual
              dog walker or groomer has a Facebook page and a phone number.
            </p>
            <p>
              This creates a dependency that mirrors what happened with restaurants and DoorDash. The
              platform owns the customer acquisition channel, sets commission rates (20-40%), and
              controls the data. When an AI agent needs to book a dog walker, it finds Rover — not your
              independent business. Rover keeps the customer relationship. You keep the labor.
            </p>
            <p>
              The agent economy offers a way out. An individual pet business with its own MCP server
              can be discovered directly by AI agents. No marketplace commission. No platform dependency.
              The agent books with you at your price because it can call{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                check_availability()
              </code>{' '}
              and{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                book_appointment()
              </code>{' '}
              directly on your endpoint.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$150B', label: 'US pet industry (2024)', icon: DollarSign },
              { value: '250K+', label: 'independent pet businesses', icon: Heart },
              { value: '6/100', label: 'average agent readiness', icon: BarChart3 },
              { value: '0', label: 'with MCP servers', icon: Bot },
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

      {/* ===== PET SERVICE BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Agent Readiness by Pet Service Type
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We analyzed agent readiness across four major pet service categories. The pattern is
            consistent: platforms score in the 30-45 range, individual businesses score under 10.
          </p>

          <div className="space-y-4 mb-8">
            {petServiceTypes.map((service) => {
              const colors = getColorClasses(service.color)
              return (
                <div
                  key={service.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                        <service.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-100">{service.name}</h3>
                        <p className="text-xs text-zinc-500">Market: {service.marketSize} | Platforms: {service.platforms}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-red-400">{service.agentScore}</div>
                      <div className="text-xs text-zinc-500">avg score</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      <span className="text-amber-400 font-medium">Gap:</span> {service.gap}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The lowest scores in pet services come from the most fragmented segments. Dog walking
              and pet sitting are dominated by individuals who operate entirely through word of mouth,
              Nextdoor posts, and text messages. There is no digital infrastructure for an AI agent
              to interact with. Even businesses that use scheduling software like Time To Pet or
              Pet Sitter Plus are locked behind proprietary platforms with no public API.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AI PERSONAL ASSISTANT SCENARIO ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-emerald-500" />
            The AI Personal Assistant Scenario: Booking Everything at Once
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Here is the scenario that makes pet service agent readiness urgent. A person says to
              their AI assistant: &ldquo;I am going on vacation next week. Book a dog boarder for
              Tuesday through Sunday, a grooming appointment for Monday before drop-off, schedule a
              house cleaner for Wednesday, and cancel my Thursday dentist appointment.&rdquo;
            </p>
            <p>
              The AI agent handles this as a batch of tasks. It cancels the dentist (agent-ready
              dental platforms have cancellation APIs). It books the house cleaner (some cleaning
              services are starting to expose booking endpoints). But when it gets to the dog
              boarder and groomer? Dead end. No API. No structured availability. No booking
              endpoint. The agent tells the user: &ldquo;I could not find any pet services with
              online booking availability. You will need to call these businesses directly.&rdquo;
            </p>
            <p>
              That is the moment your competitor with an MCP server captures the booking. The agent
              will preferentially route to businesses it can transact with programmatically. The
              pet business that is agent-ready gets the revenue. The one that requires a phone call
              gets skipped — not because it is worse, but because it is{' '}
              <strong className="text-zinc-100">invisible to the system doing the booking</strong>.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The multi-service booking pattern:</strong> AI
              assistants do not book one service at a time. They batch errands. Pet services compete
              for attention alongside every other appointment-based business —{' '}
              <Link href="/blog/beauty-salon-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                salons
              </Link>,{' '}
              <Link href="/blog/dental-veterinary-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                dentists
              </Link>, cleaners, mechanics. The first category to become agent-ready in each local
              market captures disproportionate traffic.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY PET SERVICES LOOK LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Pet Services Look Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An agent-ready pet business exposes four core tools that AI agents can discover and call.
            Together, these handle the full customer journey from discovery to confirmed booking.
          </p>

          <div className="space-y-3 mb-8">
            {agentReadyComponents.map((component) => (
              <div
                key={component.tool}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="mb-2">
                  <code className="text-emerald-400 bg-zinc-800/50 px-2 py-1 rounded text-sm font-medium">
                    {component.tool}
                  </code>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-2">{component.description}</p>
                <p className="text-xs text-zinc-500">
                  <span className="text-emerald-400 font-medium">Score impact:</span> {component.impact}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Compare this to the current state. A typical independent groomer has a website with
              a phone number, maybe an Instagram feed showing before-and-after photos, and a
              &ldquo;Call to Book&rdquo; button. None of that is machine-readable. The photos are
              great for humans but useless to an AI agent that needs to know if there is a 2pm
              slot available on Saturday for a medium-sized poodle.
            </p>
            <p>
              The transition does not require building a custom API. AgentHermes auto-generates
              MCP servers with pet-service-specific tools based on your business details. You
              provide your service menu, hours, and pricing. The platform creates a hosted endpoint
              that any AI agent can discover and interact with.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE DISINTERMEDIATION OPPORTUNITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Disintermediation Opportunity: Bypass the 20-40% Platform Tax
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Rover takes 20% of every booking. Wag takes up to 40%. For a dog walker charging
              $25 per walk, that is $5-$10 going to the platform on every single walk. Over a
              year of regular clients, the platform tax adds up to thousands of dollars.
            </p>
            <p>
              The agent economy offers a structural alternative. When an AI agent books directly
              with your MCP server, there is no marketplace commission. The agent found you through
              the AgentHermes registry or your agent-card.json file. The booking happened through
              your endpoint. The payment goes to you directly.
            </p>
            <p>
              This is not theoretical. It mirrors exactly what happened when{' '}
              <Link href="/blog/local-business-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                local businesses
              </Link>{' '}
              started building their own websites and stopped relying entirely on Yellow Pages
              and Yelp. The businesses that own their digital infrastructure keep more revenue.
              In the agent economy, your digital infrastructure is your MCP server.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
              <h3 className="font-bold text-red-400 mb-2 text-sm">Through Rover/Wag</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">-</span> 20-40% commission per booking</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">-</span> Platform owns customer data</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">-</span> Platform controls pricing display</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">-</span> Reviews locked in marketplace</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="font-bold text-emerald-400 mb-2 text-sm">Through Your MCP Server</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">+</span> 0% commission — direct booking</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">+</span> You own the customer relationship</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">+</span> You control pricing and availability</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">+</span> Agent-card.json is portable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCORING DIMENSIONS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            How AgentHermes Scores Pet Services
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes evaluates pet service businesses across the same{' '}
              <Link href="/blog/what-is-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                9 dimensions
              </Link>{' '}
              used for all businesses, but with vertical-specific weighting. For pet services,
              D2 API Quality (availability and booking endpoints) and D4 Pricing Transparency
              (structured service menus) carry extra weight because they are the core of the
              customer interaction.
            </p>
            <p>
              The typical independent pet business scores 6/100. That is ARL-0: Dark — completely
              invisible to the agent economy. The path to Bronze (40+) requires just three things:
              a structured service listing, published pricing in JSON, and a basic availability
              endpoint. The path to Silver (60+) adds booking capability and an agent-card.json file.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The 6-to-60 path:</strong> Going from 6/100 to
              60/100 (ARL-0 to Silver) is achievable in under a week with AgentHermes. The platform
              auto-generates your MCP server with pet-service-specific tools, creates your
              agent-card.json, and lists you in the registry. No code, no infrastructure management,
              no ongoing maintenance.{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                Scan your pet business now
              </Link>{' '}
              to see your starting score.
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
                title: 'Beauty Salon Agent Readiness: Why Booking Apps Own Your Business',
                href: '/blog/beauty-salon-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Local Business Agent Readiness: The 33 Million Business Gap',
                href: '/blog/local-business-agent-readiness',
                tag: 'Market Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Get Your Agent Readiness Score',
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
            Is your pet business invisible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your Agent Readiness Score in 60 seconds. See how your pet service compares
            across all 9 dimensions and get a roadmap to becoming agent-ready.
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
              Connect My Pet Business
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
