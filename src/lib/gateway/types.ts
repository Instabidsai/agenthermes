export interface GatewayService {
  id: string
  business_id: string | null
  name: string
  description: string | null
  api_base_url: string
  auth_type: string
  auth_header: string
  encrypted_credentials: string | null
  actions: ServiceAction[]
  cost_per_call: number
  cost_model: string
  our_margin: number
  rate_limit_per_min: number
  category: string | null
  status: string
}

export interface ServiceAction {
  name: string
  method: string  // GET, POST, PUT, DELETE
  path: string    // e.g., "/chat/completions"
  description: string
  params_schema?: Record<string, unknown>  // JSON Schema for parameters
  cost_override?: number  // Override service-level cost
}

export interface GatewayCallResult {
  success: boolean
  status_code: number
  data: unknown
  cost: number
  margin: number
  response_ms: number
  service_name: string
  action_name: string
}

export interface AgentBudget {
  max_per_transaction: number
  max_per_day: number
  max_per_service: number
  requires_approval_above: number
  auto_approved_services: string[]
}
