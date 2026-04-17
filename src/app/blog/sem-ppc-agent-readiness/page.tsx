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
  Globe,
  HelpCircle,
  Layers,
  Megaphone,
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
  title: 'SEM and PPC Agent Readiness: Why Google Ads Has APIs But Most Ad Agencies Score Zero | AgentHermes',
  description:
    'Google Ads and Meta Ads have APIs. But the agencies managing them for clients have zero agent readiness. No structured reporting, no campaign performance endpoints, no budget management for AI agents. Learn what agent-ready ad management looks like.',
  keywords: [
    'SEM PPC ad agency agent readiness',
    'Google Ads API agent readiness',
    'PPC agent automation',
    'ad agency agent readiness score',
    'SEM agent readiness',
    'AI marketing agent ads',
    'PPC management API',
    'ad agency MCP server',
    'agent-ready advertising',
  ],
  openGraph: {
    title: 'SEM and PPC Agent Readiness: Why Google Ads Has APIs But Most Ad Agencies Score Zero',
    description:
      'The platforms have APIs. The agencies managing them do not. AI marketing agents will manage ad spend directly — agencies without structured endpoints lose control to platforms.',
    url: 'https://agenthermes.ai/blog/sem-ppc-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SEM and PPC Agent Readiness: Why Ad Agencies Score Zero',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEM and PPC Agent Readiness: Why Google Ads Has APIs But Most Ad Agencies Score Zero',
    description:
      'Google Ads API scores 65+. The agencies managing it for clients score zero. The agent economy is about to disintermediate ad agencies without APIs.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/sem-ppc-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const platformScores = [
  { platform: 'Google Ads API', score: 67, tier: 'Silver', color: 'text-blue-400' },
  { platform: 'Meta Ads API', score: 62, tier: 'Silver', color: 'text-blue-400' },
  { platform: 'LinkedIn Ads API', score: 54, tier: 'Bronze', color: 'text-amber-400' },
  { platform: 'TikTok Ads API', score: 48, tier: 'Bronze', color: 'text-amber-400' },
  { platform: 'Average Ad Agency', score: 8, tier: 'Dark', color: 'text-red-400' },
  { platform: 'Median Ad Agency', score: 3, tier: 'Dark', color: 'text-red-400' },
]

const agencyGaps = [
  {
    capability: 'Campaign Performance API',
    platform: 'Full REST API with real-time metrics, CTR, CPC, ROAS by campaign/ad group/keyword',
    agency: 'Monthly PDF report emailed to client. No structured data. No real-time access.',
    icon: BarChart3,
    color: 'red',
  },
  {
    capability: 'Budget Management Endpoint',
    platform: 'Programmatic budget allocation, daily caps, bid adjustments via API',
    agency: 'Client emails "increase budget to $5K/day." Agency manually adjusts in platform UI.',
    icon: DollarSign,
    color: 'red',
  },
  {
    capability: 'Creative Testing Automation',
    platform: 'A/B test creation, winner selection, asset management all via API',
    agency: 'Creative review in Slack/email. Manual upload. Winner picked by gut feel or delayed analysis.',
    icon: Layers,
    color: 'red',
  },
  {
    capability: 'Bid Strategy Optimization',
    platform: 'Smart bidding, target CPA, target ROAS — all configurable via API',
    agency: 'Agency "manages bids" by checking platform 2x daily. No structured bid strategy endpoint.',
    icon: TrendingUp,
    color: 'red',
  },
  {
    capability: 'Cross-Platform Reporting',
    platform: 'Each platform has its own API — agents can aggregate across all',
    agency: 'Agency manually pulls from each platform, combines in Google Sheets, sends screenshot.',
    icon: Globe,
    color: 'red',
  },
]

