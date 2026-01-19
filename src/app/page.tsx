import {
  HeroInline,
  CTASection,
  FixedSolutionArrow,
} from '@/components'
import {
  TheProblemSection,
  TimeWastedProblem,
  UnknownCorrelationProblem,
} from '@/components/problems'

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #0a0f1a 0%, #0f172a 15%, #151E31 35%, #1a2744 55%, #151E31 75%, #0f172a 90%, #0a0f1a 100%)'
      }}
    >
      <FixedSolutionArrow />
      <div id="hero">
        <HeroInline />
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
    </div>
  )
}
