'use client'

/**
 * CapabilitiesStakeholder.tsx
 *
 * Capabilities Section Variant 3: "The Stakeholder View"
 *
 * Shows capabilities organized by role: CRO, CIO, PM, Compliance.
 * Same platform, different value props per persona. Interactive
 * tabs let visitors self-identify and see relevant benefits.
 *
 * Usage:
 *   <CapabilitiesStakeholder />
 *
 * Dependencies:
 *   npm install framer-motion
 */

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ==============================================
// TYPES
// ==============================================

interface Capability {
  title: string
  description: string
}

interface Stakeholder {
  id: string
  role: string
  title: string
  painPoint: string
  solution: string
  capabilities: Capability[]
  metrics: { label: string; value: string; subtext: string }[]
  icon: React.ReactNode
  color: string
}

// ==============================================
// STAKEHOLDER DATA
// ==============================================

const stakeholders: Stakeholder[] = [
  {
    id: 'cro',
    role: 'CRO',
    title: 'Chief Risk Officer',
    painPoint: 'You need firm-wide risk visibility but your PMs use different systems. Consolidating takes days.',
    solution: 'One dashboard with real-time aggregated risk across every PM, every book, every asset class.',
    capabilities: [
      { title: 'Firm-Wide VaR', description: 'Single VaR number across all books with full decomposition' },
      { title: 'Limit Monitoring', description: 'Set limits at any level — firm, fund, PM, strategy, book' },
      { title: 'Breach Alerts', description: 'Instant notifications when limits approach or breach' },
      { title: 'Stress Testing', description: 'Run scenarios across the entire firm in seconds' },
    ],
    metrics: [
      { label: 'Firm VaR', value: '$8.2M', subtext: '95% 1-day' },
      { label: 'Utilization', value: '68%', subtext: 'of limit' },
      { label: 'Breaches', value: '0', subtext: 'today' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    color: '#ef4444',
  },
  {
    id: 'cio',
    role: 'CIO',
    title: 'Chief Investment Officer',
    painPoint: 'Are your PMs crowding into the same trades? Is the fund truly diversified? You don\'t have visibility.',
    solution: 'See cross-PM overlaps, correlation clusters, and concentration risks that individual PM reports hide.',
    capabilities: [
      { title: 'Cross-PM Overlap', description: 'Detect when multiple PMs hold the same positions' },
      { title: 'Concentration Analysis', description: 'Spot hidden concentration by sector, region, factor' },
      { title: 'Correlation Matrix', description: 'Understand how PM returns move together' },
      { title: 'Attribution', description: 'Break down firm P&L by PM, strategy, and factor' },
    ],
    metrics: [
      { label: 'Overlap', value: '23%', subtext: 'of gross' },
      { label: 'Top 10', value: '34%', subtext: 'concentration' },
      { label: 'Avg Corr', value: '0.42', subtext: 'PM-to-PM' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M2 20h20" />
        <path d="M5 20V8l5 4 4-8 5 6v10" />
      </svg>
    ),
    color: '#3b82f6',
  },
  {
    id: 'pm',
    role: 'PM',
    title: 'Portfolio Manager',
    painPoint: 'You want to focus on alpha generation, not wrestling with risk reports and compliance requests.',
    solution: 'Your book, your way. See your risk in the context of the firm. One-click exports for compliance.',
    capabilities: [
      { title: 'Your Book View', description: 'Everything about your positions in one place' },
      { title: 'Greek Dashboard', description: 'Delta, Gamma, Vega, Theta — live and accurate' },
      { title: '0Hedge Calculator', description: 'Know exactly what to trade to flatten any exposure' },
      { title: 'One-Click Reports', description: 'Generate what compliance needs without the hassle' },
    ],
    metrics: [
      { label: 'Net Delta', value: '$42.5M', subtext: 'your book' },
      { label: 'VaR', value: '$2.1M', subtext: '95% 1-day' },
      { label: 'Positions', value: '342', subtext: 'active' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    color: '#22c55e',
  },
  {
    id: 'compliance',
    role: 'Compliance',
    title: 'Compliance & Operations',
    painPoint: 'Regulatory reports take weeks to compile. Audit questions require digging through archives.',
    solution: 'Form PF, 13F, and custom reports generated automatically. Full audit trail for any point in time.',
    capabilities: [
      { title: 'Form PF / 13F', description: 'Pre-built templates, one-click generation' },
      { title: 'Time Travel', description: 'See exactly what risk was at any historical moment' },
      { title: 'Audit Trail', description: 'Every change logged with who, what, when' },
      { title: 'Custom Reports', description: 'Build reports that match your specific needs' },
    ],
    metrics: [
      { label: 'Reports', value: '12', subtext: 'templates' },
      { label: 'History', value: '5 yrs', subtext: 'retention' },
      { label: 'Time', value: '< 1 min', subtext: 'to generate' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    color: '#a855f7',
  },
]

// ==============================================
// STAKEHOLDER TAB
// ==============================================

interface TabProps {
  stakeholder: Stakeholder
  isActive: boolean
  onClick: () => void
}

function StakeholderTab({ stakeholder, isActive, onClick }: TabProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
        isActive
          ? 'bg-slate-800 text-slate-100 border border-white/20'
          : 'bg-slate-900/50 text-slate-400 border border-white/5 hover:border-white/10 hover:text-slate-300'
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div style={{ color: isActive ? stakeholder.color : undefined }}>
        {stakeholder.icon}
      </div>
      <div className="text-left">
        <div className="font-bold">{stakeholder.role}</div>
        <div className="text-xs text-slate-500">{stakeholder.title}</div>
      </div>
    </motion.button>
  )
}

// ==============================================
// STAKEHOLDER CONTENT
// ==============================================

interface ContentProps {
  stakeholder: Stakeholder
}

function StakeholderContent({ stakeholder }: ContentProps) {
  return (
    <motion.div
      key={stakeholder.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="grid md:grid-cols-2 gap-8"
    >
      {/* Left: Problem + Solution + Capabilities */}
      <div>
        {/* Pain Point */}
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 mb-4">
          <div className="text-xs text-rose-400 uppercase tracking-wide font-semibold mb-2">Your Challenge</div>
          <p className="text-slate-300">{stakeholder.painPoint}</p>
        </div>

        {/* Solution */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
          <div className="text-xs text-emerald-400 uppercase tracking-wide font-semibold mb-2">RISKCORE Solution</div>
          <p className="text-slate-300">{stakeholder.solution}</p>
        </div>

        {/* Capabilities List */}
        <div className="space-y-3">
          {stakeholder.capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: `${stakeholder.color}20` }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3" style={{ color: stakeholder.color }}>
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-slate-100 text-sm">{cap.title}</div>
                <div className="text-sm text-slate-400">{cap.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: Metrics Dashboard Preview */}
      <div>
        <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div style={{ color: stakeholder.color }}>{stakeholder.icon}</div>
            <div>
              <div className="font-bold text-slate-100">{stakeholder.role} Dashboard</div>
              <div className="text-xs text-slate-500">Your personalized view</div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {stakeholder.metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="text-2xl font-bold font-mono" style={{ color: stakeholder.color }}>
                  {metric.value}
                </div>
                <div className="text-xs text-slate-400">{metric.label}</div>
                <div className="text-[10px] text-slate-500">{metric.subtext}</div>
              </motion.div>
            ))}
          </div>

          {/* Mini Preview */}
          <div className="bg-slate-900/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 uppercase">Quick Actions</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['View Details', 'Export Report', 'Set Alert', 'Time Travel'].map((action, i) => (
                <motion.button
                  key={action}
                  className="px-3 py-2 text-xs bg-slate-800/80 hover:bg-slate-700 border border-white/10 rounded-lg text-slate-300 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {action}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <motion.div
          className="mt-4 p-4 bg-slate-900/30 rounded-xl border border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-slate-400 italic">
            "Finally, I can see {stakeholder.role === 'CRO' ? 'firm-wide risk' : stakeholder.role === 'CIO' ? 'cross-PM dynamics' : stakeholder.role === 'PM' ? 'my book in context' : 'historical state'} without waiting days for someone to pull data."
          </p>
          <p className="text-xs text-slate-500 mt-2">— {stakeholder.title}, Multi-Manager Fund</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ==============================================
// MAIN COMPONENT
// ==============================================

export default function CapabilitiesStakeholder() {
  const [activeId, setActiveId] = useState('cro')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const activeStakeholder = stakeholders.find(s => s.id === activeId) || stakeholders[0]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #10182B, #151E31)' }}
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
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
            BUILT FOR YOUR ROLE
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            One Platform.{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Every Stakeholder.
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Whether you're managing risk, allocating capital, running a book, or handling compliance —
            RISKCORE adapts to how you work.
          </motion.p>
        </motion.div>

        {/* Stakeholder Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {stakeholders.map((stakeholder) => (
            <StakeholderTab
              key={stakeholder.id}
              stakeholder={stakeholder}
              isActive={activeId === stakeholder.id}
              onClick={() => setActiveId(stakeholder.id)}
            />
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <StakeholderContent key={activeId} stakeholder={activeStakeholder} />
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold text-sm rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Demo for Your Team
          </motion.button>
          <p className="text-slate-500 text-sm mt-4">
            See how RISKCORE works for your specific role and workflow.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
