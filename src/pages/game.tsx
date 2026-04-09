'use client';

import type { NextPage } from 'next';
import React from 'react';
import { useMachine } from '@xstate/react';

import { SoundProvider } from '~/contexts/sound';
import YahtzeeMachine, { scoreCardFilled } from '~/game';
import GameCard from '~/components/GameCard';
import Scoreboard from '~/components/Scoreboard';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from '~/components/ui/drawer';

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

  const scoreboardProps = {
    canSelect: stateMachine.value !== 'welcome',
    currentDice,
    upper,
    handleAddUpperScore,
    lower,
    handleAddLowerScore,
  };

  return (
    <SoundProvider>
      <Drawer>
        <section className='flex w-screen h-screen bg-[#d01014] text-white'>
          <GameCard {...{ stateMachine, send }} />
          <div className='hidden md:flex w-full h-full'>
            <Scoreboard {...scoreboardProps} />
          </div>
        </section>
        <DrawerContent className='bg-[#e1e1e1] text-red-700 max-h-[85vh]'>
          <DrawerTitle className='sr-only'>Scoreboard</DrawerTitle>
          <div className='overflow-y-auto pb-8'>
            <Scoreboard {...scoreboardProps} />
          </div>
        </DrawerContent>
      </Drawer>
    </SoundProvider>
  );
};

export default Game;
