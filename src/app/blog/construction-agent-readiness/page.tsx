import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  ClipboardList,
  Code2,
  DollarSign,
  Globe,
  HardHat,
  HelpCircle,
  Layers,
  MapPin,
  Network,
  Phone,
  Server,
  Shield,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Construction Agent Readiness: Why Contractors and Builders Score Zero | AgentHermes',
  description:
    'Construction contractors are invisible to AI agents. Estimates via phone, timelines in spreadsheets, material quotes by email. The $2T construction industry averages 8/100 on the Agent Readiness Score. The first contractor with an MCP server wins every AI-powered project manager.',
  keywords: [
    'construction contractor agent readiness',
    'construction AI agents',
    'contractor MCP server',
    'construction agent readiness score',
    'builder AI agent',
    'construction API',
    'agent economy construction',
    'subcontractor discovery AI',
    'construction bid API',
  ],
  openGraph: {
    title: 'Construction Agent Readiness: Why Contractors and Builders Score Zero',
    description:
      'The $2T construction industry averages 8/100 on Agent Readiness. Estimates via phone, bids via email, timelines in spreadsheets. First contractor with an MCP server wins.',
    url: 'https://agenthermes.ai/blog/construction-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Construction Agent Readiness: Why Contractors and Builders Score Zero',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construction Agent Readiness: Why Contractors and Builders Score Zero',
    description:
      'The $2T construction industry is invisible to AI agents. Estimates via phone, bids via email, timelines in spreadsheets.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/construction-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const blockers = [
  {
    name: 'Estimates Via Phone Only',
    description: 'A homeowner asks for a roofing estimate. The contractor\'s website says "Call for a free estimate." An AI project management agent cannot call. It cannot parse a voicemail greeting. The estimate process is entirely human-to-human, with no structured input or output.',
    severity: 'Critical',
    icon: Phone,
    color: 'red',
  },
  {
    name: 'Project Timelines in Spreadsheets',
    description: 'Project schedules live in Excel files, whiteboards, and the general contractor\'s head. There is no endpoint to query "when will the framing be done?" or "is this project on schedule?" AI scheduling agents have nothing to connect to.',
    severity: 'Critical',
    icon: ClipboardList,
    color: 'red',
  },
  {
    name: 'Material Quotes by Email',
    description: 'Lumber yards and material suppliers send quotes as PDF attachments via email. There is no structured pricing API. An AI procurement agent cannot compare prices across three suppliers in real-time because the data does not exist in machine-readable form.',
    severity: 'High',
    icon: DollarSign,
    color: 'amber',
  },
  {
    name: 'Subcontractor Discovery Is Word of Mouth',
    description: 'Finding a reliable electrician, plumber, or HVAC sub is done through personal networks, referrals, and phone calls. There is no structured registry of subcontractor availability, specialties, licensing, or insurance status that an agent can query.',
    severity: 'High',
    icon: Users,
    color: 'amber',
  },
  {
    name: 'No Structured Bid Submission',
    description: 'Public and private bid processes still revolve around PDF documents, sealed envelopes, and email attachments. An AI bidding agent cannot submit a structured proposal because bid portals either do not exist or require human-driven form filling with CAPTCHAs.',
    severity: 'High',
    icon: Layers,
    color: 'amber',
  },
]

const agentReadyContractor = [
  {
    capability: 'Structured Bid Submission API',
    description: 'An endpoint that accepts project specs (square footage, scope of work, materials, timeline requirements) and returns a structured bid with line-item pricing, estimated duration, and availability windows.',
    impact: 'AI project managers include you in every comparison. Phone-only competitors are excluded from the evaluation entirely.',
    icon: ClipboardList,
  },
  {
    capability: 'Material Pricing Endpoint',
    description: 'Real-time or daily-updated material pricing for common construction supplies. Lumber per board foot, concrete per yard, roofing per square. Structured JSON with SKU, unit price, availability, and lead time.',
    impact: 'AI procurement agents route material orders to you before checking competitors who require email quotes.',
    icon: DollarSign,
  },
  {
    capability: 'Project Timeline JSON',
    description: 'Machine-readable project schedules with milestones, dependencies, completion percentages, and delay flags. An AI project management agent queries your timeline endpoint to monitor progress across 20 subcontractors simultaneously.',
    impact: 'General contractors using AI tools prefer subs that provide structured status updates over those who require phone check-ins.',
    icon: Timer,
  },
  {
    capability: 'Availability Calendar API',
    description: 'Real-time crew availability by trade and location. When an AI scheduling agent needs a framing crew for next Tuesday in zip code 33060, it queries your availability endpoint and gets a confirmed or declined response in milliseconds.',
    impact: 'You fill schedule gaps automatically. Competitors who require phone calls to check availability lose the job before they know it existed.',
    icon: MapPin,
  },
  {
    capability: 'License and Insurance Verification',
    description: 'Structured endpoint returning active licenses, insurance certificates, bonding status, and expiration dates. AI compliance agents verify your credentials programmatically during vendor selection.',
    impact: 'You pass automated compliance checks instantly. Competitors who email PDF certificates add days to the vetting process.',
    icon: Shield,
  },
]

