# AgentHermes — AI Agent Instructions

## Quick Start
- `npm run dev` starts on port 3013
- `npx next build` for production build
- Supabase project: jcuwzyjdpjmpxpsawudf

## Architecture
- Next.js 16 App Router + TypeScript + Tailwind
- Supabase for database (service client at src/lib/supabase.ts)
- All API routes in src/app/api/
- Shared helpers in src/lib/

## Key Patterns
- Use getServiceClient() for server-side Supabase access
- Use requireAuth() from src/lib/auth.ts on protected endpoints
- Use rateLimit() from src/lib/auth.ts on expensive operations
- Cast Supabase results as `Record<string, any>` (untyped client)
- All routes return { error: 'message' } on failure

## Testing
- `npx next build` must pass (zero TypeScript errors)
- Test API routes with curl
- All financial endpoints require Bearer token auth

## Don't
- Don't use verify_jwt=true in Supabase
- Don't expose owner_email or stripe_connect_id in public API responses
- Don't use raw error messages in API responses (sanitize them)
