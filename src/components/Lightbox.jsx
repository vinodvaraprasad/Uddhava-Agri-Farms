import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MEDIA } from '../data/media.js';
import { useMedia } from '../lib/mediaStore.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useFocusTrap, useScrollLock } from '../lib/hooks.js';
import Icon from './Icon.jsx';
import s from './Lightbox.module.css';

export default function Lightbox({ items, index, onClose, onIndex }) {
  const { t } = useI18n();
  const { items: store } = useMedia();
  const ref = useRef(null);
  const vref = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [fade, setFade] = useState(false);
  const touch = useRef(null);
  const open = index !== null && index !== undefined;
  useScrollLock(open);
  useFocusTrap(open, ref, onClose);

  const go = (d) => { setFade(true); setTimeout(() => { onIndex((index + d + items.length) % items.length); setFade(false); }, 140); };
  useEffect(() => {
    if (!open) return undefined;
    const key = (e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  });
  useEffect(() => { setPlaying(true); }, [index]);
  useEffect(() => { const v = vref.current; if (!v) return; v.muted = muted; if (playing) v.play().catch(() => {}); else v.pause(); }, [playing, muted, index]);
  if (!open) return null;

  const item = items[index];
  const m = MEDIA[item.media];
  const it = store[item.media] || {};
  const cap = t(item.cap);
  const isVideo = m.kind === 'video';
  return createPortal(
    <div className={s.lb} ref={ref} role="dialog" aria-modal="true" aria-label={t('a11y.gallery')} tabIndex={-1}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { if (touch.current === null) return; const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); touch.current = null; }}>
      <div className={s.top}>
        <span className={s.cap}>{cap}{(it.imgUrl || it.vidUrl) && <span className={s.label}> · {t(it.vidUrl ? 'media.conceptVideo' : 'media.placeholder')}</span>}</span>
        <button type="button" className={s.btn} onClick={onClose} aria-label={t('a11y.close')}><Icon name="close" /></button>
      </div>
      <div className={`${s.stage} ${fade ? s.fading : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
        {it.vidUrl ? (
          <div className={s.videoWrap}>
            <video ref={vref} key={it.vidUrl} className={s.media} src={it.vidUrl} poster={it.imgUrl || undefined} autoPlay muted loop playsInline />
            <div className={s.vctl}>
              <button type="button" className={s.btn} onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}><Icon name={playing ? 'pause' : 'play'} /></button>
              <button type="button" className={s.btn} onClick={() => setMuted((v) => !v)} aria-label={muted ? 'Unmute' : 'Mute'}><Icon name={muted ? 'mute' : 'sound'} /></button>
            </div>
          </div>
        ) : it.imgUrl ? (
          <div className={s.videoWrap}>
            <img className={s.media} src={it.imgUrl} alt={cap} />
            {isVideo && <span className={s.poster}><Icon name="video" />{t('media.videoPlaceholder')}</span>}
          </div>
        ) : (
          <div className={s.ph}><Icon name={isVideo ? 'video' : 'image'} /><b>{cap}</b><span>{t(isVideo ? 'media.noVideoYet' : 'media.noMediaYet')}</span></div>
        )}
      </div>
      <div className={s.bar}>
        <button type="button" className={s.btn} onClick={() => go(-1)} aria-label={t('a11y.previous')}><Icon name="arrow" style={{ transform: 'rotate(180deg)' }} /></button>
        <span aria-live="polite">{index + 1} / {items.length}</span>
        <button type="button" className={s.btn} onClick={() => go(1)} aria-label={t('a11y.next')}><Icon name="arrow" /></button>
      </div>
    </div>, document.body);
}
