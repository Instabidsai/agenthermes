/**
 * AgentHermes TypeScript SDK
 *
 * Check Agent Readiness Scores, discover agent-ready businesses,
 * and facilitate verified agent-to-business commerce.
 *
 * @example
 * ```ts
 * import { AgentHermes } from '@agenthermes/sdk'
 *
 * const hermes = new AgentHermes({ apiKey: 'ah_...' })
 * const score = await hermes.check('example.com')
 * if (score.tier === 'gold' || score.tier === 'platinum') {
 *   proceedWithTransaction()
 * }
 * ```
 *
 * @packageDocumentation
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Tier levels for agent readiness scoring. */
export type Tier = 'platinum' | 'gold' | 'silver' | 'bronze' | 'unaudited'

/** Difficulty levels for recommendations. */
export type Difficulty = 'easy' | 'medium' | 'hard'

/** Category status in a score breakdown. */
export type CategoryStatus = 'excellent' | 'good' | 'needs_work' | 'failing'

/** A single check performed during a scan. */
export interface Check {
  name: string
  passed: boolean
  details: string
  points: number
}

/** A recommendation from a scan. */
export interface Recommendation {
  action: string
  impact: string
  difficulty: Difficulty
  auto_fixable: boolean
}

/** A single dimension result from a 9-dimension scan. */
export interface DimensionResult {
  dimension: string
  label: string
  score: number
  weight: number
  checks: Check[]
  recommendations: Recommendation[]
}

/** A cap rule that was applied during scoring. */
export interface CapApplied {
  rule: string
  capped_to: number
}

/** Response from the check (score) endpoint. */
export interface ScoreResult {
  domain: string
  score: number | null
  tier: Tier
  tier_label: string
  last_audited: string | null
  categories?: Record<string, { score: number; max: number; status: CategoryStatus }>
  profile_url?: string
  badge_url?: string
  message?: string
}

/** Agent Readiness Level result. */
export interface ARLResult {
  level: number
  name: string
  description: string
  nextLevel: {
    level: number
    name: string
    requirements: string[]
  } | null
  verticalContext?: string
}

/** Response from the scan endpoint. */
export interface ScanResult {
  hermes_id: string
  domain: string
  total_score: number
  tier: Tier
  dimensions: DimensionResult[]
  caps_applied: CapApplied[]
  scanned_at: string
  next_steps: string[]
  arl: ARLResult
  business_id?: string
  _db_error?: string
}

/** Pagination metadata. */
export interface Pagination {
  total: number
  limit: number
  offset: number
  has_more: boolean
}

/** A business in the directory. */
export interface Business {
  id: string
  name: string
  slug: string
  domain: string
  description: string | null
  logo_url: string | null
  audit_score: number
  audit_tier: Tier
  trust_score: number
  vertical: string | null
  capabilities: string[]
  mcp_endpoints: string[]
  pricing_visible: boolean
  agent_onboarding: boolean
  created_at: string
  updated_at: string
  services?: Service[]
  audit_results?: AuditResult[]
  connections_count?: number
  transaction_volume?: number
  transaction_count?: number
}

/** A service offered by a business. */
export interface Service {
  id: string
  name: string
  description: string
  pricing_model: string
  price_per_call: number
  mcp_endpoint: string | null
  auth_type: string
  uptime_pct: number
  avg_response_ms: number
  business?: {
    name: string
    slug: string
    audit_score: number
    tier: Tier
  }
}

/** An audit result category. */
export interface AuditResult {
  category: string
  score: number
  max_score: number
  audited_at: string
}

/** Response from the discover endpoint. */
export interface DiscoverResult {
  businesses: Business[]
  pagination: Pagination
}

/** Response from the discover services endpoint. */
export interface DiscoverServicesResult {
  services: Service[]
  pagination: Pagination
}

/** A business manifest. */
export interface ManifestResult {
  schema_version: string
  business: {
    name: string
    slug: string
    domain: string
    description: string | null
    vertical: string | null
    capabilities: string[]
  }
  agent_readiness: {
    score: number
    tier: Tier
    audited_at: string
  }
  a2a_agent_card: unknown
  mcp_endpoints: string[]
  services: {
    name: string
    description: string
    pricing_model: string
    price_per_call: number
    endpoint: string | null
    auth_type: string
    uptime_pct: number
    avg_response_ms: number
  }[]
  payment: {
    accepts_agent_payments: boolean
    wallet_status: string | null
  }
}

