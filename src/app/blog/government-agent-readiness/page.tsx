import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Clock,
  FileText,
  Globe,
  HelpCircle,
  Landmark,
  Lock,
  Network,
  Scale,
  Search,
  Server,
  Shield,
  ShieldAlert,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Government Agent Readiness: Why Public Services Are the Most Invisible to AI Agents | AgentHermes',
  description:
    'Government websites are designed for compliance, not AI agents. IRS, DMV, and city portals all score under 15. PDF forms, CAPTCHA walls, and no APIs make public services invisible. A few exceptions exist.',
  keywords: [
    'government agent readiness',
    'government AI agents',
    'public services AI',
    'government API',
    'government digital services',
    'IRS agent readiness',
    'DMV AI agent',
    'government MCP server',
    'public sector agent readiness',
  ],
  openGraph: {
    title: 'Government Agent Readiness: Why Public Services Are the Most Invisible to AI Agents',
    description:
      'Government mandates WCAG accessibility but blocks AI accessibility. IRS, DMV, city portals all score under 15. The irony of the most regulated sector being the least agent-ready.',
    url: 'https://agenthermes.ai/blog/government-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Government Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Government Agent Readiness: Why Public Services Are the Most Invisible to AI Agents',
    description:
      'Government mandates WCAG accessibility but blocks AI accessibility. IRS, DMV, city portals score under 15.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/government-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const governmentScores = [
  { entity: 'IRS (irs.gov)', score: 11, tier: 'Not Scored', reason: 'PDF forms, CAPTCHA, no API, phone-only resolution' },
  { entity: 'DMV (varies by state)', score: 8, tier: 'Not Scored', reason: 'Appointment via phone, no structured data, legacy CMS' },
  { entity: 'City Portals (avg)', score: 12, tier: 'Not Scored', reason: 'Permit PDFs, no digital submission, fragmented systems' },
  { entity: 'data.gov', score: 48, tier: 'Bronze', reason: 'Structured APIs, CKAN catalog, machine-readable datasets' },
  { entity: 'USASpending.gov', score: 52, tier: 'Bronze', reason: 'REST API, OpenAPI spec, bulk download, structured fiscal data' },
  { entity: 'Census Bureau API', score: 45, tier: 'Bronze', reason: 'REST endpoints, API key auth, structured demographic data' },
]

const failurePatterns = [
  {
    pattern: 'PDF form walls',
    description: 'Tax forms, permit applications, license renewals — all locked in PDF. An agent cannot fill a PDF, cannot extract structured fields from one, and cannot submit one electronically. This kills D2 API Quality (15%) and D9 Agent Experience (10%).',
    icon: FileText,
    color: 'red',
    prevalence: '95% of government services',
  },
  {
    pattern: 'CAPTCHA as default security',
    description: 'Government sites use CAPTCHA on nearly every interaction point. Designed to block bots, it equally blocks AI agents acting on behalf of authenticated users. There is no machine-to-machine bypass or OAuth alternative.',
    icon: ShieldAlert,
    color: 'red',
    prevalence: '80% of government portals',
  },
  {
    pattern: 'Phone-only resolution',
    description: '"Call 1-800-xxx-xxxx for assistance" is the universal government endpoint. No API, no webhook, no structured callback. When an agent hits a dead end, there is no programmatic path forward.',
    icon: Users,
    color: 'amber',
    prevalence: '90% of government services',
  },
  {
    pattern: 'Legacy CMS with no API layer',
    description: 'Most government websites run on legacy content management systems — Drupal 7, custom .gov frameworks, or static HTML generators. None expose structured APIs. Content exists as rendered HTML pages, not queryable data.',
    icon: Globe,
    color: 'amber',
    prevalence: '70% of federal and state sites',
  },
  {
    pattern: 'No structured service catalog',
    description: 'Businesses publish product catalogs. Government should publish service catalogs — but none do in a structured format. What services does this agency provide? What are the requirements? What are the timelines? All buried in prose.',
    icon: Search,
    color: 'amber',
    prevalence: '99% of government agencies',
  },
]

