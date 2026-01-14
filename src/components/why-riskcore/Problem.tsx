'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Section, SectionHeader } from '@/components/shared'

const painPoints = [
  {
    icon: '🔴',
    title: 'Siloed Systems',
    description: 'Each PM uses their preferred tools—Bloomberg, Axioma, Excel, proprietary systems. No unified view exists.',
    color: 'border-red-500/30',
  },
  {
    icon: '⚠️',
    title: 'Manual Aggregation',
    description: 'Risk teams spend hours copying data into spreadsheets. Errors are inevitable. Updates lag behind markets.',
    color: 'border-yellow-500/30',
  },
  {
    icon: '🕐',
    title: 'Delayed Visibility',
    description: 'By the time risk reports reach management, positions have changed. You\'re always looking at yesterday\'s risk.',
    color: 'border-orange-500/30',
  },
  {
    icon: '🔒',
    title: 'Vendor Lock-in',
    description: 'Enterprise risk platforms cost millions and take years to implement. Then you\'re stuck with their limitations.',
    color: 'border-purple-500/30',
  },
]

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function Problem() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section className="bg-gradient-to-b from-bg-primary to-bg-secondary/50">
      <SectionHeader
        subtitle="The Problem"
        title="The Multi-Manager Risk Nightmare"
        description="Managing firm-wide risk across multiple PMs shouldn't require a PhD in spreadsheet gymnastics."
      />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
      >
        {painPoints.map((point, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className={`bg-bg-secondary/60 backdrop-blur-sm border ${point.color} rounded-xl p-6 hover:border-white/20 transition-colors duration-300`}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{point.icon}</span>
              <div>
                <h3 className="font-heading font-bold text-text-primary text-lg mb-2">
                  {point.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Visual: Chaos diagram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-16 max-w-4xl mx-auto"
      >
        <div className="bg-bg-secondary/40 border border-white/10 rounded-2xl p-8">
          <p className="text-center text-text-muted text-sm uppercase tracking-wider mb-6">
            Sound Familiar?
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {['Bloomberg', 'Axioma', 'Excel', 'Python', 'Proprietary'].map((system, i) => (
              <div
                key={system}
                className="px-4 py-2 bg-bg-tertiary/50 border border-white/10 rounded-lg text-text-secondary text-sm"
              >
                {system}
              </div>
            ))}
          </div>
          <div className="flex justify-center my-6">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <span className="text-red-400 font-semibold">Risk Report</span>
              <span className="text-text-muted text-sm">(2 days late, 47 errors)</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
