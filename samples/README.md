# Code samples

Three small, self-contained components from the site. They are shown here as examples of the approach; the full source is kept private.

| File | What it does |
|---|---|
| [`SmoothScroll.tsx`](SmoothScroll.tsx) | Lazy-loads [Lenis](https://lenis.darkroom.engineering/) for inertial scrolling, and skips it on touch devices |
| [`ScrollReveal.tsx`](ScrollReveal.tsx) | Reveals content as it scrolls into view, using `IntersectionObserver` and CSS transitions with configurable direction, distance, delay and duration |
| [`MagneticButton.tsx`](MagneticButton.tsx) | A button that eases toward the cursor with a requestAnimationFrame loop, and is disabled on touch devices |

They are React 19 client components written in TypeScript and have no dependency other than React (and Lenis for the first).
