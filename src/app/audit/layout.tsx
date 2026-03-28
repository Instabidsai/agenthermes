import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Agent Readiness Score | AgentHermes',
  description:
    'Enter your domain to get scored across 9 dimensions of AI agent readiness. Free, takes 10-30 seconds.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
