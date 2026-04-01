import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise Agent Readiness Report Q1 2026 | AgentHermes',
  description:
    'How agent-ready is Big Tech? Data from Microsoft, Google, Apple, Amazon, Meta, Oracle, IBM, Salesforce and more. The paradox: companies building AI are not agent-ready themselves.',
  openGraph: {
    title: 'Enterprise Agent Readiness Report Q1 2026 | AgentHermes',
    description:
      'Even Big Tech averages below Silver tier. The companies building AI are not agent-ready themselves. Full enterprise breakdown.',
    url: 'https://agenthermes.ai/report/enterprise-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Enterprise Agent Readiness Report Q1 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Agent Readiness Report Q1 2026',
    description:
      'Even Big Tech averages below Silver tier. See the full enterprise AI readiness breakdown.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://agenthermes.ai/report/enterprise-readiness',
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Enterprise Agent Readiness Report Q1 2026',
    description:
      'Agent readiness scores for enterprise and Big Tech companies. Covers the AI readiness paradox, ARL distribution, protocol adoption, and dimension analysis across the largest technology companies.',
    url: 'https://agenthermes.ai/report/enterprise-readiness',
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
      { '@type': 'PropertyValue', name: 'Reliability (D8)', minValue: 0, maxValue: 100 },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Enterprise Agent Readiness Report Q1 2026',
    description:
      'Data-driven analysis of enterprise agent readiness. The paradox: companies building AI are not agent-ready themselves.',
    url: 'https://agenthermes.ai/report/enterprise-readiness',
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

export default function EnterpriseReadinessLayout({
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
