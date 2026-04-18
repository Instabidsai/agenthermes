import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  Globe,
  Heart,
  HelpCircle,
  Layers,
  Lock,
  Phone,
  Search,
  Shield,
  Sparkles,
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
  title:
    'Therapy and Counseling Agent Readiness: Why Mental Health Providers Are Dark to AI Wellness Agents | AgentHermes',
  description:
    'The $280B US mental health market is invisible to AI agents. Therapist directories exist but individual practices have phone-only intake, no availability API, and manual insurance verification. Here is what agent-ready therapy looks like.',
  keywords: [
    'therapy counseling mental health agent readiness',
    'therapist AI agent',
    'mental health agent readiness',
    'therapy booking AI',
    'counseling agent readiness score',
    'HIPAA agent readiness',
    'therapy MCP server',
    'mental health AI wellness',
    'BetterHelp agent readiness',
    'Psychology Today agent readiness',
  ],
  openGraph: {
    title:
      'Therapy and Counseling Agent Readiness: Why Mental Health Providers Are Dark to AI Wellness Agents',
    description:
      '$280B market, zero agent infrastructure. Individual therapy practices score 2-8 on Agent Readiness. AI wellness agents cannot match patients to therapists.',
    url: 'https://agenthermes.ai/blog/therapy-counseling-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Therapy and Counseling Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Therapy and Counseling Agent Readiness: Why Mental Health Providers Are Dark to AI Wellness Agents',
    description:
      '$280B mental health market is invisible to AI wellness agents. Phone-only intake, no APIs, manual insurance. Here is how to fix it.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical:
      'https://agenthermes.ai/blog/therapy-counseling-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const currentState = [
  {
    problem: 'Phone-only intake',
    detail:
      'New patient inquiries require a phone call. Most therapists do not answer during sessions, creating 24-48 hour callback loops. AI wellness agents cannot initiate intake on behalf of a user.',
    icon: Phone,
    color: 'red',
  },
  {
    problem: 'No availability API',
    detail:
      'Therapists use scheduling tools (SimplePractice, TherapyNotes, Jane App) but none expose public availability endpoints. An agent cannot check open slots without calling the office.',
    icon: Calendar,
    color: 'red',
  },
  {
    problem: 'Manual insurance verification',
    detail:
      'Does this therapist accept BlueCross PPO? The answer is buried in a PDF, a phone tree, or not listed at all. Agents need a structured endpoint: accepted_insurances() returning a typed list.',
    icon: Shield,
    color: 'red',
  },
  {
    problem: 'Specialization is unstructured',
    detail:
      'Therapists list specializations as free-text paragraphs: "I work with anxiety, depression, relationship issues, and life transitions." Agents need structured taxonomy, not marketing copy.',
    icon: Layers,
    color: 'amber',
  },
]

const agentReadyFeatures = [
  {
    tool: 'check_availability()',
    description:
      'Returns open appointment slots without exposing PHI. Input: date range, session type (individual, couples, family). Output: available time slots. No patient data touches this endpoint.',
    hipaaOk: true,
  },
  {
    tool: 'get_specializations()',
    description:
      'Structured taxonomy of what this therapist treats. Returns coded specializations (anxiety, PTSD, couples, adolescent, grief) with experience level and modality (CBT, EMDR, psychodynamic).',
    hipaaOk: true,
  },
  {
    tool: 'check_insurance()',
    description:
      'Input: insurance provider and plan type. Output: in-network boolean, estimated copay range, sliding scale availability. Zero PHI required.',
    hipaaOk: true,
  },
  {
    tool: 'submit_intake_request()',
    description:
      'Accepts name, contact info, preferred times, and brief reason for seeking therapy. This is the equivalent of a contact form, not a medical record. The therapist reviews and responds.',
    hipaaOk: true,
  },
  {
    tool: 'get_therapist_profile()',
    description:
      'Returns credentials (LPC, LCSW, PhD), years of experience, accepted age groups, session formats (in-person, telehealth, hybrid), languages, and a brief bio.',
    hipaaOk: true,
  },
]

