# RISKCORE Website - Claude Code Master Prompt

## 🎯 CRITICAL: READ THIS FIRST

Before starting ANY work, and BEFORE EVERY "memory reset" (context compression), you MUST:

1. **Read these files** to understand current project state:
   - `STATE.md` - Current task status and what's completed
   - `ROADMAP.md` - Overall project phases and milestones
   - `CLAUDE.md` - Project context and technical specs
   - `README.md` - Project documentation

2. **After completing any task**:
   - Update `STATE.md` with completed work
   - Update `ROADMAP.md` if milestone reached
   - Commit and push all changes with descriptive message
   - Update `README.md` if needed

3. **Before memory reset**:
   - Save ALL context to `STATE.md`
   - Include: current task, blockers, next steps, decisions made
   - Commit and push immediately

---

## 📋 PROJECT OVERVIEW

**Project**: RISKCORE Marketing Website  
**Repository**: https://github.com/massimotodaro/riskcore-website  
**Owner**: Massimo Todaro  
**Deployment**: Vercel

### What is RISKCORE?
An open-source multi-manager risk aggregation platform for hedge funds. It solves the problem of firm-wide risk visibility when PMs use different systems (Bloomberg, Axioma, Excel, etc.).

**Key Value Proposition:**
> "Don't replace PM systems. Aggregate them."

RISKCORE is a READ-ONLY overlay that ingests data from any source, normalizes it, and provides real-time aggregated risk views with AI-powered natural language queries.

---

## 🛠️ TECH STACK

| Technology | Version | Notes |
|------------|---------|-------|
| Next.js | 16+ | App Router |
| React | 18+ | TypeScript |
| Tailwind CSS | v3.4+ | **NOT v4** |
| Framer Motion | Latest | Animations |
| Fonts | Inter + Space Grotesk | Google Fonts |

---

## 🎨 DESIGN SYSTEM

Reference: `designs/Riskboard.html`

### Colors
```css
/* Backgrounds */
--bg-primary: #0f172a;
--bg-secondary: #1e293b;

/* Brand */
--blue: #3b82f6;
--green: #22c55e;
--purple: #a855f7;
--cyan: #06b6d4;
--yellow: #eab308;

/* Text */
--text-primary: #f1f5f9;
--text-secondary: #e2e8f0;
--text-muted: #94a3b8;

/* Borders */
--border: rgba(255, 255, 255, 0.1);
```

### Typography
- **Headings**: Space Grotesk (700 weight)
- **Body**: Inter (400 weight)
- **Code/Metrics**: SF Mono, monospace

### Card Style
```css
background: rgba(30, 41, 59, 0.9);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
```

---

## 📄 PAGE STRUCTURE

### 1. Home Page (`/`)
- Hero section with animated dashboard preview
- Key stats (Open Source, Read-Only, AI-Powered)
- Trust badges and social proof
- Primary CTA: "Get Early Access"
- AI Chatbot widget (bottom right)

