'use client'

/**
 * AnimatedRiskCard.tsx
 *
 * Standalone animated RiskCard component for use in feature sections,
 * product showcases, and anywhere else you need to show off the goods.
 *
 * Usage:
 *   <AnimatedRiskCard
 *     variant="equity"
 *     animate={true}
 *     showDetails={true}
 *   />
 *
 * Dependencies:
 *   npm install framer-motion
 */

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

// ==============================================
// TYPES
// ==============================================

type RiskCardVariant = 'equity' | 'rates' | 'credit' | 'fx' | 'commodities' | 'other'

interface TableRow {
  label: string
  values: string[]
}

interface RiskCardData {
  title: string
  color: string
  primaryMetric: { label: string; value: string; bar: number }
  secondaryMetrics: { label: string; value: string }[]
  tableHeaders: string[]
  tableRows: TableRow[]
  bottomMetrics: { label: string; value: string; isNegative?: boolean }[]
  footer: { gross: string; net: string }
  change: { value: string; isUp: boolean }
}

// ==============================================
// CARD DATA BY VARIANT
// ==============================================

const cardData: Record<RiskCardVariant, RiskCardData> = {
  equity: {
    title: 'EQUITY',
    color: '#3b82f6',
    primaryMetric: { label: 'Net Delta', value: '$42.5M', bar: 65 },
    secondaryMetrics: [
      { label: 'Beta', value: '1.15' },
      { label: 'Vega', value: '$280K' },
      { label: 'Gamma', value: '$42K' },
    ],
    tableHeaders: ['', '%', 'DELTA', 'BETA', 'VEGA', 'CORR', '0HEDGE'],
    tableRows: [
      { label: 'US+CAN', values: ['48%', '$20.4M', '1.08', '$134K', '0.96', '-$19.6M'] },
      { label: 'Europe', values: ['22%', '$9.4M', '0.95', '$62K', '0.88', '-$8.3M'] },
      { label: 'Japan', values: ['15%', '$6.4M', '0.82', '$42K', '0.85', '-$5.4M'] },
      { label: 'SE Asia', values: ['10%', '$4.3M', '1.15', '$28K', '0.78', '-$3.4M'] },
      { label: 'RoW', values: ['5%', '$2.0M', '0.92', '$14K', '0.72', '-$1.4M'] },
    ],
    bottomMetrics: [
      { label: 'Positions', value: '342' },
      { label: 'VaR (95%)', value: '$2.1M', isNegative: true },
      { label: 'CVaR (95%)', value: '$3.4M', isNegative: true },
    ],
    footer: { gross: '$320M', net: '$42.5M' },
    change: { value: '+1.2%', isUp: true },
  },
  rates: {
    title: 'RATES',
    color: '#22c55e',
    primaryMetric: { label: 'DV01', value: '$85,000', bar: 55 },
    secondaryMetrics: [
      { label: 'Duration', value: '4.2 yrs' },
      { label: 'Convexity', value: '0.45' },
      { label: 'Yield', value: '5.25%' },
    ],
    tableHeaders: ['', '%', 'DV01', 'DUR', 'CONV', 'CORR', '0HEDGE'],
    tableRows: [
      { label: '2Y', values: ['21%', '$18K', '1.9', '0.08', '0.92', '-$16.5K'] },
      { label: '5Y', values: ['38%', '$32K', '4.6', '0.25', '0.89', '-$28.5K'] },
      { label: '10Y', values: ['33%', '$28K', '8.2', '0.72', '0.85', '-$23.8K'] },
      { label: '30Y', values: ['8%', '$7K', '18.5', '3.80', '0.78', '-$5.5K'] },
    ],
    bottomMetrics: [
      { label: 'Positions', value: '156' },
      { label: 'VaR (95%)', value: '$1.8M', isNegative: true },
      { label: 'CVaR (95%)', value: '$2.9M', isNegative: true },
    ],
    footer: { gross: '$180M', net: '$120M' },
    change: { value: '-0.8%', isUp: false },
  },
  credit: {
    title: 'CREDIT',
    color: '#a855f7',
    primaryMetric: { label: 'CS01', value: '$42,000', bar: 45 },
    secondaryMetrics: [
      { label: 'Cr. Dur', value: '3.8 yrs' },
      { label: 'Avg PD', value: '2.4%' },
      { label: 'Avg LGD', value: '40%' },
    ],
    tableHeaders: ['', '%', 'CS01', 'PD', 'LGD', 'CORR', '0HEDGE'],
    tableRows: [
      { label: 'AAA-AA', values: ['18%', '$7.5K', '0.1%', '25%', '0.85', '-$6.4K'] },
      { label: 'A', values: ['32%', '$13.4K', '0.5%', '35%', '0.88', '-$11.8K'] },
      { label: 'BBB', values: ['28%', '$11.8K', '1.8%', '40%', '0.82', '-$9.7K'] },
      { label: 'HY', values: ['16%', '$6.7K', '4.2%', '55%', '0.74', '-$5.0K'] },
      { label: 'Distress', values: ['6%', '$2.6K', '18.5%', '65%', '0.42', 'N/A'] },
    ],
    bottomMetrics: [
      { label: 'Positions', value: '89' },
      { label: 'VaR (95%)', value: '$890K', isNegative: true },
      { label: 'CVaR (95%)', value: '$1.4M', isNegative: true },
    ],
    footer: { gross: '$95M', net: '$72M' },
    change: { value: '-1.2%', isUp: false },
  },
  fx: {
    title: 'FX',
    color: '#06b6d4',
    primaryMetric: { label: 'FX Delta', value: '$18.2M', bar: 35 },
    secondaryMetrics: [
      { label: 'FX Vega', value: '$320K' },
      { label: 'Basis', value: '42 bps' },
      { label: 'Pairs', value: '12' },
    ],
    tableHeaders: ['', '%', 'DELTA', 'VEGA', 'BASIS', 'CORR', '0HEDGE'],
    tableRows: [
      { label: 'EUR', values: ['38%', '$6.9M', '$122K', '15bp', '0.94', '-$6.5M'] },
      { label: 'JPY', values: ['25%', '$4.5M', '$80K', '12bp', '0.91', '-$4.1M'] },
      { label: 'GBP', values: ['18%', '$3.3M', '$58K', '8bp', '0.89', '-$2.9M'] },
      { label: 'Crypto', values: ['12%', '$2.2M', '$45K', '5bp', '0.72', '-$1.6M'] },
      { label: 'Other', values: ['7%', '$1.3M', '$15K', '2bp', '0.65', '-$0.8M'] },
    ],
    bottomMetrics: [
      { label: 'Positions', value: '45' },
      { label: 'VaR (95%)', value: '$540K', isNegative: true },
      { label: 'CVaR (95%)', value: '$850K', isNegative: true },
    ],
    footer: { gross: '$65M', net: '$18.2M' },
    change: { value: '+0.4%', isUp: true },
  },
  commodities: {
    title: 'COMMODITIES',
    color: '#eab308',
    primaryMetric: { label: 'Net Exposure', value: '$28.5M', bar: 40 },
    secondaryMetrics: [
      { label: 'P. Sens', value: '$285K' },
      { label: 'Basis', value: '$45K' },
      { label: 'Roll', value: '-0.8%' },
    ],
    tableHeaders: ['', '%', 'EXP', 'P.SENS', 'BASIS', 'CORR', '0HEDGE'],
    tableRows: [
      { label: 'Crude', values: ['42%', '$12M', '$120K', '$18K', '0.92', '-$11M'] },
      { label: 'Gold', values: ['28%', '$8M', '$80K', '$8K', '0.88', '-$7M'] },
      { label: 'NatGas', values: ['15%', '$4.3M', '$43K', '$12K', '0.75', '-$3.2M'] },
      { label: 'Copper', values: ['10%', '$2.8M', '$28K', '$5K', '0.82', '-$2.3M'] },
      { label: 'Other', values: ['5%', '$1.4M', '$14K', '$2K', '0.65', '-$0.9M'] },
    ],
    bottomMetrics: [
      { label: 'Positions', value: '67' },
      { label: 'VaR (95%)', value: '$1.2M', isNegative: true },
      { label: 'CVaR (95%)', value: '$1.9M', isNegative: true },
    ],
    footer: { gross: '$75M', net: '$28.5M' },
    change: { value: '+1.5%', isUp: true },
  },
  other: {
    title: 'OTHER',
    color: '#94a3b8',
    primaryMetric: { label: 'Net Exposure', value: '$8.2M', bar: 25 },
    secondaryMetrics: [
      { label: 'VaR', value: '$340K' },
      { label: 'CVaR', value: '$520K' },
      { label: 'Beta', value: '0.42' },
    ],
    tableHeaders: ['', '%', 'EXP', 'VAR', 'CVAR', 'CORR', '0HEDGE'],
    tableRows: [
      { label: 'Struct', values: ['55%', '$4.5M', '$187K', '$286K', '0.45', '-$2.0M'] },
      { label: 'Vol', values: ['30%', '$2.5M', '$102K', '$156K', '0.38', '-$0.9M'] },
      { label: 'Other', values: ['15%', '$1.2M', '$51K', '$78K', '0.52', '-$0.6M'] },
    ],
    bottomMetrics: [
      { label: 'Positions', value: '45' },
      { label: 'VaR (95%)', value: '$340K', isNegative: true },
      { label: 'CVaR (95%)', value: '$520K', isNegative: true },
    ],
    footer: { gross: '$24M', net: '$8.2M' },
    change: { value: '-0.2%', isUp: false },
  },
}

