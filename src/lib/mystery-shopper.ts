import { getServiceClient } from './supabase'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MysteryShopTest {
  test_type: string
  passed: boolean
  response_ms: number
  details: Record<string, unknown>
}

export interface MysteryShopResult {
  business_id: string
  business_name: string
  domain: string
  tests: MysteryShopTest[]
  summary: {
    total_tests: number
    passed: number
    failed: number
    pass_rate: number
    avg_response_ms: number
  }
  tested_at: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TIMEOUT_MS = 5_000

/** Fetch with timeout — never throws */
async function probe(
  url: string,
  method: 'GET' | 'HEAD' = 'GET'
): Promise<{
  ok: boolean
  status: number | null
  contentType: string | null
  body: unknown
  responseMs: number
  error: string | null
}> {
  const start = Date.now()
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

    const res = await fetch(url, {
      method,
      signal: controller.signal,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent': 'AgentHermes-MysteryShopper/1.0',
      },
      redirect: 'follow',
    })

    clearTimeout(timer)

    const contentType = res.headers.get('content-type') ?? null
    let body: unknown = null
    try {
      const text = await res.text()
      try {
        body = JSON.parse(text)
      } catch {
        body = text.slice(0, 2_000)
      }
    } catch {
      // body stays null
    }

    return {
      ok: res.ok,
      status: res.status,
      contentType,
      body,
      responseMs: Date.now() - start,
      error: res.ok ? null : `HTTP ${res.status}`,
    }
  } catch (err: unknown) {
    return {
      ok: false,
      status: null,
      contentType: null,
      body: null,
      responseMs: Date.now() - start,
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}

function isJsonContentType(ct: string | null): boolean {
  if (!ct) return false
  return ct.includes('application/json') || ct.includes('application/ld+json')
}

// ---------------------------------------------------------------------------
// Test Runners
// ---------------------------------------------------------------------------

/** Test: Can we reach an MCP endpoint? */
async function testApiCall(endpoint: string): Promise<MysteryShopTest> {
  const result = await probe(endpoint)
  return {
    test_type: 'api_call',
    passed: result.ok || result.status === 401 || result.status === 403 || result.status === 405,
    response_ms: result.responseMs,
    details: {
      endpoint,
      status: result.status,
      error: result.error,
    },
  }
}

/** Test: Does the endpoint respond with valid JSON? */
async function testDataQuality(endpoint: string): Promise<MysteryShopTest> {
  const result = await probe(endpoint)
  const isJson = isJsonContentType(result.contentType) && result.body !== null && typeof result.body === 'object'
  return {
    test_type: 'data_quality',
    passed: isJson,
    response_ms: result.responseMs,
    details: {
      endpoint,
      content_type: result.contentType,
      is_valid_json: isJson,
      status: result.status,
    },
  }
}

/** Test: Is response time acceptable? (<5s) */
async function testReliability(endpoint: string): Promise<MysteryShopTest> {
  const result = await probe(endpoint)
  const acceptable = result.responseMs < 5_000 && (result.ok || result.status !== null)
  return {
    test_type: 'reliability',
    passed: acceptable,
    response_ms: result.responseMs,
    details: {
      endpoint,
      response_time_ms: result.responseMs,
      threshold_ms: 5_000,
      reachable: result.status !== null,
    },
  }
}

/** Test: Can we fetch /.well-known/agent-card.json or /.well-known/agent.json? */
async function testAgentCardDiscoverability(domain: string): Promise<MysteryShopTest> {
  const paths = [
    `https://${domain}/.well-known/agent-card.json`,
    `https://${domain}/.well-known/agent.json`,
    `https://${domain}/agent-card.json`,
    `https://${domain}/agent.json`,
  ]

  for (const url of paths) {
    const result = await probe(url)
    if (result.ok) {
      return {
        test_type: 'discoverability_agent_card',
        passed: true,
        response_ms: result.responseMs,
        details: {
          url,
          found: true,
          is_json: isJsonContentType(result.contentType),
        },
      }
    }
  }

  return {
    test_type: 'discoverability_agent_card',
    passed: false,
    response_ms: 0,
    details: {
      paths_checked: paths,
      found: false,
    },
  }
}

/** Test: Can we fetch /llms.txt? */
async function testLlmsTxtDiscoverability(domain: string): Promise<MysteryShopTest> {
  const paths = [
    `https://${domain}/llms.txt`,
    `https://${domain}/.well-known/llms.txt`,
  ]

  for (const url of paths) {
    const result = await probe(url)
    if (result.ok) {
      const body = typeof result.body === 'string' ? result.body : ''
      return {
        test_type: 'discoverability_llms_txt',
        passed: true,
        response_ms: result.responseMs,
        details: {
          url,
          found: true,
          content_length: body.length,
        },
      }
    }
  }

  return {
    test_type: 'discoverability_llms_txt',
    passed: false,
    response_ms: 0,
    details: {
      paths_checked: paths,
      found: false,
    },
  }
}

/** Test: Is HTTPS working? */
async function testSecurity(domain: string): Promise<MysteryShopTest> {
  const start = Date.now()
  const result = await probe(`https://${domain}`, 'HEAD')
  return {
    test_type: 'security_https',
    passed: result.ok || result.status !== null,
    response_ms: Date.now() - start,
    details: {
      url: `https://${domain}`,
      status: result.status,
      tls_working: result.ok || result.status !== null,
      error: result.error,
    },
  }
}

// ---------------------------------------------------------------------------
// Main Mystery Shopper
// ---------------------------------------------------------------------------

export async function runMysteryShop(businessId: string): Promise<MysteryShopResult> {
  const supabase = getServiceClient()

  // 1. Fetch the business
  const { data: bizRaw, error: bizError } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .single()

  if (bizError || !bizRaw) {
    throw new Error(`Business not found: ${businessId}`)
  }

  const business = bizRaw as Record<string, any>

  // 2. Fetch services with MCP endpoints
  const { data: servicesRaw } = await supabase
    .from('services')
    .select('*')
    .eq('business_id', businessId)
    .eq('status', 'active')

  const services = (servicesRaw || []) as Record<string, any>[]

  const tests: MysteryShopTest[] = []
  const domain = business.domain as string | null

  // 3. Test each service's MCP endpoint
  for (const service of services) {
    if (service.mcp_endpoint) {
      const endpoint = service.mcp_endpoint as string
      const [apiCall, dataQuality, reliability] = await Promise.all([
        testApiCall(endpoint),
        testDataQuality(endpoint),
        testReliability(endpoint),
      ])

      // Tag with service info
      apiCall.details.service_name = service.name
      dataQuality.details.service_name = service.name
      reliability.details.service_name = service.name

      tests.push(apiCall, dataQuality, reliability)
    }
  }

  // 4. Test business MCP endpoints from the business record
  const mcpEndpoints = (business.mcp_endpoints || []) as string[]
  for (const endpoint of mcpEndpoints) {
    if (endpoint && !services.some((s) => s.mcp_endpoint === endpoint)) {
      const [apiCall, dataQuality, reliability] = await Promise.all([
        testApiCall(endpoint),
        testDataQuality(endpoint),
        testReliability(endpoint),
      ])
      tests.push(apiCall, dataQuality, reliability)
    }
  }

  // 5. Test domain-level discoverability and security
  if (domain) {
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/+$/, '')
    const [agentCard, llmsTxt, security] = await Promise.all([
      testAgentCardDiscoverability(cleanDomain),
      testLlmsTxtDiscoverability(cleanDomain),
      testSecurity(cleanDomain),
    ])
    tests.push(agentCard, llmsTxt, security)
  }

  // 6. If no endpoints and no domain, add a basic note
  if (tests.length === 0) {
    tests.push({
      test_type: 'no_testable_surface',
      passed: false,
      response_ms: 0,
      details: {
        reason: 'Business has no MCP endpoints, services, or domain to test',
      },
    })
  }

  // 7. Save results to mystery_shops table
  const now = new Date().toISOString()
  const insertRows = tests.map((t) => ({
    business_id: businessId,
    test_type: t.test_type,
    passed: t.passed,
    response_ms: t.response_ms,
    details: t.details,
    tested_at: now,
  }))

  const { error: insertError } = await supabase
    .from('mystery_shops')
    .insert(insertRows as any)

  if (insertError) {
    console.error('[mystery-shopper] Insert error:', insertError.message)
  }

  // 8. Build summary
  const passed = tests.filter((t) => t.passed).length
  const failed = tests.filter((t) => !t.passed).length
  const totalResponseMs = tests.reduce((sum, t) => sum + t.response_ms, 0)

  return {
    business_id: businessId,
    business_name: business.name as string,
    domain: (business.domain as string) || '',
    tests,
    summary: {
      total_tests: tests.length,
      passed,
      failed,
      pass_rate: tests.length > 0 ? Math.round((passed / tests.length) * 100) : 0,
      avg_response_ms: tests.length > 0 ? Math.round(totalResponseMs / tests.length) : 0,
    },
    tested_at: now,
  }
}

/**
 * Get mystery shop history for a business.
 */
export async function getMysteryShopHistory(
  businessId: string,
  limit: number = 50,
  offset: number = 0
) {
  const supabase = getServiceClient()

  const { data, error, count } = await supabase
    .from('mystery_shops')
    .select('*', { count: 'exact' })
    .eq('business_id', businessId)
    .order('tested_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    throw new Error(`Failed to fetch mystery shop history: ${error.message}`)
  }

  return {
    results: (data || []) as Record<string, any>[],
    total: count ?? 0,
  }
}
