/**
 * HeroCommandCenter.tsx
 *
 * Hero Variant 1: "The Command Center"
 *
 * Bold, powerful, stats-driven. Features the animated Riskboard
 * as the visual centerpiece. For CIOs and CROs who want to feel
 * like they're walking into mission control.
 *
 * Usage:
 *   <HeroCommandCenter />
 *
 * Dependencies:
 *   npm install framer-motion
 */

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// ==============================================
// ANIMATED COUNTER
// ==============================================

function AnimatedCounter({
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
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = value / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [value, duration])

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}

// ==============================================
// PULSING LIVE INDICATOR
// ==============================================

function LiveIndicator() {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      Live Demo
    </span>
  )
}

// ==============================================
// TRUST BADGES
// ==============================================

function TrustBadges() {
  const badges = [
    { icon: '🔒', label: 'On-Premises Only' },
    { icon: '🛡️', label: 'SOC 2 Ready' },
    { icon: '⭐', label: 'Open Source' },
  ]

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-4 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-sm text-slate-400"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 + i * 0.1 }}
        >
          <span>{badge.icon}</span>
          <span>{badge.label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ==============================================
// STATS ROW
// ==============================================

function StatsRow() {
  const stats = [
    { value: 50, suffix: '+', label: 'Funds Trust RISKCORE' },
    { value: 2.4, suffix: 'M', label: 'Positions Tracked Daily' },
    { value: 850, suffix: 'B', prefix: '$', label: 'AUM Monitored' },
    { value: 99.9, suffix: '%', label: 'Uptime SLA' },
  ]

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 + i * 0.1 }}
        >
          <div className="text-3xl md:text-4xl font-bold text-slate-100 font-mono">
            <AnimatedCounter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              duration={2}
            />
          </div>
          <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ==============================================
// MINI RISKBOARD PREVIEW
// ==============================================

function MiniRiskboard() {
  const riskPods = [
    { name: 'EQUITY', value: '$42.5M', color: '#3b82f6', change: '+1.2%' },
    { name: 'RATES', value: '$85K', color: '#22c55e', change: '-0.8%' },
    { name: 'CREDIT', value: '$42K', color: '#a855f7', change: '-1.2%' },
    { name: 'FX', value: '$18.2M', color: '#06b6d4', change: '+0.4%' },
    { name: 'CMDTY', value: '$28.5M', color: '#eab308', change: '+1.5%' },
    { name: 'OTHER', value: '$5.8M', color: '#94a3b8', change: '-0.0%' },
  ]

  return (
    <motion.div
      className="relative max-w-5xl mx-auto mt-12"
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      style={{ perspective: '1000px' }}
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-3xl" />

      {/* Dashboard Container */}
      <div className="relative bg-slate-900/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold text-lg">RISKCORE</span>
            <span className="text-slate-500 text-sm">|</span>
            <span className="text-slate-400 text-sm">Firm-Wide View</span>
          </div>
          <div className="flex items-center gap-2">
            <LiveIndicator />
          </div>
        </div>

        {/* Summary Bar */}
        <div className="flex items-center gap-8 px-6 py-3 border-b border-white/5 bg-slate-900/50">
          <div>
            <span className="text-xs text-slate-500">Firm Gross</span>
            <div className="text-lg font-bold font-mono text-slate-100">$2.09B</div>
          </div>
          <div>
            <span className="text-xs text-slate-500">Firm Net</span>
            <div className="text-lg font-bold font-mono text-emerald-400">$641M</div>
          </div>
          <div>
            <span className="text-xs text-slate-500">VaR (95%)</span>
            <div className="text-lg font-bold font-mono text-rose-400">$8.2M</div>
          </div>
          <div>
            <span className="text-xs text-slate-500">Positions</span>
            <div className="text-lg font-bold font-mono text-slate-100">4,081</div>
          </div>
        </div>

        {/* RiskPod Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 p-4">
          {riskPods.map((pod, i) => (
            <motion.div
              key={pod.name}
              className="bg-slate-800/50 border border-white/10 rounded-lg p-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ borderColor: `${pod.color}50` }}
            >
              <div className="text-xs font-bold mb-1" style={{ color: pod.color }}>{pod.name}</div>
              <div className="text-lg font-bold font-mono text-slate-100">{pod.value}</div>
              <div className={`text-xs ${pod.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {pod.change}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ==============================================
// CTA BUTTONS
// ==============================================

function CTAButtons() {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <motion.button
        className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-lg rounded-xl transition-colors shadow-lg shadow-emerald-500/25"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Request Live Demo
      </motion.button>
      <motion.button
        className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-lg rounded-xl border border-white/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View on GitHub
      </motion.button>
    </motion.div>
  )
}

// ==============================================
// MAIN HERO COMPONENT
// ==============================================

export default function HeroCommandCenter() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0a0f1a, #151E31, #10182B)' }}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Main Headline */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-100 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Firm-Wide Risk Visibility
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              for Single & Multi-Manager Funds
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Finally see your complete risk picture. Aggregate positions from every PM,
            every system, every asset class — in one unified view.
          </motion.p>

          <CTAButtons />
        </motion.div>

        {/* Stats */}
        <StatsRow />

        {/* Mini Riskboard Preview */}
        <MiniRiskboard />

        {/* Trust Badges */}
        <TrustBadges />
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#10182B] to-transparent" />
    </section>
  )
}
