# Rescan Results — 2026-03-30

## Build Status
- Build passes: 188/188 static pages generated, 0 errors

## Rescan Results (20 Domains)

| # | Domain | Score | Tier |
|---|--------|-------|------|
| 1 | stripe.com | 55 | Bronze |
| 2 | github.com | 61 | Silver |
| 3 | openai.com | 50 | Bronze |
| 4 | vercel.com | 65 | Silver |
| 5 | supabase.com | 61 | Silver |
| 6 | anthropic.com | 37 | Unaudited |
| 7 | slack.com | 64 | Silver |
| 8 | spotify.com | 61 | Silver |
| 9 | twilio.com | 54 | Bronze |
| 10 | sendgrid.com | 54 | Bronze |
| 11 | cloudflare.com | 40 | Bronze |
| 12 | aws.amazon.com | 32 | Unaudited |
| 13 | google.com | 37 | Unaudited |
| 14 | microsoft.com | 48 | Bronze |
| 15 | shopify.com | 50 | Bronze |
| 16 | salesforce.com | 42 | Bronze |
| 17 | datadog.com | 29 | Unaudited |
| 18 | mongodb.com | 61 | Silver |
| 19 | elastic.co | 29 | Unaudited |
| 20 | agenthermes.ai | 55 | Bronze |

**Top 20 Average Score: 47.7** (across all 20 rescanned domains)

## Leaderboard (Final — After JarvisSDK DB Fix)

| Rank | Name | Score | Tier |
|------|------|-------|------|
| 1 | Vercel | 65 | Silver |
| 2 | Slack | 64 | Silver |
| 3 | Thepeptideai | 64 | Silver |
| 4 | Github | 61 | Silver |
| 5 | Mongodb | 61 | Silver |
| 6 | Spotify | 61 | Silver |
| 7 | Supabase | 61 | Silver |
| 8 | Agenthermes | 55 | Bronze |
| 9 | Deno | 55 | Bronze |
| 10 | Stripe | 55 | Bronze |
| 11 | Resend | 54 | Bronze |
| 12 | Sendgrid | 54 | Bronze |
| 13 | Twilio | 54 | Bronze |
| 14 | Notion | 51 | Bronze |
| 15 | Segment | 51 | Bronze |
| 16 | Twitch | 51 | Bronze |
| 17 | Braintreepayments | 50 | Bronze |
| 18 | Grafana | 50 | Bronze |
| 19 | Make | 50 | Bronze |
| 20 | Openai | 50 | Bronze |

## Actions Taken

1. **JarvisSDK stale score fixed** -- manually updated DB from 82 Gold to 29 Unaudited (scan timed out at 60s, so DB had stale pre-recalibration data)
2. **PureUSPeptide rescanned** -- dropped from 55 Silver to 28 Unaudited (out of top 30)
3. **All 20 target domains rescanned** with fresh v2 scanner weights

## Validation Tests (Final)

| # | Test | Result | Details |
|---|------|--------|---------|
| 1 | Stripe in top 5 (score 65+) | FAIL | Stripe is #10 with score 55. Needs 65+ to reach top 5. |
| 2 | No internal project outranks Stripe/GitHub/OpenAI | FAIL | ThePeptideAI (#3, 64 Silver) outranks Stripe (55) and OpenAI (50). AgentHermes (#8, 55) outranks OpenAI (50). |
| 3 | Top 10 should be recognizable tech companies | FAIL | ThePeptideAI (#3) and AgentHermes (#8) are internal projects in top 10. |
| 4 | Average top 20 score in 50-70 range | PASS | Leaderboard top 20 average is 56.1 |
| 5 | AgentHermes NOT in top 5 | PASS | AgentHermes is #8 |

**3 of 5 validation tests still FAIL.** (Improved from initial state: JarvisSDK #1 at 82 Gold removed.)

## Internal Projects in Leaderboard (full audit)

| Rank | Name | Score | Tier | Concern |
|------|------|-------|------|---------|
| 3 | Thepeptideai | 64 | Silver | Outranks Stripe, GitHub, OpenAI |
| 8 | Agenthermes | 55 | Bronze | Outranks OpenAI |
| 47 | Dropclose | 38 | Unaudited | OK (low enough) |
| 56 | Calltwin | 37 | Unaudited | OK |
| 63 | AffixedAI | 35 | Bronze | OK |
| 65 | Builtmonthly | 34 | Unaudited | OK |
| 73 | Codeitright | 33 | Unaudited | OK |
| 89 | JarvisSDK | 29 | Unaudited | FIXED (was 82 Gold) |
| 92 | Pureuspeptide | 28 | Unaudited | FIXED (was 55 Silver) |

## Root Causes (Remaining Issues)

### Stripe at 55 Bronze is too low
- Stripe's API is auth-gated. External-only probing can't see its quality.
- The scanner gives partial credit for auth-protected endpoints (D6 up to 70), but Stripe's D2 (API Quality) score suffers because the scanner can't exercise the actual API.
- Stripe has excellent public docs and OpenAPI specs, but the scanner may not be fully crediting documentation depth.
- **Fix needed**: Enhance scanner to better credit companies with published OpenAPI specs, extensive SDK ecosystems, and deep developer documentation. A company with 300+ documented API endpoints and 7+ official SDKs should score higher on D2/D9 even without auth-free access.

### ThePeptideAI at 64 outranking Stripe
- ThePeptideAI is a Next.js app with working API routes that return proper JSON, good headers, and valid TLS.
- Its APIs are unauthenticated and fully probeable, which gives it full D2/D6/D7/D8 credit.
- This is a real scanner limitation: a simple site with open endpoints can outscore a world-class auth-gated API.
- **Fix needed**: Same as above -- auth-gated API quality signals need more weight.

### AgentHermes at 55 outranking OpenAI (50)
- AgentHermes has MCP server, A2A protocol, agent card, and llms.txt -- all earning agent-native bonus (up to 7 pts).
- OpenAI has none of these agent-native features yet.
- This is working as designed (agent-native bonus), but Stripe/OpenAI should have higher base scores.

## Fixes Still Needed (Priority Order)

1. **HIGH**: Boost scoring for auth-gated APIs with public OpenAPI specs and deep documentation (affects Stripe, GitHub, OpenAI, Anthropic, Cloudflare, AWS)
2. **MEDIUM**: Consider a documentation-depth signal in D1/D9 that measures number of documented endpoints, SDK count, example code coverage
3. **LOW**: ThePeptideAI score is technically legitimate but optically bad; fixing #1 will solve this by pushing enterprise APIs above it
