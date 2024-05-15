import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '~/components/Scoreboard'
import { allOnes, allTwos, noDuplicates } from '../constants'

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
