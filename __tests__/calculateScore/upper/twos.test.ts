import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '~/src/components/Scoreboard'
import { allOnes, allTwos, noDuplicates } from '../constants'

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
