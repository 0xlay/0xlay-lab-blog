import type { ComponentType } from 'react'
import { Mail, Rss } from 'lucide-react'
import { SOCIAL } from '@/lib/data/social'
import type { SocialLink } from '@/lib/types'
import { GitHubIcon, TikTokIcon, TwitchIcon, XIcon, YouTubeIcon } from './BrandIcons'

const BRAND_ICONS: Partial<Record<SocialLink['id'], ComponentType<{ size?: number }>>> = {
  github: GitHubIcon,
  x: XIcon,
  youtube: YouTubeIcon,
  twitch: TwitchIcon,
  tiktok: TikTokIcon,
}

function Glyph({ id, size }: { id: SocialLink['id']; size: number }) {
  const Brand = BRAND_ICONS[id]
  // Filled brand marks read a shade heavier than lucide's 1.75 stroke, so they
  // sit a pixel smaller to match its optical weight in the same row.
  if (Brand) return <Brand size={size - 1} />
  const Stroked = id === 'rss' ? Rss : Mail
  return <Stroked size={size} strokeWidth={1.75} aria-hidden="true" />
}

/** Routes and mailto: stay in-tab; everything else is somebody else's site. */
const isExternal = (href: string) => href.startsWith('http')

export function SocialLinks({ size = 16 }: { size?: number }) {
  return (
    <div className="oxl-social-row">
      {SOCIAL.map((link) => (
        <a
          key={link.id}
          href={link.href}
          aria-label={link.label}
          className="oxl-social"
          {...(isExternal(link.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <Glyph id={link.id} size={size} />
        </a>
      ))}
    </div>
  )
}
