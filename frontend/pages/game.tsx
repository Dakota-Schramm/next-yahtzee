import type { NextPage } from 'next'
import React, { useEffect, } from 'react';

import { upperSectionScores, lowerSectionScores } from '../constants';

import Scoreboard from '../components/Scoreboard';
import DiceTray, { ICurrentDie } from '../components/DiceTray';
import FooterButtons from '../components/Footer';

import { useMachine } from '@xstate/react';
import YahtzeeMachine, { scoreCardFilled } from '~/game';
import Title from '~/components/Title';

const Game: NextPage = () => {
  const [stateMachine, send] = useMachine(YahtzeeMachine);
  const {
    currentRoll,
    currentDice,
    upperSection: upper,
    lowerSection: lower,
  } = stateMachine.context;

  function handleStart() {
    send({ type: "START" })
    send({ type: "ROLL" })
    send({ type: "ROLLED" })
  }
  function handleReroll() {
    send({ type: "ROLL" })
    send({ type: "ROLLED" })
  }

  function handleToggle(diceToToggle: number) {
    send({ type: "MOVE_DIE", dieToMove: diceToToggle })
  }

  function handleRestart() { 
    send({ type: "STARTOVER" })
    send({ type: "ROLL" })
    send({ type: "ROLLED" })
  }

  function handlePlayAgain() {
    send({ type: "STARTOVER" })
    send({ type: "ROLL" })
    send({ type: "ROLLED" })
  }

  function handleAddUpperScore(type: number, value: number) {
    send({ type: "SCORE_TURN", column: type, value })
    const isFinalMove = scoreCardFilled(stateMachine.context)
    if (!isFinalMove) {
      send({ type: "NEXT_TURN" })
      send({ type: "ROLL" })
      send({ type: "ROLLED" })
    }
  }

  function handleAddLowerScore(type: string, value: number) {
    send({ type: "SCORE_TURN", column: type, value })
    const isFinalMove = scoreCardFilled(stateMachine.context)
    if (!isFinalMove) {
      send({ type: "NEXT_TURN" })
      send({ type: "ROLL" })
      send({ type: "ROLLED" })
    }
  }

  const footerHandlers = {
    handleStart,
    handleReroll,
    handleRestart,
    handlePlayAgain,
  }

  const canReroll = currentRoll !== 3;

  return (
    // Have main screen that lets you navigate to scores, exit and play
    <section className='flex w-screen h-screen bg-[#d01014]'>
      <section className='flex flex-col items-center justify-between w-full h-full '>
        <header className='p-8'>
          <Title />
        </header>
        {currentRoll !== 0 && (
          <DiceTray
            toggleDiceReroll={handleToggle}
            {...{ currentDice, canReroll }}
          />
        )}
        <footer className='flex flex-col items-center justify-center p-8'>
          {0 < currentRoll && (
            <div className='flex space-x-4'>
              <div>Turn: {calculateTurn(stateMachine.context)}</div>
              <div>Roll: {currentRoll}</div>
            </div>
          )}
          <FooterButtons
            currentState={stateMachine.value}
            currentRoll={currentRoll}
            {...footerHandlers}
          />
        </footer>
      </section>
      <Scoreboard
        canSelect={stateMachine.value !== 'welcome'}
        {...{
          currentDice,
          upper,
          handleAddUpperScore,
          lower,
          handleAddLowerScore,
        }}
      />
    </section>
  );
}

function calculateTurn(context) {
  const { upperSection, lowerSection } = context;
  const upperFilled = Object.values(upperSection).filter(val => val !== undefined).length;
  const lowerFilled = Object.values(lowerSection).filter(val => val !== undefined).length;

  return upperFilled + lowerFilled + 1
}

export default Game 
