import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { runScan, normalizeUrl } from '@/lib/scanner'
import { callService } from '@/lib/gateway/proxy'
import { rateLimit } from '@/lib/auth'
import { logError } from '@/lib/error-logger'

export const runtime = 'nodejs'
export const maxDuration = 60

// ---------------------------------------------------------------------------
// A2A (Agent-to-Agent) Task Protocol — Google A2A spec compatible
//
// POST /api/a2a
// JSON-RPC 2.0 style:
//   { "method": "tasks/send", "params": { ... } }
//   { "method": "tasks/get",  "params": { "task_id": "..." } }
//   { "method": "tasks/cancel", "params": { "task_id": "..." } }
// ---------------------------------------------------------------------------

const VALID_SKILLS = [
  'score-business',
  'discover-businesses',
  'gateway-call',
  'check-score',
  'get-manifest',
] as const

type SkillId = (typeof VALID_SKILLS)[number]

interface A2ARequest {
  method: string
  params?: Record<string, unknown>
  id?: string | number
}

interface TaskRow {
  id: string
  agent_id: string | null
  skill_id: string
  input: Record<string, unknown> | null
  status: string
  result: Record<string, unknown> | null
  callback_url: string | null
  error: string | null
  created_at: string
  completed_at: string | null
}

// ---------------------------------------------------------------------------
// Skill executors — map skill_id to internal functions
// ---------------------------------------------------------------------------

