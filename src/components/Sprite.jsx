// Logo marks (concepts A, B, C) and interface icons, referenced with <use href="#id">.
const SVG = `<symbol id="mark-a" viewBox="0 0 120 120">
  <path transform="translate(0 0)" fill="var(--accent,currentColor)" stroke="var(--accent,currentColor)" stroke-width="3" stroke-linejoin="round" d="M38 44 C32 40 29 32 32 28 C35 29 38 32 41 33 C38 26 38 18 42 15 C47 17 49 23 51 27 C50 18 52 11 57 9 C61 13 61 20 62 25 C64 18 68 13 73 12 C74 17 72 23 72 29 C76 25 80 23 84 24 C83 30 81 35 80 40 Z"/>
  <g stroke="var(--knock,#F7F5EF)" stroke-width="3.5" paint-order="stroke">
    <path fill="currentColor" d="M47 45 C40 58 32 65 19 69 C27 72 33 72 38 71 C33 80 25 86 13 90 C23 92 31 91 36 89 C33 95 29 100 22 105 L82 105 C79 95 75 85 74 74 C79 70 81 64 80 57 Q84 55 92 53 Q86 45 77 43 C73 34 64 30 56 31 C50 33 47 38 47 45 Z"/>
    <path fill="var(--accent,currentColor)" d="M71 60 C80 60 83 72 78 80 C72 79 68 70 71 60 Z"/>
  </g>
  <circle cx="66" cy="44" r="2.9" fill="var(--knock,#F7F5EF)"/>
</symbol>
<symbol id="mark-b" viewBox="0 0 120 120">
  <g fill="currentColor">
    <path d="M47 62 C37 38 22 22 6 33 C19 30 32 42 40 67 Z"/>
    <path d="M44 67 C32 50 16 44 3 56 C16 50 28 57 38 71 Z"/>
    <path d="M42 72 C32 64 19 63 10 73 C20 69 31 71 38 77 Z"/>
    <path d="M40 64 C50 60 57 54 61 45 C64 37 70 31 77 31 C80 31 83 32 85 35 L93 38 Q88 40 84 41 C82 45 83 48 86 52 C93 60 92 75 82 84 C72 92 53 91 45 83 C39 77 38 70 40 64 Z"/>
  </g>
  <g fill="var(--accent,currentColor)"><path transform="translate(58.5 18) scale(0.32)" fill="var(--accent,currentColor)" stroke="var(--accent,currentColor)" stroke-width="4" stroke-linejoin="round" d="M38 44 C32 40 29 32 32 28 C35 29 38 32 41 33 C38 26 38 18 42 15 C47 17 49 23 51 27 C50 18 52 11 57 9 C61 13 61 20 62 25 C64 18 68 13 73 12 C74 17 72 23 72 29 C76 25 80 23 84 24 C83 30 81 35 80 40 Z"/><ellipse cx="85" cy="46.5" rx="2.8" ry="5.2"/></g>
  <circle cx="78.5" cy="36" r="1.9" fill="var(--knock,#F7F5EF)"/>
  <g fill="none" stroke="var(--knock,#F7F5EF)" stroke-linecap="round"><path d="M62 47 C60 56 53 62 46 64" stroke-width="2"/><path d="M50 74 C60 68 72 70 78 78" stroke-width="2.2"/></g>
  <g fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M58 89 L56 106 L63 106"/><path d="M68 89 L70 106 L77 106"/></g>
</symbol>
<symbol id="mark-c" viewBox="0 0 120 120">
  <path fill="var(--accent,currentColor)" d="M24 60 C12 52 4 42 1 29 C9 38 17 44 25 48 Z"/>
  <path fill="currentColor" d="M43 44 C40 24 30 10 9 7 C23 15 25 30 25 44 Z"/>
  <path fill="none" stroke="currentColor" stroke-width="18" d="M34 43 V70 A26 26 0 0 0 86 70 V44"/>
  <path transform="translate(59 5) scale(0.52)" fill="var(--accent,currentColor)" stroke="var(--accent,currentColor)" stroke-width="3.5" stroke-linejoin="round" d="M38 44 C32 40 29 32 32 28 C35 29 38 32 41 33 C38 26 38 18 42 15 C47 17 49 23 51 27 C50 18 52 11 57 9 C61 13 61 20 62 25 C64 18 68 13 73 12 C74 17 72 23 72 29 C76 25 80 23 84 24 C83 30 81 35 80 40 Z"/>
  <g stroke="var(--knock,#F7F5EF)" stroke-width="3" paint-order="stroke">
    <circle cx="87" cy="35" r="12.5" fill="currentColor"/>
    <path fill="currentColor" d="M97 30 Q106 31 110.5 37.5 Q104 39.5 97 41 Z"/>
    <g fill="var(--accent,currentColor)"><ellipse cx="98" cy="49" rx="3.6" ry="6.6"/><ellipse cx="92.5" cy="50" rx="3" ry="5.4"/></g>
  </g>
  <circle cx="91" cy="32" r="2.3" fill="var(--knock,#F7F5EF)"/>
</symbol>
<symbol id="i-wa" viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path fill="currentColor" d="M9.1 8.3c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .4-.1.6l-.5.6c-.1.1-.1.3 0 .5a6 6 0 0 0 2.6 2.4c.2.1.4.1.5 0l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.3.3.3.5v.4c0 .4-.2.8-.6 1a3 3 0 0 1-2.4.3 8.5 8.5 0 0 1-5-4.6c-.4-1-.4-2 .1-3z"/></symbol>
<symbol id="i-globe" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z"/></g></symbol>
<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
<symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-camera" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.2"/></g></symbol>
<symbol id="i-video" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></g></symbol>
<symbol id="i-tag" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.4"/></g></symbol>
<symbol id="i-chat" viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></g></symbol>
<symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></symbol>
<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
<symbol id="i-upload" viewBox="0 0 24 24"><path d="M12 16V4M7 9l5-5 5 5M5 20h14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-text" viewBox="0 0 24 24"><path d="M5 6h14M5 10h14M5 14h10M5 18h7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
<symbol id="i-image" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M4 18l5-5 4 4 3-3 4 4"/></g></symbol>
<symbol id="i-expand" viewBox="0 0 24 24"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-search" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></g></symbol>
<symbol id="i-filter" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
<symbol id="i-leaf" viewBox="0 0 24 24"><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14M5 19l7-7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 19s-7-4.4-7-9.5A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 2.5C19 14.6 12 19 12 19z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
<symbol id="i-users" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="9" cy="9" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.5a3 3 0 0 1 0 6M17.5 19a5 5 0 0 0-2-4"/></g></symbol>
<symbol id="i-sun" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/></g></symbol>
<symbol id="i-moon" viewBox="0 0 24 24"><path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
<symbol id="i-mute" viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4zM17 9l4 6M21 9l-4 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></symbol>
<symbol id="i-sound" viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4zM17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></symbol>
<symbol id="i-pause" viewBox="0 0 24 24"><path d="M8 5v14M16 5v14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></symbol>
`;
export default function Sprite() {
  return <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: `<defs>${SVG}</defs>` }} />;
}
