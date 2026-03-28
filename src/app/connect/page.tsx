'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import {
  Shield,
  Server,
  Wrench,
  CheckCircle,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Copy,
  ExternalLink,
  AlertCircle,
} from 'lucide-react'
import clsx from 'clsx'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ActionRow {
  name: string
  method: string
  path: string
  description: string
  cost_per_call: string
}

interface FormData {
  // Step 1
  name: string
  domain: string
  description: string
  category: string
  // Step 2
  api_base_url: string
  auth_type: string
  auth_header: string
  api_key: string
  // Step 3
  actions: ActionRow[]
}

const CATEGORIES = [
  { value: 'ai', label: 'AI' },
  { value: 'video', label: 'Video' },
  { value: 'voice', label: 'Voice' },
  { value: 'media', label: 'Media' },
  { value: 'database', label: 'Database' },
  { value: 'payments', label: 'Payments' },
  { value: 'communication', label: 'Communication' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'other', label: 'Other' },
]

const AUTH_TYPES = [
  { value: 'bearer', label: 'Bearer Token' },
  { value: 'api_key_header', label: 'API Key Header' },
  { value: 'basic', label: 'Basic Auth' },
  { value: 'query_param', label: 'Query Parameter' },
]

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

const STEPS = [
  { number: 1, label: 'Basic Info', icon: Shield },
  { number: 2, label: 'API Config', icon: Server },
  { number: 3, label: 'Actions', icon: Wrench },
  { number: 4, label: 'Review', icon: CheckCircle },
]

