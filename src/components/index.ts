// Layout components
export { Header, Footer } from './layout'

// Shared components
export {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Section,
  SectionHeader,
  UnifiedCTA,
  CTAForm,
  ContactModalProvider,
  useContactModal,
} from './shared'

// Home page components
export {
  Hero,
  HeroInline,
  WhyRiskcoreHero,
  TimeTravelSection,
  TrustBadges,
  Features,
  DashboardPreview,
  CTASection,
  FixedSolutionArrow,
  FixedChallengesArrow,
  IntegrationLogos,
} from './home'

// Why RISKCORE page components
export {
  Problem,
  Solution,
  HowItWorks,
} from './why-riskcore'

// Pricing page components
export {
  Features as PricingFeatures,
  PricingCards,
  ComparisonMatrix,
  FAQ,
  PricingTable,
} from './pricing'

// About page components
export {
  Founder,
  OpenSource,
} from './about'

// Integration components
export {
  CrispChat,
  TawkTo,
  Analytics,
} from './integrations'

// Cookie consent
export {
  CookieConsent,
  getCookieConsent,
  setCookieConsent,
} from './cookie-consent'
export type { CookiePreferences } from './cookie-consent'

// Provider components
export {
  ThemeProvider,
  ThemeToggle,
} from './providers'
