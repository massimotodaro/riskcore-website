'use client'

/**
 * Why RISKCORE - Variation A: Problem/Solution Split
 *
 * Structure:
 * 1. Pain Points Hero - Big impact numbers, time/cost wasted
 * 2. Unique Features - The 3 things no one else offers
 * 3. How RISKCORE Solves It - Simple flow diagram
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ==============================================
// SECTION 1: THE PAIN POINTS
// ==============================================

const painPoints = [
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

function PainPointsSection() {
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
            The Multi-Manager Risk Nightmare
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6">
            Why Existing Solutions
            <br />
            <span className="text-red-400">Fail Multi-Manager Funds</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Every multi-manager fund faces the same impossible choice: expensive legacy platforms or fragmented data chaos.
          </p>
        </motion.div>

        {/* Pain Points Grid */}
        <motion.div
          ref={ref}
          className="grid lg:grid-cols-3 gap-8"
        >
          {painPoints.map((point, index) => (
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

        {/* Transition Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl md:text-3xl font-bold text-slate-300 italic">
            "There has to be a better way..."
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 2: UNIQUE FEATURES
// ==============================================

const uniqueFeatures = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    badge: 'Industry First',
    title: 'Cross-PM Overlap Detection',
    subtitle: 'Real-time visibility no one else offers',
    description: 'Instantly see when multiple PMs hold the same positions. Get real-time alerts when firm-wide concentration risk emerges—before it becomes a problem.',
    features: ['Real-time alerting', 'Concentration warnings', 'Position reconciliation', 'Firm-wide limits'],
    color: 'from-emerald-400 to-green-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    badge: 'AI-Powered',
    title: 'Natural Language Queries',
    subtitle: 'Claude AI built-in for instant answers',
    description: '"What\'s our total tech exposure across all books?" Ask questions in plain English and get instant, accurate answers—no SQL, no exports, no waiting.',
    features: ['Plain English queries', 'Instant answers', 'Custom reports', 'Audit trails'],
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    badge: 'Proprietary',
    title: 'Cross-PM Correlation',
    subtitle: 'See hidden relationships across books',
    description: 'Our proprietary correlation framework reveals hidden risk relationships between PM strategies that traditional tools miss entirely.',
    features: ['Strategy correlation', 'Hidden risk detection', 'Factor analysis', 'Stress scenarios'],
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
]

function UniqueFeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #151E31, #0f172a)' }}>
      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            What Makes RISKCORE Different
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            Features
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"> No One Else Offers</span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Built from the ground up for multi-manager funds. Not a single-PM tool stretched to fit.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          className="grid lg:grid-cols-3 gap-8"
        >
          {uniqueFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              className={`relative ${feature.bgColor} border ${feature.borderColor} rounded-2xl p-8 hover:border-white/30 transition-all duration-300 group`}
            >
              {/* Badge */}
              <span className={`inline-block px-3 py-1 bg-gradient-to-r ${feature.color} rounded-full text-white text-xs font-semibold mb-6`}>
                {feature.badge}
              </span>

              {/* Icon */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">{feature.icon}</div>
              </div>

              <h3 className="text-2xl font-bold text-slate-100 mb-2">
                {feature.title}
              </h3>

              <p className={`text-sm font-medium bg-gradient-to-r ${feature.color} bg-clip-text text-transparent mb-4`}>
                {feature.subtitle}
              </p>

              <p className="text-slate-400 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2">
                {feature.features.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-400 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 3: HOW RISKCORE SOLVES IT
// ==============================================

function HowItSolvesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    { label: 'Connect', icon: '🔌', desc: 'Any data source' },
    { label: 'Aggregate', icon: '📊', desc: 'Unified view' },
    { label: 'Query', icon: '💬', desc: 'Natural language' },
    { label: 'Act', icon: '⚡', desc: 'Real-time alerts' },
  ]

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0f172a, #0a0f1a)' }}>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            From Chaos to Clarity in
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"> 4 Steps</span>
          </h2>
        </motion.div>

        {/* Steps Flow */}
        <motion.div
          ref={ref}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 mb-16"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-4xl mb-3">
                  {step.icon}
                </div>
                <span className="text-slate-100 font-semibold">{step.label}</span>
                <span className="text-slate-500 text-sm">{step.desc}</span>
              </div>

              {index < steps.length - 1 && (
                <svg className="hidden md:block w-8 h-8 text-emerald-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Key Value Prop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
            <p className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
              "Don't replace PM systems.
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"> Aggregate them.</span>"
            </p>
            <p className="text-slate-400">
              Deploy in days, not months. Open source. No vendor lock-in.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="/#early-access"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
          >
            Book a Demo
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// MAIN PAGE COMPONENT
// ==============================================

export default function WhyRiskcoreVariationA() {
  return (
    <div className="pt-20">
      <PainPointsSection />
      <UniqueFeaturesSection />
      <HowItSolvesSection />
    </div>
  )
}
