'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Shield,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  BarChart3,
  ExternalLink,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import ScoreGauge from '@/components/ScoreGauge'
import TierBadge from '@/components/TierBadge'
import { supabase } from '@/lib/supabase'

type AuditTier = 'unaudited' | 'bronze' | 'silver' | 'gold' | 'platinum'

interface BusinessRow {
  id: string
  slug: string
  name: string
  audit_score: number
  audit_tier: AuditTier
  domain: string | null
  services: { count: number }[]
}

interface WalletRow {
  id: string
  balance: number
  auto_reload_threshold: number
  status: string
}

interface TransactionRow {
  id: string
  amount: number
  service_description: string | null
  status: string
  created_at: string
  buyer_wallet_id: string
  seller_wallet_id: string
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export default function DashboardPage() {
  const [businesses, setBusinesses] = useState<BusinessRow[]>([])
  const [wallets, setWallets] = useState<WalletRow[]>([])
  const [transactions, setTransactions] = useState<TransactionRow[]>([])
  const [walletIds, setWalletIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)

      try {
        // Fetch businesses with service count
        const { data: bizData, error: bizError } = await supabase
          .from('businesses')
          .select('id, slug, name, audit_score, audit_tier, domain, services(count)')
          .order('audit_score', { ascending: false })

        if (bizError) throw new Error(bizError.message)
        setBusinesses((bizData as unknown as BusinessRow[]) || [])

        // Fetch all wallets
        const { data: walletData, error: walletError } = await supabase
          .from('agent_wallets')
          .select('id, balance, auto_reload_threshold, status')

        if (walletError) throw new Error(walletError.message)
        setWallets((walletData as WalletRow[]) || [])

        const wIds = new Set((walletData || []).map((w: WalletRow) => w.id))
        setWalletIds(wIds)

        // Fetch recent transactions
        const { data: txData, error: txError } = await supabase
          .from('transactions')
          .select('id, amount, service_description, status, created_at, buyer_wallet_id, seller_wallet_id')
          .order('created_at', { ascending: false })
          .limit(10)

        if (txError) throw new Error(txError.message)
        setTransactions((txData as TransactionRow[]) || [])
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to load dashboard data'
        setError(msg)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Aggregate wallet stats
  const totalBalance = wallets.reduce((sum, w) => sum + (w.balance || 0), 0)

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Skeleton header */}
        <div className="mb-10">
          <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse mb-2" />
          <div className="h-4 w-72 bg-zinc-800/50 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Business card skeletons */}
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-5 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 animate-pulse"
              >
                <div className="h-14 w-14 rounded-full bg-zinc-800/60 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="h-5 w-40 bg-zinc-800 rounded mb-2" />
                  <div className="flex items-center gap-4">
                    <div className="h-3 w-28 bg-zinc-800/50 rounded" />
                    <div className="h-3 w-20 bg-zinc-800/50 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar skeletons */}
          <div className="space-y-6">
            {/* Wallet card skeleton */}
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 animate-pulse">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-4 w-4 bg-zinc-800/60 rounded" />
                <div className="h-4 w-24 bg-zinc-800/60 rounded" />
              </div>
              <div className="h-8 w-28 bg-zinc-800 rounded mb-2" />
              <div className="h-3 w-20 bg-zinc-800/50 rounded" />
            </div>

            {/* Transactions list skeleton */}
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80 animate-pulse">
              <div className="h-4 w-36 bg-zinc-800/60 rounded mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-zinc-800/60 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-3 w-32 bg-zinc-800/50 rounded mb-1" />
                      <div className="h-2 w-16 bg-zinc-800/30 rounded" />
                    </div>
                    <div className="h-3 w-14 bg-zinc-800/50 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Demo Mode Banner */}
      <div className="mb-6 p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
        <p className="text-xs text-amber-400">
          Dashboard preview — authentication coming soon. Showing all network data.
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-950/30 border border-red-800/40 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-400">{error}</p>
        </div>
      )}

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
          {businesses.map((biz) => {
            const servicesCount = biz.services?.[0]?.count ?? 0
            return (
              <Link
                key={biz.slug}
                href={`/business/${biz.slug}`}
                className="flex items-center gap-5 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors group"
              >
                <ScoreGauge score={biz.audit_score ?? 0} size="sm" showLabel={false} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1">
                    <h3 className="font-semibold text-zinc-100 truncate group-hover:text-white transition-colors">
                      {biz.name}
                    </h3>
                    <TierBadge tier={(biz.audit_tier || 'unaudited') as AuditTier} size="sm" />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span>{biz.domain || 'No domain'}</span>
                    <span>{servicesCount} service{servicesCount !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
              </Link>
            )
          })}

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
            {wallets.length > 0 ? (
              <>
                <div className="text-3xl font-bold tracking-tight mb-1">
                  {formatCurrency(totalBalance)}
                </div>
                <div className="text-xs text-zinc-500">
                  {wallets.length} wallet{wallets.length !== 1 ? 's' : ''} active
                </div>
              </>
            ) : (
              <>
                <div className="text-3xl font-bold tracking-tight mb-1 text-zinc-600">
                  $0.00
                </div>
                <div className="text-xs text-zinc-500">
                  No wallets created yet
                </div>
              </>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <h3 className="text-sm font-semibold text-zinc-400 mb-4">
              Recent Transactions
            </h3>
            {transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map((tx) => {
                  // Determine direction: if any of user's wallets is the seller, it's incoming
                  const isIncoming = walletIds.has(tx.seller_wallet_id)
                  return (
                    <div key={tx.id} className="flex items-center gap-3">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0 ${
                          isIncoming
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {isIncoming ? (
                          <ArrowDownLeft className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-zinc-300 truncate">
                          {tx.service_description || 'Transaction'}
                        </div>
                        <div className="text-[10px] text-zinc-600">{timeAgo(tx.created_at)}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div
                          className={`text-xs font-semibold tabular-nums ${
                            isIncoming
                              ? 'text-emerald-400'
                              : 'text-zinc-400'
                          }`}
                        >
                          {isIncoming ? '+' : '-'}{formatCurrency(tx.amount)}
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
                  )
                })}
              </div>
            ) : (
              <p className="text-xs text-zinc-600 text-center py-4">
                No transactions yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
