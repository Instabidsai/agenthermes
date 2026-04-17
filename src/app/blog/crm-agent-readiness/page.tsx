import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Crown,
  DollarSign,
  Globe,
  HelpCircle,
  KeyRound,
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
  title: 'CRM Agent Readiness: Why Salesforce Scores Higher Than HubSpot (And Both Miss Gold) | AgentHermes',
  description:
    'CRM platforms are natural agent targets. Salesforce scores around 60 Silver with REST, SOQL, and OAuth. HubSpot around 55 Bronze with a more restricted free tier. Both miss Gold: no agent-card.json, no MCP server.',
  keywords: [
    'CRM agent readiness',
    'Salesforce agent readiness',
    'HubSpot agent readiness',
    'CRM AI agents',
    'Salesforce API score',
    'HubSpot API score',
    'CRM MCP server',
    'lead management AI agent',
    'CRM automation agents',
  ],
  openGraph: {
    title: 'CRM Agent Readiness: Why Salesforce Scores Higher Than HubSpot',
    description:
      'CRM platforms are natural agent targets for lead management and follow-ups. Salesforce ~60 Silver. HubSpot ~55 Bronze. Both miss Gold. Here is what would push them over.',
    url: 'https://agenthermes.ai/blog/crm-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CRM Agent Readiness: Salesforce vs HubSpot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRM Agent Readiness: Salesforce vs HubSpot',
    description:
      'Both CRMs have APIs. Neither has an MCP server. Agents managing leads prefer structured, direct tool access.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/crm-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const dimensionComparison = [
  { dimension: 'D1 Discovery (0.12)', salesforce: '72', hubspot: '65', notes: 'Both have developer portals. Salesforce has more structured sitemap coverage.' },
  { dimension: 'D2 API Quality (0.15)', salesforce: '82', hubspot: '74', notes: 'Salesforce: REST + SOQL + Bulk + Streaming. HubSpot: REST only, well-documented.' },
  { dimension: 'D3 Onboarding (0.08)', salesforce: '45', hubspot: '62', notes: 'HubSpot wins: free API key in minutes. Salesforce: connected app setup, OAuth mandatory.' },
  { dimension: 'D4 Pricing (0.05)', salesforce: '30', hubspot: '50', notes: 'Salesforce: "contact sales" for enterprise. HubSpot: transparent tier pricing.' },
  { dimension: 'D5 Payment (0.08)', salesforce: '35', hubspot: '40', notes: 'Neither has self-service API billing. Both require sales-mediated contracts.' },
  { dimension: 'D6 Data Quality (0.10)', salesforce: '75', hubspot: '68', notes: 'Salesforce SOQL returns typed, structured data. HubSpot JSON is clean but less typed.' },
  { dimension: 'D7 Security (0.12)', salesforce: '80', hubspot: '70', notes: 'Salesforce: OAuth 2.0, IP allowlist, field-level security, audit trail. HubSpot: OAuth + API keys.' },
  { dimension: 'D8 Reliability (0.13)', salesforce: '70', hubspot: '65', notes: 'Both have status pages. Salesforce: trust.salesforce.com. HubSpot: status.hubspot.com.' },
  { dimension: 'D9 Agent Exp (0.10)', salesforce: '40', hubspot: '35', notes: 'Neither has agent-card.json, llms.txt, or MCP server. Major gap for both.' },
]

const agentUseCases = [
  { useCase: 'Lead qualification', description: 'Agent scores incoming leads based on firmographic data, engagement signals, and ICP match. Updates lead status and routes to the right rep automatically.', icon: Target, color: 'emerald' },
  { useCase: 'Contact enrichment', description: 'Agent queries Clearbit, Apollo, or LinkedIn data to fill in missing fields — title, company size, revenue, tech stack — then updates the CRM record.', icon: Users, color: 'blue' },
  { useCase: 'Follow-up automation', description: 'Agent monitors deal stages and triggers personalized follow-up emails, meeting requests, or task assignments based on pipeline position and engagement.', icon: Calendar, color: 'purple' },
  { useCase: 'Pipeline reporting', description: 'Agent generates real-time pipeline reports — by rep, by stage, by vertical — without anyone building a dashboard. Natural language query to structured data.', icon: BarChart3, color: 'amber' },
  { useCase: 'Data hygiene', description: 'Agent scans for duplicates, stale records, missing fields, and inconsistent formatting. Merges duplicates, archives dead leads, normalizes data.', icon: Shield, color: 'cyan' },
]

