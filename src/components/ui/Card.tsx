import type { ReactNode } from 'react'

type CardProps = {
  /** hover affordance without a destination; `href` turns this on by itself */
  interactive?: boolean
  children: ReactNode
  /** extra classes for the card surface, e.g. a layout modifier */
  className?: string
  /**
   * Renders the card as a link rather than a div. This replaced an onClick that
   * called window.open from a plain div: that version could not be reached by
   * keyboard, could not be middle-clicked or opened in a new tab, was invisible
   * to crawlers, and forced every consumer to become a client component.
   *
   * A plain anchor, deliberately. Importing next/link here would pull the
   * router into /about, /gear and /projects, which cost 8.7 kB each for a
   * feature none of them use. PostCard is the one caller that wants soft
   * navigation and builds its own shell with cardClass to get it.
   */
  href?: string
}

/** Routes stay in-tab; an absolute URL is somebody else's site. */
const isExternal = (href: string) => href.startsWith('http')

/** Shared so a caller that has to build the shell itself cannot drift from it. */
export function cardClass(interactive?: boolean, extra?: string) {
  return ['oxl-card', interactive ? 'oxl-card-hover' : '', extra ?? '']
    .filter(Boolean)
    .join(' ')
}

export function Card({ interactive, children, className, href }: CardProps) {
  const combined = cardClass(interactive || !!href, className)

  if (!href) {
    return <div className={combined}>{children}</div>
  }

  if (isExternal(href)) {
    return (
      <a className={combined} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return <a className={combined} href={href}>{children}</a>
}
