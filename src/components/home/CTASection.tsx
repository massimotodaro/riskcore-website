'use client'

/**
 * CTASection.tsx (EarlyAccessSocialProof variant)
 *
 * Creates urgency and credibility by showing who's already interested.
 * Displays waitlist stats, fund type logos, and a testimonial.
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
        setMessage('You\'re on the list! We\'ll reach out within 24 hours.')
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
      className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #151E31, #0a0f1a)' }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/10 rounded-full blur-[150px]" />

      <div className="relative max-w-4xl mx-auto">
        {/* Stats Bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-brand-blue font-mono">
              <AnimatedCounter end={35} suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-text-muted">Funds on Waitlist</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-text-primary font-mono">
              $<AnimatedCounter end={18} suffix="B" />
            </div>
            <div className="text-xs md:text-sm text-text-muted">Combined AUM</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-text-primary font-mono">
              <AnimatedCounter end={12} />
            </div>
            <div className="text-xs md:text-sm text-text-muted">Demo Slots Left This Month</div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 border border-brand-blue/30 rounded-full text-brand-blue text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            Limited Beta Access
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Join the Funds Already{' '}
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              Waiting for Launch
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-8">
            Be among the first to see your firm-wide risk in one place.
            Early users get priority support and direct input on our roadmap.
          </p>
        </motion.div>

        {/* Fund Type Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          {fundTypes.map((fund, i) => (
            <motion.div
              key={fund.name}
              className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-bg-secondary/50 border border-white/10 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.05 }}
            >
              <span className="text-xs md:text-sm text-text-secondary">{fund.name}</span>
              <span className="text-xs text-brand-blue font-mono">{fund.count}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Email Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {status === 'success' ? (
            <motion.div
              className="text-center py-6 px-8 bg-brand-green/10 border border-brand-green/20 rounded-[3px] max-w-lg mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-brand-green">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-text-primary">You&apos;re on the list!</p>
              <p className="text-sm text-text-muted">{message}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
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
              <div className="flex-1 relative">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full pl-12 pr-4 py-3 bg-bg-secondary/80 border border-white/10 rounded-[3px] text-text-primary placeholder-text-dim focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all text-sm"
                  required
                  disabled={status === 'loading'}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-4 py-2 bg-brand-blue text-white font-semibold text-sm rounded-[3px] transition-all duration-200 hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <svg className="animate-spin w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  'Book a Demo'
                )}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-center text-red-400 text-sm mt-3">{message}</p>
          )}

          <p className="text-center text-text-dim text-xs mt-4">
            We respect your inbox. No spam, just updates on your demo slot.
          </p>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className="mt-12 md:mt-16 p-4 md:p-6 bg-bg-secondary/30 border border-white/5 rounded-2xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold text-base md:text-lg flex-shrink-0">
              M
            </div>
            <div>
              <p className="text-text-secondary italic text-sm md:text-base mb-3">
                &quot;We&apos;ve been trying to build this internally for years. The fact that someone finally understands
                the multi-PM aggregation problem and is solving it properly — we had to be first in line.&quot;
              </p>
              <p className="text-xs md:text-sm text-text-dim">
                <span className="text-text-muted font-medium">CRO</span> • $2.4B Multi-Manager Fund
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
