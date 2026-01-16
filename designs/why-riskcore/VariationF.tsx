'use client'

/**
 * Why RISKCORE - Variation F: "Visual Impact"
 *
 * Bold, immersive design with:
 * - Elaborate animated visuals
 * - Interactive hover states
 * - Rich gradient effects
 * - Dynamic illustrations
 * - Glassmorphism cards
 */

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// ==============================================
// CUSTOM SVG ICONS
// ==============================================

const Icons = {
  silos: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <rect x="2" y="4" width="5" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9.5" y="4" width="5" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="17" y="4" width="5" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 8h0M12 8h0M19.5 8h0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  spreadsheet: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M3 15h18M9 3v18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <rect x="4" y="11" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  overlap: (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
      <circle cx="9" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
      <path d="M8 12h.01M12 12h.01M16 12h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  correlation: (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
      <path d="M3 21V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="16" r="2" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="2" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="2" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 16l5-6 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
}

// ==============================================
// ANIMATED BACKGROUND ELEMENTS
// ==============================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)', top: '10%', left: '-10%' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)', bottom: '20%', right: '-5%' }}
        animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', top: '50%', left: '30%' }}
        animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// ==============================================
// SECTION 1: THE PROBLEM (VISUAL)
// ==============================================

const painPoints = [
  { icon: Icons.silos, title: 'Siloed Systems', description: 'Each PM uses their preferred tools. No unified view exists.', color: '#ef4444' },
  { icon: Icons.spreadsheet, title: 'Manual Aggregation', description: 'Hours copying data into spreadsheets. Errors inevitable.', color: '#f59e0b' },
  { icon: Icons.clock, title: 'Delayed Visibility', description: "You're always looking at yesterday's risk.", color: '#f97316' },
  { icon: Icons.lock, title: 'Vendor Lock-in', description: 'Millions in cost. Years to implement.', color: '#a855f7' },
]

function AnimatedSystemsFlow() {
  const systems = ['Bloomberg', 'Axioma', 'Excel', 'Python', 'Proprietary']
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % systems.length)
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Systems flowing down */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {systems.map((system, i) => (
          <motion.div
            key={system}
            className="relative px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-300"
            style={{
              backgroundColor: activeIndex === i ? 'rgba(59, 130, 246, 0.15)' : 'rgba(30, 41, 59, 0.8)',
              borderColor: activeIndex === i ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 255, 255, 0.08)',
              color: activeIndex === i ? '#60a5fa' : '#94a3b8',
            }}
          >
            {system}
            {activeIndex === i && (
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-blue-400 to-transparent"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Funnel visualization */}
      <div className="relative h-24 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 80" fill="none">
          <motion.path
            d="M50 10 L350 10 L280 70 L120 70 Z"
            fill="url(#funnelGradient)"
            stroke="rgba(239, 68, 68, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <defs>
            <linearGradient id="funnelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0.2)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Error output */}
      <motion.div
        className="flex justify-center"
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-red-950/80 to-red-900/60 border border-red-500/30 rounded-2xl backdrop-blur-sm">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <div>
            <p className="text-red-400 font-bold text-lg">Risk Report</p>
            <p className="text-red-300/60 text-sm">2 days late, 47 errors</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #080c14 0%, #0f172a 100%)' }}>
      <FloatingOrbs />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500/15 to-orange-500/10 border border-red-500/20 rounded-2xl mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <span className="text-red-400 font-bold uppercase tracking-wider">The Problem</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
            The Multi-Manager
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-400">
              Risk Challenge
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Managing firm-wide risk across multiple PMs shouldn't require a PhD in spreadsheet gymnastics.
          </p>
        </motion.div>

        {/* Pain Points - Glass Cards */}
        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${point.color}08 0%, transparent 70%)` }}
              />
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${point.color}15`, color: point.color }}
                >
                  {point.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{point.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Flow */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <AnimatedSystemsFlow />
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 2: IMPACT METRICS
// ==============================================

const metrics = [
  { value: '2-8', unit: 'Hours', label: 'To answer simple risk questions', gradient: 'from-red-500 to-orange-500' },
  { value: '47+', unit: 'Errors', label: 'In manual aggregation per week', gradient: 'from-orange-500 to-amber-500' },
  { value: '$500K', unit: 'Per Year', label: 'Wasted on legacy platforms', gradient: 'from-amber-500 to-yellow-500' },
]

function AnimatedNumber({ value, delay = 0 }: { value: string; delay?: number }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => setDisplay(value), delay * 1000)
    return () => clearTimeout(timer)
  }, [isInView, value, delay])

  return <span ref={ref}>{display}</span>
}

function ImpactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #131c2e 100%)' }}>
      {/* Large gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/[0.03] rounded-full blur-[150px]" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-semibold uppercase tracking-wider mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            The Cost of Inaction
          </motion.span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Every Day Costs You
          </h2>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-10 rounded-3xl bg-slate-900/50 border border-white/[0.06] backdrop-blur-sm overflow-hidden">
                {/* Background glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
                  style={{ background: `linear-gradient(135deg, ${metric.gradient.includes('red') ? '#ef4444' : metric.gradient.includes('amber') ? '#f59e0b' : '#eab308'}, transparent)` }}
                />

                <div className="relative">
                  <motion.span
                    className={`text-6xl lg:text-7xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
                  >
                    <AnimatedNumber value={metric.value} delay={0.4 + index * 0.15} />
                  </motion.span>
                  <span className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mt-2">
                    {metric.unit}
                  </span>
                  <p className="text-slate-400 mt-4">{metric.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 3: THE SOLUTION
// ==============================================

const capabilities = [
  {
    icon: Icons.overlap,
    title: 'Cross-PM Overlap Detection',
    before: 'Discovering overlap after concentrated positions blow up',
    after: 'Real-time alerts when firm-wide concentration emerges',
    color: '#22c55e',
  },
  {
    icon: Icons.chat,
    title: 'Natural Language Queries',
    before: '"Let me export this and run some SQL queries..."',
    after: '"What\'s our total tech exposure?" — Instant answer.',
    color: '#3b82f6',
  },
  {
    icon: Icons.correlation,
    title: 'Cross-PM Correlation',
    before: 'Each PM analyzed in isolation. Hidden correlations missed.',
    after: 'Reveals risk relationships across all books',
    color: '#a855f7',
  },
]

function SolutionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #131c2e 0%, #0f172a 100%)' }}>
      {/* Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[120px]" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">The RISKCORE Solution</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Built for Multi-Manager
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">From Day One</span>
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Other platforms were built for single PMs. We're different.
          </p>
        </motion.div>

        {/* Capability Cards */}
        <div className="space-y-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="absolute inset-0 rounded-3xl transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at ${index % 2 === 0 ? 'left' : 'right'} center, ${cap.color}08, transparent 50%)`,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              />
              <div className="relative p-8 lg:p-10 rounded-3xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-sm hover:border-white/[0.12] transition-all duration-500">
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  {/* Icon & Title */}
                  <div className="lg:w-1/3 flex items-center gap-5">
                    <motion.div
                      className="p-4 rounded-2xl"
                      style={{ backgroundColor: `${cap.color}15`, color: cap.color }}
                      animate={{ rotate: hoveredIndex === index ? [0, -5, 5, 0] : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {cap.icon}
                    </motion.div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white">{cap.title}</h3>
                  </div>

                  {/* Before / After */}
                  <div className="lg:w-2/3 grid md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-red-500/[0.06] border border-red-500/10">
                      <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Before</span>
                      <p className="text-slate-300 mt-2">{cap.before}</p>
                    </div>
                    <div
                      className="p-5 rounded-2xl border"
                      style={{ backgroundColor: `${cap.color}08`, borderColor: `${cap.color}20` }}
                    >
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cap.color }}>After</span>
                      <p className="text-slate-300 mt-2">{cap.after}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 4: FEATURES SHOWCASE
// ==============================================

const features = [
  {
    id: 'overlap',
    badge: 'Industry First',
    title: 'Real-Time Overlap Detection',
    description: 'When PM Alpha buys AAPL and PM Beta already holds it, you need to know. Instantly.',
    benefits: ['Real-time alerts', 'Concentration limits', 'PM notification', 'Historical analysis'],
    color: '#22c55e',
  },
  {
    id: 'nlp',
    badge: 'AI-Powered',
    title: 'Ask in Plain English',
    description: '"What\'s our total tech exposure?" — Get instant answers without SQL.',
    benefits: ['Claude AI integration', 'No SQL required', 'Instant results', 'Exportable reports'],
    color: '#3b82f6',
  },
  {
    id: 'correlation',
    badge: 'Proprietary',
    title: 'Hidden Risks Revealed',
    description: 'Our engine finds risk relationships that other platforms miss entirely.',
    benefits: ['Cross-strategy analysis', 'Factor decomposition', 'Tail risk ID', 'Stress testing'],
    color: '#a855f7',
  },
]

function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #080c14 100%)' }}>
      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Capabilities
          </motion.span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Three Things{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">No One Else Has</span>
          </h2>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              className="group relative"
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at top center, ${feature.color}10, transparent 70%)` }}
              />
              <div className="relative h-full p-8 rounded-3xl bg-slate-900/50 border border-white/[0.06] backdrop-blur-sm hover:border-white/[0.12] transition-all duration-500 flex flex-col">
                <span
                  className="inline-block self-start px-3 py-1.5 rounded-lg text-white text-xs font-semibold mb-6"
                  style={{ background: feature.color }}
                >
                  {feature.badge}
                </span>

                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 mb-8 flex-grow">{feature.description}</p>

                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span style={{ color: feature.color }}>{Icons.check}</span>
                      <span className="text-slate-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-24"
        >
          <div className="relative inline-block p-12 rounded-3xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20" />
            <div className="absolute inset-[1px] rounded-3xl bg-slate-900/90 backdrop-blur-xl" />

            <div className="relative">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                "Don't replace PM systems.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Aggregate them.</span>"
              </p>
              <p className="text-slate-400 mb-8">Open source. Deploy in days. No vendor lock-in.</p>
              <a
                href="/#early-access"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
              >
                Book a Demo
                {Icons.arrow}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// MAIN EXPORT
// ==============================================

export default function WhyRiskcoreVariationF() {
  return (
    <div className="pt-20">
      <ProblemSection />
      <ImpactSection />
      <SolutionSection />
      <FeaturesSection />
    </div>
  )
}
