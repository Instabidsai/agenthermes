import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SaaS Agent Readiness Report Q1 2026 | AgentHermes',
  description:
    'How agent-ready are SaaS platforms? Data-driven analysis of Stripe, GitHub, Vercel, Supabase, OpenAI and more. Average scores, dimension breakdown, and the SaaS leaderboard.',
  openGraph: {
    title: 'SaaS Agent Readiness Report Q1 2026 | AgentHermes',
    description:
      'SaaS platforms scored across 9 dimensions of agent readiness. See who leads, where SaaS excels, and the surprising gaps in API-first companies.',
    url: 'https://agenthermes.ai/report/saas-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SaaS Agent Readiness Report Q1 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Agent Readiness Report Q1 2026',
    description:
      'SaaS platforms scored across 9 dimensions of agent readiness. See who leads and where the gaps are.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://agenthermes.ai/report/saas-readiness',
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'SaaS Agent Readiness Report Q1 2026',
    description:
      'Agent readiness scores for SaaS and developer tool platforms. Covers 9 dimensions including API quality, discoverability, onboarding, security, and agent experience.',
    url: 'https://agenthermes.ai/report/saas-readiness',
    creator: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    temporalCoverage: '2026-01/2026-03',
    license: 'https://agenthermes.ai/terms',
    variableMeasured: [
      { '@type': 'PropertyValue', name: 'Agent Readiness Score', minValue: 0, maxValue: 100 },
      { '@type': 'PropertyValue', name: 'API Quality (D2)', minValue: 0, maxValue: 100 },
      { '@type': 'PropertyValue', name: 'Agent Experience (D9)', minValue: 0, maxValue: 100 },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SaaS Agent Readiness Report Q1 2026',
    description:
      'Data-driven analysis of how ready SaaS platforms are for AI agent commerce.',
    url: 'https://agenthermes.ai/report/saas-readiness',
    author: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    datePublished: '2026-03-30',
  },
]

export default function SaaSReadinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
