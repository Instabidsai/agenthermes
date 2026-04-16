import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  Activity,
  ArrowRight,
  Calendar,
  CheckCircle2,
  CheckSquare,
  Clock,
  Code2,
  Compass,
  CreditCard,
  Database,
  DollarSign,
  FileCode,
  FileText,
  HelpCircle,
  Printer,
  Shield,
  Sparkles,
  UserPlus,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Agent Readiness Checklist: 30 Signals Every Business Should Have | AgentHermes',
  description:
    'The definitive printable checklist for agent readiness. 30 items grouped by the 9 dimensions AgentHermes scans. HTTPS, robots.txt, agent-card.json, OpenAPI, idempotency keys, and everything in between.',
  keywords: [
    'agent readiness checklist',
    'agent ready checklist',
    'agent readiness signals',
    'agent ready business',
    'MCP checklist',
    'agent card checklist',
    'AI agent business checklist',
  ],
  openGraph: {
    title: 'The Agent Readiness Checklist: 30 Signals Every Business Should Have',
    description:
      '30 checkbox items grouped by the 9 dimensions AgentHermes scans. Printable. Copy-paste ready.',
    url: 'https://agenthermes.ai/blog/checklist-agent-ready-business',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Agent Readiness Checklist: 30 Signals Every Business Should Have',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Agent Readiness Checklist: 30 Signals',
    description:
      'Printable 30-item checklist across all 9 dimensions AgentHermes scans.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/checklist-agent-ready-business',
  },
}

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Do I have to hit all 30 items to score Silver?',
    answer:
      'No. The median Silver-tier company on our 500-business leaderboard hits roughly 20 of the 30. The 10 they miss tend to be D4 Pricing schema, D5 payment webhooks, D9 idempotency keys, and agent-native extras like x402 support. Work top-down — Tier 1 dimensions (D2, D6, D7, D8, D9) carry 60% of the score, so prioritize those first.',
  },
  {
    question: 'Which item is the single biggest lever?',
    answer:
      'Publishing an OpenAPI spec. D2 API Quality is weighted 0.15 — the single largest of any dimension. Companies without a spec hit a ceiling around 45. Companies with one consistently score 60+. If you only have budget for one project, ship the spec at docs.yoursite.com/openapi.json and link it from your agent-card.json.',
  },
  {
    question: 'How do I know which items I already pass?',
    answer:
      'Run your domain through the free AgentHermes scanner at /audit. The result is a 9-dimension breakdown with pass / partial / fail for each signal. That lets you walk this checklist with your actual scores next to each item, so you know exactly which 10-12 fixes unlock the next tier.',
  },
  {
    question: 'Do ecommerce and SaaS follow different checklists?',
    answer:
      'The 30 signals are universal. The weights shift. The AgentHermes scanner has 27 vertical profiles that reweight the dimensions for ecommerce, fintech, healthcare, local services, and others. The checklist stays the same — a restaurant still needs TLS, a sitemap, a services schema, and an idempotency key on its booking endpoint. Just the priority of each line changes.',
  },
  {
    question: 'Can AgentHermes generate most of this automatically?',
    answer:
      'Yes. /connect auto-generates agent-card.json, llms.txt, agent-hermes.json, a hosted MCP endpoint, vertical-specific tools, and registry entries. The items it cannot ship for you are the ones tied to your own stack — TLS, OAuth, idempotency keys, status page, payment webhooks. The universal discovery files are one wizard away.',
  },
]

