import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import JSZip from 'jszip';
import { MEDIA, MEDIA_IDS, STYLE, VIDEO_NOTE } from '../data/media.js';
import MEDIA_URLS from '../data/media-urls.json';
import { useI18n } from '../i18n/I18nProvider.jsx';
import styles from './mediaStore.module.css';

// Prototype-only tooling (placing concept images, prompts, export) is compiled in
// only for the preview build.
export const PROTOTYPE = import.meta.env.VITE_PROTOTYPE_TOOLS === 'true';

// Published media hosted on Vercel Blob: slot id -> { imgUrl, vidUrl }.
// data/media-urls.json is written by `npm run media:upload`; do not edit it by hand.
// Every build (production and preview) starts from these; in the preview, images
// placed with the prototype tools override them slot by slot.
const PUBLISHED = Object.fromEntries(
  Object.entries(MEDIA_URLS)
    .filter(([id, u]) => MEDIA[id] && u && (u.img || u.vid))
    .map(([id, u]) => [id, { imgUrl: u.img || null, vidUrl: u.vid || null }])
);

const DB = 'uaf-prototype';       // same store as prototypes v2/v3, so placed images carry over
const Ctx = createContext(null);

function idb() {
  return new Promise((res, rej) => {
    try {
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = () => r.result.createObjectStore('slots');
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    } catch (e) { rej(e); }
  });
}
async function tx(mode, fn) {
  const db = await idb();
  return new Promise((res, rej) => {
    const t = db.transaction('slots', mode);
    const out = fn(t.objectStore('slots'));
    t.oncomplete = () => res(out && out.result);
    t.onerror = () => rej(t.error);
  });
}
const get = (k) => tx('readonly', (s) => s.get(k)).catch(() => null);
const put = (k, v) => tx('readwrite', (s) => s.put(v, k)).catch(() => null);
const del = (k) => tx('readwrite', (s) => s.delete(k)).catch(() => null);

async function shrink(file) {
  if (!window.createImageBitmap) return file;
  try {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, 2400 / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas');
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise((r) => c.toBlob((b) => r(b || file), 'image/jpeg', 0.88));
  } catch { return file; }
}

export const fullPrompt = (id) => {
  const m = MEDIA[id];
  return `${m.p}\n\n${STYLE}${m.kind === 'video' || m.video ? `\n\n${VIDEO_NOTE}` : ''}\n\nAspect ratio ${m.ratio}.`;
};

