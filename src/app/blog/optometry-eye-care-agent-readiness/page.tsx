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
  Glasses,
  Globe,
  HelpCircle,
  Layers,
  Phone,
  Search,
  Server,
  Shield,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Truck,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Optometry and Eye Care Agent Readiness: Why Vision Providers Are Invisible to AI Health Agents | AgentHermes',
  description:
    'The US optometry market has zero agent infrastructure. Exam scheduling by phone, manual insurance verification, in-store-only frame catalogs. Learn what agent-ready eye care looks like and why AI health agents cannot find your practice.',
  keywords: [
    'optometry eye care agent readiness',
    'optometry AI',
    'eye care MCP server',
    'optometrist agent readiness',
    'vision provider API',
    'AI scheduling eye exam',
    'agent economy optometry',
    'eye doctor AI booking',
    'optical frame catalog API',
  ],
  openGraph: {
    title: 'Optometry and Eye Care Agent Readiness: Why Vision Providers Are Invisible to AI Health Agents',
    description:
      'Eye care has zero agent infrastructure. No exam availability APIs, no insurance eligibility endpoints, no frame catalogs. Here is what agent-ready optometry looks like.',
    url: 'https://agenthermes.ai/blog/optometry-eye-care-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Optometry and Eye Care Agent Readiness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Optometry and Eye Care Agent Readiness: Why Vision Providers Are Invisible to AI Health Agents',
    description:
      'Zero agent infrastructure across $45B US eye care market. The first optometrist with an MCP server gets booked by every AI health agent.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/optometry-eye-care-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const industryStats = [
  { value: '$45B', label: 'US eye care market', icon: DollarSign },
  { value: '44K+', label: 'optometry practices', icon: Store },
  { value: '~11', label: 'avg agent readiness score', icon: BarChart3 },
  { value: '0', label: 'with MCP servers', icon: Server },
]

const platformScores = [
  { name: 'Zocdoc (eye doctors)', score: 44, tier: 'Bronze', detail: 'Booking API exists but gated, limited to Zocdoc network providers', color: 'amber' },
  { name: 'VSP Vision Care', score: 28, tier: 'Not Scored', detail: 'Insurance network portal, provider search, no public scheduling API', color: 'red' },
  { name: 'LensCrafters (Luxottica)', score: 22, tier: 'Not Scored', detail: 'Corporate site, location finder, online scheduling widget but no API', color: 'red' },
  { name: 'Warby Parker', score: 41, tier: 'Bronze', detail: 'E-commerce API for frames, exam booking in select locations, virtual try-on', color: 'amber' },
  { name: 'Independent optometrists', score: 11, tier: 'Not Scored', detail: 'Template website, phone scheduling, no structured data of any kind', color: 'red' },
  { name: 'Walmart Vision Center', score: 16, tier: 'Not Scored', detail: 'Store locator, phone-only scheduling, no exam availability data', color: 'red' },
]

