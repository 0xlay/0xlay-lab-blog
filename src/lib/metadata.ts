import type { Metadata } from 'next'
import { SITE } from './site'

type BuildMetadataInput = {
  /** the page's own name; the site name is appended for the document title */
  title: string
  description: string
  /** absolute path with a trailing slash, matching next.config trailingSlash */
  path: string
  /** posts are articles, everything else is a page */
  article?: { publishedTime: string; tags: string[] }
  /** share card path; defaults to the site-wide one */
  image?: string
}

export const DEFAULT_OG_IMAGE = '/og/default.png'

/** Posts get their own card, drawn from the title, tag and date. */
export const postOgImage = (slug: string) => `/og/${slug}/image.png`

/**
 * One place that knows how a page describes itself to crawlers and to the
 * cards that unfurl in chat clients. Every page used to declare a title and
 * nothing else, so posts inherited the site-wide description and no page
 * carried a canonical URL or a single og: field.
 */
export function buildMetadata({
  title,
  description,
  path,
  article,
  image = DEFAULT_OG_IMAGE,
}: BuildMetadataInput): Metadata {
  const url = `${SITE.url}${path}`
  const fullTitle = `${title} - ${SITE.title}`
  const images = [{ url: image, width: 1200, height: 630, alt: fullTitle }]

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: article ? 'article' : 'website',
      title: fullTitle,
      description,
      url,
      siteName: SITE.title,
      locale: 'en_US',
      images,
      ...(article
        ? { publishedTime: article.publishedTime, tags: article.tags }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images,
    },
  }
}
