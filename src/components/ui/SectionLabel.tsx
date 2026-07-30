type SectionLabelProps = {
  hex?: string
  children: React.ReactNode
  /** spacing comes from the block that owns the label, never from the label */
  className?: string
}

export function SectionLabel({ hex, children, className }: SectionLabelProps) {
  return (
    <div className={className ? `oxl-label ${className}` : 'oxl-label'}>
      {hex ? <span>{hex} /</span> : null}
      <span className="oxl-label-text">{children}</span>
    </div>
  )
}
