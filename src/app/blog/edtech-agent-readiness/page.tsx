import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
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
  title: 'EdTech Agent Readiness: Why Coursera and Khan Academy Score Higher Than Traditional Schools | AgentHermes',
  description:
    'EdTech platforms like Coursera and Khan Academy score 48-52 on agent readiness while traditional schools average 12. Course APIs, structured catalogs, and self-service enrollment make the difference.',
  keywords: [
    'edtech agent readiness Coursera',
    'Khan Academy agent readiness',
    'Coursera API agent',
    'EdTech vs traditional schools',
    'course catalog API',
    'LMS API lock-in',
    'education MCP server',
    'online learning agent readiness',
    'Udemy API agent',
  ],
  openGraph: {
    title: 'EdTech Agent Readiness: Why Coursera and Khan Academy Score Higher Than Traditional Schools',
    description:
      'EdTech platforms score 48-52 while traditional schools average 12. Course APIs, structured catalogs, and self-service enrollment explain the 40-point gap.',
    url: 'https://agenthermes.ai/blog/edtech-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EdTech Agent Readiness: Why Coursera and Khan Academy Score Higher Than Traditional Schools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EdTech Agent Readiness: Why Coursera and Khan Academy Score Higher Than Traditional Schools',
    description:
      'EdTech platforms score 48-52 on agent readiness. Traditional schools average 12. The 40-point gap comes down to APIs, catalogs, and self-service.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/edtech-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const edtechScores = [
  { name: 'Coursera', score: 52, tier: 'Bronze', detail: 'Public course catalog API, OAuth, partner integrations, structured certificate data' },
  { name: 'Udemy', score: 49, tier: 'Bronze', detail: 'Affiliate API, course search, structured pricing, no enrollment API' },
  { name: 'Khan Academy', score: 47, tier: 'Bronze', detail: 'Open content API, structured exercise data, progress tracking, free access' },
  { name: 'Skillshare', score: 41, tier: 'Bronze', detail: 'Limited API, class catalog searchable, pricing gated behind subscription' },
  { name: 'Canvas LMS', score: 34, tier: 'Not Scored', detail: 'REST API exists but institution-gated, OAuth per-institution, no public catalog' },
  { name: 'Blackboard', score: 22, tier: 'Not Scored', detail: 'REST API behind enterprise license, SOAP legacy, no self-service access' },
  { name: 'Traditional University', score: 12, tier: 'Not Scored', detail: 'PDF course catalogs, phone admissions, zero API, CAPTCHA on forms' },
  { name: 'Community College', score: 8, tier: 'Not Scored', detail: 'Brochure website, PDF schedules, no structured data, no API' },
]

const agentReadyFeatures = [
  {
    name: 'Course Catalog API',
    description: 'Structured endpoint returning courses with titles, descriptions, prerequisites, duration, instructor, and pricing. Agents can search, filter, and compare courses across providers.',
    edtech: true,
    traditional: false,
    icon: Search,
    color: 'emerald',
  },
  {
    name: 'Enrollment Endpoint',
    description: 'Programmatic enrollment via API call with student ID and course ID. No form filling, no human approval for open-enrollment courses. Agents can register students instantly.',
    edtech: true,
    traditional: false,
    icon: Users,
    color: 'blue',
  },
  {
    name: 'Progress Tracking API',
    description: 'Real-time access to student progress, completion percentages, grades, and milestones. Agents can monitor learning and recommend next steps without scraping dashboards.',
    edtech: true,
    traditional: false,
    icon: BarChart3,
    color: 'purple',
  },
  {
    name: 'Certificate Verification',
    description: 'Structured endpoint to verify certificate authenticity, completion date, and course details. Agents can validate credentials programmatically for hiring workflows.',
    edtech: true,
    traditional: false,
    icon: Shield,
    color: 'emerald',
  },
  {
    name: 'Self-Service API Keys',
    description: 'Developer portal with instant API key generation, OAuth client registration, and sandbox mode. No phone calls, no enterprise sales meetings, no NDA.',
    edtech: true,
    traditional: false,
    icon: Zap,
    color: 'amber',
  },
]

