/**
 * @jest-environment node
 */
import fs from 'node:fs'
import { getPostMetas } from '@/lib/content/posts'
import { getAllTags } from '@/lib/content/tags'

const REQUIRED = ['slug', 'hex', 'title', 'excerpt', 'date', 'readTime'] as const

describe('post metadata', () => {
  it('gives every post complete frontmatter', () => {
    for (const post of getPostMetas()) {
      for (const field of REQUIRED) {
        // The slug is in the message so a failure names the offending file.
        expect({ slug: post.slug, field, value: post[field] }).toMatchObject({
          value: expect.any(String),
        })
        expect(post[field]).toBeTruthy()
      }
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(post.hex).toMatch(/^0x[0-9A-F]{2}$/)
      expect(post.tags.length).toBeGreaterThan(0)
    }
  })

  it('keeps slugs and hex labels unique', () => {
    const posts = getPostMetas()
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length)
    expect(new Set(posts.map((p) => p.hex)).size).toBe(posts.length)
  })

  it('returns posts newest first', () => {
    const dates = getPostMetas().map((p) => p.date)
    expect(dates).toEqual([...dates].sort().reverse())
  })
})

describe('post metadata caching', () => {
  // The module caches only under NODE_ENV=production, so that editing an .mdx
  // file in dev is not hidden behind a cache the edit cannot invalidate. Both
  // halves of that condition are worth pinning down.
  // NODE_ENV has to stay set while the calls happen, not only while the module
  // loads: getPostMetas reads it each time it decides whether to fill the cache.
  const withNodeEnv = <T>(nodeEnv: string, run: (mod: typeof import('@/lib/content/posts')) => T): T => {
    const previous = process.env.NODE_ENV
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(process.env as any).NODE_ENV = nodeEnv
    try {
      let result!: T
      // A fresh module registry per case, so one test's cache is not the next
      // test's starting state. isolateModules is synchronous and only sees a
      // require(), which is why the rule is off for this line specifically.
      jest.isolateModules(() => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        result = run(require('@/lib/content/posts'))
      })
      return result
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(process.env as any).NODE_ENV = previous
    }
  }

  afterEach(() => jest.restoreAllMocks())

  it('reads the posts directory once per build', () => {
    const readdir = jest.spyOn(fs, 'readdirSync')

    withNodeEnv('production', (mod) => {
      const first = mod.getPostMetas()
      const second = mod.getPostMetas()
      expect(second).toBe(first)
    })

    expect(readdir).toHaveBeenCalledTimes(1)
  })

  it('re-reads on every call in development', () => {
    const readdir = jest.spyOn(fs, 'readdirSync')

    withNodeEnv('development', (mod) => {
      mod.getPostMetas()
      mod.getPostMetas()
    })

    expect(readdir).toHaveBeenCalledTimes(2)
  })
})

describe('tags', () => {
  it('counts every tag occurrence across posts', () => {
    const expected = new Map<string, number>()
    for (const post of getPostMetas()) {
      for (const tag of post.tags) expected.set(tag, (expected.get(tag) ?? 0) + 1)
    }

    const tags = getAllTags()
    expect(tags.length).toBe(expected.size)
    for (const tag of tags) expect(tag.count).toBe(expected.get(tag.name))
  })

  it('sorts by count descending, then by name', () => {
    const tags = getAllTags()
    const sorted = [...tags].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    expect(tags).toEqual(sorted)
  })
})
