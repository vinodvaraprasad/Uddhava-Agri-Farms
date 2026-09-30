import { ConceptMedia } from './Media.jsx';
import { WhatsAppButton } from './Button.jsx';
import Button from './Button.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';
import s from './EnquiryCTA.module.css';

export default function EnquiryCTA({ title, body, message, media = 'closePortrait', secondary = { to: '/contact', key: 'cta.contactFarm' } }) {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className={`container ${s.wrap}`}>
        <div className={s.text} data-reveal="up">
          <h2 className="h2">{title}</h2>
          <p className="lede">{body}</p>
          <div className={s.ctas}>
            <WhatsAppButton message={message} />
            {secondary && <Button to={secondary.to} variant="secondary" arrow>{t(secondary.key)}</Button>}
          </div>
        </div>
        <div data-reveal="clip"><ConceptMedia id={media} tone="mist" className={s.media} /></div>
      </div>
    </section>
  );
}
