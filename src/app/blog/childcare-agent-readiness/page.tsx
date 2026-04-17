import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Baby,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  Network,
  Search,
  Server,
  Shield,
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
  title:
    'Childcare Agent Readiness: Why Daycares, Preschools, and Nannies Can\'t Be Found by AI Agents | AgentHermes',
  description:
    'The $60B US childcare market runs on waitlists, paper enrollment, and phone calls. AI family assistants cannot find or book childcare because zero providers have APIs. Learn what agent-ready childcare looks like.',
  keywords: [
    'childcare daycare agent readiness',
    'daycare AI agent',
    'preschool agent readiness',
    'childcare API',
    'nanny booking AI',
    'agent readiness childcare',
    'childcare MCP server',
    'AI family assistant childcare',
    'daycare availability API',
  ],
  openGraph: {
    title:
      'Childcare Agent Readiness: Why Daycares, Preschools, and Nannies Can\'t Be Found by AI Agents',
    description:
      'The $60B US childcare market is invisible to AI agents. Zero providers have APIs for availability, pricing, or enrollment. Here is how to fix it.',
    url: 'https://agenthermes.ai/blog/childcare-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Childcare Agent Readiness: Why Daycares Can\'t Be Found by AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Childcare Agent Readiness: Why Daycares Can\'t Be Found by AI Agents',
    description:
      '$60B childcare market. Zero APIs. AI family assistants cannot find or book childcare. Here is the gap and the fix.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/childcare-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const childcareProblems = [
  {
    problem: 'Waitlists managed by paper and email',
    detail:
      'Most daycares maintain waitlists in spreadsheets or paper notebooks. There is no API to check position, estimated wait time, or when a spot opens. Parents call weekly for updates. An AI family assistant has no endpoint to query.',
    icon: Clock,
    color: 'red',
  },
  {
    problem: 'No availability data exposed',
    detail:
      'Daycare availability changes daily as children age out of rooms, families move, or schedules shift. This information lives in the director\'s head or a whiteboard in the office. No structured data, no API, no way for an agent to check.',
    icon: Search,
    color: 'red',
  },
  {
    problem: 'Pricing varies by age, schedule, and season',
    detail:
      'Infant care costs 2-3x toddler care. Part-time vs full-time vs drop-in pricing. Summer vs school-year rates. Before/after school add-ons. This pricing matrix is never published as structured data — it lives in a PDF or a phone conversation.',
    icon: DollarSign,
    color: 'amber',
  },
  {
    problem: 'Licensing info buried in government PDFs',
    detail:
      'State licensing, inspection reports, staff-to-child ratios, violation history — all locked in government databases and scanned PDFs. Parents spend hours researching safety records. An agent cannot programmatically verify licensing status.',
    icon: Shield,
    color: 'amber',
  },
]

const agentReadyFeatures = [
  {
    name: 'Availability Checker API',
    description:
      'Real-time endpoint returning open spots by age group, room, and schedule type. check_availability({ age_months: 18, schedule: "full_time" }) returns available start dates and waitlist position if full.',
    endpoint: 'GET /api/availability?age_months=18&schedule=full_time',
    icon: Search,
    color: 'emerald',
  },
  {
    name: 'Age-Group Pricing JSON',
    description:
      'Structured pricing for every age group and schedule combination. No PDF, no phone call. get_pricing() returns infant/toddler/preschool rates for full-time, part-time, drop-in, and before/after school.',
    endpoint: 'GET /api/pricing?age_group=infant&schedule=full_time',
    icon: DollarSign,
    color: 'emerald',
  },
  {
    name: 'Tour Scheduling Endpoint',
    description:
      'Available tour slots that an agent can book directly. schedule_tour({ date: "2026-05-01", parent_name: "Sarah", child_age_months: 14 }) returns a confirmation with calendar link.',
    endpoint: 'POST /api/tours/schedule',
    icon: Calendar,
    color: 'blue',
  },
  {
    name: 'Enrollment Application API',
    description:
      'Submit enrollment applications programmatically. The agent collects child info, immunization records, emergency contacts, and schedule preferences — then submits them in one structured request.',
    endpoint: 'POST /api/enrollment/apply',
    icon: Users,
    color: 'blue',
  },
  {
    name: 'Licensing and Safety Data',
    description:
      'Structured JSON with license number, last inspection date, staff ratios, accreditation status, and violation history. Parents verify safety without digging through government websites.',
    endpoint: 'GET /api/licensing',
    icon: Shield,
    color: 'purple',
  },
]

