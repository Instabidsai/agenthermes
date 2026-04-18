import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  HelpCircle,
  Layers,
  Network,
  Search,
  Server,
  Shield,
  ShieldCheck,
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
  title:
    'Why OpsGenie Scores 67: The Incident Management Platform That Is Almost Gold | AgentHermes',
  description:
    'OpsGenie scored 67 Silver on the Agent Readiness Score. Strong REST API, OAuth, webhooks, and alert management — but missing agent-card.json, MCP, and transparent pricing. A case study in the Silver-to-Gold gap.',
  keywords: [
    'OpsGenie agent readiness score incident management',
    'OpsGenie API readiness',
    'incident management agent readiness',
    'OpsGenie MCP',
    'OpsGenie score 67',
    'agent readiness case study',
    'incident management AI agent',
    'OpsGenie Silver tier',
  ],
  openGraph: {
    title:
      'Why OpsGenie Scores 67: The Incident Management Platform That Is Almost Gold',
    description:
      'OpsGenie scored 67 Silver. REST API, OAuth, webhooks — all strong. But no agent-card, no MCP, enterprise pricing opacity. Here is the full breakdown.',
    url: 'https://agenthermes.ai/blog/opsgenie-agent-readiness-breakdown',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why OpsGenie Scores 67: Agent Readiness Breakdown',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why OpsGenie Scores 67 Silver on Agent Readiness',
    description:
      'Full 9-dimension breakdown of OpsGenie. Strong API, OAuth, webhooks. Missing: agent-card, MCP, transparent pricing. What separates Silver from Gold.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/opsgenie-agent-readiness-breakdown',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionScores = [
  {
    dimension: 'D1 Discovery',
    score: 11,
    maxScore: 15,
    verdict: 'Strong',
    detail:
      'Comprehensive API documentation at developer.atlassian.com. OpenAPI spec available. Indexed by search engines. Missing: agent-card.json, llms.txt.',
    color: 'emerald',
  },
  {
    dimension: 'D2 API Quality',
    score: 13,
    maxScore: 15,
    verdict: 'Excellent',
    detail:
      'RESTful design with consistent resource naming. CRUD on alerts, incidents, schedules, escalations, teams. Proper HTTP status codes. Pagination. Rate limit headers.',
    color: 'emerald',
  },
  {
    dimension: 'D3 Onboarding',
    score: 7,
    maxScore: 10,
    verdict: 'Good',
    detail:
      'Self-service API key generation. OAuth 2.0 via Atlassian. SDK in 4 languages. Getting-started guide. No instant sandbox — requires Atlassian account.',
    color: 'emerald',
  },
  {
    dimension: 'D4 Pricing',
    score: 3,
    maxScore: 10,
    verdict: 'Weak',
    detail:
      'Atlassian enterprise pricing model. "Contact sales" for most plans. Free tier exists but limited. No per-API-call pricing. Agent cannot determine cost programmatically.',
    color: 'red',
  },
  {
    dimension: 'D5 Payment',
    score: 5,
    maxScore: 10,
    verdict: 'Partial',
    detail:
      'Atlassian Marketplace handles billing. No per-call payment. No x402 or micropayment support. Subscription-based.',
    color: 'amber',
  },
  {
    dimension: 'D6 Data Quality',
    score: 8,
    maxScore: 10,
    verdict: 'Strong',
    detail:
      'Consistent JSON responses. Typed fields with documented schemas. Minimal response bloat. Proper null handling. Enums for alert priorities and statuses.',
    color: 'emerald',
  },
  {
    dimension: 'D7 Security',
    score: 11,
    maxScore: 15,
    verdict: 'Strong',
    detail:
      'OAuth 2.0 + API key auth. TLS enforced. Rate limiting with clear headers. IP restriction available. Webhook signature verification. RBAC.',
    color: 'emerald',
  },
  {
    dimension: 'D8 Reliability',
    score: 9,
    maxScore: 10,
    verdict: 'Excellent',
    detail:
      'Atlassian infrastructure. Status page with incident history. 99.9% SLA. Webhooks for async events. Retry-friendly idempotent operations.',
    color: 'emerald',
  },
  {
    dimension: 'D9 Agent Experience',
    score: 0,
    maxScore: 10,
    verdict: 'Missing',
    detail:
      'No agent-card.json. No MCP server. No llms.txt. No A2A protocol support. No agent-specific documentation or onboarding. Zero agent-native features.',
    color: 'red',
  },
]

const agentUseCases = [
  {
    useCase: 'Incident Creation',
    description:
      'Agent detects anomaly in monitoring data and creates an OpsGenie alert with severity, description, and affected services. Tags the right team automatically.',
    feasibility: 'Fully supported today via REST API',
    color: 'emerald',
  },
  {
    useCase: 'Alert Acknowledgment',
    description:
      'Agent acknowledges an alert on behalf of the on-call engineer after verifying the issue is known and being worked. Reduces alert fatigue.',
    feasibility: 'Fully supported via alert API',
    color: 'emerald',
  },
  {
    useCase: 'Escalation Management',
    description:
      'Agent monitors alert age and auto-escalates if not acknowledged within SLA. Can escalate to the next tier in the on-call schedule.',
    feasibility: 'Supported via escalation + schedule APIs',
    color: 'emerald',
  },
  {
    useCase: 'Incident Resolution',
    description:
      'Agent runs automated remediation (restart service, scale resources), verifies fix via health check, then closes the OpsGenie alert with resolution notes.',
    feasibility: 'Supported — close alert + add notes via API',
    color: 'emerald',
  },
  {
    useCase: 'On-Call Discovery',
    description:
      'Agent queries who is currently on-call for a specific team or schedule. Routes communications to the right person without human lookup.',
    feasibility: 'Fully supported via schedule API',
    color: 'emerald',
  },
  {
    useCase: 'Multi-Agent Coordination',
    description:
      'Multiple AI agents across different services coordinate incident response through OpsGenie as the shared state layer. Agent A creates alert, Agent B acknowledges, Agent C resolves.',
    feasibility: 'Architecturally possible but no MCP/A2A discovery',
    color: 'amber',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why is OpsGenie a natural target for AI agents?',
    answer:
      'Incident management is inherently time-critical and follows structured workflows: detect, alert, acknowledge, triage, escalate, resolve, post-mortem. Every step maps to an API call. AI agents can execute this workflow faster than humans, 24/7, without alert fatigue. OpsGenie already has the APIs — it just needs agent discovery infrastructure.',
  },
  {
    question: 'What would it take for OpsGenie to reach Gold (75+)?',
    answer:
      'Three things: (1) Publish an agent-card.json at /.well-known/agent-card.json describing available capabilities. (2) Create an MCP server wrapping the top 10 API endpoints — create_alert, acknowledge_alert, escalate, resolve, get_on_call, list_incidents, add_note, get_schedule, list_teams, get_alert. (3) Add an llms.txt file summarizing API capabilities for AI consumption. These three files would add 8-10 points to the score.',
  },
  {
    question: 'How does OpsGenie compare to PagerDuty on agent readiness?',
    answer:
      'Both score in the Silver tier (60-74). They share the same strengths — strong REST APIs, OAuth, webhooks — and the same gaps — no agent-card, no MCP, enterprise pricing. The incident management vertical is ripe for agent-native features because the workflows are so structured, but no player has moved yet.',
  },
  {
    question: 'Can I use OpsGenie with AI agents today?',
    answer:
      'Yes. OpsGenie has a fully functional REST API that any agent can call directly. The gap is in discovery — agents cannot automatically find and understand OpsGenie capabilities without custom integration code. You need to manually wire the API endpoints into your agent framework. With an MCP server, this would be automatic.',
  },
  {
    question: 'Why does D4 Pricing score so low?',
    answer:
      'Atlassian uses enterprise pricing with "contact sales" for most plans. An AI agent cannot determine what OpsGenie costs without a human sales conversation. This is a common pattern in enterprise SaaS — and it drops the D4 Pricing score significantly. Agent-ready pricing means the agent can programmatically determine cost-per-call or subscription price.',
  },
]

function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    red: {
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    amber: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    blue: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OpsGenieAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Why OpsGenie Scores 67: The Incident Management Platform That Is Almost Gold',
    description:
      'Full 9-dimension Agent Readiness Score breakdown for OpsGenie. 67 Silver — strong API, OAuth, webhooks, but missing agent-card.json, MCP, and transparent pricing.',
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
      'https://agenthermes.ai/blog/opsgenie-agent-readiness-breakdown',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1800,
    keywords:
      'OpsGenie, agent readiness score, incident management, agent readiness case study, Silver tier, MCP, agent-card.json',
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
          name: 'OpsGenie Agent Readiness',
          item: 'https://agenthermes.ai/blog/opsgenie-agent-readiness-breakdown',
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

  const totalScore = dimensionScores.reduce((sum, d) => sum + d.score, 0)

  return (
    <BlogArticleWrapper
      title="Why OpsGenie Scores 67: The Incident Management Platform That Is Almost Gold"
      shareUrl="https://agenthermes.ai/blog/opsgenie-agent-readiness-breakdown"
      currentHref="/blog/opsgenie-agent-readiness-breakdown"
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
              <Link
                href="/"
                className="hover:text-zinc-300 transition-colors"
              >
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
              <span className="text-zinc-400">OpsGenie Agent Readiness</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                <Bell className="h-3.5 w-3.5" />
                Case Study
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                Score: 67 Silver
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Why OpsGenie Scores 67:{' '}
              <span className="text-emerald-400">
                The Incident Management Platform That Is Almost Gold
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              OpsGenie is built for exactly the kind of structured, time-critical
              workflows that AI agents excel at. Create alerts, acknowledge
              incidents, escalate to on-call, resolve with notes — every step
              maps cleanly to an API call. It scored{' '}
              <strong className="text-zinc-100">67 Silver</strong> on the
              Agent Readiness Score. That is 8 points from Gold. The gap is
              not in the API — it is in the{' '}
              <strong className="text-zinc-100">agent discovery layer</strong>{' '}
              that does not exist yet.
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

        {/* ===== SCORE OVERVIEW ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-500" />
              Score Overview: {totalScore}/100 Silver
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                OpsGenie scores in the top quartile of all businesses we have
                scanned — well above the 43/100 cross-industry average. Its
                strengths are concentrated in the dimensions that matter
                most: API Quality (D2), Security (D7), and Reliability (D8)
                account for 43% of the total score weight, and OpsGenie
                performs excellently in all three.
              </p>
              <p>
                The score tells a story of a platform that was built right for
                developers but has not yet adapted to the agent economy. The
                API is there. The infrastructure is solid. What is missing is
                the agent discovery and experience layer — the files and
                protocols that let AI agents find and understand OpsGenie
                capabilities without reading documentation.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '67', label: 'Agent Readiness Score', icon: Target },
                { value: 'Silver', label: 'ARL Tier', icon: ShieldCheck },
                {
                  value: '6/9',
                  label: 'dimensions Strong+',
                  icon: CheckCircle2,
                },
                { value: '8 pts', label: 'from Gold', icon: TrendingUp },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== DIMENSION BREAKDOWN ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-500" />
              Full 9-Dimension Breakdown
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Each dimension is scored independently. Green dimensions are
              strengths, amber are adequate, and red are gaps that prevent
              Gold status.
            </p>

            <div className="space-y-4 mb-8">
              {dimensionScores.map((dim) => {
                const colors = getColorClasses(dim.color)
                const pct = Math.round((dim.score / dim.maxScore) * 100)
                return (
                  <div
                    key={dim.dimension}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-zinc-100">
                          {dim.dimension}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium`}
                        >
                          {dim.verdict}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className={`text-lg font-bold ${colors.text}`}>
                          {dim.score}
                        </span>
                        <span className="text-zinc-600">
                          /{dim.maxScore}
                        </span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-zinc-800 rounded-full mb-3">
                      <div
                        className={`h-2 rounded-full ${dim.color === 'emerald' ? 'bg-emerald-500' : dim.color === 'amber' ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {dim.detail}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== WHY INCIDENT MANAGEMENT IS A NATURAL AGENT TARGET ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Why Incident Management Is a Natural Agent Target
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Not every SaaS platform is equally suited for AI agent
                interaction. Incident management platforms like OpsGenie are
                unusually well-matched because the domain has three properties
                that agents thrive on: structured workflows, time pressure,
                and 24/7 requirements.
              </p>
              <p>
                A human on-call engineer gets paged at 3 AM, spends 5 minutes
                understanding the alert, runs a diagnostic playbook, applies a
                fix, and closes the incident. An AI agent does the same
                sequence in 30 seconds — and never experiences alert fatigue,
                never misreads a runbook, and never sleeps through a page.
              </p>
              <p>
                The{' '}
                <Link
                  href="/blog/developer-tools-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  developer tools vertical
                </Link>{' '}
                already leads agent readiness scores across our database, with
                an average of 52/100 versus 43/100 cross-industry. Incident
                management platforms score even higher within this vertical
                because their APIs are inherently action-oriented — not just
                data retrieval, but state transitions: create, acknowledge,
                escalate, resolve.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {agentUseCases.map((uc) => {
                const colors = getColorClasses(uc.color)
                return (
                  <div
                    key={uc.useCase}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4 text-emerald-400" />
                      <h3 className="font-bold text-zinc-100 text-sm">
                        {uc.useCase}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-2">
                      {uc.description}
                    </p>
                    <p className="text-xs">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} font-medium`}
                      >
                        {uc.feasibility}
                      </span>
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== WHAT SEPARATES 67 FROM 75 ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-500" />
              What Separates 67 From 75: The Path to Gold
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                OpsGenie needs 8 points to reach Gold. Here is where those
                points come from — and why the platform is uniquely positioned
                to claim them.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                {
                  action: 'Publish agent-card.json',
                  points: '+3 points (D9)',
                  effort: 'Low — single JSON file at /.well-known/agent-card.json',
                  detail:
                    'Describe available capabilities: alert management, schedule queries, incident lifecycle, team management. Include auth requirements and endpoint base URL. This is the single highest-ROI action for agent readiness.',
                },
                {
                  action: 'Deploy an MCP server',
                  points: '+4 points (D9 + D1)',
                  effort: 'Medium — wrap top 10 API endpoints',
                  detail:
                    'Create an MCP server with tools for create_alert, acknowledge_alert, escalate, resolve, get_on_call, list_incidents, add_note, get_schedule, list_teams, and get_alert_count. OpsGenie is perfect for MCP because incident management is pure tool-calling.',
                },
                {
                  action: 'Add llms.txt',
                  points: '+1 point (D1)',
                  effort: 'Low — single text file summarizing API capabilities',
                  detail:
                    'A plain-text file at /llms.txt that describes what OpsGenie does, what API endpoints are available, and how agents should authenticate. Takes 30 minutes to write.',
                },
                {
                  action: 'Transparent pricing page',
                  points: '+2 points (D4)',
                  effort:
                    'Business decision — requires pricing strategy change',
                  detail:
                    'Publish per-seat or per-call pricing that an agent can read programmatically. This is harder because it requires an Atlassian-level business decision, but it directly impacts the D4 Pricing score.',
                },
              ].map((item) => (
                <div
                  key={item.action}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-zinc-100 text-sm">
                      {item.action}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                      {item.points}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">
                    {item.detail}
                  </p>
                  <p className="text-xs text-zinc-600">
                    Effort: {item.effort}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">
                  The irony of OpsGenie&apos;s position:
                </strong>{' '}
                Incident management platforms exist to enable faster response to
                system issues. AI agents are the fastest possible responders.
                Yet OpsGenie has not built the discovery infrastructure that
                would let agents find it. The platform that would benefit most
                from agent adoption is missing the files that enable it. This
                parallels what we found in{' '}
                <Link
                  href="/blog/status-page-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  status page agent readiness
                </Link>{' '}
                and{' '}
                <Link
                  href="/blog/reliability-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  reliability agent readiness
                </Link>{' '}
                — the infrastructure tools closest to agent-native workflows
                are paradoxically the slowest to adopt agent discovery protocols.
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
                  title:
                    'Developer Tools Agent Readiness: Why Dev Tools Lead the Pack',
                  href: '/blog/developer-tools-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Status Page Agent Readiness: Monitoring for Agents',
                  href: '/blog/status-page-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Reliability Agent Readiness: D8 Deep Dive',
                  href: '/blog/reliability-agent-readiness',
                  tag: 'Dimension Deep Dive',
                  tagColor: 'cyan',
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
              How does your platform compare?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run a free Agent Readiness Scan on any SaaS platform, API, or
              business. See your 9-dimension score and learn exactly what is
              needed to reach the next tier.
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
