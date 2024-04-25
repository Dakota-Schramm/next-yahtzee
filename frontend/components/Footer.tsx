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
  // Destructure currentId here
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
          onClick={handleStart}
        >
          Start
        </button>
      </>
    )
    // Turn 1 & 2
    case "playing.deciding": return (
      <>
        <button 
          className='flex items-center justify-center p-4 mx-4 text-white bg-blue-500 rounded-md h-11'
          onClick={handleReroll}
        >
          Reroll
        </button>
        <button 
          className='flex items-center justify-center p-4 mx-4 text-white bg-red-700 border rounded-md h-11'
          onClick={handleRestart}
        >
          Restart
        </button>
      </>
    )
    // Turn 3
    case "FORCE SCORE": return (
      <>
        <h5>Pick a score</h5>
      </>
    )
    // Scorecard is full
    case "gameover": return (
      <>
        <button 
          className='flex items-center justify-center p-4 mx-4 border border-gray-700 border-solid rounded-md h-11'
          onClick={handlePlayAgain}
        >
          Play Again 
        </button>
      </>
    )
    default: throw Error(`Footer button Id invalid ${currentState}`) 
  }
}

export default FooterButtons;
