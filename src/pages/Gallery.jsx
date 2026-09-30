import { useMemo, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useDocTitle } from '../lib/hooks.js';
import { GALLERY, GALLERY_FILTERS } from '../data/gallery.js';
import PageHero from '../components/PageHero.jsx';
import { ConceptMedia } from '../components/Media.jsx';
import Lightbox from '../components/Lightbox.jsx';
import EnquiryCTA from '../components/EnquiryCTA.jsx';
import Icon from '../components/Icon.jsx';
import s from './Gallery.module.css';

const LABEL = { all: 'gallery.fAll', roosters: 'gallery.fRoosters', hens: 'gallery.fHens', farm: 'gallery.fFarm', videos: 'gallery.fVideos' };
const TONES = ['sand', 'sage', 'mist', 'clay'];

export default function Gallery() {
  const { t } = useI18n();
  useDocTitle(t('gallery.title'));
  const [filter, setFilter] = useState('all');
  const [lb, setLb] = useState({ items: [], index: null });
  // Only offer filters that the media metadata actually supports
  const filters = GALLERY_FILTERS.filter((f) => f === 'all' || GALLERY.some((g) => g.tags.includes(f)));
  const items = useMemo(() => GALLERY.filter((g) => filter === 'all' || g.tags.includes(filter)), [filter]);
  const reels = GALLERY.filter((g) => g.reel);
  return (
    <>
      <PageHero crumbs={[{ label: t('gallery.title') }]} title={t('gallery.title')} lede={t('gallery.lede')} />
      <section className={s.body}>
        <div className="container">
          <p className={s.notice} data-reveal="fade"><Icon name="image" />{t('gallery.notice')}</p>
          <div className={s.bar} data-reveal="up">
            <div className="chips" role="group" aria-label={t('gallery.photosTitle')}>
              {filters.map((f) => (
                <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {f === 'videos' && <Icon name="video" className={s.chipIcon} />}{t(LABEL[f])}
                </button>
              ))}
            </div>
            <span className={s.count} aria-live="polite">{t('gallery.count', { n: items.length })}</span>
          </div>
          <div className={s.bento} key={filter}>
            {items.map((g, i) => (
              <button key={g.media} type="button" className={`${s.item} ${g.size ? s[g.size] : ''}`} style={{ '--d': i % 6 }}
                onClick={() => setLb({ items, index: i })} aria-label={t('a11y.openItem', { name: t(g.cap) })}>
                <ConceptMedia id={g.media} tone={TONES[i % 4]} hoverPlay className={s.fill} />
                <span className={s.cap}>{g.tags.includes('videos') && <Icon name="play" />}{t(g.cap)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-sand">
        <div className="container">
          <div className="row-head" data-reveal="up"><h2 className="h2">{t('gallery.reelsTitle')}</h2></div>
          <div className={s.reels}>
            {reels.map((g, i) => (
              <button key={g.media} type="button" className={s.reel} data-reveal="up" style={{ '--d': i }} onClick={() => setLb({ items: reels, index: i })} aria-label={t('a11y.openItem', { name: t(g.cap) })}>
                <ConceptMedia id={g.media} tone={TONES[(i + 1) % 4]} hoverPlay className={s.fill} />
                <span className={s.reelPlay}><Icon name="play" /></span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <EnquiryCTA title={t('home.closeTitle')} body={t('home.closeBody')} media="catHen2" />
      <Lightbox items={lb.items} index={lb.index} onClose={() => setLb((l) => ({ ...l, index: null }))} onIndex={(i) => setLb((l) => ({ ...l, index: i }))} />
    </>
  );
}
