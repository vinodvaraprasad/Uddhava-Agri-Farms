// Concept media slots (class A). Single source of truth for brand imagery.
// id: stable key (matches the prototype store, so approved images carry over)
// file: name used to match uploaded media (npm run media:upload); the hosted URL is in media-urls.json
// Every entry is a concept placeholder until a real farm photo replaces it.
export const STYLE = 'Professional editorial photograph for a premium agricultural brand, taken on location on a small farm in rural Andhra Pradesh, India, with a full-frame camera and an 85mm lens at f/2.8 in soft natural daylight. Documentary realism: it must look like a real, unretouched photograph, not AI art, CGI or an illustration. Realistic rooster and hen anatomy: two legs with four distinct toes each, one naturally shaped comb, natural wattles, beak and eye, correct proportions, calm and relaxed natural posture. Believable feather texture with natural variation and small imperfections. Soft natural shadows on the ground, all consistent with one light direction. Real farm surfaces: uneven packed earth with small stones, dust, straw and footprints; weathered mud walls, clay tiles and old wood. Muted, true-to-life colour with gentle warmth and fine natural grain. Calm, uncluttered composition with natural depth of field. No text, logos or watermarks. Avoid: cages, fighting or aggressive poses, glowing rim light, fantasy colours, plastic-looking feathers, HDR, lens flare, over-sharpened detail, oversaturation, western-style barns.';
export const VIDEO_NOTE = 'Video version (same scene): 6 to 10 seconds, static tripod camera, natural subtle movement only, such as walking, pecking or feathers moving in a light breeze. No slow motion, no camera tricks, no text. The first frame should match the poster image.';

