import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog | AgentHermes',
  description:
    'Track every improvement to AgentHermes — audit cycles, critical fixes, new features, and platform hardening. Full transparency, no black boxes.',
  openGraph: {
    title: 'Changelog | AgentHermes',
    description:
      'Track every improvement to AgentHermes — audit cycles, critical fixes, new features, and platform hardening.',
    url: 'https://agenthermes.ai/changelog',
  },
  alternates: {
    canonical: 'https://agenthermes.ai/changelog',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
