import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { EDUCATION, LANGUAGES } from '@/lib/data/education'

export function Background() {
  return (
    <div>
      <SectionLabel hex="0x02" className="oxl-stack-label">Background</SectionLabel>
      <div className="oxl-grid oxl-grid-pair">
        <Card>
          <div className="oxl-credentials">
            <span className="oxl-entry-title">Education</span>
            {EDUCATION.map((item) => (
              <div key={item.title} className="oxl-credential">
                <span className="oxl-credential-title">{item.title}</span>
                <span className="oxl-entry-meta">
                  {item.period ? `${item.detail} · ${item.period}` : item.detail}
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="oxl-credentials">
            <span className="oxl-entry-title">Languages</span>
            {LANGUAGES.map((lang) => (
              <div key={lang.name} className="oxl-language-row">
                <span className="oxl-credential-title">{lang.name}</span>
                <span className="oxl-entry-meta">{lang.level}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
