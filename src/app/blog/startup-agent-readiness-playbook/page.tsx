import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  FileJson,
  Globe,
  HelpCircle,
  Key,
  Layers,
  Rocket,
  Server,
  Shield,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'The Startup Agent Readiness Playbook: How to Score Silver Before You Launch | AgentHermes',
  description:
    'Pre-launch guide for startups. Build agent-ready from day 1 with this 8-step checklist: API-first architecture, OpenAPI spec, Bearer auth, JSON errors, agent-card.json, llms.txt, /health endpoint, and status page. All free architectural choices.',
  keywords: [
    'startup agent readiness playbook',
    'agent readiness for startups',
    'agent-ready architecture',
    'startup API design',
    'pre-launch agent readiness',
    'API-first startup',
    'agent readiness checklist startup',
    'build agent-ready',
  ],
  openGraph: {
    title: 'The Startup Agent Readiness Playbook: How to Score Silver Before You Launch',
    description:
      'Build agent-ready from day 1 instead of retrofitting. 8-step checklist that costs $0 and lands you Silver tier before your first customer.',
    url: 'https://agenthermes.ai/blog/startup-agent-readiness-playbook',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Startup Agent Readiness Playbook',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Startup Agent Readiness Playbook: Score Silver Before You Launch',
    description:
      '8 free architectural choices that make your startup agent-ready from day 1. No retrofitting, no extra features, just better defaults.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/startup-agent-readiness-playbook',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const checklistItems = [
  {
    step: '1',
    title: 'API-First Architecture',
    description:
      'Every feature you build should start as an API endpoint, not a page. Your React frontend calls your own API. This means agents can call the same endpoints humans use — no separate integration needed. If your product has a feature, it has an API route.',
    impact: 'D2 API Quality (15% of score)',
    cost: '$0 — it is an architecture pattern, not a feature',
    icon: Layers,
    color: 'emerald',
  },
  {
    step: '2',
    title: 'OpenAPI Spec from the Start',
    description:
      'Generate an OpenAPI spec from your route handlers on day 1. Libraries like next-swagger-doc, tsoa, or Hono\'s built-in OpenAPI do this automatically. Once agents discover your /openapi.json, they can auto-generate typed client SDKs in any language without reading your docs.',
    impact: 'D1 Discovery (12%) + D2 API Quality (15%)',
    cost: '$0 — one dependency and a route handler',
    icon: FileJson,
    color: 'blue',
  },
  {
    step: '3',
    title: 'Bearer Auth, Not Session Cookies',
    description:
      'Session cookies require a browser. AI agents do not have browsers. Bearer token authentication (API keys or JWTs in the Authorization header) works for both humans and agents. Every endpoint that requires auth should accept Authorization: Bearer <token>. Return 401 with a JSON body when the token is missing or invalid.',
    impact: 'D7 Security (12% of score)',
    cost: '$0 — same effort as cookie auth, different header',
    icon: Key,
    color: 'amber',
  },
  {
    step: '4',
    title: 'JSON Errors from Day 1',
    description:
      'When something goes wrong, return structured JSON: { "error": "not_found", "message": "Product with ID abc123 does not exist", "code": 404, "request_id": "req_xyz" }. Never return HTML error pages to API requests. Agents cannot parse "500 Internal Server Error" as an HTML page, but they can parse a JSON object with an error code and retry logic.',
    impact: 'D2 API Quality (15%) + D6 Data Quality (10%)',
    cost: '$0 — a global error handler middleware',
    icon: Code2,
    color: 'purple',
  },
  {
    step: '5',
    title: 'agent-card.json in Your Repo',
    description:
      'Create /.well-known/agent-card.json before you launch. This file tells AI agents who you are, what you do, and how to interact with your service. It includes your MCP endpoint URL, supported protocols, authentication methods, and capability descriptions. Think of it as your business card for the agent economy.',
    impact: 'D9 Agent Experience (10% of score)',
    cost: '$0 — a single JSON file in your public directory',
    icon: Globe,
    color: 'emerald',
  },
  {
    step: '6',
    title: 'llms.txt Describing Your Product',
    description:
      'The llms.txt standard is a plain-text file at /llms.txt that describes your product in language AI models understand. It covers what your service does, what endpoints are available, what data formats you accept, and common use cases. AI models read this to understand your product before interacting with it — similar to how humans read your landing page.',
    impact: 'D9 Agent Experience (10% of score)',
    cost: '$0 — a plain text file served from a route handler',
    icon: Server,
    color: 'blue',
  },
  {
    step: '7',
    title: '/health Endpoint',
    description:
      'A /health or /api/health endpoint that returns { "status": "healthy", "version": "1.0.0", "timestamp": "2026-04-15T..." }. Agents check this before delegating work to your API. No health endpoint means no confidence that your service is running. It takes 5 lines of code and directly impacts your reliability score.',
    impact: 'D8 Reliability (13% of score)',
    cost: '$0 — five lines of code',
    icon: Zap,
    color: 'emerald',
  },
  {
    step: '8',
    title: 'Status Page',
    description:
      'Even a simple /status page that shows uptime history gives agents confidence in your service. Advanced: use Instatus, Statuspage, or BetterStack for hosted monitoring with incident history. Minimum viable: a /status route that returns current system health with recent uptime data. Agents check status pages before making critical API calls.',
    impact: 'D8 Reliability (13% of score)',
    cost: '$0 for self-hosted, $0-29/mo for hosted services',
    icon: Target,
    color: 'amber',
  },
]

const retrofitCosts = [
  { item: 'API-first refactor (session cookies to Bearer auth)', cost: '$5K-15K', time: '2-4 weeks' },
  { item: 'OpenAPI spec generation for existing routes', cost: '$2K-5K', time: '1-2 weeks' },
  { item: 'JSON error standardization across all endpoints', cost: '$3K-8K', time: '1-3 weeks' },
  { item: 'Agent discovery files (agent-card.json, llms.txt)', cost: '$1K-3K', time: '2-5 days' },
  { item: 'Total retrofit cost (typical Series A SaaS)', cost: '$11K-31K', time: '6-12 weeks' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is a good Agent Readiness Score for a pre-launch startup?',
    answer:
      'Silver tier (60+) is achievable before launch by following this checklist. Most launched startups score 20-35 because they built for humans first and never added agent infrastructure. A pre-launch startup that implements all 8 items can realistically score 60-68 on day one.',
  },
  {
    question: 'Do I need an MCP server before launch?',
    answer:
      'An MCP server is not required for Silver tier, but it accelerates your path to Gold (75+). The 8 items in this playbook get you to Silver. Adding an MCP server — which AgentHermes can auto-generate — is what pushes you above 70. Think of Silver as table stakes and Gold as competitive advantage.',
  },
  {
    question: 'Will this slow down my MVP timeline?',
    answer:
      'No. Every item in this checklist is an architectural choice, not an additional feature. API-first architecture does not take longer than page-first — it is the same code organized differently. JSON errors take the same time as HTML errors. Bearer auth takes the same time as cookie auth. The only additions are static files (agent-card.json, llms.txt) that take minutes.',
  },
  {
    question: 'What if my startup is not a SaaS or API product?',
    answer:
      'Even if you are a marketplace, content platform, or service business, your backend has an API that your frontend calls. Making that API agent-accessible follows the same patterns. If you accept bookings, have a catalog, or process payments, agents want to interact with those capabilities.',
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

export default function StartupAgentReadinessPlaybookPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Startup Agent Readiness Playbook: How to Score Silver Before You Launch',
    description:
      'Pre-launch guide for startups to build agent-ready from day 1. 8-step checklist of free architectural choices that land Silver tier before your first customer.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/startup-agent-readiness-playbook',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Startup Guide',
    wordCount: 1800,
    keywords:
      'startup agent readiness playbook, agent-ready startup, API-first architecture, pre-launch agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Startup Agent Readiness Playbook',
          item: 'https://agenthermes.ai/blog/startup-agent-readiness-playbook',
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
      title="The Startup Agent Readiness Playbook: How to Score Silver Before You Launch"
      shareUrl="https://agenthermes.ai/blog/startup-agent-readiness-playbook"
      currentHref="/blog/startup-agent-readiness-playbook"
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
            <span className="text-zinc-400">Startup Agent Readiness Playbook</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Rocket className="h-3.5 w-3.5" />
              Startup Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Pre-Launch Checklist
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            The Startup Agent Readiness Playbook:{' '}
            <span className="text-emerald-400">How to Score Silver Before You Launch</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Most startups build for humans first, then spend $11K-31K retrofitting for agents later.
            This playbook flips that. Eight architectural choices — all free — that make your startup
            agent-ready from day one. No extra features. No extra cost. Just better defaults.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-red-500" />
            The Cost of Retrofitting: Why Later Means $11K-31K
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes has scanned over 500 businesses. The average score is 43 out of 100 — solidly
              in the Bronze tier. Most of these businesses launched years ago and now face expensive
              retrofits to become agent-ready. Session cookies need to become Bearer tokens. HTML error
              pages need to become JSON responses. Undocumented endpoints need OpenAPI specs.
            </p>
            <p>
              The irony is that none of these changes add features. They are architectural choices that
              cost the same at build time but cost thousands to change later. A startup that makes these
              choices on day one pays nothing extra. A startup that makes them a year later pays for the
              migration.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Retrofit Item</div>
              <div>Cost</div>
              <div>Timeline</div>
            </div>
            {retrofitCosts.map((row, i) => (
              <div
                key={row.item}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="text-zinc-300">{row.item}</div>
                <div className="text-red-400 font-medium">{row.cost}</div>
                <div className="text-zinc-500">{row.time}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The alternative:</strong> Make these 8 choices before
              you write your first route handler. Total cost: $0. Total time added to your MVP: zero.
              You are not building extra features — you are building the same features with agent-ready
              defaults.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE 8-STEP CHECKLIST ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            The 8-Step Agent Readiness Checklist for Startups
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Every item is an architectural choice, not a feature. All of them cost $0 at build time.
            Together they target 87% of the AgentHermes scoring dimensions.
          </p>

          <div className="space-y-4 mb-8">
            {checklistItems.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.step}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-zinc-800 text-xs font-bold text-zinc-400">
                          {item.step}
                        </span>
                        <h3 className="text-lg font-bold text-zinc-100">{item.title}</h3>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                          {item.impact}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-400 text-xs font-medium">
                          {item.cost}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== SCORE PROJECTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Score Projection: What This Checklist Gets You
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes scores businesses across 9 weighted dimensions. Here is how the 8-step
              checklist maps to each dimension and the approximate score contribution:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {[
              { dimension: 'D1 Discovery', points: '9/12', items: 'OpenAPI, llms.txt, agent-card.json' },
              { dimension: 'D2 API Quality', points: '12/15', items: 'API-first, JSON errors, OpenAPI' },
              { dimension: 'D3 Onboarding', points: '5/8', items: 'Self-service API keys, docs' },
              { dimension: 'D6 Data Quality', points: '7/10', items: 'JSON responses, structured errors' },
              { dimension: 'D7 Security', points: '9/12', items: 'Bearer auth, TLS, security.txt' },
              { dimension: 'D8 Reliability', points: '10/13', items: '/health, status page, uptime' },
            ].map((dim) => (
              <div
                key={dim.dimension}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="text-lg font-bold text-emerald-400 mb-1">{dim.points}</div>
                <div className="text-sm font-medium text-zinc-200 mb-1">{dim.dimension}</div>
                <div className="text-xs text-zinc-500">{dim.items}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-blue-400">Projected score: 60-68 (Silver tier).</strong> This puts
              you ahead of 90% of the businesses AgentHermes has scanned. The average is 43. Startups
              that follow this playbook launch in the top 10% of agent readiness without spending a dollar
              on agent-specific features.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY IT MATTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            Why Agent Readiness Matters for Startups Specifically
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Startups that launch agent-ready capture agent traffic from day one. This matters because
              AI agents are becoming the primary way users discover and interact with new services. When
              someone asks Claude or ChatGPT to &ldquo;find me a project management tool with a free
              tier,&rdquo; the AI checks which tools have structured APIs it can evaluate programmatically.
            </p>
            <p>
              If your competitor has an OpenAPI spec, agent-card.json, and structured pricing data, the
              AI agent can evaluate their product in seconds. If you have a marketing website with a
              &ldquo;Book a Demo&rdquo; button, the agent skips you entirely. This is not a future
              scenario — it is happening now across every B2B and developer tool category.
            </p>
            <p>
              The compounding effect is real. Agent discovery builds on itself. Once an agent successfully
              uses your API to complete a task, that interaction reinforces your service as a reliable
              option for similar future requests. Early agent readiness creates a moat that grows over
              time, similar to how early SEO creates organic traffic moats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Zero-CAC agent traffic from day 1',
                detail: 'Agent-driven discovery costs nothing. No ads, no SEO campaigns, no content marketing. Agents find you through structured data and recommend you based on capability.',
              },
              {
                title: 'Compound discovery advantage',
                detail: 'Every successful agent interaction reinforces your service. Agents learn which APIs are reliable and prefer them for future requests. Early entrants compound faster.',
              },
              {
                title: 'No retrofit debt',
                detail: 'Building agent-ready from day 1 means you never face the $11K-31K retrofit bill. Your architecture is correct from the start, so every feature you add is automatically agent-accessible.',
              },
              {
                title: 'Investor signal',
                detail: 'A Silver Agent Readiness Score signals to investors that your team builds forward-looking infrastructure. It demonstrates API-first architecture, which is a proxy for engineering quality.',
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
                title: "The CTO's Guide to Agent Readiness: Technical Decisions That Impact Your Score",
                href: '/blog/cto-guide-agent-readiness',
                tag: 'Technical Guide',
                tagColor: 'emerald',
              },
              {
                title: 'From Bronze to Silver: The 30-Day Sprint',
                href: '/blog/bronze-to-silver-guide',
                tag: 'Upgrade Guide',
                tagColor: 'blue',
              },
              {
                title: 'Enterprise vs Startup Agent Readiness: Different Paths to the Same Score',
                href: '/blog/enterprise-vs-startup-agent-readiness',
                tag: 'Comparison',
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
            Score your startup before you launch
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your Agent Readiness Score in 60 seconds. Know exactly where you stand on all 9
            dimensions and what to fix before your first customer arrives.
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
