'use client'

/**
 * CorrelationBlindSpotF.tsx - Option F
 *
 * Simpler design - Three stages showing the problem progression
 * Clean cards with numbers showing correlation shift
 */

import { motion } from 'framer-motion'

const stages = [
  {
    number: '01',
    title: 'Separate Systems',
    description: 'Each PM runs their own risk system. Book A uses Bloomberg, Book B uses Enfusion, Book C uses Excel.',
    color: '#3b82f6',
  },
  {
    number: '02',
    title: 'False Confidence',
    description: 'Individually, each book looks fine. You assume low correlation because strategies differ.',
    color: '#22c55e',
  },
  {
    number: '03',
    title: 'Crisis Reveals Truth',
    description: 'Market stress hits. All three books drop 20%+ together. The correlation was always there—you just couldn\'t see it.',
    color: '#f59e0b',
  },
]

const stepColors = [
  '#3b82f6', // blue
  '#22c55e', // green
  '#f59e0b', // amber
]

export default function CorrelationBlindSpotF() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(to bottom, #1a2744, #0f172a)' }}>
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
            className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6"
          >
            The Unknown Correlation Problem
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 font-['Space_Grotesk'] mb-4">
            Hidden Correlations <span className="text-amber-400">Kill Funds</span>
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            When books sit in different systems, correlation becomes invisible—until it's too late.
          </p>
        </motion.div>

        {/* Three Stage Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
              className="relative"
            >
              {/* Connecting line to next card */}
              {index < stages.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${stepColors[index]}, ${stepColors[index + 1]})`
                  }}
                />
              )}

              <div
                className="bg-[#1e293b]/60 backdrop-blur-sm border rounded-2xl p-6 h-full"
                style={{ borderColor: `${stage.color}30` }}
              >
                {/* Number */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${stage.color}20`, border: `2px solid ${stage.color}40` }}
                >
                  <span className="text-lg font-bold" style={{ color: stage.color }}>{stage.number}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-100 mb-3">{stage.title}</h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">{stage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Correlation Comparison */}
        <div className="flex justify-center gap-8 mb-16">
          {/* Normal Times */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-[#1e293b]/60 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 text-center"
            style={{ width: '280px' }}
          >
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Normal Markets</p>
            <p className="text-5xl font-bold text-green-400 font-mono mb-2">0.2</p>
            <p className="text-slate-300 text-sm">Cross-book correlation</p>
            <div className="mt-4 px-3 py-2 bg-green-500/10 rounded-lg">
              <p className="text-green-400 text-xs font-medium">"Looks diversified"</p>
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <svg className="w-16 h-16 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>
          </div>

          {/* Crisis Times */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-[#1e293b]/60 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-6 text-center"
            style={{ width: '280px' }}
          >
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Market Stress</p>
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-5xl font-bold text-amber-400 font-mono mb-2"
            >
              0.9
            </motion.p>
            <p className="text-slate-300 text-sm">Cross-book correlation</p>
            <div className="mt-4 px-3 py-2 bg-amber-500/20 rounded-lg">
              <p className="text-amber-400 text-xs font-bold">All books move together</p>
            </div>
          </motion.div>
        </div>

        {/* The Blind Spot Card */}
        <div className="flex justify-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-2xl px-8 py-5"
            style={{ width: '70%', minWidth: '600px' }}
          >
            <div className="flex items-center gap-8">
              {/* Left side */}
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 2 }}
                  className="w-14 h-14 bg-amber-500/20 border-2 border-amber-500/40 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </motion.div>
                <div>
                  <p className="font-bold text-slate-100 text-xl">The Blind Spot</p>
                  <p className="text-sm text-amber-400">Why You Can't See It</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-16 bg-white/10 flex-shrink-0" />

              {/* Right side - Bullet points */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-400" />
                  <p className="text-slate-100 text-sm font-semibold">Each book uses different risk systems</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-green-400" />
                  <p className="text-slate-100 text-sm font-semibold">No unified view to calculate cross-book correlation</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-amber-400" />
                  <p className="text-slate-100 text-sm font-semibold">Historical correlation breaks down during stress</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="relative bg-[#1e293b]/90 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-8"
        >
          <div className="absolute top-4 left-6 text-6xl text-amber-500/20 font-serif leading-none">&ldquo;</div>

          <blockquote className="relative z-10 pl-8">
            <p className="text-lg md:text-xl text-slate-200 italic leading-relaxed">
              Diversification seems to disappear when investors need it the most. During crashes, correlations tend to spike—assets that looked uncorrelated suddenly move together.
            </p>
            <footer className="mt-4 text-sm text-slate-400">
              — Financial Analysts Journal
            </footer>
          </blockquote>
        </motion.div>

      </div>
    </section>
  )
}
