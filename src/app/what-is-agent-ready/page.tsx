import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Search,
  BookOpen,
  UserPlus,
  Link2,
  Activity,
  CreditCard,
  CheckCircle,
  Thermometer,
  TreePine,
  Droplets,
  Sparkles,
  Home,
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Scale,
  Calculator,
  Stethoscope,
  Building2,
  Briefcase,
  Cloud,
  Laptop,
  Globe,
  Heart,
  Pill,
  Brain,
  Plane,
  Shield,
  GraduationCap,
  Wrench as WrenchIcon,
  Scissors,
  type LucideIcon,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'What Does Agent-Ready Mean for Your Business? | AgentHermes',
  description:
    'AI agents are learning to find, use, and pay for services on behalf of humans. See what agent-ready means for every type of business across 11 industry verticals.',
  openGraph: {
    title: 'What Does Agent-Ready Mean for Your Business?',
    description:
      'The definitive guide to agent readiness across every industry. See the 6-step agent journey and what it means for your vertical.',
    url: 'https://agenthermes.ai/what-is-agent-ready',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Does Agent-Ready Mean for Your Business?',
    description:
      'The definitive guide to agent readiness across every industry. See the 6-step agent journey and what it means for your vertical.',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/what-is-agent-ready',
  },
}

// ---------------------------------------------------------------------------
// 6-step agent journey with per-vertical examples
// ---------------------------------------------------------------------------
const journeySteps = [
  {
    step: 1,
    label: 'FIND',
    question: 'Can an AI agent discover your business exists?',
    icon: Search,
    color: 'emerald',
    examples: [
      { vertical: 'SaaS', detail: 'Agent card, MCP endpoint, OpenAPI spec' },
      { vertical: 'Restaurant', detail: 'Structured data, Google Business, menu online' },
      { vertical: 'Plumber', detail: 'Service area, availability, pricing visible to machines' },
    ],
  },
  {
    step: 2,
    label: 'UNDERSTAND',
    question: 'Can an agent know what you offer?',
    icon: BookOpen,
    color: 'blue',
    examples: [
      { vertical: 'SaaS', detail: 'API documentation, pricing tiers, feature lists' },
      { vertical: 'Restaurant', detail: 'Menu with prices, dietary info, hours' },
      { vertical: 'Plumber', detail: 'Services list, pricing ranges, specialties' },
    ],
  },
  {
    step: 3,
    label: 'SIGN UP',
    question: 'Can an agent create an account?',
    icon: UserPlus,
    color: 'purple',
    examples: [
      { vertical: 'SaaS', detail: 'Programmatic signup, OAuth, API keys' },
      { vertical: 'Restaurant', detail: 'No signup needed (reservation system)' },
      { vertical: 'Plumber', detail: 'No signup needed (booking form)' },
    ],
  },
  {
    step: 4,
    label: 'CONNECT',
    question: 'Can an agent call your service?',
    icon: Link2,
    color: 'amber',
    examples: [
      { vertical: 'SaaS', detail: 'REST API with auth' },
      { vertical: 'Restaurant', detail: 'Reservation API (OpenTable), ordering API (Toast)' },
      { vertical: 'Plumber', detail: 'Booking form, phone, email' },
    ],
  },
  {
    step: 5,
    label: 'USE',
    question: 'Can an agent get reliable responses?',
    icon: Activity,
    color: 'cyan',
    examples: [
      { vertical: 'SaaS', detail: 'JSON responses, error handling, uptime' },
      { vertical: 'Restaurant', detail: 'Confirmed reservations, order tracking' },
      { vertical: 'Plumber', detail: 'Appointment confirmation, arrival estimate' },
    ],
  },
  {
    step: 6,
    label: 'PAY',
    question: 'Can an agent pay for the service?',
    icon: CreditCard,
    color: 'rose',
    examples: [
      { vertical: 'SaaS', detail: 'Subscription API, usage billing' },
      { vertical: 'Restaurant', detail: 'Credit card on file, split bills' },
      { vertical: 'Plumber', detail: 'Invoice, payment link' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Per-vertical breakdown data
// ---------------------------------------------------------------------------
interface VerticalBreakdown {
  slug: string
  name: string
  icon: LucideIcon
  meaning: string
  tools: string[]
  avgScore: string
  agentInteraction: string
}

const verticalBreakdowns: VerticalBreakdown[] = [
  {
    slug: 'local-services',
    name: 'Local Services',
    icon: WrenchIcon,
    meaning:
      'Agent-ready means a homeowner can tell their AI assistant "my AC broke" and the agent can find your business, check your availability, book a service call, get an estimate, and pay the invoice -- all without a phone call.',
    tools: [
      'check_service_area -- verify ZIP code coverage',
      'get_availability -- return open appointment slots',
      'request_service -- submit a service request with details',
      'get_estimate -- provide pricing for described issues',
      'get_business_info -- return licenses, hours, reviews',
    ],
    avgScore: '15/100',
    agentInteraction:
      '"My AC stopped working. Find an HVAC tech in Austin who can come today." The agent checks 12 local HVAC businesses, finds 3 with same-day availability, compares estimates, and books the one with the best reviews and price.',
  },
  {
    slug: 'restaurants',
    name: 'Restaurants & Food',
    icon: UtensilsCrossed,
    meaning:
      'Agent-ready means a dinner party host can say "book Italian for 6 near SoHo at 8pm" and the agent handles everything -- finds matching restaurants, checks availability, books the table, even pre-orders wine.',
    tools: [
      'check_availability -- return open table slots by date and party size',
      'make_reservation -- book a table with special requests',
      'view_menu -- return full menu with prices and dietary info',
      'place_order -- submit takeout or delivery orders',
      'get_restaurant_info -- return hours, location, cuisine type',
    ],
    avgScore: '32/100',
    agentInteraction:
      '"Book me a table for 4 at an Italian restaurant in SoHo for 7:30pm tonight." The agent queries 20 Italian restaurants in range, filters by availability and rating, presents 3 options, and confirms the booking.',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    icon: Heart,
    meaning:
      'Agent-ready means a patient can say "find me a dentist who takes my insurance and has an opening this week" and the agent verifies coverage, finds providers, and books an appointment -- no hold music.',
    tools: [
      'check_insurance -- verify plan acceptance',
      'get_availability -- return open appointment slots by provider',
      'book_appointment -- schedule with type and preferred time',
      'list_services -- return all services with price ranges',
      'get_practice_info -- return hours, credentials, provider bios',
    ],
    avgScore: '22/100',
    agentInteraction:
      '"Find a dentist accepting new patients near me that takes Delta Dental." The agent queries practices in a 10-mile radius, filters by insurance, checks new patient availability, and books the earliest opening.',
  },
  {
    slug: 'professional',
    name: 'Professional Services',
    icon: Briefcase,
    meaning:
      'Agent-ready means a startup founder can say "find me a CPA who handles SaaS accounting and can start this month" and the agent matches credentials, compares pricing, and books a consultation.',
    tools: [
      'list_services -- return service packages with pricing',
      'check_credentials -- verify licenses and certifications',
      'book_consultation -- schedule initial meeting by practice area',
      'get_availability -- return open consultation slots',
      'get_firm_info -- return team, industries, specializations',
    ],
    avgScore: '21/100',
    agentInteraction:
      '"Find me an employment lawyer in Boston who offers free consultations." The agent searches law firms by practice area and location, filters for free consultation offers, and books a 30-minute slot.',
  },
  {
    slug: 'ecommerce',
    name: 'Retail & E-Commerce',
    icon: ShoppingBag,
    meaning:
      'Agent-ready means a shopper can say "order me size 10 Nike Air Max in black, delivered by Friday" and the agent searches inventory, compares prices across stores, places the order, and tracks delivery.',
    tools: [
      'search_products -- query by name, category, size, color, price',
      'get_product_details -- return variants, stock levels, images',
      'add_to_cart -- add items with quantity and options',
      'checkout -- complete purchase with shipping and payment',
      'track_order -- return status, tracking, estimated delivery',
    ],
    avgScore: '30/100',
    agentInteraction:
      '"Order me a pair of size 10 Nike Air Max in black, delivered by Friday." The agent checks 8 stores, finds 3 with stock and Friday delivery, compares prices, selects the cheapest, and completes checkout.',
  },
  {
    slug: 'saas',
    name: 'SaaS & Tech',
    icon: Cloud,
    meaning:
      'Agent-ready means a CTO can say "find me a project management tool with Gantt charts that integrates with Slack under $20/user" and the agent evaluates features, provisions a trial, and sets up the integration.',
    tools: [
      'get_product_info -- return capabilities and feature matrix',
      'get_pricing -- return tiers with feature comparisons',
      'create_trial -- provision a free trial programmatically',
      'check_integrations -- verify available integrations',
      'get_api_docs -- return API documentation and auth details',
    ],
    avgScore: '45/100',
    agentInteraction:
      '"Find me a project management tool with Gantt charts that integrates with Slack under $20/user." The agent queries 15 PM tools, filters by features and integrations, compares pricing, provisions a trial on the best match.',
  },
  {
    slug: 'travel',
    name: 'Travel & Hospitality',
    icon: Plane,
    meaning:
      'Agent-ready means a traveler can say "plan a 5-day trip to Lisbon in September, boutique hotel, under $200/night" and the agent books flights, hotel, restaurants, and activities in a single conversation.',
    tools: [
      'search_availability -- check rooms by date, type, and rate',
      'make_booking -- reserve with guest details and preferences',
      'get_amenities -- return facilities, services, and policies',
      'get_pricing -- return rates by season, room type, and length',
      'get_property_info -- return location, ratings, photos, reviews',
    ],
    avgScore: '35/100',
    agentInteraction:
      '"Book me a boutique hotel in Lisbon for Sep 10-15, under $200/night, with breakfast." The agent queries 40 properties, filters by style and rate, checks breakfast inclusion, and books with late checkout.',
  },
  {
    slug: 'finance',
    name: 'Finance & Insurance',
    icon: Shield,
    meaning:
      'Agent-ready means a homeowner can say "compare home insurance quotes for my property" and the agent gathers property details, requests quotes from multiple carriers, and presents a side-by-side comparison.',
    tools: [
      'get_quote -- return premium estimate based on property and coverage',
      'compare_plans -- side-by-side comparison of coverage options',
      'submit_application -- start a policy application programmatically',
      'check_eligibility -- verify qualification for products',
      'get_provider_info -- return ratings, coverage areas, contact',
    ],
    avgScore: '28/100',
    agentInteraction:
      '"Get me home insurance quotes for a 2,500 sq ft house in Tampa." The agent pulls property data, requests quotes from 8 carriers, compares premiums, deductibles, and coverage, and presents the top 3 options.',
  },
  {
    slug: 'education',
    name: 'Education',
    icon: GraduationCap,
    meaning:
      'Agent-ready means a learner can say "find me an online data science course under $500 that starts next month" and the agent searches programs, compares curricula, checks schedules, and handles enrollment.',
    tools: [
      'search_courses -- query by topic, format, price, and start date',
      'get_curriculum -- return syllabus, prerequisites, outcomes',
      'check_availability -- return upcoming sessions with open seats',
      'enroll -- register for a course programmatically',
      'get_institution_info -- return accreditation, ratings, contact',
    ],
    avgScore: '20/100',
    agentInteraction:
      '"Find me an online data science bootcamp under $500 starting in April." The agent queries 25 platforms, filters by price and dates, compares completion rates and job placement, and enrolls in the best match.',
  },
  {
    slug: 'automotive',
    name: 'Automotive',
    icon: Car,
    meaning:
      'Agent-ready means a car buyer can say "find me a 2024 RAV4 under $35K within 50 miles" and the agent searches dealer inventories, compares prices, schedules test drives, and gets financing estimates.',
    tools: [
      'search_inventory -- filter by make, model, year, price, features',
      'get_vehicle_details -- return full specs, photos, pricing',
      'schedule_test_drive -- book an appointment for a specific vehicle',
      'get_financing_estimate -- calculate monthly payments by terms',
      'get_dealer_info -- return hours, inventory count, reviews',
    ],
    avgScore: '28/100',
    agentInteraction:
      '"Find me a 2024 Toyota RAV4 under $35K within 50 miles of Chicago." The agent queries 12 dealers, finds 7 matching vehicles, compares prices and options, schedules test drives at the top 2.',
  },
  {
    slug: 'beauty',
    name: 'Beauty & Wellness',
    icon: Scissors,
    meaning:
      'Agent-ready means a client can say "book me a haircut and color at a salon near me this Saturday" and the agent checks availability across salons, compares stylists and pricing, and books the appointment.',
    tools: [
      'search_services -- query by service type, stylist, and price',
      'check_availability -- return open slots by date and stylist',
      'book_appointment -- schedule with service, stylist, and time',
      'get_pricing -- return service menu with prices and duration',
      'get_salon_info -- return location, stylists, reviews, photos',
    ],
    avgScore: '12/100',
    agentInteraction:
      '"Book me a haircut and balayage at a top-rated salon near me this Saturday." The agent queries 15 salons, filters by rating and Saturday availability, compares stylist portfolios, and books the best match.',
  },
]

// ---------------------------------------------------------------------------
// Icon color helper
// ---------------------------------------------------------------------------
function getStepColorClasses(color: string) {
  const map: Record<string, { border: string; bg: string; text: string; bgLight: string }> = {
    emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400', bgLight: 'bg-emerald-500/5' },
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-400', bgLight: 'bg-blue-500/5' },
    purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/10', text: 'text-purple-400', bgLight: 'bg-purple-500/5' },
    amber: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400', bgLight: 'bg-amber-500/5' },
    cyan: { border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', text: 'text-cyan-400', bgLight: 'bg-cyan-500/5' },
    rose: { border: 'border-rose-500/30', bg: 'bg-rose-500/10', text: 'text-rose-400', bgLight: 'bg-rose-500/5' },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// FAQ Schema.org data
// ---------------------------------------------------------------------------
const faqItems = [
  {
    q: 'What does "agent-ready" mean?',
    a: 'Agent-ready means your business can be discovered, understood, booked, used, and paid by AI agents acting on behalf of humans. It is measured on a scale of 0-100 across 6 steps: Find, Understand, Sign Up, Connect, Use, and Pay.',
  },
  {
    q: 'Does agent-ready only apply to tech companies?',
    a: 'No. Every business type needs to be agent-ready. A plumber needs agents to find their service area and book appointments just as much as a SaaS product needs agents to provision trials. The specific implementation differs, but the 6-step journey is universal.',
  },
  {
    q: 'What is an MCP endpoint?',
    a: 'MCP (Model Context Protocol) is a standard that lets AI agents call your business like a function. Instead of scraping your website, an agent calls structured tools like book_appointment() or search_inventory() and gets clean JSON responses.',
  },
  {
    q: 'How quickly do I need to become agent-ready?',
    a: 'The businesses that become agent-ready first will capture the majority of agent-driven transactions. Current adoption is early, but growing exponentially. Most experts project that within 2 years, a significant portion of consumer and business transactions will be agent-mediated.',
  },
  {
    q: 'What is an Agent Readiness Score?',
    a: 'An Agent Readiness Score is a 0-100 rating from AgentHermes that measures how well your business performs across all 6 steps of the agent journey. Scores are broken into tiers: Platinum (90+), Gold (75-89), Silver (60-74), Bronze (40-59), and Not Scored (below 40).',
  },
  {
    q: 'How much does it cost to become agent-ready?',
    a: 'Getting your Agent Readiness Score is free. AgentHermes provides free auto-generated agent cards, llms.txt files, and basic MCP endpoints. Advanced features like hosted MCP servers, the gateway, and certification are available on paid plans.',
  },
]

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function WhatIsAgentReadyPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Does Agent-Ready Mean for Your Business?',
    description:
      'AI agents are learning to find, use, and pay for services on behalf of humans. Here is what that means for every type of business.',
    url: 'https://agenthermes.ai/what-is-agent-ready',
    publisher: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    datePublished: '2026-03-30',
    dateModified: '2026-03-30',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'What Is Agent-Ready',
        item: 'https://agenthermes.ai/what-is-agent-ready',
      },
    ],
  }

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-subtle-pulse" />
              The definitive guide
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              What Does{' '}
              <span className="text-emerald-500">Agent-Ready</span>{' '}
              Mean for Your Business?
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-2xl mx-auto mb-10">
              AI agents are learning to find, use, and pay for services on behalf
              of humans. Here&apos;s what that means for every type of business.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
              >
                Check Your Score
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/for"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
              >
                Browse by Industry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE UNIVERSAL DEFINITION ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              The Universal Definition
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              The 6-step agent journey applies to <strong className="text-zinc-200">every</strong> business.
              Whether you sell software or sandwiches, an AI agent needs to
              complete these steps to transact with you.
            </p>
          </div>

          <div className="space-y-6">
            {journeySteps.map((step) => {
              const colors = getStepColorClasses(step.color)
              return (
                <div
                  key={step.label}
                  className={`relative p-6 lg:p-8 rounded-xl ${colors.bgLight} border ${colors.border} transition-all`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Step indicator */}
                    <div className="flex items-center gap-4 lg:min-w-[200px]">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.bg} border ${colors.border} flex-shrink-0`}
                      >
                        <step.icon className={`h-7 w-7 ${colors.text}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono font-bold ${colors.text}`}>
                            STEP {step.step}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-100">
                          {step.label}
                        </h3>
                      </div>
                    </div>

                    {/* Question + examples */}
                    <div className="flex-1">
                      <p className="text-base text-zinc-300 font-medium mb-4">
                        {step.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {step.examples.map((ex) => (
                          <div
                            key={ex.vertical}
                            className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/60"
                          >
                            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                              {ex.vertical}
                            </span>
                            <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
                              {ex.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== PER-VERTICAL BREAKDOWN ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              What Agent-Ready Means for{' '}
              <span className="text-emerald-500">Your</span> Industry
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Every vertical has unique requirements. Here is what agent-ready
              looks like across {verticalBreakdowns.length} major industries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {verticalBreakdowns.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.slug}
                  className="group relative flex flex-col p-6 lg:p-8 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/30 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                      <Icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {v.name}
                      </h3>
                      <span className="text-xs font-mono text-zinc-500">
                        Industry avg: <span className="text-red-400">{v.avgScore}</span>
                      </span>
                    </div>
                  </div>

                  {/* What it means */}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                    {v.meaning}
                  </p>

                  {/* 5 MCP tools */}
                  <div className="mb-5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                      5 MCP Tools an Agent Would Need
                    </h4>
                    <div className="space-y-1.5">
                      {v.tools.map((tool) => {
                        const [name, desc] = tool.split(' -- ')
                        return (
                          <div key={name} className="flex items-start gap-2">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500/60 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-zinc-300">
                              <code className="text-xs font-mono text-emerald-400/80 bg-emerald-500/5 px-1.5 py-0.5 rounded">
                                {name}
                              </code>
                              {desc && (
                                <span className="text-zinc-500 ml-1.5">{desc}</span>
                              )}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Example agent interaction */}
                  <div className="mt-auto p-4 rounded-lg bg-zinc-800/40 border border-zinc-700/40">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                      Example Agent Interaction
                    </h4>
                    <p className="text-sm text-zinc-300 italic leading-relaxed">
                      &ldquo;{v.agentInteraction}&rdquo;
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/audit"
                    className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Check your score
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq) => (
              <details
                key={faq.q}
                className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-sm font-semibold text-zinc-200 pr-4">
                    {faq.q}
                  </h3>
                  <span className="text-zinc-600 group-open:rotate-45 transition-transform text-lg flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="text-sm text-zinc-500 leading-relaxed mt-3 pt-3 border-t border-zinc-800/50">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE BOTTOM LINE ===== */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Every business will need to be agent-ready within 2 years.
          </h2>
          <p className="text-zinc-400 text-xl mb-4">
            The question isn&apos;t <em>if</em>, it&apos;s <em>when</em>.
          </p>
          <p className="text-zinc-500 text-base mb-10 max-w-lg mx-auto">
            The first businesses to become agent-ready capture the majority of
            agent-driven transactions. Find out where you stand today.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
          >
            Check Your Score
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
