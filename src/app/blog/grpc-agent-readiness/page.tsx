import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Cable,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileJson,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'gRPC and Agent Readiness: Why Protocol Buffers Score Differently Than REST | AgentHermes',
  description:
    'Technical comparison of gRPC vs REST for agent readiness scoring. gRPC wins on reliability and strict typing but loses on discoverability. The best pattern: REST for discovery, gRPC for performance-critical paths.',
  keywords: [
    'gRPC protocol buffers agent readiness',
    'gRPC vs REST agents',
    'protocol buffers AI agent',
    'gRPC agent readiness scoring',
    'REST vs gRPC agent discovery',
    'gRPC OpenAPI comparison',
    'agent readiness API protocol',
    'binary protocol AI agents',
  ],
  openGraph: {
    title: 'gRPC and Agent Readiness: Why Protocol Buffers Score Differently Than REST',
    description:
      'gRPC is faster and more strictly typed than REST. But AI agents cannot auto-discover .proto files. Here is how protocol choice impacts your agent readiness score.',
    url: 'https://agenthermes.ai/blog/grpc-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'gRPC and Agent Readiness: Protocol Buffers vs REST',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'gRPC and Agent Readiness: Protocol Buffers vs REST',
    description:
      'gRPC wins on speed and typing. REST wins on agent discoverability. The best architecture uses both.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/grpc-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const comparisonRows = [
  { dimension: 'D1 Discoverability', rest: '85 — /openapi.json auto-detected by agents', grpc: '40 — .proto files not auto-discoverable, reflection optional', winner: 'REST' },
  { dimension: 'D2 API Quality', rest: '75 — JSON Schema validation, typed but flexible', grpc: '95 — Compiled types, zero ambiguity, codegen enforced', winner: 'gRPC' },
  { dimension: 'D3 Onboarding', rest: '80 — curl test in seconds, Postman, browser', grpc: '50 — Requires codegen, grpcurl, language-specific setup', winner: 'REST' },
  { dimension: 'D6 Data Quality', rest: '70 — JSON is human-readable, nullable fields common', grpc: '85 — Proto3 defaults, oneof unions, no null ambiguity', winner: 'gRPC' },
  { dimension: 'D7 Security', rest: '70 — OAuth, API keys, HTTPS, CORS', grpc: '80 — Mutual TLS built-in, interceptors for auth, no CORS needed', winner: 'gRPC' },
  { dimension: 'D8 Reliability', rest: '65 — HTTP/1.1, connection-per-request overhead', grpc: '90 — HTTP/2 multiplexing, streaming, built-in deadlines', winner: 'gRPC' },
  { dimension: 'D9 Agent Experience', rest: '75 — OpenAPI + agent-card.json + MCP ecosystem', grpc: '25 — No agent-card equivalent, no MCP support, no llms.txt', winner: 'REST' },
]

