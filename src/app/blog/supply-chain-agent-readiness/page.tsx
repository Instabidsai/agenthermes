import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  Network,
  Package,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Supply Chain Agent Readiness: Why Procurement AI Agents Can\'t Find Your Inventory | AgentHermes',
  description:
    'The $25T global supply chain market runs on 1970s EDI and VPN-locked ERPs. AI procurement agents cannot access product catalogs, real-time inventory, or pricing. The first supplier with an MCP server wins every AI-routed purchase order.',
  keywords: [
    'supply chain procurement agent readiness',
    'supply chain AI agent',
    'procurement agent readiness',
    'inventory API',
    'EDI agent readiness',
    'supply chain MCP server',
    'AI procurement agent',
    'product catalog API',
    'supply chain automation AI',
  ],
  openGraph: {
    title:
      'Supply Chain Agent Readiness: Why Procurement AI Agents Can\'t Find Your Inventory',
    description:
      '$25T global market running on 1970s EDI. AI procurement agents need real-time inventory APIs, structured pricing, and automated RFQ. Zero suppliers offer this.',
    url: 'https://agenthermes.ai/blog/supply-chain-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Supply Chain Agent Readiness: Why Procurement AI Can\'t Find Inventory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Supply Chain Agent Readiness: Why Procurement AI Can\'t Find Your Inventory',
    description:
      '$25T market. 1970s EDI. VPN-locked ERPs. Zero public APIs. The first supplier with an MCP server gets every AI procurement agent\'s PO.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/supply-chain-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const supplyChainProblems = [
  {
    problem: 'EDI: A protocol designed in the 1970s',
    detail:
      'Electronic Data Interchange (EDI) is the dominant protocol for B2B supply chain communication. It was designed in the 1970s, uses fixed-width or delimiter-separated flat files, requires expensive translation software, and runs over proprietary VANs (Value-Added Networks). It works — for the companies already connected. For AI agents, EDI is a brick wall. No discoverability, no standard API, no real-time queries.',
    icon: Network,
    color: 'red',
  },
  {
    problem: 'ERPs locked behind VPNs',
    detail:
      'SAP, Oracle, Microsoft Dynamics, and Infor house the world\'s inventory data. But these systems sit behind corporate VPNs with no public API. Even partner integrations require months of EDI onboarding, legal agreements, and custom mapping. An AI procurement agent cannot authenticate, cannot discover endpoints, and cannot query inventory.',
    icon: Shield,
    color: 'red',
  },
  {
    problem: 'No public pricing or availability data',
    detail:
      'Supplier pricing is almost always negotiated per-customer. Volume discounts, contract pricing, spot market rates — none of this is exposed publicly. Availability data is even worse: most suppliers cannot tell you what they have in stock without running a manual warehouse check. Real-time inventory visibility is the holy grail of supply chain, and it barely exists within enterprises, let alone for external agents.',
    icon: DollarSign,
    color: 'amber',
  },
  {
    problem: 'RFQ process is manual and slow',
    detail:
      'Request for Quote (RFQ) is how procurement works: a buyer sends specifications, the supplier responds with pricing and lead times. This process takes days to weeks, involves email chains, PDF attachments, and phone negotiations. An AI procurement agent that could submit structured RFQs and receive structured responses in minutes would compress this cycle by 100x.',
    icon: Clock,
    color: 'amber',
  },
]

