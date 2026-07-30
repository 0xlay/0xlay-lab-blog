import { SectionLabel } from '@/components/ui/SectionLabel'
import { GearList } from '@/components/sections/GearList'
import { PageShell } from '@/components/layout/PageShell'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Gear',
  description: 'The desk that runs the software work and the bench that handles the hardware next to it.',
  path: '/gear/',
})

export default function GearPage() {
  return (
    <PageShell>
      <div className="oxl-page oxl-page-narrow">
        <SectionLabel hex="0x03">Gear</SectionLabel>
        <h1 className="oxl-page-title">What I work with</h1>
        <p className="oxl-page-lede">
          A desk for the software work and a bench for the hardware next to it.
        </p>
        <GearList />
      </div>
    </PageShell>
  )
}
