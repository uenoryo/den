import { CardNum, CardMark } from '../type/Type'

export const CardMarkIntegers: { [index: string]: CardMark } = {
  Club: 0,
  Diamond: 1,
  Heart: 2,
  Spade: 3,
  JokerA: 4,
  JokerB: 5,
}

export const CardMarkStrings: { [index: string]: string } = {
  Club: '♣︎',
  Diamond: '♢',
  Heart: '♡',
  Spade: '♠︎',
  Joker: '$',
}

// ActionID のうち、Drawすることを示す値
export const DrawActionID = -1

export const CardCosts: { [index: number]: number } = {
  0: 3,
  1: 1,
  2: 2,
  3: 1,
  4: 1,
  5: 1,
  6: 1,
  7: 1,
  8: 3,
  9: 1,
  10: 1,
  11: 1,
  12: 1,
  13: 1,
}

// Counterの場合にスコアにかけられる倍率
export const ScoreCounterBonusRate = 2

export const ScoreDen = 3

export const ScoreAnko = 3

export const ScoreChitoi = 10

export const ScorePank = 5

// JokerBuff.Good の際に加算されるスコア
export const JokerBuffScoreGood = 3

// JokerBuff.Awesome の際に加算されるスコア
export const JokerBuffScoreAwesome = 5

export const CardSkillNums: { [index: string]: CardNum } = {
  Skip: 1,
  DrawTwo: 2,
  WildCard: 8,
  Reverse: 9,
  Attach: 12,
}

export const CardMarks: CardMark[] = [0, 1, 2, 3, 4, 5]

export const CardMarksWithoutJokerB: CardMark[] = [0, 1, 2, 3, 4]

export const CardNums: CardNum[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

export const CardNumsWithoutJoker: CardNum[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

export const CardMaxNum = 13

export const CardJokerNum = 0
