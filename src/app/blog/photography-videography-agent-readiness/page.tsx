import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Eye,
  Globe,
  HelpCircle,
  Image,
  Layers,
  MessageSquare,
  Network,
  Palette,
  Search,
  Server,
  Shield,
  Sparkles,
  Tag,
  TrendingUp,
  Upload,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Photography and Videography Agent Readiness: Why Creative Professionals Can\'t Be Booked by AI | AgentHermes',
  description:
    'The $40B creative services market runs on Instagram portfolios, DM booking, and "starts at" pricing. AI event planning agents will book photographers — the first one with an MCP server captures the wedding and corporate market.',
  keywords: [
    'photography videography agent readiness',
    'photographer AI booking',
    'videographer agent readiness',
    'creative services agent readiness',
    'photographer MCP server',
    'AI event planning agent',
    'wedding photographer agent ready',
    'corporate videographer agent',
    'photography booking API',
  ],
  openGraph: {
    title:
      'Photography and Videography Agent Readiness: Why Creative Professionals Can\'t Be Booked by AI',
    description:
      '$40B market invisible to AI agents. Portfolios on Instagram, booking via DM, pricing "starts at." The first photographer with an MCP server wins the agent economy.',
    url: 'https://agenthermes.ai/blog/photography-videography-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Photography and Videography Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Photography and Videography Agent Readiness: Why Creative Professionals Can\'t Be Booked by AI',
    description:
      '$40B market invisible to AI agents. Portfolios on Instagram, booking via DM, pricing unstructured. First photographer with MCP wins.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/photography-videography-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const currentState = [
  {
    problem: 'Portfolio Discovery',
    description:
      'Portfolios live on Instagram, personal Squarespace sites, or PDF lookbooks. No structured catalog with style tags, shot types, or searchable metadata. An agent cannot browse a photographer\'s work by style, venue type, or lighting preference.',
    icon: Image,
    color: 'red',
  },
  {
    problem: 'Booking Process',
    description:
      'Booking happens through DMs, email threads, or contact forms. No real-time availability, no instant confirmation, no deposit flow. An agent trying to book a photographer for a Saturday wedding hits a wall immediately — there is no endpoint to check.',
    icon: MessageSquare,
    color: 'red',
  },
  {
    problem: 'Pricing Structure',
    description:
      '"Starts at $2,500" or "Contact for pricing." Packages are described in prose, not structured data. Add-ons like second shooter, drone footage, or album design are buried in PDFs. An agent cannot compare photographers on price because prices are not machine-readable.',
    icon: DollarSign,
    color: 'red',
  },
  {
    problem: 'Customization',
    description:
      'Every project requires a consultation call. Shot lists, location scouting, timeline planning — all manual. There is no structured way for an agent to specify requirements and receive a customized package back.',
    icon: Palette,
    color: 'red',
  },
  {
    problem: 'File Delivery',
    description:
      'Galleries delivered via Google Drive links, Dropbox, or platforms like Pixieset. No API for delivery status, download tracking, or file format selection. The client has to check their email and click a link — an agent cannot track delivery progress.',
    icon: Upload,
    color: 'red',
  },
]

