import type { Metadata } from 'next'
import Link from 'next/link'
import BlogArticleWrapper from '@/components/BlogArticleWrapper'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Link2,
  Lock,
  Mail,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'security.txt: The 2-Minute File That Tells AI Agents Your API Is Safe | AgentHermes',
  description:
    'RFC 9116 defines /.well-known/security.txt. AgentHermes checks for it in D7 Security (0.12 weight). Most businesses do not have one — yet top scorers like Stripe, GitHub, and Vercel do. Takes 2 minutes to create and signals maturity to AI agents evaluating API trustworthiness.',
  keywords: [
    'security.txt agent readiness',
    'security.txt RFC 9116',
    'well-known security.txt',
    'agent readiness security',
    'AI agent trust signals',
    'security.txt setup guide',
    'D7 security dimension',
    'agent readiness score security',
    'API security signals',
  ],
  openGraph: {
    title: 'security.txt: The 2-Minute File That Tells AI Agents Your API Is Safe',
    description:
      'RFC 9116 security.txt takes 2 minutes to create and adds points to D7 Security. Top scorers have it. 95% of businesses do not.',
    url: 'https://agenthermes.ai/blog/security-txt-agent-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'security.txt: The 2-Minute File That Tells AI Agents Your API Is Safe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'security.txt: The 2-Minute File That Tells AI Agents Your API Is Safe',
    description:
      'security.txt is RFC 9116. Takes 2 minutes. Adds D7 Security points. Top companies have it. You probably do not.',
  },
  authors: [{ name: 'AgentHermes Research', url: 'https://agenthermes.ai' }],
  alternates: {
    canonical: 'https://agenthermes.ai/blog/security-txt-agent-readiness',
  },
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const securityTxtFields = [
  {
    field: 'Contact',
    required: true,
    description: 'How to report vulnerabilities. Can be an email (mailto:security@example.com), a URL to a reporting form, or a phone number. This is the only required field.',
    example: 'Contact: mailto:security@example.com',
    icon: Mail,
    color: 'emerald',
  },
  {
    field: 'Expires',
    required: true,
    description: 'When this security.txt file expires and should no longer be trusted. ISO 8601 format. Prevents stale security contacts from persisting for years. IETF recommends refreshing at least annually.',
    example: 'Expires: 2027-04-15T00:00:00.000Z',
    icon: Timer,
    color: 'emerald',
  },
  {
    field: 'Preferred-Languages',
    required: false,
    description: 'Languages the security team can communicate in. Helps international agents and researchers route reports to teams that can process them without translation overhead.',
    example: 'Preferred-Languages: en, es',
    icon: Globe,
    color: 'blue',
  },
  {
    field: 'Canonical',
    required: false,
    description: 'The canonical URL of this security.txt file. Agents use this to verify they are reading the authentic file and not a cached or modified version from a CDN or proxy.',
    example: 'Canonical: https://example.com/.well-known/security.txt',
    icon: Link2,
    color: 'blue',
  },
  {
    field: 'Policy',
    required: false,
    description: 'URL to your vulnerability disclosure policy. Tells agents and researchers the rules of engagement: what is in scope, what testing is allowed, safe harbor provisions.',
    example: 'Policy: https://example.com/security/policy',
    icon: FileText,
    color: 'purple',
  },
  {
    field: 'Hiring',
    required: false,
    description: 'URL to security job openings. Not directly relevant to agent readiness, but signals that the company invests in security talent — another trust indicator for agents evaluating API reliability.',
    example: 'Hiring: https://example.com/careers/security',
    icon: Target,
    color: 'purple',
  },
]

const topScorers = [
  { company: 'Stripe', score: 68, hasSecurityTxt: true, d7Score: 78 },
  { company: 'GitHub', score: 67, hasSecurityTxt: true, d7Score: 82 },
  { company: 'Vercel', score: 70, hasSecurityTxt: true, d7Score: 72 },
  { company: 'Supabase', score: 69, hasSecurityTxt: true, d7Score: 70 },
  { company: 'Resend', score: 75, hasSecurityTxt: true, d7Score: 74 },
  { company: 'Slack', score: 68, hasSecurityTxt: true, d7Score: 76 },
]

