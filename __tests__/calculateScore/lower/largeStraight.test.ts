import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '~/components/Scoreboard'
import { allOnes, noDuplicates } from '../constants'

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
