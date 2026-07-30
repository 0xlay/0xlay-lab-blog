import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

describe('ThemeToggle', () => {
  it('renders toggle button with aria-label', () => {
    render(<ThemeToggle theme="light" onChange={jest.fn()} />)
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })

  it('calls onChange with dark when currently light', async () => {
    const onChange = jest.fn()
    render(<ThemeToggle theme="light" onChange={onChange} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith('dark')
  })

  it('calls onChange with light when currently dark', async () => {
    const onChange = jest.fn()
    render(<ThemeToggle theme="dark" onChange={onChange} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith('light')
  })
})
