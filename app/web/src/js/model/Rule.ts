import { CardMarkIntegers, CardSkillNums } from '../constant/Card'
import { Constants } from '../constant/Basic'
import CardData from '../data/CardData'
import HandData from '../data/HandData'

export default class Rule {
  static canPut (field: CardData, target: CardData, isForceDraw: boolean): boolean {
    if (isForceDraw) {
      return target.Num === CardSkillNums.DrawTwo
    }

    return (
      field.Mark  === target.Mark ||
      field.Num   === target.Num ||
      target.Num  === CardSkillNums.WildCard ||
      target.Mark === CardMarkIntegers.JokerA ||
      target.Mark === CardMarkIntegers.JokerB ||
      field.Mark  === CardMarkIntegers.JokerA ||
      field.Mark  === CardMarkIntegers.JokerB
    )
  }

  static isPank (hand: HandData): boolean {
    return hand.Cards.length > Constants.PlayerHandMaxAmount
  }
}
