import crypto from 'crypto'

const VAULT_SECRET = process.env.GATEWAY_VAULT_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function assertVaultSecret(): void {
  if (!VAULT_SECRET) {
    throw new Error('Gateway vault secret is not configured. Set GATEWAY_VAULT_SECRET or SUPABASE_SERVICE_ROLE_KEY.')
  }
}

// Encrypt credentials before storing in DB
export function encryptCredentials(credentials: Record<string, string>): string {
  assertVaultSecret()
  const iv = crypto.randomBytes(16)
  const key = crypto.scryptSync(VAULT_SECRET, 'agenthermes-vault', 32)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  let encrypted = cipher.update(JSON.stringify(credentials), 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const tag = cipher.getAuthTag().toString('hex')
  return `${iv.toString('hex')}:${tag}:${encrypted}`
}

// Decrypt credentials for use in proxy calls
export function decryptCredentials(encrypted: string): Record<string, string> {
  assertVaultSecret()
  const parts = encrypted.split(':')
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted credentials format')
  }
  const [ivHex, tagHex, data] = parts
  const iv = Buffer.from(ivHex, 'hex')
  const tag = Buffer.from(tagHex, 'hex')
  const key = crypto.scryptSync(VAULT_SECRET, 'agenthermes-vault', 32)
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  let decrypted = decipher.update(data, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return JSON.parse(decrypted)
}

// Apply credentials to a fetch request based on auth type
export function applyAuth(
  headers: Record<string, string>,
  credentials: Record<string, string>,
  authType: string,
  authHeader: string
): Record<string, string> {
  switch (authType) {
    case 'bearer':
      headers[authHeader] = `Bearer ${credentials.api_key || credentials.token}`
      break
    case 'api_key_header':
      headers[authHeader] = credentials.api_key || ''
      break
    case 'basic':
      const encoded = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')
      headers[authHeader] = `Basic ${encoded}`
      break
    case 'query_param':
      // Handled in proxy.ts by appending to URL
      break
  }
  return headers
}
