'use client'

/**
 * HeroProblemSolver.tsx
 *
 * Hero Variant 2: "The Problem Solver"
 *
 * Emotional, problem-focused narrative. Speaks directly to the pain
 * of fragmented risk visibility. Shows the transformation from chaos
 * to clarity.
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ==============================================
// ROTATING PAIN POINTS
// ==============================================

function RotatingPainPoints() {
  const painPoints = [
    '"What\'s our firm-wide exposure to NVIDIA?"',
    '"Which PMs are overlapping on the same trades?"',
    '"What was our risk last Friday at 4pm?"',
    '"How much are we paying in duplicate hedges?"',
    '"What\'s our real net delta across all books?"',
  ]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % painPoints.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [painPoints.length])

  return (
    <div className="h-12 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          className="absolute inset-0 text-lg md:text-xl text-slate-400 italic text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {painPoints[current]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

// ==============================================
// CHAOS TO CLARITY VISUAL
// ==============================================

function ChaosToClarity() {
  const [showClarity, setShowClarity] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowClarity(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Chaos icons representing fragmented systems
  const chaosIcons = [
    { emoji: '📊', label: 'Bloomberg', x: 15, y: 20 },
    { emoji: '📈', label: 'Enfusion', x: 75, y: 15 },
    { emoji: '📉', label: 'Excel', x: 25, y: 70 },
    { emoji: '📋', label: 'Eze', x: 80, y: 65 },
    { emoji: '📁', label: 'Email', x: 50, y: 40 },
    { emoji: '🗂️', label: 'CSV Files', x: 10, y: 45 },
    { emoji: '💼', label: 'PM Systems', x: 85, y: 35 },
  ]

  return (
    <div className="relative max-w-4xl mx-auto mt-12">
      {/* Chaos State */}
      <motion.div
        className="relative h-80 bg-slate-900/50 rounded-2xl border border-white/10 overflow-hidden"
        animate={showClarity ? { opacity: 0.3, scale: 0.95 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Chaos Label */}
        <motion.div
          className="absolute top-4 left-4 px-3 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full text-rose-400 text-xs font-medium"
          animate={showClarity ? { opacity: 0 } : { opacity: 1 }}
        >
          Current State: Fragmented
        </motion.div>

        {/* Floating Icons */}
        {chaosIcons.map((icon, i) => (
          <motion.div
            key={icon.label}
            className="absolute flex flex-col items-center"
            style={{ left: `${icon.x}%`, top: `${icon.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: showClarity ? 0.2 : 1,
              scale: showClarity ? 0.8 : 1,
              x: showClarity ? 0 : [0, Math.random() * 10 - 5, 0],
              y: showClarity ? 0 : [0, Math.random() * 10 - 5, 0],
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              x: { duration: 2 + Math.random(), repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 2 + Math.random(), repeat: Infinity, ease: 'easeInOut' },
              delay: i * 0.1,
            }}
          >
            <span className="text-3xl">{icon.emoji}</span>
            <span className="text-[10px] text-slate-500 mt-1">{icon.label}</span>
          </motion.div>
        ))}

        {/* Connecting Lines (Chaos) */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: showClarity ? 0.1 : 0.3 }}>
          <motion.line x1="15%" y1="25%" x2="50%" y2="45%" stroke="#475569" strokeWidth="1" strokeDasharray="4" />
          <motion.line x1="75%" y1="20%" x2="50%" y2="45%" stroke="#475569" strokeWidth="1" strokeDasharray="4" />
          <motion.line x1="25%" y1="75%" x2="50%" y2="45%" stroke="#475569" strokeWidth="1" strokeDasharray="4" />
          <motion.line x1="80%" y1="70%" x2="50%" y2="45%" stroke="#475569" strokeWidth="1" strokeDasharray="4" />
          <motion.line x1="85%" y1="40%" x2="50%" y2="45%" stroke="#475569" strokeWidth="1" strokeDasharray="4" />
        </svg>
      </motion.div>

      {/* Clarity State - Overlays */}
      <AnimatePresence>
        {showClarity && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl p-8 shadow-2xl shadow-emerald-500/20">
              {/* RISKCORE Label */}
              <motion.div
                className="flex items-center justify-center gap-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-medium">
                  With RISKCORE: Unified
                </span>
              </motion.div>

              {/* Unified Dashboard Preview */}
              <motion.div
                className="bg-slate-800/80 rounded-xl p-4 min-w-[300px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="text-center mb-3">
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                    RISKCORE
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xs text-slate-500">Firm Net</div>
                    <div className="text-lg font-bold text-emerald-400">$641M</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">VaR</div>
                    <div className="text-lg font-bold text-rose-400">$8.2M</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Positions</div>
                    <div className="text-lg font-bold text-slate-100">4,081</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 text-center">
                  <div className="text-xs text-slate-400">All PMs • All Systems • One View</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        className="absolute bottom-4 right-4 px-4 py-2 bg-slate-800 border border-white/20 rounded-lg text-sm text-slate-300 hover:bg-slate-700 transition-colors z-10"
        onClick={() => setShowClarity(!showClarity)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showClarity ? 'Show Chaos' : 'Show Clarity'}
      </motion.button>
    </div>
  )
}

// ==============================================
// PROBLEM CARDS
// ==============================================

function ProblemCards() {
  const problems = [
    {
      problem: 'PMs use different systems',
      solution: 'One unified aggregation layer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4" />
        </svg>
      ),
    },
    {
      problem: 'Overlapping positions hidden',
      solution: 'Cross-PM overlap detection',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <circle cx="9" cy="12" r="5" />
          <circle cx="15" cy="12" r="5" />
        </svg>
      ),
    },
    {
      problem: 'Historical risk unknown',
      solution: 'Time travel to any point',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      problem: 'Days to answer risk questions',
      solution: 'Real-time firm-wide view',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      {problems.map((item, i) => (
        <motion.div
          key={item.problem}
          className="bg-slate-800/50 border border-white/10 rounded-xl p-5 hover:border-emerald-500/30 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 + i * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <div className="text-emerald-400 mb-3">{item.icon}</div>
          <div className="text-sm text-rose-400/80 line-through mb-1">{item.problem}</div>
          <div className="text-slate-100 font-medium">{item.solution}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ==============================================
// CTA SECTION
// ==============================================

function CTASection() {
  return (
    <motion.div
      className="text-center mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <motion.a
        href="#early-access"
        className="inline-flex px-4 py-2 bg-brand-blue text-white font-semibold text-sm rounded-[3px] transition-all duration-200 hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Book a Demo
      </motion.a>
      <p className="text-slate-500 text-sm mt-4">
        See your firm-wide risk in under 30 minutes. No commitment required.
      </p>
    </motion.div>
  )
}

// ==============================================
// MAIN HERO COMPONENT
// ==============================================

export default function Hero() {
  return (
    <section
      className="relative min-h-[90vh] overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0a0f1a, #151E31, #10182B)' }}
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Main Headline */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Pre-headline */}
          <motion.p
            className="text-rose-400 text-sm font-medium uppercase tracking-wider mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Sound Familiar?
          </motion.p>

          {/* Rotating Pain Point */}
          <RotatingPainPoints />

          {/* Main Headline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-100 leading-tight mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            You Shouldn&apos;t Need
            <br />
            <span className="text-rose-400 line-through opacity-60">Three Spreadsheets</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              To Answer Simple Questions
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-slate-400 max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            RISKCORE gives single and multi-manager funds the firm-wide risk visibility
            they&apos;ve been building spreadsheets to fake.
          </motion.p>
        </motion.div>

        {/* Chaos to Clarity Visual */}
        <ChaosToClarity />

        {/* Problem Cards */}
        <ProblemCards />

        {/* CTA */}
        <CTASection />
      </div>
    </section>
  )
}
