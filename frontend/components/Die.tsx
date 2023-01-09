import React, { FC } from 'react'

export interface ICurrentDie {
  current: number; 
  shouldReroll: boolean;
}

interface IDiceButton extends ICurrentDie {
  onClick: () => void;
}

const Die: FC<IDiceButton> = ({current, shouldReroll, onClick}) => {

  return (
    <button 
      className={
        'border border-solid border-black rounded-xl w-16 h-16 cursor-pointer ' + 
        `${shouldReroll ? 'bg-white' : 'bg-gray-700'}`
      }
      onClick={onClick}
    >
      <span className='flex items-center justify-center w-full h-full'>{current}</span>
    </button>
  )
}

export default Die