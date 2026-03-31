'use client'

import { useEffect, useState } from 'react'
import { Users, Filter, RefreshCw, Mail, Phone, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type LeadStatus = 'new' | 'contacted' | 'converted'

interface LeadRow {
  id: string
  business_id: string | null
  tool_called: string
  input: Record<string, any>
  agent_id: string | null
  status: LeadStatus
  created_at: string
}

const statusConfig: Record<
  LeadStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  new: {
    label: 'New',
    bg: 'bg-blue-950/50',
    text: 'text-blue-400',
    border: 'border-blue-800/50',
  },
  contacted: {
    label: 'Contacted',
    bg: 'bg-amber-950/50',
    text: 'text-amber-400',
    border: 'border-amber-800/50',
  },
  converted: {
    label: 'Converted',
    bg: 'bg-emerald-950/50',
    text: 'text-emerald-400',
    border: 'border-emerald-700/50',
  },
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function extractCustomerInfo(input: Record<string, any>): {
  name: string
  email: string
  phone: string
  service: string
} {
  return {
    name:
      input.customer_name ||
      input.name ||
      input.contact_name ||
      input.full_name ||
      'Unknown',
    email: input.email || input.contact_email || '',
    phone: input.phone || input.phone_number || input.contact_phone || '',
    service:
      input.service ||
      input.service_type ||
      input.category ||
      input.subject ||
      '',
  }
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadRow[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all')
  const [error, setError] = useState<string | null>(null)

  async function fetchLeads() {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('agent_leads')
        .select(
          'id, business_id, tool_called, input, agent_id, status, created_at'
        )
        .order('created_at', { ascending: false })
        .limit(100)

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }

      const { data, error: queryError } = await query

      if (queryError) {
        setError(queryError.message)
        setLeads([])
        return
      }

      setLeads((data || []) as LeadRow[])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leads')
      setLeads([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  const statusCounts = leads.reduce(
    (acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-emerald-400" />
            Agent Leads
          </h1>
          <p className="text-zinc-400 mt-1">
            Leads captured by AI agents interacting with your business
          </p>
        </div>
        <button
          onClick={fetchLeads}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Status Filter Chips */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-4 w-4 text-zinc-500" />
        {(['all', 'new', 'contacted', 'converted'] as const).map((s) => {
          const isActive = statusFilter === s
          const count =
            s === 'all'
              ? leads.length
              : statusCounts[s] || 0
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3 py-1 text-sm font-medium border transition-colors ${
                isActive
                  ? 'bg-emerald-600/20 text-emerald-400 border-emerald-600/50'
                  : 'bg-zinc-800/50 text-zinc-400 border-zinc-700 hover:bg-zinc-700/50'
              }`}
            >
              {s === 'all' ? 'All' : statusConfig[s].label}
              {' '}
              <span className="text-xs opacity-70">({count})</span>
            </button>
          )
        })}
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-lg border border-red-800/50 bg-red-950/30 p-4 mb-6 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-16 text-zinc-500">Loading leads...</div>
      )}

      {/* Empty State */}
      {!loading && !error && leads.length === 0 && (
        <div className="text-center py-16">
          <Users className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 text-lg">No leads yet</p>
          <p className="text-zinc-600 text-sm mt-2">
            When AI agents capture leads for your business, they will appear
            here.
          </p>
        </div>
      )}

      {/* Leads Table */}
      {!loading && leads.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Date
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Tool Called
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Customer
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Contact
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Service
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {leads.map((lead) => {
                const info = extractCustomerInfo(lead.input)
                const cfg = statusConfig[lead.status] || statusConfig.new
                return (
                  <tr
                    key={lead.id}
                    className="hover:bg-zinc-800/30 transition-colors"
                  >
                    {/* Date */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span title={new Date(lead.created_at).toLocaleString()}>
                          {timeAgo(lead.created_at)}
                        </span>
                      </div>
                    </td>

                    {/* Tool Called */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-block rounded bg-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-300">
                        {lead.tool_called}
                      </span>
                      {lead.agent_id && (
                        <span className="ml-2 text-xs text-zinc-600">
                          via {lead.agent_id}
                        </span>
                      )}
                    </td>

                    {/* Customer Name */}
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-zinc-200 font-medium">
                      {info.name}
                    </td>

                    {/* Contact Info */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        {info.email && (
                          <span className="flex items-center gap-1 text-xs text-zinc-400">
                            <Mail className="h-3 w-3" />
                            {info.email}
                          </span>
                        )}
                        {info.phone && (
                          <span className="flex items-center gap-1 text-xs text-zinc-400">
                            <Phone className="h-3 w-3" />
                            {info.phone}
                          </span>
                        )}
                        {!info.email && !info.phone && (
                          <span className="text-xs text-zinc-600">--</span>
                        )}
                      </div>
                    </td>

                    {/* Service */}
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-zinc-400">
                      {info.service || '--'}
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.text} ${cfg.border}`}
                      >
                        {cfg.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
