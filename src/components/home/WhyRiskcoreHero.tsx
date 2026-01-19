'use client'

/**
 * WhyRiskcoreHero - The Problem Section for Home Page
 *
 * Shows the multi-manager risk challenge with pain points,
 * animated arrow, and Risk Report outcome card.
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Pain points data
const painPoints = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'Siloed Systems',
    description: 'Each PM uses their preferred tools—Bloomberg, Axioma, Excel, proprietary systems. No unified view exists.',
    hexColor: '#397EEE',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Manual Aggregation',
    description: 'Risk teams spend hours copying data into spreadsheets. Errors are inevitable. Updates lag behind markets.',
    hexColor: '#22C55E',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Delayed Visibility',
    description: "By the time risk reports reach management, positions have changed. You're always looking at yesterday's risk.",
    hexColor: '#A855F7',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4v16" />
      </svg>
    ),
    title: 'No Correlation',
    description: "No way to calculate implied or realized correlation between different PMs. Hidden risk relationships go undetected.",
    hexColor: '#06B6D4',
  },
]

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function WhyRiskcoreHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24" style={{ background: 'linear-gradient(to bottom, #0a0f1a, #151E31)' }}>
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Title - One line, "Challenge" in green */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6">
            The Multi-Book Risk <span style={{ color: '#22C55E' }}>Challenge</span>
          </h1>

          {/* Subtitle - Gray/muted like design */}
          <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto whitespace-nowrap">
            Understanding the firm-wide risk across multiple books shouldn't require a PhD in spreadsheet gymnastics.
          </p>
        </motion.div>

        {/* Pain Points Grid - Cards with hex colors */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6 max-w-[1600px] mx-auto"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="backdrop-blur-sm rounded-2xl p-8 hover:border-white/30 transition-all duration-300"
              style={{
                backgroundColor: `${point.hexColor}10`,
                border: `1px solid ${point.hexColor}40`,
              }}
            >
              <div className="flex items-start gap-5">
                {/* Modern SVG Icon */}
                <div
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: `${point.hexColor}15`,
                    border: `1px solid ${point.hexColor}40`,
                    color: point.hexColor,
                  }}
                >
                  {point.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-100 text-xl mb-3">
                    {point.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
