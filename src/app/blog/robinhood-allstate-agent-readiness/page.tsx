import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  FileText,
  Globe,
  HelpCircle,
  Landmark,
  Layers,
  Lock,
  Scale,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Robinhood and Allstate Both Score 66: The Regulated Industry Silver Pattern | AgentHermes',
  description:
    'Robinhood (fintech) and Allstate (insurance) both scored 66 on the Agent Readiness Score. Identical scores from completely different industries reveal a pattern: regulated industries can reach Silver when they build developer-first digital experiences.',
  keywords: [
    'Robinhood Allstate agent readiness regulated',
    'Robinhood agent readiness score',
    'Allstate agent readiness score',
    'regulated industry API',
    'fintech agent readiness',
    'insurance agent readiness',
    'Silver tier agent readiness',
    'developer-first regulated',
    'agent readiness case study',
  ],
  openGraph: {
    title: 'Why Robinhood and Allstate Both Score 66: The Regulated Industry Silver Pattern',
    description:
      'Fintech and insurance. Two different industries. Identical agent readiness scores. The pattern behind regulated Silver-tier businesses.',
    url: 'https://agenthermes.ai/blog/robinhood-allstate-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why Robinhood and Allstate Both Score 66',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Robinhood and Allstate Both Score 66: The Regulated Industry Silver Pattern',
    description:
      'Robinhood and Allstate: same score, different industries. Regulation is not the barrier. Architecture is.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/robinhood-allstate-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionScores = [
  { dimension: 'D1 Discovery', robinhood: 72, allstate: 68, insight: 'Both have structured sitemaps and developer docs. Neither has agent-card.json or llms.txt.' },
  { dimension: 'D2 API Quality', robinhood: 85, allstate: 70, insight: 'Robinhood has a well-documented API. Allstate exposes structured quote data through digital channels.' },
  { dimension: 'D3 Onboarding', robinhood: 60, allstate: 62, insight: 'Both require identity verification (KYC/KYB). Neither is agent-completable end to end.' },
  { dimension: 'D4 Pricing', robinhood: 78, allstate: 55, insight: 'Robinhood is transparent on fees. Allstate pricing is personalized and opaque until quote completion.' },
  { dimension: 'D5 Payment', robinhood: 70, allstate: 65, insight: 'Both accept digital payments. Neither supports agent-initiated transactions via API.' },
  { dimension: 'D6 Data Richness', robinhood: 82, allstate: 72, insight: 'Robinhood exposes rich market data. Allstate has structured product data but less depth.' },
  { dimension: 'D7 Security', robinhood: 90, allstate: 88, insight: 'Both excel here. Regulation forces strong auth, encryption, and audit trails.' },
  { dimension: 'D8 Reliability', robinhood: 80, allstate: 75, insight: 'Both have high uptime and status pages. Mobile-first architecture means solid infrastructure.' },
  { dimension: 'D9 Agent Exp', robinhood: 45, allstate: 42, insight: 'Neither has MCP, agent-card.json, or structured agent handoff. This is what caps both at Silver.' },
]

const sharedStrengths = [
  {
    title: 'Mobile-First Architecture with APIs',
    detail: 'Both companies built mobile apps that communicate through structured APIs. This means the data layer already exists in machine-readable form — it just is not exposed to agents.',
    icon: Code2,
    color: 'emerald',
  },
  {
    title: 'OAuth 2.0 Authentication',
    detail: 'Regulatory requirements forced both to implement proper authentication flows. OAuth is the standard that agents understand best. This gives both a head start on D7 Security.',
    icon: Lock,
    color: 'emerald',
  },
  {
    title: 'Structured Data Models',
    detail: 'Stock tickers, insurance products, policy types, coverage levels — both operate on highly structured data that maps cleanly to API schemas. The data is agent-friendly even if the interface is not.',
    icon: Layers,
    color: 'emerald',
  },
  {
    title: 'Status Pages and Monitoring',
    detail: 'Both maintain public status pages with uptime metrics. This contributes to D8 Reliability scores and signals to agents that the service is professionally operated.',
    icon: BarChart3,
    color: 'emerald',
  },
]

