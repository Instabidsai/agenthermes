import Link from 'next/link'
import {
  ArrowRight,
  Key,
  Plug,
  ShieldCheck,
  Gauge,
  Layers,
  Zap,
  DollarSign,
  Globe,
  Lock,
  Cpu,
  Eye,
  Wallet,
  Code2,
  Users,
} from 'lucide-react'
import { getServiceClient } from '@/lib/supabase'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import GatewayFilter from '@/components/GatewayFilter'
import type { ServiceAction } from '@/lib/gateway/types'

export const revalidate = 60

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GatewayServiceRow {
  id: string
  name: string
  description: string | null
  category: string | null
  status: string
  cost_per_call: number
  cost_model: string
  our_margin: number
  actions: ServiceAction[]
  rate_limit_per_min: number
  uptime_pct: number | null
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getGatewayServices(): Promise<GatewayServiceRow[]> {
  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('gateway_services')
    .select(
      'id, name, description, category, status, cost_per_call, cost_model, our_margin, actions, rate_limit_per_min, uptime_pct'
    )
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[gateway] List error:', error.message)
    return []
  }

  return (data || []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    name: row.name as string,
    description: row.description as string | null,
    category: row.category as string | null,
    status: row.status as string,
    cost_per_call: row.cost_per_call as number,
    cost_model: row.cost_model as string,
    our_margin: row.our_margin as number,
    actions: (row.actions as ServiceAction[]) || [],
    rate_limit_per_min: row.rate_limit_per_min as number,
    uptime_pct: row.uptime_pct as number | null,
  }))
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function GatewayMarketplacePage() {
  const services = await getGatewayServices()

  // Compute stats from live data
  const totalActions = services.reduce(
    (sum, s) => sum + (s.actions?.length || 0),
    0
  )

  return (
    <div className="relative">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://agenthermes.ai' },
          { name: 'Gateway', url: 'https://agenthermes.ai/gateway' },
        ]}
      />

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* ================================================================= */}
      {/* Hero                                                              */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-subtle-pulse" />
            The Connect It Layer
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            One API.{' '}
            <span className="text-emerald-500">Every Service.</span>
            <br />
            <span className="text-zinc-400">Agent-Ready Today.</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10">
            Don&apos;t wait to become agent-ready. List your service on the
            AgentHermes gateway and AI agents can discover, use, and pay for it
            through a single connection.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-white">
                {services.length}
              </div>
              <div className="text-xs text-zinc-500 font-medium mt-1">
                services connected
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-zinc-800" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-white">
                {totalActions}
              </div>
              <div className="text-xs text-zinc-500 font-medium mt-1">
                actions available
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-zinc-800" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-emerald-400">
                1
              </div>
              <div className="text-xs text-zinc-500 font-medium mt-1">
                API key
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* How It Works                                                      */}
      {/* ================================================================= */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Three steps. Five minutes. Every agent can find you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-0">
            {[
              {
                step: '01',
                icon: Plug,
                title: 'List Your Service',
                description:
                  'Connect your API, define your actions, set your pricing. Five-minute setup.',
                cta: { label: 'Start connecting', href: '/connect' },
              },
              {
                step: '02',
                icon: Eye,
                title: 'Agents Discover You',
                description:
                  'Your service appears as MCP tools, A2A skills, and REST endpoints automatically.',
                cta: null,
              },
              {
                step: '03',
                icon: Wallet,
                title: 'Get Paid Per Call',
                description:
                  'Agents pay through their AgentHermes wallet. You get paid. No integration needed.',
                cta: null,
              },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {/* Connector line between steps (desktop) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 right-0 w-full h-px bg-gradient-to-r from-zinc-800 via-emerald-500/20 to-zinc-800 translate-x-1/2 z-0" />
                )}

                <div className="relative z-10 p-6 lg:p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/30 transition-all md:mx-2">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-mono font-bold text-emerald-500/60">
                      {item.step}
                    </span>
                    <div className="h-px flex-1 bg-zinc-800" />
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-5">
                    <item.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  {item.cta && (
                    <Link
                      href={item.cta.href}
                      className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                    >
                      {item.cta.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Value Props — Two Columns                                         */}
      {/* ================================================================= */}
      <section className="relative py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Built for Both Sides
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Whether you provide services or consume them, the gateway works for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Businesses */}
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Globe className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">For Businesses</h3>
              </div>
              <div className="space-y-5">
                {[
                  {
                    icon: Zap,
                    title: 'Skip months of agent-native development',
                    description:
                      'Connect your existing API and become discoverable by AI agents immediately. No protocol rewrites.',
                  },
                  {
                    icon: Users,
                    title: 'Get discovered by every AI agent instantly',
                    description:
                      'Your service is auto-published as MCP tools, A2A skills, and REST endpoints in a single listing.',
                  },
                  {
                    icon: DollarSign,
                    title: 'Usage-based revenue from agent calls',
                    description:
                      'Set your price per call. Agents pay through their wallets. You receive revenue with zero invoicing.',
                  },
                  {
                    icon: Lock,
                    title: 'Encrypted credential vault (AES-256-GCM)',
                    description:
                      'Your API keys are encrypted at rest. Agents never see your credentials. Zero-knowledge architecture.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex-shrink-0 mt-0.5">
                      <item.icon className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-200 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Agents */}
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <Cpu className="h-5 w-5 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold">For Agents</h3>
              </div>
              <div className="space-y-5">
                {[
                  {
                    icon: Key,
                    title: 'One API key to access every service',
                    description:
                      'Stop managing dozens of credentials. One AgentHermes key unlocks the entire marketplace.',
                  },
                  {
                    icon: Gauge,
                    title: 'Automatic billing and budget controls',
                    description:
                      'Set per-transaction limits, daily caps, and approval thresholds. Never overspend.',
                  },
                  {
                    icon: Code2,
                    title: 'MCP tools generated dynamically',
                    description:
                      'Every gateway service becomes callable MCP tools. Your agent speaks native protocol.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'No per-service authentication',
                    description:
                      'The gateway handles auth, rate limiting, and retries. Your agent just calls the action.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex-shrink-0 mt-0.5">
                      <item.icon className="h-4 w-4 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-200 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Service Marketplace                                               */}
      {/* ================================================================= */}
      <section className="relative py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
                <Layers className="h-6 w-6 text-emerald-500" />
                Service Marketplace
              </h2>
              <p className="text-zinc-500 text-sm mt-2">
                Browse {services.length} connected services with{' '}
                {totalActions} actions available through a single API.
              </p>
            </div>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700/50 text-sm font-medium text-zinc-300 hover:text-white hover:border-zinc-600 transition-all"
            >
              <Plug className="h-4 w-4" />
              List Your Service
            </Link>
          </div>

          {/* Client island: filter pills + grid */}
          <GatewayFilter services={services} />
        </div>
      </section>

      {/* ================================================================= */}
      {/* Bottom CTA                                                        */}
      {/* ================================================================= */}
      <section className="relative py-24 sm:py-32 border-t border-zinc-800/50">
        {/* Background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mx-auto mb-6">
            <Plug className="h-8 w-8 text-emerald-500" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to Connect?
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            List your service in five minutes and let every AI agent on the
            network discover and pay for it automatically.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-lg shadow-emerald-500/10"
            >
              Connect Your Service
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 hover:text-white hover:border-zinc-600 font-semibold transition-all"
            >
              Get Your Agent Readiness Score
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="text-xs text-zinc-600 mt-6">
            5-minute setup. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>
    </div>
  )
}