const agentReadyFeatures = [
  {
    name: 'Product Catalog API',
    description:
      'Structured, searchable product catalog with SKUs, specifications, categories, certifications, and compatibility data. search_products({ category: "bearings", bore_diameter_mm: 25 }) returns matching products with full technical specs.',
    endpoint: 'GET /api/products?category=bearings&bore_mm=25',
    icon: Search,
    color: 'emerald',
  },
  {
    name: 'Real-Time Inventory Endpoint',
    description:
      'Live stock levels by warehouse location. check_inventory({ sku: "BRG-6205-2RS", quantity: 500 }) returns available stock, warehouse locations, and estimated restock date if quantity exceeds on-hand.',
    endpoint: 'GET /api/inventory?sku=BRG-6205-2RS&qty=500',
    icon: Package,
    color: 'emerald',
  },
  {
    name: 'Automated RFQ Submission',
    description:
      'Structured RFQ endpoint that accepts product specifications, quantities, and delivery requirements. Returns a quote with unit pricing, lead time, shipping options, and validity period — all as JSON, not a PDF attachment.',
    endpoint: 'POST /api/rfq/submit',
    icon: FileJson,
    color: 'blue',
  },
  {
    name: 'Delivery Timeline Webhook',
    description:
      'Real-time delivery status updates pushed to the buyer\'s system. Order confirmed, in production, shipped, in transit, delivered. Each event includes structured tracking data. subscribe_delivery({ order_id: "PO-2026-4421" }) registers a webhook URL.',
    endpoint: 'POST /api/webhooks/delivery/subscribe',
    icon: Truck,
    color: 'blue',
  },
  {
    name: 'Compliance and Certification Data',
    description:
      'Structured data on material certifications (ISO, RoHS, REACH), country of origin, material composition, and regulatory compliance status. AI procurement agents need this to verify sourcing requirements without reading PDF certificates.',
    endpoint: 'GET /api/products/{sku}/certifications',
    icon: Shield,
    color: 'purple',
  },
]

const marketStats = [
  { value: '$25T', label: 'Global supply chain', icon: Globe },
  { value: '0', label: 'Suppliers with MCP', icon: Server },
  { value: '1970s', label: 'EDI protocol era', icon: Network },
  { value: '~3/100', label: 'Avg supplier score', icon: BarChart3 },
]

