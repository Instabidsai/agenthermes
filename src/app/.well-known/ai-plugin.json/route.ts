import { NextResponse } from 'next/server'

const aiPlugin = {
  schema_version: 'v1',
  name_for_human: 'AgentHermes',
  name_for_model: 'agenthermes',
  description_for_human:
    'The verified commerce network for the agent economy — scores businesses 0-100 on AI agent readiness across 9 dimensions.',
  description_for_model:
    'AgentHermes is the verified commerce network for AI agents. It scores businesses from 0-100 on AI agent readiness across 9 weighted dimensions: discoverability, interoperability, onboarding, pricing transparency, payment, data quality, security, reliability, and agent experience. It provides scanning, discovery, certification, badges, MCP tools, gateway access, and wallet-to-wallet payments.',
  auth: { type: 'none' },
  api: { type: 'openapi', url: 'https://agenthermes.ai/openapi.json' },
  logo_url: 'https://agenthermes.ai/favicon.ico',
  contact_email: 'support@agenthermes.ai',
  legal_info_url: 'https://agenthermes.ai/terms',
}

export async function GET() {
  return NextResponse.json(aiPlugin, {
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