const agentReadyEndpoints = [
  {
    name: 'GET /api/campaigns/performance',
    description: 'Returns structured JSON with spend, impressions, clicks, conversions, ROAS, CPA by campaign, ad group, and keyword. Filterable by date range, platform, and campaign type.',
    impact: 'D2 API +20, D6 Data +15',
  },
  {
    name: 'POST /api/budgets/allocate',
    description: 'Accepts budget changes with campaign_id, daily_cap, and effective_date. Returns confirmation with projected impact. Supports bulk operations across platforms.',
    impact: 'D2 API +15, D5 Payment +10',
  },
  {
    name: 'GET /api/creative/tests',
    description: 'Returns active A/B tests with variant performance, statistical significance, and recommended winner. Supports auto-selection when confidence threshold is met.',
    impact: 'D2 API +10, D9 AgentExp +15',
  },
  {
    name: 'POST /api/reports/generate',
    description: 'Generates cross-platform performance reports in structured JSON. Includes period-over-period comparison, anomaly detection, and optimization recommendations.',
    impact: 'D6 Data +20, D8 Reliability +10',
  },
  {
    name: 'GET /api/optimization/suggestions',
    description: 'Returns ranked list of optimization opportunities with estimated impact, confidence level, and one-click implementation endpoint. Structured for agent decision-making.',
    impact: 'D9 AgentExp +20, D2 API +10',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do ad platforms score high but ad agencies score zero?',
    answer:
      'Ad platforms (Google Ads, Meta Ads) are engineering companies that built APIs as core products. Ad agencies are service businesses that wrap human expertise around those platforms. The agency value prop has always been human judgment — but they expose zero structured data about their work. No campaign performance API, no budget management endpoint, no creative testing automation. The platform has everything an agent needs. The agency adds a human layer with no machine interface.',
  },
  {
    question: 'Will AI agents replace ad agencies?',
    answer:
      'Not entirely, but they will replace the commodity parts. Budget allocation, bid management, performance reporting, A/B test management — these are already algorithmic. Agencies that survive will do two things: (1) provide strategic and creative value that agents cannot replicate, and (2) build agent-ready interfaces so AI marketing agents can execute the commodity work automatically while the agency focuses on strategy. Agencies without APIs become unnecessary middlemen between the client and the platform.',
  },
  {
    question: 'What is an agent-ready ad agency?',
    answer:
      'An agent-ready ad agency exposes structured endpoints for campaign performance, budget management, creative testing, bid optimization, and cross-platform reporting. An AI marketing agent can call these endpoints to get real-time performance data, adjust budgets, launch tests, and generate reports — without emailing anyone or waiting for a monthly PDF. The agency still provides strategic oversight, but the execution layer is fully automated and agent-accessible.',
  },
  {
    question: 'How does this affect my Agent Readiness Score?',
    answer:
      'If you are an ad agency, your score likely sits between 0-15 right now. Adding structured campaign performance endpoints would push D2 (API) from near-zero to 60+. Adding agent-card.json and llms.txt with your service descriptions pushes D1 (Discovery) to 40+. A basic MCP server with campaign tools could take you from Dark (0-19) to Bronze (40-59) in a single sprint. Run a free scan at /audit to see your current score.',
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

export default function SemPpcAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SEM and PPC Agent Readiness: Why Google Ads Has APIs But Most Ad Agencies Score Zero',
    description:
      'Google Ads and Meta Ads have APIs but the agencies managing them have zero agent readiness. AI marketing agents will manage ad spend directly — agencies without structured endpoints lose control.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/sem-ppc-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Market Analysis',
    wordCount: 1800,
    keywords:
      'SEM PPC ad agency agent readiness, Google Ads API, PPC agent automation, ad agency MCP server',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'SEM PPC Agent Readiness',
          item: 'https://agenthermes.ai/blog/sem-ppc-agent-readiness',
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
      title="SEM and PPC Agent Readiness: Why Google Ads Has APIs But Most Ad Agencies Score Zero"
      shareUrl="https://agenthermes.ai/blog/sem-ppc-agent-readiness"
      currentHref="/blog/sem-ppc-agent-readiness"
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
            <span className="text-zinc-400">SEM PPC Agent Readiness</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Megaphone className="h-3.5 w-3.5" />
              Market Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Avg Score: 8/100
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            SEM and PPC Agent Readiness: Why Google Ads Has APIs But{' '}
            <span className="text-emerald-400">Most Ad Agencies Score Zero</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Google Ads has a REST API with 200+ endpoints. Meta Ads has the Marketing API. LinkedIn,
            TikTok, Pinterest — every major ad platform is fully programmable. But the 25,000+ agencies
            managing those platforms for clients? <strong className="text-zinc-100">Average agent readiness
            score: 8 out of 100</strong>. The platforms are agent-ready. The agencies are not. AI
            marketing agents are about to route around the middleman.
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
                  14 min read
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
            <Target className="h-5 w-5 text-amber-500" />
            The Platform vs Agency Paradox
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Here is the irony of the digital advertising industry in 2026. The ad platforms — Google Ads,
              Meta Ads, LinkedIn Ads — have been API-first for over a decade. Google Ads alone exposes
              200+ REST endpoints covering campaigns, ad groups, keywords, budgets, bidding strategies,
              creative assets, and reporting. Every single thing a human does in the Google Ads UI can be
              done programmatically.
            </p>
            <p>
              Now look at the 25,000+ agencies that manage Google Ads for clients. Their client-facing
              interface is email. Their reporting format is PDF. Their budget change workflow is a Slack
              message followed by a human logging into the platform. They sit on top of the most
              programmable advertising infrastructure ever built and expose{' '}
              <strong className="text-zinc-100">zero structured endpoints</strong> to their clients.
            </p>
            <p>
              When an AI marketing agent needs to check campaign performance, adjust a budget, or launch
              an A/B test, it can talk directly to Google Ads. It cannot talk to the agency. This is not a
              technology problem — it is a business model problem. And AI agents are about to solve it by
              making the agency layer optional.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {[
              { value: '67', label: 'Google Ads API Score', icon: Search },
              { value: '62', label: 'Meta Ads API Score', icon: Globe },
              { value: '8', label: 'Avg Ad Agency Score', icon: Megaphone },
              { value: '25K+', label: 'US Ad Agencies', icon: Target },
              { value: '$250B', label: 'US Digital Ad Spend', icon: DollarSign },
              { value: '0', label: 'Agencies with MCP Servers', icon: Server },
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

      {/* ===== PLATFORM SCORES TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Platform vs Agency Score Comparison
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every major ad platform scores Silver or Bronze for agent readiness. The agencies wrapping
            those platforms score Dark — the lowest possible tier.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Platform / Agency</div>
              <div className="text-center">Score</div>
              <div className="text-center">Tier</div>
              <div className="text-center">Agent-Accessible</div>
            </div>
            {platformScores.map((row, i) => (
              <div
                key={row.platform}
                className={`grid grid-cols-4 p-4 text-sm items-center ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.platform}</div>
                <div className={`text-center font-bold ${row.color}`}>{row.score}/100</div>
                <div className={`text-center ${row.color}`}>{row.tier}</div>
                <div className="text-center">
                  {row.score > 40 ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mx-auto" />
                  ) : (
                    <Shield className="h-4 w-4 text-red-400 mx-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-red-400">The disintermediation risk is real.</strong> When an AI
              marketing agent can call <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">
              google.ads.campaigns.get()</code> directly but cannot call{' '}
              <code className="text-red-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">
              myagency.com/api/performance</code> because it does not exist, the agent will skip the
              agency entirely. The value of managing complexity disappears when AI agents handle
              complexity natively.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE 5 GAPS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-red-500" />
            5 Capabilities Platforms Have That Agencies Do Not Expose
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every one of these capabilities exists in the platform API. Agencies use them internally
            but expose none of them to clients or agents.
          </p>

          <div className="space-y-4 mb-8">
            {agencyGaps.map((gap) => {
              const colors = getColorClasses(gap.color)
              return (
                <div
                  key={gap.capability}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <gap.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{gap.capability}</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                      <p className="text-xs text-emerald-400 font-medium mb-1">Platform API</p>
                      <p className="text-sm text-zinc-400 leading-relaxed">{gap.platform}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                      <p className="text-xs text-red-400 font-medium mb-1">Typical Agency</p>
                      <p className="text-sm text-zinc-400 leading-relaxed">{gap.agency}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What an Agent-Ready Ad Agency Looks Like
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              An agent-ready ad agency does not replace its strategic value with an API. It exposes the
              commodity work — reporting, budget adjustments, test management — through structured
              endpoints while keeping strategic planning, creative direction, and client relationships
              as human-driven differentiators. Here are the five endpoints that would transform an
              agency from Dark to Bronze.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {agentReadyEndpoints.map((endpoint) => (
              <div
                key={endpoint.name}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <code className="text-emerald-400 text-sm font-mono">{endpoint.name}</code>
                  <span className="text-xs text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded">
                    {endpoint.impact}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{endpoint.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              With these five endpoints, an agency&apos;s score jumps from 8 to roughly 52 — from Dark
              to Bronze. Add an{' '}
              <Link href="/blog/agents-md-file-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                AGENTS.md
              </Link>{' '}
              file and an{' '}
              <Link href="/blog/agent-card-json-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                agent-card.json
              </Link>{' '}
              and you hit Silver. The investment is a single sprint. The alternative is watching AI
              marketing agents bypass you entirely and talk to Google Ads directly on behalf of your
              clients.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE DISRUPTION TIMELINE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            The Disruption Timeline
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The shift is already happening. AI marketing agents are being deployed by companies with
              in-house teams that previously outsourced to agencies. Here is the timeline based on
              current adoption curves.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                phase: 'Now',
                title: 'Early AI agents manage simple campaigns directly via platform APIs',
                detail: 'Companies with technical teams use AI agents to manage Google Ads and Meta Ads directly. Agencies lose budget-management-only clients first. The clients who hired an agency to "set up and monitor ads" discover agents can do that for free.',
              },
              {
                phase: '2027',
                title: 'AI agents handle cross-platform optimization without agencies',
                detail: 'Multi-platform agents aggregate performance across Google, Meta, LinkedIn, and TikTok — the exact cross-platform reporting agencies charge $5K/month to provide. Agencies without structured APIs lose mid-market clients.',
              },
              {
                phase: '2028',
                title: 'Only strategy-first agencies survive without agent readiness',
                detail: 'Agencies that provide only execution services (bid management, budget allocation, reporting) are fully replaced by AI agents. Surviving agencies differentiate on brand strategy, creative production, and market intelligence — and expose execution layers through agent-ready APIs.',
              },
            ].map((item) => (
              <div
                key={item.phase}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
                  {item.phase}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-purple-400">The first-mover advantage is enormous.</strong> The
              first agency in each metro market to become agent-ready captures every AI marketing agent&apos;s
              ad management requests. When a CMO tells their AI assistant to &ldquo;find me an agency
              that can manage our Google Ads programmatically,&rdquo; the agent-ready agency is the only
              result. Read more about this in our{' '}
              <Link href="/blog/cmo-guide-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                CMO Guide to Agent Readiness
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
                title: 'Marketing Agencies Agent Readiness: The Full Vertical Analysis',
                href: '/blog/marketing-agencies-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'The CMO Guide to Agent Readiness',
                href: '/blog/cmo-guide-agent-readiness',
                tag: 'Guide',
                tagColor: 'emerald',
              },
              {
                title: 'Get Your Free Agent Readiness Score',
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
            Is your ad agency agent-ready?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free scan to see your Agent Readiness Score across all 9 dimensions. Most ad
            agencies score under 15. See exactly where to start.
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
              Connect My Agency
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
