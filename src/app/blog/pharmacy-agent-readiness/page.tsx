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
  DollarSign,
  Globe,
  HelpCircle,
  Lock,
  Pill,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Pharmacy Agent Readiness: Why Prescription Services Are the Next Agent Frontier | AgentHermes',
  description:
    'Pharmacy and prescription services are mostly invisible to AI agents. GoodRx has price comparison data. CVS/Walgreens have some digital services but no public agent API. Analysis of the $635B pharmacy market.',
  keywords: [
    'pharmacy prescription agent readiness',
    'pharmacy AI agent',
    'prescription transfer API',
    'CVS Walgreens agent readiness',
    'GoodRx API',
    'pharmacy MCP server',
    'medication availability API',
    'insurance verification agent',
    'agent economy pharmacy',
  ],
  openGraph: {
    title:
      'Pharmacy Agent Readiness: Why Prescription Services Are the Next Agent Frontier',
    description:
      'The $635B pharmacy market requires phone calls for transfers, manual insurance verification, and locked proprietary systems. AI agents cannot help with prescription management yet.',
    url: 'https://agenthermes.ai/blog/pharmacy-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pharmacy Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Pharmacy Agent Readiness: Why Prescription Services Are the Next Agent Frontier',
    description:
      'Prescription transfers require phone calls. Insurance verification is manual. Drug interaction checks are locked in proprietary systems. The $635B pharmacy market vs the agent economy.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/pharmacy-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const pharmacyScores = [
  {
    name: 'GoodRx',
    score: '~42',
    tier: 'Bronze',
    tierColor: 'amber',
    strengths:
      'Price comparison data, drug search, coupon endpoints, structured pricing',
    weaknesses:
      'No purchase API, no prescription transfer, no insurance integration, no MCP server',
  },
  {
    name: 'CVS Health',
    score: '~25',
    tier: 'Not Scored',
    tierColor: 'red',
    strengths:
      'Digital refill requests (app), some vaccination scheduling online, MinuteClinic booking',
    weaknesses:
      'No public API, prescription management locked in proprietary portal, no agent-facing endpoints',
  },
  {
    name: 'Walgreens',
    score: '~22',
    tier: 'Not Scored',
    tierColor: 'red',
    strengths:
      'Digital prescription management (app), photo and retail APIs (deprecated), vaccination scheduling',
    weaknesses:
      'Previously had an API program — now discontinued. Prescription data locked behind login portal',
  },
  {
    name: 'Amazon Pharmacy',
    score: '~35',
    tier: 'Not Scored',
    tierColor: 'red',
    strengths:
      'Price transparency, insurance comparisons, delivery tracking. Most digital-native pharmacy',
    weaknesses:
      'Tied to Amazon account, no public API, no MCP server, no agent-card.json',
  },
  {
    name: 'Independent Pharmacies',
    score: '~6',
    tier: 'ARL-0 Dark',
    tierColor: 'red',
    strengths:
      'None — most have a basic website with address and phone number',
    weaknesses:
      'Zero API, phone-only transfers, manual insurance, no structured data, no online services',
  },
]

const agentReadyFeatures = [
  {
    feature: 'Medication Availability Checker',
    description:
      'check_medication({ drug_name, dosage, quantity, pharmacy_id }) returning in-stock status, price with and without insurance, generic alternatives, and estimated fill time. Agents managing chronic prescriptions need this to find the best option across pharmacies.',
    impact: 'D2 API Quality + D6 Data Quality',
    icon: Search,
    color: 'emerald',
  },
  {
    feature: 'Insurance Eligibility Endpoint',
    description:
      'verify_insurance({ member_id, group_number, bin, drug_ndc }) returning coverage status, copay amount, prior authorization requirements, and formulary tier. Today this requires a phone call averaging 12 minutes. An API call takes milliseconds.',
    impact: 'D2 API Quality + D5 Payment',
    icon: ShieldCheck,
    color: 'blue',
  },
  {
    feature: 'Prescription Transfer API',
    description:
      'transfer_prescription({ rx_number, from_pharmacy, to_pharmacy, patient_id }) initiating an electronic transfer between pharmacies. Currently requires a phone call between pharmacists. The NCPDP SCRIPT standard already defines the data format — the API layer is what is missing.',
    impact: 'D9 Agent Experience + D8 Reliability',
    icon: Zap,
    color: 'purple',
  },
  {
    feature: 'Refill Scheduling Endpoint',
    description:
      'schedule_refill({ rx_number, preferred_date, delivery_method }) setting up automatic refills with pickup or delivery preference. AI health agents managing medication adherence need this to keep patients on schedule without manual intervention.',
    impact: 'D2 API Quality + D9 Agent Experience',
    icon: Calendar,
    color: 'cyan',
  },
]

