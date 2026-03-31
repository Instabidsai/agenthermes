import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  CheckCircle,
  Globe,
  Layers,
  Network,
  Plug,
  Server,
  Shield,
  Sparkles,
  Target,
  Wrench,
  Zap,
} from 'lucide-react'

const problemStats = [
  {
    value: '33M',
    label: 'small businesses in the US',
    icon: Building2,
  },
  {
    value: '36/100',
    label: 'average agent readiness score',
    icon: BarChart3,
  },
  {
    value: '0',
    label: 'MCP servers for local businesses',
    icon: Server,
  },
  {
    value: '$3-5T',
    label: 'projected agent economy by 2030',
    icon: Globe,
  },
]

const products = [
  {
    title: 'Score It',
    subtitle: 'Free, instant agent readiness audit',
    description:
      'Enter any URL and get a 0-100 Agent Readiness Score in seconds. We scan 9 dimensions across the full agent journey: can an AI agent discover your business, understand your services, sign up, connect, use your API, and pay?',
    icon: BarChart3,
    color: 'emerald',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/5',
    accentColor: 'text-emerald-400',
    href: '/audit',
    features: [
      'Free forever, no signup required',
      '9-dimension scoring (0-100)',
      'Public score page with shareable badge',
      'Specific, actionable recommendations',
    ],
  },
  {
    title: 'Fix It',
    subtitle: 'Auto-generate agent infrastructure',
    description:
      'We show you exactly what to fix and auto-generate the agent infrastructure your business is missing. Agent cards, MCP endpoints, llms.txt, structured pricing, Schema.org markup, and more.',
    icon: Wrench,
    color: 'blue',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/5',
    accentColor: 'text-blue-400',
    href: '/remediate',
    features: [
      'Auto-generated agent cards (A2A protocol)',
      'MCP endpoint creation and hosting',
      'llms.txt generation for AI discoverability',
      'Structured pricing and Schema.org markup',
    ],
  },
  {
    title: 'Connect It',
    subtitle: 'One API gateway for all agent commerce',
    description:
      'Skip the work entirely. List on our gateway and agents can use your service TODAY through a single API. One connection, every agent platform. We handle discovery, auth, and payments.',
    icon: Network,
    color: 'purple',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/5',
    accentColor: 'text-purple-400',
    href: '/gateway',
    features: [
      'One API key, access every connected service',
      'Agent-native auth and payment flows',
      'Real-time health monitoring',
      'Works with every major agent platform',
    ],
  },
]

