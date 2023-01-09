import React, { useState } from 'react'

interface IUpperSection {
  scores: IUpperSectionScores;
  receivesBonus: boolean;
}

interface IUpperSectionScores {
  [key: number]: number | undefined;
}

interface ILowerSection {
  scores: IUpperSectionScores;
  yahtzeeBonuses: number | undefined;
}

interface ILowerSectionScores {
  [key: string]: number | undefined;
}

const Scoreboard = () => {
  const upperSectionScores = [
    1,
    2,
    3,
    4,
    5,
    6
  ];

  const upperSectionDict: IUpperSectionScores = Object.assign(
    {}, ...upperSectionScores.map(x => (
      {[x]: undefined})
    )
  );

  const lowerSectionScores = [
    "3 of a kind",
    "4 of a kind",
    "Full House",
    "Small Straight",
    "Large Straight",
    "Yahtzee!",
    "Chance"
  ]

  const lowerSectionDict: ILowerSectionScores = Object.assign(
    {}, ...lowerSectionScores.map(x => (
      {[x]: undefined})
    )
  );

  const [upperSection, setUpperSection] = useState<IUpperSection>({
    scores: upperSectionDict,
    receivesBonus: false,
  });

  const [lowerSection, setLowerSection] = useState<ILowerSection>({
    scores: lowerSectionDict, 
    yahtzeeBonuses: undefined
  });

  const UpperScoreboard = () => (
    <div>
      {
        Object.entries(upperSection.scores).map(([key, value]) => (
          <div className='flex flex-row'>
            <div>{key}</div>
            <div>{value ?? " —"}</div>
          </div>
        ))
      }
    </div>
  )

  const LowerScoreboard = () => (
    <div>
      {
        Object.entries(lowerSection.scores).map(([key, value]) => (
          <div className='flex flex-row'>
            <div>{key}</div>
            <div>{value ?? " —"}</div>
          </div>
        ))
      }
    </div>
  )
  

  return (
    <section className='w-full h-full bg-gray-300 rounded-lg'>
      <UpperScoreboard />
      <LowerScoreboard />
    </section>
  )
}

export default Scoreboard