'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Section, SectionHeader } from '@/components/shared'
import { useContactModal } from '@/components/shared/ContactModal'

const faqs = [
  {
    question: 'Is RISKCORE really open source?',
    answer: 'Yes! The core RISKCORE platform is fully open source under the MIT license. You can audit the code, modify it, and self-host it entirely for free. Our paid plans add cloud hosting, premium support, and enterprise features.',
    category: 'general',
  },
  {
    question: 'How does RISKCORE connect to my data sources?',
    answer: 'RISKCORE uses a read-only approach. We never modify your source systems. For CSV/Excel, you upload files. For APIs and FIX, we connect as a passive consumer. For Bloomberg, we use their standard data feeds. Your existing workflows remain completely unchanged.',
    category: 'technical',
  },
  {
    question: 'What happens to my data?',
    answer: 'Your data stays yours. For self-hosted deployments, data never leaves your infrastructure. For cloud plans, we use bank-grade encryption (AES-256 at rest, TLS 1.3 in transit) and are SOC 2 Type II compliant. We never share or sell your data.',
    category: 'security',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Absolutely. You can upgrade or downgrade at any time. When upgrading, you get immediate access to new features. When downgrading, you keep access until your current billing period ends. No lock-in contracts.',
    category: 'billing',
  },
  {
    question: 'Do you offer a trial for Pro/Enterprise?',
    answer: 'Yes! Pro plans include a 14-day free trial with full functionality. For Enterprise, we offer a guided proof-of-concept with your actual data. Contact our team to get started.',
    category: 'billing',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'Free users get community support via our GitHub discussions and Discord. Pro users get email support with 24-hour response times. Enterprise customers get a dedicated Customer Success Manager and guaranteed SLAs.',
    category: 'support',
  },
  {
    question: 'How long does implementation take?',
    answer: 'Most teams are up and running within a day. Self-hosted deployments can be done in under an hour with our Docker images. For Enterprise with custom integrations, we typically complete full implementation within 2-4 weeks, including training.',
    category: 'technical',
  },
  {
    question: 'What data sources do you support?',
    answer: 'We support CSV/Excel uploads, REST APIs, FIX protocol, Bloomberg Terminal, Enfusion, Eze Eclipse, Axioma, and many more. Enterprise plans include custom integrations for proprietary systems. If you can export data, we can likely ingest it.',
    category: 'technical',
  },
  {
    question: 'Is there a limit on positions or portfolios?',
    answer: 'Free plans support up to 1,000 positions. Pro plans support up to 50,000 positions across unlimited portfolios. Enterprise plans have no limits and can handle millions of positions with our optimized architecture.',
    category: 'general',
  },
  {
    question: 'How does the AI risk assistant work?',
    answer: 'Our AI assistant is trained on risk management best practices and your firm\'s data patterns. Ask natural language questions like "What\'s our largest tech exposure?" or "Show me positions correlated to rising rates." Free gets 10 queries/day, Pro is unlimited.',
    category: 'technical',
  },
  {
    question: 'Do you offer discounts for startups or non-profits?',
    answer: 'Yes! We offer 50% off Pro plans for qualifying startups (under $5M in AUM and less than 2 years old) and 30% off for registered non-profits and educational institutions. Contact us to apply.',
    category: 'billing',
  },
  {
    question: 'What compliance certifications do you have?',
    answer: 'RISKCORE Cloud is SOC 2 Type II certified and GDPR compliant. We undergo annual third-party security audits. Enterprise customers can request our security documentation and compliance reports. Self-hosted deployments inherit your existing compliance posture.',
    category: 'security',
  },
]

function FAQItem({ question, answer, isOpen, onClick, index }: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  index: number
}) {
  const questionId = `faq-question-${index}`
  const answerId = `faq-answer-${index}`

  return (
    <motion.div
      className={`border border-black/5 dark:border-white/10 rounded-xl mb-3 overflow-hidden transition-all duration-200 ${
        isOpen ? 'bg-slate-50 dark:bg-slate-800/50 shadow-md' : 'bg-white dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/40'
      }`}
      initial={false}
    >
      <h3>
        <button
          id={questionId}
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={answerId}
          className="w-full px-6 py-5 flex items-center justify-between text-left group min-h-[76px]"
        >
          <span className={`font-heading font-semibold transition-colors pr-4 ${
            isOpen ? 'text-brand-blue' : 'text-slate-800 dark:text-slate-100 group-hover:text-brand-blue'
          }`}>
            {question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isOpen ? 'bg-brand-blue text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
            }`}
            aria-hidden="true"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.span>
        </button>
      </h3>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={answerId}
            role="region"
            aria-labelledby={questionId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { openModal } = useContactModal()

  return (
    <Section className="bg-transparent">
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
        className="max-w-3xl mx-auto"
      >
        {/* Two-column layout for larger screens */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left column */}
          <div>
            {faqs.slice(0, 6).map((faq, index) => (
              <FAQItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
          {/* Right column */}
          <div>
            {faqs.slice(6).map((faq, index) => (
              <FAQItem
                key={index + 6}
                index={index + 6}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index + 6}
                onClick={() => setOpenIndex(openIndex === index + 6 ? null : index + 6)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mt-16"
      >
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-black/5 dark:border-white/10">
          <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-slate-800 dark:text-slate-100 font-semibold mb-1">
              Still have questions?
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Our team is here to help you get started.
            </p>
          </div>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-lg font-semibold hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Us
          </button>
        </div>
      </motion.div>
    </Section>
  )
}
