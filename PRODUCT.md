# Lokeshwaran Ramu Portfolio – Product Brief

*This document captures the product context for the portfolio website. It is the reference for all design decisions and features.*

## Product Overview

**Name:** Lokeshwaran Ramu Portfolio  
**URL:** https://lokeshwaranramu.com/  
**Platform:** Web (React + Vite)  
**Audience:** Potential employers, clients, collaborators in Salesforce ecosystem  
**Primary Goal:** Showcase skills, projects, and experience as a Senior Salesforce Developer & Solution Architect  

## User Persona

- **Who:** Hiring managers, CTOs, Salesforce partners, potential clients
- **When:** Referred from LinkedIn, GitHub, or direct search
- **What they want:** Quick proof of expertise, past work, technical depth, contact/download options
- **How long:** 2–5 min skim; some spend 10+ min on case studies

## Core Features (MVP)

1. **Hero Section** – Name, title, profile photo, CTA buttons (Get in Touch, View Work)
2. **About / Summary** – Brief bio, key stats, availability badge
3. **Skills Grid** – Languages, frameworks, tools, certifications
4. **Project Showcase** – 3D cards with modals, links to live demos
5. **Experience Timeline** – Career history, roles, responsibilities
6. **Case Studies** – Deep dives into major projects (Salesforce, integration, architecture)
7. **Certifications** – 6x Salesforce certifications with badges
8. **Contact Form** – Email capture, direct outreach
9. **Resume Download** – PDF + DOCX versions in header and/or footer
10. **Mobile Menu** – Hamburger nav for small screens with resume link

## Design System & Brand

### Colors
- **Primary:** `#0284c7` (Cyan-blue)
- **Secondary:** `#4f46e5` (Purple)
- **Accent:** `#db2777` (Pink/Magenta)
- **Background:** `#ffffff` (White)
- **Text:** `#0f172a` (Near-black)
- **Muted:** `#94a3b8` (Gray)

### Typography
- **Font Stack:** Inter (body), Space Grotesk (headings)
- **Title:** 64px (desktop), 2.2rem (mobile)
- **Section Heading:** clamp(2rem, 5vw, 3rem)
- **Body:** 16px

### Layout & Spacing
- **Container:** Max 1200px, padding 2rem (desktop), 1rem (mobile)
- **Section Gap:** 8rem (desktop), 5rem (mobile)
- **Radius:** 8px (sm), 16px (md), 24px (lg), 999px (pill)

## Key Technical Decisions

1. **Framework:** React 18 + Vite for fast builds
2. **Animations:** Framer Motion (motion/react) for smooth, declarative animation
3. **Particles & Canvas:** Custom particle constellation in hero (responsive count: 35 mobile, 60 tablet, 100 desktop)
4. **Custom Cursor:** Magnetic dual-circle cursor (disabled on touch devices)
5. **Responsive:** Mobile-first, breakpoints at 600px, 930px
6. **Accessibility:** ARIA labels, keyboard nav, reduced-motion support, 44–48px touch targets
7. **Performance:** Code-splitting, lazy image loading, optimized animations

## Known Issues / Backlog

1. ~~Infinite scroll on mobile~~ (Fixed)
2. ~~Download resume not in mobile header~~ (Fixed)
3. ~~Hero typo "Ssalesforce"~~ (Fixed)
4. ~~Two cursors in typewriter~~ (Fixed)

## Success Metrics

- Page load < 3s (Lighthouse Performance > 80)
- Mobile responsiveness: full accessibility at 320px–1920px
- Contact/Download engagement: CTR on CTA buttons
- Time on page: case studies and project modals retain visitors

---

**Last Updated:** 2026-09-04  
**Status:** Active (Production)  
**Platform:** Adaptive (Web, desktop & mobile)
