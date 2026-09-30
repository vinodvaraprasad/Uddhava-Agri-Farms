import { useEffect, useRef } from 'react';
import { MEDIA } from '../data/media.js';
import { useMedia } from '../lib/mediaStore.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useInView, prefersReducedMotion } from '../lib/hooks.js';
import Icon from './Icon.jsx';
import s from './Media.module.css';

const cx = (...a) => a.filter(Boolean).join(' ');

// Class A: brand concept visual. Always marked as a placeholder until real farm media replaces it.
// placeholderOnly: always show the empty placeholder here, even when the slot has media (used on the sale pages).
export function ConceptMedia({ id, tone = 'sage', className, hoverPlay = false, children, round = false, badge, placeholderOnly = false }) {
  const m = MEDIA[id];
  const { items, edit: editing, pick, remove, openPrompt } = useMedia();
  const edit = editing && !placeholderOnly;
  const { t } = useI18n();
  const it = (!placeholderOnly && items[id]) || {};
  const [ref, inView] = useInView({ threshold: 0.25 });
  const vref = useRef(null);
  const isVideo = m?.kind === 'video';
  const has = !!(it.imgUrl || it.vidUrl);

  useEffect(() => {
    const v = vref.current; if (!v) return;
    if (inView && !hoverPlay && !prefersReducedMotion()) v.play().catch(() => {}); else v.pause();
  }, [inView, hoverPlay, it.vidUrl]);

  if (!m) return null;
  const label = it.vidUrl ? t('media.conceptVideo') : t('media.placeholder');
  return (
    <div ref={ref} className={cx(s.slot, s.a, round && s.round, has && s.has, className)} data-tone={tone}
      role="img" aria-label={`${label}: ${m.title}`}
      onMouseEnter={hoverPlay ? () => vref.current?.play().catch(() => {}) : undefined}
      onMouseLeave={hoverPlay ? () => vref.current?.pause() : undefined}>
      {it.vidUrl
        ? <video ref={vref} className={s.media} src={it.vidUrl} poster={it.imgUrl || undefined} muted loop playsInline preload="metadata" />
        : it.imgUrl && <img className={s.media} src={it.imgUrl} alt="" decoding="async" />}
      {isVideo && !it.vidUrl && <span className={s.vstate}><Icon name="video" /><span>{t('media.videoPlaceholder')}</span></span>}
      {isVideo && it.imgUrl && !it.vidUrl && <span className={s.playOff} aria-hidden="true"><Icon name="play" /></span>}
      <span className={cx(s.badge, round && s.badgeRound, (badge === 'top' || (isVideo && !it.vidUrl)) && s.badgeTop)}><i>A</i><span>{label}</span></span>
      {edit && !has && (
        <div className={s.empty}>
          <span className={s.emptyTitle}>{m.title}</span><span className={s.emptySpec}>{m.ratio}</span>
          <div className={s.tools}>
            <button type="button" className={cx(s.tool, s.toolPrimary)} onClick={(e) => { e.preventDefault(); e.stopPropagation(); pick(id, 'img'); }}><Icon name="upload" /><span>{t(isVideo ? 'proto.addPoster' : 'proto.addImage')}</span></button>
            {(isVideo || m.video) && <button type="button" className={s.tool} onClick={(e) => { e.preventDefault(); e.stopPropagation(); pick(id, 'vid'); }}><Icon name="video" /><span>{t('proto.addVideo')}</span></button>}
            <button type="button" className={s.tool} onClick={(e) => { e.preventDefault(); e.stopPropagation(); openPrompt(id); }}><Icon name="text" /><span>{t('proto.prompt')}</span></button>
          </div>
        </div>
      )}
      {edit && has && (
        <div className={s.corner}>
          <button type="button" className={s.round} aria-label={t('proto.replace')} onClick={(e) => { e.preventDefault(); e.stopPropagation(); pick(id, 'img'); }}><Icon name="upload" /></button>
          {(isVideo || m.video) && <button type="button" className={s.round} aria-label={t('proto.addVideo')} onClick={(e) => { e.preventDefault(); e.stopPropagation(); pick(id, 'vid'); }}><Icon name="video" /></button>}
          <button type="button" className={s.round} aria-label={t('proto.prompt')} onClick={(e) => { e.preventDefault(); e.stopPropagation(); openPrompt(id); }}><Icon name="text" /></button>
          <button type="button" className={s.round} aria-label={t('proto.remove')} onClick={(e) => { e.preventDefault(); e.stopPropagation(); remove(id); }}><Icon name="close" /></button>
        </div>
      )}
      {children}
    </div>
  );
}

// Class B: real inventory media. Never accepts concept images.
export function RealMedia({ kind = 'photo', className, compact = false }) {
  const { t } = useI18n();
  const video = kind === 'video';
  return (
    <div className={cx(s.slot, s.b, compact && s.compact, className)} role="img" aria-label={t(video ? 'media.realVideo' : 'media.realPhoto')}>
      <div className={s.real}>
        <Icon name={video ? 'video' : 'camera'} />
        {!compact && <b>{t(video ? 'media.realVideo' : 'media.realPhoto')}</b>}
        {!compact && <span>{t('media.realOnly')}</span>}
      </div>
    </div>
  );
}