const agentReadyFeatures = [
  {
    tool: 'Portfolio Catalog API',
    description:
      'Structured portfolio with style tags (moody, bright, editorial, documentary), venue types (outdoor, studio, church, rooftop), event types (wedding, corporate, product, headshot). Searchable, filterable, with sample image URLs.',
    example: 'search_portfolio({ style: "documentary", event_type: "wedding", venue: "outdoor" })',
    impact: 'D1 Discovery +15, D6 Data +12',
    icon: Camera,
    color: 'emerald',
  },
  {
    tool: 'Availability Calendar',
    description:
      'Real-time availability endpoint. Check if a photographer is free on a specific date, see upcoming available weekends, and hold a date for 24 hours while the client confirms. Synced with their actual calendar.',
    example: 'check_availability({ date: "2026-09-12", duration_hours: 8 })',
    impact: 'D2 API +18, D8 Reliability +10',
    icon: Calendar,
    color: 'emerald',
  },
  {
    tool: 'Package Builder Endpoint',
    description:
      'Structured packages with clear line items. Base package, add-ons (second shooter: $500, drone: $750, album: $1,200), and custom bundle pricing. Returns total with tax and deposit amount.',
    example: 'build_package({ base: "wedding-8hr", addons: ["second-shooter", "drone"] })',
    impact: 'D4 Pricing +20, D9 AgentExp +14',
    icon: Layers,
    color: 'emerald',
  },
  {
    tool: 'Booking with Deposit',
    description:
      'Complete booking flow: select package, confirm date, pay deposit, receive contract. Agent can complete the entire transaction without a phone call or email thread.',
    example: 'create_booking({ package_id: "wedding-8hr", date: "2026-09-12", deposit: true })',
    impact: 'D5 Payment +15, D3 Onboarding +12',
    icon: CheckCircle2,
    color: 'emerald',
  },
  {
    tool: 'File Delivery Tracking',
    description:
      'Delivery status API: editing in progress, preview gallery ready, final gallery delivered, album shipped. Agent can check status and notify the client without the photographer sending manual updates.',
    example: 'get_delivery_status({ booking_id: "BK-2026-0912" })',
    impact: 'D8 Reliability +8, D6 Data +10',
    icon: Upload,
    color: 'emerald',
  },
]