const BASE = {
  hero:          { kind:'image', video:true, title:'Hero: red-brown rooster in profile', ratio:'5:4', file:'brand/home/hero-rooster-red-brown-profile.jpg', legacy:['hero'],
                   p:'A single native Indian rooster with red-brown plumage standing calmly in side profile on packed red-brown earth in a village farmyard. Full body visible, tail relaxed, head raised. Low morning sun from the left. Softly blurred thatched shelter and neem trees behind. Keep the bird centred enough to crop to a square on phones.' },
  heroActivity:  { kind:'video', title:'Hero card: hen walking', ratio:'4:5', file:'brand/home/hero-activity-hen-walking.mp4', legacy:['heroLoop'],
                   p:'A brown native Indian hen walking slowly across a sunlit farmyard, one foot lifted mid-step, pecking gently at scattered grain, softly blurred mud-plastered wall behind.' },
  catRooster:    { kind:'image', title:'Roosters: black rooster', ratio:'4:5', file:'brand/birds/category-roosters-black.jpg',
                   p:'A black native Indian rooster with a natural green sheen on its feathers, three-quarter view, standing calmly on a low stone ledge in open shade beside a lime-washed wall. Slightly low camera angle, soft even light, full body visible.' },
  catRooster2:   { kind:'image', title:'Roosters hover: grey barred rooster', ratio:'4:5', file:'brand/birds/category-roosters-grey-barred.jpg',
                   p:'A grey-and-white barred native rooster walking unhurriedly along a shaded farm path under a neem tree, dappled morning light, full body, eye-level camera.' },
  catHen:        { kind:'image', title:'Hens: hen portrait', ratio:'4:5', file:'brand/birds/category-hens-portrait.jpg', legacy:['catHen'],
                   p:'Portrait of a native Indian hen standing calmly on clean swept earth, full body, three-quarter view, against a softly blurred warm mud-plastered wall. Even, soft morning light.' },
  catHen2:       { kind:'image', title:'Hens hover: white hen', ratio:'4:5', file:'brand/birds/category-hens-white.jpg',
                   p:'A white native hen with a red single comb standing among short dry grass in soft late-afternoon light, low camera angle, full body, calm posture, warm natural background.' },
  varAseel:      { kind:'image', demo:true, title:'DEMO variety: Aseel', ratio:'3:4', file:'brand/varieties/demo-aseel.jpg',
                   p:'Heritage breed portrait of an Aseel rooster: tall upright stance, muscular body, long neck, small pea comb, tight hard feathering, dark red neck feathers and a black chest. Standing relaxed and calm on red earth in low morning sun, full body, side profile, peaceful setting. Replace with a real photo of the farm\u2019s own bird before launch.' },
  varKadaknath:  { kind:'image', demo:true, title:'DEMO variety: Kadaknath', ratio:'3:4', file:'brand/varieties/demo-kadaknath.jpg',
                   p:'A Kadaknath hen: entirely black plumage with a subtle natural sheen, dark comb and wattles, dark legs. Side profile, standing calmly in front of a white lime-washed wall in even open-shade light, full body. Replace with a real photo of the farm\u2019s own bird before launch.' },
  varCountry:    { kind:'image', demo:true, title:'DEMO variety: native country chicken', ratio:'3:4', file:'brand/varieties/demo-native-country-chicken.jpg',
                   p:'A native Indian country hen with golden-brown plumage and black flecking, foraging among dry leaves in a village backyard, head lowered, soft mid-morning light, full body. Replace with a real photo of the farm\u2019s own bird before launch.' },
  varRegional1:  { kind:'image', demo:true, title:'DEMO variety: regional variety 1', ratio:'3:4', file:'brand/varieties/demo-regional-1.jpg',
                   p:'A black-and-white speckled native hen resting on clean straw in a shaded shelter, calm and settled, soft side light from an open doorway, three-quarter view.' },
  varRegional2:  { kind:'image', demo:true, title:'DEMO variety: regional variety 2', ratio:'3:4', file:'brand/varieties/demo-regional-2.jpg',
                   p:'A buff, cream-coloured native hen dust-bathing in dry fine earth, feathers slightly fluffed, relaxed, warm side light, low camera angle.' },
  varRegional3:  { kind:'image', demo:true, title:'DEMO variety: regional variety 3', ratio:'3:4', file:'brand/varieties/demo-regional-3.jpg',
                   p:'A multicoloured native rooster with orange neck feathers, a black tail with green sheen and cream flecks, walking calmly across a sunlit village lane, full body, side view.' },
  lookBlack:     { kind:'image', title:'Appearance: black', ratio:'1:1', file:'brand/appearance/black-feathers.jpg',
                   p:'Macro close-up of glossy black neck feathers of a native rooster with a subtle natural green sheen, soft side light, shallow depth of field, individual feather barbs visible. Square composition centred for a circular crop.' },
  lookWhite:     { kind:'image', title:'Appearance: white', ratio:'1:1', file:'brand/appearance/white-feathers.jpg',
                   p:'Close-up profile of the head and neck of a white native hen with a red single comb and wattle, calm eye, soft backlight, plain blurred green background. Square composition centred for a circular crop.' },
  lookRed:       { kind:'image', title:'Appearance: red', ratio:'1:1', file:'brand/appearance/red-feathers.jpg',
                   p:'Macro close-up of long red-orange hackle feathers on a native rooster\u2019s neck, natural texture and slight irregularity, soft morning side light. Square composition centred for a circular crop.' },
  lookBrown:     { kind:'image', title:'Appearance: brown', ratio:'1:1', file:'brand/appearance/brown-feathers.jpg',
                   p:'Close-up of a brown native hen\u2019s head and upper body, looking slightly towards the camera, soft daylight in a shaded shelter. Square composition centred for a circular crop.' },
  lookSpeckled:  { kind:'image', title:'Appearance: speckled', ratio:'1:1', file:'brand/appearance/speckled-feathers.jpg',
                   p:'Macro close-up of black-and-white speckled feathers on a hen\u2019s back, natural irregular pattern, soft even light. Square composition centred for a circular crop.' },
  lookMulti:     { kind:'image', title:'Appearance: multicoloured', ratio:'1:1', file:'brand/appearance/multicoloured-feathers.jpg',
                   p:'Close-up of the saddle and tail feathers of a multicoloured native rooster: orange, black with green sheen and cream, natural texture, soft light. Square composition centred for a circular crop.' },
  farmWide:      { kind:'image', title:'Farm: wide morning landscape', ratio:'21:9', file:'brand/farm/farm-wide-morning.jpg', legacy:['farmBand'],
                   p:'Wide landscape of a small rural farm in coastal Andhra Pradesh in early morning: open swept farmyard, a clay-tiled shade shelter, palm and neem trees, soft haze, a few native hens foraging far away.' },
  farmMorning:   { kind:'image', title:'Farm: shelter at sunrise', ratio:'4:5', file:'brand/farm/farm-shelter-sunrise.jpg', legacy:['introFarm'],
                   p:'Vertical view of a small, tidy native-poultry farm at sunrise: a simple open shade shelter with a clay-tiled roof, a clean swept yard, coconut palms and neem trees, light haze, no people.' },
  farmHands:     { kind:'image', title:'Farm: hands feeding hens', ratio:'4:5', file:'brand/farm/farm-hands-feeding.jpg', legacy:['introCare'],
                   p:'Close-up of an Indian farmer\u2019s weathered hands scattering grain from a steel bowl onto clean earth while a few native hens gather calmly. Face not shown, simple cotton clothing, soft morning light.' },
  landscapeVideo:{ kind:'video', title:'Gallery video: farm at sunrise', ratio:'16:9', file:'brand/gallery/video-farm-sunrise.mp4',
                   p:'Wide view of the farm at sunrise: long soft shadows, haze between the trees, a line of native hens foraging slowly across the open yard in the middle distance.' },
  reelVideo1:    { kind:'video', title:'Gallery reel: hens at the water pot', ratio:'9:16', file:'brand/gallery/reel-hens-water-pot.mp4',
                   p:'Vertical frame of two or three native hens drinking calmly from a large clay water pot set on the ground, morning shade, close eye-level camera.' },
  reelVideo2:    { kind:'video', title:'Gallery reel: rooster at dawn', ratio:'9:16', file:'brand/gallery/reel-rooster-dawn.mp4',
                   p:'Vertical frame of a black rooster with golden neck feathers standing on a low mud wall at dawn, crowing calmly, soft backlight from the rising sun, peaceful.' },
  galleryForage: { kind:'image', title:'Gallery: hens foraging', ratio:'4:3', file:'brand/gallery/photo-hens-foraging.jpg', legacy:['reel2'],
                   p:'Native Indian hens foraging together in short grass beside the farmyard, relaxed, soft mid-morning light.' },
  galleryFeed:   { kind:'image', title:'Gallery: morning feed', ratio:'4:3', file:'brand/gallery/photo-morning-feed.jpg', legacy:['reel3'],
                   p:'Morning feeding time: grain scattered on clean earth, a small group of native hens and one rooster gathering calmly, not crowded.' },
  galleryPath:   { kind:'image', title:'Gallery: around the farm', ratio:'4:3', file:'brand/gallery/photo-farm-path.jpg', legacy:['reel4'],
                   p:'A quiet path through the farm with a clay water pot and a stone trough, trees and a shade shelter, early light, no people.' },
  galleryEvening:{ kind:'image', title:'Gallery: evening at the farm', ratio:'4:3', file:'brand/gallery/photo-evening-shelter.jpg', legacy:['reel5'],
                   p:'Native hens settling under an open thatched shelter in warm late-afternoon light, peaceful.' },
  bizFlock:      { kind:'image', title:'Business: flock at scale', ratio:'4:3', file:'brand/business/flock-scale.jpg', legacy:['bizFlock'],
                   p:'A healthy mixed flock of native roosters and hens spread across a spacious open farmyard, orderly and uncrowded, conveying scale and good care, soft morning light.' },
  closePortrait: { kind:'image', title:'Closing: blue-grey hen', ratio:'4:3', file:'brand/home/closing-hen-blue-grey.jpg',
                   p:'A blue-grey native hen in the foreground looking towards the camera at eye level, a softly blurred farmyard behind, early morning light, shallow depth of field.' }
};

