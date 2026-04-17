import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Globe,
  HelpCircle,
  Layers,
  Lock,
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
  title: 'HR and Recruiting Agent Readiness: Why ATS Platforms Lock Out AI Hiring Agents | AgentHermes',
  description:
    'ATS platforms like Greenhouse, Lever, and Workday have APIs but gate them behind enterprise contracts. AI recruiting agents cannot access candidate pipelines, schedule interviews, or extend offers without human middleware. Average HR agent readiness score: 22/100.',
  keywords: [
    'HR recruiting agent readiness ATS',
    'AI recruiting agent',
    'ATS API agent readiness',
    'Greenhouse API agent',
    'Lever API agent readiness',
    'Workday recruiting API',
    'AI hiring agent',
    'agent readiness HR',
    'recruiting automation AI agent',
  ],
  openGraph: {
    title: 'HR and Recruiting Agent Readiness: Why ATS Platforms Lock Out AI Hiring Agents',
    description:
      'ATS platforms have APIs but gate them behind enterprise contracts. AI hiring agents hit a wall. Average HR agent readiness: 22/100.',
    url: 'https://agenthermes.ai/blog/hr-recruiting-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HR and Recruiting Agent Readiness: Why ATS Platforms Lock Out AI Hiring Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HR and Recruiting Agent Readiness: Why ATS Platforms Lock Out AI Hiring Agents',
    description:
      'ATS APIs exist but are enterprise-gated. AI recruiting agents cannot access candidate pipelines. Average score: 22/100.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/hr-recruiting-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const atsScores = [
  { name: 'Greenhouse', score: 38, tier: 'Bronze', notes: 'REST API, webhooks, but partner-gated. No public sandbox.' },
  { name: 'Lever', score: 34, tier: 'Bronze', notes: 'REST API exists. OAuth required. No self-service key.' },
  { name: 'Workday', score: 18, tier: 'Not Scored', notes: 'SOAP/XML legacy. Enterprise NDA for API access.' },
  { name: 'BambooHR', score: 31, tier: 'Bronze', notes: 'REST API, good docs. Enterprise pricing only.' },
  { name: 'iCIMS', score: 15, tier: 'Not Scored', notes: 'Partner API program. No public documentation.' },
  { name: 'Indeed', score: 26, tier: 'Not Scored', notes: 'Job posting API exists. Candidate data locked.' },
  { name: 'LinkedIn Recruiter', score: 12, tier: 'Not Scored', notes: 'No public API. Data walled garden.' },
  { name: 'Ashby', score: 42, tier: 'Bronze', notes: 'Modern REST API, webhooks, better docs. Still gated.' },
]

const agentReadyCapabilities = [
  {
    name: 'Job Posting API',
    description: 'Structured endpoint to create, update, and close job postings with typed fields for title, description, requirements, salary range, location, and remote policy.',
    icon: Globe,
    color: 'emerald',
    current: 'Most ATS platforms expose this — but only to enterprise partners.',
  },
  {
    name: 'Candidate Pipeline Endpoint',
    description: 'Query candidates by stage (applied, screened, interviewed, offered, hired) with filters for skills, experience, and availability. The core of what recruiters do — and the hardest data to access.',
    icon: Users,
    color: 'blue',
    current: 'Completely locked. Even with API access, candidate PII requires separate DPA.',
  },
  {
    name: 'Interview Scheduling',
    description: 'Check interviewer availability, propose time slots, send calendar invites, handle reschedules. Currently requires 4-6 emails per interview.',
    icon: Calendar,
    color: 'purple',
    current: 'Calendly and cal.com have APIs. ATS platforms do not expose scheduling.',
  },
  {
    name: 'Offer Letter Generation',
    description: 'Generate offer letters with structured compensation (base, equity, bonus, benefits), expiration dates, and e-signature integration. Currently a manual process in every company.',
    icon: Briefcase,
    color: 'amber',
    current: 'Zero ATS platforms expose offer generation as an API endpoint.',
  },
]