// ==============================================
// MAIN ANIMATED RISK CARD COMPONENT
// ==============================================

interface AnimatedRiskCardProps {
  variant: RiskCardVariant
  animate?: boolean
  showDetails?: boolean
  delay?: number
  className?: string
  compact?: boolean
}

export default function AnimatedRiskCard({
  variant,
  animate = true,
  showDetails = true,
  delay = 0,
  className = '',
  compact = false,
}: AnimatedRiskCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()
  const [barWidth, setBarWidth] = useState(0)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const data = cardData[variant]

  useEffect(() => {
    if (isInView && animate) {
      controls.start('visible')
      const timer = setTimeout(() => {
        setBarWidth(data.primaryMetric.bar)
      }, (delay + 0.5) * 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView, animate, controls, data.primaryMetric.bar, delay])

  const containerVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: 'easeOut',
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      className={`
        bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl
        overflow-hidden shadow-xl
        ${compact ? 'p-4' : 'p-5'}
        ${className}
      `}
      style={{ minWidth: compact ? '280px' : '400px' }}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 20px 60px ${data.color}20`,
        borderColor: `${data.color}40`,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-4"
        variants={itemVariants}
      >
        <span
          className="text-lg font-bold tracking-wider"
          style={{ color: data.color }}
        >
          {data.title}
        </span>
        <div className="flex items-center gap-3">
          <motion.span
            className={`text-sm font-medium ${data.change.isUp ? 'text-emerald-400' : 'text-rose-400'}`}
            animate={animate ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, delay: delay + 0.8 }}
          >
            {data.change.isUp ? '▲' : '▼'} {data.change.value}
          </motion.span>
          <motion.button
            className="px-3 py-1 text-xs font-semibold text-white/80 bg-white/10 rounded-md
                       hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Trades
          </motion.button>
        </div>
      </motion.div>

      {/* Primary Metric */}
      <motion.div
        className="bg-slate-900/50 rounded-xl p-4 mb-4"
        variants={itemVariants}
      >
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
          {data.primaryMetric.label}
        </div>
        <motion.div
          className="text-3xl font-bold font-mono text-slate-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: delay + 0.3, duration: 0.5 }}
        >
          {data.primaryMetric.value}
        </motion.div>

        {/* Animated Progress Bar */}
        <div className="h-1.5 bg-slate-700 rounded-full mt-3 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${data.color}, ${data.color}88)`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ delay: delay + 0.6, duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Secondary Metrics */}
      <motion.div
        className="grid grid-cols-3 gap-3 mb-4"
        variants={itemVariants}
      >
        {data.secondaryMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="bg-slate-900/30 rounded-lg p-3 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
            transition={{ delay: delay + 0.4 + i * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(15, 23, 42, 0.5)' }}
          >
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
              {metric.label}
            </div>
            <div className="text-sm font-mono font-semibold text-slate-200 mt-1">
              {metric.value}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Data Table */}
      {showDetails && !compact && (
        <motion.div
          className="bg-slate-900/40 rounded-xl overflow-hidden mb-4"
          variants={itemVariants}
        >
          {/* Table Header */}
          <div
            className="grid gap-1 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              gridTemplateColumns: `60px repeat(${data.tableHeaders.length - 1}, 1fr)`,
              backgroundColor: `${data.color}20`,
              color: data.color,
            }}
          >
            {data.tableHeaders.map((header, i) => (
              <span key={i} className={i > 0 ? 'text-center' : ''}>
                {header}
              </span>
            ))}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {data.tableRows.map((row, rowIndex) => (
              <motion.div
                key={row.label}
                className="grid gap-1 px-3 py-2 text-xs"
                style={{
                  gridTemplateColumns: `60px repeat(${data.tableHeaders.length - 1}, 1fr)`,
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
                transition={{ delay: delay + 0.6 + rowIndex * 0.08 }}
                onMouseEnter={() => setHoveredRow(rowIndex)}
                onMouseLeave={() => setHoveredRow(null)}
                whileHover={{ backgroundColor: `${data.color}10` }}
              >
                <span
                  className="font-semibold"
                  style={{ color: hoveredRow === rowIndex ? data.color : '#94a3b8' }}
                >
                  {row.label}
                </span>
                {row.values.map((value, i) => (
                  <span key={i} className="text-center font-mono text-slate-300">
                    {value}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Bottom Metrics */}
      <motion.div
        className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5"
        variants={itemVariants}
      >
        {data.bottomMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: delay + 0.8 + i * 0.1 }}
          >
            <div className="text-[10px] text-slate-500 uppercase">{metric.label}</div>
            <div
              className={`text-sm font-mono font-semibold ${
                metric.isNegative ? 'text-rose-400' : 'text-slate-200'
              }`}
            >
              {metric.value}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      {!compact && (
        <motion.div
          className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-white/5"
          variants={itemVariants}
        >
          <motion.div
            className="bg-slate-900/30 rounded-lg p-3 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-[10px] text-slate-500 uppercase">Gross Exposure</div>
            <div className="text-base font-mono font-bold text-slate-100">
              {data.footer.gross}
            </div>
          </motion.div>
          <motion.div
            className="bg-slate-900/30 rounded-lg p-3 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-[10px] text-slate-500 uppercase">Net Exposure</div>
            <div className="text-base font-mono font-bold text-slate-100">
              {data.footer.net}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

// ==============================================
// ANIMATED CARD ROW (for showcasing all cards)
// ==============================================

export function AnimatedRiskCardRow({
  variants = ['equity', 'rates', 'credit', 'fx', 'commodities', 'other'],
  compact = true,
  staggerDelay = 0.15,
}: {
  variants?: RiskCardVariant[]
  compact?: boolean
  staggerDelay?: number
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x snap-mandatory">
      {variants.map((variant, index) => (
        <div key={variant} className="snap-start">
          <AnimatedRiskCard
            variant={variant}
            delay={index * staggerDelay}
            compact={compact}
            showDetails={!compact}
          />
        </div>
      ))}
    </div>
  )
}
