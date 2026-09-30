import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useDocTitle } from '../lib/hooks.js';
import { VARIETIES, varietyBySlug } from '../data/varieties.js';
import { INVENTORY } from '../data/inventory.js';
import { ConceptMedia } from '../components/Media.jsx';
import { WhatsAppButton } from '../components/Button.jsx';
import Button from '../components/Button.jsx';
import BirdCard from '../components/BirdCard.jsx';
import BreedCard from '../components/BreedCard.jsx';
import Lightbox from '../components/Lightbox.jsx';
import NotFound from './NotFound.jsx';
import Icon from '../components/Icon.jsx';
import s from './Breeds.module.css';

export default function BreedDetail() {
  const { slug } = useParams();
  const { t } = useI18n();
  const v = varietyBySlug(slug);
  const [open, setOpen] = useState(null);
  const name = v ? t(`variety.${v.slug}.name`) : '';
  useDocTitle(v ? name : t('notFound.title'));
  if (!v) return <NotFound message={t('breed.notFound')} />;

  const birds = INVENTORY.filter((b) => b.variety === v.slug);
  const colours = [...new Set(birds.map((b) => b.colour))];
  const types = [...new Set(birds.map((b) => b.type))];
  const others = VARIETIES.filter((o) => o.slug !== v.slug).slice(0, 4);
  const gallery = v.gallery.map((m) => ({ media: m, cap: `variety.${v.slug}.name` }));

  return (
    <>
      <section className={s.bHero}>
        <div className="container">
          <nav aria-label={t('a11y.breadcrumb')} className={s.crumbs}>
            <Link to="/">{t('nav.home')}</Link><span aria-hidden="true">/</span><Link to="/breeds">{t('breeds.title')}</Link><span aria-hidden="true">/</span><span aria-current="page">{name}</span>
          </nav>
          <div className={s.bHeroGrid}>
            <div className={s.bHeroText}>
              <div className="title-row" data-reveal="fade">{v.demo && <span className="demo-tag">{t('common.demo')}</span>}<span className={s.bSub}>{t(`variety.${v.slug}.sub`)}</span></div>
              <h1 className="h1" data-reveal="up">{name}</h1>
              <div className={s.bCtas} data-reveal="up" style={{ '--d': 1 }}>
                <WhatsAppButton message={t('wa.variety', { breed: name })} />
                <Button variant="secondary" arrow onClick={() => document.getElementById('variety-birds')?.scrollIntoView({ behavior: 'smooth' })}>{t('cta.seeBirds')}</Button>
              </div>
            </div>
            <div className={s.bHeroMedia} data-reveal="clip">
              <ConceptMedia id={v.media} tone="sage" className={s.fill} />
              <button type="button" className={s.expand} onClick={() => setOpen(0)} aria-label={t('a11y.openItem', { name })}><Icon name="expand" /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-sand">
        <div className={`container ${s.bInfo}`}>
          <div className={s.bCol}>
            <article className={s.block} data-reveal="up">
              <h2 className="h3">{t('breed.about')}</h2>
              <p className={s.pendingBlock}><span className="pending-tag">{t('common.pending')}</span>{t('breed.aboutPending')}</p>
            </article>
            <article className={s.block} data-reveal="up" style={{ '--d': 1 }}>
              <h2 className="h3">{t('breed.chars')}</h2>
              {v.characteristics.length
                ? <ul>{v.characteristics.map((c) => <li key={c}>{c}</li>)}</ul>
                : <p className={s.pendingBlock}><span className="pending-tag">{t('common.pending')}</span>{t('breed.charsPending')}</p>}
            </article>
          </div>
          <aside className={s.glance} data-reveal="up" style={{ '--d': 2 }}>
            <div className="title-row"><h2 className="h3">{t('breed.glance')}</h2><span className="demo-tag">{t('common.demo')}</span></div>
            <p className={s.glanceNote}>{t('common.fromDemo')}</p>
            <dl>
              <div><dt>{t('breed.glanceListed')}</dt><dd className={s.big}>{birds.length}</dd></div>
              <div><dt>{t('breed.glanceColours')}</dt><dd>{colours.length ? colours.map((c) => <Link key={c} className={s.pill} to={`/birds?variety=${v.slug}&colour=${c}`}>{t(`colour.${c}`)}</Link>) : '—'}</dd></div>
              <div><dt>{t('breed.glanceTypes')}</dt><dd>{types.length ? types.map((ty) => <Link key={ty} className={s.pill} to={`/birds/${ty}s?variety=${v.slug}`}>{t(`common.${ty}s`)}</Link>) : '—'}</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row-head" data-reveal="up"><h2 className="h2">{t('breed.photos')}</h2></div>
          <div className={s.photos}>
            {gallery.map((g, i) => (
              <div key={g.media} className={s.photo} data-reveal="clip" style={{ '--d': i }}>
                <ConceptMedia id={g.media} tone={['sage', 'sand', 'clay'][i]} className={s.fill} />
                <button type="button" className={s.expand} onClick={() => setOpen(i)} aria-label={t('a11y.openItem', { name: `${name} ${i + 1}` })}><Icon name="expand" /></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-sand" id="variety-birds">
        <div className="container">
          <div className="row-head" data-reveal="up">
            <div className="title-row"><h2 className="h2">{t('breed.related', { name })}</h2><span className="demo-tag">{t('common.demo')}</span></div>
            {birds.length > 0 && <Link to={`/birds?variety=${v.slug}`} className="link">{t('cta.seeAllBirds')}<Icon name="arrow" /></Link>}
          </div>
          {birds.length ? <div className={s.birds}>{birds.map((b, i) => <BirdCard key={b.id} bird={b} index={i} />)}</div> : <p className="lede">{t('breed.relatedNone')}</p>}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={s.bEnquire} data-reveal="up">
            <div><h2 className="h2">{t('breed.enquireTitle', { name })}</h2><p className="lede">{t('breed.enquireBody')}</p></div>
            <WhatsAppButton message={t('wa.variety', { breed: name })} />
          </div>
          <div className="row-head" data-reveal="up"><h2 className="h2">{t('breed.others')}</h2><Link to="/breeds" className="link">{t('cta.allVarieties')}<Icon name="arrow" /></Link></div>
          <div className={s.grid}>{others.map((o, i) => <BreedCard key={o.slug} variety={o} index={i} />)}</div>
        </div>
      </section>
      <Lightbox items={gallery} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}
