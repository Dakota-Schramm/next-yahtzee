import React, { useState, FC } from 'react'

import { CgGlassAlt } from "react-icons/cg";
import { PiTrayLight } from "react-icons/pi";

export interface ICurrentDie {
  face: number; 
  location: string;
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
  { face, onClick, isDisabled, location }: IDiceButton
) => {
  const shouldReroll = location === "cup";

  return (
    <button 
      className={
        'border border-solid border-black rounded-xl w-16 h-16 lg:w-24 lg:h-24 cursor-pointer relative ' + 
        `${shouldReroll ? 'bg-white text-black -top-12 ' : 'bg-gray-700 text-white top-12 '} ` +
        `${isDisabled ? '' : 'hover:outline hover:outline-4 hover:outline-solid hover:outline-blue-400'}`
      }
      onClick={onClick}
      disabled={isDisabled}
    >
      <span className='flex items-center justify-center w-full h-full'>{face}</span>
    </button>
  );
}

const DiceTray = (
  {currentDice, toggleDiceReroll, canReroll}: IDiceTray
) => (
  <section className='flex relative'>
    <div className='flex justify-center items-center absolute -left-20 top-4'>
      <CgGlassAlt /><span className='uppercase font-bold'>Cup</span>
    </div>
    <div className='flex justify-center items-center absolute -left-20 bottom-4'>
      <PiTrayLight /><span className='uppercase font-bold'>Tray</span>
    </div>
    <div className='flex flex-row space-x-4'>
      {
        currentDice.map(
          (diceObj, diceNum) => (
            <Die 
              onClick={() => {
                toggleDiceReroll(diceNum)
              }}
              face={diceObj.face}
              isDisabled={!canReroll}
              location={diceObj.location}
            />
          )
        )
      }
    </div>
  </section>
);

export default DiceTray
