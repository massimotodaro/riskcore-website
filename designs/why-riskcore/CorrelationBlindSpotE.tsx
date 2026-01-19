'use client'

/**
 * CorrelationBlindSpotE.tsx - Cross-PM Correlation Framework
 *
 * Single column layout - each card stacked vertically
 * Follows DESIGN-SYSTEM.md exactly
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Portfolio names for the matrix - from HTML
const portfolioHeaders = [
  { short: 'Alpha', full: 'Alpha Growth' },
  { short: 'Macro', full: 'Macro Sys' },
  { short: 'Credit', full: 'Credit Opp' },
  { short: 'EM', full: 'EM Equity' },
  { short: 'Vol', full: 'Vol Trading' },
  { short: 'Rates', full: 'Rates RV' },
]

// Full correlation matrix data - exact values from HTML
const correlationMatrix = [
  [1.00, 0.72, 0.42, 0.85, -0.28, 0.31],
  [0.72, 1.00, 0.48, 0.68, -0.15, 0.52],
  [0.42, 0.48, 1.00, 0.35, -0.38, 0.62],
  [0.85, 0.68, 0.35, 1.00, -0.42, 0.18],
  [-0.28, -0.15, -0.38, -0.42, 1.00, -0.05],
  [0.31, 0.52, 0.62, 0.18, -0.05, 1.00],
]

// Get color style based on correlation value - exact colors from HTML
function getCorrelationStyle(value: number): { bg: string; text: string } {
  if (value === 1) return { bg: '#334155', text: '#64748b' } // diagonal
  if (value >= 0.85) return { bg: '#15803d', text: '#ffffff' } // c-08
  if (value >= 0.75) return { bg: '#16a34a', text: '#ffffff' } // c-07
  if (value >= 0.65) return { bg: '#22c55e', text: '#ffffff' } // c-06
  if (value >= 0.55) return { bg: '#4ade80', text: '#0f172a' } // c-05
  if (value >= 0.45) return { bg: '#86efac', text: '#0f172a' } // c-04
  if (value >= 0.35) return { bg: '#bbf7d0', text: '#0f172a' } // c-03
  if (value >= 0.25) return { bg: '#dcfce7', text: '#0f172a' } // c-02
  if (value >= 0.15) return { bg: '#f0fdf4', text: '#0f172a' } // c-01
  if (value > -0.15) return { bg: '#334155', text: '#94a3b8' } // c-00
  if (value > -0.25) return { bg: '#fee2e2', text: '#0f172a' } // c--02
  if (value > -0.35) return { bg: '#fecaca', text: '#0f172a' } // c--03
  if (value > -0.45) return { bg: '#fca5a5', text: '#0f172a' } // c--04
  if (value > -0.55) return { bg: '#f87171', text: '#ffffff' } // c--05
  return { bg: '#dc2626', text: '#ffffff' } // c--06+
}

// RiskPod configurations
const riskPods = [
  { name: 'Equity', abbr: 'EQ', color: '#3b82f6', anchor: 'SPX', correlations: [0.82, 0.48, 0.92, -0.52] },
  { name: 'Rates', abbr: 'RT', color: '#22c55e', anchor: 'US10Y', correlations: [0.58, 0.65, 0.38, 0.72] },
  { name: 'Credit', abbr: 'CR', color: '#a855f7', anchor: 'CDX.IG', correlations: [0.42, 0.55, 0.35, -0.42] },
  { name: 'FX', abbr: 'FX', color: '#06b6d4', anchor: 'DXY', correlations: [0.52, 0.28, 0.62, 0.08] },
  { name: 'Commodities', abbr: 'CM', color: '#f97316', anchor: 'BCOM', correlations: [0.62, 0.22, 0.72, -0.12] },
  { name: 'Other', abbr: 'OT', color: '#94a3b8', anchor: 'VIX', correlations: [0.42, 0.22, 0.48, 0.75] },
]

// High correlation pairs for alerts - from HTML
const highCorrelationPairs = [
  { pair: 'Alpha Growth + EM Equity', correlation: 0.85, riskPod: 'Equity' },
  { pair: 'Alpha Growth + Macro Sys', correlation: 0.72, riskPod: 'Total' },
  { pair: 'Macro Sys + EM Equity', correlation: 0.68, riskPod: 'Rates' },
]

// Animated correlation cell component - exact styling from HTML
function CorrelationCell({
  value,
  delay = 0,
  isDiagonal = false,
}: {
  value: number
  delay?: number
  isDiagonal?: boolean
}) {
  const style = getCorrelationStyle(value)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.2, ease: 'easeOut' }}
      style={{
        width: '65px',
        height: '65px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontFamily: "'SF Mono', Monaco, 'Consolas', monospace",
        fontSize: '11px',
        borderRadius: '3px',
        cursor: isDiagonal ? 'default' : 'pointer',
        backgroundColor: style.bg,
        color: style.text,
        transition: 'all 0.15s',
      }}
      whileHover={!isDiagonal ? { scale: 1.15, zIndex: 10 } : {}}
    >
      {value.toFixed(2)}
    </motion.div>
  )
}

export default function CorrelationBlindSpotE() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0f172a, #151E31)' }}
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ==================== SECTION 1: Header ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-500 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Proprietary Technology
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6 font-['Space_Grotesk']">
            Cross-PM Correlation Framework
          </h2>

          <p className="text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Traditional tools analyze each PM in isolation. Our proprietary correlation engine reveals
            <span className="text-purple-500 font-semibold"> hidden risk relationships between strategies</span> that other platforms miss entirely.
          </p>
        </motion.div>

        {/* ==================== SECTION 2: Title ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1.5 bg-purple-500/20 text-purple-500 text-xs font-bold uppercase tracking-wider rounded-full border border-purple-500/30">
              Total
            </span>
            <span className="text-xl font-semibold text-slate-100">Overall Correlation Matrix</span>
          </div>
          <p className="text-sm text-slate-400">Weighted average across all RiskPods</p>
        </motion.div>

        {/* ==================== SECTION 3: Matrix Only ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-end mb-6"
        >
          <table
            style={{
              borderCollapse: 'separate',
              borderSpacing: '2px',
            }}
          >
            <thead>
              <tr>
                <th style={{ width: '70px' }}></th>
                {portfolioHeaders.map((p) => (
                  <th
                    key={p.short}
                    className="text-[10px] font-medium text-slate-400 text-center pb-1"
                    style={{ lineHeight: 1.2, width: '65px' }}
                  >
                    {p.short}<br/>{p.full.split(' ')[1] || ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {correlationMatrix.map((row, i) => (
                <tr key={portfolioHeaders[i].full}>
                  <th className="text-[10px] font-medium text-slate-400 text-right pr-2">
                    {portfolioHeaders[i].full}
                  </th>
                  {row.map((value, j) => (
                    <td key={j} style={{ padding: 0, verticalAlign: 'middle' }}>
                      {isInView && (
                        <CorrelationCell
                          value={value}
                          delay={0.01 * (i * 6 + j)}
                          isDiagonal={i === j}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* ==================== SECTION 4: Stats & Legend ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6"
        >
          {/* Stats Row - values from HTML */}
          <div className="flex gap-6">
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-green-500 font-mono">0.85</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Highest</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-red-500 font-mono">-0.42</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Lowest</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-slate-400 font-mono">0.32</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Average</div>
            </div>
          </div>

          {/* Legend Gradient */}
          <div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-white/10">
            <span className="text-xs font-bold text-slate-500">-1</span>
            <div
              className="w-48 h-3 rounded-full"
              style={{
                background: 'linear-gradient(to right, #991b1b, #dc2626, #f87171, #fecaca, #475569, #bbf7d0, #4ade80, #16a34a, #166534)'
              }}
            />
            <span className="text-xs font-bold text-slate-500">+1</span>
          </div>
        </motion.div>

        {/* ==================== SECTION 3: RiskPod Breakdown ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6"
        >
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-100 mb-2">RiskPod Breakdown</h3>
            <p className="text-sm text-slate-400">Correlation decomposed by asset class</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {riskPods.map((pod, index) => (
              <motion.div
                key={pod.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="bg-[#0f172a]/50 border border-white/10 rounded-2xl p-4"
                style={{ borderTopColor: pod.color, borderTopWidth: '3px' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: `${pod.color}20`, color: pod.color }}
                  >
                    {pod.abbr}
                  </div>
                  <div>
                    <span className="text-base font-semibold text-slate-100 block">{pod.name}</span>
                    <span className="text-xs text-slate-500 font-mono">{pod.anchor}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {pod.correlations.map((val, i) => {
                    const style = getCorrelationStyle(val)
                    return (
                      <div
                        key={i}
                        className="text-xs font-mono font-bold text-center py-2 rounded-lg"
                        style={{ backgroundColor: style.bg, color: style.text }}
                      >
                        {val.toFixed(2)}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ==================== SECTION 4: High Correlation Alert ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/40"
            >
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-red-500 font-bold text-lg">High Correlation Alert</span>
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="px-2 py-0.5 bg-red-500/30 text-red-400 text-xs rounded-lg font-medium"
                >
                  LIVE
                </motion.span>
              </div>
              <p className="text-sm text-slate-400">3 PM pairs above 0.65 threshold</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highCorrelationPairs.map((item, i) => (
              <motion.div
                key={item.pair}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.15 }}
                className="flex items-center justify-between p-4 bg-[#1e293b]/90 rounded-2xl border border-white/10"
              >
                <div>
                  <span className="text-slate-100 font-medium block">{item.pair}</span>
                  <span className="text-xs text-slate-500">{item.riskPod}</span>
                </div>
                <span className="text-red-500 font-bold font-mono text-2xl">{item.correlation.toFixed(2)}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ==================== SECTION 5: Key Benefits ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-[#1e293b]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6"
        >
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Key Capabilities</h3>
            <p className="text-sm text-slate-400">What makes our correlation framework unique</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                ),
                title: 'Strategy Correlation',
                desc: 'See how PM strategies move together in real-time',
                color: '#a855f7'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Factor Decomposition',
                desc: 'Break down correlations by asset class and factor',
                color: '#3b82f6'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ),
                title: 'Tail Risk Detection',
                desc: 'Identify hidden concentration risks before they compound',
                color: '#ef4444'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                title: 'Stress Testing',
                desc: 'Model 2008, 2020, and custom scenarios instantly',
                color: '#22c55e'
              },
            ].map((item, i) => (
              <div key={item.title} className="text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  {item.icon}
                </div>
                <h4 className="text-base font-semibold text-slate-100 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ==================== SECTION 6: Quote ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-[#1e293b]/90 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6"
        >
          <blockquote className="text-xl md:text-2xl font-medium text-slate-300 italic leading-relaxed text-center">
            &ldquo;We discovered that two of our PMs had 0.85 correlation without knowing it.
            <span className="text-purple-500 not-italic font-semibold"> RISKCORE showed us the blind spot.</span>&rdquo;
          </blockquote>
          <p className="mt-4 text-slate-500 font-medium text-center">— CRO, $8B Multi-Manager Fund</p>
        </motion.div>

      </div>
    </section>
  )
}
