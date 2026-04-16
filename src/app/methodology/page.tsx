import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Search,
  BookOpen,
  UserPlus,
  Link2,
  Activity,
  CreditCard,
  Shield,
  Gauge,
  Layers,
  Lock,
  Eye,
  Zap,
  Server,
  FileJson,
  Bot,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'How Agent Readiness Scores Are Calculated — Methodology | AgentHermes',
  description:
    'The Agent Readiness Score measures business readiness for AI agents across 9 weighted dimensions. Learn the exact weights, scoring caps, ARL levels, tier thresholds, and what signals we detect including MCP, A2A, agent cards, and llms.txt.',
  openGraph: {
    title: 'How Agent Readiness Scores Are Calculated',
    description:
      'The complete methodology behind the Agent Readiness Score: 9 dimensions, exact weights, scoring caps, 7 ARL levels, and tier thresholds. The FICO score of the agent economy.',
    url: 'https://agenthermes.ai/methodology',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Agent Readiness Scores Are Calculated',
    description:
      'The complete methodology behind the Agent Readiness Score: 9 dimensions, exact weights, scoring caps, 7 ARL levels, and tier thresholds.',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/methodology',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const scoringDimensions = [
  {
    id: 'D2',
    name: 'API Quality & Coverage',
    weight: 0.15,
    pct: '15%',
    tier: 1,
    icon: Server,
    color: 'emerald',
    description: 'API Quality measures whether a business has machine-callable endpoints, how well-documented they are, and whether they return structured responses. Businesses with REST APIs, OpenAPI specs, and consistent error handling score highest.',
    signals: ['REST/GraphQL endpoints detected', 'OpenAPI/Swagger spec available', 'Structured JSON responses', 'Consistent error handling', 'Rate limiting headers present'],
  },
  {
    id: 'D8',
    name: 'Reliability & Uptime',
    weight: 0.13,
    pct: '13%',
    tier: 1,
    icon: Activity,
    color: 'emerald',
    description: 'Reliability measures whether an agent can depend on your service being available and responsive. This includes response times, uptime, timeout behavior, and retry-friendliness.',
    signals: ['Response time under 2 seconds', 'TLS certificate valid', 'No server errors on probe', 'Retry-after headers', 'Health check endpoint available'],
  },
  {
    id: 'D7',
    name: 'Security & Trust',
    weight: 0.12,
    pct: '12%',
    tier: 1,
    icon: Shield,
    color: 'emerald',
    description: 'Security measures whether an agent can safely interact with your business. This includes TLS configuration, authentication methods, CORS policies, and security headers.',
    signals: ['TLS 1.2+ enforced', 'HSTS enabled', 'Authentication documented', 'CORS configured', 'Security headers present (CSP, X-Frame-Options)'],
  },
  {
    id: 'D1',
    name: 'Discovery & Findability',
    weight: 0.12,
    pct: '12%',
    tier: 2,
    icon: Search,
    color: 'blue',
    description: 'Discovery measures whether an AI agent can find and identify your business. This includes structured data, agent-specific files (agent-card.json, llms.txt, AGENTS.md), and machine-readable business information.',
    signals: ['agent-card.json present', 'llms.txt file available', 'AGENTS.md published', 'Schema.org structured data', 'MCP server advertised'],
  },
  {
    id: 'D6',
    name: 'Data Format & Structure',
    weight: 0.10,
    pct: '10%',
    tier: 1,
    icon: FileJson,
    color: 'emerald',
    description: 'Data Format measures whether your business returns data in formats agents can parse. Clean JSON with consistent schemas, typed fields, and predictable structures score highest.',
    signals: ['JSON response format', 'Consistent field naming', 'Typed fields (no ambiguous strings)', 'Pagination support', 'Filtering/sorting parameters'],
  },
  {
    id: 'D9',
    name: 'Agent Experience',
    weight: 0.10,
    pct: '10%',
    tier: 1,
    icon: Bot,
    color: 'emerald',
    description: 'Agent Experience measures how well-optimized your business is specifically for AI agent interaction. This includes MCP servers, A2A protocol support, agent-native documentation, and purpose-built agent endpoints.',
    signals: ['MCP server deployed', 'A2A agent card published', 'Agent-optimized documentation', 'Tool descriptions for LLMs', 'Agent-specific rate limits'],
  },
  {
    id: 'D3',
    name: 'Onboarding & Signup',
    weight: 0.08,
    pct: '8%',
    tier: 2,
    icon: UserPlus,
    color: 'blue',
    description: 'Onboarding measures whether an agent can programmatically create an account or start using your service. API key provisioning, OAuth flows, and self-service signup all contribute.',
    signals: ['Programmatic account creation', 'OAuth2 flow available', 'API key self-service', 'No human verification required', 'Free tier or trial available'],
  },
  {
    id: 'D5',
    name: 'Payment & Billing',
    weight: 0.08,
    pct: '8%',
    tier: 3,
    icon: CreditCard,
    color: 'purple',
    description: 'Payment measures whether an agent can complete a transaction programmatically. This includes payment APIs, subscription management, usage-based billing, and invoice endpoints.',
    signals: ['Payment API available', 'Subscription management endpoints', 'Usage-based billing support', 'Invoice API', 'Refund/cancellation programmatic'],
  },
  {
    id: 'D4',
    name: 'Pricing Transparency',
    weight: 0.05,
    pct: '5%',
    tier: 2,
    icon: Eye,
    color: 'blue',
    description: 'Pricing Transparency measures whether an agent can determine what your service costs without human interaction. Machine-readable pricing pages, pricing APIs, and structured pricing data contribute.',
    signals: ['Pricing page with structured data', 'Pricing API endpoint', 'Machine-readable plan comparison', 'No "contact us for pricing"', 'Currency and billing cycle specified'],
  },
]

