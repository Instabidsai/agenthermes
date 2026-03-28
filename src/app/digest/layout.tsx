import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Weekly Agent Readiness Digest | AgentHermes',
  description:
    'The weekly intelligence brief on agent-ready commerce. New scans, score movements, industry trends, and network growth from the AgentHermes Verified Commerce Network.',
  openGraph: {
    title: 'Weekly Agent Readiness Digest | AgentHermes',
    description:
      'The weekly intelligence brief on agent-ready commerce. New scans, score movements, industry trends, and network growth.',
    url: 'https://agenthermes.ai/digest',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AgentHermes Weekly Digest',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weekly Agent Readiness Digest | AgentHermes',
    description:
      'The weekly intelligence brief on agent-ready commerce. New scans, score movements, and network growth.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://agenthermes.ai/digest',
  },
}

export default function DigestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
