import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gateway Marketplace | AgentHermes',
  description:
    'One API key, every service. Browse AI, video, voice, media, and database services available through the AgentHermes gateway. Connect your service or start calling APIs today.',
  openGraph: {
    title: 'Gateway Marketplace | AgentHermes',
    description:
      'One API key, every service. Browse and call AI, video, voice, and media APIs through a single gateway.',
    url: 'https://agenthermes.ai/gateway',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
