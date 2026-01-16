/**
 * EarlyAccessCleanB.tsx
 *
 * Early Access Section - Clean Variant B
 *
 * Two-column layout: value props on left, form on right.
 * Professional, no pressure. For technical decision makers.
 *
 * Usage:
 *   <EarlyAccessCleanB />
 */

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const valueProps = [
  'See positions aggregated across all PMs',
  'Time travel to any historical point',
  'Calculate hedge amounts automatically',
  'Your data stays on your infrastructure',
]

export default function EarlyAccessCleanB() {
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
      <div className="relative max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Value Props */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">
              See It{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                In Action
              </span>
            </h2>

            <p className="text-slate-400 mb-6">
              30-minute demo with your data schema. No slides, just the product.
            </p>

            <ul className="space-y-3">
              {valueProps.map((prop, i) => (
                <motion.li
                  key={prop}
                  className="flex items-center gap-3 text-slate-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-emerald-400 flex-shrink-0">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  {prop}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="bg-slate-800/30 border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-slate-100 mb-4">Book a Demo</h3>

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
                    placeholder="Work email"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900/80 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Schedule Demo
                </motion.button>
                <p className="text-slate-500 text-xs text-center">
                  No spam. We'll follow up within 24 hours.
                </p>
              </form>
            ) : (
              <div className="text-center py-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-emerald-400 mx-auto mb-2">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                <p className="text-slate-100 font-medium">We'll be in touch shortly.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Testimonial */}
        <motion.div
          className="mt-12 p-5 bg-slate-800/30 border border-white/5 rounded-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
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