const sections = [
  {
    code: 'D1',
    name: 'Discovery (12%)',
    color: 'blue',
    icon: Compass,
    items: [
      'HTTPS with a valid certificate across all hostnames',
      'DNS resolves quickly (A/AAAA + SPF + DMARC on apex)',
      'robots.txt allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended',
      'sitemap.xml published at the root and referenced in robots.txt',
      '/.well-known/agent-card.json with MCP endpoint and A2A skills',
      'llms.txt at the root, linking to docs, API, pricing, policies',
    ],
  },
  {
    code: 'D2',
    name: 'API Quality (15%)',
    color: 'emerald',
    icon: FileCode,
    items: [
      'Published OpenAPI 3.0+ spec for every public endpoint',
      'REST or GraphQL API that is genuinely callable (not just an iframe)',
      'Versioning strategy — header, path, or date-based — clearly documented',
    ],
  },
  {
    code: 'D3',
    name: 'Onboarding (8%)',
    color: 'amber',
    icon: UserPlus,
    items: [
      'Self-service signup without a sales call',
      'Sandbox or test environment an agent can hit safely',
      'Programmatic API key or OAuth credential creation',
    ],
  },
  {
    code: 'D4',
    name: 'Pricing (5%)',
    color: 'amber',
    icon: DollarSign,
    items: [
      'Structured pricing visible without login',
      'JSON-LD Offer schema on every pricing page',
    ],
  },
  {
    code: 'D5',
    name: 'Payment Processing (8%)',
    color: 'purple',
    icon: CreditCard,
    items: [
      'Embedded checkout or Payment Element (not just hosted redirect)',
      'Signed webhooks for order/payment/subscription events',
      'Refund endpoint callable by the original buyer credential',
    ],
  },
  {
    code: 'D6',
    name: 'Data Quality (10%)',
    color: 'blue',
    icon: Database,
    items: [
      'JSON-LD markup (Organization, Product, Service, Offer)',
      'Consistent structured error envelope with a stable code field',
      'AGENTS.md at the repo or domain root for project context',
    ],
  },
  {
    code: 'D7',
    name: 'Security (12%)',
    color: 'emerald',
    icon: Shield,
    items: [
      'OAuth 2.0 or Bearer tokens for any mutating endpoint',
      'TLS 1.3 negotiated, weak ciphers disabled',
      'HSTS preloaded, secure cookies with SameSite',
    ],
  },
  {
    code: 'D8',
    name: 'Reliability (13%)',
    color: 'emerald',
    icon: Activity,
    items: [
      'Public status page at /status or status.yourdomain.com',
      '/health endpoint returning a JSON envelope',
      'Published SLA or uptime target on a stable URL',
    ],
  },
  {
    code: 'D9',
    name: 'Agent Experience (10%)',
    color: 'blue',
    icon: Sparkles,
    items: [
      'X-Request-Id on every response',
      'Idempotency-Key accepted on all POST endpoints',
      'Rate-limit headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset',
    ],
  },
  {
    code: 'Bonus',
    name: 'Agent-Native (7%)',
    color: 'purple',
    icon: Sparkles,
    items: [
      'Open Graph tags + Twitter card on every public page',
      'x402 micropayment support for agent-native per-call billing',
      'MCP server linked from agent-card.json',
    ],
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

export default function AgentReadinessChecklistPage() {
  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Agent Readiness Checklist: 30 Signals Every Business Should Have',
    description:
      'The definitive 30-item checklist for agent readiness, grouped by the 9 scoring dimensions AgentHermes uses to scan 500+ businesses.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/checklist-agent-ready-business',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Checklist',
    wordCount: 1800,
    keywords:
      'agent readiness checklist, agent ready business, MCP checklist, AI agent signals, agent card',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Agent Readiness Checklist',
          item: 'https://agenthermes.ai/blog/checklist-agent-ready-business',
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

  const checklistJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Make a Business Agent-Ready',
    description: 'Complete a 30-signal checklist across the 9 Agent Readiness dimensions.',
    totalTime: 'P14D',
    step: sections.flatMap((section, si) =>
      section.items.map((item, ii) => ({
        '@type': 'HowToStep',
        position: si * 100 + ii + 1,
        name: `${section.code}: ${item}`,
        text: item,
      }))
    ),
  }

  return (
    <BlogArticleWrapper
      title="The Agent Readiness Checklist: 30 Signals Every Business Should Have"
      shareUrl="https://agenthermes.ai/blog/checklist-agent-ready-business"
      currentHref="/blog/checklist-agent-ready-business"
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(checklistJsonLd) }}
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
              <span className="text-zinc-400">Agent Readiness Checklist</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <CheckSquare className="h-3.5 w-3.5" />
                Checklist
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                Printable
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              The Agent Readiness Checklist:{' '}
              <span className="text-emerald-400">30 Signals Every Business Should Have</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              Thirty boxes to check. Nine dimensions. One page. This is the condensed version of everything the AgentHermes scanner looks for across 500 scanned businesses — and the exact shortlist that separates Gold from Bronze. Print it, post it, ship it.
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
                    10 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: String(totalItems), label: 'checkboxes total', icon: CheckSquare },
                { value: '9', label: 'scoring dimensions', icon: FileText },
                { value: '43', label: 'avg score across 500 scans', icon: Activity },
                { value: '1', label: 'Gold (Resend 75)', icon: Sparkles },
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

        {/* ===== HOW TO USE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Printer className="h-5 w-5 text-emerald-500" />
              How to Use This Checklist
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                Each dimension lists 2-6 signals the scanner checks for. The weight in parentheses is the dimension&apos;s contribution to the headline score. Three dimensions (D2 API, D8 Reliability, D7 Security) together are 40% of the score — start there if you want the biggest lift per hour of engineering.
              </p>
              <p>
                Pair this checklist with a live scan at{' '}
                <Link href="/audit" className="text-emerald-400 hover:text-emerald-300 underline">
                  /audit
                </Link>
                . The scanner returns pass / partial / fail per signal, so you can walk the checklist with your actual status next to every line.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE CHECKLIST ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-6 flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-emerald-500" />
              The {totalItems}-Item Checklist
            </h2>

            <div className="space-y-5">
              {sections.map((section) => {
                const colors = getColorClasses(section.color)
                return (
                  <div key={section.code} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-800/60">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                        <section.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-100 text-sm">
                          {section.code}: {section.name}
                        </h3>
                        <span className="text-xs text-zinc-500">{section.items.length} items</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-zinc-700 bg-zinc-800/60 mt-0.5">
                            <span className="text-[10px] text-zinc-600">&#9633;</span>
                          </span>
                          <span className="text-sm text-zinc-300 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===== PRIORITIZATION ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Work It Top-Down: The First Six Wins
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              If you only ship six items this quarter, ship these six. They touch the highest-weighted dimensions and are cheap enough to land in a single PR each.
            </p>
            <div className="space-y-3 mb-6">
              {[
                { step: '1', title: 'Ship an OpenAPI spec', detail: 'D2 API Quality is the single largest weight (15%). Without a spec the scoring model caps you around 45.' },
                { step: '2', title: 'Publish /.well-known/agent-card.json', detail: 'One JSON file. Unlocks A2A discovery and MCP linking. +3 to D1.' },
                { step: '3', title: 'Drop llms.txt at the root', detail: '95% of scanned businesses miss this. Markdown-only. +2 to D1, +1 to D6.' },
                { step: '4', title: 'Wire X-Request-Id + Idempotency-Key', detail: 'Two middleware lines. +4-5 to D9 Agent Experience in a single commit.' },
                { step: '5', title: 'Stand up a status page', detail: 'Statuspage or Atlassian scores 70 on D8 by existing. Add a /health endpoint alongside it.' },
                { step: '6', title: 'Switch error responses to JSON envelopes', detail: 'HTML error pages are the single biggest D6 failure mode. Consistent code + message + request_id fixes it.' },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 text-sm mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              These six together historically lift a Bronze-tier domain into Silver within 14 days. The remaining 24 items on the checklist are what separates Silver from Gold.
            </p>
          </div>
        </section>

        {/* ===== COMMON PITFALLS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-amber-500" />
              Five Checklist Items People Get Wrong
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { title: 'Hosted redirect ≠ checkout API', detail: 'Stripe-hosted checkout is fine for humans, fails D5 for agents. Agents need a Payment Element or direct intent creation.' },
                { title: 'Swagger UI ≠ OpenAPI spec', detail: 'A rendered docs site is useless to an agent. Ship the raw openapi.json, link it from agent-card.json.' },
                { title: 'robots.txt that blocks GPTBot', detail: 'Fleet-wide pattern — businesses silently block GPTBot thinking it is a scraper. That is an instant D1 failure.' },
                { title: 'status.example.com with no API', detail: 'A human-readable status page scores partial. Expose /status.json for full credit.' },
                { title: 'Idempotency-Key silently ignored', detail: 'Accepting the header but not enforcing deduplication is worse than rejecting it. Agents re-fire on retry and you double-charge.' },
                { title: 'agent-card.json pointing at 404', detail: 'About half the agent cards we scan reference MCP endpoints that return 404 or HTML. Fail fast here is worse than no card at all.' },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
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
                <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
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
                { title: 'How to Improve Your Agent Readiness Score: A Step-by-Step Guide', href: '/blog/improve-agent-readiness-score', tag: 'How-To Guide', tagColor: 'emerald' },
                { title: 'Why Scoring Caps at 39: The HTTPS and Endpoint Requirements', href: '/blog/scoring-caps-explained', tag: 'Methodology', tagColor: 'amber' },
                { title: 'What Is Agent Readiness? The Complete Guide', href: '/blog/what-is-agent-readiness', tag: 'Complete Guide', tagColor: 'emerald' },
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
              Walk the checklist against your live domain
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              The scanner returns pass / partial / fail for every checklist item. Know exactly which of the 30 signals your business already passes — and which ten fixes move you up a tier.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
              >
                Run the Scan
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog/improve-agent-readiness-score"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
              >
                Read the Playbook
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </BlogArticleWrapper>
  )
}
