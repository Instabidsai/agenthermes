import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Healthcare Agent Readiness Report Q1 2026 | AgentHermes',
  description:
    'How agent-ready is healthcare? Data from Teladoc, BetterHelp, Zocdoc, GoodRx, Hims and more. HIPAA considerations, insurance verification friction, and telehealth vs traditional provider comparison.',
  openGraph: {
    title: 'Healthcare Agent Readiness Report Q1 2026 | AgentHermes',
    description:
      'Healthcare providers scored across 9 dimensions of agent readiness. Insurance verification is the #1 friction point. See the full healthcare breakdown.',
    url: 'https://agenthermes.ai/report/healthcare-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Healthcare Agent Readiness Report Q1 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare Agent Readiness Report Q1 2026',
    description:
      'Healthcare providers scored across 9 dimensions. Telehealth vs traditional -- who is more agent-ready?',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://agenthermes.ai/report/healthcare-readiness',
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Healthcare Agent Readiness Report Q1 2026',
    description:
      'Agent readiness scores for healthcare businesses. Covers HIPAA considerations for AI agents, insurance verification friction, telehealth vs traditional provider analysis, and dimension breakdowns.',
    url: 'https://agenthermes.ai/report/healthcare-readiness',
    creator: {
      '@type': 'Organization',
      name: 'AgentHermes',
      url: 'https://agenthermes.ai',
    },
    temporalCoverage: '2026-01/2026-03',
    license: 'https://agenthermes.ai/terms',
    variableMeasured: [
      { '@type': 'PropertyValue', name: 'Agent Readiness Score', minValue: 0, maxValue: 100 },
      { '@type': 'PropertyValue', name: 'Security (D7)', minValue: 0, maxValue: 100 },
      { '@type': 'PropertyValue', name: 'Onboarding (D3)', minValue: 0, maxValue: 100 },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Healthcare Agent Readiness Report Q1 2026',
    description:
      'Data-driven analysis of healthcare agent readiness. HIPAA considerations, insurance verification as the #1 friction point, and telehealth vs traditional provider comparison.',
    url: 'https://agenthermes.ai/report/healthcare-readiness',
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

export default function HealthcareReadinessLayout({
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