const directoryComparison = [
  {
    platform: 'Psychology Today',
    hasApi: false,
    agentScore: '~12',
    notes: 'Directory with filters but no public API. Agents would need to scrape, which is unreliable and against ToS.',
  },
  {
    platform: 'BetterHelp',
    hasApi: false,
    agentScore: '~18',
    notes: 'Matching algorithm exists but is proprietary. No external agent can query it. Self-contained walled garden.',
  },
  {
    platform: 'Talkspace',
    hasApi: false,
    agentScore: '~15',
    notes: 'Similar to BetterHelp. Internal matching only. No MCP, no agent card, no structured discovery.',
  },
  {
    platform: 'Individual Practice',
    hasApi: false,
    agentScore: '2-8',
    notes: 'Website with bio and phone number. Sometimes a contact form. No structured data whatsoever.',
  },
]

const faqs = [
  {
    question: 'Does agent readiness for therapy violate HIPAA?',
    answer:
      'No. Agent-ready endpoints expose practice information, not patient information. Availability slots, specialization lists, insurance acceptance, and intake form submission involve zero PHI. HIPAA protects patient health records, not whether a therapist has an opening on Tuesday at 3pm.',
  },
  {
    question: 'What about patient privacy during intake?',
    answer:
      'An agent-ready intake endpoint collects the same information as a contact form: name, phone number, preferred times, and a brief description of what the patient is seeking help with. This is not a medical record. The therapist reviews the request and decides whether to proceed, just like they do with phone inquiries today.',
  },
  {
    question: 'Which therapy scheduling platforms are closest to agent-ready?',
    answer:
      'SimplePractice and Jane App both have APIs, but they are designed for internal practice management, not external agent consumption. The gap is exposing a subset of that data (availability, specializations, insurance) through a public agent-facing endpoint. The scheduling infrastructure exists, it just is not agent-accessible.',
  },
  {
    question: 'What score would an agent-ready therapy practice get?',
    answer:
      'A practice with availability checking, specialization catalog, insurance endpoint, and intake submission would score 55-65 on Agent Readiness, reaching Silver tier. Adding an MCP server with those tools and an agent-card.json would push into Gold territory (70+). Most practices today score 2-8.',
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

export default function TherapyCounselingAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Therapy and Counseling Agent Readiness: Why Mental Health Providers Are Dark to AI Wellness Agents',
    description:
      'The $280B US mental health market is invisible to AI agents. Individual therapy practices score 2-8 on Agent Readiness. Here is what agent-ready therapy infrastructure looks like.',
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
      'https://agenthermes.ai/blog/therapy-counseling-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1800,
    keywords:
      'therapy counseling mental health agent readiness, therapist AI agent, HIPAA agent readiness, mental health MCP server',
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
      title="Therapy and Counseling Agent Readiness: Why Mental Health Providers Are Dark to AI Wellness Agents"
      shareUrl="https://agenthermes.ai/blog/therapy-counseling-agent-readiness"
      currentHref="/blog/therapy-counseling-agent-readiness"
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
              <span className="text-zinc-400">Therapy and Counseling Agent Readiness</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                <Heart className="h-3.5 w-3.5" />
                Vertical Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                $280B Market
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              Therapy and Counseling Agent Readiness:{' '}
              <span className="text-emerald-400">
                Why Mental Health Providers Are Dark to AI Wellness Agents
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
              The US mental health market is worth <strong className="text-zinc-100">$280 billion</strong>.
              Therapist directories like Psychology Today and platforms like BetterHelp exist, but individual
              practices remain completely invisible to AI agents. Phone-only intake, no availability APIs,
              manual insurance verification. Privacy concerns are real but do not prevent structured APIs.
              The first practice with an MCP server captures every AI health assistant&apos;s referrals.
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
                    12 min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== THE $280B BLIND SPOT ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              The $280 Billion Blind Spot
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Mental health is one of the largest and fastest-growing sectors in US healthcare. Over
                60 million Americans received mental health treatment in 2025. Demand is surging, driven
                by destigmatization, telehealth expansion, and employer-sponsored wellness programs.
                Waitlists at individual practices stretch 4-12 weeks.
              </p>
              <p>
                Yet from an AI agent&apos;s perspective, the entire sector is dark. When a user asks an
                AI wellness agent to &ldquo;find me a therapist who specializes in anxiety, accepts Aetna,
                and has openings this week,&rdquo; the agent has nothing to query. No API. No structured
                data. No MCP server. The agent falls back to suggesting the user browse Psychology Today
                manually or call around. That is not agent-assisted wellness. That is a search engine
                with extra steps.
              </p>
              <p>
                The irony is that the data exists. Therapists track their specializations, insurance panels,
                and availability in practice management software every day. The gap is not information
                scarcity. It is <strong className="text-zinc-100">information accessibility</strong>. None
                of that data is exposed in a format that AI agents can consume.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '$280B', label: 'US mental health market', icon: TrendingUp },
                { value: '60M+', label: 'Americans in treatment', icon: User },
                { value: '2-8', label: 'Avg Agent Readiness Score', icon: BarChart3 },
                { value: '0', label: 'Practices with MCP servers', icon: XCircle },
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

        {/* ===== CURRENT STATE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-500" />
              Why Therapy Practices Score 2-8 on Agent Readiness
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              We scanned dozens of individual therapy practice websites. The pattern is consistent:
              a bio page, a contact form or phone number, and sometimes a Psychology Today embed.
              Here is what agents encounter when they try to interact.
            </p>

            <div className="space-y-4 mb-8">
              {currentState.map((item) => {
                const colors = getColorClasses(item.color)
                return (
                  <div
                    key={item.problem}
                    className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                        <item.icon className={`h-5 w-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">{item.problem}</h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                  </div>
                )
              })}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The result: a user who asks an AI agent for therapy recommendations gets a list
                of names and phone numbers. The agent cannot verify availability, confirm insurance
                acceptance, or check specialization fit. Every step still requires the patient to
                call, wait, and manually verify. AI wellness agents are reduced to glorified
                phone book lookups.
              </p>
            </div>
          </div>
        </section>

        {/* ===== HIPAA IS NOT THE BLOCKER ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-purple-500" />
              HIPAA Is Not the Blocker Everyone Thinks It Is
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The reflexive response from the therapy industry is privacy. &ldquo;We cannot expose
                data because of HIPAA.&rdquo; This conflates two entirely different categories of
                information. HIPAA protects <strong className="text-zinc-100">Protected Health
                Information (PHI)</strong>: patient records, diagnoses, treatment notes, and
                billing information tied to specific individuals.
              </p>
              <p>
                None of the agent-ready endpoints we propose involve PHI. Whether a therapist has
                an opening on Thursday at 2pm is practice information, not patient information.
                Which insurance plans a therapist accepts is business data. What modalities a
                therapist is trained in is professional credential data. An intake request form
                that collects a name and phone number is no different from the contact forms
                already on therapy websites.
              </p>
              <p>
                HIPAA is a legitimate concern for the electronic health records (EHR) layer.
                It is not a legitimate reason for a therapy practice to have zero structured
                data about its own services. The{' '}
                <Link
                  href="/blog/healthcare-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  healthcare agent readiness
                </Link>{' '}
                analysis applies broadly, but therapy has an additional advantage: the matching
                problem (patient to therapist) can be solved entirely with non-PHI data.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-purple-400">The key distinction:</strong> Agent-ready
                therapy infrastructure exposes <em>practice capabilities</em>, not <em>patient
                data</em>. Availability slots, specialization taxonomies, insurance acceptance,
                and intake forms are all practice-side information that agents can consume without
                any HIPAA implications.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT AGENT-READY THERAPY LOOKS LIKE ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              What Agent-Ready Therapy Looks Like: 5 MCP Tools
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              An agent-ready therapy practice exposes five tools through an MCP server. None
              touch PHI. All enable AI wellness agents to match patients to the right therapist
              programmatically.
            </p>

            <div className="space-y-3 mb-8">
              {agentReadyFeatures.map((feature) => (
                <div
                  key={feature.tool}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-emerald-400 bg-zinc-800/50 px-2 py-1 rounded text-sm font-mono">
                      {feature.tool}
                    </code>
                    {feature.hipaaOk && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                        <CheckCircle2 className="h-3 w-3" />
                        No PHI
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                With these five tools, an AI wellness agent can: search for therapists by
                specialization, verify insurance coverage, check real-time availability, and
                submit an intake request, all in a single conversation. The patient describes
                what they need, the agent matches them to qualified therapists, and the therapist
                gets a warm lead with context. No phone tag. No 48-hour callback loops.
              </p>
            </div>
          </div>
        </section>

        {/* ===== DIRECTORY PLATFORMS ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              Directory Platforms Are Not the Answer
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Psychology Today, BetterHelp, and Talkspace are the closest things to structured
              therapist data. But none are agent-accessible.
            </p>

            <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
              <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
                <div>Platform</div>
                <div>Public API</div>
                <div>Agent Score</div>
                <div>Gap</div>
              </div>
              {directoryComparison.map((row, i) => (
                <div
                  key={row.platform}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.platform}</div>
                  <div className={row.hasApi ? 'text-emerald-400' : 'text-red-400'}>
                    {row.hasApi ? 'Yes' : 'No'}
                  </div>
                  <div className="text-amber-400">{row.agentScore}</div>
                  <div className="text-zinc-500 text-xs">{row.notes}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The directory model concentrates data in walled gardens. This creates the same
                problem the web had before search engines: information exists but is locked inside
                proprietary platforms. Agent readiness requires the data to be at the{' '}
                <strong className="text-zinc-100">practice level</strong>, not the aggregator level.
                Each practice needs its own MCP endpoint, just as each business has its own website.
              </p>
              <p>
                This mirrors what we found across{' '}
                <Link
                  href="/blog/dental-veterinary-agent-readiness"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  dental and veterinary practices
                </Link>
                : the scheduling infrastructure exists internally but is not exposed to external
                agents. The fix is not a new directory. It is a standard interface on each practice.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE AI WELLNESS AGENT SCENARIO ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5 text-emerald-500" />
              The AI Wellness Agent Scenario: Who Wins the Referral
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                Picture this: an AI wellness assistant is asked to &ldquo;find me a therapist for
                anxiety who accepts UnitedHealthcare and has evening availability.&rdquo; The agent
                queries MCP registries. Exactly one practice in the area has an MCP server. That
                practice&apos;s tools return: specializations include anxiety (CBT-trained, 8 years
                experience), UnitedHealthcare PPO is in-network, and there are two open slots this
                week at 6pm and 7pm.
              </p>
              <p>
                The agent presents this practice to the user with full confidence. The other 47
                therapists in the area? The agent mentions they exist on Psychology Today but
                cannot verify anything about them. The user would need to call each one individually.
              </p>
              <p>
                <strong className="text-zinc-100">The first practice with an MCP server captures
                100% of AI-assisted therapy referrals.</strong> This is not a marginal advantage.
                It is the difference between being recommended and being invisible. As AI wellness
                agents proliferate through health insurance apps, employer wellness platforms, and
                consumer health assistants, the referral volume through this channel will grow
                exponentially.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400">First-mover math:</strong> If 5% of therapy
                seekers use AI wellness agents by 2027 (conservative estimate given current AI
                adoption rates), that is 3 million potential patients being matched through
                agent-accessible infrastructure. At an average session rate of $150, the revenue
                flowing through agent channels could reach $450 million annually. The practices
                with MCP servers get that traffic. The ones without get phone calls from the
                patients who gave up on the AI agent.
              </p>
            </div>
          </div>
        </section>

        {/* ===== HOW TO GET STARTED ===== */}
        <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              How to Get Started: From Score 5 to Score 60
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
              <p>
                The path from invisible (ARL-0) to Silver-tier agent readiness (ARL-2) for a therapy
                practice follows four steps. The total technical lift is smaller than building a
                website.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                {
                  step: '1',
                  title: 'Run a free Agent Readiness Scan',
                  detail: 'Start at /audit. See exactly where your practice stands across all 9 dimensions. Most therapy practices score 2-8, which is ARL-0: Dark.',
                  icon: Search,
                },
                {
                  step: '2',
                  title: 'Structure your practice data',
                  detail: 'Export your specializations, insurance panels, and session types into structured formats. If you use SimplePractice or Jane App, most of this data already exists.',
                  icon: Layers,
                },
                {
                  step: '3',
                  title: 'Generate your MCP server',
                  detail: 'Use AgentHermes /connect to auto-generate a healthcare MCP server with therapy-specific tools: availability, specializations, insurance, and intake.',
                  icon: Sparkles,
                },
                {
                  step: '4',
                  title: 'Go live with agent discovery',
                  detail: 'Your agent-card.json and llms.txt are auto-created. AI wellness agents can now find your practice, verify fit, and submit intake requests.',
                  icon: Globe,
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
                  title: 'Healthcare Agent Readiness: How Hospitals and Clinics Score',
                  href: '/blog/healthcare-agent-readiness',
                  tag: 'Vertical Analysis',
                  tagColor: 'amber',
                },
                {
                  title: 'Dental and Veterinary Agent Readiness',
                  href: '/blog/dental-veterinary-agent-readiness',
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
                const colors = getColorClasses(article.tagColor)
                return (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="group p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                  >
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} text-xs font-medium mb-3`}
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
              Make your therapy practice visible to AI wellness agents
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              See your Agent Readiness Score, then connect your practice to the agent economy.
              Auto-generated MCP server with therapy-specific tools, no code required.
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
