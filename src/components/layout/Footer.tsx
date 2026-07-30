import Link from 'next/link'
import { Wordmark } from '@/components/ui/Wordmark'
import { SocialLinks } from '@/components/ui/SocialLinks'

const ROUTES = ['posts', 'projects', 'gear', 'about'] as const

export function Footer() {
  return (
    <footer className="oxl-footer">
      <div className="oxl-footer-inner">
        <div className="oxl-footer-row">
          <div className="oxl-footer-brand">
            <Wordmark size={15} />
            <SocialLinks />
          </div>
          <span className="oxl-footer-meta">2021-2026 · all rights reserved</span>
          <div className="oxl-footer-links">
            {ROUTES.map((r) => (
              <Link key={r} href={`/${r}`} className="oxl-footer-link">
                {r}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
