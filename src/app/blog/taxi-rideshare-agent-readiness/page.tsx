import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CarFront,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  HelpCircle,
  MapPin,
  Network,
  Phone,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Taxi and Rideshare Agent Readiness: Why Traditional Cabs Score Zero While Uber Scores 55 | AgentHermes',
  description:
    'The ride-hailing revolution already proved agent readiness matters. Uber scores 55, Lyft 50, traditional taxis 0. Digital-native companies with APIs first naturally score higher. Traditional industries that digitize later struggle.',
  keywords: [
    'taxi rideshare agent readiness',
    'Uber agent readiness score',
    'Lyft agent readiness',
    'rideshare API',
    'taxi API integration',
    'agent ready transportation',
    'ride hailing AI agents',
    'transportation agent economy',
  ],
  openGraph: {
    title: 'Taxi and Rideshare Agent Readiness: Why Traditional Cabs Score Zero While Uber Scores 55',
    description:
      'The ride-hailing revolution already proved agent readiness matters. Uber scores 55, Lyft 50, traditional taxis 0. Digital-native companies build APIs first.',
    url: 'https://agenthermes.ai/blog/taxi-rideshare-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Taxi and Rideshare Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taxi and Rideshare Agent Readiness: Traditional Cabs Score Zero, Uber Scores 55',
    description:
      'The ride-hailing revolution proved that API-first companies win. Uber 55, Lyft 50, traditional taxis 0. The pattern is clear.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/taxi-rideshare-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const scoreComparison = [
  { company: 'Uber', score: 55, tier: 'Bronze', color: 'amber', highlights: 'REST API, OAuth, ride estimation, webhooks, real-time tracking' },
  { company: 'Lyft', score: 50, tier: 'Bronze', color: 'amber', highlights: 'REST API, OAuth, ride types, cost estimation, driver ETA' },
  { company: 'Yellow Cab (NYC)', score: 0, tier: 'Dark', color: 'red', highlights: 'Phone dispatch only, no API, no structured data' },
  { company: 'Local Taxi Co.', score: 0, tier: 'Dark', color: 'red', highlights: 'Phone number on a website, maybe an app with no API' },
]

const agentReadyCapabilities = [
  {
    name: 'Real-Time Availability',
    agentReady: 'get_available_drivers({ location, vehicle_type }) returns ETA and count',
    traditional: '"Call us and we will send someone"',
    icon: Clock,
  },
  {
    name: 'Price Estimation',
    agentReady: 'estimate_fare({ origin, destination, vehicle_type }) returns structured price',
    traditional: '"Depends on traffic, meter starts at $3.50"',
    icon: DollarSign,
  },
  {
    name: 'Booking',
    agentReady: 'request_ride({ pickup, dropoff, time, passengers }) returns confirmation',
    traditional: '"Call dispatch at 555-0123"',
    icon: CheckCircle2,
  },
  {
    name: 'Live Tracking',
    agentReady: 'track_ride({ ride_id }) returns GPS coordinates, ETA, driver info',
    traditional: '"Your driver should be there in about 10 minutes"',
    icon: MapPin,
  },
  {
    name: 'Payment',
    agentReady: 'process_payment({ ride_id, method }) returns receipt with breakdown',
    traditional: '"Cash or card in the car"',
    icon: DollarSign,
  },
]

