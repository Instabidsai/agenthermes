import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  Globe,
  HelpCircle,
  Layers,
  Lightbulb,
  Network,
  Search,
  Server,
  Shield,
  Sparkles,
  Target,
  Ticket,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Library and Museum Agent Readiness: Why Cultural Institutions Are Missing the AI Discovery Wave | AgentHermes',
  description:
    'Libraries and museums have rich digital catalogs but almost no public APIs. AI cultural agents will recommend exhibits and reserve tickets — but only if institutions expose structured data. Agent readiness analysis for cultural institutions.',
  keywords: [
    'library museum agent readiness',
    'museum AI agent',
    'library API',
    'cultural institution agent readiness',
    'OPAC API',
    'museum collection API',
    'AI cultural discovery',
    'library digital catalog agent',
    'museum ticket booking agent',
  ],
  openGraph: {
    title:
      'Library and Museum Agent Readiness: Why Cultural Institutions Are Missing the AI Discovery Wave',
    description:
      'Libraries and museums have digital catalogs but no public APIs for agents. Analysis of how cultural institutions can become agent-ready.',
    url: 'https://agenthermes.ai/blog/library-museum-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Library and Museum Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Library and Museum Agent Readiness: Why Cultural Institutions Are Missing the AI Discovery Wave',
    description:
      'Rich digital catalogs. Zero public APIs. Cultural institutions are invisible to AI agents.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/library-museum-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const readinessGaps = [
  {
    area: 'Collection Search',
    current: 'OPAC web interface requiring human interaction, keyword search behind login walls',
    agentReady:
      'Public collection search API with filters for medium, period, artist, availability',
    icon: Search,
    color: 'red',
  },
  {
    area: 'Event Calendar',
    current: 'HTML event pages, PDF flyers, social media posts for upcoming programs',
    agentReady:
      'Structured event endpoint with dates, descriptions, capacity, registration status',
    icon: Calendar,
    color: 'amber',
  },
  {
    area: 'Ticket / Membership',
    current:
      'Ticket purchase through third-party widget or phone, membership forms as PDFs',
    agentReady:
      'Ticket availability API with pricing tiers, membership enrollment endpoint with plan comparison',
    icon: Ticket,
    color: 'red',
  },
  {
    area: 'Educational Programs',
    current:
      'Program listings on web pages, registration by email or phone, waitlists managed manually',
    agentReady:
      'Program catalog API with age groups, topics, capacity, registration endpoint with confirmation',
    icon: BookOpen,
    color: 'amber',
  },
]

const exceptions = [
  {
    name: 'Library of Congress',
    score: 'Est. 52',
    detail:
      'Public REST API for digital collections (loc.gov/apis). JSON responses, search by subject, date, format. No ticket booking needed. Missing: agent-card.json, MCP server, llms.txt.',
    color: 'emerald',
  },
  {
    name: 'Smithsonian Open Access',
    score: 'Est. 48',
    detail:
      'Open Access API covers 4.5M+ objects across 21 museums. CC0 licensing. JSON with rich metadata. Missing: event/ticket endpoints, agent-native discovery files, MCP.',
    color: 'emerald',
  },
  {
    name: 'Europeana',
    score: 'Est. 45',
    detail:
      'REST API across 3,000+ institutions. 58M+ cultural objects searchable via API. Good documentation. Missing: transactional endpoints, agent-card, MCP.',
    color: 'blue',
  },
  {
    name: 'Average Local Library',
    score: 'Est. 4',
    detail:
      'Website with hours, location, maybe an OPAC link. No public API. No structured data beyond basic Schema.org. Phone number for everything else.',
    color: 'red',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question:
      'Why would an AI agent need to interact with a library or museum?',
    answer:
      'AI travel agents recommend cultural attractions based on user interests. AI research agents search collections for specific artifacts or publications. AI education agents find programs for children and adults. AI personal assistants book tickets, check hours, and reserve event spots. Every interaction that currently requires a phone call or website visit is a candidate for agent automation.',
  },
  {
    question: 'Do libraries have APIs?',
    answer:
      'A handful of major institutions do. The Library of Congress has a public REST API. Many academic libraries expose their catalogs through Z39.50 or SRU protocols, which are machine-readable but not agent-friendly (they predate modern REST conventions). The vast majority of public and local libraries have no API at all — just a website and an OPAC interface designed for human browsers.',
  },
  {
    question:
      'What is the fastest way for a museum to become agent-ready?',
    answer:
      'Start with discovery files: agent-card.json and llms.txt describing your institution, collections, and services. Then expose your event calendar as a structured JSON endpoint. If you sell tickets, add an availability and booking API. These three steps can move a museum from ARL-0 (Dark) to ARL-2 (Basic) in a matter of weeks.',
  },
  {
    question: 'Is the Smithsonian agent-ready?',
    answer:
      'Partially. The Smithsonian Open Access API is excellent for collection search — 4.5 million objects with rich metadata and CC0 licensing. But it lacks transactional capabilities (no ticket booking, no event registration) and agent-native discovery files (no agent-card.json, no MCP server, no llms.txt). We estimate it at roughly 48 on the Agent Readiness Score — strong on data, weak on agent-native protocols.',
  },
  {
    question: 'How many libraries and museums are there in the US?',
    answer:
      'There are approximately 17,000 public libraries, 3,300 academic libraries, and 35,000 museums in the United States. That is over 55,000 cultural institutions, nearly all of which have zero agent-facing infrastructure. The cultural sector represents one of the largest untapped verticals in the agent economy.',
  },
]

