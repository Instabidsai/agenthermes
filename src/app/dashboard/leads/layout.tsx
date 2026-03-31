import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Leads | AgentHermes',
  description:
    'View and manage leads captured by AI agents interacting with your business on AgentHermes.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
