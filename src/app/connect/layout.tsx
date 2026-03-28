import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Connect Your Service | AgentHermes',
  description:
    'Connect your API to the AgentHermes gateway. Let AI agents discover, use, and pay for your service through one universal interface.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
