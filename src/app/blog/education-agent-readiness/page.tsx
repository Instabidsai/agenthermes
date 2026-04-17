import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Globe,
  GraduationCap,
  HelpCircle,
  Layers,
  Lock,
  Monitor,
  School,
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
  title: 'Education Agent Readiness: Why Schools and Universities Are Missing the Agent Economy | AgentHermes',
  description:
    'Education averages 29/100 on the Agent Readiness Score. LMS systems locked behind institutional auth, admissions still phone/email/PDF, zero structured course APIs. Here is what agent-ready education looks like.',
  keywords: [
    'education agent readiness',
    'university AI agents',
    'LMS agent readiness',
    'college AI integration',
    'education MCP server',
    'Canvas API agent',
    'course catalog API',
    'agent ready university',
    'EdTech agent readiness',
  ],
  openGraph: {
    title: 'Education Agent Readiness: Why Schools and Universities Are Missing the Agent Economy',
    description:
      'Education averages 29/100 on agent readiness. LMS locked behind auth, admissions still PDF-based, zero course catalog APIs. EdTech SaaS is closer — but traditional institutions are dark.',
    url: 'https://agenthermes.ai/blog/education-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Education Agent Readiness: Why Schools and Universities Are Missing the Agent Economy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education Agent Readiness: Why Schools and Universities Are Missing the Agent Economy',
    description:
      'Education averages 29/100. LMS APIs locked. Admissions still PDF. Zero structured course catalogs. The entire vertical is dark to AI agents.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/education-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const segmentScores = [
  {
    segment: 'Community Colleges',
    score: 12,
    tier: 'Not Scored',
    color: 'red',
    detail: 'Brochure websites, PDF catalogs, phone-only enrollment. Zero structured data.',
  },
  {
    segment: 'K-12 Districts',
    score: 15,
    tier: 'Not Scored',
    color: 'red',
    detail: 'Parent portals behind SSO. No public APIs. Event calendars in iframes.',
  },
  {
    segment: 'State Universities',
    score: 28,
    tier: 'Not Scored',
    color: 'amber',
    detail: 'Some public course listings. Admissions still form-based. LMS locked.',
  },
  {
    segment: 'Elite Private Universities',
    score: 35,
    tier: 'Not Scored',
    color: 'amber',
    detail: 'Occasional API programs. Better structured data. Still no agent card.',
  },
  {
    segment: 'EdTech SaaS (Coursera, Khan Academy)',
    score: 52,
    tier: 'Bronze',
    color: 'emerald',
    detail: 'Public APIs, structured catalogs, OAuth. Closest to agent-ready in education.',
  },
]

const failurePatterns = [
  {
    pattern: 'LMS APIs Behind Institutional Auth',
    description: 'Canvas, Blackboard, and Moodle all have REST APIs. But access requires institutional SSO credentials and admin-provisioned API tokens. An AI agent cannot sign up for a Canvas account to browse courses.',
    impact: 'D2 API scores 0. D3 Onboarding scores 0. Two of the highest-weighted dimensions dead on arrival.',
    icon: Lock,
  },
  {
    pattern: 'Course Catalogs as PDF or HTML Tables',
    description: 'Most universities publish course catalogs as downloadable PDFs or static HTML tables rendered from legacy systems. No JSON endpoint. No structured schema. No real-time availability.',
    impact: 'D6 Data Quality scores 0. Agents cannot parse course requirements, prerequisites, or seat counts.',
    icon: BookOpen,
  },
  {
    pattern: 'Admissions Funneled Through Phone and Email',
    description: 'The enrollment journey for most institutions is: fill out a web form, wait for an email, call to confirm, mail documents. Zero programmatic enrollment endpoints.',
    impact: 'D3 Onboarding and D5 Payment both score 0. The agent journey dies at step 3 — Sign Up.',
    icon: Users,
  },
  {
    pattern: 'Tuition Pricing Requires Manual Calculation',
    description: 'Tuition varies by residency, credits, program, and financial aid. No institution exposes a pricing API. Most have PDF tuition schedules updated once per year.',
    impact: 'D4 Pricing scores 0. An agent asked "how much does a semester cost" cannot compute the answer.',
    icon: BarChart3,
  },
]

