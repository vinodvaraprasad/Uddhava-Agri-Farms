#!/usr/bin/env node
// Upload site media to Vercel Blob and record the public URLs in src/data/media-urls.json.
//
//   npm run media:upload -- <source> [--dry-run]
//
// <source> is either the zip exported from the preview (Prototype tools -> Export media,
// "uddhava-concept-media.zip") or a folder. Default: ./media
// Files are matched to the slots in src/data/media.js by their path, e.g.
//   media/brand/home/hero-rooster-red-brown-profile.jpg   -> slot "hero" (image)
//   media/brand/home/hero-rooster-red-brown-profile.mp4   -> slot "hero" (video)
// A bare file name (hero-rooster-red-brown-profile.jpg) or the slot id (hero.jpg) also works.
//
// The token is read from BLOB_READ_WRITE_TOKEN, or from .env.local / .env
// (`vercel env pull` writes it there once a Blob store is connected to the project).
// Uploaded names contain a content hash, so unchanged files are skipped on re-runs and a
// replaced image gets a new URL (no stale CDN cache).

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const URLS_FILE = join(ROOT, 'src', 'data', 'media-urls.json');
const { MEDIA } = await import(new URL('../src/data/media.js', import.meta.url));

const IMAGE = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif' };
const VIDEO = { '.mp4': 'video/mp4', '.webm': 'video/webm' };
const CONCURRENCY = 4;
const MULTIPART_OVER = 20 * 1024 * 1024;
const ONE_YEAR = 60 * 60 * 24 * 365;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const source = resolve(args.find((a) => !a.startsWith('--')) || join(ROOT, 'media'));

const fail = (msg) => { console.error(`\n✖ ${msg}\n`); process.exit(1); };
const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;

// ---------- 1. Read the source files ----------
async function readSource(src) {
  if (!existsSync(src)) fail(`Not found: ${src}\n  Pass the exported zip or a folder, e.g.  npm run media:upload -- ~/Downloads/uddhava-concept-media.zip`);
  if (statSync(src).isFile()) {
    if (extname(src).toLowerCase() !== '.zip') fail(`${src} is not a .zip file or a folder.`);
    const { default: JSZip } = await import('jszip');
    const zip = await JSZip.loadAsync(readFileSync(src));
    const out = [];
    for (const entry of Object.values(zip.files)) {
      if (entry.dir) continue;
      out.push({ rel: entry.name, read: () => entry.async('nodebuffer') });
    }
    return out;
  }
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name.startsWith('.') || name === 'node_modules') continue;
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else out.push({ rel: relative(src, p).split(sep).join('/'), read: async () => readFileSync(p) });
    }
  };
  walk(src);
  return out;
}

// ---------- 2. Match files to media slots ----------
const byPath = new Map();   // "brand/home/hero-rooster-red-brown-profile" -> id
const byName = new Map();   // "hero-rooster-red-brown-profile" -> id, and "hero" -> id
for (const [id, m] of Object.entries(MEDIA)) {
  const base = m.file.replace(/\.[a-z0-9]+$/i, '');
  byPath.set(base, id);
  byName.set(base.split('/').pop(), id);
  byName.set(id, id);
}

function matchSlot(rel) {
  const clean = rel.replace(/^(\.\/)?(public\/)?(media\/)?/, '');
  const noExt = clean.slice(0, clean.length - extname(clean).length);
  return byPath.get(noExt) || byName.get(noExt.split('/').pop()) || null;
}

// ---------- 3. Token ----------
function readToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN.trim();
  for (const f of ['.env.local', '.env']) {
    const p = join(ROOT, f);
    if (!existsSync(p)) continue;
    const line = readFileSync(p, 'utf8').split(/\r?\n/).find((l) => /^\s*(export\s+)?BLOB_READ_WRITE_TOKEN\s*=/.test(l));
    if (line) return line.split('=').slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  }
  return null;
}

// ---------- main ----------
const files = await readSource(source);
const urls = existsSync(URLS_FILE) ? JSON.parse(readFileSync(URLS_FILE, 'utf8') || '{}') : {};