### 2. Why RISKCORE Page (`/why-riskcore`)
- Problem statement (The Multi-Manager Risk Nightmare)
- Solution explanation (Don't Replace, Aggregate)
- How it works (3-step process)
- Before/After comparison

### 3. Features & Pricing Page (`/pricing`)
- Features grid with icons
- 3-tier pricing comparison table (like Vanta)
- Free vs Pro vs Enterprise
- Feature comparison matrix

### 4. About Page (`/about`)
- Founder story (Massimo Todaro)
- Credentials (20+ years finance, Barclays Capital, CFA)
- Open source philosophy
- Contact information

---

## 🎬 ANIMATED DASHBOARD

The hero section MUST include an animated version of `Riskboard.html`:

### Animation Requirements:
1. **Typing effect** for AI query input
2. **Number counting** animations for metrics
3. **Data flow** visualization (particles/lines)
4. **Card hover effects** with subtle glow
5. **Live updating** numbers (simulated)
6. **Gradient pulse** on key elements

### Implementation Options:
1. **Framer Motion** - For React component animations
2. **Lottie** - For complex pre-made animations
3. **CSS Keyframes** - For simple repeating animations
4. **GSAP** - For advanced timeline animations

### Recommended Approach:
Convert `Riskboard.html` to a React component with:
- Framer Motion for enter/exit animations
- CSS keyframes for continuous effects
- Canvas/Three.js for particle backgrounds (optional)

---

## 🤖 AI CHATBOT WIDGET

Like Vanta's implementation, add an AI assistant widget:

### Features:
- Fixed position (bottom-right corner)
- Expand/collapse animation
- Chat interface
- Pre-populated quick questions
- Branded styling

### Implementation:
Use one of these options:
1. **Intercom** (free tier available)
2. **Crisp** (free for 2 seats)
3. **Tawk.to** (completely free)
4. **Custom build** with Claude API (if budget allows)

For MVP, recommend **Crisp** or **Tawk.to** - both free and embeddable.

---

## 📧 EMAIL NEWSLETTER

**Recommended**: **MailerLite** (Free Plan)
- Up to 1,000 subscribers
- 12,000 emails/month
- Automation included
- Landing pages
- Easy integration

### Setup:
1. Create MailerLite account
2. Create subscriber group "Beta Waitlist"
3. Get embed form code
4. Add to website CTA sections

---

## 💰 PRICING TIERS

| Feature | Free | Pro ($500-2K/mo) | Enterprise |
|---------|------|------------------|------------|
| Users | 1 | Up to 10 | Unlimited |
| Data Sources | CSV only | CSV, API, FIX | All + Custom |
| Risk Metrics | Basic | Advanced | Full Suite |
| AI Queries | 10/day | Unlimited | Unlimited + Custom |
| Support | Community | Email | Dedicated + SLA |
| Deployment | Self-hosted | Cloud or Self | On-premise option |
| Security | Basic | MFA | SSO/SAML |
| Correlation Framework | ❌ | ❌ | ✅ |

---

## 🌐 DOMAIN RECOMMENDATIONS

### Available Options (verify before purchasing):
1. **RISKCORE.io** - Best for fintech/SaaS ($30-55/year)
2. **RISKCORE.app** - Modern, tech-focused
3. **RISKCORE.dev** - Developer-oriented
4. **RISKCORE.co** - Professional alternative
5. **RISKCORE.ai** - If adding AI emphasis ($80+/year)

### Registration:
- Use **Cloudflare Registrar** (at-cost pricing, no markup)
- Or **Namecheap** (good prices, easy transfer to Vercel)

### Vercel Setup:
1. Add domain in Vercel dashboard
2. Configure DNS (nameservers or CNAME)
3. Enable automatic SSL

---

## ™️ TRADEMARK RISKCORE

### USPTO Registration Process:

1. **Search First** (Free)
   - Use USPTO TESS: https://tmsearch.uspto.gov
   - Search for existing "RISKCORE" marks
   - Check for similar marks in Class 9 (software) and Class 42 (SaaS)

2. **File Application** ($350/class)
   - File at: https://www.uspto.gov/trademarks
   - Class 9: Downloadable software
   - Class 42: SaaS, cloud computing
   - Total: ~$700 for both classes

3. **Timeline**
   - Initial review: 3-4 months
   - Publication: 5-6 months
   - Registration: 8-12 months

4. **Maintenance**
   - Section 8 Declaration: Years 5-6 ($325/class)
   - Renewal: Every 10 years ($650/class)

### Tips:
- File as "intent to use" if not yet in commerce
- Consider hiring a trademark attorney ($500-1500)
- Register domain before trademark (faster)

---

## 📁 PROJECT STRUCTURE

```
riskcore-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # Home
│   ├── globals.css
│   ├── why-riskcore/
│   │   └── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   └── about/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── AnimatedDashboard.tsx
│   │   ├── TrustBadges.tsx
│   │   └── CTASection.tsx
│   ├── why-riskcore/
│   │   ├── Problem.tsx
│   │   ├── Solution.tsx
│   │   └── HowItWorks.tsx
│   ├── pricing/
│   │   ├── Features.tsx
│   │   ├── PricingTable.tsx
│   │   └── ComparisonMatrix.tsx
│   ├── about/
│   │   ├── FounderStory.tsx
│   │   └── OpenSource.tsx
│   ├── shared/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── NewsletterForm.tsx
│   │   └── ChatWidget.tsx
│   └── ui/                      # Reusable UI components
├── lib/
│   ├── constants.ts
│   └── utils.ts
├── public/
│   ├── images/
│   └── fonts/
├── designs/
│   └── Riskboard.html           # Reference design
├── STATE.md                     # Current task status
├── ROADMAP.md                   # Project milestones
├── CLAUDE.md                    # Project context
├── README.md                    # Documentation
└── package.json
```

---

## ✅ DETAILED TO-DO LIST

### Phase 1: Project Setup (Day 1)
- [ ] **1.1** Create GitHub repository `riskcore-website`
- [ ] **1.2** Initialize Next.js 16 with TypeScript
- [ ] **1.3** Configure Tailwind CSS v3.4
- [ ] **1.4** Set up project structure (folders)
- [ ] **1.5** Add Google Fonts (Inter + Space Grotesk)
- [ ] **1.6** Create `STATE.md` and `ROADMAP.md`
- [ ] **1.7** Update `CLAUDE.md` and `README.md`
- [ ] **1.8** Create design system (colors, typography, components)
- [ ] **1.9** Set up Vercel deployment
- [ ] **1.10** First commit and push

### Phase 2: Layout Components (Day 1-2)
- [ ] **2.1** Create Header component with navigation
- [ ] **2.2** Create Footer component
- [ ] **2.3** Create responsive Navigation (mobile menu)
- [ ] **2.4** Create shared Button component
- [ ] **2.5** Create shared Card component
- [ ] **2.6** Create layout wrapper with animations
- [ ] **2.7** Test responsive design
- [ ] **2.8** Commit and push

### Phase 3: Home Page (Day 2-3)
- [ ] **3.1** Create Hero section with headline and CTAs
- [ ] **3.2** Convert Riskboard.html to React component
- [ ] **3.3** Add animations to dashboard preview
- [ ] **3.4** Create trust badges section
- [ ] **3.5** Create CTA section with newsletter form
- [ ] **3.6** Add scroll animations (Framer Motion)
- [ ] **3.7** Test and optimize
- [ ] **3.8** Commit and push

### Phase 4: Why RISKCORE Page (Day 3-4)
- [ ] **4.1** Create Problem section (pain points)
- [ ] **4.2** Create Solution section (how we solve it)
- [ ] **4.3** Create How It Works (3-step process)
- [ ] **4.4** Add icons and illustrations
- [ ] **4.5** Add animations
- [ ] **4.6** Test and optimize
- [ ] **4.7** Commit and push

### Phase 5: Pricing Page (Day 4-5)
- [ ] **5.1** Create Features grid
- [ ] **5.2** Create 3-tier pricing cards
- [ ] **5.3** Create comparison matrix table (like Vanta)
- [ ] **5.4** Add toggle for monthly/yearly (if applicable)
- [ ] **5.5** Add CTAs for each tier
- [ ] **5.6** Add FAQ accordion (optional)
- [ ] **5.7** Test and optimize
- [ ] **5.8** Commit and push

### Phase 6: About Page (Day 5)
- [ ] **6.1** Create Founder section with bio
- [ ] **6.2** Create credentials/trust section
- [ ] **6.3** Create Open Source philosophy section
- [ ] **6.4** Add social links
- [ ] **6.5** Test and optimize
- [ ] **6.6** Commit and push

### Phase 7: Integrations (Day 6)
- [ ] **7.1** Set up MailerLite account
- [ ] **7.2** Integrate newsletter form
- [ ] **7.3** Add chat widget (Crisp or Tawk.to)
- [ ] **7.4** Add analytics (Google Analytics or Plausible)
- [ ] **7.5** Test all integrations
- [ ] **7.6** Commit and push

### Phase 8: Polish & Launch (Day 6-7)
- [ ] **8.1** SEO optimization (meta tags, OG images)
- [ ] **8.2** Performance optimization (images, lazy loading)
- [ ] **8.3** Accessibility check (WCAG 2.1 AA)
- [ ] **8.4** Cross-browser testing
- [ ] **8.5** Mobile responsiveness final check
- [ ] **8.6** Lighthouse audit (target 90+)
- [ ] **8.7** Connect custom domain
- [ ] **8.8** Final commit and push
- [ ] **8.9** Announce launch! 🚀

---

## 🔄 MEMORY MANAGEMENT PROTOCOL

### Before Context Compression (Memory Reset):

1. **Update STATE.md** with:
   ```markdown
   ## Last Updated: [DATE/TIME]
   
   ### Current Task
   [What you're working on]
   
   ### Completed in This Session
   - [List of completed items]
   
   ### Next Steps
   1. [Immediate next task]
   2. [Following task]
   
   ### Blockers/Issues
   - [Any problems encountered]
   
   ### Decisions Made
   - [Important decisions and reasoning]
   
   ### Files Modified
   - [List of changed files]
   ```

2. **Commit and push**:
   ```bash
   git add .
   git commit -m "WIP: [current task] - saving before memory reset"
   git push
   ```

### After Memory Reset:

1. **Read files in order**:
   - STATE.md
   - ROADMAP.md
   - CLAUDE.md
   - README.md

2. **Resume from Next Steps** in STATE.md

3. **Verify last commit** was pushed

---

## 🎯 SUCCESS CRITERIA

- [ ] All 4 pages completed and responsive
- [ ] Animated dashboard in hero section
- [ ] Newsletter integration working
- [ ] Chat widget functional
- [ ] Lighthouse score 90+
- [ ] Deployed to Vercel
- [ ] Custom domain connected
- [ ] All documentation updated

---

## 📞 IMPORTANT REMINDERS

1. **ALWAYS** commit after completing each task
2. **ALWAYS** push before memory reset
3. **ALWAYS** read STATE.md after memory reset
4. **NEVER** use Tailwind v4
5. **NEVER** skip documentation updates
6. **ALWAYS** match the Riskboard.html design style

---

*This prompt should be saved and referenced throughout the project.*
