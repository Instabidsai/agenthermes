import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Shield className="h-[18px] w-[18px] text-emerald-500" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Agent<span className="text-emerald-500">Hermes</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              The verified commerce network for agent-ready businesses.
              Machine-readable trust, real transactions, no black boxes.
            </p>
          </div>

          {/* Network */}
          <div>
            <h2 className="text-sm font-semibold text-zinc-300 mb-3">Network</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/discover" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Discover Businesses
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/audit" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Audit Your Business
                </Link>
              </li>
              <li>
                <Link href="/remediate" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Fix Your Readiness
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Report
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* For Developers */}
          <div>
            <h2 className="text-sm font-semibold text-zinc-300 mb-3">For Agents</h2>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-zinc-600">
                  MCP Integration <span className="text-zinc-700">(Coming Soon)</span>
                </span>
              </li>
              <li>
                <span className="text-sm text-zinc-600">
                  A2A Protocol <span className="text-zinc-700">(Coming Soon)</span>
                </span>
              </li>
              <li>
                <span className="text-sm text-zinc-600">
                  API Docs <span className="text-zinc-700">(Coming Soon)</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} AgentHermes. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Verified trust for the agentic economy.
          </p>
        </div>
      </div>
    </footer>
  )
}
