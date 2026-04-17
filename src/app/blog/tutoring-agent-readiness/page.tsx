import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BookOpenCheck,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  GraduationCap,
  HelpCircle,
  Layers,
  MapPin,
  Network,
  Phone,
  Search,
  Server,
  Shield,
  Sparkles,
  Star,
  Target,
  Timer,
  TrendingUp,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Tutoring Agent Readiness: Why Private Tutors and Learning Centers Can\'t Be Matched by AI | AgentHermes',
  description:
    'The $12B US tutoring market runs on text messages and Wyzant profiles. No availability API, no structured credential data, no session booking endpoint. Here is what agent-ready tutoring looks like and why AI education agents need structured data to match students to tutors.',
  keywords: [
    'tutoring agent readiness',
    'tutor AI agent matching',
    'tutoring MCP server',
    'tutoring API',
    'agent readiness tutoring',
    'AI tutor matching',
    'tutoring agent economy',
    'private tutor agent readiness score',
    'learning center agent readiness',
  ],
  openGraph: {
    title: 'Tutoring Agent Readiness: Why Private Tutors and Learning Centers Can\'t Be Matched by AI',
    description:
      'The $12B US tutoring market has no availability APIs, no credential data endpoints, no session booking infrastructure. AI education agents cannot match students to tutors without structured data.',
    url: 'https://agenthermes.ai/blog/tutoring-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tutoring Agent Readiness: Why Private Tutors and Learning Centers Can\'t Be Matched by AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tutoring Agent Readiness: Why Private Tutors and Learning Centers Can\'t Be Matched by AI',
    description:
      '$12B tutoring market, zero MCP servers. AI education agents need structured data to match students to tutors — and none exists.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/tutoring-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const tutoringEndpoints = [
  {
    name: 'Subject Expertise Catalog',
    description: 'Structured JSON listing every subject the tutor teaches — AP Calculus, SAT Prep, conversational Spanish, organic chemistry — with proficiency level, teaching approach, and grade range. Replaces the free-text Wyzant bio that agents cannot parse.',
    example: 'get_subjects() returns [{ subject: "AP Calculus BC", level: "advanced", grades: "11-12", approach: "problem-set-driven", pass_rate: 0.94 }]',
    icon: BookOpen,
    color: 'emerald',
  },
  {
    name: 'Availability Calendar API',
    description: 'Real-time endpoint returning open session slots by day, time zone, and session format (in-person vs online). Replaces the "message me to check availability" dead end that loses 60% of prospective students.',
    example: 'check_availability({ subject: "SAT_prep", format: "online", week: "2026-04-20" }) returns [{ day: "Tue", slots: ["4pm-5pm", "6pm-7pm"] }]',
    icon: Calendar,
    color: 'blue',
  },
  {
    name: 'Session Booking Endpoint',
    description: 'Allows agents to book a tutoring session with student name, subject, preferred format, and time slot. Returns confirmation, meeting link for online sessions, and cancellation policy.',
    example: 'book_session({ student: "Alex M.", subject: "AP_Calc_BC", slot: "2026-04-22T16:00", format: "online" }) returns { confirmation: "SES-7291", meeting_url: "https://..." }',
    icon: UserPlus,
    color: 'purple',
  },
  {
    name: 'Credential and Qualification JSON',
    description: 'Machine-readable endpoint returning education background, teaching certifications, test scores, years of experience, and verified student outcomes. The structured data that lets agents compare tutor quality objectively.',
    example: 'get_credentials() returns { degree: "MS Mathematics, MIT", certifications: ["state_teaching_cert"], sat_score: 1580, years_teaching: 8, verified_reviews: 47 }',
    icon: GraduationCap,
    color: 'amber',
  },
  {
    name: 'Progress Tracking API',
    description: 'Endpoint exposing student progress data — sessions completed, topics covered, assessment scores over time, and tutor notes. Enables AI education agents to monitor learning outcomes and adjust recommendations.',
    example: 'get_progress({ student_id: "STU-412" }) returns { sessions: 12, topics_mastered: 8, current_score: 720, target_score: 780, next_focus: "geometry" }',
    icon: TrendingUp,
    color: 'cyan',
  },
]

