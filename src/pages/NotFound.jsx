import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useDocTitle } from '../lib/hooks.js';
import { useMedia } from '../lib/mediaStore.jsx';
import Button from '../components/Button.jsx';
import Icon, { Mark } from '../components/Icon.jsx';
import s from './Legal.module.css';

export default function NotFound({ message }) {
  const { t } = useI18n();
  const { logo } = useMedia();
  useDocTitle(t('notFound.title'));
  const links = [['/birds', 'nav.allBirds'], ['/breeds', 'nav.breeds'], ['/our-farm', 'nav.farm'], ['/contact', 'nav.contact']];
  return (
    <section className={s.nf}>
      <div className="container">
        <div className={s.nfMark} aria-hidden="true"><Mark logo={logo} /></div>
        <p className={s.code}>404</p>
        <h1 className="h1">{t('notFound.title')}</h1>
        <p className="lede">{message || t('notFound.body')}</p>
        <Button to="/" arrow className={s.nfBtn}>{t('cta.backHome')}</Button>
        <p className={s.help}>{t('notFound.help')}</p>
        <ul className={s.links}>{links.map(([to, k]) => <li key={to}><Link to={to}>{t(k)}<Icon name="arrow" /></Link></li>)}</ul>
      </div>
    </section>
  );
}
