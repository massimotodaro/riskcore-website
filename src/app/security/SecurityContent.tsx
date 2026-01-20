'use client'

import { motion } from 'framer-motion'

const lastUpdated = 'January 2025'

const sections = [
  { id: 'overview', title: '1. Security Overview' },
  { id: 'compliance', title: '2. Compliance & Certifications' },
  { id: 'data-encryption', title: '3. Data Encryption' },
  { id: 'infrastructure', title: '4. Infrastructure Security' },
  { id: 'access-control', title: '5. Access Control' },
  { id: 'self-hosted', title: '6. Self-Hosted Option' },
  { id: 'data-handling', title: '7. Data Handling' },
  { id: 'monitoring', title: '8. Monitoring & Incident Response' },
  { id: 'vendor-security', title: '9. Vendor Security' },
  { id: 'contact', title: '10. Security Contact' },
]

export default function SecurityContent() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full mb-6">
              <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-brand-green text-sm font-medium">Enterprise-Grade Security</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Security at RISKCORE
            </h1>
            <p className="text-text-muted text-lg mb-2">
              Your risk data deserves bank-grade protection. Here&apos;s how we deliver it.
            </p>
            <p className="text-text-dim text-sm">
              Last updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Badges */}
      <section className="py-8 border-b border-white/10 bg-bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-3 text-text-muted">
              <div className="w-12 h-12 rounded-lg bg-brand-green/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-text-primary">AES-256</p>
                <p className="text-sm">Encryption at Rest</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-text-muted">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-text-primary">TLS 1.3</p>
                <p className="text-sm">Encryption in Transit</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-text-muted">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-text-primary">GDPR</p>
                <p className="text-sm">Compliant</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-text-muted">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-text-primary">Self-Hosted</p>
                <p className="text-sm">Option Available</p>
              </div>
            </div>
          </div>
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
              {/* Security Overview */}
              <section id="overview" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">1. Security Overview</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  At RISKCORE, security is not an afterthought—it&apos;s foundational to everything we build.
                  We understand that our customers manage billions in assets and require the highest levels
                  of data protection.
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Our security program is built on three core principles:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2">
                  <li><strong className="text-text-primary">Defense in Depth:</strong> Multiple layers of security controls</li>
                  <li><strong className="text-text-primary">Least Privilege:</strong> Minimal access rights by default</li>
                  <li><strong className="text-text-primary">Transparency:</strong> Open-source core for full auditability</li>
                </ul>
              </section>

              {/* Compliance & Certifications */}
              <section id="compliance" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">2. Compliance & Certifications</h2>

                <div className="bg-bg-secondary/50 rounded-lg p-6 mb-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Current Status</h3>
                  <ul className="space-y-4 text-text-secondary">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <strong className="text-text-primary">GDPR Compliant</strong>
                        <p className="text-sm">Full compliance with UK and EU data protection regulations</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <strong className="text-text-primary">Security Controls Implemented</strong>
                        <p className="text-sm">Bank-grade encryption, access controls, and monitoring in place</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-brand-blue/10 border border-brand-blue/30 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">In Progress</h3>
                  <ul className="space-y-4 text-text-secondary">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <strong className="text-text-primary">SOC 2 Type II Certification</strong>
                        <p className="text-sm">Currently undergoing the SOC 2 compliance process with third-party auditors</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <strong className="text-text-primary">Penetration Testing</strong>
                        <p className="text-sm">Scheduling independent security assessments by certified professionals</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  We are committed to achieving the highest security standards. Enterprise customers can
                  request our current security documentation and compliance roadmap.
                </p>
              </section>

              {/* Data Encryption */}
              <section id="data-encryption" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">3. Data Encryption</h2>

                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">Encryption at Rest</h3>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li>All data encrypted using <strong className="text-text-primary">AES-256</strong> encryption</li>
                  <li>Database encryption with customer-specific keys (Enterprise)</li>
                  <li>Encrypted backups stored in geographically distributed locations</li>
                  <li>Secure key management using hardware security modules (HSM)</li>
                </ul>

                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">Encryption in Transit</h3>
                <ul className="list-disc pl-6 text-text-secondary space-y-2">
                  <li><strong className="text-text-primary">TLS 1.3</strong> for all data transmission</li>
                  <li>HSTS enabled with minimum 1-year max-age</li>
                  <li>Certificate pinning available for mobile applications</li>
                  <li>Perfect Forward Secrecy (PFS) enabled</li>
                </ul>
              </section>

              {/* Infrastructure Security */}
              <section id="infrastructure" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">4. Infrastructure Security</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Our cloud infrastructure is hosted on leading providers with SOC 2 and ISO 27001 certifications:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li>Network isolation using Virtual Private Clouds (VPC)</li>
                  <li>Web Application Firewall (WAF) protection</li>
                  <li>DDoS mitigation at network edge</li>
                  <li>Regular vulnerability scanning and patching</li>
                  <li>Immutable infrastructure with automated deployments</li>
                  <li>Geographic redundancy with automatic failover</li>
                </ul>
              </section>

              {/* Access Control */}
              <section id="access-control" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">5. Access Control</h2>

                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">User Access</h3>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li>Role-based access control (RBAC) with granular permissions</li>
                  <li>Multi-factor authentication (MFA) support</li>
                  <li>SSO/SAML integration for Enterprise customers</li>
                  <li>Session timeout and automatic logout</li>
                  <li>IP allowlisting available</li>
                </ul>

                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">Internal Access</h3>
                <ul className="list-disc pl-6 text-text-secondary space-y-2">
                  <li>Principle of least privilege for all employees</li>
                  <li>Background checks for all team members</li>
                  <li>Access reviews conducted quarterly</li>
                  <li>All access logged and auditable</li>
                  <li>No standing access to production data</li>
                </ul>
              </section>

              {/* Self-Hosted Option */}
              <section id="self-hosted" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">6. Self-Hosted Option</h2>
                <div className="bg-brand-blue/10 border border-brand-blue/30 rounded-lg p-6 mb-4">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Maximum Control</h3>
                  <p className="text-text-secondary">
                    For organizations with strict data residency requirements or internal policies,
                    RISKCORE can be deployed entirely within your own infrastructure.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Self-hosted benefits include:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2">
                  <li><strong className="text-text-primary">Data never leaves your network</strong> — Complete data sovereignty</li>
                  <li><strong className="text-text-primary">Your security controls</strong> — Integrate with existing security infrastructure</li>
                  <li><strong className="text-text-primary">Air-gapped deployments</strong> — Available for highly sensitive environments</li>
                  <li><strong className="text-text-primary">Custom retention policies</strong> — Full control over data lifecycle</li>
                </ul>
              </section>

              {/* Data Handling */}
              <section id="data-handling" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">7. Data Handling</h2>

                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">Data Isolation</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Each customer&apos;s data is logically isolated. We use separate database schemas and
                  encryption keys to ensure complete data segregation between tenants.
                </p>

                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">Data Retention</h3>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li>Customer-configurable retention policies</li>
                  <li>Secure deletion upon request or account termination</li>
                  <li>30-day maximum for complete data purge</li>
                </ul>

                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">No Data Selling</h3>
                <p className="text-text-secondary leading-relaxed">
                  We will <strong className="text-text-primary">never</strong> sell, share, or monetize your data.
                  Your risk data is used solely to provide our services to you.
                </p>
              </section>

              {/* Monitoring & Incident Response */}
              <section id="monitoring" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">8. Monitoring & Incident Response</h2>

                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">Continuous Monitoring</h3>
                <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-4">
                  <li>24/7 automated threat detection</li>
                  <li>Real-time alerting on anomalous activity</li>
                  <li>Comprehensive audit logging</li>
                  <li>Log retention for 12+ months</li>
                </ul>

                <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">Incident Response</h3>
                <ul className="list-disc pl-6 text-text-secondary space-y-2">
                  <li>Documented incident response procedures</li>
                  <li>Dedicated security response team</li>
                  <li>Customer notification within 72 hours of confirmed breach</li>
                  <li>Post-incident reviews and continuous improvement</li>
                </ul>
              </section>

              {/* Vendor Security */}
              <section id="vendor-security" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">9. Vendor Security</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We carefully vet all third-party vendors and require:
                </p>
                <ul className="list-disc pl-6 text-text-secondary space-y-2">
                  <li>SOC 2 or equivalent certification</li>
                  <li>Data Processing Agreements (DPAs)</li>
                  <li>Regular security assessments</li>
                  <li>Minimal data sharing principles</li>
                </ul>
              </section>

              {/* Security Contact */}
              <section id="contact" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">10. Security Contact</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We take security vulnerabilities seriously. If you discover a security issue,
                  please report it responsibly.
                </p>
                <div className="bg-bg-secondary/50 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Report a Vulnerability</h3>
                  <p className="text-text-secondary mb-4">
                    Email:{' '}
                    <a href="mailto:security@riskcore.io" className="text-brand-blue hover:underline">
                      security@riskcore.io
                    </a>
                  </p>
                  <p className="text-text-secondary mb-4">
                    For general security questions:{' '}
                    <a href="mailto:hello@riskcore.io" className="text-brand-blue hover:underline">
                      hello@riskcore.io
                    </a>
                  </p>
                  <p className="text-text-dim text-sm">
                    Enterprise customers can request our full security documentation, including
                    SOC 2 reports, penetration test summaries, and completed security questionnaires.
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
