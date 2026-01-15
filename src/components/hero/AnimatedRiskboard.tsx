'use client'

/**
 * AnimatedRiskboard.tsx
 *
 * "You're now officially the Marty McFly of Risk Management!"
 *
 * A dynamic, attention-grabbing animated Riskboard for the hero section.
 * Designed to make boring risk managers with pinky rings spill their espresso.
 *
 * Usage:
 *   <AnimatedRiskboard />
 *
 * Dependencies:
 *   npm install framer-motion
 */

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// ==============================================
// TYPES
// ==============================================

interface MarketData {
  ticker: string
  price: string
  change: string
  isUp: boolean
}

interface DataRow {
  label: string
  values: string[]
}

interface RiskCardData {
  title: string
  color: string
  primaryLabel: string
  primaryValue: string
  primaryNumber: number
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
// ANIMATED NUMBER COMPONENT
// ==============================================

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  decimals = 0
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(easeOut * value)
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [value, duration])

  const formatted = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toLocaleString()

  return <span>{prefix}{formatted}{suffix}</span>
}

// ==============================================
// PULSING DOT COMPONENT
// ==============================================

function PulsingDot({ color = '#22c55e' }: { color?: string }) {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex rounded-full h-2 w-2"
        style={{ backgroundColor: color }}
      />
    </span>
  )
}

// ==============================================
// MODERN SVG ICONS
// ==============================================

const Icons = {
  riskboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  positions: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 9v6" />
      <path d="M15 9v6" />
      <rect x="3" y="5" width="18" height="14" rx="2" />
    </svg>
  ),
  trades: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M17 7h4v4" />
    </svg>
  ),
  overlaps: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </svg>
  ),
  correlation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 3v18h18" />
      <circle cx="9" cy="15" r="2" />
      <circle cx="13" cy="10" r="2" />
      <circle cx="17" cy="7" r="2" />
      <path d="M9 15l4-5" />
      <path d="M13 10l4-3" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 15V3" />
      <path d="M8 7l4-4 4 4" />
      <path d="M20 21H4" />
      <path d="M20 17v4" />
      <path d="M4 17v4" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4" />
      <path d="M12 19v4" />
      <path d="M4.22 4.22l2.83 2.83" />
      <path d="M16.95 16.95l2.83 2.83" />
      <path d="M1 12h4" />
      <path d="M19 12h4" />
      <path d="M4.22 19.78l2.83-2.83" />
      <path d="M16.95 7.05l2.83-2.83" />
    </svg>
  ),
}

// ==============================================
// SIDEBAR COMPONENT
// ==============================================

function AnimatedSidebar() {
  const menuItems = [
    { icon: Icons.riskboard, label: 'Riskboard', active: true },
    { icon: Icons.positions, label: 'Positions', active: false },
    { icon: Icons.trades, label: 'Trades', active: false },
    { icon: Icons.overlaps, label: 'Overlaps', active: false },
    { icon: Icons.correlation, label: 'Correlation', active: false },
    { icon: Icons.upload, label: 'Upload', active: false },
    { icon: Icons.settings, label: 'Settings', active: false },
  ]

  return (
    <motion.div
      className="w-44 bg-slate-950/90 border-r border-white/10 flex flex-col h-full flex-shrink-0"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Logo */}
      <motion.div
        className="p-4 border-b border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent tracking-wider">
          RISKCORE
        </h1>
      </motion.div>

      {/* Menu Items */}
      <div className="flex-1 py-3 px-2 space-y-0.5">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.label}
            className={`
              flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer
              transition-all duration-300
              ${item.active
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'text-slate-500 blur-[0.5px] hover:blur-0 hover:text-slate-400'
              }
            `}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.08, duration: 0.4 }}
            whileHover={!item.active ? { x: 5, filter: 'blur(0px)' } : {}}
          >
            <span className="flex-shrink-0 opacity-80">{item.icon}</span>
            <span>{item.label}</span>
            {item.active && (
              <motion.div
                className="ml-auto"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
              >
                <PulsingDot />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="p-2.5 border-t border-white/10 text-[10px] text-slate-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        v1.0.0 | On-Premises
      </motion.div>
    </motion.div>
  )
}

