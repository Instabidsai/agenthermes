import Link from 'next/link'
import { Shield, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 mb-6">
          <Shield className="h-8 w-8 text-zinc-500" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-zinc-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors"
          >
            <Search className="h-4 w-4" />
            Discover Businesses
          </Link>
        </div>
      </div>
    </div>
  )
}
