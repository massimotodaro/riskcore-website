export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Placeholder */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight mb-6">
            Firm-Wide Risk Visibility
            <br />
            <span className="gradient-text">for Multi-Manager Funds</span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto mb-10">
            Keep your trading systems. Keep your PMs&apos; workflows. RISKCORE sits on top
            and gives you the firm-wide view you&apos;ve never had.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#cta" className="btn-primary text-lg px-8 py-4">
              Get Early Access
            </a>
            <a
              href="https://github.com/massimotodaro/riskcore"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-4"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-20 text-center">
        <div className="container-custom">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              Website Under Construction
            </h2>
            <p className="text-text-muted">
              Full marketing website coming soon. Check back for updates or star our GitHub repo.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
