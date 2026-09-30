import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useDocTitle } from '../lib/hooks.js';
import { VARIETIES } from '../data/varieties.js';
import { APPEARANCES } from '../data/appearances.js';
import { INVENTORY, SORTS } from '../data/inventory.js';
import PageHero from '../components/PageHero.jsx';
import BreedCard from '../components/BreedCard.jsx';
import BirdCard from '../components/BirdCard.jsx';
import EnquiryCTA from '../components/EnquiryCTA.jsx';
import { ConceptMedia } from '../components/Media.jsx';
import Icon from '../components/Icon.jsx';
import s from './Breeds.module.css';

export default function Breeds() {
  const { t } = useI18n();
  useDocTitle(t('breeds.title'));
  const [q, setQ] = useState('');
  const [colour, setColour] = useState(null);
  const list = useMemo(() => VARIETIES.filter((v) => {
    const name = `${t(`variety.${v.slug}.name`)} ${v.slug}`.toLowerCase();
    if (q && !name.includes(q.toLowerCase())) return false;
    // Colour filter uses the listed birds of each variety, keeping breed and colour separate
    if (colour && !INVENTORY.some((b) => b.variety === v.slug && b.colour === colour)) return false;
    return true;
  }), [q, colour, t]);
  const recent = [...INVENTORY].sort(SORTS.newest.fn).slice(0, 4);
  const steps = [['leaf', 'breeds.step1', 'breeds.step1Body'], ['search', 'breeds.step2', 'breeds.step2Body'], ['wa', 'breeds.step3', 'breeds.step3Body']];

  return (
    <>
      <PageHero crumbs={[{ label: t('breeds.title') }]} title={t('breeds.title')} lede={t('breeds.lede')} media="breedsHero" tone="sand" />
      <section className={s.intro}>
        <div className="container">
          <p className={s.notice} data-reveal="fade"><span className="demo-tag">{t('common.demo')}</span>{t('breeds.notice')}</p>
          <ol className={s.steps}>
            {steps.map(([icon, h, p], i) => (
              <li key={h} data-reveal="up" style={{ '--d': i }}>
                <span className={s.stepN}>{i + 1}</span>
                <span className={s.stepIcon}><Icon name={icon} /></span>
                <div><h2 className={s.stepTitle}>{t(h)}</h2><p>{t(p)}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-sand">
        <div className="container">
          <div className={s.controls} data-reveal="up">
            <label className={s.search}>
              <span className="visually-hidden">{t('breeds.searchLabel')}</span>
              <Icon name="search" />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('breeds.searchPh')} />
            </label>
            <div className={s.colours}>
              <span className={s.cLabel}>{t('breeds.colourLabel')}</span>
              <div className="chips" role="group" aria-label={t('breeds.colourLabel')}>
                <button type="button" className="chip" aria-pressed={!colour} onClick={() => setColour(null)}>{t('common.all')}</button>
                {APPEARANCES.map((a) => <button key={a.slug} type="button" className="chip" aria-pressed={colour === a.slug} onClick={() => setColour(colour === a.slug ? null : a.slug)}>{t(`colour.${a.slug}`)}</button>)}
              </div>
            </div>
          </div>
          <p className={s.count} aria-live="polite">{t('breeds.count', { n: list.length })}</p>
          {list.length ? (
            <div className={s.grid}>{list.map((v, i) => <BreedCard key={v.slug} variety={v} index={i} />)}</div>
          ) : (
            <div className={s.empty}><p>{t('breeds.none')}</p><button type="button" className="link" onClick={() => { setQ(''); setColour(null); }}>{t('breeds.clear')}</button></div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row-head" data-reveal="up"><h2 className="h2">{t('breeds.byType')}</h2></div>
          <div className={s.types}>
            {[['/birds/roosters', 'nav.roosters', 'nav.roostersDesc', 'catRooster', 'dark'], ['/birds/hens', 'nav.hens', 'nav.hensDesc', 'catHen', 'clay']].map(([to, k, d, m, tone], i) => (
              <Link key={to} to={to} className={s.type} data-reveal="up" style={{ '--d': i }}>
                <ConceptMedia id={m} tone={tone} className={s.typeMedia} />
                <span className={s.typeText}><span className={s.typeName}>{t(k)}</span><span className={s.typeSub}>{t(d)}</span></span>
                <span className={s.typeGo}><Icon name="arrow" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-sand">
        <div className="container">
          <div className="row-head" data-reveal="up">
            <div className="title-row"><h2 className="h2">{t('breeds.recent')}</h2><span className="demo-tag">{t('common.demo')}</span></div>
            <Link to="/birds" className="link">{t('cta.seeAllBirds')}<Icon name="arrow" /></Link>
          </div>
          <div className={s.birds}>{recent.map((b, i) => <BirdCard key={b.id} bird={b} index={i} />)}</div>
        </div>
      </section>
      <EnquiryCTA title={t('home.closeTitle')} body={t('home.closeBody')} media="galleryForage" />
    </>
  );
}
