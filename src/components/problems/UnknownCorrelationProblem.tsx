'use client'

/**
 * UnknownCorrelationProblem.tsx
 *
 * Focus: The difficulty of calculating correlations and hedge ratios
 * when books sit in different systems. Not about preventing crisis
 * correlation spikes, but about having visibility and tools to understand
 * your actual risk exposure.
 */

import { motion } from 'framer-motion'

// Key questions that expose the pain
const questions = [
  {
    question: "Do you know the correlation between Book A and Book B right now?",
    pain: "Hours of manual data export, normalization, and calculation",
    color: '#3b82f6',
  },
  {
    question: "What's your firm-wide beta to the S&P 500?",
    pain: "Impossible without aggregating positions from 5+ systems",
    color: '#22c55e',
  },
  {
    question: "What hedge ratio do you need to offset sector concentration?",
    pain: "Days to gather data, build model, validate results",
    color: '#a855f7',
  },
]

export default function UnknownCorrelationProblem() {
  return (
    <section className="relative py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 font-['Space_Grotesk'] mb-6">
            Hidden Correlations <span style={{ color: '#22C55E' }}>Kill Funds</span>
          </h2>

          <p className="text-lg text-slate-400 max-w-4xl mx-auto">When books sit in different systems with different metrics, correlation becomes invisible - until it&apos;s too late.</p>
        </motion.div>

        {/* Two Column Layout: Questions Left, Correlation Matrix Right */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16 lg:items-stretch">

          {/* LEFT: Three question cards stacked */}
          <div className="lg:w-[35%] flex flex-col gap-4">
            {questions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex-1 flex items-center"
              >
                <div className="flex items-start gap-4">
                  {/* Number */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}20`, border: `2px solid ${item.color}50` }}
                  >
                    <span className="text-lg font-bold" style={{ color: item.color }}>{index + 1}</span>
                  </motion.div>
                  <div>
                    {/* Question */}
                    <p className="text-slate-100 font-semibold text-base leading-snug mb-2">
                      {item.question}
                    </p>
                    {/* Pain point */}
                    <p className="text-sm text-slate-400">{item.pain}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Correlation Matrix */}
          <div className="lg:w-[65%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-500/5 to-slate-500/5 border border-blue-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-6 h-full"
            >
              <div className="mb-3 sm:mb-6 text-center">
                <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-wider mb-1">Cross-Book Correlation</p>
                <h3 className="text-base sm:text-xl md:text-2xl font-bold text-blue-400 font-['Space_Grotesk']">
                  What Do You Actually Know?
                </h3>
              </div>

              {/* Correlation Matrix - Centered and Large */}
              <div className="flex justify-center overflow-x-auto">
                <table className="text-xs sm:text-base">
                  <thead>
                    <tr>
                      <th className="px-1 sm:px-3 py-1 w-12 sm:w-20"></th>
                      {['Alpha', 'Beta', 'Gamma', 'Delta', 'Macro', 'Quant'].map((book) => (
                        <th key={book} className="px-1 sm:px-3 py-1 text-xs sm:text-lg text-slate-300 font-semibold">{book}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Alpha', values: ['1.0', '?', '0.3', '?', '?', '-0.2'] },
                      { name: 'Beta', values: ['?', '1.0', '?', '0.6', '?', '?'] },
                      { name: 'Gamma', values: ['0.3', '?', '1.0', '?', '-0.4', '?'] },
                      { name: 'Delta', values: ['?', '0.6', '?', '1.0', '?', '0.7'] },
                      { name: 'Macro', values: ['?', '?', '-0.4', '?', '1.0', '?'] },
                      { name: 'Quant', values: ['-0.2', '?', '?', '0.7', '?', '1.0'] },
                    ].map((row) => (
                      <tr key={row.name}>
                        <td className="px-1 sm:px-3 py-1 text-xs sm:text-lg text-slate-300 font-semibold">{row.name}</td>
                        {row.values.map((val, i) => (
                          <td key={i} className="px-1 sm:px-3 py-1 text-center">
                            {val === '1.0' ? (
                              <span className="text-sm sm:text-xl text-slate-600">1.0</span>
                            ) : val === '?' ? (
                              <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ repeat: Infinity, duration: 1.5, delay: Math.random() }}
                                className="text-lg sm:text-3xl text-orange-500 font-bold"
                              >?</motion.span>
                            ) : val.startsWith('-') ? (
                              <span className="text-sm sm:text-xl text-red-400 font-semibold">{val}</span>
                            ) : (
                              <span className="text-sm sm:text-xl text-green-400 font-semibold">{val}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>

        {/* The Real Cost - Full width at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-2xl p-6 mt-8"
        >
          <div className="mb-6 text-left">
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">The Real Cost</p>
            <h3 className="text-2xl md:text-3xl font-bold text-blue-400 font-['Space_Grotesk']">
              Flying Blind
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-4 p-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0 }}
                className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: '2px solid rgba(59, 130, 246, 0.5)' }}
              >
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </motion.div>
              <div>
                <p className="text-slate-100 font-semibold">No real-time correlation view</p>
                <p className="text-sm text-slate-400">You don&apos;t know how books move together</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: '2px solid rgba(34, 197, 94, 0.5)' }}
              >
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </motion.div>
              <div>
                <p className="text-slate-100 font-semibold">Can&apos;t calculate hedge ratios</p>
                <p className="text-sm text-slate-400">Overlay portfolio is guesswork</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: '2px solid rgba(168, 85, 247, 0.5)' }}
              >
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <div>
                <p className="text-slate-100 font-semibold">Days to answer simple questions</p>
                <p className="text-sm text-slate-400">By then, the market has moved</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </section>
  )
}
