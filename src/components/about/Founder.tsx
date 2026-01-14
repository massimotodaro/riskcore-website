'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Section, SectionHeader } from '@/components/shared'

const credentials = [
  {
    icon: '📊',
    title: '20+ Years',
    description: 'In financial services and risk management',
  },
  {
    icon: '🏦',
    title: 'Barclays Capital',
    description: 'Former risk technology leader',
  },
  {
    icon: '📜',
    title: 'CFA Charterholder',
    description: 'Chartered Financial Analyst',
  },
  {
    icon: '💻',
    title: 'Technologist',
    description: 'Building fintech solutions since 2000s',
  },
]

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/massimotodaro',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    url: 'https://github.com/massimotodaro',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/massimotodaro',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:massimo@riskcore.io',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function Founder() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section className="bg-gradient-to-b from-bg-primary to-bg-secondary/30">
      <SectionHeader
        subtitle="About"
        title="Built by Someone Who Lived the Problem"
        description="RISKCORE was created by a risk professional who spent years wrestling with fragmented data across multiple systems."
      />

      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo/Avatar Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative w-64 h-64 mx-auto lg:w-80 lg:h-80">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-brand-blue/20 animate-pulse" />
              <div className="absolute inset-4 rounded-full border border-brand-green/20" />

              {/* Avatar placeholder */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-green/20 flex items-center justify-center">
                <span className="text-6xl lg:text-7xl">👨‍💼</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-bg-secondary/60 border border-white/10 flex items-center justify-center text-text-muted hover:text-brand-blue hover:border-brand-blue/30 transition-all duration-200"
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-heading font-bold text-text-primary text-2xl mb-2">
              Massimo Todaro
            </h3>
            <p className="text-brand-blue font-semibold mb-6">Founder & CEO</p>

            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                After 20+ years in financial services—including leading risk technology initiatives at Barclays Capital—I saw the same problem everywhere: brilliant portfolio managers using their preferred tools, but no unified view of firm-wide risk.
              </p>
              <p>
                Risk teams were spending more time copying data into spreadsheets than actually analyzing risk. Management was making decisions based on reports that were already outdated.
              </p>
              <p>
                I built RISKCORE to solve this problem the right way: a read-only overlay that aggregates data from any source without disrupting existing workflows. And I made it open source because risk infrastructure shouldn&apos;t be a black box.
              </p>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {credentials.map((cred, index) => (
                <div
                  key={index}
                  className="bg-bg-secondary/40 border border-white/10 rounded-lg p-4"
                >
                  <span className="text-2xl mb-2 block">{cred.icon}</span>
                  <h4 className="font-semibold text-text-primary text-sm">{cred.title}</h4>
                  <p className="text-text-muted text-xs">{cred.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
