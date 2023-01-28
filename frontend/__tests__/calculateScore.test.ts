import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '../components/Scoreboard'

const allOnes = [ ...Array(5) ].map(
  (_) => ({ face: 1, shouldReroll: false })
)

const allTwos = [ ...Array(5) ].map(
  (_) => ({ face: 2, shouldReroll: false })
)

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

// Two
test('all twos return 10 for 2 Upper Score', () => {
  const outputScore = calculateScore(allTwos, 2);

  expect(outputScore).toBe(10)
})

test('all ones returns 0 for 2 Upper score', () => {
  const outputScore = calculateScore(allOnes, 2);
  expect(outputScore).toBe(0)
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

// LOWER SECTION

// 3 of a kind

// 4 of a kind

// Full House

// Small Straight

// Large Straight

// Yahtzee

// Chance