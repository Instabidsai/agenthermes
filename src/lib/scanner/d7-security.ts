// ---------------------------------------------------------------------------
// D7 — Security (weight: 0.10)
// Is the site secure enough for agent-to-business transactions?
// Checks: TLS version + certificate, rate limiting, error detail exposure,
//         CORS configuration, security headers (CSP, HSTS, X-Frame-Options,
//         X-Content-Type-Options)
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, getApiSubdomains } from './types'

export async function scanSecurity(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  const isHttps = base.startsWith('https://')

  // -----------------------------------------------------------------------
  // 1. TLS / HTTPS (up to 25 pts) — CRITICAL, feeds into cap rules
  // -----------------------------------------------------------------------
  if (isHttps) {
    // Probe the homepage to verify TLS is actually working
    const tlsResult = await probeEndpoint(base, 'GET', globalSignal)

    if (tlsResult.found || (tlsResult.status !== null && tlsResult.status < 500)) {
      rawScore += 25
      checks.push({
        name: 'TLS / HTTPS',
        passed: true,
        details: 'Site serves over HTTPS with valid TLS certificate',
        points: 25,
      })
    } else if (tlsResult.error?.includes('certificate') || tlsResult.error?.includes('SSL')) {
      rawScore += 5
      checks.push({
        name: 'TLS / HTTPS',
        passed: false,
        details: `HTTPS configured but TLS certificate issue: ${tlsResult.error}`,
        points: 5,
      })
      recommendations.push({
        action:
          'Fix your TLS certificate. Without valid TLS, your score is capped at 39 (Bronze max).',
        impact: '+20 points (removes cap)',
        difficulty: 'medium',
        auto_fixable: false,
      })
    } else {
      rawScore += 10
      checks.push({
        name: 'TLS / HTTPS',
        passed: false,
        details: `HTTPS URL but connection failed: ${tlsResult.error}`,
        points: 10,
      })
    }
  } else {
    checks.push({
      name: 'TLS / HTTPS',
      passed: false,
      details: 'Site does not use HTTPS. This is a critical security requirement.',
      points: 0,
    })
    recommendations.push({
      action:
        'Enable HTTPS with a valid TLS certificate. Without TLS, your score is CAPPED at 39 (Bronze max). Use Let\'s Encrypt for free certificates.',
      impact: '+25 points (removes cap)',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // Probe homepage, API paths, and API subdomains for security headers
  const homepageResult = await probeEndpoint(base, 'GET', globalSignal)
  const apiResult = await probeEndpoint(`${base}/api`, 'GET', globalSignal)

  // Also probe API subdomains to catch rate-limit and CORS headers
  const apiSubdomains = getApiSubdomains(base)
  const subdomainResults = await Promise.all(
    apiSubdomains.flatMap((sub) => [
      probeEndpoint(sub, 'GET', globalSignal),
      probeEndpoint(`${sub}/v1`, 'GET', globalSignal),
    ])
  )

  // Merge headers from all probes (subdomain headers override base domain)
  const allHeaders = { ...homepageResult.headers, ...apiResult.headers }
  for (const r of subdomainResults) {
    Object.assign(allHeaders, r.headers)
  }

  // -----------------------------------------------------------------------
  // 2. Strict-Transport-Security (HSTS) (up to 15 pts)
  // -----------------------------------------------------------------------
  const hsts = allHeaders['strict-transport-security']
  if (hsts) {
    const hasMaxAge = /max-age=\d+/i.test(hsts)
    const hasIncludeSubdomains = /includeSubDomains/i.test(hsts)

    if (hasMaxAge && hasIncludeSubdomains) {
      rawScore += 15
      checks.push({
        name: 'HSTS',
        passed: true,
        details: `Strict-Transport-Security header present with includeSubDomains: ${hsts}`,
        points: 15,
      })
    } else if (hasMaxAge) {
      rawScore += 10
      checks.push({
        name: 'HSTS',
        passed: true,
        details: `HSTS header present but missing includeSubDomains: ${hsts}`,
        points: 10,
      })
      recommendations.push({
        action: 'Add includeSubDomains to your HSTS header for comprehensive TLS enforcement.',
        impact: '+5 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    checks.push({
      name: 'HSTS',
      passed: false,
      details: 'No Strict-Transport-Security header found',
      points: 0,
    })
    recommendations.push({
      action:
        'Add Strict-Transport-Security header with max-age and includeSubDomains to enforce HTTPS.',
      impact: '+15 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 3. Content-Security-Policy (up to 10 pts)
  // -----------------------------------------------------------------------
  const csp = allHeaders['content-security-policy']
  if (csp) {
    rawScore += 10
    checks.push({
      name: 'Content-Security-Policy',
      passed: true,
      details: `CSP header present (${csp.length} chars)`,
      points: 10,
    })
  } else {
    checks.push({
      name: 'Content-Security-Policy',
      passed: false,
      details: 'No Content-Security-Policy header found',
      points: 0,
    })
    recommendations.push({
      action:
        'Add a Content-Security-Policy header to prevent XSS and code injection attacks.',
      impact: '+10 points',
      difficulty: 'medium',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 4. X-Frame-Options (up to 5 pts)
  // -----------------------------------------------------------------------
  const xfo = allHeaders['x-frame-options']
  if (xfo) {
    rawScore += 5
    checks.push({
      name: 'X-Frame-Options',
      passed: true,
      details: `X-Frame-Options: ${xfo}`,
      points: 5,
    })
  } else {
    checks.push({
      name: 'X-Frame-Options',
      passed: false,
      details: 'No X-Frame-Options header (clickjacking protection)',
      points: 0,
    })
    recommendations.push({
      action: 'Add X-Frame-Options: DENY or SAMEORIGIN header.',
      impact: '+5 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 5. X-Content-Type-Options (up to 5 pts)
  // -----------------------------------------------------------------------
  const xcto = allHeaders['x-content-type-options']
  if (xcto) {
    rawScore += 5
    checks.push({
      name: 'X-Content-Type-Options',
      passed: true,
      details: `X-Content-Type-Options: ${xcto}`,
      points: 5,
    })
  } else {
    checks.push({
      name: 'X-Content-Type-Options',
      passed: false,
      details: 'No X-Content-Type-Options header (MIME-sniffing protection)',
      points: 0,
    })
    recommendations.push({
      action: 'Add X-Content-Type-Options: nosniff header.',
      impact: '+5 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 6. Rate limiting headers (up to 15 pts)
  // -----------------------------------------------------------------------
  const hasRateLimit =
    allHeaders['x-ratelimit-limit'] ||
    allHeaders['x-ratelimit-remaining'] ||
    allHeaders['retry-after']

  if (hasRateLimit) {
    rawScore += 15
    checks.push({
      name: 'Rate Limiting',
      passed: true,
      details: `Rate limit headers present: ${Object.entries(allHeaders)
        .filter(([k]) => k.includes('ratelimit') || k === 'retry-after')
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ')}`,
      points: 15,
    })
  } else {
    checks.push({
      name: 'Rate Limiting',
      passed: false,
      details: 'No rate limiting headers detected (X-RateLimit-Limit, Retry-After)',
      points: 0,
    })
    recommendations.push({
      action:
        'Add rate limiting with X-RateLimit-Limit and X-RateLimit-Remaining headers so agents can self-throttle.',
      impact: '+15 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 7. Error detail exposure (up to 10 pts)
  // -----------------------------------------------------------------------
  // Probe a non-existent endpoint and check if error response leaks internals
  const errorResult = await probeEndpoint(
    `${base}/api/this-should-not-exist-${Date.now()}`,
    'GET',
    globalSignal
  )

  if (errorResult.status !== null && errorResult.body) {
    const errorBody =
      typeof errorResult.body === 'string'
        ? errorResult.body
        : JSON.stringify(errorResult.body)

    const leaksStack = /stack|trace|at\s+\w+.*\.(js|ts|py)|line\s+\d+|column\s+\d+/i.test(errorBody)
    const leaksInternals = /node_modules|internal|process\.env|__dirname|root\//i.test(errorBody)

    if (!leaksStack && !leaksInternals) {
      rawScore += 10
      checks.push({
        name: 'Error Sanitization',
        passed: true,
        details: 'Error responses do not leak stack traces or internal paths',
        points: 10,
      })
    } else {
      rawScore += 2
      const leakTypes = [
        leaksStack ? 'stack traces' : '',
        leaksInternals ? 'internal paths' : '',
      ]
        .filter(Boolean)
        .join(' and ')
      checks.push({
        name: 'Error Sanitization',
        passed: false,
        details: `Error responses expose ${leakTypes}`,
        points: 2,
      })
      recommendations.push({
        action: `Sanitize error responses — currently exposing ${leakTypes}. Return generic error messages in production.`,
        impact: '+8 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    // Could not test error handling
    checks.push({
      name: 'Error Sanitization',
      passed: false,
      details: 'Could not verify error handling behavior',
      points: 0,
    })
  }

  // -----------------------------------------------------------------------
  // 8. CORS configuration (up to 10 pts)
  // -----------------------------------------------------------------------
  const corsOrigin = allHeaders['access-control-allow-origin']
  if (corsOrigin) {
    const isWildcard = corsOrigin === '*'
    if (isWildcard) {
      rawScore += 5
      checks.push({
        name: 'CORS Configuration',
        passed: false,
        details: 'CORS allows all origins (*) — functional but not restrictive',
        points: 5,
      })
      recommendations.push({
        action:
          'Restrict CORS to specific trusted origins instead of wildcard (*) for better security.',
        impact: '+5 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    } else {
      rawScore += 10
      checks.push({
        name: 'CORS Configuration',
        passed: true,
        details: `CORS configured with specific origin: ${corsOrigin}`,
        points: 10,
      })
    }
  } else {
    checks.push({
      name: 'CORS Configuration',
      passed: false,
      details: 'No CORS headers detected',
      points: 0,
    })
    // Not necessarily a recommendation — no CORS needed if not cross-origin
  }

  // -----------------------------------------------------------------------
  // 9. security.txt (up to 5 pts — bonus)
  // -----------------------------------------------------------------------
  const securityTxtResult = await probeEndpoint(
    `${base}/.well-known/security.txt`,
    'GET',
    globalSignal
  )
  if (securityTxtResult.found) {
    rawScore += 5
    checks.push({
      name: 'security.txt',
      passed: true,
      details: 'security.txt found at /.well-known/security.txt',
      points: 5,
    })
  } else {
    checks.push({
      name: 'security.txt',
      passed: false,
      details: 'No security.txt found at /.well-known/security.txt',
      points: 0,
    })
  }

  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D7',
    label: 'Security',
    score,
    weight: 0.1,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}

/** Returns true if the scanner detected no valid TLS (used for cap rules) */
export function hasNoTls(result: DimensionResult): boolean {
  const tlsCheck = result.checks.find((c) => c.name === 'TLS / HTTPS')
  return !tlsCheck || !tlsCheck.passed
}
