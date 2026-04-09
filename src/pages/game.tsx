'use client';

import type { NextPage } from 'next';
import React from 'react';
import { useMachine } from '@xstate/react';

import { SoundProvider } from '~/contexts/sound';
import YahtzeeMachine, { scoreCardFilled } from '~/game';
import GameCard from '~/components/GameCard';

import Scoreboard from '~/components/Scoreboard';

const Game: NextPage = () => {
  const [stateMachine, send] = useMachine(YahtzeeMachine);
  const {
    currentDice,
    upperSection: upper,
    lowerSection: lower,
  } = stateMachine.context;

  function handleAddUpperScore(type: number, value: number) {
    send({ type: 'SCORE_TURN', column: type, value });
    const isFinalMove = scoreCardFilled(stateMachine.context);
    if (!isFinalMove) {
      send({ type: 'NEXT_TURN' });
      send({ type: 'ROLL' });
      send({ type: 'ROLLED' });
    }
  }

  function handleAddLowerScore(type: string, value: number) {
    send({ type: 'SCORE_TURN', column: type, value });
    const isFinalMove = scoreCardFilled(stateMachine.context);
    if (!isFinalMove) {
      send({ type: 'NEXT_TURN' });
      send({ type: 'ROLL' });
      send({ type: 'ROLLED' });
    }
  }

  return (
    // Have main screen that lets you navigate to scores, exit and play
    <SoundProvider>
      <section className='flex w-screen h-screen bg-[#d01014] text-white'>
        <GameCard {...{ stateMachine, send }} />
        <Scoreboard
          canSelect={stateMachine.value !== 'welcome'}
          {...{
            currentDice,
            upper,
            handleAddUpperScore,
            lower,
            handleAddLowerScore,
          }}
        />
      </section>
    </SoundProvider>
  );
};

export default Game;
