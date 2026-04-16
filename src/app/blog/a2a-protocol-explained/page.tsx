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
  FileJson,
  HelpCircle,
  Layers,
  Link2,
  Network,
  Radio,
  Server,
  Share2,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'The A2A Protocol: How AI Agents Talk to Each Other (And Your Business) | AgentHermes',
  description:
    'A2A (Agent-to-Agent) protocol v0.3 is how AI agents delegate tasks to other agents. Different from MCP (agent-to-tool). Discovery via /.well-known/agent-card.json. 0 of 500 businesses scanned have it. Here is what A2A is, how it works, and why your business needs it.',
  keywords: [
    'A2A protocol agent-to-agent',
    'A2A protocol',
    'agent to agent protocol',
    'A2A vs MCP',
    'agent-card.json A2A',
    'Google A2A protocol',
    'agent delegation protocol',
    'A2A v0.3',
    'agent interoperability',
  ],
  openGraph: {
    title: 'The A2A Protocol: How AI Agents Talk to Each Other (And Your Business)',
    description:
      'A2A is how agents delegate to other agents. MCP is agent-to-tool, A2A is agent-to-agent. 0 of 500 businesses have A2A. Learn the protocol.',
    url: 'https://agenthermes.ai/blog/a2a-protocol-explained',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The A2A Protocol Explained',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The A2A Protocol: How AI Agents Talk to Each Other',
    description:
      'A2A v0.3 is how AI agents delegate to other agents. Different from MCP. 0 of 500 businesses scanned have it. Here is the protocol.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/a2a-protocol-explained',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const a2aSkills = [
  {
    name: 'Describe Capability',
    description: 'An agent advertises what it can do. Skills, input types, output formats, pricing, rate limits, and authentication requirements are published in the agent card so callers can evaluate fit before invoking.',
    example: 'skills: ["book_reservation", "check_availability", "get_pricing"]',
    icon: FileJson,
    color: 'emerald',
  },
  {
    name: 'Negotiate Task',
    description: 'The calling agent and the serving agent agree on the specific job before work begins. Parameters, constraints, budget, and success criteria are exchanged so both sides know what done looks like.',
    example: 'task: { intent: "book", slot: "Fri 7pm", party: 4, budget: 120 }',
    icon: Target,
    color: 'blue',
  },
  {
    name: 'Execute',
    description: 'The serving agent performs the task. This is the only step most humans imagine when they think of agent cooperation, but it is one of five distinct phases in A2A.',
    example: 'POST /a2a/tasks → { task_id, status: "running" }',
    icon: Zap,
    color: 'purple',
  },
  {
    name: 'Stream Updates',
    description: 'Long-running tasks emit progress events so the caller can show status, escalate if stuck, or intervene. Server-Sent Events or WebSockets push partial results as they arrive instead of forcing polling.',
    example: 'event: "progress" data: { step: 2, of: 4, message: "confirming slot" }',
    icon: Radio,
    color: 'cyan',
  },
  {
    name: 'Handle Errors',
    description: 'Structured error codes tell the caller exactly what failed and whether a retry is safe. Transient errors, auth failures, quota exhaustion, and capability mismatches each have distinct codes and remediation hints.',
    example: 'error: { code: "INSUFFICIENT_CAPABILITY", retryable: false }',
    icon: Layers,
    color: 'amber',
  },
]

const mcpVsA2a = [
  { aspect: 'Who talks to whom', mcp: 'Agent to tool (service)', a2a: 'Agent to agent' },
  { aspect: 'Origin', mcp: 'Anthropic', a2a: 'Google + cross-vendor working group' },
  { aspect: 'Transport', mcp: 'JSON-RPC 2.0 over stdio or SSE', a2a: 'HTTPS + JSON with SSE for streaming' },
  { aspect: 'Discovery', mcp: 'MCP registry or direct URL', a2a: '/.well-known/agent-card.json' },
  { aspect: 'Typical use', mcp: 'Fetch data, call APIs, run a query', a2a: 'Delegate a multi-step task to a specialist' },
  { aspect: 'State', mcp: 'Usually stateless per call', a2a: 'Long-lived tasks with progress streaming' },
  { aspect: 'Authentication', mcp: 'OAuth, API keys, bearer tokens', a2a: 'OAuth, JWT, plus agent identity (KYA)' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is the A2A protocol?',
    answer:
      'A2A (Agent-to-Agent) is an open protocol for AI agents to delegate tasks to other AI agents. It was introduced by Google in 2025 and is now maintained by a cross-vendor working group. The current version is v0.3. Where MCP (Model Context Protocol) lets an agent call a tool, A2A lets an agent hire another agent to complete a job on its behalf.',
  },
  {
    question: 'How is A2A different from MCP?',
    answer:
      'MCP is agent-to-tool: a single agent calls typed functions on a server to fetch data or perform a discrete action. A2A is agent-to-agent: one agent delegates a whole task to a specialist agent that may itself use MCP tools, other agents, or human operators to complete the job. In practice most real systems use both. MCP is the hands. A2A is the phone.',
  },
  {
    question: 'Where does A2A discovery happen?',
    answer:
      'A2A discovery uses a standard file at /.well-known/agent-card.json on the serving agent\'s domain. Any calling agent can GET that URL and learn the serving agent\'s skills, input schemas, auth requirements, and endpoint. This mirrors the way robots.txt and sitemap.xml work for search crawlers, but for agents. Zero of the 500 businesses AgentHermes has scanned currently publish an agent card.',
  },
  {
    question: 'Do I need to write A2A code to participate?',
    answer:
      'No. AgentHermes auto-generates a v0.3 compliant agent card and hosts the A2A endpoints for your business. The platform exposes 5 standard skills — describe, negotiate, execute, stream, and handle errors — on top of the MCP tools you already publish. You supply business data through a form; AgentHermes handles the protocol plumbing and keeps the spec current as A2A evolves.',
  },
  {
    question: 'Why does A2A matter for a non-technical business?',
    answer:
      'As agents get more autonomous, they increasingly outsource subtasks to specialist agents the way humans outsource to vendors. An AI travel agent will not book your restaurant directly — it will hand the booking job to a restaurant-specialist agent that already knows your menu, your seating rules, and your payment terms. A2A is the handshake that makes that handoff possible. Businesses with agent cards become the specialists. Businesses without them stay invisible in the delegation chain.',
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

export default function A2aProtocolExplainedPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The A2A Protocol: How AI Agents Talk to Each Other (And Your Business)',
    description:
      'A2A (Agent-to-Agent) protocol v0.3 is how AI agents delegate to other agents. Different from MCP. Discovery via agent-card.json. 0 of 500 businesses have it.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/a2a-protocol-explained',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Protocols',
    wordCount: 1850,
    keywords:
      'A2A protocol, agent-to-agent, A2A vs MCP, agent-card.json, Google A2A, agent delegation, A2A v0.3',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'The A2A Protocol Explained',
          item: 'https://agenthermes.ai/blog/a2a-protocol-explained',
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
      title="The A2A Protocol: How AI Agents Talk to Each Other (And Your Business)"
      shareUrl="https://agenthermes.ai/blog/a2a-protocol-explained"
      currentHref="/blog/a2a-protocol-explained"
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
            <span className="text-zinc-400">A2A Protocol Explained</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Share2 className="h-3.5 w-3.5" />
              Protocols
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Deep Dive
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            The A2A Protocol:{' '}
            <span className="text-emerald-400">How AI Agents Talk to Each Other (And Your Business)</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            A2A is the handshake that lets one AI agent delegate a real task to another. It is not
            agent-to-tool like MCP — it is agent-to-agent. And{' '}
            <strong className="text-zinc-100">0 of the 500 businesses AgentHermes has scanned</strong>{' '}
            publish an A2A agent card today. This guide covers the protocol, the 5 skills, and why
            your business becomes a first-class participant in the delegation economy the moment you
            ship one.
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

      {/* ===== WHAT IS A2A ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-500" />
            What A2A Is (And What It Is Not)
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A2A stands for <strong className="text-zinc-100">Agent-to-Agent</strong>. It is an open
              protocol, currently at version 0.3, that defines how one AI agent hires another AI agent
              to complete a task on its behalf. It was first published by Google in early 2025 and is
              now steered by a cross-vendor working group that includes Anthropic, OpenAI, Microsoft,
              and a growing roster of independents.
            </p>
            <p>
              The easiest way to anchor A2A is to contrast it with the protocol most people have
              already heard of — <Link href="/blog/what-is-mcp-server" className="text-emerald-400 hover:text-emerald-300 underline">MCP</Link>.
              MCP lets an agent call a typed function on a server. Think{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                get_availability(date)
              </code>{' '}
              or{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                create_invoice(amount)
              </code>. It is a tool call. A2A is a different layer entirely: it is how an agent asks
              another agent to <em>handle the whole job</em> — including which tools to use, in what
              order, and how to recover from failure.
            </p>
            <p>
              If MCP is the hands, A2A is the phone. A travel-planning agent uses MCP tools to query
              calendars and flights. It uses A2A to call a restaurant-specialist agent and say
              &ldquo;book me dinner for four on Friday, walkable from this hotel, under $120 a
              head&rdquo; — and trust the specialist to work out the rest.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '0.3', label: 'current A2A spec version', icon: FileJson },
              { value: '0 / 500', label: 'businesses with A2A card', icon: Share2 },
              { value: '5', label: 'standard A2A skills', icon: Layers },
              { value: '.well-known', label: 'agent-card.json location', icon: Network },
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

      {/* ===== MCP VS A2A ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            MCP vs A2A: Side by Side
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Both protocols matter. Most production agent stacks ship both. But confusing them leads
            to wasted implementation effort, so keep this table handy.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div>MCP (Agent-to-Tool)</div>
              <div>A2A (Agent-to-Agent)</div>
            </div>
            {mcpVsA2a.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.mcp}</div>
                <div className="text-emerald-400">{row.a2a}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              A practical way to think about it: <strong className="text-zinc-100">MCP is the
              function call. A2A is the job posting.</strong> A function call returns a value. A job
              posting accepts applicants, negotiates scope, runs for minutes or hours, streams
              progress, and ends with a deliverable. Both are essential, and AgentHermes generates
              infrastructure for both when you connect a business.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE 5 SKILLS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            The 5 Skills Every A2A Agent Implements
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A2A v0.3 defines five skills that every compliant agent must support. They are not
              five endpoints — they are five phases of a single cooperative transaction. An agent
              card declares which of these phases the agent implements and at what fidelity.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {a2aSkills.map((skill, index) => {
              const colors = getColorClasses(skill.color)
              return (
                <div
                  key={skill.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <skill.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 font-mono">Skill {index + 1}</div>
                      <h3 className="text-lg font-bold text-zinc-100">{skill.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{skill.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{skill.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The five skills matter because they encode failure modes, not just happy paths.
              Describe lets you say no before the task starts. Negotiate lets you refuse bad jobs.
              Stream lets you recover when execution gets slow. Handle Errors lets the caller know
              whether retrying will help. Real agent cooperation lives in the unhappy paths — that
              is why A2A treats them as first-class skills rather than afterthoughts.
            </p>
          </div>
        </div>
      </section>

      {/* ===== DISCOVERY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-emerald-500" />
            Discovery: The /.well-known/agent-card.json File
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A2A discovery borrows a pattern from the web: a well-known file at a fixed path. When
              an agent wants to know whether your business is reachable over A2A, it makes a single
              request to{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                https://yourdomain.com/.well-known/agent-card.json
              </code>. The file declares your skills, endpoint URL, authentication requirements,
              and pricing.
            </p>
            <p>
              This is the same pattern that gave us{' '}
              <code className="text-zinc-100">robots.txt</code>,{' '}
              <code className="text-zinc-100">security.txt</code>, and OpenID Connect&apos;s
              discovery document. It works because it is boring: one URL, one JSON file, no
              registration step. An agent can discover a new business in a single HTTP request and
              immediately know whether cooperation is possible.
            </p>
            <p>
              AgentHermes scans for the agent card in every audit. Across 500 businesses we have
              found exactly zero that publish one. The file is trivially easy to author — our full{' '}
              <Link href="/blog/agent-card-json-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                agent-card.json guide
              </Link>{' '}
              walks through the minimal valid structure in under three minutes. AgentHermes will also
              generate and host yours automatically when you connect a business to the platform.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Why the .well-known prefix matters:</strong> It
              lets agents discover you without prior knowledge of your site structure, subdomain
              layout, or CMS. They do not need a sitemap, an API docs page, or a developer portal.
              One GET request, one JSON response. That is the whole ritual.
            </p>
          </div>
        </div>
      </section>

      {/* ===== AGENTHERMES IMPLEMENTATION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            How AgentHermes Implements A2A for Your Business
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            AgentHermes itself is an A2A-compliant agent. When you connect a business through the
            platform, it inherits the same compliance. Here is the pipeline.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'We publish an agent card at /.well-known/agent-card.json',
                detail: 'The file includes all 5 A2A skills, v0.3 schema, authentication hints, and links to per-business endpoints hosted on AgentHermes infrastructure.',
                icon: FileJson,
              },
              {
                step: '2',
                title: 'Each business gets a delegated A2A endpoint',
                detail: 'A restaurant connected via AgentHermes exposes a book-table specialist endpoint. A plumber exposes a schedule-visit specialist. The endpoint wraps the MCP tools already generated for that business.',
                icon: Link2,
              },
              {
                step: '3',
                title: 'Skills advertise capabilities, not just endpoints',
                detail: 'Our agent card declares skills as verbs with parameter schemas. A calling agent can tell in one request whether your business can serve its task — before negotiating terms or spending budget.',
                icon: Bot,
              },
              {
                step: '4',
                title: 'Streaming is on by default for long tasks',
                detail: 'Tasks longer than a second emit Server-Sent Events so the caller sees progress. This is critical for booking flows that pass through third-party confirmation or queue in a restaurant POS.',
                icon: Radio,
              },
              {
                step: '5',
                title: 'Error codes follow the A2A v0.3 spec exactly',
                detail: 'Every failure returns a structured code: INSUFFICIENT_CAPABILITY, QUOTA_EXCEEDED, NEGOTIATION_FAILED, UPSTREAM_UNAVAILABLE. Callers can branch on the code rather than parsing free-form strings.',
                icon: Target,
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              This matters because most businesses will never write a line of A2A code. Just as they
              did not write HTTP stacks when they got websites in the 1990s, they will not implement
              JSON-RPC streaming when they join the agent economy. The{' '}
              <Link href="/standard" className="text-emerald-400 hover:text-emerald-300 underline">
                agent-hermes.json
              </Link>{' '}
              standard bundles MCP + A2A + discovery into one file; AgentHermes handles the rest.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY BUSINESSES NEED A2A ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Why Your Business Needs A2A (Not Just MCP)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Agents will increasingly delegate, not execute',
                detail: 'Monolithic agents are losing to orchestrator-plus-specialist architectures. The orchestrator delegates to specialists. Without an agent card you are not on the specialist list.',
              },
              {
                title: 'Specialists win on fidelity, not generality',
                detail: 'A restaurant-specific A2A agent with real POS access will beat a general travel agent trying to scrape your booking page. A2A is how you advertise that specialism.',
              },
              {
                title: 'MCP alone cannot describe long-running tasks',
                detail: 'Booking a party of 40 for catering takes more than one function call. A2A gives you negotiation, streaming, and structured errors — phases MCP was not designed to handle.',
              },
              {
                title: 'The delegation chain is a trust graph',
                detail: 'Orchestrator agents prefer specialists they already trust. Every successful A2A task earns your business reputation inside that graph. No card, no graph, no compounding trust.',
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Businesses that only publish MCP tools are reachable but not preferred. Businesses that
              also publish A2A agent cards become known specialists — and specialists are who the
              orchestrators hire first. The incremental cost is effectively zero when AgentHermes
              generates both for you. The cost of staying out is missing the delegation economy
              entirely.
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
                title: 'What Is agent-card.json? The Missing File on 500 Business Websites',
                href: '/blog/agent-card-json-guide',
                tag: 'Standards Deep Dive',
                tagColor: 'emerald',
              },
              {
                title: 'What Is an MCP Server and Why Your Business Needs One',
                href: '/blog/what-is-mcp-server',
                tag: 'MCP Explained',
                tagColor: 'emerald',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
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
            Ship MCP + A2A in one connect step
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            AgentHermes generates your agent card, hosts your A2A endpoint, and wires in MCP tools
            for your vertical. See your Agent Readiness Score first, then connect.
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
              href="/standard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              Read the Standard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
