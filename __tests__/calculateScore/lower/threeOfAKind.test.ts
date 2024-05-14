import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '~/src/components/Scoreboard'
import { allOnes, noDuplicates } from '../constants'

test('all ones returns 5 for 3 of a kind', () => {
  const outputScore = calculateScore(allOnes, '3 of a kind');

  expect(outputScore).toBe(5)
})

test('no duplicates returns 0 for 3 of a kind', () => {
  const outputScore = calculateScore(noDuplicates, '3 of a kind');

  expect(outputScore).toBe(0)
})
