import Link from 'next/link'
import type { Tag } from '@/lib/types'

type TagNavProps = {
  tags: Tag[]
  /** the tag whose page is being rendered; absent on /posts, where "all" is active */
  active?: string
}

/**
 * The tag row above a post list. This replaced a client-side filter that held
 * the selection in useState, which meant a filtered view had no address and the
 * eleven /tags/[tag] pages had nothing linking to them. Navigation does both
 * jobs at once and needs no JavaScript.
 */
export function TagNav({ tags, active }: TagNavProps) {
  const entries = [
    { key: 'all', label: 'all', href: '/posts', isActive: !active },
    ...tags.map((tag) => ({
      key: tag.name,
      label: `${tag.name} ${tag.count}`,
      // Encoded to match the paths generateStaticParams produces; today every
      // tag is already URL-safe, but nothing enforces that in frontmatter.
      href: `/tags/${encodeURIComponent(tag.name)}`,
      isActive: tag.name === active,
    })),
  ]

  return (
    <nav aria-label="Filter posts by tag" className="oxl-tag-nav">
      {entries.map(({ key, label, href, isActive }) => (
        <Link
          key={key}
          href={href}
          aria-current={isActive ? 'page' : undefined}
          className={isActive ? 'oxl-tag-chip oxl-tag-chip-active' : 'oxl-tag-chip'}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
