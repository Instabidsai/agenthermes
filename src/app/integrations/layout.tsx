import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integrations & Partnerships — AgentHermes',
  description:
    'AgentHermes integrates with MCP, A2A, ACP, UCP, REST, Shopify, WooCommerce, and publishes to Smithery, PulseMCP, mcp.so. Partner with us to bring businesses into the agent economy.',
  openGraph: {
    title: 'Integrations & Partnerships — AgentHermes',
    description:
      'Full protocol support (MCP, A2A, ACP, UCP, REST), platform adapters (Shopify, WooCommerce), and directory cross-listing. Partner with the Shopify of the Agent Economy.',
    url: 'https://agenthermes.ai/integrations',
    siteName: 'AgentHermes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Integrations & Partnerships — AgentHermes',
    description:
      'MCP, A2A, ACP, UCP, REST — AgentHermes speaks every agent protocol. Shopify and WooCommerce adapters. Directory cross-listing. Partner with us.',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/integrations',
  },
}

export default function IntegrationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
