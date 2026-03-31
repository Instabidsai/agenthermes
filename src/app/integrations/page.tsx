import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Code2,
  Globe,
  Handshake,
  Layers,
  Mail,
  Network,
  Plug,
  Server,
  ShoppingBag,
  Store,
  Wallet,
  Zap,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const protocols = [
  {
    name: 'MCP',
    fullName: 'Model Context Protocol',
    description: '14+ tools with dynamic generation per vertical. Native tool integration for every major AI agent platform.',
    icon: Server,
    color: 'emerald',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/5',
    iconBg: 'bg-emerald-500/10',
    iconBorder: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
    stats: '14+ tools',
  },
  {
    name: 'A2A',
    fullName: 'Agent-to-Agent Protocol',
    description: '5 skills, v0.3 compliant. Standardized agent-to-agent communication for scoring, discovery, and gateway access.',
    icon: Network,
    color: 'blue',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/5',
    iconBg: 'bg-blue-500/10',
    iconBorder: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    stats: '5 skills',
  },
  {
    name: 'ACP',
    fullName: 'Agent Commerce Protocol',
    description: 'OpenAI + Stripe standard for agent-native commerce. Secure payment flows and transaction handling built in.',
    icon: Wallet,
    color: 'purple',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/5',
    iconBg: 'bg-purple-500/10',
    iconBorder: 'border-purple-500/20',
    iconColor: 'text-purple-400',
    stats: 'OpenAI + Stripe',
  },
  {
    name: 'UCP',
    fullName: 'Universal Commerce Protocol',
    description: 'Google + Shopify standard for universal commerce. Cross-platform interoperability for agent transactions.',
    icon: Globe,
    color: 'amber',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/5',
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-500/20',
    iconColor: 'text-amber-400',
    stats: 'Google + Shopify',
  },
  {
    name: 'REST API',
    fullName: 'RESTful API',
    description: '55+ endpoints covering scanning, scoring, registry, gateway, monitoring, and remediation. Full OpenAPI spec available.',
    icon: Code2,
    color: 'zinc',
    borderColor: 'border-zinc-600/30',
    bgColor: 'bg-zinc-800/30',
    iconBg: 'bg-zinc-700/30',
    iconBorder: 'border-zinc-600/30',
    iconColor: 'text-zinc-300',
    stats: '55+ endpoints',
  },
]

const platforms = [
  {
    name: 'Shopify',
    description: 'Auto-detect store capabilities and generate MCP tools for products, inventory, orders, and fulfillment.',
    icon: ShoppingBag,
    status: 'live' as const,
    features: [
      'Auto-detect product catalog and variants',
      'Generate browse, search, and purchase tools',
      'Cart and checkout flow support',
      'Inventory and fulfillment tracking',
    ],
  },
  {
    name: 'WooCommerce',
    description: 'Auto-detect WooCommerce stores and generate MCP tools for the full product and order lifecycle.',
    icon: Store,
    status: 'live' as const,
    features: [
      'Auto-detect WooCommerce REST API',
      'Generate product and category tools',
      'Order creation and management',
      'Coupon and discount support',
    ],
  },
  {
    name: 'Square',
    description: 'Point-of-sale and online commerce integration. Auto-generate tools for catalog, orders, and payments.',
    icon: Layers,
    status: 'coming-soon' as const,
    features: [
      'Catalog and item management',
      'Order and payment processing',
      'Location-based service discovery',
      'Loyalty and rewards integration',
    ],
  },
]

const directories = [
  {
    name: 'Smithery',
    url: 'https://smithery.ai',
    description: 'The largest MCP server directory. We publish verified agent-ready businesses here.',
  },
  {
    name: 'PulseMCP',
    url: 'https://pulsemcp.com',
    description: 'Real-time MCP server monitoring and discovery. Our listings include health status.',
  },
  {
    name: 'mcp.so',
    url: 'https://mcp.so',
    description: 'Community MCP directory. Cross-listed for maximum agent discoverability.',
  },
  {
    name: 'Agent Card Registry',
    url: '/registry',
    description: 'Our own registry of agent-ready businesses with scores, capabilities, and live endpoints.',
  },
]