const comparisonRows = [
  {
    aspect: 'Find products',
    current: 'Browse catalog PDF, call sales rep, search distributor site',
    agentReady: 'search_products() with structured filters returns matches in milliseconds',
  },
  {
    aspect: 'Check availability',
    current: 'Email or call for stock check, wait hours to days',
    agentReady: 'check_inventory() returns real-time stock by warehouse',
  },
  {
    aspect: 'Get pricing',
    current: 'Submit RFQ via email, negotiate over phone, 3-14 day cycle',
    agentReady: 'submit_rfq() returns structured quote in seconds',
  },
  {
    aspect: 'Place order',
    current: 'Fax PO, email PO, or enter into EDI translator',
    agentReady: 'create_order() with items, shipping, and payment terms',
  },
  {
    aspect: 'Track delivery',
    current: 'Call carrier, check tracking website, email supplier',
    agentReady: 'Webhook pushes real-time status events automatically',
  },
  {
    aspect: 'Verify compliance',
    current: 'Request PDF certificates, manually review each document',
    agentReady: 'get_certifications() returns structured compliance data',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why is the supply chain so far behind on agent readiness?',
    answer:
      'Three factors: legacy infrastructure (EDI has worked for 50 years and changing it is expensive), security concerns (inventory and pricing data is considered competitively sensitive), and relationship-based selling (many B2B transactions depend on personal relationships and negotiated terms). These are real barriers, but they are not permanent. The cost of being undiscoverable by AI procurement agents will eventually exceed the cost of exposing structured data.',
  },
  {
    question: 'Won\'t public inventory data help competitors?',
    answer:
      'This is the most common objection. But consider: your website already shows your product catalog. The incremental information in an API is real-time availability and structured pricing tiers — which your competitors can get by calling your sales team today. The risk of competitive intelligence leakage is small. The risk of being invisible to AI procurement agents is existential. You can also use authenticated APIs that require buyer verification before exposing pricing.',
  },
  {
    question: 'How does this interact with existing EDI systems?',
    answer:
      'An MCP server does not replace EDI — it complements it. EDI handles the established buyer-supplier connections that already exist. An MCP server handles discovery and initial engagement — helping new buyers find you, check your catalog, and submit RFQs before they ever set up an EDI connection. Think of it as the front door. EDI is the hallway you walk down after you are inside.',
  },
  {
    question: 'What about platforms like Alibaba and ThomasNet?',
    answer:
      'Marketplace platforms aggregate supplier data but lock it inside their platforms. An AI procurement agent cannot query Alibaba\'s database directly — it has to scrape search results or use limited APIs designed for human workflows. The supplier with their own MCP server bypasses the marketplace entirely. The agent queries the supplier directly, getting faster responses and richer data than any marketplace intermediary provides.',
  },
  {
    question: 'What is the business case for a supplier MCP server?',
    answer:
      'AI procurement agents are being deployed by Fortune 500 companies today. These agents evaluate suppliers by querying structured data. A supplier with an MCP server appears in every AI-mediated procurement search. A supplier without one is invisible. In a $25 trillion market, capturing even 0.01% of AI-routed procurement through early mover advantage represents $2.5 billion in annual revenue opportunity. The ROI on a $5,000 MCP server implementation is measured in orders of magnitude.',
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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SupplyChainAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Supply Chain Agent Readiness: Why Procurement AI Agents Can\'t Find Your Inventory',
    description:
      'The $25T global supply chain runs on 1970s EDI and VPN-locked ERPs. AI procurement agents need public APIs for product catalogs, real-time inventory, and automated RFQ. A complete analysis of the gap.',
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
      'https://agenthermes.ai/blog/supply-chain-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1900,
    keywords:
      'supply chain procurement agent readiness, EDI agent readiness, inventory API, AI procurement agent, supply chain MCP server',
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
          name: 'Supply Chain Agent Readiness',
          item: 'https://agenthermes.ai/blog/supply-chain-agent-readiness',
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
      title="Supply Chain Agent Readiness: Why Procurement AI Agents Can't Find Your Inventory"
      shareUrl="https://agenthermes.ai/blog/supply-chain-agent-readiness"
      currentHref="/blog/supply-chain-agent-readiness"
    >
      <div className="relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd),
          }}
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
                Supply Chain Agent Readiness
              </span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <Package className="h-3.5 w-3.5" />
                Vertical Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                $25T Market
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Supply Chain Agent Readiness: Why Procurement AI Agents{' '}
              <span className="text-emerald-400">
                Can&apos;t Find Your Inventory
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Global supply chains move{' '}
              <strong className="text-zinc-100">
                $25 trillion
              </strong>{' '}
              worth of goods every year. The dominant communication
              protocol — EDI — was designed in the 1970s. Inventory
              systems sit behind corporate VPNs. There is no public API
              for product availability, pricing, or lead times. AI
              procurement agents are ready to automate purchasing. But
              they have nothing to connect to.
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
                    14 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== THE MARKET ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-500" />
              The $25 Trillion Market That AI Cannot Touch
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Supply chain and procurement represent the largest
                B2B market in the world. Every physical product — from
                the steel in a building to the capacitors in a
                smartphone — passes through a supply chain. Procurement
                teams at every company on earth spend billions annually
                finding suppliers, comparing quotes, placing orders, and
                tracking deliveries.
              </p>
              <p>
                AI procurement agents promise to automate most of this
                workflow. They can analyze specifications, query
                supplier catalogs, compare pricing across vendors,
                submit purchase orders, and track fulfillment — all
                without human intervention. Companies like Amazon
                Business, SAP Ariba, and Coupa are building these
                capabilities today.
              </p>
              <p>
                But the agents have a fundamental problem:{' '}
                <strong className="text-zinc-100">
                  the suppliers they need to reach have no public APIs
                </strong>
                . The world&apos;s supply chain data is locked inside
                ERP systems, transmitted over 50-year-old EDI protocols,
                and hidden behind VPN walls. An AI procurement agent
                trying to find a supplier is like a web crawler trying
                to index a book that has never been digitized.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {marketStats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== THE FOUR BARRIERS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              Four Barriers Blocking AI Procurement
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The supply chain&apos;s agent readiness problem is not a
                matter of missing features. It is a structural
                architecture issue rooted in decades of legacy systems
                and closed networks.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {supplyChainProblems.map((item) => {
                const colors = getColorClasses(item.color)
                return (
                  <div
                    key={item.problem}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <item.icon
                          className={`h-5 w-5 ${colors.text}`}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">
                        {item.problem}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== CURRENT VS AGENT-READY ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              Current State vs Agent-Ready Supply Chain
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Every step of the procurement process has an agent-ready
              equivalent. The gap is not in the AI — it is in the
              infrastructure.
            </p>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Task</div>
                <div>Today</div>
                <div>Agent-Ready</div>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={row.aspect}
                  className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">
                    {row.aspect}
                  </div>
                  <div className="text-zinc-500">{row.current}</div>
                  <div className="text-emerald-400">
                    {row.agentReady}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              What an Agent-Ready Supplier Looks Like
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                An agent-ready supplier exposes five core capabilities
                through structured APIs. These do not replace existing
                EDI connections with established customers — they add a
                discovery and engagement layer for new AI-mediated
                procurement.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {agentReadyFeatures.map((feature) => {
                const colors = getColorClasses(feature.color)
                return (
                  <div
                    key={feature.name}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <feature.icon
                          className={`h-5 w-5 ${colors.text}`}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">
                        {feature.name}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500">
                        <span className="text-zinc-400 font-medium">
                          Endpoint:
                        </span>{' '}
                        <code
                          className={`${colors.text} text-xs`}
                        >
                          {feature.endpoint}
                        </code>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== THE MCP SERVER ADVANTAGE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              The First Supplier With an MCP Server Wins
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Here is the competitive dynamic that makes this urgent.
                AI procurement agents query available suppliers
                programmatically. If your competitor has an MCP server
                and you do not, the agent finds them and never discovers
                you. The purchase order goes to the supplier the agent
                can reach — not the supplier with the best product.
              </p>
              <p>
                This is exactly what happened with e-commerce in the
                2000s. Suppliers who listed on Amazon and Alibaba
                captured online procurement traffic. Suppliers who
                refused to go digital lost market share to competitors
                who were discoverable. The MCP server is the next
                version of this — except the discovery is done by AI
                agents, not human buyers browsing marketplaces.
              </p>
              <p>
                The numbers are staggering. In a $25 trillion market,
                even a fraction of procurement shifting to AI-mediated
                channels represents enormous revenue. The suppliers who
                are agent-ready when that shift happens will capture
                disproportionate share. As{' '}
                <Link
                  href="/blog/manufacturing-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  manufacturing embraces agent readiness
                </Link>{' '}
                and{' '}
                <Link
                  href="/blog/logistics-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  logistics providers build APIs
                </Link>
                , the supply chain will transform from end to end.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">
                  The MCP advantage is compounding:
                </strong>{' '}
                Every purchase order an AI agent routes through your
                MCP server generates data — what agents search for,
                what quantities they request, what specifications they
                need. This data feeds back into your sales intelligence.
                You learn what the market needs before your competitors
                even know the question was asked.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PATH TO AGENT READINESS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              The Path From 3 to 50+
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Supply chain companies do not need to rebuild their
                infrastructure overnight. Agent readiness can be layered
                on top of existing systems incrementally.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                {
                  step: '1',
                  title: 'Publish a structured product catalog (3 to 15)',
                  detail:
                    'Export your product catalog as structured JSON on your website. SKUs, categories, specifications, and basic pricing tiers. This alone makes you searchable by AI procurement agents — most competitors have nothing.',
                  icon: Layers,
                },
                {
                  step: '2',
                  title: 'Add an inventory status endpoint (15 to 25)',
                  detail:
                    'Even a daily-updated stock level API (not real-time) is more than 99% of suppliers offer. categories: in-stock, limited, made-to-order, out-of-stock. Agents can filter before sending an RFQ.',
                  icon: Package,
                },
                {
                  step: '3',
                  title: 'Build an automated RFQ endpoint (25 to 40)',
                  detail:
                    'Accept structured RFQ submissions and return structured quotes. This compresses a multi-day email process into seconds. The agent submits specs and quantities, your system returns pricing and lead times.',
                  icon: FileJson,
                },
                {
                  step: '4',
                  title: 'Deploy an MCP server (40 to 55+)',
                  detail:
                    'Bundle all capabilities into an MCP server that AI agents can discover and use through the standard protocol. Add delivery webhooks and compliance data for full procurement automation.',
                  icon: Server,
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
                      <h3 className="font-bold text-zinc-100 text-sm">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
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
                    'Manufacturing Agent Readiness: Why Factories Score Zero',
                  href: '/blog/manufacturing-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Logistics Agent Readiness: Shipping and Freight',
                  href: '/blog/logistics-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
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
              Can AI procurement agents find your products?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run a free Agent Readiness Scan and see how your supply
              chain presence scores across all 9 dimensions. Find out
              exactly what AI procurement agents can and cannot access.
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
