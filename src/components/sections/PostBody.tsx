import type { ReactNode } from 'react'

/**
 * The prose wrapper for compiled MDX. Everything inside is styled by descendant
 * selector from .oxl-prose, so mdx-components only has to cover the nodes that
 * need a wrapper rather than restating every element's type styles.
 */
export function PostBody({ children }: { children: ReactNode }) {
  return <div className="oxl-prose">{children}</div>
}
