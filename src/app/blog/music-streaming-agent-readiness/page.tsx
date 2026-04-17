import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Music,
  Network,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    'Music Streaming Agent Readiness: Why Spotify Scores 54 and What It Means for the Industry | AgentHermes',
  description:
    'Spotify scores 54 (Bronze) on agent readiness. Strong Web API and OAuth, but no agent-card.json, undocumented rate limits, and no MCP. We analyze the entire music streaming vertical.',
  keywords: [
    'music streaming Spotify agent readiness',
    'Spotify API agent',
    'Apple Music agent readiness',
    'music streaming AI agents',
    'Spotify agent score',
    'music API AI',
    'Tidal agent readiness',
    'YouTube Music agent readiness',
    'music streaming MCP',
  ],
  openGraph: {
    title:
      'Music Streaming Agent Readiness: Why Spotify Scores 54 and What It Means for the Industry',
    description:
      'Spotify leads music streaming with a 54 Agent Readiness Score, but the whole industry is stuck at Bronze. Rights management blocks full agent access.',
    url: 'https://agenthermes.ai/blog/music-streaming-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Music Streaming Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Music Streaming Agent Readiness: Why Spotify Scores 54 and What It Means for the Industry',
    description:
      'Spotify 54, Apple Music 31, YouTube Music 38, Tidal 27. Music streaming is stuck at Bronze because rights management blocks agent automation.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/music-streaming-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const platformScores = [
  {
    name: 'Spotify',
    score: 54,
    tier: 'Bronze',
    tierColor: 'amber',
    strengths: [
      'Full Web API with 80+ endpoints',
      'OAuth 2.0 with granular scopes',
      'Structured catalog data (artists, albums, tracks, playlists)',
      'Excellent developer documentation with interactive console',
      'Webhook support for playlist changes',
    ],
    weaknesses: [
      'No agent-card.json or llms.txt',
      'Rate limits undocumented (returns 429 with Retry-After but no published limits)',
      'No MCP server or agent-native protocol support',
      'Playback control requires human OAuth consent flow',
      'No machine-readable pricing or plan comparison data',
    ],
  },
  {
    name: 'YouTube Music',
    score: 38,
    tier: 'Not Scored',
    tierColor: 'red',
    strengths: [
      'YouTube Data API v3 covers video and playlist metadata',
      'Google OAuth with extensive scope model',
      'Structured JSON responses with pagination',
    ],
    weaknesses: [
      'No dedicated music API separate from YouTube',
      'Quota system is punitive (10,000 units/day default)',
      'No catalog-level music search (artist discographies, albums)',
      'Playback restricted to embedded players with human interaction',
      'No agent discovery files of any kind',
    ],
  },
  {
    name: 'Apple Music',
    score: 31,
    tier: 'Not Scored',
    tierColor: 'red',
    strengths: [
      'MusicKit JS and native SDKs available',
      'Catalog search returns structured JSON',
      'Developer token model is straightforward',
    ],
    weaknesses: [
      'No public REST API documentation hub (buried in developer.apple.com)',
      'Authentication requires Apple Developer Program membership',
      'No rate-limit headers on responses',
      'Playback requires MusicKit authorization and Apple ID',
      'No agent-card, no MCP, no llms.txt',
    ],
  },
  {
    name: 'Tidal',
    score: 27,
    tier: 'Not Scored',
    tierColor: 'red',
    strengths: [
      'New developer portal launched in 2025',
      'High-quality audio metadata in responses',
    ],
    weaknesses: [
      'API is invite-only with manual approval',
      'No public documentation for unauthenticated users',
      'No OAuth flow for third-party agents',
      'Zero agent discovery infrastructure',
      'Rate limits completely undocumented',
    ],
  },
]

