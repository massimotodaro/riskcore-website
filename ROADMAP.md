# RISKCORE Website - Project Roadmap

> Marketing website for RISKCORE - Open Source Multi-Manager Risk Aggregation

---

## Project Goal
Build a professional, conversion-focused marketing website that:
- Clearly communicates RISKCORE's value proposition
- Captures beta signups via email
- Establishes credibility with hedge fund buyers
- Drives GitHub traffic

---

## Timeline Overview

| Phase | Description | Duration | Status |
|-------|-------------|----------|--------|
| Phase 1 | Project Setup | Day 1 | Complete |
| Phase 2 | Layout Components | Day 1-2 | Complete |
| Phase 3 | Home Page | Day 2-3 | Complete |
| Phase 4 | Why RISKCORE Page | Day 3-4 | Complete |
| Phase 5 | Pricing Page | Day 4-5 | Complete |
| Phase 6 | About Page | Day 5 | Complete |
| Phase 7 | Integrations | Day 6 | Complete |
| Phase 8 | Polish & Launch | Day 6-7 | Complete |
| Phase 9 | Post-Launch Improvements | Ongoing | In Progress |

**Status Legend**: Not Started | In Progress | Complete

---

## Milestones

### Milestone 1: Foundation Ready ✅
**Target**: End of Day 1
**Criteria**:
- [x] GitHub repo created
- [x] Next.js project initialized
- [x] Tailwind configured
- [x] Deployed to Vercel (basic)
- [x] Project documentation in place

### Milestone 2: Layout Complete ✅
**Target**: End of Day 2
**Criteria**:
- [x] Header with navigation working
- [x] Footer complete
- [x] Mobile menu functional
- [x] Shared components ready
- [x] All pages route correctly

### Milestone 3: Home Page Live ✅
**Target**: End of Day 3
**Criteria**:
- [x] Hero section with animations
- [x] Animated dashboard preview
- [x] Trust badges visible
- [x] Newsletter form functional
- [x] Fully responsive

### Milestone 4: All Pages Complete
**Target**: End of Day 5
**Criteria**:
- [ ] Why RISKCORE page done
- [ ] Pricing page with comparison table
- [ ] About page with founder info
- [ ] All animations working
- [ ] All responsive

### Milestone 5: Integrations Working ✅
**Target**: End of Day 6
**Criteria**:
- [x] Newsletter form submits to MailerLite
- [x] Chat widget active (Crisp)
- [x] Analytics tracking (Google Analytics)
- [x] All forms validated

### Milestone 6: Launch Ready ✅
**Target**: End of Day 7
**Criteria**:
- [x] Lighthouse score 90+
- [x] All pages SEO optimized
- [x] Custom domain connected (riskcore.io)
- [x] No console errors
- [x] Cross-browser tested
- [x] Mobile perfect

---

## Phase Details

### Phase 1: Project Setup
```
Duration: Day 1
Tasks: 10
Dependencies: None
Status: COMPLETE
```

**Deliverables**:
- GitHub repository with initial commit
- Working Next.js 16 project
- Tailwind CSS configured
- Project structure in place
- Vercel deployment pipeline

### Phase 2: Layout Components
```
Duration: Day 1-2
Tasks: 8
Dependencies: Phase 1
Status: COMPLETE
```

**Deliverables**:
- Reusable Header component
- Reusable Footer component
- Mobile navigation
- Design system components (Button, Card)

### Phase 3: Home Page
```
Duration: Day 2-3
Tasks: 8
Dependencies: Phase 2
Status: COMPLETE
```

**Deliverables**:
- Hero section with headline and CTAs
- Animated Riskboard dashboard
- Trust badges
- Newsletter signup form
- Scroll animations

### Phase 4: Why RISKCORE Page
```
Duration: Day 3-4
Tasks: 7
Dependencies: Phase 2
Status: COMPLETE
```

**Deliverables**:
- Problem statement section
- Solution explanation
- 3-step process visualization
- Supporting animations

### Phase 5: Pricing Page
```
Duration: Day 4-5
Tasks: 8
Dependencies: Phase 2
Status: COMPLETE
```

**Deliverables**:
- Features grid
- 3-tier pricing cards
- Comparison matrix (like Vanta)
- CTAs per tier

### Phase 6: About Page
```
Duration: Day 5
Tasks: 6
Dependencies: Phase 2
Status: COMPLETE
```

**Deliverables**:
- Founder bio and credentials
- Open source philosophy
- Social links

### Phase 7: Integrations
```
Duration: Day 6
Tasks: 6
Dependencies: Phase 3
Status: COMPLETE
```

**Deliverables**:
- MailerLite newsletter integration (API route)
- Chat widget (Crisp integration)
- Analytics setup (Google Analytics)

### Phase 8: Polish & Launch
```
Duration: Day 6-7
Tasks: 9
Dependencies: All
Status: COMPLETE
```

**Deliverables**:
- SEO optimization (sitemap.ts, robots.txt, enhanced metadata)
- Performance optimization (next.config optimizations)
- Accessibility compliance (ARIA labels, keyboard navigation)
- Custom domain (riskcore.io)
- Live website!

### Phase 9: Post-Launch Improvements
```
Duration: Ongoing
Tasks: TBD
Dependencies: Phase 8
Status: IN PROGRESS
```

**Completed**:
- ✅ All environment variables configured in Vercel
- ✅ Supabase integration verified (newsletter signups working)
- ✅ Google Analytics configured (G-E6X7RL7LSV)
- ✅ Tawk.to chat widget active (replaced Crisp)
- ✅ Resend email notifications configured

**Upcoming**:
- Website design improvements
- Content refinements
- Performance optimizations
- User feedback iterations

---

## Progress Tracking

### Overall Progress
```
[####################] 100% Complete 🎉
```

### Tasks by Phase
| Phase | Total | Done | Progress |
|-------|-------|------|----------|
| Setup | 10 | 10 | 100% |
| Layout | 8 | 8 | 100% |
| Home | 8 | 8 | 100% |
| Why | 7 | 7 | 100% |
| Pricing | 8 | 8 | 100% |
| About | 6 | 6 | 100% |
| Integrations | 6 | 6 | 100% |
| Polish | 9 | 9 | 100% |
| **TOTAL** | **62** | **62** | **100%** |

---

## Key Links

| Resource | URL |
|----------|-----|
| GitHub Repo | https://github.com/massimotodaro/riskcore-website |
| Vercel Project | Connected |
| Live Site | https://riskcore.io |
| Design Reference | `designs/Riskboard.html` |
| MailerLite | [To be added] |

---

## Notes

### Design Decisions
- Dark theme matching Riskboard.html (#0f172a background)
- Glass morphism cards with backdrop blur
- Space Grotesk for headings, Inter for body

### Technical Decisions
- Next.js 16+ with App Router
- Tailwind CSS v3.4 (NOT v4)
- Framer Motion for animations
- TypeScript throughout

### Lessons Learned
*None yet*

---

## History

| Date | Milestone | Notes |
|------|-----------|-------|
| 2026-01-14 | Project Started | GitHub repo created |
| 2026-01-14 | Website Launched | All 8 phases complete, live at riskcore.io |
| 2026-01-15 | Integrations Verified | All env vars configured, Supabase/GA/Tawk.to working |

---

*Last updated: 2026-01-15 12:30 UTC*
