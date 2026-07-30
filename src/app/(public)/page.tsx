import { SectionLabel } from '@/components/ui/SectionLabel'
import { HeroSection } from '@/components/sections/HeroSection'
import { PostGrid } from '@/components/sections/PostGrid'
import { ProjectGrid } from '@/components/sections/ProjectGrid'
import { PageShell } from '@/components/layout/PageShell'
import { getPosts, getProjects } from '@/lib/content'
import { LAB_CARDS } from '@/lib/lab'
import Link from 'next/link'

export default async function HomePage() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()])

  return (
    <div>
      <HeroSection />
      <PageShell>
        <section className="oxl-section">
          <div className="oxl-section-head">
            <SectionLabel hex="0x00">Latest posts</SectionLabel>
            <Link href="/posts" className="oxl-section-more">all posts →</Link>
          </div>
          <PostGrid posts={posts.slice(0, 3)} />
        </section>

        <section className="oxl-section">
          <div className="oxl-section-head">
            <SectionLabel hex="0x01">Projects</SectionLabel>
          </div>
          <ProjectGrid projects={projects} />
        </section>

        <section className="oxl-section oxl-section-last">
          <div className="oxl-section-head">
            <SectionLabel hex="0x02">The lab</SectionLabel>
          </div>
          <div className="oxl-grid oxl-grid-lab">
            {LAB_CARDS.map(({ title, Icon }) => (
              <div key={title} className="oxl-card oxl-lab-card">
                <Icon size={18} strokeWidth={1.75} className="oxl-lab-icon" aria-hidden />
                <span className="oxl-lab-title">{title}</span>
              </div>
            ))}
          </div>
        </section>
      </PageShell>
    </div>
  )
}
