'use client'

/**
 * CapabilitiesDifferentiators.tsx
 *
 * Capabilities Section Variant 2: "The Differentiators"
 *
 * Instead of generic features, highlights the specific things
 * that RISKCORE does that competitors can't. Fewer items,
 * but each one is a genuine differentiator with proof.
 *
 * Usage:
 *   <CapabilitiesDifferentiators />
 *
 * Dependencies:
 *   npm install framer-motion
 */

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ==============================================
// TYPES
// ==============================================

interface Differentiator {
  id: string
  title: string
  tagline: string
  problem: string
  solution: string
  proof: string
  icon: React.ReactNode
  color: string
  competitors: string
}

// ==============================================
// DIFFERENTIATOR DATA
// ==============================================

const differentiators: Differentiator[] = [
  {
    id: 'cross-pm',
    title: 'Cross-PM Netting',
    tagline: 'See Your True Net Exposure',
    problem: 'PM Alpha is long $50M NVIDIA. PM Beta is short $30M. Your systems show $80M gross, hiding the fact you\'re only $20M net.',
    solution: 'RISKCORE nets positions across all PMs automatically. See firm-wide net delta, not just the sum of individual books.',
    proof: 'Typical multi-PM fund discovers 15-25% of gross exposure is offsetting positions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <circle cx="9" cy="12" r="5" />
        <circle cx="15" cy="12" r="5" />
      </svg>
    ),
    color: '#3b82f6',
    competitors: 'Bloomberg PORT, Enfusion, Eze — all show PM-level only',
  },
  {
    id: 'time-travel',
    title: 'Time Travel',
    tagline: 'Risk At Any Point In History',
    problem: '"What was our VaR last Friday at 4pm?" takes your team 3 days to reconstruct from snapshots and emails.',
    solution: 'Click any date and time. See exactly what your risk looked like — positions, prices, Greeks, everything.',
    proof: 'Audit and compliance questions answered in seconds instead of days.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
        <path d="M2 12h2M20 12h2M12 2v2M12 20v2" />
      </svg>
    ),
    color: '#22c55e',
    competitors: 'Most systems only show current state or end-of-day snapshots',
  },
  {
    id: 'zero-hedge',
    title: '0Hedge Calculations',
    tagline: 'Know The Cost of Going Flat',
    problem: 'You want to neutralize your tech exposure before earnings. How much do you need to sell? Which instruments?',
    solution: 'Every RiskPod shows the exact notional to hedge each bucket. Updated in real-time as markets move.',
    proof: 'The 0HEDGE column: see "-$19.6M" next to US Equities — that\'s your hedge.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 5l-2 2M12 5l2 2M12 19l-2-2M12 19l2-2M5 12l2-2M5 12l2 2M19 12l-2-2M19 12l-2 2" />
      </svg>
    ),
    color: '#a855f7',
    competitors: 'No platform calculates hedge amounts automatically',
  },
  {
    id: 'correlation',
    title: 'Benchmark Correlation',
    tagline: 'Risk That Moves Together',
    problem: 'Your diversification report looks great. But in a crash, 80% of your positions move the same direction.',
    solution: 'Every position shows correlation to your chosen benchmark. See which exposures cluster in stress scenarios.',
    proof: 'The CORR. column reveals hidden concentration that diversification metrics miss.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M3 3v18h18" />
        <circle cx="7" cy="14" r="2" />
        <circle cx="11" cy="10" r="2" />
        <circle cx="15" cy="12" r="2" />
        <circle cx="19" cy="6" r="2" />
        <path d="M7 14l4-4 4 2 4-6" strokeDasharray="2 2" />
      </svg>
    ),
    color: '#06b6d4',
    competitors: 'Correlation matrices exist, but not per-position benchmark correlation',
  },
]

// ==============================================
// DIFFERENTIATOR CARD
// ==============================================

interface DifferentiatorCardProps {
  item: Differentiator
  index: number
  isExpanded: boolean
  onToggle: () => void
}

function DifferentiatorCard({ item, index, isExpanded, onToggle }: DifferentiatorCardProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        className={`relative rounded-2xl border overflow-hidden transition-all cursor-pointer ${
          isExpanded
            ? 'bg-slate-800/80 border-white/20'
            : 'bg-slate-900/50 border-white/10 hover:border-white/20'
        }`}
        onClick={onToggle}
        whileHover={{ y: -3 }}
      >
        {/* Header */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div style={{ color: item.color }}>{item.icon}</div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-slate-500">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </div>

          <h3 className="text-xl font-bold text-slate-100 mb-1">{item.title}</h3>
          <p className="text-sm font-medium mb-3" style={{ color: item.color }}>{item.tagline}</p>

          {/* Problem (always visible) */}
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 mb-3">
            <div className="text-[10px] text-rose-400 uppercase tracking-wide mb-1 font-semibold">The Problem</div>
            <p className="text-sm text-slate-300">{item.problem}</p>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-3">
                {/* Solution */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                  <div className="text-[10px] text-emerald-400 uppercase tracking-wide mb-1 font-semibold">RISKCORE Solution</div>
                  <p className="text-sm text-slate-300">{item.solution}</p>
                </div>

                {/* Proof */}
                <div className="bg-slate-800/50 border border-white/10 rounded-lg p-3">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-1 font-semibold">Proof Point</div>
                  <p className="text-sm text-slate-200 font-medium">{item.proof}</p>
                </div>

                {/* Competitors */}
                <div className="pt-2 border-t border-white/5">
                  <p className="text-xs text-slate-500">
                    <span className="text-slate-400">Competitors:</span> {item.competitors}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// ==============================================
// MAIN COMPONENT
// ==============================================

export default function CapabilitiesDifferentiators() {
  const [expandedId, setExpandedId] = useState<string | null>('cross-pm')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #10182B, #151E31)' }}
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            WHAT MAKES US DIFFERENT
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Features Your Current Tools{' '}
            <span className="bg-gradient-to-r from-rose-400 to-rose-500 bg-clip-text text-transparent">
              Don't Have
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            We built RISKCORE because these capabilities don't exist anywhere else.
            Click each card to see the problem, solution, and proof.
          </motion.p>
        </motion.div>

        {/* Differentiator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentiators.map((item, index) => (
            <DifferentiatorCard
              key={item.id}
              item={item}
              index={index}
              isExpanded={expandedId === item.id}
              onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-sm rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See These In Action
          </motion.button>
          <p className="text-slate-500 text-sm mt-4">
            30-minute demo. See your actual positions aggregated.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