// ==============================================
// HEADER WITH TIME TRAVEL
// ==============================================

function AnimatedHeader() {
  const [currentTime, setCurrentTime] = useState('16:14:49')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toTimeString().split(' ')[0])
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.header
      className="h-11 bg-slate-950/80 border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-slate-100">Riskboard</span>

        {/* Time Travel Selector */}
        <motion.div
          className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/80 rounded-md border border-white/10 text-xs"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
        >
          <PulsingDot />
          <span className="text-slate-300">Latest (Now)</span>
          <span className="text-slate-500 text-[10px]">▼</span>
        </motion.div>

        {/* Calculate Button */}
        <motion.button
          className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-md text-emerald-400 text-xs font-medium"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, type: 'spring' }}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ↻
          </motion.span>
          Calculate
        </motion.button>

        <span className="text-[10px] text-slate-500 font-mono">Last: {currentTime}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] text-slate-500">Color Mode</span>
        <div className="w-10 h-5 bg-slate-700 rounded-full relative">
          <motion.div
            className="absolute w-4 h-4 rounded-full top-0.5 left-0.5"
            style={{
              background: 'conic-gradient(#ef4444, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #ef4444)'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.header>
  )
}

// ==============================================
// MARKET ANCHORS STRIP
// ==============================================

function MarketAnchorsStrip() {
  const [marketData] = useState<MarketData[]>([
    { ticker: 'SPY', price: '584.24', change: '+0.8%', isUp: true },
    { ticker: 'QQQ', price: '498.41', change: '+1.2%', isUp: true },
    { ticker: 'TLT', price: '92.56', change: '-0.4%', isUp: false },
    { ticker: 'CDX.IG', price: '52.80', change: '+1.2bp', isUp: false },
    { ticker: 'EUR/USD', price: '1.2820', change: '-0.2%', isUp: false },
    { ticker: 'GLD', price: '192.62', change: '+0.6%', isUp: true },
    { ticker: 'VIX', price: '14.21', change: '-3.2%', isUp: true },
  ])

  return (
    <motion.div
      className="bg-slate-900/60 border-b border-white/5 px-4 py-1.5 flex-shrink-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex gap-5">
        {marketData.map((item, index) => (
          <motion.div
            key={item.ticker}
            className="flex items-center gap-1.5 text-[10px] whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.05 }}
          >
            <span className="text-slate-400 font-semibold">{item.ticker}</span>
            <span className="text-slate-200 font-mono">{item.price}</span>
            <span className={item.isUp ? 'text-emerald-400' : 'text-rose-400'}>
              {item.change}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ==============================================
// SUMMARY STRIP
// ==============================================

function SummaryStrip() {
  return (
    <motion.div
      className="flex items-center gap-6 px-4 py-2 border-b border-white/5 flex-shrink-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-slate-400">Firm Gross:</span>
        <motion.span
          className="text-sm font-bold font-mono text-slate-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          $<AnimatedNumber value={2090} suffix="M" duration={2.5} />
        </motion.span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-slate-400">Firm Net:</span>
        <motion.span
          className="text-sm font-bold font-mono text-emerald-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          $<AnimatedNumber value={641} suffix="M" duration={2.5} />
        </motion.span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-slate-400">Positions:</span>
        <motion.span
          className="text-sm font-bold font-mono text-slate-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          <AnimatedNumber value={4081} duration={2.5} />
        </motion.span>
      </div>
    </motion.div>
  )
}

// ==============================================
// RISK CARD COMPONENT (Full Detail)
// ==============================================

function RiskCard({ data, delay }: { data: RiskCardData; delay: number }) {
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setBarWidth(65), delay * 1000 + 500)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <motion.div
      className="bg-slate-800/50 border border-white/10 rounded-lg overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
          animate={{ opacity: 1 }}
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
            animate={{ width: `${barWidth}%` }}
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
            animate={{ opacity: 1, scale: 1 }}
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
              animate={{ opacity: 1, x: 0 }}
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
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.9 }}
        >
          <div className="text-[8px] text-slate-500 uppercase">Positions</div>
          <div className="text-[10px] font-mono text-slate-200">{data.positions}</div>
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 1 }}
        >
          <div className="text-[8px] text-slate-500 uppercase">VaR (95%)</div>
          <div className="text-[10px] font-mono text-rose-400">{data.var95}</div>
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 1.2 }}
        >
          <div className="text-[8px] text-slate-500 uppercase">Gross Exposure</div>
          <div className="text-[11px] font-mono font-semibold text-slate-200">{data.grossExposure}</div>
        </motion.div>
        <motion.div
          className="bg-slate-900/40 rounded px-2 py-1.5 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
