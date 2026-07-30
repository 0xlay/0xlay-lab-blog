import { AboutHero } from '@/components/sections/AboutHero'
import { WorkSummary } from '@/components/sections/WorkSummary'
import { Toolkit } from '@/components/sections/Toolkit'
import { Background } from '@/components/sections/Background'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { PageShell } from '@/components/layout/PageShell'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'About',
  description: 'Systems software engineer working in cybersecurity: C++ and Rust, kernel and user mode, reverse engineering and malware analysis.',
  path: '/about/',
})

export default function AboutPage() {
  return (
    <PageShell>
      <div className="oxl-page oxl-page-narrow">
        <AboutHero />
        <div className="oxl-about-block"><WorkSummary /></div>
        <div className="oxl-about-block"><Toolkit /></div>
        <div className="oxl-about-block"><Background /></div>
        <div className="oxl-about-block">
          <Card>
            <div className="oxl-entry">
              <SectionLabel hex="0x03">Get in touch</SectionLabel>
              <p className="oxl-entry-desc">
                If you have a question or just want to get in touch, write to{' '}
                <a href="mailto:contact@0xlay.com">contact@0xlay.com</a>
              </p>
              <SocialLinks size={18} />
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
