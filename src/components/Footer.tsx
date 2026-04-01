import Link from 'next/link'
import { Shield } from 'lucide-react'

const footerLinks = {
  products: {
    title: 'Products',
    links: [
      { href: '/audit', label: 'Score It' },
      { href: '/remediate', label: 'Fix It' },
      { href: '/gateway', label: 'Connect It' },
      { href: '/registry', label: 'Registry' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { href: '/report/state-of-readiness', label: 'Report' },
      { href: '/developers', label: 'Developers' },
      { href: '/leaderboard', label: 'Leaderboard' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/glossary', label: 'Glossary' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  forBusiness: {
    title: 'For Business',
    links: [
      { href: '/for/restaurants', label: 'Restaurants' },
      { href: '/for/hvac', label: 'HVAC' },
      { href: '/for/saas', label: 'SaaS' },
      { href: '/for/ecommerce', label: 'E-commerce' },
      { href: '/discover', label: 'All Verticals' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/changelog', label: 'Changelog' },
      { href: '/status', label: 'Status' },
    ],
  },
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Shield className="h-[18px] w-[18px] text-emerald-500" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Agent<span className="text-emerald-500">Hermes</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              The Shopify of the Agent Economy. Make any business discoverable,
              usable, and payable by AI agents. Score It, Fix It, Connect It.
            </p>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-zinc-300 mb-3">
                {group.title}
              </h2>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} AgentHermes. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            The Shopify of the Agent Economy.
          </p>
        </div>
      </div>
    </footer>
  )
}
