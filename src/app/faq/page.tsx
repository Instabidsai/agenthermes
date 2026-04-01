import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Code2,
  HelpCircle,
  Layers,
  Scale,
  Shield,
  Zap,
  type LucideIcon,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Agent Readiness & AI Commerce | AgentHermes',
  description:
    'Get answers to the most common questions about agent readiness, MCP, A2A, Agent Readiness Scores, hosted MCP, the gateway, and how to make your business AI-agent ready.',
  openGraph: {
    title: 'Frequently Asked Questions — AgentHermes',
    description:
      'Everything you need to know about making your business discoverable, usable, and payable by AI agents. 30+ questions answered.',
    url: 'https://agenthermes.ai/faq',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions — AgentHermes',
    description:
      'Everything you need to know about making your business discoverable, usable, and payable by AI agents. 30+ questions answered.',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/faq',
  },
}

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------
interface FAQItem {
  question: string
  answer: string
  slug: string
  link?: { href: string; label: string }
}

interface FAQCategory {
  title: string
  slug: string
  icon: LucideIcon
  color: string
  borderColor: string
  bgColor: string
  items: FAQItem[]
}

const faqCategories: FAQCategory[] = [
  {
    title: 'About Agent Readiness',
    slug: 'about-agent-readiness',
    icon: Shield,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/5',
    items: [
      {
        question: 'What is an Agent Readiness Score?',
        slug: 'what-is-agent-readiness-score',
        answer:
          'An Agent Readiness Score is a 0-100 metric that measures how prepared a business is for AI agent interaction. It evaluates nine dimensions: Discovery (can agents find you?), API Accessibility (can they use your services?), Onboarding (can they sign up?), Pricing Transparency (can they understand your costs?), Payment Protocols (can they pay you?), Data Quality (is your data structured?), Security (is the connection safe?), Reliability (are you consistently available?), and Agent Experience (is the integration smooth?). Scores map to five tiers: Platinum (90+), Gold (75-89), Silver (60-74), Bronze (40-59), and Not Scored (below 40).',
        link: { href: '/audit', label: 'Get your free score' },
      },
      {
        question: 'What is an ARL level?',
        slug: 'what-is-arl-level',
        answer:
          'ARL (Agent Readiness Level) is a 7-tier maturity framework that categorizes where a business sits on the path to full agent readiness. ARL-0 (Dark) means no web presence at all. ARL-1 (Static) is a basic website. ARL-2 (Structured) means you have structured data like Schema.org. ARL-3 (Accessible) means you have API endpoints. ARL-4 (Integrated) means you support agent protocols like MCP or A2A. ARL-5 (Autonomous) means agents can complete full workflows without human intervention. ARL-6 (Interoperable) means your business participates in multi-agent ecosystems.',
        link: { href: '/glossary#arl', label: 'See the full ARL definition' },
      },
      {
        question: 'How is the Agent Readiness Score calculated?',
        slug: 'how-is-score-calculated',
        answer:
          'The score is calculated across nine weighted dimensions organized in three tiers. Tier 1 (60% of total weight) covers the essentials: API Accessibility (15%), Reliability (13%), Security (12%), Data Quality (10%), and Agent Experience (10%). Tier 2 (25%) covers Discovery (12%), Onboarding (8%), and Pricing (5%). Tier 3 (15%) covers Payment Protocols (8%) and Agent-Native Bonuses (7%). Scores are adjusted for 27 different vertical profiles, so a restaurant is scored differently than a SaaS platform. Authentication-aware scoring gives partial credit for endpoints that return proper 401 responses with JSON.',
      },
      {
        question: 'What are the 6 steps in the agent journey?',
        slug: 'what-are-6-steps',
        answer:
          'The Agent Journey is the path an AI agent takes to do business with you: (1) FIND — Can the agent discover your business exists? This requires agent cards, llms.txt, and structured data. (2) UNDERSTAND — Can it comprehend what you offer? This needs clear service descriptions and pricing. (3) SIGN UP — Can it create an account or get access? This requires programmatic onboarding. (4) CONNECT — Can it establish a technical connection? This needs API endpoints or MCP tools. (5) USE — Can it actually invoke your services? This requires reliable, documented APIs. (6) PAY — Can it complete a transaction? This needs payment protocols like ACP, UCP, or x402.',
        link: { href: '/what-is-agent-ready', label: 'Full agent journey guide' },
      },
      {
        question: 'Is the scan free?',
        slug: 'is-scan-free',
        answer:
          'Yes, completely free. You can scan any URL and get a full Agent Readiness Score with no signup, no credit card, and no limit on scans. The score page includes your overall score, per-dimension breakdown, tier classification, specific recommendations for improvement, and a shareable badge. Free forever — this is our top-of-funnel product designed to help every business understand where they stand.',
        link: { href: '/audit', label: 'Scan now' },
      },
      {
        question: 'What does "Not Scored" mean?',
        slug: 'what-does-not-scored-mean',
        answer:
          'Not Scored is the tier for businesses that score below 40 out of 100. It means the business is largely invisible to AI agents — agents cannot reliably discover, understand, or interact with the business. This is where the majority of businesses are today. The average score across 139+ scanned businesses is just 39/100. Not Scored does not mean bad; it means you have significant room for improvement, and most of the steps to improve are straightforward.',
      },
    ],
  },
  {
    title: 'For Businesses',
    slug: 'for-businesses',
    icon: Building2,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/5',
    items: [
      {
        question: 'How do I make my business agent-ready?',
        slug: 'how-to-make-agent-ready',
        answer:
          'There are three paths depending on your technical level. (1) Score It: Start with a free scan at agenthermes.ai/audit to see where you stand and get specific recommendations. (2) Fix It: Use our auto-generation tools to create the files agents look for — agent cards, llms.txt, Schema.org markup, and MCP tool definitions. We have pre-built templates for 15 business verticals. (3) Connect It: List on the AgentHermes gateway and get hosted MCP — we run the agent infrastructure for you, so you don\'t need to deploy anything technical.',
        link: { href: '/remediate', label: 'Start fixing' },
      },
      {
        question: 'What if I don\'t have an API?',
        slug: 'what-if-no-api',
        answer:
          'You don\'t need one. AgentHermes provides multiple integration paths for businesses without APIs. Our Hosted MCP service creates MCP endpoints for you based on your business information. Our fulfillment routing system can forward agent requests to you via webhook, email, or lead capture form. Many of our highest-impact improvements — like adding llms.txt, an agent card, and Schema.org markup — require zero backend changes.',
        link: { href: '/connect', label: 'Connect without an API' },
      },
      {
        question: 'How long does it take to become agent-ready?',
        slug: 'how-long-does-it-take',
        answer:
          'It depends on your starting point. Adding basic discoverability (llms.txt, agent card, Schema.org) can be done in under an hour using our auto-generation tools. Getting a hosted MCP endpoint through our connect wizard takes about 15 minutes. Full ARL-4 integration with custom API endpoints, payment protocols, and multi-agent support could take days to weeks depending on your existing infrastructure. Most businesses can jump from Not Scored to Bronze or Silver tier in a single afternoon.',
      },
      {
        question: 'What\'s the free offer?',
        slug: 'whats-the-free-offer',
        answer:
          'Three things are completely free forever: (1) Unlimited Agent Readiness Score scans for any URL — see your score, get recommendations, share your badge. (2) Auto-generated agent files — we create llms.txt, agent-card.json, and agent-hermes.json files tailored to your business. (3) Listing in our Agent Card Registry — make your business discoverable by any agent that searches our network. Paid services include hosted MCP, gateway access, and premium support.',
        link: { href: '/pricing', label: 'See pricing' },
      },
      {
        question: 'What verticals do you support?',
        slug: 'what-verticals-supported',
        answer:
          'We have pre-built vertical templates for 15 business types: restaurants, HVAC, lawn care, plumbing, dental, legal, real estate, auto repair, salons, fitness, cleaning, pet services, SaaS, e-commerce, and professional services. Each template comes with 5-7 MCP tools specific to that vertical. Our scoring engine uses 27 vertical profiles to weight dimensions appropriately — a restaurant is scored differently than a SaaS platform. If your vertical isn\'t listed, our system adapts to generic business patterns.',
        link: { href: '/for', label: 'Browse verticals' },
      },
      {
        question: 'Do I need technical knowledge?',
        slug: 'do-i-need-technical-knowledge',
        answer:
          'No. Our connect wizard walks you through the process step by step. You select your business vertical, enter basic information about your services, and we generate everything — MCP tools, agent cards, llms.txt, and Schema.org markup. For hosted MCP, we run the infrastructure entirely. The only technical step is adding a few files to your website or updating DNS records, and we provide copy-paste instructions for that.',
      },
      {
        question: 'Why should I care about AI agents?',
        slug: 'why-should-i-care',
        answer:
          'AI agents are increasingly how consumers find and purchase services. When someone asks ChatGPT, Claude, or Google\'s AI to "find a plumber near me" or "book a restaurant for Friday," the AI agent searches for businesses it can actually interact with. If your business isn\'t agent-readable, you\'re invisible to this growing channel. The agent economy is projected to reach $3-5 trillion by 2030. Early adopters will capture market share that latecomers cannot recover.',
      },
    ],
  },
  {
    title: 'Technical',
    slug: 'technical',
    icon: Code2,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/5',
    items: [
      {
        question: 'What is MCP (Model Context Protocol)?',
        slug: 'what-is-mcp',
        answer:
          'MCP is Anthropic\'s open protocol for connecting AI models to external tools and data. Think of it as the "USB standard" for AI agents — a universal way for agents to discover and use tools. An MCP server exposes three types of capabilities: tools (actions like book_appointment or get_quote), resources (data the agent can read, like a menu or product catalog), and prompts (templates for common interactions). MCP supports both local (stdio) and remote (HTTP/SSE) transport.',
        link: { href: '/glossary#mcp', label: 'Full MCP definition' },
      },
      {
        question: 'What is A2A (Agent-to-Agent protocol)?',
        slug: 'what-is-a2a',
        answer:
          'A2A is Google\'s open protocol for communication between AI agents. While MCP connects agents to tools, A2A connects agents to each other. It enables agents to discover each other (via Agent Cards), negotiate capabilities, delegate tasks, and collaborate. For example, a travel-booking agent could use A2A to coordinate with a hotel agent and a flight agent to build a complete itinerary.',
        link: { href: '/glossary#a2a', label: 'Full A2A definition' },
      },
      {
        question: 'How does the AgentHermes gateway work?',
        slug: 'how-does-gateway-work',
        answer:
          'The gateway is a unified API layer. Agents connect to the gateway with a single API key and can access any connected business service. When an agent makes a request (e.g., "book a table at Mario\'s"), the gateway (1) authenticates the agent, (2) routes the request to the correct business\'s MCP endpoint or webhook, (3) handles credential management using AES-256-GCM encrypted vaults, (4) deducts the appropriate fee from the agent\'s wallet, and (5) returns the result. It supports 11 gateway service types and 4 fulfillment channels.',
        link: { href: '/gateway', label: 'Gateway documentation' },
      },
      {
        question: 'What is agent-hermes.json?',
        slug: 'what-is-agent-hermes-json',
        answer:
          'agent-hermes.json is our proposed standard for declaring a business\'s complete agent readiness status in a single machine-readable file. It combines what agent-card.json does for capabilities, what llms.txt does for content, and adds readiness scores, supported protocols, available tools, and integration endpoints. Think of it as a comprehensive manifest that tells any agent everything it needs to know to work with your business.',
        link: { href: '/standard', label: 'Read the specification' },
      },
      {
        question: 'How does hosted MCP work?',
        slug: 'how-does-hosted-mcp-work',
        answer:
          'Hosted MCP means we run an MCP server on your behalf. You provide your business information through our connect wizard — services, pricing, availability, and how you want to receive orders (API, webhook, email, or lead form). We deploy an MCP endpoint at /api/mcp/hosted/{your-slug} with SSE transport, pre-configured with the right tools for your vertical. Agents discover and call your tools through this endpoint. You don\'t deploy, maintain, or monitor anything — we handle uptime, protocol compliance, and updates.',
        link: { href: '/connect', label: 'Set up hosted MCP' },
      },
      {
        question: 'What is an Agent Card and where does it go?',
        slug: 'what-is-agent-card-where',
        answer:
          'An Agent Card is a JSON file at /.well-known/agent-card.json on your domain. It follows the A2A specification and describes your agent\'s (or business\'s) capabilities, supported protocols, authentication requirements, and service URLs. Any agent that checks your domain for A2A compatibility will look for this file. We auto-generate agent cards tailored to your business type through our remediation tools.',
        link: { href: '/registry', label: 'Browse the Agent Card Registry' },
      },
      {
        question: 'What is llms.txt and do I need one?',
        slug: 'what-is-llms-txt',
        answer:
          'llms.txt is a plain text file at the root of your website (e.g., yoursite.com/llms.txt) that provides a concise, AI-optimized summary of your business. It helps LLMs understand what you do without crawling your entire site. Yes, you need one — it\'s one of the single highest-impact things you can do for agent discoverability, and it takes minutes to create. Our remediation tools generate one automatically based on your website content.',
        link: { href: '/remediate', label: 'Generate llms.txt free' },
      },
      {
        question: 'What\'s the difference between MCP tools and REST APIs?',
        slug: 'mcp-vs-rest',
        answer:
          'REST APIs require agents to understand endpoint URLs, HTTP methods, request/response schemas, and authentication flows for every individual service. MCP standardizes all of this: tools are self-describing (the agent can list available tools and read their schemas), authentication is protocol-level, and discovery is automatic. An agent that speaks MCP can immediately use any MCP server without custom integration code. Think of REST as "every device has a different charger" and MCP as "everything uses USB-C."',
      },
      {
        question: 'How do I add my business to the registry?',
        slug: 'how-to-add-to-registry',
        answer:
          'There are two ways. (1) Automatic: If your domain has an agent-card.json file, our scanner will discover and index it automatically. (2) Manual: Visit agenthermes.ai/registry, click "Submit Agent Card," and provide your domain, business name, description, and capabilities. We validate the card and add it to the searchable registry. Registry listings are free and include semantic search, so agents can find your business by describing what they need rather than knowing your name.',
        link: { href: '/registry', label: 'Submit to the registry' },
      },
    ],
  },
  {
    title: 'Comparisons',
    slug: 'comparisons',
    icon: Scale,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/5',
    items: [
      {
        question: 'How is an Agent Readiness Score different from a website score?',
        slug: 'vs-website-score',
        answer:
          'Website scores (like Google Lighthouse or PageSpeed) measure how well your site performs for human visitors — load time, accessibility, best practices. An Agent Readiness Score measures how well your business works for AI agents. A site can score 100/100 on Lighthouse and 0/100 on agent readiness if it has no structured data, no API endpoints, and no agent-readable files. Conversely, a bare-bones API with great MCP support could score high on agent readiness despite having no visual website at all.',
      },
      {
        question: 'How is this different from SEO?',
        slug: 'vs-seo',
        answer:
          'SEO optimizes for search engine crawlers (Googlebot, Bingbot) that index web pages for human searchers. Agent readiness optimizes for AI agents that need to understand, interact with, and transact with your business programmatically. SEO cares about keywords, backlinks, and page structure. Agent readiness cares about API availability, machine-readable capabilities, payment protocols, and authentication flows. Both matter, but they target entirely different audiences — SEO targets humans searching; agent readiness targets AI agents acting.',
      },
      {
        question: 'What\'s the difference between MCP and A2A?',
        slug: 'mcp-vs-a2a',
        answer:
          'MCP (Model Context Protocol) connects AI agents to tools and data — it\'s how an agent uses a service. A2A (Agent-to-Agent) connects AI agents to each other — it\'s how agents collaborate. MCP is like a worker using a tool; A2A is like two workers talking to coordinate. In practice, a business might expose MCP tools for direct agent interaction AND an A2A Agent Card so other agents can discover and delegate tasks to it. They\'re complementary, not competing.',
        link: { href: '/glossary#mcp', label: 'See both definitions' },
      },
      {
        question: 'How is AgentHermes different from Zapier or Make?',
        slug: 'vs-zapier',
        answer:
          'Zapier and Make connect apps to each other through human-configured workflows (triggers and actions). AgentHermes makes businesses directly accessible to AI agents through standardized protocols. With Zapier, a human sets up "when X happens, do Y." With AgentHermes, an AI agent can autonomously discover your business, understand your services, and transact — no human setup required. We\'re building the infrastructure layer, not the automation layer.',
      },
      {
        question: 'What about OpenAPI / Swagger — isn\'t that enough?',
        slug: 'vs-openapi',
        answer:
          'OpenAPI specifications are a great foundation, but they\'re not enough on their own. OpenAPI describes your API endpoints, but it doesn\'t handle discovery (how does an agent find your API in the first place?), tool semantics (what does each endpoint actually do in business terms?), payment flows (how does the agent pay for usage?), or multi-agent coordination (how do agents delegate tasks?). MCP, A2A, and agent cards layer on top of OpenAPI to provide the full agent interaction stack. We detect OpenAPI specs during our scan and give you credit for having them.',
      },
      {
        question: 'Is this just for tech companies?',
        slug: 'is-this-just-for-tech',
        answer:
          'Absolutely not. In fact, the biggest opportunity is for non-tech businesses. SaaS companies already have APIs, so agents can partially interact with them today. But the 33 million small businesses in the US — restaurants, plumbers, dentists, salons — are almost entirely invisible to AI agents. AgentHermes is specifically designed to bridge this gap with hosted MCP, vertical templates, and fulfillment routing that works even if you don\'t have any technical infrastructure.',
        link: { href: '/for', label: 'See your vertical' },
      },
      {
        question: 'How is AgentHermes different from building my own MCP server?',
        slug: 'vs-build-own-mcp',
        answer:
          'You can absolutely build your own MCP server, and we encourage it for businesses with engineering teams. AgentHermes provides value even then: our scanner identifies gaps you might miss, our registry makes you discoverable, and our gateway gives you distribution. For businesses without engineering teams, we eliminate the build entirely — hosted MCP means you describe your services and we handle the protocol layer, deployment, monitoring, and updates.',
      },
    ],
  },
  {
    title: 'Getting Started',
    slug: 'getting-started',
    icon: Zap,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/5',
    items: [
      {
        question: 'Where do I start?',
        slug: 'where-to-start',
        answer:
          'Start with a free scan. Go to agenthermes.ai/audit, enter your website URL, and get your Agent Readiness Score in about 60 seconds. The results page shows your score across all nine dimensions, your ARL level, and specific recommendations ordered by impact. From there, the three most impactful quick wins are: (1) generate an llms.txt file, (2) add an agent-card.json, and (3) add Schema.org structured data to your site.',
        link: { href: '/audit', label: 'Start your free scan' },
      },
      {
        question: 'Can I see examples of agent-ready businesses?',
        slug: 'examples-of-agent-ready',
        answer:
          'Yes. Our leaderboard shows the top-scoring businesses across all scanned domains. As of now, the leaders include Supabase (69), Vercel (69), Slack (68), and Stripe (68). You can click into any business on the leaderboard to see their per-dimension breakdown and understand what they\'re doing right. The average score is 39/100, so even the leaders have room to improve.',
        link: { href: '/leaderboard', label: 'View the leaderboard' },
      },
      {
        question: 'What happens after I scan?',
        slug: 'what-happens-after-scan',
        answer:
          'After scanning, you get a public score page at agenthermes.ai/score/{your-domain} that you can share. The page includes your overall score, tier (Platinum/Gold/Silver/Bronze/Not Scored), per-dimension breakdown, agent journey progress (X of 6 steps ready), and a prioritized list of recommendations. You can then use our Fix It tools to auto-generate missing files, or Connect It to get hosted MCP and join the gateway.',
        link: { href: '/remediate', label: 'Fix your gaps' },
      },
      {
        question: 'How often should I re-scan?',
        slug: 'how-often-rescan',
        answer:
          'We recommend re-scanning after every significant change to your website or infrastructure — adding API endpoints, updating Schema.org markup, deploying MCP tools, or changing authentication flows. The agent readiness landscape is also evolving rapidly, and our scanner is continuously updated to detect new protocols and standards. Most businesses find value in monthly re-scans to track progress and catch regressions.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Schema.org FAQPage
// ---------------------------------------------------------------------------
const allQuestions = faqCategories.flatMap((c) => c.items)

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  name: 'AgentHermes FAQ — Agent Readiness & AI Commerce',
  description:
    'Frequently asked questions about agent readiness, MCP, A2A, Agent Readiness Scores, and making your business AI-agent ready.',
  url: 'https://agenthermes.ai/faq',
  mainEntity: allQuestions.map((q) => ({
    '@type': 'Question',
    name: q.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: q.answer,
    },
  })),
  isPartOf: {
    '@type': 'WebSite',
    name: 'AgentHermes',
    url: 'https://agenthermes.ai',
  },
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
        name: 'FAQ',
        item: 'https://agenthermes.ai/faq',
      },
    ],
  },
}