/** Response from the hermes-json verify endpoint. */
export interface VerifyResult {
  valid: boolean
  reason?: string
  domain?: string
  score?: number
  tier?: Tier
  signature_verified?: boolean
  score_matches_db?: boolean
  certification_current?: boolean | null
}

/** A ranked leaderboard entry. */
export interface LeaderboardEntry {
  rank: number
  id: string
  name: string
  slug: string
  domain: string
  score: number
  tier: Tier
  trust_score: number
  vertical: string | null
  capabilities: string[]
  has_mcp: boolean
  profile_url: string
}

/** Response from the leaderboard endpoint. */
export interface LeaderboardResult {
  leaderboard: LeaderboardEntry[]
  pagination: Pagination
  filters: {
    verticals: string[]
    current_vertical: string | null
  }
}

/** Response from the benchmarks endpoint. */
export interface BenchmarksResult {
  vertical: string
  total_businesses: number
  avg_score: number
  median_score: number
  top_quartile_score: number
  tier_distribution: Record<string, number>
  top_businesses: { name: string; slug: string; score: number }[]
  category_averages: Record<string, number>
}

/** Response from the benchmarks/compare endpoint. */
export interface CompareResult {
  business: {
    name: string
    slug: string
    score: number
    tier: Tier
  }
  vertical: string
  comparison: {
    your_score: number
    avg_peer_score: number
    percentile_rank: number
    total_peers: number
    score_vs_avg: number
  }
  category_comparison: Record<string, { your_score: number; peer_avg: number; max: number }>
  strengths: string[]
  weaknesses: string[]
}

/** A single batch check result. */
export interface BatchCheckEntry {
  domain: string
  score: number | null
  tier: string
  hermes_id: string | null
  status: 'cached' | 'scanned' | 'queued' | 'error'
  error?: string
}

/** Response from the batch check endpoint. */
export interface BatchCheckResult {
  results: BatchCheckEntry[]
  summary: {
    total_requested: number
    cached: number
    scanned: number
    queued: number
    errors: number
  }
  invalid_domains?: { domain: string; reason: string }[]
}

/** Response from business registration. */
export interface RegisterBusinessResult {
  id: string
  name: string
  slug: string
  domain: string | null
  description: string | null
  vertical: string | null
  capabilities: string[]
  audit_score: number
  audit_tier: Tier
  trust_score: number
  created_at: string
  updated_at: string
}

/** Response from wallet funding. */
export interface FundWalletResult {
  wallet: Record<string, unknown>
  funded_amount: number
  new_balance: number
  mode: string
  message: string
}

/** Response from wallet transfer. */
export interface TransferResult {
  transaction: Record<string, unknown>
  message: string
}

/** Response from the trust-score endpoint. */
export interface TrustScoreResult {
  business_id: string
  slug: string
  name: string
  trust_score: number
  breakdown: Record<string, unknown>
  computed_at: string
}

/** Response from the certify endpoint. */
export interface CertifyResult {
  certification: {
    id: string
    business_id: string
    business_name: string
    slug: string
    tier: Tier
    audit_score: number
    certified_at: string
    expires_at: string
    auto_renew: boolean
    status: string
    days_remaining: number
  }
  badge_url: string
}

/** Response from the old 5-category audit endpoint. */
export interface AuditRunResult {
  id: string
  url: string
  status: string
  categories: Record<string, { score: number; max: number; checks: Check[] }>
  overall_score: number
  tier: Tier
  created_at: string
}

/** Response from wallet balance endpoint. */
export interface WalletResult {
  business_id: string
  balance: number
  currency: string
  status: string
  created_at: string
  updated_at: string
}

/** A wallet transaction record. */
export interface Transaction {
  id: string
  from_business_id: string | null
  to_business_id: string | null
  amount: number
  type: string
  description: string
  created_at: string
}

/** Response from wallet transactions endpoint. */
export interface TransactionsResult {
  transactions: Transaction[]
  pagination: Pagination
}

/** Response from analytics endpoint. */
export interface AnalyticsResult {
  business_id: string
  period: string
  metrics: Record<string, unknown>
}

/** Response from report endpoint. */
export interface ReportResult {
  report: Record<string, unknown>
}

/** Response from mystery shop endpoint. */
export interface MysteryShopResult {
  id: string
  business_id: string
  slug: string
  results: Record<string, unknown>
  created_at: string
}

/** Response from mystery shop history endpoint. */
export interface MysteryShopHistoryResult {
  shops: MysteryShopResult[]
  pagination: Pagination
}

/** A webhook subscription. */
export interface WebhookSubscription {
  id: string
  url: string
  event_type: string
  filters: Record<string, unknown>
  created_at: string
}

