'use client'

/**
 * SlowAnswersProblem.tsx
 *
 * Visualizes how basic risk questions take hours/days to answer.
 * Shows question cards with prominent time badges.
 */

import { motion } from 'framer-motion'

// Colors matching DataSilosProblem
const taskColors = [
  '#3b82f6', // blue
  '#22c55e', // green
  '#a855f7', // purple
  '#f97316', // orange
  '#3b82f6', // blue
  '#22c55e', // green
  '#a855f7', // purple
  '#f97316', // orange
]

// Daily tasks data
const dailyTasks = [
  { task: 'Export from Bloomberg PORT', time: 30 },
  { task: 'Export from Enfusion', time: 20 },
  { task: "Download PM's Excel", time: 10 },
  { task: 'Map ticker formats', time: 45 },
  { task: 'Reconcile identifiers', time: 30 },
  { task: 'Copy to master sheet', time: 20 },
  { task: 'Build pivot tables', time: 30 },
  { task: 'Email PDF to CRO', time: 10 },
]


// Questions data - 3 key questions showing escalating severity
const questions = [
  {
    question: "What's our total exposure to NVDA across all PMs?",
    time: "2 hours",
    method: "Manual aggregation across PM reports",
    severity: 'medium'
  },
  {
    question: "Are any two PMs taking offsetting positions?",
    time: "4 hours",
    method: "Export all positions, compare in Excel",
    severity: 'high'
  },
  {
    question: "What's our firm-wide VaR right now?",
    time: "Days",
    method: "Often impossible without common system",
    severity: 'critical'
  },
]

function getSeverityColor(severity: string) {
  switch (severity) {
    case 'critical': return { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-400' }
    case 'high': return { bg: 'bg-orange-500', border: 'border-orange-500', text: 'text-orange-400' }
    default: return { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-400' }
  }
}

function QuestionCard({ question, time, method, severity, index }: {
  question: string
  time: string
  method: string
  severity: string
  index: number
}) {
  const colors = getSeverityColor(severity)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:${colors.border}/30 transition-all duration-300 relative overflow-hidden`}
    >
      {/* Time Badge */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(239, 68, 68, 0)',
            '0 0 20px 5px rgba(239, 68, 68, 0.2)',
            '0 0 0 0 rgba(239, 68, 68, 0)'
          ]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`absolute top-4 right-4 ${colors.bg} px-2 py-0.5 rounded-full`}
        style={{ minWidth: '72px' }}
      >
        <div className="flex items-center justify-center gap-1">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-white text-xs font-bold">{time}</span>
        </div>
      </motion.div>

      {/* Question */}
      <div className="pr-24">
        <p className="text-slate-100 font-semibold text-lg mb-3 leading-snug">
          &ldquo;{question}&rdquo;
        </p>
      </div>

      {/* Method */}
      <div className="flex items-start gap-2 mt-4 pt-4 border-t border-white/10">
        <svg className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-slate-400">{method}</p>
      </div>
    </motion.div>
  )
}

export default function SlowAnswersProblem() {
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
            className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6"
          >
            The Slow Answers Problem
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 font-['Space_Grotesk'] mb-4">
            Questions That Take <span className="text-blue-400">Hours</span> to Answer
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Basic risk questions that should take seconds require hours of manual work.
          </p>
        </motion.div>

        {/* Two Column Layout: Daily Tasks + Questions */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column: Daily Tasks Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-[#1e293b]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="mb-6">
              <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Daily Procedure</p>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-100 font-['Space_Grotesk']">
                Every. Single. Day.
              </h3>
            </div>

            {/* Simple Table List - Single Column */}
            <div className="space-y-0">
              {dailyTasks.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-4">
                    {/* Circle with gradient connecting line */}
                    <div className="relative">
                      <div
                        className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${taskColors[index]}20`, border: `1px solid ${taskColors[index]}40` }}
                      >
                        <span className="font-bold" style={{ color: taskColors[index] }}>{index + 1}</span>
                      </div>
                      {/* Vertical line connector */}
                      {index < dailyTasks.length - 1 && (
                        <div
                          className="absolute left-5 top-12 w-0.5 h-1/2"
                          style={{ background: `linear-gradient(to bottom, ${taskColors[index]}66, transparent)` }}
                        />
                      )}
                    </div>
                    <p className="text-slate-100 font-normal text-sm leading-snug">{item.task}</p>
                  </div>
                  <div
                    className="px-2 py-0.5 rounded-full ml-4"
                    style={{ backgroundColor: `${taskColors[index]}10`, border: `1px solid ${taskColors[index]}30` }}
                  >
                    <span className="text-xs font-mono font-semibold" style={{ color: taskColors[index] }}>{item.time} min</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Total Daily Time:</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-blue-400 font-mono">
                  {dailyTasks.reduce((sum, t) => sum + t.time, 0)}
                </span>
                <span className="text-blue-400 ml-1">min</span>
                <p className="text-sm text-slate-500">= {(dailyTasks.reduce((sum, t) => sum + t.time, 0) / 60).toFixed(1)}+ hours/day</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Question Cards Stacked */}
          <div className="flex flex-col gap-4 justify-center">
            {questions.map((q, index) => (
              <QuestionCard key={index} {...q} index={index} />
            ))}
          </div>
        </div>

        {/* The Real Cost - Unified Card */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-2xl px-8 py-5 mb-16"
            style={{ width: '60%', minWidth: '500px' }}
          >
            <div className="flex items-center gap-8">
              {/* The Real Cost - Left side */}
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 2 }}
                  className="w-14 h-14 bg-blue-500/20 border-2 border-blue-500/40 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <div>
                  <p className="font-bold text-slate-100 text-xl">The Real Cost</p>
                  <p className="text-sm text-blue-400">Time Lost Daily</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-16 bg-white/10 flex-shrink-0" />

              {/* Bullet points - Right side */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#3b82f6' }} />
                  <p className="text-slate-100 text-sm font-semibold">Senior analysts doing data entry instead of analysis</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#f97316' }} />
                  <p className="text-slate-100 text-sm font-semibold">Errors compound (wrong CUSIP = wrong exposure)</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#ef4444' }} />
                  <p className="text-slate-100 text-sm font-semibold">By the time reports are done, positions have changed</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#dc2626' }} />
                  <p className="text-slate-100 text-sm font-semibold">No ability to ask ad-hoc questions in real-time</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quote/Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative bg-[#1e293b]/90 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8"
        >
          {/* Quote marks */}
          <div className="absolute top-4 left-6 text-6xl text-blue-500/20 font-serif leading-none">&ldquo;</div>

          <blockquote className="relative z-10 pl-8">
            <p className="text-lg md:text-xl text-slate-200 italic leading-relaxed">
              During the SVB collapse, it took us <span className="text-blue-400 font-bold">6 hours</span> to figure out our total financial sector exposure. By then, the market had already moved.
            </p>
            <footer className="mt-4 text-sm text-slate-400">
              — CRO at Multi-Manager Hedge Fund
            </footer>
          </blockquote>
        </motion.div>

      </div>
    </section>
  )
}
