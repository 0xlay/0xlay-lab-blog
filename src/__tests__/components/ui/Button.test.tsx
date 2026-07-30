import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Read the blog</Button>)
    expect(screen.getByRole('button', { name: 'Read the blog' })).toBeInTheDocument()
  })

  it('applies primary class by default', () => {
    const { container } = render(<Button>ok</Button>)
    expect(container.firstChild).toHaveClass('oxl-btn-primary')
  })

  it('applies secondary class', () => {
    const { container } = render(<Button variant="secondary">ok</Button>)
    expect(container.firstChild).toHaveClass('oxl-btn-secondary')
  })

  it('calls onClick', async () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>click me</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
