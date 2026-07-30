import fs from 'node:fs'
import path from 'node:path'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Post } from '@/lib/types'
import { POSTS_DIR, getPostMeta } from './posts'
import { mdxComponents } from '@/components/sections/mdx-components'

// Not annotated with the package's own options type: the exported name for it
// has moved between releases, and this object is passed straight to the plugin.
const prettyCode = {
  // Two themes at once. shiki emits --shiki-light and --shiki-dark custom
  // properties, and globals.css picks one under [data-theme="dark"].
  theme: { light: 'github-light', dark: 'github-dark-dimmed' },
  // The .oxl-code surface token owns the background.
  keepBackground: false,
}

export async function compilePost(slug: string): Promise<Post | null> {
  const meta = getPostMeta(slug)
  if (!meta) return null

  const source = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), 'utf8')
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCode]],
      },
    },
  })

  return { ...meta, content }
}
