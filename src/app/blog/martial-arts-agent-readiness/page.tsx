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
  Globe,
  HelpCircle,
  Layers,
  Phone,
  Search,
  Server,
  Shield,
  Sparkles,
  Swords,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Martial Arts and Dance Studio Agent Readiness: Why Class-Based Businesses Score Under 10 | AgentHermes',
  description:
    'Martial arts dojos, dance studios, and yoga studios are invisible to AI agents. Class schedules on paper, phone registration, manual belt tracking. Here is what agent readiness looks like for class-based businesses.',
  keywords: [
    'martial arts dance studio agent readiness',
    'martial arts agent readiness',
    'dance studio agent readiness',
    'yoga studio AI agents',
    'class-based business AI',
    'agent readiness score',
    'dojo agent readiness',
    'MCP server martial arts',
  ],
  openGraph: {
    title:
      'Martial Arts and Dance Studio Agent Readiness: Why Class-Based Businesses Score Under 10',
    description:
      'Martial arts dojos, dance studios, and yoga studios score under 10. Class schedules are unstructured, registration is phone-only, and student tracking is manual. AI family scheduling agents are blocked.',
    url: 'https://agenthermes.ai/blog/martial-arts-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Martial Arts and Dance Studio Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Martial Arts and Dance Studio Agent Readiness: Why Class-Based Businesses Score Under 10',
    description:
      'Class-based businesses are invisible to AI agents. Manual schedules, phone registration, paper belt tracking. Score under 10.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/martial-arts-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const classBasedProblems = [
  {
    category: 'Class Schedules',
    current: 'PDF tacked to the wall, image on website, or "call for schedule"',
    agentReady: 'API endpoint returning class objects with time, instructor, level, capacity, and availability',
    impact: 'AI family scheduling agents cannot compare class times across studios',
    icon: Calendar,
    color: 'red',
  },
  {
    category: 'Registration',
    current: 'Walk-in, phone call, or paper form at the front desk',
    agentReady: 'Enrollment endpoint with student info, class selection, waiver acceptance, and payment',
    impact: 'Parents managing 3 kids in 3 activities cannot book any of them through AI',
    icon: UserPlus,
    color: 'red',
  },
  {
    category: 'Student Levels',
    current: 'Belt rank or level tracked in a binder, spreadsheet, or the instructor\'s head',
    agentReady: 'Student level tracking API with progression history, next milestone, and eligible classes',
    impact: 'Agents cannot recommend appropriate classes or track a child\'s advancement',
    icon: TrendingUp,
    color: 'red',
  },
  {
    category: 'Competitions and Recitals',
    current: 'Flyers on the bulletin board, email blasts, Facebook group posts',
    agentReady: 'Event registration endpoint with dates, eligibility requirements, fees, and roster',
    impact: 'AI family calendar agents cannot find or register kids for events',
    icon: Target,
    color: 'red',
  },
  {
    category: 'Equipment and Uniforms',
    current: '"We sell gis at the front desk" or "check with Sensei"',
    agentReady: 'Product catalog API with sizing, inventory, and ordering for uniforms and gear',
    impact: 'No agent can help a parent order the right belt or leotard before class starts',
    icon: Layers,
    color: 'red',
  },
]

