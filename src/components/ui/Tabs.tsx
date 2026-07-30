'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'

type TabItem = { id: string; label: string; hex?: string }

type TabsProps = {
  items: TabItem[]
  active?: string
  onChange?: (id: string) => void
  style?: CSSProperties
}

export function Tabs({ items, active, onChange, style }: TabsProps) {
  const [internal, setInternal] = useState(items[0]?.id)
  const current = active !== undefined ? active : internal

  return (
    <div className="oxl-tabs" role="tablist" style={style}>
      {items.map((it) => (
        <button
          key={it.id}
          role="tab"
          aria-selected={current === it.id}
          className="oxl-tab"
          onClick={() => {
            if (onChange) onChange(it.id)
            if (active === undefined) setInternal(it.id)
          }}
        >
          {it.hex ? <span className="n">{it.hex}</span> : null}
          {it.label}
        </button>
      ))}
    </div>
  )
}
