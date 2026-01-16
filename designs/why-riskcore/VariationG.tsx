'use client'

/**
 * Why RISKCORE - Variation G: "Data-Driven"
 *
 * Technical, metrics-focused design with:
 * - Dashboard-style visualizations
 * - Live data simulations
 * - Code-like aesthetic elements
 * - Grid-based layouts
 * - Monospace typography accents
 */

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// ==============================================
// CUSTOM SVG ICONS
// ==============================================

const Icons = {
  terminal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 17l6-6-6-6" />
      <path d="M12 19h8" />
    </svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 3v18h18" />
      <path d="M18 9l-5 5-4-4-3 3" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  overlap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  ),
  correlation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 3v18h18" />
      <circle cx="8" cy="14" r="1.5" />
      <circle cx="13" cy="9" r="1.5" />
      <circle cx="18" cy="5" r="1.5" />
    </svg>
  ),
}

// ==============================================
// LIVE DATA SIMULATION
// ==============================================

function useAnimatedValue(target: number, duration: number = 2000) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target, duration])

  return value
}

// ==============================================
// SECTION 1: THE PROBLEM (DATA VIEW)
// ==============================================

const systemsData = [
  { name: 'Bloomberg', records: '2.4M', latency: '~2hr', status: 'delayed' },
  { name: 'Axioma', records: '890K', latency: '~4hr', status: 'delayed' },
  { name: 'Excel', records: '156K', latency: 'Manual', status: 'error' },
  { name: 'Python', records: '340K', latency: '~1hr', status: 'delayed' },
  { name: 'Proprietary', records: '520K', latency: '~3hr', status: 'delayed' },
]

const painMetrics = [
  { label: 'Time to aggregate', value: '2-8 hrs', trend: 'up', color: '#ef4444' },
  { label: 'Manual errors/week', value: '47+', trend: 'up', color: '#f59e0b' },
  { label: 'Data freshness', value: '-24 hrs', trend: 'down', color: '#f97316' },
  { label: 'Coverage gaps', value: '15-30%', trend: 'up', color: '#a855f7' },
]

