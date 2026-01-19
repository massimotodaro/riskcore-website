# RISKCORE Website - Claude Context

## CRITICAL: Read STATE.md First

After any memory reset, ALWAYS read `STATE.md` to understand current project state.

## Project Overview

**Repository**: https://github.com/massimotodaro/riskcore-website
**Owner**: Massimo Todaro
**Deployment**: Vercel

### What is RISKCORE?

Open-source multi-manager risk aggregation platform for hedge funds.

**Key Message:**
> "Don't replace PM systems. Aggregate them."

### Target Audience

1. CROs at multi-manager hedge funds ($1B-$50B AUM)
2. Risk Analysts tired of spreadsheet aggregation
3. COOs managing regulatory reporting

## Tech Stack

| Technology | Version | Notes |
|------------|---------|-------|
| Next.js | 14+ | App Router |
| React | 18+ | TypeScript |
| Tailwind CSS | v3.4+ | **NOT v4** |
| Framer Motion | Latest | Animations |
| Fonts | Inter + Space Grotesk | Google Fonts |

## Design System

Reference: `designs/Riskboard.html`

### Colors
```css
--bg-primary: #0f172a;
--bg-secondary: #1e293b;
--blue: #3b82f6;
--green: #22c55e;
--purple: #a855f7;
--text-primary: #f1f5f9;
--text-muted: #94a3b8;
```

### Card Style
```css
background: rgba(30, 41, 59, 0.9);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
```

## Pages (All Complete ✅)

1. **Home** (`/`) - Hero, animated dashboard, trust badges ✅
2. **Why RISKCORE** (`/why-riskcore`) - Problem, solution, how it works ✅
3. **Pricing** (`/pricing`) - Features grid, 3-tier comparison ✅
4. **About** (`/about`) - Founder story, credentials ✅

## Live Integrations (All Configured ✅)

| Integration | Purpose | Status |
|-------------|---------|--------|
| Supabase | Newsletter signups (`website_subscribers` table) | ✅ Active |
| MailerLite | Email campaigns | ✅ Configured |
| Resend | Transactional emails | ✅ Configured |
| Tawk.to | Live chat widget with AI bot | ✅ Active |
| Google Analytics | Traffic tracking (G-E6X7RL7LSV) | ✅ Active |

### Environment Variables (All in Vercel)
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=***
MAILERLITE_API_KEY=***
RESEND_API_KEY=***
NOTIFICATION_EMAIL=***
NEXT_PUBLIC_GA_ID=G-E6X7RL7LSV
NEXT_PUBLIC_TAWKTO_PROPERTY_ID=***
NEXT_PUBLIC_TAWKTO_WIDGET_ID=***
```

## Where to Check Things

| What | Where |
|------|-------|
| Newsletter signups | Supabase → Table Editor → `website_subscribers` |
| Traffic analytics | Google Analytics → Reports → Realtime |
| Chat conversations | Tawk.to Dashboard |
| Deployments | Vercel Dashboard |

## Workflow Rules

1. **ALWAYS** read STATE.md after memory reset
2. **ALWAYS** update STATE.md after completing tasks
3. **ALWAYS** commit and push after each task
4. **NEVER** use Tailwind v4
5. **NEVER** skip documentation updates

## Git Commands

```bash
# After completing task
git add .
git commit -m "Complete: [task description]"
git push

# Before memory reset
git add .
git commit -m "WIP: [current task] - saving state"
git push
```

## Key Files

- `STATE.md` - Current task status
- `ROADMAP.md` - Project phases
- `designs/Riskboard.html` - Visual reference
- `context/` - Business documentation

## FRONTEND CHANGES PROTOCOL

Before making ANY CSS/styling changes:
1. Read DESIGN-SYSTEM.md completely
2. Identify the CURRENT values in the code
3. State the EXACT changes: "Changing X from Y to Z"
4. After changes, list all modified classes

NEVER use:
- Arbitrary values not in the design system
- Different spacing than specified
- Colors not in the approved palette

When user reports something "looks wrong":
- Ask which SPECIFIC property is wrong
- Ask what the DESIRED value should be
- Reference DESIGN-SYSTEM.md for the correct value