'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Section, SectionHeader } from '@/components/shared'

const faqs = [
  {
    question: 'Is RISKCORE really open source?',
    answer: 'Yes! The core RISKCORE platform is fully open source under the MIT license. You can audit the code, modify it, and self-host it entirely for free. Our paid plans add cloud hosting, premium support, and enterprise features.',
  },
  {
    question: 'How does RISKCORE connect to my data sources?',
    answer: 'RISKCORE uses a read-only approach. We never modify your source systems. For CSV/Excel, you upload files. For APIs and FIX, we connect as a passive consumer. For Bloomberg, we use their standard data feeds. Your existing workflows remain completely unchanged.',
  },
  {
    question: 'What happens to my data?',
    answer: 'Your data stays yours. For self-hosted deployments, data never leaves your infrastructure. For cloud plans, we use bank-grade encryption (AES-256 at rest, TLS 1.3 in transit) and are SOC 2 Type II compliant. We never share or sell your data.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Absolutely. You can upgrade or downgrade at any time. When upgrading, you get immediate access to new features. When downgrading, you keep access until your current billing period ends. No lock-in contracts.',
  },
  {
    question: 'Do you offer a trial for Pro/Enterprise?',
    answer: 'Yes! Pro plans include a 14-day free trial with full functionality. For Enterprise, we offer a guided proof-of-concept with your actual data. Contact our team to get started.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'Free users get community support via our GitHub discussions and Discord. Pro users get email support with 24-hour response times. Enterprise customers get a dedicated Customer Success Manager and guaranteed SLAs.',
  },
]

function FAQItem({ question, answer, isOpen, onClick }: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="font-heading font-semibold text-text-primary group-hover:text-brand-blue transition-colors pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-text-muted"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-text-muted leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <Section className="bg-gradient-to-b from-bg-secondary/30 to-bg-primary">
      <SectionHeader
        subtitle="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about RISKCORE pricing and features."
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-bg-secondary/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
      >
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mt-12"
      >
        <p className="text-text-muted mb-4">
          Still have questions?
        </p>
        <a
          href="mailto:hello@riskcore.io"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 rounded-lg text-text-primary hover:bg-white/10 hover:border-white/30 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contact Us
        </a>
      </motion.div>
    </Section>
  )
}
