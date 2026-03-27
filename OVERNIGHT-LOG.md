# AgentHermes Overnight Production Readiness Log

## Cycle 1+2 — Portfolio Real Scans + Self-Scan
**Started**: 2026-03-26T16:00:00Z
**Status**: COMPLETE

### Real Portfolio Scores (9-dimension scanner)
| Domain | Real Score | Tier | Old Placeholder | Delta |
|--------|-----------|------|----------------|-------|
| dropclose.ai | 38 | Not Scored | 72 (silver) | -34 |
| calltwin.ai | 36 | Not Scored | 68 (silver) | -32 |
| affixed.ai | 19 | Not Scored | 35 (bronze) | -16 |
| pureuspeptide.com | 16 | Not Scored | 55 (silver) | -39 |

### AgentHermes Self-Scan: 29/100 (CAPPED at 29)
| Dimension | Score | Weight | Notes |
|-----------|-------|--------|-------|
| D1 Discoverability | 55 | 0.20 | Found agent-card, llms.txt, robots.txt |
| D2 Interoperability | 22 | 0.20 | MCP exists but scanner can't call tools/list properly |
| D3 Onboarding | 0 | 0.10 | No /signup, /register API, no programmatic signup |
| D4 Pricing | 0 | 0.10 | No pricing API or structured pricing |
| D5 Payment | 0 | 0.10 | No payment endpoints detected by scanner |
| D6 Data Quality | 80 | 0.10 | Good JSON responses, consistent naming |
| D7 Security | 60 | 0.10 | HTTPS, HSTS, some headers |
| D8 Reliability | 45 | 0.05 | Has /health-like endpoints |
| D9 Agent Experience | 0 | 0.05 | No X-Request-ID, no structured errors detected |

**Cap applied**: "No callable endpoints" → capped at 29

### Analysis
The "no callable endpoints" cap fired because the D2 scanner probes generic paths (/api, /api/v1, /api/health) and our API doesn't respond at those exact paths. Our MCP is at /api/mcp and our endpoints are specific (not /api/v1 root). The scanner's endpoint detection logic doesn't match our actual API surface.

This is the most important finding: **our own scanner has blind spots** that prevent it from correctly scoring our own platform. This means other well-built platforms would also score lower than they should.

### Key Insight
The scanner should also check:
- /.well-known/mcp.json (we serve this!) to discover MCP endpoints
- /openapi.json to discover REST endpoints
- Use the Agent Card's capabilities section to find endpoints

This would make the scanner much smarter — instead of blindly probing /api, it reads the discovery files the business has published.

### FIX APPLIED: Smarter D2 Scanner
- Scanner now follows /.well-known/mcp.json endpoint references
- Tries JSON-RPC tools/list POST on discovered MCP endpoints
- Checks /openapi.json and /api/v1/discover as REST indicators
- Re-scan result: **29 → 41 (Bronze!)**
- D2 jumped from 22 → 70
- Cap removed (callable endpoints now detected)
- Committed and deployed

### Memory Saved
- Project memory written to agenthermes-project.md
- MEMORY.md updated with AgentHermes entry

## Cycle 3 — Build /developers page
**Status**: PENDING (next cycle)
