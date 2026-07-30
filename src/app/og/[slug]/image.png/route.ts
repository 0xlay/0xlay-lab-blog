import { notFound } from 'next/navigation'
import { getPostMeta, getPosts } from '@/lib/content'
import { renderOgImage } from '@/lib/og'

type Context = { params: { slug: string } }

// Static export has no request to react to, so every card has to be named up
// front. Reading the same getPosts() as the post routes keeps the two in step.
export async function generateStaticParams() {
  const posts = await getPosts()
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
