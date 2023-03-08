import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, FC, useLayoutEffect, useReducer, useContext } from 'react';

import { upperSectionScores, lowerSectionScores } from '../constants';

import Scoreboard from '../components/Scoreboard';
import DiceTray, { ICurrentDie } from '../components/DiceTray';
import FooterButtons from '../components/Footer';

import useGameMeta from '../hooks/useGameMeta';
import type { IGameMeta } from '../hooks/useGameMeta';

const Game: NextPage = () => {
  const [gameMeta, dispatchGameMeta] = useGameMeta();
  const {currentDice, turn, footerButtonId, upper, lower } = gameMeta || {} as IGameMeta;

  function handleStart() { 
    dispatchGameMeta({
      type: "START"
    })
  }

  function handleReroll() {
    dispatchGameMeta({
      type: "REROLL"
    })
  }

  function handleToggle(diceToToggle: number) {
    const currentDicePrefs: boolean[] = currentDice.map(
      (_: unknown, idx: number) => diceToToggle === idx 
        ? !_.shouldReroll
        : _.shouldReroll
    );

    dispatchGameMeta({
      type: "TOGGLE_REROLL",
      shouldReroll: currentDicePrefs     
    })
  }

  function handleRestart() { 
    dispatchGameMeta({
      type: "RESTART"
    })
  }

  function handlePlayAgain() { 
    dispatchGameMeta({
      type: "PLAY_AGAIN"
    })
  }

  function handleAddUpperScore(type: number, value: number) {
    dispatchGameMeta({
      type: "UPPER_SCORE",
      column: type,
      value
    })
  }

  function handleAddLowerScore(type: string, value: number) {
    dispatchGameMeta({
      type: "LOWER_SCORE",
      column: type,
      value
    })
  }

  const footerHandlers = {
    handleStart,
    handleReroll,
    handleRestart,
    handlePlayAgain,
  }

  const canReroll = turn !== 3;

  return (
    // Have main screen that lets you navigate to scores, exit and play
    <section className='flex w-screen h-screen'>
      <section className='flex flex-col items-center justify-between w-full h-full'>
        <header className='p-8'>
          <h1 className='text-3xl'>Yahtzee!</h1>
        </header>
        {
          turn !== 0 && (
            <DiceTray 
              currentDice={currentDice} 
              canReroll={canReroll}
              toggleDiceReroll={handleToggle} 
            />
          )
        }
        <footer className='flex items-center justify-center p-8'>
          <FooterButtons currentId={footerButtonId} {...footerHandlers} />
        </footer>
      </section>
      <Scoreboard 
        canSelectScores={!canReroll}
        {...{currentDice, upper, handleAddUpperScore, lower, handleAddLowerScore}}
      />
    </section>
  )
}

export default Game 
