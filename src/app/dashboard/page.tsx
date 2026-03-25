import Link from 'next/link'
import {
  Plus,
  Shield,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  BarChart3,
  ExternalLink,
} from 'lucide-react'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'

// Placeholder data — in production, fetch from API with auth
const businesses = [
  {
    slug: 'acme-legal-ai',
    name: 'Acme Legal AI',
    audit_score: 82,
    audit_tier: 'platinum' as const,
    services_count: 4,
    domain: 'acmelegal.ai',
  },
  {
    slug: 'quickbooks-connector',
    name: 'QuickBooks Connector',
    audit_score: 61,
    audit_tier: 'gold' as const,
    services_count: 2,
    domain: 'qbconnect.io',
  },
  {
    slug: 'data-enrichment-co',
    name: 'Data Enrichment Co',
    audit_score: 38,
    audit_tier: 'bronze' as const,
    services_count: 1,
    domain: 'dataenrich.co',
  },
]

const recentTransactions = [
  {
    id: '1',
    type: 'incoming',
    description: 'Contract review — AgentX',
    amount: 12.50,
    status: 'completed',
    date: '2 hours ago',
  },
  {
    id: '2',
    type: 'incoming',
    description: 'Data enrichment — ResearchBot',
    amount: 3.20,
    status: 'completed',
    date: '5 hours ago',
  },
  {
    id: '3',
    type: 'outgoing',
    description: 'Wallet top-up',
    amount: 50.00,
    status: 'completed',
    date: '1 day ago',
  },
  {
    id: '4',
    type: 'incoming',
    description: 'Legal lookup — ComplianceAgent',
    amount: 8.75,
    status: 'pending',
    date: '1 day ago',
  },
]

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Businesses
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage your registered businesses and monitor agent activity.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            Run Audit
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
          >
            <Plus className="h-4 w-4" />
            Register New Business
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Cards */}
        <div className="lg:col-span-2 space-y-4">
          {businesses.map((biz) => (
            <Link
              key={biz.slug}
              href={`/business/${biz.slug}`}
              className="flex items-center gap-5 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors group"
            >
              <ScoreGauge score={biz.audit_score} size="sm" showLabel={false} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1">
                  <h3 className="font-semibold text-zinc-100 truncate group-hover:text-white transition-colors">
                    {biz.name}
                  </h3>
                  <TierBadge tier={biz.audit_tier} size="sm" />
                </div>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>{biz.domain}</span>
                  <span>{biz.services_count} service{biz.services_count !== 1 ? 's' : ''}</span>
                </div>
              </div>

              <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
            </Link>
          ))}

          {businesses.length === 0 && (
            <div className="text-center py-16 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
              <Shield className="h-10 w-10 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500 mb-4">
                No businesses registered yet.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
              >
                <Plus className="h-4 w-4" />
                Register Your First Business
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Wallet Card */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="h-4 w-4 text-zinc-500" />
              <h3 className="text-sm font-semibold text-zinc-400">
                Wallet Balance
              </h3>
            </div>
            <div className="text-3xl font-bold tracking-tight mb-1">
              $247.50
            </div>
            <div className="text-xs text-zinc-500">
              Auto-reload at $50.00
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800/80 grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-lg font-semibold text-emerald-400">
                  $1,284
                </div>
                <div className="text-[10px] text-zinc-500 font-medium mt-0.5">
                  Earned (30d)
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-zinc-300">
                  $312
                </div>
                <div className="text-[10px] text-zinc-500 font-medium mt-0.5">
                  Spent (30d)
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <h3 className="text-sm font-semibold text-zinc-400 mb-4">
              Recent Transactions
            </h3>
            <div className="space-y-3">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0 ${
                      tx.type === 'incoming'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {tx.type === 'incoming' ? (
                      <ArrowDownLeft className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-zinc-300 truncate">
                      {tx.description}
                    </div>
                    <div className="text-[10px] text-zinc-600">{tx.date}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div
                      className={`text-xs font-semibold tabular-nums ${
                        tx.type === 'incoming'
                          ? 'text-emerald-400'
                          : 'text-zinc-400'
                      }`}
                    >
                      {tx.type === 'incoming' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </div>
                    <div
                      className={`text-[10px] ${
                        tx.status === 'pending'
                          ? 'text-amber-500'
                          : 'text-zinc-600'
                      }`}
                    >
                      {tx.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
