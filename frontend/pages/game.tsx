import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, FC, useLayoutEffect, useReducer, useContext } from 'react';

import Scoreboard from '../components/Scoreboard';
import DiceTray, { ICurrentDie } from '../components/DiceTray';
import { upperSectionScores, lowerSectionScores } from '../constants';
import GameProvider, { GameContext } from '../contexts/Game';
import useGameMeta from '../hooks/useGameMeta';

const Game: NextPage = () => {
  // Game Meta Info
  const [gameMeta, dispatchGameMeta] = useGameMeta();

  // Dice Info
  const numOfDice = 5;
  const [currentDice, setCurrentDice] = useState<number[]>(Array(numOfDice).fill(1))
  const [diceShouldReroll, setDiceShouldReroll] = useState<boolean[]>(Array(numOfDice).fill(true))
  
  function rerollDice() {
    currentDice.forEach((_, idx) => {
      if (!diceShouldReroll[idx]) return;
      const newRoll = Math.floor(Math.random() * 6 + 1)
      setCurrentDice((prevDice) => (
        prevDice.map((k, i) => i !== idx
          ? k
          : newRoll
        )
      ))
    })
  }

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

  const canReroll = gameMeta.turn !== 3;

  useEffect(() => rerollDice(), [])

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
              currentDice={currentDice} 
              canReroll={canReroll}
              shouldRerollDice={diceShouldReroll}
              toggleDiceReroll={
                (diceNum) => setDiceShouldReroll((prevDice) => (
                  prevDice.map((k, i) => i !== diceNum 
                    ? k 
                    : !k
                  )
              ))} 
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
        currentDice={currentDice}
        canSelectScores={!canReroll}
      />
    </section>
  )
}

export default Game 
