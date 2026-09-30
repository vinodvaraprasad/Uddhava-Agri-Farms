import { useI18n } from '../i18n/I18nProvider.jsx';
import { useDocTitle } from '../lib/hooks.js';
import { useMedia } from '../lib/mediaStore.jsx';
import PageHero from '../components/PageHero.jsx';
import { ConceptMedia } from '../components/Media.jsx';
import EnquiryCTA from '../components/EnquiryCTA.jsx';
import Icon, { Mark } from '../components/Icon.jsx';
import s from './Story.module.css';

export default function About() {
  const { t } = useI18n();
  const { logo } = useMedia();
  useDocTitle(t('nav.about'));
  const values = [['camera', 'about.v1', 'about.v1Body'], ['heart', 'about.v2', 'about.v2Body'], ['leaf', 'about.v3', 'about.v3Body'], ['users', 'about.v4', 'about.v4Body']];
  return (
    <>
      <PageHero crumbs={[{ label: t('nav.about') }]} title={t('about.title')} lede={t('about.lede')} media="aboutHero" tone="sage" />

      <section className="section">
        <div className={`container ${s.identity}`}>
          <div className={s.lockup} data-reveal="scale">
            <Mark logo={logo} className={s.bigMark} />
            <span className={s.wm}><span>UDDHAVA</span><span>AGRI FARMS</span></span>
          </div>
          <div data-reveal="up" style={{ '--d': 1 }}>
            <h2 className={`h2 ${s.italic}`}>{t('about.identityTitle')}</h2>
            <p className="lede">{t('about.identityBody')}</p>
          </div>
        </div>
      </section>

      <section className="section section-sand">
        <div className={`container ${s.split}`}>
          <div data-reveal="up"><h2 className="h2">{t('about.storyTitle')}</h2></div>
          <div className={s.pendingCard} data-reveal="up" style={{ '--d': 1 }}>
            <span className="pending-tag">{t('common.pending')}</span>
            <p>{t('about.storyPending')}</p>
            <div className={s.lines} aria-hidden="true"><i /><i /><i /><i /></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row-head" data-reveal="up"><h2 className="h2">{t('about.valuesTitle')}</h2></div>
          <ul className={s.values}>
            {values.map(([icon, h, p], i) => (
              <li key={h} data-reveal="up" style={{ '--d': i }}>
                <span className={s.vIcon}><Icon name={icon} /></span><h3>{t(h)}</h3><p>{t(p)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-sand">
        <div className={`container ${s.heritage}`}>
          <div data-reveal="clip"><ConceptMedia id="galleryPath" tone="sand" className={s.heritageMedia} /></div>
          <div data-reveal="left"><h2 className="h2">{t('about.heritageTitle')}</h2><p className="lede">{t('about.heritageBody')}</p></div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.split}`}>
          <div data-reveal="up"><h2 className="h2">{t('about.peopleTitle')}</h2></div>
          <div className={s.people} data-reveal="up" style={{ '--d': 1 }}>
            {[0, 1].map((i) => (
              <div key={i} className={s.person}>
                <span className={s.avatar}><Icon name="users" /></span>
                <div><span className="pending-tag">{t('common.pending')}</span><p>{t('about.peoplePending')}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.vision}>
        <div className="container" data-reveal="up">
          <p className="eyebrow">{t('about.visionTitle')}</p>
          <p className={s.visionText}>{t('about.visionBody')}</p>
        </div>
      </section>
      <EnquiryCTA title={t('home.closeTitle')} body={t('home.closeBody')} media="farmHands" secondary={{ to: '/our-farm', key: 'cta.ourFarm' }} />
    </>
  );
}
