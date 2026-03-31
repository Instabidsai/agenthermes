// ---------------------------------------------------------------------------
// D3 — Onboarding (weight: 0.08)
// Can an agent create an account and get credentials without human help?
// Checks: /signup, /register, /api/auth endpoints, programmatic signup,
//         API key availability, developer portal, sandbox mode,
//         social/OAuth login, CLI/SDK onboarding, HTML signup indicators,
//         OAuth/OIDC discovery, developer dashboards, "Get API Key" CTAs
//
// v3: Expanded signup path detection (/register, /signup, /sign-up,
//     /get-started, /create-account), OAuth endpoint probing
//     (/oauth/authorize, /.well-known/openid-configuration), developer
//     dashboard subdomains (dashboard.X, console.X, app.X), sandbox/test
//     mode indicators in docs, "Get API Key" / "Start Free" CTA detection.
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

/** Check if page HTML contains "Get API Key" or "Start Free" CTAs (NEW in v3) */
function hasOnboardingCtaIndicators(body: unknown): {
  hasGetApiKey: boolean
  hasStartFree: boolean
  hasGetStarted: boolean
  hasTryNow: boolean
  hasAny: boolean
  details: string[]
} {
  const text = typeof body === 'string' ? body : JSON.stringify(body ?? '')
  const details: string[] = []

  const hasGetApiKey = /get\s*(your\s*)?(an?\s*)?api\s*key/i.test(text) ||
    /generate\s*(your\s*)?(an?\s*)?api\s*key/i.test(text) ||
    /create\s*(your\s*)?(an?\s*)?api\s*key/i.test(text) ||
    /request\s*(your\s*)?(an?\s*)?api\s*(key|access)/i.test(text)
  if (hasGetApiKey) details.push('Get API Key CTA')

  const hasStartFree = /start\s*(for\s*)?free/i.test(text) ||
    /free\s*tier/i.test(text) ||
    /free\s*plan/i.test(text) ||
    /start\s*building\s*free/i.test(text) ||
    /free\s*trial/i.test(text)
  if (hasStartFree) details.push('Start Free CTA')

  const hasGetStarted = /get\s*started/i.test(text) ||
    /quick\s*start/i.test(text) ||
    /start\s*building/i.test(text)
  if (hasGetStarted) details.push('Get Started CTA')

  const hasTryNow = /try\s*(it\s*)?(now|today|free)/i.test(text) ||
    /sign\s*up\s*(now|today|free)/i.test(text) ||
    /start\s*now/i.test(text)
  if (hasTryNow) details.push('Try Now CTA')

  const hasAny = hasGetApiKey || hasStartFree || hasGetStarted || hasTryNow

  return { hasGetApiKey, hasStartFree, hasGetStarted, hasTryNow, hasAny, details }
}

