# Somashekhar S. Anad – Portfolio

Dark, minimal portfolio with an interactive 3D globe as the centrepiece. Pure HTML, CSS and vanilla JavaScript: one stylesheet, no frameworks, no build step.

Live: https://YOUR-USERNAME.github.io/portfolio/

## Credential
ABB Certified ReliaQuote Small Project Specialist. Verify: https://www.credly.com/badges/55aab926-018b-4b22-8e56-af446c737d95

## LinkedIn
`downloads/LINKEDIN.md` (headline, About, Featured), `downloads/linkedin-banner.png`, `downloads/linkedin-featured-reliaquote.png`.

## Structure
- `css/style.css`: the only stylesheet (design tokens at the top)
- `js/globe.js`: canvas 3D globe (dots, data arcs, pulses, drag)
- `js/main.js`: theme, reveal, filters, command palette (Ctrl/Cmd+K), mobile drawer, tab bar, contact sheet
- `ai/guide.js` + `ai/guide.css`: Sam, the animated guide (tours, Q&A, optional voice)
- `data/portfolio.json` + `js/data.js`: content used by the dashboard and the guide
- `images/projects/*.svg`: project covers

## Edit
Change colours in the `:root` block of `css/style.css` (`--accent`, `--accent-2`). Page text lives in the HTML files; guide narration is in each element's `data-guide` attribute.

## Deploy (GitHub Pages)
Upload everything to the repo root → Settings → Pages → Deploy from branch `main` / root.

## Contact
+91 95915 57311 · +91 76193 60105 · somashekhar.s.anad@gmail.com
