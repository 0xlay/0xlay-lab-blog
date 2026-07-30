import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
}

export function Button({ variant = 'primary', size = 'md', icon, children, className = '', ...rest }: ButtonProps) {
  return (
    <button
      className={`oxl-btn oxl-btn-${size} oxl-btn-${variant} ${className}`.trim()}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
}
