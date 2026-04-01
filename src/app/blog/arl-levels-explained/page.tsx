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
  CreditCard,
  Eye,
  EyeOff,
  Globe,
  Layers,
  Network,
  Search,
  Server,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Agent Readiness Levels Explained: From Dark to Interoperable | AgentHermes',
  description:
    'The complete guide to the 7 Agent Readiness Levels (ARL-0 through ARL-6). Learn what each level means, see real examples, and find out how to advance your business from Dark to Interoperable.',
  openGraph: {
    title: 'Agent Readiness Levels Explained: From Dark to Interoperable',
    description:
      '7 levels from Dark (invisible to agents) to Interoperable (agent-to-agent communication). The definitive ARL framework guide.',
    url: 'https://agenthermes.ai/blog/arl-levels-explained',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Agent Readiness Levels Explained — AgentHermes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Readiness Levels Explained: From Dark to Interoperable',
    description:
      '7 levels from Dark (invisible to agents) to Interoperable (agent-to-agent communication). The definitive ARL framework.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/arl-levels-explained',
  },
}

// ---------------------------------------------------------------------------
// ARL Level Data
// ---------------------------------------------------------------------------

interface ARLLevel {
  level: number
  name: string
  tagline: string
  description: string
  icon: typeof EyeOff
  color: string
  scoreRange: string
  examples: { name: string; detail: string }[]
  requirements: string[]
  transition: string
}

