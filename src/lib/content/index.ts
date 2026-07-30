import type { PostMeta, Project, Tag } from '@/lib/types'
import { PROJECTS } from '@/lib/data/projects'
import { getPostMetas, getPostMeta as getPostMetaInternal } from './posts'
import { getAllTags } from './tags'
import { compilePost } from './compile'

export async function getPosts(): Promise<PostMeta[]> {
  return getPostMetas()
}

// Frontmatter only, no MDX compilation - for callers (like generateMetadata)
// that only need title/excerpt/etc and shouldn't pay for a shiki pass.
export async function getPostMeta(slug: string): Promise<PostMeta | null> {
  return getPostMetaInternal(slug)
}

export async function getPost(slug: string) {
  return compilePost(slug)
}

export async function getTags(): Promise<Tag[]> {
  return getAllTags()
}

export async function getProjects(): Promise<Project[]> {
  return PROJECTS
}
