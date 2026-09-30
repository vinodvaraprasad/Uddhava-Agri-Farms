import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import s from './Button.module.css';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { waLink } from '../lib/whatsapp.js';

const cx = (...a) => a.filter(Boolean).join(' ');

export default function Button({ to, href, variant = 'primary', size, icon, arrow, full, className, children, ...rest }) {
  const cls = cx(s.btn, s[variant], size === 'sm' && s.sm, full && s.full, className);
  const inner = (<>{icon && <Icon name={icon} className={s.icon} />}<span className={s.label}>{children}</span>{arrow && <Icon name="arrow" className={s.arrow} />}</>);
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}

// Opens WhatsApp with a prepared message. Nothing is sent until the visitor presses send there.
export function WhatsAppButton({ message, label, variant = 'primary', ...rest }) {
  const { t } = useI18n();
  return (
    <Button href={waLink(message || t('wa.general'))} target="_blank" rel="noopener noreferrer" icon="wa" variant={variant} {...rest}>
      {label || t('cta.whatsapp')}
    </Button>
  );
}
