import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, FC, useLayoutEffect, useReducer, useContext } from 'react';

import Scoreboard from '../components/Scoreboard';
import DiceTray, { ICurrentDie } from '../components/DiceTray';
import FooterButtons from '../components/Footer';

import useGameMeta from '../hooks/useGameMeta';

const Game: NextPage = () => {
  // Game Meta Info
  const [gameMeta, dispatchGameMeta] = useGameMeta();

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
    const currentDicePrefs: boolean[] = gameMeta.currentDice.map(
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

  const canReroll = gameMeta.turn !== 3;

  return (
    // Have main screen that lets you navigate to scores, exit and play
    <section className='flex w-screen h-screen'>
      <section className='flex flex-col items-center justify-between w-full h-full'>
        <header className='p-8'>
          <h1 className='text-3xl'>Yahtzee!</h1>
        </header>
        {
          gameMeta.turn !== 0 && (
            <DiceTray 
              currentDice={gameMeta.currentDice} 
              canReroll={canReroll}
              toggleDiceReroll={handleToggle} 
            />
          )
        }
        <footer className='flex items-center justify-center p-8'>
          <FooterButtons 
            currentId={gameMeta.footerButtonId}
            handleStart={handleStart}              
            handleReroll={handleReroll}
            handleRestart={handleRestart}
            handlePlayAgain={handlePlayAgain}
          />
        </footer>
      </section>
      <Scoreboard 
        currentDice={gameMeta.currentDice}
        canSelectScores={!canReroll}
        upper={gameMeta.upper}
        lower={gameMeta.lower}
        handleAddUpperScore={handleAddUpperScore}
        handleAddLowerScore={handleAddLowerScore}
      />
    </section>
  )
}

export default Game 
