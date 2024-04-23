import { useState, useReducer, useEffect } from "react";

import { numOfDice, IUpperSection, ILowerSection, upperSectionDict, lowerSectionDict } from '../constants';
import { ICurrentDie } from "../components/DiceTray";


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

export default function useGameMeta() {
  // Game Meta Info
  const [game, gameDispatch] = useReducer(gameReducer, initialGame);

  return [game, gameDispatch]
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
    case 'UPPER_SCORE' || 'LOWER_SCORE': {
      const getsYahtzeeBonus = (
        gameState.yahtzeeBonuses && gameState.yahtzeeBonuses > 0
        && gameState.currentDice.every(die => die.face === action.column)
      );

      const scoreAfterBonusCheck = getsYahtzeeBonus ? action.value + 100 : action.value;
      let newScore = {
        [action.column]: scoreAfterBonusCheck
      } 

      let scorePartial;
      if (action.type === 'UPPER_SCORE') {
        newScore = { ...gameState.upper, ...newScore };
        scorePartial = ({ upper: newScore });
      } else {
        newScore = { ...gameState.lower, ...newScore}
        scorePartial = ({ lower: newScore });
      }

      const newState = {
        ...gameState,
        upper: newScore,
        total: gameState.total + newScore[action.column],
        yahtzeeBonuses: getsYahtzeeBonus ? (gameState.yahtzeeBonuses + 1 ?? 0) : gameState.yahtzeeBonuses,
        ...rerollOnFirstTurn
      }

      return newState
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
