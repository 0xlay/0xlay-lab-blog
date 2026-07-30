import { act, render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { Nav } from '@/components/layout/Nav'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

let mockThemeState: { resolvedTheme?: string; setTheme: () => void } = {
  resolvedTheme: 'light',
  setTheme: jest.fn(),
}

let mockPathname = '/'

jest.mock('next-themes', () => ({
  useTheme: () => mockThemeState,
}))

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}))

afterEach(() => {
  mockThemeState = { resolvedTheme: 'light', setTheme: jest.fn() }
  mockPathname = '/'
})

describe('Nav', () => {
  it('renders wordmark link', () => {
    render(<Nav />)
    expect(screen.getByText('0x')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: /posts/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
  })

  // The active state used to be an inline colour and is now a class plus
  // aria-current. Asserting on those is also the better contract: it covers
  // what assistive tech is told, which the colour never did.
  it('highlights active route', () => {
    mockPathname = '/posts'
    render(<Nav />)
    const postsLink = screen.getByRole('link', { name: /^posts$/i })
    expect(postsLink).toHaveClass('oxl-nav-link-active')
    expect(postsLink).toHaveAttribute('aria-current', 'page')
  })

  it('marks exactly one link as the current page', () => {
    mockPathname = '/posts/kpcr'
    render(<Nav />)
    expect(screen.getAllByRole('link', { current: 'page' })).toHaveLength(1)
  })

  it('follows client-side navigation instead of freezing on the first route', () => {
    const { rerender } = render(<Nav />)
    expect(screen.getByRole('link', { name: '~/' })).toHaveClass('oxl-nav-link-active')

    mockPathname = '/posts'
    rerender(<Nav />)
    expect(screen.getByRole('link', { name: /^posts$/i })).toHaveClass('oxl-nav-link-active')

    const home = screen.getByRole('link', { name: '~/' })
    expect(home).not.toHaveClass('oxl-nav-link-active')
    expect(home).not.toHaveAttribute('aria-current')
  })

  it('hydrates without mismatch when the stored theme is dark', async () => {
    // The server never sees the stored theme, so it renders the light variant.
    mockThemeState = { resolvedTheme: undefined, setTheme: jest.fn() }
    const serverHtml = renderToString(<Nav />)

    const container = document.createElement('div')
    container.innerHTML = serverHtml
    document.body.appendChild(container)

    // On the client next-themes has already resolved the stored dark theme.
    mockThemeState = { resolvedTheme: 'dark', setTheme: jest.fn() }
    const errors: unknown[] = []
    const consoleError = jest.spyOn(console, 'error').mockImplementation((...args) => {
      errors.push(args[0])
    })

    let root: ReturnType<typeof hydrateRoot> | undefined
    await act(async () => {
      root = hydrateRoot(container, <Nav />)
    })

    consoleError.mockRestore()
    await act(async () => {
      root?.unmount()
    })
    container.remove()

    expect(errors).toEqual([])
  })
})
