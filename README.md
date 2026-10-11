# Aizen Portfolio — Interactive Book

A portfolio built as a physical-feeling book on a dark desk. Drag a page
corner, swipe, use the arrow keys, or jump with the chapter tabs and the
contents menu.

## Run it

```bash
npm install
npm run dev        # development
npm run build      # production build into dist/
```

Deploys anywhere static (Vercel, Netlify, GitHub Pages). There is a single
route, so no rewrite rules are needed.

## How it's built

- React 18 + Vite + Tailwind. Page turning uses `react-pageflip`.
- Every page is authored on a fixed 440 x 640 canvas and scaled to fit, so
  layouts are identical on phone and desktop. Phones show one page at a time.
- Content lives in two files: `src/data/projects.js` (the 7 projects) and
  `src/data/profile.js` (bio, experience, education, contact details, FAQ).
- The project illustrations (`src/components/art/Art.jsx`) are original
  SVG/CSS drawings, not screenshots, and are labelled "Illustration".

## Performance

- Only the visible spread is rendered and animated.
- Animations pause automatically if the device runs under ~22 fps, and there
  is an Animations switch in the contents menu. `prefers-reduced-motion` is
  respected.

## Things worth knowing

- Styles on page roots must be CSS classes, never inline styles: the flip
  library rewrites the root element's inline style (this is what made the
  first version's cover invisible).
- The message form opens the visitor's email app (`mailto:`). Nothing is sent
  from the page itself.
- The profile photo lives at `src/assets/me.jpg` (a 520x520 crop) and is used in
  `src/components/pages/IntroPages.jsx`. Swap the file to change it. The build is
  set to embed small images (`assetsInlineLimit` in `vite.config.js`).
- No CV or project screenshots exist yet, so those are not shown.
- Project years and repo links were removed on purpose because they were not
  confirmed. Only the RSU Symposium live site is linked.

## Page-turning notes (hard-won, please keep)

- The list of pages passed to `HTMLFlipBook` must stay the same object between
  renders (it is wrapped in `useMemo` in `App.jsx`). If it changes, the
  library removes and re-inserts every page, which made pages flash on each turn.
- Touch swipes are handled in `App.jsx`, not by the library. Its own swipe logic
  only accepts gestures under 0.25s and turns the page the wrong way for slower
  swipes. Mouse dragging still uses the library.
- Backward turns in single-page (phone) mode only work if click-to-flip is
  briefly enabled; `turn()` in `App.jsx` does that.
- Chapter and contents jumps use `turnToPage` with a fade, because the library's
  `flip(n)` can overshoot.
- Wide windows always get a two-page spread, even when short.
