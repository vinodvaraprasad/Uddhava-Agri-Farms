import { NavLink } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useDocTitle } from '../lib/hooks.js';
import { INVENTORY } from '../data/inventory.js';
import PageHero from '../components/PageHero.jsx';
import BirdListing from '../components/BirdListing.jsx';
import EnquiryCTA from '../components/EnquiryCTA.jsx';
import { ConceptMedia } from '../components/Media.jsx';
import s from './Birds.module.css';

// One page template for /birds, /birds/roosters and /birds/hens.
const VARIANTS = {
  all: { type: null, title: 'birds.allTitle', lede: 'birds.allLede', media: ['catRooster', 'catHen2', 'catRooster2'] },
  rooster: { type: 'rooster', title: 'birds.roostersTitle', lede: 'birds.roostersLede', media: ['catRooster', 'catRooster2'] },
  hen: { type: 'hen', title: 'birds.hensTitle', lede: 'birds.hensLede', media: ['catHen', 'catHen2'] }
};

export default function Birds({ variant = 'all' }) {
  const { t } = useI18n();
  const v = VARIANTS[variant];
  useDocTitle(t(v.title));
  const count = INVENTORY.filter((b) => !v.type || b.type === v.type).length;
  const crumbs = variant === 'all' ? [{ label: t('birds.allTitle') }] : [{ label: t('birds.allTitle'), to: '/birds' }, { label: t(v.title) }];
  return (
    <>
      <PageHero crumbs={crumbs} title={t(v.title)} lede={t(v.lede)}>
        <div className={s.strip} aria-hidden="true">
          {v.media.map((m, i) => <ConceptMedia key={m} id={m} tone={['dark', 'sand', 'mist'][i]} className={s.stripImg} />)}
        </div>
      </PageHero>
      <section className={s.body}>
        <div className="container">
          <nav className={s.tabs} aria-label={t('nav.explore')}>
            <NavLink end to="/birds" className={({ isActive }) => `${s.tab} ${isActive ? s.on : ''}`}>{t('common.all')}<span>{INVENTORY.length}</span></NavLink>
            <NavLink to="/birds/roosters" className={({ isActive }) => `${s.tab} ${isActive ? s.on : ''}`}>{t('common.roosters')}<span>{INVENTORY.filter((b) => b.type === 'rooster').length}</span></NavLink>
            <NavLink to="/birds/hens" className={({ isActive }) => `${s.tab} ${isActive ? s.on : ''}`}>{t('common.hens')}<span>{INVENTORY.filter((b) => b.type === 'hen').length}</span></NavLink>
          </nav>
          <p className={s.notice}><span className="demo-tag">{t('common.demo')}</span>{t('birds.notice')} ({count})</p>
          <BirdListing key={variant} presetType={v.type} />
        </div>
      </section>
      <EnquiryCTA title={t('home.closeTitle')} body={t('home.closeBody')} media={variant === 'hen' ? 'closePortrait' : 'galleryFeed'} />
    </>
  );
}
