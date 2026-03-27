import { Suspense } from 'react'
import Link from 'next/link'
import {
  Building2,
  Shield,
  TrendingUp,
  Network,
  ArrowRight,
  Search,
  BarChart3,
  Wrench,
} from 'lucide-react'
import { getServiceClient } from '@/lib/supabase'
import HeroScanForm from '@/components/HeroScanForm'

export const revalidate = 60

function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) {
    return `$${(n / 1_000_000).toFixed(1)}M`
  }
  if (n >= 1_000) {
    return `$${(n / 1_000).toFixed(1)}K`
  }
  return `$${n.toFixed(0)}`
}

async function getNetworkStats() {
  const db = getServiceClient()

  const [bizRes, auditRes, txRes, connRes] = await Promise.all([
    db.from('businesses').select('*', { count: 'exact', head: true }),
    db.from('audit_results').select('*', { count: 'exact', head: true }),
    db.from('transactions').select('amount').eq('status', 'completed'),
    db.from('connections').select('*', { count: 'exact', head: true }),
  ])

  const businessCount = bizRes.count ?? 0
  const auditCount = auditRes.count ?? 0
  const totalVolume = (txRes.data || []).reduce(
    (sum: number, row: { amount: number }) => sum + (row.amount || 0),
    0
  )
  const connectionCount = connRes.count ?? 0

  return { businessCount, auditCount, totalVolume, connectionCount }
}

const scoreTiers = [
  {
    range: '0-39',
    label: 'Failing',
    color: 'text-red-500',
    bg: 'bg-red-500',
    barColor: 'bg-red-500',
    description: 'Invisible to AI agents',
  },
  {
    range: '40-59',
    label: 'Bronze',
    color: 'text-amber-500',
    bg: 'bg-amber-500',
    barColor: 'bg-amber-500',
    description: 'Partially discoverable',
  },
  {
    range: '60-74',
    label: 'Silver',
    color: 'text-zinc-400',
    bg: 'bg-zinc-400',
    barColor: 'bg-zinc-400',
    description: 'Agent-usable with friction',
  },
  {
    range: '75-89',
    label: 'Gold',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500',
    barColor: 'bg-yellow-500',
    description: 'Fully agent-native',
  },
  {
    range: '90-100',
    label: 'Platinum',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400',
    barColor: 'bg-emerald-400',
    description: 'Certified, battle-tested, zero-friction',
  },
]

