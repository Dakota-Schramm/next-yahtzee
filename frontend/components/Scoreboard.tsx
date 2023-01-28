import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'

import { ILowerSection, IUpperSection } from '../pages/game';

// Convert the currentDice in this file to reflect consolidating dice arrays

interface IScoreBox {
  title: string | number, 
  value: number | undefined, 
  canSelectScores: boolean,
  onClick: () => void,
}

const ScoreBox = (
  { title, value, canSelectScores, onClick}: IScoreBox
) => (
  <div className='relative grid items-center justify-center w-full grid-cols-3 p-2 bg-gray-100 border border-black border-solid'>
    <h5 className='text-3xl text-black'>{title}</h5>
    <p className=''>{'Insert info about rules here'}</p>
    <button 
      className={'text-sm text-black border-solid w-full h-full border-4 ' + 
        `${value !== undefined ? 'border-green-400' : 'border-red-400'} ` + 
        `${canSelectScores ? 'bg-white' : 'bg-gray-600 cursor-not-allowed'}`
      }
      onClick={onClick}
      disabled={!canSelectScores}
    >
      {value ?? "—"}
    </button>
  </div>
)

interface IScoreboardSection {
  title: string,
  name_list: string[],
  canSelectScores: boolean,
  onClick: () => void,
}

const ScoreBoardSection = (
  {title, name_list, canSelectScores, onClick}: IScoreboardSection
) => (
  <section className='flex flex-col items-center justify-center w-full p-2'>
    <h2 className='uppercase'>{title}</h2>
    {
      Object.entries(name_list).map(
        ([key, value]) => (
          <ScoreBox 
            title={key} 
            value={value} 
            canSelectScores={canSelectScores}
            onClick={onClick}
          />
        )
      )
    }
  </section>
)

interface IScoreboard {
  currentDice: number[];
  canSelectScores: boolean;
  gameTurn: number;
  addScore: (type: string, column: number | string, value: number) => void;
  upper: IUpperSection;
  lower: ILowerSection;
}

const Scoreboard: FC<IScoreboard> = ({
  currentDice,
  canSelectScores, 
}) => {
  const {gameMeta, dispatchGameMeta} = useContext(GameContext);

  return (
    <section className='flex flex-col items-start justify-between w-full h-full bg-[#e1e1e1] rounded-lg border border-solid border-black'>
      <header className="flex flex-col items-center justify-start w-full p-4">
        <h3 className='text-3xl'>Scoreboard</h3>
        <section className='flex justify-between w-full'>
          <span className='flex flex-col items-center justify-center'>
            <h5>Current Score: </h5>{0}
          </span>
          <span className='flex flex-col items-center justify-center'>
            <h5>Top Score: </h5>{0}
          </span>
        </section>
      </header>
      {/* Upper  */}
      <ScoreBoardSection
        title='Upper Section'
        name_list={gameMeta.upper}
        can_select_scores={canSelectScores}
        currentDice={currentDice}
        onClick={() => {
          dispatchGameMeta({
            type: 'UPPER_SCORE', 
            value: calculateScore(currentDice, value)
          })
        }}
      />
      {/* Lower */}
      <ScoreBoardSection
        title='Lower Section'
        name_list={gameMeta.lower}
        can_select_scores={canSelectScores}
        currentDice={currentDice}
        onClick={() => {
          dispatchGameMeta({
            type: 'LOWER_SCORE', 
            value: calculateScore(currentDice, value)
          })
        }}
      
      />
    </section>
  )
}

function calculateScore(currentDice: unknown, type: string | number) {
  // For UpperSection, only reward the scores if 
  // three (or more) of a kind are rolled 
  if (typeof type === 'number') {
    let diceCount = 0;
    const count = currentDice.reduce(
      (accumulator, currentValue) => {
        if (currentValue !== type) return accumulator
        else {
          diceCount += 1 
          return accumulator + type
        }
    }, 0);
    if (diceCount < 3) return;
    // setScore((prevScore) => prevScore + count)
  } else { // Lower section
    const counts: {[count: number]: number} = {};
    currentDice.forEach((val) => counts[val] = counts[val] + 1 || 1)

    switch (type) {
      case "3 of a kind": {
        const hasMatch = Object.values(counts).find((ele: number) => ele === 3);
        if (!hasMatch) return 0;
        return currentDice.reduce((sum, cur) => sum + cur);
      }
      case "4 of a kind": {
        const hasMatch = Object.values(counts).find((ele: number) => ele === 4)
        if (!hasMatch) return 0;
        return currentDice.reduce((sum, cur) => sum + cur);
      }
      case "Full House": {
        const hasTwoMatch = Object.values(counts).find((ele: number) => ele === 2); 
        const hasThreeMatch = Object.values(counts).find((ele: number) => ele === 3); 
        const hasFullHouse = hasTwoMatch && hasThreeMatch;
        return hasFullHouse ? 25 : 0;
      }
      case "Small Straight": {
        const dicePresent = [...Object.keys(counts)];
        let numSequential = 0;
        let largestSequence = 0;

        dicePresent.sort();
        for (let i=0; i<dicePresent.length; ++i) {
          const isSequential = (dicePresent[i-1] + 1) === dicePresent[i];
          if (isSequential) {
            numSequential += 1
          } else {
            largestSequence = numSequential;
            numSequential = 0
          }
        }
        return largestSequence === 4 ? 30 : 0;
      }
      case "Large Straight": {
        const dicePresent = [...Object.keys(counts)];

        dicePresent.sort();
        for (let i=0; i<dicePresent.length; ++i) {
          const isSequential = (dicePresent[i-1] + 1) === dicePresent[i];
          if (!isSequential) return 0
        }
        return 40;
      }
      case "Yahtzee!": {
        const hasMatch = currentDice.every((currentValue) => currentValue === currentDice[0]);
        return hasMatch ? 50 : 0;
      }
      default: { // Chance
        const chanceSum = currentDice.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        , 0)
        return chanceSum;
      }
    }
  }
}

export default Scoreboard