'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Globe, ArrowRight } from 'lucide-react'

export default function HeroScanForm() {
  const [domain, setDomain] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned = domain.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    if (!cleaned) return
    router.push(`/audit?domain=${encodeURIComponent(cleaned)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <input
            type="text"
            placeholder="yourbusiness.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full pl-12 pr-4 py-4 sm:py-5 rounded-xl bg-zinc-900/80 border border-zinc-700 text-base sm:text-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={!domain.trim()}
          className="px-8 py-4 sm:py-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-emerald-500 text-white font-bold text-base sm:text-lg transition-colors flex items-center justify-center gap-2 flex-shrink-0"
        >
          Scan Now — Free
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}
