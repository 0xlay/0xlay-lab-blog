import fs from 'node:fs/promises'
import path from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { SITE } from './site'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

/**
 * Rendered with satori and resvg directly rather than through next/og.
 *
 * next/og bundles a copy of @vercel/og whose module-level setup calls
 * path.join on an import.meta.url. On Windows that turns "file:///P:/..."
 * into "file:\P:\...", which is not a URL, and every card fails to prerender
 * with "TypeError: Invalid URL". The bug is in code that runs on import, so
 * there is nothing to work around from here. Going one layer down uses the same
 * two libraries next/og wraps and behaves the same on Windows and on the Linux
 * runner that builds the deploy.
 *
 * The Next file convention still applies: these routes live at
 * opengraph-image.tsx, so Next writes the og:image tags itself and nothing has
 * to name the URLs a second time.
 */
const FONT_DIR = path.join(process.cwd(), 'assets', 'og-fonts')

/**
 * Static instances, and kept out of public/. satori cannot read WOFF2, which is
 * the only format the site serves, and it takes a single weight per face rather
 * than a variable axis. These are build inputs, like the MDX sources.
 */
async function loadFonts() {
  const [display, mono] = await Promise.all([
    fs.readFile(path.join(FONT_DIR, 'Manrope-800.ttf')),
    fs.readFile(path.join(FONT_DIR, 'GoogleSansCode-500.ttf')),
  ])
  return [
    { name: 'Manrope', data: display, weight: 800 as const, style: 'normal' as const },
    { name: 'GoogleSansCode', data: mono, weight: 500 as const, style: 'normal' as const },
  ]
}

// Literal values because satori resolves no custom properties. These are
// --bg-page, --text-strong, --text-muted, --green and --cyan from the dark
// theme, which is the one that reads on a timeline.
const SLATE = '#14181d'
const INK = '#f2f6fa'
const MUTED = '#8e9cab'
const GREEN = '#2bd96b'
const CYAN = '#29c4f2'

type CardProps = {
  /** the marker, kept in the casing it was authored in */
  hex: string
  /** the overline beside it; uppercased, as SectionLabel does on the site */
  label: string
  title: string
  /** optional third line, used for the post date and read time */
  footnote?: string
}

function Card({ hex, label, title, footnote }: CardProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: SLATE,
        padding: '72px 80px',
        fontFamily: 'GoogleSansCode',
      }}
    >
      {/* the circuit gradient, as a rule rather than a wash */}
      <div style={{ display: 'flex', height: 6, width: 220, background: `linear-gradient(90deg, ${GREEN}, ${CYAN})` }} />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 26, color: GREEN, letterSpacing: 3 }}>
          {`${hex} / ${label.toUpperCase()}`}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontFamily: 'Manrope',
            // Long titles would otherwise run past the footer rule.
            fontSize: title.length > 58 ? 58 : 72,
            lineHeight: 1.12,
            letterSpacing: -1.5,
            color: INK,
          }}
        >
          {title}
        </div>
        {footnote ? (
          <div style={{ display: 'flex', marginTop: 28, fontSize: 26, color: MUTED }}>{footnote}</div>
        ) : null}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: MUTED }}>
        <span style={{ color: INK }}>{SITE.title}</span>
        <span>{SITE.url.replace('https://', '')}</span>
      </div>
    </div>
  )
}

/** Both opengraph-image routes render this and nothing else. */
export async function renderOgImage(props: CardProps): Promise<Response> {
  const svg = await satori(<Card {...props} />, { ...OG_SIZE, fonts: await loadFonts() })
  const png = new Resvg(svg, { fitTo: { mode: 'original' } }).render().asPng()

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': OG_CONTENT_TYPE,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
