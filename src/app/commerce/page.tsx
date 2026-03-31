import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CreditCard,
  FileCode2,
  Fingerprint,
  Globe,
  Key,
  Layers,
  Lock,
  Network,
  Plug,
  Receipt,
  Shield,
  Wallet,
  Zap,
} from 'lucide-react'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CommercePage() {
  return (
    <div className="relative">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://agenthermes.ai' },
          { name: 'Commerce', url: 'https://agenthermes.ai/commerce' },
        ]}
      />

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* ================================================================= */}
      {/* Hero                                                              */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-subtle-pulse" />
            Agent Commerce Infrastructure
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            How Agents{' '}
            <span className="text-emerald-500">Discover, Use, and Pay</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10">
            AgentHermes is the commerce layer for the agent economy. One gateway
            handles discovery, authentication, billing, and settlement so
            businesses and agents can transact without friction.
          </p>

          {/* Key numbers */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            {[
              { value: '4', label: 'payment protocols', accent: false },
              { value: '$0.001', label: 'min per-call price', accent: false },
              { value: 'KYA', label: 'agent identity', accent: true },
              { value: 'x402', label: 'micropayments', accent: true },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className={`text-3xl sm:text-4xl font-bold font-mono tabular-nums ${s.accent ? 'text-emerald-400' : 'text-white'}`}
                >
                  {s.value}
                </div>
                <div className="text-xs text-zinc-500 font-medium mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Payment Flow                                                      */}
      {/* ================================================================= */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              How Payments Work
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              From wallet to per-call billing to settlement. Every transaction
              is tracked, budgeted, and auditable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                icon: Wallet,
                title: 'Fund Wallet',
                description:
                  'Agent or principal deposits funds into an AgentHermes wallet. Set per-transaction, daily, and per-service budget limits.',
              },
              {
                step: '02',
                icon: Zap,
                title: 'Call Service',
                description:
                  'Agent calls any gateway service with a single API key. The gateway handles auth, routing, and rate limiting.',
              },
              {
                step: '03',
                icon: Receipt,
                title: 'Per-Call Billing',
                description:
                  'Each call is metered and deducted from the wallet in real time. Cost = service price + transparent margin.',
              },
              {
                step: '04',
                icon: Banknote,
                title: 'Settlement',
                description:
                  'Service providers are paid automatically. Full usage logs, invoices, and audit trail for every transaction.',
              },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 right-0 w-full h-px bg-gradient-to-r from-zinc-800 via-emerald-500/20 to-zinc-800 translate-x-1/2 z-0" />
                )}
                <div className="relative z-10 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/30 transition-all h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono font-bold text-emerald-500/60">
                      {item.step}
                    </span>
                    <div className="h-px flex-1 bg-zinc-800" />
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-4">
                    <item.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Supported Protocols                                               */}
      {/* ================================================================= */}
      <section className="relative py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Supported Protocols
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              We support the protocols agents and businesses are actually using.
              Multi-rail payments from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: CreditCard,
                name: 'ACP',
                full: 'Agentic Commerce Protocol',
                owner: 'OpenAI + Stripe',
                status: 'Supported',
                statusColor: 'emerald',
                description:
                  'End-to-end agent commerce. Agents browse catalogs, compare options, and pay via Stripe Shared Payment Tokens (SPT). Powers ChatGPT Instant Checkout.',
              },
              {
                icon: Globe,
                name: 'UCP',
                full: 'Universal Commerce Protocol',
                owner: 'Google + Shopify',
                status: 'Supported',
                statusColor: 'emerald',
                description:
                  'Machine-readable merchant profiles at /.well-known/ucp. Agents discover capabilities, pricing, and checkout flows. Dynamic discovery without custom integrations.',
              },
              {
                icon: Banknote,
                name: 'x402',
                full: 'HTTP-Native Micropayments',
                owner: 'Coinbase + Cloudflare',
                status: 'Detection Live',
                statusColor: 'amber',
                description:
                  'HTTP 402 Payment Required with USDC payment headers. 161M+ transactions, ~$600M volume. True machine-to-machine payments. No pre-funding needed.',
              },
              {
                icon: Network,
                name: 'AP2',
                full: 'Agent Payments Protocol',
                owner: 'Google + 60 partners',
                status: 'Planned',
                statusColor: 'zinc',
                description:
                  'Payment authorization and settlement layer. Solves authorization, authenticity, and accountability for agent transactions. Payment-agnostic.',
              },
              {
                icon: Shield,
                name: 'Visa TAP',
                full: 'Trusted Agent Protocol',
                owner: 'Visa + 100+ partners',
                status: 'Planned',
                statusColor: 'zinc',
                description:
                  'Merchant-agent trust framework. Verifiable agent credentials via Cloudflare verification. Distinguishes legitimate agents from bots.',
              },
              {
                icon: CreditCard,
                name: 'Mastercard Agent Pay',
                full: 'Agentic Tokens',
                owner: 'Mastercard',
                status: 'Planned',
                statusColor: 'zinc',
                description:
                  'Dynamic credentials tied to consumer identity. Each transaction gets a unique, scoped token with spending limits baked in.',
              },
            ].map((protocol) => (
              <div
                key={protocol.name}
                className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50">
                    <protocol.icon className="h-5 w-5 text-zinc-300" />
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      protocol.statusColor === 'emerald'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : protocol.statusColor === 'amber'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    {protocol.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-0.5">{protocol.name}</h3>
                <p className="text-xs text-zinc-500 mb-1">{protocol.full}</p>
                <p className="text-xs text-zinc-600 mb-3">{protocol.owner}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {protocol.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Agent Identity / KYA                                              */}
      {/* ================================================================= */}
      <section className="relative py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
                <Fingerprint className="h-3.5 w-3.5" />
                Know Your Agent
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Agent Identity (KYA)
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Before an agent can transact, we need to know who it is, who
                authorized it, and what it&apos;s allowed to do. KYA is
                the authentication layer for the agent economy.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                Compatible with Skyfire KYA tokens, NIST AI Agent Standards
                (OAuth + SCIM), ERC-8004 on-chain agent registry, and Visa
                Trusted Agent Protocol credentials.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Fingerprint,
                    title: 'Unique Agent ID',
                    desc: 'Every agent gets a UUID tied to its owner (human or org). Traceable, revocable, auditable.',
                  },
                  {
                    icon: Lock,
                    title: 'Scoped Permissions',
                    desc: 'Capabilities, budget limits, and allowed service categories defined at registration.',
                  },
                  {
                    icon: BadgeCheck,
                    title: 'Trust Scoring',
                    desc: '5 trust levels from unverified to enterprise. Higher trust unlocks higher spending limits.',
                  },
                  {
                    icon: Key,
                    title: 'JWT Tokens',
                    desc: 'Identity-only, payment-only, or combined tokens. Short-lived, merchant-scoped, non-replayable.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20 flex-shrink-0 mt-0.5">
                      <item.icon className="h-4 w-4 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-200 mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Level Table */}
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <h3 className="text-lg font-bold mb-4">Trust Levels</h3>
              <div className="space-y-3">
                {[
                  {
                    level: 'Enterprise',
                    score: '90+',
                    maxTxn: '$10,000',
                    daily: '$100,000',
                    color: 'emerald',
                  },
                  {
                    level: 'Premium',
                    score: '75+',
                    maxTxn: '$1,000',
                    daily: '$5,000',
                    color: 'emerald',
                  },
                  {
                    level: 'Standard',
                    score: '50+',
                    maxTxn: '$200',
                    daily: '$1,000',
                    color: 'amber',
                  },
                  {
                    level: 'Basic',
                    score: '20+',
                    maxTxn: '$50',
                    daily: '$200',
                    color: 'amber',
                  },
                  {
                    level: 'Unverified',
                    score: '0+',
                    maxTxn: '$5',
                    daily: '$20',
                    color: 'zinc',
                  },
                ].map((tier) => (
                  <div
                    key={tier.level}
                    className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800/30 border border-zinc-800/50"
                  >
                    <div
                      className={`h-2 w-2 rounded-full flex-shrink-0 ${
                        tier.color === 'emerald'
                          ? 'bg-emerald-500'
                          : tier.color === 'amber'
                            ? 'bg-amber-500'
                            : 'bg-zinc-500'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold">{tier.level}</div>
                      <div className="text-xs text-zinc-500">
                        Score {tier.score}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono text-zinc-300">
                        {tier.maxTxn}
                      </div>
                      <div className="text-xs text-zinc-600">per txn</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono text-zinc-300">
                        {tier.daily}
                      </div>
                      <div className="text-xs text-zinc-600">daily</div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-zinc-600 mt-4">
                Trust scores are computed from transaction history, dispute
                rate, verification level, and account age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Gateway Integration                                               */}
      {/* ================================================================= */}
      <section className="relative py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Gateway Integration
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Connect once, access every service. The gateway handles
              authentication, billing, and routing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Plug,
                title: 'Single API Key',
                description:
                  'One AgentHermes API key replaces dozens of service credentials. AES-256-GCM encrypted vault handles the rest.',
              },
              {
                icon: Layers,
                title: 'MCP + A2A + REST',
                description:
                  'Every gateway service is auto-published as MCP tools, A2A skills, and REST endpoints. Agents use their native protocol.',
              },
              {
                icon: Receipt,
                title: 'Per-Call Metering',
                description:
                  'Real-time usage tracking per agent, per service, per action. Cost = service price + transparent margin.',
              },
              {
                icon: Shield,
                title: 'Budget Controls',
                description:
                  'Per-transaction, daily, and per-service limits. Approval thresholds for high-value calls. Automatic overspend prevention.',
              },
              {
                icon: FileCode2,
                title: 'Credential Vault',
                description:
                  'Service API keys encrypted at rest with AES-256-GCM. Zero-knowledge architecture. Agents never see provider credentials.',
              },
              {
                icon: Zap,
                title: 'Smart Routing',
                description:
                  'Automatic retries, rate limit awareness, and failover. The gateway optimizes for reliability and cost.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/20 transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  <feature.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-base font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* x402 Detail Section                                               */}
      {/* ================================================================= */}
      <section className="relative py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Code example */}
            <div className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800/80 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-zinc-500">
                  x402 payment flow
                </span>
              </div>
              <div className="space-y-1 text-xs leading-relaxed overflow-x-auto">
                <p className="text-zinc-500">
                  {'// 1. Agent calls a paid endpoint'}
                </p>
                <p>
                  <span className="text-violet-400">GET</span>{' '}
                  <span className="text-emerald-400">
                    /api/v1/gateway/call
                  </span>
                </p>
                <p className="text-zinc-600">{'// No wallet balance'}</p>
                <p className="mt-3 text-zinc-500">
                  {'// 2. Server returns 402 with payment details'}
                </p>
                <p>
                  <span className="text-amber-400">402</span>{' '}
                  <span className="text-zinc-400">Payment Required</span>
                </p>
                <p className="text-zinc-500">
                  {'x-payment: {"amount":"0.001","currency":"USDC",'}
                </p>
                <p className="text-zinc-500 pl-4">
                  {'"recipient":"0x...","networks":["base"]}'}
                </p>
                <p className="mt-3 text-zinc-500">
                  {'// 3. Agent pays in USDC on Base'}
                </p>
                <p>
                  <span className="text-violet-400">TRANSFER</span>{' '}
                  <span className="text-zinc-400">0.001 USDC</span>
                  {' -> '}
                  <span className="text-emerald-400">0x...</span>
                </p>
                <p className="mt-3 text-zinc-500">
                  {'// 4. Agent retries with proof'}
                </p>
                <p>
                  <span className="text-violet-400">GET</span>{' '}
                  <span className="text-emerald-400">
                    /api/v1/gateway/call
                  </span>
                </p>
                <p className="text-zinc-500">
                  {'x-payment-proof: {"tx_hash":"0xabc...","network":"base"}'}
                </p>
                <p className="mt-3 text-zinc-500">
                  {'// 5. Server verifies and grants access'}
                </p>
                <p>
                  <span className="text-emerald-400">200</span>{' '}
                  <span className="text-zinc-400">OK</span>{' '}
                  <span className="text-zinc-600">
                    {'{ "data": { ... } }'}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-6">
                <Banknote className="h-3.5 w-3.5" />
                HTTP-Native Payments
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                x402 Micropayments
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-4">
                The fastest-growing agent payment rail. 161M+ transactions,
                ~$600M annualized volume, zero protocol fees.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                x402 turns every API endpoint into a paywall. Agents pay
                per-request in USDC on Base, Solana, Ethereum, Arbitrum, or
                Polygon. No pre-funding, no subscriptions, no accounts. Just
                HTTP.
              </p>

              <div className="space-y-3">
                {[
                  'No wallet pre-funding required',
                  'Sub-cent micropayments per API call',
                  'Settlement in seconds (L2 networks)',
                  'Zero protocol fees (x402 Foundation)',
                  'AgentHermes scanner detects x402 support (+10 score points)',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 flex-shrink-0 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    </div>
                    <p className="text-sm text-zinc-400">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Bottom CTAs                                                       */}
      {/* ================================================================= */}
      <section className="relative py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mx-auto mb-6">
            <Wallet className="h-8 w-8 text-emerald-500" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Start Transacting
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            Whether you provide services or consume them, the AgentHermes
            commerce layer handles everything from discovery to settlement.
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
              href="/developers"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 hover:text-white hover:border-zinc-600 font-semibold transition-all"
            >
              Get API Key
              <Key className="h-4 w-4" />
            </Link>
          </div>

          <p className="text-xs text-zinc-600 mt-6">
            Free tier available. No credit card required.
          </p>
        </div>
      </section>
    </div>
  )
}
