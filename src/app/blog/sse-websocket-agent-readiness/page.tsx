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
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Network,
  Radio,
  RefreshCcw,
  Search,
  Server,
  Shield,
  Sparkles,
  TrendingUp,
  Wifi,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'SSE vs WebSocket for Agent Readiness: Why Server-Sent Events Are the Agent-Preferred Transport | AgentHermes',
  description:
    'MCP uses SSE (Server-Sent Events) as its primary transport, not WebSocket. SSE is HTTP-native, simpler to auth, auto-reconnects, and works through proxies. Here is why SSE wins for agent readiness.',
  keywords: [
    'SSE WebSocket agent readiness transport',
    'SSE vs WebSocket',
    'Server-Sent Events agent readiness',
    'MCP transport SSE',
    'WebSocket agent readiness',
    'MCP SSE transport',
    'agent readiness transport protocol',
    'real-time agent communication',
  ],
  openGraph: {
    title:
      'SSE vs WebSocket for Agent Readiness: Why Server-Sent Events Are the Agent-Preferred Transport',
    description:
      'MCP chose SSE over WebSocket for agent communication. SSE is HTTP-native, auto-reconnects, and works through every proxy and CDN. Here is why it matters for your agent readiness score.',
    url: 'https://agenthermes.ai/blog/sse-websocket-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SSE vs WebSocket for Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'SSE vs WebSocket for Agent Readiness: Why SSE Is the Agent-Preferred Transport',
    description:
      'MCP uses SSE, not WebSocket. HTTP-native, auto-reconnect, simpler auth. Here is why it matters.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/sse-websocket-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const comparisonRows = [
  {
    aspect: 'Protocol',
    sse: 'HTTP/1.1 or HTTP/2 — standard GET request with text/event-stream',
    ws: 'Custom protocol (ws:// or wss://) — requires upgrade handshake from HTTP',
  },
  {
    aspect: 'Direction',
    sse: 'Server-to-client only. Client uses regular POST requests to send data',
    ws: 'Full duplex — both directions simultaneously on one connection',
  },
  {
    aspect: 'Auth',
    sse: 'Standard HTTP headers on every request. Bearer tokens, cookies, API keys all work natively',
    ws: 'Auth happens at connection time only. No per-message auth without custom implementation',
  },
  {
    aspect: 'Reconnection',
    sse: 'Built-in auto-reconnect with Last-Event-ID. Browser and libraries handle it automatically',
    ws: 'Manual reconnection logic required. Must implement retry, backoff, and state recovery yourself',
  },
  {
    aspect: 'Proxy/CDN',
    sse: 'Works through all HTTP proxies, CDNs, and load balancers without configuration',
    ws: 'Many proxies block or drop WebSocket connections. Requires explicit proxy configuration',
  },
  {
    aspect: 'Caching',
    sse: 'HTTP caching headers work normally. CDNs can cache and replay event streams',
    ws: 'No HTTP caching. Binary frames are opaque to intermediaries',
  },
  {
    aspect: 'Debugging',
    sse: 'Plain text in browser DevTools Network tab. curl can stream events directly',
    ws: 'Requires WebSocket-specific inspector. Binary frames harder to read',
  },
  {
    aspect: 'Firewall',
    sse: 'Port 443, standard HTTPS — never blocked by firewalls',
    ws: 'wss:// on port 443 usually works, but some corporate firewalls inspect and block the upgrade',
  },
]