const partnerBenefits = [
  'Access to 108+ scanned businesses and growing',
  'Cross-listing in 4 major agent directories',
  'MCP tool generation for your platform',
  'Co-marketing and joint case studies',
  'Early access to new protocol support',
  'API access for your agent platform',
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IntegrationsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Integrations & Partnerships — AgentHermes',
    url: 'https://agenthermes.ai/integrations',
    description:
      'AgentHermes integrates with MCP, A2A, ACP, UCP, REST, Shopify, WooCommerce, and publishes to Smithery, PulseMCP, mcp.so.',
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
          name: 'Integrations',
          item: 'https://agenthermes.ai/integrations',
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

      {/* ===== HERO ===== */}
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
              <span className="text-zinc-400">Integrations</span>
            </div>

            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8">
              <Plug className="h-4 w-4" />
              Every Protocol. Every Platform.
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Integrations &{' '}
              <span className="text-emerald-500">Partnerships</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mx-auto mb-6">
              AgentHermes speaks every major agent protocol, connects to leading
              commerce platforms, and publishes to every directory that matters.
            </p>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              One platform. Every way an agent can discover, use, and pay a business.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PROTOCOL SUPPORT ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
              <Server className="h-3.5 w-3.5" />
              Protocol Support
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Native Support for{' '}
              <span className="text-emerald-500">Every Agent Protocol</span>
            </h2>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We don&apos;t pick favorites. MCP, A2A, ACP, UCP, REST — your
              business works with every agent platform from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {protocols.map((protocol) => (
              <div
                key={protocol.name}
                className={`relative p-6 rounded-xl ${protocol.bgColor} border ${protocol.borderColor} hover:border-opacity-60 transition-all group`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${protocol.iconBg} border ${protocol.iconBorder} flex-shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <protocol.icon className={`h-6 w-6 ${protocol.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100">
                      {protocol.name}
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono">
                      {protocol.fullName}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  {protocol.description}
                </p>

                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${protocol.iconBg} ${protocol.iconColor}`}>
                  <Zap className="h-3 w-3" />
                  {protocol.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM ADAPTERS ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
              <ShoppingBag className="h-3.5 w-3.5" />
              Platform Adapters
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Auto-Generate Agent Tools for{' '}
              <span className="text-blue-400">Your Platform</span>
            </h2>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Point AgentHermes at any supported commerce platform and we
              auto-detect capabilities and generate MCP tools instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="relative p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <platform.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">
                      {platform.name}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      platform.status === 'live'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {platform.status === 'live' ? 'Live' : 'Coming Soon'}
                  </span>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                  {platform.description}
                </p>

                <div className="space-y-2.5">
                  {platform.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-blue-500/70" />
                      <p className="text-xs text-zinc-500">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIRECTORIES ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-6">
              <BookOpen className="h-3.5 w-3.5" />
              Directories
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Published Across{' '}
              <span className="text-purple-400">4 Directories</span>
            </h2>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We publish every agent-ready business to the directories where AI
              agents actually look. Maximum discoverability, zero extra work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {directories.map((dir) => (
              <div
                key={dir.name}
                className="relative p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-purple-500/30 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Globe className="h-4 w-4 text-purple-400" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-100">
                    {dir.name}
                  </h3>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  {dir.description}
                </p>

                {dir.url.startsWith('/') ? (
                  <Link
                    href={dir.url}
                    className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium"
                  >
                    View Registry
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ) : (
                  <a
                    href={dir.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium"
                  >
                    Visit {dir.name}
                    <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOR PARTNERS ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
                <Handshake className="h-3.5 w-3.5" />
                For Partners
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Build With Us
              </h2>

              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Whether you run an MCP directory, an agent platform, or a
                commerce solution — there&apos;s a way to work together. We&apos;re
                building the infrastructure layer for the agent economy and we
                want partners who share that vision.
              </p>

              <div className="space-y-3 mb-8">
                {partnerBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-500/70" />
                    <p className="text-sm text-zinc-300">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — CTA cards */}
            <div className="space-y-5">
              <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Plug className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-100">
                    Want to Integrate?
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 mb-4">
                  Connect your platform to AgentHermes. We&apos;ll generate MCP
                  tools, publish to directories, and route agent traffic to your
                  services.
                </p>
                <a
                  href="mailto:partnerships@agenthermes.ai"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </a>
              </div>

              <div className="p-6 rounded-xl bg-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <BookOpen className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-100">
                    Submit Your MCP Directory
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 mb-4">
                  Run an MCP directory or agent registry? Submit it for
                  cross-listing. We publish to every directory that accepts
                  submissions.
                </p>
                <a
                  href="mailto:partnerships@agenthermes.ai?subject=MCP Directory Cross-Listing"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Submit Directory
                </a>
              </div>

              <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <Code2 className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-100">
                    Apply for API Access
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 mb-4">
                  Build on our 55+ REST endpoints, MCP server, or A2A protocol.
                  Full documentation and sandbox environment available.
                </p>
                <Link
                  href="/developers"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                  Developer Docs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to connect?
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            Score your business, generate agent tools, and get listed across
            every major directory in minutes.
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
              href="/connect"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
            >
              Get Connected
              <Zap className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
