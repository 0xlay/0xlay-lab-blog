import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Project } from '@/lib/types'

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="oxl-grid oxl-grid-pair">
      {projects.map((pr) => (
        // Projects without a url stay plain cards. pcb-bench has nowhere to
        // point yet, and Card only takes on link behaviour when given an href.
        <Card key={pr.slug} href={pr.url}>
          <div className="oxl-project-body">
            <div className="oxl-project-head">
              <span className="oxl-project-name">{pr.name}</span>
              <Badge tone={pr.statusTone}>{pr.status}</Badge>
            </div>
            <p className="oxl-project-desc">{pr.desc}</p>
            <span className="oxl-project-lang">{pr.lang}</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
