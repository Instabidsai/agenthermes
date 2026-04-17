import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  AlertTriangle,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  FileText,
  Globe,
  Heart,
  HeartHandshake,
  HelpCircle,
  Layers,
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
  title: 'Nonprofit Agent Readiness: Why Donor Platforms and Charities Are Invisible to AI Giving Agents | AgentHermes',
  description:
    'Nonprofits and charities average under 20 on the Agent Readiness Score. Donation pages are human-only, impact data is locked in PDFs, and volunteer signups require email. AI giving agents are emerging and the first agent-ready nonprofit captures every AI-mediated donation.',
  keywords: [
    'nonprofit charity agent readiness',
    'AI giving agents nonprofit',
    'charity agent readiness score',
    'nonprofit MCP server',
    'AI agents donation platforms',
    'agent readiness nonprofits',
    'donor platform AI',
    'charity invisible AI agents',
  ],
  openGraph: {
    title: 'Nonprofit Agent Readiness: Why Charities Are Invisible to AI Giving Agents',
    description:
      'Nonprofits average under 20 on the Agent Readiness Score. Donation pages are human-only, impact data is in PDFs, volunteer signups require email. AI giving agents are coming.',
    url: 'https://agenthermes.ai/blog/nonprofit-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nonprofit Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nonprofit Agent Readiness: Why Charities Are Invisible to AI Giving Agents',
    description:
      'The first nonprofit with an MCP server captures every AI-mediated donation in its category.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/nonprofit-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const failurePatterns = [
  {
    name: 'Donation Pages Are Human-Only',
    description: 'Donorbox, GoFundMe, and embedded donation widgets are designed for humans clicking buttons. No API endpoint for donate(), no structured response confirming the amount, no machine-readable receipt. An AI giving agent that wants to donate $50 to a food bank hits a JavaScript-heavy form it cannot interact with.',
    icon: DollarSign,
    color: 'red',
  },
  {
    name: 'Impact Data Locked in PDFs',
    description: 'Annual reports, program outcomes, and financial transparency documents are published as PDF downloads. An agent comparing charities by impact-per-dollar cannot extract structured data from a 40-page PDF. GuideStar and Charity Navigator have some structured data, but individual nonprofits expose none.',
    icon: FileText,
    color: 'red',
  },
  {
    name: 'Volunteer Signups via Email',
    description: 'Volunteer opportunities are described in free text on web pages. Signing up requires filling a contact form or emailing a coordinator. There is no check_volunteer_slots() endpoint, no structured availability data, no way for an agent to match a user\'s schedule with open positions.',
    icon: Users,
    color: 'amber',
  },
  {
    name: 'Program Catalogs Are Narrative',
    description: 'What programs does the nonprofit run? What populations do they serve? What is the geographic coverage? This information exists as paragraphs of text on "About Us" and "Our Programs" pages. No structured JSON, no schema markup, no machine-readable catalog that an agent can filter and compare.',
    icon: Layers,
    color: 'amber',
  },
  {
    name: 'No Structured Financial Data',
    description: 'Donors want to know: what percentage goes to programs vs. overhead? Most nonprofits publish this as a pie chart image in their annual report. There is no endpoint, no JSON-LD, and no structured markup that an agent can query. The information exists but is trapped in formats agents cannot read.',
    icon: BarChart3,
    color: 'amber',
  },
]

