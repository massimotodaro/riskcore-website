/**
 * EarlyAccessCleanC.tsx
 *
 * Early Access Section - Clean Variant C
 *
 * Minimal, centered design. Two options: Book Demo or View GitHub.
 * For technical audiences who might want to explore on their own.
 *
 * Usage:
 *   <EarlyAccessCleanC />
 */

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function EarlyAccessCleanC() {
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
      <div className="relative max-w-xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
            Start With{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              RISKCORE
            </span>
          </h2>

          <p className="text-lg text-slate-400 mb-8">
            Book a demo or deploy it yourself. Your choice.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
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
              className="py-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-lg font-medium text-emerald-400">We'll be in touch within 24 hours.</p>
            </motion.div>
          )}
        </motion.div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://github.com/massimotodaro/riskcore"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 text-sm transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Or explore the code on GitHub
          </a>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className="mt-12 p-5 bg-slate-800/30 border border-white/5 rounded-xl text-left"
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
