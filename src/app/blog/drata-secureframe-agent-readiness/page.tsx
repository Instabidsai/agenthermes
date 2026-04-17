import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Network,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Why Drata and Secureframe Both Score 65-66: The Compliance SaaS Pattern | AgentHermes',
  description:
    'Dual case study: Drata scores 66, Secureframe scores 65 on Agent Readiness. Nearly identical Silver scores reveal the compliance SaaS pattern — what drives their scores up and what keeps them from Gold.',
  keywords: [
    'Drata Secureframe agent readiness compliance',
    'Drata agent readiness score',
    'Secureframe agent readiness',
    'compliance SaaS agent readiness',
    'SOC 2 automation agent readiness',
    'compliance platform MCP server',
    'Drata vs Secureframe',
    'agent readiness compliance',
    'GRC platform agent score',
  ],
  openGraph: {
    title: 'Why Drata and Secureframe Both Score 65-66: The Compliance SaaS Pattern',
    description:
      'Drata 66, Secureframe 65 — nearly identical Silver scores. The compliance SaaS pattern explains both their strengths and their ceiling.',
    url: 'https://agenthermes.ai/blog/drata-secureframe-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Drata and Secureframe Agent Readiness Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drata 66, Secureframe 65: The Compliance SaaS Agent Readiness Pattern',
    description:
      'Both compliance platforms score Silver. The compliance SaaS pattern reveals why — and what it takes to reach Gold.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/drata-secureframe-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const headToHead = [
  { dimension: 'D1 Discovery', drataScore: 78, secureframeScore: 75, detail: 'Both have excellent SEO, Schema.org markup, and structured documentation sites. Drata edges ahead with richer JSON-LD.', winner: 'drata' },
  { dimension: 'D2 API Quality', drataScore: 82, secureframeScore: 80, detail: 'Both offer REST APIs with versioning. Drata has more comprehensive endpoint coverage for compliance evidence and controls. Secureframe has cleaner error responses.', winner: 'drata' },
  { dimension: 'D3 Onboarding', drataScore: 72, secureframeScore: 74, detail: 'Both offer self-service trial signup. Secureframe has a slightly smoother developer onboarding flow with interactive API playground.', winner: 'secureframe' },
  { dimension: 'D4 Pricing', drataScore: 25, secureframeScore: 22, detail: 'Both gate pricing behind enterprise sales. "Talk to sales" or "Get a demo" — the worst pattern for agent readiness. Neither publishes structured pricing data.', winner: 'tie' },
  { dimension: 'D5 Payment', drataScore: 35, secureframeScore: 32, detail: 'Enterprise billing via invoices. No self-service payment. No structured payment API. Standard for enterprise SaaS but terrible for agents.', winner: 'tie' },
  { dimension: 'D6 Data Quality', drataScore: 70, secureframeScore: 68, detail: 'Both return well-structured JSON from APIs. Schema definitions are typed and documented. Drata has slightly richer metadata on compliance frameworks.', winner: 'drata' },
  { dimension: 'D7 Security', drataScore: 92, secureframeScore: 90, detail: 'Both score near-perfect. They ARE security companies. OAuth 2.0, RBAC, audit logging, SOC 2 certified themselves, security.txt. The one dimension where their core business directly elevates their score.', winner: 'drata' },
  { dimension: 'D8 Reliability', drataScore: 80, secureframeScore: 78, detail: 'Both have status pages, uptime monitoring, rate limiting, and error handling. Standard for funded SaaS companies at this scale.', winner: 'drata' },
  { dimension: 'D9 Agent Experience', drataScore: 15, secureframeScore: 12, detail: 'Neither has an MCP server, agent-card.json, or AGENTS.md. No agent-native discovery files. This is where both lose the most points relative to their potential.', winner: 'drata' },
]

