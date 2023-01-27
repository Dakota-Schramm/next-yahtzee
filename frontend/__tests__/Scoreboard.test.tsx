import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Scoreboard from '~/components/Scoreboard'

const allOnes = [1, 1, 1, 1, 1]

const canSelectAll = [true, true, true, true, true]

// test that Scoreboard successfully renders
test('has text Scoreboard', () => {
  render(<Scoreboard currentDice={allOnes} canSelectScores={canSelectAll} />)
  const heading = screen.getByRole('heading')
  expect(heading).toHaveTextContent('Scoreboard')
})

// test that

