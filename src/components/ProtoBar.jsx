import { useState } from 'react';
import { useMedia, PROTOTYPE } from '../lib/mediaStore.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';
import Icon from './Icon.jsx';
import s from './ProtoBar.module.css';

// Review tools for the preview build only. Not part of the customer-facing website.
export default function ProtoBar() {
  const { t } = useI18n();
  const m = useMedia();
  const [open, setOpen] = useState(false);
  if (!PROTOTYPE) return null;
  return (
    <div className={`${s.wrap} ${open ? s.open : ''}`}>
      {open && (
        <div className={s.panel} role="region" aria-label={t('proto.tools')}>
          <div className={s.row}><span>{t('proto.logo')}</span>
            <div className={s.seg}>{['a', 'b', 'c'].map((l) => <button key={l} type="button" aria-pressed={m.logo === l} onClick={() => m.setLogo(l)}>{l.toUpperCase()}</button>)}</div></div>
          <div className={s.row}><span>{t('proto.editMedia')}</span>
            <div className={s.seg}><button type="button" aria-pressed={!m.edit} onClick={() => m.setEdit(false)}>{t('proto.off')}</button><button type="button" aria-pressed={m.edit} onClick={() => m.setEdit(true)}>{t('proto.on')}</button></div></div>
          <div className={s.row}><span>{t('proto.count', { n: m.count, total: m.total })}</span><button type="button" className={s.btn} onClick={m.exportMedia}>{t('proto.export')}</button></div>
          <p className={s.note}>{t('proto.router')}</p>
        </div>
      )}
      <button type="button" className={s.toggle} aria-expanded={open} aria-label={t('proto.tools')} onClick={() => setOpen((o) => !o)}>
        <Icon name={open ? 'close' : 'image'} /><span className={s.label}>{t('proto.tools')}</span>
      </button>
    </div>
  );
}