const marketStats = [
  { value: '$40B', label: 'US creative services market', icon: DollarSign },
  { value: '<10', label: 'estimated agent readiness score', icon: BarChart3 },
  { value: '0', label: 'photographers with MCP servers', icon: Server },
  { value: '2.7M', label: 'events per year needing photo/video', icon: Camera },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why would an AI agent need to book a photographer?',
    answer:
      'AI event planning agents are already being built. When someone tells their AI assistant "plan my wedding for September," the agent needs to book a venue, caterer, florist, and photographer. The photographer with a bookable API gets the job. The one with a contact form gets skipped for someone the agent can actually transact with.',
  },
  {
    question: 'My work is too personal for AI booking. Does this really apply?',
    answer:
      'The creative consultation does not go away. What changes is how clients find you and initiate the process. Instead of scrolling Instagram, an agent searches structured portfolios by style. Instead of sending a DM, the agent checks your availability and holds a date. You still do the consultation call — but you get more of them because agents can actually reach you.',
  },
  {
    question: 'What about platforms like HoneyBook or ShootProof?',
    answer:
      'These platforms handle client management and gallery delivery, but none expose MCP-compatible APIs. They are great for internal workflow but do not make you discoverable to AI agents. The fix is for these platforms to add MCP endpoints — or for photographers to add an agent layer on top of their existing tools.',
  },
  {
    question: 'How would an agent evaluate my portfolio style?',
    answer:
      'Through structured tags and metadata. Instead of an agent trying to interpret your Instagram aesthetic, you tag your work: style (moody, bright, editorial), setting (outdoor, studio, urban), event type (wedding, corporate, product). The agent matches client preferences to your tags. This is more reliable than visual interpretation and faster than scrolling a feed.',
  },
  {
    question: 'What would my agent readiness score be right now?',
    answer:
      'If you have a website with pricing information and a contact form, probably 8-15. If you have an online booking system like Calendly, maybe 18-25. To break 40 (Bronze), you need structured data endpoints. To reach 60 (Silver), you need a real API with availability, pricing, and booking. Run a free scan at agenthermes.ai/audit to see your exact score.',
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

export default function PhotographyVideographyAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Photography and Videography Agent Readiness: Why Creative Professionals Can\'t Be Booked by AI',
    description:
      'The $40B creative services market runs on Instagram portfolios, DM booking, and unstructured pricing. AI event planning agents will book photographers — the first one with an MCP server captures the wedding and corporate market.',
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
    mainEntityOfPage:
      'https://agenthermes.ai/blog/photography-videography-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'photography videography agent readiness, photographer AI booking, creative services agent readiness, photographer MCP server',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Photography & Videography Agent Readiness',
          item: 'https://agenthermes.ai/blog/photography-videography-agent-readiness',
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
      title="Photography and Videography Agent Readiness: Why Creative Professionals Can't Be Booked by AI"
      shareUrl="https://agenthermes.ai/blog/photography-videography-agent-readiness"
      currentHref="/blog/photography-videography-agent-readiness"
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
            <span className="text-zinc-400">Photography &amp; Videography Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Camera className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Creative Services
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Photography and Videography Agent Readiness:{' '}
            <span className="text-emerald-400">Why Creative Professionals Can&apos;t Be Booked by AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The <strong className="text-zinc-100">$40 billion</strong> creative services market
            runs on Instagram portfolios, DM booking, and &ldquo;starts at&rdquo; pricing.
            AI event planning agents are coming — and they will book the photographer with
            a structured API, not the one with a pretty feed and a contact form.
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

      {/* ===== THE MARKET ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-500" />
            A $40 Billion Market That AI Cannot Reach
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Photography and videography is one of the largest creative services markets in the
              United States. Wedding photography alone is a $10 billion segment. Corporate event
              coverage, product photography, real estate shoots, headshots, and social media content
              creation make up the rest of a market that touches almost every industry.
            </p>
            <p>
              Yet when an AI agent tries to book a photographer, it hits a wall almost immediately.
              The industry operates on platforms and workflows that are fundamentally incompatible
              with machine interaction. Portfolios are visual-only with no structured metadata.
              Booking requires human conversation. Pricing is deliberately opaque. Every project
              is treated as a custom consultation.
            </p>
            <p>
              This is not a critique of how photographers run their businesses — it is an observation
              about what happens when AI agents enter the market. The creative professionals who
              make themselves <strong className="text-zinc-100">agent-accessible</strong> will capture
              a new channel of demand. Everyone else will wonder where the leads went.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {marketStats.map((stat) => (
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

      {/* ===== CURRENT STATE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-red-500" />
            Five Reasons Photographers Are Invisible to AI Agents
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            We scanned photography and videography businesses across our 500-business dataset.
            The average score was under 10. Here is why.
          </p>

          <div className="space-y-4 mb-8">
            {currentState.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.problem}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{item.problem}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-red-400">The Instagram trap:</strong> Many photographers
              believe their Instagram presence makes them discoverable. It does — to humans scrolling
              a feed. But Instagram has no public API for portfolio search by style, no availability
              data, and no booking endpoint. An AI agent cannot DM a photographer and negotiate
              a package. The platform that feels like maximum visibility is actually maximum
              invisibility to the agent economy.
            </p>
          </div>
        </div>
      </section>

      {/* ===== AGENT-READY FEATURES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Photography Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An agent-ready photographer exposes five capabilities that let AI agents discover,
            evaluate, and book them without a single phone call or DM.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyFeatures.map((feature) => {
              const colors = getColorClasses(feature.color)
              return (
                <div
                  key={feature.tool}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <feature.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{feature.tool}</h3>
                      <span className="text-xs text-emerald-400">{feature.impact}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{feature.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className="text-emerald-400 text-xs">{feature.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE AGENT BOOKING SCENARIO ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            The Scenario: An AI Event Planner Books Your Competition
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              A bride tells her AI assistant: &ldquo;Find me a documentary-style wedding
              photographer available September 12th, outdoor venue, budget around $4,000.&rdquo;
            </p>
            <p>
              The agent searches for photographers with structured portfolios. It finds two
              in the area. Photographer A has an MCP server with style tags, availability,
              and package pricing. Photographer B has a beautiful Instagram with 50K followers
              and a &ldquo;Contact Me&rdquo; button.
            </p>
            <p>
              The agent checks Photographer A&apos;s availability — September 12th is open. It pulls
              the 8-hour wedding package at $3,800, adds the second shooter for $500 (over
              budget, but the agent flags the option). It holds the date and presents the
              package to the bride with portfolio samples tagged &ldquo;documentary, outdoor, wedding.&rdquo;
            </p>
            <p>
              Photographer B? The agent cannot check their availability, cannot get pricing,
              and cannot hold a date. It tells the bride: &ldquo;I found one photographer available
              on your date. Would you like me to book them?&rdquo;
            </p>
          </div>

          <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-blue-400">This is not hypothetical.</strong> AI event planning
              agents are being built right now. The photographer booking step is one of dozens
              of vendor selections the agent makes. Each vendor that cannot be booked
              programmatically gets replaced by one that can. First-mover advantage in the agent
              economy is about infrastructure, not talent.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCORING BREAKDOWN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Scoring Breakdown: Where Photographers Lose Points
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The Agent Readiness Score evaluates 9 dimensions. Here is how the typical
            photography or videography business scores across each.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div>Typical Score</div>
              <div>Why</div>
            </div>
            {[
              { dimension: 'D1 Discovery', score: '5/100', why: 'No structured metadata, no agent-card.json' },
              { dimension: 'D2 API', score: '0/100', why: 'No API endpoints of any kind' },
              { dimension: 'D3 Onboarding', score: '8/100', why: 'Contact form only, no programmatic signup' },
              { dimension: 'D4 Pricing', score: '3/100', why: '"Starts at" or "Contact for quote"' },
              { dimension: 'D5 Payment', score: '5/100', why: 'No online deposit or booking payment' },
              { dimension: 'D6 Data', score: '4/100', why: 'Portfolio is images without structured data' },
              { dimension: 'D7 Security', score: '12/100', why: 'HTTPS exists, basic headers' },
              { dimension: 'D8 Reliability', score: '8/100', why: 'No SLA, no status page, no uptime data' },
              { dimension: 'D9 Agent Experience', score: '0/100', why: 'No MCP, no llms.txt, no agent card' },
            ].map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.dimension}</div>
                <div className="text-red-400">{row.score}</div>
                <div className="text-zinc-500">{row.why}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The weighted total for the typical photographer comes out to{' '}
              <strong className="text-zinc-100">under 10 out of 100</strong>. That is ARL-0: Dark.
              Completely invisible to every AI agent in existence. Even basic improvements — like
              adding structured pricing data and a booking calendar endpoint — could move a
              photographer to 25-30, which is enough to start appearing in agent searches.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WEDDING AND CORPORATE OPPORTUNITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            The Wedding and Corporate Opportunity
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Two segments will see agent-driven booking first: weddings and corporate events.
              Both involve professional event planners who are early adopters of AI tools.
              Both require coordinating multiple vendors (venue, catering, flowers, music,
              photography) — exactly the kind of multi-step workflow that AI agents excel at.
            </p>
            <p>
              A corporate event coordinator using an AI assistant to plan a 500-person conference
              needs to book a photographer for keynotes, breakout sessions, and networking events.
              The agent needs to check availability across dates, compare packages that include
              headshot stations and event coverage, and handle the booking through procurement.
              The photographer with an API handles this in seconds. The one without requires
              three emails and a phone call.
            </p>
            <p>
              The economics are compelling. A wedding photographer booking through an agent
              pays zero customer acquisition cost — no Instagram ads, no wedding expo booth
              fees, no SEO spend. The agent finds them because they are agent-ready. That
              is a structural cost advantage that compounds over time as more bookings flow
              through agent channels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Wedding Market',
                detail: '2.5 million weddings per year in the US. Average photography spend: $2,500-$5,000. AI wedding planners will coordinate all vendors — photographer is one of the first bookings.',
              },
              {
                title: 'Corporate Events',
                detail: '1.8 million corporate events annually. Photography packages: $1,000-$3,000. Procurement departments already prefer vendors with structured APIs and automated invoicing.',
              },
              {
                title: 'Real Estate',
                detail: '5.6 million homes sold per year. Listing photography: $200-$500. Real estate AI agents will book photographers for same-week shoots — speed and availability are everything.',
              },
              {
                title: 'Content Creation',
                detail: 'Brands spending $15B/year on content. Product shoots, social media content, headshots. AI marketing agents will book photographers on a recurring schedule with structured deliverables.',
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
                title: 'Creative Services Agent Readiness',
                href: '/blog/creative-services-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Local Business Agent Readiness: Why 33M Businesses Score Under 15',
                href: '/blog/local-business-agent-readiness',
                tag: 'Market Analysis',
                tagColor: 'amber',
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
            Make your creative business bookable by AI agents
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your Agent Readiness Score and find out exactly what to fix. Auto-generated
            MCP server, portfolio catalog, and booking endpoint — no code required.
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