const emptyAction: ActionRow = {
  name: '',
  method: 'POST',
  path: '',
  description: '',
  cost_per_call: '0',
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ConnectPage() {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ id: string; name: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const [form, setForm] = useState<FormData>({
    name: '',
    domain: '',
    description: '',
    category: 'ai',
    api_base_url: '',
    auth_type: 'bearer',
    auth_header: 'Authorization',
    api_key: '',
    actions: [{ ...emptyAction }],
  })

  // -- helpers --

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const updateAction = useCallback(
    (index: number, field: keyof ActionRow, value: string) => {
      setForm((prev) => {
        const actions = [...prev.actions]
        actions[index] = { ...actions[index], [field]: value }
        return { ...prev, actions }
      })
    },
    []
  )

  const addAction = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      actions: [...prev.actions, { ...emptyAction }],
    }))
  }, [])

  const removeAction = useCallback((index: number) => {
    setForm((prev) => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index),
    }))
  }, [])

  // -- validation per step --

  function isValidUrl(str: string): boolean {
    try {
      const url = new URL(str)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      return false
    }
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return form.name.trim().length > 0
      case 2:
        return form.api_base_url.trim().length > 0 && isValidUrl(form.api_base_url.trim())
      case 3:
        return form.actions.length > 0 && form.actions.every(
          (a) => a.name.trim().length > 0 && a.path.trim().length > 0
        )
      default:
        return true
    }
  }

  // -- submit --

  async function handleSubmit() {
    setSubmitting(true)
    setError(null)

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      api_base_url: form.api_base_url.trim(),
      auth_type: form.auth_type,
      auth_header: form.auth_header.trim() || 'Authorization',
      credentials: form.api_key
        ? { api_key: form.api_key }
        : undefined,
      actions: form.actions
        .filter((a) => a.name.trim() && a.path.trim())
        .map((a) => ({
          name: a.name.trim(),
          method: a.method,
          path: a.path.trim(),
          description: a.description.trim(),
          cost_override: parseFloat(a.cost_per_call) || undefined,
        })),
      cost_per_call: parseFloat(form.actions[0]?.cost_per_call || '0') || 0,
      category: form.category,
    }

    try {
      const res = await fetch('/api/v1/gateway', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || `Request failed (${res.status})`)
        setSubmitting(false)
        return
      }

      setResult({ id: data.id, name: data.name })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setSubmitting(false)
    }
  }

  function copyId() {
    if (!result) return
    navigator.clipboard.writeText(result.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // Success state
  if (result) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="rounded-2xl border border-emerald-500/20 bg-zinc-900/60 p-8 sm:p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Service Connected
            </h1>
            <p className="text-zinc-400 mb-8">
              <strong className="text-zinc-200">{result.name}</strong> is now live on the AgentHermes gateway.
              AI agents can discover and use it immediately.
            </p>

            {/* Service ID */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 mb-8">
              <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold mb-2">
                Service ID
              </div>
              <div className="flex items-center justify-center gap-3">
                <code className="text-sm font-mono text-emerald-400 break-all">
                  {result.id}
                </code>
                <button
                  onClick={copyId}
                  className="flex-shrink-0 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                  aria-label="Copy service ID"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-zinc-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/gateway/${result.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
              >
                View Service Page
                <ExternalLink className="h-4 w-4" />
              </Link>
              <Link
                href="/gateway"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 text-sm font-medium transition-colors"
              >
                Browse Gateway
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear_gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Connect Your Service to{' '}
            <span className="text-emerald-500">AgentHermes</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Make your API available to every AI agent in the network. We handle auth, billing, and discovery.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s, i) => {
            const isActive = step === s.number
            const isDone = step > s.number
            return (
              <div key={s.number} className="flex items-center">
                <button
                  onClick={() => {
                    if (isDone) setStep(s.number)
                  }}
                  disabled={!isDone}
                  className={clsx(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
                    isDone && 'text-zinc-300 hover:bg-zinc-800/60 cursor-pointer',
                    !isActive && !isDone && 'text-zinc-600 cursor-default'
                  )}
                >
                  {isDone ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <s.icon className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                  <span className="sm:hidden">{s.number}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={clsx(
                      'w-6 sm:w-10 h-px mx-1',
                      step > s.number ? 'bg-emerald-500/40' : 'bg-zinc-800'
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-300 font-medium">Connection failed</p>
              <p className="text-sm text-red-400/80 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Form card */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 sm:p-8">
          {/* ============================================================= */}
          {/* Step 1: Basic Info                                             */}
          {/* ============================================================= */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold tracking-tight mb-1">Basic Information</h2>
                <p className="text-sm text-zinc-500">
                  Tell us about your service so agents can discover it.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Business / Service Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="e.g., HeyGen"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="domain" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Domain
                  </label>
                  <input
                    id="domain"
                    type="text"
                    value={form.domain}
                    onChange={(e) => updateField('domain', e.target.value)}
                    placeholder="e.g., heygen.com"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    rows={3}
                    placeholder="What does your service do? How would an agent use it?"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Category
                  </label>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* Step 2: API Configuration                                     */}
          {/* ============================================================= */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold tracking-tight mb-1">API Configuration</h2>
                <p className="text-sm text-zinc-500">
                  How do we connect to your API? Credentials are encrypted at rest.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="api_base_url" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    API Base URL <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="api_base_url"
                    type="url"
                    value={form.api_base_url}
                    onChange={(e) => updateField('api_base_url', e.target.value)}
                    placeholder="https://api.yourservice.com"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-mono text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="auth_type" className="block text-sm font-medium text-zinc-300 mb-1.5">
                      Auth Type
                    </label>
                    <select
                      id="auth_type"
                      value={form.auth_type}
                      onChange={(e) => updateField('auth_type', e.target.value)}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                    >
                      {AUTH_TYPES.map((a) => (
                        <option key={a.value} value={a.value}>
                          {a.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="auth_header" className="block text-sm font-medium text-zinc-300 mb-1.5">
                      Auth Header Name
                    </label>
                    <input
                      id="auth_header"
                      type="text"
                      value={form.auth_header}
                      onChange={(e) => updateField('auth_header', e.target.value)}
                      placeholder="Authorization"
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-mono text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="api_key" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    API Key / Token
                  </label>
                  <div className="relative">
                    <input
                      id="api_key"
                      type="password"
                      value={form.api_key}
                      onChange={(e) => updateField('api_key', e.target.value)}
                      placeholder="sk-..."
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-mono text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-zinc-600">
                    Encrypted with AES-256-GCM before storage. Never stored in plaintext.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* Step 3: Define Actions                                        */}
          {/* ============================================================= */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold tracking-tight mb-1">Define Actions</h2>
                <p className="text-sm text-zinc-500">
                  What can agents do with your API? Define each callable action.
                </p>
              </div>

              <div className="space-y-4">
                {form.actions.map((action, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                        Action {i + 1}
                      </span>
                      {form.actions.length > 1 && (
                        <button
                          onClick={() => removeAction(i)}
                          className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          aria-label={`Remove action ${i + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">
                          Action Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={action.name}
                          onChange={(e) => updateAction(i, 'name', e.target.value)}
                          placeholder="create_video"
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">
                          HTTP Method
                        </label>
                        <select
                          value={action.method}
                          onChange={(e) => updateAction(i, 'method', e.target.value)}
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                        >
                          {HTTP_METHODS.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">
                          Path <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={action.path}
                          onChange={(e) => updateAction(i, 'path', e.target.value)}
                          placeholder="/v1/videos"
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">
                          Cost per Call (USD)
                        </label>
                        <input
                          type="number"
                          step="0.001"
                          min="0"
                          value={action.cost_per_call}
                          onChange={(e) => updateAction(i, 'cost_per_call', e.target.value)}
                          placeholder="0.00"
                          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={action.description}
                        onChange={(e) => updateAction(i, 'description', e.target.value)}
                        placeholder="What does this action do?"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={addAction}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-zinc-700 text-sm text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Action
                </button>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* Step 4: Review & Connect                                      */}
          {/* ============================================================= */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold tracking-tight mb-1">Review & Connect</h2>
                <p className="text-sm text-zinc-500">
                  Confirm your settings. You can edit these later.
                </p>
              </div>

              {/* Service overview */}
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/50 divide-y divide-zinc-800/60">
                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Service</span>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div className="px-5 py-4 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-zinc-400">Name</span>
                    <span className="text-sm font-medium text-zinc-200">{form.name}</span>
                  </div>
                  {form.domain && (
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-zinc-400">Domain</span>
                      <span className="text-sm font-mono text-zinc-300">{form.domain}</span>
                    </div>
                  )}
                  {form.description && (
                    <div className="flex items-baseline justify-between gap-8">
                      <span className="text-sm text-zinc-400 flex-shrink-0">Description</span>
                      <span className="text-sm text-zinc-300 text-right">{form.description}</span>
                    </div>
                  )}
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-zinc-400">Category</span>
                    <span className="text-sm text-zinc-300 capitalize">{form.category}</span>
                  </div>
                </div>
              </div>

              {/* API config */}
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/50 divide-y divide-zinc-800/60">
                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">API Configuration</span>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div className="px-5 py-4 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-zinc-400">Base URL</span>
                    <code className="text-sm font-mono text-zinc-300">{form.api_base_url}</code>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-zinc-400">Auth Type</span>
                    <span className="text-sm text-zinc-300">
                      {AUTH_TYPES.find((a) => a.value === form.auth_type)?.label}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-zinc-400">Auth Header</span>
                    <code className="text-sm font-mono text-zinc-300">{form.auth_header}</code>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-zinc-400">API Key</span>
                    <span className="text-sm text-zinc-300">
                      {form.api_key ? '********' + form.api_key.slice(-4) : 'Not provided'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/50 divide-y divide-zinc-800/60">
                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                    Actions ({form.actions.filter((a) => a.name.trim()).length})
                  </span>
                  <button
                    onClick={() => setStep(3)}
                    className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div className="px-5 py-4">
                  <div className="space-y-2">
                    {form.actions
                      .filter((a) => a.name.trim())
                      .map((action, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <span
                            className={clsx(
                              'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border',
                              action.method === 'GET' && 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                              action.method === 'POST' && 'text-blue-400 bg-blue-500/10 border-blue-500/20',
                              action.method === 'PUT' && 'text-violet-400 bg-violet-500/10 border-violet-500/20',
                              action.method === 'PATCH' && 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                              action.method === 'DELETE' && 'text-red-400 bg-red-500/10 border-red-500/20'
                            )}
                          >
                            {action.method}
                          </span>
                          <code className="font-mono text-zinc-300">{action.name}</code>
                          <code className="font-mono text-zinc-500">{action.path}</code>
                          {parseFloat(action.cost_per_call) > 0 && (
                            <span className="text-zinc-500 ml-auto">${action.cost_per_call}</span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* Navigation buttons                                            */}
          {/* ============================================================= */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800/80">
            {step > 1 ? (
              <button
                onClick={() => {
                  setStep(step - 1)
                  setError(null)
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-sm font-medium text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => {
                  setStep(step + 1)
                  setError(null)
                }}
                disabled={!canAdvance()}
                className={clsx(
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                  canAdvance()
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                )}
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={clsx(
                  'inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                  submitting
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                )}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wrench className="h-4 w-4" />
                    Connect Service
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
