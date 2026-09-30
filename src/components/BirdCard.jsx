import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { RealMedia } from './Media.jsx';
import { waLink, birdMessage } from '../lib/whatsapp.js';
import Icon from './Icon.jsx';
import s from './BirdCard.module.css';

export default function BirdCard({ bird, index = 0 }) {
  const { t } = useI18n();
  const nav = useNavigate();
  const to = `/birds/${bird.id}`;
  return (
    <article className={s.card} data-reveal="up" style={{ '--d': index % 4 }}
      onClick={(e) => { if (!e.target.closest('a,button')) nav(to); }}>
      <div className={s.media}>
        <span className={`${s.status} ${s[bird.status]}`}><i />{t(`common.${bird.status}`)}</span>
        <RealMedia kind="photo" className={s.photo} />
      </div>
      <div className={s.body}>
        <div className={s.top}><span className={s.id}>{bird.id}</span>{bird.demo && <span className="demo-tag">{t('common.demo')}</span>}</div>
        <h3 className={s.title}><Link to={to}>{t(`variety.${bird.variety}.name`)}</Link></h3>
        <dl className={s.spec}>
          <div><dt>{t('bird.age')}</dt><dd>{t('common.monthsShort', { n: bird.ageMonths })}</dd></div>
          <div><dt>{t('bird.weight')}</dt><dd>{t('common.kg', { n: bird.weightKg })}</dd></div>
          <div><dt>{t('bird.colour')}</dt><dd>{t(`colour.${bird.colour}`)}</dd></div>
        </dl>
        <div className={s.actions}>
          <Link to={to} className={s.details}>{t('cta.viewDetails')}<Icon name="arrow" /></Link>
          <a className={s.wa} href={waLink(birdMessage(t, bird))} target="_blank" rel="noopener noreferrer" aria-label={t('a11y.enquireAbout', { id: bird.id })}><Icon name="wa" /></a>
        </div>
      </div>
    </article>
  );
}
