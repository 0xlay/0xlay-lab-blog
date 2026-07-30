# Adding content

This site has no CMS and no backend. Everything a visitor sees comes from either an MDX file or a typed TypeScript module in `src/lib/data/`. This document lists everything that can be added, where it lives, and what shape it takes.

## Posts

**Where:** `content/posts/<slug>.mdx` - one file per post, filename is the slug.

Frontmatter is required, all six fields, nothing optional:

```md
---
title: "Post title"
excerpt: "One or two sentences shown on the card and in RSS."
date: "2026-07-30"
readTime: "8 min"
hex: "0x0D"
tags: [rust, internals]
---

Body content here, in MDX.
```

- `date` must be quoted (`"YYYY-MM-DD"`) - unquoted, YAML parses it into a `Date` object instead of a string.
- `hex` and `readTime` are written by hand, not computed. `hex` is the next value in sequence across all posts; `readTime` is your own estimate.
- `tags` needs at least one entry.
- Malformed frontmatter fails the build rather than silently rendering a blank card. `npm test` (`src/__tests__/lib/content.test.ts`) checks the same rules before you get that far.
- Code fences can carry a filename: ` ```c title="path/to/file.h" `.

No `slug` field - the filename is the slug, so renaming the file changes the URL.

## Projects

**Where:** `src/lib/data/projects.ts`, the `PROJECTS` array.

```ts
{
  slug: 'my-project',
  hex: '0x04',
  name: 'my-project',
  desc: 'One sentence describing what it does.',
  lang: 'C++',
  status: 'stable' | 'active' | 'wip' | 'archived',
  statusTone: 'ok' | 'accent' | 'warn' | 'danger' | 'neutral',
  url: 'https://github.com/0xlay/my-project', // optional; card is not clickable without it
}
```

`hex` continues the sequence already used by the other projects. `statusTone` isn't tied to `status` in code, but the existing entries pair `stable` with `ok`, `active` with `accent`, and `wip` with `warn`.

## Gear

**Where:** `src/lib/data/gear.ts`, the `GEAR_GROUPS` array. Two groups (`desk`, `bench`), each with rows grouped by role (`compute`, `audio`, `print`, `solder`, ...).

```ts
{
  name: 'Device name',
  spec: 'Optional one-line spec, rendered in mono next to the name',
  note: 'One sentence on what it does.',
}
```

Add a new item to an existing row's `items` array, or add a new row (`{ label: '...', items: [...] }`) to a group for a role that doesn't exist yet. Keep `note` to one short sentence - the whole point of this page is that it isn't a set of equipment reviews.

## About page content

Three more typed modules feed `/about`, none of them MDX:

- **`src/lib/data/experience.ts`** - the `WORK` array. Each entry is `{ slug, title, stack: string[], desc }`, newest first, no employer names by design (see the comment at the top of the file).
- **`src/lib/data/skills.ts`** - the `SKILL_GROUPS` array. Grouped badge lists (`{ slug, title, note?, rows: [{ label?, items: string[] }] }`) rather than one flat list.
- **`src/lib/data/education.ts`** - `EDUCATION` (`{ title, detail, period? }`) and `LANGUAGES` (`{ name, level }`).

## What isn't editable this way

- **The lab grid** (`src/lib/lab.ts`, `LAB_CARDS`) is a fixed set of eight subject-area cards sized for a 4-column grid. Adding a ninth breaks that layout; renaming or re-icon-ing an existing one is fine.
- **Social links** (`src/lib/data/social.ts`) are a fixed platform list (`github`, `x`, `youtube`, `twitch`, `tiktok`, `rss`, `email`) - the `id` is also what selects the icon in `SocialLinks`, so a new platform needs a matching icon added there too.

## Examples

`content/posts/` and `src/lib/data/projects.ts` start empty. The demo posts and projects used while building the site live in `docs/examples/` - `docs/examples/posts/*.mdx` and `docs/examples/projects.ts` - purely as a reference for the shape frontmatter and a `Project` entry take. They are not read by the app.

## After adding anything

Run `npm run dev` and check the page the content lands on. `npm test` catches frontmatter mistakes in posts; nothing currently lints the data modules beyond TypeScript's own type checking, so a typo in a `status` or `statusTone` value will fail the build rather than fail silently.
