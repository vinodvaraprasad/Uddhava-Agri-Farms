import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useMedia } from '../lib/mediaStore.jsx';
import { SITE } from '../data/site.js';
import { waLink } from '../lib/whatsapp.js';
import { WhatsAppButton } from './Button.jsx';
import Icon, { Mark } from './Icon.jsx';
import s from './Footer.module.css';

export default function Footer() {
  const { t } = useI18n();
  const { logo } = useMedia();
  const cols = [
    { title: 'footer.birds', links: [['/birds', 'nav.allBirds'], ['/birds/roosters', 'nav.roosters'], ['/birds/hens', 'nav.hens'], ['/breeds', 'nav.breeds']] },
    { title: 'footer.farm', links: [['/our-farm', 'nav.farm'], ['/about', 'nav.about'], ['/gallery', 'nav.gallery'], ['/faq', 'nav.faq']] }
  ];
  return (
    <footer className={s.footer}>
      <div className={`container ${s.grid}`}>
        <div className={s.brandCol}>
          <Link to="/" className={s.lock} aria-label={t('a11y.home')}>
            <Mark logo={logo} className={s.mark} />
            <span className={s.wm}><span>UDDHAVA</span><span>AGRI FARMS</span></span>
          </Link>
          <p className={s.tag}>{t('meta.tagline')}</p>
          <WhatsAppButton variant="light" />
        </div>
        <div className={s.cols}>
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className={s.h}>{t(c.title)}</h2>
              <ul>{c.links.map(([to, k]) => <li key={to}><Link to={to}>{t(k)}</Link></li>)}</ul>
            </div>
          ))}
          <div>
            <h2 className={s.h}>{t('footer.contact')}</h2>
            <ul className={s.contact}>
              <li><Icon name="wa" /><a href={waLink(t('wa.general'))} target="_blank" rel="noopener noreferrer">{SITE.whatsappDisplay}</a></li>
              <li><Icon name="pin" /><span>{t('common.location')}</span></li>
              <li><Icon name="chat" /><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`container ${s.base}`}>
        <span>{t('footer.rights', { year: new Date().getFullYear() })}</span>
        <Link to="/privacy-policy">{t('nav.privacy')}</Link>
      </div>
      <div className={s.giant} aria-hidden="true">UDDHAVA</div>
    </footer>
  );
}