function getColorClasses(color: string) {
  const map: Record<string, { text: string; bg: string; border: string }> = {
    red: {
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
    },
    amber: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    blue: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
  }
  return map[color] || map.emerald
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LibraryMuseumAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Library and Museum Agent Readiness: Why Cultural Institutions Are Missing the AI Discovery Wave',
    description:
      'Libraries and museums have rich digital catalogs but almost no public APIs. AI cultural agents will recommend exhibits, search collections, and reserve tickets — but only if institutions expose structured data.',
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
      'https://agenthermes.ai/blog/library-museum-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'library museum agent readiness, museum AI agent, library API, cultural institution agent readiness, OPAC API',
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
          name: 'Blog',
          item: 'https://agenthermes.ai/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Library and Museum Agent Readiness',
          item: 'https://agenthermes.ai/blog/library-museum-agent-readiness',
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
      title="Library and Museum Agent Readiness: Why Cultural Institutions Are Missing the AI Discovery Wave"
      shareUrl="https://agenthermes.ai/blog/library-museum-agent-readiness"
      currentHref="/blog/library-museum-agent-readiness"
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
              <Link
                href="/"
                className="hover:text-zinc-300 transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-zinc-300 transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-zinc-400">
                Library &amp; Museum Agent Readiness
              </span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <Building2 className="h-3.5 w-3.5" />
                Vertical Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                Cultural Institutions
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Library and Museum Agent Readiness:{' '}
              <span className="text-emerald-400">
                Why Cultural Institutions Are Missing the AI Discovery Wave
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              There are over 55,000 libraries and museums in the United States.
              They hold some of the richest structured data on the planet —
              catalog records, collection metadata, event schedules, educational
              programs. Almost none of it is accessible to AI agents. When a
              travel agent asks &ldquo;what exhibits are open near me this
              weekend,&rdquo; it gets silence.
            </p>

            {/* Author byline */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
              <div className="author-avatar">AH</div>
              <div>
                <div className="text-sm font-semibold text-zinc-200">
                  AgentHermes Research
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    April 15, 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    11 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== THE PARADOX ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Database className="h-5 w-5 text-emerald-500" />
              The Paradox: Rich Data, Zero Access
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Libraries and museums are paradoxically some of the most
                data-rich and least agent-accessible institutions in the
                economy. A university library catalogs millions of items with
                standardized metadata — MARC records, Dublin Core, controlled
                vocabularies. A natural history museum tags every specimen with
                taxonomy, provenance, collection date, and conservation status.
                This is structured data that would make most SaaS companies
                envious.
              </p>
              <p>
                But the data sits behind human-only interfaces. The OPAC
                (Online Public Access Catalog) is designed for a person typing
                keywords into a search box. The museum collection database
                powers a web gallery that requires clicking and scrolling. Event
                calendars are HTML pages. Program registration is a phone call
                or an email to the education department.
              </p>
              <p>
                For AI agents, this means cultural institutions are effectively
                dark. An AI travel planner cannot check which exhibits are
                currently showing at a local museum. An AI research assistant
                cannot search a library&apos;s special collections
                programmatically. An AI education agent cannot enroll a child in
                a summer reading program. The data exists. The access does not.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '17K', label: 'US public libraries', icon: BookOpen },
                { value: '35K', label: 'US museums', icon: Building2 },
                {
                  value: '~4',
                  label: 'avg agent readiness score',
                  icon: BarChart3,
                },
                {
                  value: '3',
                  label: 'institutions with public APIs',
                  icon: Code2,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                >
                  <stat.icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHAT AGENT-READY LOOKS LIKE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              What Agent-Ready Looks Like for Cultural Institutions
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Four capabilities separate an agent-invisible institution from
              one that AI agents can discover, search, and transact with.
            </p>

            <div className="space-y-4 mb-8">
              {readinessGaps.map((gap) => {
                const colors = getColorClasses(gap.color)
                return (
                  <div
                    key={gap.area}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}
                      >
                        <gap.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">
                        {gap.area}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1 font-medium">
                          Current State
                        </p>
                        <p className="text-sm text-red-400">{gap.current}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                        <p className="text-xs text-zinc-500 mb-1 font-medium">
                          Agent-Ready
                        </p>
                        <p className="text-sm text-emerald-400">
                          {gap.agentReady}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== THE EXCEPTIONS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              The Exceptions: Who Is Doing It Right
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                A handful of major institutions have public APIs that make
                portions of their collections searchable by machines. They
                prove the model works — but they also highlight how far the
                sector has to go.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {exceptions.map((ex) => {
                const colors = getColorClasses(ex.color)
                return (
                  <div
                    key={ex.name}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-zinc-100">
                        {ex.name}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium`}
                      >
                        {ex.score}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {ex.detail}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-amber-400">
                  The gap between leaders and the field:
                </strong>{' '}
                Even the best cultural institution APIs (Library of Congress,
                Smithsonian) would score Silver at best on the Agent Readiness
                Score. They have excellent read-only collection data but lack
                agent-native discovery files, transactional capabilities, and
                MCP servers. The average local library or museum scores under
                5 — website, phone number, and nothing else.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHY THIS MATTERS NOW ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Why This Matters Now: The AI Cultural Agent
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                AI agents are already being built for travel planning,
                education, and research — three domains where libraries and
                museums are central. Consider the use cases that are emerging
                right now:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: 'AI Travel Planners',
                  detail:
                    'A family visiting a new city asks their AI agent for museum recommendations. The agent needs exhibit data, hours, ticket prices, and booking capability. Without an API, it can only link to the website and say "check their hours."',
                },
                {
                  title: 'AI Research Assistants',
                  detail:
                    'A historian asks their AI to find primary source documents about the Civil War. The Library of Congress API can serve this. The other 16,999 public libraries cannot. Millions of unique special collections are invisible.',
                },
                {
                  title: 'AI Education Agents',
                  detail:
                    'A parent asks their AI to find age-appropriate weekend programs for their 8-year-old. Libraries and museums run thousands of programs. None are discoverable via API. The agent defaults to commercial alternatives.',
                },
                {
                  title: 'AI Accessibility Agents',
                  detail:
                    'An agent helping a wheelchair user plan a museum visit needs to check accessibility features, elevator locations, and accessible entrance availability. This data exists — in PDFs and staff knowledge, not in APIs.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className="font-bold text-zinc-100 mb-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The risk for cultural institutions is not that AI agents will
                replace them — it is that agents will route people elsewhere.
                When an AI agent cannot find structured data about a museum
                exhibit, it recommends the commercial alternative that does
                have an API. The museum does not lose to another museum. It
                loses to a theme park or an online experience that is
                agent-accessible.
              </p>
              <p>
                This is the same dynamic we documented in the{' '}
                <Link
                  href="/blog/education-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  education sector analysis
                </Link>{' '}
                — institutions with deep knowledge but no agent-facing
                infrastructure are ceding ground to commercial platforms that
                prioritize machine accessibility.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE PATH FORWARD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-emerald-500" />
              The Path Forward: From Dark to Discoverable
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Cultural institutions do not need to build everything at once.
              The path from ARL-0 (Dark) to ARL-3 (Integrated) follows a
              practical sequence.
            </p>

            <div className="space-y-3 mb-8">
              {[
                {
                  step: '1',
                  title: 'Discovery files (1 day)',
                  detail:
                    'Create agent-card.json and llms.txt describing the institution, collections, hours, and services. This alone moves from ARL-0 to ARL-1.',
                  icon: Globe,
                },
                {
                  step: '2',
                  title: 'Event calendar API (1 week)',
                  detail:
                    'Expose upcoming events, exhibits, and programs as a structured JSON endpoint. Include dates, descriptions, capacity, and registration status.',
                  icon: Calendar,
                },
                {
                  step: '3',
                  title: 'Collection search endpoint (2 weeks)',
                  detail:
                    'If the OPAC or collection database exists internally, add a public REST endpoint with search, filtering, and pagination. Most catalog systems support this with configuration.',
                  icon: Search,
                },
                {
                  step: '4',
                  title: 'Transactional capabilities (1 month)',
                  detail:
                    'Ticket availability and booking, program registration, membership enrollment. These require integration with existing ticketing and registration systems.',
                  icon: Ticket,
                },
                {
                  step: '5',
                  title:
                    'MCP server (built on top of the above)',
                  detail:
                    'Wrap all endpoints in an MCP server with tool descriptions agents can discover automatically. AgentHermes can auto-generate this from existing APIs.',
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
                      <h3 className="font-bold text-zinc-100 text-sm">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The institutions that move first will capture a
                disproportionate share of agent-driven cultural recommendations.
                There are parallels in the{' '}
                <Link
                  href="/blog/government-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  government sector
                </Link>{' '}
                — public institutions with valuable data that remains locked
                behind legacy interfaces.
              </p>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section
          id="faq"
          className="scroll-mt-24 pb-12 sm:pb-16 border-t border-zinc-800/50"
        >
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
                  <h3 className="text-base font-bold text-zinc-100 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== RELATED ARTICLES ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Continue Reading
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title:
                    'Education Agent Readiness: Schools and Universities',
                  href: '/blog/education-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Government Agent Readiness: Public Services in the Agent Economy',
                  href: '/blog/government-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Check Your Agent Readiness Score',
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
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mb-3`}
                    >
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
              Is your institution visible to AI agents?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run a free Agent Readiness Scan to see how your library or
              museum scores across all 9 dimensions. Most cultural
              institutions score under 10.
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
                Connect My Institution
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </BlogArticleWrapper>
  )
}
