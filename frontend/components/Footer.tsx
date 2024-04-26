import { FaPlay } from "react-icons/fa";
import { GiRollingDiceCup } from "react-icons/gi";
import { VscDebugRestart } from "react-icons/vsc";
import { MdReplay } from "react-icons/md";
import { useContext } from "react";
import { SoundContext } from "~/contexts/sound";



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
  handlePlayAgain
}: IFooterSection) => {
  const { enabled } = useContext(SoundContext);

  let state = typeof currentState === "string"
    ? currentState 
    : `playing.${currentState["playing"]}`
  
  if (currentRoll === 3) {
    state = "FORCE SCORE"
  }

  switch (state) {
    // Start
    case "welcome": return (
      <>
        <button 
          className='flex items-center justify-center p-4 mx-4 text-white bg-blue-500 rounded-md h-11'
          onClick={()=> {
            var snd = new Audio("sounds/start.wav"); // buffers automatically when created
            if (enabled) snd.play();
            
            handleStart()
          }}
        >
          <FaPlay /><span className="ml-4">Start</span>
        </button>
      </>
    )
    // Turn 1 & 2
    case "playing.deciding": return (
      <div className="flex flex-row">
        <button 
          className='flex items-center justify-center p-4 mx-4 text-white bg-blue-500 rounded-md h-11'
          onClick={handleReroll}
        >
          <GiRollingDiceCup /><span className="ml-4">Reroll</span>
        </button>
        <button 
          className='flex items-center justify-center p-4 mx-4 text-white bg-red-700 border rounded-md h-11'
          onClick={handleRestart}
        >
          <VscDebugRestart /><span className="ml-4">Restart</span>
        </button>
      </div>
    )
    // Turn 3
    case "FORCE SCORE": return (
      <>
        <h5>Pick a score</h5>
      </>
    )
    // Scorecard is full
    case "playing.gameover": return (
      <>
        <button 
          className='flex items-center justify-center p-4 mx-4 border border-gray-700 border-solid rounded-md h-11'
          onClick={handlePlayAgain}
        >
          <MdReplay /><span className="ml-4">Play Again</span>
        </button>
      </>
    )
    default: throw Error(`Footer button Id invalid ${JSON.stringify(currentState)}`) 
  }
}

export default FooterButtons;
