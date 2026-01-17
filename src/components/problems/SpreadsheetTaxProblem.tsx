'use client'

/**
 * SpreadsheetTaxProblem.tsx
 *
 * Visualizes the 60+ hours/month wasted on manual data aggregation.
 * Shows a timeline of daily tasks with accumulating time.
 */

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// Daily tasks data
const dailyTasks = [
  { task: 'Export positions from Bloomberg PORT', time: 30, icon: '📊' },
  { task: 'Export positions from Enfusion', time: 20, icon: '📈' },
  { task: "Download PM Gamma's Excel file", time: 10, icon: '📁' },
  { task: 'Manually map different ticker formats', time: 45, icon: '🔄' },
  { task: 'Reconcile security identifiers', time: 30, icon: '🔍' },
  { task: 'Copy into master aggregation sheet', time: 20, icon: '📋' },
  { task: 'Build pivot tables for exposure views', time: 30, icon: '📐' },
  { task: 'Email PDF to CRO', time: 10, icon: '✉️' },
]

const hiddenCosts = [
  '60+ hours/month = $15K+/month in analyst time',
  'Senior risk analysts doing data entry instead of analysis',
  'Errors compound (wrong CUSIP mapping = wrong exposure)',
  'By the time the report is done, positions have changed',
  'No ability to ask ad-hoc questions',
  'Zero real-time capability',
]

// Animated counter hook
function useAnimatedCounter(end: number, duration: number, shouldAnimate: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldAnimate) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, shouldAnimate])

  return count
}

function TaskItem({ task, time, icon, index, isInView }: {
  task: string
  time: number
  icon: string
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0"
    >
      {/* Step number */}
      <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0">
        <span className="text-orange-400 text-sm font-bold">{index + 1}</span>
      </div>

      {/* Icon */}
      <span className="text-xl">{icon}</span>

      {/* Task description */}
      <p className="flex-1 text-slate-300">{task}</p>

      {/* Time badge */}
      <div className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
        <span className="text-red-400 text-sm font-mono font-semibold">{time} min</span>
      </div>
    </motion.div>
  )
}

export default function SpreadsheetTaxProblem() {
  const timelineRef = useRef(null)
  const isInView = useInView(timelineRef, { once: true, margin: '-100px' })

  const totalMinutes = dailyTasks.reduce((sum, t) => sum + t.time, 0)
  const totalHours = totalMinutes / 60
  const monthlyHours = totalHours * 20 // ~20 working days
  const monthlyCost = Math.round(monthlyHours * 250) // $250/hr analyst rate

  const animatedMinutes = useAnimatedCounter(totalMinutes, 2000, isInView)
  const animatedCost = useAnimatedCounter(monthlyCost, 2500, isInView)

  return (
    <section className="py-24" style={{ background: 'linear-gradient(to bottom, #1a2744, #0f172a)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6"
          >
            Hidden Cost
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 font-['Space_Grotesk'] mb-4">
            The <span className="text-red-400">Spreadsheet Tax</span>
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Risk teams spend 60+ hours/month on manual data aggregation that adds zero value.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Daily Process Timeline */}
          <motion.div
            ref={timelineRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-100 font-['Space_Grotesk']">
                Every. Single. Day.
              </h3>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="px-3 py-1 bg-red-500 rounded-full"
              >
                <span className="text-white text-sm font-bold">DAILY</span>
              </motion.div>
            </div>

            <div className="space-y-1">
              {dailyTasks.map((task, index) => (
                <TaskItem key={index} {...task} index={index} isInView={isInView} />
              ))}
            </div>

            {/* Total */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between"
            >
              <span className="text-slate-400 font-semibold">Total Daily Time:</span>
              <div className="text-right">
                <span className="text-3xl font-bold text-red-400 font-mono">{animatedMinutes}</span>
                <span className="text-red-400 ml-1">min</span>
                <p className="text-sm text-slate-500 mt-1">= {totalHours.toFixed(1)}+ hours/day</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Cost Calculator */}
          <div className="space-y-6">
            {/* Monthly Cost Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Monthly Cost</p>
                  <p className="text-3xl font-bold text-red-400 font-mono">${animatedCost.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-slate-100">{Math.round(monthlyHours)}</p>
                    <p className="text-xs text-slate-500">hours/month</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-slate-600">×</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-100">$250</p>
                    <p className="text-xs text-slate-500">/hour rate</p>
                  </div>
                </div>
              </div>

              <p className="text-center text-red-400 font-semibold mt-4">
                = Money Wasted on Data Entry
              </p>
            </motion.div>

            {/* Annual Projection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-[#1e293b]/90 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 text-center"
            >
              <p className="text-sm text-slate-400 mb-2">Annual "Spreadsheet Tax"</p>
              <p className="text-4xl md:text-5xl font-bold text-orange-400 font-mono">
                ${(monthlyCost * 12).toLocaleString()}
              </p>
              <p className="text-sm text-slate-500 mt-2">That could fund 2+ engineering hires</p>
            </motion.div>
          </div>
        </div>

        {/* Hidden Costs Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-slate-100 font-['Space_Grotesk'] mb-6 text-center">
            The Hidden Costs
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hiddenCosts.map((cost, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.08 }}
                className="flex items-start gap-3 bg-red-500/5 border border-red-500/20 rounded-xl p-4"
              >
                <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-slate-300 text-sm">{cost}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
