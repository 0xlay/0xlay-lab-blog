import { render, screen } from '@testing-library/react'
import { TagNav } from '@/components/sections/TagNav'
import type { Tag } from '@/lib/types'

const TAGS: Tag[] = [
  { name: 'windows', count: 2 },
  { name: 'rust', count: 1 },
]

// The tag pages were generated and listed in the sitemap while nothing on the
// site linked to them. This row is what makes them reachable.
describe('TagNav', () => {
  it('links every tag to its page', () => {
    render(<TagNav tags={TAGS} />)
    expect(screen.getByRole('link', { name: /windows/ })).toHaveAttribute('href', '/tags/windows')
    expect(screen.getByRole('link', { name: /rust/ })).toHaveAttribute('href', '/tags/rust')
  })

  it('shows the post count beside each tag', () => {
    render(<TagNav tags={TAGS} />)
    expect(screen.getByRole('link', { name: 'windows 2' })).toBeInTheDocument()
  })

  it('treats "all" as current on the unfiltered list', () => {
    render(<TagNav tags={TAGS} />)
    const all = screen.getByRole('link', { name: 'all' })
    expect(all).toHaveAttribute('href', '/posts')
    expect(all).toHaveAttribute('aria-current', 'page')
  })

  it('moves the current marker onto the active tag', () => {
    render(<TagNav tags={TAGS} active="rust" />)
    expect(screen.getAllByRole('link', { current: 'page' })).toHaveLength(1)
    expect(screen.getByRole('link', { name: /rust/ })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'all' })).not.toHaveAttribute('aria-current')
  })

  it('encodes tags that would otherwise break the path', () => {
    render(<TagNav tags={[{ name: 'binary analysis', count: 1 }]} />)
    expect(screen.getByRole('link', { name: /binary analysis/ }))
      .toHaveAttribute('href', '/tags/binary%20analysis')
  })
})
