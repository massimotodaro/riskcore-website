/**
 * EarlyAccessCleanA.tsx
 *
 * Early Access Section - Clean Variant A
 *
 * Simple, professional CTA. No FOMO, no pressure tactics.
 * Straightforward value proposition for engineers and risk managers.
 *
 * Usage:
 *   <EarlyAccessCleanA />
 */

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function EarlyAccessCleanA() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setIsSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #151E31, #0a0f1a)' }}
    >
      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            Ready to See Your{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Firm-Wide Risk?
            </span>
          </h2>

          <p className="text-lg text-slate-400">
            Book a 30-minute demo. We'll show you RISKCORE with your data schema.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
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
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800/80 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-colors whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Demo
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="text-center py-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-lg font-medium text-emerald-400">We'll be in touch within 24 hours.</p>
            </motion.div>
          )}

          <p className="text-center text-slate-500 text-sm mt-4">
            We respect your inbox. No spam, just updates on your demo.
          </p>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className="mt-12 p-5 bg-slate-800/30 border border-white/5 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-slate-900 font-bold flex-shrink-0">
              M
            </div>
            <div>
              <p className="text-slate-300 italic text-sm leading-relaxed">
                "We've been trying to build this internally for years. The fact that someone finally
                understands the multi-PM aggregation problem and is solving it properly — we had to get involved."
              </p>
              <p className="text-xs text-slate-500 mt-2">
                <span className="text-slate-400 font-medium">CRO</span> • $2.4B Multi-Manager Fund
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
