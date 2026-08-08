# PaperLantern Web — paperlantern.xyz

A captivating single-page site for PaperLantern, built to feel engineered — because the brand is.

## Stack

- **Vite** + **React**
- **GSAP** + ScrollTrigger — scroll-driven reveal animations
- **Three.js** — interactive 3D lantern core + particle field in the hero
- Google Fonts: Inter + JetBrains Mono

## Run locally

```bash
cd web
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

Output lands in `web/dist/`.

## Deploy to Vercel

1. Push this repo to GitHub/GitLab.
2. Import the repo in Vercel as a new project.
3. Root directory: `web` (the Vite app).
4. Vercel auto-detects Vite. Framework preset: **Vite**, build command `npm run build`, output `dist`.
5. Deploy.

## Features / sections

- **Hero** — 3D interactive lantern (Three.js), animated entrance, terminal window
- **Problem** — three cards: positioning / content / distribution
- **System / pillars** — four outcomes: positioning, content, distribution, AI amplification
- **How we work** — Diagnose / Build / Compound
- **Proof** — Punctual Plumbers exposure-system log with animated counters
- **Fence** — what we don't do
- **Final CTA** — Exposure Audit, mailto for now

## Customise

- Copy: `src/App.jsx`
- Styling: `src/styles.css`
- 3D scene: `src/three/LanternScene.jsx`
- Metrics / proofs: `metrics` array in `src/App.jsx`

## Notes

- CTA is currently `mailto:hello@paperlantern.xyz`. Swap for a real booking link (Cal.com / scheduling in EspoCRM) when ready.
- Currency-aware pricing isn't wired into the UI yet; that's a next enhancement for the audit/productized offering.