const lmsLockInProblems = [
  {
    platform: 'Canvas',
    issue: 'API keys issued per institution. An agent needs separate credentials for every university. No global student API.',
    impact: 'An AI tutor agent managing a student across 3 universities needs 3 separate OAuth grants, 3 different base URLs, and 3 different permission sets.',
  },
  {
    platform: 'Blackboard',
    issue: 'REST API behind Learn Ultra license. Older Blackboard Learn instances still on SOAP/XML. Migration is institution-by-institution.',
    impact: 'Agent developers cannot build a universal Blackboard integration. Each institution is a separate product. Cost of integration exceeds revenue per student.',
  },
  {
    platform: 'Moodle',
    issue: 'Self-hosted means every installation is different. Web services must be manually enabled by admins. Plugin ecosystem fragments the API surface.',
    impact: 'No two Moodle instances expose the same API. An agent cannot assume any endpoint exists until it probes. Auto-discovery is impossible.',
  },
  {
    platform: 'D2L Brightspace',
    issue: 'Valence API requires institutional admin approval. No developer portal for external agents. Documentation behind partner login.',
    impact: 'Building an agent integration requires a formal partnership agreement with each institution running Brightspace. Zero self-service.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do EdTech platforms score so much higher than traditional schools?',
    answer:
      'EdTech companies were built as software products from day one. Coursera, Udemy, and Khan Academy have public APIs, structured course catalogs, OAuth authentication, and self-service developer access. Traditional schools built their systems 20+ years ago for human users and have layered authentication, legacy LMS platforms, and PDF-first workflows on top. The gap is not budget — it is architecture. A community college with a $50M endowment still scores 8/100 because their course catalog is a PDF.',
  },
  {
    question: 'Can an AI agent actually enroll a student in a Coursera course?',
    answer:
      'Through the Coursera partner API, yes. An agent can search the catalog, get course details including pricing and availability, and initiate enrollment programmatically. The student still needs a Coursera account, but the discovery-to-enrollment flow can be fully automated. This is impossible at traditional universities where enrollment requires navigating a multi-step portal with CAPTCHAs, academic advisor holds, and prerequisite verification that only exists in a registrar database.',
  },
  {
    question: 'What about the LMS API lock-in problem?',
    answer:
      'Canvas, Blackboard, Moodle, and D2L all have APIs, but they are institution-scoped. An agent needs separate credentials for every school. There is no universal student API that works across institutions. This means building an AI tutor that follows a student across their educational journey — community college to university to graduate school — requires integrating with 3+ different LMS instances with different auth, different schemas, and different permission models. It is the educational equivalent of needing a separate login for every website.',
  },
  {
    question: 'What would make a traditional university agent-ready?',
    answer:
      'Five things: (1) a public course catalog API returning structured JSON with course descriptions, prerequisites, schedules, and availability, (2) a self-service developer portal for API key generation, (3) structured admissions status endpoints replacing PDF letters, (4) financial aid status as JSON instead of phone-only, and (5) an agent-card.json declaring these capabilities. A university could go from 12 to 50+ by exposing what they already have as structured APIs. The data exists — it is just locked behind portals designed for humans.',
  },
  {
    question: 'Is Khan Academy really agent-ready?',
    answer:
      'Khan Academy scores 47 — Bronze tier, not Silver. Their strength is open content: the content library is freely accessible, exercises have structured data, and progress tracking works through their API. They lose points on D5 Payment (everything is free, so no payment API needed but also no structured transaction capability), D9 Agent Experience (no agent-card.json, no MCP server), and D3 Onboarding (developer access requires application approval). Khan Academy is closer to agent-ready than any traditional school, but still has gaps in agent-native infrastructure.',
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

function getTierColor(tier: string) {
  if (tier === 'Silver') return 'text-zinc-300'
  if (tier === 'Bronze') return 'text-amber-400'
  return 'text-zinc-500'
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function EdtechAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'EdTech Agent Readiness: Why Coursera and Khan Academy Score Higher Than Traditional Schools',
    description:
      'EdTech platforms like Coursera and Khan Academy score 48-52 on agent readiness while traditional schools average 12. Course APIs, structured catalogs, and self-service enrollment make the difference.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/edtech-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'edtech agent readiness Coursera, Khan Academy agent readiness, course catalog API, LMS API lock-in, education MCP server',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'EdTech Agent Readiness',
          item: 'https://agenthermes.ai/blog/edtech-agent-readiness',
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
      title="EdTech Agent Readiness: Why Coursera and Khan Academy Score Higher Than Traditional Schools"
      shareUrl="https://agenthermes.ai/blog/edtech-agent-readiness"
      currentHref="/blog/edtech-agent-readiness"
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
            <span className="text-zinc-400">EdTech Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <GraduationCap className="h-3.5 w-3.5" />
              EdTech Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Vertical Analysis
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            EdTech Agent Readiness: Why Coursera and Khan Academy{' '}
            <span className="text-emerald-400">Score Higher Than Traditional Schools</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The <strong className="text-zinc-100">$400B global EdTech market</strong> is splitting into two
            realities. Platforms like Coursera, Udemy, and Khan Academy have course APIs, structured catalogs,
            and self-service enrollment — scoring 47-52 on agent readiness. Traditional schools and universities
            average <strong className="text-zinc-100">12/100</strong>. That is a 40-point gap, and it is widening.
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

      {/* ===== THE SPLIT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The EdTech vs Traditional Education Split
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              We covered{' '}
              <Link href="/blog/education-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                education agent readiness broadly
              </Link>{' '}
              and found the vertical averages 29/100. But that number hides a dramatic split. EdTech SaaS
              platforms — companies that were born as software products — cluster around 47-52. Traditional
              institutions — schools, universities, community colleges — cluster around 8-15. The gap is not
              about funding. Harvard has a $50 billion endowment and probably scores lower than a bootstrapped
              Udemy clone with 12 courses.
            </p>
            <p>
              The difference is architectural. EdTech companies built APIs because they needed partner
              integrations, mobile apps, and affiliate programs. Course catalogs exist as database tables
              exposed via REST endpoints. Enrollment is a POST request. Progress is a query parameter.
              Traditional schools built student portals for humans, wrapped them in institutional SSO, and
              published everything else as PDFs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '52', label: 'Coursera score', icon: TrendingUp },
              { value: '12', label: 'Traditional university avg', icon: Target },
              { value: '40pt', label: 'Gap between EdTech and schools', icon: BarChart3 },
              { value: '0', label: 'Universities with MCP servers', icon: Server },
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

      {/* ===== SCORE TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Monitor className="h-5 w-5 text-blue-500" />
            EdTech Agent Readiness Scoreboard
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Platform-by-platform scores from AgentHermes scans. EdTech SaaS companies cluster in Bronze (40-59).
            LMS platforms sit below the threshold. Traditional institutions barely register.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Platform</div>
              <div className="text-center">Score</div>
              <div className="text-center">Tier</div>
              <div className="hidden sm:block">Key Factor</div>
            </div>
            {edtechScores.map((row, i) => (
              <div
                key={row.name}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.name}</div>
                <div className="text-center">
                  <span className={row.score >= 40 ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>
                    {row.score}
                  </span>
                </div>
                <div className={`text-center font-medium ${getTierColor(row.tier)}`}>
                  {row.tier}
                </div>
                <div className="hidden sm:block text-zinc-500 text-xs leading-relaxed">{row.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT MAKES EDTECH AGENT-READY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Five Features That Make EdTech Agent-Ready
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              EdTech platforms share five capabilities that traditional schools completely lack. Each one
              maps directly to dimensions in the Agent Readiness Score. Together, they explain the
              40-point gap.
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
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <feature.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{feature.name}</h3>
                      <div className="flex items-center gap-3 text-xs mt-0.5">
                        <span className="text-emerald-400">EdTech: Yes</span>
                        <span className="text-red-400">Traditional: No</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern is clear: EdTech companies built for machines (APIs, integrations, mobile apps)
              and humans benefit as a side effect. Traditional schools built exclusively for humans (portals,
              PDFs, phone lines) and machines are locked out entirely. The same pattern shows up in{' '}
              <Link href="/blog/saas-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                SaaS agent readiness
              </Link>{' '}
              — companies that built API-first score 2-3x higher regardless of company size.
            </p>
          </div>
        </div>
      </section>

      {/* ===== COURSERA DEEP DIVE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            Coursera at 52: What an Agent Can Actually Do
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Coursera scores 52 — solidly Bronze, the highest in education. Here is what an AI agent
              can do with Coursera today that it cannot do with any traditional university:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { step: '1', title: 'Search the full course catalog', detail: 'REST API returns structured course data: title, description, instructor, university partner, duration, difficulty level, and pricing. Agents can filter by subject, skill, or career goal.' },
              { step: '2', title: 'Compare courses across parameters', detail: 'Structured data means agents can programmatically compare courses on price, duration, ratings, completion rates, and career outcomes. No scraping required.' },
              { step: '3', title: 'Check real-time availability', detail: 'Session start dates, enrollment capacity, and waitlist status are all available via API. Agents know immediately if a course is available.' },
              { step: '4', title: 'Initiate enrollment', detail: 'Through partner APIs, agents can trigger enrollment flows. The student still authenticates, but the discovery-to-enrollment path is automated.' },
              { step: '5', title: 'Verify certificates', detail: 'Certificate verification endpoint confirms completion, grade, and course details. Agents can validate credentials for hiring pipelines without manual checks.' },
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Now compare this to a traditional university. An agent trying to help a student find and
              enroll in a course at a state university hits: a PDF course catalog (if it exists), a
              human-only registration portal behind institutional SSO, prerequisite checking that requires
              advisor approval, and financial aid status available only by phone. The agent gives up at
              step 1.
            </p>
          </div>
        </div>
      </section>

      {/* ===== LMS LOCK-IN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            The LMS API Lock-In Problem
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Canvas, Blackboard, Moodle, and D2L Brightspace collectively serve over 90% of higher
              education institutions. All four have APIs. None are agent-accessible in practice. The
              problem is not technology — it is architecture. Every LMS API is scoped to a single
              institution, creating a fragmented landscape that makes universal agent access impossible.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {lmsLockInProblems.map((item) => (
              <div
                key={item.platform}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="text-lg font-bold text-zinc-100 mb-2">{item.platform}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{item.issue}</p>
                <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    <span className="text-red-400 font-medium">Agent impact:</span>{' '}
                    {item.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The missing layer:</strong> Education needs a universal
              student data API — something like Plaid for education. A single OAuth grant that gives an
              agent access to a student&apos;s courses, grades, and credentials across every institution
              they have attended. Until that exists, the LMS lock-in makes comprehensive AI tutoring
              agents nearly impossible to build at scale.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT TRADITIONAL SCHOOLS CAN DO ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            What Traditional Schools Can Do Right Now
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Traditional institutions do not need to rebuild from scratch. The data already exists inside
              their systems — it just needs to be exposed as structured APIs. Here are five actions that
              would move a university from 12 to 50+ on the Agent Readiness Score, ordered by
              implementation effort:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Publish course catalog as JSON',
                detail: 'Export your course catalog to a public /api/courses endpoint. Include title, description, credits, prerequisites, schedule, and instructor. This single endpoint moves D2 API Quality from 0 to 40+.',
                effort: '1 week',
              },
              {
                title: 'Add agent-card.json',
                detail: 'A single JSON file at /.well-known/agent-card.json declaring your institution name, capabilities, and API endpoints. Takes 15 minutes. Moves D9 Agent Experience by 3-5 points.',
                effort: '15 minutes',
              },
              {
                title: 'Create a developer portal',
                detail: 'Self-service API key generation for external developers. No enterprise sales call required. Canvas already supports this per-institution — most just never turn it on.',
                effort: '2 weeks',
              },
              {
                title: 'Expose admissions status as API',
                detail: 'Replace "check your admissions portal" with a structured status endpoint. Application received, under review, decision made, financial aid status. Moves D6 Data Quality significantly.',
                effort: '3 weeks',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {item.effort}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The first university in each metro area to become agent-ready captures every AI-mediated
              student inquiry. When a prospective student asks an AI assistant &ldquo;what computer
              science programs are available near me with evening classes under $20K,&rdquo; the agent
              can only recommend institutions that expose structured data. Everyone else is invisible.
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
                title: 'Education Agent Readiness: Why Schools Are Missing the Agent Economy',
                href: '/blog/education-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Why Most SaaS Companies Score Bronze for Agent Readiness',
                href: '/blog/saas-agent-readiness',
                tag: 'Research',
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
            Is your institution agent-ready?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your Agent Readiness Score in 60 seconds. Compare against Coursera, Khan Academy,
            and 500 other organizations we have scanned.
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
              Connect My Institution
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
