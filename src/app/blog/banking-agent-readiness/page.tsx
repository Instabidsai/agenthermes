import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  CreditCard,
  DollarSign,
  Globe,
  HelpCircle,
  Landmark,
  Lock,
  Network,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Banking Agent Readiness: Why Open Banking APIs Exist But Most Banks Still Score Under 30 | AgentHermes',
  description:
    'Open Banking mandates consumer data APIs (PSD2 in EU, FDX in US). But open banking APIs are not agent readiness. Most bank APIs are read-only account data with no payment initiation for agents. Learn what separates agent-ready banking from regulatory compliance.',
  keywords: [
    'banking open banking agent readiness',
    'open banking API agent',
    'PSD2 agent readiness',
    'FDX financial data exchange',
    'neobank agent ready',
    'bank API AI agent',
    'agent-ready banking',
    'fintech open banking',
    'Revolut agent readiness',
    'banking MCP server',
  ],
  openGraph: {
    title: 'Banking Agent Readiness: Why Open Banking APIs Exist But Most Banks Still Score Under 30',
    description:
      'Open Banking mandated APIs. But regulatory compliance is not agent readiness. Most bank APIs: read-only, no payment initiation, complex partner agreements. Here is the gap.',
    url: 'https://agenthermes.ai/blog/banking-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Banking Agent Readiness: Open Banking vs Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Banking Agent Readiness: Open Banking APIs Exist, But Banks Still Score Under 30',
    description:
      'PSD2 and FDX mandated data APIs. That is not the same as agent readiness. Here is what is missing.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/banking-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const openBankingVsAgentReady = [
  { aspect: 'Account Data', openBanking: 'Read-only balances and transactions', agentReady: 'Structured account overview with categorized spending, recurring charges, and alerts' },
  { aspect: 'Payment Initiation', openBanking: 'Requires explicit consent flow per transaction', agentReady: 'Pre-authorized agent payments within user-defined limits and rules' },
  { aspect: 'Product Discovery', openBanking: 'Not covered by regulation', agentReady: 'Structured product comparison API with rates, fees, eligibility, and application endpoint' },
  { aspect: 'Loan Application', openBanking: 'Not covered by regulation', agentReady: 'Automated pre-qualification endpoint, document upload API, status tracking webhook' },
  { aspect: 'Account Opening', openBanking: 'Not covered by regulation', agentReady: 'KYC submission API, identity verification endpoint, automated approval flow' },
  { aspect: 'Customer Support', openBanking: 'Not covered by regulation', agentReady: 'Structured issue categories, resolution tracking, escalation API' },
]

