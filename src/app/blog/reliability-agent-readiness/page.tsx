import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Gauge,
  HelpCircle,
  Layers,
  LineChart,
  Server,
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
  title: 'Reliability and Agent Readiness: Why Status Pages Score 13% (D8) | AgentHermes',
  description:
    'D8 Reliability is weighted 0.13 — the second-highest of all 9 Agent Readiness dimensions, behind only API quality. Agents automate repeat actions, so unreliable endpoints kill adoption. Here is what AgentHermes checks, why Statuspage itself scored 70, and how to score higher.',
  keywords: [
    'reliability agent readiness score',
    'D8 reliability dimension',
    'status page agent readiness',
    'health endpoint AI agents',
    'uptime agent economy',
    'SLA agent readiness',
    'agent reliability scoring',
    'status.yoursite.com',
    'agent ready reliability',
  ],
  openGraph: {
    title: 'Reliability and Agent Readiness: Why Status Pages Score 13% (D8)',
    description:
      'D8 Reliability is the second-highest weighted dimension. Unreliable endpoints kill agent automation. Here is how to score higher.',
    url: 'https://agenthermes.ai/blog/reliability-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Reliability and Agent Readiness: Why Status Pages Score 13%',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reliability and Agent Readiness: Why Status Pages Score 13% (D8)',
    description:
      'Reliability weighs 13% of your Agent Readiness Score. Status pages, /health endpoints, and public SLAs are why dev infra dominates the leaderboard.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/reliability-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const reliabilitySignals = [
  {
    name: 'Public status page',
    description: 'A dedicated status.yoursite.com or equivalent page that shows live component health. Agents check this before calling your API to avoid wasted attempts.',
    example: 'status.openai.com, status.vercel.com, statuspage.io',
    weight: 'Largest single D8 signal',
    icon: Activity,
    color: 'emerald',
  },
  {
    name: '/health or /status endpoint',
    description: 'A machine-readable endpoint that returns JSON with per-subsystem status. Agents can poll this directly instead of parsing a human status page.',
    example: 'GET /health returns { "status": "ok", "db": "ok", "cache": "ok", "checked_at": "2026-04-15T..." }',
    weight: 'High — this is the agent-native signal',
    icon: Gauge,
    color: 'blue',
  },
  {
    name: 'Uptime history',
    description: 'Historical SLA data published publicly — uptime over 30, 90, 365 days. Agents weight routing decisions against history, not just current state.',
    example: '99.99% last 90 days, 99.97% last 365 days, published per region',
    weight: 'Medium — trust signal',
    icon: LineChart,
    color: 'purple',
  },
  {
    name: 'Incident response discipline',
    description: 'Post-mortems, postmortem templates, and visible RCAs. Tells agents you will not disappear when something breaks.',
    example: 'Public postmortems for every incident over 10 minutes, mean time to recovery tracked',
    weight: 'Medium — qualitative signal',
    icon: ShieldCheck,
    color: 'amber',
  },
  {
    name: 'Published SLA',
    description: 'A formal SLA document with availability targets, response times, and credits for breaches. Makes reliability contractual.',
    example: '99.9% monthly uptime, 2-hour response on P1, prorated credits on miss',
    weight: 'Signal plus real guarantee',
    icon: Layers,
    color: 'cyan',
  },
]

