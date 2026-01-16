'use client'

/**
 * Why RISKCORE - Variation D: Combined Best Elements
 *
 * Structure:
 * 1. The Problem (modified) - Clean cards with modern SVG icons
 * 2. Pain Points with Impact Numbers (from Variation A)
 * 3. The RISKCORE Difference - Before/After (from Variation C)
 * 4. Deep Dive Features with Interactive Visuals (from Variation B)
 */

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

// ==============================================
// SECTION 1: THE PROBLEM (MODIFIED)
// ==============================================

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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Vendor Lock-in',
    description: "Enterprise risk platforms cost millions and take years to implement. Then you're stuck with their limitations.",
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

function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0f1a, #151E31)' }}>
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
          {/* "The Problem" Badge - Blue border, rounded-full (pill shape) */}
          <motion.div
            className="inline-block px-6 py-3 rounded-full mb-8"
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              border: '2px solid #3b82f6',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-lg font-bold uppercase tracking-wider" style={{ color: '#3b82f6' }}>The Problem</span>
          </motion.div>

          {/* Title - One line, "Challenge" in blue */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 whitespace-nowrap">
            The Multi-Manager Risk <span style={{ color: '#3b82f6' }}>Challenge</span>
          </h1>

          {/* Subtitle - Bigger and white */}
          <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto">
            Managing firm-wide risk across multiple PMs shouldn't require a PhD in spreadsheet gymnastics.
          </p>
        </motion.div>

        {/* Pain Points Grid - Cards with hex colors */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
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

        {/* Visual: System boxes - No border, pushed down */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-[10%] max-w-4xl mx-auto"
        >
          <div className="p-12">
            {/* Sound Familiar - Bigger */}
            <p className="text-center text-white text-2xl md:text-3xl uppercase tracking-widest mb-12 font-bold">
              Sound Familiar?
            </p>

            {/* System boxes - Colored borders matching cards above */}
            <div className="flex flex-wrap justify-center items-center gap-5 mb-16">
              {[
                { name: 'Bloomberg', color: '#397EEE' },
                { name: 'Axioma', color: '#22C55E' },
                { name: 'Excel', color: '#A855F7' },
                { name: 'Python', color: '#06B6D4' },
                { name: 'Proprietary', color: '#EAB308' },
              ].map((system) => (
                <div
                  key={system.name}
                  className="px-8 py-4 bg-slate-800/60 rounded-xl text-white text-lg font-semibold hover:bg-slate-700/80 transition-all duration-200"
                  style={{ border: `2px solid ${system.color}` }}
                >
                  {system.name}
                </div>
              ))}
            </div>

            {/* Arrow - Same spacing above and below */}
            <div className="flex justify-center py-16">
              <motion.svg
                className="w-12 h-20 text-red-500"
                fill="none"
                viewBox="0 0 24 40"
                stroke="currentColor"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 2v32m0 0l-8-8m8 8l8-8" />
              </motion.svg>
            </div>

            {/* Risk Report box - Compact, balanced design */}
            <div className="flex justify-center">
              <div
                className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  border: '2px solid #ef4444',
                }}
              >
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-red-500 font-bold text-xl">Risk Report</span>
                <span className="text-slate-400 mx-2">|</span>
                <span className="text-slate-300 text-lg">2 days late, 47 errors</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 2: PAIN POINTS WITH IMPACT NUMBERS (from Variation A)
// ==============================================

const impactPoints = [
  {
    number: '2-8',
    unit: 'HOURS',
    title: 'No Unified Firm-Wide Risk View',
    description: 'Simple questions like "What\'s our total AAPL exposure?" take hours or even days. CROs are flying blind while PMs operate in silos.',
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
  },
  {
    number: '47+',
    unit: 'ERRORS',
    title: 'Data Silos & Manual Spreadsheets',
    description: 'Risk teams spend endless hours copying data into Excel. Each PM has their own system. Errors are inevitable, updates always lag behind markets.',
    color: 'from-orange-500 to-yellow-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
  },
  {
    number: '$500K+',
    unit: 'ANNUALLY',
    title: 'Prohibitively Expensive Platforms',
    description: 'Legacy risk platforms cost $100K-$500K+ per year and take 12-18 months to implement. Then you\'re locked into their limitations forever.',
    color: 'from-yellow-500 to-red-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
  },
]

function ImpactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #151E31, #0f172a)' }}>
      {/* Red gradient orb for pain emphasis */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            The Cost of Inaction
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-6">
            Every Day Without Unified Risk
            <span className="text-red-400"> Costs You</span>
          </h2>
        </motion.div>

        {/* Impact Cards */}
        <motion.div
          ref={ref}
          className="grid lg:grid-cols-3 gap-8"
        >
          {impactPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              className={`relative ${point.bgColor} border ${point.borderColor} rounded-2xl p-8 hover:border-white/20 transition-all duration-300`}
            >
              {/* Big Impact Number */}
              <div className="mb-6">
                <span className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${point.color} bg-clip-text text-transparent`}>
                  {point.number}
                </span>
                <span className="block text-sm font-medium text-slate-400 uppercase tracking-wider mt-1">
                  {point.unit}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-3">
                {point.title}
              </h3>

              <p className="text-slate-400 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 3: THE RISKCORE DIFFERENCE (from Variation C)
// ==============================================

function DifferenceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const differences = [
    {
      icon: '🎯',
      title: 'Cross-PM Overlap Detection',
      before: 'Discovering overlap after concentrated positions blow up',
      after: 'Real-time alerts the moment firm-wide concentration emerges',
      color: 'emerald',
    },
    {
      icon: '💬',
      title: 'Natural Language Queries',
      before: '"Let me export this data and run some SQL queries..."',
      after: '"What\'s our total semiconductor exposure?" — Instant answer.',
      color: 'blue',
    },
    {
      icon: '📊',
      title: 'Cross-PM Correlation',
      before: 'Each PM analyzed in isolation. Hidden correlations missed.',
      after: 'Proprietary engine reveals risk relationships across all books',
      color: 'purple',
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0f172a, #151E31)' }}>
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[120px]" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            What Makes Us Different
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-6">
            Built for Multi-Manager
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"> From Day One</span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Other platforms were built for single PMs and stretched to fit. RISKCORE was architected from scratch for firm-wide visibility.
          </p>
        </motion.div>

        {/* Differences */}
        <div className="space-y-8">
          {differences.map((diff, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              className="bg-slate-800/40 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                {/* Title */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-4xl">{diff.icon}</span>
                    <h3 className="text-2xl font-bold text-slate-100">{diff.title}</h3>
                  </div>
                </div>

                {/* Before/After */}
                <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                    <span className="text-red-400 text-sm font-semibold uppercase tracking-wider">Before</span>
                    <p className="text-slate-300 mt-2">{diff.before}</p>
                  </div>
                  <div className="rounded-xl p-5"
                    style={{
                      background: diff.color === 'emerald' ? 'rgba(16, 185, 129, 0.05)' :
                                  diff.color === 'blue' ? 'rgba(59, 130, 246, 0.05)' :
                                  'rgba(168, 85, 247, 0.05)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: diff.color === 'emerald' ? 'rgba(16, 185, 129, 0.2)' :
                                   diff.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' :
                                   'rgba(168, 85, 247, 0.2)',
                    }}
                  >
                    <span className="text-sm font-semibold uppercase tracking-wider"
                      style={{
                        color: diff.color === 'emerald' ? '#34d399' :
                               diff.color === 'blue' ? '#60a5fa' :
                               '#c084fc',
                      }}
                    >After</span>
                    <p className="text-slate-300 mt-2">{diff.after}</p>
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
// SECTION 4: DEEP DIVE FEATURES (from Variation B)
// ==============================================

const features = [
  {
    id: 'overlap',
    badge: 'Industry First',
    title: 'Cross-PM Overlap Detection',
    headline: 'See what no one else can see',
    description: 'When PM Alpha buys 100K shares of AAPL and PM Beta already holds 200K, you need to know immediately. RISKCORE alerts you in real-time when firm-wide concentration risk emerges.',
    benefits: [
      'Real-time position overlap alerts',
      'Firm-wide concentration limits',
      'Automatic PM notification',
      'Historical overlap analysis',
    ],
    visual: 'overlap',
    color: 'emerald',
    gradient: 'from-emerald-400 to-green-500',
  },
  {
    id: 'nlp',
    badge: 'AI-Powered',
    title: 'Natural Language Queries',
    headline: 'Ask questions, get answers',
    description: '"What\'s our total tech exposure?" "Show me our largest positions across all books." "Which PMs have exposure to China?" Ask in plain English, get instant answers.',
    benefits: [
      'Claude AI integration',
      'No SQL knowledge required',
      'Instant query results',
      'Exportable reports',
    ],
    visual: 'chat',
    color: 'blue',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'correlation',
    badge: 'Proprietary',
    title: 'Cross-PM Correlation Framework',
    headline: 'Hidden risks, revealed',
    description: 'Traditional tools analyze each PM in isolation. Our proprietary correlation engine reveals hidden risk relationships between strategies that other platforms miss entirely.',
    benefits: [
      'Strategy correlation analysis',
      'Factor decomposition',
      'Tail risk identification',
      'Scenario stress testing',
    ],
    visual: 'correlation',
    color: 'purple',
    gradient: 'from-purple-400 to-pink-500',
  },
]

function OverlapVisual() {
  return (
    <div className="bg-slate-900/80 rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-400 text-sm">Overlap Alert</span>
        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">LIVE</span>
      </div>
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg border border-emerald-500/20"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">AAPL</span>
            <span className="text-slate-400">PM Alpha + PM Beta</span>
          </div>
          <span className="text-emerald-400 font-bold">300K shares</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg border border-yellow-500/20"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">NVDA</span>
            <span className="text-slate-400">3 PMs overlapping</span>
          </div>
          <span className="text-yellow-400 font-bold">Near limit</span>
        </motion.div>
      </div>
    </div>
  )
}

function ChatVisual() {
  const [showResponse, setShowResponse] = useState(false)

  return (
    <div className="bg-slate-900/80 rounded-xl border border-white/10 p-6">
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onAnimationComplete={() => setTimeout(() => setShowResponse(true), 500)}
          className="flex justify-end"
        >
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
            <p className="text-slate-200">What's our total tech exposure across all books?</p>
          </div>
        </motion.div>
        {showResponse && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl rounded-tl-md px-4 py-3 max-w-[80%]">
              <p className="text-slate-200 mb-2">Total tech sector exposure: <span className="text-emerald-400 font-bold">$847.2M</span></p>
              <p className="text-slate-400 text-sm">Across 5 PMs, 23.4% of AUM</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function CorrelationVisual() {
  return (
    <div className="bg-slate-900/80 rounded-xl border border-white/10 p-6">
      <div className="text-center mb-4">
        <span className="text-slate-400 text-sm">Cross-PM Correlation Matrix</span>
      </div>
      <div className="grid grid-cols-4 gap-1 text-center text-xs">
        <div className="p-2"></div>
        <div className="p-2 text-slate-400">Alpha</div>
        <div className="p-2 text-slate-400">Beta</div>
        <div className="p-2 text-slate-400">Gamma</div>

        <div className="p-2 text-slate-400">Alpha</div>
        <div className="p-2 bg-emerald-500/40 rounded">1.00</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-2 bg-yellow-500/40 rounded"
        >0.72</motion.div>
        <div className="p-2 bg-slate-700/40 rounded">0.15</div>

        <div className="p-2 text-slate-400">Beta</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-2 bg-yellow-500/40 rounded"
        >0.72</motion.div>
        <div className="p-2 bg-emerald-500/40 rounded">1.00</div>
        <div className="p-2 bg-slate-700/40 rounded">0.23</div>

        <div className="p-2 text-slate-400">Gamma</div>
        <div className="p-2 bg-slate-700/40 rounded">0.15</div>
        <div className="p-2 bg-slate-700/40 rounded">0.23</div>
        <div className="p-2 bg-emerald-500/40 rounded">1.00</div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-yellow-400 text-xs text-center mt-3"
      >
        Alpha & Beta show high correlation - investigate
      </motion.p>
    </div>
  )
}

function FeatureDeepDive() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const visuals: Record<string, React.ReactNode> = {
    overlap: <OverlapVisual />,
    chat: <ChatVisual />,
    correlation: <CorrelationVisual />,
  }

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #151E31, #0a0f1a)' }}>
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            See It In Action
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-6">
            Three Capabilities
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"> No One Else Has</span>
          </h2>
        </motion.div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
              {/* Content */}
              <div className="flex-1">
                <span className={`inline-block px-3 py-1 bg-gradient-to-r ${feature.gradient} rounded-full text-white text-xs font-semibold mb-6`}>
                  {feature.badge}
                </span>

                <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
                  {feature.title}
                </h3>

                <p className={`text-xl font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mb-6`}>
                  {feature.headline}
                </p>

                <p className="text-lg text-slate-400 leading-relaxed mb-8">
                  {feature.description}
                </p>

                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="flex-1 w-full max-w-md lg:max-w-none">
                {visuals[feature.visual]}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-24"
        >
          <div className="inline-block p-8 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-2xl">
            <p className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
              "Don't replace PM systems.
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"> Aggregate them.</span>"
            </p>
            <p className="text-slate-400 mb-6">
              Open source. Deploy in days. No vendor lock-in.
            </p>
            <a
              href="/#early-access"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            >
              Book a Demo
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// MAIN PAGE COMPONENT
// ==============================================

export default function WhyRiskcoreVariationD() {
  return (
    <div className="pt-20">
      <ProblemSection />
      <ImpactSection />
      <DifferenceSection />
      <FeatureDeepDive />
    </div>
  )
}