const regulatoryContext = [
  {
    regulation: 'DEA (Drug Enforcement Administration)',
    impact:
      'Controlled substances (Schedule II-V) have additional tracking requirements. An agent API must enforce DEA-compliant identity verification and quantity limits. This is solvable — electronic prescribing of controlled substances (EPCS) already exists.',
    blocksApi: false,
  },
  {
    regulation: 'State Pharmacy Boards',
    impact:
      'Each state has licensing requirements for pharmacies and pharmacists. APIs must route transactions through licensed pharmacies. This does not prevent API creation — it constrains WHERE transactions happen, not HOW they are initiated.',
    blocksApi: false,
  },
  {
    regulation: 'HIPAA (Health Insurance Portability)',
    impact:
      'Patient prescription data is protected health information (PHI). APIs handling PHI need encryption, audit logging, access controls, and BAA agreements. Every existing pharmacy portal already complies — an API layer inherits the same controls.',
    blocksApi: false,
  },
  {
    regulation: 'NCPDP SCRIPT Standard',
    impact:
      'The National Council for Prescription Drug Programs already defines electronic prescription data formats. The infrastructure for machine-readable prescription exchange EXISTS — it just is not exposed to agents.',
    blocksApi: false,
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Can AI agents manage prescriptions today?',
    answer:
      'Very limited. Some pharmacy apps (CVS, Walgreens) allow digital refill requests, but there is no public API that AI agents can call. An agent cannot check medication availability, compare prices across pharmacies, transfer prescriptions, or verify insurance programmatically. Every step requires either a human in the app or a phone call.',
  },
  {
    question: 'Why do prescription transfers still require phone calls?',
    answer:
      'The pharmacy-to-pharmacy transfer process was designed decades ago around phone and fax communication. While the NCPDP SCRIPT standard defines electronic formats, most pharmacies have not implemented API layers on top of their internal systems. The data format is digital — the interface is analog.',
  },
  {
    question:
      'Do regulations prevent pharmacies from having public APIs?',
    answer:
      'No. HIPAA, DEA regulations, and state pharmacy boards impose requirements on HOW data is handled, not WHETHER it can be accessed via API. Every pharmacy already handles electronic prescriptions (e-prescribing), electronic insurance claims (NCPDP D.0), and electronic prior authorizations. Adding an agent-facing API layer is a technology investment, not a regulatory barrier.',
  },
  {
    question: 'What would an AI pharmacy agent do for patients?',
    answer:
      'An AI pharmacy agent could compare medication prices across nearby pharmacies, automatically transfer prescriptions to cheaper options, schedule refills before you run out, verify insurance coverage for new medications, check for drug interactions with your current prescriptions, and find available appointments for vaccinations. All tasks that currently require multiple phone calls and portal logins.',
  },
  {
    question: 'How does GoodRx compare to a full pharmacy API?',
    answer:
      'GoodRx provides price comparison data — you can look up what a drug costs at different pharmacies with different coupons. But it cannot fill prescriptions, transfer them, verify insurance, or schedule refills. It is a read-only layer on top of the pharmacy ecosystem. An agent-ready pharmacy would expose both the price data AND the transactional capabilities.',
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

export default function PharmacyAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Pharmacy Agent Readiness: Why Prescription Services Are the Next Agent Frontier',
    description:
      'The $635B pharmacy market requires phone calls for transfers, manual insurance verification, and locked proprietary systems. Analysis of why pharmacy is the next major agent frontier.',
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
      'https://agenthermes.ai/blog/pharmacy-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1900,
    keywords:
      'pharmacy prescription agent readiness, pharmacy AI agent, prescription transfer API, CVS Walgreens agent, GoodRx API, medication availability',
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
          name: 'Pharmacy Agent Readiness',
          item: 'https://agenthermes.ai/blog/pharmacy-agent-readiness',
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
      title="Pharmacy Agent Readiness: Why Prescription Services Are the Next Agent Frontier"
      shareUrl="https://agenthermes.ai/blog/pharmacy-agent-readiness"
      currentHref="/blog/pharmacy-agent-readiness"
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
              <span className="text-zinc-400">Pharmacy Agent Readiness</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <Pill className="h-3.5 w-3.5" />
                Vertical Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                Healthcare
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Pharmacy Agent Readiness:{' '}
              <span className="text-emerald-400">
                Why Prescription Services Are the Next Agent Frontier
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              The US pharmacy market generates{' '}
              <strong className="text-zinc-100">$635 billion annually</strong>.
              Every American fills an average of 12 prescriptions per year.
              Transferring a prescription requires a phone call. Verifying
              insurance requires another phone call. Checking if a drug is in
              stock requires yet another phone call. AI agents could handle all
              of this — but pharmacies have given them nothing to work with.
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

        {/* ===== THE PROBLEM ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-500" />
              Why Pharmacy Is the Next Agent Frontier
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Pharmacy is uniquely positioned for agent disruption because the
                tasks are{' '}
                <strong className="text-zinc-100">
                  repetitive, data-driven, and currently handled by phone
                </strong>
                . Prescription refills happen on predictable schedules.
                Insurance verification follows standardized formats. Drug
                interactions are checked against known databases. Price
                comparisons across pharmacies are pure data lookups. Every one
                of these tasks is a perfect fit for AI agents — yet none of them
                are accessible via API.
              </p>
              <p>
                The irony is that pharmacy already has extensive electronic
                infrastructure. E-prescribing (EPCS) is mandatory in most
                states. Insurance claims are processed electronically via NCPDP
                D.0. Drug interaction databases are digital. The underlying
                systems are machine-readable — but the{' '}
                <strong className="text-zinc-100">
                  patient-facing and agent-facing interfaces are stuck in the
                  phone-and-portal era
                </strong>
                .
              </p>
              <p>
                We scanned the major pharmacy platforms and independent
                pharmacies across the US. The results confirm that this
                vertical is almost entirely dark to the agent economy.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '$635B', label: 'US pharmacy market', icon: DollarSign },
                { value: '12', label: 'Avg prescriptions per American/year', icon: Pill },
                { value: '~6', label: 'Independent pharmacy avg score', icon: BarChart3 },
                { value: '0', label: 'Pharmacies with MCP servers', icon: Server },
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

        {/* ===== PLATFORM SCORECARD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              Pharmacy Platform Scorecard
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              GoodRx leads because it exposes pricing data. The major chains
              have digital services locked behind proprietary apps.
              Independents have essentially nothing.
            </p>

            <div className="space-y-4 mb-8">
              {pharmacyScores.map((platform) => {
                const colors = getColorClasses(platform.tierColor)
                return (
                  <div
                    key={platform.name}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-zinc-100">
                        {platform.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-zinc-100">
                          {platform.score}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-semibold`}
                        >
                          {platform.tier}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1 font-medium">
                          Strengths
                        </p>
                        <p className="text-sm text-emerald-400">
                          {platform.strengths}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1 font-medium">
                          Weaknesses
                        </p>
                        <p className="text-sm text-red-400">
                          {platform.weaknesses}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== WHAT AGENT-READY PHARMACY LOOKS LIKE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-500" />
              What Agent-Ready Pharmacy Looks Like
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              An AI health agent managing medications for a patient needs four
              core capabilities. Today, none of them are available via public
              API from any pharmacy.
            </p>

            <div className="space-y-4 mb-8">
              {agentReadyFeatures.map((item) => {
                const colors = getColorClasses(item.color)
                return (
                  <div
                    key={item.feature}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <item.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-100">
                          {item.feature}
                        </h3>
                        <span className="text-xs text-zinc-500">
                          Impacts: {item.impact}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== GOODRX: THE CLOSEST ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              GoodRx: Read-Only, But Leading the Pack
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                GoodRx scores highest among pharmacy-related services because
                it provides structured pricing data that agents can consume.
                Search for a drug, get prices at nearby pharmacies, compare
                coupons — all in machine-readable formats. For an AI agent
                helping a patient find the cheapest option for a medication,
                GoodRx is the only useful data source in the market.
              </p>
              <p>
                But GoodRx is fundamentally a{' '}
                <strong className="text-zinc-100">
                  read-only price comparison layer
                </strong>
                . It cannot fill prescriptions, transfer them, verify
                insurance, or schedule refills. An agent can use GoodRx to find
                the cheapest pharmacy for metformin, but it cannot then
                complete the transaction. The last mile — the actual pharmacy
                interaction — still requires a human with a phone.
              </p>
              <p>
                If GoodRx added an MCP server with transactional tools (or
                partnered with pharmacies to expose fill and transfer endpoints
                through its platform), it would become the central hub for AI
                pharmacy agents. The pricing data is the hardest part — they
                already have it.
              </p>
            </div>
          </div>
        </section>

        {/* ===== REGULATORY CONTEXT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Regulatory Barriers: Real Constraints, Not Blockers
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
              <p>
                The most common objection to pharmacy APIs is regulation. DEA
                rules, state pharmacy boards, HIPAA — surely these prevent
                pharmacies from exposing public APIs? The answer is{' '}
                <strong className="text-zinc-100">no</strong>. Regulations
                constrain how data is handled, not whether it can flow through
                APIs. Every regulation below is already satisfied by existing
                electronic pharmacy infrastructure.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {regulatoryContext.map((item) => (
                <div
                  key={item.regulation}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-zinc-100 text-sm">
                      {item.regulation}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                      Does not block APIs
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.impact}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-blue-400">
                  The key insight:
                </strong>{' '}
                E-prescribing, electronic insurance claims, and electronic
                prior authorization already exist and are HIPAA/DEA compliant.
                The infrastructure for machine-to-machine pharmacy communication
                is built. What is missing is an{' '}
                <strong className="text-zinc-100">agent-facing API layer</strong>{' '}
                on top of it. This parallels what we found in{' '}
                <Link
                  href="/blog/healthcare-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  healthcare agent readiness
                </Link>{' '}
                broadly: the regulations allow APIs, the industry just has not
                built them yet.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE PHONE CALL PROBLEM ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              The Phone Call Tax on Prescription Management
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Every interaction between a patient and a pharmacy that could be
                an API call is instead a phone call. The data below comes from
                industry surveys and pharmacy workflow studies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  task: 'Prescription transfer',
                  phoneTime: '15-25 min (pharmacist-to-pharmacist call)',
                  apiTime: '<1 second (electronic NCPDP transfer)',
                },
                {
                  task: 'Insurance verification',
                  phoneTime: '8-15 min (hold time + verification)',
                  apiTime: '<1 second (eligibility check endpoint)',
                },
                {
                  task: 'Drug availability check',
                  phoneTime: '5-10 min (call pharmacy, wait, check)',
                  apiTime: '<1 second (inventory query)',
                },
                {
                  task: 'Price comparison (3 pharmacies)',
                  phoneTime: '20-30 min (call each, ask, compare)',
                  apiTime: '<1 second (parallel price queries)',
                },
              ].map((item) => (
                <div
                  key={item.task}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className="font-bold text-zinc-100 mb-3 text-sm">
                    {item.task}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        Phone
                      </span>
                      <span className="text-sm text-zinc-500">
                        {item.phoneTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                        API
                      </span>
                      <span className="text-sm text-emerald-400">
                        {item.apiTime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                A patient switching pharmacies to save money currently spends
                45-60 minutes on phone calls. An AI agent with access to
                pharmacy APIs could complete the same task in under 5 seconds.
                This is not a marginal improvement — it is a{' '}
                <strong className="text-zinc-100">
                  3,600x reduction in time-to-completion
                </strong>
                . The first pharmacy chain that opens agent APIs will
                capture every price-conscious patient whose AI agent finds them
                the best deal.
              </p>
            </div>
          </div>
        </section>

        {/* ===== COMPLIANCE NOTE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-purple-500" />
              Why This Matters for{' '}
              <Link
                href="/blog/legal-compliance-agent-readiness"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                Legal Compliance
              </Link>
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Structured pharmacy APIs with proper authentication are actually{' '}
                <strong className="text-zinc-100">more compliant</strong> than
                the current phone-based system. Every API call is logged with
                timestamps, requester identity, and audit trails. Phone calls
                between pharmacists have minimal documentation. The regulatory
                framework around HIPAA and DEA compliance is stronger when
                transactions flow through authenticated, encrypted, auditable
                API endpoints than when they flow through phone conversations.
              </p>
              <p>
                An agent accessing pharmacy data through OAuth with
                patient-granted scopes, HIPAA-compliant encryption, and
                per-request audit logging is a more secure system than a
                pharmacist reading prescription numbers over the phone to
                another pharmacist who writes them on a notepad.
              </p>
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
                  title: 'Healthcare Agent Readiness',
                  href: '/blog/healthcare-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Legal and Compliance Considerations for Agent Readiness',
                  href: '/blog/legal-compliance-agent-readiness',
                  tag: 'Legal Guide',
                  tagColor: 'purple',
                },
                {
                  title: 'What Is Agent Readiness? The Complete Guide',
                  href: '/blog/what-is-agent-readiness',
                  tag: 'Complete Guide',
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
              Is your pharmacy or health service agent-ready?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Scan your pharmacy website or health platform in 60 seconds.
              See your Agent Readiness Score and find out what AI health agents
              see when they look at your service.
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
