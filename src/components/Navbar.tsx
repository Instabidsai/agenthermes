'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
  Shield,
  BarChart3,
  Menu,
  X,
  UserPlus,
  LogIn,
  Wrench,
  Network,
  BookOpen,
  Building2,
  ChevronDown,
  Info,
} from 'lucide-react'
import { useState, useEffect, useCallback, useRef } from 'react'

const mainNav = [
  { href: '/audit', label: 'Score', icon: BarChart3 },
  { href: '/remediate', label: 'Fix', icon: Wrench },
  { href: '/gateway', label: 'Connect', icon: Network },
  { href: '/registry', label: 'Registry', icon: BookOpen },
  { href: '/about', label: 'About', icon: Info },
]

const businessVerticals = [
  { href: '/for/restaurants', label: 'Restaurants' },
  { href: '/for/hvac', label: 'HVAC' },
  { href: '/for/saas', label: 'SaaS' },
  { href: '/for/ecommerce', label: 'E-commerce' },
  { href: '/for/dentist', label: 'Dentists' },
  { href: '/for/real-estate', label: 'Real Estate' },
  { href: '/for/law-firm', label: 'Law Firms' },
  { href: '/for/plumbing', label: 'Plumbing' },
  { href: '/for/cleaning', label: 'Cleaning' },
  { href: '/for/roofing', label: 'Roofing' },
  { href: '/for/auto-dealer', label: 'Auto Dealers' },
  { href: '/for/lawn-care', label: 'Lawn Care' },
  { href: '/for/agency', label: 'Agencies' },
  { href: '/for/accounting', label: 'Accounting' },
  { href: '/for/freelancer', label: 'Freelancers' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [businessOpen, setBusinessOpen] = useState(false)
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    setMobileBusinessOpen(false)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileOpen) closeMobile()
        if (businessOpen) setBusinessOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen, businessOpen, closeMobile])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setBusinessOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isBusinessActive = pathname?.startsWith('/for/')

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/15 transition-colors">
              <Shield className="h-[18px] w-[18px] text-emerald-500" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Agent<span className="text-emerald-500">Hermes</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNav.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname?.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-zinc-100 bg-zinc-800/80'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}

            {/* For Business dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setBusinessOpen(!businessOpen)}
                className={clsx(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                  isBusinessActive
                    ? 'text-zinc-100 bg-zinc-800/80'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                )}
                aria-expanded={businessOpen}
                aria-haspopup="true"
              >
                <Building2 className="h-4 w-4" />
                For Business
                <ChevronDown
                  className={clsx(
                    'h-3.5 w-3.5 transition-transform',
                    businessOpen && 'rotate-180'
                  )}
                />
              </button>

              {businessOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl shadow-black/40 py-2 z-50">
                  <div className="px-3 py-2 border-b border-zinc-800/80">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Industries
                    </p>
                  </div>
                  <div className="max-h-80 overflow-y-auto py-1">
                    {businessVerticals.map((v) => {
                      const isVerticalActive = pathname === v.href
                      return (
                        <Link
                          key={v.href}
                          href={v.href}
                          onClick={() => setBusinessOpen(false)}
                          className={clsx(
                            'block px-3 py-2 text-sm transition-colors',
                            isVerticalActive
                              ? 'text-emerald-400 bg-emerald-500/10'
                              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                          )}
                        >
                          {v.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/login"
              className="flex items-center gap-2 ml-2 px-3.5 py-2 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2.5 min-h-[44px] min-w-[44px] rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden border-t border-zinc-800/80 bg-[#09090b]"
        >
          <div className="px-4 py-3 space-y-1">
            {mainNav.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname?.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={clsx(
                    'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-zinc-100 bg-zinc-800/80'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}

            {/* Mobile: For Business expandable */}
            <button
              type="button"
              onClick={() => setMobileBusinessOpen(!mobileBusinessOpen)}
              className={clsx(
                'flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isBusinessActive
                  ? 'text-zinc-100 bg-zinc-800/80'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              )}
            >
              <Building2 className="h-4 w-4" />
              For Business
              <ChevronDown
                className={clsx(
                  'h-3.5 w-3.5 ml-auto transition-transform',
                  mobileBusinessOpen && 'rotate-180'
                )}
              />
            </button>

            {mobileBusinessOpen && (
              <div className="pl-6 space-y-1">
                {businessVerticals.map((v) => {
                  const isVerticalActive = pathname === v.href
                  return (
                    <Link
                      key={v.href}
                      href={v.href}
                      onClick={closeMobile}
                      className={clsx(
                        'block px-3 py-2 rounded-lg text-sm transition-colors',
                        isVerticalActive
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                      )}
                    >
                      {v.label}
                    </Link>
                  )
                })}
              </div>
            )}

            <div className="pt-2 border-t border-zinc-800/80 space-y-1">
              <Link
                href="/login"
                onClick={closeMobile}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={closeMobile}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
