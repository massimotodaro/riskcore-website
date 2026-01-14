'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Section, SectionHeader } from '@/components/shared'

const tiers = [
  {
    name: 'Free',
    price: '$0',
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
    color: 'border-white/10',
  },
  {
    name: 'Pro',
    price: '$500',
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
    price: 'Custom',
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
    color: 'border-brand-purple/30',
  },
]

export default function PricingCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section className="bg-gradient-to-b from-bg-secondary/30 to-bg-primary">
      <SectionHeader
        subtitle="Pricing"
        title="Simple, Transparent Pricing"
        description="Start free, scale as you grow. No hidden fees. Cancel anytime."
      />

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
            className={`relative bg-bg-secondary/60 backdrop-blur-sm border-2 ${tier.color} rounded-2xl p-8 flex flex-col ${
              tier.popular ? 'md:-mt-4 md:mb-4 shadow-xl shadow-brand-green/10' : ''
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
              <h3 className="font-heading font-bold text-text-primary text-xl mb-2">
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-text-primary">{tier.price}</span>
                <span className="text-text-muted text-sm">/{tier.period}</span>
              </div>
              <p className="text-text-muted text-sm mt-3">{tier.description}</p>
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
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={tier.ctaLink}
              className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 ${
                tier.popular
                  ? 'bg-brand-green text-white hover:bg-brand-green/90 hover:shadow-lg hover:shadow-brand-green/20'
                  : 'bg-white/5 border border-white/20 text-text-primary hover:bg-white/10 hover:border-white/30'
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
