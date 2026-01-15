'use client'

/**
 * Hero - Command Center with AnimatedRiskboard
 *
 * Combines the centered HeroCommandCenter layout with the full
 * AnimatedRiskboard component for maximum visual impact.
 */

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedRiskboard } from '@/components/hero'

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
      className="flex flex-wrap justify-center gap-4 mt-12"
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
      className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-10"
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
// CTA BUTTONS
// ==============================================

function CTAButtons() {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <motion.a
        href="#early-access"
        className="px-4 py-2 bg-brand-blue text-white font-semibold text-sm rounded-[3px] transition-all duration-200 hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Book a Demo
      </motion.a>
      <motion.a
        href="https://github.com/massimotodaro/riskcore"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm rounded-[3px] border border-white/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View on GitHub
      </motion.a>
    </motion.div>
  )
}

// ==============================================
// MAIN HERO COMPONENT
// ==============================================

export default function Hero() {
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
      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-16">
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
              for Single &amp; Multi-Manager Funds
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Finally see your complete risk picture. Aggregate positions from every
            PM, every system, every asset class — in one unified view.
          </motion.p>

          <CTAButtons />
        </motion.div>

        {/* AnimatedRiskboard */}
        <motion.div
          className="mt-12 hidden lg:block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <AnimatedRiskboard />
        </motion.div>

        {/* Stats */}
        <StatsRow />

        {/* Trust Badges */}
        <TrustBadges />
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#10182B] to-transparent" />
    </section>
  )
}