const agentNativeBonus = {
  id: 'Bonus',
  name: 'Agent-Native Bonus',
  weight: 0.07,
  pct: '7%',
  description: 'The Agent-Native Bonus rewards businesses that go beyond basic API readiness to implement agent-specific protocols. Points are awarded for MCP server deployment, A2A protocol support, agent-card.json, llms.txt, AGENTS.md, and emerging standards like UCP, ACP, and x402.',
  signals: [
    { signal: 'MCP server deployed', points: '+3%' },
    { signal: 'A2A agent card published', points: '+1.5%' },
    { signal: 'agent-card.json at /.well-known/', points: '+1%' },
    { signal: 'llms.txt file available', points: '+0.5%' },
    { signal: 'AGENTS.md published', points: '+0.5%' },
    { signal: 'x402 micropayment support', points: '+0.5%' },
  ],
}

const journeySteps = [
  { step: 1, label: 'FIND', question: 'Can an AI agent discover your business?', icon: Search, color: 'emerald', dimensions: 'D1 Discovery' },
  { step: 2, label: 'UNDERSTAND', question: 'Can an agent know what you offer and what it costs?', icon: BookOpen, color: 'blue', dimensions: 'D4 Pricing, D6 Data' },
  { step: 3, label: 'SIGN UP', question: 'Can an agent create an account?', icon: UserPlus, color: 'purple', dimensions: 'D3 Onboarding' },
  { step: 4, label: 'CONNECT', question: 'Can an agent call your service?', icon: Link2, color: 'amber', dimensions: 'D2 API, D7 Security' },
  { step: 5, label: 'USE', question: 'Can an agent get reliable responses?', icon: Activity, color: 'cyan', dimensions: 'D8 Reliability, D9 Agent Exp' },
  { step: 6, label: 'PAY', question: 'Can an agent pay for the service?', icon: CreditCard, color: 'rose', dimensions: 'D5 Payment' },
]

const scoringCaps = [
  { condition: 'No TLS (HTTP only)', maxScore: 39, explanation: 'Without TLS encryption, a business cannot score above 39/100 regardless of other factors. Agents cannot safely transmit data over unencrypted connections.' },
  { condition: 'No API endpoints detected', maxScore: 29, explanation: 'Without any machine-callable endpoints, the maximum score is 29/100. A business with only a website and no API has severe agent readiness limitations.' },
  { condition: 'No structured data', maxScore: 49, explanation: 'Without any structured data (JSON-LD, OpenAPI, agent-card.json), scores are capped at 49/100. Agents need machine-readable information to operate.' },
]

