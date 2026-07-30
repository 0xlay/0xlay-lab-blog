import { notFound } from 'next/navigation'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TagNav } from '@/components/sections/TagNav'
import { PostList } from '@/components/sections/PostList'
import { PageShell } from '@/components/layout/PageShell'
import { getPosts, getTags } from '@/lib/content'
import { buildMetadata } from '@/lib/metadata'

type Props = { params: { tag: string } }

export async function generateStaticParams() {
  const tags = await getTags()
  // See the matching comment in posts/[slug]/page.tsx: an empty array here
  // fails a static export build in Next 14.2.35 (vercel/next.js#71862).
  if (tags.length === 0) return [{ tag: '__none__' }]
  return tags.map((t) => ({ tag: t.name }))
}

export async function generateMetadata({ params }: Props) {
  return buildMetadata({
    title: `#${params.tag}`,
    description: `Every post tagged ${params.tag}.`,
    path: `/tags/${encodeURIComponent(params.tag)}/`,
  })
}

export default async function TagPage({ params }: Props) {
  const [posts, tags] = await Promise.all([getPosts(), getTags()])
  const tagExists = tags.some((t) => t.name === params.tag)
  if (!tagExists) notFound()

  const filtered = posts.filter((p) => p.tags.includes(params.tag))

  return (
    <PageShell>
      <div className="oxl-page oxl-page-narrow">
        <SectionLabel>Tag</SectionLabel>
        <h1 className="oxl-page-title">#{params.tag}</h1>
        <p className="oxl-page-count">
          {filtered.length} post{filtered.length !== 1 ? 's' : ''}
        </p>
        {/* The row carries the way back to /posts, so no separate "all posts"
            link is needed beside the count. */}
        <TagNav tags={tags} active={params.tag} />
        <PostList posts={filtered} />
      </div>
    </PageShell>
  )
}
