import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '../components/Scoreboard'

const allOnes = [ ...Array(5) ].map(
  (_) => ({ face: 1, shouldReroll: false })
);

const allTwos = [ ...Array(5) ].map(
  (_) => ({ face: 2, shouldReroll: false })
);

const allSixes = [ ...Array(5) ].map(
  (_) => ({ face: 6, shouldReroll: false })
);

const noDuplicates = [ ...Array(5) ].map(
  (val, idx) => ({ face: idx + 1, shouldReroll: false })
);

// UPPER SCORE

// One
test('all ones returns 5 for 1 Upper score', () => {
  const outputScore = calculateScore(allOnes, 1);

  expect(outputScore).toBe(5)
})

test('all twos return 0 for 1 Upper score', () => {
  const outputScore = calculateScore(allTwos, 1);

  expect(outputScore).toBe(0)
})

test('no duplicates returns 1 for 1 Upper score', () => {
  const outputScore = calculateScore(noDuplicates, 1);

  expect(outputScore).toBe(1)
})

// Two
test('all twos return 10 for 2 Upper Score', () => {
  const outputScore = calculateScore(allTwos, 2);

  expect(outputScore).toBe(10)
})

test('all ones returns 0 for 2 Upper score', () => {
  const outputScore = calculateScore(allOnes, 2);
  expect(outputScore).toBe(0)
})

test('no duplicates returns 2 for 2 Upper score', () => {
  const outputScore = calculateScore(noDuplicates, 2);

  expect(outputScore).toBe(2)
})

// Three
test('all threes returns 15 for 3 Upper score', () => {
  const allThrees = [ ...Array(5) ].map(
    (_) => ({ face: 3, shouldReroll: false })
  )
  const outputScore = calculateScore(allThrees, 3);

  expect(outputScore).toBe(15)
})

test('all ones returns 0 for 3 Upper score', () => {
  const outputScore = calculateScore(allOnes, 3);
  expect(outputScore).toBe(0)
})

test('no duplicates returns 3 for 3 Upper score', () => {
  const outputScore = calculateScore(noDuplicates, 3);

  expect(outputScore).toBe(3)
})

// Four
test('all fours returns 20 for 4 Upper score', () => {
  const allFours = [ ...Array(5) ].map(
    (_) => ({ face: 4, shouldReroll: false })
  )
  const outputScore = calculateScore(allFours, 4);

  expect(outputScore).toBe(20)
})

test('all ones returns 0 for 4 Upper score', () => {
  const outputScore = calculateScore(allOnes, 4);
  expect(outputScore).toBe(0)
})

test('no duplicates returns 4 for 4 Upper score', () => {
  const outputScore = calculateScore(noDuplicates, 4);

  expect(outputScore).toBe(4)
})

// Five
test('all fives returns 25 for 5 Upper score', () => {
  const allFives = [ ...Array(5) ].map(
    (_) => ({ face: 5, shouldReroll: false })
  )

  const outputScore = calculateScore(allFives, 5);

  expect(outputScore).toBe(25)
})

test('all ones returns 0 for 5 Upper score', () => {
  const outputScore = calculateScore(allOnes, 5);
  expect(outputScore).toBe(0)
})

test('no duplicates returns 5 for 5 Upper score', () => {
  const outputScore = calculateScore(noDuplicates, 5);

  expect(outputScore).toBe(5)
})

// Six
test('all sixes returns 30 for 6 Upper score', () => {
  const outputScore = calculateScore(allSixes, 6);

  expect(outputScore).toBe(30)
})

test('all ones returns 0 for 6 Upper score', () => {
  const outputScore = calculateScore(allOnes, 6);

  expect(outputScore).toBe(0)
})

test('[2, 3, 4, 5, 6] returns 6 for 6 Upper score', () => {
  const noDuplicatesTopSlice  = [ ...Array(5) ].map(
    (_, idx) => ({ face: idx + 2, shouldReroll: false })
  );

  const outputScore = calculateScore(noDuplicatesTopSlice, 6);

  expect(outputScore).toBe(6)
})

// LOWER SECTION

// 3 of a kind
test('all ones returns 5 for 3 of a kind', () => {
  const outputScore = calculateScore(allOnes, '3 of a kind');

  expect(outputScore).toBe(5)
})

test('no duplicates returns 0 for 3 of a kind', () => {
  const outputScore = calculateScore(noDuplicates, '3 of a kind');

  expect(outputScore).toBe(0)
})

