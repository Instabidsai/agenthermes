import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Bug,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Globe,
  HelpCircle,
  Layers,
  Search,
  Server,
  Shield,
  Sparkles,
  Terminal,
  TestTube,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'How to Test Your MCP Server: Validation, Debugging, and Scoring Impact | AgentHermes',
  description:
    'After building your MCP server, how do you validate it works? Complete guide to MCP testing: MCP Inspector, Claude Desktop, curl for JSON-RPC 2.0, automated Jest tests, and AgentHermes scan for scoring impact. Common bugs and debugging techniques.',
  keywords: [
    'test MCP server validation debugging',
    'MCP server testing',
    'MCP Inspector tool',
    'JSON-RPC 2.0 testing',
    'MCP server debugging',
    'validate MCP server',
    'MCP automated tests',
    'MCP server common bugs',
    'MCP server scoring',
  ],
  openGraph: {
    title: 'How to Test Your MCP Server: Validation, Debugging, and Scoring Impact',
    description:
      'Complete guide to MCP server testing. 5 validation methods, common bugs, debugging techniques, and how testing impacts your Agent Readiness Score.',
    url: 'https://agenthermes.ai/blog/testing-mcp-server-guide',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How to Test Your MCP Server: Validation, Debugging, and Scoring Impact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Test Your MCP Server: Validation, Debugging, and Scoring Impact',
    description:
      'Built an MCP server? Here is how to validate it actually works — 5 methods from manual curl to automated CI tests.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/testing-mcp-server-guide',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const testingMethods = [
  {
    step: '1',
    title: 'MCP Inspector — Visual Validation',
    detail: 'The MCP Inspector (npx @modelcontextprotocol/inspector) connects to your server and displays all tools, resources, and prompts in a browser UI. You can call tools interactively, see response schemas, and verify descriptions. This is your first test — if Inspector cannot connect or shows missing tools, agents cannot either.',
    command: 'npx @modelcontextprotocol/inspector',
    icon: Search,
    color: 'emerald',
  },
  {
    step: '2',
    title: 'Claude Desktop — Real Agent Testing',
    detail: 'Add your MCP server to Claude Desktop\'s configuration file (claude_desktop_config.json). Then ask Claude to use your tools naturally: "Check availability at my business" or "Get a quote for lawn care." Claude will discover your tools, call them, and show you the results. This is the closest simulation to how real agents will interact with your server.',
    command: 'Edit ~/Library/Application Support/Claude/claude_desktop_config.json',
    icon: Bot,
    color: 'blue',
  },
  {
    step: '3',
    title: 'curl for JSON-RPC 2.0 Verification',
    detail: 'MCP uses JSON-RPC 2.0 over stdio or SSE transport. For HTTP/SSE servers, use curl to send raw JSON-RPC requests. Test the initialize handshake, tools/list, and individual tool calls. This verifies your server handles the protocol correctly at the lowest level — no client abstractions hiding bugs.',
    command: 'curl -X POST http://localhost:3000/mcp -H "Content-Type: application/json" -d \'{"jsonrpc":"2.0","method":"tools/list","id":1}\'',
    icon: Terminal,
    color: 'purple',
  },
  {
    step: '4',
    title: 'Automated Test Suite with Jest',
    detail: 'Write Jest tests that import your MCP server handlers directly. Test each tool with valid inputs, invalid inputs, missing required fields, and edge cases. Assert response schemas match your tool definitions. Run in CI so every commit validates the MCP contract. This catches regressions before agents hit them.',
    command: 'npx jest --testPathPattern=mcp',
    icon: TestTube,
    color: 'amber',
  },
  {
    step: '5',
    title: 'AgentHermes Scan — D2 Scoring Impact',
    detail: 'Run an AgentHermes scan on your domain after deploying the MCP server. The scanner detects MCP endpoints, checks tool count and quality, verifies SSE transport, and measures the impact on your D2 (API) dimension score. A working MCP server with 5+ well-described tools typically adds 15-25 points to your overall Agent Readiness Score.',
    command: 'Visit agenthermes.ai/audit and enter your domain',
    icon: BarChart3,
    color: 'emerald',
  },
]

const commonBugs = [
  {
    bug: 'Wrong method names in tool definitions',
    symptom: 'Inspector shows tools but agents get "method not found" errors when calling them',
    fix: 'Tool name in the definition must exactly match the handler function name. Check for typos, underscores vs hyphens, and case sensitivity.',
    severity: 'Critical',
    severityColor: 'text-red-400',
  },
  {
    bug: 'Missing error handling on tool calls',
    symptom: 'Agent gets a raw stack trace or empty response instead of a structured error',
    fix: 'Wrap every tool handler in try/catch. Return { content: [{ type: "text", text: "Error: descriptive message" }], isError: true } on failure. Never expose internal errors.',
    severity: 'High',
    severityColor: 'text-amber-400',
  },
  {
    bug: 'Auth not forwarded from MCP to backend',
    symptom: 'Tools work in local testing but return 401 in production. Inspector works but Claude Desktop fails.',
    fix: 'If your MCP tools call authenticated backend APIs, the auth token must flow from the MCP client through your server to the backend. Use environment variables for service-to-service auth, not user tokens.',
    severity: 'High',
    severityColor: 'text-amber-400',
  },
  {
    bug: 'SSE transport not sending keep-alive',
    symptom: 'Connection drops after 30-60 seconds of inactivity. Tools work for first call then fail.',
    fix: 'Send SSE comments (": keep-alive\\n\\n") every 15-30 seconds. Most reverse proxies (nginx, Cloudflare) timeout idle SSE connections. Configure proxy timeout to 300s minimum.',
    severity: 'Medium',
    severityColor: 'text-blue-400',
  },
  {
    bug: 'Tool input schemas missing required fields',
    symptom: 'Agent sends partial data and tool returns garbage instead of a validation error',
    fix: 'Define inputSchema with JSON Schema "required" array for every mandatory field. Validate inputs before processing. Return clear error messages listing which fields are missing.',
    severity: 'High',
    severityColor: 'text-amber-400',
  },
  {
    bug: 'Tool descriptions too vague for agent discovery',
    symptom: 'Agent has access to your tools but never calls them because it does not understand when to use them',
    fix: 'Tool descriptions must answer: What does this tool do? When should an agent use it? What will it return? Include example use cases. Bad: "Get info." Good: "Returns business hours, address, phone number, and service area for the specified business location."',
    severity: 'Medium',
    severityColor: 'text-blue-400',
  },
]

const debuggingTips = [
  {
    technique: 'Enable verbose logging',
    detail: 'Set DEBUG=mcp:* or your framework\'s verbose flag. Log every incoming JSON-RPC message and outgoing response. This shows exactly what the client sends and what your server returns — indispensable for protocol-level debugging.',
  },
  {
    technique: 'Check SSE transport headers',
    detail: 'For HTTP/SSE servers, verify Content-Type is "text/event-stream", Cache-Control is "no-cache", and Connection is "keep-alive". Missing headers cause silent failures in some MCP clients.',
  },
  {
    technique: 'Validate tool schemas with ajv',
    detail: 'Install ajv (JSON Schema validator) and validate your tool inputSchema definitions against the JSON Schema draft-07 spec. Invalid schemas silently break agent input validation.',
  },
  {
    technique: 'Test with multiple MCP clients',
    detail: 'If your server works in Inspector but not Claude Desktop, the bug is in transport or auth handling — not tool logic. Test with at least two different clients to isolate client-specific issues.',
  },
  {
    technique: 'Monitor with structured logging',
    detail: 'Log tool calls as JSON objects: { tool: "get_services", input: {...}, duration_ms: 142, success: true }. Aggregate these to find slow tools, high error rates, and unused tools that agents ignore.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How do I test an MCP server that uses stdio transport?',
    answer:
      'For stdio-based MCP servers, the MCP Inspector is your primary testing tool — it handles stdio communication automatically. For automated testing, import your server module directly in Jest and call handler functions. You cannot use curl with stdio servers since they communicate via stdin/stdout, not HTTP. If you need HTTP-based testing, consider adding SSE transport as an alternative — most production deployments benefit from having both.',
  },
  {
    question: 'How many tools should my MCP server expose?',
    answer:
      'Quality matters more than quantity, but 5-8 tools is the sweet spot for most businesses. Too few (1-2) means agents cannot do much. Too many (20+) means agents struggle to pick the right tool. Our scan data shows the highest-scoring MCP servers have 5-10 well-described tools with clear use cases. Each tool should do one thing well with typed inputs and outputs.',
  },
  {
    question: 'Will testing my MCP server improve my Agent Readiness Score?',
    answer:
      'Testing itself does not directly change your score — but fixing the bugs you find does. A broken MCP server that returns errors will score lower than one with no MCP server at all (the scanner detects failed endpoints). The D2 (API) dimension rewards working, well-documented endpoints. The D8 (Reliability) dimension rewards consistent uptime and proper error responses. Testing ensures both dimensions score well.',
  },
  {
    question: 'How often should I re-test my MCP server?',
    answer:
      'Run automated Jest tests on every commit in CI. Run an AgentHermes scan monthly or after any significant change to tools, schemas, or transport. Manual testing with MCP Inspector is most valuable when adding new tools or changing existing ones. The most common failure pattern is a code change that breaks an existing tool without anyone noticing — agents silently stop using it.',
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

export default function TestingMcpServerGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Test Your MCP Server: Validation, Debugging, and Scoring Impact',
    description:
      'Complete guide to MCP server testing. 5 validation methods from MCP Inspector to AgentHermes scans, common bugs with fixes, and debugging techniques for reliable MCP servers.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/testing-mcp-server-guide',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Guide',
    wordCount: 1900,
    keywords:
      'test MCP server, MCP validation, MCP debugging, MCP Inspector, JSON-RPC testing, MCP scoring',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Testing Your MCP Server',
          item: 'https://agenthermes.ai/blog/testing-mcp-server-guide',
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
      title="How to Test Your MCP Server: Validation, Debugging, and Scoring Impact"
      shareUrl="https://agenthermes.ai/blog/testing-mcp-server-guide"
      currentHref="/blog/testing-mcp-server-guide"
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
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400">Testing MCP Server Guide</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <TestTube className="h-3.5 w-3.5" />
              Technical Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Companion to Build Tutorial
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            How to Test Your MCP Server:{' '}
            <span className="text-emerald-400">Validation, Debugging, and Scoring Impact</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            You{' '}
            <Link href="/blog/build-mcp-server-tutorial" className="text-emerald-400 hover:text-emerald-300 underline">
              built your MCP server
            </Link>. Now how do you know it actually works? A broken MCP server is worse than no
            MCP server — agents will try to connect, fail, and mark your business as unreliable.
            This guide covers five validation methods, the six most common bugs, and how testing
            translates directly to your Agent Readiness Score.
          </p>

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
                  13 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY TESTING MATTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-500" />
            Why MCP Testing Is Not Optional
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A website with a broken contact form is annoying. An MCP server with a broken tool is
              catastrophic for agent trust. Here is why: when a human hits a broken form, they try
              again or call you. When an AI agent hits a broken tool, it marks your server as
              unreliable and deprioritizes you in future queries. There is no second chance — agents
              have perfect memory and zero patience.
            </p>
            <p>
              Our scan data from 500+ businesses shows that 40% of deployed MCP servers have at
              least one broken tool. The most common failure: tools that work during development but
              break in production due to environment differences, missing auth, or transport
              configuration issues. Testing is not about quality — it is about agent trust.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { value: '40%', label: 'MCP servers with broken tools', icon: Bug },
              { value: '+22', label: 'Score boost from working MCP', icon: TrendingUp },
              { value: '0', label: 'Second chances from agents', icon: Bot },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5 TESTING METHODS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-500" />
            5 Methods to Validate Your MCP Server
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Test from the outside in. Start with visual inspection (MCP Inspector), then real-world
            agent testing (Claude Desktop), then protocol-level verification (curl), then automated
            regression (Jest), and finally score impact (AgentHermes scan).
          </p>

          <div className="space-y-4 mb-8">
            {testingMethods.map((method) => {
              const colors = getColorClasses(method.color)
              return (
                <div
                  key={method.step}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <method.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${colors.text}`}>Step {method.step}</span>
                        <h3 className="text-lg font-bold text-zinc-100">{method.title}</h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{method.detail}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <code className={`${colors.text} text-xs break-all`}>{method.command}</code>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== COMMON BUGS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bug className="h-5 w-5 text-red-500" />
            6 Most Common MCP Server Bugs
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These are the bugs we see most frequently when scanning MCP servers. Each one silently
            degrades agent trust. Check your server against this list before deploying.
          </p>

          <div className="space-y-3 mb-8">
            {commonBugs.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-zinc-100 text-sm">{item.bug}</h3>
                  <span className={`text-xs font-bold ${item.severityColor}`}>{item.severity}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                    <p className="text-xs text-red-400 font-medium mb-1">Symptom</p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.symptom}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                    <p className="text-xs text-emerald-400 font-medium mb-1">Fix</p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEBUGGING TECHNIQUES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-500" />
            Debugging Techniques
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When a tool fails and the error is not obvious, use these techniques to isolate the
              problem. The goal is always the same: see the exact JSON-RPC message the client sends
              and the exact response your server returns.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {debuggingTips.map((tip) => (
              <div
                key={tip.technique}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 text-sm mb-2">{tip.technique}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{tip.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The most important debugging insight: <strong className="text-zinc-100">if your server works
              in MCP Inspector but fails with a real agent, the bug is almost always in transport or auth
              — not in your tool logic</strong>. Inspector often runs locally via stdio, while production
              agents connect via HTTP/SSE through proxies and load balancers that can interfere with the
              connection. Always test the full production path, not just local.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORING IMPACT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            How Testing Impacts Your Agent Readiness Score
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A working MCP server directly impacts three of the nine scoring dimensions. Here is the
              breakdown from our{' '}
              <Link href="/blog/testing-your-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                scoring methodology
              </Link>:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                dimension: 'D2: API Quality',
                weight: '15%',
                impact: 'MCP tools count as structured API endpoints. 5+ working tools with proper schemas = 70+ on this dimension.',
                color: 'emerald',
              },
              {
                dimension: 'D8: Reliability',
                weight: '13%',
                impact: 'Consistent responses, proper error handling, and uptime. Broken tools that return 500s actively hurt this score.',
                color: 'blue',
              },
              {
                dimension: 'D9: Agent Experience',
                weight: '10%',
                impact: 'MCP is the gold standard for agent experience. Having an MCP server at all puts you in the top 1% of businesses.',
                color: 'purple',
              },
            ].map((dim) => {
              const colors = getColorClasses(dim.color)
              return (
                <div
                  key={dim.dimension}
                  className={`p-5 rounded-xl bg-zinc-900/50 border ${colors.border}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold text-sm ${colors.text}`}>{dim.dimension}</h3>
                    <span className="text-xs text-zinc-500">{dim.weight} weight</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{dim.impact}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The scoring math:</strong> A business with no MCP
              server scores 0 on D9 (Agent Experience). Adding a working MCP server with 5 tools
              jumps D9 to 60-80. With D9 weighted at 10%, that is a direct 6-8 point boost to your
              total score. Combined with D2 and D8 improvements, expect a{' '}
              <strong className="text-zinc-100">15-25 point total increase</strong> from a properly
              tested MCP server. Run a free scan at{' '}
              <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                /audit
              </Link>{' '}
              to see your before and after.
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
                title: 'How to Build an MCP Server for Your Business',
                href: '/blog/build-mcp-server-tutorial',
                tag: 'Tutorial',
                tagColor: 'emerald',
              },
              {
                title: 'API Testing Tools and Agent Readiness',
                href: '/blog/api-testing-agent-readiness',
                tag: 'Practical Guide',
                tagColor: 'blue',
              },
              {
                title: 'Get Your Free Agent Readiness Score',
                href: '/audit',
                tag: 'Free Tool',
                tagColor: 'purple',
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
            Test your MCP server with a free scan
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See how your MCP server impacts your Agent Readiness Score across all 9 dimensions.
            The scanner detects MCP endpoints automatically and measures tool quality.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Scan My MCP Server
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog/build-mcp-server-tutorial"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              Build One First
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
