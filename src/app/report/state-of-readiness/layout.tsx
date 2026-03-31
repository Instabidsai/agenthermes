import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'State of Agent Readiness Q1 2026 | AgentHermes',
  description:
    'Data-driven report on how ready businesses are for AI agent commerce. Based on 108+ real scans across multiple industries. Covers the 6-step agent journey, protocol adoption, and industry benchmarks.',
  openGraph: {
    title: 'State of Agent Readiness Q1 2026 | AgentHermes',
    description:
      'Based on 108+ business scans: average scores, industry breakdown, protocol adoption rates, and the 6-step agent journey analysis.',
    url: 'https://agenthermes.ai/report/state-of-readiness',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'State of Agent Readiness Q1 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'State of Agent Readiness Q1 2026',
    description:
      'Based on 108+ business scans: average scores, industry breakdown, protocol adoption rates, and the 6-step agent journey analysis.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://agenthermes.ai/report/state-of-readiness',
  },
}

const datasetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'State of Agent Readiness Q1 2026',
  description:
    'Agent readiness scores for 108+ businesses across multiple industries. Covers 9 dimensions of AI agent readiness mapped to a 6-step agent journey: FIND, UNDERSTAND, SIGN UP, CONNECT, USE, PAY. Includes protocol adoption rates for MCP, agent cards, llms.txt, A2A, and OpenAPI.',
  url: 'https://agenthermes.ai/report/state-of-readiness',
  creator: {
    '@type': 'Organization',
    name: 'AgentHermes',
    url: 'https://agenthermes.ai',
  },
  temporalCoverage: '2026-01/2026-03',
  license: 'https://agenthermes.ai/terms',
  distribution: {
    '@type': 'DataDownload',
    encodingFormat: 'application/json',
    contentUrl: 'https://agenthermes.ai/api/v1/report',
  },
  variableMeasured: [
    {
      '@type': 'PropertyValue',
      name: 'Agent Readiness Score',
      minValue: 0,
      maxValue: 100,
    },
    {
      '@type': 'PropertyValue',
      name: 'Discoverability (D1)',
      minValue: 0,
      maxValue: 100,
    },
    {
      '@type': 'PropertyValue',
      name: 'API Quality (D2)',
      minValue: 0,
      maxValue: 100,
    },
    {
      '@type': 'PropertyValue',
      name: 'Onboarding (D3)',
      minValue: 0,
      maxValue: 100,
    },
    {
      '@type': 'PropertyValue',
      name: 'Pricing Transparency (D4)',
      minValue: 0,
      maxValue: 100,
    },
    {
      '@type': 'PropertyValue',
      name: 'Payment (D5)',
      minValue: 0,
      maxValue: 100,
    },
    {
      '@type': 'PropertyValue',
      name: 'Data Quality (D6)',
      minValue: 0,
      maxValue: 100,
    },
    {
      '@type': 'PropertyValue',
      name: 'Security (D7)',
      minValue: 0,
      maxValue: 100,
    },
    {
      '@type': 'PropertyValue',
      name: 'Reliability (D8)',
      minValue: 0,
      maxValue: 100,
    },
    {
      '@type': 'PropertyValue',
      name: 'Agent Experience (D9)',
      minValue: 0,
      maxValue: 100,
    },
  ],
}

export default function StateOfReadinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />
      {children}
    </>
  )
}