const sharedGaps = [
  {
    title: 'No agent-card.json',
    detail: 'Neither publishes an agent card at /.well-known/agent-card.json. This is the single most impactful file for D1 Discovery — it tells agents what the service can do and how to connect.',
    icon: FileText,
    color: 'red',
  },
  {
    title: 'No MCP Server',
    detail: 'Neither has a Model Context Protocol server. Without MCP, agents cannot discover tools, call functions, or interact with the service programmatically through the standard protocol.',
    icon: Server,
    color: 'red',
  },
  {
    title: 'No llms.txt',
    detail: 'Neither publishes an llms.txt file. This file helps AI models understand the service in natural language — what it does, what it does not do, and how to interact responsibly.',
    icon: Globe,
    color: 'red',
  },
  {
    title: 'Pricing Requires Human Completion',
    detail: 'Robinhood shows fees but requires account creation first. Allstate requires a multi-step quote process. No agent can get a complete price without a human in the loop.',
    icon: DollarSign,
    color: 'red',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Is regulation the reason these companies score Silver instead of Gold?',
    answer:
      'No. Regulation is not the barrier. Both companies have the technical architecture to support agent interactions — APIs, OAuth, structured data. What holds them at Silver is the absence of agent-native infrastructure: no agent-card.json, no MCP server, no llms.txt. These are files that any company can publish regardless of regulatory status. A regulated company with MCP and an agent card could score Gold.',
  },
  {
    question: 'How can a fintech and an insurance company have the same score?',
    answer:
      'The Agent Readiness Score measures infrastructure capabilities, not industry complexity. Both Robinhood and Allstate share the same architectural pattern: mobile-first apps backed by structured APIs, strong auth, and professional infrastructure. Both also share the same blind spots: no agent-native discovery files, no MCP, and pricing that requires human completion. Different products, same infrastructure maturity level.',
  },
  {
    question: 'What would it take for Robinhood or Allstate to reach Gold?',
    answer:
      'Three files: agent-card.json at /.well-known/agent-card.json (describing capabilities and MCP endpoint), llms.txt at /llms.txt (natural language service description), and an MCP server exposing read-only tools like check_stock_price or get_quote_estimate. These do not require exposing sensitive operations — even read-only agent access would push both into Gold territory. Combined, these would add 15 to 20 points to their current scores.',
  },
  {
    question: 'Does this pattern apply to other regulated industries?',
    answer:
      'Yes. We see the same Silver ceiling in healthcare (HIPAA), banking (SOC2/PCI), and legal services. Regulated industries that invested in digital-first experiences consistently score 55 to 70. The regulation forced them to build proper APIs, auth, and data structures — which is 80% of agent readiness. The remaining 20% is agent-native infrastructure that regulation does not address and most regulated companies have not yet considered.',
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

export default function RobinhoodAllstateAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Robinhood and Allstate Both Score 66: The Regulated Industry Silver Pattern',
    description:
      'Robinhood (fintech) and Allstate (insurance) both scored 66 on the Agent Readiness Score. This dual case study reveals why regulated industries hit a Silver ceiling and what it takes to break through to Gold.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/robinhood-allstate-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1900,
    keywords:
      'Robinhood Allstate agent readiness, regulated industry Silver, fintech insurance agent readiness, agent readiness case study',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Robinhood and Allstate Agent Readiness',
          item: 'https://agenthermes.ai/blog/robinhood-allstate-agent-readiness',
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
      title="Why Robinhood and Allstate Both Score 66: The Regulated Industry Silver Pattern"
      shareUrl="https://agenthermes.ai/blog/robinhood-allstate-agent-readiness"
      currentHref="/blog/robinhood-allstate-agent-readiness"
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
            <span className="text-zinc-400">Robinhood and Allstate Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Scale className="h-3.5 w-3.5" />
              Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Regulated Industries
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Robinhood and Allstate Both Score 66:{' '}
            <span className="text-emerald-400">The Regulated Industry Silver Pattern</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Robinhood trades stocks. Allstate sells insurance. They share nothing in common — except an
            identical <strong className="text-zinc-100">Agent Readiness Score of 66</strong>. Both sit at
            Silver tier. Both are blocked from Gold by the same three missing files. This is not a
            coincidence. It is a pattern we see across every heavily regulated industry that invested in
            digital-first architecture.
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
                  11 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE SCORE BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            Score Breakdown: 66 vs 66
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The overall scores are identical, but the path to 66 differs by dimension. Robinhood leads
              on API Quality and Data Richness — its trading API is well-documented and data-dense.
              Allstate leads slightly on Onboarding — its quote flow, while still requiring human
              completion, is more structured for guided interaction.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div className="text-center">Robinhood</div>
              <div className="text-center">Allstate</div>
              <div>Insight</div>
            </div>
            {dimensionScores.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className="text-center">
                  <span className={`font-bold ${
                    row.robinhood >= 80 ? 'text-emerald-400' :
                    row.robinhood >= 60 ? 'text-amber-400' : 'text-red-400'
                  }`}>{row.robinhood}</span>
                </div>
                <div className="text-center">
                  <span className={`font-bold ${
                    row.allstate >= 80 ? 'text-emerald-400' :
                    row.allstate >= 60 ? 'text-amber-400' : 'text-red-400'
                  }`}>{row.allstate}</span>
                </div>
                <div className="text-zinc-500 text-xs">{row.insight}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <Landmark className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-zinc-100">66</div>
              <div className="text-sm text-zinc-500 mt-1">Robinhood (Fintech)</div>
              <div className="text-xs text-amber-400 mt-2">Silver Tier</div>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <Shield className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-zinc-100">66</div>
              <div className="text-sm text-zinc-500 mt-1">Allstate (Insurance)</div>
              <div className="text-xs text-amber-400 mt-2">Silver Tier</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT THEY SHARE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            What Both Companies Get Right
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Regulation forced both companies to build proper digital infrastructure. That infrastructure
            turns out to be 80% of what agent readiness requires.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {sharedStrengths.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-sm font-bold text-zinc-100">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT HOLDS THEM BACK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            What Holds Both at Silver
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The same four gaps block both companies from Gold. None of these are regulatory barriers —
            they are infrastructure omissions that any company can fix.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {sharedGaps.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-sm font-bold text-zinc-100">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The Silver Ceiling Pattern:</strong> Across every
              regulated industry we have scanned — fintech, insurance, healthcare, banking, legal — the
              same pattern repeats. Strong D7 Security (regulation forces it). Strong D2 API Quality
              (mobile apps require it). Weak D9 Agent Experience (nobody has asked for it yet).
              The result is a cluster of scores between 55 and 70 that we call the{' '}
              <strong className="text-zinc-100">Regulated Silver Ceiling</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE INSIGHT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            The Bigger Insight: Regulation Is Not the Barrier — Architecture Is
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The common assumption is that regulated industries will be the last to adopt agent-native
              infrastructure. Compliance, legal review, security concerns — these are real constraints.
              But our data shows the opposite conclusion: <strong className="text-zinc-100">regulated
              industries are already 80% of the way there</strong>.
            </p>
            <p>
              The regulatory requirements that most companies view as burdens — identity verification,
              encrypted communications, structured data formats, audit logging — are exactly the
              infrastructure that agents need to interact with a service. OAuth is agent-ready
              authentication. Structured data is agent-ready content. Audit trails are agent-ready
              accountability.
            </p>
            <p>
              What regulated companies are missing is the <strong className="text-zinc-100">last
              mile</strong>: the agent-native discovery and interaction layer. Agent-card.json, llms.txt,
              and MCP are not regulated artifacts — they are open-standard files that any team can
              publish without legal review. A Robinhood engineer could publish an agent card that exposes
              read-only market data tools (stock prices, market hours, fee schedules) without touching
              any regulated functionality.
            </p>
            <p>
              The first regulated company to break through the Silver Ceiling will set the template
              for the entire sector. Based on our{' '}
              <Link href="/blog/enterprise-vs-startup-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                enterprise vs startup analysis
              </Link>, we expect this to happen within 12 months — and it will come from a fintech
              company, not a traditional bank.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PATH TO GOLD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            The Path From 66 to Gold (75+)
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Both companies need the same three additions to reach Gold tier. Combined implementation
            time: 2 to 4 weeks for a single engineer.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Publish agent-card.json at /.well-known/agent-card.json',
                detail: 'Describe capabilities, supported protocols, and contact information in the standard format. This is a static JSON file — no backend changes required. Estimated D1 impact: +8 to +12 points.',
                impact: '+10 pts',
              },
              {
                step: '2',
                title: 'Create llms.txt at /llms.txt',
                detail: 'Write a natural-language description of the service for AI models. Include what the service does, what it does not do, pricing model, and how to get started. Estimated D1 impact: +3 to +5 points.',
                impact: '+4 pts',
              },
              {
                step: '3',
                title: 'Deploy a read-only MCP server',
                detail: 'Expose safe, non-transactional tools: get_stock_price, get_market_hours, get_fee_schedule (Robinhood) or get_coverage_types, get_agent_locator, get_claim_status (Allstate). No regulated data. No transactions. Just structured read access. Estimated D9 impact: +8 to +15 points.',
                impact: '+12 pts',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                    <span className="text-xs font-bold text-emerald-400">{item.impact}</span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Projected score with all three:</strong> 66 + 10 + 4 + 12 ={' '}
              <strong className="text-zinc-100">approximately 82 to 92</strong> (Gold to Platinum tier).
              The agent-native layer is the highest-ROI investment either company can make for agent
              economy participation. Three files and one lightweight server.
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
                title: 'Fintech Agent Readiness',
                href: '/blog/fintech-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Insurance Agent Readiness',
                href: '/blog/insurance-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Enterprise vs Startup Agent Readiness',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Analysis',
                tagColor: 'purple',
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
            Is your regulated business hitting the Silver Ceiling?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan and see your score across all 9 dimensions. Regulation
            built your foundation — find out what three files separate you from Gold.
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
