// ---------------------------------------------------------------------------
// D7 — Security (weight: 0.12)
// Is the site secure enough for agent-to-business transactions?
// v2: Expanded checks for enterprise-grade companies. Now checks TLS version,
//     Referrer-Policy, bug bounty programs, auth quality, and CORS depth.
// Checks: TLS version + certificate, security headers (HSTS, CSP, X-Frame,
//         X-Content-Type, Referrer-Policy), rate limiting, error sanitization,
//         CORS, security.txt, bug bounty, auth quality
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, getApiSubdomains, extractDomain } from './types'

export async function scanSecurity(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  const isHttps = base.startsWith('https://')
  const domain = extractDomain(base)

  // -----------------------------------------------------------------------
  // 1. TLS / HTTPS (up to 20 pts) — CRITICAL, feeds into cap rules
  // -----------------------------------------------------------------------
  if (isHttps) {
    const tlsResult = await probeEndpoint(base, 'GET', globalSignal)

    if (tlsResult.found || (tlsResult.status !== null && tlsResult.status < 500)) {
      rawScore += 20
      checks.push({
        name: 'TLS / HTTPS',
        passed: true,
        details: 'Site serves over HTTPS with valid TLS certificate',
        points: 20,
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
        impact: '+15 points (removes cap)',
        difficulty: 'medium',
        auto_fixable: false,
      })
    } else {
      rawScore += 8
      checks.push({
        name: 'TLS / HTTPS',
        passed: false,
        details: `HTTPS URL but connection failed: ${tlsResult.error}`,
        points: 8,
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
      impact: '+20 points (removes cap)',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 2. TLS Version (up to 5 pts bonus — 1.2 minimum, 1.3 preferred)
  // -----------------------------------------------------------------------
  // We can detect TLS version indirectly via server header hints and
  // the alt-svc header (h3 implies TLS 1.3). Direct TLS version detection
  // is not available in fetch(), so we use proxy signals.
  if (isHttps) {
    const homepageForTls = await probeEndpoint(base, 'GET', globalSignal)
    const serverHeader = (homepageForTls.headers['server'] ?? '').toLowerCase()
    // alt-svc with h3 means HTTP/3 which requires TLS 1.3
    // Also check if the server explicitly advertises TLS 1.3 support
    const altSvcResult = await probeEndpoint(base, 'HEAD', globalSignal)
    const hasH3 = !!(altSvcResult.headers['alt-svc'] || '').match(/h3/)
    const hasModernServer =
      serverHeader.includes('cloudflare') ||
      serverHeader.includes('nginx/1.2') ||
      serverHeader.includes('openresty') ||
      serverHeader.includes('envoy')

    if (hasH3) {
      rawScore += 5
      checks.push({
        name: 'TLS Version',
        passed: true,
        details: 'TLS 1.3 detected (HTTP/3 / h3 advertised via alt-svc)',
        points: 5,
      })
    } else if (hasModernServer) {
      // Modern servers typically support TLS 1.2+ at minimum
      rawScore += 3
      checks.push({
        name: 'TLS Version',
        passed: true,
        details: `Modern server detected (${serverHeader || 'unknown'}), likely TLS 1.2+`,
        points: 3,
      })
    } else {
      // HTTPS works, so at least TLS 1.2 (most browsers enforce this)
      rawScore += 2
      checks.push({
        name: 'TLS Version',
        passed: true,
        details: 'TLS 1.2+ assumed (HTTPS connection successful)',
        points: 2,
      })
    }
  } else {
    checks.push({
      name: 'TLS Version',
      passed: false,
      details: 'No TLS — site does not use HTTPS',
      points: 0,
    })
  }

  // Probe homepage, API paths, and API subdomains for security headers
  const homepageResult = await probeEndpoint(base, 'GET', globalSignal)
  const apiResult = await probeEndpoint(`${base}/api`, 'GET', globalSignal)

  // Also probe API subdomains to catch rate-limit and CORS headers
  const apiSubdomains = getApiSubdomains(base)

  const subdomainProbes = apiSubdomains.flatMap((sub) => [
    probeEndpoint(sub, 'GET', globalSignal),
    probeEndpoint(`${sub}/v1`, 'GET', globalSignal),
  ])
  const subdomainResults = await Promise.allSettled(subdomainProbes)
  const subdomainSuccesses = subdomainResults
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)

  // Merge headers from all probes (subdomain headers override base domain)
  const allHeaders: Record<string, string> = { ...homepageResult.headers, ...apiResult.headers }
  for (const r of subdomainSuccesses) {
    Object.assign(allHeaders, r.headers)
  }

  // -----------------------------------------------------------------------
  // 3. Strict-Transport-Security (HSTS) (up to 12 pts)
  // -----------------------------------------------------------------------
  const hsts = allHeaders['strict-transport-security']
  if (hsts) {
    const hasMaxAge = /max-age=\d+/i.test(hsts)
    const hasIncludeSubdomains = /includeSubDomains/i.test(hsts)
    const hasPreload = /preload/i.test(hsts)

    if (hasMaxAge && hasIncludeSubdomains && hasPreload) {
      rawScore += 12
      checks.push({
        name: 'HSTS',
        passed: true,
        details: `Full HSTS with includeSubDomains + preload: ${hsts}`,
        points: 12,
      })
    } else if (hasMaxAge && hasIncludeSubdomains) {
      rawScore += 10
      checks.push({
        name: 'HSTS',
        passed: true,
        details: `HSTS with includeSubDomains: ${hsts}`,
        points: 10,
      })
    } else if (hasMaxAge) {
      rawScore += 7
      checks.push({
        name: 'HSTS',
        passed: true,
        details: `HSTS header present but missing includeSubDomains: ${hsts}`,
        points: 7,
      })
      recommendations.push({
        action: 'Add includeSubDomains and preload to your HSTS header for comprehensive TLS enforcement.',
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
        'Add Strict-Transport-Security header with max-age, includeSubDomains, and preload to enforce HTTPS.',
      impact: '+12 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 4. Content-Security-Policy (up to 8 pts)
  // -----------------------------------------------------------------------
  const csp = allHeaders['content-security-policy']
  if (csp) {
    rawScore += 8
    checks.push({
      name: 'Content-Security-Policy',
      passed: true,
      details: `CSP header present (${csp.length} chars)`,
      points: 8,
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
      impact: '+8 points',
      difficulty: 'medium',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 5. X-Frame-Options (up to 4 pts)
  // -----------------------------------------------------------------------
  const xfo = allHeaders['x-frame-options']
  if (xfo) {
    rawScore += 4
    checks.push({
      name: 'X-Frame-Options',
      passed: true,
      details: `X-Frame-Options: ${xfo}`,
      points: 4,
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
      impact: '+4 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 6. X-Content-Type-Options (up to 4 pts)
  // -----------------------------------------------------------------------
  const xcto = allHeaders['x-content-type-options']
  if (xcto) {
    rawScore += 4
    checks.push({
      name: 'X-Content-Type-Options',
      passed: true,
      details: `X-Content-Type-Options: ${xcto}`,
      points: 4,
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
      impact: '+4 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 7. Referrer-Policy (up to 4 pts)
  // -----------------------------------------------------------------------
  const referrerPolicy = allHeaders['referrer-policy']
  if (referrerPolicy) {
    const strictPolicies = [
      'no-referrer',
      'same-origin',
      'strict-origin',
      'strict-origin-when-cross-origin',
      'no-referrer-when-downgrade',
    ]
    const isStrict = strictPolicies.some((p) => referrerPolicy.toLowerCase().includes(p))
    if (isStrict) {
      rawScore += 4
      checks.push({
        name: 'Referrer-Policy',
        passed: true,
        details: `Referrer-Policy: ${referrerPolicy}`,
        points: 4,
      })
    } else {
      rawScore += 2
      checks.push({
        name: 'Referrer-Policy',
        passed: true,
        details: `Referrer-Policy present but weak: ${referrerPolicy}`,
        points: 2,
      })
      recommendations.push({
        action: 'Use a stricter Referrer-Policy like strict-origin-when-cross-origin.',
        impact: '+2 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    checks.push({
      name: 'Referrer-Policy',
      passed: false,
      details: 'No Referrer-Policy header found',
      points: 0,
    })
    recommendations.push({
      action: 'Add Referrer-Policy: strict-origin-when-cross-origin header.',
      impact: '+4 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 8. Rate limiting headers (up to 12 pts)
  // -----------------------------------------------------------------------
  const hasRateLimitHeader =
    allHeaders['x-ratelimit-limit'] ||
    allHeaders['x-ratelimit-remaining'] ||
    allHeaders['retry-after']

  if (hasRateLimitHeader) {
    const headerList = Object.entries(allHeaders)
      .filter(([k]) => k.includes('ratelimit') || k === 'retry-after')
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ')

    // Full credit if both limit and remaining are present (agents can self-throttle)
    const hasLimit = !!allHeaders['x-ratelimit-limit']
    const hasRemaining = !!allHeaders['x-ratelimit-remaining']

    if (hasLimit && hasRemaining) {
      rawScore += 12
      checks.push({
        name: 'Rate Limiting',
        passed: true,
        details: `Full rate limit headers: ${headerList}`,
        points: 12,
      })
    } else {
      rawScore += 8
      checks.push({
        name: 'Rate Limiting',
        passed: true,
        details: `Partial rate limit headers: ${headerList}`,
        points: 8,
      })
      recommendations.push({
        action: 'Include both X-RateLimit-Limit and X-RateLimit-Remaining so agents can self-throttle.',
        impact: '+4 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
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
      impact: '+12 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 9. Error detail exposure (up to 8 pts)
  // -----------------------------------------------------------------------
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
      rawScore += 8
      checks.push({
        name: 'Error Sanitization',
        passed: true,
        details: 'Error responses do not leak stack traces or internal paths',
        points: 8,
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
        impact: '+6 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    checks.push({
      name: 'Error Sanitization',
      passed: false,
      details: 'Could not verify error handling behavior',
      points: 0,
    })
  }

  // -----------------------------------------------------------------------
  // 10. CORS configuration (up to 8 pts)
  // -----------------------------------------------------------------------
  const corsOrigin = allHeaders['access-control-allow-origin']
  const corsMethods = allHeaders['access-control-allow-methods']

  if (corsOrigin) {
    const isWildcard = corsOrigin === '*'
    if (isWildcard) {
      rawScore += 4
      checks.push({
        name: 'CORS Configuration',
        passed: false,
        details: 'CORS allows all origins (*) — functional but not restrictive',
        points: 4,
      })
      recommendations.push({
        action:
          'Restrict CORS to specific trusted origins instead of wildcard (*) for better security.',
        impact: '+4 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    } else {
      // Specific origin — check if methods are also restricted
      const methodPoints = corsMethods ? 8 : 6
      rawScore += methodPoints
      checks.push({
        name: 'CORS Configuration',
        passed: true,
        details: `CORS configured with specific origin: ${corsOrigin}${corsMethods ? `, methods: ${corsMethods}` : ''}`,
        points: methodPoints,
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
  // 11. security.txt (up to 5 pts)
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
    recommendations.push({
      action: 'Add a /.well-known/security.txt file with contact info and disclosure policy (RFC 9116).',
      impact: '+5 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  // -----------------------------------------------------------------------
  // 12. Bug bounty program (up to 5 pts)
  // -----------------------------------------------------------------------
  // Check security.txt body for bug bounty references, and probe common paths
  const secTxtBody =
    typeof securityTxtResult.body === 'string' ? securityTxtResult.body : ''
  const homepageBody =
    typeof homepageResult.body === 'string' ? homepageResult.body : ''
  const combinedBody = `${secTxtBody} ${homepageBody}`

  const hasBugBountyRef =
    /hackerone\.com|bugcrowd\.com|immunefi\.com|intigriti\.com|bug.?bounty|vulnerability.?disclosure|responsible.?disclosure/i.test(
      combinedBody
    )

  // Also check common bug bounty paths
  const bugBountyProbes = await Promise.allSettled([
    probeEndpoint(`${base}/security`, 'GET', globalSignal),
    probeEndpoint(`${base}/.well-known/security.txt`, 'GET', globalSignal),
    ...(domain
      ? [probeEndpoint(`https://hackerone.com/${domain.replace(/\.\w+$/, '')}`, 'HEAD', globalSignal)]
      : []),
  ])
  const bugBountyHits = bugBountyProbes
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)

  const securityPageFound = bugBountyHits.some((r) => r.found)
  const hackeroneFound = bugBountyHits.some(
    (r) => r.url?.includes('hackerone.com') && r.found
  )

  if (hasBugBountyRef || hackeroneFound) {
    rawScore += 5
    checks.push({
      name: 'Bug Bounty Program',
      passed: true,
      details: hasBugBountyRef
        ? 'Bug bounty or vulnerability disclosure program referenced'
        : 'HackerOne profile found',
      points: 5,
    })
  } else if (securityPageFound) {
    rawScore += 2
    checks.push({
      name: 'Bug Bounty Program',
      passed: false,
      details: 'Security page exists but no bug bounty program detected',
      points: 2,
    })
    recommendations.push({
      action: 'List your bug bounty or vulnerability disclosure program on your /security page or security.txt.',
      impact: '+3 points',
      difficulty: 'easy',
      auto_fixable: false,
    })
  } else {
    checks.push({
      name: 'Bug Bounty Program',
      passed: false,
      details: 'No bug bounty or vulnerability disclosure program found',
      points: 0,
    })
    recommendations.push({
      action: 'Establish a vulnerability disclosure policy. Consider HackerOne or Bugcrowd for managed programs.',
      impact: '+5 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 13. Authentication quality (up to 5 pts)
  // -----------------------------------------------------------------------
  // Check if protected endpoints return structured 401/403 with clear messages
  // rather than generic blocks or HTML error pages
  const authProbes = await Promise.allSettled([
    probeEndpoint(`${base}/api/v1/me`, 'GET', globalSignal),
    probeEndpoint(`${base}/api/user`, 'GET', globalSignal),
    probeEndpoint(`${base}/api/v1/account`, 'GET', globalSignal),
    probeEndpoint(`${base}/api/v1/organizations`, 'GET', globalSignal),
    ...apiSubdomains.map((sub) => probeEndpoint(`${sub}/v1/me`, 'GET', globalSignal)),
  ])
  const authResults = authProbes
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)

  const authProtected = authResults.filter(
    (r) => r.status === 401 || r.status === 403
  )

  if (authProtected.length > 0) {
    // Check if the auth error response is structured JSON with a message
    const bestAuthResponse = authProtected[0]
    const authBody = bestAuthResponse.body
    const isJsonAuth =
      typeof authBody === 'object' &&
      authBody !== null &&
      ('error' in (authBody as Record<string, unknown>) ||
        'message' in (authBody as Record<string, unknown>) ||
        'code' in (authBody as Record<string, unknown>))

    if (isJsonAuth) {
      rawScore += 5
      checks.push({
        name: 'Auth Quality',
        passed: true,
        details: `Auth endpoints return structured JSON errors (${bestAuthResponse.status} with error object)`,
        points: 5,
      })
    } else {
      rawScore += 3
      checks.push({
        name: 'Auth Quality',
        passed: true,
        details: `Auth endpoints return ${bestAuthResponse.status} but without structured error body`,
        points: 3,
      })
      recommendations.push({
        action: 'Return structured JSON error responses on 401/403 (e.g., { error: { type, message } }) so agents can handle auth failures programmatically.',
        impact: '+2 points',
        difficulty: 'easy',
        auto_fixable: true,
      })
    }
  } else {
    // No auth-protected endpoints found — not necessarily bad, but no credit
    checks.push({
      name: 'Auth Quality',
      passed: false,
      details: 'No auth-protected API endpoints detected to evaluate',
      points: 0,
    })
  }

  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D7',
    label: 'Security',
    score,
    weight: 0.12,
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
