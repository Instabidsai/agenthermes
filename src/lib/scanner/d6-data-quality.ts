// ---------------------------------------------------------------------------
// D6 — Data Quality (weight: 0.10)
// Does the API return clean, consistent, well-structured data?
// Checks: sample API responses, null rates, schema compliance, date formats
//         (ISO 8601), field naming consistency
//
// Auth-aware: 401/403 JSON responses (e.g., Stripe's API) get partial credit
// for well-structured error objects. Full credit requires 200 responses.
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation, ProbeResult } from './types'
import { probeEndpoint, isJsonContentType, getApiSubdomains } from './types'

/** Recursively collect all keys and values from a JSON object */
function flattenObject(
  obj: unknown,
  prefix = ''
): { keys: string[]; values: unknown[] } {
  const keys: string[] = []
  const values: unknown[] = []

  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      const fullKey = prefix ? `${prefix}.${k}` : k
      keys.push(fullKey)
      values.push(v)
      if (v && typeof v === 'object') {
        const nested = flattenObject(v, fullKey)
        keys.push(...nested.keys)
        values.push(...nested.values)
      }
    }
  } else if (Array.isArray(obj)) {
    for (let i = 0; i < Math.min(obj.length, 5); i++) {
      const nested = flattenObject(obj[i], `${prefix}[${i}]`)
      keys.push(...nested.keys)
      values.push(...nested.values)
    }
  }

  return { keys, values }
}

/** Check if a string looks like ISO 8601 */
function isIso8601(val: unknown): boolean {
  if (typeof val !== 'string') return false
  return /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/.test(val)
}

/** Detect naming convention: camelCase, snake_case, kebab-case, PascalCase */
function detectNamingConvention(key: string): string {
  if (key.includes('_')) return 'snake_case'
  if (key.includes('-')) return 'kebab-case'
  if (/^[A-Z]/.test(key)) return 'PascalCase'
  if (/[a-z][A-Z]/.test(key)) return 'camelCase'
  return 'unknown'
}

// ---------------------------------------------------------------------------
// Auth error response quality assessment
// ---------------------------------------------------------------------------

/** Standard error response fields that well-designed APIs include */
const ERROR_QUALITY_FIELDS = ['error', 'message', 'code', 'type', 'status', 'detail', 'details'] as const

/** Check if a response is a well-structured error (401/403 with JSON body) */
function isAuthErrorJson(r: ProbeResult): boolean {
  return (
    (r.status === 401 || r.status === 403) &&
    isJsonContentType(r.contentType) &&
    r.body !== null &&
    typeof r.body === 'object'
  )
}

/**
 * Score the quality of an error response object.
 * Returns 0-100 representing how well-structured the error is.
 *
 * Checks:
 * - Has standard error fields (error, message, code, type)
 * - Content-Type is application/json
 * - Uses proper HTTP status codes (401 for auth, not 200 with error body)
 * - Field naming consistency (snake_case vs camelCase)
 * - ISO 8601 timestamps if present
 * - Consistent envelope structure across multiple error responses
 */
