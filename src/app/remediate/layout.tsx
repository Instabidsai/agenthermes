import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fix Your Agent Readiness | AgentHermes',
  description:
    'Generate llms.txt, agent cards, OpenAPI specs, and more to improve your Agent Readiness Score on AgentHermes.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
