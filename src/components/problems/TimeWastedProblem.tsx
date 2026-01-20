'use client'

/**
 * TimeWastedProblem.tsx
 *
 * Combined component showing how fragmented data wastes time on:
 * 1. Daily risk questions (hours to answer)
 * 2. Quarterly regulatory filings (weeks to complete)
 */

import { motion } from 'framer-motion'

// Daily tasks timeline (5 key steps from original)
const dailyTasks = [
  { step: 1, task: 'Export from Bloomberg PORT', time: '30 min', color: '#3b82f6' },
  { step: 2, task: 'Export from Enfusion', time: '20 min', color: '#22c55e' },
  { step: 3, task: 'Map ticker formats', time: '45 min', color: '#a855f7' },
  { step: 4, task: 'Reconcile identifiers', time: '30 min', color: '#f97316' },
  { step: 5, task: 'Build pivot tables', time: '30 min', color: '#22d3ee' },
]

// Daily risk questions (cards underneath)
const dailyQuestions = [
  { question: "What's our total exposure to NVDA?", time: "2 hours needed" },
  { question: "Are any PMs taking offsetting positions?", time: "4 hours needed" },
  { question: "What's our firm-wide VaR right now?", time: "requires days" },
]

// Quarterly regulatory steps
const quarterlySteps = [
  { step: 1, task: 'Request data from each PM', time: '2-3 days' },
  { step: 2, task: 'Normalize formats manually', time: '1-2 days' },
  { step: 3, task: 'Aggregate in Excel', time: '1 day' },
  { step: 4, task: 'Validate & correct errors', time: '2-3 days' },
  { step: 5, task: 'Submit filing', time: '1 day' },
]

// Regulatory requirements (cards underneath)
const regulations = [
  { name: 'Form PF', authority: 'SEC', requirement: 'Quarterly aggregated exposures', color: '#3b82f6' },
  { name: 'AIFMD Annex IV', authority: 'EU', requirement: 'Detailed risk reporting', color: '#a855f7' },
  { name: '13F Holdings', authority: 'SEC', requirement: 'Firm-wide position disclosure', color: '#22c55e' },
  { name: 'Basel/CCAR', authority: 'FED', requirement: 'Stress testing', color: '#f97316' },
]

export default function TimeWastedProblem() {
  return (
    <section className="relative py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 font-['Space_Grotesk'] mb-6">
            Hours on Questions. <span style={{ color: '#22C55E' }}>Weeks on Compliance.</span>
          </h2>

          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Fragmented data turns simple tasks into time-consuming ordeals - whether it&apos;s answering a risk question or filing a regulatory report.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">

          {/* Left Column: Daily Risk Questions */}
          <div className="space-y-4">
            {/* Main Card with Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#1e293b]/90 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-400 text-sm uppercase tracking-wider">Daily Pain</p>
                  <h3 className="text-2xl font-bold text-blue-400 font-['Space_Grotesk']">
                    Risk Questions
                  </h3>
                </div>
              </div>

              {/* 5-step Timeline */}
              <div className="space-y-0">
                {dailyTasks.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    className="flex items-center gap-3 py-2"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                        <span className="text-blue-400 text-sm font-bold">{item.step}</span>
                      </div>
                      {index < dailyTasks.length - 1 && (
                        <div className="absolute left-4 top-10 w-0.5 h-3 bg-gradient-to-b from-blue-500/40 to-transparent" />
                      )}
                    </div>
                    <p className="text-slate-300 text-sm flex-1">{item.task}</p>
                    <span className="text-orange-400 text-xs font-mono bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/30">
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Daily Impact */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-slate-100 text-lg font-semibold">Total daily time:</span>
                  <span className="text-2xl font-bold text-blue-400">155 minutes</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">≈ $200/day in analyst time</p>
              </div>
            </motion.div>

            {/* Arrow */}
            <div className="flex justify-center mt-4 sm:mt-8">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* 3 Question Cards underneath */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-2 sm:mt-8">
              {dailyQuestions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4"
                >
                  <p className="text-slate-100 font-medium text-xs sm:text-sm leading-snug mb-1 sm:mb-2">
                    {item.question}
                  </p>
                  <p className="text-slate-400 text-[10px] sm:text-xs">{item.time}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Quarterly Regulatory */}
          <div className="space-y-4">
            {/* Main Card with Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#1e293b]/90 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-400 text-sm uppercase tracking-wider">Quarterly Pain</p>
                  <h3 className="text-2xl font-bold text-cyan-400 font-['Space_Grotesk']">
                    Regulatory Filings
                  </h3>
                </div>
              </div>

              {/* 5-step Process */}
              <div className="space-y-0">
                {quarterlySteps.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    className="flex items-center gap-3 py-2"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                        <span className="text-cyan-400 text-sm font-bold">{item.step}</span>
                      </div>
                      {index < quarterlySteps.length - 1 && (
                        <div className="absolute left-4 top-10 w-0.5 h-3 bg-gradient-to-b from-cyan-500/40 to-transparent" />
                      )}
                    </div>
                    <p className="text-slate-300 text-sm flex-1">{item.task}</p>
                    <span className="text-orange-400 text-xs font-mono bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/30">
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Quarterly Impact */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-slate-100 text-lg font-semibold">Per quarterly filing:</span>
                  <span className="text-2xl font-bold text-cyan-400">2-3 weeks</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">≈ $8,000/filing in analyst time</p>
              </div>
            </motion.div>

            {/* Arrow */}
            <div className="flex justify-center mt-4 sm:mt-8">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* 4 Regulation Cards underneath */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-2 sm:mt-8">
              {regulations.map((reg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-center text-center"
                >
                  <div
                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg inline-block mb-1 sm:mb-2"
                    style={{ backgroundColor: `${reg.color}20`, border: `1px solid ${reg.color}40` }}
                  >
                    <span className="text-[10px] sm:text-xs font-bold" style={{ color: reg.color }}>{reg.name}</span>
                  </div>
                  <p className="text-slate-100 text-[10px] sm:text-xs">{reg.authority}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* The Real Cost Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-2xl p-6 mt-8"
        >
          <div className="mb-6 text-left">
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">The Real Cost</p>
            <h3 className="text-2xl md:text-3xl font-bold text-blue-400 font-['Space_Grotesk']">
              Fragmented Data
            </h3>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-center gap-4 p-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0 }}
                className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: '2px solid rgba(59, 130, 246, 0.5)' }}
              >
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <div>
                <p className="text-slate-100 font-semibold">$200K+ annual labor cost</p>
                <p className="text-sm text-slate-400">Dedicated to data wrangling</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: '2px solid rgba(34, 211, 238, 0.5)' }}
              >
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <div>
                <p className="text-slate-100 font-semibold">750+ hours wasted annually</p>
                <p className="text-sm text-slate-400">On manual aggregation</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: '2px solid rgba(249, 115, 22, 0.5)' }}
              >
                <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </motion.div>
              <div>
                <p className="text-slate-100 font-semibold">High error risk</p>
                <p className="text-sm text-slate-400">Manual processes fail</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.9 }}
                className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: '2px solid rgba(239, 68, 68, 0.5)' }}
              >
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </motion.div>
              <div>
                <p className="text-slate-100 font-semibold">Delayed decision making</p>
                <p className="text-sm text-slate-400">Markets don&apos;t wait</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </section>
  )
}
