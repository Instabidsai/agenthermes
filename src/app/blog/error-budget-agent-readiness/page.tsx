import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Gauge,
  Globe,
  HelpCircle,
  LineChart,
  Server,
  Shield,
  Signal,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Error Budgets and Agent Readiness: How SRE Principles Map to Scoring Dimensions | AgentHermes',
  description:
    'SRE error budgets directly map to agent readiness scoring. Your 99.9% SLO means 8.76 hours/year of agent downtime. Learn how to extend error budgets to agent consumers and why agent SLOs should be stricter.',
  keywords: [
    'error budget SRE agent readiness',
    'SRE agent readiness',
    'error budget API agents',
    'SLO agent reliability',
    'agent readiness reliability',
    'site reliability engineering agents',
    'uptime agent scoring',
    'agent SLO best practices',
    'reliability scoring dimension',
  ],
  openGraph: {
    title:
      'Error Budgets and Agent Readiness: How SRE Principles Map to Scoring Dimensions',
    description:
      'If you track error budgets for human users, extend them to agent users. SRE principles map directly to D8 Reliability scoring — and agent SLOs should be stricter.',
    url: 'https://agenthermes.ai/blog/error-budget-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Error Budgets and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Error Budgets and Agent Readiness: How SRE Principles Map to Scoring Dimensions',
    description:
      'Your 99.9% SLO = 8.76 hours/year downtime. For agents, that is enough to get permanently blacklisted. Here is how SRE maps to agent readiness.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/error-budget-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const sloTiers = [
  {
    slo: '99.0%',
    downtime: '87.6 hours/year',
    agentImpact: 'Agents will notice. Multiple failures per month. Agent may deprioritize your API in favor of more reliable alternatives.',
    d8Score: '4-5/10',
    color: 'red',
  },
  {
    slo: '99.5%',
    downtime: '43.8 hours/year',
    agentImpact: 'Better but still shaky. About one outage event per week at scale. Agents will use you but have fallback providers ready.',
    d8Score: '5-6/10',
    color: 'amber',
  },
  {
    slo: '99.9%',
    downtime: '8.76 hours/year',
    agentImpact: 'Reasonable for most use cases. Agents encounter maybe 2-3 failures per quarter. Your API stays in the primary rotation.',
    d8Score: '7-8/10',
    color: 'emerald',
  },
  {
    slo: '99.95%',
    downtime: '4.38 hours/year',
    agentImpact: 'Strong reliability. Agents rarely hit failures. You become a preferred provider for latency-sensitive workflows.',
    d8Score: '8-9/10',
    color: 'emerald',
  },
  {
    slo: '99.99%',
    downtime: '52.6 minutes/year',
    agentImpact: 'Near-perfect. Agents treat you as always-available. You earn premium routing priority in multi-provider agent architectures.',
    d8Score: '9-10/10',
    color: 'blue',
  },
]

