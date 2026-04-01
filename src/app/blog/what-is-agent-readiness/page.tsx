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
  CreditCard,
  DollarSign,
  Eye,
  EyeOff,
  Globe,
  HelpCircle,
  Layers,
  Network,
  Search,
  Server,
  Shield,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  User,
  UserPlus,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'What Is Agent Readiness? The Complete Guide | AgentHermes',
  description:
    'Agent readiness is how prepared a business is to be discovered, understood, and transacted with by AI agents. Learn the 7 ARL levels, the 6-step agent journey, and why 238 businesses average just 42/100.',
  keywords: [
    'agent readiness',
    'what is agent readiness',
    'agent readiness score',
    'AI agent readiness',
    'ARL levels',
    'agent ready business',
    'MCP server',
    'agent economy',
    'business AI readiness',
  ],
  openGraph: {
    title: 'What Is Agent Readiness? The Complete Guide',
    description:
      'The definitive guide to agent readiness: 7 ARL levels, 6-step agent journey, and 9 scoring dimensions. 238 businesses scanned, average score 42/100.',
    url: 'https://agenthermes.ai/blog/what-is-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'What Is Agent Readiness? — The Complete Guide by AgentHermes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Agent Readiness? The Complete Guide',
    description:
      'The definitive guide: 7 ARL levels, 6-step agent journey, 9 scoring dimensions. 238 businesses scanned, average 42/100.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/what-is-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// ARL Level Summary Data
// ---------------------------------------------------------------------------

interface ARLSummary {
  level: number
  name: string
  oneLiner: string
  icon: typeof EyeOff
  color: string
  scoreRange: string
  example: string
}

const arlSummaries: ARLSummary[] = [
  {
    level: 0,
    name: 'Dark',
    oneLiner: 'Invisible to AI agents — no structured data, no API, no machine-readable presence.',
    icon: EyeOff,
    color: 'red',
    scoreRange: '0-19',
    example: 'A local plumber with a brochure website. Phone number is an image. Hours are on Facebook.',
  },
  {
    level: 1,
    name: 'Discoverable',
    oneLiner: 'Agents can find the business and understand what it does at a basic level.',
    icon: Search,
    color: 'amber',
    scoreRange: '20-34',
    example: 'A restaurant with a Google Business Profile — hours, cuisine, and location are structured.',
  },
  {
    level: 2,
    name: 'Readable',
    oneLiner: 'Agents can read offerings, pricing, and availability in structured formats.',
    icon: Eye,
    color: 'yellow',
    scoreRange: '35-49',
    example: 'An e-commerce store with Schema.org product markup — prices, stock, and reviews are machine-readable.',
  },
  {
    level: 3,
    name: 'Bookable',
    oneLiner: 'Agents can initiate transactions — book, order, or request a quote programmatically.',
    icon: ShoppingCart,
    color: 'emerald',
    scoreRange: '50-59',
    example: 'A SaaS with self-serve signup and API keys. An agent can create an account and start using it.',
  },
  {
    level: 4,
    name: 'Transactable',
    oneLiner: 'Agents can complete the full transaction cycle: create, pay, track, modify, and cancel.',
    icon: CreditCard,
    color: 'blue',
    scoreRange: '60-69',
    example: 'Stripe — agents can create payments, manage subscriptions, issue refunds, and track status.',
  },
  {
    level: 5,
    name: 'Autonomous',
    oneLiner: 'Agents can manage the ongoing relationship — reorder, optimize, escalate, and renew.',
    icon: Bot,
    color: 'purple',
    scoreRange: '70-74',
    example: 'AWS — agents provision resources, auto-scale, optimize costs, and manage billing across lifecycle.',
  },
  {
    level: 6,
    name: 'Interoperable',
    oneLiner: 'The business runs its own agent that communicates with customer agents via A2A and MCP.',
    icon: Network,
    color: 'emerald',
    scoreRange: '75+',
    example: 'A restaurant whose agent negotiates group rates with a corporate travel agent, fully automated.',
  },
]

// ---------------------------------------------------------------------------
// 6-Step Agent Journey
// ---------------------------------------------------------------------------

interface JourneyStep {
  step: number
  name: string
  question: string
  description: string
  icon: typeof Search
  color: string
  passCriteria: string
  failExample: string
}

const journeySteps: JourneyStep[] = [
  {
    step: 1,
    name: 'FIND',
    question: 'Can the agent discover this business exists?',
    description:
      'The agent needs to know the business exists and what it does. This requires structured data: Schema.org markup, Google Business Profile, agent-card.json, llms.txt, or inclusion in an agent-searchable registry. If the business has no machine-readable presence, the agent will never recommend it.',
    icon: Search,
    color: 'amber',
    passCriteria: 'Agent card, Schema.org markup, or Google Business Profile with structured data.',
    failExample: 'A business with only a static HTML website and no structured metadata. Agents searching for this type of service will never find it.',
  },
  {
    step: 2,
    name: 'UNDERSTAND',
    question: 'Can the agent parse what the business offers, at what price, and availability?',
    description:
      'Once found, the agent needs to understand the specifics: what products or services are available, what they cost, and whether they are in stock or have open time slots. This data must be structured — JSON, XML feeds, or Schema.org — not embedded in HTML paragraphs or PDF documents.',
    icon: Eye,
    color: 'yellow',
    passCriteria: 'Structured product catalog, service list, or menu with prices, descriptions, and availability.',
    failExample: 'A restaurant whose menu is a scanned PDF image. The agent can see the restaurant exists but cannot determine the dishes, prices, or allergen information.',
  },
  {
    step: 3,
    name: 'SIGN UP',
    question: 'Can the agent create an account or start a relationship programmatically?',
    description:
      'Many businesses require signup, registration, or account creation before transacting. If this process is purely GUI-based (CAPTCHA, email verification, identity upload), an agent cannot complete it. Agent-ready signup means API-accessible account creation or token-based access.',
    icon: UserPlus,
    color: 'emerald',
    passCriteria: 'API-based signup, OAuth flow, or API key provisioning without human-only verification.',
    failExample: 'A SaaS that requires clicking a verification email, completing a CAPTCHA, and uploading a photo ID. The agent cannot proceed past the first screen.',
  },
  {
    step: 4,
    name: 'CONNECT',
    question: 'Can the agent authenticate and establish a working connection?',
    description:
      'The agent needs credentials (API keys, OAuth tokens) and a stable endpoint to interact with. The API must return structured responses — JSON with consistent error formats, not HTML error pages. Rate limiting, versioning, and authentication must be predictable and documented.',
    icon: Zap,
    color: 'blue',
    passCriteria: 'REST or MCP endpoints with API key auth, JSON responses, and documented error codes.',
    failExample: 'An API that returns HTML error pages, has no rate limit headers, and requires cookie-based session auth that expires every 15 minutes.',
  },
  {
    step: 5,
    name: 'USE',
    question: 'Can the agent perform the core action: book, order, query, or transact?',
    description:
      'This is where value is created. The agent needs to be able to do something: place an order, book an appointment, run a query, or trigger a workflow. The API must support the primary use case end-to-end with programmatic input and structured output.',
    icon: ShoppingCart,
    color: 'purple',
    passCriteria: 'Functional API endpoints for the core business action with input validation and confirmation responses.',
    failExample: 'A booking system that accepts the reservation request but only confirms via email 24 hours later with no API-queryable status.',
  },
  {
    step: 6,
    name: 'PAY',
    question: 'Can the agent complete payment programmatically?',
    description:
      'The final step. If the transaction requires payment, the agent must be able to pay without a human entering credit card details into a web form. This means Stripe, Square, or similar programmatic payment processing. Some business models skip this step (freemium, invoice later), but most agent-driven transactions end in payment.',
    icon: CreditCard,
    color: 'emerald',
    passCriteria: 'Stripe, Square, or direct payment API. Pre-authorized payments, wallet-based billing, or x402 micropayments.',
    failExample: 'A checkout flow that requires filling out a web form with credit card numbers, billing address, and a CAPTCHA. No agent can complete this.',
  },
]

// ---------------------------------------------------------------------------
// FAQ Data
// ---------------------------------------------------------------------------

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is agent readiness?',
    answer:
      'Agent readiness is a measure of how prepared a business is to be discovered, understood, and transacted with by AI agents. It covers 9 dimensions from API quality to payment processing, scored on a 0-100 scale. A high agent readiness score means AI agents can find your business, understand your offerings, and complete transactions without human intervention.',
  },
  {
    question: 'Why does agent readiness matter?',
    answer:
      'AI agents are learning to shop, book, and pay on behalf of users. When a user asks an AI agent to find a plumber, book a restaurant, or compare SaaS tools, the agent looks for businesses with structured, machine-readable data. Businesses that are not agent-ready will be invisible to this growing channel — losing customers to competitors that agents can actually interact with.',
  },
  {
    question: 'How is agent readiness different from SEO?',
    answer:
      'SEO optimizes for search engine crawlers that display results for humans to click. Agent readiness optimizes for AI agents that act on behalf of humans — finding, comparing, booking, and paying without the human ever visiting a website. SEO gets you ranked. Agent readiness gets you booked.',
  },
  {
    question: 'How is agent readiness different from web accessibility?',
    answer:
      'Web accessibility (WCAG) ensures humans with disabilities can use your website. Agent readiness ensures AI agents can use your business programmatically. Accessibility is about screen readers and keyboard navigation. Agent readiness is about APIs, structured data, and machine-readable pricing. Both matter, but they solve different problems.',
  },
  {
    question: 'What are the 7 ARL levels?',
    answer:
      'ARL (Agent Readiness Level) is a 7-step progression: ARL-0 Dark (invisible), ARL-1 Discoverable (findable), ARL-2 Readable (structured offerings), ARL-3 Bookable (can transact), ARL-4 Transactable (full payment cycle), ARL-5 Autonomous (relationship management), ARL-6 Interoperable (agent-to-agent communication). Each level is cumulative.',
  },
  {
    question: 'What is a good Agent Readiness Score?',
    answer:
      'The average score across 238 scanned businesses is 42/100 (Bronze tier). Silver (60+) means agents can complete basic transactions. Gold (75+) means full lifecycle management. Platinum (90+) means the business is a model of agent readiness. The top-scoring businesses today are Supabase (69), Vercel (69), Slack (68), and Stripe (68).',
  },
  {
    question: 'How do I check my Agent Readiness Score?',
    answer:
      'Go to agenthermes.ai/audit and enter your business URL. The scanner probes 9 dimensions in about 10 seconds and gives you a score, an ARL level, and specific recommendations. The scan is free and unlimited.',
  },
  {
    question: 'What is an MCP server and why does it matter?',
    answer:
      'MCP (Model Context Protocol) is the standard for AI agents to call business tools. An MCP server exposes your business capabilities — like booking, ordering, or querying — as structured tools that any AI agent can call. Without an MCP server, agents must scrape your website. With one, they interact cleanly and reliably.',
  },
  {
    question: 'How long does it take to become agent-ready?',
    answer:
      'With AgentHermes, you can go from ARL-0 to ARL-3 in 60 seconds. Enter your business details, and the platform generates your MCP endpoint, agent card, llms.txt, and registry listing automatically. Deeper integration (connecting your real-time inventory or booking system) takes longer but starts delivering value immediately.',
  },
  {
    question: 'Does agent readiness replace my website?',
    answer:
      'No. Agent readiness adds a machine-readable layer on top of your existing business. Your website continues to serve human visitors. Agent readiness makes the same information available to AI agents in a structured format they can act on. Think of it as a second front door — one for humans (your website) and one for agents (your MCP server and agent card).',
  },
]