const whatPushesToGold = [
  {
    title: 'Publish transparent pricing',
    impact: '+8-12 points',
    detail: 'Both Drata and Secureframe gate pricing behind sales calls. Publishing structured pricing tiers — even at enterprise price points — would immediately boost D4. Agents cannot recommend a compliance platform they cannot price.',
    icon: DollarSign,
    color: 'amber',
  },
  {
    title: 'Deploy an MCP server',
    impact: '+10-15 points',
    detail: 'An MCP server exposing compliance status, framework progress, audit readiness, and integration health would make either platform directly usable by AI compliance agents. The GRC automation use case is perfect for MCP.',
    icon: Server,
    color: 'emerald',
  },
  {
    title: 'Add agent discovery files',
    impact: '+5-8 points',
    detail: 'Deploy agent-card.json and llms.txt describing the platform capabilities, API surface, and compliance framework coverage. These are the files AI agents look for when evaluating tools.',
    icon: Bot,
    color: 'blue',
  },
  {
    title: 'Self-service payment flow',
    impact: '+5-8 points',
    detail: 'Allow smaller companies to self-serve purchase through Stripe or a structured payment API. Enterprise deals can still go through sales, but having a programmatic purchase path elevates D5.',
    icon: Lock,
    color: 'purple',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do Drata and Secureframe score almost identically?',
    answer:
      'Because they share the same architectural DNA. Both are API-first compliance SaaS platforms founded within a year of each other (Drata 2020, Secureframe 2020). Both integrate with the same set of cloud providers, identity platforms, and HR tools. Both use OAuth, both have REST APIs, both have developer documentation, and both gate pricing behind enterprise sales. The compliance SaaS pattern produces a narrow score band of 62-68 because the architecture, business model, and go-to-market are nearly identical.',
  },
  {
    question: 'How does being a security company affect agent readiness?',
    answer:
      'It gives a massive boost to D7 Security (12% weight). Compliance platforms implement security best practices by necessity — they are selling trust. OAuth 2.0, RBAC, audit logging, encryption at rest, SOC 2 certification of their own platform, security.txt files. Both Drata and Secureframe score 90+ on D7. But security alone cannot carry you to Gold because it is only one of nine dimensions.',
  },
  {
    question: 'What would it take for either platform to reach Gold (75+)?',
    answer:
      'The gap from Silver (65-66) to Gold (75+) is approximately 10 points. The fastest path: publish structured pricing data (+8-12 points on D4), deploy an MCP server with compliance tools (+10-15 points on D9), and add agent-card.json and llms.txt (+5-8 points on D9). Any two of these three changes would push either platform past the Gold threshold. The irony is that compliance platforms help other companies achieve certifications but have not yet optimized for the next wave of automated compliance agents.',
  },
  {
    question: 'Would AI compliance agents actually use Drata or Secureframe through MCP?',
    answer:
      'Absolutely. The compliance use case is ideal for agent automation. An AI compliance agent managing a startup portfolio could check SOC 2 readiness across all portfolio companies, identify gaps, assign remediation tasks, and track progress — all through MCP calls to Drata or Secureframe. An AI CISO agent could monitor compliance posture in real time, flag drift, and trigger re-assessments. The data is structured, the workflows are procedural, and the reporting is standardized. Compliance is one of the best agent-ready verticals — the platforms just need to expose the tools.',
  },
  {
    question: 'How do Drata and Secureframe compare to other developer tools?',
    answer:
      'They score in the same band as other funded developer-facing SaaS: Vercel 69, Supabase 69, Slack 68, Stripe 68, Drata 66, Secureframe 65. The compliance platforms are slightly below because of pricing opacity (D4) and the lack of agent discovery infrastructure (D9). But they outperform most enterprise SaaS categories — HR tech averages 35, CRM averages 38, and marketing platforms average 32. Being developer-facing and API-first gives compliance SaaS a structural advantage.',
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

export default function DrataSecureframeAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Drata and Secureframe Both Score 65-66: The Compliance SaaS Pattern',
    description:
      'Dual case study: Drata 66, Secureframe 65 on Agent Readiness Score. Nearly identical Silver scores reveal the compliance SaaS pattern — what works, what fails, and what pushes compliance platforms to Gold.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/drata-secureframe-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Case Study',
    wordCount: 1800,
    keywords:
      'Drata Secureframe agent readiness compliance, compliance SaaS agent score, SOC 2 automation agent readiness, GRC platform MCP server',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Drata & Secureframe Agent Readiness',
          item: 'https://agenthermes.ai/blog/drata-secureframe-agent-readiness',
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
      title="Why Drata and Secureframe Both Score 65-66: The Compliance SaaS Pattern"
      shareUrl="https://agenthermes.ai/blog/drata-secureframe-agent-readiness"
      currentHref="/blog/drata-secureframe-agent-readiness"
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
            <span className="text-zinc-400">Drata & Secureframe Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <BadgeCheck className="h-3.5 w-3.5" />
              Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              Compliance SaaS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Why Drata and Secureframe Both Score 65-66:{' '}
            <span className="text-emerald-400">The Compliance SaaS Pattern</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Drata scores <strong className="text-zinc-100">66</strong>. Secureframe scores{' '}
            <strong className="text-zinc-100">65</strong>. One point apart. Both Silver tier. This is not a coincidence —
            it is a <strong className="text-zinc-100">pattern</strong>. Compliance SaaS platforms share architectural DNA
            that produces nearly identical agent readiness scores. This dual case study breaks down exactly where both
            platforms excel, where both fail, and what it would take for either to reach Gold.
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
                  13 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE PATTERN ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-purple-500" />
            The Compliance SaaS Pattern
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Drata and Secureframe are the two leading compliance automation platforms. Both automate SOC 2, ISO 27001,
              HIPAA, and GDPR compliance. Both were founded in 2020. Both raised hundreds of millions in venture capital.
              Both serve thousands of companies. And both score within one point of each other on agent readiness.
            </p>
            <p>
              This convergence reveals a <strong className="text-zinc-100">compliance SaaS pattern</strong> — a set of
              architectural and business model choices that produce a predictable agent readiness profile. Understanding
              this pattern helps every SaaS founder see where their category naturally lands and what it takes to break
              out of the band.
            </p>
            <p>
              The pattern has three pillars: (1) API-first architecture with OAuth and RBAC, (2) deep integration ecosystem
              with dozens of connected tools, and (3) enterprise sales model with gated pricing. The first two push scores
              up. The third holds them back.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20 text-center">
              <div className="text-xs text-zinc-500 mb-2">Drata</div>
              <div className="text-4xl font-bold text-blue-400 mb-2">66</div>
              <div className="text-sm text-zinc-400">Silver Tier</div>
              <div className="mt-3 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full bg-blue-500/40" style={{ width: '66%' }} />
              </div>
            </div>
            <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20 text-center">
              <div className="text-xs text-zinc-500 mb-2">Secureframe</div>
              <div className="text-4xl font-bold text-purple-400 mb-2">65</div>
              <div className="text-sm text-zinc-400">Silver Tier</div>
              <div className="mt-3 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full bg-purple-500/40" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HEAD-TO-HEAD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Dimension-by-Dimension Breakdown
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Here is how Drata and Secureframe score across all nine dimensions of the Agent Readiness Score.
              The near-identical profile is the defining characteristic of the compliance SaaS pattern.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {headToHead.map((item) => (
              <div
                key={item.dimension}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-zinc-100">{item.dimension}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono font-bold text-blue-400">{item.drataScore}</span>
                    <span className="text-xs text-zinc-600">vs</span>
                    <span className="text-sm font-mono font-bold text-purple-400">{item.secureframeScore}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500/40" style={{ width: `${item.drataScore}%` }} />
                  </div>
                  <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full rounded-full bg-purple-500/40" style={{ width: `${item.secureframeScore}%` }} />
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The pattern is clear:</strong> Both platforms score 70-92 on
              technical dimensions (D2 API, D7 Security, D8 Reliability, D6 Data Quality) and 12-35 on
              commercial dimensions (D4 Pricing, D5 Payment, D9 Agent Experience). The compliance SaaS
              architecture is technically excellent but commercially opaque to agents.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHERE THEY SCORE WELL ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Where Compliance Platforms Excel
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Compliance SaaS platforms benefit from a unique alignment: their <strong className="text-zinc-100">core
              product requires</strong> many of the same capabilities that agent readiness measures. Security is not
              a nice-to-have — it is their business. API quality is not optional — their customers integrate
              programmatically. This structural advantage puts them ahead of most SaaS categories by default.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'D7 Security: 90-92 (near-perfect)',
                detail: 'They ARE security companies. OAuth 2.0 with PKCE, role-based access control, audit logging on every action, SOC 2 Type II certified themselves, security.txt published, HTTPS everywhere with strict transport security. Their product is trust, so their infrastructure reflects it.',
                color: 'emerald',
              },
              {
                title: 'D2 API Quality: 80-82 (excellent)',
                detail: 'Both platforms offer versioned REST APIs with comprehensive endpoint coverage. Compliance evidence, controls, frameworks, integrations, and users are all accessible via structured endpoints. Response schemas are typed and documented.',
                color: 'blue',
              },
              {
                title: 'D8 Reliability: 78-80 (strong)',
                detail: 'Status pages with real-time uptime data, rate limiting with standard headers, structured error responses with codes, retry-after headers on 429s. Enterprise customers demand this reliability — compliance audits cannot afford downtime.',
                color: 'purple',
              },
              {
                title: 'D3 Onboarding: 72-74 (good)',
                detail: 'Self-service trial signup with reasonable onboarding flows. Developer documentation with API references and SDKs. Sandbox environments for testing integrations. Both have developer portals, though not as polished as pure developer-tools companies like Stripe.',
                color: 'cyan',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className={`font-bold mb-2 text-sm ${colors.text}`}>{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The compliance SaaS pattern demonstrates an important principle: <strong className="text-zinc-100">companies
              whose core business requires technical excellence score higher on agent readiness by default</strong>.
              This is the same{' '}
              <Link href="/blog/cybersecurity-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                pattern we see across cybersecurity tools
              </Link> — the closer your product is to infrastructure, the more agent-ready you are without trying.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHERE THEY LOSE POINTS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-red-500" />
            Where the Compliance Pattern Breaks Down
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The same enterprise sales model that drives compliance SaaS revenue is the biggest obstacle to
              reaching Gold. Three dimensions suffer dramatically from the &ldquo;talk to sales&rdquo; approach.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              {
                dim: 'D4 Pricing Transparency (22-25/100)',
                problem: 'Both platforms hide pricing entirely. No public pricing page, no structured pricing data, no tier information accessible via API. An AI agent evaluating compliance platforms for a portfolio company cannot compare Drata vs Secureframe on price without initiating a sales conversation.',
                impact: 'Loses 4-6 points on the total score. At 5% weight, D4 is lighter than other dimensions, but the zero-score pattern creates a hard ceiling.',
                color: 'red',
              },
              {
                dim: 'D5 Payment (32-35/100)',
                problem: 'Enterprise invoicing only. No self-service purchase path, no structured payment API, no Stripe integration for direct purchase. Even if an agent knows the price, it cannot complete a transaction programmatically.',
                impact: 'Loses 4-5 points on the total score. Combined with D4, the commercial opacity costs 8-11 points.',
                color: 'red',
              },
              {
                dim: 'D9 Agent Experience (12-15/100)',
                problem: 'Neither platform has an MCP server, agent-card.json, llms.txt, or AGENTS.md. No agent-native discovery infrastructure whatsoever. AI agents cannot discover either platform through agent protocols — only through web search and documentation crawling.',
                impact: 'Loses 8-9 points on the total score. This is the highest-impact improvement available: deploying agent discovery files would add 10-15 points.',
                color: 'red',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.dim}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <h3 className={`text-sm font-bold mb-2 ${colors.text}`}>{item.dim}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">{item.problem}</p>
                  <p className="text-xs text-zinc-500 italic">{item.impact}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHAT PUSHES TO GOLD ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Pushes Compliance Platforms to Gold
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The gap from Silver (65-66) to Gold (75+) is approximately 10 points. Here are the four changes
            that would close it — and the expected point impact of each, based on analysis from{' '}
            <Link href="/blog/developer-tools-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
              developer tool scoring patterns
            </Link>.
          </p>

          <div className="space-y-4 mb-8">
            {whatPushesToGold.map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-100">{item.title}</h3>
                      <span className={`text-xs font-mono ${colors.text}`}>{item.impact}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The path to Gold for compliance SaaS is remarkably clear: fix the commercial opacity. The
              technical foundation is already excellent. Both platforms score 70+ on the four technical
              dimensions. The ceiling is entirely created by the enterprise sales model and the absence of
              agent-native discovery. Any compliance platform that publishes pricing and deploys an MCP server
              becomes the most agent-ready option in the category overnight.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AI COMPLIANCE AGENT USE CASE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            The AI Compliance Agent Use Case
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Compliance is one of the most promising verticals for AI agent automation. The work is procedural,
              evidence-based, and framework-driven — exactly the kind of structured workflow that agents excel at.
              An AI compliance agent powered by{' '}
              <Link href="/blog/saas-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                agent-ready SaaS tools
              </Link>{' '}
              could manage an entire compliance program:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'Portfolio compliance monitoring',
                detail: 'A VC firm AI agent checks SOC 2 readiness across 30 portfolio companies. Calls get_compliance_status() for each, flags companies falling behind, assigns remediation tasks, and reports to the CISO weekly.',
              },
              {
                title: 'Continuous compliance posture',
                detail: 'An AI CISO agent monitors compliance drift in real time. When a new employee joins without security training, or an AWS bucket changes permissions, the agent detects the gap via MCP and triggers remediation.',
              },
              {
                title: 'Multi-framework management',
                detail: 'An agent manages overlapping requirements across SOC 2, ISO 27001, and HIPAA simultaneously. Maps shared controls across frameworks, identifies single evidence that satisfies multiple requirements.',
              },
              {
                title: 'Audit preparation automation',
                detail: 'Before an annual audit, an AI agent runs a pre-check across all controls, collects fresh evidence screenshots, identifies gaps, and produces a readiness report — reducing audit prep from weeks to hours.',
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

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The first compliance platform to deploy an MCP server does not just improve its agent readiness score —
              it becomes the <strong className="text-zinc-100">default compliance tool for every AI agent managing
              security programs</strong>. In a market where Drata and Secureframe are nearly identical on features
              and pricing, agent readiness could be the differentiator that wins the next wave of customers.
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
                title: 'Cybersecurity Agent Readiness: Why Security Companies Should Score Highest',
                href: '/blog/cybersecurity-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Developer Tools Agent Readiness: The Gold Standard',
                href: '/blog/developer-tools-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'SaaS Agent Readiness: How Software Platforms Score',
                href: '/blog/saas-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
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
            Scan your SaaS platform
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See how your compliance or security platform scores across all 9 dimensions. Compare your
            agent readiness to Drata, Secureframe, and the rest of the category.
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
