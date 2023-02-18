import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '~/components/Scoreboard'
import { allOnes, noDuplicates } from '../constants'

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

test('no duplicates returns 3 for 3 Upper score', () => {
  const outputScore = calculateScore(noDuplicates, 3);

  expect(outputScore).toBe(3)
})
