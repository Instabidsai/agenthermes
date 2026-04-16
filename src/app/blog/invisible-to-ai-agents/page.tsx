import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Eye,
  EyeOff,
  Globe,
  HelpCircle,
  Layers,
  Network,
  Search,
  Shield,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  UserPlus,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Is Your Business Invisible to AI Agents? | AgentHermes',
  description:
    'We scanned 500 businesses. 40% are completely invisible to AI agents. Find out where you stand with a free 60-second Agent Readiness Score.',
  keywords: [
    'is my business ready for AI agents',
    'AI agent readiness',
    'invisible to AI agents',
    'agent readiness score',
    'AI agents for business',
    'MCP server',
    'agent economy',
    'business AI readiness',
    'agent readiness levels',
  ],
  openGraph: {
    title: 'Is Your Business Invisible to AI Agents?',
    description:
      'We scanned 500 businesses. 40% are completely invisible to AI agents. The average score is 43/100. Zero businesses scored Platinum. Find out where you stand.',
    url: 'https://agenthermes.ai/blog/invisible-to-ai-agents',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Is Your Business Invisible to AI Agents? — AgentHermes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Your Business Invisible to AI Agents?',
    description:
      '500 businesses scanned. Average score: 43/100. 40% are completely invisible. Check your score free.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/invisible-to-ai-agents',
  },
}

