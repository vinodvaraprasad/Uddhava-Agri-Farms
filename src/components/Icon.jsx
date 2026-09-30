export default function Icon({ name, className, style }) {
  return <svg className={className} style={style} aria-hidden="true" focusable="false"><use href={`#i-${name}`} /></svg>;
}
export function Mark({ logo = 'a', className }) {
  return <svg className={className} viewBox="0 0 120 120" aria-hidden="true" focusable="false"><use href={`#mark-${logo}`} /></svg>;
}
