import Link from 'next/link'
import { CopyButton } from '@/components/CopyButton'
import {
  Code2,
  Terminal,
  Zap,
  Shield,
  Key,
  Package,
  FileText,
  Gauge,
  ArrowRight,
  ExternalLink,
  Search,
  BarChart3,
  Building2,
  BadgeCheck,
  Wallet,
  Wrench,
  Activity,
  Bell,
  Globe,
  Server,
  BookOpen,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-24" />
}

function SectionHeading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <>
      <SectionAnchor id={id} />
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
        {children}
      </h2>
    </>
  )
}

function CodeBlock({
  language,
  label,
  children,
}: {
  language: string
  label?: string
  children: string
}) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-[#0d1117] overflow-hidden group/code">
      {label && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">
              {language}
            </span>
            <span className="text-[11px] text-zinc-600 font-mono">{label}</span>
          </div>
          <CopyButton text={children} />
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className={`language-${language} text-zinc-300`}>{children}</code>
      </pre>
    </div>
  )
}

function EndpointRow({
  method,
  path,
  description,
  auth,
}: {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  path: string
  description: string
  auth?: boolean
}) {
  const methodColors: Record<string, string> = {
    GET: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    POST: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    PATCH: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    DELETE: 'text-red-400 bg-red-500/10 border-red-500/20',
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 border-b border-zinc-800/40 last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${methodColors[method]} flex-shrink-0`}
        >
          {method}
        </span>
        <code className="text-sm font-mono text-zinc-300 truncate">{path}</code>
        {auth && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold text-zinc-500 bg-zinc-800 border border-zinc-700/50 flex-shrink-0">
            AUTH
          </span>
        )}
      </div>
      <p className="text-xs text-zinc-500 sm:ml-auto sm:text-right flex-shrink-0">
        {description}
      </p>
    </div>
  )
}

function ApiCategory({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 overflow-hidden hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800/80 bg-zinc-900/50">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-200">
          <Icon className="h-4 w-4 text-zinc-300 group-hover:text-emerald-400 transition-colors duration-200" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>
      </div>
      <div className="px-5 py-2">{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Table of Contents                                                  */
/* ------------------------------------------------------------------ */

const tocItems = [
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'mcp', label: 'MCP Integration' },
  { id: 'api-reference', label: 'API Reference' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'sdks', label: 'SDKs' },
  { id: 'discovery-files', label: 'Discovery Files' },
  { id: 'rate-limits', label: 'Rate Limits' },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AgentHermes API",
  "description": "REST API and MCP server for AI agent-to-business discovery, scoring, and transactions. Scan businesses for agent readiness, query the network, and initiate payments programmatically.",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "url": "https://agenthermes.ai/developers",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free tier with unlimited scans, score API, and MCP access. Paid plans available for monitoring, remediation, and enterprise features."
  },
  "featureList": [
    "Agent Readiness Score API",
    "MCP Server with 7 tools",
    "Business discovery and search",
    "Wallet-to-wallet payments",
    ".well-known/agent-hermes.json verification",
    "OpenAPI specification"
  ]
}

export default function DevelopersPage() {
  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
            { '@type': 'ListItem', position: 2, name: 'Developers', item: 'https://agenthermes.ai/developers' },
          ],
        }) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />
        {/* Radial emerald glow behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/[0.07] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <Code2 className="h-3.5 w-3.5" />
              Developer Documentation
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              Build with{' '}
              <span className="text-emerald-500">AgentHermes</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-2xl mx-auto mb-10">
              Integrate the Agent Readiness Score into your agent workflows.
              REST API, MCP server, SDKs, and framework tools.
            </p>

            {/* TOC pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-24 space-y-20">

        {/* ============================================================ */}
        {/*  1. QUICK START                                               */}
        {/* ============================================================ */}
        <section>
          <SectionHeading id="quick-start">
            <Zap className="h-6 w-6 text-emerald-500" />
            Quick Start
          </SectionHeading>
          <p className="text-zinc-400 mb-8 max-w-2xl">
            Get an Agent Readiness Score in three lines. No signup required for public endpoints.
          </p>

          <div className="grid gap-5">
            <CodeBlock language="bash" label="curl -- score any domain instantly">
{`curl -s https://agenthermes.ai/api/v1/score/example.com | jq

# Full 9-dimension scan
curl -s -X POST https://agenthermes.ai/api/v1/scan \\
  -H "Content-Type: application/json" \\
  -d '{"url": "example.com"}'`}
            </CodeBlock>

            <CodeBlock language="typescript" label="TypeScript SDK">
{`import { AgentHermes } from '@agenthermes/sdk'

const hermes = new AgentHermes()

// Quick score lookup
const score = await hermes.score('example.com')
console.log(score.score, score.tier)  // 73 "gold"

// Full 9-dimension scan
const scan = await hermes.scan('example.com')
console.log(scan.dimensions)  // { discoverability: 18, interoperability: 15, ... }

// Discover agent-ready businesses
const results = await hermes.discover({ q: 'payment processing', minScore: 60 })
console.log(results.businesses)`}
            </CodeBlock>

            <CodeBlock language="python" label="Python SDK">
{`from agenthermes import AgentHermes

hermes = AgentHermes()

# Quick score lookup
score = hermes.score("example.com")
print(score.score, score.tier)  # 73 "gold"

# Full 9-dimension scan
scan = hermes.scan("example.com")
print(scan.dimensions)  # {"discoverability": 18, "interoperability": 15, ...}

# Discover agent-ready businesses
results = hermes.discover(q="payment processing", min_score=60)
print(results.businesses)`}
            </CodeBlock>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  2. MCP INTEGRATION                                          */}
        {/* ============================================================ */}
        <section>
          <SectionHeading id="mcp">
            <Server className="h-6 w-6 text-emerald-500" />
            MCP Integration
          </SectionHeading>
          <p className="text-zinc-400 mb-8 max-w-2xl">
            Connect any MCP-compatible AI client (Claude Desktop, Cursor, Windsurf, etc.) to the AgentHermes
            MCP server. Full JSON-RPC 2.0 and SSE transports.
          </p>

          <div className="grid gap-5">
            {/* Endpoints */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 hover:border-emerald-500/30 transition-all duration-200">
              <h3 className="text-sm font-semibold text-zinc-200 mb-4">Endpoints</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border text-blue-400 bg-blue-500/10 border-blue-500/20">
                    POST
                  </span>
                  <code className="text-sm font-mono text-zinc-300">https://agenthermes.ai/api/mcp</code>
                  <span className="text-xs text-zinc-500">JSON-RPC 2.0</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                    GET
                  </span>
                  <code className="text-sm font-mono text-zinc-300">https://agenthermes.ai/api/mcp/sse</code>
                  <span className="text-xs text-zinc-500">Server-Sent Events</span>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 hover:border-emerald-500/30 transition-all duration-200">
              <h3 className="text-sm font-semibold text-zinc-200 mb-4">7 Tools</h3>
              <div className="space-y-2">
                {[
                  { name: 'discover_businesses', desc: 'Search by capability, vertical, tier, or price' },
                  { name: 'get_business_profile', desc: 'Full business profile by slug' },
                  { name: 'get_business_manifest', desc: 'Machine-readable manifest (services, pricing, auth, readiness)' },
                  { name: 'run_audit', desc: 'Trigger Agent Readiness Score audit on a URL' },
                  { name: 'check_wallet_balance', desc: 'Check business wallet balance (auth required)' },
                  { name: 'initiate_payment', desc: 'Wallet-to-wallet payment between businesses (auth required)' },
                  { name: 'verify_hermes_json', desc: 'Verify a .well-known/agent-hermes.json signature and score' },
                ].map((tool) => (
                  <div key={tool.name} className="flex items-start gap-3 py-2 border-b border-zinc-800/40 last:border-0">
                    <code className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex-shrink-0">
                      {tool.name}
                    </code>
                    <span className="text-xs text-zinc-500">{tool.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources & Prompts */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 hover:border-emerald-500/30 transition-all duration-200">
                <h3 className="text-sm font-semibold text-zinc-200 mb-4">4 Resources</h3>
                <div className="space-y-2">
                  {[
                    { uri: 'agenthermes://businesses', desc: 'All businesses in the network' },
                    { uri: 'agenthermes://business/{slug}', desc: 'Individual business profile' },
                    { uri: 'agenthermes://audits/{domain}', desc: 'Audit history for a domain' },
                    { uri: 'agenthermes://services', desc: 'All active services' },
                  ].map((r) => (
                    <div key={r.uri} className="py-1.5">
                      <code className="text-xs font-mono text-zinc-400 block">{r.uri}</code>
                      <span className="text-xs text-zinc-600">{r.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 hover:border-emerald-500/30 transition-all duration-200">
                <h3 className="text-sm font-semibold text-zinc-200 mb-4">3 Prompts</h3>
                <div className="space-y-2">
                  {[
                    { name: 'audit-url', desc: 'Run an Agent Readiness Score audit', args: 'url' },
                    { name: 'find-service', desc: 'Find a service by capability', args: 'query, max_price' },
                    { name: 'check-readiness', desc: 'Check if a business is agent-ready', args: 'domain' },
                  ].map((p) => (
                    <div key={p.name} className="py-1.5">
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono text-blue-400">{p.name}</code>
                        <span className="text-[10px] text-zinc-600 font-mono">({p.args})</span>
                      </div>
                      <span className="text-xs text-zinc-600">{p.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Claude Desktop config */}
            <CodeBlock language="json" label="Claude Desktop config (~/.claude/mcp.json)">
{`{
  "mcpServers": {
    "agenthermes": {
      "url": "https://agenthermes.ai/api/mcp/sse"
    }
  }
}`}
            </CodeBlock>

            <CodeBlock language="json" label="Alternative: Cursor / generic MCP client">
{`{
  "mcpServers": {
    "agenthermes": {
      "transport": "sse",
      "url": "https://agenthermes.ai/api/mcp/sse"
    }
  }
}`}
            </CodeBlock>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  3. API REFERENCE                                            */}
        {/* ============================================================ */}
        <section>
          <SectionHeading id="api-reference">
            <BookOpen className="h-6 w-6 text-emerald-500" />
            API Reference
          </SectionHeading>
          <p className="text-zinc-400 mb-4 max-w-2xl">
            All endpoints live under{' '}
            <code className="text-sm font-mono text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">
              https://agenthermes.ai/api/v1/
            </code>
            . Full OpenAPI 3.0 spec available at{' '}
            <Link href="/openapi.json" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
              /openapi.json
            </Link>
            .
          </p>
          <p className="text-xs text-zinc-600 mb-8">
            Endpoints marked <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold text-zinc-500 bg-zinc-800 border border-zinc-700/50">AUTH</span> require
            a Bearer token or API key in the Authorization header.
          </p>

          <div className="space-y-5">
            {/* Scanning & Scoring */}
            <ApiCategory icon={BarChart3} title="Scanning & Scoring">
              <EndpointRow method="POST" path="/api/v1/scan" description="9-dimension Agent Readiness scan" />
              <EndpointRow method="POST" path="/api/v1/scan/batch" description="Batch scan multiple domains" auth />
              <EndpointRow method="GET" path="/api/v1/score/{domain}" description="Quick score lookup" />
              <EndpointRow method="POST" path="/api/v1/audit" description="Legacy 5-category audit" />
              <EndpointRow method="GET" path="/api/v1/audit/{id}" description="Get audit result by ID" />
            </ApiCategory>

            {/* Discovery */}
            <ApiCategory icon={Search} title="Discovery & Search">
              <EndpointRow method="GET" path="/api/v1/discover" description="Search agent-ready businesses" />
              <EndpointRow method="GET" path="/api/v1/discover/semantic" description="Semantic vector search" />
              <EndpointRow method="GET" path="/api/v1/discover/services" description="Search services across businesses" />
              <EndpointRow method="GET" path="/api/v1/leaderboard" description="Agent readiness leaderboard" />
            </ApiCategory>

            {/* Business Management */}
            <ApiCategory icon={Building2} title="Business Management">
              <EndpointRow method="POST" path="/api/v1/business" description="Register a new business" />
              <EndpointRow method="GET" path="/api/v1/business/{slug}" description="Get business profile" />
              <EndpointRow method="PATCH" path="/api/v1/business/{slug}" description="Update business profile" auth />
              <EndpointRow method="GET" path="/api/v1/business/{slug}/manifest" description="Machine-readable manifest" />
              <EndpointRow method="GET" path="/api/v1/business/{slug}/services" description="List services" />
              <EndpointRow method="POST" path="/api/v1/business/{slug}/services" description="Register a service" auth />
              <EndpointRow method="PATCH" path="/api/v1/business/{slug}/services" description="Update a service" auth />
              <EndpointRow method="DELETE" path="/api/v1/business/{slug}/services" description="Remove a service" auth />
              <EndpointRow method="POST" path="/api/v1/business/{slug}/api-keys" description="Generate API key" auth />
              <EndpointRow method="GET" path="/api/v1/business/{slug}/api-keys" description="List API keys" auth />
              <EndpointRow method="DELETE" path="/api/v1/business/{slug}/api-keys" description="Revoke API key" auth />
              <EndpointRow method="POST" path="/api/v1/business/{slug}/connect" description="Stripe Connect onboarding" auth />
            </ApiCategory>

            {/* Trust & Certification */}
            <ApiCategory icon={BadgeCheck} title="Trust & Certification">
              <EndpointRow method="GET" path="/api/v1/trust-score/{slug}" description="Composite trust score breakdown" />
              <EndpointRow method="POST" path="/api/v1/certify" description="Certify a business" auth />
              <EndpointRow method="GET" path="/api/v1/certify" description="Get certification status" />
              <EndpointRow method="GET" path="/api/v1/certify/badge/{slug}" description="SVG certification badge" />
              <EndpointRow method="GET" path="/api/v1/benchmarks" description="Industry benchmarks by vertical" />
              <EndpointRow method="GET" path="/api/v1/benchmarks/compare" description="Compare against benchmarks" />
              <EndpointRow method="POST" path="/api/v1/hermes-json" description="Generate signed hermes.json" auth />
              <EndpointRow method="POST" path="/api/v1/hermes-json/verify" description="Verify hermes.json signature" />
            </ApiCategory>

            {/* Wallet & Payments */}
            <ApiCategory icon={Wallet} title="Wallet & Payments">
              <EndpointRow method="GET" path="/api/v1/wallet" description="Get wallet balance" auth />
              <EndpointRow method="POST" path="/api/v1/wallet/fund" description="Add funds to wallet" auth />
              <EndpointRow method="POST" path="/api/v1/wallet/transfer" description="Wallet-to-wallet transfer" auth />
              <EndpointRow method="GET" path="/api/v1/wallet/transactions" description="Transaction history" auth />
            </ApiCategory>

            {/* Remediation */}
            <ApiCategory icon={Wrench} title="Remediation (Auto-fix Generators)">
              <EndpointRow method="POST" path="/api/v1/remediate/llms-txt" description="Generate llms.txt for a domain" />
              <EndpointRow method="POST" path="/api/v1/remediate/agent-card" description="Generate A2A agent card" />
              <EndpointRow method="POST" path="/api/v1/remediate/schema-org" description="Generate Schema.org JSON-LD" />
              <EndpointRow method="POST" path="/api/v1/remediate/mcp-proxy" description="Generate MCP proxy config" />
              <EndpointRow method="POST" path="/api/v1/remediate/openapi-to-mcp" description="Convert OpenAPI to MCP tools" />
            </ApiCategory>

            {/* Health & Monitoring */}
            <ApiCategory icon={Activity} title="Health & Monitoring">
              <EndpointRow method="POST" path="/api/v1/health/check" description="Trigger endpoint health check" auth />
              <EndpointRow method="GET" path="/api/v1/health/status" description="Health status for a business" />
              <EndpointRow method="POST" path="/api/v1/monitoring" description="Trigger monitoring cycle" auth />
              <EndpointRow method="GET" path="/api/v1/monitoring" description="List monitoring events" auth />
              <EndpointRow method="GET" path="/api/v1/monitoring/events" description="Filtered event log" auth />
              <EndpointRow method="POST" path="/api/v1/mystery-shop" description="Trigger mystery shop" auth />
              <EndpointRow method="GET" path="/api/v1/mystery-shop" description="Mystery shop history" auth />
            </ApiCategory>

            {/* Webhooks */}
            <ApiCategory icon={Bell} title="Webhooks">
              <EndpointRow method="POST" path="/api/v1/webhooks/subscribe" description="Subscribe to events" auth />
              <EndpointRow method="GET" path="/api/v1/webhooks/subscribe" description="List subscriptions" auth />
              <EndpointRow method="DELETE" path="/api/v1/webhooks/subscribe" description="Unsubscribe" auth />
            </ApiCategory>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  4. AUTHENTICATION                                           */}
        {/* ============================================================ */}
        <section>
          <SectionHeading id="authentication">
            <Key className="h-6 w-6 text-emerald-500" />
            Authentication
          </SectionHeading>
          <p className="text-zinc-400 mb-6 max-w-2xl">
            Public endpoints (score lookup, discovery, audits) require no authentication.
            Business management, wallet, webhook, and monitoring endpoints require a Bearer token.
          </p>

          <div className="grid gap-5">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 hover:border-emerald-500/30 transition-all duration-200">
              <h3 className="text-sm font-semibold text-zinc-200 mb-3">How it works</h3>
              <ol className="space-y-3 text-sm text-zinc-400">
                <li className="flex gap-3">
                  <span className="text-emerald-500 font-mono font-bold flex-shrink-0">1.</span>
                  <span>
                    <strong className="text-zinc-200">Register your business</strong> via{' '}
                    <code className="text-xs font-mono text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">POST /api/v1/business</code>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 font-mono font-bold flex-shrink-0">2.</span>
                  <span>
                    <strong className="text-zinc-200">Generate an API key</strong> via{' '}
                    <code className="text-xs font-mono text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">POST /api/v1/business/{'{slug}'}/api-keys</code>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500 font-mono font-bold flex-shrink-0">3.</span>
                  <span>
                    <strong className="text-zinc-200">Pass the key as a Bearer token</strong> in every authenticated request
                  </span>
                </li>
              </ol>
            </div>

            <CodeBlock language="bash" label="Authenticated request example">
{`curl -s https://agenthermes.ai/api/v1/wallet?business_id=YOUR_ID \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Or via X-API-Key header
curl -s https://agenthermes.ai/api/v1/wallet?business_id=YOUR_ID \\
  -H "X-API-Key: YOUR_API_KEY"`}
            </CodeBlock>

            <CodeBlock language="typescript" label="SDK authentication">
{`import { AgentHermes } from '@agenthermes/sdk'

const hermes = new AgentHermes({
  apiKey: process.env.AGENTHERMES_API_KEY,
})

// Authenticated endpoints now work
const wallet = await hermes.wallet.balance()
const keys = await hermes.apiKeys.list()`}
            </CodeBlock>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  5. SDKs                                                     */}
        {/* ============================================================ */}
        <section>
          <SectionHeading id="sdks">
            <Package className="h-6 w-6 text-emerald-500" />
            SDKs &amp; Framework Tools
          </SectionHeading>
          <p className="text-zinc-400 mb-8 max-w-2xl">
            Official SDKs for TypeScript and Python, plus pre-built tools for LangChain and CrewAI.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* TypeScript */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Terminal className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">TypeScript / Node.js</h3>
                  <p className="text-xs text-zinc-500">npm / pnpm / yarn / bun</p>
                </div>
              </div>
              <CodeBlock language="bash" label="Install">
{`npm install @agenthermes/sdk`}
              </CodeBlock>
            </div>

            {/* Python */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <Terminal className="h-4 w-4 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">Python</h3>
                  <p className="text-xs text-zinc-500">pip / uv / poetry</p>
                </div>
              </div>
              <CodeBlock language="bash" label="Install">
{`pip install agenthermes`}
              </CodeBlock>
            </div>

            {/* LangChain */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Globe className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">LangChain Tools</h3>
                  <p className="text-xs text-zinc-500">Drop-in LangChain tool wrappers</p>
                </div>
              </div>
              <CodeBlock language="python" label="Usage">
{`from agenthermes.langchain import (
    AgentHermesScoreTool,
    AgentHermesDiscoverTool,
)

tools = [AgentHermesScoreTool(), AgentHermesDiscoverTool()]
agent = initialize_agent(tools, llm)`}
              </CodeBlock>
            </div>

            {/* CrewAI */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Globe className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">CrewAI Tools</h3>
                  <p className="text-xs text-zinc-500">CrewAI-compatible tool wrappers</p>
                </div>
              </div>
              <CodeBlock language="python" label="Usage">
{`from agenthermes.crewai import (
    AgentHermesScoreTool,
    AgentHermesDiscoverTool,
)

researcher = Agent(
    role="Business Researcher",
    tools=[AgentHermesScoreTool(), AgentHermesDiscoverTool()],
)`}
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  6. DISCOVERY FILES                                          */}
        {/* ============================================================ */}
        <section>
          <SectionHeading id="discovery-files">
            <FileText className="h-6 w-6 text-emerald-500" />
            Discovery Files
          </SectionHeading>
          <p className="text-zinc-400 mb-8 max-w-2xl">
            AgentHermes publishes standard machine-readable discovery files so AI agents
            can find and understand the platform without human intervention.
          </p>

          <div className="grid gap-3">
            {[
              {
                path: '/llms.txt',
                label: 'llms.txt',
                description: 'Full platform description, all endpoints, MCP tools, and integration instructions in plain text',
              },
              {
                path: '/openapi.json',
                label: 'openapi.json',
                description: 'Complete OpenAPI 3.0 specification with schemas, examples, and auth requirements',
              },
              {
                path: '/.well-known/agent-card.json',
                label: '.well-known/agent-card.json',
                description: 'A2A Protocol agent card -- capabilities, skills, authentication, and endpoints',
              },
              {
                path: '/.well-known/mcp.json',
                label: '.well-known/mcp.json',
                description: 'MCP server discovery file -- tools, resources, prompts, and transport config',
              },
            ].map((file) => (
              <Link
                key={file.path}
                href={file.path}
                className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:border-emerald-500/30 hover:bg-zinc-900/50 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex-shrink-0">
                  <FileText className="h-5 w-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono text-zinc-200 font-semibold">{file.label}</code>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">{file.description}</p>
                </div>
                <code className="text-xs font-mono text-zinc-600 hidden lg:block flex-shrink-0">
                  agenthermes.ai{file.path}
                </code>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  7. RATE LIMITS                                              */}
        {/* ============================================================ */}
        <section>
          <SectionHeading id="rate-limits">
            <Gauge className="h-6 w-6 text-emerald-500" />
            Rate Limits
          </SectionHeading>
          <p className="text-zinc-400 mb-8 max-w-2xl">
            Rate limits are per-IP and reset on a sliding window. Every response includes{' '}
            <code className="text-xs font-mono text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">X-RateLimit-*</code>{' '}
            headers.
          </p>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 overflow-hidden hover:border-emerald-500/30 transition-all duration-200">
            <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 border-b border-zinc-800/80 bg-zinc-900/60">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Endpoint</span>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Limit</span>
            </div>
            <div className="divide-y divide-zinc-800/40">
              {[
                { endpoint: 'POST /api/v1/scan', limit: '5 / minute' },
                { endpoint: 'POST /api/v1/scan/batch', limit: '1 / minute' },
                { endpoint: 'POST /api/v1/audit', limit: '5 / minute' },
                { endpoint: 'GET /api/v1/score/{domain}', limit: '30 / minute' },
                { endpoint: 'GET /api/v1/discover', limit: '30 / minute' },
                { endpoint: 'GET /api/v1/leaderboard', limit: '30 / minute' },
                { endpoint: 'POST /api/v1/monitoring', limit: '1 / 5 minutes' },
                { endpoint: 'POST /api/v1/mystery-shop', limit: '3 / minute' },
                { endpoint: 'POST /api/v1/health/check', limit: '10 / minute' },
                { endpoint: 'All other endpoints', limit: '30 / minute' },
              ].map((row) => (
                <div key={row.endpoint} className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 items-center">
                  <code className="text-sm font-mono text-zinc-300">{row.endpoint}</code>
                  <span className="text-sm text-zinc-400 font-mono">{row.limit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 hover:border-emerald-500/30 transition-all duration-200">
            <h3 className="text-sm font-semibold text-zinc-200 mb-3">Response Headers</h3>
            <div className="space-y-2 text-sm">
              {[
                { header: 'X-RateLimit-Limit', desc: 'Maximum requests allowed in the window' },
                { header: 'X-RateLimit-Remaining', desc: 'Requests remaining in the current window' },
                { header: 'X-RateLimit-Reset', desc: 'Unix timestamp when the window resets' },
                { header: 'Retry-After', desc: 'Seconds to wait before retrying (only on 429)' },
              ].map((h) => (
                <div key={h.header} className="flex items-start gap-3">
                  <code className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex-shrink-0">
                    {h.header}
                  </code>
                  <span className="text-xs text-zinc-500">{h.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  Bottom CTA                                                  */}
        {/* ============================================================ */}
        <section className="pt-8 border-t border-zinc-800/50">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Ready to integrate?
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8 max-w-lg mx-auto">
              Start with a free score lookup. No API key required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-6 py-3 shadow-lg shadow-emerald-500/10 font-semibold transition-all duration-200"
              >
                Try the Scanner
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/openapi.json"
                className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white rounded-lg px-6 py-3 font-semibold transition-all duration-200"
              >
                <FileText className="h-4 w-4" />
                OpenAPI Spec
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white rounded-lg px-6 py-3 font-semibold transition-all duration-200"
              >
                <Shield className="h-4 w-4" />
                Register Your Business
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
