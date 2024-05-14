import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '~/src/components/Scoreboard'
import { allOnes, noDuplicates } from '../constants'

test('no duplicates returns 30 for Small Straight', () => {
  const outputScore = calculateScore(noDuplicates, 'Small Straight');

  expect(outputScore).toBe(30)
})

test('[2, 3, 4, 5, 5] returns 30 for Small Straight', () => {
  const smallStraight = [
    { face: 2, shouldReroll: false },
    { face: 3, shouldReroll: false },
    { face: 4, shouldReroll: false },
    { face: 5, shouldReroll: false },
    { face: 5, shouldReroll: false },
  ]

  const outputScore = calculateScore(smallStraight, 'Small Straight');

  expect(outputScore).toBe(30)
})

test('[1, 1, 2, 3, 4] returns 30 for Small Straight', () => {
  const smallStraight = [
    { face: 1, shouldReroll: false },
    { face: 1, shouldReroll: false },
    { face: 2, shouldReroll: false },
    { face: 3, shouldReroll: false },
    { face: 4, shouldReroll: false },
  ]

  const outputScore = calculateScore(smallStraight, 'Small Straight');

  expect(outputScore).toBe(30)
})

test('[3, 4, 5, 5, 6] returns 30 for Small Straight', () => {
  const smallStraight = [
    { face: 3, shouldReroll: false },
    { face: 4, shouldReroll: false },
    { face: 5, shouldReroll: false },
    { face: 5, shouldReroll: false },
    { face: 6, shouldReroll: false },
  ]

  const outputScore = calculateScore(smallStraight, 'Small Straight');

  expect(outputScore).toBe(30)
})


test('all ones returns 0 for Small Straight', () => {
  const outputScore = calculateScore(allOnes, 'Small Straight');

  expect(outputScore).toBe(0)
})
