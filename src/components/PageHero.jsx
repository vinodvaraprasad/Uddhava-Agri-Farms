import { Link } from 'react-router-dom';
import { ConceptMedia } from './Media.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';
import s from './PageHero.module.css';

// Shared inner-page introduction: breadcrumb, title, lede, optional wide image and actions.
export default function PageHero({ crumbs = [], title, lede, media, tone = 'sage', children, eyebrow }) {
  const { t } = useI18n();
  return (
    <section className={`${s.hero} ${media ? s.withMedia : ''}`}>
      <div className="container">
        <nav aria-label={t('a11y.breadcrumb')} className={s.crumbs} data-reveal="fade">
          <Link to="/">{t('nav.home')}</Link>
          {crumbs.map((c) => (<span key={c.label}><span aria-hidden="true">/</span>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</span>))}
        </nav>
        <div className={s.head}>
          <div>
            {eyebrow}
            <h1 className={`h1 ${s.title}`} data-reveal="up">{title}</h1>
            {lede && <p className={`lede ${s.lede}`} data-reveal="up" style={{ '--d': 1 }}>{lede}</p>}
          </div>
          {children && <div className={s.actions} data-reveal="up" style={{ '--d': 2 }}>{children}</div>}
        </div>
      </div>
      {media && (
        <div className={`container ${s.mediaWrap}`}>
          <ConceptMedia id={media} tone={tone} className={s.media} />
        </div>
      )}
    </section>
  );
}
