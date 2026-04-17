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
  Cpu,
  DollarSign,
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'AI Agent Frameworks and Agent Readiness: How LangChain, CrewAI, and AutoGen Discover Businesses | AgentHermes',
  description:
    'How the major AI agent frameworks actually find and interact with business APIs. LangChain, CrewAI, AutoGen all look for the same things: OpenAPI specs, MCP servers, structured JSON, agent-card.json. Your agent readiness score predicts framework compatibility.',
  keywords: [
    'AI agent frameworks discover businesses',
    'LangChain business API',
    'CrewAI tool discovery',
    'AutoGen agent business',
    'MCP server frameworks',
    'agent readiness frameworks',
    'LangChain MCP',
    'CrewAI agent readiness',
    'AutoGen business discovery',
  ],
  openGraph: {
    title: 'AI Agent Frameworks and Agent Readiness: How LangChain, CrewAI, and AutoGen Discover Businesses',
    description:
      'The framework does not matter — the API structure does. How LangChain, CrewAI, and AutoGen discover businesses and why your agent readiness score predicts compatibility with all of them.',
    url: 'https://agenthermes.ai/blog/ai-agent-frameworks-comparison',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Agent Frameworks and Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agent Frameworks and Agent Readiness: How LangChain, CrewAI, and AutoGen Discover Businesses',
    description:
      'LangChain, CrewAI, AutoGen all look for the same things. Your agent readiness score predicts how easily any framework can use your API.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/ai-agent-frameworks-comparison',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const frameworks = [
  {
    name: 'LangChain',
    description: 'The most popular agent framework. Agents use "tools" — Python functions with typed inputs and descriptions. LangChain discovers capabilities through tool definitions, API chains, and OpenAPI spec parsing.',
    discovery: 'OpenAPI specs parsed into tools automatically. Each endpoint becomes a callable function. Descriptions from the spec become the tool\'s natural language description that the LLM uses to decide when to call it.',
    mcpSupport: 'Native MCP client since v0.3. Can connect to any MCP server and auto-discover tools, resources, and prompts.',
    strength: 'Largest ecosystem. 3,000+ integrations. If your API has an OpenAPI spec, LangChain can probably use it today.',
    icon: Code2,
    color: 'emerald',
  },
  {
    name: 'CrewAI',
    description: 'Role-based multi-agent framework. Agents have roles ("researcher," "analyst," "customer service") and are assigned tools. Discovery happens when crews are assembled with tool configurations.',
    discovery: 'Tools are defined per-agent. CrewAI supports custom tool classes that wrap API calls. The framework looks for structured endpoints with clear input/output schemas.',
    mcpSupport: 'MCP integration via community toolkit. Agents can use MCP servers as tool sources, with each MCP tool becoming a CrewAI tool automatically.',
    strength: 'Multi-agent coordination. A "booking crew" might have a researcher agent (finds options), a negotiator agent (compares pricing), and a scheduler agent (books the best option).',
    icon: Users,
    color: 'blue',
  },
  {
    name: 'AutoGen',
    description: 'Microsoft\'s multi-agent conversation framework. Agents talk to each other in structured conversations to complete tasks. External tools are called during these conversations.',
    discovery: 'Function calling through OpenAI-compatible tool definitions. AutoGen agents register functions that can be called during conversations. API discovery is through function schemas.',
    mcpSupport: 'MCP support through AutoGen extensions. Agents can connect to MCP servers and use discovered tools as conversation participants.',
    strength: 'Conversational problem-solving. Complex tasks that require back-and-forth (like getting a custom quote) are handled naturally through agent conversations.',
    icon: Network,
    color: 'purple',
  },
]

const discoverySignals = [
  { signal: 'OpenAPI / Swagger spec', weight: 'Critical', description: 'Every framework parses these. If you have one, every framework can auto-generate tools from your API.', frameworks: 'All 3' },
  { signal: 'MCP server', weight: 'Critical', description: 'The universal protocol. One MCP server works with LangChain, CrewAI, AutoGen, Claude, ChatGPT, and any future framework.', frameworks: 'All 3' },
  { signal: 'agent-card.json', weight: 'High', description: 'Declares capabilities, auth requirements, and rate limits. Tells frameworks what your API can do before they try calling it.', frameworks: 'All 3' },
  { signal: 'Structured JSON responses', weight: 'High', description: 'Typed, consistent JSON with clear field names. Frameworks parse responses into their internal data structures.', frameworks: 'All 3' },
  { signal: 'llms.txt', weight: 'Medium', description: 'Human-readable capability description. Helps LLMs understand your service before making tool calls.', frameworks: 'LangChain, AutoGen' },
  { signal: 'OAuth / API key auth', weight: 'High', description: 'Standard auth flows that frameworks can handle programmatically. Bearer tokens and API keys are universal.', frameworks: 'All 3' },
  { signal: 'Webhooks', weight: 'Medium', description: 'Async event notifications. Frameworks use these for long-running operations (order processing, appointment confirmation).', frameworks: 'All 3' },
  { signal: 'Rate limit headers', weight: 'Medium', description: 'X-RateLimit-Remaining and Retry-After. Frameworks use these to throttle requests and avoid getting blocked.', frameworks: 'All 3' },
]

const scoreMapping = [
  { range: '0-19 (Not Scored)', compatibility: 'None', detail: 'No structured API. Frameworks cannot interact with your business at all. They fall back to web scraping, which is unreliable.' },
  { range: '20-39 (Bronze)', compatibility: 'Minimal', detail: 'Some structured data exists but no reliable API. Frameworks might extract basic info but cannot complete transactions.' },
  { range: '40-59 (Bronze-Silver)', compatibility: 'Partial', detail: 'REST API exists with some documentation. LangChain can parse endpoints. CrewAI can assign tools. AutoGen can call functions. But gaps in auth, error handling, or data quality cause failures.' },
  { range: '60-74 (Silver)', compatibility: 'Strong', detail: 'Well-documented API with proper auth, structured responses, and error handling. All three frameworks can reliably interact with your service.' },
  { range: '75-89 (Gold)', compatibility: 'Excellent', detail: 'OpenAPI spec, MCP server, agent-card.json. Frameworks auto-discover capabilities. No custom integration code needed.' },
  { range: '90-100 (Platinum)', compatibility: 'Native', detail: 'Full agent-native infrastructure. Multiple discovery protocols, webhook events, sandbox environment. Any framework works out of the box.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Which agent framework should I build for?',
    answer:
      'None of them specifically. Build for the standards that all frameworks use: OpenAPI spec, MCP server, structured JSON responses, and standard auth (OAuth or API keys). If your API follows these standards, every current and future framework can discover and use it automatically. Building for one specific framework locks you in. Building for standards makes you universally accessible.',
  },
  {
    question: 'Do I need an MCP server AND an OpenAPI spec?',
    answer:
      'Ideally, yes. OpenAPI specs describe your REST API endpoints — what exists, what parameters they take, what they return. MCP servers provide a higher-level interface with tools, resources, and prompts that agents can use directly. They complement each other: OpenAPI for programmatic API access, MCP for agent-native interaction. Many businesses start with one and add the other.',
  },
  {
    question: 'How does my agent readiness score relate to framework compatibility?',
    answer:
      'Your Agent Readiness Score is a direct predictor of how well any framework can interact with your business. The score measures the same things frameworks look for: API structure (D2), discovery signals (D1), data quality (D6), security (D7), and reliability (D8). A Silver score (60+) means strong compatibility across all major frameworks. Below 40, frameworks cannot reliably interact with you.',
  },
  {
    question: 'What about Claude and ChatGPT — are they agent frameworks too?',
    answer:
      'Claude and ChatGPT are AI assistants that increasingly act as agents. Claude supports MCP natively. ChatGPT supports function calling and plugins. Both benefit from the same infrastructure: OpenAPI specs, MCP servers, structured data. The line between "AI assistant" and "agent framework" is blurring. Building for standards means you work with all of them.',
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

export default function AiAgentFrameworksComparisonPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AI Agent Frameworks and Agent Readiness: How LangChain, CrewAI, and AutoGen Discover Businesses',
    description:
      'How the major AI agent frameworks find and interact with business APIs. Your agent readiness score predicts how easily any framework can use your API.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/ai-agent-frameworks-comparison',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Analysis',
    wordCount: 1900,
    keywords:
      'AI agent frameworks discover businesses, LangChain MCP, CrewAI tool discovery, AutoGen business API',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'AI Agent Frameworks Comparison',
          item: 'https://agenthermes.ai/blog/ai-agent-frameworks-comparison',
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
      title="AI Agent Frameworks and Agent Readiness: How LangChain, CrewAI, and AutoGen Discover Businesses"
      shareUrl="https://agenthermes.ai/blog/ai-agent-frameworks-comparison"
      currentHref="/blog/ai-agent-frameworks-comparison"
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
            <span className="text-zinc-400">AI Agent Frameworks Comparison</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Cpu className="h-3.5 w-3.5" />
              Technical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Framework Comparison
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            AI Agent Frameworks and Agent Readiness:{' '}
            <span className="text-emerald-400">How LangChain, CrewAI, and AutoGen Discover Businesses</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Developers building AI agents choose from dozens of frameworks. LangChain, CrewAI, AutoGen,
            Semantic Kernel, Haystack — the list grows monthly. But here is what matters for your business:{' '}
            <strong className="text-zinc-100">every framework looks for the same things</strong>. OpenAPI
            specs, MCP servers, structured JSON, agent-card.json. Your Agent Readiness Score predicts how
            easily <em>any</em> framework can use your API. The framework does not matter — the API
            structure does.
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
                  14 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE FRAMEWORK LANDSCAPE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-500" />
            The Three Frameworks That Matter Most
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The AI agent framework space has exploded. Dozens of frameworks compete to be the standard
              way developers build autonomous agents. But three dominate the ecosystem by usage, community
              size, and enterprise adoption. Understanding how each discovers and interacts with external
              APIs reveals what your business needs to be visible to all of them.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {frameworks.map((fw) => {
              const colors = getColorClasses(fw.color)
              return (
                <div
                  key={fw.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <fw.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{fw.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{fw.description}</p>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500">
                        <span className="text-zinc-400 font-medium">Discovery:</span>{' '}
                        <span className={colors.text}>{fw.discovery}</span>
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500">
                        <span className="text-zinc-400 font-medium">MCP Support:</span>{' '}
                        <span className={colors.text}>{fw.mcpSupport}</span>
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-xs text-zinc-500">
                        <span className="text-zinc-400 font-medium">Key Strength:</span>{' '}
                        <span className={colors.text}>{fw.strength}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT ALL FRAMEWORKS LOOK FOR ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-500" />
            The Universal Discovery Signals: What Every Framework Looks For
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Despite their different architectures, every agent framework looks for the same set of signals
              when discovering and evaluating a business API. These signals map directly to the dimensions
              measured by the{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                Agent Readiness Score
              </Link>.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Signal</div>
              <div>Weight</div>
              <div>Why It Matters</div>
              <div>Frameworks</div>
            </div>
            {discoverySignals.map((row, i) => (
              <div
                key={row.signal}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.signal}</div>
                <div className={row.weight === 'Critical' ? 'text-emerald-400' : row.weight === 'High' ? 'text-blue-400' : 'text-amber-400'}>{row.weight}</div>
                <div className="text-zinc-500">{row.description}</div>
                <div className="text-zinc-400">{row.frameworks}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The key insight:</strong> An OpenAPI spec and an MCP
              server make your business discoverable by every framework simultaneously. You do not need to
              build separate integrations for LangChain, CrewAI, and AutoGen. You build for the standards
              and every framework benefits. This is why{' '}
              <Link href="/blog/what-is-mcp-server" className="text-emerald-400 hover:text-emerald-300 underline">
                MCP servers
              </Link>{' '}
              are the single highest-impact investment for agent readiness.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORE TO FRAMEWORK COMPATIBILITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Agent Readiness Score to Framework Compatibility
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Your Agent Readiness Score directly predicts how well agent frameworks can interact with your
            business. Here is the mapping.
          </p>

          <div className="space-y-3 mb-8">
            {scoreMapping.map((tier) => (
              <div
                key={tier.range}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-zinc-100 text-sm">{tier.range}</h3>
                  <span className={`text-sm font-bold ${
                    tier.compatibility === 'None' ? 'text-red-400' :
                    tier.compatibility === 'Minimal' ? 'text-red-400' :
                    tier.compatibility === 'Partial' ? 'text-amber-400' :
                    tier.compatibility === 'Strong' ? 'text-blue-400' :
                    tier.compatibility === 'Excellent' ? 'text-emerald-400' :
                    'text-emerald-400'
                  }`}>
                    {tier.compatibility}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{tier.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE CONVERGENCE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            The Convergence: Why the Framework Does Not Matter
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Frameworks come and go. LangChain was not the first, and it will not be the last. New
              frameworks launch every month — Crew, Autogen, LlamaIndex, Haystack, DSPy, Semantic Kernel.
              The landscape will keep shifting. But the discovery standards are converging.
            </p>
            <p>
              Every framework is adopting MCP support. Every framework parses OpenAPI specs. Every framework
              reads agent-card.json when available. The interfaces are standardizing even as the
              implementations diverge. This convergence means one thing for your business:{' '}
              <strong className="text-zinc-100">
                invest in your API structure, not in framework-specific integrations
              </strong>.
            </p>
            <p>
              A business with a well-structured API, an MCP server, and an agent-card.json will work with
              any framework that exists today or launches tomorrow. A business that builds a custom LangChain
              integration is locked into one framework and invisible to all others.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Framework-Specific Integration',
                detail: 'Build a custom LangChain tool class. Works with LangChain only. Must rebuild for every new framework. Maintenance overhead grows linearly.',
                color: 'red',
              },
              {
                title: 'Standards-Based Infrastructure',
                detail: 'OpenAPI spec + MCP server + agent-card.json. Works with LangChain, CrewAI, AutoGen, Claude, ChatGPT, and every future framework. Build once, work everywhere.',
                color: 'emerald',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className={`p-5 rounded-xl bg-zinc-900/50 border ${colors.border}`}
                >
                  <h3 className={`font-bold ${colors.text} mb-2 text-sm`}>{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== PRACTICAL: WHAT TO BUILD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Three-Layer Stack: What to Build Today
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            A universally agent-ready API follows a three-layer stack. Each layer adds framework
            compatibility.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'REST API with OpenAPI Spec',
                detail: 'Your core API with typed endpoints, structured JSON responses, proper HTTP status codes, and a published OpenAPI/Swagger specification. This gives frameworks the raw capability to call your services.',
                icon: Code2,
              },
              {
                step: '2',
                title: 'MCP Server',
                detail: 'A Model Context Protocol server wrapping your API with tools, resources, and prompts. This gives frameworks a higher-level, agent-native interface. Build one with AgentHermes in minutes or from scratch with the MCP SDK.',
                icon: Server,
              },
              {
                step: '3',
                title: 'Discovery Files (agent-card.json, llms.txt)',
                detail: 'Machine-readable capability declarations at well-known URLs. These tell frameworks what you offer before they try calling anything. agent-card.json for structured discovery, llms.txt for natural language descriptions.',
                icon: FileJson,
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
              <strong className="text-blue-400">Related:</strong>{' '}
              <Link href="/blog/build-mcp-server-tutorial" className="text-emerald-400 hover:text-emerald-300 underline">
                Build an MCP Server Tutorial
              </Link>{' '}
              walks through creating an MCP server from scratch.{' '}
              <Link href="/blog/a2a-protocol-explained" className="text-emerald-400 hover:text-emerald-300 underline">
                A2A Protocol Explained
              </Link>{' '}
              covers the agent-to-agent discovery standard.
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
                title: 'What Is an MCP Server and Why Your Business Needs One',
                href: '/blog/what-is-mcp-server',
                tag: 'MCP Explained',
                tagColor: 'emerald',
              },
              {
                title: 'A2A Protocol Explained: Agent-to-Agent Communication',
                href: '/blog/a2a-protocol-explained',
                tag: 'Protocol Guide',
                tagColor: 'purple',
              },
              {
                title: 'Build an MCP Server: Step-by-Step Tutorial',
                href: '/blog/build-mcp-server-tutorial',
                tag: 'Tutorial',
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
            How framework-compatible is your API?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Your Agent Readiness Score predicts compatibility with LangChain, CrewAI, AutoGen,
            and every other framework. Free scan in 60 seconds.
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
              Get My MCP Server
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
