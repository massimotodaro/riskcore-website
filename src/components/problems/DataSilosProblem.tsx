'use client'

/**
 * DataSilosProblem.tsx
 *
 * Visualizes the data fragmentation problem across multiple PM systems.
 * Shows disconnected silos with a confused CRO in the center.
 */

import { motion } from 'framer-motion'

// PM Systems data
const pmSystems = [
  { pm: 'PM Alpha', system: 'Bloomberg PORT', format: '.xlsx exports', color: '#3b82f6' },
  { pm: 'PM Beta', system: 'Enfusion', format: 'REST API', color: '#22c55e' },
  { pm: 'PM Gamma', system: 'Eze Eclipse', format: 'FIX messages', color: '#a855f7' },
  { pm: 'PM Delta', system: 'Excel + Python', format: 'CSV files', color: '#f97316' },
  { pm: 'PM Epsilon', system: 'Axioma', format: 'Proprietary format', color: '#eab308' },
]

const consequences = [
  'No single source of truth',
  'Risk data lives in 5+ disconnected systems',
  'Each system defines "exposure" differently',
  'Security identifiers don\'t match (CUSIP vs ISIN vs SEDOL vs Ticker)',
]

// Silo component for visual diagram
function SiloBox({ pm, system, format, color, delay }: { pm: string; system: string; format: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="relative"
    >
      <motion.div
        animate={{
          boxShadow: [
            `0 0 0 0 ${color}00`,
            `0 0 20px 5px ${color}30`,
            `0 0 0 0 ${color}00`
          ]
        }}
        transition={{ repeat: Infinity, duration: 2, delay: delay * 0.5 }}
        className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center"
        style={{ borderColor: `${color}40` }}
      >
        <div
          className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
        >
          <svg className="w-5 h-5" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6M12 9v6" />
          </svg>
        </div>
        <p className="font-semibold text-slate-100 text-sm">{pm}</p>
        <p className="text-xs text-slate-400 mt-1">{system}</p>
        <p className="text-xs text-slate-500 mt-0.5">({format})</p>
      </motion.div>
    </motion.div>
  )
}

export default function DataSilosProblem() {
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
            className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6"
          >
            The Data Silos Problem
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 font-['Space_Grotesk'] mb-4">
            Data Silos <span className="text-red-400">Everywhere</span>
          </h2>

          <p className="text-lg text-slate-400">
            Multi-manager hedge funds have PMs using different systems—no single source of truth exists.
          </p>
        </motion.div>

        {/* Visual Diagram - Disconnected Silos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-16"
        >
          {/* Silos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 mb-12">
            {pmSystems.map((pm, index) => (
              <SiloBox
                key={pm.pm}
                pm={pm.pm}
                system={pm.system}
                format={pm.format}
                color={pm.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Connector lines from silos to CRO card */}
        <div className="flex justify-center mb-4">
          <svg className="w-full max-w-3xl h-24" viewBox="0 0 600 80" preserveAspectRatio="xMidYMid meet">
            {/* Lines from each of the 5 silos converging to center */}
            <path d="M60 0 L60 30 Q60 50 120 60 L300 70" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.4" />
            <path d="M180 0 L180 30 Q180 50 220 60 L300 70" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.4" />
            <path d="M300 0 L300 70" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.4" />
            <path d="M420 0 L420 30 Q420 50 380 60 L300 70" stroke="#f97316" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.4" />
            <path d="M540 0 L540 30 Q540 50 480 60 L300 70" stroke="#eab308" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.4" />
          </svg>
        </div>

        {/* Combined CRO + Result Card - horizontal layout */}
        <div className="flex justify-center mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20 rounded-2xl px-8 py-5 mb-12"
            style={{ width: '60%', minWidth: '500px' }}
          >
            <div className="flex items-center gap-8">
              {/* CRO Avatar Section - Bigger, centered */}
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                  className="w-14 h-14 bg-red-500/20 border-2 border-red-500/40 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-3xl">?</span>
                </motion.div>
                <div>
                  <p className="font-bold text-slate-100 text-xl">CRO</p>
                  <p className="text-sm text-red-400">No Unified View</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-12 bg-white/10 flex-shrink-0" />

              {/* Consequences - Stacked on the right */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#3b82f6' }} />
                  <p className="text-slate-100 text-sm font-semibold">No single source of truth</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#22c55e' }} />
                  <p className="text-slate-100 text-sm font-semibold">Risk data in 5+ disconnected systems</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#a855f7' }} />
                  <p className="text-slate-100 text-sm font-semibold">Each system defines "exposure" differently</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#f97316' }} />
                  <p className="text-slate-100 text-sm font-semibold">Identifiers don't match (CUSIP / ISIN / SEDOL)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quote/Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="relative bg-[#1e293b]/90 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8"
        >
          {/* Quote marks */}
          <div className="absolute top-4 left-6 text-6xl text-red-500/20 font-serif leading-none">"</div>

          <blockquote className="relative z-10 pl-8">
            <p className="text-lg md:text-xl text-slate-200 italic leading-relaxed">
              We have Bloomberg, Enfusion, and three PMs still using Excel. Getting a firm-wide view means four people spending half a day copying data into a master spreadsheet.
            </p>
            <footer className="mt-4 text-sm text-slate-400">
              — Risk Analyst at $5B Multi-Manager Fund
            </footer>
          </blockquote>
        </motion.div>

      </div>
    </section>
  )
}
