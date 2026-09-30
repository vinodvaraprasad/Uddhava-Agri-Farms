import { useId, useState } from 'react';
import Icon from './Icon.jsx';
import s from './Accordion.module.css';

// Accessible accordion: buttons with aria-expanded controlling labelled regions.
export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen === null ? [] : [defaultOpen]));
  const uid = useId();
  const toggle = (i) => setOpen((prev) => { const n = new Set(prev); if (n.has(i)) n.delete(i); else n.add(i); return n; });
  return (
    <div className={s.acc}>
      {items.map((it, i) => {
        const isOpen = open.has(i);
        return (
          <div key={it.id || i} className={s.item}>
            <h3 className={s.h}>
              <button type="button" className={s.q} aria-expanded={isOpen} aria-controls={`${uid}-p${i}`} id={`${uid}-b${i}`} onClick={() => toggle(i)}>
                <span>{it.q}</span><Icon name="plus" className={s.icon} />
              </button>
            </h3>
            <div className={`${s.a} ${isOpen ? s.open : ''}`} id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`}>
              <div><div className={s.body}>{it.a}</div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
