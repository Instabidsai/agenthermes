'use client'

import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
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
  Sparkles,
  Building2,
  Thermometer,
  TreePine,
  Droplets,
  Home,
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Scale,
  Calculator,
  Stethoscope,
  Briefcase,
  Cloud,
  Palette,
  LayoutGrid,
  Store,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import clsx from 'clsx'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import {
  getAllTemplates,
  getTemplateById,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type VerticalTemplate,
  type VerticalCategory,
} from '@/lib/verticals/templates'
import { previewMcpTools } from '@/lib/verticals/mcp-generator'

// ---------------------------------------------------------------------------
// Icon map — maps template icon string to Lucide component
// ---------------------------------------------------------------------------

const ICON_MAP: Record<string, LucideIcon> = {
  Thermometer,
  TreePine,
  Droplets,
  Sparkles,
  Home,
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Scale,
  Calculator,
  Stethoscope,
  Building2,
  Briefcase,
  Cloud,
  Palette,
}

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || LayoutGrid
}

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
  // Step 0 (vertical selection)
  vertical_id: string | null
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
  { value: 'local_services', label: 'Local Services' },
  { value: 'professional', label: 'Professional Services' },
  { value: 'retail', label: 'Retail' },
  { value: 'tech', label: 'Tech / SaaS' },
  { value: 'other', label: 'Other' },
]

const AUTH_TYPES = [
  { value: 'bearer', label: 'Bearer Token' },
  { value: 'api_key_header', label: 'API Key Header' },
  { value: 'basic', label: 'Basic Auth' },
  { value: 'query_param', label: 'Query Parameter' },
  { value: 'none', label: 'No Auth (Hermes-managed)' },
]

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

