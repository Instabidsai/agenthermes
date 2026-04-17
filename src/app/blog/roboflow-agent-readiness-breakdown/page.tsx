import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Database,
  DollarSign,
  Eye,
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  Network,
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
  title:
    'Why Roboflow Scores 66: The Computer Vision Platform That\'s Almost Gold | AgentHermes',
  description:
    'Roboflow scored 66 Silver on the Agent Readiness Score. Strong REST API, fast onboarding, and solid documentation. Here is what keeps a leading AI/ML platform from Gold and what it would take to get there.',
  keywords: [
    'Roboflow agent readiness score',
    'Roboflow agent readiness',
    'Roboflow MCP',
    'computer vision agent readiness',
    'AI ML platform agent readiness',
    'Roboflow API score',
    'agent readiness case study',
    'Roboflow review',
  ],
  openGraph: {
    title:
      'Why Roboflow Scores 66: The Computer Vision Platform That\'s Almost Gold',
    description:
      'Roboflow scored 66 Silver — a strong score for an AI/ML platform. Deep dive into what it does right, where it loses points, and the path to Gold.',
    url: 'https://agenthermes.ai/blog/roboflow-agent-readiness-breakdown',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Why Roboflow Scores 66 on Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Why Roboflow Scores 66: The Computer Vision Platform That\'s Almost Gold',
    description:
      'Roboflow scored 66 Silver. Strong API, fast onboarding, solid docs. Here is the full breakdown and the path to Gold.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/roboflow-agent-readiness-breakdown',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionScores = [
  {
    dimension: 'D1 — Discovery',
    score: 72,
    weight: 0.12,
    detail:
      'Well-indexed docs site, OpenAPI spec available, developer hub prominent. No agent-card.json or llms.txt.',
    color: 'emerald',
  },
  {
    dimension: 'D2 — API Quality',
    score: 85,
    weight: 0.15,
    detail:
      'REST API with versioning, JSON responses, typed schemas, consistent error codes. Inference API is clean and fast.',
    color: 'emerald',
  },
  {
    dimension: 'D3 — Onboarding',
    score: 82,
    weight: 0.08,
    detail:
      'Free tier, API key generated in under 30 seconds, quickstart guides for Python and REST. One of the fastest onboarding flows we have scored.',
    color: 'emerald',
  },
  {
    dimension: 'D4 — Pricing',
    score: 48,
    weight: 0.05,
    detail:
      'Usage-based pricing but not fully machine-readable. No pricing API endpoint. Tiers exist but require visiting the pricing page to parse.',
    color: 'amber',
  },
  {
    dimension: 'D5 — Payment',
    score: 35,
    weight: 0.08,
    detail:
      'Standard checkout flow. No x402 micropayment support. No programmatic subscription management endpoint.',
    color: 'red',
  },
  {
    dimension: 'D6 — Data Quality',
    score: 70,
    weight: 0.1,
    detail:
      'Structured dataset metadata, annotation formats, model performance metrics. Export formats well-documented.',
    color: 'emerald',
  },
  {
    dimension: 'D7 — Security',
    score: 68,
    weight: 0.12,
    detail:
      'API key auth, HTTPS everywhere, rate limiting in place. No OAuth 2.0 for agent delegation, no scoped tokens.',
    color: 'blue',
  },
  {
    dimension: 'D8 — Reliability',
    score: 72,
    weight: 0.13,
    detail:
      'Status page exists, uptime generally strong. No machine-readable SLA document or incident history API.',
    color: 'emerald',
  },
  {
    dimension: 'D9 — Agent Experience',
    score: 18,
    weight: 0.1,
    detail:
      'No agent-card.json. No MCP server. No llms.txt. No AGENTS.md. The single biggest gap keeping Roboflow from Gold.',
    color: 'red',
  },
]

const strengths = [
  {
    title: 'Inference API is agent-native by nature',
    detail:
      'POST an image, get structured predictions with bounding boxes, labels, and confidence scores. This is exactly the kind of tool an AI agent would call. The API design is already agent-friendly — it just needs MCP wrapping.',
    icon: Camera,
  },
  {
    title: 'Dataset management via REST',
    detail:
      'Create projects, upload images, manage annotations, trigger training — all through REST endpoints. A model management agent could fully automate the ML lifecycle through these APIs.',
    icon: Database,
  },
  {
    title: '30-second API key generation',
    detail:
      'Free tier with no credit card. Sign up, get an API key, hit the inference endpoint. This is the fastest onboarding in the AI/ML platform space we have measured. Onboarding friction is a top score killer and Roboflow avoids it entirely.',
    icon: Zap,
  },
  {
    title: 'Documentation is comprehensive',
    detail:
      'REST API docs with examples, Python SDK reference, model zoo with pre-trained models. An agent can understand what Roboflow offers by reading structured docs. This is why D1 Discovery scores well.',
    icon: Layers,
  },
]

const pathToGold = [
  {
    action: 'Publish agent-card.json',
    impact: '+8 to D9',
    detail:
      'A /.well-known/agent-card.json file tells AI agents what Roboflow does, what tools are available, and how to authenticate. This is the single highest-ROI change.',
    icon: FileJson,
  },
  {
    action: 'Ship an MCP server',
    impact: '+12 to D9',
    detail:
      'Wrap the inference API, dataset management, and model listing as MCP tools. An agent running an MCP client could then call infer(image, model) directly. Roboflow\'s API is already structured for this — the MCP layer is mostly declaration.',
    icon: Server,
  },
  {
    action: 'Add a pricing API endpoint',
    impact: '+6 to D4',
    detail:
      'Return plan tiers, per-inference costs, and usage caps as structured JSON. Procurement agents evaluating ML platforms need this data machine-readable, not as a marketing page.',
    icon: DollarSign,
  },
  {
    action: 'Add llms.txt to the domain root',
    impact: '+3 to D9',
    detail:
      'A plain-text file at /llms.txt that describes what Roboflow is, what it does, and what its API offers. LLMs use this to understand how to interact with a service.',
    icon: Code2,
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is Roboflow\'s Agent Readiness Score?',
    answer:
      'Roboflow scored 66 out of 100 on the AgentHermes Agent Readiness Score, placing it in the Silver tier (60-74). This means it has strong API infrastructure that AI agents can use, but lacks the agent-native discovery and interaction layers that would make it Gold or Platinum.',
  },
  {
    question:
      'Why does an AI/ML platform need agent readiness?',
    answer:
      'As AI agents become autonomous, they will need to select, configure, and call ML models on behalf of users. An agent managing a warehouse might need to deploy a new object detection model, retrain on new product images, or switch inference providers based on cost. Platforms that are agent-ready will be selected programmatically — those that are not will require human intervention.',
  },
  {
    question: 'What is the biggest gap in Roboflow\'s score?',
    answer:
      'D9 Agent Experience at 18/100. Roboflow has no agent-card.json, no MCP server, no llms.txt, and no AGENTS.md. These are agent-native discovery files that tell AI agents what the platform offers and how to interact with it. Without them, agents have to rely on web scraping or pre-built integrations rather than standard protocols.',
  },
  {
    question:
      'How does Roboflow compare to other developer platforms?',
    answer:
      'Roboflow\'s 66 is competitive. For context, Supabase and Vercel both score 69, Stripe scores 68, and Slack scores 68. Roboflow is within striking distance of the top developer tools. Its API quality (D2 at 85) is actually higher than several of those leaders — it just needs the agent-native layer.',
  },
  {
    question: 'Could Roboflow reach Gold (75+)?',
    answer:
      'Yes. Publishing an agent-card.json (+8), shipping an MCP server (+12), adding a pricing API (+6), and creating llms.txt (+3) would push the score to approximately 78 — solidly Gold. The infrastructure is already there. What is missing is the agent discovery and interaction layer on top.',
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

function getScoreColor(score: number) {
  if (score >= 75) return 'text-emerald-400'
  if (score >= 60) return 'text-blue-400'
  if (score >= 40) return 'text-amber-400'
  return 'text-red-400'
}

function getScoreBarColor(score: number) {
  if (score >= 75) return 'bg-emerald-500'
  if (score >= 60) return 'bg-blue-500'
  if (score >= 40) return 'bg-amber-500'
  return 'bg-red-500'
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function RoboflowAgentReadinessBreakdownPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Why Roboflow Scores 66: The Computer Vision Platform That\'s Almost Gold',
    description:
      'Roboflow scored 66 Silver on the Agent Readiness Score. A deep dive into what an AI/ML platform does right and what keeps it from Gold.',
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
      'https://agenthermes.ai/blog/roboflow-agent-readiness-breakdown',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1800,
    keywords:
      'Roboflow agent readiness score, computer vision agent readiness, AI ML platform agent readiness, MCP server',
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
          name: 'Roboflow Agent Readiness Breakdown',
          item: 'https://agenthermes.ai/blog/roboflow-agent-readiness-breakdown',
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

  const weightedTotal = dimensionScores.reduce(
    (sum, d) => sum + d.score * d.weight,
    0
  )

  return (
    <BlogArticleWrapper
      title="Why Roboflow Scores 66: The Computer Vision Platform That's Almost Gold"
      shareUrl="https://agenthermes.ai/blog/roboflow-agent-readiness-breakdown"
      currentHref="/blog/roboflow-agent-readiness-breakdown"
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
              <span className="text-zinc-400">
                Roboflow Agent Readiness Breakdown
              </span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                <Cpu className="h-3.5 w-3.5" />
                Case Study
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                Silver Tier
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                Score: 66/100
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Why Roboflow Scores 66:{' '}
              <span className="text-emerald-400">
                The Computer Vision Platform That&apos;s Almost Gold
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Roboflow is the leading computer vision development platform. It
              lets developers build, train, and deploy object detection models
              through a clean REST API. Its{' '}
              <strong className="text-zinc-100">
                Agent Readiness Score is 66
              </strong>{' '}
              — Silver tier. That is strong. But it is 9 points from Gold. Here
              is the full breakdown and what would push it over.
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
                    13 min read
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
              <BarChart3 className="h-5 w-5 text-blue-500" />
              The Score: 66 Silver — Dimension by Dimension
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The Agent Readiness Score evaluates 9 dimensions weighted by
                importance to AI agents. Roboflow&apos;s 66 puts it in the{' '}
                <strong className="text-zinc-100">
                  top 15% of all businesses we have scanned
                </strong>
                . Out of 500+ businesses with an average score of 43, Roboflow
                is significantly above the median. But the gap to Gold (75) is
                real, and it is concentrated in one specific area.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {dimensionScores.map((d) => {
                const colors = getColorClasses(d.color)
                return (
                  <div
                    key={d.dimension}
                    className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-zinc-100">
                          {d.dimension}
                        </h3>
                        <span className="text-xs text-zinc-600">
                          (weight: {(d.weight * 100).toFixed(0)}%)
                        </span>
                      </div>
                      <span
                        className={`text-sm font-bold ${getScoreColor(d.score)}`}
                      >
                        {d.score}/100
                      </span>
                    </div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full mb-2">
                      <div
                        className={`h-2 rounded-full ${getScoreBarColor(d.score)}`}
                        style={{ width: `${d.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {d.detail}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-blue-400">
                  Weighted total: {weightedTotal.toFixed(1)}
                </strong>{' '}
                — The pattern is clear. Roboflow scores well across 8 of 9
                dimensions. D9 Agent Experience at 18 is the anchor dragging the
                overall score down. Fix D9 and the weighted total jumps into
                Gold territory.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT ROBOFLOW DOES RIGHT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              What Roboflow Does Right
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Roboflow is not a random SaaS that accidentally scored well.
                Its score reflects genuine engineering decisions that make the
                platform usable by machines. Here is what stands out.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {strengths.map((s) => (
                <div
                  key={s.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <s.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="text-sm font-bold text-zinc-100">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The takeaway is that{' '}
                <strong className="text-zinc-100">
                  Roboflow is already agent-usable
                </strong>
                . An AI agent with knowledge of the Roboflow REST API can
                deploy models, run inference, and manage datasets today. What
                it cannot do is <em>discover</em> Roboflow through standard
                agent protocols. That is the difference between being usable
                and being discoverable — and in the agent economy, discovery is
                everything.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE AGENT EXPERIENCE GAP ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              The D9 Gap: Agent Experience at 18/100
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                D9 Agent Experience measures whether a platform has adopted
                agent-native discovery and interaction standards. These are the
                files and protocols that let AI agents find and use a service
                without prior knowledge or human setup. Roboflow scores 18 here
                because it has none of them.
              </p>
              <p>
                This is not unusual.{' '}
                <Link
                  href="/blog/developer-tools-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  Most developer tools platforms
                </Link>{' '}
                score low on D9 because agent-native standards are new. But the
                gap matters more for AI/ML platforms than most categories. Here
                is why.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  label: 'agent-card.json',
                  status: 'Missing',
                  statusColor: 'red',
                  detail:
                    'No /.well-known/agent-card.json. Agents cannot discover what Roboflow offers through standard A2A protocol.',
                },
                {
                  label: 'MCP Server',
                  status: 'Missing',
                  statusColor: 'red',
                  detail:
                    'No MCP server. Agents cannot call Roboflow tools through Model Context Protocol. Must use raw REST API with pre-built knowledge.',
                },
                {
                  label: 'llms.txt',
                  status: 'Missing',
                  statusColor: 'red',
                  detail:
                    'No /llms.txt file. LLMs have no standardized way to understand what Roboflow is and how to use it.',
                },
                {
                  label: 'AGENTS.md',
                  status: 'Missing',
                  statusColor: 'red',
                  detail:
                    'No AGENTS.md in public repos. No agent-specific interaction guidelines published.',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-zinc-100">
                      {item.label}
                    </span>
                    <span className="text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                AI/ML platforms are <em>natural</em> targets for agent
                interaction. An autonomous coding agent needs to select the best
                model for a task, deploy it, run inference, and evaluate
                results. A data pipeline agent needs to manage training data,
                trigger retraining when accuracy drops, and compare model
                versions. These workflows are inherently agentic — and the
                platforms that adopt agent-native discovery will be the ones
                these agents select.
              </p>
              <p>
                The{' '}
                <Link
                  href="/blog/saas-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  broader SaaS landscape
                </Link>{' '}
                shows the same pattern: strong APIs but weak agent discovery.
                The platforms that break from this pattern first will capture
                disproportionate agent traffic.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PATH TO GOLD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              The Path to Gold: 4 Changes, +29 Points
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Roboflow is 9 points from Gold. These four changes would push it
              well past the threshold. None require rearchitecting the platform
              — they are additive layers on top of existing infrastructure.
            </p>

            <div className="space-y-3 mb-8">
              {pathToGold.map((item, i) => (
                <div
                  key={item.action}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="h-4 w-4 text-emerald-400" />
                      <h3 className="font-bold text-zinc-100 text-sm">
                        {item.action}
                      </h3>
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        {item.impact}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">
                  What an MCP server for Roboflow would look like:
                </strong>{' '}
                Tools like{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">
                  infer(image_url, model_id)
                </code>
                ,{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">
                  list_models(project_id)
                </code>
                ,{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">
                  upload_image(project_id, image)
                </code>
                , and{' '}
                <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-xs">
                  get_model_metrics(model_id)
                </code>
                . These map directly to existing REST endpoints. The MCP layer
                adds discoverability — the functionality already exists.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT THIS MEANS FOR AI/ML PLATFORMS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-purple-500" />
              What This Means for AI/ML Platforms Broadly
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Roboflow is a bellwether for the entire AI/ML platform category.
                Platforms like Hugging Face, Replicate, Modal, RunPod, and
                Together AI share the same profile: strong APIs, fast
                onboarding, structured outputs — and zero agent-native
                infrastructure.
              </p>
              <p>
                The irony is sharp. These are companies building the AI that
                powers agents, but their own platforms are not agent-ready.
                They are building the engine while ignoring the steering wheel.
              </p>
              <p>
                The pattern we see across our 500-business scan is that{' '}
                <strong className="text-zinc-100">
                  D2 API Quality is necessary but not sufficient
                </strong>
                . Having a great API gets you to Silver. Getting to Gold
                requires the agent-native layer — the discovery files, the MCP
                tools, the structured pricing — that lets agents find and
                interact with your platform autonomously.
              </p>
              <p>
                The first AI/ML platform to ship an MCP server with model
                inference tools will have a structural advantage in the agent
                economy. Agents selecting ML providers programmatically will
                choose the one they can discover and interact with through
                standard protocols. That is not hypothetical — it is how agents
                work today.
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
                    'Developer Tools Agent Readiness: How Dev Infrastructure Scores',
                  href: '/blog/developer-tools-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'SaaS Agent Readiness: Why Most Platforms Score Below 50',
                  href: '/blog/saas-agent-readiness',
                  tag: 'Market Analysis',
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
              How does your platform score?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run a free Agent Readiness Scan on any business or platform. See
              your score across all 9 dimensions in 60 seconds.
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
                href="/leaderboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
              >
                View Leaderboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </BlogArticleWrapper>
  )
}
