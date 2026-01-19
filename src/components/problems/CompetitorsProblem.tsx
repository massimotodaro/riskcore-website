'use client'

/**
 * CompetitorsProblem.tsx
 *
 * Shows why existing solutions don't solve the multi-manager problem.
 * Each competitor is designed for single-fund operations.
 */

import { motion } from 'framer-motion'

const assumptions = [
  { platform: 'Bloomberg', assumption: 'One system for all users' },
  { platform: 'Enfusion', assumption: 'Everyone adopts the same platform' },
  { platform: 'Axioma', assumption: 'Standardized data formats' },
]

const reality = [
  'Teams choose their own systems',
  'Forcing changes = talent attrition',
  '"Best of breed" means fragmentation',
]

export default function CompetitorsProblem() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(to bottom, #0f172a, #1a2744)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium mb-6"
          >
            The System Fragmentation Problem
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 font-['Space_Grotesk'] mb-4">
            No Platform <span className="text-purple-400">Connects What You Already Have</span>
          </h2>

          <p className="text-xl text-slate-100">
            Every platform is built to replace, not to integrate.
          </p>
        </motion.div>

        {/* Assumptions vs Reality - Unified Card */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-br from-purple-500/5 to-slate-500/5 border border-purple-500/20 rounded-2xl px-8 py-6 mb-16"
            style={{ width: '80%', minWidth: '700px' }}
          >
            <div className="flex items-center gap-6">
              {/* Assumptions - Left side */}
              <div className="flex-1">
                <p className="text-2xl font-bold text-slate-300 mb-4">Assumptions</p>
                <div className="space-y-3">
                  {assumptions.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0" />
                      <p className="text-base">
                        <span className="text-slate-400">{item.platform}:</span>{' '}
                        <span className="text-slate-100 font-semibold">{item.assumption}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Animated Arrow */}
              <div className="flex items-center px-4">
                <svg className="w-24 h-12" viewBox="0 0 100 50" fill="none">
                  <motion.path
                    d="M5 25 H75"
                    stroke="#a855f7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <motion.path
                    d="M70 15 L85 25 L70 35"
                    stroke="#a855f7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 1.3 }}
                  />
                </svg>
              </div>

              {/* Reality - Right side */}
              <div className="flex-1">
                <p className="text-2xl font-bold text-purple-400 mb-4">Reality</p>
                <div className="space-y-3">
                  {reality.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: index === 0 ? '#a855f7' : index === 1 ? '#8b5cf6' : '#7c3aed' }} />
                      <p className="text-slate-100 text-base font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Industry Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative bg-[#1e293b]/90 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8"
        >
          {/* Quote marks */}
          <div className="absolute top-4 left-6 text-6xl text-purple-500/20 font-serif leading-none">&ldquo;</div>

          <blockquote className="relative z-10 pl-8">
            <p className="text-lg md:text-xl text-slate-200 italic leading-relaxed">
              Fragmentation is not just an operational nuisance. It is a structural drag on alpha generation, execution quality, and risk control.
            </p>
            <footer className="mt-4 text-sm text-slate-400">
              — <a href="https://kx.com/blog/hedge-funds-build-unified-data-ecosystem/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline transition-colors">KX</a>
            </footer>
          </blockquote>
        </motion.div>

      </div>
    </section>
  )
}
