import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useCountUp, useDocTitle, prefersReducedMotion } from '../lib/hooks.js';
import { VARIETIES } from '../data/varieties.js';
import { APPEARANCES } from '../data/appearances.js';
import { INVENTORY } from '../data/inventory.js';
import { GALLERY } from '../data/gallery.js';
import { HOME_FAQ } from '../data/faq.js';
import { SITE } from '../data/site.js';
import { ConceptMedia } from '../components/Media.jsx';
import Button, { WhatsAppButton } from '../components/Button.jsx';
import BreedCard from '../components/BreedCard.jsx';
import BirdCard from '../components/BirdCard.jsx';
import Accordion from '../components/Accordion.jsx';
import Lightbox from '../components/Lightbox.jsx';
import EnquiryCTA from '../components/EnquiryCTA.jsx';
import Icon from '../components/Icon.jsx';
import s from './Home.module.css';

const cx = (...a) => a.filter(Boolean).join(' ');

function Words({ text, offset = 0 }) {
  return text.split(' ').map((w, i) => (
    <span key={i}><span className={s.w}><span className={s.wi} style={{ '--i': i + offset }}>{w}</span></span>{' '}</span>
  ));
}

function Hero() {
  const { t } = useI18n();
  const [ready, setReady] = useState(false);
  const ref = useRef(null);
  const n = useCountUp(SITE.birdCount, ready, 1600);
  useEffect(() => { const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true))); return () => cancelAnimationFrame(id); }, []);
  // Subtle pointer-driven depth on the hero photo (desktop pointers only)
  const onMove = (e) => {
    if (prefersReducedMotion() || e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    ref.current.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const a = t('home.h1a'), b = t('home.h1b');
  return (
    <section ref={ref} className={cx(s.hero, ready && s.ready)} onPointerMove={onMove} aria-labelledby="hero-title">
      <div className={s.heroMedia}>
        <div className={s.heroClip}><ConceptMedia id="hero" tone="sage" badge="top" className={s.heroMain} /></div>
        <div className={s.heroCard}>
          <ConceptMedia id="heroActivity" tone="sand" className={s.heroCardMedia} />
          <span className={s.heroCardLabel}>{t('home.cardLabel')}</span>
        </div>
      </div>
      <div className={s.heroText}>
        <p className={cx('eyebrow', s.seq, s.seq1)}><Icon name="pin" />{t('home.where')}</p>
        <h1 id="hero-title" className={cx('h1', s.h1)}>
          <span className={s.line}><Words text={a} /></span>
          <span className={s.line}><Words text={b} offset={a.split(' ').length} /></span>
        </h1>
        <p className={cx(s.sub, s.seq, s.seq2)}>{t('home.sub')}</p>
        <div className={cx(s.ctas, s.seq, s.seq3)}>
          <WhatsAppButton />
          <Button to="/birds" variant="secondary" arrow>{t('cta.explore')}</Button>
        </div>
        <dl className={cx(s.facts, s.seq, s.seq4)}>
          <div><dt>{n}+</dt><dd>{t('home.factBirds')}</dd></div>
          <div><dt>{t('home.factTypes')}</dt><dd>{t('home.factTypesSub')}</dd></div>
          <div><dt>{t('home.factPlace')}</dt><dd>{t('home.factPlaceSub')}</dd></div>
        </dl>
      </div>
    </section>
  );
}

function Categories() {
  const { t } = useI18n();
  const nav = useNavigate();
  const cats = [
    { to: '/birds/roosters', name: 'nav.roosters', sub: 'nav.roostersDesc', a: 'catRooster', b: 'catRooster2', ta: 'dark', tb: 'mist' },
    { to: '/birds/hens', name: 'nav.hens', sub: 'nav.hensDesc', a: 'catHen', b: 'catHen2', ta: 'clay', tb: 'sand' }
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="row-head" data-reveal="up">
          <div><h2 className="h2">{t('home.exploreTitle')}</h2><p className="lede">{t('home.exploreLede')}</p></div>
          <Link to="/birds" className="link">{t('nav.allBirds')}<Icon name="arrow" /></Link>
        </div>
        <div className={s.cats}>
          {cats.map((c, i) => (
            <div key={c.to} className={s.cat} data-reveal="up" style={{ '--d': i }} onClick={(e) => { if (!e.target.closest('a,button')) nav(c.to); }}>
              <div className={s.catImgs}>
                <ConceptMedia id={c.a} tone={c.ta} className={s.catA} />
                <ConceptMedia id={c.b} tone={c.tb} className={s.catB} />
              </div>
              <Link to={c.to} className={s.catRow}>
                <span><span className={s.catName}>{t(c.name)}</span><span className={s.catSub}>{t(c.sub)}</span></span>
                <span className={s.catGo}><Icon name="arrow" /></span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Varieties() {
  const { t } = useI18n();
  const rail = useRef(null);
  const scroll = (d) => rail.current?.scrollBy({ left: d * rail.current.clientWidth * 0.8, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  return (
    <section className="section section-sand">
      <div className="container">
        <div className="row-head" data-reveal="up">
          <div><div className="title-row"><h2 className="h2">{t('home.varietiesTitle')}</h2><span className="demo-tag">{t('common.demo')}</span></div><p className="lede">{t('home.varietiesLede')}</p></div>
          <div className={s.railNav}>
            <button type="button" className={s.navBtn} onClick={() => scroll(-1)} aria-label={t('a11y.prevVarieties')}><Icon name="arrow" style={{ transform: 'rotate(180deg)' }} /></button>
            <button type="button" className={s.navBtn} onClick={() => scroll(1)} aria-label={t('a11y.moreVarieties')}><Icon name="arrow" /></button>
            <Link to="/breeds" className="link">{t('cta.allVarieties')}<Icon name="arrow" /></Link>
          </div>
        </div>
        <div className={s.rail} ref={rail}>
          {VARIETIES.map((v, i) => <BreedCard key={v.slug} variety={v} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function Looks() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="container">
        <div className="row-head" data-reveal="up"><div><h2 className="h2">{t('home.looksTitle')}</h2><p className="lede">{t('home.looksLede')}</p></div></div>
        <div className={s.looks}>
          {APPEARANCES.map((a, i) => (
            <Link key={a.slug} to={`/birds?colour=${a.slug}`} className={s.look} data-reveal="scale" style={{ '--d': i }}>
              <span className={s.ring}><ConceptMedia id={a.media} tone={a.tone} round className={s.lookMedia} /></span>
              <span className={s.lookName}>{t(`colour.${a.slug}`)}</span>
            </Link>
          ))}
        </div>
        <p className={s.note}>{t('home.looksNote')}</p>
      </div>
    </section>
  );
}

function Available() {
  const { t } = useI18n();
  const [f, setF] = useState('all');
  const list = INVENTORY.filter((b) => b.status === 'available' && (f === 'all' || b.type === f)).slice(0, 4);
  const trust = [['tag', 'home.trust1', 'home.trust1Body'], ['camera', 'home.trust2', 'home.trust2Body'], ['chat', 'home.trust3', 'home.trust3Body']];
  return (
    <section className="section section-sand">
      <div className="container">
        <div className="row-head" data-reveal="up">
          <div><div className="title-row"><h2 className="h2">{t('home.birdsTitle')}</h2><span className="demo-tag">{t('common.demo')}</span></div><p className="lede">{t('home.birdsLede')}</p></div>
          <div className="chips" role="group">
            {['all', 'rooster', 'hen'].map((k) => <button key={k} type="button" className="chip" aria-pressed={f === k} onClick={() => setF(k)}>{t(k === 'all' ? 'common.all' : `common.${k}s`)}</button>)}
          </div>
        </div>
        <div className={s.birds} key={f}>{list.map((b, i) => <BirdCard key={b.id} bird={b} index={i} />)}</div>
        <ul className={s.trust}>
          {trust.map(([icon, h, p], i) => (
            <li key={h} data-reveal="up" style={{ '--d': i }}><span className={s.mk}><Icon name={icon} /></span><div><h3>{t(h)}</h3><p>{t(p)}</p></div></li>
          ))}
        </ul>
        <Button to="/birds" variant="secondary" arrow className={s.more}>{t('cta.seeAllBirds')}</Button>
      </div>
    </section>
  );
}

function FarmStory() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className={cx('container', s.farm)}>
        <div data-reveal="clip" className={s.farmWide}><ConceptMedia id="farmWide" tone="sand" className={s.farmWideMedia} /></div>
        <div className={s.farmText} data-reveal="left">
          <h2 className="h2">{t('home.farmTitle')}</h2>
          <p className="lede">{t('home.farmBody')}</p>
          <div className={s.farmLinks}><Button to="/our-farm" variant="secondary" arrow>{t('cta.ourFarm')}</Button><Link to="/about" className="link">{t('cta.aboutUs')}<Icon name="arrow" /></Link></div>
        </div>
        <div className={s.farmRow}>
          <div data-reveal="clip" style={{ '--d': 1 }}><ConceptMedia id="farmMorning" tone="sage" className={s.farmSq} /></div>
          <div data-reveal="clip" style={{ '--d': 3 }}><ConceptMedia id="farmHands" tone="clay" className={s.farmSq} /></div>
        </div>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const { t } = useI18n();
  const items = GALLERY.slice(0, 7);
  const [open, setOpen] = useState(null);
  return (
    <section className="section section-sand">
      <div className="container">
        <div className="row-head" data-reveal="up">
          <div><h2 className="h2">{t('home.galleryTitle')}</h2><p className="lede">{t('home.galleryLede')}</p></div>
          <Link to="/gallery" className="link">{t('cta.openGallery')}<Icon name="arrow" /></Link>
        </div>
        <div className={s.bento}>
          {items.map((g, i) => (
            <div key={g.media} className={cx(s.gi, g.size && s[g.size])} data-reveal="fade" style={{ '--d': i }}>
              <ConceptMedia id={g.media} tone={['sand', 'sage', 'mist', 'clay'][i % 4]} hoverPlay className={s.fill} />
              <button type="button" className={s.open} onClick={() => setOpen(i)} aria-label={t('a11y.openItem', { name: t(g.cap) })}><Icon name="expand" /></button>
            </div>
          ))}
        </div>
      </div>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}

function Business() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="container">
        <div className={s.biz}>
          <div data-reveal="scale" className={s.bizMedia}><ConceptMedia id="bizFlock" tone="sage" className={s.fill} /></div>
          <div className={s.bizText} data-reveal="up" style={{ '--d': 1 }}>
            <h2 className="h2">{t('home.bizTitle')}</h2>
            <p className="lede">{t('home.bizBody')}</p>
            <ul className={s.bizList}>{t('home.bizTypes').map((x) => <li key={x}>{x}</li>)}</ul>
            <div className={s.farmLinks}><WhatsAppButton message={t('wa.business')} label={t('cta.business')} /><Link to="/contact" className="link">{t('nav.contact')}<Icon name="arrow" /></Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqPreview() {
  const { t } = useI18n();
  const items = HOME_FAQ.map((id) => ({ id, q: t(`faq.q.${id}.q`), a: t(`faq.q.${id}.a`) || <><span className="pending-tag">{t('common.pending')}</span> {t('faq.pendingAnswer')}</> }));
  return (
    <section className="section section-sand">
      <div className={cx('container', s.faq)}>
        <div data-reveal="up"><h2 className="h2">{t('home.faqTitle')}</h2><p className="lede">{t('home.faqBody')}</p><Link to="/faq" className={cx('link', s.faqLink)}>{t('cta.allQuestions')}<Icon name="arrow" /></Link></div>
        <div data-reveal="up" style={{ '--d': 1 }}><Accordion items={items} /></div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useI18n();
  useDocTitle(null);
  return (
    <>
      <Hero />
      <Categories />
      <Varieties />
      <Looks />
      <Available />
      <FarmStory />
      <GalleryPreview />
      <Business />
      <FaqPreview />
      <EnquiryCTA title={t('home.closeTitle')} body={t('home.closeBody')} />
    </>
  );
}