const mcpTransportDetails = [
  {
    name: 'Agent Sends Request',
    description:
      'The agent sends a standard HTTP POST to the MCP server with the method name and parameters as JSON. This is a regular REST-like request — no special protocol needed.',
    icon: Zap,
    color: 'emerald',
  },
  {
    name: 'Server Pushes Response via SSE',
    description:
      'The server responds on the SSE channel using text/event-stream. Each event has an ID, type, and JSON data payload. Long-running operations can stream progress updates before the final result.',
    icon: Radio,
    color: 'blue',
  },
  {
    name: 'Auto-Reconnect on Failure',
    description:
      'If the connection drops, the SSE client automatically reconnects and sends the Last-Event-ID header. The server resumes from where it left off — no agent logic required for recovery.',
    icon: RefreshCcw,
    color: 'purple',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why did MCP choose SSE instead of WebSocket?',
    answer:
      'MCP chose SSE because agent-to-server communication is fundamentally asymmetric. Agents send discrete requests (call a tool, read a resource) and servers stream back responses. SSE handles the server-to-agent direction natively over HTTP, and regular POST handles the agent-to-server direction. This avoids the complexity of WebSocket while working through every HTTP proxy, CDN, and firewall without special configuration.',
  },
  {
    question: 'Does AgentHermes check for SSE support?',
    answer:
      'Yes. When AgentHermes scans an MCP endpoint, it checks for text/event-stream content type, proper SSE event formatting, and Last-Event-ID support for reconnection. SSE support on MCP endpoints contributes to D2 API Quality and D8 Reliability scores. Endpoints that only offer WebSocket score lower because agent compatibility is reduced.',
  },
  {
    question: 'Should I remove my WebSocket endpoints?',
    answer:
      'No. WebSocket is still valuable for human-facing features like live chat, collaborative editing, and gaming. The recommendation is to add SSE support for agent-facing interfaces — specifically MCP endpoints. Your existing WebSocket infrastructure can continue serving its current purpose. Just ensure your agent integration layer uses SSE so every MCP-compatible agent can connect.',
  },
  {
    question: 'What about HTTP streaming (chunked transfer)?',
    answer:
      'Chunked transfer encoding sends data in pieces but has no built-in event structure, reconnection, or event IDs. SSE adds all of these on top of HTTP streaming. For agent communication, raw chunked transfer is insufficient — you need the event framing and reconnection semantics that SSE provides. MCP specifically requires SSE formatting, not raw chunked transfer.',
  },
  {
    question: 'Can I use both SSE and WebSocket on the same server?',
    answer:
      'Absolutely. Many production services expose WebSocket for real-time human interfaces and SSE for agent/MCP interfaces on the same server. The key is that your MCP endpoint specifically must support SSE transport. Agents will connect via SSE. Human users can continue using WebSocket for features that benefit from bidirectional communication.',
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

export default function SseWebsocketAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'SSE vs WebSocket for Agent Readiness: Why Server-Sent Events Are the Agent-Preferred Transport',
    description:
      'MCP uses SSE (Server-Sent Events) as its primary transport. SSE is HTTP-native, auto-reconnects, and works through every proxy. A technical breakdown of why SSE wins for agent readiness.',
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
      'https://agenthermes.ai/blog/sse-websocket-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Deep Dive',
    wordCount: 1900,
    keywords:
      'SSE WebSocket agent readiness transport, MCP SSE, Server-Sent Events, agent readiness transport protocol',
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
          name: 'SSE vs WebSocket for Agent Readiness',
          item: 'https://agenthermes.ai/blog/sse-websocket-agent-readiness',
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
      title="SSE vs WebSocket for Agent Readiness: Why Server-Sent Events Are the Agent-Preferred Transport"
      shareUrl="https://agenthermes.ai/blog/sse-websocket-agent-readiness"
      currentHref="/blog/sse-websocket-agent-readiness"
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
              <Link href="/" className="hover:text-zinc-300 transition-colors">
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
                SSE vs WebSocket for Agent Readiness
              </span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                <Radio className="h-3.5 w-3.5" />
                Technical Deep Dive
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                MCP Transport
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              SSE vs WebSocket for Agent Readiness:{' '}
              <span className="text-emerald-400">
                Why Server-Sent Events Are the Agent-Preferred Transport
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              MCP uses{' '}
              <strong className="text-zinc-100">
                Server-Sent Events (SSE)
              </strong>{' '}
              as its primary transport protocol — not WebSocket. This was not an
              arbitrary choice. SSE is HTTP-native, works through every proxy
              and CDN, auto-reconnects on failure, and uses standard HTTP
              authentication. For agent readiness, the transport you choose
              directly impacts your D2 API Quality and D8 Reliability scores.
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
                    11 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHY TRANSPORT MATTERS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-cyan-500" />
              Why Transport Protocol Matters for Agent Readiness
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                When an AI agent connects to your{' '}
                <Link
                  href="/blog/what-is-mcp-server"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  MCP server
                </Link>
                , it needs a persistent channel to receive tool responses, streaming
                results, and progress updates. The transport protocol determines
                how reliable, compatible, and secure that channel is. A protocol
                that drops connections behind corporate proxies, requires custom
                authentication schemes, or needs manual reconnection logic directly
                lowers your agent readiness.
              </p>
              <p>
                The two main contenders are{' '}
                <strong className="text-zinc-100">
                  Server-Sent Events (SSE)
                </strong>{' '}
                and{' '}
                <strong className="text-zinc-100">WebSocket</strong>. Both
                support real-time server-to-client data. But they differ
                fundamentally in how they integrate with HTTP infrastructure, and
                those differences determine how well agents can connect to your
                service in the real world.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                {
                  value: 'SSE',
                  label: 'MCP primary transport',
                  icon: Radio,
                },
                {
                  value: 'HTTP',
                  label: 'native protocol',
                  icon: Globe,
                },
                {
                  value: 'Auto',
                  label: 'reconnect built-in',
                  icon: RefreshCcw,
                },
                {
                  value: '100%',
                  label: 'proxy compatible',
                  icon: Shield,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HEAD TO HEAD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              SSE vs WebSocket: Head-to-Head Comparison
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Eight dimensions where the two transport protocols differ, and
              what each means for agent connectivity.
            </p>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Aspect</div>
                <div>
                  SSE{' '}
                  <span className="text-emerald-400 font-normal">
                    (MCP default)
                  </span>
                </div>
                <div>WebSocket</div>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={row.aspect}
                  className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.aspect}</div>
                  <div className="text-emerald-400 text-xs leading-relaxed">
                    {row.sse}
                  </div>
                  <div className="text-zinc-500 text-xs leading-relaxed">
                    {row.ws}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">
                  Bottom line for agent readiness:
                </strong>{' '}
                SSE wins on six of eight dimensions for agent communication.
                WebSocket&apos;s advantage — full duplex — is unnecessary for the
                MCP request/response pattern. Agents send requests via POST and
                receive responses via SSE. Bidirectional streaming on a single
                connection adds complexity without adding value for this use
                case.
              </p>
            </div>
          </div>
        </section>

        {/* ===== HOW MCP USES SSE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-500" />
              How MCP Uses SSE in Practice
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The{' '}
                <Link
                  href="/blog/build-mcp-server-tutorial"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  MCP protocol
                </Link>{' '}
                uses a split transport model: HTTP POST for agent-to-server
                requests and SSE for server-to-agent responses. This gives you
                the simplicity of REST for sending commands with the real-time
                streaming of SSE for receiving results.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {mcpTransportDetails.map((detail) => {
                const colors = getColorClasses(detail.color)
                return (
                  <div
                    key={detail.name}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <detail.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">
                        {detail.name}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {detail.description}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                This architecture means your MCP server is just an HTTP server
                with one SSE endpoint. No WebSocket upgrade handling, no custom
                protocol parsing, no connection state management beyond what SSE
                handles automatically. Every web framework supports this out of
                the box. Express, Next.js, FastAPI, Go net/http, Ruby on Rails —
                all can serve SSE without additional dependencies.
              </p>
            </div>
          </div>
        </section>

        {/* ===== SCORING IMPACT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              How Transport Choice Affects Your Score
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                AgentHermes checks for SSE support when scanning MCP endpoints.
                The transport protocol impacts three scoring dimensions directly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                {
                  dimension: 'D2 API Quality',
                  weight: '15%',
                  impact:
                    'SSE on MCP endpoints signals agent-native infrastructure. Proper text/event-stream content type, event IDs, and JSON data formatting all contribute to API quality scoring.',
                  color: 'emerald',
                },
                {
                  dimension: 'D8 Reliability',
                  weight: '13%',
                  impact:
                    'Auto-reconnect with Last-Event-ID means agents recover from network interruptions without data loss. This directly improves reliability scoring compared to WebSocket, which requires manual reconnect logic.',
                  color: 'blue',
                },
                {
                  dimension: 'D7 Security',
                  weight: '12%',
                  impact:
                    'Standard HTTP auth headers on every SSE request means existing security infrastructure (API gateways, rate limiters, WAFs) works without modification. WebSocket auth-at-connect-time only creates a larger attack window.',
                  color: 'purple',
                },
              ].map((item) => {
                const colors = getColorClasses(item.color)
                return (
                  <div
                    key={item.dimension}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-bold`}
                      >
                        {item.weight}
                      </span>
                      <h3 className="font-bold text-zinc-100 text-sm">
                        {item.dimension}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {item.impact}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                Combined, these three dimensions represent 40% of the total
                agent readiness score. Choosing SSE for your MCP transport does
                not guarantee a high score — you still need good API design,
                documentation, and agent-native files. But choosing the wrong
                transport creates a reliability and compatibility ceiling that
                caps your score regardless of how good your tools are.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHEN WEBSOCKET STILL MAKES SENSE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Wifi className="h-5 w-5 text-purple-500" />
              When WebSocket Still Makes Sense
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                WebSocket is not wrong — it is wrong for agent communication
                specifically. There are legitimate use cases where WebSocket
                remains the better choice.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: 'Real-time collaboration',
                  detail:
                    'Google Docs, Figma, and multiplayer games need true bidirectional streaming where both client and server push data continuously. SSE cannot handle this pattern efficiently.',
                },
                {
                  title: 'High-frequency data',
                  detail:
                    'Trading platforms, live sports scores, and IoT sensor feeds pushing hundreds of messages per second benefit from the lower overhead of WebSocket binary frames versus SSE text encoding.',
                },
                {
                  title: 'Chat and messaging',
                  detail:
                    'Human-to-human chat applications where both sides type simultaneously benefit from full duplex. The typing indicator and message sending happen in parallel on both directions.',
                },
                {
                  title: 'Binary streaming',
                  detail:
                    'Audio/video streaming, file transfers, and screen sharing need binary data transmission. SSE is text-only (you would need Base64 encoding, adding 33% overhead for binary payloads).',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className="font-bold text-zinc-100 mb-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The pattern is clear: WebSocket wins when humans interact in
                real-time or when binary data flows in both directions. SSE wins
                when machines send requests and receive structured responses —
                which is exactly what AI agents do. Use both where appropriate.
                Just ensure your MCP endpoint uses SSE.
              </p>
            </div>
          </div>
        </section>

        {/* ===== IMPLEMENTING SSE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-emerald-500" />
              Adding SSE Support for Agent Readiness
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                If you already have{' '}
                <Link
                  href="/blog/webhooks-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  webhook infrastructure
                </Link>
                , adding SSE is straightforward. The key requirements for an
                agent-compatible SSE endpoint:
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                {
                  requirement: 'Content-Type: text/event-stream',
                  detail:
                    'The response must set this header. Without it, clients and intermediaries cannot identify the stream as SSE and may buffer or close the connection.',
                  icon: Layers,
                },
                {
                  requirement: 'Event ID on every message',
                  detail:
                    'Each SSE event should include an id: field with a monotonically increasing value. This enables Last-Event-ID reconnection — the single most important reliability feature for agent communication.',
                  icon: CheckCircle2,
                },
                {
                  requirement: 'JSON data payloads',
                  detail:
                    'Each data: line should contain valid JSON that the agent can parse. MCP defines specific JSON-RPC 2.0 message formats for tool calls, resource reads, and error responses.',
                  icon: Code2,
                },
                {
                  requirement: 'Keep-alive comments',
                  detail:
                    'Send SSE comments (lines starting with :) every 15-30 seconds to prevent proxy timeouts. Most HTTP proxies close idle connections after 60 seconds. Keep-alive comments prevent this.',
                  icon: RefreshCcw,
                },
                {
                  requirement: 'CORS headers for browser-based agents',
                  detail:
                    'If agents connect from browser environments, include Access-Control-Allow-Origin and Access-Control-Allow-Headers. SSE uses standard HTTP, so standard CORS configuration applies.',
                  icon: Shield,
                },
              ].map((item) => (
                <div
                  key={item.requirement}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <item.icon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 text-sm mb-1">
                      {item.requirement}
                    </h3>
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
                  title: 'What Is an MCP Server and Why Your Business Needs One',
                  href: '/blog/what-is-mcp-server',
                  tag: 'MCP Explained',
                  tagColor: 'emerald',
                },
                {
                  title: 'How to Build an MCP Server: Step-by-Step Tutorial',
                  href: '/blog/build-mcp-server-tutorial',
                  tag: 'Tutorial',
                  tagColor: 'blue',
                },
                {
                  title: 'Webhooks and Agent Readiness',
                  href: '/blog/webhooks-agent-readiness',
                  tag: 'Technical',
                  tagColor: 'cyan',
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
              Check if your endpoints are agent-ready
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              AgentHermes scans your MCP endpoints for SSE support, proper event
              formatting, and reconnection capability. See your score across all
              9 dimensions in 60 seconds.
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
