import { PostCard } from '@/components/ui/PostCard'
import type { PostMeta } from '@/lib/types'

export function PostGrid({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="oxl-grid oxl-grid-posts">
      {posts.map((p) => (
        // The card is the grid item and the link at once. Grid items stretch to
        // the row height by default, so equal-height cards need no wrapper and
        // no width override. The Link that used to wrap this existed only to
        // pass that height down, and it also swallowed the card's hover state.
        <PostCard
          key={p.slug}
          href={`/posts/${p.slug}`}
          hex={p.hex}
          title={p.title}
          excerpt={p.excerpt}
          date={p.date}
          readTime={p.readTime}
          tags={p.tags}
        />
      ))}
    </div>
  )
}
