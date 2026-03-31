import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Commerce Infrastructure | AgentHermes',
  description:
    'How AI agents discover, use, and pay for services through AgentHermes. Supports ACP, UCP, x402 micropayments, agent wallets, KYA identity, and gateway integration.',
  openGraph: {
    title: 'Agent Commerce Infrastructure | AgentHermes',
    description:
      'The payment and identity layer for the agent economy. Wallet-based billing, x402 micropayments, agent identity (KYA), and multi-protocol support.',
    url: 'https://agenthermes.ai/commerce',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/commerce',
  },
}

export default function CommerceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
