import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  AlertTriangle,
  BarChart3,
  Bot,
  Building2,
  Calendar,
  CheckCircle2,
  Church,
  Clock,
  Code2,
  DollarSign,
  Globe,
  Heart,
  HeartHandshake,
  HelpCircle,
  Layers,
  MapPin,
  Network,
  Search,
  Server,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Churches and Religious Organizations Agent Readiness: Why Faith-Based Services Are Dark to AI | AgentHermes',
  description:
    'US religious giving exceeds $140B annually, yet churches score near zero on agent readiness. Service times live on Facebook, donations go through the plate or Tithe.ly, and event registration happens via email. AI scheduling agents cannot access any of it.',
  keywords: [
    'church religious organization agent readiness',
    'church AI agent readiness',
    'religious organization MCP server',
    'church API service times',
    'faith-based agent readiness score',
    'AI agents church scheduling',
    'Tithe.ly API agent',
    'church digital infrastructure',
  ],
  openGraph: {
    title: 'Churches and Religious Organizations Agent Readiness: Why Faith-Based Services Are Dark to AI',
    description:
      '$140B in US religious giving flows through channels invisible to AI agents. Churches need structured APIs for service times, donations, events, and facility booking.',
    url: 'https://agenthermes.ai/blog/church-religious-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Churches and Religious Organizations Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Churches and Religious Organizations Agent Readiness',
    description:
      '$140B in annual giving, zero agent readiness. Why churches are invisible to AI scheduling and donation agents.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/church-religious-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const currentState = [
  {
    channel: 'Service Times',
    how: 'Facebook page, static website text, or phone recording',
    problem: 'No structured data. Agent cannot parse "Sundays at 10:30" from an image carousel.',
    icon: Clock,
    color: 'red',
  },
  {
    channel: 'Donations / Giving',
    how: 'Physical plate, Tithe.ly, Pushpay, or generic PayPal link',
    problem: 'No programmatic giving endpoint. AI cannot allocate a donor budget to a specific fund.',
    icon: DollarSign,
    color: 'red',
  },
  {
    channel: 'Event Registration',
    how: 'Email the office, Google Form, or Eventbrite for large events',
    problem: 'No event listing API. Agent managing a family calendar cannot discover or RSVP.',
    icon: Calendar,
    color: 'red',
  },
  {
    channel: 'Small Groups / Classes',
    how: 'PDF bulletin, Church Center app, or verbal announcements',
    problem: 'Group availability, times, and capacity locked in proprietary apps with no public API.',
    icon: Users,
    color: 'red',
  },
  {
    channel: 'Facility Booking',
    how: 'Phone call to the church office during business hours',
    problem: 'Zero digital availability. Agent cannot check if the fellowship hall is open Saturday.',
    icon: Building2,
    color: 'red',
  },
]

const agentReadyFeatures = [
  {
    feature: 'Service Schedule API',
    endpoint: 'GET /api/services',
    returns: 'Array of services with day, time, location, livestream URL, childcare availability',
    impact: 'D2 API (15%) + D6 Data Quality (10%)',
    icon: Clock,
    color: 'emerald',
  },
  {
    feature: 'Giving / Donation Endpoint',
    endpoint: 'POST /api/give',
    returns: 'Accepts amount, fund designation, frequency (one-time, weekly, monthly), returns confirmation',
    impact: 'D5 Payment (8%) + D2 API (15%)',
    icon: Heart,
    color: 'emerald',
  },
  {
    feature: 'Event Registration API',
    endpoint: 'GET /api/events + POST /api/events/{id}/register',
    returns: 'Event list with dates, capacity, childcare, cost. Register with name + contact.',
    impact: 'D2 API (15%) + D9 Agent Experience (10%)',
    icon: Calendar,
    color: 'emerald',
  },
  {
    feature: 'Small Group Directory',
    endpoint: 'GET /api/groups',
    returns: 'Groups with topic, day/time, location, open slots, leader contact, age range',
    impact: 'D6 Data Quality (10%)',
    icon: Users,
    color: 'emerald',
  },
  {
    feature: 'Facility Availability',
    endpoint: 'GET /api/facilities/availability?date=2026-05-10',
    returns: 'Rooms with capacity, amenities, available time slots, booking requirements',
    impact: 'D2 API (15%) + D8 Reliability (13%)',
    icon: Building2,
    color: 'emerald',
  },
]