// ---------------------------------------------------------------------------
// FAQ Data
// ---------------------------------------------------------------------------

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How do I check my agent readiness score?',
    answer:
      'Go to agenthermes.ai/audit and enter your business URL. The scanner probes 9 dimensions in about 60 seconds and gives you a score out of 100, an ARL level, and specific recommendations for improvement. The scan is completely free.',
  },
  {
    question: 'What does it mean if my business is "invisible" to AI agents?',
    answer:
      'It means AI agents cannot find your business when searching on behalf of users. If someone asks ChatGPT, Claude, or any AI assistant to find a business like yours, your business will not appear in the results. Agents rely on structured data, APIs, and machine-readable information. If your business only has a basic website with no structured data, you are invisible to this growing channel.',
  },
  {
    question: 'Do AI agents actually send customers to businesses today?',
    answer:
      'Yes, and it is growing rapidly. Millions of people already use AI assistants like ChatGPT, Claude, Google Gemini, and Siri for daily tasks including finding and comparing businesses. As these agents gain the ability to book, order, and pay, the businesses they can interact with will capture this traffic. The businesses they cannot find will lose it.',
  },
  {
    question: 'How is agent readiness different from having a good website or SEO?',
    answer:
      'SEO helps humans find your website through Google search results. Agent readiness helps AI agents find, understand, and transact with your business programmatically. A beautifully designed website with great SEO can still score zero on agent readiness if it has no structured data, no API, and no machine-readable pricing. You need both, but agent readiness is the new competitive frontier.',
  },
  {
    question: 'What is the fastest way to improve my agent readiness score?',
    answer:
      'Start with discoverability. Add structured data (Schema.org markup) to your website, claim and complete your Google Business Profile, and create an llms.txt file. These steps alone can move you from ARL-0 (Dark) to ARL-1 (Visible). For a bigger jump, connect your business through AgentHermes to get an MCP server, agent card, and registry listing automatically.',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
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

export default function InvisibleToAIAgentsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Your Business Invisible to AI Agents?',
    description:
      'We scanned 500 businesses across dozens of industries. 40% are completely invisible to AI agents. The average score is just 43 out of 100. Here is what that means and how to fix it.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/invisible-to-ai-agents',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Research',
    wordCount: 1800,
    keywords:
      'AI agent readiness, invisible to AI agents, agent readiness score, ARL levels, MCP server, agent economy',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Is Your Business Invisible to AI Agents?',
          item: 'https://agenthermes.ai/blog/invisible-to-ai-agents',
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
      title="Is Your Business Invisible to AI Agents?"
      shareUrl="https://agenthermes.ai/blog/invisible-to-ai-agents"
      currentHref="/blog/invisible-to-ai-agents"
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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400">Invisible to AI Agents</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              <AlertTriangle className="h-3.5 w-3.5" />
              500 Businesses Scanned
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              Entry-Level Guide
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Is Your Business{' '}
            <span className="text-red-400">Invisible</span> to AI Agents?
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-4">
            We scanned 500 businesses. The average Agent Readiness Score was 43 out of 100.
            40% scored so low they are effectively invisible — AI agents cannot find them,
            cannot understand them, and cannot send them customers.
          </p>

          <p className="text-base text-zinc-500 leading-relaxed tracking-tight max-w-3xl mb-6">
            If your business is not ready for AI agents, you are already losing customers
            to competitors that are. Here is what our data shows, why it matters, and
            what you can do about it in 60 seconds.
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
                  9 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TABLE OF CONTENTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-emerald-500" />
              In This Article
            </h2>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'The New Way Customers Find Businesses', href: '#new-way' },
                { label: 'What 500 Scans Told Us', href: '#the-data' },
                { label: 'The 6-Step Agent Journey', href: '#agent-journey' },
                { label: 'Where Most Businesses Fail', href: '#where-they-fail' },
                { label: 'The ARL Framework: 7 Levels', href: '#arl-framework' },
                { label: 'The $6.2B Gap Nobody Is Filling', href: '#the-gap' },
                { label: 'How to Check Your Score', href: '#check-score' },
                { label: 'Frequently Asked Questions', href: '#faq' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800/50 text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ===== THE NEW WAY CUSTOMERS FIND BUSINESSES ===== */}
      <section id="new-way" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-emerald-500" />
            The New Way Customers Find Businesses
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Something fundamental is changing in how people find and choose businesses. For
              twenty years, the pattern was simple: a customer searches Google, clicks a few
              links, reads some reviews, and makes a decision. Your job was to show up in those
              search results. That was SEO, and it worked.
            </p>
            <p>
              Now there is a new pattern. Instead of searching Google, a growing number of
              people are asking AI agents to do the work for them. They say &ldquo;find me a
              plumber who can come today,&rdquo; or &ldquo;book a table for four at a quiet
              Italian restaurant near me,&rdquo; or &ldquo;compare project management tools
              under $20 a month.&rdquo; The AI agent goes out, finds businesses, evaluates them,
              and either recommends one or completes the transaction directly.
            </p>
            <p>
              Here is the problem: <strong className="text-zinc-100">AI agents do not browse
              websites the way humans do.</strong> They do not look at your beautiful homepage,
              read your about page, or scroll through your testimonials. They look for structured,
              machine-readable data — things like APIs, structured product catalogs, agent cards,
              and standardized protocol endpoints. If your business does not have these things,
              the agent skips you entirely. It does not even know you exist.
            </p>
            <p>
              We wanted to know how many businesses are actually ready for this shift. So we
              scanned 500 of them.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT 500 SCANS TOLD US ===== */}
      <section id="the-data" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
            What 500 Scans Told Us
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              We used the AgentHermes scanner to evaluate 500 businesses across 9 dimensions
              that matter to AI agents: Discoverability, API Quality, Onboarding, Pricing
              Transparency, Payment, Data Quality, Security, Reliability, and Agent Experience.
              Each business received a score from 0 to 100. The results were sobering.
            </p>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { value: '500', label: 'businesses scanned', color: 'text-emerald-400' },
              { value: '43/100', label: 'average score', color: 'text-amber-400' },
              { value: '40%', label: 'completely invisible', color: 'text-red-400' },
              { value: '0', label: 'scored Platinum', color: 'text-zinc-400' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-xs text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Score Distribution */}
          <h3 className="text-lg font-bold mb-4">Score Distribution Across 500 Businesses</h3>
          <div className="space-y-3 mb-8">
            {[
              { tier: 'Unaudited (below 40)', count: '198 businesses', pct: 40, color: 'bg-red-500', label: 'Invisible to agents' },
              { tier: 'Bronze (40-59)', count: '250 businesses', pct: 50, color: 'bg-amber-500', label: 'Visible but barely functional' },
              { tier: 'Silver (60-74)', count: '~50 businesses', pct: 10, color: 'bg-blue-500', label: 'Agents can transact' },
              { tier: 'Gold (75-89)', count: '1 business', pct: 0.2, color: 'bg-yellow-500', label: 'Resend (score: 75)' },
              { tier: 'Platinum (90+)', count: '0 businesses', pct: 0, color: 'bg-emerald-500', label: 'Nobody' },
            ].map((row) => (
              <div key={row.tier} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-zinc-200">{row.tier}</span>
                  <span className="text-sm text-zinc-400">{row.count} ({row.pct}%)</span>
                </div>
                <div className="h-3 rounded-full bg-zinc-800 overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${row.color}`}
                    style={{ width: `${Math.max(row.pct, 1)}%` }}
                  />
                </div>
                <p className="text-xs text-zinc-500">{row.label}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-red-400">The bottom line: 90% of businesses scored Bronze
              or below.</strong> That means 9 out of 10 businesses are either completely invisible
              to AI agents or so poorly structured that agents cannot do anything useful with them.
              Only one business out of 500 — Resend, a developer-focused email platform — reached
              Gold status with a score of 75. Zero businesses reached Platinum. The opportunity to
              lead is wide open.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE 6-STEP AGENT JOURNEY ===== */}
      <section id="agent-journey" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-emerald-500" />
            The 6-Step Agent Journey
          </h2>

          <p className="text-zinc-400 mb-4 leading-relaxed">
            To understand why so many businesses fail, you need to understand how AI agents
            interact with businesses. Every agent follows a predictable 6-step journey. Think
            of it like a customer walking into a store — except the customer is software, and
            it moves at the speed of an API call.
          </p>

          <p className="text-zinc-400 mb-8 leading-relaxed">
            If your business breaks at any step, the agent stops and moves on to a competitor
            that does not break. There are no second chances — agents do not &ldquo;come back
            later.&rdquo;
          </p>

          <div className="space-y-4">
            {[
              {
                step: 1,
                name: 'FIND',
                question: 'Can the agent discover that your business exists?',
                description:
                  'The agent searches for businesses matching a user request. It looks for structured data: Schema.org markup, Google Business Profiles, agent cards, llms.txt files, or entries in agent registries. If your business has none of these, the agent literally cannot see you. You are a ghost.',
                icon: Search,
                color: 'amber',
              },
              {
                step: 2,
                name: 'UNDERSTAND',
                question: 'Can the agent figure out what you offer and what it costs?',
                description:
                  'Once found, the agent needs to parse your services, products, pricing, and availability. This data must be structured — JSON, XML, or Schema.org markup — not buried in paragraphs of text, scanned PDF menus, or "call for a quote" pages. If the agent cannot read your offerings in a structured format, it cannot compare you to competitors.',
                icon: Eye,
                color: 'yellow',
              },
              {
                step: 3,
                name: 'SIGN UP',
                question: 'Can the agent create an account or start a relationship?',
                description:
                  'Many businesses require registration before transacting. If signup requires CAPTCHA, email verification, phone calls, or uploading documents, an agent cannot complete it. Agent-ready signup means API-accessible account creation or token-based access that software can handle.',
                icon: UserPlus,
                color: 'emerald',
              },
              {
                step: 4,
                name: 'CONNECT',
                question: 'Can the agent establish a working technical connection?',
                description:
                  'The agent needs API endpoints that return structured responses. Not HTML pages. Not PDF downloads. Clean JSON with consistent error codes, proper authentication, and predictable behavior. MCP servers, OpenAPI specs, and well-documented REST APIs all work here.',
                icon: Zap,
                color: 'blue',
              },
              {
                step: 5,
                name: 'USE',
                question: 'Can the agent perform the core action — book, order, or query?',
                description:
                  'This is where value is created. The agent needs to complete the primary task: place an order, book an appointment, run a search, or request a quote. The action must work end-to-end with programmatic input and a structured confirmation response. A booking system that only confirms via email 24 hours later is not agent-ready.',
                icon: ShoppingCart,
                color: 'purple',
              },
              {
                step: 6,
                name: 'PAY',
                question: 'Can the agent complete payment without a human typing card numbers?',
                description:
                  'The final step. If the transaction requires payment, the agent must pay programmatically — through Stripe, Square, or a similar payment API. A checkout page that requires a human to fill in credit card fields, a billing address, and a CAPTCHA is a dead end for any agent.',
                icon: CreditCard,
                color: 'emerald',
              },
            ].map((step) => {
              const colors = getColorClasses(step.color)
              return (
                <div
                  key={step.step}
                  className={`p-5 sm:p-6 rounded-xl bg-zinc-900/50 border ${colors.border}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.bg} border ${colors.border}`}>
                      <step.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold ${colors.text}`}>Step {step.step}</span>
                        <h3 className="text-lg font-bold text-zinc-100">{step.name}</h3>
                      </div>
                      <p className={`text-sm font-medium ${colors.text} mb-3`}>{step.question}</p>
                      <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHERE MOST BUSINESSES FAIL ===== */}
      <section id="where-they-fail" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            Where Most Businesses Fail
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Here is the uncomfortable truth from our 500-business scan: <strong className="text-zinc-100">
              most businesses fail at Step 1.</strong> They never even get found. The agent
              searches for a plumber, a restaurant, or a SaaS tool, and your business simply
              does not appear in the structured data the agent is reading.
            </p>
            <p>
              This is not because your business is bad. It is because your business was built
              for humans, not for software. Your website is designed for people who can read
              paragraphs, look at photos, and navigate menus. AI agents do not do any of that.
              They look for machine-readable signals — and most businesses have none.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 mb-8">
            <h3 className="text-lg font-bold text-zinc-100 mb-4">What AgentHermes Detects (and Most Businesses Lack)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { signal: 'MCP servers', desc: 'The protocol for AI agents to call your business tools', found: 'Nearly zero businesses' },
                { signal: 'A2A protocol', desc: 'Agent-to-agent communication standard', found: 'Nearly zero businesses' },
                { signal: 'agent-card.json', desc: 'Machine-readable identity file for your business', found: 'Nearly zero businesses' },
                { signal: 'llms.txt', desc: 'Instructions for AI models about your business', found: 'Extremely rare' },
                { signal: 'AGENTS.md', desc: 'Agent-specific documentation file', found: 'Extremely rare' },
                { signal: 'OpenAPI specs', desc: 'Standardized API documentation', found: 'Only tech companies' },
                { signal: 'Schema.org markup', desc: 'Structured data on your website', found: 'Some businesses' },
                { signal: 'Platform APIs', desc: 'Shopify, WooCommerce, or Square integrations', found: 'E-commerce only' },
              ].map((item) => (
                <div key={item.signal} className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                  <div className="flex items-center gap-2 mb-1">
                    <EyeOff className="h-3.5 w-3.5 text-red-400 shrink-0" />
                    <span className="text-sm font-bold text-zinc-200">{item.signal}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-1">{item.desc}</p>
                  <p className="text-xs text-red-400">{item.found}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The pattern is clear.</strong> The signals that
              matter most to AI agents — MCP servers, agent cards, A2A protocol support — are
              the ones that almost nobody has. Even basic structured data like Schema.org markup
              is missing from a large percentage of business websites. This is not a technology
              gap. It is an awareness gap. Most businesses do not even know these signals exist.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ARL FRAMEWORK ===== */}
      <section id="arl-framework" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-6 w-6 text-emerald-500" />
            The ARL Framework: 7 Levels of Agent Readiness
          </h2>

          <p className="text-zinc-400 mb-4 leading-relaxed">
            To help businesses understand where they stand and what to work toward, we created
            the Agent Readiness Level (ARL) framework. Think of it like a fitness score for
            the agent economy — it tells you exactly how prepared your business is, from
            completely dark to fully autonomous.
          </p>

          <p className="text-zinc-400 mb-8 leading-relaxed">
            Each level is cumulative. You cannot jump to ARL-4 without meeting all requirements
            for levels 0 through 3. The good news: moving from ARL-0 to ARL-2 is straightforward
            and can happen in minutes, not months.
          </p>

          <div className="space-y-3">
            {[
              {
                level: 0,
                name: 'Dark',
                description: 'Completely invisible to AI agents. No structured data, no API, no machine-readable presence whatsoever. This is where 40% of the businesses we scanned sit today.',
                icon: EyeOff,
                color: 'red',
                scoreRange: '0-19',
              },
              {
                level: 1,
                name: 'Visible',
                description: 'Agents can find the business and understand what it does at a basic level. Has some structured data like a Google Business Profile or Schema.org markup, but cannot transact.',
                icon: Search,
                color: 'amber',
                scoreRange: '20-34',
              },
              {
                level: 2,
                name: 'Described',
                description: 'Agents can read structured offerings, pricing, and availability. The business has machine-readable catalogs or menus, but no way for agents to take action.',
                icon: Eye,
                color: 'yellow',
                scoreRange: '35-49',
              },
              {
                level: 3,
                name: 'Connected',
                description: 'This is the revenue inflection point. Agents can initiate transactions — book, order, or request a quote programmatically. Has an API or MCP server that agents can call.',
                icon: Zap,
                color: 'emerald',
                scoreRange: '50-59',
              },
              {
                level: 4,
                name: 'Automated',
                description: 'Agents can complete the full transaction cycle: create, pay, track, modify, and cancel. End-to-end programmatic commerce with no human intervention required.',
                icon: Bot,
                color: 'blue',
                scoreRange: '60-69',
              },
              {
                level: 5,
                name: 'Autonomous',
                description: 'Agents manage the ongoing relationship — reorder, optimize, escalate, and renew. The business operates in the background while agents handle customer interactions.',
                icon: TrendingUp,
                color: 'purple',
                scoreRange: '70-89',
              },
              {
                level: 6,
                name: 'Interoperable',
                description: 'The business runs its own agent that communicates with customer agents via A2A and MCP. Full agent-to-agent commerce with no human in the loop.',
                icon: Network,
                color: 'emerald',
                scoreRange: '90+',
              },
            ].map((arl) => {
              const colors = getColorClasses(arl.color)
              return (
                <div
                  key={arl.level}
                  className={`p-4 sm:p-5 rounded-xl bg-zinc-900/50 border ${colors.border} hover:border-zinc-700 transition-colors`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.bg} border ${colors.border}`}>
                      <arl.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <h3 className="font-bold text-zinc-100">
                          ARL-{arl.level}: {arl.name}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-bold`}>
                          Score {arl.scoreRange}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">{arl.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/blog/arl-levels-explained"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm font-medium transition-colors border border-zinc-700"
            >
              Deep dive: ARL Levels Explained
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/blog/what-is-agent-readiness"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm font-medium transition-colors border border-zinc-700"
            >
              What Is Agent Readiness?
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== THE $6.2B GAP ===== */}
      <section id="the-gap" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Globe className="h-6 w-6 text-amber-400" />
            The $6.2B Gap Nobody Is Filling
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              There are 33 million small businesses in the United States. As of today, effectively
              zero of them have MCP servers. Zero have A2A agent cards. Zero are fully
              interoperable with AI agents. This is not a rounding error — it is a gaping hole
              in the infrastructure of the agent economy.
            </p>
            <p>
              Meanwhile, every major technology company is building AI agents that need to
              interact with businesses. Apple, Google, Amazon, Microsoft, Anthropic, OpenAI —
              all of them are deploying agents that search for, compare, and transact with
              businesses on behalf of users. These agents are ready to send customers. But
              they have nowhere to send them.
            </p>
            <p>
              This gap represents a conservatively estimated $6.2 billion annual opportunity.
              The businesses that close this gap first do not just get more customers from
              agents — they become the only businesses agents can find. In a world where AI
              agents are making purchasing decisions, being the only visible option is not just
              an advantage. It is a monopoly on that customer request.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                value: '33M',
                label: 'US small businesses',
                detail: 'Zero have MCP servers. Each one is a potential participant in the agent economy.',
                color: 'text-emerald-400',
              },
              {
                value: '$6.2B',
                label: 'annual market gap',
                detail: 'SaaS subscriptions, per-transaction fees, and enterprise consulting across all verticals.',
                color: 'text-amber-400',
              },
              {
                value: '0',
                label: 'Platinum-ready businesses',
                detail: 'Out of 500 scanned, not a single business achieved full agent interoperability.',
                color: 'text-red-400',
              },
            ].map((item) => (
              <div key={item.label} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
                <p className={`text-3xl font-bold ${item.color} mb-1`}>{item.value}</p>
                <p className="text-sm font-medium text-zinc-200 mb-2">{item.label}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">This is the SEO moment of the 2020s.</strong> When
              Google became the dominant way people found businesses in the early 2000s, the
              businesses with websites won and the businesses without them disappeared. Agent
              readiness is the next version of this shift — but it is moving faster. The
              businesses that become agent-ready now will have a compounding advantage that late
              movers will struggle to overcome. Explore{' '}
              <Link href="/for" className="text-emerald-400 underline hover:text-emerald-300 transition-colors">
                what agent readiness looks like in your industry
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO CHECK YOUR SCORE ===== */}
      <section id="check-score" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-emerald-500" />
            How to Check Your Score in 60 Seconds
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The first step is knowing where you stand. The AgentHermes scanner evaluates your
              business across all 9 dimensions, calculates your composite score, assigns your
              ARL level, and tells you exactly what to fix first. It takes about 60 seconds and
              it is completely free.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { step: '1', title: 'Enter your URL', detail: 'Go to agenthermes.ai/audit and enter your business website or domain.', color: 'emerald' },
              { step: '2', title: 'Scan runs', detail: 'The scanner probes all 9 dimensions: discovery, APIs, onboarding, pricing, payment, data, security, reliability, agent experience.', color: 'blue' },
              { step: '3', title: 'Get your score', detail: 'See your composite score (0-100), ARL level (0-6), tier (Bronze through Platinum), and per-dimension breakdown.', color: 'purple' },
              { step: '4', title: 'Fix what matters', detail: 'Follow prioritized recommendations to improve each dimension. Start with discovery — it is the highest-impact fix for most businesses.', color: 'amber' },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div key={item.step} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <div className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${colors.bg} border ${colors.border} ${colors.text} font-bold text-sm mb-3`}>
                    {item.step}
                  </div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Your score page is permanent and shareable — accessible at{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                agenthermes.ai/score/yourdomain.com</code>. Send it to your marketing team,
              your web developer, or your agency. Re-scan any time to track your improvement as
              you make changes.
            </p>
            <p>
              Remember: the average business scores 43 out of 100. Even small improvements
              can move you ahead of 90% of your competition. And if you are in a local market,
              the first business in your category to become agent-ready will capture all the
              agent-driven traffic — because agents recommend the businesses they can interact
              with, and right now, that is almost nobody.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-lg transition-colors"
            >
              Check Your Score in 60 Seconds
              <ArrowRight className="h-5 w-5" />
            </Link>
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
                title: 'What Is Agent Readiness? The Complete Guide',
                href: '/blog/what-is-agent-readiness',
                tag: 'Complete Guide',
                tagColor: 'emerald',
              },
              {
                title: 'ARL Levels Explained: From Dark to Interoperable',
                href: '/blog/arl-levels-explained',
                tag: 'Framework',
                tagColor: 'purple',
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
            Stop being invisible
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            500 businesses scanned. Average score: 43/100. 90% are Bronze or below.
            Find out where your business stands — and what to fix first.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Check My Score Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/for"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              See My Industry
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
