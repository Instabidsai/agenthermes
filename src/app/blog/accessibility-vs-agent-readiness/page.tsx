import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  Accessibility,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Eye,
  FileJson,
  Globe,
  HelpCircle,
  Keyboard,
  Layers,
  Monitor,
  Network,
  Search,
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
  title: 'Web Accessibility vs Agent Readiness: Why WCAG Compliance Does Not Mean Agent Compliance | AgentHermes',
  description:
    'WCAG makes sites accessible to humans with disabilities. Agent readiness makes sites accessible to AI agents. A site can be WCAG AAA and score 5/100 for agents. Here is where the standards overlap and diverge.',
  keywords: [
    'web accessibility WCAG agent readiness',
    'WCAG vs agent readiness',
    'accessibility AI agents',
    'WCAG compliance agent score',
    'structured data accessibility',
    'agent-ready web standards',
    'ARIA labels agents',
  ],
  openGraph: {
    title: 'Web Accessibility vs Agent Readiness: Why WCAG Compliance Does Not Mean Agent Compliance',
    description:
      'WCAG AAA sites can score 5/100 for agent readiness. Different audiences, different standards, surprising overlap. Here is the complete comparison.',
    url: 'https://agenthermes.ai/blog/accessibility-vs-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Web Accessibility vs Agent Readiness — AgentHermes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Accessibility vs Agent Readiness: Two Standards, One Web',
    description:
      'WCAG makes sites work for humans with disabilities. Agent readiness makes sites work for AI. They overlap more than you think.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/accessibility-vs-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const comparisonRows = [
  { aspect: 'Target audience', wcag: 'Humans with disabilities (visual, motor, cognitive, auditory)', agent: 'AI agents acting on behalf of users' },
  { aspect: 'Primary medium', wcag: 'HTML, ARIA, keyboard navigation', agent: 'JSON APIs, structured endpoints, machine-readable data' },
  { aspect: 'Discovery method', wcag: 'Screen readers parse DOM tree', agent: 'Agents query APIs, agent-card.json, llms.txt' },
  { aspect: 'Data format', wcag: 'Semantic HTML with ARIA labels', agent: 'Structured JSON with typed schemas' },
  { aspect: 'Pricing access', wcag: 'Visible text on page', agent: 'Machine-readable pricing endpoint returning JSON' },
  { aspect: 'Action model', wcag: 'Keyboard-operable UI controls', agent: 'Callable API functions with parameters' },
  { aspect: 'Error handling', wcag: 'Human-readable error messages with suggestions', agent: 'Structured JSON errors with codes and retry guidance' },
  { aspect: 'Authentication', wcag: 'Accessible login forms', agent: 'OAuth, API keys, Bearer tokens' },
  { aspect: 'Legal mandate', wcag: 'ADA, Section 508, EU Accessibility Act', agent: 'No legal mandate (yet)' },
  { aspect: 'Testing tools', wcag: 'axe, WAVE, Lighthouse', agent: 'AgentHermes scanner, manual API testing' },
]

const overlapAreas = [
  {
    name: 'Structured Data',
    description: 'Both standards reward structured, machine-readable information. WCAG wants semantic HTML and ARIA landmarks. Agent readiness wants JSON-LD, Schema.org, and typed API responses. The overlap: well-structured content serves both audiences.',
    icon: Layers,
    color: 'emerald',
  },
  {
    name: 'Consistent Navigation',
    description: 'WCAG requires consistent, predictable navigation patterns. Agent readiness requires consistent, predictable API patterns. Both punish sites that behave differently on different pages or return different formats for the same type of request.',
    icon: Network,
    color: 'blue',
  },
  {
    name: 'Error Communication',
    description: 'WCAG wants clear error messages humans can understand. Agent readiness wants structured error responses machines can parse. Both penalize generic "Something went wrong" responses. The best implementation serves both: structured error with human-readable message.',
    icon: Shield,
    color: 'purple',
  },
  {
    name: 'Content Separation',
    description: 'WCAG encourages separating content from presentation (semantic HTML vs CSS styling). Agent readiness requires separating data from presentation (API responses vs rendered pages). Both benefit from the same architectural principle.',
    icon: Code2,
    color: 'amber',
  },
]

