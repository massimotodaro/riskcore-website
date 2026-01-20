'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Section, SectionHeader } from '@/components/shared'

const categories = [
  {
    name: 'Users & Access',
    features: [
      { name: 'Users included', free: '1', pro: 'Up to 10', enterprise: 'Unlimited' },
      { name: 'Additional users', free: '—', pro: '$50/user/mo', enterprise: 'Included' },
      { name: 'Role-based access', free: false, pro: true, enterprise: true },
      { name: 'SSO/SAML', free: false, pro: false, enterprise: true },
    ],
  },
  {
    name: 'Data Sources',
    features: [
      { name: 'CSV/Excel import', free: true, pro: true, enterprise: true },
      { name: 'REST API', free: false, pro: true, enterprise: true },
      { name: 'FIX Protocol', free: false, pro: true, enterprise: true },
      { name: 'Bloomberg', free: false, pro: 'Add-on', enterprise: true },
      { name: 'Custom connectors', free: false, pro: false, enterprise: true },
    ],
  },
  {
    name: 'Risk Analytics',
    features: [
      { name: 'Position aggregation', free: true, pro: true, enterprise: true },
      { name: 'Basic Greeks', free: true, pro: true, enterprise: true },
      { name: 'VaR calculations', free: false, pro: true, enterprise: true },
      { name: 'Factor exposures', free: false, pro: true, enterprise: true },
      { name: 'Stress testing', free: false, pro: true, enterprise: true },
      { name: 'Correlation framework', free: false, pro: false, enterprise: true },
    ],
  },
  {
    name: 'AI Capabilities',
    features: [
      { name: 'Natural language queries', free: '10/day', pro: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'Custom AI models', free: false, pro: false, enterprise: true },
      { name: 'Alert triggers', free: false, pro: true, enterprise: true },
    ],
  },
  {
    name: 'Deployment',
    features: [
      { name: 'Cloud hosted', free: false, pro: true, enterprise: true },
      { name: 'Self-hosted', free: true, pro: true, enterprise: true },
      { name: 'On-premise', free: false, pro: false, enterprise: true },
    ],
  },
  {
    name: 'Support',
    features: [
      { name: 'Community forum', free: true, pro: true, enterprise: true },
      { name: 'Email support', free: false, pro: true, enterprise: true },
      { name: 'Dedicated CSM', free: false, pro: false, enterprise: true },
      { name: 'SLA guarantee', free: false, pro: false, enterprise: true },
    ],
  },
]

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <svg className="w-5 h-5 text-brand-green mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg className="w-5 h-5 text-slate-300 dark:text-slate-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  }
  return <span className="text-slate-700 dark:text-slate-300 text-sm">{value}</span>
}

export default function ComparisonMatrix() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section className="bg-transparent">
      <SectionHeader
        subtitle="Compare Plans"
        title="Detailed Feature Comparison"
        description="See exactly what&apos;s included in each plan."
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto overflow-x-auto"
      >
        <div className="bg-white dark:bg-slate-800/40 rounded-2xl border border-black/5 dark:border-white/10 shadow-lg dark:shadow-none overflow-hidden">
          <table className="w-full">
            {/* Header */}
            <thead>
              <tr className="border-b border-black/5 dark:border-white/10">
                <th className="text-left py-4 px-4 font-normal text-slate-500 w-[200px]"></th>
                <th className="text-center py-4 px-4 w-[100px]">
                  <span className="font-heading font-bold text-slate-800 dark:text-slate-100">Free</span>
                </th>
                <th className="text-center py-4 px-4 w-[100px] bg-brand-green/10">
                  <span className="font-heading font-bold text-brand-green">Pro</span>
                </th>
                <th className="text-center py-4 px-4 w-[100px]">
                  <span className="font-heading font-bold text-purple-600 dark:text-purple-400">Enterprise</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category, catIndex) => (
                <>
                  {/* Category Header */}
                  <tr key={`cat-${catIndex}`} className="bg-slate-50 dark:bg-slate-800/60">
                    <td
                      colSpan={4}
                      className="py-3 px-4 font-heading font-semibold text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider"
                    >
                      {category.name}
                    </td>
                  </tr>

                  {/* Features */}
                  {category.features.map((feature, featureIndex) => (
                    <tr
                      key={`feature-${catIndex}-${featureIndex}`}
                      className="border-b border-black/5 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-sm">{feature.name}</td>
                      <td className="py-3 px-4 text-center">
                        <FeatureValue value={feature.free} />
                      </td>
                      <td className="py-3 px-4 text-center bg-brand-green/5">
                        <FeatureValue value={feature.pro} />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <FeatureValue value={feature.enterprise} />
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mt-12"
      >
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Not sure which plan is right for you?
        </p>
        <a
          href="/#cta"
          className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-cyan transition-colors font-semibold"
        >
          Talk to our team
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>
    </Section>
  )
}
