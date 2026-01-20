'use client'

/**
 * NativeAISection.tsx - AI-Native Risk Platform Section
 *
 * Sections:
 * 1. Hero + Timeline side by side
 * 2. Ask Questions, Get Answers - 3 cards
 * 3. Feature Comparison table
 * 4. Quote
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Timeline Item Component
function TimelineItem({
  number,
  title,
  badge,
  badgeColor,
  description,
  showLine = true,
  delay = 0,
  isInView,
}: {
  number: number
  title: string
  badge: string
  badgeColor: 'orange' | 'emerald' | 'red'
  description: string
  showLine?: boolean
  delay?: number
  isInView: boolean
}) {
  const badgeStyles = {
    orange: 'bg-orange-500/20 text-orange-400',
    emerald: 'bg-emerald-500/20 text-emerald-400',
    red: 'bg-red-500/20 text-red-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className={`relative pl-16 ${showLine ? 'mb-8' : ''}`}
    >
      {showLine && (
        <div className="absolute left-5 top-8 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/50 to-emerald-500/10" />
      )}
      <div className="absolute left-0 w-10 h-10 bg-[#0a0f1a] border-2 border-emerald-500/50 rounded-full flex items-center justify-center">
        <span className="text-sm font-bold text-emerald-500">{number}</span>
      </div>
      <div className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="text-base font-semibold text-slate-100">{title}</h4>
          <span className={`px-2 py-1 ${badgeStyles[badgeColor]} text-xs font-semibold rounded`}>
            {badge}
          </span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

// Capability Card Component
function CapabilityCard({
  icon,
  iconColor,
  title,
  description,
  delay = 0,
  isInView,
}: {
  icon: React.ReactNode
  iconColor: string
  title: string
  description: string
  delay?: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center hover:border-emerald-500/30 transition-all duration-300"
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-5 bg-emerald-500/10 rounded-lg sm:rounded-xl flex items-center justify-center">
        <svg className={`w-6 h-6 sm:w-8 sm:h-8 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <h4 className="text-base sm:text-lg font-bold text-slate-100 mb-2 sm:mb-3">{title}</h4>
      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  )
}

// Comparison Row Component
function ComparisonRow({
  capability,
  riskcore,
  bloomberg,
  riskval,
  isLast = false,
}: {
  capability: string
  riskcore: 'check' | 'x' | 'minus'
  bloomberg: 'check' | 'x' | 'minus'
  riskval: 'check' | 'x' | 'minus'
  isLast?: boolean
}) {
  const renderIcon = (type: 'check' | 'x' | 'minus') => {
    if (type === 'check') {
      return (
        <div className="w-7 h-7 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )
    }
    if (type === 'x') {
      return (
        <div className="w-7 h-7 bg-red-500/20 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )
    }
    return (
      <div className="w-7 h-7 bg-yellow-500/20 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-4 ${!isLast ? 'border-b border-slate-700/30' : ''}`}>
      <div className="p-3 sm:p-5 flex items-center">
        <span className="text-sm sm:text-base text-slate-300">{capability}</span>
      </div>
      <div className="p-3 sm:p-5 flex items-center justify-center">{renderIcon(riskcore)}</div>
      <div className="p-3 sm:p-5 flex items-center justify-center">{renderIcon(bloomberg)}</div>
      <div className="p-3 sm:p-5 flex items-center justify-center">{renderIcon(riskval)}</div>
    </div>
  )
}

export default function NativeAISection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const timelineSteps = [
    {
      number: 1,
      title: 'Lightweight Model Deployment',
      badge: 'One-Time Setup',
      badgeColor: 'orange' as const,
      description: 'A compact, optimized AI model (quantized for efficiency) is deployed on your infrastructure. Runs on standard hardware — no GPUs required for inference.',
    },
    {
      number: 2,
      title: 'Local Context Building',
      badge: 'Automatic',
      badgeColor: 'emerald' as const,
      description: 'RISKCORE builds a semantic index of your positions, risk metrics, and portfolio structure. This context stays 100% on your servers.',
    },
    {
      number: 3,
      title: 'Query Processing',
      badge: 'Real-Time',
      badgeColor: 'red' as const,
      description: 'When you ask a question, the local AI model processes it against your portfolio context. No data is transmitted externally — ever.',
    },
    {
      number: 4,
      title: 'Intelligent Response',
      badge: 'Instant',
      badgeColor: 'orange' as const,
      description: 'The AI returns actionable insights with full context: positions, exposures, correlations, and recommendations. Complete audit trail maintained locally.',
    },
  ]

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden bg-transparent"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ==================== SECTION 1: Hero + Timeline Side by Side ==================== */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 mb-12 lg:mb-20">
          {/* Left: Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-xl pt-0 lg:pt-8 text-left"
          >
            <span className="inline-flex items-center px-3 sm:px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              First AI-Native Risk Platform
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-['Space_Grotesk']">
              <span className="text-white">Your </span>
              <span className="text-emerald-400">Data Never Leaves</span>
            </h2>

            <p className="text-base sm:text-xl text-slate-400 mb-4 sm:mb-6">
              AI-Powered Risk Analysis, 100% On-Premises
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              RISKCORE runs a lightweight AI model directly on your infrastructure. Ask questions in plain English, get instant risk insights — without a single byte of position data touching the cloud.
            </p>
          </motion.div>

          {/* Right: Timeline */}
          <div className="flex-1 max-w-xl w-full">
            {timelineSteps.map((step, index) => (
              <TimelineItem
                key={step.number}
                number={step.number}
                title={step.title}
                badge={step.badge}
                badgeColor={step.badgeColor}
                description={step.description}
                showLine={index < timelineSteps.length - 1}
                delay={0.2 + index * 0.15}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* ==================== SECTION 2: Ask Questions, Get Answers ==================== */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-slate-100 text-center mb-12 font-['Space_Grotesk']"
          >
            Ask Questions, Get Answers
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            <CapabilityCard
              icon={<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />}
              iconColor="text-slate-300"
              title="Natural Language"
              description='Ask in plain English: "What&apos;s our biggest concentration risk across all PMs?" No query language to learn.'
              delay={0.6}
              isInView={isInView}
            />
            <CapabilityCard
              icon={<path d="M7 2v11h3v9l7-12h-4l4-8z" />}
              iconColor="text-yellow-400"
              title="Instant Answers"
              description="Sub-second responses. The AI model runs locally, so there's no round-trip to external servers."
              delay={0.7}
              isInView={isInView}
            />
            <CapabilityCard
              icon={<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />}
              iconColor="text-yellow-400"
              title="Context-Aware"
              description="The AI understands your portfolio structure, position history, and risk limits — all without data leaving your network."
              delay={0.8}
              isInView={isInView}
            />
          </div>
        </div>

        {/* ==================== SECTION 3: Feature Comparison ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100 font-['Space_Grotesk']">
              How RISKCORE Is Different
            </h3>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <div className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden min-w-[500px]">
              {/* Table Header */}
              <div className="grid grid-cols-4 bg-[#0f172a] border-b border-white/10">
                <div className="p-3 sm:p-5 text-sm sm:text-base text-slate-400">Capability</div>
                <div className="p-3 sm:p-5 text-sm sm:text-base font-semibold text-emerald-400 text-center">RISKCORE</div>
                <div className="p-3 sm:p-5 text-sm sm:text-base font-semibold text-orange-400 text-center">Bloomberg</div>
                <div className="p-3 sm:p-5 text-sm sm:text-base font-semibold text-slate-400 text-center">Riskval</div>
              </div>

              <ComparisonRow
                capability="Natural Language AI Queries"
                riskcore="check"
                bloomberg="x"
                riskval="x"
              />
              <ComparisonRow
                capability="AI Runs 100% On-Premises"
                riskcore="check"
                bloomberg="x"
                riskval="x"
              />
              <ComparisonRow
                capability="Zero Data Leaves Network"
                riskcore="check"
                bloomberg="minus"
                riskval="check"
                isLast
              />
            </div>
          </div>
        </motion.div>

        {/* ==================== SECTION 4: Quote ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-10">
            <p className="text-xl text-slate-300 italic leading-relaxed mb-4">
              &ldquo;As hedge fund CIO, I will never allow our{' '}
              <span className="text-emerald-400 font-semibold not-italic">positions and exposures</span>{' '}
              to flow through third-party cloud servers.&rdquo;
            </p>
            <p className="text-base text-slate-500">
              Mikael T. — CIO multi-strategy hedge fund
            </p>
          </div>
        </motion.div>
      </div>
      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </section>
  )
}
