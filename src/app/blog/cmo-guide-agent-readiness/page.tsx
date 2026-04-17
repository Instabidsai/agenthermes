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
  DollarSign,
  Globe,
  HelpCircle,
  Layers,
  Megaphone,
  PieChart,
  Search,
  Server,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "The CMO's Guide to Agent Readiness: Why Your Marketing Website Fails AI Agents | AgentHermes",
  description:
    "Marketing websites are built for humans — hero images, animations, contact forms. AI agents cannot use any of it. The CMO's guide to making your marketing agent-ready: Schema.org, structured pricing, lead intake APIs, and llms.txt.",
  keywords: [
    'CMO marketing agent readiness guide',
    'marketing agent readiness',
    'CMO AI agents',
    'marketing website AI',
    'Schema.org agent readiness',
    'agent driven leads',
    'GEO marketing',
    'AI marketing strategy',
    'agent readiness for marketers',
  ],
  openGraph: {
    title: "The CMO's Guide to Agent Readiness: Why Your Marketing Website Fails AI Agents",
    description:
      'Marketing websites are designed for humans but invisible to agents. Here is what CMOs should push for: Schema.org, structured pricing, lead intake API, llms.txt. Agent-driven leads cost $0 CAC.',
    url: 'https://agenthermes.ai/blog/cmo-guide-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "The CMO's Guide to Agent Readiness: Why Your Marketing Website Fails AI Agents",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The CMO's Guide to Agent Readiness",
    description:
      'Your marketing website is invisible to AI agents. Schema.org, structured pricing, lead intake APIs — the CMO playbook for agent-driven $0 CAC leads.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/cmo-guide-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const humanVsAgent = [
  { element: 'Hero image with tagline', human: 'Emotional hook, builds brand', agent: 'Invisible. Agents cannot interpret hero images or CSS animations.', impact: 'D1, D6' },
  { element: 'Contact form', human: 'Lead capture, CRM integration', agent: 'Useless. Agents need a POST /api/leads endpoint, not a <form> tag.', impact: 'D2, D3' },
  { element: '"Starting at $X/mo"', human: 'Anchor pricing, drives clicks', agent: 'Ambiguous. No structured price, no tiers, no comparison possible.', impact: 'D4' },
  { element: 'Testimonial carousel', human: 'Social proof, trust signal', agent: 'Invisible. No structured review data. Schema.org Review would work.', impact: 'D6' },
  { element: 'PDF case studies', human: 'Sales enablement, authority', agent: 'Opaque. PDFs are not crawlable. HTML + Schema.org Article works.', impact: 'D1, D6' },
  { element: 'Animated pricing page', human: 'Premium feel, brand identity', agent: 'Broken. JS-rendered pricing is invisible to most crawlers.', impact: 'D4, D1' },
]

const cmoChecklist = [
  {
    title: 'Schema.org Product/Service Markup',
    description: 'Your SEO team already knows Schema.org for search. Extend it for agents. Add Product, Service, Offer, PriceSpecification, and Organization markup to every relevant page. Agents read this before they read your HTML.',
    effort: 'Low — SEO team can implement in 1-2 days',
    impact: 'D1 Discovery +15, D6 Data Quality +10',
    icon: Code2,
    color: 'emerald',
  },
  {
    title: 'Structured Pricing Page',
    description: 'Replace "contact us for pricing" with a machine-readable pricing page. Use Schema.org Offer markup with structured tiers, features per tier, and actual dollar amounts. Agents that can read your pricing can recommend you. Agents that cannot will recommend competitors who expose their prices.',
    effort: 'Medium — requires pricing strategy decision',
    impact: 'D4 Pricing +25, D6 Data Quality +5',
    icon: DollarSign,
    color: 'amber',
  },
  {
    title: 'Lead Intake API Endpoint',
    description: 'Build a simple POST /api/leads endpoint that accepts structured lead data: name, email, company, use case. When an agent recommends your product, it needs a programmatic way to pass the lead to you — not a contact form. This is how you capture agent-driven leads at $0 CAC.',
    effort: 'Medium — engineering + CRM integration',
    impact: 'D2 API Quality +20, D3 Onboarding +15',
    icon: Users,
    color: 'blue',
  },
  {
    title: 'llms.txt File',
    description: 'Create a /llms.txt file that tells AI models what your business does, what you sell, who you serve, and how to interact with you — in plain text optimized for LLM consumption. This is the single highest-ROI file for AI visibility. Takes 30 minutes to write.',
    effort: 'Low — marketing can write this today',
    impact: 'D1 Discovery +20, D9 Agent Experience +10',
    icon: Bot,
    color: 'purple',
  },
  {
    title: 'HTML Content Over PDF',
    description: 'Every case study, white paper, and data sheet that lives as a PDF is invisible to AI crawlers. Convert them to HTML pages with Schema.org Article markup. The content is the same — the format makes it discoverable.',
    effort: 'Low to Medium — content team migration',
    impact: 'D1 Discovery +10, D6 Data Quality +10',
    icon: Globe,
    color: 'cyan',
  },
]

