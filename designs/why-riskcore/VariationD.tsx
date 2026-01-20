'use client'

/**
 * Why RISKCORE - Variation D: Combined Best Elements
 *
 * Structure:
 * 1. The Problem (modified) - Using shared WhyRiskcoreHero component
 * 2. Pain Points with Impact Numbers (from Variation A)
 * 3. The RISKCORE Difference - Before/After (from Variation C)
 * 4. Deep Dive Features with Interactive Visuals (from Variation B)
 */

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import WhyRiskcoreHero from '@/components/home/WhyRiskcoreHero'
import { TimeTravelSection, DashboardPreview, Features, FixedChallengesArrow } from '@/components'
import CorrelationFramework from '@/components/problems/CorrelationFramework'
import NativeAISection from '@/components/problems/NativeAISection'

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

// Source systems data
const sourceSystems = [
  { name: 'Bloomberg PORT', color: '#f97316', format: '.xlsx' },
  { name: 'Enfusion', color: '#22c55e', format: 'REST API' },
  { name: 'Eze Eclipse', color: '#a855f7', format: 'FIX' },
  { name: 'Excel + Python', color: '#3b82f6', format: 'CSV' },
  { name: 'Axioma', color: '#22d3ee', format: 'Proprietary' },
]

function DifferenceSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-transparent">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[120px]" />

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

        {/* Aggregation Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* 3 Column Layout - Centered and Bigger */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 max-w-5xl mx-auto">

            {/* Column 1: Source Systems */}
            <div className="lg:w-[35%] space-y-3">
              {sourceSystems.map((system, index) => (
                <motion.div
                  key={system.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  className="bg-[#1e293b]/90 backdrop-blur-sm border rounded-xl p-4 flex items-center gap-4"
                  style={{ borderColor: `${system.color}40` }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${system.color}20`, border: `1px solid ${system.color}40` }}
                  >
                    <svg className="w-5 h-5" style={{ color: system.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6M12 9v6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-100 text-sm">{system.name}</p>
                    <p className="text-xs text-slate-500">({system.format})</p>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.2 }}
                  >
                    <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Column 2: Animated Flow Lines */}
            <div className="lg:w-[15%] flex items-center justify-center py-8 lg:py-0">
              <svg className="w-full h-32 lg:h-64" viewBox="0 0 100 200" preserveAspectRatio="xMidYMid meet">
                {/* Animated flowing lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.path
                    key={i}
                    d={`M0 ${20 + i * 40} Q50 ${20 + i * 40} 50 100 T100 100`}
                    stroke={sourceSystems[i].color}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0, opacity: 0.3 }}
                    animate={{ pathLength: 1, opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </svg>
            </div>

            {/* Column 3: RISKCORE */}
            <div className="lg:w-[50%]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="relative"
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-green-500/20 rounded-2xl blur-xl" />

                <div className="relative bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/40 rounded-2xl p-8">
                  {/* RISKCORE Logo/Title */}
                  <div className="text-center mb-6">
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(16, 185, 129, 0.2)',
                          '0 0 40px rgba(16, 185, 129, 0.4)',
                          '0 0 20px rgba(16, 185, 129, 0.2)'
                        ]
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="inline-block px-6 py-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl mb-4"
                    >
                      <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                        RISKCORE
                      </span>
                    </motion.div>
                    <p className="text-slate-400 text-sm">Unified Risk Aggregation Platform</p>
                  </div>

                  {/* Output capabilities */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/60 rounded-lg p-3 text-center border border-blue-500/30">
                      <p className="text-blue-400 font-semibold text-sm">Firm-Wide View</p>
                      <p className="text-slate-500 text-xs">All books, one dashboard</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-3 text-center border border-orange-500/30">
                      <p className="text-orange-400 font-semibold text-sm">Real-Time</p>
                      <p className="text-slate-500 text-xs">Live position updates</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-3 text-center border border-purple-500/30">
                      <p className="text-purple-400 font-semibold text-sm">Correlation</p>
                      <p className="text-slate-500 text-xs">Cross-PM analysis</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-3 text-center border border-cyan-500/30">
                      <p className="text-cyan-400 font-semibold text-sm">Time Travel</p>
                      <p className="text-slate-500 text-xs">Historical snapshots</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tagline underneath */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-2xl md:text-3xl font-medium text-slate-100 text-center mt-12"
          >
            "Don't replace PM systems. <span className="text-orange-400">Aggregate them.</span>"
          </motion.p>
        </motion.div>
      </div>
      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </section>
  )
}

// ==============================================
// SECTION 4: CTA
// ==============================================

function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // Honeypot field
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage("We'll be in touch within 24 hours.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch {
      setStatus('error')
      setMessage('Failed to connect. Please try again.')
    }
  }

  return (
    <section className="relative py-24 overflow-hidden bg-transparent">
      <div ref={ref} className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="p-8 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-2xl">
            <p className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
              Ready to see how <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">RISKCORE</span> integrates with your trading system seamlessly?
            </p>
            <p className="text-lg text-slate-400 mb-6">
              Book a 30-minute demo. We&apos;ll show you RISKCORE with your data schema.
            </p>

            {/* Email Form */}
            {status === 'success' ? (
              <motion.div
                className="py-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-emerald-400">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-emerald-400">{message}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="absolute -left-[9999px] opacity-0 pointer-events-none"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="flex-1 relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-800/80 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-lg transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === 'loading' ? (
                    <svg className="animate-spin w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    'Book a Demo'
                  )}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-center text-red-400 text-sm mt-3">{message}</p>
            )}

            <p className="text-slate-500 text-xs mt-4">
              We respect your inbox. No spam, just updates on your demo.
            </p>
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
    <div
      className="pt-20"
      style={{
        background: 'linear-gradient(180deg, #0a0f1a 0%, #0f172a 10%, #151E31 25%, #1a2744 45%, #151E31 65%, #0f172a 80%, #0d1424 90%, #0a0f1a 100%)'
      }}
    >
      <FixedChallengesArrow />
      <DifferenceSection />
      <Features />
      <DashboardPreview />
      <TimeTravelSection />
      <CorrelationFramework />
      <NativeAISection />
      <CTASection />
    </div>
  )
}
