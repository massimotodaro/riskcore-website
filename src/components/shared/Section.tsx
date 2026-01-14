'use client'

import { HTMLAttributes, forwardRef, useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  className?: string
  containerClassName?: string
  children: React.ReactNode
  animate?: boolean
  animationVariant?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight'
  delay?: number
}

const animations: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className = '',
      containerClassName = '',
      children,
      animate = true,
      animationVariant = 'fadeUp',
      delay = 0,
      ...props
    },
    ref
  ) => {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const sectionClasses = `py-16 md:py-24 ${className}`
    const containerClasses = `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`

    if (!animate) {
      return (
        <section ref={ref || sectionRef} className={sectionClasses} {...props}>
          <div className={containerClasses}>{children}</div>
        </section>
      )
    }

    return (
      <section ref={ref || sectionRef} className={sectionClasses} {...props}>
        <motion.div
          className={containerClasses}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={animations[animationVariant]}
          transition={{
            duration: 0.6,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {children}
        </motion.div>
      </section>
    )
  }
)

Section.displayName = 'Section'

// Section Header subcomponent
interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  description?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    { title, subtitle, description, align = 'center', className = '', ...props },
    ref
  ) => {
    const alignClasses = {
      left: 'text-left',
      center: 'text-center mx-auto',
      right: 'text-right ml-auto',
    }

    return (
      <div
        ref={ref}
        className={`max-w-3xl mb-12 md:mb-16 ${alignClasses[align]} ${className}`}
        {...props}
      >
        {subtitle && (
          <span className="inline-block text-brand-blue font-semibold text-sm uppercase tracking-wider mb-3">
            {subtitle}
          </span>
        )}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-text-muted text-lg md:text-xl">{description}</p>
        )}
      </div>
    )
  }
)

SectionHeader.displayName = 'SectionHeader'

export { Section, SectionHeader }
export default Section
