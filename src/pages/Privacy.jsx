import { useI18n } from '../i18n/I18nProvider.jsx';
import { useDocTitle } from '../lib/hooks.js';
import PageHero from '../components/PageHero.jsx';
import s from './Legal.module.css';

export default function Privacy() {
  const { t } = useI18n();
  useDocTitle(t('privacy.title'));
  const sections = [1, 2, 3, 4, 5];
  return (
    <>
      <PageHero crumbs={[{ label: t('privacy.title') }]} title={t('privacy.title')} />
      <section className={s.body}>
        <div className={`container ${s.layout}`}>
          <nav className={s.toc} aria-label={t('privacy.title')}>
            <ol>{sections.map((n) => <li key={n}><button type="button" onClick={() => document.getElementById(`p-${n}`)?.scrollIntoView({ behavior: 'smooth' })}>{t(`privacy.s${n}`)}</button></li>)}</ol>
          </nav>
          <div>
            <p className={s.draft}><span className="pending-tag">{t('common.pending')}</span>{t('privacy.draft')}</p>
            {sections.map((n) => (
              <section key={n} id={`p-${n}`} className={s.sec} data-reveal="up">
                <h2 className="h3">{n}. {t(`privacy.s${n}`)}</h2>
                <p>{t(`privacy.s${n}Body`)}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
