import {describe, expect, test} from '@jest/globals';

import { calculateScore } from '~/components/Scoreboard'
import { allOnes, allSixes } from '../constants'

// Yahtzee
test('all sixes returns 50 for Yahtzee!', () => {
  const outputScore = calculateScore(allSixes, 'Yahtzee!');

  expect(outputScore).toBe(50)
})

test('all ones returns 50 for Yahtzee!', () => {
  const outputScore = calculateScore(allOnes, 'Yahtzee!');

  expect(outputScore).toBe(50)
})
