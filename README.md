# DEADLIGHT

React/Vite viewer for the DEADLIGHT visual-system specification — the canonical
rulebook plus its supporting specs.

## Structure

- `src/artifacts/v2/` — the April 2, 2026 canonical rulebook (DEADLIGHT-SPEC-V2.0.0).
- `src/artifacts/v1/` — the March 28, 2026 referenced specs (Decision Matrix,
  Stress Test Frames, Case Study Package) and the superseded System Identity.
- `src/tokens.js` — the color + type protocol made executable. One source for
  every accent, neutral, font, and type-scale value the artifacts render with.
- `src/components/` — shared primitives and the material/type visual specimens.
- `src/library.js` — artifact registry, section maps, and hash-route parsing.

## Features

- **Deep-link routing** — `#<artifact>/<section>` addresses any section; the
  sidebar and in-artifact tabs stay in sync. Bare `#<artifact>` canonicalizes.
- **Search** over artifact titles, doc IDs, and section labels.
- **Visual specimens** — material registers render as CSS textures; type
  registers render as live specimens in their own voice.
- **How to apply** — a worked example resolving one brief through the matrix to
  a finished frame.
- **Print / PDF** — the toolbar button prints the active artifact (the full
  rulebook for v2) via the browser's save-as-PDF.
- Responsive layout; WCAG-AA label contrast; non-color status encoding.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
