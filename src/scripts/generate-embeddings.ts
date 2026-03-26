/**
 * Generate embeddings for all businesses in the database.
 *
 * Run with: npx tsx src/scripts/generate-embeddings.ts
 *
 * Reads env from .env.local in the project root.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { generateEmbedding, embeddingToString } from '../lib/embeddings'

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
    // .env.local may not exist — fine if env vars set externally
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

// ---------- Main ----------

async function main() {
  console.log('=== Generate Embeddings for AgentHermes Businesses ===\n')

  const { data: businesses, error } = await supabase
    .from('businesses')
    .select('id, name, description, capabilities, vertical')

  if (error) {
    console.error('Failed to fetch businesses:', error.message)
    process.exit(1)
  }

  if (!businesses || businesses.length === 0) {
    console.log('No businesses found. Run the seed script first.')
    process.exit(0)
  }

  console.log(`Found ${businesses.length} businesses.\n`)

  let updated = 0
  let failed = 0

  for (const biz of businesses) {
    // Combine fields into a single text for embedding
    const parts: string[] = []
    if (biz.name) parts.push(biz.name)
    if (biz.description) parts.push(biz.description)
    if (biz.vertical) parts.push(biz.vertical)
    if (biz.capabilities && Array.isArray(biz.capabilities)) {
      parts.push(biz.capabilities.join(' '))
    }

    const text = parts.join(' ')
    const embedding = generateEmbedding(text)
    const embeddingStr = embeddingToString(embedding)

    const { error: updateError } = await supabase
      .from('businesses')
      .update({ description_embedding: embeddingStr })
      .eq('id', biz.id)

    if (updateError) {
      console.error(`  FAIL  ${biz.name}: ${updateError.message}`)
      failed++
    } else {
      // Show a few non-zero dimensions for verification
      const nonZero = embedding.filter((v) => v !== 0).length
      console.log(
        `  OK    ${biz.name} (${nonZero}/384 non-zero dimensions)`
      )
      updated++
    }
  }

  console.log(
    `\n=== Done: ${updated} updated, ${failed} failed out of ${businesses.length} total ===`
  )
}

main().catch((err) => {
  console.error('Generate embeddings failed:', err)
  process.exit(1)
})
