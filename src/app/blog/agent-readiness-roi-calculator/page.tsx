import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Calculator,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  Globe,
  HelpCircle,
  Layers,
  Network,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'The Agent Readiness ROI: What Happens When AI Agents Can Actually Use Your Business | AgentHermes',
  description:
    'Bottom-line analysis for executives. Businesses at ARL-3+ capture agent-driven revenue. Businesses at ARL-0 get zero. The ROI model for agent readiness investment in 2026.',
  keywords: [
    'agent readiness ROI business',
    'AI agent ROI',
    'agent readiness business case',
    'agent economy revenue',
    'agent readiness investment',
    'AI agent customer acquisition',
    'agent driven revenue',
    'business case agent readiness',
  ],
  openGraph: {
    title: 'The Agent Readiness ROI: What Happens When AI Agents Can Actually Use Your Business',
    description:
      'If 1% of your customers come via AI agents in 2026, that is 5% by 2028. Businesses at ARL-3+ capture it. Businesses at ARL-0 capture zero.',
    url: 'https://agenthermes.ai/blog/agent-readiness-roi-calculator',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Agent Readiness ROI: What Happens When AI Agents Can Actually Use Your Business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Agent Readiness ROI: What Happens When AI Agents Can Actually Use Your Business',
    description:
      'Every agent query that bounces off your "contact us" page goes to your competitor who has an API. The business case for agent readiness.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/agent-readiness-roi-calculator',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const roiDrivers = [
  {
    name: 'Automated Lead Generation',
    description: 'AI agents discover your business on behalf of users. Instead of you paying for ads to find customers, agents find you. Every agent interaction is an inbound lead with zero acquisition cost.',
    metric: '$0 CAC per agent lead',
    comparison: 'Traditional: $50-200 per lead via Google Ads',
    icon: Users,
    color: 'emerald',
  },
  {
    name: '24/7 Availability at Zero Marginal Cost',
    description: 'Agents operate around the clock across time zones. A customer in Tokyo asking their AI assistant to book your service at 3 AM your time completes the transaction instantly. No staff required. No chatbot to maintain.',
    metric: '168 hours/week coverage',
    comparison: 'Traditional: 40-60 hours/week staffed',
    icon: Globe,
    color: 'blue',
  },
  {
    name: 'Compound Discovery',
    description: 'One agent that successfully uses your business tells other agents. Agent-to-agent protocol (A2A) means your successful interactions build your reputation in the agent network. Discovery compounds — it is not linear.',
    metric: 'Network effect on discovery',
    comparison: 'Traditional: each customer found independently',
    icon: Network,
    color: 'purple',
  },
  {
    name: 'Zero Marginal Cost Per Interaction',
    description: 'Each agent interaction costs you nothing beyond your existing API infrastructure. No sales calls, no email threads, no scheduling back-and-forth. The agent reads your data, transacts, and moves on.',
    metric: '~$0.00 per transaction',
    comparison: 'Traditional: $15-50 per customer interaction',
    icon: Zap,
    color: 'amber',
  },
]

const projectionRows = [
  { year: '2026', agentPct: '1%', revenueAt1M: '$10,000', revenueAt10M: '$100,000', cac: '$0' },
  { year: '2027', agentPct: '3%', revenueAt1M: '$30,000', revenueAt10M: '$300,000', cac: '$0' },
  { year: '2028', agentPct: '5-8%', revenueAt1M: '$50-80K', revenueAt10M: '$500K-800K', cac: '$0' },
  { year: '2030', agentPct: '15-25%', revenueAt1M: '$150-250K', revenueAt10M: '$1.5-2.5M', cac: '$0' },
]

const arlRevenueMap = [
  {
    level: 'ARL-0: Dark',
    score: '0-19',
    agentRevenue: '$0',
    reason: 'Completely invisible. No agent can discover or interact with the business.',
    color: 'red',
  },
  {
    level: 'ARL-1: Visible',
    score: '20-39',
    agentRevenue: '$0',
    reason: 'Agents can find you but cannot do anything. The journey ends at "call this number."',
    color: 'red',
  },
  {
    level: 'ARL-2: Structured',
    score: '40-59',
    agentRevenue: 'Indirect only',
    reason: 'Agents can read your data but cannot transact. Leads require human follow-up. Some value, high friction.',
    color: 'amber',
  },
  {
    level: 'ARL-3: Transactable',
    score: '60-74',
    agentRevenue: 'Direct revenue',
    reason: 'Agents can discover, understand, and complete transactions. This is the revenue inflection point. First-mover advantage is strongest here.',
    color: 'emerald',
  },
  {
    level: 'ARL-4+: Automated',
    score: '75+',
    agentRevenue: 'Maximum capture',
    reason: 'Full agent lifecycle including payment, subscription management, and agent-to-agent delegation. Captures recurring and high-value transactions.',
    color: 'emerald',
  },
]

const costOfInvisibility = [
  {
    scenario: 'A user asks their AI assistant to book a plumber',
    invisible: 'Agent cannot find you. Recommends the competitor with an MCP server.',
    ready: 'Agent calls your check_availability() tool, books the appointment, confirms with the user.',
  },
  {
    scenario: 'A procurement agent searches for a vendor',
    invisible: 'Your "Contact Sales" page is a dead end. Agent moves to next vendor.',
    ready: 'Agent reads your pricing API, checks inventory, generates a purchase order.',
  },
  {
    scenario: 'A travel agent books a hotel for a client',
    invisible: 'Agent uses Booking.com MCP — you pay 15-25% commission.',
    ready: 'Agent books directly through your MCP server — 0% commission.',
  },
  {
    scenario: 'A comparison agent evaluates 5 SaaS tools',
    invisible: 'Your pricing is "Contact us." Agent reports "pricing unavailable" and ranks you last.',
    ready: 'Agent reads your structured pricing and includes you in the comparison with accurate data.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Is agent-driven revenue actually happening in 2026?',
    answer:
      'Yes, but early. The businesses capturing it today are developer tools (Stripe, Vercel, Supabase) where agents already make API calls on behalf of developers. Consumer-facing agent commerce is emerging through Claude, ChatGPT, and Gemini integrations. The businesses that are agent-ready now will capture the wave as it grows — like having an e-commerce site in 1999 before the buying public fully shifted online.',
  },
  {
    question: 'What does it actually cost to become agent-ready?',
    answer:
      'It depends on your starting point. A business with an existing API can add agent-readiness (agent-card.json, llms.txt, MCP server) in a few days of developer time. A business with no API needs infrastructure first — but AgentHermes auto-generates hosted MCP servers for businesses across 15 verticals starting with a free tier. The investment ranges from $0 (self-hosted discovery files) to thousands for custom API development.',
  },
  {
    question: 'How do I measure agent-driven revenue separately?',
    answer:
      'Every agent interaction through an MCP server includes request metadata. AgentHermes tracks agent leads, interactions, and conversions through the dashboard at /dashboard/leads. You can see exactly which agents are using your business, what tools they call, and which interactions convert to revenue. This is not guesswork — it is instrumented from day one.',
  },
  {
    question: 'What if my competitors are not agent-ready either?',
    answer:
      'That is the opportunity. In our 500-business scan, the average Agent Readiness Score is 43/100. Most businesses are not agent-ready. Being first in your category or metro area means capturing 100% of agent-driven traffic in your niche — a monopoly that costs nothing to acquire and compounds as agent usage grows.',
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

export default function AgentReadinessRoiPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Agent Readiness ROI: What Happens When AI Agents Can Actually Use Your Business',
    description:
      'Bottom-line analysis for executives. Agent-ready businesses capture zero-CAC revenue from AI agents. The ROI model and projection for 2026-2030.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/agent-readiness-roi-calculator',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Business Strategy',
    wordCount: 1900,
    keywords:
      'agent readiness ROI business, AI agent revenue, agent economy business case, agent readiness investment',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Agent Readiness ROI',
          item: 'https://agenthermes.ai/blog/agent-readiness-roi-calculator',
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
      title="The Agent Readiness ROI: What Happens When AI Agents Can Actually Use Your Business"
      shareUrl="https://agenthermes.ai/blog/agent-readiness-roi-calculator"
      currentHref="/blog/agent-readiness-roi-calculator"
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
            <span className="text-zinc-400">Agent Readiness ROI</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Calculator className="h-3.5 w-3.5" />
              Business Strategy
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Executive Brief
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            The Agent Readiness ROI:{' '}
            <span className="text-emerald-400">What Happens When AI Agents Can Actually Use Your Business</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Every query an AI agent makes about your industry either lands on your business or your
            competitor&rsquo;s. There is no middle ground. Businesses at{' '}
            <strong className="text-zinc-100">ARL-3 and above</strong> capture agent-driven revenue.
            Businesses at ARL-0 capture exactly zero. The gap is not closing — it is widening every
            quarter as agent adoption accelerates.
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

      {/* ===== THE FOUR ROI DRIVERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Four Ways Agent-Ready Businesses Generate Revenue
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Agent readiness is not a cost center. It is a new customer acquisition channel with
              fundamentally different economics than any channel before it. Here are the four
              mechanisms that turn agent readiness into revenue.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {roiDrivers.map((driver) => {
              const colors = getColorClasses(driver.color)
              return (
                <div
                  key={driver.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <driver.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{driver.name}</h3>
                      <span className={`text-xs font-medium ${colors.text}`}>{driver.metric}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{driver.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">vs traditional:</span>{' '}
                      <span className="text-red-400">{driver.comparison}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE PROJECTION MODEL ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-500" />
            The Revenue Projection: 1% Today, 15% by 2030
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Conservative estimates put agent-driven commerce at 1% of business transactions in 2026.
              That number compounds. The businesses that are agent-ready today capture 100% of that 1%
              in their category. The businesses that are not capture 0%. Here is what that looks like
              at different revenue levels.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-5 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Year</div>
              <div>Agent %</div>
              <div>At $1M Rev</div>
              <div>At $10M Rev</div>
              <div>CAC</div>
            </div>
            {projectionRows.map((row, i) => (
              <div
                key={row.year}
                className={`grid grid-cols-5 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.year}</div>
                <div className="text-emerald-400">{row.agentPct}</div>
                <div className="text-zinc-300">{row.revenueAt1M}</div>
                <div className="text-zinc-300">{row.revenueAt10M}</div>
                <div className="text-emerald-400 font-medium">{row.cac}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The key insight:</strong> Every dollar of agent-driven
              revenue has $0 customer acquisition cost. No Google Ads. No cold outreach. No sales team.
              The agent found you, understood your offering, and completed the transaction — all through
              your API. This is not replacing your existing channels. It is a net-new channel with
              economics that improve every year as agent adoption grows.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ARL LEVEL = REVENUE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-500" />
            Your ARL Level Determines Your Agent Revenue
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The{' '}
            <Link href="/blog/arl-levels-explained" className="text-emerald-400 hover:text-emerald-300 underline">
              Agent Readiness Level
            </Link>{' '}
            directly maps to how much agent-driven revenue your business can capture. Below ARL-3,
            the answer is zero or near-zero.
          </p>

          <div className="space-y-3 mb-8">
            {arlRevenueMap.map((level) => {
              const colors = getColorClasses(level.color)
              return (
                <div
                  key={level.level}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-zinc-100 text-sm">{level.level}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-500">Score: {level.score}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text}`}>
                        {level.agentRevenue}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{level.reason}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              ARL-3 is the inflection point. Below it, agents can see you but cannot transact. Above it,
              agents can complete the full journey:{' '}
              <strong className="text-zinc-100">discover, understand, sign up, connect, use, and pay</strong>.
              Of 500 businesses AgentHermes has scanned, fewer than 30 reach ARL-3. The remaining 470 are
              leaving agent revenue on the table — not because the technology is hard, but because they
              have not started.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE COST OF BEING INVISIBLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-red-500" />
            The Cost of Being Invisible
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every agent query that bounces off your &ldquo;Contact Us&rdquo; page goes to your competitor
            who has an API. Here are four real scenarios playing out right now.
          </p>

          <div className="space-y-4 mb-8">
            {costOfInvisibility.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 text-sm mb-4">{item.scenario}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                    <p className="text-xs font-medium text-red-400 mb-1">Not agent-ready</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">{item.invisible}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                    <p className="text-xs font-medium text-emerald-400 mb-1">Agent-ready</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">{item.ready}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern is consistent: when an agent cannot interact with your business, it does not
              wait. It moves to the next option. Unlike a human who might call you anyway, an agent
              has no patience, no loyalty, and no reason to try harder. It optimizes for the fastest
              path to completing the task. If that path goes through your competitor, the agent takes it
              without a second thought.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE COMPOUND EFFECT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Compound Effect: Why Early Movers Win Permanently
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Agent readiness has a compounding dynamic that traditional marketing does not. Every
              successful agent interaction improves your standing in the agent network. Agents learn
              which businesses respond reliably, return structured data, and complete transactions
              without errors. That track record becomes a form of reputation that influences which
              businesses agents recommend in future queries.
            </p>
            <p>
              This means the first business in each category to become agent-ready gets a head start that
              compounds. While competitors start at zero, you have months or years of successful agent
              interactions building your reputation. This is not SEO where positions are contested monthly.
              This is a new infrastructure layer where first-movers build durable advantages.
            </p>
            <p>
              Consider the analogy: businesses that got on the web early in the 2000s had a decade-long
              domain authority advantage. Businesses that built great APIs early (Stripe, Twilio) became
              the default choice for developers — a position they still hold. Agent readiness follows
              the same pattern. The first to be reliably usable by agents becomes the default recommendation
              for that category.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '43', label: 'avg score (500 businesses)', icon: TrendingUp },
              { value: '<30', label: 'businesses at ARL-3+', icon: Layers },
              { value: '$0', label: 'agent lead acquisition cost', icon: DollarSign },
              { value: '100%', label: 'of agent traffic to first mover', icon: Zap },
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

      {/* ===== WHAT TO DO NOW ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            What to Do Now: The Executive Checklist
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Agent readiness is not a multi-year digital transformation. Most of the high-impact changes
            take days, not months. Here is the priority order for maximizing ROI.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Measure your current score',
                detail: 'Run a free AgentHermes scan at /audit. Know your baseline across all 9 dimensions. This takes 60 seconds and tells you exactly where you stand.',
              },
              {
                step: '2',
                title: 'Ship discovery files (Day 1)',
                detail: 'Add agent-card.json, llms.txt, and structured Schema.org markup. These three files move you from invisible to discoverable. Zero infrastructure cost.',
              },
              {
                step: '3',
                title: 'Expose one transactional endpoint (Week 1)',
                detail: 'Pick your highest-value action — book, purchase, quote — and expose it as a structured API endpoint. One endpoint moves you from readable to transactable.',
              },
              {
                step: '4',
                title: 'Launch an MCP server (Week 2-4)',
                detail: 'Either build one with the MCP SDK or let AgentHermes auto-generate a hosted MCP server for your vertical. This is the step that unlocks ARL-3 and direct agent revenue.',
              },
              {
                step: '5',
                title: 'Instrument and measure (Ongoing)',
                detail: 'Track agent interactions through your dashboard. Measure agent-driven leads and conversions as a separate channel. Report ROI quarterly.',
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
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The bottom line:</strong> Agent readiness is the lowest-risk,
              highest-optionality investment you can make in 2026. The cost to start is near zero. The
              downside of starting is zero. The downside of not starting is losing an entirely new customer
              acquisition channel — permanently — to competitors who moved first.
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
                title: 'ARL Levels Explained: From Dark to Interoperable',
                href: '/blog/arl-levels-explained',
                tag: 'Framework',
                tagColor: 'purple',
              },
              {
                title: 'Why Fortune 500 Score Lower Than Startups',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
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
            What is your agent readiness ROI?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see your score, your ARL level, and exactly how much
            agent-driven revenue you are leaving on the table.
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
