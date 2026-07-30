import Link from 'next/link'
import { Card, cardClass } from './Card'
import { Badge } from './Badge'

type PostCardProps = {
  hex?: string
  title: string
  excerpt?: string
  date?: string
  readTime?: string
  tags?: string[]
  /** when set the whole card becomes the link to the post */
  href?: string
}

export function PostCard({ hex, title, excerpt, date, readTime, tags = [], href }: PostCardProps) {
  const meta = [date, readTime].filter(Boolean).join(' · ')

  const body = (
    <div className="oxl-post-card-body">
      <div className="oxl-post-card-head">
        {hex ? <span className="oxl-post-card-hex">{hex}</span> : <span />}
        {meta ? <span className="oxl-post-card-date">{meta}</span> : null}
      </div>
      <h3 className="oxl-post-card-title">{title}</h3>
      {excerpt ? <p className="oxl-post-card-excerpt">{excerpt}</p> : null}
      {/* Inert on purpose: this card is itself an anchor, and an anchor inside
          an anchor is invalid. Tags are linked on the post page and in TagNav. */}
      {tags.length > 0 ? (
        <div className="oxl-post-card-tags">
          {tags.map((t) => <Badge key={t} tone="neutral">{t}</Badge>)}
        </div>
      ) : null}
    </div>
  )

  // Card deliberately renders plain anchors so that pages using it do not pay
  // for the router. Post cards are the exception worth paying for: they are the
  // path from the home page into the writing, and a full document load there
  // drops scroll position and re-runs hydration.
  if (href) {
    return (
      <Link href={href} className={cardClass(true, 'oxl-post-card')}>
        {body}
      </Link>
    )
  }

  return <Card className="oxl-post-card">{body}</Card>
}
