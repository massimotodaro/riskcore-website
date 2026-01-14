'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'

// Animated number counter
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-mono"
    >
      {prefix}{value.toLocaleString()}{suffix}
    </motion.span>
  )
}

// Mock data for the dashboard
const portfolioManagers = [
  { name: 'Alpha Fund', exposure: 125000000, pnl: 2400000, pnlPercent: 1.92, var: 4200000 },
  { name: 'Beta Quant', exposure: 89000000, pnl: -890000, pnlPercent: -1.0, var: 2100000 },
  { name: 'Gamma Global', exposure: 156000000, pnl: 3120000, pnlPercent: 2.0, var: 5600000 },
  { name: 'Delta Macro', exposure: 72000000, pnl: 1440000, pnlPercent: 2.0, var: 1800000 },
]

const sectorExposures = [
  { sector: 'Technology', exposure: 85, color: '#3b82f6' },
  { sector: 'Healthcare', exposure: 45, color: '#22c55e' },
  { sector: 'Financials', exposure: 32, color: '#a855f7' },
  { sector: 'Energy', exposure: 28, color: '#eab308' },
  { sector: 'Consumer', exposure: 22, color: '#06b6d4' },
]

const alerts = [
  { type: 'warning', message: 'Semiconductor exposure at 12.4% (limit: 10%)' },
  { type: 'info', message: 'Correlation detected: Alpha Fund & Beta Quant' },
]

export default function DashboardPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-brand-green font-semibold text-sm uppercase tracking-wider mb-3">
            Riskboard Preview
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Your Firm-Wide View,
            <br />
            <span className="text-brand-green">In Real-Time</span>
          </h2>
          <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
            See aggregated risk across all portfolio managers at a glance.
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue/20 via-brand-green/20 to-brand-purple/20 rounded-3xl blur-2xl opacity-50" />

          {/* Dashboard container */}
          <div className="relative bg-bg-secondary/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            {/* Dashboard header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-text-dim text-sm font-mono">riskboard.riskcore.io</div>
              <div className="text-text-dim text-xs">Live • Updated 2s ago</div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 grid lg:grid-cols-3 gap-6">
              {/* Left column - Summary cards */}
              <div className="space-y-4">
                {/* Total Exposure card */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-text-dim text-xs uppercase tracking-wider mb-2">Firm-Wide Exposure</div>
                  <div className="text-2xl font-bold text-text-primary font-mono">
                    <AnimatedNumber value={442} prefix="$" suffix="M" />
                  </div>
                  <div className="flex items-center gap-1 text-brand-green text-sm mt-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>+2.3% from yesterday</span>
                  </div>
                </div>

                {/* VaR card */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-text-dim text-xs uppercase tracking-wider mb-2">Firm-Wide VaR (95%)</div>
                  <div className="text-2xl font-bold text-text-primary font-mono">
                    <AnimatedNumber value={13.7} prefix="$" suffix="M" />
                  </div>
                  <div className="text-text-muted text-sm mt-1">
                    3.1% of NAV
                  </div>
                </div>

                {/* Alerts */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-text-dim text-xs uppercase tracking-wider mb-3">Alerts</div>
                  <div className="space-y-2">
                    {alerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-2 p-2 rounded-lg ${
                          alert.type === 'warning'
                            ? 'bg-brand-yellow/10 text-brand-yellow'
                            : 'bg-brand-blue/10 text-brand-blue'
                        }`}
                      >
                        {alert.type === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        )}
                        <span className="text-xs">{alert.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle column - PM Table */}
              <div className="lg:col-span-1 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-text-dim text-xs uppercase tracking-wider mb-4">Portfolio Managers</div>
                <div className="space-y-3">
                  {portfolioManagers.map((pm) => (
                    <div
                      key={pm.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div>
                        <div className="text-text-primary text-sm font-medium">{pm.name}</div>
                        <div className="text-text-dim text-xs font-mono">
                          ${(pm.exposure / 1000000).toFixed(0)}M
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-sm font-mono font-medium ${
                            pm.pnlPercent >= 0 ? 'text-brand-green' : 'text-red-400'
                          }`}
                        >
                          {pm.pnlPercent >= 0 ? '+' : ''}
                          {pm.pnlPercent.toFixed(2)}%
                        </div>
                        <div className="text-text-dim text-xs font-mono">
                          {pm.pnlPercent >= 0 ? '+' : ''}${(pm.pnl / 1000000).toFixed(2)}M
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column - Sector exposure */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-text-dim text-xs uppercase tracking-wider mb-4">Sector Exposure ($M)</div>
                <div className="space-y-4">
                  {sectorExposures.map((sector) => (
                    <div key={sector.sector}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-text-secondary text-sm">{sector.sector}</span>
                        <span className="text-text-primary text-sm font-mono">${sector.exposure}M</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${(sector.exposure / 100) * 100}%` } : {}}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: sector.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