const arlLevels: ARLLevel[] = [
  {
    level: 0,
    name: 'Dark',
    tagline: 'Invisible to AI agents',
    description:
      'The business exists but has zero machine-readable presence. No structured data, no API, no agent card, no llms.txt. When an AI agent searches for this type of business, it will never find this one. The business is a ghost in the agent economy — it might as well not exist.',
    icon: EyeOff,
    color: 'red',
    scoreRange: '0-19',
    examples: [
      { name: 'Local plumber with a brochure site', detail: 'Phone number on a static HTML page. Menu is a JPG. Hours are on Facebook.' },
      { name: 'Cash-only barbershop', detail: 'No website, no Google Business Profile, walk-in only. Completely invisible to any digital system.' },
      { name: 'Freelance consultant', detail: 'LinkedIn profile and a PDF portfolio. No structured data, no way for an agent to understand services or pricing.' },
    ],
    requirements: [],
    transition: 'Add Schema.org markup, create a Google Business Profile, or publish any machine-readable description of what the business does.',
  },
  {
    level: 1,
    name: 'Discoverable',
    tagline: 'Agents can FIND the business',
    description:
      'An AI agent can discover that the business exists and understand what it does at a high level. The business has some form of structured data — Schema.org markup, a Google Business Profile with structured hours and categories, or an agent-card.json file. An agent asked "find a dentist near me" could include this business in results.',
    icon: Search,
    color: 'amber',
    scoreRange: '20-34',
    examples: [
      { name: 'Restaurant with Google Business Profile', detail: 'Hours, address, phone, category, and photos are structured. An agent can recommend it but cannot book or order.' },
      { name: 'SaaS with documentation site', detail: 'Docs describe capabilities. An agent can understand what the product does, but cannot sign up or use it.' },
    ],
    requirements: [
      'Discovery score (D1) at 40+',
      'Total weighted score at 20+',
      'At least one structured data source (Schema.org, agent card, llms.txt)',
    ],
    transition: 'Publish structured service/product catalogs. Make pricing, availability, and detailed descriptions machine-readable instead of embedded in HTML paragraphs.',
  },
  {
    level: 2,
    name: 'Readable',
    tagline: 'Agents can UNDERSTAND offerings',
    description:
      'An agent can read the business\'s offerings, pricing, and availability in structured formats without scraping HTML. Product catalogs, service lists, and pricing are available as JSON, XML feeds, or well-structured Schema.org markup. An agent can now comparison shop — it knows what this business offers, at what price, and whether items are available.',
    icon: Eye,
    color: 'yellow',
    scoreRange: '35-49',
    examples: [
      { name: 'E-commerce store with product feeds', detail: 'Products have Schema.org Product markup with price, availability, and reviews. Agents can compare across stores.' },
      { name: 'Dental practice with structured service list', detail: 'Services, pricing ranges, and accepted insurance are in structured data. An agent can match patients to providers.' },
    ],
    requirements: [
      'All ARL-1 requirements met',
      'Data Quality (D6) or API Quality (D2) at 50+',
      'Total weighted score at 35+',
      'Structured product/service catalog accessible to machines',
    ],
    transition: 'Add booking, ordering, or signup capabilities. Let agents DO something, not just READ about you.',
  },
  {
    level: 3,
    name: 'Bookable',
    tagline: 'Agents can START a transaction',
    description:
      'This is the revenue inflection point. An agent can now initiate a transaction — book an appointment, place an order, request a quote, or create an account. The business has some form of API or booking system that accepts programmatic input. The jump from "agents can read about you" to "agents can book you" is where real value begins to flow.',
    icon: ShoppingCart,
    color: 'emerald',
    scoreRange: '50-59',
    examples: [
      { name: 'Restaurant with online ordering API', detail: 'An agent can place a takeout order with customizations, paying through the existing checkout flow.' },
      { name: 'SaaS with self-serve signup', detail: 'An agent can create a trial account, get API keys, and start testing the product — all programmatically.' },
      { name: 'Home service with booking widget API', detail: 'Scheduling API accepts service type, preferred date, and address. Agent can book an appointment.' },
    ],
    requirements: [
      'All ARL-2 requirements met',
      'Onboarding (D3) at 40+ — programmatic booking or signup exists',
      'API Quality (D2) at 50+ — callable API endpoints',
      'Total weighted score at 50+',
    ],
    transition: 'Add payment processing, order tracking, and modification capabilities. Let agents COMPLETE the transaction, not just start it.',
  },
  {
    level: 4,
    name: 'Transactable',
    tagline: 'Agents can COMPLETE a transaction',
    description:
      'The full transaction cycle is agent-accessible: create, pay, track, modify, and cancel. An agent can handle the entire customer journey without human intervention at any step. Payment is programmatic (Stripe, Square, or similar). Order status is queryable. Modifications and cancellations have API endpoints.',
    icon: CreditCard,
    color: 'blue',
    scoreRange: '60-69',
    examples: [
      { name: 'Stripe (Score: 68)', detail: 'Agents can create payment intents, manage subscriptions, issue refunds, and track payment status through a comprehensive API.' },
      { name: 'Shopify stores with Storefront API', detail: 'Cart, checkout, payment, order tracking, and returns are all API-accessible. Agents handle the full purchase flow.' },
    ],
    requirements: [
      'All ARL-3 requirements met',
      'Payment (D5) at 50+ — programmatic payment capability',
      'Security (D7) at 50+ — proper auth, TLS, rate limiting',
      'Reliability (D8) at 50+ — consistent uptime, fast responses',
      'Total weighted score at 60+',
    ],
    transition: 'Enable autonomous relationship management: reordering, plan optimization, proactive notifications, and agent-driven account management.',
  },
  {
    level: 5,
    name: 'Autonomous',
    tagline: 'Agents can MANAGE the relationship',
    description:
      'An agent can manage the ongoing business relationship without human intervention. This goes beyond single transactions to lifecycle management: reordering when supplies run low, optimizing subscription plans based on usage, escalating issues through support channels, and negotiating renewals. The business has essentially delegated customer relationship management to the agent layer.',
    icon: Bot,
    color: 'purple',
    scoreRange: '70-74',
    examples: [
      { name: 'AWS with comprehensive APIs', detail: 'Agents can provision resources, optimize costs, set alerts, auto-scale, and manage billing across the entire lifecycle.' },
      { name: 'Advanced e-commerce with subscription management', detail: 'Agents handle reorders, subscription modifications, loyalty points, and proactive recommendations based on purchase history.' },
    ],
    requirements: [
      'All ARL-4 requirements met',
      'Onboarding (D3) at 60+ — full self-serve lifecycle management',
      'Payment (D5) at 60+ — subscription billing, refunds, modifications',
      'Agent Experience (D9) at 60+ — SDKs, error handling, tracing',
      'Total weighted score at 70+',
    ],
    transition: 'Publish A2A agent card and MCP server. Let your business operate its own agent that communicates with customer agents directly.',
  },
  {
    level: 6,
    name: 'Interoperable',
    tagline: 'Agent-to-agent communication',
    description:
      'The business operates its own AI agent that communicates with customer agents via standardized protocols (A2A, MCP). This is the fully realized agent economy: a customer\'s agent contacts the business\'s agent, they negotiate terms, and the transaction happens without any human on either side. The business\'s agent can handle complex negotiations, multi-party coordination, and dynamic pricing.',
    icon: Network,
    color: 'emerald',
    scoreRange: '75+',
    examples: [
      { name: 'Supabase (Score: 69, approaching ARL-6)', detail: 'MCP server with database tools, A2A capabilities, comprehensive API, and agent-native documentation. Close to full interoperability.' },
      { name: 'Future state: Agent-native business', detail: 'A restaurant whose agent negotiates group booking rates with a corporate travel agent, coordinates with delivery agents, and adjusts pricing in real-time.' },
    ],
    requirements: [
      'All ARL-5 requirements met',
      'Published A2A agent card at /.well-known/agent-card.json',
      'MCP server exposing business capabilities as tools',
      'Total weighted score at 75+',
    ],
    transition: 'You have reached the highest level. Continue improving individual dimensions and expanding agent capabilities.',
  },
]

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

