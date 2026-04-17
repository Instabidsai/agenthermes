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
  DollarSign,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Link2,
  Receipt,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Accounting Agent Readiness: Why QuickBooks Beats Your Accountant\'s Website | AgentHermes',
  description:
    'QuickBooks and Xero have OAuth APIs scoring ~55. Individual CPA firms score near zero. AI tax agents are coming — the first CPA with an MCP server captures every AI-powered bookkeeping integration.',
  keywords: [
    'accounting agent readiness',
    'QuickBooks agent readiness',
    'CPA agent readiness',
    'AI accounting agents',
    'bookkeeping AI integration',
    'Xero API agent',
    'accounting MCP server',
    'tax agent AI',
    'accounting API',
  ],
  openGraph: {
    title: 'Accounting Agent Readiness: Why QuickBooks Beats Your Accountant\'s Website',
    description:
      'QuickBooks and Xero score ~55 for agent readiness with full OAuth APIs. Individual CPA firms score near zero. The AI accounting agent market is wide open.',
    url: 'https://agenthermes.ai/blog/accounting-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Accounting Agent Readiness: Why QuickBooks Beats Your Accountant\'s Website',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accounting Agent Readiness: Why QuickBooks Beats Your Accountant\'s Website',
    description:
      'QuickBooks scores ~55 for agent readiness. The average CPA firm scores near zero. AI tax agents are coming and most accountants are invisible.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/accounting-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const platformScores = [
  { name: 'QuickBooks Online', score: 55, tier: 'Bronze', detail: 'OAuth 2.0, REST API, webhooks, sandbox mode, structured JSON' },
  { name: 'Xero', score: 53, tier: 'Bronze', detail: 'OAuth 2.0, REST API, webhook support, developer portal, typed SDKs' },
  { name: 'FreshBooks', score: 48, tier: 'Bronze', detail: 'OAuth 2.0, REST API, limited webhook support, smaller ecosystem' },
  { name: 'Wave Accounting', score: 32, tier: 'Not Scored', detail: 'GraphQL API exists but limited, no OAuth, consumer-focused' },
  { name: 'Avg CPA Firm Website', score: 8, tier: 'Not Scored', detail: 'No API, PDF tax returns, phone scheduling, contact form' },
  { name: 'Avg Bookkeeper Website', score: 6, tier: 'Not Scored', detail: 'Static HTML, no endpoints, email-only contact, PDF proposals' },
]

