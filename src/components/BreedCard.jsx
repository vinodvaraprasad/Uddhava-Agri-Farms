import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { INVENTORY } from '../data/inventory.js';
import { ConceptMedia } from './Media.jsx';
import Icon from './Icon.jsx';
import s from './BreedCard.module.css';

const TONES = ['sage', 'clay', 'sand', 'mist'];
export default function BreedCard({ variety, index = 0, showCount = true }) {
  const { t } = useI18n();
  const nav = useNavigate();
  const to = `/breeds/${variety.slug}`;
  const n = INVENTORY.filter((b) => b.variety === variety.slug).length;
  return (
    <div className={s.card} data-reveal="up" style={{ '--d': index % 4 }} onClick={(e) => { if (!e.target.closest('a,button')) nav(to); }}>
      <ConceptMedia id={variety.media} tone={TONES[index % 4]} className={s.media}>
        <span className={s.scrim} />
      </ConceptMedia>
      {variety.demo && <span className={`demo-tag ${s.demo}`}>{t('common.demo')}</span>}
      <div className={s.text}>
        <div>
          <Link to={to} className={s.name}>{t(`variety.${variety.slug}.name`)}</Link>
          <span className={s.sub}>{t(`variety.${variety.slug}.sub`)}{showCount && ` · ${n ? t('breeds.listed', { n }) : t('breeds.noneListed')}`}</span>
        </div>
        <span className={s.go} aria-hidden="true"><Icon name="arrow" /></span>
      </div>
    </div>
  );
}
