# Harsh Bhati Portfolio — PRD

## Original Problem Statement
Single-page developer portfolio with dark Marvel Spider-Man theme — deep midnight blue (#0a0e1a) + crimson red (#c0392b), web-like SVG decorations, red neon accents, cinematic Marvel-tech vibe. Sections: Hero, About, Skills, Projects (bento), Experience timeline, Achievements, Positions, Contact. Floating music widget bottom-right (play/pause), continuous glitch on HARSH BHATI title, custom red web-dot cursor, sticky frosted navbar with red underline on active link.

## User Choices (Dec 2025 build)
- Music: play only on user click (no autoplay)
- Audio: try Google Drive direct link first → SoundHelix CDN fallback
- Custom cursor: always active site-wide (desktop)
- Glitch effect: continuous subtle
- Font: agent's choice — used Orbitron (hero) + Bebas Neue (section titles) + Inter (body) + JetBrains Mono (accents)

## Tech Stack
- React 19 (CRA + Craco), Tailwind (base only), pure CSS theme, FontAwesome 6 CDN
- No backend changes needed (static SPA)

## Implemented (v1 · Dec 2025)
- Hero with parallax radial spider-web SVG, glitching name, badge, socials, scroll indicator
- About with bio + 3 stat cards (CodeForces 1231, active projects, leadership)
- Skills grid (6 categories with FontAwesome icons + skill pills)
- Projects bento (7 cards: OperaIQ, CommunityPulse, Drift Detector, Infinite Feed, Virtual Makeup, SHL Recommender, Multi-Agent Path Planning)
- Experience timeline (AgriHub LSTM research, tochan.ai MCP agents)
- Achievements (Silver Medal IITISoC'24, Inter IIT 13.0, CodeForces 1231)
- Positions (4 leadership roles)
- Contact card with personal + institute email, phone, GitHub, LinkedIn
- Floating music widget (bottom-right) with play/pause, pulse ring, EQ bars; optimistic UI state
- Custom red web-dot cursor (dot + animated ring with dashed/dotted spinners)
- Sticky frosted navbar with active-link red underline (IntersectionObserver)
- Smooth scroll, scroll-reveal fade-up via IntersectionObserver
- Mobile responsive with drawer menu

## Testing
- iteration_1.json — 97% pass · only LOW: music UI toggle on audio failure (fixed via optimistic state)

## Backlog
- P1: Host the actual Spider-Man theme MP3 in /app/frontend/public/audio/ to avoid Drive CORS
- P2: Add resume PDF download CTA
- P2: Blog / writeups section pulling from Markdown or Medium RSS
- P2: 3D Spider-Man logo cursor easter egg
