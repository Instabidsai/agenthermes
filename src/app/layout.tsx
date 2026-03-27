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
