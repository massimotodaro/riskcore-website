'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const lastUpdated = 'January 2025'

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'description', title: '2. Description of Service' },
  { id: 'accounts', title: '3. User Accounts' },
  { id: 'acceptable-use', title: '4. Acceptable Use' },
  { id: 'intellectual-property', title: '5. Intellectual Property' },
  { id: 'open-source', title: '6. Open Source License' },
  { id: 'payment', title: '7. Payment Terms' },
  { id: 'refunds', title: '8. Refunds & Cancellation' },
  { id: 'availability', title: '9. Service Availability' },
  { id: 'data-privacy', title: '10. Data & Privacy' },
  { id: 'disclaimers', title: '11. Disclaimers' },
  { id: 'limitation', title: '12. Limitation of Liability' },
  { id: 'indemnification', title: '13. Indemnification' },
  { id: 'termination', title: '14. Termination' },
  { id: 'governing-law', title: '15. Governing Law' },
  { id: 'changes', title: '16. Changes to Terms' },
  { id: 'contact', title: '17. Contact Us' },
]

export default function TermsContent() {
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
              Terms of Service
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
              {/* Acceptance of Terms */}
              <section id="acceptance" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Welcome to RISKCORE. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the RISKCORE
                  website, platform, and services (collectively, the &quot;Service&quot;). RISKCORE is a trading name of Shopkoin Ltd
                  (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company registered in England and Wales (Company Registration Number: 11440278).
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any
                  part of these Terms, you may not access the Service.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  If you are using the Service on behalf of an organisation, you represent and warrant that you have
                  the authority to bind that organisation to these Terms.
                </p>
              </section>

              {/* Description of Service */}
              <section id="description" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">2. Description of Service</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  RISKCORE is a risk aggregation platform designed for hedge funds and investment managers. The Service
                  allows users to aggregate, normalise, and analyse risk data from multiple portfolio management systems.
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We offer the following service tiers:
                </p>
                <div className="bg-bg-secondary/50 rounded-lg p-6 mb-4 border border-white/10">
                  <ul className="space-y-4 text-text-secondary">
                    <li>
                      <strong className="text-text-primary">Free Tier:</strong> Self-hosted, open-source version with
                      community support. Limited to basic features and up to 3 data source connections.
                    </li>
                    <li>
                      <strong className="text-text-primary">Pro Tier ($500/month):</strong> Cloud-hosted solution with
                      unlimited data sources, AI-powered queries, email support, and advanced features.
                    </li>
                    <li>
                      <strong className="text-text-primary">Enterprise Tier (Custom pricing):</strong> Dedicated infrastructure,
                      SSO/SAML integration, custom integrations, dedicated Customer Success Manager, and guaranteed SLAs.
                    </li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  Features and pricing are subject to change. We will provide reasonable notice of any material changes
                  to pricing for existing subscribers.
                </p>
              </section>

              {/* User Accounts */}
              <section id="accounts" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">3. User Accounts</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  To access certain features of the Service, you must create an account. When creating an account, you agree to:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorised access</li>
                </ul>
                <p className="text-text-secondary leading-relaxed">
                  We reserve the right to suspend or terminate accounts that violate these Terms or are inactive for
                  extended periods.
                </p>
              </section>

              {/* Acceptable Use */}
              <section id="acceptable-use" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">4. Acceptable Use</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2">
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Use the Service for any fraudulent or deceptive purposes</li>
                  <li>Attempt to gain unauthorised access to any part of the Service</li>
                  <li>Interfere with or disrupt the integrity or performance of the Service</li>
                  <li>Upload malicious code, viruses, or harmful data</li>
                  <li>Reverse engineer, decompile, or disassemble any part of the Service (except as permitted for open-source components)</li>
                  <li>Use automated systems or bots to access the Service without permission</li>
                  <li>Resell or redistribute the Service without authorisation</li>
                  <li>Use the Service to store or process data you do not have rights to use</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section id="intellectual-property" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">5. Intellectual Property</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  The Service and its original content (excluding open-source components and user-provided content),
                  features, and functionality are and will remain the exclusive property of Shopkoin Ltd (trading as RISKCORE) and its licensors.
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  The RISKCORE name, logo, and all related names, logos, product and service names, designs, and slogans
                  are trademarks of Shopkoin Ltd. You may not use such marks without our prior written permission.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  You retain all rights to your data and content that you upload to the Service. By uploading content,
                  you grant us a limited licence to process that content solely to provide the Service to you.
                </p>
              </section>

              {/* Open Source License */}
              <section id="open-source" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">6. Open Source License</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  The core RISKCORE platform is released under the MIT License. This means you are free to:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li>Use the software for any purpose</li>
                  <li>Modify the software and create derivative works</li>
                  <li>Distribute the software</li>
                  <li>Use the software commercially</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mb-4">
                  The MIT License requires that you include the original copyright notice and license in any copy or
                  substantial portion of the software.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Note: Certain proprietary features, integrations, and the cloud-hosted service are not covered by the
                  open-source license and are subject to these Terms of Service.
                </p>
              </section>

              {/* Payment Terms */}
              <section id="payment" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">7. Payment Terms</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  For paid subscription plans (Pro and Enterprise):
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li><strong className="text-text-primary">Billing:</strong> Subscriptions are billed in advance on a monthly or annual basis</li>
                  <li><strong className="text-text-primary">Currency:</strong> All prices are in US Dollars (USD) unless otherwise stated</li>
                  <li><strong className="text-text-primary">Auto-renewal:</strong> Subscriptions automatically renew unless cancelled before the renewal date</li>
                  <li><strong className="text-text-primary">Payment methods:</strong> We accept major credit cards and bank transfers for Enterprise plans</li>
                  <li><strong className="text-text-primary">Taxes:</strong> Prices exclude applicable taxes. VAT will be added for UK and EU customers where applicable</li>
                  <li><strong className="text-text-primary">Late payments:</strong> We reserve the right to suspend access for accounts with overdue payments</li>
                </ul>
                <p className="text-text-secondary leading-relaxed">
                  Enterprise pricing is customised based on your requirements. Contact us for a quote.
                </p>
              </section>

              {/* Refunds & Cancellation */}
              <section id="refunds" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">8. Refunds & Cancellation</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Our refund and cancellation policies are as follows:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li><strong className="text-text-primary">Monthly subscriptions:</strong> No refunds for partial months. You may cancel at any time and retain access until the end of your billing period.</li>
                  <li><strong className="text-text-primary">Annual subscriptions:</strong> Pro-rata refunds may be available within the first 30 days. After 30 days, no refunds are provided but you retain access for the remainder of your subscription term.</li>
                  <li><strong className="text-text-primary">Free trial:</strong> If a free trial is offered, you will not be charged unless you continue after the trial period ends.</li>
                  <li><strong className="text-text-primary">Enterprise plans:</strong> Refund terms are specified in your individual service agreement.</li>
                </ul>
                <p className="text-text-secondary leading-relaxed">
                  To cancel your subscription, please contact us at{' '}
                  <a href="mailto:hello@riskcore.io" className="text-brand-blue hover:underline">hello@riskcore.io</a> or
                  through your account settings.
                </p>
              </section>

              {/* Service Availability */}
              <section id="availability" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">9. Service Availability</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We strive to maintain high availability of our Service:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li><strong className="text-text-primary">Pro Tier:</strong> We target 99.5% uptime, excluding scheduled maintenance</li>
                  <li><strong className="text-text-primary">Enterprise Tier:</strong> Custom SLAs with guaranteed uptime and support response times as specified in your service agreement</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We may perform scheduled maintenance with reasonable advance notice. Emergency maintenance may be
                  performed without notice when necessary to protect the Service or user data.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  We do not guarantee uninterrupted access to the Service and are not liable for any downtime or
                  service interruptions beyond what is specified in applicable SLAs.
                </p>
              </section>

              {/* Data & Privacy */}
              <section id="data-privacy" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">10. Data & Privacy</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Your use of the Service is also governed by our{' '}
                  <Link href="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>, which explains
                  how we collect, use, and protect your personal data.
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Key points regarding your data:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2">
                  <li><strong className="text-text-primary">Ownership:</strong> You retain all rights to your data. We do not claim ownership of any data you upload.</li>
                  <li><strong className="text-text-primary">Processing:</strong> We process your data solely to provide the Service and as described in our Privacy Policy.</li>
                  <li><strong className="text-text-primary">Security:</strong> We implement appropriate technical and organisational measures to protect your data.</li>
                  <li><strong className="text-text-primary">Export:</strong> You may export your data at any time through the Service or by contacting support.</li>
                  <li><strong className="text-text-primary">Deletion:</strong> Upon account termination, your data will be deleted in accordance with our data retention policy.</li>
                </ul>
              </section>

              {/* Disclaimers */}
              <section id="disclaimers" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">11. Disclaimers</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                  OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  RISKCORE does not warrant that:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li>The Service will be uninterrupted, secure, or error-free</li>
                  <li>The results obtained from the Service will be accurate or reliable</li>
                  <li>Any errors in the Service will be corrected</li>
                </ul>
                <p className="text-text-secondary leading-relaxed">
                  The Service provides tools for risk analysis and should not be considered as financial advice. You are
                  solely responsible for any investment or trading decisions made using information from the Service.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section id="limitation" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">12. Limitation of Liability</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL RISKCORE, ITS DIRECTORS, EMPLOYEES, PARTNERS,
                  AGENTS, OR SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                  INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Our total liability to you for any claims arising from or related to the Service shall not exceed the
                  greater of:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2">
                  <li>The amount you paid to us in the 12 months preceding the claim, or</li>
                  <li>One hundred pounds sterling (£100)</li>
                </ul>
              </section>

              {/* Indemnification */}
              <section id="indemnification" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">13. Indemnification</h2>
                <p className="text-text-secondary leading-relaxed">
                  You agree to defend, indemnify, and hold harmless RISKCORE and its officers, directors, employees, and
                  agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising
                  from: (a) your use of and access to the Service; (b) your violation of these Terms; (c) your violation
                  of any third-party right, including intellectual property or privacy rights; or (d) any claim that your
                  data caused damage to a third party.
                </p>
              </section>

              {/* Termination */}
              <section id="termination" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">14. Termination</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Either party may terminate this agreement:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li><strong className="text-text-primary">By you:</strong> At any time by cancelling your subscription and discontinuing use of the Service</li>
                  <li><strong className="text-text-primary">By us:</strong> Immediately if you breach these Terms, or with 30 days&apos; notice for any other reason</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Upon termination:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2">
                  <li>Your right to access the Service will cease immediately</li>
                  <li>You may request export of your data within 30 days of termination</li>
                  <li>We will delete your data in accordance with our retention policy</li>
                  <li>Any outstanding fees will become immediately due</li>
                </ul>
              </section>

              {/* Governing Law */}
              <section id="governing-law" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">15. Governing Law</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of England and Wales,
                  without regard to its conflict of law provisions.
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Any disputes arising from or relating to these Terms or the Service shall be subject to the exclusive
                  jurisdiction of the courts of England and Wales.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions
                  will remain in full force and effect.
                </p>
              </section>

              {/* Changes to Terms */}
              <section id="changes" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">16. Changes to Terms</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We reserve the right to modify these Terms at any time. We will provide notice of material changes by:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li>Posting the updated Terms on our website</li>
                  <li>Updating the &quot;Last updated&quot; date</li>
                  <li>Sending an email to registered users (for material changes)</li>
                </ul>
                <p className="text-text-secondary leading-relaxed">
                  Your continued use of the Service after changes become effective constitutes acceptance of the
                  revised Terms. If you do not agree to the new Terms, please stop using the Service.
                </p>
              </section>

              {/* Contact Us */}
              <section id="contact" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">17. Contact Us</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-bg-secondary/50 rounded-lg p-6 border border-white/10">
                  <p className="text-text-secondary mb-2">
                    <strong className="text-text-primary">RISKCORE</strong>
                  </p>
                  <p className="text-text-secondary mb-2">
                    A trading name of Shopkoin Ltd
                  </p>
                  <p className="text-text-secondary mb-2">
                    Registered in England and Wales (Company No. 11440278)
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
