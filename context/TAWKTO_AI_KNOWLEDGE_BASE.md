# Tawk.to AI Knowledge Base for RISKCORE

> Copy these Q&A pairs into Tawk.to: Administration → AI Assist → Knowledge Base

---

## CORE PRODUCT

### What is RISKCORE?
RISKCORE is an open-source risk aggregation platform for multi-manager hedge funds. It sits on top of your existing systems and gives you firm-wide risk visibility without replacing anything. Think of it as a read-only overlay that normalizes data from all your portfolio managers into one unified view.

### How does RISKCORE work?
RISKCORE works in 3 simple steps:
1. CONNECT - We integrate with your existing data sources (CSV, Excel, APIs, Bloomberg, FIX) as a passive, read-only consumer
2. NORMALIZE - Our engine maps all positions to a unified schema, regardless of source format
3. QUERY - Use our AI-powered interface to ask questions like "What's our total tech exposure?" and get instant answers across all PMs

### What problem does RISKCORE solve?
Multi-manager funds struggle with fragmented risk data. Each PM uses different systems, formats, and conventions. RISKCORE solves this by aggregating everything into one view - giving you firm-wide visibility you've never had before, without forcing PMs to change their workflows.

### Who is RISKCORE for?
RISKCORE is built for multi-manager hedge funds, fund of funds, and any investment firm that needs to aggregate risk data across multiple portfolio managers or trading desks. If you're struggling with siloed data and manual spreadsheet aggregation, RISKCORE is for you.

### What makes RISKCORE different?
Unlike traditional risk systems that require replacing your existing infrastructure, RISKCORE is a read-only overlay. Your PMs keep their systems and workflows unchanged. We just sit on top and aggregate. Plus, we're open-source - you can audit every line of code.

---

## PRICING

### How much does RISKCORE cost?
We have 3 tiers:

**FREE ($0/forever):** Self-hosted, up to 3 data sources, community support, full open-source access

**PRO ($500/month):** Cloud-hosted, unlimited sources, AI query interface, email support, 14-day free trial

**ENTERPRISE (Custom pricing):** Dedicated infrastructure, SSO/SAML, custom integrations, dedicated Customer Success Manager, guaranteed SLAs

Start free and upgrade when you need cloud hosting or premium support.

### Is there a free trial?
Yes! The core platform is completely free and open-source forever. For Pro features, we offer a 14-day free trial with full functionality. No credit card required. Enterprise customers can get a guided proof-of-concept with their actual data.

### Can I switch plans later?
Absolutely. You can upgrade or downgrade at any time. When upgrading, you get immediate access to new features. When downgrading, you keep access until your current billing period ends. No lock-in contracts, cancel anytime.

### Is RISKCORE really free?
Yes! The core RISKCORE platform is fully open source under the MIT license. You can audit the code, modify it, and self-host it entirely for free. Our paid plans add cloud hosting, premium support, and enterprise features - but the core is free forever.

### Why should I pay when it's open source?
Great question! You're paying for:
- Cloud hosting (we manage the infrastructure)
- Premium support with guaranteed response times
- Advanced features like AI query interface
- Enterprise security (SSO, audit logs, compliance)

If you have the DevOps resources to self-host, the free tier is fully functional.

---

## TECHNICAL

### What data sources does RISKCORE support?
We support virtually any data source:
- File-based: CSV, Excel, JSON, XML
- APIs: REST, GraphQL, proprietary endpoints
- Market data: Bloomberg, Reuters, Refinitiv
- Trading: FIX protocol
- Databases: PostgreSQL, MySQL, SQL Server, MongoDB
- Cloud: AWS S3, Google Cloud Storage, Azure Blob

If you have a source we don't support yet, we can build a custom connector.

### Is my data secure with RISKCORE?
Absolutely. Security is our top priority:
- Read-only approach: We never modify your source systems
- Self-hosted option: Data never leaves your infrastructure
- Cloud encryption: AES-256 at rest, TLS 1.3 in transit
- Compliance: SOC 2 Type II certified
- No data sharing: We never share or sell your data

### How does RISKCORE connect to my systems?
RISKCORE uses a read-only, passive approach. We connect as a consumer of your data, never modifying source systems:
- For files (CSV/Excel): Upload or point to a shared drive
- For APIs: We call your endpoints on a schedule you define
- For Bloomberg: Standard B-PIPE or Data License feeds
- For FIX: We connect as a passive drop-copy recipient

Your existing workflows remain completely unchanged.

### How long does implementation take?
Most firms are up and running within 1-2 weeks:
- Day 1-2: Connect first data sources
- Day 3-5: Map and normalize schemas
- Day 5-10: Configure dashboards and alerts
- Ongoing: Add more sources as needed

We handle the heavy lifting - your team's involvement is minimal. Enterprise customers get dedicated implementation support.

