import React, { useContext } from 'react';

import { PiSpeakerSimpleNoneFill } from 'react-icons/pi';
import { PiSpeakerSimpleXFill } from 'react-icons/pi';

import DiceTray, { ICurrentDie } from './DiceTray';
import FooterButtons from './Footer';
import Title from '~/components/Title';
import { SoundContext } from '~/contexts/sound';



const GameCard = ({ stateMachine, send }: { stateMachine: any, send: any }) => {
  const { currentRoll, currentDice } = stateMachine.context;

  function handleStart() {
    send({ type: 'START' });
    send({ type: 'ROLL' });
    send({ type: 'ROLLED' });
  }
  function handleReroll() {
    send({ type: 'ROLL' });
    send({ type: 'ROLLED' });
  }

  function handleToggle(diceToToggle: number) {
    send({ type: 'MOVE_DIE', dieToMove: diceToToggle });
  }

  function handleRestart() {
    send({ type: 'STARTOVER' });
    send({ type: 'ROLL' });
    send({ type: 'ROLLED' });
  }

  function handlePlayAgain() {
    send({ type: 'STARTOVER' });
    send({ type: 'ROLL' });
    send({ type: 'ROLLED' });
  }

  const footerHandlers = {
    handleStart,
    handleReroll,
    handleRestart,
    handlePlayAgain,
  };

  const canReroll = currentRoll !== 3;

  return (
    <section className='flex flex-col items-center justify-between w-full h-full '>
      <GameHeader />
      {0 < currentRoll && (
        <div className='flex space-x-4 font-revueStd'>
          <div>Turn: {calculateTurn(stateMachine.context)}</div>
          <div>Roll: {currentRoll}</div>
        </div>
      )}
      {currentRoll !== 0 && (
        <DiceTray
          toggleDiceReroll={handleToggle}
          {...{ currentDice, canReroll }}
        />
      )}
      <footer className='flex flex-col items-center justify-center p-8'>
        <FooterButtons
          currentState={stateMachine.value}
          currentRoll={currentRoll}
          {...footerHandlers}
        />
      </footer>
    </section>
  );
};

function GameHeader() {
  const { enabled, setEnabled } = useContext(SoundContext);

  return (
    <>
      <header className='relative flex items-center justify-center w-full p-8'>
        <Title />
        <button
          className='absolute p-1 text-red-500 bg-white rounded-full right-8 top-8'
          onClick={() => setEnabled((prev) => !prev)}
        >
          {enabled ? <PiSpeakerSimpleNoneFill /> : <PiSpeakerSimpleXFill />}
        </button>
      </header>
    </>
  );
}

function calculateTurn(context) {
  const { upperSection, lowerSection } = context;
  const upperFilled = Object.values(upperSection).filter(
    (val) => val !== undefined
  ).length;
  let lowerFilled = Object.entries(lowerSection)
    .filter(([key]) => key !== 'Yahtzee! Bonuses')
    .filter(([, val]) => val !== undefined).length;
  lowerFilled += lowerSection['Yahtzee! Bonuses']
    ? lowerSection['Yahtzee! Bonuses'] / 100
    : 0;

  return upperFilled + lowerFilled + 1;
}

export default GameCard;
