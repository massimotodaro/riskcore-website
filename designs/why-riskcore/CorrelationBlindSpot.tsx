'use client'

/**
 * CorrelationBlindSpot.tsx
 *
 * Pain point section highlighting the correlation problem in multi-manager funds:
 * - No visibility into cross-book correlations
 * - No implied correlation calculations
 * - No historical correlation tracking
 * - Hidden concentration risk from correlated strategies
 */

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// ==============================================
// ICONS
// ==============================================

const Icons = {
  blind: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <path d="M1 1l22 22" />
      <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
    </svg>
  ),
  question: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  disconnect: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M18 6L6 18M6 6l12 12" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
    </svg>
  ),
}

// ==============================================
// ANIMATED CORRELATION MATRIX
// ==============================================

function AnimatedCorrelationMatrix() {
  const [revealed, setRevealed] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setRevealed(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  const books = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon']

  // Hidden high correlations that current systems miss
  const correlations: Record<string, Record<string, { value: number; hidden: boolean }>> = {
    Alpha: { Alpha: { value: 1.0, hidden: false }, Beta: { value: 0.78, hidden: true }, Gamma: { value: 0.12, hidden: false }, Delta: { value: 0.65, hidden: true }, Epsilon: { value: 0.08, hidden: false } },
    Beta: { Alpha: { value: 0.78, hidden: true }, Beta: { value: 1.0, hidden: false }, Gamma: { value: 0.72, hidden: true }, Delta: { value: 0.15, hidden: false }, Epsilon: { value: 0.68, hidden: true } },
    Gamma: { Alpha: { value: 0.12, hidden: false }, Beta: { value: 0.72, hidden: true }, Gamma: { value: 1.0, hidden: false }, Delta: { value: 0.55, hidden: true }, Epsilon: { value: 0.18, hidden: false } },
    Delta: { Alpha: { value: 0.65, hidden: true }, Beta: { value: 0.15, hidden: false }, Gamma: { value: 0.55, hidden: true }, Delta: { value: 1.0, hidden: false }, Epsilon: { value: 0.82, hidden: true } },
    Epsilon: { Alpha: { value: 0.08, hidden: false }, Beta: { value: 0.68, hidden: true }, Gamma: { value: 0.18, hidden: false }, Delta: { value: 0.82, hidden: true }, Epsilon: { value: 1.0, hidden: false } },
  }

  const getColor = (value: number, hidden: boolean, revealed: boolean) => {
    if (hidden && !revealed) return 'bg-slate-800/60'
    if (value >= 0.7) return 'bg-red-500/40'
    if (value >= 0.5) return 'bg-amber-500/40'
    if (value >= 0.3) return 'bg-slate-600/40'
    return 'bg-slate-700/30'
  }

  const getTextColor = (value: number, hidden: boolean, revealed: boolean) => {
    if (hidden && !revealed) return 'text-slate-600'
    if (value >= 0.7) return 'text-red-400'
    if (value >= 0.5) return 'text-amber-400'
    return 'text-slate-400'
  }

  return (
    <div ref={ref} className="relative">
      {/* Matrix */}
      <div className="bg-slate-950/80 rounded-xl border border-white/[0.06] p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Cross-Book Correlation Matrix</span>
          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${revealed ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/50 text-slate-500'}`}>
            {revealed ? '6 HIGH CORRELATIONS FOUND' : 'VISIBILITY: LIMITED'}
          </span>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto">
          <div className="grid gap-1" style={{ gridTemplateColumns: `80px repeat(${books.length}, 1fr)`, minWidth: '500px' }}>
            {/* Header row */}
            <div className="p-2" />
            {books.map(book => (
              <div key={book} className="p-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {book}
              </div>
            ))}

            {/* Data rows */}
            {books.map(row => (
              <>
                <div key={`label-${row}`} className="p-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center">
                  {row}
                </div>
                {books.map(col => {
                  const cell = correlations[row][col]
                  const isHidden = cell.hidden
                  const isDiagonal = row === col

                  return (
                    <motion.div
                      key={`${row}-${col}`}
                      className={`p-2 rounded-lg text-center text-sm font-mono font-semibold transition-all duration-500 ${getColor(cell.value, isHidden, revealed)} ${getTextColor(cell.value, isHidden, revealed)}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05 * (books.indexOf(row) * books.length + books.indexOf(col)) }}
                    >
                      {isHidden && !revealed ? (
                        <span className="text-slate-600">???</span>
                      ) : (
                        cell.value.toFixed(2)
                      )}
                    </motion.div>
                  )
                })}
              </>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500/40" />
            <span className="text-xs text-slate-500">High (&gt;0.7)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-500/40" />
            <span className="text-xs text-slate-500">Medium (0.5-0.7)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-700/30" />
            <span className="text-xs text-slate-500">Low (&lt;0.5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-800/60 flex items-center justify-center text-[8px] text-slate-600">?</div>
            <span className="text-xs text-slate-500">Unknown</span>
          </div>
        </div>
      </div>

      {/* Reveal overlay */}
      {!revealed && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm rounded-xl"
          initial={{ opacity: 1 }}
          animate={{ opacity: isInView ? 0 : 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{ pointerEvents: 'none' }}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="text-red-400">{Icons.blind}</span>
            </div>
            <p className="text-slate-400 text-sm">Loading hidden correlations...</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ==============================================
// PAIN POINT QUESTIONS
// ==============================================

const painQuestions = [
  {
    question: "What's the actual correlation between your PM books?",
    reality: "You don't know. Your systems analyze each book in isolation.",
    risk: "Two 'uncorrelated' strategies might move together in a crash.",
    icon: Icons.question,
  },
  {
    question: "How does NVDA exposure in Book A correlate with SMCI in Book B?",
    reality: "No current system calculates implied cross-book security correlations.",
    risk: "Hidden AI/semiconductor concentration across 'diversified' books.",
    icon: Icons.disconnect,
  },
  {
    question: "Has the correlation between your books changed over time?",
    reality: "Without historical tracking, you can't see correlation drift.",
    risk: "Strategies that were uncorrelated 6 months ago may now move in lockstep.",
    icon: Icons.warning,
  },
]

// ==============================================
// MAIN COMPONENT
// ==============================================

export default function CorrelationBlindSpot() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0f1a 0%, #0f172a 50%, #131c2e 100%)' }}>
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-amber-500/[0.03] rounded-full blur-[120px]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(239,68,68,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-red-400">{Icons.blind}</span>
            <span className="text-red-400 font-bold uppercase tracking-wider">The Correlation Blind Spot</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            You've Built Your Risk Report.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">
              But Do You Know How Your Books Correlate?
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            After hours of manual aggregation, you finally have a risk report. But here's the uncomfortable truth:
            <span className="text-slate-200 font-medium"> you still can't see the hidden correlations that could blow up your entire portfolio.</span>
          </p>
        </motion.div>

        {/* Pain Point Questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid lg:grid-cols-3 gap-6 mb-16"
        >
          {painQuestions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="relative p-8 rounded-2xl bg-slate-900/50 border border-white/[0.06] hover:border-red-500/20 transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6">
                {item.icon}
              </div>

              {/* Question */}
              <h3 className="text-lg font-bold text-white mb-4 leading-snug">
                "{item.question}"
              </h3>

              {/* Reality */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Reality:</span>
                <p className="text-slate-400 mt-1">{item.reality}</p>
              </div>

              {/* Risk */}
              <div className="p-4 rounded-xl bg-red-500/[0.06] border border-red-500/10">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Hidden Risk:</span>
                <p className="text-slate-300 mt-1 text-sm">{item.risk}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Correlation Matrix Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <p className="text-slate-500 text-sm uppercase tracking-wider mb-2">What Your Current System Shows vs. Reality</p>
            <p className="text-slate-400">Watch as hidden high correlations are revealed...</p>
          </div>
          <AnimatedCorrelationMatrix />
        </motion.div>

        {/* The Hard Truth */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="p-10 rounded-2xl bg-gradient-to-br from-red-950/40 to-slate-900/60 border border-red-500/20">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-red-400">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  The Hard Truth About Correlation Blindness
                </h3>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    Your diversification report looks great on paper. Five PMs, five different strategies, low historical correlation to benchmarks.
                    <span className="text-red-400 font-semibold"> But in a market crash, 80% of your positions move in the same direction.</span>
                  </p>
                  <p>
                    Why? Because no one calculated the <span className="text-amber-400 font-semibold">implied correlation</span> between the underlying securities across different books.
                    No one tracked how <span className="text-amber-400 font-semibold">historical book-to-book correlations</span> have drifted over the past 6 months.
                  </p>
                  <p>
                    Your risk report told you what you own. <span className="text-white font-semibold">It didn't tell you how it all moves together when it matters most.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { value: '0%', label: 'of multi-PM funds track real-time cross-book correlation', color: '#ef4444' },
            { value: '72%', label: 'average hidden correlation found in "diversified" portfolios', color: '#f59e0b' },
            { value: '6x', label: 'higher drawdown when correlation spikes are missed', color: '#ef4444' },
            { value: '$0', label: 'is what most platforms charge for this feature (because they can\'t do it)', color: '#a855f7' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="p-6 rounded-xl bg-slate-900/60 border border-white/[0.06] text-center"
            >
              <span className="text-3xl font-bold font-mono" style={{ color: stat.color }}>{stat.value}</span>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
