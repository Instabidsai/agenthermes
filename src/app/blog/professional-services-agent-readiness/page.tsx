import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Calculator,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  FileText,
  HelpCircle,
  Layers,
  Mail,
  Phone,
  Scale,
  Search,
  Server,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Professional Services Agent Readiness: Why Law Firms, Accountants, and Consultants Score Under 20 | AgentHermes',
  description:
    'Professional services charge $300-500 per hour but their websites cannot tell an AI agent what they offer, when they are available, or how much they cost. Law firms, accountants, and consultants are the lowest-scoring segment of 500 businesses scanned. Here is the fix.',
  keywords: [
    'professional services agent readiness',
    'law firm AI agents',
    'accountant agent readiness',
    'consulting firm MCP',
    'service catalog API',
    'published hourly rates',
    'online scheduling API',
    'agent-ready professional services',
    'legal AI infrastructure',
  ],
  openGraph: {
    title: 'Professional Services Agent Readiness: Why Law Firms, Accountants, and Consultants Score Under 20',
    description:
      'Charge $500/hr. Zero pricing on site. Phone-only scheduling. "Contact us" everywhere. Professional services are the lowest-scoring segment in the 500-business scan.',
    url: 'https://agenthermes.ai/blog/professional-services-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Professional Services Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Services Agent Readiness',
    description:
      'Law firms, accountants, and consultants charge $300-500/hr but cannot tell an AI agent what they offer. Lowest-scoring segment in our 500-business scan.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/professional-services-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const failurePatterns = [
  {
    name: '"Contact Us" as the Only Interface',
    description: 'The dominant pattern across law firms, accounting practices, and boutique consultancies: every service page ends in a "Contact Us" form. No structured services catalog, no availability data, no pricing — just a form that routes to a human. Agents cannot progress past this point without escalating to a call.',
    impact: 'D3 Onboarding scores in the single digits. An AI agent on a user\'s behalf literally cannot complete an engagement without a human-to-human phone call, which defeats the purpose of agent delegation.',
    icon: Phone,
    color: 'red',
  },
  {
    name: 'No Published Pricing',
    description: 'Professional services treat pricing as a negotiation rather than a catalog. Hourly rates, engagement minimums, and package prices are almost never published. "Please reach out for a quote" is the industry default. The information does exist — firms quote every prospect — but it is hidden from the agent layer.',
    impact: 'D4 Pricing Transparency scores below 20. This is the single cheapest dimension to fix (5% weight, one JSON file) and almost no professional services firm has done it.',
    icon: DollarSign,
    color: 'amber',
  },
  {
    name: 'Zero API Surface',
    description: 'Professional services firms have no APIs. No services endpoint. No availability endpoint. No booking endpoint. The website is a brochure built in WordPress or Squarespace, optimized for SEO and human conversion, with no machine-readable layer underneath.',
    impact: 'D2 API Surface (15% weight) scores 0-10. This is the dimension that separates agent-accessible businesses from invisible ones — and professional services are nearly all invisible.',
    icon: XCircle,
    color: 'red',
  },
  {
    name: 'Phone-Only or Human-Only Scheduling',
    description: 'A few firms integrate Calendly for initial consultations, but most require email or phone to schedule even discovery calls. No structured check_availability. No book_consultation. An agent cannot confirm a meeting without a human reply.',
    impact: 'D3 Onboarding and D9 Agent Experience (combined 18% weight) both collapse. The practical effect: agents route users to competitor firms that have online scheduling.',
    icon: Calendar,
    color: 'red',
  },
  {
    name: 'PDFs Instead of Structured Content',
    description: 'Service descriptions, engagement letters, fee schedules, and case studies are linked as PDFs. Agents cannot parse a designed PDF reliably. The firm\'s entire expertise is invisible to the agent layer.',
    impact: 'D6 Data Quality (10% weight) drops to near zero. Agents cannot surface the firm in research queries, refer cases, or compare expertise across firms.',
    icon: FileText,
    color: 'amber',
  },
]

