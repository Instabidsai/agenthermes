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
  Eye,
  EyeOff,
  Globe,
  HelpCircle,
  Layers,
  LogIn,
  Network,
  Plug,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  UserPlus,
  Wallet,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'The 6-Step Agent Journey: How AI Agents Interact With Your Business | AgentHermes',
  description:
    'AI agents follow a predictable 6-step journey: FIND, UNDERSTAND, SIGN UP, CONNECT, USE, PAY. Most businesses fail at Step 1. Learn the full framework with real data from 500 business scans.',
  keywords: [
    'how AI agents find businesses',
    'agent journey framework',
    'AI agent interaction',
    'agent readiness steps',
    'AI agent business discovery',
    'agent economy framework',
    'how agents use businesses',
    'AI agent onboarding',
    'agent readiness dimensions',
  ],
  openGraph: {
    title: 'The 6-Step Agent Journey: How AI Agents Interact With Your Business',
    description:
      'AI agents follow 6 predictable steps: FIND, UNDERSTAND, SIGN UP, CONNECT, USE, PAY. Most businesses fail at Step 1. Data from 500 scans.',
    url: 'https://agenthermes.ai/blog/agent-journey-explained',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The 6-Step Agent Journey: How AI Agents Interact With Your Business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The 6-Step Agent Journey: How AI Agents Interact With Your Business',
    description:
      '6 steps: FIND, UNDERSTAND, SIGN UP, CONNECT, USE, PAY. Most businesses fail at Step 1. Framework + data from 500 scans.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/agent-journey-explained',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface JourneyStep {
  step: number
  name: string
  verb: string
  icon: typeof Search
  color: string
  whatAgentDoes: string
  signalsLookedFor: string[]
  whatBusinessesGetWrong: string
  dataPoint: string
  relatedDimensions: string[]
}

const journeySteps: JourneyStep[] = [
  {
    step: 1,
    name: 'FIND',
    verb: 'Discover the business exists',
    icon: Search,
    color: 'red',
    whatAgentDoes:
      'The agent searches for businesses that match a user request. It queries MCP registries, checks agent-card.json files, looks for llms.txt, scans OpenAPI specs, and falls back to web search if nothing structured is found.',
    signalsLookedFor: [
      'agent-card.json at /.well-known/agent-card.json',
      'llms.txt at the domain root',
      'AGENTS.md file',
      'MCP server endpoint in registry',
      'OpenAPI/Swagger specification',
      'Schema.org structured data on website',
    ],
    whatBusinessesGetWrong:
      '40% of businesses in our database are completely invisible to agents. They have a website, but no structured data, no agent card, no API specification — nothing an agent can discover programmatically. The agent literally does not know they exist.',
    dataPoint: '40% of 500 businesses scored zero on D1 Discoverability',
    relatedDimensions: ['D1 Discoverability (weight: 0.12)'],
  },
  {
    step: 2,
    name: 'UNDERSTAND',
    verb: 'Learn what the business offers',
    icon: Eye,
    color: 'amber',
    whatAgentDoes:
      'Once found, the agent reads the business description, service catalog, product listings, pricing, and policies. It builds an internal model of what this business does, what it charges, and what constraints exist (hours, service area, minimums).',
    signalsLookedFor: [
      'Structured product/service data via API',
      'Machine-readable pricing tables',
      'Business description with categories and keywords',
      'Operating hours in structured format',
      'Service area or delivery zones',
      'Authentication requirements documented',
    ],
    whatBusinessesGetWrong:
      'Many businesses have information scattered across HTML pages with no structure. A restaurant might have a PDF menu, a dentist might list services in paragraph form, a SaaS company might say "contact sales for pricing." Agents cannot parse any of this reliably.',
    dataPoint: 'D6 Data Quality averages 4.2/10 across all 500 businesses',
    relatedDimensions: ['D6 Data Quality (weight: 0.10)', 'D2 API Quality (weight: 0.15)'],
  },
  {
    step: 3,
    name: 'SIGN UP',
    verb: 'Create an account or get access',
    icon: UserPlus,
    color: 'yellow',
    whatAgentDoes:
      'The agent needs credentials to interact with the business. It looks for self-service API key generation, OAuth flows, or open endpoints. If sign-up requires a human (phone call, manual approval, email verification with CAPTCHA), the agent is blocked.',
    signalsLookedFor: [
      'Self-service API key generation',
      'OAuth authorization endpoint',
      'Open endpoints that require no auth',
      'Developer portal with automated onboarding',
      'Clear documentation of auth requirements',
      'Free tier or trial without human approval',
    ],
    whatBusinessesGetWrong:
      'D3 Onboarding is the second-lowest scoring dimension at 0.08 weight but even lower in actual scores. Most businesses require human interaction to create an account — phone calls, email chains, or in-person visits. There is no way for an agent to self-provision access at 3 AM when a user needs help.',
    dataPoint: 'D3 Onboarding scored lowest of the 9 dimensions in our 500-business scan',
    relatedDimensions: ['D3 Onboarding (weight: 0.08)'],
  },
  {
    step: 4,
    name: 'CONNECT',
    verb: 'Establish a working connection',
    icon: Plug,
    color: 'blue',
    whatAgentDoes:
      'The agent establishes an authenticated connection to the business service. It calls the MCP server, authenticates with credentials from Step 3, and verifies it can list available tools. This is the "handshake" — confirming both sides can communicate.',
    signalsLookedFor: [
      'MCP server with SSE or stdio transport',
      'REST API with documented endpoints',
      'Webhook support for real-time updates',
      'Health check endpoint returning 200',
      'API versioning for stability',
      'Rate limit documentation',
    ],
    whatBusinessesGetWrong:
      'Even businesses with APIs often have unreliable connections — endpoints that timeout, inconsistent error responses, no health checks, and undocumented rate limits. An agent that gets a 500 error with no structured error message cannot diagnose or retry intelligently.',
    dataPoint: 'D8 Reliability averages 5.1/13 — most APIs lack health checks and structured errors',
    relatedDimensions: ['D8 Reliability (weight: 0.13)', 'D7 Security (weight: 0.12)'],
  },
  {
    step: 5,
    name: 'USE',
    verb: 'Complete the user task',
    icon: Zap,
    color: 'emerald',
    whatAgentDoes:
      'The agent performs the actual work — searching products, checking availability, booking appointments, placing orders. It calls the MCP tools or API endpoints with parameters from the user request and processes the responses to build an answer or complete a transaction.',
    signalsLookedFor: [
      'MCP tools with clear input/output schemas',
      'Search functionality with filters',
      'Real-time availability or inventory data',
      'Booking or ordering capability',
      'Structured response formats (JSON)',
      'Error handling with actionable messages',
    ],
    whatBusinessesGetWrong:
      'Most businesses that have APIs only support reading data, not taking actions. An agent can see products but cannot buy them. It can see appointment slots but cannot book one. The gap between "read-only API" and "transactional API" is the gap between a score of 40 and a score of 75.',
    dataPoint: 'D9 Agent Experience averages 3.8/10 — most APIs lack agent-specific UX patterns',
    relatedDimensions: ['D9 Agent Experience (weight: 0.10)', 'D2 API Quality (weight: 0.15)'],
  },
  {
    step: 6,
    name: 'PAY',
    verb: 'Complete payment for the service',
    icon: Wallet,
    color: 'purple',
    whatAgentDoes:
      'The agent handles payment — either through a pre-authorized payment method, a usage-based billing API, or a payment link. For per-call services, the agent may use a wallet or micropayment protocol. For subscriptions, it may provision a plan through the API.',
    signalsLookedFor: [
      'Programmatic payment API (Stripe, etc.)',
      'Usage-based billing endpoint',
      'Machine-readable pricing tiers',
      'Free tier for initial exploration',
      'Payment link generation',
      'x402 or micropayment protocol support',
    ],
    whatBusinessesGetWrong:
      'D4 Pricing and D5 Payment are universally weak. Even SaaS companies that charge for API access often hide pricing behind "contact sales" pages. Agents cannot negotiate or fill out forms — they need structured pricing data and programmatic payment. This is the last mile that almost nobody has solved.',
    dataPoint: 'D4 Pricing (0.05 weight) and D5 Payment (0.08 weight) are the weakest dimensions across all 500 businesses',
    relatedDimensions: ['D4 Pricing (weight: 0.05)', 'D5 Payment (weight: 0.08)'],
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is the agent journey?',
    answer:
      'The agent journey is a 6-step framework describing how AI agents interact with businesses: FIND (discover the business exists), UNDERSTAND (learn what it offers), SIGN UP (get access credentials), CONNECT (establish a working connection), USE (complete the user task), and PAY (handle payment). Each step maps to specific scoring dimensions in the Agent Readiness Score. Most businesses fail at Step 1 — they are invisible to agents.',
  },
  {
    question: 'Which step do most businesses fail at?',
    answer:
      'Step 1: FIND. Our data from scanning 500 businesses shows that 40% are completely invisible to AI agents. They have no structured data, no agent card, no API specification, and no MCP server. An agent literally cannot discover they exist. Even among businesses that pass Step 1, most fail at Step 3 (SIGN UP) because they require human interaction to create an account.',
  },
  {
    question: 'How does the agent journey relate to ARL levels?',
    answer:
      'ARL levels map directly to journey progression. ARL-0 (Dark) businesses fail at Step 1. ARL-1 (Visible) businesses pass Step 1 but fail at Step 2 or 3. ARL-2 (Described) businesses pass through Step 2. ARL-3 (Accessible) businesses complete Step 4 — this is the revenue inflection point where agents can actually connect and start using the service. ARL-4 through ARL-6 represent increasingly sophisticated completion of Steps 5 and 6.',
  },
  {
    question: 'What is the revenue inflection point?',
    answer:
      'ARL-3 (Accessible) is the revenue inflection point in the agent journey. This is when a business completes Step 4 (CONNECT) — meaning an agent can establish a working connection and start calling tools. Before ARL-3, agents can see the business but cannot transact with it. At ARL-3 and above, agents can complete tasks on behalf of users, which directly generates revenue. The jump from ARL-2 to ARL-3 is the most valuable improvement a business can make.',
  },
  {
    question: 'How can I see which steps my business passes?',
    answer:
      'Run a free Agent Readiness Scan at agenthermes.ai/audit. The scan probes all 9 dimensions and maps your results to the 6-step agent journey. You will see which steps your business currently passes, which it fails, and specific recommendations for each step. The AgentJourneyScore component shows "X of 6 steps ready" with pass, partial, or fail status for each step.',
  },
]

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

export default function AgentJourneyExplainedPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The 6-Step Agent Journey: How AI Agents Interact With Your Business',
    description:
      'A deep dive into the 6-step framework AI agents follow when interacting with businesses: FIND, UNDERSTAND, SIGN UP, CONNECT, USE, PAY. Real data from 500 business scans shows where most businesses fail.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/agent-journey-explained',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Framework',
    wordCount: 2000,
    keywords:
      'agent journey, how AI agents find businesses, AI agent interaction, agent readiness framework, 6-step agent journey',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'The 6-Step Agent Journey',
          item: 'https://agenthermes.ai/blog/agent-journey-explained',
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
      title="The 6-Step Agent Journey: How AI Agents Interact With Your Business"
      shareUrl="https://agenthermes.ai/blog/agent-journey-explained"
      currentHref="/blog/agent-journey-explained"
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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400">Agent Journey Explained</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Layers className="h-3.5 w-3.5" />
              Framework
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              500 Businesses Scanned
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            The 6-Step Agent Journey:{' '}
            <span className="text-purple-400">How AI Agents Interact With Your Business</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Every AI agent follows the same 6-step journey when interacting with a business:{' '}
            <strong className="text-zinc-100">FIND, UNDERSTAND, SIGN UP, CONNECT, USE, PAY</strong>.
            Most businesses fail at Step 1. Our data from scanning 500 businesses reveals exactly where
            each step breaks down — and what it takes to complete the full journey.
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
                  15 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== JOURNEY OVERVIEW ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Network className="h-5 w-5 text-purple-500" />
            The Framework: 6 Steps from Invisible to Transactional
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              When a user asks an AI assistant to &ldquo;find me a dentist who accepts Delta Dental
              and can see me this week,&rdquo; the agent does not just search Google. It follows a
              structured process to find, evaluate, and interact with businesses that match the request.
              We call this the <strong className="text-zinc-100">Agent Journey</strong> — and understanding
              it is the key to understanding your Agent Readiness Score.
            </p>
            <p>
              Each step maps to specific dimensions in the{' '}
              <Link href="/blog/what-is-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Agent Readiness Score
              </Link>. Failing at any step means the agent cannot proceed further — and your business
              loses that potential customer to a competitor who clears the step.
            </p>
          </div>

          {/* Visual journey bar */}
          <div className="flex flex-wrap gap-2 mb-8">
            {journeySteps.map((step) => {
              const colors = getColorClasses(step.color)
              return (
                <div
                  key={step.step}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${colors.bg} border ${colors.border}`}
                >
                  <span className={`text-sm font-bold ${colors.text}`}>{step.step}</span>
                  <span className={`text-xs font-semibold ${colors.text}`}>{step.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== EACH STEP DETAILED ===== */}
      {journeySteps.map((step) => {
        const colors = getColorClasses(step.color)
        return (
          <section key={step.step} className="pb-12 sm:pb-16 border-t border-zinc-800/50">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
              <div className="flex items-center gap-4 mb-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} border ${colors.border}`}>
                  <step.icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${colors.text} uppercase tracking-wider`}>
                      Step {step.step}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
                    {step.name}: {step.verb}
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
                <p>{step.whatAgentDoes}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Signals */}
                <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <h3 className="text-sm font-bold text-zinc-100 mb-3 flex items-center gap-2">
                    <CheckCircle2 className={`h-4 w-4 ${colors.text}`} />
                    What the agent looks for
                  </h3>
                  <ul className="space-y-2">
                    {step.signalsLookedFor.map((signal, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-zinc-400">{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What goes wrong */}
                <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <h3 className="text-sm font-bold text-zinc-100 mb-3 flex items-center gap-2">
                    <EyeOff className="h-4 w-4 text-red-400" />
                    What most businesses get wrong
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                    {step.whatBusinessesGetWrong}
                  </p>
                  <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                    <p className="text-xs font-medium">
                      <span className={colors.text}>{step.dataPoint}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Related dimensions */}
              <div className="flex flex-wrap gap-2">
                {step.relatedDimensions.map((dim) => (
                  <span
                    key={dim}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-xs text-zinc-400"
                  >
                    {dim}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* ===== ARL MAPPING ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-500" />
            How ARL Levels Map to the Journey
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The{' '}
              <Link href="/blog/arl-levels-explained" className="text-emerald-400 hover:text-emerald-300 underline">
                7 Agent Readiness Levels (ARL-0 through ARL-6)
              </Link>{' '}
              directly correspond to how far a business progresses through the agent journey. Each ARL
              level represents completing one more step.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { arl: 'ARL-0 Dark', journey: 'Fails at Step 1 (FIND)', detail: 'Completely invisible. No structured data, no API, no agent-discoverable presence.', color: 'red', score: '0-19' },
              { arl: 'ARL-1 Visible', journey: 'Passes Step 1, fails at Step 2', detail: 'Has some structured data (Schema.org, Google Business Profile) but no machine-readable service details.', color: 'red', score: '20-34' },
              { arl: 'ARL-2 Described', journey: 'Passes Steps 1-2, fails at Step 3-4', detail: 'Agent can find and understand the business, but cannot get access or establish a connection.', color: 'amber', score: '35-49' },
              { arl: 'ARL-3 Accessible', journey: 'Passes Steps 1-4 (revenue inflection)', detail: 'Agent can discover, understand, authenticate, and connect. This is where real agent-driven revenue begins.', color: 'emerald', score: '50-64' },
              { arl: 'ARL-4 Functional', journey: 'Passes Steps 1-5', detail: 'Full read/write capabilities. Agent can complete tasks — book, order, update, cancel.', color: 'emerald', score: '65-74' },
              { arl: 'ARL-5 Transactional', journey: 'Passes all 6 steps', detail: 'End-to-end agent workflow including payment. The complete agent journey is functional.', color: 'blue', score: '75-89' },
              { arl: 'ARL-6 Interoperable', journey: 'All 6 steps + cross-agent protocols', detail: 'Full MCP, A2A, agent-native bonus. Can interact with agents from any platform seamlessly.', color: 'purple', score: '90-100' },
            ].map((level) => {
              const colors = getColorClasses(level.color)
              return (
                <div
                  key={level.arl}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                    <span className={`text-xs font-bold ${colors.text}`}>{level.score}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-zinc-100 text-sm">{level.arl}</h3>
                      <span className={`text-xs ${colors.text}`}>{level.journey}</span>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{level.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The critical threshold is ARL-3.</strong> Businesses
              below ARL-3 cannot transact with agents. Businesses at ARL-3 and above can. Our data shows
              that only <strong className="text-zinc-100">52 out of 500</strong> businesses (10.4%) have
              reached Silver tier (60+), which roughly corresponds to ARL-3. The other 89.6% are losing
              agent-driven traffic to the businesses that cleared this threshold.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHERE TO START ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            Where to Start: Fix Step 1 First
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              If you do nothing else, fix Step 1. Make your business <strong className="text-zinc-100">
              findable</strong> by AI agents. This alone moves you from ARL-0 (Dark) to ARL-1 (Visible)
              and puts you ahead of 40% of businesses.
            </p>
            <p>
              The fastest path from invisible to agent-accessible:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Run your free scan',
                detail: 'Visit /audit and see which of the 6 steps your business currently passes. The scan takes 60 seconds and shows your score across all 9 dimensions.',
                href: '/audit',
                icon: BarChart3,
              },
              {
                title: 'Connect your business',
                detail: 'Visit /connect and fill out the wizard. AgentHermes auto-generates your MCP server, agent card, and registry listing. You clear Steps 1-4 in under 5 minutes.',
                href: '/connect',
                icon: Sparkles,
              },
              {
                title: 'Check the leaderboard',
                detail: 'See where you stand vs 500 other businesses. The /leaderboard shows scores, tiers, and which steps each business has completed.',
                href: '/leaderboard',
                icon: TrendingUp,
              },
              {
                title: 'Read the improvement guide',
                detail: 'Our step-by-step guide shows the exact changes that move businesses from Bronze to Silver, mapped to each journey step.',
                href: '/blog/improve-agent-readiness-score',
                icon: Target,
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="h-5 w-5 text-emerald-400" />
                  <h3 className="font-bold text-zinc-100 text-sm group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </Link>
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
            See where your business fails in the agent journey
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get your free Agent Readiness Score and see which of the 6 steps your business passes.
            Most businesses fail at Step 1 — find out if yours is one of them.
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
