import type { Tag } from '@/lib/types'
import { getPostMetas } from './posts'

export function getAllTags(): Tag[] {
  const counts = new Map<string, number>()
  for (const post of getPostMetas()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}
