'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Section, SectionHeader } from '@/components/shared'

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Read-Only Overlay',
    description: 'RISKCORE never touches your PM systems. It just reads data and aggregates. Zero disruption.',
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
    borderColor: 'border-brand-blue/30',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    title: 'Universal Data Ingestion',
    description: 'CSV, API, FIX, Bloomberg, Excel—we ingest anything. Your PMs keep their tools.',
    color: 'text-brand-green',
    bgColor: 'bg-brand-green/10',
    borderColor: 'border-brand-green/30',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Real-Time Aggregation',
    description: 'See firm-wide risk as markets move. No more waiting for overnight batch jobs.',
    color: 'text-brand-cyan',
    bgColor: 'bg-brand-cyan/10',
    borderColor: 'border-brand-cyan/30',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Open Source',
    description: 'Audit the code. Extend it. No vendor lock-in. Your risk infrastructure, your rules.',
    color: 'text-brand-purple',
    bgColor: 'bg-brand-purple/10',
    borderColor: 'border-brand-purple/30',
  },
]

export default function Solution() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section className="bg-gradient-to-b from-bg-secondary/50 to-bg-primary">
      <SectionHeader
        subtitle="The Solution"
        title="Don't Replace. Aggregate."
        description="RISKCORE sits on top of your existing systems. It doesn't replace anything—it unifies everything."
      />

      {/* Key Message */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mb-16"
      >
        <div className="bg-gradient-to-r from-brand-green/10 to-brand-blue/10 border border-brand-green/30 rounded-2xl p-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-4">
            &ldquo;Let PMs use their tools.<br />
            <span className="gradient-text">Give management unified visibility.&rdquo;</span>
          </blockquote>
          <p className="text-text-muted">
            The best risk system is the one that doesn&apos;t require anyone to change their workflow.
          </p>
        </div>
      </motion.div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            className={`bg-bg-secondary/60 backdrop-blur-sm border ${benefit.borderColor} rounded-xl p-6 hover:bg-bg-secondary/80 transition-all duration-300 group`}
          >
            <div className="flex items-start gap-4">
              <div className={`${benefit.bgColor} ${benefit.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-heading font-bold text-text-primary text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visual: Clean flow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-16 max-w-4xl mx-auto"
      >
        <div className="bg-bg-secondary/40 border border-white/10 rounded-2xl p-8">
          <p className="text-center text-text-muted text-sm uppercase tracking-wider mb-6">
            With RISKCORE
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {['Bloomberg', 'Axioma', 'Excel', 'Python', 'Proprietary'].map((system) => (
              <div
                key={system}
                className="px-4 py-2 bg-bg-tertiary/50 border border-white/10 rounded-lg text-text-secondary text-sm"
              >
                {system}
              </div>
            ))}
          </div>
          <div className="flex justify-center my-6">
            <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-green/20 to-brand-blue/20 border border-brand-green/40 rounded-xl">
              <span className="text-2xl">📊</span>
              <div className="text-left">
                <span className="block text-brand-green font-bold text-lg">RISKCORE</span>
                <span className="text-text-muted text-sm">Real-time, Unified, Accurate</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
