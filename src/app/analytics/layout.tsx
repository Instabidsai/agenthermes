import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent Analytics | AgentHermes',
  description:
    'See how AI agents discover and interact with your business. Track profile views, search impressions, and service calls.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
