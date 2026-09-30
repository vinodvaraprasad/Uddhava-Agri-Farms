# Deployment — Uddhava Agri Farms V4

The V4 source is unchanged. Two files were added for production hosting:
- `vercel.json` — builds with Vite (`npm run build` → `dist`) and rewrites page URLs to `index.html`,
  so direct links and refreshes (e.g. `/birds/UAF-R-001`) work. Real files are always served first.
- `.gitignore` — keeps `node_modules/` and build output out of Git.

Keep `.env.production` committed: it sets `VITE_ROUTER=browser` (normal URLs) and
`VITE_PROTOTYPE_TOOLS=false` (no prototype tools). It contains no secrets.

## Local
    npm install
    npm run dev       # development
    npm run build     # production build → dist/
    npm run preview   # serve the production build locally

## GitHub + Vercel
1. `git init && git add . && git commit -m "Uddhava Agri Farms V4"`
2. Create an empty GitHub repository and push to it.
3. In Vercel: Add New Project → import the repository → Deploy (settings come from `vercel.json`).
4. Add the domain uddhavaagrifarms.in in Vercel → Settings → Domains once it is purchased.

## Before public launch (V4 content as approved)
- V4 shows 16 sample birds and 6 sample varieties marked DEMO, and image areas labelled "Placeholder image".
  Replace them with real inventory and real farm/bird photos (paths listed in `src/data/media.js`, files in `public/media/`).
- The WhatsApp number in `src/data/site.js` must be confirmed by the owner.
