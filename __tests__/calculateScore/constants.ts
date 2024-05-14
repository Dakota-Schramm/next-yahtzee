/* istanbul ignore file */

export const allOnes = [ ...Array(5) ].map(
  (_) => ({ face: 1, shouldReroll: false })
);

export const allTwos = [ ...Array(5) ].map(
  (_) => ({ face: 2, shouldReroll: false })
);

export const allSixes = [ ...Array(5) ].map(
  (_) => ({ face: 6, shouldReroll: false })
);

export const noDuplicates = [ ...Array(5) ].map(
  (val, idx) => ({ face: idx + 1, shouldReroll: false })
);
