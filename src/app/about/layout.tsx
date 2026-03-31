import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About AgentHermes — The Shopify of the Agent Economy',
  description:
    'AgentHermes makes any business discoverable, usable, and payable by AI agents. 33M small businesses, average agent readiness score of 36/100. We fix that.',
  openGraph: {
    title: 'About AgentHermes — The Shopify of the Agent Economy',
    description:
      'AI agents are learning to shop, book, and pay on behalf of humans. Most businesses are invisible to them. AgentHermes fixes that with Score It, Fix It, Connect It.',
    url: 'https://agenthermes.ai/about',
    siteName: 'AgentHermes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About AgentHermes — The Shopify of the Agent Economy',
    description:
      'AI agents are learning to shop, book, and pay on behalf of humans. Most businesses are invisible to them. AgentHermes fixes that.',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
