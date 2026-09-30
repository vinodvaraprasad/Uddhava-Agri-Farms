// Gallery items reference media ids; tags drive the filters (only tags present are offered).
export const GALLERY = [
  { media: 'landscapeVideo', tags: ['farm', 'videos'], size: 'wide', cap: 'farm.dayMorningCap' },
  { media: 'reelVideo1', tags: ['hens', 'videos'], size: 'tall', reel: true, cap: 'home.cardLabel' },
  { media: 'reelVideo2', tags: ['roosters', 'videos'], size: 'tall', reel: true, cap: 'home.cardLabel' },
  { media: 'galleryForage', tags: ['hens', 'farm'], cap: 'farm.dayDayCap' },
  { media: 'galleryFeed', tags: ['hens', 'roosters', 'farm'], cap: 'farm.dayMorningCap' },
  { media: 'galleryPath', tags: ['farm'], cap: 'farm.story1' },
  { media: 'galleryEvening', tags: ['hens', 'farm'], cap: 'farm.dayEveningCap' },
  { media: 'heroActivity', tags: ['hens', 'videos'], size: 'tall', reel: true, cap: 'home.cardLabel' },
  { media: 'catRooster', tags: ['roosters'], cap: 'common.roosters' },
  { media: 'catHen2', tags: ['hens'], cap: 'common.hens' },
  { media: 'hero', tags: ['roosters'], size: 'wide', cap: 'common.roosters' },
  { media: 'catRooster2', tags: ['roosters'], cap: 'common.roosters' },
  { media: 'farmHands', tags: ['farm', 'hens'], cap: 'farm.story3' },
  { media: 'closePortrait', tags: ['hens'], cap: 'common.hens' },
  { media: 'bizFlock', tags: ['farm', 'roosters', 'hens'], size: 'wide', cap: 'farm.story2' },
  { media: 'farmMorning', tags: ['farm'], cap: 'farm.story1' }
];
export const GALLERY_FILTERS = ['all', 'roosters', 'hens', 'farm', 'videos'];
