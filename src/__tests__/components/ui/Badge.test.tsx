import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/Badge'

// These used to assert on span.style, back when the tone was an inline object.
// The tones now live in src/styles/components/marks.css, so the contract worth
// testing is the class the component picks, not a colour it no longer writes.
describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>windows</Badge>)
    expect(screen.getByText('windows')).toBeInTheDocument()
  })

  it('applies the requested tone', () => {
    render(<Badge tone="accent">stable</Badge>)
    expect(screen.getByText('stable')).toHaveClass('oxl-badge', 'oxl-badge-accent')
  })

  it('defaults to the neutral tone', () => {
    render(<Badge>tag</Badge>)
    expect(screen.getByText('tag')).toHaveClass('oxl-badge', 'oxl-badge-neutral')
  })
})
