import type { MDXComponents } from 'mdx/types'

/**
 * Only the nodes that need structure live here. Headings, links, lists, quotes
 * and rules are styled by descendant selectors under .oxl-prose in
 * src/styles/sections/posts.css, so overriding them in this map would just be
 * the same declarations written twice in a place harder to find.
 */
export const mdxComponents: MDXComponents = {
  // rehype-pretty-code wraps a titled fence in
  // <figure><figcaption>...</figcaption><pre>...</pre></figure>.
  // The .oxl-code classes style that structure without touching CodeBlock.
  figure: (props) => <figure className="oxl-code" {...props} />,
  figcaption: (props) => (
    <figcaption className="oxl-code-bar">
      <span className="oxl-code-title" {...props} />
    </figcaption>
  ),
}
