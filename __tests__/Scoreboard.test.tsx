import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import Scoreboard from '~/components/Scoreboard';

const allOnes = [1, 1, 1, 1, 1];

const canSelectAll = [true, true, true, true, true];

// test that
test('endGame score ', () => {
  const endGameState = {
    currentDice: Array(5).fill({ face: 1, shouldReroll: false }),
    canSelectScores: false,
    upper: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    handleAddUpperScore: () => false,
    lower: {
      '3 of a kind': 0,
      '4 of a kind': 0,
      'Full House': 0,
      'Small Straight': 0,
      'Large Straight': 0,
      Yahtzee: 0,
      Chance: 0,
    },
    handleAddLowerScore: () => false,
    // gameTurn: 13,
    // addScore: () => false
  };

  render(<Scoreboard {...endGameState} />);
});
