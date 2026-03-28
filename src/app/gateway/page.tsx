import Link from 'next/link'
import {
  Layers,
  ArrowRight,
  Key,
  Plug,
  ShieldCheck,
  Gauge,
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

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-subtle-pulse" />
            Gateway Marketplace
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            One API Key.{' '}
            <span className="text-emerald-500">Every Service.</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-6">
            Stop juggling dozens of API keys and credentials. The AgentHermes gateway
            lets your agents call any connected service through a single authenticated
            endpoint -- with built-in billing, rate limiting, and audit logging.
          </p>

          {/* Value props */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            <span className="inline-flex items-center gap-2">
              <Key className="h-4 w-4 text-emerald-500/60" />
              Single API key
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500/60" />
              Encrypted credential vault
            </span>
            <span className="inline-flex items-center gap-2">
              <Gauge className="h-4 w-4 text-emerald-500/60" />
              Per-call billing
            </span>
            <span className="inline-flex items-center gap-2">
              <Plug className="h-4 w-4 text-emerald-500/60" />
              MCP + REST compatible
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Services Grid                                                     */}
      {/* ================================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {/* Stats bar */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Layers className="h-5 w-5 text-zinc-500" />
            Connected Services
            <span className="text-sm font-normal text-zinc-600 ml-1">
              ({services.length})
            </span>
          </h2>
        </div>

        {/* Client island: filter pills + grid */}
        <GatewayFilter services={services} />
      </section>

      {/* ================================================================= */}
      {/* Bottom CTA                                                        */}
      {/* ================================================================= */}
      <section className="relative py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mx-auto mb-6">
            <Plug className="h-8 w-8 text-emerald-500" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Connect Your Service
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-lg mx-auto">
            Have an API? List it on the AgentHermes gateway and let AI agents discover
            and pay for your service automatically.
          </p>
          <Link
            href="/connect"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
          >
            Connect Your Service
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