// CARD DATA
// ==============================================

const riskCardsData: RiskCardData[] = [
  {
    title: 'EQUITY',
    color: '#3b82f6',
    primaryLabel: 'NET DELTA',
    primaryValue: '$42.5M',
    primaryNumber: 42.5,
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
  },
  {
    title: 'RATES',
    color: '#22c55e',
    primaryLabel: 'DV01',
    primaryValue: '$85,000',
    primaryNumber: 85000,
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
  },
  {
    title: 'CREDIT',
    color: '#a855f7',
    primaryLabel: 'CS01',
    primaryValue: '$42,000',
    primaryNumber: 42000,
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
  },
  {
    title: 'FX',
    color: '#06b6d4',
    primaryLabel: 'FX DELTA',
    primaryValue: '$18.2M',
    primaryNumber: 18.2,
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
  },
  {
    title: 'COMMODITIES',
    color: '#eab308',
    primaryLabel: 'NET EXPOSURE',
    primaryValue: '$28.5M',
    primaryNumber: 28.5,
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
  },
  {
    title: 'OTHER',
    color: '#94a3b8',
    primaryLabel: 'NET EXPOSURE',
    primaryValue: '$5.8M',
    primaryNumber: 5.8,
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
  },
]

// ==============================================
// MAIN ANIMATED RISKBOARD COMPONENT
// ==============================================

export default function AnimatedRiskboard() {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Glow Effect Behind */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-purple-500/10 rounded-full blur-[80px]" />
      </motion.div>

      {/* Main Container - 3:2 Aspect Ratio */}
      <motion.div
        className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl"
        initial={{ opacity: 0, rotateX: 10, rotateY: -5, scale: 0.9 }}
        animate={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          aspectRatio: '3 / 2',
        }}
        whileHover={{ rotateX: 1, rotateY: 1, transition: { duration: 0.3 } }}
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <AnimatedSidebar />

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 h-full">
            {/* Header */}
            <AnimatedHeader />

            {/* Market Anchors */}
            <MarketAnchorsStrip />

            {/* Summary Strip */}
            <SummaryStrip />

            {/* Risk Cards Grid - Scrollable */}
            <motion.div
              className="flex-1 p-3 overflow-y-auto overflow-x-hidden min-h-0 riskboard-scrollbar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#334155 #0f172a',
              }}
            >
              <style>{`
                .riskboard-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .riskboard-scrollbar::-webkit-scrollbar-track {
                  background: #0f172a;
                  border-radius: 3px;
                }
                .riskboard-scrollbar::-webkit-scrollbar-thumb {
                  background: linear-gradient(180deg, #334155, #475569);
                  border-radius: 3px;
                }
                .riskboard-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: linear-gradient(180deg, #475569, #64748b);
                }
              `}</style>
              <div className="grid grid-cols-3 gap-3">
                {riskCardsData.map((card, index) => (
                  <RiskCard
                    key={card.title}
                    data={card}
                    delay={2.8 + index * 0.15}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
