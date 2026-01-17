'use client'

/**
 * CorrelationBlindSpotC.tsx
 *
 * Variation C: "The Blind Spots"
 *
 * Expandable cards layout (similar to CapabilitiesDifferentiators).
 * Each card represents a specific correlation blind spot with
 * Problem → Reality → Risk sections that expand on click.
 *
 * Style: Matches riskcore.io design system
 */

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ==============================================
// TYPES
// ==============================================

interface BlindSpot {
  id: string
  title: string
  tagline: string
  question: string
  reality: string
  risk: string
  example: string
  icon: React.ReactNode
  color: string
}

// ==============================================
// BLIND SPOT DATA
// ==============================================

const blindSpots: BlindSpot[] = [
  {
    id: 'cross-book',
    title: 'Cross-Book Correlation',
    tagline: "How do your PM books move together?",
    question: "What's the actual correlation between Book Alpha and Book Beta?",
    reality: "Your systems analyze each book in isolation. No platform calculates real-time correlation between PM portfolios.",
    risk: "Two 'uncorrelated' strategies might both be long duration, long tech, or short vol — they'll crash together when it matters most.",
    example: "Alpha's long NVDA and Beta's long AMD both drop 40% in a semiconductor sell-off. Your diversification was an illusion.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="9" cy="12" r="5" />
        <circle cx="15" cy="12" r="5" />
      </svg>
    ),
    color: '#3b82f6',
  },
  {
    id: 'implied',
    title: 'Implied Security Correlation',
    tagline: "Do your holdings cluster without you knowing?",
    question: "How does NVDA in Book A correlate with SMCI in Book B?",
    reality: "No current system calculates the implied correlation between different securities held across different books.",
    risk: "Hidden AI/semiconductor/momentum factor exposure concentrated across 'diversified' books that looks safe on paper.",
    example: "Five PMs, five different strategies. But they're all effectively long the same AI trade through different instruments.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M3 3v18h18" />
        <circle cx="8" cy="14" r="2" />
        <circle cx="13" cy="9" r="2" />
        <circle cx="18" cy="5" r="2" />
        <path d="M8 14l5-5 5-4" strokeDasharray="3 3" />
      </svg>
    ),
    color: '#a855f7',
  },
  {
    id: 'historical',
    title: 'Correlation Drift',
    tagline: "Has your diversification eroded over time?",
    question: "Has the correlation between your books changed in the last 6 months?",
    reality: "Without historical correlation tracking, you can't see when strategies that were uncorrelated start moving together.",
    risk: "Correlation regime changes are invisible. What was 0.2 correlation six months ago might be 0.8 today.",
    example: "Your quant PM and macro PM used to be uncorrelated. Now they're both trading the same momentum signals.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
        <path d="M2 12h2M20 12h2M12 2v2M12 20v2" />
      </svg>
    ),
    color: '#22c55e',
  },
  {
    id: 'stress',
    title: 'Stress Correlation',
    tagline: "How do correlations change in a crash?",
    question: "What happens to your cross-book correlations when vol spikes?",
    reality: "Normal-market correlations are meaningless in a crisis. Stress correlations are typically 2-3x higher.",
    risk: "Your VaR is calculated using calm-market correlations. In a crash, your actual risk is 3x what your models show.",
    example: "March 2020: Books that showed 0.3 correlation suddenly moved with 0.9 correlation. Risk was 3x the model.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: '#f59e0b',
  },
]

// ==============================================
// BLIND SPOT CARD
// ==============================================

interface BlindSpotCardProps {
  item: BlindSpot
  index: number
  isExpanded: boolean
  onToggle: () => void
}

function BlindSpotCard({ item, index, isExpanded, onToggle }: BlindSpotCardProps) {
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
          <p className="text-sm font-medium mb-4" style={{ color: item.color }}>{item.tagline}</p>

          {/* Question (always visible) */}
          <div className="bg-slate-800/50 border border-white/10 rounded-lg p-4">
            <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-1 font-semibold">The Question</div>
            <p className="text-slate-200 font-medium">"{item.question}"</p>
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
                {/* Reality */}
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4">
                  <div className="text-[10px] text-rose-400 uppercase tracking-wide mb-1 font-semibold">The Reality</div>
                  <p className="text-sm text-slate-300">{item.reality}</p>
                </div>

                {/* Risk */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <div className="text-[10px] text-amber-400 uppercase tracking-wide mb-1 font-semibold">Hidden Risk</div>
                  <p className="text-sm text-slate-300">{item.risk}</p>
                </div>

                {/* Example */}
                <div className="bg-slate-800/50 border border-white/10 rounded-lg p-4">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-1 font-semibold">Real Example</div>
                  <p className="text-sm text-slate-200 italic">{item.example}</p>
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

export default function CorrelationBlindSpotC() {
  const [expandedId, setExpandedId] = useState<string | null>('cross-book')
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-full text-rose-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M1 1l22 22" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            CORRELATION BLIND SPOTS
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Questions Your Current Tools{' '}
            <span className="bg-gradient-to-r from-rose-400 to-rose-500 bg-clip-text text-transparent">
              Can't Answer
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Click each card to see the reality behind your correlation blind spots.
          </motion.p>
        </motion.div>

        {/* Blind Spot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blindSpots.map((item, index) => (
            <BlindSpotCard
              key={item.id}
              item={item}
              index={index}
              isExpanded={expandedId === item.id}
              onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {[
            { value: '0%', label: 'of platforms track cross-PM correlation', color: '#ef4444' },
            { value: '2.8x', label: 'avg correlation increase in stress', color: '#f59e0b' },
            { value: '73%', label: 'of "diversified" funds have hidden concentration', color: '#a855f7' },
            { value: '6mo', label: 'avg time for correlation regime to shift', color: '#3b82f6' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="p-5 rounded-xl bg-slate-900/60 border border-white/5 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <span className="text-2xl font-bold font-mono" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="/#early-access"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-sm rounded-xl transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            See Your Hidden Correlations
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
          <p className="text-slate-500 text-sm mt-4">
            RISKCORE calculates all four correlation types in real-time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