/** Check if text references sandbox or test mode (NEW in v3) */
function hasSandboxIndicatorsInText(text: string): {
  hasSandbox: boolean
  hasTestMode: boolean
  hasPlayground: boolean
  hasTestKeys: boolean
  hasAny: boolean
  details: string[]
} {
  const details: string[] = []

  const hasSandbox = /\bsandbox\b/i.test(text) &&
    (/(environment|mode|api|endpoint|url|key)/i.test(text))
  if (hasSandbox) details.push('sandbox environment')

  const hasTestMode = /test\s*mode/i.test(text) ||
    /test\s*environment/i.test(text) ||
    /testing\s*environment/i.test(text)
  if (hasTestMode) details.push('test mode')

  const hasPlayground = /\bplayground\b/i.test(text) ||
    /\bapi\s*explorer\b/i.test(text) ||
    /\bapi\s*console\b/i.test(text) ||
    /\btry\s*it\s*(out|live)\b/i.test(text)
  if (hasPlayground) details.push('playground/explorer')

  const hasTestKeys = /test\s*(api\s*)?key/i.test(text) ||
    /sk_test_/i.test(text) ||
    /pk_test_/i.test(text) ||
    /test_[a-zA-Z0-9]/i.test(text)
  if (hasTestKeys) details.push('test API keys')

  const hasAny = hasSandbox || hasTestMode || hasPlayground || hasTestKeys

  return { hasSandbox, hasTestMode, hasPlayground, hasTestKeys, hasAny, details }
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
  // 0. Fetch homepage once — reused by multiple checks below
  // -----------------------------------------------------------------------
  const homepageResult = await probeEndpoint(base, 'GET', globalSignal)
  const homepageHtml =
    homepageResult.found && typeof homepageResult.body === 'string'
      ? homepageResult.body
      : ''

  // -----------------------------------------------------------------------
  // 1. Programmatic signup / registration (up to 25 pts)
  //    v3: Also checks /register, /signup, /sign-up, /get-started,
  //    /create-account on main domain (follows redirects).
  // -----------------------------------------------------------------------
  const signupApiPaths = [
    '/api/signup',
    '/api/v1/signup',
    '/api/register',
    '/api/v1/register',
    '/api/auth/signup',
    '/api/auth/register',
    '/api/auth/sign-up',
    '/api/v1/auth/signup',
    '/api/v2/signup',
  ]
  const signupApiSettled = await Promise.allSettled(
    signupApiPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const signupApiResults = signupApiSettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
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
    '/login',   // many sites redirect /login to combined login/signup
    '/account/create',
    '/account/register',
    '/free-trial',
    '/trial',
  ]
  const signupPageSettled = await Promise.allSettled(
    signupPagePaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const signupPageResults = signupPageSettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
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
      details: `Registration page found at ${signupPageHits.map((r) => r.url).slice(0, 3).join(', ')} but no JSON API endpoint for programmatic signup${formDetail}`,
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
  //    v3: Also checks "Get API Key" CTAs in page content.
  // -----------------------------------------------------------------------
  const keyPaths = [
    '/api/keys',
    '/api/v1/keys',
    '/api/api-keys',
    '/api/v1/api-keys',
    '/api/tokens',
    '/api/v1/tokens',
    '/api/credentials',
    '/api/v1/credentials',
  ]
  const keySettled = await Promise.allSettled(
    keyPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const keyResults = keySettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
  const keyHits = keyResults.filter((r) => endpointExists(r))

  // Check homepage and signup pages for "Get API Key" CTAs
  const apiKeyCta = hasOnboardingCtaIndicators(homepageHtml)
  for (const hit of signupPageHits) {
    const cta = hasOnboardingCtaIndicators(hit.body)
    if (cta.hasGetApiKey) apiKeyCta.hasGetApiKey = true
    if (cta.hasAny) apiKeyCta.hasAny = true
    apiKeyCta.details.push(...cta.details)
  }

  if (keyHits.length > 0) {
    rawScore += 15
    checks.push({
      name: 'API Key Generation',
      passed: true,
      details: `API key endpoint(s) detected: ${keyHits.map((r) => `${r.url} (${r.status})`).join(', ')}`,
      points: 15,
    })
  } else if (apiKeyCta.hasGetApiKey) {
    rawScore += 7
    checks.push({
      name: 'API Key Generation',
      passed: false,
      details: `"Get API Key" CTA found in page content but no dedicated API endpoint for key generation`,
      points: 7,
    })
    recommendations.push({
      action:
        'Add /api/keys or /api/api-keys endpoint for programmatic API key generation so agents can obtain credentials without a browser.',
      impact: '+8 points',
      difficulty: 'medium',
      auto_fixable: false,
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
  //    v3: Added /oauth/authorize, expanded subdomain checks.
  // -----------------------------------------------------------------------
  const oauthPaths = [
    '/.well-known/openid-configuration',
    '/.well-known/oauth-authorization-server',
    '/oauth/token',
    '/oauth/authorize',
    '/api/oauth/token',
    '/api/oauth/authorize',
    '/auth/token',
    '/auth/authorize',
  ]
  // Also check common auth subdomains
  const oauthSubdomainPaths = domain ? [
    `https://connect.${domain}/oauth/authorize`,
    `https://connect.${domain}/oauth/token`,
    `https://auth.${domain}/oauth/token`,
    `https://auth.${domain}/oauth/authorize`,
    `https://auth.${domain}/.well-known/openid-configuration`,
    `https://accounts.${domain}/.well-known/openid-configuration`,
    `https://accounts.${domain}/oauth/authorize`,
    `https://login.${domain}/.well-known/openid-configuration`,
    `https://login.${domain}/oauth/authorize`,
    `https://sso.${domain}/.well-known/openid-configuration`,
    `https://id.${domain}/.well-known/openid-configuration`,
  ] : []
  const allOauthUrls = [
    ...oauthPaths.map((p) => `${base}${p}`),
    ...oauthSubdomainPaths,
  ]
  const oauthSettled = await Promise.allSettled(
    allOauthUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const oauthResults = oauthSettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
  const oauthHits = oauthResults.filter((r) => endpointExists(r))

  if (oauthHits.length > 0) {
    rawScore += 15
    checks.push({
      name: 'OAuth / OIDC',
      passed: true,
      details: `OAuth/OIDC endpoint(s) detected: ${oauthHits.map((r) => `${r.url} (${r.status})`).slice(0, 4).join(', ')}`,
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
  //    v3: Expanded to include more dashboard subdomains.
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
    `https://manage.${domain}`,
    `https://portal.${domain}`,
    `https://my.${domain}`,
  ] : []
  const allDevUrls = [
    ...devPaths.map((p) => `${base}${p}`),
    ...devSubdomainUrls,
  ]
  const devSettled = await Promise.allSettled(
    allDevUrls.map((url) => probeEndpoint(url, 'GET', globalSignal))
  )
  const devResults = devSettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
  const devHits = devResults.filter((r) => r.found)

  // Separate dashboard hits for the dashboard check below
  const dashboardSubdomainUrls = domain
    ? [
        `https://dashboard.${domain}`,
        `https://console.${domain}`,
        `https://app.${domain}`,
        `https://manage.${domain}`,
        `https://portal.${domain}`,
        `https://my.${domain}`,
      ]
    : []
  const dashboardHits = devResults.filter(
    (r) => r.found && dashboardSubdomainUrls.some((u) => r.url.startsWith(u))
  )

  if (devHits.length > 0) {
    rawScore += 8
    checks.push({
      name: 'Developer Portal',
      passed: true,
      details: `Developer documentation / app portal at: ${devHits.map((r) => r.url).slice(0, 4).join(', ')}`,
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
  // 5b. Developer Dashboard subdomains (up to 5 pts — NEW in v3)
  //     dashboard.X, console.X, app.X indicate a self-service developer
  //     experience where agents can manage API keys and configurations.
  // -----------------------------------------------------------------------
  if (dashboardHits.length > 0) {
    rawScore += 5
    checks.push({
      name: 'Developer Dashboard',
      passed: true,
      details: `Developer dashboard/console subdomain(s) detected: ${dashboardHits.map((r) => r.url).join(', ')}`,
      points: 5,
    })
  } else {
    checks.push({
      name: 'Developer Dashboard',
      passed: false,
      details: `No developer dashboard subdomains (dashboard.${domain || 'X'}, console.${domain || 'X'}, app.${domain || 'X'}) detected`,
      points: 0,
    })
    // Only recommend if they lack developer portal entirely
    if (devHits.length === 0) {
      recommendations.push({
        action:
          `Set up a developer dashboard at dashboard.${domain || 'yourdomain.com'} or app.${domain || 'yourdomain.com'} for self-service API key management.`,
        impact: '+5 points',
        difficulty: 'medium',
        auto_fixable: false,
      })
    }
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
  // 7. Sandbox / test mode (up to 20 pts)
  //    v3: Deeper sandbox detection — checks doc pages for sandbox/test mode
  //    references, test API keys (sk_test_), playground/explorer mentions.
  // -----------------------------------------------------------------------
  const sandboxPaths = [
    '/api/sandbox',
    '/sandbox',
    '/api/v1/sandbox',
    '/api/test',
    '/playground',
    '/api-playground',
    '/api-explorer',
    '/try',
  ]
  const sandboxSettled = await Promise.allSettled(
    sandboxPaths.map((p) => probeEndpoint(`${base}${p}`, 'GET', globalSignal))
  )
  const sandboxResults = sandboxSettled
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof probeEndpoint>>> => r.status === 'fulfilled')
    .map((r) => r.value)
  const sandboxHits = sandboxResults.filter((r) => endpointExists(r))

  // Deep analysis: check all collected page bodies for sandbox/test mode references
  const allBodiesForSandbox = [
    homepageHtml,
    ...devResults
      .filter((r) => r.found)
      .map((r) => (typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? ''))),
    ...sandboxResults.map((r) => (typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? ''))),
    ...signupPageResults
      .filter((r) => r.found)
      .map((r) => (typeof r.body === 'string' ? r.body : JSON.stringify(r.body ?? ''))),
  ]

  const sandboxTextDetails: string[] = []
  let deepSandboxSignals = 0
  for (const text of allBodiesForSandbox) {
    const indicators = hasSandboxIndicatorsInText(text)
    if (indicators.hasAny) {
      deepSandboxSignals++
      sandboxTextDetails.push(...indicators.details)
    }
  }
  const uniqueSandboxDetails = [...new Set(sandboxTextDetails)]

  if (sandboxHits.length > 0) {
    rawScore += 20
    checks.push({
      name: 'Sandbox / Test Mode',
      passed: true,
      details: `Sandbox endpoint(s) detected: ${sandboxHits.map((r) => r.url).join(', ')}`,
      points: 20,
    })
  } else if (deepSandboxSignals > 0) {
    // Give more credit for stronger sandbox signals (multiple pages mention it, test keys present, etc.)
    const sandboxPoints = Math.min(5 + deepSandboxSignals * 3, 12)
    rawScore += sandboxPoints
    checks.push({
      name: 'Sandbox / Test Mode',
      passed: false,
      details: `References to sandbox/test mode found in docs (${uniqueSandboxDetails.slice(0, 4).join(', ')}) but no dedicated sandbox endpoint detected`,
      points: sandboxPoints,
    })
    recommendations.push({
      action:
        'Expose a dedicated /api/sandbox or /playground endpoint so agents can test integrations without side effects.',
      impact: `+${20 - sandboxPoints} points`,
      difficulty: 'medium',
      auto_fixable: false,
    })
  } else {
    checks.push({
      name: 'Sandbox / Test Mode',
      passed: false,
      details: 'No sandbox, test mode, playground, or API explorer detected',
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

  // -----------------------------------------------------------------------
  // 8. Onboarding CTAs — "Get API Key" / "Start Free" (up to 5 pts — NEW in v3)
  //    Companies with clear onboarding CTAs visible on homepage/docs signal
  //    that self-service onboarding is supported.
  // -----------------------------------------------------------------------
  const ctaAnalysis = hasOnboardingCtaIndicators(homepageHtml)
  // Also check dev docs and signup pages
  for (const hit of [...devResults.filter((r) => r.found), ...signupPageHits]) {
    const cta = hasOnboardingCtaIndicators(hit.body)
    if (cta.hasGetApiKey) ctaAnalysis.hasGetApiKey = true
    if (cta.hasStartFree) ctaAnalysis.hasStartFree = true
    if (cta.hasGetStarted) ctaAnalysis.hasGetStarted = true
    if (cta.hasTryNow) ctaAnalysis.hasTryNow = true
    if (cta.hasAny) ctaAnalysis.hasAny = true
    ctaAnalysis.details.push(...cta.details)
  }

  if (ctaAnalysis.hasAny) {
    // Stronger signal if we see "Get API Key" specifically
    const ctaPoints = ctaAnalysis.hasGetApiKey ? 5 : 3
    rawScore += ctaPoints
    checks.push({
      name: 'Onboarding CTAs',
      passed: true,
      details: `Onboarding call-to-action found: ${[...new Set(ctaAnalysis.details)].slice(0, 4).join(', ')}`,
      points: ctaPoints,
    })
  } else {
    checks.push({
      name: 'Onboarding CTAs',
      passed: false,
      details: 'No onboarding CTAs (Get API Key, Start Free, Get Started) found on homepage or docs',
      points: 0,
    })
    recommendations.push({
      action:
        'Add clear onboarding CTAs like "Get API Key" or "Start Free" to your homepage and documentation to signal self-service availability.',
      impact: '+5 points',
      difficulty: 'easy',
      auto_fixable: true,
    })
  }

  const score = Math.min(rawScore, 100)

  return {
    dimension: 'D3',
    label: 'Onboarding',
    score,
    weight: 0.08,
    checks,
    recommendations: recommendations.sort(
      (a, b) => parseInt(b.impact) - parseInt(a.impact)
    ),
  }
}
