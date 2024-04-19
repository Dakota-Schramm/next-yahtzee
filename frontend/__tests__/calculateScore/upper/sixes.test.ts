import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '~/components/Scoreboard'
import { allOnes, allSixes } from '../constants'

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