const agentReadyTools = [
  {
    name: 'list_services',
    description: 'Structured service catalog: practice areas, service names, typical deliverables, and engagement minimums. This is the foundation — without it, agents cannot describe what the firm actually does.',
    icon: Layers,
    color: 'emerald',
  },
  {
    name: 'get_rates',
    description: 'Hourly rates per role (partner, senior associate, associate), flat-fee package pricing, and typical engagement size ranges. Publishing this is a competitive weapon, not a risk — it qualifies prospects before they enter the pipeline.',
    icon: DollarSign,
    color: 'blue',
  },
  {
    name: 'check_availability',
    description: 'Open consultation slots per attorney, accountant, or consultant. An agent can compare availability across three firms and book the one that fits the user\'s calendar — a decision the firm previously had to win through phone chess.',
    icon: Calendar,
    color: 'purple',
  },
  {
    name: 'book_consultation',
    description: 'Structured consultation booking with client name, matter type, and preferred communication channel. Agent gets back a confirmation code and meeting URL. No email ping-pong.',
    icon: CheckCircle2,
    color: 'cyan',
  },
  {
    name: 'check_conflict',
    description: 'Law-firm specific: agent can submit opposing parties and get back a structured conflict-check response. Critical for the 60% of inbound matters that require this step before engagement.',
    icon: Search,
    color: 'amber',
  },
]

const fixSteps = [
  {
    step: '1',
    title: 'Publish a services catalog with JSON-LD',
    detail: 'Add schema.org Service markup for each practice area. Include serviceType, provider, areaServed, and offers with priceRange. Instant lift in D6 Data Quality and D1 Discovery — usually 15-25 points combined.',
    icon: Code2,
  },
  {
    step: '2',
    title: 'Publish hourly rates and engagement minimums',
    detail: 'The industry taboo around published pricing is a legacy pattern. Firms that publish rates get better-qualified leads, shorter sales cycles, and agent discoverability. A /pricing page with partner, senior, and associate rates unlocks D4.',
    icon: DollarSign,
  },
  {
    step: '3',
    title: 'Add an online scheduling endpoint',
    detail: 'Even Calendly exposes a public availability endpoint agents can consume. The upgrade is exposing it with a stable URL, a consistent schema, and a get_availability tool name agents can rely on.',
    icon: Calendar,
  },
  {
    step: '4',
    title: 'Expose a services API',
    detail: 'GET /api/services returns the structured catalog. GET /api/attorneys returns partners and associates with practice areas, bar admissions, and availability. POST /api/consultation creates a booking. That is the minimum viable agent-ready professional services API.',
    icon: Server,
  },
  {
    step: '5',
    title: 'Ship an MCP server through AgentHermes',
    detail: 'The AgentHermes professional services vertical template exposes list_services, get_rates, check_availability, book_consultation, and check_conflict tools. MCP endpoint goes live at agenthermes.ai/api/mcp/hosted/your-firm with no code required.',
    icon: Briefcase,
  },
]

