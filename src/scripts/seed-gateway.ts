/**
 * Seed script for AgentHermes gateway services.
 *
 * Seeds OpenAI and Supabase Query as the first internal gateway services.
 *
 * Run with: npx tsx src/scripts/seed-gateway.ts
 *
 * Requires:
 *   - NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (from .env.local or environment)
 *   - OPENAI_API_KEY (from environment or ~/.openclaw-v2/openclaw.json)
 *   - GATEWAY_VAULT_SECRET or SUPABASE_SERVICE_ROLE_KEY (for credential encryption)
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import crypto from 'crypto'

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

// ---------- Vault (inline to avoid import path issues with tsx) ----------

function encryptCredentials(credentials: Record<string, string>): string {
  const secret = process.env.GATEWAY_VAULT_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  if (!secret) {
    throw new Error('No vault secret available (set GATEWAY_VAULT_SECRET or SUPABASE_SERVICE_ROLE_KEY)')
  }
  const iv = crypto.randomBytes(16)
  const key = crypto.scryptSync(secret, 'agenthermes-vault', 32)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  let encrypted = cipher.update(JSON.stringify(credentials), 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const tag = cipher.getAuthTag().toString('hex')
  return `${iv.toString('hex')}:${tag}:${encrypted}`
}

// ---------- Resolve OpenAI API key ----------

function getOpenAIKey(): string | null {
  // 1. Environment variable
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY
  }

  // 2. Fallback: ~/.openclaw-v2/openclaw.json
  try {
    const home = process.env.USERPROFILE || process.env.HOME || ''
    const openclawPath = resolve(home, '.openclaw-v2', 'openclaw.json')
    const content = readFileSync(openclawPath, 'utf-8')
    const config = JSON.parse(content)
    const apiKey = config?.plugins?.entries?.['memory-lancedb']?.config?.embedding?.apiKey
    if (apiKey) {
      console.log('  (OpenAI key loaded from ~/.openclaw-v2/openclaw.json)')
      return apiKey
    }
  } catch {
    // File not found or parse error — that's fine
  }

  return null
}

// ---------- Setup ----------

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// ---------- Service definitions ----------

interface SeedService {
  name: string
  description: string
  api_base_url: string
  auth_type: string
  auth_header: string
  category: string
  cost_per_call: number
  cost_model: string
  our_margin: number
  credentials: Record<string, string> | null
  actions: {
    name: string
    method: string
    path: string
    description: string
    params_schema?: Record<string, unknown>
    cost_override?: number
  }[]
}

function buildServices(): SeedService[] {
  const services: SeedService[] = []

  // --- OpenAI ---
  const openaiKey = getOpenAIKey()
  if (openaiKey) {
    services.push({
      name: 'OpenAI',
      description: 'GPT-4, embeddings, image generation, and more via OpenAI API',
      api_base_url: 'https://api.openai.com/v1',
      auth_type: 'bearer',
      auth_header: 'Authorization',
      category: 'ai',
      cost_per_call: 0.01,
      cost_model: 'per_call',
      our_margin: 0.20,
      credentials: { api_key: openaiKey },
      actions: [
        {
          name: 'chat_completion',
          method: 'POST',
          path: '/chat/completions',
          description: 'Generate text with GPT-4 or GPT-3.5',
          params_schema: {
            type: 'object',
            properties: {
              model: { type: 'string', default: 'gpt-4o-mini' },
              messages: { type: 'array', items: { type: 'object' } },
              temperature: { type: 'number', default: 0.7 },
              max_tokens: { type: 'number', default: 1000 },
            },
            required: ['messages'],
          },
          cost_override: 0.02,
        },
        {
          name: 'embedding',
          method: 'POST',
          path: '/embeddings',
          description: 'Generate text embeddings',
          params_schema: {
            type: 'object',
            properties: {
              model: { type: 'string', default: 'text-embedding-3-small' },
              input: { type: 'string' },
            },
            required: ['input'],
          },
          cost_override: 0.001,
        },
        {
          name: 'image_generation',
          method: 'POST',
          path: '/images/generations',
          description: 'Generate images with DALL-E',
          params_schema: {
            type: 'object',
            properties: {
              model: { type: 'string', default: 'dall-e-3' },
              prompt: { type: 'string' },
              size: { type: 'string', default: '1024x1024' },
              n: { type: 'number', default: 1 },
            },
            required: ['prompt'],
          },
          cost_override: 0.04,
        },
      ],
    })
  } else {
    console.warn('  WARN  No OPENAI_API_KEY found — skipping OpenAI service')
  }

  // --- Supabase Query ---
  // Uses the existing service role key for the AgentHermes project
  services.push({
    name: 'Supabase Query',
    description: 'Execute SQL queries against any Supabase project',
    api_base_url: 'https://jcuwzyjdpjmpxpsawudf.supabase.co/rest/v1',
    auth_type: 'api_key_header',
    auth_header: 'apikey',
    category: 'database',
    cost_per_call: 0.001,
    cost_model: 'per_call',
    our_margin: 0.20,
    credentials: { api_key: SERVICE_KEY },
    actions: [
      {
        name: 'query_table',
        method: 'GET',
        path: '/businesses',
        description: 'Query the businesses table',
        params_schema: {
          type: 'object',
          properties: {
            select: { type: 'string' },
            limit: { type: 'number' },
          },
        },
      },
    ],
  })

  // --- Creatify (Video Ad Generation) --- no credentials yet
  services.push({
    name: 'Creatify',
    description: 'AI video ad generation from URLs. 1,364 avatars, multiple styles.',
    api_base_url: 'https://api.creatify.ai/api',
    auth_type: 'api_key_header',
    auth_header: 'X-API-ID',
    category: 'video',
    cost_per_call: 0.50,
    cost_model: 'per_call',
    our_margin: 0.20,
    credentials: null,
    actions: [
      {
        name: 'create_video',
        method: 'POST',
        path: '/ads',
        description: 'Create a video ad from a URL or script',
        params_schema: {
          type: 'object',
          properties: {
            url: { type: 'string' },
            script: { type: 'string' },
            avatar_id: { type: 'string' },
          },
        },
        cost_override: 2.00,
      },
      {
        name: 'list_avatars',
        method: 'GET',
        path: '/avatars',
        description: 'List available AI avatars',
        cost_override: 0.01,
      },
      {
        name: 'check_status',
        method: 'GET',
        path: '/ads/{id}',
        description: 'Check video generation status',
        cost_override: 0.01,
      },
    ],
  })

  // --- ElevenLabs (Voice/TTS) --- no credentials yet
  services.push({
    name: 'ElevenLabs',
    description: 'Text-to-speech with natural voices. Voice cloning, multilingual.',
    api_base_url: 'https://api.elevenlabs.io/v1',
    auth_type: 'api_key_header',
    auth_header: 'xi-api-key',
    category: 'voice',
    cost_per_call: 0.05,
    cost_model: 'per_call',
    our_margin: 0.20,
    credentials: null,
    actions: [
      {
        name: 'text_to_speech',
        method: 'POST',
        path: '/text-to-speech/{voice_id}',
        description: 'Convert text to speech',
        params_schema: {
          type: 'object',
          properties: {
            text: { type: 'string' },
            voice_id: { type: 'string' },
            model_id: { type: 'string' },
          },
          required: ['text'],
        },
        cost_override: 0.10,
      },
      {
        name: 'list_voices',
        method: 'GET',
        path: '/voices',
        description: 'List available voices',
        cost_override: 0.001,
      },
    ],
  })

  // --- Anthropic (Claude API) --- no credentials yet
  services.push({
    name: 'Anthropic',
    description: 'Claude AI models — chat, analysis, coding assistance',
    api_base_url: 'https://api.anthropic.com/v1',
    auth_type: 'api_key_header',
    auth_header: 'x-api-key',
    category: 'ai',
    cost_per_call: 0.03,
    cost_model: 'per_call',
    our_margin: 0.20,
    credentials: null,
    actions: [
      {
        name: 'create_message',
        method: 'POST',
        path: '/messages',
        description: 'Chat with Claude',
        params_schema: {
          type: 'object',
          properties: {
            model: { type: 'string', default: 'claude-sonnet-4-20250514' },
            messages: { type: 'array' },
            max_tokens: { type: 'number', default: 1024 },
          },
          required: ['messages'],
        },
        cost_override: 0.05,
      },
    ],
  })

  // --- Pexels (Stock Photos/Video) --- no credentials yet
  services.push({
    name: 'Pexels',
    description: 'Free stock photos and videos. No attribution required.',
    api_base_url: 'https://api.pexels.com',
    auth_type: 'api_key_header',
    auth_header: 'Authorization',
    category: 'media',
    cost_per_call: 0.001,
    cost_model: 'per_call',
    our_margin: 0.20,
    credentials: null,
    actions: [
      {
        name: 'search_photos',
        method: 'GET',
        path: '/v1/search',
        description: 'Search stock photos',
        params_schema: {
          type: 'object',
          properties: {
            query: { type: 'string' },
            per_page: { type: 'number', default: 10 },
          },
          required: ['query'],
        },
      },
      {
        name: 'search_videos',
        method: 'GET',
        path: '/videos/search',
        description: 'Search stock videos',
      },
    ],
  })

  return services
}

// ---------- Seed logic ----------

async function seed() {
  console.log('=== AgentHermes Gateway Seed ===\n')

  const services = buildServices()
  let created = 0
  let skipped = 0

  for (const svc of services) {
    // Check if already exists
    const { data: existing } = await supabase
      .from('gateway_services')
      .select('id')
      .eq('name', svc.name)
      .maybeSingle()

    if (existing) {
      console.log(`  SKIP  ${svc.name} (already exists, id=${(existing as Record<string, unknown>).id})`)
      skipped++
      continue
    }

    // Encrypt credentials (null = not yet connected, skip encryption)
    const encryptedCreds = svc.credentials
      ? encryptCredentials(svc.credentials)
      : null

    const { data: inserted, error } = await supabase
      .from('gateway_services')
      .insert({
        name: svc.name,
        description: svc.description,
        api_base_url: svc.api_base_url,
        auth_type: svc.auth_type,
        auth_header: svc.auth_header,
        encrypted_credentials: encryptedCreds,
        actions: svc.actions,
        cost_per_call: svc.cost_per_call,
        cost_model: svc.cost_model,
        our_margin: svc.our_margin,
        category: svc.category,
        status: svc.credentials ? 'active' : 'pending',
      } as Record<string, unknown>)
      .select('id, name, category, status')
      .single()

    if (error || !inserted) {
      console.error(`  FAIL  ${svc.name}: ${error?.message}`)
      continue
    }

    const row = inserted as Record<string, unknown>
    const status = svc.credentials ? 'active' : 'pending'
    console.log(`  OK    ${svc.name} (category=${svc.category}, actions=${svc.actions.length}, status=${status}, id=${row.id})`)
    created++
  }

  console.log(`\n=== Done: ${created} services created, ${skipped} skipped ===`)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
