import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { INVENTORY, AGE_BUCKETS, SORTS } from '../data/inventory.js';
import { VARIETIES } from '../data/varieties.js';
import { APPEARANCES } from '../data/appearances.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useFocusTrap, useScrollLock } from '../lib/hooks.js';
import BirdCard from './BirdCard.jsx';
import { WhatsAppButton } from './Button.jsx';
import Icon from './Icon.jsx';
import s from './BirdListing.module.css';

const csv = (v) => (v ? v.split(',').filter(Boolean) : []);
const cx = (...a) => a.filter(Boolean).join(' ');

export default function BirdListing({ presetType = null }) {
  const { t } = useI18n();
  const [params, setParams] = useSearchParams();
  const [drawer, setDrawer] = useState(false);
  const drawerRef = useRef(null);
  useScrollLock(drawer);
  useFocusTrap(drawer, drawerRef, () => setDrawer(false));

  const sel = {
    type: presetType ? [] : csv(params.get('type')),
    variety: csv(params.get('variety')),
    colour: csv(params.get('colour')),
    age: csv(params.get('age')),
    status: csv(params.get('status'))
  };
  const q = params.get('q') || '';
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'newest';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && value.length) next.set(key, Array.isArray(value) ? value.join(',') : value); else next.delete(key);
    setParams(next, { replace: true });
  };
  const toggle = (key, value) => update(key, sel[key].includes(value) ? sel[key].filter((v) => v !== value) : [...sel[key], value]);
  const clearAll = () => { const next = new URLSearchParams(); if (params.get('sort')) next.set('sort', params.get('sort')); setParams(next, { replace: true }); };

  const base = useMemo(() => INVENTORY.filter((b) => !presetType || b.type === presetType), [presetType]);
  const matches = (b, skip) => {
    if (skip !== 'type' && sel.type.length && !sel.type.includes(b.type)) return false;
    if (skip !== 'variety' && sel.variety.length && !sel.variety.includes(b.variety)) return false;
    if (skip !== 'colour' && sel.colour.length && !sel.colour.includes(b.colour)) return false;
    if (skip !== 'status' && sel.status.length && !sel.status.includes(b.status)) return false;
    if (skip !== 'age' && sel.age.length && !AGE_BUCKETS.some((a) => sel.age.includes(a.key) && a.test(b.ageMonths))) return false;
    if (q) {
      const hay = [b.id, t(`variety.${b.variety}.name`), t(`colour.${b.colour}`), t(`common.${b.type}`), b.variety, b.colour].join(' ').toLowerCase();
      if (!q.toLowerCase().split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    return true;
  };
  const results = base.filter((b) => matches(b)).sort(SORTS[sort].fn);
  // Counts show how many birds each option would give with the other filters applied
  const countFor = (group, test) => base.filter((b) => matches(b, group) && test(b)).length;

  const groups = [
    !presetType && { key: 'type', label: 'birds.type', options: ['rooster', 'hen'].map((v) => ({ value: v, label: t(`common.${v === 'rooster' ? 'roosters' : 'hens'}`), n: countFor('type', (b) => b.type === v) })) },
    { key: 'variety', label: 'birds.variety', demo: true, options: VARIETIES.map((v) => ({ value: v.slug, label: t(`variety.${v.slug}.name`), n: countFor('variety', (b) => b.variety === v.slug) })) },
    { key: 'colour', label: 'birds.colour', options: APPEARANCES.map((a) => ({ value: a.slug, label: t(`colour.${a.slug}`), n: countFor('colour', (b) => b.colour === a.slug) })) },
    { key: 'age', label: 'birds.age', options: AGE_BUCKETS.map((a) => ({ value: a.key, label: t(a.label), n: countFor('age', (b) => a.test(b.ageMonths)) })) },
    { key: 'status', label: 'birds.availability', options: ['available', 'reserved'].map((v) => ({ value: v, label: t(`common.${v}`), n: countFor('status', (b) => b.status === v) })) }
  ].filter(Boolean);

  const active = groups.flatMap((g) => sel[g.key].map((v) => ({ key: g.key, value: v, label: g.options.find((o) => o.value === v)?.label || v })));
  const activeCount = active.length + (q ? 1 : 0);

  const panel = (
    <div className={s.groups}>
      {groups.map((g) => (
        <fieldset key={g.key} className={s.group}>
          <legend className={s.legend}>{t(g.label)}{g.demo && <span className="demo-tag">{t('common.demo')}</span>}</legend>
          <div className={s.options}>
            {g.options.map((o) => {
              const on = sel[g.key].includes(o.value);
              return (
                <button key={o.value} type="button" className={cx(s.opt, on && s.on)} aria-pressed={on} disabled={!on && o.n === 0} onClick={() => toggle(g.key, o.value)}>
                  <span className={s.box}>{on && <Icon name="check" />}</span><span className={s.optLabel}>{o.label}</span><span className={s.n}>{o.n}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );

  return (
    <div className={s.wrap}>
      <div className={s.toolbar} data-reveal="up">
        <label className={s.search}>
          <span className="visually-hidden">{t('birds.searchLabel')}</span>
          <Icon name="search" />
          <input type="search" value={q} placeholder={t('birds.searchPh')} onChange={(e) => update('q', e.target.value)} />
        </label>
        <div className={s.tools}>
          <button type="button" className={s.filterBtn} onClick={() => setDrawer(true)} aria-expanded={drawer}>
            <Icon name="filter" />{t('birds.filters')}{activeCount > 0 && <span className={s.badge}>{activeCount}</span>}
          </button>
          <label className={s.sort}>
            <span>{t('birds.sort')}</span>
            <select value={sort} onChange={(e) => update('sort', e.target.value === 'newest' ? '' : e.target.value)}>
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{t(v.label)}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className={s.layout}>
        <aside className={s.aside} aria-label={t('a11y.filters')}>
          <div className={s.asideHead}><h2 className={s.asideTitle}>{t('birds.filters')}</h2>{activeCount > 0 && <button type="button" className="link" onClick={clearAll}>{t('birds.clearAll')}</button>}</div>
          {panel}
        </aside>

        <div className={s.results}>
          <div className={s.status} aria-live="polite">
            <strong>{results.length === 1 ? t('birds.resultsOne') : t('birds.results', { n: results.length })}</strong>
            {active.map((a) => (
              <button key={a.key + a.value} type="button" className={s.activeChip} onClick={() => toggle(a.key, a.value)}>{a.label}<Icon name="close" /></button>
            ))}
            {q && <button type="button" className={s.activeChip} onClick={() => update('q', '')}>“{q}”<Icon name="close" /></button>}
            {activeCount > 0 && <button type="button" className="link" onClick={clearAll}>{t('birds.clearAll')}</button>}
          </div>
          {results.length ? (
            <div className={s.grid}>{results.map((b, i) => <BirdCard key={b.id} bird={b} index={i} />)}</div>
          ) : (
            <div className={s.empty}>
              <Icon name="search" />
              <h3 className="h3">{t('birds.emptyTitle')}</h3>
              <p>{t('birds.emptyBody')}</p>
              <div className={s.emptyActions}>
                <button type="button" className={s.clearBtn} onClick={clearAll}>{t('birds.clearAll')}</button>
                <WhatsAppButton label={t('cta.askWhatsapp')} size="sm" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={cx(s.sheetWrap, drawer && s.sheetOpen)} aria-hidden={!drawer}>
        <div className={s.scrim} onClick={() => setDrawer(false)} />
        <div className={s.sheet} ref={drawerRef} role="dialog" aria-modal="true" aria-label={t('birds.filters')} tabIndex={-1}>
          <div className={s.sheetHead}>
            <h2 className={s.asideTitle}>{t('birds.filters')}</h2>
            <button type="button" className={s.close} onClick={() => setDrawer(false)} aria-label={t('a11y.close')}><Icon name="close" /></button>
          </div>
          <div className={s.sheetBody}>{panel}</div>
          <div className={s.sheetFoot}>
            <button type="button" className={s.clearBtn} onClick={clearAll}>{t('birds.clearAll')}</button>
            <button type="button" className={s.showBtn} onClick={() => setDrawer(false)}>{t('birds.showResults', { n: results.length })}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
