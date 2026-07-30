import Link from 'next/link'
import { Wordmark } from '@/components/ui/Wordmark'

export default function NotFound() {
  return (
    <div className="oxl-message">
      <Wordmark size={22} />
      <p className="oxl-message-mark">0x194 · not found</p>
      <h1 className="oxl-message-title">No such page</h1>
      <p className="oxl-message-body">
        The address resolved to nothing. It may have moved, or it may never have existed.
      </p>
      <Link href="/" className="oxl-message-link">← back to the lab</Link>
    </div>
  )
}
