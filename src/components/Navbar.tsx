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
  { href: '/for/lawn-care', label: 'Lawn Care' },
  { href: '/for/saas', label: 'SaaS' },
  { href: '/for/ecommerce', label: 'E-commerce' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [businessOpen, setBusinessOpen] = useState(false)
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    setMobileBusinessOpen(false)
  }, [])

  // Track scroll position for border/shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isBusinessActive = pathname?.startsWith('/for/')

  return (
    <nav
      className={clsx(
        'sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-md transition-shadow duration-300',
        scrolled
          ? 'border-b border-zinc-700/60 shadow-lg shadow-black/20'
          : 'border-b border-zinc-800/80'
      )}
    >
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
                      ? 'text-emerald-400 bg-emerald-500/10'
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
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                )}
                aria-expanded={businessOpen}
                aria-haspopup="true"
              >
                <Building2 className="h-4 w-4" />
                For Business
                <ChevronDown
                  className={clsx(
                    'h-3.5 w-3.5 transition-transform duration-200',
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
                  <div className="py-1">
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
                  <div className="border-t border-zinc-800/80 pt-1">
                    <Link
                      href="/discover"
                      onClick={() => setBusinessOpen(false)}
                      className="block px-3 py-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-zinc-800/60 transition-colors"
                    >
                      All Verticals &rarr;
                    </Link>
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

      {/* Mobile menu — slide-in overlay */}
      {/* Backdrop */}
      <div
        className={clsx(
          'lg:hidden fixed inset-0 top-16 z-40 bg-black/60 transition-opacity duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        id="mobile-nav-menu"
        className={clsx(
          'lg:hidden fixed top-16 right-0 bottom-0 z-50 w-[min(320px,85vw)] bg-[#09090b] border-l border-zinc-800/80 transition-transform duration-300 ease-out overflow-y-auto',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="px-4 py-5 space-y-1">
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
                  'flex items-center gap-2.5 px-3 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px]',
                  isActive
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}

          {/* Mobile: For Business accordion */}
          <button
            type="button"
            onClick={() => setMobileBusinessOpen(!mobileBusinessOpen)}
            className={clsx(
              'flex items-center gap-2.5 w-full px-3 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px]',
              isBusinessActive
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            )}
          >
            <Building2 className="h-4 w-4" />
            For Business
            <ChevronDown
              className={clsx(
                'h-3.5 w-3.5 ml-auto transition-transform duration-200',
                mobileBusinessOpen && 'rotate-180'
              )}
            />
          </button>

          {/* Accordion content with smooth height animation */}
          <div
            className={clsx(
              'overflow-hidden transition-all duration-300 ease-out',
              mobileBusinessOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="pl-6 space-y-1 pt-1 pb-2">
              {businessVerticals.map((v) => {
                const isVerticalActive = pathname === v.href
                return (
                  <Link
                    key={v.href}
                    href={v.href}
                    onClick={closeMobile}
                    className={clsx(
                      'block px-3 py-2.5 rounded-lg text-sm transition-colors min-h-[44px] flex items-center',
                      isVerticalActive
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                    )}
                  >
                    {v.label}
                  </Link>
                )
              })}
              <Link
                href="/discover"
                onClick={closeMobile}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-zinc-800/40 transition-colors min-h-[44px] flex items-center"
              >
                All Verticals &rarr;
              </Link>
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-zinc-800/80 space-y-1">
            <Link
              href="/login"
              onClick={closeMobile}
              className="flex items-center gap-2.5 px-3 py-3 rounded-lg border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-colors min-h-[44px]"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={closeMobile}
              className="flex items-center gap-2.5 px-3 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors min-h-[44px]"
            >
              <UserPlus className="h-4 w-4" />
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
