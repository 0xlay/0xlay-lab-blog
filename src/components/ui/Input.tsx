import type { CSSProperties, InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  mono?: boolean
  style?: CSSProperties
}

export function Input({ label, hint, mono, style, ...rest }: InputProps) {
  const input = <input className={`oxl-input${mono ? ' oxl-input-mono' : ''}`} {...rest} />
  if (!label && !hint) return input
  return (
    <div className="oxl-field" style={style}>
      {label ? <label>{label}</label> : null}
      {input}
      {hint ? <span className="hint">{hint}</span> : null}
    </div>
  )
}
