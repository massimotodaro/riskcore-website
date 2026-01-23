'use client'

import { motion } from 'framer-motion'

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const XIcon = () => (
  <svg className="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// Pricing Cards Data
const pricingTiers = [
  {
    name: 'Free',
    description: 'For individual PMs exploring risk analytics',
    price: '$0',
    period: '/forever',
    priceNote: 'Personal email required',
    cta: 'Start Free',
    ctaStyle: 'secondary',
    features: [
      { text: '1 user (personal email only)', included: true },
      { text: 'Single PM / portfolio', included: true },
      { text: 'CSV, Excel, Google Sheets import', included: true },
      { text: 'Basic VaR & exposures', included: true },
      { text: 'AI Chat', highlight: '(BYOK)', included: true },
      { text: '200 positions max', included: true },
      { text: '30 days data retention', included: true },
      { text: 'Multi-PM aggregation', included: false },
      { text: 'API access', included: false },
    ],
  },
  {
    name: 'Pro',
    description: 'For teams needing multi-PM risk aggregation',
    price: '$500',
    period: '/month',
    priceNote: 'Up to 10 users',
    cta: 'Start 14-Day Trial',
    ctaStyle: 'primary',
    badge: 'Most Popular',
    badgeColor: 'blue',
    featured: true,
    features: [
      { text: 'Up to 10 users', included: true, highlight: true },
      { text: 'Cloud or self-hosted deployment', included: true },
      { text: 'Multi-PM aggregation', included: true, highlight: true },
      { text: 'Correlation matrix & overlap detection', included: true },
      { text: 'Full Greeks (Delta, Gamma, Vega, Theta)', included: true },
      { text: 'API & FIX Protocol access', included: true },
      { text: 'MFA (two-factor authentication)', included: true },
      { text: 'AI Chat included', included: true },
      { text: '1 year data retention', included: true },
    ],
  },
  {
    name: 'Enterprise',
    description: 'For institutions requiring on-premises deployment',
    price: 'Custom',
    priceNote: 'Starting at $10,000/month',
    cta: 'Contact Sales',
    ctaStyle: 'enterprise',
    badge: 'Air-Gapped',
    badgeColor: 'green',
    enterprise: true,
    features: [
      { text: 'Unlimited users', included: true, premium: true },
      { text: '100% on-premises deployment', included: true, premium: true },
      { text: 'Air-gapped network support', included: true, premium: true },
      { text: 'Local LLM (Gemma 3 4B)', included: true, premium: true },
      { text: 'Controlled Bridge updates', included: true, premium: true },
      { text: 'SSO / SAML integration', included: true },
      { text: '24/7 dedicated support', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Zero-trust architecture', included: true },
    ],
  },
]

// Comparison Table Data
const comparisonCategories = [
  {
    name: 'Users & Access',
    features: [
      { name: 'Users included', free: '1 (personal email)', pro: 'Up to 15', enterprise: 'Unlimited', proHighlight: true, enterprisePremium: true },
      { name: 'Additional users', subtext: 'Per user/month', free: '-', pro: '$50/user', enterprise: 'Included' },
      { name: 'Portfolios / PMs', free: '1', pro: 'Unlimited', enterprise: 'Unlimited', proHighlight: true, enterprisePremium: true },
      { name: 'Email requirements', free: 'Personal only', pro: 'Any', enterprise: 'Any' },
    ],
  },
  {
    name: 'Deployment & Security',
    features: [
      { name: 'Deployment model', subtext: 'Where your data lives', free: 'Cloud only', pro: 'Cloud or Self-hosted', enterprise: 'On-premises only', proHighlight: true, enterprisePremium: true },
      { name: 'Air-gapped support', subtext: 'No internet required', free: 'x', pro: 'x', enterprise: 'check' },
      { name: 'Controlled Bridge', subtext: 'Secure update mechanism for air-gapped networks', free: 'x', pro: 'x', enterprise: 'check' },
      { name: 'MFA (2FA)', free: 'x', pro: 'check', enterprise: 'check' },
      { name: 'SSO / SAML', free: 'x', pro: 'x', enterprise: 'check' },
    ],
  },
  {
    name: 'Data Ingestion',
    features: [
      { name: 'CSV / Excel upload', free: 'check', pro: 'check', enterprise: 'check' },
      { name: 'Google Sheets', free: 'check', pro: 'check', enterprise: 'check' },
      { name: 'REST API', free: 'x', pro: '100 req/min', enterprise: '1,000 req/min', enterprisePremium: true },
      { name: 'FIX Protocol', free: 'x', pro: 'check', enterprise: 'check' },
      { name: 'Custom integrations', free: 'x', pro: 'x', enterprise: 'check' },
    ],
  },
  {
    name: 'Risk Analytics',
    features: [
      { name: 'Positions limit', free: '200', pro: '10,000', enterprise: 'Unlimited', proHighlight: true, enterprisePremium: true },
      { name: 'VaR / CVaR', free: 'Basic VaR', pro: 'Full suite', enterprise: 'Full suite', proHighlight: true, enterprisePremium: true },
      { name: 'Greeks', free: 'x', pro: 'Delta, Gamma, Vega, Theta', enterprise: 'All + Custom', proHighlight: true, enterprisePremium: true },
      { name: 'Correlation matrix', free: 'x', pro: 'check', enterprise: 'check' },
      { name: 'Multi-PM aggregation', subtext: 'Firm-wide risk view across all PMs', free: 'x', pro: 'check', enterprise: 'check' },
      { name: 'Overlap detection', free: 'x', pro: 'check', enterprise: 'check' },
      { name: 'Stress testing', free: 'x', pro: 'check', enterprise: 'check' },
    ],
  },
  {
    name: 'AI & Reporting',
    features: [
      { name: 'AI Chat', subtext: 'Natural language risk queries', free: 'BYOK (your API key)', pro: 'Included (Claude)', enterprise: 'Local LLM (Gemma 3)', proHighlight: true, enterprisePremium: true },
      { name: 'Dashboard', free: 'check', pro: 'check', enterprise: 'check' },
      { name: 'PDF/Excel export', free: 'x', pro: 'check', enterprise: 'check' },
      { name: 'Custom reports', free: 'x', pro: 'x', enterprise: 'check' },
      { name: 'Branding', free: '"Powered by RISKCORE"', pro: 'White-label', enterprise: 'Full customization', proHighlight: true, enterprisePremium: true },
    ],
  },
  {
    name: 'Support & Data',
    features: [
      { name: 'Data retention', free: '30 days', pro: '1 year', enterprise: '5 years', proHighlight: true, enterprisePremium: true },
      { name: 'Support', free: 'Community', pro: 'Email (48h)', enterprise: '24/7 dedicated', proHighlight: true, enterprisePremium: true },
      { name: 'SLA', free: 'x', pro: '99.5% uptime', enterprise: '99.9% uptime', enterprisePremium: true },
      { name: 'Onboarding', free: 'Self-service', pro: 'Self-service', enterprise: 'Dedicated team', enterprisePremium: true },
    ],
  },
]

function PricingCard({ tier, index }: { tier: typeof pricingTiers[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative bg-bg-secondary/90 backdrop-blur-xl border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
        tier.featured
          ? 'border-blue-500/50 bg-gradient-to-b from-blue-500/10 to-bg-secondary/90'
          : tier.enterprise
          ? 'border-green-500/50 bg-gradient-to-b from-green-500/10 to-bg-secondary/90'
          : 'border-white/10 hover:border-blue-500/30'
      }`}
    >
      {tier.badge && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide text-white ${
            tier.badgeColor === 'blue' ? 'bg-blue-500' : 'bg-green-500'
          }`}
        >
          {tier.badge}
        </span>
      )}

      <h3 className="text-2xl font-bold text-text-primary font-['Space_Grotesk'] mb-2">{tier.name}</h3>
      <p className="text-text-muted text-sm mb-6 min-h-[40px]">{tier.description}</p>

      <div className="mb-6">
        <span className="text-5xl font-bold text-text-primary font-['Space_Grotesk']">{tier.price}</span>
        {tier.period && <span className="text-text-dim text-lg">{tier.period}</span>}
        {tier.priceNote && <p className="text-text-muted text-sm mt-1">{tier.priceNote}</p>}
      </div>

      <a
        href="#cta"
        className={`block w-full py-3.5 px-6 rounded-lg font-semibold text-center transition-all duration-200 mb-8 ${
          tier.ctaStyle === 'primary'
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : tier.ctaStyle === 'enterprise'
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-transparent border border-white/20 hover:border-white/40 text-text-primary'
        }`}
      >
        {tier.cta}
      </a>

      <ul className="space-y-0">
        {tier.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0"
          >
            {feature.included ? <CheckIcon /> : <XIcon />}
            <span className={feature.included ? 'text-text-secondary' : 'text-text-dim'}>
              {'highlight' in feature && typeof feature.highlight === 'string' ? (
                <>
                  {feature.text.split(feature.highlight)[0]}
                  <span className="text-blue-400 font-medium">{feature.highlight}</span>
                  {feature.text.split(feature.highlight)[1]}
                </>
              ) : 'premium' in feature && feature.premium ? (
                <span className="text-green-400 font-medium">{feature.text}</span>
              ) : 'highlight' in feature && feature.highlight === true ? (
                <span className="text-blue-400 font-medium">{feature.text}</span>
              ) : (
                feature.text
              )}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function ComparisonTable() {
  const renderValue = (value: string, isHighlight?: boolean, isPremium?: boolean) => {
    if (value === 'check') {
      return <CheckIcon />
    }
    if (value === 'x') {
      return <XIcon />
    }
    if (isPremium) {
      return <span className="text-green-400 font-medium">{value}</span>
    }
    if (isHighlight) {
      return <span className="text-blue-400 font-medium">{value}</span>
    }
    return <span className="text-text-muted">{value}</span>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16"
    >
      <h3 className="text-3xl font-bold text-text-primary font-['Space_Grotesk'] text-center mb-8">
        Detailed Feature Comparison
      </h3>

      <div className="bg-bg-secondary/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-bg-primary/50">
                <th className="text-left py-4 px-5 font-semibold text-text-primary font-['Space_Grotesk']">Feature</th>
                <th className="text-center py-4 px-5 font-semibold text-text-primary font-['Space_Grotesk'] min-w-[150px]">Free</th>
                <th className="text-center py-4 px-5 font-semibold text-text-primary font-['Space_Grotesk'] min-w-[150px]">Pro</th>
                <th className="text-center py-4 px-5 font-semibold text-text-primary font-['Space_Grotesk'] min-w-[150px]">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonCategories.map((category) => (
                <>
                  <tr key={category.name} className="bg-bg-primary/80">
                    <td
                      colSpan={4}
                      className="py-3 px-5 font-semibold text-sm uppercase tracking-wide text-blue-400 font-['Space_Grotesk']"
                    >
                      {category.name}
                    </td>
                  </tr>
                  {category.features.map((feature, i) => (
                    <tr key={`${category.name}-${i}`} className="border-b border-white/5 hover:bg-blue-500/5 transition-colors">
                      <td className="py-4 px-5">
                        <span className="text-text-secondary">{feature.name}</span>
                        {'subtext' in feature && feature.subtext && (
                          <span className="block text-text-dim text-xs mt-0.5">{feature.subtext}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-5">{renderValue(feature.free)}</td>
                      <td className="text-center py-4 px-5">{renderValue(feature.pro, 'proHighlight' in feature ? feature.proHighlight : false)}</td>
                      <td className="text-center py-4 px-5">{renderValue(feature.enterprise, false, 'enterprisePremium' in feature ? feature.enterprisePremium : false)}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

function SecurityCallout() {
  const securityFeatures = [
    { icon: 'shield', text: 'Zero-trust architecture' },
    { icon: 'lock', text: 'End-to-end encryption' },
    { icon: 'terminal', text: 'Local LLM (no cloud AI)' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8 text-center"
    >
      <h3 className="text-2xl font-bold text-green-400 font-['Space_Grotesk'] mb-4">
        Enterprise-Grade Security for Air-Gapped Networks
      </h3>
      <p className="text-text-muted max-w-3xl mx-auto mb-6">
        RISKCORE Enterprise is designed for institutions that cannot connect their trading systems to the internet.
        Our <strong className="text-text-primary">Controlled Bridge</strong> architecture enables secure updates through a verified, offline process —
        your position data never leaves your network.
      </p>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {securityFeatures.map((feature) => (
          <div key={feature.text} className="flex items-center gap-2 text-text-secondary">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {feature.icon === 'shield' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              )}
              {feature.icon === 'lock' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              )}
              {feature.icon === 'clipboard' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              )}
              {feature.icon === 'terminal' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              )}
            </svg>
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function PricingTable() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4 bg-gradient-to-r from-text-primary to-text-muted bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-text-muted text-xl max-w-2xl mx-auto">
            Start free, scale as you grow. All tiers include core risk aggregation.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} index={index} />
          ))}
        </div>

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Security Callout */}
        <SecurityCallout />
      </div>
    </section>
  )
}