const authScoring = [
  { response: '200 OK with JSON body', score: '100% of dimension score', explanation: 'Fully open, documented endpoints receive full marks.' },
  { response: '401 Unauthorized + JSON error body', score: '87% of dimension score', explanation: 'Protected endpoints that return structured auth errors prove the API exists and is well-implemented. Scored at 87% of what a 200 would earn.' },
  { response: '401 Unauthorized + HTML/empty', score: '50% of dimension score', explanation: 'Auth-protected but poor error format. The endpoint exists but does not help agents understand how to authenticate.' },
  { response: '403 Forbidden', score: '40% of dimension score', explanation: 'Access denied with no guidance. The endpoint exists but provides no path forward for agents.' },
  { response: 'No response / timeout', score: '0%', explanation: 'Endpoint unreachable. No credit awarded.' },
]

const arlLevels = [
  { level: 'ARL-0', name: 'Invisible', range: '0-9', description: 'The business has no machine-readable presence. AI agents cannot discover, understand, or interact with it in any automated way.', example: 'A local business with only a basic HTML website and a phone number.' },
  { level: 'ARL-1', name: 'Findable', range: '10-24', description: 'The business can be found by AI agents through structured data or directory listings, but offers no programmatic interaction.', example: 'A restaurant with Google Business Profile and Schema.org markup but no reservation API.' },
  { level: 'ARL-2', name: 'Readable', range: '25-39', description: 'The business provides machine-readable information about its services, pricing, and availability, but agents cannot take action.', example: 'An e-commerce store with product feeds and pricing data but no checkout API.' },
  { level: 'ARL-3', name: 'Functional', range: '40-59', description: 'The business has APIs that allow agents to perform basic actions like searching, booking, or querying, but the experience is not optimized for agents.', example: 'A SaaS product with REST API documentation but no MCP server or agent card.' },
  { level: 'ARL-4', name: 'Integrated', range: '60-74', description: 'The business has well-documented APIs with agent-aware features. Agents can complete most of the 6-step journey programmatically.', example: 'A platform with OpenAPI spec, OAuth, structured error responses, and machine-readable pricing.' },
  { level: 'ARL-5', name: 'Agent-Native', range: '75-89', description: 'The business was designed with AI agents as first-class consumers. MCP servers, agent cards, and purpose-built agent experiences are deployed.', example: 'A developer tool with MCP server, A2A agent card, llms.txt, and agent-optimized documentation.' },
  { level: 'ARL-6', name: 'Agent-First', range: '90-100', description: 'The business treats AI agents as primary customers. Every step of the agent journey is optimized, monitored, and continuously improved. No company has achieved this level yet.', example: 'Theoretical: A business with full MCP, A2A, programmatic onboarding, billing API, and real-time agent analytics.' },
]