/** Response from webhook list endpoint. */
export interface WebhookListResult {
  webhooks: WebhookSubscription[]
}

/** Response from service CRUD operations. */
export interface ServiceResult {
  service: Service
}

/** Response from listing services. */
export interface ServicesListResult {
  services: Service[]
}

/** Response from API key creation. */
export interface ApiKeyResult {
  id: string
  key: string
  name: string
  created_at: string
}

/** Response from listing API keys. */
export interface ApiKeysListResult {
  api_keys: { id: string; name: string; prefix: string; created_at: string }[]
}

/** Response from Stripe connect endpoint. */
export interface ConnectStripeResult {
  url: string
  message: string
}

/** Response from certification lookup. */
export interface CertificationResult {
  certification: {
    id: string
    business_id: string
    tier: Tier
    audit_score: number
    certified_at: string
    expires_at: string
    status: string
  } | null
  badge_url: string | null
}

/** Response from hermes-json generation. */
export interface GenerateHermesJsonResult {
  hermes_json: Record<string, unknown>
  instructions: string
}

/** Response from health check endpoint. */
export interface HealthCheckResult {
  status: string
  checks: { name: string; status: string; latency_ms: number; details?: string }[]
  checked_at: string
}

/** Response from health status endpoint. */
export interface HealthStatusResult {
  business_id: string
  overall_status: string
  services: { service_id: string; name: string; status: string; uptime_pct: number; last_check: string }[]
}

/** Response from monitoring trigger endpoint. */
export interface MonitoringTriggerResult {
  message: string
  events_created: number
}

/** A monitoring event. */
export interface MonitoringEvent {
  id: string
  business_id: string
  severity: string
  event_type: string
  message: string
  created_at: string
}

/** Response from monitoring events endpoint. */
export interface MonitoringEventsResult {
  events: MonitoringEvent[]
  pagination: Pagination
}

/** Response from semantic search endpoint. */
export interface SemanticSearchResult {
  results: {
    business: Business
    similarity: number
  }[]
  pagination: Pagination
}

/** Response from remediation endpoints. */
export interface RemediationResult {
  content: string
  content_type: string
  instructions: string
}

/** Constructor options for the SDK client. */
export interface AgentHermesOptions {
  /** Base URL of the AgentHermes API. Defaults to https://agenthermes.ai */
  baseUrl?: string
  /** API key for authenticated endpoints. Format: ah_... */
  apiKey?: string
  /** Optional agent identifier sent via x-agent-id header for analytics. */
  agentId?: string
  /** Request timeout in milliseconds. Defaults to 30000 (30s). */
  timeoutMs?: number
}

// ---------------------------------------------------------------------------
// Error class
// ---------------------------------------------------------------------------

/** Error thrown when an AgentHermes API call fails. */
export class AgentHermesError extends Error {
  /** HTTP status code from the API. */
  public readonly status: number
  /** Raw response body (parsed JSON when available). */
  public readonly body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = 'AgentHermesError'
    this.status = status
    this.body = body
  }
}

// ---------------------------------------------------------------------------
// SDK Client
// ---------------------------------------------------------------------------

export class AgentHermes {
  private readonly baseUrl: string
  private readonly apiKey?: string
  private readonly agentId?: string
  private readonly timeoutMs: number

  constructor(opts?: AgentHermesOptions) {
    this.baseUrl = (opts?.baseUrl || 'https://agenthermes.ai').replace(/\/+$/, '')
    this.apiKey = opts?.apiKey
    this.agentId = opts?.agentId
    this.timeoutMs = opts?.timeoutMs ?? 30_000
  }

  // -------------------------------------------------------------------------
  // Internal helpers
  // -------------------------------------------------------------------------

