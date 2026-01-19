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
import { TimeTravelSection, DashboardPreview, Features } from '@/components'
import CorrelationFramework from '@/components/problems/CorrelationFramework'

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
    <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0f172a, #151E31)' }}>
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
          {/* 4 Column Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4">

            {/* Column 1: Tagline */}
            <div className="lg:w-[24%] text-center lg:text-left lg:-ml-4">
              <p className="text-2xl md:text-3xl font-medium text-slate-100 leading-tight">
                "Don't replace PM systems.
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">Aggregate them.</span>"
              </p>
            </div>

            {/* Column 2: Source Systems */}
            <div className="lg:w-[28%] space-y-2">
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

            {/* Column 3: Animated Flow Lines */}
            <div className="lg:w-[12%] flex items-center justify-center py-8 lg:py-0">
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

            {/* Column 4: RISKCORE */}
            <div className="lg:w-[38%]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="relative"
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl" />

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
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 4: DEEP DIVE FEATURES (from Variation B)
// ==============================================

const features = [
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
  {
    id: 'nlp',
    badge: 'AI-Powered',
    title: 'Natural Language Queries',
    headline: 'Ask questions, get answers',
    description: 'Ask in plain English, get instant answers.',
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
    id: 'hedge',
    badge: 'Industry First',
    title: 'Zero-Risk Hedge Ratios',
    headline: 'Instant hedge calculations',
    description: 'Calculate precise hedge ratios across asset classes.',
    benefits: [
      'Equity hedge calculations',
      'Rates hedge calculations',
      'Credit hedge calculations',
      'FX hedge calculations',
      'Single book or multi-book aggregation',
    ],
    visual: 'hedge',
    color: 'emerald',
    gradient: 'from-emerald-400 to-green-500',
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
  const correlationData = [
    { name: 'Alpha', values: ['1.0', '0.72', '0.31', '-0.15', '0.45', '-0.22'] },
    { name: 'Beta', values: ['0.72', '1.0', '0.18', '0.65', '-0.28', '0.41'] },
    { name: 'Gamma', values: ['0.31', '0.18', '1.0', '0.52', '-0.38', '0.15'] },
    { name: 'Delta', values: ['-0.15', '0.65', '0.52', '1.0', '-0.12', '0.68'] },
    { name: 'Macro', values: ['0.45', '-0.28', '-0.38', '-0.12', '1.0', '-0.55'] },
    { name: 'Quant', values: ['-0.22', '0.41', '0.15', '0.68', '-0.55', '1.0'] },
  ]
  const books = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Macro', 'Quant']

  return (
    <div className="bg-slate-900/80 rounded-xl border border-white/10 p-6">
      <div className="text-center mb-4">
        <span className="text-slate-400 text-sm">Cross-PM Correlation Matrix</span>
      </div>
      <div className="flex justify-center">
        <table>
          <thead>
            <tr>
              <th className="px-2 py-1 w-16"></th>
              {books.map((book) => (
                <th key={book} className="px-2 py-1 text-sm text-slate-300 font-semibold">{book}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {correlationData.map((row) => (
              <tr key={row.name}>
                <td className="px-2 py-1 text-sm text-slate-300 font-semibold">{row.name}</td>
                {row.values.map((val, i) => (
                  <td key={i} className="px-2 py-1 text-center">
                    {val === '1.0' ? (
                      <span className="text-lg text-slate-600">1.0</span>
                    ) : val.startsWith('-') ? (
                      <span className="text-lg text-red-400 font-semibold">{val}</span>
                    ) : (
                      <span className="text-lg text-green-400 font-semibold">{val}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function HedgeVisual() {
  const hedgeData = [
    { asset: 'Equity', exposure: '$42.5M', hedge: '-$41.2M', residual: '$1.3M', color: '#3b82f6' },
    { asset: 'Rates', exposure: '$85K DV01', hedge: '-$82K DV01', residual: '$3K DV01', color: '#22c55e' },
    { asset: 'Credit', exposure: '$42K CS01', hedge: '-$40K CS01', residual: '$2K CS01', color: '#a855f7' },
    { asset: 'FX', exposure: '$18.2M', hedge: '-$17.8M', residual: '$0.4M', color: '#06b6d4' },
  ]

  return (
    <div className="bg-slate-900/80 rounded-xl border border-white/10 p-6">
      <div className="text-center mb-4">
        <span className="text-slate-400 text-sm">Zero-Risk Hedge Calculator</span>
      </div>
      <div className="space-y-3">
        {hedgeData.map((item) => (
          <div key={item.asset} className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-200" style={{ color: item.color }}>{item.asset}</span>
              <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">98% hedged</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block">Exposure</span>
                <span className="text-slate-300 font-mono">{item.exposure}</span>
              </div>
              <div>
                <span className="text-slate-500 block">0Hedge</span>
                <span className="text-red-400 font-mono">{item.hedge}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Residual</span>
                <span className="text-emerald-400 font-mono">{item.residual}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
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
    hedge: <HedgeVisual />,
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-6">
            Three Capabilities
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"> No One Else Has</span>
          </h2>
        </motion.div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <div key={feature.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
              >
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">
                    {feature.title}
                  </h3>

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

              {/* Spacer between sections */}
              {index < features.length - 1 && (
                <div className="h-[10px]" />
              )}
            </div>
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
      <DifferenceSection />
      <Features />
      <DashboardPreview />
      <TimeTravelSection />
      <CorrelationFramework />
      <FeatureDeepDive />
    </div>
  )
}
