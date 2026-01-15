'use client'

/**
 * TimeTravelSection.tsx
 *
 * "You're now officially the Marty McFly of Risk Management."
 *
 * Landing page section showcasing the Time Travel feature.
 * For risk managers who've always wanted to go back in time
 * (but for compliance reasons, not personal ones).
 *
 * Usage:
 *   <TimeTravelSection />
 *
 * Dependencies:
 *   npm install framer-motion
 */

import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

// ==============================================
// ANIMATED DELOREAN / DASHBOARD ICON
// ==============================================

function AnimatedDashboard() {
  return (
    <motion.div
      className="relative w-64 h-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Dashboard frame */}
      <motion.div
        className="relative bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 h-full
                   shadow-[0_0_30px_rgba(16,185,129,0.2)]"
        whileHover={{ borderColor: 'rgba(16,185,129,0.6)' }}
      >
        {/* Time display - like the DeLorean's destination time */}
        <div className="text-center mb-3">
          <div className="text-[10px] text-emerald-400/60 uppercase tracking-widest mb-1">
            Destination Time
          </div>
          <motion.div
            className="font-mono text-2xl font-bold text-emerald-400"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            JAN 10 2026 14:32
          </motion.div>
        </div>

        {/* Animated time selector mockup */}
        <motion.div
          className="flex items-center justify-center gap-2 bg-slate-800/80 rounded-lg px-3 py-2 border border-white/10"
          animate={{ boxShadow: ['0 0 0px #10b981', '0 0 15px #10b981', '0 0 0px #10b981'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-sm text-slate-300">Last Friday Close</span>
          <span className="text-slate-500 text-xs">▼</span>
        </motion.div>

        {/* Calculate button */}
        <motion.button
          className="w-full mt-3 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg
                     text-emerald-400 text-sm font-semibold"
          whileHover={{ backgroundColor: 'rgba(16,185,129,0.3)', scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            boxShadow: [
              '0 0 0px rgba(16,185,129,0)',
              '0 0 20px rgba(16,185,129,0.4)',
              '0 0 0px rgba(16,185,129,0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <motion.span
            className="inline-block mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ↻
          </motion.span>
          Calculate
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ==============================================
// SPEED LINES ANIMATION (88 MPH VIBES)
// ==============================================

function SpeedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
          style={{
            top: `${10 + i * 8}%`,
            left: '-100%',
            width: '50%',
          }}
          animate={{
            x: ['0%', '400%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.15,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// ==============================================
// FEATURE CARDS
// ==============================================

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  delay: number
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-5
                 hover:border-emerald-500/30 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="text-lg font-semibold text-slate-100 mb-2">{title}</h4>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  )
}

// ==============================================
// MAIN TIME TRAVEL SECTION
// ==============================================

export default function TimeTravelSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const features = [
    {
      icon: '🕐',
      title: 'Any Point in Time',
      description: 'Jump to market close, pre-announcement, post-earnings, or any custom timestamp. Your risk, your timeline.',
    },
    {
      icon: '📸',
      title: 'Position Snapshots',
      description: 'See exactly what you held at any moment. No more "I think we had exposure" - now you know.',
    },
    {
      icon: '📊',
      title: 'Historical Greeks',
      description: 'Delta, Gamma, Vega, Theta - all recalculated for any point in history. Hindsight is finally 20/20.',
    },
    {
      icon: '🔍',
      title: 'Audit Trail',
      description: 'Regulators asking questions? Travel back and show them exactly what your book looked like. With receipts.',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Background effects */}
      <SpeedLines />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30
                       rounded-full text-emerald-400 text-sm font-medium mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <span>⚡</span>
            <span>New Feature</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Time Travel for{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Risk Managers
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Because &ldquo;what was our exposure last Friday?&rdquo; shouldn&apos;t require
            three spreadsheets and a prayer.
          </motion.p>
        </motion.div>

        {/* Main Content - Quote + Visual */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - The Marty McFly Quote */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.blockquote
              className="relative"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              {/* Quote marks */}
              <span className="absolute -top-8 -left-4 text-7xl text-emerald-500/20 font-serif">&ldquo;</span>

              <p className="text-2xl md:text-3xl font-medium text-slate-200 leading-relaxed mb-6 relative z-10">
                You&apos;re now officially the{' '}
                <motion.span
                  className="text-emerald-400 font-bold"
                  animate={{
                    textShadow: [
                      '0 0 0px #10b981',
                      '0 0 20px #10b981',
                      '0 0 0px #10b981'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Marty McFly
                </motion.span>
                {' '}of Risk Management.
              </p>

              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                Instead of a DeLorean doing 88 mph, you&apos;ve got a dropdown doing{' '}
                <span className="text-slate-200 font-mono">T-minus whatever-you-want</span>.
              </p>

              <p className="text-lg text-slate-400 leading-relaxed">
                And instead of accidentally making your mom fall in love with you,
                you can finally answer the question that&apos;s been haunting you:{' '}
                <motion.span
                  className="text-emerald-400 font-semibold italic"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2 }}
                >
                  &ldquo;Did my PM have $50M of Tesla exposure last Friday before Elon tweeted again?&rdquo;
                </motion.span>
              </p>

              <span className="absolute -bottom-4 right-0 text-7xl text-emerald-500/20 font-serif">&rdquo;</span>
            </motion.blockquote>

            {/* CTA Button */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              <motion.button
                className="group flex items-center gap-3 px-6 py-3 bg-emerald-500 hover:bg-emerald-400
                           rounded-xl text-slate-900 font-semibold text-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Go Back in Time</span>
                <motion.span
                  className="text-xl"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
              <p className="text-sm text-slate-500 mt-3">
                Flux capacitor not included. Calculate button works just as well.
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Animated Dashboard Visual */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <AnimatedDashboard />
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={0.9 + index * 0.1}
            />
          ))}
        </motion.div>

        {/* Bottom Tagline */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4 }}
        >
          <p className="text-slate-500 text-sm">
            Great Scott! Your risk reports will never be the same.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
