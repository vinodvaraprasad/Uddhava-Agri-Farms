import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV } from '../data/nav.js';
import { useI18n, LANGUAGES } from '../i18n/I18nProvider.jsx';
import { useMedia } from '../lib/mediaStore.jsx';
import { useFocusTrap, useScrollLock } from '../lib/hooks.js';
import { waLink } from '../lib/whatsapp.js';
import { ConceptMedia } from './Media.jsx';
import Icon, { Mark } from './Icon.jsx';
import s from './Header.module.css';

const cx = (...a) => a.filter(Boolean).join(' ');

function Brand({ onClick }) {
  const { t } = useI18n();
  const { logo } = useMedia();
  return (
    <Link to="/" className={s.brand} aria-label={t('a11y.home')} onClick={onClick}>
      <Mark logo={logo} className={s.mark} />
      <span className={s.wordmark}><span className={s.name}>UDDHAVA</span><span className={s.sub}>AGRI FARMS</span></span>
    </Link>
  );
}

function LanguageMenu({ compact }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const key = (e) => { if (e.key === 'Escape') { setOpen(false); ref.current?.querySelector('button')?.focus(); } };
    document.addEventListener('pointerdown', close); document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', key); };
  }, [open]);
  return (
    <div className={s.lang} ref={ref}>
      <button type="button" className={s.langBtn} aria-haspopup="true" aria-expanded={open} onClick={() => setOpen((o) => !o)}
        aria-label={`${t('a11y.language')}: ${LANGUAGES[lang].label}`}>
        <Icon name="globe" className={s.globe} /><span className={s.langShort}>{LANGUAGES[lang].short}</span>{!compact && <Icon name="chev" className={s.chev} />}
      </button>
      <div className={cx(s.langMenu, open && s.open)} role="menu">
        {Object.values(LANGUAGES).map((l) => (
          <button key={l.code} type="button" role="menuitemradio" aria-checked={lang === l.code} lang={l.code} className={s.langOpt}
            onClick={() => { setLang(l.code); setOpen(false); }}>
            <span>{l.label}</span>{lang === l.code && <Icon name="check" className={s.tick} />}
          </button>
        ))}
      </div>
    </div>
  );
}

