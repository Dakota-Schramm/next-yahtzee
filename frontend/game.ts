import { createMachine, assign } from 'xstate';
import { lowerSectionDict, numOfDice, upperSectionDict, upperSectionScores, lowerSectionScores } from './constants';

import { type ICurrentDie } from "~/components/DiceTray";

/*
    TO CONSIDER
    - should game infinite loop or should state machine be recreated on each replay?

*/

const baseDice = new Array(numOfDice)
  .fill(null)
  .map((_, idx) => ({ face: idx, location: "cup" }));

const YahtzeeMachine = createMachine(
  {
    id: 'yahtzee',
    initial: 'welcome',

    context: {
      footerButtonId: 0,
      currentDice: baseDice,
      currentRoll: 0,
      upperSection: structuredClone(upperSectionDict),
      lowerSection: structuredClone(lowerSectionDict)
    },

    states: {
      welcome: {
        entry: ["initGame"],
        on: {
          START: { target: "playing"},
        }
      },
      playing: {
        initial: "newturn",
        states: {
          newturn: {
            entry: ["initTurn"],
            on: {
              ROLL: { target: "rolling" }
            }
          },
          rolling: {
            entry: "rollDice",
            on: {
              ROLLED: { target: "deciding" }
            }
          },
          deciding: {
            on: {
              ROLL: { target: "rolling", guard: "canRoll" },
              MOVE_DIE: { actions: "changeDieLocation" },
              SCORE_TURN: { target: "tallyScore", actions: "selectScore" }
            }
          },
          tallyScore: {
            always: [
              { target: 'gameover', guard: 'isGameOver', },
              { target: 'newturn' }
            ]
          },
          gameover: {
            type: 'final',
            entry: ['gameOverUI', 'getFinalScore'],
          }
        },
        on: {
          STARTOVER: { target: ".newturn", actions: "initGame"}
        }
      },
    },
  },
  {
    actions: {
      initGame: assign((context) => {
        return ({
          ...context.context,
          currentDice: baseDice,
          currentRoll: 0,
          footerButtonId: 0,
          upperSection: structuredClone(upperSectionDict),
          lowerSection: structuredClone(lowerSectionDict)
        })
      }),
      initTurn: assign((context) => {
        return ({
          ...context.context,
          currentDice: baseDice,
          currentRoll: 0,
          footerButtonId: 1,
        })
      }),
      rollDice: assign(({ context }) => {
        return ({
          ...context,
          currentDice: rerollDice(context.currentDice),
          currentRoll: context.currentRoll + 1,

        })
      }),
      changeDieLocation: assign(({ context, event }) => {
        const cupAndTrayObj = moveDieBetweenLocations(event.dieToMove, context.currentDice)

        return ({ ...context, ...cupAndTrayObj })
      }),
      selectScore: ({ context, event }, params) => {
        return assignScoreSelection(context, event, params)
      },
      gameOverUI: (({ context }) => {
        return ({
          ...context,
          footerButtonId: 3
        })
      }),
      getFinalScore: () => {
        return 0
      },
    },
    guards: {
      canRoll: ({ context, event }) => {
        return context.currentRoll < 3
      },
      isGameOver: ({ context, event }) => {
        const { upperSection, lowerSection } = context;

        return !Object.values(upperSection).includes(undefined) && 
          !Object.values(lowerSection).includes(undefined)
      }
    }
  }
);

function rerollDice(dice: ICurrentDie[]) {
  return dice.map(
    (prevRoll) => {
      const { face, location, } = prevRoll
      const shouldReroll = location === "cup";
      if (!shouldReroll) return prevRoll;

      const newRoll = Math.floor(Math.random() * 6 + 1);
      return ({ ...prevRoll, face: newRoll }) 
  })
}

function moveDieBetweenLocations(dieToMove: number, dice: ICurrentDie[]) {
  const newDice = dice.map((prevDie, idx) => {
    if (idx !== dieToMove) return prevDie;
    else return ({
      ...prevDie,
      location: prevDie.location === "cup" ? "tray" : "cup"
    })

  })

  return {
    currentDice: newDice
  }
}

function calculateScoreForSection(
  context, sectionToScore, score
) {
  const { currentDice, upperSection, lowerSection } = context;
  const scores = { upperSection, lowerSection }

  const upperSectionChosen = Object.keys(upperSection).includes(sectionToScore);
  const lowerSectionChosen = Object.keys(lowerSection).includes(sectionToScore);
  if (upperSectionChosen) {
    scores.upperSection[sectionToScore] = score
  } else if (lowerSectionChosen) {
    scores.lowerSection[sectionToScore] = score
  } else {
    console.log("Neither: ", Object.keys(upperSection), sectionToScore)
  }

  return ({
    ...context,
    ...scores,
    footerButtonId: 2
  })
}

function assignScoreSelection(context, event, params) {
  console.log("Scoring", { context, event, params })
  assign(calculateScoreForSection(context, event.column, event.value))
}

export default YahtzeeMachine;