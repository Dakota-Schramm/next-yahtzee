import React, { useContext } from 'react';

import { PiSpeakerSimpleNoneFill } from 'react-icons/pi';
import { PiSpeakerSimpleXFill } from 'react-icons/pi';

import DiceTray, { ICurrentDie } from './DiceTray';
import FooterButtons from './Footer';
import Title from '~/src/components/Title';
import { SoundContext } from '~/src/contexts/sound';

const GameCard = ({ stateMachine, send }) => {
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
      <header className='p-8 relative w-full flex justify-center items-center'>
        <Title />
        <button
          className='absolute right-8 top-8 rounded-full p-1 bg-white text-red-500'
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
  const lowerFilled = Object.values(lowerSection).filter(
    (val) => val !== undefined
  ).length;

  return upperFilled + lowerFilled + 1;
}

export default GameCard;
