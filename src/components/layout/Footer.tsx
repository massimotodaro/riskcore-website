import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Why RISKCORE', href: '/why-riskcore' },
    { name: 'Demo', href: '#early-access' },
  ],
  resources: [
    { name: 'Documentation', href: 'https://github.com/massimotodaro/riskcore#readme', external: true },
    { name: 'API Reference', href: 'https://github.com/massimotodaro/riskcore/docs', external: true },
    { name: 'GitHub', href: 'https://github.com/massimotodaro/riskcore', external: true },
    { name: 'Changelog', href: 'https://github.com/massimotodaro/riskcore/releases', external: true },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: 'mailto:hello@riskcore.io' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Security', href: '/security' },
  ],
}

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/massimotodaro/riskcore', icon: Github },
  { name: 'Twitter', href: 'https://twitter.com/riskcore', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/riskcore', icon: Linkedin },
  { name: 'Email', href: 'mailto:hello@riskcore.io', icon: Mail },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-primary border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-heading font-bold text-xl text-text-primary">
                RISKCORE
              </span>
            </Link>
            <p className="text-text-muted text-sm mb-6 max-w-xs">
              Open-source multi-manager risk aggregation platform.
              Firm-wide visibility without replacing your systems.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-dim hover:text-brand-blue transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary text-sm mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary text-sm mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-text-muted hover:text-text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary text-sm mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary text-sm mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-dim text-sm">
            &copy; {currentYear} RISKCORE. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-text-dim text-sm">
            <span>Built with</span>
            <span className="text-brand-blue">&hearts;</span>
            <span>for risk professionals</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
              Open Source
            </span>
            <span className="text-text-dim text-xs">
              MIT License
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