function DataTable() {
  return (
    <div className="bg-slate-950/80 border border-white/[0.06] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-slate-900/50 border-b border-white/[0.06]">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">System</span>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Records</span>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Latency</span>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</span>
      </div>
      {/* Rows */}
      {systemsData.map((system, index) => (
        <motion.div
          key={system.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index }}
          className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
        >
          <span className="text-sm text-slate-300 font-medium">{system.name}</span>
          <span className="text-sm text-slate-400 font-mono">{system.records}</span>
          <span className="text-sm text-slate-400 font-mono">{system.latency}</span>
          <span className={`text-xs font-semibold uppercase ${system.status === 'error' ? 'text-red-400' : 'text-amber-400'}`}>
            {system.status}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function MetricsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {painMetrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="p-5 rounded-xl bg-slate-900/60 border border-white/[0.06]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider">{metric.label}</span>
            <span className={`text-xs ${metric.trend === 'up' ? 'text-red-400' : 'text-amber-400'}`}>
              {metric.trend === 'up' ? '↑' : '↓'}
            </span>
          </div>
          <span className="text-2xl font-bold font-mono" style={{ color: metric.color }}>
            {metric.value}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050810 0%, #0a0f1a 100%)' }}>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Terminal-style scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)'
      }} />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg mb-8 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-red-400">{Icons.alert}</span>
            <span className="text-red-400 text-sm font-semibold">SYSTEM_STATUS: FRAGMENTED</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            The Multi-Manager Risk
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 font-mono">
              {"{ Challenge }"}
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-mono">
            <span className="text-slate-500">// </span>
            Data silos create blind spots. Manual processes create errors.
          </p>
        </motion.div>

        {/* Data Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-8"
        >
          {/* Metrics */}
          <MetricsGrid />

          {/* Systems Table */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.06]">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-slate-400">{Icons.database}</span>
              <span className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Data Sources</span>
              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-mono rounded">NOT UNIFIED</span>
            </div>
            <DataTable />
          </div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-red-950/60 to-red-900/40 border border-red-500/20 rounded-xl font-mono">
              <div className="flex items-center gap-2">
                <span className="text-red-400 text-sm">OUTPUT:</span>
                <span className="text-white font-semibold">Risk Report</span>
              </div>
              <span className="text-slate-600">|</span>
              <span className="text-red-400 text-sm">LATENCY: 2 days</span>
              <span className="text-slate-600">|</span>
              <span className="text-amber-400 text-sm">ERRORS: 47</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 2: COST ANALYSIS
// ==============================================

const costData = [
  { category: 'Time Lost', current: '$180K', optimized: '$12K', savings: '93%', color: '#ef4444' },
  { category: 'Error Remediation', current: '$95K', optimized: '$8K', savings: '92%', color: '#f59e0b' },
  { category: 'Platform Fees', current: '$450K', optimized: '$0', savings: '100%', color: '#a855f7' },
  { category: 'Opportunity Cost', current: '$300K', optimized: '$25K', savings: '92%', color: '#06b6d4' },
]

function CostSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0f1a 0%, #0f172a 100%)' }}>
      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg mb-8 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-red-400">{Icons.chart}</span>
            <span className="text-red-400 text-sm font-semibold">COST_ANALYSIS</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Annual Cost of <span className="text-red-400">Fragmentation</span>
          </h2>
        </motion.div>

        {/* Cost Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-slate-950/80 border border-white/[0.06] rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 px-8 py-4 bg-slate-900/50 border-b border-white/[0.06]">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</span>
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Current State</span>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">With RISKCORE</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Savings</span>
          </div>
          {/* Rows */}
          {costData.map((row, index) => (
            <motion.div
              key={row.category}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="grid grid-cols-4 gap-4 px-8 py-5 border-b border-white/[0.04] last:border-0"
            >
              <span className="text-sm text-slate-300 font-medium">{row.category}</span>
              <span className="text-lg text-red-400 font-mono font-semibold">{row.current}</span>
              <span className="text-lg text-emerald-400 font-mono font-semibold">{row.optimized}</span>
              <span className="inline-flex items-center gap-2">
                <span className="text-lg text-emerald-400 font-mono font-bold">{row.savings}</span>
                <span className="text-emerald-500">↓</span>
              </span>
            </motion.div>
          ))}
          {/* Total */}
          <div className="grid grid-cols-4 gap-4 px-8 py-5 bg-emerald-500/[0.05] border-t border-emerald-500/20">
            <span className="text-sm text-white font-bold uppercase">Total Annual</span>
            <span className="text-xl text-red-400 font-mono font-bold">$1.025M</span>
            <span className="text-xl text-emerald-400 font-mono font-bold">$45K</span>
            <span className="text-xl text-emerald-400 font-mono font-bold">$980K saved</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 3: THE SOLUTION
// ==============================================

const solutionMetrics = [
  { label: 'Time to insight', before: '2-8 hrs', after: '<5 sec', improvement: '5000x' },
  { label: 'Data freshness', before: '-24 hrs', after: 'Real-time', improvement: '∞' },
  { label: 'Error rate', before: '47+/week', after: '0', improvement: '100%' },
  { label: 'Coverage', before: '70-85%', after: '100%', improvement: 'Full' },
]

function SolutionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #131c2e 100%)' }}>
      {/* Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[150px]" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-8 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-emerald-400">{Icons.terminal}</span>
            <span className="text-emerald-400 text-sm font-semibold">RISKCORE.init()</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Built for Multi-Manager
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-mono">
              {"{ from_scratch }"}
            </span>
          </h2>
        </motion.div>

        {/* Metrics Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {solutionMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-6 rounded-xl bg-slate-900/60 border border-white/[0.06] hover:border-emerald-500/20 transition-colors"
            >
              <span className="text-xs text-slate-500 uppercase tracking-wider block mb-4">{metric.label}</span>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-red-400 font-mono line-through">{metric.before}</span>
                <span className="text-slate-600">→</span>
                <span className="text-lg text-emerald-400 font-mono font-semibold">{metric.after}</span>
              </div>

              <span className="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-mono rounded">
                {metric.improvement} improvement
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="p-6 rounded-2xl bg-slate-950/80 border border-emerald-500/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Live Aggregation</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">Last updated: just now</span>
          </div>

          {/* Mock Dashboard */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 p-5 rounded-xl bg-slate-900/60 border border-white/[0.06]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-400">Firm-Wide Net Delta</span>
                <span className="text-xs text-emerald-400 font-mono">+1.2%</span>
              </div>
              <span className="text-3xl font-bold text-white font-mono">$42.5M</span>
              <div className="mt-4 h-16 flex items-end gap-1">
                {[35, 42, 38, 55, 48, 62, 58, 45, 52, 48, 55, 60].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-emerald-500/40 to-emerald-400/20 rounded-t"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${h}%` } : {}}
                    transition={{ delay: 0.8 + i * 0.05 }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                <span className="text-xs text-slate-500 block mb-2">Positions</span>
                <span className="text-2xl font-bold text-white font-mono">4,081</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                <span className="text-xs text-slate-500 block mb-2">PMs Connected</span>
                <span className="text-2xl font-bold text-white font-mono">12</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                <span className="text-xs text-slate-500 block mb-2">VaR (95%)</span>
                <span className="text-2xl font-bold text-red-400 font-mono">$8.2M</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 4: CAPABILITIES
// ==============================================

const capabilities = [
  {
    icon: Icons.overlap,
    title: 'Cross-PM Overlap Detection',
    code: 'riskcore.detect_overlap(firm_positions)',
    output: '{ "AAPL": { "overlap": true, "pms": ["Alpha", "Beta"], "net": "300K" } }',
    description: 'Real-time alerts when firm-wide concentration risk emerges across books.',
    color: '#22c55e',
  },
  {
    icon: Icons.chat,
    title: 'Natural Language Queries',
    code: 'riskcore.ask("Total tech exposure?")',
    output: '{ "sector": "Technology", "exposure": "$847.2M", "pct_aum": "23.4%" }',
    description: 'Ask questions in plain English. Get instant, accurate answers.',
    color: '#3b82f6',
  },
  {
    icon: Icons.correlation,
    title: 'Cross-PM Correlation',
    code: 'riskcore.correlation_matrix(pms)',
    output: '{ "Alpha-Beta": 0.72, "Alpha-Gamma": 0.15, "Beta-Gamma": 0.23 }',
    description: 'Reveals hidden risk relationships between strategies.',
    color: '#a855f7',
  },
]

function CapabilitiesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #131c2e 0%, #0a0f1a 100%)' }}>
      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-8 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-emerald-400 text-sm font-semibold">API.capabilities</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Three Capabilities{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              No One Else Has
            </span>
          </h2>
        </motion.div>

        {/* Capability Cards with Code */}
        <div className="space-y-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
              className="p-8 rounded-2xl bg-slate-900/40 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Info */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${cap.color}15`, color: cap.color }}
                    >
                      {cap.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{cap.title}</h3>
                  </div>
                  <p className="text-slate-400">{cap.description}</p>
                </div>

                {/* Code Block */}
                <div className="lg:w-2/3 space-y-3">
                  <div className="p-4 rounded-lg bg-slate-950/80 border border-white/[0.06] font-mono text-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-3 h-3 rounded-full bg-red-500/50" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/50" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <code className="text-slate-300">
                      <span className="text-slate-500">{'> '}</span>
                      <span style={{ color: cap.color }}>{cap.code}</span>
                    </code>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-500/[0.05] border border-emerald-500/10 font-mono text-sm">
                    <code className="text-emerald-400 text-xs break-all">{cap.output}</code>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-20"
        >
          <div className="inline-block p-10 rounded-2xl bg-gradient-to-br from-emerald-500/[0.08] to-blue-500/[0.08] border border-emerald-500/20">
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2 font-mono">
              <span className="text-slate-500">// </span>
              Don't replace. Aggregate.
            </p>
            <p className="text-slate-400 mb-8">Open source. Deploy in days. No vendor lock-in.</p>
            <a
              href="/#early-access"
              className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-lg transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
            >
              Book a Demo
              {Icons.arrow}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// MAIN EXPORT
// ==============================================

export default function WhyRiskcoreVariationG() {
  return (
    <div className="pt-20">
      <ProblemSection />
      <CostSection />
      <SolutionSection />
      <CapabilitiesSection />
    </div>
  )
}
