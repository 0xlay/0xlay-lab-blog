import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { GEAR_GROUPS } from '@/lib/data/gear'
import { toHex } from '@/lib/hex'

export function GearList() {
  return (
    <div className="oxl-gear">
      {GEAR_GROUPS.map((group, index) => (
        <div key={group.slug}>
          {/* The page header's hex marks the nav tab, not a position in this
              list, so the groups run their own counter from 0x00 in source
              order rather than continuing from it. */}
          <SectionLabel hex={toHex(index)} className="oxl-stack-label">
            {group.title}
          </SectionLabel>
          <Card>
            <div className="oxl-gear-rows">
              {group.rows.map((row) => (
                <div key={row.label} className="oxl-gear-row">
                  <span className="oxl-entry-meta">{row.label}</span>
                  <div className="oxl-gear-items">
                    {row.items.map((item) => (
                      <div key={item.name} className="oxl-gear-item">
                        <div className="oxl-gear-head">
                          <span className="oxl-gear-name">{item.name}</span>
                          {item.spec ? <span className="oxl-entry-meta">{item.spec}</span> : null}
                        </div>
                        <p className="oxl-entry-desc">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
