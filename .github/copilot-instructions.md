This repo is a small static single-page frontend for the "Pró-Ativa Eletrônica" raffle UI. The goal of these instructions is to make an AI coding assistant immediately productive editing the site and following project-specific patterns.

Key facts
- Tech: plain HTML/CSS (single page `index.html`), static assets in `assets/img/`. No build system or package manager present.
- Locale: content and copy are in Portuguese (`lang="pt-BR"` in `index.html`).
- Layout: most styling is inline in the `<head>` of `index.html` using CSS variables defined on `:root`.

Files to inspect first
- `index.html` — the single source of truth for layout, inline styles, and markup.
- `assets/img/` — image assets (logos). Add new images here and reference them relative to `index.html`.
- `js/` and `css/` directories exist but are currently empty. Add behaviour JS files to `js/` and include them at the end of `index.html`.

Project patterns and conventions
- Keep global design tokens in the `:root` CSS variables inside `index.html` (e.g. `--brand`, `--bg0`). Prefer using these variables when adding colors or shadows.
- Visual components are plain HTML elements with utility-like classes (examples: `.card`, `.btn.primary`, `.hero`). Reuse existing class names rather than creating many new ones where possible.
- Images: place files in `assets/img/` and reference via `assets/img/<name>`. Example: `<img src="assets/img/bit-lab-logo.png" class="logo">`.
- Scripts: put new scripts under `js/` and include `<script src="js/your-file.js"></script>` before `</body>`.

Developer workflows (how to run and test locally)
- No build step: open `index.html` directly in a browser for quick checks.
- For local web server (recommended for relative asset paths), run:
  - `python -m http.server 8000` (from repo root) and open `http://localhost:8000/`
  - or use VS Code Live Server.

Concrete examples
- Add logo: put `new-logo.png` in `assets/img/` then update the brand block in `index.html`:
  `<img src="assets/img/new-logo.png" class="logo">`
- Add a new primary button using existing style: `<a class="btn primary">Comprar</a>`
- Add behavior file: create `js/raffle.js` and include at bottom of `index.html`:
  `<script src="js/raffle.js"></script>`

What to avoid
- Don't move CSS variables out of `index.html` without updating the markup that expects them.
- Don't assume a Node/npm toolchain exists — no `package.json` is present.

When you make changes
- Keep edits small and focused (this repo is a single-page app).
- When adding assets, update paths under `assets/img/` and verify references in `index.html`.

If something is unclear or you want more coverage (tests, CI, or adding a build step), tell me which area you want expanded and I'll update this file.
