import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  FileJson,
  HelpCircle,
  Layers,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Wrench,
  Zap,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Build an MCP Server for Your Business: A 30-Minute Tutorial | AgentHermes',
  description:
    'A complete, copy-paste tutorial for building a Model Context Protocol (MCP) server. Define tools, resources, prompts, and deploy to Vercel or Cloudflare Workers. Of 500 businesses AgentHermes scanned, only 2 ship one.',
  keywords: [
    'how to build MCP server',
    'MCP server tutorial',
    'Model Context Protocol tutorial',
    'MCP SDK',
    'build MCP server',
    '@modelcontextprotocol/sdk',
    'MCP server Vercel',
    'MCP Cloudflare Workers',
    'MCP server example',
  ],
  openGraph: {
    title: 'How to Build an MCP Server for Your Business: A 30-Minute Tutorial',
    description:
      'Copy-paste tutorial for shipping a production MCP server in 30 minutes. 2 of 500 businesses have one. Be the next.',
    url: 'https://agenthermes.ai/blog/build-mcp-server-tutorial',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How to Build an MCP Server for Your Business: A 30-Minute Tutorial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build an MCP Server: A 30-Minute Tutorial',
    description:
      'Tools, resources, prompts, deploy. Copy-paste ready. Of 500 businesses, only 2 ship one.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/build-mcp-server-tutorial',
  },
}

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Do I need Node.js to build an MCP server?',
    answer:
      'The fastest path is Node.js using the official @modelcontextprotocol/sdk package. There are also Python and Go SDKs. This tutorial uses TypeScript on Node 20+. If you deploy to Cloudflare Workers you stay on the JavaScript runtime, just without raw Node APIs.',
  },
  {
    question: 'Which transport should I use — stdio or HTTP/SSE?',
    answer:
      'For a remote MCP server that hosted agents like Claude, ChatGPT, and AgentHermes connect to over the internet, use HTTP with SSE transport. Stdio transport is only for local desktop agents that spawn your server as a child process. Every example in this tutorial uses SSE so agents can reach you over the public internet.',
  },
  {
    question: 'Does my MCP server need authentication?',
    answer:
      'Yes, if your tools mutate state (create_order, book_appointment, cancel_subscription). Read-only tools (list_products, get_business_hours) can be public. Use Bearer tokens via OAuth 2.0 with PKCE, the same pattern as the Stripe and GitHub REST APIs. Scanning 500 businesses shows 401 with a structured JSON envelope scores 87% of a 200 response on D7 Security.',
  },
  {
    question: 'How do agents discover my MCP server once it is live?',
    answer:
      'Publish the URL in three places. First, your agent-card.json at /.well-known/agent-card.json. Second, your agent-hermes.json if you follow the AgentHermes standard. Third, an MCP registry like the AgentHermes registry at /registry. Agents fetch these files, parse the mcp_server entry, and connect.',
  },
  {
    question: 'How much does it cost to host an MCP server?',
    answer:
      'On Vercel, a simple MCP server fits inside the free tier. On Cloudflare Workers, the first 100K requests per day are free. Egress is the only real variable. If you are a local business without engineering time, AgentHermes /connect auto-generates and hosts the server for you at agenthermes.ai/api/mcp/hosted/your-slug.',
  },
]

const tools = [
  {
    name: 'list_products',
    description: 'Agent can enumerate what you sell with filters and pagination.',
    signature: 'list_products({ category?: string, limit?: number }) → Product[]',
  },
  {
    name: 'get_pricing',
    description: 'Structured pricing for a specific product or service. Replaces "contact for quote".',
    signature: 'get_pricing({ product_id: string, quantity?: number }) → Price',
  },
  {
    name: 'create_order',
    description: 'Mutating tool that places an order. Requires auth, returns idempotent result.',
    signature: 'create_order({ items: Item[], customer: Customer, idempotency_key: string }) → Order',
  },
]

