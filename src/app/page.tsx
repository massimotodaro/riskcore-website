import {
  HeroInline,
  FixedSolutionArrow,
  UnifiedCTA,
} from '@/components'
import {
  TheProblemSection,
  TimeWastedProblem,
  UnknownCorrelationProblem,
} from '@/components/problems'

export default function Home() {
  return (
    <div className="min-h-screen theme-page-bg">
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
        <UnifiedCTA heading="Ready to see how RISKCORE integrates with your trading system?" showTestimonial={true} theme="blue" />
      </div>
    </div>
  )
}
