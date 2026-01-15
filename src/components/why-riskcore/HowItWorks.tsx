'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Section, SectionHeader } from '@/components/shared'

const steps = [
  {
    number: '01',
    title: 'Connect Your Sources',
    description: 'Point RISKCORE at your data sources. CSV files, APIs, FIX feeds, Excel sheets—we handle them all. Each PM keeps using their preferred tools.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    color: 'from-brand-blue to-brand-cyan',
    features: ['CSV & Excel', 'REST APIs', 'FIX Protocol', 'Bloomberg'],
  },
  {
    number: '02',
    title: 'Normalize & Aggregate',
    description: 'RISKCORE normalizes everything into a unified schema. Different conventions, currencies, identifiers—we reconcile it all automatically.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    color: 'from-brand-green to-brand-cyan',
    features: ['Auto-normalization', 'Currency conversion', 'ID reconciliation', 'Real-time updates'],
  },
  {
    number: '03',
    title: 'Query with AI',
    description: 'Ask questions in plain English. "What\'s our firm-wide equity beta?" "Show me concentrated positions across all PMs." Get instant answers.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'from-brand-purple to-brand-blue',
    features: ['Natural language', 'Instant answers', 'Custom reports', 'Alert triggers'],
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section className="bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary overflow-hidden">
      <SectionHeader
        subtitle="How It Works"
        title="Three Steps to Unified Risk"
        description="Deploy RISKCORE in days, not months. No infrastructure changes required."
      />

      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-blue via-brand-green to-brand-purple opacity-30" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
              className={`relative flex flex-col lg:flex-row items-center gap-8 mb-16 last:mb-0 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Step Number - Center on desktop */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-black/30`}>
                  <span className="text-white font-bold text-xl">{step.number}</span>
                </div>
              </div>

              {/* Content Card */}
              <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-20' : 'lg:pl-20'}`}>
                <div className="bg-bg-secondary/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors duration-300">
                  {/* Mobile step number */}
                  <div className="lg:hidden flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                      <span className="text-white font-bold">{step.number}</span>
                    </div>
                  </div>

                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${step.color} bg-opacity-10 mb-4`}>
                    <div className="text-white">{step.icon}</div>
                  </div>

                  <h3 className="font-heading font-bold text-text-primary text-2xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-muted mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {step.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-text-secondary text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="flex-1 hidden lg:block" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-text-muted mb-6">
            Ready to unify your risk visibility?
          </p>
          <a
            href="/#cta"
            className="inline-flex items-center justify-center px-4 py-2 bg-brand-blue text-white font-semibold rounded-[3px] transition-all duration-200 hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 text-sm"
          >
            Book a Demo
          </a>
        </motion.div>
      </div>
    </Section>
  )
}
