import React, { useState, FC, useEffect, Dispatch, SetStateAction, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

import { upperSectionScores, lowerSectionScores } from '~/constants';
import { ILowerSection, IUpperSection } from '~/pages/game';
import { initialScore } from '~/hooks/useGameMeta';
import { ICurrentDie } from './DiceTray';
import Tooltip from './Tooltip';

interface IScoreBox {
  title: string | number, 
  value: number | undefined, 
  canSelectScores: boolean
  onClick: () => void
  toolTip: string;
}

const ScoreBox = (
  { title, value, canSelectScores, toolTip, onClick }: IScoreBox
) => (
  <div className={`grid w-full grid-rows-6 p-2 border border-black border-solid rounded-lg  ` + 
    `${value 
      ? 'bg-blue-300'
      : canSelectScores
        ? 'bg-white'
        : 'bg-gray-600'
    }`
  }>
    <a
      className='w-full h-full border-red-400 visited:border-green-400'
      href={undefined}
    />
    <button 
      className='w-full h-full row-span-5 text-sm border-4 border-solid enabled:text-black disabled:text-white'
      onClick={onClick}
      disabled={canSelectScores ? false : true}
    >
      <input 
        className='w-full h-full text-3xl text-center border-transparent'
        disabled
        placeholder='—'
        value={value !== undefined ? value : undefined}
      />
    </button>
    <Tooltip 
      tooltipText={toolTip}
    >
      <h5 className='space-x-2 text-xl text-center'>
        <span>{title}</span>
        <FontAwesomeIcon icon={faCircleInfo} />
      </h5>
    </Tooltip>
  </div>
)

interface IScoreboardSection {
  title: string,
  children: React.ReactNode
}

const ScoreBoardSection = (
  {children, title}: IScoreboardSection
) => (
  <section className='relative grid items-center justify-center w-full grid-cols-4 grid-rows-2 gap-4 p-2 mt-4'>
    <h3 className="absolute z-20 uppercase -top-4">{title}</h3>
    {children}
  </section>
);

interface IScoreboard {
  currentDice: ICurrentDie[];
  canSelectScores: boolean;
  gameTurn: number;
  addScore: (type: string, column: number | string, value: number) => void;
  upper: IUpperSection;
  handleAddUpperScore: (type: number, value: number) => void;
  lower: ILowerSection;
  handleAddLowerScore: (type: string, value: number) => void;
}

const PlayerScores = () => (
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
)

const Scoreboard = (
  { currentDice, canSelectScores, upper, handleAddUpperScore, lower, handleAddLowerScore }: IScoreboard
) => {
  // Error currently exists where tooltip doesn't show text on hover,
  // just shows undefined. 

  return(
   <section className="flex flex-col items-start justify-between w-full h-full bg-[#e1e1e1] rounded-lg border border-solid border-black">
      <PlayerScores />
      <main className="flex flex-col items-center w-full h-full p-4">
        <ScoreBoardSection title='Upper Section'>
          {Object.entries(upper).map(
            ([scoreSection, score]) => {
              console.log(upperSectionScores, scoreSection, score)
              return (
                <ScoreBox
                  title={scoreSection}
                  value={score}
                  tooltip={upperSectionScores[scoreSection]}
                  // tooltip={upperSectionScores[scoreSection]}
                  canSelectScores={canSelectScores}
                  onClick={() => {
                    // convert scoreSection to number
                    const scoreSectionAsNumber = parseInt(scoreSection)
                    handleAddUpperScore((scoreSectionAsNumber), calculateScore(currentDice, scoreSectionAsNumber))
                  }}
                />
              )
            }
          )}
        </ScoreBoardSection>
        <ScoreBoardSection title='Lower Section'>
          {Object.entries(lower).map(
            ([scoreSection, score]) => (
              <ScoreBox
                title={scoreSection}
                value={score}
                tooltip={lowerSectionScores[scoreSection]}
                canSelectScores={canSelectScores}
                onClick={() => {
                  handleAddLowerScore(scoreSection, calculateScore(currentDice, scoreSection))
                }}
              />
            )
          )}
        </ScoreBoardSection>
      </main>
    </section>
  )
}

export function calculateScore(currentDice: ICurrentDie[], type: string | number): number {
  if (typeof type === 'number') return getScoreForUpperSection(currentDice, type)
  else if (typeof type === 'string') return getScoreForLowerSection(currentDice, type)
  throw new Error('Invalid type passed to calculateScore')
}

function getScoreForUpperSection(currentDice: ICurrentDie[], type: number): number { 
  let diceCount = 0;

  const calculatedScore = currentDice.reduce(
    (accumulator, currentDiceObj) => {
      const shouldAddToScore = currentDiceObj.face === type
      return shouldAddToScore ? accumulator + type : accumulator;
    }, 0);

  return calculatedScore;
}

function getScoreForLowerSection(currentDice: ICurrentDie[], type: string): number {
  const counts: {[count: number]: number} = {};
  currentDice.forEach(
    (diceObj) => counts[diceObj.face] = counts[diceObj.face] + 1 || 1
  )

  const equals = (a: number[], b: number[]) => (
    a.length === b.length &&
    a.every(
      (val, index) => val === b[index]
    )
  );

  switch (type) {
    case "3 of a kind": {
      const hasMatch = Object.values(counts).find(
        (ele: number) => ele >= 3
      );
      if (!hasMatch) return 0;

      let calculatedScore = 0;
      currentDice.forEach(
        curDie => calculatedScore += curDie.face
      )

      return calculatedScore;
    }
    case "4 of a kind": {
      const hasMatch = Object.values(counts).find(
        (ele: number) => ele >= 4
      )
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
      // check whether there are 4 sequential numbers in the counts object
      const countKeys = [ ...Object.keys(counts) ];
      const dicePresent = countKeys.map(
        (key) => parseInt(key)
      );
      dicePresent.sort();

      const isSmallStraight = (
        equals(dicePresent, [1, 2, 3, 4])
        || equals(dicePresent, [2, 3, 4, 5])
        || equals(dicePresent, [3, 4, 5, 6])
        || equals(dicePresent, [1, 2, 3, 4, 5]) 
        || equals(dicePresent, [2, 3, 4, 5, 6])
      ) 

      return isSmallStraight ? 30 : 0;
    }
    case "Large Straight": {
      const countKeys = [ ...Object.keys(counts) ];
      const dicePresent = countKeys.map(
        (key) => parseInt(key)
      );
      dicePresent.sort();

      const isLargeStraight = (
        equals(dicePresent, [1, 2, 3, 4, 5]) 
        || equals(dicePresent, [2, 3, 4, 5, 6])
      )

      return isLargeStraight ? 40 : 0;
    }
    case "Yahtzee!": {
      const hasMatch = Object.values(counts).find(
        (ele: number) => ele === 5
      );

      return hasMatch ? 50 : 0;
    }
    case "Chance": {
      let calculatedScore = 0;
      currentDice.forEach(
        (curDie) => calculatedScore += curDie.face
      )

      return calculatedScore;
    }
    default: throw new Error("Invalid score type for lower section");
  }
}

export default Scoreboard
