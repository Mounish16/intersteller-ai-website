# Intersteller AI Website

**Live site: [intersteller.co.uk](https://intersteller.co.uk)**

I designed and built the marketing website for Intersteller AI: an engineering-AI company whose Plasma platform and DesignGraph product family serve defence, aerospace, nuclear, space, automotive, healthcare and semiconductor programmes.

This repository is a showcase. It describes the project and includes a few sample components. **The full source code is private.**

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8)

## What I built

- A multi-page marketing site of about 30 routes: home, products, industries, pricing, company, blog, docs, legal pages and demo booking.
- A distinctive visual identity: an animated dot-field hero, a particle wordmark that assembles itself, scroll-driven 3D morphing sections and smooth, inertial scrolling.
- An industry page system: a reusable template drives the sector pages (aerospace, automotive, defence, healthcare, nuclear, semiconductor, space and Industry 5.0), each with its own capabilities and domains.
- A pricing view with team and individual plans and add-on logic.
- A demo-booking flow that embeds Microsoft Bookings in the site.
- Privacy consent handling and structured legal pages driven from content files.
- Two delivery paths from one codebase: a standard Next.js server build and a static export for shared hosting.

## Tech stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Motion and 3D | Framer Motion, GSAP, Lenis, three.js with React Three Fiber |
| Booking | Microsoft Bookings embed |
| Hosting | Static export on shared hosting |
| Quality | Strict TypeScript, ESLint, a CI pipeline that type-checks and builds on every push |

## Design and engineering decisions

- **Performance first.** Heavy libraries such as Lenis are loaded lazily, and animations pause or turn off on touch devices where they add little and cost battery.
- **Content separate from layout.** Legal text and structured copy live in content files, and the industry pages share one template, so changing wording does not mean touching components.
- **One codebase, two outputs.** A single environment switch produces either a normal server build or a fully static site, so the same code serves local development, a Node host and cPanel hosting.
- **Safe defaults.** Secrets and local certificates are never committed, and the booking embed needs only one optional environment variable.
- **Smooth motion.** Reveal effects use `IntersectionObserver` and CSS transitions rather than scroll listeners, which keeps scrolling smooth.

## Code samples

A few self-contained components are in [`samples/`](samples):

- [`SmoothScroll.tsx`](samples/SmoothScroll.tsx): inertial scrolling that loads on demand and skips touch devices.
- [`ScrollReveal.tsx`](samples/ScrollReveal.tsx): reusable scroll-triggered reveal with direction, distance and timing controls.
- [`MagneticButton.tsx`](samples/MagneticButton.tsx): a cursor-following button driven by a requestAnimationFrame loop.

## Notes

The website, name, logos and content belong to Intersteller AI and its parent company. The sample components are shown for demonstration and are not licensed for reuse. All rights reserved.
