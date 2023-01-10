import React, { FC } from 'react'

export interface ICurrentDie {
  current: number; 
  shouldReroll: boolean;
}

interface IDiceButton extends ICurrentDie {
  onClick: () => void;
  isDisabled: boolean;
}

const Die: FC<IDiceButton> = ({current, shouldReroll, onClick, isDisabled}) => {
  return (
    <button 
      className={
        'border border-solid border-black rounded-xl w-16 h-16 lg:w-24 lg:h-24 cursor-pointer ' + 
        `${shouldReroll ? 'bg-white text-black' : 'bg-gray-700 text-white'} ` +
        `${isDisabled ? '' : 'hover:outline hover:outline-4 hover:outline-solid hover:outline-blue-400'}`
      }
      onClick={onClick}
      disabled={isDisabled}
    >
      <span className='flex items-center justify-center w-full h-full'>{current}</span>
    </button>
  )
}

export default Die