'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Github } from 'lucide-react'
import { ThemeToggle } from '@/components/providers/ThemeToggle'

const navigation = [
  { name: 'Why RISKCORE', href: '/why-riskcore' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Docs', href: 'https://github.com/massimotodaro/riskcore#readme', external: true },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logoGradient = 'linear-gradient(to right, #34d399, #22c55e)'

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: logoGradient }}
            >
              <span className="text-white font-bold text-base">R</span>
            </div>
            <span
              className={`font-heading text-xl bg-clip-text text-transparent transition-opacity group-hover:opacity-80 ${pathname === '/' ? 'font-extrabold' : 'font-bold'}`}
              style={{ backgroundImage: logoGradient }}
            >
              RISKCORE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-text-primary transition-colors text-sm font-medium"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`hover:text-text-primary transition-colors text-sm ${pathname === item.href ? 'text-text-primary font-bold' : 'text-text-muted font-medium'}`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/massimotodaro/riskcore"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-text-muted hover:text-text-primary transition-colors text-sm font-medium"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <Link
              href="#cta"
              className="inline-flex items-center justify-center px-4 py-2 bg-brand-blue text-white font-semibold rounded-[3px] transition-all duration-200 hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 text-sm"
            >
              Book a Demo
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="p-2 text-text-muted hover:text-text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={`md:hidden fixed inset-0 top-16 bg-white dark:bg-[#0a0f1a] transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {navigation.map((item) => (
            item.external ? (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors text-lg font-medium py-2 border-b border-black/10 dark:border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:text-text-primary transition-colors text-lg py-2 border-b border-black/10 dark:border-white/10 ${pathname === item.href ? 'text-text-primary font-bold' : 'text-text-secondary font-medium'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            )
          ))}

          <div className="pt-4 space-y-4">
            <a
              href="https://github.com/massimotodaro/riskcore"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-black/20 dark:border-white/20 rounded-lg text-text-secondary hover:text-text-primary hover:border-black/40 dark:hover:border-white/40 transition-all text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Github className="w-5 h-5" />
              <span>Star on GitHub</span>
            </a>
            <Link
              href="#cta"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-brand-blue text-white font-semibold rounded-[3px] transition-all duration-200 hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
