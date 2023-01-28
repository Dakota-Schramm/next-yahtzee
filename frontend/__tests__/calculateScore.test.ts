import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '../components/Scoreboard'

const allOnes = [ ...Array(5) ].map(
  (_) => ({ face: 1, shouldReroll: false })
)

// test that all ones returns 5
test('all ones returns 5 for 1 Upper score', () => {
  const outputScore = calculateScore(allOnes, 1);
  expect(outputScore).toBe(5)
})

// test that all ones returns 0 for 2 Upper score
test('all ones returns 0 for 2 Upper score', () => {
  const outputScore = calculateScore(allOnes, 2);
  expect(outputScore).toBe(0)
})
