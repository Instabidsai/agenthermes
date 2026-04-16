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
  Compass,
  FileText,
  Globe,
  HelpCircle,
  Map,
  Search,
  Shield,
  Sparkles,
  Target,
  XCircle,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Discoverability and Agent Readiness: Why 40% of Businesses Fail D1 (12% Weight) | AgentHermes',
  description:
    'D1 Discoverability carries a 0.12 weight in the Agent Readiness Score. 40% of the 500 businesses we scanned fail so badly on D1 they never escape the Unaudited tier. Here is what D1 actually measures and how to fix it.',
  keywords: [
    'discoverability agent readiness',
    'D1 discoverability',
    'agent discovery files',
    'robots.txt AI crawlers',
    'GPTBot anthropic-ai',
    'agent-card.json discovery',
    'llms.txt root',
    'sitemap.xml agents',
    'well-known agent card',
  ],
  openGraph: {
    title: 'Discoverability and Agent Readiness: Why 40% of Businesses Fail D1',
    description:
      'D1 Discoverability is 12% of the score. 199 of 500 businesses fail D1 so hard they never escape Unaudited. Here is the fix.',
    url: 'https://agenthermes.ai/blog/discoverability-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Discoverability and Agent Readiness: Why 40% Fail D1',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discoverability and Agent Readiness: Why 40% of Businesses Fail D1',
    description:
      'If agents cannot find you, nothing else matters. D1 is 12% of the score — and 40% of businesses fail it cold.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/discoverability-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const d1Checks = [
  {
    name: 'DNS resolves cleanly',
    detail: 'The domain has a valid A or AAAA record, responds within 2 seconds, and does not require a Cloudflare challenge page before agents can read anything. Broken DNS caps every downstream check.',
    icon: Globe,
    color: 'emerald',
  },
  {
    name: 'robots.txt allows AI crawlers',
    detail: 'The big three — GPTBot, anthropic-ai, Google-Extended — are either explicitly allowed or not explicitly blocked. Bonus credit for a declared crawl delay and sitemap reference.',
    icon: Bot,
    color: 'blue',
  },
  {
    name: 'sitemap.xml is present and valid',
    detail: 'A sitemap under /sitemap.xml or referenced from robots.txt, returning 200, with at least a few URLs. Agents use sitemaps to enumerate crawlable surface without guessing.',
    icon: Map,
    color: 'purple',
  },
  {
    name: '/.well-known/agent-card.json exists',
    detail: 'The A2A protocol discovery file that declares agent capabilities, skills, and endpoints. The single strongest positive signal for agent discovery — and exactly zero of the 500 businesses we scanned ship it.',
    icon: FileText,
    color: 'emerald',
  },
  {
    name: 'llms.txt at the root',
    detail: 'Markdown summary of what the business does, for LLM consumption. Lives at /llms.txt. Detected on fewer than 5% of scanned businesses. Cheap to add, meaningful score bump.',
    icon: FileText,
    color: 'cyan',
  },
  {
    name: 'Structured Open Graph metadata',
    detail: 'og:title, og:description, og:type, og:site_name on the homepage. Agents fall back to OG tags when richer discovery is missing — it is the lowest-effort signal to ship.',
    icon: Code2,
    color: 'amber',
  },
]