const bottlenecks = [
  { problem: 'Enterprise API Gating', impact: 'Kills D3 Onboarding (0.08)', detail: 'Greenhouse requires a partner application. Lever requires enterprise plan. Workday requires an NDA. An AI agent cannot sign contracts, attend partner calls, or negotiate enterprise pricing. Self-service API keys are the minimum bar — and almost no ATS provides them.' },
  { problem: 'Candidate Data Ownership', impact: 'Kills D6 Data Quality (0.10)', detail: 'LinkedIn owns the candidate graph. Indeed owns the job seeker data. ATS platforms hold the pipeline data. No single API gives an agent a unified view of available candidates. The recruiter AI agent must call 3-5 separate APIs, each with different auth, rate limits, and data schemas.' },
  { problem: 'Phone-Screen Culture', impact: 'Kills D2 API Quality (0.15)', detail: 'The recruiting industry runs on phone calls. Initial screens, recruiter chats, hiring manager calls, reference checks — all verbal. None of this is structured data. An AI agent that wants to screen candidates hits a wall: there is no endpoint to submit screening results.' },
  { problem: 'Compliance and Privacy', impact: 'Kills D7 Security (0.12)', detail: 'EEOC, GDPR, CCPA, and local labor laws create legitimate restrictions on automated candidate processing. But the compliance burden falls entirely on the API consumer (the agent) with zero tooling from the ATS to help. No audit trail API, no consent management endpoint, no bias detection webhook.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Can AI agents already apply to jobs on behalf of candidates?',
    answer:
      'Technically yes, but poorly. AI agents can fill web forms on job boards, but without structured APIs they are guessing at field mappings, breaking on CAPTCHAs, and missing required uploads. An agent-ready job board would expose a structured apply() endpoint with typed fields for resume, cover letter, and custom questions — eliminating the need to scrape and guess.',
  },
  {
    question: 'Why do ATS platforms gate their APIs behind enterprise contracts?',
    answer:
      'Two reasons: revenue protection and liability. ATS vendors charge per-seat, and API access could let customers bypass the UI entirely. On the liability side, candidate data is PII under multiple regulations (GDPR, CCPA, EEOC), and vendors want contractual protections before exposing it. Neither reason is invalid, but both create the same outcome: AI agents cannot get in.',
  },
  {
    question: 'What would an agent-ready recruiting platform look like?',
    answer:
      'Self-service API keys with a free tier. Structured endpoints for job posting, candidate search (with consent), interview scheduling, and offer generation. Webhook events for stage changes. A sandbox environment with synthetic candidate data. An agent-card.json declaring capabilities. And critically: built-in compliance tooling so the AI agent can prove it is making unbiased decisions.',
  },
  {
    question: 'How does AgentHermes score HR and recruiting platforms?',
    answer:
      'The same 9 dimensions as every other vertical, with vertical-specific weight adjustments. HR platforms get higher weight on D7 Security (compliance matters more) and D3 Onboarding (self-service access is the primary bottleneck). The average HR vertical score is 22/100 — below healthcare (33) and above construction (8). The bottleneck is not technology, it is business model.',
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
  if (tier === 'Gold') return 'text-amber-400'
  if (tier === 'Silver') return 'text-zinc-300'
  if (tier === 'Bronze') return 'text-orange-400'
  return 'text-zinc-500'
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HrRecruitingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'HR and Recruiting Agent Readiness: Why ATS Platforms Lock Out AI Hiring Agents',
    description:
      'ATS platforms like Greenhouse, Lever, and Workday have APIs but gate them behind enterprise contracts. AI recruiting agents cannot access candidate pipelines. Average HR agent readiness: 22/100.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/hr-recruiting-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'HR recruiting agent readiness ATS, AI recruiting agent, ATS API, Greenhouse API, Lever API, Workday, AI hiring',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'HR and Recruiting Agent Readiness',
          item: 'https://agenthermes.ai/blog/hr-recruiting-agent-readiness',
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
      title="HR and Recruiting Agent Readiness: Why ATS Platforms Lock Out AI Hiring Agents"
      shareUrl="https://agenthermes.ai/blog/hr-recruiting-agent-readiness"
      currentHref="/blog/hr-recruiting-agent-readiness"
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
            <span className="text-zinc-400">HR and Recruiting Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Briefcase className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              HR &amp; Recruiting
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            HR and Recruiting Agent Readiness:{' '}
            <span className="text-emerald-400">Why ATS Platforms Lock Out AI Hiring Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            ATS platforms like Greenhouse, Lever, and Workday have APIs — but they gate them behind enterprise contracts, partner applications, and NDAs. The result: AI recruiting agents cannot access candidate pipelines, schedule interviews, or extend offers without human middleware. The average HR agent readiness score is <strong className="text-zinc-100">22 out of 100</strong>.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            The ATS API Lock-In Problem
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The recruiting industry is a $200 billion market built on phone calls, emails, and human judgment. Applicant Tracking Systems (ATS) digitized the paperwork but left the workflows manual. Now AI agents want to automate those workflows — sourcing candidates, screening resumes, scheduling interviews, managing pipelines — and they are hitting a wall.
            </p>
            <p>
              The wall is not technical. Greenhouse has a{' '}
              <strong className="text-zinc-100">well-documented REST API</strong> with webhooks, OAuth, and structured endpoints for candidates, jobs, and scorecards. Lever has a similar API with pagination and filtering. The technology exists. The problem is{' '}
              <strong className="text-zinc-100">access</strong>.
            </p>
            <p>
              Every major ATS gates API access behind enterprise contracts. Greenhouse requires a formal partner application. Workday requires a signed NDA and an enterprise license. LinkedIn Recruiter has no public API at all. An AI agent cannot sign contracts, attend partnership calls, or negotiate enterprise pricing. It needs a self-service API key — and almost no HR platform provides one.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '$200B', label: 'recruiting market', icon: TrendingUp },
              { value: '22', label: 'avg agent readiness score', icon: BarChart3 },
              { value: '0', label: 'ATS with self-service API keys', icon: Lock },
              { value: '4-6', label: 'emails per interview scheduled', icon: Calendar },
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

      {/* ===== ATS SCORECARD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            ATS Platform Scorecard
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We estimated agent readiness scores for the 8 most-used recruiting platforms based on our 9-dimension framework. Not a single one reaches Silver (60+).
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Platform</div>
              <div className="text-center">Score</div>
              <div className="text-center">Tier</div>
              <div>Key Limitation</div>
            </div>
            {atsScores.map((row, i) => (
              <div
                key={row.name}
                className={`grid grid-cols-4 p-4 text-sm items-center ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.name}</div>
                <div className="text-center text-emerald-400 font-bold">{row.score}</div>
                <div className={`text-center font-medium ${getTierColor(row.tier)}`}>{row.tier}</div>
                <div className="text-zinc-500 text-xs">{row.notes}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The Ashby exception:</strong> Ashby, a newer ATS, scores highest at 42 because it was built API-first with modern REST conventions and better documentation. But even Ashby gates full access behind a paid plan. The pattern is clear: newer platforms trend higher, but none have cracked self-service agent access.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOUR BOTTLENECKS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            The Four Bottlenecks Keeping HR at 22/100
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Each bottleneck maps to a specific dimension of the Agent Readiness Score and explains why the entire vertical underperforms.
          </p>

          <div className="space-y-4 mb-8">
            {bottlenecks.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-zinc-100">{item.problem}</h3>
                  <span className="text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-full">{item.impact}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY HR LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Recruiting Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An agent-ready ATS or recruiting platform exposes four structured capabilities that AI agents can discover and use without human intermediaries.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyCapabilities.map((cap) => {
              const colors = getColorClasses(cap.color)
              return (
                <div
                  key={cap.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <cap.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{cap.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{cap.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Current state:</span>{' '}
                      <span className="text-red-400">{cap.current}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The recruiting platform that builds these four endpoints with self-service API keys, a sandbox with synthetic candidate data, and an{' '}
              <Link href="/blog/agent-card-json-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                agent-card.json
              </Link>{' '}
              declaring its capabilities will capture the entire AI-recruiting wave. Every AI personal assistant that helps someone find a job, every corporate AI that screens candidates, every staffing agency agent that fills roles — they will all route to the platform that lets them in without a phone call.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE ENTERPRISE VS STARTUP GAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-500" />
            Enterprise vs Startup: The Access Gap
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              There is a painful irony in HR agent readiness. Enterprise companies — the ones with 10,000+ employees and dedicated recruiting teams — have full API access to Greenhouse, Lever, and Workday because they pay for enterprise plans. They could deploy AI recruiting agents tomorrow.
            </p>
            <p>
              But the companies that{' '}
              <strong className="text-zinc-100">need</strong> AI recruiting agents most — startups and SMBs with 5-50 employees, no dedicated recruiter, and a founder doing hiring in their spare time — are locked out. They cannot afford enterprise ATS plans, so they cannot access APIs, so they cannot use AI agents. The technology gap mirrors the{' '}
              <Link href="/blog/enterprise-vs-startup-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                enterprise vs startup pattern
              </Link>{' '}
              we see across every vertical.
            </p>
            <p>
              The fix is the same one that worked for every other vertical: a platform layer that abstracts the complexity.{' '}
              <Link href="/blog/onboarding-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Self-service onboarding
              </Link>{' '}
              is the single highest-impact improvement for the HR vertical. Give agents a key, give them a sandbox, and let them prove value before requiring an enterprise contract.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <h3 className="font-bold text-zinc-100 mb-2 text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-400" />
                Enterprise (10,000+ employees)
              </h3>
              <ul className="text-sm text-zinc-500 space-y-1.5">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" /> Full API access via enterprise plan</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" /> Dedicated integration support</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" /> Custom webhook configurations</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" /> SSO and SCIM provisioning</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <h3 className="font-bold text-zinc-100 mb-2 text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-400" />
                SMB / Startup (5-50 employees)
              </h3>
              <ul className="text-sm text-zinc-500 space-y-1.5">
                <li className="flex items-start gap-2"><Lock className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" /> No API access on basic plans</li>
                <li className="flex items-start gap-2"><Lock className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" /> Self-service docs only, no sandbox</li>
                <li className="flex items-start gap-2"><Lock className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" /> Manual CSV exports for data</li>
                <li className="flex items-start gap-2"><Lock className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" /> Phone and email for everything</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE OPPORTUNITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-500" />
            The Disintermediation Opportunity
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Job boards charge employers $300-$500 per posting. Recruiting agencies charge 15-25% of first-year salary. LinkedIn Recruiter costs $10,000+ per year per seat. The middlemen in recruiting are expensive — and they exist because matching candidates to jobs is hard without structured data.
            </p>
            <p>
              AI agents change that equation. An agent with access to structured job requirements and candidate profiles can match in milliseconds what takes a recruiter days. But only if the data is accessible. The first ATS that opens its pipeline data to agents — with proper consent and compliance tooling — captures an entirely new distribution channel. Every AI career coach, every AI personal assistant, every AI staffing agent routes candidates to the platform that lets them in.
            </p>
            <p>
              This is the same pattern we documented in{' '}
              <Link href="/blog/food-delivery-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                food delivery
              </Link>{' '}
              and{' '}
              <Link href="/blog/real-estate-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                real estate
              </Link>: the platform with the most agent-accessible data wins. In recruiting, that platform does not exist yet.
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
                title: 'Enterprise vs Startup Agent Readiness: The Two-Speed Economy',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
              },
              {
                title: 'Onboarding Agent Readiness: Why First-Time Access Is Everything',
                href: '/blog/onboarding-agent-readiness',
                tag: 'Deep Dive',
                tagColor: 'purple',
              },
              {
                title: 'Check Your Score',
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
            Is your HR platform agent-ready?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan on any ATS, job board, or recruiting platform. See your score across all 9 dimensions in 60 seconds.
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
