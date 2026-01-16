'use client'

/**
 * Why RISKCORE - Variation C: Story-Driven Narrative
 *
 * Structure:
 * 1. The Story - A day in the life narrative about risk challenges
 * 2. The RISKCORE Difference - Feature showcase with storytelling
 * 3. The Transformation - Before/After with live demo preview
 */

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ==============================================
// SECTION 1: THE STORY
// ==============================================

function StorySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const storyBeats = [
    {
      time: '8:47 AM',
      title: 'The Question',
      story: 'Your CEO asks a simple question: "What\'s our firm-wide exposure to semiconductors?" You know the answer should take seconds. But it won\'t.',
      highlight: 'Should take seconds.',
      mood: 'neutral',
    },
    {
      time: '9:15 AM',
      title: 'The Hunt Begins',
      story: 'You email PM Alpha for their positions. PM Beta uses a different system—you\'ll need to export that manually. PM Gamma? Still using Excel.',
      highlight: 'Different systems. Different formats.',
      mood: 'warning',
    },
    {
      time: '2:30 PM',
      title: 'The Reconciliation',
      story: 'Six hours later, you\'re still reconciling tickers. Is "NVDA" the same as "NVIDIA Corp"? Currency conversions. Stale data. Missing fields.',
      highlight: '47 potential errors. 6 hours wasted.',
      mood: 'danger',
    },
    {
      time: '4:45 PM',
      title: 'The Outdated Answer',
      story: 'You finally have a number. But markets have moved. PM Beta traded out of half their position at lunch. Your answer is already wrong.',
      highlight: 'The answer was outdated before you sent it.',
      mood: 'danger',
    },
  ]

  return (
    <section className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0f1a, #151E31)' }}>
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-slate-800/60 border border-white/10 rounded-full text-slate-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            A Day in the Life
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6">
            Sound
            <span className="text-red-400"> Familiar?</span>
          </h1>
        </motion.div>

        {/* Story Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-slate-600 via-red-500 to-red-600" />

          {storyBeats.map((beat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
              className={`relative flex flex-col md:flex-row items-start mb-16 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Time marker */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold
                  ${beat.mood === 'danger' ? 'bg-red-500/20 border-2 border-red-500 text-red-400' :
                    beat.mood === 'warning' ? 'bg-yellow-500/20 border-2 border-yellow-500 text-yellow-400' :
                    'bg-slate-700/60 border-2 border-slate-500 text-slate-300'}`}
                >
                  {beat.time}
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 ml-28 md:ml-0 ${index % 2 === 0 ? 'md:pr-24 md:text-right' : 'md:pl-24'}`}>
                <h3 className="text-xl font-bold text-slate-100 mb-3">
                  {beat.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-3">
                  {beat.story}
                </p>
                <p className={`text-sm font-semibold
                  ${beat.mood === 'danger' ? 'text-red-400' :
                    beat.mood === 'warning' ? 'text-yellow-400' :
                    'text-slate-500'}`}
                >
                  {beat.highlight}
                </p>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>

        {/* Transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-block p-8 bg-gradient-to-b from-red-500/10 to-transparent border border-red-500/20 rounded-2xl">
            <p className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
              This happens every single day.
            </p>
            <p className="text-slate-400">
              Across thousands of multi-manager funds worldwide.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 2: THE RISKCORE DIFFERENCE
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
    <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #151E31, #0f172a)' }}>
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

          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            Built for Multi-Manager
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              From Day One
            </span>
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
                  <div className={`bg-${diff.color}-500/5 border border-${diff.color}-500/20 rounded-xl p-5`}
                    style={{
                      background: diff.color === 'emerald' ? 'rgba(16, 185, 129, 0.05)' :
                                  diff.color === 'blue' ? 'rgba(59, 130, 246, 0.05)' :
                                  'rgba(168, 85, 247, 0.05)',
                      borderColor: diff.color === 'emerald' ? 'rgba(16, 185, 129, 0.2)' :
                                   diff.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' :
                                   'rgba(168, 85, 247, 0.2)',
                    }}
                  >
                    <span className={`text-sm font-semibold uppercase tracking-wider`}
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
// SECTION 3: THE TRANSFORMATION
// ==============================================

function TransformationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0f172a, #0a0f1a)' }}>
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            From 6 Hours to
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"> 6 Seconds</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            See the transformation in action
          </p>
        </motion.div>

        {/* Live Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Mock Dashboard */}
          <motion.div style={{ y }} className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-800/60 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-slate-400 text-sm font-mono">RISKCORE Dashboard</span>
              </div>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">LIVE</span>
            </div>

            {/* Dashboard Content */}
            <div className="p-6">
              {/* Query Input */}
              <div className="bg-slate-800/60 border border-white/10 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💬</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-slate-200"
                  >
                    "What's our total semiconductor exposure across all books?"
                  </motion.span>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1, duration: 0.4 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4"
                >
                  <span className="text-slate-400 text-sm">Total Exposure</span>
                  <div className="text-3xl font-bold text-emerald-400 mt-1">$127.4M</div>
                  <span className="text-slate-500 text-sm">8.2% of AUM</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.15, duration: 0.4 }}
                  className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
                >
                  <span className="text-slate-400 text-sm">PMs with Exposure</span>
                  <div className="text-3xl font-bold text-blue-400 mt-1">4 of 7</div>
                  <span className="text-slate-500 text-sm">Alpha, Beta, Delta, Zeta</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.3, duration: 0.4 }}
                  className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4"
                >
                  <span className="text-slate-400 text-sm">Overlap Alert</span>
                  <div className="text-3xl font-bold text-yellow-400 mt-1">NVDA</div>
                  <span className="text-slate-500 text-sm">3 PMs, near limit</span>
                </motion.div>
              </div>

              {/* Response Time */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="text-center mt-6"
              >
                <span className="text-slate-500 text-sm">Response time: </span>
                <span className="text-emerald-400 font-mono font-bold">0.34 seconds</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Key Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="text-center mt-16"
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
              Experience RISKCORE
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

export default function WhyRiskcoreVariationC() {
  return (
    <div className="pt-20">
      <StorySection />
      <DifferenceSection />
      <TransformationSection />
    </div>
  )
}
