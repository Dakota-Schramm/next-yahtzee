import React, { useState, FC } from 'react'
import Die from './Die';

interface IDiceTray {
  currentDice: number[];
  shouldRerollDice: boolean[];
  toggleDiceReroll: (value: number) => void;
}

const DiceTray: FC<IDiceTray> = ({currentDice, shouldRerollDice, toggleDiceReroll}) => {

  return (
    <div className='flex flex-row space-x-4'>
      {
        currentDice.map((diceObj, diceNum) => (
          <Die 
            onClick={() => toggleDiceReroll(diceNum)}
            current={currentDice[diceNum]}
            shouldReroll={shouldRerollDice[diceNum]}
          />
        ))
      }
    </div>
  )
}

export default DiceTray