const techStack = [
  { label: 'MCP (Model Context Protocol)', description: 'Native tool integration for AI agents' },
  { label: 'A2A (Agent-to-Agent Protocol)', description: 'Standardized agent communication' },
  { label: '15 Vertical Templates', description: 'Pre-built for restaurants, HVAC, SaaS, and more' },
  { label: 'Agent Card Registry', description: 'Discoverable machine-readable business profiles' },
  { label: 'llms.txt Support', description: 'AI-native content for LLM consumption' },
  { label: 'Schema.org Enrichment', description: 'Structured data for search and agents' },
]

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About AgentHermes',
    url: 'https://agenthermes.ai/about',
    description:
      'AgentHermes is the Shopify of the Agent Economy. We make any business discoverable, usable, and payable by AI agents.',
    isPartOf: {
      '@type': 'WebSite',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
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
          name: 'About',
          item: 'https://agenthermes.ai/about',
        },
      ],
    },
  }

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO: THE STORY ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 mb-8">
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-zinc-400">About</span>
            </div>

            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8">
              <Shield className="h-4 w-4" />
              The Shopify of the Agent Economy
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Making Every Business{' '}
              <span className="text-emerald-500">Agent-Ready</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mx-auto mb-6">
              AI agents are learning to shop, book, and pay on behalf of humans.
              But most businesses are invisible to them.
            </p>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              AgentHermes makes any business — from a local plumber to a global
              SaaS platform — discoverable, usable, and payable by AI agents.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-6">
              <Target className="h-3.5 w-3.5" />
              The Problem
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              The Agent Economy Is Here.{' '}
              <span className="text-zinc-500">Businesses Aren&apos;t Ready.</span>
            </h2>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Trillions of dollars in autonomous agent transactions are coming.
              But the infrastructure for businesses to participate doesn&apos;t
              exist yet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemStats.map((stat) => (
              <div
                key={stat.label}
                className="relative p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-red-500/30 transition-colors text-center group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 mx-auto mb-4 group-hover:bg-red-500/15 transition-colors">
                  <stat.icon className="h-6 w-6 text-red-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-2 font-mono tabular-nums">
                  {stat.value}
                </div>
                <p className="text-sm text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR SOLUTION: 3 PRODUCTS ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Our Solution
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Score It{' '}
              <span className="text-zinc-600">&rarr;</span> Fix It{' '}
              <span className="text-zinc-600">&rarr;</span> Connect It
            </h2>

            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Three products. One path from invisible to agent-native.
            </p>
          </div>

          <div className="space-y-8">
            {products.map((product, idx) => (
              <div
                key={product.title}
                className={`relative p-8 lg:p-10 rounded-2xl ${product.bgColor} border ${product.borderColor} hover:border-opacity-60 transition-all`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    {/* Step number */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-700/50`}
                      >
                        <product.icon className={`h-5 w-5 ${product.accentColor}`} />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-zinc-600 uppercase tracking-wider">
                          Step {idx + 1}
                        </span>
                        <h3 className={`text-2xl font-bold ${product.accentColor}`}>
                          {product.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-zinc-300 mb-3">
                      {product.subtitle}
                    </p>

                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      {product.description}
                    </p>

                    <Link
                      href={product.href}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors ${
                        product.color === 'emerald'
                          ? 'bg-emerald-600 hover:bg-emerald-500'
                          : product.color === 'blue'
                            ? 'bg-blue-600 hover:bg-blue-500'
                            : 'bg-purple-600 hover:bg-purple-500'
                      }`}
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Features checklist */}
                  <div className="space-y-3">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle
                          className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                            product.color === 'emerald'
                              ? 'text-emerald-500/70'
                              : product.color === 'blue'
                                ? 'text-blue-500/70'
                                : 'text-purple-500/70'
                          }`}
                        />
                        <p className="text-sm text-zinc-400">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE TECHNOLOGY ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700/40 text-zinc-400 text-xs font-medium mb-6">
              <Layers className="h-3.5 w-3.5" />
              The Technology
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Built on Every Major Agent Protocol
            </h2>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We support MCP, A2A, llms.txt, Schema.org, and every emerging
              standard. Your business is ready no matter which agent platform
              your customers use.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {techStack.map((tech) => (
              <div
                key={tech.label}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Plug className="h-4 w-4 text-emerald-500/70" />
                  <h3 className="text-sm font-semibold text-zinc-200">
                    {tech.label}
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE VISION ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <Bot className="h-3.5 w-3.5" />
              Our Vision
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              A World Where Every Business Is{' '}
              <span className="text-emerald-500">Agent-Ready</span>
            </h2>

            <p className="text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto mb-4">
              Whether you&apos;re a dentist in Dallas or a SaaS platform in San
              Francisco, your customers will increasingly interact with your
              business through AI agents.
            </p>

            <p className="text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-4">
              The businesses that are agent-ready first will capture the market.
              The ones that aren&apos;t will become invisible to an entire
              generation of buyers.
            </p>

            <p className="text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              We&apos;re building the infrastructure layer that makes this
              transition simple for everyone — not just the companies with
              engineering teams and AI budgets. Score your readiness, fix your
              gaps, connect to the network. That&apos;s it.
            </p>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to see where you stand?
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            Get your Agent Readiness Score in seconds. Free forever, no signup
            required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              Check Your Score
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
            >
              Get Started Free
              <Zap className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
