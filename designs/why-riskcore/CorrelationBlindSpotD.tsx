'use client'

/**
 * CorrelationBlindSpotD.tsx
 *
 * Variation D: "The Timeline"
 *
 * Story-driven timeline showing how correlation blindness
 * develops and eventually causes a crisis. Narrative approach
 * with animated timeline progression.
 *
 * Style: Matches riskcore.io design system
 */

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

// ==============================================
// TYPES
// ==============================================

interface TimelineEvent {
  id: string
  time: string
  title: string
  description: string
  metric: string
  metricLabel: string
  status: 'safe' | 'warning' | 'danger'
  icon: React.ReactNode
}

// ==============================================
// TIMELINE DATA
// ==============================================

const timelineEvents: TimelineEvent[] = [
  {
    id: 'day1',
    time: 'Day 1',
    title: 'Everything Looks Diversified',
    description: 'Five PMs, five different strategies. Your risk report shows healthy diversification across books. Cross-book correlation appears low based on strategy descriptions.',
    metric: '0.18',
    metricLabel: 'Assumed Correlation',
    status: 'safe',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'month1',
    time: 'Month 1',
    title: 'Hidden Patterns Form',
    description: "Multiple PMs independently add AI exposure through different instruments. NVDA, SMCI, AMD, TSM across different books. Each book looks fine. Together, you're 4x concentrated.",
    metric: '0.45',
    metricLabel: 'Actual Correlation',
    status: 'warning',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'month3',
    time: 'Month 3',
    title: 'Correlation Drift Accelerates',
    description: "Market momentum drives all PMs toward similar factors. What started as independent strategies now share common exposures. Your risk models still use historical correlations.",
    metric: '0.67',
    metricLabel: 'Drifting Correlation',
    status: 'warning',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    id: 'month6',
    time: 'Month 6',
    title: 'The Tipping Point',
    description: "Correlations are now dangerously high, but your systems don't measure cross-book correlation. You're blind to the concentration that's built up. Risk reports still show green.",
    metric: '0.82',
    metricLabel: 'Hidden Correlation',
    status: 'danger',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M1 1l22 22" />
      </svg>
    ),
  },
  {
    id: 'crash',
    time: 'The Crash',
    title: 'Everything Moves Together',
    description: "Fed surprise. Tech sells off 15%. All five 'diversified' books drop together. Your VaR said max loss was $20M. Actual loss: $85M. Four months to recover. Investors leave.",
    metric: '0.94',
    metricLabel: 'Stress Correlation',
    status: 'danger',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
]

// ==============================================
// TIMELINE EVENT CARD
// ==============================================

interface TimelineCardProps {
  event: TimelineEvent
  index: number
  isActive: boolean
  onClick: () => void
}

function TimelineCard({ event, index, isActive, onClick }: TimelineCardProps) {
  const statusColors = {
    safe: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-500' },
    warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-500' },
    danger: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', dot: 'bg-rose-500' },
  }

  const colors = statusColors[event.status]

  return (
    <motion.div
      className={`relative flex-shrink-0 w-72 cursor-pointer transition-all ${
        isActive ? 'scale-105' : 'scale-100 opacity-70 hover:opacity-100'
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      onClick={onClick}
    >
      {/* Timeline dot */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
        <div className={`w-6 h-6 rounded-full ${colors.dot} ${isActive ? 'animate-pulse' : ''} flex items-center justify-center`}>
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      </div>

      {/* Card */}
      <div className={`p-5 rounded-xl ${colors.bg} border ${isActive ? colors.border : 'border-white/5'} mt-4`}>
        {/* Time badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
            {event.time}
          </span>
          <span className={colors.text}>{event.icon}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-100 mb-2">{event.title}</h3>

        {/* Description (truncated unless active) */}
        <p className={`text-sm text-slate-400 leading-relaxed ${isActive ? '' : 'line-clamp-2'}`}>
          {event.description}
        </p>

        {/* Metric */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-end justify-between">
            <span className="text-xs text-slate-500">{event.metricLabel}</span>
            <span className={`text-2xl font-bold font-mono ${colors.text}`}>{event.metric}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ==============================================
// CORRELATION GAUGE
// ==============================================

function CorrelationGauge({ value, label }: { value: number; label: string }) {
  const percentage = value * 100
  const color = value >= 0.7 ? '#ef4444' : value >= 0.5 ? '#f59e0b' : '#22c55e'

  return (
    <div className="text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Background arc */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="251.2"
            strokeDashoffset="62.8"
          />
          {/* Value arc */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 251.2 - (188.4 * percentage) / 100 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold font-mono" style={{ color }}>{value.toFixed(2)}</span>
        </div>
      </div>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  )
}

// ==============================================
// MAIN COMPONENT
// ==============================================

export default function CorrelationBlindSpotD() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Auto-advance timeline
  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % timelineEvents.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isInView])

  const activeEvent = timelineEvents[activeIndex]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #10182B, #151E31)' }}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/[0.02] rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-full text-rose-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            ANATOMY OF A CORRELATION CRISIS
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            How Correlation Blindness{' '}
            <span className="bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
              Builds to Crisis
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Watch how hidden correlations accumulate over time — invisible to your current systems.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {/* Timeline line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/30 via-amber-500/30 to-rose-500/30" />

          {/* Timeline cards */}
          <div className="flex gap-6 overflow-x-auto pb-4 pt-2 px-4 -mx-4 scrollbar-hide">
            {timelineEvents.map((event, index) => (
              <TimelineCard
                key={event.id}
                event={event}
                index={index}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Current State Display */}
        <motion.div
          className="p-8 rounded-2xl bg-slate-900/60 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Gauge */}
            <div>
              <CorrelationGauge
                value={parseFloat(activeEvent.metric)}
                label={activeEvent.metricLabel}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  activeEvent.status === 'safe' ? 'bg-emerald-500/20 text-emerald-400' :
                  activeEvent.status === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-rose-500/20 text-rose-400'
                }`}>
                  {activeEvent.time}
                </span>
                <h3 className="text-xl font-bold text-slate-100">{activeEvent.title}</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">{activeEvent.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Solution Banner */}
        <motion.div
          className="mt-12 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-emerald-400">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-100">RISKCORE tracks this in real-time.</h4>
                <p className="text-slate-400 text-sm">See cross-book correlations before they become a crisis.</p>
              </div>
            </div>
            <motion.a
              href="/#early-access"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-sm rounded-xl transition-colors whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Demo
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
