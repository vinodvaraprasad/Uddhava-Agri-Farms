import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useDocTitle } from '../lib/hooks.js';
import { birdById, INVENTORY } from '../data/inventory.js';
import { waLink, birdMessage } from '../lib/whatsapp.js';
import { RealMedia } from '../components/Media.jsx';
import { WhatsAppButton } from '../components/Button.jsx';
import BirdCard from '../components/BirdCard.jsx';
import NotFound from './NotFound.jsx';
import Icon from '../components/Icon.jsx';
import s from './BirdDetail.module.css';

export default function BirdDetail() {
  const { id } = useParams();
  const { t, formatDate } = useI18n();
  const bird = birdById(id);
  const [sel, setSel] = useState(0);
  // Leaves room below the footer and the prototype pill for the mobile enquiry bar
  useEffect(() => { document.body.classList.add('has-sticky-bar'); return () => document.body.classList.remove('has-sticky-bar'); }, []);
  useEffect(() => setSel(0), [id]);
  useDocTitle(bird ? t('bird.title', { id: bird.id }) : t('notFound.title'));
  if (!bird) return <NotFound message={t('bird.notFound')} />;

  const slots = [...Array(bird.media.photos).keys()].map((i) => ({ kind: 'photo', n: i + 1 })).concat([...Array(bird.media.videos).keys()].map(() => ({ kind: 'video' })));
  const current = slots[sel];
  const message = birdMessage(t, bird);
  const related = INVENTORY.filter((b) => b.id !== bird.id && (b.type === bird.type || b.variety === bird.variety)).slice(0, 4);
  const pending = (<span className={s.pending}><span className="pending-tag">{t('common.pending')}</span>{t('bird.pendingInfo')}</span>);
  const rows = [
    ['bird.id', bird.id],
    ['bird.variety', <span key="v" className={s.inline}><Link to={`/breeds/${bird.variety}`}>{t(`variety.${bird.variety}.name`)}</Link><span className="demo-tag">{t('common.demo')}</span></span>],
    ['bird.type', t(`common.${bird.type}`)],
    ['bird.age', t('common.months', { n: bird.ageMonths })],
    ['bird.weight', t('common.kg', { n: bird.weightKg })],
    ['bird.colour', t(`colour.${bird.colour}`)],
    ['bird.status', <span key="s" className={`${s.status} ${s[bird.status]}`}><i />{t(`common.${bird.status}`)}</span>],
    ['bird.location', t('common.location')],
    ['bird.breeding', bird.breedingHistory || pending],
    ['bird.health', bird.health || pending]
  ];

  return (
    <>
      <section className={s.top}>
        <div className="container">
          <nav aria-label={t('a11y.breadcrumb')} className={s.crumbs}>
            <Link to="/">{t('nav.home')}</Link><span aria-hidden="true">/</span>
            <Link to="/birds">{t('birds.allTitle')}</Link><span aria-hidden="true">/</span>
            <Link to={bird.type === 'rooster' ? '/birds/roosters' : '/birds/hens'}>{t(`common.${bird.type}s`)}</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{bird.id}</span>
          </nav>
          {bird.demo && <p className={s.notice} data-reveal="fade"><span className="demo-tag">{t('common.demo')}</span>{t('bird.notice')}</p>}
          <div className={s.layout}>
            <div className={s.gallery} data-reveal="fade">
              <div className={s.main}>
                <RealMedia kind={current.kind} className={s.mainMedia} />
                <span className={s.counter}>{current.kind === 'video' ? t('media.video') : t('media.photoN', { n: current.n })} · {sel + 1}/{slots.length}</span>
              </div>
              <div className={s.thumbs} role="tablist">
                {slots.map((sl, i) => (
                  <button key={i} type="button" role="tab" aria-selected={sel === i} className={`${s.thumb} ${sel === i ? s.thumbOn : ''}`} onClick={() => setSel(i)}
                    aria-label={sl.kind === 'video' ? t('a11y.selectVideo') : t('a11y.selectPhoto', { n: sl.n })}>
                    <RealMedia kind={sl.kind} compact />
                  </button>
                ))}
              </div>
            </div>
            <div className={s.info}>
              <div className={s.idRow} data-reveal="up"><span className={s.id}>{bird.id}</span><span className={`${s.status} ${s[bird.status]}`}><i />{t(`common.${bird.status}`)}</span></div>
              <h1 className={`h1 ${s.title}`} data-reveal="up" style={{ '--d': 1 }}>{t(`variety.${bird.variety}.name`)} <span className={s.type}>· {t(`common.${bird.type}`)}</span></h1>
              <p className={s.listed} data-reveal="up" style={{ '--d': 2 }}>{t('bird.listed', { date: formatDate(bird.listed) })}{bird.demo && ` · ${t('bird.demoValues')}`}</p>
              <div className={s.enquire} data-reveal="up" style={{ '--d': 3 }}>
                <WhatsAppButton message={message} full />
                <p>{t('bird.enquireBody')}</p>
              </div>
              <h2 className={s.h2}>{t('bird.details')}</h2>
              <dl className={s.table}>
                {rows.map(([k, v]) => <div key={k} className={s.row}><dt>{t(k)}</dt><dd>{v}</dd></div>)}
              </dl>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section section-sand">
          <div className="container">
            <div className="row-head" data-reveal="up"><h2 className="h2">{t('bird.related')}</h2><Link to="/birds" className="link">{t('cta.seeAllBirds')}<Icon name="arrow" /></Link></div>
            <div className={s.related}>{related.map((b, i) => <BirdCard key={b.id} bird={b} index={i} />)}</div>
          </div>
        </section>
      )}
      <div className={s.sticky}>
        <div><strong>{bird.id}</strong><span>{t(`common.${bird.status}`)}</span></div>
        <a className={s.stickyBtn} href={waLink(message)} target="_blank" rel="noopener noreferrer"><Icon name="wa" />{t('cta.whatsappShort')}</a>
      </div>
    </>
  );
}
