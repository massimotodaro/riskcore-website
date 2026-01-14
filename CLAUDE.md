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

## Pages to Build

1. **Home** (`/`) - Hero, animated dashboard, trust badges
2. **Why RISKCORE** (`/why-riskcore`) - Problem, solution, how it works
3. **Pricing** (`/pricing`) - Features grid, 3-tier comparison
4. **About** (`/about`) - Founder story, credentials

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
