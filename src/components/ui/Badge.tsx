type BadgeTone = 'neutral' | 'accent' | 'ok' | 'warn' | 'danger' | 'info'

type BadgeProps = {
  tone?: BadgeTone
  children: React.ReactNode
}

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`oxl-badge oxl-badge-${tone}`}>{children}</span>
}
