import { notFound } from 'next/navigation'
import { getPostMeta, getPosts } from '@/lib/content'
import { renderOgImage } from '@/lib/og'

type Context = { params: { slug: string } }

// Static export has no request to react to, so every card has to be named up
// front. Reading the same getPosts() as the post routes keeps the two in step.
export async function generateStaticParams() {
  const posts = await getPosts()
  // See the matching comment in posts/[slug]/page.tsx: an empty array here
  // fails a static export build in Next 14.2.35 (vercel/next.js#71862).
  if (posts.length === 0) return [{ slug: '__none__' }]
  return posts.map((p) => ({ slug: p.slug }))
}

export async function GET(_request: Request, { params }: Context) {
  const post = await getPostMeta(params.slug)
  if (!post) notFound()

  return renderOgImage({
    hex: post.hex,
    label: post.tags[0],
    title: post.title,
    footnote: `${post.date} · ${post.readTime}`,
  })
}
