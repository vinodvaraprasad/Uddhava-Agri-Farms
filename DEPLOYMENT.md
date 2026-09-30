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

## Images and videos (Vercel Blob)
Images placed with the preview's prototype tools live only in that browser, so the live site
never had them. Site media is now hosted on Vercel Blob, and the public URLs are listed in
`src/data/media-urls.json` (slot id → `img` / `vid`). Every build reads that file.

One-time setup: Vercel → the project → Storage → Create → Blob, with **public** access, and
connect it to the project. Copy its `BLOB_READ_WRITE_TOKEN` (or run `vercel env pull` to
write it into `.env.local`, which is not committed). Needs Node 20 or newer.

To publish or replace media:
1. In the preview, open Prototype tools → Export media. That saves `uddhava-concept-media.zip`.
   (A folder works too: name files after the paths in `src/data/media.js`, e.g.
   `media/brand/home/hero-rooster-red-brown-profile.jpg`, or after the slot id, e.g. `hero.jpg`.
   A `.mp4` with the same name is the video for that slot.)
2. Check the matching without uploading:
       npm run media:upload -- ~/Downloads/uddhava-concept-media.zip --dry-run
3. Upload:
       BLOB_READ_WRITE_TOKEN=vercel_blob_rw_... npm run media:upload -- ~/Downloads/uddhava-concept-media.zip
   This writes the Blob URLs into `src/data/media-urls.json`. Unchanged files are skipped on re-runs.
4. Commit `src/data/media-urls.json` and push. Vercel redeploys with the images.

Concept images keep their "Placeholder image" label on the site. Sale inventory (bird listings
and bird pages) never uses these slots.

## Before public launch (V4 content as approved)
- V4 shows 16 sample birds and 6 sample varieties marked DEMO, and image areas labelled "Placeholder image".
  Replace them with real inventory and real farm/bird photos (slots listed in `src/data/media.js`,
  uploaded with `npm run media:upload`).
- The WhatsApp number in `src/data/site.js` must be confirmed by the owner.
