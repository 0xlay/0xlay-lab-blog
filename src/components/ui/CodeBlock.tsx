import type { CSSProperties, ReactNode } from 'react'

type CodeBlockProps = {
  title?: string
  lang?: string
  children: ReactNode
  style?: CSSProperties
}

export function CodeBlock({ title, lang, children, style }: CodeBlockProps) {
  return (
    <div className="oxl-code" style={style}>
      {(title || lang) ? (
        <div className="oxl-code-bar">
          <span className="oxl-code-title">{title}</span>
          {lang ? <span className="oxl-code-lang">{lang}</span> : null}
        </div>
      ) : null}
      <pre>{children}</pre>
    </div>
  )
}
