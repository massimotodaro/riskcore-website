'use client'

/**
 * DashboardPreview.tsx (RiskPodsCarousel variant)
 *
 * Tab-based navigation with one featured RiskPod at a time.
 * Detailed explanation panel that changes with selection.
 * Interactive and engaging for exploring each asset class.
 */

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

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
  description: string
  keyInsight: string
}

// ==============================================
// RISK CARD COMPONENT (Exact match to Riskboard)
// ==============================================

function RiskCard({ data }: { data: RiskCardData }) {
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    setBarWidth(0)
    const timer = setTimeout(() => setBarWidth(65), 300)
    return () => clearTimeout(timer)
  }, [data.title])

  return (
    <motion.div
      className="bg-slate-800/50 border border-white/10 rounded-lg overflow-hidden flex flex-col w-full max-w-md"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ borderColor: `${data.color}40` }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <span className="text-base font-bold" style={{ color: data.color }}>{data.title}</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${data.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            {data.isUp ? '▲' : '▼'} {data.change}
          </span>
          <span className="text-slate-600 text-xs">::</span>
          <motion.button
            className="px-3 py-1 text-xs font-medium border border-white/20 rounded text-slate-300 hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Trades
          </motion.button>
        </div>
      </div>

      {/* Primary Metric */}
      <div className="px-4 py-3">
        <div className="text-xs text-slate-500 uppercase tracking-wide">{data.primaryLabel}</div>
        <motion.div
          className="text-3xl font-bold font-mono text-slate-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {data.primaryValue}
        </motion.div>
        {/* Progress Bar */}
        <div className="h-1.5 bg-slate-700/50 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${data.color}, ${data.color}88)` }}
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-3 gap-2 px-4 pb-3">
        {data.secondaryMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="bg-slate-900/50 rounded px-3 py-2 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <div className="text-[9px] text-slate-500 uppercase">{metric.label}</div>
            <div className="text-sm font-mono font-semibold text-slate-200">{metric.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Data Table */}
      <div className="px-4 flex-1">
        {/* Table Header */}
        <div
          className="grid gap-1 px-2 py-1.5 text-[9px] font-semibold uppercase tracking-wide rounded-t"
          style={{
            gridTemplateColumns: `60px repeat(${data.tableHeaders.length - 1}, 1fr)`,
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
              className="grid gap-1 px-2 py-1 text-[10px] border-b border-white/5 last:border-0 hover:bg-white/5"
              style={{ gridTemplateColumns: `60px repeat(${data.tableHeaders.length - 1}, 1fr)` }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + rowIndex * 0.05 }}
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
      <div className="grid grid-cols-3 gap-2 px-4 py-3 mt-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-[9px] text-slate-500 uppercase">Positions</div>
          <div className="text-xs font-mono text-slate-200">{data.positions}</div>
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-[9px] text-slate-500 uppercase">VaR (95%)</div>
          <div className="text-xs font-mono text-rose-400">{data.var95}</div>
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-[9px] text-slate-500 uppercase">CVaR (95%)</div>
          <div className="text-xs font-mono text-rose-400">{data.cvar95}</div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-2 px-4 pb-3">
        <motion.div
          className="bg-slate-900/40 rounded px-3 py-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="text-[9px] text-slate-500 uppercase">Gross Exposure</div>
          <div className="text-sm font-mono font-semibold text-slate-200">{data.grossExposure}</div>
        </motion.div>
        <motion.div
          className="bg-slate-900/40 rounded px-3 py-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-[9px] text-slate-500 uppercase">Net Exposure</div>
          <div className="text-sm font-mono font-semibold text-slate-200">{data.netExposure}</div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ==============================================
// CARD DATA
// ==============================================

const riskCardsData: RiskCardData[] = [
  {
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
    description: 'Aggregate equity exposure across all portfolios, broken down by region. Delta measures directional market exposure, while Beta shows sensitivity to benchmark moves.',
    keyInsight: 'Instantly see if your PMs are all long tech, or if you have hidden regional concentration that diversification reports miss.',
  },
  {
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
    description: 'Interest rate sensitivity across all fixed income positions. DV01 shows P&L impact per basis point move. Tenor breakdown reveals curve positioning.',
    keyInsight: 'Know exactly how much you make or lose when the Fed moves — and where on the curve that exposure sits.',
  },
  {
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
    description: 'Credit spread sensitivity by rating bucket. CS01 measures P&L per basis point spread widening. PD and LGD show default probability and loss severity.',
    keyInsight: 'Spot hidden concentration in BBB names that become fallen angels during credit stress.',
  },
  {
    title: 'FX',
    color: '#06b6d4',
    primaryLabel: 'FX DELTA',
    primaryValue: '$18.2M',
    change: '+0.4%',
    isUp: true,
    secondaryMetrics: [
      { label: 'FX Vega', value: '$320K' },
      { label: 'Basis', value: '42 bps' },
      { label: 'Pairs', value: '12' },
    ],
    tableHeaders: ['', '%', 'DELTA', 'VEGA', 'BASIS', 'CORR.', '0HEDGE'],
    tableRows: [
      { label: 'EUR', values: ['38%', '$6.9M', '$122K', '15bp', '0.94', '-$6.5M'] },
      { label: 'JPY', values: ['25%', '$4.5M', '$80K', '12bp', '0.91', '-$4.1M'] },
      { label: 'GBP', values: ['18%', '$3.3M', '$58K', '8bp', '0.89', '-$2.9M'] },
      { label: 'Crypto', values: ['12%', '$2.2M', '$45K', '5bp', '0.72', '-$1.6M'] },
      { label: 'Other', values: ['7%', '$1.3M', '$15K', '2bp', '0.65', '-$0.8M'] },
    ],
    positions: 45,
    var95: '$540K',
    cvar95: '$850K',
    grossExposure: '$65M',
    netExposure: '$18.2M',
    description: 'Currency exposure across all positions including embedded FX in international equities and bonds. Vega captures FX option exposure.',
    keyInsight: 'See your true currency exposure — not just FX trades, but the hidden FX in your international positions.',
  },
  {
    title: 'COMMODITIES',
    color: '#eab308',
    primaryLabel: 'NET EXPOSURE',
    primaryValue: '$28.5M',
    change: '+1.5%',
    isUp: true,
    secondaryMetrics: [
      { label: 'P. Sens', value: '$285K' },
      { label: 'Basis', value: '$45K' },
      { label: 'Roll', value: '-0.8%' },
    ],
    tableHeaders: ['', '%', 'EXP', 'P.SENS', 'BASIS', 'CORR.', '0HEDGE'],
    tableRows: [
      { label: 'Crude', values: ['42%', '$12M', '$120K', '$18K', '0.92', '-$11M'] },
      { label: 'Gold', values: ['28%', '$8M', '$80K', '$8K', '0.88', '-$7M'] },
      { label: 'NatGas', values: ['15%', '$4.3M', '$43K', '$12K', '0.75', '-$3.2M'] },
      { label: 'Copper', values: ['10%', '$2.8M', '$28K', '$5K', '0.82', '-$2.3M'] },
      { label: 'Other', values: ['5%', '$1.4M', '$14K', '$2K', '0.65', '-$0.9M'] },
    ],
    positions: 67,
    var95: '$1.2M',
    cvar95: '$1.9M',
    grossExposure: '$45M',
    netExposure: '$28.5M',
    description: 'Commodity exposure including futures, ETFs, and commodity-linked equities. Roll yield shows the cost/benefit of maintaining futures positions.',
    keyInsight: 'Track your inflation hedge exposure and understand the carry cost of your commodity positions.',
  },
  {
    title: 'OTHER',
    color: '#94a3b8',
    primaryLabel: 'NET EXPOSURE',
    primaryValue: '$5.8M',
    change: '-0.0%',
    isUp: false,
    secondaryMetrics: [
      { label: 'P. Sens', value: '$58K' },
      { label: 'Vol Sens', value: '$125K' },
      { label: 'Complx', value: 'Medium' },
    ],
    tableHeaders: ['', '%', 'EXP', 'P.SENS', 'V.SENS', 'CORR.', '0HEDGE'],
    tableRows: [
      { label: 'Volatility', values: ['55%', '$3.2M', '$32K', '$95K', '0.78', '-$2.5M'] },
      { label: 'Struct.', values: ['35%', '$2.0M', '$20K', '$25K', '0.65', '-$1.3M'] },
      { label: 'Unclass.', values: ['10%', '$0.6M', '$6K', '$5K', 'N/A', 'N/A'] },
    ],
    positions: 23,
    var95: '$280K',
    cvar95: '$450K',
    grossExposure: '$12M',
    netExposure: '$5.8M',
    description: 'Everything else: volatility products, structured notes, and positions that don\'t fit neatly into other categories. Decomposed for risk attribution.',
    keyInsight: 'No more "Other" black holes. Complex products are broken down so you understand what\'s actually in them.',
  },
]

// ==============================================
// MAIN COMPONENT
// ==============================================

export default function DashboardPreview() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const activeCard = riskCardsData[activeIndex]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #151E31, #10182B)' }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
        animate={{ backgroundColor: `${activeCard.color}10` }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Six RiskPods.{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Complete Coverage.
            </span>
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Click any asset class to explore the metrics that matter most.
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          {riskCardsData.map((card, index) => (
            <motion.button
              key={card.title}
              onClick={() => setActiveIndex(index)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
                activeIndex === index
                  ? 'text-slate-900 shadow-lg'
                  : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-white/10'
              }`}
              style={activeIndex === index ? { backgroundColor: card.color } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {card.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Card Display */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <RiskCard key={activeCard.title} data={activeCard} />
            </AnimatePresence>
          </motion.div>

          {/* Description Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Title */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: activeCard.color }}
                  />
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                    {activeCard.title} RiskPod
                  </h3>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6">
                  {activeCard.description}
                </p>

                {/* Key Insight */}
                <div className="bg-slate-800/50 border-l-4 rounded-r-lg p-4" style={{ borderColor: activeCard.color }}>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Key Insight</div>
                  <p className="text-slate-200 text-sm sm:text-base">{activeCard.keyInsight}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-100">{activeCard.positions}</div>
                    <div className="text-xs text-slate-500">Positions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-rose-400">{activeCard.var95}</div>
                    <div className="text-xs text-slate-500">VaR (95%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-100">{activeCard.grossExposure}</div>
                    <div className="text-xs text-slate-500">Gross</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="#early-access"
            className="inline-block px-4 py-2 bg-brand-blue text-white font-semibold text-sm rounded-[3px] transition-all duration-200 hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Demo
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