const agentReadyBlueprint = [
  {
    capability: 'Structured Course Catalog API',
    endpoint: 'GET /api/courses',
    returns: 'JSON array of courses with title, credits, prerequisites, schedule, seats_available, instructor',
    dimension: 'D2 + D6',
  },
  {
    capability: 'Real-Time Availability Endpoint',
    endpoint: 'GET /api/courses/{id}/availability',
    returns: 'Sections with open seats, waitlist count, meeting times, location',
    dimension: 'D2 + D8',
  },
  {
    capability: 'Programmatic Enrollment',
    endpoint: 'POST /api/enrollment',
    returns: 'Enrollment confirmation with student ID, schedule, payment due',
    dimension: 'D3 + D5',
  },
  {
    capability: 'Tuition Calculator API',
    endpoint: 'GET /api/tuition?credits=15&residency=in-state&program=cs',
    returns: 'Structured breakdown: tuition, fees, estimated financial aid, total due',
    dimension: 'D4',
  },
  {
    capability: 'Agent Discovery Files',
    endpoint: '/.well-known/agent-card.json + /llms.txt',
    returns: 'Institution identity, available tools, enrollment capabilities, accreditation',
    dimension: 'D1 + D9',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do EdTech SaaS companies score higher than universities?',
    answer:
      'EdTech companies like Coursera and Khan Academy were built as software products with APIs from day one. They have public course catalogs, OAuth authentication, and structured data. Universities built their systems 20 years ago for human users and have layered authentication and legacy systems on top. The architecture gap is not budget — it is technical debt.',
  },
  {
    question: 'Can FERPA-compliant institutions be agent-ready?',
    answer:
      'Yes. FERPA protects student records, not course catalogs. A university can expose course listings, tuition schedules, and admissions processes as structured APIs without touching any protected data. The enrollment endpoint would require authenticated access, but discovery and pricing endpoints can be public. Agent-ready does not mean unprotected — it means structured.',
  },
  {
    question: 'What would an agent do with a university MCP server?',
    answer:
      'An AI assistant could answer "find me a part-time evening data science program under $15K/year near Austin" by querying structured course catalogs, checking real-time seat availability, computing tuition, and starting enrollment — all without the student making a single phone call. Today, that requires visiting 8 websites and calling 3 admissions offices.',
  },
  {
    question: 'Is any university actively working on agent readiness?',
    answer:
      'Not that we have found in 500 scans. A few universities have launched experimental AI chatbots on their websites, but these are human-facing tools, not agent-facing infrastructure. Zero universities publish agent-card.json or llms.txt. The gap is structural — no one in higher education is thinking about AI agents as a distribution channel.',
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

export default function EducationAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Education Agent Readiness: Why Schools and Universities Are Missing the Agent Economy',
    description:
      'Education averages 29/100 on the Agent Readiness Score. LMS systems locked behind institutional auth, admissions still phone/email/PDF, zero structured course APIs. Here is what agent-ready education looks like.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/education-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'education agent readiness, university AI agents, LMS API, course catalog API, EdTech agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Education Agent Readiness',
          item: 'https://agenthermes.ai/blog/education-agent-readiness',
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
      title="Education Agent Readiness: Why Schools and Universities Are Missing the Agent Economy"
      shareUrl="https://agenthermes.ai/blog/education-agent-readiness"
      currentHref="/blog/education-agent-readiness"
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
            <span className="text-zinc-400">Education Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <GraduationCap className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Avg Score: 29/100
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Education Agent Readiness:{' '}
            <span className="text-emerald-400">Why Schools and Universities Are Missing the Agent Economy</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The education vertical averages <strong className="text-zinc-100">29/100</strong> on the Agent Readiness Score. LMS platforms have APIs — but they are locked behind institutional SSO. Course catalogs exist — but as PDFs. Admissions processes exist — but they terminate at &ldquo;call us.&rdquo; The entire $1.7 trillion US education market is invisible to AI agents.
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

      {/* ===== THE PARADOX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <School className="h-5 w-5 text-amber-500" />
            The Education Paradox: APIs Exist, But No Agent Can Reach Them
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Education is a paradox in agent readiness. The infrastructure technically exists. Canvas has a comprehensive REST API with over 400 endpoints. Blackboard has LTI and REST APIs. Moodle exposes web services with 150+ functions. If you just looked at the documentation, you would think education should score 60+.
            </p>
            <p>
              But there is a critical difference between having an API and being agent-ready. Every LMS API requires institutional authentication — an admin at the university must provision API tokens through their own SSO system. There is no public endpoint an AI agent can discover, no self-service credential flow, and no way for an agent to browse course offerings without being explicitly granted access by a human administrator.
            </p>
            <p>
              This is not a security feature protecting student data. This is an architecture decision that makes the entire education vertical invisible. Course titles, schedules, and prerequisite trees are not sensitive data — but they are locked behind the same auth wall as student grades.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$1.7T', label: 'US education market', icon: Building2 },
              { value: '29', label: 'avg agent readiness score', icon: BarChart3 },
              { value: '0', label: 'universities with agent cards', icon: Globe },
              { value: '4,000+', label: 'degree-granting institutions', icon: GraduationCap },
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

      {/* ===== SEGMENT SCORES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Score Breakdown by Education Segment
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Not all education institutions are equally invisible. EdTech SaaS companies score significantly higher than traditional institutions because they were built as software products, not brick-and-mortar institutions with bolted-on websites.
          </p>

          <div className="space-y-3 mb-8">
            {segmentScores.map((segment) => {
              const colors = getColorClasses(segment.color)
              return (
                <div
                  key={segment.segment}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-zinc-100">{segment.segment}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${colors.text}`}>{segment.score}/100</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium`}>
                        {segment.tier}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{segment.detail}</p>
                  {/* Score bar */}
                  <div className="mt-3 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${segment.color === 'emerald' ? 'bg-emerald-500' : segment.color === 'amber' ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${segment.score}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The gap is structural, not financial.</strong> Harvard has a $50 billion endowment. Community colleges operate on thin margins. Yet the scoring gap between them is only 23 points — because neither has invested in agent-facing infrastructure. The barrier is awareness and architecture, not budget. This mirrors the{' '}
              <Link href="/blog/enterprise-vs-startup-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                enterprise vs startup gap
              </Link>{' '}
              we see across every vertical.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOUR FAILURE PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Four Failure Patterns Keeping Education Dark
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Four patterns repeat across every institution we scanned. Each one kills a different part of the agent journey. Together, they make education one of the least agent-ready verticals in the economy.
          </p>

          <div className="space-y-4 mb-8">
            {failurePatterns.map((pattern) => (
              <div
                key={pattern.pattern}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                    <pattern.icon className="h-5 w-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">{pattern.pattern}</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{pattern.description}</p>
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <p className="text-xs text-zinc-500">
                    <span className="text-red-400 font-medium">Score impact:</span>{' '}
                    <span className="text-zinc-300">{pattern.impact}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EDTECH VS TRADITIONAL ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            EdTech SaaS: The Exception That Proves the Rule
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Coursera, Khan Academy, Udemy, and edX collectively score 45-55 — solidly Bronze and approaching Silver. They are not agent-ready yet, but they are architecturally capable of getting there because they were built as software products from day one.
            </p>
            <p>
              Coursera publishes a catalog API with structured course data. Khan Academy has a public API for content discovery. These platforms use OAuth for third-party access and return JSON responses with consistent schemas. They already pass the{' '}
              <Link href="/blog/onboarding-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                D3 Onboarding
              </Link>{' '}
              requirements that traditional institutions universally fail — self-service API key issuance without calling anyone.
            </p>
            <p>
              The irony is that EdTech platforms teach the same content as universities but deliver it through an architecture that AI agents can actually interact with. A student asking an AI agent &ldquo;find me a Python course that starts next week under $50&rdquo; will get routed to Coursera, not MIT — because Coursera has the structured data and MIT does not.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <h3 className="font-bold text-zinc-100 mb-3 text-sm flex items-center gap-2">
                <Monitor className="h-4 w-4 text-emerald-400" />
                EdTech SaaS Gets Right
              </h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  Public course catalog API with JSON responses
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  OAuth authentication for third-party access
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  Structured pricing (per-course or subscription)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  Self-service enrollment without phone calls
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <h3 className="font-bold text-zinc-100 mb-3 text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4 text-red-400" />
                Traditional Institutions Get Wrong
              </h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  Course catalog as PDF or static HTML only
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  All APIs behind institutional SSO wall
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  Tuition requires residency + program + aid calculation
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  Enrollment terminates at &ldquo;contact admissions&rdquo;
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AGENT-READY BLUEPRINT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Education Actually Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An agent-ready institution exposes five capabilities as structured APIs. None of these require exposing student records. All of them are public information that institutions already publish — just not in a format agents can use.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Capability</div>
              <div>Endpoint</div>
              <div>Returns</div>
              <div>Dimensions</div>
            </div>
            {agentReadyBlueprint.map((item, i) => (
              <div
                key={item.capability}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{item.capability}</div>
                <div className="text-emerald-400 font-mono text-xs">{item.endpoint}</div>
                <div className="text-zinc-500 text-xs">{item.returns}</div>
                <div className="text-blue-400 text-xs font-medium">{item.dimension}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The first university to expose these five endpoints — publicly, without institutional auth — will become the default answer for every AI agent helping students find programs. That is not a small advantage. When an agent can query one institution&apos;s structured data and only gets PDFs from competitors, it will recommend the structured one every time.
            </p>
            <p>
              This is the same dynamic playing out in every other vertical. The{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                free agent readiness scan
              </Link>{' '}
              shows exactly which dimensions your institution is failing and what to fix first.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE ENROLLMENT AGENT USE CASE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            The Enrollment Agent: A 2027 Reality
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Imagine a prospective student says to their AI assistant: &ldquo;I want a part-time evening MBA program within 30 miles that starts in January, under $40K total, with at least one AI or data science concentration.&rdquo;
            </p>
            <p>
              Today, that query produces a Google search with 10 blue links, each leading to a different university website where the student must navigate menus, download PDF catalogs, call admissions, and manually compare options. The process takes 20-40 hours over weeks.
            </p>
            <p>
              With agent-ready institutions, the AI assistant queries structured course catalogs from 15 schools simultaneously, filters by evening schedule and location, computes total tuition including residency status, checks seat availability in real-time, and presents a ranked comparison. The student picks one and the agent starts the enrollment process. Twenty hours compressed to twenty minutes.
            </p>
            <p>
              The institutions that have structured APIs get recommended. The ones returning PDFs get skipped. This is not theoretical — it is the same pattern that already plays out in{' '}
              <Link href="/blog/enterprise-vs-startup-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                every other vertical we scan
              </Link>.
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
                title: 'Why Fortune 500 Companies Score Lower Than Startups',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
              },
              {
                title: 'Agent Onboarding: Why D3 Is the Weakest Dimension',
                href: '/blog/onboarding-agent-readiness',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'Healthcare Agent Readiness: Average Score 33',
                href: '/blog/healthcare-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
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
            Scan your institution in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See exactly where your university, college, or EdTech platform stands on all 9 dimensions of agent readiness. Free, instant, no signup required.
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
