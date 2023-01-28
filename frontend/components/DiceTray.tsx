import React, { useState, FC } from 'react'

export interface ICurrentDie {
  face: number; 
  shouldReroll: boolean;
}

interface IDiceButton extends ICurrentDie {
  onClick: () => void;
  isDisabled: boolean;
}

interface IDiceTray {
  currentDice: ICurrentDie[];
  toggleDiceReroll: (value: number) => void;
  canReroll: boolean;
}

const Die = (
  {face, shouldReroll, onClick, isDisabled}: IDiceButton
) => (
  <button 
    className={
      'border border-solid border-black rounded-xl w-16 h-16 lg:w-24 lg:h-24 cursor-pointer ' + 
      `${shouldReroll ? 'bg-white text-black' : 'bg-gray-700 text-white'} ` +
      `${isDisabled ? '' : 'hover:outline hover:outline-4 hover:outline-solid hover:outline-blue-400'}`
    }
    onClick={onClick}
    disabled={isDisabled}
  >
    <span className='flex items-center justify-center w-full h-full'>{face}</span>
  </button>
);

const DiceTray = (
  {currentDice, toggleDiceReroll, canReroll}: IDiceTray
) => (
  <div className='flex flex-row space-x-4'>
    {
      currentDice.map(
        (diceObj, diceNum) => (
          <Die 
            onClick={() => {
              toggleDiceReroll(diceNum)
            }}
            face={diceObj.face}
            shouldReroll={diceObj.shouldReroll}
            isDisabled={!canReroll}
          />
        )
      )
    }
  </div>
);

export default DiceTray