const platformScores = [
  { name: 'Planning Center Online', score: 18, note: 'Internal API exists but not public. Best positioned to add agent layer.' },
  { name: 'Church Center (by PCO)', score: 12, note: 'Member-facing app. No public endpoints for external agents.' },
  { name: 'Tithe.ly', score: 8, note: 'Giving-only platform. No API for external integrations.' },
  { name: 'Pushpay', score: 7, note: 'Mobile giving. Closed ecosystem, no third-party agent access.' },
  { name: 'Subsplash', score: 6, note: 'Church app builder. Custom apps but no standard API layer.' },
  { name: 'Typical Church Website', score: 2, note: 'Static HTML. Service times as text, no structured data.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why would a church need to be agent-ready?',
    answer:
      'AI assistants are increasingly managing family schedules, charitable giving, and event planning. When a family asks their AI agent to "find a church with a Sunday morning service and children\'s program near me," the agent needs structured data to answer. Churches without APIs are invisible to this growing channel of discovery and engagement.',
  },
  {
    question: 'Is $140 billion in religious giving really at stake?',
    answer:
      'The $140B figure represents total US religious giving annually (Giving USA 2025). Not all of it will shift to AI-mediated channels overnight, but the trend is clear: younger donors use digital tools, and AI agents are becoming their primary interface. The first churches to offer programmatic giving will capture AI-directed donations that others cannot.',
  },
  {
    question: 'Our church uses Planning Center. Does that count?',
    answer:
      'Planning Center has a robust internal API, which is why it scores highest among church platforms at 18/100. However, it is designed for church staff, not external AI agents. There is no public-facing agent-card.json, no llms.txt, and no MCP endpoint. PCO is the best-positioned platform to add an agent layer, but it has not done so yet.',
  },
  {
    question: 'How does a small church with no tech budget become agent-ready?',
    answer:
      'The minimum viable agent-ready church needs three things: a JSON endpoint returning service times, an agent-card.json file describing capabilities, and an llms.txt file. AgentHermes can auto-generate all three from your existing website information. The infrastructure cost is minimal — it is a configuration problem, not a budget problem.',
  },
  {
    question: 'What about privacy concerns with member data?',
    answer:
      'Agent readiness does not require exposing member data. The five endpoints we recommend (service times, giving, events, groups, facilities) deal with public or semi-public information. Giving endpoints authenticate the donor, not the church. Group directories show availability without member names. Privacy and agent readiness are not in conflict.',
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

export default function ChurchReligiousAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Churches and Religious Organizations Agent Readiness: Why Faith-Based Services Are Dark to AI',
    description:
      '$140B in US religious giving flows through channels completely invisible to AI agents. Service times, donations, events, small groups, and facility booking have zero structured API access.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/church-religious-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'church religious organization agent readiness, faith-based AI, church API, Tithe.ly agent readiness, religious giving AI',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Church Religious Agent Readiness',
          item: 'https://agenthermes.ai/blog/church-religious-agent-readiness',
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
      title="Churches and Religious Organizations Agent Readiness: Why Faith-Based Services Are Dark to AI"
      shareUrl="https://agenthermes.ai/blog/church-religious-agent-readiness"
      currentHref="/blog/church-religious-agent-readiness"
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
            <span className="text-zinc-400">Church Religious Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Church className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Faith-Based
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Churches and Religious Organizations:{' '}
            <span className="text-emerald-400">Why Faith-Based Services Are Dark to AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            US religious giving exceeds <strong className="text-zinc-100">$140 billion annually</strong>.
            Churches post service times on Facebook, collect donations through the offering plate or
            Tithe.ly, and handle event registration via email. None of this is structured. AI agents
            managing family schedules and charitable giving budgets cannot access any of it.
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
                  12 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE SCALE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-amber-500" />
            $140 Billion Flowing Through Invisible Channels
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              There are roughly 380,000 churches and religious congregations in the United States.
              Together they receive over $140 billion in annual giving, making religious organizations
              the single largest category of charitable donation in the country. This dwarfs giving to
              education ($73B), human services ($65B), and health ($46B) combined.
            </p>
            <p>
              Yet when an AI agent tries to interact with a church — find service times, register for
              an event, make a donation, or book a facility — it hits a wall. The data exists, but it is
              locked inside Facebook posts, PDF bulletins, proprietary church management software, and
              phone-only booking systems. From an agent&apos;s perspective, churches are{' '}
              <strong className="text-zinc-100">ARL-0: Dark</strong> — completely invisible.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '380K', label: 'US congregations', icon: Church },
              { value: '$140B', label: 'annual giving', icon: DollarSign },
              { value: '~5', label: 'avg agent readiness score', icon: BarChart3 },
              { value: '0', label: 'churches with MCP servers', icon: Server },
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

      {/* ===== CURRENT STATE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            How Churches Operate Today: Five Channels, Zero APIs
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every core church function relies on channels that AI agents cannot access. Here is the
            breakdown of how data flows today and why agents are locked out.
          </p>

          <div className="space-y-4 mb-8">
            {currentState.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.channel}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{item.channel}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">
                    <span className="text-zinc-300 font-medium">Current:</span> {item.how}
                  </p>
                  <p className="text-sm text-red-400/80 leading-relaxed">
                    <span className="text-red-400 font-medium">Agent blocker:</span> {item.problem}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern is consistent across every church function: information is available to
              humans who know where to look and whom to call, but completely inaccessible to software
              agents. This is not a technology problem — churches use sophisticated internal tools like
              Planning Center, Breeze, and Church Community Builder. The problem is that none of
              these tools expose public APIs for external agent consumption.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AGENT USE CASE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            The AI Family Agent Scenario
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Consider a family that just moved to a new city. They tell their AI assistant:
              &ldquo;Find churches near us with a 10 AM Sunday service, children&apos;s ministry for ages
              3-7, and a small group we could join on Wednesday evenings.&rdquo;
            </p>
            <p>
              Today, the agent fails completely. It can search Google for church websites, but it
              cannot reliably extract service times from unstructured HTML. It cannot determine whether
              a children&apos;s ministry exists or what ages it serves. It cannot check small group
              availability or meeting times. The family gets a list of church names and addresses —
              the same result they would get from a phone book.
            </p>
            <p>
              Now imagine the same query against agent-ready churches. The AI calls{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                GET /api/services
              </code>{' '}
              and gets structured JSON with service times, childcare details, and livestream URLs.
              It calls{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                GET /api/groups?day=wednesday&amp;type=newcomer
              </code>{' '}
              and gets available groups with open spots. In seconds, the family has a curated shortlist
              with everything they asked for — and the church has a warm lead delivered without a phone call.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20 mb-8">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-blue-400">The giving angle is even bigger.</strong> AI agents
              are beginning to manage household budgets and charitable giving allocations. A donor who
              tells their agent &ldquo;distribute $500 across local charities this month, prioritizing
              children and housing&rdquo; will see their donations flow to organizations that have
              programmatic giving endpoints. Churches without a donation API will not be in the pool.
            </p>
          </div>
        </div>
      </section>

      {/* ===== AGENT-READY FEATURES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            What an Agent-Ready Church Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Five endpoints transform a church from invisible to fully agent-accessible. Each maps
            directly to a core church function and impacts specific dimensions of the Agent Readiness Score.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyFeatures.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.feature}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{item.feature}</h3>
                      <code className="text-xs text-emerald-400">{item.endpoint}</code>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">{item.returns}</p>
                  <p className="text-xs text-zinc-500">
                    <span className="text-zinc-400 font-medium">Score impact:</span> {item.impact}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Combined, these five endpoints can lift a church from a score of 2-5 to Silver tier
              (60+). Add an{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                agent-card.json
              </code>{' '}
              and{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                llms.txt
              </code>{' '}
              for discovery, and the church becomes one of the first in the country that AI agents
              can meaningfully interact with.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PLATFORM SCORES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Church Platform Agent Readiness Scores
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We evaluated the major church management and giving platforms. None reach Bronze tier (40+).
            Planning Center is best positioned due to its existing API infrastructure, but it still
            scores only 18 because that API is internal, not agent-facing.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Platform</div>
              <div>Score</div>
              <div>Notes</div>
            </div>
            {platformScores.map((row, i) => (
              <div
                key={row.name}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.name}</div>
                <div className="text-red-400 font-bold">{row.score}/100</div>
                <div className="text-zinc-500">{row.note}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The platform opportunity:</strong> The first church
              management platform to add an agent-facing API layer — public endpoints, agent-card.json,
              and MCP support — will instantly make every church on its platform agent-ready. Planning
              Center, with its existing REST API, could do this with a public access tier and
              discovery files. That single update would affect over 70,000 churches.
            </p>
          </div>
        </div>
      </section>

      {/* ===== COMPARISON TO OTHER NONPROFITS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Churches vs Other Nonprofits: A Unique Challenge
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Churches face agent readiness challenges that secular nonprofits do not. General
              charities need donation endpoints and impact reporting APIs.{' '}
              <Link href="/blog/nonprofit-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Nonprofits average 14/100
              </Link>{' '}
              on the Agent Readiness Score — already low. But churches score even lower because they
              have additional functions that need structuring: weekly recurring services, small group
              management, pastoral care requests, and facility scheduling.
            </p>
            <p>
              The breadth of church operations means more endpoints are needed to reach parity. A
              food bank needs a donation API and a volunteer signup endpoint. A church needs those plus
              service schedules, event registration, small group directories, children&apos;s ministry
              check-in, and facility booking. More surface area means more work — but also more
              opportunity for the churches that invest early.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Weekly recurring schedule',
                detail: 'Churches have weekly services, midweek groups, and seasonal programs that change quarterly. Agents need real-time schedule data, not a static page.',
              },
              {
                title: 'Designated giving',
                detail: 'Donors give to specific funds (general, missions, building, benevolence). A donation API must support fund designation — not just amount.',
              },
              {
                title: 'Community matching',
                detail: 'Small groups are matched by interest, life stage, geography, and availability. This is a search/filter problem that agents excel at — if the data is structured.',
              },
              {
                title: 'Multi-campus complexity',
                detail: 'Large churches operate multiple campuses with different schedules. Agents need campus-aware endpoints that filter by location.',
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

      {/* ===== FIRST MOVER ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            First-Mover Advantage in a 380,000-Church Market
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              In most verticals, being first to agent readiness means capturing early AI-driven
              traffic. In the church context, it means something more specific: being the church that
              AI family agents recommend when someone moves to a new city, starts searching for a
              faith community, or asks their assistant to set up recurring charitable giving.
            </p>
            <p>
              Consider that{' '}
              <Link href="/blog/local-business-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                local businesses average under 15
              </Link>{' '}
              on the Agent Readiness Score. A church that reaches even Bronze (40+) would stand out
              dramatically in agent results. Reach Silver (60+) and you become the default
              recommendation for an entire geographic area — because you are the only church the
              agent can actually interact with.
            </p>
            <p>
              The cost of this advantage is low. The five endpoints described above can be built in a
              weekend by a developer, or auto-generated by AgentHermes from existing church data. The
              cost of waiting is watching AI-mediated traffic, donations, and engagement flow to the
              churches that moved first.
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
                title: 'Nonprofit Agent Readiness: Why Charities Are Invisible to AI Giving Agents',
                href: '/blog/nonprofit-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Local Business Agent Readiness: Why Main Street Scores Under 15',
                href: '/blog/local-business-agent-readiness',
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
            See how your church scores
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score in 60 seconds. See exactly what AI agents can and
            cannot access about your church, and get a roadmap to fix it.
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
              Connect My Church
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
