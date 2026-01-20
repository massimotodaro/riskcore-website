'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Section, SectionHeader } from '@/components/shared'

const tiers = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    period: 'forever',
    description: 'Perfect for exploring RISKCORE and small teams getting started.',
    features: [
      '1 user',
      'CSV data import only',
      'Basic risk metrics',
      '10 AI queries per day',
      'Community support',
      'Self-hosted only',
    ],
    cta: 'Get Started Free',
    ctaLink: '/#cta',
    popular: false,
    color: 'border-black/10 dark:border-white/10',
  },
  {
    name: 'Pro',
    monthlyPrice: 500,
    yearlyPrice: 400, // 20% off
    period: 'per month',
    description: 'For growing teams that need real-time data and advanced analytics.',
    features: [
      'Up to 10 users',
      'CSV, API, FIX protocol',
      'Advanced risk metrics',
      'Unlimited AI queries',
      'Email support',
      'Cloud or self-hosted',
      'MFA authentication',
    ],
    cta: 'Start Pro Trial',
    ctaLink: '/#cta',
    popular: true,
    color: 'border-brand-green/50',
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    yearlyPrice: null,
    period: 'contact us',
    description: 'For institutions requiring maximum flexibility and dedicated support.',
    features: [
      'Unlimited users',
      'All data sources + custom',
      'Full risk metrics suite',
      'Unlimited AI + custom models',
      'Dedicated support + SLA',
      'On-premise deployment',
      'SSO/SAML',
      'Correlation Framework',
    ],
    cta: 'Contact Sales',
    ctaLink: '/#cta',
    popular: false,
    color: 'border-black/10 dark:border-purple-500/30',
  },
]

export default function PricingCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isAnnual, setIsAnnual] = useState(true)

  const getPrice = (tier: typeof tiers[0]) => {
    if (tier.monthlyPrice === null) return 'Custom'
    if (tier.monthlyPrice === 0) return '$0'
    return isAnnual ? `$${tier.yearlyPrice}` : `$${tier.monthlyPrice}`
  }

  const getPeriod = (tier: typeof tiers[0]) => {
    if (tier.monthlyPrice === null) return 'contact us'
    if (tier.monthlyPrice === 0) return 'forever'
    return 'per month'
  }

  return (
    <Section className="bg-transparent">
      <SectionHeader
        subtitle="Pricing"
        title="Simple, Transparent Pricing"
        description="Start free, scale as you grow. No hidden fees. Cancel anytime."
      />

      {/* Billing Toggle with Discount Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-12"
      >
        {/* Discount Banner */}
        <motion.div
          className="mb-6 px-4 py-2 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 rounded-full"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
            🎉 Save 20% with annual billing
          </span>
        </motion.div>

        {/* Toggle */}
        <div className="flex items-center gap-4 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-full border border-black/5 dark:border-white/10">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              !isAnnual
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              isAnnual
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Annual
            <span className="text-xs px-2 py-0.5 bg-emerald-500 text-white rounded-full">-20%</span>
          </button>
        </div>
      </motion.div>

      <div
        ref={ref}
        className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {tiers.map((tier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + index * 0.15, duration: 0.5 }}
            className={`relative bg-white dark:bg-slate-800/60 backdrop-blur-sm border-2 ${tier.color} rounded-2xl p-8 flex flex-col shadow-lg dark:shadow-none ${
              tier.popular ? 'md:-mt-4 md:mb-4 shadow-xl shadow-brand-green/20' : ''
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-brand-green text-white text-sm font-semibold rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-heading font-bold text-slate-800 dark:text-slate-100 text-xl mb-2">
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">{getPrice(tier)}</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">/{getPeriod(tier)}</span>
              </div>
              {tier.monthlyPrice && tier.monthlyPrice > 0 && isAnnual && (
                <div className="mt-1">
                  <span className="text-slate-400 dark:text-slate-500 text-sm line-through">${tier.monthlyPrice}/mo</span>
                </div>
              )}
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">{tier.description}</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <svg
                    className={`w-5 h-5 flex-shrink-0 ${
                      tier.popular ? 'text-brand-green' : 'text-brand-blue'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={tier.ctaLink}
              className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 ${
                tier.popular
                  ? 'bg-brand-green text-white hover:bg-brand-green/90 hover:shadow-lg hover:shadow-brand-green/20'
                  : 'bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/20 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/30'
              }`}
            >
              {tier.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
