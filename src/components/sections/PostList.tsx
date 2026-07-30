import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import type { PostMeta } from '@/lib/types'

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="oxl-post-list-empty">nothing here yet - 0 results</p>
  }

  return (
    <div className="oxl-post-list">
      {posts.map((p) => (
        <Link key={p.slug} href={`/posts/${p.slug}`} className="oxl-post-list-row">
          <span className="oxl-post-list-hex">{p.hex}</span>
          <div className="oxl-post-list-main">
            <div className="oxl-post-list-title">{p.title}</div>
            <div className="oxl-post-list-meta">
              <span>{p.date} · {p.readTime}</span>
              {/* Inert: the whole row is the link, so linking these too would
                  nest anchors. The TagNav above the list does that job. */}
              <div className="oxl-post-list-tags">
                {p.tags.map((t) => <Badge key={t} tone="neutral">{t}</Badge>)}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
