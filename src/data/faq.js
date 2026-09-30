// FAQ structure. Text lives in translations under faq.q.<id>.
// An empty answer in the translation files means "pending": shown as awaiting confirmation.
export const FAQ = [
  { cat: 'enquiries', ids: ['how', 'prices', 'channel'] },
  { cat: 'availability', ids: ['status', 'reserve'] },
  { cat: 'location', ids: ['where', 'areas'] },
  { cat: 'breeding', ids: ['breedingInfo', 'health'] },
  { cat: 'business', ids: ['bulk', 'bizHow'] },
  { cat: 'visits', ids: ['visit'] },
  { cat: 'delivery', ids: ['delivery', 'transport'] }
];
export const HOME_FAQ = ['how', 'prices', 'bulk', 'areas'];
export const CONTACT_FAQ = ['how', 'prices', 'where', 'visit'];
