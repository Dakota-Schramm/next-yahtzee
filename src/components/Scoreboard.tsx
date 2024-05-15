import {
  useState,
  FC,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

import { GiCheckMark } from 'react-icons/gi';

import { ILowerSection, IUpperSection } from '~/pages/game';
import { initialScore } from '~/hooks/useGameMeta';
import { ICurrentDie } from './DiceTray';
import Tooltip from './Tooltip';
import { lowerSectionScores, upperSectionScores } from '~/constants';
import { SoundContext } from '~/contexts/sound';

interface IScoreBox {
  canSelect: boolean;
  title: string | number;
  value: number | undefined;
  potentialScore: number;
  onClick: () => void;
  disabled: boolean;
}

const ScoreValue = ({
  title,
  canSelect,
  isHovered,
  value,
  potentialScore,
}: {
  canSelect: boolean;
  isHovered: boolean;
  title: string | number;
  value: number | undefined;
  potentialScore: number;
}) => {
  if (title === 'Yahtzee! Bonuses') {
    const numOfBonuses = value / 100;

    const checkmarks = [];
    for (let i = 0; i < numOfBonuses; i++) {
      checkmarks.push(<GiCheckMark />);
    }

    return (
      <span className='flex min-h-4 font-newFrench text-xl text-red-500'>
        {checkmarks}
      </span>
    );
  } else {
    let toDisplay: string | number = '-';
    if (canSelect) {
      if (value || value === 0) {
        toDisplay = value;
      } else if (isHovered) {
        toDisplay = potentialScore;
      }
    }

    return <span className='font-newFrench text-xl'>{toDisplay}</span>;
  }
};

const ScoreBox = ({
  canSelect,
  title,
  value,
  potentialScore,
  ...props
}: IScoreBox) => {
  const [isHovered, setIsHovered] = useState(false);

  const tooltipText = Object.keys(upperSectionScores).includes(title)
    ? upperSectionScores[title]
    : lowerSectionScores[title];

  return (
    <button
      className='flex flex-col items-center justify-center p-2 bg-gray-100 border border-black border-solid min-w-36 rounded-lg '
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <header className='relative flex justify-between w-full'>
        <h5 className='w-full text-3xl text-center text-black font-jersey10'>
          {title}
        </h5>
        <div className='absolute top-0 right-0 flex justify-end w-full'>
          <Tooltip {...{ tooltipText }} />
        </div>
      </header>
      <ScoreValue {...{ title, canSelect, isHovered, potentialScore, value }} />
    </button>
  );
};

interface IScoreboardSection {
  title: string;
  children: React.ReactNode;
}

const ScoreBoardSection = ({ children, title }: IScoreboardSection) => (
  <section className='flex flex-col items-center justify-between w-full p-2'>
    <h3 className='uppercase font-revueStd'>{title}</h3>
    {children}
  </section>
);

interface IScoreboard {
  canSelect: boolean;
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
  // TODO: Add boolean here to check if game is on first turn,
  // Add to dep array for effect

  useEffect(() => {
    const score = localStorage.getItem('highScore');
    if (!score) return;
    setHighScore(Number(score));
  }, []);

  return (
    <header className='flex flex-col items-center justify-start w-full p-4 font-revueStd'>
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
};

// TODO: Don't allow scoring if currentRoll isn't valid (in welcome state)
// ? Might not need to change current behavior since state machine wont allow that transition in welcome??
const Scoreboard = ({
  currentDice,
  canSelect,
  upper,
  handleAddUpperScore,
  lower,
  handleAddLowerScore,
}: IScoreboard) => {
  const { enabled, setEnabled } = useContext(SoundContext);
  const [playAudio, setPlayAudio] = useState<{
    select_score?: HTMLAudioElement
  }>({ select_score: undefined, })

  useEffect(() => {
    setPlayAudio({
      select_score: new Audio('sounds/select_score.wav'),
    })
  }, []);

  let upperScores = structuredClone(upper);
  for (let key in upperScores) {
    upperScores[key] = getScoreForUpperSection(currentDice, Number(key));
  }

  let lowerScores = structuredClone(lower);
  for (let key in lowerScores) {
    lowerScores[key] = getScoreForLowerSection(currentDice, key);
  }

  return (
    <section className='flex flex-col items-start justify-between w-full h-full bg-[#e1e1e1] rounded-lg border border-solid border-black text-red-700'>
      <PlayerScores {...{ upper, lower }} />

      <div className='flex flex-col items-center justify-center h-full space-y-24'>
        {/* Upper  */}
        <ScoreBoardSection title='Upper Section'>
          <section className='grid grid-cols-3 grid-rows-2 gap-x-8 gap-y-8'>
            {Object.entries(upper).map(([key, value]) => (
              <ScoreBox
                title={key}
                potentialScore={upperScores[key]}
                disabled={value !== undefined && 0 <= value}
                onClick={() => {
                  if (enabled) playAudio['select_score']?.play();
                  handleAddUpperScore(key, upperScores[key]);
                }}
                {...{ canSelect, value }}
              />
            ))}
          </section>
        </ScoreBoardSection>
        <LowerScoreBoard
          {...{ lower, lowerScores, handleAddLowerScore, canSelect }}
        />
      </div>
    </section>
  );
};

function LowerScoreBoard({
  lower,
  lowerScores,
  handleAddLowerScore,
  canSelect,
}) {
  const { enabled, setEnabled } = useContext(SoundContext);

  const [playAudio, setPlayAudio] = useState<{
    yahtzee?: HTMLAudioElement, select_score?: HTMLAudioElement
  }>({ yahtzee: undefined, select_score: undefined, })

  useEffect(() => {
    setPlayAudio({
      yahtzee: new Audio('sounds/yahtzee.wav'),
      select_score: new Audio('sounds/select_score.wav'),
    })
  }, []);

  const yahtzeeScore = lower['Yahtzee!'];
  const yahtzeeBonusScore = lower['Yahtzee! Bonuses'];
  const isBonusSelectable = yahtzeeScore === 50 && yahtzeeBonusScore < 300;

  const scoreBoxProps = (key, value) => {
    return {
      title: key,
      value: value,
      potentialScore: lowerScores[key],
    };
  };

  return (
    <ScoreBoardSection title='Lower Section'>
      <section className='grid grid-cols-4 grid-rows-2 gap-x-8 gap-y-8'>
        {Object.entries(lower).map(([key, value]) => {
          if (key === 'Yahtzee! Bonuses') {
            return (
              <ScoreBox
                canSelect={isBonusSelectable}
                onClick={() => {
                  if (enabled) playAudio['yahtzee']?.play();
                  handleAddLowerScore(key, lowerScores[key]);
                }}
                disabled={value !== undefined && 0 <= value}
                {...scoreBoxProps(key, value)}
              />
            );
          } else if (key === 'Yahtzee!') {
            return (
              <ScoreBox
                onClick={() => {
                  if (enabled && lowerScores[key]) yahtzeeSnd.play();
                  handleAddLowerScore(key, lowerScores[key]);
                }}
                disabled={value !== undefined && 0 <= value}
                {...scoreBoxProps(key, value)}
                {...{ canSelect }}
              />
            );
          } else {
            return (
              <ScoreBox
                onClick={() => {
                  if (enabled) playAudio["select_score"]?.play();
                  handleAddLowerScore(key, lowerScores[key]);
                }}
                disabled={value !== undefined && 0 <= value}
                {...scoreBoxProps(key, value)}
                {...{ canSelect }}
              />
            );
          }
        })}
      </section>
    </ScoreBoardSection>
  );
}

///

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
      // Add way to bring in scored yahtzees here and add scores appropriately
      // Add special case for scorebox on yahtzees ==> Show red check marks for each yahtzee
      const hasMatch = Object.values(counts).find((ele: number) => ele === 5);

      return hasMatch ? 50 : 0;
    }
    case 'Yahtzee! Bonuses': {
      const hasMatch = Object.values(counts).find((ele: number) => ele === 5);

      return hasMatch ? 100 : 0;
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
    if (!upperSection[key]) continue;
    score += upperSection[key];
  }

  if (63 <= score) {
    score += 35;
  }

  for (let key in lowerSection) {
    if (!lowerSection[key]) continue;
    score += lowerSection[key];
  }

  return score;
}

export { calculateScore };

export default Scoreboard;
