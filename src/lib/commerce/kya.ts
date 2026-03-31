// ---------------------------------------------------------------------------
// KYA (Know Your Agent) — Agent Identity & Verification
//
// The emerging standard for agent identity, inspired by Skyfire's KYA protocol,
// NIST AI Agent Standards Initiative, ERC-8004 Agent Registry, and Visa TAP.
//
// Purpose: Before an agent can transact through the AgentHermes gateway,
// we need to know WHO the agent is, WHO authorized it, and WHAT it's allowed
// to do. KYA is the authentication layer for the agent economy.
//
// Reference: NIST NCCoE concept paper (Feb 2026), Skyfire KYA, ERC-8004
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Core Types
// ---------------------------------------------------------------------------

/** The identity of an AI agent — who it is and what it's allowed to do */
export interface AgentIdentity {
  /** Unique agent identifier (UUID or DID) */
  agent_id: string
  /** Human-readable agent name */
  agent_name: string
  /** The human or organization behind the agent (owner) */
  principal: string
  /** What this agent can do (e.g., "api_calls", "payments", "data_read") */
  capabilities: string[]
  /** Maximum spend per transaction in USD */
  budget_limit: number
  /** Total spent so far in current billing period */
  spending_so_far: number
  /** AgentHermes trust score (0-100) based on transaction history */
  trust_score: number
  /** Whether the agent's principal has been verified (OAuth, email, etc.) */
  verified: boolean
}

/** Extended identity with metadata for registration */
export interface AgentRegistration extends AgentIdentity {
  /** When the agent was registered */
  registered_at: string
  /** When identity was last verified */
  last_verified_at: string | null
  /** OAuth provider used for verification (e.g., "github", "google") */
  auth_provider: string | null
  /** Organization name if applicable */
  organization: string | null
  /** Contact email for the principal */
  contact_email: string | null
  /** Agent's home URL or documentation */
  agent_url: string | null
  /** Allowed service categories (empty = all) */
  allowed_categories: string[]
  /** Blocked service IDs (explicit deny list) */
  blocked_services: string[]
  /** Whether the agent is currently active */
  is_active: boolean
}

/** Token scopes for agent JWTs — what the token authorizes */
export type KYATokenScope =
  | 'identity'    // Read-only identity verification
  | 'payment'     // Can make payments
  | 'discovery'   // Can discover and query services
  | 'gateway'     // Can call gateway services
  | 'full'        // All permissions

/** A JWT-like token issued to verified agents */
export interface KYAToken {
  /** Token type: identity-only, payment-only, or combined */
  type: 'kya' | 'pay' | 'kya_pay'
  /** Scopes granted to this token */
  scopes: KYATokenScope[]
  /** The agent this token belongs to */
  agent_id: string
  /** The principal (human/org) who authorized this agent */
  principal: string
  /** When the token was issued (ISO 8601) */
  issued_at: string
  /** When the token expires (ISO 8601) */
  expires_at: string
  /** If scoped to a specific merchant/service, which one */
  merchant_scope?: string
  /** Maximum transaction amount for this token */
  max_amount?: number
}

/** Trust levels based on agent behavior and verification */
export type AgentTrustLevel =
  | 'unverified'  // No identity verification done
  | 'basic'       // Email/OAuth verified
  | 'standard'    // Verified + positive transaction history
  | 'premium'     // High trust score, significant history
  | 'enterprise'  // Organization-verified, SLA-backed

/** Mapping trust levels to score ranges and capabilities */
export const TRUST_LEVEL_CONFIG: Record<
  AgentTrustLevel,
  { min_score: number; max_transaction: number; daily_limit: number }
