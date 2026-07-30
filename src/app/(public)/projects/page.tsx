import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProjectGrid } from '@/components/sections/ProjectGrid'
import { PageShell } from '@/components/layout/PageShell'
import { getProjects } from '@/lib/content'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Projects',
  description: 'Open-source tools, research prototypes, and hardware projects.',
  path: '/projects/',
})

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <PageShell>
      <div className="oxl-page">
        <SectionLabel hex="0x02">Projects</SectionLabel>
        <h1 className="oxl-page-title">Things I built</h1>
        <p className="oxl-page-lede">
          Open-source tools, research prototypes, and hardware projects.
        </p>
        <ProjectGrid projects={projects} />
      </div>
    </PageShell>
  )
}
