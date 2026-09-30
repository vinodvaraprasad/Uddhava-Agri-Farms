import { SITE } from '../data/site.js';
export const waLink = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

// Builds the enquiry for one bird: ID always; variety only when the farm has confirmed it.
export function birdMessage(t, bird) {
  const breed = bird.breedConfirmed ? t('wa.breedPart', { breed: t(`variety.${bird.variety}.name`) }) : '';
  return t('wa.bird', { id: bird.id, breed });
}
