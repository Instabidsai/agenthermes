import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Scale,
  ArrowRight,
  Trophy,
  Search,
  BookOpen,
  UserPlus,
  Plug,
  Activity,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Shield,
  MessageSquare,
  Globe,
  Code2,
  Lock,
  Server,
  Bot,
  Users,
  Zap,
  Hash,
  Bell,
} from 'lucide-react'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'

// ---------------------------------------------------------------------------
// Metadata + OG
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Slack vs Discord: Agent Readiness for Communication Platforms | AgentHermes',
  description:
    'Head-to-head comparison of Slack and Discord on AI agent readiness. Both have bot ecosystems -- but which is more ready for autonomous AI agents? Scores, journey, and bot ecosystem analysis.',
  openGraph: {
    title: 'Slack vs Discord: Agent Readiness for Communication Platforms',
    description:
      'Which communication platform is more agent-ready? Compare Slack and Discord bot ecosystems, API quality, and agent readiness across 9 dimensions.',
    url: 'https://agenthermes.ai/compare/slack-vs-discord',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Slack vs Discord Agent Readiness Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Slack vs Discord: Agent Readiness for Communication Platforms',
    description:
      'Which communication platform is more agent-ready? Compare Slack and Discord on 9 dimensions.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://agenthermes.ai/compare/slack-vs-discord',
  },
}

// ---------------------------------------------------------------------------
// Score Data
// ---------------------------------------------------------------------------

const SLACK = {
  name: 'Slack',
  domain: 'slack.com',
  score: 64,
  tier: 'silver' as const,
  arl: 2,
  arlName: 'Readable',
  dimensions: [
    { key: 'D1', label: 'Discoverability', score: 60, max: 100 },
    { key: 'D2', label: 'API Quality', score: 70, max: 100 },
    { key: 'D3', label: 'Onboarding', score: 65, max: 100 },
    { key: 'D4', label: 'Pricing Transparency', score: 25, max: 100 },
    { key: 'D5', label: 'Payment', score: 30, max: 100 },
    { key: 'D6', label: 'Data Quality', score: 65, max: 100 },
    { key: 'D7', label: 'Security', score: 80, max: 100 },
    { key: 'D8', label: 'Reliability', score: 85, max: 100 },
    { key: 'D9', label: 'Agent Experience', score: 60, max: 100 },
  ],
  journey: [
    { step: 'FIND', score: 60, status: 'ready' as const },
    { step: 'UNDERSTAND', score: 63, status: 'ready' as const },
    { step: 'SIGN UP', score: 65, status: 'ready' as const },
    { step: 'CONNECT', score: 75, status: 'ready' as const },
    { step: 'USE', score: 85, status: 'ready' as const },
    { step: 'PAY', score: 28, status: 'not-ready' as const },
  ],
}

const DISCORD = {
  name: 'Discord',
  domain: 'discord.com',
  score: 52,
  tier: 'bronze' as const,
  arl: 1,
  arlName: 'Discoverable',
  dimensions: [
    { key: 'D1', label: 'Discoverability', score: 40, max: 100 },
    { key: 'D2', label: 'API Quality', score: 65, max: 100 },
    { key: 'D3', label: 'Onboarding', score: 55, max: 100 },
    { key: 'D4', label: 'Pricing Transparency', score: 20, max: 100 },
    { key: 'D5', label: 'Payment', score: 25, max: 100 },
    { key: 'D6', label: 'Data Quality', score: 40, max: 100 },
    { key: 'D7', label: 'Security', score: 70, max: 100 },
    { key: 'D8', label: 'Reliability', score: 75, max: 100 },
    { key: 'D9', label: 'Agent Experience', score: 55, max: 100 },
  ],
  journey: [
    { step: 'FIND', score: 40, status: 'partial' as const },
    { step: 'UNDERSTAND', score: 48, status: 'partial' as const },
    { step: 'SIGN UP', score: 55, status: 'partial' as const },
    { step: 'CONNECT', score: 68, status: 'ready' as const },
    { step: 'USE', score: 75, status: 'ready' as const },
    { step: 'PAY', score: 23, status: 'not-ready' as const },
  ],
}

