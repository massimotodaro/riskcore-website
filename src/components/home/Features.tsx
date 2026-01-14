'use client'

import { motion } from 'framer-motion'
import {
  Database,
  BarChart3,
  MessageSquare,
  Layers,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react'

const features = [
  {
    icon: Database,
    title: 'Universal Ingestion',
    description:
      'Connect any data source: CSV, FIX, API, Excel. No matter what systems your PMs use, RISKCORE can ingest their data.',
    color: 'brand-blue',
  },
  {
    icon: Layers,
    title: 'Unified Schema',
    description:
      'Normalize all positions to a common format. Compare apples to apples across Bloomberg, Axioma, and internal systems.',
    color: 'brand-purple',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Aggregation',
    description:
      'See firm-wide exposure in real-time. Answer "What\'s our semiconductor exposure?" in seconds, not hours.',
    color: 'brand-green',
  },
  {
    icon: TrendingUp,
    title: 'Correlation Framework',
    description:
      'Detect offsetting positions and hidden correlations across PMs. Find the risk your current tools miss.',
    color: 'brand-cyan',
  },
  {
    icon: MessageSquare,
    title: 'AI-Powered Queries',
    description:
      'Ask questions in plain English: "Show me all PMs with >5% tech exposure" and get instant answers.',
    color: 'brand-yellow',
  },
  {
    icon: FileSpreadsheet,
    title: 'Regulatory Reports',
    description:
      'Generate Form PF, 13F, and custom reports with one click. Stop the quarterly scramble.',
    color: 'brand-orange',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-brand-blue font-semibold text-sm uppercase tracking-wider mb-3">
            Capabilities
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Everything You Need for
            <br />
            <span className="text-brand-blue">Firm-Wide Risk</span>
          </h2>
          <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
            One platform to aggregate, normalize, and analyze risk across all your portfolio managers.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl bg-bg-secondary/50 border border-white/10 hover:border-brand-blue/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`w-7 h-7 text-${feature.color}`} />
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-text-primary text-xl mb-3">
                {feature.title}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-blue/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
