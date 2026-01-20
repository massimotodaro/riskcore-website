'use client'

/**
 * TheProblemSection.tsx
 *
 * Merged component combining:
 * - The Multi-Book Risk Challenge title and 4 pain point cards
 * - Data Silos visualization with PM cards, arrows, CRO card
 * - "No Platform Connects What You Already Have" card with quote
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Pain points data
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4v16" />
      </svg>
    ),
    title: 'No Correlation',
    description: "No way to calculate implied or realized correlation between different PMs. Hidden risk relationships go undetected.",
    hexColor: '#06B6D4',
  },
]

// PM Systems data
const pmSystems = [
  { pm: 'PM Alpha', system: 'Bloomberg PORT', format: '.xlsx exports', color: '#3b82f6' },
  { pm: 'PM Beta', system: 'Enfusion', format: 'REST API', color: '#22c55e' },
  { pm: 'PM Gamma', system: 'Eze Eclipse', format: 'FIX messages', color: '#a855f7' },
  { pm: 'PM Delta', system: 'Excel + Python', format: 'CSV files', color: '#f97316' },
  { pm: 'PM Epsilon', system: 'Axioma', format: 'Proprietary', color: '#22d3ee' },
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

export default function TheProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 bg-transparent">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ===== PART 1: Title and 4 Pain Point Cards ===== */}

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Title - One line, "Challenge" in green */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6">
            The Multi-Book Risk <span style={{ color: '#22C55E' }}>Challenge</span>
          </h1>

          {/* Subtitle - Gray/muted like design */}
          <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto">
            Understanding the firm-wide risk across multiple books shouldn&apos;t require a PhD in spreadsheet gymnastics.
          </p>
        </motion.div>

        {/* Pain Points Grid - 4 Cards */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6 mb-20"
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

        {/* ===== PART 2: Data Silos Visualization ===== */}

        {/* Horizontal Layout: Title Left, Visualization Right */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-10">

          {/* LEFT: Title Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-[35%] flex-shrink-0"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-100 font-['Space_Grotesk'] leading-tight">
              <span className="text-blue-400">Data Silos</span> everywhere.
            </h2>
            <p className="text-lg md:text-xl text-slate-400 mt-4 leading-relaxed">
              Multi-manager hedge funds have PMs using different systems which results in <span className="text-slate-100 font-semibold">no single source of truth.</span>
            </p>
          </motion.div>

          {/* RIGHT: Visualization (PM Cards + Arrows + CRO Card) */}
          <div className="lg:w-[65%] flex-1">
            {/* Visual Diagram - Disconnected Silos */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Silos Grid - 5 cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 mb-6">
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
            <div className="flex justify-center mb-3">
              <svg className="w-full max-w-2xl h-16" viewBox="0 0 500 60" preserveAspectRatio="xMidYMid meet">
                {/* Lines from each of the 5 silos converging to center */}
                <path d="M50 0 L50 20 Q50 40 100 50 L250 55" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 3" fill="none" opacity="0.5" />
                <path d="M150 0 L150 20 Q150 40 180 50 L250 55" stroke="#22c55e" strokeWidth="2" strokeDasharray="5 3" fill="none" opacity="0.5" />
                <path d="M250 0 L250 55" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" fill="none" opacity="0.5" />
                <path d="M350 0 L350 20 Q350 40 320 50 L250 55" stroke="#f97316" strokeWidth="2" strokeDasharray="5 3" fill="none" opacity="0.5" />
                <path d="M450 0 L450 20 Q450 40 400 50 L250 55" stroke="#22d3ee" strokeWidth="2" strokeDasharray="5 3" fill="none" opacity="0.5" />
              </svg>
            </div>

            {/* CRO Card */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-2xl px-4 sm:px-6 py-4 w-full"
              >
                {/* Mobile Layout */}
                <div className="block lg:hidden">
                  {/* Title centered at top */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                      className="w-10 h-10 bg-blue-500/20 border-2 border-blue-500/40 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <span className="text-xl">?</span>
                    </motion.div>
                    <div className="text-center">
                      <p className="font-bold text-slate-100 text-base">CRO: <span className="text-blue-400">No Unified View</span></p>
                    </div>
                  </div>
                  {/* 2x2 Grid of bullet points */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: '#3b82f6' }} />
                      <p className="text-slate-100 text-xs font-semibold">No single source of truth</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: '#22c55e' }} />
                      <p className="text-slate-100 text-xs font-semibold">Risk data in 5+ systems</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: '#a855f7' }} />
                      <p className="text-slate-100 text-xs font-semibold">&ldquo;Exposure&rdquo; defined differently</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: '#f97316' }} />
                      <p className="text-slate-100 text-xs font-semibold">IDs don&apos;t match</p>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex items-center gap-6">
                  {/* CRO Avatar Section */}
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                      className="w-12 h-12 bg-blue-500/20 border-2 border-blue-500/40 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <span className="text-2xl">?</span>
                    </motion.div>
                    <div>
                      <p className="font-bold text-slate-100 text-lg">CRO</p>
                      <p className="text-xs text-blue-400">No Unified View</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-10 bg-white/10 flex-shrink-0" />

                  {/* Consequences */}
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#3b82f6' }} />
                      <p className="text-slate-100 text-xs font-semibold">No single source of truth</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#22c55e' }} />
                      <p className="text-slate-100 text-xs font-semibold">Risk data in 5+ disconnected systems</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#a855f7' }} />
                      <p className="text-slate-100 text-xs font-semibold">Each system defines &ldquo;exposure&rdquo; differently</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#f97316' }} />
                      <p className="text-slate-100 text-xs font-semibold">Identifiers don&apos;t match (CUSIP / ISIN / SEDOL)</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ===== PART 3: No Platform Connects Card with Quote ===== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="relative bg-[#1e293b]/90 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 mt-10"
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-100 font-['Space_Grotesk'] mb-2">
              No Platform <span className="text-blue-400">Connects What You Already Have.</span>
            </h3>
            <p className="text-lg md:text-xl text-slate-400">
              Every platform is built <span className="text-white">to replace, not to integrate.</span>
            </p>
          </div>

          {/* Quote */}
          <div className="text-center">
            <p className="text-lg text-slate-200 italic leading-relaxed">
              <span className="text-white">&ldquo;</span>Fragmentation is not just an operational nuisance. It is a structural drag on alpha generation, execution quality, and risk control.<span className="text-white">&rdquo;</span>
              {' '}<span className="text-slate-400">—</span>{' '}
              <a href="https://kx.com/blog/hedge-funds-build-unified-data-ecosystem/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors">KX</a>
            </p>
          </div>
        </motion.div>

      </div>
      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </section>
  )
}
