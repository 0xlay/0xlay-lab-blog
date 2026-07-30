import { renderOgImage } from '@/lib/og'

/**
 * The site's share card, used by every page that is not a post.
 *
 * This is a route handler rather than Next's opengraph-image convention, and
 * the segment is named default.png on purpose. The convention emits a file with
 * no extension, and GitHub Pages types a file by its extension: the card would
 * be served as application/octet-stream and refused by everything that unfurls
 * links. src/app/feed.xml/route.ts works the same way and for the same reason.
 */
export function GET() {
  return renderOgImage({
    hex: '0x00',
    label: 'research & development',
    title: 'System software, taken apart and put back together.',
    footnote: 'C++ · Rust · kernel internals · malware analysis',
  })
}
