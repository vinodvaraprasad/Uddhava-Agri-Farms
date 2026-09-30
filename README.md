# Uddhava Agri Farms — website frontend (v0.4)

React 18 + Vite 5 + CSS Modules. Frontend only: no backend, database, CRM, payments, cart or checkout.

## Commands
```
npm install
npm run dev             # local development
npm run build           # production build → dist/ (normal URLs, no prototype tools)
npm run build:preview   # single-file preview → dist-preview/index.html (hash URLs, prototype tools on)
```

## Hosting (production)
The site is a single-page app with normal URLs (`/birds`, `/birds/UAF-R-001`).
The host must serve `index.html` for unknown paths (SPA rewrite), for example:
- Netlify: `public/_redirects` containing `/*  /index.html  200`
- Vercel: a rewrite of `/(.*)` to `/index.html`
For best search visibility, add prerendering or move to static generation before launch.

## Structure
```
src/
  components/   Header, Footer, Button, Media (concept vs real), BirdCard, BreedCard,
                BirdListing (search/filters/sort), Lightbox, Accordion, PageHero, EnquiryCTA
  pages/        Home, Breeds, BreedDetail, Birds (all/roosters/hens), BirdDetail, OurFarm,
                About, Gallery, Contact, Faq, Privacy, NotFound
  data/         site.js (confirmed facts), inventory.js (DEMO birds), varieties.js (DEMO),
                appearances.js, gallery.js, faq.js, nav.js, media.js (image slots + prompts)
  i18n/         I18nProvider.jsx, locales/en.json, locales/te.json
  lib/          whatsapp.js, hooks.js, mediaStore.jsx (preview-only media tools)
  styles/       global.css (design tokens)
public/media/   permanent home for approved images (paths listed in data/media.js)
```

## Content rules built into the data
- `inventory.js` is demonstration data. Every record has `demo: true`. Replace it with real records.
- Real bird records: `breedConfirmed` must be true before the variety is used in WhatsApp messages;
  `breedingHistory` and `health` stay `null` (shown as pending) until the farm provides them.
- Bird listings only ever show real photos of that bird. Concept images are never used for inventory.
- An empty FAQ answer in the locale files means "pending" and is shown as awaiting confirmation.
- No prices anywhere.

## Adding a language
Copy `src/i18n/locales/en.json` to `<code>.json`, translate every value (keep keys and `{placeholders}`),
then register it in `LANGUAGES` in `src/i18n/I18nProvider.jsx`. Only register complete translations.
Telugu (te.json) must be reviewed by a native speaker before launch.

## Before launch (open items)
- Final logo choice (A/B/C concepts in the preview's Prototype tools)
- Re-confirm WhatsApp number in `src/data/site.js`
- Real inventory, breed list, farm photos and videos
- Owner's story, people, farm routine, FAQ policies (visits, delivery, service areas, reservations)
- Privacy policy review; business phone and full address if they are to be published