export function MediaProvider({ children }) {
  const { t } = useI18n();
  const [items, setItems] = useState(PUBLISHED);    // id -> { img, vid, imgUrl, vidUrl }
  const [edit, setEdit] = useState(false);
  const [logo, setLogoState] = useState(() => { try { return localStorage.getItem('uaf-logo') || 'a'; } catch { return 'a'; } });
  const [promptId, setPromptId] = useState(null);
  const [gate, setGate] = useState(null);           // { id, which, blob, url }
  const [checks, setChecks] = useState([]);
  const [toastMsg, setToastMsg] = useState('');
  const fileRef = useRef(null);
  const target = useRef(null);
  const toastTimer = useRef();

  const toast = useCallback((m) => {
    setToastMsg(m); clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(''), 3200);
  }, []);
  const setLogo = (l) => { setLogoState(l); try { localStorage.setItem('uaf-logo', l); } catch { /* ignore */ } };

  const setMedia = useCallback((id, which, blob) => {
    setItems((prev) => {
      const cur = { ...(prev[id] || {}) };
      const urlKey = which === 'vid' ? 'vidUrl' : 'imgUrl';
      if (cur[urlKey] && cur[urlKey].startsWith('blob:')) URL.revokeObjectURL(cur[urlKey]);
      cur[which] = blob || null;
      cur[urlKey] = blob ? URL.createObjectURL(blob) : null;
      return { ...prev, [id]: cur };
    });
  }, []);

  // Load everything placed in earlier prototypes (including v2 slot names via `legacy`)
  useEffect(() => {
    if (!PROTOTYPE) return;
    (async () => {
      for (const id of MEDIA_IDS) {
        let img = await get(id);
        const vid = await get(`${id}::video`);
        if (!img && MEDIA[id].legacy) {
          for (const key of MEDIA[id].legacy) { img = await get(key); if (img) { put(id, img); break; } }
        }
        if (img) setMedia(id, 'img', img);
        if (vid) setMedia(id, 'vid', vid);
      }
    })();
  }, [setMedia]);

  const pick = (id, which) => {
    target.current = { id, which };
    const input = fileRef.current;
    input.value = '';
    input.accept = which === 'vid' ? 'video/mp4,video/webm' : 'image/*';
    input.click();
  };
  const onFile = async () => {
    const f = fileRef.current.files && fileRef.current.files[0];
    if (!f || !target.current) return;
    const { id, which } = target.current;
    if (which === 'vid' && f.size > 60 * 1024 * 1024) { toast(t('proto.tooBig')); return; }
    const blob = which === 'vid' ? f : await shrink(f);
    setChecks(t('proto.gate').map(() => false));
    setGate({ id, which, blob, url: URL.createObjectURL(blob) });
  };
  const place = () => {
    const g = gate; if (!g) return;
    URL.revokeObjectURL(g.url);
    setMedia(g.id, g.which, g.blob);
    put(g.which === 'vid' ? `${g.id}::video` : g.id, g.blob);
    setGate(null);
    toast(t(g.which === 'vid' ? 'proto.placedVid' : 'proto.placedImg'));
  };
  const remove = (id) => { setMedia(id, 'img', null); setMedia(id, 'vid', null); del(id); del(`${id}::video`); };

  const exportMedia = async () => {
    const ids = MEDIA_IDS.filter((id) => items[id] && (items[id].img || items[id].vid));
    if (!ids.length) { toast(t('proto.noMedia')); return; }
    try {
      const downloads = window.claude && window.claude.use ? await window.claude.use('downloads') : null;
      if (!downloads) { toast(t('proto.exportNA')); return; }
      const zip = new JSZip(); const manifest = [];
      ids.forEach((id) => {
        const it = items[id], m = MEDIA[id], base = m.file.replace(/\.(jpg|mp4)$/, '');
        if (it.img) { const f = `media/${base}.jpg`; zip.file(f, it.img); manifest.push({ slot: id, file: f, type: 'image', status: 'concept-placeholder', demo: !!m.demo }); }
        if (it.vid) { const f = `media/${base}${(it.vid.type || '').includes('webm') ? '.webm' : '.mp4'}`; zip.file(f, it.vid); manifest.push({ slot: id, file: f, type: 'video', status: 'concept-placeholder', demo: !!m.demo }); }
      });
      zip.file('media-manifest.json', JSON.stringify({ project: 'Uddhava Agri Farms', note: 'Concept placeholder media for design approval. Not photographs of the farm or its birds.', exported: new Date().toISOString(), items: manifest }, null, 2));
      const blob = await zip.generateAsync({ type: 'blob' });
      await downloads.save({ filename: 'uddhava-concept-media.zip', data: blob });
      toast(t('proto.exportDone', { n: manifest.length }));
    } catch (err) {
      if (err && err.code === 'declined') return;
      toast(t('proto.exportFail'));
    }
  };

  const copyPrompt = async () => {
    try { await navigator.clipboard.writeText(fullPrompt(promptId)); toast(t('proto.copied')); }
    catch {
      const el = document.getElementById('uaf-prompt-text');
      const r = document.createRange(); r.selectNodeContents(el);
      const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    }
  };

  const count = MEDIA_IDS.filter((id) => items[id] && (items[id].img || items[id].vid)).length;
  const value = { items, edit: PROTOTYPE && edit, setEdit, pick, remove, openPrompt: setPromptId, exportMedia, count, total: MEDIA_IDS.length, logo, setLogo, toast };
  const allChecked = checks.length > 0 && checks.every(Boolean);

  return (
    <Ctx.Provider value={value}>
      {children}
      {PROTOTYPE && (
        <>
          <input ref={fileRef} type="file" hidden onChange={onFile} />
          {promptId && (
            <div className={styles.backdrop} role="presentation" onClick={(e) => e.target === e.currentTarget && setPromptId(null)}>
              <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="uaf-prompt-title">
                <h2 id="uaf-prompt-title" className={styles.title}>{MEDIA[promptId].title}</h2>
                <p className={styles.meta}>{MEDIA[promptId].ratio}</p>
                <code className={styles.file}>{t('proto.file')}: media/{MEDIA[promptId].file}</code>
                <div id="uaf-prompt-text" className={styles.prompt}>{fullPrompt(promptId)}</div>
                <div className={styles.actions}>
                  <button type="button" className={styles.btn} onClick={() => setPromptId(null)}>{t('a11y.close')}</button>
                  <button type="button" className={`${styles.btn} ${styles.primary}`} onClick={copyPrompt}>{t('proto.copy')}</button>
                </div>
              </div>
            </div>
          )}
          {gate && (
            <div className={styles.backdrop} role="presentation">
              <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="uaf-gate-title">
                <h2 id="uaf-gate-title" className={styles.title}>{t('proto.gateTitle')}</h2>
                <p className={styles.meta}>{MEDIA[gate.id].title}</p>
                <div className={styles.gate}>
                  <div className={styles.preview}>
                    {gate.which === 'vid' ? <video src={gate.url} muted loop autoPlay playsInline controls /> : <img src={gate.url} alt="" />}
                  </div>
                  <div className={styles.checks}>
                    {t('proto.gate').map((label, i) => (
                      <label key={label}><input type="checkbox" checked={!!checks[i]} onChange={(e) => setChecks((c) => c.map((v, j) => (j === i ? e.target.checked : v)))} /> {label}</label>
                    ))}
                  </div>
                </div>
                <p className={styles.note}>{t('proto.gateNote')}</p>
                <div className={styles.actions}>
                  <button type="button" className={styles.btn} onClick={() => { URL.revokeObjectURL(gate.url); setGate(null); }}>{t('proto.cancel')}</button>
                  <button type="button" className={`${styles.btn} ${styles.primary}`} disabled={!allChecked} onClick={place}>{t('proto.place')}</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div className={`${styles.toast} ${toastMsg ? styles.show : ''}`} role="status" aria-live="polite">{toastMsg}</div>
    </Ctx.Provider>
  );
}

export const useMedia = () => useContext(Ctx);
