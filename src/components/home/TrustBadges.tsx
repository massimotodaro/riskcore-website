'use client'

import { motion } from 'framer-motion'
import { Shield, Code, Zap, Lock, Globe, Users } from 'lucide-react'

const badges = [
  {
    icon: Code,
    label: 'Open Source',
    description: 'MIT Licensed',
    color: 'brand-green',
  },
  {
    icon: Shield,
    label: 'Enterprise Ready',
    description: 'SOC2 Compatible',
    color: 'brand-blue',
  },
  {
    icon: Lock,
    label: 'Read-Only',
    description: 'No Trading Risk',
    color: 'brand-purple',
  },
  {
    icon: Zap,
    label: 'Real-Time',
    description: 'Live Updates',
    color: 'brand-cyan',
  },
  {
    icon: Globe,
    label: 'Universal',
    description: 'Any Data Source',
    color: 'brand-yellow',
  },
  {
    icon: Users,
    label: 'Multi-PM',
    description: 'Unlimited Managers',
    color: 'brand-orange',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function TrustBadges() {
  return (
    <section className="py-16 border-y border-white/10 bg-bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.label}
              variants={itemVariants}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-${badge.color}/10 flex items-center justify-center mb-3`}
              >
                <badge.icon className={`w-6 h-6 text-${badge.color}`} />
              </div>
              <h3 className="font-heading font-semibold text-text-primary text-sm mb-1">
                {badge.label}
              </h3>
              <p className="text-text-dim text-xs">{badge.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