// ---------------------------------------------------------------------------
// FAQ Item component (details/summary for accessibility)
// ---------------------------------------------------------------------------
function FAQItemCard({ item }: { item: FAQItem }) {
  return (
    <details
      id={item.slug}
      className="group scroll-mt-28 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors open:border-zinc-700/80"
    >
      <summary className="flex items-start gap-4 cursor-pointer p-5 sm:p-6 list-none [&::-webkit-details-marker]:hidden">
        <div className="flex-shrink-0 mt-0.5">
          <HelpCircle className="h-5 w-5 text-zinc-500 group-open:text-emerald-400 transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-zinc-200 group-open:text-white transition-colors pr-8">
            {item.question}
          </h3>
        </div>
        <div className="flex-shrink-0 mt-1">
          <svg
            className="h-5 w-5 text-zinc-600 group-open:rotate-180 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </summary>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
        <div className="pl-9">
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            {item.answer}
          </p>
          {item.link && (
            <Link
              href={item.link.href}
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              {item.link.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </details>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function FAQPage() {
  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 mb-8">
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-zinc-400">FAQ</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-8">
              <HelpCircle className="h-4 w-4" />
              {allQuestions.length} Questions Answered
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Frequently Asked{' '}
              <span className="text-emerald-500">Questions</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mx-auto mb-4">
              Everything you need to know about making your business
              discoverable, usable, and payable by AI agents.
            </p>

            <p className="text-zinc-500 max-w-2xl mx-auto">
              Can&apos;t find your answer?{' '}
              <Link
                href="/glossary"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Check the glossary
              </Link>{' '}
              or{' '}
              <a
                href="mailto:support@agenthermes.ai"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                email us
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY NAV ===== */}
      <div className="sticky top-16 z-30 bg-[#09090b]/95 backdrop-blur-sm border-b border-zinc-800/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide" role="navigation" aria-label="FAQ categories">
            {faqCategories.map((cat) => (
              <a
                key={cat.slug}
                href={`#cat-${cat.slug}`}
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 transition-colors"
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.title}
              </a>
            ))}
            <div className="flex-1" />
            <Link
              href="/glossary"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              Glossary
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ===== FAQ SECTIONS ===== */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">
          {faqCategories.map((cat) => (
            <div key={cat.slug} id={`cat-${cat.slug}`} className="scroll-mt-28">
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${cat.bgColor} border ${cat.borderColor}`}
                >
                  <cat.icon className={`h-5 w-5 ${cat.color}`} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
                    {cat.title}
                  </h2>
                  <p className="text-xs text-zinc-500">
                    {cat.items.length} question{cat.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex-1 h-px bg-zinc-800/60" />
              </div>

              {/* Questions */}
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <FAQItemCard key={item.slug} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STILL HAVE QUESTIONS ===== */}
      <section className="py-16 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 sm:p-10 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
              <Bot className="h-3.5 w-3.5" />
              Still have questions?
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              We&apos;re here to help
            </h2>

            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
              Check the glossary for term definitions, explore our developer
              docs for technical details, or reach out directly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/glossary"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
              >
                <Layers className="h-4 w-4" />
                Glossary
              </Link>
              <Link
                href="/developers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
              >
                <Code2 className="h-4 w-4" />
                Developer Docs
              </Link>
              <a
                href="mailto:support@agenthermes.ai"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to make your business agent-ready?
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto">
            Start with a free scan. See where you stand. Fix what matters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              Check Your Score
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold transition-colors"
            >
              Get Started Free
              <Zap className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
