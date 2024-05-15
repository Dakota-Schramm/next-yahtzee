import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '~/components/Scoreboard'
import { allOnes, noDuplicates } from '../constants'

test('all ones returns 5 for 4 of a kind', () => {
  const outputScore = calculateScore(allOnes, '4 of a kind');

  expect(outputScore).toBe(5)
})

test('no duplicates returns 0 for 4 of a kind', () => {
  const outputScore = calculateScore(noDuplicates, '4 of a kind');

  expect(outputScore).toBe(0)
})
