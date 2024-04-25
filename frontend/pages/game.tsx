import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState, FC, useLayoutEffect, useReducer, useContext } from 'react';

import { upperSectionScores, lowerSectionScores } from '../constants';

import Scoreboard from '../components/Scoreboard';
import DiceTray, { ICurrentDie } from '../components/DiceTray';
import FooterButtons from '../components/Footer';

import useGameMeta from '../hooks/useGameMeta';
import type { IGameMeta } from '../hooks/useGameMeta';
import { useMachine } from '@xstate/react';
import YahtzeeMachine, { scoreCardFilled } from '~/game';

/*
  TODO:
  - Change game loop to allow scoring before last turn
*/

const Game: NextPage = () => {
  const [stateMachine, send] = useMachine(YahtzeeMachine);
  const {
    currentRoll,
    currentDice,
    upperSection: upper,
    lowerSection: lower,
  } = stateMachine.context;

  // const {currentDice, turn, footerButtonId, upper, lower } = gameMeta || {} as IGameMeta;

  useEffect(() => {
    console.log({ value: stateMachine.value, context: stateMachine.context })
  }, [stateMachine.context, stateMachine.value]);

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
    <section className='flex w-screen h-screen'>
      <section className='flex flex-col items-center justify-between w-full h-full bg-[#d01014]'>
        <header className='p-8'>
          <h1 className='text-8xl font-revueStd text-white -skew-y-6'>
            Yahtzee!
          </h1>
        </header>
        {currentRoll !== 0 && (
          <DiceTray
            currentDice={currentDice}
            canReroll={canReroll}
            toggleDiceReroll={handleToggle}
          />
        )}
        <footer className='flex items-center justify-center p-8'>
          <FooterButtons
            currentState={stateMachine.value}
            currentRoll={currentRoll}
            {...footerHandlers }
          />
        </footer>
      </section>
      <Scoreboard
        canSelectScores={!canReroll}
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

export default Game 