const deploySteps = [
  {
    name: 'Vercel',
    detail: 'Push to GitHub → Vercel auto-deploys. Runtime: Node 20. Add route /api/mcp with SSE headers. Set VERCEL_URL env var so agent-card.json reports the right endpoint.',
    icon: Rocket,
    color: 'emerald',
  },
  {
    name: 'Cloudflare Workers',
    detail: 'Use the @modelcontextprotocol/sdk/server/sse export. wrangler.toml with [vars] for env. 100K requests/day free. Lowest p50 latency for global agents.',
    icon: Zap,
    color: 'amber',
  },
  {
    name: 'AgentHermes Hosted',
    detail: 'Skip the whole build. Visit /connect, pick your vertical, AgentHermes provisions a hosted MCP server at agenthermes.ai/api/mcp/hosted/{slug} with dynamic tools wired to your business data.',
    icon: Sparkles,
    color: 'blue',
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

export default function BuildMcpServerTutorialPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'How to Build an MCP Server for Your Business: A 30-Minute Tutorial',
    description:
      'Complete tutorial for building and deploying a Model Context Protocol server. Install the SDK, define tools, resources, prompts, deploy to Vercel or Cloudflare Workers, and register with agent cards.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/build-mcp-server-tutorial',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Tutorial',
    wordCount: 1850,
    proficiencyLevel: 'Intermediate',
    keywords:
      'how to build MCP server, MCP tutorial, Model Context Protocol, MCP SDK, build MCP server Vercel',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'How to Build an MCP Server',
          item: 'https://agenthermes.ai/blog/build-mcp-server-tutorial',
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
      title="How to Build an MCP Server for Your Business: A 30-Minute Tutorial"
      shareUrl="https://agenthermes.ai/blog/build-mcp-server-tutorial"
      currentHref="/blog/build-mcp-server-tutorial"
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
              <span className="text-zinc-400">Build an MCP Server</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <Cpu className="h-3.5 w-3.5" />
                Tutorial
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                Copy-Paste Ready
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              How to Build an MCP Server for Your Business:{' '}
              <span className="text-emerald-400">A 30-Minute Tutorial</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Of the 500 businesses AgentHermes has scanned, only 2 ship a working{' '}
              <Link href="/blog/what-is-mcp-server" className="text-emerald-400 hover:text-emerald-300 underline">
                MCP server
              </Link>
              . That is the gap. This tutorial closes it. Install the SDK, define your tools, deploy to Vercel or Cloudflare, register with an agent card — thirty minutes, zero guesswork.
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
                    11 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '2 / 500', label: 'businesses with an MCP server', icon: Server },
                { value: '30 min', label: 'from zero to live endpoint', icon: Clock },
                { value: '3', label: 'primitives: tools, resources, prompts', icon: Layers },
                { value: '$0', label: 'hosting on Vercel/Cloudflare free tier', icon: Rocket },
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

        {/* ===== STEP 1 INSTALL ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Terminal className="h-5 w-5 text-emerald-500" />
              Step 1: Install the MCP SDK
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              The official SDK from Anthropic handles the protocol, schema validation, and SSE transport. Spin up a Node 20 project and pull in two packages.
            </p>
            <pre className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 overflow-x-auto text-sm text-zinc-300 mb-4"><code>{`mkdir my-business-mcp && cd my-business-mcp
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node tsx
npx tsc --init --target es2022 --module esnext --moduleResolution bundler`}</code></pre>
            <p className="text-sm text-zinc-500">
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded">zod</code>{' '}
              is used to describe input schemas in a way both humans and agents can reason about. The SDK turns the zod schema into a JSON Schema that agents fetch during discovery.
            </p>
          </div>
        </section>

        {/* ===== STEP 2 TOOLS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-emerald-500" />
              Step 2: Define Three Tools
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Tools are the verbs of your business. Start with three that every business has: list what you sell, quote a price, and place an order. Each tool gets a name, a zod schema, and a handler.
            </p>

            <div className="space-y-3 mb-6">
              {tools.map((tool) => (
                <div key={tool.name} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <code className="text-sm text-emerald-400 font-semibold">{tool.name}</code>
                  <p className="text-sm text-zinc-400 mt-1 mb-2">{tool.description}</p>
                  <code className="text-xs text-zinc-500 block">{tool.signature}</code>
                </div>
              ))}
            </div>

            <pre className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 overflow-x-auto text-sm text-zinc-300"><code>{`import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

const server = new McpServer({ name: 'acme-biz', version: '1.0.0' })

server.tool(
  'list_products',
  { category: z.string().optional(), limit: z.number().int().max(100).default(20) },
  async ({ category, limit }) => {
    const rows = await db.products.list({ category, limit })
    return { content: [{ type: 'text', text: JSON.stringify(rows) }] }
  }
)

server.tool(
  'get_pricing',
  { product_id: z.string(), quantity: z.number().int().positive().default(1) },
  async ({ product_id, quantity }) => {
    const price = await db.pricing.compute(product_id, quantity)
    return { content: [{ type: 'text', text: JSON.stringify(price) }] }
  }
)

server.tool(
  'create_order',
  {
    items: z.array(z.object({ product_id: z.string(), qty: z.number().int().positive() })),
    customer_email: z.string().email(),
    idempotency_key: z.string().uuid(),
  },
  async ({ items, customer_email, idempotency_key }) => {
    const order = await db.orders.createIdempotent({ items, customer_email, idempotency_key })
    return { content: [{ type: 'text', text: JSON.stringify(order) }] }
  }
)`}</code></pre>
          </div>
        </section>

        {/* ===== STEP 3 RESOURCES ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-500" />
              Step 3: Add Resources (Static Docs the Agent Can Read)
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Resources are read-only documents agents load once and reason over. Business hours, refund policy, terms of service. Expose them as MCP resources instead of making the agent scrape HTML.
            </p>
            <pre className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 overflow-x-auto text-sm text-zinc-300"><code>{`server.resource(
  'business-info',
  'resource://acme/business-info',
  async () => ({
    contents: [{
      uri: 'resource://acme/business-info',
      mimeType: 'application/json',
      text: JSON.stringify({
        legal_name: 'Acme Inc.',
        hours: { mon_fri: '9:00-18:00', sat: '10:00-14:00', sun: 'closed' },
        phone: '+1-555-0100',
        address: '100 Market St, San Francisco, CA',
        refund_policy_url: 'https://acme.com/refunds',
      }),
    }],
  })
)`}</code></pre>
          </div>
        </section>

        {/* ===== STEP 4 PROMPTS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Step 4: Define a Prompt Workflow
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Prompts are pre-built interaction templates. They guide an agent through multi-step flows — onboarding, quote-to-order, return-a-product. One prompt can orchestrate three tools in the right sequence.
            </p>
            <pre className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 overflow-x-auto text-sm text-zinc-300"><code>{`server.prompt(
  'place_order_flow',
  'Guide a customer from product search through checkout',
  { customer_intent: z.string() },
  async ({ customer_intent }) => ({
    messages: [
      { role: 'user', content: { type: 'text', text:
        'Customer said: ' + customer_intent + '\\n\\n' +
        '1. Call list_products to find matches.\\n' +
        '2. Call get_pricing on top 3 candidates.\\n' +
        '3. Confirm with customer, then call create_order with a fresh UUID idempotency_key.'
      }}
    ]
  })
)`}</code></pre>
          </div>
        </section>

        {/* ===== STEP 5 DEPLOY ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Rocket className="h-5 w-5 text-emerald-500" />
              Step 5: Deploy
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Wire your <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded">McpServer</code> to an SSE transport and expose it at <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded">/api/mcp</code>. Three hosting paths, ranked by effort.
            </p>

            <div className="space-y-3 mb-6">
              {deploySteps.map((step) => {
                const colors = getColorClasses(step.color)
                return (
                  <div
                    key={step.name}
                    className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <step.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-100 text-sm mb-1">{step.name}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="text-sm text-zinc-500">
              For the Vercel path, add a single route file at{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded">app/api/mcp/route.ts</code>{' '}
              that imports your server and pipes it through{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded">SSEServerTransport</code>. Enable{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded">runtime = &apos;nodejs&apos;</code>{' '}
              and set a generous{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded">maxDuration</code>{' '}
              for long-lived streams.
            </p>
          </div>
        </section>

        {/* ===== STEP 6 AGENT CARD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <FileJson className="h-5 w-5 text-amber-500" />
              Step 6: Register in agent-card.json
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              A deployed MCP endpoint is useless if no agent can find it. The{' '}
              <Link href="/blog/agent-card-json-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                agent-card.json
              </Link>{' '}
              file at{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded">/.well-known/agent-card.json</code>{' '}
              is the discovery hook agents like Claude, ChatGPT, and AgentHermes use to enumerate your capabilities.
            </p>
            <pre className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 overflow-x-auto text-sm text-zinc-300"><code>{`{
  "protocolVersion": "0.3",
  "name": "Acme Inc.",
  "description": "Online retailer of industrial supplies",
  "url": "https://acme.com",
  "mcp_server": {
    "transport": "sse",
    "endpoint": "https://acme.com/api/mcp",
    "auth": { "type": "oauth2", "authorization_url": "https://acme.com/oauth/authorize" }
  },
  "skills": [
    { "id": "browse",  "tool": "list_products" },
    { "id": "quote",   "tool": "get_pricing" },
    { "id": "checkout","tool": "create_order" }
  ]
}`}</code></pre>
          </div>
        </section>

        {/* ===== TESTING ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Test It Before You Ship
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Run the MCP Inspector — the official debugging UI — against your deployed URL. It enumerates every tool, validates schemas, and lets you fire test calls. If the Inspector shows your three tools with green checkmarks, Claude and ChatGPT will see the same.
            </p>
            <pre className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 overflow-x-auto text-sm text-zinc-300"><code>{`npx @modelcontextprotocol/inspector https://acme.com/api/mcp`}</code></pre>
            <p className="text-sm text-zinc-500 mt-4">
              Then run an AgentHermes scan at <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">/audit</Link> against your domain. A working MCP endpoint plus a linked agent card lifts D2 API Quality and D9 Agent Experience — up to 12 points combined. That is enough to move most businesses from Bronze to Silver in a single deploy.
            </p>
          </div>
        </section>

        {/* ===== SKIP THE BUILD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              Not a Developer? Skip to AgentHermes /connect
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              This tutorial is aimed at engineers. If you run a business and do not write code, AgentHermes{' '}
              <Link href="/connect" className="text-emerald-400 hover:text-emerald-300 underline">/connect</Link>{' '}
              auto-generates everything described above — tools tuned to your vertical, resources populated from your business profile, a hosted MCP endpoint, and a linked agent card. The output is the same MCP server this tutorial builds. You just skip the 30 minutes.
            </p>
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">Why so few businesses have one:</strong> The{' '}
                <Link href="/blog/mcp-gap" className="text-emerald-300 hover:text-emerald-200 underline">
                  33-million-business MCP gap
                </Link>{' '}
                is not a technology problem. The SDK is stable, hosting is free, the protocol works. The gap is that most businesses have never heard the acronym. Every tutorial like this one closes the gap by a few percent.
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
                <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <h3 className="text-base font-bold text-zinc-100 mb-3">{faq.question}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== RELATED ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Continue Reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'What Is an MCP Server and Why Your Business Needs One', href: '/blog/what-is-mcp-server', tag: 'MCP Explained', tagColor: 'emerald' },
                { title: 'Zero MCP Servers for Local Businesses — The $6.2B Gap', href: '/blog/mcp-gap', tag: 'Market Analysis', tagColor: 'amber' },
                { title: 'What Is agent-card.json? The Missing File on 500 Business Websites', href: '/blog/agent-card-json-guide', tag: 'Standards Deep Dive', tagColor: 'emerald' },
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
              Ship an MCP server in 30 minutes — or 30 seconds
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run the scanner to baseline your score, then pick the path: build it yourself with this tutorial, or let AgentHermes /connect generate it for you.
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
                Auto-Generate My MCP Server
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </BlogArticleWrapper>
  )
}