export default async function HomePage() {
  let stats: { businessCount: number; auditCount: number; totalVolume: number; connectionCount: number }

  try {
    stats = await getNetworkStats()
  } catch {
    stats = { businessCount: 0, auditCount: 0, totalVolume: 0, connectionCount: 0 }
  }

  const statItems = [
    { label: 'Businesses Scored', value: formatNumber(stats.businessCount), icon: Building2 },
    { label: 'Scores Calculated', value: formatNumber(stats.auditCount), icon: Shield },
    { label: 'Transaction Volume', value: formatCurrency(stats.totalVolume), icon: TrendingUp },
    { label: 'Active Connections', value: formatNumber(stats.connectionCount), icon: Network },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AgentHermes",
    "url": "https://agenthermes.ai",
    "description": "The verified commerce network for AI agent-to-business transactions.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://agenthermes.ai/discover?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero — Score First */}
      <section className="relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="text-center">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-subtle-pulse" />
              The FICO of the Agent Economy
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              What&apos;s Your{' '}
              <span className="text-emerald-500">Agent Readiness</span>{' '}
              Score?
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-2xl mx-auto mb-10">
              AI agents are already choosing which businesses to transact with. See if yours makes the cut.
            </p>

            {/* Client island — URL input + scan button */}
            <HeroScanForm />
          </div>

          {/* Demo gauge placeholder */}
          <div className="flex justify-center mt-14">
            <div className="relative">
              <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90" role="img" aria-label="Demo score gauge showing 73 out of 100">
                <circle cx="100" cy="100" r="88" fill="none" stroke="#27272a" strokeWidth="8" />
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 88}
                  strokeDashoffset={2 * Math.PI * 88 * (1 - 73 / 100)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-yellow-500">73</span>
                <span className="text-xs text-zinc-500 font-medium mt-1">Gold</span>
                <span className="text-xs text-zinc-600 mt-1">Example score</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Three steps. Sixty seconds. Know exactly where you stand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                step: '01',
                icon: Search,
                title: 'Enter Your URL',
                description:
                  'Drop in your website URL. No signup required. Completely free.',
              },
              {
                step: '02',
                icon: BarChart3,
                title: 'Get Scored 0-100',
                description:
                  'We scan 5 categories of agent readiness: machine-readable profiles, API endpoints, onboarding, pricing, and payments.',
              },
              {
                step: '03',
                icon: Wrench,
                title: 'Fix What\'s Failing',
                description:
                  'Get specific recommendations and one-click fixes for each category. Improve your score, become agent-native.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-6 lg:p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-mono font-bold text-emerald-500/60">
                    {item.step}
                  </span>
                  <div className="h-px flex-1 bg-zinc-800" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50 mb-4">
                  <item.icon className="h-5 w-5 text-zinc-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Score Tiers — Credit Score Meter */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Agent Readiness Tiers
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Like a credit score for the AI economy. Higher scores mean agents can transact with you.
            </p>
          </div>

          {/* Score meter visualization */}
          <div className="p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            {/* Gradient bar */}
            <div className="relative mb-8">
              <div className="h-4 rounded-full overflow-hidden flex">
                <div className="w-[40%] bg-gradient-to-r from-red-600 to-red-500" />
                <div className="w-[20%] bg-gradient-to-r from-amber-600 to-amber-500" />
                <div className="w-[15%] bg-gradient-to-r from-zinc-500 to-zinc-400" />
                <div className="w-[15%] bg-gradient-to-r from-yellow-500 to-yellow-400" />
                <div className="w-[10%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-r-full" />
              </div>
              {/* Tick marks */}
              <div className="flex justify-between mt-2 px-0.5">
                <span className="text-[10px] font-mono text-zinc-600">0</span>
                <span className="text-[10px] font-mono text-zinc-600 ml-[35%]">40</span>
                <span className="text-[10px] font-mono text-zinc-600">60</span>
                <span className="text-[10px] font-mono text-zinc-600">75</span>
                <span className="text-[10px] font-mono text-zinc-600">90</span>
                <span className="text-[10px] font-mono text-zinc-600">100</span>
              </div>
            </div>

            {/* Tier descriptions */}
            <div className="space-y-3">
              {scoreTiers.map((tier) => (
                <div
                  key={tier.label}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800/30 transition-colors"
                >
                  <div className={`h-3 w-3 rounded-full ${tier.bg} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-sm font-bold ${tier.color}`}>
                        {tier.label}
                      </span>
                      <span className="text-xs font-mono text-zinc-600">
                        {tier.range}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {tier.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Your Score Matters */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Why Your Score Matters
            </h2>
            <div className="space-y-5 text-left">
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <h3 className="text-sm font-semibold text-zinc-200 mb-2">
                  Agents check scores before transacting
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Autonomous AI agents are already making purchasing decisions. They evaluate businesses programmatically
                  {'\u2014'} checking for machine-readable profiles, API access, structured pricing, and payment capabilities.
                  Businesses without these signals are invisible.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <h3 className="text-sm font-semibold text-zinc-200 mb-2">
                  The agent economy is growing exponentially
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  The share of B2B transactions influenced by autonomous agents is growing rapidly. Your Agent Readiness Score
                  determines whether your business captures that revenue or gets bypassed.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <h3 className="text-sm font-semibold text-zinc-200 mb-2">
                  Scores are public and verifiable
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Embed your score badge on your website. Share it with partners. Agents query the AgentHermes network
                  to verify scores before initiating transactions. A high score builds trust at machine speed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Stats — Compact bottom bar */}
      <section className="py-10 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <div className="h-4 w-4 bg-zinc-800 rounded animate-pulse flex-shrink-0" />
                  <div>
                    <div className="h-6 w-16 bg-zinc-800 rounded animate-pulse mb-1" />
                    <div className="h-3 w-24 bg-zinc-800 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          }>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {statItems.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <stat.icon className="h-4 w-4 text-zinc-600 flex-shrink-0" />
                <div>
                  <div className="text-xl font-bold font-mono tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </Suspense>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Your competitors are getting scored.{' '}
            <span className="text-zinc-500">Are you?</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            The first businesses to get scored set the benchmark for their industry.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
          >
            Get Your Score Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