// Slots added in v4 for inner pages
const PAGES = {
  breedsHero:  { kind:'image', title:'Breeds page: mixed birds in the yard', ratio:'21:9', file:'brand/breeds/breeds-hero-mixed-birds.jpg',
                 p:'A calm group of visibly different native birds in an open farmyard: a black rooster, a white hen, a speckled hen and a red-brown rooster, spaced naturally and not crowded, early morning light, eye-level camera, wide composition.' },
  aboutHero:   { kind:'image', title:'About page: walking through the flock', ratio:'21:9', file:'brand/about/about-hero-farmer-walking.jpg',
                 p:'A farmer seen from behind, walking slowly along the edge of an open farmyard as native hens forage nearby, simple cotton clothing, face not visible, soft early morning light and haze.' },
  contactHero: { kind:'image', title:'Contact page: farm entrance path', ratio:'21:9', file:'brand/contact/contact-hero-farm-path.jpg',
                 p:'A quiet earth path leading into a small rural farm between neem trees, a simple wooden gate standing open, a few hens far along the path, soft morning light, no people, no signage text.' }
};

// Two extra gallery images for every variety page
const SHOTS = [
  ['g1', 'portrait', 'close head-and-shoulders portrait of the same kind of bird, calm eye, shallow depth of field'],
  ['g2', 'in the yard', 'the same kind of bird standing among two or three others in an open farmyard, relaxed, wider view']
];
const EXTRA = {};
['varAseel','varKadaknath','varCountry','varRegional1','varRegional2','varRegional3'].forEach((id) => {
  SHOTS.forEach(([suffix, label, shot]) => {
    const b = BASE[id];
    EXTRA[id + '-' + suffix] = { kind:'image', demo:true, ratio:'4:5', title: b.title + ' (' + label + ')',
      file: b.file.replace('.jpg', '-' + suffix + '.jpg'),
      p: b.p.split('. Replace')[0] + '. Composition: ' + shot + '.' };
  });
});

export const MEDIA = { ...BASE, ...PAGES, ...EXTRA };
export const MEDIA_IDS = Object.keys(MEDIA);