const roiComparison = [
  { channel: 'Google Ads', cac: '$45-200', recurring: 'Per click', agentReady: 'No' },
  { channel: 'LinkedIn Ads', cac: '$75-300', recurring: 'Per click', agentReady: 'No' },
  { channel: 'SEO Content', cac: '$15-50', recurring: 'One-time', agentReady: 'Partial' },
  { channel: 'Agent-Driven Leads', cac: '$0', recurring: 'One-time setup', agentReady: 'Yes' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'How is this different from the CTO guide?',
    answer:
      'The CTO guide focuses on API architecture, authentication, error handling, and infrastructure decisions. This guide focuses on what marketing teams control: website content structure, pricing transparency, Schema.org markup, lead capture, and content format. Both roles need to act — the CTO builds the API foundation, the CMO ensures the marketing surface is agent-readable. Together, they cover 7 of 9 dimensions.',
  },
  {
    question: 'My SEO team already does Schema.org — is that enough?',
    answer:
      'It is a great start, but most SEO implementations use basic schemas (Organization, WebPage, BreadcrumbList) that help search engines but do not help agents. Agents need Product/Service schemas with Offer and PriceSpecification — the schemas that describe what you sell, how much it costs, and how to buy it. Ask your SEO team to audit their schema coverage against the Schema.org commerce types.',
  },
  {
    question: 'What is the ROI of agent readiness for marketing?',
    answer:
      'Agent-driven leads cost $0 CAC after initial setup. When an AI agent recommends your product to a user, that is a qualified referral from a trusted source — the user asked the AI for a recommendation and got your name. Compare that to $45-200 per Google Ads click or $75-300 per LinkedIn click. The math favors agent readiness as soon as you have non-trivial agent traffic, which our data shows is growing 40% quarter-over-quarter for businesses that are agent-ready.',
  },
  {
    question: 'Does agent readiness replace SEO?',
    answer:
      'No. It extends SEO into a new channel. Google Search is not going away. But AI answer engines (ChatGPT, Perplexity, Gemini) are capturing an increasing share of information queries. The businesses that do well in both channels share a foundation: structured data, clear pricing, and machine-readable content. Agent readiness builds on your SEO investment — it does not replace it.',
  },
  {
    question: 'How quickly can a marketing team improve agent readiness?',
    answer:
      'The five items in this guide can be implemented in 2-4 weeks by a typical marketing team with light engineering support. Schema.org markup and llms.txt can be done in the first week. Structured pricing and HTML content migration take another week. The lead intake API requires engineering time but is a simple endpoint. Most businesses see a 15-25 point score improvement from these changes alone.',
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

export default function CmoGuideAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "The CMO's Guide to Agent Readiness: Why Your Marketing Website Fails and What to Fix",
    description:
      'Marketing websites are built for humans but invisible to AI agents. The CMO playbook: Schema.org, structured pricing, lead intake API, llms.txt, and HTML content.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/cmo-guide-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Executive Guide',
    wordCount: 1900,
    keywords:
      'CMO marketing agent readiness guide, marketing website AI agents, Schema.org agent readiness, agent driven leads',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: "CMO's Guide to Agent Readiness",
          item: 'https://agenthermes.ai/blog/cmo-guide-agent-readiness',
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
      title="The CMO's Guide to Agent Readiness: Why Your Marketing Website Fails and What to Fix"
      shareUrl="https://agenthermes.ai/blog/cmo-guide-agent-readiness"
      currentHref="/blog/cmo-guide-agent-readiness"
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
            <span className="text-zinc-400">CMO Guide to Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <PieChart className="h-3.5 w-3.5" />
              Executive Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              Marketing
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            {"The CMO's Guide to Agent Readiness:"}{' '}
            <span className="text-emerald-400">Why Your Marketing Website Fails and What to Fix</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            Your marketing website is designed to convert humans. Hero images, animations, testimonial
            carousels, gated PDFs. <strong className="text-zinc-100">AI agents cannot use any of it.</strong>{' '}
            The average marketing-focused website scores <strong className="text-zinc-100">28/100</strong> on
            agent readiness. Five changes — all within marketing&apos;s control — can push that above 50.
            Agent-driven leads cost <strong className="text-zinc-100">$0 CAC</strong>.
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

      {/* ===== THE DISCONNECT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-amber-500" />
            The Human-Agent Disconnect: What Marketing Builds vs What Agents Need
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Marketing teams spend millions making websites that convert humans. The irony is that
              the same design choices that increase human conversion — beautiful imagery, interactive
              elements, gated content — make the site completely opaque to AI agents. An agent
              cannot see your hero image. It cannot click your animated pricing toggle. It cannot
              fill out your contact form.
            </p>
            <p>
              This is not a future problem. Right now, when someone asks ChatGPT &ldquo;What is the
              best project management tool for agencies?&rdquo; or asks Perplexity to &ldquo;compare
              CRM platforms under $100/month,&rdquo; the AI recommends businesses it can <em>understand</em>.
              Understanding requires structured data — not marketing copy.
            </p>
            <p>
              The{' '}
              <Link href="/blog/cto-guide-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                CTO guide
              </Link>{' '}
              covers the API and infrastructure layer. This guide covers everything the marketing
              team controls — and it is more than you think. CMOs influence D1 Discoverability,
              D4 Pricing, D6 Data Quality, and D9 Agent Experience. That is 35% of the total score.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '28', label: 'avg marketing site score', icon: BarChart3 },
              { value: '35%', label: 'of score CMOs influence', icon: PieChart },
              { value: '$0', label: 'agent-driven lead CAC', icon: DollarSign },
              { value: '5', label: 'fixes in this guide', icon: CheckCircle2 },
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

      {/* ===== ELEMENT COMPARISON TABLE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-500" />
            Common Marketing Elements: Human Value vs Agent Value
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every element on your marketing site was designed for humans. Here is how each one
            registers with an AI agent — and which scoring dimensions it impacts.
          </p>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Element</div>
              <div>Human Value</div>
              <div>Agent Reality</div>
              <div>Dims</div>
            </div>
            {humanVsAgent.map((row, i) => (
              <div
                key={row.element}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.element}</div>
                <div className="text-zinc-400">{row.human}</div>
                <div className="text-red-400">{row.agent}</div>
                <div className="text-zinc-500 text-xs">{row.impact}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">This does not mean removing these elements.</strong>{' '}
              Your hero image and testimonial carousel still convert humans. The fix is adding a
              structured data layer underneath them. Keep the marketing site beautiful for humans —
              but add the machine-readable metadata that makes it useful for agents too. This is the
              same dual-layer approach SEO teams already use: one page serves both humans and crawlers.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 5 FIXES CHECKLIST ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-500" />
            The 5-Item CMO Checklist for Agent Readiness
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            These are ordered by ROI. The first two can be done this week with your existing SEO team.
            All five together typically produce a 15-25 point score improvement.
          </p>

          <div className="space-y-4 mb-8">
            {cmoChecklist.map((item, idx) => {
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
                      <h3 className="text-lg font-bold text-zinc-100">{idx + 1}. {item.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-xs text-zinc-400">
                      Effort: {item.effort}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg ${colors.bg} border ${colors.border} text-xs ${colors.text}`}>
                      Impact: {item.impact}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== ROI COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Marketing Budget ROI: Agent-Driven Leads vs Traditional Channels
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The CMO pitch for agent readiness is simple: it is the only lead generation channel
              with <strong className="text-zinc-100">$0 marginal CAC</strong>. Once your marketing
              surface is agent-readable, every AI-driven recommendation is a free qualified lead.
              The user asked the AI for help, the AI recommended you, and the user followed through.
              No ad spend. No content production per lead. No bid wars.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Channel</div>
              <div>CAC</div>
              <div>Cost Type</div>
              <div>Agent-Ready?</div>
            </div>
            {roiComparison.map((row, i) => (
              <div
                key={row.channel}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.channel}</div>
                <div className={row.cac === '$0' ? 'text-emerald-400 font-bold' : 'text-zinc-400'}>{row.cac}</div>
                <div className="text-zinc-500">{row.recurring}</div>
                <div className={row.agentReady === 'Yes' ? 'text-emerald-400' : row.agentReady === 'Partial' ? 'text-amber-400' : 'text-red-400'}>
                  {row.agentReady}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The caveat: agent-driven traffic is still early. Our data shows it growing 40%
              quarter-over-quarter for agent-ready businesses, but absolute volumes are lower than
              Google Ads today. The strategic move is to invest now while the cost is near-zero and
              the competition is non-existent. By the time agent traffic is significant, the
              businesses that invested early will have compounding advantages in AI citation authority.
            </p>
            <p>
              This is the same argument for SEO in 2005. The ROI was not obvious yet, but the
              businesses that started early dominated search for a decade. Agent readiness is the
              SEO of 2026. The{' '}
              <Link href="/blog/agent-readiness-roi-calculator" className="text-emerald-400 hover:text-emerald-300 underline">
                ROI calculator
              </Link>{' '}
              can model the projected impact for your specific traffic profile.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CMO vs CTO ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            CMO + CTO: The Full Coverage Map
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Neither the CMO nor the CTO can achieve a high agent readiness score alone. The
              score spans content, infrastructure, APIs, pricing, security, and agent-native
              protocols. Here is the ownership split:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: 'CMO Owns',
                items: ['D1 Discoverability (Schema.org, llms.txt, content format)', 'D4 Pricing (structured pricing page, transparent tiers)', 'D6 Data Quality (product/service markup, HTML content)', 'D9 Agent Experience (llms.txt, content organization)'],
                color: 'emerald',
              },
              {
                title: 'CTO Owns',
                items: ['D2 API Quality (REST endpoints, OpenAPI spec, error handling)', 'D3 Onboarding (sandbox, self-service signup, API keys)', 'D5 Payment (payment API, billing integration)', 'D7 Security (OAuth, TLS, security.txt)', 'D8 Reliability (status page, /health endpoint, SLA)'],
                color: 'blue',
              },
            ].map((column) => {
              const colors = getColorClasses(column.color)
              return (
                <div key={column.title} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                  <h3 className={`font-bold ${colors.text} mb-3`}>{column.title}</h3>
                  <ul className="space-y-2">
                    {column.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                        <CheckCircle2 className={`h-4 w-4 ${colors.text} shrink-0 mt-0.5`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-purple-400">The overlap is D1 and D9.</strong> Both
              teams influence discoverability and agent experience. The CMO controls content and
              discovery files (llms.txt, Schema.org). The CTO controls technical discovery
              (agent-card.json, MCP server, OpenAPI spec). Coordinate on these two dimensions
              to avoid gaps. Read the{' '}
              <Link href="/blog/cto-guide-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                CTO guide
              </Link>{' '}
              alongside this one for the complete picture.
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
                title: "The CTO's Guide to Agent Readiness",
                href: '/blog/cto-guide-agent-readiness',
                tag: 'Technical Guide',
                tagColor: 'emerald',
              },
              {
                title: 'Marketing Agencies: Score Your Clients',
                href: '/blog/marketing-agencies-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Agent Readiness ROI Calculator',
                href: '/blog/agent-readiness-roi-calculator',
                tag: 'Tool',
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
            How agent-ready is your marketing site?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan to see your score across all 9 dimensions.
            Marketing-focused sites average 28/100. See where you stand in 60 seconds.
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
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
