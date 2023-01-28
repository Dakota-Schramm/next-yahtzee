import { useState, useReducer, useEffect } from "react";

import { upperSectionScores, lowerSectionScores } from '../constants';
import { ICurrentDie } from "../components/DiceTray";

export interface IUpperSection {
  [key: number]: number | undefined;
}

export interface ILowerSection {
  [key: string]: number | undefined;
}

const upperSectionDict: IUpperSection = Object.assign(
  {}, ...upperSectionScores.map(
    x => ({ [x]: undefined })
  )
);

const lowerSectionDict: ILowerSection = Object.assign(
  {}, ...lowerSectionScores.map(
    x => ({ [x]: undefined })
  )
);

interface IScoreMeta {
  // Upper Section
  upper: IUpperSection;
  receivesUpperBonus: boolean;

  // Lower Section
  lower: ILowerSection;
  yahtzeeBonuses: number | null;

  total: number;
}

export interface IGameMeta extends IScoreMeta {
  footerButtonId: number;
  turn: number;
  currentDice: ICurrentDie[];
}

interface GameAction {
  column?: string | number;
  value?: number;
  type: string;
  shouldReroll?: boolean[];
}

const numOfDice = 5;

export default function useGameMeta() {
  // Game Meta Info
  const [game, gameDispatch] = useReducer(gameReducer, initialGame);

  return [game, gameDispatch]
}

function rerollDice(currentDice: ICurrentDie[], shouldRerollOverride?: boolean[]) {
  const newDice = currentDice.map(
    (prevRoll, idx) => {
      const shouldReroll = shouldRerollOverride ? shouldRerollOverride[idx] : prevRoll.shouldReroll;
      if (!shouldReroll) return { ...prevRoll };

      const newRoll = Math.floor(Math.random() * 6 + 1);

      return ({ face: newRoll, shouldReroll: true  });
  })

  return newDice
}

function gameReducer(gameState: IGameMeta, action: GameAction){
  const rerollAll = [ ...Array(numOfDice) ].map((_) => true);

  const rerollOnFirstTurn = {
    turn: 1,
    currentDice: rerollDice(gameState.currentDice, rerollAll)
  }

  switch (action.type) {
    case 'START': {
      return ({
        ...gameState,
        footerButtonId: 1,
        ...rerollOnFirstTurn
      })
    }
    case 'REROLL': {
      let footerState = gameState.footerButtonId;
      if (gameState.turn === 3) footerState = 2

      return ({
        ...gameState, 
        footerButtonId: footerState,
        turn: gameState.turn + 1,
        currentDice: rerollDice(gameState.currentDice)
      })
    }
    case 'TOGGLE_REROLL': {
      const diceWithRerollPreferenceChanged = gameState.currentDice.map(
        (prevChoice, idx) => {
          const newChoice = { ...prevChoice, shouldReroll: action.shouldReroll[idx] };

          return newChoice;
        }
      )

      return ({
        ...gameState,
        currentDice: diceWithRerollPreferenceChanged
      })
    }
    case 'UPPER_SCORE': {
      const newScore = {
        ...gameState.upper,
        [action.column]: action.value
      } 

      return ({
        ...gameState,
        upper: newScore,
        total: gameState.total + action.value,
        ...rerollOnFirstTurn
      })
    }
    case 'LOWER_SCORE': {
      const newScore = {
        ...gameState.lower,
        [action.column]: action.value
      }

      return ({
        ...gameState,
        lower: newScore,
        total: gameState.total + action.value,
        ...rerollOnFirstTurn
      })
    }
    case 'YAHTZEE': {
      return ({
        ...gameState,
        yahtzeeBonuses: gameState.yahtzeeBonuses + 1 ?? 0,
        total: gameState.total + (gameState.yahtzeeBonuses > 0 ? 100 : 50),
        ...rerollOnFirstTurn
      })
    }
    case 'NEXT_ROUND': {
      return ({
        ...gameState, 
        footerButtonId: 1,
        ...rerollOnFirstTurn
      })
    }
    case 'RESTART' || 'PLAY_AGAIN': {
      return ({
        ...initialScore,
        footerButtonId: 1,
        ...rerollOnFirstTurn
      })
    }
    default: throw Error('Unknown action: ' + action.type)
  }
}

export const initialScore: IScoreMeta = {
  upper: upperSectionDict,
  lower: lowerSectionDict,
  total: 0,
  receivesUpperBonus: false,
  yahtzeeBonuses: null
}

export const initialGame: IGameMeta = {
  ...initialScore,
  turn: 0,
  footerButtonId: 0,
  currentDice: [ ...Array(numOfDice) ].map((_) => ({ face: 1, shouldReroll: true }) ),
}