const comparisonRows = [
  { aspect: 'Finding a tutor', current: 'Browse Wyzant profiles, read bios, filter by subject', agentReady: 'Agent queries subject catalog by topic + level + location, compares 10 tutors in seconds' },
  { aspect: 'Checking credentials', current: 'Read free-text bio, check self-reported test scores', agentReady: 'get_credentials() returns verified education, certifications, and student outcome data' },
  { aspect: 'Scheduling a session', current: 'Message tutor, wait for reply, go back and forth on times', agentReady: 'check_availability() returns open slots, book_session() confirms instantly' },
  { aspect: 'Comparing pricing', current: 'Click into each profile to see hourly rate, no bulk discounts shown', agentReady: 'get_pricing() returns rate by subject, package discounts, cancellation terms' },
  { aspect: 'Tracking progress', current: 'Ask the tutor verbally, no standardized metrics', agentReady: 'get_progress() returns sessions completed, scores over time, areas needing focus' },
]

const scoreBreakdown = [
  { dimension: 'D1 Discovery', score: '3/15', reason: 'Wyzant/Tutor.com profile provides some discoverability. No agent-card.json or llms.txt.' },
  { dimension: 'D2 API Quality', score: '0/15', reason: 'Zero public API endpoints. Marketplace APIs are internal-only.' },
  { dimension: 'D3 Onboarding', score: '2/10', reason: 'Contact form or message button exists but returns no structured response.' },
  { dimension: 'D4 Pricing', score: '2/10', reason: 'Hourly rate is visible on profile but not in a structured, queryable format.' },
  { dimension: 'D6 Data Quality', score: '1/10', reason: 'Subject expertise described in unstructured free-text bios.' },
  { dimension: 'D7 Security', score: '1/12', reason: 'HTTPS on marketplace platforms but no auth mechanism for any API.' },
  { dimension: 'D8 Reliability', score: '0/13', reason: 'No health endpoint, no status page, no uptime guarantees for individual tutors.' },
  { dimension: 'D9 Agent Experience', score: '0/10', reason: 'No structured errors, no rate limit headers, no agent-facing endpoints.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do private tutors score so low on agent readiness?',
    answer:
      'Private tutoring is an individual-practitioner industry. Most tutors manage their business through text messages, personal calendars, and marketplace profiles on Wyzant or Tutor.com. These platforms do not expose public APIs for availability, credentials, or booking. The tutor has no standalone digital infrastructure — their entire online presence is a profile page they do not control.',
  },
  {
    question: 'Can tutoring marketplaces like Wyzant become agent-ready?',
    answer:
      'Yes, and they are best positioned to do it. Wyzant, Tutor.com, Varsity Tutors, and similar platforms already have the data — tutor profiles, availability, pricing, reviews. They just do not expose it via public API or MCP server. If Wyzant added an MCP server with search, availability, and booking tools, it would instantly make 65,000 tutors agent-accessible. The platform play lifts all tutors at once.',
  },
  {
    question: 'What about learning centers like Kumon or Sylvan?',
    answer:
      'Learning centers have slightly more infrastructure than individual tutors — scheduling software, student management systems, and location-based enrollment. But these systems are internal. Kumon has 1,500 US locations and zero public API endpoints. The franchise model means even if corporate built an API, individual center owners would need to opt in. AgentHermes can bridge this gap by connecting to existing scheduling software and presenting it as an MCP server.',
  },
  {
    question: 'How would an AI education agent use a tutoring MCP server?',
    answer:
      'A parent tells their AI assistant: "My daughter is struggling with AP Chemistry. She needs a tutor who can meet twice a week after school." The agent queries tutoring MCP servers filtered by subject, availability after 3pm, format (in-person or online), and verified credentials. It compares 5 tutors on price, pass rates, and student reviews, then books the first session — all without the parent browsing profiles or exchanging messages.',
  },
  {
    question: 'What about AI tutoring services like Khan Academy or ChatGPT?',
    answer:
      'AI tutoring tools complement rather than replace human tutors. They excel at practice problems and explanations but cannot provide the accountability, mentorship, and adaptive teaching that human tutors deliver — especially for high-stakes prep (SAT, AP exams, college admissions). Agent readiness is about making human tutors discoverable and bookable by agents, not about replacing them with AI.',
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

export default function TutoringAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Tutoring Agent Readiness: Why Private Tutors and Learning Centers Can\'t Be Matched by AI',
    description:
      'The $12B US tutoring market has no availability APIs, no credential endpoints, no session booking infrastructure. AI education agents cannot match students to tutors without structured data.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/tutoring-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'tutoring agent readiness, tutor AI agent matching, tutoring MCP server, tutoring API, AI education agent',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Tutoring Agent Readiness',
          item: 'https://agenthermes.ai/blog/tutoring-agent-readiness',
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
      title="Tutoring Agent Readiness: Why Private Tutors and Learning Centers Can't Be Matched by AI"
      shareUrl="https://agenthermes.ai/blog/tutoring-agent-readiness"
      currentHref="/blog/tutoring-agent-readiness"
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
            <span className="text-zinc-400">Tutoring Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <BookOpenCheck className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              $12B Market
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Tutoring Agent Readiness:{' '}
            <span className="text-emerald-400">Why Private Tutors and Learning Centers Cannot Be Matched by AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The US private tutoring market is worth <strong className="text-zinc-100">$12 billion</strong> and
            growing at 8% annually. Tutors list on Wyzant and Tutor.com, but scheduling happens via text message,
            pricing varies by subject with no structured data, and credentials live in free-text bios. AI education
            agents will match students to tutors — but only if tutors expose{' '}
            <Link href="/blog/what-is-mcp-server" className="text-emerald-400 hover:text-emerald-300 underline">structured data through MCP servers</Link>.
            Right now, none do.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            A $12 Billion Industry That Runs on Text Messages
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Private tutoring is one of the least digitized professional services in the United States.
              The typical parent-to-tutor journey looks like this: search Google or Wyzant, scan a dozen
              free-text profiles, message three or four tutors, wait hours or days for responses, negotiate
              schedules over text, and hope the first session goes well. If it does not, start over.
            </p>
            <p>
              The infrastructure barrier is structural. Unlike restaurants (which at least have menus online)
              or doctors (who use scheduling platforms), most tutors operate as solo practitioners. Their
              &ldquo;tech stack&rdquo; is a marketplace profile they do not control, a personal Google Calendar,
              Venmo for payments, and text messaging for everything else. There is no public API for any of it.
            </p>
            <p>
              Learning centers like Kumon, Sylvan, and Mathnasium have more internal infrastructure —
              enrollment systems, student tracking, and location management. But these systems are closed.
              Kumon&rsquo;s 1,500 US centers have zero public endpoints. A parent cannot query availability
              across locations, compare pricing by program, or enroll a child without a phone call or walk-in.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$12B', label: 'US tutoring market', icon: DollarSign },
              { value: '1M+', label: 'active tutors in the US', icon: Users },
              { value: '0', label: 'with MCP servers', icon: Server },
              { value: '~9', label: 'avg agent readiness score', icon: BarChart3 },
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

      {/* ===== WHY AGENTS CAN'T HELP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            Why AI Education Agents Cannot Match Students to Tutors Today
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Imagine a parent tells their AI assistant: &ldquo;My son is failing AP Chemistry. He needs a tutor
              who can meet Tuesdays and Thursdays after 4pm, preferably someone with a chemistry degree.&rdquo;
              Here is what the agent needs to do and why it fails at every step.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: 'Search by subject and level',
                need: 'Query tutors who teach AP Chemistry specifically, not just "chemistry"',
                reality: 'Marketplace search is keyword-based. "Chemistry" returns SAT prep tutors, general science tutors, and AP Chem specialists with no way to filter programmatically.',
              },
              {
                step: 'Check credentials',
                need: 'Filter to tutors with chemistry degrees or teaching certifications',
                reality: 'Credentials are in free-text bios. "I studied chemistry at UCLA" and "MS Chemistry, published researcher" look the same to a keyword search.',
              },
              {
                step: 'Check availability',
                need: 'Find tutors free on Tuesdays and Thursdays after 4pm',
                reality: 'No availability API exists. The only way to check is messaging each tutor and waiting for a reply.',
              },
              {
                step: 'Compare pricing',
                need: 'Get hourly rates for AP Chemistry specifically across 5 tutors',
                reality: 'Some tutors list one rate for all subjects. Others charge more for AP. The pricing structure is inconsistent and unstructured.',
              },
              {
                step: 'Book a trial session',
                need: 'Reserve Tuesday at 4pm with the best-qualified, available tutor',
                reality: 'No booking endpoint. Agent would need to send a message and wait for manual confirmation — which could take days.',
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.step}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">
                    <span className="text-blue-400 font-medium">Need:</span> {item.need}
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    <span className="text-red-400 font-medium">Reality:</span> {item.reality}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-red-400">The result:</strong> The agent tells the parent
              &ldquo;I found some chemistry tutors on Wyzant. Here are links to their profiles.&rdquo;
              The parent is back to square one — reading profiles, messaging tutors, and waiting for replies.
              The agent could not filter, compare, or book because there was no structured data to work with.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORE BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Typical Tutoring Agent Readiness Score: 9 out of 100
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We assessed tutoring businesses and individual tutors across the US. The average score is approximately
            9 out of 100 — firmly in the{' '}
            <Link href="/blog/arl-levels-explained" className="text-emerald-400 hover:text-emerald-300 underline">ARL-0: Dark</Link>{' '}
            tier. Marketplace-listed tutors score slightly higher than independents due to profile discoverability.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div>Score</div>
              <div>Why</div>
            </div>
            {scoreBreakdown.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className="text-red-400 font-mono">{row.score}</div>
                <div className="text-zinc-500">{row.reason}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The few points tutors earn come from HTTPS on marketplace platforms and the basic discoverability
              of having a profile page. Every dimension that measures API quality, structured data, or
              agent-to-service interaction scores near zero. Individual tutors without marketplace listings
              score 0-3.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Tutoring Looks Like: 5 Endpoints
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              An agent-ready tutor or learning center exposes five endpoints through an{' '}
              <Link href="/blog/what-is-mcp-server" className="text-emerald-400 hover:text-emerald-300 underline">MCP server</Link>.
              Together, these let an AI education agent handle the entire student-to-tutor matching and booking
              workflow without a single message or phone call.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {tutoringEndpoints.map((endpoint) => {
              const colors = getColorClasses(endpoint.color)
              return (
                <div
                  key={endpoint.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <endpoint.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{endpoint.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{endpoint.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{endpoint.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CURRENT VS AGENT-READY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Current Experience vs Agent-Ready: Side by Side
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every step of the student-to-tutor journey can be automated — but only if the tutor or
            platform exposes the right data structures.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Task</div>
              <div>Today (Message-Based)</div>
              <div>Agent-Ready</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.current}</div>
                <div className="text-emerald-400">{row.agentReady}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE PLATFORM OPPORTUNITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Platform Play: Lifting All Tutors at Once
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Individual tutors will not build MCP servers. They do not have the technical knowledge or
              infrastructure. The opportunity is at the <strong className="text-zinc-100">platform level</strong>.
              Tutoring marketplaces and learning center franchises that add agent-facing APIs lift thousands of
              tutors into the agent economy overnight.
            </p>
            <p>
              Consider Wyzant. It has 65,000 tutor profiles with subject expertise, hourly rates, availability
              preferences, and student reviews. All of this data exists in their database. Exposing it through
              an MCP server with five endpoints — search, availability, credentials, booking, and progress —
              would make every listed tutor instantly discoverable and bookable by AI education agents.
            </p>
            <p>
              The same applies to Varsity Tutors, Tutor.com (owned by The Princeton Review), and franchise
              learning centers. The data exists. The protocol exists. The gap is that nobody has connected them.
              The first tutoring platform to do this captures the entire AI-driven student matching channel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'AI education agents are coming',
                detail: 'Every major AI company is building agents that help students learn. These agents need to match students with human tutors for subjects where AI alone is insufficient — and they need structured APIs to do it.',
                icon: Bot,
              },
              {
                title: 'Test prep is a $7B sub-market',
                detail: 'SAT, ACT, AP, GRE, GMAT, LSAT, MCAT prep drives premium tutoring rates ($80-$300/hr). An agent matching a student to the right test prep tutor based on score goals and verified outcomes is transformative.',
                icon: GraduationCap,
              },
              {
                title: 'Recurring sessions mean recurring revenue',
                detail: 'Most tutoring engagements last 3-12 months with weekly sessions. An agent that books the first session and monitors progress creates long-term retention without ongoing marketing spend.',
                icon: Timer,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <item.icon className="h-5 w-5 text-emerald-400 mb-3" />
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
                title: 'Education Agent Readiness: Schools, Districts, and EdTech',
                href: '/blog/education-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'EdTech Agent Readiness: LMS Platforms and Learning Tools',
                href: '/blog/edtech-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Check Your Agent Readiness Score',
                href: '/audit',
                tag: 'Free Tool',
                tagColor: 'blue',
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
            Is your tutoring business invisible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score in 60 seconds. See exactly where you stand
            and what it takes to become the first agent-ready tutor in your market.
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