const goldRequirements = [
  { requirement: 'agent-card.json', points: '~3 pts', status: 'Missing from both', difficulty: '30 minutes', description: 'A2A discovery file at /.well-known/agent-card.json. Tells agents what CRM capabilities are available.' },
  { requirement: 'llms.txt', points: '~2 pts', status: 'Missing from both', difficulty: '15 minutes', description: 'Markdown file at /llms.txt summarizing API capabilities, auth flow, and key endpoints for LLM consumption.' },
  { requirement: 'MCP server', points: '~5 pts', status: 'Missing from both', difficulty: '2-4 weeks', description: 'Tools like create_lead(), update_deal(), search_contacts(), get_pipeline(). The biggest missing piece.' },
  { requirement: 'Structured pricing API', points: '~2 pts', status: 'HubSpot partial', difficulty: '1 week', description: 'GET /api/pricing returns tier data in JSON. Salesforce has zero public pricing. HubSpot shows tiers on website.' },
  { requirement: 'Self-service API billing', points: '~2 pts', status: 'Missing from both', difficulty: 'Product decision', description: 'Agent signs up, gets API key, usage is metered and billed automatically. No sales call required.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why are CRMs natural targets for AI agents?',
    answer:
      'CRMs are the system of record for customer relationships. AI agents managing sales, support, and marketing need to read and write CRM data constantly — qualifying leads, updating deal stages, logging interactions, generating reports. A CRM without agent access is a CRM that requires humans to manually bridge every AI workflow.',
  },
  {
    question: 'Why does Salesforce score higher than HubSpot for agent readiness?',
    answer:
      'Salesforce wins on API depth and security. Its REST API plus SOQL query language plus Bulk API plus Streaming API give agents more ways to interact with data efficiently. OAuth 2.0 with fine-grained scopes, field-level security, and IP allowlisting make it more predictable for agent auth flows. HubSpot wins on onboarding — getting an API key is faster and the free tier is more generous — but loses on API power and security granularity.',
  },
  {
    question: 'What would a CRM MCP server look like?',
    answer:
      'Five core tools: create_lead(name, email, company, source), update_deal(deal_id, stage, amount, close_date), search_contacts(query, filters), get_pipeline(filters, sort), and log_activity(contact_id, type, notes). Resources: CRM schema, field definitions, pipeline stages. Prompts: lead qualification workflow, pipeline review workflow. This turns the CRM from an API agents call into a tool agents use natively.',
  },
  {
    question: 'Should my company wait for Salesforce or HubSpot to build this?',
    answer:
      'No. Enterprise CRM vendors move slowly on agent infrastructure because their business model depends on per-seat licensing, not per-API-call pricing. The agent economy threatens seat-based pricing. Meanwhile, your agents need CRM access now. Use the existing APIs through middleware or an MCP adapter that wraps Salesforce/HubSpot APIs in MCP tools. AgentHermes can help bridge this gap.',
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

export default function CrmAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'CRM Agent Readiness: Why Salesforce Scores Higher Than HubSpot (And Both Miss Gold)',
    description:
      'CRM platforms are natural agent targets. Salesforce scores around 60 Silver. HubSpot around 55 Bronze. Both miss Gold because neither has an agent-card.json, llms.txt, or MCP server.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/crm-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Platform Comparison',
    wordCount: 1900,
    keywords:
      'CRM agent readiness, Salesforce, HubSpot, CRM AI agents, lead management, MCP server CRM',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'CRM Agent Readiness',
          item: 'https://agenthermes.ai/blog/crm-agent-readiness',
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
      title="CRM Agent Readiness: Why Salesforce Scores Higher Than HubSpot (And Both Miss Gold)"
      shareUrl="https://agenthermes.ai/blog/crm-agent-readiness"
      currentHref="/blog/crm-agent-readiness"
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
            <span className="text-zinc-400">CRM Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
              <Users className="h-3.5 w-3.5" />
              Platform Comparison
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Vertical Analysis
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            CRM Agent Readiness:{' '}
            <span className="text-emerald-400">Why Salesforce Scores Higher Than HubSpot</span>
            {' '}(And Both Miss Gold)
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            CRM platforms are the most natural target for AI agents. Agents managing leads, updating contacts,
            automating follow-ups, and generating pipeline reports need CRM access constantly. Salesforce
            scores <strong className="text-zinc-100">~60 Silver</strong>. HubSpot scores{' '}
            <strong className="text-zinc-100">~55 Bronze</strong>. Both miss Gold because neither has shipped
            an agent-card.json, an llms.txt file, or an MCP server.
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

      {/* ===== WHY CRMs ARE NATURAL AGENT TARGETS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            Why CRMs Are the Highest-Value Agent Target
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Every sales team runs on a CRM. Every support team logs interactions in a CRM. Every
              marketing team tracks leads in a CRM. The CRM is the single source of truth for customer
              relationships — and AI agents are increasingly managing those relationships.
            </p>
            <p>
              Today, agents already handle lead scoring, email drafting, meeting scheduling, and pipeline
              analysis. But every one of those workflows terminates at a CRM API call. The agent needs to
              read contact data, write deal updates, query pipeline stages, and log activities. The quality
              of that API interaction — how fast, how reliable, how well-structured — determines whether
              agents can actually use the CRM or just talk about using it.
            </p>
            <p>
              This is why CRM agent readiness matters more than most verticals. A restaurant with a poor
              agent readiness score loses some orders. A CRM with poor agent readiness scores blocks{' '}
              <strong className="text-zinc-100">every agent-driven business workflow</strong> across
              sales, support, and marketing simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '~60', label: 'Salesforce est. score', icon: TrendingUp },
              { value: '~55', label: 'HubSpot est. score', icon: BarChart3 },
              { value: '75+', label: 'Gold threshold', icon: Crown },
              { value: '0', label: 'CRMs with MCP servers', icon: Server },
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

      {/* ===== DIMENSION-BY-DIMENSION COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Salesforce vs HubSpot: Dimension-by-Dimension
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Both platforms have strong APIs. The differences emerge in API depth, onboarding friction,
            pricing transparency, and — critically — the complete absence of agent-native infrastructure
            from both.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-xs font-bold text-zinc-300">
              <div>Dimension</div>
              <div>Salesforce</div>
              <div>HubSpot</div>
              <div>Notes</div>
            </div>
            {dimensionComparison.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200 text-xs">{row.dimension}</div>
                <div className={`font-bold text-xs ${parseInt(row.salesforce) >= parseInt(row.hubspot) ? 'text-emerald-400' : 'text-zinc-300'}`}>
                  {row.salesforce}
                </div>
                <div className={`font-bold text-xs ${parseInt(row.hubspot) >= parseInt(row.salesforce) ? 'text-emerald-400' : 'text-zinc-300'}`}>
                  {row.hubspot}
                </div>
                <div className="text-zinc-500 text-xs">{row.notes}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-blue-400">Where Salesforce wins:</strong> D2 API Quality (REST + SOQL + Bulk + Streaming),
              D6 Data Quality (typed SOQL responses), and D7 Security (OAuth 2.0, field-level security, IP allowlisting).
              <br /><br />
              <strong className="text-blue-400">Where HubSpot wins:</strong> D3 Onboarding (free API key in minutes vs connected app
              OAuth setup) and D4 Pricing (transparent tier pricing vs &ldquo;contact sales&rdquo;).
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENTS DO WITH CRMs ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-500" />
            Five Things AI Agents Do with CRM Data
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These are the five highest-value agent use cases for CRM platforms. Each one requires reliable
            API access, structured data, and predictable auth.
          </p>

          <div className="space-y-4 mb-8">
            {agentUseCases.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.useCase}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{item.useCase}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Every one of these use cases is blocked or degraded when CRM agent readiness is low. Lead
              qualification fails if the API is too slow. Contact enrichment fails if the auth flow is
              complex. Follow-up automation fails if webhooks are unreliable. Pipeline reporting fails
              if query responses are poorly structured. Data hygiene fails if bulk operations are not
              supported.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT IS MISSING FOR GOLD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            What Would Push CRMs to Gold (75+)
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Neither Salesforce nor HubSpot will reach Gold with their current infrastructure. Both are
            missing the same five things. Together, these would add approximately 14 points to their
            scores.
          </p>

          <div className="space-y-3 mb-8">
            {goldRequirements.map((req) => (
              <div
                key={req.requirement}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold">
                  {req.points.replace('~', '').replace(' pts', '')}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-zinc-100 text-sm">{req.requirement}</h3>
                    <span className="text-xs text-red-400">{req.status}</span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-1">{req.description}</p>
                  <span className="text-xs text-zinc-600">Effort: {req.difficulty}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The MCP server is the biggest lever:</strong> A CRM MCP
              server with tools for lead management, deal updates, contact search, and pipeline queries
              would add ~5 points to D9 Agent Experience alone. It would also lift D2 and D6 by making
              CRM operations natively agent-callable instead of requiring custom API integration code.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE SEAT-PRICING CONFLICT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-red-500" />
            Why CRM Vendors Are Slow to Build Agent Infrastructure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Per-seat pricing conflict',
                detail: 'Salesforce charges $25-300 per user per month. AI agents that handle work of 2-3 reps threaten seat counts. Making CRMs more agent-accessible cannbalizes the licensing model.',
              },
              {
                title: 'Enterprise sales dependency',
                detail: 'Both Salesforce and HubSpot Enterprise require sales conversations. Self-service API access with metered billing would bypass the sales team that drives upsells and contract expansions.',
              },
              {
                title: 'Integration marketplace revenue',
                detail: 'Salesforce AppExchange and HubSpot Marketplace generate revenue from third-party integrations that bridge agent gaps. Native MCP support would obsolete many of these paid connectors.',
              },
              {
                title: 'Competitive moat via complexity',
                detail: 'Complex setup and enterprise-only features create switching costs. Agent-friendly, self-service access would lower barriers to entry for both new customers and new competitors.',
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
              This is the same dynamic that played out with cloud computing and on-premise enterprise
              software. Incumbents delay because the new model threatens existing revenue. But the transition
              happens anyway — just led by new entrants and middleware companies that wrap existing CRM APIs
              in agent-friendly interfaces.
            </p>
            <p>
              For businesses using Salesforce or HubSpot today, do not wait for the vendors. Build an MCP
              adapter that wraps your CRM API in agent-callable tools. AgentHermes can generate this
              middleware layer, giving your agents direct CRM access through structured MCP tools while
              the vendors catch up.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE EMERGING CRM AGENT STACK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-emerald-500" />
            The Emerging CRM Agent Stack
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A new layer is forming between CRM platforms and AI agents. This middleware layer translates
              CRM APIs into agent-native MCP tools. Three approaches are emerging:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                title: 'MCP adapters (wrap existing APIs)',
                detail: 'Take Salesforce REST API or HubSpot API, wrap each endpoint in an MCP tool with proper descriptions and typed schemas. Agents call the MCP tool; the adapter translates to the CRM API. Fastest to build, works with existing CRM subscriptions.',
                icon: Network,
              },
              {
                title: 'Agent-native CRMs (built for agents)',
                detail: 'New CRMs designed API-first and agent-first. No per-seat pricing — per-API-call or flat rate. MCP server ships as a core feature, not an afterthought. Examples are starting to emerge from the same developer-tool ecosystem that leads agent readiness scores.',
                icon: Sparkles,
              },
              {
                title: 'Orchestration platforms (multi-CRM)',
                detail: 'Platforms that connect to multiple CRMs and expose a unified MCP interface. Agent calls create_lead() and the platform routes to Salesforce, HubSpot, or Pipedrive based on the customer context. CRM-agnostic agent workflows.',
                icon: Globe,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <item.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
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
                title: 'Why Most SaaS Companies Score Bronze',
                href: '/blog/saas-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
              },
              {
                title: 'Enterprise vs Startup Agent Readiness',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Research',
                tagColor: 'emerald',
              },
              {
                title: 'Check Your Agent Readiness Score',
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
            How agent-ready is your CRM?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Scan your CRM platform or your business website. See the dimension-by-dimension breakdown
            and learn exactly what to fix for maximum agent accessibility.
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
