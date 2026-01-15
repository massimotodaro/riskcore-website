'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, Activity } from 'lucide-react'

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!startOnView || !isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView, startOnView])

  return { count, ref }
}

// Format currency
const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value}`
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

const barVariants = {
  hidden: { width: 0 },
  visible: (width: number) => ({
    width: `${width}%`,
    transition: { duration: 1.2, ease: 'easeOut', delay: 0.5 }
  })
}

// Asset class data from Riskboard
const assetClasses = [
  { name: 'EQUITY', color: '#579CF9', value: 42500000, metric: 'Net Delta', pct: 75 },
  { name: 'RATES', color: '#3CD574', value: 85000, metric: 'DV01', pct: 55 },
  { name: 'CREDIT', color: '#a855f7', value: 42000, metric: 'CS01', pct: 45 },
  { name: 'FX', color: '#06b6d4', value: 18200000, metric: 'FX Delta', pct: 35 },
]

// PM data
const portfolioManagers = [
  { name: 'Alpha Fund', return: '+1.92%', positive: true },
  { name: 'Beta Quant', return: '-1.06%', positive: false },
  { name: 'Gamma Global', return: '+2.06%', positive: true },
  { name: 'Delta Macro', return: '+0.84%', positive: true },
]

// Alerts
const alerts = [
  { type: 'warning', message: 'Semiconductor exposure at 12.4%' },
  { type: 'info', message: 'Correlation detected: Alpha & Beta' },
]

export default function AnimatedDashboardV1() {
  const firmExposure = useCounter(442000000, 2500)
  const firmVaR = useCounter(13700000, 2500)
  const positions = useCounter(4247, 2000)

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
        className="glass-card p-6 rounded-2xl border border-white/10 dark:border-white/10 bg-bg-secondary/80 dark:bg-[rgba(30,41,59,0.9)] backdrop-blur-xl"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-brand-green animate-pulse" />
            <span className="text-sm font-semibold text-text-primary">RISKBOARD</span>
            <span className="text-xs text-text-muted px-2 py-1 rounded bg-white/5">Live</span>
          </div>
          <div className="text-xs text-text-muted">
            Last updated: <span className="font-mono">09:45:32</span>
          </div>
        </div>

        {/* Top Summary Row */}
        <motion.div variants={cardVariants} className="grid grid-cols-3 gap-4 mb-6">
          {/* Firm-Wide Exposure */}
          <div className="glass-card p-4 rounded-xl bg-brand-green/5 border border-brand-green/20">
            <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Firm-Wide Exposure</div>
            <div className="text-2xl font-bold font-mono text-text-primary">
              <span ref={firmExposure.ref}>{formatCurrency(firmExposure.count)}</span>
            </div>
            <div className="text-xs text-brand-green mt-1">{positions.count.toLocaleString()} positions</div>
          </div>

          {/* Firm-Wide VaR */}
          <div className="glass-card p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/20">
            <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Firm-Wide VaR (95%)</div>
            <div className="text-2xl font-bold font-mono text-text-primary">
              <span ref={firmVaR.ref}>{formatCurrency(firmVaR.count)}</span>
            </div>
            <div className="text-xs text-text-muted mt-1">3.1% of NAV</div>
          </div>

          {/* Risk Status */}
          <div className="glass-card p-4 rounded-xl bg-brand-purple/5 border border-brand-purple/20">
            <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Risk Status</div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-green" />
              <span className="text-lg font-semibold text-brand-green">Normal</span>
            </div>
            <div className="text-xs text-text-muted mt-1">All limits within bounds</div>
          </div>
        </motion.div>

        {/* Asset Class Cards Row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {assetClasses.map((asset, i) => (
            <motion.div
              key={asset.name}
              variants={cardVariants}
              custom={i}
              className="glass-card p-3 rounded-xl bg-white/5 dark:bg-white/5 border border-white/10"
            >
              <div
                className="text-xs font-bold mb-2"
                style={{ color: asset.color }}
              >
                {asset.name}
              </div>
              <div className="text-lg font-bold font-mono text-text-primary mb-1">
                {asset.metric === 'Net Delta' || asset.metric === 'FX Delta'
                  ? formatCurrency(asset.value)
                  : `$${(asset.value / 1000).toFixed(0)}K`}
              </div>
              <div className="text-[10px] text-text-muted mb-2">{asset.metric}</div>
              {/* Progress Bar */}
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  variants={barVariants}
                  custom={asset.pct}
                  className="h-full rounded-full"
                  style={{ backgroundColor: asset.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Row: PMs + Alerts */}
        <div className="grid grid-cols-2 gap-4">
          {/* Portfolio Managers */}
          <motion.div variants={cardVariants} className="glass-card p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-text-muted uppercase tracking-wider mb-3">Portfolio Managers</div>
            <div className="space-y-2">
              {portfolioManagers.map((pm, i) => (
                <motion.div
                  key={pm.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between py-1"
                >
                  <span className="text-sm text-text-secondary">{pm.name}</span>
                  <span className={`text-sm font-mono font-semibold flex items-center gap-1 ${pm.positive ? 'text-brand-green' : 'text-red-400'}`}>
                    {pm.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {pm.return}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Alerts */}
          <motion.div variants={cardVariants} className="glass-card p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-text-muted uppercase tracking-wider mb-3">Alerts</div>
            <div className="space-y-2">
              {alerts.map((alert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.15 }}
                  viewport={{ once: true }}
                  className={`flex items-start gap-2 p-2 rounded-lg text-xs ${
                    alert.type === 'warning'
                      ? 'bg-yellow-500/10 border border-yellow-500/20'
                      : 'bg-blue-500/10 border border-blue-500/20'
                  }`}
                >
                  <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${
                    alert.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                  }`} />
                  <span className="text-text-secondary">{alert.message}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue/10 via-brand-purple/10 to-brand-green/10 rounded-3xl blur-2xl -z-10 opacity-50" />
    </motion.div>
  )
}
