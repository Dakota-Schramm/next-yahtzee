interface IFooterSection {
  currentId: number;
  handleStart: () => void;
  handleReroll: () => void;
  handleRestart: () => void;
  handlePlayAgain: () => void;
}

const FooterButtons = ({
  currentId,
  handleStart, 
  handleReroll, 
  handleRestart, 
  handlePlayAgain
}: IFooterSection) => {
  // Destructure currentId here
  switch (currentId) {
    // Start
    case 0: return (
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
    case 1: return (
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
    case 2: return (
      <>
        <h5>Pick a score</h5>
      </>
    )
    // Scorecard is full
    case 3: return (
      <>
        <button 
          className='flex items-center justify-center p-4 mx-4 border border-gray-700 border-solid rounded-md h-11'
          onClick={handlePlayAgain}
        >
          Play Again 
        </button>
      </>
    )
    default: throw Error('Footer button Id invalid') 
  }
}

export default FooterButtons;
