import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gateway — Connect It | AgentHermes',
  description:
    'One API. Every service. Agent-ready today. List your service on the AgentHermes gateway and AI agents can discover, use, and pay for it through a single connection.',
  openGraph: {
    title: 'Gateway — Connect It | AgentHermes',
    description:
      'One API. Every service. Agent-ready today. List your service and let AI agents discover, use, and pay for it automatically.',
    url: 'https://agenthermes.ai/gateway',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
