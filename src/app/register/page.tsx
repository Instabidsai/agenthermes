'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Building2,
  Globe,
  Mail,
  FileText,
  Tag,
  Layers,
  Loader2,
  AlertCircle,
} from 'lucide-react'

const verticalOptions = [
  '',
  'legal',
  'finance',
  'healthcare',
  'marketing',
  'engineering',
  'data',
  'logistics',
  'real-estate',
  'education',
  'other',
]

export default function RegisterPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    domain: '',
    description: '',
    owner_email: '',
    vertical: '',
    capabilities: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name.trim()) {
      setError('Business name is required.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const capArray = form.capabilities
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)

      const res = await fetch('/api/v1/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          domain: form.domain.trim() || null,
          description: form.description.trim() || null,
          owner_email: form.owner_email.trim() || null,
          vertical: form.vertical || null,
          capabilities: capArray,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed. Please try again.')
        return
      }

      router.push(`/business/${data.slug}`)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Register Your Business
        </h1>
        <p className="text-sm text-zinc-500">
          Add your business to the AgentHermes verified commerce network.
          Once registered, run an audit to get your trust score.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name */}
        <div>
          <label
            htmlFor="name"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2"
          >
            <Building2 className="h-4 w-4 text-zinc-500" />
            Business Name
            <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Acme Legal AI"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
          />
        </div>

        {/* Domain */}
        <div>
          <label
            htmlFor="domain"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2"
          >
            <Globe className="h-4 w-4 text-zinc-500" />
            Domain
          </label>
          <input
            id="domain"
            type="text"
            placeholder="acmelegal.ai"
            value={form.domain}
            onChange={(e) => update('domain', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2"
          >
            <FileText className="h-4 w-4 text-zinc-500" />
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            placeholder="What does your business do? What services do you offer to agents?"
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors resize-none"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2"
          >
            <Mail className="h-4 w-4 text-zinc-500" />
            Owner Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={form.owner_email}
            onChange={(e) => update('owner_email', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
          />
        </div>

        {/* Vertical */}
        <div>
          <label
            htmlFor="vertical"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2"
          >
            <Tag className="h-4 w-4 text-zinc-500" />
            Vertical
          </label>
          <select
            id="vertical"
            value={form.vertical}
            onChange={(e) => update('vertical', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
          >
            <option value="">Select a vertical...</option>
            {verticalOptions.filter(Boolean).map((v) => (
              <option key={v} value={v}>
                {v.charAt(0).toUpperCase() + v.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Capabilities */}
        <div>
          <label
            htmlFor="capabilities"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2"
          >
            <Layers className="h-4 w-4 text-zinc-500" />
            Capabilities
          </label>
          <input
            id="capabilities"
            type="text"
            placeholder="contract-review, compliance-check, data-enrichment"
            value={form.capabilities}
            onChange={(e) => update('capabilities', e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
          />
          <p className="text-[10px] text-zinc-600 mt-1.5">
            Comma-separated list of capabilities agents can search for.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting || !form.name.trim()}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-emerald-400 text-white font-semibold text-sm transition-colors"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            <>
              <Building2 className="h-4 w-4" />
              Register Business
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-zinc-600">
          Registration is free. After registering, run an audit to receive
          your trust tier and become discoverable by agents.
        </p>
      </form>
    </div>
  )
}
