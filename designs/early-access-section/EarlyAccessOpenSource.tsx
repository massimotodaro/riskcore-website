'use client'

/**
 * EarlyAccessOpenSource.tsx
 *
 * Early Access Section Variant 3: "The Open Source Angle"
 *
 * Emphasizes transparency and gives two paths: deploy yourself
 * (open source) or get a managed demo. Appeals to technical
 * decision makers who value open source and want to verify.
 *
 * Usage:
 *   <EarlyAccessOpenSource />
 *
 * Dependencies:
 *   npm install framer-motion
 */

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

// ==============================================
// GITHUB STATS (would be fetched in real app)
// ==============================================

const githubStats = {
  stars: 1247,
  forks: 89,
  contributors: 12,
  commits: 842,
}

// ==============================================
// ANIMATED COUNTER
// ==============================================

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
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

  return <span ref={ref}>{count.toLocaleString()}</span>
}

// ==============================================
// TERMINAL COMPONENT
// ==============================================

function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const lines = [
    { type: 'comment', text: '# Clone the repository' },
    { type: 'command', text: 'git clone https://github.com/massimotodaro/riskcore.git' },
    { type: 'output', text: 'Cloning into \'riskcore\'...' },
    { type: 'output', text: 'done.' },
    { type: 'comment', text: '' },
    { type: 'comment', text: '# Start with Docker' },
    { type: 'command', text: 'cd riskcore && docker-compose up -d' },
    { type: 'output', text: '✓ Container riskcore-db-1 Started' },
    { type: 'output', text: '✓ Container riskcore-api-1 Started' },
    { type: 'output', text: '✓ Container riskcore-web-1 Started' },
    { type: 'comment', text: '' },
    { type: 'success', text: '🚀 RISKCORE running at http://localhost:3000' },
  ]

  useEffect(() => {
    if (!isInView) return
    const timer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= lines.length) {
          clearInterval(timer)
          return prev
        }
        return prev + 1
      })
    }, 300)
    return () => clearInterval(timer)
  }, [isInView, lines.length])

  return (
    <div ref={ref} className="bg-slate-950 rounded-xl border border-white/10 overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/50 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-rose-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-emerald-500" />
        <span className="ml-2 text-xs text-slate-500 font-mono">terminal</span>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-sm space-y-1 min-h-[280px]">
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`${
              line.type === 'comment' ? 'text-slate-600' :
              line.type === 'command' ? 'text-emerald-400' :
              line.type === 'success' ? 'text-emerald-400 font-semibold' :
              'text-slate-400'
            }`}
          >
            {line.type === 'command' && <span className="text-slate-500">$ </span>}
            {line.text}
          </motion.div>
        ))}
        {visibleLines < lines.length && (
          <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
        )}
      </div>
    </div>
  )
}

// ==============================================
// MAIN COMPONENT
// ==============================================

export default function EarlyAccessOpenSource() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setIsSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #151E31, #0a0f1a)' }}
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-white/10 rounded-full text-slate-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            100% Open Source
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Verify Everything.{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Trust Nothing Blindly.
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            RISKCORE is fully open source. Read every line of code before you trust it with your positions.
            Deploy yourself, or let us handle it.
          </p>
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: '⭐', label: 'Stars', value: githubStats.stars },
            { icon: '🍴', label: 'Forks', value: githubStats.forks },
            { icon: '👥', label: 'Contributors', value: githubStats.contributors },
            { icon: '📝', label: 'Commits', value: githubStats.commits },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-3 px-5 py-3 bg-slate-800/50 border border-white/10 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <span className="text-xl">{stat.icon}</span>
              <div>
                <div className="text-lg font-bold text-slate-100 font-mono">
                  <AnimatedCounter end={stat.value} />
                </div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two Paths */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Path 1: Self-Deploy */}
          <motion.div
            className="bg-slate-800/30 border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-slate-400">
                  <path d="M8 9l3 3-3 3M13 15h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Self-Deploy</h3>
                <p className="text-sm text-slate-500">For teams who want full control</p>
              </div>
            </div>

            <Terminal />

            <motion.a
              href="https://github.com/massimotodaro/riskcore"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl text-slate-300 font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </motion.a>

            <ul className="mt-4 space-y-2">
              {['MIT License', 'Docker + Docker Compose', 'Full documentation', 'Community support'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Path 2: Managed Demo */}
          <motion.div
            className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-emerald-400">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Managed Demo</h3>
                <p className="text-sm text-emerald-400">For teams who want a guided tour</p>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 mb-4">
              <div className="text-center mb-6">
                <p className="text-slate-400 mb-4">
                  See RISKCORE in action with your actual data schema.
                  We'll walk you through every feature.
                </p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-slate-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    30 minutes
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Live demo
                  </div>
                </div>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
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
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-xl transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book a Demo
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
                  <p className="text-lg font-semibold text-slate-100">Demo scheduled!</p>
                  <p className="text-sm text-slate-400">Check your email for calendar invite.</p>
                </motion.div>
              )}
            </div>

            <ul className="space-y-2">
              {['White-glove setup', 'Priority support', 'Custom integrations', 'Founder access'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-emerald-400">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Note */}
        <motion.p
          className="text-center text-slate-500 text-sm mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          Either way, your position data never leaves your infrastructure. That's the point.
        </motion.p>
      </div>
    </section>
  )
}
