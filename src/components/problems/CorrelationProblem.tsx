'use client'

/**
 * CorrelationProblem.tsx
 *
 * Shows how hidden correlations between books can kill a fund
 * when they only become apparent during market stress.
 */

import { motion } from 'framer-motion'

// Example books that appear uncorrelated
const books = [
  { name: 'Book A', strategy: 'Long/Short Equity', color: '#3b82f6' },
  { name: 'Book B', strategy: 'Credit Arbitrage', color: '#22c55e' },
  { name: 'Book C', strategy: 'Macro Rates', color: '#a855f7' },
]

// Historical examples
const examples = [
  {
    name: 'LTCM',
    year: '1998',
    loss: '$4.6B',
    lesson: 'Positions across asset classes became correlated during Russian debt crisis',
  },
  {
    name: 'Archegos',
    year: '2021',
    loss: '$10B+',
    lesson: 'Hidden concentrated positions across prime brokers amplified losses',
  },
  {
    name: '2008 Crisis',
    year: '2008',
    loss: 'Systemic',
    lesson: '"Diversified" mortgage exposures all moved together',
  },
]

export default function CorrelationProblem() {
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
            className="inline-block px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-full text-rose-400 text-sm font-medium mb-6"
          >
            The Unknown Correlation Problem
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 font-['Space_Grotesk'] mb-4">
            Hidden Correlations <span className="text-rose-400">Kill Funds</span>
          </h2>

          <p className="text-lg text-slate-400">
            When books sit in different systems with different metrics, correlation becomes invisible—until it's too late.
          </p>
        </motion.div>

        {/* Visual: Normal vs Crisis Correlation */}
        <div className="flex justify-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-br from-rose-500/5 to-slate-500/5 border border-rose-500/20 rounded-2xl px-8 py-6"
            style={{ width: '85%', minWidth: '700px' }}
          >
            <div className="flex items-center gap-6">
              {/* Normal Times - Left side */}
              <div className="flex-1">
                <p className="text-2xl font-bold text-slate-300 mb-4">Normal Markets</p>
                <div className="space-y-3">
                  {books.map((book, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: book.color }} />
                      <p className="text-slate-300 text-base">
                        <span style={{ color: book.color }} className="font-medium">{book.name}:</span> {book.strategy}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm font-medium text-center">Correlation: ~0.2 — "Diversified"</p>
                </div>
              </div>

              {/* Animated Arrow with warning */}
              <div className="flex flex-col items-center px-4">
                <p className="text-xs text-slate-500 mb-2">Market Stress</p>
                <svg className="w-24 h-12" viewBox="0 0 100 50" fill="none">
                  <motion.path
                    d="M5 25 H75"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <motion.path
                    d="M70 15 L85 25 L70 35"
                    stroke="#f43f5e"
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
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="mt-2"
                >
                  <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </motion.div>
              </div>

              {/* Crisis Times - Right side */}
              <div className="flex-1">
                <p className="text-2xl font-bold text-rose-400 mb-4">Crisis Hits</p>
                <div className="space-y-3">
                  {books.map((book, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                      <p className="text-slate-100 text-base font-semibold">
                        {book.name}: <span className="text-rose-400">↓ Down</span>
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 px-3 py-2 bg-rose-500/20 border border-rose-500/40 rounded-lg">
                  <p className="text-rose-400 text-sm font-bold text-center">Correlation: ~0.9 — All moving together</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* The Core Problem Card */}
        <div className="flex justify-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-[#1e293b]/90 backdrop-blur-sm border border-rose-500/30 rounded-2xl px-8 py-5"
            style={{ width: '60%', minWidth: '500px' }}
          >
            <div className="flex items-center gap-8">
              {/* Icon */}
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 2 }}
                  className="w-14 h-14 bg-rose-500/20 border-2 border-rose-500/40 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg className="w-7 h-7 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                <div>
                  <p className="font-bold text-slate-100 text-xl">The Blind Spot</p>
                  <p className="text-sm text-rose-400">Why you can't see it</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-16 bg-white/10 flex-shrink-0" />

              {/* Bullet points */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#f43f5e' }} />
                  <p className="text-slate-100 text-sm font-semibold">Books use different systems and valuations</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#e11d48' }} />
                  <p className="text-slate-100 text-sm font-semibold">No unified view to calculate cross-book correlation</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#be123c' }} />
                  <p className="text-slate-100 text-sm font-semibold">Historical correlation breaks down in crisis</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Historical Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-slate-100 font-['Space_Grotesk'] mb-6 text-center">
            When Correlation Became Visible—Too Late
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-rose-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-rose-500/20 border border-rose-500/40 rounded-lg text-sm font-bold text-rose-400">
                    {example.name}
                  </span>
                  <span className="text-slate-500 text-sm">{example.year}</span>
                </div>
                <p className="text-2xl font-bold text-rose-400 mb-2">{example.loss}</p>
                <p className="text-slate-400 text-sm">{example.lesson}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="relative bg-[#1e293b]/90 backdrop-blur-sm border border-rose-500/30 rounded-2xl p-8"
        >
          {/* Quote marks */}
          <div className="absolute top-4 left-6 text-6xl text-rose-500/20 font-serif leading-none">"</div>

          <blockquote className="relative z-10 pl-8">
            <p className="text-lg md:text-xl text-slate-200 italic leading-relaxed">
              Diversification seems to disappear when investors need it the most. During crashes, correlations tend to spike—assets that looked uncorrelated suddenly move together.
            </p>
            <footer className="mt-4 text-sm text-slate-400">
              — <a href="https://www.tandfonline.com/doi/full/10.2469/faj.v74.n3.3" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:text-rose-300 underline transition-colors">Financial Analysts Journal</a>
            </footer>
          </blockquote>
        </motion.div>

      </div>
    </section>
  )
}