const bankScores = [
  { name: 'Revolut', score: 41, tier: 'Bronze', notes: 'Developer API, structured docs, partner program — but gated behind business accounts', color: 'amber' },
  { name: 'Wise', score: 38, tier: 'Not Scored', notes: 'Transfer API is strong, but limited to payments — no product discovery or account opening', color: 'zinc' },
  { name: 'Plaid', score: 52, tier: 'Bronze', notes: 'Infrastructure layer — enables agent access to bank data but is not a bank itself', color: 'amber' },
  { name: 'Chase', score: 14, tier: 'Not Scored', notes: 'Consumer app only, developer API requires partnership agreement and 6-month approval', color: 'zinc' },
  { name: 'Bank of America', score: 11, tier: 'Not Scored', notes: 'No public API, Erica chatbot is proprietary, zero external agent access', color: 'zinc' },
  { name: 'Wells Fargo', score: 9, tier: 'Not Scored', notes: 'Gateway API exists but limited to existing enterprise partners, no self-serve', color: 'zinc' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Does Open Banking mean my bank is agent-ready?',
    answer:
      'No. Open Banking (PSD2 in Europe, FDX in the US) mandates that banks share consumer account data through APIs when the consumer consents. This covers balance and transaction reads. Agent readiness requires much more: product comparison APIs, loan application endpoints, payment initiation without per-transaction consent flows, and account opening automation. Open Banking is a foundation, not the finish line.',
  },
  {
    question: 'Why do neobanks score higher than traditional banks?',
    answer:
      'Neobanks like Revolut and Wise were built API-first. Their entire infrastructure is digital, which means adding new API endpoints is an engineering decision, not a regulatory project. Traditional banks run on mainframe systems from the 1970s and 1980s. Exposing data through APIs requires middleware layers, security reviews, and compliance approvals that can take 12 to 18 months per endpoint.',
  },
  {
    question: 'What would a truly agent-ready bank look like?',
    answer:
      'An agent-ready bank would expose structured endpoints for every customer-facing operation: product comparison with real-time rates, loan pre-qualification with instant decisioning, account opening with KYC API, payment initiation with pre-authorized agent limits, and a dispute resolution API. The agent would operate within user-defined guardrails — spend limits, approved categories, notification preferences — and handle the entire banking relationship programmatically.',
  },
  {
    question: 'Is Plaid a shortcut to banking agent readiness?',
    answer:
      'Plaid solves the data access layer by aggregating account information from thousands of banks. But Plaid is read-mostly — it can pull balances and transactions, but it cannot initiate payments, open accounts, or apply for loans at most institutions. Plaid gets you from 0 to about 25 on the Agent Readiness Score. The remaining 75 points require the bank itself to build action endpoints.',
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
    zinc: { text: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20' },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function BankingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Banking Agent Readiness: Why Open Banking APIs Exist But Most Banks Still Score Under 30',
    description:
      'Open Banking mandated consumer data APIs. But open banking is not agent readiness. Most bank APIs are read-only with no payment initiation for agents. Here is what separates compliance from readiness.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/banking-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'banking open banking agent readiness, PSD2, FDX, neobank agent ready, bank API AI agent',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Banking Agent Readiness',
          item: 'https://agenthermes.ai/blog/banking-agent-readiness',
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
      title="Banking Agent Readiness: Why Open Banking APIs Exist But Most Banks Still Score Under 30"
      shareUrl="https://agenthermes.ai/blog/banking-agent-readiness"
      currentHref="/blog/banking-agent-readiness"
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
            <span className="text-zinc-400">Banking Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Landmark className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Banking &amp; Finance
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Banking Agent Readiness: Why Open Banking APIs Exist But{' '}
            <span className="text-emerald-400">Most Banks Still Score Under 30</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Open Banking regulations like <strong className="text-zinc-100">PSD2</strong> in Europe and{' '}
            <strong className="text-zinc-100">FDX</strong> in the US mandated that banks expose consumer
            data APIs. The industry celebrated. But there is a problem: open banking APIs are{' '}
            <strong className="text-zinc-100">not</strong> agent readiness. Most bank APIs are read-only
            account data with no payment initiation, no product comparison, and complex partner agreements
            that lock out AI agents entirely.
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

      {/* ===== THE ILLUSION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-500" />
            The Open Banking Illusion
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              In 2018, PSD2 went live across Europe. Banks were required to open their systems to
              third-party providers through standardized APIs. In 2024, the Financial Data Exchange (FDX)
              became the de facto standard in the United States, with over 77 million consumer accounts
              connected. Open banking arrived. The narrative was simple: banks are now open.
            </p>
            <p>
              But &ldquo;open&rdquo; does not mean &ldquo;agent-ready.&rdquo; Open Banking mandated a
              narrow slice of functionality: account information services (reading balances and transactions)
              and payment initiation services (sending a single payment with explicit per-transaction consent).
              These APIs were designed for <strong className="text-zinc-100">fintech apps with human users
              clicking consent screens</strong>, not for autonomous AI agents executing multi-step financial
              workflows.
            </p>
            <p>
              The result is a banking industry that believes it has solved the API problem while scoring
              an average of <strong className="text-zinc-100">22 out of 100</strong> on the AgentHermes
              Agent Readiness Score. Open banking gave banks a floor. Agent readiness requires a building.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '22', label: 'avg bank score', icon: BarChart3 },
              { value: '77M', label: 'FDX connected accounts', icon: Network },
              { value: '2', label: 'of 6 agent journey steps covered', icon: Target },
              { value: '$0', label: 'agent-initiated deposits', icon: DollarSign },
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

      {/* ===== OPEN BANKING VS AGENT READY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            Open Banking vs Agent-Ready Banking: A Side-by-Side Comparison
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Open Banking covers two of the six{' '}
            <Link href="/blog/agent-experience-dimension" className="text-emerald-400 hover:text-emerald-300 underline">
              agent journey steps
            </Link>: FIND (discovery through registries) and UNDERSTAND (reading account data). The remaining
            four steps — SIGN UP, CONNECT, USE, and PAY — are untouched by regulation.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Capability</div>
              <div>Open Banking</div>
              <div>Agent-Ready Banking</div>
            </div>
            {openBankingVsAgentReady.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.openBanking}</div>
                <div className="text-emerald-400">{row.agentReady}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The gap is enormous. Open Banking gives agents the ability to <em>look</em> at an account.
              Agent readiness gives agents the ability to <em>act</em> on behalf of the account holder.
              Looking without acting is surveillance. Acting within guardrails is service.
            </p>
          </div>
        </div>
      </section>

      {/* ===== BANK SCORES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Banking Agent Readiness Scores
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We scanned the top retail banks, neobanks, and financial infrastructure providers.
            The pattern is clear: neobanks lead, infrastructure providers (Plaid) enable partial
            access, and traditional banks are nearly invisible.
          </p>

          <div className="space-y-3 mb-8">
            {bankScores.map((bank) => {
              const colors = getColorClasses(bank.color)
              return (
                <div
                  key={bank.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Landmark className="h-5 w-5 text-zinc-400" />
                      <h3 className="text-lg font-bold text-zinc-100">{bank.name}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-semibold`}>
                        {bank.tier}
                      </span>
                      <span className="text-2xl font-bold text-zinc-100">{bank.score}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{bank.notes}</p>
                  {/* Score bar */}
                  <div className="mt-3 h-2 rounded-full bg-zinc-800">
                    <div
                      className={`h-2 rounded-full ${bank.score >= 40 ? 'bg-amber-500' : 'bg-zinc-600'}`}
                      style={{ width: `${bank.score}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE NEOBANK ADVANTAGE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Why Neobanks Are Closer to Agent-Ready
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Revolut, Wise, Monzo, and N26 share a structural advantage over traditional banks:
              they were built on modern API architectures from day one. Their mobile apps are thin
              clients calling the same APIs that third-party developers can access. Adding an endpoint
              is a product decision, not a compliance project.
            </p>
            <p>
              Traditional banks face the opposite challenge. Their core systems run on COBOL and
              mainframe architectures designed in the 1970s and 1980s. Every new API endpoint requires
              a middleware layer, a security review, a compliance sign-off, and integration testing
              against legacy systems that were never designed for external access. A single endpoint
              can take 12 to 18 months from proposal to production.
            </p>
            <p>
              This is why Revolut scores <strong className="text-zinc-100">41</strong> while Bank of
              America scores <strong className="text-zinc-100">11</strong>. It is not that traditional
              banks do not want to be agent-ready. Their architecture makes it prohibitively expensive
              to get there incrementally. The banks that will lead in agent readiness are the ones that
              rebuild from the ground up — or acquire neobanks that already have the infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Neobank Architecture',
                items: ['API-first from founding', 'Modern cloud infrastructure', 'Endpoint in weeks', 'Developer portal with self-serve keys'],
                icon: CheckCircle2,
                color: 'emerald',
              },
              {
                title: 'Traditional Bank Architecture',
                items: ['Mainframe core systems', 'Middleware translation layers', 'Endpoint in 12-18 months', 'Partner agreements required'],
                icon: X,
                color: 'red',
              },
            ].map((col) => {
              const colors = getColorClasses(col.color)
              return (
                <div key={col.title} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <h3 className="text-lg font-bold text-zinc-100 mb-4">{col.title}</h3>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                        <col.icon className={`h-4 w-4 mt-0.5 shrink-0 ${colors.text}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY BANKING LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Banking Actually Looks Like
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Imagine telling your AI assistant: &ldquo;Find me the best savings account with at
              least 4.5% APY, no minimum balance, and FDIC insurance. Open it and transfer $5,000
              from my checking account.&rdquo; Today, that requires 45 minutes of research, 3 to 5
              tabs, a paper application, and a 3-day wait. In an agent-ready banking world, it takes
              90 seconds.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Product Comparison API',
                detail: 'Agent queries structured endpoint returning rates, fees, minimums, insurance status, and eligibility requirements for every savings product. No scraping marketing pages.',
                icon: Search,
              },
              {
                step: '2',
                title: 'Pre-Qualification Endpoint',
                detail: 'Agent submits anonymized user profile to check eligibility without a hard credit pull. Returns approved, denied, or conditional with specific requirements.',
                icon: Shield,
              },
              {
                step: '3',
                title: 'Account Opening API',
                detail: 'KYC data submitted through structured endpoint. Identity verification via API (not a selfie flow designed for humans). Account provisioned in real-time.',
                icon: Zap,
              },
              {
                step: '4',
                title: 'Payment Initiation',
                detail: 'Agent initiates transfer within pre-authorized limits. User gets a notification. Funds move via same-day ACH or instant transfer. No manual consent screen per transaction.',
                icon: CreditCard,
              },
              {
                step: '5',
                title: 'Ongoing Management',
                detail: 'Agent monitors rate changes, fee adjustments, and better offers. Alerts user when action is beneficial. Can execute rebalancing within approved guardrails.',
                icon: TrendingUp,
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
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The first bank to reach Silver (score 60+)</strong>{' '}
              will capture a disproportionate share of agent-driven account openings. When every AI
              assistant recommends the same bank because it is the only one their agent can actually
              interact with, that bank wins the distribution war without spending on marketing.
            </p>
          </div>
        </div>
      </section>

      {/* ===== REGULATORY COMPLEXITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            The Regulatory Complexity Problem
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Banking is not like restaurant reservations. There are real reasons banks move slowly on
              API access: KYC/AML compliance, FDIC regulations, PCI-DSS for card data, SOX for
              financial reporting, and state-by-state licensing requirements. An agent that opens a
              bank account must comply with the Bank Secrecy Act. An agent that initiates a wire
              transfer must comply with Regulation E.
            </p>
            <p>
              But compliance is not a reason to score zero — it is a reason to score differently.{' '}
              <Link href="/blog/fintech-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Stripe scores 68
              </Link>{' '}
              while operating in one of the most regulated environments in tech. PCI compliance does
              not prevent structured APIs — it requires them. The banks scoring under 30 are not
              held back by regulation. They are held back by architecture and institutional inertia.
            </p>
            <p>
              The regulatory framework for agent-initiated banking transactions does not fully exist
              yet. But the banks building the API infrastructure now will be positioned to move
              immediately when regulations catch up. The banks waiting for regulatory clarity will be
              another 18 months behind when the rules arrive.
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
                title: 'Fintech Agent Readiness: Why Stripe Scores 68 While Cash App Scores 12',
                href: '/blog/fintech-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Enterprise vs Startup Agent Readiness: The Architecture Gap',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Analysis',
                tagColor: 'blue',
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
            Is your financial service agent-ready?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your Agent Readiness Score in 60 seconds. See how your bank, fintech, or financial
            service compares across all 9 dimensions — and what it takes to reach Silver.
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