const STEPS = [
  { number: 0, label: 'Business Type', icon: LayoutGrid },
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
// Category color map for tool badges
// ---------------------------------------------------------------------------

const TOOL_CATEGORY_COLORS: Record<string, string> = {
  find: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  understand: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  evaluate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  book: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  pay: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  follow_up: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ConnectPage() {
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ id: string; name: string } | null>(null)
  const [copied, setCopied] = useState(false)

  // Shopify auto-detection state
  const [shopifyDetection, setShopifyDetection] = useState<{
    detecting: boolean
    detected: boolean
    confidence: string | null
    details: string | null
    tools: { name: string; description: string }[]
    toolCount: number
  }>({
    detecting: false,
    detected: false,
    confidence: null,
    details: null,
    tools: [],
    toolCount: 0,
  })
  const [shopifyAccepted, setShopifyAccepted] = useState(false)
  const shopifyDetectTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastDetectedDomain = useRef<string>('')

  const [form, setForm] = useState<FormData>({
    vertical_id: null,
    name: '',
    domain: '',
    description: '',
    category: 'other',
    api_base_url: '',
    auth_type: 'none',
    auth_header: 'Authorization',
    api_key: '',
    actions: [{ ...emptyAction }],
  })

  // Shopify auto-detection: debounce domain changes and probe for Shopify
  useEffect(() => {
    const domain = form.domain.trim()

    // Clear if domain is empty or too short
    if (domain.length < 4 || !domain.includes('.')) {
      if (shopifyDetection.detected || shopifyDetection.detecting) {
        setShopifyDetection({
          detecting: false,
          detected: false,
          confidence: null,
          details: null,
          tools: [],
          toolCount: 0,
        })
        setShopifyAccepted(false)
        lastDetectedDomain.current = ''
      }
      return
    }

    // Skip if we already detected this domain
    if (domain === lastDetectedDomain.current) return

    // Debounce: wait 800ms after typing stops
    if (shopifyDetectTimer.current) clearTimeout(shopifyDetectTimer.current)
    shopifyDetectTimer.current = setTimeout(async () => {
      lastDetectedDomain.current = domain
      setShopifyDetection((prev) => ({ ...prev, detecting: true }))
      setShopifyAccepted(false)

      try {
        const res = await fetch('/api/v1/detect-shopify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: domain }),
        })
        const data = await res.json()

        if (data.detected) {
          setShopifyDetection({
            detecting: false,
            detected: true,
            confidence: data.confidence,
            details: data.details,
            tools: (data.tools || []).map((t: { name: string; description: string }) => ({
              name: t.name,
              description: t.description,
            })),
            toolCount: data.tool_count || data.tools?.length || 0,
          })
        } else {
          setShopifyDetection({
            detecting: false,
            detected: false,
            confidence: null,
            details: null,
            tools: [],
            toolCount: 0,
          })
        }
      } catch {
        setShopifyDetection({
          detecting: false,
          detected: false,
          confidence: null,
          details: null,
          tools: [],
          toolCount: 0,
        })
      }
    }, 800)

    return () => {
      if (shopifyDetectTimer.current) clearTimeout(shopifyDetectTimer.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.domain])

  // When Shopify is accepted, pre-fill actions from the detected tools
  const acceptShopifyTools = useCallback(() => {
    setShopifyAccepted(true)
    const prefilled: ActionRow[] = shopifyDetection.tools.slice(0, 5).map((t) => ({
      name: t.name,
      method: 'GET',
      path: `/v1/${t.name}`,
      description: t.description,
      cost_per_call: '0',
    }))
    setForm((prev) => ({
      ...prev,
      category: 'retail',
      actions: prefilled.length > 0 ? prefilled : prev.actions,
      api_base_url: prev.domain.trim()
        ? (prev.domain.trim().startsWith('http') ? prev.domain.trim() : `https://${prev.domain.trim()}`)
        : prev.api_base_url,
      auth_type: 'none',
    }))
  }, [shopifyDetection.tools])

  // Derived data
  const selectedTemplate = useMemo(
    () => (form.vertical_id ? getTemplateById(form.vertical_id) : null),
    [form.vertical_id]
  )

  const previewTools = useMemo(
    () => (form.vertical_id ? previewMcpTools(form.vertical_id) : []),
    [form.vertical_id]
  )

  const allTemplates = useMemo(() => getAllTemplates(), [])

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

  const selectVertical = useCallback(
    (template: VerticalTemplate) => {
      // Pre-fill actions from the template MCP tools
      const prefilled: ActionRow[] = template.mcpTools.slice(0, 5).map((t) => ({
        name: t.name,
        method: 'POST',
        path: `/v1/${t.name}`,
        description: t.description,
        cost_per_call: '0',
      }))

      // Map vertical category to form category
      const catMap: Record<VerticalCategory, string> = {
        local_services: 'local_services',
        professional: 'professional',
        retail: 'retail',
        tech: 'tech',
        emerging: 'other',
      }

      setForm((prev) => ({
        ...prev,
        vertical_id: template.id,
        description: prev.description || template.description,
        category: catMap[template.category] || 'other',
        actions: prefilled.length > 0 ? prefilled : prev.actions,
      }))
      setStep(1)
    },
    []
  )

  const skipVertical = useCallback(() => {
    setForm((prev) => ({ ...prev, vertical_id: null }))
    setStep(1)
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
      case 0:
        return true // can always skip or select
      case 1:
        return form.name.trim().length > 0
      case 2:
        // If they selected a vertical and chose "no auth", API base URL is optional
        if (form.vertical_id && form.auth_type === 'none') return true
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
      api_base_url: form.api_base_url.trim() || null,
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
      vertical_id: form.vertical_id || undefined,
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
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://agenthermes.ai' },
        { name: 'Connect', url: 'https://agenthermes.ai/connect' },
      ]} />
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Connect Your Business to{' '}
            <span className="text-emerald-500">AgentHermes</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            {step === 0
              ? 'Select your business type and we\'ll generate the MCP tools AI agents need to work with you.'
              : 'Make your API available to every AI agent in the network. We handle auth, billing, and discovery.'}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10 overflow-x-auto">
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
                    'flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors',
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
                      'w-4 sm:w-8 h-px mx-0.5 sm:mx-1',
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

        {/* ============================================================= */}
        {/* Step 0: Vertical Selection                                     */}
        {/* ============================================================= */}
        {step === 0 && (
          <div className="space-y-8">
            {/* Vertical grid by category */}
            {CATEGORY_ORDER.map((cat) => {
              const templates = allTemplates.filter((t) => t.category === cat)
              if (templates.length === 0) return null
              return (
                <div key={cat}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                    {CATEGORY_LABELS[cat]}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {templates.map((template) => {
                      const Icon = getIcon(template.icon)
                      const isSelected = form.vertical_id === template.id
                      return (
                        <button
                          key={template.id}
                          onClick={() => selectVertical(template)}
                          className={clsx(
                            'group relative text-left rounded-xl border p-4 transition-all',
                            isSelected
                              ? 'border-emerald-500/40 bg-emerald-500/5 ring-1 ring-emerald-500/20'
                              : 'border-zinc-800/80 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900/80'
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={clsx(
                                'flex h-10 w-10 items-center justify-center rounded-lg border flex-shrink-0',
                                isSelected
                                  ? 'bg-emerald-500/10 border-emerald-500/20'
                                  : 'bg-zinc-800/50 border-zinc-700/50 group-hover:border-zinc-600/50'
                              )}
                            >
                              <Icon
                                className={clsx(
                                  'h-5 w-5',
                                  isSelected ? 'text-emerald-400' : 'text-zinc-400 group-hover:text-zinc-300'
                                )}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-zinc-200 mb-0.5">
                                {template.name}
                              </div>
                              <div className="text-xs text-zinc-500 line-clamp-2">
                                {template.description}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-[10px]">
                            <span className="text-emerald-500/80 font-medium">
                              {template.mcpTools.length + 2} MCP tools
                            </span>
                            <span className="text-zinc-700">|</span>
                            <span className="text-zinc-500">
                              {template.leadValue}/lead
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Selected vertical preview */}
            {selectedTemplate && (
              <div className="rounded-2xl border border-emerald-500/20 bg-zinc-900/60 p-6">
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const Icon = getIcon(selectedTemplate.icon)
                    return (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Icon className="h-5 w-5 text-emerald-400" />
                      </div>
                    )
                  })()}
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100">{selectedTemplate.name}</h3>
                    <p className="text-xs text-zinc-500">{selectedTemplate.description}</p>
                  </div>
                </div>

                {/* Example agent query */}
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-4 mb-4">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-2">
                    Example Agent Query
                  </div>
                  <p className="text-sm text-zinc-300 italic">
                    &ldquo;{selectedTemplate.exampleAgentQuery}&rdquo;
                  </p>
                </div>

                {/* Preview tools */}
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-2">
                  MCP Tools Generated ({previewTools.length})
                </div>
                <div className="space-y-1.5">
                  {previewTools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center gap-3 rounded-lg border border-zinc-800/60 bg-zinc-950/30 px-3 py-2"
                    >
                      <span
                        className={clsx(
                          'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border',
                          TOOL_CATEGORY_COLORS[tool.category] || TOOL_CATEGORY_COLORS.find
                        )}
                      >
                        {tool.category}
                      </span>
                      <code className="text-xs font-mono text-emerald-400">{tool.name}</code>
                      <span className="text-xs text-zinc-500 hidden sm:inline truncate">
                        {tool.description}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Fulfillment options */}
                <div className="mt-4">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-2">
                    Fulfillment Options
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTemplate.fulfillmentOptions.map((opt) => (
                      <span
                        key={opt}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-800/60 text-zinc-400 border border-zinc-700/50"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation for step 0 */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
              <div />
              <div className="flex items-center gap-3">
                <button
                  onClick={skipVertical}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-sm font-medium text-zinc-400 hover:border-zinc-600 hover:text-zinc-300 transition-colors"
                >
                  Skip — I have an API
                </button>
                {selectedTemplate && (
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
                  >
                    Continue with {selectedTemplate.name}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Form card for steps 1-4 */}
        {step >= 1 && (
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 sm:p-8">
            {/* Selected vertical badge */}
            {selectedTemplate && step >= 1 && step <= 3 && (
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-800/60">
                {(() => {
                  const Icon = getIcon(selectedTemplate.icon)
                  return <Icon className="h-4 w-4 text-emerald-400" />
                })()}
                <span className="text-sm font-medium text-zinc-300">{selectedTemplate.name}</span>
                <button
                  onClick={() => { setStep(0); setForm((prev) => ({ ...prev, vertical_id: null })) }}
                  className="ml-auto text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
                >
                  Change
                </button>
              </div>
            )}

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
                      placeholder={selectedTemplate ? `e.g., ${selectedTemplate.name.split('/')[0].trim()} Pro` : 'e.g., HeyGen'}
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
                      placeholder="e.g., yourbusiness.com"
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                    />

                    {/* Shopify detecting spinner */}
                    {shopifyDetection.detecting && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Checking for Shopify store...
                      </div>
                    )}

                    {/* Shopify detected banner */}
                    {shopifyDetection.detected && !shopifyAccepted && (
                      <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0">
                            <Store className="h-5 w-5 text-emerald-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-emerald-400">
                                Shopify Store Detected
                              </span>
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                {shopifyDetection.confidence}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 mb-3">
                              We can auto-generate {shopifyDetection.toolCount} MCP tools from your product catalog.
                              Agents will be able to search products, check availability, browse collections, and more.
                            </p>

                            {/* Preview of tools */}
                            <div className="space-y-1 mb-3">
                              {shopifyDetection.tools.map((tool) => (
                                <div
                                  key={tool.name}
                                  className="flex items-center gap-2 text-xs"
                                >
                                  <Zap className="h-3 w-3 text-emerald-500/60 flex-shrink-0" />
                                  <code className="text-emerald-400/80 font-mono text-[11px]">{tool.name}</code>
                                  <span className="text-zinc-600 truncate hidden sm:inline">
                                    {tool.description.length > 60 ? tool.description.slice(0, 60) + '...' : tool.description}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <button
                              onClick={acceptShopifyTools}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                            >
                              <Sparkles className="h-3.5 w-3.5" />
                              Auto-Generate {shopifyDetection.toolCount} MCP Tools
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Shopify accepted confirmation */}
                    {shopifyAccepted && (
                      <div className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-xs text-emerald-400">
                          {shopifyDetection.toolCount} Shopify MCP tools auto-generated. API config and actions pre-filled.
                        </span>
                        <button
                          onClick={() => {
                            setShopifyAccepted(false)
                            setForm((prev) => ({
                              ...prev,
                              category: 'other',
                              actions: [{ ...emptyAction }],
                              api_base_url: '',
                              auth_type: 'none',
                            }))
                          }}
                          className="ml-auto text-[10px] text-zinc-500 hover:text-zinc-400 transition-colors"
                        >
                          Undo
                        </button>
                      </div>
                    )}
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
                    {selectedTemplate
                      ? 'Optional: connect your existing API. If you skip this, Hermes manages fulfillment via your chosen method.'
                      : 'How do we connect to your API? Credentials are encrypted at rest.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="api_base_url" className="block text-sm font-medium text-zinc-300 mb-1.5">
                      API Base URL {!selectedTemplate && <span className="text-red-400">*</span>}
                    </label>
                    <input
                      id="api_base_url"
                      type="url"
                      value={form.api_base_url}
                      onChange={(e) => updateField('api_base_url', e.target.value)}
                      placeholder="https://api.yourservice.com"
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-mono text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-colors"
                    />
                    {selectedTemplate && (
                      <p className="mt-1.5 text-xs text-zinc-600">
                        Leave blank if you don&apos;t have an API yet. We&apos;ll route requests via email/SMS.
                      </p>
                    )}
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

                    {form.auth_type !== 'none' && (
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
                    )}
                  </div>

                  {form.auth_type !== 'none' && (
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
                  )}
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
                    {selectedTemplate
                      ? `Pre-filled from the ${selectedTemplate.name} template. Edit or add more.`
                      : 'What can agents do with your API? Define each callable action.'}
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

                {/* Vertical badge */}
                {selectedTemplate && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-3 flex items-center gap-3">
                    {(() => {
                      const Icon = getIcon(selectedTemplate.icon)
                      return <Icon className="h-5 w-5 text-emerald-400" />
                    })()}
                    <div>
                      <div className="text-sm font-semibold text-zinc-200">{selectedTemplate.name} Template</div>
                      <div className="text-xs text-zinc-500">
                        {previewTools.length} MCP tools will be generated
                      </div>
                    </div>
                    <button
                      onClick={() => setStep(0)}
                      className="ml-auto text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                )}

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
                      <code className="text-sm font-mono text-zinc-300">
                        {form.api_base_url || '(Hermes-managed)'}
                      </code>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-zinc-400">Auth Type</span>
                      <span className="text-sm text-zinc-300">
                        {AUTH_TYPES.find((a) => a.value === form.auth_type)?.label}
                      </span>
                    </div>
                    {form.auth_type !== 'none' && (
                      <>
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
                      </>
                    )}
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
              {step > 0 ? (
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
        )}
      </div>
    </div>
  )
}
