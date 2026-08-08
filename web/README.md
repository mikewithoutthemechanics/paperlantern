# PaperLantern Web — paperlantern.xyz

An experimental, art-directed SPA that demonstrates the Exposure System itself.
The site is the proof: as you scroll, the page executes Position → Content → Distribute → Amplify → Compound.

## Stack

- **Vite** + **React**
- **GSAP** + ScrollTrigger — scroll-driven animation and word-scramble effects
- **Lenis** — buttery smooth scrolling
- **Three.js** — interactive 3D lantern core, orbital rings, shards, lens rays, particle field
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

1. Push repo to GitHub/GitLab.
2. Import in Vercel.
3. Root: `web` (auto-detects Vite).
4. Deploy.

`vercel.json` already configured.

## Creative concepts

| Section | What happens |
|---|---|
| **01 / Position** | Pinned hero — 3D lantern, kinetic headline "It's engineered." |
| **02 / Content** | Word-scramble reveal, source → fragments disperse |
| **03 / Distribute** | Channel frames "wired" to booking/pipeline/search |
| **04 / Amplify** | Infinite marquee rows — one system, infinite output |
| **05 / Compound** | Proof log + animated metric counters |
| **06 / Fence** | What we don't do |

## Customise

- Copy / scenes: `src/App.jsx`
- Styling: `src/styles.css`
- 3D scene: `src/three/LanternScene.jsx`
- Booking link: `BOOKING_URL` constant in `src/App.jsx` (currently `https://cal.com/michaelkidd/exposure-audit`)

## Notes

- Three.js is lazy-loaded (code split) so the main bundle stays lean.
- CTA links book via Cal.com. Payment should be wired into the Cal.com event ($495 Exposure Audit).