const agentReadyGovernment = [
  {
    capability: 'Structured service catalog API',
    description: 'A machine-readable endpoint listing every service the agency provides, with requirements, timelines, fees, and eligibility criteria as structured fields. Like a product catalog for public services.',
    impact: 'D1 Discoverability, D2 API Quality',
  },
  {
    capability: 'Digital form submission API',
    description: 'Every PDF form should have an API equivalent that accepts structured JSON input, validates fields, and returns a confirmation. The form data already exists in structured databases — the API is the missing surface.',
    impact: 'D2 API Quality, D9 Agent Experience',
  },
  {
    capability: 'Appointment scheduling endpoint',
    description: 'DMV, passport offices, benefits offices — all require appointments. A REST endpoint for check_availability() and book_appointment() would replace millions of phone calls per year.',
    impact: 'D2 API Quality, D3 Onboarding',
  },
  {
    capability: 'Application status-check API',
    description: 'Tax refunds, permit applications, license renewals — citizens constantly check status. A get_status(application_id) endpoint with structured responses eliminates the need for phone trees and "check back in 6-8 weeks."',
    impact: 'D6 Data Quality, D8 Reliability',
  },
  {
    capability: 'Machine-readable eligibility rules',
    description: 'Benefits eligibility, tax brackets, permit requirements — all currently buried in legal prose. Structured rules engines that agents can query would let AI assistants answer "am I eligible for X?" with real data.',
    impact: 'D6 Data Quality, D9 Agent Experience',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do government websites score so low on agent readiness?',
    answer:
      'Government websites are designed for compliance (Section 508, WCAG), not for machine consumption. They optimize for human-readable content — PDFs, prose, phone numbers — rather than structured APIs. The absence of any API layer means agents have no programmatic entry point. Additionally, CAPTCHA, session-based auth, and legacy CMS platforms actively block automated access.',
  },
  {
    question: 'Are there any government services that score well?',
    answer:
      'Yes. Data-focused agencies score significantly higher than service-delivery agencies. data.gov (48 Bronze), USASpending.gov (52 Bronze), and the Census Bureau API (45 Bronze) all provide structured REST endpoints with machine-readable data. The pattern is clear: when the mission is data distribution, the infrastructure is agent-adjacent. When the mission is service delivery, it is agent-hostile.',
  },
  {
    question: 'Could government services realistically become agent-ready?',
    answer:
      'Technically, yes. The UK Government Digital Service (GDS) has already shown that government can build API-first services. Estonia runs nearly all public services through structured digital infrastructure. The US has the 21st Century Integrated Digital Experience Act (IDEA Act) and the Federal Data Strategy — both mandate machine-readable data. Execution is the gap, not policy.',
  },
  {
    question: 'Does WCAG accessibility help with agent readiness?',
    answer:
      'Partially. WCAG mandates semantic HTML, alt text, and keyboard navigation — all of which improve D1 Discoverability slightly. But WCAG is designed for screen readers, not AI agents. Screen readers parse rendered pages. Agents need APIs. Accessibility and agent readiness overlap on maybe 10% of signals. The remaining 90% requires dedicated agent infrastructure.',
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

export default function GovernmentAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Government Agent Readiness: Why Public Services Are the Most Invisible to AI Agents',
    description:
      'Government websites are designed for compliance, not AI agents. PDF forms, CAPTCHA walls, and no APIs make public services invisible. IRS, DMV, and city portals all score under 15.',
    datePublished: '2026-04-16',
    dateModified: '2026-04-16',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/government-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1900,
    keywords:
      'government agent readiness, public services AI agents, government API, IRS DMV agent readiness',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Government Agent Readiness',
          item: 'https://agenthermes.ai/blog/government-agent-readiness',
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
      title="Government Agent Readiness: Why Public Services Are the Most Invisible to AI Agents"
      shareUrl="https://agenthermes.ai/blog/government-agent-readiness"
      currentHref="/blog/government-agent-readiness"
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
            <span className="text-zinc-400">Government Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Landmark className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Lowest Scores
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Government Agent Readiness:{' '}
            <span className="text-emerald-400">Why Public Services Are the Most Invisible to AI Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Government websites are designed for <strong className="text-zinc-100">compliance</strong>,
            not for agents. PDF forms instead of APIs. CAPTCHA walls instead of authentication tokens.
            Phone trees instead of endpoints. The IRS, DMV, and city portals all score{' '}
            <strong className="text-zinc-100">under 15</strong> on the Agent Readiness Score. The
            irony: government mandates WCAG accessibility for humans but blocks AI accessibility entirely.
          </p>

          {/* Author byline */}
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-zinc-800/50">
            <div className="author-avatar">AH</div>
            <div>
              <div className="text-sm font-semibold text-zinc-200">AgentHermes Research</div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  April 16, 2026
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Landmark className="h-5 w-5 text-amber-500" />
            The Accessibility Paradox
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The US federal government has spent billions on digital accessibility. Section 508
              compliance. WCAG 2.1 AA standards. Screen reader compatibility. Keyboard navigation.
              Every federal website must be accessible to people with disabilities — and most are,
              at least nominally.
            </p>
            <p>
              But there is a category of user that no government regulation addresses:{' '}
              <strong className="text-zinc-100">AI agents acting on behalf of citizens</strong>.
              When someone asks an AI assistant to &ldquo;check my tax refund status,&rdquo;
              &ldquo;renew my driver&apos;s license,&rdquo; or &ldquo;find out if I qualify for food
              stamps,&rdquo; the agent hits a wall. Not a content wall — an infrastructure wall.
            </p>
            <p>
              Government websites are built to be <em>read</em> by humans with assistive technology.
              They are not built to be <em>used</em> by AI agents with API calls. The result is a
              paradox: the most accessibility-conscious sector in the economy is the least accessible
              to the fastest-growing category of digital interaction.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '<15', label: 'Avg govt score', icon: BarChart3, color: 'text-red-400' },
              { value: '0', label: 'Govt MCP servers', icon: Server, color: 'text-red-400' },
              { value: '95%', label: 'Services in PDF', icon: FileText, color: 'text-amber-400' },
              { value: '48', label: 'Best: data.gov', icon: Globe, color: 'text-emerald-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center"
              >
                <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl sm:text-3xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SCORE TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Government Agent Readiness Scores
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The gap between service-delivery government and data-distribution government is stark.
            Data agencies score 3-5x higher than service agencies because their mission naturally
            produces structured, machine-readable outputs.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Entity</div>
              <div className="text-center">Score</div>
              <div className="text-center">Tier</div>
              <div>Key Issue</div>
            </div>
            {governmentScores.map((row, i) => {
              const scoreColor = row.score >= 40 ? 'text-amber-400' : 'text-red-400'
              const tierColor = row.tier === 'Bronze' ? 'text-amber-400' : 'text-red-400'
              return (
                <div
                  key={row.entity}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200 text-xs sm:text-sm">{row.entity}</div>
                  <div className={`text-center font-mono font-bold ${scoreColor}`}>{row.score}</div>
                  <div className={`text-center text-xs font-medium ${tierColor}`}>{row.tier}</div>
                  <div className="text-zinc-500 text-xs">{row.reason}</div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-emerald-400">The exception proves the rule:</strong> data.gov,
              USASpending.gov, and the Census Bureau API all score Bronze because they were built to
              distribute data, not deliver services. Their mission required structured APIs from day
              one. Every government service that involves citizen interaction — taxes, permits,
              licenses, benefits — scores under 15.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAILURE PATTERNS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            Five Failure Patterns That Make Government Invisible
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The same five patterns repeat across federal, state, and local government websites.
              Unlike{' '}
              <Link href="/blog/professional-services-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                professional services firms
              </Link>{' '}
              that score low due to neglect, government scores low due to <em>design</em>. These
              are intentional architectural decisions that were correct for a pre-agent world but
              are now blocking the next generation of citizen services.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {failurePatterns.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.pattern}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                        <item.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">{item.pattern}</h3>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400">
                      {item.prevalence}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY GOVERNMENT LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Government Would Look Like
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Imagine asking an AI assistant: &ldquo;Am I eligible for the Earned Income Tax Credit
              this year?&rdquo; Instead of linking you to a 47-page PDF, the agent calls an
              eligibility API with your filing status and income. It returns a structured yes/no with
              the estimated credit amount, required forms, and a link to file electronically. That is
              agent-ready government.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {agentReadyGovernment.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-zinc-100 text-sm">{item.capability}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      {item.impact}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              This is not speculative. The UK Government Digital Service (GDS) already publishes
              structured APIs for tax, benefits, and vehicle registration. Estonia runs 99% of
              public services through digital infrastructure with structured APIs. The US has the
              policy framework — the IDEA Act, the Federal Data Strategy, the API-first mandate
              from OMB M-23-22. What is missing is execution at the service-delivery layer.
            </p>
            <p>
              The irony is that government is{' '}
              <Link href="/blog/invisible-to-ai-agents" className="text-emerald-400 hover:text-emerald-300 underline">
                invisible to AI agents
              </Link>{' '}
              at exactly the moment when citizens are starting to use AI assistants for the most
              frustrating interactions in their lives: taxes, permits, benefits, and bureaucratic
              processes that currently require hours on hold.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE IRONY SECTION ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-purple-500" />
            The WCAG Irony: Accessible to Humans, Hostile to Agents
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              WCAG compliance mandates semantic HTML, ARIA labels, alt text, keyboard navigation,
              and color contrast ratios. Government has spent decades and billions achieving
              compliance. These efforts produce marginal benefits for AI agents — semantic HTML is
              slightly easier to parse than tag soup — but they fundamentally miss the point.
            </p>
            <p>
              <strong className="text-zinc-100">WCAG accessibility is about consuming content.
              Agent readiness is about performing actions.</strong> A screen reader can read the text
              on irs.gov. An AI agent cannot file a tax return on irs.gov. The gap between reading
              and doing is the entire agent readiness score.
            </p>
            <p>
              A new mandate is needed — not WCAG 3.0, but something like &ldquo;AARG&rdquo; (Agent
              Accessibility and Readiness Guidelines). Structured service catalogs. Machine-readable
              eligibility rules. API endpoints for every citizen interaction. The same rigor applied
              to screen readers should be applied to AI agents — because increasingly, citizens will
              interact with government <em>through</em> agents, not through browsers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'What WCAG gives agents',
                items: ['Semantic HTML structure', 'Alt text on images', 'Labeled form fields', 'Consistent navigation'],
                color: 'amber',
              },
              {
                title: 'What agents actually need',
                items: ['REST API endpoints', 'OAuth or token auth', 'Structured JSON responses', 'Machine-readable service catalog'],
                color: 'emerald',
              },
            ].map((col) => {
              const colors = getColorClasses(col.color)
              return (
                <div key={col.title} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <h3 className={`font-bold mb-3 text-sm ${colors.text}`}>{col.title}</h3>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="text-sm text-zinc-400 flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${col.color === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
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
                title: 'Professional Services: Why Law Firms Score Under 20',
                href: '/blog/professional-services-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Is Your Business Invisible to AI Agents?',
                href: '/blog/invisible-to-ai-agents',
                tag: 'Getting Started',
                tagColor: 'emerald',
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
            Score any government website
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness scan on any .gov domain. See exactly which dimensions
            fail and what it would take to make public services agent-accessible.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Scan a .gov Site
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
