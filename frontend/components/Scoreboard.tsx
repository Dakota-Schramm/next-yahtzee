import React, { useState, FC, useEffect, Dispatch, SetStateAction, useContext } from 'react'
import { ILowerSection, IUpperSection } from '../pages/game';
import { initialScore } from '../hooks/useGameMeta';
import { ICurrentDie } from './DiceTray';

interface IScoreboard {
  currentDice: ICurrentDie[];
  canSelectScores: boolean;
  upper: IUpperSection;
  lower: ILowerSection;
  handleAddUpperScore: (score: IUpperSection) => void;
  handleAddLowerScore: (score: ILowerSection) => void;
}

interface IScoreBox {
  title: string | number, 
  value: number | undefined, 
  canSelectScores: boolean
  onClick: () => void
}

const ScoreBox = (
  { title, value, canSelectScores, onClick }: IScoreBox
) => (
  <div className='relative grid items-center justify-center w-full grid-cols-3 p-2 bg-gray-100 border border-black border-solid'>
    <h5 className='text-3xl text-black'>{title}</h5>
    <p className=''>{'Insert info about rules here'}</p>
    <button 
      className={'text-sm text-black border-solid w-full h-full border-4 ' + 
        `${value !== undefined ? 'border-green-400' : 'border-red-400'} ` + 
        `${canSelectScores ? 'bg-white' : 'bg-gray-600'}`
      }
      onClick={onClick}
    >
      {value ?? "—"}
    </button>
  </div>
)

interface IScoreboardSection {
  title: string,
  children: React.ReactNode
}

const ScoreBoardSection = (
  {children, title}: IScoreboardSection
) => (
  <section className='flex flex-col items-center justify-center w-full p-2'>
    <h3 className="uppercase">{title}</h3>
    {children}
  </section>
);

interface IScoreboard {
  currentDice: ICurrentDie[];
  canSelectScores: boolean;
  gameTurn: number;
  addScore: (type: string, column: number | string, value: number) => void;
  upper: IUpperSection;
  handleAddUpperScore: (score: IUpperSection) => void;
  lower: ILowerSection;
  handleAddLowerScore: (score: ILowerSection) => void;
}

const Scoreboard = (
  { currentDice, canSelectScores, upper, handleAddUpperScore, lower, handleAddLowerScore }: IScoreboard
) => (
  <section className="flex flex-col items-start justify-between w-full h-full bg-[#e1e1e1] rounded-lg border border-solid border-black">
    <header className="flex flex-col items-center justify-start w-full p-4">
      <h3 className="text-3xl">Scoreboard</h3>
      <section className="flex justify-between w-full">
        <span className="flex flex-col items-center justify-center">
          <h5>Current Score: </h5>
          {0}
        </span>
        <span className="flex flex-col items-center justify-center">
          <h5>Top Score: </h5>
          {0}
        </span>
      </section>
    </header>
    {/* Upper  */}
    <ScoreBoardSection title='Upper Section'>
      {Object.entries(upper).map(
        ([key, value]) => (
          <ScoreBox
            title={key}
            value={value}
            canSelectScores={canSelectScores}
            onClick={() => {
              handleAddUpperScore(key, calculateScore(currentDice, key))
            }}
          />
        )
      )}
    </ScoreBoardSection>
    {/* Lower */}
    <ScoreBoardSection title='Lower Section'>
      {Object.entries(lower).map(
        ([key, value]) => (
          <ScoreBox
            title={key}
            value={value}
            canSelectScores={canSelectScores}
            onClick={() => {
              handleAddLowerScore(key, calculateScore(currentDice, key))
            }}
          />
        )
      )}
    </ScoreBoardSection>
  </section>
)

function calculateScore(currentDice: ICurrentDie[], type: string | number) {
  // For UpperSection, only reward the scores if 
  // three (or more) of a kind are rolled 
  if (typeof type === 'number') return getScoreForUpperSection(currentDice, type)
  else return getScoreForLowerSection(currentDice, type)
}

function getScoreForUpperSection(currentDice: ICurrentDie[], type: number) { 
  let diceCount = 0;

  const calculatedScore = currentDice.reduce(
    (accumulator, currentDiceObj) => {
      if (currentDiceObj.face !== type) return accumulator
      else {
        diceCount += 1 
        return accumulator + type
      }
  }, 0);

  return diceCount < 3 ? calculatedScore : 0;
}

function getScoreForLowerSection(currentDice: ICurrentDie[], type: string) {
  const counts: {[count: number]: number} = {};
  currentDice.forEach(
    (diceObj) => counts[diceObj.face] = counts[diceObj.face] + 1 || 1
  )

  switch (type) {
    case "3 of a kind": {
      const hasMatch = Object.values(counts).find(
        (ele: number) => ele === 3
      );
      if (!hasMatch) return 0;

      let calculatedScore = 0;
      currentDice.forEach(
        curDie => calculatedScore += curDie.face
      )

      return calculatedScore;
    }
    case "4 of a kind": {
      const hasMatch = Object.values(counts).find((ele: number) => ele === 4)
      if (!hasMatch) return 0;

      let calculatedScore = 0;
      currentDice.forEach(
        (curDie) => calculatedScore += curDie.face
      )

      return calculatedScore;
    }
    case "Full House": {
      const hasTwoMatch = Object.values(counts).find(
        (ele: number) => ele === 2
      ); 
      const hasThreeMatch = Object.values(counts).find(
        (ele: number) => ele === 3
      ); 
      const hasFullHouse = hasTwoMatch && hasThreeMatch;

      return hasFullHouse ? 25 : 0;
    }
    case "Small Straight": {
      const dicePresent = [ ...Object.keys(counts) ];
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
      const dicePresent = [ ...Object.keys(counts) ];

      dicePresent.sort();
      for (let i=0; i<dicePresent.length; ++i) {
        const isSequential = (dicePresent[i-1] + 1) === dicePresent[i];
        if (!isSequential) return 0
      }

      return 40;
    }
    case "Yahtzee!": {
      const hasMatch = currentDice.every(
        (currentValue) => currentValue.face === currentDice[0].face
      );

      return hasMatch ? 50 : 0;
    }
    default: { // Chance
      let calculatedScore = 0;
      currentDice.forEach(
        (curDie) => calculatedScore += curDie.face
      )

      return calculatedScore;
    }
  }

}

export {
  calculateScore
}

export default Scoreboard