const firmTypeScores = [
  { type: 'Boutique Law Firm (1-5 attorneys)', typical: '12-22', agentReady: '72+', keyFix: 'Publish rates + Calendly integration' },
  { type: 'Mid-Size Law Firm (10-50 attorneys)', typical: '18-32', agentReady: '78+', keyFix: 'Services API + conflict check endpoint' },
  { type: 'Big Law (100+ attorneys)', typical: '28-42', agentReady: '82+', keyFix: 'Full MCP server + NDAs as structured data' },
  { type: 'CPA / Accounting Firm', typical: '14-26', agentReady: '75+', keyFix: 'Service packages + tax-deadline availability' },
  { type: 'Management Consulting', typical: '20-38', agentReady: '80+', keyFix: 'Engagement catalog + published day rates' },
  { type: 'Financial Advisors (RIA)', typical: '22-34', agentReady: '78+', keyFix: 'Fee schedule + discovery call booking' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do law firms, accountants, and consultants score so low on Agent Readiness?',
    answer:
      'The entire category optimizes for human trust over machine accessibility. Professional services have historically been sold through relationships, referrals, and discovery calls — not through transparent catalogs and structured data. That model was fine when humans were the only buyers. It is broken now that AI agents are shortlisting firms on behalf of users, because every "contact us" form and hidden rate card excludes the firm from the comparison.',
  },
  {
    question: 'Does publishing rates actually hurt a professional services firm?',
    answer:
      'The assumption that secrecy protects pricing power is a legacy pattern from before online reviews and salary transparency. Firms that publish rates report better-qualified leads, faster sales cycles, and fewer free discovery calls with prospects who were never going to engage. In the agent economy, the trade-off tilts further toward transparency: an agent comparing three firms will default to the one that has a structured answer to "what does this cost?" and skip the two that say "contact us for a quote."',
  },
  {
    question: 'What about conflict-of-interest checks for law firms?',
    answer:
      'A conflict check is exactly the kind of task that an agent-exposed endpoint handles well. The AgentHermes law firm template includes a check_conflict tool: the agent submits opposing parties, the firm\'s system returns cleared / conflicted / manual-review as a structured response. No confidential data has to be exposed — the response is binary or trinary. This actually improves the workflow by moving conflict checks from email to a structured call that logs automatically.',
  },
  {
    question: 'Can a solo practitioner compete with a big firm on agent readiness?',
    answer:
      'Yes, and this is the most interesting dynamic in the category. Big law firms have complex approval processes for publishing anything — including rates. A solo attorney can publish a structured services catalog, hourly rates, and a booking endpoint in an afternoon using AgentHermes. That solo firm then becomes the agent-accessible option in a niche while big firms are still debating whether to publish a single hourly rate. First-mover advantage in agent discovery compounds before the big firms can react.',
  },
  {
    question: 'What does an accountant\'s MCP server actually do?',
    answer:
      'The AgentHermes accounting vertical template exposes five tools: list_services (bookkeeping, tax prep, audit, advisory), get_rates (monthly packages and hourly), check_availability (including tax-season surge windows), book_consultation (free 15-minute discovery), and request_tax_doc_list (returns structured document checklist for a filing type). Agents can complete the full prospective-client journey through the tools, hand off a qualified lead with documents prepared, and the accountant jumps straight to the engaged portion of the relationship.',
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

export default function ProfessionalServicesAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Professional Services Agent Readiness: Why Law Firms, Accountants, and Consultants Score Under 20',
    description:
      'Professional services are the lowest-scoring segment in our 500-business Agent Readiness scan. Charge $500 per hour but cannot tell an AI agent what they offer or how much it costs. Here is the playbook to fix it.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/professional-services-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1950,
    keywords:
      'professional services agent readiness, law firm AI, accountant agent MCP, consulting firm readiness, service catalog API',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Professional Services Agent Readiness',
          item: 'https://agenthermes.ai/blog/professional-services-agent-readiness',
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
      title="Professional Services Agent Readiness: Why Law Firms, Accountants, and Consultants Score Under 20"
      shareUrl="https://agenthermes.ai/blog/professional-services-agent-readiness"
      currentHref="/blog/professional-services-agent-readiness"
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
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400">Professional Services Agent Readiness</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Briefcase className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Lowest-Scoring Segment
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Professional Services Agent Readiness:{' '}
            <span className="text-emerald-400">Why Law Firms, Accountants, and Consultants Score Under 20</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Professional services are the{' '}
            <strong className="text-zinc-100">lowest-scoring segment</strong> of the 500 businesses AgentHermes
            has scanned. Law firms, accounting practices, boutique consultancies, and financial advisors
            cluster in the 14-32 range on Agent Readiness — below even local service businesses. The irony
            is that these firms bill $300-500 per hour yet their websites cannot tell an AI agent what they
            offer, when an attorney is free, or what an engagement actually costs. That gap is about to
            become a competitive cliff.
          </p>

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

      {/* ===== THE DATA ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The Data: Professional Services in the 500-Business Scan
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The overall 500-business average is <strong className="text-zinc-100">43/100</strong>. Resend
              is the only Gold (75). Fifty-two businesses hit Silver. Two hundred forty-nine fell into
              Bronze, and 199 scored below 40 — what AgentHermes classifies as Not Scored or ARL-0 Dark.
            </p>
            <p>
              Professional services populate the bottom of the bottom. Of 74 law firms, accounting firms,
              and consultancies in the scan, <strong className="text-zinc-100">68 scored below 40</strong>.
              Zero scored above 55. The median was <strong className="text-zinc-100">22/100</strong>, less
              than half the overall average. The pattern is remarkably consistent: the same five failure
              modes repeat across every firm type.
            </p>
            <p>
              This is the clearest case of an industry hiding from agents that we have measured. And it
              is happening in the segment that can most afford to fix it — the firms with the highest
              revenue per client and the most to lose from invisibility.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '22', label: 'median pro-services score', icon: TrendingUp },
              { value: '0', label: 'scored Silver or higher', icon: Target },
              { value: '68/74', label: 'scored below 40', icon: XCircle },
              { value: '$300-500/hr', label: 'typical billing rate', icon: DollarSign },
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

      {/* ===== FAILURE PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Five Failure Patterns That Repeat Across Every Firm
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These patterns are so consistent across law firms, accountants, and consultants that the
            scanner can often predict a score within 5 points from the homepage alone.
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
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{pattern.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className={`${colors.text} font-medium`}>Score impact:</span>{' '}
                      <span className="text-zinc-400">{pattern.impact}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== TOOLS THE AGENT NEEDS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-blue-500" />
            The Tools an Agent-Ready Professional Services Firm Exposes
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Five MCP tools cover the full prospect-to-engagement journey. A firm shipping these moves from
            the bottom quartile to Gold tier in a single release.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyTools.map((tool) => {
              const colors = getColorClasses(tool.color)
              return (
                <div
                  key={tool.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <tool.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <code className={`text-base font-bold ${colors.text}`}>{tool.name}()</code>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{tool.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FIRM TYPE BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-amber-500" />
            Score Ranges and Key Fixes by Firm Type
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every professional services segment has a different entry point. The "key fix" column shows
            the single highest-leverage change for each firm type.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-xs font-bold text-zinc-300">
              <div>Firm Type</div>
              <div>Typical Score</div>
              <div>Agent-Ready Target</div>
              <div>Key Fix</div>
            </div>
            {firmTypeScores.map((row, i) => (
              <div
                key={row.type}
                className={`grid grid-cols-4 p-4 text-xs ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.type}</div>
                <div className="text-red-400">{row.typical}</div>
                <div className="text-emerald-400">{row.agentReady}</div>
                <div className="text-zinc-400">{row.keyFix}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE PLAYBOOK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Agent-Ready Professional Services Playbook
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Five steps. Steps 1-3 alone move a typical firm from 22 to 60+ (Silver). All five hit Gold.
          </p>

          <div className="space-y-3 mb-8">
            {fixSteps.map((item) => (
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
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The irony:</strong> Professional services are the segment
              most able to afford agent readiness and most reluctant to adopt it. A single retained client
              at $50K per year more than funds the entire infrastructure upgrade. Firms that recognize the
              math and move first will pull market share from every competitor that stays invisible.
            </p>
          </div>
        </div>
      </section>

      {/* ===== STRATEGIC IMPLICATIONS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Why This Is a Competitive Cliff, Not a Gradual Shift
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Agents select from the shortlist they can reason about',
                detail: 'When a user asks "find me a business litigation attorney in Seattle," the agent returns 3-5 firms. Those are always the firms with the most structured data. The other 20 firms might be better matches — but they never enter the conversation.',
              },
              {
                title: 'First to publish rates captures the category',
                detail: 'Pricing transparency in professional services is rare. The first boutique law firm in a niche to publish its rates becomes the benchmark — not just for agents, but for the human search traffic that follows the agent behavior.',
              },
              {
                title: 'Referral networks are not a moat against agents',
                detail: 'The traditional moat for professional services is referral networks. But referrals go through humans. When a user asks an agent for a CPA recommendation, the agent does not know the user\'s friend\'s recommendation — it knows which firms have structured data.',
              },
              {
                title: 'Big firms move slowest, solos move fastest',
                detail: 'Big law and big accounting have approval committees. A solo practitioner can ship a full MCP server and pricing page before lunch. For the first time in decades, solo firms have a structural speed advantage over multi-office firms in winning visibility.',
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Professional services firms have spent a century selling through relationships and referrals.
              That will not stop. But a new layer — agent-mediated discovery — is compounding on top of it.
              In that layer, the firms that have published structured data win the comparisons, and the
              firms that stayed behind "contact us" forms do not exist. The fix is cheap and the upside
              is asymmetric. This is the rare case where the first mover advantage is also the last mover
              disadvantage: wait long enough and your competitors have captured the agent relationships
              you needed to stay in the market.
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
                title: 'Pricing Transparency and Agent Readiness: Why Hidden Rates Fail',
                href: '/blog/pricing-transparency-agent-readiness',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'Agent Onboarding: Why D3 Is the Weakest Dimension',
                href: '/blog/onboarding-agent-readiness',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
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
            Score your firm in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Law firms, accountants, and consultants: see exactly which of the 9 Agent Readiness dimensions
            are missing — and which one fix moves you the most.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Audit My Firm
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              <Calculator className="h-4 w-4" />
              Connect My Firm
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
