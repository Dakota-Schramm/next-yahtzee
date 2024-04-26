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
import { lowerSectionScores, upperSectionScores } from '~/constants';

interface IScoreBox {
  title: string | number;
  value: number | undefined;
  potentialScore: number;
  onClick: () => void;
}

const ScoreValue = ({ isHovered, value, potentialScore }) => {
  let toDisplay = "-";
  if (value || value === 0) {
    toDisplay = value
  } else if (isHovered){
    toDisplay = potentialScore
  } 

  return <span>{toDisplay}</span>
}

const ScoreBox = ({ title, value, potentialScore, onClick }: IScoreBox) => {
  const [isHovered, setIsHovered] = useState(false)

  const tooltipText = Object.keys(upperSectionScores).includes(title)
    ? upperSectionScores[title]
    : lowerSectionScores[title]

  return (
    <button 
      className='flex flex-col items-center justify-center p-2 bg-gray-100 border border-black border-solid min-w-36 disabled:outline-red-400 disabled:outline-4 disabled:outline'
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <header className='relative flex justify-between w-full'>
        <h5 className='w-full text-3xl text-center text-black'>{title}</h5>
        <div className='absolute top-0 right-0 flex justify-end w-full'>
          <Tooltip {...{tooltipText}} />
        </div>
      </header>
      <ScoreValue {...{ isHovered, potentialScore, value }}/>
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

const PlayerScores = ({
  upper,
  lower,
}: {
  upper: IUpperSection;
  lower: ILowerSection;
}) => {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const score = localStorage.getItem("highScore");
    if (!score) return
    setHighScore(Number(score))
  }, []);

  return (
    <header className='flex flex-col items-center justify-start w-full p-4'>
      <h3 className='text-3xl'>Scoreboard</h3>
      <section className='flex justify-between w-full'>
        <span className='flex flex-col items-center justify-center'>
          <h5>Current Score: </h5>
          {calculateCurrentScore(upper, lower)}
        </span>
        <span className='flex flex-col items-center justify-center'>
          <h5>Top Score: </h5>
          {highScore}
        </span>
      </section>
    </header>
  );
}

// TODO: Don't allow scoring if currentRoll isn't valid (in welcome state)
// ? Might not need to change current behavior since state machine wont allow that transition in welcome??
const Scoreboard = ({
  currentDice,
  upper,
  handleAddUpperScore,
  lower,
  handleAddLowerScore,
}: IScoreboard) => {
  let upperScores = structuredClone(upper);
  for (let key in upperScores) {
    upperScores[key] = getScoreForUpperSection(currentDice, Number(key))
  }

  let lowerScores = structuredClone(lower);
  for (let key in lowerScores) {
    lowerScores[key] = getScoreForLowerSection(currentDice, key)
  }

  console.log({ upperScores, lowerScores })

  return (
    <section className='flex flex-col items-start justify-between w-full h-full bg-[#e1e1e1] rounded-lg border border-solid border-black'>
      <PlayerScores {...{ upper, lower }} />

      <div className='flex flex-col items-center justify-between h-full'>
        {/* Upper  */}
        <ScoreBoardSection title='Upper Section'>
          <section className='grid grid-cols-3 grid-rows-2 gap-x-8 gap-y-24'>
            {Object.entries(upper).map(([key, value]) => (
              <ScoreBox
                title={key}
                value={value}
                potentialScore={upperScores[key]}
                onClick={() => {
                  console.log("HIT UPPER")
                  handleAddUpperScore(key, upperScores[key]);
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
                potentialScore={lowerScores[key]}
                onClick={() => {
                  console.log("HIT LOWER")
                  handleAddLowerScore(key, lowerScores[key]);
                }}
              />
            ))}
          </section>
        </ScoreBoardSection>
      </div>
    </section>
  );
}

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

export function calculateCurrentScore(upperSection, lowerSection) {
  let score = 0;
  for (let key in upperSection) {
    if (!upperSection[key]) continue 
    score += upperSection[key]
  }

  if (63 <= score) {
    score += 35
  }

  for (let key in lowerSection) {
    if (!lowerSection[key]) continue 
    score += lowerSection[key]
  }

  return score
}

export { calculateScore };

export default Scoreboard;
