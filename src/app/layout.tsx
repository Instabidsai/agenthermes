import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://agenthermes.ai'),
  title: "AgentHermes — Verified Commerce Network",
  description:
    "Get your Agent Readiness Score \u2014 the industry standard for AI agent commerce. See if AI agents can discover, use, and pay your business. Free scan in 60 seconds.",
  openGraph: {
    title: 'AgentHermes — Verified Commerce Network',
    description:
      'The verified commerce network for agent-ready businesses. Machine-readable trust, real transactions, no black boxes.',
    url: 'https://agenthermes.ai',
    siteName: 'AgentHermes',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AgentHermes — Verified Commerce Network for AI Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentHermes — Verified Commerce Network',
    description:
      'The verified commerce network for agent-ready businesses. Machine-readable trust, real transactions, no black boxes.',
    images: ['/og-image.png'],
  },
  authors: [{ name: 'AgentHermes Team', url: 'https://agenthermes.ai' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://agenthermes.ai',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AgentHermes',
  url: 'https://agenthermes.ai',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'The verified commerce network for the agent economy. Scores businesses 0-100 on AI agent readiness across 9 dimensions including API quality, security, reliability, and discoverability.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free agent readiness scan',
  },
  featureList: [
    '9-dimension AI agent readiness scoring (0-100)',
    'Business discovery network with semantic search',
    'MCP server with 10 tools, 4 resources, 3 prompts',
    'Automated remediation (agent cards, llms.txt, Schema.org)',
    'Gateway — one API key for every connected service',
    'Wallet-to-wallet payments for agent transactions',
    'Certification and embeddable trust badges',
    'Endpoint health monitoring and mystery shopping',
  ],
  provider: {
    '@type': 'Organization',
    name: 'AgentHermes',
    url: 'https://agenthermes.ai',
    email: 'support@agenthermes.ai',
    sameAs: [
      'https://github.com/agenthermes',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#09090b] text-zinc-100">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg focus:outline-none">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
