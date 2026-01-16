'use client'

/**
 * Why RISKCORE - Variation E: "Executive Clean"
 *
 * Premium, minimalist design with:
 * - Refined custom SVG icons (no emojis)
 * - Consistent spacing and margins
 * - Large typography with proper hierarchy
 * - Subtle glow effects and premium cards
 * - Smooth, professional animations
 */

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

// ==============================================
// CUSTOM SVG ICONS (Premium, consistent style)
// ==============================================

const Icons = {
  silos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="2" y="3" width="6" height="18" rx="1" />
      <rect x="9" y="3" width="6" height="18" rx="1" />
      <rect x="16" y="3" width="6" height="18" rx="1" />
      <path d="M5 8h0M12 8h0M19 8h0" strokeWidth="2" />
    </svg>
  ),
  spreadsheet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
      <path d="M16 16l2 2" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <circle cx="12" cy="16" r="1" />
    </svg>
  ),
  overlap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      <path d="M8 12h.01M12 12h.01M16 12h.01" strokeWidth="2" />
    </svg>
  ),
  correlation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M3 3v18h18" />
      <circle cx="8" cy="14" r="2" />
      <circle cx="13" cy="9" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M8 14l5-5M13 9l5-3" strokeDasharray="3 3" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
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
// ANIMATION VARIANTS
// ==============================================

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

// ==============================================
// SECTION 1: THE PROBLEM
// ==============================================

const painPoints = [
  {
    icon: Icons.silos,
    title: 'Siloed Systems',
    description: 'Each PM uses their preferred tools. Bloomberg, Axioma, Excel, proprietary systems. No unified view exists.',
    color: '#ef4444',
  },
  {
    icon: Icons.spreadsheet,
    title: 'Manual Aggregation',
    description: 'Risk teams spend hours copying data into spreadsheets. Errors are inevitable. Updates lag behind markets.',
    color: '#f59e0b',
  },
  {
    icon: Icons.clock,
    title: 'Delayed Visibility',
    description: "By the time risk reports reach management, positions have changed. You're always looking at yesterday's risk.",
    color: '#f97316',
  },
  {
    icon: Icons.lock,
    title: 'Vendor Lock-in',
    description: "Enterprise platforms cost millions and take years to implement. Then you're stuck with their limitations.",
    color: '#a855f7',
  },
]

