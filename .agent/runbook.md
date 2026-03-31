# AgentHermes — Runbook

## Build & Deploy

| Symptom | Cause | Fix |
|---------|-------|-----|
| Build fails with type error | TypeScript issue | `npx tsc --noEmit` to find exact error |
| Build lock "Another next build" | Concurrent build | Wait or `rm -rf .next` |
| Pages count drops | ISR or generateStaticParams issue | Check the page's generateStaticParams |
| Deploy not updating | Vercel cache | Push new commit, wait 2-3 min for edge propagation |

## Scanner

| Symptom | Cause | Fix |
|---------|-------|-----|
| Scan times out | Vercel 60s function limit | Try simpler domain, reduce probe count |
| Score seems too low | Vertical weights or auth penalty | Check vertical-weights.ts, verify auth-aware scoring |
| Score seems too high | Open/unauth endpoints inflating | Check if business has real API or just open Next.js routes |
| Scan returns 500 | Supabase connection or malformed URL | Check error_log table, verify URL format |
| Leaderboard shows undefined | Cached scores stale in DB | Rescan the business to update stored score |

## Gateway & MCP

| Symptom | Cause | Fix |
|---------|-------|-----|
| Hosted MCP returns 404 | Business slug not in DB | Check businesses table for slug |
| MCP tools/list empty | No vertical template or gateway services | Verify business has vertical set or gateway_services |
| SSE connection drops | Vercel serverless timeout | SSE limited to ~30s on Vercel, use POST for tool calls |
| Fulfillment email not sent | Email provider not configured | Currently logs only — need Resend/SendGrid wired |
| Gateway call fails | Service credentials missing/expired | Check gateway_services table, decrypt and verify |

## Data

| Symptom | Cause | Fix |
|---------|-------|-----|
| Business not in DB | Never scanned | POST /api/v1/scan with the URL |
| Agent leads not showing | No tool calls through hosted MCP | Test with curl POST to hosted endpoint |
| Registry empty | No businesses with scores | Scan businesses first, registry pulls from businesses table |

## Common Operations

| Task | Command |
|------|---------|
| Build check | `npx next build` |
| Type check | `npx tsc --noEmit` |
| Scan a business | `curl -X POST https://agenthermes.ai/api/v1/scan -H "Content-Type: application/json" -d '{"url":"https://example.com"}'` |
| Check health | `curl https://agenthermes.ai/api/v1/health` |
| Test MCP | `curl -X POST https://agenthermes.ai/api/mcp -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'` |
| Test hosted MCP | `curl -X POST https://agenthermes.ai/api/mcp/hosted/{slug} -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'` |
