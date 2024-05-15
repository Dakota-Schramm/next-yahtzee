import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '~/components/Scoreboard'
import { allOnes, allSixes, noDuplicates } from '../constants'

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
