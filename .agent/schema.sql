-- AgentHermes Database Schema (Supabase: jcuwzyjdpjmpxpsawudf)
-- Last updated: 2026-03-31

-- Core tables
CREATE TABLE businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hermes_id TEXT UNIQUE,
  name TEXT,
  domain TEXT UNIQUE,
  slug TEXT UNIQUE,
  description TEXT,
  vertical TEXT,
  category TEXT,
  logo_url TEXT,
  website TEXT,
  owner_email TEXT,        -- NEVER expose in API responses
  stripe_connect_id TEXT,  -- NEVER expose in API responses
  audit_score INTEGER,
  audit_tier TEXT,
  mcp_endpoints JSONB,
  a2a_agent_card JSONB,
  llms_txt_url TEXT,
  hermes_json JSONB,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE scan_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id),
  dimension TEXT NOT NULL,
  score INTEGER,
  checks JSONB,
  recommendations JSONB,
  weight NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE audit_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id),
  category TEXT,
  score INTEGER,
  findings JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Gateway
CREATE TABLE gateway_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id),
  service_name TEXT NOT NULL,
  api_base_url TEXT,
  auth_type TEXT,
  encrypted_credentials TEXT,  -- AES-256-GCM
  actions JSONB,
  cost_per_call NUMERIC,
  category TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE wallet_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_id TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  service_id UUID REFERENCES gateway_services(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- A2A
CREATE TABLE a2a_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id TEXT,
  skill_id TEXT,
  input JSONB,
  status TEXT DEFAULT 'pending',
  result JSONB,
  callback_url TEXT,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Fulfillment
CREATE TABLE agent_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID,
  tool_called TEXT NOT NULL,
  input JSONB NOT NULL,
  agent_id TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE business_fulfillment_routes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id),
  routes JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Monitoring & Logging
CREATE TABLE error_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  route TEXT,
  error TEXT,
  context JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE monitoring_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID,
  check_type TEXT,
  result JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE email_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  business_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_businesses_domain ON businesses(domain);
CREATE INDEX idx_businesses_slug ON businesses(slug);
CREATE INDEX idx_businesses_audit_score ON businesses(audit_score DESC);
CREATE INDEX idx_scan_results_business ON scan_results(business_id);
CREATE INDEX idx_agent_leads_business ON agent_leads(business_id);
CREATE INDEX idx_agent_leads_status ON agent_leads(status);
CREATE INDEX idx_a2a_tasks_status ON a2a_tasks(status, created_at DESC);
