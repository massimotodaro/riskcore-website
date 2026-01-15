'use client'

/**
 * HeroOpenSource.tsx
 *
 * Hero Variant 3: "The Open Source Champion"
 *
 * Trust through transparency. Emphasizes open-source nature,
 * GitHub presence, on-premises deployment, and community.
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// ==============================================
// GITHUB STATS
// ==============================================

function GitHubStats() {
  const [stats, setStats] = useState({
    stars: 0,
    forks: 0,
    contributors: 0,
    commits: 0,
  })

  // Animate stats on mount
  useEffect(() => {
    const targets = { stars: 2847, forks: 412, contributors: 67, commits: 1842 }
    const duration = 2000
    const interval = 20
    const steps = duration / interval

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setStats({
        stars: Math.floor(targets.stars * easeOut),
        forks: Math.floor(targets.forks * easeOut),
        contributors: Math.floor(targets.contributors * easeOut),
        commits: Math.floor(targets.commits * easeOut),
      })

      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-6 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      {[
        { icon: '⭐', value: stats.stars, label: 'GitHub Stars' },
        { icon: '🔀', value: stats.forks, label: 'Forks' },
        { icon: '👥', value: stats.contributors, label: 'Contributors' },
        { icon: '📝', value: stats.commits, label: 'Commits' },
      ].map((stat, i) => (
        <motion.div
          key={stat.label}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + i * 0.1 }}
          whileHover={{ borderColor: 'rgba(52, 211, 153, 0.3)' }}
        >
          <span className="text-lg">{stat.icon}</span>
          <span className="font-mono font-bold text-slate-100">{stat.value.toLocaleString()}</span>
          <span className="text-xs text-slate-500">{stat.label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ==============================================
// CODE TERMINAL PREVIEW
// ==============================================

function CodeTerminal() {
  const [typedLines, setTypedLines] = useState(0)

  const codeLines = [
    { prompt: true, text: 'git clone https://github.com/riskcore/riskcore.git' },
    { prompt: false, text: 'Cloning into riskcore...' },
    { prompt: false, text: 'Receiving objects: 100% (4,287/4,287), done.' },
    { prompt: true, text: 'cd riskcore && docker-compose up' },
    { prompt: false, text: '✓ Database initialized' },
    { prompt: false, text: '✓ Backend started on :8000' },
    { prompt: false, text: '✓ Frontend started on :3000' },
    { prompt: false, text: '', highlight: true, highlightText: '🚀 RISKCORE is ready at http://localhost:3000' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedLines((prev) => {
        if (prev >= codeLines.length) {
          clearInterval(timer)
          return prev
        }
        return prev + 1
      })
    }, 600)
    return () => clearInterval(timer)
  }, [codeLines.length])

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      <div className="bg-slate-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs text-slate-500 ml-2">Terminal — riskcore</span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 font-mono text-sm min-h-[240px]">
          {codeLines.slice(0, typedLines).map((line, i) => (
            <motion.div
              key={i}
              className="mb-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {line.prompt && <span className="text-emerald-400">$ </span>}
              {line.highlight ? (
                <span className="text-emerald-400 font-bold">{line.highlightText}</span>
              ) : (
                <span className={line.prompt ? 'text-slate-100' : 'text-slate-400'}>{line.text}</span>
              )}
            </motion.div>
          ))}
          {typedLines < codeLines.length && (
            <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ==============================================
// TRUST PILLARS
// ==============================================

function TrustPillars() {
  const pillars = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: '100% Open Source',
      description: 'Every line of code visible. Audit it, fork it, contribute to it. No black boxes.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      ),
      title: 'On-Premises Only',
      description: 'Your positions never leave your network. Deploy on your infrastructure, your rules.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: 'SOC 2 Ready',
      description: 'Enterprise security controls built-in. Audit logs, RBAC, encryption at rest.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: 'Built by Finance',
      description: '20+ years of hedge fund experience. We know risk because we&apos;ve lived it.',
    },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
    >
      {pillars.map((pillar, i) => (
        <motion.div
          key={pillar.title}
          className="text-center p-6 bg-slate-800/30 border border-white/10 rounded-xl hover:border-emerald-500/30 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9 + i * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <div className="text-emerald-400 flex justify-center mb-4">{pillar.icon}</div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">{pillar.title}</h3>
          <p className="text-sm text-slate-400">{pillar.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ==============================================
// CONTRIBUTOR AVATARS
// ==============================================

function ContributorAvatars() {
  // Placeholder avatars (would be real GitHub avatars in production)
  const avatars = Array(8).fill(null)

  return (
    <motion.div
      className="flex items-center justify-center gap-2 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2 }}
    >
      <div className="flex -space-x-3">
        {avatars.map((_, i) => (
          <motion.div
            key={i}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs text-slate-400"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.3 + i * 0.05, type: 'spring' }}
          >
            {String.fromCharCode(65 + i)}
          </motion.div>
        ))}
      </div>
      <span className="text-sm text-slate-500 ml-4">
        Join 67+ contributors building the future of risk
      </span>
    </motion.div>
  )
}

// ==============================================
// CTA BUTTONS
// ==============================================

function CTAButtons() {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <motion.a
        href="https://github.com/massimotodaro/riskcore"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm rounded-[3px] border border-white/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        Star on GitHub
      </motion.a>
      <motion.a
        href="#early-access"
        className="px-4 py-2 bg-brand-blue text-white font-semibold text-sm rounded-[3px] transition-all duration-200 hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Book a Demo
      </motion.a>
    </motion.div>
  )
}

// ==============================================
// MAIN HERO COMPONENT
// ==============================================

export default function Hero() {
  return (
    <section
      className="relative min-h-[90vh] overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0a0f1a, #151E31, #10182B)' }}
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Main Headline */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Open Source Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>100% Open Source</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-100 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Risk Visibility You Can
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Actually Trust
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Firm-wide risk aggregation for single and multi-manager funds.
            <br />
            <span className="text-slate-300">Open source. On-premises. No black boxes.</span>
          </motion.p>

          <CTAButtons />
          <GitHubStats />
        </motion.div>

        {/* Code Terminal */}
        <CodeTerminal />

        {/* Trust Pillars */}
        <TrustPillars />

        {/* Contributor Avatars */}
        <ContributorAvatars />

        {/* Final CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <p className="text-slate-500 text-sm">
            Built with transparency by{' '}
            <span className="text-slate-400">Massimo Todaro</span>
            {' '}• 20+ years in finance
          </p>
        </motion.div>
      </div>
    </section>
  )
}
