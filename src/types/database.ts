export interface Business {
  id: string
  name: string
  slug: string
  domain: string | null
  description: string | null
  logo_url: string | null
  a2a_agent_card: Record<string, unknown> | null
  mcp_endpoints: string[]
  audit_score: number
  audit_tier: 'unaudited' | 'bronze' | 'silver' | 'gold' | 'platinum'
  trust_score: number
  owner_email: string | null
  stripe_connect_id: string | null
  vertical: string | null
  capabilities: string[]
  pricing_visible: boolean
  agent_onboarding: boolean
  created_at: string
  updated_at: string
}

export interface AuditResult {
  id: string
  business_id: string
  category: AuditCategory
  score: number
  max_score: number
  details: Record<string, unknown>
  recommendations: string[]
  audited_at: string
  next_audit_at: string
}

export type AuditCategory =
  | 'machine_readable_profile'
  | 'mcp_api_endpoints'
  | 'agent_native_onboarding'
  | 'structured_pricing'
  | 'agent_payment_acceptance'

export interface AuditScorecard {
  business_name: string
  domain: string
  total_score: number
  tier: string
  categories: {
    category: AuditCategory
    label: string
    score: number
    max_score: number
    details: Record<string, unknown>
    recommendations: string[]
  }[]
  audited_at: string
  next_steps: string[]
}

export interface AgentWallet {
  id: string
  business_id: string
  stripe_connect_id: string | null
  balance: number
  auto_reload_threshold: number
  auto_reload_amount: number
  status: 'active' | 'frozen' | 'closed'
  created_at: string
}

export interface Transaction {
  id: string
  buyer_wallet_id: string
  seller_wallet_id: string
  amount: number
  service_description: string | null
  service_id: string | null
  agent_id: string | null
  task_context: string | null
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  stripe_transfer_id: string | null
  created_at: string
}

export interface Connection {
  id: string
  business_a_id: string
  business_b_id: string
  transaction_count: number
  total_volume: number
  connection_strength: number
  human_intro_sent: boolean
  intro_accepted: boolean
  created_at: string
}

export interface Service {
  id: string
  business_id: string
  name: string
  description: string | null
  pricing_model: 'per_call' | 'monthly' | 'per_unit' | 'custom'
  price_per_call: number
  mcp_endpoint: string | null
  auth_required: boolean
  auth_type: 'api_key' | 'oauth' | 'jwt' | 'none'
  calls_total: number
  calls_last_30d: number
  avg_response_ms: number
  uptime_pct: number
  status: 'active' | 'inactive' | 'deprecated'
  created_at: string
}

export interface BusinessManifest {
  schema_version: string
  business: {
    name: string
    slug: string
    domain: string | null
    description: string | null
    vertical: string | null
    capabilities: string[]
  }
  agent_readiness: {
    score: number
    tier: string
    audited_at: string
  }
  a2a_agent_card: Record<string, unknown> | null
  mcp_endpoints: string[]
  services: {
    name: string
    description: string | null
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
