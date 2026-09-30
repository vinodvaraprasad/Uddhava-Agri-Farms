import { useState } from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useDocTitle } from '../lib/hooks.js';
import { FAQ } from '../data/faq.js';
import PageHero from '../components/PageHero.jsx';
import Accordion from '../components/Accordion.jsx';
import EnquiryCTA from '../components/EnquiryCTA.jsx';
import Icon from '../components/Icon.jsx';
import s from './Faq.module.css';

export default function Faq() {
  const { t } = useI18n();
  useDocTitle(t('nav.faq'));
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const needle = q.trim().toLowerCase();
  const groups = FAQ.filter((g) => cat === 'all' || g.cat === cat).map((g) => ({
    ...g,
    items: g.ids.map((id) => ({ id, q: t(`faq.q.${id}.q`), text: t(`faq.q.${id}.a`) }))
      .filter((it) => !needle || `${it.q} ${it.text}`.toLowerCase().includes(needle))
      .map((it) => ({ id: it.id, q: it.q, a: it.text || <><span className="pending-tag">{t('common.pending')}</span> {t('faq.pendingAnswer')}</> }))
  })).filter((g) => g.items.length);

  return (
    <>
      <PageHero crumbs={[{ label: t('nav.faq') }]} title={t('faq.title')} lede={t('faq.lede')} />
      <section className={s.body}>
        <div className={`container ${s.layout}`}>
          <aside className={s.side}>
            <label className={s.search}>
              <span className="visually-hidden">{t('faq.searchLabel')}</span>
              <Icon name="search" />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('faq.searchPh')} />
            </label>
            <div className={s.cats} role="group" aria-label={t('faq.title')}>
              {['all', ...FAQ.map((g) => g.cat)].map((c) => (
                <button key={c} type="button" className={s.cat} aria-pressed={cat === c} onClick={() => setCat(c)}>
                  {c === 'all' ? t('common.all') : t(`faq.cat.${c}`)}
                  <span>{c === 'all' ? FAQ.reduce((n, g) => n + g.ids.length, 0) : FAQ.find((g) => g.cat === c).ids.length}</span>
                </button>
              ))}
            </div>
          </aside>
          <div className={s.list} aria-live="polite">
            {groups.length ? groups.map((g) => (
              <div key={g.cat + needle} className={s.group} data-reveal="up">
                <h2 className={s.h}>{t(`faq.cat.${g.cat}`)}</h2>
                <Accordion items={g.items} defaultOpen={null} />
              </div>
            )) : (
              <div className={s.empty}><p>{t('faq.none')}</p><button type="button" className="link" onClick={() => { setQ(''); setCat('all'); }}>{t('birds.clearAll')}</button></div>
            )}
          </div>
        </div>
      </section>
      <EnquiryCTA title={t('faq.ctaTitle')} body={t('faq.ctaBody')} media="farmHands" />
    </>
  );
}