async function executeSkill(
  skillId: SkillId,
  input: Record<string, unknown>
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  const supabase = getServiceClient()

  switch (skillId) {
    case 'score-business': {
      const url = input.url as string | undefined
      if (!url || typeof url !== 'string') {
        return { success: false, error: 'Missing required field: url' }
      }
      if (url.length > 2048) {
        return { success: false, error: 'URL too long (max 2048 characters)' }
      }
      try {
        const vertical = typeof input.vertical === 'string' ? input.vertical : null
        const scanResult = await runScan(url, { vertical })
        const domain = normalizeUrl(url)
          .replace(/^https?:\/\//, '')
          .replace(/^www\./, '')

        // Upsert business record
        let businessName = domain.split('.')[0] ?? domain
        businessName =
          businessName.charAt(0).toUpperCase() + businessName.slice(1)

        const d2 = scanResult.dimensions.find(
          (d: { dimension: string }) => d.dimension === 'D2'
        )
        const d4 = scanResult.dimensions.find(
          (d: { dimension: string }) => d.dimension === 'D4'
        )
        const mcpCheck = d2?.checks.find(
          (c: { name: string }) => c.name === 'MCP Tools List'
        )

        await supabase
          .from('businesses')
          .upsert(
            {
              domain,
              name: businessName,
              slug: domain.replace(/[^a-z0-9]+/gi, '-').toLowerCase(),
              audit_score: scanResult.total_score,
              audit_tier: scanResult.tier,
              pricing_visible: (d4?.score ?? 0) > 0,
              agent_onboarding: (d2?.score ?? 0) > 0,
              mcp_endpoints: mcpCheck?.passed ? [mcpCheck.details] : [],
              updated_at: new Date().toISOString(),
            } as any,
            { onConflict: 'domain' }
          )

        return { success: true, data: scanResult }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        return { success: false, error: msg }
      }
    }

    case 'discover-businesses': {
      const q = (input.q as string) || undefined
      const vertical = (input.vertical as string) || undefined
      const tier = (input.tier as string) || undefined
      const limit = Math.min(
        Math.max(Number(input.limit) || 20, 1),
        100
      )

      let query = supabase
        .from('businesses')
        .select(
          'id, name, slug, domain, description, audit_score, audit_tier, vertical, capabilities, mcp_endpoints',
          { count: 'exact' }
        )

      if (q) {
        const safeQ = `%${q.replace(/[^a-zA-Z0-9\s-]/g, '')}%`
        query = query.or(
          `name.ilike.${safeQ},description.ilike.${safeQ},domain.ilike.${safeQ}`
        )
      }
      if (vertical) query = query.eq('vertical', vertical)
      if (tier) {
        const mins: Record<string, number> = {
          bronze: 40,
          silver: 60,
          gold: 75,
          platinum: 90,
        }
        if (mins[tier]) query = query.gte('audit_score', mins[tier])
      }

      query = query.order('audit_score', { ascending: false }).limit(limit)

      const { data, error, count } = await query
      if (error) {
        return { success: false, error: error.message }
      }
      return {
        success: true,
        data: { businesses: data || [], total: count ?? 0 },
      }
    }

    case 'gateway-call': {
      const serviceId = input.service_id as string | undefined
      const action = input.action as string | undefined
      const params = (input.params as Record<string, unknown>) || undefined
      const walletId = input.wallet_id as string | undefined

      if (!serviceId) return { success: false, error: 'Missing service_id' }
      if (!action) return { success: false, error: 'Missing action' }
      if (!walletId) return { success: false, error: 'Missing wallet_id' }

      try {
        const result = await callService({
          service_id: serviceId,
          action,
          params,
          wallet_id: walletId,
        })
        return {
          success: result.success,
          data: {
            result: result.data,
            billing: {
              cost: result.cost,
              margin: result.margin,
              total_charged: result.cost + result.margin,
            },
            meta: {
              service_name: result.service_name,
              action_name: result.action_name,
              status_code: result.status_code,
              response_ms: result.response_ms,
            },
          },
        }
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : String(err),
        }
      }
    }

    case 'check-score': {
      const domain = input.domain as string | undefined
      if (!domain) return { success: false, error: 'Missing required field: domain' }

      const cleanDomain = domain
        .toLowerCase()
        .trim()
        .replace(/^(https?:\/\/)?(www\.)?/, '')
        .replace(/\/+$/, '')

      const { data, error } = await supabase
        .from('businesses')
        .select(
          'id, name, slug, domain, audit_score, audit_tier, updated_at'
        )
        .eq('domain', cleanDomain)
        .single()

      if (error && error.code === 'PGRST116') {
        return {
          success: true,
          data: {
            domain: cleanDomain,
            scored: false,
            message:
              'No score found for this domain. Use the "score-business" skill to scan it.',
          },
        }
      }
      if (error) {
        return { success: false, error: error.message }
      }

      const biz = data as Record<string, any>
      return {
        success: true,
        data: {
          domain: cleanDomain,
          scored: true,
          score: biz.audit_score,
          tier: biz.audit_tier,
          name: biz.name,
          profile_url: `https://agenthermes.ai/business/${biz.slug}`,
          last_updated: biz.updated_at,
        },
      }
    }

    case 'get-manifest': {
      const slug = input.slug as string | undefined
      const domain = input.domain as string | undefined

      if (!slug && !domain) {
        return {
          success: false,
          error: 'Provide either "slug" or "domain"',
        }
      }

      let query = supabase
        .from('businesses')
        .select(
          '*, services(*), audit_results(category, score, max_score, audited_at)'
        )

      if (slug) {
        query = query.eq('slug', slug)
      } else if (domain) {
        const cleanDomain = domain
          .toLowerCase()
          .trim()
          .replace(/^(https?:\/\/)?(www\.)?/, '')
          .replace(/\/+$/, '')
        query = query.eq('domain', cleanDomain)
      }

      const { data, error } = await query.single()

      if (error && error.code === 'PGRST116') {
        return { success: false, error: 'Business not found' }
      }
      if (error) {
        return { success: false, error: error.message }
      }

      const biz = data as Record<string, any>
      // Strip sensitive fields
      const {
        owner_email: _oe,
        stripe_connect_id: _sc,
        ...publicBiz
      } = biz

      return { success: true, data: publicBiz }
    }

    default:
      return { success: false, error: `Unknown skill: ${skillId}` }
  }
}

