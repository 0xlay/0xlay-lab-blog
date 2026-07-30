import { render, screen } from '@testing-library/react'
import { ProjectGrid } from '@/components/sections/ProjectGrid'
import type { Project } from '@/lib/types'

const PROJECTS: Project[] = [
  {
    slug: 'tracepoint',
    hex: '0x00',
    name: 'tracepoint',
    desc: 'Minimal syscall tracer.',
    lang: 'C++',
    status: 'stable',
    statusTone: 'ok',
    url: 'https://github.com/0xlay/tracepoint',
  },
  {
    slug: 'pcb-bench',
    hex: '0x01',
    name: 'pcb-bench',
    desc: 'Open hardware test bench.',
    lang: 'KiCad',
    status: 'wip',
    statusTone: 'warn',
  },
]

// This card used to be a div with onClick={() => window.open(...)}: unreachable
// by keyboard, impossible to middle-click, and invisible to a crawler.
describe('ProjectGrid', () => {
  it('renders a project with a url as a real link', () => {
    render(<ProjectGrid projects={PROJECTS} />)
    const link = screen.getByRole('link', { name: /tracepoint/ })
    expect(link).toHaveAttribute('href', 'https://github.com/0xlay/tracepoint')
  })

  it('opens third-party repos in a new tab without leaking the opener', () => {
    render(<ProjectGrid projects={PROJECTS} />)
    const link = screen.getByRole('link', { name: /tracepoint/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('leaves a project with no url as a plain card', () => {
    render(<ProjectGrid projects={PROJECTS} />)
    expect(screen.getAllByRole('link')).toHaveLength(1)
    expect(screen.getByText('pcb-bench')).toBeInTheDocument()
  })

  it('only offers the hover affordance where there is somewhere to go', () => {
    render(<ProjectGrid projects={PROJECTS} />)
    expect(screen.getByRole('link', { name: /tracepoint/ })).toHaveClass('oxl-card-hover')
    expect(screen.getByText('pcb-bench').closest('.oxl-card')).not.toHaveClass('oxl-card-hover')
  })
})