// ---------------------------------------------------------------------------
// Bot Ecosystem Comparison
// ---------------------------------------------------------------------------

const BOT_FEATURES = [
  {
    feature: 'Bot Registration',
    slack: 'Slack App Directory with OAuth 2.0, granular permission scopes, and workspace-level installation',
    discord: 'Discord Developer Portal with OAuth 2.0, guild-level bot permissions via intents system',
    slackAdvantage: true,
  },
  {
    feature: 'Message Handling',
    slack: 'Events API + Socket Mode + Web API. Real-time events, slash commands, interactive components, Block Kit UI',
    discord: 'Gateway WebSocket + REST API. Real-time events, slash commands, message components, embeds',
    slackAdvantage: true,
  },
  {
    feature: 'Structured Interactions',
    slack: 'Block Kit with 20+ interactive elements, modals, home tabs, and workflow steps. Rich structured UI for agents.',
    discord: 'Message components (buttons, selects, modals). Simpler but effective. Less structured than Block Kit.',
    slackAdvantage: true,
  },
  {
    feature: 'Webhook Support',
    slack: 'Incoming webhooks, outgoing webhooks, event subscriptions. All with signing secret verification.',
    discord: 'Incoming webhooks per channel. Interaction endpoints with Ed25519 signature verification.',
    slackAdvantage: false,
  },
  {
    feature: 'Rate Limiting',
    slack: 'Tiered rate limits (1-100+ req/min by method). Well-documented. Retry-After headers.',
    discord: 'Per-route rate limits with bucket system. X-RateLimit headers. Global + per-resource limits.',
    slackAdvantage: false,
  },
  {
    feature: 'Bot Marketplace',
    slack: 'Slack App Directory -- curated marketplace with 2,600+ apps. Review process, analytics dashboard.',
    discord: 'App Discovery (newer) + top.gg / Discord Bot List (community). Less curated, more open.',
    slackAdvantage: true,
  },
  {
    feature: 'Agent Autonomy',
    slack: 'Workflow Builder + automation platform. Bots can create workflows, respond to triggers, chain actions.',
    discord: 'AutoMod + basic triggers. Less native automation. Most complex automation requires custom bots.',
    slackAdvantage: true,
  },
  {
    feature: 'Developer SDKs',
    slack: 'Bolt SDK (JS, Python, Java). Official SDKs for all major languages. Extensive example repos.',
    discord: 'discord.js (JS), discord.py (Python), JDA (Java). Community-driven with strong ecosystems.',
    slackAdvantage: false,
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function barColor(score: number): string {
  if (score >= 75) return 'bg-emerald-500'
  if (score >= 50) return 'bg-yellow-500'
  if (score >= 25) return 'bg-amber-500'
  return 'bg-red-500'
}

function statusIcon(status: 'ready' | 'partial' | 'not-ready') {
  if (status === 'ready') return <CheckCircle2 className="h-4 w-4 text-emerald-400" />
  if (status === 'partial') return <AlertCircle className="h-4 w-4 text-amber-400" />
  return <XCircle className="h-4 w-4 text-red-400" />
}

function statusColor(status: 'ready' | 'partial' | 'not-ready') {
  if (status === 'ready') return 'text-emerald-400'
  if (status === 'partial') return 'text-amber-400'
  return 'text-red-400'
}

// ---------------------------------------------------------------------------
// Structured Data
// ---------------------------------------------------------------------------

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Slack vs Discord: Agent Readiness for Communication Platforms',
  description:
    'A detailed comparison of Slack and Discord communication platforms on AI agent readiness, bot ecosystems, and 9-dimension scoring.',
  url: 'https://agenthermes.ai/compare/slack-vs-discord',
  datePublished: '2026-03-30',
  dateModified: '2026-03-30',
  author: {
    '@type': 'Organization',
    name: 'AgentHermes',
    url: 'https://agenthermes.ai',
  },
  publisher: {
    '@type': 'Organization',
    name: 'AgentHermes',
    url: 'https://agenthermes.ai',
  },
  about: [
    {
      '@type': 'SoftwareApplication',
      name: 'Slack',
      url: 'https://slack.com',
      applicationCategory: 'CommunicationApplication',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Discord',
      url: 'https://discord.com',
      applicationCategory: 'CommunicationApplication',
    },
  ],
  mainEntity: {
    '@type': 'Table',
    about: 'Communication Platform Agent Readiness Comparison',
  },
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SlackVsDiscordPage() {
  const slackWins = SLACK.dimensions.filter(
    (d, i) => d.score > DISCORD.dimensions[i].score
  ).length
  const discordWins = SLACK.dimensions.filter(
    (d, i) => d.score < DISCORD.dimensions[i].score
  ).length
  const ties = 9 - slackWins - discordWins

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* ----------------------------------------------------------------- */}
        {/* Hero                                                              */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <MessageSquare className="h-3.5 w-3.5" />
            Communication Platform Agent Readiness
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="text-[#e01e5a]">Slack</span>
            <span className="text-zinc-500 mx-3">vs</span>
            <span className="text-[#5865F2]">Discord</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-2">
            Communication Platform Agent Readiness Comparison
          </p>
          <p className="text-sm text-zinc-500 max-w-3xl mx-auto">
            Both Slack and Discord have thriving bot ecosystems with millions of integrations.
            But &quot;bot-friendly&quot; and &quot;agent-ready&quot; are different things. Bots follow scripts.
            Agents make decisions. We analyzed both platforms to determine which is better
            prepared for the autonomous AI agent era -- where agents join workspaces, read context,
            take actions, and coordinate with other agents.
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Winner Banner                                                     */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-5 rounded-xl bg-[#e01e5a]/5 border border-[#e01e5a]/20 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold text-zinc-300">
              Overall Winner:{' '}
              <span className="text-[#e01e5a]">Slack</span>
              {' '}with a score of{' '}
              <span className="text-white font-bold">{SLACK.score}</span>
              {' '}vs{' '}
              <span className="text-zinc-400">{DISCORD.score}</span>
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Slack wins {slackWins} of 9 dimensions, Discord wins {discordWins}, {ties} tied
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Side-by-Side Score Cards                                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Slack */}
          <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e01e5a]" />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Enterprise Communication
              </span>
            </div>
            <p className="text-xl font-bold text-zinc-100">{SLACK.name}</p>
            <p className="text-xs text-zinc-500">{SLACK.domain}</p>
            <ScoreGauge score={SLACK.score} size="lg" />
            <TierBadge tier={SLACK.tier} size="md" />
            <div className="flex items-center gap-2 mt-1">
              <Shield className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400">ARL-{SLACK.arl}: {SLACK.arlName}</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              Winner
            </span>
          </div>

          {/* Discord */}
          <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5865F2]" />
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Community Communication
              </span>
            </div>
            <p className="text-xl font-bold text-zinc-100">{DISCORD.name}</p>
            <p className="text-xs text-zinc-500">{DISCORD.domain}</p>
            <ScoreGauge score={DISCORD.score} size="lg" />
            <TierBadge tier={DISCORD.tier} size="md" />
            <div className="flex items-center gap-2 mt-1">
              <Shield className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-bold text-blue-400">ARL-{DISCORD.arl}: {DISCORD.arlName}</span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* 6-Step Agent Journey                                              */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-2">
            6-Step Agent Journey Comparison
          </h2>
          <p className="text-sm text-zinc-500 mb-6">
            Can an AI agent fully participate in each platform -- from discovering it to
            managing subscriptions?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SLACK.journey.map((step, i) => {
              const discordStep = DISCORD.journey[i]
              const icons = [Search, BookOpen, UserPlus, Plug, Activity, CreditCard]
              const Icon = icons[i]
              const slackWinsStep = step.score > discordStep.score
              const discordWinsStep = discordStep.score > step.score

              return (
                <div key={step.step} className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-mono text-zinc-500">STEP {i + 1}</span>
                    <span className="text-sm font-bold text-zinc-200">{step.step}</span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#e01e5a]" />
                      <span className="text-xs text-zinc-400">Slack</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusIcon(step.status)}
                      <span className={`text-xs font-semibold ${statusColor(step.status)}`}>{step.score}</span>
                      {slackWinsStep && <Trophy className="h-3 w-3 text-emerald-400" />}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#5865F2]" />
                      <span className="text-xs text-zinc-400">Discord</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusIcon(discordStep.status)}
                      <span className={`text-xs font-semibold ${statusColor(discordStep.status)}`}>{discordStep.score}</span>
                      {discordWinsStep && <Trophy className="h-3 w-3 text-emerald-400" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-800/80">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Slack: {SLACK.journey.filter(s => s.status === 'ready').length} of 6 ready</span>
              <span>Discord: {DISCORD.journey.filter(s => s.status === 'ready').length} of 6 ready</span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Dimension Breakdown                                               */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-6">
            Dimension-by-Dimension Breakdown
          </h2>

          <div className="space-y-5">
            {SLACK.dimensions.map((dim, i) => {
              const discordDim = DISCORD.dimensions[i]
              const slackWinsDim = dim.score > discordDim.score
              const discordWinsDim = discordDim.score > dim.score
              const tied = dim.score === discordDim.score

              return (
                <div key={dim.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-medium text-zinc-600">{dim.key}</span>
                      <span className="text-sm font-medium text-zinc-300">{dim.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {slackWinsDim && <span className="text-[10px] font-bold text-[#e01e5a]">Slack wins</span>}
                      {discordWinsDim && <span className="text-[10px] font-bold text-[#5865F2]">Discord wins</span>}
                      {tied && <span className="text-[10px] font-bold text-zinc-500">Tie</span>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#e01e5a] flex-shrink-0" />
                      <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barColor(dim.score)}`} style={{ width: `${dim.score}%` }} />
                      </div>
                      <span className="text-xs font-mono font-medium text-zinc-400 w-8 text-right tabular-nums">{dim.score}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#5865F2] flex-shrink-0" />
                      <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barColor(discordDim.score)}`} style={{ width: `${discordDim.score}%` }} />
                      </div>
                      <span className="text-xs font-mono font-medium text-zinc-400 w-8 text-right tabular-nums">{discordDim.score}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e01e5a]" />
                  <span className="text-xs text-zinc-500">slack.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5865F2]" />
                  <span className="text-xs text-zinc-500">discord.com</span>
                </div>
              </div>
              <div className="text-xs text-zinc-600">
                {slackWins} Slack wins &middot; {discordWins} Discord wins &middot; {ties} tied
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Bot Ecosystem Comparison                                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Bot className="h-4 w-4 text-emerald-500" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-100">
              Bot Ecosystem: Bot-Friendly vs Agent-Ready
            </h2>
          </div>
          <p className="text-sm text-zinc-500 mb-6">
            Both platforms have mature bot ecosystems. But bots follow scripts while agents make
            decisions. Here is how each platform supports the shift from bots to autonomous agents.
          </p>

          <div className="space-y-3">
            {BOT_FEATURES.map((bf) => (
              <div key={bf.feature} className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-zinc-200">{bf.feature}</h3>
                  {bf.slackAdvantage ? (
                    <span className="text-[10px] font-bold text-[#e01e5a] bg-[#e01e5a]/10 border border-[#e01e5a]/20 px-2 py-0.5 rounded-full">
                      Slack advantage
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full">
                      Comparable
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="text-xs text-zinc-400">
                    <span className="text-[#e01e5a] font-semibold">Slack:</span> {bf.slack}
                  </div>
                  <div className="text-xs text-zinc-400">
                    <span className="text-[#5865F2] font-semibold">Discord:</span> {bf.discord}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Agent Use Cases                                                   */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">
            Agent Use Cases: Where Each Platform Excels
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg bg-[#e01e5a]/5 border border-[#e01e5a]/20">
              <h3 className="text-sm font-bold text-[#e01e5a] mb-3 flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Slack: Enterprise Agent Workspace
              </h3>
              <ul className="space-y-3 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <Zap className="h-3.5 w-3.5 text-[#e01e5a] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Workflow automation agents.</strong>{' '}
                    Slack&apos;s Workflow Builder lets agents create, modify, and trigger multi-step
                    workflows. An agent can build an approval flow, connect it to channels, and
                    iterate based on usage patterns -- all via API.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-3.5 w-3.5 text-[#e01e5a] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Multi-agent coordination.</strong>{' '}
                    Slack&apos;s channel model with threads, reactions, and mentions provides natural
                    coordination primitives. Multiple agents can operate in the same channel,
                    @mention each other, and use threads for context isolation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="h-3.5 w-3.5 text-[#e01e5a] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Enterprise security and compliance.</strong>{' '}
                    Granular OAuth scopes, Enterprise Grid with org-level controls, audit logs,
                    and DLP integrations. Critical for agents handling sensitive business data.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Bell className="h-3.5 w-3.5 text-[#e01e5a] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Block Kit for structured agent output.</strong>{' '}
                    Agents can render tables, forms, selects, date pickers, and interactive buttons.
                    This is far richer than plain text and lets agents create actionable interfaces
                    for human review.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-lg bg-[#5865F2]/5 border border-[#5865F2]/20">
              <h3 className="text-sm font-bold text-[#5865F2] mb-3 flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Discord: Community Agent Platform
              </h3>
              <ul className="space-y-3 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <Zap className="h-3.5 w-3.5 text-[#5865F2] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Community moderation agents.</strong>{' '}
                    Discord&apos;s AutoMod, role hierarchy, and permission system make it natural
                    for AI agents to moderate communities, enforce rules, and manage member
                    behavior autonomously across large servers.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-3.5 w-3.5 text-[#5865F2] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Voice channel integration.</strong>{' '}
                    Discord&apos;s voice infrastructure is a unique advantage. AI agents can join
                    voice channels, process audio, and participate in voice conversations --
                    a capability Slack lacks in its bot API.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="h-3.5 w-3.5 text-[#5865F2] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Massive scale and open communities.</strong>{' '}
                    Discord servers can have millions of members. Agents can operate at community
                    scale -- moderating, answering questions, and onboarding members across
                    public servers without invitation barriers.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Code2 className="h-3.5 w-3.5 text-[#5865F2] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-zinc-200">Rich interaction model for gaming and media.</strong>{' '}
                    Discord&apos;s embedded activities, rich presence, and media handling make it
                    ideal for agents that need to interact with games, streams, and rich media
                    content -- areas where Slack has no presence.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Analysis                                                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-6">
            Deep Analysis: From Bots to Agents
          </h2>

          <div className="space-y-4 text-sm text-zinc-400">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#e01e5a] flex-shrink-0" />
              <p>
                <strong className="text-zinc-200">Slack is the clear enterprise agent platform.</strong>{' '}
                With a score of {SLACK.score} (Silver tier, ARL-2), Slack passes 5 of 6 journey steps.
                Its API quality (70), security (80), and reliability (85) create a stable foundation
                for autonomous agent operations. The only gap is payment -- Slack itself does not handle
                financial transactions, which limits the full agent commerce journey.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#5865F2] flex-shrink-0" />
              <p>
                <strong className="text-zinc-200">Discord is strong but more fragmented.</strong>{' '}
                At {DISCORD.score} (Bronze tier, ARL-1), Discord trails Slack across most dimensions.
                Its community-first architecture means less structured data (40 vs 65), weaker
                discoverability (40 vs 60), and less enterprise-grade security controls. However,
                Discord&apos;s voice channels and massive community scale are unique advantages that
                no other platform offers for agent deployment.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-amber-500 flex-shrink-0" />
              <p>
                <strong className="text-zinc-200">The real gap is structured interactions.</strong>{' '}
                Slack&apos;s Block Kit gives agents 20+ interactive UI elements to create rich,
                structured interfaces. Discord&apos;s message components are simpler -- buttons,
                selects, and modals. For agents that need to present complex data, gather structured
                input, and guide multi-step workflows, Slack provides significantly better tools.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <p>
                <strong className="text-zinc-200">Both platforms excel at CONNECT and USE.</strong>{' '}
                Once an agent has API credentials, both Slack (75 CONNECT, 85 USE) and Discord
                (68 CONNECT, 75 USE) provide reliable, well-documented APIs with good SDK support.
                The agent can send messages, read channels, react to events, and interact with users
                on both platforms effectively.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
              <p>
                <strong className="text-zinc-200">Neither supports agent-native discovery.</strong>{' '}
                Neither platform publishes llms.txt, agent-card.json, or MCP tool manifests for
                their bot/app ecosystems. An agent cannot discover what Slack apps or Discord bots
                are available, what they do, or how to interact with them through standard agent
                protocols. This is the frontier both platforms need to cross.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-zinc-500 flex-shrink-0" />
              <p>
                <strong className="text-zinc-200">The MCP opportunity.</strong>{' '}
                Imagine if every Slack App published an MCP tool manifest, and every Discord bot
                exposed its commands as MCP tools. Agents could discover, compose, and orchestrate
                bot capabilities across platforms. The first platform to enable this --
                turning its bot ecosystem into an agent-discoverable tool registry --
                will define the next generation of workplace and community AI.
              </p>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Verdict                                                           */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-10 p-6 rounded-xl bg-gradient-to-br from-[#e01e5a]/10 via-zinc-900/50 to-[#5865F2]/10 border border-zinc-800/80">
          <h2 className="text-lg font-semibold text-zinc-100 mb-4 text-center">The Verdict</h2>
          <p className="text-sm text-zinc-400 text-center max-w-3xl mx-auto mb-6">
            Slack wins with {SLACK.score} vs {DISCORD.score}, earning Silver tier to Discord&apos;s
            Bronze. Slack&apos;s enterprise DNA -- structured interactions via Block Kit, granular
            OAuth scopes, Workflow Builder automation, and superior data quality -- makes it the
            stronger platform for deploying autonomous AI agents in business contexts.
          </p>
          <p className="text-sm text-zinc-400 text-center max-w-3xl mx-auto mb-6">
            Discord&apos;s strength is community scale and media richness. For AI agents that need to
            moderate large communities, participate in voice conversations, or interact with gaming
            and streaming ecosystems, Discord offers capabilities that Slack simply does not have.
            The choice depends on your agent&apos;s mission.
          </p>
          <p className="text-sm text-zinc-500 text-center max-w-3xl mx-auto">
            For enterprise agent deployment: Slack. For community agent deployment: Discord.
            For the agent economy at large: both need to evolve beyond &quot;bot platform&quot; into
            &quot;agent-native infrastructure&quot; -- with MCP manifests, A2A protocols, and structured
            tool discovery for their entire app ecosystems.
          </p>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* CTA                                                               */}
        {/* ----------------------------------------------------------------- */}
        <div className="text-center py-12 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
          <MessageSquare className="h-10 w-10 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-zinc-100 mb-2">
            Check Your Platform&apos;s Agent Readiness
          </h2>
          <p className="text-sm text-zinc-500 mb-6 max-w-md mx-auto">
            Whether you build on Slack, Discord, or any other platform -- see how agent-ready
            you are across all 9 dimensions.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
            >
              Scan Your Platform
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold transition-colors border border-zinc-700"
            >
              Compare Two Businesses
              <Scale className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
