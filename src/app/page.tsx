import Link from 'next/link'
import {
  Shield,
  Search,
  ArrowRight,
  CheckCircle2,
  Building2,
  Bot,
  Zap,
  Lock,
  Globe,
  TrendingUp,
  Network,
} from 'lucide-react'
import { getServiceClient } from '@/lib/supabase'

const tiers = [
  {
    name: 'Bronze',
    range: '40-59',
    color: 'text-amber-500',
    borderColor: 'border-amber-800/40',
    bgColor: 'bg-amber-950/20',
    features: [
      'Basic machine-readable profile',
      'Listed in the network directory',
      'Visible to agent search queries',
    ],
  },
  {
    name: 'Silver',
    range: '60-74',
    color: 'text-zinc-300',
    borderColor: 'border-zinc-500/40',
    bgColor: 'bg-zinc-800/30',
    features: [
      'Everything in Bronze',
      'MCP or API endpoints exposed',
      'Structured pricing available',
    ],
  },
  {
    name: 'Gold',
    range: '75-89',
    color: 'text-yellow-500',
    borderColor: 'border-yellow-700/40',
    bgColor: 'bg-yellow-950/20',
    features: [
      'Everything in Silver',
      'Agent-native onboarding flow',
      'Verified uptime & response times',
    ],
  },
  {
    name: 'Platinum',
    range: '90-100',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-700/40',
    bgColor: 'bg-emerald-950/20',
    features: [
      'Everything in Gold',
      'Agent payment acceptance (Stripe)',
      'Full A2A protocol support',
      'Priority placement in agent queries',
    ],
  },
]

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
    db.from('transactions').select('amount'),
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

export default async function HomePage() {
  let stats: { businessCount: number; auditCount: number; totalVolume: number; connectionCount: number }

  try {
    stats = await getNetworkStats()
  } catch {
    stats = { businessCount: 0, auditCount: 0, totalVolume: 0, connectionCount: 0 }
  }

  const statItems = [
    { label: 'Businesses Registered', value: formatNumber(stats.businessCount), icon: Building2 },
    { label: 'Audits Completed', value: formatNumber(stats.auditCount), icon: Shield },
    { label: 'Agent Transactions', value: formatCurrency(stats.totalVolume), icon: TrendingUp },
    { label: 'Active Connections', value: formatNumber(stats.connectionCount), icon: Network },
  ]

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="max-w-3xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-subtle-pulse" />
              Now in Public Beta
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              The Verified Commerce Network for{' '}
              <span className="text-emerald-500">Agent-Ready</span>{' '}
              Businesses
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-10">
              AgentHermes scores, verifies, and connects businesses that AI agents can
              actually transact with. Machine-readable trust. Real payments.
              No black boxes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
              >
                <Shield className="h-4 w-4" />
                Audit Your Business Free
              </Link>
              <Link
                href="/discover"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 font-medium text-sm transition-colors"
              >
                <Search className="h-4 w-4" />
                Explore the Network
              </Link>
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
              Three steps to becoming discoverable by autonomous agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                step: '01',
                icon: Shield,
                title: 'Get Audited',
                description:
                  'We score your business across 5 machine-readability categories. Takes 60 seconds. Free.',
              },
              {
                step: '02',
                icon: Globe,
                title: 'Join the Network',
                description:
                  'Your verified profile, services, and pricing become queryable by any AI agent via our MCP tools.',
              },
              {
                step: '03',
                icon: Bot,
                title: 'Agents Find You',
                description:
                  'Autonomous agents discover, evaluate, and transact with your business programmatically.',
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

      {/* Trust Tiers */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Trust Tiers
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Your audit score determines your tier. Higher tiers unlock more
              agent capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-6 rounded-xl border ${tier.borderColor} ${tier.bgColor} transition-colors`}
              >
                <div className="flex items-baseline justify-between mb-5">
                  <h3 className={`text-xl font-bold ${tier.color}`}>{tier.name}</h3>
                  <span className="text-xs font-mono text-zinc-500">
                    {tier.range}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.color} opacity-60`}
                      />
                      <span className="text-sm text-zinc-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Network at a Glance
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {statItems.map((stat) => (
              <div
                key={stat.label}
                className="p-5 lg:p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <stat.icon className="h-5 w-5 text-zinc-500 mb-3" />
                <div className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Agents */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="p-8 sm:p-10 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Zap className="h-5 w-5 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold">For Agent Developers</h2>
              </div>

              <p className="text-zinc-400 leading-relaxed mb-6">
                Your agents can query AgentHermes via MCP to find verified,
                audited services. Search by vertical, capability, tier, or price.
                Get structured results with endpoints, auth requirements, and
                uptime metrics. No scraping. No guessing.
              </p>

              <div className="bg-zinc-950/80 rounded-lg border border-zinc-800/80 p-4 font-mono text-sm">
                <div className="text-zinc-500 mb-1">
                  {'// Query the AgentHermes MCP'}
                </div>
                <div>
                  <span className="text-emerald-400">discover_businesses</span>
                  <span className="text-zinc-500">{'({'}</span>
                </div>
                <div className="pl-4">
                  <span className="text-zinc-400">vertical</span>
                  <span className="text-zinc-600">: </span>
                  <span className="text-amber-400">{'"legal"'}</span>
                  <span className="text-zinc-600">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-zinc-400">min_score</span>
                  <span className="text-zinc-600">: </span>
                  <span className="text-emerald-300">60</span>
                  <span className="text-zinc-600">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-zinc-400">capability</span>
                  <span className="text-zinc-600">: </span>
                  <span className="text-amber-400">{'"contract-review"'}</span>
                </div>
                <div>
                  <span className="text-zinc-500">{'})'};</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800/80 text-xs text-zinc-400">
                  <Lock className="h-3 w-3" />
                  Verified trust scores
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800/80 text-xs text-zinc-400">
                  <Globe className="h-3 w-3" />
                  MCP & REST endpoints
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800/80 text-xs text-zinc-400">
                  <Zap className="h-3 w-3" />
                  Programmatic payments
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Is your business agent-ready?
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            Find out in 60 seconds. Our free audit scores your machine
            readability, API exposure, and payment capabilities.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
          >
            Start Your Free Audit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
