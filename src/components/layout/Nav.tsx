'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Wordmark } from '@/components/ui/Wordmark'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useTheme } from 'next-themes'

const NAV_ITEMS = [
  { href: '/', label: '~/' },
  { href: '/posts', label: 'posts' },
  { href: '/projects', label: 'projects' },
  { href: '/gear', label: 'gear' },
  { href: '/about', label: 'about' },
]

export function Nav() {
  // Layouts survive client-side navigation, so a pathname threaded down as a
  // prop would freeze at whatever the first server render saw. This hook is
  // the only source that stays in step with soft navigation.
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  // The server has no way to know the stored theme, so it always renders the
  // light-theme icon. Reading resolvedTheme before mount would make the first
  // client render disagree with that HTML and blow up hydration.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="oxl-nav">
      <div className="oxl-nav-inner">
        <Link href="/" className="oxl-nav-brand" aria-label="0xlay.lab, home">
          <Wordmark size={19} />
        </Link>
        <nav className="oxl-nav-links">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={isActive ? 'oxl-nav-link oxl-nav-link-active' : 'oxl-nav-link'}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <ThemeToggle
          theme={mounted ? ((resolvedTheme as 'light' | 'dark') ?? 'light') : 'light'}
          onChange={(t) => setTheme(t)}
        />
      </div>
    </header>
  )
}