const tierThresholds = [
  { tier: 'Platinum', range: '90-100', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', description: 'Agent-first businesses. All 9 dimensions score high. Full agent-native protocol support. 0 companies currently.' },
  { tier: 'Gold', range: '75-89', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', description: 'Agent-native businesses with MCP, strong APIs, and most journey steps automated. 1 company currently (Resend, 75).' },
  { tier: 'Silver', range: '60-74', color: 'text-zinc-300', bg: 'bg-zinc-400/10', border: 'border-zinc-400/20', description: 'Well-integrated businesses with documented APIs and structured data. 51 companies currently (10.2%).' },
  { tier: 'Bronze', range: '40-59', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', description: 'Functionally agent-accessible with basic APIs but significant gaps. 250 companies (50%).' },
  { tier: 'Not Scored', range: '0-39', color: 'text-zinc-500', bg: 'bg-zinc-700/10', border: 'border-zinc-700/20', description: 'Below minimum agent readiness. Major gaps in discovery, APIs, or security. 198 companies (39.6%).' },
]

const detectedSignals = [
  { category: 'Agent Protocols', signals: ['MCP (Model Context Protocol) server', 'A2A (Agent-to-Agent) protocol', 'agent-card.json at /.well-known/', 'llms.txt file', 'AGENTS.md file', 'UCP (Universal Context Protocol)', 'ACP (Agent Communication Protocol)', 'x402 micropayment headers'] },
  { category: 'API Standards', signals: ['OpenAPI / Swagger specification', 'GraphQL introspection', 'REST endpoints with JSON responses', 'gRPC service definitions', 'WebSocket endpoints', 'Webhook support'] },
  { category: 'E-Commerce Platforms', signals: ['Shopify storefront API', 'WooCommerce REST API', 'Square API', 'Stripe integration', 'BigCommerce API'] },
  { category: 'Discovery Signals', signals: ['Schema.org structured data (JSON-LD)', 'Open Graph metadata', 'robots.txt with sitemap', 'RSS/Atom feeds', 'DNS TXT records for verification'] },
  { category: 'Security Signals', signals: ['TLS 1.2+ certificate', 'HSTS header', 'Content-Security-Policy', 'X-Frame-Options', 'CORS configuration', 'Authentication method (OAuth, API key, Bearer)'] },
]

const faqItems = [
  {
    q: 'How is the Agent Readiness Score calculated?',
    a: 'The Agent Readiness Score is a weighted composite of 9 dimensions plus an agent-native bonus. Each dimension measures a specific aspect of agent interaction readiness, from discovery (can agents find you?) to payment (can agents pay you?). Dimension weights range from 5% (Pricing Transparency) to 15% (API Quality). The total weights sum to 93%, with a 7% agent-native bonus for implementing protocols like MCP and A2A.',
  },
  {
    q: 'What are the 9 scoring dimensions?',
    a: 'The 9 dimensions are: D1 Discovery (12%), D2 API Quality (15%), D3 Onboarding (8%), D4 Pricing Transparency (5%), D5 Payment (8%), D6 Data Format (10%), D7 Security (12%), D8 Reliability (13%), and D9 Agent Experience (10%). There is also a 7% Agent-Native Bonus for implementing agent-specific protocols.',
  },
  {
    q: 'What is a scoring cap?',
    a: 'Scoring caps are hard maximum scores triggered by critical deficiencies. A business without TLS encryption cannot score above 39/100. A business with no API endpoints cannot score above 29/100. These caps override dimension scores because they represent fundamental barriers to agent interaction.',
  },
  {
    q: 'How does auth-aware scoring work?',
    a: 'Auth-aware scoring recognizes that many APIs require authentication. A 401 Unauthorized response with a well-structured JSON error body scores 87% of what a 200 OK would score, because it proves the API exists and is properly implemented. This prevents businesses from being penalized for having secure, authenticated APIs.',
  },
  {
    q: 'What is an ARL level?',
    a: 'ARL (Agent Readiness Level) is a 7-point scale from ARL-0 (Invisible) to ARL-6 (Agent-First) that categorizes businesses by their stage of agent readiness. It maps directly to score ranges: ARL-0 is 0-9, ARL-3 is 40-59 (Bronze tier), and ARL-6 is 90-100 (Platinum tier). No company has reached ARL-6.',
  },
  {
    q: 'What protocols does the scanner detect?',
    a: 'The AgentHermes scanner detects MCP (Model Context Protocol) servers, A2A (Agent-to-Agent) protocol support, agent-card.json files, llms.txt files, AGENTS.md files, OpenAPI/Swagger specs, GraphQL endpoints, and e-commerce platforms including Shopify, WooCommerce, and Square. It also checks for x402 micropayment headers and emerging agent communication protocols.',
  },
  {
    q: 'How often are scores updated?',
    a: 'Scores are calculated on each scan. Businesses can be rescanned at any time through the AgentHermes audit tool. The scanner re-evaluates all 9 dimensions and the agent-native bonus on every scan, so scores reflect the current state of the business.',
  },
  {
    q: 'Are vertical-specific weights applied?',
    a: 'Yes. AgentHermes uses 27 vertical scoring profiles that adjust dimension weights based on industry context. A SaaS company is weighted more heavily on API Quality and Agent Experience, while a restaurant is weighted more on Discovery and Data Format. Weights always renormalize to the same total.',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getColorClasses(color: string) {
  const map: Record<string, { border: string; bg: string; text: string; bgLight: string }> = {
    emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400', bgLight: 'bg-emerald-500/5' },
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-400', bgLight: 'bg-blue-500/5' },
    purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/10', text: 'text-purple-400', bgLight: 'bg-purple-500/5' },
    amber: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400', bgLight: 'bg-amber-500/5' },
    cyan: { border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', text: 'text-cyan-400', bgLight: 'bg-cyan-500/5' },
    rose: { border: 'border-rose-500/30', bg: 'bg-rose-500/10', text: 'text-rose-400', bgLight: 'bg-rose-500/5' },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function MethodologyPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Agent Readiness Scores Are Calculated',
    description:
      'The complete scoring methodology for the Agent Readiness Score: 9 weighted dimensions, scoring caps, auth-aware scoring, 7 ARL levels, and tier thresholds.',
    url: 'https://agenthermes.ai/methodology',
    publisher: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    datePublished: '2026-04-01',
    dateModified: '2026-04-15',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
      { '@type': 'ListItem', position: 2, name: 'Methodology', item: 'https://agenthermes.ai/methodology' },
    ],
  }

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <Gauge className="h-3.5 w-3.5" />
              Scoring methodology v4
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              How Agent Readiness Scores{' '}
              <span className="text-emerald-500">Are Calculated</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-2xl mx-auto mb-10">
              The Agent Readiness Score measures how prepared a business is for AI
              agent interactions across{' '}
              <strong className="text-white">9 weighted dimensions</strong>. This
              page explains exactly how every point is earned.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
              >
                Get Your Score
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/benchmarks"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
              >
                View Benchmarks
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE 6-STEP AGENT JOURNEY ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            The 6-Step Agent Journey
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            Every AI agent interaction follows 6 steps: FIND, UNDERSTAND, SIGN UP, CONNECT, USE, and PAY. The Agent Readiness Score measures how well a business supports each step. The 9 scoring dimensions map directly to these journey stages.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {journeySteps.map((step) => {
              const colors = getColorClasses(step.color)
              return (
                <div key={step.label} className={`p-4 rounded-xl ${colors.bgLight} border ${colors.border} text-center`}>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border} mx-auto mb-3`}>
                    <step.icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <div className={`text-xs font-mono font-bold ${colors.text} mb-1`}>
                    STEP {step.step}
                  </div>
                  <div className="text-sm font-bold text-zinc-100 mb-1">{step.label}</div>
                  <p className="text-[10px] text-zinc-500 leading-tight">{step.dimensions}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 9 SCORING DIMENSIONS ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            The 9 Scoring Dimensions
          </h2>
          <p className="text-zinc-400 mb-4 max-w-3xl">
            The Agent Readiness Score is a weighted composite of 9 dimensions organized into 3 tiers by importance. Tier 1 dimensions account for 60% of the total score, Tier 2 for 25%, and Tier 3 for 15%.
          </p>

          {/* Weight summary table */}
          <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left px-5 py-3 text-zinc-500 font-medium text-xs uppercase tracking-wider">ID</th>
                    <th className="text-left px-5 py-3 text-zinc-500 font-medium text-xs uppercase tracking-wider">Dimension</th>
                    <th className="text-right px-5 py-3 text-zinc-500 font-medium text-xs uppercase tracking-wider">Weight</th>
                    <th className="text-center px-5 py-3 text-zinc-500 font-medium text-xs uppercase tracking-wider">Tier</th>
                    <th className="text-left px-5 py-3 text-zinc-500 font-medium text-xs uppercase tracking-wider w-1/3">Visual</th>
                  </tr>
                </thead>
                <tbody>
                  {scoringDimensions.map((d) => (
                    <tr key={d.id} className="border-b border-zinc-800/40 hover:bg-zinc-800/20">
                      <td className="px-5 py-2.5 font-mono text-xs text-emerald-400">{d.id}</td>
                      <td className="px-5 py-2.5 text-zinc-200 font-medium">{d.name}</td>
                      <td className="px-5 py-2.5 text-right text-zinc-300 font-semibold tabular-nums">{d.pct}</td>
                      <td className="px-5 py-2.5 text-center">
                        <span className={`text-xs font-mono ${d.tier === 1 ? 'text-emerald-400' : d.tier === 2 ? 'text-blue-400' : 'text-purple-400'}`}>
                          T{d.tier}
                        </span>
                      </td>
                      <td className="px-5 py-2.5">
                        <div className="h-3 bg-zinc-800/60 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-500/70" style={{ width: `${d.weight * 100 * 6.67}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b border-zinc-800/40 hover:bg-zinc-800/20 bg-zinc-900/30">
                    <td className="px-5 py-2.5 font-mono text-xs text-violet-400">+</td>
                    <td className="px-5 py-2.5 text-zinc-200 font-medium">Agent-Native Bonus</td>
                    <td className="px-5 py-2.5 text-right text-zinc-300 font-semibold tabular-nums">7%</td>
                    <td className="px-5 py-2.5 text-center"><span className="text-xs font-mono text-violet-400">Bonus</span></td>
                    <td className="px-5 py-2.5">
                      <div className="h-3 bg-zinc-800/60 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-violet-500/70" style={{ width: `${0.07 * 100 * 6.67}%` }} />
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t border-zinc-700">
                    <td className="px-5 py-2.5" />
                    <td className="px-5 py-2.5 text-zinc-200 font-bold">Total</td>
                    <td className="px-5 py-2.5 text-right text-white font-bold">100%</td>
                    <td className="px-5 py-2.5" />
                    <td className="px-5 py-2.5" />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Detailed dimension cards */}
          <div className="space-y-4">
            {scoringDimensions.map((d) => (
              <details key={d.id} className="group rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors overflow-hidden">
                <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${d.color}-500/10 border border-${d.color}-500/30 flex-shrink-0`}>
                    <d.icon className={`h-5 w-5 text-${d.color}-400`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-emerald-400">{d.id}</span>
                      <h3 className="text-sm font-semibold text-zinc-200">{d.name}</h3>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">Weight: {d.pct} | Tier {d.tier}</p>
                  </div>
                  <span className="text-zinc-600 group-open:rotate-45 transition-transform text-lg flex-shrink-0">+</span>
                </summary>
                <div className="px-5 pb-5 pt-0 border-t border-zinc-800/50">
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4 mt-4">{d.description}</p>
                  <div className="space-y-1.5">
                    {d.signals.map((signal) => (
                      <div key={signal} className="flex items-center gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500/60 flex-shrink-0" />
                        <span className="text-xs text-zinc-300">{signal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>

          {/* Agent-Native Bonus */}
          <div className="mt-6 p-5 rounded-xl bg-violet-500/5 border border-violet-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/30">
                <Zap className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-violet-300">Agent-Native Bonus (+7%)</h3>
                <p className="text-xs text-zinc-500">Awarded for implementing agent-specific protocols</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">{agentNativeBonus.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {agentNativeBonus.signals.map((s) => (
                <div key={s.signal} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                  <span className="text-xs text-zinc-300">{s.signal}</span>
                  <span className="text-xs font-semibold text-violet-400 tabular-nums">{s.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCORING CAPS ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Scoring Caps
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            Scoring caps are hard maximum scores triggered by critical deficiencies. These caps override dimension scores because they represent fundamental barriers that prevent safe or meaningful agent interaction.
          </p>

          <div className="space-y-4">
            {scoringCaps.map((cap) => (
              <div key={cap.condition} className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-red-300">{cap.condition}</span>
                    <span className="text-sm text-zinc-500 ml-2">
                      Max score: <strong className="text-red-400">{cap.maxScore}/100</strong>
                    </span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed ml-8">{cap.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AUTH-AWARE SCORING ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Auth-Aware Scoring
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            Auth-aware scoring prevents businesses from being penalized for having secure, authenticated APIs. A 401 Unauthorized response with a JSON error body proves the API exists and is well-implemented, earning 87% of the full score.
          </p>

          <div className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">HTTP Response</th>
                    <th className="text-right px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Score Credit</th>
                    <th className="text-left px-5 py-3.5 text-zinc-500 font-medium text-xs uppercase tracking-wider">Explanation</th>
                  </tr>
                </thead>
                <tbody>
                  {authScoring.map((a) => (
                    <tr key={a.response} className="border-b border-zinc-800/40 hover:bg-zinc-800/20">
                      <td className="px-5 py-3 font-mono text-xs text-zinc-200">{a.response}</td>
                      <td className="px-5 py-3 text-right font-semibold text-emerald-400 tabular-nums text-xs">{a.score}</td>
                      <td className="px-5 py-3 text-zinc-400 text-xs">{a.explanation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ARL LEVELS ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            7 Agent Readiness Levels (ARL)
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            Agent Readiness Levels (ARL) are a 7-point classification system that maps score ranges to descriptive maturity stages. ARL provides a quick way to communicate how agent-ready a business is, from ARL-0 (Invisible) to ARL-6 (Agent-First).
          </p>

          <div className="space-y-3">
            {arlLevels.map((arl) => (
              <div key={arl.level} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20">
                    <div className="text-lg font-bold text-emerald-400 font-mono">{arl.level}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">{arl.range}/100</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-zinc-200 mb-1">{arl.name}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-2">{arl.description}</p>
                    <p className="text-xs text-zinc-600 italic">Example: {arl.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIER THRESHOLDS ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Tier Thresholds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            Agent readiness tiers group businesses into 5 levels based on their composite score. Tier thresholds are: Platinum 90+, Gold 75+, Silver 60+, Bronze 40+, and Not Scored below 40.
          </p>

          <div className="space-y-3">
            {tierThresholds.map((t) => (
              <div key={t.tier} className={`p-5 rounded-xl ${t.bg} border ${t.border}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-lg font-bold ${t.color}`}>{t.tier}</span>
                  <span className="text-sm font-mono text-zinc-400">{t.range}/100</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT WE DETECT ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            What the Scanner Detects
          </h2>
          <p className="text-zinc-400 mb-8 max-w-3xl">
            The AgentHermes scanner checks for 40+ signals across 5 categories during each scan. Detection is non-invasive and reads only publicly available information.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {detectedSignals.map((cat) => (
              <div key={cat.category} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <h3 className="text-sm font-semibold text-zinc-200 mb-3">{cat.category}</h3>
                <div className="space-y-1.5">
                  {cat.signals.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-emerald-500/50 flex-shrink-0" />
                      <span className="text-xs text-zinc-400">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq) => (
              <details
                key={faq.q}
                className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-sm font-semibold text-zinc-200 pr-4">{faq.q}</h3>
                  <span className="text-zinc-600 group-open:rotate-45 transition-transform text-lg flex-shrink-0">+</span>
                </summary>
                <p className="text-sm text-zinc-500 leading-relaxed mt-3 pt-3 border-t border-zinc-800/50">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTERNAL LINKS ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight mb-6 text-zinc-400">
            Related Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { href: '/benchmarks', label: 'Agent Readiness Benchmarks', desc: 'Industry averages and tier distribution data' },
              { href: '/agent-readiness-statistics', label: 'Statistics Page', desc: 'Pure numbers from 500+ scans' },
              { href: '/glossary', label: 'Glossary', desc: 'Definitions of agent readiness terms' },
              { href: '/standard', label: 'Agent Readiness Standard', desc: 'The agent-hermes.json specification' },
              { href: '/for', label: 'Industry Guides', desc: '15 vertical-specific playbooks' },
              { href: '/blog/how-to-improve-agent-readiness-score', label: 'How to Improve Your Score', desc: 'Step-by-step guide to raising your score' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-emerald-500/30 transition-colors group"
              >
                <div className="text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors">{link.label}</div>
                <p className="text-xs text-zinc-500 mt-1">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 sm:py-32 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            See your score across all 9 dimensions
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            Get a free Agent Readiness Score with a detailed breakdown of every
            dimension, your ARL level, and specific recommendations.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
          >
            Get Your Score
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
