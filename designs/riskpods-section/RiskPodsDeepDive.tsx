'use client'

/**
 * RiskPodsDeepDive.tsx
 *
 * RiskPods Section Variant 1: "The Deep Dive"
 *
 * Educational approach with explanatory callouts.
 * Shows 3 featured RiskPods with detailed explanations
 * of what each metric means and why it matters.
 *
 * Target: CIOs, CROs who want to understand the depth
 *
 * Usage:
 *   <RiskPodsDeepDive />
 *
 * Dependencies:
 *   npm install framer-motion
 */

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ==============================================
// TYPES
// ==============================================

interface DataRow {
  label: string
  values: string[]
}

interface RiskCardData {
  title: string
  color: string
  primaryLabel: string
  primaryValue: string
  change: string
  isUp: boolean
  secondaryMetrics: { label: string; value: string }[]
  tableHeaders: string[]
  tableRows: DataRow[]
  positions: number
  var95: string
  cvar95: string
  grossExposure: string
  netExposure: string
}

// ==============================================
// RISK CARD COMPONENT (Exact match to Riskboard)
// ==============================================

function RiskCard({ data, delay, isActive }: { data: RiskCardData; delay: number; isActive?: boolean }) {
  const [barWidth, setBarWidth] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setBarWidth(65), delay * 1000 + 500)
      return () => clearTimeout(timer)
    }
  }, [delay, isInView])

  return (
    <motion.div
      ref={ref}
      className={`bg-slate-800/50 border rounded-lg overflow-hidden flex flex-col transition-all duration-300 ${
        isActive ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/10' : 'border-white/10'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ borderColor: `${data.color}40` }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
        <span className="text-sm font-bold" style={{ color: data.color }}>{data.title}</span>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-medium ${data.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            {data.isUp ? '▲' : '▼'} {data.change}
          </span>
          <span className="text-slate-600 text-[10px]">::</span>
          <motion.button
            className="px-2 py-0.5 text-[10px] font-medium border border-white/20 rounded text-slate-300 hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Trades
          </motion.button>
        </div>
      </div>

      {/* Primary Metric */}
      <div className="px-3 py-2">
        <div className="text-[10px] text-slate-500 uppercase tracking-wide">{data.primaryLabel}</div>
        <motion.div
          className="text-2xl font-bold font-mono text-slate-100"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.3 }}
        >
          {data.primaryValue}
        </motion.div>
        {/* Progress Bar */}
        <div className="h-1 bg-slate-700/50 rounded-full mt-1.5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${data.color}, ${data.color}88)` }}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${barWidth}%` } : {}}
            transition={{ delay: delay + 0.5, duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-3 gap-1 px-3 pb-2">
        {data.secondaryMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="bg-slate-900/50 rounded px-2 py-1.5 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: delay + 0.4 + i * 0.1 }}
          >
            <div className="text-[8px] text-slate-500 uppercase">{metric.label}</div>
            <div className="text-[11px] font-mono font-semibold text-slate-200">{metric.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Data Table */}
      <div className="px-3 flex-1">
        {/* Table Header */}
        <div
          className="grid gap-0.5 px-1.5 py-1 text-[8px] font-semibold uppercase tracking-wide rounded-t"
          style={{
            gridTemplateColumns: `50px repeat(${data.tableHeaders.length - 1}, 1fr)`,
            backgroundColor: `${data.color}15`,
            color: data.color
          }}
        >
          {data.tableHeaders.map((header, i) => (
            <span key={i} className={i > 0 ? 'text-center' : ''}>{header}</span>
          ))}
        </div>
        {/* Table Rows */}
        <div className="bg-slate-900/30 rounded-b">
          {data.tableRows.map((row, rowIndex) => (
            <motion.div
              key={row.label}
              className="grid gap-0.5 px-1.5 py-0.5 text-[9px] border-b border-white/5 last:border-0 hover:bg-white/5"
              style={{ gridTemplateColumns: `50px repeat(${data.tableHeaders.length - 1}, 1fr)` }}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: delay + 0.6 + rowIndex * 0.05 }}
            >
              <span className="font-medium" style={{ color: data.color }}>{row.label}</span>
              {row.values.map((val, i) => (
                <span key={i} className="text-center font-mono text-slate-300">{val}</span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-1 px-3 py-2 mt-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.9 }}
        >
          <div className="text-[8px] text-slate-500 uppercase">Positions</div>
          <div className="text-[10px] font-mono text-slate-200">{data.positions}</div>
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 1 }}
        >
          <div className="text-[8px] text-slate-500 uppercase">VaR (95%)</div>
          <div className="text-[10px] font-mono text-rose-400">{data.var95}</div>
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 1.1 }}
        >
          <div className="text-[8px] text-slate-500 uppercase">CVaR (95%)</div>
          <div className="text-[10px] font-mono text-rose-400">{data.cvar95}</div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-1 px-3 pb-2">
        <motion.div
          className="bg-slate-900/40 rounded px-2 py-1.5 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 1.2 }}
        >
          <div className="text-[8px] text-slate-500 uppercase">Gross Exposure</div>
          <div className="text-[11px] font-mono font-semibold text-slate-200">{data.grossExposure}</div>
        </motion.div>
        <motion.div
          className="bg-slate-900/40 rounded px-2 py-1.5 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 1.3 }}
        >
          <div className="text-[8px] text-slate-500 uppercase">Net Exposure</div>
          <div className="text-[11px] font-mono font-semibold text-slate-200">{data.netExposure}</div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ==============================================
// EXPLANATORY CALLOUT
// ==============================================

interface CalloutProps {
  title: string
  description: string
  color: string
  delay: number
}

function Callout({ title, description, color, delay }: CalloutProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      className="bg-slate-800/30 border border-white/10 rounded-xl p-5"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        <h4 className="text-lg font-semibold text-slate-100">{title}</h4>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  )
}

// ==============================================
// CARD DATA
// ==============================================

const equityData: RiskCardData = {
  title: 'EQUITY',
  color: '#3b82f6',
  primaryLabel: 'NET DELTA',
  primaryValue: '$42.5M',
  change: '+1.2%',
  isUp: true,
  secondaryMetrics: [
    { label: 'Beta', value: '1.15' },
    { label: 'Vega', value: '$280K' },
    { label: 'Gamma', value: '$42K' },
  ],
  tableHeaders: ['', '%', 'DELTA', 'BETA', 'VEGA', 'CORR.', '0HEDGE'],
  tableRows: [
    { label: 'US+CAN', values: ['48%', '$20.4M', '1.08', '$134K', '0.96', '-$19.6M'] },
    { label: 'Europe', values: ['22%', '$9.4M', '0.95', '$62K', '0.88', '-$8.3M'] },
    { label: 'Japan', values: ['15%', '$6.4M', '0.82', '$42K', '0.85', '-$5.4M'] },
    { label: 'SE Asia', values: ['10%', '$4.3M', '1.15', '$28K', '0.78', '-$3.4M'] },
    { label: 'RoW', values: ['5%', '$2.0M', '0.92', '$14K', '0.72', '-$1.4M'] },
  ],
  positions: 342,
  var95: '$2.1M',
  cvar95: '$3.4M',
  grossExposure: '$320M',
  netExposure: '$42.5M',
}

const ratesData: RiskCardData = {
  title: 'RATES',
  color: '#22c55e',
  primaryLabel: 'DV01',
  primaryValue: '$85,000',
  change: '-0.8%',
  isUp: false,
  secondaryMetrics: [
    { label: 'Duration', value: '4.2 yrs' },
    { label: 'Convexity', value: '0.45' },
    { label: 'Yield', value: '5.25%' },
  ],
  tableHeaders: ['', '%', 'DV01', 'DUR', 'CONV', 'CORR.', '0HEDGE'],
  tableRows: [
    { label: '2Y', values: ['21%', '$18K', '1.9', '0.08', '0.92', '-$16.5K'] },
    { label: '5Y', values: ['38%', '$32K', '4.6', '0.25', '0.89', '-$28.5K'] },
    { label: '10Y', values: ['33%', '$28K', '8.2', '0.72', '0.85', '-$23.8K'] },
    { label: '30Y', values: ['8%', '$7K', '18.5', '3.80', '0.78', '-$5.5K'] },
  ],
  positions: 156,
  var95: '$1.8M',
  cvar95: '$2.9M',
  grossExposure: '$180M',
  netExposure: '$120M',
}

const creditData: RiskCardData = {
  title: 'CREDIT',
  color: '#a855f7',
  primaryLabel: 'CS01',
  primaryValue: '$42,000',
  change: '-1.2%',
  isUp: false,
  secondaryMetrics: [
    { label: 'CR. DUR', value: '3.8 yrs' },
    { label: 'AVG PD', value: '2.4%' },
    { label: 'AVG LGD', value: '40%' },
  ],
  tableHeaders: ['', '%', 'CS01', 'PD', 'LGD', 'CORR.', '0HEDGE'],
  tableRows: [
    { label: 'AAA-AA', values: ['18%', '$7.5K', '0.1%', '25%', '0.85', '-$6.4K'] },
    { label: 'A', values: ['32%', '$13.4K', '0.5%', '35%', '0.88', '-$11.8K'] },
    { label: 'BBB', values: ['28%', '$11.8K', '1.8%', '40%', '0.82', '-$9.7K'] },
    { label: 'HY', values: ['16%', '$6.7K', '4.2%', '55%', '0.74', '-$5.0K'] },
    { label: 'Distress', values: ['6%', '$2.6K', '18.5%', '65%', '0.42', 'N/A'] },
  ],
  positions: 89,
  var95: '$890K',
  cvar95: '$1.4M',
  grossExposure: '$95M',
  netExposure: '$72M',
}

// ==============================================
// MAIN COMPONENT
// ==============================================

export default function RiskPodsDeepDive() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const callouts = [
    {
      title: 'Equity: Net Delta Exposure',
      description: 'See your directional equity risk across all PMs and regions. Delta measures how much your portfolio moves with the market. The regional breakdown shows concentration risk you might be missing.',
      color: '#3b82f6',
    },
    {
      title: 'Rates: Duration & DV01',
      description: 'DV01 shows your P&L impact per basis point move in rates. Duration breakdown by tenor reveals your yield curve positioning — critical for when the Fed moves.',
      color: '#22c55e',
    },
    {
      title: 'Credit: Spread Sensitivity',
      description: 'CS01 measures credit spread sensitivity. The rating breakdown from AAA to distressed shows your credit quality distribution and helps identify hidden concentration in HY names.',
      color: '#a855f7',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #151E31, #10182B)' }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            RiskPods
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Every Asset Class.{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Every Metric That Matters.
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            RiskPods organize your firm-wide risk by asset class. Each pod shows the metrics
            that matter for that asset class — from Equity Delta to Credit CS01 to FX Vega.
          </motion.p>
        </motion.div>

        {/* Cards + Callouts Grid */}
        <div className="space-y-12">
          {/* Equity Row */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <Callout {...callouts[0]} delay={0.5} />
            </div>
            <div className="order-1 md:order-2">
              <RiskCard data={equityData} delay={0.3} isActive />
            </div>
          </div>

          {/* Rates Row */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <RiskCard data={ratesData} delay={0.5} />
            </div>
            <div>
              <Callout {...callouts[1]} delay={0.7} />
            </div>
          </div>

          {/* Credit Row */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <Callout {...callouts[2]} delay={0.9} />
            </div>
            <div className="order-1 md:order-2">
              <RiskCard data={creditData} delay={0.7} />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <p className="text-slate-500 text-sm mb-4">
            Plus FX, Commodities, and Other — all in one unified view
          </p>
          <motion.button
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-lg rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See All RiskPods
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
