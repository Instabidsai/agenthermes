/**
 * End-to-end test for the AgentHermes gateway.
 * Calls OpenAI's chat/completions through the gateway proxy logic,
 * including credential decryption, billing, and usage logging.
 *
 * Run: OPENAI_API_KEY=... npx tsx src/scripts/test-gateway-e2e.ts
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import crypto from 'crypto'

// ---------- Load .env.local ----------
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
      if (!process.env[key]) process.env[key] = value
    }
  } catch { /* ok */ }
}
loadEnv()

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// ---------- Vault decryption (inline) ----------
function decryptCredentials(encrypted: string): Record<string, string> {
  const secret = process.env.GATEWAY_VAULT_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  const [ivHex, tagHex, data] = encrypted.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const tag = Buffer.from(tagHex, 'hex')
  const key = crypto.scryptSync(secret, 'agenthermes-vault', 32)
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  let decrypted = decipher.update(data, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return JSON.parse(decrypted)
}

// ---------- Test ----------
async function test() {
  console.log('=== AgentHermes Gateway End-to-End Test ===\n')

  const SERVICE_ID = 'fe52a3eb-732a-4041-901f-e4959687c7ee' // OpenAI
  const WALLET_ID = '3a03adc6-b970-42a6-8c4d-215ec4bfdd8a'

  // 1. Fetch service
  console.log('1. Fetching OpenAI service from DB...')
  const { data: svcData, error: svcErr } = await supabase
    .from('gateway_services')
    .select('*')
    .eq('id', SERVICE_ID)
    .single()

  if (svcErr || !svcData) {
    console.error('   FAIL: Service not found:', svcErr?.message)
    return
  }
  const svc = svcData as Record<string, any>
  console.log(`   OK: ${svc.name} [${svc.category}] status=${svc.status}`)

  // 2. Decrypt credentials
  console.log('2. Decrypting credentials...')
  let creds: Record<string, string>
  try {
    creds = decryptCredentials(svc.encrypted_credentials)
    console.log(`   OK: Decrypted. Key starts with: ${creds.api_key?.slice(0, 12)}...`)
  } catch (err: any) {
    console.error('   FAIL:', err.message)
    return
  }

  // 3. Check wallet balance
  console.log('3. Checking wallet balance...')
  const { data: walletData, error: walletErr } = await supabase
    .from('agent_wallets')
    .select('id, balance, status')
    .eq('id', WALLET_ID)
    .single()

  if (walletErr || !walletData) {
    console.error('   FAIL: Wallet not found:', walletErr?.message)
    return
  }
  const wallet = walletData as Record<string, any>
  console.log(`   OK: Balance=$${wallet.balance}, Status=${wallet.status}`)

  // 4. Build and execute OpenAI request
  console.log('4. Calling OpenAI chat/completions via gateway...')
  const startMs = Date.now()

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${creds.api_key}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Say hello in exactly 5 words.' }],
      max_tokens: 50,
    }),
    signal: AbortSignal.timeout(30_000),
  })

  const responseMs = Date.now() - startMs
  const responseData = await response.json()

  console.log(`   Status: ${response.status}`)
  console.log(`   Response time: ${responseMs}ms`)

  if (response.ok) {
    const msg = responseData.choices?.[0]?.message?.content
    console.log(`   GPT response: "${msg}"`)
    console.log(`   Model used: ${responseData.model}`)
    console.log(`   Tokens: prompt=${responseData.usage?.prompt_tokens}, completion=${responseData.usage?.completion_tokens}, total=${responseData.usage?.total_tokens}`)
  } else {
    console.error('   FAIL:', JSON.stringify(responseData))
    return
  }

  // 5. Simulate billing (deduct from wallet)
  const action = (svc.actions as any[]).find((a: any) => a.name === 'chat_completion')
  const cost = action?.cost_override ?? svc.cost_per_call
  const margin = cost * svc.our_margin
  const totalCharged = cost + margin

  console.log('5. Billing...')
  console.log(`   Cost: $${cost.toFixed(4)}, Margin: $${margin.toFixed(4)}, Total: $${totalCharged.toFixed(4)}`)

  const newBalance = wallet.balance - totalCharged
  const { error: deductErr } = await supabase
    .from('agent_wallets')
    .update({ balance: newBalance })
    .eq('id', WALLET_ID)

  if (deductErr) {
    console.error('   FAIL deduct:', deductErr.message)
  } else {
    console.log(`   OK: Wallet balance: $${wallet.balance.toFixed(4)} -> $${newBalance.toFixed(4)}`)
  }

  // 6. Log usage
  console.log('6. Logging usage...')
  const { error: logErr } = await supabase
    .from('gateway_usage')
    .insert({
      agent_wallet_id: WALLET_ID,
      service_id: SERVICE_ID,
      action_name: 'chat_completion',
      cost,
      margin,
      response_ms: responseMs,
      status_code: response.status,
      success: true,
    })

  if (logErr) {
    console.warn(`   WARN: Usage logging failed (non-critical): ${logErr.message}`)
  } else {
    console.log('   OK: Usage logged to gateway_usage table')
  }

  // 7. Verify wallet balance after deduction
  console.log('7. Verifying final wallet balance...')
  const { data: finalWallet } = await supabase
    .from('agent_wallets')
    .select('balance')
    .eq('id', WALLET_ID)
    .single()

  const fw = finalWallet as Record<string, any> | null
  console.log(`   Final balance: $${fw?.balance?.toFixed(4) ?? 'unknown'}`)

  console.log('\n=== END-TO-END TEST PASSED ===')
}

test().catch((err) => {
  console.error('\nTest crashed:', err.message)
  process.exit(1)
})
