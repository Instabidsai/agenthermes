import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  FileJson,
  Heart,
  HelpCircle,
  Phone,
  Server,
  Shield,
  Stethoscope,
  Smartphone,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Dental and Veterinary Agent Readiness: Why Appointment-Based Businesses Are Missing the Agent Wave | AgentHermes',
  description:
    'Dentists and veterinarians rely on phone-only booking, manual insurance verification, and zero structured APIs. The first practice with an MCP server gets booked by every AI personal assistant managing family schedules.',
  keywords: [
    'dental agent readiness',
    'veterinary agent readiness',
    'dental practice AI agents',
    'veterinary clinic AI',
    'appointment booking API',
    'OpenDental API',
    'Dentrix API',
    'dental MCP server',
    'vet clinic agent economy',
    'healthcare appointment AI',
  ],
  openGraph: {
    title: 'Dental and Veterinary Agent Readiness: Why Appointment-Based Businesses Are Missing the Agent Wave',
    description:
      'Dentists and vets average under 10 on the Agent Readiness Score. Phone-only booking, no pricing APIs, manual insurance. The first practice with an MCP server captures every AI-driven appointment.',
    url: 'https://agenthermes.ai/blog/dental-veterinary-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dental and Veterinary Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental and Veterinary Agent Readiness',
    description:
      'Appointment-based businesses score near zero for AI agents. Phone-only booking, no APIs, no structured data. Here is what agent-ready looks like for dentists and vets.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/dental-veterinary-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const currentState = [
  {
    aspect: 'Appointment Booking',
    reality: 'Phone call during business hours, 3-minute hold, human receptionist',
    agentReady: 'check_availability({ date, service_type }) returns open slots in JSON',
    icon: Phone,
    color: 'red',
  },
  {
    aspect: 'Insurance Verification',
    reality: 'Fax or phone to carrier, 24-48 hour turnaround, manual data entry',
    agentReady: 'verify_insurance({ carrier, member_id, procedure_code }) returns eligibility instantly',
    icon: Shield,
    color: 'red',
  },
  {
    aspect: 'Pricing Information',
    reality: '"We\'ll let you know after insurance" or no pricing at all',
    agentReady: 'get_pricing({ procedure_code, insurance_plan? }) returns cash price and estimated copay',
    icon: FileJson,
    color: 'red',
  },
  {
    aspect: 'Patient Intake',
    reality: 'PDF form emailed or clipboard in waiting room, re-entered by staff',
    agentReady: 'submit_intake({ patient_info, medical_history, consent }) pre-populates chart',
    icon: Heart,
    color: 'red',
  },
]

const practiceManagementSystems = [
  {
    name: 'OpenDental',
    marketShare: '~18% of US dental',
    apiStatus: 'Internal REST API exists, not agent-facing. Requires on-prem server access.',
    score: 'Theoretical 35 — if exposed. Currently 0 for practices.',
  },
  {
    name: 'Dentrix (Henry Schein)',
    marketShare: '~30% of US dental',
    apiStatus: 'SOAP/XML API for integrators only. Enterprise NDA required. No public docs.',
    score: 'Theoretical 20 — legacy protocol kills D2 and D6.',
  },
  {
    name: 'Eaglesoft (Patterson)',
    marketShare: '~15% of US dental',
    apiStatus: 'No public API. Desktop-only software. Data locked in local database.',
    score: '0 — completely dark.',
  },
  {
    name: 'eVetPractice / Cornerstone',
    marketShare: '~25% of US vet',
    apiStatus: 'Cloud-based but API access restricted to approved partners only.',
    score: 'Theoretical 25 — if opened. Currently 0 for clinics.',
  },
]

