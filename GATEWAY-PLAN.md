# AgentHermes Gateway — One API Key to Rule Them All

## The Vision
Any AI agent connects to AgentHermes with ONE API key. Through our MCP server, they can discover, evaluate, AND USE any connected business's services. We handle routing, billing, and trust verification. The agent never needs separate API keys for Stripe, OpenAI, Creatify, SendGrid, etc.

## Architecture

```
AI Agent
  │
  │ One AgentHermes API key
  ▼
AgentHermes MCP Server (/api/mcp)
  │
  ├── discover_services()     → "What services are available?"
  ├── check_score(domain)     → "Is this business trustworthy?"
  ├── call_service(service_id, action, params)  → "Execute this API call"
  │       │
  │       ├── Check agent's wallet balance
  │       ├── Check spending limits / budget tier
  │       ├── Look up business's API credentials (credential vault)
  │       ├── Route request to business's actual API
  │       ├── Deduct cost from agent's wallet
  │       └── Return result to agent
  │
  ├── get_wallet_balance()    → "How much can I spend?"
  └── set_budget(limits)      → "Set my spending limits"
```

## Database Schema (new tables)

```sql
-- Connected services that agents can call through the gateway
CREATE TABLE gateway_services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES businesses(id),
  name text NOT NULL,
  description text,

  -- How to call the underlying API
  api_base_url text NOT NULL,         -- e.g., "https://api.openai.com/v1"
  auth_type text NOT NULL,            -- "bearer", "api_key_header", "basic", "oauth"
  auth_header text DEFAULT 'Authorization',  -- which header to use
  -- Credentials stored encrypted (or reference to vault)
  encrypted_credentials jsonb,

  -- Available actions (what agents can do)
  actions jsonb NOT NULL DEFAULT '[]', -- [{name, method, path, params_schema, description}]

  -- Pricing (what we charge agents per call)
  cost_per_call decimal DEFAULT 0,     -- in USD
  cost_model text DEFAULT 'per_call',  -- per_call, per_unit, percentage
  our_margin decimal DEFAULT 0.20,     -- 20% markup

  -- Limits
  rate_limit_per_min int DEFAULT 60,
  max_request_size int DEFAULT 1048576, -- 1MB

  -- Status
  status text DEFAULT 'active',
  last_health_check timestamptz,
  uptime_pct float DEFAULT 99.9,

  created_at timestamptz DEFAULT now()
);

-- Agent budget controls
CREATE TABLE agent_budgets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_id uuid REFERENCES agent_wallets(id),
  max_per_transaction decimal DEFAULT 50,
  max_per_day decimal DEFAULT 200,
  max_per_service decimal DEFAULT 500,
  requires_approval_above decimal DEFAULT 100,
  auto_approved_services uuid[] DEFAULT '{}',  -- pre-approved service IDs
  created_at timestamptz DEFAULT now()
);

-- Gateway usage log (every proxied call)
CREATE TABLE gateway_usage (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_wallet_id uuid REFERENCES agent_wallets(id),
  service_id uuid REFERENCES gateway_services(id),
  action_name text,
  cost decimal NOT NULL,
  margin decimal NOT NULL,
  response_ms int,
  status_code int,
  success boolean,
  created_at timestamptz DEFAULT now()
);
```

## MCP Tools to Add

### Existing tools (keep):
1. discover_businesses
2. get_business_profile
3. get_business_manifest
4. run_audit / run_scan
5. check_wallet_balance
6. initiate_payment
7. verify_hermes_json

### New gateway tools:
8. **list_gateway_services** — Browse all services available through the gateway
   - Filter by category, business, price range
   - Returns: service name, description, cost per call, available actions

9. **call_service** — Execute an API call through the gateway
   - Params: service_id, action_name, params
   - Handles: auth, routing, billing, error handling
   - Deducts from wallet automatically

10. **get_service_actions** — List available actions for a specific service
    - Returns: action names, parameters, descriptions, costs

11. **get_budget** — Check current spending limits
12. **set_budget** — Update spending limits (requires owner auth)
13. **get_usage** — View usage history and spending

## Phase 1: Internal Testing (Build This First)

Connect our OWN services as the first gateway services:

| Service | API Base | Actions | Cost/call |
|---------|----------|---------|-----------|
| OpenAI | api.openai.com/v1 | chat.completions, embeddings, images | ~$0.01-0.10 |
| Creatify | api.creatify.ai | create_video, list_avatars, check_status | ~$0.50-2.00 |
| Supabase | *.supabase.co | execute_sql, list_tables | ~$0.001 |
| Postiz | social.myjarvisbrain.com | create_post, schedule_post | ~$0.01 |

These are all services we ALREADY pay for and have API keys for.

## Phase 2: Open to External Businesses

Business onboarding flow:
1. Business scans on AgentHermes → gets scored
2. If Gold+ (75+), option to "Connect to Gateway"
3. Business provides: API base URL, auth credentials, action definitions
4. We verify endpoints work, set pricing, activate
5. Agents can now discover and use the service through one key

## Revenue Math

If an agent makes 1,000 API calls per day through the gateway:
- Average cost per call: $0.05 (business's price)
- Our margin: 20% = $0.01 per call
- Daily revenue per active agent: $10
- 100 active agents: $1,000/day = $30,000/mo
- 1,000 active agents: $10,000/day = $300,000/mo

This is on top of the SaaS pricing ($49-199/mo) for the scoring product.

## Build Sequence

### Step 1: Database (gateway_services, agent_budgets, gateway_usage tables)
### Step 2: Credential vault (secure storage for business API keys)
### Step 3: Service proxy engine (route requests, handle auth, log usage)
### Step 4: MCP tools (list_gateway_services, call_service, get_service_actions)
### Step 5: Billing integration (wallet deduction per call with margin)
### Step 6: Budget controls (per-transaction/daily/service limits)
### Step 7: Connect first 4 internal services (OpenAI, Creatify, Supabase, Postiz)
### Step 8: Test with real agent calls through MCP
### Step 9: Gateway dashboard page (/gateway)
### Step 10: Business onboarding flow for external services

## Security Considerations

- Credential vault: API keys encrypted at rest, never returned to agents
- Spending limits: hard caps prevent runaway costs
- Rate limiting: per-agent, per-service limits
- Audit trail: every proxied call logged with full details
- SSRF protection: only allow HTTPS to known business domains
- Approval workflow: high-cost actions require owner confirmation