const gapAreas = [
  {
    title: 'WCAG does not require APIs',
    detail: 'A perfectly WCAG-compliant site can be 100% server-rendered HTML with zero JSON endpoints. Agents need APIs. The most accessible HTML page in the world scores near zero for agent readiness if there is no programmatic data access.',
    score_impact: 'D2 API Quality (0.15 weight) = 0 points',
  },
  {
    title: 'Agent readiness does not require visual design',
    detail: 'An API with no web interface at all can score Silver+ for agent readiness. No color contrast, no font sizing, no layout to evaluate. The two standards evaluate completely different artifacts — one evaluates rendered pages, the other evaluates data endpoints.',
    score_impact: 'Full agent score possible with zero visual UI',
  },
  {
    title: 'WCAG focuses on input; agent readiness focuses on output',
    detail: 'WCAG ensures users CAN interact (keyboard navigation, screen reader compatibility, sufficient tap targets). Agent readiness ensures the system RESPONDS with structured data. Accessibility is about input paths. Agent readiness is about output formats.',
    score_impact: 'D6 Data Quality (0.10 weight) ignores UI entirely',
  },
  {
    title: 'Authentication diverges completely',
    detail: 'WCAG wants login forms with proper labels, error states, and password visibility toggles. Agent readiness wants OAuth 2.0 flows, API key management, and Bearer token authentication. The same site needs both — accessible human auth AND programmatic agent auth.',
    score_impact: 'D3 Onboarding (0.08 weight) measures API auth only',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Can a WCAG AAA site score zero for agent readiness?',
    answer:
      'Nearly zero, yes. A site that is perfectly accessible to screen readers, keyboard users, and cognitively impaired users can still have no API, no structured data endpoints, no agent-card.json, and no machine-readable pricing. The highest such a site might score is 10-15 from TLS detection, basic HTML structure (Schema.org markup if present), and CDN performance. Without any JSON API endpoint, the score ceiling is around 15/100.',
  },
  {
    question: 'Does improving accessibility help agent readiness?',
    answer:
      'Partially. The structured data overlap means improvements like adding Schema.org JSON-LD, semantic HTML, and consistent page structure benefit both scores. But the high-weight agent readiness dimensions (D2 API Quality at 0.15, D7 Security at 0.12, D8 Reliability at 0.13) require capabilities that WCAG does not address: REST API endpoints, rate limiting, health checks, and structured error responses.',
  },
  {
    question: 'Should I prioritize accessibility or agent readiness?',
    answer:
      'Accessibility has legal mandates (ADA, Section 508, EU Accessibility Act) and affects real users today. Agent readiness has no legal mandate but affects a rapidly growing channel. Most businesses should do accessibility first because the legal risk is immediate. But the agent economy is growing at 44.9% CAGR — businesses that ignore agent readiness now will be invisible to AI within 2-3 years.',
  },
  {
    question: 'Are there standards that combine both?',
    answer:
      'Not yet, but there should be. Schema.org structured data is the closest overlap — it helps both screen readers (when properly implemented) and AI agents (structured, machine-readable content). A unified "machine readability" standard that covers both assistive technology and AI agents would be valuable. AgentHermes rewards Schema.org and JSON-LD in the D6 Data Quality dimension.',
  },
  {
    question: 'Do AI agents use ARIA labels?',
    answer:
      'Only when scraping HTML as a fallback. AI agents strongly prefer JSON API responses over parsing HTML. When an agent must parse HTML (because no API exists), ARIA labels and semantic structure make the content slightly more parseable. But agents interacting with an API never encounter ARIA labels — they are working with structured JSON, not rendered DOM.',
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

export default function AccessibilityVsAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Web Accessibility vs Agent Readiness: Why WCAG Compliance Does Not Mean Agent Compliance',
    description:
      'WCAG makes sites accessible to humans with disabilities. Agent readiness makes sites accessible to AI agents. A complete comparison of where the standards overlap and diverge.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/accessibility-vs-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Standards Analysis',
    wordCount: 1900,
    keywords:
      'web accessibility WCAG agent readiness, WCAG vs agent readiness, ARIA labels AI agents, structured data accessibility',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Accessibility vs Agent Readiness',
          item: 'https://agenthermes.ai/blog/accessibility-vs-agent-readiness',
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
      title="Web Accessibility vs Agent Readiness: Why WCAG Compliance Does Not Mean Agent Compliance"
      shareUrl="https://agenthermes.ai/blog/accessibility-vs-agent-readiness"
      currentHref="/blog/accessibility-vs-agent-readiness"
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
            <span className="text-zinc-400">Accessibility vs Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <Accessibility className="h-3.5 w-3.5" />
              Standards Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Provocative
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Web Accessibility vs Agent Readiness:{' '}
            <span className="text-emerald-400">Why WCAG Compliance Does Not Mean Agent Compliance</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The web has spent two decades making sites accessible to humans with disabilities.
            Now it faces a parallel challenge: making sites accessible to AI agents. These are{' '}
            <strong className="text-zinc-100">different standards solving similar problems</strong>{' '}
            for different audiences. A site can achieve WCAG AAA — the highest accessibility rating —
            and still score <strong className="text-zinc-100">5 out of 100</strong> for agent readiness.
            Here is why, where they overlap, and what it means for your business.
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

      {/* ===== TWO KINDS OF MACHINE READABILITY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-emerald-500" />
            Two Kinds of Machine Readability
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              WCAG (Web Content Accessibility Guidelines) makes the web readable by assistive
              technology — screen readers, braille displays, switch controls, and voice navigation.
              These tools parse HTML, interpret ARIA attributes, and present content to users who
              cannot see, hear, or use a mouse.
            </p>
            <p>
              Agent readiness makes the web usable by AI agents — autonomous software that discovers
              businesses, retrieves data, compares options, and completes transactions on behalf of
              users. These agents call APIs, parse JSON, authenticate via OAuth, and process
              structured responses.
            </p>
            <p>
              Both are forms of <strong className="text-zinc-100">machine readability</strong>. Both
              exist because the default web — visual HTML rendered in browsers — does not serve their
              audience. But they solve different problems, use different standards, and measure
              different things. Understanding the distinction matters because businesses frequently
              assume that &ldquo;accessible&rdquo; means &ldquo;works for everything except
              humans with screens&rdquo; — and that is not true.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '97.4%', label: 'Sites with WCAG failures (WebAIM)', icon: Globe },
              { value: '43', label: 'Average agent readiness score', icon: BarChart3 },
              { value: '4', label: 'Areas of overlap', icon: Layers },
              { value: '0', label: 'Combined standards exist', icon: Server },
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

      {/* ===== HEAD TO HEAD COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            WCAG vs Agent Readiness: Side-by-Side
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            A complete comparison of what each standard measures, requires, and rewards.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-3 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Dimension</div>
              <div>WCAG Accessibility</div>
              <div>Agent Readiness</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.aspect}</div>
                <div className="text-zinc-500">{row.wcag}</div>
                <div className="text-emerald-400">{row.agent}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The table reveals a pattern: WCAG and agent readiness operate on entirely different
              layers of the web stack. WCAG works at the <strong className="text-zinc-100">presentation
              layer</strong> — HTML, CSS, ARIA, rendered pages. Agent readiness works at the{' '}
              <strong className="text-zinc-100">data layer</strong> — APIs, JSON, endpoints, protocols.
              A site can be exceptional at one and nonexistent at the other.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE OVERLAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            Where the Standards Overlap
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Despite targeting different audiences, WCAG and agent readiness share a common
            architectural foundation. Improvements in these four areas lift both scores simultaneously.
          </p>

          <div className="space-y-4 mb-8">
            {overlapAreas.map((area) => {
              const colors = getColorClasses(area.color)
              return (
                <div
                  key={area.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <area.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{area.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{area.description}</p>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The Schema.org connection:</strong> Adding
              JSON-LD structured data (Schema.org) to your pages is the single highest-ROI action
              for both standards. Screen readers can leverage structured data for better content
              understanding. AI agents use Schema.org as a primary data source when APIs are
              unavailable. It is the only technology that meaningfully bridges both worlds. AgentHermes
              D6 (Data Quality) rewards JSON-LD presence. WCAG 2.2 Success Criterion 1.3.1 (Info
              and Relationships) benefits from it.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE GAP ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-red-500" />
            Where the Standards Diverge
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These four gaps explain why a WCAG AAA site can score near zero for agent readiness,
            and why a headless API with no UI can score Silver+.
          </p>

          <div className="space-y-4 mb-8">
            {gapAreas.map((gap, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-2">{gap.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{gap.detail}</p>
                <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <p className="text-xs text-amber-400 font-medium">{gap.score_impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE 5/100 SCENARIO ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Monitor className="h-5 w-5 text-amber-500" />
            The WCAG AAA, Agent Score 5 Scenario
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Consider a government services website that has invested heavily in accessibility.
              Every page has proper heading hierarchy, ARIA landmarks, skip navigation links,
              sufficient color contrast (4.5:1+), keyboard-operable forms, visible focus indicators,
              text alternatives for all images, and captions for all video. It passes WCAG AAA —
              the most stringent level.
            </p>
            <p>
              Now an AI agent tries to use this site to help a citizen check permit application
              status. The agent finds: server-rendered HTML pages with no API endpoints, a login
              form with no OAuth or API key option, pricing information embedded in PDF documents,
              status updates displayed in HTML tables with no JSON equivalent, and no
              agent-card.json, llms.txt, or MCP server.
            </p>
            <p>
              AgentHermes scores this site: <strong className="text-zinc-100">D1 Discovery 3/100</strong>{' '}
              (some Schema.org from CMS),{' '}
              <strong className="text-zinc-100">D2 API Quality 0/100</strong> (no API endpoints at
              all), <strong className="text-zinc-100">D7 Security 8/100</strong> (TLS present, but no
              API auth to evaluate). Final composite: roughly 5/100. WCAG AAA. Agent readiness
              catastrophe.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">This is not a failure of either standard.</strong>{' '}
              WCAG was designed to make the web work for humans using assistive technology. It
              succeeded. Agent readiness measures whether AI agents can interact with a service
              programmatically. They are complementary standards, not competing ones. The mistake
              is assuming compliance with one implies readiness for the other. See our{' '}
              <Link href="/blog/government-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                government agent readiness analysis
              </Link>{' '}
              for the full sector breakdown.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE PATH FORWARD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Building for Both: The Converging Path
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The smartest approach is not to choose between accessibility and agent readiness — it is
              to build architecture that serves both. The principle is{' '}
              <strong className="text-zinc-100">content as structured data first, presentation as a
              rendering layer</strong>. When your business information, pricing, availability, and
              services are stored as structured data and exposed through APIs, you can render that
              data as accessible HTML for humans AND provide it as JSON for agents.
            </p>
            <p>
              Start with what overlaps: add Schema.org JSON-LD to every page (benefits both scores).
              Ensure all content is in semantic HTML (benefits WCAG). Then add agent-specific
              infrastructure: JSON API endpoints for your core data, an{' '}
              <Link href="/blog/agent-card-json-guide" className="text-emerald-400 hover:text-emerald-300 underline">
                agent-card.json
              </Link>{' '}
              declaring your capabilities, and OAuth or API key authentication for programmatic access.
            </p>
            <p>
              The web is being read by three audiences now: humans with screens, humans with
              assistive technology, and AI agents. Two of those audiences have mature standards
              (WCAG and agent readiness). The businesses that build for all three will be the ones
              that thrive as the agent economy grows.
            </p>
            <p>
              Check your{' '}
              <Link href="/blog/agent-readiness-vs-seo" className="text-emerald-400 hover:text-emerald-300 underline">
                Agent Readiness vs SEO comparison
              </Link>{' '}
              for another perspective on how standards designed for different audiences overlap and
              diverge. Or read our{' '}
              <Link href="/blog/schema-markup-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                Schema markup guide
              </Link>{' '}
              for the most impactful single change you can make for both accessibility and agent
              readiness.
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
                title: 'Agent Readiness vs SEO: Where the Standards Diverge',
                href: '/blog/agent-readiness-vs-seo',
                tag: 'Standards Analysis',
                tagColor: 'purple',
              },
              {
                title: 'Government Agent Readiness: Why Public Services Score Below 20',
                href: '/blog/government-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Schema Markup and Agent Readiness',
                href: '/blog/schema-markup-agent-readiness',
                tag: 'Technical Guide',
                tagColor: 'blue',
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
            Accessible to humans AND agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see how your site scores for AI agents.
            Then compare with your WCAG audit to find the gaps in both directions.
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
