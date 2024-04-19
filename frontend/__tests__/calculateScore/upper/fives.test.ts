import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '~/components/Scoreboard'
import { allOnes, noDuplicates } from '../constants'

// Five
test('all fives returns 25 for 5 Upper score', () => {
  const allFives = [ ...Array(5) ].map(
    (_) => ({ face: 5, shouldReroll: false })
  )

  const outputScore = calculateScore(allFives, 5);

  expect(outputScore).toBe(25)
})

test('all ones returns 0 for 5 Upper score', () => {
  const outputScore = calculateScore(allOnes, 5);
  expect(outputScore).toBe(0)
})

test('no duplicates returns 5 for 5 Upper score', () => {
  const outputScore = calculateScore(noDuplicates, 5);

  expect(outputScore).toBe(5)
})