const agentReadyNonprofit = [
  { capability: 'Structured impact metrics API', detail: 'GET /api/impact returns { meals_served: 142000, cost_per_meal: 2.31, families_helped: 8400, year: 2025 }', priority: 'Critical' },
  { capability: 'Donation endpoint', detail: 'POST /api/donate with amount, frequency, designation — returns structured receipt with tax-deduction info', priority: 'Critical' },
  { capability: 'Program catalog JSON', detail: 'GET /api/programs returns array of { name, description, population, geography, budget, outcomes }', priority: 'High' },
  { capability: 'Volunteer slot availability', detail: 'GET /api/volunteer/slots returns dates, roles, requirements, and capacity — agent can match and book', priority: 'High' },
  { capability: 'Schema.org NonprofitType markup', detail: 'JSON-LD with @type: NGO, areaServed, foundingDate, taxID, mission — discoverable by agents and search', priority: 'Medium' },
  { capability: 'MCP server with donate + impact tools', detail: 'Full MCP server exposing donate(), get_impact(), list_programs(), find_volunteer_slots() as callable tools', priority: 'Medium' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Are AI giving agents a real thing?',
    answer:
      'Yes. AI assistants are already being used to research charities, compare impact, and recommend donations. As agents gain the ability to execute transactions on behalf of users, the step from "recommend this charity" to "donate $50 to this charity" is a single API call away. Donor-advised funds like Fidelity Charitable and Schwab Charitable are investing in API-first interfaces that enable exactly this.',
  },
  {
    question: 'Why do nonprofits score so low on agent readiness?',
    answer:
      'Nonprofits optimize for human donors, not machine interfaces. Donation pages use embedded widgets from Donorbox or GoFundMe that are JavaScript-heavy and form-based. Impact data is published as PDF reports. Volunteer coordination happens via email. None of these are machine-readable, which means agents cannot discover, compare, or transact with them.',
  },
  {
    question: 'What is the quickest win for a nonprofit?',
    answer:
      'Add Schema.org NonprofitType JSON-LD markup to your homepage. This takes 30 minutes, requires no backend changes, and immediately makes your mission, programs, and contact information machine-readable. It lifts D1 Discoverability and D6 Data Quality — together worth 22% of the Agent Readiness Score.',
  },
  {
    question: 'Does AgentHermes scan nonprofits?',
    answer:
      'Yes. Any organization with a website can run a free Agent Readiness Scan at /audit. The scan evaluates all 9 dimensions including D1 Discoverability, D2 API Quality, and D3 Onboarding. Nonprofits typically score 10-25, with the highest-scoring ones being those that publish structured data through platforms like GuideStar or have developer-facing APIs.',
  },
  {
    question: 'Could a nonprofit with an MCP server really capture more donations?',
    answer:
      'Consider the analogy: when someone asks an AI assistant "find me a food bank in Austin I can donate to," the agent queries available data sources. Today, it might scrape Google results and return a list. Tomorrow, if one food bank has an MCP server with get_impact() and donate() tools, the agent can return structured impact data AND complete the donation in one interaction. That food bank gets the donation. The others get a mention.',
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

export default function NonprofitAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Nonprofit Agent Readiness: Why Donor Platforms and Charities Are Invisible to AI Giving Agents',
    description:
      'Nonprofits and charities average under 20 on the Agent Readiness Score. Donation pages are human-only, impact data is in PDFs, and volunteer signups require email. The first agent-ready nonprofit captures every AI-mediated donation.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/nonprofit-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1850,
    keywords:
      'nonprofit charity agent readiness, AI giving agents, charity MCP server, donation platform AI, nonprofit agent score',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Nonprofit Agent Readiness',
          item: 'https://agenthermes.ai/blog/nonprofit-agent-readiness',
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
      title="Nonprofit Agent Readiness: Why Donor Platforms and Charities Are Invisible to AI Giving Agents"
      shareUrl="https://agenthermes.ai/blog/nonprofit-agent-readiness"
      currentHref="/blog/nonprofit-agent-readiness"
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
            <span className="text-zinc-400">Nonprofit Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <HeartHandshake className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Nonprofits
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Nonprofit Agent Readiness: Why Charities Are{' '}
            <span className="text-emerald-400">Invisible to AI Giving Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The $500 billion US charitable giving market is about to get an AI distribution layer. Giving agents will match donors to causes programmatically, compare impact metrics, and execute donations autonomously. But today, <strong className="text-zinc-100">nonprofits are among the least agent-ready organizations we scan</strong> — averaging under 20 on the Agent Readiness Score. Donation pages are built for human browsers, not AI agents.
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

      {/* ===== THE LANDSCAPE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-500" />
            The $500 Billion Market That AI Agents Cannot Reach
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Americans gave $557 billion to charity in 2023, according to Giving USA. That number has grown every year for the past decade. At the same time, AI assistants are becoming the primary interface through which people discover and interact with services. The intersection of these trends is inevitable: AI giving agents that help donors find, evaluate, and fund causes they care about.
            </p>
            <p>
              Imagine telling your AI assistant: &ldquo;I want to donate $200 to a food bank in my city with the lowest overhead ratio.&rdquo; Today, the agent scrapes Google, finds a few charity evaluator pages, and returns links for you to click through manually. It cannot compare impact metrics, verify overhead ratios, or complete the donation. The information exists — it is just trapped in formats agents cannot process.
            </p>
            <p>
              The nonprofits that become agent-readable first will capture a disproportionate share of AI-mediated giving. This is not hypothetical — it is the same dynamic that played out with{' '}
              <Link href="/blog/government-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                every other vertical we have analyzed
              </Link>. The first mover in each category captures the agent traffic.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$557B', label: 'US charitable giving (2023)', icon: DollarSign },
              { value: '<20', label: 'avg nonprofit agent score', icon: BarChart3 },
              { value: '0', label: 'nonprofits with MCP servers', icon: Server },
              { value: '1.8M', label: 'registered US nonprofits', icon: HeartHandshake },
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

      {/* ===== FIVE FAILURE PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Five Failure Patterns That Make Nonprofits Invisible
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            After scanning dozens of nonprofits, donor platforms, and charity aggregators, these are the five patterns that consistently drive scores below 20.
          </p>

          <div className="space-y-4 mb-8">
            {failurePatterns.map((pattern) => {
              const colors = getColorClasses(pattern.color)
              return (
                <div
                  key={pattern.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <pattern.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{pattern.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{pattern.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            What an Agent-Ready Nonprofit Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            No nonprofit has achieved this yet. But the blueprint is clear from analyzing what works in other verticals. Here are the six capabilities that would make a nonprofit fully agent-accessible.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Capability</div>
              <div>Implementation</div>
              <div>Priority</div>
            </div>
            {agentReadyNonprofit.map((row, i) => (
              <div
                key={row.capability}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.capability}</div>
                <div className="text-zinc-500 text-xs font-mono">{row.detail}</div>
                <div className={`font-medium ${row.priority === 'Critical' ? 'text-red-400' : row.priority === 'High' ? 'text-amber-400' : 'text-emerald-400'}`}>{row.priority}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The key insight is that nonprofits already have this data — they report it to the IRS (Form 990), to charity evaluators (GuideStar, Charity Navigator), and to their own donors (annual reports). The problem is format, not availability. Converting existing reporting data into machine-readable endpoints is a translation exercise, not a data collection one.
            </p>
            <p>
              Adding{' '}
              <Link href="/blog/schema-markup-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Schema.org markup
              </Link>{' '}
              is the fastest first step. The NonprofitType schema supports mission, areaServed, foundingDate, and taxID — all of which agents use for discovery and comparison. This single addition lifts D1 Discoverability and D6 Data Quality, together worth 22% of the Agent Readiness Score.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AGGREGATOR PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            The Aggregator Trap: Why Charity Navigator and GuideStar Are Not Enough
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Third-party aggregators like Charity Navigator, GuideStar (now Candid), and GiveWell have some of the best structured nonprofit data available. But relying on aggregators creates the same problem that plagues hotels (OTAs) and restaurants (Yelp/DoorDash): the aggregator captures the agent relationship and charges rent.
            </p>
            <p>
              When an AI agent queries Charity Navigator for food banks, it gets Charity Navigator&apos;s data about your organization — not your data directly. The agent trusts the aggregator, not you. If the aggregator&apos;s data is outdated, incomplete, or missing your latest program, the agent never knows. Worse, the aggregator might charge for premium data access or prioritize nonprofits that pay for placement.
            </p>
            <p>
              Direct agent readiness — your own{' '}
              <Link href="/blog/schema-markup-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                schema markup
              </Link>, your own API, your own MCP server — means agents get information straight from you. You control the narrative, the data freshness, and the interaction. The aggregator becomes one source among many, not the only one.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-blue-400">The parallel to e-commerce:</strong> Independent hotels that became bookable through their own APIs stopped losing 15-25% commission to OTAs for every booking. Nonprofits that become directly agent-accessible stop losing donor relationships to aggregators that sit between them and their supporters.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE FIRST-MOVER ADVANTAGE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            First Mover Captures Everything
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'AI-mediated donations are winner-take-most',
                detail: 'When an agent looks for "a food bank in Austin," it does not return 50 options like Google. It returns the best match it can interact with. If only one food bank has an MCP server with donate() and get_impact() tools, that one gets recommended and funded. Every time.',
              },
              {
                title: 'Impact data is the new SEO',
                detail: 'Agents rank nonprofits by machine-readable impact metrics: cost per outcome, overhead ratio, program allocation. The nonprofit that publishes these as structured data — not PDF pie charts — ranks first in every agent comparison. This is the agent economy equivalent of ranking #1 on Google.',
              },
              {
                title: 'Recurring donors compound through agents',
                detail: 'An agent that successfully donates to your nonprofit once will default to you for future donations in the same category. Agent memory creates loyalty without marketing spend. The first successful interaction becomes the baseline for every future one.',
              },
              {
                title: 'Grant-making foundations will use agents',
                detail: 'Institutional donors — foundations, corporate giving programs, donor-advised funds — manage thousands of relationships. AI agents will automate discovery, due diligence, and disbursement. Nonprofits with structured APIs get evaluated. Those without get skipped.',
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

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The opportunity:</strong> There are 1.8 million registered nonprofits in the US. Zero have MCP servers. Zero publish structured impact APIs. The first nonprofit in each category — food banks, animal shelters, environmental groups, disaster relief — that becomes agent-ready captures a new revenue channel with zero competition.
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
                title: 'Government Agent Readiness: The Most Invisible Sector',
                href: '/blog/government-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Schema.org Markup for Agent Readiness',
                href: '/blog/schema-markup-agent-readiness',
                tag: 'Standards Guide',
                tagColor: 'emerald',
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
            Is your nonprofit invisible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see your score across all 9 dimensions. Find out exactly what is keeping AI giving agents from discovering and supporting your cause.
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
              Connect My Nonprofit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
