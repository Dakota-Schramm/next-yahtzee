import { FaPlay } from 'react-icons/fa';
import { GiRollingDiceCup } from 'react-icons/gi';
import { VscDebugRestart } from 'react-icons/vsc';
import { MdReplay } from 'react-icons/md';
import { BsCardList } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import { SoundContext } from '~/contexts/sound';
import { DrawerTrigger } from '~/components/ui/drawer';

interface IFooterSection {
  currentState: string;
  currentRoll: number;
  handleStart: () => void;
  handleReroll: () => void;
  handleRestart: () => void;
  handlePlayAgain: () => void;
}

const FooterButtons = ({
  currentState,
  currentRoll,
  handleStart,
  handleReroll,
  handleRestart,
  handlePlayAgain,
}: IFooterSection) => {
  const { enabled } = useContext(SoundContext);

  const [playAudio, setPlayAudio] = useState<{
    start?: HTMLAudioElement, roll?: HTMLAudioElement
  }>({ start: undefined, roll: undefined })

  useEffect(() => {
    setPlayAudio({
      start: new Audio('sounds/start.wav'),
      roll: new Audio('sounds/roll.wav')
    })
  }, []);

  let state =
    typeof currentState === 'string'
      ? currentState
      : `playing.${currentState['playing']}`;

  if (currentRoll === 3) {
    state = 'FORCE SCORE';
  }

  const scoreboardButton = (
    <DrawerTrigger asChild>
      <button className='md:hidden flex items-center justify-center p-4 mx-4 text-white bg-gray-600 rounded-md h-11 font-jersey10'>
        <BsCardList />
        <span className='ml-4'>Scoreboard</span>
      </button>
    </DrawerTrigger>
  );

  switch (state) {
    // Start
    case 'welcome':
      return (
        <div className='flex flex-row items-center font-jersey10'>
          <button
            className='flex items-center justify-center p-4 mx-4 text-white bg-blue-500 rounded-md h-11'
            onClick={() => {
              if (enabled) playAudio["start"]?.play();

              handleStart();
            }}
          >
            <FaPlay />
            <span className='ml-4'>Start</span>
          </button>
          {scoreboardButton}
        </div>
      );
    // Turn 1 & 2
    case 'playing.deciding':
      return (
        <div className='flex flex-row items-center font-jersey10'>
          <button
            className='flex items-center justify-center p-4 mx-4 text-white bg-blue-500 rounded-md h-11'
            onClick={() => {
              if (enabled) playAudio["roll"]?.play();

              handleReroll();
            }}
          >
            <GiRollingDiceCup />
            <span className='ml-4'>Reroll</span>
          </button>
          <button
            className='flex items-center justify-center p-4 mx-4 text-white bg-red-700 border rounded-md h-11'
            onClick={handleRestart}
          >
            <VscDebugRestart />
            <span className='ml-4'>Restart</span>
          </button>
          {scoreboardButton}
        </div>
      );
    // Turn 3
    case 'FORCE SCORE':
      return (
        <div className='flex flex-row items-center gap-4'>
          <h5>Pick a score</h5>
          {scoreboardButton}
        </div>
      );
    // Scorecard is full
    case 'playing.gameover':
      return (
        <div className='flex flex-row items-center font-jersey10'>
          <button
            className='flex items-center justify-center p-4 mx-4 border border-gray-700 border-solid rounded-md h-11'
            onClick={handlePlayAgain}
          >
            <MdReplay />
            <span className='ml-4'>Play Again</span>
          </button>
          {scoreboardButton}
        </div>
      );
    default:
      throw Error(`Footer button Id invalid ${JSON.stringify(currentState)}`);
  }
};

export default FooterButtons;
