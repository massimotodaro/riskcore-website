'use client'

/**
 * AnimatedRiskboard.tsx
 *
 * "You're now officially Marty McFly of Risk Management!"
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
  pct: string
  value: string
}

// ==============================================
// ANIMATED NUMBER COMPONENT
// ==============================================

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  duration = 2
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(easeOut * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [value, duration])

  return (
    <span>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
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
// SIDEBAR COMPONENT
// ==============================================

function AnimatedSidebar() {
  const menuItems = [
    { icon: '📊', label: 'Riskboard', active: true },
    { icon: '📋', label: 'Positions', active: false },
    { icon: '💹', label: 'Trades', active: false },
    { icon: '🔄', label: 'Overlaps', active: false },
    { icon: '📈', label: 'Correlation', active: false },
    { icon: '📤', label: 'Upload', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
  ]

  return (
    <motion.div
      className="w-48 bg-slate-950/90 border-r border-white/10 flex flex-col h-full"
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
        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent tracking-wider">
          RISKCORE
        </h1>
      </motion.div>

      {/* Menu Items */}
      <div className="flex-1 py-4 px-2 space-y-1">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.label}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer
              transition-all duration-300
              ${item.active
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'text-slate-500 blur-[1px] hover:blur-0 hover:text-slate-400'
              }
            `}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.08, duration: 0.4 }}
            whileHover={!item.active ? { x: 5, filter: 'blur(0px)' } : {}}
          >
            <span className="text-base">{item.icon}</span>
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
        className="p-3 border-t border-white/10 text-xs text-slate-600"
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
  const [currentTime, setCurrentTime] = useState('14:32:15')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toTimeString().split(' ')[0])
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.header
      className="h-14 bg-slate-950/80 border-b border-white/10 flex items-center justify-between px-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold text-slate-100">Riskboard</span>

        {/* Time Travel Selector */}
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-white/10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
          whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
        >
          <PulsingDot />
          <span className="text-sm text-slate-300">Latest (Now)</span>
          <span className="text-slate-500 text-xs">▼</span>
        </motion.div>

        {/* Calculate Button */}
        <motion.button
          className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-400 text-sm font-medium"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, type: 'spring' }}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ↻
          </motion.span>
          Calculate
        </motion.button>

        <motion.span
          className="text-xs text-slate-500 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Last: {currentTime}
        </motion.span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500">Color Mode</span>
        <div className="w-12 h-6 bg-slate-700 rounded-full relative">
          <motion.div
            className="absolute w-5 h-5 rounded-full top-0.5 left-0.5"
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
  const [marketData, setMarketData] = useState<MarketData[]>([
    { ticker: 'SPY', price: '584.20', change: '+0.8%', isUp: true },
    { ticker: 'QQQ', price: '498.50', change: '+1.2%', isUp: true },
    { ticker: 'TLT', price: '92.45', change: '-0.4%', isUp: false },
    { ticker: 'CDX.IG', price: '52.8', change: '+1.2bp', isUp: false },
    { ticker: 'EUR/USD', price: '1.0842', change: '-0.2%', isUp: false },
    { ticker: 'GLD', price: '192.80', change: '+0.6%', isUp: true },
    { ticker: 'VIX', price: '14.20', change: '-3.2%', isUp: true },
  ])

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => {
        const change = (Math.random() - 0.5) * 0.1
        const currentPrice = parseFloat(item.price.replace(',', ''))
        const newPrice = currentPrice + change
        return {
          ...item,
          price: item.ticker === 'GLD' ? newPrice.toFixed(2) :
                 item.ticker === 'EUR/USD' ? newPrice.toFixed(4) :
                 newPrice.toFixed(2),
        }
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="bg-slate-900/60 border-b border-white/5 px-4 py-2 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <motion.div
        className="flex gap-6"
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[...marketData, ...marketData].map((item, index) => (
          <motion.div
            key={`${item.ticker}-${index}`}
            className="flex items-center gap-2 text-xs whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + (index % marketData.length) * 0.05 }}
          >
            <span className="text-slate-400 font-semibold">{item.ticker}</span>
            <motion.span
              className="text-slate-200 font-mono"
              key={item.price}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
            >
              {item.price}
            </motion.span>
            <span className={item.isUp ? 'text-emerald-400' : 'text-rose-400'}>
              {item.change}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

// ==============================================
// SUMMARY STRIP
// ==============================================

function SummaryStrip() {
  return (
    <motion.div
      className="flex items-center gap-8 px-4 py-3 border-b border-white/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-400">Firm Gross:</span>
        <motion.span
          className="text-lg font-bold font-mono text-slate-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          $<AnimatedNumber value={2090} suffix="M" duration={2.5} />
        </motion.span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-400">Firm Net:</span>
        <motion.span
          className="text-lg font-bold font-mono text-emerald-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          $<AnimatedNumber value={641} suffix="M" duration={2.5} />
        </motion.span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-400">Positions:</span>
        <motion.span
          className="text-lg font-bold font-mono text-slate-100"
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
// MINI RISK CARD (for the animated hero)
// ==============================================

interface MiniRiskCardProps {
  title: string
  color: string
  netNumber: number
  change: string
  isUp: boolean
  metrics: { label: string; value: string }[]
  rows: DataRow[]
  riskParam: string
  barPercentage: number
  delay: number
}

function MiniRiskCard({
  title,
  color,
  netNumber,
  change,
  isUp,
  metrics,
  rows,
  riskParam,
  barPercentage,
  delay
}: MiniRiskCardProps) {
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setBarWidth(barPercentage), delay * 1000 + 500)
    return () => clearTimeout(timer)
  }, [barPercentage, delay])

  return (
    <motion.div
      className="bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-lg p-2 flex flex-col h-full"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, type: 'spring' }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 20px ${color}20`,
        borderColor: `${color}40`
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold tracking-wide" style={{ color }}>{title}</span>
        <span className={`text-[9px] font-medium ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isUp ? '▲' : '▼'} {change}
        </span>
      </div>

      {/* Primary Metric */}
      <div className="mb-1">
        <div className="text-[9px] text-slate-500">Net Exposure</div>
        <motion.div
          className="text-base font-bold font-mono text-slate-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          $<AnimatedNumber value={netNumber} suffix="M" duration={1.5} />
        </motion.div>

        {/* Animated Bar */}
        <div className="h-0.5 bg-slate-700 rounded-full mt-0.5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${color}, ${color}aa)`,
              width: `${barWidth}%`
            }}
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ delay: delay + 0.5, duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Data Rows Table */}
      <div className="flex-1 min-h-0">
        <div
          className="grid grid-cols-3 gap-0.5 px-1 py-0.5 text-[7px] font-semibold uppercase tracking-wider rounded-t"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          <span></span>
          <span className="text-center">%</span>
          <span className="text-center">{riskParam}</span>
        </div>
        <div className="bg-slate-900/40 rounded-b">
          {rows.slice(0, 3).map((row, i) => (
            <motion.div
              key={row.label}
              className="grid grid-cols-3 gap-0.5 px-1 py-px text-[8px] hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.6 + i * 0.06 }}
            >
              <span className="text-slate-400 font-medium truncate">{row.label}</span>
              <span className="text-center font-mono text-slate-300">{row.pct}</span>
              <span className="text-center font-mono text-slate-300">{row.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mini Metrics - Fixed at bottom */}
      <div className="grid grid-cols-3 gap-0.5 pt-1 mt-1 border-t border-white/5">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.4 + i * 0.1 }}
          >
            <div className="text-[7px] text-slate-500 uppercase leading-tight">{metric.label}</div>
            <div className="text-[9px] font-mono text-slate-300 leading-tight">{metric.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ==============================================
// MAIN ANIMATED RISKBOARD COMPONENT
// ==============================================

export default function AnimatedRiskboard() {
  const riskCards = [
    {
      title: 'EQUITY',
      color: '#3b82f6',
      netNumber: 42.5,
      change: '+1.2%',
      isUp: true,
      riskParam: 'Delta',
      metrics: [
        { label: 'Beta', value: '1.15' },
        { label: 'Vega', value: '$280K' },
        { label: 'Gamma', value: '$42K' },
      ],
      rows: [
        { label: 'N. America', pct: '48%', value: '$20.4M' },
        { label: 'Europe', pct: '22%', value: '$9.4M' },
        { label: 'Japan', pct: '15%', value: '$6.4M' },
        { label: 'SE Asia', pct: '10%', value: '$4.3M' },
        { label: 'RoW', pct: '5%', value: '$2.0M' },
      ],
      barPercentage: 65,
    },
    {
      title: 'RATES',
      color: '#22c55e',
      netNumber: 120,
      change: '-0.8%',
      isUp: false,
      riskParam: 'DV01',
      metrics: [
        { label: 'DV01', value: '$85K' },
        { label: 'Duration', value: '4.2Y' },
        { label: 'Convex', value: '0.45' },
      ],
      rows: [
        { label: '2Y', pct: '21%', value: '$18K' },
        { label: '5Y', pct: '38%', value: '$32K' },
        { label: '10Y', pct: '33%', value: '$28K' },
        { label: '30Y', pct: '8%', value: '$7K' },
      ],
      barPercentage: 55,
    },
    {
      title: 'CREDIT',
      color: '#a855f7',
      netNumber: 72,
      change: '-1.2%',
      isUp: false,
      riskParam: 'CS01',
      metrics: [
        { label: 'CS01', value: '$42K' },
        { label: 'Cr.Dur', value: '3.8Y' },
        { label: 'Avg PD', value: '2.4%' },
      ],
      rows: [
        { label: 'AAA-AA', pct: '18%', value: '$7.5K' },
        { label: 'A', pct: '32%', value: '$13.4K' },
        { label: 'BBB', pct: '28%', value: '$11.8K' },
        { label: 'HY', pct: '16%', value: '$6.7K' },
        { label: 'Distress', pct: '6%', value: '$2.6K' },
      ],
      barPercentage: 45,
    },
    {
      title: 'FX',
      color: '#06b6d4',
      netNumber: 18.2,
      change: '+0.4%',
      isUp: true,
      riskParam: 'Delta',
      metrics: [
        { label: 'Delta', value: '$18.2M' },
        { label: 'Vega', value: '$320K' },
        { label: 'Pairs', value: '12' },
      ],
      rows: [
        { label: 'EUR', pct: '38%', value: '$6.9M' },
        { label: 'JPY', pct: '25%', value: '$4.5M' },
        { label: 'GBP', pct: '18%', value: '$3.3M' },
        { label: 'CHF', pct: '12%', value: '$2.2M' },
        { label: 'Other', pct: '7%', value: '$1.3M' },
      ],
      barPercentage: 35,
    },
    {
      title: 'CMDTY',
      color: '#eab308',
      netNumber: 28.5,
      change: '+1.5%',
      isUp: true,
      riskParam: 'Exp',
      metrics: [
        { label: 'P.Sens', value: '$285K' },
        { label: 'Basis', value: '$45K' },
        { label: 'Roll', value: '-0.8%' },
      ],
      rows: [
        { label: 'Crude', pct: '42%', value: '$12M' },
        { label: 'Gold', pct: '28%', value: '$8M' },
        { label: 'NatGas', pct: '15%', value: '$4.3M' },
        { label: 'Copper', pct: '10%', value: '$2.8M' },
        { label: 'Other', pct: '5%', value: '$1.4M' },
      ],
      barPercentage: 40,
    },
    {
      title: 'OTHER',
      color: '#94a3b8',
      netNumber: 8.2,
      change: '-0.2%',
      isUp: false,
      riskParam: 'Value',
      metrics: [
        { label: 'VaR', value: '$340K' },
        { label: 'CVaR', value: '$520K' },
        { label: 'Pos', value: '45' },
      ],
      rows: [
        { label: 'Struct', pct: '55%', value: '$4.5M' },
        { label: 'Vol', pct: '30%', value: '$2.5M' },
        { label: 'Other', pct: '15%', value: '$1.2M' },
      ],
      barPercentage: 25,
    },
  ]

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

      {/* Main Container with 3D Perspective - 3:2 Aspect Ratio */}
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
        whileHover={{
          rotateX: 2,
          rotateY: 2,
          transition: { duration: 0.3 }
        }}
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <AnimatedSidebar />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <AnimatedHeader />

            {/* Market Anchors */}
            <MarketAnchorsStrip />

            {/* Summary Strip */}
            <SummaryStrip />

            {/* Risk Cards Grid - 2 rows of 3 */}
            <motion.div
              className="flex-1 p-4 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="grid grid-cols-3 grid-rows-2 gap-3 h-full">
                {riskCards.map((card, index) => (
                  <MiniRiskCard
                    key={card.title}
                    {...card}
                    delay={2.8 + index * 0.12}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Floating Cursor Animation (optional - shows interactivity) */}
      <motion.div
        className="absolute w-4 h-4 pointer-events-none z-50"
        initial={{ x: 100, y: 200, opacity: 0 }}
        animate={{
          x: [100, 300, 450, 600, 400, 200, 100],
          y: [200, 150, 250, 180, 300, 250, 200],
          opacity: [0, 1, 1, 1, 1, 1, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut'
        }}
      >
        <svg viewBox="0 0 24 24" fill="white" className="drop-shadow-lg">
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"/>
        </svg>
      </motion.div>
    </div>
  )
}
