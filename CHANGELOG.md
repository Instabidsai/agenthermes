# AgentHermes Changelog

## Audit Cycle 1 — 2026-03-26T06:15:00Z

### Findings (3 audits: code quality, security, functionality)
- **CRITICAL**: Scan route D2 dimension mislabeled as D3 — data corruption on save
- **CRITICAL**: Signature verification could throw on malformed base64 input
- **HIGH**: SSRF vulnerability in hermes-json verify endpoint (no private IP blocking)
- **HIGH**: Trust score missing bounds clamping (could exceed 0-100 range)
- **HIGH**: Webhook delivery failures silently swallowed (no logging)

### Fixes Applied
1. Fixed D2 dimension lookup: `'D3'` → `'D2'` in scan/route.ts
2. Added try-catch + length check to signature verification (timing-safe)
3. Added SSRF protection to hermes-json verify (blocks private IPs)
4. Added bounds clamping to trust score (0-100)
5. Added webhook delivery failure logging

### Not Fixed (deferred)
- Batch scan uses old 5-category engine (works, just older format)
- Hermes JSON dimension inference from old categories (works, less precise)
- Leaderboard pagination race condition (cosmetic)
- Report dimension math scaling (minor display issue)

### Build Status
- Build passes (0 TypeScript errors)
- 60 routes compiled
- Deployed to production via GitHub push
