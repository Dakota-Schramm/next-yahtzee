# Rails + Nextjs - Backend for Frontend Template

# TO START
- Initialize your dev directories
  - Install next template in app/frontend/etc. directory
  - Create API only project in /backend/api/etc. directory

# FRONTEND 
# Next.js + Tailwind CSS Example

This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v3.2)](https://tailwindcss.com/blog/tailwindcss-v3-2) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) or preview live with [StackBlitz](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-tailwindcss)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
```

```bash
yarn create next-app --example with-tailwindcss with-tailwindcss-app
```

```bash
pnpm create next-app --example with-tailwindcss with-tailwindcss-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

Notes on frontend:
  - If using getServersideProps, make sure that you use the appropriate backend service name instead of localhost in your fetch
    - Ex. 'http://api:3000'

# BACKEND
# README

### Initialize
```rails new <project-name> --database=postgresql --api```
should replace project name with api. If change, make sure to change in the docker-compose file as well.

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

### Initial Setup
- Install rack-cors, and add your appropriate origins:
  - http://localhost:8000, http://app:8000
- Within config/environments/development, add config.hosts.clear to the bottom of the file

### OBJECTIVE
Yahtzee consists of thirteen rounds. Each player gets a turn per round. On your turn roll your dice and score the roll on the corresponding round, i.e. on round 5 score your dice in the “Game #5” column on the score card. The objective of the game is to collect as many points as possible through dice combinations rolled. In multiplayer, the player with the greatest total points at the end of the game is the winner.

SET UP
Each player gets a score card. To determine the first player, each player rolls all five dice. The person who rolled the highest total goes first and play moves left.

HOW TO PLAY YAHTZEE
Each turn gives a player 3 opportunities to roll the dice in order to score the  highest number of points from dice combinations. After 3 rolls, mark your score or a zero on your score card in the corresponding column. You may stop after the first roll if you are satisfied with the outcome.

First Roll: Roll all five dice. Either you may stop your turn here and mark your points or set aside dice which are ‘keepers’ and roll again.

Second Roll: You may roll any or all of the dice from the first roll. You need not declare which combination you are attempting to roll for as it may change after the second roll. After the second roll you may stop and score yourself or roll again.

Third Roll: Again, you may roll and or all of the five dice. After this roll you must score yourself or mark a zero. After marking your score, your turn is over, and play moves left.

SCORING
On the score card there are 13 columns which correspond to the 13 rounds in each game. On your turn you must fill in a box, even if you score yourself zero. The score card is separated into 2 sections: Upper Section and Lower Section.

Upper Section

Aces (Ones): Total of Aces

Twos: Total of Twos

Threes: Total of Threes

Fours: Total of Fours

Fives: Total of Fives

Sixes: Total of Sixes

How to Score Upper Section:

If you roll, for example: three 3’s, one 2, and one 4 you can score that as a 9 in the threes box, a 2 in the twos box, and a 4 in the fours box for a total of 15 points.

The objective of the Upper Section is to score, by any combination, 63 points in order to earn a 35 point bonus.

Lower Section

3 of a Kind: Total of all five dice. Score only in this section if you roll 3 or more of the same number dice.

Alternative Scoring: You can score each number individually in the upper section or score the total in the chance section.

4 of a Kind: Total of all five dice. Score only in this section if you roll 4 or more of the same number dice.

Alternative Scoring: You can also score the total in the 3 of a kind box or the chance box. You may also divide the numbers up and score them in the upper section individually.

Full House: 25 points. One scores a Full House when three of one number and two dice of another. Full Houses are always 25 points no matter which numbers compose it.

Alternative Scoring: You can also total the five dice and score in the 3 of a Kind or Chance box or score in the Upper Section.

Small Straight: 30 points. Small straights can be scored with any four sequential dice. For example, if you roll a 2, 3, 4, 5 and any other number that is considered a small straight. No matter where the straight starts or ends, it is always 30 points, as long as it fits the small straight criteria.

Alternative Scoring: Replace small straight score in Chance box as opposed to small straight box. Or, distribute score in the Upper Section.

Large Straight: 40 points. Large straights can be scored with any five sequential dice. For example, rolling a 1, 2, 3, 4, 5, and any other number is considered a large straight. As with the small straight, regardless if the sequence starts with a one or a two, it is still scored as 40 points.

Alternative Scoring: Large straights can also be scored in the small straight box, chance box, or in the Upper Section.

Yahtzee!: 50 points. You can only score in the Yahtzee box if you roll five dice of the same number or a 5 of a kind. Each following Yahtzee rolled earns you a bonus.

Chance: Total of all five dice. This is a free for all box which can be used when you are unable to score in other categories and do not want to score a zero.

Yahtzee Bonus: After rolling one Yahtzee, the next Yahtzee earns you a 100-point bonus. Grab a bonus chip and mark a check in the Yahtzee bonus box. After, fill in one of the 13 boxes according to Joker Rules (described below). There is no limit to the amount of Yahtzee bonuses you can earn. However, if you have marked a zero in the Yahtzee box already, you can not earn Yahtzee bonuses. Fill in one of the 13 boxes in accordance with Joker Rules. 

Joker Rules
Score the total of the five rolled dice in the Upper Section. If those are filled, score in the Lower Section in accordance with point values defined above, i.e. Small Straight is 30 points.

Example of Joker Rules: You roll five 5’s, but you have already marked zero in your Yahtzee box. You have also scored your 5’s in the Upper Section as well, Joker Rules allow you to open any box in the Lower Section for scoring that isn’t already occupied. For example, you may mark 40 in the Large Straight Box if it is open.

Finishing the Game
After all 13 columns have been filled for each player the game ends. Now, each player totals their score in the following way:

Upper Section: Mark the total sum of your Upper Section score in the corresponding total score box. If you score 63-points or more, add in the 35-point bonus before marking your total score.

Lower Section: Mark the total sum of the Lower Section score in the corresponding total score box. Add 100-points for each check in the Yahtzee bonus box.

Grand Total: Sum of Upper and Lower Sections. This is your total score for that game. The player with the highest total wins.

SINGLE PLAYER
The same rules apply, however, no group is necessary. Challenge yourself to beat your previous scores in solo play.