// 4 of a kind
test('all ones returns 5 for 4 of a kind', () => {
  const outputScore = calculateScore(allOnes, '4 of a kind');

  expect(outputScore).toBe(5)
})

test('no duplicates returns 0 for 4 of a kind', () => {
  const outputScore = calculateScore(noDuplicates, '4 of a kind');

  expect(outputScore).toBe(0)
})

// Full House
test('[1, 1, 2, 2, 2] returns 25 for Full House', () => {
  const fullHouse = [
    { face: 1, shouldReroll: false },
    { face: 1, shouldReroll: false },
    { face: 2, shouldReroll: false },
    { face: 2, shouldReroll: false },
    { face: 2, shouldReroll: false },
  ]

  const outputScore = calculateScore(fullHouse, 'Full House');

  expect(outputScore).toBe(25)
})

test('all ones returns 0 for Full House', () => {
  const outputScore = calculateScore(allOnes, 'Full House');

  expect(outputScore).toBe(0)
})

// Small Straight
test('no duplicates returns 30 for Small Straight', () => {
  const outputScore = calculateScore(noDuplicates, 'Small Straight');

  expect(outputScore).toBe(30)
})

test('[2, 3, 4, 5, 5] returns 30 for Small Straight', () => {
  const smallStraight = [
    { face: 2, shouldReroll: false },
    { face: 3, shouldReroll: false },
    { face: 4, shouldReroll: false },
    { face: 5, shouldReroll: false },
    { face: 5, shouldReroll: false },
  ]

  const outputScore = calculateScore(smallStraight, 'Small Straight');

  expect(outputScore).toBe(30)
})

test('[1, 1, 2, 3, 4] returns 30 for Small Straight', () => {
  const smallStraight = [
    { face: 1, shouldReroll: false },
    { face: 1, shouldReroll: false },
    { face: 2, shouldReroll: false },
    { face: 3, shouldReroll: false },
    { face: 4, shouldReroll: false },
  ]

  const outputScore = calculateScore(smallStraight, 'Small Straight');

  expect(outputScore).toBe(30)
})

test('[3, 4, 5, 5, 6] returns 30 for Small Straight', () => {
  const smallStraight = [
    { face: 3, shouldReroll: false },
    { face: 4, shouldReroll: false },
    { face: 5, shouldReroll: false },
    { face: 5, shouldReroll: false },
    { face: 6, shouldReroll: false },
  ]

  const outputScore = calculateScore(smallStraight, 'Small Straight');

  expect(outputScore).toBe(30)
})


test('all ones returns 0 for Small Straight', () => {
  const outputScore = calculateScore(allOnes, 'Small Straight');

  expect(outputScore).toBe(0)
})

// Large Straight
test('no duplicates returns 40 for Large Straight', () => {
  const outputScore = calculateScore(noDuplicates, 'Large Straight');

  expect(outputScore).toBe(40)
})

test('[2, 3, 4, 5, 6] returns 40 for Large Straight', () => {
  const largeStraight = [
    { face: 2, shouldReroll: false },
    { face: 3, shouldReroll: false },
    { face: 4, shouldReroll: false },
    { face: 5, shouldReroll: false },
    { face: 6, shouldReroll: false },
  ]

  const outputScore = calculateScore(largeStraight, 'Large Straight');

  expect(outputScore).toBe(40)
})

test('all ones returns 0 for Large Straight', () => {
  const outputScore = calculateScore(allOnes, 'Large Straight');

  expect(outputScore).toBe(0)
})

// Yahtzee
test('all sixes returns 50 for Yahtzee!', () => {
  const outputScore = calculateScore(allSixes, 'Yahtzee!');

  expect(outputScore).toBe(50)
})

test('all ones returns 50 for Yahtzee!', () => {
  const outputScore = calculateScore(allOnes, 'Yahtzee!');

  expect(outputScore).toBe(50)
})

// Chance
test('all ones returns 5 for Chance', () => {
  const outputScore = calculateScore(allOnes, 'Chance');

  expect(outputScore).toBe(5)
})

test('all sixes returns 30 for Chance', () => {
  const outputScore = calculateScore(allSixes, 'Chance');

  expect(outputScore).toBe(30)
})

test('no duplicates returns 15 for Chance', () => {
  const outputScore = calculateScore(noDuplicates, 'Chance');

  expect(outputScore).toBe(15)
})

