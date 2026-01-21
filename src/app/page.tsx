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

      {/* Testimonial - Above CTA */}
      <section className="relative pt-0 pb-12 md:pb-16 px-6 overflow-hidden bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="p-5 md:p-6 bg-bg-secondary/40 rounded-xl">
            {/* Mobile: icon on top, centered. Desktop: icon on left */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-slate-900 font-bold text-lg flex-shrink-0">
                M
              </div>
              <div className="text-center md:text-left">
                <p className="text-text-primary text-sm md:text-lg leading-relaxed mb-3">
                  &quot;We&apos;ve been trying to build this internally for years. The fact that someone finally
                  understands the multi-PM aggregation problem and is solving it properly — we had to get involved.&quot;
                </p>
                <p className="text-sm md:text-base text-text-muted">
                  <span className="font-semibold">CRO</span>
                  <span className="mx-2 text-text-dim">•</span>
                  <span>$2.4B Multi-Manager Fund</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Last section before footer */}
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
        </div>
      </section>
    </div>
  )
}
