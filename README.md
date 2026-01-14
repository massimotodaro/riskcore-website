# RISKCORE Website

Marketing website for RISKCORE - Open Source Multi-Manager Risk Aggregation Platform.

## About RISKCORE

RISKCORE is an open-source risk aggregation platform for multi-manager hedge funds. It solves a critical problem: **no platform directly addresses firm-wide risk aggregation** across different PM systems.

**Key Value Proposition:**
> "Don't replace PM systems. Aggregate them."

RISKCORE is a READ-ONLY overlay that:
- Ingests data from ANY source (CSV, FIX, API)
- Normalizes to a common schema
- Provides real-time aggregated views
- Enables natural language queries via AI

## Tech Stack

- **Next.js 14+** with App Router
- **React 18** with TypeScript
- **Tailwind CSS v3.4** (NOT v4)
- **Framer Motion** for animations
- **Fonts**: Inter + Space Grotesk

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
riskcore-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── why-riskcore/
│   │   ├── pricing/
│   │   └── about/
│   └── components/
│       ├── layout/
│       ├── home/
│       └── shared/
├── designs/
│   └── Riskboard.html
├── STATE.md
├── ROADMAP.md
└── CLAUDE.md
```

## Design System

Based on the Riskboard dashboard design:

### Colors
- **Background**: #0f172a (dark slate)
- **Card BG**: #1e293b
- **Primary Blue**: #3b82f6
- **Success Green**: #22c55e
- **Text Primary**: #f1f5f9

### Typography
- **Headings**: Space Grotesk (700 weight)
- **Body**: Inter (400 weight)
- **Code**: SF Mono

## Links

- **Live Site**: Coming soon
- **GitHub**: https://github.com/massimotodaro/riskcore-website
- **Main RISKCORE Repo**: https://github.com/massimotodaro/riskcore

## Owner

**Massimo Todaro**
- 20+ years finance (Barclays Capital, Luperco Capital)
- CFA Charterholder

---

*Open Source Multi-Manager Risk Aggregation*
