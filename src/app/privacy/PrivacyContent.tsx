'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const lastUpdated = 'January 2025'

const sections = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'information-we-collect', title: '2. Information We Collect' },
  { id: 'how-we-use', title: '3. How We Use Your Information' },
  { id: 'legal-basis', title: '4. Legal Basis for Processing' },
  { id: 'data-sharing', title: '5. Data Sharing & Third Parties' },
  { id: 'international-transfers', title: '6. International Data Transfers' },
  { id: 'data-retention', title: '7. Data Retention' },
  { id: 'your-rights', title: '8. Your Rights' },
  { id: 'cookies', title: '9. Cookies' },
  { id: 'children', title: '10. Children\'s Privacy' },
  { id: 'changes', title: '11. Changes to This Policy' },
  { id: 'contact', title: '12. Contact Us' },
]

export default function PrivacyContent() {
  return (
    <div className="pt-20 min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="py-16 md:py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Privacy Policy
            </h1>
            <p className="text-text-muted text-lg">
              Last updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Table of Contents - Sticky Sidebar */}
            <motion.aside
              className="lg:w-64 flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="lg:sticky lg:top-24">
                <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
                  Contents
                </h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm text-text-muted hover:text-brand-blue transition-colors"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              className="flex-1 max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Introduction */}
              <section id="introduction" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">1. Introduction</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  RISKCORE Ltd. (&quot;RISKCORE&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company registered in England and Wales,
                  is committed to protecting your privacy and ensuring the security of your personal data.
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                  website at <Link href="https://riskcore.io" className="text-brand-blue hover:underline">riskcore.io</Link> and
                  use our risk aggregation platform services.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  By using our services, you agree to the collection and use of information in accordance with this policy.
                  If you do not agree with the terms of this Privacy Policy, please do not access our services.
                </p>
              </section>

              {/* Information We Collect */}
              <section id="information-we-collect" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">2. Information We Collect</h2>

                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">2.1 Personal Data</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We may collect personally identifiable information that you voluntarily provide to us, including:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li>Name and job title</li>
                  <li>Email address</li>
                  <li>Company name and business contact information</li>
                  <li>Account credentials (username and password)</li>
                  <li>Billing information and payment details (processed securely by our payment providers)</li>
                </ul>

                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">2.2 Usage Data</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We automatically collect certain information when you visit our website, including:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Click patterns and navigation paths</li>
                </ul>

                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">2.3 Platform Data</h3>
                <p className="text-text-secondary leading-relaxed">
                  When you use our risk aggregation platform, you may upload or connect data sources containing financial
                  and risk data. We process this data solely to provide you with our services and do not use it for any
                  other purpose. Your uploaded data remains your property.
                </p>
              </section>

              {/* How We Use Your Information */}
              <section id="how-we-use" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">3. How We Use Your Information</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2">
                  <li><strong className="text-text-primary">Service Delivery:</strong> To provide, operate, and maintain our risk aggregation platform</li>
                  <li><strong className="text-text-primary">Account Management:</strong> To create and manage your user account</li>
                  <li><strong className="text-text-primary">Communication:</strong> To send you service updates, security alerts, and support messages</li>
                  <li><strong className="text-text-primary">Marketing:</strong> To send newsletters and promotional content (with your consent)</li>
                  <li><strong className="text-text-primary">Analytics:</strong> To understand how our services are used and improve user experience</li>
                  <li><strong className="text-text-primary">Security:</strong> To detect, prevent, and address technical issues and fraudulent activity</li>
                  <li><strong className="text-text-primary">Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                </ul>
              </section>

              {/* Legal Basis for Processing */}
              <section id="legal-basis" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">4. Legal Basis for Processing</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Under the UK General Data Protection Regulation (UK GDPR), we process your personal data based on
                  the following legal grounds:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-3">
                  <li>
                    <strong className="text-text-primary">Contract Performance:</strong> Processing necessary to provide our services to you and
                    fulfil our contractual obligations
                  </li>
                  <li>
                    <strong className="text-text-primary">Legitimate Interests:</strong> Processing necessary for our legitimate business interests,
                    such as improving our services, provided these interests do not override your rights
                  </li>
                  <li>
                    <strong className="text-text-primary">Consent:</strong> Where you have given explicit consent for specific processing activities,
                    such as receiving marketing communications
                  </li>
                  <li>
                    <strong className="text-text-primary">Legal Obligation:</strong> Processing necessary to comply with our legal obligations under
                    applicable laws and regulations
                  </li>
                </ul>
              </section>

              {/* Data Sharing & Third Parties */}
              <section id="data-sharing" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">5. Data Sharing & Third Parties</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We work with trusted third-party service providers to operate our business. We only share
                  the minimum data necessary for them to perform their services:
                </p>

                <div className="bg-bg-secondary/50 rounded-lg p-6 mb-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Service Providers</h3>
                  <ul className="space-y-3 text-text-secondary">
                    <li>
                      <strong className="text-text-primary">Supabase</strong> — Database and authentication services (data storage)
                    </li>
                    <li>
                      <strong className="text-text-primary">Vercel</strong> — Website hosting and deployment
                    </li>
                    <li>
                      <strong className="text-text-primary">Google Analytics</strong> — Website analytics and usage tracking
                    </li>
                    <li>
                      <strong className="text-text-primary">Tawk.to</strong> — Live chat support widget
                    </li>
                    <li>
                      <strong className="text-text-primary">MailerLite</strong> — Email newsletter and marketing communications
                    </li>
                    <li>
                      <strong className="text-text-primary">Resend</strong> — Transactional email delivery
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
                  We may disclose your information if required by law or to protect our rights and safety.
                </p>
              </section>

              {/* International Data Transfers */}
              <section id="international-transfers" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">6. International Data Transfers</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Some of our third-party service providers are located outside the United Kingdom. When we transfer
                  your personal data internationally, we ensure appropriate safeguards are in place, including:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2">
                  <li>Standard Contractual Clauses approved by the UK Information Commissioner&apos;s Office (ICO)</li>
                  <li>Transfers to countries deemed adequate by the UK government</li>
                  <li>Binding Corporate Rules where applicable</li>
                </ul>
              </section>

              {/* Data Retention */}
              <section id="data-retention" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">7. Data Retention</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We retain your personal data only for as long as necessary to fulfil the purposes for which it was
                  collected:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2">
                  <li><strong className="text-text-primary">Account Data:</strong> Retained while your account is active and for 2 years after account closure</li>
                  <li><strong className="text-text-primary">Platform Data:</strong> Deleted within 30 days of account termination or upon your request</li>
                  <li><strong className="text-text-primary">Analytics Data:</strong> Retained for 26 months</li>
                  <li><strong className="text-text-primary">Chat Logs:</strong> Retained for 12 months</li>
                  <li><strong className="text-text-primary">Marketing Data:</strong> Retained until you unsubscribe or withdraw consent</li>
                </ul>
              </section>

              {/* Your Rights */}
              <section id="your-rights" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">8. Your Rights</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Under the UK GDPR, you have the following rights regarding your personal data:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-3">
                  <li>
                    <strong className="text-text-primary">Right of Access:</strong> Request a copy of the personal data we hold about you
                  </li>
                  <li>
                    <strong className="text-text-primary">Right to Rectification:</strong> Request correction of inaccurate or incomplete data
                  </li>
                  <li>
                    <strong className="text-text-primary">Right to Erasure:</strong> Request deletion of your personal data (&quot;right to be forgotten&quot;)
                  </li>
                  <li>
                    <strong className="text-text-primary">Right to Restriction:</strong> Request restriction of processing in certain circumstances
                  </li>
                  <li>
                    <strong className="text-text-primary">Right to Data Portability:</strong> Receive your data in a structured, machine-readable format
                  </li>
                  <li>
                    <strong className="text-text-primary">Right to Object:</strong> Object to processing based on legitimate interests or for marketing
                  </li>
                  <li>
                    <strong className="text-text-primary">Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent
                  </li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-4">
                  To exercise any of these rights, please contact us at{' '}
                  <a href="mailto:hello@riskcore.io" className="text-brand-blue hover:underline">hello@riskcore.io</a>.
                  We will respond to your request within 30 days. You also have the right to lodge a complaint with the
                  UK Information Commissioner&apos;s Office (ICO).
                </p>
              </section>

              {/* Cookies */}
              <section id="cookies" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">9. Cookies</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li><strong className="text-text-primary">Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong className="text-text-primary">Analytics Cookies:</strong> Help us understand how visitors use our website (Google Analytics)</li>
                  <li><strong className="text-text-primary">Functional Cookies:</strong> Remember your preferences such as theme settings</li>
                  <li><strong className="text-text-primary">Chat Cookies:</strong> Enable our live chat support functionality (Tawk.to)</li>
                </ul>
                <p className="text-text-secondary leading-relaxed">
                  You can control cookies through your browser settings. However, disabling certain cookies may
                  affect the functionality of our website.
                </p>
              </section>

              {/* Children's Privacy */}
              <section id="children" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">10. Children&apos;s Privacy</h2>
                <p className="text-text-secondary leading-relaxed">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect
                  personal data from children. If you believe we have collected information from a child, please
                  contact us immediately and we will take steps to delete such information.
                </p>
              </section>

              {/* Changes to This Policy */}
              <section id="changes" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">11. Changes to This Policy</h2>
                <p className="text-text-secondary leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or
                  applicable laws. We will notify you of any material changes by posting the new Privacy Policy
                  on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy
                  Policy periodically for any changes.
                </p>
              </section>

              {/* Contact Us */}
              <section id="contact" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">12. Contact Us</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-bg-secondary/50 rounded-lg p-6 border border-white/10">
                  <p className="text-text-secondary mb-2">
                    <strong className="text-text-primary">RISKCORE Ltd.</strong>
                  </p>
                  <p className="text-text-secondary mb-2">
                    Registered in England and Wales
                  </p>
                  <p className="text-text-secondary">
                    Email:{' '}
                    <a href="mailto:hello@riskcore.io" className="text-brand-blue hover:underline">
                      hello@riskcore.io
                    </a>
                  </p>
                </div>
              </section>

              {/* Back to Top */}
              <div className="pt-8 border-t border-white/10">
                <a
                  href="#"
                  className="inline-flex items-center text-brand-blue hover:underline text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Back to top
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
