Live demo: https://ivonnewebsite.vercel.app/

# Ivonne Wijaya — Portfolio

Single-page personal portfolio for Ivonne Wijaya (Year-2 Computer Science, NTU).
"Clean-girl editorial florals": warm cream backgrounds, blush pinks, a rose accent,
frosted glass, an editorial serif with italic accent words, and gentle floral motion.

Built to match the bundled design handoff (`design_handoff_portfolio/`) pixel-for-pixel.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** wired to the design tokens; the bespoke visuals are authored as
  plain CSS in `app/globals.css` (ported verbatim from the reference) for pixel fidelity
- **next/font** for Cormorant Garamond, Hanken Grotesk, JetBrains Mono
- **Lenis** for smooth scrolling; scroll-driven set-pieces use native scroll + rAF + CSS vars
- Section reveals via `IntersectionObserver`; all motion honors `prefers-reduced-motion`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Structure

```
app/
  layout.tsx        fonts, metadata, <SmoothScroll/>
  page.tsx          section composition
  globals.css       design tokens + all component & section CSS
components/
  icons.tsx         line UI icons + filled brand glyphs + Floret mark
  ui/               Button, IconButton, GlassCard, Tag, Avatar, NavLink, SectionLabel
  motion/           Reveal, Petals, SmoothScroll
  sections/         Nav, Hero, About, Projects, Bloom, Skills, Contact
public/
  elements/*        watercolor florals + keepsake cut-outs (webp)
  brand/floret.svg  the six-petal mark
  ivonne-headshot.jpeg
```

## Signature set-pieces

- **Hero** — two edge-anchored, asymmetric flower clusters in 3 depth layers, with
  entrance slide-in, idle sway, rAF-lerped pointer parallax, and scroll part-out.
  Right cluster carries a rotating stem-fade mask; a radial cream veil glazes the center.
- **"The fuller picture"** — a pinned, scroll-scrubbed bloom: one CSS var `--p` (0..1)
  drives the gathered bouquet opening, a descending frosted disc, and four facet cards
  staggering in. Falls back to a static stacked layout at `≤1024px` or reduced-motion.

## Deploying to Vercel

Import the repo, framework preset **Next.js**, default build settings. No env vars.

## Content notes (placeholders)

- **Résumé** button (`Contact`) links to `#` — wire it to a real PDF when supplied
  (drop the PDF in `public/` and update the `href` in `components/sections/Contact.tsx`).
- **Project thumbnails** use botanical specimens on tinted panels; swap in real
  screenshots for KINGS Cup / Gamify / Splitly when available (`components/sections/Projects.tsx`).
- Contact links are live: email `ivonnew0714@gmail.com`,
  GitHub `Ivonne828`, LinkedIn `ivonnewijayaa`.
```