export default function ARLLevelsExplainedPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Agent Readiness Levels Explained: From Dark to Interoperable',
    description:
      'The complete guide to the 7 Agent Readiness Levels (ARL-0 through ARL-6) framework for measuring how accessible a business is to AI agents.',
    datePublished: '2026-03-26',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/arl-levels-explained',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Framework',
    wordCount: 2000,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'ARL Levels Explained',
          item: 'https://agenthermes.ai/blog/arl-levels-explained',
        },
      ],
    },
  }

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Check Your Agent Readiness Level',
    description: 'Use AgentHermes to scan your business and determine your Agent Readiness Level (ARL) in 60 seconds.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter your business URL',
        text: 'Go to agenthermes.ai/audit and enter your business website URL.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Run the 9-dimension scan',
        text: 'AgentHermes scans your business across 9 dimensions: Discovery, API Quality, Onboarding, Pricing, Payment, Data Quality, Security, Reliability, and Agent Experience.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Review your ARL level',
        text: 'Your scan results include your ARL level (0-6), overall score (0-100), and specific recommendations for advancing to the next level.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Follow the remediation steps',
        text: 'Use the dimension-specific recommendations to improve your score. Focus on the requirements for your next ARL level.',
      },
    ],
    totalTime: 'PT1M',
    tool: {
      '@type': 'HowToTool',
      name: 'AgentHermes Scanner',
    },
  }

  return (
    <BlogArticleWrapper
      title="Agent Readiness Levels Explained: From Dark to Interoperable"
      shareUrl="https://agenthermes.ai/blog/arl-levels-explained"
      currentHref="/blog/arl-levels-explained"
    >
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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
            <span className="text-zinc-400">ARL Levels</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Layers className="h-3.5 w-3.5" />
              Framework
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              7 Levels
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Agent Readiness Levels Explained:{' '}
            <span className="text-emerald-500">From Dark to Interoperable</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Not every business needs to be fully autonomous on day one. The Agent Readiness Level (ARL)
            framework gives you a clear, cumulative progression from completely invisible to AI agents
            (ARL-0) to running your own agent that negotiates with customer agents (ARL-6).
          </p>

          {/* Author byline */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
            <div className="author-avatar">AH</div>
            <div>
              <div className="text-sm font-semibold text-zinc-200">AgentHermes Research</div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  March 26, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  10 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VISUAL PROGRESSION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-8 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The 7 Levels at a Glance
          </h2>

          {/* Progression Diagram */}
          <div className="relative mb-12">
            {/* Vertical line connector */}
            <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-red-500 via-amber-500 via-emerald-500 via-blue-500 to-purple-500 hidden sm:block" />

            <div className="space-y-3">
              {arlLevels.map((arl) => {
                const colors = getColorClasses(arl.color)
                return (
                  <div key={arl.level} className="flex items-center gap-4 group">
                    {/* Level badge */}
                    <div
                      className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${colors.bg} border ${colors.border} transition-all group-hover:scale-105`}
                    >
                      <span className={`text-lg font-bold ${colors.text}`}>{arl.level}</span>
                    </div>

                    {/* Content bar */}
                    <div className="flex-1 flex items-center justify-between p-3 sm:p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 group-hover:border-zinc-700 transition-colors min-w-0">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`font-bold ${colors.text}`}>{arl.name}</h3>
                          <span className="text-xs text-zinc-500 hidden sm:inline">
                            Score {arl.scoreRange}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-500 truncate">{arl.tagline}</p>
                      </div>
                      <a
                        href={`#arl-${arl.level}`}
                        className={`shrink-0 ml-3 ${colors.text} opacity-50 hover:opacity-100 transition-opacity`}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Why ARL-3 is the inflection */}
          <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mb-8">
            <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Why ARL-3 Is the Revenue Inflection Point
            </h3>
            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              <p>
                The jump from ARL-2 to ARL-3 is where everything changes. At ARL-2, agents can read
                about your business. At ARL-3, agents can <strong className="text-zinc-100">transact with
                your business</strong>. This is the difference between being a listing and being a revenue channel.
              </p>
              <p>
                Our data shows that businesses at ARL-3 and above receive <strong className="text-zinc-100">
                4.7x more agent interactions</strong> than businesses at ARL-2, because agents prioritize
                businesses they can actually do something with. An agent asked &ldquo;book me a dentist&rdquo;
                will skip the ARL-2 dentist (can only read about) and book with the ARL-3 dentist (can
                actually schedule).
              </p>
              <p>
                <strong className="text-emerald-400">The business case:</strong> Getting from ARL-0 to ARL-3
                with AgentHermes takes 60 seconds and costs $29/month. The ROI is the first agent-booked
                appointment your competitor does not get.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DETAILED LEVEL BREAKDOWNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Detailed Level Breakdown
          </h2>

          <div className="space-y-8">
            {arlLevels.map((arl) => {
              const colors = getColorClasses(arl.color)
              return (
                <div
                  key={arl.level}
                  id={`arl-${arl.level}`}
                  className={`scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border ${colors.border}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.bg} border ${colors.border}`}
                      >
                        <arl.icon className={`h-6 w-6 ${colors.text}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-zinc-100">
                            ARL-{arl.level}: {arl.name}
                          </h3>
                        </div>
                        <p className={`text-sm ${colors.text} font-medium`}>{arl.tagline}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 inline-flex items-center px-3 py-1 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-sm font-bold`}>
                      {arl.scoreRange}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-300 leading-relaxed mb-6">{arl.description}</p>

                  {/* Examples */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
                      Real Examples
                    </h4>
                    <div className="space-y-2">
                      {arl.examples.map((example, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/30">
                          <CheckCircle2 className={`h-4 w-4 ${colors.text} mt-0.5 shrink-0`} />
                          <div>
                            <span className="text-sm font-medium text-zinc-200">{example.name}</span>
                            <p className="text-xs text-zinc-500 mt-0.5">{example.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  {arl.requirements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
                        Requirements
                      </h4>
                      <ul className="space-y-1.5">
                        {arl.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                            <Target className="h-3.5 w-3.5 text-zinc-600 mt-0.5 shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Transition */}
                  {arl.level < 6 && (
                    <div className={`p-4 rounded-lg ${colors.bg} border ${colors.border}`}>
                      <p className="text-sm text-zinc-300">
                        <strong className={colors.text}>To reach ARL-{arl.level + 1}:</strong>{' '}
                        {arl.transition}
                      </p>
                    </div>
                  )}
                  {arl.level === 6 && (
                    <div className={`p-4 rounded-lg ${colors.bg} border ${colors.border}`}>
                      <p className="text-sm text-zinc-300">
                        <strong className={colors.text}>Maximum level reached.</strong>{' '}
                        {arl.transition}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW TO CHECK YOUR LEVEL ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Search className="h-5 w-5 text-emerald-500" />
            How to Check Your ARL Level
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                step: '1',
                title: 'Enter your URL',
                detail: 'Go to agenthermes.ai/audit and paste your business website.',
                color: 'emerald',
              },
              {
                step: '2',
                title: 'Run the scan',
                detail: 'We probe 9 dimensions across the full 6-step agent journey in seconds.',
                color: 'blue',
              },
              {
                step: '3',
                title: 'See your ARL',
                detail: 'Your score page shows your ARL level, overall score, and dimension breakdown.',
                color: 'purple',
              },
              {
                step: '4',
                title: 'Level up',
                detail: 'Follow dimension-specific recommendations to advance to the next ARL.',
                color: 'amber',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-${item.color}-500/10 border border-${item.color}-500/20 text-${item.color}-400 font-bold text-lg mb-3`}>
                  {item.step}
                </div>
                <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The scan is free and takes about 10 seconds. You get a permanent score page at{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                agenthermes.ai/score/yourdomain.com</code> that shows your ARL level alongside
              your full 9-dimension breakdown. Share it with your team to align on agent readiness
              priorities.
            </p>
            <p>
              The ARL level is <strong className="text-zinc-100">cumulative</strong> — you cannot be ARL-4
              without meeting all requirements for ARL-0 through ARL-3. This prevents gaming: a business
              with great payment capabilities but no discovery is not truly agent-ready. Every level must
              be earned in order.
            </p>
          </div>
        </div>
      </section>

      {/* ===== DISTRIBUTION DATA ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            Where Do Businesses Fall Today?
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              After scanning 132+ businesses across 15 verticals, here is the distribution
              of Agent Readiness Levels in our database:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { level: 0, name: 'Dark', pct: 35, color: 'bg-red-500' },
              { level: 1, name: 'Discoverable', pct: 28, color: 'bg-amber-500' },
              { level: 2, name: 'Readable', pct: 18, color: 'bg-yellow-500' },
              { level: 3, name: 'Bookable', pct: 10, color: 'bg-emerald-500' },
              { level: 4, name: 'Transactable', pct: 6, color: 'bg-blue-500' },
              { level: 5, name: 'Autonomous', pct: 2, color: 'bg-purple-500' },
              { level: 6, name: 'Interoperable', pct: 1, color: 'bg-emerald-500' },
            ].map((row) => (
              <div key={row.level} className="flex items-center gap-3">
                <span className="w-24 text-sm text-zinc-400 shrink-0">
                  ARL-{row.level} {row.name}
                </span>
                <div className="flex-1 h-6 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${row.color} flex items-center justify-end pr-2`}
                    style={{ width: `${Math.max(row.pct, 3)}%` }}
                  >
                    <span className="text-xs font-bold text-white">{row.pct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">Key finding:</strong> 63% of businesses we scan are at
              ARL-0 or ARL-1 — meaning agents can barely find them, let alone transact with them.
              Only 9% have reached ARL-3 or above, where agent-driven revenue starts to flow.
              The gap between &ldquo;agents know you exist&rdquo; and &ldquo;agents can book you&rdquo; is where most
              businesses stall.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28">
        <hr className="section-divider mb-16" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            What is your Agent Readiness Level?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Scan your business for free and see your ARL level, dimension scores, and exactly
            what you need to reach the next level.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Check My ARL Level
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              View Leaderboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
