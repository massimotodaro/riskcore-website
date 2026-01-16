'use client'

/**
 * Why RISKCORE - Variation B: Feature-First Showcase
 *
 * Structure:
 * 1. Hero - Bold claim about multi-manager-first approach
 * 2. Deep Dive Features - Each unique feature with visual demos
 * 3. The Alternative (Pain Points) - What life looks like without RISKCORE
 */

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

// ==============================================
// SECTION 1: HERO - MULTI-MANAGER FIRST
// ==============================================

function HeroSection() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0f1a, #151E31)' }}>
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Built for Multi-Manager From Day One
          </motion.span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-8 leading-tight">
            The Only Risk Platform
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              That Thinks Like a CRO
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto mb-12">
            Other platforms were built for single PMs and stretched to fit multi-manager.
            RISKCORE was architected from scratch for firm-wide visibility across multiple books.
          </p>

          {/* Key differentiator badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { icon: '🎯', label: 'Cross-PM Overlap Detection' },
              { icon: '💬', label: 'Natural Language Queries' },
              { icon: '📊', label: 'Cross-Book Correlation' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-5 py-3 bg-slate-800/60 border border-white/10 rounded-xl"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-slate-200 font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 2: DEEP DIVE FEATURES
// ==============================================

const features = [
  {
    id: 'overlap',
    badge: 'Industry First',
    title: 'Cross-PM Overlap Detection',
    headline: 'See what no one else can see',
    description: 'When PM Alpha buys 100K shares of AAPL and PM Beta already holds 200K, you need to know immediately. RISKCORE alerts you in real-time when firm-wide concentration risk emerges.',
    benefits: [
      'Real-time position overlap alerts',
      'Firm-wide concentration limits',
      'Automatic PM notification',
      'Historical overlap analysis',
    ],
    visual: 'overlap',
    color: 'emerald',
    gradient: 'from-emerald-400 to-green-500',
  },
  {
    id: 'nlp',
    badge: 'AI-Powered',
    title: 'Natural Language Queries',
    headline: 'Ask questions, get answers',
    description: '"What\'s our total tech exposure?" "Show me our largest positions across all books." "Which PMs have exposure to China?" Ask in plain English, get instant answers.',
    benefits: [
      'Claude AI integration',
      'No SQL knowledge required',
      'Instant query results',
      'Exportable reports',
    ],
    visual: 'chat',
    color: 'blue',
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'correlation',
    badge: 'Proprietary',
    title: 'Cross-PM Correlation Framework',
    headline: 'Hidden risks, revealed',
    description: 'Traditional tools analyze each PM in isolation. Our proprietary correlation engine reveals hidden risk relationships between strategies that other platforms miss entirely.',
    benefits: [
      'Strategy correlation analysis',
      'Factor decomposition',
      'Tail risk identification',
      'Scenario stress testing',
    ],
    visual: 'correlation',
    color: 'purple',
    gradient: 'from-purple-400 to-pink-500',
  },
]

function OverlapVisual() {
  return (
    <div className="bg-slate-900/80 rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-400 text-sm">Overlap Alert</span>
        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">LIVE</span>
      </div>
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg border border-emerald-500/20"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">AAPL</span>
            <span className="text-slate-400">PM Alpha + PM Beta</span>
          </div>
          <span className="text-emerald-400 font-bold">300K shares</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg border border-yellow-500/20"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">NVDA</span>
            <span className="text-slate-400">3 PMs overlapping</span>
          </div>
          <span className="text-yellow-400 font-bold">Near limit</span>
        </motion.div>
      </div>
    </div>
  )
}

function ChatVisual() {
  const [showResponse, setShowResponse] = useState(false)

  return (
    <div className="bg-slate-900/80 rounded-xl border border-white/10 p-6">
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onAnimationComplete={() => setTimeout(() => setShowResponse(true), 500)}
          className="flex justify-end"
        >
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
            <p className="text-slate-200">What's our total tech exposure across all books?</p>
          </div>
        </motion.div>
        {showResponse && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl rounded-tl-md px-4 py-3 max-w-[80%]">
              <p className="text-slate-200 mb-2">Total tech sector exposure: <span className="text-emerald-400 font-bold">$847.2M</span></p>
              <p className="text-slate-400 text-sm">Across 5 PMs, 23.4% of AUM</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function CorrelationVisual() {
  return (
    <div className="bg-slate-900/80 rounded-xl border border-white/10 p-6">
      <div className="text-center mb-4">
        <span className="text-slate-400 text-sm">Cross-PM Correlation Matrix</span>
      </div>
      <div className="grid grid-cols-4 gap-1 text-center text-xs">
        <div className="p-2"></div>
        <div className="p-2 text-slate-400">Alpha</div>
        <div className="p-2 text-slate-400">Beta</div>
        <div className="p-2 text-slate-400">Gamma</div>

        <div className="p-2 text-slate-400">Alpha</div>
        <div className="p-2 bg-emerald-500/40 rounded">1.00</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-2 bg-yellow-500/40 rounded"
        >0.72</motion.div>
        <div className="p-2 bg-slate-700/40 rounded">0.15</div>

        <div className="p-2 text-slate-400">Beta</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-2 bg-yellow-500/40 rounded"
        >0.72</motion.div>
        <div className="p-2 bg-emerald-500/40 rounded">1.00</div>
        <div className="p-2 bg-slate-700/40 rounded">0.23</div>

        <div className="p-2 text-slate-400">Gamma</div>
        <div className="p-2 bg-slate-700/40 rounded">0.15</div>
        <div className="p-2 bg-slate-700/40 rounded">0.23</div>
        <div className="p-2 bg-emerald-500/40 rounded">1.00</div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-yellow-400 text-xs text-center mt-3"
      >
        Alpha & Beta show high correlation - investigate
      </motion.p>
    </div>
  )
}

function FeatureDeepDive() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const visuals: Record<string, React.ReactNode> = {
    overlap: <OverlapVisual />,
    chat: <ChatVisual />,
    correlation: <CorrelationVisual />,
  }

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #151E31, #0f172a)' }}>
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            Three Capabilities
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"> No One Else Has</span>
          </h2>
        </motion.div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
              {/* Content */}
              <div className="flex-1">
                <span className={`inline-block px-3 py-1 bg-gradient-to-r ${feature.gradient} rounded-full text-white text-xs font-semibold mb-6`}>
                  {feature.badge}
                </span>

                <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
                  {feature.title}
                </h3>

                <p className={`text-xl font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mb-6`}>
                  {feature.headline}
                </p>

                <p className="text-lg text-slate-400 leading-relaxed mb-8">
                  {feature.description}
                </p>

                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className={`w-5 h-5 text-${feature.color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="flex-1 w-full max-w-md lg:max-w-none">
                {visuals[feature.visual]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==============================================
// SECTION 3: THE ALTERNATIVE (PAIN POINTS)
// ==============================================

function AlternativeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const alternatives = [
    {
      title: 'Without RISKCORE',
      icon: '😰',
      points: [
        '2-8 hours to answer simple risk questions',
        'Manual spreadsheet aggregation with 47+ errors',
        '$500K+ annual licensing for legacy platforms',
        'Months of implementation, years of lock-in',
      ],
      color: 'red',
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-500/5',
    },
    {
      title: 'With RISKCORE',
      icon: '😎',
      points: [
        'Instant answers via natural language',
        'Automated aggregation with real-time updates',
        'Open source with no licensing fees',
        'Deploy in days, leave whenever you want',
      ],
      color: 'emerald',
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-emerald-500/5',
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0f172a, #0a0f1a)' }}>
      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
            The Choice Is
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent"> Obvious</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {alternatives.map((alt, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
              className={`${alt.bgColor} border ${alt.borderColor} rounded-2xl p-8`}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">{alt.icon}</span>
                <h3 className="text-2xl font-bold text-slate-100">{alt.title}</h3>
              </div>

              <ul className="space-y-4">
                {alt.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {alt.color === 'red' ? (
                      <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <span className="text-slate-300">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="/#early-access"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
          >
            See RISKCORE in Action
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ==============================================
// MAIN PAGE COMPONENT
// ==============================================

export default function WhyRiskcoreVariationB() {
  return (
    <div className="pt-20">
      <HeroSection />
      <FeatureDeepDive />
      <AlternativeSection />
    </div>
  )
}
