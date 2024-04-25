import {
  useState,
  FC,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

import { ILowerSection, IUpperSection } from '~/pages/game';
import { initialScore } from '~/hooks/useGameMeta';
import { ICurrentDie } from './DiceTray';
import Tooltip from './Tooltip';


interface IScoreBox {
  title: string | number;
  value: number | undefined;
  onClick: () => void;
}

const ScoreBox = ({ title, value, onClick }: IScoreBox) => {
  return (
    <button 
      className='flex flex-col items-center justify-center min-w-36 p-2 bg-gray-100 border border-black border-solid disabled:outline-red-400 disabled:outline-4 disabled:outline'
      onClick={onClick}
    >
      <header className='relative flex w-full justify-between'>
        <h5 className='text-3xl text-black text-center w-full'>{title}</h5>
        <div className='w-full absolute top-0 right-0 flex justify-end'>
          <Tooltip tooltipText='Insert info about rules here'/>
        </div>
      </header>
      {value ?? '—'}
    </button>
  );
}

interface IScoreboardSection {
  title: string;
  children: React.ReactNode;
}

const ScoreBoardSection = ({ children, title }: IScoreboardSection) => (
  <section className='flex flex-col items-center justify-between w-full p-2'>
    <h3 className='uppercase'>{title}</h3>
    {children}
  </section>
);

interface IScoreboard {
  currentDice: ICurrentDie[];
  // gameTurn: number;
  // addScore: (type: string, column: number | string, value: number) => void;
  upper: IUpperSection;
  handleAddUpperScore: (section: number, score: IUpperSection) => void;
  lower: ILowerSection;
  handleAddLowerScore: (section: string, score: ILowerSection) => void;
}

const PlayerScores = () => (
  <header className='flex flex-col items-center justify-start w-full p-4'>
    <h3 className='text-3xl'>Scoreboard</h3>
    <section className='flex justify-between w-full'>
      <span className='flex flex-col items-center justify-center'>
        <h5>Current Score: </h5>
        {0}
      </span>
      <span className='flex flex-col items-center justify-center'>
        <h5>Top Score: </h5>
        {0}
      </span>
    </section>
  </header>
);

const Scoreboard = ({
  currentDice,
  upper,
  handleAddUpperScore,
  lower,
  handleAddLowerScore,
}: IScoreboard) => (
  <section className='flex flex-col items-start justify-between w-full h-full bg-[#e1e1e1] rounded-lg border border-solid border-black'>
    <PlayerScores />

    <div className='flex flex-col justify-between items-center h-full'>
      {/* Upper  */}
      <ScoreBoardSection title='Upper Section'>
        <section className='grid grid-cols-3 grid-rows-2 gap-x-8 gap-y-24'>
          {Object.entries(upper).map(([key, value]) => (
            <ScoreBox
              title={key}
              value={value}
              onClick={() => {
                handleAddUpperScore(key, calculateScore(currentDice, key));
              }}
            />
          ))}
        </section>
      </ScoreBoardSection>
      {/* Lower */}
      <ScoreBoardSection title='Lower Section'>
        <section className='grid grid-cols-4 grid-rows-2 gap-x-4 gap-y-24'>
          {Object.entries(lower).map(([key, value]) => (
            <ScoreBox
              title={key}
              value={value}
              onClick={() => {
                handleAddLowerScore(key, calculateScore(currentDice, key));
              }}
            />
          ))}
        </section>
      </ScoreBoardSection>
    </div>
  </section>
);

function calculateScore(currentDice: ICurrentDie[], type: string | number) {
  if (typeof type === 'number')
    return getScoreForUpperSection(currentDice, type);
  else if (typeof type === 'string')
    return getScoreForLowerSection(currentDice, type);
}

function getScoreForUpperSection(currentDice: ICurrentDie[], type: number) {
  const calculatedScore = currentDice.reduce((accumulator, currentDiceObj) => {
    const shouldAddToScore = currentDiceObj.face === type;
    return shouldAddToScore ? accumulator + type : accumulator;
  }, 0);

  return calculatedScore;
}

function getScoreForLowerSection(currentDice: ICurrentDie[], type: string) {
  const counts: { [count: number]: number } = {};
  currentDice.forEach(
    (diceObj) => (counts[diceObj.face] = counts[diceObj.face] + 1 || 1)
  );

  const equals = (a: number[], b: number[]) =>
    a.length === b.length && a.every((val, index) => val === b[index]);

  switch (type) {
    case '3 of a kind': {
      const hasMatch = Object.values(counts).find((ele: number) => ele >= 3);
      if (!hasMatch) return 0;

      let calculatedScore = 0;
      currentDice.forEach((curDie) => (calculatedScore += curDie.face));

      return calculatedScore;
    }
    case '4 of a kind': {
      const hasMatch = Object.values(counts).find((ele: number) => ele >= 4);
      if (!hasMatch) return 0;

      let calculatedScore = 0;
      currentDice.forEach((curDie) => (calculatedScore += curDie.face));

      return calculatedScore;
    }
    case 'Full House': {
      const hasTwoMatch = Object.values(counts).find(
        (ele: number) => ele === 2
      );
      const hasThreeMatch = Object.values(counts).find(
        (ele: number) => ele === 3
      );
      const hasFullHouse = hasTwoMatch && hasThreeMatch;

      return hasFullHouse ? 25 : 0;
    }
    case 'Small Straight': {
      // check whether there are 4 sequential numbers in the counts object
      const countKeys = [...Object.keys(counts)];
      const dicePresent = countKeys.map((key) => parseInt(key));
      dicePresent.sort();

      const isSmallStraight =
        equals(dicePresent, [1, 2, 3, 4]) ||
        equals(dicePresent, [2, 3, 4, 5]) ||
        equals(dicePresent, [3, 4, 5, 6]) ||
        equals(dicePresent, [1, 2, 3, 4, 5]) ||
        equals(dicePresent, [2, 3, 4, 5, 6]);

      return isSmallStraight ? 30 : 0;
    }
    case 'Large Straight': {
      const countKeys = [...Object.keys(counts)];
      const dicePresent = countKeys.map((key) => parseInt(key));
      dicePresent.sort();

      const isLargeStraight =
        equals(dicePresent, [1, 2, 3, 4, 5]) ||
        equals(dicePresent, [2, 3, 4, 5, 6]);

      return isLargeStraight ? 40 : 0;
    }
    case 'Yahtzee!': {
      const hasMatch = Object.values(counts).find((ele: number) => ele === 5);

      return hasMatch ? 50 : 0;
    }
    default: {
      // Chance
      let calculatedScore = 0;
      currentDice.forEach((curDie) => (calculatedScore += curDie.face));

      return calculatedScore;
    }
  }
}

export { calculateScore };

export default Scoreboard;
