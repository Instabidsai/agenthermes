/**
 * Seed script for AgentHermes portfolio companies.
 *
 * Run with: npx tsx src/scripts/seed-portfolio.ts
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY for direct inserts.
 * Reads env from .env.local in the project root.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// ---------- Load .env.local manually (no dotenv dependency) ----------

function loadEnv() {
  try {
    const envPath = resolve(__dirname, '../../.env.local')
    const content = readFileSync(envPath, 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const value = trimmed.slice(eqIdx + 1).trim()
      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  } catch {
    // .env.local may not exist — that's fine if env vars are set externally
  }
}

loadEnv()

// ---------- Setup ----------

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// ---------- Data ----------

function tierForScore(score: number): string {
  if (score >= 90) return 'platinum'
  if (score >= 75) return 'gold'
  if (score >= 50) return 'silver'
  if (score >= 25) return 'bronze'
  return 'unaudited'
}

interface SeedBusiness {
  name: string
  slug: string
  domain: string
  description: string
  vertical: string
  capabilities: string[]
  audit_score: number
  owner_email: string
  services: {
    name: string
    description: string
    pricing_model: 'per_call' | 'monthly' | 'per_unit' | 'custom'
    price_per_call: number
    auth_type: 'api_key' | 'oauth' | 'jwt' | 'none'
  }[]
}

const PORTFOLIO: SeedBusiness[] = [
  {
    name: 'DropClose',
    slug: 'dropclose',
    domain: 'dropclose.ai',
    description: 'AI-powered sales pipeline and deal management',
    vertical: 'sales',
    capabilities: ['lead-management', 'deal-tracking', 'ai-sales-agent', 'crm'],
    audit_score: 72,
    owner_email: 'admin@dropclose.ai',
    services: [
      {
        name: 'Lead Enrichment API',
        description: 'Enrich leads with AI-powered data from multiple sources',
        pricing_model: 'per_call',
        price_per_call: 0.05,
        auth_type: 'api_key',
      },
      {
        name: 'Deal Scoring',
        description: 'AI deal probability scoring based on pipeline signals',
        pricing_model: 'per_call',
        price_per_call: 0.10,
        auth_type: 'api_key',
      },
    ],
  },
  {
    name: 'CallTwin',
    slug: 'calltwin',
    domain: 'calltwin.ai',
    description: 'AI voice cloning and call automation',
    vertical: 'voice-ai',
    capabilities: ['voice-cloning', 'call-automation', 'ai-receptionist', 'call-analytics'],
    audit_score: 68,
    owner_email: 'admin@calltwin.ai',
    services: [
      {
        name: 'Voice Clone API',
        description: 'Create an AI voice clone from sample audio',
        pricing_model: 'per_call',
        price_per_call: 0.25,
        auth_type: 'api_key',
      },
      {
        name: 'AI Receptionist',
        description: 'Automated call answering with voice cloning',
        pricing_model: 'monthly',
        price_per_call: 49.00,
        auth_type: 'api_key',
      },
    ],
  },
  {
    name: 'JarvisSDK',
    slug: 'jarvissdk',
    domain: 'jarvissdk.com',
    description: 'Agent module marketplace and SDK',
    vertical: 'ai-infrastructure',
    capabilities: ['agent-marketplace', 'sdk', 'agent-modules', 'integration'],
    audit_score: 82,
    owner_email: 'admin@jarvissdk.com',
    services: [
      {
        name: 'Module Registry',
        description: 'Browse and install agent modules programmatically',
        pricing_model: 'per_call',
        price_per_call: 0.00,
        auth_type: 'api_key',
      },
      {
        name: 'Agent Deployment',
        description: 'Deploy agent modules to your infrastructure',
        pricing_model: 'per_unit',
        price_per_call: 5.00,
        auth_type: 'api_key',
      },
    ],
  },
  {
    name: 'CodeItRight',
    slug: 'codeitright',
    domain: 'codeitright.ai',
    description: 'AI medical billing compliance and coding',
    vertical: 'healthcare',
    capabilities: ['medical-billing', 'compliance', 'coding-verification', 'audit'],
    audit_score: 45,
    owner_email: 'admin@codeitright.ai',
    services: [
      {
        name: 'Claim Validator',
        description: 'Validate medical claims against coding rules and payer requirements',
        pricing_model: 'per_call',
        price_per_call: 0.15,
        auth_type: 'api_key',
      },
    ],
  },
  {
    name: 'AffixedAI',
    slug: 'affixedai',
    domain: 'affixed.ai',
    description: 'AI consulting and business transformation',
    vertical: 'consulting',
    capabilities: ['ai-consulting', 'business-audit', 'digital-transformation'],
    audit_score: 35,
    owner_email: 'admin@affixed.ai',
    services: [
      {
        name: 'Business Audit',
        description: 'Comprehensive AI-readiness audit for businesses',
        pricing_model: 'per_call',
        price_per_call: 25.00,
        auth_type: 'api_key',
      },
    ],
  },
  {
    name: 'PureUSPeptide',
    slug: 'pureuspeptide',
    domain: 'pureuspeptide.com',
    description: 'Premium peptide e-commerce',
    vertical: 'e-commerce',
    capabilities: ['peptide-sales', 'product-catalog', 'order-management'],
    audit_score: 55,
    owner_email: 'admin@pureuspeptide.com',
    services: [
      {
        name: 'Product Catalog API',
        description: 'Access peptide product catalog with pricing and availability',
        pricing_model: 'per_call',
        price_per_call: 0.01,
        auth_type: 'api_key',
      },
      {
        name: 'Order Placement',
        description: 'Programmatic order placement for agent purchasing',
        pricing_model: 'per_call',
        price_per_call: 0.50,
        auth_type: 'api_key',
      },
    ],
  },
  {
    name: 'ThePeptideAI',
    slug: 'thepeptideai',
    domain: 'thepeptideai.com',
    description: 'Peptide research intelligence platform',
    vertical: 'research',
    capabilities: ['peptide-research', 'inventory-management', 'compliance-tracking'],
    audit_score: 60,
    owner_email: 'admin@thepeptideai.com',
    services: [
      {
        name: 'Research Query',
        description: 'Query peptide research database with RAG-powered answers',
        pricing_model: 'per_call',
        price_per_call: 0.08,
        auth_type: 'jwt',
      },
    ],
  },
  {
    name: 'BlitzGTM',
    slug: 'blitzgtm',
    domain: 'blitzgtm.com',
    description: 'GTM tools and marketing automation (39 MCP tools)',
    vertical: 'marketing',
    capabilities: ['gtm-strategy', 'content-generation', 'market-research', 'competitive-intel'],
    audit_score: 78,
    owner_email: 'admin@blitzgtm.com',
    services: [
      {
        name: 'Market Research',
        description: 'AI-powered market research and competitive intelligence',
        pricing_model: 'per_call',
        price_per_call: 0.50,
        auth_type: 'api_key',
      },
      {
        name: 'Content Generator',
        description: 'Generate marketing content (emails, landing pages, ad copy)',
        pricing_model: 'per_call',
        price_per_call: 0.15,
        auth_type: 'api_key',
      },
    ],
  },
  {
    name: 'AdzForge',
    slug: 'adzforge',
    domain: 'adzforge.com',
    description: 'AI ad creative generation and campaign management',
    vertical: 'advertising',
    capabilities: ['ad-creative', 'campaign-management', 'multi-platform-ads'],
    audit_score: 40,
    owner_email: 'admin@adzforge.com',
    services: [
      {
        name: 'Ad Creative Generator',
        description: 'Generate ad creatives for Meta, TikTok, and Google',
        pricing_model: 'per_call',
        price_per_call: 1.00,
        auth_type: 'api_key',
      },
    ],
  },
  {
    name: 'BuiltMonthly',
    slug: 'builtmonthly',
    domain: 'builtmonthly.com',
    description: 'AI website building as a service',
    vertical: 'web-services',
    capabilities: ['website-building', 'seo', 'hosting', 'maintenance'],
    audit_score: 50,
    owner_email: 'admin@builtmonthly.com',
    services: [
      {
        name: 'Site Builder API',
        description: 'Programmatically build and deploy websites',
        pricing_model: 'per_unit',
        price_per_call: 99.00,
        auth_type: 'api_key',
      },
    ],
  },
  {
    name: 'YourFeeds',
    slug: 'yourfeeds',
    domain: 'yourfeeds.ai',
    description: 'Intelligence subscription and feed aggregation',
    vertical: 'intelligence',
    capabilities: ['feed-aggregation', 'intelligence-reports', 'market-signals'],
    audit_score: 65,
    owner_email: 'admin@yourfeeds.ai',
    services: [
      {
        name: 'Feed Subscription',
        description: 'Subscribe to curated intelligence feeds by topic',
        pricing_model: 'monthly',
        price_per_call: 19.00,
        auth_type: 'api_key',
      },
      {
        name: 'Signal Query',
        description: 'Query real-time market signals and alerts',
        pricing_model: 'per_call',
        price_per_call: 0.02,
        auth_type: 'api_key',
      },
    ],
  },
  {
    name: 'GetPaid.Video',
    slug: 'getpaid-video',
    domain: 'getpaid.video',
    description: 'YouTube monetization and creator tools',
    vertical: 'creator-economy',
    capabilities: ['youtube-tools', 'monetization', 'creator-analytics'],
    audit_score: 30,
    owner_email: 'admin@getpaid.video',
    services: [
      {
        name: 'Channel Analytics',
        description: 'Deep analytics and monetization insights for YouTube channels',
        pricing_model: 'per_call',
        price_per_call: 0.10,
        auth_type: 'oauth',
      },
    ],
  },
]

// ---------- Seed logic ----------

async function seed() {
  console.log('=== AgentHermes Portfolio Seed ===\n')

  let created = 0
  let skipped = 0
  let servicesCreated = 0

  for (const biz of PORTFOLIO) {
    // Check if already exists
    const { data: existing } = await supabase
      .from('businesses')
      .select('id')
      .eq('slug', biz.slug)
      .maybeSingle()

    if (existing) {
      console.log(`  SKIP  ${biz.name} (slug "${biz.slug}" already exists)`)
      skipped++
      continue
    }

    const tier = tierForScore(biz.audit_score)

    const { data: inserted, error: bizErr } = await supabase
      .from('businesses')
      .insert({
        name: biz.name,
        slug: biz.slug,
        domain: biz.domain,
        description: biz.description,
        vertical: biz.vertical,
        capabilities: biz.capabilities,
        owner_email: biz.owner_email,
        audit_score: biz.audit_score,
        audit_tier: tier,
        trust_score: Math.min(biz.audit_score + 10, 100),
        mcp_endpoints: [],
        pricing_visible: true,
        agent_onboarding: biz.audit_score >= 50,
      })
      .select()
      .single()

    if (bizErr || !inserted) {
      console.error(`  FAIL  ${biz.name}: ${bizErr?.message}`)
      continue
    }

    console.log(
      `  OK    ${biz.name} (score=${biz.audit_score}, tier=${tier}, id=${inserted.id})`
    )
    created++

    // Create services
    for (const svc of biz.services) {
      const { error: svcErr } = await supabase.from('services').insert({
        business_id: inserted.id,
        name: svc.name,
        description: svc.description,
        pricing_model: svc.pricing_model,
        price_per_call: svc.price_per_call,
        auth_required: svc.auth_type !== 'none',
        auth_type: svc.auth_type,
        calls_total: 0,
        calls_last_30d: 0,
        avg_response_ms: Math.floor(Math.random() * 400) + 100,
        uptime_pct: parseFloat((99 + Math.random()).toFixed(2)),
        status: 'active',
      })

      if (svcErr) {
        console.error(`    FAIL  service "${svc.name}": ${svcErr.message}`)
      } else {
        console.log(`    +service  "${svc.name}" ($${svc.price_per_call}/${svc.pricing_model})`)
        servicesCreated++
      }
    }

    // Create a wallet for businesses with score >= 50
    if (biz.audit_score >= 50) {
      const { error: walletErr } = await supabase.from('agent_wallets').insert({
        business_id: inserted.id,
        balance: 0,
        auto_reload_threshold: 10,
        auto_reload_amount: 100,
        status: 'active',
      })

      if (walletErr) {
        console.error(`    FAIL  wallet: ${walletErr.message}`)
      } else {
        console.log(`    +wallet  (active)`)
      }
    }
  }

  console.log(
    `\n=== Done: ${created} businesses created, ${skipped} skipped, ${servicesCreated} services created ===`
  )
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
