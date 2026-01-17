'use client'

/**
 * CorrelationBlindSpotB.tsx
 *
 * Variation B: "The Matrix"
 *
 * Visual-first design with large animated correlation matrix as hero.
 * Minimal text, maximum visual impact. Dark, ominous feel with
 * glowing red accents that pulse like a warning system.
 *
 * Style: Matches riskcore.io design system
 */

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ==============================================
// LARGE ANIMATED CORRELATION MATRIX
// ==============================================

function CorrelationMatrixHero() {
  const [phase, setPhase] = useState<'hidden' | 'revealing' | 'revealed'>('hidden')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      const timer1 = setTimeout(() => setPhase('revealing'), 800)
      const timer2 = setTimeout(() => setPhase('revealed'), 2500)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [isInView])

  const books = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta']

  // Correlation data with hidden dangerous correlations
  const getCorrelation = (row: number, col: number): { value: number; dangerous: boolean } => {
    if (row === col) return { value: 1.0, dangerous: false }
    const correlations: Record<string, { value: number; dangerous: boolean }> = {
      '0-1': { value: 0.82, dangerous: true },
      '0-3': { value: 0.71, dangerous: true },
      '1-2': { value: 0.68, dangerous: true },
      '1-4': { value: 0.75, dangerous: true },
      '2-3': { value: 0.45, dangerous: false },
      '2-5': { value: 0.79, dangerous: true },
      '3-4': { value: 0.88, dangerous: true },
      '3-5': { value: 0.52, dangerous: false },
      '4-5': { value: 0.73, dangerous: true },
    }
    const key = row < col ? `${row}-${col}` : `${col}-${row}`
    return correlations[key] || { value: Math.random() * 0.3 + 0.05, dangerous: false }
  }

  const getCellStyle = (value: number, dangerous: boolean, revealed: boolean) => {
    if (!revealed && dangerous) {
      return {
        bg: 'bg-slate-800/40',
        text: 'text-slate-600',
        display: '???',
      }
    }
    if (value >= 0.7) {
      return {
        bg: revealed && dangerous ? 'bg-rose-500/30 animate-pulse' : 'bg-rose-500/20',
        text: 'text-rose-400',
        display: value.toFixed(2),
      }
    }
    if (value >= 0.5) {
      return {
        bg: 'bg-amber-500/15',
        text: 'text-amber-400',
        display: value.toFixed(2),
      }
    }
    return {
      bg: 'bg-slate-800/30',
      text: 'text-slate-500',
      display: value.toFixed(2),
    }
  }

  const dangerCount = 7 // Number of high correlations

  return (
    <div ref={ref} className="relative">
      {/* Glow effect behind matrix */}
      <div className="absolute inset-0 bg-rose-500/5 blur-3xl rounded-full scale-150" />

      <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-white/10 p-8 overflow-hidden">
        {/* Status Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${phase === 'revealed' ? 'bg-rose-500 animate-pulse' : 'bg-slate-600'}`} />
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Cross-Book Correlation Analysis
            </span>
          </div>
          <motion.div
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              phase === 'revealed'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-slate-800 text-slate-500 border border-white/5'
            }`}
            animate={phase === 'revealed' ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: phase === 'revealed' ? 3 : 0 }}
          >
            {phase === 'revealed' ? `${dangerCount} CRITICAL CORRELATIONS` : 'SCANNING...'}
          </motion.div>
        </div>

        {/* Matrix Grid */}
        <div className="overflow-x-auto">
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `100px repeat(${books.length}, 1fr)`, minWidth: '600px' }}
          >
            {/* Header row */}
            <div />
            {books.map((book, i) => (
              <motion.div
                key={book}
                className="p-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {book}
              </motion.div>
            ))}

            {/* Data rows */}
            {books.map((rowBook, rowIndex) => (
              <>
                <motion.div
                  key={`label-${rowBook}`}
                  className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: rowIndex * 0.05 }}
                >
                  {rowBook}
                </motion.div>
                {books.map((_, colIndex) => {
                  const { value, dangerous } = getCorrelation(rowIndex, colIndex)
                  const style = getCellStyle(value, dangerous, phase === 'revealed')

                  return (
                    <motion.div
                      key={`${rowIndex}-${colIndex}`}
                      className={`p-3 rounded-lg text-center font-mono text-sm font-semibold transition-all duration-700 ${style.bg} ${style.text}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.02 * (rowIndex * books.length + colIndex) }}
                    >
                      {style.display}
                    </motion.div>
                  )
                })}
              </>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-rose-500/30" />
            <span className="text-xs text-slate-500">Critical (&gt;0.7)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-500/15" />
            <span className="text-xs text-slate-500">Elevated (0.5-0.7)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-800/30" />
            <span className="text-xs text-slate-500">Normal (&lt;0.5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-800/40 flex items-center justify-center text-[8px] text-slate-600">?</div>
            <span className="text-xs text-slate-500">Hidden</span>
          </div>
        </div>

        {/* Scanning Overlay */}
        <AnimatePresence>
          {phase === 'revealing' && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent"
                initial={{ top: '20%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.5, ease: 'linear' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ==============================================
// MAIN COMPONENT
// ==============================================

export default function CorrelationBlindSpotB() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #10182B, #151E31)' }}
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-rose-500/[0.02] rounded-full blur-[150px]" />

      <div className="relative max-w-5xl mx-auto">
        {/* Compact Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
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
            THE BLIND SPOT
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Your Books Are More{' '}
            <span className="bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
              Correlated
            </span>{' '}
            Than You Think
          </motion.h2>

          <motion.p
            className="text-lg text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Watch as we scan for hidden correlations that your current systems miss.
          </motion.p>
        </motion.div>

        {/* Matrix Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <CorrelationMatrixHero />
        </motion.div>

        {/* Bottom Warning */}
        <motion.div
          className="mt-12 p-6 bg-rose-500/5 border border-rose-500/20 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-rose-400">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">
                In a market crash, these "diversified" books move together.
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Without real-time cross-book correlation tracking, you're flying blind. RISKCORE calculates
                implied correlations across all PMs, updated continuously as markets move.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
