import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { getPosts, getTags } from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags] = await Promise.all([getPosts(), getTags()])
  const newest = posts[0]?.date ?? new Date().toISOString().slice(0, 10)

  return [
    { url: `${SITE.url}/`, lastModified: newest },
    { url: `${SITE.url}/posts/`, lastModified: newest },
    { url: `${SITE.url}/projects/`, lastModified: newest },
    { url: `${SITE.url}/gear/`, lastModified: newest },
    { url: `${SITE.url}/about/`, lastModified: newest },
    ...posts.map((post) => ({
      url: `${SITE.url}/posts/${post.slug}/`,
      lastModified: post.date,
    })),
    ...tags.map((tag) => ({
      url: `${SITE.url}/tags/${tag.name}/`,
      lastModified: newest,
    })),
  ]
}
