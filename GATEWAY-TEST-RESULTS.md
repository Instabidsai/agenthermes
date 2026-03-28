# AgentHermes Gateway — End-to-End Test Results

**Date:** 2026-03-28
**Tester:** Claude Code (automated)

---

## Step 1: Seed Script

**Command:** `OPENAI_API_KEY=... npx tsx src/scripts/seed-gateway.ts`
**Result: PASS**

6 gateway services created:

| Service | Category | Status | Actions | ID |
|---------|----------|--------|---------|-----|
| OpenAI | ai | active | 3 (chat_completion, embedding, image_generation) | `fe52a3eb-732a-4041-901f-e4959687c7ee` |
| Supabase Query | database | active | 1 (query_table) | `d25fa58d-ba27-4a99-90fc-3a353bcb7290` |
| Creatify | video | pending | 3 (no credentials) | `793ada9d-6c4b-4ad3-a671-a150679c13ae` |
| ElevenLabs | voice | pending | 2 (no credentials) | `4a113ad3-0c0d-453b-ab3a-8e4ad5bb86cf` |
| Anthropic | ai | pending | 1 (no credentials) | `f7de9afe-27e1-459b-80b9-6545c3c0eac0` |
| Pexels | media | pending | 2 (no credentials) | `747a7688-5130-4ef5-ac1e-092882e7cc3c` |

- OpenAI credentials encrypted with AES-256-GCM (vault key derived from SUPABASE_SERVICE_ROLE_KEY)
- Supabase Query credentials encrypted similarly
- 4 services seeded as "pending" (no API keys provided yet)

---

## Step 2: Verify via Production API

**Endpoint:** `GET https://agenthermes.ai/api/v1/gateway`
**Result: PASS**

```
Total active services: 2
  - OpenAI [ai] cost=$0.01 actions: chat_completion, embedding, image_generation
  - Supabase Query [database] cost=$0.001 actions: query_table
```

Pending services correctly filtered out. Only active (credentialed) services returned.

**MCP verification** (`POST https://agenthermes.ai/api/mcp` with `list_gateway_services`):
Also returned 2 active services. Confirmed working via both REST and MCP interfaces.

---

## Step 3: End-to-End Gateway Call

### Wallet Setup

3 wallets found, all with $0 balance initially. Funded wallet `3a03adc6-b970-42a6-8c4d-215ec4bfdd8a` with $1.00 for testing.

### Production API Auth

The production `/api/v1/gateway/call` endpoint requires `AGENTHERMES_API_KEY` via Bearer token. This env var is set on Vercel but not available locally. The REST endpoint returns:
- `401` without auth header
- `403` with wrong token

The MCP `call_service` tool has the same auth gate.

### Direct Proxy Test (bypasses HTTP auth, tests full gateway flow)

**Script:** `npx tsx src/scripts/test-gateway-e2e.ts`
**Result: PASS**

Full flow executed:

| Step | Result |
|------|--------|
| Fetch service from DB | OK: OpenAI [ai] status=active |
| Decrypt credentials (AES-256-GCM) | OK: Key starts with `sk-proj-ku2G...` |
| Check wallet balance | OK: $1.00, status=active |
| Call OpenAI chat/completions | OK: 200, 1008ms |
| GPT-4o-mini response | "Hello! How are you today?" |
| Token usage | prompt=15, completion=7, total=22 |
| Billing deduction | OK: $1.00 -> $0.976 (cost=$0.02, margin=$0.004) |
| Log to gateway_usage table | OK: entry created |
| Final wallet balance | $0.976 |

### Gateway Usage Log (Supabase)

```
action_name: chat_completion
cost: $0.02
margin: $0.004
response_ms: 1008
status_code: 200
success: true
created_at: 2026-03-28T15:57:40.941108+00:00
```

---

## Summary

| Test | Status |
|------|--------|
| Seed script execution | PASS |
| Service creation (6 services) | PASS |
| Credential encryption (AES-256-GCM vault) | PASS |
| Production API listing (REST) | PASS |
| Production API listing (MCP) | PASS |
| Credential decryption | PASS |
| Wallet balance check | PASS |
| OpenAI API call through gateway | PASS |
| Billing deduction | PASS |
| Usage logging | PASS |
| Production auth gate (REST + MCP) | PASS (correctly blocks unauthenticated calls) |

### Blocker for Full Production E2E

The `AGENTHERMES_API_KEY` is configured on Vercel but its value is not available locally. To test the full production HTTP flow (not just the proxy logic), either:
1. Retrieve the key from Vercel dashboard, or
2. Set a known key locally and redeploy

The gateway proxy logic itself is fully verified end-to-end: service lookup, credential decryption, upstream API call, billing, and usage logging all work correctly.
