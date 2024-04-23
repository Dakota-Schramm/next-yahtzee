import { createMachine, assign } from 'xstate';
import { lowerSectionDict, numOfDice, upperSectionDict, upperSectionScores, lowerSectionScores } from './constants';

import type { ICurrentDie } from "~/components/DiceTray";

/*
    TO CONSIDER
    - should game infinite loop or should state machine be recreated on each replay?

*/


const YahtzeeMachine = createMachine(
  {
    id: 'yahtzee',
    initial: 'welcome',

    context: {
      dice: numOfDice,
      rolls: 3,
      cupDice: [],
      trayDice: [],
      currentRoll: 1,
      upperSection: structuredClone(upperSectionDict),
      lowerSection: structuredClone(lowerSectionDict)
    },

    states: {
      welcome: {
        on: {
          START: { target: "playing"},
        }
      },
      playing: {
        initial: "newturn",
        states: {
          newturn: {
            entry: ["getRandomRoll"],
            on: {
              ROLL: { target: "rolling" }
            }
          },
          rolling: {
            on: {
              ROLLED: { target: "deciding" }
            }
          },
          deciding: {
            on: {
              ROLL: { target: "rolling", cond: "canRoll" },
              MOVE_DIE: { actions: "changeDieLocation" },
              SCORE_TURN: { target: "tallyScore", actions: "selectScore" }
            }
          },
          tallyScore: {
              on: {
                '': [
                  {
                    target: 'gameover',
                    cond: 'isGameOver',
                  },
                  {
                    target: 'newturn',
                  }
                ]
              }
          },
          gameover: {
            type: 'final',
            entry: ['getFinalScore'],
          }
        },
        on: {
          STARTOVER: { target: ".newturn", actions: "resetGame"}
        }
      },
    },
  },
  {
    actions: {
      getRandomRoll: assign((context) => {
        return ({
          ...context,
          trayDice: rerollDice(context.trayDice),
          cupDice: new Array(numOfDice).fill(null),
          currentRoll: 1,
        })

      }),
      getReroll: assign((context) => {
        return ({
          ...context,
          trayDice: rerollDice(context.trayDice),
          currentRoll: context.currentRoll + 1,

        })
      }),
      changeDieLocation: assign((context, event) => {
        const cupAndTrayObj = moveDieBetweenLocations(
          event.dieToMove,
          context.trayDice,
          context.cupDice
        )

        return ({ ...context, ...cupAndTrayObj })
      }),
      selectScore: assign((context, event) => {
        return calculateScoreForSection(context, event.column, event.value)

      }),
      getFinalScore: () => {
        return 0
      },
      resetGame: assign((context, event) => {
        return ({
          ...context,
          currentRoll: 1,
          upperSection: structuredClone(upperSectionDict),
          lowerSection: structuredClone(lowerSectionDict)
        })
      })
    },
    guards: {
      canRoll: (context, event) => {
        return context.turn < 3
      },
      isGameOver: (context, event) => {
        const { upperSection, lowerSection } = context;

        return !Object.values(upperSection).includes(undefined) && 
          !Object.values(lowerSection).includes(undefined)

      }
    }
  }
);

function rerollDice(trayDice: (number | null)[]) {
  return trayDice.map(
    (prevRoll, idx) => {
      if (!prevRoll) return prevRoll;

      const newRoll = Math.floor(Math.random() * 6 + 1);
      return newRoll
  })
}

function moveDieBetweenLocations(dieToMove: number, tray: (number | null)[], cup: (number | null)[]) {
  const newTray = [...tray];
  const newCup = [...cup];

  const foundInTray = newTray[dieToMove]
  if (foundInTray) {
    newCup[dieToMove] = foundInTray
    newTray[dieToMove] = null
  } else {
    const temp = newCup[dieToMove]
    newCup[dieToMove] = null 
    newTray[dieToMove] = temp 
  }

  return {
    trayDice: newTray,
    cupDice: newCup
  }
}

function calculateScoreForSection(
  context, sectionToScore, score
) {
  const { cupDice, trayDice, upperSection, lowerSection } = context;
  const rolled = [...cupDice, ...trayDice].filter((val) => val !== null);
  const scores = { upperSection, lowerSection }

  const upperSectionChosen = Object.keys(upperSectionDict).includes(sectionToScore);
  const lowerSectionChosen = Object.keys(lowerSectionDict).includes(sectionToScore);
  if (upperSectionChosen) {
    scores.upperSection[sectionToScore] = score
  } else if (lowerSectionChosen) {
    scores.lowerSection[sectionToScore] = score
  }

  return ({
    ...context,
    ...scores
  })
}

