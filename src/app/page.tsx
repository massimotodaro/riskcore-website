import {
  Hero,
  CTASection,
} from '@/components'
import {
  TheProblemSection,
  TimeWastedProblem,
  UnknownCorrelationProblem,
} from '@/components/problems'

export default function Home() {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      <div id="problem">
        <TheProblemSection />
      </div>
      <div id="time-wasted">
        <TimeWastedProblem />
      </div>
      <div id="correlation">
        <UnknownCorrelationProblem />
      </div>
      <div id="cta">
        <CTASection />
      </div>
    </>
  )
}
