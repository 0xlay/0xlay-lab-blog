import { SectionLabel } from '@/components/ui/SectionLabel'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { SKILL_GROUPS } from '@/lib/data/skills'

export function Toolkit() {
  return (
    <div>
      <SectionLabel hex="0x01" className="oxl-stack-label">Toolkit</SectionLabel>
      <div className="oxl-stack">
        {SKILL_GROUPS.map((group) => (
          <Card key={group.slug}>
            <div className="oxl-toolkit-group">
              <div className="oxl-toolkit-head">
                <span className="oxl-entry-title">{group.title}</span>
                {group.note ? <span className="oxl-entry-meta">{group.note}</span> : null}
              </div>
              {group.rows.map((row) => (
                <div key={row.label ?? group.slug} className="oxl-toolkit-row">
                  {row.label ? <span className="oxl-entry-meta">{row.label}</span> : null}
                  <div className="oxl-chips">
                    {row.items.map((item) => <Badge key={item}>{item}</Badge>)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