// ---------------------------------------------------------------------------
// Scoring Dimensions
// ---------------------------------------------------------------------------

interface ScoringDimension {
  id: string
  name: string
  weight: string
  description: string
  icon: typeof Globe
  color: string
}

const scoringDimensions: ScoringDimension[] = [
  { id: 'D1', name: 'Discovery', weight: '12%', description: 'Can agents find the business? Agent cards, Schema.org, llms.txt, AGENTS.md, registry presence.', icon: Globe, color: 'amber' },
  { id: 'D2', name: 'API Quality', weight: '15%', description: 'Are there clean, callable API endpoints with consistent JSON responses and proper error codes?', icon: Zap, color: 'emerald' },
  { id: 'D3', name: 'Onboarding', weight: '8%', description: 'Can an agent create an account, get credentials, and start using the service programmatically?', icon: UserPlus, color: 'blue' },
  { id: 'D4', name: 'Pricing Transparency', weight: '5%', description: 'Is pricing structured and machine-readable, not buried in "Contact Sales" buttons?', icon: DollarSign, color: 'yellow' },
  { id: 'D5', name: 'Payment', weight: '8%', description: 'Can agents pay programmatically via Stripe, Square, x402, or similar payment APIs?', icon: CreditCard, color: 'purple' },
  { id: 'D6', name: 'Data Quality', weight: '10%', description: 'Are product/service listings structured with consistent schemas, descriptions, and availability?', icon: BarChart3, color: 'cyan' },
  { id: 'D7', name: 'Security', weight: '12%', description: 'TLS, proper authentication, rate limiting, secure credential management, no leaked secrets.', icon: Shield, color: 'red' },
  { id: 'D8', name: 'Reliability', weight: '13%', description: 'Uptime, response time, consistent behavior. Can agents depend on this service?', icon: CheckCircle2, color: 'emerald' },
  { id: 'D9', name: 'Agent Experience', weight: '10%', description: 'SDKs, error handling, tracing, webhooks. How easy is it for agents to integrate deeply?', icon: Bot, color: 'purple' },
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

export default function WhatIsAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Is Agent Readiness? The Complete Guide',
    description:
      'The definitive guide to agent readiness: what it is, why it matters, the 7 ARL levels, the 6-step agent journey, 9 scoring dimensions, and how 238 businesses scored an average of 42/100.',
    datePublished: '2026-03-30',
    dateModified: '2026-03-30',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/what-is-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Guide',
    wordCount: 4000,
    keywords: 'agent readiness, ARL levels, agent readiness score, AI agents, MCP server, agent economy',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'What Is Agent Readiness?',
          item: 'https://agenthermes.ai/blog/what-is-agent-readiness',
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
      title="What Is Agent Readiness? The Complete Guide"
      shareUrl="https://agenthermes.ai/blog/what-is-agent-readiness"
      currentHref="/blog/what-is-agent-readiness"
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
            <span className="text-zinc-400">What Is Agent Readiness?</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Layers className="h-3.5 w-3.5" />
              Complete Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              Definitive Resource
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            What Is Agent Readiness?{' '}
            <span className="text-emerald-500">The Complete Guide</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-4">
            Agent readiness is how prepared a business is to be discovered, understood, and
            transacted with by AI agents. It is the new competitive dimension that determines
            whether your business participates in the agent economy — or gets left behind.
          </p>

          <p className="text-base text-zinc-500 leading-relaxed tracking-tight max-w-3xl mb-6">
            This guide covers everything you need to know: why agent readiness matters, the
            7-level ARL framework, the 6-step agent journey, 9 scoring dimensions, and the
            $6.2B market opportunity. Based on data from scanning 238+ real businesses.
          </p>

          {/* Author byline */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
            <div className="author-avatar">AH</div>
            <div>
              <div className="text-sm font-semibold text-zinc-200">AgentHermes Research</div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  March 30, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  18 min read
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
              In This Guide
            </h2>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'Why Agent Readiness Matters', href: '#why-it-matters' },
                { label: 'The 6-Step Agent Journey', href: '#agent-journey' },
                { label: 'The 7 ARL Levels', href: '#arl-levels' },
                { label: 'The 9 Scoring Dimensions', href: '#scoring' },
                { label: 'Agent Readiness vs SEO', href: '#vs-seo' },
                { label: 'Agent Readiness vs Accessibility', href: '#vs-accessibility' },
                { label: 'Industry Data: 238 Businesses', href: '#industry-data' },
                { label: 'The $6.2B Market Opportunity', href: '#market' },
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

      {/* ===== WHY IT MATTERS ===== */}
      <section id="why-it-matters" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-emerald-500" />
            Why Agent Readiness Matters
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              AI agents are learning to shop, book, and pay. Not in theory — right now. When a
              user tells ChatGPT &ldquo;find me a plumber in Austin who can come today,&rdquo;
              the AI agent goes looking for structured data it can parse. It checks for
              Schema.org markup, reads Google Business Profiles, scans for API endpoints,
              and looks for machine-readable service listings. The businesses with structured
              data get recommended. The businesses without it get skipped.
            </p>
            <p>
              This is the same pattern that played out with search engines in the 2000s. When
              Google became the primary way people found businesses, the businesses with
              websites got found and the businesses without them disappeared. SEO became a
              multi-billion-dollar industry overnight. Agent readiness is the next version
              of this pattern — but instead of optimizing for humans who click search results,
              you are optimizing for AI agents who <strong className="text-zinc-100">act</strong> on
              behalf of humans.
            </p>
            <p>
              The difference is speed. SEO took 10 years to become table stakes. Agent readiness
              will take 2-3 years. AI agents are being deployed by every major tech company
              simultaneously — Apple, Google, Amazon, Microsoft, Anthropic, OpenAI. Each is
              building agents that need to interact with businesses. The businesses that are
              ready will capture this wave. The businesses that are not will lose customers
              they never even know existed.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Agents are learning to transact', detail: 'AI agents can already search, compare, and in some cases book and pay. Each month brings new capabilities.', icon: Bot },
              { label: 'Invisible businesses lose', detail: 'If an agent cannot find your business in structured data, it recommends your competitor. You never know what you lost.', icon: EyeOff },
              { label: 'The window is closing', detail: 'First movers in SEO dominated for a decade. First movers in agent readiness will have the same compounding advantage.', icon: TrendingUp },
            ].map((item) => (
              <div key={item.label} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <item.icon className="h-5 w-5 text-emerald-500 mb-3" />
                <h3 className="text-sm font-bold text-zinc-100 mb-2">{item.label}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6-STEP AGENT JOURNEY ===== */}
      <section id="agent-journey" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-emerald-500" />
            The 6-Step Agent Journey
          </h2>

          <p className="text-zinc-400 mb-8 leading-relaxed">
            Every AI agent follows a predictable 6-step journey when interacting with a business.
            Most businesses fail at step 1 — agents cannot even find them. Understanding where
            your business breaks in this journey is the key to improving your agent readiness.
          </p>

          <div className="space-y-4">
            {journeySteps.map((step) => {
              const colors = getColorClasses(step.color)
              return (
                <div
                  key={step.step}
                  className={`p-5 sm:p-6 rounded-xl bg-zinc-900/50 border ${colors.border}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Step badge */}
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.bg} border ${colors.border}`}>
                      <step.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold ${colors.text}`}>Step {step.step}</span>
                        <h3 className="text-lg font-bold text-zinc-100">{step.name}</h3>
                      </div>
                      <p className={`text-sm font-medium ${colors.text} mb-3`}>{step.question}</p>
                      <p className="text-sm text-zinc-400 leading-relaxed mb-4">{step.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                          <p className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Pass
                          </p>
                          <p className="text-xs text-zinc-500 leading-relaxed">{step.passCriteria}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                          <p className="text-xs font-semibold text-red-400 mb-1 flex items-center gap-1">
                            <EyeOff className="h-3 w-3" />
                            Fail
                          </p>
                          <p className="text-xs text-zinc-500 leading-relaxed">{step.failExample}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">Most businesses fail at step 1 or 2.</strong> Our
              data shows that 63% of businesses we scan cannot even be found by agents (step 1),
              and another 20% are findable but have no structured offerings for agents to read
              (step 2). Only 8% of businesses are ready for agents to actually transact with them
              at step 5 or 6.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 7 ARL LEVELS ===== */}
      <section id="arl-levels" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-6 w-6 text-emerald-500" />
            The 7 Agent Readiness Levels (ARL)
          </h2>

          <p className="text-zinc-400 mb-8 leading-relaxed">
            The Agent Readiness Level (ARL) framework measures where a business falls on the
            spectrum from completely invisible to fully interoperable. Each level is cumulative —
            you cannot be ARL-4 without meeting all requirements for ARL-0 through ARL-3.
          </p>

          {/* Compact level cards */}
          <div className="space-y-3">
            {arlSummaries.map((arl) => {
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
                      <p className="text-sm text-zinc-400 leading-relaxed mb-2">{arl.oneLiner}</p>
                      <p className="text-xs text-zinc-600 leading-relaxed italic">{arl.example}</p>
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
          </div>
        </div>
      </section>

      {/* ===== 9 SCORING DIMENSIONS ===== */}
      <section id="scoring" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
            The 9 Scoring Dimensions
          </h2>

          <p className="text-zinc-400 mb-8 leading-relaxed">
            The Agent Readiness Score is a weighted composite of 9 dimensions. Each dimension
            measures a different aspect of how well a business can interact with AI agents.
            The weights reflect real-world importance — API Quality (15%) matters more than
            Pricing Transparency (5%) because agents need callable endpoints before they
            need to compare prices.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {scoringDimensions.map((dim) => {
              const colors = getColorClasses(dim.color)
              return (
                <div
                  key={dim.id}
                  className={`p-4 rounded-xl bg-zinc-900/50 border ${colors.border}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <dim.icon className={`h-4 w-4 ${colors.text}`} />
                      <span className="text-sm font-bold text-zinc-100">{dim.name}</span>
                    </div>
                    <span className={`text-xs font-bold ${colors.text}`}>{dim.weight}</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">{dim.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-6 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <h3 className="text-sm font-bold text-zinc-200 mb-2">Score Tiers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { tier: 'Platinum', range: '90+', color: 'text-emerald-400' },
                { tier: 'Gold', range: '75-89', color: 'text-yellow-400' },
                { tier: 'Silver', range: '60-74', color: 'text-zinc-300' },
                { tier: 'Bronze', range: '40-59', color: 'text-amber-400' },
                { tier: 'Not Scored', range: '0-39', color: 'text-red-400' },
              ].map((t) => (
                <div key={t.tier} className="text-center p-2 rounded-lg bg-zinc-800/30">
                  <p className={`text-sm font-bold ${t.color}`}>{t.tier}</p>
                  <p className="text-xs text-zinc-600">{t.range}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== VS SEO ===== */}
      <section id="vs-seo" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Search className="h-6 w-6 text-amber-400" />
            How Agent Readiness Differs from SEO
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              SEO and agent readiness solve related but fundamentally different problems. SEO
              optimizes for search engine crawlers that rank pages for humans to click. Agent
              readiness optimizes for AI agents that <strong className="text-zinc-100">act on behalf
              of humans</strong> — finding, comparing, booking, and paying without the human ever
              visiting a website.
            </p>
            <p>
              The key difference: with SEO, the human makes the final decision and takes the
              action (clicking, reading, buying). With agent readiness, the agent makes
              the recommendation AND takes the action. The business that is agent-ready gets
              booked directly. The business that only has good SEO gets listed in results
              that the human may or may not click on — and even if they do, they still have
              to complete the transaction manually.
            </p>
          </div>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="py-3 px-4 text-left text-zinc-500 font-medium">Dimension</th>
                  <th className="py-3 px-4 text-left text-zinc-500 font-medium">SEO</th>
                  <th className="py-3 px-4 text-left text-zinc-500 font-medium">Agent Readiness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {[
                  { dim: 'Audience', seo: 'Search engine crawlers', ar: 'AI agents acting for users' },
                  { dim: 'Goal', seo: 'Rank high in search results', ar: 'Be selected and transacted with by agents' },
                  { dim: 'Outcome', seo: 'Human clicks a link and visits site', ar: 'Agent completes the transaction directly' },
                  { dim: 'Format', seo: 'HTML, meta tags, backlinks', ar: 'JSON APIs, MCP tools, agent cards, llms.txt' },
                  { dim: 'Key metric', seo: 'Click-through rate', ar: 'Transaction completion rate' },
                  { dim: 'Timeframe', seo: 'Became critical 2005-2010', ar: 'Becoming critical 2025-2028' },
                  { dim: 'Revenue model', seo: 'Traffic to conversion funnel', ar: 'Direct agent-to-business transactions' },
                ].map((row) => (
                  <tr key={row.dim}>
                    <td className="py-3 px-4 text-zinc-300 font-medium">{row.dim}</td>
                    <td className="py-3 px-4 text-zinc-500">{row.seo}</td>
                    <td className="py-3 px-4 text-emerald-400">{row.ar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">They are complementary, not competing.</strong> A
              business should have both strong SEO and high agent readiness. SEO captures the
              users who search and browse. Agent readiness captures the users who delegate to
              AI agents. As agent usage grows, the share of business that flows through agents
              (rather than search results) will increase every year.
            </p>
          </div>
        </div>
      </section>

      {/* ===== VS ACCESSIBILITY ===== */}
      <section id="vs-accessibility" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-400" />
            How Agent Readiness Differs from Web Accessibility
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Web accessibility (WCAG) and agent readiness both involve making content available
              to non-traditional consumers — but they serve different audiences and require
              different implementations.
            </p>
            <p>
              Accessibility ensures that <strong className="text-zinc-100">humans with disabilities</strong>{' '}
              can perceive, navigate, and interact with websites. It focuses on screen readers,
              keyboard navigation, color contrast, and alt text. Agent readiness ensures
              that <strong className="text-zinc-100">AI software agents</strong> can discover,
              understand, and transact with businesses. It focuses on structured data, APIs,
              machine-readable pricing, and programmatic payment.
            </p>
            <p>
              An accessible website might have perfect ARIA labels and screen reader support,
              but still be completely invisible to AI agents because it has no structured
              product data, no API, and no machine-readable pricing. Conversely, a business
              with excellent agent readiness (clean APIs, MCP server, structured data) might
              have a website that fails basic accessibility audits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <h3 className="text-sm font-bold text-blue-400 mb-3">Web Accessibility (WCAG)</h3>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-blue-400" />Audience: Humans with disabilities</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-blue-400" />Tools: Screen readers, keyboard, switches</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-blue-400" />Standards: WCAG 2.1, ARIA, Section 508</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-blue-400" />Focus: Perceivable, operable, understandable UI</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-blue-400" />Legal: ADA compliance requirements</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="text-sm font-bold text-emerald-400 mb-3">Agent Readiness (ARL)</h3>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-400" />Audience: AI agents acting for users</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-400" />Tools: MCP clients, API callers, A2A agents</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-400" />Standards: MCP, A2A, Schema.org, OpenAPI</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-400" />Focus: Structured data, APIs, programmatic access</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-400" />Legal: No requirements yet (emerging field)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRY DATA ===== */}
      <section id="industry-data" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
            Industry Data: 238 Businesses Scanned
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              We have scanned 238 businesses across 15+ verticals using the AgentHermes 9-dimension
              scanner. The data paints a clear picture: most businesses are not ready for the
              agent economy.
            </p>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { value: '238+', label: 'businesses scanned', color: 'text-emerald-400' },
              { value: '42/100', label: 'average score', color: 'text-amber-400' },
              { value: '15+', label: 'verticals covered', color: 'text-blue-400' },
              { value: '8%', label: 'above ARL-3', color: 'text-purple-400' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-xs text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Distribution */}
          <h3 className="text-lg font-bold mb-4">Score Distribution</h3>
          <div className="space-y-3 mb-8">
            {[
              { range: '0-19 (Not Scored)', pct: 22, color: 'bg-red-500' },
              { range: '20-39 (Not Scored)', pct: 31, color: 'bg-amber-500' },
              { range: '40-59 (Bronze)', pct: 28, color: 'bg-yellow-500' },
              { range: '60-74 (Silver)', pct: 14, color: 'bg-blue-500' },
              { range: '75-89 (Gold)', pct: 4, color: 'bg-purple-500' },
              { range: '90+ (Platinum)', pct: 1, color: 'bg-emerald-500' },
            ].map((row) => (
              <div key={row.range} className="flex items-center gap-3">
                <span className="w-36 text-sm text-zinc-400 shrink-0">{row.range}</span>
                <div className="flex-1 h-6 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${row.color} flex items-center justify-end pr-2`}
                    style={{ width: `${Math.max(row.pct, 3)}%` }}
                  >
                    <span className="text-xs font-bold text-white">{row.pct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Top performers */}
          <h3 className="text-lg font-bold mb-4">Top Performers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { name: 'Supabase', score: 69, tier: 'Silver' },
              { name: 'Vercel', score: 69, tier: 'Silver' },
              { name: 'Slack', score: 68, tier: 'Silver' },
              { name: 'Stripe', score: 68, tier: 'Silver' },
            ].map((biz) => (
              <div key={biz.name} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
                <p className="text-sm font-bold text-zinc-100 mb-1">{biz.name}</p>
                <p className="text-2xl font-bold text-emerald-400">{biz.score}</p>
                <p className="text-xs text-zinc-500">{biz.tier}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <p className="text-sm text-zinc-400 leading-relaxed">
              <strong className="text-zinc-200">Even the best score only 69.</strong> No business in our
              database has achieved Gold (75+) or Platinum (90+) status. The highest-scoring
              businesses — major tech platforms with mature APIs — still lack agent-native
              features like A2A agent cards and MCP servers. This is an industry in its earliest
              days. The opportunity to lead is wide open.
            </p>
          </div>
        </div>
      </section>

      {/* ===== MARKET OPPORTUNITY ===== */}
      <section id="market" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-emerald-500" />
            The $6.2B Market Opportunity
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              There are 33 million small businesses in the United States alone. Globally, the
              number exceeds 400 million. Currently, zero of them have MCP servers. Zero have
              A2A agent cards. Zero are fully interoperable with AI agents.
            </p>
            <p>
              The market for agent readiness infrastructure is conservatively estimated at $6.2B
              annually in the US alone. This includes the SaaS revenue from providing agent
              readiness tools ($99-499/month per business), the per-transaction fees from
              agent-mediated bookings and purchases, and the enterprise consulting revenue from
              helping larger organizations build agent-ready architectures.
            </p>
            <p>
              This mirrors the SEO tools market ($80B+ industry) but with a critical difference:
              agent readiness has a much clearer ROI. With SEO, the connection between
              &ldquo;higher ranking&rdquo; and &ldquo;more revenue&rdquo; is indirect and hard to
              measure. With agent readiness, every agent-mediated transaction is directly
              attributable. You can measure exactly how many bookings, orders, and payments
              came through agent channels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                label: 'Small businesses (US)',
                value: '33M',
                detail: 'Zero have MCP servers. Each is a potential customer for agent readiness infrastructure.',
                icon: Server,
              },
              {
                label: 'Annual market (US)',
                value: '$6.2B',
                detail: 'SaaS subscriptions + per-transaction fees + enterprise consulting across all verticals.',
                icon: DollarSign,
              },
              {
                label: 'Verticals addressable',
                value: '50+',
                detail: 'Restaurants, home services, healthcare, legal, auto, real estate, fitness, beauty, and more.',
                icon: Target,
              },
            ].map((item) => (
              <div key={item.label} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <item.icon className="h-5 w-5 text-emerald-500 mb-3" />
                <p className="text-2xl font-bold text-zinc-100 mb-1">{item.value}</p>
                <p className="text-xs text-zinc-500 font-medium mb-2">{item.label}</p>
                <p className="text-xs text-zinc-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">This is a land-grab moment.</strong> The businesses
              and platforms that establish agent readiness infrastructure now will own the
              relationships with millions of businesses as the agent economy matures. Just as
              Shopify captured e-commerce infrastructure and Square captured payment
              infrastructure, the agent readiness layer will be owned by whoever moves fastest.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO CHECK YOUR SCORE ===== */}
      <section id="check-score" className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-emerald-500" />
            How to Check Your Agent Readiness Score
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Checking your Agent Readiness Score is free and takes about 10 seconds. The
              AgentHermes scanner probes your business across all 9 dimensions, calculates
              your composite score, assigns your ARL level, and provides specific
              recommendations for improvement.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { step: '1', title: 'Enter your URL', detail: 'Go to agenthermes.ai/audit and enter your business website.', color: 'emerald' },
              { step: '2', title: 'Run the scan', detail: '9-dimension scan probes discovery, API, auth, pricing, payment, data, security, reliability, and agent experience.', color: 'blue' },
              { step: '3', title: 'Get your score', detail: 'See your composite score (0-100), ARL level (0-6), tier, and dimension breakdown.', color: 'purple' },
              { step: '4', title: 'Take action', detail: 'Follow the prioritized recommendations to improve each dimension and advance your ARL.', color: 'amber' },
            ].map((item) => (
              <div key={item.step} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-${item.color}-500/10 border border-${item.color}-500/20 text-${item.color}-400 font-bold text-sm mb-3`}>
                  {item.step}
                </div>
                <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <p className="text-zinc-400 leading-relaxed mb-8">
            Your score page is permanent — accessible at{' '}
            <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
              agenthermes.ai/score/yourdomain.com</code>. Share it with your team, your agency,
            or your board. Re-scan any time to track improvement.
          </p>

          <div className="text-center">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-lg transition-colors"
            >
              Check My Agent Readiness Score
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
              {
                title: 'What Agent-Ready Means for Restaurants',
                href: '/blog/agent-ready-restaurants',
                tag: 'Industry',
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
            How agent-ready is your business?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score in 60 seconds. See your score across all
            9 dimensions, your ARL level, and exactly what to fix first.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Score My Business
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              View Leaderboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
