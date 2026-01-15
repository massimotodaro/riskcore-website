'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Shield, BarChart3 } from 'lucide-react'

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return { count, ref }
}

// Mini Line Chart Component
function MiniLineChart({ data, color }: { data: number[], color: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 80 - 10
    return `${x},${y}`
  }).join(' ')

  return (
    <svg ref={ref} viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <motion.polygon
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        points={`0,100 ${points} 100,100`}
        fill={`url(#gradient-${color})`}
      />
      {/* Line */}
      <motion.polyline
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

// Sector Bar Component
function SectorBar({ name, value, maxValue, color, delay }: {
  name: string
  value: number
  maxValue: number
  color: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const pct = (value / maxValue) * 100

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="text-xs text-text-muted w-20 truncate">{name}</span>
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-mono text-text-secondary w-12 text-right">${value}M</span>
    </div>
  )
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

// Sample chart data
const performanceData = [100, 102, 98, 105, 103, 108, 106, 112, 115, 118, 122, 125]
const varHistory = [12.5, 13.1, 12.8, 13.4, 13.2, 13.7]

// Sector exposure data
const sectors = [
  { name: 'Technology', value: 85, color: '#3b82f6' },
  { name: 'Healthcare', value: 45, color: '#22c55e' },
  { name: 'Financials', value: 32, color: '#a855f7' },
  { name: 'Energy', value: 28, color: '#f97316' },
  { name: 'Consumer', value: 22, color: '#06b6d4' },
]

export default function AnimatedDashboardV2() {
  const firmExposure = useCounter(442000000, 2500)
  const firmVaR = useCounter(13700000, 2500)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="relative w-full max-w-5xl mx-auto"
    >
      {/* Main Dashboard Card */}
      <motion.div
        variants={cardVariants}
        className="glass-card p-8 rounded-2xl border border-white/10 dark:border-white/10 bg-bg-secondary/80 dark:bg-[rgba(30,41,59,0.9)] backdrop-blur-xl"
      >
        {/* Big Numbers Row */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Firm-Wide Exposure */}
          <motion.div variants={cardVariants} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-brand-green" />
              <span className="text-sm text-text-muted uppercase tracking-wider">Firm-Wide Exposure</span>
            </div>
            <div className="text-5xl md:text-6xl font-bold font-mono text-text-primary mb-2">
              <span ref={firmExposure.ref}>
                ${Math.floor(firmExposure.count / 1000000)}M
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 text-brand-green">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+2.4% today</span>
            </div>
            {/* Mini Chart */}
            <div className="h-16 mt-4">
              <MiniLineChart data={performanceData} color="#22c55e" />
            </div>
          </motion.div>

          {/* Firm-Wide VaR */}
          <motion.div variants={cardVariants} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-brand-blue" />
              <span className="text-sm text-text-muted uppercase tracking-wider">Value at Risk (95%)</span>
            </div>
            <div className="text-5xl md:text-6xl font-bold font-mono text-text-primary mb-2">
              <span ref={firmVaR.ref}>
                ${(firmVaR.count / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="text-sm text-text-muted">
              <span className="text-brand-blue font-semibold">3.1%</span> of NAV
            </div>
            {/* Mini Chart */}
            <div className="h-16 mt-4">
              <MiniLineChart data={varHistory} color="#3b82f6" />
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Row: Sector Exposure + PM Performance */}
        <div className="grid grid-cols-2 gap-8">
          {/* Sector Exposure */}
          <motion.div variants={cardVariants}>
            <div className="text-xs text-text-muted uppercase tracking-wider mb-4">Sector Exposure</div>
            <div className="space-y-3">
              {sectors.map((sector, i) => (
                <SectorBar
                  key={sector.name}
                  name={sector.name}
                  value={sector.value}
                  maxValue={100}
                  color={sector.color}
                  delay={0.6 + i * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* PM Performance Grid */}
          <motion.div variants={cardVariants}>
            <div className="text-xs text-text-muted uppercase tracking-wider mb-4">PM Performance (MTD)</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Alpha Fund', return: '+1.92%', positive: true },
                { name: 'Beta Quant', return: '-1.06%', positive: false },
                { name: 'Gamma Global', return: '+2.06%', positive: true },
                { name: 'Delta Macro', return: '+0.84%', positive: true },
              ].map((pm, i) => (
                <motion.div
                  key={pm.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-3 rounded-lg border ${
                    pm.positive
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-red-500/5 border-red-500/20'
                  }`}
                >
                  <div className="text-xs text-text-muted mb-1 truncate">{pm.name}</div>
                  <div className={`text-lg font-bold font-mono flex items-center gap-1 ${
                    pm.positive ? 'text-brand-green' : 'text-red-400'
                  }`}>
                    {pm.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {pm.return}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating glow effects */}
      <div className="absolute -inset-4 bg-gradient-to-r from-brand-green/20 via-brand-blue/10 to-brand-purple/20 rounded-3xl blur-3xl -z-10 opacity-40" />
    </motion.div>
  )
}
