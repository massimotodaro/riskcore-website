'use client'

import { motion } from 'framer-motion'

const integrations = [
  { name: 'Bloomberg', color: '#f97316' },
  { name: 'Enfusion', color: '#22c55e' },
  { name: 'Eze Eclipse', color: '#a855f7' },
  { name: 'Axioma', color: '#22d3ee' },
  { name: 'Excel', color: '#3b82f6' },
]

export default function IntegrationLogos() {
  return (
    <section className="py-12 md:py-16 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-text-muted text-sm uppercase tracking-wider mb-6">
            Connects to your existing systems
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-center gap-2 px-4 py-2 bg-bg-secondary/40 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: integration.color }}
                />
                <span className="text-text-primary text-sm font-medium">
                  {integration.name}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="text-text-dim text-xs mt-6">
            CSV, REST API, FIX Protocol, and custom connectors available
          </p>
        </motion.div>
      </div>
    </section>
  )
}
