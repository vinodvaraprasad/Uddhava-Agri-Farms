// DEMO varieties. Names are samples; no characteristics are stated anywhere.
// Display names live in the translation files under variety.<slug>.
// `characteristics` stays empty until the farm confirms facts.
export const VARIETIES = [
  { slug: 'aseel', media: 'varAseel', demo: true, characteristics: [] },
  { slug: 'kadaknath', media: 'varKadaknath', demo: true, characteristics: [] },
  { slug: 'native-country-chicken', media: 'varCountry', demo: true, characteristics: [] },
  { slug: 'regional-variety-1', media: 'varRegional1', demo: true, characteristics: [] },
  { slug: 'regional-variety-2', media: 'varRegional2', demo: true, characteristics: [] },
  { slug: 'regional-variety-3', media: 'varRegional3', demo: true, characteristics: [] }
].map((v) => ({ ...v, gallery: [v.media, v.media + '-g1', v.media + '-g2'] }));

export const varietyBySlug = (slug) => VARIETIES.find((v) => v.slug === slug);