const dimensionScores = [
  { dimension: 'D1 Discovery', score: 2, max: 15, note: 'Website exists but no structured data, no schema markup for classes' },
  { dimension: 'D2 API Quality', score: 0, max: 15, note: 'Zero API endpoints. No class data is machine-readable' },
  { dimension: 'D3 Onboarding', score: 1, max: 8, note: 'Walk-in or phone only. No self-service digital enrollment' },
  { dimension: 'D4 Pricing', score: 2, max: 5, note: 'Sometimes on website, often "call for pricing" or requires visit' },
  { dimension: 'D5 Payment', score: 0, max: 8, note: 'Cash, check, or card at front desk. No online payment API' },
  { dimension: 'D6 Data Quality', score: 1, max: 10, note: 'Class names exist but no structured instructor, level, or capacity data' },
  { dimension: 'D7 Security', score: 0, max: 12, note: 'No API means no auth, no rate limiting, no security headers' },
  { dimension: 'D8 Reliability', score: 0, max: 13, note: 'No endpoints to measure uptime on' },
  { dimension: 'D9 Agent Experience', score: 0, max: 7, note: 'No MCP, no agent-card.json, no llms.txt, no AGENTS.md' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do martial arts studios score so low on agent readiness?',
    answer:
      'Martial arts studios, dance studios, and yoga studios operate almost entirely on analog infrastructure. Class schedules are printed or posted as images. Registration happens by walking in or calling. Belt ranks and student levels are tracked on paper. There is nothing for an AI agent to connect to because no digital interface exists beyond a basic website.',
  },
  {
    question: 'What would an agent-ready martial arts studio look like?',
    answer:
      'An agent-ready studio exposes class schedules through an API with instructor profiles, enrollment endpoints that accept student information and payment, level tracking for belt ranks or skill progression, competition and recital registration, and a product catalog for uniforms and equipment. An AI assistant could then book a trial class for a parent without a single phone call.',
  },
  {
    question: 'Why does this matter for class-based businesses?',
    answer:
      'AI family scheduling agents are coming. Parents managing multiple children across martial arts, dance, soccer, and tutoring will use AI assistants to coordinate everything. The studios that have APIs for schedules and enrollment will get booked. The ones that require phone calls will not even appear in the agent\'s options.',
  },
  {
    question: 'What software do most studios use today?',
    answer:
      'Many martial arts studios use Mindbody, Zen Planner, or Kicksite for class management. Dance studios often use DanceStudio-Pro or Jackrabbit Dance. These platforms have some API capabilities, but they are not exposed as agent-readable interfaces. The scheduling data stays locked inside proprietary dashboards rather than published as structured endpoints that any agent can query.',
  },
  {
    question: 'How can a studio owner improve their score without building an API?',
    answer:
      'The fastest path is AgentHermes. Run a free scan at /audit to see your score, then use /connect to generate a hosted MCP server with class schedule tools, enrollment endpoints, and instructor profiles pre-built for your vertical. No coding required. Your studio goes from invisible to bookable by AI agents in under 5 minutes.',
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

export default function MartialArtsDanceAgentReadinessPage() {
  const totalScore = dimensionScores.reduce((sum, d) => sum + d.score, 0)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Martial Arts and Dance Studio Agent Readiness: Why Class-Based Businesses Score Under 10',
    description:
      'Martial arts dojos, dance studios, and yoga studios are invisible to AI agents. Class schedules on paper, phone registration, manual belt tracking. Score under 10 on agent readiness.',
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
      'https://agenthermes.ai/blog/martial-arts-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'martial arts dance studio agent readiness, class-based business AI, dojo agent readiness, yoga studio agent readiness',
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
          name: 'Martial Arts and Dance Studio Agent Readiness',
          item: 'https://agenthermes.ai/blog/martial-arts-agent-readiness',
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
      title="Martial Arts and Dance Studio Agent Readiness: Why Class-Based Businesses Score Under 10"
      shareUrl="https://agenthermes.ai/blog/martial-arts-agent-readiness"
      currentHref="/blog/martial-arts-agent-readiness"
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
              <Link href="/" className="hover:text-zinc-300 transition-colors">
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
                Martial Arts & Dance Studio Agent Readiness
              </span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <Swords className="h-3.5 w-3.5" />
                Vertical Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                Score Under 10
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Martial Arts and Dance Studio Agent Readiness:{' '}
              <span className="text-emerald-400">
                Why Class-Based Businesses Score Under 10
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Martial arts dojos, dance studios, and yoga studios share a model:
              recurring classes, instructor expertise, and student progression.
              They also share a problem:{' '}
              <strong className="text-zinc-100">
                none of this is accessible to AI agents
              </strong>
              . Class schedules live on paper or as website images. Registration
              requires a phone call. Belt ranks are tracked in binders. The
              average agent readiness score for class-based businesses is under
              10 out of 100.
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
                    12 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== THE CLASS-BASED MODEL ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Swords className="h-5 w-5 text-amber-500" />
              The Class-Based Business Model
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Martial arts studios, dance schools, yoga studios, gymnastics
                centers, and swimming academies all share the same operational
                structure. They sell recurring access to scheduled classes taught
                by specific instructors to students at specific skill levels.
                This model generates an estimated $35 billion annually in the US
                alone across these verticals.
              </p>
              <p>
                The class-based model has unique data that would be enormously
                valuable to AI agents: structured schedules with instructor
                assignments, student progression systems (belts, levels, grades),
                age and skill prerequisites, and seasonal event calendars for
                competitions and recitals. But almost none of this data exists in
                a format that any machine can read.
              </p>
              <p>
                When a parent tells their AI assistant{' '}
                <em>
                  &ldquo;find a beginner karate class for my 8-year-old on
                  Tuesday evenings&rdquo;
                </em>
                , the agent has nothing to work with. It cannot query class
                schedules, check age eligibility, verify instructor credentials,
                or enroll the child. It can only return a Google search result
                and suggest the parent call the studio.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '$35B', label: 'US class-based market', icon: BarChart3 },
                { value: '<10', label: 'avg agent readiness score', icon: Target },
                { value: '0', label: 'studios with MCP servers', icon: Server },
                { value: '100%', label: 'require phone/walk-in', icon: Phone },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FIVE BROKEN DIMENSIONS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              Five Things Agents Cannot Do at Any Studio
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Every class-based business breaks on the same five capabilities. Here
              is what exists today versus what agent readiness requires.
            </p>

            <div className="space-y-4 mb-8">
              {classBasedProblems.map((problem) => {
                const colors = getColorClasses(problem.color)
                return (
                  <div
                    key={problem.category}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <problem.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">
                        {problem.category}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                        <p className="text-xs text-red-400 font-medium mb-1">
                          Today
                        </p>
                        <p className="text-sm text-zinc-400">{problem.current}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <p className="text-xs text-emerald-400 font-medium mb-1">
                          Agent-Ready
                        </p>
                        <p className="text-sm text-zinc-400">
                          {problem.agentReady}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      <span className="text-amber-400 font-medium">
                        Impact:
                      </span>{' '}
                      {problem.impact}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== DIMENSION SCORECARD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Dimension-by-Dimension Scorecard
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              AgentHermes scores businesses across 9 dimensions. Here is how a
              typical martial arts or dance studio scores on each. Total:{' '}
              <span className="text-red-400 font-bold">{totalScore}/100</span>.
            </p>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Dimension</div>
                <div className="text-center">Score</div>
                <div className="text-center">Max</div>
                <div>Why</div>
              </div>
              {dimensionScores.map((row, i) => (
                <div
                  key={row.dimension}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">
                    {row.dimension}
                  </div>
                  <div className="text-center text-red-400 font-bold">
                    {row.score}
                  </div>
                  <div className="text-center text-zinc-600">{row.max}</div>
                  <div className="text-zinc-500 text-xs leading-relaxed">
                    {row.note}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-red-400">
                  Score {totalScore}/100 = ARL-0: Dark.
                </strong>{' '}
                Class-based businesses are not just low-scoring — they are
                functionally invisible. Seven of nine dimensions score zero or
                one because there is no digital infrastructure for an agent to
                interact with. The website exists, but it is a brochure, not an
                interface.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE FAMILY SCHEDULING AGENT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              The Family Scheduling Agent Is Coming
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Consider a parent with three children. One takes taekwondo on
                Tuesdays and Thursdays. Another has ballet on Wednesdays and a
                recital in May. The third wants to try jiu-jitsu but only
                evenings work. Today, coordinating this requires calling three
                studios, cross-referencing schedules manually, and tracking
                registrations across three different systems.
              </p>
              <p>
                AI family scheduling agents will manage all of this. They will
                query class schedules across every studio in a zip code, filter
                by age, skill level, and time availability, suggest optimal
                combinations that minimize driving, and handle enrollment and
                payment in one flow. This is not speculative — it is the obvious
                next step after AI calendar management, which already exists.
              </p>
              <p>
                But these agents need structured data to work. They need an API
                that returns class objects with time, instructor, age range,
                level, and available spots. They need an enrollment endpoint that
                accepts student information and processes payment. Without these,
                the studio does not exist in the agent&apos;s world.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: 'Studios with APIs get booked',
                  detail:
                    'When the family scheduling agent searches for "beginner karate, Tuesday 5pm, age 8," only studios with queryable schedule data appear. Phone-only studios are not in the result set.',
                },
                {
                  title: 'Multi-activity coordination favors structured data',
                  detail:
                    'An agent juggling 3 kids across 5 activities needs to compare dozens of class times. Studios with machine-readable schedules can be optimized into the family calendar. Others cannot.',
                },
                {
                  title: 'Trial classes become instant conversions',
                  detail:
                    'If a parent says "book a trial class at the closest dojo this Saturday," an agent-ready studio can confirm availability and complete enrollment in seconds. A phone-only studio loses that student.',
                },
                {
                  title: 'Competition registration goes agent-first',
                  detail:
                    'Parents managing tournament schedules across multiple sports will delegate registration to their AI assistant. Studios with event registration APIs capture those entries automatically.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className="font-bold text-zinc-100 mb-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.detail}
                  </p>
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
              What an Agent-Ready Studio Looks Like
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              An agent-ready martial arts or dance studio exposes five core MCP
              tools that let any AI agent interact with the business.
            </p>

            <div className="space-y-3 mb-8">
              {[
                {
                  tool: 'get_class_schedule',
                  description:
                    'Returns all classes with day, time, instructor name, instructor bio, class level, age range, current enrollment count, and maximum capacity. Filterable by day, level, age, and instructor.',
                  example:
                    'get_class_schedule({ day: "tuesday", level: "beginner", age_min: 6, age_max: 10 })',
                  icon: Calendar,
                },
                {
                  tool: 'enroll_student',
                  description:
                    'Accepts student name, guardian contact, class ID, waiver acceptance, and payment method. Returns confirmation with first class date and what to bring.',
                  example:
                    'enroll_student({ name: "Kai Johnson", guardian_phone: "555-0123", class_id: "tkd-beg-tue", waiver: true })',
                  icon: UserPlus,
                },
                {
                  tool: 'get_student_progress',
                  description:
                    'Returns current belt rank or level, date achieved, next rank requirements, classes attended, and estimated timeline to next promotion.',
                  example:
                    'get_student_progress({ student_id: "kai-johnson-2024" })',
                  icon: TrendingUp,
                },
                {
                  tool: 'register_event',
                  description:
                    'Lists upcoming competitions, tournaments, or recitals with dates, eligibility requirements, fees, and registration deadlines. Handles sign-up and payment.',
                  example:
                    'register_event({ student_id: "kai-johnson-2024", event_id: "spring-tournament-2026" })',
                  icon: Target,
                },
                {
                  tool: 'order_equipment',
                  description:
                    'Product catalog with uniforms (gi, leotard, shoes), protective gear, and accessories. Includes sizing recommendations based on student age and measurements.',
                  example:
                    'order_equipment({ student_id: "kai-johnson-2024", item: "gi", size: "youth-medium" })',
                  icon: Layers,
                },
              ].map((item) => (
                <div
                  key={item.tool}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <item.icon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-emerald-400 text-sm font-mono font-bold">
                        {item.tool}
                      </code>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-2">
                      {item.description}
                    </p>
                    <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <code className="text-xs text-zinc-500">
                        {item.example}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                With these five tools, a studio jumps from a score of{' '}
                {totalScore} to 55 or higher — crossing into Bronze tier. Add an{' '}
                <Link
                  href="/blog/agent-card-json-guide"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  agent-card.json
                </Link>{' '}
                and transparent pricing, and the studio reaches Silver. The
                infrastructure gap is not about technology complexity — it is
                about the tools not existing yet for this vertical.
              </p>
            </div>
          </div>
        </section>

        {/* ===== COMPARISON TO ADJACENT VERTICALS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              How Studios Compare to Adjacent Verticals
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Class-based businesses sit at the intersection of{' '}
                <Link
                  href="/blog/fitness-wellness-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  fitness and wellness
                </Link>{' '}
                and{' '}
                <Link
                  href="/blog/education-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  education
                </Link>
                . Fitness facilities like gyms have begun adopting booking APIs
                through platforms like ClassPass and Mindbody. Education
                institutions have student information systems with APIs. But
                martial arts and dance studios are stuck between these two
                worlds, using neither fitness booking infrastructure nor
                education management systems consistently.
              </p>
              <p>
                The result is the worst of both worlds: no standardized booking
                API (unlike fitness), no student records API (unlike education),
                and no catalog API (unlike retail). Studios operate in an analog
                gap between digital verticals.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Vertical</div>
                <div className="text-center">Avg Score</div>
                <div>Key Advantage</div>
              </div>
              {[
                {
                  vertical: 'Fitness & Wellness',
                  score: '15-25',
                  advantage: 'ClassPass/Mindbody APIs for booking',
                },
                {
                  vertical: 'Education (K-12)',
                  score: '10-20',
                  advantage: 'Student information systems with data export',
                },
                {
                  vertical: 'Martial Arts / Dance',
                  score: '<10',
                  advantage: 'None — analog operations across the board',
                },
                {
                  vertical: 'Tutoring',
                  score: '10-15',
                  advantage: 'Some platforms (Wyzant) have scheduling APIs',
                },
              ].map((row, i) => (
                <div
                  key={row.vertical}
                  className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">
                    {row.vertical}
                  </div>
                  <div
                    className={`text-center font-bold ${row.vertical.includes('Martial') ? 'text-red-400' : 'text-amber-400'}`}
                  >
                    {row.score}
                  </div>
                  <div className="text-zinc-500">{row.advantage}</div>
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
                    'Fitness and Wellness Agent Readiness',
                  href: '/blog/fitness-wellness-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Education Agent Readiness',
                  href: '/blog/education-agent-readiness',
                  tag: 'Vertical Analysis',
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
              Score your studio in 60 seconds
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              See how your martial arts, dance, or yoga studio scores across all
              9 dimensions. Then connect to the agent economy with a hosted MCP
              server — no code required.
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
                Connect My Studio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </BlogArticleWrapper>
  )
}
