'use client'

/**
 * HeroInline - Side-by-Side Hero Layout
 *
 * Left side: Title, subtitle, and CTA buttons
 * Right side: Dashboard graphic with stats below
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
      className="flex justify-center gap-16 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 + i * 0.1 }}
        >
          <div className="text-3xl font-bold text-slate-100 font-mono">
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
// MAIN HERO INLINE COMPONENT
// ==============================================

export default function HeroInline() {
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

      {/* Content */}
      <div className="relative w-full pt-32 lg:pt-40 pb-16">
        <div className="flex flex-col lg:flex-row items-center">

          {/* Left Side: Text Content */}
          <motion.div
            className="w-full lg:w-[50%] pl-24 sm:pl-36 lg:pl-72 pr-8 lg:pr-12"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight"
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
              className="text-lg text-slate-400 mt-6 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Finally see your complete risk picture. Aggregate positions from every
              PM, every system, every asset class — in one unified view.
            </motion.p>

            <motion.div
              className="flex gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="#early-access"
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm rounded transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Demo
              </motion.a>
              <motion.a
                href="https://github.com/massimotodaro/riskcore"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium text-sm rounded border border-slate-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View on GitHub
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side: Dashboard */}
          <motion.div
            className="w-full lg:w-[50%] mt-12 lg:mt-0 p-0 m-0 flex justify-start items-start relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Background glow animation */}
            <motion.div
              className="absolute -inset-10 bg-gradient-to-r from-emerald-500/20 via-blue-500/15 to-purple-500/20 rounded-3xl blur-3xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative p-0 m-0 transform scale-[0.85] origin-top-left lg:scale-100 text-left">
              <AnimatedRiskboard />
            </div>
          </motion.div>
        </div>

        {/* Stats Row - Below Dashboard */}
        <div className="w-full mt-12 lg:mt-0 pt-10">
          <StatsRow />
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#10182B] to-transparent" />
    </section>
  )
}
