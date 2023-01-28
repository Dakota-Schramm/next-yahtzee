import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Scoreboard from '../components/Scoreboard';
import DiceTray, { ICurrentDie } from '../components/DiceTray';


const Game: NextPage = () => {
  // Game Meta Info
  const [round, setRound] = useState<number>(0);
  const [turn, setTurn] = useState<number>(0);

  // Dice Info
  const numOfDice = 5;
  const [currentDice, setCurrentDice] = useState<number[]>(Array(numOfDice).fill(1))
  const [diceShouldReroll, setDiceShouldReroll] = useState<boolean[]>(Array(numOfDice).fill(true))

  // Each time a turn occurs, dice that are not currently 
  // being held should be rerolled
  // Player should get three turns and then be forced to choose
  // a score method

  useEffect(() => {
    console.log(diceShouldReroll)
  }, [diceShouldReroll])
  
  return (
    // Have main screen that lets you navigate to scores, exit and play
    <section className='flex w-screen h-screen'>
      <section className='flex flex-col items-center justify-center w-full h-full'>
        <h1 className='text-3xl'>Yahtzee!</h1>
        <DiceTray 
          currentDice={currentDice} 
          shouldRerollDice={diceShouldReroll}
          toggleDiceReroll={
            (diceNum) => setDiceShouldReroll((prevDice) => (
              prevDice.map((k, i) => i !== diceNum 
                ? k 
                : !k
              )
          ))} 
          />
      </section>
      <Scoreboard />
    </section>
  )
}

export default Game 
