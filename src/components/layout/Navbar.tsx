'use client'

import { usePathname } from 'next/navigation'
import { cn }          from '@/lib/cn'
import { useNavbar }   from '@/hooks/useNavbar'
import { Logo, Button } from '@/components/ui'
import { NavDesktop }   from './NavDesktop'
import { NavMobile }    from './NavMobile'
import type { NavItem, NavCTA } from '@/types'

// ── Config ──────────────────────────────────────────────────────
// Add / remove links here — no other file needs to change.
const NAV_ITEMS: NavItem[] = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Services',     href: '/services' },
  { label: 'Reports',      href: '/reports' },
  { label: 'Pricing',      href: '/pricing' },
  { label: 'For business', href: '/business' },
]

const NAV_CTAS: NavCTA[] = [
  { label: 'Log in',           href: '/login',   variant: 'ghost'   },
  { label: 'Get started free', href: '/signup',  variant: 'primary' },
]

/**
 * Navbar
 * ───────
 * Sticky top bar, client component (needs scroll + pathname).
 * Uses CSS backdrop-blur + transition for the scrolled glass effect.
 *
 * API integration:
 *   If auth is implemented, swap the static CTAs for
 *   a <UserMenu> component that reads from useAuth() hook.
 */
export function Navbar() {
  const pathname = usePathname()
  const { scrolled, mobileOpen, toggleMobile, closeMobile } = useNavbar()

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-30 h-[60px]',
          'flex items-center',
          'transition-all duration-300',
          scrolled
            ? 'bg-[rgba(10,14,26,0.92)] backdrop-blur-[12px] border-b border-white/[0.08] shadow-[0_1px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        )}
      >
        <div className="w-full  px-5 sm:px-8 flex items-center gap-4">

          {/* Brand */}
          <Logo className="shrink-0" />

          {/* Desktop links (centred) */}
          <div className="flex-1 flex justify-center">
            <NavDesktop items={NAV_ITEMS} currentPath={pathname} />
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {NAV_CTAS.map(cta => (
              <Button
                key={cta.href}
                as="a"
                href={cta.href}
                variant={cta.variant}
                size="md"
              >
                {cta.label}
              </Button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className={cn(
              'md:hidden ml-auto flex flex-col items-center justify-center gap-[5px]',
              'w-9 h-9 rounded-md shrink-0',
              'border border-white/[0.08] hover:border-white/[0.18]',
              'text-[#A8B8D8] hover:text-[#E8F0FF]',
              'transition-colors duration-150'
            )}
          >
            {/* Animated hamburger lines */}
            <span
              className={cn(
                'block h-[1.5px] w-5 bg-current rounded-full transition-all duration-200',
                mobileOpen && 'translate-y-[6.5px] rotate-45'
              )}
            />
            <span
              className={cn(
                'block h-[1.5px] w-5 bg-current rounded-full transition-all duration-200',
                mobileOpen && 'opacity-0 scale-x-0'
              )}
            />
            <span
              className={cn(
                'block h-[1.5px] w-5 bg-current rounded-full transition-all duration-200',
                mobileOpen && '-translate-y-[6.5px] -rotate-45'
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <NavMobile
        isOpen={mobileOpen}
        onClose={closeMobile}
        items={NAV_ITEMS}
        ctas={NAV_CTAS}
        currentPath={pathname}
      />
    </>
  )
}