const dimensionScores = [
  { dimension: 'D1 Discovery', uber: 8, lyft: 7, taxi: 0, description: 'Developer portals vs yellow pages listing' },
  { dimension: 'D2 API Quality', uber: 12, lyft: 10, taxi: 0, description: 'REST + webhooks vs no endpoints' },
  { dimension: 'D3 Onboarding', uber: 6, lyft: 5, taxi: 0, description: 'OAuth + API keys vs call to apply' },
  { dimension: 'D4 Pricing', uber: 3, lyft: 3, taxi: 0, description: 'Transparent API pricing vs meter-based mystery' },
  { dimension: 'D5 Payment', uber: 5, lyft: 4, taxi: 0, description: 'Stripe integration vs cash in car' },
  { dimension: 'D6 Data Quality', uber: 7, lyft: 7, taxi: 0, description: 'JSON schemas vs no structured data' },
  { dimension: 'D7 Security', uber: 6, lyft: 6, taxi: 0, description: 'OAuth + TLS vs nothing' },
  { dimension: 'D8 Reliability', uber: 5, lyft: 5, taxi: 0, description: '99.9% uptime vs "line busy"' },
  { dimension: 'D9 Agent Experience', uber: 3, lyft: 3, taxi: 0, description: 'SDK + docs vs no digital interface' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does Uber score 55 and not higher?',
    answer:
      'Uber has a strong REST API with OAuth, ride estimation, and real-time tracking. But it lacks agent-native protocols like MCP, agent-card.json, and llms.txt. There is no A2A protocol support and no structured agent onboarding. Uber is API-ready but not agent-ready — the distinction matters. An agent can use Uber through its API, but Uber has not made itself discoverable or optimized for agent-first interaction.',
  },
  {
    question: 'Can a traditional taxi company become agent-ready?',
    answer:
      'Yes, but it requires building digital infrastructure from scratch. A taxi company needs: a dispatch API (replacing phone calls), a fare estimation endpoint (replacing the meter), a booking system with structured responses (replacing "call us"), and a payment API (replacing cash). The technology exists. The challenge is that most taxi companies lack the technical resources and organizational will to build it. Platforms like AgentHermes can bridge this gap by providing hosted MCP servers.',
  },
  {
    question: 'What about taxi apps like Curb or Arro?',
    answer:
      'Taxi aggregator apps like Curb and Arro are attempts to digitize traditional taxis. They score higher than individual taxi companies — roughly 15 to 25 — because they have apps with some structured data. But they still lag behind Uber and Lyft because their APIs are limited, onboarding is manual, and real-time data is inconsistent. They are a step up from phone dispatch but still far from agent-ready.',
  },
  {
    question: 'Will AI agents actually book rides?',
    answer:
      'They already do in limited ways. When you ask an AI assistant to "get me a ride to the airport," it can integrate with Uber or Lyft through their APIs. But the agent cannot compare across all ride options, check traditional taxi availability, or find the cheapest option across providers because most providers have zero API surface. The first transportation company to become fully agent-ready captures 100% of AI-assisted ride booking.',
  },
  {
    question: 'Is this the same pattern as the 1990s web transition?',
    answer:
      'Exactly. In the late 1990s, businesses that moved online early captured market share from those that stayed phone-and-storefront-only. Uber and Lyft are the digital-native companies that built APIs from day one. Traditional taxis are the businesses that never built websites until it was too late. The agent economy is the next version of this transition — and the window for early movers is open right now.',
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

export default function TaxiRideshareAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Taxi and Rideshare Agent Readiness: Why Traditional Cabs Score Zero While Uber Scores 55',
    description:
      'The ride-hailing revolution already proved agent readiness matters. Uber scores 55, Lyft 50, traditional taxis 0. Digital-native companies with APIs first naturally score higher.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/taxi-rideshare-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'taxi rideshare agent readiness, Uber agent readiness, Lyft agent readiness, transportation AI agents',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Taxi and Rideshare Agent Readiness',
          item: 'https://agenthermes.ai/blog/taxi-rideshare-agent-readiness',
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
      title="Taxi and Rideshare Agent Readiness: Why Traditional Cabs Score Zero While Uber Scores 55"
      shareUrl="https://agenthermes.ai/blog/taxi-rideshare-agent-readiness"
      currentHref="/blog/taxi-rideshare-agent-readiness"
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
            <span className="text-zinc-400">Taxi and Rideshare Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <CarFront className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Transportation
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Taxi and Rideshare Agent Readiness:{' '}
            <span className="text-emerald-400">Why Traditional Cabs Score Zero While Uber Scores 55</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The ride-hailing revolution already proved that{' '}
            <strong className="text-zinc-100">API-first companies win</strong>. Uber and Lyft built
            APIs from day one — enabling third-party integrations, price estimation, and real-time
            tracking. Traditional taxis remained phone-dispatch-only. The result: Uber scores 55,
            Lyft scores 50, and every traditional taxi company on earth scores zero.
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
                  11 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE PATTERN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            The Pattern: Digital-Native Companies Build APIs First
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The rideshare industry is the clearest case study in agent readiness because the
              disruption already happened. Uber did not just build a better taxi — it built a
              <strong className="text-zinc-100"> platform with APIs</strong>. From the first version,
              Uber had structured data: GPS coordinates, fare estimates, driver availability, trip
              status, payment processing. All of it accessible through documented REST endpoints.
            </p>
            <p>
              Traditional taxi companies had none of this. They had a dispatcher with a radio, a
              meter in the car, and a phone number on a business card. When Uber launched in 2009,
              it was not competing on price or convenience alone — it was competing on{' '}
              <strong className="text-zinc-100">structured accessibility</strong>. Any developer
              could build on top of Uber. Nobody could build on top of Yellow Cab.
            </p>
            <p>
              This is the same pattern playing out across every industry right now. The businesses
              that have APIs — structured, documented, accessible — score higher on agent readiness.
              The businesses that rely on phone calls, walk-ins, and manual processes score zero. The
              ride-hailing revolution was a preview of what the agent economy will do to every
              industry.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$190B', label: 'Global rideshare market', icon: Globe },
              { value: '55', label: 'Uber score', icon: TrendingUp },
              { value: '50', label: 'Lyft score', icon: BarChart3 },
              { value: '0', label: 'Traditional taxi score', icon: Phone },
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

      {/* ===== SCORE COMPARISON TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Score Comparison: Rideshare vs Traditional Taxi
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            AgentHermes scanned the major rideshare platforms and representative traditional taxi
            companies. The gap is not subtle — it is a chasm.
          </p>

          <div className="space-y-3 mb-8">
            {scoreComparison.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.company}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-zinc-100">{item.company}</h3>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-medium ${colors.text}`}>{item.tier}</span>
                      <span className="text-2xl font-bold text-zinc-100">{item.score}/100</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500">{item.highlights}</p>
                  <div className="mt-3 w-full bg-zinc-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.score > 0 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== AGENT-READY CAPABILITIES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-500" />
            What Agent-Ready Transportation Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An AI agent booking a ride needs five capabilities. Uber and Lyft have most of them.
            Traditional taxis have none.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyCapabilities.map((cap) => (
              <div
                key={cap.name}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <cap.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">{cap.name}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-xs text-emerald-400 font-medium mb-1">Agent-Ready</p>
                    <code className="text-xs text-zinc-300">{cap.agentReady}</code>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                    <p className="text-xs text-red-400 font-medium mb-1">Traditional</p>
                    <p className="text-xs text-zinc-500">{cap.traditional}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIMENSION BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-cyan-500" />
            Dimension-by-Dimension Breakdown
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            AgentHermes scores businesses across 9 dimensions. Here is how rideshare and traditional
            taxis compare on each one.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div className="text-center">Uber</div>
              <div className="text-center">Lyft</div>
              <div className="text-center">Taxi</div>
            </div>
            {dimensionScores.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div>
                  <div className="font-medium text-zinc-200">{row.dimension}</div>
                  <div className="text-xs text-zinc-600 mt-0.5">{row.description}</div>
                </div>
                <div className="text-center text-amber-400 font-medium">{row.uber}</div>
                <div className="text-center text-amber-400 font-medium">{row.lyft}</div>
                <div className="text-center text-red-400 font-medium">{row.taxi}</div>
              </div>
            ))}
            <div className="grid grid-cols-4 p-4 bg-zinc-800/50 text-sm font-bold">
              <div className="text-zinc-200">Total</div>
              <div className="text-center text-amber-400">55</div>
              <div className="text-center text-amber-400">50</div>
              <div className="text-center text-red-400">0</div>
            </div>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The zero across every dimension for traditional taxis is not an exaggeration. When a
              business has no API, no structured data, no digital onboarding, no programmatic payment,
              and no documentation, every dimension scores zero. There is nothing for an agent to
              discover, connect to, or interact with. The business is{' '}
              <strong className="text-zinc-100">completely dark</strong> to the agent economy.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY THIS MATTERS BEYOND RIDES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Why This Matters Beyond Rides
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The taxi-to-rideshare transition is not just a transportation story. It is a template
              for what happens to every industry when a digital-native competitor builds{' '}
              <strong className="text-zinc-100">API-first infrastructure</strong>.
            </p>
            <p>
              Consider the pattern: an incumbent industry operates on phone calls, manual dispatch,
              and cash transactions. A startup builds the same service but with structured APIs,
              real-time data, and programmatic payment from day one. The startup does not just win on
              user experience — it wins on <strong className="text-zinc-100">platform economics</strong>.
              Third-party apps integrate with the API-first company. Travel agents, expense management
              tools, corporate booking systems, and now AI agents — all of them connect to Uber, none
              of them connect to Yellow Cab.
            </p>
            <p>
              This pattern is repeating in{' '}
              <Link href="/blog/parking-transportation-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                parking and broader transportation
              </Link>, restaurants, healthcare, home services, legal services, and every other industry
              that still relies on phone calls. The question is not whether AI agents will book rides,
              schedule appointments, and order services. The question is{' '}
              <strong className="text-zinc-100">which businesses will be bookable</strong>.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-8">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The startup advantage is now the agent advantage:</strong>{' '}
              Companies born in the API era — Uber, Stripe, Shopify — naturally score higher on agent
              readiness because their infrastructure was built for programmatic access. Companies born
              in the phone era — taxis, local plumbers, independent restaurants — score zero because
              their infrastructure was built for human callers. As{' '}
              <Link href="/blog/enterprise-vs-startup-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                our enterprise vs startup analysis
              </Link>{' '}
              shows, founding era predicts agent readiness more than company size.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT NEEDS TO CHANGE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Would Make a Taxi Company Agent-Ready
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A traditional taxi company going from zero to agent-ready needs five things, in order
              of impact:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Dispatch API',
                detail: 'Replace phone dispatch with a structured endpoint. Accept ride requests as JSON with pickup location, destination, passenger count, and vehicle preference. Return confirmation with driver assignment and ETA.',
                icon: Server,
              },
              {
                step: '2',
                title: 'Fare estimation endpoint',
                detail: 'Expose a fare calculator that takes origin and destination coordinates and returns an estimated price range. This is what agents need to compare options across providers.',
                icon: DollarSign,
              },
              {
                step: '3',
                title: 'Real-time vehicle tracking',
                detail: 'Provide GPS data for assigned vehicles so agents can give users accurate ETAs. WebSocket or SSE for live updates. This is table stakes for any transportation API.',
                icon: MapPin,
              },
              {
                step: '4',
                title: 'Digital payment processing',
                detail: 'Accept payment through the API — not just cash in the car. Stripe, Square, or any payment processor with an API. Return itemized receipts as structured data.',
                icon: Smartphone,
              },
              {
                step: '5',
                title: 'Agent discovery layer',
                detail: 'Publish an agent-card.json, create an MCP server with ride-booking tools, and register in agent directories. This is what makes the company discoverable by AI agents rather than just API-accessible.',
                icon: Globe,
              },
            ].map((item) => (
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The irony is that platforms like AgentHermes can provide steps 5 in minutes — the
              agent discovery layer is the easy part. Steps 1 through 4 are the hard part because
              they require fundamental changes to how the business operates. But without those
              changes, there is nothing for the discovery layer to connect to. You cannot make a
              phone-only business agent-ready by adding a JSON file. You need the actual digital
              infrastructure underneath.
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
                title: 'Parking and Transportation Agent Readiness',
                href: '/blog/parking-transportation-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Enterprise vs Startup Agent Readiness',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Market Analysis',
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
            Is your business invisible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            500 businesses scanned. Average score: 43/100. Traditional taxis score zero.
            Find out where your business stands in the agent economy.
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
