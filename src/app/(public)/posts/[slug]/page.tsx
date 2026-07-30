import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Badge } from '@/components/ui/Badge'
import { PostBody } from '@/components/sections/PostBody'
import { PageShell } from '@/components/layout/PageShell'
import { getPost, getPostMeta, getPosts } from '@/lib/content'
import { buildMetadata, postOgImage } from '@/lib/metadata'
import { SITE } from '@/lib/site'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  const posts = await getPosts()
  // Next's static export treats an empty generateStaticParams array as if the
  // function were absent and fails the build (vercel/next.js#71862). A blog
  // with zero posts is a real state, so a placeholder param keeps the export
  // valid; it 404s below like any other unknown slug.
  if (posts.length === 0) return [{ slug: '__none__' }]
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const post = await getPostMeta(params.slug)
  if (!post) return { title: SITE.title }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/posts/${post.slug}/`,
    article: { publishedTime: post.date, tags: post.tags },
    image: postOgImage(post.slug),
  })
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <PageShell>
      <article className="oxl-page oxl-page-narrow">
        <Link href="/posts" className="oxl-article-back">← all posts</Link>

        <SectionLabel hex={post.hex}>{post.tags[0]}</SectionLabel>
        <h1 className="oxl-article-title">{post.title}</h1>

        <div className="oxl-article-meta">
          <span className="oxl-article-date">{post.date} · {post.readTime}</span>
          {/* Linkable here because this row is not itself inside an anchor.
              The same badges stay inert in PostList and PostCard, where the
              whole row is already a link and nesting anchors is invalid. */}
          <div className="oxl-article-tags">
            {post.tags.map((t) => (
              <Link key={t} href={`/tags/${encodeURIComponent(t)}`}>
                <Badge>{t}</Badge>
              </Link>
            ))}
          </div>
        </div>

        <hr className="oxl-article-rule" />

        <PostBody>{post.content}</PostBody>
      </article>
    </PageShell>
  )
}
