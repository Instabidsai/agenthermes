// ---------------------------------------------------------------------------
// D3 — Onboarding (weight: 0.10)
// Can an agent create an account and get credentials without human help?
// Checks: /signup, /register, /api/auth endpoints, programmatic signup,
//         API key availability, developer portal, sandbox mode,
//         social/OAuth login, CLI/SDK onboarding, HTML signup indicators
// ---------------------------------------------------------------------------

import type { DimensionResult, Check, Recommendation } from './types'
import { probeEndpoint, endpointExists, extractDomain } from './types'

// ---------------------------------------------------------------------------
// HTML content analysis helpers
// ---------------------------------------------------------------------------

/** Check if page HTML contains signup form indicators */
function hasSignupFormIndicators(body: unknown): {
  hasForm: boolean
  hasEmailInput: boolean
  hasSignupButton: boolean
  details: string[]
} {
  const text = typeof body === 'string' ? body : JSON.stringify(body ?? '')
  const details: string[] = []

  // Check for <form> tags with action containing signup-related words
  const hasForm = /<form[^>]*action\s*=\s*["'][^"']*(sign|register|create|onboard)/i.test(text)
  if (hasForm) details.push('form action with signup pattern')

  // Check for email input fields
  const hasEmailInput =
    /type\s*=\s*["']email["']/i.test(text) ||
    /name\s*=\s*["']email["']/i.test(text) ||
    /id\s*=\s*["']email["']/i.test(text)
  if (hasEmailInput) details.push('email input field')

  // Check for signup buttons / CTAs
  const hasSignupButton =
    />(sign\s*up|get\s*started|create\s*(an?\s*)?account|start\s*free|try\s*(it\s*)?free|register\s*now|join\s*(for\s*)?free)<\//i.test(text) ||
    /value\s*=\s*["'](sign\s*up|get\s*started|create\s*account|start\s*free|register)/i.test(text) ||
    /aria-label\s*=\s*["'](sign\s*up|get\s*started|create\s*account)/i.test(text)
  if (hasSignupButton) details.push('signup button/CTA')

  return { hasForm, hasEmailInput, hasSignupButton, details }
}

/** Check if page HTML contains social/OAuth login links */
function hasSocialLoginIndicators(body: unknown): {
  hasGitHub: boolean
  hasGoogle: boolean
  hasMicrosoft: boolean
  hasAnyOAuth: boolean
  details: string[]
} {
  const text = typeof body === 'string' ? body : JSON.stringify(body ?? '')
  const details: string[] = []

  const hasGitHub = /github\.com\/login\/oauth/i.test(text) ||
    /Sign\s*(in|up)\s*with\s*GitHub/i.test(text)
  if (hasGitHub) details.push('GitHub OAuth')

  const hasGoogle = /accounts\.google\.com/i.test(text) ||
    /Sign\s*(in|up)\s*with\s*Google/i.test(text)
  if (hasGoogle) details.push('Google OAuth')

  const hasMicrosoft = /login\.microsoftonline\.com/i.test(text) ||
    /Sign\s*(in|up)\s*with\s*Microsoft/i.test(text)
  if (hasMicrosoft) details.push('Microsoft OAuth')

  // Generic OAuth callback patterns
  const hasCallbackUrl = /\/auth\/callback/i.test(text) ||
    /\/oauth\/callback/i.test(text) ||
    /\/api\/auth\/callback/i.test(text)
  if (hasCallbackUrl && !hasGitHub && !hasGoogle && !hasMicrosoft) {
    details.push('OAuth callback URL')
  }

  const hasAnyOAuth = hasGitHub || hasGoogle || hasMicrosoft || hasCallbackUrl

  return { hasGitHub, hasGoogle, hasMicrosoft, hasAnyOAuth, details }
}

/** Check if page HTML mentions CLI/SDK installation */
function hasCliSdkIndicators(body: unknown): {
  hasNpm: boolean
  hasPip: boolean
  hasBrew: boolean
  hasAnyCli: boolean
  details: string[]
} {
  const text = typeof body === 'string' ? body : JSON.stringify(body ?? '')
  const details: string[] = []

  const hasNpm = /npm\s+install\s/i.test(text) ||
    /npx\s+/i.test(text) ||
    /yarn\s+add\s/i.test(text) ||
    /pnpm\s+(add|install)\s/i.test(text)
  if (hasNpm) details.push('npm/yarn/pnpm install')

  const hasPip = /pip\s+install\s/i.test(text) ||
    /pip3\s+install\s/i.test(text) ||
    /poetry\s+add\s/i.test(text)
  if (hasPip) details.push('pip install')

  const hasBrew = /brew\s+install\s/i.test(text)
  if (hasBrew) details.push('brew install')

  // Generic CLI references
  const hasCli = /\bcli\b/i.test(text) && /install/i.test(text)
  if (hasCli && !hasNpm && !hasPip && !hasBrew) {
    details.push('CLI install reference')
  }

  const hasAnyCli = hasNpm || hasPip || hasBrew || hasCli

  return { hasNpm, hasPip, hasBrew, hasAnyCli, details }
}

// ---------------------------------------------------------------------------
// Main scanner
// ---------------------------------------------------------------------------

export async function scanOnboarding(
  base: string,
  globalSignal?: AbortSignal
): Promise<DimensionResult> {
  const checks: Check[] = []
  const recommendations: Recommendation[] = []
  let rawScore = 0

  const domain = extractDomain(base)

  // -----------------------------------------------------------------------
  // 1. Programmatic signup / registration (up to 25 pts)
  // -----------------------------------------------------------------------
  const signupApiPaths = [
    '/api/signup',
    '/api/v1/signup',
    '/api/register',
    '/api/v1/register',
    '/api/auth/signup',
    '/api/auth/register',
    '/api/auth/sign-up',
  ]
  const signupApiResults = await Promise.all(
    signupApiPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  // A 405 (Method Not Allowed) also counts — it means a POST route exists there
  const signupApiHits = signupApiResults.filter((r) => endpointExists(r))

  // Expanded signup page paths — covers modern SaaS conventions
  const signupPagePaths = [
    '/register',
    '/signup',
    '/sign-up',
    '/join',
    '/get-started',
    '/start',
    '/create-account',
    '/try-free',
    '/onboard',
    '/quick-start',
    '/app/signup',
    '/app/register',
    '/auth/signup',
    '/auth/register',
    '/auth/sign-up',
  ]
  const signupPageResults = await Promise.all(
    signupPagePaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const signupPageHits = signupPageResults.filter((r) => r.found)

  // Analyze HTML content of signup pages for form indicators
  let signupHtmlSignals = 0
  const signupHtmlDetails: string[] = []
  for (const hit of signupPageHits) {
    const indicators = hasSignupFormIndicators(hit.body)
    if (indicators.hasEmailInput) signupHtmlSignals++
    if (indicators.hasSignupButton) signupHtmlSignals++
    if (indicators.hasForm) signupHtmlSignals++
    signupHtmlDetails.push(...indicators.details)
  }

  if (signupApiHits.length > 0) {
    rawScore += 25
    checks.push({
      name: 'Programmatic Signup',
      passed: true,
      details: `Signup endpoint(s) detected: ${signupApiHits.map((r) => `${r.url} (${r.status})`).join(', ')}`,
      points: 25,
    })
  } else if (signupPageHits.length > 0) {
    // Registration page exists but not a JSON API — partial credit
    // Give extra credit if the page has real signup form indicators
    const formBonus = Math.min(signupHtmlSignals * 3, 9)
    const pagePoints = 8 + formBonus
    rawScore += pagePoints
    const formDetail = signupHtmlDetails.length > 0
      ? ` (HTML signals: ${[...new Set(signupHtmlDetails)].join(', ')})`
      : ''
    checks.push({
      name: 'Programmatic Signup',
      passed: false,
      details: `Registration page found at ${signupPageHits.map((r) => r.url).join(', ')} but no JSON API endpoint for programmatic signup${formDetail}`,
      points: pagePoints,
    })
    recommendations.push({
      action:
        'Create /api/signup or /api/register that accepts JSON POST and returns credentials — upgrading your browser-based signup to agent-friendly.',
      impact: `+${25 - pagePoints} points`,
      difficulty: 'hard',
      auto_fixable: false,
    })
  } else {
    checks.push({
      name: 'Programmatic Signup',
      passed: false,
      details: `No signup endpoints or registration pages found`,
      points: 0,
    })
    recommendations.push({
      action:
        'Create /api/signup or /api/register that accepts JSON POST and returns credentials — enabling agents to self-onboard without a browser.',
      impact: '+25 points',
      difficulty: 'hard',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 2. API key generation endpoint (up to 15 pts)
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
    rawScore += 15
    checks.push({
      name: 'API Key Generation',
      passed: true,
      details: `API key endpoint(s) detected: ${keyHits.map((r) => `${r.url} (${r.status})`).join(', ')}`,
      points: 15,
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
      impact: '+15 points',
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
  // Also check common auth subdomains
  const oauthSubdomainPaths = domain ? [
    `https://connect.${domain}/oauth/authorize`,
    `https://connect.${domain}/oauth/token`,
    `https://auth.${domain}/oauth/token`,
    `https://auth.${domain}/.well-known/openid-configuration`,
    `https://accounts.${domain}/.well-known/openid-configuration`,
    `https://login.${domain}/.well-known/openid-configuration`,
  ] : []
  const allOauthUrls = [
    ...oauthPaths.map((p) => `${base}${p}`),
    ...oauthSubdomainPaths,
  ]
  const oauthResults = await Promise.all(
    allOauthUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
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
  // 4. Social / OAuth login on pages (up to 5 pts)
  //    Complements section 3 — checks HTML content for social login links
  // -----------------------------------------------------------------------
  const allPageBodies = [
    ...signupPageResults.filter((r) => r.found),
  ]
  // Also probe homepage for social login indicators
  const homepageResult = await probeEndpoint(base, 'GET', globalSignal)
  allPageBodies.push(homepageResult)

  const socialDetails: string[] = []
  let hasSocialLogin = false
  for (const page of allPageBodies) {
    const social = hasSocialLoginIndicators(page.body)
    if (social.hasAnyOAuth) {
      hasSocialLogin = true
      socialDetails.push(...social.details)
    }
  }

  if (hasSocialLogin) {
    rawScore += 5
    checks.push({
      name: 'Social / OAuth Login',
      passed: true,
      details: `Social login options detected: ${[...new Set(socialDetails)].join(', ')}`,
      points: 5,
    })
  } else {
    checks.push({
      name: 'Social / OAuth Login',
      passed: false,
      details: 'No social login (GitHub, Google, Microsoft) or OAuth callback links found in pages',
      points: 0,
    })
    // Only recommend if they also lack OAuth discovery (section 3)
    if (oauthHits.length === 0) {
      recommendations.push({
        action:
          'Add social login options (GitHub, Google) — agents can automate OAuth Client Credentials flows for these providers.',
        impact: '+5 points',
        difficulty: 'medium',
        auto_fixable: false,
      })
    }
  }

  // -----------------------------------------------------------------------
  // 5. Developer portal + app/dashboard/console subdomains (up to 12 pts)
  // -----------------------------------------------------------------------
  const devPaths = [
    '/developers',
    '/developer',
    '/dev',
    '/docs/getting-started',
    '/docs/api',
    '/api-docs',
    '/docs',
  ]
  // Check developer subdomains AND app/dashboard/console subdomains
  const devSubdomainUrls = domain ? [
    `https://docs.${domain}`,
    `https://docs.${domain}/api`,
    `https://docs.${domain}/getting-started`,
    `https://developer.${domain}`,
    `https://developers.${domain}`,
    `https://developers.${domain}/docs`,
    `https://app.${domain}`,
    `https://dashboard.${domain}`,
    `https://console.${domain}`,
  ] : []
  const allDevUrls = [
    ...devPaths.map((p) => `${base}${p}`),
    ...devSubdomainUrls,
  ]
  const devResults = await Promise.all(
    allDevUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const devHits = devResults.filter((r) => r.found)

  if (devHits.length > 0) {
    rawScore += 8
    checks.push({
      name: 'Developer Portal',
      passed: true,
      details: `Developer documentation / app portal at: ${devHits.map((r) => r.url).join(', ')}`,
      points: 8,
    })

    // Bonus: Check if docs mention API keys / auth
    const mentionsAuth = devHits.some((r) => {
      const text =
        typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? '')
      return /api.?key|token|credentials|authenticate|authorization/i.test(text)
    })
    if (mentionsAuth) {
      rawScore += 4
      checks.push({
        name: 'Auth Documentation',
        passed: true,
        details: 'Developer docs reference authentication/API keys',
        points: 4,
      })
    }
  } else {
    checks.push({
      name: 'Developer Portal',
      passed: false,
      details: 'No developer portal, app dashboard, or onboarding documentation found',
      points: 0,
    })
    recommendations.push({
      action:
        'Create a /developers page with clear instructions for programmatic integration, including authentication and quickstart examples. Also consider app.{domain} or dashboard.{domain} for authenticated access.',
      impact: '+12 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 6. CLI / SDK installation (up to 8 pts)
  // -----------------------------------------------------------------------
  const allBodiesForCli = [
    homepageResult,
    ...devResults.filter((r) => r.found),
  ]
  const cliDetails: string[] = []
  let hasCliInstall = false
  for (const page of allBodiesForCli) {
    const cli = hasCliSdkIndicators(page.body)
    if (cli.hasAnyCli) {
      hasCliInstall = true
      cliDetails.push(...cli.details)
    }
  }

  if (hasCliInstall) {
    rawScore += 8
    checks.push({
      name: 'CLI / SDK Installation',
      passed: true,
      details: `CLI/SDK install instructions found: ${[...new Set(cliDetails)].join(', ')}`,
      points: 8,
    })
  } else {
    checks.push({
      name: 'CLI / SDK Installation',
      passed: false,
      details: 'No CLI or SDK installation instructions (npm install, pip install, brew install) found on homepage or docs',
      points: 0,
    })
    recommendations.push({
      action:
        'Provide a CLI tool or SDK (npm/pip/brew) that agents can use to sign up and configure access programmatically.',
      impact: '+8 points',
      difficulty: 'medium',
      auto_fixable: false,
    })
  }

  // -----------------------------------------------------------------------
  // 7. Sandbox / test mode (up to 15 pts)
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
  const allBodiesForSandbox = [...devResults, ...sandboxResults, homepageResult].map((r) =>
    typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? '')
  )
  const mentionsSandbox = allBodiesForSandbox.some((text) =>
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
