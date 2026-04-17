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
  MessageSquare,
  Network,
  Server,
  Shield,
  Sparkles,
  Target,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'AI Agents vs Chatbots: Why Agent Readiness Is Not About Adding a Chat Widget | AgentHermes',
  description:
    'Businesses confuse chatbots with AI agents. A chatbot sits on YOUR site for human customers. An agent calls your API from THEIR system. This distinction is why Stripe scores 68 while chatbot-only businesses score under 30.',
  keywords: [
    'AI agents vs chatbots business',
    'AI agents vs chatbots',
    'chatbot vs AI agent difference',
    'agent readiness chatbot',
    'AI agent API integration',
    'chatbot widget vs API',
    'agent economy chatbot',
    'business AI readiness',
  ],
  openGraph: {
    title: 'AI Agents vs Chatbots: Why Agent Readiness Is Not About Adding a Chat Widget',
    description:
      'A chatbot sits on YOUR site. An agent calls your API from THEIR system. This distinction is why agent readiness scores businesses that have never thought about chatbots.',
    url: 'https://agenthermes.ai/blog/ai-agents-vs-chatbots',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Agents vs Chatbots',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agents vs Chatbots: Why Agent Readiness Is Not About Adding a Chat Widget',
    description:
      'Chatbots are UI widgets for humans. AI agents are autonomous programs that call your API. The difference changes everything about how you prepare.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/ai-agents-vs-chatbots',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const comparisonRows = [
  { aspect: 'Where it lives', chatbot: 'Embedded on your website as a widget', agent: 'Runs on someone else\'s system (Claude, ChatGPT, custom agent)' },
  { aspect: 'Who initiates', chatbot: 'Human clicks the chat bubble', agent: 'Agent autonomously discovers and calls your API' },
  { aspect: 'Communication', chatbot: 'Natural language chat in a UI', agent: 'Structured API calls with typed parameters' },
  { aspect: 'Data format', chatbot: 'Free-text conversation', agent: 'JSON requests and responses' },
  { aspect: 'Authentication', chatbot: 'None (or session cookie)', agent: 'Bearer token, API key, or OAuth' },
  { aspect: 'Transactions', chatbot: 'Redirects to checkout page', agent: 'Calls create_order() endpoint directly' },
  { aspect: 'Discovery', chatbot: 'Human finds your website first', agent: 'Agent finds your API via agent-card.json, MCP, llms.txt' },
  { aspect: 'Scale', chatbot: 'One conversation at a time', agent: 'Thousands of parallel API calls' },
]

const misconceptions = [
  {
    myth: 'Adding Intercom means we are AI-ready',
    reality: 'Intercom is a chat widget for human support. It does not expose any API endpoint that an external AI agent can call. A business with Intercom and no API scores the same as a business with no Intercom — both are invisible to agents.',
    icon: MessageSquare,
  },
  {
    myth: 'Our chatbot uses GPT, so we are agent-ready',
    reality: 'A GPT-powered chatbot on your website is still a chatbot — it helps humans on your site. Agent readiness measures whether external AI agents can discover and use your business programmatically. The chatbot\'s AI is irrelevant if there is no API to call.',
    icon: Bot,
  },
  {
    myth: 'We have a FAQ page, agents can read it',
    reality: 'Agents can read your FAQ but they cannot act on it. Reading "We offer free shipping on orders over $50" is not the same as calling get_shipping_rates({ order_total: 75 }) and receiving a structured response. Information is not interaction.',
    icon: Globe,
  },
  {
    myth: 'Voice assistants and agents are the same thing',
    reality: 'Siri, Alexa, and Google Assistant are voice interfaces for humans. AI agents are autonomous programs that complete multi-step tasks. An agent might use a voice assistant as one tool among many, but they are fundamentally different. Agent readiness is about API infrastructure, not voice UI.',
    icon: Zap,
  },
]

const scoreComparison = [
  { name: 'Stripe', type: 'API-first (no chatbot)', score: 68, tier: 'Silver', reason: 'Full REST API, OAuth, OpenAPI spec, structured errors, webhooks, rate-limit headers, status page. Zero chat widgets.' },
  { name: 'Resend', type: 'API-first (no chatbot)', score: 75, tier: 'Gold', reason: 'The only Gold-tier business in 500 scans. Clean REST API, API key auth, llms.txt, MCP tools. No chatbot needed.' },
  { name: 'Intercom', type: 'Chatbot company', score: 38, tier: 'Not Scored', reason: 'Ironic: the company that sells chatbots to everyone else has decent APIs but poor agent discovery. No agent-card.json, no MCP server, no llms.txt.' },
  { name: 'Drift (Salesloft)', type: 'Chatbot company', score: 24, tier: 'Not Scored', reason: 'Conversational marketing platform with minimal API surface. Agents cannot discover capabilities, cannot authenticate self-service, cannot interact programmatically.' },
  { name: 'Zendesk', type: 'Support + chatbot', score: 41, tier: 'Bronze', reason: 'Has APIs for ticketing and knowledge base. Decent D2. But chat widget dominance means no investment in agent-native discovery or MCP.' },
  { name: 'Average chatbot-only business', type: 'Chat widget, no API', score: 18, tier: 'Not Scored', reason: 'Website with Intercom/Drift/Tidio embed. No API endpoints, no structured data, no agent discovery files. Completely invisible.' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Can a chatbot make a business agent-ready?',
    answer:
      'No. A chatbot is a user interface for humans visiting your website. Agent readiness measures whether external AI agents — programs running on other systems — can discover, authenticate, and interact with your business through structured APIs. A chatbot and an API serve fundamentally different audiences through fundamentally different channels.',
  },
  {
    question: 'Should I remove my chatbot and build an API instead?',
    answer:
      'No — keep the chatbot for human visitors. But recognize that it does not serve the agent economy at all. You need both: a chatbot for humans who visit your website, and an API (ideally with an MCP server) for AI agents that interact with your business programmatically. They are complementary channels, not substitutes.',
  },
  {
    question: 'Why does Stripe score 68 without any chatbot?',
    answer:
      'Because agent readiness is about API infrastructure, not conversational UI. Stripe has a comprehensive REST API with OpenAPI spec, OAuth authentication, structured JSON errors, rate-limit headers, webhooks, a status page, and excellent documentation. These are exactly the signals AI agents need. Stripe never needed a chatbot because its entire business is built for programmatic interaction.',
  },
  {
    question: 'What if my chatbot has an API behind it?',
    answer:
      'If your chatbot is backed by a real API that external agents can call directly (not through the chat interface), then you have both channels covered. The API is what makes you agent-ready, not the chatbot. Make sure the API is discoverable — publish an agent-card.json, llms.txt, and ideally an MCP server so agents can find and use it without going through your chat widget.',
  },
  {
    question: 'Are AI agents going to replace chatbots?',
    answer:
      'Not replace — make them less important. Today, a customer visits your website and chats with your bot. In the agent economy, a customer tells their AI agent to handle the task, and the agent calls your API directly. The customer never visits your website at all. Businesses that only have a chatbot miss this entire channel. Businesses with APIs capture both.',
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AiAgentsVsChatbotsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AI Agents vs Chatbots: Why Agent Readiness Is Not About Adding a Chat Widget',
    description:
      'Businesses confuse chatbots with AI agents. A chatbot is a UI widget for humans on your website. An AI agent is an autonomous program that calls your API from its own system. This distinction changes everything about how businesses prepare for the agent economy.',
    datePublished: '2026-04-16',
    dateModified: '2026-04-16',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/ai-agents-vs-chatbots',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Education',
    wordCount: 1900,
    keywords:
      'AI agents vs chatbots business, AI agents vs chatbots, chatbot vs AI agent difference, agent readiness chatbot',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'AI Agents vs Chatbots',
          item: 'https://agenthermes.ai/blog/ai-agents-vs-chatbots',
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
      title="AI Agents vs Chatbots: Why Agent Readiness Is Not About Adding a Chat Widget"
      shareUrl="https://agenthermes.ai/blog/ai-agents-vs-chatbots"
      currentHref="/blog/ai-agents-vs-chatbots"
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
            <span className="text-zinc-400">AI Agents vs Chatbots</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <Bot className="h-3.5 w-3.5" />
              Education
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Common Misconception
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            AI Agents vs Chatbots:{' '}
            <span className="text-emerald-400">Why Agent Readiness Is Not About Adding a Chat Widget</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The most common misconception in the agent economy: businesses think &ldquo;AI ready&rdquo; means
            adding a chatbot to their website. <strong className="text-zinc-100">Wrong.</strong> A chatbot is a
            UI widget for human customers. An AI agent is an autonomous program that discovers and uses
            your API from its own system. A chatbot sits on <em>your</em> site. An agent calls your API
            from <em>their</em> system. This distinction changes everything.
          </p>

          {/* Author byline */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
            <div className="author-avatar">AH</div>
            <div>
              <div className="text-sm font-semibold text-zinc-200">AgentHermes Research</div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  April 16, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  12 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE CORE DISTINCTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-500" />
            The Fundamental Difference
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A <strong className="text-zinc-100">chatbot</strong> is an interface that lives on your website.
              A human visits your page, clicks the chat bubble, types a question, and gets an answer. The
              chatbot might use AI (GPT, Claude, etc.) to generate responses. But the flow is always the same:
              human comes to you, interacts through your UI, on your terms.
            </p>
            <p>
              An <strong className="text-zinc-100">AI agent</strong> is a program that acts autonomously on
              behalf of a user. When someone tells Claude &ldquo;find me the cheapest flight to Denver next
              Tuesday&rdquo; or asks ChatGPT to &ldquo;order 500 business cards from the best-rated
              printer,&rdquo; the AI agent goes out, discovers businesses that offer those services, evaluates
              them, and interacts with them — all without the human visiting any website.
            </p>
            <p>
              The agent does not click your chat bubble. It does not fill out your forms. It calls your API
              endpoints directly. If you do not have API endpoints,{' '}
              <Link href="/blog/invisible-to-ai-agents" className="text-emerald-400 hover:text-emerald-300 underline">
                you are invisible
              </Link>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-bold text-zinc-100">Chatbot</h3>
              </div>
              <ul className="space-y-2">
                {[
                  'Lives on your website',
                  'Human initiates conversation',
                  'Free-text chat interface',
                  'One conversation at a time',
                  'Requires human at keyboard',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                    <MessageSquare className="h-3.5 w-3.5 text-blue-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-zinc-100">AI Agent</h3>
              </div>
              <ul className="space-y-2">
                {[
                  'Runs on its own system',
                  'Agent discovers you autonomously',
                  'Structured API calls',
                  'Thousands of parallel requests',
                  'Operates without human intervention',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                    <Bot className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SIDE-BY-SIDE COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Chatbot vs AI Agent: Complete Comparison
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every dimension of interaction is different. This is not a spectrum — chatbots and AI agents
            are fundamentally different channels serving different audiences.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Aspect</div>
              <div className="text-blue-400">Chatbot</div>
              <div className="text-emerald-400">AI Agent</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500 text-xs sm:text-sm">{row.chatbot}</div>
                <div className="text-emerald-400 text-xs sm:text-sm">{row.agent}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOUR MISCONCEPTIONS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Four Misconceptions That Keep Businesses Invisible
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These are the most common responses we hear from businesses when we show them their agent
            readiness score. Every one of them confuses chatbot functionality with agent accessibility.
          </p>

          <div className="space-y-4 mb-8">
            {misconceptions.map((item) => (
              <div
                key={item.myth}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                    <item.icon className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-100">&ldquo;{item.myth}&rdquo;</h3>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.reality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE SCORE COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            The Scoreboard: API Companies vs Chatbot Companies
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              The data makes the distinction stark. Companies built around APIs consistently score Silver
              or above.{' '}
              <Link href="/blog/what-is-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Agent readiness
              </Link>{' '}
              rewards structured, programmatic interfaces — exactly what chatbot-only businesses lack.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {scoreComparison.map((company) => (
              <div
                key={company.name}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-base font-bold text-zinc-100">{company.name}</h3>
                    <span className="text-xs text-zinc-500">{company.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${
                      company.score >= 60 ? 'text-emerald-400' : company.score >= 40 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {company.score}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      company.tier === 'Gold'
                        ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                        : company.tier === 'Silver'
                          ? 'bg-zinc-400/10 border border-zinc-400/20 text-zinc-300'
                          : company.tier === 'Bronze'
                            ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                            : 'bg-zinc-700/50 border border-zinc-600/30 text-zinc-500'
                    }`}>
                      {company.tier}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{company.reason}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The pattern is clear:</strong> Stripe scores 68 with zero
              chat widgets. Chatbot companies themselves score 24-38. Adding a chatbot to a website does not
              move the Agent Readiness Score because the score measures{' '}
              <Link href="/blog/agent-journey-explained" className="text-emerald-400 hover:text-emerald-300 underline">
                the 6-step agent journey
              </Link>{' '}
              — Find, Understand, Sign Up, Connect, Use, Pay — and chatbots contribute to zero of those steps.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT TO BUILD INSTEAD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What to Build Instead of (or Alongside) a Chatbot
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Keep your chatbot — it serves human visitors well. But recognize that it covers exactly
              zero percent of the agent channel. Here is what agents actually need from your business:
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'A structured API with JSON responses',
                detail: 'Agents call endpoints, not chat bubbles. A REST API with consistent JSON responses, typed fields, and structured error messages. This is the foundation of agent readiness and the highest-weighted dimension (D2 = 15%).',
                icon: Code2,
              },
              {
                step: '2',
                title: 'Self-service authentication',
                detail: 'Agents cannot fill out a "Request API Access" form. They need programmatic credential provisioning — API keys via a signup endpoint, or OAuth client_credentials flow. No human in the loop.',
                icon: Shield,
              },
              {
                step: '3',
                title: 'Discovery files at your domain root',
                detail: 'agent-card.json tells agents what you offer. llms.txt provides a human-readable summary for LLMs. These are how agents find your business — the equivalent of SEO for the agent economy.',
                icon: Globe,
              },
              {
                step: '4',
                title: 'An MCP server with business-specific tools',
                detail: 'MCP (Model Context Protocol) servers expose your capabilities as tools agents can call directly. A restaurant gets book_table and get_menu tools. A shipping company gets track_shipment and get_rates. Agents discover these automatically.',
                icon: Server,
              },
              {
                step: '5',
                title: 'Webhooks for state changes',
                detail: 'Agents cannot sit on your website watching for updates. They need push notifications — webhooks that fire when orders ship, appointments change, or inventory updates. Real-time beats polling.',
                icon: Zap,
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
              None of these replace your chatbot. They complement it by opening an entirely new channel.
              Your chatbot handles humans who visit your website. Your API handles AI agents that interact
              with your business without visiting your website at all. Both channels grow independently.
              Ignoring either one means leaving revenue on the table.
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
                title: 'What Is Agent Readiness? The Complete Guide',
                href: '/blog/what-is-agent-readiness',
                tag: 'Complete Guide',
                tagColor: 'emerald',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
                tagColor: 'emerald',
              },
              {
                title: 'The 6-Step Agent Journey Every Business Should Know',
                href: '/blog/agent-journey-explained',
                tag: 'Framework',
                tagColor: 'purple',
              },
            ].map((article) => {
              const colorMap: Record<string, { text: string; bg: string; border: string }> = {
                emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
              }
              const colors = colorMap[article.tagColor] || colorMap.emerald
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
            Is your business visible to AI agents — or just humans?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see how your business scores across all 9 dimensions.
            A chatbot will not help. Find out what will.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Check My Score
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