const scoreComparison = [
  { vertical: 'Developer Tools', avg: 62, best: 'Resend (75)', color: 'emerald' },
  { vertical: 'Fintech', avg: 48, best: 'Stripe (68)', color: 'emerald' },
  { vertical: 'E-Commerce', avg: 38, best: 'Shopify (52)', color: 'amber' },
  { vertical: 'Manufacturing', avg: 15, best: 'Siemens Xcelerator (34)', color: 'red' },
  { vertical: 'Real Estate', avg: 22, best: 'Zillow (41)', color: 'red' },
  { vertical: 'Construction', avg: 8, best: 'BuilderTrend (28)', color: 'red' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does construction score lower than manufacturing?',
    answer:
      'Manufacturing at least has ERP systems with internal APIs — the data is structured, just locked behind VPNs. Construction often has no structured data at all. Estimates are verbal, schedules are mental, material pricing is in email inboxes. There is no system to put an API in front of because the underlying data is not digitized.',
  },
  {
    question: 'Do platforms like BuilderTrend or Procore help?',
    answer:
      'BuilderTrend and Procore have internal APIs, but they are not agent-facing. Their APIs are designed for integration partners (accounting software, CRM tools), not for AI agents to discover and call autonomously. A contractor using Procore still does not have an agent-card.json, an llms.txt, or a public MCP server. The platform score (28-32) is higher than the average contractor (3-8), but still well below Bronze.',
  },
  {
    question: 'What would an MCP server for a contractor look like?',
    answer:
      'Five tools: get_services() returns trade specialties and service area. get_availability() returns open schedule slots by week. submit_bid_request() accepts project specs and returns a structured estimate. get_credentials() returns active licenses, insurance, and bonding. get_project_status() returns timeline and completion percentage for active projects. AgentHermes can auto-generate this from a form — no coding required.',
  },
  {
    question: 'How fast could a contractor reach Bronze (40+)?',
    answer:
      'Faster than any other low-scoring vertical. A contractor who connects to AgentHermes and fills out the construction vertical form gets: agent-card.json, llms.txt, hosted MCP server with 5 tools, and a registry listing. That alone moves the score from single digits to 35-45 in under an hour. Add an OpenAPI spec and a /health endpoint and you are solidly Bronze.',
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

export default function ConstructionAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Construction Agent Readiness: Why Contractors and Builders Score Zero',
    description:
      'Construction contractors are invisible to AI agents. The $2T industry averages 8/100 on the Agent Readiness Score. The first contractor with an MCP server wins every AI-powered project manager.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/construction-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'construction contractor agent readiness, construction AI agents, contractor MCP server, builder agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Construction Agent Readiness',
          item: 'https://agenthermes.ai/blog/construction-agent-readiness',
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
      title="Construction Agent Readiness: Why Contractors and Builders Score Zero"
      shareUrl="https://agenthermes.ai/blog/construction-agent-readiness"
      currentHref="/blog/construction-agent-readiness"
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
            <span className="text-zinc-400">Construction Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <HardHat className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Avg Score: 8/100
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Construction Agent Readiness:{' '}
            <span className="text-emerald-400">Why Contractors and Builders Score Zero</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The US construction industry generates <strong className="text-zinc-100">$2 trillion</strong> in
            annual revenue. It employs 8 million people across 900,000 companies. And from the perspective
            of an AI agent, it does not exist. Estimates happen by phone. Project timelines live in
            spreadsheets. Material quotes arrive as email attachments. Subcontractor discovery is word of
            mouth. The average Agent Readiness Score for construction businesses we have scanned is{' '}
            <strong className="text-red-400">8 out of 100</strong> — the lowest of any major vertical.
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

      {/* ===== THE GAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-red-500" />
            The Lowest-Scoring Major Vertical
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              We have scanned businesses across 15 major verticals. Construction consistently
              finishes last. Manufacturing averages 15 — low, but at least the data exists inside
              ERP systems. Real estate averages 22 — some MLS data is partially structured.
              Construction averages 8. The data is not locked behind a VPN. It is not digitized at all.
            </p>
            <p>
              The handful of construction tech platforms — BuilderTrend, Procore, PlanGrid — have
              internal APIs. But these are integration APIs for partner software, not agent-facing
              endpoints. A general contractor using Procore does not have an agent-card.json at their
              domain. Their pricing is not in a structured endpoint. Their availability is not queryable.
              The platform adds structure internally but does not expose it to the agent economy.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Vertical</div>
              <div>Average Score</div>
              <div>Best Performer</div>
              <div>Gap to Silver (60)</div>
            </div>
            {scoreComparison.map((row, i) => {
              const colors = getColorClasses(row.color)
              return (
                <div
                  key={row.vertical}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.vertical}</div>
                  <div className={colors.text}>{row.avg}/100</div>
                  <div className="text-zinc-400">{row.best}</div>
                  <div className="text-zinc-500">{60 - row.avg} points</div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '$2T', label: 'US construction revenue', icon: TrendingUp },
              { value: '8', label: 'average ARS score', icon: BarChart3 },
              { value: '900K', label: 'construction companies', icon: HardHat },
              { value: '0', label: 'with MCP servers', icon: Server },
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

      {/* ===== FIVE BLOCKERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            Five Reasons Construction Scores Zero
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Construction is not invisible because the industry lacks technology. It is invisible
              because the technology it uses — phones, email, spreadsheets, PDF blueprints — has
              no agent-accessible surface. Here are the five structural blockers.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {blockers.map((blocker) => {
              const colors = getColorClasses(blocker.color)
              return (
                <div
                  key={blocker.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <blocker.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-zinc-100">{blocker.name}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} border ${colors.border} ${colors.text}`}>
                        {blocker.severity}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{blocker.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What an Agent-Ready Contractor Looks Like
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Imagine a roofing contractor in Miami who exposes five capabilities to AI agents.
              Not their full project management system — just the surface that AI project
              managers, procurement agents, and scheduling agents need. Here is the target state.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {agentReadyContractor.map((cap) => (
              <div
                key={cap.capability}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <cap.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">{cap.capability}</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{cap.description}</p>
                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <p className="text-xs text-zinc-400">
                    <span className="text-emerald-400 font-medium">Agent impact:</span>{' '}
                    {cap.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE FIRST-MOVER ADVANTAGE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            First Contractor with an MCP Server Wins
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              In every vertical we have analyzed, the first business to become agent-ready
              captures a disproportionate share of agent-driven interactions. In construction,
              the opportunity is unprecedented because the entire field scores single digits.
            </p>
            <p>
              AI-powered project management tools are already entering the market. When a
              homeowner tells their AI assistant &ldquo;find me a roofer who can start next
              week,&rdquo; the agent will query every contractor it can reach programmatically.
              If 99 roofers require a phone call and 1 has an availability API, the agent books
              the one it can reach. The other 99 are not evaluated — they are{' '}
              <strong className="text-zinc-100">excluded from the process entirely</strong>.
            </p>
            <p>
              This is the same dynamic we documented in{' '}
              <Link href="/blog/local-business-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                local business agent readiness
              </Link>{' '}
              and{' '}
              <Link href="/blog/manufacturing-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                manufacturing
              </Link>
              , but the window is even wider. Construction has no leader to chase. The first
              contractor per trade per metro area to go agent-ready captures 100% of agent-driven
              leads in that category — because there is literally zero competition.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The math on one agent-ready plumber:</strong> A
              metro area has 200 plumbers. One connects to AgentHermes and gets an MCP server. When
              AI assistants handle 2% of service requests in that metro — roughly 400 calls per
              month — that one plumber gets all 400. The other 199 get zero. Agent readiness is not
              a percentage advantage. It is a binary: reachable or invisible.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE PATH FORWARD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            From Zero to Bronze in One Afternoon
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Construction is the only major vertical where a business can go from the bottom
            of the leaderboard to Bronze in a single session. Here is the path.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                phase: 'Hour 1',
                title: 'Run a free scan and connect to AgentHermes',
                detail: 'Visit /audit to see your current score (likely 3-8). Then visit /connect, select Construction, and fill in your business details: trades, service area, availability, and pricing ranges. AgentHermes auto-generates your MCP server.',
              },
              {
                phase: 'Hour 2',
                title: 'Deploy agent-card.json and llms.txt',
                detail: 'Add two files to your website root. agent-card.json tells agents what you do and where your MCP server is. llms.txt gives AI models a plain-text summary of your business. Both are auto-generated by AgentHermes.',
              },
              {
                phase: 'Hour 3',
                title: 'Add structured service data',
                detail: 'Enter your service catalog (roofing, siding, gutters), license numbers, insurance details, and typical project timelines. This populates your MCP tools with real data instead of placeholders.',
              },
              {
                phase: 'Week 2',
                title: 'Connect calendar and pricing',
                detail: 'Link your scheduling system (even Google Calendar works) to the availability tool. Add your per-square-foot or per-project pricing ranges. Agents can now check if you are free and estimate cost.',
              },
              {
                phase: 'Week 4',
                title: 'Add project status tracking',
                detail: 'For active projects, expose milestone completion via the project status tool. General contractors using AI project management can monitor your progress without phone calls.',
              },
            ].map((item) => (
              <div
                key={item.phase}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-2">
                  {item.phase}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              By the end of the first afternoon, you have moved from 8/100 to an estimated
              35-45 — Bronze tier. By week four, you are approaching Silver. And because no
              other contractor in your market has done this, you own the entire agent-driven
              channel for your trade and zip code.
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
                title: 'Local Business Agent Readiness: The $6.2B Opportunity',
                href: '/blog/local-business-agent-readiness',
                tag: 'Market Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Manufacturing Agent Readiness: The Last Frontier',
                href: '/blog/manufacturing-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'The Agent Readiness Checklist: 30 Signals',
                href: '/blog/checklist-agent-ready-business',
                tag: 'Checklist',
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
            Score your construction business
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan and see how your construction business ranks
            across all 9 dimensions. Find out what AI project management agents see — or do not see.
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