const marketStats = [
  { value: '$60B', label: 'US childcare market', icon: DollarSign },
  { value: '0', label: 'Providers with APIs', icon: Server },
  { value: '12M', label: 'Children in daycare', icon: Baby },
  { value: '~5/100', label: 'Average agent score', icon: BarChart3 },
]

const comparisonRows = [
  {
    aspect: 'Find availability',
    current: 'Call the center, leave voicemail, wait for callback',
    agentReady: 'check_availability() returns open spots in milliseconds',
  },
  {
    aspect: 'Get pricing',
    current: 'Request a PDF brochure or schedule a tour to learn rates',
    agentReady: 'get_pricing() returns structured rates by age and schedule',
  },
  {
    aspect: 'Schedule tour',
    current: 'Email back and forth to find a mutual time',
    agentReady: 'schedule_tour() books available slot instantly',
  },
  {
    aspect: 'Join waitlist',
    current: 'Fill out paper form, mail a deposit check',
    agentReady: 'join_waitlist() with structured child data and payment token',
  },
  {
    aspect: 'Verify licensing',
    current: 'Search state database, read scanned inspection reports',
    agentReady: 'get_licensing() returns structured safety and compliance data',
  },
  {
    aspect: 'Compare options',
    current: 'Visit 5-10 websites, call each one, build your own spreadsheet',
    agentReady: 'Agent queries all providers simultaneously, ranks by match',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does childcare score so low on agent readiness?',
    answer:
      'Childcare is one of the most operationally complex local service verticals. Pricing varies by child age, schedule, and season. Availability changes daily. Enrollment requires multi-step document collection. And the entire industry runs on phone calls and paper forms. There is no API layer for any of this — which is why the average daycare scores around 5/100 on the Agent Readiness Score.',
  },
  {
    question: 'Do any childcare platforms have APIs today?',
    answer:
      'A handful of childcare management platforms like Brightwheel, HiMama, and Procare have limited APIs — but they are designed for internal operations (attendance tracking, parent communication), not for external discovery or booking. No platform exposes availability, pricing, or enrollment to outside agents. Care.com has a search API for nannies but no structured booking flow.',
  },
  {
    question:
      'How would an AI family assistant use childcare APIs?',
    answer:
      'Imagine telling your AI assistant: "Find me full-time daycare for my 14-month-old near downtown, under $2,000/month, with a Spanish immersion program." The agent would query every provider\'s availability API, filter by age group and pricing, check licensing data for safety, and present ranked options — all in seconds instead of weeks of phone calls.',
  },
  {
    question: 'What is the first step for a daycare to become agent-ready?',
    answer:
      'Start with structured data. Publish your pricing by age group and schedule type as JSON on your website. Add Schema.org ChildCare markup. Create a simple availability status page (spots open vs waitlist by room). These steps cost nothing and move you from a 5 to a 20+ on the Agent Readiness Score. From there, an MCP server adds the interactive layer.',
  },
  {
    question: 'Will parents actually use AI agents to find childcare?',
    answer:
      'Parents already spend 30+ hours researching childcare options. They call dozens of centers, visit websites with outdated info, and maintain their own comparison spreadsheets. AI family assistants that can query structured childcare data will eliminate this friction. The parents who adopt AI assistants first will have a massive advantage in securing spots at the best providers — and those providers will see disproportionate demand.',
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

export default function ChildcareAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Childcare Agent Readiness: Why Daycares, Preschools, and Nannies Can\'t Be Found by AI Agents',
    description:
      'The $60B US childcare market is invisible to AI agents. Zero providers have APIs for availability, pricing, or enrollment. A complete analysis of the gap and the path to agent-ready childcare.',
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
      'https://agenthermes.ai/blog/childcare-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'childcare daycare agent readiness, daycare AI agent, preschool agent readiness, childcare API, nanny booking AI',
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
          name: 'Childcare Agent Readiness',
          item: 'https://agenthermes.ai/blog/childcare-agent-readiness',
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
      title="Childcare Agent Readiness: Why Daycares, Preschools, and Nannies Can't Be Found by AI Agents"
      shareUrl="https://agenthermes.ai/blog/childcare-agent-readiness"
      currentHref="/blog/childcare-agent-readiness"
    >
      <div className="relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd),
          }}
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
              <span className="text-zinc-400">
                Childcare Agent Readiness
              </span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <Baby className="h-3.5 w-3.5" />
                Vertical Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                $60B Market
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Childcare Agent Readiness: Why Daycares, Preschools, and
              Nannies{' '}
              <span className="text-emerald-400">
                Can&apos;t Be Found by AI Agents
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              The US childcare market is worth{' '}
              <strong className="text-zinc-100">$60 billion</strong>.
              Twelve million children are enrolled in some form of
              daycare or preschool. And the entire industry runs on
              waitlists managed by paper, pricing hidden in PDFs, and
              enrollment forms that require a physical visit. AI family
              assistants are coming — but they have nothing to connect
              to.
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
                    14 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== THE MARKET ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-500" />
              A $60 Billion Market Running on Phone Calls and Paper
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Finding childcare in the United States is one of the
                most stressful experiences a parent faces. The process
                typically involves calling dozens of centers, visiting
                websites that list no pricing, joining multiple
                waitlists with no visibility into timing, and comparing
                options in a personal spreadsheet. The average parent
                spends 30 or more hours researching childcare before
                making a decision.
              </p>
              <p>
                This friction exists because the childcare industry has{' '}
                <strong className="text-zinc-100">
                  zero agent-facing infrastructure
                </strong>
                . There are no public APIs for checking availability. No
                structured pricing data. No programmatic enrollment
                endpoints. No machine-readable licensing records. The
                entire $60 billion market operates through phone calls,
                email threads, and in-person visits.
              </p>
              <p>
                AI family assistants — the tools that will soon manage a
                household&apos;s scheduling, logistics, and service
                coordination — cannot participate in childcare at all.
                Not because the technology is not ready, but because
                childcare providers have given AI agents nothing to work
                with.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {marketStats.map((stat) => (
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

        {/* ===== WHY CHILDCARE SCORES NEAR ZERO ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              Why Childcare Providers Score Near Zero
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                AgentHermes scans reveal that the average childcare
                provider scores approximately 5 out of 100 on the Agent
                Readiness Score. Most score even lower. The problems are
                structural — not a matter of missing a few features, but
                a complete absence of machine-readable infrastructure.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {childcareProblems.map((item) => {
                const colors = getColorClasses(item.color)
                return (
                  <div
                    key={item.problem}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <item.icon
                          className={`h-5 w-5 ${colors.text}`}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">
                        {item.problem}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The result is a market where parents spend weeks doing
                what an AI agent could do in seconds — if the data
                existed in a queryable format. Every other local service
                vertical is moving toward APIs and structured data.
                Childcare remains stuck in the pre-internet era of
                business operations.
              </p>
            </div>
          </div>
        </section>

        {/* ===== CURRENT VS AGENT-READY ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              Current State vs Agent-Ready Childcare
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Here is how every step of the childcare search works today
              versus how it would work with agent-ready infrastructure.
            </p>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Task</div>
                <div>Today</div>
                <div>Agent-Ready</div>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={row.aspect}
                  className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">
                    {row.aspect}
                  </div>
                  <div className="text-zinc-500">{row.current}</div>
                  <div className="text-emerald-400">
                    {row.agentReady}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              What Agent-Ready Childcare Looks Like
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                An agent-ready childcare provider exposes five core
                capabilities through structured APIs. Together, these
                let an AI family assistant handle the entire childcare
                search and enrollment flow without a single phone call.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {agentReadyFeatures.map((feature) => {
                const colors = getColorClasses(feature.color)
                return (
                  <div
                    key={feature.name}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <feature.icon
                          className={`h-5 w-5 ${colors.text}`}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">
                        {feature.name}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500">
                        <span className="text-zinc-400 font-medium">
                          Endpoint:
                        </span>{' '}
                        <code
                          className={`${colors.text} text-xs`}
                        >
                          {feature.endpoint}
                        </code>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== THE AI FAMILY ASSISTANT VISION ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              The AI Family Assistant Is Coming
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The next generation of AI assistants will not just
                answer questions — they will manage household logistics.
                Scheduling doctor appointments, enrolling children in
                activities, coordinating school pickups, and yes,
                finding and securing childcare. These{' '}
                <strong className="text-zinc-100">
                  AI family assistants
                </strong>{' '}
                will manage childcare alongside{' '}
                <Link
                  href="/blog/education-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  school enrollment
                </Link>
                , pediatric appointments, and extracurricular
                scheduling.
              </p>
              <p>
                But they can only interact with providers that have
                APIs. When a parent says &ldquo;find full-time daycare
                for my toddler near my office, under $2,000 a month,
                licensed and accredited&rdquo; — the agent needs
                structured data from every provider within range. Availability,
                pricing, licensing, tour slots, enrollment requirements.
                Without APIs, the agent falls back to reading websites
                and telling the parent to call each center individually.
              </p>
              <p>
                The first childcare provider in any market with an MCP
                server will capture every AI-mediated inquiry. As more
                families adopt AI assistants, this advantage compounds.
                Within five years, a daycare without an API will be like
                a restaurant without a website — technically still
                operating, but invisible to a growing share of
                customers.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">
                  The coordination play:
                </strong>{' '}
                Childcare is not a standalone decision. It connects to
                school schedules, work commutes, sibling activities, and
                family budgets. AI family assistants will optimize
                across all of these simultaneously. The childcare
                provider with structured data becomes part of an
                integrated family logistics system — the one without
                structured data gets skipped entirely.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE PLATFORM LANDSCAPE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-purple-500" />
              The Childcare Platform Landscape
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                A few childcare management platforms exist —
                Brightwheel, HiMama (now Lillio), Procare, and
                Kangarootime. These platforms handle internal operations
                like attendance, billing, and parent communication. But
                their APIs are designed for the center, not for
                external discovery. No platform exposes availability or
                pricing to outside agents.
              </p>
              <p>
                Care.com and Sittercity have search functionality for
                nannies and babysitters, but their models are
                marketplace-based — you search their platform, not query
                individual provider APIs. The nanny herself has no API.
                Her availability, rates, certifications, and references
                are locked inside the marketplace.
              </p>
              <p>
                This creates an opportunity. The platform that gives
                individual childcare providers their own agent-facing
                API — while aggregating discovery across all providers —
                becomes the infrastructure layer for AI family
                assistants. Just as{' '}
                <Link
                  href="/blog/local-business-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  local businesses need MCP servers
                </Link>
                , childcare providers need agent-ready endpoints that
                make them individually addressable by AI.
              </p>
            </div>
          </div>
        </section>

        {/* ===== SCORING BREAKDOWN ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              How to Move From 5 to 40+
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Childcare providers do not need to build a full API
                overnight. Agent readiness improves incrementally, and
                even small changes have outsized impact because the
                starting point is so low.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                {
                  step: '1',
                  title: 'Publish structured data (5 to 15)',
                  detail:
                    'Add Schema.org ChildCare markup with structured hours, address, age ranges, and contact info. Publish a JSON pricing page instead of a PDF. These changes make you parseable by agents even without an API.',
                  icon: FileJson,
                },
                {
                  step: '2',
                  title: 'Add an availability indicator (15 to 25)',
                  detail:
                    'Even a simple page showing "Infant: Waitlist / Toddler: 2 spots / Preschool: Full" as structured data is more than 99% of providers offer. Update it weekly.',
                  icon: Search,
                },
                {
                  step: '3',
                  title: 'Enable online tour booking (25 to 35)',
                  detail:
                    'Use Calendly or a simple booking form with structured output. The goal is an endpoint an agent can hit to schedule a tour without email back-and-forth.',
                  icon: Calendar,
                },
                {
                  step: '4',
                  title: 'Get an MCP server (35 to 50+)',
                  detail:
                    'An AgentHermes-hosted MCP server bundles all your childcare tools — availability, pricing, tour booking, enrollment — into one agent-discoverable endpoint. This is where you become truly agent-ready.',
                  icon: Server,
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
                      <h3 className="font-bold text-zinc-100 text-sm">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
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
                    'Education Agent Readiness: Why Schools Score Zero',
                  href: '/blog/education-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Local Business Agent Readiness: The $6.2B Infrastructure Gap',
                  href: '/blog/local-business-agent-readiness',
                  tag: 'Market Analysis',
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
              Is your childcare business invisible to AI?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run a free Agent Readiness Scan and see exactly what AI
              agents can and cannot find about your daycare, preschool,
              or childcare service.
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
