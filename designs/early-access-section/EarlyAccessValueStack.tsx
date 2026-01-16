'use client'

/**
 * EarlyAccessValueStack.tsx
 *
 * Early Access Section Variant 2: "The Value Stack"
 *
 * Shows the exclusive benefits of joining early access.
 * Tiered visualization of what early users get vs. later users.
 * Makes early access feel valuable and exclusive.
 *
 * Usage:
 *   <EarlyAccessValueStack />
 *
 * Dependencies:
 *   npm install framer-motion
 */

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ==============================================
// BENEFIT DATA
// ==============================================

interface Benefit {
  title: string
  description: string
  earlyOnly: boolean
  icon: React.ReactNode
}

const benefits: Benefit[] = [
  {
    title: 'Full Platform Access',
    description: 'All RiskPods, Time Travel, aggregation — the complete toolkit from day one.',
    earlyOnly: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: 'Direct Founder Access',
    description: 'Weekly calls with the founding team. Your feedback shapes the roadmap.',
    earlyOnly: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Priority Feature Requests',
    description: 'Your integration needs jump to the front of the queue. We build what you need.',
    earlyOnly: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Locked-In Pricing',
    description: 'Early access pricing guaranteed for 2 years, regardless of tier upgrades.',
    earlyOnly: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: 'White-Glove Onboarding',
    description: 'Dedicated implementation support. We help map your systems and configure everything.',
    earlyOnly: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
  {
    title: 'Beta User Community',
    description: 'Private Slack channel with other CROs and risk teams. Share learnings, not positions.',
    earlyOnly: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
]

// ==============================================
// MAIN COMPONENT
// ==============================================

export default function EarlyAccessValueStack() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #151E31, #0a0f1a)' }}
    >
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Early Access Program
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Get More When You{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Join Early
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Early users don't just get access — they get a partnership.
            Here's what's included when you join now.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className={`relative p-5 rounded-xl border ${
                  benefit.earlyOnly
                    ? 'bg-emerald-500/5 border-emerald-500/20'
                    : 'bg-slate-800/30 border-white/10'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {benefit.earlyOnly && (
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-emerald-500 text-slate-900 text-[10px] font-bold rounded-full">
                    EARLY ONLY
                  </div>
                )}
                <div className={`mb-3 ${benefit.earlyOnly ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-slate-100 mb-1">{benefit.title}</h3>
                <p className="text-sm text-slate-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Card */}
          <motion.div
            className="bg-slate-800/50 border border-white/10 rounded-2xl p-8 sticky top-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-400 text-xs font-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                Only 15 spots remaining
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-2">Ready to Join?</h3>
              <p className="text-slate-400">
                Get full access plus all early-user benefits.
              </p>
            </div>

            {/* Pricing Preview */}
            <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-3xl font-bold text-slate-100">$0</span>
                <span className="text-slate-500">during beta</span>
              </div>
              <p className="text-xs text-slate-500 text-center">
                Then from $500/mo • Price locked for 2 years
              </p>
            </div>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/80 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Claim Your Spot
                </motion.button>
              </form>
            ) : (
              <motion.div
                className="text-center py-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 text-emerald-400 mx-auto mb-3">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                <p className="text-lg font-semibold text-slate-100">You're in!</p>
                <p className="text-sm text-slate-400">Check your email for next steps.</p>
              </motion.div>
            )}

            <p className="text-center text-slate-500 text-xs mt-4">
              No credit card required • Cancel anytime
            </p>

            {/* Trust Badges */}
            <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                On-Premises
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                SOC 2 Ready
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
                Open Source
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