function scoreErrorResponseQuality(authResponses: ProbeResult[]): {
  score: number
  fieldChecks: string[]
  envelopeConsistent: boolean
  namingStyle: string | null
  hasTimestamps: boolean
  isoTimestamps: boolean
} {
  if (authResponses.length === 0) {
    return { score: 0, fieldChecks: [], envelopeConsistent: false, namingStyle: null, hasTimestamps: false, isoTimestamps: false }
  }

  let points = 0
  const fieldChecks: string[] = []

  // --- 1. Standard error fields present (up to 30 pts) ---
  const fieldPresence: Record<string, number> = {}
  for (const f of ERROR_QUALITY_FIELDS) {
    fieldPresence[f] = 0
  }

  for (const resp of authResponses) {
    const body = resp.body as Record<string, unknown>
    // Check top-level and one level nested (e.g., Stripe's { error: { message, type, code } })
    const topKeys = Object.keys(body)
    const allKeys = new Set<string>(topKeys)

    for (const v of Object.values(body)) {
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        for (const nestedKey of Object.keys(v as Record<string, unknown>)) {
          allKeys.add(nestedKey)
        }
      }
    }

    for (const f of ERROR_QUALITY_FIELDS) {
      if (allKeys.has(f)) fieldPresence[f]++
    }
  }

  const foundFields = Object.entries(fieldPresence).filter(([, count]) => count > 0)
  const foundFieldNames = foundFields.map(([name]) => name)

  if (foundFields.length >= 4) {
    points += 30
    fieldChecks.push(`Excellent: ${foundFieldNames.join(', ')} fields present`)
  } else if (foundFields.length >= 3) {
    points += 25
    fieldChecks.push(`Good: ${foundFieldNames.join(', ')} fields present`)
  } else if (foundFields.length >= 2) {
    points += 18
    fieldChecks.push(`Adequate: ${foundFieldNames.join(', ')} fields present`)
  } else if (foundFields.length >= 1) {
    points += 10
    fieldChecks.push(`Minimal: only ${foundFieldNames.join(', ')} field(s) present`)
  }

  // --- 2. Content-Type correctness (up to 20 pts) ---
  const correctCt = authResponses.filter((r) => r.contentType?.includes('application/json'))
  const ctRate = correctCt.length / authResponses.length
  if (ctRate === 1) {
    points += 20
  } else if (ctRate > 0) {
    points += 10
  }

  // --- 3. Proper HTTP status codes — 401/403 for auth, not 200-with-error (up to 20 pts) ---
  // If they're in this list, they already use proper status codes (we filtered for 401/403)
  points += 20
  fieldChecks.push('Proper HTTP status codes for auth errors')

  // --- 4. Field naming consistency (up to 15 pts) ---
  const conventionCounts: Record<string, number> = {}
  for (const resp of authResponses) {
    const { keys } = flattenObject(resp.body)
    for (const key of keys) {
      const leafKey = key.includes('.') ? key.split('.').pop()! : key
      if (leafKey.startsWith('[')) continue
      const convention = detectNamingConvention(leafKey)
      conventionCounts[convention] = (conventionCounts[convention] || 0) + 1
    }
  }

  const totalFieldKeys = Object.values(conventionCounts).reduce((a, b) => a + b, 0)
  const dominant = Object.entries(conventionCounts).sort((a, b) => b[1] - a[1])[0]
  let namingStyle: string | null = null

  if (totalFieldKeys > 0 && dominant) {
    const consistency = dominant[1] / totalFieldKeys
    namingStyle = dominant[0]
    if (consistency >= 0.9) points += 15
    else if (consistency >= 0.7) points += 10
    else points += 5
  }

  // --- 5. Envelope consistency across error responses (up to 15 pts) ---
  let envelopeConsistent = false
  if (authResponses.length >= 2) {
    const patterns = authResponses.map((r) => {
      const body = r.body as Record<string, unknown>
      return Object.keys(body).sort().join(',')
    })
    const uniquePatterns = new Set(patterns)
    envelopeConsistent = uniquePatterns.size === 1
    if (envelopeConsistent) {
      points += 15
      fieldChecks.push('Consistent error envelope across all auth responses')
    } else {
      points += 5
    }
  } else {
    // Single response — give moderate credit, can't fully assess consistency
    points += 8
    envelopeConsistent = true // vacuously true for 1 response
  }

  // --- 6. ISO 8601 timestamps in error responses (bonus, not penalized if absent) ---
  let hasTimestamps = false
  let isoTimestamps = false
  for (const resp of authResponses) {
    const { keys, values } = flattenObject(resp.body)
    for (let i = 0; i < keys.length; i++) {
      if (typeof values[i] === 'string' && /date|time|created|timestamp|_at$/i.test(keys[i])) {
        hasTimestamps = true
        if (isIso8601(values[i])) {
          isoTimestamps = true
        }
      }
    }
  }

  // Cap at 100
  return {
    score: Math.min(points, 100),
    fieldChecks,
    envelopeConsistent,
    namingStyle,
    hasTimestamps,
    isoTimestamps,
  }
}