const jobs = [];
const unmatched = [];
const skipped = [];
const seen = new Set();
for (const f of files) {
  const name = basename(f.rel);
  if (name === 'media-manifest.json' || name.startsWith('.')) continue;
  const ext = extname(name).toLowerCase();
  const kind = IMAGE[ext] ? 'img' : VIDEO[ext] ? 'vid' : null;
  if (!kind) { skipped.push(`${f.rel} (not a supported image/video type)`); continue; }
  const id = matchSlot(f.rel);
  if (!id) { unmatched.push(f.rel); continue; }
  const m = MEDIA[id];
  if (kind === 'vid' && m.kind !== 'video' && !m.video) { skipped.push(`${f.rel} (slot "${id}" does not take a video)`); continue; }
  if (seen.has(`${id}:${kind}`)) { skipped.push(`${f.rel} (another file already fills slot "${id}")`); continue; }
  seen.add(`${id}:${kind}`);
  jobs.push({ ...f, id, kind, ext, contentType: (IMAGE[ext] || VIDEO[ext]) });
}

console.log(`\nSource: ${source}`);
console.log(`Matched ${jobs.length} file(s) to ${new Set(jobs.map((j) => j.id)).size} of ${Object.keys(MEDIA).length} media slots.`);
if (unmatched.length) console.log(`\n⚠ No matching slot (check the file name against src/data/media.js):\n  - ${unmatched.join('\n  - ')}`);
if (skipped.length) console.log(`\n⚠ Skipped:\n  - ${skipped.join('\n  - ')}`);
if (!jobs.length) fail('Nothing to upload.');

const token = dryRun ? null : readToken();
if (!dryRun) {
  const major = Number(process.versions.node.split('.')[0]);
  if (major < 20) fail(`Node ${process.versions.node} is too old for @vercel/blob. Use Node 20 or newer.`);
  if (!token) fail('BLOB_READ_WRITE_TOKEN is not set.\n  Vercel → your project → Storage → Blob store → copy the token, then run:\n    BLOB_READ_WRITE_TOKEN=vercel_blob_rw_... npm run media:upload -- <zip or folder>\n  (or run `vercel env pull` so it lands in .env.local)');
}
const { put } = dryRun ? {} : await import('@vercel/blob');

const save = () => {
  const sorted = Object.fromEntries(Object.keys(MEDIA).filter((id) => urls[id]).map((id) => [id, urls[id]]));
  writeFileSync(URLS_FILE, JSON.stringify(sorted, null, 2) + '\n');
};

let uploaded = 0, unchanged = 0, failed = 0;
async function run(job) {
  const body = await job.read();
  const hash = createHash('sha256').update(body).digest('hex').slice(0, 10);
  const base = MEDIA[job.id].file.replace(/\.[a-z0-9]+$/i, '');
  const pathname = `media/${base}-${hash}${job.ext === '.jpeg' ? '.jpg' : job.ext}`;
  const current = urls[job.id] && urls[job.id][job.kind];
  const label = `${job.id.padEnd(22)} ${job.kind === 'vid' ? 'video' : 'image'}  ${mb(body.length).padStart(9)}`;
  if (current && current.endsWith(`/${pathname}`)) { unchanged++; console.log(`  = ${label}  unchanged`); return; }
  if (dryRun) { console.log(`  → ${label}  ${pathname}`); return; }
  try {
    const res = await put(pathname, body, {
      access: 'public',
      token,
      contentType: job.contentType,
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: ONE_YEAR,
      multipart: body.length > MULTIPART_OVER
    });
    urls[job.id] = { file: MEDIA[job.id].file, ...(urls[job.id] || {}), [job.kind]: res.url };
    save();
    uploaded++;
    console.log(`  ✓ ${label}  ${res.url}`);
  } catch (err) {
    failed++;
    console.log(`  ✖ ${label}  ${err.message}`);
    if (/access|private/i.test(err.message)) console.log('    Hint: the site needs a Blob store with public access.');
  }
}

console.log(dryRun ? '\nDry run, nothing is uploaded:' : '\nUploading to Vercel Blob:');
const queue = [...jobs];
await Promise.all(Array.from({ length: CONCURRENCY }, async () => { while (queue.length) await run(queue.shift()); }));

const missing = Object.keys(MEDIA).filter((id) => !(urls[id] && (urls[id].img || urls[id].vid)) && !jobs.some((j) => j.id === id));
console.log(`\n${dryRun ? 'Dry run done.' : `Done: ${uploaded} uploaded, ${unchanged} unchanged, ${failed} failed.`}`);
if (!dryRun && uploaded) console.log(`URLs written to ${relative(ROOT, URLS_FILE)}. Commit it and push to redeploy.`);
if (missing.length) console.log(`Slots still without media (they show the placeholder): ${missing.join(', ')}`);
console.log('');
if (failed) process.exit(1);
