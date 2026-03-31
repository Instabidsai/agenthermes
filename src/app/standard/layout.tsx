import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Agent Readiness Standard | agent-hermes.json | AgentHermes',
  description:
    'The .well-known/agent-hermes.json standard makes any business machine-readable for AI agents. One file. Every agent knows what you do, how to connect, and how to pay.',
  openGraph: {
    title: 'The Agent Readiness Standard | agent-hermes.json',
    description:
      'One JSON file makes your business discoverable, usable, and payable by AI agents. The open standard for the agent economy.',
    url: 'https://agenthermes.ai/standard',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/standard',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
