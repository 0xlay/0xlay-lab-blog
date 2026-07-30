'use client'

import { useState } from 'react'

type SwitchProps = {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
}

export function Switch({ checked, onChange, disabled, label }: SwitchProps) {
  const [internal, setInternal] = useState(false)
  const on = checked !== undefined ? checked : internal

  const toggle = () => {
    if (disabled) return
    if (onChange) onChange(!on)
    if (checked === undefined) setInternal(!on)
  }

  // The on/off styling hangs off aria-checked rather than a second class, so
  // the visual state cannot drift from the state assistive tech is told about.
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={toggle}
      className="oxl-switch"
    >
      <span className="oxl-switch-track">
        <span className="oxl-switch-thumb" />
      </span>
      {label ? <span>{label}</span> : null}
    </button>
  )
}