const dimensionMapping = [
  {
    sreConcept: 'Error Budget',
    definition: '100% - SLO = allowed unreliability',
    dimension: 'D8 Reliability',
    mapping: 'AgentHermes measures actual uptime via repeated scans. Your error budget spend rate directly affects your D8 score over time.',
  },
  {
    sreConcept: 'SLI (Service Level Indicator)',
    definition: 'Measured metric: latency, error rate, throughput',
    dimension: 'D8 + D2 API Quality',
    mapping: 'p50/p95 latency maps to D2 performance scoring. Error rate maps to D8 reliability. Both are measured empirically.',
  },
  {
    sreConcept: 'SLO (Service Level Objective)',
    definition: 'Target: 99.9% availability',
    dimension: 'D8 Reliability',
    mapping: 'Published SLOs (like status.stripe.com) boost D8 because they demonstrate commitment to measurable reliability.',
  },
  {
    sreConcept: 'Toil Budget',
    definition: 'Manual operational work that should be automated',
    dimension: 'D3 Onboarding',
    mapping: 'High-toil onboarding (manual API key approval, email-based access) lowers D3. Automated onboarding = low toil = high D3.',
  },
  {
    sreConcept: 'Incident Management',
    definition: 'Detection, response, resolution, postmortem',
    dimension: 'D8 + D9 Agent Experience',
    mapping: 'Status page presence, incident communication, and mean time to recovery all factor into D8. Postmortems published as structured data boost D9.',
  },
  {
    sreConcept: 'Change Management',
    definition: 'Canary deploys, feature flags, rollbacks',
    dimension: 'D2 API Quality',
    mapping: 'APIs that break on deploy cycles hurt D2. Versioned APIs with deprecation policies score higher because agents do not break on updates.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why should agent SLOs be stricter than human user SLOs?',
    answer:
      'Human users are forgiving. They refresh the page, try again later, or call support. Agents are not forgiving. An agent that encounters two consecutive failures from your API will immediately try an alternative provider. If the alternative works, the agent may permanently deprioritize your API — not out of spite, but because it learned that the alternative is more reliable. One bad weekend can cost you months of agent traffic.',
  },
  {
    question: 'How does AgentHermes measure D8 Reliability?',
    answer:
      'AgentHermes runs repeated scans against your endpoints over time. Each scan checks HTTP response codes, response times, TLS validity, and error format consistency. The D8 score is a rolling average that reflects your actual uptime as observed from outside your network. It is not based on your claims — it is based on our measurements.',
  },
  {
    question: 'What is the relationship between error budgets and agent trust?',
    answer:
      'Error budgets are internal engineering constructs. Agent trust is the external consequence. If you spend your entire error budget in January (8.76 hours of downtime in one month), agents that hit those failures will have deprioritized you before February starts — even if you have 99.9% uptime for the remaining 11 months. Agent trust is harder to earn back than error budget.',
  },
  {
    question: 'Do I need a status page for agent readiness?',
    answer:
      'Yes, and it should be machine-readable. A human-facing status page (like status.stripe.com) is great for D8 scoring because it demonstrates transparency. But a machine-readable status endpoint — one that returns JSON with component statuses, incident history, and current metrics — is even better. It lets agents check your health before routing requests, avoiding failures entirely rather than discovering them on the call.',
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

export default function ErrorBudgetAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Error Budgets and Agent Readiness: How SRE Principles Map to Scoring Dimensions',
    description:
      'SRE error budgets map directly to agent readiness reliability scoring. Analysis of SLO tiers, dimension mappings, and why agent SLOs need to be stricter than human user SLOs.',
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
      'https://agenthermes.ai/blog/error-budget-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'error budget SRE agent readiness, SLO agent reliability, D8 reliability scoring, agent uptime, site reliability engineering',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Error Budgets and Agent Readiness',
          item: 'https://agenthermes.ai/blog/error-budget-agent-readiness',
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
      title="Error Budgets and Agent Readiness: How SRE Principles Map to Scoring Dimensions"
      shareUrl="https://agenthermes.ai/blog/error-budget-agent-readiness"
      currentHref="/blog/error-budget-agent-readiness"
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
              <span className="text-zinc-400">Error Budgets and Agent Readiness</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                <Activity className="h-3.5 w-3.5" />
                Technical Deep Dive
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                SRE
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Error Budgets and Agent Readiness:{' '}
              <span className="text-emerald-400">
                How SRE Principles Map to Scoring Dimensions
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              If you already track error budgets for human users, you are halfway to understanding
              agent readiness reliability. The SRE concept of{' '}
              <strong className="text-zinc-100">100% minus your SLO equals your allowed downtime</strong>{' '}
              maps directly to our D8 Reliability scoring dimension. But there is a critical
              difference: agents are less forgiving than humans, retry more aggressively, and will
              permanently abandon unreliable APIs.
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
                    12 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== THE ERROR BUDGET PARALLEL ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Gauge className="h-5 w-5 text-emerald-500" />
              The Error Budget Parallel
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Site Reliability Engineering introduced a powerful concept: the error budget. Instead
                of pursuing 100% uptime (which is impossible and infinitely expensive), you set a
                Service Level Objective — say 99.9% — and accept that the remaining 0.1% is your
                budget for failures, deployments, experiments, and maintenance. That 0.1% translates
                to 8 hours and 46 minutes of allowed downtime per year.
              </p>
              <p>
                This concept maps cleanly to agent readiness scoring. When AgentHermes evaluates your
                D8 Reliability dimension, we are essentially measuring how you spend your error
                budget — but from the outside, through repeated empirical scans. We do not ask what
                your SLO is. We measure what your actual uptime is. If you claim 99.9% but we observe
                99.5%, your D8 score reflects the 99.5%.
              </p>
              <p>
                The critical insight is this: your error budget has always been shared between human
                users and agent users. But until now, no one was measuring the agent experience. A
                15-minute outage during off-peak hours might not trigger a single human complaint.
                But if an agent hit that outage during an automated workflow, it failed, retried,
                failed again, and potentially marked your API as unreliable. You spent error budget
                you did not know you were spending.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '99.9%', label: 'SLO = 8.76 hrs/yr downtime', icon: Timer },
                { value: 'D8', label: 'Reliability dimension', icon: Signal },
                { value: '13%', label: 'of total score weight', icon: BarChart3 },
                { value: '2x', label: 'agent retry aggression vs human', icon: Zap },
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

        {/* ===== SLO TIERS AND AGENT IMPACT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-500" />
              SLO Tiers: What Each Level Means for Agents
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Each SLO tier translates to a specific agent experience. Here is how your uptime target
              maps to D8 scoring and what agents actually experience at each level.
            </p>

            <div className="space-y-3 mb-8">
              {sloTiers.map((tier) => {
                const colors = getColorClasses(tier.color)
                return (
                  <div
                    key={tier.slo}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`text-xl font-bold ${colors.text}`}>{tier.slo}</span>
                        <span className="text-sm text-zinc-500">SLO</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">D8 Score:</span>
                        <span className={`text-sm font-bold ${colors.text}`}>{tier.d8Score}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1">Allowed Downtime</p>
                        <p className="text-sm font-medium text-zinc-300">{tier.downtime}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1">Agent Impact</p>
                        <p className="text-sm text-zinc-400 leading-relaxed">{tier.agentImpact}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== DIMENSION MAPPING TABLE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              SRE Concepts to Agent Readiness Dimensions
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Every major SRE concept has a direct counterpart in the agent readiness scoring
              framework. If your team already practices SRE, you have a head start on agent readiness.
            </p>

            <div className="space-y-4 mb-8">
              {dimensionMapping.map((row) => (
                <div
                  key={row.sreConcept}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-zinc-100">{row.sreConcept}</h3>
                    <span className="text-xs font-medium text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      {row.dimension}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2 italic">{row.definition}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{row.mapping}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== AGENTS ARE STRICTER ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Why Agent SLOs Must Be Stricter
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Human users and AI agents experience downtime completely differently. Understanding
                these differences is critical to setting appropriate agent-facing SLOs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: 'Retry behavior',
                  detail:
                    'Humans wait and try again later. Agents retry immediately, often 3-5 times in rapid succession. If all retries fail, the agent marks the endpoint as degraded. Five quick failures in 10 seconds burns more trust than one failure over 10 minutes.',
                },
                {
                  title: 'Fallback behavior',
                  detail:
                    'Humans rarely switch providers because of one bad experience. Agents have ranked provider lists and instantly fall through to alternatives. Once an agent successfully completes a workflow through an alternative, your API drops in priority.',
                },
                {
                  title: 'Memory persistence',
                  detail:
                    'Humans forget bad experiences over time. Agent systems log failure rates and use them in routing decisions. A bad week in March still affects your routing priority in June if the agent has not observed enough recovery data.',
                },
                {
                  title: 'Scale amplification',
                  detail:
                    'One human encounters one failure. But when your API serves 10,000 agent requests per hour, a 0.1% error rate means 10 failures per hour. Each failure is logged, scored, and factored into routing. Small error rates become big reliability signals at scale.',
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

            <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-red-400">The takeaway:</strong> If your human-facing SLO is
                99.9%, your agent-facing SLO should be at least 99.95%. The asymmetry between agent
                retry aggression and agent trust recovery means that the same error budget buys you
                less goodwill with agents than with humans. AgentHermes measures this through our{' '}
                <Link
                  href="/blog/reliability-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  reliability scoring methodology
                </Link>
                , which weights consistency over raw uptime numbers.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PRACTICAL IMPLEMENTATION ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Practical Steps: Extending Error Budgets to Agents
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                If you already have SRE practices in place, extending them to cover agent consumers
                is straightforward. Here is what to do.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                {
                  step: '1',
                  title: 'Create a separate agent-facing SLO',
                  detail:
                    'Track agent API endpoints separately from human-facing endpoints. Set the agent SLO 0.05% higher than your human SLO. Monitor it independently.',
                  icon: Target,
                },
                {
                  step: '2',
                  title: 'Publish a machine-readable status endpoint',
                  detail:
                    'Beyond your human-facing status page, expose a JSON endpoint that returns component status, current incident count, and historical uptime percentage. Agents will pre-flight check this before making calls. See our analysis of status page impact on scoring.',
                  icon: Server,
                },
                {
                  step: '3',
                  title: 'Measure agent-specific error rates',
                  detail:
                    'Segment your error tracking by consumer type. Agent traffic patterns differ from human patterns — higher concurrency, more retries, different peak hours. Your agent error rate may differ from your human error rate even on the same infrastructure.',
                  icon: BarChart3,
                },
                {
                  step: '4',
                  title: 'Set agent-specific alerting thresholds',
                  detail:
                    'Alert earlier on agent-facing endpoints. If your human alert fires at 1% error rate, your agent alert should fire at 0.5%. The cost of agent trust loss is higher than the cost of one extra page.',
                  icon: AlertTriangle,
                },
                {
                  step: '5',
                  title: 'Run an Agent Readiness Scan',
                  detail:
                    'See how your current reliability scores from the outside. AgentHermes measures what agents actually experience — which may differ from what your internal monitoring shows.',
                  icon: Sparkles,
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

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The connection between SRE and agent readiness is not theoretical. As we detailed in
                our{' '}
                <Link
                  href="/blog/sla-uptime-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  SLA and uptime analysis
                </Link>
                , published SLA commitments directly influence scoring. And our{' '}
                <Link
                  href="/blog/status-page-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  status page breakdown
                </Link>{' '}
                shows how transparency infrastructure translates to measurable D8 improvements. The
                businesses scoring highest on reliability — Stripe at 68, Supabase at 69 — are the ones
                with the strongest SRE cultures.
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
                  title: 'SLA and Uptime: How Published Commitments Affect Agent Readiness',
                  href: '/blog/sla-uptime-agent-readiness',
                  tag: 'Technical Deep Dive',
                  tagColor: 'cyan',
                },
                {
                  title: 'Reliability Scoring: What D8 Measures and How to Improve It',
                  href: '/blog/reliability-agent-readiness',
                  tag: 'Framework',
                  tagColor: 'purple',
                },
                {
                  title: 'Status Pages and Agent Readiness: Transparency That Scores',
                  href: '/blog/status-page-agent-readiness',
                  tag: 'Technical Deep Dive',
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
              Measure your reliability from the outside
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Your internal monitoring shows one story. An Agent Readiness Scan shows what agents
              actually experience. See your D8 Reliability score and all 9 dimensions in 60 seconds.
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
