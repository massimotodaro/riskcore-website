'use client'

/**
 * CTAForm.tsx
 *
 * Reusable CTA form component with Demo/Newsletter toggle.
 * Contains ONLY: toggle buttons, email input, submit button, and disclaimer text.
 * Title/subtitle should be added separately by the parent component.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'

interface CTAFormProps {
  defaultMode?: 'demo' | 'newsletter'
  theme?: 'blue' | 'emerald'
}

export default function CTAForm({
  defaultMode = 'demo',
  theme = 'blue',
}: CTAFormProps) {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // Honeypot field
  const [mode, setMode] = useState<'demo' | 'newsletter'>(defaultMode)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  // Theme colors
  const themeColors = {
    blue: {
      button: 'bg-brand-blue hover:bg-brand-blue/90 shadow-brand-blue/25 hover:shadow-brand-blue/40',
      focus: 'focus:border-brand-blue/50 focus:ring-brand-blue/20',
      selected: 'bg-brand-blue text-white',
    },
    emerald: {
      button: 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25 hover:shadow-emerald-500/40',
      focus: 'focus:border-emerald-500/50 focus:ring-emerald-500/20',
      selected: 'bg-emerald-500 text-white',
    },
  }

  const colors = themeColors[theme]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website, type: mode }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(
          mode === 'demo'
            ? "Thanks! We'll reach out within 24 hours to schedule your demo."
            : "You're on the list! We'll keep you updated on RISKCORE."
        )
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

  if (status === 'success') {
    return (
      <motion.div
        className="text-center py-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-brand-green">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <p className="text-lg font-medium text-brand-green">{message}</p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Pill Toggle */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex bg-bg-secondary/60 border border-black/10 dark:border-white/10 rounded-full p-1">
          <button
            type="button"
            onClick={() => setMode('demo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              mode === 'demo'
                ? colors.selected
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book a Demo
          </button>
          <button
            type="button"
            onClick={() => setMode('newsletter')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              mode === 'newsletter'
                ? colors.selected
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Stay Updated
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
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
            className={`w-full pl-12 pr-4 py-3 md:py-3.5 bg-bg-secondary/80 border border-black/10 dark:border-white/10 rounded-[3px] text-text-primary placeholder-text-dim ${colors.focus} focus:outline-none focus:ring-2 transition-all text-sm`}
            required
            disabled={status === 'loading'}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`px-6 py-3 md:py-3.5 ${colors.button} text-white font-semibold text-sm rounded-[3px] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap`}
        >
          {status === 'loading' ? (
            <svg className="animate-spin w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : mode === 'demo' ? (
            'Book a Demo'
          ) : (
            'Subscribe'
          )}
        </button>
      </form>

      {status === 'error' && (
        <p className="text-center text-red-400 text-sm mt-3">{message}</p>
      )}

      <p className="text-center text-text-dim text-xs md:text-sm mt-4">
        {mode === 'demo'
          ? "We respect your inbox. No spam, just updates on your demo."
          : "Join our newsletter for updates on RISKCORE. Unsubscribe anytime."}
      </p>
    </div>
  )
}
