import type { Metadata } from 'next'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'next-themes'
import { SITE } from '@/lib/site'
import { DEFAULT_OG_IMAGE } from '@/lib/metadata'
import '@/styles/globals.css'

// Faces reached by the first paint on every route: Manrope sets the headings,
// Google Sans Code sets the wordmark and the nav. Both are small. Inter is
// deliberately absent - at 341 KB it is the largest asset on the site, and
// competing with the CSS and JS for bandwidth costs more than the swap it
// avoids on body copy.
const PRELOADED_FONTS = [
  '/fonts/Manrope-Variable.woff2',
  '/fonts/GoogleSansCode-Variable.woff2',
]

const HOME_TITLE = `${SITE.title} - research & development`

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: HOME_TITLE,
  description: SITE.description,
  alternates: {
    canonical: `${SITE.url}/`,
    types: { 'application/rss+xml': `${SITE.url}/feed.xml` },
  },
  // Defaults for every route. Pages that call buildMetadata replace these
  // wholesale; the ones that do not still unfurl as the site rather than as a
  // bare link.
  openGraph: {
    type: 'website',
    title: HOME_TITLE,
    description: SITE.description,
    url: `${SITE.url}/`,
    siteName: SITE.title,
    locale: 'en_US',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: HOME_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: SITE.description,
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // App Router forbids a hand-written <head>, so the preload hints go through
  // the react-dom API that Next resolves into <link rel="preload"> during the
  // server render. crossOrigin is not optional: fonts are fetched in CORS mode,
  // and without it the browser downloads them a second time.
  for (const href of PRELOADED_FONTS) {
    ReactDOM.preload(href, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' })
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
