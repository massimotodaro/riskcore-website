'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Mail } from 'lucide-react'
import { useState } from 'react'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setIsSubmitted(true)
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="early-access" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="text-brand-blue text-sm font-medium">Limited Beta Access</span>
          </span>

          {/* Headline */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Ready to See Your
            <br />
            <span className="text-brand-blue">Firm-Wide Risk?</span>
          </h2>

          <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Join our beta program and be among the first to experience unified risk aggregation.
            Early users get priority support and help shape the product.
          </p>

          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="w-full pl-12 pr-4 py-4 bg-bg-secondary/80 border border-white/10 rounded-lg text-text-primary placeholder:text-text-dim focus:outline-none focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/20 transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-blue text-white font-semibold rounded-lg transition-all duration-200 hover:bg-brand-blue/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-blue/25"
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <>
                      Get Access
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-3">{error}</p>
              )}
              <p className="text-text-dim text-xs mt-4">
                We respect your inbox. No spam, just updates on our launch.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto p-6 rounded-xl bg-brand-green/10 border border-brand-green/20"
            >
              <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-brand-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-text-primary text-xl mb-2">
                You&apos;re on the list!
              </h3>
              <p className="text-text-muted">
                We&apos;ll be in touch soon with early access details.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
