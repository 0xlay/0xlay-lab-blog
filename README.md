# 0xlay.lab

Personal blog and portfolio for a system software engineer working in cybersecurity. Next.js 14 App Router, TypeScript, and a hand-rolled design system built on CSS custom properties.

There's no backend, and none is planned. Posts are MDX files under `content/posts/`, compiled to HTML at build time; projects and tags live in typed TypeScript modules. `next build` writes the whole thing to `out/` as a static export, which is what ships to GitHub Pages.

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Static export, written to `out/` |
| `npm start` | Serve `out/` locally (`npx serve out`) |
| `npm run lint` | ESLint via `next lint` |
| `npm test` | Jest + React Testing Library |
| `npm run test:watch` | Jest in watch mode |

## Routes

| Path | Page |
| --- | --- |
| `/` | Home: hero, latest posts, projects, the lab |
| `/posts` | All posts with a client-side tag filter |
| `/posts/[slug]` | Post reader |
| `/projects` | Projects grid |
| `/tags/[tag]` | Posts filtered by tag |
| `/about` | Bio and skills |

## How the data layer is wired

Pages never touch `content/posts/` or the data modules directly. They call `@/lib/content`, a facade of four getters: `getPosts`, `getPost`, `getTags`, `getProjects`. Behind it, `posts.ts` reads frontmatter with `gray-matter` and `compile.ts` runs the MDX body through `compileMDX` from `next-mdx-remote/rsc`, with `remark-gfm`, `rehype-slug`, and `rehype-pretty-code` (shiki) doing the actual highlighting. A post's filename is its slug - there's no `slug` field in the frontmatter to drift out of sync with it.

The split between `posts.ts` and `compile.ts` isn't cosmetic. Every package in the MDX pipeline is ESM-only, and `posts.ts` stays free of that import graph so `src/__tests__/lib/content.test.ts` can import it under plain Jest with no transform configuration. Listing pages call `getPosts`/`getTags`, which only ever touch `posts.ts`; only the post page calls `getPost`, which pulls in `compile.ts` and pays for a shiki pass.

Because the site builds with `output: 'export'`, a static export, anything under `src/app/api/` would never run in production - the build succeeds and the route just doesn't exist in `out/`. `src/app/feed.xml/route.ts` is the one Route Handler in the app, and it works only because static export can turn a `GET`-only handler that never reads from `Request` into a plain file at build time.

## Structure

```
content/
  posts/             # *.mdx, one per post, YAML frontmatter
src/
  app/
    (public)/        # route group sharing the Nav + Footer layout
    feed.xml/        # the one Route Handler, GET-only
  components/
    ui/              # design system ports, exported from index.ts
    layout/          # Nav, Footer, PageShell
    sections/        # page-level composites, plus the MDX component map
  lib/
    content/         # index.ts (facade), posts.ts, compile.ts, tags.ts
    data/            # projects.ts
    site.ts          # the one place that knows the site's URL
    lab.ts, types.ts
  styles/            # globals.css + tokens/
docs/superpowers/    # specs and implementation plans
.github/workflows/   # deploy.yml, the GitHub Pages pipeline
```

Pages are Server Components. `Nav`, `ThemeToggle`, `TagFilter`, `ProjectGrid`, `Tabs`, and `Switch` are client components.

Active nav highlighting lives in `Nav` itself, via `usePathname()`. Resolving the path on the server and passing it down as a prop does not work here: layouts are preserved across client-side navigation, so the prop keeps the value from the first server render and the highlight never moves.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `master` or `main`. Both names are listed because a repository whose default branch does not match the trigger produces no error anywhere - the workflow simply never fires, and "never deployed" looks exactly like "deploy pending".

The workflow installs from the lockfile, then runs lint, tests, and the build before it uploads anything. That ordering is the point: a static site has no runtime where a mistake degrades gracefully, so whatever the build produced is precisely what visitors get. The `build` job holds only `contents: read` and `pages: read`; the ability to publish lives on the `deploy` job alone, which never runs dependency install scripts.

Alongside the pages, the build emits `feed.xml` (RSS), `sitemap.xml`, and `robots.txt`. `src/lib/site.ts` is the only module that knows the site's URL, and all three read it from there along with `metadataBase`.

The custom domain is configured in the repository's Pages settings rather than by a `CNAME` file in the tree. When publishing from a custom Actions workflow, GitHub ignores any `CNAME` file, so adding one would look like configuration and do nothing.

Because this is a static export, middleware, `redirects`, `rewrites`, `headers`, ISR, Draft Mode, and `next/image` optimization with the default loader are all unavailable, and they fail quietly: the build succeeds and the feature never runs.

## Styling

No Tailwind, no CSS Modules. Design tokens live in `src/styles/tokens/` as CSS custom properties and are imported once by `src/styles/globals.css`. Components with variants and pseudo-states use the `.oxl-*` classes defined in that file; everything else uses inline style objects that reference `var(--token)`.

Colors go through tokens without exception worth mentioning: `var(--text-strong)`, `var(--bg-page)`, `var(--border-default)`. Spacing and type size do not, yet. Components write raw pixel values inline and the `--space-*` scale sits unused, so match the file you are editing rather than tokenizing one component on its own.

Fonts are self-hosted variable TTFs in `public/fonts/`: Manrope for display, Inter for body, Google Sans Code for mono. Light and dark themes are both first-class, driven by `next-themes` with `data-theme` on `<html>`.

## Design system

The tokens in `src/styles/tokens/` and the components in `src/components/ui/` are the brand, and nothing enforces them automatically. The rules: sentence case everywhere except mono overline labels, hex numbering as quiet metadata, accent green used sparingly, slate rather than black in dark mode, Lucide icons at 1.75 stroke, no emoji.

The UI barrel also exports `CodeBlock`, `Input`, `Switch`, and `Tabs`, which nothing currently imports. They are kept for parity with the design system rather than left behind by accident, so "unused" is not a reason to delete them.

## Tests

Jest configured through `next/jest`, jsdom by default, with `@/` mapped to `src/`. `src/__tests__/lib/content.test.ts` opts into the Node environment with a `@jest-environment node` docblock because it reads `content/posts/` off disk directly - it works as a content linter, checking that every post has complete frontmatter, that slugs and `hex` values are unique, and that posts and tags come back sorted correctly. It imports `@/lib/content/posts` and `@/lib/content/tags` rather than the `@/lib/content` facade, which is deliberate: going through the facade would pull the ESM-only MDX toolchain into a Jest run.

Run one file or one case:

```bash
npx jest src/__tests__/lib/content.test.ts
```

```bash
npm test -- -t "returns posts newest first"
```

## License

Code (everything under `src/`, config and build tooling) is MIT - see [`LICENSE`](LICENSE). Article content under `content/posts/` is CC BY 4.0 - see [`LICENSE-CONTENT.md`](LICENSE-CONTENT.md).