// ---------------------------------------------------------------------------
// Async callback delivery (fire-and-forget)
// ---------------------------------------------------------------------------

function deliverCallback(
  callbackUrl: string,
  taskId: string,
  result: Record<string, unknown> | null,
  error: string | null
): void {
  fetch(callbackUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      task_id: taskId,
      status: error ? 'failed' : 'completed',
      result,
      error,
      completed_at: new Date().toISOString(),
    }),
  }).catch((err) => {
    console.error(
      `[a2a] Callback delivery failed for task ${taskId}:`,
      err instanceof Error ? err.message : err
    )
  })
}

// ---------------------------------------------------------------------------
// JSON-RPC error helpers
// ---------------------------------------------------------------------------

function jsonRpcError(
  code: number,
  message: string,
  id?: string | number | null
) {
  return NextResponse.json(
    {
      jsonrpc: '2.0',
      error: { code, message },
      id: id ?? null,
    },
    { status: code === -32600 ? 400 : code === -32601 ? 404 : 200 }
  )
}

function jsonRpcSuccess(result: unknown, id?: string | number | null) {
  return NextResponse.json({
    jsonrpc: '2.0',
    result,
    id: id ?? null,
  })
}

// ---------------------------------------------------------------------------
// POST /api/a2a
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // Rate limit: 20 A2A requests per minute per IP
  const rateLimitError = rateLimit(req, 20, 60_000)
  if (rateLimitError) return rateLimitError

  const requestId = req.headers.get('x-request-id') || ''

  let body: A2ARequest
  try {
    body = await req.json()
  } catch {
    return jsonRpcError(-32700, 'Parse error: invalid JSON')
  }

  const { method, params, id } = body

  if (!method || typeof method !== 'string') {
    return jsonRpcError(-32600, 'Invalid request: missing "method"', id)
  }

  const supabase = getServiceClient()

  try {
    switch (method) {
      // -------------------------------------------------------------------
      // tasks/send — submit a new task
      // -------------------------------------------------------------------
      case 'tasks/send': {
        if (!params || typeof params !== 'object') {
          return jsonRpcError(
            -32602,
            'Invalid params: expected an object with skill_id and input',
            id
          )
        }

        const skillId = params.skill_id as string | undefined
        const input = (params.input as Record<string, unknown>) || {}
        const callbackUrl = params.callback_url as string | undefined
        const agentId = params.agent_id as string | undefined

        if (!skillId || typeof skillId !== 'string') {
          return jsonRpcError(
            -32602,
            'Invalid params: "skill_id" is required',
            id
          )
        }

        if (!VALID_SKILLS.includes(skillId as SkillId)) {
          return jsonRpcError(
            -32602,
            `Unknown skill_id: "${skillId}". Valid skills: ${VALID_SKILLS.join(', ')}`,
            id
          )
        }

        // Validate callback_url if provided
        if (callbackUrl) {
          try {
            const parsed = new URL(callbackUrl)
            if (!['http:', 'https:'].includes(parsed.protocol)) {
              return jsonRpcError(
                -32602,
                'callback_url must use HTTP or HTTPS',
                id
              )
            }
          } catch {
            return jsonRpcError(
              -32602,
              'callback_url is not a valid URL',
              id
            )
          }
        }

        // Insert task as pending
        const { data: taskRow, error: insertError } = await (
          supabase.from('a2a_tasks') as any
        )
          .insert({
            agent_id: agentId || null,
            skill_id: skillId,
            input,
            status: 'working',
            callback_url: callbackUrl || null,
          })
          .select('id, status, created_at')
          .single()

        if (insertError) {
          console.error('[a2a] Task insert error:', insertError.message)
          return jsonRpcError(-32603, 'Internal error: failed to create task', id)
        }

        const task = taskRow as TaskRow
        const taskId = task.id

        // Execute the skill
        const result = await executeSkill(skillId as SkillId, input)

        // Update the task with the result
        const completedAt = new Date().toISOString()
        const finalStatus = result.success ? 'completed' : 'failed'

        await (supabase.from('a2a_tasks') as any)
          .update({
            status: finalStatus,
            result: result.success ? result.data : null,
            error: result.error || null,
            completed_at: completedAt,
          })
          .eq('id', taskId)

        // Deliver callback if provided
        if (callbackUrl) {
          deliverCallback(
            callbackUrl,
            taskId,
            result.success ? (result.data as Record<string, unknown>) : null,
            result.error || null
          )
        }

        return jsonRpcSuccess(
          {
            task_id: taskId,
            status: finalStatus,
            result: result.success ? result.data : undefined,
            error: result.error || undefined,
            created_at: task.created_at,
            completed_at: completedAt,
          },
          id
        )
      }

      // -------------------------------------------------------------------
      // tasks/get — check status of a task
      // -------------------------------------------------------------------
      case 'tasks/get': {
        if (!params || typeof params !== 'object') {
          return jsonRpcError(
            -32602,
            'Invalid params: expected { task_id: "..." }',
            id
          )
        }

        const taskId = params.task_id as string | undefined
        if (!taskId || typeof taskId !== 'string') {
          return jsonRpcError(
            -32602,
            'Invalid params: "task_id" is required',
            id
          )
        }

        const { data, error } = await supabase
          .from('a2a_tasks')
          .select('*')
          .eq('id', taskId)
          .single()

        if (error && error.code === 'PGRST116') {
          return jsonRpcError(-32602, `Task not found: ${taskId}`, id)
        }
        if (error) {
          console.error('[a2a] Task lookup error:', error.message)
          return jsonRpcError(-32603, 'Internal error: task lookup failed', id)
        }

        const task = data as TaskRow
        return jsonRpcSuccess(
          {
            task_id: task.id,
            agent_id: task.agent_id,
            skill_id: task.skill_id,
            status: task.status,
            result: task.result,
            error: task.error,
            created_at: task.created_at,
            completed_at: task.completed_at,
          },
          id
        )
      }

      // -------------------------------------------------------------------
      // tasks/cancel — cancel a pending/working task
      // -------------------------------------------------------------------
      case 'tasks/cancel': {
        if (!params || typeof params !== 'object') {
          return jsonRpcError(
            -32602,
            'Invalid params: expected { task_id: "..." }',
            id
          )
        }

        const taskId = params.task_id as string | undefined
        if (!taskId || typeof taskId !== 'string') {
          return jsonRpcError(
            -32602,
            'Invalid params: "task_id" is required',
            id
          )
        }

        // Only cancel tasks that are still pending
        const { data: existing } = await supabase
          .from('a2a_tasks')
          .select('id, status')
          .eq('id', taskId)
          .single()

        if (!existing) {
          return jsonRpcError(-32602, `Task not found: ${taskId}`, id)
        }

        const task = existing as TaskRow
        if (task.status === 'completed' || task.status === 'failed') {
          return jsonRpcSuccess(
            {
              task_id: taskId,
              status: task.status,
              message: `Task already ${task.status} and cannot be cancelled`,
            },
            id
          )
        }

        await (supabase.from('a2a_tasks') as any)
          .update({
            status: 'cancelled',
            error: 'Cancelled by requesting agent',
            completed_at: new Date().toISOString(),
          })
          .eq('id', taskId)

        return jsonRpcSuccess(
          {
            task_id: taskId,
            status: 'cancelled',
          },
          id
        )
      }

      default:
        return jsonRpcError(-32601, `Method not found: ${method}`, id)
    }
  } catch (err) {
    console.error(
      '[a2a] Unexpected error:',
      err instanceof Error ? err.message : err
    )

    logError(
      '/api/a2a',
      'POST',
      err instanceof Error ? err : new Error(String(err)),
      requestId
    )

    return jsonRpcError(-32603, 'Internal server error', id)
  }
}
