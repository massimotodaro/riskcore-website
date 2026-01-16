'use client'

/**
 * Features.tsx (CapabilitiesPipeline variant)
 *
 * Capabilities Section Variant 1: "The Data Journey"
 *
 * Shows the transformation from fragmented data to actionable risk insights
 * as a visual pipeline. Each stage expands to show details.
 * Emphasizes the end-to-end story rather than a feature list.
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ==============================================
// TYPES
// ==============================================

interface PipelineStage {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  color: string
}

// ==============================================
// PIPELINE DATA
// ==============================================

const pipelineStages: PipelineStage[] = [
  {
    id: 'ingest',
    number: '01',
    title: 'Ingest',
    subtitle: 'Any Source, Any Format',
    description: 'Keep your Bloomberg, Enfusion, Eze, Excel, FIX — whatever you are using. No workflow changes required.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" />
        <path d="M12 4v12m0 0l-4-4m4 4l4-4" />
      </svg>
    ),
    color: '#3b82f6',
  },
  {
    id: 'normalize',
    number: '02',
    title: 'Normalize',
    subtitle: 'One Language for Risk',
    description: 'Map every position to our unified schema. CUSIP, ISIN, SEDOL, ticker — all resolved to a single identity.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M4 6h16M4 12h16M4 18h16" />
        <circle cx="8" cy="6" r="2" />
        <circle cx="16" cy="12" r="2" />
        <circle cx="10" cy="18" r="2" />
      </svg>
    ),
    color: '#22c55e',
  },
  {
    id: 'aggregate',
    number: '03',
    title: 'Aggregate',
    subtitle: 'Cross-PM Intelligence',
    description: 'Net positions across books. Detect overlaps. See your true firm-wide exposure for the first time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    color: '#a855f7',
  },
  {
    id: 'analyze',
    number: '04',
    title: 'Analyze',
    subtitle: 'Risk That Makes Sense',
    description: 'VaR, Greeks, duration, correlation — calculated consistently across every asset class and every PM.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M3 3v18h18" />
        <path d="M7 12l4-4 4 4 5-5" />
      </svg>
    ),
    color: '#06b6d4',
  },
  {
    id: 'act',
    number: '05',
    title: 'Act',
    subtitle: 'Decisions, Not Data',
    description: 'Ask questions in plain English. Get 0Hedge calculations. Export reports with one click.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    color: '#eab308',
  },
]

// ==============================================
// PIPELINE STAGE COMPONENT
// ==============================================

interface StageCardProps {
  stage: PipelineStage
  index: number
}

function StageCard({ stage, index }: StageCardProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        className="relative w-full text-left p-4 sm:p-6 rounded-2xl border transition-all bg-slate-900/50 border-white/5 hover:border-white/10 h-full"
        whileHover={{ y: -5 }}
      >
        {/* Stage Number */}
        <div
          className="absolute -top-3 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: stage.color, color: '#0f172a' }}
        >
          {stage.number}
        </div>

        {/* Icon */}
        <div className="mb-4" style={{ color: stage.color }}>
          {stage.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-100 mb-1">{stage.title}</h3>
        <p className="text-sm text-slate-500 mb-3">{stage.subtitle}</p>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed">{stage.description}</p>
      </motion.div>
    </motion.div>
  )
}

// ==============================================
// MAIN COMPONENT
// ==============================================

export default function Features() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #10182B, #151E31)' }}
    >

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-white/10 rounded-full text-slate-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            HOW IT WORKS
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            From Fragmented Data to{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Firm-Wide Clarity
            </span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Five stages transform scattered position data into actionable risk intelligence.
            Tap any stage to learn more.
          </motion.p>
        </motion.div>

        {/* Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {pipelineStages.map((stage, index) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          className="text-center mt-10 md:mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-slate-500 text-sm">
            Every stage runs automatically. Your PMs keep using their systems — RISKCORE does the rest.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
