import React, { useState, FC } from 'react'
import Image from 'next/image';

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

  const faceToNumberSvgPath = {
    1: "dice/dice-six-faces-one.svg",
    2: "dice/dice-six-faces-two.svg",
    3: "dice/dice-six-faces-three.svg",
    4: "dice/dice-six-faces-four.svg",
    5: "dice/dice-six-faces-five.svg",
    6: "dice/dice-six-faces-six.svg"
  }[face]

  return (
    <button
      className={
        'w-16 h-16 lg:w-24 lg:h-24 cursor-pointer relative shadow-lg ' +
        `${shouldReroll ? '-left-12 top-0 md:left-0 md:-top-12 ' : 'left-12 top-0 md:left-0 md:top-12 '} ` +
        `${
          isDisabled
            ? ''
            : 'hover:outline hover:outline-4 hover:outline-solid hover:outline-blue-400'
        }`
      }
      onClick={onClick}
      disabled={isDisabled}
    >
      <img
        src={faceToNumberSvgPath}
        alt={`Current dice face ${face}`}
      />
      <div
        className={
          'inset z-10 opacity-50 w-full h-full absolute top-0 left-0 ' +
          `${shouldReroll ? '' : 'bg-gray-700 '} `
        }
      />
    </button>
  );
}

const DiceTray = ({ currentDice, toggleDiceReroll, canReroll }: IDiceTray) => (
  <section className='flex relative font-workSans'>
    <div className='flex justify-center items-center absolute -left-16 top-1/2 -translate-y-1/2 md:left-[-70px] md:top-4 md:translate-y-0 bg-white rounded-lg p-1 text-red-500'>
      <CgGlassAlt />
      <span className='uppercase font-bold'>Cup</span>
    </div>
    <div className='flex justify-center items-center absolute right-[-64px] bottom-1/2 translate-y-1/2 md:-left-20 md:bottom-4 md:right-auto md:translate-y-0 bg-white rounded-lg p-1 text-red-500'>
      <PiTrayLight />
      <span className='uppercase font-bold'>Tray</span>
    </div>
    <div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
      {currentDice.map((diceObj, diceNum) => (
        <Die
          onClick={() => {
            toggleDiceReroll(diceNum);
          }}
          face={diceObj.face}
          isDisabled={!canReroll}
          location={diceObj.location}
        />
      ))}
    </div>
  </section>
);

export default DiceTray