> = {
  unverified: { min_score: 0, max_transaction: 5, daily_limit: 20 },
  basic: { min_score: 20, max_transaction: 50, daily_limit: 200 },
  standard: { min_score: 50, max_transaction: 200, daily_limit: 1000 },
  premium: { min_score: 75, max_transaction: 1000, daily_limit: 5000 },
  enterprise: { min_score: 90, max_transaction: 10000, daily_limit: 100000 },
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

/** Errors that can occur during agent identity validation */
export interface KYAValidationError {
  code:
    | 'MISSING_AGENT_ID'
    | 'MISSING_PRINCIPAL'
    | 'INVALID_CAPABILITIES'
    | 'BUDGET_EXCEEDED'
    | 'NOT_VERIFIED'
    | 'AGENT_INACTIVE'
    | 'INSUFFICIENT_TRUST'
    | 'SCOPE_DENIED'
    | 'TOKEN_EXPIRED'
  message: string
}

/** Result of validating an agent identity */
export interface KYAValidationResult {
  valid: boolean
  agent: AgentIdentity | null
  trust_level: AgentTrustLevel
  errors: KYAValidationError[]
}

/**
 * Validate an incoming agent identity claim.
 * Checks required fields, budget limits, and verification status.
 */
export function validateAgentIdentity(
  identity: Partial<AgentIdentity>
): KYAValidationResult {
  const errors: KYAValidationError[] = []

  // Required fields
  if (!identity.agent_id) {
    errors.push({
      code: 'MISSING_AGENT_ID',
      message: 'agent_id is required for agent identification',
    })
  }

  if (!identity.principal) {
    errors.push({
      code: 'MISSING_PRINCIPAL',
      message:
        'principal (human/org behind the agent) is required — agents must have accountable owners',
    })
  }

  if (
    identity.capabilities &&
    (!Array.isArray(identity.capabilities) || identity.capabilities.length === 0)
  ) {
    errors.push({
      code: 'INVALID_CAPABILITIES',
      message: 'capabilities must be a non-empty array of strings',
    })
  }

  // Budget check
  if (
    identity.budget_limit !== undefined &&
    identity.spending_so_far !== undefined &&
    identity.spending_so_far >= identity.budget_limit
  ) {
    errors.push({
      code: 'BUDGET_EXCEEDED',
      message: `Agent has spent $${identity.spending_so_far} of $${identity.budget_limit} budget`,
    })
  }

  // Determine trust level
  const trustScore = identity.trust_score ?? 0
  const trustLevel = getTrustLevel(trustScore)

  // Check verification for higher trust operations
  if (!identity.verified && trustLevel !== 'unverified') {
    errors.push({
      code: 'NOT_VERIFIED',
      message: 'Agent identity has not been verified — limited to unverified trust level',
    })
  }

  const valid = errors.length === 0
  const agent: AgentIdentity | null = valid
    ? {
        agent_id: identity.agent_id!,
        agent_name: identity.agent_name || 'Unknown Agent',
        principal: identity.principal!,
        capabilities: identity.capabilities || [],
        budget_limit: identity.budget_limit ?? 50,
        spending_so_far: identity.spending_so_far ?? 0,
        trust_score: trustScore,
        verified: identity.verified ?? false,
      }
    : null

  return { valid, agent, trust_level: trustLevel, errors }
}

/**
 * Determine trust level from a numeric trust score.
 */
export function getTrustLevel(score: number): AgentTrustLevel {
  if (score >= 90) return 'enterprise'
  if (score >= 75) return 'premium'
  if (score >= 50) return 'standard'
  if (score >= 20) return 'basic'
  return 'unverified'
}

/**
 * Check if an agent has sufficient trust level for a given operation.
 */
export function hasRequiredTrust(
  agentTrust: AgentTrustLevel,
  requiredTrust: AgentTrustLevel
): boolean {
  const levels: AgentTrustLevel[] = [
    'unverified',
    'basic',
    'standard',
    'premium',
    'enterprise',
  ]
  return levels.indexOf(agentTrust) >= levels.indexOf(requiredTrust)
}

/**
 * Extract agent identity from an incoming request's headers.
 * Looks for standard KYA headers or Bearer token with agent claims.
 *
 * Header convention (compatible with Skyfire KYA):
 *   X-Agent-ID: <agent_id>
 *   X-Agent-Principal: <principal>
 *   Authorization: Bearer <kya_token>
 */
export function extractAgentIdentityFromRequest(
  headers: Record<string, string | undefined>
): Partial<AgentIdentity> | null {
  const agentId =
    headers['x-agent-id'] || headers['X-Agent-ID'] || headers['x-agent-id']
  const principal =
    headers['x-agent-principal'] ||
    headers['X-Agent-Principal'] ||
    headers['x-agent-principal']

  if (!agentId) return null

  return {
    agent_id: agentId,
    principal: principal || undefined,
    agent_name: headers['x-agent-name'] || headers['X-Agent-Name'] || undefined,
    capabilities: headers['x-agent-capabilities']
      ? headers['x-agent-capabilities'].split(',').map((c) => c.trim())
      : undefined,
    verified: headers['x-agent-verified'] === 'true',
  }
}

// ---------------------------------------------------------------------------
// What's needed for production KYA support
// ---------------------------------------------------------------------------
//
// 1. Agent Registration Endpoint
//    - POST /api/v1/agents/register
//    - Accepts: agent_name, principal, contact_email, capabilities
//    - Returns: agent_id + API key
//    - Stores in Supabase `agent_identities` table
//
// 2. Agent Verification Flow
//    - OAuth verification of the principal (GitHub, Google)
//    - Email verification fallback
//    - Organization verification for enterprise agents
//
// 3. JWT Token Issuance
//    - POST /api/v1/agents/token
//    - Issue scoped JWTs (identity, payment, or combined)
//    - Short-lived (1 hour) for payment tokens
//    - Longer-lived (30 days) for identity tokens
//
// 4. Trust Score Computation
//    - Based on: transaction count, dispute rate, payment history,
//      verification level, age of account
//    - Updated after each transaction
//    - Businesses can set minimum trust for their services
//
// 5. Gateway Integration
//    - Every gateway call checks agent identity
//    - Trust level determines spending limits
//    - Usage tracked per agent for reputation building
//
// 6. Interoperability
//    - Accept Skyfire KYA tokens (verify with Skyfire API)
//    - Accept ERC-8004 agent IDs (verify on-chain)
//    - Issue tokens compatible with NIST OAuth/SCIM framework
//    - Accept Visa TAP agent credentials
// ---------------------------------------------------------------------------