// ---------------------------------------------------------------------------
// Main scanner
// ---------------------------------------------------------------------------

export async function scanDataQuality(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  // -----------------------------------------------------------------------
  // Collect JSON API responses to analyze
  // -----------------------------------------------------------------------
  const samplePaths = [
    '/api',
    '/api/v1',
    '/api/health',
    '/api/status',
    '/health',
    '/status',
    '/api/pricing',
    '/api/v1/pricing',
    '/.well-known/agent.json',
    '/.well-known/mcp.json',
  ]

  // Also probe API subdomains for JSON responses
  const apiSubdomains = getApiSubdomains(base)
  const subdomainSamplePaths = apiSubdomains.flatMap((sub) => [
    sub,
    `${sub}/v1`,
    `${sub}/health`,
    `${sub}/status`,
  ])

  const allSampleUrls = [
    ...samplePaths.map((p) => `${base}${p}`),
    ...subdomainSamplePaths,
  ]

  const sampleResults = await Promise.all(
    allSampleUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )

  // Separate 2xx JSON responses from 401/403 JSON responses
  const okJsonResponses = sampleResults.filter(
    (r) => r.found && isJsonContentType(r.contentType) && r.body && typeof r.body === 'object'
  )

  const authJsonResponses = sampleResults.filter(
    (r) => isAuthErrorJson(r)
  )

  // Combine for analyses that work on any JSON (naming, dates, etc.)
  // but track which tier they came from
  const allJsonResponses = [...okJsonResponses, ...authJsonResponses]
  const hasOkResponses = okJsonResponses.length > 0
  const hasAuthResponses = authJsonResponses.length > 0

  // -----------------------------------------------------------------------
  // Case 1: No JSON at all — 0 score (unchanged)
  // -----------------------------------------------------------------------
  if (allJsonResponses.length === 0) {
    checks.push({
      name: 'JSON API Responses',
      passed: false,
      details: `Checked ${allSampleUrls.length} endpoints — none return JSON (including auth-protected endpoints). Cannot assess data quality.`,
      points: 0,
    })
    recommendations.push({
      action:
        'Ensure your API endpoints return application/json responses. Data quality cannot be assessed without structured API data.',
      impact: '+60 points',
      difficulty: 'medium',
      auto_fixable: false,
    })

    return {
      dimension: 'D6',
      label: 'Data Quality',
      score: 0,
      weight: 0.1,
      checks,
      recommendations,
    }
  }

  // -----------------------------------------------------------------------
  // Case 2: Only 401/403 JSON (no 2xx) — partial credit path (up to 40 pts)
  // APIs like Stripe return structured JSON errors for unauthenticated requests
  // -----------------------------------------------------------------------
  if (!hasOkResponses && hasAuthResponses) {
    const errorQuality = scoreErrorResponseQuality(authJsonResponses)

    // Scale: error quality 0-100 maps to D6 score 0-40
    // A perfect error response structure earns 40/100 on D6
    const AUTH_CEILING = 40
    const scaledScore = Math.round((errorQuality.score / 100) * AUTH_CEILING)

    checks.push({
      name: 'JSON API Responses',
      passed: true,
      details: `${authJsonResponses.length} endpoint(s) return structured JSON on 401/403 (auth-protected API detected)`,
      points: Math.min(scaledScore, 10),
    })

    // Error structure quality check
    const structurePoints = Math.min(scaledScore, AUTH_CEILING)
    checks.push({
      name: 'Auth Error Response Quality',
      passed: errorQuality.score >= 60,
      details: [
        `Error structure score: ${errorQuality.score}/100`,
        ...errorQuality.fieldChecks,
        errorQuality.namingStyle ? `Naming: ${errorQuality.namingStyle}` : null,
        errorQuality.hasTimestamps
          ? errorQuality.isoTimestamps
            ? 'Timestamps use ISO 8601'
            : 'Timestamps present but not ISO 8601'
          : null,
      ]
        .filter(Boolean)
        .join('. '),
      points: structurePoints,
    })

    rawScore += structurePoints

    // Analyze naming consistency of error responses
    const conventionCounts: Record<string, number> = {}
    for (const resp of authJsonResponses) {
      const { keys } = flattenObject(resp.body)
      for (const key of keys) {
        const leafKey = key.includes('.') ? key.split('.').pop()! : key
        if (leafKey.startsWith('[')) continue
        const convention = detectNamingConvention(leafKey)
        conventionCounts[convention] = (conventionCounts[convention] || 0) + 1
      }
    }

    const totalKeys = Object.values(conventionCounts).reduce((a, b) => a + b, 0)
    const dominantConvention = Object.entries(conventionCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]

    if (totalKeys > 0 && dominantConvention) {
      const consistencyRate = dominantConvention[1] / totalKeys
      checks.push({
        name: 'Field Naming Consistency (Error Responses)',
        passed: consistencyRate >= 0.75,
        details: `${Math.round(consistencyRate * 100)}% of error fields use ${dominantConvention[0]} (${totalKeys} fields)`,
        points: 0, // Already counted in error quality score
      })
    }

    // Check Content-Type on auth responses
    const correctCt = authJsonResponses.filter((r) => r.contentType?.includes('application/json'))
    const ctRate = correctCt.length / authJsonResponses.length
    checks.push({
      name: 'Content-Type Headers (Error Responses)',
      passed: ctRate === 1,
      details: ctRate === 1
        ? 'All auth error responses correctly set application/json'
        : `${Math.round(ctRate * 100)}% of auth error responses have correct content-type`,
      points: 0, // Already counted in error quality score
    })

    // Recommendation to expose public endpoints for full score
    recommendations.push({
      action:
        'Expose at least one public endpoint (e.g., /api/health, /api/status) that returns JSON without authentication. Auth-protected APIs are capped at 40/100 for data quality.',
      impact: `+${100 - scaledScore} points`,
      difficulty: 'easy',
      auto_fixable: false,
    })

    if (errorQuality.score < 60) {
      recommendations.push({
        action:
          'Improve error response structure: include error, message, code, and type fields in all error responses.',
        impact: '+15 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }

    if (!errorQuality.envelopeConsistent && authJsonResponses.length >= 2) {
      recommendations.push({
        action:
          'Standardize error response envelope — all error responses should share the same top-level structure.',
        impact: '+5 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }

    const score = Math.min(rawScore, AUTH_CEILING)

    return {
      dimension: 'D6',
      label: 'Data Quality',
      score,
      weight: 0.1,
      checks,
      recommendations: recommendations.sort(
        (a, b) => parseInt(b.impact) - parseInt(a.impact)
      ),
    }
  }

  // -----------------------------------------------------------------------
  // Case 3: Has 2xx JSON responses — full scoring path (up to 100 pts)
  // If we also have auth responses, they contribute to envelope/naming checks
  // -----------------------------------------------------------------------
  checks.push({
    name: 'JSON API Responses',
    passed: true,
    details: hasAuthResponses
      ? `${okJsonResponses.length} public + ${authJsonResponses.length} auth-protected endpoint(s) return valid JSON`
      : `${okJsonResponses.length} endpoint(s) return valid JSON for analysis`,
    points: 10,
  })
  rawScore += 10

  // -----------------------------------------------------------------------
  // 1. Null rate analysis (up to 20 pts) — only on 2xx responses (real data)
  // -----------------------------------------------------------------------
  let totalValues = 0
  let nullValues = 0

  for (const resp of okJsonResponses) {
    const { values } = flattenObject(resp.body)
    for (const v of values) {
      totalValues++
      if (v === null || v === undefined || v === '') {
        nullValues++
      }
    }
  }

  const nullRate = totalValues > 0 ? nullValues / totalValues : 0

  if (totalValues > 0) {
    let nullPoints = 0
    if (nullRate < 0.05) nullPoints = 20
    else if (nullRate < 0.15) nullPoints = 15
    else if (nullRate < 0.3) nullPoints = 10
    else if (nullRate < 0.5) nullPoints = 5
    else nullPoints = 2

    rawScore += nullPoints
    checks.push({
      name: 'Null Rate',
      passed: nullRate < 0.15,
      details: `${Math.round(nullRate * 100)}% null/empty values across ${totalValues} fields (${nullValues} null)`,
      points: nullPoints,
    })

    if (nullRate >= 0.15) {
      recommendations.push({
        action: `Reduce null/empty fields in API responses (currently ${Math.round(nullRate * 100)}%). Use defaults or omit empty optional fields.`,
        impact: `+${20 - nullPoints} points`,
        difficulty: 'medium',
        auto_fixable: false,
      })
    }
  }

  // -----------------------------------------------------------------------
  // 2. Date format compliance — ISO 8601 (up to 20 pts)
  //    Analyze all JSON (including auth errors) for date format consistency
  // -----------------------------------------------------------------------
  let dateFields = 0
  let isoDateFields = 0
  let nonIsoDateFields = 0

  for (const resp of allJsonResponses) {
    const { keys, values } = flattenObject(resp.body)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const val = values[i]
      // Detect date-like fields by key name
      if (
        typeof val === 'string' &&
        /date|time|created|updated|timestamp|_at$|_on$/i.test(key)
      ) {
        dateFields++
        if (isIso8601(val)) {
          isoDateFields++
        } else {
          nonIsoDateFields++
        }
      }
    }
  }

  if (dateFields > 0) {
    const isoRate = isoDateFields / dateFields
    let datePoints = 0
    if (isoRate === 1) datePoints = 20
    else if (isoRate >= 0.75) datePoints = 15
    else if (isoRate >= 0.5) datePoints = 10
    else datePoints = 3

    rawScore += datePoints
    checks.push({
      name: 'ISO 8601 Date Format',
      passed: isoRate >= 0.75,
      details: `${isoDateFields}/${dateFields} date fields use ISO 8601 format`,
      points: datePoints,
    })

    if (isoRate < 1) {
      recommendations.push({
        action: `Standardize all date fields to ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ). ${nonIsoDateFields} field(s) use non-standard formats.`,
        impact: `+${20 - datePoints} points`,
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    // No date fields found — give partial credit (might just not have date data)
    rawScore += 10
    checks.push({
      name: 'ISO 8601 Date Format',
      passed: true,
      details: 'No date fields detected in sample responses (neutral)',
      points: 10,
    })
  }

  // -----------------------------------------------------------------------
  // 3. Field naming consistency (up to 20 pts)
  //    Analyze all JSON (including auth errors) for naming patterns
  // -----------------------------------------------------------------------
  const conventionCounts: Record<string, number> = {}

  for (const resp of allJsonResponses) {
    const { keys } = flattenObject(resp.body)
    for (const key of keys) {
      // Get the last segment of the key (after last dot)
      const leafKey = key.includes('.') ? key.split('.').pop()! : key
      // Skip array indices
      if (leafKey.startsWith('[')) continue
      const convention = detectNamingConvention(leafKey)
      conventionCounts[convention] = (conventionCounts[convention] || 0) + 1
    }
  }

  const totalKeys = Object.values(conventionCounts).reduce((a, b) => a + b, 0)
  const dominantConvention = Object.entries(conventionCounts).sort(
    (a, b) => b[1] - a[1]
  )[0]

  if (totalKeys > 0 && dominantConvention) {
    const consistencyRate = dominantConvention[1] / totalKeys
    let namingPoints = 0
    if (consistencyRate >= 0.9) namingPoints = 20
    else if (consistencyRate >= 0.75) namingPoints = 15
    else if (consistencyRate >= 0.5) namingPoints = 10
    else namingPoints = 5

    rawScore += namingPoints
    checks.push({
      name: 'Field Naming Consistency',
      passed: consistencyRate >= 0.75,
      details: `${Math.round(consistencyRate * 100)}% of fields use ${dominantConvention[0]} (${totalKeys} fields analyzed)`,
      points: namingPoints,
    })

    if (consistencyRate < 0.9) {
      recommendations.push({
        action: `Standardize field naming to ${dominantConvention[0]} across all endpoints. Currently ${Math.round(consistencyRate * 100)}% consistent.`,
        impact: `+${20 - namingPoints} points`,
        difficulty: 'medium',
        auto_fixable: false,
      })
    }
  }

  // -----------------------------------------------------------------------
  // 4. Schema consistency across responses (up to 15 pts)
  //    Check all JSON (including auth errors) for envelope patterns
  // -----------------------------------------------------------------------
  const envelopePatterns = allJsonResponses.map((r) => {
    const body = r.body as Record<string, unknown>
    const topKeys = Object.keys(body).sort().join(',')
    return topKeys
  })

  // Check for common envelope patterns like { data, error, meta } or { status, result }
  const hasEnvelope = envelopePatterns.some((pattern) => {
    return /data|result|response|payload|error/i.test(pattern)
  })

  if (hasEnvelope) {
    rawScore += 15
    checks.push({
      name: 'Response Envelope',
      passed: true,
      details: 'Responses use a structured envelope pattern (data/result/response/error wrapper)',
      points: 15,
    })
  } else if (allJsonResponses.length > 0) {
    rawScore += 5
    checks.push({
      name: 'Response Envelope',
      passed: false,
      details: 'Responses lack a consistent envelope pattern (e.g., { data, error, meta })',
      points: 5,
    })
    recommendations.push({
      action:
        'Wrap all API responses in a consistent envelope: { "data": ..., "error": null, "meta": { ... } }. This helps agents parse responses reliably.',
      impact: '+10 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 5. Content-Type header correctness (up to 15 pts)
  //    Check all JSON responses (including auth errors)
  // -----------------------------------------------------------------------
  const correctContentType = allJsonResponses.filter((r) =>
    r.contentType?.includes('application/json')
  )
  const ctRate =
    allJsonResponses.length > 0
      ? correctContentType.length / allJsonResponses.length
      : 0

  if (ctRate === 1) {
    rawScore += 15
    checks.push({
      name: 'Content-Type Headers',
      passed: true,
      details: 'All JSON responses correctly set application/json content-type',
      points: 15,
    })
  } else if (ctRate > 0) {
    rawScore += 8
    checks.push({
      name: 'Content-Type Headers',
      passed: false,
      details: `${Math.round(ctRate * 100)}% of JSON responses have correct content-type header`,
      points: 8,
    })
    recommendations.push({
      action:
        'Ensure all JSON responses set Content-Type: application/json header.',
      impact: '+7 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 6. Proper HTTP status codes — bonus check (up to 5 pts)
  //    401/403 for auth vs 200 with error body shows API discipline
  // -----------------------------------------------------------------------
  if (hasAuthResponses) {
    // The API uses proper HTTP status codes for auth errors (not 200-with-error-body)
    rawScore += 5
    checks.push({
      name: 'Proper HTTP Status Codes',
      passed: true,
      details: `Auth-protected endpoints correctly return 401/403 status codes (not 200 with error body)`,
      points: 5,
    })
  }

  // -----------------------------------------------------------------------
  // 7. Error response envelope consistency — bonus check (up to 5 pts)
  //    If we have multiple auth error responses, check if they share structure
  // -----------------------------------------------------------------------
  if (authJsonResponses.length >= 2) {
    const errorPatterns = authJsonResponses.map((r) => {
      const body = r.body as Record<string, unknown>
      return Object.keys(body).sort().join(',')
    })
    const uniqueErrorPatterns = new Set(errorPatterns)

    if (uniqueErrorPatterns.size === 1) {
      rawScore += 5
      checks.push({
        name: 'Error Response Consistency',
        passed: true,
        details: `All ${authJsonResponses.length} auth error responses share the same envelope structure`,
        points: 5,
      })
    } else {
      checks.push({
        name: 'Error Response Consistency',
        passed: false,
        details: `${uniqueErrorPatterns.size} different error structures across ${authJsonResponses.length} auth responses`,
        points: 0,
      })
      recommendations.push({
        action:
          'Standardize error response structure — all error responses should use the same top-level fields.',
        impact: '+5 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  }

  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D6',
    label: 'Data Quality',
    score,
    weight: 0.1,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
