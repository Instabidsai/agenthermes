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
  Globe,
  HelpCircle,
  Key,
  Layers,
  Lock,
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
  title: 'Multi-Tenant SaaS and Agent Readiness: Why Per-Tenant API Keys Matter | AgentHermes',
  description:
    'Multi-tenant SaaS platforms serve hundreds of businesses but most treat API access as platform-level. Agent-ready SaaS needs per-tenant OAuth, tenant-specific webhooks, and isolated rate limits.',
  keywords: [
    'multi-tenant SaaS agent readiness',
    'per-tenant API keys',
    'SaaS agent readiness',
    'tenant-specific webhooks',
    'multi-tenant OAuth',
    'SaaS MCP server',
    'agent economy SaaS',
    'Stripe Connected Accounts model',
    'per-tenant rate limiting',
  ],
  openGraph: {
    title: 'Multi-Tenant SaaS and Agent Readiness: Why Per-Tenant API Keys Matter',
    description:
      'SaaS platforms serve multiple tenants but treat API as platform-level. Agent-ready SaaS needs per-tenant OAuth, isolated limits, and tenant-specific webhooks.',
    url: 'https://agenthermes.ai/blog/multi-tenant-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Multi-Tenant SaaS and Agent Readiness: Why Per-Tenant API Keys Matter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multi-Tenant SaaS and Agent Readiness: Why Per-Tenant API Keys Matter',
    description:
      'Most SaaS platforms treat their API as platform-level. But AI agents act on behalf of individual tenants. Here is why per-tenant API keys change everything.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/multi-tenant-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const tenantModels = [
  {
    name: 'Platform-Level API (Most SaaS)',
    description: 'One API key per account. All tenants share the same rate limits, webhook URL, and permission scope. An agent acting for Tenant A has the same access as one acting for Tenant B.',
    agentImpact: 'Agents cannot scope actions to a single tenant without custom middleware. Cross-tenant data leakage risk.',
    score: 'D7 Security: 40-55',
    color: 'red',
    icon: Lock,
  },
  {
    name: 'Per-Tenant API Keys (Stripe Model)',
    description: 'Each tenant gets its own API key (Connected Accounts, restricted keys). Rate limits, webhooks, and permissions are scoped per tenant. Stripe pioneered this with Connect.',
    agentImpact: 'Agents receive a tenant-scoped key and can only access that tenant\'s data. Zero cross-tenant risk. Clean audit trail.',
    score: 'D7 Security: 75-85',
    color: 'emerald',
    icon: Key,
  },
  {
    name: 'Per-Tenant OAuth (Gold Standard)',
    description: 'Full OAuth 2.0 with tenant-specific scopes, refresh tokens, and consent flows. The tenant owner approves what the agent can access. Revocation is per-agent, per-tenant.',
    agentImpact: 'Agents get least-privilege access with explicit tenant consent. The most agent-ready model. Stripe, Shopify, and Slack implement this.',
    score: 'D7 Security: 80-90',
    color: 'emerald',
    icon: Shield,
  },
]

const comparisonRows = [
  { aspect: 'API Key Scope', platformLevel: 'One key for all tenants', perTenant: 'Unique key per tenant' },
  { aspect: 'Rate Limits', platformLevel: 'Shared across all tenants', perTenant: 'Isolated per tenant' },
  { aspect: 'Webhooks', platformLevel: 'Single URL receives all events', perTenant: 'Tenant-specific webhook URLs' },
  { aspect: 'Permissions', platformLevel: 'Same access for every agent', perTenant: 'Scoped to tenant data only' },
  { aspect: 'Audit Trail', platformLevel: '"An agent called the API"', perTenant: '"Agent X accessed Tenant Y\'s data"' },
  { aspect: 'Revocation', platformLevel: 'Kill all agents or none', perTenant: 'Revoke per-agent, per-tenant' },
]

