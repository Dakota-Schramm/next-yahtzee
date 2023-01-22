import { useState, useReducer, useEffect } from "react";

import { upperSectionScores, lowerSectionScores } from '../constants';

export interface IUpperSection {
  [key: number]: number | undefined;
}

export interface ILowerSection {
  [key: string]: number | undefined;
}

const upperSectionDict: IUpperSection = Object.assign(
  {}, ...upperSectionScores.map(x => (
    {[x]: undefined})
  )
);

const lowerSectionDict: ILowerSection = Object.assign(
  {}, ...lowerSectionScores.map(x => (
    {[x]: undefined})
  )
);

interface IScoreMeta {
  upper: IUpperSection;
  lower: ILowerSection;
  total: number;
  receivesUpperBonus: boolean;
  yahtzeeBonuses: number | null;
}

export interface IGameMeta {
  footerButtonId: number;
  turn: number;
}


export default function useGameMeta() {
  // Game Meta Info
  const [game, gameDispatch] = useReducer(gameReducer, initialGame);

  return [game, gameDispatch]
}

function gameReducer(gameState, action){
  switch (action.type) {
    case 'START': {
      return ({
        ...gameState,
        footerButtonId: 1,
        turn: 1
      })
    }
    case 'REROLL': {
      let footerState = gameState.footerButtonId;
      if (gameState.turn === 3) footerState = 2
      return ({
        ...gameState, 
        footerButtonId: footerState,
        turn: gameState.turn + 1
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
        turn: 1      
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
        turn: 1       
      })
    }
    case 'YAHTZEE': {
      return ({
        ...gameState,
        yahtzeeBonuses: gameState.yahtzeeBonuses + 1 ?? 0,
        total: gameState.total + (gameState.yahtzeeBonuses > 0 ? 100 : 50),
      })
    }
    case 'NEXT_ROUND': {
      return ({
        ...gameState, 
        turn: 1,
        footerButtonId: 1
      })
    }
    case 'RESTART' || 'PLAY_AGAIN': {
      return ({
        ...initialScore,
        turn: 1,
        footerButtonId: 1
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
  footerButtonId: 0
}
