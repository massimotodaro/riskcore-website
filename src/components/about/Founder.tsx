'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Section, SectionHeader } from '@/components/shared'

export default function Founder() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section className="bg-gradient-to-b from-bg-primary to-bg-secondary/30">
      <SectionHeader
        subtitle="About"
        title="Built by People Who Lived the Problem"
        description="RISKCORE was created by risk professionals who spent years wrestling with fragmented data across multiple systems."
      />

      <div ref={ref} className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-bg-secondary/40 border border-white/10 rounded-2xl p-8 md:p-12"
        >
          <h3 className="font-heading font-bold text-text-primary text-2xl mb-6">
            A Team of Former Bankers and Investment Managers
          </h3>

          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              The team behind RISKCORE brings over two decades of experience in financial services, including leadership roles in risk technology at major investment banks and hedge funds.
            </p>
            <p>
              They saw the same problem everywhere: brilliant portfolio managers using their preferred tools, but no unified view of firm-wide risk. Risk teams were spending more time copying data into spreadsheets than actually analyzing risk. Management was making decisions based on reports that were already outdated.
            </p>
            <p>
              Former risk managers and investment professionals, they understood the pain firsthand. They built RISKCORE to solve this problem the right way: a read-only overlay that aggregates data from any source without disrupting existing workflows.
            </p>
            <p>
              And they made it open source because risk infrastructure shouldn&apos;t be a black box. The team believes that transparency builds trust, and trust is essential when managing billions in assets.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