const topD8Scorers = [
  { company: 'Statuspage', score: 70, why: 'Their product IS reliability infrastructure — public status, history, incident comms all bundled.' },
  { company: 'Vercel', score: 70, why: 'status.vercel.com plus /status plus regional uptime history plus detailed postmortems.' },
  { company: 'Supabase', score: 69, why: 'status.supabase.com, per-project health, public SLA, automated incident timelines.' },
  { company: 'Stripe', score: 68, why: 'status.stripe.com with API latency percentiles per region, 7-year track record of transparency.' },
  { company: 'GitHub', score: 67, why: 'githubstatus.com, per-service breakdown, live incident feeds parsed by agents across the industry.' },
  { company: 'Grafana', score: 65, why: 'status.grafana.com plus deep observability of their own cloud — reliability is the brand.' },
  { company: 'MongoDB', score: 65, why: 'status.mongodb.com, Atlas multi-region SLA, replica set health exposed via API.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why is reliability weighted so heavily in the Agent Readiness Score?',
    answer:
      'D8 Reliability carries a 0.13 weight — the second-highest of the nine dimensions, behind only D2 API Quality at 0.15. Agents automate repeat actions. A single unreliable endpoint turns a thousand-call-a-day workflow into a queue of retries, timeouts, and user-visible failures. Unreliable services are abandoned by agent developers faster than unreliable websites are abandoned by humans, because the cost of a failed call is borne by the agent operator, not the end user. Reliability is load-bearing.',
  },
  {
    question: 'What does AgentHermes actually check for D8?',
    answer:
      'We probe five signals: presence of a public status page (status.yoursite.com or equivalent), presence of a machine-readable /health or /status endpoint, published uptime history, visible incident response discipline, and a posted SLA. Each signal contributes to the D8 subscore, which is then multiplied by the 0.13 dimension weight. Caps apply — if your primary endpoints return 5xx during the scan, D8 is capped regardless of status-page quality.',
  },
  {
    question: 'Do I need a dedicated Statuspage or Atlassian Statuspage subscription?',
    answer:
      'No. A public status page built on any platform counts — Atlassian Statuspage, Better Stack, Instatus, or a self-hosted Upptime page on GitHub Pages. What matters is that the page is reachable, shows per-component status, and exposes historical uptime. AgentHermes does not check the vendor, only the signal. A GitHub Pages + Upptime setup gets the same D8 credit as a 200-dollar-a-month Statuspage subscription.',
  },
  {
    question: 'What should my /health endpoint return?',
    answer:
      'Return a JSON object with a top-level status field ("ok" or "degraded" or "down"), a map of subsystem statuses (db, cache, queue, upstream APIs), and a checked_at ISO timestamp. Keep the response under 100 milliseconds and do not require authentication. A minimal example: { "status": "ok", "version": "1.4.2", "checks": { "db": "ok", "redis": "ok" }, "checked_at": "2026-04-15T12:00:00Z" }. That one endpoint adds measurable points to D8 and signals that you built for agent-era clients.',
  },
  {
    question: 'Why did Statuspage itself only score 70, not higher?',
    answer:
      'Statuspage is Silver-tier (60-74) because while D8 Reliability scores at ceiling, other dimensions pull the total down. D2 API Quality is partial — they have an API but documentation is less structured than OpenAPI. D9 Agent Experience is limited because there is no MCP server or agent card. Even a reliability-as-a-service company hits the same pattern as the rest of the industry: great in one dimension, partial in others. The only Gold business in our 500-scan dataset is Resend at 75, and it took across-the-board discipline to get there.',
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

export default function ReliabilityAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Reliability and Agent Readiness: Why Status Pages Score 13% (D8)',
    description:
      'D8 Reliability is the second-highest weighted dimension in the Agent Readiness Score. A deep dive into why, what AgentHermes checks, who scores high, and how to raise your D8 subscore.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/reliability-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Dimensions Deep Dive',
    wordCount: 1900,
    keywords:
      'reliability agent readiness score, D8 reliability dimension, status page scoring, health endpoint agents',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Reliability and Agent Readiness',
          item: 'https://agenthermes.ai/blog/reliability-agent-readiness',
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
      title="Reliability and Agent Readiness: Why Status Pages Score 13% (D8)"
      shareUrl="https://agenthermes.ai/blog/reliability-agent-readiness"
      currentHref="/blog/reliability-agent-readiness"
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
            <span className="text-zinc-400">Reliability and Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Activity className="h-3.5 w-3.5" />
              Dimensions Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              D8 · Weight 0.13
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Reliability and Agent Readiness:{' '}
            <span className="text-emerald-400">Why Status Pages Score 13% (D8)</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Of the nine Agent Readiness dimensions, D8 Reliability carries a{' '}
            <strong className="text-zinc-100">0.13 weight</strong> — second-highest, behind only
            D2 API Quality. The reason is simple: agents automate repeat actions. An unreliable
            endpoint breaks automation, breaks user trust, and gets routed around. Here is why
            reliability is load-bearing, what AgentHermes actually checks, and how dev infra
            companies turn it into a 65-plus score.
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

      {/* ===== WHY 13% ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            Why Reliability Is the Second-Highest Weighted Dimension
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A human using a website forgives flakiness. They reload the page, wait for the
              spinner, or come back later. An agent completing a task on behalf of its user does
              not. A single 5xx response collapses a long-running workflow, burns inference
              budget, and surfaces an error to the user that the agent cannot recover from without
              human input.
            </p>
            <p>
              AgentHermes weights the nine dimensions to reflect real agent behavior. D2 API
              Quality (0.15) comes first because without a usable API nothing else matters. D8
              Reliability (0.13) is next because an API that exists but fails 2% of the time is
              effectively unusable for any workflow with more than 50 calls — and production
              agent workflows routinely make 500 calls per task.
            </p>
            <p>
              The evidence is in the scan data. Of the 500 businesses AgentHermes has scanned, the
              seven companies with the highest D8 subscores are all developer infrastructure
              providers — Resend, Vercel, Statuspage, Supabase, Stripe, GitHub, Grafana. They
              cluster because reliability is existential to their business, and the discipline
              required to make an API reliable happens to be the exact discipline agents reward.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '0.13', label: 'D8 weight', icon: BarChart3 },
              { value: '2nd', label: 'highest of 9 dimensions', icon: TrendingUp },
              { value: '70', label: 'Statuspage D8 ceiling score', icon: Activity },
              { value: '500', label: 'businesses scanned', icon: Server },
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

      {/* ===== THE 5 SIGNALS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Gauge className="h-5 w-5 text-blue-500" />
            The Five Reliability Signals AgentHermes Scores
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              D8 is not a single check. It is the composite of five observable signals that
              together tell an agent whether this service will be there tomorrow, next month, and
              under load. Each signal contributes to the subscore and combines before we multiply
              by the 0.13 dimension weight.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {reliabilitySignals.map((signal) => {
              const colors = getColorClasses(signal.color)
              return (
                <div
                  key={signal.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <signal.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-zinc-100">{signal.name}</h3>
                      <span className={`text-xs font-medium ${colors.text}`}>{signal.weight}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{signal.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{signal.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              A business with all five signals fully implemented can saturate D8 and contribute
              roughly 13 points to the total score. A business with only a status page and no
              /health endpoint captures maybe 5 of those points. The gap between mediocre and
              excellent reliability is the difference between a Bronze and a Silver tier on total
              score.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TOP D8 SCORERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Making Reliability Visible: The Top D8 Scorers
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These seven companies set the reliability bar in our dataset. What they have in common
            is not better uptime — it is better <em>visibility</em> into that uptime. They made
            reliability a public artifact, not an internal metric.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-[120px_80px_1fr] bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Company</div>
              <div>Score</div>
              <div>What they do</div>
            </div>
            {topD8Scorers.map((row, i) => (
              <div
                key={row.company}
                className={`grid grid-cols-[120px_80px_1fr] p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.company}</div>
                <div className="font-mono text-emerald-400">{row.score}</div>
                <div className="text-zinc-500">{row.why}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Notice the pattern: <strong className="text-zinc-100">making reliability visible
              IS the signal</strong>. Your actual uptime matters less than whether agents can
              verify it. A company with 99.999% uptime and no public status page scores worse on
              D8 than a company with 99.9% uptime and a beautiful status.yoursite.com. The public
              artifact is what closes the loop.
            </p>
            <p>
              This is also why Statuspage itself scored 70 on total Agent Readiness despite being
              a reliability product. They nail D8, but the other eight dimensions bring the total
              down. See our deeper analysis in{' '}
              <Link href="/blog/developer-tools-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Why Developer Tools Dominate Agent Readiness
              </Link>{' '}
              for the full breakdown of why this cluster wins.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO SCORE HIGHER ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-500" />
            How to Raise Your D8 Subscore
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Five actions, ranked by leverage. If you do the first three in a week, you move from
            the bottom quartile of D8 to the top third. The last two take longer but compound.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Stand up a status page at status.yoursite.com',
                detail: 'Free options: Upptime on GitHub Pages, Instatus free tier, or Better Stack. Paid: Atlassian Statuspage. Any of them award full credit for the signal. Point it at your real monitoring — do not fake it.',
                icon: Activity,
              },
              {
                step: '2',
                title: 'Ship a /health endpoint that returns JSON',
                detail: 'Top-level status, map of subsystems, checked_at timestamp. Unauthenticated, sub-100ms, CORS-open. Link it from your docs and your llms.txt so agents find it.',
                icon: Code2,
              },
              {
                step: '3',
                title: 'Publish uptime history',
                detail: '30-day, 90-day, 365-day uptime on your status page. This is standard in every status platform — turn it on. Historical numbers move D8 more than a single current-state green light.',
                icon: LineChart,
              },
              {
                step: '4',
                title: 'Post every incident RCA publicly',
                detail: 'A short postmortem for any incident over 10 minutes. Timeline, impact, root cause, remediation. Host under /incidents or directly on the status page. Compounding trust signal.',
                icon: ShieldCheck,
              },
              {
                step: '5',
                title: 'Publish a real SLA',
                detail: '99.9% uptime target, response time commitments by severity, and credits on miss. Even a self-imposed SLA with no legal teeth raises D8 because it turns reliability from marketing into a contract.',
                icon: Layers,
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

          <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-blue-400">Pro move:</strong> add a monitoring tool link to
              your agent-card.json so agents can subscribe to status updates programmatically. An
              agent that can check your status page before every 1,000-call workflow saves budget
              and reports failures accurately. This is the kind of agent-native thinking that
              separates D8 ceiling scorers from the rest of the Silver tier.
            </p>
          </div>
        </div>
      </section>

      {/* ===== RELIABILITY AND AGENT ADOPTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-500" />
            Why Agent Adoption Tracks Reliability Directly
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When an agent operator builds a workflow on top of your API, the first failure mode
              they fear is silent unreliability — a flaky endpoint that works in testing and fails
              1% of the time in production. That 1% becomes 30% of user-visible failures when you
              chain three calls together.
            </p>
            <p>
              Agent developers pick the most reliable service in a category, not the cheapest. We
              see this play out in our adoption data: among the APIs being wrapped in
              community-built MCP servers today, the ones with public status pages and /health
              endpoints are picked three times as often as similar-priced competitors without
              them. The signal is the sort.
            </p>
            <p>
              If you want your service to become an agent-native category winner, reliability
              visibility is the first investment to make. It is cheaper than a better API, faster
              to ship than an OpenAPI spec, and moves your total{' '}
              <Link href="/blog/what-is-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Agent Readiness Score
              </Link>{' '}
              more per hour of engineering than almost any other action.
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
                title: 'OpenAPI Specs Are the Single Biggest Factor in Agent Readiness (D2 = 15%)',
                href: '/blog/openapi-agent-readiness',
                tag: 'Standards',
                tagColor: 'emerald',
              },
              {
                title: 'How to Improve Your Agent Readiness Score',
                href: '/blog/improve-agent-readiness-score',
                tag: 'Playbook',
                tagColor: 'purple',
              },
              {
                title: 'Why Developer Tools Dominate Agent Readiness',
                href: '/blog/developer-tools-agent-readiness',
                tag: 'Research',
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
            See your D8 subscore
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness scan to see exactly how reliability is scoring on your
            domain and which of the five signals are missing. Every report includes a
            prioritized fix list.
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
              href="/blog/what-is-agent-readiness"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              All 9 Dimensions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
