import type { ReactNode } from 'react'

/** The centred container every page sits in. Owns the responsive side padding. */
export function PageShell({ children }: { children: ReactNode }) {
  return <div className="oxl-shell">{children}</div>
}
