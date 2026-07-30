import type { CSSProperties } from 'react'

type WordmarkProps = {
  size?: number
  suffix?: string
}

export function Wordmark({ size = 20, suffix = 'lay.lab' }: WordmarkProps) {
  // The size is a genuine per-instance value (19 in the nav, 15 in the footer,
  // 22 on the not-found page), so it reaches CSS as a custom property rather
  // than as three near-identical classes.
  return (
    <span className="oxl-wordmark" style={{ '--wordmark-size': `${size}px` } as CSSProperties}>
      <span className="oxl-wordmark-prefix">0x</span>
      {suffix}
    </span>
  )
}
