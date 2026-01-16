'use client'

/**
 * EarlyAccessSocialProof.tsx
 *
 * Early Access Section Variant 1: "The Social Proof"
 *
 * Creates urgency and credibility by showing who's already interested.
 * Displays waitlist stats, fund type logos, and a testimonial.
 * FOMO-driven design without being pushy.
 *
 * Usage:
 *   <EarlyAccessSocialProof />
 *
 * Dependencies:
 *   npm install framer-motion
 */

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

// ==============================================
// ANIMATED COUNTER
// ==============================================

function AnimatedCounter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// ==============================================
// FUND TYPE BADGES
// ==============================================

const fundTypes = [
  { name: 'Multi-Manager', count: 8 },
  { name: 'Long/Short Equity', count: 12 },
  { name: 'Global Macro', count: 6 },
  { name: 'Credit', count: 5 },
  { name: 'Quant', count: 4 },
]

// ==============================================
// MAIN COMPONENT
// ==============================================

export default function EarlyAccessSocialProof() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      // Handle form submission
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #151E31, #0a0f1a)' }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[150px]" />

      <div className="relative max-w-4xl mx-auto">
        {/* Stats Bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400 font-mono">
              <AnimatedCounter end={35} suffix="+" />
            </div>
            <div className="text-sm text-slate-500">Funds on Waitlist</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-100 font-mono">
              $<AnimatedCounter end={18} suffix="B" />
            </div>
            <div className="text-sm text-slate-500">Combined AUM</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-100 font-mono">
              <AnimatedCounter end={12} />
            </div>
            <div className="text-sm text-slate-500">Demo Slots Left This Month</div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Limited Beta Access
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Join the Funds Already{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Waiting for Launch
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Be among the first to see your firm-wide risk in one place.
            Early users get priority support and direct input on our roadmap.
          </p>
        </motion.div>

        {/* Fund Type Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          {fundTypes.map((fund, i) => (
            <motion.div
              key={fund.name}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-white/10 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.05 }}
            >
              <span className="text-sm text-slate-300">{fund.name}</span>
              <span className="text-xs text-emerald-400 font-mono">{fund.count}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Email Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-colors whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Demo
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="text-center py-6 px-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl max-w-lg mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 text-emerald-400 mx-auto mb-3">
                <path d="M5 12l5 5L20 7" />
              </svg>
              <p className="text-lg font-semibold text-slate-100">You're on the list!</p>
              <p className="text-sm text-slate-400">We'll reach out within 24 hours to schedule your demo.</p>
            </motion.div>
          )}

          <p className="text-center text-slate-500 text-sm mt-4">
            We respect your inbox. No spam, just updates on your demo slot.
          </p>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className="mt-16 p-6 bg-slate-800/30 border border-white/5 rounded-2xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-slate-900 font-bold text-lg flex-shrink-0">
              M
            </div>
            <div>
              <p className="text-slate-300 italic mb-3">
                "We've been trying to build this internally for years. The fact that someone finally understands
                the multi-PM aggregation problem and is solving it properly — we had to be first in line."
              </p>
              <p className="text-sm text-slate-500">
                <span className="text-slate-400 font-medium">CRO</span> • $2.4B Multi-Manager Fund
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