  private headers(): Record<string, string> {
    const h: Record<string, string> = { 'Content-Type': 'application/json' }
    if (this.apiKey) h['Authorization'] = `Bearer ${this.apiKey}`
    if (this.agentId) h['x-agent-id'] = this.agentId
    return h
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    path: string,
    body?: unknown,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), this.timeoutMs)

    try {
      const init: RequestInit = {
        method,
        headers: this.headers(),
        signal: controller.signal,
      }

      if (body !== undefined) {
        init.body = JSON.stringify(body)
      }

      const res = await fetch(url, init)

      let data: unknown
      const contentType = res.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        data = await res.json()
      } else {
        data = await res.text()
      }

      if (!res.ok) {
        const errMsg =
          typeof data === 'object' && data !== null && 'error' in data
            ? String((data as Record<string, unknown>).error)
            : `HTTP ${res.status}`
        throw new AgentHermesError(errMsg, res.status, data)
      }

      return data as T
    } catch (err) {
      if (err instanceof AgentHermesError) throw err
      if (err instanceof Error && err.name === 'AbortError') {
        throw new AgentHermesError(
          `Request timed out after ${this.timeoutMs}ms`,
          0,
          null,
        )
      }
      throw new AgentHermesError(
        err instanceof Error ? err.message : 'Unknown error',
        0,
        null,
      )
    } finally {
      clearTimeout(timer)
    }
  }

  private buildQuery(params: Record<string, string | number | boolean | undefined | null>): string {
    const entries = Object.entries(params).filter(
      ([, v]) => v !== undefined && v !== null,
    )
    if (entries.length === 0) return ''
    return '?' + entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join('&')
  }

  // -------------------------------------------------------------------------
  // Public API — Read-only (no auth required)
  // -------------------------------------------------------------------------

  /**
   * Check a domain's cached agent readiness score.
   * Fast lookup against the AgentHermes database.
   *
   * @param domain - The domain to check (e.g. "example.com")
   * @returns Score, tier, and category breakdown
   */
  async check(domain: string): Promise<ScoreResult> {
    return this.request<ScoreResult>('GET', `/api/v1/score/${encodeURIComponent(domain)}`)
  }

  /**
   * Run a fresh 9-dimension agent readiness scan.
   * This actively probes the target site and takes 10-30 seconds.
   *
   * @param url - Domain or URL to scan
   * @returns Full 9-dimension scorecard with recommendations
   */
  async scan(url: string): Promise<ScanResult> {
    return this.request<ScanResult>('POST', '/api/v1/scan', { url })
  }

  /**
   * Get full details for a business including services, audit results,
   * connections, and transaction history.
   *
   * @param slug - Business slug (e.g. "acme-corp")
   * @returns Complete business profile
   */
  async details(slug: string): Promise<Business> {
    return this.request<Business>('GET', `/api/v1/business/${encodeURIComponent(slug)}`)
  }

  /**
   * Discover agent-ready businesses by keyword, vertical, tier, and more.
   *
   * @param params - Search and filter parameters
   * @returns Paginated list of matching businesses
   */
  async discover(params: {
    q?: string
    vertical?: string
    capability?: string
    tier?: string
    min_score?: number
    mcp_compatible?: boolean
    max_price?: number
    sort?: 'audit_score' | 'trust_score' | 'name'
    limit?: number
    offset?: number
  }): Promise<DiscoverResult> {
    const qs = this.buildQuery({
      q: params.q,
      vertical: params.vertical,
      capability: params.capability,
      tier: params.tier,
      min_score: params.min_score,
      mcp_compatible: params.mcp_compatible,
      max_price: params.max_price,
      sort: params.sort,
      limit: params.limit,
      offset: params.offset,
    })
    return this.request<DiscoverResult>('GET', `/api/v1/discover${qs}`)
  }

  /**
   * Discover individual services across all businesses.
   * Search by keyword, vertical, price, auth type, and uptime.
   *
   * @param params - Search and filter parameters
   * @returns Paginated list of services with parent business info
   */
  async discoverServices(params: {
    q?: string
    vertical?: string
    max_price?: number
    pricing_model?: 'per_call' | 'monthly' | 'per_unit' | 'custom'
    auth_type?: 'api_key' | 'oauth' | 'jwt' | 'none'
    min_uptime?: number
    limit?: number
    offset?: number
  }): Promise<DiscoverServicesResult> {
    const qs = this.buildQuery({
      q: params.q,
      vertical: params.vertical,
      max_price: params.max_price,
      pricing_model: params.pricing_model,
      auth_type: params.auth_type,
      min_uptime: params.min_uptime,
      limit: params.limit,
      offset: params.offset,
    })
    return this.request<DiscoverServicesResult>('GET', `/api/v1/discover/services${qs}`)
  }

  /**
   * Get the structured manifest for a business.
   * Includes services, pricing, MCP endpoints, and payment capabilities.
   *
   * @param slug - Business slug
   * @returns Business manifest in AgentHermes schema v1.0
   */
  async manifest(slug: string): Promise<ManifestResult> {
    return this.request<ManifestResult>('GET', `/api/v1/business/${encodeURIComponent(slug)}/manifest`)
  }

  /**
   * Verify a .well-known/agent-hermes.json file.
   * Can either fetch it from the domain or verify a provided JSON object.
   *
   * @param domain - Domain to fetch and verify the hermes.json from
   * @returns Verification result with signature and score checks
   */
  async verifyHermesJson(domain: string): Promise<VerifyResult> {
    return this.request<VerifyResult>('POST', '/api/v1/hermes-json/verify', { domain })
  }

  /**
   * Get the agent readiness leaderboard, ranked by score.
   *
   * @param params - Optional vertical filter and pagination
   * @returns Ranked list of businesses with filter metadata
   */
  async leaderboard(params?: {
    vertical?: string
    limit?: number
    offset?: number
  }): Promise<LeaderboardResult> {
    const qs = this.buildQuery({
      vertical: params?.vertical,
      limit: params?.limit,
      offset: params?.offset,
    })
    return this.request<LeaderboardResult>('GET', `/api/v1/leaderboard${qs}`)
  }

  /**
   * Get aggregate benchmarks for agent readiness across all businesses
   * or within a specific vertical.
   *
   * @param vertical - Optional vertical to filter benchmarks
   * @returns Aggregate statistics including tier distribution and averages
   */
  async benchmarks(vertical?: string): Promise<BenchmarksResult> {
    const qs = this.buildQuery({ vertical })
    return this.request<BenchmarksResult>('GET', `/api/v1/benchmarks${qs}`)
  }

  /**
   * Compare a business against its peers in the same vertical.
   * Returns percentile rank, strengths, weaknesses, and category comparison.
   *
   * @param slug - Business slug to compare
   * @returns Detailed peer comparison
   */
  async compare(slug: string): Promise<CompareResult> {
    const qs = this.buildQuery({ slug })
    return this.request<CompareResult>('GET', `/api/v1/benchmarks/compare${qs}`)
  }

  /**
   * Batch check up to 100 domains at once.
   * Domains scanned within the last 24 hours return cached results.
   * Requires authentication.
   *
   * @param domains - Array of domains to check (max 100)
   * @returns Per-domain results with summary statistics
   */
  async batchCheck(domains: string[]): Promise<BatchCheckResult> {
    if (domains.length > 100) {
      throw new AgentHermesError(
        `Too many domains. Maximum is 100, received ${domains.length}.`,
        400,
        null,
      )
    }
    return this.request<BatchCheckResult>('POST', '/api/v1/scan/batch', { domains })
  }

  // -------------------------------------------------------------------------
  // Public API — Authenticated methods
  // -------------------------------------------------------------------------

  /**
   * Register a new business in the AgentHermes directory.
   * Requires authentication.
   *
   * @param data - Business registration data
   * @returns The created business record
   */
  async registerBusiness(data: {
    name: string
    domain: string
    description: string
    vertical?: string
    capabilities?: string[]
    owner_email?: string
  }): Promise<RegisterBusinessResult> {
    return this.request<RegisterBusinessResult>('POST', '/api/v1/business', data)
  }

  /**
   * Add funds to a business's wallet.
   * Requires authentication. Max $10,000 per transaction.
   *
   * @param businessId - UUID of the business
   * @param amount - Amount in USD (max 2 decimal places)
   * @returns Updated wallet with new balance
   */
  async fundWallet(businessId: string, amount: number): Promise<FundWalletResult> {
    return this.request<FundWalletResult>('POST', '/api/v1/wallet/fund', {
      business_id: businessId,
      amount,
    })
  }

  /**
   * Transfer funds between two business wallets.
   * Requires authentication. Both businesses must have active wallets.
   *
   * @param params - Transfer parameters
   * @returns Transaction record
   */
  async transfer(params: {
    from: string
    to: string
    amount: number
    description: string
    agent_id?: string
    task_context?: string
    service_id?: string
  }): Promise<TransferResult> {
    return this.request<TransferResult>('POST', '/api/v1/wallet/transfer', {
      from_business_id: params.from,
      to_business_id: params.to,
      amount: params.amount,
      service_description: params.description,
      agent_id: params.agent_id,
      task_context: params.task_context,
      service_id: params.service_id,
    })
  }

  /**
   * Get the trust score for a business.
   * Computes the score based on transaction history, audit results, and more.
   *
   * @param slug - Business slug
   * @returns Trust score with detailed breakdown
   */
  async trustScore(slug: string): Promise<TrustScoreResult> {
    return this.request<TrustScoreResult>('GET', `/api/v1/trust-score/${encodeURIComponent(slug)}`)
  }

  /**
   * Apply for AgentHermes certification.
   * Requires Gold tier (score >= 75) or higher. Certification lasts 90 days.
   * Requires authentication.
   *
   * @param slug - Business slug to certify
   * @returns Certification details with badge URL
   */
  async certify(slug: string): Promise<CertifyResult> {
    return this.request<CertifyResult>('POST', '/api/v1/certify', { slug })
  }

  // -------------------------------------------------------------------------
  // Audit (old 5-category system)
  // -------------------------------------------------------------------------

  /**
   * Run an audit using the old 5-category scoring system.
   *
   * @param url - Domain or URL to audit
   * @returns Audit results with category breakdown
   */
  async runAudit(url: string): Promise<AuditRunResult> {
    return this.request<AuditRunResult>('POST', '/api/v1/audit', { url })
  }

  /**
   * Retrieve a previously completed audit by ID.
   *
   * @param id - Audit UUID
   * @returns Stored audit results
   */
  async getAuditById(id: string): Promise<AuditRunResult> {
    return this.request<AuditRunResult>('GET', `/api/v1/audit/${encodeURIComponent(id)}`)
  }

  // -------------------------------------------------------------------------
  // Wallet
  // -------------------------------------------------------------------------

  /**
   * Get the wallet balance for a business.
   *
   * @param businessId - UUID of the business
   * @returns Wallet balance and status
   */
  async getWallet(businessId: string): Promise<WalletResult> {
    const qs = this.buildQuery({ business_id: businessId })
    return this.request<WalletResult>('GET', `/api/v1/wallet${qs}`)
  }

  /**
   * Get transaction history for a business wallet.
   *
   * @param businessId - UUID of the business
   * @param params - Optional pagination parameters
   * @returns Paginated list of transactions
   */
  async getTransactions(businessId: string, params?: { limit?: number; offset?: number }): Promise<TransactionsResult> {
    const qs = this.buildQuery({
      business_id: businessId,
      limit: params?.limit,
      offset: params?.offset,
    })
    return this.request<TransactionsResult>('GET', `/api/v1/wallet/transactions${qs}`)
  }

  // -------------------------------------------------------------------------
  // Analytics
  // -------------------------------------------------------------------------

  /**
   * Get analytics for a business.
   *
   * @param businessId - UUID of the business
   * @param params - Optional period filter
   * @returns Analytics metrics for the specified period
   */
  async getAnalytics(businessId: string, params?: { period?: string }): Promise<AnalyticsResult> {
    const qs = this.buildQuery({
      business_id: businessId,
      period: params?.period,
    })
    return this.request<AnalyticsResult>('GET', `/api/v1/analytics${qs}`)
  }

  // -------------------------------------------------------------------------
  // Report
  // -------------------------------------------------------------------------

  /**
   * Get the platform-wide report.
   *
   * @returns Aggregate platform report
   */
  async getReport(): Promise<ReportResult> {
    return this.request<ReportResult>('GET', '/api/v1/report')
  }

  // -------------------------------------------------------------------------
  // Mystery Shop
  // -------------------------------------------------------------------------

  /**
   * Run a mystery shop evaluation of a business.
   *
   * @param params - Business ID or slug to shop
   * @returns Mystery shop evaluation results
   */
  async runMysteryShop(params: { business_id?: string; slug?: string }): Promise<MysteryShopResult> {
    return this.request<MysteryShopResult>('POST', '/api/v1/mystery-shop', params)
  }

  /**
   * Get mystery shop history for a business.
   *
   * @param params - Business ID or slug and optional pagination
   * @returns Paginated list of past mystery shop results
   */
  async getMysteryShopHistory(params: {
    business_id?: string
    slug?: string
    limit?: number
  }): Promise<MysteryShopHistoryResult> {
    const qs = this.buildQuery({
      business_id: params.business_id,
      slug: params.slug,
      limit: params.limit,
    })
    return this.request<MysteryShopHistoryResult>('GET', `/api/v1/mystery-shop${qs}`)
  }

  // -------------------------------------------------------------------------
  // Webhooks
  // -------------------------------------------------------------------------

  /**
   * Subscribe to webhook events.
   *
   * @param params - Webhook subscription parameters
   * @returns The created webhook subscription
   */
  async subscribeWebhook(params: {
    url: string
    event_type: string
    filters?: object
  }): Promise<WebhookSubscription> {
    return this.request<WebhookSubscription>('POST', '/api/v1/webhooks/subscribe', params)
  }

  /**
   * List all active webhook subscriptions.
   *
   * @returns List of webhook subscriptions
   */
  async listWebhooks(): Promise<WebhookListResult> {
    return this.request<WebhookListResult>('GET', '/api/v1/webhooks/subscribe')
  }

  /**
   * Unsubscribe from a webhook.
   *
   * @param id - Webhook subscription ID to remove
   * @returns Confirmation of deletion
   */
  async unsubscribeWebhook(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('DELETE', `/api/v1/webhooks/subscribe?id=${encodeURIComponent(id)}`)
  }

  // -------------------------------------------------------------------------
  // Services
  // -------------------------------------------------------------------------

  /**
   * List services for a business.
   *
   * @param slug - Business slug
   * @returns List of services
   */
  async getServices(slug: string): Promise<ServicesListResult> {
    return this.request<ServicesListResult>('GET', `/api/v1/business/${encodeURIComponent(slug)}/services`)
  }

  /**
   * Create a new service for a business.
   *
   * @param slug - Business slug
   * @param data - Service details
   * @returns The created service
   */
  async createService(slug: string, data: {
    name: string
    description?: string
    pricing_model?: string
    price_per_call?: number
  }): Promise<ServiceResult> {
    return this.request<ServiceResult>('POST', `/api/v1/business/${encodeURIComponent(slug)}/services`, data)
  }

  /**
   * Update an existing service.
   *
   * @param slug - Business slug
   * @param serviceId - Service UUID
   * @param data - Fields to update
   * @returns The updated service
   */
  async updateService(slug: string, serviceId: string, data: object): Promise<ServiceResult> {
    return this.request<ServiceResult>(
      'PATCH',
      `/api/v1/business/${encodeURIComponent(slug)}/services?service_id=${encodeURIComponent(serviceId)}`,
      data,
    )
  }

  /**
   * Delete a service from a business.
   *
   * @param slug - Business slug
   * @param serviceId - Service UUID
   * @returns Confirmation of deletion
   */
  async deleteService(slug: string, serviceId: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(
      'DELETE',
      `/api/v1/business/${encodeURIComponent(slug)}/services?service_id=${encodeURIComponent(serviceId)}`,
    )
  }

  // -------------------------------------------------------------------------
  // Business management
  // -------------------------------------------------------------------------

  /**
   * Update a business profile.
   *
   * @param slug - Business slug
   * @param data - Fields to update
   * @returns The updated business
   */
  async updateBusiness(slug: string, data: object): Promise<Business> {
    return this.request<Business>('PATCH', `/api/v1/business/${encodeURIComponent(slug)}`, data)
  }

  /**
   * Create a new API key for a business.
   *
   * @param slug - Business slug
   * @param name - Optional name for the key
   * @returns The created API key (only shown once)
   */
  async createApiKey(slug: string, name?: string): Promise<ApiKeyResult> {
    return this.request<ApiKeyResult>(
      'POST',
      `/api/v1/business/${encodeURIComponent(slug)}/api-keys`,
      name ? { name } : undefined,
    )
  }

  /**
   * List API keys for a business (keys are masked).
   *
   * @param slug - Business slug
   * @returns List of API keys with masked values
   */
  async listApiKeys(slug: string): Promise<ApiKeysListResult> {
    return this.request<ApiKeysListResult>('GET', `/api/v1/business/${encodeURIComponent(slug)}/api-keys`)
  }

  /**
   * Revoke an API key.
   *
   * @param slug - Business slug
   * @param keyId - API key UUID to revoke
   * @returns Confirmation of revocation
   */
  async revokeApiKey(slug: string, keyId: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(
      'DELETE',
      `/api/v1/business/${encodeURIComponent(slug)}/api-keys?key_id=${encodeURIComponent(keyId)}`,
    )
  }

  /**
   * Initiate Stripe Connect onboarding for a business.
   *
   * @param slug - Business slug
   * @returns Stripe Connect onboarding URL
   */
  async connectStripe(slug: string): Promise<ConnectStripeResult> {
    return this.request<ConnectStripeResult>('POST', `/api/v1/business/${encodeURIComponent(slug)}/connect`)
  }

  // -------------------------------------------------------------------------
  // Certification (lookup)
  // -------------------------------------------------------------------------

  /**
   * Get the current certification status for a business.
   *
   * @param slug - Business slug
   * @returns Certification details or null if not certified
   */
  async getCertification(slug: string): Promise<CertificationResult> {
    const qs = this.buildQuery({ slug })
    return this.request<CertificationResult>('GET', `/api/v1/certify${qs}`)
  }

  // -------------------------------------------------------------------------
  // Hermes JSON
  // -------------------------------------------------------------------------

  /**
   * Generate a .well-known/agent-hermes.json file for a business.
   *
   * @param params - Domain or slug to generate for
   * @returns Generated JSON content and deployment instructions
   */
  async generateHermesJson(params: { domain?: string; slug?: string }): Promise<GenerateHermesJsonResult> {
    return this.request<GenerateHermesJsonResult>('POST', '/api/v1/hermes-json', params)
  }

  // -------------------------------------------------------------------------
  // Health
  // -------------------------------------------------------------------------

  /**
   * Run a health check on a service or URL.
   *
   * @param params - Service ID or URL to check
   * @returns Health check results with latency
   */
  async runHealthCheck(params: { service_id?: string; url?: string }): Promise<HealthCheckResult> {
    return this.request<HealthCheckResult>('POST', '/api/v1/health/check', params)
  }

  /**
   * Get the health status overview for a business.
   *
   * @param params - Business ID or slug
   * @returns Overall health status with per-service breakdown
   */
  async getHealthStatus(params: { business_id?: string; slug?: string }): Promise<HealthStatusResult> {
    const qs = this.buildQuery({
      business_id: params.business_id,
      slug: params.slug,
    })
    return this.request<HealthStatusResult>('GET', `/api/v1/health/status${qs}`)
  }

  // -------------------------------------------------------------------------
  // Monitoring
  // -------------------------------------------------------------------------

  /**
   * Trigger a monitoring sweep across all registered businesses.
   *
   * @returns Number of monitoring events created
   */
  async triggerMonitoring(): Promise<MonitoringTriggerResult> {
    return this.request<MonitoringTriggerResult>('POST', '/api/v1/monitoring')
  }

  /**
   * Get monitoring events, optionally filtered by business or severity.
   *
   * @param params - Optional filters
   * @returns Paginated list of monitoring events
   */
  async getMonitoringEvents(params?: {
    business_id?: string
    severity?: string
    limit?: number
  }): Promise<MonitoringEventsResult> {
    const qs = this.buildQuery({
      business_id: params?.business_id,
      severity: params?.severity,
      limit: params?.limit,
    })
    return this.request<MonitoringEventsResult>('GET', `/api/v1/monitoring${qs}`)
  }

  // -------------------------------------------------------------------------
  // Semantic search
  // -------------------------------------------------------------------------

  /**
   * Search businesses using natural language semantic matching.
   *
   * @param q - Natural language query
   * @param params - Optional limit and similarity threshold
   * @returns Businesses ranked by semantic similarity
   */
  async semanticSearch(q: string, params?: { limit?: number; threshold?: number }): Promise<SemanticSearchResult> {
    const qs = this.buildQuery({
      q,
      limit: params?.limit,
      threshold: params?.threshold,
    })
    return this.request<SemanticSearchResult>('GET', `/api/v1/discover/semantic${qs}`)
  }

  // -------------------------------------------------------------------------
  // Remediation
  // -------------------------------------------------------------------------

  /**
   * Generate an llms.txt file for a domain.
   *
   * @param data - Domain info and description
   * @returns Generated llms.txt content and deployment instructions
   */
  async generateLlmsTxt(data: {
    domain: string
    name: string
    description: string
  }): Promise<RemediationResult> {
    return this.request<RemediationResult>('POST', '/api/v1/remediate/llms-txt', data)
  }

  /**
   * Generate an A2A agent card for a domain.
   *
   * @param data - Domain info and description
   * @returns Generated agent card JSON and deployment instructions
   */
  async generateAgentCard(data: {
    domain: string
    name: string
    description: string
  }): Promise<RemediationResult> {
    return this.request<RemediationResult>('POST', '/api/v1/remediate/agent-card', data)
  }

  /**
   * Generate Schema.org structured data for a domain.
   *
   * @param data - Domain info, description, and optional schema type
   * @returns Generated JSON-LD and deployment instructions
   */
  async generateSchemaOrg(data: {
    domain: string
    name: string
    description: string
    type?: string
  }): Promise<RemediationResult> {
    return this.request<RemediationResult>('POST', '/api/v1/remediate/schema-org', data)
  }

  /**
   * Generate an MCP proxy configuration for a domain.
   *
   * @param data - Domain info, API base URL, and endpoint definitions
   * @returns Generated MCP proxy config and deployment instructions
   */
  async generateMcpProxy(data: {
    domain: string
    name: string
    api_base: string
    endpoints: object[]
  }): Promise<RemediationResult> {
    return this.request<RemediationResult>('POST', '/api/v1/remediate/mcp-proxy', data)
  }
}

export default AgentHermes
