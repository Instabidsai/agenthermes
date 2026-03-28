'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'

interface ScanResult {
  score: number
  tier: string
}

export function RequestScanButton({ domain }: { domain: string }) {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleScan = async () => {
    setScanning(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/v1/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: `https://${domain}` }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => null)
        throw new Error(errData?.error || `Scan failed (${res.status})`)
      }

      const data = await res.json()
      setResult({ score: data.total_score, tier: data.tier })

      // Reload the page after a short delay so the server component picks up new data
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed')
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={handleScan}
        disabled={scanning}
        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800/60 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RefreshCw
          className={`h-3 w-3 ${scanning ? 'animate-spin' : ''}`}
        />
        {scanning ? 'Scanning...' : 'Re-scan'}
      </button>

      {result && (
        <span className="rounded-md bg-emerald-900/40 border border-emerald-700/50 px-2.5 py-1 text-xs text-emerald-400 font-medium animate-in fade-in">
          Score: {result.score} ({result.tier})
        </span>
      )}

      {error && (
        <span className="rounded-md bg-red-900/40 border border-red-700/50 px-2.5 py-1 text-xs text-red-400 font-medium">
          {error}
        </span>
      )}
    </div>
  )
}