const agentReadyTools = [
  {
    name: 'check_exam_availability',
    description: 'Returns available appointment slots by exam type (comprehensive, contact lens fitting, pediatric, emergency), provider, and date range. Includes exam duration and any pre-visit requirements.',
    example: 'check_exam_availability({ type: "comprehensive", date_range: "2026-04-20/2026-04-25", insurance: "VSP" }) → { slots: [{ date: "2026-04-21", time: "10:30", provider: "Dr. Chen", duration: 45 }] }',
    icon: Calendar,
    color: 'emerald',
  },
  {
    name: 'verify_insurance',
    description: 'Checks insurance eligibility for a specific plan, returns coverage details for exam, frames, lenses, and contact lenses. Includes copay amounts, remaining benefits, and authorization requirements.',
    example: 'verify_insurance({ plan: "VSP Choice", member_id: "12345678" }) → { eligible: true, exam_copay: 15, frame_allowance: 150, lens_coverage: "standard_included", contacts_allowance: 130 }',
    icon: Shield,
    color: 'blue',
  },
  {
    name: 'browse_frames',
    description: 'Returns frame catalog filtered by brand, price range, shape, material, and size. Includes measurements (bridge, temple, lens width), available colors, insurance eligibility, and virtual try-on image URLs.',
    example: 'browse_frames({ price_max: 200, shape: "rectangular", material: "titanium" }) → { frames: [{ brand: "Ray-Ban", model: "RB5228", price: 185, sizes: ["51-17-140"], colors: ["black", "tortoise"] }] }',
    icon: Glasses,
    color: 'purple',
  },
  {
    name: 'track_prescription_order',
    description: 'Returns status of glasses or contact lens orders: submitted, lab processing, quality check, shipped, ready for pickup. Includes estimated completion date and tracking information for shipped orders.',
    example: 'track_prescription_order({ order_id: "RX-5531" }) → { status: "lab_processing", items: [{ type: "progressive_lenses", frame: "RB5228" }], estimated_ready: "2026-04-28", pickup_location: "Main St" }',
    icon: Truck,
    color: 'cyan',
  },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Why do optometry practices score so low on agent readiness?',
    answer:
      'Optometry has a uniquely complex workflow that has resisted digitization. Exam scheduling involves insurance verification (which is manual at most practices), provider availability across multiple exam types, and equipment scheduling. Frame selection is physical — customers try on frames in store. Prescription fulfillment involves external labs. Each step has remained analog because no single system handles the full flow digitally, let alone exposes it via API.',
  },
  {
    question: 'How is eye care different from other healthcare verticals?',
    answer:
      'Eye care combines medical services (exams, diagnosis, treatment) with retail (frames, lenses, contact lenses). A dental office does not sell products alongside services. This dual nature means agent readiness requires both healthcare scheduling APIs and e-commerce catalog APIs. It is more complex than either pure healthcare or pure retail, which is partly why it scores lower than both on average.',
  },
  {
    question: 'Would AI health agents really schedule eye exams?',
    answer:
      'Yes. AI health management agents are being built to manage all preventive care — annual physicals, dental cleanings, eye exams, dermatology screenings. The value proposition is simple: the AI tracks when each appointment is due, finds providers that accept your insurance, checks availability, and books everything. Eye exams are a natural fit because they are periodic (every 1-2 years), insurance-covered, and straightforward to schedule when the data is available.',
  },
  {
    question: 'Do platforms like Zocdoc help optometrists with agent readiness?',
    answer:
      'Zocdoc helps with discoverability — patients can find and book optometrists through the Zocdoc platform. But the practice itself remains invisible to independent AI agents. When an AI health management agent looks for optometrists with VSP coverage and availability next Tuesday, it cannot query Zocdoc\'s data (their API is not public). The practice needs its own agent infrastructure to be discoverable outside of any single platform.',
  },
  {
    question: 'What about chain optical retailers like LensCrafters?',
    answer:
      'Chain retailers have more digital infrastructure than independent practices but still score poorly on agent readiness. LensCrafters has online scheduling widgets and frame browsing, but these are HTML interfaces for humans, not structured APIs for agents. The data exists in their systems — appointment availability, frame inventory, insurance acceptance — but none of it is exposed as API endpoints. A chain that exposes this data via MCP captures all agent-driven bookings for their locations.',
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

export default function OptometryEyeCareAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Optometry and Eye Care Agent Readiness: Why Vision Providers Are Invisible to AI Health Agents',
    description:
      'The US eye care market is invisible to AI agents. No exam availability APIs, no insurance eligibility endpoints, no frame catalogs. A complete analysis of what agent-ready optometry looks like.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/optometry-eye-care-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Vertical Analysis',
    wordCount: 1900,
    keywords:
      'optometry eye care agent readiness, optometrist AI, eye care MCP, vision provider API, AI scheduling eye exam',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Optometry and Eye Care Agent Readiness',
          item: 'https://agenthermes.ai/blog/optometry-eye-care-agent-readiness',
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
      title="Optometry and Eye Care Agent Readiness: Why Vision Providers Are Invisible to AI Health Agents"
      shareUrl="https://agenthermes.ai/blog/optometry-eye-care-agent-readiness"
      currentHref="/blog/optometry-eye-care-agent-readiness"
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
            <span className="text-zinc-400">Optometry and Eye Care Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <Glasses className="h-3.5 w-3.5" />
              Vertical Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              $45B Industry
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Optometry and Eye Care Agent Readiness:{' '}
            <span className="text-emerald-400">Why Vision Providers Are Invisible to AI Health Agents</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            The US eye care market is worth <strong className="text-zinc-100">$45 billion</strong> with over
            44,000 optometry practices nationwide. Exam scheduling happens by phone. Insurance verification is
            manual. Frame catalogs are in-store only. Prescription records live in portals that agents cannot access.
            When an AI health agent tries to book an eye exam, it hits a wall.
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

      {/* ===== THE PROBLEM ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            The Most Fragmented Healthcare Vertical
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Booking an eye exam in 2026 is a multi-step process that defeats automation at every turn. First,
              you need to find a provider that accepts your vision insurance (VSP, EyeMed, or one of dozens of
              others). Then you call the office — during business hours — to check availability. The receptionist
              asks what type of exam you need, manually checks the schedule, and verifies your insurance by
              calling the carrier or logging into a portal. If all checks pass, you get an appointment.
            </p>
            <p>
              Now imagine asking an AI health management agent: &ldquo;I need to schedule my annual eye exam.
              Use my VSP insurance. Sometime next week in the afternoon.&rdquo; The agent searches for optometrists
              near you. It finds Google Business listings with phone numbers and reviews. No availability data. No
              insurance acceptance data. No exam type data. The agent tells you to call the office yourself.
            </p>
            <p>
              Eye care is unique among healthcare verticals because it combines medical services with retail
              products. After your exam, you may need glasses (frames plus lenses), contact lenses, or both.
              The frame selection process is entirely in-store, with no structured catalog available to external
              systems. This dual nature — healthcare plus retail — makes eye care one of the most complex
              verticals for agent readiness, and explains why it scores lower than both{' '}
              <Link href="/blog/healthcare-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                general healthcare
              </Link>{' '}
              and{' '}
              <Link href="/blog/dental-veterinary-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                dental practices
              </Link>{' '}
              on average.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {industryStats.map((stat) => (
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

      {/* ===== WHY EYE CARE SCORES SO LOW ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-amber-500" />
            Why Optometry Practices Score Under 15
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              AgentHermes scans show that independent optometry practices average a score of <strong className="text-zinc-100">11 out of 100</strong> on
              the Agent Readiness Score. That places them at ARL-0: Dark — completely invisible to AI health agents. Even chain
              optical retailers with corporate websites and online scheduling rarely break 25. Here is the dimension-by-dimension breakdown.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { dim: 'D1 Discovery (0.12)', score: '3-8', detail: 'Chain retailers have SEO-optimized sites with location pages. Independent practices have template websites from practice management vendors. Some Schema.org LocalBusiness markup exists in chain sites, but independent practices have none.', color: 'red' },
              { dim: 'D2 API Quality (0.15)', score: '0', detail: 'Zero public APIs across the entire eye care industry. No exam availability endpoints, no insurance verification APIs, no frame catalog endpoints. Practice management systems (Compulink, RevolutionEHR) have internal APIs but none are public-facing.', color: 'red' },
              { dim: 'D3 Onboarding (0.08)', score: '0-1', detail: 'No developer documentation, no API keys, no integration guides. The closest thing to onboarding is creating a patient portal account — which is a human workflow, not an agent workflow.', color: 'red' },
              { dim: 'D4 Pricing (0.05)', score: '2-10', detail: 'Exam pricing is sometimes listed on websites ($100-300 range). Frame pricing is never published because it varies by brand, lens type, and insurance coverage. Contact lens pricing is occasionally visible on retail sites.', color: 'amber' },
              { dim: 'D6 Data Quality (0.10)', score: '3-12', detail: 'Chain retailers have product data in e-commerce systems, but it is not exposed via API. Independent practices have clinical data in EHR systems that are completely siloed. No structured frame catalogs exist in machine-readable form.', color: 'amber' },
              { dim: 'D9 Agent Experience (0.10)', score: '0', detail: 'No agent-card.json, no llms.txt, no MCP server, no AGENTS.md. The agent experience dimension is zero across 44,000+ practices.', color: 'red' },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.dim}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-zinc-100">{item.dim}</h3>
                    <span className={`text-sm font-mono font-bold ${colors.text}`}>{item.score}/100</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM COMPARISON ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Platforms and Chains: Who Owns the Patient Relationship
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              The eye care industry is dominated by Luxottica (LensCrafters, Pearle Vision, Target Optical,
              Sunglass Hut) and a few large chains (Warby Parker, America&apos;s Best). These chains have more
              digital infrastructure than independent practices but still score poorly because their scheduling
              and catalog data is locked inside consumer-facing websites, not exposed as APIs.
            </p>
            <p>
              Zocdoc lists some eye care providers, but its API is private. Insurance networks like VSP have
              provider search tools, but these are web interfaces for patients, not endpoints for agents. The
              practice that builds its own agent infrastructure bypasses all intermediaries.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Platform / Business</div>
              <div>Score</div>
              <div>Tier</div>
              <div>Notes</div>
            </div>
            {platformScores.map((row, i) => {
              const colors = getColorClasses(row.color)
              return (
                <div
                  key={row.name}
                  className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
                >
                  <div className="font-medium text-zinc-200">{row.name}</div>
                  <div className={`font-mono font-bold ${colors.text}`}>{row.score}</div>
                  <div className="text-zinc-500">{row.tier}</div>
                  <div className="text-zinc-500">{row.detail}</div>
                </div>
              )
            })}
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">The insurance verification bottleneck:</strong> Vision insurance
              verification is the single biggest friction point in eye care scheduling. Patients often do not know
              their plan details, and staff must call the insurance carrier or check a portal for every appointment.
              An agent-ready practice exposes an insurance verification endpoint that resolves eligibility in seconds.
              This alone would eliminate the biggest reason patients abandon the booking process.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHAT AGENT-READY EYE CARE LOOKS LIKE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            What Agent-Ready Eye Care Looks Like
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            An agent-ready optometry practice exposes four MCP tools that let any AI health agent check
            availability, verify insurance, browse frames, and track orders — turning a multi-step phone
            process into a single automated flow.
          </p>

          <div className="space-y-4 mb-8">
            {agentReadyTools.map((tool) => {
              const colors = getColorClasses(tool.color)
              return (
                <div
                  key={tool.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <tool.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">
                      <code className={`${colors.text} text-base`}>{tool.name}()</code>
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{tool.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{tool.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The combination of exam scheduling and frame catalog is what makes eye care uniquely valuable for
              agent automation. An AI health agent books the exam, then after the appointment, the agent uses the
              updated prescription to browse frames matching the patient&apos;s style preferences and insurance
              allowance. The entire post-exam purchase process — which currently requires an in-store visit — can
              be augmented with data-driven frame recommendations delivered before the patient even leaves the office.
            </p>
            <p>
              Virtual try-on data adds another dimension. Practices that expose frame images with facial measurement
              data enable AI assistants to suggest frames based on face shape, prescription requirements, and budget.
              This is the kind of personalized, data-rich interaction that builds agent loyalty and repeat visits.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THE AI HEALTH MANAGEMENT PLAY ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            The AI Health Management Agent
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The AI health management agent is the convergence point for all preventive care. It tracks when
              your annual physical is due, when your dental cleaning should be scheduled, when your eye exam
              is overdue, and when your dermatology screening is recommended. It manages all of these across
              multiple providers, multiple insurance plans, and multiple family members.
            </p>
            <p>
              For this agent to work, every provider type needs to be agent-accessible. Dental practices are
              starting to expose scheduling APIs through platforms like NexHealth and Dentistry.ai. Primary
              care is being opened up by Epic MyChart and Cerner patient portals. Eye care is the gap.
              Without agent-ready optometry, the AI health agent manages everything except vision — which
              means patients still have to make phone calls for one category of care.
            </p>
            <p>
              The optometry practice that fills this gap captures a permanent position in the AI health
              management stack. Once an agent connects to your practice for scheduling and insurance
              verification, it will not switch to a competitor unless your service degrades. Agent
              relationships in healthcare are even stickier than in consumer services because of insurance
              networks, prescription continuity, and medical records.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Annual comprehensive exams',
                detail: 'The core service. AI agents track when exams are due based on age, risk factors, and insurance benefit periods. They automatically schedule around the patient\'s calendar and insurance renewal dates.',
              },
              {
                title: 'Contact lens management',
                detail: 'Contacts need regular refills and annual fitting exams. AI agents can track supply levels, auto-reorder when running low, and schedule fitting appointments when prescriptions expire.',
              },
              {
                title: 'Pediatric eye care',
                detail: 'Children need vision screening at multiple developmental milestones. AI family health agents track recommended screening ages and schedule exams for each child in the household.',
              },
              {
                title: 'Specialty and urgent care',
                detail: 'Red eye, sudden vision changes, foreign body removal. AI agents need to identify urgent vs routine and route appropriately, checking which providers have same-day emergency availability.',
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
                title: 'Healthcare Agent Readiness: Why Hospitals and Clinics Score Low',
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
            Run your optometry practice through the scanner
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            See your Agent Readiness Score across all 9 dimensions. Find out exactly what is missing
            and how to become the first agent-ready eye care provider in your area.
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