function ExploreMenu({ item }) {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timer = useRef();
  const active = pathname === item.base || pathname.startsWith(`${item.base}/`);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const key = (e) => { if (e.key === 'Escape') { setOpen(false); ref.current?.querySelector('button')?.focus(); } };
    document.addEventListener('pointerdown', close); document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', key); };
  }, [open]);
  const enter = () => { clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 160); };
  return (
    <li className={s.item} ref={ref} onMouseEnter={enter} onMouseLeave={leave}
      onBlur={(e) => { if (!ref.current.contains(e.relatedTarget)) setOpen(false); }}>
      <button type="button" className={cx(s.link, s.trigger, active && s.active)} aria-expanded={open} aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}>
        {t(item.key)}<Icon name="chev" className={cx(s.chev, open && s.chevOpen)} />
      </button>
      <div className={cx(s.dropdown, open && s.open)}>
        <ul className={s.dropList}>
          {item.children.map((c) => (
            <li key={c.to}>
              <NavLink to={c.to} end={c.end} className={({ isActive }) => cx(s.dropItem, isActive && s.dropActive)}>
                <ConceptMedia id={c.media} tone="sage" className={s.dropThumb} />
                <span><span className={s.dropTitle}>{t(c.key)}</span><span className={s.dropDesc}>{t(c.desc)}</span></span>
                <Icon name="arrow" className={s.dropArrow} />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function Drawer({ open, onClose }) {
  const { t, lang, setLang } = useI18n();
  const ref = useRef(null);
  const [sub, setSub] = useState(false);
  useScrollLock(open);
  useFocusTrap(open, ref, onClose);
  // Rendered at <body> level: the header's backdrop-filter would otherwise trap this fixed panel
  return createPortal(
    <div className={cx(s.drawerWrap, open && s.drawerOpen)} aria-hidden={!open}>
      <div className={s.scrim} onClick={onClose} />
      <div className={s.drawer} ref={ref} role="dialog" aria-modal="true" aria-label={t('a11y.mainNav')} tabIndex={-1}>
        <div className={s.drawerTop}>
          <Brand onClick={onClose} />
          <button type="button" className={s.iconBtn} onClick={onClose} aria-label={t('a11y.closeMenu')}><Icon name="close" /></button>
        </div>
        <nav className={s.drawerNav} aria-label={t('a11y.mainNav')}>
          {NAV.map((n) => n.children ? (
            <div key={n.key} className={s.dGroup}>
              <button type="button" className={s.dLink} aria-expanded={sub} onClick={() => setSub((v) => !v)}>
                {t(n.key)}<Icon name="chev" className={cx(s.chev, sub && s.chevOpen)} />
              </button>
              <div className={cx(s.dSub, sub && s.dSubOpen)}>
                <div>
                  {n.children.map((c) => (
                    <NavLink key={c.to} to={c.to} end={c.end} onClick={onClose} className={({ isActive }) => cx(s.dSubLink, isActive && s.dActive)}>
                      <span>{t(c.key)}</span><small>{t(c.desc)}</small>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <NavLink key={n.to} to={n.to} end={n.end} onClick={onClose} className={({ isActive }) => cx(s.dLink, isActive && s.dActive)}>
              {t(n.key)}<Icon name="arrow" className={s.dArrow} />
            </NavLink>
          ))}
        </nav>
        <div className={s.drawerFoot}>
          <p className={s.dLabel}>{t('a11y.language')}</p>
          <div className={s.seg} role="radiogroup" aria-label={t('a11y.language')}>
            {Object.values(LANGUAGES).map((l) => (
              <button key={l.code} type="button" role="radio" aria-checked={lang === l.code} lang={l.code} onClick={() => setLang(l.code)}>{l.label}</button>
            ))}
          </div>
          <a className={s.drawerWa} href={waLink(t('wa.general'))} target="_blank" rel="noopener noreferrer"><Icon name="wa" />{t('cta.whatsapp')}</a>
        </div>
      </div>
    </div>, document.body
  );
}

export default function Header() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setDrawer(false), [pathname]);
  return (
    <header className={cx(s.header, scrolled && s.scrolled)}>
      <a className="skip-link" href="#main">{t('a11y.skip')}</a>
      <div className={cx('container', s.bar)}>
        <Brand />
        <nav className={s.nav} aria-label={t('a11y.mainNav')}>
          <ul className={s.list}>
            {NAV.map((n) => n.children ? <ExploreMenu key={n.key} item={n} /> : (
              <li key={n.to} className={s.item}>
                <NavLink to={n.to} end={n.end} className={({ isActive }) => cx(s.link, isActive && s.active)}>{t(n.key)}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <nav className={s.quick} aria-label={t('a11y.mainNav')}>
          <NavLink to="/breeds" className={({ isActive }) => cx(s.link, isActive && s.active)}>{t('nav.breeds')}</NavLink>
          <NavLink to="/birds" className={({ isActive }) => cx(s.link, isActive && s.active)}>{t('nav.explore')}</NavLink>
        </nav>
        <div className={s.actions}>
          <LanguageMenu />
          <a className={s.wa} href={waLink(t('wa.general'))} target="_blank" rel="noopener noreferrer" aria-label={t('cta.whatsapp')}>
            <Icon name="wa" className={s.waIcon} /><span className={s.waLong}>{t('cta.whatsapp')}</span><span className={s.waShort}>{t('cta.whatsappShort')}</span>
          </a>
          <button type="button" className={cx(s.iconBtn, s.menuBtn)} aria-label={t('a11y.openMenu')} aria-expanded={drawer} onClick={() => setDrawer(true)}>
            <Icon name="menu" />
          </button>
        </div>
      </div>
      <Drawer open={drawer} onClose={() => setDrawer(false)} />
    </header>
  );
}
