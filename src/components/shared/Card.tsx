import { HTMLAttributes, forwardRef } from 'react'

type CardVariant = 'default' | 'bordered' | 'elevated' | 'gradient'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  hover?: boolean
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-bg-secondary/90 backdrop-blur-xl border border-white/10',
  bordered: 'bg-transparent border border-white/20',
  elevated: 'bg-bg-secondary shadow-xl shadow-black/20',
  gradient:
    'bg-gradient-to-br from-bg-secondary/90 to-bg-tertiary/50 backdrop-blur-xl border border-white/10',
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = false, className = '', children, ...props }, ref) => {
    const baseClasses = 'rounded-2xl p-6'
    const hoverClasses = hover
      ? 'transition-all duration-300 hover:border-brand-blue/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-blue/10'
      : ''

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card Header subcomponent
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`mb-4 ${className}`} {...props}>
        {children}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

// Card Title subcomponent
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  children: React.ReactNode
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Tag = 'h3', className = '', children, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={`font-heading font-bold text-text-primary text-xl ${className}`}
        {...props}
      >
        {children}
      </Tag>
    )
  }
)

CardTitle.displayName = 'CardTitle'

// Card Description subcomponent
interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string
  children: React.ReactNode
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <p ref={ref} className={`text-text-muted text-sm ${className}`} {...props}>
        {children}
      </p>
    )
  }
)

CardDescription.displayName = 'CardDescription'

// Card Content subcomponent
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'

// Card Footer subcomponent
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`mt-4 pt-4 border-t border-white/10 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}

export default Card
