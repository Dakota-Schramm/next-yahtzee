import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '~/src/components/Scoreboard'
import { allOnes } from '../constants'

test('[1, 1, 2, 2, 2] returns 25 for Full House', () => {
  const fullHouse = [
    { face: 1, shouldReroll: false },
    { face: 1, shouldReroll: false },
    { face: 2, shouldReroll: false },
    { face: 2, shouldReroll: false },
    { face: 2, shouldReroll: false },
  ]

  const outputScore = calculateScore(fullHouse, 'Full House');

  expect(outputScore).toBe(25)
})

test('all ones returns 0 for Full House', () => {
  const outputScore = calculateScore(allOnes, 'Full House');

  expect(outputScore).toBe(0)
})