const silverRequirements = [
  {
    requirement: 'Publish agent-card.json',
    description:
      'A machine-readable file at /.well-known/agent-card.json that declares API capabilities, authentication methods, and rate limit policies. This is how agents discover what your API offers without reading human documentation.',
    impact: '+6 points on D1 Discovery',
    icon: Globe,
  },
  {
    requirement: 'Document rate limits in headers and docs',
    description:
      'Expose X-RateLimit-Limit, X-RateLimit-Remaining, and X-RateLimit-Reset on every API response. Publish limits per endpoint in developer docs. Agents that self-throttle reduce your infrastructure costs.',
    impact: '+5 points on D8 Reliability',
    icon: BarChart3,
  },
  {
    requirement: 'Add llms.txt to the root domain',
    description:
      'A plain-text file that tells AI models what the platform does, what API capabilities exist, and how to authenticate. This is the first file AI crawlers read when encountering a new domain.',
    impact: '+4 points on D1 Discovery',
    icon: Code2,
  },
  {
    requirement: 'Expose pricing data as structured JSON',
    description:
      'Return plan names, prices, features, and comparison data from an API endpoint or structured page. AI shopping agents comparing music services need machine-readable pricing, not marketing pages.',
    impact: '+3 points on D4 Pricing',
    icon: Layers,
  },
  {
    requirement: 'Create read-only agent OAuth scope',
    description:
      'Define an OAuth scope specifically for agent access that grants read-only catalog, playlist, and recommendation access without requiring human playback consent. This separates discovery from consumption.',
    impact: '+4 points on D9 Agent Experience',
    icon: Shield,
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why does Spotify score higher than Apple Music?',
    answer:
      'Spotify invested heavily in its public Web API starting in 2014. It has 80+ documented endpoints, interactive API explorers, structured JSON responses, and OAuth with granular scopes. Apple Music has SDKs (MusicKit) but no equivalent public REST API hub. Spotify also returns structured error responses with error codes, while Apple Music often returns generic errors. The gap is in API maturity and documentation quality, not in the music catalog itself.',
  },
  {
    question: 'Can AI agents play music on Spotify?',
    answer:
      'Not without human consent. Spotify playback control requires an authenticated user session with the user-modify-playback-state scope. This scope requires interactive OAuth consent — the user must click "Allow" in a browser. An AI agent cannot complete this flow autonomously. What agents CAN do is search the catalog, manage playlists, get recommendations, and read listening history with appropriate scopes.',
  },
  {
    question:
      'Why is rights management the bottleneck for music streaming agent readiness?',
    answer:
      'Music streaming services license content from record labels and publishers. These licenses typically specify that content is for personal, non-commercial use by authenticated human listeners. Automated playback by AI agents creates legal ambiguity around streaming royalty calculations, listener counts, and license compliance. Until the music industry creates agent-specific licensing frameworks, playback will require human-in-the-loop authentication.',
  },
  {
    question:
      'What would a music streaming MCP server look like?',
    answer:
      'An MCP server for Spotify would expose tools like search_catalog(query, type), get_recommendations(seed_artists, seed_tracks), manage_playlist(action, tracks), and get_new_releases(market). Resources would include catalog metadata, genre taxonomy, and market availability data. Prompts would guide agents through common flows like "create a playlist for a road trip" or "find similar artists to X." The MCP server would handle authentication, rate limiting, and rights-compliant access.',
  },
  {
    question: 'Will music streaming agent readiness improve?',
    answer:
      'Yes, but slowly. Spotify has the strongest foundation and the most to gain from agent-driven discovery (agents recommending songs). The industry shift will likely follow a pattern: read-only catalog access first, then playlist management, then recommendation integration, and finally rights-managed playback. We estimate Silver-tier scores across the industry by late 2027.',
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MusicStreamingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Music Streaming Agent Readiness: Why Spotify Scores 54 and What It Means for the Industry',
    description:
      'Case study of the music streaming vertical. Spotify leads at 54 (Bronze) but the industry faces unique challenges around rights management and agent access.',
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
      'https://agenthermes.ai/blog/music-streaming-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1900,
    keywords:
      'music streaming Spotify agent readiness, Apple Music agent readiness, YouTube Music agent readiness, Tidal agent readiness, music API AI agents',
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
          name: 'Music Streaming Agent Readiness',
          item: 'https://agenthermes.ai/blog/music-streaming-agent-readiness',
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
      title="Music Streaming Agent Readiness: Why Spotify Scores 54 and What It Means for the Industry"
      shareUrl="https://agenthermes.ai/blog/music-streaming-agent-readiness"
      currentHref="/blog/music-streaming-agent-readiness"
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
                Music Streaming Agent Readiness
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <Music className="h-3.5 w-3.5" />
                Vertical Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                Case Study
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Music Streaming Agent Readiness:{' '}
              <span className="text-emerald-400">
                Why Spotify Scores 54 and What It Means for the Industry
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Music streaming is a $40 billion industry where four platforms
              control 85% of the market. Spotify leads on agent readiness
              with a score of{' '}
              <strong className="text-zinc-100">54 (Bronze, near Silver)</strong>,
              but the entire industry faces a unique challenge: rights
              management prevents fully automated agent access to the core
              product. We scanned all four major platforms and broke down
              exactly where they stand.
            </p>

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
                    14 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== THE SCOREBOARD ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-500" />
              The Music Streaming Scoreboard
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                We ran AgentHermes scans on all four major music streaming
                platforms. The results show a clear leader but an industry
                that collectively underperforms relative to other tech
                verticals. For comparison, the{' '}
                <Link
                  href="/blog/developer-tools-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  developer tools vertical
                </Link>{' '}
                averages 58, and the{' '}
                <Link
                  href="/blog/media-entertainment-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  media and entertainment vertical
                </Link>{' '}
                averages 34. Music streaming sits between them at 37.5 average,
                pulled up almost entirely by Spotify.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {platformScores.map((platform) => {
                const tierColorMap: Record<string, string> = {
                  amber: 'text-amber-400',
                  red: 'text-red-400',
                }
                return (
                  <div
                    key={platform.name}
                    className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
                  >
                    <Music className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                    <div className="text-2xl sm:text-3xl font-bold text-zinc-100">
                      {platform.score}
                    </div>
                    <div className="text-sm font-medium text-zinc-300 mt-1">
                      {platform.name}
                    </div>
                    <div
                      className={`text-xs mt-1 ${tierColorMap[platform.tierColor]}`}
                    >
                      {platform.tier}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== PLATFORM DEEP DIVES ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-blue-500" />
              Platform-by-Platform Breakdown
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Each platform has a fundamentally different approach to
              developer access. Those differences drive the scoring gaps.
            </p>

            <div className="space-y-6 mb-8">
              {platformScores.map((platform) => (
                <div
                  key={platform.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-zinc-100">
                      {platform.name}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold">
                      Score: {platform.score}/100
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                        Strengths
                      </h4>
                      <ul className="space-y-1.5">
                        {platform.strengths.map((s) => (
                          <li
                            key={s}
                            className="flex items-start gap-2 text-sm text-zinc-400"
                          >
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-amber-400 mb-2">
                        Weaknesses
                      </h4>
                      <ul className="space-y-1.5">
                        {platform.weaknesses.map((w) => (
                          <li
                            key={w}
                            className="flex items-start gap-2 text-sm text-zinc-400"
                          >
                            <Target className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== THE RIGHTS MANAGEMENT WALL ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-500" />
              The Rights Management Wall
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Music streaming is unique among tech verticals because the
                core product — listening to music — is governed by licensing
                agreements between platforms, record labels, publishers, and
                performing rights organizations. These agreements were
                written for human listeners, not AI agents.
              </p>
              <p>
                When an AI agent plays a track on Spotify, who counts as the
                listener? Does the stream count toward the artist royalty
                pool? If an agent plays music in the background while a user
                works, is that a genuine stream or automated play fraud? These
                are not hypothetical questions. Spotify removed over 7% of
                streams in 2025 for artificial inflation. The industry is
                hypervigilant about automated access to playback.
              </p>
              <p>
                This means that even if Spotify wanted to offer fully
                automated agent playback, the licensing framework does not
                support it yet. The practical effect:{' '}
                <strong className="text-zinc-100">
                  agents can discover and organize music but cannot play it
                  without human consent
                </strong>
                . This ceiling limits the entire industry to Bronze-to-Silver
                territory until the rights framework evolves.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-amber-400">
                  The agent economy parallel:
                </strong>{' '}
                Just as DMCA required updates for streaming (mechanical
                licenses, the Music Modernization Act), the agent economy
                will require new licensing frameworks for automated music
                access. The platforms that participate in shaping these
                frameworks will define the rules.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PATH TO SILVER ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              What Pushes Spotify to Silver
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Spotify is 6 points away from Silver (60). These five changes
              would close the gap and establish Spotify as the agent-ready
              music platform.
            </p>

            <div className="space-y-4 mb-8">
              {silverRequirements.map((item) => (
                <div
                  key={item.requirement}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <item.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-100">
                        {item.requirement}
                      </h3>
                      <span className="text-xs text-emerald-400 font-medium">
                        {item.impact}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The total potential uplift from these five changes is 22
                points. Spotify would not need all of them to reach Silver —
                agent-card.json plus documented rate limits plus llms.txt
                alone would push it to 69, solidly in Silver territory and on
                par with Stripe and GitHub.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT AI MUSIC AGENTS WILL DO ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              What AI Music Agents Will Do
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Even within the rights management constraints, there is a
                large surface area of agent-driven music interactions that
                the industry should prepare for.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  title: 'Discovery agents',
                  detail:
                    'Users ask AI assistants for music recommendations. The agent queries catalog APIs, cross-references listening history, and surfaces results. The platform with the best API wins the recommendation.',
                },
                {
                  title: 'Playlist management agents',
                  detail:
                    'Agents that curate, update, and maintain playlists based on mood, activity, or social context. They need playlist CRUD APIs with real-time access.',
                },
                {
                  title: 'Music comparison agents',
                  detail:
                    'Shopping agents that compare streaming platforms on price, catalog size, audio quality, and exclusive content. They need structured pricing and feature data.',
                },
                {
                  title: 'Event integration agents',
                  detail:
                    'Agents that connect concert ticket purchases with artist pages, set reminders for new releases, and sync music preferences with event discovery platforms.',
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
                The platform that makes these agent interactions easiest will
                capture a disproportionate share of agent-driven
                recommendations. When 500 million AI assistants are
                recommending songs, the API with the best structured data and
                lowest friction wins. That is Spotify today, but the margin
                is narrow.
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
                    'Media and Entertainment Agent Readiness: The Full Vertical',
                  href: '/blog/media-entertainment-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title:
                    'Developer Tools Agent Readiness: Why Devtools Lead the Pack',
                  href: '/blog/developer-tools-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title: 'Check Your Agent Readiness Score',
                  href: '/audit',
                  tag: 'Free Tool',
                  tagColor: 'emerald',
                },
              ].map((article) => {
                const colorMap: Record<string, string> = {
                  emerald:
                    'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                  purple:
                    'bg-purple-500/10 border-purple-500/20 text-purple-400',
                  amber:
                    'bg-amber-500/10 border-amber-500/20 text-amber-400',
                }
                return (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="group p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                  >
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full border ${colorMap[article.tagColor]} text-xs font-medium mb-3`}
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
              How does your platform score?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Run a free Agent Readiness Scan on any business or platform.
              See your score across all 9 dimensions in 60 seconds.
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
