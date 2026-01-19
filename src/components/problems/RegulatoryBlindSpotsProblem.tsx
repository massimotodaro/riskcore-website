'use client'

/**
 * RegulatoryBlindSpotsProblem.tsx
 *
 * Shows regulatory reporting challenges when firm-wide data
 * doesn't exist in any single system.
 */

import { motion } from 'framer-motion'

// Regulatory requirements
const regulations = [
  { name: 'Form PF', authority: 'SEC', requirement: 'Quarterly aggregated exposures', color: '#3b82f6' },
  { name: 'AIFMD Annex IV', authority: 'EU', requirement: 'Detailed risk reporting', color: '#a855f7' },
  { name: '13F Holdings', authority: 'SEC', requirement: 'Firm-wide position disclosure', color: '#22c55e' },
  { name: 'Basel/CCAR', authority: 'FED', requirement: 'Stress testing (bank-affiliated)', color: '#f97316' },
]

// Current process steps
const currentProcess = [
  { step: 1, task: 'Request data from each PM', time: '2-3 days of follow-up', icon: '📧' },
  { step: 2, task: 'Normalize formats manually', time: '1-2 days', icon: '🔄' },
  { step: 3, task: 'Aggregate in Excel', time: '1 day', icon: '📊' },
  { step: 4, task: 'Validate (find errors, request corrections)', time: '2-3 days', icon: '🔍' },
  { step: 5, task: 'Submit (hope nothing was missed)', time: '1 day', icon: '🤞' },
]

function RegulationBadge({ name, authority, requirement, color, index }: {
  name: string
  authority: string
  requirement: string
  color: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-cyan-500/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="px-4 py-1.5 rounded-lg text-base font-bold"
          style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
        >
          {name}
        </div>
        <span className="text-sm text-slate-300 bg-slate-800/50 px-2.5 py-1 rounded font-medium">{authority}</span>
      </div>
      <p className="text-sm text-slate-100">{requirement}</p>
    </motion.div>
  )
}

function ProcessStep({ step, task, time, icon, index, total }: {
  step: number
  task: string
  time: string
  icon: string
  index: number
  total: number
}) {
  const isLast = index === total - 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.4 }}
      className="relative flex items-start gap-4"
    >
      {/* Vertical line connector */}
      {!isLast && (
        <div className="absolute left-5 top-12 w-0.5 h-1/2 bg-gradient-to-b from-cyan-500/40 to-transparent" />
      )}

      {/* Step circle */}
      <div className="relative z-10 w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
        <span className="text-cyan-400 font-bold">{step}</span>
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <p className="text-slate-200 font-medium mb-1">{task}</p>
        <div className="inline-block px-2 py-0.5 bg-orange-500/10 border border-orange-500/30 rounded text-xs text-orange-400 font-mono">
          {time}
        </div>
      </div>
    </motion.div>
  )
}

export default function RegulatoryBlindSpotsProblem() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(to bottom, #0f172a, #1a2744)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6"
          >
            The Compliance Risk Problem
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 font-['Space_Grotesk'] mb-4">
            Regulatory <span className="text-cyan-400">Blind Spots</span>
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Regulatory reporting requires firm-wide data that doesn't exist in any single system.
          </p>
        </motion.div>

        {/* Regulation Badges Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {regulations.map((reg, index) => (
            <RegulationBadge key={reg.name} {...reg} index={index} />
          ))}
        </div>

        {/* Current Process & Time Card */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Process Flow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="mb-6">
              <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Filing Process</p>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-100 font-['Space_Grotesk']">
                Every. Single. Quarter.
              </h3>
            </div>

            <div className="space-y-0">
              {currentProcess.map((p, index) => (
                <ProcessStep key={p.step} {...p} index={index} total={currentProcess.length} />
              ))}
            </div>
          </motion.div>

          {/* Time & Risk Callouts */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Time Callout */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                  className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <div>
                  <p className="text-sm text-slate-400">Time spent per quarterly filing</p>
                  <p className="text-4xl font-bold text-cyan-400">2-3 Weeks</p>
                </div>
              </div>
            </motion.div>

            {/* Risk Callout */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-12 h-12 bg-slate-500/20 rounded-xl flex items-center justify-center"
                >
                  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </motion.div>
                <div>
                  <p className="text-sm text-slate-400">Compliance Risk</p>
                  <p className="text-xl font-bold text-slate-100">Material Misstatements</p>
                </div>
              </div>
              <ul className="space-y-2 ml-16">
                <li className="text-slate-300 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Regulatory scrutiny & audits
                </li>
                <li className="text-slate-300 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  Potential fines & penalties
                </li>
                <li className="text-slate-300 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Reputational damage
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* The Core Problem - Unified Card */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-gradient-to-br from-cyan-500/5 to-teal-500/5 border border-cyan-500/20 rounded-2xl px-8 py-5"
            style={{ width: '70%', minWidth: '600px' }}
          >
            <div className="flex items-center gap-8">
              {/* The Core Problem - Left side */}
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 2 }}
                  className="w-14 h-14 bg-cyan-500/20 border-2 border-cyan-500/40 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <div>
                  <p className="font-bold text-slate-100 text-xl">The Core Problem</p>
                  <p className="text-sm text-cyan-400">Compliance Gap</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-16 bg-white/10 flex-shrink-0" />

              {/* Bullet points - Right side */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-cyan-400" />
                  <p className="text-slate-100 text-sm font-semibold">Regulators require firm-wide aggregated data</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-teal-400" />
                  <p className="text-slate-100 text-sm font-semibold">Your data lives in 5+ disconnected systems</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-red-400" />
                  <p className="text-slate-100 text-sm font-semibold">The gap is filled with manual labor and risk</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