function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0f1a 0%, #0f172a 100%)' }}>
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '64px 64px'
      }} />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-sm font-semibold tracking-wide uppercase">The Problem</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            The Multi-Manager Risk{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Challenge</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Managing firm-wide risk across multiple PMs shouldn't require a PhD in spreadsheet gymnastics.
          </motion.p>
        </motion.div>

        {/* Pain Point Cards */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-5"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group relative p-8 rounded-2xl bg-slate-900/50 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
              style={{ boxShadow: `0 0 0 1px ${point.color}08` }}
            >
              <div className="flex items-start gap-5">
                <div
                  className="flex-shrink-0 p-3.5 rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${point.color}12`, color: point.color }}
                >
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{point.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{point.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Visual Flow */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20"
        >
          <div className="max-w-3xl mx-auto p-10 rounded-2xl bg-slate-900/40 border border-white/[0.06]">
            <p className="text-center text-slate-500 text-sm uppercase tracking-widest mb-8 font-medium">
              Sound Familiar?
            </p>

            {/* System Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['Bloomberg', 'Axioma', 'Excel', 'Python', 'Proprietary'].map((system) => (
                <span
                  key={system}
                  className="px-5 py-2.5 bg-slate-800/60 border border-white/[0.08] rounded-lg text-slate-300 text-sm font-medium hover:border-white/20 transition-colors cursor-default"
                >
                  {system}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <div className="flex justify-center mb-10">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="p-3 rounded-full bg-red-500/10"
              >
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>

            {/* Result */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-red-400 font-semibold text-lg">Risk Report</p>
                  <p className="text-slate-500 text-sm">2 days late, 47 errors</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 2: THE COST
// ==============================================

const impactStats = [
  {
    number: '2-8',
    unit: 'Hours',
    title: 'No Unified Firm-Wide View',
    description: 'Simple questions like "What\'s our total AAPL exposure?" take hours. CROs are flying blind.',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    number: '47+',
    unit: 'Errors',
    title: 'Manual Spreadsheet Hell',
    description: 'Risk teams copy data into Excel. Each PM has their own system. Errors are inevitable.',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    number: '$500K+',
    unit: 'Per Year',
    title: 'Legacy Platform Costs',
    description: 'Enterprise platforms cost $100K-$500K+ annually and take 12-18 months to implement.',
    gradient: 'from-amber-500 to-red-500',
  },
]

function ImpactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #131c2e 100%)' }}>
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/[0.03] rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-full mb-8"
          >
            <span className="text-red-400 text-sm font-semibold tracking-wide uppercase">The Cost of Inaction</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Every Day Without Unified Risk{' '}
            <span className="text-red-400">Costs You</span>
          </motion.h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-3 gap-6"
        >
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative p-8 rounded-2xl bg-slate-900/60 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
            >
              <div className="mb-6">
                <span className={`text-5xl lg:text-6xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.number}
                </span>
                <span className="block text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">
                  {stat.unit}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{stat.title}</h3>
              <p className="text-slate-400 leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 3: THE DIFFERENCE
// ==============================================

const differences = [
  {
    icon: Icons.overlap,
    title: 'Cross-PM Overlap Detection',
    before: 'Discovering overlap after concentrated positions blow up',
    after: 'Real-time alerts the moment firm-wide concentration emerges',
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
    after: 'Proprietary engine reveals risk relationships across all books',
    color: '#a855f7',
  },
]

function DifferenceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #131c2e 0%, #0f172a 100%)' }}>
      {/* Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[120px]" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">The RISKCORE Difference</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Built for Multi-Manager{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">From Day One</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Other platforms were built for single PMs and stretched to fit. RISKCORE was architected from scratch for firm-wide visibility.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          {differences.map((diff, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-8 rounded-2xl bg-slate-900/40 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                {/* Icon & Title */}
                <div className="lg:w-1/3 flex items-center gap-4">
                  <div
                    className="p-3.5 rounded-xl"
                    style={{ backgroundColor: `${diff.color}12`, color: diff.color }}
                  >
                    {diff.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{diff.title}</h3>
                </div>

                {/* Before / After */}
                <div className="lg:w-2/3 grid md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-red-500/[0.06] border border-red-500/10">
                    <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">Before</span>
                    <p className="text-slate-300 mt-2 leading-relaxed">{diff.before}</p>
                  </div>
                  <div
                    className="p-5 rounded-xl border"
                    style={{ backgroundColor: `${diff.color}06`, borderColor: `${diff.color}15` }}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: diff.color }}>After</span>
                    <p className="text-slate-300 mt-2 leading-relaxed">{diff.after}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 4: FEATURES DEEP DIVE
// ==============================================

const features = [
  {
    id: 'overlap',
    badge: 'Industry First',
    title: 'Cross-PM Overlap Detection',
    headline: 'See what no one else can see',
    description: 'When PM Alpha buys 100K shares of AAPL and PM Beta already holds 200K, you need to know immediately. RISKCORE alerts you in real-time when firm-wide concentration risk emerges.',
    benefits: ['Real-time position overlap alerts', 'Firm-wide concentration limits', 'Automatic PM notification', 'Historical overlap analysis'],
    color: '#22c55e',
    gradient: 'from-emerald-400 to-green-500',
  },
  {
    id: 'nlp',
    badge: 'AI-Powered',
    title: 'Natural Language Queries',
    headline: 'Ask questions, get answers',
    description: '"What\'s our total tech exposure?" "Show me our largest positions across all books." "Which PMs have exposure to China?" Ask in plain English, get instant answers.',
    benefits: ['Claude AI integration', 'No SQL knowledge required', 'Instant query results', 'Exportable reports'],
    color: '#3b82f6',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'correlation',
    badge: 'Proprietary',
    title: 'Cross-PM Correlation Framework',
    headline: 'Hidden risks, revealed',
    description: 'Traditional tools analyze each PM in isolation. Our proprietary correlation engine reveals hidden risk relationships between strategies that other platforms miss entirely.',
    benefits: ['Strategy correlation analysis', 'Factor decomposition', 'Tail risk identification', 'Scenario stress testing'],
    color: '#a855f7',
    gradient: 'from-purple-400 to-pink-500',
  },
]

function OverlapVisual() {
  return (
    <div className="bg-slate-900/80 rounded-xl border border-white/[0.08] p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-5">
        <span className="text-slate-500 text-sm font-medium">Overlap Alerts</span>
        <span className="px-2.5 py-1 bg-red-500/15 text-red-400 text-xs font-semibold rounded-md">LIVE</span>
      </div>
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-emerald-500/15"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-white">AAPL</span>
            <span className="text-slate-500 text-sm">PM Alpha + PM Beta</span>
          </div>
          <span className="text-emerald-400 font-semibold">300K shares</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-amber-500/15"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-white">NVDA</span>
            <span className="text-slate-500 text-sm">3 PMs overlapping</span>
          </div>
          <span className="text-amber-400 font-semibold">Near limit</span>
        </motion.div>
      </div>
    </div>
  )
}

function ChatVisual() {
  const [showResponse, setShowResponse] = useState(false)

  return (
    <div className="bg-slate-900/80 rounded-xl border border-white/[0.08] p-6 backdrop-blur-sm">
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onAnimationComplete={() => setTimeout(() => setShowResponse(true), 600)}
          className="flex justify-end"
        >
          <div className="bg-blue-500/15 border border-blue-500/20 rounded-2xl rounded-br-md px-4 py-3 max-w-[85%]">
            <p className="text-slate-200 text-sm">What's our total tech exposure across all books?</p>
          </div>
        </motion.div>
        {showResponse && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-slate-800/60 border border-white/[0.08] rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%]">
              <p className="text-slate-200 text-sm">
                Total tech sector exposure: <span className="text-emerald-400 font-semibold">$847.2M</span>
              </p>
              <p className="text-slate-500 text-xs mt-1">Across 5 PMs, 23.4% of AUM</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function CorrelationVisual() {
  return (
    <div className="bg-slate-900/80 rounded-xl border border-white/[0.08] p-6 backdrop-blur-sm">
      <p className="text-slate-500 text-sm font-medium text-center mb-5">Cross-PM Correlation Matrix</p>
      <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
        <div className="p-2" />
        <div className="p-2 text-slate-500 font-medium">Alpha</div>
        <div className="p-2 text-slate-500 font-medium">Beta</div>
        <div className="p-2 text-slate-500 font-medium">Gamma</div>

        <div className="p-2 text-slate-500 font-medium">Alpha</div>
        <div className="p-2.5 bg-emerald-500/30 rounded-lg text-emerald-300 font-semibold">1.00</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-2.5 bg-amber-500/30 rounded-lg text-amber-300 font-semibold"
        >0.72</motion.div>
        <div className="p-2.5 bg-slate-700/40 rounded-lg text-slate-400 font-medium">0.15</div>

        <div className="p-2 text-slate-500 font-medium">Beta</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-2.5 bg-amber-500/30 rounded-lg text-amber-300 font-semibold"
        >0.72</motion.div>
        <div className="p-2.5 bg-emerald-500/30 rounded-lg text-emerald-300 font-semibold">1.00</div>
        <div className="p-2.5 bg-slate-700/40 rounded-lg text-slate-400 font-medium">0.23</div>

        <div className="p-2 text-slate-500 font-medium">Gamma</div>
        <div className="p-2.5 bg-slate-700/40 rounded-lg text-slate-400 font-medium">0.15</div>
        <div className="p-2.5 bg-slate-700/40 rounded-lg text-slate-400 font-medium">0.23</div>
        <div className="p-2.5 bg-emerald-500/30 rounded-lg text-emerald-300 font-semibold">1.00</div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-amber-400 text-xs text-center mt-4 font-medium"
      >
        Alpha & Beta show high correlation — investigate
      </motion.p>
    </div>
  )
}

function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const visuals: Record<string, React.ReactNode> = {
    overlap: <OverlapVisual />,
    nlp: <ChatVisual />,
    correlation: <CorrelationVisual />,
  }

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0a0f1a 100%)' }}>
      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8"
          >
            <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">See It In Action</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Three Capabilities{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">No One Else Has</span>
          </motion.h2>
        </motion.div>

        <div className="space-y-28">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}
            >
              {/* Content */}
              <div className="flex-1">
                <span
                  className="inline-block px-3 py-1.5 rounded-full text-white text-xs font-semibold mb-6"
                  style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}99)` }}
                >
                  {feature.badge}
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{feature.title}</h3>
                <p className={`text-lg font-medium mb-5`} style={{ color: feature.color }}>{feature.headline}</p>
                <p className="text-slate-400 leading-relaxed mb-8">{feature.description}</p>

                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-emerald-400">{Icons.check}</span>
                      <span className="text-slate-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="flex-1 w-full max-w-md lg:max-w-none">
                {visuals[feature.id]}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-28"
        >
          <div className="inline-block p-10 bg-gradient-to-br from-emerald-500/[0.08] to-blue-500/[0.08] border border-emerald-500/20 rounded-2xl">
            <p className="text-2xl sm:text-3xl font-bold text-white mb-4">
              "Don't replace PM systems.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Aggregate them.</span>"
            </p>
            <p className="text-slate-400 mb-8">
              Open source. Deploy in days. No vendor lock-in.
            </p>
            <a
              href="/#early-access"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
            >
              Book a Demo
              {Icons.arrow}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// MAIN EXPORT
// ==============================================

export default function WhyRiskcoreVariationE() {
  return (
    <div className="pt-20">
      <ProblemSection />
      <ImpactSection />
      <DifferenceSection />
      <FeaturesSection />
    </div>
  )
}
