import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '~/components/Scoreboard'
import { allOnes, noDuplicates } from '../constants'

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