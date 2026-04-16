import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileJson,
  Globe,
  HelpCircle,
  Info,
  Key,
  Layers,
  Link2,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  Wrench,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'What Is agent-card.json? The Missing File on 500 Business Websites | AgentHermes',
  description:
    'agent-card.json is the A2A protocol discovery file that lets AI agents find your capabilities. We scanned 500 businesses. Zero have one. Here is what it is, what goes in it, and how to generate one in 60 seconds.',
  keywords: [
    'agent card json',
    'agent-card.json',
    'A2A protocol',
    'agent card file',
    'well-known agent card',
    'AI agent discovery',
    'agent card schema',
    'A2A v0.3',
    'agent card example',
  ],
  openGraph: {
    title: 'What Is agent-card.json? The Missing File on 500 Business Websites',
    description:
      'agent-card.json is how AI agents discover your capabilities. 0 of 500 businesses have one. Here is what it is and how to get one.',
    url: 'https://agenthermes.ai/blog/agent-card-json-guide',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'What Is agent-card.json? The Missing File on 500 Business Websites',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is agent-card.json? The Missing File on 500 Business Websites',
    description:
      'Zero of 500 businesses we scanned have an agent-card.json. It is the single most missed file on the modern web.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/agent-card-json-guide',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const cardFields = [
  {
    name: 'name & description',
    description:
      'Human- and agent-readable identifiers. The name is short, the description tells an agent what the business does and who it serves — in 1 to 3 sentences that can be reasoned over.',
    example: '"name": "Joes Pizza", "description": "NYC pizza shop offering delivery, pickup, and catering"',
    icon: Info,
    color: 'emerald',
  },
  {
    name: 'capabilities',
    description:
      'The top-level feature flags: streaming, push notifications, state history, tool use, structured output. Agents read this before a single method call so they know how to handshake.',
    example: '"capabilities": { "streaming": true, "pushNotifications": false, "stateTransitionHistory": true }',
    icon: Layers,
    color: 'blue',
  },
  {
    name: 'skills',
    description:
      'Named capabilities the agent can invoke — each skill has an id, name, description, tags, examples, input modes, and output modes. This is how an agent discovers what your business can actually do.',
    example: '"skills": [{ "id": "check_availability", "name": "Check Availability", "tags": ["reservations"] }]',
    icon: Wrench,
    color: 'purple',
  },
  {
    name: 'url & endpoints',
    description:
      'Where the agent connects. Includes the base URL, transport (JSON-RPC, SSE, HTTP), and any sub-endpoints for specific skills. Without this, discovery leads nowhere.',
    example: '"url": "https://api.example.com/a2a", "defaultInputModes": ["text"], "defaultOutputModes": ["text","json"]',
    icon: Network,
    color: 'cyan',
  },
  {
    name: 'authentication',
    description:
      'Supported auth schemes — none, bearer, oauth2, apiKey. The agent uses this to figure out how to obtain credentials before attempting a privileged call.',
    example: '"authentication": { "schemes": ["bearer"], "credentials": { "type": "oauth2" } }',
    icon: Key,
    color: 'amber',
  },
  {
    name: 'version & protocol',
    description:
      'The A2A protocol version and your service version. Agents will increasingly branch logic on protocol version — v0.3 is the current stable spec as of early 2026.',
    example: '"version": "1.0.0", "protocolVersion": "0.3.0"',
    icon: Code2,
    color: 'red',
  },
]

const checkList = [
  { pass: true, label: 'File is served at /.well-known/agent-card.json' },
  { pass: true, label: 'Returns Content-Type: application/json' },
  { pass: true, label: 'Returns 200 OK to unauthenticated GET' },
  { pass: true, label: 'Valid JSON that parses without errors' },
  { pass: true, label: 'Includes name, description, url, version' },
  { pass: true, label: 'Declares capabilities and at least one skill' },
  { pass: true, label: 'Specifies authentication schemes (even if "none")' },
  { pass: true, label: 'Referenced from llms.txt or robots.txt' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is agent-card.json?',
    answer:
      'agent-card.json is the discovery file defined by the A2A (Agent-to-Agent) protocol. It is a JSON document served at /.well-known/agent-card.json that describes what an AI agent or agent-accessible service can do — its name, description, capabilities, skills, endpoints, and authentication requirements. Think of it as the "robots.txt for AI agents," but with far more structure. It is the A2A equivalent of a website homepage for an autonomous agent.',
  },
  {
    question: 'How is agent-card.json different from an MCP server?',
    answer:
      'agent-card.json is a static discovery file that lives on your domain. An MCP server is a live protocol endpoint that agents connect to. The card tells agents you exist and where to go; the MCP server is where the actual tool calls happen. You should have both — agent-card.json for discovery, MCP server for execution. AgentHermes generates both when you connect your business.',
  },
  {
    question: 'Where should I host my agent-card.json file?',
    answer:
      'The canonical location is https://yourdomain.com/.well-known/agent-card.json — agents look here first. If your main site runs on a CMS that blocks /.well-known, host it on a subdomain or at /agent-card.json and reference that URL from your llms.txt and agent-hermes.json. AgentHermes auto-hosts a spec-compliant card for every connected business at the /.well-known path.',
  },
  {
    question: 'Do I need a developer to create agent-card.json?',
    answer:
      'No. While the spec is technical, AgentHermes generates a valid, agent-card.json v0.3-compliant file for any business based on your industry and a short form. You pick your vertical, enter your details, and the card is deployed automatically with your skills, endpoints, and authentication declared. No JSON editing required.',
  },
  {
    question: 'Is AgentHermes the same as the "Agent Hermes" project from NousResearch?',
    answer:
      'No — this is an important brand distinction. AgentHermes (one word) is the Agent Readiness Platform that scans businesses, generates agent-card.json, hosts MCP servers, and routes agent traffic. The Hermes family of open-weight language models from NousResearch is a completely separate project — models for reasoning and agentic workflows, not a business-readiness platform. If you landed here looking for Nous Hermes LLMs, you want huggingface.co/NousResearch. If you landed here looking for agent-card.json generation and readiness scoring, you are in the right place.',
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

export default function AgentCardJsonGuidePage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Is agent-card.json? The Missing File on 500 Business Websites',
    description:
      'agent-card.json is the A2A protocol discovery file that lets AI agents find your capabilities. We scanned 500 businesses. Zero have one. Here is what it is, what goes in it, and how to generate one.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/agent-card-json-guide',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Education',
    wordCount: 1850,
    keywords:
      'agent card json, agent-card.json, A2A protocol, agent card file, AI agent discovery',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'What Is agent-card.json',
          item: 'https://agenthermes.ai/blog/agent-card-json-guide',
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
      title="What Is agent-card.json? The Missing File on 500 Business Websites"
      shareUrl="https://agenthermes.ai/blog/agent-card-json-guide"
      currentHref="/blog/agent-card-json-guide"
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
            <span className="text-zinc-400">agent-card.json Guide</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <FileJson className="h-3.5 w-3.5" />
              A2A Protocol
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Standards Deep Dive
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            What Is agent-card.json?{' '}
            <span className="text-emerald-400">The Missing File on 500 Business Websites</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            agent-card.json is how AI agents discover what your business can do. It is the A2A
            protocol equivalent of a homepage, a resume, and an API spec — in one small JSON file.
            We scanned <strong className="text-zinc-100">500 businesses</strong>. Exactly{' '}
            <strong className="text-emerald-400">zero</strong> have one.
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
                  13 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE ZERO NUMBER ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            The Data Point That Starts This Article: 0 of 500
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Over the past two months the AgentHermes scanner has audited 500 businesses across 27
              verticals — SaaS, ecommerce, healthcare, legal, restaurants, home services, and more.
              We checked every one of them for <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/.well-known/agent-card.json</code>.
            </p>
            <p>
              Zero of them had one. Not 2%. Not 0.4%. <strong className="text-zinc-100">Zero.</strong>
            </p>
            <p>
              For context, only 2 of 500 had an MCP endpoint (0.4%), and 148 had no visible pricing
              at all (30%). agent-card.json is somehow even more neglected than those — because most
              businesses do not know it exists.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '500', label: 'businesses scanned', icon: Search },
              { value: '0', label: 'have agent-card.json', icon: FileJson },
              { value: '2', label: 'have an MCP endpoint', icon: Server },
              { value: '43', label: 'avg readiness score', icon: Zap },
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

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Why this matters:</strong> A2A is the protocol
              Google, Microsoft, IBM, Anthropic, and 50+ partners agreed on for cross-agent
              communication. agent-card.json is the entry point. If agents cannot find it, they
              cannot discover your capabilities — they fall back to scraping your HTML, which is
              unreliable, slow, and frequently wrong.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT IS IT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <FileJson className="h-5 w-5 text-blue-500" />
            What agent-card.json Actually Is
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              agent-card.json is a JSON document defined by the{' '}
              <strong className="text-zinc-100">A2A (Agent-to-Agent) protocol</strong>, currently at
              spec version 0.3. It is served at a well-known path — <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/.well-known/agent-card.json</code> — and
              it describes an agent-accessible service in machine-readable form.
            </p>
            <p>
              When an AI agent evaluates whether it can complete a task at your business, the first
              thing it does is fetch this file. From it, the agent learns:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li>Who you are and what you do (name, description, provider)</li>
              <li>What capabilities you expose (streaming, tools, push notifications)</li>
              <li>What skills you offer (book_appointment, check_inventory, get_quote)</li>
              <li>Where the agent connects (endpoint URL, transport, protocol version)</li>
              <li>How to authenticate (bearer, oauth2, apiKey, or none)</li>
              <li>What input and output modes you accept (text, json, multipart)</li>
            </ul>
            <p>
              The parallel is almost exact:{' '}
              <strong className="text-zinc-100">agent-card.json is to agents what a homepage is to humans</strong>.
              Without a homepage, people bounce. Without an agent-card.json, agents bounce — or
              worse, they guess at your capabilities by scraping and then call the wrong endpoint,
              creating support tickets instead of revenue.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FIELDS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-500" />
            What Goes Inside: The 6 Core Fields
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            A valid agent-card.json has six core field groups. The full spec allows more, but these
            six are the minimum an agent needs to make a decision about whether it can work with you.
          </p>

          <div className="space-y-4 mb-8">
            {cardFields.map((field) => {
              const colors = getColorClasses(field.color)
              return (
                <div
                  key={field.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <field.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{field.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{field.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <code className={`${colors.text} text-xs block whitespace-pre-wrap`}>
                      {field.example}
                    </code>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== EXAMPLE FILE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-cyan-500" />
            A Minimal, Valid agent-card.json Example
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Here is what a production-ready agent card for a restaurant might look like — copy it,
            edit the values, and ship it today.
          </p>

          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 overflow-x-auto mb-8">
            <pre className="text-xs leading-relaxed text-zinc-300">
{`{
  "name": "Joes Pizza",
  "description": "Family-owned NYC pizza shop offering delivery, pickup, and catering.",
  "url": "https://joes-pizza.example.com/a2a",
  "version": "1.0.0",
  "protocolVersion": "0.3.0",
  "provider": {
    "organization": "Joes Pizza LLC",
    "url": "https://joes-pizza.example.com"
  },
  "capabilities": {
    "streaming": true,
    "pushNotifications": false,
    "stateTransitionHistory": false
  },
  "defaultInputModes": ["text"],
  "defaultOutputModes": ["text", "application/json"],
  "authentication": {
    "schemes": ["none"]
  },
  "skills": [
    {
      "id": "get_menu",
      "name": "Get Menu",
      "description": "Returns the current menu with prices and availability.",
      "tags": ["menu", "pricing"],
      "examples": ["what pizzas do you have", "is the pepperoni available"]
    },
    {
      "id": "place_order",
      "name": "Place Order",
      "description": "Places a delivery or pickup order.",
      "tags": ["order", "checkout"],
      "examples": ["order two large pepperoni for pickup at 7pm"]
    }
  ]
}`}
            </pre>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              That is the entire thing. 40 lines of JSON unlocks agent discoverability for the
              business. The file is static — it does not need a server, a database, or runtime
              logic. You upload it, point agents at <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/.well-known/agent-card.json</code>, and you are in the A2A ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO CREATE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Two Ways to Create Your agent-card.json
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <h3 className="font-bold text-zinc-100 mb-2 flex items-center gap-2">
                <Code2 className="h-4 w-4 text-blue-400" />
                Manual (for developers)
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                Read the A2A v0.3 spec, draft the JSON by hand, validate against the schema, push to
                your repo, and configure your webserver to serve it at the well-known path with
                Content-Type: application/json.
              </p>
              <p className="text-xs text-zinc-500">
                Time: 2 to 4 hours including debugging and schema validation.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="font-bold text-zinc-100 mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Auto-generated via AgentHermes
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                Visit{' '}
                <Link href="/connect" className="text-emerald-400 hover:text-emerald-300 underline">
                  /connect
                </Link>
                , pick your industry, fill in basic business info. AgentHermes generates a
                spec-compliant card, deploys it to the well-known path, and registers it with the
                AgentHermes registry.
              </p>
              <p className="text-xs text-zinc-500">Time: 60 seconds. No code required.</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-zinc-100 mb-4">Validation checklist</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
            {checkList.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/80"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-sm text-zinc-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BRAND COLLISION NOTE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-amber-500" />
            Quick Brand Note: AgentHermes vs Nous Hermes
          </h2>
          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-6">
            <p className="text-sm text-zinc-300 leading-relaxed mb-3">
              If you arrived here searching for the <strong>Hermes</strong> language models from
              NousResearch, you are in the wrong place — and that is a common mix-up worth clearing
              up once.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed mb-3">
              <strong className="text-zinc-200">Nous Hermes / Hermes 3 / Hermes 4</strong> are
              open-weight large language models released by NousResearch. They are general-purpose
              reasoning and agentic models that you download and run. Find them on Hugging Face or
              at nousresearch.com.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-emerald-400">AgentHermes</strong> (one word, agenthermes.ai)
              is the <strong>Agent Readiness Platform</strong>. We scan your business across 9
              dimensions, score it 0 to 100, and give you the infrastructure — MCP server,
              agent-card.json, llms.txt, agent-hermes.json — that makes you discoverable by any
              model, including NousResearch's Hermes line. Different product, different company,
              complementary purpose.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY IT MATTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Why Zero Cards Is an Existential Problem
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Agents default to scraping',
                detail: 'Without agent-card.json, an agent visiting your site guesses your capabilities from HTML. Scraping is 30-60% accurate on structured data and near-zero on pricing and availability. The agent gets the wrong answer and blames your business.',
              },
              {
                title: 'You are invisible to A2A networks',
                detail: 'Google, Microsoft, and 50+ partners built A2A to let agents talk to services. Without a card, you are not in that network. Not indexed, not recommended, not routable.',
              },
              {
                title: 'Competitors will go first',
                detail: 'The first business in every vertical with a valid agent-card.json captures the entire agent-driven demand for that category. There is no second place in agent-first search.',
              },
              {
                title: 'Your readiness score caps low',
                detail: 'The AgentHermes D9 Agent Experience dimension weights agent-card.json presence heavily. Missing it alone knocks you out of Silver tier (60+). Combined with no MCP endpoint, you cannot break 40 — Bronze ceiling.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
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
                title: 'The agent-hermes.json Standard',
                href: '/standard',
                tag: 'Standard',
                tagColor: 'blue',
              },
              {
                title: 'Zero MCP Servers for Local Businesses — The $6.2B Gap',
                href: '/blog/mcp-gap',
                tag: 'Market Analysis',
                tagColor: 'amber',
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
            Generate your agent-card.json in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness scan, then connect your business. We generate and host a
            spec-compliant agent-card.json at /.well-known/agent-card.json — plus MCP, llms.txt, and
            agent-hermes.json. No code required.
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
