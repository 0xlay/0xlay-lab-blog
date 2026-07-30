import { buildMetadata, postOgImage, DEFAULT_OG_IMAGE } from '@/lib/metadata'
import { SITE } from '@/lib/site'

describe('buildMetadata', () => {
  const page = buildMetadata({
    title: 'Gear',
    description: 'What I work with.',
    path: '/gear/',
  })

  it('appends the site name to the page title', () => {
    expect(page.title).toBe(`Gear - ${SITE.title}`)
  })

  it('sets an absolute canonical URL', () => {
    expect(page.alternates?.canonical).toBe(`${SITE.url}/gear/`)
  })

  it('carries the page description into og and twitter rather than the site one', () => {
    expect(page.description).toBe('What I work with.')
    expect(page.openGraph?.description).toBe('What I work with.')
    expect(page.twitter?.description).toBe('What I work with.')
    expect(page.description).not.toBe(SITE.description)
  })

  it('requests a large summary card so the image is not cropped to a thumbnail', () => {
    expect(page.twitter?.card).toBe('summary_large_image')
  })

  it('falls back to the site-wide share image', () => {
    expect(JSON.stringify(page.openGraph?.images)).toContain(DEFAULT_OG_IMAGE)
  })

  it('marks a post as an article and takes its own card', () => {
    const post = buildMetadata({
      title: 'Walking the Windows kernel',
      description: 'KPCR, in detail.',
      path: '/posts/kpcr/',
      article: { publishedTime: '2026-03-14', tags: ['windows', 'internals'] },
      image: postOgImage('kpcr'),
    })

    expect(post.openGraph).toMatchObject({ type: 'article', publishedTime: '2026-03-14' })
    expect(JSON.stringify(post.openGraph?.images)).toContain('/og/kpcr/image.png')
  })
})
