import { useState } from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useCountUp, useDocTitle, useInView } from '../lib/hooks.js';
import { SITE } from '../data/site.js';
import PageHero from '../components/PageHero.jsx';
import { ConceptMedia } from '../components/Media.jsx';
import Lightbox from '../components/Lightbox.jsx';
import EnquiryCTA from '../components/EnquiryCTA.jsx';
import Icon from '../components/Icon.jsx';
import s from './Story.module.css';

function Scale() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ threshold: 0.4 });
  const n = useCountUp(SITE.birdCount, inView);
  const items = [[`${n}+`, 'farm.scaleBirds'], ['2', 'farm.scaleTypes'], [t('farm.scaleVarieties'), 'farm.scaleVarietiesSub'], [t('farm.scalePlace'), 'farm.scalePlaceSub']];
  return (
    <dl ref={ref} className={s.scale}>
      {items.map(([v, k], i) => <div key={k} data-reveal="up" style={{ '--d': i }}><dt>{v}</dt><dd>{t(k)}</dd></div>)}
    </dl>
  );
}

export default function OurFarm() {
  const { t } = useI18n();
  useDocTitle(t('farm.title'));
  const [open, setOpen] = useState(null);
  const story = [['farmWide', 'farm.story1', 'sand'], ['bizFlock', 'farm.story2', 'sage'], ['farmHands', 'farm.story3', 'clay']];
  const day = [['sun', 'farm.dayMorning', 'farm.dayMorningCap', 'farmMorning'], ['leaf', 'farm.dayDay', 'farm.dayDayCap', 'galleryForage'], ['moon', 'farm.dayEvening', 'farm.dayEveningCap', 'galleryEvening']];
  const videos = [{ media: 'landscapeVideo', cap: 'farm.videosTitle' }, { media: 'reelVideo1', cap: 'home.cardLabel' }, { media: 'reelVideo2', cap: 'home.cardLabel' }];
  return (
    <>
      <PageHero crumbs={[{ label: t('nav.farm') }]} title={t('farm.title')} lede={t('farm.lede')} media="farmWide" tone="sand" />
      <div className="container"><p className={s.note} data-reveal="fade"><Icon name="image" />{t('farm.imagesNote')}</p></div>

      <section className="section">
        <div className={`container ${s.split}`}>
          <div data-reveal="up"><h2 className="h2">{t('farm.introTitle')}</h2><p className="lede">{t('farm.introBody')}</p></div>
          <Scale />
        </div>
      </section>

      <section className="section section-sand">
        <div className="container">
          <div className="row-head" data-reveal="up"><h2 className="h2">{t('farm.storyTitle')}</h2></div>
          <div className={s.story}>
            {story.map(([m, k, tone], i) => (
              <figure key={m} className={s.storyItem}>
                <div data-reveal="clip" style={{ '--d': i }}><ConceptMedia id={m} tone={tone} className={s.storyMedia} /></div>
                <figcaption data-reveal="up" style={{ '--d': i + 1 }}>
                  <span className={s.storyN}>0{i + 1}</span><h3 className="h3">{t(k)}</h3>
                  <p className={s.pending}><span className="pending-tag">{t('common.pending')}</span>{t('farm.storyPending')}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row-head" data-reveal="up"><div><h2 className="h2">{t('farm.dayTitle')}</h2><p className={s.pending}><span className="pending-tag">{t('common.pending')}</span>{t('farm.dayPending')}</p></div></div>
          <ol className={s.day}>
            {day.map(([icon, k, cap, m], i) => (
              <li key={k} data-reveal="up" style={{ '--d': i }}>
                <ConceptMedia id={m} tone={['sand', 'sage', 'clay'][i]} className={s.dayMedia} />
                <div className={s.dayText}><span className={s.dayIcon}><Icon name={icon} /></span><div><h3>{t(k)}</h3><p>{t(cap)}</p></div></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-sand">
        <div className="container">
          <div className="row-head" data-reveal="up"><div><h2 className="h2">{t('farm.videosTitle')}</h2><p className="lede">{t('farm.videosLede')}</p></div></div>
          <div className={s.videos}>
            {videos.map((v, i) => (
              <div key={v.media} className={`${s.video} ${i === 0 ? s.videoWide : ''}`} data-reveal="up" style={{ '--d': i }}>
                <ConceptMedia id={v.media} tone={['sand', 'sage', 'mist'][i]} hoverPlay className={s.fill} />
                <button type="button" className={s.play} onClick={() => setOpen(i)} aria-label={t('a11y.openItem', { name: t(v.cap) })}><Icon name="play" /></button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <EnquiryCTA title={t('farm.ctaTitle')} body={t('farm.ctaBody')} media="galleryPath" />
      <Lightbox items={videos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}
