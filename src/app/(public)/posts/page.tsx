import { SectionLabel } from '@/components/ui/SectionLabel'
import { TagNav } from '@/components/sections/TagNav'
import { PostList } from '@/components/sections/PostList'
import { PageShell } from '@/components/layout/PageShell'
import { getPosts, getTags } from '@/lib/content'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Posts',
  description: 'Long-form writing on kernel internals, reverse engineering, embedded firmware and the tools built along the way.',
  path: '/posts/',
})

export default async function PostsPage() {
  const [posts, tags] = await Promise.all([getPosts(), getTags()])

  return (
    <PageShell>
      <div className="oxl-page oxl-page-narrow oxl-page-open">
        <SectionLabel hex="0x01" className="oxl-stack-label">Posts</SectionLabel>
        <TagNav tags={tags} />
        <PostList posts={posts} />
      </div>
    </PageShell>
  )
}
