import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { PageShell } from '@/components/layout/PageShell'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section>
      <PageShell>
        <div className="oxl-hero-body">
          <SectionLabel hex="0x00">Research &amp; development</SectionLabel>
          <h1 className="oxl-hero-title">
            Where curiosity becomes engineering
          </h1>
          <p className="oxl-hero-lede">
            Systems engineer driven by curiosity. Builds systems, explores how they work by taking them apart, and turns research and experimentation into new ideas.
          </p>
          <div className="oxl-hero-actions">
            <Link href="/posts"><Button variant="primary" size="lg">Read the blog</Button></Link>
            <Link href="/about"><Button variant="secondary" size="lg">About me</Button></Link>
          </div>
        </div>
      </PageShell>
    </section>
  )
}
