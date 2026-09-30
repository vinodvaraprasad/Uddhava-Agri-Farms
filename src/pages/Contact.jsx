import { useState } from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { useDocTitle } from '../lib/hooks.js';
import { SITE } from '../data/site.js';
import { CONTACT_FAQ } from '../data/faq.js';
import { waLink } from '../lib/whatsapp.js';
import PageHero from '../components/PageHero.jsx';
import Accordion from '../components/Accordion.jsx';
import { WhatsAppButton } from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import s from './Contact.module.css';

const EMPTY = { buyer: 'individual', name: '', location: '', interest: '', qty: '', message: '' };

export default function Contact() {
  const { t } = useI18n();
  useDocTitle(t('nav.contact'));
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [opened, setOpened] = useState(false);
  const set = (k) => (e) => { setF((p) => ({ ...p, [k]: e.target.value })); setErrors((er) => ({ ...er, [k]: undefined })); setOpened(false); };
  const business = f.buyer === 'business';

  const validate = () => {
    const er = {};
    if (f.name.trim().length < 2) er.name = 'contact.errName';
    if (f.location.trim().length < 2) er.location = 'contact.errLocation';
    if (!f.interest.trim()) er.interest = 'contact.errInterest';
    if (business && !(Number(f.qty) >= 1)) er.qty = 'contact.errQty';
    if (!business && f.qty && !(Number(f.qty) >= 1)) er.qty = 'contact.errQty';
    return er;
  };
  const submit = (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) { document.getElementById(`c-${first}`)?.focus(); return; }
    const lines = [
      t('wa.form'), '',
      `${t('wa.formName')}: ${f.name.trim()}`,
      `${t('wa.formLocation')}: ${f.location.trim()}`,
      `${t('wa.formType')}: ${t(business ? 'contact.business' : 'contact.individual')}`,
      `${t('wa.formInterest')}: ${f.interest.trim()}`,
      f.qty && `${t('wa.formQty')}: ${f.qty}`,
      f.message.trim() && `${t('wa.formMessage')}: ${f.message.trim()}`
    ].filter((l) => l !== false && l !== undefined && l !== null);
    window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    setOpened(true);
  };
  const field = (k, label, props = {}, hint) => (
    <div className={`${s.field} ${errors[k] ? s.invalid : ''}`}>
      <label htmlFor={`c-${k}`}>{label}{props.optional && <span className={s.opt}> ({t('contact.optional')})</span>}</label>
      {props.textarea
        ? <textarea id={`c-${k}`} rows={4} value={f[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `c-${k}-err` : undefined} />
        : <input id={`c-${k}`} type={props.type || 'text'} inputMode={props.inputMode} min={props.min} value={f[k]} placeholder={props.placeholder} autoComplete={props.autoComplete} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={[errors[k] && `c-${k}-err`, hint && `c-${k}-hint`].filter(Boolean).join(' ') || undefined} />}
      {hint && <span id={`c-${k}-hint`} className={s.hint}>{hint}</span>}
      {errors[k] && <span id={`c-${k}-err`} className={s.err} role="alert">{t(errors[k])}</span>}
    </div>
  );
  const faq = CONTACT_FAQ.map((id) => ({ id, q: t(`faq.q.${id}.q`), a: t(`faq.q.${id}.a`) || <><span className="pending-tag">{t('common.pending')}</span> {t('faq.pendingAnswer')}</> }));

  return (
    <>
      <PageHero crumbs={[{ label: t('nav.contact') }]} title={t('contact.title')} lede={t('contact.lede')} media="contactHero" tone="sage" />
      <section className={s.cards}>
        <div className="container">
          <div className={s.cardGrid}>
            <a className={`${s.card} ${s.primary}`} href={waLink(t('wa.general'))} target="_blank" rel="noopener noreferrer" data-reveal="up">
              <span className={s.cIcon}><Icon name="wa" /></span>
              <h2>{t('contact.waTitle')}</h2><p className={s.big}>{SITE.whatsappDisplay}</p><p>{t('contact.waBody')}</p>
              <span className={s.cGo}>{t('cta.chat')}<Icon name="arrow" /></span>
            </a>
            <div className={s.card} data-reveal="up" style={{ '--d': 1 }}>
              <span className={s.cIcon}><Icon name="pin" /></span>
              <h2>{t('contact.locTitle')}</h2><p className={s.big}>{t('contact.locBody')}</p>
              <p className={s.pend}><span className="pending-tag">{t('common.pending')}</span>{t('contact.locPending')}</p>
            </div>
            <div className={s.card} data-reveal="up" style={{ '--d': 2 }}>
              <span className={s.cIcon}><Icon name="phone" /></span>
              <h2>{t('contact.phoneTitle')}</h2>
              <p className={s.pend}><span className="pending-tag">{t('common.pending')}</span>{t('contact.phonePending')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-sand">
        <div className={`container ${s.formWrap}`}>
          <div data-reveal="up">
            <h2 className="h2">{t('contact.formTitle')}</h2>
            <p className="lede">{t('contact.formBody')}</p>
            <div className={s.biz}>
              <h3>{t('contact.bizTitle')}</h3>
              <p>{t('contact.bizBody')}</p>
              <WhatsAppButton message={t('wa.business')} label={t('cta.business')} variant="secondary" size="sm" />
            </div>
          </div>
          <form className={s.form} onSubmit={submit} noValidate data-reveal="up" style={{ '--d': 1 }}>
            <fieldset className={s.buyer}>
              <legend>{t('contact.buyerType')}</legend>
              <div className={s.seg}>
                {['individual', 'business'].map((b) => (
                  <label key={b} className={f.buyer === b ? s.segOn : ''}>
                    <input type="radio" name="buyer" value={b} checked={f.buyer === b} onChange={set('buyer')} />
                    <Icon name={b === 'business' ? 'users' : 'heart'} />{t(`contact.${b}`)}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className={s.row2}>
              {field('name', t('contact.name'), { autoComplete: 'name' })}
              {field('location', t('contact.location'), { autoComplete: 'address-level2' })}
            </div>
            {field('interest', t('contact.interest'), { placeholder: t('contact.interestPh') })}
            {field('qty', t('contact.qty'), { type: 'number', inputMode: 'numeric', min: 1, optional: !business }, t('contact.qtyHint'))}
            {field('message', t('contact.message'), { textarea: true, optional: true })}
            <button type="submit" className={s.submit}><Icon name="wa" />{t('contact.submit')}</button>
            {opened && <p className={s.opened} role="status"><Icon name="check" />{t('contact.opened')}</p>}
          </form>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.faq}`}>
          <h2 className="h2" data-reveal="up">{t('contact.faqTitle')}</h2>
          <div data-reveal="up" style={{ '--d': 1 }}><Accordion items={faq} /></div>
        </div>
      </section>
    </>
  );
}
