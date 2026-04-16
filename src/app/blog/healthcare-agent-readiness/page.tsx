import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Globe,
  Heart,
  HelpCircle,
  Layers,
  Lock,
  Phone,
  Shield,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
  User,
  XCircle,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Agent Readiness in Healthcare: Why the Average Score Is 33 | AgentHermes',
  description:
    'Healthcare averages 33/100 on the Agent Readiness Score — the lowest of any major vertical. We break down why HIPAA, PDF menus, and phone-only booking make healthcare invisible to AI agents, and what agent-ready healthcare actually looks like.',
  openGraph: {
    title: 'Agent Readiness in Healthcare: Why the Average Score Is 33',
    description:
      'Healthcare averages 33/100 on the Agent Readiness Score — the lowest of any major vertical. Here is why, and what agent-ready healthcare looks like.',
    url: 'https://agenthermes.ai/blog/healthcare-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Healthcare Agent Readiness — AgentHermes Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agent Readiness in Healthcare: Why the Average Score Is 33',
    description:
      'Healthcare averages 33/100 on the Agent Readiness Score — the lowest of any major vertical.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/healthcare-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Healthcare Dimension Breakdown
// ---------------------------------------------------------------------------

const healthcareDimensions = [
  {
    id: 'D1',
    label: 'Discoverability',
    avgScore: 28,
    verdict: 'weak',
    icon: Globe,
    analysis:
      'Most healthcare providers have websites, but those websites are built for humans, not machines. Provider directories are often rendered in JavaScript-heavy frameworks that agents cannot parse. Specialties, insurance panels, and availability are locked behind search widgets that require human interaction. No healthcare provider in our dataset publishes agent-card.json, llms.txt, or structured provider data in a machine-readable format.',
  },
  {
    id: 'D2',
    label: 'API Quality',
    avgScore: 22,
    verdict: 'weak',
    icon: Zap,
    analysis:
      'This is healthcare\'s worst dimension. The vast majority of healthcare providers have no public API at all. EHR systems like Epic and Cerner have APIs, but they are gated behind institutional agreements and HIPAA BAAs that can take months to establish. When APIs exist, they often use FHIR (Fast Healthcare Interoperability Resources), which is technically structured but complex enough that most AI agents cannot navigate it without specialized training.',
  },
  {
    id: 'D3',
    label: 'Onboarding',
    avgScore: 18,
    verdict: 'critical',
    icon: User,
    analysis:
      'Healthcare onboarding is designed to be maximally human. New patient forms, insurance verification, identity confirmation, HIPAA consent signatures — every step requires a person. There is no "free tier" equivalent for a dental practice. You cannot test-drive a doctor visit. This makes healthcare fundamentally harder for agents to engage with, and it is the dimension where healthcare diverges most sharply from SaaS companies.',
  },
  {
    id: 'D4',
    label: 'Pricing Transparency',
    avgScore: 15,
    verdict: 'critical',
    icon: CreditCard,
    analysis:
      'Healthcare pricing is the most opaque of any industry. A routine office visit can cost anywhere from $50 to $500 depending on insurance, network status, procedure codes, and negotiated rates. The No Surprises Act requires hospitals to publish machine-readable pricing files, but compliance is inconsistent and the files are often hundreds of megabytes of CSV data that even specialized tools struggle to parse. For individual practices, pricing is almost never published. An agent comparison-shopping healthcare providers hits a wall immediately.',
  },
  {
    id: 'D5',
    label: 'Payment',
    avgScore: 30,
    verdict: 'partial',
    icon: CreditCard,
    analysis:
      'Payment in healthcare is uniquely complex due to the insurance layer. Copays, deductibles, prior authorizations, claims, and EOBs (Explanation of Benefits) create a payment experience that no agent can navigate end-to-end. Some providers offer patient portals with online bill pay, which helps. But the payment dimension for healthcare will remain structurally lower than other industries until insurance billing becomes more transparent and programmable.',
  },
  {
    id: 'D6',
    label: 'Data Quality',
    avgScore: 35,
    verdict: 'partial',
    icon: Layers,
    analysis:
      'Healthcare data quality is paradoxically high internally (structured clinical data in EHRs) and low externally (patient-facing information is scattered across PDFs, portal screens, and phone trees). Lab results, imaging reports, and clinical notes are richly structured inside systems like Epic — but exposing that data to patients or their agents requires navigating OAuth flows, consent management, and HIPAA-compliant data sharing that most providers have not built.',
  },
  {
    id: 'D7',
    label: 'Security',
    avgScore: 45,
    verdict: 'partial',
    icon: Shield,
    analysis:
      'Ironically, healthcare scores highest on Security — but for the wrong reason. HIPAA compliance creates a security posture that protects data well but also makes it inaccessible. The security dimension rewards proper TLS, authentication, and access controls, which healthcare providers generally have. But the same HIPAA controls that earn security points also block the API quality, onboarding, and data quality dimensions. Security without accessibility is a fortress with no door.',
  },
  {
    id: 'D8',
    label: 'Reliability',
    avgScore: 40,
    verdict: 'partial',
    icon: Target,
    analysis:
      'Healthcare systems are generally reliable — EHRs have high uptime, patient portals work consistently. But reliability in the agent readiness context measures whether an agent can depend on consistent, predictable interactions. When the primary interaction method is a phone call with variable hold times, the reliability dimension suffers. A provider whose scheduling system returns consistent API responses would score much higher than one whose "reliability" depends on a receptionist answering the phone.',
  },
  {
    id: 'D9',
    label: 'Agent Experience',
    avgScore: 20,
    verdict: 'weak',
    icon: Sparkles,
    analysis:
      'Agent Experience measures how easy it is for an agent to actually accomplish a task with your business after finding it. In healthcare, the answer is: nearly impossible. An agent trying to book a dental appointment, check specialist availability, or compare costs across providers will fail at almost every step. No SDKs, no code examples, no structured interaction patterns. Healthcare is still firmly in the "call our office" paradigm.',
  },
]

function getVerdictColor(verdict: string) {
  switch (verdict) {
    case 'excellent':
      return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
    case 'strong':
      return { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' }
    case 'good':
      return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' }
    case 'partial':
      return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' }
    case 'weak':
      return { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' }
    case 'critical':
      return { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' }
    default:
      return { text: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/20' }
  }
}

// ---------------------------------------------------------------------------
// What Agent-Ready Healthcare Looks Like
// ---------------------------------------------------------------------------

const agentReadyFeatures = [
  {
    title: 'Structured availability endpoints',
    description:
      'A simple JSON API that returns available appointment slots by provider, specialty, date, and insurance accepted. No scraping, no phone calls. An agent queries the endpoint and gets back a list of available times.',
    icon: Calendar,
    impact: 'D2 +20, D3 +15',
  },
  {
    title: 'HIPAA-compliant agent authentication',
    description:
      'OAuth2 flows that allow a patient to delegate scheduling and records access to their AI agent. The agent acts on behalf of the patient with scoped permissions — it can book appointments but cannot access clinical notes without explicit consent.',
    icon: Lock,
    impact: 'D7 +10, D9 +15',
  },
  {
    title: 'Machine-readable pricing with insurance context',
    description:
      'A pricing endpoint that accepts an insurance plan ID and returns estimated costs for common procedures. This does not require exact pricing — even a range (e.g., "$80-$150 for a routine office visit with BlueCross PPO") is infinitely more useful than no data.',
    icon: CreditCard,
    impact: 'D4 +25, D6 +10',
  },
  {
    title: 'Automated intake forms with structured data',
    description:
      'Instead of PDFs that patients print, fill out by hand, and scan back, offer structured digital forms with an API for pre-population. An agent that already has a patient\'s demographic and insurance information can complete intake in seconds.',
    icon: FileText,
    impact: 'D3 +20, D9 +10',
  },
  {
    title: 'Provider discovery via agent-card.json',
    description:
      'A machine-readable file listing the practice\'s specialties, accepted insurance, languages spoken, hours, and booking URL. This single file makes a healthcare provider visible to any AI agent helping a patient find a doctor.',
    icon: Globe,
    impact: 'D1 +15, D9 +5',
  },
]

// ---------------------------------------------------------------------------
// FAQ Data
// ---------------------------------------------------------------------------

const faqs = [
  {
    question: 'Why does healthcare score so much lower than other industries?',
    answer:
      'Three structural factors compound: (1) HIPAA creates legitimate privacy barriers that restrict API access and data sharing, (2) insurance-based pricing makes costs impossible to publish in simple formats, and (3) healthcare\'s business model is built around in-person, phone-mediated interactions that agents cannot navigate. The average healthcare score of 33 compares to SaaS at approximately 52 and developer tools at approximately 58. Healthcare is not just behind — it is in a different category of difficulty.',
  },
  {
    question: 'Does HIPAA prevent healthcare businesses from being agent-ready?',
    answer:
      'No. HIPAA regulates how protected health information (PHI) is stored, transmitted, and accessed — it does not prohibit APIs or machine-readable data. Appointment availability, pricing estimates, provider specialties, and office hours are not PHI. A healthcare provider can publish an agent-card.json, a scheduling API, and estimated pricing without any HIPAA concerns. For clinical data, HIPAA-compliant OAuth2 flows (like those in the SMART on FHIR standard) already exist. The barrier is adoption, not regulation.',
  },
  {
    question: 'What would a Platinum-tier healthcare provider look like?',
    answer:
      'A Platinum (90+) healthcare provider would have: an agent-card.json listing specialties, insurance, and hours; a real-time scheduling API; estimated pricing by procedure and insurance plan; HIPAA-compliant OAuth2 for patient-delegated agent access; structured intake forms with API pre-population; FHIR endpoints for clinical data; and an MCP server exposing booking, records, and billing as agent-callable tools. No healthcare provider is close to this today. We estimate the first Silver-tier healthcare providers will emerge in late 2026.',
  },
  {
    question: 'Which healthcare sub-sectors score highest?',
    answer:
      'Telehealth platforms score highest (averaging 38-42) because they are already digital-first. Companies like Teladoc, Amwell, and MDLive have APIs, structured scheduling, and online payment flows. After telehealth, dental practices that use modern scheduling platforms (like Zocdoc integration) score better than average. Traditional hospitals and specialist practices score lowest, averaging 25-30.',
  },
  {
    question: 'How can a healthcare provider start improving today?',
    answer:
      'Start with the non-PHI improvements that require no HIPAA considerations: (1) publish an agent-card.json listing your specialties, hours, and accepted insurance, (2) add llms.txt with links to your scheduling page and provider bios, (3) publish estimated pricing for your 10 most common procedures. These three steps can move a healthcare provider from Not Scored (below 40) to Bronze (40-59) in a single afternoon. Run a free scan at agenthermes.ai/audit to see where you stand.',
  },
  {
    question: 'What is the Agent Readiness Score?',
    answer:
      'The Agent Readiness Score is a 0-100 metric that measures how easily AI agents can discover, understand, and interact with a business. We scan across 9 weighted dimensions: Discoverability (12%), API Quality (15%), Onboarding (8%), Pricing Transparency (5%), Payment (8%), Data Quality (10%), Security (12%), Reliability (13%), and Agent Experience (10%), plus an Agent-Native Bonus (7%). Tiers: Platinum 90+, Gold 75+, Silver 60+, Bronze 40+, Not Scored below 40. We have scanned 500 businesses across every major vertical.',
  },
]

// ---------------------------------------------------------------------------
// TOC
// ---------------------------------------------------------------------------

const tocSections = [
  { id: 'the-problem', label: 'The Problem' },
  { id: 'by-the-numbers', label: 'By the Numbers' },
  { id: 'dimension-breakdown', label: 'Dimension Breakdown' },
  { id: 'why-healthcare-is-invisible', label: 'Why Healthcare Is Invisible' },
  { id: 'agent-ready-healthcare', label: 'Agent-Ready Healthcare' },
  { id: 'path-forward', label: 'The Path Forward' },
  { id: 'faq', label: 'FAQ' },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HealthcareAgentReadinessPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Agent Readiness in Healthcare: Why the Average Score Is 33',
    description:
      'Healthcare averages 33/100 on the Agent Readiness Score. A deep analysis of why HIPAA, pricing opacity, and phone-first workflows make healthcare invisible to AI agents.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/healthcare-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Industry Analysis',
    wordCount: 2000,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Healthcare Agent Readiness',
          item: 'https://agenthermes.ai/blog/healthcare-agent-readiness',
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
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            <span className="text-zinc-400">Healthcare</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
              <Heart className="h-3.5 w-3.5" />
              Healthcare
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <BarChart3 className="h-3.5 w-3.5" />
              Industry Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              Avg Score: 33/100
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Healthcare Agent Readiness:{' '}
            <span className="text-red-400">Why the Average Score Is 33</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-8">
            We scanned healthcare providers, hospital systems, telehealth platforms, and medical practices.
            The average Agent Readiness Score is <strong className="text-red-400">33 out of 100</strong> — well
            below the 40-point threshold that separates &ldquo;visible to agents&rdquo; from &ldquo;invisible.&rdquo;
            Healthcare is not just behind. It is structurally disconnected from the agent economy.
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
                  15 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TABLE OF CONTENTS (desktop sidebar) ===== */}
      <div className="hidden xl:block fixed right-[max(1rem,calc((100vw-64rem)/2-14rem))] top-28 w-52 z-20">
        <nav className="toc-sidebar">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-3 pl-3">On this page</div>
          {tocSections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="block">
              {section.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ===== THE PROBLEM ===== */}
      <section id="the-problem" className="pb-12 sm:pb-16 border-t border-zinc-800/50 scroll-mt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            The Problem: Healthcare Is Invisible to AI Agents
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Imagine you ask an AI agent to find you a dermatologist who accepts your insurance, is available
              next Tuesday afternoon, and costs less than $200 for an initial consultation. The agent needs to
              do four things: find dermatologists near you, check which ones accept your insurance, query their
              availability, and compare pricing.
            </p>
            <p>
              In the SaaS world, this kind of comparison shopping is straightforward. API endpoints return structured
              data, pricing is published, and availability is queryable. In healthcare, the agent hits a wall at
              every step. Provider directories are trapped in JavaScript-rendered search widgets. Insurance panels
              require calling the office. Availability is managed by a receptionist. Pricing is &ldquo;it depends.&rdquo;
            </p>
            <p>
              The result: healthcare averages <strong className="text-red-400">33/100</strong> on the Agent Readiness Score.
              The overall average across 500 businesses is 43. Healthcare is 10 points below even that low bar.
              E-commerce averages 28, marketing averages 19, but healthcare — an industry where agent-assisted
              navigation could save patients hours of phone calls and insurance verification — scores barely above
              the sectors where agent interaction matters least.
            </p>
          </div>
        </div>
      </section>

      {/* ===== BY THE NUMBERS ===== */}
      <section id="by-the-numbers" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-emerald-500" />
            By the Numbers
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-center">
              <div className="text-3xl font-bold text-red-400">33</div>
              <div className="text-xs text-zinc-500 mt-1">Healthcare Avg</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-zinc-400">43</div>
              <div className="text-xs text-zinc-500 mt-1">Overall Avg</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-blue-400">52</div>
              <div className="text-xs text-zinc-500 mt-1">SaaS Avg</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-center">
              <div className="text-3xl font-bold text-emerald-400">58</div>
              <div className="text-xs text-zinc-500 mt-1">Dev Tools Avg</div>
            </div>
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The gap between healthcare (33) and developer tools (58) is 25 points — nearly the entire width of
              the Bronze tier. Developer tools companies have APIs because they <em>are</em> APIs. Healthcare
              providers have patients because they <em>treat</em> patients. The business model, the regulatory
              environment, and the interaction paradigm are fundamentally different.
            </p>
            <p>
              But this gap is not destiny. It is infrastructure debt. Healthcare has spent decades building internal
              digital infrastructure — EHR systems, HL7 interfaces, FHIR standards — without building the external
              agent-facing layer. The data exists inside these systems. It is just not accessible to the agents that
              patients are increasingly relying on to navigate their healthcare.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">Industry comparison:</strong> Healthcare (33) scores below
              e-commerce (28) only because e-commerce has even less structured data on average. But healthcare
              has far more to gain: appointment scheduling, insurance verification, and cost comparison are
              high-value agent tasks that patients desperately want automated. The first healthcare providers to
              become agent-ready will capture disproportionate patient volume from AI-assisted search.
            </p>
          </div>
        </div>
      </section>

      {/* ===== DIMENSION BREAKDOWN ===== */}
      <section id="dimension-breakdown" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <Layers className="h-6 w-6 text-emerald-500" />
            Healthcare: 9-Dimension Breakdown
          </h2>

          <div className="space-y-6">
            {healthcareDimensions.map((dim) => {
              const colors = getVerdictColor(dim.verdict)
              return (
                <div
                  key={dim.id}
                  className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/50">
                        <dim.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-100">
                          {dim.id}: {dim.label}
                        </h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-zinc-100">{dim.avgScore}</div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} border ${colors.border} ${colors.text}`}
                      >
                        {dim.verdict}
                      </span>
                    </div>
                  </div>
                  {/* Score bar */}
                  <div className="w-full h-2 rounded-full bg-zinc-800 mb-4">
                    <div
                      className={`h-2 rounded-full bar-animate ${
                        dim.avgScore >= 75
                          ? 'bg-emerald-500'
                          : dim.avgScore >= 60
                          ? 'bg-blue-500'
                          : dim.avgScore >= 45
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${dim.avgScore}%` }}
                    />
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed" style={{ lineHeight: '1.75' }}>
                    {dim.analysis}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY HEALTHCARE IS INVISIBLE ===== */}
      <section id="why-healthcare-is-invisible" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <XCircle className="h-6 w-6 text-red-500" />
            Why Healthcare Is Invisible to Agents
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Healthcare&apos;s low score is not random. It stems from five structural barriers that compound
              against each other. Understanding these barriers is the first step to addressing them.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                title: 'PDF-heavy information architecture',
                description: 'New patient forms, consent documents, insurance forms, provider directories — all trapped in PDFs. An AI agent cannot fill out a PDF form, and it cannot extract structured data from one reliably. Every PDF is a dead end for agent interaction.',
                icon: FileText,
              },
              {
                title: 'Phone-only booking and scheduling',
                description: 'The majority of healthcare scheduling still happens by phone. "Call our office at (555) 123-4567 to schedule." This sentence is on thousands of healthcare websites. It is the single biggest reason healthcare scores 18 on Onboarding. An agent cannot call a phone number.',
                icon: Phone,
              },
              {
                title: 'Insurance-gated pricing',
                description: 'Healthcare pricing depends on your insurance plan, your deductible status, the specific CPT codes billed, and negotiated rates between the provider and insurer. Publishing a simple price list is genuinely harder in healthcare than in any other industry. But "harder" does not mean "impossible" — estimated ranges are better than silence.',
                icon: CreditCard,
              },
              {
                title: 'HIPAA as a catch-all blocker',
                description: 'HIPAA protects patient health information, and rightly so. But it has become a catch-all excuse for not building digital infrastructure. Appointment availability is not PHI. Provider specialties are not PHI. Estimated pricing is not PHI. Many of the improvements that would raise healthcare scores require zero HIPAA considerations.',
                icon: Shield,
              },
              {
                title: 'Legacy EHR systems without external APIs',
                description: 'Epic, Cerner, Allscripts, and other EHR systems hold rich, structured clinical data. But exposing that data through patient-facing or agent-facing APIs requires significant integration work. Most healthcare providers run on whichever EHR their system chose years ago and have limited ability to customize its external interfaces.',
                icon: Activity,
              },
            ].map((barrier, i) => (
              <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 shrink-0">
                    <barrier.icon className="h-4 w-4 text-red-400" />
                  </div>
                  <h3 className="font-bold text-zinc-100 text-sm">{barrier.title}</h3>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{barrier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY HEALTHCARE LOOKS LIKE ===== */}
      <section id="agent-ready-healthcare" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <Stethoscope className="h-6 w-6 text-emerald-500" />
            What Agent-Ready Healthcare Looks Like
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Agent-ready healthcare is not science fiction. It is a combination of existing standards (FHIR, SMART on FHIR),
              existing patterns (REST APIs, OAuth2), and new agent-specific protocols (agent-card.json, MCP) applied to
              healthcare workflows. Here are the five capabilities that would move a healthcare provider from Not Scored
              to Silver.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {agentReadyFeatures.map((feature, i) => (
              <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                      <feature.icon className="h-4 w-4 text-emerald-400" />
                    </div>
                    <h3 className="font-bold text-zinc-100 text-sm">{feature.title}</h3>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    {feature.impact}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="callout-box">
            <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2 !mt-0">
              <CheckCircle2 className="h-5 w-5" />
              The Telehealth Advantage
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Telehealth platforms are already halfway there. They have digital scheduling, online payment, and
              structured provider data. The gap is in agent-specific protocols: agent-card.json for discovery,
              structured pricing endpoints, and MCP servers for tool-based interaction. A telehealth platform that
              adds these three things could be the first healthcare provider to reach Silver tier.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PATH FORWARD ===== */}
      <section id="path-forward" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-emerald-500" />
            The Path Forward
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Healthcare will not reach agent readiness parity with SaaS overnight. The regulatory environment,
              the insurance complexity, and the legacy infrastructure create real barriers. But the path forward
              is clear, and it starts with changes that require no regulatory approval and no EHR modifications.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="font-bold text-emerald-400 mb-3">Today (no HIPAA concerns)</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  Publish agent-card.json with specialties, hours, insurance accepted, languages
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  Add llms.txt linking to scheduling page, provider bios, and services
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  Publish estimated pricing for your 10 most common procedures
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  Replace PDF forms with structured digital intake forms
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <h3 className="font-bold text-blue-400 mb-3">Next 6 months (requires engineering)</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  Build a scheduling API with real-time availability
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  Implement SMART on FHIR for patient-delegated agent access
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  Add insurance verification API (or integrate with existing clearinghouse)
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
              <h3 className="font-bold text-purple-400 mb-3">12+ months (agent-native)</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                  Publish MCP server with scheduling, availability, and pricing tools
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                  Enable full agent-mediated patient journey: discover, evaluate, book, intake, pay
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                  Implement A2A protocol for agent-to-provider communication
                </li>
              </ul>
            </div>
          </div>

          <p className="text-zinc-400 leading-relaxed text-sm">
            For healthcare-specific remediation tools and templates, visit our{' '}
            <Link href="/for/healthcare" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
              healthcare vertical page
            </Link>. For the step-by-step improvement guide applicable to any industry, see{' '}
            <Link href="/blog/improve-agent-readiness-score" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
              How to Improve Your Agent Readiness Score
            </Link>.
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="pb-12 sm:pb-16 scroll-mt-20">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-emerald-500" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                <h3 className="font-bold text-zinc-100 mb-3 text-base">{faq.question}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed" style={{ lineHeight: '1.75' }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RELATED READING ===== */}
      <section className="pb-12 sm:pb-16">
        <hr className="section-divider mb-12" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight mb-6 text-zinc-300">Related Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Agent-Ready Restaurants: From PDF Menus to AI Agents',
                href: '/blog/agent-ready-restaurants',
                tag: 'Industry Analysis',
                tagColor: 'amber',
              },
              {
                title: 'How to Improve Your Agent Readiness Score',
                href: '/blog/improve-agent-readiness-score',
                tag: 'How-To Guide',
                tagColor: 'emerald',
              },
              {
                title: 'What Is Agent Readiness? The Complete Guide',
                href: '/blog/what-is-agent-readiness',
                tag: 'Complete Guide',
                tagColor: 'emerald',
              },
            ].map((related) => (
              <Link
                key={related.href}
                href={related.href}
                className="group p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 article-card-hover"
              >
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3 ${
                    related.tagColor === 'emerald'
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : related.tagColor === 'amber'
                      ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                      : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                  }`}
                >
                  {related.tag}
                </span>
                <h3 className="text-sm font-semibold text-zinc-300 group-hover:text-emerald-400 transition-colors leading-snug">
                  {related.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHARE BUTTONS ===== */}
      <section className="pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <hr className="section-divider mb-8" />
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-zinc-500 font-medium">Share this analysis:</span>
            <a
              href="https://twitter.com/intent/tweet?text=Healthcare%20averages%2033%2F100%20on%20the%20Agent%20Readiness%20Score.%20Here%27s%20why%20%E2%80%94%20and%20what%20agent-ready%20healthcare%20looks%20like.&url=https://agenthermes.ai/blog/healthcare-agent-readiness"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https://agenthermes.ai/blog/healthcare-agent-readiness"
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-20 sm:pb-28">
        <hr className="section-divider mb-16" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Scan your healthcare business
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See where your healthcare practice or platform scores across all 9 dimensions.
            The scan is free and takes 10 seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Score My Business
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/for/healthcare"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold transition-colors border border-zinc-700"
            >
              Healthcare Solutions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
