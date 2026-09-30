export const NAV = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/breeds', key: 'nav.breeds' },
  { key: 'nav.explore', base: '/birds', children: [
    { to: '/birds', key: 'nav.allBirds', desc: 'nav.allBirdsDesc', end: true, media: 'bizFlock' },
    { to: '/birds/roosters', key: 'nav.roosters', desc: 'nav.roostersDesc', media: 'catRooster' },
    { to: '/birds/hens', key: 'nav.hens', desc: 'nav.hensDesc', media: 'catHen' }
  ] },
  { to: '/our-farm', key: 'nav.farm' },
  { to: '/gallery', key: 'nav.gallery' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' }
];
