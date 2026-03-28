import { getServiceClient } from '@/lib/supabase'

/**
 * Log an error to the error_log table in Supabase.
 * Fire-and-forget — never blocks the response or throws.
 */
export function logError(
  route: string,
  method: string,
  error: Error,
  requestId?: string
): void {
  try {
    const supabase = getServiceClient()
    supabase
      .from('error_log')
      .insert({
        route,
        method,
        error_message: error.message,
        error_code: (error as any).code || null,
        request_id: requestId || null,
      } as any)
      .then(() => {})
  } catch {
    // Silently fail — error logging must never crash the app
  }
}
