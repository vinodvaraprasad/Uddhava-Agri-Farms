// DEMONSTRATION INVENTORY — for testing filters, sorting and profiles only.
// None of these are real birds. Replace this file with data from the inventory system later.
// Rules for real records:
//   - media must be real photos/videos of the bird (never concept images)
//   - breedingHistory / health stay null unless the farm provides them
//   - breedConfirmed must be true before a variety name is used in enquiries
const R = (id, type, variety, colour, ageMonths, weightKg, status, listed) => ({
  id, type, variety, colour, ageMonths, weightKg, status, listed,
  demo: true, breedConfirmed: false, breedingHistory: null, health: null,
  media: { photos: 5, videos: 1 }   // real media slots to be filled
});
export const INVENTORY = [
  R('UAF-R-001', 'rooster', 'aseel', 'red', 14, 3.1, 'available', '2026-09-20'),
  R('UAF-H-001', 'hen', 'kadaknath', 'black', 10, 1.4, 'available', '2026-09-18'),
  R('UAF-R-002', 'rooster', 'regional-variety-3', 'multicoloured', 18, 2.8, 'reserved', '2026-09-12'),
  R('UAF-H-002', 'hen', 'native-country-chicken', 'brown', 8, 1.3, 'available', '2026-09-22'),
  R('UAF-R-003', 'rooster', 'kadaknath', 'black', 12, 1.9, 'available', '2026-09-15'),
  R('UAF-H-003', 'hen', 'regional-variety-1', 'speckled', 16, 1.6, 'reserved', '2026-09-10'),
  R('UAF-R-004', 'rooster', 'native-country-chicken', 'red', 9, 2.0, 'available', '2026-09-24'),
  R('UAF-H-004', 'hen', 'regional-variety-2', 'white', 11, 1.5, 'available', '2026-09-19'),
  R('UAF-R-005', 'rooster', 'regional-variety-1', 'speckled', 26, 2.9, 'available', '2026-09-08'),
  R('UAF-H-005', 'hen', 'aseel', 'brown', 20, 1.9, 'available', '2026-09-14'),
  R('UAF-R-006', 'rooster', 'aseel', 'black', 5, 1.6, 'available', '2026-09-25'),
  R('UAF-H-006', 'hen', 'native-country-chicken', 'speckled', 30, 1.7, 'available', '2026-09-05'),
  R('UAF-R-007', 'rooster', 'regional-variety-2', 'white', 15, 2.4, 'reserved', '2026-09-16'),
  R('UAF-H-007', 'hen', 'regional-variety-3', 'multicoloured', 7, 1.2, 'available', '2026-09-23'),
  R('UAF-R-008', 'rooster', 'native-country-chicken', 'brown', 22, 2.6, 'available', '2026-09-11'),
  R('UAF-H-008', 'hen', 'kadaknath', 'black', 4, 0.9, 'available', '2026-09-21')
];
export const birdById = (id) => INVENTORY.find((b) => b.id.toLowerCase() === String(id).toLowerCase());

export const AGE_BUCKETS = [
  { key: 'u6', label: 'birds.ageU6', test: (m) => m < 6 },
  { key: '6to12', label: 'birds.age6to12', test: (m) => m >= 6 && m < 12 },
  { key: '12to24', label: 'birds.age12to24', test: (m) => m >= 12 && m <= 24 },
  { key: 'o24', label: 'birds.ageO24', test: (m) => m > 24 }
];
// Sorts the data can genuinely support
export const SORTS = {
  newest: { label: 'birds.sortNewest', fn: (a, b) => b.listed.localeCompare(a.listed) },
  ageAsc: { label: 'birds.sortAgeAsc', fn: (a, b) => a.ageMonths - b.ageMonths },
  ageDesc: { label: 'birds.sortAgeDesc', fn: (a, b) => b.ageMonths - a.ageMonths },
  weightDesc: { label: 'birds.sortWeightDesc', fn: (a, b) => b.weightKg - a.weightKg },
  weightAsc: { label: 'birds.sortWeightAsc', fn: (a, b) => a.weightKg - b.weightKg },
  id: { label: 'birds.sortId', fn: (a, b) => a.id.localeCompare(b.id) }
};