const hybridSteps = [
  {
    step: '1',
    title: 'REST gateway for agent discovery',
    detail: 'Serve /openapi.json, agent-card.json, and llms.txt over standard HTTPS REST. This is what agents look for when discovering your service. No agent scans for .proto files.',
    icon: Search,
    color: 'emerald',
  },
  {
    step: '2',
    title: 'gRPC for performance-critical tool execution',
    detail: 'Once an agent has discovered your service through REST, performance-critical operations (real-time inference, streaming data, high-throughput queries) can use gRPC. The agent calls a REST endpoint that proxies to internal gRPC, or uses gRPC-Web directly.',
    icon: Zap,
    color: 'blue',
  },
  {
    step: '3',
    title: 'Proto-to-OpenAPI auto-generation',
    detail: 'Tools like grpc-gateway and buf generate OpenAPI specs from .proto files automatically. Your source of truth remains the proto file (strict typing), but agents see an OpenAPI spec (standard discovery). Best of both worlds with zero drift.',
    icon: Code2,
    color: 'purple',
  },
  {
    step: '4',
    title: 'gRPC-Web for browser and agent clients',
    detail: 'gRPC-Web bridges the gap for environments that cannot use native gRPC (browsers, serverless, some agent runtimes). An Envoy or gRPC-Web proxy translates HTTP/1.1 requests to HTTP/2 gRPC. The agent gets REST-like simplicity with gRPC performance under the hood.',
    icon: Globe,
    color: 'cyan',
  },
  {
    step: '5',
    title: 'MCP tools wrapping gRPC services',
    detail: 'Expose your gRPC services as MCP tools. Each RPC method becomes an MCP tool with a JSON Schema input derived from the proto message type. The agent discovers and calls MCP tools over standard transport — your internal implementation uses gRPC for speed.',
    icon: Bot,
    color: 'amber',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Can AI agents call gRPC services directly?',
    answer:
      'In theory, yes — an agent with a gRPC client library and the .proto file can call gRPC services. In practice, almost no agents do this. The agent ecosystem is built on HTTP/REST, JSON, and OpenAPI. Agents auto-discover services by fetching /openapi.json, agent-card.json, or llms.txt — all REST conventions. gRPC services that want agent traffic need a REST or MCP layer for discovery, even if the underlying transport is gRPC.',
  },
  {
    question: 'Why does gRPC score higher on reliability but lower on discoverability?',
    answer:
      'gRPC uses HTTP/2 with multiplexing, built-in deadlines, and automatic retries — all of which make the transport layer more reliable than HTTP/1.1 REST. But discoverability requires a convention that agents know to look for. Agents know to fetch /openapi.json or /.well-known/agent-card.json. There is no equivalent convention for gRPC reflection endpoints. The technology is reliable; the ecosystem convention is missing.',
  },
  {
    question: 'What is the gRPC reflection API and does it help agent readiness?',
    answer:
      'gRPC Server Reflection is a service that lets clients query what methods a server supports at runtime, similar to OpenAPI for REST. However, it returns binary protobuf descriptors, not human-readable JSON. No agent framework currently queries gRPC reflection for auto-discovery. If the agent ecosystem adopted a convention for gRPC reflection (similar to checking /openapi.json), gRPC discoverability would improve dramatically.',
  },
  {
    question: 'Should I rewrite my gRPC services as REST for better agent readiness?',
    answer:
      'No. Use grpc-gateway or buf connect to auto-generate a REST interface from your existing .proto files. This gives you the typing benefits of protobuf internally and REST discoverability externally with zero code duplication. Rewriting to REST would sacrifice the performance and type safety advantages that make gRPC valuable in the first place.',
  },
  {
    question: 'How does GraphQL compare to gRPC for agent readiness?',
    answer:
      'GraphQL and gRPC both offer strong typing and schema-first design. GraphQL scores higher on D1 Discoverability (introspection is built-in and returns JSON), but gRPC scores higher on D8 Reliability (HTTP/2, streaming). For agent readiness, REST with OpenAPI still wins overall because the agent ecosystem is built around it. See our detailed GraphQL vs REST comparison for more.',
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

export default function GrpcAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'gRPC and Agent Readiness: Why Protocol Buffers Score Differently Than REST',
    description:
      'Technical comparison of gRPC vs REST for agent readiness. gRPC wins on reliability and type safety. REST wins on discoverability and agent ecosystem support.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/grpc-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1850,
    keywords:
      'gRPC protocol buffers agent readiness, gRPC vs REST agents, binary protocol AI, agent readiness API protocol',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'gRPC Agent Readiness',
          item: 'https://agenthermes.ai/blog/grpc-agent-readiness',
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
      title="gRPC and Agent Readiness: Why Protocol Buffers Score Differently Than REST"
      shareUrl="https://agenthermes.ai/blog/grpc-agent-readiness"
      currentHref="/blog/grpc-agent-readiness"
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
            <span className="text-zinc-400">gRPC Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              <Cable className="h-3.5 w-3.5" />
              Technical Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Protocol Comparison
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            gRPC and Agent Readiness:{' '}
            <span className="text-emerald-400">Why Protocol Buffers Score Differently Than REST</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            gRPC is faster, more strictly typed, and more efficient than REST. But when we score gRPC-only
            services on the <strong className="text-zinc-100">9 agent readiness dimensions</strong>, they
            consistently underperform REST services on discoverability. The protocol that machines should
            prefer is the one that agent machines cannot find. Here is why — and how to get the best of both.
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
                  11 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE PARADOX ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-cyan-500" />
            The Protocol Paradox: Better for Machines, Harder for Agents to Find
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              gRPC was designed for machine-to-machine communication. Protocol Buffers define schemas
              with compiled types — no ambiguity about whether a field is a string or integer, no null vs
              undefined vs empty confusion, no parsing overhead. On paper, this should make gRPC the ideal
              protocol for AI agents. Agents are machines. gRPC is built for machines.
            </p>
            <p>
              But agent readiness is not just about the quality of the communication — it is about the
              ability to <em>discover</em> that communication exists. When an AI agent encounters a new
              service, it looks for specific signals:{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/openapi.json</code>,{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/.well-known/agent-card.json</code>,{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">/llms.txt</code>.
              All of these are REST conventions. A gRPC-only service has none of them.
            </p>
            <p>
              The agent cannot curl a gRPC endpoint. It cannot fetch a human-readable schema from a URL.
              It cannot test an endpoint in a browser. The binary protocol that is objectively superior for
              machine communication is wrapped in an ecosystem that agents have not been trained to navigate.
              This is a tooling gap, not a protocol flaw — and it is fixable.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '10x', label: 'faster serialization vs JSON', icon: Zap },
              { value: '0', label: 'agent frameworks with gRPC auto-discovery', icon: Search },
              { value: 'HTTP/2', label: 'multiplexed connections built-in', icon: Server },
              { value: '.proto', label: 'schema — like OpenAPI but compiled', icon: Code2 },
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

      {/* ===== DIMENSION COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Dimension-by-Dimension: REST vs gRPC for Agent Readiness
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We scored equivalent services — same functionality, same data — implemented in REST with
            OpenAPI and gRPC with Protocol Buffers. Here is how each protocol scores on the dimensions
            that matter most for agent readiness.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div>REST Score</div>
              <div>gRPC Score</div>
              <div>Winner</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className="text-zinc-400">{row.rest}</div>
                <div className="text-zinc-400">{row.grpc}</div>
                <div className={row.winner === 'REST' ? 'text-emerald-400 font-bold' : 'text-blue-400 font-bold'}>{row.winner}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="text-base font-bold text-emerald-400 mb-2">REST Wins (4 dimensions)</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                D1 Discoverability, D3 Onboarding, D9 Agent Experience, and the critical first-contact
                experience. An agent that cannot discover your service scores it zero regardless of how
                good the underlying API is.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <h3 className="text-base font-bold text-blue-400 mb-2">gRPC Wins (3 dimensions)</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                D2 API Quality, D7 Security, and D8 Reliability. Once the agent is connected, gRPC
                delivers faster, more reliable, more type-safe interactions. The execution layer is
                objectively superior.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The pattern is clear: REST wins the <strong className="text-zinc-100">discovery phase</strong>,
              gRPC wins the <strong className="text-zinc-100">execution phase</strong>. Since agent readiness
              scoring weights D1 Discoverability and D9 Agent Experience heavily (together they represent 22%
              of the total score), a gRPC-only service starts with a significant penalty before the agent
              even evaluates the API quality.
            </p>
            <p>
              This matches what we see in the{' '}
              <Link href="/blog/graphql-vs-rest-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                GraphQL vs REST comparison
              </Link> — GraphQL also has stronger typing than REST but scores lower on discoverability because
              the agent ecosystem standardized on REST conventions first.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY PROTO FILES ARE NOT OPENAPI ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <FileJson className="h-5 w-5 text-purple-500" />
            Proto Files vs OpenAPI: Same Idea, Different Ecosystem
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">.proto</code> file
              and an OpenAPI spec serve the same purpose: they define the contract between client and server.
              Both describe methods, input parameters, output shapes, and types. Proto files are arguably
              better at this — they compile to type-safe client code in 11 languages, eliminate an entire
              class of serialization bugs, and support streaming natively.
            </p>
            <p>
              But the agent ecosystem chose OpenAPI as the{' '}
              <Link href="/blog/api-first-vs-web-first" className="text-emerald-400 hover:text-emerald-300 underline">
                discovery convention
              </Link>. When an agent scans a domain, it checks for <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
              /openapi.json</code> — a convention that is simple, ubiquitous, and returns human-readable
              JSON. There is no equivalent convention for gRPC. An agent would need to know the gRPC
              reflection endpoint exists, connect over HTTP/2, parse binary protobuf descriptors, and
              reconstruct the service schema. This is technically possible but no agent framework does it.
            </p>
            <p>
              The fix is not to abandon proto files — it is to generate OpenAPI from them. Tools like{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">grpc-gateway</code> and{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">buf</code> can
              auto-generate OpenAPI specs from .proto files with zero manual work. Your source of truth
              remains the proto file. Agents see the OpenAPI spec. Both sides get what they need.
            </p>
          </div>
        </div>
      </section>

      {/* ===== BEST PRACTICE: HYBRID ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Best Practice: REST for Discovery, gRPC for Performance
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The highest-scoring architecture uses REST and gRPC together. REST handles the discovery
            layer that agents need. gRPC handles the execution layer where performance matters. Here
            is how to implement this pattern.
          </p>

          <div className="space-y-3 mb-8">
            {hybridSteps.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.step}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border} ${colors.text} text-sm font-bold`}>
                    {item.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className={`h-4 w-4 ${colors.text}`} />
                      <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Score impact:</strong> A gRPC-only service typically
              scores 45-55 on agent readiness. Adding a REST discovery layer (OpenAPI, agent-card.json,
              llms.txt) while keeping gRPC for execution raises the score to 70-80 — a jump from Bronze
              to Silver or Gold. The gRPC service itself does not change. Only the discovery wrapper does.
            </p>
          </div>
        </div>
      </section>

      {/* ===== REAL EXAMPLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Real-World Examples: Who Does This Well
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Google Cloud is the clearest example. Internally, every Google service communicates over gRPC.
              Externally, they expose REST APIs with OpenAPI specs alongside gRPC client libraries. The
              Google Cloud CLI and client SDKs use gRPC for performance. The API Explorer and documentation
              use REST for discoverability. Same services, two interfaces, optimized for different consumers.
            </p>
            <p>
              Envoy Proxy takes a similar approach. Its control plane uses gRPC for configuration and health
              checking. But the admin interface serves REST endpoints for monitoring and debugging. Agents
              analyzing infrastructure health can discover Envoy through REST while the actual proxy traffic
              uses gRPC.
            </p>
            <p>
              Buf Connect (formerly Buf) is the most agent-relevant example. It generates both gRPC and
              REST handlers from a single .proto file. Services built with Connect are automatically
              discoverable via REST while internally using Protocol Buffers. This is the pattern we
              recommend for any team building agent-ready infrastructure on gRPC.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: 'Google Cloud', approach: 'REST + OpenAPI for docs, gRPC for client SDKs', score: '~68' },
              { name: 'Envoy Proxy', approach: 'gRPC control plane, REST admin interface', score: '~62' },
              { name: 'Buf Connect', approach: 'Dual-protocol from single .proto source', score: '~65' },
            ].map((example) => (
              <div
                key={example.name}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="text-base font-bold text-zinc-100 mb-2">{example.name}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-2">{example.approach}</p>
                <div className="text-sm font-bold text-emerald-400">Score: {example.score}</div>
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
                title: 'GraphQL vs REST for Agent Readiness: Which Scores Higher?',
                href: '/blog/graphql-vs-rest-agent-readiness',
                tag: 'Technical Deep Dive',
                tagColor: 'cyan',
              },
              {
                title: 'API-First vs Web-First: Why Architecture Determines Your Score',
                href: '/blog/api-first-vs-web-first',
                tag: 'Framework',
                tagColor: 'purple',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
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
            Score your API in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Whether you use REST, gRPC, or GraphQL — see how your service scores across all 9
            agent readiness dimensions. The scanner detects your protocol and scores accordingly.
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
