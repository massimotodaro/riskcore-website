'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState, useCallback } from 'react'
import { Activity, Zap, AlertCircle, RefreshCw } from 'lucide-react'

// Live updating counter with subtle fluctuation
function LiveCounter({ baseValue, label, prefix = '$', suffix = '', fluctuation = 0.02 }: {
  baseValue: number
  label: string
  prefix?: string
  suffix?: string
  fluctuation?: number
}) {
  const [value, setValue] = useState(baseValue)
  const [isIncreasing, setIsIncreasing] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Initial count-up animation
  useEffect(() => {
    if (!isInView || hasAnimated) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / 2500, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setValue(Math.floor(easeOutQuart * baseValue))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setHasAnimated(true)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [baseValue, isInView, hasAnimated])

  // Continuous subtle fluctuation after initial animation
  useEffect(() => {
    if (!hasAnimated) return

    const interval = setInterval(() => {
      setValue(prev => {
        const change = (Math.random() - 0.5) * baseValue * fluctuation
        const newValue = Math.max(baseValue * 0.95, Math.min(baseValue * 1.05, prev + change))
        setIsIncreasing(newValue > prev)
        return newValue
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [hasAnimated, baseValue, fluctuation])

  const formatValue = (v: number) => {
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`
    if (v >= 1000) return `${(v / 1000).toFixed(0)}K`
    return v.toFixed(0)
  }

  return (
    <div ref={ref} className="relative">
      <div className="text-xs text-text-muted uppercase tracking-wider mb-1">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold font-mono text-text-primary transition-all duration-300">
          {prefix}{formatValue(value)}{suffix}
        </span>
        <motion.span
          key={isIncreasing ? 'up' : 'down'}
          initial={{ opacity: 0, y: isIncreasing ? 5 : -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs ${isIncreasing ? 'text-brand-green' : 'text-red-400'}`}
        >
          {isIncreasing ? '▲' : '▼'}
        </motion.span>
      </div>
    </div>
  )
}

// Animated data feed row
function DataFeedRow({ ticker, value, change, delay }: {
  ticker: string
  value: string
  change: number
  delay: number
}) {
  const [currentChange, setCurrentChange] = useState(change)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChange(prev => {
        const delta = (Math.random() - 0.5) * 0.5
        return parseFloat((prev + delta).toFixed(2))
      })
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
    >
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
          className={`w-2 h-2 rounded-full ${currentChange >= 0 ? 'bg-brand-green' : 'bg-red-400'}`}
        />
        <span className="text-sm font-medium text-text-primary">{ticker}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-mono text-text-secondary">{value}</span>
        <motion.span
          key={currentChange}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className={`text-sm font-mono font-semibold ${currentChange >= 0 ? 'text-brand-green' : 'text-red-400'}`}
        >
          {currentChange >= 0 ? '+' : ''}{currentChange.toFixed(2)}%
        </motion.span>
      </div>
    </motion.div>
  )
}

// Animated progress ring
function ProgressRing({ value, maxValue, color, label }: {
  value: number
  maxValue: number
  color: string
  label: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })
  const pct = (value / maxValue) * 100
  const circumference = 2 * Math.PI * 36

  return (
    <div className="flex flex-col items-center">
      <svg ref={ref} width="90" height="90" className="transform -rotate-90">
        <circle
          cx="45"
          cy="45"
          r="36"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="6"
        />
        <motion.circle
          cx="45"
          cy="45"
          r="36"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: circumference * (1 - pct / 100) } : {}}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
        />
      </svg>
      <div className="text-center -mt-14">
        <div className="text-lg font-bold font-mono text-text-primary">{value}%</div>
        <div className="text-[10px] text-text-muted uppercase">{label}</div>
      </div>
    </div>
  )
}

// Alert with pulse animation
function PulsingAlert({ message, type }: { message: string, type: 'warning' | 'info' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative flex items-center gap-2 p-3 rounded-lg text-xs ${
        type === 'warning'
          ? 'bg-yellow-500/10 border border-yellow-500/30'
          : 'bg-blue-500/10 border border-blue-500/30'
      }`}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`absolute -left-1 -top-1 w-3 h-3 rounded-full ${
          type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
        }`}
      />
      <AlertCircle className={`w-4 h-4 ${type === 'warning' ? 'text-yellow-400' : 'text-blue-400'}`} />
      <span className="text-text-secondary">{message}</span>
    </motion.div>
  )
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// Market data
const marketData = [
  { ticker: 'SPY', value: '5,234.82', change: 0.45 },
  { ticker: 'QQQ', value: '445.67', change: -0.32 },
  { ticker: 'TLT', value: '92.45', change: 0.18 },
  { ticker: 'GLD', value: '189.23', change: 0.67 },
]

export default function AnimatedDashboardV3() {
  const [lastUpdate, setLastUpdate] = useState('09:45:32')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Simulate periodic updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setLastUpdate(now.toLocaleTimeString('en-US', { hour12: false }))
      setIsRefreshing(true)
      setTimeout(() => setIsRefreshing(false), 500)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="relative w-full max-w-5xl mx-auto"
    >
      {/* Dashboard Container */}
      <motion.div
        variants={cardVariants}
        className="glass-card p-6 rounded-2xl border border-white/10 dark:border-white/10 bg-bg-secondary/80 dark:bg-[rgba(30,41,59,0.9)] backdrop-blur-xl overflow-hidden"
      >
        {/* Animated Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Activity className="w-5 h-5 text-brand-green" />
            </motion.div>
            <span className="text-sm font-semibold text-text-primary">LIVE RISK MONITOR</span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xs text-brand-green px-2 py-0.5 rounded-full bg-brand-green/10 border border-brand-green/30"
            >
              ● Live
            </motion.span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <motion.div animate={isRefreshing ? { rotate: 360 } : {}} transition={{ duration: 0.5 }}>
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'text-brand-blue' : ''}`} />
            </motion.div>
            <span className="font-mono">{lastUpdate}</span>
          </div>
        </div>

        {/* Main Metrics Row */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <motion.div variants={cardVariants} className="col-span-1">
            <LiveCounter baseValue={442000000} label="Gross Exposure" />
          </motion.div>
          <motion.div variants={cardVariants} className="col-span-1">
            <LiveCounter baseValue={13700000} label="VaR (95%)" />
          </motion.div>
          <motion.div variants={cardVariants} className="col-span-1">
            <LiveCounter baseValue={4247} label="Positions" prefix="" fluctuation={0.005} />
          </motion.div>
          <motion.div variants={cardVariants} className="col-span-1">
            <LiveCounter baseValue={3.1} label="VaR / NAV" prefix="" suffix="%" fluctuation={0.1} />
          </motion.div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-3 gap-4">
          {/* Market Data Feed */}
          <motion.div variants={cardVariants} className="glass-card p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-brand-yellow" />
              <span className="text-xs text-text-muted uppercase tracking-wider">Market Feed</span>
            </div>
            <div className="space-y-1">
              {marketData.map((item, i) => (
                <DataFeedRow key={item.ticker} {...item} delay={0.6 + i * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* Risk Gauges */}
          <motion.div variants={cardVariants} className="glass-card p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-text-muted uppercase tracking-wider mb-4 text-center">Risk Utilization</div>
            <div className="flex justify-around">
              <ProgressRing value={72} maxValue={100} color="#3b82f6" label="Equity" />
              <ProgressRing value={45} maxValue={100} color="#22c55e" label="Rates" />
            </div>
          </motion.div>

          {/* Alerts */}
          <motion.div variants={cardVariants} className="glass-card p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-text-muted uppercase tracking-wider mb-3">Live Alerts</div>
            <div className="space-y-2">
              <PulsingAlert type="warning" message="Tech sector at 12.4% limit" />
              <PulsingAlert type="info" message="PM correlation spike detected" />
            </div>
          </motion.div>
        </div>

        {/* Animated scan line effect */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-green/50 to-transparent"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Floating glow */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-brand-blue/15 via-brand-green/15 to-brand-purple/15 rounded-3xl blur-3xl -z-10"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  )
}