const commonFailures = [
  {
    title: 'Blocking GPTBot in robots.txt',
    detail: 'Some businesses added User-agent: GPTBot / Disallow: / after the AI-training panic of 2023. Whether or not that helps with training, it also blocks in-session retrieval by agents running Claude, ChatGPT, and Perplexity. You are blocking your customers.',
  },
  {
    title: 'No sitemap at all',
    detail: 'Over half the businesses we scanned serve no sitemap. Agents cannot enumerate what exists. They fall back to guessing from the homepage, which is guaranteed to miss most of your content.',
  },
  {
    title: 'Cloudflare challenge walls for bots',
    detail: 'Cloudflare Super Bot Fight Mode and the "Challenge" rule bucket agent traffic alongside scrapers. The agent hits a JavaScript challenge, cannot solve it, gives up. You are invisible by default.',
  },
  {
    title: 'No agent-card.json, no llms.txt',
    detail: '0 of 500 have agent-card.json. Fewer than 5% have llms.txt. These are the two files agents explicitly look for, and almost nobody ships them. The first-mover advantage is literally sitting in /well-known.',
  },
  {
    title: 'JavaScript-only homepage',
    detail: 'SPAs that render nothing without client-side JS look empty to most crawlers. The agent sees an empty body tag and concludes there is nothing to index. Add SSR or a pre-rendered meta-tag fallback.',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why is D1 Discoverability weighted at exactly 0.12?',
    answer:
      'D1 sits in Tier 2 of the Agent Readiness Score weighting model at 0.12 — high enough to matter, not high enough to dominate. The logic: if agents cannot find you, the other eight dimensions are moot, so D1 acts as a gate. But once you clear the discoverability bar, the remaining 88% of the score comes from things agents care about after they find you (API quality, security, reliability, data quality). Discoverability is necessary, not sufficient.',
  },
  {
    question: 'How do you know 199 of 500 fail D1?',
    answer:
      'Across the 500-business scan, 199 businesses scored below the Bronze threshold of 40 — most of them because D1 came in so low that no amount of strength on other dimensions could lift them out. When a site has no sitemap, no llms.txt, no agent-card.json, and a Cloudflare challenge wall, D1 contributes nearly zero points, and the 0.12 weight becomes a dead loss. The business is effectively invisible, regardless of what the rest of its infrastructure looks like.',
  },
  {
    question: 'Is blocking GPTBot really that bad for agent readiness?',
    answer:
      'It depends what you are trying to protect. Blocking GPTBot prevents OpenAI from using your content in training — which is a legitimate choice. But it also blocks ChatGPT from retrieving your content during a user\'s session, which is a different system. If a user asks ChatGPT about your business and GPTBot is blocked, the agent returns "I cannot access this page" and recommends a competitor. Consider allowing GPTBot for browsing while blocking it for training via the new opt-out signals in robots.txt.',
  },
  {
    question: 'What does a minimal agent-card.json look like?',
    answer:
      'At its simplest: {"name": "Business Name", "description": "What you do in one sentence", "url": "https://yourdomain.com", "capabilities": ["get_info", "search", "check_availability"], "contact": {"email": "hello@yourdomain.com"}}. That is enough for agents to discover you and understand at a high level what you offer. You can iterate from there — add skills, endpoints, auth flow, pricing, support URL. The file lives at /.well-known/agent-card.json and follows the A2A protocol discovery spec.',
  },
  {
    question: 'Will fixing D1 actually move me out of the Unaudited tier?',
    answer:
      'In most cases, yes — but only if the rest of your score is not also zero. If you have a working API, TLS, and a functioning pricing page, fixing D1 reliably moves Bronze-adjacent scores into Bronze. If your site is a static marketing page with no backend, fixing D1 alone will not get you to 40. But it is always the first dimension to fix, because it is the cheapest and it gates everything else.',
  },
  {
    question: 'Does AgentHermes auto-generate the D1 files?',
    answer:
      'Yes. When you run the /connect wizard, AgentHermes generates a llms.txt, an agent-card.json, and an agent-hermes.json tuned to your business details. You download them, upload them to your domain root and /.well-known/ path, and D1 jumps on the next scan. For businesses on platforms we adapt to (Shopify, WooCommerce, Square), we can install the files through the platform API directly. See /connect for details.',
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

export default function DiscoverabilityAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Discoverability and Agent Readiness: Why 40% of Businesses Fail D1 (12% Weight)',
    description:
      'D1 Discoverability is 12% of the Agent Readiness Score. 40% of scanned businesses fail D1 so badly they never escape the Unaudited tier. Here is exactly what gets scored.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/discoverability-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Dimensions Deep Dive',
    wordCount: 1900,
    keywords:
      'discoverability agent readiness, D1 discoverability, robots.txt AI crawlers, agent-card.json, llms.txt',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Discoverability and Agent Readiness',
          item: 'https://agenthermes.ai/blog/discoverability-agent-readiness',
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
      title="Discoverability and Agent Readiness: Why 40% of Businesses Fail D1 (12% Weight)"
      shareUrl="https://agenthermes.ai/blog/discoverability-agent-readiness"
      currentHref="/blog/discoverability-agent-readiness"
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
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-400">Discoverability</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Compass className="h-3.5 w-3.5" />
              Dimensions Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              D1 — 12% Weight
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Discoverability and Agent Readiness:{' '}
            <span className="text-emerald-400">Why 40% of Businesses Fail D1</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            D1 Discoverability carries a 0.12 weight in the Agent Readiness Score. Simple idea: if agents
            cannot find you, nothing else matters. Across 500 businesses scanned, 199 of them{' '}
            <strong className="text-zinc-100">(40%)</strong> score so low on D1 they never escape the
            Unaudited tier — regardless of how strong their API, auth, or pricing happen to be.
          </p>

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
                  12 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE DATA ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            The 500-Business D1 Data
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes has scanned 500 businesses across 27 verticals. The score distribution is
              bluntly skewed: <strong className="text-zinc-100">1 Gold (Resend at 75), 52 Silver, 249
              Bronze, and 199 below the Bronze threshold</strong>. The 199 below Bronze mostly share
              one trait — they cannot be found by agents.
            </p>
            <p>
              Zero of 500 publish an agent-card.json. Two of 500 publish an MCP server. Fewer than 5%
              publish an llms.txt. The businesses in the Unaudited tier tend to lack all three, often
              combined with a broken sitemap or a Cloudflare challenge wall that rejects agent traffic
              outright. D1 can account for up to 12 points. When it contributes near zero, a business
              that is otherwise a solid 45 lands at 33 — below the Bronze threshold — and gets tagged
              Not Scored.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '500', label: 'businesses scanned', icon: Search },
              { value: '199', label: 'below Bronze (mostly D1)', icon: XCircle },
              { value: '0', label: 'publish agent-card.json', icon: FileText },
              { value: '12%', label: 'D1 weight in score', icon: Target },
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

      {/* ===== WHAT WE CHECK ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Compass className="h-5 w-5 text-blue-500" />
            The Six D1 Checks
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            D1 Discoverability is not one check — it is a bundle. Each sub-check contributes to the
            D1 score, and the full 12% is only earned when an agent can actually find and understand
            the business through standard discovery paths.
          </p>

          <div className="space-y-4 mb-8">
            {d1Checks.map((check) => {
              const colors = getColorClasses(check.color)
              return (
                <div
                  key={check.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <check.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{check.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{check.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The first three checks (DNS, robots, sitemap) are SEO-era hygiene. Agents inherit them
              from the crawler lineage they grew out of. The last three (agent-card.json, llms.txt,
              structured OG) are agent-era additions. <strong className="text-zinc-100">Most businesses
              nail the first three and fail every single one of the last three</strong> — that is the
              exact shape of the D1 gap.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHY NOTHING ELSE MATTERS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Why D1 Gates Everything Else
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              In the{' '}
              <Link href="/blog/agent-journey-explained" className="text-emerald-400 hover:text-emerald-300 underline">
                six-step agent journey
              </Link>
              , FIND is step one. It is the only step where, if the agent fails, nothing downstream can
              save you. If the agent cannot find you, it does not matter that your OpenAPI spec is
              flawless, your D7 Security is Platinum-grade, or your D5 Payment supports x402. The
              agent moves on to a competitor and never knew you existed.
            </p>
            <p>
              This is why D1 has a disproportionate impact at the low end of the score distribution.
              Businesses clustered in the 30-40 range tend to have decent APIs but terrible discovery.
              They are full-stack functional — but invisible. Fixing the D1 gap is usually a single
              afternoon of work and moves them from Not Scored to Bronze overnight.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The 12% floor rule:</strong> across the 500-business
              scan, businesses that scored at least 9 of 12 on D1 never landed in Unaudited. The D1
              score is a near-perfect predictor of whether a business escapes Not Scored, independent
              of the other eight dimensions. Nail D1 and you clear the floor.
            </p>
          </div>
        </div>
      </section>

      {/* ===== COMMON FAILURES ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            The Five Patterns That Keep Sinking D1
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            After running 500 scans, the same failures appear over and over. None of them are technically
            hard to fix. All of them cost real score points.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {commonFailures.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Notice the theme: these are not technical failures, they are policy failures. Someone at
              the business decided to block bots, or never bothered shipping a sitemap, or assumed
              JavaScript-only would be fine, or did not realize agents needed special discovery files.
              Each decision was rational in a pre-agent world. None of them survive contact with the
              agent economy.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW TO FIX IT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The One-Afternoon D1 Fix
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            A complete D1 fix is genuinely an afternoon of work for a team that already owns the
            domain. Here is the ordered sequence that moves the most points per minute.
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                step: '1',
                title: 'Audit robots.txt',
                detail: 'Remove any Disallow rules for GPTBot, anthropic-ai, or Google-Extended. Add a Sitemap: line pointing to your sitemap. Test with a headless curl as a bot user-agent to confirm access.',
                icon: Bot,
              },
              {
                step: '2',
                title: 'Verify sitemap.xml',
                detail: 'Make sure /sitemap.xml exists, returns 200, and enumerates every important URL. Most platforms generate this automatically (Next.js, WordPress with Yoast, Shopify) — but verify it actually works.',
                icon: Map,
              },
              {
                step: '3',
                title: 'Ship llms.txt at root',
                detail: 'Plain markdown at /llms.txt describing your business, core products, pricing, API endpoints, and contact info. 200 words minimum. Fewer than 5% of scanned businesses have this — instant differentiation.',
                icon: FileText,
              },
              {
                step: '4',
                title: 'Ship agent-card.json at /.well-known/',
                detail: 'The A2A discovery file. AgentHermes generates this for you in the /connect wizard, or you can hand-write one from the spec. Zero of 500 scanned businesses have this — total greenfield.',
                icon: FileText,
              },
              {
                step: '5',
                title: 'Disable Cloudflare bot challenges for AI agents',
                detail: 'In Cloudflare Security settings, exempt known AI user-agents from Challenge. You can still block malicious scrapers — just do not accidentally block the customers you want.',
                icon: Shield,
              },
              {
                step: '6',
                title: 'Add Open Graph tags',
                detail: 'og:title, og:description, og:type, og:site_name on every page. Cheap, universally supported, and the fallback signal agents use when nothing else is present.',
                icon: Code2,
              },
              {
                step: '7',
                title: 'Rescan',
                detail: 'Run your domain through /audit again. Watch the D1 score climb from single digits to 9-11 out of 12. If your baseline was Not Scored, you are now firmly in Bronze.',
                icon: CheckCircle2,
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
              None of these steps require a developer to refactor your stack. Steps 3 and 4 are static
              files. Steps 1, 2, and 6 are one-line edits. Step 5 is a Cloudflare checkbox. The total
              is a half-day of work for a payoff that moves most businesses from Not Scored into Bronze
              on the next scan.
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

      {/* ===== RELATED ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Continue Reading</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
                tagColor: 'emerald',
              },
              {
                title: 'Agent Readiness vs SEO: Why Google Rank Does Not Help Agents',
                href: '/blog/agent-readiness-vs-seo',
                tag: 'Framework',
                tagColor: 'purple',
              },
              {
                title: 'What Is Agent Readiness? The Complete Guide',
                href: '/blog/what-is-agent-readiness',
                tag: 'Complete Guide',
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
            See your D1 score in 60 seconds
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            AgentHermes runs the full six-check D1 audit on your domain and tells you exactly which
            discovery files are missing. Fix what matters first, then rescan.
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
              Auto-generate my files
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
