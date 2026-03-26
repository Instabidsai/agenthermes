// ---------------------------------------------------------------------------
// D3 — Onboarding (weight: 0.10)
// Can an agent create an account and get credentials without human help?
// Checks: /signup, /register, /api/auth endpoints, programmatic signup,
//         API key availability, developer portal, sandbox mode
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, endpointExists } from './types'

export async function scanOnboarding(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  // -----------------------------------------------------------------------
  // 1. Programmatic signup / registration (up to 30 pts)
  // -----------------------------------------------------------------------
  const signupPaths = [
    '/api/signup',
    '/api/v1/signup',
    '/api/register',
    '/api/v1/register',
    '/api/auth/signup',
    '/api/auth/register',
    '/api/auth/sign-up',
  ]
  const signupResults = await Promise.all(
    signupPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  // A 405 (Method Not Allowed) also counts — it means a POST route exists there
  const signupHits = signupResults.filter((r) => endpointExists(r))

  if (signupHits.length > 0) {
    rawScore += 30
    checks.push({
      name: 'Programmatic Signup',
      passed: true,
      details: `Signup endpoint(s) detected: ${signupHits.map((r) => `${r.url} (${r.status})`).join(', ')}`,
      points: 30,
    })
  } else {
    checks.push({
      name: 'Programmatic Signup',
      passed: false,
      details: `No programmatic signup endpoints found at ${signupPaths.length} common paths`,
      points: 0,
    })
    recommendations.push({
      action:
        'Create /api/signup or /api/register that accepts JSON POST and returns credentials — enabling agents to self-onboard without a browser.',
      impact: '+30 points',
      difficulty: 'hard',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 2. API key generation endpoint (up to 20 pts)
  // -----------------------------------------------------------------------
  const keyPaths = [
    '/api/keys',
    '/api/v1/keys',
    '/api/api-keys',
    '/api/v1/api-keys',
    '/api/tokens',
    '/api/v1/tokens',
  ]
  const keyResults = await Promise.all(
    keyPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const keyHits = keyResults.filter((r) => endpointExists(r))

  if (keyHits.length > 0) {
    rawScore += 20
    checks.push({
      name: 'API Key Generation',
      passed: true,
      details: `API key endpoint(s) detected: ${keyHits.map((r) => `${r.url} (${r.status})`).join(', ')}`,
      points: 20,
    })
  } else {
    checks.push({
      name: 'API Key Generation',
      passed: false,
      details: 'No dedicated API key generation endpoint found',
      points: 0,
    })
    recommendations.push({
      action:
        'Add /api/keys or /api/api-keys endpoint for programmatic API key generation so agents can obtain credentials.',
      impact: '+20 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 3. OAuth / OIDC discovery (up to 15 pts)
  // -----------------------------------------------------------------------
  const oauthPaths = [
    '/.well-known/openid-configuration',
    '/.well-known/oauth-authorization-server',
    '/oauth/token',
    '/api/oauth/token',
    '/auth/token',
  ]
  const oauthResults = await Promise.all(
    oauthPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const oauthHits = oauthResults.filter((r) => endpointExists(r))

  if (oauthHits.length > 0) {
    rawScore += 15
    checks.push({
      name: 'OAuth / OIDC',
      passed: true,
      details: `OAuth/OIDC endpoint(s) detected: ${oauthHits.map((r) => `${r.url} (${r.status})`).join(', ')}`,
      points: 15,
    })
  } else {
    checks.push({
      name: 'OAuth / OIDC',
      passed: false,
      details: 'No OAuth or OpenID Connect discovery endpoints found',
      points: 0,
    })
    recommendations.push({
      action:
        'Support OAuth 2.0 Client Credentials flow for server-to-server agent authentication.',
      impact: '+15 points',
      difficulty: 'hard',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 4. Developer portal (up to 15 pts)
  // -----------------------------------------------------------------------
  const devPaths = [
    '/developers',
    '/developer',
    '/dev',
    '/docs/getting-started',
    '/docs/api',
    '/api-docs',
  ]
  const devResults = await Promise.all(
    devPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const devHits = devResults.filter((r) => r.found)

  if (devHits.length > 0) {
    rawScore += 10
    checks.push({
      name: 'Developer Portal',
      passed: true,
      details: `Developer documentation at: ${devHits.map((r) => r.url).join(', ')}`,
      points: 10,
    })

    // Bonus: Check if docs mention API keys / auth
    const mentionsAuth = devHits.some((r) => {
      const text =
        typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? '')
      return /api.?key|token|credentials|authenticate|authorization/i.test(text)
    })
    if (mentionsAuth) {
      rawScore += 5
      checks.push({
        name: 'Auth Documentation',
        passed: true,
        details: 'Developer docs reference authentication/API keys',
        points: 5,
      })
    }
  } else {
    checks.push({
      name: 'Developer Portal',
      passed: false,
      details: 'No developer portal or onboarding documentation found',
      points: 0,
    })
    recommendations.push({
      action:
        'Create a /developers page with clear instructions for programmatic integration, including authentication and quickstart examples.',
      impact: '+15 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 5. Sandbox / test mode (up to 20 pts)
  // -----------------------------------------------------------------------
  const sandboxPaths = [
    '/api/sandbox',
    '/sandbox',
    '/api/v1/sandbox',
    '/api/test',
  ]
  const sandboxResults = await Promise.all(
    sandboxPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const sandboxHits = sandboxResults.filter((r) => endpointExists(r))

  // Also check homepage and dev docs for sandbox/test mode references
  const allBodies = [...devResults, ...sandboxResults].map((r) =>
    typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? '')
  )
  const mentionsSandbox = allBodies.some((text) =>
    /sandbox|test.?mode|playground|demo|staging|trial/i.test(text)
  )

  if (sandboxHits.length > 0) {
    rawScore += 20
    checks.push({
      name: 'Sandbox / Test Mode',
      passed: true,
      details: `Sandbox endpoint(s) detected: ${sandboxHits.map((r) => r.url).join(', ')}`,
      points: 20,
    })
  } else if (mentionsSandbox) {
    rawScore += 8
    checks.push({
      name: 'Sandbox / Test Mode',
      passed: false,
      details:
        'References to sandbox/test mode found in docs but no dedicated sandbox endpoint detected',
      points: 8,
    })
    recommendations.push({
      action:
        'Expose a dedicated /api/sandbox endpoint so agents can test integrations without side effects.',
      impact: '+12 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  } else {
    checks.push({
      name: 'Sandbox / Test Mode',
      passed: false,
      details: 'No sandbox, test mode, or playground detected',
      points: 0,
    })
    recommendations.push({
      action:
        'Offer a sandbox or test mode so agents can validate their integration before committing to paid usage.',
      impact: '+20 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D3',
    label: 'Onboarding',
    score,
    weight: 0.1,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