const mcpTools = [
  { tool: 'check_availability', description: 'Returns open appointment slots by date, provider, and service type', priority: 'Critical' },
  { tool: 'book_appointment', description: 'Books a confirmed slot with patient info and service details', priority: 'Critical' },
  { tool: 'get_services', description: 'Lists all procedures/services with codes, descriptions, and duration', priority: 'High' },
  { tool: 'get_pricing', description: 'Returns cash price and insurance estimate per procedure code', priority: 'High' },
  { tool: 'verify_insurance', description: 'Checks eligibility and estimated coverage for a given carrier and plan', priority: 'High' },
  { tool: 'submit_intake', description: 'Accepts structured patient intake data before the appointment', priority: 'Medium' },
  { tool: 'get_providers', description: 'Lists practitioners with specialties, credentials, and availability', priority: 'Medium' },
  { tool: 'cancel_appointment', description: 'Cancels or reschedules with policy-aware refund/fee logic', priority: 'Medium' },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do dental and vet practices score so low on agent readiness?',
    answer:
      'Almost all patient interaction happens via phone call. There are no public APIs, no structured pricing, no online insurance verification, and no machine-readable appointment data. The practice management software (Dentrix, OpenDental, Eaglesoft) has internal APIs but none are exposed to external agents. The average dental practice scores under 10 on the Agent Readiness Score.',
  },
  {
    question: 'What does an agent-ready dental practice look like?',
    answer:
      'An agent-ready practice has an MCP server that exposes tools for checking availability, booking appointments, verifying insurance eligibility, and retrieving pricing. When someone tells their AI assistant "book me a teeth cleaning next Tuesday afternoon," the agent calls check_availability, finds an open slot, and calls book_appointment — all without a phone call.',
  },
  {
    question: 'Can OpenDental or Dentrix be made agent-ready?',
    answer:
      'Yes, with a middleware layer. OpenDental already has a REST API that runs on the practice server. A hosted MCP proxy could connect to OpenDental\'s API, translate it to MCP tools, and expose it securely to agents. Dentrix is harder because it uses SOAP/XML and requires partner agreements. AgentHermes can generate this middleware layer without the practice writing code.',
  },
  {
    question: 'Will patients trust AI agents to book their dental or vet appointments?',
    answer:
      'Patients already trust AI for scheduling in other contexts — Siri reminders, Google Calendar suggestions, automated pharmacy refills. Dental and vet booking is simpler than most: pick a date, pick a service, confirm insurance. The practice retains full control over which slots are available and all clinical decisions remain with the provider.',
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

export default function DentalVeterinaryAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Dental and Veterinary Agent Readiness: Why Appointment-Based Businesses Are Missing the Agent Wave',
    description:
      'Dentists and veterinarians rely on phone-only booking, manual insurance verification, and zero structured APIs. The first practice with an MCP server gets booked by every AI personal assistant.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/dental-veterinary-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'dental veterinary agent readiness, dental practice AI, vet clinic agent economy, appointment booking API, MCP server healthcare',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Dental and Veterinary Agent Readiness',
          item: 'https://agenthermes.ai/blog/dental-veterinary-agent-readiness',
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
      title="Dental and Veterinary Agent Readiness: Why Appointment-Based Businesses Are Missing the Agent Wave"
      shareUrl="https://agenthermes.ai/blog/dental-veterinary-agent-readiness"
      currentHref="/blog/dental-veterinary-agent-readiness"
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
            <span className="text-zinc-400">Dental &amp; Veterinary Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Stethoscope className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              Score: Under 10
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Dental and Veterinary Agent Readiness:{' '}
            <span className="text-emerald-400">Why Appointment-Based Businesses Are Missing the Agent Wave</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            There are over <strong className="text-zinc-100">200,000 dental practices</strong> and{' '}
            <strong className="text-zinc-100">32,000 veterinary clinics</strong> in the United States.
            Nearly all of them are invisible to AI agents. Their appointment books are locked behind phone
            calls, their pricing is hidden, and their insurance verification is manual. The first practice
            with an MCP server gets booked by every AI personal assistant managing family schedules.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            The Phone-Only Problem
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Dental and veterinary practices are the quintessential appointment-based businesses. Their
              entire revenue model depends on filling time slots with patients. Yet the primary booking
              mechanism in 2026 is still a phone call to a receptionist during business hours.
            </p>
            <p>
              This is not just inconvenient for humans — it is a complete barrier for AI agents. When someone
              asks their AI assistant to{' '}
              <em className="text-zinc-200">&ldquo;book a teeth cleaning next week&rdquo;</em> or{' '}
              <em className="text-zinc-200">&ldquo;find a vet that can see my dog tomorrow&rdquo;</em>,
              the agent hits a wall. There is no API to query, no structured data to parse, no endpoint to
              call. The agent can only respond: &ldquo;Here is the phone number.&rdquo;
            </p>
            <p>
              That response sends the patient to the first practice that the agent <em>can</em> book
              directly. Today that is nobody. Tomorrow it is whoever moves first.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '200K+', label: 'US dental practices', icon: Stethoscope },
              { value: '32K+', label: 'US vet clinics', icon: Heart },
              { value: '<10', label: 'avg agent readiness score', icon: TrendingUp },
              { value: '0', label: 'with MCP servers', icon: Server },
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

      {/* ===== CURRENT STATE VS AGENT-READY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Current State vs Agent-Ready: Four Critical Workflows
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Every core workflow in a dental or vet practice is phone-first and human-dependent.
            Here is what each looks like today vs what an agent-ready version would expose.
          </p>

          <div className="space-y-4 mb-8">
            {currentState.map((item) => (
              <div
                key={item.aspect}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                    <item.icon className="h-5 w-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100">{item.aspect}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                    <p className="text-xs font-medium text-red-400 mb-1">Today</p>
                    <p className="text-sm text-zinc-400">{item.reality}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-xs font-medium text-emerald-400 mb-1">Agent-Ready</p>
                    <p className="text-sm text-zinc-400">
                      <code className="text-emerald-400 text-xs">{item.agentReady}</code>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRACTICE MANAGEMENT SYSTEMS ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-blue-500" />
            Practice Management Software: APIs Exist, But Not for Agents
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The data agents need already exists inside practice management systems. OpenDental has a REST
              API. Dentrix has a SOAP interface. The problem is that none of these are agent-facing. They
              are designed for internal integrations between software vendors, not for external AI agents
              discovering and booking appointments.
            </p>
            <p>
              This is the same pattern we see across{' '}
              <Link href="/blog/healthcare-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                healthcare
              </Link>{' '}
              — EHR systems have data, but it is locked behind partner agreements, on-prem installations,
              and legacy protocols that agents cannot speak.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>System</div>
              <div>Market Share</div>
              <div>API Status</div>
              <div>Potential Score</div>
            </div>
            {practiceManagementSystems.map((pms, i) => (
              <div
                key={pms.name}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{pms.name}</div>
                <div className="text-zinc-500">{pms.marketShare}</div>
                <div className="text-zinc-400">{pms.apiStatus}</div>
                <div className="text-amber-400">{pms.score}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The middleware opportunity:</strong> A hosted MCP proxy that
              connects to OpenDental or Dentrix on the backend and exposes agent-callable tools on the frontend
              would make any practice using those systems instantly agent-ready. The practice changes nothing
              about their workflow — they just gain a new patient acquisition channel.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AN MCP SERVER LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-emerald-500" />
            The Dental/Vet MCP Server: Eight Tools That Change Everything
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An MCP server for a dental or veterinary practice needs exactly eight tools to capture
            agent-driven appointments. Here is the full tool manifest.
          </p>

          <div className="space-y-3 mb-8">
            {mcpTools.map((tool) => (
              <div
                key={tool.tool}
                className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <code className="text-emerald-400 text-sm font-bold">{tool.tool}</code>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      tool.priority === 'Critical'
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                        : tool.priority === 'High'
                        ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                        : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                    }`}>
                      {tool.priority}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              With these eight tools, an AI personal assistant can handle the complete patient journey:
              discover the practice, check availability, verify insurance, understand pricing, book the
              appointment, and submit intake forms — all before the patient walks through the door.
            </p>
            <p>
              Compare this to the current experience: 3-minute phone hold, manual calendar check, callback
              for insurance verification, PDF intake form in the waiting room. The agent-ready practice
              converts the same patient in 10 seconds.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE FIRST-MOVER ADVANTAGE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            First-Mover Advantage: One Practice Per Metro
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              In the agent economy, there is a compounding first-mover advantage that is even stronger than
              SEO. When an AI agent searches for a dentist in Austin, Texas, it queries available MCP servers,
              agent cards, and structured registries. If exactly one practice has an MCP server, that practice
              gets 100% of agent-driven bookings in the metro. Not 50%. Not some. All of them.
            </p>
            <p>
              This is the same dynamic described in our{' '}
              <Link href="/blog/local-business-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                local business agent readiness
              </Link>{' '}
              analysis. The businesses that become agent-ready first in their local market capture a new
              channel before competitors even know it exists. For appointment-based businesses like dentists
              and vets, the stakes are higher because every booking is direct revenue.
            </p>
            <p>
              Consider the math: a dental practice averaging $250 per patient visit that captures even 5 new
              agent-booked patients per week adds $65,000 in annual revenue. That is the value of being the
              one practice an AI agent can actually book.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'Zero competition today',
                detail: 'Out of 200,000+ dental practices, zero have MCP servers. The first one in any metro area captures 100% of agent referrals.',
              },
              {
                title: 'Compound discovery',
                detail: 'Every successful agent booking strengthens the practice in agent registries. More bookings lead to more referrals — the opposite of diminishing returns.',
              },
              {
                title: 'Family scheduling',
                detail: 'AI personal assistants will manage family calendars. One agent booking a family of four for cleanings is 4x the revenue of a single phone call.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
              >
                <h3 className="font-bold text-zinc-100 mb-2 text-sm">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.detail}</p>
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
                title: 'Healthcare Agent Readiness: Why Hospitals and Clinics Score Under 25',
                href: '/blog/healthcare-agent-readiness',
                tag: 'Vertical Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Local Business Agent Readiness: The $6.2B Infrastructure Gap',
                href: '/blog/local-business-agent-readiness',
                tag: 'Market Analysis',
                tagColor: 'amber',
              },
              {
                title: 'Check Your Agent Readiness Score',
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
            Is your practice invisible to AI agents?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan on your practice website. See your score across all 9
            dimensions and find out exactly what is missing.
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
              Connect My Practice
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
