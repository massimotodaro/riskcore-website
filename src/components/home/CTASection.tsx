'use client'

/**
 * CTASection.tsx (EarlyAccessCleanB variant)
 *
 * Two-column layout: value props on left, form on right.
 * Professional, no pressure. For technical decision makers.
 */

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const valueProps = [
  'See positions aggregated across all PMs',
  'Time travel to any historical point',
  'Calculate hedge amounts automatically',
  'Your data stays on your infrastructure',
]

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // Honeypot field
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage("We'll be in touch shortly.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch {
      setStatus('error')
      setMessage('Failed to connect. Please try again.')
    }
  }

  return (
    <section
      id="early-access"
      ref={sectionRef}
      className="relative py-16 md:py-20 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #151E31, #0a0f1a)' }}
    >
      <div className="relative max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Value Props */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              See It{' '}
              <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                In Action
              </span>
            </h2>

            <p className="text-text-muted mb-6 text-sm md:text-base">
              30-minute demo with your data schema. No slides, just the product.
            </p>

            <ul className="space-y-3">
              {valueProps.map((prop, i) => (
                <motion.li
                  key={prop}
                  className="flex items-center gap-3 text-text-muted text-sm md:text-base"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-brand-blue flex-shrink-0">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  {prop}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="bg-bg-secondary/30 border border-white/10 rounded-2xl p-5 md:p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-4">Book a Demo</h3>

            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-brand-green">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <p className="text-text-primary font-medium">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="absolute -left-[9999px] opacity-0 pointer-events-none"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="relative">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work email"
                    className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-bg-primary/80 border border-white/10 rounded-[3px] text-text-primary placeholder-text-dim focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 md:py-3.5 bg-brand-blue text-white font-semibold text-sm rounded-[3px] transition-all duration-200 hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <svg className="animate-spin w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    'Schedule Demo'
                  )}
                </button>
                <p className="text-text-dim text-xs text-center">
                  No spam. We&apos;ll follow up within 24 hours.
                </p>
              </form>
            )}
            {status === 'error' && (
              <p className="text-center text-red-400 text-sm mt-3">{message}</p>
            )}
          </motion.div>
        </div>

        {/* Testimonial */}
        <motion.div
          className="mt-10 md:mt-12 p-4 md:p-5 bg-bg-secondary/30 border border-white/5 rounded-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold flex-shrink-0">
              M
            </div>
            <div>
              <p className="text-text-muted italic text-sm leading-relaxed">
                &quot;We&apos;ve been trying to build this internally for years. The fact that someone finally
                understands the multi-PM aggregation problem and is solving it properly — we had to get involved.&quot;
              </p>
              <p className="text-xs text-text-dim mt-2">
                <span className="text-text-muted font-medium">CRO</span> • $2.4B Multi-Manager Fund
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
