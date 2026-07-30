import type { ReactNode } from 'react'

export interface Post extends PostMeta {
  /** compiled MDX, ready to render */
  content: ReactNode
}

export interface Project {
  slug: string
  hex: string
  name: string
  desc: string
  lang: string
  status: 'stable' | 'active' | 'wip' | 'archived'
  statusTone: 'ok' | 'accent' | 'warn' | 'danger' | 'neutral'
  url?: string
}

export interface WorkEntry {
  slug: string
  title: string
  /** the stack, rendered mono as a single dot-separated line */
  stack: string[]
  desc: string
}

export interface SkillRow {
  /** omitted on single-row groups, where a caption would divide nothing */
  label?: string
  items: string[]
}

export interface SkillGroup {
  slug: string
  title: string
  /** qualifier shown beside the title, e.g. marking a group as a hobby */
  note?: string
  rows: SkillRow[]
}

export interface GearItem {
  name: string
  /** short spec line, rendered mono beside the name */
  spec?: string
  /** one sentence on why this thing and not another */
  note: string
}

export interface GearRow {
  /** the role these items play: compute, audio, solder */
  label: string
  items: GearItem[]
}

export interface GearGroup {
  slug: string
  title: string
  rows: GearRow[]
}

export interface Credential {
  title: string
  detail: string
  period?: string
}

export interface Language {
  name: string
  level: string
}

export interface Tag {
  name: string
  count: number
}

export interface SocialLink {
  /** stable key; also selects the glyph in SocialLinks */
  id: 'github' | 'x' | 'youtube' | 'twitch' | 'tiktok' | 'rss' | 'email'
  /** accessible name, since these links render as icons only */
  label: string
  href: string
}

export interface PostMeta {
  slug: string
  hex: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
}