const agentReadyFeatures = [
  {
    feature: 'Client Portal API',
    description: 'Programmatic access to client documents, tax status, and account summaries. Agents can check on behalf of the business owner without calling the firm.',
    impact: 'D2 API Quality (+8-12 pts)',
    icon: Globe,
  },
  {
    feature: 'Document Submission Endpoint',
    description: 'Structured upload for W-2s, 1099s, receipts, and bank statements. Accept multipart/form-data with metadata like tax_year, document_type, and client_id.',
    impact: 'D6 Data Quality (+5-8 pts)',
    icon: FileText,
  },
  {
    feature: 'Tax Deadline Calendar JSON',
    description: 'Machine-readable calendar of filing deadlines, extension dates, and estimated tax payment schedules. Agents managing finances need this to avoid penalties.',
    impact: 'D6 Data Quality (+3-5 pts)',
    icon: Calendar,
  },
  {
    feature: 'Invoice Status Endpoint',
    description: 'GET /invoices/{id}/status returns structured JSON with amount, due_date, paid_status, and payment_link. AI bookkeeping agents reconcile automatically.',
    impact: 'D2 API Quality (+5-8 pts)',
    icon: Receipt,
  },
  {
    feature: 'Service Catalog JSON',
    description: 'Structured list of services offered: tax prep, bookkeeping, payroll, advisory. Each with pricing, turnaround time, and required documents.',
    impact: 'D4 Pricing (+4-6 pts)',
    icon: Layers,
  },
  {
    feature: 'Availability Endpoint',
    description: 'GET /availability returns open consultation slots. AI scheduling agents book directly without phone tag during tax season.',
    impact: 'D9 Agent Experience (+4-6 pts)',
    icon: Clock,
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does QuickBooks score so much higher than my CPA firm?',
    answer:
      'QuickBooks was built for developers from the start. It has OAuth 2.0, a REST API, webhooks, sandbox mode, and structured JSON responses across hundreds of endpoints. Your CPA firm probably has a WordPress site with a phone number and a "Send us your documents" email link. The difference is infrastructure, not quality of accounting work.',
  },
  {
    question: 'Do AI accounting agents already exist?',
    answer:
      'Yes. AI bookkeeping agents already categorize transactions, reconcile accounts, and generate reports using QuickBooks and Xero APIs. Companies like Vic.ai, Truewind, and Puzzle automate accounting workflows. The next wave will handle tax preparation, advisory, and client communication. CPA firms that are invisible to these agents lose integration revenue.',
  },
  {
    question: 'What would an MCP server for an accounting firm look like?',
    answer:
      'Five core tools: get_services() returns your service catalog with pricing, check_availability() returns open consultation slots, submit_document() accepts tax documents with metadata, get_invoice_status() returns billing info, and get_deadlines() returns upcoming filing dates. An AI personal assistant managing someone\'s finances could book a consultation, submit documents, and check invoice status without a single phone call.',
  },
  {
    question: 'Is it safe to expose accounting data via API?',
    answer:
      'QuickBooks and Xero already expose accounting data via API to thousands of third-party integrations securely. OAuth 2.0 with scoped permissions means agents only access what is authorized. The irony is that emailing PDF tax returns and sharing passwords to client portals is far less secure than a properly authenticated API endpoint.',
  },
  {
    question: 'What is the ROI for a CPA firm becoming agent-ready?',
    answer:
      'Every AI bookkeeping platform that integrates with your firm via API sends you clients automatically. AI personal assistants recommending accountants will prefer firms with structured availability and service data. During tax season, when every CPA is overloaded, the firm with an MCP server still accepts AI-driven client bookings 24/7.',
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AccountingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Accounting Agent Readiness: Why QuickBooks Beats Your Accountant\'s Website',
    description:
      'QuickBooks and Xero have OAuth APIs scoring ~55. Individual CPA firms score near zero. AI tax agents are coming and most accountants are invisible to them.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/accounting-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'accounting agent readiness, QuickBooks, Xero, CPA, AI accounting, bookkeeping AI, MCP server',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Accounting Agent Readiness',
          item: 'https://agenthermes.ai/blog/accounting-agent-readiness',
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
      title="Accounting Agent Readiness: Why QuickBooks Beats Your Accountant's Website"
      shareUrl="https://agenthermes.ai/blog/accounting-agent-readiness"
      currentHref="/blog/accounting-agent-readiness"
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
            <span className="text-zinc-400">Accounting Agent Readiness</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Receipt className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Accounting
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Accounting Agent Readiness: Why QuickBooks Beats{' '}
            <span className="text-emerald-400">Your Accountant&apos;s Website</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            QuickBooks and Xero have OAuth APIs, REST endpoints, webhooks, and sandbox environments. They
            score around <strong className="text-zinc-100">55 on the Agent Readiness Score</strong>. The average
            CPA firm website has a phone number, a contact form, and PDF tax documents. It scores{' '}
            <strong className="text-zinc-100">8 out of 100</strong>. AI tax agents are coming, and most
            accountants are invisible to them.
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
                  13 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE GAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            The 47-Point Gap Between Platforms and Practitioners
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Accounting is one of the most polarized verticals in our 500-business scan data. Cloud accounting
              platforms like QuickBooks Online, Xero, and FreshBooks were built for software integrations from
              day one. They have REST APIs with OAuth 2.0 authentication, webhook notifications for real-time
              transaction updates, sandbox environments for testing, and structured JSON responses across
              hundreds of endpoints.
            </p>
            <p>
              Individual accounting firms — CPAs, bookkeepers, enrolled agents, tax preparers — have the
              opposite infrastructure. Their websites are digital brochures. Services are described in
              paragraphs, not structured data. Pricing is &ldquo;call for a quote.&rdquo; Scheduling is
              phone-only. Document exchange happens over email or through a consumer-grade portal that has
              no API whatsoever.
            </p>
            <p>
              The result is a <strong className="text-zinc-100">47-point gap</strong> between the platforms
              accountants use and the accountants themselves. QuickBooks scores 55. The average CPA firm
              website scores 8. That gap defines who gets discovered by AI agents and who does not.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {[
              { value: '~55', label: 'QuickBooks/Xero score', icon: TrendingUp },
              { value: '8', label: 'Avg CPA firm score', icon: Target },
              { value: '47pts', label: 'Platform vs practitioner gap', icon: BarChart3 },
              { value: '1.4M', label: 'US accountants & bookkeepers', icon: Receipt },
              { value: '0', label: 'CPA firms with MCP servers', icon: Server },
              { value: '$150B', label: 'US accounting services market', icon: DollarSign },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM SCORECARD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Accounting Platform Scorecard
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Cloud platforms built for integrations score Bronze or higher. Individual practitioners are
            invisible. The pattern is consistent across every accounting sub-vertical.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Platform</div>
              <div className="text-center">Score</div>
              <div className="text-center">Tier</div>
              <div>Why</div>
            </div>
            {platformScores.map((row, i) => (
              <div
                key={row.name}
                className={`grid grid-cols-4 p-4 text-sm items-center ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.name}</div>
                <div className="text-center">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${
                    row.score >= 40 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {row.score}
                  </span>
                </div>
                <div className={`text-center text-xs font-medium ${
                  row.tier === 'Bronze' ? 'text-amber-400' : 'text-zinc-500'
                }`}>
                  {row.tier}
                </div>
                <div className="text-zinc-500 text-xs">{row.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CPAS FAIL ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-red-500" />
            Five Reasons CPA Firms Score Under 10
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The failure pattern across{' '}
              <Link href="/blog/professional-services-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                professional services
              </Link>{' '}
              is consistent, but accounting has its own specific anti-patterns that make the problem worse.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                title: 'Tax returns delivered as PDFs',
                detail: 'Every CPA firm delivers final work product as PDF. AI agents cannot extract structured data from a 40-page 1040 PDF. The data exists in structured form inside tax software (Drake, Lacerte, ProConnect) but gets flattened to paper format for delivery.',
              },
              {
                title: 'Phone-only scheduling during tax season',
                detail: 'January through April, CPA firms are slammed. Most still require phone calls to schedule consultations. An AI scheduling agent cannot call a phone number. The firm with a /check_availability endpoint gets every AI-driven booking.',
              },
              {
                title: 'No structured service catalog',
                detail: 'Services are described in paragraphs: "We offer tax preparation, bookkeeping, payroll services, and financial consulting." No pricing, no turnaround times, no required documents list. An AI agent comparing accountants has nothing to compare.',
              },
              {
                title: 'Client portals with zero API',
                detail: 'Firms use portals like SmartVault, ShareFile, or Canopy for document exchange. These portals have no public API for the firm\'s clients. An AI agent managing a client\'s tax documents cannot upload a W-2 programmatically.',
              },
              {
                title: 'No pricing transparency whatsoever',
                detail: 'Tax preparation pricing varies by complexity, but most firms refuse to publish even ranges. "It depends" is not machine-readable. The firm that publishes a pricing API with base rates and complexity multipliers wins every AI comparison query.',
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

      {/* ===== WHAT AGENT-READY ACCOUNTING LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Accounting Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Six capabilities that transform a CPA firm from invisible to agent-accessible. Each maps
            directly to an Agent Readiness dimension and quantifiable score improvement.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyFeatures.map((item) => (
              <div
                key={item.feature}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <item.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-100">{item.feature}</h3>
                    <span className="text-xs text-emerald-400 font-medium">{item.impact}</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The QuickBooks integration play:</strong> A CPA firm with
              an MCP server can be discovered by any AI agent that already integrates with QuickBooks. The agent
              finds the firm, books a consultation, submits documents, and tracks invoice status — all through
              structured API calls. Every AI-powered bookkeeping platform becomes a referral source.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AI ACCOUNTING AGENT WAVE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            The AI Accounting Agent Wave Is Already Here
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AI accounting agents are not theoretical. They are shipping products today. Vic.ai processes
              invoices autonomously. Truewind and Puzzle handle bookkeeping. Bench (before shutting down)
              proved that AI-assisted bookkeeping could scale to thousands of clients.
            </p>
            <p>
              The next generation goes further. AI tax preparation agents will gather client documents, populate
              forms, flag deductions, and prepare returns for human CPA review. AI advisory agents will
              analyze financial patterns and recommend strategies. AI audit agents will verify compliance
              across accounts.
            </p>
            <p>
              Every one of these agents needs to interact with accounting firms. They need to submit documents,
              check deadlines, query invoice status, and book consultations. Without an API, the only option is
              email and phone — which agents cannot use. The CPA firm with structured endpoints gets integrated
              into every AI accounting workflow. The firm without them gets bypassed entirely.
            </p>
            <p>
              Consider the math: there are 1.4 million accountants and bookkeepers in the US serving a $150
              billion market. If AI agents mediate even 5% of new client acquisition within two years, that
              is $7.5 billion in revenue flowing to firms that are agent-discoverable. Every dollar of that
              goes to firms with APIs, not firms with phone numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'AI bookkeeping agents',
                detail: 'Already categorizing transactions and reconciling accounts via QuickBooks/Xero APIs. Next: selecting and onboarding CPA firms programmatically.',
              },
              {
                title: 'AI tax preparation agents',
                detail: 'Gathering documents, populating forms, flagging deductions. Need CPA firm endpoints to submit draft returns for review and file extensions.',
              },
              {
                title: 'AI financial advisory agents',
                detail: 'Analyzing spending patterns and recommending strategies. Need structured access to firm service catalogs and consultation scheduling.',
              },
              {
                title: 'AI audit agents',
                detail: 'Verifying compliance across accounts and flagging discrepancies. Need document submission endpoints and structured status responses.',
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

      {/* ===== THE FIRST-MOVER ADVANTAGE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            The First CPA with an MCP Server Wins
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Right now, zero CPA firms have MCP servers. Zero have agent-card.json files. Zero have
              structured service catalogs that an AI agent can query. The playing field is completely empty.
            </p>
            <p>
              The first CPA firm in any metro area to publish an MCP server with consultation booking,
              document submission, and service catalog tools will capture every AI-mediated client referral
              for that area. When someone tells Claude or ChatGPT &ldquo;find me a CPA who can handle my
              small business taxes in Austin,&rdquo; the agent will find exactly one firm that it can
              actually interact with. Game over for every other firm in that zip code.
            </p>
            <p>
              This is the same dynamic that played out with Google My Business listings, Yelp profiles,
              and online booking. The early movers captured disproportionate traffic because they were the
              only options in the system. Agent readiness is the next version of that same race, and the
              starting gun has already fired.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The SaaS comparison:</strong> QuickBooks did not win by being
              the best accounting software. It won by having the best{' '}
              <Link href="/blog/saas-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                integration ecosystem
              </Link>. 750+ apps connect to QuickBooks because the API is excellent. CPA firms that build their own
              integration surface — even a simple MCP server — tap into that same network effect.
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
                title: 'Professional Services Agent Readiness: Law Firms, Accountants, Consultants',
                href: '/blog/professional-services-agent-readiness',
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
            ].map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
              >
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mb-3 border ${
                  article.tagColor === 'amber'
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                }`}>
                  {article.tag}
                </span>
                <h3 className="text-sm font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors leading-snug">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28">
        <hr className="section-divider mb-16" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            How agent-ready is your accounting firm?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Scan your website in 60 seconds. See how you compare to QuickBooks, Xero, and other
            accounting platforms across all 9 dimensions of agent readiness.
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
              Get an MCP Server
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
