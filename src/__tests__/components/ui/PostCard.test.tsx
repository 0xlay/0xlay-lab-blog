import { render, screen } from '@testing-library/react'
import { PostCard } from '@/components/ui/PostCard'

describe('PostCard', () => {
  const props = {
    hex: '0x0C',
    title: 'Walking the Windows kernel',
    excerpt: 'A deep dive into KPCR.',
    date: '2026-03-14',
    readTime: '14 min',
    tags: ['windows', 'internals'],
  }

  it('renders title and excerpt', () => {
    render(<PostCard {...props} />)
    expect(screen.getByText('Walking the Windows kernel')).toBeInTheDocument()
    expect(screen.getByText('A deep dive into KPCR.')).toBeInTheDocument()
  })

  it('renders hex index', () => {
    render(<PostCard {...props} />)
    expect(screen.getByText('0x0C')).toBeInTheDocument()
  })

  it('renders all tags as badges', () => {
    render(<PostCard {...props} />)
    expect(screen.getByText('windows')).toBeInTheDocument()
    expect(screen.getByText('internals')).toBeInTheDocument()
  })

  it('renders as a plain card when given no href', () => {
    render(<PostCard {...props} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('makes the whole card the link when given an href', () => {
    render(<PostCard {...props} href="/posts/kpcr" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/posts/kpcr')
    // The title lives inside the anchor rather than beside it, so the click
    // target is the card and not just the heading.
    expect(link).toContainElement(screen.getByText('Walking the Windows kernel'))
  })

  it('takes the hover affordance when it is a link', () => {
    render(<PostCard {...props} href="/posts/kpcr" />)
    expect(screen.getByRole('link')).toHaveClass('oxl-card', 'oxl-card-hover')
  })
})
