interface Score {
  [key: string | number]: string
}

export const upperSectionScores: Score = {
  1: "Sum of all ones rolled",
  2: "Sum of all twos rolled",
  3: "Sum of all threes rolled",
  4: "Sum of all fours rolled",
  5: "Sum of all fives rolled",
  6: "Sum of all sixes rolled"
};

export const lowerSectionScores: Score ={
  "3 of a kind": "Three dice have the same face",
  "4 of a kind": "Four dice have the same face",
  "Full House": "Three of a kind and two of a kind in one hand",
  "Small Straight": "Four sequential dice - Ex. [1, 2, 3, 4]",
  "Large Straight": "Five sequential dice - Ex. [1, 2, 3, 4, 5]",
  "Yahtzee!": "Five of a kind - all dice have the same face",
  "Chance": "Sum of all dice"
}
