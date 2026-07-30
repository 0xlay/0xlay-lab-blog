import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { PostMeta } from '@/lib/types'

export const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function requireString(value: unknown, field: string, file: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${file}: frontmatter field "${field}" is missing or not a string`)
  }
  return value
}

function toDateString(value: unknown, file: string): string {
  // An unquoted YAML date arrives as a Date; a quoted one stays a string.
  const raw = value instanceof Date ? value.toISOString().slice(0, 10) : value
  const date = requireString(raw, 'date', file)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`${file}: date "${date}" is not YYYY-MM-DD`)
  }
  return date
}

function readMeta(filename: string): PostMeta {
  const source = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8')
  const { data } = matter(source)

  const tags = Array.isArray(data.tags) ? data.tags.map(String) : []
  if (tags.length === 0) {
    throw new Error(`${filename}: frontmatter field "tags" must list at least one tag`)
  }

  return {
    slug: filename.replace(/\.mdx$/, ''),
    hex: requireString(data.hex, 'hex', filename),
    title: requireString(data.title, 'title', filename),
    excerpt: requireString(data.excerpt, 'excerpt', filename),
    date: toDateString(data.date, filename),
    readTime: requireString(data.readTime, 'readTime', filename),
    tags,
  }
}

export function getPostFilenames(): string[] {
  return fs.readdirSync(POSTS_DIR).filter((name) => name.endsWith('.mdx')).sort()
}

// A production build asks for the post list once per generated page, and every
// tag page asks again through getAllTags. Re-reading and re-parsing the whole
// directory each time is invisible at five posts and is not at two hundred.
//
// Deliberately not cached in development: the cache key would be the module
// instance, which survives an edit to an .mdx file, so a frontmatter change
// would not show up until the dev server restarted.
let cachedMetas: PostMeta[] | null = null

export function getPostMetas(): PostMeta[] {
  if (cachedMetas) return cachedMetas

  const metas = getPostFilenames()
    .map(readMeta)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  if (process.env.NODE_ENV === 'production') cachedMetas = metas
  return metas
}

export function getPostMeta(slug: string): PostMeta | null {
  const filename = `${slug}.mdx`
  if (!fs.existsSync(path.join(POSTS_DIR, filename))) return null
  return readMeta(filename)
}
