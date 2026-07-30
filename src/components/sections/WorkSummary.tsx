import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { WORK } from '@/lib/data/experience'

export function WorkSummary() {
  return (
    <div>
      <SectionLabel hex="0x00" className="oxl-stack-label">Work</SectionLabel>
      <div className="oxl-stack">
        {WORK.map((w) => (
          <Card key={w.slug}>
            <div className="oxl-entry">
              <span className="oxl-entry-title">{w.title}</span>
              <p className="oxl-entry-desc">{w.desc}</p>
              <span className="oxl-entry-meta">{w.stack.join(' · ')}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