const saasExamples = [
  {
    name: 'Stripe',
    model: 'Connected Accounts + Restricted Keys',
    score: '68 Silver',
    detail: 'Each Connected Account gets isolated API keys, webhooks, and rate limits. Agents manage one merchant without touching others. The gold standard for multi-tenant agent readiness.',
    color: 'emerald',
  },
  {
    name: 'Shopify',
    model: 'Per-Store API Credentials + OAuth',
    score: '65 Silver',
    detail: 'Each Shopify store is an isolated tenant with its own API credentials, webhook subscriptions, and OAuth scopes. Agents manage inventory for one store without seeing another.',
    color: 'emerald',
  },
  {
    name: 'HubSpot',
    model: 'Portal-Level OAuth',
    score: '55 Bronze',
    detail: 'OAuth per portal (tenant), but some API endpoints return data across portals for super-admin tokens. Rate limits shared across the account. Getting better but not fully isolated.',
    color: 'amber',
  },
  {
    name: 'Most Vertical SaaS',
    model: 'Single API Key, No Tenant Isolation',
    score: '20-35 Not Scored',
    detail: 'Practice management, property management, and other vertical SaaS typically offer one API key for the entire platform. No way for an agent to scope actions to a single tenant.',
    color: 'red',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why can\'t agents just use the platform-level API with tenant ID filtering?',
    answer:
      'They technically can, but it creates a security and trust problem. If an agent has a platform-level key, it has theoretical access to all tenant data. Any bug in the agent, any prompt injection, any misconfigured scope could leak Tenant A\'s data to Tenant B\'s agent. Per-tenant keys make this architecturally impossible — the key simply cannot access other tenants\' data.',
  },
  {
    question: 'What is the difference between per-tenant API keys and per-tenant OAuth?',
    answer:
      'Per-tenant API keys are static credentials issued to each tenant. Per-tenant OAuth adds a consent layer — the tenant owner explicitly approves what the agent can access, can revoke access at any time, and the token expires and refreshes automatically. OAuth is more agent-ready because it aligns with how agents will authenticate: request access, get scoped token, operate within limits, refresh as needed.',
  },
  {
    question: 'Does Stripe really do this well?',
    answer:
      'Stripe\'s Connected Accounts model is the reference implementation for multi-tenant agent readiness. Each merchant (tenant) has isolated API keys, webhook endpoints, rate limits, and data access. An agent managing payments for one store cannot see transactions from another store. AgentHermes scores Stripe at 68 Silver — the highest in payments — largely because of this architecture.',
  },
  {
    question: 'My SaaS has 500 tenants. Do I need 500 MCP servers?',
    answer:
      'No. You need one MCP server that accepts tenant-scoped authentication. When an agent connects, it authenticates with a tenant-specific token. The MCP server routes all tool calls to that tenant\'s data. Think of it like one web application that serves 500 businesses — same server, different data based on who is logged in. The MCP server just needs to enforce tenant isolation in every tool.',
  },
  {
    question: 'How does this affect my Agent Readiness Score?',
    answer:
      'Per-tenant API isolation directly impacts D7 Security (0.12 weight), D2 API Quality (0.15 weight), and D3 Onboarding (0.08 weight). A SaaS platform with per-tenant OAuth, scoped webhooks, and isolated rate limits will score 15-25 points higher than one with a single platform-level API key. The difference between Bronze and Silver for most SaaS platforms is tenant isolation.',
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

export default function MultiTenantAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Multi-Tenant SaaS and Agent Readiness: Why Per-Tenant API Keys Matter',
    description:
      'Multi-tenant SaaS platforms serve hundreds of businesses but most treat API access as platform-level. Agent-ready SaaS needs per-tenant OAuth, tenant-specific webhooks, and isolated rate limits.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/multi-tenant-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Technical Guide',
    wordCount: 1900,
    keywords:
      'multi-tenant SaaS agent readiness, per-tenant API keys, tenant OAuth, Stripe Connected Accounts, agent economy SaaS',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Multi-Tenant SaaS Agent Readiness',
          item: 'https://agenthermes.ai/blog/multi-tenant-agent-readiness',
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
      title="Multi-Tenant SaaS and Agent Readiness: Why Per-Tenant API Keys Matter"
      shareUrl="https://agenthermes.ai/blog/multi-tenant-agent-readiness"
      currentHref="/blog/multi-tenant-agent-readiness"
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
            <span className="text-zinc-400">Multi-Tenant SaaS Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Layers className="h-3.5 w-3.5" />
              Technical Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              SaaS Architecture
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Multi-Tenant SaaS and Agent Readiness:{' '}
            <span className="text-emerald-400">Why Per-Tenant API Keys Matter</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            SaaS platforms serve hundreds of businesses through a single application. But when AI
            agents act on behalf of individual tenants, <strong className="text-zinc-100">platform-level
            API keys are a security nightmare</strong>. Stripe solved this with Connected Accounts.
            Most SaaS has not. The gap between platform-level and per-tenant API access is the
            difference between Bronze and Silver on the Agent Readiness Score.
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

      {/* ===== THE MULTI-TENANT PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-amber-500" />
            The Multi-Tenant Problem: One API Key, Many Businesses
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Most SaaS platforms were built before the agent economy existed. Their API was designed
              for internal integrations and a handful of partner applications. One API key per account.
              One set of rate limits. One webhook URL. This worked when the caller was a known
              integration partner operating across the entire platform.
            </p>
            <p>
              AI agents change this model fundamentally. An agent does not operate on behalf of the
              platform — it operates on behalf of a specific tenant. When a restaurant owner asks their
              AI assistant to &ldquo;update today&apos;s specials on my POS system,&rdquo; the agent needs
              access to <em>that restaurant&apos;s</em> data, not the entire POS platform. But if the
              POS system only issues platform-level API keys, the agent either gets access to all
              restaurants or none.
            </p>
            <p>
              This is not a hypothetical problem. It is the core architectural decision that determines
              whether a SaaS platform scores 35 (Not Scored) or 65 (Silver) on the Agent Readiness
              Score. The difference is <strong className="text-zinc-100">tenant isolation at the API
              layer</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '73%', label: 'SaaS with platform-level API only', icon: Lock },
              { value: '18%', label: 'with per-tenant keys', icon: Key },
              { value: '9%', label: 'with per-tenant OAuth', icon: Shield },
              { value: '25pts', label: 'score gap between models', icon: BarChart3 },
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

      {/* ===== THREE MODELS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Three Models of Tenant API Access
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            SaaS platforms fall into three categories based on how they handle API access for
            individual tenants. Each model has a direct impact on agent readiness scoring.
          </p>

          <div className="space-y-4 mb-8">
            {tenantModels.map((model) => {
              const colors = getColorClasses(model.color)
              return (
                <div
                  key={model.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <model.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{model.name}</h3>
                      <p className="text-xs text-zinc-500">{model.score}</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{model.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className={`${colors.text} font-medium`}>Agent impact:</span>{' '}
                      {model.agentImpact}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Platform-Level vs Per-Tenant: A Side-by-Side Comparison
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every aspect of API access changes when you move from platform-level to per-tenant
            isolation. Here is what agents experience with each model.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div>Platform-Level API</div>
              <div>Per-Tenant API</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.platformLevel}</div>
                <div className="text-emerald-400">{row.perTenant}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The critical difference is <strong className="text-zinc-100">blast radius</strong>.
              With a platform-level API key, any agent misconfiguration or security incident
              affects every tenant. With per-tenant keys, the blast radius is limited to one
              business. In the agent economy, where thousands of agents will be calling your API
              simultaneously, this is not a nice-to-have — it is a fundamental security requirement.
            </p>
          </div>
        </div>
      </section>

      {/* ===== REAL-WORLD EXAMPLES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-500" />
            How Leading SaaS Platforms Handle Tenant Isolation
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The highest-scoring SaaS platforms on AgentHermes all implement some form of per-tenant
            API isolation. Here is how they do it and where they fall short.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {saasExamples.map((example) => {
              const colors = getColorClasses(example.color)
              return (
                <div
                  key={example.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-zinc-100">{example.name}</h3>
                    <span className={`text-sm font-bold ${colors.text}`}>{example.score}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-3 font-medium">{example.model}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{example.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Notice the pattern: the SaaS platforms that score highest are the ones that already
              serve a multi-sided marketplace. Stripe has merchants and customers. Shopify has store
              owners and buyers. They were forced to build tenant isolation early because their
              business model required it. Vertical SaaS platforms that serve a single user type
              — practice management for dentists, property management for landlords — never had
              this pressure and now face a significant retrofit.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AGENT-READY SAAS ARCHITECTURE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            The Agent-Ready SaaS Architecture
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              An agent-ready multi-tenant SaaS platform implements four capabilities at the
              tenant level:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Per-Tenant OAuth with Scoped Permissions',
                detail: 'Each tenant owner can approve or deny agent access independently. Scopes are granular: read:products, write:orders, read:analytics. The tenant controls what the agent can see and do.',
                icon: Shield,
              },
              {
                step: '2',
                title: 'Tenant-Specific Webhook Endpoints',
                detail: 'Events are delivered to tenant-specific URLs, not a single platform webhook. When Tenant A gets a new order, only Tenant A\'s agent is notified — not every agent connected to the platform.',
                icon: Zap,
              },
              {
                step: '3',
                title: 'Isolated Rate Limits',
                detail: 'One tenant\'s agent cannot exhaust the API quota for another tenant. Each tenant has independent rate limits. If Tenant A\'s agent makes 10,000 calls, Tenant B is unaffected.',
                icon: Target,
              },
              {
                step: '4',
                title: 'Tenant-Scoped MCP Server',
                detail: 'The MCP server accepts tenant authentication and dynamically scopes all tools to that tenant\'s data. One server, many tenants, complete isolation. Every tool call is audited per-tenant.',
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
                    <h3 className="font-bold text-zinc-100 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The Stripe reference:</strong> Stripe&apos;s
              Connected Accounts model is the closest existing implementation of agent-ready
              multi-tenant architecture. Each Connected Account has its own API keys, webhook
              endpoints, and rate limits. If you are building a SaaS platform, study the{' '}
              <Link href="/blog/saas-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                SaaS agent readiness guide
              </Link>{' '}
              and use Stripe Connect as your reference architecture for tenant isolation.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORING IMPACT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Score Impact: The 25-Point Tenant Isolation Gap
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes scoring directly rewards tenant isolation across three dimensions.
              D7 Security (0.12 weight) checks for{' '}
              <Link href="/blog/oauth-for-agents-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                OAuth implementation
              </Link>{' '}
              and scoped API access. D2 API Quality (0.15 weight) rewards APIs that accept
              tenant-scoped authentication. D3 Onboarding (0.08 weight) checks whether a
              new tenant can provision API access without contacting sales.
            </p>
            <p>
              In practice, the gap between platform-level and per-tenant API access is approximately
              25 points on the Agent Readiness Score. A SaaS platform with per-tenant OAuth, scoped
              webhooks, and isolated rate limits will consistently score in the 55-70 range (Silver).
              The same platform with only a platform-level API key will score 30-45 (Bronze or lower).
            </p>
            <p>
              This gap will widen as more AI agents enter the market. Agent developers will
              preferentially integrate with SaaS platforms that offer per-tenant authentication
              because it reduces their liability, simplifies their permission model, and makes
              tenant onboarding self-service. If your SaaS platform forces agents to use a
              platform-level key, agent developers will build for your competitor that offers
              per-tenant OAuth.
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
                title: 'SaaS Agent Readiness: From Bronze to Gold',
                href: '/blog/saas-agent-readiness',
                tag: 'Technical Guide',
                tagColor: 'purple',
              },
              {
                title: 'OAuth for Agents: The Complete Guide',
                href: '/blog/oauth-for-agents-guide',
                tag: 'Standards Guide',
                tagColor: 'emerald',
              },
              {
                title: 'Get Your Agent Readiness Score',
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
            How agent-ready is your SaaS platform?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your Agent Readiness Score in 60 seconds. See how your platform scores on tenant
            isolation, API quality, and all 9 dimensions.
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
              Connect My Platform
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
