import {
  HeroInline,
  FixedSolutionArrow,
  CTAForm,
  IntegrationLogos,
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
      <IntegrationLogos />
      <div id="problem">
        <TheProblemSection />
      </div>
      <div id="time-wasted">
        <TimeWastedProblem />
      </div>
      <div id="correlation">
        <UnknownCorrelationProblem />
      </div>
      <section id="cta" className="relative py-16 md:py-20 px-4 sm:px-6 overflow-hidden bg-transparent">
        <div className="relative w-[80%] mx-auto">
          {/* Custom Title for Home Page */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Tired of <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">fragmented risk data</span>? See how RISKCORE can help.
            </h2>
            <p className="text-base md:text-lg text-text-muted">
              Book a 30-minute demo or subscribe to stay updated.
            </p>
          </div>

          {/* Reusable Form Component */}
          <CTAForm theme="blue" defaultMode="demo" />

          {/* Testimonial */}
          <div className="mt-10 md:mt-12 p-5 md:p-6 bg-bg-secondary/40 border border-black/10 dark:border-white/10 rounded-xl">
            <div className="flex items-start gap-4 justify-center">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-slate-900 font-bold text-lg flex-shrink-0">
                M
              </div>
              <div className="text-center">
                <p className="text-text-primary text-base leading-relaxed mb-3">
                  &quot;We&apos;ve been trying to build this internally for years. The fact that someone finally
                  understands the multi-PM aggregation problem and is solving it properly — we had to get involved.&quot;
                </p>
                <p className="text-sm text-text-muted">
                  <span className="font-semibold">CRO</span>
                  <span className="mx-2 text-text-dim">•</span>
                  <span>$2.4B Multi-Manager Fund</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
