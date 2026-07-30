import { render, screen } from '@testing-library/react'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { SOCIAL } from '@/lib/data/social'

describe('SocialLinks', () => {
  it('renders one link per entry', () => {
    render(<SocialLinks />)
    expect(screen.getAllByRole('link')).toHaveLength(SOCIAL.length)
  })

  it('gives every icon-only link an accessible name and the right href', () => {
    render(<SocialLinks />)
    for (const { label, href } of SOCIAL) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
  })

  it('opens third-party profiles in a new tab without leaking the opener', () => {
    render(<SocialLinks />)
    const twitch = screen.getByRole('link', { name: 'Twitch' })
    expect(twitch).toHaveAttribute('target', '_blank')
    expect(twitch).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('keeps the feed and mailto links in the same tab', () => {
    render(<SocialLinks />)
    for (const name of ['RSS feed', 'Email']) {
      const link = screen.getByRole('link', { name })
      expect(link).not.toHaveAttribute('target')
      expect(link).not.toHaveAttribute('rel')
    }
  })
})