const noSecurityTxt = [
  { company: 'Average SaaS', score: 42, d7Score: 35 },
  { company: 'Average E-Commerce', score: 28, d7Score: 22 },
  { company: 'Average Local Business', score: 12, d7Score: 8 },
  { company: 'Average Healthcare', score: 33, d7Score: 28 },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Does security.txt directly increase my Agent Readiness Score?',
    answer:
      'Yes. AgentHermes checks for a valid security.txt at /.well-known/security.txt as part of the D7 Security dimension, which carries a 0.12 weight — the third-highest of the 9 dimensions. A valid security.txt with Contact and Expires fields adds points to D7. It is not the largest D7 signal (OAuth and structured 401 responses contribute more), but it is the fastest to implement and signals security maturity.',
  },
  {
    question: 'Do AI agents actually read security.txt?',
    answer:
      'Not directly in most cases today. But AI agents evaluating whether to trust an API check for security signals as part of their trust assessment. A security.txt file signals that the organization has a vulnerability disclosure process, which correlates with better API security practices overall. Agents using the AgentHermes registry see D7 scores that factor in security.txt, so it indirectly influences agent routing decisions.',
  },
  {
    question: 'What is the difference between security.txt and robots.txt for agents?',
    answer:
      'robots.txt tells agents what content they can crawl. security.txt tells agents (and humans) how to report security issues with your service. They serve completely different purposes. For agent readiness, robots.txt impacts D1 Discoverability (whether agents can find you), while security.txt impacts D7 Security (whether agents trust you). Both are single files at known paths. Both take minutes to create. Both affect your score.',
  },
  {
    question: 'Is there a generator tool for security.txt?',
    answer:
      'Yes. securitytxt.org provides an interactive generator that produces a standards-compliant file. You fill in your contact email, policy URL, and preferred languages, and it generates the complete file. Alternatively, AgentHermes auto-generates a security.txt as part of the /connect wizard output — along with agent-card.json and llms.txt.',
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

export default function SecurityTxtAgentReadinessPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'security.txt: The 2-Minute File That Tells AI Agents Your API Is Safe',
    description:
      'RFC 9116 defines security.txt. AgentHermes checks for it in D7 Security. Takes 2 minutes to create and signals API trustworthiness to AI agents.',
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
    mainEntityOfPage: 'https://agenthermes.ai/blog/security-txt-agent-readiness',
    image: 'https://agenthermes.ai/og-image.png',
    articleSection: 'Standards Guide',
    wordCount: 1800,
    keywords:
      'security.txt agent readiness, RFC 9116, well-known security.txt, D7 security, AI agent trust',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenthermes.ai' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenthermes.ai/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'security.txt and Agent Readiness',
          item: 'https://agenthermes.ai/blog/security-txt-agent-readiness',
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
      title="security.txt: The 2-Minute File That Tells AI Agents Your API Is Safe"
      shareUrl="https://agenthermes.ai/blog/security-txt-agent-readiness"
      currentHref="/blog/security-txt-agent-readiness"
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
            <span className="text-zinc-400">security.txt and Agent Readiness</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <ShieldAlert className="h-3.5 w-3.5" />
              Standards Guide
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              D7 Security (0.12 weight)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            security.txt:{' '}
            <span className="text-emerald-400">The 2-Minute File That Tells AI Agents Your API Is Safe</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed tracking-tight max-w-3xl mb-6">
            RFC 9116 defines a simple text file at{' '}
            <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-base">
              /.well-known/security.txt
            </code>{' '}
            that tells anyone — human or machine — how to report security issues with your service.
            Every Silver and Gold business in our 500-scan dataset has one. Over 95% of businesses
            below Bronze do not. It takes 2 minutes to create. It adds points to D7 Security, which
            carries a <strong className="text-zinc-100">0.12 weight</strong> — third-highest of
            the 9 dimensions.
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

      {/* ===== WHY AGENTS CARE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-500" />
            Why AI Agents Care About security.txt
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              Before an AI agent delegates a task to your API — processing a payment, booking an
              appointment, submitting an order — it evaluates whether your service is trustworthy.
              This evaluation happens across multiple signals: HTTPS, OAuth support, structured error
              responses, status pages. A security.txt file is one of the fastest signals to check
              and one of the clearest indicators of organizational security maturity.
            </p>
            <p>
              The logic is straightforward: a business that publishes a vulnerability disclosure
              process takes security seriously enough to have one. A business without security.txt
              likely does not have a formal process for handling reported vulnerabilities — which
              means the API may have unpatched issues that nobody can responsibly report.
            </p>
            <p>
              In our 500-business scan,{' '}
              <strong className="text-zinc-100">100% of Silver-tier businesses</strong> have a
              security.txt file. Below Bronze, the adoption rate drops to under 5%. This is not
              a coincidence — the same organizational discipline that produces good APIs also
              produces security.txt files.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: '100%', label: 'Silver+ have security.txt', icon: ShieldCheck },
              { value: '<5%', label: 'below Bronze have it', icon: ShieldAlert },
              { value: '0.12', label: 'D7 Security weight', icon: BarChart3 },
              { value: '2 min', label: 'to create the file', icon: Timer },
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

      {/* ===== WHAT GOES INSIDE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            What Goes Inside a security.txt File
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              RFC 9116 defines six fields. Two are required (Contact, Expires). Four are optional
              but recommended. The file lives at{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                /.well-known/security.txt
              </code>{' '}
              and is plain text — no JSON, no YAML, just key-value pairs.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {securityTxtFields.map((field) => {
              const colors = getColorClasses(field.color)
              return (
                <div
                  key={field.field}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <field.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-zinc-100">{field.field}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${field.required ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-zinc-800/50 border border-zinc-700/50 text-zinc-500'}`}>
                        {field.required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{field.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <p className="text-xs text-zinc-500">
                      <span className="text-zinc-400 font-medium">Example:</span>{' '}
                      <code className={`${colors.text} text-xs`}>{field.example}</code>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== THE TEMPLATE ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-500" />
            Copy-Paste Template
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              Save this as{' '}
              <code className="text-emerald-400 bg-zinc-800/50 px-1.5 py-0.5 rounded text-sm">
                /.well-known/security.txt
              </code>{' '}
              on your web server. Replace the placeholder values with your actual information.
              This is a complete, RFC 9116-compliant file.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 font-mono text-sm leading-relaxed mb-8">
            <div className="text-zinc-500"># security.txt — RFC 9116</div>
            <div className="text-zinc-500"># https://securitytxt.org/</div>
            <div className="mt-2" />
            <div><span className="text-emerald-400">Contact:</span> <span className="text-zinc-300">mailto:security@yourdomain.com</span></div>
            <div><span className="text-emerald-400">Expires:</span> <span className="text-zinc-300">2027-04-15T00:00:00.000Z</span></div>
            <div><span className="text-blue-400">Preferred-Languages:</span> <span className="text-zinc-300">en</span></div>
            <div><span className="text-blue-400">Canonical:</span> <span className="text-zinc-300">https://yourdomain.com/.well-known/security.txt</span></div>
            <div><span className="text-purple-400">Policy:</span> <span className="text-zinc-300">https://yourdomain.com/security/policy</span></div>
            <div><span className="text-purple-400">Hiring:</span> <span className="text-zinc-300">https://yourdomain.com/careers/security</span></div>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong className="text-amber-400">Important:</strong> The Expires field is required
              by RFC 9116. Set it to one year from today and add a calendar reminder to update it.
              An expired security.txt is worse than none at all — it signals that you set up
              security practices once and then abandoned them.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHO HAS IT ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            Who Has security.txt (And Who Does Not)
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-8">
            <p>
              The correlation between security.txt adoption and Agent Readiness Score is striking.
              Every business in our top 10 has one. Below the Bronze threshold, almost nobody does.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-6">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Company</div>
              <div>Overall Score</div>
              <div>D7 Security</div>
              <div>security.txt</div>
            </div>
            {topScorers.map((row, i) => (
              <div
                key={row.company}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.company}</div>
                <div className="text-emerald-400">{row.score}/100</div>
                <div className="text-blue-400">{row.d7Score}/100</div>
                <div className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Yes
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-zinc-800/80 overflow-hidden mb-8">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-bold text-zinc-300">
              <div>Category</div>
              <div>Average Score</div>
              <div>Avg D7 Security</div>
              <div>security.txt</div>
            </div>
            {noSecurityTxt.map((row, i) => (
              <div
                key={row.company}
                className={`grid grid-cols-4 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-zinc-900/50'}`}
              >
                <div className="font-medium text-zinc-200">{row.company}</div>
                <div className="text-amber-400">{row.score}/100</div>
                <div className="text-amber-400">{row.d7Score}/100</div>
                <div className="text-red-400 text-xs">Rarely</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              The takeaway is not that security.txt alone causes higher scores. The businesses
              with security.txt also have OAuth, structured errors, status pages, and good API
              documentation. But security.txt is the{' '}
              <strong className="text-zinc-100">cheapest signal to add</strong>. If you have
              none of the other D7 signals, start here. It takes 2 minutes and demonstrates
              that you have a security process — even if the rest of your infrastructure is
              still catching up.
            </p>
          </div>
        </div>
      </section>

      {/* ===== THREE FILE COMBO ===== */}
      <section className="pb-12 sm:pb-16 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-500" />
            The Three-File Stack for Agent Trust
          </h2>
          <div className="space-y-4 text-zinc-300 leading-relaxed mb-6">
            <p>
              security.txt is most powerful when combined with two other discovery files that
              AgentHermes checks. Together, these three files tell AI agents: this business
              exists, this business is safe, and this business has something useful to offer.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                file: '/.well-known/security.txt',
                dimension: 'D7 Security (0.12)',
                signal: 'This business takes security seriously and has a process for handling vulnerabilities.',
                time: '2 minutes',
                icon: ShieldAlert,
                color: 'emerald',
              },
              {
                file: '/llms.txt',
                dimension: 'D1 Discovery + D9 Agent Experience',
                signal: 'This business has a machine-readable summary that AI models can consume directly.',
                time: '10 minutes',
                icon: FileText,
                color: 'blue',
              },
              {
                file: '/.well-known/agent-card.json',
                dimension: 'D1 Discovery + D9 Agent Experience',
                signal: 'This business has agent-callable capabilities and publishes them in A2A standard format.',
                time: '15 minutes',
                icon: Server,
                color: 'purple',
              },
            ].map((item) => {
              const colors = getColorClasses(item.color)
              return (
                <div
                  key={item.file}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} border ${colors.border}`}>
                      <item.icon className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-100">
                        <code className="text-sm">{item.file}</code>
                      </h3>
                      <p className="text-xs text-zinc-500">{item.dimension}</p>
                    </div>
                    <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.signal}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              All three files together take under 30 minutes to create and deploy. They touch
              three different dimensions (D1, D7, D9) with a combined weight of 0.34 — over a
              third of the total score. For businesses stuck below Bronze, this is the highest
              ROI afternoon you can spend on agent readiness. Read our{' '}
              <Link href="/blog/checklist-agent-ready-business" className="text-emerald-400 hover:text-emerald-300 underline">
                30-signal checklist
              </Link>{' '}
              for the complete list, or start with our{' '}
              <Link href="/blog/security-agent-readiness" className="text-emerald-400 hover:text-emerald-300 underline">
                D7 Security deep dive
              </Link>{' '}
              for the full picture of what agents evaluate.
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
                title: 'Security and Agent Readiness: Why Bearer Tokens Beat API Keys',
                href: '/blog/security-agent-readiness',
                tag: 'Dimensions Deep Dive',
                tagColor: 'blue',
              },
              {
                title: 'The Agent Readiness Checklist: 30 Signals',
                href: '/blog/checklist-agent-ready-business',
                tag: 'Checklist',
                tagColor: 'emerald',
              },
              {
                title: 'llms.txt: The Single File 95% of Businesses Are Missing',
                href: '/blog/llms-txt-standard-guide',
                tag: 'Standards Guide',
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
            Check if you have security.txt
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Run a free Agent Readiness Scan. We check for security.txt, agent-card.json,
            llms.txt, and 27 other signals across all 9 dimensions. See your D7 Security
            score in 60 seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cta-button-glow"
            >
              Check My Score
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </BlogArticleWrapper>
  )
}