### Can RISKCORE handle real-time data?
Yes! RISKCORE supports multiple refresh modes:
- Real-time: Sub-second updates via streaming connections
- Near real-time: Minute-level polling for API sources
- Batch: Scheduled daily/hourly imports for file-based sources

You can mix and match based on each data source's capabilities and your needs.

### What technology is RISKCORE built on?
RISKCORE is built with modern, battle-tested technology:
- Backend: Python, PostgreSQL
- Frontend: React, TypeScript
- Infrastructure: Docker, Kubernetes-ready
- AI: Advanced NLP for natural language queries

The entire codebase is available on GitHub for review.

---

## GETTING STARTED

### How do I get started with RISKCORE?
Getting started is easy:

**FREE/Self-hosted:** Clone our GitHub repo at github.com/massimotodaro/riskcore and follow the setup guide

**PRO/Cloud:** Sign up at riskcore.io and click "Get Early Access" for instant access with a 14-day trial

**ENTERPRISE:** Contact us at hello@riskcore.io for a guided proof-of-concept with your actual data

### Can I see a demo?
Absolutely! You have several options:
1. Visit riskcore.io and click "Get Early Access" to join our beta program
2. Check out our GitHub repo for the open-source code and documentation
3. Book a personalized demo - just leave your email and we'll reach out within 24 hours

What would work best for you?

### Do you offer implementation support?
Yes! Support varies by plan:
- **Free:** Community support via GitHub discussions and Discord
- **Pro:** Email support with 24-hour response time, plus documentation
- **Enterprise:** Dedicated Customer Success Manager, guaranteed SLAs, hands-on implementation assistance

### Can I try before I buy?
Absolutely:
- The open-source version is always free to try
- Pro plans include a 14-day free trial (no credit card required)
- Enterprise customers get a guided proof-of-concept

There's zero risk to getting started.

---

## COMPANY

### Who built RISKCORE?
RISKCORE was built by Massimo Todaro, who spent 20+ years in financial services including roles at major hedge funds and investment banks. He lived the multi-manager risk problem firsthand - dealing with siloed systems, manual spreadsheet aggregation, and delayed risk visibility. He built RISKCORE to solve it once and for all.

### Why is RISKCORE open source?
We believe risk infrastructure shouldn't be a black box. Open source means:
- Full transparency: Audit every line of code
- No vendor lock-in: You own your data and deployment
- Community-driven: Benefit from contributions worldwide
- Trust: See exactly how your data is processed

### Where is RISKCORE based?
RISKCORE is a globally distributed team. Our cloud infrastructure runs on enterprise-grade data centers with options for US, EU, or custom regional deployment to meet your data residency requirements.

### How do I contact RISKCORE?
You can reach us at:
- Email: hello@riskcore.io
- GitHub: github.com/massimotodaro/riskcore
- Website: riskcore.io

We typically respond within 24 hours.

---

## OBJECTION HANDLING

### I want to speak to a human
Of course! Leave your email and our team will get back to you within 24 hours. Or email us directly at hello@riskcore.io - we'd love to chat!

### The pricing seems expensive
I understand budget matters. Remember, our core platform is completely FREE and open-source. You can self-host it at no cost forever. The paid plans are optional - they add cloud hosting and premium support for teams who want a managed solution. Many firms start free and upgrade later.

### We already have a risk system
That's actually perfect for RISKCORE! We don't replace your existing systems - we sit on top of them. Keep using what works, and let RISKCORE aggregate the data across all your systems into one unified view. It's additive, not disruptive.

### Is this just another vendor trying to sell me something?
We get it - you've seen a lot of vendors. Here's why we're different:
1. Open source: The core is free forever, no strings attached
2. Read-only: We never touch your source systems
3. No lock-in: Export your data anytime, self-host if you prefer
4. Transparent: Every line of code is on GitHub

We succeed only if you get real value.

### We don't have budget right now
No problem! Start with our free, self-hosted version. It's fully functional with up to 3 data sources and community support. You can upgrade to paid plans whenever you're ready - there's no pressure and no time limit on the free tier.

---

## QUICK RESPONSES

### Hello / Hi / Hey
Hi there! 👋 Welcome to RISKCORE. I'm here to help you with questions about our multi-manager risk aggregation platform. What would you like to know?

### Thanks / Thank you
You're welcome! Is there anything else I can help you with? Feel free to ask about pricing, features, or how to get started.

### Bye / Goodbye
Thanks for chatting! If you have more questions later, I'm always here. You can also reach us at hello@riskcore.io. Have a great day!

---

## WIDGET SETTINGS

### Recommended Welcome Message
```
👋 Hey! Questions about RISKCORE?

I can help with:
• How multi-manager risk aggregation works
• Pricing and plans
• Getting started with a demo

Ask me anything!
```

### Recommended Quick Buttons
- "How does it work?"
- "See pricing"
- "Book a demo"

### Brand Colors
- Primary: #3b82f6 (blue)
- Background: #0f172a (dark)
- Text: #ffffff (white)
- Accent: #22c55e (green for success states)
